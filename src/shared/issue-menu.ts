// What a right click on an issue offers, as Linear's issue menu does: properties, relations, conversion, copy, reminders and delete. Pure:
// the menu component (src/app/components/issue-menu.tsx) loads the team's data and runs what is chosen.
import { estimateLabel } from './format.ts';
import { compareStates, PRIORITY_NAMES } from './grouping.ts';
import type { Change } from './moves.ts';
import type { CycleSummary, IssueRow, Label, ProjectMilestoneSummary, ProjectSummary, Team, User, WorkflowState } from './types.ts';

export type IssuePrompt = 'team' | 'release' | 'sla' | 'link' | 'customer' | 'document' | 'suggestions' | 'rename' | 'copy' | 'convert-project' | 'convert-subissue' | 'reminder-custom';

export type RelationChoice = {
  id: 'related' | 'blocking' | 'blocked' | 'duplicate' | 'similar';
  type: 'related' | 'blocks' | 'duplicate' | 'similar';
  /** True when the other issue blocks this one. */
  inverse: boolean;
};

export type MenuAction =
  | { kind: 'change'; change: Change }
  | { kind: 'copy'; text: string; what: string }
  | { kind: 'open' }
  | { kind: 'open-linear' }
  | { kind: 'prompt'; prompt: IssuePrompt }
  | { kind: 'relation'; relation: RelationChoice; create: boolean }
  | { kind: 'favorite' }
  | { kind: 'reminder'; at: string }
  | { kind: 'delete' };

export type MenuIcon =
  | { kind: 'state'; state: WorkflowState; teamId: string }
  | { kind: 'priority'; priority: IssueRow['priority'] }
  | { kind: 'person'; name: string; url: string | null }
  | { kind: 'swatch'; color: string }
  | { kind: 'project'; icon: string | null; color: string | null }
  | { kind: 'glyph'; name: GlyphName };

export type GlyphName = 'status' | 'priority' | 'assignee' | 'due' | 'labels' | 'project' | 'milestone' | 'estimate' | 'cycle' | 'copy' | 'open' | 'external' | 'delete' | 'none' | 'more' | 'related' | 'mark' | 'remove' | 'convert' | 'favorite' | 'reminder' | 'rename';

export type MenuItem = {
  id: string;
  label: string;
  icon?: MenuIcon;
  /** The key that opens it while the menu is open, shown at the right: `S`, or `⇧P` with Shift, as in Linear. */
  shortcut?: string;
  /** Ticked: the issue's current value. */
  checked?: boolean;
  /** A label list stays open so several can be ticked. */
  keepOpen?: boolean;
  danger?: boolean;
  /** A submenu; `loading` while its choices are read. */
  children?: MenuItem[];
  loading?: boolean;
  /** Filter field over a long submenu. */
  searchable?: boolean;
  action?: MenuAction;
};

export type MenuSection = MenuItem[];

/** What the menu knows about the issue's team; a missing list is still loading. */
export type MenuData = {
  states: WorkflowState[];
  team: Pick<Team, 'cyclesEnabled' | 'issueEstimationType' | 'issueEstimationAllowZero' | 'issueEstimationExtended'> | undefined;
  estimates: number[];
  members?: User[];
  labels?: Label[];
  projects?: Pick<ProjectSummary, 'id' | 'name' | 'color' | 'icon'>[];
  /** Undefined while the current project's milestones load; empty when there is no project. */
  milestones?: ProjectMilestoneSummary[];
  cycles?: CycleSummary[];
  /** Today, as YYYY-MM-DD in the user's time zone. */
  today: string;
  /** The clock used for reminder presets. */
  now: Date;
};

const SEARCH_AT = 8;

const change = (input: Change['input'], patch: Change['patch']): MenuAction => ({ kind: 'change', change: { input, patch } });
const prompt = (value: IssuePrompt): MenuAction => ({ kind: 'prompt', prompt: value });
const relation = (value: RelationChoice, create: boolean): MenuAction => ({ kind: 'relation', relation: value, create });

/** YYYY-MM-DD plus `days`, on the calendar (no time zone shift). */
export const addDays = (date: string, days: number): string => {
  const [y, m, d] = date.split('-').map(Number) as [number, number, number];
  const next = new Date(Date.UTC(y, m - 1, d + days));
  return next.toISOString().slice(0, 10);
};

/** Days from `date` to the coming Friday; 0 on a Friday, 6 on a Saturday. */
const toFriday = (date: string): number => {
  const [y, m, d] = date.split('-').map(Number) as [number, number, number];
  return (5 - new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 7) % 7;
};

const cycleName = (c: { number: number; name: string | null }) => `Cycle ${c.number}${c.name ? `: ${c.name}` : ''}`;

const RELATIONS: Record<RelationChoice['id'], RelationChoice> = {
  related: { id: 'related', type: 'related', inverse: false },
  blocking: { id: 'blocking', type: 'blocks', inverse: false },
  blocked: { id: 'blocked', type: 'blocks', inverse: true },
  duplicate: { id: 'duplicate', type: 'duplicate', inverse: false },
  similar: { id: 'similar', type: 'similar', inverse: false },
};

/** Local reminder times, serialized as the UTC timestamps Linear expects. */
export const reminderTimes = (now: Date): { id: string; label: string; at: string }[] => {
  const hour = new Date(now.getTime() + 60 * 60 * 1000);
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);
  const week = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const month = new Date(now);
  month.setMonth(month.getMonth() + 1);
  return [
    { id: 'hour', label: 'In one hour', at: hour.toISOString() },
    { id: 'tomorrow', label: 'Tomorrow at 9 AM', at: tomorrow.toISOString() },
    { id: 'week', label: 'In one week', at: week.toISOString() },
    { id: 'month', label: 'In one month', at: month.toISOString() },
  ];
};

export const issueMenu = (issue: IssueRow, data: MenuData): MenuSection[] => {
  const states = [...data.states].sort(compareStates);
  const status: MenuItem = {
    id: 'status', label: 'Status', shortcut: 'S', icon: { kind: 'glyph', name: 'status' },
    children: states.map((s) => ({
      id: `status:${s.id}`, label: s.name, icon: { kind: 'state', state: s, teamId: issue.team.id }, checked: s.id === issue.state.id,
      action: change({ stateId: s.id }, { state: s }),
    })),
  };
  const priority: MenuItem = {
    id: 'priority', label: 'Priority', shortcut: 'P', icon: { kind: 'glyph', name: 'priority' },
    children: [0, 1, 2, 3, 4].map((p) => ({
      id: `priority:${p}`, label: p ? PRIORITY_NAMES[p]! : 'No priority', icon: { kind: 'priority', priority: p as IssueRow['priority'] }, checked: issue.priority === p,
      action: change({ priority: p }, { priority: p as IssueRow['priority'] }),
    })),
  };
  const members = data.members ?? [];
  const people = issue.assignee && !members.some((m) => m.id === issue.assignee!.id) ? [issue.assignee, ...members] : members;
  const assignee: MenuItem = {
    id: 'assignee', label: 'Assignee', shortcut: 'A', icon: { kind: 'glyph', name: 'assignee' }, loading: !data.members, searchable: people.length >= SEARCH_AT,
    children: [
      { id: 'assignee:none', label: 'No assignee', icon: { kind: 'glyph', name: 'none' }, checked: !issue.assignee, action: change({ assigneeId: null }, { assignee: null }) },
      ...people.map((m) => ({
        id: `assignee:${m.id}`, label: m.name, icon: { kind: 'person' as const, name: m.name, url: m.avatarUrl }, checked: issue.assignee?.id === m.id,
        action: change({ assigneeId: m.id }, { assignee: m }),
      })),
    ],
  };
  const friday = toFriday(data.today);
  const due: MenuItem = {
    id: 'due', label: 'Due date', shortcut: '⇧D', icon: { kind: 'glyph', name: 'due' },
    children: [
      { id: 'due:today', label: 'Today', date: data.today },
      { id: 'due:tomorrow', label: 'Tomorrow', date: addDays(data.today, 1) },
      { id: 'due:friday', label: friday === 0 ? 'End of this week (today)' : 'End of this week', date: addDays(data.today, friday) },
      { id: 'due:week', label: 'In one week', date: addDays(data.today, 7) },
    ].map(({ id, label, date }) => ({ id, label, checked: issue.dueDate === date, action: change({ dueDate: date }, { dueDate: date }) }))
      .concat(issue.dueDate ? [{ id: 'due:none', label: 'Remove due date', checked: false, action: change({ dueDate: null }, { dueDate: null }) }] : []),
  };
  const chosen = new Set(issue.labels.nodes.map((l) => l.id));
  const known = [...new Map([...issue.labels.nodes, ...(data.labels ?? [])].map((l) => [l.id, l])).values()];
  const labels: MenuItem = {
    id: 'labels', label: 'Labels', shortcut: 'L', icon: { kind: 'glyph', name: 'labels' }, loading: !data.labels, searchable: known.length >= SEARCH_AT,
    children: known
      .sort((a, b) => Number(chosen.has(b.id)) - Number(chosen.has(a.id)) || a.name.localeCompare(b.name))
      .map((l) => {
        const next = chosen.has(l.id) ? issue.labels.nodes.filter((n) => n.id !== l.id) : [...issue.labels.nodes, l];
        return {
          id: `label:${l.id}`, label: l.name, icon: { kind: 'swatch' as const, color: l.color }, checked: chosen.has(l.id), keepOpen: true,
          action: change({ labelIds: next.map((n) => n.id) }, { labels: { nodes: next } }),
        };
      }),
  };
  const projectList = data.projects ?? [];
  const projects = issue.project && !projectList.some((p) => p.id === issue.project!.id) ? [issue.project, ...projectList] : projectList;
  const project: MenuItem = {
    id: 'project', label: 'Project', shortcut: '⇧P', icon: { kind: 'glyph', name: 'project' }, loading: !data.projects, searchable: projects.length >= SEARCH_AT,
    children: [
      { id: 'project:none', label: 'No project', icon: { kind: 'glyph', name: 'none' }, checked: !issue.project, action: change({ projectId: null }, { project: null, projectMilestone: null }) },
      ...projects.map((p) => ({
        id: `project:${p.id}`, label: p.name, icon: { kind: 'project' as const, icon: p.icon, color: p.color }, checked: issue.project?.id === p.id,
        // A milestone belongs to its project, so a new project clears it, as in Linear.
        action: change({ projectId: p.id }, { project: { id: p.id, name: p.name, color: p.color, icon: p.icon }, projectMilestone: null }),
      })),
    ],
  };
  const milestoneList = data.milestones ?? [];
  const milestones = issue.projectMilestone && !milestoneList.some((m) => m.id === issue.projectMilestone!.id) ? [issue.projectMilestone, ...milestoneList] : milestoneList;
  const milestone: MenuItem = {
    id: 'milestone', label: 'Milestone', shortcut: '⇧M', icon: { kind: 'glyph', name: 'milestone' }, loading: Boolean(issue.project && !data.milestones), searchable: milestones.length >= SEARCH_AT,
    children: [
      { id: 'milestone:none', label: 'No milestone', icon: { kind: 'glyph', name: 'none' }, checked: !issue.projectMilestone, action: change({ projectMilestoneId: null }, { projectMilestone: null }) },
      ...milestones.map((m) => ({
        id: `milestone:${m.id}`, label: m.name, icon: { kind: 'glyph' as const, name: 'milestone' as const }, checked: issue.projectMilestone?.id === m.id,
        action: change({ projectMilestoneId: m.id }, { projectMilestone: { id: m.id, name: m.name } }),
      })),
    ],
  };
  const type = data.team?.issueEstimationType;
  const scale = issue.estimate !== null && data.estimates.length && !data.estimates.includes(issue.estimate) ? [...data.estimates, issue.estimate].sort((a, b) => a - b) : data.estimates;
  const estimate: MenuItem | null = scale.length ? {
    id: 'estimate', label: 'Estimate', shortcut: '⇧E', icon: { kind: 'glyph', name: 'estimate' },
    children: [
      { id: 'estimate:none', label: 'No estimate', checked: issue.estimate === null, action: change({ estimate: null }, { estimate: null }) },
      ...scale.map((v) => ({
        id: `estimate:${v}`, label: `${estimateLabel(v, type) ?? v}${type === 'tShirt' ? '' : v === 1 ? ' point' : ' points'}`, checked: issue.estimate === v,
        action: change({ estimate: v }, { estimate: v }),
      })),
    ],
  } : null;
  const cycleList = data.cycles ?? [];
  const cycles = issue.cycle && !cycleList.some((c) => c.id === issue.cycle!.id) ? [issue.cycle, ...cycleList] : cycleList;
  const cycle: MenuItem | null = data.team?.cyclesEnabled ? {
    id: 'cycle', label: 'Cycle', shortcut: '⇧C', icon: { kind: 'glyph', name: 'cycle' }, loading: !data.cycles,
    children: [
      { id: 'cycle:none', label: 'No cycle', checked: !issue.cycle, action: change({ cycleId: null }, { cycle: null }) },
      ...cycles.map((c) => ({
        id: `cycle:${c.id}`, label: cycleName(c), checked: issue.cycle?.id === c.id,
        action: change({ cycleId: c.id }, { cycle: { id: c.id, number: c.number, name: c.name } }),
      })),
    ],
  } : null;

  const more: MenuItem = {
    id: 'more', label: 'More properties', icon: { kind: 'glyph', name: 'more' },
    children: [
      { id: 'team', label: 'Team', shortcut: '⌘⇧M', icon: { kind: 'glyph', name: 'assignee' }, action: prompt('team') },
      { id: 'release', label: 'Release', shortcut: '⌥R', icon: { kind: 'glyph', name: 'project' }, action: prompt('release') },
      { id: 'sla', label: 'SLA...', icon: { kind: 'glyph', name: 'due' }, action: prompt('sla') },
      { id: 'add-link', label: 'Add link...', shortcut: '⌃L', icon: { kind: 'glyph', name: 'external' }, action: prompt('link') },
      { id: 'add-customer', label: 'Add customer request...', shortcut: '⌃R', icon: { kind: 'glyph', name: 'assignee' }, action: prompt('customer') },
      { id: 'add-document', label: 'Add document', icon: { kind: 'glyph', name: 'open' }, action: prompt('document') },
      { id: 'suggestions', label: 'Find suggestions', icon: { kind: 'glyph', name: 'status' }, action: prompt('suggestions') },
      { id: 'rename', label: 'Rename...', shortcut: '⇧R', icon: { kind: 'glyph', name: 'rename' }, action: prompt('rename') },
    ],
  };
  const createRelated: MenuItem = {
    id: 'create-related', label: 'Create related', icon: { kind: 'glyph', name: 'related' },
    children: [
      { id: 'create-related:related', label: 'Related issue...', action: relation(RELATIONS.related, true) },
      { id: 'create-related:blocking', label: 'Blocking issue...', action: relation(RELATIONS.blocking, true) },
      { id: 'create-related:blocked', label: 'Blocked by issue...', action: relation(RELATIONS.blocked, true) },
    ],
  };
  const markAs: MenuItem = {
    id: 'mark-as', label: 'Mark as', icon: { kind: 'glyph', name: 'mark' },
    children: [
      { id: 'mark-as:related', label: 'Related to...', action: relation(RELATIONS.related, false) },
      { id: 'mark-as:blocking', label: 'Blocking...', action: relation(RELATIONS.blocking, false) },
      { id: 'mark-as:blocked', label: 'Blocked by...', action: relation(RELATIONS.blocked, false) },
      { id: 'mark-as:duplicate', label: 'Duplicate of...', action: relation(RELATIONS.duplicate, false) },
      { id: 'mark-as:similar', label: 'Similar to...', action: relation(RELATIONS.similar, false) },
    ],
  };
  const remove: MenuItem = {
    id: 'remove', label: 'Remove', icon: { kind: 'glyph', name: 'remove' },
    children: [
      ...(issue.project ? [{ id: 'remove:project', label: 'From project', action: change({ projectId: null }, { project: null, projectMilestone: null }) }] : []),
      ...(issue.projectMilestone ? [{ id: 'remove:milestone', label: 'From milestone', action: change({ projectMilestoneId: null }, { projectMilestone: null }) }] : []),
      ...(issue.cycle ? [{ id: 'remove:cycle', label: 'From cycle', action: change({ cycleId: null }, { cycle: null }) }] : []),
      ...(issue.parent ? [{ id: 'remove:parent', label: 'Parent', action: change({ parentId: null }, { parent: null }) }] : []),
      ...(issue.assignee ? [{ id: 'remove:assignee', label: 'Assignee', action: change({ assigneeId: null }, { assignee: null }) }] : []),
      ...(issue.estimate !== null ? [{ id: 'remove:estimate', label: 'Estimate', action: change({ estimate: null }, { estimate: null }) }] : []),
      ...(issue.dueDate ? [{ id: 'remove:due', label: 'Due date', action: change({ dueDate: null }, { dueDate: null }) }] : []),
      ...(issue.labels.nodes.length ? [{ id: 'remove:labels', label: 'Labels', action: change({ labelIds: [] }, { labels: { nodes: [] } }) }] : []),
      ...(issue.slaType ? [{ id: 'remove:sla', label: 'SLA override', action: change({ slaType: null }, { slaType: null }) }] : []),
    ],
  };
  const convert: MenuItem = {
    id: 'convert', label: 'Convert to', icon: { kind: 'glyph', name: 'convert' },
    children: [
      { id: 'convert:subissue', label: 'Sub-issue of...', action: prompt('convert-subissue') },
      ...(issue.parent ? [{ id: 'convert:top-level', label: 'Top-level issue', action: change({ parentId: null }, { parent: null }) }] : []),
      { id: 'convert:project', label: 'Project...', action: prompt('convert-project') },
    ],
  };

  const copy: MenuItem = {
    id: 'copy', label: 'Copy', icon: { kind: 'glyph', name: 'copy' },
    children: [
      { id: 'copy:id', label: 'Copy ID', action: { kind: 'copy', text: issue.identifier, what: issue.identifier } },
      { id: 'copy:link', label: 'Copy link', action: { kind: 'copy', text: issue.url, what: 'the link' } },
      { id: 'copy:title', label: 'Copy title', action: { kind: 'copy', text: issue.title, what: 'the title' } },
      ...(issue.branchName ? [{ id: 'copy:branch', label: 'Copy branch name', action: { kind: 'copy' as const, text: issue.branchName, what: 'the branch name' } }] : []),
      { id: 'copy:markdown', label: 'Copy as Markdown link', action: { kind: 'copy', text: `[${issue.identifier}: ${issue.title}](${issue.url})`, what: 'the Markdown link' } },
    ],
  };

  return [
    [status, priority, assignee, due, labels, project, milestone, ...(estimate ? [estimate] : []), ...(cycle ? [cycle] : []), more],
    [createRelated, markAs, remove],
    [
      { id: 'open', label: 'Open', icon: { kind: 'glyph', name: 'open' }, action: { kind: 'open' } },
      copy,
      convert,
      { id: 'make-copy', label: 'Make a copy...', icon: { kind: 'glyph', name: 'copy' }, action: prompt('copy') },
      {
        id: 'open-in', label: 'Open in', icon: { kind: 'glyph', name: 'external' },
        children: [{ id: 'open-in:linear', label: 'Linear', icon: { kind: 'glyph', name: 'external' }, action: { kind: 'open-linear' } }],
      },
    ],
    [
      { id: 'favorite', label: 'Favorite', shortcut: '⌥F', icon: { kind: 'glyph', name: 'favorite' }, action: { kind: 'favorite' } },
      {
        id: 'remind', label: 'Remind me', shortcut: '⇧H', icon: { kind: 'glyph', name: 'reminder' },
        children: [
          ...reminderTimes(data.now).map((r) => ({ id: `remind:${r.id}`, label: r.label, action: { kind: 'reminder' as const, at: r.at } })),
          { id: 'remind:custom', label: 'Custom...', action: prompt('reminder-custom') },
        ],
      },
    ],
    [{ id: 'delete', label: 'Delete...', icon: { kind: 'glyph', name: 'delete' }, danger: true, action: { kind: 'delete' } }],
  ];
};

/** Items whose label holds every word of `query`. */
export const filterItems = (items: MenuItem[], query: string): MenuItem[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return words.length ? items.filter((item) => words.every((w) => item.label.toLowerCase().includes(w))) : items;
};

/** Whether a key press is `shortcut`, including Linear's Shift, Command, Option and Control prefixes. */
export const isShortcut = (shortcut: string | undefined, key: string, shift: boolean, meta = false, alt = false, ctrl = false): boolean => {
  if (!shortcut) return false;
  return shift === shortcut.includes('\u21e7')
    && meta === shortcut.includes('\u2318')
    && alt === shortcut.includes('\u2325')
    && ctrl === shortcut.includes('\u2303')
    && key.toUpperCase() === shortcut.slice(-1);
};

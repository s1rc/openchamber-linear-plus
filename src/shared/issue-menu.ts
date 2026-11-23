// What a right click on an issue offers, as Linear's issue menu does: its properties, copy, open, delete. Pure:
// the menu component (src/app/components/issue-menu.tsx) loads the team's data and runs what is chosen.
import { estimateLabel } from './format.ts';
import { compareStates, PRIORITY_NAMES } from './grouping.ts';
import type { Change } from './moves.ts';
import type { CycleSummary, IssueRow, Label, ProjectSummary, Team, User, WorkflowState } from './types.ts';

export type MenuAction =
  | { kind: 'change'; change: Change }
  | { kind: 'copy'; text: string; what: string }
  | { kind: 'open' }
  | { kind: 'open-linear' }
  | { kind: 'delete' };

export type MenuIcon =
  | { kind: 'state'; state: WorkflowState; teamId: string }
  | { kind: 'priority'; priority: IssueRow['priority'] }
  | { kind: 'person'; name: string; url: string | null }
  | { kind: 'swatch'; color: string }
  | { kind: 'project'; icon: string | null; color: string | null }
  | { kind: 'glyph'; name: GlyphName };

export type GlyphName = 'status' | 'priority' | 'assignee' | 'due' | 'labels' | 'project' | 'estimate' | 'cycle' | 'copy' | 'open' | 'external' | 'delete' | 'none';

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
  cycles?: CycleSummary[];
  /** Today, as YYYY-MM-DD in the user's time zone. */
  today: string;
};

const SEARCH_AT = 8;

const change = (input: Change['input'], patch: Change['patch']): MenuAction => ({ kind: 'change', change: { input, patch } });

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
    [status, priority, assignee, due, labels, project, ...(estimate ? [estimate] : []), ...(cycle ? [cycle] : [])],
    [
      { id: 'open', label: 'Open', icon: { kind: 'glyph', name: 'open' }, action: { kind: 'open' } },
      { id: 'open-linear', label: 'Open in Linear', icon: { kind: 'glyph', name: 'external' }, action: { kind: 'open-linear' } },
      copy,
    ],
    [{ id: 'delete', label: 'Delete...', icon: { kind: 'glyph', name: 'delete' }, danger: true, action: { kind: 'delete' } }],
  ];
};

/** Items whose label holds every word of `query`. */
export const filterItems = (items: MenuItem[], query: string): MenuItem[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return words.length ? items.filter((item) => words.every((w) => item.label.toLowerCase().includes(w))) : items;
};

/** Whether a key press is `shortcut`. */
export const isShortcut = (shortcut: string | undefined, key: string, shift: boolean): boolean => {
  if (!shortcut) return false;
  const withShift = shortcut.startsWith('\u21e7');
  return shift === withShift && key.toUpperCase() === shortcut.slice(-1);
};

import { describe, expect, test } from 'bun:test';
import { addDays, filterItems, isShortcut, issueMenu, type MenuData, type MenuItem } from '../src/shared/issue-menu.ts';
import type { IssueRow, Label, WorkflowState } from '../src/shared/types.ts';

const state = (id: string, name: string, type: WorkflowState['type'], position: number): WorkflowState => ({ id, name, type, color: '#888', position });
const STATES = [state('s-done', 'Done', 'completed', 0), state('s-todo', 'Todo', 'unstarted', 0), state('s-back', 'Backlog', 'backlog', 0), state('s-prog', 'In Progress', 'started', 0)];
const bug: Label = { id: 'l-bug', name: 'Bug', color: '#f00' };
const infra: Label = { id: 'l-infra', name: 'Infrastructure', color: '#0f0' };

const issue = (over: Partial<IssueRow> = {}): IssueRow => ({
  id: 'i1', identifier: 'NIL-784', number: 784, title: 'Transfer group personnel/gm', priority: 2, estimate: 1, dueDate: null, sortOrder: 0,
  url: 'https://linear.app/acme/issue/NIL-784/transfer', branchName: 'matt/nil-784-transfer', createdAt: '', updatedAt: '', completedAt: null,
  slaBreachesAt: null, slaType: null, startedAt: null, canceledAt: null, addedToCycleAt: null, creator: null,
  state: STATES[2]!, assignee: null, labels: { nodes: [infra] }, team: { id: 't1', key: 'NIL' },
  project: { id: 'p1', name: 'GitLab migration', color: '#00f', icon: null }, projectMilestone: { id: 'm1', name: 'M3' }, cycle: null, parent: null,
  attachments: { nodes: [] }, outRelations: { nodes: [] }, inRelations: { nodes: [] },
  ...over,
});

const data = (over: Partial<MenuData> = {}): MenuData => ({
  states: STATES,
  team: { cyclesEnabled: true, issueEstimationType: 'tShirt', issueEstimationAllowZero: false, issueEstimationExtended: false },
  estimates: [1, 2, 3, 5, 8],
  members: [{ id: 'u1', name: 'Matt Witkowicz', displayName: 'matt', avatarUrl: null, avatarBackgroundColor: '' }],
  labels: [bug, infra],
  projects: [{ id: 'p1', name: 'GitLab migration', color: '#00f', icon: null }, { id: 'p2', name: 'Q4 Tech Debt', color: '#0ff', icon: null }],
  milestones: [{ id: 'm1', name: 'M3', sortOrder: 1 }, { id: 'm2', name: 'M4', sortOrder: 2 }],
  cycles: [{ id: 'c1', number: 16, name: null, startsAt: '', endsAt: '', progress: 0, isActive: true, isFuture: false, isPast: false } as never],
  today: '2026-11-23',
  now: new Date('2026-11-23T12:00:00Z'),
  ...over,
});

const find = (sections: MenuItem[][], id: string): MenuItem => {
  for (const item of sections.flat()) {
    if (item.id === id) return item;
    const child = item.children?.find((c) => c.id === id);
    if (child) return child;
  }
  throw new Error(`no ${id}`);
};

describe('issueMenu', () => {
  test('properties first with Linear\'s keys, then open and copy, then delete', () => {
    const sections = issueMenu(issue(), data());
    expect(sections.map((s) => s.map((i) => i.id))).toEqual([
      ['status', 'priority', 'assignee', 'due', 'labels', 'project', 'milestone', 'estimate', 'cycle', 'more'],
      ['create-related', 'mark-as', 'remove'],
      ['open', 'copy', 'convert', 'make-copy', 'open-in'],
      ['favorite', 'remind'],
      ['delete'],
    ]);
    expect(sections[0]!.map((i) => i.shortcut)).toEqual(['S', 'P', 'A', '\u21e7D', 'L', '\u21e7P', '\u21e7M', '\u21e7E', '\u21e7C', undefined]);
    expect(find(sections, 'delete')).toMatchObject({ danger: true, action: { kind: 'delete' } });
  });

  test('statuses in Linear\'s order, the current one ticked, each a status change', () => {
    const status = find(issueMenu(issue(), data()), 'status');
    expect(status.children!.map((c) => c.label)).toEqual(['Backlog', 'Todo', 'In Progress', 'Done']);
    expect(status.children!.filter((c) => c.checked).map((c) => c.label)).toEqual(['Backlog']);
    expect(find(issueMenu(issue(), data()), 'status:s-prog').action).toEqual({ kind: 'change', change: { input: { stateId: 's-prog' }, patch: { state: STATES[3] } } });
  });

  test('priority, assignee and estimate changes carry what Linear needs and how the row looks after', () => {
    const sections = issueMenu(issue(), data());
    expect(find(sections, 'priority:1').action).toMatchObject({ change: { input: { priority: 1 }, patch: { priority: 1 } } });
    expect(find(sections, 'priority:2').checked).toBe(true);
    expect(find(sections, 'assignee:none').checked).toBe(true);
    expect(find(sections, 'assignee:u1').action).toMatchObject({ change: { input: { assigneeId: 'u1' }, patch: { assignee: { id: 'u1', name: 'Matt Witkowicz' } } } });
    expect(find(sections, 'estimate').children!.map((c) => c.label)).toEqual(['No estimate', 'XS', 'S', 'M', 'L', 'XL']);
    expect(find(sections, 'estimate:1').checked).toBe(true);
  });

  test('labels toggle one at a time and keep the menu open', () => {
    const sections = issueMenu(issue(), data());
    const labels = find(sections, 'labels');
    expect(labels.children!.map((c) => [c.label, c.checked])).toEqual([['Infrastructure', true], ['Bug', false]]);
    expect(find(sections, 'label:l-bug')).toMatchObject({ keepOpen: true, action: { change: { input: { labelIds: ['l-infra', 'l-bug'] }, patch: { labels: { nodes: [infra, bug] } } } } });
    expect(find(sections, 'label:l-infra').action).toMatchObject({ change: { input: { labelIds: [] }, patch: { labels: { nodes: [] } } } });
  });

  test('a new project clears the milestone, as in Linear', () => {
    const action = find(issueMenu(issue(), data()), 'project:p2').action;
    expect(action).toMatchObject({ change: { input: { projectId: 'p2' }, patch: { projectMilestone: null, project: { id: 'p2', name: 'Q4 Tech Debt' } } } });
    expect(find(issueMenu(issue(), data()), 'project:p1').checked).toBe(true);
  });

  test('a milestone can be set or cleared, with the current one ticked', () => {
    const sections = issueMenu(issue(), data());
    expect(find(sections, 'milestone').shortcut).toBe('\u21e7M');
    expect(find(sections, 'milestone:m1').checked).toBe(true);
    expect(find(sections, 'milestone:m2').action).toEqual({
      kind: 'change', change: { input: { projectMilestoneId: 'm2' }, patch: { projectMilestone: { id: 'm2', name: 'M4' } } },
    });
    expect(find(sections, 'milestone:none').action).toEqual({ kind: 'change', change: { input: { projectMilestoneId: null }, patch: { projectMilestone: null } } });
  });

  test('a milestone list loads only for an issue with a project and keeps an unknown current value', () => {
    const loading = issueMenu(issue(), data({ milestones: undefined }));
    expect(find(loading, 'milestone').loading).toBe(true);
    expect(find(loading, 'milestone:m1').checked).toBe(true);
    const noProject = issueMenu(issue({ project: null, projectMilestone: null }), data({ milestones: undefined }));
    expect(find(noProject, 'milestone').loading).toBe(false);
    expect(find(noProject, 'milestone').children!.map((c) => c.id)).toEqual(['milestone:none']);
  });

  test('due date presets count from today, and Remove shows only when a date is set', () => {
    const due = find(issueMenu(issue(), data()), 'due');
    expect(due.children!.map((c) => [c.label, (c.action as { change: { input: { dueDate: string } } }).change.input.dueDate])).toEqual([
      ['Today', '2026-11-23'], ['Tomorrow', '2026-11-24'], ['End of this week', '2026-11-27'], ['In one week', '2026-11-30'],
    ]);
    const set = find(issueMenu(issue({ dueDate: '2026-11-24' }), data()), 'due');
    expect(set.children!.find((c) => c.checked)?.label).toBe('Tomorrow');
    expect(set.children!.at(-1)).toMatchObject({ label: 'Remove due date', action: { change: { input: { dueDate: null } } } });
  });

  test('estimate and cycle are left out where the team does not use them', () => {
    const ids = issueMenu(issue(), data({ estimates: [], team: { cyclesEnabled: false, issueEstimationType: 'notUsed', issueEstimationAllowZero: false, issueEstimationExtended: false } }))[0]!.map((i) => i.id);
    expect(ids).toEqual(['status', 'priority', 'assignee', 'due', 'labels', 'project', 'milestone', 'more']);
  });

  test('lists still loading say so, and keep the issue\'s own value to tick', () => {
    const sections = issueMenu(issue({ assignee: { id: 'u9', name: 'Someone', displayName: 's', avatarUrl: null, avatarBackgroundColor: '' } }), data({ members: undefined, labels: undefined, projects: undefined }));
    expect(find(sections, 'assignee').loading).toBe(true);
    expect(find(sections, 'assignee:u9').checked).toBe(true);
    expect(find(sections, 'labels').loading).toBe(true);
    expect(find(sections, 'label:l-infra').checked).toBe(true);
    expect(find(sections, 'project:p1').checked).toBe(true);
  });

  test('more properties opens each focused action', () => {
    const more = find(issueMenu(issue(), data()), 'more');
    expect(more.children!.map((c) => [c.id, c.action])).toEqual([
      ['team', { kind: 'prompt', prompt: 'team' }],
      ['release', { kind: 'prompt', prompt: 'release' }],
      ['sla', { kind: 'prompt', prompt: 'sla' }],
      ['add-link', { kind: 'prompt', prompt: 'link' }],
      ['add-customer', { kind: 'prompt', prompt: 'customer' }],
      ['add-document', { kind: 'prompt', prompt: 'document' }],
      ['suggestions', { kind: 'prompt', prompt: 'suggestions' }],
      ['rename', { kind: 'prompt', prompt: 'rename' }],
    ]);
  });

  test('create and mark relations carry direction, type and whether a new issue is needed', () => {
    const sections = issueMenu(issue(), data());
    expect(find(sections, 'create-related:blocked').action).toEqual({
      kind: 'relation', create: true, relation: { id: 'blocked', type: 'blocks', inverse: true },
    });
    expect(find(sections, 'mark-as:blocking').action).toEqual({
      kind: 'relation', create: false, relation: { id: 'blocking', type: 'blocks', inverse: false },
    });
    expect(find(sections, 'mark-as:duplicate').action).toMatchObject({ relation: { type: 'duplicate' } });
  });

  test('remove lists the parent and each blocked or blocking issue, never property shortcuts', () => {
    const blocked = { id: 'i2', identifier: 'NIL-2', title: 'Prerequisite', url: 'https://linear.app/acme/issue/NIL-2', state: STATES[1]! };
    const blocking = { id: 'i3', identifier: 'NIL-3', title: 'Dependent', url: 'https://linear.app/acme/issue/NIL-3', state: STATES[1]! };
    const sections = issueMenu(issue({
      parent: { id: 'p1', identifier: 'NIL-1', title: 'Parent' },
      inRelations: { nodes: [{ id: 'r2', type: 'blocks', issue: blocked }] },
      outRelations: { nodes: [{ id: 'r3', type: 'blocks', relatedIssue: blocking }] },
    }), data());
    expect(find(sections, 'remove').children!.map((c) => c.id)).toEqual(['remove:parent', 'remove:blocked:r2', 'remove:blocking:r3']);
    expect(find(sections, 'remove:parent').action).toMatchObject({ change: { input: { parentId: null } } });
    expect(find(sections, 'remove:blocked:r2')).toMatchObject({ label: 'Blocked issue NIL-2 Prerequisite', action: { kind: 'delete-relation', relationId: 'r2', other: blocked } });
    expect(find(sections, 'remove:blocking:r3')).toMatchObject({ label: 'Blocking issue NIL-3 Dependent', action: { kind: 'delete-relation', relationId: 'r3', other: blocking } });
    const empty = issueMenu(issue({ parent: null }), data());
    expect(find(empty, 'remove').children).toEqual([]);
  });

  test('convert, copy, open, favorite and reminders have real actions', () => {
    const sections = issueMenu(issue({ parent: { id: 'p', identifier: 'NIL-1' } }), data());
    expect(find(sections, 'convert:subissue').action).toEqual({ kind: 'prompt', prompt: 'convert-subissue' });
    expect(find(sections, 'convert:top-level').action).toMatchObject({ change: { input: { parentId: null } } });
    expect(find(sections, 'convert:project').action).toEqual({ kind: 'prompt', prompt: 'convert-project' });
    expect(find(sections, 'make-copy').action).toEqual({ kind: 'prompt', prompt: 'copy' });
    expect(find(sections, 'open-in:linear').action).toEqual({ kind: 'open-linear' });
    expect(find(sections, 'favorite').action).toEqual({ kind: 'favorite' });
    const reminders = find(sections, 'remind').children!;
    expect(reminders.map((r) => r.id)).toEqual(['remind:hour', 'remind:tomorrow', 'remind:week', 'remind:month', 'remind:custom']);
    expect(reminders.slice(0, 4).every((r) => r.action?.kind === 'reminder' && Date.parse(r.action.at) > data().now.getTime())).toBe(true);
  });

  test('copy offers the ID, link, title, branch and a Markdown link', () => {
    const copy = find(issueMenu(issue(), data()), 'copy');
    expect(copy.children!.map((c) => c.action)).toEqual([
      { kind: 'copy', text: 'NIL-784', what: 'NIL-784' },
      { kind: 'copy', text: 'https://linear.app/acme/issue/NIL-784/transfer', what: 'the link' },
      { kind: 'copy', text: 'Transfer group personnel/gm', what: 'the title' },
      { kind: 'copy', text: 'matt/nil-784-transfer', what: 'the branch name' },
      { kind: 'copy', text: '[NIL-784: Transfer group personnel/gm](https://linear.app/acme/issue/NIL-784/transfer)', what: 'the Markdown link' },
    ]);
    expect(find(issueMenu(issue({ branchName: '' }), data()), 'copy').children!.map((c) => c.id)).not.toContain('copy:branch');
  });

  test('a long list gets a filter field', () => {
    const many = Array.from({ length: 9 }, (_, n) => ({ id: `u${n}`, name: `Person ${n}`, displayName: '', avatarUrl: null, avatarBackgroundColor: '' }));
    expect(find(issueMenu(issue(), data({ members: many })), 'assignee').searchable).toBe(true);
    expect(find(issueMenu(issue(), data()), 'assignee').searchable).toBe(false);
  });
});

describe('menu helpers', () => {
  test('filterItems keeps items with every word', () => {
    const items = find(issueMenu(issue(), data()), 'status').children!;
    expect(filterItems(items, 'in prog').map((i) => i.label)).toEqual(['In Progress']);
    expect(filterItems(items, '  ')).toBe(items);
  });
  test('isShortcut matches the key and Shift as Linear shows them', () => {
    expect(isShortcut('S', 's', false)).toBe(true);
    expect(isShortcut('S', 'S', true)).toBe(false);
    expect(isShortcut('\u21e7P', 'P', true)).toBe(true);
    expect(isShortcut('\u21e7P', 'p', false)).toBe(false);
    expect(isShortcut(undefined, 's', false)).toBe(false);
    expect(isShortcut('\u2318\u21e7M', 'm', true, true)).toBe(true);
    expect(isShortcut('\u2318\u21e7M', 'm', true, false)).toBe(false);
    expect(isShortcut('\u2325F', 'f', false, false, true)).toBe(true);
    expect(isShortcut('\u2303L', 'l', false, false, false, true)).toBe(true);
  });
  test('addDays crosses months and years on the calendar', () => {
    expect(addDays('2026-11-30', 1)).toBe('2026-12-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });
});

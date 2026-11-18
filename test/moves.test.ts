import { describe, expect, test } from 'bun:test';
import { groupIssues, type Group } from '../src/shared/grouping.ts';
import { acceptStateOf, declineStateOf, estimateScale, planDrop, retryBranchName, startedStateOf, startedStatesOf, worktreeOnBranch } from '../src/shared/moves.ts';
import type { IssueRow, StateType, WorkflowState } from '../src/shared/types.ts';

const state = (id: string, name: string, type: StateType, position: number): WorkflowState => ({ id, name, type, color: '#000', position });

// Like the real workspace: SC and GM are sub-teams with their own states; both have "In Progress".
const sc = [state('sc-triage', 'Triage', 'triage', 0), state('sc-backlog', 'Backlog', 'backlog', 1), state('sc-ready', 'Ready for Dev', 'unstarted', 2),
  state('sc-progress', 'In Progress', 'started', 3), state('sc-review', 'In Code Review', 'started', 4), state('sc-done', 'Done', 'completed', 5),
  state('sc-cancel', 'Canceled', 'canceled', 6)];
const gm = [state('gm-open', 'Open', 'unstarted', 1), state('gm-progress', 'In Progress', 'started', 2), state('gm-merged', 'Merged', 'completed', 3),
  state('gm-wnf', 'Will Not Fix', 'canceled', 2), state('gm-cancel', 'Canceled', 'canceled', 1)];
const con = [state('con-merged', 'Merged', 'completed', 3)];
const statesByTeam = new Map([['sc', sc], ['gm', gm], ['con', con]]);
const board = ['sc', 'gm', 'con'];

const person = { id: 'u1', name: 'Ann', displayName: 'Ann', avatarUrl: null, avatarBackgroundColor: '' };
const issue = (extra: Partial<IssueRow> = {}): IssueRow => ({
  id: 'i1', identifier: 'SC-1', title: 'T', priority: 3, state: sc[2]!, team: { id: 'sc', key: 'SC' }, assignee: null, project: null,
  cycle: null, labels: { nodes: [] }, ...extra,
} as unknown as IssueRow);

const column = (field: Group['field'], key: string, extra: Partial<Group> = {}): Group => ({
  key, title: key, field, rank: [0, 0], issues: [], sample: null, state: null, teamId: null, label: null, person: null, project: null, ...extra,
});

describe('planDrop', () => {
  test('a status the issue\'s own team has is a plain state change', () => {
    expect(planDrop(issue(), column('status', 'started|In Progress'), null, statesByTeam, board)).toEqual({
      kind: 'update', change: { input: { stateId: 'sc-progress' }, patch: { state: sc[3] } },
    });
  });
  test('the column it is already in does nothing', () => {
    expect(planDrop(issue(), column('status', 'unstarted|Ready for Dev'), null, statesByTeam, board)).toEqual({ kind: 'none' });
  });
  test('a status only other teams have moves team, with every team that has it to choose from', () => {
    const plan = planDrop(issue(), column('status', 'completed|Merged'), null, statesByTeam, board);
    expect(plan.kind).toBe('team');
    if (plan.kind === 'team') expect(plan.choices.map((c) => [c.teamId, c.state.id])).toEqual([['gm', 'gm-merged'], ['con', 'con-merged']]);
  });
  test('only teams on the board are offered', () => {
    const plan = planDrop(issue(), column('status', 'completed|Merged'), null, statesByTeam, ['sc', 'con']);
    if (plan.kind === 'team') expect(plan.choices.map((c) => c.teamId)).toEqual(['con']);
  });
  test('a status no team on the board has is refused', () => {
    expect(planDrop(issue(), column('status', 'started|In QA'), null, statesByTeam, board)).toMatchObject({ kind: 'refused' });
  });
  test('priority, assignee and project columns set that field', () => {
    expect(planDrop(issue(), column('priority', '1'), null, statesByTeam, board)).toEqual({ kind: 'update', change: { input: { priority: 1 }, patch: { priority: 1 } } });
    expect(planDrop(issue(), column('assignee', 'u1', { person }), null, statesByTeam, board)).toEqual({
      kind: 'update', change: { input: { assigneeId: 'u1' }, patch: { assignee: person } },
    });
    expect(planDrop(issue({ assignee: person }), column('assignee', 'none'), null, statesByTeam, board)).toEqual({
      kind: 'update', change: { input: { assigneeId: null }, patch: { assignee: null } },
    });
    expect(planDrop(issue(), column('project', 'p1', { project: { id: 'p1', name: 'P', icon: null, color: '#fff' } }), null, statesByTeam, board)).toMatchObject({
      kind: 'update', change: { input: { projectId: 'p1' } },
    });
  });
  test('a cell sets both its column and its row', () => {
    expect(planDrop(issue(), column('status', 'started|In Progress'), column('priority', '2'), statesByTeam, board)).toEqual({
      kind: 'update', change: { input: { stateId: 'sc-progress', priority: 2 }, patch: { state: sc[3], priority: 2 } },
    });
  });
  test('a team move carries the row\'s change along', () => {
    const plan = planDrop(issue(), column('status', 'completed|Merged'), column('priority', '1'), statesByTeam, board);
    expect(plan).toMatchObject({ kind: 'team', extra: { input: { priority: 1 } } });
  });
  test('cycle and label columns are refused', () => {
    expect(planDrop(issue(), column('cycle', 'c1'), null, statesByTeam, board)).toMatchObject({ kind: 'refused' });
    expect(planDrop(issue(), column('label', 'l1'), null, statesByTeam, board)).toMatchObject({ kind: 'refused' });
  });
  test('works on columns made by groupIssues', () => {
    const columns = groupIssues([issue()], 'status', 'asc', { statesByTeam, teamIds: board });
    const done = columns.find((c) => c.title === 'Done')!;
    expect(planDrop(issue(), done, null, statesByTeam, board)).toMatchObject({ kind: 'update', change: { input: { stateId: 'sc-done' } } });
  });
});

describe('triage and start session targets', () => {
  test('accept goes to the team default, else the first backlog, else unstarted; never triage', () => {
    expect(acceptStateOf({ defaultIssueState: { id: 'sc-ready' } }, sc)?.id).toBe('sc-ready');
    expect(acceptStateOf({ defaultIssueState: null }, sc)?.id).toBe('sc-backlog');
    expect(acceptStateOf({ defaultIssueState: { id: 'sc-triage' } }, sc)?.id).toBe('sc-backlog');
    expect(acceptStateOf(undefined, gm)?.id).toBe('gm-open');
  });
  test('decline goes to the first canceled status by position', () => {
    expect(declineStateOf(gm)?.id).toBe('gm-cancel');
    expect(declineStateOf([])).toBeNull();
  });
  test('start session moves only issues not yet started', () => {
    expect(startedStateOf({ state: sc[2]! }, sc)?.id).toBe('sc-progress');
    expect(startedStateOf({ state: sc[4]! }, sc)).toBeNull();
    expect(startedStateOf({ state: sc[5]! }, sc)).toBeNull();
  });
});

describe('estimateScale', () => {
  const team = (type: string, zero = false, extended = false) => ({ issueEstimationType: type, issueEstimationAllowZero: zero, issueEstimationExtended: extended });
  test('each scale, with zero and extended values when the team allows them', () => {
    expect(estimateScale(team('fibonacci'))).toEqual([1, 2, 3, 5, 8]);
    expect(estimateScale(team('exponential', true, true))).toEqual([0, 1, 2, 4, 8, 16, 32, 64]);
    expect(estimateScale(team('tShirt'))).toEqual([1, 2, 3, 5, 8]);
    expect(estimateScale(team('notUsed'))).toEqual([]);
    expect(estimateScale(undefined)).toEqual([]);
  });
});

describe('worktreeOnBranch', () => {
  const trees = [
    { directory: '/wt/a', branch: 'con-315-linear-extension-test', status: 'ready' },
    { directory: '/wt/b', branch: 'refs/heads/eng-1-fix', status: 'ready' },
    { directory: '/wt/c', branch: 'eng-2-gone', status: 'missing' },
  ];
  test('finds the ready worktree on a branch, in any case', () => {
    expect(worktreeOnBranch(trees, 'con-315-linear-extension-test')).toBe('/wt/a');
    expect(worktreeOnBranch(trees, 'CON-315-Linear-Extension-Test')).toBe('/wt/a');
    expect(worktreeOnBranch(trees, 'eng-1-fix')).toBe('/wt/b');
  });
  test('ignores a worktree that is not ready, an unknown branch and an empty name', () => {
    expect(worktreeOnBranch(trees, 'eng-2-gone')).toBeNull();
    expect(worktreeOnBranch(trees, 'nope')).toBeNull();
    expect(worktreeOnBranch(trees, '  ')).toBeNull();
  });
});

describe('retryBranchName', () => {
  test('keeps the branch until a start is refused, then numbers it from 2', () => {
    expect(retryBranchName('con-315-test', 0)).toBe('con-315-test');
    expect(retryBranchName('con-315-test', 1)).toBe('con-315-test-2');
    expect(retryBranchName('con-315-test', 2)).toBe('con-315-test-3');
  });
});

describe('startedStateOf picks work in motion', () => {
  const states = [state('t', 'Todo', 'unstarted', 1), state('b', 'Blocked', 'started', 2), state('p', 'In Progress', 'started', 3), state('r', 'In Review', 'started', 4)];
  const todo = { state: states[0]! };
  test('prefers In Progress over an earlier Blocked', () => {
    expect(startedStateOf(todo, states)?.id).toBe('p');
  });
  test('falls back to a status named like work, then to one that is not a wait', () => {
    expect(startedStateOf(todo, [states[1]!, state('d', 'Doing', 'started', 5)])?.id).toBe('d');
    expect(startedStateOf(todo, [states[1]!, state('x', 'In Review', 'started', 6)])?.id).toBe('x');
    expect(startedStateOf(todo, [states[1]!])?.id).toBe('b');
  });
  test('moves nothing for an issue already started or done', () => {
    expect(startedStateOf({ state: states[2]! }, states)).toBeNull();
  });
});

describe('start choices and the remembered status', () => {
  const states = [state('t', 'Todo', 'unstarted', 1), state('pl', 'In Planning', 'unstarted', 2), state('b', 'Blocked', 'started', 3), state('p', 'In Progress', 'started', 4)];
  const todo = { state: states[0]! };
  test('a planning status is offered even when it is not a started one', () => {
    expect(startedStatesOf(states).map((s) => s.id)).toEqual(['pl', 'b', 'p']);
  });
  test('the status used last wins, by name in any case', () => {
    expect(startedStateOf(todo, states, 'in planning')?.id).toBe('pl');
    expect(startedStateOf(todo, states, 'In Progress')?.id).toBe('p');
  });
  test('an unknown remembered name falls back to In Progress', () => {
    expect(startedStateOf(todo, states, 'Gone')?.id).toBe('p');
    expect(startedStateOf(todo, states, null)?.id).toBe('p');
  });
  test('moves nothing when the issue is already planning or started', () => {
    expect(startedStateOf({ state: states[1]! }, states, 'In Progress')).toBeNull();
    expect(startedStateOf({ state: states[3]! }, states)).toBeNull();
  });
});

import { describe, expect, test } from 'bun:test';
import { groupIssues, type Group } from '../src/shared/grouping.ts';
import { acceptStateOf, declineStateOf, estimateScale, planDrop, startedStateOf } from '../src/shared/moves.ts';
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

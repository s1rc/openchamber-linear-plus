import { describe, expect, test } from 'bun:test';
import { cellsOf, splitColumns } from '../src/shared/board.ts';
import { compareStates, groupIssues } from '../src/shared/grouping.ts';
import type { IssueRow, StateType, WorkflowState } from '../src/shared/types.ts';

const state = (id: string, name: string, type: StateType, position: number): WorkflowState => ({ id, name, type, color: '#000', position });

// The shape of the real workspace: positions run into the thousands and overlap between types.
const states = [
  state('triage', 'Triage', 'triage', 0),
  state('backlog', 'Backlog', 'backlog', 2000),
  state('grooming', 'Needs Grooming', 'unstarted', 1100),
  state('ready', 'Ready for Dev', 'unstarted', 1200),
  state('progress', 'In Progress', 'started', 1500),
  state('review', 'In Code Review', 'started', 1600),
  state('staging', 'In Staging', 'started', 1700),
  state('done', 'Done', 'completed', 3000),
  state('dup', 'Duplicate', 'duplicate', 3100),
];
const byId = Object.fromEntries(states.map((s) => [s.id, s]));
const statesByTeam = new Map([['sc', states]]);
const seeds = { statesByTeam };

const issue = (id: string, stateId: string, extra: Partial<IssueRow> = {}): IssueRow => ({
  id, identifier: id, title: id, priority: 0, state: byId[stateId]!, team: { id: 'sc', key: 'SC' }, assignee: null, project: null,
  cycle: null, labels: { nodes: [] }, ...extra,
} as unknown as IssueRow);

describe('compareStates', () => {
  test('type decides first, position only within a type', () => {
    const sorted = [...states].sort(compareStates).map((s) => s.name);
    expect(sorted).toEqual(['Triage', 'Backlog', 'Needs Grooming', 'Ready for Dev', 'In Progress', 'In Code Review', 'In Staging', 'Done', 'Duplicate']);
  });
});

describe('groupIssues by status', () => {
  const issues = [issue('A', 'review'), issue('B', 'backlog'), issue('C', 'triage'), issue('D', 'progress'), issue('E', 'grooming'), issue('F', 'staging'), issue('G', 'ready')];
  test('ascending is workflow order', () => {
    expect(groupIssues(issues, 'status').map((g) => g.title)).toEqual(['Triage', 'Backlog', 'Needs Grooming', 'Ready for Dev', 'In Progress', 'In Code Review', 'In Staging']);
  });
  test('descending reverses it, as the order toggle does', () => {
    expect(groupIssues(issues, 'status', 'desc').map((g) => g.title)).toEqual(['In Staging', 'In Code Review', 'In Progress', 'Ready for Dev', 'Needs Grooming', 'Backlog', 'Triage']);
  });
  test('seeding adds a team\'s other states, but not triage or duplicate', () => {
    const titles = groupIssues([issue('A', 'progress')], 'status', 'asc', seeds).map((g) => g.title);
    expect(titles).toEqual(['Backlog', 'Needs Grooming', 'Ready for Dev', 'In Progress', 'In Code Review', 'In Staging', 'Done']);
  });
  test('seeding covers a team in scope that has no loaded issue, and every team of a mixed list', () => {
    const mob = [state('m-todo', 'Todo', 'unstarted', 10), state('m-progress', 'In Progress', 'started', 20)];
    const both = { statesByTeam: new Map([['sc', states], ['mob', mob]]) };
    expect(groupIssues([], 'status', 'asc', { ...both, teamIds: ['mob'] }).map((g) => g.title)).toEqual(['Todo', 'In Progress']);
    const mixed = [issue('A', 'progress'), issue('X', 'progress', { team: { id: 'mob', key: 'MOB' } })];
    const titles = groupIssues(mixed, 'status', 'asc', both).map((g) => g.title);
    expect(titles).toContain('Backlog');
    expect(titles).toContain('Todo');
    expect(titles.filter((t) => t === 'In Progress')).toHaveLength(1);
  });
  test('two teams merge states of the same name and type', () => {
    const other = issue('X', 'progress', { team: { id: 'mob', key: 'MOB' } });
    const groups = groupIssues([issue('A', 'progress'), other], 'status');
    expect(groups).toHaveLength(1);
    expect(groups[0]!.issues).toHaveLength(2);
  });
});

describe('groupIssues by other fields', () => {
  test('priority runs urgent to none', () => {
    const groups = groupIssues([issue('A', 'done', { priority: 0 }), issue('B', 'done', { priority: 3 }), issue('C', 'done', { priority: 1 })], 'priority');
    expect(groups.map((g) => g.title)).toEqual(['Urgent', 'Medium', 'No priority']);
  });
  test('seeding priority shows every level', () => {
    expect(groupIssues([issue('A', 'done', { priority: 2 })], 'priority', 'asc', seeds)).toHaveLength(5);
  });
  test('seeding assignee, label and project shows the ones handed in', () => {
    const person = { id: '9', name: 'Mia', displayName: 'Mia', avatarUrl: null, avatarBackgroundColor: '' };
    const withPeople = { ...seeds, people: [person], labels: [{ id: 'l1', name: 'Bug', color: '#f00' }], projects: [{ id: 'p1', name: 'Checkout', icon: null, color: '#0f0' }] };
    const some = [issue('A', 'done')];
    expect(groupIssues(some, 'assignee', 'asc', withPeople).map((g) => [g.title, g.issues.length])).toEqual([['Mia', 0], ['No assignee', 1]]);
    expect(groupIssues(some, 'label', 'asc', withPeople).map((g) => [g.title, g.issues.length])).toEqual([['Bug', 0], ['No label', 1]]);
    expect(groupIssues(some, 'project', 'asc', withPeople).map((g) => g.title)).toEqual(['Checkout', 'No project']);
    expect(groupIssues(some, 'assignee', 'asc', withPeople)[0]!.person).toEqual(person);
  });
  test('assignee: people by name, unassigned last', () => {
    const person = (id: string, name: string) => ({ id, name, displayName: name, avatarUrl: null, avatarBackgroundColor: '' });
    const groups = groupIssues([issue('A', 'done'), issue('B', 'done', { assignee: person('2', 'Zed') }), issue('C', 'done', { assignee: person('1', 'Ann') })], 'assignee');
    expect(groups.map((g) => g.title)).toEqual(['Ann', 'Zed', 'No assignee']);
  });
  test('label: an issue sits in each of its labels', () => {
    const l = (id: string, name: string) => ({ id, name, color: '#fff' });
    const groups = groupIssues([issue('A', 'done', { labels: { nodes: [l('1', 'Bug'), l('2', 'API')] } }), issue('B', 'done')], 'label');
    expect(groups.map((g) => [g.title, g.issues.length])).toEqual([['API', 1], ['Bug', 1], ['No label', 1]]);
  });
  test('cycle: newest first, none last', () => {
    const c = (n: number) => ({ id: `c${n}`, number: n, name: null });
    const groups = groupIssues([issue('A', 'done', { cycle: c(40) }), issue('B', 'done', { cycle: c(42) }), issue('C', 'done')], 'cycle');
    expect(groups.map((g) => g.title)).toEqual(['Cycle 42', 'Cycle 40', 'No cycle']);
  });
});

describe('board columns', () => {
  const columns = groupIssues([issue('A', 'progress'), issue('B', 'progress'), issue('C', 'review')], 'status', 'asc', seeds);
  test('empty columns hide by default', () => {
    const { visible, hidden } = splitColumns(columns, false, {});
    expect(visible.map((c) => c.title)).toEqual(['In Progress', 'In Code Review']);
    expect(hidden.map((c) => c.title)).toEqual(['Backlog', 'Needs Grooming', 'Ready for Dev', 'In Staging', 'Done']);
  });
  test('show empty keeps them all', () => {
    expect(splitColumns(columns, true, {}).hidden).toEqual([]);
  });
  test('a hidden column stays hidden, a pinned one stays shown', () => {
    const { visible, hidden } = splitColumns(columns, false, { 'started|In Progress': 'hide', 'backlog|Backlog': 'show' });
    expect(visible.map((c) => c.title)).toEqual(['Backlog', 'In Code Review']);
    expect(hidden.map((c) => c.title)).toContain('In Progress');
  });
  test('rows split each column by the row\'s issues', () => {
    const cells = cellsOf(columns, new Set(['A', 'C']));
    expect(cells.find((c) => c.title === 'In Progress')!.issues.map((i) => i.id)).toEqual(['A']);
    expect(cells.find((c) => c.title === 'In Code Review')!.issues.map((i) => i.id)).toEqual(['C']);
  });
});

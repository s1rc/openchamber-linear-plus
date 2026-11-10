import { describe, expect, test } from 'bun:test';
import { changedOptions, factoryOptions, orderIssues, resolveOptions, subGroupChoices, visibleIssues } from '../src/shared/view-options.ts';
import type { IssueRow } from '../src/shared/types.ts';

const issue = (id: string, extra: Partial<IssueRow> = {}): IssueRow => ({
  id, identifier: id, title: id, priority: 0, estimate: null, dueDate: null, createdAt: '2026-11-01T00:00:00Z', updatedAt: '2026-11-01T00:00:00Z',
  completedAt: null, parent: null, state: { id: 's', name: 'Todo', type: 'unstarted', color: '', position: 0 }, ...extra,
} as unknown as IssueRow);

const ids = (list: IssueRow[]) => list.map((i) => i.id);

describe('orderIssues', () => {
  test('priority: urgent first, none last, ties by recent update', () => {
    const list = [issue('none'), issue('low', { priority: 4 }), issue('urgent', { priority: 1 }), issue('low2', { priority: 4, updatedAt: '2026-11-05T00:00:00Z' })];
    expect(ids(orderIssues(list, { ordering: 'priority', reverse: false, completedByRecency: false }))).toEqual(['urgent', 'low2', 'low', 'none']);
  });
  test('created: newest first, reversed flips it', () => {
    const list = [issue('old', { createdAt: '2026-10-01T00:00:00Z' }), issue('new', { createdAt: '2026-11-09T00:00:00Z' })];
    expect(ids(orderIssues(list, { ordering: 'created', reverse: false, completedByRecency: false }))).toEqual(['new', 'old']);
    expect(ids(orderIssues(list, { ordering: 'created', reverse: true, completedByRecency: false }))).toEqual(['old', 'new']);
  });
  test('no due date stays last either way', () => {
    const list = [issue('none'), issue('late', { dueDate: '2026-12-01' }), issue('soon', { dueDate: '2026-11-12' })];
    expect(ids(orderIssues(list, { ordering: 'dueDate', reverse: false, completedByRecency: false }))).toEqual(['soon', 'late', 'none']);
    expect(ids(orderIssues(list, { ordering: 'dueDate', reverse: true, completedByRecency: false }))).toEqual(['late', 'soon', 'none']);
  });
  test('completed by recency orders finished issues by when they finished', () => {
    const done = { id: 'd', name: 'Done', type: 'completed' as const, color: '', position: 0 };
    const list = [issue('a', { state: done, completedAt: '2026-11-01T00:00:00Z' }), issue('b', { state: done, completedAt: '2026-11-08T00:00:00Z' })];
    expect(ids(orderIssues(list, { ordering: 'title', reverse: false, completedByRecency: true }))).toEqual(['b', 'a']);
    expect(ids(orderIssues(list, { ordering: 'title', reverse: false, completedByRecency: false }))).toEqual(['a', 'b']);
  });
});

describe('visibleIssues', () => {
  const triage = { id: 't', name: 'Triage', type: 'triage' as const, color: '', position: 0 };
  const list = [issue('plain'), issue('child', { parent: { id: 'p', identifier: 'X-1' } }), issue('inbox', { state: triage })];
  test('everything by default', () => expect(ids(visibleIssues(list, { showSubIssues: true, showTriage: true }))).toEqual(['plain', 'child', 'inbox']));
  test('sub-issues and triage can be left out', () => {
    expect(ids(visibleIssues(list, { showSubIssues: false, showTriage: true }))).toEqual(['plain', 'inbox']);
    expect(ids(visibleIssues(list, { showSubIssues: true, showTriage: false }))).toEqual(['plain', 'child']);
  });
});

describe('option layers', () => {
  test('list and board start with the properties Linear\'s own menus turn on', () => {
    expect(factoryOptions('list').properties).toContain('updated');
    expect(factoryOptions('list').properties).not.toContain('project');
    expect(factoryOptions('board').properties).toContain('project');
    expect(factoryOptions('board').properties).not.toContain('updated');
    for (const mode of ['list', 'board'] as const) {
      for (const off of ['creator', 'milestone', 'release', 'links', 'customers', 'customerRevenue', 'timeInStatus'] as const) {
        expect(factoryOptions(mode).properties).not.toContain(off);
      }
    }
  });
  test('sub-teams are included and sub-issues nest when they match, as in Linear', () => {
    expect(factoryOptions('list')).toMatchObject({ showSubTeams: true, nested: 'matching' });
  });
  test('later layers win, key by key', () => {
    const merged = resolveOptions('list', { grouping: 'assignee', reverse: true }, { grouping: 'priority' });
    expect(merged).toMatchObject({ grouping: 'priority', reverse: true, ordering: 'priority' });
  });
  test('unknown properties from older storage are dropped', () => {
    expect(resolveOptions('list', { properties: ['id', 'nonsense' as never] }).properties).toEqual(['id']);
  });
  test('only what changed is stored', () => {
    const options = { ...factoryOptions('board'), showEmpty: true };
    expect(changedOptions(factoryOptions('board'), options)).toEqual({ showEmpty: true });
    expect(changedOptions(factoryOptions('board'), factoryOptions('board'))).toEqual({});
  });
  test('against a user default, turning a default-on setting off is a change', () => {
    const base = resolveOptions('list', { reverse: true });
    expect(changedOptions(base, { ...base, reverse: false })).toEqual({ reverse: false });
  });
  test('sub-grouping cannot repeat the grouping', () => {
    expect(subGroupChoices('status').map((c) => c.id)).not.toContain('status');
    expect(subGroupChoices('status').map((c) => c.id)).toContain('none');
  });
});

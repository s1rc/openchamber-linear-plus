import { describe, expect, test } from 'bun:test';
import { nestIssues } from '../src/shared/nesting.ts';
import type { IssueRow } from '../src/shared/types.ts';

const issue = (id: string, parent?: string): IssueRow => ({ id, identifier: id, parent: parent ? { id: parent, identifier: parent } : null } as unknown as IssueRow);
const layout = (rows: { issue: IssueRow; depth: number }[]) => rows.map((r) => `${'-'.repeat(r.depth)}${r.issue.id}`);

describe('nestIssues', () => {
  const todo = [issue('P'), issue('X'), issue('C1', 'P'), issue('C2', 'P'), issue('G', 'C1')];

  test('hide: every issue is its own row', () => {
    expect(layout(nestIssues(todo, 'hide', todo))).toEqual(['P', 'X', 'C1', 'C2', 'G']);
  });
  test('matching: children follow their parent, grandchildren too', () => {
    expect(layout(nestIssues(todo, 'matching', todo))).toEqual(['P', '-C1', '--G', '-C2', 'X']);
  });
  test('matching: a child whose parent is in another group stands alone', () => {
    expect(layout(nestIssues([issue('C3', 'Q'), issue('Y')], 'matching', [...todo, issue('C3', 'Q'), issue('Y')]))).toEqual(['C3', 'Y']);
  });
  test('all: a child leaves its own group and shows under its parent in the parent\'s group', () => {
    const parentGroup = [issue('P')];
    const childGroup = [issue('C1', 'P')];
    const shown = [...parentGroup, ...childGroup];
    expect(layout(nestIssues(parentGroup, 'all', shown))).toEqual(['P', '-C1']);
    expect(layout(nestIssues(childGroup, 'all', shown))).toEqual([]);
  });
  test('all: sub-issues the view left out show under their parent', () => {
    const extra = new Map([['P', [issue('HIDDEN', 'P')]]]);
    expect(layout(nestIssues([issue('P')], 'all', [issue('P')], extra))).toEqual(['P', '-HIDDEN']);
  });
  test('all: an orphan whose parent is not listed stays a top-level row', () => {
    expect(layout(nestIssues([issue('C', 'GONE')], 'all', [issue('C', 'GONE')]))).toEqual(['C']);
  });
  test('an issue never appears twice', () => {
    const extra = new Map([['P', [issue('C1', 'P')]]]);
    const rows = layout(nestIssues([issue('P'), issue('C1', 'P')], 'all', [issue('P'), issue('C1', 'P')], extra));
    expect(rows).toEqual(['P', '-C1']);
  });
});

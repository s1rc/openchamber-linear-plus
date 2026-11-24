import { describe, expect, test } from 'bun:test';
import { blockingCounts, dependencyGroup, issueClosed } from '../src/shared/relations.ts';
import type { IssueRow, StateType } from '../src/shared/types.ts';

const state = (type: StateType) => ({ type });
const relation = (type: StateType) => ({ state: state(type) });
const issue = (current: StateType, incoming: StateType[], outgoing: StateType[]): IssueRow => ({
  state: state(current),
  inRelations: { nodes: incoming.map((type) => ({ type: 'blocks', issue: relation(type) })) },
  outRelations: { nodes: outgoing.map((type) => ({ type: 'blocks', relatedIssue: relation(type) })) },
} as IssueRow);

describe('blocking relations', () => {
  test('open issues count only open prerequisites and dependents', () => {
    expect(blockingCounts(issue('started', ['started', 'completed', 'canceled'], ['backlog', 'completed', 'duplicate']))).toEqual({ blockedBy: 1, blocking: 1 });
  });

  test('a completed, canceled or duplicate issue shows no blocking badges', () => {
    for (const type of ['completed', 'canceled', 'duplicate'] as const) {
      expect(blockingCounts(issue(type, ['started'], ['started']))).toEqual({ blockedBy: 0, blocking: 0 });
    }
  });

  test('a settled dependency reads as Related in the issue view', () => {
    expect(dependencyGroup({ state: state('started') }, relation('completed'), true)).toBe('Related');
    expect(dependencyGroup({ state: state('completed') }, relation('started'), false)).toBe('Related');
    expect(dependencyGroup({ state: state('started') }, relation('backlog'), true)).toBe('Blocked by');
    expect(dependencyGroup({ state: state('started') }, relation('backlog'), false)).toBe('Blocking');
  });

  test('closed includes every finished workflow type', () => {
    expect(['completed', 'canceled', 'duplicate'].every((type) => issueClosed(state(type as StateType)))).toBe(true);
    expect(issueClosed(state('started'))).toBe(false);
  });
});

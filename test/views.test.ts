import { describe, expect, test } from 'bun:test';
import { orderCycles } from '../src/shared/cycles.ts';
import { inScope } from '../src/shared/inbox.ts';
import type { CycleSummary, Notification } from '../src/shared/types.ts';

const cycle = (number: number, flags: Partial<CycleSummary>): CycleSummary => ({
  id: `c${number}`, number, name: null, startsAt: '', endsAt: '', progress: 0, isActive: false, isFuture: false, isPast: false, completedAt: null, ...flags,
});

describe('orderCycles', () => {
  test('upcoming, then current, then past newest first', () => {
    const list = [cycle(66, { isPast: true }), cycle(69, { isFuture: true }), cycle(68, { isActive: true }), cycle(70, { isFuture: true }), cycle(67, { isPast: true })];
    expect(orderCycles(list).map((c) => c.number)).toEqual([70, 69, 68, 67, 66]);
  });
  test('does not change the list it was given', () => {
    const list = [cycle(1, { isPast: true }), cycle(2, { isPast: true })];
    orderCycles(list);
    expect(list.map((c) => c.number)).toEqual([1, 2]);
  });
});

const notification = (extra: Partial<Notification>): Notification => ({ id: 'n', type: 't', title: '', subtitle: '', url: '', inboxUrl: '', readAt: null, createdAt: '', actor: null, ...extra });

describe('inScope', () => {
  const issue = (team: string, project: string | null) => ({ id: 'i', identifier: 'X-1', title: '', url: '', state: { id: 's', name: '', type: 'started' as const, color: '', position: 0 }, team: { id: team, key: team }, project: project ? { id: project } : null });
  test('an issue in a mapped team, or in a mapped project of another team', () => {
    expect(inScope(notification({ issue: issue('t1', null) }), ['t1'], [])).toBe(true);
    expect(inScope(notification({ issue: issue('t2', 'p1') }), ['t1'], ['p1'])).toBe(true);
    expect(inScope(notification({ issue: issue('t2', 'p2') }), ['t1'], ['p1'])).toBe(false);
  });
  test('a project notification, and ones about neither', () => {
    expect(inScope(notification({ project: { id: 'p1', name: '', url: '' } }), [], ['p1'])).toBe(true);
    expect(inScope(notification({ project: { id: 'p9', name: '', url: '', teams: { nodes: [{ id: 't1' }] } } }), ['t1'], [])).toBe(true);
    expect(inScope(notification({ project: { id: 'p9', name: '', url: '', teams: { nodes: [{ id: 't2' }] } } }), ['t1'], [])).toBe(false);
    expect(inScope(notification({}), ['t1'], ['p1'])).toBe(false);
  });
});

import { slaLabel } from '../src/shared/format.ts';

describe('slaLabel', () => {
  const now = new Date('2026-11-10T12:00:00Z').getTime();
  test('hours, days and weeks left', () => {
    expect(slaLabel('2026-11-10T17:00:00Z', now)).toEqual({ text: '5h', overdue: false });
    expect(slaLabel('2026-11-20T12:00:00Z', now)).toEqual({ text: '10d', overdue: false });
    expect(slaLabel('2026-12-01T12:00:00Z', now)).toEqual({ text: '3w', overdue: false });
  });
  test('past the breach it counts the time since, marked overdue', () => {
    expect(slaLabel('2026-11-08T12:00:00Z', now)).toEqual({ text: '-2d', overdue: true });
  });
  test('no SLA, or a bad date, is nothing', () => {
    expect(slaLabel(null, now)).toBeNull();
    expect(slaLabel('nope', now)).toBeNull();
  });
});

import { scopeFilter } from '../src/shared/filters.ts';

describe('scopeFilter', () => {
  test('a team alone, or with its sub-teams', () => {
    expect(scopeFilter(['t1'], [])).toEqual({ team: { id: { in: ['t1'] } } });
    expect(scopeFilter(['t1'], [], true)).toEqual({ team: { or: [{ id: { in: ['t1'] } }, { ancestors: { some: { id: { in: ['t1'] } } } }] } });
  });
  test('projects never widen to sub-teams, and a mix is an or', () => {
    expect(scopeFilter([], ['p1'], true)).toEqual({ project: { id: { in: ['p1'] } } });
    expect(scopeFilter(['t1'], ['p1'])).toEqual({ or: [{ team: { id: { in: ['t1'] } } }, { project: { id: { in: ['p1'] } } }] });
  });
  test('nothing mapped is nothing', () => expect(scopeFilter([], [])).toBeNull());
});

import { compactMoney, sinceLabel } from '../src/shared/format.ts';

describe('compactMoney and sinceLabel', () => {
  test('revenue abbreviates', () => {
    expect(compactMoney(950)).toBe('$950');
    expect(compactMoney(12_000)).toBe('$12k');
    expect(compactMoney(1_450_000)).toBe('$1.5M');
    expect(compactMoney(2_000_000)).toBe('$2M');
  });
  test('time in status uses one unit', () => {
    const now = new Date('2026-11-10T12:00:00Z').getTime();
    expect(sinceLabel('2026-11-10T11:30:00Z', now)).toBe('30m');
    expect(sinceLabel('2026-11-10T07:00:00Z', now)).toBe('5h');
    expect(sinceLabel('2026-11-01T12:00:00Z', now)).toBe('9d');
    expect(sinceLabel('2026-09-29T12:00:00Z', now)).toBe('6w');
    expect(sinceLabel(undefined, now)).toBeNull();
  });
});

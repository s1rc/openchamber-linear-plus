import { describe, expect, test } from 'bun:test';
import { areaUnder, burnupOf, pathOf, smoothPath, ticksOf, toPoints } from '../src/shared/burnup.ts';
import type { IssueRow } from '../src/shared/types.ts';

const cycle = { startsAt: '2026-11-09T05:00:00Z', endsAt: '2026-11-16T05:00:00Z' };
const NOW = new Date('2026-11-10T17:00:00Z').getTime();

const issue = (id: string, extra: Partial<IssueRow> = {}): IssueRow => ({
  id, estimate: null, createdAt: '2026-11-01T00:00:00Z', addedToCycleAt: null, startedAt: null, completedAt: null, canceledAt: null, ...extra,
} as unknown as IssueRow);

// Mirrors the real cycle: most work was already in it, some started and finished since it began.
const issues = [
  issue('a', { estimate: 5, addedToCycleAt: '2026-11-05T00:00:00Z', startedAt: '2026-11-09T12:00:00Z', completedAt: '2026-11-10T09:00:00Z' }),
  issue('b', { estimate: 3, addedToCycleAt: '2026-11-05T00:00:00Z', startedAt: '2026-11-09T20:00:00Z' }),
  issue('c', { estimate: 8, addedToCycleAt: '2026-11-05T00:00:00Z' }),
  issue('d', { estimate: 2, addedToCycleAt: '2026-11-10T08:00:00Z' }),
  issue('e', { estimate: 4, addedToCycleAt: '2026-11-05T00:00:00Z', canceledAt: '2026-11-10T00:00:00Z' }),
];

describe('burnupOf', () => {
  const b = burnupOf(cycle, issues, true, NOW);
  test('today\'s numbers come from the issues, not a nightly snapshot', () => {
    expect(b).toMatchObject({ unit: 'points', scope: 18, completed: 5, inProgress: 3 });
    expect(b.now).toBeCloseTo(1.5, 1);
  });
  test('the history starts at the cycle\'s first moment', () => {
    expect(b.samples[0]).toMatchObject({ day: 0, scope: 20, started: 0, completed: 0 });
  });
  test('scope grows when work is added and shrinks when it is canceled', () => {
    const at = (day: number) => b.samples.find((s) => s.day >= day)!;
    expect(at(0.5).scope).toBe(20);
    expect(at(0.8).scope).toBe(16);
    expect(at(1.2).scope).toBe(18);
  });
  test('started includes finished work, and never falls', () => {
    const started = b.samples.map((s) => s.started);
    expect(started).toEqual([...started].sort((x, y) => x - y));
    expect(b.samples[b.samples.length - 1]!.started).toBe(8);
  });
  test('work that began before the cycle counts from day one', () => {
    const before = burnupOf(cycle, [issue('x', { estimate: 5, addedToCycleAt: '2026-10-01T00:00:00Z', startedAt: '2026-10-20T00:00:00Z' })], true, NOW);
    expect(before.samples[0]).toMatchObject({ scope: 5, started: 5, completed: 0 });
  });
  test('moved straight to done counts as started when it finished', () => {
    const done = burnupOf(cycle, [issue('x', { estimate: 2, addedToCycleAt: '2026-11-01T00:00:00Z', completedAt: '2026-11-10T00:00:00Z' })], true, NOW);
    expect(done.samples[done.samples.length - 1]).toMatchObject({ started: 2, completed: 2 });
    expect(done.samples[0]!.started).toBe(0);
  });
  test('a team that does not estimate charts issue counts', () => {
    const counted = burnupOf(cycle, issues, false, NOW);
    expect(counted).toMatchObject({ unit: 'issues', scope: 4, completed: 1, inProgress: 1 });
  });
  test('estimating team with no estimated work falls back to counting issues', () => {
    expect(burnupOf(cycle, [issue('x'), issue('y')], true, NOW).unit).toBe('issues');
  });
  test('a finished cycle stops at its end; an upcoming one has no samples', () => {
    expect(burnupOf(cycle, issues, true, new Date('2026-12-30').getTime()).now).toBeCloseTo(7, 1);
    expect(burnupOf(cycle, issues, true, new Date('2026-10-01').getTime()).samples).toEqual([]);
  });
  test('no issues does not divide by zero', () => {
    const empty = burnupOf(cycle, [], true, NOW);
    expect(empty.max).toBe(1);
    expect(empty.scope).toBe(0);
  });
});

describe('chart geometry', () => {
  const samples = [{ day: 0, scope: 0, started: 0, completed: 0 }, { day: 1, scope: 5, started: 5, completed: 5 }, { day: 2, scope: 10, started: 10, completed: 10 }];
  test('points run left to right and bottom up', () => {
    expect(toPoints(samples, (s) => s.scope, 2, 10, 100, 50)).toEqual([{ x: 0, y: 50 }, { x: 50, y: 25 }, { x: 100, y: 0 }]);
  });
  test('straight paths and areas', () => {
    const points = toPoints(samples.slice(0, 2), (s) => s.scope, 1, 10, 100, 50);
    expect(pathOf(points)).toBe('M0.0 50.0 L100.0 25.0');
    expect(areaUnder(pathOf(points), points, 50)).toBe('M0.0 50.0 L100.0 25.0 L100.0 50 L0.0 50 Z');
    expect(areaUnder('', [], 50)).toBe('');
  });
  test('a smooth path through rising points never dips below or above its neighbours', () => {
    const points = [{ x: 0, y: 100 }, { x: 10, y: 100 }, { x: 20, y: 40 }, { x: 30, y: 10 }, { x: 40, y: 10 }];
    const path = smoothPath(points);
    expect(path.startsWith('M0.0 100.0 C')).toBe(true);
    const numbers = path.match(/-?\d+\.\d/g)!.map(Number);
    const ys = numbers.filter((_, i) => i % 2 === 1);
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(10);
    expect(Math.max(...ys)).toBeLessThanOrEqual(100);
  });
  test('two points stay a straight line', () => {
    expect(smoothPath([{ x: 0, y: 5 }, { x: 10, y: 0 }])).toBe('M0.0 5.0 L10.0 0.0');
  });
  test('ticks are round numbers that cover the max', () => {
    expect(ticksOf(27)).toEqual([0, 10, 20, 30]);
    expect(ticksOf(8)).toEqual([0, 2, 4, 6, 8]);
    expect(ticksOf(1)).toEqual([0, 0.5, 1]);
    expect(ticksOf(23)).toEqual([0, 10, 20, 30]);
    expect(ticksOf(20)).toEqual([0, 5, 10, 15, 20]);
  });
});

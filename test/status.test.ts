import { describe, expect, mock, test } from 'bun:test';

// drafts.ts and open-target.ts import the host, which needs a browser frame. These tests use none of it.
mock.module('../src/shared/host.ts', () => ({ host: {} }));

const { parseDrafts } = await import('../src/shared/drafts.ts');
const { OPEN_TARGET_TTL_MS, parseOpenTarget } = await import('../src/shared/open-target.ts');
import { countByStatus, cycleLine, daysLeftText, limitCounts, sortMine } from '../src/shared/status.ts';
import type { StateType, StatusCountNode, StatusMineIssue } from '../src/shared/types.ts';

const state = (id: string, name: string, type: StateType, position: number) => ({ id, name, type, color: '#888888', position });
const node = (s: ReturnType<typeof state>, team = 't1'): StatusCountNode => ({ state: s, team: { id: team } });

const todo = state('s-todo', 'Todo', 'unstarted', 1200);
const doing = state('s-doing', 'In Progress', 'started', 1500);
const review = state('s-review', 'In Review', 'started', 1600);
const backlog = state('s-backlog', 'Backlog', 'backlog', 2000);

describe('countByStatus', () => {
  test('counts per status, started first, then unstarted, then the backlog', () => {
    const counts = countByStatus([node(backlog), node(todo), node(todo), node(review), node(doing), node(doing), node(doing)]);
    expect(counts.map((c) => `${c.count} ${c.name}`)).toEqual(['3 In Progress', '1 In Review', '2 Todo', '1 Backlog']);
  });
  test('statuses with the same name and type in two teams count together', () => {
    const other = { ...todo, id: 's-other-todo' };
    const counts = countByStatus([node(todo, 't1'), node(other, 't2')]);
    expect(counts).toHaveLength(1);
    expect(counts[0]!.count).toBe(2);
  });
  test('nothing open is no chips', () => {
    expect(countByStatus([])).toEqual([]);
  });
});

describe('limitCounts', () => {
  const counts = countByStatus([doing, review, todo, backlog].map((s) => node(s)));
  test('keeps the first few and names the rest', () => {
    const { shown, hidden } = limitCounts(counts, 3);
    expect(shown.map((c) => c.name)).toEqual(['In Progress', 'In Review', 'Todo']);
    expect(hidden.map((c) => c.name)).toEqual(['Backlog']);
  });
  test('hides nothing when there is room', () => {
    expect(limitCounts(counts, 6).hidden).toEqual([]);
  });
});

const mine = (identifier: string, s: ReturnType<typeof state>, priority: StatusMineIssue['priority'], updatedAt: string): StatusMineIssue => ({
  id: identifier, identifier, title: identifier, url: '', priority, updatedAt, state: s, team: { id: 't1', key: 'ENG' }, project: null,
});

describe('sortMine', () => {
  test('started first, then by priority with none last, then newest', () => {
    const sorted = sortMine([
      mine('A-1', todo, 1, '2026-11-01T00:00:00Z'),
      mine('A-2', doing, 0, '2026-11-02T00:00:00Z'),
      mine('A-3', doing, 3, '2026-11-01T00:00:00Z'),
      mine('A-4', doing, 3, '2026-11-05T00:00:00Z'),
    ]);
    expect(sorted.map((i) => i.identifier)).toEqual(['A-4', 'A-3', 'A-2', 'A-1']);
  });
  test('shows at most five and leaves the list alone', () => {
    const list = Array.from({ length: 8 }, (_, n) => mine(`A-${n}`, doing, 3, `2026-11-0${n + 1}T00:00:00Z`));
    expect(sortMine(list)).toHaveLength(5);
    expect(list).toHaveLength(8);
  });
});

describe('cycle text', () => {
  const now = new Date(2026, 10, 9, 12);
  const ends = (days: number) => new Date(2026, 10, 9 + days).toISOString();
  test('days left, today, ended', () => {
    expect(daysLeftText(ends(4), now)).toBe('4 days left');
    expect(daysLeftText(ends(1), now)).toBe('1 day left');
    expect(daysLeftText(ends(0), now)).toBe('ends today');
    expect(daysLeftText(ends(-2), now)).toBe('ended');
    expect(daysLeftText('', now)).toBeNull();
  });
  test('the line reads as in the plan, with a team key only when asked', () => {
    expect(cycleLine({ number: 42, progress: 0.6, endsAt: ends(4) }, null, now)).toBe('Cycle 42 \u00b7 60% \u00b7 4 days left');
    expect(cycleLine({ number: 42, progress: 0.6, endsAt: ends(4) }, 'ENG', now)).toBe('ENG cycle 42 \u00b7 60% \u00b7 4 days left');
  });
});

describe('parseOpenTarget', () => {
  const now = 1_000_000_000;
  test('an issue for this folder', () => {
    expect(parseOpenTarget({ placeKey: 'd:1', issue: 'ENG-11', at: now - 1000 }, 'd:1', now)).toEqual({ placeKey: 'd:1', issue: 'ENG-11', at: now - 1000 });
  });
  test('the picker', () => {
    expect(parseOpenTarget({ placeKey: 'd:1', view: 'picker', at: now }, 'd:1', now)?.view).toBe('picker');
  });
  test('another folder, a stale note, a bad identifier and junk are ignored', () => {
    expect(parseOpenTarget({ placeKey: 'd:2', issue: 'ENG-11', at: now }, 'd:1', now)).toBeNull();
    expect(parseOpenTarget({ placeKey: 'd:1', issue: 'ENG-11', at: now - OPEN_TARGET_TTL_MS - 1 }, 'd:1', now)).toBeNull();
    expect(parseOpenTarget({ placeKey: 'd:1', issue: 'not an id', at: now }, 'd:1', now)).toBeNull();
    expect(parseOpenTarget('ENG-11', 'd:1', now)).toBeNull();
    expect(parseOpenTarget(null, 'd:1', now)).toBeNull();
  });
});

describe('parseDrafts', () => {
  const draft = { id: 'd1', directory: '/x', sessionId: 's', identifier: 'ENG-1', sessionTitle: 'T', body: 'B', createdAt: 1 };
  test('keeps well-formed drafts only', () => {
    expect(parseDrafts({ drafts: [draft, { id: 'd2' }, null, 'x'] })).toEqual([draft]);
  });
  test('an older service, an error or nothing is no drafts', () => {
    expect(parseDrafts({})).toEqual([]);
    expect(parseDrafts({ ok: false, error: 'Error 404' })).toEqual([]);
    expect(parseDrafts(null)).toEqual([]);
  });
});

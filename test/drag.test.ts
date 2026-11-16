import { describe, expect, test } from 'bun:test';
import { edgeScroll, movedFar, targetOf } from '../src/shared/drag.ts';

describe('movedFar', () => {
  test('a click stays a click; a few pixels of travel starts a drag', () => {
    expect(movedFar(0, 0)).toBe(false);
    expect(movedFar(2, 2)).toBe(false);
    expect(movedFar(4, 3)).toBe(true);
    expect(movedFar(-6, 0)).toBe(true);
  });
});

describe('edgeScroll', () => {
  test('nothing in the middle, faster toward each edge', () => {
    expect(edgeScroll(500, 0, 1000)).toBe(0);
    expect(edgeScroll(20, 0, 1000)).toBeLessThan(0);
    expect(edgeScroll(980, 0, 1000)).toBeGreaterThan(0);
    expect(Math.abs(edgeScroll(2, 0, 1000))).toBeGreaterThan(Math.abs(edgeScroll(40, 0, 1000)));
  });
  test('a pointer past the edge scrolls at the top speed', () => {
    expect(edgeScroll(-50, 0, 1000)).toBe(-18);
    expect(edgeScroll(1200, 0, 1000)).toBe(18);
  });
});

describe('targetOf', () => {
  const zone = (data: Record<string, string>) => ({ closest: () => ({ dataset: data }) }) as unknown as Element;
  test('reads the cell under the pointer', () => {
    expect(targetOf(zone({ dropId: 'a>b', dropColumn: 'b', dropRow: 'a' }))).toEqual({ id: 'a>b', column: 'b', row: 'a' });
    expect(targetOf(zone({ dropId: '>b', dropColumn: 'b', dropRow: '' }))).toEqual({ id: '>b', column: 'b', row: null });
  });
  test('nothing under the pointer is no target', () => {
    expect(targetOf(null)).toBeNull();
    expect(targetOf({ closest: () => null } as unknown as Element)).toBeNull();
  });
});

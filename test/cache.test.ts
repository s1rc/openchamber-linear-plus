import { describe, expect, test } from 'bun:test';
import { invalidate, load, put } from '../src/shared/cache.ts';

describe('cache', () => {
  test('a fresh value is served without a second fetch', async () => {
    let calls = 0;
    const fetcher = async () => ++calls;
    expect(await load('a', fetcher)).toBe(1);
    expect(await load('a', fetcher)).toBe(1);
    expect(calls).toBe(1);
  });
  test('two readers share one running fetch', async () => {
    let calls = 0;
    const fetcher = () => new Promise<number>((resolve) => setTimeout(() => resolve(++calls), 10));
    const [x, y] = await Promise.all([load('b', fetcher), load('b', fetcher)]);
    expect([x, y, calls]).toEqual([1, 1, 1]);
  });
  test('invalidate makes the next load fetch again', async () => {
    let calls = 0;
    const fetcher = async () => ++calls;
    await load('c:1', fetcher);
    invalidate('c:');
    expect(await load('c:1', fetcher)).toBe(2);
  });
  test('put replaces a value, for optimistic edits', async () => {
    put('d', 'edited');
    expect(await load('d', async () => 'fetched')).toBe('edited');
  });
  test('a failed fetch is not cached as a value', async () => {
    let calls = 0;
    const fetcher = async () => { calls += 1; if (calls === 1) throw new Error('down'); return 'ok'; };
    await expect(load('e', fetcher)).rejects.toThrow('down');
    expect(await load('e', fetcher)).toBe('ok');
  });
});

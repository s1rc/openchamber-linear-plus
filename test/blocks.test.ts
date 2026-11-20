import { describe, expect, test } from 'bun:test';
import {
  answeredIdentifier, blockQuestion, blockTitle, IDENTIFIER, keysFilter, MAX_BLOCK_ISSUES, parseIdentifier, pickAnswer, splitIds, startedFills,
} from '../src/shared/block-args.ts';

describe('parseIdentifier', () => {
  test('accepts a team key and a number, in any case', () => {
    expect(parseIdentifier('ENG-123')).toBe('ENG-123');
    expect(parseIdentifier(' eng-7 ')).toBe('ENG-7');
    expect(parseIdentifier('APPSEC-5')).toBe('APPSEC-5');
    expect(parseIdentifier('A-1')).toBe('A-1');
  });

  test('refuses anything else', () => {
    for (const bad of ['ENG', 'ENG-', '-12', '12', 'ENG-12a', 'ENG_12', 'ENG 12', 'ENG-1-2', 'TOOLONGKEY-1', 'EN1-4', '', 'ENG-1\nENG-2', 'ENG-12; DROP', 'https://linear.app/a/issue/ENG-1']) {
      expect(parseIdentifier(bad)).toBeNull();
    }
    for (const notText of [null, undefined, 12, {}, ['ENG-1']]) expect(parseIdentifier(notText)).toBeNull();
  });

  test('refuses a number too long to be a real issue', () => {
    expect(parseIdentifier('ENG-1234567890')).toBeNull();
    expect(parseIdentifier('ENG-123456789')).toBe('ENG-123456789');
  });

  test('the pattern is the one the plan names', () => {
    expect(IDENTIFIER.source).toBe('^[A-Za-z]{1,7}-\\d+$');
  });
});

describe('splitIds', () => {
  test('splits on commas, spaces and new lines, and upper-cases', () => {
    expect(splitIds('ENG-1, eng-2 ,ENG-3\nMOB-4;MOB-5').ids).toEqual(['ENG-1', 'ENG-2', 'ENG-3', 'MOB-4', 'MOB-5']);
  });

  test('drops repeats and keeps the first order', () => {
    expect(splitIds('ENG-2,ENG-1,eng-2,ENG-1').ids).toEqual(['ENG-2', 'ENG-1']);
  });

  test('reports what is not an identifier, shortened and capped', () => {
    const result = splitIds('ENG-1,<script>alert(1)</script>,foo,bar,baz,qux');
    expect(result.ids).toEqual(['ENG-1']);
    expect(result.skipped).toEqual(['<script>alert(1)</script>'.slice(0, 24), 'foo', 'bar']);
  });

  test('cuts a long list and counts what was left out', () => {
    const many = Array.from({ length: MAX_BLOCK_ISSUES + 4 }, (_, n) => `ENG-${n + 1}`).join(',');
    const result = splitIds(many);
    expect(result.ids).toHaveLength(MAX_BLOCK_ISSUES);
    expect(result.cut).toBe(4);
  });

  test('an empty or non-text value gives nothing', () => {
    expect(splitIds('')).toEqual({ ids: [], skipped: [], cut: 0 });
    expect(splitIds(undefined)).toEqual({ ids: [], skipped: [], cut: 0 });
    expect(splitIds(42).ids).toEqual([]);
  });

  test('tolerates a model writing an array', () => {
    expect(splitIds(['ENG-1', 'ENG-2', 3]).ids).toEqual(['ENG-1', 'ENG-2']);
  });
});

describe('block text', () => {
  test('is one line and cut with an ellipsis', () => {
    expect(blockTitle('  Open\n\nwork   now ')).toBe('Open work now');
    expect(blockTitle('x'.repeat(500))).toHaveLength(160);
    expect(blockTitle('x'.repeat(500)).endsWith('...')).toBe(true);
    expect(blockQuestion('y'.repeat(900))).toHaveLength(400);
  });

  test('is empty for anything that is not text', () => {
    expect(blockTitle(undefined)).toBe('');
    expect(blockQuestion({ toString: () => 'x' })).toBe('');
  });

  test('keeps markup as text, to be drawn escaped', () => {
    expect(blockTitle('<img src=x onerror=alert(1)>')).toBe('<img src=x onerror=alert(1)>');
  });
});

describe('keysFilter', () => {
  // Found on INF-4399: fields side by side in one `or` element are alternatives in Linear, not both required.
  test('one clause per team, numbers together, team and number joined by an explicit and', () => {
    expect(keysFilter(['ENG-11', 'MOB-5', 'ENG-12'])).toEqual({
      or: [
        { and: [{ team: { key: { eqIgnoreCase: 'ENG' } } }, { number: { in: [11, 12] } }] },
        { and: [{ team: { key: { eqIgnoreCase: 'MOB' } } }, { number: { in: [5] } }] },
      ],
    });
  });
});

describe('startedFills', () => {
  test('spaces a team started states evenly by position', () => {
    const fills = startedFills([
      { id: 's3', position: 1700, team: { id: 'a' } },
      { id: 's1', position: 1500, team: { id: 'a' } },
      { id: 's2', position: 1600, team: { id: 'a' } },
      { id: 'm1', position: 10, team: { id: 'b' } },
    ]);
    expect(fills.get('s1')).toBe(0.25);
    expect(fills.get('s2')).toBe(0.5);
    expect(fills.get('s3')).toBe(0.75);
    expect(fills.get('m1')).toBe(0.5);
  });
});

describe('the answer', () => {
  test('is the identifier and title, within the host limit', () => {
    expect(pickAnswer({ identifier: 'ENG-14', title: 'Retry webhooks' })).toBe('ENG-14 Retry webhooks');
    expect(pickAnswer({ identifier: 'ENG-14', title: 'x'.repeat(5000) })).toHaveLength(1900);
  });

  test('is read back to the identifier it starts with', () => {
    expect(answeredIdentifier('ENG-14 Retry webhooks')).toBe('ENG-14');
    expect(answeredIdentifier('Neither, start with the docs')).toBeNull();
    expect(answeredIdentifier(null)).toBeNull();
  });
});

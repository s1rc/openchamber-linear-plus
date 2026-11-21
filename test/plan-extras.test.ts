import { describe, expect, test } from 'bun:test';
import { extraDescription, extrasSummary, parsePlanExtras, scaleText, snapEstimate, withoutExtras } from '../src/shared/plan-extras.ts';

const block = (json: string) => `## Plan\n1. Do it\n\n\`\`\`linear-plan\n${json}\n\`\`\`\n\n\`\`\`openui-lang\nroot = Stack([card])\n\`\`\``;

describe('parsePlanExtras', () => {
  test('reads the estimate and the split-out issues of the last block', () => {
    const reply = `${block('{"estimate": 1}')}\nlater\n${block('{"estimate": 3, "issues": [{"title": " Cache\\n rates ", "description": "Why", "estimate": 2}, {"title": ""}, {"description": "no title"}]}')}`;
    expect(parsePlanExtras(reply)).toEqual({ estimate: 3, issues: [{ title: 'Cache rates', description: 'Why', estimate: 2 }] });
  });

  test('is null with no block, bad JSON, or nothing in it, and drops odd estimates', () => {
    expect(parsePlanExtras('## Plan\n1. Do it')).toBeNull();
    expect(parsePlanExtras(block('{estimate: 3'))).toBeNull();
    expect(parsePlanExtras(block('{"issues": []}'))).toBeNull();
    expect(parsePlanExtras(block('[1, 2]'))).toBeNull();
    expect(parsePlanExtras(block('{"estimate": -1, "issues": [{"title": "A", "estimate": "big"}]}'))).toEqual({ estimate: null, issues: [{ title: 'A', description: '', estimate: null }] });
  });

  test('keeps at most ten issues', () => {
    const many = JSON.stringify({ issues: Array.from({ length: 14 }, (_, i) => ({ title: `T${i}` })) });
    expect(parsePlanExtras(block(many))!.issues.length).toBe(10);
  });
});

describe('the rest', () => {
  test('withoutExtras takes the block out and leaves the plan', () => {
    expect(withoutExtras(block('{"estimate": 3}'))).toBe('## Plan\n1. Do it\n\n```openui-lang\nroot = Stack([card])\n```');
  });

  test('snapEstimate picks the nearest allowed value, the higher on a tie, and none without a scale', () => {
    expect(snapEstimate(4, [1, 2, 3, 5, 8])).toBe(5);
    expect(snapEstimate(3.4, [1, 2, 3, 5, 8])).toBe(3);
    expect(snapEstimate(40, [1, 2, 3, 5, 8])).toBe(8);
    expect(snapEstimate(3, [])).toBeNull();
    expect(snapEstimate(null, [1, 2])).toBeNull();
  });

  test('scaleText names the values, with T-shirt labels where they differ', () => {
    expect(scaleText([1, 2, 3], (v) => ['', 'XS', 'S', 'M'][v] ?? null)).toBe('Estimates on this team, written as the number: XS = 1, S = 2, M = 3.');
    expect(scaleText([1, 2], (v) => String(v))).toBe('Estimates on this team, written as the number: 1, 2.');
    expect(scaleText([], () => null)).toContain('does not use estimates');
  });

  test('extraDescription says where the issue came from', () => {
    expect(extraDescription({ title: 'T', description: 'Why', estimate: null }, 'ENG-5', 'ENG-5 plan')).toBe('Why\n\n---\n\nSplit out of ENG-5 by the plan in "ENG-5 plan". Created by Linear+.');
  });

  test('extrasSummary says what was written', () => {
    const label = (v: number) => (v === 3 ? 'M' : String(v));
    expect(extrasSummary({ identifier: 'ENG-5', estimateSet: 3, created: ['ENG-6', 'ENG-7'] }, label)).toBe('set the estimate of ENG-5 to M; created ENG-6 and ENG-7, related to ENG-5');
    expect(extrasSummary({ identifier: 'ENG-5', estimateSet: null, created: [] }, label)).toBe('nothing to change on ENG-5');
  });
});

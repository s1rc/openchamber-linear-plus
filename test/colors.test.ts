import { describe, expect, test } from 'bun:test';
import { contrast, legibleColor, parseColor } from '../src/shared/colors.ts';

describe('colors', () => {
  test('parses hex and rgb', () => {
    expect(parseColor('#fff')).toEqual([255, 255, 255]);
    expect(parseColor('#151313')).toEqual([21, 19, 19]);
    expect(parseColor('rgb(10, 20, 30)')).toEqual([10, 20, 30]);
    expect(parseColor('rgb(10 20 30)')).toEqual([10, 20, 30]);
    expect(parseColor('var(--x)')).toBeNull();
  });
  test('black on white is the maximum', () => {
    expect(contrast([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 0);
  });
  test('Linear\'s Todo grey is lifted on a light theme and left alone on a dark one', () => {
    expect(legibleColor('#e2e2e2', '#fbf9f6')).toContain('color-mix');
    expect(legibleColor('#e2e2e2', '#151313')).toBe('#e2e2e2');
  });
  test('a state color with enough contrast is untouched, and unreadable input passes through', () => {
    expect(legibleColor('#eb5757', '#fbf9f6')).toBe('#eb5757');
    expect(legibleColor('hotpink', '#fbf9f6')).toBe('hotpink');
    expect(legibleColor('#e2e2e2', '')).toBe('#e2e2e2');
  });
});

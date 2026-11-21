import { describe, expect, test } from 'bun:test';
import { browseFilter, isIssueMode, keyFilter, modeFilter, moveCursor, pastedKey } from '../src/shared/picker.ts';

const OPEN = { state: { type: { nin: ['completed', 'canceled', 'duplicate'] } } };

describe('pastedKey', () => {
  test('reads a key in any case, or the key of a Linear issue link', () => {
    expect(pastedKey('eng-12')).toBe('ENG-12');
    expect(pastedKey('  CENG-4538 ')).toBe('CENG-4538');
    expect(pastedKey('https://linear.app/acme/issue/ENG-13/show-saved-cards')).toBe('ENG-13');
    expect(pastedKey('linear.app/acme/issue/nil-820')).toBe('NIL-820');
  });

  test('is null for words, half keys and other links', () => {
    for (const term of ['', 'tax', 'ENG', 'ENG-', 'eng 12', 'https://gitlab.com/acme/issue/ENG-1', 'ENG-1234567890']) expect(pastedKey(term)).toBeNull();
  });
});

describe('filters', () => {
  test('a key reads one issue by team key and number', () => {
    expect(keyFilter('ENG-13')).toEqual({ team: { key: { eqIgnoreCase: 'ENG' } }, number: { eq: 13 } });
  });

  test('modes narrow by state and assignee', () => {
    expect(modeFilter('open')).toEqual(OPEN);
    expect(modeFilter('mine')).toEqual({ and: [OPEN, { assignee: { isMe: { eq: true } } }] });
    expect(modeFilter('all')).toBeNull();
    expect(isIssueMode('projects')).toBe(false);
    expect(isIssueMode('mine')).toBe(true);
  });

  test('browsing keeps to the folder, except for your own issues', () => {
    expect(browseFilter('open', ['t1'], [])).toEqual({ and: [OPEN, { team: { id: { in: ['t1'] } } }] });
    expect(browseFilter('all', ['t1'], ['p1'])).toEqual({ or: [{ team: { id: { in: ['t1'] } } }, { project: { id: { in: ['p1'] } } }] });
    expect(browseFilter('mine', ['t1'], [])).toEqual(modeFilter('mine')!);
    expect(browseFilter('all', [], [])).toEqual({});
  });
});

describe('moveCursor', () => {
  test('moves within the list and stops at the ends', () => {
    expect(moveCursor(0, 1, 3)).toBe(1);
    expect(moveCursor(2, 1, 3)).toBe(2);
    expect(moveCursor(0, -1, 3)).toBe(0);
    expect(moveCursor(-1, 1, 3)).toBe(0);
    expect(moveCursor(-1, -1, 3)).toBe(2);
    expect(moveCursor(0, 1, 0)).toBe(-1);
  });
});

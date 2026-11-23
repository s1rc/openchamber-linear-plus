import { describe, expect, test } from 'bun:test';
import { setTask, taskMarkers } from '../src/shared/tasks.ts';

// The checklist of NIL-784, as Linear stores it.
const NIL_784 = [
  'Move `teamworksdev/personnel/gm` to `teamworksdev/operations/nil-ops`.',
  '',
  '## Before',
  '',
  '- [ ] M2 finished (runners, variables, tokens)',
  '- [ ] `operations/nil-ops/gm` path is free',
  '- [x] Group variables REVIEW_DOMAIN, KUBE_CONTEXT (review/\\*) move with the group',
  '',
  '## Transfer (manual)',
  '',
  '```',
  '- [ ] not a task, inside code',
  '```',
  '',
  '* [ ] Pause gm-web pipelines and deploys',
  '1. [ ] Confirm the gm-web registry lists its tags',
  '> - [ ] quoted task',
  '  - [X] nested, capital X',
  '- [] not a box',
  '- [ ]no space, not a box',
].join('\n');

describe('taskMarkers', () => {
  test('finds every box in document order, skipping fenced code', () => {
    expect(taskMarkers(NIL_784)).toEqual([
      { line: 4, checked: false },
      { line: 5, checked: false },
      { line: 6, checked: true },
      { line: 14, checked: false },
      { line: 15, checked: false },
      { line: 16, checked: false },
      { line: 17, checked: true },
    ]);
  });
  test('a tilde fence and a longer closing fence are code too', () => {
    expect(taskMarkers('~~~\n- [ ] a\n~~~\n- [ ] b')).toEqual([{ line: 3, checked: false }]);
    expect(taskMarkers('````\n```\n- [ ] a\n````\n- [ ] b')).toEqual([{ line: 4, checked: false }]);
  });
  test('text without boxes has none', () => {
    expect(taskMarkers('- one\n- two')).toEqual([]);
    expect(taskMarkers('')).toEqual([]);
  });
});

describe('setTask', () => {
  test('ticks and clears only the box asked for', () => {
    const ticked = setTask(NIL_784, 1, true)!;
    expect(ticked.split('\n')[5]).toBe('- [x] `operations/nil-ops/gm` path is free');
    expect(ticked.split('\n').filter((_, i) => i !== 5)).toEqual(NIL_784.split('\n').filter((_, i) => i !== 5));
    expect(setTask(NIL_784, 2, false)!.split('\n')[6]).toStartWith('- [ ] Group variables');
    expect(setTask(NIL_784, 6, false)!.split('\n')[17]).toBe('  - [ ] nested, capital X');
  });
  test('keeps the list marker and indentation', () => {
    expect(setTask('1. [ ] a', 0, true)).toBe('1. [x] a');
    expect(setTask('> - [ ] a', 0, true)).toBe('> - [x] a');
    expect(setTask('    * [ ] a', 0, true)).toBe('    * [x] a');
  });
  test('the code block is never changed', () => {
    expect(setTask(NIL_784, 3, true)!.split('\n')[11]).toBe('- [ ] not a task, inside code');
  });
  test('a box that is not there gives null', () => {
    expect(setTask(NIL_784, 7, true)).toBeNull();
    expect(setTask('no boxes', 0, true)).toBeNull();
  });
});

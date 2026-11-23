// Task list items (`- [ ] step`) in Linear markdown: where each box is in the source, and the source with one
// box ticked or cleared. Boxes are counted in document order, as marked draws them; fenced code is skipped.
// Pure.

const FENCE = /^\s{0,3}(`{3,}|~{3,})/;
const TASK = /^((?:\s*>)*\s*(?:[-*+]|\d{1,9}[.)])\s+)\[( |x|X)\](?=\s|$)/;

export type TaskMarker = { line: number; checked: boolean };

/** Every task box in `source`, in order. */
export const taskMarkers = (source: string): TaskMarker[] => {
  const markers: TaskMarker[] = [];
  let fence: string | null = null;
  source.split('\n').forEach((text, line) => {
    const opener = text.match(FENCE)?.[1];
    if (fence) {
      if (opener && opener[0] === fence[0] && opener.length >= fence.length && !text.trim().slice(opener.length)) fence = null;
      return;
    }
    if (opener) { fence = opener; return; }
    const task = text.match(TASK);
    if (task) markers.push({ line, checked: task[2] !== ' ' });
  });
  return markers;
};

/** The source with box `index` set to `checked`, or null when there is no such box. */
export const setTask = (source: string, index: number, checked: boolean): string | null => {
  const marker = taskMarkers(source)[index];
  if (!marker) return null;
  const lines = source.split('\n');
  lines[marker.line] = lines[marker.line]!.replace(TASK, (_all, lead: string) => `${lead}[${checked ? 'x' : ' '}]`);
  return lines.join('\n');
};

// Rules of the dialog's issue picker (the Attach tab, and New worktree's PR or issue step): what a
// typed or pasted term means, which issues each filter lists, and how the cursor moves.
import { parseIdentifier } from './block-args.ts';
import { all, scopeFilter, type Filter } from './filters.ts';

/** What the picker lists. Issue modes filter issues; the other two list projects or documents. */
export type PickerMode = 'open' | 'mine' | 'all' | 'projects' | 'documents';

export const PICKER_MODES: { id: PickerMode; label: string }[] = [
  { id: 'open', label: 'Open' },
  { id: 'mine', label: 'Mine' },
  { id: 'all', label: 'All issues' },
  { id: 'projects', label: 'Projects' },
  { id: 'documents', label: 'Documents' },
];

export const isIssueMode = (mode: PickerMode): boolean => mode === 'open' || mode === 'mine' || mode === 'all';

const CLOSED = ['completed', 'canceled', 'duplicate'];
const ISSUE_PATH = /linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i;

/** The issue key a term names: `eng-12`, or a Linear issue link. Null for anything else. */
export const pastedKey = (term: string): string | null => {
  const text = term.trim();
  const fromLink = text.match(ISSUE_PATH)?.[1];
  return parseIdentifier(fromLink ?? text);
};

/** The filter that reads one issue by key: team key and number, both required. */
export const keyFilter = (key: string): Filter => {
  const at = key.lastIndexOf('-');
  return { team: { key: { eqIgnoreCase: key.slice(0, at) } }, number: { eq: Number(key.slice(at + 1)) } };
};

/** The state and assignee part of an issue mode. */
export const modeFilter = (mode: PickerMode): Filter | null => {
  if (mode === 'open') return { state: { type: { nin: CLOSED } } };
  if (mode === 'mine') return all({ state: { type: { nin: CLOSED } } }, { assignee: { isMe: { eq: true } } });
  return null;
};

/**
 * The list before anything is typed: the folder's teams and projects (all of Linear when none is
 * mapped), narrowed by the mode. "Mine" is not narrowed to the folder: your own open work is short,
 * and an issue of yours in another team is often the one you want.
 */
export const browseFilter = (mode: PickerMode, teamIds: readonly string[], projectIds: readonly string[]): Filter => {
  const own = modeFilter(mode);
  const scope = mode === 'mine' ? null : scopeFilter(teamIds, projectIds);
  return own || scope ? all(own, scope) : {};
};

/** The cursor after an arrow key: it stops at the ends rather than wrapping. */
export const moveCursor = (index: number, delta: number, length: number): number => {
  if (length <= 0) return -1;
  if (index < 0) return delta > 0 ? 0 : length - 1;
  return Math.max(0, Math.min(length - 1, index + delta));
};

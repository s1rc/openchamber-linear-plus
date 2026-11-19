// Which mapped folder an event's directory belongs to, and what branch it is on. Pure: file reads come
// through `read`, so tests need no disk.

import path from 'node:path';

export type ReadText = (path: string) => string | null;

export const trimDir = (directory: string): string => {
  const trimmed = directory.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

/** The main checkout a worktree's `.git` file points back to: `gitdir: <main>/.git/worktrees/<name>`. */
export const mainOfGitFile = (text: string | null, directory: string): string | null => {
  const match = text?.match(/^gitdir:\s*(.+?)\s*$/m);
  if (!match?.[1]) return null;
  const gitdir = path.posix.resolve(directory, match[1]);
  return /^(.*)\/\.git\/worktrees\/[^/]+\/?$/.exec(gitdir)?.[1] ?? null;
};

/**
 * The mapped folder for a directory: an exact match; else the main checkout a worktree points to; else the
 * longest mapped folder that holds it. Null when the directory belongs to none.
 */
export const resolveMapped = (directory: string | null | undefined, mapped: readonly string[], read: ReadText): string | null => {
  if (!directory) return null;
  const dir = trimDir(directory);
  const folders = mapped.map(trimDir);
  const exact = folders.indexOf(dir);
  if (exact >= 0) return mapped[exact]!;
  const main = mainOfGitFile(read(`${dir}/.git`), dir);
  if (main) {
    const index = folders.indexOf(trimDir(main));
    if (index >= 0) return mapped[index]!;
  }
  let best = -1;
  for (let i = 0; i < folders.length; i += 1) {
    const folder = folders[i]!;
    if (dir.startsWith(`${folder}/`) && (best < 0 || folder.length > folders[best]!.length)) best = i;
  }
  return best >= 0 ? mapped[best]! : null;
};

/** The branch in a `HEAD` file, or null when it is detached or unreadable. */
export const parseHead = (head: string | null): string | null => head?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1] ?? null;

/** The branch checked out in a directory: its `.git/HEAD`, or the worktree's own `HEAD` behind its `.git` file. */
export const readBranch = (directory: string, read: ReadText): string | null => {
  const dir = trimDir(directory);
  const file = read(`${dir}/.git`);
  const pointed = file?.match(/^gitdir:\s*(.+?)\s*$/m)?.[1];
  if (pointed) return parseHead(read(`${path.posix.resolve(dir, pointed)}/HEAD`));
  return parseHead(read(`${dir}/.git/HEAD`));
};

const KEY = /(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6}-\d{1,9})(?![A-Za-z0-9])/;

/** The Linear issue a branch name carries (`matt/eng-123-fix-login`), upper-cased. */
export const issueOfBranch = (branch: string | null): string | null => {
  const match = branch?.match(KEY);
  return match?.[1] ? match[1].toUpperCase() : null;
};

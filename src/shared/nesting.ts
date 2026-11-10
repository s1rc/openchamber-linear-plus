// Sub-issues nested under their parent in a list, as Linear's "Nested sub-issues" setting does.
import type { IssueRow } from './types.ts';
import type { Nested } from './view-options.ts';

export type NestedRow = { issue: IssueRow; depth: number };

/**
 * Lays out one group's issues as rows, children right after their parent.
 *
 * - `hide`: no nesting; every issue is its own row.
 * - `matching`: a child nests under its parent when the parent is in the same group; otherwise it
 *   stands on its own.
 * - `all`: a child nests under its parent in the parent's group, wherever the child itself would sit,
 *   and the parent also shows sub-issues the view left out (`extra`).
 *
 * `shown` is every issue the view lists across groups; it decides who counts as a listed parent.
 */
export const nestIssues = (
  issues: IssueRow[],
  mode: Nested,
  shown: readonly IssueRow[],
  extra: ReadonlyMap<string, IssueRow[]> = new Map(),
): NestedRow[] => {
  if (mode === 'hide') return issues.map((issue) => ({ issue, depth: 0 }));

  const pool = mode === 'all' ? shown : issues;
  const parents = new Set(pool.map((i) => i.id));
  const children = new Map<string, IssueRow[]>();
  const add = (parentId: string, child: IssueRow) => {
    const list = children.get(parentId) ?? [];
    if (!list.some((c) => c.id === child.id)) list.push(child);
    children.set(parentId, list);
  };
  for (const issue of pool) if (issue.parent && parents.has(issue.parent.id)) add(issue.parent.id, issue);
  if (mode === 'all') for (const [parentId, list] of extra) for (const child of list) add(parentId, child);

  const rows: NestedRow[] = [];
  const seen = new Set<string>();
  const place = (issue: IssueRow, depth: number) => {
    if (seen.has(issue.id)) return;
    seen.add(issue.id);
    rows.push({ issue, depth });
    for (const child of children.get(issue.id) ?? []) place(child, depth + 1);
  };
  for (const issue of issues) if (!issue.parent || !parents.has(issue.parent.id)) place(issue, 0);
  return rows;
};

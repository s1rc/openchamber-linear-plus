// Board columns and rows: grouping plus which columns are hidden.
import type { Group } from './grouping.ts';
import type { ColumnOverride } from './view-options.ts';

export type SplitColumns = { visible: Group[]; hidden: Group[] };

/**
 * Linear hides empty columns and lists them under "Hidden columns". A column the user hid stays
 * hidden, and one they pinned from that list stays shown, whatever it holds.
 */
export const splitColumns = (columns: Group[], showEmpty: boolean, overrides: Readonly<Record<string, ColumnOverride>>): SplitColumns => {
  const visible: Group[] = [];
  const hidden: Group[] = [];
  for (const column of columns) {
    const override = overrides[column.key];
    const hide = override === 'hide' || (override !== 'show' && !showEmpty && column.issues.length === 0);
    (hide ? hidden : visible).push(column);
  }
  return { visible, hidden };
};

/** One row of a board: each column's issues that belong to the row. */
export const cellsOf = (columns: Group[], rowIssues: ReadonlySet<string>): Group[] =>
  columns.map((column) => ({ ...column, issues: column.issues.filter((issue) => rowIssues.has(issue.id)) }));

// What a list or board shows and how: the settings in Linear's "View options" menu. Pure, so the
// ordering, filtering and defaults can be tested.
import type { IssueRow } from './types.ts';

export type GroupField = 'status' | 'assignee' | 'priority' | 'project' | 'cycle' | 'label' | 'none';

export const GROUP_FIELDS: { id: GroupField; label: string }[] = [
  { id: 'status', label: 'Status' },
  { id: 'assignee', label: 'Assignee' },
  { id: 'priority', label: 'Priority' },
  { id: 'project', label: 'Project' },
  { id: 'cycle', label: 'Cycle' },
  { id: 'label', label: 'Label' },
  { id: 'none', label: 'No grouping' },
];

export type OrderField = 'priority' | 'updated' | 'created' | 'dueDate' | 'estimate' | 'title';

export const ORDER_FIELDS: { id: OrderField; label: string }[] = [
  { id: 'priority', label: 'Priority' },
  { id: 'updated', label: 'Updated' },
  { id: 'created', label: 'Created' },
  { id: 'dueDate', label: 'Due date' },
  { id: 'estimate', label: 'Estimate' },
  { id: 'title', label: 'Title' },
];

/** The properties Linear lets you show, in the order its menu lists them. */
export const PROPERTIES = [
  { id: 'id', label: 'ID' },
  { id: 'status', label: 'Status' },
  { id: 'assignee', label: 'Assignee' },
  { id: 'creator', label: 'Creator' },
  { id: 'priority', label: 'Priority' },
  { id: 'sla', label: 'SLA' },
  { id: 'project', label: 'Project' },
  { id: 'dueDate', label: 'Due date' },
  { id: 'milestone', label: 'Milestone' },
  { id: 'cycle', label: 'Cycle' },
  { id: 'release', label: 'Release' },
  { id: 'estimate', label: 'Estimate' },
  { id: 'labels', label: 'Labels' },
  { id: 'links', label: 'Links' },
  { id: 'customers', label: 'Customers' },
  { id: 'customerRevenue', label: 'Customer revenue' },
  { id: 'timeInStatus', label: 'Time in status' },
  { id: 'created', label: 'Created' },
  { id: 'updated', label: 'Updated' },
  { id: 'changes', label: 'Pull requests and commits' },
] as const;

export type PropertyId = (typeof PROPERTIES)[number]['id'];

/** The properties that need a second, costlier request: asked for only while one of them is on. */
export const EXTRA_PROPERTIES: readonly PropertyId[] = ['release', 'customers', 'customerRevenue', 'timeInStatus'];

export type ColumnOverride = 'hide' | 'show';

/** How sub-issues sit under their parent in a list: nested when they match the view, nested whatever their status, or not nested. */
export type Nested = 'matching' | 'all' | 'hide';

export const NESTED_CHOICES: { id: Nested; label: string }[] = [
  { id: 'all', label: 'Show all' },
  { id: 'matching', label: 'Show matching' },
  { id: 'hide', label: 'Hide' },
];

export type ViewOptions = {
  /** List groups, or board columns. */
  grouping: GroupField;
  groupOrder: 'asc' | 'desc';
  /** List sub-groups, or board rows. */
  subGrouping: GroupField;
  ordering: OrderField;
  /** Flips the ordering's natural direction. */
  reverse: boolean;
  completedByRecency: boolean;
  showSubIssues: boolean;
  showTriage: boolean;
  /** Issues of the team's sub-teams. Applies where a team is in scope. */
  showSubTeams: boolean;
  /** List only. */
  nested: Nested;
  /** Empty groups (list) or columns (board). */
  showEmpty: boolean;
  /** Board columns the user hid or pinned, by group key. */
  columns: Record<string, ColumnOverride>;
  properties: PropertyId[];
};

export type Mode = 'list' | 'board';

// The starting points are the ones Linear's own list and board menus show.
const LIST_PROPERTIES: PropertyId[] = ['id', 'status', 'assignee', 'priority', 'sla', 'dueDate', 'cycle', 'estimate', 'labels', 'created', 'updated', 'changes'];
const BOARD_PROPERTIES: PropertyId[] = ['id', 'status', 'assignee', 'priority', 'sla', 'project', 'dueDate', 'cycle', 'estimate', 'labels', 'created', 'changes'];

export const factoryOptions = (mode: Mode): ViewOptions => ({
  grouping: 'status',
  groupOrder: 'asc',
  subGrouping: 'none',
  ordering: 'priority',
  reverse: false,
  completedByRecency: false,
  showSubIssues: true,
  showTriage: true,
  showSubTeams: true,
  nested: 'matching',
  showEmpty: false,
  columns: {},
  properties: mode === 'board' ? BOARD_PROPERTIES : LIST_PROPERTIES,
});

/** Factory settings, then the user's default, then this list's own. Later ones win, key by key. */
export const resolveOptions = (mode: Mode, ...layers: (Partial<ViewOptions> | undefined)[]): ViewOptions => {
  const merged: ViewOptions = { ...factoryOptions(mode) };
  for (const layer of layers) {
    if (!layer) continue;
    for (const key of Object.keys(layer) as (keyof ViewOptions)[]) {
      const value = layer[key];
      if (value !== undefined) (merged as Record<string, unknown>)[key] = value;
    }
  }
  const valid = new Set<string>(PROPERTIES.map((p) => p.id));
  merged.properties = merged.properties.filter((p) => valid.has(p));
  return merged;
};

/** Settings that differ from `base`, so only what the user changed is stored. */
export const changedOptions = (base: ViewOptions, options: ViewOptions): Partial<ViewOptions> => {
  const changed: Record<string, unknown> = {};
  for (const key of Object.keys(base) as (keyof ViewOptions)[]) {
    if (JSON.stringify(options[key]) !== JSON.stringify(base[key])) changed[key] = options[key];
  }
  return changed as Partial<ViewOptions>;
};

/** Sub-issues and triage issues can be left out, as in "Show sub-issues" and "Show triage issues". */
export const visibleIssues = (issues: IssueRow[], options: Pick<ViewOptions, 'showSubIssues' | 'showTriage'>): IssueRow[] =>
  issues.filter((issue) => (options.showSubIssues || !issue.parent) && (options.showTriage || issue.state.type !== 'triage'));

/** Urgent first, no priority last, as Linear sorts. */
export const priorityRank = (p: number) => (p === 0 ? 5 : p);

const CLOSED = new Set(['completed', 'canceled', 'duplicate']);

type Comparator = (a: IssueRow, b: IssueRow) => number;

/** Each field's natural order: newest first, urgent first, soonest due first, largest estimate first. */
const natural: Record<OrderField, Comparator> = {
  priority: (a, b) => priorityRank(a.priority) - priorityRank(b.priority) || b.updatedAt.localeCompare(a.updatedAt),
  updated: (a, b) => b.updatedAt.localeCompare(a.updatedAt),
  created: (a, b) => b.createdAt.localeCompare(a.createdAt),
  dueDate: (a, b) => (a.dueDate ?? '').localeCompare(b.dueDate ?? ''),
  estimate: (a, b) => (b.estimate ?? 0) - (a.estimate ?? 0),
  title: (a, b) => a.title.localeCompare(b.title),
};

const missing = (field: OrderField, issue: IssueRow): boolean =>
  (field === 'dueDate' && !issue.dueDate) || (field === 'estimate' && issue.estimate === null);

export const orderIssues = (issues: IssueRow[], options: Pick<ViewOptions, 'ordering' | 'reverse' | 'completedByRecency'>): IssueRow[] => {
  const direction = options.reverse ? -1 : 1;
  return [...issues].sort((a, b) => {
    if (options.completedByRecency && CLOSED.has(a.state.type) && CLOSED.has(b.state.type)) {
      const recency = (b.completedAt ?? b.updatedAt).localeCompare(a.completedAt ?? a.updatedAt);
      if (recency) return recency * direction;
    }
    // Issues without a due date or estimate stay last, whichever way the list runs.
    const aMissing = missing(options.ordering, a);
    const bMissing = missing(options.ordering, b);
    if (aMissing !== bMissing) return aMissing ? 1 : -1;
    return natural[options.ordering](a, b) * direction;
  });
};

/** Sub-grouping repeats a field the grouping already uses; it means nothing there. */
export const subGroupChoices = (grouping: GroupField): { id: GroupField; label: string }[] =>
  GROUP_FIELDS.filter((f) => f.id === 'none' || f.id !== grouping);

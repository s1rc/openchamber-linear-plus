// IssueFilter builders. Pure (no host), so scripts/fixtures.ts builds the same variables the app sends.

export type Filter = Record<string, unknown>;

export const OPEN: Filter = { state: { type: { nin: ['completed', 'canceled', 'duplicate'] } } };

/** Open issues, plus ones closed in the last two weeks when `withClosed`. */
export const openOrRecent = (withClosed: boolean): Filter =>
  withClosed ? { or: [OPEN, { completedAt: { gt: '-P2W' } }, { canceledAt: { gt: '-P2W' } }] } : OPEN;

/**
 * Issues in any of the teams or projects. With `subTeams`, a team also covers the teams below it.
 * Null when both lists are empty.
 */
export const scopeFilter = (teamIds: readonly string[], projectIds: readonly string[], subTeams = false): Filter | null => {
  const parts: Filter[] = [];
  if (teamIds.length) {
    const ids = [...teamIds].sort();
    parts.push({ team: subTeams ? { or: [{ id: { in: ids } }, { ancestors: { some: { id: { in: ids } } } }] } : { id: { in: ids } } });
  }
  if (projectIds.length) parts.push({ project: { id: { in: [...projectIds].sort() } } });
  if (!parts.length) return null;
  return parts.length === 1 ? parts[0]! : { or: parts };
};

export const all = (...filters: (Filter | null | undefined)[]): Filter => {
  const parts = filters.filter((f): f is Filter => Boolean(f));
  return parts.length === 1 ? parts[0]! : { and: parts };
};

export type MyTab = 'assigned' | 'created' | 'subscribed';

export const MY_FILTERS: Record<MyTab, Filter> = {
  assigned: { assignee: { isMe: { eq: true } } },
  created: { creator: { isMe: { eq: true } } },
  subscribed: { subscribers: { some: { isMe: { eq: true } } } },
};

/** The saved views of one team that list issues (not projects). */
export const customViewsFilter = (teamId: string): Filter => ({ team: { id: { eq: teamId } }, modelName: { eq: 'Issue' } });

export type BuiltinView = 'all' | 'active' | 'backlog';

/** Linear's three fixed tabs. `all` adds nothing: the list's open and closed switch decides. */
export const BUILTIN_VIEWS: { id: BuiltinView; label: string; filter: Filter | null }[] = [
  { id: 'active', label: 'Active', filter: { state: { type: { in: ['unstarted', 'started'] } } } },
  { id: 'backlog', label: 'Backlog', filter: { state: { type: { in: ['backlog'] } } } },
  { id: 'all', label: 'All issues', filter: null },
];

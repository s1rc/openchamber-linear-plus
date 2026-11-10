// Issue reads, paged and cached.
import { useQuery } from './cache.ts';
import type { Filter } from './filters.ts';
import { gql } from './linear.ts';
import { CHILD_ISSUES, CHILD_STATES, CUSTOM_VIEW_ISSUES, CUSTOM_VIEWS, ISSUE_DETAIL, ISSUE_EXTRAS, ISSUES } from './queries.ts';
import { customViewsFilter } from './filters.ts';
import type {
  ChildIssuesResult, ChildStatesResult, CustomViewIssuesResult, CustomViewsResult, IssueDetailResult, IssueExtras, IssueExtrasResult, IssueRow, IssuesResult,
} from './types.ts';

/** 100 issues a page. A list stops here and says so. */
export const ISSUE_PAGES_MAX = 5;

export type IssueList = { issues: IssueRow[]; capped: boolean };

export const fetchIssueList = async (filter: Filter): Promise<IssueList> => {
  const issues: IssueRow[] = [];
  let after: string | null = null;
  for (let page = 0; page < ISSUE_PAGES_MAX; page += 1) {
    const data: IssuesResult = await gql<IssuesResult>(ISSUES, { filter, after });
    issues.push(...data.issues.nodes);
    if (!data.issues.pageInfo.hasNextPage) return { issues, capped: false };
    after = data.issues.pageInfo.endCursor;
  }
  return { issues, capped: true };
};

export const issueListKey = (filter: Filter) => `issues:${JSON.stringify(filter)}`;

export const useIssueList = (filter: Filter | null) =>
  useQuery(filter ? issueListKey(filter) : null, () => fetchIssueList(filter!));

/** A saved view's issues, narrowed by the folder's scope. Linear applies the view's own filter. */
export const fetchViewIssueList = async (viewId: string, filter: Filter): Promise<IssueList> => {
  const issues: IssueRow[] = [];
  let after: string | null = null;
  for (let page = 0; page < ISSUE_PAGES_MAX; page += 1) {
    const data: CustomViewIssuesResult = await gql<CustomViewIssuesResult>(CUSTOM_VIEW_ISSUES, { id: viewId, filter, after });
    issues.push(...data.customView.issues.nodes);
    if (!data.customView.issues.pageInfo.hasNextPage) return { issues, capped: false };
    after = data.customView.issues.pageInfo.endCursor;
  }
  return { issues, capped: true };
};

export const useViewIssueList = (viewId: string | null, filter: Filter | null) =>
  useQuery(viewId && filter ? `view-issues:${viewId}:${JSON.stringify(filter)}` : null, () => fetchViewIssueList(viewId!, filter!));

/** The saved views of a team that list issues. */
export const useCustomViews = (teamId: string | null) =>
  useQuery(teamId ? `views:${teamId}` : null, async () => (await gql<CustomViewsResult>(CUSTOM_VIEWS, { filter: customViewsFilter(teamId!) })).customViews.nodes);

export const useIssueDetail = (id: string | null) =>
  useQuery(id ? `issue:${id}` : null, async () => (await gql<IssueDetailResult>(ISSUE_DETAIL, { id })).issue);

export type ChildCount = { done: number; total: number };

/** Sub-issue progress for every loaded issue, keyed by parent id. Finished and canceled count as done. */
export const fetchChildCounts = async (ids: string[]): Promise<Map<string, ChildCount>> => {
  const counts = new Map<string, ChildCount>();
  for (let at = 0; at < ids.length; at += 100) {
    const chunk = ids.slice(at, at + 100);
    let after: string | null = null;
    for (let page = 0; page < 4; page += 1) {
      const data: ChildStatesResult = await gql<ChildStatesResult>(CHILD_STATES, { ids: chunk, after });
      for (const child of data.issues.nodes) {
        if (!child.parent) continue;
        const count = counts.get(child.parent.id) ?? { done: 0, total: 0 };
        count.total += 1;
        if (['completed', 'canceled', 'duplicate'].includes(child.state.type)) count.done += 1;
        counts.set(child.parent.id, count);
      }
      if (!data.issues.pageInfo.hasNextPage) break;
      after = data.issues.pageInfo.endCursor;
    }
  }
  return counts;
};

export const useChildCounts = (ids: string[]) => {
  const key = ids.length ? `children:${ids.join(',')}` : null;
  return useQuery(key, () => fetchChildCounts(ids));
};

/** Releases, customers and time in status for the given issues, a hundred to a request. */
export const fetchExtras = async (ids: string[]): Promise<Map<string, IssueExtras>> => {
  const extras = new Map<string, IssueExtras>();
  for (let at = 0; at < ids.length; at += 100) {
    const data = await gql<IssueExtrasResult>(ISSUE_EXTRAS, { ids: ids.slice(at, at + 100), after: null });
    for (const node of data.issues.nodes) extras.set(node.id, node);
  }
  return extras;
};

export const useIssueExtras = (ids: string[], enabled: boolean) =>
  useQuery(enabled && ids.length ? `extras:${ids.join(',')}` : null, () => fetchExtras(ids));

/** Every sub-issue of the given parents, by parent id. For the list's "Show all" nesting. */
export const fetchChildIssues = async (parentIds: string[]): Promise<Map<string, IssueRow[]>> => {
  const byParent = new Map<string, IssueRow[]>();
  for (let at = 0; at < parentIds.length; at += 100) {
    let after: string | null = null;
    for (let page = 0; page < 3; page += 1) {
      const data: ChildIssuesResult = await gql<ChildIssuesResult>(CHILD_ISSUES, { ids: parentIds.slice(at, at + 100), after });
      for (const child of data.issues.nodes) {
        if (!child.parent) continue;
        byParent.set(child.parent.id, [...(byParent.get(child.parent.id) ?? []), child]);
      }
      if (!data.issues.pageInfo.hasNextPage) break;
      after = data.issues.pageInfo.endCursor;
    }
  }
  return byParent;
};

export const useChildIssues = (parentIds: string[], enabled: boolean) =>
  useQuery(enabled && parentIds.length ? `child-issues:${parentIds.join(',')}` : null, () => fetchChildIssues(parentIds));

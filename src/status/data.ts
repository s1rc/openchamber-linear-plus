// Reads for the Work Status section: lean queries, because the section sits open beside the chat.
import { useQuery } from '../shared/cache.ts';
import { all, MY_FILTERS, OPEN, type Filter } from '../shared/filters.ts';

/** Work in motion: the backlog is left out, since it is often thousands of issues and says little about now. */
export const ACTIVE: Filter = { state: { type: { in: ['triage', 'unstarted', 'started'] } } };
import { gql } from '../shared/linear.ts';
import { fetchDrafts } from '../shared/drafts.ts';
import { fetchHandoffs } from '../shared/handoff.ts';
import { STATUS_COUNTS, STATUS_MINE } from '../shared/queries.ts';
import type { StatusCountNode, StatusCountsResult, StatusMineIssue, StatusMineResult } from '../shared/types.ts';

/** 250 issues a page; the section counts at most this many pages and says so past it. */
export const COUNT_PAGES_MAX = 4;

export type StatusCounts = { nodes: StatusCountNode[]; capped: boolean };

export const fetchStatusCounts = async (scope: Filter): Promise<StatusCounts> => {
  const filter = all(ACTIVE, scope);
  const nodes: StatusCountNode[] = [];
  let after: string | null = null;
  for (let page = 0; page < COUNT_PAGES_MAX; page += 1) {
    const data: StatusCountsResult = await gql<StatusCountsResult>(STATUS_COUNTS, { filter, after });
    nodes.push(...data.issues.nodes);
    if (!data.issues.pageInfo.hasNextPage) return { nodes, capped: false };
    after = data.issues.pageInfo.endCursor;
  }
  return { nodes, capped: true };
};

export type StatusMine = { issues: StatusMineIssue[]; more: boolean };

export const fetchStatusMine = async (scope: Filter): Promise<StatusMine> => {
  const data = await gql<StatusMineResult>(STATUS_MINE, { filter: all(OPEN, MY_FILTERS.assigned, scope) });
  return { issues: data.issues.nodes, more: data.issues.pageInfo.hasNextPage };
};

export const useStatusCounts = (scope: Filter | null) =>
  useQuery(scope ? `status-counts:${JSON.stringify(scope)}` : null, () => fetchStatusCounts(scope!));

export const useStatusMine = (scope: Filter | null) =>
  useQuery(scope ? `status-mine:${JSON.stringify(scope)}` : null, () => fetchStatusMine(scope!));

export const useDrafts = (directory: string | null) =>
  useQuery(directory ? `status-drafts:${directory}` : null, () => fetchDrafts(directory!));

export const useHandoffs = (directory: string | null) =>
  useQuery(directory ? `status-handoffs:${directory}` : null, () => fetchHandoffs(directory!));

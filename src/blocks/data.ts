// What the chat blocks read: the issues their identifiers name, by team key and number, in one
// request, plus the started states of their teams so a status pie is as full as in the dashboard.
import { keysFilter, startedFills } from '../shared/block-args.ts';
import { useQuery } from '../shared/cache.ts';
import { gql } from '../shared/linear.ts';
import { BLOCK_STATES, ISSUES_BY_KEYS } from '../shared/queries.ts';
import type { BlockStatesResult, IssueRow, IssuesByKeysResult } from '../shared/types.ts';
import { seedStartedFills } from '../shared/workspace.ts';

/** The issues found, by upper case identifier. An identifier that is not in the map does not exist, or is not visible to you. */
export type FoundIssues = Map<string, IssueRow>;

const fetchIssues = async (ids: string[]): Promise<FoundIssues> => {
  const data = await gql<IssuesByKeysResult>(ISSUES_BY_KEYS, { filter: keysFilter(ids) });
  const found: FoundIssues = new Map();
  for (const issue of data.issues.nodes) found.set(issue.identifier.toUpperCase(), issue);
  const teamIds = [...new Set(data.issues.nodes.filter((i) => i.state.type === 'started').map((i) => i.team.id))];
  if (teamIds.length > 0) {
    try {
      seedStartedFills(startedFills((await gql<BlockStatesResult>(BLOCK_STATES, { teamIds })).workflowStates.nodes));
    } catch {
      // The pies read half full, which is still the right shape.
    }
  }
  return found;
};

export const useBlockIssues = (ids: string[]) => useQuery(ids.length > 0 ? `block:${ids.join(',')}` : null, () => fetchIssues(ids));

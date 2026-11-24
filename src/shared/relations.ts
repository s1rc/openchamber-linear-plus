// Blocking relationships matter while both issues are open. Finished work reads as related, not as a dependency.
import type { IssueRow, StateType } from './types.ts';

type State = { type: StateType };

export const issueClosed = (state: State): boolean => ['completed', 'canceled', 'duplicate'].includes(state.type);

/** A completed current issue has no actionable dependencies; a completed other issue is no longer a prerequisite. */
export const dependencySettled = (issue: { state: State }, other: { state: State }): boolean => issueClosed(issue.state) || issueClosed(other.state);

export const dependencyGroup = (issue: { state: State }, other: { state: State }, inverse: boolean): 'Related' | 'Blocked by' | 'Blocking' =>
  dependencySettled(issue, other) ? 'Related' : inverse ? 'Blocked by' : 'Blocking';

export const blockingCounts = (issue: IssueRow): { blockedBy: number; blocking: number } => {
  if (issueClosed(issue.state)) return { blockedBy: 0, blocking: 0 };
  return {
    blockedBy: (issue.inRelations?.nodes ?? []).filter((r) => r.type === 'blocks' && !issueClosed(r.issue.state)).length,
    blocking: (issue.outRelations?.nodes ?? []).filter((r) => r.type === 'blocks' && !issueClosed(r.relatedIssue.state)).length,
  };
};

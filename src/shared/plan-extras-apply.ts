// Writes a finished plan's estimate and split-out issues to Linear, with no click: chosen by the user in phase 12.
// The service hands out one claim per planning session, so two open frames never write the same plan twice, and it
// records what was written, so a retry after a failure creates only the issues still missing.
import { gql } from './linear.ts';
import { estimateLabel } from './format.ts';
import { reportExtras } from './handoff.ts';
import { teamScale } from './moves.ts';
import { extraDescription, snapEstimate, type ExtrasState } from './plan-extras.ts';
import { ISSUE_DETAIL, ISSUE_RELATION_CREATE } from './queries.ts';
import { getAssignToMe } from './storage.ts';
import type { IssueDetailResult } from './types.ts';
import { createIssue, updateIssue, writeErrorText } from './writes.ts';

export type ExtrasOutcome = { state: ExtrasState; label: (value: number) => string };

const running = new Set<string>();

/**
 * Claims the extras and writes them: the planned issue's estimate when it has none, then each split-out issue in the
 * same team and project, related to it, assigned to you when Settings says so. Null when another frame has the claim
 * or the service is gone. Never throws: a failure is recorded with what was written before it.
 */
export const applyPlanExtras = async (pending: ExtrasState, viewerId: string | null): Promise<ExtrasOutcome | null> => {
  if (running.has(pending.sessionId)) return null;
  running.add(pending.sessionId);
  try {
    const claimed = await reportExtras({ sessionId: pending.sessionId, action: 'claim-extras' });
    if (!claimed) return null;
    let estimateDone = claimed.estimateDone === true;
    let estimateSet = claimed.estimateSet ?? null;
    const created = [...(claimed.created ?? [])];
    let label = (value: number) => String(value);
    try {
      const issue = (await gql<IssueDetailResult>(ISSUE_DETAIL, { id: claimed.identifier })).issue;
      const scale = teamScale(issue.team);
      label = (value: number) => estimateLabel(value, issue.team.issueEstimationType) ?? String(value);
      if (!estimateDone) {
        // An estimate someone set by hand is kept.
        const value = issue.estimate === null ? snapEstimate(claimed.extras.estimate, scale) : null;
        if (value !== null) {
          await updateIssue(issue, { input: { estimate: value }, patch: { estimate: value } });
          estimateSet = value;
        }
        estimateDone = true;
      }
      const assignee = viewerId && (await getAssignToMe().catch(() => false)) ? viewerId : null;
      for (const extra of claimed.extras.issues.slice(created.length)) {
        const estimate = snapEstimate(extra.estimate, scale);
        const made = await createIssue({
          teamId: issue.team.id,
          title: extra.title,
          description: extraDescription(extra, issue.identifier, claimed.sessionTitle),
          ...(issue.project ? { projectId: issue.project.id } : {}),
          ...(estimate !== null ? { estimate } : {}),
          ...(assignee ? { assigneeId: assignee } : {}),
        });
        created.push(made.identifier);
        await gql(ISSUE_RELATION_CREATE, { input: { issueId: made.id, relatedIssueId: issue.id, type: 'related' } });
      }
      const done = await reportExtras({ sessionId: claimed.sessionId, action: 'extras-done', estimateDone, estimateSet, created });
      return { state: done ?? { ...claimed, state: 'done', estimateDone, estimateSet, created }, label };
    } catch (failure) {
      const error = writeErrorText(failure);
      const failed = await reportExtras({ sessionId: claimed.sessionId, action: 'extras-failed', estimateDone, estimateSet, created, error });
      return { state: failed ?? { ...claimed, state: 'failed', estimateDone, estimateSet, created, error }, label };
    }
  } finally {
    running.delete(pending.sessionId);
  }
};

// Every write the app makes to Linear. Each runs only from the user's click. Property edits show at
// once in every list and detail that holds the issue, and roll back when Linear refuses them.
import { invalidate, patchEntries, refreshKey } from './cache.ts';
import type { IssueList } from './issues.ts';
import { gql, LinearError } from './linear.ts';
import type { Change, IssueInput, IssuePatch } from './moves.ts';
import {
  COMMENT_CREATE, ISSUE_CREATE, ISSUE_DELETE, ISSUE_UPDATE, markReadMany, NOTIFICATION_MARK_READ, PROJECT_UPDATE_CREATE,
} from './queries.ts';
import type {
  CommentCreateResult, IssueCreateResult, IssueRow, IssueUpdateResult, Notification, Page, ProjectUpdateCreateResult, SuccessResult,
} from './types.ts';

/** What to tell the user when a write fails. A connection that can only read says so. */
export const writeErrorText = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error);
  if (error instanceof LinearError && error.kind === 'disconnected') return 'Linear is not connected. Connect it in OpenChamber, then try again.';
  if (error instanceof LinearError && error.kind === 'rate-limited') return 'Linear is limiting requests. Wait a minute, then try again.';
  if (/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(message)) {
    return "Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";
  }
  return message || 'Linear did not save the change.';
};

const isList = (value: unknown): value is IssueList => typeof value === 'object' && value !== null && Array.isArray((value as IssueList).issues);

/** Applies `patch` to the issue wherever it is cached: lists, saved views, cycles and its detail. */
export const patchIssue = (id: string, patch: IssuePatch): (() => void) =>
  patchEntries((key, value) => {
    if ((key.startsWith('issues:') || key.startsWith('view-issues:')) && isList(value) && value.issues.some((i) => i.id === id)) {
      const { description: _description, ...row } = patch;
      return { ...value, issues: value.issues.map((i) => (i.id === id ? { ...i, ...row } : i)) };
    }
    if (key.startsWith('issue:') && typeof value === 'object' && value !== null && (value as { id?: string }).id === id) {
      // The detail carries its team with the team's states; a row's `team` has only id and key.
      const { team: _team, ...rest } = patch;
      return { ...value, ...rest };
    }
    return value;
  });

const saved = (data: IssueUpdateResult): IssueRow => {
  if (!data.issueUpdate.success || !data.issueUpdate.issue) throw new LinearError('graphql', 'Linear did not save the change.');
  return data.issueUpdate.issue;
};

/** One property edit: shown at once, then replaced by what Linear saved, or rolled back. */
export const updateIssue = async (issue: Pick<IssueRow, 'id' | 'identifier'>, change: Change): Promise<IssueRow> => {
  const rollback = patchIssue(issue.id, change.patch);
  try {
    const row = saved(await gql<IssueUpdateResult>(ISSUE_UPDATE, { id: issue.id, input: change.input }));
    patchIssue(issue.id, row);
    refreshKey(`issue:${issue.identifier}`);
    // A status change moves a parent's "2/3" sub-issue count.
    if ('stateId' in change.input) invalidate('children:');
    return row;
  } catch (error) {
    rollback();
    throw error;
  }
};

/**
 * Moves an issue to another team, with that team's status and any other change. Not shown ahead of
 * Linear's answer: the issue gets a new identifier, and labels or a cycle of the old team may drop.
 */
export const moveIssueToTeam = async (issue: Pick<IssueRow, 'id' | 'identifier'>, teamId: string, stateId: string, extra: IssueInput = {}): Promise<IssueRow> => {
  const row = saved(await gql<IssueUpdateResult>(ISSUE_UPDATE, { id: issue.id, input: { ...extra, teamId, stateId } }));
  invalidate('issues:');
  invalidate('view-issues:');
  invalidate('children:');
  refreshKey(`issue:${issue.identifier}`);
  return row;
};

/** Moves an issue to Linear's trash (restorable there for 30 days), then reloads every list that held it. */
export const deleteIssue = async (issue: Pick<IssueRow, 'id' | 'identifier'>): Promise<void> => {
  const data = await gql<SuccessResult>(ISSUE_DELETE, { id: issue.id });
  if (!Object.values(data).every((r) => r.success)) throw new LinearError('graphql', 'Linear did not delete the issue.');
  patchEntries((key, value) => (
    (key.startsWith('issues:') || key.startsWith('view-issues:')) && isList(value) ? { ...value, issues: value.issues.filter((i) => i.id !== issue.id) } : value
  ));
  invalidate('issues:');
  invalidate('view-issues:');
  invalidate('children:');
};

export const createIssue = async (input: IssueInput): Promise<IssueRow> => {
  const data = await gql<IssueCreateResult>(ISSUE_CREATE, { input });
  if (!data.issueCreate.success || !data.issueCreate.issue) throw new LinearError('graphql', 'Linear did not create the issue.');
  invalidate('issues:');
  invalidate('view-issues:');
  return data.issueCreate.issue;
};

export const addComment = async (issue: Pick<IssueRow, 'id' | 'identifier'>, body: string): Promise<void> => {
  const data = await gql<CommentCreateResult>(COMMENT_CREATE, { input: { issueId: issue.id, body } });
  if (!data.commentCreate.success) throw new LinearError('graphql', 'Linear did not save the comment.');
  refreshKey(`issue:${issue.identifier}`);
};

export type Health = 'onTrack' | 'atRisk' | 'offTrack';

export const postProjectUpdate = async (projectId: string, body: string, health: Health): Promise<void> => {
  const data = await gql<ProjectUpdateCreateResult>(PROJECT_UPDATE_CREATE, { input: { projectId, body, health } });
  if (!data.projectUpdateCreate.success) throw new LinearError('graphql', 'Linear did not post the update.');
  refreshKey(`project:${projectId}`);
};

const NOTIFICATIONS_KEY = 'notifications';

const patchRead = (ids: ReadonlySet<string>, readAt: string) =>
  patchEntries((key, value) => {
    if (key !== NOTIFICATIONS_KEY) return value;
    const page = value as Page<Notification>;
    return { ...page, nodes: page.nodes.map((n) => (ids.has(n.id) && !n.readAt ? { ...n, readAt } : n)) };
  });

/** Marks notifications read: one, or many in a single request. Shown at once, rolled back on failure. */
export const markRead = async (ids: string[]): Promise<void> => {
  if (!ids.length) return;
  const readAt = new Date().toISOString();
  const rollback = patchRead(new Set(ids), readAt);
  try {
    const data = ids.length === 1
      ? await gql<SuccessResult>(NOTIFICATION_MARK_READ, { id: ids[0], readAt })
      : await gql<SuccessResult>(markReadMany(ids), { readAt });
    if (Object.values(data).some((r) => !r.success)) throw new LinearError('graphql', 'Linear did not mark every notification read.');
  } catch (error) {
    rollback();
    throw error;
  }
};

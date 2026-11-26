// Every write the app makes to Linear. Each runs only from the user's click. Property edits show at
// once in every list and detail that holds the issue, and roll back when Linear refuses them.
import { invalidate, patchEntries, refreshKey } from './cache.ts';
import type { IssueList } from './issues.ts';
import { gql, LinearError } from './linear.ts';
import type { Change, IssueInput, IssuePatch } from './moves.ts';
import {
  ATTACHMENT_CREATE, COMMENT_CREATE, CUSTOMER_NEED_CREATE, DOCUMENT_CREATE, DOCUMENT_UPDATE, FAVORITE_CREATE, FAVORITE_DELETE, ISSUE_CREATE, ISSUE_DELETE,
  ISSUE_FAVORITE, ISSUE_RELATION_CREATE, ISSUE_RELATION_DELETE, ISSUE_RELATION_UPDATE, ISSUE_REMINDER, ISSUE_UPDATE, markReadMany, MILESTONE_CREATE, MILESTONE_DELETE, MILESTONE_EDIT,
  NOTIFICATION_MARK_READ, PROJECT_CREATE, PROJECT_EDIT, PROJECT_UPDATE_CREATE,
} from './queries.ts';
import type { RelationChoice } from './issue-menu.ts';
import type {
  CommentCreateResult, DocumentCreateResult, DocumentSummary, DocumentUpdateResult, IssueCreateResult, IssueFavoriteResult, IssueRow, IssueUpdateResult, Notification, Page,
  ProjectCreateResult, ProjectDetail, ProjectUpdateCreateResult, SuccessResult,
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
    // Milestone filters and the project overview's counts depend on this assignment.
    if ('projectMilestoneId' in change.input || 'projectId' in change.input) {
      invalidate('issues:');
      invalidate('view-issues:');
      invalidate('milestone-counts:');
    }
    if ('parentId' in change.input) {
      invalidate('issues:');
      invalidate('view-issues:');
      invalidate('children:');
    }
    if (['releaseIds', 'addedReleaseIds', 'removedReleaseIds'].some((key) => key in change.input)) {
      invalidate('extras:');
      invalidate('issue-releases:');
    }
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

const requireSuccess = (data: SuccessResult, message: string): void => {
  if (!Object.values(data).every((r) => r.success)) throw new LinearError('graphql', message);
};

export const addIssueLink = async (issue: Pick<IssueRow, 'id' | 'identifier'>, input: { url: string; title: string }): Promise<void> => {
  requireSuccess(await gql<SuccessResult>(ATTACHMENT_CREATE, { input: { issueId: issue.id, ...input } }), 'Linear did not add the link.');
  refreshKey(`issue:${issue.identifier}`);
};

export const addCustomerRequest = async (issue: Pick<IssueRow, 'id' | 'identifier'>, input: { customerId: string; body: string }): Promise<void> => {
  requireSuccess(await gql<SuccessResult>(CUSTOMER_NEED_CREATE, { input: { issueId: issue.id, ...input } }), 'Linear did not add the customer request.');
  refreshKey(`issue:${issue.identifier}`);
  invalidate('extras:');
};

export const addIssueDocument = async (issue: Pick<IssueRow, 'id' | 'identifier'>, input: { title: string; content: string }): Promise<DocumentSummary> => {
  const data = await gql<DocumentCreateResult>(DOCUMENT_CREATE, { input: { issueId: issue.id, ...input } });
  if (!data.documentCreate.success) throw new LinearError('graphql', 'Linear did not create the document.');
  refreshKey(`issue:${issue.identifier}`);
  return data.documentCreate.document;
};

/** Replaces an existing plan document instead of adding another one on every Write Plan click. */
export const updateIssueDocument = async (issue: Pick<IssueRow, 'id' | 'identifier'>, id: string, input: { title: string; content: string }): Promise<DocumentSummary> => {
  const data = await gql<DocumentUpdateResult>(DOCUMENT_UPDATE, { id, input });
  if (!data.documentUpdate.success) throw new LinearError('graphql', 'Linear did not update the document.');
  refreshKey(`issue:${issue.identifier}`);
  refreshKey(`document:${id}`);
  return data.documentUpdate.document;
};

export const createIssueRelation = async (issue: Pick<IssueRow, 'id' | 'identifier'>, other: Pick<IssueRow, 'id' | 'identifier'>, relation: RelationChoice): Promise<void> => {
  const input = relation.inverse
    ? { issueId: other.id, relatedIssueId: issue.id, type: relation.type }
    : { issueId: issue.id, relatedIssueId: other.id, type: relation.type };
  requireSuccess(await gql<SuccessResult>(ISSUE_RELATION_CREATE, { input }), 'Linear did not create the relation.');
  refreshKey(`issue:${issue.identifier}`);
  refreshKey(`issue:${other.identifier}`);
  invalidate('issues:');
  invalidate('view-issues:');
};

const refreshRelations = (issue: Pick<IssueRow, 'identifier'>, other: Pick<IssueRow, 'identifier'>) => {
  refreshKey(`issue:${issue.identifier}`);
  refreshKey(`issue:${other.identifier}`);
  invalidate('issues:');
  invalidate('view-issues:');
};

/** Changes a relation's type or direction. Swapping the ends turns Blocking into Blocked by, and back. */
export const updateIssueRelation = async (issue: Pick<IssueRow, 'id' | 'identifier'>, other: Pick<IssueRow, 'id' | 'identifier'>, id: string, relation: RelationChoice): Promise<void> => {
  const input = relation.inverse
    ? { issueId: other.id, relatedIssueId: issue.id, type: relation.type }
    : { issueId: issue.id, relatedIssueId: other.id, type: relation.type };
  requireSuccess(await gql<SuccessResult>(ISSUE_RELATION_UPDATE, { id, input }), 'Linear did not change the relation.');
  refreshRelations(issue, other);
};

/** Removes the relation only, never either issue. Duplicate relations also unmerge in Linear, as its own remove does. */
export const deleteIssueRelation = async (issue: Pick<IssueRow, 'identifier'>, other: Pick<IssueRow, 'identifier'>, id: string): Promise<void> => {
  requireSuccess(await gql<SuccessResult>(ISSUE_RELATION_DELETE, { id }), 'Linear did not remove the relation.');
  refreshRelations(issue, other);
};

/** Returns true when the issue is now favorited, false when an existing favorite was removed. */
export const toggleFavorite = async (issue: Pick<IssueRow, 'id'>): Promise<boolean> => {
  const current = await gql<IssueFavoriteResult>(ISSUE_FAVORITE, { id: issue.id });
  if (current.issue.favorite) {
    requireSuccess(await gql<SuccessResult>(FAVORITE_DELETE, { id: current.issue.favorite.id }), 'Linear did not remove the favorite.');
    return false;
  }
  requireSuccess(await gql<SuccessResult>(FAVORITE_CREATE, { input: { issueId: issue.id } }), 'Linear did not favorite the issue.');
  return true;
};

export const remindIssue = async (issue: Pick<IssueRow, 'id'>, reminderAt: string): Promise<void> => {
  requireSuccess(await gql<SuccessResult>(ISSUE_REMINDER, { id: issue.id, reminderAt }), 'Linear did not set the reminder.');
};

/** Linear performs the same conversion as its own Convert to project command. */
export const convertIssueToProject = async (issue: Pick<IssueRow, 'id' | 'identifier' | 'title' | 'team'>): Promise<{ id: string; name: string; url: string }> => {
  const data = await gql<ProjectCreateResult>(PROJECT_CREATE, { input: { name: issue.title, teamIds: [issue.team.id], convertedFromIssueId: issue.id } });
  if (!data.projectCreate.success || !data.projectCreate.project) throw new LinearError('graphql', 'Linear did not convert the issue to a project.');
  invalidate('issues:');
  invalidate('view-issues:');
  invalidate('projects:');
  invalidate('team-projects:');
  refreshKey(`issue:${issue.identifier}`);
  return data.projectCreate.project;
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

/** What Linear's projectUpdate takes, and what to show at once while it saves. */
export type ProjectChange = { input: Record<string, unknown>; patch: Partial<ProjectDetail> };

/** One project property edit: shown at once, then reloaded from Linear, or rolled back when Linear refuses it. */
export const updateProject = async (project: Pick<ProjectDetail, 'id'>, change: ProjectChange): Promise<void> => {
  const key = `project:${project.id}`;
  const rollback = patchEntries((k, value) => (k === key && typeof value === 'object' && value !== null ? { ...value, ...change.patch } : value));
  try {
    requireSuccess(await gql<SuccessResult>(PROJECT_EDIT, { id: project.id, input: change.input }), 'Linear did not save the change.');
    refreshKey(key);
    // Lists, pickers and the milestone filter read the project's status, teams and name.
    invalidate('projects:');
    invalidate('team-projects:');
  } catch (error) {
    rollback();
    throw error;
  }
};

export type MilestoneInput = { name: string; description: string | null; targetDate: string | null };

const milestonesChanged = (projectId: string) => {
  refreshKey(`project:${projectId}`);
  invalidate('project-milestones:');
  invalidate('milestone-counts:');
};

export const createMilestone = async (projectId: string, input: MilestoneInput): Promise<void> => {
  requireSuccess(await gql<SuccessResult>(MILESTONE_CREATE, { input: { projectId, ...input } }), 'Linear did not add the milestone.');
  milestonesChanged(projectId);
};

export const updateMilestone = async (projectId: string, id: string, input: MilestoneInput): Promise<void> => {
  requireSuccess(await gql<SuccessResult>(MILESTONE_EDIT, { id, input }), 'Linear did not save the milestone.');
  milestonesChanged(projectId);
};

/** Removes the milestone for good. Its issues stay in the project with no milestone. */
export const deleteMilestone = async (projectId: string, id: string): Promise<void> => {
  requireSuccess(await gql<SuccessResult>(MILESTONE_DELETE, { id }), 'Linear did not delete the milestone.');
  milestonesChanged(projectId);
  invalidate('issues:');
  invalidate('view-issues:');
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

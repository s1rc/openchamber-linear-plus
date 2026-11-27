// Start build: the service starts the session. Before it, a frame can add the plan to the issue's description (a Linear
// write, on the click); after it, the issue moves, and the caller opens the session last, as Start session does.
import { concisePlan, NOT_A_PLAN_TEXT, planNeedsDocument, withPlan, type BuildSource, type Handoff } from './handoff-rules.ts';
import { fetchSessionExtras, previewPlan, requestBuild } from './handoff.ts';
import { applyPlanExtras } from './plan-extras-apply.ts';
import { withRelatedRepositories } from './plan-repositories.ts';
import { viewerIdNow } from './workspace.ts';
import { gql } from './linear.ts';
import { buildStateOf } from './moves.ts';
import { ISSUE_DETAIL } from './queries.ts';
import { getStartMoves, getStartState, setStartState } from './storage.ts';
import type { DocumentSummary, IssueDetail, IssueDetailResult, WorkflowState } from './types.ts';
import { addIssueDocument, updateIssue, updateIssueDocument, writeErrorText } from './writes.ts';

export type BuildOptions = {
  /** Also move the issue to its team's status for work in motion. */
  move: boolean;
  /** Add the plan to the issue's description before the build starts. */
  post?: boolean;
  /** Use the last reply even though it does not read like a plan. */
  force?: boolean;
  /** The status to move to, when the user picked one; else the team's default for starting work. */
  state?: WorkflowState | null;
  /** The status used last on this team, by name, so the default follows the user's habit. */
  lastState?: string | null;
  /** `provider/model` for this build only, instead of the one in Settings. */
  model?: string;
  /** The exact plan message chosen in the session, instead of its latest plan-like reply. */
  planText?: string;
};

export type BuildOutcome = { sessionId: string; target: WorkflowState | null; moved: boolean; moveError: string | null; posted: boolean; postedDocument: boolean };

export type WritePlanOutcome = { document: DocumentSummary | null };

/**
 * Writes the plan into the issue's description as its last section, replacing one written before. A plan over 6,500
 * characters becomes a concise summary linked to an issue document with the full text. The description is read again
 * first: the copy in hand may be older than an edit made in Linear since. Throws with the reason when it cannot finish.
 * Linear writes, only ever from a click.
 */
export const writePlan = async (issue: Pick<IssueDetail, 'identifier'>, source: BuildSource, force = false, planText?: string): Promise<WritePlanOutcome> => {
  const { plan, isPlan } = await previewPlan({ source, identifier: issue.identifier, ...(planText ? { planText } : {}) });
  // Writing a chat answer over the issue's plan would lose the plan, so a reply that is not one needs a deliberate yes.
  if (!isPlan && !force) throw new Error(NOT_A_PLAN_TEXT);
  const current = (await gql<IssueDetailResult>(ISSUE_DETAIL, { id: issue.identifier })).issue;
  // A repository lookup is best effort: a missing link or a refused read must not stop the plan write.
  const recorded = await withRelatedRepositories(plan, current).catch(() => plan);
  const title = `${issue.identifier} plan: ${current.title}`.slice(0, 200);
  const existing = current.documents?.nodes.find((document) => current.description?.includes(document.url))
    ?? current.documents?.nodes.find((document) => document.title === title);
  const document = planNeedsDocument(recorded) ? await (existing ? updateIssueDocument(current, existing.id, { title, content: recorded }) : addIssueDocument(current, { title, content: recorded })) : null;
  const posted = document ? concisePlan(recorded) : recorded;
  const description = withPlan(current.description, posted, document?.url);
  if (description === null) throw new Error(`The description of ${issue.identifier} would be too long with the plan in it.`);
  await updateIssue(current, { input: { description }, patch: { description } });
  return { document };
};

/** The planning session a Work Status row stands for, as a build source. */
export const sourceOfHandoff = (handoff: Handoff): BuildSource => ({
  sessionId: handoff.sessionId, directory: handoff.sessionDirectory, title: handoff.sessionTitle, agent: null, inWorktree: true, updatedAt: handoff.createdAt,
});

/** Writes the plan to the issue if asked, then starts the build, then moves the issue. A failed write stops everything: nothing has started. */
export const startBuildFor = async (issue: IssueDetail, source: BuildSource, options: BuildOptions): Promise<BuildOutcome> => {
  let posted = false;
  let postedDocument = false;
  // The exact enriched plan goes to both places, so the issue and the build record the same repositories.
  let planText = options.planText;
  try {
    const plan = planText ?? (await previewPlan({ source, identifier: issue.identifier })).plan;
    const recorded = await withRelatedRepositories(plan, issue);
    if (recorded !== plan) planText = recorded;
  } catch {
    // The build's own read reports a real failure; a repository lookup alone never blocks the start.
  }
  if (options.post) {
    const written = await writePlan(issue, source, options.force, planText);
    posted = true;
    postedDocument = Boolean(written.document);
  }
  // The plan's estimate and split-out issues are written when it finishes; a build started before any frame did it
  // writes them first. A failure is recorded for Retry in Work Status and does not stop the build.
  const extras = await fetchSessionExtras(source.sessionId).catch(() => null);
  if (extras && (extras.state === 'pending' || extras.state === 'claimed')) await applyPlanExtras(extras, viewerIdNow()).catch(() => null);
  const started = await requestBuild({ source, identifier: issue.identifier, issueTitle: issue.title, force: options.force, ...(options.model ? { model: options.model } : {}), ...(planText ? { planText } : {}) });
  const target = options.state ?? buildStateOf(issue, issue.team.states.nodes, options.lastState);
  let moved = false;
  let moveError: string | null = null;
  if (options.move && target) {
    try {
      await updateIssue(issue, { input: { stateId: target.id }, patch: { state: target } });
      moved = true;
    } catch (error) {
      moveError = writeErrorText(error);
    }
  }
  return { sessionId: started.sessionId, target, moved, moveError, posted, postedDocument };
};

/** The row's one-click build: the issue is read for its statuses, then the folder's own defaults decide the move and the post. */
export const startBuildFromHandoff = async (handoff: Handoff): Promise<BuildOutcome & { issue: IssueDetail }> => {
  const issue = (await gql<IssueDetailResult>(ISSUE_DETAIL, { id: handoff.identifier })).issue;
  const [move, lastState] = await Promise.all([getStartMoves().catch(() => true), getStartState(issue.team.id).catch(() => null)]);
  const outcome = await startBuildFor(issue, sourceOfHandoff(handoff), { move, post: handoff.postPlan === true, lastState });
  if (outcome.moved && outcome.target) void setStartState(issue.team.id, outcome.target.name).catch(() => undefined);
  return { ...outcome, issue };
};

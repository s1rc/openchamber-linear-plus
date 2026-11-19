// Starts an OpenChamber session from a Linear issue. Shared by the dashboard's dialog and the Work Status section.
import { host } from './host.ts';
import { issueContext } from './issue-context.ts';
import { requestPlan } from './handoff.ts';
import { planningStateOf, startedStateOf, worktreeOnBranch } from './moves.ts';
import type { IssueDetail, WorkflowState } from './types.ts';
import { updateIssue, writeErrorText } from './writes.ts';

export type StartOptions = {
  /** Work in a new worktree on the issue's branch. Ignored when `existing` is given. */
  worktree: boolean;
  /** Also move the issue to its team's first started status. */
  move: boolean;
  /** A worktree made earlier for a session that then failed to start: retry there, never make a second. */
  existing?: string | null;
  /** The new worktree's branch, when not Linear's own (after a start was refused because that name exists). */
  branch?: string;
  /** The status to move to, when the user picked one; else the team's default for starting work. */
  state?: WorkflowState | null;
  /** The folder the frame is open in, for a plan with no new worktree. */
  directoryHint?: string | null;
};

export type StartOutcome =
  /** The worktree exists but the session did not start. `error` is why, when the service said. */
  | { started: false; directory: string; error?: string }
  | { started: true; sessionId: string; target: WorkflowState | null; moved: boolean; moveError: string | null };

export const startSessionFor = async (issue: IssueDetail, options: StartOptions): Promise<StartOutcome> => {
  const result = await host.startSession({
    providerId: 'linear-dashboard',
    id: issue.identifier,
    title: `${issue.identifier} ${issue.title}`,
    url: issue.url,
    kind: 'issue',
    text: issueContext(issue),
    data: { issueId: issue.id, identifier: issue.identifier },
    worktree: options.existing ? { kind: 'existing', directory: options.existing } : options.worktree ? { kind: 'new', name: options.branch ?? issue.branchName } : false,
    // The chat stays where it is until the move to a started status is done: opening the new session at once
    // closes the frame that is about to write it. Callers open it last, with `openStartedSession`.
    navigation: 'preserve',
  });
  if (result.sessionId === null) return { started: false, directory: result.directory };
  const target = options.state ?? startedStateOf(issue, issue.team.states.nodes);
  const { moved, moveError } = await moveAfterStart(issue, target, options.move);
  return { started: true, sessionId: result.sessionId, target, moved, moveError };
};

/** Moves the issue after a session started, when asked. Never throws: the session is already running. */
const moveAfterStart = async (issue: IssueDetail, target: WorkflowState | null, move: boolean) => {
  let moved = false;
  let moveError: string | null = null;
  if (move && target) {
    try {
      await updateIssue(issue, { input: { stateId: target.id }, patch: { state: target } });
      moved = true;
    } catch (error) {
      moveError = writeErrorText(error);
    }
  }
  return { moved, moveError };
};

/**
 * Start plan: the frame makes the worktree (a session with no first message, linked to the issue, since a frame
 * cannot choose an agent or model), then the service starts the plan session in it with the folder's plan agent
 * and model. The empty first session stays in the sidebar; the plan session is the one to open.
 */
export const startPlanFor = async (issue: IssueDetail, options: StartOptions): Promise<StartOutcome> => {
  let directory = options.existing ?? null;
  if (!directory) {
    const made = await host.startSession({
      providerId: 'linear-dashboard',
      id: issue.identifier,
      title: `${issue.identifier} ${issue.title}`,
      url: issue.url,
      kind: 'issue',
      data: { issueId: issue.id, identifier: issue.identifier },
      worktree: options.worktree ? { kind: 'new', name: options.branch ?? issue.branchName } : false,
      navigation: 'preserve',
    });
    if (made.sessionId === null) return { started: false, directory: made.directory };
    directory = made.worktree?.directory ?? made.directory ?? options.directoryHint ?? null;
    if (!directory) return { started: false, directory: '', error: 'The host did not say which folder the session is in.' };
  }
  let sessionId: string;
  try {
    sessionId = (await requestPlan({ identifier: issue.identifier, directory, issueTitle: issue.title, context: issueContext(issue) })).sessionId;
  } catch (error) {
    return { started: false, directory, error: error instanceof Error ? error.message : String(error) };
  }
  const target = options.state ?? planningStateOf(issue, issue.team.states.nodes);
  const { moved, moveError } = await moveAfterStart(issue, target, options.move);
  return { started: true, sessionId, target, moved, moveError };
};

const trimSlash = (path: string) => path.replace(/\/+$/, '');

/** The OpenChamber project a folder belongs to: its own, or the one that owns the worktree. Null when unknown. */
export const projectForDirectory = async (directory: string | null): Promise<{ id: string; directory: string } | null> => {
  if (!directory) return null;
  try {
    const dir = trimSlash(directory);
    const projects = (await host.listProjects())?.projects ?? [];
    const own = projects.find((p) => trimSlash(p.directory) === dir);
    if (own) return own;
    for (const candidate of projects) {
      const worktrees = (await host.listWorktrees(candidate.id))?.worktrees ?? [];
      if (worktrees.some((w) => trimSlash(w.directory) === dir)) return candidate;
    }
  } catch {
    // The host cannot say.
  }
  return null;
};

/**
 * A worktree that already holds the issue's branch, in the repository of `directory`. Starting a session
 * with a new worktree on that branch would be refused ("Branch already exists"), so callers offer this one.
 * Null when there is none or the host cannot say.
 */
export const findIssueWorktree = async (directory: string | null, branch: string): Promise<string | null> => {
  try {
    const project = await projectForDirectory(directory);
    if (!project) return null;
    return worktreeOnBranch((await host.listWorktrees(project.id))?.worktrees ?? [], branch);
  } catch {
    return null;
  }
};

/** Goes to the session `startSessionFor` made. Last, because it can close the frame that calls it. */
export const openStartedSession = async (sessionId: string): Promise<void> => {
  try {
    await host.openSession(sessionId);
  } catch {
    // The session exists; the user can open it from the list.
  }
};

// Starts an OpenChamber session from a Linear issue. Shared by the dashboard's dialog and the Work Status section.
import { host } from './host.ts';
import { issueContext } from './issue-context.ts';
import { startedStateOf } from './moves.ts';
import type { IssueDetail, WorkflowState } from './types.ts';
import { updateIssue, writeErrorText } from './writes.ts';

export type StartOptions = {
  /** Work in a new worktree on the issue's branch. Ignored when `existing` is given. */
  worktree: boolean;
  /** Also move the issue to its team's first started status. */
  move: boolean;
  /** A worktree made earlier for a session that then failed to start: retry there, never make a second. */
  existing?: string | null;
};

export type StartOutcome =
  /** The worktree exists but the session did not start. */
  | { started: false; directory: string }
  | { started: true; target: WorkflowState | null; moved: boolean; moveError: string | null };

export const startSessionFor = async (issue: IssueDetail, options: StartOptions): Promise<StartOutcome> => {
  const result = await host.startSession({
    providerId: 'linear-dashboard',
    id: issue.identifier,
    title: `${issue.identifier} ${issue.title}`,
    url: issue.url,
    kind: 'issue',
    text: issueContext(issue),
    data: { issueId: issue.id, identifier: issue.identifier },
    worktree: options.existing ? { kind: 'existing', directory: options.existing } : options.worktree ? { kind: 'new', name: issue.branchName } : false,
    navigation: 'open',
  });
  if (result.sessionId === null) return { started: false, directory: result.directory };
  const target = startedStateOf(issue, issue.team.states.nodes);
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
  return { started: true, target, moved, moveError };
};

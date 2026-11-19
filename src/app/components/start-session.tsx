// Start session from an issue: a new OpenChamber session with the issue attached, in a worktree on
// Linear's branch name by default, and the issue moved to its team's first started status.
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { host, useReady } from '../../shared/host.ts';
import { Banner, Button, Switch } from '../../shared/kit.tsx';
import { MoveRow, useMoveChoice } from '../../shared/move-row.tsx';
import { retryBranchName } from '../../shared/moves.ts';
import { findIssueWorktree, openStartedSession, startPlanFor, startSessionFor } from '../../shared/start-session.ts';
import { getStartMoves, getStartState, setStartState } from '../../shared/storage.ts';
import type { IssueDetail } from '../../shared/types.ts';
import { Modal } from './modal.tsx';

/** `plan`: Start plan, the plan session with the folder's plan agent and model; else Start session. */
export const StartSessionDialog = ({ issue, plan, onClose }: { issue: IssueDetail; plan?: boolean; onClose: () => void }) => {
  const noun = plan ? 'plan' : 'session';
  const [worktree, setWorktree] = useState(true);
  const [allowMove, setAllowMove] = useState(true);
  const [busy, setBusy] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  // A worktree that was made for a session that then failed to start: retry there, never make a second.
  const [made, setMade] = useState<string | null>(null);
  // A worktree that already holds the issue's branch: the session starts there, as a second one would be refused.
  const [found, setFound] = useState<string | null>(null);
  const directory = useReady()?.directory ?? null;
  const existing = made ?? found;
  // New-worktree starts the host refused: each one moves to the next branch name, in case the name is taken.
  const [refused, setRefused] = useState(0);
  const branch = retryBranchName(issue.branchName, refused);
  const [lastState, setLastState] = useState<string | null>(null);
  // The remembered status is read before the first click can use it.
  const [prefLoaded, setPrefLoaded] = useState(false);
  const choice = useMoveChoice(plan ? 'plan' : 'session', issue, lastState, allowMove);
  useEffect(() => { void getStartMoves().then(setAllowMove); }, []);
  useEffect(() => { void getStartState(issue.team.id).then(setLastState, () => undefined).finally(() => setPrefLoaded(true)); }, [issue.team.id]);
  useEffect(() => { void findIssueWorktree(directory, issue.branchName).then(setFound); }, [directory, issue.branchName]);

  const start = async () => {
    setBusy(true);
    try {
      const outcome = await (plan ? startPlanFor : startSessionFor)(issue, { worktree, move: choice.move, existing, branch, state: choice.selected, directoryHint: directory });
      if (!outcome.started) {
        setMade(outcome.directory);
        setReason(outcome.error ?? null);
        return;
      }
      if (!plan && outcome.moved && outcome.target) void setStartState(issue.team.id, outcome.target.name).catch(() => undefined);
      if (outcome.moveError) await toast(host, 'error', `The ${noun} started, but ${issue.identifier} was not moved: ${outcome.moveError}`);
      await toast(host, 'success', `Started a ${noun} for ${issue.identifier}${outcome.moved ? ` and moved it to ${outcome.target!.name}` : ''}`);
      onClose();
      await openStartedSession(outcome.sessionId);
    } catch (error) {
      const newWorktree = worktree && !existing;
      if (newWorktree) setRefused((n) => n + 1);
      const hint = newWorktree ? ` A branch named ${branch} may already exist; starting again tries ${retryBranchName(issue.branchName, refused + 1)}.` : '';
      await toast(host, 'error', `Could not start a ${noun}: ${(error instanceof Error ? error.message : String(error)).replace(/\.+$/, '')}.${hint}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      title={`Start a ${noun} for ${issue.identifier}`}
      onClose={onClose}
      footer={(
        <>
          <Button label="Cancel" variant="ghost" size="sm" onClick={onClose} />
          <Button label={busy ? 'Starting...' : made ? 'Retry in that worktree' : plan ? 'Start plan' : 'Start session'} size="sm" disabled={busy || !prefLoaded} onClick={() => { void start(); }} />
        </>
      )}
    >
      <div class="sui-small">{issue.title}</div>
      {made && (
        <Banner tone="warning" title={`The worktree is ready, but the ${noun} did not start`} body={reason ? `${reason} Retry starts it in ${made}.` : `Retry starts the ${noun} in ${made}.`} />
      )}
      {!made && found && <Banner tone="info" title="This issue already has a worktree" body={`The session starts in ${found}, on branch ${issue.branchName}.`} />}
      <Switch
        label={existing ? 'Work in the existing worktree' : 'Work in a new worktree'}
        description={`Branch ${branch}`}
        checked={worktree || Boolean(existing)}
        disabled={Boolean(existing) || busy}
        onChange={setWorktree}
      />
      <MoveRow choice={choice} disabled={busy} />
      <div class="sui-muted sui-small">
        {plan
          ? "The plan session gets the issue's title, status, description and latest comments, and the folder's plan agent and model from Settings. It plans and stops: it changes no files. An empty first session also appears: the host needs it to make the worktree."
          : "The session gets the issue's title, status, description and latest comments."}
      </div>
    </Modal>
  );
};

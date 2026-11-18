// Start session from an issue: a new OpenChamber session with the issue attached, in a worktree on
// Linear's branch name by default, and the issue moved to its team's first started status.
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { host, useReady } from '../../shared/host.ts';
import { Banner, Button, Select, Switch } from '../../shared/kit.tsx';
import { retryBranchName, startedStateOf, startedStatesOf } from '../../shared/moves.ts';
import { findIssueWorktree, openStartedSession, startSessionFor } from '../../shared/start-session.ts';
import { getStartMoves, getStartState, setStartState } from '../../shared/storage.ts';
import type { IssueDetail } from '../../shared/types.ts';
import { Modal } from './modal.tsx';

export const StartSessionDialog = ({ issue, onClose }: { issue: IssueDetail; onClose: () => void }) => {
  const [worktree, setWorktree] = useState(true);
  const [move, setMove] = useState(true);
  const [busy, setBusy] = useState(false);
  // A worktree that was made for a session that then failed to start: retry there, never make a second.
  const [made, setMade] = useState<string | null>(null);
  // A worktree that already holds the issue's branch: the session starts there, as a second one would be refused.
  const [found, setFound] = useState<string | null>(null);
  const directory = useReady()?.directory ?? null;
  const existing = made ?? found;
  // New-worktree starts the host refused: each one moves to the next branch name, in case the name is taken.
  const [refused, setRefused] = useState(0);
  const branch = retryBranchName(issue.branchName, refused);
  const [stateId, setStateId] = useState<string | null>(null);
  const [lastState, setLastState] = useState<string | null>(null);
  // The remembered status is read before the first click can use it.
  const [prefLoaded, setPrefLoaded] = useState(false);
  const choices = startedStatesOf(issue.team.states.nodes);
  const target = choices.find((s) => s.id === stateId) ?? startedStateOf(issue, issue.team.states.nodes, lastState);
  useEffect(() => { void getStartMoves().then(setMove); }, []);
  useEffect(() => { void getStartState(issue.team.id).then(setLastState, () => undefined).finally(() => setPrefLoaded(true)); }, [issue.team.id]);
  useEffect(() => { void findIssueWorktree(directory, issue.branchName).then(setFound); }, [directory, issue.branchName]);

  const start = async () => {
    setBusy(true);
    try {
      const outcome = await startSessionFor(issue, { worktree, move, existing, branch, state: target });
      if (!outcome.started) {
        setMade(outcome.directory);
        return;
      }
      if (outcome.moved && outcome.target) void setStartState(issue.team.id, outcome.target.name).catch(() => undefined);
      if (outcome.moveError) await toast(host, 'error', `Session started, but ${issue.identifier} was not moved: ${outcome.moveError}`);
      await toast(host, 'success', `Started a session for ${issue.identifier}${outcome.moved ? ` and moved it to ${outcome.target!.name}` : ''}`);
      onClose();
      await openStartedSession(outcome.sessionId);
    } catch (error) {
      const newWorktree = worktree && !existing;
      if (newWorktree) setRefused((n) => n + 1);
      const hint = newWorktree ? ` A branch named ${branch} may already exist; starting again tries ${retryBranchName(issue.branchName, refused + 1)}.` : '';
      await toast(host, 'error', `Could not start a session: ${(error instanceof Error ? error.message : String(error)).replace(/\.+$/, '')}.${hint}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal
      title={`Start a session for ${issue.identifier}`}
      onClose={onClose}
      footer={(
        <>
          <Button label="Cancel" variant="ghost" size="sm" onClick={onClose} />
          <Button label={busy ? 'Starting...' : made ? 'Retry in that worktree' : 'Start session'} size="sm" disabled={busy || !prefLoaded} onClick={() => { void start(); }} />
        </>
      )}
    >
      <div class="sui-small">{issue.title}</div>
      {made && (
        <Banner tone="warning" title="The worktree is ready, but the session did not start" body={`Retry starts the session in ${made}.`} />
      )}
      {!made && found && <Banner tone="info" title="This issue already has a worktree" body={`The session starts in ${found}, on branch ${issue.branchName}.`} />}
      <Switch
        label={existing ? 'Work in the existing worktree' : 'Work in a new worktree'}
        description={`Branch ${branch}`}
        checked={worktree || Boolean(existing)}
        disabled={Boolean(existing) || busy}
        onChange={setWorktree}
      />
      <Switch
        label={target ? 'Move the issue to' : 'Move the issue'}
        description={target ? undefined : `${issue.identifier} is already ${issue.state.name}.`}
        checked={move && Boolean(target)}
        disabled={!target || busy}
        onChange={setMove}
      />
      {target && choices.length > 1 && (
        <Select value={target.id} options={choices.map((c) => ({ id: c.id, label: c.name }))} disabled={!move || busy} onChange={setStateId} />
      )}
      <div class="sui-muted sui-small">The session gets the issue's title, status, description and latest comments.</div>
    </Modal>
  );
};

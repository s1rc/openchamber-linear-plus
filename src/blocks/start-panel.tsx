// The options under a LinearIssue block's Start session button. Nothing is read until the click that
// opens it, and nothing is written until the click on its own Start button: the same two switches and
// the same call as the dashboard's dialog.
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { invalidate } from '../shared/cache.ts';
import { host, useReady } from '../shared/host.ts';
import { Banner, Button, Select, Spinner, Switch } from '../shared/kit.tsx';
import { gql } from '../shared/linear.ts';
import { ModelPick } from '../shared/model-pick.tsx';
import { MoveRow, useMoveChoice } from '../shared/move-row.tsx';
import { retryBranchName } from '../shared/moves.ts';
import { ISSUE_DETAIL } from '../shared/queries.ts';
import { findIssueWorktree, openStartedSession, startPlanFor, startSessionFor } from '../shared/start-session.ts';
import { getStartMoves, getStartState, setStartState } from '../shared/storage.ts';
import type { IssueDetail, IssueDetailResult, IssueRow } from '../shared/types.ts';

const failureText = (error: unknown) => (error instanceof Error ? error.message : String(error));

/** `plan`: Start plan, the plan session with the folder's plan agent and model; else Start session. */
export const StartPanel = ({ issue, plan, onClose }: { issue: IssueRow; plan?: boolean; onClose: () => void }) => {
  const noun = plan ? 'plan' : 'session';
  const [detail, setDetail] = useState<IssueDetail | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [worktree, setWorktree] = useState(true);
  const [allowMove, setAllowMove] = useState(true);
  const [busy, setBusy] = useState(false);
  // A worktree made for a session that then failed to start: retry there, never make a second.
  const [made, setMade] = useState<string | null>(null);
  // A worktree that already holds the issue's branch: the session starts there, as a second one would be refused.
  const [found, setFound] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // New-worktree starts the host refused: each one moves to the next branch name, in case the name is taken.
  const [refused, setRefused] = useState(0);
  const [lastState, setLastState] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const directory = useReady()?.directory ?? null;
  const choice = useMoveChoice(plan ? 'plan' : 'session', detail, lastState, allowMove);
  const [model, setModel] = useState('');

  useEffect(() => {
    let live = true;
    setDetail(null);
    setLoadError(null);
    void Promise.all([
      gql<IssueDetailResult>(ISSUE_DETAIL, { id: issue.identifier }),
      getStartMoves().catch(() => true),
      getStartState(issue.team.id).catch(() => null),
    ]).then(
      ([data, moves, last]) => {
        if (!live) return;
        setDetail(data.issue);
        setAllowMove(moves);
        setLastState(last);
        void findIssueWorktree(directory, data.issue.branchName).then((dir) => { if (live) setFound(dir); });
      },
      (error: unknown) => { if (live) setLoadError(failureText(error)); },
    );
    return () => { live = false; };
  }, [issue.identifier]);

  if (done) return <div class="lin-block-start" data-state="started"><div class="sui-small">{done}</div></div>;
  if (loadError) {
    return (
      <div class="lin-block-start">
        <Banner tone="error" title="Could not read the issue" body={loadError} action={{ label: 'Close', onClick: onClose }} />
      </div>
    );
  }
  if (!detail) return <div class="lin-block-start"><Spinner label="Reading the issue" /></div>;

  const existing = made ?? found;
  const branch = retryBranchName(detail.branchName, refused);
  const start = async () => {
    setBusy(true);
    setError(null);
    try {
      const outcome = await (plan ? startPlanFor : startSessionFor)(detail, { worktree, move: choice.move, existing, branch, state: choice.selected, directoryHint: directory, ...(plan && model ? { model } : {}) });
      if (!outcome.started) {
        setMade(outcome.directory);
        setError(outcome.error ?? null);
        return;
      }
      if (outcome.moveError) await toast(host, 'error', `The ${noun} started, but ${detail.identifier} was not moved: ${outcome.moveError}`);
      if (!plan && outcome.moved && outcome.target) void setStartState(detail.team.id, outcome.target.name).catch(() => undefined);
      const text = `Started a ${noun} for ${detail.identifier}${outcome.moved ? ` and moved it to ${outcome.target!.name}` : ''}.`;
      await toast(host, 'success', text);
      setDone(text);
      if (outcome.moved) invalidate('block:');
      await openStartedSession(outcome.sessionId);
    } catch (failure) {
      const newWorktree = worktree && !existing;
      if (newWorktree) setRefused((n) => n + 1);
      const hint = newWorktree ? ` A branch named ${branch} may already exist. Start again to try ${retryBranchName(detail.branchName, refused + 1)}, or turn off "Work in a new worktree".` : '';
      setError(`${failureText(failure).replace(/\.+$/, '')}.${hint}`);
      await toast(host, 'error', `Could not start a ${noun}: ${failureText(failure)}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div class="lin-block-start" data-state="options">
      {made && <Banner tone="warning" title={`The worktree is ready, but the ${noun} did not start`} body={`Retry starts the ${noun} in ${made}.`} />}
      {!made && found && <Banner tone="info" title="This issue already has a worktree" body={`The session starts in ${found}, on branch ${detail.branchName}.`} />}
      {plan && !made && <div class="sui-muted sui-small">Makes the worktree, then starts a planning session in it with the plan agent from Settings, on the model below. It plans and stops: it changes no files.</div>}
      {error && <Banner tone="error" title={`Could not start a ${noun}`} body={error} />}
      <Switch
        label={existing ? 'Work in the existing worktree' : 'Work in a new worktree'}
        description={`Branch ${branch}`}
        checked={worktree || Boolean(existing)}
        disabled={Boolean(existing) || busy}
        onChange={setWorktree}
      />
      <MoveRow choice={choice} disabled={busy} />
      {plan && <ModelPick role="plan" directory={directory} value={model} onChange={setModel} disabled={busy} />}
      <div class="sui-row">
        <Button label={busy ? 'Starting...' : made ? 'Retry in that worktree' : found ? 'Start in that worktree' : plan ? 'Start plan' : 'Start session'} size="sm" disabled={busy} onClick={() => { void start(); }} />
        <Button label="Cancel" variant="ghost" size="sm" disabled={busy} onClick={onClose} />
      </div>
    </div>
  );
};

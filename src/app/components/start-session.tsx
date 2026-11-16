// Start session from an issue: a new OpenChamber session with the issue attached, in a worktree on
// Linear's branch name by default, and the issue moved to its team's first started status.
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { host } from '../../shared/host.ts';
import { Banner, Button, Switch } from '../../shared/kit.tsx';
import { startedStateOf } from '../../shared/moves.ts';
import { startSessionFor } from '../../shared/start-session.ts';
import { getStartMoves } from '../../shared/storage.ts';
import type { IssueDetail } from '../../shared/types.ts';
import { Modal } from './modal.tsx';

export const StartSessionDialog = ({ issue, onClose }: { issue: IssueDetail; onClose: () => void }) => {
  const [worktree, setWorktree] = useState(true);
  const [move, setMove] = useState(true);
  const [busy, setBusy] = useState(false);
  // A worktree that was made for a session that then failed to start: retry there, never make a second.
  const [made, setMade] = useState<string | null>(null);
  const target = startedStateOf(issue, issue.team.states.nodes);
  useEffect(() => { void getStartMoves().then(setMove); }, []);

  const start = async () => {
    setBusy(true);
    try {
      const outcome = await startSessionFor(issue, { worktree, move, existing: made });
      if (!outcome.started) {
        setMade(outcome.directory);
        return;
      }
      if (outcome.moveError) await toast(host, 'error', `Session started, but ${issue.identifier} was not moved: ${outcome.moveError}`);
      await toast(host, 'success', `Started a session for ${issue.identifier}${outcome.moved ? ` and moved it to ${outcome.target!.name}` : ''}`);
      onClose();
    } catch (error) {
      await toast(host, 'error', `Could not start a session: ${error instanceof Error ? error.message : String(error)}`);
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
          <Button label={busy ? 'Starting...' : made ? 'Retry in that worktree' : 'Start session'} size="sm" disabled={busy} onClick={() => { void start(); }} />
        </>
      )}
    >
      <div class="sui-small">{issue.title}</div>
      {made && (
        <Banner tone="warning" title="The worktree is ready, but the session did not start" body={`Retry starts the session in ${made}.`} />
      )}
      <Switch
        label="Work in a new worktree"
        description={`Branch ${issue.branchName}`}
        checked={worktree || Boolean(made)}
        disabled={Boolean(made) || busy}
        onChange={setWorktree}
      />
      <Switch
        label={target ? `Move to ${target.name}` : 'Move to a started status'}
        description={target ? undefined : `${issue.identifier} is already ${issue.state.name}.`}
        checked={move && Boolean(target)}
        disabled={!target || busy}
        onChange={setMove}
      />
      <div class="sui-muted sui-small">The session gets the issue's title, status, description and latest comments.</div>
    </Modal>
  );
};

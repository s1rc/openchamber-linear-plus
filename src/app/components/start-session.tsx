// Start session from an issue: a new OpenChamber session with the issue attached, in a worktree on
// Linear's branch name by default, and the issue moved to its team's first started status.
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { host } from '../../shared/host.ts';
import { issueContext } from '../../shared/issue-context.ts';
import { Banner, Button, Switch } from '../../shared/kit.tsx';
import { startedStateOf } from '../../shared/moves.ts';
import { getStartMoves } from '../../shared/storage.ts';
import type { IssueDetail } from '../../shared/types.ts';
import { updateIssue, writeErrorText } from '../../shared/writes.ts';
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
      const result = await host.startSession({
        providerId: 'linear-dashboard',
        id: issue.identifier,
        title: `${issue.identifier} ${issue.title}`,
        url: issue.url,
        kind: 'issue',
        text: issueContext(issue),
        data: { issueId: issue.id, identifier: issue.identifier },
        worktree: made ? { kind: 'existing', directory: made } : worktree ? { kind: 'new', name: issue.branchName } : false,
        navigation: 'open',
      });
      if (result.sessionId === null) {
        setMade(result.directory);
        return;
      }
      let moved = false;
      if (move && target) {
        try {
          await updateIssue(issue, { input: { stateId: target.id }, patch: { state: target } });
          moved = true;
        } catch (error) {
          await toast(host, 'error', `Session started, but ${issue.identifier} was not moved: ${writeErrorText(error)}`);
        }
      }
      await toast(host, 'success', `Started a session for ${issue.identifier}${moved ? ` and moved it to ${target!.name}` : ''}`);
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

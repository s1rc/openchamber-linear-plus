// The confirm Linear asks for when a card lands on a status only another team has: the issue moves
// to that team. Says what changes before anything is sent.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { host } from '../../shared/host.ts';
import { Button, Select } from '../../shared/kit.tsx';
import type { IssueInput, TeamChoice } from '../../shared/moves.ts';
import type { IssueRow } from '../../shared/types.ts';
import { useWorkspace } from '../../shared/workspace.ts';
import { moveIssueToTeam, writeErrorText } from '../../shared/writes.ts';
import { Modal } from './modal.tsx';

type Props = {
  issue: IssueRow;
  choices: TeamChoice[];
  extra: IssueInput;
  /** How many sub-issues the issue has, when known. */
  subIssues: number;
  onClose: () => void;
  onMoved: (issue: IssueRow) => void;
};

export const TeamMoveDialog = ({ issue, choices, extra, subIssues, onClose, onMoved }: Props) => {
  const teams = useWorkspace().data?.teamsById;
  const [teamId, setTeamId] = useState(choices[0]!.teamId);
  const [busy, setBusy] = useState(false);
  const choice = choices.find((c) => c.teamId === teamId) ?? choices[0]!;
  const target = teams?.get(choice.teamId);
  const from = teams?.get(issue.team.id);
  const name = target?.key ?? 'the other team';

  const move = async () => {
    setBusy(true);
    try {
      const moved = await moveIssueToTeam(issue, choice.teamId, choice.state.id, extra);
      await toast(host, 'success', `${issue.identifier} is now ${moved.identifier}`);
      onMoved(moved);
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };

  return (
    <Modal
      title={`Move ${issue.identifier} to ${choices.length > 1 ? 'another team' : name}?`}
      onClose={onClose}
      footer={(
        <>
          <Button label="Cancel" variant="ghost" size="sm" disabled={busy} onClick={onClose} />
          <Button label={busy ? 'Moving...' : `Move to ${name}`} size="sm" disabled={busy} onClick={() => { void move(); }} />
        </>
      )}
    >
      <div class="sui-small">
        {from?.name ?? issue.team.key} has no {choice.state.name} status. {choices.length > 1 ? 'These teams do:' : `${target?.name ?? name} does.`}
      </div>
      {choices.length > 1 && (
        <Select value={teamId} options={choices.map((c) => ({ id: c.teamId, label: teams?.get(c.teamId)?.name ?? c.teamId, hint: teams?.get(c.teamId)?.key }))} onChange={setTeamId} />
      )}
      <ul class="lin-modal-list sui-small">
        <li>It gets a new ID in {name}, and links to {issue.identifier} keep working.</li>
        <li>Its status becomes {choice.state.name}.</li>
        {issue.labels.nodes.length > 0 && <li>Labels that belong only to {issue.team.key} are removed.</li>}
        {issue.cycle && <li>It leaves Cycle {issue.cycle.number}: cycles belong to one team.</li>}
        {subIssues > 0 && <li>It has {subIssues} {subIssues === 1 ? 'sub-issue' : 'sub-issues'}; Linear moves them along only when they are all in {issue.team.key}.</li>}
      </ul>
    </Modal>
  );
};

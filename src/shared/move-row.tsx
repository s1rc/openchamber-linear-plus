// The "Move the issue to" row, the same in Start session, Start plan and Start build: a switch with the status to
// move to chosen from a dropdown on its right.
import { useMemo, useState } from 'preact/hooks';
import { Select, Switch } from './kit.tsx';
import { moveChoices, type MoveKind } from './moves.ts';
import type { IssueDetail, WorkflowState } from './types.ts';

export type MoveChoice = {
  options: WorkflowState[];
  selected: WorkflowState | null;
  /** The issue will change status: the switch is on and the chosen status is not the one it is in. */
  move: boolean;
  select: (id: string) => void;
  toggle: (on: boolean) => void;
};

/**
 * @param allow  The user's default for moving the issue when a session starts (Settings).
 * @param preferred  The status used last on this team, by name.
 */
export const useMoveChoice = (kind: MoveKind, issue: IssueDetail | null, preferred: string | null, allow: boolean): MoveChoice => {
  const choices = useMemo(() => (issue ? moveChoices(kind, issue, issue.team.states.nodes, preferred) : null), [kind, issue, preferred]);
  const [stateId, setStateId] = useState<string | null>(null);
  const [on, setOn] = useState<boolean | null>(null);
  const options = choices?.options ?? [];
  const selected = options.find((o) => o.id === stateId) ?? choices?.target ?? null;
  const wanted = on ?? Boolean(choices?.moves && allow);
  const move = Boolean(issue && selected && wanted && selected.id !== issue.state.id);
  return {
    options,
    selected,
    move,
    // Picking a status other than the one the issue is in means moving it.
    select: (id) => { setStateId(id); if (issue && id !== issue.state.id) setOn(true); },
    toggle: setOn,
  };
};

export const MoveRow = ({ choice, disabled }: { choice: MoveChoice; disabled?: boolean }) => (
  <div class="lin-move-row">
    <Switch label="Move the issue to" checked={choice.move} disabled={disabled || choice.options.length === 0} onChange={choice.toggle} />
    {choice.options.length > 0 && (
      <Select
        value={choice.selected?.id ?? null}
        options={choice.options.map((s) => ({ id: s.id, label: s.name }))}
        disabled={disabled}
        onChange={choice.select}
      />
    )}
  </div>
);

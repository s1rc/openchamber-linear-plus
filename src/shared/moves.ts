// What a write should do, decided without the network so tests can check it: where a dropped card
// goes, which status Accept, Decline and Start session move an issue to, and a team's estimate scale.
import { compareStates, groupKeysOf, statusKey, type Group } from './grouping.ts';
import type { IssueRow, Team, WorkflowState } from './types.ts';

export type IssueInput = Record<string, unknown>;

/** A change to send (`input`) and how the issue looks once it is saved (`patch`). */
/** The description lives only on the detail, so a patch may carry it too. */
export type IssuePatch = Partial<IssueRow> & { description?: string | null };

export type Change = { input: IssueInput; patch: IssuePatch };

export type TeamChoice = { teamId: string; state: WorkflowState };

export type DropPlan =
  | { kind: 'none' }
  | { kind: 'update'; change: Change }
  /** The status exists only in other teams: the issue moves team, after the user confirms. */
  | { kind: 'team'; choices: TeamChoice[]; extra: Change }
  | { kind: 'refused'; reason: string };

const sortedStates = (states: readonly WorkflowState[] | undefined) => [...(states ?? [])].sort(compareStates);

/** The change one group asks for, or a reason it cannot be made by dropping. */
const changeFor = (issue: IssueRow, group: Group, statesByTeam: ReadonlyMap<string, WorkflowState[]>, boardTeams: readonly string[]):
  | { kind: 'none' } | { kind: 'change'; change: Change } | { kind: 'team'; choices: TeamChoice[] } | { kind: 'refused'; reason: string } => {
  if (groupKeysOf(issue, group.field).includes(group.key)) return { kind: 'none' };
  switch (group.field) {
    case 'status': {
      const own = statesByTeam.get(issue.team.id)?.find((s) => statusKey(s) === group.key);
      if (own) return { kind: 'change', change: { input: { stateId: own.id }, patch: { state: own } } };
      const choices = boardTeams
        .filter((teamId) => teamId !== issue.team.id)
        .flatMap((teamId) => {
          const state = statesByTeam.get(teamId)?.find((s) => statusKey(s) === group.key);
          return state ? [{ teamId, state }] : [];
        });
      return choices.length ? { kind: 'team', choices } : { kind: 'refused', reason: `${issue.team.key} has no ${group.title} status.` };
    }
    case 'priority': {
      const priority = Number(group.key) as IssueRow['priority'];
      return { kind: 'change', change: { input: { priority }, patch: { priority } } };
    }
    case 'assignee': {
      if (group.key === 'none') return { kind: 'change', change: { input: { assigneeId: null }, patch: { assignee: null } } };
      const person = group.sample?.assignee ?? group.person;
      return { kind: 'change', change: { input: { assigneeId: group.key }, patch: person ? { assignee: person } : {} } };
    }
    case 'project': {
      if (group.key === 'none') return { kind: 'change', change: { input: { projectId: null }, patch: { project: null } } };
      const project = group.sample?.project ?? group.project;
      return { kind: 'change', change: { input: { projectId: group.key }, patch: project ? { project } : {} } };
    }
    case 'cycle':
      return { kind: 'refused', reason: 'Change the cycle from the issue: cycles belong to one team.' };
    case 'label':
      return { kind: 'refused', reason: 'Change labels from the issue: an issue can have several.' };
    default:
      return { kind: 'none' };
  }
};

const merge = (a: Change, b: Change): Change => ({ input: { ...a.input, ...b.input }, patch: { ...a.patch, ...b.patch } });
const NOTHING: Change = { input: {}, patch: {} };

/**
 * A card dropped on a column (and, on a board with rows, a row). `boardTeams` are the teams the board
 * shows; a status only another of them has moves the issue to that team, as Linear does.
 */
export const planDrop = (
  issue: IssueRow,
  column: Group,
  row: Group | null,
  statesByTeam: ReadonlyMap<string, WorkflowState[]>,
  boardTeams: readonly string[],
): DropPlan => {
  const parts = [changeFor(issue, column, statesByTeam, boardTeams), ...(row ? [changeFor(issue, row, statesByTeam, boardTeams)] : [])];
  const refused = parts.find((p) => p.kind === 'refused');
  if (refused && refused.kind === 'refused') return refused;
  const change = parts.reduce((all, p) => (p.kind === 'change' ? merge(all, p.change) : all), NOTHING);
  const team = parts.find((p) => p.kind === 'team');
  if (team && team.kind === 'team') return { kind: 'team', choices: team.choices, extra: change };
  return Object.keys(change.input).length ? { kind: 'update', change } : { kind: 'none' };
};

/** Accept moves a triage issue to the team's default status, else its first backlog or unstarted one. */
export const acceptStateOf = (team: Pick<Team, 'defaultIssueState'> | undefined, states: readonly WorkflowState[]): WorkflowState | null => {
  const list = sortedStates(states);
  const preferred = list.find((s) => s.id === team?.defaultIssueState?.id && s.type !== 'triage');
  return preferred ?? list.find((s) => s.type === 'backlog') ?? list.find((s) => s.type === 'unstarted') ?? null;
};

/** Decline moves a triage issue to the team's first canceled status. */
export const declineStateOf = (states: readonly WorkflowState[]): WorkflowState | null => sortedStates(states).find((s) => s.type === 'canceled') ?? null;

/** Start session moves the issue to the team's first started status, unless it is already started or done. */
export const startedStateOf = (issue: Pick<IssueRow, 'state'>, states: readonly WorkflowState[]): WorkflowState | null =>
  ['started', 'completed', 'canceled', 'duplicate'].includes(issue.state.type) ? null : (sortedStates(states).find((s) => s.type === 'started') ?? null);

const SCALES: Record<string, { base: number[]; extended: number[] }> = {
  exponential: { base: [1, 2, 4, 8, 16], extended: [32, 64] },
  fibonacci: { base: [1, 2, 3, 5, 8], extended: [13, 21] },
  linear: { base: [1, 2, 3, 4, 5], extended: [6, 7] },
  tShirt: { base: [1, 2, 3, 5, 8], extended: [13, 21] },
};

/** The values a team's estimate menu offers, in order. Empty when the team does not estimate. */
export const estimateScale = (team: Pick<Team, 'issueEstimationType' | 'issueEstimationAllowZero' | 'issueEstimationExtended'> | undefined): number[] => {
  const scale = team ? SCALES[team.issueEstimationType] : undefined;
  if (!scale) return [];
  return [...(team!.issueEstimationAllowZero ? [0] : []), ...scale.base, ...(team!.issueEstimationExtended ? scale.extended : [])];
};

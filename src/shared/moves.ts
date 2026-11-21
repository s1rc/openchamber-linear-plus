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

/**
 * The statuses Start session can move an issue to, in Linear's order: the started ones, and a planning status
 * even when the team files it before work begins (an unstarted "In Planning"), since starting a session often
 * means planning first.
 */
export const startedStatesOf = (states: readonly WorkflowState[]): WorkflowState[] =>
  sortedStates(states).filter((s) => s.type === 'started' || (s.type === 'unstarted' && /plan/i.test(s.name)));

/**
 * The status Start session moves an issue to by default. The status you used last on this team wins
 * (`preferred`, by name), then one called In Progress, then one named like work in motion, then the first
 * that is not named like a wait, then the first: the first started status by position is not always the one
 * you mean (a team can list "Blocked" first). Null when the issue is done, or already in one of those statuses.
 */
export const startedStateOf = (issue: Pick<IssueRow, 'state'>, states: readonly WorkflowState[], preferred?: string | null): WorkflowState | null => {
  if (['completed', 'canceled', 'duplicate'].includes(issue.state.type)) return null;
  const choices = startedStatesOf(states);
  if (issue.state.type === 'started' || choices.some((s) => s.id === issue.state.id)) return null;
  return pickStarted(choices.filter((s) => s.type === 'started'), preferred, choices);
};

/** The status used last (looked for among `named`, which may include a planning status), else the usual choice among the started ones. */
const pickStarted = (started: readonly WorkflowState[], preferred?: string | null, named: readonly WorkflowState[] = started): WorkflowState | null => {
  const want = preferred?.trim().toLowerCase();
  return (want ? named.find((s) => s.name.trim().toLowerCase() === want) : undefined)
    ?? started.find((s) => /^in progress$/i.test(s.name.trim()))
    ?? started.find((s) => /progress|doing|working|development|started/i.test(s.name))
    ?? started.find((s) => !/block|hold|pause|wait|stuck/i.test(s.name))
    ?? started[0]
    ?? null;
};

/** A status named like planning, whatever its type: some teams file "In Planning" as started, some as unstarted. */
export const isPlanningState = (state: Pick<WorkflowState, 'name'>): boolean => /plan/i.test(state.name);

/** The statuses a build can move an issue to: the started ones that are not planning. Planning is where an issue waits before the build. */
export const buildStatesOf = (states: readonly WorkflowState[]): WorkflowState[] => sortedStates(states).filter((s) => s.type === 'started' && !isPlanningState(s));

/**
 * The status Start build moves an issue to, chosen as Start session chooses. Unlike Start session it moves an issue
 * that is in a planning status ("In Planning", even where the team files it as started): that is the status the plan
 * was made in. Null when the issue is done or already building.
 */
export const buildStateOf = (issue: Pick<IssueRow, 'state'>, states: readonly WorkflowState[], preferred?: string | null): WorkflowState | null => {
  if (['completed', 'canceled', 'duplicate'].includes(issue.state.type)) return null;
  if (issue.state.type === 'started' && !isPlanningState(issue.state)) return null;
  return pickStarted(buildStatesOf(states), preferred);
};

/**
 * The status Start plan moves an issue to: one named like planning ("In Planning"), else what Start session would
 * pick. Null when the issue is done or already in a started or planning status.
 */
export const planningStateOf = (issue: Pick<IssueRow, 'state'>, states: readonly WorkflowState[], preferred?: string | null): WorkflowState | null => {
  if (['completed', 'canceled', 'duplicate'].includes(issue.state.type)) return null;
  const choices = startedStatesOf(states);
  if (issue.state.type === 'started' || choices.some((s) => s.id === issue.state.id)) return null;
  return choices.find((s) => /plan/i.test(s.name)) ?? startedStateOf(issue, states, preferred);
};

export type MoveKind = 'session' | 'plan' | 'build';

/** What the "Move the issue to" row offers: the statuses to pick from, the one chosen at first, and whether the issue moves at first. */
export type MoveChoices = { options: WorkflowState[]; target: WorkflowState | null; moves: boolean };

/**
 * One rule for the "Move the issue to" row of Start session, Start plan and Start build. The statuses to pick from
 * are the started ones (planning included for a session or a plan, left out for a build). The first choice is the
 * status the action would move the issue to: a planning status for a plan, In Progress or the one used last for a
 * session or a build. When the issue is already there, that status is shown and the issue does not move.
 */
export const moveChoices = (kind: MoveKind, issue: Pick<IssueRow, 'state'>, states: readonly WorkflowState[], preferred?: string | null): MoveChoices => {
  const options = kind === 'build' ? buildStatesOf(states) : startedStatesOf(states);
  const chosen = kind === 'build' ? buildStateOf(issue, states, preferred) : kind === 'plan' ? planningStateOf(issue, states, preferred) : startedStateOf(issue, states, preferred);
  const target = chosen ?? options.find((s) => s.id === issue.state.id) ?? null;
  return { options, target, moves: chosen !== null };
};

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

/** The scale of an issue's own team as the issue view reads it (its estimation fields may be missing). */
export const teamScale = (team: { issueEstimationType?: string; issueEstimationAllowZero?: boolean; issueEstimationExtended?: boolean }): number[] =>
  estimateScale({ issueEstimationType: team.issueEstimationType ?? 'notUsed', issueEstimationAllowZero: team.issueEstimationAllowZero ?? false, issueEstimationExtended: team.issueEstimationExtended ?? false });

/** The ready worktree already on `branch`, if any: creating another one for the same branch is refused. */
export const worktreeOnBranch = (worktrees: readonly { directory: string; branch: string; status: string }[], branch: string): string | null => {
  const wanted = branch.trim().replace(/^refs\/heads\//, '').toLowerCase();
  if (!wanted) return null;
  return worktrees.find((w) => w.status === 'ready' && w.branch.replace(/^refs\/heads\//, '').toLowerCase() === wanted)?.directory ?? null;
};

/** The branch to try after `failures` refused starts on `branch`: the host refuses a name that already exists, so `-2`, `-3`, and so on. */
export const retryBranchName = (branch: string, failures: number): string => (failures > 0 ? `${branch}-${failures + 1}` : branch);

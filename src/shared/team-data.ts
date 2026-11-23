// What the issue pickers offer for a team: its members, its labels with the workspace's, and its
// current and upcoming cycles. Each is read once per team and cached.
import { load, useQuery } from './cache.ts';
import { cycleFloor } from './cycles.ts';
import { gql } from './linear.ts';
import { TEAM_CYCLES, TEAM_PEOPLE, WORKSPACE_LABELS } from './queries.ts';
import type { CycleSummary, Label, TeamCyclesResult, TeamPeopleResult, User, WorkspaceLabelsResult } from './types.ts';

export type TeamPeople = { members: User[]; labels: Label[] };

const byName = <T extends { name: string }>(a: T, b: T) => a.name.localeCompare(b.name);

export const fetchTeamPeople = (teamId: string): Promise<TeamPeopleResult['team']> =>
  load(`team-people:${teamId}`, async () => (await gql<TeamPeopleResult>(TEAM_PEOPLE, { teamId })).team);

export const fetchWorkspaceLabels = (): Promise<Label[]> =>
  load('workspace-labels', async () => (await gql<WorkspaceLabelsResult>(WORKSPACE_LABELS)).issueLabels.nodes.filter((l) => !l.team).map(({ team: _team, ...l }) => l));

/** Active members, and the labels an issue of the team can take: the team's own and the workspace's. */
export const useTeamPeople = (teamId: string | null) =>
  useQuery<TeamPeople>(teamId ? `pickers:${teamId}` : null, async () => {
    const [team, workspace] = await Promise.all([fetchTeamPeople(teamId!), fetchWorkspaceLabels()]);
    const seen = new Set<string>();
    const labels = [...team.labels.nodes, ...workspace].filter((l) => (seen.has(l.id) ? false : (seen.add(l.id), true))).sort(byName);
    return { members: team.members.nodes.filter((m) => m.active).sort(byName), labels };
  });

/** The cycles an issue can be added to: the current one and every upcoming one. */
export const useOpenCycles = (teamId: string | null, activeNumber: number | null | undefined) =>
  useQuery<CycleSummary[]>(teamId ? `open-cycles:${teamId}` : null, async () => {
    const data = await gql<TeamCyclesResult>(TEAM_CYCLES, { teamId, minNumber: cycleFloor(activeNumber) });
    return data.team.cycles.nodes.filter((c) => c.isActive || c.isFuture).sort((a, b) => a.number - b.number);
  });

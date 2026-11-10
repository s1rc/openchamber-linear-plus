// The workspace-wide data every view needs: who you are, and teams with their states.
// Projects are not here: see projects.ts.
import { load, useQuery } from './cache.ts';
import { gql } from './linear.ts';
import { TEAMS, VIEWER, WORKFLOW_STATES } from './queries.ts';
import type { Team, TeamsResult, Viewer, ViewerResult, WorkflowState, WorkflowStatesResult } from './types.ts';

export type Workspace = {
  viewer: Viewer;
  teams: Team[];
  teamsById: Map<string, Team>;
  /** Ids of the teams the viewer belongs to. */
  myTeamIds: Set<string>;
  statesByTeam: Map<string, WorkflowState[]>;
};

const MAX_PAGES = 5;

let latest: Workspace | null = null;

/**
 * How full a started state's pie is. Linear spaces a team's started states evenly: with three of them
 * the pies are a quarter, a half and three quarters. Unknown states read as half.
 */
export const startedFill = (teamId: string, stateId: string): number => {
  const started = latest?.statesByTeam.get(teamId)?.filter((s) => s.type === 'started') ?? [];
  const at = started.findIndex((s) => s.id === stateId);
  return at < 0 ? 0.5 : (at + 1) / (started.length + 1);
};

/** How a team writes estimates (`tShirt`, `fibonacci`, ...), from the last loaded workspace. */
export const teamEstimateType = (teamId: string): string | undefined => latest?.teamsById.get(teamId)?.issueEstimationType;

const loadStates = async (): Promise<Map<string, WorkflowState[]>> => {
  const byTeam = new Map<string, WorkflowState[]>();
  let after: string | null = null;
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const data: WorkflowStatesResult = await gql<WorkflowStatesResult>(WORKFLOW_STATES, { after });
    for (const { team, ...state } of data.workflowStates.nodes) {
      const list = byTeam.get(team.id) ?? [];
      list.push(state);
      byTeam.set(team.id, list);
    }
    if (!data.workflowStates.pageInfo.hasNextPage) break;
    after = data.workflowStates.pageInfo.endCursor;
  }
  for (const list of byTeam.values()) list.sort((a, b) => a.position - b.position);
  return byTeam;
};

const fetchWorkspace = async (): Promise<Workspace> => {
  const [viewer, teams, statesByTeam] = await Promise.all([
    gql<ViewerResult>(VIEWER).then((d) => d.viewer),
    gql<TeamsResult>(TEAMS).then((d) => d.teams.nodes),
    loadStates(),
  ]);
  teams.sort((a, b) => a.name.localeCompare(b.name));
  latest = {
    viewer,
    teams,
    teamsById: new Map(teams.map((t) => [t.id, t])),
    myTeamIds: new Set(viewer.teams?.nodes.map((t) => t.id) ?? []),
    statesByTeam,
  };
  return latest;
};

export const WORKSPACE_KEY = 'workspace';

export const loadWorkspace = (force = false) => load(WORKSPACE_KEY, fetchWorkspace, force);

export const useWorkspace = () => useQuery(WORKSPACE_KEY, fetchWorkspace);

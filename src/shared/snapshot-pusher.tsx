// Draws nothing. While a mapped folder is open it keeps the service's picture of that folder current: the
// mappings (so the service can act with no window open) and a snapshot of its teams, projects and your issues.
import { useEffect } from 'preact/hooks';
import { scopeFilter } from './filters.ts';
import { useStatusMine } from '../status/data.ts';
import { useProjects } from './projects.ts';
import { folderPush, pushSnapshot } from './snapshot.ts';
import { syncMappingsOnce } from './storage.ts';
import type { DetectionState } from './use-detection.ts';
import type { Workspace } from './workspace.ts';

export const SnapshotPusher = ({ directory, workspace, state }: { directory: string; workspace: Workspace; state: DetectionState }) => {
  const ids = [...state.detection.teamIds, ...state.detection.projectIds];
  const teamIds = ids.filter((id) => workspace.teamsById.has(id));
  const projectIds = ids.filter((id) => !workspace.teamsById.has(id));
  const projects = useProjects(projectIds);
  const mine = useStatusMine(scopeFilter(teamIds, projectIds));

  useEffect(() => { void syncMappingsOnce(); }, []);

  const teams = teamIds.map((id) => workspace.teamsById.get(id)!);
  const loaded = (projectIds.length === 0 || projects.data !== undefined) && mine.data !== undefined;
  const signature = JSON.stringify([projects.data?.map((p) => [p.id, p.progress, p.health, p.status.name]), mine.data?.issues.map((i) => [i.identifier, i.state.name])]);
  useEffect(() => {
    // A saved mapping goes to the service when it is made; an inferred one is not a decision yet.
    if (!state.detection.mapping || !loaded) return;
    void pushSnapshot(folderPush(directory, teams, projects.data ?? [], mine.data?.issues ?? [], workspace.teams));
  }, [directory, loaded, signature, state.detection.mapping?.updatedAt]);

  return null;
};

// Overview of everything mapped to the folder: each team, then each project.
import type { HostReadyContext } from '@openchamber/sdk';
import { Empty } from '../../shared/kit.tsx';
import type { Workspace } from '../../shared/workspace.ts';
import { ProjectDetail } from './project-detail.tsx';
import { TeamOverview } from './team-overview.tsx';

type Props = { ctx: HostReadyContext; workspace: Workspace; ids: string[]; onProject: (id: string) => void };

export const FolderOverview = ({ ctx, workspace, ids, onProject }: Props) => {
  const teams = ids.map((id) => workspace.teamsById.get(id)).filter((t) => t !== undefined);
  const projectIds = ids.filter((id) => !workspace.teamsById.has(id));
  const orgKey = workspace.viewer.organization?.urlKey ?? '';
  return (
    <div class="lin-stack">
      {teams.map((team) => <TeamOverview key={team.id} team={team} orgKey={orgKey} onProject={onProject} />)}
      {projectIds.map((id) => <ProjectDetail key={id} ctx={ctx} id={id} viewerId={workspace.viewer.id} withIssues={false} />)}
      {!teams.length && !projectIds.length && <Empty title="Nothing mapped" body="Pick a team or project for this folder." />}
    </div>
  );
};

// Projects: the folder's teams' (or your teams') active projects, or any project by search.
import { Section } from '@openchamber-ext/shared-ui/preact';
import { useState } from 'preact/hooks';
import { Empty, SearchField, Spinner } from '../../shared/kit.tsx';
import { ProjectTable } from '../components/project-table.tsx';
import { useProjectSearch, useTeamProjects } from '../../shared/projects.ts';
import type { DetectionState } from '../../shared/use-detection.ts';
import type { Workspace } from '../../shared/workspace.ts';

/** `teamIds`: one team's projects (its Projects page), instead of the folder's or yours. */
type Props = { workspace: Workspace; state: DetectionState; scoped: boolean; teamIds?: string[]; onOpen: (id: string) => void };

export const ProjectsList = ({ workspace, state, scoped, teamIds: only, onOpen }: Props) => {
  const [query, setQuery] = useState('');
  const teamIds = only ?? (scoped && state.detection.teamIds.length ? state.detection.teamIds : [...workspace.myTeamIds]);
  const ofTeams = useTeamProjects(teamIds);
  const search = useProjectSearch(query);
  const searching = query.trim().length >= 2;
  const list = (searching ? search.data : ofTeams.data) ?? [];
  const loading = searching ? search.loading : ofTeams.loading;
  const where = teamIds.map((id) => workspace.teamsById.get(id)?.key).filter(Boolean).join(', ');

  return (
    <Section title={searching ? `Projects matching "${query.trim()}"` : `Active projects of ${where || 'your teams'}`}>
      <SearchField value={query} placeholder="Search every project" onChange={setQuery} />
      {loading && !list.length && <Spinner label="Loading projects" />}
      {!loading && !list.length && <Empty title="No projects" body={searching ? 'Try another search.' : 'These teams have no active project.'} />}
      {list.length > 0 && <ProjectTable projects={list} onOpen={onOpen} />}
    </Section>
  );
};

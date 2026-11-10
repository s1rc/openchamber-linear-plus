// Projects: the folder's teams' (or your teams') active projects, or any project by search.
import { Dot } from '@openchamber-ext/shared-ui/preact';
import { useState } from 'preact/hooks';
import { HEALTH_LABEL, HEALTH_TONE, shortDate } from '../../shared/format.ts';
import { Avatar } from '../../shared/glyphs.tsx';
import { Empty, Progress, SearchField, Spinner } from '../../shared/kit.tsx';
import { useProjectSearch, useTeamProjects } from '../../shared/projects.ts';
import type { DetectionState } from '../../shared/use-detection.ts';
import type { Workspace } from '../../shared/workspace.ts';

type Props = { workspace: Workspace; state: DetectionState; scoped: boolean; onOpen: (id: string) => void };

export const ProjectsList = ({ workspace, state, scoped, onOpen }: Props) => {
  const [query, setQuery] = useState('');
  const teamIds = scoped && state.detection.teamIds.length ? state.detection.teamIds : [...workspace.myTeamIds];
  const ofTeams = useTeamProjects(teamIds);
  const search = useProjectSearch(query);
  const searching = query.trim().length >= 2;
  const list = (searching ? search.data : ofTeams.data) ?? [];
  const loading = searching ? search.loading : ofTeams.loading;
  const where = teamIds.map((id) => workspace.teamsById.get(id)?.key).filter(Boolean).join(', ');

  return (
    <div class="lin-stack">
      <SearchField value={query} placeholder="Search every project" onChange={setQuery} />
      <div class="sui-muted sui-small">
        {searching ? `Projects matching "${query.trim()}"` : `Active projects of ${where || 'your teams'}`}
      </div>
      {loading && !list.length && <Spinner label="Loading projects" />}
      {!loading && !list.length && <Empty title="No projects" body={searching ? 'Try another search.' : 'These teams have no active project.'} />}
      {list.length > 0 && (
        <div class="lin-table">
          <div class="lin-table-row lin-table-head" aria-hidden="true">
            <span>Name</span><span>Health</span><span>Lead</span><span>Target</span><span>Progress</span>
          </div>
          {list.map((p) => (
            <button type="button" class="lin-table-row" key={p.id} onClick={() => onOpen(p.id)}>
              <span class="lin-table-name">
                <span class="lin-swatch" style={{ background: p.color }} />
                <span class="lin-ellipsis">{p.name}</span>
                <span class="sui-muted sui-small lin-ellipsis">{p.status.name}</span>
              </span>
              <span class="sui-row sui-small">{p.health ? <><Dot tone={HEALTH_TONE[p.health]} />{HEALTH_LABEL[p.health]}</> : <span class="sui-muted">None</span>}</span>
              <span>{p.lead ? <Avatar name={p.lead.name} url={p.lead.avatarUrl} /> : <span class="sui-muted sui-small">None</span>}</span>
              <span class="sui-small">{shortDate(p.targetDate) || <span class="sui-muted">None</span>}</span>
              <span class="lin-table-progress"><Progress value={p.progress * 100} /></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

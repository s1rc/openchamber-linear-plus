// Choose the Linear team that owns the open folder, and any projects it works on.
import { Section } from '@openchamber-ext/shared-ui/preact';
import { useMemo, useState } from 'preact/hooks';
import { Button, Checkbox, SearchField, Spinner } from '../../shared/kit.tsx';
import { knownProject, useProjectSearch, useProjects, useTeamProjects } from '../../shared/projects.ts';
import type { ProjectSummary } from '../../shared/types.ts';
import type { DetectionState } from '../../shared/use-detection.ts';
import type { Workspace } from '../../shared/workspace.ts';

const TEAMS_SHOWN = 30;
const PROJECTS_SHOWN = 40;

const finished = (p: ProjectSummary) => p.status.type === 'completed' || p.status.type === 'canceled';

type Props = { workspace: Workspace; state: DetectionState; onDone: () => void };

export const Picker = ({ workspace, state, onDone }: Props) => {
  const [query, setQuery] = useState('');
  const [teamIds, setTeamIds] = useState<string[]>(state.detection.teamIds);
  const [projectIds, setProjectIds] = useState<string[]>(state.detection.projectIds);
  const [saving, setSaving] = useState(false);
  const q = query.trim().toLowerCase();

  const picked = useProjects(projectIds);
  const ofTeams = useTeamProjects(teamIds);
  const search = useProjectSearch(query);

  const teams = useMemo(() => workspace.teams
    .filter((t) => !q || t.key.toLowerCase().includes(q) || t.name.toLowerCase().includes(q))
    .sort((a, b) => Number(teamIds.includes(b.id)) - Number(teamIds.includes(a.id))
      || Number(workspace.myTeamIds.has(b.id)) - Number(workspace.myTeamIds.has(a.id))
      || a.name.localeCompare(b.name)), [workspace, q, teamIds]);

  // Picked projects first, then search results (with a query) or the picked teams' active projects.
  const projects = useMemo(() => {
    const list: ProjectSummary[] = [];
    const add = (p: ProjectSummary | undefined) => { if (p && !list.some((x) => x.id === p.id)) list.push(p); };
    for (const id of projectIds) add(knownProject(id) ?? picked.data?.find((p) => p.id === id));
    for (const p of (q.length >= 2 ? search.data : ofTeams.data) ?? []) add(p);
    return list.sort((a, b) => Number(projectIds.includes(b.id)) - Number(projectIds.includes(a.id)) || Number(finished(a)) - Number(finished(b)));
  }, [projectIds, picked.data, search.data, ofTeams.data, q]);

  const toggle = (list: string[], id: string, on: boolean) => (on ? [...new Set([...list, id])] : list.filter((x) => x !== id));
  const folder = state.place?.projectDirectory.split('/').pop() ?? 'this folder';
  const loadingProjects = q.length >= 2 ? search.loading : ofTeams.loading;

  const saveAndClose = async () => {
    setSaving(true);
    await state.save(teamIds, projectIds);
    setSaving(false);
    onDone();
  };

  return (
    <div class="lin-stack">
      <div class="sui-muted">
        Pick the Linear team that owns <strong>{folder}</strong>, and any projects it works on. Its worktrees use the same choice.
      </div>
      <SearchField value={query} placeholder="Search teams and projects" onChange={setQuery} autofocus />
      <Section title={`Team (${teamIds.length} picked)`}>
        <div class="lin-pick-list">
          {teams.slice(0, TEAMS_SHOWN).map((t) => (
            <Checkbox
              key={t.id}
              label={`${t.key} · ${t.name}`}
              {...(workspace.myTeamIds.has(t.id) ? { description: 'Your team' } : {})}
              checked={teamIds.includes(t.id)}
              onChange={(on) => setTeamIds((list) => toggle(list, t.id, on))}
            />
          ))}
          {teams.length === 0 && <div class="sui-muted sui-small">No team matches "{query}".</div>}
        </div>
        {teams.length > TEAMS_SHOWN && <div class="sui-muted sui-small">Showing {TEAMS_SHOWN} of {teams.length} teams. Search to narrow it down.</div>}
      </Section>
      <Section title={`Projects, optional (${projectIds.length} picked)`}>
        <div class="sui-muted sui-small">
          {q.length >= 2 ? 'Every project matching your search.' : teamIds.length ? "The picked team's active projects. Search for any other project." : 'Search to find a project.'}
        </div>
        <div class="lin-pick-list">
          {projects.slice(0, PROJECTS_SHOWN).map((p) => (
            <Checkbox
              key={p.id}
              label={p.name}
              description={[p.teams.nodes.map((t) => t.key).join(', '), p.status.name].filter(Boolean).join(' · ')}
              checked={projectIds.includes(p.id)}
              onChange={(on) => setProjectIds((list) => toggle(list, p.id, on))}
            />
          ))}
          {loadingProjects && <Spinner size="sm" label="Loading projects" />}
          {!loadingProjects && q.length >= 2 && !projects.length && <div class="sui-muted sui-small">No project matches "{query}".</div>}
        </div>
      </Section>
      <div class="sui-row">
        <Button
          label="Save for this folder"
          loading={saving}
          disabled={!projectIds.length && !teamIds.length}
          onClick={() => { void saveAndClose(); }}
        />
        <Button label="Cancel" variant="outline" onClick={onDone} />
        <span class="sui-grow" />
        {state.detection.mapping && (
          <Button label="Forget this folder's choice" variant="ghost" onClick={() => { void state.clear().then(onDone); }} />
        )}
      </div>
    </div>
  );
};

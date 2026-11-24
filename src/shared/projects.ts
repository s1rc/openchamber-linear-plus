// Projects load on demand: a workspace can have thousands, so only the ones a view needs are read.
import { useEffect, useState } from 'preact/hooks';
import { load, useQuery } from './cache.ts';
import { gql } from './linear.ts';
import { PROJECT_MILESTONES, PROJECTS, SEARCH_PROJECTS } from './queries.ts';
import type { ProjectMilestonesResult, ProjectMilestoneSummary, ProjectsResult, ProjectSummary, SearchProjectsResult } from './types.ts';

const known = new Map<string, ProjectSummary>();

const remember = (list: ProjectSummary[]) => {
  for (const project of list) known.set(project.id, project);
  return list;
};

/** A project seen by any read in this frame. */
export const knownProject = (id: string) => known.get(id);

export const ACTIVE_STATUS = { type: { nin: ['completed', 'canceled'] } };

export const fetchProjectsByIds = async (ids: string[]): Promise<ProjectSummary[]> => {
  if (!ids.length) return [];
  const data = await gql<ProjectsResult>(PROJECTS, { after: null, filter: { id: { in: [...ids].sort() } } });
  return remember(data.projects.nodes);
};

export const searchProjects = async (term: string): Promise<ProjectSummary[]> => {
  const data = await gql<SearchProjectsResult>(SEARCH_PROJECTS, { term });
  return remember(data.searchProjects.nodes);
};

export const fetchTeamProjects = async (teamId: string): Promise<ProjectSummary[]> => {
  const data = await gql<ProjectsResult>(PROJECTS, { after: null, filter: { accessibleTeams: { some: { id: { eq: teamId } } }, status: ACTIVE_STATUS } });
  return remember(data.projects.nodes).sort((a, b) => a.name.localeCompare(b.name));
};

export const useProjects = (ids: string[]) => {
  const key = ids.length ? `projects:${[...ids].sort().join(',')}` : null;
  return useQuery(key, () => fetchProjectsByIds(ids));
};

export const useTeamProjects = (teamIds: string[]) => {
  const key = teamIds.length ? `team-projects:${[...teamIds].sort().join(',')}` : null;
  return useQuery(key, async () => {
    const lists = await Promise.all(teamIds.map((id) => load(`team-projects:${id}`, () => fetchTeamProjects(id))));
    const seen = new Set<string>();
    return lists.flat().filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)));
  });
};

export const useProjectMilestones = (projectId: string | null) =>
  useQuery(projectId ? `project-milestones:${projectId}` : null, async () => {
    const data = await gql<ProjectMilestonesResult>(PROJECT_MILESTONES, { projectId });
    return [...data.project.projectMilestones.nodes].sort((a, b) => a.sortOrder - b.sortOrder);
  });

/** Server-side project search, debounced. Empty under two characters. */
export const useProjectSearch = (term: string) => {
  const [debounced, setDebounced] = useState(term);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(term.trim()), 250);
    return () => clearTimeout(timer);
  }, [term]);
  return useQuery(debounced.length >= 2 ? `project-search:${debounced.toLowerCase()}` : null, () => searchProjects(debounced));
};

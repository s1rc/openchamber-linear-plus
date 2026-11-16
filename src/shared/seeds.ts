// The people, labels and projects of the teams in scope, for list groups and board columns that
// are empty. Loaded only while "Show empty" is on and the grouping needs them.
import { load, useQuery } from './cache.ts';
import { fetchTeamProjects } from './projects.ts';
import { fetchTeamPeople } from './team-data.ts';
import type { Label, ProjectSummary, User } from './types.ts';
import type { GroupField } from './view-options.ts';

export type SeedData = { people: User[]; labels: Label[]; projects: ProjectSummary[] };

const uniqueBy = <T extends { id: string }>(items: T[]): T[] => {
  const seen = new Set<string>();
  return items.filter((item) => (seen.has(item.id) ? false : (seen.add(item.id), true)));
};

const byName = <T extends { name: string }>(a: T, b: T) => a.name.localeCompare(b.name);

export const fetchSeedData = async (field: GroupField, teamIds: string[]): Promise<SeedData> => {
  if (field === 'project') {
    const lists = await Promise.all(teamIds.map((id) => load(`team-projects:${id}`, () => fetchTeamProjects(id))));
    return { people: [], labels: [], projects: uniqueBy(lists.flat()).sort(byName) };
  }
  const teams = await Promise.all(teamIds.map(fetchTeamPeople));
  return {
    people: uniqueBy(teams.flatMap((t) => t.members.nodes.filter((m) => m.active))).sort(byName),
    labels: uniqueBy(teams.flatMap((t) => t.labels.nodes)).sort(byName),
    projects: [],
  };
};

export const useSeedData = (field: GroupField, teamIds: string[], enabled: boolean) => {
  const needed = enabled && teamIds.length > 0 && (field === 'assignee' || field === 'label' || field === 'project');
  return useQuery(needed ? `seeds:${field}:${[...teamIds].sort().join(',')}` : null, () => fetchSeedData(field, teamIds));
};

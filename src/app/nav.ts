// The sidebar's model, as Linear draws it: Your teams as a tree (sub-teams under their parent), each team with
// Home, Triage, Issues, Projects and Views, and which teams are open. Pure.
import type { Team } from '../shared/types.ts';
import type { View } from './routes.ts';

export type TeamNode = { team: Team; children: TeamNode[] };

/**
 * The shown teams as a tree. A team is a root when its parent is not shown; a sub-team sits under its parent.
 * Siblings are in name order. A parent chain that loops (bad data) is cut, so every team appears once.
 */
export const teamTree = (teams: readonly Team[], shown: ReadonlySet<string>): TeamNode[] => {
  const list = teams.filter((t) => shown.has(t.id));
  const byParent = new Map<string | null, Team[]>();
  for (const team of list) {
    const parent = team.parent && shown.has(team.parent.id) && team.parent.id !== team.id ? team.parent.id : null;
    byParent.set(parent, [...(byParent.get(parent) ?? []), team]);
  }
  const placed = new Set<string>();
  const build = (parent: string | null): TeamNode[] =>
    [...(byParent.get(parent) ?? [])]
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((team) => (placed.has(team.id) ? false : (placed.add(team.id), true)))
      .map((team) => ({ team, children: build(team.id) }));
  const roots = build(null);
  // Teams caught in a loop never reach a root: show them at the top rather than lose them.
  const lost = list.filter((t) => !placed.has(t.id)).sort((a, b) => a.name.localeCompare(b.name));
  for (const team of lost) {
    placed.add(team.id);
    roots.push({ team, children: [] });
  }
  return roots;
};

export type TeamPage = { view: View; title: string };

/** What each team offers, as in Linear. Triage only where the team uses it. */
export const teamPages = (team: Pick<Team, 'triageEnabled'>): TeamPage[] => [
  { view: 'team-home', title: 'Home' },
  ...(team.triageEnabled ? [{ view: 'triage' as View, title: 'Triage' }] : []),
  { view: 'team-issues', title: 'Issues' },
  { view: 'team-projects', title: 'Projects' },
  { view: 'team-views', title: 'Views' },
];

/** The ids of a team and every team above it. */
export const withAncestors = (teamId: string, teams: ReadonlyMap<string, Pick<Team, 'parent'>>): string[] => {
  const out: string[] = [];
  let at: string | undefined = teamId;
  while (at && !out.includes(at)) {
    out.push(at);
    at = teams.get(at)?.parent?.id;
  }
  return out;
};

/** Teams open before the user toggles any: the folder's teams and the teams above them. */
export const defaultOpen = (folderTeamIds: readonly string[], teams: ReadonlyMap<string, Pick<Team, 'parent'>>): string[] =>
  [...new Set(folderTeamIds.flatMap((id) => withAncestors(id, teams)))];

/** Triage issues per team. */
export const countByTeam = (nodes: readonly { team: { id: string } }[]): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const node of nodes) counts.set(node.team.id, (counts.get(node.team.id) ?? 0) + 1);
  return counts;
};

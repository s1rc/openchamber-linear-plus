// The full page's sidebar, laid out like Linear's: Inbox and My issues, This folder, Workspace, then Your teams as
// a tree you open and close, each team with Home, Triage, Issues, Projects and Views, sub-teams under their parent.
import { useEffect, useMemo, useState } from 'preact/hooks';
import { useQuery } from '../../shared/cache.ts';
import { gql } from '../../shared/linear.ts';
import { TRIAGE_COUNTS } from '../../shared/queries.ts';
import { getNavOpen, setNavOpen } from '../../shared/storage.ts';
import type { Team, TriageCountsResult } from '../../shared/types.ts';
import type { DetectionState } from '../../shared/use-detection.ts';
import type { Workspace } from '../../shared/workspace.ts';
import { countByTeam, defaultOpen, teamPages, teamTree, withAncestors, type TeamNode } from '../nav.ts';
import { PROJECT_VIEWS, routeId, TITLES, type Route, type View } from '../routes.ts';
import { Chevron, NAV_ICONS } from './nav-icons.tsx';

const PAGE_ICON: Partial<Record<View, string>> = {
  'team-home': 'home', triage: 'triage', 'team-issues': 'issues', 'team-projects': 'projects', 'team-views': 'views',
  project: 'project', 'project-issues': 'issues', 'project-board': 'board',
};

/** The teams the sidebar lists: yours, and the folder's. */
export const shownTeamIds = (workspace: Workspace, state: DetectionState): Set<string> =>
  new Set(workspace.teams.filter((t) => workspace.myTeamIds.has(t.id) || state.detection.teamIds.includes(t.id)).map((t) => t.id));

const useTriageCounts = (teamIds: string[]) =>
  useQuery(teamIds.length ? `triage-counts:${teamIds.join(',')}` : null, async () => {
    const nodes: TriageCountsResult['issues']['nodes'] = [];
    let after: string | null = null;
    for (let page = 0; page < 4; page += 1) {
      const data: TriageCountsResult = await gql<TriageCountsResult>(TRIAGE_COUNTS, { teamIds, after });
      nodes.push(...data.issues.nodes);
      if (!data.issues.pageInfo.hasNextPage) break;
      after = data.issues.pageInfo.endCursor;
    }
    return countByTeam(nodes);
  });

type ItemProps = { label: string; icon?: string; selected: boolean; count?: number; depth?: number; onClick: () => void };

const Item = ({ label, icon, selected, count, depth = 0, onClick }: ItemProps) => {
  const Glyph = icon ? NAV_ICONS[icon] : undefined;
  return (
    <button type="button" class="lin-nav-item" aria-current={selected ? 'page' : undefined} style={depth ? { paddingLeft: `${8 + depth * 14}px` } : undefined} onClick={onClick}>
      {Glyph && <Glyph />}
      <span class="lin-ellipsis lin-nav-label">{label}</span>
      {count ? <span class="lin-nav-count">{count > 99 ? '99+' : count}</span> : null}
    </button>
  );
};

const Heading = ({ label, open, onToggle }: { label: string; open?: boolean; onToggle?: () => void }) =>
  onToggle ? (
    <button type="button" class="lin-nav-heading lin-nav-heading--toggle" aria-expanded={open ? 'true' : 'false'} onClick={onToggle}>
      {label}<Chevron open={Boolean(open)} />
    </button>
  ) : <div class="lin-nav-heading">{label}</div>;

const TeamMark = ({ team }: { team: Team }) => (
  <span class="lin-nav-team-mark" style={{ background: team.color ?? 'var(--oc-muted)' }} aria-hidden="true">{team.key.slice(0, 1)}</span>
);

type Props = { workspace: Workspace; state: DetectionState; route: Route; onRoute: (route: Route) => void };

export const Sidebar = ({ workspace, state, route, onRoute }: Props) => {
  const current = routeId(route);
  const shown = useMemo(() => shownTeamIds(workspace, state), [workspace, state.detection.teamIds]);
  const tree = useMemo(() => teamTree(workspace.teams, shown), [workspace.teams, shown]);
  const [open, setOpen] = useState<{ teams: Set<string>; yourTeams: boolean } | null>(null);
  useEffect(() => {
    void getNavOpen().then((saved) => setOpen(saved
      ? { teams: new Set(saved.teams), yourTeams: saved.yourTeams }
      : { teams: new Set(defaultOpen(state.detection.teamIds, workspace.teamsById)), yourTeams: true }));
  }, []);
  // Going to a team's page opens that team (and its parents), so the selection is visible; it can still be closed.
  const routeTeam = route.teamId ?? null;
  const isOpen = (id: string) => Boolean(open?.teams.has(id));
  const save = (next: { teams: Set<string>; yourTeams: boolean }) => { setOpen(next); void setNavOpen({ teams: [...next.teams], yourTeams: next.yourTeams }); };
  const toggleTeam = (id: string) => {
    if (!open) return;
    const teams = new Set(open.teams);
    if (teams.has(id)) teams.delete(id); else teams.add(id);
    save({ ...open, teams });
  };
  useEffect(() => {
    if (!open || !routeTeam) return;
    const needed = withAncestors(routeTeam, workspace.teamsById).filter((id) => !open.teams.has(id));
    if (needed.length) save({ ...open, teams: new Set([...open.teams, ...needed]) });
  }, [routeTeam, open === null]);
  const triageIds = useMemo(() => workspace.teams.filter((t) => t.triageEnabled && shown.has(t.id) && (isOpen(t.id) || t.id === routeTeam)).map((t) => t.id).sort(), [workspace.teams, shown, open, routeTeam]);
  const triage = useTriageCounts(triageIds);
  const go = (next: Route) => onRoute(next);

  const branch = (node: TeamNode, depth: number): preact.JSX.Element => {
    const { team } = node;
    const expanded = isOpen(team.id);
    return (
      <div class="lin-nav-team" key={team.id} data-team={team.key}>
        <button type="button" class="lin-nav-item lin-nav-team-row" aria-expanded={expanded ? 'true' : 'false'} style={depth ? { paddingLeft: `${8 + depth * 14}px` } : undefined} onClick={() => toggleTeam(team.id)}>
          <TeamMark team={team} />
          <span class="lin-ellipsis lin-nav-label">{team.name}</span>
          <Chevron open={expanded} />
        </button>
        {expanded && (
          <div class="lin-nav-children" style={{ marginLeft: `${15 + depth * 14}px` }}>
            {teamPages(team).map((page) => (
              <Item
                key={page.view}
                label={page.title}
                icon={PAGE_ICON[page.view]}
                selected={current === `${page.view}:${team.id}`}
                count={page.view === 'triage' ? triage.data?.get(team.id) : undefined}
                onClick={() => go({ view: page.view, teamId: team.id })}
              />
            ))}
            {node.children.map((child) => branch(child, 0))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav class="lin-nav" aria-label="Linear">
      <div class="lin-nav-org">{workspace.viewer.organization?.name ?? 'Linear'}</div>
      <div class="lin-nav-group">
        <Item label="Inbox" icon="inbox" selected={current === 'inbox'} onClick={() => go({ view: 'inbox' })} />
        <Item label="My issues" icon="my-issues" selected={current === 'my-issues'} onClick={() => go({ view: 'my-issues' })} />
      </div>
      {state.mapped && (
        <div class="lin-nav-group">
          <Heading label="This folder" />
          {PROJECT_VIEWS.map((view) => <Item key={view} label={TITLES[view]} icon={PAGE_ICON[view]} selected={current === view} onClick={() => go({ view })} />)}
        </div>
      )}
      <div class="lin-nav-group">
        <Heading label="Workspace" />
        <Item label="Projects" icon="projects" selected={current === 'projects'} onClick={() => go({ view: 'projects' })} />
        <Item label="Cycles" icon="cycles" selected={current === 'cycles'} onClick={() => go({ view: 'cycles' })} />
      </div>
      {tree.length > 0 && (
        <div class="lin-nav-group">
          <Heading label="Your teams" open={open?.yourTeams !== false} onToggle={open ? () => save({ ...open, yourTeams: !open.yourTeams }) : undefined} />
          {open?.yourTeams !== false && tree.map((node) => branch(node, 0))}
        </div>
      )}
      <div class="lin-nav-group lin-nav-foot">
        <Item label="Settings" icon="settings" selected={current === 'settings'} onClick={() => go({ view: 'settings' })} />
      </div>
    </nav>
  );
};

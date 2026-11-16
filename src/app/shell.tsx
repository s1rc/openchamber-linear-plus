// The dashboard frame: Linear-style sidebar on the full page, a view picker in the rail panel.
import type { HostReadyContext } from '@openchamber/sdk';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { invalidate } from '../shared/cache.ts';
import { host } from '../shared/host.ts';
import { Banner, Button, Empty, List, Select, Spinner } from '../shared/kit.tsx';
import { LinearError } from '../shared/linear.ts';
import { getLastView } from '../shared/storage.ts';
import { takeOpenTarget } from '../shared/open-target.ts';
import { loadViewState, PlaceKey, saveOpenIssue, saveRoute, saveTab, setViewStateScope } from './view-state.ts';
import { useDetection, type DetectionState } from '../shared/use-detection.ts';
import { loadWorkspace, useWorkspace, type Workspace } from '../shared/workspace.ts';
import { PROJECT_VIEWS, REMEMBERED, TITLES, parseRouteId, routeId, type Route, type View } from './routes.ts';
import { ALL, FolderHeader, mappedIds, ScopeChip, WorkRow } from './views/folder-header.tsx';
import { scopeFilter } from '../shared/filters.ts';
import { IssueBrowser } from './components/issue-browser.tsx';
import { FolderOverview } from './views/folder-overview.tsx';
import { Cycles } from './views/cycles.tsx';
import { Inbox } from './views/inbox.tsx';
import { MyIssues } from './views/my-issues.tsx';
import { ProjectDetail } from './views/project-detail.tsx';
import { ProjectsList } from './views/projects-list.tsx';
import { Picker } from './views/picker.tsx';
import { Settings } from './views/settings.tsx';

type NavItem = { id: string; title: string; leading?: string };
type NavGroup = { heading?: string; items: NavItem[] };

const navGroups = (workspace: Workspace, state: DetectionState): NavGroup[] => {
  const groups: NavGroup[] = [{ items: [{ id: 'inbox', title: 'Inbox' }, { id: 'my-issues', title: 'My issues' }] }];
  if (state.mapped) {
    groups.push({
      heading: 'This folder',
      items: PROJECT_VIEWS.map((view) => ({ id: view, title: TITLES[view] })),
    });
  }
  groups.push({ heading: 'Workspace', items: [{ id: 'projects', title: 'Projects' }, { id: 'cycles', title: 'Cycles' }] });
  // Your teams and the folder's teams; a workspace can have dozens more.
  const shown = workspace.teams.filter((t) => workspace.myTeamIds.has(t.id) || state.detection.teamIds.includes(t.id));
  groups.push({
    heading: 'Your teams',
    items: shown.flatMap((team) => [
      { id: `team-issues:${team.id}`, title: team.name },
      ...(team.triageEnabled ? [{ id: `triage:${team.id}`, title: `${team.name} triage` }] : []),
    ]),
  });
  groups.push({ items: [{ id: 'settings', title: 'Settings' }] });
  return groups;
};

const Sidebar = ({ workspace, state, route, onRoute }: {
  workspace: Workspace;
  state: DetectionState;
  route: Route;
  onRoute: (route: Route) => void;
}) => {
  const current = routeId(route);
  return (
    <nav class="lin-nav" aria-label="Linear">
      <div class="lin-nav-org">{workspace.viewer.organization?.name ?? 'Linear'}</div>
      {navGroups(workspace, state).map((group) => {
        const selected = group.items.some((item) => item.id === current) ? current : null;
        return (
        <div class="lin-nav-group">
          {group.heading && <div class="lin-nav-heading">{group.heading}</div>}
          {/* Remount when the selection moves, so the kit's keyboard highlight follows it. */}
          <List
            key={selected ?? 'none'}
            items={group.items}
            selectedId={selected}
            onSelect={(id) => onRoute(parseRouteId(id))}
            ariaLabel={group.heading ?? 'Main'}
          />
        </div>
        );
      })}
    </nav>
  );
};

const ViewPicker = ({ workspace, state, route, onRoute }: {
  workspace: Workspace;
  state: DetectionState;
  route: Route;
  onRoute: (route: Route) => void;
}) => {
  const options = navGroups(workspace, state).flatMap((group) => group.items.map((item) => ({
    id: item.id,
    label: item.leading ? `${item.leading} ${item.title}` : item.title,
    ...(group.heading ? { hint: group.heading } : {}),
  })));
  const current = routeId(route);
  return (
    <Select
      value={options.some((o) => o.id === current) ? current : null}
      placeholder={TITLES[route.view]}
      options={options}
      onChange={(id) => onRoute(parseRouteId(id))}
      searchable={options.length > 8}
    />
  );
};

const NotYet = ({ view }: { view: View }) => (
  <Empty title={TITLES[view]} body="This view arrives in the next build." />
);

const Content = ({ ctx, workspace, state, route, onRoute, activeId, onActive, scoped, onScoped }: {
  ctx: HostReadyContext;
  workspace: Workspace;
  state: DetectionState;
  route: Route;
  onRoute: (route: Route) => void;
  activeId: string;
  onActive: (id: string) => void;
  scoped: boolean;
  onScoped: (scoped: boolean) => void;
}) => {
  const ids = mappedIds(state);
  const toPicker = () => onRoute({ view: 'picker' });
  const pickPrompt = !state.mapped && state.place && (
    <Banner
      tone="info"
      title="No Linear team for this folder"
      body="Pick the team that owns it, or the projects it works on, to scope every view to it."
      action={{ label: 'Pick team or projects', onClick: toPicker }}
    />
  );

  if (route.view === 'picker') {
    return <Picker workspace={workspace} state={state} onDone={() => onRoute({ view: state.mapped ? 'project' : 'my-issues' })} />;
  }
  if (route.view === 'settings') return <Settings workspace={workspace} state={state} onChange={toPicker} />;

  if (PROJECT_VIEWS.includes(route.view)) {
    if (!state.mapped) {
      return state.place ? (
        <div class="lin-stack">
          <Empty
            title="No Linear team for this folder"
            body="Pick the team that owns this folder, or the projects it works on. Worktrees of this folder use the same choice."
            action={{ label: 'Pick team or projects', onClick: toPicker }}
          />
          <WorkRow state={state} />
        </div>
      ) : (
        <Empty title="No folder open" body="Open a project in OpenChamber to see its Linear team here." />
      );
    }
    const shown = activeId === ALL || !ids.includes(activeId) ? ids : [activeId];
    const shownTeams = shown.filter((id) => workspace.teamsById.has(id));
    const shownProjects = shown.filter((id) => !workspace.teamsById.has(id));
    return (
      <div class="lin-stack">
        <FolderHeader workspace={workspace} state={state} activeId={activeId} onActive={onActive} onChange={toPicker} />
        {route.view === 'project' && route.projectId ? (
          <>
            <div><Button label="Back to overview" variant="ghost" size="xs" onClick={() => onRoute({ view: 'project' })} /></div>
            <ProjectDetail ctx={ctx} id={route.projectId} viewerId={workspace.viewer.id} withIssues />
          </>
        ) : route.view === 'project' ? (
          <FolderOverview ctx={ctx} workspace={workspace} ids={shown} onProject={(projectId) => onRoute({ view: 'project', projectId })} />
        ) : route.view === 'project-issues' || route.view === 'project-board' ? (
          <IssueBrowser
            key={`${route.view}:${shown.join(',')}`}
            listKey={`${route.view}:${shown.join(',')}`}
            defaultMode={route.view === 'project-board' ? 'board' : 'list'}
            viewTeamId={shownTeams.length === 1 ? shownTeams[0] : null}
            ctx={ctx}
            scope={scopeFilter(shownTeams, shownProjects)}
            teamIds={shownTeams}
            subTeamScope={shownTeams.length ? scopeFilter(shownTeams, shownProjects, true) : null}
            viewerId={workspace.viewer.id}
            showProject={shownProjects.length !== 1 || shownTeams.length > 0}
            projectId={shownProjects.length === 1 ? shownProjects[0] : null}
            emptyTitle="No open issues"
            emptyBody="Nothing open for this folder's team or projects."
          />
        ) : (
          <NotYet view={route.view} />
        )}
      </div>
    );
  }

  if (route.view === 'project-detail' && route.projectId) {
    return (
      <div class="lin-stack">
        <div><Button label="Back to projects" variant="ghost" size="xs" onClick={() => onRoute({ view: 'projects' })} /></div>
        <ProjectDetail ctx={ctx} id={route.projectId} viewerId={workspace.viewer.id} withIssues />
      </div>
    );
  }
  if (route.view === 'my-issues') {
    return (
      <div class="lin-stack">
        {pickPrompt}
        <ScopeChip workspace={workspace} state={state} scoped={scoped} onScoped={onScoped} />
        <MyIssues ctx={ctx} state={state} scoped={scoped} viewerId={workspace.viewer.id} />
      </div>
    );
  }
  if (route.view === 'projects') {
    return (
      <div class="lin-stack">
        {pickPrompt}
        <ScopeChip workspace={workspace} state={state} scoped={scoped} onScoped={onScoped} />
        <ProjectsList workspace={workspace} state={state} scoped={scoped} onOpen={(projectId) => onRoute({ view: 'project-detail', projectId })} />
      </div>
    );
  }
  if (route.view === 'inbox') {
    return (
      <div class="lin-stack">
        {pickPrompt}
        <ScopeChip workspace={workspace} state={state} scoped={scoped} onScoped={onScoped} />
        <Inbox state={state} scoped={scoped} />
      </div>
    );
  }
  if (route.view === 'cycles') {
    return (
      <div class="lin-stack">
        {pickPrompt}
        <ScopeChip workspace={workspace} state={state} scoped={scoped} onScoped={onScoped} />
        <Cycles ctx={ctx} workspace={workspace} state={state} scoped={scoped} />
      </div>
    );
  }
  if (route.view === 'triage' && route.teamId) {
    const team = workspace.teamsById.get(route.teamId);
    return (
      <IssueBrowser
        key={`triage:${route.teamId}`}
        listKey={`triage:${route.teamId}`}
        ctx={ctx}
        scope={{ team: { id: { eq: route.teamId } }, state: { type: { eq: 'triage' } } }}
        teamIds={[route.teamId]}
        viewerId={workspace.viewer.id}
        states="all"
        emptyTitle="Triage is empty"
        emptyBody={`Nothing is waiting for triage in ${team?.name ?? 'this team'}.`}
      />
    );
  }
  if (route.view === 'team-issues' && route.teamId) {
    const team = workspace.teamsById.get(route.teamId);
    return (
      <IssueBrowser
        key={route.teamId}
        listKey={`team-issues:${route.teamId}`}
        viewTeamId={route.teamId}
        ctx={ctx}
        scope={scopeFilter([route.teamId], [])}
        teamIds={[route.teamId]}
        subTeamScope={scopeFilter([route.teamId], [], true)}
        viewerId={workspace.viewer.id}
        emptyTitle="No open issues"
        emptyBody={`${team?.name ?? 'This team'} has nothing open.`}
      />
    );
  }

  return (
    <div class="lin-stack">
      {pickPrompt}
      <NotYet view={route.view} />
    </div>
  );
};

export const Shell = ({ ctx }: { ctx: HostReadyContext }) => {
  const workspace = useWorkspace();
  const state = useDetection(ctx.directory, workspace.data);
  const [route, setRoute] = useState<Route>({ view: 'my-issues' });
  const [activeId, setActiveId] = useState<string>(ALL);
  const [scoped, setScoped] = useState(true);
  const landedFor = useRef<string | null>(null);
  const [landed, setLanded] = useState<string | null>(null);
  // Bumped to show a note from the Work Status section on a fresh view.
  const [nonce, setNonce] = useState(0);

  useEffect(() => { setViewStateScope(Boolean(ctx.features?.deviceStorage)); }, [ctx.features?.deviceStorage]);

  // Land once per folder: where you were last (view and open issue), else the folder's overview,
  // else My issues. OpenChamber may reload this frame on a project switch, so it comes from storage.
  useEffect(() => {
    if (!state.settled || !workspace.data) return;
    const key = state.place?.key ?? 'none';
    if (landedFor.current === key) return;
    landedFor.current = key;
    const mapped = state.mapped;
    setScoped(mapped);
    setActiveId(state.detection.mapping?.activeProjectId ?? mappedIds(state)[0] ?? ALL);
    const fallback: Route = { view: mapped ? 'project' : 'my-issues' };
    if (!state.place) { setRoute({ view: 'my-issues' }); setLanded(key); return; }
    const teams = workspace.data.teamsById;
    const usable = (r: Route | undefined): r is Route => Boolean(r)
      && r!.view !== 'picker'
      && (!PROJECT_VIEWS.includes(r!.view) || mapped)
      && (r!.view !== 'team-issues' && r!.view !== 'triage' || Boolean(r!.teamId && teams.has(r!.teamId)))
      && (r!.view !== 'project-detail' || Boolean(r!.projectId));
    void (async () => {
      const saved = await loadViewState(key);
      let next = saved.route;
      if (!next) {
        const last = await getLastView(key);
        if (last && (REMEMBERED as string[]).includes(last)) next = { view: last as View };
      }
      if (landedFor.current !== key) return;
      setRoute(usable(next) ? next : fallback);
      setLanded(key);
    })();
  }, [state.settled, state.place, state.detection, workspace.data]);

  const onRoute = (next: Route) => {
    setRoute(next);
    if (state.place && next.view !== 'picker') saveRoute(state.place.key, next);
  };

  const onActive = (id: string) => {
    setActiveId(id);
    state.setActive(id);
  };

  // The Work Status section asks for an issue or the picker through extension storage. Read it once the
  // folder has landed, and again every few seconds while the rail panel is on screen (it may already be open).
  useEffect(() => {
    const key = state.place?.key;
    if (!key || landed !== key) return;
    let alive = true;
    const check = async () => {
      if (document.visibilityState !== 'visible') return;
      const target = await takeOpenTarget(key);
      if (!alive || !target) return;
      if (target.view === 'picker') {
        onRoute({ view: 'picker' });
      } else if (target.issue) {
        saveTab(key, 'my-issues', 'assigned');
        saveOpenIssue(key, 'my-issues:assigned', target.issue);
        setScoped(state.mapped);
        onRoute({ view: 'my-issues' });
        setNonce((n) => n + 1);
      }
    };
    void check();
    if (ctx.surface !== 'panel') return () => { alive = false; };
    const timer = setInterval(() => { void check(); }, 3000);
    return () => { alive = false; clearInterval(timer); };
  }, [landed, state.place?.key, state.mapped, ctx.surface]);

  // Linear data changes under you: reload what is on screen once a minute while the frame is visible.
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      for (const prefix of ['issue', 'notifications', 'cycle', 'children', 'project:']) invalidate(prefix);
    }, 60_000);
    return () => clearInterval(timer);
  }, []);

  const refresh = () => {
    invalidate('');
    void loadWorkspace(true).catch(() => undefined);
    state.refresh();
  };

  const wide = ctx.surface === 'page';
  const title = useMemo(() => {
    if (route.teamId) {
      const team = workspace.data?.teams.find((t) => t.id === route.teamId);
      return team ? `${team.name} · ${TITLES[route.view]}` : TITLES[route.view];
    }
    return TITLES[route.view];
  }, [route, workspace.data]);

  if (workspace.error && !workspace.data) {
    const error = workspace.error instanceof LinearError ? workspace.error : new LinearError('network', String(workspace.error));
    if (error.kind === 'disconnected') {
      return (
        <Empty
          title="Connect Linear"
          body="Sign in to Linear in OpenChamber, then come back."
          action={{ label: 'Connect Linear', onClick: () => { void host.oauthStart(); } }}
        />
      );
    }
    return (
      <div class="lin-pad">
        <Banner tone="error" title="Could not load Linear" body={error.message} action={{ label: 'Retry', onClick: () => workspace.refresh() }} />
      </div>
    );
  }

  if (!workspace.data || !state.settled || landed !== (state.place?.key ?? 'none')) return <div class="lin-center"><Spinner label="Loading Linear" /></div>;

  const data = workspace.data;
  return (
    <PlaceKey.Provider value={state.place?.key ?? null}>
    <div class={wide ? 'lin-shell lin-shell--wide' : 'lin-shell'}>
      {wide && <Sidebar workspace={data} state={state} route={route} onRoute={onRoute} />}
      <main class="lin-main">
        <header class="lin-header">
          {wide ? <h1 class="lin-title">{title}</h1> : <ViewPicker workspace={data} state={state} route={route} onRoute={onRoute} />}
          <span class="sui-grow" />
          <Button label="Refresh" variant="ghost" size="sm" onClick={refresh} />
        </header>
        <div class="lin-content">
          <Content
            key={nonce}
            ctx={ctx}
            workspace={data}
            state={state}
            route={route}
            onRoute={onRoute}
            activeId={activeId}
            onActive={onActive}
            scoped={scoped}
            onScoped={setScoped}
          />
        </div>
      </main>
    </div>
    </PlaceKey.Provider>
  );
};


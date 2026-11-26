// The dashboard frame: Linear-style sidebar on the full page, a view picker in the rail panel.
import { toast } from '@openchamber-ext/shared-ui';
import type { HostReadyContext } from '@openchamber/sdk';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { invalidate } from '../shared/cache.ts';
import { host } from '../shared/host.ts';
import { Banner, Button, Empty, List, Select, Spinner } from '../shared/kit.tsx';
import { LinearError } from '../shared/linear.ts';
import { getLastView } from '../shared/storage.ts';
import { takeOpenTarget } from '../shared/open-target.ts';
import { issueOwnerKey, loadViewState, PlaceKey, saveOpenIssue, saveRoute, saveTab, setViewStateScope, WorktreeKey } from './view-state.ts';
import { AssignedPusher, SnapshotPusher } from '../shared/snapshot-pusher.tsx';
import { PlanExtrasRunner } from '../shared/plan-extras-runner.tsx';
import { useDetection, type DetectionState } from '../shared/use-detection.ts';
import { loadWorkspace, useWorkspace, type Workspace } from '../shared/workspace.ts';
import { PROJECT_VIEWS, REMEMBERED, TEAM_VIEWS, TITLES, parseRouteId, routeId, type Route, type View } from './routes.ts';
import { ALL, FolderHeader, mappedIds, ScopeChip } from './views/folder-header.tsx';
import { scopeFilter } from '../shared/filters.ts';
import { IssueBrowser } from './components/issue-browser.tsx';
import { shownTeamIds, Sidebar } from './components/sidebar.tsx';
import { teamPages, teamTree, type TeamNode } from './nav.ts';
import { TeamViews } from './views/team-views.tsx';
import { TeamOverview } from './views/team-overview.tsx';
import { IssueDetail } from './components/issue-detail.tsx';
import { IssuePaneProvider, useIssuePane, type OpenIssue } from './issue-pane.tsx';
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
  // The rail's picker lists the same team pages as the page's sidebar, in its tree order.
  const flat = (nodes: TeamNode[]): TeamNode[] => nodes.flatMap((n) => [n, ...flat(n.children)]);
  for (const { team } of flat(teamTree(workspace.teams, shownTeamIds(workspace, state)))) {
    groups.push({ items: teamPages(team).map((page) => ({ id: `${page.view}:${team.id}`, title: `${team.name} · ${page.title}` })) });
  }
  // Settings has its own button in the rail's header.
  return groups;
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

const Content = ({ ctx, workspace, state, route, onRoute, activeId, onActive, scoped, onScoped, onRestoreError }: {
  ctx: HostReadyContext;
  workspace: Workspace;
  state: DetectionState;
  route: Route;
  onRoute: (route: Route) => void;
  activeId: string;
  onActive: (id: string) => void;
  scoped: boolean;
  onScoped: (scoped: boolean) => void;
  onRestoreError?: () => void;
}) => {
  const ids = mappedIds(state);
  const toPicker = () => onRoute({ view: 'picker' });
  const pickPrompt = !state.mapped && state.place && (
    <Banner
      tone="info"
      title="No Linear team for this folder"
      body="Pick the team that owns it, or the projects it works on, to scope every view to it."
      action={{ label: 'Pick Team or Projects', onClick: toPicker }}
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
            action={{ label: 'Pick Team or Projects', onClick: toPicker }}
          />
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
            <div><Button label="Back to Overview" variant="ghost" size="xs" onClick={() => onRoute({ view: 'project' })} /></div>
            <ProjectDetail ctx={ctx} id={route.projectId} viewerId={workspace.viewer.id} withIssues onUnavailable={onRestoreError} />
          </>
        ) : route.view === 'project' ? (
          <FolderOverview ctx={ctx} workspace={workspace} ids={shown} onProject={(projectId) => onRoute({ view: 'project', projectId })} />
        ) : route.view === 'project-issues' || route.view === 'project-board' ? (
          <IssueBrowser
            key={`${route.view}:${shown.join(',')}`}
            listKey={`${route.view}:${shown.join(',')}`}
            origin="This folder"
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
        <div><Button label="Back to Projects" variant="ghost" size="xs" onClick={() => onRoute({ view: 'projects' })} /></div>
        <ProjectDetail ctx={ctx} id={route.projectId} viewerId={workspace.viewer.id} withIssues onUnavailable={onRestoreError} />
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
        origin={`${team?.name ?? 'Team'} triage`}
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
  if (route.view === 'team-home' && route.teamId) {
    const team = workspace.teamsById.get(route.teamId);
    if (team) return <TeamOverview team={team} orgKey={workspace.viewer.organization?.urlKey ?? ''} onProject={(projectId) => onRoute({ view: 'project-detail', projectId })} />;
  }
  if (route.view === 'team-projects' && route.teamId) {
    return <ProjectsList workspace={workspace} state={state} scoped={false} teamIds={[route.teamId]} onOpen={(projectId) => onRoute({ view: 'project-detail', projectId })} />;
  }
  if (route.view === 'team-views' && route.teamId) {
    return <TeamViews teamId={route.teamId} onOpen={() => onRoute({ view: 'team-issues', teamId: route.teamId })} />;
  }
  if (route.view === 'team-issues' && route.teamId) {
    const team = workspace.teamsById.get(route.teamId);
    return (
      <IssueBrowser
        key={route.teamId}
        listKey={`team-issues:${route.teamId}`}
        origin={team?.name ?? 'Issues'}
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

const typingIn = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

/**
 * The view, and the open issue drawn the same way whatever view opened it: on the page a pane on the right of the
 * whole view, on the rail panel in place of the view (kept mounted and hidden, so Back finds it as it was).
 */
const PaneLayout = ({ wide, children, onRestoreError }: { wide: boolean; children: preact.ComponentChildren; onRestoreError: (open: OpenIssue) => void }) => {
  const pane = useIssuePane();
  const open = pane.current;
  const close = () => { open?.onClosed?.(); pane.close(); };
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented || typingIn(event.target) || document.querySelector('.oc-sdk-popup, .lin-modal')) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <div class={open && wide ? 'lin-body lin-body--split' : 'lin-body'}>
      <div class="lin-content" hidden={Boolean(open) && !wide}>{children}</div>
      {open && (
        <aside class={wide ? 'lin-pane' : 'lin-content'} aria-label={`Issue ${open.id}`}>
          <IssueDetail
            key={open.id}
            id={open.id}
            stacked
            pane={wide}
            origin={open.origin}
            onClose={close}
            onOpenIssue={(id) => pane.open(open.owner, open.origin, id, open.onClosed)}
            onUnavailable={open.restored ? () => onRestoreError(open) : undefined}
          />
        </aside>
      )}
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
  const restoredRoute = useRef<Route | null>(null);
  const [landed, setLanded] = useState<string | null>(null);
  // Bumped to show a note from the Work Status section on a fresh view.
  const [nonce, setNonce] = useState(0);

  useEffect(() => { setViewStateScope(Boolean(ctx.features?.deviceStorage)); }, [ctx.features?.deviceStorage]);

  // Land once per folder: where you were last (view and open issue), else the worktree's issue,
  // the folder's overview, or My issues. OpenChamber may reload this frame on a project switch, so it comes from storage.
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
      && (!TEAM_VIEWS.includes(r!.view) || Boolean(r!.teamId && teams.has(r!.teamId)))
      && (r!.view !== 'project-detail' || Boolean(r!.projectId));
    void (async () => {
      const saved = await loadViewState(key);
      let next = saved.route;
      if (!next) {
        const last = await getLastView(key);
        if (last && (REMEMBERED as string[]).includes(last)) next = { view: last as View };
      }
      if (landedFor.current !== key) return;
      if (usable(next)) {
        restoredRoute.current = next;
        setRoute(next);
      } else if (state.detection.work && state.place) {
        // A stale route should not hide the issue this worktree was made for.
        saveTab(key, 'my-issues', 'assigned');
        saveOpenIssue(key, issueOwnerKey(state.place.directory, 'my-issues:assigned'), state.detection.work.identifier);
        restoredRoute.current = null;
        setRoute({ view: 'my-issues' });
      } else {
        restoredRoute.current = null;
        setRoute(fallback);
      }
      setLanded(key);
    })();
  }, [state.settled, state.place, state.detection, workspace.data]);

  // Where the rail's Settings button goes back to.
  const lastRoute = useRef<Route>({ view: 'my-issues' });
  const onRoute = (next: Route) => {
    restoredRoute.current = null;
    if (route.view !== 'settings') lastRoute.current = route;
    setRoute(next);
    if (state.place && next.view !== 'picker') saveRoute(state.place.key, next);
  };

  const restoreError = (stale?: OpenIssue) => {
    const place = state.place;
    const work = state.detection.work;
    if (!place || !work || stale?.id === work.identifier) return;
    if (stale) saveOpenIssue(place.key, issueOwnerKey(place.directory, stale.owner), null);
    saveTab(place.key, 'my-issues', 'assigned');
    saveOpenIssue(place.key, issueOwnerKey(place.directory, 'my-issues:assigned'), work.identifier);
    onRoute({ view: 'my-issues' });
    setNonce((n) => n + 1);
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
        saveOpenIssue(key, issueOwnerKey(state.place?.directory ?? '', 'my-issues:assigned'), target.issue);
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

  // Reloading with nothing new on screen looks like nothing happened (an open issue included), so a click answers with a toast.
  const refresh = () => {
    invalidate('');
    state.refresh();
    void loadWorkspace(true).then(
      () => toast(host, 'success', 'Linear refreshed'),
      () => toast(host, 'error', 'Could not refresh Linear. Check the connection and try again.'),
    );
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
    <WorktreeKey.Provider value={state.place?.directory ?? ''}>
    <IssuePaneProvider>
    <AssignedPusher directory={ctx.directory ?? null} orgKey={data.viewer.organization?.urlKey ?? null} />
    {state.place && state.mapped && <SnapshotPusher directory={state.place.directory} workspace={data} state={state} />}
    {state.place && state.mapped && <PlanExtrasRunner directory={state.place.directory} viewerId={data.viewer.id} />}
    <div class={wide ? 'lin-shell lin-shell--wide' : 'lin-shell'}>
      {wide && <Sidebar workspace={data} state={state} route={route} onRoute={onRoute} />}
      <main class="lin-main">
        <header class="lin-header">
          {wide ? <h1 class="lin-title">{title}</h1> : <ViewPicker workspace={data} state={state} route={route} onRoute={onRoute} />}
          <span class="sui-grow" />
          {!wide && (
            <Button
              label="Settings"
              variant={route.view === 'settings' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => onRoute(route.view === 'settings' ? lastRoute.current : { view: 'settings' })}
            />
          )}
          <Button label="Refresh" variant="ghost" size="sm" onClick={refresh} />
        </header>
        <PaneLayout wide={wide} onRestoreError={restoreError}>
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
            onRestoreError={restoredRoute.current === route ? () => restoreError() : undefined}
          />
        </PaneLayout>
      </main>
    </div>
    </IssuePaneProvider>
    </WorktreeKey.Provider>
    </PlaceKey.Provider>
  );
};


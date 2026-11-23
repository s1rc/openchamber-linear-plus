// A filterable issue list or board with Linear's view options, used by every issue view.
// Scope (team, project, mine) and a saved view are server filters; assignee, priority, label, status
// and text filter the loaded issues in the frame, so changing them costs no Linear request.
import type { HostReadyContext } from '@openchamber/sdk';
import { toast } from '@openchamber-ext/shared-ui';
import { useContext, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { splitColumns } from '../../shared/board.ts';
import { all, BUILTIN_VIEWS, openOrRecent, type Filter } from '../../shared/filters.ts';
import { milestoneFilter } from '../../shared/milestones.ts';
import { groupIssues, PRIORITY_NAMES, type Seeds } from '../../shared/grouping.ts';
import { useSeedData } from '../../shared/seeds.ts';
import { useChildCounts, useChildIssues, useCustomViews, useIssueExtras, useIssueList, useViewIssueList } from '../../shared/issues.ts';
import { nestIssues } from '../../shared/nesting.ts';
import { Banner, Button, Empty, SearchField, Select, Spinner, Switch, Tabs } from '../../shared/kit.tsx';
import { LinearError } from '../../shared/linear.ts';
import type { IssueRow as Issue, StateType } from '../../shared/types.ts';
import { changedOptions, EXTRA_PROPERTIES, orderIssues, resolveOptions, visibleIssues, type Mode, type ViewOptions } from '../../shared/view-options.ts';
import { useWorkspace } from '../../shared/workspace.ts';
import { host } from '../../shared/host.ts';
import { planDrop, type IssueInput, type TeamChoice } from '../../shared/moves.ts';
import { updateIssue, writeErrorText } from '../../shared/writes.ts';
import { CreateIssueDialog } from './create-issue.tsx';
import { DeleteIssueDialog } from './delete-issue.tsx';
import { IssueMenu } from './issue-menu.tsx';
import { TeamMoveDialog } from './team-move.tsx';
import {
  openIssueFor, PlaceKey, saveOptions, saveTab, saveUserDefaults, savedOptionsFor, tabFor, userDefaults,
} from '../view-state.ts';
import { Board } from './board.tsx';
import { GroupIcon } from './group-icon.tsx';
import { usePaneIssue } from '../issue-pane.tsx';
import { IssueRow } from './issue-row.tsx';
import { OptionsPanel } from './options-panel.tsx';
import { ViewsBar } from './views-bar.tsx';

const typing = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));

type Props = {
  ctx: HostReadyContext;
  /** Names this list in the folder's saved state: its open issue, mode and view options. */
  listKey: string;
  /** The server scope; null shows an empty state instead of loading. */
  scope: Filter | null;
  /** The same scope reaching into sub-teams. Given where a team is in scope, so the option shows. */
  subTeamScope?: Filter | null;
  /** The teams the scope covers, so their states, people and labels can fill empty groups. */
  teamIds?: string[];
  viewerId: string;
  /** Show each issue's project (off when the list is one project). */
  showProject?: boolean;
  /** `open` hides finished issues (with a switch for recent ones); `all` loads every state, as a cycle needs. */
  states?: 'open' | 'all';
  /** Whether the list or the board shows first; the user's last choice for this list wins. */
  defaultMode?: Mode;
  /** The team whose saved views to offer above the list. Left out where views do not apply. */
  viewTeamId?: string | null;
  /** The project new issues go to by default, for a project's list. */
  projectId?: string | null;
  /** Where the list is, for the open issue's crumb: a team, a project, a cycle. */
  origin?: string;
  /** A project's milestones, for the milestone filter. With one picked the list shows its issues in every state. */
  milestones?: { id: string; name: string }[];
  milestone?: string | null;
  onMilestone?: (id: string | null) => void;
  emptyTitle: string;
  emptyBody: string;
  /** Inside a card of its own already (a project's section): no second card around the list. */
  plain?: boolean;
};

export const IssueBrowser = ({ ctx, listKey, scope: baseScope, subTeamScope = null, teamIds: scopeTeamIds = [], viewerId, showProject = true, states = 'open', defaultMode = 'list', viewTeamId = null, projectId = null, milestones = [], milestone = null, onMilestone, origin = 'Issues', emptyTitle, emptyBody, plain = false }: Props) => {
  const placeKey = useContext(PlaceKey);
  const workspace = useWorkspace();
  const statesByTeam = workspace.data?.statesByTeam;

  // View options: factory, then the user's default, then this list's own changes, per mode.
  const [shape, setShape] = useState(() => {
    const saved = savedOptionsFor(placeKey, listKey);
    const mode = saved?.mode ?? defaultMode;
    return { mode, options: resolveOptions(mode, userDefaults(mode), saved?.[mode]) };
  });
  const { mode, options } = shape;
  const scope = baseScope && options.showSubTeams && subTeamScope ? subTeamScope : baseScope;
  const remember = (nextMode: Mode, next: ViewOptions) => {
    const current = savedOptionsFor(placeKey, listKey);
    const diff = changedOptions(resolveOptions(nextMode, userDefaults(nextMode)), next);
    saveOptions(placeKey, listKey, { mode: nextMode, list: nextMode === 'list' ? diff : current?.list, board: nextMode === 'board' ? diff : current?.board });
  };
  const change = (patch: Partial<ViewOptions>) => {
    const next = { ...options, ...patch };
    setShape({ mode, options: next });
    remember(mode, next);
  };
  const setMode = (nextMode: Mode) => {
    const saved = savedOptionsFor(placeKey, listKey);
    const next = resolveOptions(nextMode, userDefaults(nextMode), saved?.[nextMode]);
    setShape({ mode: nextMode, options: next });
    saveOptions(placeKey, listKey, { ...saved, mode: nextMode });
  };
  const reset = () => {
    const base = resolveOptions(mode, userDefaults(mode));
    setShape({ mode, options: base });
    remember(mode, base);
  };
  const setDefault = () => saveUserDefaults(mode, changedOptions(resolveOptions(mode), options));

  const [search, setSearch] = useState('');
  const [assignee, setAssignee] = useState('any');
  const [priority, setPriority] = useState('any');
  const [label, setLabel] = useState('any');
  const [status, setStatus] = useState<'any' | StateType>('any');
  const [showClosed, setShowClosed] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [moving, setMoving] = useState<{ issue: Issue; choices: TeamChoice[]; extra: IssueInput } | null>(null);
  // The right-click menu, by key so it shows each change as it saves; and the issue waiting for Delete's confirm.
  const [menu, setMenu] = useState<{ identifier: string; x: number; y: number } | null>(null);
  const [deleting, setDeleting] = useState<Issue | null>(null);
  // The open issue is drawn by the shell's pane, the same from every view (src/app/issue-pane.tsx).
  const [openId, setOpenId] = usePaneIssue(placeKey, listKey, origin);
  const [cursorId, setCursorId] = useState<string | null>(() => openIssueFor(placeKey, listKey));
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!openId && cursorId) root.current?.querySelector(`[data-issue="${cursorId}"]`)?.scrollIntoView({ block: 'center' });
  }, [openId]);

  // Saved views: Linear's three fixed tabs, then the team's own.
  const customViews = useCustomViews(viewTeamId);
  const custom = customViews.data ?? [];
  const [viewChoice, setViewChoice] = useState<string>(() => tabFor(placeKey, `view:${listKey}`) ?? 'all');
  const isBuiltin = BUILTIN_VIEWS.some((v) => v.id === viewChoice);
  const customActive = Boolean(viewTeamId) && !isBuiltin && (customViews.loading || custom.some((v) => v.id === viewChoice));
  const viewId = !viewTeamId || (!isBuiltin && !customActive) ? 'all' : viewChoice;
  const selectView = (id: string) => { setViewChoice(id); saveTab(placeKey, `view:${listKey}`, id); };

  const builtin = BUILTIN_VIEWS.find((v) => v.id === viewId)?.filter ?? null;
  const inMilestone = milestone && milestones.some((m) => m.id === milestone) ? milestone : null;
  const standard = scope && !customActive
    ? all(states === 'all' || inMilestone ? null : openOrRecent(showClosed), builtin, scope, inMilestone ? milestoneFilter(inMilestone) : null)
    : null;
  const standardList = useIssueList(standard);
  const viewList = useViewIssueList(customActive ? viewId : null, customActive ? scope : null);
  const list = customActive ? viewList : standardList;
  const loaded = list.data?.issues ?? [];
  const loadedIds = useMemo(() => loaded.map((i) => i.id), [loaded]);
  const childCounts = useChildCounts(loadedIds);
  // Costlier properties are fetched only while one of them is on.
  const extras = useIssueExtras(loadedIds, options.properties.some((p) => EXTRA_PROPERTIES.includes(p)));
  // "Show all" nesting also lists sub-issues the view itself left out.
  const parentIds = useMemo(() => loaded.filter((i) => (childCounts.data?.get(i.id)?.total ?? 0) > 0).map((i) => i.id), [loaded, childCounts.data]);
  const childIssues = useChildIssues(parentIds, mode === 'list' && options.nested === 'all');
  const extraChildren = useMemo(() => {
    const have = new Set(loadedIds);
    const map = new Map<string, Issue[]>();
    for (const [parent, children] of childIssues.data ?? []) map.set(parent, children.filter((c) => !have.has(c.id)));
    return map;
  }, [childIssues.data, loadedIds]);

  const people = useMemo(() => {
    const map = new Map<string, string>();
    for (const issue of loaded) if (issue.assignee) map.set(issue.assignee.id, issue.assignee.name);
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [loaded]);
  const labels = useMemo(() => {
    const map = new Map<string, string>();
    for (const issue of loaded) for (const l of issue.labels.nodes) map.set(l.id, l.name);
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1]));
  }, [loaded]);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    const matching = visibleIssues(loaded, options).filter((issue) =>
      (!q || issue.title.toLowerCase().includes(q) || issue.identifier.toLowerCase().includes(q))
      && (assignee === 'any' || (assignee === 'none' ? !issue.assignee : assignee === 'me' ? issue.assignee?.id === viewerId : issue.assignee?.id === assignee))
      && (priority === 'any' || String(issue.priority) === priority)
      && (label === 'any' || issue.labels.nodes.some((l) => l.id === label))
      && (status === 'any' || issue.state.type === status));
    return orderIssues(matching, options);
  }, [loaded, options, search, assignee, priority, label, status, viewerId]);

  const properties = useMemo(() => new Set(options.properties), [options.properties]);
  const hideProject = !showProject || options.grouping === 'project' || options.subGrouping === 'project';
  // Empty groups are made from the teams in scope plus the teams of what loaded, and from the people, labels
  // and projects of those teams where the grouping needs them.
  const teamKey = [...new Set([...scopeTeamIds, ...loaded.map((i) => i.team.id)])].sort().join(',');
  const seedTeams = useMemo(() => (teamKey ? teamKey.split(',') : []), [teamKey]);
  const seedData = useSeedData(options.grouping, seedTeams, options.showEmpty);
  const seeds = useMemo<Seeds | undefined>(
    () => (statesByTeam ? { statesByTeam, teamIds: seedTeams, people: seedData.data?.people, labels: seedData.data?.labels, projects: seedData.data?.projects } : undefined),
    [statesByTeam, seedTeams, seedData.data],
  );
  const seed = options.showEmpty || mode === 'board' ? seeds : undefined;
  const groups = useMemo(() => groupIssues(shown, options.grouping, options.groupOrder, options.showEmpty ? seeds : undefined), [shown, options.grouping, options.groupOrder, options.showEmpty, seeds]);
  const columns = useMemo(() => (mode === 'board' ? groupIssues(shown, options.grouping, options.groupOrder, seed) : []), [mode, shown, options.grouping, options.groupOrder, seed]);
  const split = useMemo(() => splitColumns(columns, options.showEmpty, options.columns), [columns, options.showEmpty, options.columns]);
  const rows = useMemo(() => (mode === 'board' && options.subGrouping !== 'none' ? groupIssues(shown, options.subGrouping, 'asc') : []), [mode, shown, options.subGrouping]);
  const visible = useMemo(
    () => (mode === 'board' ? split.visible.flatMap((c) => c.issues) : groups.flatMap((g) => (collapsed.has(g.key) ? [] : g.issues))),
    [mode, split, groups, collapsed],
  );

  // Keyboard: j and k move, Enter opens, Escape closes, / searches, as in Linear.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === 'Escape') {
        if (openId) setOpenId(null);
        else if (optionsOpen) setOptionsOpen(false);
        return;
      }
      if (typing(event.target) || creating || moving || deleting) return;
      if (event.key === 'c' && !openId) {
        event.preventDefault();
        setCreating(true);
        return;
      }
      if (event.key === '/') {
        event.preventDefault();
        root.current?.querySelector<HTMLInputElement>('.lin-toolbar input')?.focus();
        return;
      }
      const move = event.key === 'j' || event.key === 'ArrowDown' ? 1 : event.key === 'k' || event.key === 'ArrowUp' ? -1 : 0;
      if (move) {
        event.preventDefault();
        const at = visible.findIndex((i) => i.identifier === cursorId);
        const next = visible[Math.max(0, Math.min(visible.length - 1, at + move))];
        if (next) {
          setCursorId(next.identifier);
          if (openId) setOpenId(next.identifier);
          root.current?.querySelector(`[data-issue="${next.identifier}"]`)?.scrollIntoView({ block: 'nearest' });
        }
        return;
      }
      if (event.key === 'Enter' && cursorId) { event.preventDefault(); setOpenId(cursorId); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, cursorId, openId, optionsOpen, creating, moving, deleting]);

  const wide = ctx.surface === 'page';
  const activeFilters = [assignee !== 'any', priority !== 'any', label !== 'any', status !== 'any', states === 'open' && !customActive && showClosed, Boolean(inMilestone)].filter(Boolean).length;
  const open = (issue: Issue) => { setOpenId(issue.identifier); setCursorId(issue.identifier); };
  const toggleGroup = (key: string) => setCollapsed((set) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  const drop = (issueId: string, columnKey: string, rowKey: string | null) => {
    const issue = loaded.find((i) => i.id === issueId);
    const column = columns.find((c) => c.key === columnKey);
    if (!issue || !column || !statesByTeam) return;
    const plan = planDrop(issue, column, rowKey ? rows.find((r) => r.key === rowKey) ?? null : null, statesByTeam, seedTeams);
    if (plan.kind === 'update') void updateIssue(issue, plan.change).catch((error: unknown) => toast(host, 'error', writeErrorText(error)));
    if (plan.kind === 'team') setMoving({ issue, choices: plan.choices, extra: plan.extra.input });
    if (plan.kind === 'refused') void toast(host, 'info', plan.reason);
  };
  const findIssue = (identifier: string): Issue | undefined =>
    loaded.find((i) => i.identifier === identifier) ?? [...extraChildren.values()].flat().find((i) => i.identifier === identifier);
  const onContextMenu = (event: MouseEvent) => {
    const identifier = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-issue]')?.dataset.issue;
    const issue = identifier ? findIssue(identifier) : undefined;
    if (!issue) return;
    event.preventDefault();
    setCursorId(issue.identifier);
    setMenu({ identifier: issue.identifier, x: event.clientX, y: event.clientY });
  };
  const menuIssue = menu ? findIssue(menu.identifier) : undefined;

  const dialogs = (
    <>
      {menu && menuIssue && (
        <IssueMenu
          issue={menuIssue}
          x={menu.x}
          y={menu.y}
          onClose={() => setMenu(null)}
          onOpen={open}
          onDelete={setDeleting}
        />
      )}
      {deleting && (
        <DeleteIssueDialog
          issue={deleting}
          onClose={() => setDeleting(null)}
          onDeleted={() => { if (openId === deleting.identifier) setOpenId(null); setDeleting(null); }}
        />
      )}
      {creating && (
        <CreateIssueDialog
          teamIds={seedTeams}
          projectId={projectId}
          onClose={() => setCreating(false)}
          onCreated={(issue) => { setCreating(false); open(issue); }}
        />
      )}
      {moving && (
        <TeamMoveDialog
          issue={moving.issue}
          choices={moving.choices}
          extra={moving.extra}
          subIssues={childCounts.data?.get(moving.issue.id)?.total ?? 0}
          onClose={() => setMoving(null)}
          onMoved={(issue) => { setMoving(null); setCursorId(issue.identifier); }}
        />
      )}
    </>
  );

  if (!scope) return <Empty title={emptyTitle} body={emptyBody} />;

  const error = list.error instanceof LinearError ? list.error : list.error ? new LinearError('network', String(list.error)) : null;

  const rowsOf = (issues: Issue[]) => nestIssues(issues, options.nested, shown, extraChildren).map(({ issue, depth }) => (
    <IssueRow
      key={issue.id}
      issue={issue}
      depth={depth}
      selected={issue.identifier === openId}
      cursor={issue.identifier === cursorId}
      properties={properties}
      hideProject={hideProject}
      subIssues={childCounts.data?.get(issue.id)}
      extras={extras.data?.get(issue.id)}
      onOpen={open}
    />
  ));

  return (
    <div ref={root} class={plain ? 'lin-browser lin-browser--plain' : 'lin-browser'} onContextMenu={onContextMenu}>
      <div class="lin-stack lin-issue-pane">
        {viewTeamId && <ViewsBar active={viewId} custom={custom} onSelect={selectView} />}
        <div class="lin-toolbar-wrap">
        <div class="lin-toolbar">
          <Tabs items={[{ id: 'list', label: 'List' }, { id: 'board', label: 'Board' }]} activeId={mode} onChange={(id) => setMode(id as Mode)} />
          <div class="lin-toolbar-search"><SearchField value={search} placeholder="Filter by title or key" onChange={setSearch} /></div>
          {!wide && (
            <Button
              label={filtersOpen ? 'Hide filters' : activeFilters ? `Filters (${activeFilters})` : 'Filters'}
              variant="outline"
              size="sm"
              onClick={() => setFiltersOpen((o) => !o)}
            />
          )}
          <Button label="Options" variant={optionsOpen ? 'secondary' : 'outline'} size="sm" onClick={() => setOptionsOpen((o) => !o)} />
          <Button label={wide ? 'New issue' : 'New'} size="sm" onClick={() => setCreating(true)} />
        </div>
        {optionsOpen && (
          <OptionsPanel
            mode={mode}
            options={options}
            hasSubTeams={Boolean(subTeamScope)}
            onMode={setMode}
            onChange={change}
            onReset={reset}
            onSetDefault={setDefault}
            onClose={() => setOptionsOpen(false)}
          />
        )}
        </div>
        {(wide || filtersOpen) && (
          <div class="lin-toolbar">
            <Select value={assignee} onChange={setAssignee} searchable={people.length > 8} options={[
              { id: 'any', label: 'Anyone' }, { id: 'me', label: 'Assigned to me' }, { id: 'none', label: 'No assignee' },
              ...people.map(([id, name]) => ({ id, label: name })),
            ]} />
            <Select value={status} onChange={(v) => setStatus(v as typeof status)} options={[
              { id: 'any', label: 'Any status' }, { id: 'triage', label: 'Triage' }, { id: 'started', label: 'Started' },
              { id: 'unstarted', label: 'Not started' }, { id: 'backlog', label: 'Backlog' },
              ...(showClosed || states === 'all' || customActive || inMilestone ? [{ id: 'completed', label: 'Done' }, { id: 'canceled', label: 'Canceled' }] : []),
            ]} />
            <Select value={priority} onChange={setPriority} options={[
              { id: 'any', label: 'Any priority' }, ...[1, 2, 3, 4, 0].map((p) => ({ id: String(p), label: PRIORITY_NAMES[p]! })),
            ]} />
            {labels.length > 0 && (
              <Select value={label} onChange={setLabel} searchable={labels.length > 8} options={[{ id: 'any', label: 'Any label' }, ...labels.map(([id, name]) => ({ id, label: name }))]} />
            )}
            {milestones.length > 0 && onMilestone && !customActive && (
              <Select value={inMilestone ?? 'any'} onChange={(id) => onMilestone(id === 'any' ? null : id)} searchable={milestones.length > 8} options={[
                { id: 'any', label: 'Any milestone' }, ...milestones.map((m) => ({ id: m.id, label: m.name })),
              ]} />
            )}
            {states === 'open' && !customActive && !inMilestone && <Switch label="Closed, last 2 weeks" checked={showClosed} onChange={setShowClosed} />}
          </div>
        )}

        {error && (
          <Banner tone="error" title="Could not load issues" body={error.kind === 'rate-limited' ? 'Linear is limiting requests. Wait a minute, then retry.' : error.message} action={{ label: 'Retry', onClick: () => list.refresh() }} />
        )}
        {list.loading && !list.data && <div class="lin-center"><Spinner label="Loading issues" /></div>}
        {inMilestone && onMilestone && (
          <div class="lin-milestone-scope sui-small">
            <span>Milestone <strong>{milestones.find((m) => m.id === inMilestone)?.name}</strong>, every status</span>
            <Button label="Show all issues" variant="ghost" size="xs" onClick={() => onMilestone(null)} />
          </div>
        )}
        {list.data && (
          <div class="sui-muted sui-small">
            {shown.length === loaded.length ? `${loaded.length} ${loaded.length === 1 ? 'issue' : 'issues'}` : `${shown.length} of ${loaded.length} issues`}
            {list.data.capped ? '. Showing the first 500; narrow the view to see the rest.' : ''}
          </div>
        )}
        {list.data && !loaded.length && <Empty title={emptyTitle} body={emptyBody} />}
        {list.data && loaded.length > 0 && !shown.length && (
          <Empty title="No issue matches these filters" body="Clear a filter or change the view options." />
        )}

        {mode === 'board' && list.data && shown.length > 0 && (
          <Board
            columns={split.visible}
            hidden={split.hidden}
            rows={rows}
            properties={properties}
            openId={openId}
            cursorId={cursorId}
            hideProject={hideProject}
            childCounts={childCounts.data}
            extras={extras.data}
            onOpen={open}
            onHide={(key) => change({ columns: { ...options.columns, [key]: 'hide' } })}
            onShow={(key) => change({ columns: { ...options.columns, [key]: 'show' } })}
            onDrop={drop}
          />
        )}
        {mode === 'list' && (
          <div class="lin-groups" role="list">
            {groups.map((group) => {
              // Where every issue of a group nests under a parent in another group, the group has nothing of its own to show.
              if (options.subGrouping === 'none' && group.issues.length > 0 && !options.showEmpty && nestIssues(group.issues, options.nested, shown, extraChildren).length === 0) return null;
              return (
              <section class="lin-group" key={group.key}>
                <button type="button" class="lin-group-header" aria-expanded={collapsed.has(group.key) ? 'false' : 'true'} onClick={() => toggleGroup(group.key)}>
                  <span class="lin-chevron" aria-hidden="true">{collapsed.has(group.key) ? '›' : '⌄'}</span>
                  <GroupIcon group={group} />
                  <span>{group.title}</span>
                  <span class="sui-muted">{group.issues.length}</span>
                </button>
                {!collapsed.has(group.key) && (options.subGrouping === 'none'
                  ? rowsOf(group.issues)
                  : groupIssues(group.issues, options.subGrouping, 'asc').map((sub) => {
                    const subKey = `${group.key}>${sub.key}`;
                    const folded = collapsed.has(subKey);
                    return (
                      <div class="lin-subgroup" key={sub.key}>
                        <button type="button" class="lin-subgroup-header" aria-expanded={folded ? 'false' : 'true'} onClick={() => toggleGroup(subKey)}>
                          <span class="lin-chevron" aria-hidden="true">{folded ? '›' : '⌄'}</span>
                          <GroupIcon group={sub} />
                          <span>{sub.title}</span>
                          <span class="sui-muted">{sub.issues.length}</span>
                          <span class="lin-subgroup-rule" aria-hidden="true" />
                        </button>
                        {!folded && rowsOf(sub.issues)}
                      </div>
                    );
                  }))}
              </section>
              );
            })}
          </div>
        )}
      </div>
      {dialogs}
    </div>
  );
};

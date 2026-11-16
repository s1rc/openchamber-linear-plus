// The Work Status section: this folder's Linear project, cycle, status counts, your issues and
// finish-comments waiting to be posted. A frame, so it works with the host's Linear connection and
// needs no API key. It runs only while the section is expanded.
import { Chip, Dot } from '@openchamber-ext/shared-ui/preact';
import { toast } from '@openchamber-ext/shared-ui';
import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { invalidate } from '../shared/cache.ts';
import { discardDraft, postDraft, type Draft } from '../shared/drafts.ts';
import { scopeFilter } from '../shared/filters.ts';
import { HEALTH_LABEL, HEALTH_TONE, percent, shortDate } from '../shared/format.ts';
import { StatusGlyph } from '../shared/glyphs.tsx';
import { host, useReady } from '../shared/host.ts';
import { Banner, Button, Progress, Spinner, TextField } from '../shared/kit.tsx';
import { LinearError } from '../shared/linear.ts';
import { openInPanel } from '../shared/open-target.ts';
import { useProjects } from '../shared/projects.ts';
import { cycleLine, countByStatus, limitCounts, sortMine } from '../shared/status.ts';
import type { ProjectSummary, StatusMineIssue, Team } from '../shared/types.ts';
import { entityName, useDetection, type DetectionState } from '../shared/use-detection.ts';
import { loadWorkspace, useWorkspace, type Workspace } from '../shared/workspace.ts';
import { writeErrorText } from '../shared/writes.ts';
import { useDrafts, useStatusCounts, useStatusMine } from './data.ts';

const MAX_PROJECT_LINES = 3;
const MAX_CYCLE_LINES = 2;
const REFRESH_ID = 'refresh';

/** Header Refresh, from the host's status controls; each handler is one mounted section. */
const refreshHandlers = new Set<() => void>();
host.onStatusControl((control) => { if (control.id === REFRESH_ID) for (const handler of refreshHandlers) handler(); });

/** The mapped team and project ids the section shows: the saved active one, else the first, as the dashboard does. */
const shownIds = (state: DetectionState): string[] => {
  const ids = [...state.detection.teamIds, ...state.detection.projectIds];
  const active = state.detection.mapping?.activeProjectId ?? ids[0] ?? 'all';
  return active === 'all' || !ids.includes(active) ? ids : [active];
};

const targetText = (project: ProjectSummary): string => (project.targetDate ? `target ${shortDate(project.targetDate)}` : 'no target date');

const ProjectLines = ({ projects }: { projects: ProjectSummary[] }) => {
  if (projects.length === 1) {
    const project = projects[0]!;
    const tone = project.health ? HEALTH_TONE[project.health] : undefined;
    return (
      <div class="lin-status-block">
        <Progress label={project.name} value={project.progress * 100} tone={tone} />
        <div class="sui-row sui-small sui-muted">
          {project.health && <Dot tone={HEALTH_TONE[project.health]} />}
          <span>{[project.health ? HEALTH_LABEL[project.health] : project.status.name, targetText(project)].join(' \u00b7 ')}</span>
        </div>
      </div>
    );
  }
  return (
    <div class="lin-status-block">
      {projects.slice(0, MAX_PROJECT_LINES).map((project) => (
        <div class="lin-status-project" key={project.id} title={`${project.name}: ${project.health ? HEALTH_LABEL[project.health] : project.status.name}, ${targetText(project)}`}>
          <Dot tone={project.health ? HEALTH_TONE[project.health] : 'muted'} />
          <span class="lin-ellipsis sui-grow">{project.name}</span>
          <span class="sui-muted sui-small">{percent(project.progress)}</span>
          <span class="sui-muted sui-small lin-status-date">{project.targetDate ? shortDate(project.targetDate) : ''}</span>
        </div>
      ))}
    </div>
  );
};

/** Teams whose current cycle the section shows: the mapped teams, and the teams of the mapped projects. */
const cycleTeams = (workspace: Workspace, shown: string[], projects: ProjectSummary[]): Team[] => {
  const ids = new Set(shown.filter((id) => workspace.teamsById.has(id)));
  for (const project of projects) for (const team of project.teams.nodes) ids.add(team.id);
  return [...ids].map((id) => workspace.teamsById.get(id)).filter((t): t is Team => Boolean(t?.activeCycle));
};

const MineRow = ({ issue, onOpen }: { issue: StatusMineIssue; onOpen: () => void }) => (
  <div
    class="lin-status-line"
    role="button"
    tabIndex={0}
    data-issue={issue.identifier}
    title={`${issue.identifier} ${issue.title} (${issue.state.name})`}
    onClick={onOpen}
    onKeyDown={(event) => { if (event.key === 'Enter') onOpen(); }}
  >
    <StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} size={13} />
    <span class="sui-mono sui-muted lin-status-key">{issue.identifier}</span>
    <span class="lin-ellipsis sui-grow">{issue.title}</span>
  </div>
);

const DraftRow = ({ draft, onDone }: { draft: Draft; onDone: () => void }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState(draft.body);
  const [busy, setBusy] = useState<'post' | 'discard' | null>(null);

  const post = async () => {
    setBusy('post');
    try {
      await postDraft(draft, body);
      await toast(host, 'success', `Posted the summary on ${draft.identifier}`);
      onDone();
    } catch (error) {
      await toast(host, 'error', `Could not post on ${draft.identifier}: ${writeErrorText(error)}`);
      setBusy(null);
    }
  };
  const discard = async () => {
    setBusy('discard');
    if (await discardDraft(draft)) onDone();
    else {
      await toast(host, 'error', 'Could not discard the draft. Try again.');
      setBusy(null);
    }
  };

  return (
    <div class="lin-status-draft" data-draft={draft.id}>
      <div class="lin-status-line" role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen(!open)} onKeyDown={(event) => { if (event.key === 'Enter') setOpen(!open); }}>
        <span class="lin-ellipsis sui-grow" title={draft.sessionTitle}>Summary ready for <span class="sui-mono lin-status-ref">{draft.identifier}</span></span>
        <span class="lin-status-actions" onClick={(event) => event.stopPropagation()}>
          <Button label="Post" size="xs" loading={busy === 'post'} disabled={busy !== null || !body.trim()} onClick={() => { void post(); }} />
          <Button label="Discard" variant="ghost" size="xs" loading={busy === 'discard'} disabled={busy !== null} onClick={() => { void discard(); }} />
        </span>
      </div>
      {open && <TextField value={body} onChange={setBody} multiline rows={5} disabled={busy !== null} />}
    </div>
  );
};

/** Shown in place of rows: why there is nothing, and what to do. */
const Note = ({ children, action }: { children: string; action?: { label: string; onClick: () => void } }) => (
  <div class="sui-row">
    <span class="sui-muted sui-grow">{children}</span>
    {action && <Button label={action.label} variant="outline" size="xs" onClick={action.onClick} />}
  </div>
);

const Rows = ({ directory, workspace, state }: { directory: string; workspace: Workspace; state: DetectionState }) => {
  const shown = shownIds(state);
  const teamIds = shown.filter((id) => workspace.teamsById.has(id));
  const projectIds = shown.filter((id) => !workspace.teamsById.has(id));
  const scope = scopeFilter(teamIds, projectIds);
  const projects = useProjects(projectIds);
  const counts = useStatusCounts(scope);
  const mine = useStatusMine(scope);
  const drafts = useDrafts(directory);
  const [handled, setHandled] = useState<ReadonlySet<string>>(new Set());
  const placeKey = state.place?.key ?? '';

  const cycles = cycleTeams(workspace, shown, projects.data ?? []).slice(0, MAX_CYCLE_LINES);
  const chips = useMemo(() => limitCounts(countByStatus(counts.data?.nodes ?? [])), [counts.data]);
  const mineRows = useMemo(() => sortMine(mine.data?.issues ?? []), [mine.data]);
  const waiting = (drafts.data ?? []).filter((d) => !handled.has(d.id));

  const open = async (identifier: string) => {
    if (!(await openInPanel({ placeKey, issue: identifier }))) await toast(host, 'info', `Open the Linear panel to see ${identifier}.`);
  };

  const loading = (projectIds.length > 0 && projects.loading && !projects.data) || (counts.loading && !counts.data) || (mine.loading && !mine.data);
  const failed = [projects.error, counts.error, mine.error].find((e) => e !== undefined && e !== null);
  const rows = [
    projects.data?.length ? 'project' : '', cycles.length ? 'cycle' : '', chips.shown.length ? 'chips' : '', mineRows.length ? 'mine' : '', waiting.length ? 'drafts' : '',
  ].filter(Boolean);

  return (
    <>
      {state.detection.inferred && (
        <div class="lin-status-hint sui-small">
          <span class="sui-muted sui-grow lin-ellipsis" title={`Detected from ${state.detection.evidence}`}>
            {entityNames(workspace, state)} (detected from {state.detection.evidence})
          </span>
          <Button label="Pin" variant="outline" size="xs" onClick={() => { void state.pin(); }} />
        </div>
      )}
      {projects.data?.length ? <ProjectLines projects={projects.data} /> : null}
      {cycles.map((team) => (
        <div class="sui-small" key={team.id}>{cycleLine(team.activeCycle!, cycles.length > 1 ? team.key : null)}</div>
      ))}
      {chips.shown.length > 0 && (
        <div class="sui-row">
          {chips.shown.map((c) => (
            <Chip key={c.key}>
              <StatusGlyph type={c.type} color={c.color} teamId={c.teamId} stateId={c.stateId} size={12} />
              {c.count} {c.name}
            </Chip>
          ))}
          {chips.hidden.length > 0 && (
            <span class="sui-muted sui-small" title={chips.hidden.map((c) => `${c.count} ${c.name}`).join(', ')}>+{chips.hidden.length} more</span>
          )}
          {counts.data?.capped && <span class="sui-muted sui-small">counted the first {counts.data.nodes.length.toLocaleString('en-US')}</span>}
        </div>
      )}
      {mineRows.length > 0 && (
        <div class="lin-status-block">
          <div class="lin-subheading">My issues{mine.data?.more ? ' (first 50)' : ''}</div>
          {mineRows.map((issue) => (
            <MineRow key={issue.id} issue={issue} onOpen={() => { void open(issue.identifier); }} />
          ))}
        </div>
      )}
      {waiting.map((draft) => (
        <DraftRow
          key={draft.id}
          draft={draft}
          onDone={() => { setHandled((set) => new Set(set).add(draft.id)); drafts.refresh(); }}
        />
      ))}
      {loading && !rows.length && <Spinner size="sm" label="Loading Linear" />}
      {failed !== undefined && !rows.length && <ErrorNote error={failed} />}
      {!loading && failed === undefined && !rows.length && <Note>Nothing open for this folder in Linear.</Note>}
    </>
  );
};

const entityNames = (workspace: Workspace, state: DetectionState) =>
  [...state.detection.teamIds, ...state.detection.projectIds].map((id) => entityName(workspace, id)).join(', ');

const ErrorNote = ({ error }: { error: unknown }) => (
  <Banner tone="error" title="Could not load Linear" body={error instanceof Error ? error.message : String(error)} />
);

export const StatusSection = () => {
  const ctx = useReady();
  const workspace = useWorkspace();
  const directory = ctx?.directory ?? null;
  const state = useDetection(directory, workspace.data);
  const root = useRef<HTMLDivElement>(null);
  const [controlsOk, setControlsOk] = useState(false);

  // The frame is as tall as its content (the host clamps it to 24 to 320).
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new ResizeObserver(() => { void host.setHeight(Math.ceil(node.getBoundingClientRect().height)).catch(() => undefined); });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const refresh = useCallback(() => {
    invalidate('');
    void loadWorkspace(true).catch(() => undefined);
    state.refresh();
  }, [state.refresh]);

  // Refresh in the section header where the host draws controls, else a button in the body.
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;
  useEffect(() => {
    const handler = () => refreshRef.current();
    refreshHandlers.add(handler);
    return () => { refreshHandlers.delete(handler); };
  }, []);
  useEffect(() => {
    if (!ctx?.features?.statusControls) { setControlsOk(false); return; }
    const publish = () => host.setStatusControls([{ kind: 'button', id: REFRESH_ID, label: 'Refresh' }]).then(() => setControlsOk(true), () => setControlsOk(false));
    void publish();
    // A project change clears the header controls.
    return host.onDirectory(() => { void publish(); });
  }, [ctx?.features?.statusControls]);

  // Linear changes under you: reload what is shown once a minute while the section is visible.
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      invalidate('status-');
      invalidate('projects:');
      void loadWorkspace(true).catch(() => undefined);
    }, 60_000);
    return () => clearInterval(timer);
  }, []);

  const body = (() => {
    if (!ctx) return <Spinner size="sm" label="Loading" />;
    if (!directory) return <Note>Open a project to see its Linear work.</Note>;
    if (workspace.error && !workspace.data) {
      const error = workspace.error instanceof LinearError ? workspace.error : new LinearError('network', String(workspace.error));
      return error.kind === 'disconnected'
        ? <Note action={{ label: 'Connect', onClick: () => { void host.oauthStart(); } }}>Linear is not connected.</Note>
        : <Banner tone="error" title="Could not load Linear" body={error.message} action={{ label: 'Retry', onClick: () => workspace.refresh() }} />;
    }
    if (!workspace.data || !state.settled) return <Spinner size="sm" label="Loading Linear" />;
    if (!state.mapped) {
      return <Note action={{ label: 'Pick', onClick: () => { void openPicker(state.place?.key ?? ''); } }}>Pick a Linear project</Note>;
    }
    return <Rows directory={directory} workspace={workspace.data} state={state} />;
  })();

  return (
    <div class="lin-status" ref={root}>
      {body}
      {!controlsOk && ctx && directory && state.settled && (
        <div class="lin-status-refresh"><Button label="Refresh" variant="ghost" size="xs" onClick={refresh} /></div>
      )}
    </div>
  );
};

const openPicker = async (placeKey: string) => {
  if (!(await openInPanel({ placeKey, view: 'picker' }))) await toast(host, 'info', 'Open the Linear panel to pick a project.');
};

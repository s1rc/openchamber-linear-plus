// A project's full overview: progress, health, milestones, updates, description and documents,
// with its issues on a second tab.
import type { HostReadyContext } from '@openchamber/sdk';
import { Cards, Dot, Section, StatCard } from '@openchamber-ext/shared-ui/preact';
import { useContext, useEffect, useMemo, useState } from 'preact/hooks';
import { PlaceKey, saveFilters, saveTab, savedFiltersFor, tabFor } from '../view-state.ts';
import { useQuery } from '../../shared/cache.ts';
import { all, OPEN, scopeFilter } from '../../shared/filters.ts';
import { daysUntil, HEALTH_LABEL, HEALTH_TONE, percent, relativeTime, shortDate } from '../../shared/format.ts';
import { Avatar, MilestoneGlyph } from '../../shared/glyphs.tsx';
import { host } from '../../shared/host.ts';
import { copyText, IconButton, LinkIcon } from '../../shared/icon-buttons.tsx';
import { useIssueList } from '../../shared/issues.ts';
import { toast } from '@openchamber-ext/shared-ui';
import { Badge, Banner, Button, Menu, Progress, Select, Spinner, Tabs, TextField } from '../../shared/kit.tsx';
import { projectContext } from '../../shared/attach-text.ts';
import { postProjectUpdate, writeErrorText, type Health } from '../../shared/writes.ts';
import { gql } from '../../shared/linear.ts';
import { Markdown } from '../../shared/markdown.tsx';
import { projectPush, pushSnapshot } from '../../shared/snapshot.ts';
import { MILESTONE_ISSUES, PROJECT_ACTIVITY, PROJECT_DETAIL } from '../../shared/queries.ts';
import { issueCountText, milestoneCounts, milestoneDone, milestoneFraction } from '../../shared/milestones.ts';
import type { MilestoneIssuesResult, ProjectActivityResult, ProjectDetail as Detail, ProjectDetailResult, StateType } from '../../shared/types.ts';
import { projectBurnupOf, projectRange } from '../../shared/burnup.ts';
import { describeProjectEvent, projectEvents } from '../../shared/activity.ts';
import { useUsers } from '../../shared/team-data.ts';
import { BurnupChart } from '../components/burnup-chart.tsx';
import { IssueBrowser } from '../components/issue-browser.tsx';
import { MarkdownField } from '../components/markdown-field.tsx';
import {
  MilestoneForm, ProjectDatesEdit, ProjectLeadEdit, ProjectMembersEdit, ProjectPriorityEdit, ProjectStatusEdit, ProjectSummaryEdit,
  ProjectTeamsEdit, ProjectTitleEdit, saveProject,
} from '../components/project-editors.tsx';

const TYPE_TONE: Record<StateType, 'info' | 'muted' | 'warning' | 'success'> = {
  triage: 'warning', started: 'info', unstarted: 'muted', backlog: 'muted', completed: 'success', canceled: 'muted', duplicate: 'muted',
};
const TYPE_WORD: Record<StateType, string> = {
  triage: 'triage', started: 'started', unstarted: 'not started', backlog: 'backlog', completed: 'done', canceled: 'canceled', duplicate: 'duplicate',
};

const useProjectDetail = (id: string) =>
  useQuery(`project:${id}`, async () => (await gql<ProjectDetailResult>(PROJECT_DETAIL, { id })).project);

/** The project's issues with their timestamps, for milestone counts and the burn-up. Pages of 250
 * (at most 1,000, then the counts are a floor). */
const useProjectTimeline = (projectId: string) =>
  useQuery(`milestone-counts:${projectId}`, async () => {
    const nodes: MilestoneIssuesResult['issues']['nodes'] = [];
    let after: string | null = null;
    for (let page = 0; page < 4; page += 1) {
      const data: MilestoneIssuesResult = await gql<MilestoneIssuesResult>(MILESTONE_ISSUES, { projectId, after });
      nodes.push(...data.issues.nodes);
      if (!data.issues.pageInfo.hasNextPage) break;
      after = data.issues.pageInfo.endCursor;
    }
    return nodes;
  });

const HEALTHS: { id: Health; label: string }[] = [{ id: 'onTrack', label: 'On track' }, { id: 'atRisk', label: 'At risk' }, { id: 'offTrack', label: 'Off track' }];

/** Post update, as in Linear: health and a markdown body. Starts from the last update's health. */
const UpdateComposer = ({ project }: { project: Detail }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [health, setHealth] = useState<Health>(project.health ?? 'onTrack');
  const [busy, setBusy] = useState(false);
  if (!open) return <div><Button label="Post Update" variant="outline" size="xs" onClick={() => setOpen(true)} /></div>;
  const post = async () => {
    if (!body.trim() || busy) return;
    setBusy(true);
    try {
      await postProjectUpdate(project.id, body.trim(), health);
      await toast(host, 'success', `Posted an update to ${project.name}`);
      setBody('');
      setOpen(false);
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div class="lin-composer" onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void post(); }}>
      <Select value={health} options={HEALTHS} onChange={(id) => setHealth(id as Health)} />
      <TextField value={body} onChange={setBody} multiline rows={5} placeholder="What changed since the last update? Markdown works. Cmd+Enter posts." disabled={busy} />
      <div class="sui-row">
        <span class="sui-grow" />
        <Button label="Cancel" variant="ghost" size="xs" disabled={busy} onClick={() => setOpen(false)} />
        <Button label={busy ? 'Posting...' : 'Post Update'} size="xs" disabled={busy || !body.trim()} onClick={() => { void post(); }} />
      </div>
    </div>
  );
};

/** The project's changes, as Linear's Activity panel lists them: who did what, and when. */
const ProjectActivity = ({ project }: { project: Detail }) => {
  const activity = useQuery(`project-activity:${project.id}`, async () => (await gql<ProjectActivityResult>(PROJECT_ACTIVITY, { id: project.id })).project.history.nodes);
  const events = useMemo(() => projectEvents(activity.data ?? []).slice(0, 8), [activity.data]);
  const actorIds = [...new Set(events.map((e) => e.actorId).filter((id): id is string => Boolean(id)))];
  const users = useUsers(actorIds);
  // A workspace without project history just skips the panel.
  if (activity.error || (!activity.data && !activity.loading)) return null;
  if (!activity.data) return null;
  const nameOf = (id: string) => users.data?.get(id)?.name;
  return (
    <section class="sui-section lin-project-panel">
      <h3 class="sui-section-title">Activity</h3>
      {!events.length && <span class="sui-muted sui-small">No activity yet.</span>}
      {events.map((event) => {
        const actor = event.actorId ? users.data?.get(event.actorId) : undefined;
        return (
          <div class="lin-activity-row sui-small" key={event.id}>
            {actor ? <Avatar name={actor.name} url={actor.avatarUrl} size={16} /> : <span class="lin-avatar-empty lin-avatar-empty--sm" />}
            <span class="lin-activity-text">
              {actor && <strong>{actor.name} </strong>}
              {describeProjectEvent(event, nameOf)}
              <span class="sui-muted"> · {relativeTime(new Date(event.at).toISOString())}</span>
            </span>
          </div>
        );
      })}
    </section>
  );
};

const Overview = ({ project, onMilestone }: { project: Detail; onMilestone?: (id: string) => void }) => {
  const open = useIssueList(all(OPEN, scopeFilter([], [project.id])));
  const days = daysUntil(project.targetDate);
  const counts = new Map<StateType, number>();
  for (const issue of open.data?.issues ?? []) counts.set(issue.state.type, (counts.get(issue.state.type) ?? 0) + 1);
  const milestones = [...project.projectMilestones.nodes].sort((a, b) => a.sortOrder - b.sortOrder);
  const timeline = useProjectTimeline(project.id);
  const perMilestone = useMemo(() => milestoneCounts(timeline.data ?? []), [timeline.data]);
  const burnup = useMemo(() => projectBurnupOf(project, timeline.data ?? []), [project, timeline.data]);
  const range = useMemo(() => projectRange(project, timeline.data ?? []), [project, timeline.data]);
  // The milestone being edited, or `new` for the add form.
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <div class="lin-project-view">
    <div class="lin-project-grid">
      <div class="lin-stack">
      <Progress value={project.progress * 100} label={`${percent(project.progress)} complete`} />
      <Cards>
        <StatCard
          label="Open issues"
          value={open.data ? (open.data.capped ? '500+' : open.data.issues.length) : '...'}
          breakdown={[...counts.entries()].map(([type, n]) => ({ tone: TYPE_TONE[type], text: `${n} ${TYPE_WORD[type]}` }))}
        />
        <StatCard
          label="Health"
          value={project.health ? HEALTH_LABEL[project.health] : 'No update'}
          breakdown={[{ tone: project.health ? HEALTH_TONE[project.health] : 'muted', text: project.lastUpdate ? `updated ${relativeTime(project.lastUpdate.createdAt)}` : project.status.name }]}
        />
        <StatCard
          label="Target"
          value={project.targetDate ? shortDate(project.targetDate) : 'None'}
          breakdown={days === null ? undefined : [{ tone: days < 0 ? 'error' : days <= 7 ? 'warning' : 'muted', text: days < 0 ? `${-days} days late` : `${days} days left` }]}
        />
        <StatCard label="Milestones" value={`${milestones.filter((m) => milestoneDone(m.progress)).length} of ${milestones.length}`} />
      </Cards>
      <Section title="Latest updates">
        <UpdateComposer project={project} />
        {project.projectUpdates.nodes.length === 0 && <div class="sui-muted sui-small">No project updates yet.</div>}
        {project.projectUpdates.nodes.map((u) => (
          <div class="lin-comment" key={u.id}>
            <div class="sui-row sui-small">
              <Badge label={HEALTH_LABEL[u.health]} tone={HEALTH_TONE[u.health]} />
              <Avatar name={u.user.name} url={u.user.avatarUrl} />
              <strong>{u.user.name}</strong>
              <span class="sui-muted">{relativeTime(u.createdAt)}</span>
            </div>
            <Markdown source={u.body} />
          </div>
        ))}
      </Section>
      <Section title="About">
        <MarkdownField
          value={project.content ?? ''}
          onSave={(content) => saveProject(project, { input: { content }, patch: { content } })}
        />
      </Section>
      {milestones.length > 0 && (
        <Section title="Milestones">
          {milestones.map((m) => {
            const count = issueCountText(perMilestone.get(m.id) ?? (timeline.data ? 0 : undefined));
            const title = `Show the issues in ${m.name}`;
            return (
              <div class="lin-milestone" key={m.id}>
                <div class="lin-milestone-head">
                  {onMilestone
                    ? <button type="button" class="lin-milestone-name lin-milestone-link" title={title} onClick={() => onMilestone(m.id)}>{m.name}</button>
                    : <span class="lin-milestone-name">{m.name}</span>}
                  <span class="sui-grow" />
                  <span class="lin-milestone-stats sui-small sui-muted">
                    {m.targetDate && <span>{shortDate(m.targetDate)}</span>}
                    {m.targetDate && count && <span aria-hidden="true">·</span>}
                    {count && (onMilestone
                      ? <button type="button" class="lin-milestone-count" title={title} onClick={() => onMilestone(m.id)}>{count}</button>
                      : <span>{count}</span>)}
                  </span>
                </div>
                {m.description?.trim() && <div class="lin-milestone-desc sui-small">{m.description.trim()}</div>}
                <Progress value={milestoneFraction(m.progress) * 100} />
              </div>
            );
          })}
        </Section>
      )}
      {project.documents.nodes.length > 0 && (
        <Section title="Documents">
          {project.documents.nodes.map((d) => (
            <div class="sui-row sui-small" key={d.id}>
              <Dot tone="muted" />
              <span class="sui-grow">{d.title}</span>
              <span class="sui-muted">{relativeTime(d.updatedAt)}</span>
              <Button label="Open" variant="ghost" size="xs" onClick={() => { void host.openUrl(d.url); }} />
            </div>
          ))}
        </Section>
      )}
      </div>
      <aside class="lin-project-side">
        <section class="sui-section lin-project-panel">
          <h3 class="sui-section-title">Properties</h3>
          <div class="lin-project-props">
            <span class="sui-muted">Status</span><ProjectStatusEdit project={project} />
            <span class="sui-muted">Priority</span><ProjectPriorityEdit project={project} />
            <span class="sui-muted">Lead</span><ProjectLeadEdit project={project} />
            <span class="sui-muted">Members</span><ProjectMembersEdit project={project} />
            <span class="sui-muted">Dates</span><ProjectDatesEdit project={project} />
            <span class="sui-muted">Teams</span><ProjectTeamsEdit project={project} />
          </div>
        </section>
        <section class="sui-section lin-project-panel">
          <h3 class="sui-section-title">Milestones</h3>
          {milestones.map((m) => {
            if (editing === m.id) return <MilestoneForm key={m.id} project={project} milestone={m} onDone={() => setEditing(null)} />;
            const n = perMilestone.get(m.id) ?? (timeline.data ? 0 : undefined);
            const count = n === undefined ? null : `${percent(milestoneFraction(m.progress))} of ${n}`;
            const title = `Show the issues in ${m.name}`;
            return (
              <div class="lin-milestone-row" key={m.id} title={[m.description?.trim(), m.targetDate ? `Target ${shortDate(m.targetDate)}` : ''].filter(Boolean).join('\n') || undefined}>
                <MilestoneGlyph />
                {onMilestone
                  ? <button type="button" class="lin-milestone-name lin-milestone-link lin-ellipsis" title={title} onClick={() => onMilestone(m.id)}>{m.name}</button>
                  : <span class="lin-milestone-name lin-ellipsis">{m.name}</span>}
                {count && (onMilestone
                  ? <button type="button" class="lin-milestone-count sui-small sui-muted" title={title} onClick={() => onMilestone(m.id)}>{count}</button>
                  : <span class="sui-small sui-muted">{count}</span>)}
                <Button label="Edit" variant="ghost" size="xs" onClick={() => setEditing(m.id)} />
              </div>
            );
          })}
          {!milestones.length && <span class="sui-muted sui-small">No milestones yet.</span>}
          {editing === 'new'
            ? <MilestoneForm project={project} onDone={() => setEditing(null)} />
            : <div><Button label="Add Milestone" variant="ghost" size="xs" onClick={() => setEditing('new')} /></div>}
        </section>
        {burnup && range && (
          <section class="sui-section lin-project-panel">
            <h3 class="sui-section-title">Progress</h3>
            <BurnupChart burnup={burnup} startsAt={new Date(range.start).toISOString()} endsAt={new Date(range.end).toISOString()} />
          </section>
        )}
        <ProjectActivity project={project} />
      </aside>
    </div>
    </div>
  );
};

type Props = { ctx: HostReadyContext; id: string; viewerId: string; withIssues: boolean; onUnavailable?: () => void };

export const ProjectDetail = ({ ctx, id, viewerId, withIssues, onUnavailable }: Props) => {
  const detail = useProjectDetail(id);
  const placeKey = useContext(PlaceKey);
  const tabKey = `project-detail:${id}`;
  const listKey = `project:${id}`;
  const [tab, setTabState] = useState<'overview' | 'issues'>(() => (tabFor(placeKey, tabKey) === 'issues' && withIssues ? 'issues' : 'overview'));
  // A milestone picked on the overview (its name or its issue count): the Issues tab shows only its issues.
  const [milestone, setMilestoneState] = useState<string | null>(() => savedFiltersFor(placeKey, listKey)?.milestone ?? null);
  const setMilestone = (next: string | null) => {
    setMilestoneState(next);
    saveFilters(placeKey, listKey, { milestone: next });
  };
  const setTab = (next: 'overview' | 'issues') => { setTabState(next); saveTab(placeKey, tabKey, next); };
  const project = detail.data;
  // The service keeps this overview and the project's documents for the `@` menu when no API key is set.
  useEffect(() => {
    if (project && ctx.directory) void pushSnapshot(projectPush(ctx.directory, project));
  }, [project, ctx.directory]);
  useEffect(() => {
    if (!project && detail.error) onUnavailable?.();
  }, [detail.error]);
  if (!project) {
    return detail.error ? (
      <Banner tone="error" title="Could not load the project" body={detail.error instanceof Error ? detail.error.message : String(detail.error)} action={{ label: 'Retry', onClick: () => detail.refresh() }} />
    ) : <Spinner label="Loading project" />;
  }
  const chip = {
    providerId: 'linear-dashboard', id: `project:${project.id}`, title: project.name, url: project.url, kind: 'issue' as const,
    text: projectContext(project), data: { kind: 'project', id: project.id },
  };
  const attach = async () => {
    try {
      await host.attach(chip);
      await toast(host, 'success', `Attached ${project.name} to your message`);
    } catch {
      await toast(host, 'error', 'Open a chat to attach the project.');
    }
  };
  const link = async () => {
    try {
      await host.sessionLink(chip);
      await toast(host, 'success', `Linked ${project.name} to this session`);
    } catch {
      await toast(host, 'error', 'Open a session to link the project to it.');
    }
  };
  return (
    <Section>
      <ProjectTitleEdit project={project} />
      <ProjectSummaryEdit project={project} />
      <div class="sui-row">
        {withIssues && <Tabs items={[{ id: 'overview', label: 'Overview' }, { id: 'issues', label: 'Issues' }]} activeId={tab} onChange={(t) => setTab(t as typeof tab)} />}
        <span class="sui-grow" />
        <span class="lin-icon-row lin-icon-row--plain">
          <IconButton label="Copy project link" onClick={() => { void copyText(project.url, 'the project link'); }}><LinkIcon /></IconButton>
        </span>
        <Button label="Attach" variant="outline" size="xs" onClick={() => { void attach(); }} />
        <Menu
          label="More"
          variant="ghost"
          size="xs"
          items={[{ id: 'link', label: 'Link to this session' }, { id: 'open', label: 'Open in Linear' }]}
          onSelect={(what) => {
            if (what === 'link') void link();
            if (what === 'open') void host.openUrl(project.url);
          }}
        />
      </div>
      {tab === 'issues' && withIssues ? (
        <IssueBrowser
          ctx={ctx}
          listKey={listKey}
          origin={project.name}
          scope={scopeFilter([], [project.id])}
          viewerId={viewerId}
          showProject={false}
          projectId={project.id}
          teamIds={project.teams.nodes.map((t) => t.id)}
          milestones={[...project.projectMilestones.nodes].sort((a, b) => a.sortOrder - b.sortOrder)}
          milestone={milestone}
          onMilestone={setMilestone}
          emptyTitle={milestone ? 'No issues in this milestone' : 'No open issues'}
          emptyBody={milestone ? 'Pick another milestone, or Any milestone.' : `${project.name} has no open issues.`}
          plain
        />
      ) : (
        <Overview project={project} onMilestone={withIssues ? (id) => { setMilestone(id); setTab('issues'); } : undefined} />
      )}
    </Section>
  );
};

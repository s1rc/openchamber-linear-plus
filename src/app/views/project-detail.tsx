// A project's full overview: progress, health, milestones, updates, description and documents,
// with its issues on a second tab.
import type { HostReadyContext } from '@openchamber/sdk';
import { Cards, Dot, KV, Section, StatCard } from '@openchamber-ext/shared-ui/preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { PlaceKey, saveTab, tabFor } from '../view-state.ts';
import { useQuery } from '../../shared/cache.ts';
import { all, OPEN, scopeFilter } from '../../shared/filters.ts';
import { daysUntil, HEALTH_LABEL, HEALTH_TONE, percent, relativeTime, shortDate } from '../../shared/format.ts';
import { Avatar } from '../../shared/glyphs.tsx';
import { host } from '../../shared/host.ts';
import { useIssueList } from '../../shared/issues.ts';
import { toast } from '@openchamber-ext/shared-ui';
import { Badge, Banner, Button, Progress, Select, Spinner, Tabs, TextField } from '../../shared/kit.tsx';
import { postProjectUpdate, writeErrorText, type Health } from '../../shared/writes.ts';
import { gql } from '../../shared/linear.ts';
import { Markdown } from '../../shared/markdown.tsx';
import { projectPush, pushSnapshot } from '../../shared/snapshot.ts';
import { MILESTONE_ISSUES, PROJECT_DETAIL } from '../../shared/queries.ts';
import { issueCountText, milestoneCounts } from '../../shared/milestones.ts';
import type { MilestoneIssuesResult, ProjectDetail as Detail, ProjectDetailResult, StateType } from '../../shared/types.ts';
import { IssueBrowser } from '../components/issue-browser.tsx';

const TYPE_TONE: Record<StateType, 'info' | 'muted' | 'warning' | 'success'> = {
  triage: 'warning', started: 'info', unstarted: 'muted', backlog: 'muted', completed: 'success', canceled: 'muted', duplicate: 'muted',
};
const TYPE_WORD: Record<StateType, string> = {
  triage: 'triage', started: 'started', unstarted: 'not started', backlog: 'backlog', completed: 'done', canceled: 'canceled', duplicate: 'duplicate',
};

const useProjectDetail = (id: string) =>
  useQuery(`project:${id}`, async () => (await gql<ProjectDetailResult>(PROJECT_DETAIL, { id })).project);

/** Issues per milestone, read in pages of 250 (at most 1,000, then the counts are a floor). */
const useMilestoneCounts = (projectId: string, enabled: boolean) =>
  useQuery(enabled ? `milestone-counts:${projectId}` : null, async () => {
    const nodes: MilestoneIssuesResult['issues']['nodes'] = [];
    let after: string | null = null;
    for (let page = 0; page < 4; page += 1) {
      const data: MilestoneIssuesResult = await gql<MilestoneIssuesResult>(MILESTONE_ISSUES, { projectId, after });
      nodes.push(...data.issues.nodes);
      if (!data.issues.pageInfo.hasNextPage) break;
      after = data.issues.pageInfo.endCursor;
    }
    return milestoneCounts(nodes);
  });

const HEALTHS: { id: Health; label: string }[] = [{ id: 'onTrack', label: 'On track' }, { id: 'atRisk', label: 'At risk' }, { id: 'offTrack', label: 'Off track' }];

/** Post update, as in Linear: health and a markdown body. Starts from the last update's health. */
const UpdateComposer = ({ project }: { project: Detail }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState('');
  const [health, setHealth] = useState<Health>(project.health ?? 'onTrack');
  const [busy, setBusy] = useState(false);
  if (!open) return <div><Button label="Post update" variant="outline" size="xs" onClick={() => setOpen(true)} /></div>;
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
        <Button label={busy ? 'Posting...' : 'Post update'} size="xs" disabled={busy || !body.trim()} onClick={() => { void post(); }} />
      </div>
    </div>
  );
};

const Overview = ({ project, onMilestone }: { project: Detail; onMilestone?: (id: string) => void }) => {
  const open = useIssueList(all(OPEN, scopeFilter([], [project.id])));
  const days = daysUntil(project.targetDate);
  const counts = new Map<StateType, number>();
  for (const issue of open.data?.issues ?? []) counts.set(issue.state.type, (counts.get(issue.state.type) ?? 0) + 1);
  const milestones = [...project.projectMilestones.nodes].sort((a, b) => a.sortOrder - b.sortOrder);
  const perMilestone = useMilestoneCounts(project.id, milestones.length > 0);

  return (
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
        <StatCard label="Milestones" value={`${milestones.filter((m) => m.progress >= 1).length} of ${milestones.length}`} />
      </Cards>
      <KV items={[
        ['Status', <span class="sui-row"><span class="lin-swatch" style={{ background: project.status.color }} />{project.status.name}</span>],
        ['Lead', project.lead ? <span class="sui-row"><Avatar name={project.lead.name} url={project.lead.avatarUrl} />{project.lead.name}</span> : 'None'],
        ['Members', project.members.nodes.length ? <span class="sui-row">{project.members.nodes.slice(0, 12).map((m) => <Avatar key={m.id} name={m.name} url={m.avatarUrl} />)}{project.members.nodes.length > 12 && <span class="sui-muted sui-small">+{project.members.nodes.length - 12}</span>}</span> : 'None'],
        ['Teams', project.teams.nodes.map((t) => t.key).join(', ') || 'None'],
        ['Dates', `${shortDate(project.startDate) || 'No start'} to ${shortDate(project.targetDate) || 'no target'}`],
      ]} />
      {milestones.length > 0 && (
        <Section title="Milestones">
          {milestones.map((m) => {
            const count = issueCountText(perMilestone.data?.get(m.id) ?? (perMilestone.data ? 0 : undefined));
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
                {/* The kit's bar prints the percent, so the head does not repeat it. */}
                <Progress value={m.progress * 100} />
              </div>
            );
          })}
        </Section>
      )}
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
        <Markdown source={project.content || project.description} empty="No description." />
      </Section>
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
  );
};

type Props = { ctx: HostReadyContext; id: string; viewerId: string; withIssues: boolean };

export const ProjectDetail = ({ ctx, id, viewerId, withIssues }: Props) => {
  const detail = useProjectDetail(id);
  const placeKey = useContext(PlaceKey);
  const tabKey = `project-detail:${id}`;
  const [tab, setTabState] = useState<'overview' | 'issues'>(() => (tabFor(placeKey, tabKey) === 'issues' && withIssues ? 'issues' : 'overview'));
  // A milestone picked on the overview (its name or its issue count): the Issues tab shows only its issues.
  const [milestone, setMilestone] = useState<string | null>(null);
  const setTab = (next: 'overview' | 'issues') => { setTabState(next); saveTab(placeKey, tabKey, next); };
  const project = detail.data;
  // The service keeps this overview and the project's documents for the `@` menu when no API key is set.
  useEffect(() => {
    if (project && ctx.directory) void pushSnapshot(projectPush(ctx.directory, project));
  }, [project, ctx.directory]);
  if (!project) {
    return detail.error ? (
      <Banner tone="error" title="Could not load the project" body={detail.error instanceof Error ? detail.error.message : String(detail.error)} action={{ label: 'Retry', onClick: () => detail.refresh() }} />
    ) : <Spinner label="Loading project" />;
  }
  return (
    <Section title={project.name}>
      <div class="sui-row">
        {withIssues && <Tabs items={[{ id: 'overview', label: 'Overview' }, { id: 'issues', label: 'Issues' }]} activeId={tab} onChange={(t) => setTab(t as typeof tab)} />}
        <span class="sui-grow" />
        <Button label="Open in Linear" variant="ghost" size="xs" onClick={() => { void host.openUrl(project.url); }} />
      </div>
      {tab === 'issues' && withIssues ? (
        <IssueBrowser
          ctx={ctx}
          listKey={`project:${project.id}`}
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
        />
      ) : (
        <Overview project={project} onMilestone={withIssues ? (id) => { setMilestone(id); setTab('issues'); } : undefined} />
      )}
    </Section>
  );
};

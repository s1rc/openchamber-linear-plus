// One issue in Linear's layout: title, description, sub-issues and activity on the left; merge requests,
// properties, labels, project and relations on the right. A narrow frame stacks the side column under
// the title, as Linear does on small screens. Read-only until phase 6.
import { toast } from '@openchamber-ext/shared-ui';
import { Chip } from '@openchamber-ext/shared-ui/preact';
import { useState } from 'preact/hooks';
import { changeOf, estimateLabel, relativeTime, shortDate } from '../../shared/format.ts';
import {
  Avatar, BlockedGlyph, BlockingGlyph, ChangeGlyph, CycleGlyph, EstimateGlyph, PriorityGlyph, ProgressRing, ProjectIcon, StatusGlyph,
} from '../../shared/glyphs.tsx';
import { host } from '../../shared/host.ts';
import { useIssueDetail } from '../../shared/issues.ts';
import { Banner, Button, Menu, Spinner } from '../../shared/kit.tsx';
import { Markdown } from '../../shared/markdown.tsx';
import type { Comment, HistoryEvent, IssueDetail as Detail, RelatedIssue } from '../../shared/types.ts';
import { teamEstimateType } from '../../shared/workspace.ts';
import { IssueRow, LabelChip } from './issue-row.tsx';

const PRIORITY_NAME = ['No priority', 'Urgent', 'High', 'Medium', 'Low'] as const;

const copy = async (text: string, what: string) => {
  try {
    await host.writeClipboard(text);
    await toast(host, 'success', `Copied ${what}`);
  } catch {
    await toast(host, 'error', `Could not copy ${what}`);
  }
};

/** What an agent reads when the issue is attached to a message. */
export const issueContext = (issue: Detail): string => {
  const lines = [
    `${issue.identifier}: ${issue.title}`,
    `Status: ${issue.state.name}. Priority: ${PRIORITY_NAME[issue.priority]}. Team: ${issue.team.name}.`,
    issue.project ? `Project: ${issue.project.name}.` : '',
    issue.assignee ? `Assignee: ${issue.assignee.name}.` : '',
    `Link: ${issue.url}`,
    `Branch: ${issue.branchName}`,
    '',
    issue.description?.trim() ?? '',
  ];
  const comments = issue.comments.nodes.slice(-5).map((c) => `${c.user?.name ?? 'Someone'} (${shortDate(c.createdAt)}): ${c.body}`);
  const text = [...lines, ...(comments.length ? ['', 'Latest comments:', ...comments] : [])].filter((l, i, a) => l || a[i - 1]).join('\n');
  return text.length > 15_000 ? `${text.slice(0, 15_000)}\n[cut]` : text;
};

type Relation = { key: string; issue: RelatedIssue };

/** Relations grouped as Linear's side column shows them. */
const relationGroups = (issue: Detail): [string, Relation[]][] => {
  const groups: Record<string, Relation[]> = { 'Blocked by': [], Blocking: [], Related: [], 'Duplicate of': [], 'Duplicated by': [], Similar: [] };
  for (const r of issue.relations.nodes) {
    const name = r.type === 'blocks' ? 'Blocking' : r.type === 'duplicate' ? 'Duplicate of' : r.type === 'similar' ? 'Similar' : 'Related';
    groups[name]!.push({ key: r.id, issue: r.relatedIssue });
  }
  for (const r of issue.inverseRelations.nodes) {
    const name = r.type === 'blocks' ? 'Blocked by' : r.type === 'duplicate' ? 'Duplicated by' : r.type === 'similar' ? 'Similar' : 'Related';
    groups[name]!.push({ key: `i${r.id}`, issue: r.issue });
  }
  return Object.entries(groups).filter(([, list]) => list.length > 0);
};

/** One history entry in Linear's words, or null for changes it does not show. */
export const describeEvent = (e: HistoryEvent, estimateType: string | undefined): string | null => {
  const parts: string[] = [];
  if (e.toState && e.toState.name !== e.fromState?.name) parts.push(e.fromState ? `changed status from ${e.fromState.name} to ${e.toState.name}` : `set status to ${e.toState.name}`);
  if (e.toAssignee) parts.push(`assigned the issue to ${e.toAssignee.name}`);
  else if (e.fromAssignee) parts.push(`removed assignee ${e.fromAssignee.name}`);
  if (e.addedLabels?.length) parts.push(`added label ${e.addedLabels.map((l) => l.name).join(', ')}`);
  if (e.removedLabels?.length) parts.push(`removed label ${e.removedLabels.map((l) => l.name).join(', ')}`);
  if (e.toPriority !== null && e.toPriority !== e.fromPriority) parts.push(`set priority to ${PRIORITY_NAME[e.toPriority] ?? e.toPriority}`);
  if (e.toCycle) parts.push(`added the issue to cycle ${e.toCycle.number}`);
  else if (e.fromCycle) parts.push(`removed the issue from cycle ${e.fromCycle.number}`);
  if (e.toProject) parts.push(`moved the issue to ${e.toProject.name}`);
  else if (e.fromProject) parts.push(`removed the issue from ${e.fromProject.name}`);
  if (e.toEstimate !== null && e.toEstimate !== e.fromEstimate) parts.push(`set estimate to ${estimateLabel(e.toEstimate, estimateType) ?? e.toEstimate}`);
  if (e.toTitle && e.fromTitle) parts.push('changed the title');
  if (e.toParent) parts.push(`made the issue a sub-issue of ${e.toParent.identifier}`);
  if (e.relationChanges?.length) parts.push(`changed relations with ${e.relationChanges.map((r) => r.identifier).join(', ')}`);
  if (e.updatedDescription) parts.push('updated the description');
  return parts.length ? parts.join(', ') : null;
};

/** A history entry names its status but not its id; look the id up among the team's states. */
const stateIdOf = (issue: Detail, name: string): string | undefined => issue.team.states.nodes.find((s) => s.name === name)?.id;

const SideSection = ({ title, children }: { title: string; children: preact.ComponentChildren }) => (
  <section class="lin-side-section">
    <h3 class="lin-side-title">{title}</h3>
    {children}
  </section>
);

const Property = ({ icon, value, empty }: { icon: preact.ComponentChildren; value: preact.ComponentChildren | null | undefined; empty: string }) => (
  <div class={value ? 'lin-prop' : 'lin-prop lin-prop--empty'}>{icon}<span class="lin-ellipsis">{value || empty}</span></div>
);

const CommentCard = ({ comment, replies, onOpenIssue }: { comment: Comment; replies: Comment[]; onOpenIssue: (id: string) => void }) => {
  const one = (c: Comment, reply: boolean) => (
    <div class={reply ? 'lin-comment-body lin-comment-body--reply' : 'lin-comment-body'} key={c.id}>
      <div class="sui-row sui-small">
        <Avatar name={c.user?.name ?? '?'} url={c.user?.avatarUrl} />
        <strong>{c.user?.name ?? 'Someone'}</strong>
        <span class="sui-muted" title={new Date(c.createdAt).toLocaleString()}>{relativeTime(c.createdAt)}</span>
        {c.editedAt && <span class="sui-muted">(edited)</span>}
      </div>
      <Markdown source={c.body} onOpenIssue={onOpenIssue} />
    </div>
  );
  return <div class="lin-comment-card">{one(comment, false)}{replies.map((r) => one(r, true))}</div>;
};

type Item = { at: string; kind: 'event'; event: HistoryEvent; text: string } | { at: string; kind: 'comment'; comment: Comment; replies: Comment[] } | { at: string; kind: 'created' };

const EVENTS_SHOWN = 3;

const Activity = ({ issue, onOpenIssue }: { issue: Detail; onOpenIssue: (id: string) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const estimateType = teamEstimateType(issue.team.id);
  const replies = new Map<string, Comment[]>();
  for (const c of issue.comments.nodes) if (c.parent) replies.set(c.parent.id, [...(replies.get(c.parent.id) ?? []), c]);
  const events: Item[] = issue.history.nodes
    .map((event) => ({ event, text: describeEvent(event, estimateType) }))
    .filter((e): e is { event: HistoryEvent; text: string } => Boolean(e.text))
    .map(({ event, text }) => ({ at: event.createdAt, kind: 'event' as const, event, text }));
  const comments: Item[] = issue.comments.nodes.filter((c) => !c.parent).map((comment) => ({
    at: comment.createdAt, kind: 'comment' as const, comment,
    replies: (replies.get(comment.id) ?? []).sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
  }));
  const all = [{ at: issue.createdAt, kind: 'created' as const }, ...events, ...comments].sort((a, b) => a.at.localeCompare(b.at));
  // Like Linear, fold a long run of events and always show comments.
  const eventCount = events.length;
  const hidden = !expanded && eventCount > EVENTS_SHOWN ? new Set(events.slice(0, eventCount - EVENTS_SHOWN)) : new Set<Item>();

  return (
    <section class="lin-activity">
      <div class="sui-row">
        <h3 class="lin-activity-title">Activity</h3>
        <span class="sui-grow" />
        {issue.subscribers.nodes.slice(0, 6).map((u) => <span key={u.id} title={`${u.name} is subscribed`}><Avatar name={u.name} url={u.avatarUrl} /></span>)}
      </div>
      <ol class="lin-timeline">
        {hidden.size > 0 && (
          <li class="lin-event">
            <button type="button" class="lin-link sui-small" onClick={() => setExpanded(true)}>Show {hidden.size} earlier {hidden.size === 1 ? 'event' : 'events'}</button>
          </li>
        )}
        {all.filter((item) => !hidden.has(item)).map((item) => {
          if (item.kind === 'created') {
            return (
              <li class="lin-event sui-small" key="created">
                <Avatar name={issue.creator?.name ?? '?'} url={issue.creator?.avatarUrl} size={16} />
                <span><span class="lin-event-actor">{issue.creator?.name ?? 'Someone'}</span> created the issue</span>
                <span class="sui-muted">· {relativeTime(issue.createdAt)}</span>
              </li>
            );
          }
          if (item.kind === 'event') {
            return (
              <li class="lin-event sui-small" key={item.event.id}>
                {item.event.toState ? <StatusGlyph type={item.event.toState.type} color={item.event.toState.color} teamId={issue.team.id} stateId={stateIdOf(issue, item.event.toState.name)} /> : <Avatar name={item.event.actor?.name ?? 'Linear'} url={item.event.actor?.avatarUrl} size={16} />}
                <span><span class="lin-event-actor">{item.event.actor?.name ?? 'Linear'}</span> {item.text}</span>
                <span class="sui-muted">· {relativeTime(item.event.createdAt)}</span>
              </li>
            );
          }
          return <li key={item.comment.id}><CommentCard comment={item.comment} replies={item.replies} onOpenIssue={onOpenIssue} /></li>;
        })}
      </ol>
    </section>
  );
};

/** `stacked`: the view replaces a list in a narrow frame, so Back sits on the left. */
type Props = { id: string; stacked?: boolean; onClose: () => void; onOpenIssue: (identifier: string) => void };

export const IssueDetail = ({ id, stacked, onClose, onOpenIssue }: Props) => {
  const detail = useIssueDetail(id);
  const issue = detail.data;

  if (!issue) {
    return (
      <div class="lin-stack">
        <div class="sui-row"><Button label="Back" variant="ghost" size="xs" onClick={onClose} /></div>
        {detail.error ? (
          <Banner tone="error" title={`Could not load ${id}`} body={detail.error instanceof Error ? detail.error.message : String(detail.error)} action={{ label: 'Retry', onClick: () => detail.refresh() }} />
        ) : (
          <Spinner label={`Loading ${id}`} />
        )}
      </div>
    );
  }

  const attach = async () => {
    try {
      await host.attach({
        providerId: 'linear-dashboard', id: issue.identifier, title: `${issue.identifier} ${issue.title}`, url: issue.url, kind: 'issue',
        text: issueContext(issue), data: { issueId: issue.id, identifier: issue.identifier },
      });
      await toast(host, 'success', `Attached ${issue.identifier} to your message`);
    } catch {
      await toast(host, 'error', 'Open a chat to attach the issue.');
    }
  };

  const changes = issue.links.nodes.map((a) => ({ a, change: changeOf(a) }));
  const diffs = changes.filter((c) => c.change);
  const otherLinks = changes.filter((c) => !c.change);
  const done = issue.children.nodes.filter((c) => ['completed', 'canceled', 'duplicate'].includes(c.state.type)).length;
  const estimate = estimateLabel(issue.estimate, teamEstimateType(issue.team.id));
  const relations = relationGroups(issue);

  return (
    <article class="lin-issue-view">
      <header class="lin-issue-bar">
        <Button label="Back" variant="ghost" size="xs" onClick={onClose} />
        <span class="sui-muted sui-small lin-ellipsis lin-issue-crumb">{issue.team.name} ›</span>
        <span class="sui-mono sui-small lin-nowrap">{issue.identifier}</span>
        <span class="sui-grow" />
        <Button label={stacked ? 'Attach' : 'Attach to message'} variant="outline" size="xs" onClick={() => { void attach(); }} />
        <Menu
          label="Copy"
          variant="ghost"
          size="xs"
          items={[{ id: 'key', label: `Key (${issue.identifier})` }, { id: 'branch', label: 'Branch name' }, { id: 'url', label: 'Link' }]}
          onSelect={(what) => {
            if (what === 'key') void copy(issue.identifier, issue.identifier);
            if (what === 'branch') void copy(issue.branchName, 'the branch name');
            if (what === 'url') void copy(issue.url, 'the link');
          }}
        />
        <Button label={stacked ? 'Open' : 'Open in Linear'} variant="ghost" size="xs" onClick={() => { void host.openUrl(issue.url); }} />
      </header>

      <div class="lin-issue-grid">
        <div class="lin-issue-head">
          {issue.parent && (
            <button type="button" class="lin-link sui-small" onClick={() => onOpenIssue(issue.parent!.identifier)}>Sub-issue of {issue.parent.identifier}</button>
          )}
          <h1 class="lin-issue-heading">{issue.title}</h1>
        </div>

        <aside class="lin-issue-side">
          {diffs.length > 0 && (
            <SideSection title="Diffs">
              {diffs.map(({ a, change }) => (
                <button type="button" class="lin-side-link" key={a.id} title={`${change!.label} ${change!.status ?? ''}`} onClick={() => { void host.openUrl(a.url); }}>
                  <ChangeGlyph status={change!.status} /><span class="lin-ellipsis">{a.title}</span>
                </button>
              ))}
            </SideSection>
          )}
          <SideSection title="Properties">
            <Property icon={<StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} />} value={issue.state.name} empty="Status" />
            <Property icon={<span class="lin-team-dot" />} value={issue.team.name} empty="Team" />
            <Property icon={<PriorityGlyph priority={issue.priority} />} value={issue.priority ? PRIORITY_NAME[issue.priority] : null} empty="Set priority" />
            <Property icon={issue.assignee ? <Avatar name={issue.assignee.name} url={issue.assignee.avatarUrl} size={16} /> : <span class="lin-avatar-empty lin-avatar-empty--sm" />} value={issue.assignee?.name} empty="Assign" />
            <Property icon={<EstimateGlyph />} value={estimate} empty="Set estimate" />
            <Property icon={<CycleGlyph />} value={issue.cycle ? `Cycle ${issue.cycle.number}${issue.cycle.name ? `: ${issue.cycle.name}` : ''}` : null} empty="Add to cycle" />
            {issue.dueDate && <Property icon={<span class="lin-due-dot" />} value={`Due ${shortDate(issue.dueDate)}`} empty="" />}
          </SideSection>
          <SideSection title="Labels">
            {issue.labels.nodes.length ? <div class="sui-row">{issue.labels.nodes.map((l) => <LabelChip key={l.id} label={l} />)}</div> : <div class="lin-prop lin-prop--empty">No labels</div>}
          </SideSection>
          <SideSection title="Project">
            {issue.project ? (
              <>
                <div class="lin-prop"><ProjectIcon icon={issue.project.icon} color={issue.project.color} /><span class="lin-ellipsis">{issue.project.name}</span></div>
                {issue.projectMilestone && <div class="lin-prop lin-prop--sub sui-small">Milestone: {issue.projectMilestone.name}</div>}
              </>
            ) : <div class="lin-prop lin-prop--empty">No project</div>}
          </SideSection>
          {relations.map(([name, list]) => (
            <SideSection title={name} key={name}>
              {list.map((r) => (
                <button type="button" class="lin-side-link" key={r.key} title={`${r.issue.identifier} ${r.issue.title}`} onClick={() => onOpenIssue(r.issue.identifier)}>
                  {name === 'Blocked by' ? <BlockedGlyph /> : name === 'Blocking' ? <BlockingGlyph /> : <StatusGlyph type={r.issue.state.type} color={r.issue.state.color} stateId={r.issue.state.id} teamId={issue.team.id} />}
                  <span class="lin-ellipsis">{r.issue.title}</span>
                </button>
              ))}
            </SideSection>
          ))}
          {otherLinks.length > 0 && (
            <SideSection title="Links">
              {otherLinks.map(({ a }) => (
                <button type="button" class="lin-side-link" key={a.id} title={a.url} onClick={() => { void host.openUrl(a.url); }}>
                  <Chip>{a.sourceType ?? 'link'}</Chip><span class="lin-ellipsis">{a.title}</span>
                </button>
              ))}
            </SideSection>
          )}
          <div class="sui-muted sui-small lin-side-foot">
            Created {shortDate(issue.createdAt)}{issue.creator ? ` by ${issue.creator.name}` : ''}. Updated {relativeTime(issue.updatedAt)}.
          </div>
        </aside>

        <div class="lin-issue-body">
          <Markdown source={issue.description} empty="No description." onOpenIssue={onOpenIssue} />
          {issue.children.nodes.length > 0 && (
            <section class="lin-subissues">
              <div class="sui-row lin-subissues-head">
                <span class="lin-activity-title">Sub-issues</span>
                <Chip><ProgressRing done={done} total={issue.children.nodes.length} />{done}/{issue.children.nodes.length}</Chip>
              </div>
              {issue.children.nodes.map((child) => <IssueRow key={child.id} issue={child} compact onOpen={(c) => onOpenIssue(c.identifier)} />)}
            </section>
          )}
          <Activity issue={issue} onOpenIssue={onOpenIssue} />
        </div>
      </div>
    </article>
  );
};

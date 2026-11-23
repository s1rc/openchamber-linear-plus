// One issue in Linear's layout: title, description, sub-issues and activity on the left; merge requests,
// properties, labels, project and relations on the right. A narrow frame stacks the side column under
// the title, as Linear does on small screens. Every property, the title and the description edit in
// place (the description from its button, so its text can be selected); comments post from the composer
// under the activity.
import { toast } from '@openchamber-ext/shared-ui';
import { Chip } from '@openchamber-ext/shared-ui/preact';
import { useEffect, useState } from 'preact/hooks';
import { issueContext } from '../../shared/issue-context.ts';
import { changeOf, estimateLabel, relativeTime, shortDate } from '../../shared/format.ts';
import { Avatar, BlockedGlyph, BlockingGlyph, ChangeGlyph, ProgressRing, StatusGlyph } from '../../shared/glyphs.tsx';
import { host, useReady } from '../../shared/host.ts';
import { useIssueDetail } from '../../shared/issues.ts';
import { Banner, Button, Menu, Spinner, Tabs, TextField } from '../../shared/kit.tsx';
import { acceptStateOf, declineStateOf } from '../../shared/moves.ts';
import { addComment, writeErrorText } from '../../shared/writes.ts';
import { useWorkspace } from '../../shared/workspace.ts';
import { Markdown } from '../../shared/markdown.tsx';
import { setTask } from '../../shared/tasks.ts';
import { openedIssuePush, pushSnapshot } from '../../shared/snapshot.ts';
import type { Comment, HistoryEvent, IssueDetail as Detail, RelatedIssue } from '../../shared/types.ts';
import { teamEstimateType } from '../../shared/workspace.ts';
import { IssueRow } from './issue-row.tsx';
import {
  AssigneeEdit, CycleEdit, DueDateEdit, EstimateEdit, LabelsEdit, PriorityEdit, ProjectEdit, save, StatusEdit,
} from './property-editors.tsx';
import { BuildPanel, useBuildSource } from '../../shared/build-panel.tsx';
import { Modal } from './modal.tsx';
import { RichEditor } from './rich-editor.tsx';
import { StartSessionDialog } from './start-session.tsx';
import { CopyButtons } from '../../shared/icon-buttons.tsx';

const PRIORITY_NAME = ['No priority', 'Urgent', 'High', 'Medium', 'Low'] as const;

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

/** Typing in a field must not reach the list's shortcuts: Escape there closes the issue. */
const keepKeys = (onKey: (event: KeyboardEvent) => void) => (event: KeyboardEvent) => {
  event.stopPropagation();
  onKey(event);
};

const TitleEdit = ({ issue }: { issue: Detail }) => {
  const [draft, setDraft] = useState<string | null>(null);
  const commit = async () => {
    const title = draft?.trim();
    if (title && title !== issue.title && !(await save(issue, { input: { title }, patch: { title } }))) return;
    setDraft(null);
  };
  if (draft === null) {
    return <h1 class="lin-issue-heading lin-editable" title="Edit the title" onClick={() => setDraft(issue.title)}>{issue.title}</h1>;
  }
  return (
    <div class="lin-stack lin-stack--tight" onKeyDown={keepKeys((e) => { if (e.key === 'Enter') { e.preventDefault(); void commit(); } if (e.key === 'Escape') setDraft(null); })}>
      <TextField value={draft} onChange={setDraft} label="Title" />
      <div class="sui-row">
        <Button label="Save" size="xs" disabled={!draft.trim()} onClick={() => { void commit(); }} />
        <Button label="Cancel" variant="ghost" size="xs" onClick={() => setDraft(null)} />
      </div>
    </div>
  );
};

const DescriptionEdit = ({ issue, onOpenIssue }: { issue: Detail; onOpenIssue: (id: string) => void }) => {
  const [draft, setDraft] = useState<string | null>(null);
  // Rich text by default; Markdown shows the same text as Linear stores it. Each switch to rich text reads the draft again.
  const [tab, setTab] = useState<'rich' | 'markdown'>('rich');
  const [loads, setLoads] = useState(0);
  const [busy, setBusy] = useState(false);
  const edit = () => { setDraft(issue.description ?? ''); setTab('rich'); setLoads((n) => n + 1); };
  const switchTo = (next: 'rich' | 'markdown') => { if (next === 'rich' && tab !== 'rich') setLoads((n) => n + 1); setTab(next); };
  if (draft === null) {
    // Only the button edits: a click in the text selects it, as text does everywhere else. A task box ticks and saves.
    const toggleTask = (index: number, checked: boolean) => {
      const next = setTask(issue.description ?? '', index, checked);
      if (next !== null) void save(issue, { input: { description: next }, patch: { description: next } });
    };
    return (
      <div class="lin-description">
        <div class="lin-description-body">
          {issue.description?.trim()
            ? <Markdown source={issue.description} onOpenIssue={onOpenIssue} onToggleTask={toggleTask} />
            : <div class="sui-muted">No description.</div>}
        </div>
        <div class="lin-description-foot"><Button label={issue.description ? 'Edit description' : 'Add description'} variant="ghost" size="xs" onClick={edit} /></div>
      </div>
    );
  }
  const commit = async () => {
    setBusy(true);
    const ok = draft === (issue.description ?? '') || (await save(issue, { input: { description: draft }, patch: { description: draft } }));
    setBusy(false);
    if (ok) setDraft(null);
  };
  return (
    <div class="lin-stack lin-stack--tight lin-description-edit" onKeyDown={keepKeys((e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void commit(); if (e.key === 'Escape') setDraft(null); })}>
      <Tabs items={[{ id: 'rich', label: 'Rich text' }, { id: 'markdown', label: 'Markdown' }]} activeId={tab} onChange={(id) => switchTo(id as 'rich' | 'markdown')} />
      {tab === 'rich'
        ? <RichEditor key={loads} initial={draft} onChange={setDraft} />
        : <TextField value={draft} onChange={setDraft} multiline rows={Math.min(30, Math.max(8, draft.split('\n').length + 2))} placeholder="Markdown. Cmd+Enter saves, Escape cancels." />}
      <div class="sui-muted sui-small">Cmd+Enter saves, Escape cancels. Linear keeps descriptions as Markdown; tables and collapsible sections are kept as written.</div>
      <div class="sui-row">
        <Button label={busy ? 'Saving...' : 'Save'} size="xs" disabled={busy} onClick={() => { void commit(); }} />
        <Button label="Cancel" variant="ghost" size="xs" disabled={busy} onClick={() => setDraft(null)} />
      </div>
    </div>
  );
};

const CommentComposer = ({ issue }: { issue: Detail }) => {
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const send = async () => {
    const text = body.trim();
    if (!text || busy) return;
    setBusy(true);
    try {
      await addComment(issue, text);
      setBody('');
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
    } finally {
      setBusy(false);
    }
  };
  return (
    <div class="lin-composer" onKeyDown={keepKeys((e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void send(); })}>
      <TextField value={body} onChange={setBody} multiline rows={3} placeholder="Leave a comment... Cmd+Enter sends." disabled={busy} />
      <div class="sui-row">
        <span class="sui-grow" />
        <Button label={busy ? 'Sending...' : 'Comment'} size="xs" disabled={busy || !body.trim()} onClick={() => { void send(); }} />
      </div>
    </div>
  );
};

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
      <CommentComposer issue={issue} />
    </section>
  );
};

/**
 * `stacked`: one column, properties above the description (the rail panel and the page's side pane).
 * `origin`: where it was opened from, the first crumb. `pane`: it sits beside the view, so the first button closes it.
 */
type Props = { id: string; stacked?: boolean; origin?: string; pane?: boolean; onClose: () => void; onOpenIssue: (identifier: string) => void };

export const IssueDetail = ({ id, stacked, origin, pane, onClose, onOpenIssue }: Props) => {
  const detail = useIssueDetail(id);
  const workspace = useWorkspace();
  const [starting, setStarting] = useState<'session' | 'plan' | null>(null);
  const [building, setBuilding] = useState(false);
  const directory = useReady()?.directory ?? null;
  const buildSource = useBuildSource(directory, id);
  const [triaging, setTriaging] = useState(false);
  const issue = detail.data;
  const orgKey = workspace.data?.viewer.organization?.urlKey ?? null;
  // The service lists the issues you open in the composer's `@` menu, with what an agent reads about them.
  useEffect(() => {
    if (issue) void pushSnapshot(openedIssuePush(directory, issue, orgKey));
  }, [issue?.identifier, issue?.updatedAt, directory, orgKey]);

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

  const team = workspace.data?.teamsById.get(issue.team.id);
  const chip = {
    providerId: 'linear-dashboard', id: issue.identifier, title: `${issue.identifier} ${issue.title}`, url: issue.url, kind: 'issue' as const,
    text: issueContext(issue), data: { issueId: issue.id, identifier: issue.identifier },
  };
  const attach = async () => {
    try {
      await host.attach(chip);
      await toast(host, 'success', `Attached ${issue.identifier} to your message`);
    } catch {
      await toast(host, 'error', 'Open a chat to attach the issue.');
    }
  };
  const link = async () => {
    try {
      await host.sessionLink(chip);
      await toast(host, 'success', `Linked ${issue.identifier} to this session`);
    } catch {
      await toast(host, 'error', 'Open a session to link the issue to it.');
    }
  };
  const triage = async (to: 'accept' | 'decline') => {
    const state = to === 'accept' ? acceptStateOf(team, issue.team.states.nodes) : declineStateOf(issue.team.states.nodes);
    if (!state) {
      await toast(host, 'error', `${issue.team.name} has no ${to === 'accept' ? 'backlog or unstarted' : 'canceled'} status.`);
      return;
    }
    setTriaging(true);
    if (await save(issue, { input: { stateId: state.id }, patch: { state } })) await toast(host, 'success', `${issue.identifier} moved to ${state.name}`);
    setTriaging(false);
  };

  const changes = issue.links.nodes.map((a) => ({ a, change: changeOf(a) }));
  const diffs = changes.filter((c) => c.change);
  const otherLinks = changes.filter((c) => !c.change);
  const done = issue.children.nodes.filter((c) => ['completed', 'canceled', 'duplicate'].includes(c.state.type)).length;
  const relations = relationGroups(issue);
  const editorProps = { issue, team };

  return (
    <article class="lin-issue-view">
      {origin && (
        // Where the issue was opened from, the same line in the page's pane and on the rail panel.
        <div class="lin-issue-trail sui-small sui-muted lin-ellipsis" title={`${origin} › ${issue.team.name} › ${issue.identifier}`}>
          {origin} › {origin !== issue.team.name ? `${issue.team.name} › ` : ''}<span class="sui-mono">{issue.identifier}</span>
        </div>
      )}
      <header class="lin-issue-bar">
        <Button label={pane ? 'Close' : 'Back'} variant="ghost" size="xs" onClick={onClose} />
        <span class="sui-muted sui-small lin-ellipsis lin-issue-crumb" title={issue.team.name}>{issue.team.name} ›</span>
        <span class="sui-mono sui-small lin-nowrap lin-issue-barkey">{issue.identifier}</span>
        <span class="sui-grow" />
        <CopyButtons issue={issue} plain />
        {issue.state.type === 'triage' && (
          <>
            <Button label="Accept" variant="outline" size="xs" disabled={triaging} onClick={() => { void triage('accept'); }} />
            <Button label="Decline" variant="ghost" size="xs" disabled={triaging} onClick={() => { void triage('decline'); }} />
          </>
        )}
        <Button label={stacked ? 'Plan' : 'Start plan'} size="xs" onClick={() => setStarting('plan')} />
        <Button label={stacked ? 'Start' : 'Start session'} variant="outline" size="xs" onClick={() => setStarting('session')} />
        {buildSource && <Button label={stacked ? 'Build' : 'Start build'} variant="outline" size="xs" onClick={() => setBuilding(true)} />}
        <Button label={stacked ? 'Attach' : 'Attach to message'} variant="outline" size="xs" onClick={() => { void attach(); }} />
        <Menu
          label="More"
          variant="ghost"
          size="xs"
          items={[{ id: 'link', label: 'Link to this session' }, { id: 'open', label: 'Open in Linear' }]}
          onSelect={(what) => {
            if (what === 'link') void link();
            if (what === 'open') void host.openUrl(issue.url);
          }}
        />
      </header>

      <div class="lin-issue-grid">
        <div class="lin-issue-head">
          {issue.parent && (
            <button type="button" class="lin-link sui-small" onClick={() => onOpenIssue(issue.parent!.identifier)}>Sub-issue of {issue.parent.identifier}</button>
          )}
          <TitleEdit issue={issue} />
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
            <StatusEdit {...editorProps} />
            <Property icon={<span class="lin-team-dot" />} value={issue.team.name} empty="Team" />
            <PriorityEdit {...editorProps} />
            <AssigneeEdit {...editorProps} />
            <EstimateEdit {...editorProps} />
            <CycleEdit {...editorProps} />
            <DueDateEdit {...editorProps} />
          </SideSection>
          <SideSection title="Labels">
            <LabelsEdit {...editorProps} />
          </SideSection>
          <SideSection title="Project">
            <ProjectEdit {...editorProps} />
            {issue.projectMilestone && <div class="lin-prop lin-prop--sub sui-small">Milestone: {issue.projectMilestone.name}</div>}
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
          <DescriptionEdit issue={issue} onOpenIssue={onOpenIssue} />
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
      {starting && <StartSessionDialog issue={issue} plan={starting === 'plan'} onClose={() => setStarting(null)} />}
      {building && buildSource && (
        <Modal title={`Start a build for ${issue.identifier}`} onClose={() => setBuilding(false)}>
          <BuildPanel identifier={issue.identifier} source={buildSource} detail={issue} onClose={() => setBuilding(false)} />
        </Modal>
      )}
    </article>
  );
};

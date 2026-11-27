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
import { useQuery } from '../../shared/cache.ts';
import { fetchDocument } from '../../shared/search.ts';
import { Banner, Button, Menu, Spinner, TextField } from '../../shared/kit.tsx';
import { acceptStateOf, declineStateOf, type IssueInput, type TeamChoice } from '../../shared/moves.ts';
import { addComment, deleteIssueRelation, updateIssueRelation, writeErrorText } from '../../shared/writes.ts';
import { useWorkspace } from '../../shared/workspace.ts';
import { Markdown } from '../../shared/markdown.tsx';
import { openedIssuePush, pushSnapshot } from '../../shared/snapshot.ts';
import { dependencyGroup } from '../../shared/relations.ts';
import type { Comment, DocumentSummary, HistoryEvent, IssueDetail as Detail, IssueRow as IssueRowData, RelatedIssue } from '../../shared/types.ts';
import type { IssuePrompt, MenuAction, RelationChoice } from '../../shared/issue-menu.ts';
import { teamEstimateType } from '../../shared/workspace.ts';
import { IssueRow } from './issue-row.tsx';
import {
  AssigneeEdit, CycleEdit, DueDateEdit, EstimateEdit, LabelsEdit, MilestoneEdit, PriorityEdit, ProjectEdit, save, StatusEdit,
} from './property-editors.tsx';
import { BuildPanel, PlanActions, useBuildSource } from '../../shared/build-panel.tsx';
import { Modal } from './modal.tsx';
import { keepKeys, MarkdownField } from './markdown-field.tsx';
import { StartSessionDialog } from './start-session.tsx';
import { copyText, CopyButtons } from '../../shared/icon-buttons.tsx';
import { IssueMenu } from './issue-menu.tsx';
import { IssueActionDialog } from './issue-action-dialogs.tsx';
import { IssueRelationDialog } from './issue-relation-dialog.tsx';
import { CreateIssueDialog, SubIssueForm } from './create-issue.tsx';
import { DeleteIssueDialog } from './delete-issue.tsx';
import { TeamMoveDialog } from './team-move.tsx';
import { createIssueRelation } from '../../shared/writes.ts';

const PRIORITY_NAME = ['No priority', 'Urgent', 'High', 'Medium', 'Low'] as const;

type Relation = { key: string; id: string; type: string; inverse: boolean; issue: RelatedIssue };

/** Relations grouped as Linear's side column shows them. */
const relationGroups = (issue: Detail): [string, Relation[]][] => {
  const groups: Record<string, Relation[]> = { 'Blocked by': [], Blocking: [], Related: [], 'Duplicate of': [], 'Duplicated by': [], Similar: [] };
  for (const r of issue.relations.nodes) {
    const name = r.type === 'blocks' ? dependencyGroup(issue, r.relatedIssue, false) : r.type === 'duplicate' ? 'Duplicate of' : r.type === 'similar' ? 'Similar' : 'Related';
    groups[name]!.push({ key: r.id, id: r.id, type: r.type, inverse: false, issue: r.relatedIssue });
  }
  for (const r of issue.inverseRelations.nodes) {
    const name = r.type === 'blocks' ? dependencyGroup(issue, r.issue, true) : r.type === 'duplicate' ? 'Duplicated by' : r.type === 'similar' ? 'Similar' : 'Related';
    groups[name]!.push({ key: `i${r.id}`, id: r.id, type: r.type, inverse: true, issue: r.issue });
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

const contextPoint = (event: MouseEvent): { x: number; y: number } => {
  const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
  return { x: event.clientX || box.left + box.width / 2, y: event.clientY || box.top + box.height / 2 };
};

const RELATION_CHANGES: { label: string; choice: RelationChoice }[] = [
  { label: 'Blocking', choice: { id: 'blocking', type: 'blocks', inverse: false } },
  { label: 'Blocked by', choice: { id: 'blocked', type: 'blocks', inverse: true } },
  { label: 'Duplicate of', choice: { id: 'duplicate', type: 'duplicate', inverse: false } },
  { label: 'Duplicated by', choice: { id: 'duplicate', type: 'duplicate', inverse: true } },
];

/** One related issue: open on click, change or remove on right click, and a quick Remove on hover. */
const RelationLink = ({ issue, relation, group, onOpenIssue }: { issue: Detail; relation: Relation; group: string; onOpenIssue: (id: string) => void }) => {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [changing, setChanging] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!menu) return undefined;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.stopPropagation(); setMenu(null); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menu]);

  const remove = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await deleteIssueRelation(issue, relation.issue, relation.id);
      await toast(host, 'success', `Removed relation with ${relation.issue.identifier}`);
      setMenu(null);
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  const change = async (label: string, choice: RelationChoice) => {
    if (busy) return;
    setBusy(true);
    try {
      await updateIssueRelation(issue, relation.issue, relation.id, choice);
      await toast(host, 'success', `Changed relation with ${relation.issue.identifier} to ${label}`);
      setMenu(null);
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  const subLeft = menu && menu.x + 236 + 240 > window.innerWidth ? Math.max(6, menu.x - 236) : (menu?.x ?? 0) + 236;
  return (
    <div
      class="lin-relation"
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const point = contextPoint(event);
        setChanging(false);
        setMenu({ x: Math.max(6, Math.min(point.x, window.innerWidth - 242)), y: Math.max(6, Math.min(point.y, window.innerHeight - 220)) });
      }}
    >
      <button type="button" class="lin-side-link lin-relation-open" title={`${relation.issue.identifier} ${relation.issue.title}`} onClick={() => onOpenIssue(relation.issue.identifier)}>
        {group === 'Blocked by' ? <BlockedGlyph /> : group === 'Blocking' ? <BlockingGlyph /> : <StatusGlyph type={relation.issue.state.type} color={relation.issue.state.color} stateId={relation.issue.state.id} teamId={issue.team.id} />}
        <span class="lin-ellipsis">{relation.issue.title}</span>
      </button>
      <button type="button" class="lin-relation-remove" aria-label={`Remove relation with ${relation.issue.identifier}`} title="Remove relation" disabled={busy} onClick={() => { void remove(); }}>×</button>
      {menu && (
        <div class="lin-menu-layer" onClick={() => setMenu(null)} onContextMenu={(event) => { event.preventDefault(); setMenu(null); }}>
          <div class="lin-menu" role="menu" aria-label={`Relation with ${relation.issue.identifier}`} style={{ left: `${menu.x}px`, top: `${menu.y}px` }} onClick={(event) => event.stopPropagation()}>
            <button type="button" class="lin-menu-item" role="menuitem" onMouseEnter={() => setChanging(true)} onClick={() => setChanging(true)}>
              <span class="lin-menu-label">Change to</span><span class="lin-menu-more">›</span>
            </button>
            <button type="button" class="lin-menu-item" role="menuitem" data-danger="true" disabled={busy} onMouseEnter={() => setChanging(false)} onClick={() => { void remove(); }}>Remove relation</button>
            <button type="button" class="lin-menu-item" role="menuitem" onMouseEnter={() => setChanging(false)} onClick={() => { void copyText(relation.issue.url, 'the issue link'); setMenu(null); }}>Copy link</button>
            <button type="button" class="lin-menu-item" role="menuitem" onMouseEnter={() => setChanging(false)} onClick={() => { void host.openUrl(relation.issue.url); setMenu(null); }}>Open in new tab</button>
          </div>
          {changing && (
            <div class="lin-menu lin-menu--sub" role="menu" aria-label="Change relation to" style={{ left: `${subLeft}px`, top: `${menu.y}px` }} onClick={(event) => event.stopPropagation()}>
              {RELATION_CHANGES.map(({ label, choice }) => (
                <button type="button" class="lin-menu-item" role="menuitem" key={label} disabled={busy} onClick={() => { void change(label, choice); }}>{label}</button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Property = ({ icon, value, empty }: { icon: preact.ComponentChildren; value: preact.ComponentChildren | null | undefined; empty: string }) => (
  <div class={value ? 'lin-prop' : 'lin-prop lin-prop--empty'}>{icon}<span class="lin-ellipsis">{value || empty}</span></div>
);

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

const DescriptionEdit = ({ issue, onOpenIssue }: { issue: Detail; onOpenIssue: (id: string) => void }) => (
  <MarkdownField
    value={issue.description ?? ''}
    onOpenIssue={onOpenIssue}
    onSave={(description) => save(issue, { input: { description }, patch: { description } })}
  />
);

const IssueDocument = ({ document, onOpenIssue }: { document: DocumentSummary; onOpenIssue: (id: string) => void }) => {
  const [open, setOpen] = useState(false);
  const detail = useQuery(open ? `document:${document.id}` : null, () => fetchDocument(document.id));
  return (
    <section class="lin-document">
      <button type="button" class="lin-document-toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span class="lin-chevron" aria-hidden="true">{open ? '⌄' : '›'}</span>
        <Chip>document</Chip>
        <span class="lin-ellipsis">{document.title}</span>
      </button>
      {open && (
        <div class="lin-document-content">
          {detail.error ? (
            <Banner tone="error" title="Could not load the document" body={detail.error instanceof Error ? detail.error.message : String(detail.error)} action={{ label: 'Retry', onClick: () => detail.refresh() }} />
          ) : !detail.data ? (
            <Spinner label="Loading document" />
          ) : (
            <>
              <div class="sui-row sui-small sui-muted">
                <span>Updated {relativeTime(detail.data.updatedAt)}</span>
                <span class="sui-grow" />
                <Button label="Open in Linear" variant="ghost" size="xs" onClick={() => { void host.openUrl(document.url); }} />
              </div>
              <Markdown source={detail.data.content} empty="This document is empty." onOpenIssue={onOpenIssue} />
            </>
          )}
        </div>
      )}
    </section>
  );
};

type ResourceLink = Detail['links']['nodes'][number];

const IssueResources = ({ links, documents, onOpenIssue, onAdd }: { links: ResourceLink[]; documents: DocumentSummary[]; onOpenIssue: (id: string) => void; onAdd: (prompt: IssuePrompt) => void }) => (
  <section class="lin-documents lin-resources">
    <div class="sui-row lin-resources-head">
      <h2 class="lin-activity-title">Resources</h2>
      <span class="sui-grow" />
      <span class="lin-resource-add" title="Add resource">
        <Menu
          label="+"
          variant="outline"
          size="xs"
          items={[{ id: 'link', label: 'Add link...' }, { id: 'document', label: 'Add document' }, { id: 'customer', label: 'Add customer request...' }]}
          onSelect={(prompt) => { if (prompt === 'link' || prompt === 'document' || prompt === 'customer') onAdd(prompt); }}
        />
      </span>
    </div>
    {(links.length > 0 || documents.length > 0) && (
      <div class="lin-documents-list">
        {links.map((link) => (
          <button type="button" class="lin-document-toggle lin-resource-link" key={link.id} title={link.url} onClick={() => { void host.openUrl(link.url); }}>
            <Chip>{link.sourceType ?? 'link'}</Chip><span class="lin-ellipsis">{link.title}</span>
          </button>
        ))}
        {documents.map((document) => <IssueDocument key={document.id} document={document} onOpenIssue={onOpenIssue} />)}
      </div>
    )}
  </section>
);

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
type Props = { id: string; stacked?: boolean; origin?: string; pane?: boolean; onClose: () => void; onOpenIssue: (identifier: string) => void; onUnavailable?: () => void };

export const IssueDetail = ({ id, stacked, origin, pane, onClose, onOpenIssue, onUnavailable }: Props) => {
  const detail = useIssueDetail(id);
  const workspace = useWorkspace();
  const [starting, setStarting] = useState<'session' | 'plan' | null>(null);
  const [building, setBuilding] = useState(false);
  const [addingSubIssue, setAddingSubIssue] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [prompt, setPrompt] = useState<{ issue: IssueRowData; prompt: IssuePrompt } | null>(null);
  const [relation, setRelation] = useState<{ issue: IssueRowData; relation: RelationChoice; create: boolean } | null>(null);
  const [moving, setMoving] = useState<{ issue: IssueRowData; choices: TeamChoice[]; extra: IssueInput; manual?: boolean } | null>(null);
  const [deleting, setDeleting] = useState<IssueRowData | null>(null);
  const directory = useReady()?.directory ?? null;
  const buildSource = useBuildSource(directory, id);
  const [triaging, setTriaging] = useState(false);
  const issue = detail.data;
  const orgKey = workspace.data?.viewer.organization?.urlKey ?? null;
  // The service lists the issues you open in the composer's `@` menu, with what an agent reads about them.
  useEffect(() => {
    if (issue) void pushSnapshot(openedIssuePush(directory, issue, orgKey));
  }, [issue?.identifier, issue?.updatedAt, directory, orgKey]);
  useEffect(() => {
    if (!issue && detail.error) onUnavailable?.();
  }, [detail.error]);

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
  const documents = issue.documents?.nodes ?? [];
  const done = issue.children.nodes.filter((c) => ['completed', 'canceled', 'duplicate'].includes(c.state.type)).length;
  const relations = relationGroups(issue);
  const editorProps = { issue, team };
  const menuAction = (action: MenuAction) => {
    if (action.kind === 'prompt') {
      if (action.prompt !== 'team') { setPrompt({ issue, prompt: action.prompt }); return; }
      const choices = (workspace.data?.teams ?? []).filter((other) => other.id !== issue.team.id).flatMap((other) => {
        const state = acceptStateOf(other, workspace.data?.statesByTeam.get(other.id) ?? []);
        return state ? [{ teamId: other.id, state }] : [];
      });
      if (choices.length) setMoving({ issue, choices, extra: {}, manual: true });
      else void toast(host, 'info', 'No other team has an available default status.');
      return;
    }
    if (action.kind === 'relation') setRelation({ issue, relation: action.relation, create: action.create });
  };

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
        <span class="lin-issue-actions">
          <Button label="Attach" variant="outline" size="xs" onClick={() => { void attach(); }} />
          <Button label="Start Session" variant="outline" size="xs" onClick={() => setStarting('session')} />
          <Button label="Plan" variant="outline" size="xs" onClick={() => setStarting('plan')} />
          <PlanActions identifier={issue.identifier} source={buildSource} size="xs" onBuild={() => setBuilding(true)} />
        </span>
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

      <div
        class="lin-issue-grid"
        onContextMenu={(event) => {
          event.preventDefault();
          const point = contextPoint(event);
          setContextMenu({ x: point.x, y: point.y });
        }}
      >
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
            <MilestoneEdit {...editorProps} />
          </SideSection>
          {relations.map(([name, list]) => (
            <SideSection title={name} key={name}>
              {list.map((r) => <RelationLink key={r.key} issue={issue} relation={r} group={name} onOpenIssue={onOpenIssue} />)}
            </SideSection>
          ))}
          <div class="sui-muted sui-small lin-side-foot">
            Created {shortDate(issue.createdAt)}{issue.creator ? ` by ${issue.creator.name}` : ''}. Updated {relativeTime(issue.updatedAt)}.
          </div>
        </aside>

        <div class="lin-issue-body">
          <DescriptionEdit issue={issue} onOpenIssue={onOpenIssue} />
          <section class="lin-subissues">
            <div class="sui-row lin-subissues-head">
              <span class="lin-activity-title">Sub-issues</span>
              {issue.children.nodes.length > 0 && <Chip><ProgressRing done={done} total={issue.children.nodes.length} />{done}/{issue.children.nodes.length}</Chip>}
            </div>
            {issue.children.nodes.length > 0 && (
              <div class="lin-subissues-list">
                {issue.children.nodes.map((child) => <IssueRow key={child.id} issue={child} compact onOpen={(c) => onOpenIssue(c.identifier)} />)}
              </div>
            )}
            <button type="button" class="lin-add-subissues" aria-label="Add sub-issues" disabled={addingSubIssue} onClick={() => setAddingSubIssue(true)}>+ Add sub-issues</button>
            {addingSubIssue && (
              <SubIssueForm
                parent={issue}
                onClose={() => setAddingSubIssue(false)}
                onCreated={() => { setAddingSubIssue(false); detail.refresh(); }}
              />
            )}
          </section>
          <IssueResources
            links={otherLinks.map(({ a }) => a)}
            documents={documents}
            onOpenIssue={onOpenIssue}
            onAdd={(prompt) => setPrompt({ issue, prompt })}
          />
          <Activity issue={issue} onOpenIssue={onOpenIssue} />
        </div>
      </div>
      {contextMenu && (
        <IssueMenu
          issue={issue}
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onOpen={(opened) => onOpenIssue(opened.identifier)}
          onDelete={setDeleting}
          onAction={(_issue, action) => menuAction(action)}
        />
      )}
      {prompt && <IssueActionDialog issue={prompt.issue} prompt={prompt.prompt} onClose={() => setPrompt(null)} onOpen={(opened) => { setPrompt(null); onOpenIssue(opened.identifier); }} />}
      {relation && !relation.create && <IssueRelationDialog issue={relation.issue} relation={relation.relation} onClose={() => setRelation(null)} />}
      {relation?.create && (
        <CreateIssueDialog
          teamIds={[relation.issue.team.id]}
          projectId={relation.issue.project?.id ?? null}
          onClose={() => setRelation(null)}
          onCreated={(created) => {
            const source = relation.issue;
            const choice = relation.relation;
            void createIssueRelation(source, created, choice)
              .then(() => toast(host, 'success', `Linked ${source.identifier} and ${created.identifier}`))
              .catch((error: unknown) => toast(host, 'error', writeErrorText(error)));
            setRelation(null);
            onOpenIssue(created.identifier);
          }}
        />
      )}
      {deleting && <DeleteIssueDialog issue={deleting} onClose={() => setDeleting(null)} onDeleted={onClose} />}
      {moving && (
        <TeamMoveDialog
          issue={moving.issue}
          choices={moving.choices}
          extra={moving.extra}
          manual={moving.manual}
          subIssues={issue.children.nodes.length}
          onClose={() => setMoving(null)}
          onMoved={(moved) => { setMoving(null); onOpenIssue(moved.identifier); }}
        />
      )}
      {starting && <StartSessionDialog issue={issue} plan={starting === 'plan'} onClose={() => setStarting(null)} />}
      {building && buildSource && (
        <Modal title={`Start a build for ${issue.identifier}`} onClose={() => setBuilding(false)}>
          <BuildPanel identifier={issue.identifier} source={buildSource} detail={issue} onClose={() => setBuilding(false)} />
        </Modal>
      )}
    </article>
  );
};

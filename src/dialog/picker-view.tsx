// The Attach tab, laid out like the host's own "Start from Linear" picker: a search that also takes a
// pasted key or link, a filter, the list on the left and a preview of the highlighted item on the
// right, and Choose at the bottom. New worktree (PR or issue) opens this dialog with no session, and
// the issue chosen there is what the new worktree is for: it is attached to the first message.
import type { AttachIssueRequest } from '@openchamber/sdk';
import { KV } from '@openchamber-ext/shared-ui/preact';
import { toast } from '@openchamber-ext/shared-ui';
import type { ComponentChildren } from 'preact';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import { documentContext, projectContext } from '../shared/attach-text.ts';
import { useQuery } from '../shared/cache.ts';
import { HEALTH_LABEL, percent, relativeTime, shortDate } from '../shared/format.ts';
import { Avatar, PriorityGlyph, ProgressRing, ProjectIcon, StatusGlyph } from '../shared/glyphs.tsx';
import { PRIORITY_NAMES } from '../shared/grouping.ts';
import { host } from '../shared/host.ts';
import { CopyButtons, ExternalIcon, IconButton } from '../shared/icon-buttons.tsx';
import { issueContext } from '../shared/issue-context.ts';
import { useIssueDetail } from '../shared/issues.ts';
import { Button, Select, SearchField, Spinner } from '../shared/kit.tsx';
import { gql, LinearError } from '../shared/linear.ts';
import { Markdown } from '../shared/markdown.tsx';
import { browseFilter, isIssueMode, keyFilter, modeFilter, moveCursor, pastedKey, PICKER_MODES, type PickerMode } from '../shared/picker.ts';
import { useProjects, useProjectSearch, useTeamProjects } from '../shared/projects.ts';
import { ISSUE_DETAIL, PICKER_ISSUES, PICKER_SEARCH } from '../shared/queries.ts';
import { fetchDocument, fetchProjectDetail, useDebounced, useDocumentSearch, useProjectDocuments } from '../shared/search.ts';
import type { DocumentSummary, IssueDetailResult, PickerIssue, PickerIssuesResult, PickerSearchResult, ProjectSummary } from '../shared/types.ts';
import { writeErrorText } from '../shared/writes.ts';
import type { Scope } from './scope.ts';

const PROVIDER = 'linear-dashboard';

type Entry =
  | { kind: 'issue'; id: string; issue: PickerIssue }
  | { kind: 'project'; id: string; project: ProjectSummary }
  | { kind: 'document'; id: string; document: DocumentSummary };

const unique = <T extends { id: string }>(list: T[]): T[] => {
  const seen = new Set<string>();
  return list.filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true)));
};

/** The issues the term and mode ask for: a pasted key, a search, or the folder's recent issues. */
const usePickerIssues = (mode: PickerMode, term: string, teamIds: string[], projectIds: string[]) => {
  const typed = useDebounced(term);
  const key = pastedKey(typed);
  const issues = isIssueMode(mode);
  const browse = browseFilter(mode, teamIds, projectIds);
  const own = modeFilter(mode);
  const queryKey = !issues ? null
    : key ? `picker-key:${key}`
    : typed.length >= 2 ? `picker-search:${mode}:${typed.toLowerCase()}`
    : `picker:${JSON.stringify(browse)}`;
  return useQuery<PickerIssue[]>(queryKey, async () => {
    if (key) return (await gql<PickerIssuesResult>(PICKER_ISSUES, { first: 1, filter: keyFilter(key) })).issues.nodes;
    if (typed.length >= 2) return (await gql<PickerSearchResult>(PICKER_SEARCH, { term: typed, filter: own })).searchIssues.nodes;
    return (await gql<PickerIssuesResult>(PICKER_ISSUES, { first: 50, filter: browse })).issues.nodes;
  });
};

const subIssueCount = (issue: PickerIssue) => {
  const total = issue.children.nodes.length;
  const done = issue.children.nodes.filter((c) => ['completed', 'canceled', 'duplicate'].includes(c.state.type)).length;
  return { done, total };
};

const IssueLine = ({ issue }: { issue: PickerIssue }) => {
  const children = subIssueCount(issue);
  const labels = issue.labels.nodes;
  return (
    <>
      <span class="lin-pick-glyph"><StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} /></span>
      <span class="lin-pick-body">
        {issue.parent && (
          <span class="lin-pick-parent sui-small sui-muted">
            <span aria-hidden="true">↳</span><span class="sui-mono lin-nowrap">{issue.parent.identifier}</span><span class="lin-ellipsis">{issue.parent.title}</span>
          </span>
        )}
        <span class="lin-pick-title">{issue.title}</span>
        <span class="lin-pick-meta sui-small sui-muted">
          <span class="sui-mono lin-nowrap">{issue.identifier}</span>
          {issue.assignee && <span><Avatar name={issue.assignee.name} url={issue.assignee.avatarUrl} size={14} />{issue.assignee.displayName || issue.assignee.name}</span>}
          <span>{relativeTime(issue.updatedAt)}</span>
          {children.total > 0 && <span title="Sub-issues done"><ProgressRing done={children.done} total={children.total} />{children.done}/{children.total}</span>}
          {issue.priority > 0 && <span>{PRIORITY_NAMES[issue.priority]}</span>}
          {labels.slice(0, 2).map((l) => <span key={l.id}><span class="lin-pick-dot" style={{ background: l.color }} />{l.name}</span>)}
          {labels.length > 2 && <span>+{labels.length - 2}</span>}
        </span>
      </span>
    </>
  );
};

const ProjectLine = ({ project }: { project: ProjectSummary }) => (
  <>
    <span class="lin-pick-glyph"><ProjectIcon icon={project.icon} color={project.color} size={14} /></span>
    <span class="lin-pick-body">
      <span class="lin-pick-title">{project.name}</span>
      <span class="lin-pick-meta sui-small sui-muted">
        <span>{project.status.name}</span>
        <span>{percent(project.progress)}</span>
        {project.teams.nodes.length > 0 && <span class="lin-ellipsis">{project.teams.nodes.map((t) => t.key).join(', ')}</span>}
        {project.lead && <span><Avatar name={project.lead.name} url={project.lead.avatarUrl} size={14} />{project.lead.displayName || project.lead.name}</span>}
      </span>
    </span>
  </>
);

const DocumentLine = ({ document }: { document: DocumentSummary }) => (
  <>
    <span class="lin-pick-glyph lin-pick-doc" aria-hidden="true" />
    <span class="lin-pick-body">
      <span class="lin-pick-title">{document.title}</span>
      <span class="lin-pick-meta sui-small sui-muted">
        {document.project && <span class="lin-ellipsis">{document.project.name}</span>}
        <span>updated {relativeTime(document.updatedAt)}</span>
      </span>
    </span>
  </>
);

const PreviewHead = ({ children, url, tools }: { children: ComponentChildren; url: string; tools?: ComponentChildren }) => (
  <div class="lin-preview-head">
    {children}
    <span class="sui-grow" />
    <span class="lin-icon-row">
      {tools}
      <IconButton label="Open in Linear" onClick={() => { void host.openUrl(url); }}><ExternalIcon /></IconButton>
    </span>
  </div>
);

const IssuePreview = ({ issue }: { issue: PickerIssue }) => {
  const detail = useIssueDetail(issue.id);
  return (
    <>
      <PreviewHead url={issue.url} tools={<CopyButtons issue={issue} />}>
        <span class="lin-state-pill"><StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} />{issue.state.name}</span>
        <span class="sui-mono sui-muted sui-small lin-nowrap">{issue.identifier}</span>
      </PreviewHead>
      <h3 class="lin-preview-title">{issue.title}</h3>
      <KV
        items={[
          ...(issue.parent ? [['Parent', <span class="lin-preview-value"><StatusGlyph type={issue.parent.state.type} color={issue.parent.state.color} /><span class="sui-mono">{issue.parent.identifier}</span> {issue.parent.title}</span>] as const] : []),
          ['Assignee', issue.assignee ? <span class="lin-preview-value"><Avatar name={issue.assignee.name} url={issue.assignee.avatarUrl} size={16} />{issue.assignee.name}</span> : <span class="sui-muted">No assignee</span>],
          ['Team', issue.team.name],
          ...(issue.project ? [['Project', <span class="lin-preview-value"><ProjectIcon icon={issue.project.icon} color={issue.project.color} />{issue.project.name}</span>] as const] : []),
          ['Priority', <span class="lin-preview-value"><PriorityGlyph priority={issue.priority} />{PRIORITY_NAMES[issue.priority]}</span>],
          ...(issue.labels.nodes.length ? [['Labels', <span class="lin-preview-value lin-wrap">{issue.labels.nodes.map((l) => <span key={l.id} class="lin-preview-value"><span class="lin-pick-dot" style={{ background: l.color }} />{l.name}</span>)}</span>] as const] : []),
          ['Updated', relativeTime(issue.updatedAt)],
        ]}
      />
      <div class="lin-preview-rule" />
      {detail.data ? <Markdown source={detail.data.description} empty="No description." /> : detail.error ? <span class="sui-muted sui-small">Could not read the description.</span> : <Spinner size="sm" label="Reading the description" />}
    </>
  );
};

const ProjectPreview = ({ project }: { project: ProjectSummary }) => {
  const detail = useQuery(`project:${project.id}`, () => fetchProjectDetail(project.id));
  return (
    <>
      <PreviewHead url={project.url}>
        <span class="lin-state-pill"><ProjectIcon icon={project.icon} color={project.color} />{project.status.name}</span>
        <span class="sui-muted sui-small">Project</span>
      </PreviewHead>
      <h3 class="lin-preview-title">{project.name}</h3>
      <KV
        items={[
          ['Progress', percent(project.progress)],
          ['Health', project.health ? HEALTH_LABEL[project.health] : <span class="sui-muted">No update</span>],
          ['Lead', project.lead ? <span class="lin-preview-value"><Avatar name={project.lead.name} url={project.lead.avatarUrl} size={16} />{project.lead.name}</span> : <span class="sui-muted">No lead</span>],
          ['Teams', project.teams.nodes.map((t) => t.name).join(', ') || 'None'],
          ...(project.targetDate ? [['Target', shortDate(project.targetDate)] as const] : []),
        ]}
      />
      <div class="lin-preview-rule" />
      {detail.data ? <Markdown source={detail.data.content || detail.data.description} empty="No description." /> : detail.error ? <span class="sui-muted sui-small">Could not read the project.</span> : <Spinner size="sm" label="Reading the project" />}
    </>
  );
};

const DocumentPreview = ({ document }: { document: DocumentSummary }) => {
  const detail = useQuery(`document:${document.id}`, () => fetchDocument(document.id));
  return (
    <>
      <PreviewHead url={document.url}>
        <span class="sui-muted sui-small">Document{document.project ? ` in ${document.project.name}` : ''}</span>
      </PreviewHead>
      <h3 class="lin-preview-title">{document.title}</h3>
      {detail.data ? <Markdown source={detail.data.content} empty="This document is empty." /> : detail.error ? <span class="sui-muted sui-small">Could not read the document.</span> : <Spinner size="sm" label="Reading the document" />}
    </>
  );
};

type Props = { scope: Scope; projectIds: string[]; teamIds: string[]; hasSession: boolean };

export const PickerView = ({ scope, projectIds, teamIds, hasSession }: Props) => {
  const [term, setTerm] = useState('');
  const [mode, setMode] = useState<PickerMode>('open');
  const [cursor, setCursor] = useState(0);
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const typed = useDebounced(term);
  const searching = typed.length >= 2;

  const issues = usePickerIssues(mode, term, teamIds, projectIds);
  const mapped = useProjects(mode === 'projects' || mode === 'documents' ? projectIds : []);
  const ofTeams = useTeamProjects(mode === 'projects' || mode === 'documents' ? scope.teamIds : []);
  const foundProjects = useProjectSearch(mode === 'projects' ? term : '');
  const foundDocs = useDocumentSearch(mode === 'documents' ? term : '');
  const folderProjects = useMemo(() => unique([...(mapped.data ?? []), ...(ofTeams.data ?? [])]).slice(0, 30), [mapped.data, ofTeams.data]);
  const folderDocs = useProjectDocuments(mode === 'documents' && !searching ? folderProjects.map((p) => p.id) : []);

  const entries: Entry[] | undefined = useMemo(() => {
    if (isIssueMode(mode)) return issues.data?.map((issue) => ({ kind: 'issue', id: issue.id, issue }));
    if (mode === 'projects') {
      const list = searching ? foundProjects.data : (mapped.loading || ofTeams.loading ? undefined : folderProjects);
      return list?.map((project) => ({ kind: 'project', id: project.id, project }));
    }
    const docs = searching ? foundDocs.data : folderDocs.data ?? (folderProjects.length || mapped.loading || ofTeams.loading ? undefined : []);
    return docs?.map((document) => ({ kind: 'document', id: document.id, document }));
  }, [mode, searching, issues.data, foundProjects.data, foundDocs.data, folderDocs.data, folderProjects, mapped.loading, ofTeams.loading]);

  const error = isIssueMode(mode) ? issues.error : undefined;
  const count = entries?.length ?? 0;
  const at = count ? Math.min(cursor, count - 1) : -1;
  const current = at >= 0 ? entries![at] : undefined;

  useEffect(() => { setCursor(0); }, [mode, typed]);
  useEffect(() => {
    listRef.current?.querySelector('[data-cursor="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [at]);

  const choose = async (entry: Entry | undefined) => {
    if (!entry || busy) return;
    setBusy(true);
    try {
      let request: AttachIssueRequest;
      if (entry.kind === 'issue') {
        const issue = (await gql<IssueDetailResult>(ISSUE_DETAIL, { id: entry.issue.id })).issue;
        request = { providerId: PROVIDER, id: issue.identifier, title: `${issue.identifier} ${issue.title}`, url: issue.url, kind: 'issue', text: issueContext(issue), data: { issueId: issue.id, identifier: issue.identifier } };
      } else if (entry.kind === 'project') {
        const project = await fetchProjectDetail(entry.project.id);
        request = { providerId: PROVIDER, id: `project:${project.id}`, title: project.name, url: project.url, kind: 'issue', text: projectContext(project), data: { kind: 'project', id: project.id } };
      } else {
        const doc = await fetchDocument(entry.document.id);
        request = { providerId: PROVIDER, id: `doc:${doc.id}`, title: doc.title, url: doc.url, kind: 'issue', text: documentContext(doc), data: { kind: 'document', id: doc.id } };
      }
      await host.attach(request);
      await toast(host, 'success', `Attached ${request.title} to your message`);
      await host.close();
    } catch (failure) {
      await toast(host, 'error', failure instanceof LinearError ? writeErrorText(failure) : 'Could not attach it. Open a chat first, then try again.');
      setBusy(false);
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setCursor(moveCursor(at, event.key === 'ArrowDown' ? 1 : -1, count));
    } else if (event.key === 'Enter' && !event.isComposing && (event.target as HTMLElement | null)?.closest('.lin-picker-search, .lin-picker-list')) {
      event.preventDefault();
      void choose(current);
    }
  };

  const loading = !entries && !error;
  const hint = current?.kind === 'issue'
    ? (hasSession ? 'The issue is attached to your message.' : 'The worktree gets a new branch named after this issue.')
    : current ? 'Its text is attached to your message.' : '';
  const scoped = !searching && mode !== 'mine' && isIssueMode(mode) && (teamIds.length > 0 || projectIds.length > 0);

  return (
    <div class="lin-picker" onKeyDown={onKeyDown}>
      <div class="lin-picker-head">
        <div class="lin-picker-search">
          <SearchField value={term} onChange={setTerm} placeholder="Search, or paste an issue ID or link" label="Search Linear" autofocus />
        </div>
        <Select value={mode} options={PICKER_MODES} onChange={(id) => setMode(id as PickerMode)} />
      </div>
      <div class="lin-picker-panes">
        <div class="lin-picker-list" ref={listRef} role="listbox" aria-label="Linear items">
          {scoped && <div class="lin-picker-note sui-small sui-muted">This folder's teams and projects. Type to search all of Linear.</div>}
          {entries?.map((entry, index) => (
            <button
              type="button"
              key={entry.id}
              class="lin-pick-row"
              role="option"
              aria-selected={index === at ? 'true' : 'false'}
              data-cursor={index === at ? 'true' : 'false'}
              onClick={() => setCursor(index)}
              onDblClick={() => { void choose(entry); }}
            >
              {entry.kind === 'issue' ? <IssueLine issue={entry.issue} /> : entry.kind === 'project' ? <ProjectLine project={entry.project} /> : <DocumentLine document={entry.document} />}
            </button>
          ))}
          {loading && <div class="lin-picker-note"><Spinner size="sm" label={searching ? 'Searching' : 'Loading'} /></div>}
          {error ? <div class="lin-picker-note sui-small">{error instanceof LinearError ? error.message : 'Could not read Linear.'}</div> : null}
          {entries && count === 0 && (
            <div class="lin-picker-note sui-small sui-muted">
              {pastedKey(typed) ? `No issue ${pastedKey(typed)} in Linear, or you cannot see it.` : searching ? 'Nothing matches.' : mode === 'mine' ? 'No open issues are assigned to you.' : 'Nothing for this folder yet. Type to search all of Linear.'}
            </div>
          )}
        </div>
        <div class="lin-picker-preview">
          {current?.kind === 'issue' && <IssuePreview key={current.id} issue={current.issue} />}
          {current?.kind === 'project' && <ProjectPreview key={current.id} project={current.project} />}
          {current?.kind === 'document' && <DocumentPreview key={current.id} document={current.document} />}
          {!current && count > 0 && <span class="sui-muted sui-small">Pick an item to see it here.</span>}
        </div>
      </div>
      <div class="lin-picker-foot">
        <span class="sui-muted sui-small lin-ellipsis">{hint}{hint ? ' ' : ''}Enter chooses.</span>
        <span class="sui-grow" />
        <Button label="Cancel" variant="ghost" size="sm" onClick={() => { void host.close(); }} />
        <Button label={hasSession ? 'Attach' : 'Choose'} size="sm" disabled={!current} loading={busy} onClick={() => { void choose(current); }} />
      </div>
    </div>
  );
};

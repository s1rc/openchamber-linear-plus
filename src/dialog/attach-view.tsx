// The Attach tab: finds a Linear issue, project or document and attaches its text to the message. The
// same dialog opens from New worktree (MR or issue), where an attached issue is what the new worktree
// is for: it is attached to the first message.
import type { AttachIssueRequest } from '@openchamber/sdk';
import { toast } from '@openchamber-ext/shared-ui';
import { useMemo, useState } from 'preact/hooks';
import { useStatusMine } from '../status/data.ts';
import { documentContext, projectContext } from '../shared/attach-text.ts';
import { scopeFilter } from '../shared/filters.ts';
import { relativeTime } from '../shared/format.ts';
import { host } from '../shared/host.ts';
import { issueContext } from '../shared/issue-context.ts';
import { Button, List, SearchField, Spinner } from '../shared/kit.tsx';
import { gql, LinearError } from '../shared/linear.ts';
import { useProjects, useProjectSearch, useTeamProjects } from '../shared/projects.ts';
import { ISSUE_DETAIL } from '../shared/queries.ts';
import { fetchDocument, fetchProjectDetail, useDebounced, useDocumentSearch, useIssueSearch, useProjectDocuments } from '../shared/search.ts';
import { sortMine } from '../shared/status.ts';
import type { DocumentSummary, IssueDetailResult, ProjectSummary } from '../shared/types.ts';
import { writeErrorText } from '../shared/writes.ts';
import type { Scope } from './scope.ts';

const PROVIDER = 'linear-dashboard';

/** The few fields of an issue the list needs: search results and "my issues" both have them. */
type IssueLine = { identifier: string; title: string; state: { name: string } };

const issueItem = (i: IssueLine) => ({
  id: `issue:${i.identifier}`,
  leading: i.identifier,
  title: i.title,
  meta: i.state.name,
});

const projectItem = (p: ProjectSummary) => ({
  id: `project:${p.id}`,
  title: p.name,
  subtitle: ['Project', p.teams.nodes.map((t) => t.name).join(', '), p.status.name].filter(Boolean).join(' · '),
  badge: { label: 'Project', tone: 'info' as const },
});

const documentItem = (d: DocumentSummary) => ({
  id: `doc:${d.id}`,
  title: d.title,
  subtitle: ['Document', d.project?.name, d.updatedAt ? `updated ${relativeTime(d.updatedAt)}` : ''].filter(Boolean).join(' · '),
  badge: { label: 'Doc' },
});

const unique = <T extends { id: string }>(list: T[]): T[] => {
  const seen = new Set<string>();
  return list.filter((x) => (seen.has(x.id) ? false : (seen.add(x.id), true)));
};

export const AttachView = ({ scope, projectIds, teamIds }: { scope: Scope; projectIds: string[]; teamIds: string[] }) => {
  const [term, setTerm] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const typed = useDebounced(term);
  const searching = typed.length >= 2;

  // Before anything is typed: your open issues in this folder's teams and projects (all of yours when none is mapped).
  const mine = useStatusMine(searching ? null : (scopeFilter(teamIds, projectIds) ?? {}));
  const foundIssues = useIssueSearch(searching ? term : '');
  const mapped = useProjects(projectIds);
  const ofTeams = useTeamProjects(scope.teamIds);
  const found = useProjectSearch(searching ? term : '');
  const foundDocs = useDocumentSearch(searching ? term : '');
  const folderProjects = useMemo(
    () => unique([...(mapped.data ?? []), ...(ofTeams.data ?? [])]).slice(0, 20),
    [mapped.data, ofTeams.data],
  );
  const folderDocs = useProjectDocuments(folderProjects.map((p) => p.id));

  const issues: IssueLine[] | undefined = searching ? foundIssues.data?.slice(0, 20) : (mine.data ? sortMine(mine.data.issues, 15) : undefined);
  const projects = searching ? found.data : folderProjects;
  const documents = searching ? foundDocs.data : folderDocs.data;
  const loading = searching ? !found.data || !foundDocs.data || !foundIssues.data : mapped.loading || ofTeams.loading || mine.loading;

  const attach = async (id: string) => {
    setBusy(id);
    try {
      const [kind, rawId] = [id.slice(0, id.indexOf(':')), id.slice(id.indexOf(':') + 1)];
      const request: AttachIssueRequest = kind === 'issue'
        ? await (async () => {
          const issue = (await gql<IssueDetailResult>(ISSUE_DETAIL, { id: rawId })).issue;
          return { providerId: PROVIDER, id: issue.identifier, title: `${issue.identifier} ${issue.title}`, url: issue.url, kind: 'issue' as const, text: issueContext(issue), data: { issueId: issue.id, identifier: issue.identifier } };
        })()
        : kind === 'project'
        ? await (async () => {
          const project = await fetchProjectDetail(rawId);
          return { providerId: PROVIDER, id, title: project.name, url: project.url, kind: 'issue' as const, text: projectContext(project), data: { kind: 'project', id: project.id } };
        })()
        : await (async () => {
          const doc = await fetchDocument(rawId);
          return { providerId: PROVIDER, id, title: doc.title, url: doc.url, kind: 'issue' as const, text: documentContext(doc), data: { kind: 'document', id: doc.id } };
        })();
      await host.attach(request);
      await toast(host, 'success', `Attached ${request.title} to your message`);
      await host.close();
    } catch (error) {
      await toast(host, 'error', error instanceof LinearError ? writeErrorText(error) : 'Could not attach it. Open a chat first, then try again.');
      setBusy(null);
    }
  };

  const none = !loading && !(issues?.length) && !(projects?.length) && !(documents?.length);
  return (
    <div class="lin-stack">
      <p class="lin-lead">
        Attach a Linear issue, project or document, so the agent can read it.
        {!searching && ' Showing your open issues and this folder\'s projects; type to search all of Linear.'}
      </p>
      <SearchField value={term} onChange={setTerm} placeholder="Search issues, projects and documents" autofocus />
      {busy && <Spinner size="sm" label="Reading it from Linear" />}
      {issues && issues.length > 0 && (
        <div class="lin-attach-group">
          <div class="lin-subheading">{searching ? 'Issues' : 'Your open issues'}</div>
          <List ariaLabel="Issues" items={issues.map(issueItem)} onSelect={(id) => { if (!busy) void attach(id); }} />
        </div>
      )}
      {projects && projects.length > 0 && (
        <div class="lin-attach-group">
          <div class="lin-subheading">Projects</div>
          <List ariaLabel="Projects" items={projects.map(projectItem)} onSelect={(id) => { if (!busy) void attach(id); }} />
        </div>
      )}
      {documents && documents.length > 0 && (
        <div class="lin-attach-group">
          <div class="lin-subheading">Documents</div>
          <List ariaLabel="Documents" items={documents.map(documentItem)} onSelect={(id) => { if (!busy) void attach(id); }} />
        </div>
      )}
      {loading && <Spinner label={searching ? 'Searching' : 'Loading'} />}
      {none && (
        <div class="sui-muted sui-small">
          {searching ? 'No issue, project or document matches.' : 'Nothing for this folder yet.'}
        </div>
      )}
    </div>
  );
};

/** The dialog for a project or document chip already on the message: what it is, and a way to open it. */
export const AttachedView = ({ item }: { item: AttachIssueRequest }) => (
  <div class="lin-dialog-body">
    <h2 class="lin-dialog-title">{item.title}</h2>
    <p class="lin-lead">This is attached to your message. The agent reads its text, not the page.</p>
    <div class="lin-form-foot">
      <Button label="Close" variant="ghost" size="sm" onClick={() => { void host.close(); }} />
      {item.url && <Button label="Open in Linear" size="sm" onClick={() => { void host.openUrl(item.url); }} />}
    </div>
  </div>
);

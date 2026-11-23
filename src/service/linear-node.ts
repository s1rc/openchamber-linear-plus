// Linear from the service, with the optional personal API key. Read-only: the service never writes to Linear.
import { all, MY_FILTERS, OPEN, scopeFilter } from '../shared/filters.ts';
import { BRANCH_ISSUE, DOCUMENTS, DOCUMENT, ISSUE_DETAIL, MENTION_ISSUE, MENTION_SEARCH, PROJECT_DETAIL, PROJECTS, STATUS_MINE, TEAMS } from '../shared/queries.ts';
import { documentContext, projectContext } from '../shared/attach-text.ts';
import { issueContext } from '../shared/issue-context.ts';
import type { DocumentResult, DocumentsResult, IssueDetailResult, ProjectDetailResult, ProjectsResult, ProjectSummary, StatusMineResult, Team } from '../shared/types.ts';
import { toSnapDoc, toSnapIssue, toSnapProject } from './snapshot.ts';
import { issueOfBranch } from './directories.ts';
import type { DirSnapshot, MappingConfig, SnapIssue } from './types.ts';

export type Gql = <T>(query: string, variables?: Record<string, unknown>) => Promise<T>;

const ENDPOINT = 'https://api.linear.app/graphql';

/** A personal API key goes in the header as it is, with no `Bearer`. */
export const createGql = (key: string, fetchImpl: typeof fetch = fetch): Gql => async <T,>(query: string, variables: Record<string, unknown> = {}): Promise<T> => {
  const response = await fetchImpl(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: key },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10_000),
  });
  const text = await response.text();
  let parsed: { data?: T; errors?: { message?: string }[] };
  try {
    parsed = JSON.parse(text) as typeof parsed;
  } catch {
    throw new Error(`Linear answered HTTP ${response.status} with something unreadable.`);
  }
  if (parsed.errors?.length) throw new Error(parsed.errors[0]?.message ?? 'Linear refused the request.');
  if (!response.ok || !parsed.data) throw new Error(`Linear answered HTTP ${response.status}.`);
  return parsed.data;
};

const ACTIVE_STATUS = { type: { nin: ['completed', 'canceled'] } };

/** The branch's issue, with its description, by key. Null when Linear has none by that key. */
export const fetchBranchIssue = async (gql: Gql, identifier: string): Promise<SnapIssue | null> => {
  const [teamKey, number] = identifier.split('-');
  const data = await gql<{ issues: { nodes: { identifier: string; title: string; url: string; description: string | null; state: { name: string } }[] } }>(
    BRANCH_ISSUE,
    { filter: { team: { key: { eqIgnoreCase: teamKey } }, number: { eq: Number(number) } } },
  );
  const issue = data.issues.nodes[0];
  return issue ? { identifier: issue.identifier, title: issue.title, state: issue.state.name, url: issue.url, description: issue.description ?? undefined } : null;
};

/**
 * Everything the service caches for one mapped folder, read from Linear: the mapped teams, the mapped projects
 * and the active projects of the mapped teams, those projects' documents, and my open issues in scope.
 */
export const refreshFromLinear = async (gql: Gql, mapping: MappingConfig, branch: string | null, now: number): Promise<DirSnapshot> => {
  const teamIds = mapping.teamIds;
  const projectIds = mapping.linearProjectIds;
  const [teams, byId, byTeam] = await Promise.all([
    gql<{ teams: { nodes: Team[] } }>(TEAMS),
    projectIds.length ? gql<ProjectsResult>(PROJECTS, { after: null, filter: { id: { in: [...projectIds].sort() } } }) : Promise.resolve({ projects: { nodes: [] as ProjectSummary[] } }),
    teamIds.length
      ? gql<ProjectsResult>(PROJECTS, { after: null, filter: { accessibleTeams: { some: { id: { in: [...teamIds].sort() } } }, status: ACTIVE_STATUS } })
      : Promise.resolve({ projects: { nodes: [] as ProjectSummary[] } }),
  ]);
  const seen = new Set<string>();
  const summaries = [...byId.projects.nodes, ...byTeam.projects.nodes].filter((p) => (seen.has(p.id) ? false : (seen.add(p.id), true)));
  const scope = scopeFilter(teamIds, projectIds);
  const [docs, mine] = await Promise.all([
    summaries.length ? gql<DocumentsResult>(DOCUMENTS, { filter: { project: { id: { in: summaries.map((p) => p.id).slice(0, 50) } } } }) : Promise.resolve({ documents: { nodes: [] } }),
    scope ? gql<StatusMineResult>(STATUS_MINE, { filter: all(OPEN, MY_FILTERS.assigned, scope) }) : Promise.resolve({ issues: { nodes: [] } }),
  ]);
  const myIssues = mine.issues.nodes.map(toSnapIssue);
  const documents = docs.documents.nodes.map((d) => toSnapDoc(d));
  const identifier = issueOfBranch(branch);
  let branchIssue: SnapIssue | null = null;
  if (identifier) {
    try {
      branchIssue = await fetchBranchIssue(gql, identifier);
    } catch {
      branchIssue = null;
    }
  }
  return {
    at: now,
    source: 'key',
    teams: teams.teams.nodes.filter((t) => teamIds.includes(t.id)).map((t) => ({ id: t.id, key: t.key, name: t.name })),
    teamKeys: teams.teams.nodes.map((t) => t.key),
    projects: summaries.map((p) => toSnapProject(p)),
    documents,
    myIssues,
    branchIssue,
  };
};

/** A project's overview, fresh from Linear. */
export const fetchProjectText = async (gql: Gql, id: string): Promise<string> =>
  projectContext((await gql<ProjectDetailResult>(PROJECT_DETAIL, { id })).project);

/** A document's content, fresh from Linear. */
export const fetchDocText = async (gql: Gql, id: string): Promise<string> =>
  documentContext((await gql<DocumentResult>(DOCUMENT, { id })).document);

type MentionNode = { identifier: string; title: string; url: string; state: { name: string } };

/** Issues for an `@` query, fresh from Linear: the one a typed key names, else Linear's search for the words. */
export const searchMentionIssues = async (gql: Gql, query: string, key: string | null): Promise<SnapIssue[]> => {
  if (key) {
    const data = await gql<{ issue: MentionNode | null }>(MENTION_ISSUE, { id: key });
    return data.issue ? [toSnapIssue(data.issue)] : [];
  }
  if (query.trim().length < 2) return [];
  return (await gql<{ searchIssues: { nodes: MentionNode[] } }>(MENTION_SEARCH, { term: query.trim() })).searchIssues.nodes.map(toSnapIssue);
};

/** An issue as an attached issue reads, fresh from Linear. */
export const fetchIssueText = async (gql: Gql, identifier: string): Promise<string> =>
  issueContext((await gql<IssueDetailResult>(ISSUE_DETAIL, { id: identifier })).issue);

// Runs every read query once through the host's Linear connection, to confirm the live API answers
// what `queries.ts` asks for. Read-only: no mutation is ever sent from here.
import { gql } from './linear.ts';
import * as Q from './queries.ts';
import type {
  DocumentsResult, IssuesResult, ProjectsResult, TeamsResult,
} from './types.ts';

export type ProbeResult = { name: string; ok: boolean; detail: string };

const count = (value: unknown): string => {
  if (value && typeof value === 'object') {
    for (const inner of Object.values(value)) {
      if (inner && typeof inner === 'object' && 'nodes' in inner && Array.isArray((inner as { nodes: unknown[] }).nodes)) {
        return `${(inner as { nodes: unknown[] }).nodes.length} rows`;
      }
    }
  }
  return 'answered';
};

export const runProbe = async (onResult: (result: ProbeResult) => void): Promise<void> => {
  const step = async <T>(name: string, query: string, variables?: Record<string, unknown>): Promise<T | null> => {
    try {
      const data = await gql<T>(query, variables);
      onResult({ name, ok: true, detail: count(data) });
      return data;
    } catch (error) {
      onResult({ name, ok: false, detail: error instanceof Error ? error.message : String(error) });
      return null;
    }
  };

  await step('Viewer', Q.VIEWER);
  const teams = await step<TeamsResult>('Teams', Q.TEAMS);
  const team = teams?.teams?.nodes?.[0];
  await step('Workflow states', Q.WORKFLOW_STATES);
  await step('Workspace labels', Q.WORKSPACE_LABELS);
  if (team) {
    await step('Team people', Q.TEAM_PEOPLE, { teamId: team.id });
    await step('Team cycles', Q.TEAM_CYCLES, { teamId: team.id, minNumber: 1 });
    await step('Team projects', Q.PROJECTS, { after: null, filter: { accessibleTeams: { some: { id: { eq: team.id } } }, status: { type: { nin: ['completed', 'canceled'] } } } });
  }
  await step('Repository merge requests', Q.REPO_ATTACHMENTS, { url: 'gitlab.com/' });
  const projects = await step<ProjectsResult>('Projects', Q.PROJECTS, { filter: { status: { type: { nin: ['completed', 'canceled'] } } } });
  const project = projects?.projects?.nodes?.[0];
  if (project) {
    await step('Project detail', Q.PROJECT_DETAIL, { id: project.id });
    await step<DocumentsResult>('Documents', Q.DOCUMENTS, { filter: { project: { id: { eq: project.id } } } });
  }
  const issues = await step<IssuesResult>('My issues', Q.ISSUES, { filter: { assignee: { isMe: { eq: true } } } });
  const issue = issues?.issues?.nodes?.[0];
  if (issue) {
    await step('Issue detail', Q.ISSUE_DETAIL, { id: issue.identifier });
    await step('Issues by identifier', Q.issuesByIdentifier([issue.identifier]));
  }
  await step('Notifications', Q.NOTIFICATIONS);
  await step('Search issues', Q.SEARCH_ISSUES, { term: 'bug' });
  await step('Search projects', Q.SEARCH_PROJECTS, { term: 'a' });
  await step('Search documents', Q.SEARCH_DOCUMENTS, { term: 'a' });
};

// What a frame tells the service about the open folder, so agent instructions and `@` rows stay current when no
// Linear API key is set. Best effort: a missing or older service just means the service knows less.
import { api } from '@openchamber-ext/shared-ui';
import { toSnapDoc, toSnapIssue, toSnapProject } from '../service/snapshot.ts';
import type { SnapshotPush } from '../service/types.ts';
import { projectContext } from './attach-text.ts';
import { host } from './host.ts';
import type { DocumentSummary, ProjectDetail, ProjectSummary, StatusMineIssue, Team } from './types.ts';

const RESEND_MS = 5 * 60_000;
const sent = new Map<string, { signature: string; at: number }>();

/** Sends a push unless the same one went a few minutes ago. Never throws. */
export const pushSnapshot = async (push: SnapshotPush): Promise<void> => {
  const signature = JSON.stringify(push);
  const slot = `${push.directory}|${Object.keys(push).sort().join(',')}`;
  const last = sent.get(slot);
  if (last && last.signature === signature && Date.now() - last.at < RESEND_MS) return;
  sent.set(slot, { signature, at: Date.now() });
  await api(host, 'POST', '/snapshot', { body: push, name: 'Linear' });
};

/** The push for a folder from what a frame has loaded: its mapped teams and projects and my open issues there. */
export const folderPush = (directory: string, teams: readonly Team[], projects: readonly ProjectSummary[], mine: readonly StatusMineIssue[], workspaceTeams: readonly Pick<Team, 'key'>[] = []): SnapshotPush => ({
  directory,
  teamKeys: workspaceTeams.map((t) => t.key),
  teams: teams.map((t) => ({ id: t.id, key: t.key, name: t.name })),
  projects: projects.map((p) => toSnapProject(p)),
  myIssues: mine.map(toSnapIssue),
});

/** The push for one project's overview, with the text an agent reads and the project's documents. */
export const projectPush = (directory: string, project: ProjectDetail): SnapshotPush => ({
  directory,
  moreProjects: [toSnapProject(project, projectContext(project))],
  documents: project.documents.nodes.map((d: DocumentSummary) => toSnapDoc({ ...d, project: { id: project.id, name: project.name } })),
});

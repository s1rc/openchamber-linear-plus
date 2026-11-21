// What a frame pushes with `POST /snapshot` and `PUT /config`, checked and merged. Frames are ours, but the
// service answers whatever arrives: every field is read as untrusted and clipped. Pure.
import type { DocumentSummary, ProjectSummary, StatusMineIssue } from '../shared/types.ts';
import type { AgentDefaults, Config, DirSnapshot, FinishComments, MappingConfig, SnapDoc, SnapIssue, SnapProject, SnapshotPush, SnapTeam } from './types.ts';

export const PROJECTS_MAX = 100;
export const DOCUMENTS_MAX = 200;
export const ISSUES_MAX = 50;
const TEXT_MAX = 15_000;

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const text = (value: unknown, max: number): string | null => (typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null);
const strings = (value: unknown, max: number, each = 80): string[] =>
  Array.isArray(value) ? value.map((v) => text(v, each)).filter((v): v is string => v !== null).slice(0, max) : [];
const optional = <T,>(key: string, value: T | null | undefined): Record<string, T> => (value === null || value === undefined ? {} : { [key]: value });

const team = (raw: unknown): SnapTeam | null => {
  if (!isObject(raw)) return null;
  const id = text(raw.id, 80);
  const key = text(raw.key, 12);
  const name = text(raw.name, 120);
  return id && key && name ? { id, key, name } : null;
};

const project = (raw: unknown): SnapProject | null => {
  if (!isObject(raw)) return null;
  const id = text(raw.id, 80);
  const name = text(raw.name, 160);
  const url = text(raw.url, 400);
  if (!id || !name || !url) return null;
  const progress = typeof raw.progress === 'number' && Number.isFinite(raw.progress) ? Math.max(0, Math.min(1, raw.progress)) : 0;
  return {
    id, name, url,
    status: text(raw.status, 60) ?? '',
    health: text(raw.health, 20),
    progress,
    targetDate: text(raw.targetDate, 30),
    teams: strings(raw.teams, 10, 12),
    ...optional('text', text(raw.text, TEXT_MAX)),
  };
};

const doc = (raw: unknown): SnapDoc | null => {
  if (!isObject(raw)) return null;
  const id = text(raw.id, 80);
  const title = text(raw.title, 200);
  const url = text(raw.url, 400);
  if (!id || !title || !url) return null;
  return { id, title, url, project: text(raw.project, 160), ...optional('text', text(raw.text, TEXT_MAX)) };
};

const issue = (raw: unknown): SnapIssue | null => {
  if (!isObject(raw)) return null;
  const identifier = text(raw.identifier, 20)?.toUpperCase();
  if (!identifier || !/^[A-Z][A-Z0-9]{0,6}-\d{1,9}$/.test(identifier)) return null;
  return {
    identifier,
    title: text(raw.title, 200) ?? '',
    state: text(raw.state, 60) ?? '',
    ...optional('url', text(raw.url, 400)),
    ...optional('description', text(raw.description, 1000)),
  };
};

const list = <T,>(raw: unknown, read: (item: unknown) => T | null, max: number): T[] =>
  Array.isArray(raw) ? raw.map(read).filter((v): v is T => v !== null).slice(0, max) : [];

/** A push as the service reads it, or null when it names no folder. */
export const readPush = (raw: unknown): SnapshotPush | null => {
  if (!isObject(raw)) return null;
  const directory = text(raw.directory, 1000);
  if (!directory) return null;
  const push: SnapshotPush = { directory };
  if ('teams' in raw) push.teams = list(raw.teams, team, 20);
  if ('teamKeys' in raw) push.teamKeys = strings(raw.teamKeys, 300, 12);
  if ('projects' in raw) push.projects = list(raw.projects, project, PROJECTS_MAX);
  if ('moreProjects' in raw) push.moreProjects = list(raw.moreProjects, project, PROJECTS_MAX);
  if ('documents' in raw) push.documents = list(raw.documents, doc, DOCUMENTS_MAX);
  if ('myIssues' in raw) push.myIssues = list(raw.myIssues, issue, ISSUES_MAX);
  if ('branchIssue' in raw) push.branchIssue = raw.branchIssue === null ? null : issue(raw.branchIssue);
  return push;
};

export const emptySnapshot = (now: number): DirSnapshot => ({ at: now, source: 'frame', teams: [], projects: [], documents: [], myIssues: [], branchIssue: null });

/**
 * Folds a push into what the service held. Projects, teams and issues replace the old list when the push has
 * them; documents merge by id, because each frame knows only the documents of the project it shows.
 */
export const mergePush = (current: DirSnapshot | undefined, push: SnapshotPush, now: number): DirSnapshot => {
  const base = current ?? emptySnapshot(now);
  const documents = push.documents
    ? [...push.documents, ...base.documents.filter((d) => !push.documents!.some((n) => n.id === d.id))].slice(0, DOCUMENTS_MAX)
    : base.documents;
  // A frame that held a project's full overview keeps it when a later push has only the summary.
  const replaced = push.projects
    ? push.projects.map((p) => (p.text ? p : { ...p, ...optional('text', base.projects.find((b) => b.id === p.id)?.text) }))
    : base.projects;
  const projects = push.moreProjects
    ? [...push.moreProjects, ...replaced.filter((p) => !push.moreProjects!.some((n) => n.id === p.id))].slice(0, PROJECTS_MAX)
    : replaced;
  return {
    at: now,
    source: 'frame',
    teams: push.teams ?? base.teams,
    teamKeys: push.teamKeys ?? base.teamKeys ?? [],
    projects,
    documents,
    myIssues: push.myIssues ?? base.myIssues,
    branchIssue: push.branchIssue === undefined ? base.branchIssue : push.branchIssue,
  };
};

const mapping = (raw: unknown): MappingConfig | null => {
  if (!isObject(raw)) return null;
  const directory = text(raw.directory, 1000);
  if (!directory) return null;
  const finish: FinishComments = raw.finishComments === 'draft' ? 'draft' : 'off';
  return {
    directory,
    teamIds: strings(raw.teamIds, 20, 80),
    linearProjectIds: strings(raw.linearProjectIds, 50, 80),
    activeProjectId: text(raw.activeProjectId, 80) ?? 'all',
    finishComments: finish,
    ...optional('buildAgent', text(raw.buildAgent, 64)),
    ...optional('buildModel', text(raw.buildModel, 200)),
    ...optional('planAgent', text(raw.planAgent, 64)),
    ...optional('planModel', text(raw.planModel, 200)),
    ...(raw.postPlan === true ? { postPlan: true } : {}),
    ...(raw.reviewMode === 'mr' || raw.reviewMode === 'auto' ? { reviewMode: raw.reviewMode } : {}),
    ...optional('aiReviewers', text(raw.aiReviewers, 200)),
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : 0,
  };
};

/** The plan and build agent and model set for every folder, or nothing. */
export const readDefaults = (raw: unknown): AgentDefaults | undefined => {
  if (!isObject(raw)) return undefined;
  const defaults: AgentDefaults = {
    ...optional('planAgent', text(raw.planAgent, 64)),
    ...optional('planModel', text(raw.planModel, 200)),
    ...optional('buildAgent', text(raw.buildAgent, 64)),
    ...optional('buildModel', text(raw.buildModel, 200)),
  };
  return Object.keys(defaults).length ? defaults : undefined;
};

/** The mappings of a `PUT /config` body, keyed by their own directory, and the defaults for every folder. Null when the body is not a config. */
export const readConfig = (raw: unknown): Config | null => {
  if (!isObject(raw) || !isObject(raw.directories)) return null;
  const directories: Record<string, MappingConfig> = {};
  for (const value of Object.values(raw.directories)) {
    const read = mapping(value);
    if (read) directories[read.directory] = read;
  }
  const defaults = readDefaults(raw.defaults);
  return defaults ? { directories, defaults } : { directories };
};

/** The team keys a folder's branch may name: its mapped teams, the teams of its mapped projects, and every team of the workspace when a frame has said so. */
export const knownTeamKeys = (snapshot: DirSnapshot | undefined): string[] => {
  const keys = new Set<string>();
  for (const t of snapshot?.teams ?? []) keys.add(t.key.toUpperCase());
  for (const k of snapshot?.teamKeys ?? []) keys.add(k.toUpperCase());
  for (const p of snapshot?.projects ?? []) for (const k of p.teams) keys.add(k.toUpperCase());
  return [...keys];
};

// What the frames know in Linear's own shapes, as the snapshot holds it.

export const toSnapProject = (project: ProjectSummary, text?: string): SnapProject => ({
  id: project.id,
  name: project.name,
  url: project.url,
  status: project.status.name,
  health: project.health,
  progress: project.progress,
  targetDate: project.targetDate,
  teams: project.teams.nodes.map((t) => t.key),
  ...(text ? { text } : {}),
});

export const toSnapDoc = (doc: DocumentSummary, text?: string): SnapDoc => ({
  id: doc.id,
  title: doc.title,
  url: doc.url,
  project: doc.project?.name ?? null,
  ...(text ? { text } : {}),
});

export const toSnapIssue = (issue: Pick<StatusMineIssue, 'identifier' | 'title' | 'url'> & { state: { name: string } }): SnapIssue => ({
  identifier: issue.identifier,
  title: issue.title,
  state: issue.state.name,
  url: issue.url,
});

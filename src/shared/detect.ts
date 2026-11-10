// Which Linear team (and optionally projects) owns the open folder. Pure: every outside read comes
// through `DetectEnv`, so tests can run it without a host.
//
// Order: saved mapping, `.linear.json`, repository activity (Linear issues whose merge requests point
// at this repo), then folder, repository and group names. The branch's issue and issues linked to
// sessions describe the user's current work, not the owner, so they only fill `work`.
import type { GuestProjectsSnapshot, GuestSessionsSnapshot, GuestWorktreesSnapshot } from '@openchamber/sdk';
import type { Mapping } from './storage.ts';
import type { IssueRow, ProjectSummary, RepoAttachmentsResult } from './types.ts';

export type DetectEnv = {
  listProjects: () => Promise<GuestProjectsSnapshot | undefined>;
  listWorktrees: (projectId: string) => Promise<GuestWorktreesSnapshot | undefined>;
  listSessions: (projectId: string) => Promise<GuestSessionsSnapshot | undefined>;
  /** A file relative to the open folder, or null when it cannot be read. */
  readFile: (path: string) => Promise<string | null>;
  getMapping: (placeKey: string) => Promise<Mapping | null>;
  getRepo: (placeKey: string) => Promise<Repo | null>;
  setRepo: (placeKey: string, repo: Repo) => Promise<void>;
  issuesByIdentifier: (identifiers: string[]) => Promise<IssueRow[]>;
  repoAttachments: (urlPart: string) => Promise<RepoAttachmentsResult['attachments']['nodes']>;
  searchProjects: (term: string) => Promise<ProjectSummary[]>;
  projectsByIds: (ids: string[]) => Promise<ProjectSummary[]>;
};

/** A git remote: `gitlab.com` and `example-org/performance/strength/strength-helm`. */
export type Repo = { host: string; path: string };

/** The open folder, tied to its OpenChamber project when one is known. */
export type Place = {
  /** Storage key for this folder's mapping; shared by a project and all its worktrees. */
  key: string;
  ocProjectId: string | null;
  /** The OpenChamber project's directory (the main checkout), or the folder itself. */
  projectDirectory: string;
  directory: string;
  branch: string | null;
  repo: Repo | null;
  /** Linear issue identifiers linked to this folder's sessions, newest first. */
  linkedIssues: string[];
};

export type DetectionSource = 'mapping' | 'config' | 'repo' | 'name' | 'none';

/** The issue the user is working on here, from the branch or the latest linked session. */
export type Work = { identifier: string; title: string; url: string; teamKey: string; projectName: string | null; from: 'branch' | 'session' };

export type Detection = {
  source: DetectionSource;
  /** True for repo and name: shown with Pin and Change. */
  inferred: boolean;
  /** Plain words for the banner, such as "folder name \"contracts-api\"". */
  evidence: string;
  teamIds: string[];
  projectIds: string[];
  mapping: Mapping | null;
  work: Work | null;
};

export type TeamRef = { id: string; key: string; name: string };

export const NO_DETECTION: Detection = { source: 'none', inferred: false, evidence: '', teamIds: [], projectIds: [], mapping: null, work: null };

/** FNV-1a, for a short stable storage key from a long path. */
const hash = (text: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36);
};

const trimSlash = (path: string) => path.replace(/\/+$/, '');

export const basename = (path: string): string => trimSlash(path).split('/').pop() ?? '';

export const parseHead = (head: string | null): string | null => {
  const match = head?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m);
  return match?.[1] || null;
};

/** `git@host:a/b.git`, `ssh://git@host:22/a/b.git` or `https://host/a/b.git`. */
export const parseRemoteUrl = (url: string): Repo | null => {
  const clean = url.trim().replace(/\.git$/, '').replace(/\/+$/, '');
  const scp = clean.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);
  if (scp) return { host: scp[1]!.toLowerCase(), path: scp[2]! };
  const full = clean.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);
  if (full) return { host: full[1]!.toLowerCase(), path: full[2]! };
  return null;
};

/** The first remote in a git config, preferring `origin`. */
export const repoFromConfig = (config: string | null): Repo | null => {
  if (!config) return null;
  const origin = config.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1];
  const any = config.match(/^\s*url\s*=\s*(\S+)/m)?.[1];
  const url = origin ?? any;
  return url ? parseRemoteUrl(url) : null;
};

/** A merge or pull request url: GitLab `.../-/merge_requests/1`, GitHub `.../pull/1`. */
export const repoFromChangeUrl = (url: string): Repo | null => {
  const gitlab = url.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);
  if (gitlab) return { host: gitlab[1]!.toLowerCase(), path: gitlab[2]! };
  const github = url.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);
  if (github) return { host: github[1]!.toLowerCase(), path: github[2]! };
  return null;
};

const LINEAR_ISSUE_URL = /linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i;

export const resolvePlace = async (env: DetectEnv, directory: string): Promise<Place> => {
  const dir = trimSlash(directory);
  const projects = (await env.listProjects().catch(() => undefined))?.projects ?? [];
  let project = projects.find((p) => trimSlash(p.directory) === dir) ?? null;
  let branch: string | null = null;

  // The folder's own project first; any other project only when the folder is not a project itself.
  for (const candidate of project ? [project] : projects) {
    const worktrees = (await env.listWorktrees(candidate.id).catch(() => undefined))?.worktrees ?? [];
    const match = worktrees.find((w) => trimSlash(w.directory) === dir);
    if (match) {
      project = candidate;
      branch = match.branch || null;
      break;
    }
  }
  if (!branch) branch = parseHead(await env.readFile('.git/HEAD'));

  const key = project ? `p:${project.id}` : `d:${hash(dir)}`;

  const sessions = project ? ((await env.listSessions(project.id).catch(() => undefined))?.sessions ?? []) : [];
  const recent = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);
  const linkedIssues: string[] = [];
  let changeRepo: Repo | null = null;
  for (const session of recent) {
    for (const link of session.links ?? []) {
      const id = link.url.match(LINEAR_ISSUE_URL)?.[1]?.toUpperCase();
      if (id && !linkedIssues.includes(id)) linkedIssues.push(id);
      if (!changeRepo && link.kind === 'change') changeRepo = repoFromChangeUrl(link.url);
    }
    for (const item of session.items) {
      const data = item.data as { identifier?: unknown } | undefined;
      const id = typeof data?.identifier === 'string' ? data.identifier.toUpperCase() : null;
      if (id && !linkedIssues.includes(id)) linkedIssues.push(id);
    }
  }

  // A worktree's `.git` is a file, so its config is unreadable here: use what the main checkout saw.
  let repo = repoFromConfig(await env.readFile('.git/config'));
  if (repo) await env.setRepo(key, repo).catch(() => undefined);
  else repo = (await env.getRepo(key).catch(() => null)) ?? changeRepo;

  return {
    key,
    ocProjectId: project?.id ?? null,
    projectDirectory: project ? trimSlash(project.directory) : dir,
    directory: dir,
    branch,
    repo,
    linkedIssues: linkedIssues.slice(0, 20),
  };
};

/** Issue identifiers in text whose key is a real team key. */
export const findIdentifiers = (text: string, teamKeys: ReadonlySet<string>): string[] => {
  const found: string[] = [];
  for (const match of text.matchAll(/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6})-(\d+)(?![A-Za-z0-9])/g)) {
    const key = match[1]!.toUpperCase();
    const id = `${key}-${match[2]}`;
    if (teamKeys.has(key) && !found.includes(id)) found.push(id);
  }
  return found;
};

export const normalize = (text: string) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Words that say what kind of repository it is, not whose. */
const GENERIC = new Set(['api', 'app', 'apps', 'web', 'ui', 'service', 'services', 'svc', 'server', 'client', 'helm', 'chart', 'charts',
  'terraform', 'tf', 'infra', 'argo', 'deploy', 'config', 'lib', 'libs', 'sdk', 'core', 'backend', 'frontend', 'mobile', 'ios', 'android', 'worker']);

export type NameCandidate = { text: string; weight: number; label: string };

/** What the folder could be called: its name, the repository's name and words, and its groups. */
export const nameCandidates = (place: Place): NameCandidate[] => {
  const list: NameCandidate[] = [];
  const add = (text: string, weight: number, label: string) => {
    if (normalize(text).length >= 2 && !list.some((c) => normalize(c.text) === normalize(text))) list.push({ text, weight, label });
  };
  const folder = basename(place.projectDirectory);
  const repoName = place.repo ? basename(place.repo.path) : '';
  add(folder, 1, `folder name "${folder}"`);
  if (repoName) add(repoName, 1, `repository "${repoName}"`);
  for (const word of [folder, repoName].join('-').split(/[-_.\s]+/)) {
    if (word.length >= 2 && !GENERIC.has(word.toLowerCase())) add(word, 0.8, `the word "${word}" in the repository name`);
  }
  const groups = place.repo ? place.repo.path.split('/').slice(0, -1).reverse() : [];
  for (const group of groups) {
    if (!GENERIC.has(group.toLowerCase())) add(group, 0.7, `repository group "${group}"`);
  }
  return list;
};

const nameScore = (name: string, candidate: string): number => {
  const n = normalize(name);
  const c = normalize(candidate);
  if (n.length < 3 || c.length < 3) return 0;
  if (n === c) return 3;
  if (n.startsWith(c) || c.startsWith(n)) return 2;
  if (n.includes(c) || c.includes(n)) return 1;
  return 0;
};

const MATCH_MIN = 1.4;

export type NameMatch<T> = { item: T; score: number; label: string };

/** Best item for the candidates: an exact name, then a prefix, then a key equal to a word. */
export const matchByName = <T extends { name: string; key?: string }>(candidates: NameCandidate[], items: T[]): NameMatch<T> | null => {
  let best: NameMatch<T> | null = null;
  for (const item of items) {
    for (const candidate of candidates) {
      let score = nameScore(item.name, candidate.text) * candidate.weight;
      if (item.key && item.key.toLowerCase() === candidate.text.toLowerCase() && item.key.length >= 2) {
        score = Math.max(score, 2.5 * candidate.weight);
      }
      if (score >= MATCH_MIN && (!best || score > best.score)) best = { item, score, label: candidate.label };
    }
  }
  return best;
};

const isActive = (p: ProjectSummary) => p.status.type !== 'completed' && p.status.type !== 'canceled';

/** Fewer issues than this with merge requests in the repo is not enough to name an owner. */
export const REPO_ISSUES_MIN = 3;

const findWork = async (env: DetectEnv, place: Place, teamKeys: ReadonlySet<string>): Promise<Work | null> => {
  const fromBranch = place.branch ? findIdentifiers(place.branch, teamKeys).slice(0, 3) : [];
  const fromSessions = place.linkedIssues.slice(0, 1);
  const ids = [...fromBranch, ...fromSessions.filter((id) => !fromBranch.includes(id))];
  if (!ids.length) return null;
  const issues = await env.issuesByIdentifier(ids).catch(() => []);
  for (const id of ids) {
    const issue = issues.find((i) => i.identifier === id);
    if (issue) {
      return {
        identifier: issue.identifier, title: issue.title, url: issue.url, teamKey: issue.team.key,
        projectName: issue.project?.name ?? null, from: fromBranch.includes(id) ? 'branch' : 'session',
      };
    }
  }
  return null;
};

type RepoConfig = { projects?: unknown; project?: unknown; teams?: unknown; team?: unknown };

const strings = (...values: unknown[]): string[] =>
  values.flatMap((v) => (Array.isArray(v) ? v : v === undefined ? [] : [v])).filter((v): v is string => typeof v === 'string');

const unique = <T,>(list: T[]) => [...new Set(list)];

const fromConfig = async (env: DetectEnv, raw: string, teams: TeamRef[]): Promise<{ teamIds: string[]; projectIds: string[] } | null> => {
  let config: RepoConfig;
  try { config = JSON.parse(raw) as RepoConfig; } catch { return null; }
  const teamIds = strings(config.teams, config.team)
    .map((ref) => teams.find((t) => t.id === ref || t.key.toLowerCase() === ref.toLowerCase())?.id)
    .filter((id): id is string => Boolean(id));
  const projectIds: string[] = [];
  for (const ref of strings(config.projects, config.project)) {
    const value = ref.trim();
    const slug = value.match(/linear\.app\/[^/]+\/project\/([^/?#]+)/i)?.[1]?.split('-').pop();
    const byId = await env.projectsByIds([slug ?? value]).catch(() => []);
    const hit = byId[0] ?? (await env.searchProjects(value).catch(() => [])).find((p) => p.name.toLowerCase() === value.toLowerCase());
    if (hit) projectIds.push(hit.id);
  }
  return teamIds.length || projectIds.length ? { teamIds: unique(teamIds), projectIds: unique(projectIds) } : null;
};

export const detect = async (env: DetectEnv, place: Place, teams: TeamRef[]): Promise<Detection> => {
  const teamKeys = new Set(teams.map((t) => t.key.toUpperCase()));
  const work = await findWork(env, place, teamKeys);
  const result = (rest: Omit<Detection, 'work'>): Detection => ({ ...rest, work });

  // 1. Remembered mapping.
  const mapping = await env.getMapping(place.key);
  if (mapping && (mapping.linearProjectIds.length || mapping.teamIds.length)) {
    return result({ source: 'mapping', inferred: false, evidence: 'saved for this folder', teamIds: mapping.teamIds, projectIds: mapping.linearProjectIds, mapping });
  }

  // 2. Repo config file.
  const raw = await env.readFile('.linear.json');
  if (raw) {
    const config = await fromConfig(env, raw, teams);
    if (config) return result({ source: 'config', inferred: false, evidence: '.linear.json', ...config, mapping: null });
  }

  // 3. Repository activity: whose issues have merge requests in this repo.
  if (place.repo) {
    const attachments = await env.repoAttachments(`${place.repo.host}/${place.repo.path}/`).catch(() => []);
    const issues = new Map<string, { team: string; project: string | null }>();
    for (const a of attachments) if (a.issue) issues.set(a.issue.id, { team: a.issue.team.id, project: a.issue.project?.id ?? null });
    const byTeam = new Map<string, number>();
    for (const { team } of issues.values()) byTeam.set(team, (byTeam.get(team) ?? 0) + 1);
    const top = [...byTeam.entries()].sort((a, b) => b[1] - a[1])[0];
    if (top && top[1] >= REPO_ISSUES_MIN) {
      const byProject = new Map<string, number>();
      for (const { team, project } of issues.values()) if (team === top[0] && project) byProject.set(project, (byProject.get(project) ?? 0) + 1);
      const topProject = [...byProject.entries()].sort((a, b) => b[1] - a[1])[0];
      const projectIds = topProject && topProject[1] >= REPO_ISSUES_MIN && topProject[1] / top[1] >= 0.6 ? [topProject[0]] : [];
      return result({
        source: 'repo', inferred: true, evidence: `${top[1]} issues with merge requests in ${basename(place.repo.path)}`,
        teamIds: [top[0]], projectIds, mapping: null,
      });
    }
  }

  // 4. Names: teams first, then active projects found by searching the folder's name.
  const candidates = nameCandidates(place);
  const team = matchByName(candidates, teams);
  if (team) return result({ source: 'name', inferred: true, evidence: team.label, teamIds: [team.item.id], projectIds: [], mapping: null });

  const term = candidates[0]?.text;
  if (term) {
    const found = (await env.searchProjects(term).catch(() => [])).filter(isActive);
    const project = matchByName(candidates, found);
    if (project) return result({ source: 'name', inferred: true, evidence: project.label, teamIds: [], projectIds: [project.item.id], mapping: null });
  }

  return result({ source: 'none', inferred: false, evidence: '', teamIds: [], projectIds: [], mapping: null });
};

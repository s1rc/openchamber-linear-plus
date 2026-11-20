import { describe, expect, test } from 'bun:test';
import {
  detect, findIdentifiers, matchByName, nameCandidates, parseHead, parseRemoteUrl, repoFromChangeUrl, repoFromConfig,
  resolvePlace, type DetectEnv, type Place, type Repo, type TeamRef,
} from '../src/shared/detect.ts';
import type { Mapping } from '../src/shared/storage.ts';
import type { IssueRow, ProjectSummary } from '../src/shared/types.ts';

const project = (id: string, name: string, extra: Partial<ProjectSummary> = {}): ProjectSummary => ({
  id, name, slugId: `s${id.replace(/-/g, '')}`, url: `https://linear.app/acme/project/${name.toLowerCase()}-s${id.replace(/-/g, '')}`, icon: null, color: '',
  health: null, progress: 0, startDate: null, targetDate: null, updatedAt: '2026-11-01T00:00:00Z',
  status: { id: 's', name: 'Started', type: 'started', color: '' }, lead: null, teams: { nodes: [] }, ...extra,
});

const issue = (identifier: string, teamKey: string, projectId: string | null): IssueRow => ({
  id: identifier, identifier, title: `Title ${identifier}`, url: `https://linear.app/acme/issue/${identifier}`,
  team: { id: `t-${teamKey.toLowerCase()}`, key: teamKey }, project: projectId ? { id: projectId, name: `Project ${projectId}` } : null,
} as IssueRow);

// Mirrors the workspace in the bug report: AppSec works across other teams' repositories.
const teams: TeamRef[] = [
  { id: 't-appsec', key: 'APPSEC', name: 'AppSec' },
  { id: 't-sc', key: 'SC', name: 'Strength & Conditioning' },
  { id: 't-con', key: 'CON', name: 'Contracts' },
  { id: 't-gm', key: 'GM', name: 'Game Management' },
  { id: 't-str', key: 'STR', name: 'Strike' },
];

const projects = [project('p-wiz', 'PoC Wiz Code'), project('p-checkout', 'Checkout'), project('p-old', 'Old Checkout', { status: { id: 'x', name: 'Done', type: 'completed', color: '' } })];

type Attachment = { url: string; issue: { id: string; identifier: string; team: { id: string }; project: { id: string } | null } };

type Fake = {
  projects?: { id: string; name: string; directory: string }[];
  worktrees?: Record<string, { directory: string; name: string; branch: string; status: 'ready' }[]>;
  sessions?: Record<string, { links?: { url: string; kind?: 'issue' | 'change' }[]; items?: { id: string; data?: unknown }[]; updatedAt: number }[]>;
  files?: Record<string, string>;
  mappings?: Record<string, Mapping>;
  repos?: Record<string, Repo>;
  issues?: IssueRow[];
  attachments?: Attachment[];
};

const envOf = (fake: Fake): DetectEnv & { saved: Record<string, Repo> } => {
  const saved: Record<string, Repo> = { ...fake.repos };
  return {
    saved,
    listProjects: async () => ({ kind: 'projects', state: 'ready', projects: fake.projects ?? [] }),
    listWorktrees: async (projectId) => ({ kind: 'worktrees', projectId, state: 'ready', worktrees: fake.worktrees?.[projectId] ?? [] }),
    listSessions: async (projectId) => ({
      kind: 'sessions', projectId, state: 'ready', coverage: [],
      sessions: (fake.sessions?.[projectId] ?? []).map((s, i) => ({
        id: `ses${i}`, title: '', projectId, directory: '', parentId: null, createdAt: 0, updatedAt: s.updatedAt, archivedAt: null,
        worktree: null, activity: 'idle', outcome: null, items: s.items ?? [],
        links: (s.links ?? []).map((l) => ({ url: l.url, title: '', kind: l.kind ?? 'issue', linkedAt: 0 })),
      })),
    }),
    readFile: async (path) => fake.files?.[path] ?? null,
    getMapping: async (key) => fake.mappings?.[key] ?? null,
    getRepo: async (key) => saved[key] ?? null,
    setRepo: async (key, repo) => { saved[key] = repo; },
    issuesByIdentifier: async (ids) => (fake.issues ?? []).filter((i) => ids.includes(i.identifier)),
    repoAttachments: async (part) => (fake.attachments ?? []).filter((a) => a.url.includes(part)),
    searchProjects: async (term) => projects.filter((p) => p.name.toLowerCase().includes(term.toLowerCase())),
    projectsByIds: async (ids) => projects.filter((p) => ids.includes(p.id) || ids.includes(p.slugId)),
  };
};

const helmRemote = '[remote "origin"]\n\turl = git@gitlab.com:example-org/performance/strength/strength-helm.git\n';
const oc = (name: string) => ({ id: `oc-${name}`, name, directory: `/work/${name}` });
const mr = (repo: string, n: number) => `https://gitlab.com/example-org/performance/strength/${repo}/-/merge_requests/${n}`;
const attachment = (url: string, identifier: string, team: string, projectId: string | null = null): Attachment =>
  ({ url, issue: { id: identifier, identifier, team: { id: team }, project: projectId ? { id: projectId } : null } });

describe('helpers', () => {
  test('parseHead reads the branch', () => {
    expect(parseHead('ref: refs/heads/matt/appsec-5-wiz\n')).toBe('matt/appsec-5-wiz');
    expect(parseHead('3f2a9c0d')).toBeNull();
  });
  test('remotes in every shape', () => {
    expect(parseRemoteUrl('git@gitlab.com:example-org/performance/strength/strength-helm.git')).toEqual({ host: 'gitlab.com', path: 'example-org/performance/strength/strength-helm' });
    expect(parseRemoteUrl('https://github.com/acme/web.git')).toEqual({ host: 'github.com', path: 'acme/web' });
    expect(parseRemoteUrl('ssh://git@gitlab.example.com:2222/a/b/c.git')).toEqual({ host: 'gitlab.example.com', path: 'a/b/c' });
    expect(repoFromConfig(helmRemote)?.path).toBe('example-org/performance/strength/strength-helm');
  });
  test('merge and pull request urls name their repository', () => {
    expect(repoFromChangeUrl(mr('strength-helm', 181))).toEqual({ host: 'gitlab.com', path: 'example-org/performance/strength/strength-helm' });
    expect(repoFromChangeUrl('https://github.com/acme/web/pull/42')).toEqual({ host: 'github.com', path: 'acme/web' });
    expect(repoFromChangeUrl('https://linear.app/acme/issue/ENG-1')).toBeNull();
  });
  test('findIdentifiers keeps real team keys only', () => {
    const keys = new Set(['APPSEC', 'CON']);
    expect(findIdentifiers('matt/appsec-5-wiz-and-con-7', keys)).toEqual(['APPSEC-5', 'CON-7']);
    expect(findIdentifiers('feature/abc-12', keys)).toEqual([]);
    expect(findIdentifiers('con-1234567x', keys)).toEqual([]);
  });
  test('names: generic words never decide', () => {
    const place = { projectDirectory: '/work/contracts-api', repo: null } as unknown as Place;
    expect(nameCandidates(place).map((c) => c.text)).toEqual(['contracts-api', 'contracts']);
    expect(nameCandidates({ projectDirectory: '/work/gm-api', repo: null } as unknown as Place).map((c) => c.text)).toEqual(['gm-api', 'gm']);
    expect(matchByName(nameCandidates(place), teams)?.item.key).toBe('CON');
  });
  test('names: a team key equal to a word matches', () => {
    const place = { projectDirectory: '/work/gm-api', repo: null } as unknown as Place;
    expect(matchByName(nameCandidates(place), teams)?.item.key).toBe('GM');
  });
  test('names: the repository group finds the owning team', () => {
    const place = { projectDirectory: '/work/strength-helm', repo: { host: 'gitlab.com', path: 'example-org/performance/strength/strength-helm' } } as unknown as Place;
    expect(matchByName(nameCandidates(place), teams)?.item.key).toBe('SC');
  });
});

describe('resolvePlace', () => {
  test('a worktree shares its project key, gives its branch, and reuses the main checkout repo', async () => {
    const env = envOf({
      projects: [oc('strength-helm')],
      worktrees: { 'oc-strength-helm': [{ directory: '/wt/helm-appsec-5', name: 'x', branch: 'matt/appsec-5-wiz', status: 'ready' }] },
      files: { '.git/config': helmRemote },
    });
    const main = await resolvePlace(env, '/work/strength-helm');
    expect(main.repo?.path).toBe('example-org/performance/strength/strength-helm');

    const worktreeEnv = { ...env, readFile: async () => null };
    const tree = await resolvePlace(worktreeEnv, '/wt/helm-appsec-5/');
    expect(tree.key).toBe('p:oc-strength-helm');
    expect(tree.branch).toBe('matt/appsec-5-wiz');
    expect(tree.repo?.path).toBe('example-org/performance/strength/strength-helm');
  });
  test('with no remote, a merge request linked to a session names the repo', async () => {
    const env = envOf({
      projects: [oc('strength-helm')],
      sessions: { 'oc-strength-helm': [{ updatedAt: 1, links: [{ url: mr('strength-helm', 181), kind: 'change' }, { url: 'https://linear.app/acme/issue/APPSEC-5' }] }] },
    });
    const place = await resolvePlace(env, '/work/strength-helm');
    expect(place.repo?.path).toBe('example-org/performance/strength/strength-helm');
    expect(place.linkedIssues).toEqual(['APPSEC-5']);
  });
});

describe('detect', () => {
  const helmEnv = (extra: Partial<Fake> = {}) => envOf({
    projects: [oc('strength-helm')],
    files: { '.git/config': helmRemote, '.git/HEAD': 'ref: refs/heads/matt/appsec-5-wiz' },
    issues: [issue('APPSEC-5', 'APPSEC', 'p-wiz')],
    ...extra,
  });

  test('the bug report: an AppSec branch does not make AppSec the owner', async () => {
    const env = helmEnv({
      attachments: [
        attachment(mr('strength-helm', 181), 'APPSEC-5', 't-appsec', 'p-wiz'),
        attachment(mr('strength-helm', 170), 'SC-10', 't-sc'),
        attachment(mr('strength-helm', 171), 'SC-11', 't-sc'),
        attachment(mr('strength-helm', 172), 'SC-12', 't-sc'),
        attachment(mr('strength', 3297), 'SC-99', 't-sc'),
      ],
    });
    const result = await detect(env, await resolvePlace(env, '/work/strength-helm'), teams);
    expect(result).toMatchObject({ source: 'repo', inferred: true, teamIds: ['t-sc'], projectIds: [], evidence: '3 issues with merge requests in strength-helm' });
    expect(result.work).toMatchObject({ identifier: 'APPSEC-5', projectName: 'Project p-wiz', from: 'branch' });
  });

  test('too little repo activity falls through to names', async () => {
    const env = helmEnv({ attachments: [attachment(mr('strength-helm', 181), 'APPSEC-5', 't-appsec', 'p-wiz')] });
    const result = await detect(env, await resolvePlace(env, '/work/strength-helm'), teams);
    expect(result).toMatchObject({ source: 'name', teamIds: ['t-sc'], evidence: 'the word "strength" in the repository name' });
  });

  test('a dominant project in the owner team comes along', async () => {
    const env = helmEnv({ attachments: [1, 2, 3, 4].map((n) => attachment(mr('strength-helm', n), `SC-${n}`, 't-sc', 'p-checkout')) });
    const result = await detect(env, await resolvePlace(env, '/work/strength-helm'), teams);
    expect(result).toMatchObject({ source: 'repo', teamIds: ['t-sc'], projectIds: ['p-checkout'] });
  });

  test('a saved mapping wins and still reports current work', async () => {
    const mapping: Mapping = { directory: '/work/strength-helm', linearProjectIds: [], teamIds: ['t-sc'], activeProjectId: 't-sc', finishComments: 'off', updatedAt: 1 };
    const env = helmEnv({ mappings: { 'p:oc-strength-helm': mapping } });
    const result = await detect(env, await resolvePlace(env, '/work/strength-helm'), teams);
    expect(result).toMatchObject({ source: 'mapping', teamIds: ['t-sc'] });
    expect(result.work?.identifier).toBe('APPSEC-5');
  });

  test('.linear.json resolves team keys, ids, slugs and names', async () => {
    const env = envOf({ projects: [oc('x')], files: { '.linear.json': JSON.stringify({ team: 'con', projects: ['p-wiz', 'https://linear.app/acme/project/checkout-spcheckout', 'nope'] }) } });
    const result = await detect(env, await resolvePlace(env, '/work/x'), teams);
    expect(result).toMatchObject({ source: 'config', inferred: false, teamIds: ['t-con'], projectIds: ['p-wiz', 'p-checkout'] });
  });

  test('contracts-api maps to the Contracts team by name', async () => {
    const env = envOf({ projects: [oc('contracts-api')] });
    const result = await detect(env, await resolvePlace(env, '/work/contracts-api'), teams);
    expect(result).toMatchObject({ source: 'name', teamIds: ['t-con'], evidence: 'the word "contracts" in the repository name' });
  });

  test('a project name match when no team matches', async () => {
    const env = envOf({ projects: [oc('checkout')] });
    const result = await detect(env, await resolvePlace(env, '/work/checkout'), teams);
    expect(result).toMatchObject({ source: 'name', teamIds: [], projectIds: ['p-checkout'] });
  });

  // Found by hand: `shared-ui` was pinned to a project called "Shared Records Tab/Page" on the word "shared".
  test('a generic word, or a word that only starts a project name, does not pick a project', async () => {
    const records = [...projects, project('p-records', 'Shared Records Tab/Page'), project('p-checkout-flow', 'Checkout Flow Rework')];
    const withRecords = (dir: string) => ({
      ...envOf({ projects: [oc(dir)] }),
      searchProjects: async (term: string) => records.filter((p) => p.name.toLowerCase().includes(term.toLowerCase().split('-')[0]!)),
    });
    for (const dir of ['shared-ui', 'rework-api']) {
      const env = withRecords(dir);
      expect((await detect(env, await resolvePlace(env, `/work/${dir}`), teams)).source).toBe('none');
    }
  });

  test('nothing matches, and the latest linked issue is the current work', async () => {
    const env = envOf({
      projects: [oc('zzz-tool')],
      sessions: { 'oc-zzz-tool': [{ updatedAt: 2, links: [{ url: 'https://linear.app/acme/issue/CON-4/x' }] }] },
      issues: [issue('CON-4', 'CON', null)],
    });
    const result = await detect(env, await resolvePlace(env, '/work/zzz-tool'), teams);
    expect(result.source).toBe('none');
    expect(result.work).toMatchObject({ identifier: 'CON-4', from: 'session' });
  });
});

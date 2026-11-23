// Issues in the composer's `@` menu: the rows (pure), the recent issues a frame pushes, and the service routes.
import { describe, expect, test } from 'bun:test';
import { createApp, type Deps } from '../src/service/app.ts';
import type { Gql } from '../src/service/linear-node.ts';
import { issueMarkdown, keyOf, locateIssue, mentionRows, ROWS_MAX } from '../src/service/mentions.ts';
import { emptyRecent, mergeRecent, OPENED_MAX, readPush, touchesRecent } from '../src/service/snapshot.ts';
import type { Store } from '../src/service/store.ts';
import type { DirSnapshot, RecentIssues, SnapIssue, SnapProject } from '../src/service/types.ts';

const issue = (identifier: string, title: string, extra: Partial<SnapIssue> = {}): SnapIssue => ({ identifier, title, state: 'Backlog', url: `https://linear.app/acme/issue/${identifier}`, ...extra });
const project = (id: string, name: string): SnapProject => ({ id, name, url: `https://linear.app/acme/project/${id}`, status: 'Started', health: null, progress: 0, targetDate: null, teams: ['NIL'] });
const snapshot = (extra: Partial<DirSnapshot> = {}): DirSnapshot => ({ at: 1_000_000, source: 'frame', teams: [], projects: [], documents: [], myIssues: [], branchIssue: null, ...extra });
const recent = (extra: Partial<RecentIssues> = {}): RecentIssues => ({ ...emptyRecent(2_000_000), ...extra });

describe('issue rows in the @ menu', () => {
  const here = snapshot({
    branchIssue: issue('NIL-784', 'Transfer group personnel/gm'),
    myIssues: [issue('NIL-785', 'Migrate gm-api'), issue('NIL-784', 'Transfer group personnel/gm')],
    projects: [project('p1', 'GitLab migration')],
  });
  const other = snapshot({ myIssues: [issue('INF-4327', 'Copy Influencer Terraform')] });
  const rows = (query: string, opts: { recent?: RecentIssues; live?: SnapIssue[] } = {}) =>
    mentionRows(query, [{ snapshot: other, preferred: false }, { snapshot: here, preferred: true }], opts.recent ?? null, opts.live ?? []);

  test('@ alone lists the branch issue first, then your issues, then the folder\'s projects', () => {
    const list = rows('', { recent: recent({ opened: [issue('GM-3928', 'Add hotfix MR approval')] }) });
    expect(list.map((r) => r.id)).toEqual(['issue:NIL-784', 'issue:NIL-785', 'issue:GM-3928', 'issue:INF-4327', 'project:p1']);
    expect(list[0]).toMatchObject({ title: 'NIL-784 Transfer group personnel/gm', subtitle: 'Issue \u00b7 Backlog \u00b7 this branch', url: 'https://linear.app/acme/issue/NIL-784' });
  });

  test('words match the key, title and status; projects still show', () => {
    expect(rows('gm').map((r) => r.id)).toEqual(['issue:NIL-784', 'issue:NIL-785']);
    expect(rows('terraform').map((r) => r.id)).toEqual(['issue:INF-4327']);
    expect(rows('gitlab').map((r) => r.id)).toEqual(['project:p1']);
    expect(rows('nil-785').map((r) => r.id)).toEqual(['issue:NIL-785']);
  });

  test('a typed key is the only row, upper-cased, and offered even when nothing holds it', () => {
    expect(rows('nil-785')[0]).toMatchObject({ id: 'issue:NIL-785', title: 'NIL-785 Migrate gm-api' });
    expect(rows('ENG-1')).toEqual([{ id: 'issue:ENG-1', title: 'ENG-1', subtitle: 'Issue \u00b7 not cached' }]);
    expect(keyOf(' nil-784 ')).toBe('NIL-784');
    expect(keyOf('nil 784')).toBeNull();
  });

  test('what Linear answered comes first, and each key is listed once with the fullest copy', () => {
    const list = rows('migrate', { live: [issue('NIL-820', 'Migrate devops'), issue('NIL-785', 'Migrate gm-api')] });
    expect(list.map((r) => r.id)).toEqual(['issue:NIL-820', 'issue:NIL-785']);
    const filled = mentionRows('nil', [{ snapshot: snapshot({ branchIssue: { identifier: 'NIL-9', title: '', state: '' } }), preferred: true }], recent({ assigned: [issue('NIL-9', 'Nine')] }));
    expect(filled[0]!.title).toBe('NIL-9 Nine');
  });

  test('many matches leave room for projects, and the total stays at 20', () => {
    const many = snapshot({ myIssues: Array.from({ length: 30 }, (_, n) => issue(`NIL-${n + 1}`, `Thing ${n}`)), projects: Array.from({ length: 30 }, (_, n) => project(`p${n}`, `Thing project ${n}`)) });
    const list = mentionRows('thing', [{ snapshot: many, preferred: true }]);
    expect(list.length).toBe(ROWS_MAX);
    expect(list.filter((r) => r.id.startsWith('issue:')).length).toBe(12);
  });
});

describe('issue text for the agent', () => {
  test('a frame\'s full text is used as it is, with the cache time', () => {
    expect(issueMarkdown(issue('NIL-784', 'T', { text: 'NIL-784: T\nFull text.' }), Date.UTC(2026, 10, 23, 9, 5))).toBe('NIL-784: T\nFull text.\n\n(cached at 2026-11-23 09:05 UTC)');
  });
  test('a summary says how to read the rest', () => {
    const text = issueMarkdown(issue('NIL-784', 'Transfer'), null);
    expect(text).toContain('NIL-784: Transfer\nStatus: Backlog.\nLink: https://linear.app/acme/issue/NIL-784');
    expect(text).toContain('Read the issue with your Linear tools');
  });
  test('a bare key gets a link from the workspace key', () => {
    expect(issueMarkdown({ identifier: 'ENG-1', title: '', state: '' }, null, 'acme')).toContain('Linear issue ENG-1\nLink: https://linear.app/acme/issue/ENG-1');
  });
  test('locateIssue finds a key in the snapshots or the recent issues', () => {
    const at = locateIssue('GM-1', [snapshot({ at: 7, myIssues: [issue('GM-1', 'One')] })], null);
    expect(at).toMatchObject({ issue: { identifier: 'GM-1' }, at: 7 });
    expect(locateIssue('GM-2', [], recent({ opened: [issue('GM-2', 'Two', { text: 'x' })] }))).toMatchObject({ issue: { text: 'x' }, at: 2_000_000 });
    expect(locateIssue('GM-3', [], null)).toBeNull();
  });
});

describe('recent issues', () => {
  test('a push carries an opened issue with its text, your assigned issues, and the workspace key', () => {
    const push = readPush({ directory: '(none)', openedIssue: { identifier: 'nil-784', title: 'T', state: 'Backlog', text: 'x'.repeat(20_000) }, assignedIssues: [{ identifier: 'NIL-1', title: 'A', state: 'S' }, { identifier: 'bad' }], orgKey: 'acme' })!;
    expect(push.openedIssue).toMatchObject({ identifier: 'NIL-784' });
    expect(push.openedIssue!.text!.length).toBe(15_000);
    expect(push.assignedIssues).toEqual([{ identifier: 'NIL-1', title: 'A', state: 'S' }]);
    expect(push.orgKey).toBe('acme');
    expect(readPush({ directory: '/r', orgKey: 'not a key/' })!.orgKey).toBeUndefined();
    expect(touchesRecent({ directory: '/r' })).toBe(false);
    expect(touchesRecent(push)).toBe(true);
  });
  test('an opened issue goes first once, the list is capped, and assigned is replaced', () => {
    let held = mergeRecent(undefined, { directory: '/r', openedIssue: issue('A-1', 'a') }, 1);
    held = mergeRecent(held, { directory: '/r', openedIssue: issue('A-2', 'b'), assignedIssues: [issue('A-9', 'z')] }, 2);
    held = mergeRecent(held, { directory: '/r', openedIssue: issue('A-1', 'a2') }, 3);
    expect(held.opened.map((i) => [i.identifier, i.title])).toEqual([['A-1', 'a2'], ['A-2', 'b']]);
    expect(held.assigned.map((i) => i.identifier)).toEqual(['A-9']);
    expect(mergeRecent(held, { directory: '/r', orgKey: 'acme' }, 4)).toMatchObject({ at: 4, orgKey: 'acme', assigned: [{ identifier: 'A-9' }] });
    for (let n = 0; n < OPENED_MAX + 5; n += 1) held = mergeRecent(held, { directory: '/r', openedIssue: issue(`B-${n}`, 'b') }, 5);
    expect(held.opened.length).toBe(OPENED_MAX);
  });
});

describe('service routes', () => {
  const memoryStore = (): Store & { files: Map<string, unknown> } => {
    const files = new Map<string, unknown>();
    return {
      files,
      load: <T,>(name: string, fallback: T) => (files.has(name) ? (JSON.parse(JSON.stringify(files.get(name))) as T) : fallback),
      save: (name, value) => { files.set(name, JSON.parse(JSON.stringify(value))); },
      append: () => undefined,
      exists: () => false,
    };
  };
  const setup = (options: { key?: string; gql?: Gql } = {}) => {
    const store = memoryStore();
    const queries: { query: string; variables?: Record<string, unknown> }[] = [];
    const deps: Deps = {
      host: {
        setInstructions: async () => ({ saved: true }),
        readSettings: async () => (options.key ? { 'api-key': options.key } : {}),
        sessions: {} as Deps['host']['sessions'],
      },
      store,
      read: () => null,
      now: () => 5_000_000,
      gqlFor: () => (async <T,>(query: string, variables?: Record<string, unknown>) => {
        queries.push({ query, variables });
        if (!options.gql) throw new Error('no Linear in this test');
        return options.gql<T>(query, variables);
      }) as Gql,
    };
    const app = createApp(deps);
    const call = async (path: string, body: unknown) => (await app.route('POST', path, new URLSearchParams(), JSON.stringify(body)))?.body as Record<string, any>;
    return { app, store, call, queries };
  };

  test('with no key and no mapped folder, an issue opened in the dashboard is listed and read from the cache', async () => {
    const ctx = setup();
    const pushed = await ctx.call('/snapshot', { directory: '/not/mapped', openedIssue: { identifier: 'NIL-784', title: 'Transfer group personnel/gm', state: 'Backlog', url: 'https://linear.app/acme/issue/NIL-784', text: 'NIL-784: Transfer group personnel/gm\n\n- [ ] M2 finished' } });
    expect(pushed).toEqual({ ok: true, mapped: false });
    expect(ctx.store.files.get('issues.json')).toMatchObject({ opened: [{ identifier: 'NIL-784' }] });
    const found = await ctx.call('/mentions/search', { query: 'transfer', directory: '/somewhere' });
    expect(found.items).toEqual([{ id: 'issue:NIL-784', title: 'NIL-784 Transfer group personnel/gm', subtitle: 'Issue \u00b7 Backlog', url: 'https://linear.app/acme/issue/NIL-784' }]);
    const text = (await ctx.call('/mentions/resolve', { id: 'issue:NIL-784' })).text as string;
    expect(text).toStartWith('NIL-784: Transfer group personnel/gm\n\n- [ ] M2 finished');
    expect(text).toContain('cached at');
    expect(ctx.queries).toEqual([]);
  });

  test('a key nobody cached still resolves to the key and its link', async () => {
    const ctx = setup();
    await ctx.call('/snapshot', { directory: '(none)', orgKey: 'acme' });
    expect((await ctx.call('/mentions/search', { query: 'ops-7', directory: null })).items[0]).toMatchObject({ id: 'issue:OPS-7', subtitle: 'Issue \u00b7 not cached' });
    const text = (await ctx.call('/mentions/resolve', { id: 'issue:OPS-7' })).text as string;
    expect(text).toContain('Linear issue OPS-7');
    expect(text).toContain('https://linear.app/acme/issue/OPS-7');
  });

  const linear: Gql = async <T,>(query: string, variables?: Record<string, unknown>): Promise<T> => {
    if (query.includes('query MentionIssue')) return { issue: variables?.id === 'NIL-784' ? { identifier: 'NIL-784', title: 'Fresh title', url: 'u', state: { name: 'Todo' } } : null } as T;
    if (query.includes('query MentionSearch')) return { searchIssues: { nodes: [{ identifier: 'NIL-820', title: 'Migrate devops', url: 'u', state: { name: 'Backlog' } }] } } as T;
    if (query.includes('query IssueDetail')) {
      return { issue: { identifier: 'NIL-784', title: 'Fresh title', priority: 2, url: 'u', branchName: 'b', description: 'Fresh body.', state: { name: 'Todo' }, team: { name: 'NIL Ops' }, project: null, assignee: null, comments: { nodes: [] } } } as T;
    }
    throw new Error(`unexpected ${query.slice(0, 30)}`);
  };

  test('with a key, a typed key and words are searched in Linear, and a pick reads the issue fresh', async () => {
    const ctx = setup({ key: 'lin_api_x', gql: linear });
    expect((await ctx.call('/mentions/search', { query: 'nil-784', directory: null })).items[0]).toMatchObject({ id: 'issue:NIL-784', title: 'NIL-784 Fresh title', subtitle: 'Issue \u00b7 Todo' });
    expect((await ctx.call('/mentions/search', { query: 'devops', directory: null })).items.map((i: { id: string }) => i.id)).toEqual(['issue:NIL-820']);
    const text = (await ctx.call('/mentions/resolve', { id: 'issue:NIL-784' })).text as string;
    expect(text).toContain('NIL-784: Fresh title');
    expect(text).toContain('Fresh body.');
    expect(text).not.toContain('cached at');
    expect(ctx.queries.every((q) => !/\bmutation\b/.test(q.query))).toBe(true);
  });

  test('a Linear that fails or is slow leaves the answer to the cache', async () => {
    const slow: Gql = () => new Promise(() => undefined);
    const ctx = setup({ key: 'lin_api_x', gql: slow });
    await ctx.call('/snapshot', { directory: '(none)', assignedIssues: [{ identifier: 'NIL-785', title: 'Migrate gm-api', state: 'Backlog' }] });
    await ctx.call('/mentions/search', { query: 'x', directory: null });
    const started = Date.now();
    const found = await ctx.call('/mentions/search', { query: 'migrate', directory: null });
    expect(Date.now() - started).toBeLessThan(1_900);
    expect(found.items.map((i: { id: string }) => i.id)).toEqual(['issue:NIL-785']);
    const down = setup({ key: 'lin_api_x', gql: (async () => { throw new Error('down'); }) as Gql });
    await down.call('/snapshot', { directory: '(none)', assignedIssues: [{ identifier: 'NIL-785', title: 'Migrate gm-api', state: 'Backlog' }] });
    expect((await down.call('/mentions/resolve', { id: 'issue:NIL-785' })).text).toContain('NIL-785: Migrate gm-api');
  });
});

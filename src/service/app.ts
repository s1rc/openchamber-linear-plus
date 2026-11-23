// The service's routes and what they do. `createApp` takes everything outside the process (the host, the disk,
// Linear) as arguments, so tests drive it with fakes. The service never writes to Linear, and never posts a
// comment: a draft is posted by a click in a frame.
import {
  MENTIONS_RESOLVE_PATH, MENTIONS_SEARCH_PATH, readSessionEventRequest, SESSION_EVENTS_PATH,
  type GuestSessionEventRequest, type MentionsResolveRequest, type MentionsSearchRequest, type ServiceHost,
} from '@openchamber/sdk';
import type { Choices } from './choices.ts';
import { CLAIM_STALE_MS, parsePlanExtras, type ExtrasState } from '../shared/plan-extras.ts';
import { issueOfBranch, readBranch, resolveMapped, trimDir, type ReadText } from './directories.ts';
import { buildDraft, handoffId, HANDOFFS_MAX, linearIssuesOf, looksLikePlan, PLANS_KEPT, upsertDraft, upsertHandoff, withoutBlocks } from './events.ts';
import { handoffPrompt, PLAN_LIMIT, planPrompt, sessionChoice } from './handoff.ts';
import { buildInstructions } from './instructions.ts';
import { fetchBranchIssue, fetchDocText, fetchIssueText, fetchProjectText, refreshFromLinear, searchMentionIssues, type Gql } from './linear-node.ts';
import { docMarkdown, issueMarkdown, keyOf, locate, locateIssue, mentionRows, projectMarkdown } from './mentions.ts';
import { knownTeamKeys, mergePush, mergeRecent, readConfig, readPush, touchesRecent } from './snapshot.ts';
import type { Store } from './store.ts';
import type { BuildSession, Config, Draft, Handoff, MappingConfig, RecentIssues, SnapIssue, SnapshotStore } from './types.ts';

export type Reply = { status?: number; body: unknown; after?: () => void };

export type Deps = {
  host: Pick<ServiceHost, 'setInstructions' | 'readSettings' | 'sessions'>;
  store: Store;
  read: ReadText;
  now: () => number;
  /** Linear with a personal API key. */
  gqlFor: (key: string) => Gql;
  /** The agents and models OpenCode offers, for Settings. */
  choices?: (directory: string | null) => Choices;
  log?: (line: string) => void;
};

const INSTRUCTIONS_STALE_MS = 5 * 60_000;
const CACHE_STALE_MS = 10 * 60_000;
const KEY_TTL_MS = 60_000;
/** The host gives an `@` search two seconds; Linear gets this much of it, and the cache answers the rest. */
const LIVE_SEARCH_MS = 1_200;
const SEEN_MAX = 50;
const DEBUG_FLAG = 'debug-events';
export const NOT_A_PLAN = 'The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.';
const IDENTIFIER = /^[A-Za-z][A-Za-z0-9]{0,6}-\d{1,9}$/;

/** `plans` keeps the latest reply of each planning session that read like a plan, for when a later chat message is the last reply. */
type Handoffs = {
  pending: Handoff[];
  builds: Record<string, BuildSession>;
  plans?: Record<string, { text: string; at: number }>;
  /** The estimate and split-out issues of each planning session, by session id, and how far a frame got writing them. */
  extras?: Record<string, ExtrasState>;
};

const EXTRAS_KEPT = 40;
const EXTRAS_SHOWN_MS = 14 * 24 * 60 * 60_000;

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
const parse = (raw: string): Record<string, unknown> => {
  try {
    const value: unknown = raw ? JSON.parse(raw) : {};
    return isObject(value) ? value : {};
  } catch {
    return {};
  }
};
const fail = (error: string, status = 200): Reply => ({ status, body: { ok: false, error } });
const message = (error: unknown): string => (error instanceof Error ? error.message : String(error)).slice(0, 300);

export const createApp = (deps: Deps) => {
  const { host, store, read, now } = deps;
  const log = deps.log ?? (() => undefined);

  let config = store.load<Config>('config.json', { directories: {} });
  let snapshots = store.load<SnapshotStore>('snapshot.json', {});
  let recent = store.load<RecentIssues | null>('issues.json', null);
  let drafts = store.load<{ drafts: Draft[] }>('drafts.json', { drafts: [] }).drafts;
  let handoffs = store.load<Handoffs>('handoffs.json', { pending: [], builds: {} });
  /** Worktree directories seen in events, to the mapped folder they belong to. They get their own instructions. */
  let worktrees = store.load<Record<string, { mapped: string; at: number }>>('worktrees.json', {});
  const refreshed = new Map<string, number>();
  /** The last text sent for a directory, so an unchanged text is not sent again. */
  const texts = new Map<string, string>();
  const branchIssues = new Map<string, SnapIssue>();
  const seenEvents: string[] = [];
  const starting = new Set<string>();
  let key: { value: string | null; at: number } | null = null;

  const mapped = () => Object.keys(config.directories);
  const mappedFor = (directory: string | null | undefined) => resolveMapped(directory, mapped(), read);

  const saveConfig = () => store.save('config.json', config);
  const saveSnapshots = () => store.save('snapshot.json', snapshots);
  const saveRecent = () => store.save('issues.json', recent);
  const saveDrafts = () => store.save('drafts.json', { drafts });
  const saveHandoffs = () => store.save('handoffs.json', handoffs);
  const saveWorktrees = () => store.save('worktrees.json', worktrees);

  /** The personal API key, read from the host at most once a minute. A missing key is the normal case. */
  const apiKey = async (): Promise<string | null> => {
    if (key && now() - key.at < KEY_TTL_MS) return key.value;
    try {
      const value = (await host.readSettings())['api-key']?.trim() || null;
      key = { value, at: now() };
    } catch {
      key = { value: null, at: now() };
    }
    return key.value;
  };
  /** For the `@` search, which has two seconds: whatever was last read, and a read in the background. */
  const peekKey = (): string | null => {
    if (!key || now() - key.at >= KEY_TTL_MS) void apiKey();
    return key?.value ?? null;
  };

  const refreshCache = async (folder: string, branch: string | null): Promise<void> => {
    const value = await apiKey();
    const mapping = config.directories[folder];
    if (!value || !mapping) return;
    try {
      snapshots[folder] = await refreshFromLinear(deps.gqlFor(value), mapping, branch, now());
      saveSnapshots();
    } catch (error) {
      log(`cache refresh failed for ${folder}: ${message(error)}`);
    }
  };

  const branchIssueFor = async (folder: string, branch: string | null): Promise<SnapIssue | null> => {
    const identifier = issueOfBranch(branch);
    if (!identifier) return null;
    const snapshot = snapshots[folder];
    const keys = knownTeamKeys(snapshot);
    const prefix = identifier.split('-')[0]!;
    if (!keys.includes(prefix)) return null;
    const known = [snapshot?.branchIssue, ...(snapshot?.myIssues ?? [])].find((i) => i?.identifier === identifier) ?? branchIssues.get(identifier);
    if (known) return known;
    const value = await apiKey();
    if (value) {
      try {
        const found = await fetchBranchIssue(deps.gqlFor(value), identifier);
        if (found) {
          branchIssues.set(identifier, found);
          return found;
        }
      } catch (error) {
        log(`branch issue ${identifier} failed: ${message(error)}`);
      }
    }
    return { identifier, title: '', state: '' };
  };

  /** Sets the agent text for one directory of a mapped folder (the folder itself, or a worktree of it). */
  const setText = async (directory: string, folder: string): Promise<void> => {
    const mapping = config.directories[folder];
    if (!mapping) return;
    const snapshot = snapshots[folder];
    const branch = readBranch(directory, read);
    const branchIssue = await branchIssueFor(folder, branch);
    const text = buildInstructions({
      projects: (snapshot?.projects ?? [])
        .filter((p) => mapping.linearProjectIds.includes(p.id))
        .slice(0, 3)
        .map((p) => ({ name: p.name, url: p.url })),
      teamKeys: (snapshot?.teams ?? []).map((t) => t.key),
      branchIssue,
      mine: snapshot?.myIssues ?? [],
    });
    refreshed.set(directory, now());
    if (texts.get(directory) === text) return;
    try {
      await host.setInstructions(directory, text);
      texts.set(directory, text);
    } catch (error) {
      log(`setInstructions failed for ${directory}: ${message(error)}`);
    }
  };

  const clearText = async (directory: string): Promise<void> => {
    try {
      await host.setInstructions(directory, '');
    } catch (error) {
      log(`clearing instructions failed for ${directory}: ${message(error)}`);
    }
    refreshed.delete(directory);
    texts.delete(directory);
  };

  const refreshFolder = async (folder: string, fetchFresh: boolean): Promise<void> => {
    if (fetchFresh) await refreshCache(folder, readBranch(folder, read));
    await setText(folder, folder);
    for (const [dir, info] of Object.entries(worktrees)) if (info.mapped === folder) await setText(dir, folder);
  };

  const rememberWorktree = (directory: string, folder: string) => {
    if (trimDir(directory) === trimDir(folder) || worktrees[directory]) return;
    worktrees[directory] = { mapped: folder, at: now() };
    const entries = Object.entries(worktrees);
    if (entries.length > SEEN_MAX) worktrees = Object.fromEntries(entries.sort((a, b) => b[1].at - a[1].at).slice(0, SEEN_MAX));
    saveWorktrees();
  };

  /** Service start: every mapped folder gets its text, with fresh data when a key is set. */
  const start = async (): Promise<void> => {
    for (const folder of mapped()) {
      try {
        await refreshFolder(folder, true);
      } catch (error) {
        log(`start refresh failed for ${folder}: ${message(error)}`);
      }
    }
  };

  const putConfig = async (raw: string): Promise<Reply> => {
    const next = readConfig(parse(raw));
    if (!next) return fail('Expected { directories: { <folder>: <mapping> } }.', 400);
    const before = config;
    config = next;
    saveConfig();
    const removed = Object.keys(before.directories).filter((d) => !next.directories[d]);
    const changed = Object.keys(next.directories).filter((d) => JSON.stringify(before.directories[d]) !== JSON.stringify(next.directories[d]));
    return {
      body: { hasKey: Boolean(await apiKey()), directories: config.directories },
      after: () => {
        void (async () => {
          for (const folder of removed) {
            await clearText(folder);
            for (const [dir, info] of Object.entries(worktrees)) {
              if (info.mapped !== folder) continue;
              await clearText(dir);
              delete worktrees[dir];
            }
            delete snapshots[folder];
          }
          if (removed.length) { saveWorktrees(); saveSnapshots(); }
          for (const folder of changed) await refreshFolder(folder, true);
        })().catch((error) => log(`config refresh failed: ${message(error)}`));
      },
    };
  };

  const postSnapshot = async (raw: string): Promise<Reply> => {
    const push = readPush(parse(raw));
    if (!push) return fail('Expected a snapshot with a directory.', 400);
    // Opened and assigned issues serve the `@` menu in every folder, mapped or not.
    if (touchesRecent(push)) {
      recent = mergeRecent(recent ?? undefined, push, now());
      saveRecent();
    }
    const folder = mappedFor(push.directory);
    if (!folder) return { body: { ok: true, mapped: false } };
    snapshots[folder] = mergePush(snapshots[folder], push, now());
    saveSnapshots();
    if (trimDir(push.directory) !== trimDir(folder)) rememberWorktree(push.directory, folder);
    try {
      await setText(folder, folder);
      if (trimDir(push.directory) !== trimDir(folder)) await setText(push.directory, folder);
    } catch (error) {
      log(`snapshot refresh failed: ${message(error)}`);
    }
    return { body: { ok: true, mapped: true } };
  };

  // ---- drafts

  const draftsFor = (directory: string | null): Draft[] => {
    if (!directory) return drafts;
    const folder = mappedFor(directory);
    return folder ? drafts.filter((d) => d.directory === folder) : [];
  };

  const postDraft = (raw: string): Reply => {
    const body = parse(raw);
    const id = typeof body.id === 'string' ? body.id : '';
    if (!id || (body.action !== 'posted' && body.action !== 'discard')) return fail("Expected { id, action: 'posted' | 'discard' }.", 400);
    const before = drafts.length;
    drafts = drafts.filter((d) => d.id !== id);
    if (drafts.length !== before) saveDrafts();
    return { body: { ok: true, removed: drafts.length !== before } };
  };

  // ---- handoffs

  const withSetting = (list: Handoff[]): Handoff[] => list.map((h) => ({ ...h, postPlan: config.directories[h.directory]?.postPlan === true }));

  const handoffsFor = (directory: string | null): Handoff[] => {
    if (!directory) return withSetting(handoffs.pending);
    const folder = mappedFor(directory);
    return folder ? withSetting(handoffs.pending.filter((h) => h.directory === folder)) : [];
  };

  const postHandoffs = (raw: string): Reply => {
    const body = parse(raw);
    if (typeof body.action === 'string' && body.action.endsWith('-extras') || body.action === 'extras-done' || body.action === 'extras-failed') return postExtras(body);
    const id = typeof body.id === 'string' ? body.id : '';
    if (!id || body.action !== 'dismiss') return fail("Expected { id, action: 'dismiss' }.", 400);
    const before = handoffs.pending.length;
    handoffs.pending = handoffs.pending.filter((h) => h.id !== id);
    if (handoffs.pending.length !== before) saveHandoffs();
    return { body: { ok: true } };
  };

  // ---- plan extras: written to Linear by a frame, once per planning session

  const extrasFor = (directory: string | null): ExtrasState[] => {
    const folder = directory ? mappedFor(directory) : null;
    if (directory && !folder) return [];
    return Object.values(handoffs.extras ?? {})
      .filter((x) => (!folder || x.directory === folder) && now() - x.at < EXTRAS_SHOWN_MS)
      .sort((a, b) => b.at - a.at)
      .slice(0, 20);
  };

  const keepExtras = (state: ExtrasState) => {
    const all = { ...(handoffs.extras ?? {}), [state.sessionId]: state };
    handoffs.extras = Object.fromEntries(Object.entries(all).sort((x, y) => y[1].at - x[1].at).slice(0, EXTRAS_KEPT));
    saveHandoffs();
  };

  const strings = (value: unknown): string[] => (Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string' && IDENTIFIER.test(v)).slice(0, 20) : []);

  /** `claim-extras` lets one frame write; `extras-done` and `extras-failed` record what it wrote; `retry-extras` lets a failed one run again. */
  const postExtras = (body: Record<string, unknown>): Reply => {
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId : '';
    const current = handoffs.extras?.[sessionId];
    if (!current) return fail('No plan extras for that session.');
    if (body.action === 'claim-extras') {
      const free = current.state === 'pending' || (current.state === 'claimed' && now() - (current.claimedAt ?? 0) > CLAIM_STALE_MS);
      if (!free) return { body: { ok: false, claimed: false, state: current } };
      const claimed: ExtrasState = { ...current, state: 'claimed', claimedAt: now() };
      keepExtras(claimed);
      return { body: { ok: true, claimed: true, state: claimed } };
    }
    if (body.action === 'extras-done' || body.action === 'extras-failed') {
      if (current.state !== 'claimed') return fail('Those extras are not being written.');
      const next: ExtrasState = {
        ...current,
        state: body.action === 'extras-done' ? 'done' : 'failed',
        estimateDone: body.estimateDone === true,
        estimateSet: typeof body.estimateSet === 'number' ? body.estimateSet : null,
        created: strings(body.created),
        ...(body.action === 'extras-failed' ? { error: typeof body.error === 'string' ? body.error.slice(0, 300) : 'Linear refused a write.' } : {}),
      };
      if (body.action === 'extras-done') delete next.error;
      delete next.claimedAt;
      keepExtras(next);
      return { body: { ok: true, state: next } };
    }
    if (body.action === 'retry-extras') {
      if (current.state !== 'failed') return fail('Only extras that failed can run again.');
      const next: ExtrasState = { ...current, state: 'pending' };
      delete next.error;
      keepExtras(next);
      return { body: { ok: true, state: next } };
    }
    return fail('Unknown action.', 400);
  };

  const rememberSession = (sessionId: string, entry: BuildSession) => {
    handoffs.builds[sessionId] = entry;
    const keep = Object.entries(handoffs.builds).sort((x, y) => y[1].createdAt - x[1].createdAt).slice(0, 100);
    handoffs.builds = Object.fromEntries(keep);
  };

  /**
   * The plan of a planning session: its last reply when that reads like a plan, else the latest plan-like reply kept
   * from an earlier turn (the last message may be a chat answer, such as the card for the issue), else the last reply.
   * Display blocks are taken out. Or why there is none.
   */
  const readPlan = async (sessionId: string): Promise<{ plan: string; earlier: boolean; isPlan: boolean } | { error: string }> => {
    const status = await host.sessions.status(sessionId);
    if (status.status === 'busy') return { error: 'The planning session is still working. Start the build when it has finished.' };
    if (status.status === 'waiting') return { error: 'The planning session is waiting for your answer. Answer it first.' };
    const { reply } = await host.sessions.lastReply(sessionId);
    const last = withoutBlocks(reply ?? '');
    if (last && looksLikePlan(last)) return { plan: last, earlier: false, isPlan: true };
    const kept = handoffs.plans?.[sessionId];
    if (kept && looksLikePlan(withoutBlocks(kept.text))) return { plan: withoutBlocks(kept.text), earlier: true, isPlan: true };
    if (!last) return { error: 'The planning session has no reply to build from.' };
    return { plan: last, earlier: false, isPlan: false };
  };

  /**
   * Starts the build session from a planning session's last reply, or with `mode: 'preview'` only reads the plan
   * (and the folder's post-the-plan setting), so a frame can show it and post it before anything starts. The
   * frame moves the issue and opens the session.
   */
  const startBuild = async (raw: string): Promise<Reply> => {
    const body = parse(raw);
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim().slice(0, 120) : '';
    const identifier = typeof body.identifier === 'string' ? body.identifier.trim().toUpperCase() : '';
    if (!sessionId || !IDENTIFIER.test(identifier)) return fail('Expected { sessionId, identifier }.', 400);
    const pending = handoffs.pending.find((h) => h.sessionId === sessionId);
    const sessionDirectory = pending?.sessionDirectory ?? handoffs.builds[sessionId]?.sessionDirectory ?? (typeof body.sessionDirectory === 'string' ? body.sessionDirectory.trim() : '');
    if (!sessionDirectory.startsWith('/')) return fail('The planning session has no folder the service can start a build in.');
    const folder = mappedFor(sessionDirectory);
    const mapping = folder ? config.directories[folder] : undefined;
    if (body.mode === 'preview') {
      try {
        const got = await readPlan(sessionId);
        return { body: 'error' in got ? { ok: false, error: got.error } : { ok: true, plan: got.plan.slice(0, PLAN_LIMIT), postPlan: mapping?.postPlan === true, earlier: got.earlier, isPlan: got.isPlan } };
      } catch (error) {
        log(`plan preview failed: ${message(error)}`);
        return fail(message(error));
      }
    }
    if (starting.has(sessionId)) return fail('A build is already starting from that session.');
    starting.add(sessionId);
    try {
      const got = await readPlan(sessionId);
      if ('error' in got) return fail(got.error);
      // A chat answer is not a plan: building from it starts the wrong work. The frame can say "use it anyway".
      if (!got.isPlan && body.force !== true) return fail(NOT_A_PLAN);
      const prompt = handoffPrompt({
        identifier,
        issueTitle: typeof body.issueTitle === 'string' ? body.issueTitle : null,
        branch: readBranch(sessionDirectory, read),
        directory: sessionDirectory,
        planSessionTitle: typeof body.sessionTitle === 'string' ? body.sessionTitle : pending?.sessionTitle ?? null,
        plan: got.plan,
        review: { mode: mapping?.reviewMode ?? 'off', reviewers: mapping?.aiReviewers ?? '' },
        splitOut: handoffs.extras?.[sessionId]?.extras.issues.map((i) => i.title) ?? [],
      });
      const started = await host.sessions.start({
        prompt,
        directory: sessionDirectory,
        title: `${identifier} build`,
        ...sessionChoice('build', mapping, config.defaults, { model: body.model }),
      });
      rememberSession(started.sessionId, { identifier, directory: folder ?? sessionDirectory, createdAt: now(), role: 'build', sessionDirectory, title: `${identifier} build` });
      handoffs.pending = handoffs.pending.filter((h) => h.sessionId !== sessionId);
      saveHandoffs();
      return { body: { ok: true, sessionId: started.sessionId, directory: started.directory ?? sessionDirectory } };
    } catch (error) {
      log(`handoff failed: ${message(error)}`);
      return fail(message(error));
    } finally {
      starting.delete(sessionId);
    }
  };

  /**
   * Starts the plan session for an issue in a folder the frame has already made (the issue's worktree), with the
   * folder's plan agent and model. A frame cannot choose an agent or model for a session it starts, so this is
   * the service's part of Start plan.
   */
  const startPlan = async (raw: string): Promise<Reply> => {
    const body = parse(raw);
    const identifier = typeof body.identifier === 'string' ? body.identifier.trim().toUpperCase() : '';
    const directory = typeof body.directory === 'string' ? body.directory.trim() : '';
    if (!IDENTIFIER.test(identifier) || !directory.startsWith('/')) return fail('Expected { identifier, directory }.', 400);
    const key = `plan:${directory}:${identifier}`;
    if (starting.has(key)) return fail('A plan is already starting for that issue.');
    starting.add(key);
    try {
      const folder = mappedFor(directory);
      const mapping = folder ? config.directories[folder] : undefined;
      const started = await host.sessions.start({
        prompt: planPrompt({
          identifier,
          issueTitle: typeof body.issueTitle === 'string' ? body.issueTitle : null,
          branch: readBranch(directory, read),
          directory,
          context: typeof body.context === 'string' ? body.context : '',
          scale: typeof body.scale === 'string' ? body.scale : null,
        }),
        directory,
        title: `${identifier} plan`,
        ...sessionChoice('plan', mapping, config.defaults, { model: body.model }),
      });
      rememberSession(started.sessionId, { identifier, directory: folder ?? directory, createdAt: now(), role: 'plan', sessionDirectory: directory, title: `${identifier} plan` });
      saveHandoffs();
      return { body: { ok: true, sessionId: started.sessionId, directory: started.directory ?? directory } };
    } catch (error) {
      log(`plan failed: ${message(error)}`);
      return fail(message(error));
    } finally {
      starting.delete(key);
    }
  };

  /** Plan sessions this service started, newest first, for one issue or one session. They carry no link the host shows. */
  const plansFor = (identifier: string | null, sessionId: string | null): { sessionId: string; identifier: string; directory: string; sessionDirectory: string; title: string; createdAt: number }[] =>
    Object.entries(handoffs.builds)
      .filter(([id, b]) => b.role === 'plan' && (!identifier || b.identifier === identifier.toUpperCase()) && (!sessionId || id === sessionId))
      .map(([id, b]) => ({ sessionId: id, identifier: b.identifier, directory: b.directory, sessionDirectory: b.sessionDirectory ?? b.directory, title: b.title ?? `${b.identifier} plan`, createdAt: b.createdAt }))
      .sort((x, y) => y.createdAt - x.createdAt);

  // ---- mentions

  const snapshotRows = (directory: string | null) => {
    const folder = mappedFor(directory);
    return Object.entries(snapshots).map(([dir, snapshot]) => ({ snapshot, preferred: dir === folder }));
  };

  /** With the API key: Linear's issues for the query, or nothing once the time for it is up. */
  const liveIssues = async (value: string, query: string): Promise<SnapIssue[]> => {
    const key = keyOf(query);
    if (!key && query.trim().length < 2) return [];
    let timer: ReturnType<typeof setTimeout> | undefined;
    const late = new Promise<SnapIssue[]>((done) => { timer = setTimeout(() => done([]), LIVE_SEARCH_MS); });
    try {
      return await Promise.race([searchMentionIssues(deps.gqlFor(value), query, key).catch((error: unknown) => {
        log(`@ search failed, using the cache: ${message(error)}`);
        return [];
      }), late]);
    } finally {
      clearTimeout(timer);
    }
  };

  const search = async (raw: string): Promise<Reply> => {
    const request = parse(raw) as Partial<MentionsSearchRequest>;
    const directory = typeof request.directory === 'string' ? request.directory : null;
    const query = typeof request.query === 'string' ? request.query : '';
    const folder = mappedFor(directory);
    // The first search waits for the settings once (a local read); later ones take what was last read.
    const value = key ? peekKey() : await apiKey();
    // A stale cache refreshes in the background while this answer comes from what is held.
    if (folder && value && now() - (snapshots[folder]?.at ?? 0) > CACHE_STALE_MS) void refreshCache(folder, readBranch(folder, read));
    const live = value ? await liveIssues(value, query) : [];
    return { body: { items: mentionRows(query, snapshotRows(directory), recent, live) } };
  };

  const resolve = async (raw: string): Promise<Reply> => {
    const request = parse(raw) as Partial<MentionsResolveRequest>;
    const id = typeof request.id === 'string' ? request.id : '';
    const cached = locate(id, Object.values(snapshots));
    const issueKey = id.startsWith('issue:') ? keyOf(id.slice(6)) : null;
    const value = await apiKey();
    if (value) {
      try {
        const gql = deps.gqlFor(value);
        if (issueKey) return { body: { text: await fetchIssueText(gql, issueKey) } };
        if (id.startsWith('project:')) return { body: { text: await fetchProjectText(gql, id.slice(8)) } };
        if (id.startsWith('doc:')) return { body: { text: await fetchDocText(gql, id.slice(4)) } };
      } catch (error) {
        log(`resolve ${id} failed, using the cache: ${message(error)}`);
      }
    }
    if (cached?.kind === 'project') return { body: { text: projectMarkdown(cached.project, cached.at) } };
    if (cached?.kind === 'doc') return { body: { text: docMarkdown(cached.doc, cached.at) } };
    if (issueKey) {
      // An issue known only by the key typed still gives the agent the key and its link to read it by.
      const known = locateIssue(issueKey, Object.values(snapshots), recent);
      const issue = known?.issue ?? { identifier: issueKey, title: '', state: '' };
      return { body: { text: issueMarkdown(issue, known?.at ?? null, recent?.orgKey) } };
    }
    return { status: 404, body: { message: 'That Linear item is not cached. Open the Linear+ dashboard once so it is, or add a personal API key in Settings, Integrations.' } };
  };

  // ---- session events

  const debugOn = () => store.exists(DEBUG_FLAG);

  const handleEvent = async (request: GuestSessionEventRequest): Promise<void> => {
    const { event, content } = request;
    if (debugOn()) {
      store.append('debug.log', JSON.stringify({ at: now(), type: event.type, session: event.session, directory: event.project.directory, linked: event.linked }));
    }
    if (event.session.parentId) return;
    if (seenEvents.includes(event.id)) return;
    seenEvents.push(event.id);
    if (seenEvents.length > SEEN_MAX) seenEvents.shift();
    const directory = event.project.directory;
    const folder = mappedFor(directory);
    if (!directory || !folder) return;
    const mapping: MappingConfig | undefined = config.directories[folder];
    if (!mapping) return;

    if (event.type === 'session-created' || event.type === 'turn-started') {
      rememberWorktree(directory, folder);
      if (now() - (refreshed.get(directory) ?? 0) > INSTRUCTIONS_STALE_MS) {
        if (now() - (snapshots[folder]?.at ?? 0) > CACHE_STALE_MS) await refreshCache(folder, readBranch(directory, read));
        await setText(directory, folder);
      }
      return;
    }
    if (event.type !== 'turn-finished') return;

    const build = handoffs.builds[event.session.id];
    const issues = [...linearIssuesOf(event.linked)];
    if (build && !issues.includes(build.identifier)) issues.push(build.identifier);
    if (!issues.length) return;
    const reply = content?.type === 'turn-finished' ? withoutBlocks(content.reply) : '';
    const title = content?.sessionTitle ?? null;

    if (mapping.finishComments === 'draft') {
      for (const identifier of issues) {
        const draft = buildDraft({ directory: folder, sessionId: event.session.id, identifier, title, reply, now: now() });
        if (draft) drafts = upsertDraft(drafts, draft, now());
      }
      saveDrafts();
    }

    if (reply.trim() && looksLikePlan(reply) && build?.role !== 'build') {
      const kept = { ...(handoffs.plans ?? {}), [event.session.id]: { text: reply.slice(0, PLAN_LIMIT + 2000), at: now() } };
      handoffs.plans = Object.fromEntries(Object.entries(kept).sort((x, y) => y[1].at - x[1].at).slice(0, PLANS_KEPT));
      saveHandoffs();
    }

    // The first estimate and split-out list of a planning session is kept for a frame to write. A later turn replaces
    // it only while nobody has started writing it, so a revised plan never creates the issues twice.
    const raw = content?.type === 'turn-finished' ? content.reply : '';
    const extras = build?.role !== 'build' && raw ? parsePlanExtras(raw) : null;
    if (extras && (build?.role === 'plan' || looksLikePlan(reply))) {
      const before = handoffs.extras?.[event.session.id];
      if (!before || before.state === 'pending') {
        keepExtras({
          sessionId: event.session.id,
          identifier: build?.identifier ?? issues[issues.length - 1]!,
          directory: folder,
          sessionTitle: title?.trim() || 'Untitled session',
          extras,
          state: 'pending',
          at: now(),
        });
      }
    }

    if (build?.role !== 'build' && reply.trim()) {
      const identifier = issues[issues.length - 1]!;
      const handoff: Handoff = {
        id: handoffId(event.session.id, identifier),
        directory: folder,
        sessionDirectory: directory,
        sessionId: event.session.id,
        identifier,
        sessionTitle: title?.trim() || 'Untitled session',
        plan: build?.role === 'plan' || looksLikePlan(reply),
        createdAt: now(),
      };
      // One plan row per issue and folder: a newer planning session for the same issue replaces an older one.
      handoffs.pending = upsertHandoff(handoffs.pending.filter((h) => h.sessionId !== event.session.id && !(h.identifier === identifier && h.directory === folder)), handoff).slice(-HANDOFFS_MAX);
      saveHandoffs();
    }
  };

  const sessionEvent = (raw: string): Reply => {
    const request = readSessionEventRequest(raw);
    if (!request) return { status: 400, body: { ok: false, error: 'Not a session event this service understands.' } };
    return {
      body: { ok: true },
      after: () => { void handleEvent(request).catch((error) => log(`event ${request.event.type} failed: ${message(error)}`)); },
    };
  };

  const route = async (method: string, path: string, query: URLSearchParams, raw: string): Promise<Reply | null> => {
    try {
      if (path === '/health') return { body: {} };
      if (path === SESSION_EVENTS_PATH) return sessionEvent(raw);
      if (path === MENTIONS_SEARCH_PATH) return await search(raw);
      if (path === MENTIONS_RESOLVE_PATH) return await resolve(raw);
      if (path === '/config') {
        if (method === 'PUT') return await putConfig(raw);
        return { body: { hasKey: Boolean(await apiKey()), directories: config.directories } };
      }
      if (path === '/snapshot' && method === 'POST') return await postSnapshot(raw);
      if (path === '/drafts') {
        if (method === 'POST') return postDraft(raw);
        return { body: { drafts: draftsFor(query.get('directory')) } };
      }
      if (path === '/handoffs') {
        if (method === 'POST') return postHandoffs(raw);
        return { body: { handoffs: handoffsFor(query.get('directory')), extras: extrasFor(query.get('directory')) } };
      }
      if (path === '/extras') {
        const id = query.get('sessionId') ?? '';
        return { body: { extras: handoffs.extras?.[id] ?? null } };
      }
      if (path === '/handoff' && method === 'POST') return await startBuild(raw);
      if (path === '/plan' && method === 'POST') return await startPlan(raw);
      if (path === '/plans') return { body: { sessions: plansFor(query.get('identifier'), query.get('sessionId')) } };
      if (path === '/choices') {
        const folder = mappedFor(query.get('directory'));
        const mapping = folder ? config.directories[folder] : undefined;
        // What a plan or build started here would use with no override: the folder's choice, else every folder's.
        const current = { plan: sessionChoice('plan', mapping, config.defaults), build: sessionChoice('build', mapping, config.defaults) };
        return { body: deps.choices ? { ok: true, ...deps.choices(folder ?? query.get('directory')), current } : { ok: false, error: 'This service cannot read the agent and model lists.', current } };
      }
      return null;
    } catch (error) {
      log(`${method} ${path} failed: ${message(error)}`);
      return fail(message(error));
    }
  };

  return { route, start };
};

export type App = ReturnType<typeof createApp>;

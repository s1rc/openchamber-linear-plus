import { describe, expect, test } from 'bun:test';
import type { GuestSessionEventRequest } from '@openchamber/sdk';
import { createApp, NOT_A_PLAN, type Deps } from '../src/service/app.ts';
import { NOT_A_PLAN_TEXT } from '../src/shared/handoff-rules.ts';
import type { Gql } from '../src/service/linear-node.ts';
import { refreshFromLinear } from '../src/service/linear-node.ts';
import type { Store } from '../src/service/store.ts';
import type { MappingConfig } from '../src/service/types.ts';

const memoryStore = (flags: string[] = []): Store & { files: Map<string, unknown>; log: string[] } => {
  const files = new Map<string, unknown>();
  const log: string[] = [];
  return {
    files,
    log,
    load: <T,>(name: string, fallback: T) => (files.has(name) ? (JSON.parse(JSON.stringify(files.get(name))) as T) : fallback),
    save: (name, value) => { files.set(name, JSON.parse(JSON.stringify(value))); },
    append: (name, line) => { log.push(`${name}: ${line}`); },
    exists: (name) => flags.includes(name),
  };
};

const REPO = '/r/api';
const WT = '/wt/eng-5';
const disk: Record<string, string> = {
  [`${REPO}/.git/HEAD`]: 'ref: refs/heads/main\n',
  [`${WT}/.git`]: `gitdir: ${REPO}/.git/worktrees/eng-5\n`,
  [`${REPO}/.git/worktrees/eng-5/HEAD`]: 'ref: refs/heads/matt/eng-5-slow-login\n',
};
const mapping: MappingConfig = { directory: REPO, teamIds: ['t-eng'], linearProjectIds: ['p1'], activeProjectId: 'p1', finishComments: 'draft', updatedAt: 1 };

type Calls = { instructions: [string | null, string][]; started: Record<string, unknown>[]; settings: Record<string, string>; reply: string | null; status: 'idle' | 'busy' | 'waiting' };

const setup = (options: { key?: string; gql?: Gql; flags?: string[]; config?: boolean } = {}) => {
  const store = memoryStore(options.flags);
  if (options.config !== false) store.files.set('config.json', { directories: { [REPO]: mapping } });
  const calls: Calls = { instructions: [], started: [], settings: options.key ? { 'api-key': options.key } : {}, reply: '1. Do it', status: 'idle' };
  let clock = 1_000_000;
  const deps: Deps = {
    host: {
      setInstructions: async (directory, text) => { calls.instructions.push([directory, text]); return { saved: true }; },
      readSettings: async () => calls.settings,
      sessions: {
        start: async (input) => { calls.started.push(input as Record<string, unknown>); return { sessionId: 'ses_build', directory: input.directory ?? null }; },
        send: async () => ({ sent: true }),
        retry: async () => ({ sent: true }),
        status: async () => ({ status: calls.status }),
        lastReply: async () => ({ reply: calls.reply }),
        stop: async () => ({ stopped: false }),
        answerPermission: async () => ({ answered: true }),
        answerForm: async () => ({ answered: true }),
      },
    },
    store,
    read: (path) => disk[path] ?? null,
    now: () => clock,
    gqlFor: () => options.gql ?? (async () => { throw new Error('no Linear in this test'); }),
  };
  const app = createApp(deps);
  const call = async (method: string, path: string, body?: unknown, query = '') => {
    const reply = await app.route(method, path, new URLSearchParams(query), body === undefined ? '' : typeof body === 'string' ? body : JSON.stringify(body));
    return { reply, body: reply?.body as Record<string, any> };
  };
  const tick = (ms: number) => { clock += ms; };
  const settle = () => new Promise((resolve) => setTimeout(resolve, 5));
  return { app, store, calls, call, tick, settle };
};

const finished = (over: Partial<GuestSessionEventRequest['event']> = {}, reply = 'All done.'): GuestSessionEventRequest => ({
  v: 1,
  requestId: 'r',
  event: { id: `e-${Math.random()}`, type: 'turn-finished', at: 1, session: { id: 'ses_1', parentId: null }, project: { directory: WT }, linked: [{ id: 'guest:linear-dashboard:ENG-5', kind: 'guest', url: 'https://linear.app/a/issue/ENG-5/x', identifier: 'ENG-5' }], ...over },
  content: { type: 'turn-finished', sessionTitle: 'Slow login', reply, replyTruncated: false },
});

const deliver = async (ctx: ReturnType<typeof setup>, event: GuestSessionEventRequest) => {
  const { reply } = await ctx.call('POST', '/session-events', JSON.stringify(event));
  reply?.after?.();
  await ctx.settle();
  return reply;
};

describe('session events', () => {
  test('answers { ok: true } at once, then does the work', async () => {
    const ctx = setup();
    const reply = await ctx.call('POST', '/session-events', JSON.stringify(finished()));
    expect(reply.body).toEqual({ ok: true });
    expect(ctx.store.files.has('drafts.json')).toBe(false);
    reply.reply!.after!();
    await ctx.settle();
    expect(ctx.store.files.has('drafts.json')).toBe(true);
  });

  test('a body that is not an event is a 400', async () => {
    const { reply } = await setup().call('POST', '/session-events', '{"v":2}');
    expect(reply?.status).toBe(400);
  });

  test('finish-comments off (the default) stores no draft but still lists the plan', async () => {
    const ctx = setup();
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, finishComments: 'off' } } });
    await deliver(ctx, finished());
    expect((await ctx.call('GET', '/drafts')).body.drafts).toEqual([]);
    expect((await ctx.call('GET', '/handoffs')).body.handoffs.length).toBe(1);
  });

  test('a draft per linked issue, filed under the mapped folder, replaced on the next turn', async () => {
    const ctx = setup();
    await deliver(ctx, finished({ linked: [
      { id: 'linear:ENG-5', kind: 'linear', provider: 'linear', identifier: 'ENG-5', url: 'https://linear.app/a/issue/ENG-5/x' },
      { id: 'linear:ENG-6', kind: 'linear', provider: 'linear', identifier: 'ENG-6', url: 'https://linear.app/a/issue/ENG-6/x' },
    ] }));
    let drafts = (await ctx.call('GET', '/drafts', undefined, `directory=${encodeURIComponent(WT)}`)).body.drafts as { identifier: string; directory: string }[];
    expect(drafts.map((d) => d.identifier)).toEqual(['ENG-5', 'ENG-6']);
    expect(drafts.every((d) => d.directory === REPO)).toBe(true);
    await deliver(ctx, finished({}, 'Second turn.'));
    drafts = (await ctx.call('GET', '/drafts')).body.drafts;
    expect(drafts.length).toBe(2);
    expect((drafts.find((d: { identifier: string }) => d.identifier === 'ENG-5') as unknown as { body: string }).body).toContain('Second turn.');
  });

  test('subagents, unmapped folders, unlinked sessions and empty replies leave nothing', async () => {
    const ctx = setup();
    await deliver(ctx, finished({ session: { id: 's', parentId: 'p' } }));
    await deliver(ctx, finished({ project: { directory: '/elsewhere' } }));
    await deliver(ctx, finished({ linked: [{ id: 'x', kind: 'issue', url: 'https://gitlab.com/a/b/-/issues/1' }] }));
    await deliver(ctx, finished({}, '   '));
    expect((await ctx.call('GET', '/drafts')).body.drafts).toEqual([]);
  });

  test('an event delivered twice counts once', async () => {
    const ctx = setup();
    const event = finished();
    await deliver(ctx, event);
    await deliver(ctx, { ...event, content: { type: 'turn-finished', sessionTitle: 'Slow login', reply: 'Changed', replyTruncated: false } });
    expect((await ctx.call('GET', '/drafts')).body.drafts[0].body).toContain('All done.');
  });

  test('the service never posts: a finished turn makes no Linear call at all', async () => {
    let called = 0;
    const ctx = setup({ key: 'lin_api_x', gql: (async () => { called += 1; throw new Error('read only'); }) as Gql });
    await deliver(ctx, finished({ project: { directory: REPO } }));
    expect(called).toBe(0);
    expect((await ctx.call('GET', '/drafts')).body.drafts.length).toBe(1);
  });

  test('turn-started refreshes the worktree\'s instructions only when older than five minutes', async () => {
    const ctx = setup();
    const started = (): GuestSessionEventRequest => ({ ...finished(), event: { ...finished().event, type: 'turn-started' }, content: { type: 'turn-started', sessionTitle: 't' } });
    await deliver(ctx, started());
    expect(ctx.calls.instructions.filter(([d]) => d === WT).length).toBe(1);
    ctx.tick(60_000);
    await deliver(ctx, started());
    expect(ctx.calls.instructions.filter(([d]) => d === WT).length).toBe(1);
    ctx.tick(5 * 60_000);
    await deliver(ctx, started());
    // The text is the same, so it is not sent again, but the refresh time moves.
    expect(ctx.calls.instructions.filter(([d]) => d === WT).length).toBe(1);
  });

  test('the debug log is written only when the flag file is there, and holds the linked list', async () => {
    const off = setup();
    await deliver(off, finished());
    expect(off.store.log).toEqual([]);
    const on = setup({ flags: ['debug-events'] });
    await deliver(on, finished());
    expect(on.store.log.length).toBe(1);
    expect(on.store.log[0]).toContain('guest:linear-dashboard:ENG-5');
    expect(on.store.log[0]).not.toContain('All done.');
  });
});

describe('plan to build', () => {
  const planned = async () => {
    const ctx = setup();
    ctx.calls.reply = '## Plan\n1. Raise the window\n2. Test it';
    await deliver(ctx, finished({}, ctx.calls.reply));
    return ctx;
  };

  test('starts the build in the planning session\'s worktree with the folder\'s agent and model', async () => {
    const ctx = setup();
    ctx.calls.reply = '## Plan\n1. Raise the window\n2. Test it';
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, buildAgent: 'build', buildModel: 'fireworks/kimi-k2' } } });
    await deliver(ctx, finished({}, ctx.calls.reply));
    const { body } = await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'eng-5', issueTitle: 'Slow login' });
    expect(body).toMatchObject({ ok: true, sessionId: 'ses_build', directory: WT });
    expect(ctx.calls.started[0]).toMatchObject({ directory: WT, agent: 'build', model: 'fireworks/kimi-k2', title: 'ENG-5 build' });
    const prompt = String(ctx.calls.started[0]!.prompt);
    expect(prompt).toContain('ENG-5 (Slow login)');
    expect(prompt).toContain('matt/eng-5-slow-login');
    expect(prompt).toContain('1. Raise the window');
  });

  test('the folder\'s review mode and reviewers reach the build\'s first message', async () => {
    const ctx = setup();
    ctx.calls.reply = '## Plan\n1. Raise the window';
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, reviewMode: 'auto', aiReviewers: 'CodeRabbit, Greptile' } } });
    await deliver(ctx, finished({}, ctx.calls.reply));
    await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' });
    const prompt = String(ctx.calls.started[0]!.prompt);
    expect(prompt).toContain('I authorize these three steps');
    expect(prompt).toContain('CodeRabbit and Greptile');
  });

  test('a folder with no review mode gets no merge request instructions', async () => {
    const ctx = setup();
    ctx.calls.reply = '## Plan\n1. Raise the window';
    await deliver(ctx, finished({}, ctx.calls.reply));
    await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' });
    expect(String(ctx.calls.started[0]!.prompt)).not.toContain('merge request');
  });

  test('uses the build agent and the host\'s model when the folder sets none', async () => {
    const ctx = await planned();
    await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' });
    expect(ctx.calls.started[0]!.agent).toBe('build');
    expect('model' in ctx.calls.started[0]!).toBe(false);
  });

  test('refuses while the planning session is busy or waiting, or has no reply', async () => {
    const ctx = await planned();
    ctx.calls.status = 'busy';
    expect((await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' })).body).toMatchObject({ ok: false, error: expect.stringContaining('still working') });
    ctx.calls.status = 'waiting';
    expect((await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' })).body.error).toContain('waiting for your answer');
    ctx.calls.status = 'idle';
    ctx.calls.reply = null;
    expect((await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' })).body.error).toContain('no reply');
    expect(ctx.calls.started.length).toBe(0);
  });

  test('a session the service did not hear about needs its directory from the caller, and a host refusal is a note, not a 500', async () => {
    const ctx = setup();
    expect((await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_x', identifier: 'ENG-5' })).body.ok).toBe(false);
    const ok = await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_x', identifier: 'ENG-5', sessionDirectory: WT });
    expect(ok.body.ok).toBe(true);
    const failing = setup();
    failing.calls.reply = 'plan';
    (failing.calls as Calls).status = 'idle';
    const bad = await failing.call('POST', '/handoff', { force: true, sessionId: 's', identifier: 'ENG-5', sessionDirectory: 'relative/dir' });
    expect(bad.reply?.status ?? 200).toBe(200);
    expect(bad.body.ok).toBe(false);
  });

  test('a build session counts as linked to the issue for finish-comments, and lists no plan of its own', async () => {
    const ctx = await planned();
    await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' });
    expect((await ctx.call('GET', '/handoffs')).body.handoffs).toEqual([]);
    await deliver(ctx, finished({ session: { id: 'ses_build', parentId: null }, linked: [] }, 'Built it.'));
    const drafts = (await ctx.call('GET', '/drafts')).body.drafts as { sessionId: string; identifier: string }[];
    expect(drafts.some((d) => d.sessionId === 'ses_build' && d.identifier === 'ENG-5')).toBe(true);
    expect((await ctx.call('GET', '/handoffs')).body.handoffs).toEqual([]);
  });

  test('a second click while one is starting is refused', async () => {
    const ctx = await planned();
    const first = ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' });
    const second = ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' });
    const results = await Promise.all([first, second]);
    expect(results.filter((r) => r.body.ok === true).length).toBe(1);
    expect(results.filter((r) => String(r.body.error).includes('already starting')).length).toBe(1);
    expect(ctx.calls.started.length).toBe(1);
  });

  test('a newer planning session for the same issue replaces the older one\'s row, another issue keeps its own', async () => {
    const ctx = await planned();
    await deliver(ctx, finished({ session: { id: 'ses_2', parentId: null } }, '## Plan\n1. Again'));
    await deliver(ctx, finished({ session: { id: 'ses_3', parentId: null }, linked: [{ id: 'linear:ENG-6', kind: 'linear', provider: 'linear', identifier: 'ENG-6', url: 'https://linear.app/a/issue/ENG-6/x' }] }, '## Plan\n1. Other'));
    const rows = (await ctx.call('GET', '/handoffs')).body.handoffs as { sessionId: string; identifier: string }[];
    expect(rows.map((r) => `${r.sessionId}:${r.identifier}`).sort()).toEqual(['ses_2:ENG-5', 'ses_3:ENG-6']);
  });

  test('dismiss removes the row', async () => {
    const ctx = await planned();
    expect((await ctx.call('GET', '/handoffs', undefined, `directory=${encodeURIComponent(REPO)}`)).body.handoffs.length).toBe(1);
    await ctx.call('POST', '/handoffs', { id: 'ses_1:ENG-5', action: 'dismiss' });
    expect((await ctx.call('GET', '/handoffs')).body.handoffs).toEqual([]);
    expect((await ctx.call('POST', '/handoffs', { id: 'x', action: 'nope' })).reply?.status).toBe(400);
  });

  test('a plan in an unmapped folder is not listed', async () => {
    const ctx = setup();
    await deliver(ctx, finished({ project: { directory: '/elsewhere' } }));
    expect((await ctx.call('GET', '/handoffs')).body.handoffs).toEqual([]);
  });
});

describe('start plan', () => {
  test('starts the plan session in the folder with the plan agent and the folder\'s plan model', async () => {
    const ctx = setup();
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, planModel: 'anthropic/claude-opus-4-5' } } });
    const { body } = await ctx.call('POST', '/plan', { identifier: 'eng-5', directory: WT, issueTitle: 'Slow login', context: 'ENG-5: Slow login\nLogins time out.' });
    expect(body).toMatchObject({ ok: true, sessionId: 'ses_build', directory: WT });
    expect(ctx.calls.started[0]).toMatchObject({ directory: WT, agent: 'plan', model: 'anthropic/claude-opus-4-5', title: 'ENG-5 plan' });
    const prompt = String(ctx.calls.started[0]!.prompt);
    expect(prompt).toContain('Do not change any files yet');
    expect(prompt).toContain('matt/eng-5-slow-login');
    expect(prompt).toContain('Logins time out.');
  });

  test('uses the folder\'s plan agent, and the host\'s model when none is set', async () => {
    const ctx = setup();
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, planAgent: 'architect' } } });
    await ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: WT });
    expect(ctx.calls.started[0]!.agent).toBe('architect');
    expect('model' in ctx.calls.started[0]!).toBe(false);
  });

  test('the agent and model for every folder apply where the folder sets none, also in a folder that is not mapped', async () => {
    const ctx = setup();
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, planModel: 'anthropic/claude-opus-4-5' } }, defaults: { planAgent: 'architect', planModel: 'fireworks/kimi-k2', buildAgent: 'coder' } });
    await ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: WT });
    expect(ctx.calls.started[0]).toMatchObject({ agent: 'architect', model: 'anthropic/claude-opus-4-5' });
    await ctx.call('POST', '/plan', { identifier: 'ENG-6', directory: '/elsewhere' });
    expect(ctx.calls.started[1]).toMatchObject({ agent: 'architect', model: 'fireworks/kimi-k2' });
  });

  test('a model picked for one plan or build wins over Settings, and a bad one falls back to Settings', async () => {
    const ctx = setup();
    ctx.calls.reply = '## Plan\n1. Raise the window\n2. Test it';
    await deliver(ctx, finished({}, ctx.calls.reply));
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, planModel: 'anthropic/claude-opus-4-5', buildModel: 'fireworks/kimi-k2' } } });
    await ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: WT, model: 'openai/gpt-5' });
    expect(ctx.calls.started[0]).toMatchObject({ agent: 'plan', model: 'openai/gpt-5' });
    await ctx.call('POST', '/plan', { identifier: 'ENG-6', directory: WT, model: 'not a model' });
    expect(ctx.calls.started[1]).toMatchObject({ model: 'anthropic/claude-opus-4-5' });
    await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5', model: 'openai/gpt-5' });
    expect(ctx.calls.started[2]).toMatchObject({ agent: 'build', model: 'openai/gpt-5' });
  });

  test('GET /choices says what a plan and a build would use here', async () => {
    const ctx = setup();
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, buildModel: 'fireworks/kimi-k2' } }, defaults: { planAgent: 'architect' } });
    const { body } = await ctx.call('GET', '/choices', undefined, `directory=${WT}`);
    expect(body.current).toEqual({ plan: { agent: 'architect' }, build: { agent: 'build', model: 'fireworks/kimi-k2' } });
  });

  test('works in a folder that is not mapped, and refuses a bad body or a second click', async () => {
    const ctx = setup();
    expect((await ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: '/elsewhere' })).body.ok).toBe(true);
    expect((await ctx.call('POST', '/plan', { identifier: 'no', directory: WT })).reply?.status).toBe(400);
    expect((await ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: 'rel' })).reply?.status).toBe(400);
    const both = await Promise.all([ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: WT }), ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: WT })]);
    expect(both.filter((r) => r.body.ok === true).length).toBe(1);
  });

  test('a plan session counts as linked, its finished turn is a plan row and a draft, and GET /plans lists it', async () => {
    const ctx = setup();
    await ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: WT });
    expect((await ctx.call('GET', '/plans', undefined, 'identifier=eng-5')).body.sessions).toEqual([expect.objectContaining({ sessionId: 'ses_build', directory: REPO })]);
    expect((await ctx.call('GET', '/plans', undefined, 'identifier=ENG-9')).body.sessions).toEqual([]);
    expect((await ctx.call('GET', '/plans', undefined, 'sessionId=ses_build')).body.sessions).toEqual([expect.objectContaining({ sessionId: 'ses_build', identifier: 'ENG-5' })]);
    expect((await ctx.call('GET', '/plans', undefined, 'sessionId=ses_other')).body.sessions).toEqual([]);
    expect((await ctx.call('GET', '/plans', undefined, 'identifier=ENG-5')).body.sessions[0]).toMatchObject({ sessionDirectory: WT, title: 'ENG-5 plan' });
    await deliver(ctx, finished({ session: { id: 'ses_build', parentId: null }, linked: [] }, 'Short answer, not shaped like a plan.'));
    const rows = (await ctx.call('GET', '/handoffs')).body.handoffs as { sessionId: string; plan: boolean }[];
    expect(rows).toEqual([expect.objectContaining({ sessionId: 'ses_build', plan: true })]);
    expect(((await ctx.call('GET', '/drafts')).body.drafts as { sessionId: string }[]).map((d) => d.sessionId)).toEqual(['ses_build']);
  });

  test('Start build for a plan session the service started needs no folder from the frame', async () => {
    const ctx = setup();
    ctx.calls.reply = '## Plan\n1. Do it';
    await ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: WT });
    ctx.calls.started.length = 0;
    const { body } = await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_build', identifier: 'ENG-5' });
    expect(body.ok).toBe(true);
    expect(ctx.calls.started[0]).toMatchObject({ directory: WT, title: 'ENG-5 build' });
  });

  test('a host refusal is a note', async () => {
    const ctx = setup();
    ctx.calls.started.length = 0;
    const failing = createApp({
      host: { setInstructions: async () => ({ saved: true }), readSettings: async () => ({}), sessions: { ...({} as Deps['host']['sessions']), start: async () => { throw new Error('Agent not found: nope'); } } },
      store: ctx.store, read: () => null, now: () => 1, gqlFor: () => (async () => { throw new Error('x'); }),
    });
    const reply = await failing.route('POST', '/plan', new URLSearchParams(), JSON.stringify({ identifier: 'ENG-5', directory: WT }));
    expect(reply?.body).toEqual({ ok: false, error: 'Agent not found: nope' });
  });
});

describe('a chat answer is not a plan', () => {
  const PLAN = '## Plan\n\n1. Read the module\n2. Change the check\n3. Add tests\n4. Run the suite\n\nRisk: callers break. '.padEnd(700, 'x');

  test('building from a reply that does not read like a plan is refused, and nothing starts', async () => {
    const ctx = setup();
    ctx.calls.reply = 'ENG-5 is now In Planning. The plan above is still current.';
    const { body } = await ctx.call('POST', '/handoff', { sessionId: 'ses_1', identifier: 'ENG-5', sessionDirectory: WT });
    expect(body).toEqual({ ok: false, error: NOT_A_PLAN });
    expect(ctx.calls.started.length).toBe(0);
  });

  test('the service and the frame word the refusal the same', () => {
    expect(NOT_A_PLAN).toBe(NOT_A_PLAN_TEXT);
  });

  test('"use it anyway" (force) starts the build from that reply', async () => {
    const ctx = setup();
    ctx.calls.reply = 'Just do the small thing.';
    const { body } = await ctx.call('POST', '/handoff', { sessionId: 'ses_1', identifier: 'ENG-5', sessionDirectory: WT, force: true });
    expect(body.ok).toBe(true);
    expect(String(ctx.calls.started[0]!.prompt)).toContain('Just do the small thing.');
  });

  test('the preview says whether the reply reads like a plan', async () => {
    const ctx = setup();
    ctx.calls.reply = PLAN;
    expect((await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 's', identifier: 'ENG-5', sessionDirectory: WT })).body.isPlan).toBe(true);
    ctx.calls.reply = 'Done, anything else?';
    expect((await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 's', identifier: 'ENG-5', sessionDirectory: WT })).body.isPlan).toBe(false);
  });

  test('a real plan needs no force', async () => {
    const ctx = setup();
    ctx.calls.reply = PLAN;
    expect((await ctx.call('POST', '/handoff', { sessionId: 's', identifier: 'ENG-5', sessionDirectory: WT })).body.ok).toBe(true);
  });
});

describe('which reply is the plan', () => {
  const PLAN = '## Plan\n\n1. Read the module\n2. Change the check\n3. Add tests\n4. Run the suite\n\nRisk: callers break. '.padEnd(700, 'x');
  const BLOCK = '\n\n```openui-lang\nroot = Stack([card])\ncard = LinearIssue("ENG-5")\n```';

  test('the card the agent was asked to end the plan with is not part of the plan', async () => {
    const ctx = setup();
    ctx.calls.reply = PLAN + BLOCK;
    const { body } = await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 'ses_1', identifier: 'ENG-5', sessionDirectory: WT });
    expect(body.plan).toBe(PLAN.trim());
    expect(body.plan).not.toContain('openui-lang');
    expect(body.earlier).toBe(false);
  });

  test('a chat answer after the plan does not replace it: the plan kept from the earlier turn is used', async () => {
    const ctx = setup();
    await deliver(ctx, finished({}, PLAN + BLOCK));
    ctx.calls.reply = '```openui-lang\nroot = Stack([c])\n```\n\nENG-5 is now In Planning. The plan above is still current.';
    const { body } = await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 'ses_1', identifier: 'ENG-5', sessionDirectory: WT });
    expect(body).toMatchObject({ ok: true, plan: PLAN.trim(), earlier: true });
    await ctx.call('POST', '/handoff', { force: true, sessionId: 'ses_1', identifier: 'ENG-5' });
    expect(String(ctx.calls.started[0]!.prompt)).toContain('Change the check');
    expect(String(ctx.calls.started[0]!.prompt)).not.toContain('still current');
  });

  test('a newer plan wins over the kept one, and with nothing kept the last reply is used as it is', async () => {
    const ctx = setup();
    await deliver(ctx, finished({}, PLAN));
    const newer = PLAN.replace('Change the check', 'Rewrite the check');
    ctx.calls.reply = newer;
    expect((await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 'ses_1', identifier: 'ENG-5', sessionDirectory: WT })).body).toMatchObject({ plan: newer.trim(), earlier: false });
    const fresh = setup();
    fresh.calls.reply = 'Short chat reply.';
    expect((await fresh.call('POST', '/handoff', { mode: 'preview', sessionId: 'ses_9', identifier: 'ENG-5', sessionDirectory: WT })).body).toMatchObject({ plan: 'Short chat reply.', earlier: false });
  });

  test('a finish-comment draft carries no display block', async () => {
    const ctx = setup();
    await deliver(ctx, finished({}, `All done.${BLOCK}`));
    const drafts = (await ctx.call('GET', '/drafts')).body.drafts as { body: string }[];
    expect(drafts[0]!.body).toContain('All done.');
    expect(drafts[0]!.body).not.toContain('openui-lang');
  });
});

describe('post the plan', () => {
  test('preview reads the plan and the folder\'s setting and starts nothing', async () => {
    const ctx = setup();
    ctx.calls.reply = '## Plan\n1. Do it';
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, postPlan: true } } });
    const { body } = await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 'ses_1', identifier: 'ENG-5', sessionDirectory: WT });
    expect(body).toEqual({ ok: true, plan: '## Plan\n1. Do it', postPlan: true, earlier: false, isPlan: false });
    expect(ctx.calls.started.length).toBe(0);
    ctx.calls.status = 'busy';
    expect((await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 'ses_1', identifier: 'ENG-5', sessionDirectory: WT })).body.error).toContain('still working');
  });

  test('the setting defaults to off, and the plan rows carry it', async () => {
    const ctx = setup();
    ctx.calls.reply = '## Plan\n1. Do it';
    expect((await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 's', identifier: 'ENG-5', sessionDirectory: WT })).body.postPlan).toBe(false);
    await deliver(ctx, finished());
    expect((await ctx.call('GET', '/handoffs')).body.handoffs[0].postPlan).toBe(false);
    await ctx.call('PUT', '/config', { directories: { [REPO]: { ...mapping, postPlan: true } } });
    expect((await ctx.call('GET', '/handoffs')).body.handoffs[0].postPlan).toBe(true);
  });
});

describe('config, snapshot and instructions', () => {
  test('GET /config reports the mappings and whether a key is set', async () => {
    expect((await setup().call('GET', '/config')).body).toMatchObject({ hasKey: false });
    expect((await setup({ key: 'lin_api_x' }).call('GET', '/config')).body).toMatchObject({ hasKey: true });
    expect(Object.keys((await setup().call('GET', '/config')).body.directories)).toEqual([REPO]);
  });

  test('the key is never in an answer or a file', async () => {
    const ctx = setup({ key: 'lin_api_secret' });
    const config = await ctx.call('GET', '/config');
    expect(JSON.stringify(config.body)).not.toContain('lin_api_secret');
    await ctx.call('POST', '/snapshot', { directory: REPO, projects: [] });
    expect(JSON.stringify([...ctx.store.files.entries()])).not.toContain('lin_api_secret');
  });

  test('PUT /config replaces the mappings, and removing one clears its instructions and its worktrees', async () => {
    const ctx = setup();
    await ctx.call('POST', '/snapshot', { directory: WT, projects: [] });
    expect(ctx.calls.instructions.some(([d]) => d === WT)).toBe(true);
    const put = await ctx.call('PUT', '/config', { directories: {} });
    put.reply!.after!();
    await ctx.settle();
    expect(ctx.calls.instructions.filter(([, text]) => text === '').map(([d]) => d).sort()).toEqual([REPO, WT].sort());
    expect((await ctx.call('GET', '/config')).body.directories).toEqual({});
    expect((await ctx.call('PUT', '/config', '[]')).reply?.status).toBe(400);
  });

  test('a snapshot from a worktree gives that worktree its own branch issue', async () => {
    const ctx = setup();
    await ctx.call('POST', '/snapshot', {
      directory: WT,
      teams: [{ id: 't-eng', key: 'ENG', name: 'Engineering' }],
      myIssues: [{ identifier: 'ENG-5', title: 'Slow login', state: 'In Progress' }],
    });
    const text = ctx.calls.instructions.filter(([d]) => d === WT).at(-1)![1];
    expect(text).toContain('Current branch issue: ENG-5 "Slow login" [In Progress]');
    const main = ctx.calls.instructions.filter(([d]) => d === REPO).at(-1)![1];
    expect(main).not.toContain('Current branch issue');
  });

  test('a folder pinned to one team still knows a branch named for an issue of another team of the workspace', async () => {
    const ctx = setup();
    await ctx.call('POST', '/snapshot', { directory: WT, teams: [{ id: 't', key: 'OPS', name: 'Ops' }], teamKeys: ['OPS', 'ENG', 'INF'] });
    expect(ctx.calls.instructions.filter(([d]) => d === WT).at(-1)![1]).toContain('Current branch issue: ENG-5');
  });

  test('a branch whose team key is not the folder\'s is not taken for an issue', async () => {
    const ctx = setup();
    await ctx.call('POST', '/snapshot', { directory: WT, teams: [{ id: 't', key: 'OPS', name: 'Ops' }] });
    expect(ctx.calls.instructions.filter(([d]) => d === WT).at(-1)![1]).not.toContain('ENG-5');
  });

  test('an unchanged text is not sent twice', async () => {
    const ctx = setup();
    await ctx.call('POST', '/snapshot', { directory: REPO, teams: [{ id: 't-eng', key: 'ENG', name: 'E' }] });
    const n = ctx.calls.instructions.length;
    await ctx.call('POST', '/snapshot', { directory: REPO, teams: [{ id: 't-eng', key: 'ENG', name: 'E' }] });
    expect(ctx.calls.instructions.length).toBe(n);
  });

  test('a snapshot with no directory is a 400; an unmapped folder is ignored', async () => {
    const ctx = setup();
    expect((await ctx.call('POST', '/snapshot', { projects: [] })).reply?.status).toBe(400);
    expect((await ctx.call('POST', '/snapshot', { directory: '/elsewhere' })).body).toEqual({ ok: true, mapped: false });
  });

  test('a host that refuses setInstructions does not fail the route', async () => {
    const ctx = setup();
    const refusing = createApp({
      host: { ...({} as Deps['host']), setInstructions: async () => { throw new Error('NOT_GRANTED'); }, readSettings: async () => ({}), sessions: ctx.calls as never },
      store: ctx.store, read: () => null, now: () => 1, gqlFor: () => (async () => { throw new Error('x'); }),
    });
    const { reply } = { reply: await refusing.route('POST', '/snapshot', new URLSearchParams(), JSON.stringify({ directory: REPO })) };
    expect(reply?.status ?? 200).toBe(200);
  });
});

describe('with a personal API key (fake Linear)', () => {
  const calls: { query: string; variables?: Record<string, unknown> }[] = [];
  const fakeLinear: Gql = async <T,>(query: string, variables?: Record<string, unknown>): Promise<T> => {
    calls.push({ query, variables });
    if (query.includes('query Teams')) return { teams: { nodes: [{ id: 't-eng', key: 'ENG', name: 'Engineering' }, { id: 't-other', key: 'OTH', name: 'Other' }] } } as T;
    if (query.includes('query Projects')) return { projects: { nodes: [{ id: 'p1', name: 'API', slugId: 's', url: 'https://linear.app/a/project/api-s', health: 'onTrack', progress: 0.4, targetDate: '2026-12-01', status: { name: 'In Progress' }, teams: { nodes: [{ key: 'ENG' }] } }] } } as T;
    if (query.includes('query Documents')) return { documents: { nodes: [{ id: 'd1', title: 'Rollout', url: 'https://linear.app/a/document/d1', project: { id: 'p1', name: 'API' } }] } } as T;
    if (query.includes('query StatusMine')) return { issues: { nodes: [{ identifier: 'ENG-9', title: 'Nine', url: 'u', state: { name: 'Todo' } }] } } as T;
    if (query.includes('query BranchIssue')) return { issues: { nodes: [{ identifier: 'ENG-5', title: 'Slow login', url: 'u', description: 'Logins time out after 30 s.', state: { name: 'In Progress' } }] } } as T;
    if (query.includes('query ProjectDetail')) return { project: { id: 'p1', name: 'API', url: 'u', status: { name: 'In Progress' }, health: null, progress: 0.4, teams: { nodes: [] }, projectMilestones: { nodes: [] }, projectUpdates: { nodes: [] }, description: 'Fresh from Linear.', content: null, lead: null, startDate: null, targetDate: null } } as T;
    if (query.includes('query Document(')) return { document: { id: 'd1', title: 'Rollout', content: 'Fresh doc body.', url: 'u', project: null } } as T;
    throw new Error(`unexpected query ${query.slice(0, 40)}`);
  };

  test('refreshFromLinear reads teams, projects, documents and my issues, read only', async () => {
    calls.length = 0;
    const snap = await refreshFromLinear(fakeLinear, mapping, 'matt/eng-5-slow-login', 7);
    expect(snap).toMatchObject({ at: 7, source: 'key', teams: [{ key: 'ENG' }], projects: [{ id: 'p1', teams: ['ENG'] }], documents: [{ id: 'd1', project: 'API' }], myIssues: [{ identifier: 'ENG-9' }], branchIssue: { identifier: 'ENG-5', description: 'Logins time out after 30 s.' } });
    expect(calls.every((c) => !/\bmutation\b/.test(c.query))).toBe(true);
  });

  test('instructions with a key carry the branch issue description from Linear', async () => {
    const ctx = setup({ key: 'lin_api_x', gql: fakeLinear });
    await ctx.app.start();
    const text = ctx.calls.instructions.filter(([d]) => d === REPO).at(-1)![1];
    expect(text).toContain('Projects: API (https://linear.app/a/project/api-s); team ENG.');
    expect(text).toContain('My open issues here: ENG-9 Nine [Todo].');
    await ctx.call('POST', '/snapshot', { directory: WT });
    const wt = ctx.calls.instructions.filter(([d]) => d === WT).at(-1)![1];
    expect(wt).toContain('Current branch issue: ENG-5 "Slow login" [In Progress]. Logins time out after 30 s.');
  });

  test('resolve reads fresh with a key, and falls back to the cache when Linear fails', async () => {
    const ctx = setup({ key: 'lin_api_x', gql: fakeLinear });
    const fresh = await ctx.call('POST', '/mentions/resolve', { id: 'project:p1' });
    expect(fresh.body.text).toContain('Linear project: API');
    expect(fresh.body.text).not.toContain('cached at');
    expect((await ctx.call('POST', '/mentions/resolve', { id: 'doc:d1' })).body.text).toContain('Fresh doc body.');

    const down = setup({ key: 'lin_api_x', gql: (async () => { throw new Error('Linear is down'); }) as Gql });
    await down.call('POST', '/snapshot', { directory: REPO, projects: [{ id: 'p1', name: 'API', url: 'u', status: 'Started', teams: ['ENG'] }] });
    const cached = await down.call('POST', '/mentions/resolve', { id: 'project:p1' });
    expect(cached.body.text).toContain('Linear project: API');
    expect(cached.body.text).toContain('cached at');
  });

  test('search answers from memory and a stale cache refreshes in the background', async () => {
    const ctx = setup({ key: 'lin_api_x', gql: fakeLinear });
    await ctx.call('GET', '/config');
    await ctx.call('POST', '/snapshot', { directory: REPO, projects: [{ id: 'p0', name: 'Cached', url: 'u', status: 'S', teams: [] }] });
    ctx.tick(11 * 60_000);
    const { body } = await ctx.call('POST', '/mentions/search', { query: 'cach', directory: REPO });
    expect(body.items.map((i: { title: string }) => i.title)).toEqual(['Cached']);
    await ctx.settle();
    await ctx.settle();
    const after = await ctx.call('POST', '/mentions/search', { query: 'api', directory: REPO });
    expect(after.body.items.map((i: { title: string }) => i.title)).toContain('API');
  });
});

describe('plan extras', () => {
  const EXTRAS = '```linear-plan\n{"estimate": 3, "issues": [{"title": "Cache rates", "description": "Why", "estimate": 2}]}\n```';
  const step = 'Change the login timeout handling in the session middleware and cover it with a test that waits past the old limit.';
  const PLAN = `## Plan\n1. ${step}\n2. ${step}\n3. ${step}\n4. ${step}\n5. Run the suite.\n\n${EXTRAS}`;

  test('a plan with a block is kept once for a frame to write, and one frame at a time may claim it', async () => {
    const ctx = setup();
    await deliver(ctx, finished({}, PLAN));
    const list = (await ctx.call('GET', '/handoffs', undefined, `directory=${WT}`)).body;
    expect(list.extras).toEqual([expect.objectContaining({ sessionId: 'ses_1', identifier: 'ENG-5', directory: REPO, state: 'pending', extras: { estimate: 3, issues: [{ title: 'Cache rates', description: 'Why', estimate: 2 }] } })]);
    expect((await ctx.call('POST', '/handoffs', { sessionId: 'ses_1', action: 'claim-extras' })).body).toMatchObject({ ok: true, claimed: true });
    expect((await ctx.call('POST', '/handoffs', { sessionId: 'ses_1', action: 'claim-extras' })).body).toMatchObject({ ok: false, claimed: false });
    ctx.tick(3 * 60_000);
    expect((await ctx.call('POST', '/handoffs', { sessionId: 'ses_1', action: 'claim-extras' })).body.claimed).toBe(true);
    const done = (await ctx.call('POST', '/handoffs', { sessionId: 'ses_1', action: 'extras-done', estimateDone: true, estimateSet: 3, created: ['ENG-6', 'bad id'] })).body;
    expect(done.state).toMatchObject({ state: 'done', estimateSet: 3, created: ['ENG-6'] });
    // A revised plan never writes again.
    await deliver(ctx, finished({}, PLAN.replace('Cache rates', 'Other')));
    expect((await ctx.call('GET', '/extras', undefined, 'sessionId=ses_1')).body.extras).toMatchObject({ state: 'done', extras: { issues: [{ title: 'Cache rates' }] } });
  });

  test('a failure keeps what was written and can run again; the plan text and drafts lose the block', async () => {
    const ctx = setup();
    ctx.calls.reply = PLAN;
    await deliver(ctx, finished({}, PLAN));
    await ctx.call('POST', '/handoffs', { sessionId: 'ses_1', action: 'claim-extras' });
    const failed = (await ctx.call('POST', '/handoffs', { sessionId: 'ses_1', action: 'extras-failed', estimateDone: true, created: [], error: 'Linear refused' })).body.state;
    expect(failed).toMatchObject({ state: 'failed', error: 'Linear refused', estimateDone: true });
    expect((await ctx.call('POST', '/handoffs', { sessionId: 'ses_1', action: 'retry-extras' })).body.state.state).toBe('pending');
    expect((await ctx.call('GET', '/drafts')).body.drafts[0].body).not.toContain('linear-plan');
    const preview = (await ctx.call('POST', '/handoff', { mode: 'preview', sessionId: 'ses_1', identifier: 'ENG-5' })).body;
    expect(preview.plan).not.toContain('linear-plan');
    await ctx.call('POST', '/handoff', { sessionId: 'ses_1', identifier: 'ENG-5' });
    expect(String(ctx.calls.started[0]!.prompt)).toContain('leave them out of this build: "Cache rates"');
  });

  test('a reply that is not a plan keeps no extras, and Start plan sends the scale into the prompt', async () => {
    const ctx = setup();
    await deliver(ctx, finished({}, EXTRAS));
    expect((await ctx.call('GET', '/handoffs', undefined, `directory=${WT}`)).body.extras).toEqual([]);
    await ctx.call('POST', '/plan', { identifier: 'ENG-5', directory: WT, scale: 'Estimates on this team, written as the number: XS = 1, M = 3.' });
    const prompt = String(ctx.calls.started[0]!.prompt);
    expect(prompt).toContain('XS = 1, M = 3');
    expect(prompt).toContain('```linear-plan');
    expect(prompt).toContain('Do not create issues or change estimates yourself');
  });
});


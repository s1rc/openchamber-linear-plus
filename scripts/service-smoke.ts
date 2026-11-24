// Dev-only. Starts the built service (service/main.js) against a fake OpenChamber host and a temp data
// folder, then calls every route as SKILL Step 5 does with curl, and walks the plan to build handoff on fake
// data. Nothing here reaches Linear or the real host.
//
//   bun run build && bun scripts/service-smoke.ts
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';

const root = fs.mkdtempSync(path.join(process.env.TMPDIR ?? os.tmpdir(), 'linear-smoke-'));
const data = path.join(root, 'data');
const repo = path.join(root, 'repo');
const worktree = path.join(root, 'worktrees', 'eng-123');
fs.mkdirSync(path.join(repo, '.git', 'worktrees', 'eng-123'), { recursive: true });
fs.writeFileSync(path.join(repo, '.git', 'HEAD'), 'ref: refs/heads/main\n');
fs.writeFileSync(path.join(repo, '.git', 'worktrees', 'eng-123', 'HEAD'), 'ref: refs/heads/matt/eng-123-fix-login-timeout\n');
fs.mkdirSync(worktree, { recursive: true });
// A fake OpenCode: its config folder, sign-in file and model catalogue, so the lists do not depend on this machine.
const oc = { config: path.join(root, 'oc-config'), data: path.join(root, 'oc-data'), cache: path.join(root, 'oc-cache') };
fs.mkdirSync(path.join(oc.config, 'agents'), { recursive: true });
fs.mkdirSync(path.join(oc.data, 'opencode'), { recursive: true });
fs.mkdirSync(path.join(oc.cache, 'opencode'), { recursive: true });
fs.writeFileSync(path.join(oc.config, 'opencode.json'), JSON.stringify({ model: 'acme/fast-1' }));
fs.writeFileSync(path.join(oc.config, 'agents', 'ship.md'), '---\nmode: primary\n---\nShip it.');
fs.writeFileSync(path.join(oc.config, 'agents', 'scout.md'), '---\nmode: subagent\n---\n');
fs.writeFileSync(path.join(oc.data, 'opencode', 'auth.json'), JSON.stringify({ acme: { type: 'api', key: 'secret-not-for-the-service-to-return' } }));
fs.writeFileSync(path.join(oc.cache, 'opencode', 'models.json'), JSON.stringify({ acme: { name: 'Acme', models: { 'fast-1': { name: 'Acme Fast' }, 'slow-2': { name: 'Acme Slow' } } } }));
fs.writeFileSync(path.join(worktree, '.git'), `gitdir: ${path.join(repo, '.git', 'worktrees', 'eng-123')}\n`);

type Call = { method: string; input: Record<string, unknown> };
const calls: Call[] = [];
const PLAN = [
  '## Plan', '', 'Fix the login timeout in three steps.', '',
  '1. Read `src/auth/session.ts` and find the timeout.', '2. Raise the token refresh window to 30 s.', '3. Add a test for the slow path.', '4. Run `npm test`.',
  '', 'Risk: the refresh window is also used by the mobile client, so check it before shipping the change. '.repeat(6),
].join('\n');

const hostServer = http.createServer((req, res) => {
  let raw = '';
  req.on('data', (c) => { raw += c; });
  req.on('end', () => {
    const { method, input } = JSON.parse(raw) as Call;
    calls.push({ method, input });
    const results: Record<string, unknown> = {
      'instructions.set': { saved: true },
      'settings.read': { settings: {} },
      'sessions.status': { status: 'idle' },
      'sessions.lastReply': { reply: PLAN },
      'sessions.start': { sessionId: 'ses_build1', directory: input.directory ?? null },
    };
    res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify({ result: results[method] ?? {} }));
  });
});
await new Promise<void>((resolve) => hostServer.listen(0, '127.0.0.1', resolve));
const hostPort = (hostServer.address() as { port: number }).port;

const port = 4590 + Math.floor(Math.random() * 300);
const child = spawn('node', ['service/main.js'], {
  env: {
    ...process.env,
    OPENCHAMBER_SERVICE_PORT: String(port),
    OPENCHAMBER_SERVICE_TOKEN: 't',
    OPENCHAMBER_SERVICE_DATA_DIR: data,
    OPENCHAMBER_HOST_CALLBACK_URL: `http://127.0.0.1:${hostPort}`,
    OPENCODE_CONFIG_DIR: oc.config,
    XDG_DATA_HOME: oc.data,
    XDG_CACHE_HOME: oc.cache,
  },
  stdio: ['ignore', 'inherit', 'inherit'],
});

let failures = 0;
const check = (name: string, ok: boolean, detail?: unknown) => {
  if (!ok) failures += 1;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${ok || detail === undefined ? '' : `  ${JSON.stringify(detail)}`}`);
};
const call = async (method: string, route: string, body?: unknown, token = 't') => {
  const response = await fetch(`http://127.0.0.1:${port}${route}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    ...(body === undefined ? {} : { body: typeof body === 'string' ? body : JSON.stringify(body) }),
  });
  const text = await response.text();
  let json: Record<string, any> = {};
  try { json = JSON.parse(text) as Record<string, any>; } catch { /* not json */ }
  return { status: response.status, json };
};
const settle = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  for (let i = 0; i < 50; i += 1) {
    try { if ((await call('GET', '/health')).status === 200) break; } catch { /* not up yet */ }
    await settle(100);
  }
  check('GET /health', (await call('GET', '/health')).status === 200);
  check('a wrong token is refused', (await call('GET', '/health', undefined, 'x')).status === 401);
  check('an unknown route is 404, not 500', (await call('GET', '/nope')).status === 404);

  const mapping = { directory: repo, teamIds: ['t-eng'], linearProjectIds: ['p-repo'], activeProjectId: 'p-repo', finishComments: 'draft', buildAgent: 'build', buildModel: 'fireworks/kimi-k2', updatedAt: 1 };
  let r = await call('GET', '/config');
  check('GET /config starts empty', r.status === 200 && r.json.hasKey === false && Object.keys(r.json.directories).length === 0, r.json);
  r = await call('PUT', '/config', { directories: { [repo]: mapping } });
  check('PUT /config stores the mapping', r.status === 200 && r.json.directories[repo]?.finishComments === 'draft', r.json);
  check('PUT /config with junk is a 400, not a 500', (await call('PUT', '/config', 'not json')).status === 400);
  await settle();
  check('instructions were set for the mapped folder', calls.some((c) => c.method === 'instructions.set' && c.input.directory === repo), calls.map((c) => c.method));

  r = await call('POST', '/snapshot', {
    directory: worktree,
    teams: [{ id: 't-eng', key: 'ENG', name: 'Engineering' }],
    projects: [{ id: 'p-repo', name: 'Repo', url: 'https://linear.app/acme/project/repo-1a2b', status: 'In Progress', health: 'onTrack', progress: 0.42, targetDate: '2026-11-28', teams: ['ENG'] }],
    documents: [{ id: 'd-1', title: 'Rollout notes', url: 'https://linear.app/acme/document/rollout-9f', project: 'Repo', text: 'Linear document: Rollout notes\n\nShip behind a flag.' }],
    myIssues: [{ identifier: 'ENG-123', title: 'Fix login timeout', state: 'In Progress' }, { identifier: 'ENG-120', title: 'Tidy the auth tests', state: 'Todo' }],
  });
  check('POST /snapshot from a worktree is taken', r.status === 200 && r.json.mapped === true, r.json);
  const text = String(calls.filter((c) => c.method === 'instructions.set' && c.input.directory === worktree).at(-1)?.input.text ?? '');
  check('the worktree gets its own instructions with the branch issue', text.includes('ENG-123 "Fix login timeout" [In Progress]'), text);
  check('the instructions stay short', text.length > 0 && text.length <= 800, text.length);
  r = await call('POST', '/snapshot', { directory: path.join(root, 'elsewhere'), projects: [] });
  check('a snapshot for an unmapped folder is ignored', r.status === 200 && r.json.mapped === false, r.json);

  r = await call('GET', `/choices?directory=${encodeURIComponent(worktree)}`);
  check('GET /choices lists the primary agents', r.json.ok === true && JSON.stringify(r.json.agents.map((a: { id: string }) => a.id)) === '["build","plan","ship"]', r.json.agents);
  check('GET /choices lists the models of signed in providers, default first', r.json.models?.[0]?.id === 'acme/fast-1' && r.json.models.length === 2 && r.json.defaultModel === 'acme/fast-1', r.json.models);
  check('GET /choices never returns a stored secret', !JSON.stringify(r.json).includes('secret-not-for-the-service'));

  r = await call('POST', '/mentions/search', { query: 're', directory: worktree });
  const projectRow = r.json.items?.find((i: { id: string }) => i.id.startsWith('project:'));
  check('mentions search finds the project', r.status === 200 && projectRow?.title === 'Repo' && projectRow.id === 'project:p-repo', r.json);
  r = await call('POST', '/mentions/search', { query: 'login', directory: worktree });
  check('mentions search finds an issue first', r.json.items?.[0]?.id === 'issue:ENG-123', r.json);
  r = await call('POST', '/mentions/resolve', { id: 'issue:ENG-123' });
  check('mentions resolve reads a cached issue', String(r.json.text).includes('ENG-123: Fix login timeout'), r.json);
  r = await call('POST', '/mentions/search', { query: 'rollout', directory: repo });
  check('mentions search finds the document', r.json.items?.[0]?.id === 'doc:d-1', r.json);
  r = await call('POST', '/mentions/resolve', { id: 'project:p-repo' });
  check('mentions resolve returns markdown with the cache time', r.status === 200 && String(r.json.text).includes('Linear project: Repo') && String(r.json.text).includes('cached at'), r.json);
  r = await call('POST', '/mentions/resolve', { id: 'doc:d-1' });
  check('mentions resolve returns a document', String(r.json.text).includes('Ship behind a flag.'), r.json);
  r = await call('POST', '/mentions/resolve', { id: 'doc:nope' });
  check('mentions resolve of an unknown row is a 404 with a note', r.status === 404 && typeof r.json.message === 'string', r.json);

  const event = (type: string, extra: Record<string, unknown> = {}, content?: Record<string, unknown>) => ({
    v: 1,
    requestId: `r-${Math.random()}`,
    event: {
      id: `evt-${Math.random()}`, type, at: Date.now(), session: { id: 'ses_plan1', parentId: null }, project: { directory: worktree },
      linked: [{ id: 'guest:linear-dashboard:ENG-123', kind: 'guest', url: 'https://linear.app/acme/issue/ENG-123/fix-login-timeout', identifier: 'ENG-123' }],
      ...extra,
    },
    ...(content ? { content } : {}),
  });
  check('a bad session event is a 400', (await call('POST', '/session-events', { nope: true })).status === 400);
  r = await call('POST', '/session-events', event('turn-finished', {}, { type: 'turn-finished', sessionTitle: 'Plan ENG-123', reply: PLAN, replyTruncated: false }));
  check('a session event is answered { ok: true } at once', r.status === 200 && r.json.ok === true, r);
  await settle();
  r = await call('GET', `/drafts?directory=${encodeURIComponent(worktree)}`);
  check('the finished turn left one draft for the issue', r.json.drafts?.length === 1 && r.json.drafts[0].identifier === 'ENG-123' && r.json.drafts[0].body.startsWith('**OpenChamber session: Plan ENG-123**'), r.json);
  check('the draft is filed under the mapped folder', r.json.drafts?.[0]?.directory === repo, r.json.drafts?.[0]);
  const draftId = r.json.drafts?.[0]?.id as string;
  r = await call('GET', `/handoffs?directory=${encodeURIComponent(repo)}`);
  check('the plan is a pending handoff', r.json.handoffs?.length === 1 && r.json.handoffs[0].plan === true && r.json.handoffs[0].sessionDirectory === worktree, r.json);
  r = await call('POST', '/session-events', event('turn-finished', { session: { id: 'ses_sub', parentId: 'ses_plan1' } }, { type: 'turn-finished', sessionTitle: 'sub', reply: 'x', replyTruncated: false }));
  await settle(150);
  check('a subagent turn leaves nothing', (await call('GET', '/drafts')).json.drafts.length === 1);
  await call('POST', '/session-events', event('turn-finished', { linked: [] }, { type: 'turn-finished', sessionTitle: 'No link', reply: 'Done.', replyTruncated: false }));
  await settle(150);
  check('an unlinked session leaves nothing', (await call('GET', '/drafts')).json.drafts.length === 1);
  await call('POST', '/session-events', event('turn-started'));
  await call('POST', '/session-events', event('session-created'));
  await settle(150);

  r = await call('POST', '/drafts', { id: draftId, action: 'posted' });
  check('POST /drafts posted removes the draft', r.json.ok === true && (await call('GET', '/drafts')).json.drafts.length === 0, r.json);
  check('POST /drafts with a wrong action is a 400', (await call('POST', '/drafts', { id: 'x', action: 'burn' })).status === 400);

  const before = calls.length;
  r = await call('POST', '/handoff', { sessionId: 'ses_plan1', identifier: 'ENG-123', issueTitle: 'Fix login timeout' });
  check('POST /handoff starts the build session', r.json.ok === true && r.json.sessionId === 'ses_build1', r.json);
  const started = calls.slice(before).find((c) => c.method === 'sessions.start');
  const input = started?.input as { prompt?: string; directory?: string; agent?: string; model?: string; title?: string } | undefined;
  check('the build starts in the planning session\'s worktree', input?.directory === worktree, input?.directory);
  check('the build uses the folder\'s agent and model', input?.agent === 'build' && input?.model === 'fireworks/kimi-k2', input);
  check('the first message names the issue, the branch and the plan', Boolean(input?.prompt?.includes('ENG-123') && input.prompt.includes('matt/eng-123-fix-login-timeout') && input.prompt.includes('Raise the token refresh window')), input?.prompt?.slice(0, 200));
  check('the pending handoff is gone', (await call('GET', `/handoffs?directory=${encodeURIComponent(repo)}`)).json.handoffs.length === 0);
  await call('POST', '/session-events', { ...event('turn-finished', { session: { id: 'ses_build1', parentId: null }, linked: [] }, { type: 'turn-finished', sessionTitle: 'ENG-123 build', reply: 'Implemented. Tests pass.', replyTruncated: false }) });
  await settle();
  r = await call('GET', '/drafts');
  check('the build session counts as linked to the issue', r.json.drafts?.length === 1 && r.json.drafts[0].identifier === 'ENG-123' && r.json.drafts[0].sessionId === 'ses_build1', r.json);
  check('a build session leaves no handoff of its own', (await call('GET', '/handoffs')).json.handoffs.length === 0);
  r = await call('POST', '/plan', { identifier: 'ENG-123', directory: worktree, issueTitle: 'Fix login timeout', context: 'ENG-123: Fix login timeout\nLogins time out.' });
  const plan = calls.filter((c) => c.method === 'sessions.start').at(-1)?.input as { agent?: string; model?: string; prompt?: string; directory?: string; title?: string } | undefined;
  check('POST /plan starts the plan session in the worktree with the plan agent', r.json.ok === true && plan?.directory === worktree && plan.agent === 'plan' && plan.title === 'ENG-123 plan', plan);
  check('the plan prompt asks for a plan only and carries the issue', Boolean(plan?.prompt?.includes('Do not change any files yet') && plan.prompt.includes('Logins time out.')), plan?.prompt?.slice(0, 120));
  r = await call('GET', '/plans?identifier=ENG-123');
  check('GET /plans lists the plan session the service started', r.json.sessions?.length === 1 && r.json.sessions[0].sessionId === 'ses_build1', r.json);
  r = await call('POST', '/handoff', { mode: 'preview', sessionId: 'ses_plan1', identifier: 'ENG-123', sessionDirectory: worktree });
  check('POST /handoff preview reads the plan and starts nothing', r.json.ok === true && String(r.json.plan).includes('Raise the token refresh window') && r.json.postPlan === false && calls.filter((c) => c.method === 'sessions.start').length === 2, r.json.ok);

  r = await call('POST', '/handoff', { sessionId: 'ses_plan1', identifier: 'nope' });
  check('POST /handoff with a bad identifier is refused', r.json.ok === false, r.json);
  await call('POST', '/session-events', event('turn-finished', {}, { type: 'turn-finished', sessionTitle: 'Plan again', reply: PLAN, replyTruncated: false }));
  await settle();
  r = await call('POST', '/handoffs', { id: 'ses_plan1:ENG-123', action: 'dismiss' });
  check('POST /handoffs dismiss removes the row', r.json.ok === true && (await call('GET', '/handoffs')).json.handoffs.length === 0, r.json);

  const startsBefore = calls.filter((c) => c.method === 'sessions.start').length;
  const lastSend = () => calls.filter((c) => c.method === 'sessions.send').at(-1)?.input as { sessionId?: string; prompt?: string } | undefined;
  r = await call('POST', '/plan', { identifier: 'ENG-123', directory: worktree, issueTitle: 'Fix login timeout', context: 'ENG-123: Fix login timeout\nLogins time out.', lead: 'ses_lead1', leadTitle: 'ENG-123 Fix login timeout' });
  const leadPlan = lastSend();
  check('POST /plan with a lead sends the plan step to that session', r.json.ok === true && r.json.sessionId === 'ses_lead1' && leadPlan?.sessionId === 'ses_lead1' && Boolean(leadPlan.prompt?.includes('- ownWork: true') && leadPlan.prompt.includes('PLAN PROMPT START')), r.json);
  r = await call('POST', '/handoff', { sessionId: 'ses_lead1', identifier: 'ENG-123', issueTitle: 'Fix login timeout' });
  const leadBuild = lastSend();
  check('POST /handoff on a lead sends it the build step and starts no session', r.json.ok === true && r.json.sessionId === 'ses_lead1' && Boolean(leadBuild?.prompt?.includes('BUILD PROMPT START') && leadBuild.prompt.includes('Raise the token refresh window')) && calls.filter((c) => c.method === 'sessions.start').length === startsBefore, r.json);

  r = await call('PUT', '/config', { directories: {} });
  await settle();
  check('removing the mapping clears the instructions', calls.some((c) => c.method === 'instructions.set' && c.input.directory === repo && c.input.text === ''), calls.filter((c) => c.method === 'instructions.set').map((c) => [c.input.directory, String(c.input.text).length]));

  const files = fs.readdirSync(data).sort();
  check('state is only in the data folder', files.includes('config.json') && files.includes('snapshot.json'), files);
  check('no personal API key was written to disk', !files.some((f) => /key/i.test(f)) && !fs.readFileSync(path.join(data, 'config.json'), 'utf8').includes('lin_api'));
} finally {
  child.kill();
  hostServer.close();
  fs.rmSync(root, { recursive: true, force: true });
}
console.log(failures ? `${failures} check(s) failed` : 'all service checks passed');
process.exit(failures ? 1 : 0);

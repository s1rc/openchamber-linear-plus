// End-to-end tests of the Linear+ frames in a real browser, on fake data only: the built pages run in a mock host
// (e2e/harness.html) whose Linear and service answers come from the fixtures `bun run fixtures` writes. Nothing
// reaches the real Linear workspace or a real OpenChamber.
//
//   bun run e2e            (builds, writes the fixtures, runs every test)
//   bun e2e/run.ts --only picker
//
// Needs Google Chrome; set CHROME_PATH when it is not in /Applications.
import path from 'node:path';
import { chromium, type Browser, type FrameLocator, type Page } from 'playwright-core';

const root = path.resolve(import.meta.dir, '..');
const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : null;

type Saved = { status: number; body: string };
type Fixtures = { service: Record<string, Saved>; request: Record<string, Saved> };
const loadFixtures = async (name: string): Promise<Fixtures> => Bun.file(path.join(root, 'harness/fixtures', `${name}.json`)).json();
const fixtures: Record<string, Fixtures> = { workspace: await loadFixtures('workspace'), 'plan-extras': await loadFixtures('plan-extras') };

type Spec = { method: string; path: string; query?: Record<string, string>; body?: string };
const keyOf = (spec: Spec): string => {
  const query = Object.entries(spec.query ?? {}).sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${k}=${v}`).join('&');
  return `${spec.method} ${spec.path}${query ? `?${query}` : ''} ${spec.body ?? ''}`;
};

/** Every Linear request and service call the frames made, for the tests that check what was written. */
const calls: { bucket: string; key: string; hit: boolean }[] = [];
const harness = await Bun.file(path.join(import.meta.dir, 'harness.html')).text();
const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === '/') return new Response(harness, { headers: { 'Content-Type': 'text/html' } });
    if (url.pathname === '/svc' || url.pathname === '/req') {
      const spec = (await req.json()) as Spec;
      const set = fixtures[url.searchParams.get('fx') ?? 'workspace'] ?? fixtures.workspace!;
      const bucket = url.pathname === '/svc' ? 'service' : 'request';
      const key = keyOf(spec);
      const hit = set[bucket][key] ?? set[bucket][`${spec.method} ${spec.path} *`];
      calls.push({ bucket, key, hit: Boolean(hit) });
      if (hit) return Response.json(hit);
      return Response.json({ error: 'no fixture', code: bucket === 'request' ? 'DISCONNECTED' : 'NO_SERVICE' }, { status: 502 });
    }
    if (url.pathname.startsWith('/ext/')) {
      const file = Bun.file(path.join(root, decodeURIComponent(url.pathname.slice(5))));
      if (await file.exists()) return new Response(file);
    }
    return new Response('not found', { status: 404 });
  },
});

const DIR = '/work/engineering-api';
const PROJECTS = JSON.stringify([{ id: 'ocp1', name: 'engineering-api', directory: DIR }]);

type Ctx = { page: Page; frame: FrameLocator; log: () => Promise<{ type: string; payload: any }[]> };

const open = async (browser: Browser, query: Record<string, string>, width = 1300, height = 800): Promise<Ctx> => {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.clock.setFixedTime(new Date('2026-11-09T12:00:00Z'));
  await page.goto(`http://localhost:${server.port}/?${new URLSearchParams({ dir: DIR, ...query })}`);
  const frame = page.frameLocator('#f');
  await frame.locator('#root > *').first().waitFor({ timeout: 20_000 });
  return { page, frame, log: () => page.evaluate(() => (window as unknown as { __log: { type: string; payload: any }[] }).__log) };
};

const toasts = async (ctx: Ctx) => (await ctx.log()).filter((m) => m.type === 'toast').map((m) => String(m.payload?.message ?? ''));

const expect = (ok: unknown, what: string) => { if (!ok) throw new Error(what); };

/** Waits up to `ms` for `check` to hold, then fails with `what`. */
const until = async (check: () => Promise<unknown>, what: string, ms = 5000) => {
  const end = Date.now() + ms;
  for (;;) {
    if (await check().catch(() => false)) return;
    if (Date.now() > end) throw new Error(what);
    await new Promise((r) => setTimeout(r, 100));
  }
};

const navItem = (ctx: Ctx, label: string) => ctx.frame.locator('.lin-nav .lin-nav-item', { has: ctx.frame.locator('.lin-nav-label', { hasText: new RegExp(`^${label}$`) }) }).first();

type Test = { name: string; run: (browser: Browser) => Promise<void> };

const tests: Test[] = [
  {
    name: 'picker',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'dialog/index.html', surface: 'dialog' }, 672, 700);
      const rows = ctx.frame.locator('.lin-pick-row');
      await rows.first().waitFor();
      expect((await rows.count()) > 3, 'the picker lists the folder\'s issues');
      expect(await ctx.frame.locator('.lin-picker-preview .lin-preview-title').count() === 1, 'the first issue is previewed');
      await ctx.frame.locator('.lin-picker-head input').fill('https://linear.app/acme/issue/ENG-13/show-saved-cards');
      await until(async () => (await rows.count()) === 1 && (await rows.first().innerText()).includes('Show saved cards first'), 'a pasted link lists only that issue');
      await ctx.frame.locator('.lin-picker-head input').press('Enter');
      await ctx.page.waitForTimeout(800);
      const log = await ctx.log();
      const attach = log.find((m) => m.type === 'attach');
      expect(attach?.payload?.id === 'ENG-13', 'Enter attaches ENG-13');
      expect(log.some((m) => m.type === 'close'), 'then the dialog closes');
      await ctx.page.context().close();
    },
  },
  {
    name: 'dialog-escape',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'dialog/index.html', surface: 'dialog' }, 672, 700);
      await ctx.frame.locator('.lin-picker-head .oc-sdk-trigger').click();
      expect(await ctx.frame.locator('.oc-sdk-popup').count() === 1, 'the filter opens');
      await ctx.page.keyboard.press('Escape');
      await ctx.page.waitForTimeout(300);
      expect(!(await ctx.log()).some((m) => m.type === 'close'), 'the first Escape closes only the filter');
      await ctx.frame.locator('.lin-picker-head input').focus();
      await ctx.page.keyboard.press('Escape');
      await ctx.page.waitForTimeout(300);
      expect((await ctx.log()).some((m) => m.type === 'close'), 'the next Escape closes the dialog');
      await ctx.page.context().close();
    },
  },
  {
    name: 'issue-pane',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click();
      const pane = ctx.frame.locator('.lin-pane');
      await pane.waitFor();
      await until(async () => (await pane.locator('.lin-issue-trail').innerText()).includes('This folder'), 'the pane says where the issue came from');
      expect(await ctx.frame.locator('.lin-body--split > .lin-content [data-issue="ENG-13"]').count() === 1, 'the list stays beside the pane');
      await ctx.frame.locator('.lin-body--split > .lin-content [data-issue="ENG-13"]').click();
      await pane.locator('.lin-issue-trail', { hasText: 'ENG-13' }).waitFor();
      await pane.click({ position: { x: 5, y: 300 } });
      await ctx.page.keyboard.press('Escape');
      await ctx.page.waitForTimeout(300);
      expect(await pane.count() === 0, 'Escape closes the pane');
      await navItem(ctx, 'Cycles').click();
      await ctx.frame.locator('[data-issue]').first().click();
      await pane.waitFor();
      await until(async () => (await pane.locator('.lin-issue-trail').innerText()).includes('Cycle 42'), 'a cycle\'s issue opens in the same pane');
      await ctx.page.context().close();
    },
  },
  {
    name: 'issue-rail',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'panel' }, 360, 800);
      await ctx.frame.locator('.lin-header .oc-sdk-trigger').click();
      await ctx.frame.locator('[role="option"]', { hasText: 'Issues' }).first().click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click();
      await ctx.frame.locator('.lin-issue-view').waitFor();
      expect(await ctx.frame.locator('.lin-body > .lin-content[hidden]').count() === 1, 'on the rail the issue replaces the view');
      expect(await ctx.frame.locator('.lin-issue-trail').count() === 1, 'and says where it came from');
      await ctx.frame.locator('.lin-issue-bar button', { hasText: 'Back' }).click();
      await ctx.frame.locator('[data-issue="ENG-11"]').waitFor();
      expect(await ctx.frame.locator('.lin-issue-view').count() === 0, 'Back returns to the list');
      await ctx.page.context().close();
    },
  },
  {
    name: 'sidebar',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      const eng = ctx.frame.locator('[data-team="ENG"]');
      await eng.waitFor();
      const pages = await eng.locator(':scope > .lin-nav-children > .lin-nav-item').allInnerTexts();
      expect(['Home', 'Triage', 'Issues', 'Projects', 'Views'].every((p, i) => pages[i]?.startsWith(p)), `the folder's team is open with its pages (got ${pages.join(', ')})`);
      const own = (label: string) => eng.locator(':scope > .lin-nav-children > .lin-nav-item', { hasText: label });
      await until(async () => (await own('Triage').locator('.lin-nav-count').innerText()) === '1', 'Triage shows its count');
      const mob = ctx.frame.locator('[data-team="MOB"]');
      expect(await eng.locator('[data-team="MOB"]').count() === 1, 'the sub-team sits under its parent');
      await mob.locator('.lin-nav-team-row').click();
      expect(await mob.locator('.lin-nav-children > .lin-nav-item').count() === 4, 'the sub-team opens (it has no triage)');
      await own('Views').click();
      await ctx.frame.locator('.lin-view-row', { hasText: 'All Bugs' }).click();
      await ctx.frame.locator('.lin-view[aria-pressed="true"]', { hasText: 'All Bugs' }).waitFor();
      const saved = (await ctx.log()).filter((m) => m.type === 'storage' && m.payload?.op === 'set' && m.payload?.key === 'pref:nav-open');
      expect(saved.length > 0, 'opening and closing teams is remembered');
      await ctx.page.context().close();
    },
  },
  {
    name: 'milestones',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Projects').click();
      await ctx.frame.locator('.lin-table-row:not(.lin-table-head)', { hasText: 'Checkout' }).click();
      const count = ctx.frame.locator('.lin-milestone-count', { hasText: '3 issues' });
      await count.waitFor();
      await count.click();
      await ctx.frame.locator('.lin-milestone-scope', { hasText: 'Idempotent payments' }).waitFor();
      await until(async () => (await ctx.frame.locator('[data-issue]').count()) === 3, 'the milestone shows its three issues');
      await ctx.page.context().close();
    },
  },
  {
    name: 'copy-buttons',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click();
      await ctx.frame.locator('.lin-issue-bar .lin-icon-btn[aria-label^="Copy ID"]').click();
      await ctx.page.waitForTimeout(300);
      const copied = (await ctx.log()).find((m) => m.type === 'clipboard-write');
      expect(JSON.stringify(copied?.payload ?? '').includes('ENG-11'), 'Copy ID copies the key');
      await ctx.page.context().close();
    },
  },
  {
    name: 'assign-to-me',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page', storage: JSON.stringify({ 'pref:assign-me': true }) });
      await navItem(ctx, 'Issues').click();
      await ctx.frame.locator('.lin-toolbar button', { hasText: 'New issue' }).click();
      const modal = ctx.frame.locator('.lin-modal');
      await until(async () => (await modal.innerText()).includes('Default in Settings: on'), 'the form says the Settings default');
      expect((await modal.locator('[role="switch"]', { hasText: 'Assign to me' }).getAttribute('aria-checked')) === 'true', 'Assign to me starts on');
      await ctx.page.context().close();
    },
  },
  {
    name: 'plan-extras',
    run: async (browser) => {
      const before = calls.length;
      const ctx = await open(browser, { page: 'status/index.html', surface: 'status', fx: 'plan-extras' }, 360, 700);
      let said: string[] = [];
      for (let i = 0; i < 40 && !said.some((t) => t.includes('ENG-40')); i += 1) {
        await ctx.page.waitForTimeout(250);
        said = await toasts(ctx);
      }
      expect(said.some((t) => t === 'Plan for ENG-16: set the estimate of ENG-16 to M; created ENG-40, related to ENG-16.'), `the frame writes the plan's extras and says so (got ${said.join(' | ')})`);
      const made = calls.slice(before).map((c) => c.key);
      expect(made.some((k) => k.includes('claim-extras')), 'it claims the plan first');
      expect(made.some((k) => k.includes('mutation IssueUpdate') && k.includes('"estimate":3')), 'it sets the estimate on the team scale');
      expect(made.some((k) => k.includes('mutation IssueCreate') && k.includes('Add refund screenshots')), 'it creates the split-out issue');
      expect(made.some((k) => k.includes('mutation IssueRelationCreate')), 'and relates it');
      expect(made.some((k) => k.includes('extras-done')), 'and reports it done');
      expect(made.filter((k) => k.includes('mutation IssueCreate')).length === 1, 'exactly once');
      await ctx.page.context().close();
    },
  },
];

const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await chromium.launch({ executablePath: chrome, headless: true });
let failed = 0;
for (const test of tests.filter((t) => !only || t.name === only)) {
  const start = Date.now();
  try {
    await test.run(browser);
    console.log(`ok    ${test.name} (${Date.now() - start} ms)`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL  ${test.name}: ${error instanceof Error ? error.message.split('\n')[0] : String(error)}`);
  }
}
await browser.close();
server.stop(true);
console.log(failed ? `${failed} failed` : 'all e2e tests passed');
process.exit(failed ? 1 : 0);

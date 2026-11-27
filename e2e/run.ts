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

/** `realClock`: leave time running. A frozen clock breaks ProseMirror, which tells a click from a double click by time. */
const open = async (browser: Browser, query: Record<string, string>, width = 1300, height = 800, realClock = false): Promise<Ctx> => {
  const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  if (!realClock) await page.clock.setFixedTime(new Date('2026-11-09T12:00:00Z'));
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
      const milestone = pane.locator('.oc-sdk-trigger', { hasText: 'Set milestone' });
      await milestone.waitFor();
      await milestone.click();
      const beforeMilestone = calls.length;
      await ctx.frame.locator('[role="option"]', { hasText: 'Idempotent payments' }).click();
      await until(async () => calls.slice(beforeMilestone).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('"projectMilestoneId":"m2"') && c.hit), 'the issue pane assigns a milestone');
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
    name: 'issue-relations',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      const row = ctx.frame.locator('[data-issue="ENG-11"]');
      await row.waitFor();
      expect(await row.locator('.lin-meta-blocked').innerText() === '1', 'the list counts only the unfinished prerequisite');
      expect(await row.locator('.lin-meta-blocking').innerText() === '1', 'and only the unfinished dependent');
      await row.click();
      const pane = ctx.frame.locator('.lin-pane');
      await pane.locator('.lin-issue-heading').waitFor();
      const section = (name: string) => pane.locator('.lin-side-section').filter({ has: ctx.frame.locator('.lin-side-title', { hasText: new RegExp(`^${name}$`) }) });
      expect((await section('Blocked by').innerText()).includes('Retry webhook deliveries'), 'Blocked by keeps the open prerequisite');
      expect(!(await section('Blocked by').innerText()).includes('Done prerequisite'), 'Blocked by drops the completed prerequisite');
      expect((await section('Blocking').innerText()).includes('Show saved cards'), 'Blocking keeps the open dependent');
      expect(!(await section('Blocking').innerText()).includes('Done dependent'), 'Blocking drops the completed dependent');
      expect((await section('Related').innerText()).includes('Done prerequisite') && (await section('Related').innerText()).includes('Done dependent'), 'completed dependencies read as Related');
      const related = section('Related').locator('.lin-relation', { hasText: 'Done prerequisite' });
      const widths = await related.evaluate((el) => ({
        row: el.getBoundingClientRect().width,
        link: el.querySelector('.lin-relation-open')!.getBoundingClientRect().width,
        section: el.closest('.lin-side-section')!.getBoundingClientRect().width,
      }));
      expect(Math.abs(widths.row - widths.section) < 1 && Math.abs(widths.link - widths.row) < 1, `the relation title and status use the full column (${JSON.stringify(widths)})`);
      await related.click({ button: 'right' });
      const menu = pane.locator('.lin-menu').first();
      const menuBox = await menu.boundingBox();
      expect(Boolean(menuBox && menuBox.x > 20 && menuBox.y > 20), 'the relation menu opens beside the pointer, not at the pane origin');
      await menu.locator('button', { hasText: 'Change to' }).click();
      await pane.locator('.lin-menu--sub button', { hasText: /^Blocking$/ }).click();
      await until(async () => calls.some((c) => c.key.includes('mutation IssueRelationUpdate') && c.key.includes('"id":"r-done-in"') && c.key.includes('"type":"blocks"') && c.hit), 'right click changes the relation type');
      const blocking = section('Blocked by').locator('.lin-relation', { hasText: 'Retry webhook deliveries' });
      await blocking.hover();
      await blocking.locator('button[aria-label="Remove relation with ENG-14"]').click();
      await until(async () => calls.some((c) => c.key.includes('mutation IssueRelationDelete') && c.key.includes('"id":"r-active-in"') && c.hit), 'the hover X removes the relation');
      const grid = pane.locator('.lin-issue-grid');
      const gridBox = await grid.boundingBox();
      if (!gridBox) throw new Error('The issue grid has no box');
      await grid.click({ button: 'right', position: { x: gridBox.width - 12, y: gridBox.height - 6 } });
      const issueMenu = pane.locator('.lin-menu').first();
      await issueMenu.waitFor();
      const menuText = await issueMenu.innerText();
      expect(['Status', 'Priority', 'Create related', 'Mark as', 'Remove', 'Copy', 'Convert to', 'Delete'].every((label) => menuText.includes(label)), 'the properties column opens the full issue menu');
      await ctx.page.keyboard.press('Escape');
      await ctx.page.context().close();
    },
  },
  {
    name: 'issue-documents',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click();
      const pane = ctx.frame.locator('.lin-pane');
      const body = pane.locator('.lin-issue-body');
      await body.locator('.lin-subissues').waitFor();
      const documents = body.locator('.lin-documents');
      await documents.waitFor();
      expect((await documents.innerText()).includes('Resources'), 'Documents is named Resources');
      expect((await documents.innerText()).includes('ENG-13 full plan'), 'the issue lists its attached plan document');
      expect((await documents.innerText()).includes('Datadog: checkout p99 latency'), 'Resources also lists the issue links');
      expect(!(await pane.locator('.lin-issue-side').innerText()).includes('Datadog: checkout p99 latency'), 'the link no longer sits in the side column');
      await documents.locator('.lin-resource-add button').click();
      expect((await ctx.frame.getByRole('menuitem').allInnerTexts()).join(',') === 'Add link...,Add document,Add customer request...', 'the Resources plus button offers the three resource actions');
      await ctx.frame.getByRole('menuitem', { name: 'Add link...' }).click();
      expect((await ctx.frame.locator('.lin-modal-title').innerText()).includes('Add a link to ENG-11'), 'Add link opens the existing link dialog');
      await ctx.frame.locator('.lin-modal').getByRole('button', { name: 'Cancel' }).click();
      const afterSubissues = await body.evaluate((el) => {
        const subissues = el.querySelector('.lin-subissues');
        const docs = el.querySelector('.lin-documents');
        return Boolean(subissues && docs && (subissues.compareDocumentPosition(docs) & Node.DOCUMENT_POSITION_FOLLOWING));
      });
      expect(afterSubissues, 'Resources sits under the sub-issue list');
      await documents.locator('.lin-document .lin-document-toggle').click();
      const content = documents.locator('.lin-document-content');
      await content.locator('.lin-md').waitFor();
      expect((await content.innerText()).includes('The complete implementation, verification steps, risks, and estimates stay inline in Linear+.'), 'the full document opens inline');
      expect(!(await ctx.log()).some((m) => m.type === 'open-url'), 'expanding the document does not open an external link');

      await pane.locator('.lin-issue-bar button', { hasText: 'Close' }).click();
      await ctx.frame.locator('[data-issue="ENG-13"]').click();
      const emptySubissues = pane.locator('.lin-subissues');
      await emptySubissues.waitFor();
      expect(await emptySubissues.locator('.lin-subissues-list').count() === 0, 'Sub-issues still shows when the issue has none');
      await emptySubissues.getByRole('button', { name: 'Add sub-issues', exact: true }).click();
      const drawer = emptySubissues.locator('.lin-subissue-form');
      await drawer.locator('input[placeholder="Issue title"]').fill('Add retry metrics');
      await until(async () => (await drawer.locator('.lin-field-row').nth(1).locator('.oc-sdk-trigger').first().innerText()).includes('Backlog'), 'the sub-issue drawer loads the parent team defaults');
      const beforeCreate = calls.length;
      await drawer.getByRole('button', { name: 'Create', exact: true }).click();
      await until(async () => calls.slice(beforeCreate).some((c) => c.key.includes('mutation IssueCreate') && c.key.includes('"parentId":"i-eng-13"') && c.key.includes('"title":"Add retry metrics"') && c.hit), 'Create makes a linked sub-issue');
      await until(async () => await drawer.count() === 0, 'the sub-issue drawer closes after creating');
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
    name: 'worktree-fallback',
    run: async (browser) => {
      const directory = `${DIR}-eng-11-batch-tax-lookups`;
      const saved = [
        { route: { view: 'team-issues', teamId: 'missing' } },
        { route: { view: 'my-issues' }, openIssue: { [`${directory}::my-issues:assigned`]: 'ENG-999' } },
        { route: { view: 'project-detail', projectId: 'missing' } },
      ];
      for (const viewState of saved) {
        const ctx = await open(browser, {
          page: 'panel/index.html', surface: 'panel', dir: directory, projects: PROJECTS,
          worktrees: JSON.stringify([{ projectId: 'ocp1', directory, name: 'eng-11-batch-tax-lookups', branch: '', status: 'ready' }]),
          storage: JSON.stringify({ 'ui:p:ocp1': viewState }),
        }, 360, 800);
        await ctx.frame.locator('.lin-issue-view').waitFor();
        expect(await ctx.frame.locator('.lin-issue-heading').innerText() === 'Checkout times out when the cart has more than 50 items', 'an unusable saved route, issue or project opens the issue named by the worktree');
        expect((await ctx.frame.locator('.lin-issue-trail').innerText()).includes('ENG-11'), 'the fallback opens ENG-11');
        await ctx.page.context().close();
      }
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
      const count = ctx.frame.locator('.lin-milestone-count', { hasText: '50% of 3' });
      await count.waitFor();
      // Linear gives a milestone's progress as a percent: 50 is half done, not complete.
      const half = await ctx.frame.locator('.lin-milestone-row', { hasText: 'Idempotent payments' }).innerText();
      expect(half.includes('50%') && !half.includes('100%'), `a half-done milestone shows 50% (got ${half.replace(/\s+/g, ' ')})`);
      expect((await ctx.frame.locator('.sui-card', { hasText: 'Milestones' }).first().innerText()).includes('1 of 2'), 'and only the finished one counts as done');
      const copyProject = ctx.frame.locator('.lin-icon-btn[aria-label="Copy project link"]');
      await copyProject.click();
      await until(async () => (await ctx.log()).some((m) => m.type === 'clipboard-write' && JSON.stringify(m.payload).includes('https://linear.app/acme/project/checkout')), 'the project icon copies its Linear link');
      const attachProject = ctx.frame.getByRole('button', { name: 'Attach', exact: true });
      const copyBox = await copyProject.boundingBox();
      const attachBox = await attachProject.boundingBox();
      expect(Boolean(copyBox && attachBox && copyBox.x < attachBox.x), 'the project link icon sits left of Attach');
      await attachProject.click();
      await until(async () => (await ctx.log()).some((m) => m.type === 'attach' && m.payload?.id === 'project:p-checkout' && m.payload?.text?.includes('Linear project: Checkout')), 'Attach adds the project overview to the message');
      const more = ctx.frame.getByRole('button', { name: 'More', exact: true });
      await more.click();
      const items = ctx.frame.getByRole('menuitem');
      expect((await items.allInnerTexts()).join(',') === 'Link to this session,Open in Linear', 'the project More menu links the session and opens Linear');
      await ctx.frame.getByRole('menuitem', { name: 'Link to this session' }).click();
      await until(async () => (await ctx.log()).some((m) => m.type === 'session-link' && m.payload?.id === 'project:p-checkout'), 'Link to this session links the project');
      await more.click();
      await ctx.frame.getByRole('menuitem', { name: 'Open in Linear' }).click();
      await until(async () => (await ctx.log()).some((m) => m.type === 'open-url' && JSON.stringify(m.payload).includes('https://linear.app/acme/project/checkout-sp-checkout')), 'Open in Linear moved into the project More menu');
      await count.click();
      await ctx.frame.locator('.lin-milestone-scope', { hasText: 'Idempotent payments' }).waitFor();
      await until(async () => (await ctx.frame.locator('[data-issue]').count()) === 3, 'the milestone shows its three issues');
      await ctx.frame.locator('[data-issue="ENG-13"]').click();
      await ctx.frame.locator('.lin-pane .lin-issue-heading').waitFor();
      await ctx.frame.locator('.lin-issue-bar button', { hasText: 'Close' }).click();
      await ctx.frame.locator('.lin-milestone-scope', { hasText: 'Idempotent payments' }).waitFor();
      expect(await ctx.frame.locator('[data-issue]').count() === 3, 'Back keeps the milestone filter and its three issues');
      await ctx.frame.locator('.lin-toolbar-search input').fill('ENG-13');
      await until(async () => (await ctx.frame.locator('[data-issue]').count()) === 1, 'the text filter narrows the milestone');
      await navItem(ctx, 'Projects').click();
      await ctx.frame.locator('.lin-table-row:not(.lin-table-head)', { hasText: 'Checkout' }).click();
      await ctx.frame.locator('.lin-milestone-scope', { hasText: 'Idempotent payments' }).waitFor();
      expect(await ctx.frame.locator('.lin-toolbar-search input').inputValue() === 'ENG-13', 'a remounted list restores its text filter');
      expect(await ctx.frame.locator('[data-issue]').count() === 1, 'and keeps the milestone and text filters together');
      await ctx.page.context().close();
    },
  },
  {
    name: 'project-edit',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Projects').click();
      await ctx.frame.locator('.lin-table-row:not(.lin-table-head)', { hasText: 'Checkout' }).click();
      const title = ctx.frame.locator('.lin-project-title');
      await title.waitFor();
      // The side column shows the burn-up and the activity; the main column keeps full milestone text.
      const side = ctx.frame.locator('.lin-project-side');
      await side.locator('.lin-project-panel').filter({ has: ctx.frame.locator('.lin-burnup') }).waitFor();
      expect((await side.innerText()).includes('Scope'), 'the Progress panel shows the scope');
      await until(async () => (await side.locator('.lin-burnup svg').count()) === 1, 'and draws the burn-up chart');
      const activity = side.locator('.lin-project-panel', { hasText: 'Activity' });
      await activity.waitFor();
      const activityText = await activity.innerText();
      expect(activityText.includes('changed status from Planned to In Progress'), 'the activity names a status change');
      expect(activityText.includes('added milestone Idempotent payments'), 'and a milestone added');
      expect(activityText.includes('set the lead to Ada Park'), 'and who leads the project');
      await ctx.frame.locator('.lin-milestone-desc', { hasText: 'Batch the tax lookups so a 60 item cart prices in under 2 s.' }).waitFor();
      const before = calls.length;
      await title.click();
      await ctx.frame.getByLabel('Name').fill('Checkout speed');
      await ctx.frame.locator('button', { hasText: /^Save$/ }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation ProjectEdit') && c.key.includes('"name":"Checkout speed"') && c.hit), 'a renamed project saves');
      const status = ctx.frame.locator('.lin-project-props .oc-sdk-trigger', { hasText: 'In Progress' });
      await status.click();
      await ctx.frame.locator('[role="option"]', { hasText: 'Completed' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation ProjectEdit') && c.key.includes('"statusId":"ps-done"') && c.hit), 'a project status saves');
      const lead = ctx.frame.locator('.lin-project-props .oc-sdk-trigger', { hasText: 'Ada Park' }).first();
      await lead.click();
      await ctx.frame.locator('[role="option"]', { hasText: 'Matt Example' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation ProjectEdit') && c.key.includes('"leadId":"u-matt"') && c.hit), 'a project lead saves');
      expect((await ctx.frame.locator('.lin-project-props').innerText()).includes('Priority'), 'the properties include Priority');
      await ctx.frame.locator('.lin-milestone-row', { hasText: 'Idempotent payments' }).locator('button', { hasText: 'Edit' }).click();
      await ctx.frame.getByLabel('Description').fill('Retries never charge twice.');
      await ctx.frame.locator('button', { hasText: /^Save$/ }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation MilestoneEdit') && c.key.includes('Retries never charge twice.') && c.hit), 'a milestone edit saves');
      await ctx.frame.locator('.lin-description-foot button', { hasText: 'Edit Description' }).waitFor();
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
      await ctx.frame.locator('.lin-toolbar button', { hasText: 'New Issue' }).click();
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
  {
    name: 'description',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click();
      const pane = ctx.frame.locator('.lin-pane');
      const body = pane.locator('.lin-description-body .lin-md');
      await body.waitFor();
      await body.locator('p').first().click();
      await ctx.page.waitForTimeout(200);
      expect(await pane.locator('.lin-description textarea').count() === 0, 'a click in the description does not start editing, so text can be selected');
      const list = body.locator('ul.lin-task-list');
      expect(await list.count() === 1, 'the checklist is a task list');
      expect(await list.evaluate((el) => getComputedStyle(el).listStyleType) === 'none', 'without bullets');
      const boxes = body.locator('.lin-task-box');
      expect(await boxes.count() === 2, 'each task has a box');
      expect(await boxes.nth(1).getAttribute('aria-checked') === 'true', 'a done task is ticked');
      const before = calls.length;
      await boxes.first().click();
      await until(async () => (await boxes.first().getAttribute('aria-checked')) === 'true', 'a click ticks the box');
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('- [x] Batch the tax lookups') && c.hit), 'and saves the description with the box ticked');
      expect(!(await toasts(ctx)).some((t) => /could not|refused|did not/i.test(t)), 'Linear took the change');
      await pane.locator('.lin-description button', { hasText: 'Edit Description' }).click();
      await pane.locator('.lin-rich-doc').waitFor();
      expect(await pane.locator('.lin-description-edit .lin-rich-doc[contenteditable="true"]').count() === 1, 'Edit description still opens the editor');
      await ctx.page.context().close();
    },
  },
  {
    name: 'rich-editor',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' }, 1300, 1000, true);
      await navItem(ctx, 'Issues').click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click();
      const pane = ctx.frame.locator('.lin-pane');
      const edit = pane.locator('.lin-description button', { hasText: 'Edit Description' });
      await edit.click();
      const doc = pane.locator('.lin-rich-doc[contenteditable="true"]');
      await doc.waitFor();
      const editor = pane.locator('.lin-description-edit');
      expect(await editor.locator('textarea').count() === 0, 'editing opens rich text, not Markdown');
      expect(await doc.locator('h2', { hasText: 'Findings' }).count() === 1 && await doc.locator('strong', { hasText: '50 items' }).count() === 1, 'headings and bold show as such');
      expect(await doc.locator('li.lin-task').count() === 2, 'the checklist shows its boxes');
      const before = calls.length;
      await editor.locator('button', { hasText: 'Cancel' }).click();
      await edit.waitFor();
      expect(!calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate')), 'an untouched description is never saved');
      await edit.click();
      await doc.waitFor();
      const last = doc.locator('li', { hasText: 'Add a timing test' }).locator('p');
      const box = (await last.boundingBox())!;
      await last.click({ position: { x: box.width - 2, y: box.height / 2 } });
      // The editor reads a click's caret when the browser reports it, a moment later; a person never types faster.
      await ctx.page.waitForTimeout(150);
      await ctx.page.keyboard.press('Enter');
      await ctx.page.keyboard.type('Ship ');
      await pane.locator('.lin-rich-btn[data-tool="bold"]').click();
      await ctx.page.keyboard.type('it');
      await until(async () => (await doc.locator('li.lin-task').count()) === 3, 'Enter in a checklist adds a task');
      expect(await pane.locator('.lin-rich-btn[data-tool="bold"]').getAttribute('aria-pressed') === 'true', 'the toolbar shows bold is on');
      await editor.getByRole('tab', { name: 'Markdown' }).click();
      const source = editor.locator('textarea');
      await source.waitFor();
      expect((await source.inputValue()).endsWith('- [x] Add a timing test for a 60 item cart\n- [ ] Ship **it**'), `the Markdown tab shows what Linear will store (got ${JSON.stringify((await source.inputValue()).slice(-80))})`);
      await editor.getByRole('tab', { name: 'Rich text' }).click();
      await doc.waitFor();
      expect(await doc.locator('strong', { hasText: 'it' }).count() >= 1, 'and back in rich text the edit is still there');
      await editor.locator('button', { hasText: 'Save' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('Ship **it**') && c.hit), 'Save sends the description as Markdown');
      await edit.waitFor();
      expect(!(await toasts(ctx)).some((t) => /could not|refused|did not/i.test(t)), 'Linear took it');
      await ctx.page.context().close();
    },
  },
  {
    name: 'rail-settings',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'panel' }, 360, 800);
      await ctx.frame.locator('.lin-header .oc-sdk-trigger').click();
      await ctx.frame.locator('[role="option"]').first().waitFor();
      expect(await ctx.frame.locator('[role="option"]', { hasText: /^Settings$/ }).count() === 0, 'Settings left the view dropdown');
      await ctx.page.keyboard.press('Escape');
      const button = ctx.frame.locator('.lin-header button', { hasText: 'Settings' });
      await button.click();
      await ctx.frame.locator('.sui-section-title', { hasText: 'New issues' }).waitFor();
      await button.click();
      await until(async () => (await ctx.frame.locator('.sui-section-title', { hasText: 'New issues' }).count()) === 0, 'a second click goes back to the view');
      await ctx.page.context().close();
    },
  },
  {
    name: 'issue-menu',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click({ button: 'right' });
      const menu = ctx.frame.locator('.lin-menu:not(.lin-menu--sub)');
      await menu.waitFor();
      const labels = await menu.locator('.lin-menu-label').allInnerTexts();
      expect(['Status', 'Priority', 'Assignee', 'Due date', 'Labels', 'Project', 'Milestone', 'Estimate', 'Cycle', 'More properties', 'Create related', 'Mark as', 'Remove', 'Open', 'Copy', 'Convert to', 'Make a copy...', 'Open in', 'Favorite', 'Remind me', 'Delete...'].every((l, i) => labels[i] === l), `the menu lists Linear's actions (got ${labels.join(', ')})`);
      expect(await ctx.frame.locator('.lin-pane').count() === 0, 'a right click does not open the issue');
      await menu.locator('[data-menu-item="status"]').hover();
      const sub = ctx.frame.locator('.lin-menu--sub');
      await sub.locator('[data-menu-item="status:t-eng-review"]').waitFor();
      const anchorBox = await menu.locator('[data-menu-item="status"]').boundingBox();
      const subBox = await sub.boundingBox();
      expect(Boolean(anchorBox && subBox && Math.abs(subBox.y - (anchorBox.y - 5)) < 1), 'the submenu stays beside its anchor');
      expect(await sub.locator('[aria-checked="true"]').innerText().then((t) => t.includes('In Progress')), 'the current status is ticked');
      const before = calls.length;
      await sub.locator('[data-menu-item="status:t-eng-review"]').click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('"stateId":"t-eng-review"') && c.hit), 'a status from the menu saves');
      expect(await menu.count() === 0, 'and the menu closes');
      await ctx.frame.locator('[data-issue="ENG-11"]').click({ button: 'right' });
      await menu.locator('[data-menu-item="milestone"]').click();
      await sub.locator('[data-menu-item="milestone:m2"]').waitFor();
      expect(await sub.locator('[data-menu-item="milestone:none"]').getAttribute('aria-checked') === 'true', 'No milestone is ticked before one is assigned');
      const beforeMilestone = calls.length;
      await sub.locator('[data-menu-item="milestone:m2"]').click();
      await until(async () => calls.slice(beforeMilestone).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('"projectMilestoneId":"m2"') && c.hit), 'a milestone from the menu saves');
      // Keys: P opens Priority, Escape closes the submenu, then the menu, and nothing else.
      await ctx.frame.locator('[data-issue="ENG-13"]').click({ button: 'right' });
      await menu.waitFor();
      await ctx.page.keyboard.press('p');
      await ctx.frame.locator('.lin-menu--sub[aria-label="Priority"]').waitFor();
      await ctx.page.keyboard.press('Escape');
      await until(async () => (await sub.count()) === 0 && (await menu.count()) === 1, 'Escape closes the submenu first');
      await ctx.page.keyboard.press('Escape');
      await until(async () => (await menu.count()) === 0, 'then the menu');
      expect(await ctx.frame.locator('[data-issue="ENG-13"]').count() === 1, 'and the list is still there');
      await ctx.page.context().close();
    },
  },
  {
    name: 'issue-menu-position',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' }, 1000, 600);
      await navItem(ctx, 'Issues').click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click({ button: 'right' });
      const menu = ctx.frame.locator('.lin-menu:not(.lin-menu--sub)');
      const anchor = menu.locator('[data-menu-item="convert"]');
      await anchor.scrollIntoViewIfNeeded();
      await anchor.hover();
      const sub = ctx.frame.locator('.lin-menu--sub');
      await sub.waitFor();
      const anchorBox = await anchor.boundingBox();
      const subBox = await sub.boundingBox();
      const height = await ctx.frame.locator('html').evaluate((el) => el.clientHeight);
      expect(Boolean(anchorBox && subBox), 'the submenu and its anchor have boxes');
      if (anchorBox && subBox) {
        const expected = Math.max(6, Math.min(anchorBox.y - 5, height - subBox.height - 6));
        expect(Math.abs(subBox.y - expected) < 1, `the short submenu fits beside Convert to, not its 320 px maximum (got ${subBox.y}, expected ${expected})`);
      }
      await ctx.page.context().close();
    },
  },
  {
    name: 'issue-menu-rail',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'panel' }, 360, 800);
      await ctx.frame.locator('.lin-header .oc-sdk-trigger').click();
      await ctx.frame.locator('[role="option"]', { hasText: 'Issues' }).first().click();
      await ctx.frame.locator('[data-issue="ENG-11"]').click({ button: 'right' });
      const menu = ctx.frame.locator('.lin-menu');
      await menu.waitFor();
      const box = await menu.boundingBox();
      expect(box && box.x >= 0 && box.x + box.width <= 360, 'the menu fits the rail');
      await menu.locator('[data-menu-item="copy"]').click();
      await menu.locator('.lin-menu-back', { hasText: 'Copy' }).waitFor();
      expect(await ctx.frame.locator('.lin-menu--sub').count() === 0, 'too narrow to fly out: the submenu opens in place');
      await menu.locator('[data-menu-item="copy:id"]').click();
      await ctx.page.waitForTimeout(300);
      const copied = (await ctx.log()).find((m) => m.type === 'clipboard-write');
      expect(JSON.stringify(copied?.payload ?? '').includes('ENG-11'), 'Copy ID copies the key');
      await ctx.page.context().close();
    },
  },
  {
    name: 'issue-menu-actions',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      const row = ctx.frame.locator('[data-issue="ENG-11"]');
      const menu = ctx.frame.locator('.lin-menu:not(.lin-menu--sub)');
      const sub = ctx.frame.locator('.lin-menu--sub');
      const modal = ctx.frame.locator('.lin-modal');
      const more = async (id: string) => {
        await row.click({ button: 'right' });
        await menu.locator('[data-menu-item="more"]').hover();
        await sub.locator(`[data-menu-item="${id}"]`).click();
      };

      await row.click({ button: 'right' });
      await menu.locator('[data-menu-item="more"]').hover();
      await sub.locator('[data-menu-item="rename"]').waitFor();
      expect((await sub.locator('.lin-menu-label').allInnerTexts()).join(',') === 'Team,Release,SLA...,Add link...,Add customer request...,Add document,Find suggestions,Rename...', 'More properties lists every missing action');
      await sub.locator('[data-menu-item="add-link"]').click();
      await modal.getByLabel('URL').fill('https://example.com/runbook');
      await modal.getByLabel('Title').fill('Runbook');
      let before = calls.length;
      await modal.getByRole('button', { name: 'Add Link' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation AttachmentCreate') && c.key.includes('Runbook') && c.hit), 'Add link saves');

      await more('add-customer');
      await modal.locator('.oc-sdk-trigger').click();
      await ctx.frame.locator('[role="option"]', { hasText: 'Acme' }).click();
      await modal.getByLabel('Request').fill('Please speed up large carts');
      before = calls.length;
      await modal.getByRole('button', { name: 'Add Request' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation CustomerNeedCreate') && c.key.includes('customer-acme') && c.hit), 'Add customer request saves');

      await more('add-document');
      await modal.getByLabel('Title').fill('Checkout notes');
      await modal.getByLabel('Content').fill('Large cart findings');
      before = calls.length;
      await modal.getByRole('button', { name: 'Add Document' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation DocumentCreate') && c.key.includes('Checkout notes') && c.hit), 'Add document saves');

      await more('release');
      await modal.getByRole('checkbox', { name: 'Release One 1.0.0' }).waitFor();
      before = calls.length;
      await modal.getByRole('checkbox', { name: 'Release One 1.0.0' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('"addedReleaseIds":["r1"]') && c.hit), 'Release links the issue');
      await modal.getByRole('button', { name: 'Done' }).click();

      await more('sla');
      await modal.locator('.oc-sdk-trigger').click();
      before = calls.length;
      await ctx.frame.locator('[role="option"]', { hasText: 'Business days only' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('"slaType":"onlyBusinessDays"') && c.hit), 'SLA saves the day-count rule');

      await more('suggestions');
      await modal.locator('[data-issue="ENG-14"]').waitFor();
      expect(calls.some((c) => c.key.includes('query SemanticIssues') && c.hit), 'Find suggestions uses semantic issue search');
      await modal.locator('[data-issue="ENG-14"]').click();
      await until(async () => (await modal.count()) === 0, 'choosing a suggestion closes the dialog');

      await row.click({ button: 'right' });
      before = calls.length;
      await menu.locator('[data-menu-item="favorite"]').click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation FavoriteCreate') && c.hit), 'Favorite saves');

      await row.click({ button: 'right' });
      await menu.locator('[data-menu-item="remind"]').hover();
      before = calls.length;
      await sub.locator('[data-menu-item="remind:hour"]').click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueReminder') && c.key.includes('2026-11-09T13:00:00.000Z') && c.hit), 'Remind me saves the preset');

      await more('rename');
      await modal.getByLabel('Title').fill('Checkout times out on large carts');
      before = calls.length;
      await modal.getByRole('button', { name: 'Save' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('Checkout times out on large carts') && c.hit), 'Rename saves');
      await ctx.page.context().close();
    },
  },
  {
    name: 'issue-menu-create',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      const row = ctx.frame.locator('[data-issue="ENG-11"]');
      const menu = ctx.frame.locator('.lin-menu:not(.lin-menu--sub)');
      const sub = ctx.frame.locator('.lin-menu--sub');
      const modal = ctx.frame.locator('.lin-modal');

      await row.click({ button: 'right' });
      await menu.locator('[data-menu-item="mark-as"]').hover();
      await sub.locator('[data-menu-item="mark-as:related"]').click();
      await modal.locator('input').fill('retry');
      await modal.locator('[data-issue="ENG-14"]').waitFor();
      let before = calls.length;
      await modal.locator('[data-issue="ENG-14"]').click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueRelationCreate') && c.key.includes('i-eng-14') && c.hit), 'Mark as related links the chosen issue');

      await row.click({ button: 'right' });
      await menu.locator('[data-menu-item="create-related"]').hover();
      await sub.locator('[data-menu-item="create-related:related"]').click();
      await modal.getByLabel('Title').fill('Related cache work');
      before = calls.length;
      await modal.getByRole('button', { name: 'Create Issue' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueCreate') && c.key.includes('Related cache work') && c.hit), 'Create related creates the issue');
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueRelationCreate') && c.key.includes('i-eng-50') && c.hit), 'then links it');

      await row.click({ button: 'right' });
      await menu.locator('[data-menu-item="make-copy"]').click();
      await modal.getByLabel('Title').waitFor();
      expect(await modal.getByLabel('Title').inputValue() === 'Checkout times out when the cart has more than 50 items', 'Make a copy prefills the title');
      expect((await modal.getByLabel('Description').inputValue()).includes('Carts over **50 items**'), 'and the description');
      await modal.getByRole('button', { name: 'Cancel' }).click();

      await row.click({ button: 'right' });
      await menu.locator('[data-menu-item="convert"]').hover();
      await sub.locator('[data-menu-item="convert:project"]').click();
      before = calls.length;
      await modal.getByRole('button', { name: 'Convert to Project' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation ProjectCreate') && c.key.includes('"convertedFromIssueId":"i-eng-11"') && c.hit), 'Convert to project uses Linear\'s conversion');
      await ctx.page.context().close();
    },
  },
  {
    name: 'board-delete',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Issues').click();
      await ctx.frame.getByRole('tab', { name: 'Board' }).click();
      const card = ctx.frame.locator('.lin-card[data-issue="ENG-14"]');
      await card.waitFor();
      const look = await ctx.frame.locator('.lin-board-scroll').evaluate((el) => {
        const bg = (q: string) => getComputedStyle(el.querySelector(q)!).backgroundColor;
        return { body: bg('.lin-column-body'), head: bg('.lin-column-head'), card: bg('.lin-card') };
      });
      expect(look.body !== 'rgba(0, 0, 0, 0)' && look.body === look.head, `each column is one panel from its header down (got ${JSON.stringify(look)})`);
      expect(look.body !== look.card, 'darker than the cards in it');
      await card.click({ button: 'right' });
      await ctx.frame.locator('[data-menu-item="delete"]').click();
      const modal = ctx.frame.locator('.lin-modal');
      await modal.waitFor();
      expect((await modal.innerText()).includes('Delete ENG-14?'), 'Delete asks first');
      const before = calls.length;
      await modal.locator('button', { hasText: 'Delete issue' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueDelete') && c.key.includes('i-eng-14') && c.hit), 'then moves the issue to the trash');
      await until(async () => (await toasts(ctx)).some((t) => t.startsWith('Deleted ENG-14')), 'and says how to get it back');
      expect(await modal.count() === 0, 'the dialog closes');
      await ctx.page.context().close();
    },
  },
  {
    name: 'inbox',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      await navItem(ctx, 'Inbox').click();
      await ctx.frame.getByText('Show all').click().catch(() => undefined);
      const rows = ctx.frame.locator('.lin-notification');
      await rows.first().waitFor();
      const texts = await rows.allInnerTexts();
      expect(texts.some((t) => t.includes('Ada Park commented') && t.includes('Reproduced with a 60 item cart')), `a comment says who commented, from published fields only (got ${texts.join(' | ')})`);
      expect(texts.some((t) => t.includes('Ada Park assigned you')), 'an assignment says so');
      expect(texts.some((t) => t.includes('changed the status to Done')), 'a status change names the new status');
      expect(texts.some((t) => t.includes('Checkout') && t.includes('posted an update: At risk')), 'a project update names the project and its health');
      const before = calls.length;
      await rows.filter({ hasText: 'Ada Park commented' }).first().click();
      await ctx.frame.locator('.lin-pane .lin-issue-trail', { hasText: 'Inbox' }).waitFor();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation NotificationMarkRead')), 'opening one marks it read');
      await ctx.page.context().close();
    },
  },
  {
    name: 'list-surface',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'panel/index.html', surface: 'page' });
      const bg = () => ctx.frame.locator('.lin-browser').first().evaluate((el) => getComputedStyle(el).backgroundColor);
      await navItem(ctx, 'My issues').click();
      await ctx.frame.locator('.lin-browser [data-issue]').first().waitFor();
      const mine = await bg();
      expect(mine !== 'rgba(0, 0, 0, 0)', 'My issues sits on a card');
      await navItem(ctx, 'Cycles').click();
      await ctx.frame.locator('.lin-browser [data-issue]').first().waitFor();
      expect(await bg() === mine, 'a cycle\'s issues sit on the same card');
      await navItem(ctx, 'Projects').click();
      await ctx.frame.locator('.lin-table-row:not(.lin-table-head)', { hasText: 'Checkout' }).click();
      await ctx.frame.getByRole('tab', { name: 'Issues' }).click();
      await ctx.frame.locator('.lin-browser [data-issue]').first().waitFor();
      const inside = await ctx.frame.locator('.sui-section .lin-browser').evaluate((el) => ({ own: getComputedStyle(el).backgroundColor, section: getComputedStyle(el.closest('.sui-section')!).backgroundColor }));
      expect(inside.own === 'rgba(0, 0, 0, 0)' && inside.section === mine, 'a project\'s list uses its section\'s card, not a second one');
      await ctx.page.context().close();
    },
  },
  {
    name: 'status-plan-row',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'status/index.html', surface: 'status', session: JSON.stringify({ id: 'ses_plan', title: 'ENG-13 plan', busy: false }) }, 280, 700);
      const row = ctx.frame.locator('[data-handoff="ses_plan:ENG-13"]');
      await row.waitFor();
      expect(await ctx.frame.locator('[data-handoff]').count() === 1, 'a session sees only its own plan, not another session\'s plan for the folder');
      expect(await ctx.frame.locator('[data-handoff="ses_other:ENG-11"]').count() === 0, 'the unrelated plan is hidden');
      await row.getByRole('button', { name: 'Start Build' }).waitFor();
      const labels = (await row.locator('button').allInnerTexts()).map((t) => t.trim());
      expect(['Start Build', 'Write Plan', 'Dismiss'].every((l) => labels.includes(l)), `the buttons are in title case (got ${labels.join(', ')})`);
      const wide = await ctx.frame.locator('html').evaluate((el) => ({ scroll: el.scrollWidth, client: el.clientWidth }));
      expect(wide.scroll <= wide.client, `nothing scrolls sideways at 280 px (${wide.scroll} > ${wide.client})`);
      const dismiss = await row.locator('button', { hasText: 'Dismiss' }).evaluate((el) => el.getBoundingClientRect().right);
      expect(dismiss <= wide.client, 'Dismiss stays inside the section');
      const line = row.locator('.lin-status-line');
      await line.hover();
      expect(await line.evaluate((el) => getComputedStyle(el).backgroundColor) === 'rgba(0, 0, 0, 0)', 'the row draws no hover behind its buttons');
      const before = calls.length;
      await row.locator('button', { hasText: 'Write Plan' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('## Plan') && c.hit), 'Write Plan writes the plan into the description');
      await until(async () => (await row.innerText()).includes('Plan Written'), 'and says so');
      expect(!calls.slice(before).some((c) => c.key.startsWith('POST /handoff {"sessionId"')), 'and starts no build');
      await ctx.page.context().close();
    },
  },
  {
    name: 'long-plan',
    run: async (browser) => {
      const ctx = await open(browser, { page: 'status/index.html', surface: 'status', session: JSON.stringify({ id: 'ses_long', title: 'ENG-13 long plan', busy: false }) }, 360, 800);
      const row = ctx.frame.locator('[data-handoff="ses_long:ENG-13"]');
      await row.waitFor();
      expect(await ctx.frame.locator('[data-handoff]').count() === 1, 'the long-plan session sees only its own row');
      const before = calls.length;
      await row.locator('button', { hasText: 'Write Plan' }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation DocumentCreate') && c.hit), 'the full plan is created as an issue document');
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('https://linear.app/acme/document/eng-13-full-plan') && c.hit), 'the concise issue plan links the document');
      const written = calls.slice(before).find((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('eng-13-full-plan'))!;
      expect(written.key.includes('save the card order without changing the payment API'), 'the issue keeps the short summary');
      expect(!written.key.includes('[cut]'), 'nothing is marked as cut');
      expect(!(await ctx.log()).some((m) => m.type === 'generate'), 'writing the plan makes no model call');
      await ctx.page.context().close();
    },
  },
  {
    name: 'plan-message',
    run: async (browser) => {
      const directory = '/work/engineering-api-wt';
      const plan = '## Plan\n\n1. Read `PaymentStep` and find where cards are listed\n2. Sort the saved cards by last use\n3. Add a test for the order\n4. Run the checkout suite\n\nRisk: the mobile app reads the same list.';
      const sessions = JSON.stringify([{
        id: 'ses_plan', title: 'Plan: saved cards first', projectId: 'ocp1', directory, agent: 'plan', parentId: null, createdAt: 1, updatedAt: 5, archivedAt: null,
        worktree: { directory, name: 'eng-13', branch: 'matt/eng-13-saved-cards', status: 'ready' }, activity: 'idle', outcome: null,
        items: [{ id: 'linear-dashboard:ENG-13', data: { identifier: 'ENG-13', issueId: 'i-eng-13' } }], links: [],
      }]);
      const worktrees = JSON.stringify([{ projectId: 'ocp1', directory, name: 'eng-13', branch: 'matt/eng-13-saved-cards', status: 'ready' }]);
      const item = JSON.stringify({ kind: 'message', action: 'build-from-plan-message', sessionId: 'ses_plan', sessionTitle: 'Plan: saved cards first', directory, messageId: 'msg_plan', role: 'assistant', text: plan });
      const ctx = await open(browser, { page: 'dialog/index.html', surface: 'dialog', item, projects: PROJECTS, worktrees, sessions }, 672, 800);
      await ctx.frame.locator('.lin-build-plan').waitFor();
      expect((await ctx.frame.locator('.lin-build-plan').innerText()).includes('Sort the saved cards by last use'), 'the message action previews that exact plan');
      const before = calls.length;
      await ctx.frame.locator('button', { hasText: /^Write Plan$/ }).click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('Sort the saved cards by last use') && c.hit), 'Write Plan uses the chosen message');
      await ctx.page.context().close();
    },
  },
  {
    name: 'block-properties',
    run: async (browser) => {
      const card = await open(browser, { page: 'blocks/index.html', block: 'LinearIssue', args: JSON.stringify({ id: 'ENG-13' }) }, 720, 700);
      await card.frame.locator('.lin-block-card').click({ button: 'right' });
      const cardMenu = card.frame.locator('.lin-menu[aria-label="ENG-13 actions"]');
      await cardMenu.waitFor();
      await until(async () => await cardMenu.locator('[data-menu-item="cycle"]').count() === 1, 'the property menu loads the team settings');
      const propertyIds = await cardMenu.locator('[data-menu-item]').evaluateAll((els) => els.map((el) => (el as HTMLElement).dataset.menuItem));
      expect(propertyIds.join(',') === 'status,priority,assignee,due,labels,project,milestone,estimate,cycle', `right click offers only the issue properties (got ${propertyIds.join(',')})`);
      const beforeStatus = calls.length;
      await cardMenu.locator('[data-menu-item="status"]').click();
      const statusMenu = card.frame.locator('.lin-menu--sub[aria-label="Status"]');
      await statusMenu.waitFor();
      const sizing = await statusMenu.evaluate((el) => ({ max: parseFloat(getComputedStyle(el).maxHeight), viewport: window.innerHeight, scroll: el.querySelector('.lin-menu-scroll')!.scrollHeight, client: el.querySelector('.lin-menu-scroll')!.clientHeight }));
      expect(sizing.max === sizing.viewport - 12 && sizing.scroll <= sizing.client, `the status choices fit without a fixed-height scroll (got ${JSON.stringify(sizing)})`);
      await statusMenu.locator('.lin-menu-scroll').hover();
      await card.page.mouse.wheel(0, 120);
      await card.page.waitForTimeout(150);
      expect(await cardMenu.count() === 1 && await statusMenu.count() === 1, 'scrolling inside a submenu does not close it');
      await card.frame.locator('.lin-menu--sub [data-menu-item="status:t-eng-progress"]').click();
      await until(async () => calls.slice(beforeStatus).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('"stateId":"t-eng-progress"') && c.hit), 'the issue card saves a status change');
      await until(async () => (await card.frame.locator('.lin-block-card > .sui-kv').innerText()).includes('In Progress'), 'the issue card shows the saved status');
      await card.page.context().close();

      const list = await open(browser, { page: 'blocks/index.html', block: 'LinearIssueList', args: JSON.stringify({ title: 'Checkout work', ids: 'ENG-11 ENG-12' }) }, 720, 700);
      await list.frame.locator('[data-issue="ENG-11"]').click({ button: 'right' });
      const listMenu = list.frame.locator('.lin-menu[aria-label="ENG-11 actions"]');
      await listMenu.locator('[data-menu-item="project"]').click();
      const current = list.frame.locator('.lin-menu--sub [data-menu-item="project:p-checkout"]');
      expect(await current.getAttribute('aria-checked') === 'true', 'the list row menu starts with the current project');
      const beforeProject = calls.length;
      await list.frame.locator('.lin-menu--sub [data-menu-item="project:none"]').click();
      await until(async () => calls.slice(beforeProject).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('"projectId":null') && c.hit), 'a list row saves a project change');
      await list.frame.locator('[data-issue="ENG-12"]').click({ button: 'right' });
      await list.frame.locator('.lin-menu[aria-label="ENG-12 actions"]').waitFor();
      expect(await list.frame.getByRole('button', { name: 'Edit', exact: true }).count() === 0, 'list rows need no separate Edit button');
      await list.page.context().close();
    },
  },
  {
    name: 'add-plan-only',
    run: async (browser) => {
      const sessions = JSON.stringify([{
        id: 'ses_plan', title: 'Plan: saved cards first', projectId: 'ocp1', directory: '/work/engineering-api-wt', agent: 'plan', parentId: null, createdAt: 1, updatedAt: 5, archivedAt: null,
        worktree: { directory: '/work/engineering-api-wt', name: 'eng-13', branch: 'matt/eng-13-saved-cards', status: 'ready' }, activity: 'idle', outcome: null,
        items: [{ id: 'linear-dashboard:ENG-13', data: { identifier: 'ENG-13', issueId: 'i' } }], links: [],
      }]);
      const block = await open(browser, { page: 'blocks/index.html', block: 'LinearIssue', args: JSON.stringify({ id: 'ENG-13' }), projects: PROJECTS, sessions }, 720, 700);
      expect(!(await block.frame.locator('.lin-block-card .oc-sdk-btn[data-variant="default"]').count()), 'no orange button on the card');
      const add = block.frame.locator('button', { hasText: 'Write Plan' });
      await add.waitFor();
      // Build appears once the build source loads; reading the buttons before it drops it from the list.
      await block.frame.locator('.lin-block-card button', { hasText: 'Build' }).waitFor();
      const card = (await block.frame.locator('.lin-block-card .oc-sdk-btn').allInnerTexts()).map((t) => t.trim());
      expect(card.join(',') === 'Open in Linear,Start Session,Plan,Write Plan,Build', `the card has the issue view's buttons in order (got ${card.join(', ')})`);
      const before = calls.length;
      await add.click();
      await until(async () => calls.slice(before).some((c) => c.key.includes('mutation IssueUpdate') && c.key.includes('## Plan') && c.hit), 'the issue card adds the plan to the description');
      await until(async () => (await toasts(block)).includes('Added the plan to ENG-13'), 'and says so');
      await block.page.context().close();
      const none = await open(browser, { page: 'blocks/index.html', block: 'LinearIssue', args: JSON.stringify({ id: 'ENG-11' }), projects: PROJECTS }, 720, 700);
      const first = none.frame.locator('.lin-plan-first');
      await until(async () => ((await first.getAttribute('title')) ?? '').startsWith('Plan first'), 'with no plan yet the card says to plan first');
      expect(await first.locator('button:disabled').count() === 2, 'and shows Write Plan and Build disabled');
      await none.page.context().close();
      const panel = await open(browser, { page: 'panel/index.html', surface: 'page', projects: PROJECTS, sessions });
      await navItem(panel, 'Issues').click();
      await panel.frame.locator('[data-issue="ENG-13"]').click();
      await panel.frame.locator('.lin-issue-bar button', { hasText: 'Write Plan' }).waitFor();
      const bar = panel.frame.locator('.lin-issue-bar .oc-sdk-btn');
      const names = (await bar.allInnerTexts()).map((t) => t.trim()).filter((t) => ['Attach', 'Start Session', 'Plan', 'Write Plan', 'Build'].includes(t));
      expect(names.join(',') === 'Attach,Start Session,Plan,Write Plan,Build', `the bar has Attach first, then Start Session, Plan, Write Plan, Build (got ${names.join(', ')})`);
      const primary = await bar.evaluateAll((els) => els.filter((el) => (el as HTMLElement).dataset.variant === 'default').map((el) => el.textContent?.trim()));
      expect(primary.length === 0, `no orange button in the bar (got ${primary.join(', ')})`);
      await panel.page.context().close();
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

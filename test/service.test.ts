import { describe, expect, test } from 'bun:test';
import type { GuestSessionLinkedItem } from '@openchamber/sdk';
import { issueOfBranch, mainOfGitFile, parseHead, readBranch, resolveMapped, type ReadText } from '../src/service/directories.ts';
import { buildDraft, draftBody, linearIssuesOf, looksLikePlan, upsertDraft, withoutBlocks, REPLY_LIMIT } from '../src/service/events.ts';
import { cleanAgent, cleanModel, handoffPrompt, PLAN_LIMIT, planPrompt, reviewerNames, reviewSteps } from '../src/service/handoff.ts';
import { buildInstructions, INSTRUCTIONS_TARGET } from '../src/service/instructions.ts';
import { docMarkdown, locate, mentionRows, projectMarkdown, ROWS_MAX } from '../src/service/mentions.ts';
import { mergePush, readConfig, readPush, knownTeamKeys } from '../src/service/snapshot.ts';
import type { DirSnapshot, Draft, SnapProject } from '../src/service/types.ts';

const files = (map: Record<string, string>): ReadText => (path) => map[path] ?? null;

describe('resolveMapped', () => {
  const mapped = ['/Users/me/api', '/Users/me/web'];
  test('an exact folder, with or without a trailing slash', () => {
    expect(resolveMapped('/Users/me/api', mapped, files({}))).toBe('/Users/me/api');
    expect(resolveMapped('/Users/me/api/', mapped, files({}))).toBe('/Users/me/api');
  });
  test('a worktree resolves to the main checkout its .git file points to', () => {
    const read = files({ '/wt/eng-1/.git': 'gitdir: /Users/me/web/.git/worktrees/eng-1\n' });
    expect(resolveMapped('/wt/eng-1', mapped, read)).toBe('/Users/me/web');
  });
  test('a relative gitdir is read against the worktree', () => {
    expect(mainOfGitFile('gitdir: ../repo/.git/worktrees/x', '/wt/x')).toBe('/wt/repo');
    expect(mainOfGitFile('gitdir: /r/repo/.git/worktrees/x\n', '/wt/x')).toBe('/r/repo');
  });
  test('else the longest mapped folder that holds the directory', () => {
    expect(resolveMapped('/Users/me/api/packages/core', mapped, files({}))).toBe('/Users/me/api');
    expect(resolveMapped('/Users/me/api/packages/core', ['/Users/me', '/Users/me/api'], files({}))).toBe('/Users/me/api');
  });
  test('a sibling with the same prefix is not inside', () => {
    expect(resolveMapped('/Users/me/api-tools', mapped, files({}))).toBeNull();
  });
  test('nothing mapped, no directory', () => {
    expect(resolveMapped('/elsewhere', mapped, files({}))).toBeNull();
    expect(resolveMapped(null, mapped, files({}))).toBeNull();
    expect(resolveMapped('/elsewhere', [], files({}))).toBeNull();
  });
  test('a worktree of a folder that is not mapped stays unmapped', () => {
    const read = files({ '/wt/x/.git': 'gitdir: /Users/me/other/.git/worktrees/x' });
    expect(resolveMapped('/wt/x', mapped, read)).toBeNull();
  });
});

describe('the branch', () => {
  test('parseHead reads a branch and ignores a detached head', () => {
    expect(parseHead('ref: refs/heads/matt/eng-12-fix\n')).toBe('matt/eng-12-fix');
    expect(parseHead('4f2a9c0d1e2b3c4d5e6f708192a3b4c5d6e7f809\n')).toBeNull();
    expect(parseHead(null)).toBeNull();
  });
  test('readBranch reads .git/HEAD of a checkout and HEAD behind a worktree .git file', () => {
    const read = files({
      '/r/.git/HEAD': 'ref: refs/heads/main\n',
      '/wt/.git': 'gitdir: /r/.git/worktrees/wt\n',
      '/r/.git/worktrees/wt/HEAD': 'ref: refs/heads/matt/con-315-fix\n',
    });
    expect(readBranch('/r', read)).toBe('main');
    expect(readBranch('/wt', read)).toBe('matt/con-315-fix');
    expect(readBranch('/none', read)).toBeNull();
  });
  test('issueOfBranch finds the key Linear puts in branch names', () => {
    expect(issueOfBranch('matt/eng-123-fix-login-timeout')).toBe('ENG-123');
    expect(issueOfBranch('issue-APPSEC-6-calm-gopher')).toBe('APPSEC-6');
    expect(issueOfBranch('eng-7')).toBe('ENG-7');
    expect(issueOfBranch('main')).toBeNull();
    expect(issueOfBranch('feature/login')).toBeNull();
    expect(issueOfBranch(null)).toBeNull();
  });
});

describe('buildInstructions', () => {
  const issue = (n: number, title = `Title ${n}`) => ({ identifier: `ENG-${n}`, title, state: 'Todo' });
  test('the template: projects, branch issue, my issues and the two reminders', () => {
    const text = buildInstructions({
      projects: [{ name: 'Foo', url: 'https://linear.app/acme/project/foo-1a2b' }],
      teamKeys: ['ENG'],
      branchIssue: { identifier: 'ENG-123', title: 'Fix login timeout', state: 'In Progress', description: 'Users are logged out after 30 s.' },
      mine: [issue(120), issue(118)],
    });
    expect(text.split('\n')[0]).toBe('Linear for this folder (from the Linear extension):');
    expect(text).toContain('- Projects: Foo (https://linear.app/acme/project/foo-1a2b); team ENG.');
    expect(text).toContain('- Current branch issue: ENG-123 "Fix login timeout" [In Progress]. Users are logged out after 30 s.');
    expect(text).toContain('- My open issues here: ENG-120 Title 120 [Todo]; ENG-118 Title 118 [Todo].');
    expect(text).toContain('Reference issues as ENG-123 in commit messages and PR titles so Linear links them.');
    expect(text).toContain('LinearIssue, LinearIssueList and LinearPickIssue blocks');
  });
  test('stays near 800 characters with ten long issues, and under the hard limit always', () => {
    const mine = Array.from({ length: 10 }, (_, n) => issue(n + 1, 'A long title that goes on and on about login timeouts and sessions '.repeat(3)));
    const text = buildInstructions({ projects: [{ name: 'P'.repeat(200), url: `https://linear.app/${'x'.repeat(100)}` }], teamKeys: ['ENG'], branchIssue: { identifier: 'ENG-1', title: 'T'.repeat(400), state: 'Todo', description: 'D'.repeat(2000) }, mine });
    expect(text.length).toBeLessThanOrEqual(INSTRUCTIONS_TARGET);
    expect(buildInstructions({ projects: [], teamKeys: [], branchIssue: null, mine: [] }).length).toBeLessThan(400);
  });
  test('the branch issue is not repeated in my issues, and only ten of mine are listed', () => {
    const text = buildInstructions({ projects: [], teamKeys: ['ENG'], branchIssue: { identifier: 'ENG-3', title: 'Three', state: 'Todo' }, mine: Array.from({ length: 14 }, (_, n) => issue(n + 1, 'x')) });
    expect(text.split('\n').find((l) => l.startsWith('- My open issues'))).not.toContain('ENG-3 ');
    expect((text.match(/ENG-\d+ x/g) ?? []).length).toBeLessThanOrEqual(10);
  });
  test('a branch issue with no title still reads', () => {
    const text = buildInstructions({ projects: [], teamKeys: [], branchIssue: { identifier: 'ENG-9', title: '', state: '' }, mine: [] });
    expect(text).toContain('- Current branch issue: ENG-9.');
  });
  test('the dash rule: no em or en dashes', () => {
    expect(buildInstructions({ projects: [{ name: 'Foo', url: 'u' }], teamKeys: ['ENG'], branchIssue: null, mine: [issue(1)] })).not.toMatch(/[\u2013\u2014\u2015]/);
  });
});

describe('linearIssuesOf', () => {
  const item = (extra: Partial<GuestSessionLinkedItem>): GuestSessionLinkedItem => ({ id: 'x', kind: 'issue', url: 'https://example.com', ...extra });
  test('the host Linear tracker: provider and identifier', () => {
    expect(linearIssuesOf([item({ id: 'linear:OPE-367', kind: 'linear', provider: 'linear', identifier: 'OPE-367', url: 'https://linear.app/a/issue/OPE-367/x' })])).toEqual(['OPE-367']);
  });
  test('this extension\'s own start: a guest entry', () => {
    expect(linearIssuesOf([item({ id: 'guest:linear-dashboard:con-315', kind: 'guest', identifier: 'CON-315' })])).toEqual(['CON-315']);
    expect(linearIssuesOf([item({ id: 'guest:linear-dashboard:CON-316', kind: 'guest' })])).toEqual(['CON-316']);
  });
  test('a link to an issue page counts, any other link does not', () => {
    expect(linearIssuesOf([item({ kind: 'external', url: 'https://linear.app/acme/issue/eng-12/fix-things' })])).toEqual(['ENG-12']);
    expect(linearIssuesOf([item({ url: 'https://gitlab.com/a/b/-/merge_requests/4' }), item({ id: 'guest:wiz:abc', kind: 'guest', identifier: 'abc' })])).toEqual([]);
  });
  test('upper-cased, no repeats, in link order', () => {
    const list = [
      item({ id: 'linear:ENG-2', provider: 'linear', identifier: 'ENG-2' }),
      item({ id: 'guest:linear-dashboard:ENG-1', kind: 'guest', identifier: 'ENG-1' }),
      item({ kind: 'external', url: 'https://linear.app/a/issue/ENG-2/x' }),
    ];
    expect(linearIssuesOf(list)).toEqual(['ENG-2', 'ENG-1']);
    expect(linearIssuesOf([])).toEqual([]);
  });
  test('junk identifiers are dropped', () => {
    expect(linearIssuesOf([item({ provider: 'linear', identifier: 'not an id' })])).toEqual([]);
  });
});

describe('drafts', () => {
  const base = { directory: '/r', sessionId: 'ses_1', identifier: 'ENG-1', title: 'Fix it', reply: 'All done.', now: 1000 };
  test('the body is the header the dialog uses, then the reply', () => {
    expect(buildDraft(base)?.body).toBe('**OpenChamber session: Fix it**\n\nAll done.');
    expect(buildDraft(base)?.id).toBe('ses_1:ENG-1');
  });
  test('a reply over 4,000 characters is cut', () => {
    const body = draftBody('T', 'x'.repeat(REPLY_LIMIT + 500));
    expect(body.endsWith('[cut]')).toBe(true);
    expect(body.length).toBeLessThan(REPLY_LIMIT + 100);
  });
  test('no reply, no draft; no title reads as untitled', () => {
    expect(buildDraft({ ...base, reply: '  \n' })).toBeNull();
    expect(buildDraft({ ...base, title: null })?.sessionTitle).toBe('Untitled session');
  });
  test('a newer draft for the same session and issue replaces the older one', () => {
    const first = buildDraft(base)!;
    const second = buildDraft({ ...base, reply: 'Second turn.', now: 2000 })!;
    const other = buildDraft({ ...base, identifier: 'ENG-2' })!;
    const list = upsertDraft(upsertDraft([first], other, 1500), second, 2000);
    expect(list.map((d) => d.id)).toEqual(['ses_1:ENG-2', 'ses_1:ENG-1']);
    expect(list.find((d) => d.identifier === 'ENG-1')?.body).toContain('Second turn.');
  });
  test('drafts older than two weeks are dropped, and the list is capped at 50', () => {
    const old: Draft = { ...buildDraft(base)!, id: 'old', createdAt: 0 };
    const fresh = buildDraft({ ...base, sessionId: 'new', now: 15 * 86_400_000 })!;
    expect(upsertDraft([old], fresh, 15 * 86_400_000).map((d) => d.id)).toEqual(['new:ENG-1']);
    let list: Draft[] = [];
    for (let i = 0; i < 60; i += 1) list = upsertDraft(list, buildDraft({ ...base, sessionId: `s${i}`, now: 1000 + i })!, 1000 + i);
    expect(list.length).toBe(50);
    expect(list.at(-1)?.sessionId).toBe('s59');
  });
});

describe('withoutBlocks', () => {
  test('takes the display blocks out of a reply and keeps the text around them', () => {
    expect(withoutBlocks('Plan text.\n\n```openui-lang\nroot = Stack([card])\ncard = LinearIssue("ENG-5")\n```')).toBe('Plan text.');
    expect(withoutBlocks('```openui-lang\nroot = Stack([c])\n```\n\nNIL-754 is In Planning.')).toBe('NIL-754 is In Planning.');
  });
  test('other code blocks stay', () => {
    expect(withoutBlocks('Run:\n```bash\nterraform test\n```')).toBe('Run:\n```bash\nterraform test\n```');
  });
});

describe('looksLikePlan', () => {
  const plan = ['## Plan', '', 'Fix the login timeout.', '', '1. Read the session code', '2. Raise the window', '3. Add a test', '4. Run the suite', '', 'Risks: '.padEnd(400, 'x')].join('\n');
  test('a long reply in steps that calls itself a plan', () => {
    expect(looksLikePlan(plan)).toBe(true);
  });
  test('a short answer, or one without structure or the word, is not', () => {
    expect(looksLikePlan('Done. The tests pass.')).toBe(false);
    expect(looksLikePlan('word '.repeat(200))).toBe(false);
    expect(looksLikePlan(plan.replace(/plan/gi, 'idea'))).toBe(false);
  });
});

describe('planPrompt', () => {
  const input = { identifier: 'ENG-5', issueTitle: 'Slow login', branch: 'matt/eng-5-slow-login', directory: '/wt/eng-5', context: 'ENG-5: Slow login\nStatus: Todo.\n\nLogins time out.' };
  test('asks for a plan only, names the issue, folder and branch, and carries the issue text', () => {
    const text = planPrompt(input);
    expect(text).toContain('Plan the work for Linear issue ENG-5 (Slow login). Do not change any files yet.');
    expect(text).toContain('Work in /wt/eng-5, on branch matt/eng-5-slow-login.');
    expect(text).toContain('Logins time out.');
    expect(text).toContain('write the complete plan as a normal message');
    expect(text).toContain('I want that');
    expect(text).not.toContain('interview');
    expect(text).toContain('no question card or form left open');
    expect(text).toContain('"build it"');
    expect(text).toContain('Open decisions');
    expect(text).toContain('card = LinearIssue("ENG-5")');
    expect(text).toContain('```openui-lang\nroot = Stack([card])');
    expect(text).not.toMatch(/[\u2013\u2014\u2015]/);
  });
  test('no title, no branch, no context still reads, and a huge context is cut', () => {
    expect(planPrompt({ ...input, issueTitle: null, branch: null, context: '' })).toContain('Plan the work for Linear issue ENG-5. Do not change any files yet.');
    expect(planPrompt({ ...input, context: 'x'.repeat(100_000) }).length).toBeLessThan(22_500);
  });
  test('the agent falls back to the one asked for', () => {
    expect(cleanAgent('', 'plan')).toBe('plan');
    expect(cleanAgent('review', 'plan')).toBe('review');
    expect(cleanAgent(undefined)).toBe('build');
  });
});

describe('what the build does after the code', () => {
  const base = { identifier: 'ENG-5', issueTitle: null, branch: null, directory: '/wt', planSessionTitle: null, plan: '1. Do it' };
  test('off, or no setting, stops at the code and says nothing about merge requests', () => {
    for (const review of [undefined, { mode: 'off' as const, reviewers: '' }]) {
      const text = handoffPrompt({ ...base, review });
      expect(text).toContain('Implement this plan now. Follow its steps in order, run the project\'s tests, and report what changed.');
      expect(text).not.toMatch(/merge request|CodeRabbit/);
    }
  });
  test('mr: shows its usual options first, then does the review work without asking again', () => {
    const text = handoffPrompt({ ...base, review: { mode: 'mr', reviewers: '' } });
    expect(text).toContain('show me those options and wait for my choice');
    expect(text).not.toContain('I authorize these three steps');
    for (const part of ['pipeline', 'CodeRabbit', 'unresolved', 'at most 5 rounds', 'do not merge']) expect(text).toContain(part);
  });
  test('auto: commits, pushes and opens the merge request on its own, assigned to the user', () => {
    const text = handoffPrompt({ ...base, review: { mode: 'auto', reviewers: 'CodeRabbit, Greptile' } });
    expect(text).toContain('message that starts with ENG-5');
    expect(text).toContain('assigned to me');
    expect(text).toContain('I authorize these three steps');
    expect(text).toContain('CodeRabbit and Greptile');
    expect(text).not.toContain('show me those options');
  });
  test('after a question it closes out new AI comments again, and it only touches the AI reviewers\' threads', () => {
    const steps = reviewSteps('auto', 'ENG-5', '').join('\n');
    expect(steps).toContain('go back to step 5: close out any new AI comments before you finish');
    expect(steps).toContain('only those: do not reply to, resolve or edit anyone else\'s threads');
    expect(steps).toContain('Never finish while an AI comment is unresolved without telling me why');
  });
  test('reviewer names are split, cleaned and limited; empty means CodeRabbit', () => {
    expect(reviewerNames(' CodeRabbit ,  Greptile;Sourcery\nQodo, Bito, Extra ')).toEqual(['CodeRabbit', 'Greptile', 'Sourcery', 'Qodo', 'Bito']);
    expect(reviewerNames('')).toEqual(['CodeRabbit']);
    expect(reviewerNames(undefined)).toEqual(['CodeRabbit']);
    expect(reviewerNames(' , ; ')).toEqual(['CodeRabbit']);
  });
  test('no banned dashes in the steps, and the whole prompt stays under the host limit', () => {
    expect(reviewSteps('mr', 'ENG-5', 'a').join('\n')).not.toMatch(/[\u2013\u2014\u2015]/);
    expect(handoffPrompt({ ...base, plan: 'p'.repeat(PLAN_LIMIT * 2), review: { mode: 'auto', reviewers: '' } }).length).toBeLessThan(64_000);
  });
});

describe('handoffPrompt', () => {
  const input = { identifier: 'ENG-123', issueTitle: 'Fix login timeout', branch: 'matt/eng-123-fix', directory: '/wt/eng-123', planSessionTitle: 'Plan ENG-123', plan: '1. Do the thing\n2. Test it' };
  test('names the issue, the branch, the folder and the plan, and asks to implement', () => {
    const text = handoffPrompt(input);
    expect(text).toContain('Build the plan below for Linear issue ENG-123 (Fix login timeout).');
    expect(text).toContain('Work in /wt/eng-123, on branch matt/eng-123-fix.');
    expect(text).toContain('Reference ENG-123 in commit messages');
    expect(text).toContain('1. Do the thing\n2. Test it');
    expect(text).toContain('Implement this plan now.');
    expect(text).not.toMatch(/[\u2013\u2014\u2015]/);
  });
  test('works with no title, no branch and no session title', () => {
    const text = handoffPrompt({ ...input, issueTitle: null, branch: null, planSessionTitle: null });
    expect(text).toContain('Build the plan below for Linear issue ENG-123.');
    expect(text).toContain('Work in /wt/eng-123.');
    expect(text).not.toContain('The plan came from');
  });
  test('a huge plan is cut, and the prompt stays under the host limit', () => {
    const text = handoffPrompt({ ...input, plan: 'p'.repeat(PLAN_LIMIT * 2) });
    expect(text).toContain('[plan cut]');
    expect(text.length).toBeLessThan(64_000);
  });
  test('the model and agent are cleaned', () => {
    expect(cleanModel(' fireworks/kimi-k2 ')).toBe('fireworks/kimi-k2');
    expect(cleanModel('kimi')).toBeUndefined();
    expect(cleanModel('')).toBeUndefined();
    expect(cleanModel(undefined)).toBeUndefined();
    expect(cleanAgent('plan-build')).toBe('plan-build');
    expect(cleanAgent('')).toBe('build');
    expect(cleanAgent('bad agent!')).toBe('build');
    expect(cleanAgent(undefined)).toBe('build');
  });
});

const project = (id: string, name: string, extra: Partial<SnapProject> = {}): SnapProject => ({ id, name, url: `https://linear.app/a/project/${id}`, status: 'In Progress', health: 'onTrack', progress: 0.5, targetDate: '2026-11-28', teams: ['ENG'], ...extra });
const snapshot = (extra: Partial<DirSnapshot> = {}): DirSnapshot => ({ at: 1_000_000, source: 'frame', teams: [], projects: [], documents: [], myIssues: [], branchIssue: null, ...extra });

describe('mentionRows', () => {
  const snap = snapshot({
    projects: [project('p1', 'Checkout'), project('p2', 'Billing API', { teams: ['BIL'] }), project('p3', 'Repo')],
    documents: [{ id: 'd1', title: 'Checkout rollout', url: 'https://linear.app/a/document/d1', project: 'Checkout' }],
  });
  test('an empty query lists the folder\'s projects, not its documents', () => {
    const rows = mentionRows('', [{ snapshot: snap, preferred: true }]);
    expect(rows.map((r) => r.id)).toEqual(['project:p2', 'project:p1', 'project:p3']);
  });
  test('a query matches names, team keys and documents; the label says what it is', () => {
    const rows = mentionRows('check', [{ snapshot: snap, preferred: true }]);
    expect(rows.map((r) => r.id)).toEqual(['project:p1', 'doc:d1']);
    expect(rows[0]).toMatchObject({ title: 'Checkout', subtitle: 'Project \u00b7 ENG \u00b7 In Progress' });
    expect(rows[1]).toMatchObject({ title: 'Checkout rollout', subtitle: 'Doc \u00b7 Checkout' });
    expect(mentionRows('bil', [{ snapshot: snap, preferred: true }]).map((r) => r.id)).toEqual(['project:p2']);
    expect(mentionRows('zzz', [{ snapshot: snap, preferred: true }])).toEqual([]);
  });
  test('the composer\'s folder comes first, and a project is listed once', () => {
    const other = snapshot({ projects: [project('p9', 'Alpha'), project('p1', 'Checkout')] });
    const rows = mentionRows('', [{ snapshot: other, preferred: false }, { snapshot: snap, preferred: true }]);
    expect(rows[0]!.id).toBe('project:p2');
    expect(rows.filter((r) => r.id === 'project:p1').length).toBe(1);
    expect(rows.at(-1)!.id).toBe('project:p9');
  });
  test('at most 20 rows, titles and subtitles at most 120 characters', () => {
    const many = snapshot({ projects: Array.from({ length: 40 }, (_, n) => project(`p${n}`, `${'N'.repeat(300)} ${n}`)) });
    const rows = mentionRows('', [{ snapshot: many, preferred: true }]);
    expect(rows.length).toBe(ROWS_MAX);
    for (const row of rows) {
      expect(row.title.length).toBeLessThanOrEqual(120);
      expect((row.subtitle ?? '').length).toBeLessThanOrEqual(120);
    }
  });
});

describe('mention text', () => {
  test('a project without a full overview gets a summary and the cache time', () => {
    const text = projectMarkdown(project('p1', 'Checkout', { health: 'atRisk', progress: 0.71 }), Date.UTC(2026, 10, 18, 9, 5));
    expect(text).toContain('Linear project: Checkout');
    expect(text).toContain('Health: At risk');
    expect(text).toContain('Progress: 71%');
    expect(text).toContain('(cached at 2026-11-18 09:05 UTC)');
  });
  test('a held overview is used as it is', () => {
    expect(projectMarkdown(project('p1', 'Checkout', { text: 'Linear project: Checkout\nFull overview.' }), null)).toBe('Linear project: Checkout\nFull overview.');
  });
  test('a document says when its content is not held; held content is returned', () => {
    expect(docMarkdown({ id: 'd', title: 'Notes', url: 'u', project: 'P' }, null)).toContain('The content is not cached yet');
    expect(docMarkdown({ id: 'd', title: 'Notes', url: 'u', project: 'P', text: 'Body.' }, 5)).toContain('Body.');
  });
  test('everything stays under 16,000 characters', () => {
    expect(projectMarkdown(project('p', 'P', { text: 'x'.repeat(40_000) }), 1).length).toBeLessThan(16_000);
    expect(docMarkdown({ id: 'd', title: 'T', url: 'u', project: null, text: 'x'.repeat(40_000) }, 1).length).toBeLessThan(16_000);
  });
  test('locate finds a row\'s item in any snapshot', () => {
    const snaps = [snapshot({ at: 1, projects: [project('p1', 'A')] }), snapshot({ at: 2, documents: [{ id: 'd1', title: 'D', url: 'u', project: null }] })];
    expect(locate('project:p1', snaps)).toMatchObject({ kind: 'project', at: 1 });
    expect(locate('doc:d1', snaps)).toMatchObject({ kind: 'doc', at: 2 });
    expect(locate('project:nope', snaps)).toBeNull();
    expect(locate('weird', snaps)).toBeNull();
  });
});

describe('pushes and config', () => {
  test('readPush needs a directory and ignores keys it does not know', () => {
    expect(readPush(null)).toBeNull();
    expect(readPush({ projects: [] })).toBeNull();
    expect(readPush({ directory: '/r', evil: 1 })).toEqual({ directory: '/r' });
  });
  test('readPush drops malformed rows and clips what is too long', () => {
    const push = readPush({
      directory: '/r',
      projects: [{ id: 'p1', name: 'N'.repeat(500), url: 'u', progress: 7 }, { id: 'p2' }, 'junk'],
      myIssues: [{ identifier: 'eng-1', title: 'T' }, { identifier: 'not an id' }],
      documents: [{ id: 'd', title: 'T', url: 'u', text: 'x'.repeat(30_000) }],
      branchIssue: null,
    })!;
    expect(push.projects?.length).toBe(1);
    expect(push.projects![0]!.name.length).toBe(160);
    expect(push.projects![0]!.progress).toBe(1);
    expect(push.myIssues).toEqual([{ identifier: 'ENG-1', title: 'T', state: '' }]);
    expect(push.documents![0]!.text!.length).toBe(15_000);
    expect(push.branchIssue).toBeNull();
  });
  test('a push leaves what it does not mention, merges documents and keeps a held overview', () => {
    const current = snapshot({ projects: [project('p1', 'A', { text: 'FULL' })], documents: [{ id: 'd1', title: 'Old', url: 'u', project: null }], myIssues: [{ identifier: 'ENG-1', title: 't', state: 's' }] });
    const next = mergePush(current, { directory: '/r', projects: [project('p1', 'A2')], documents: [{ id: 'd2', title: 'New', url: 'u', project: null }] }, 5);
    expect(next.projects[0]).toMatchObject({ name: 'A2', text: 'FULL' });
    expect(next.documents.map((d) => d.id)).toEqual(['d2', 'd1']);
    expect(next.myIssues.length).toBe(1);
    expect(next.at).toBe(5);
  });
  test('moreProjects adds or updates by id and keeps the others', () => {
    const current = snapshot({ projects: [project('p1', 'A'), project('p2', 'B')] });
    const next = mergePush(current, { directory: '/r', moreProjects: [project('p2', 'B2', { text: 'FULL' }), project('p3', 'C')] }, 5);
    expect(next.projects.map((p) => p.name).sort()).toEqual(['A', 'B2', 'C']);
  });
  test('readConfig keys each mapping by its own directory and defaults finish-comments to off', () => {
    const config = readConfig({ directories: { ignored: { directory: '/r', teamIds: ['t'], linearProjectIds: [], activeProjectId: 't', finishComments: 'whatever', buildModel: ' fw/kimi ' }, bad: { teamIds: [] } } })!;
    expect(Object.keys(config.directories)).toEqual(['/r']);
    expect(config.directories['/r']).toMatchObject({ finishComments: 'off', buildModel: 'fw/kimi', teamIds: ['t'] });
    expect(readConfig({ directories: { a: { directory: '/a', finishComments: 'draft' } } })!.directories['/a']!.finishComments).toBe('draft');
    expect(readConfig({ directories: { a: { directory: '/a', planAgent: ' plan ', planModel: ' fw/kimi ', postPlan: true } } })!.directories['/a']).toMatchObject({ planAgent: 'plan', planModel: 'fw/kimi', postPlan: true });
    expect('postPlan' in readConfig({ directories: { a: { directory: '/a', postPlan: 'yes' } } })!.directories['/a']!).toBe(false);
    expect(readConfig({ directories: { a: { directory: '/a', reviewMode: 'auto', aiReviewers: ' CodeRabbit ' } } })!.directories['/a']).toMatchObject({ reviewMode: 'auto', aiReviewers: 'CodeRabbit' });
    expect('reviewMode' in readConfig({ directories: { a: { directory: '/a', reviewMode: 'everything' } } })!.directories['/a']!).toBe(false);
    expect(readConfig('x')).toBeNull();
    expect(readConfig({})).toBeNull();
  });
  test('a push may carry the key of every team in the workspace, and the merge keeps them', () => {
    const push = readPush({ directory: '/r', teamKeys: ['ENG', 'INF', 'x'.repeat(40), 7] })!;
    expect(push.teamKeys).toEqual(['ENG', 'INF', 'x'.repeat(12)]);
    expect(mergePush(undefined, push, 1).teamKeys).toEqual(['ENG', 'INF', 'x'.repeat(12)]);
    expect(mergePush(mergePush(undefined, push, 1), { directory: '/r' }, 2).teamKeys).toEqual(['ENG', 'INF', 'x'.repeat(12)]);
  });
  test('knownTeamKeys joins the mapped teams and the teams of the mapped projects', () => {
    expect(knownTeamKeys(snapshot({ teams: [{ id: 't', key: 'eng', name: 'E' }], projects: [project('p', 'P', { teams: ['MOB'] })] })).sort()).toEqual(['ENG', 'MOB']);
    expect(knownTeamKeys(snapshot({ teamKeys: ['inf', 'NIL'] })).sort()).toEqual(['INF', 'NIL']);
    expect(knownTeamKeys(undefined)).toEqual([]);
  });
});

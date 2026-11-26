import { describe, expect, test } from 'bun:test';
import type { GuestSessionRecord } from '@openchamber/sdk';
import { concisePlan, handoffShown, parseHandoffs, pickBuildSource, PLAN_AGENT, PLAN_SUMMARY_MAX, PLAN_SUMMARY_MIN, planExcerpt, planNeedsDocument, rowKey, withPlan, DESCRIPTION_MAX, NOT_A_PLAN_TEXT, type Handoff } from '../src/shared/handoff-rules.ts';
import { buildStateOf, buildStatesOf, moveChoices, planningStateOf } from '../src/shared/moves.ts';
import type { WorkflowState } from '../src/shared/types.ts';

const session = (id: string, extra: Partial<GuestSessionRecord> = {}): GuestSessionRecord => ({
  id, title: `Session ${id}`, projectId: 'p', directory: `/wt/${id}`, parentId: null, createdAt: 1, updatedAt: 1, archivedAt: null,
  worktree: { directory: `/wt/${id}`, name: id, branch: 'b', status: 'ready' }, activity: 'idle', outcome: null,
  items: [{ id: 'linear-dashboard:ENG-5', data: { identifier: 'ENG-5', issueId: 'i' } }], ...extra,
});

describe('pickBuildSource', () => {
  test('a session this extension started for the issue', () => {
    expect(pickBuildSource([session('a')], 'ENG-5')?.sessionId).toBe('a');
    expect(pickBuildSource([session('a')], 'eng-5')?.sessionId).toBe('a');
  });
  test('a session linked by an issue link counts too', () => {
    const linked = session('b', { items: [], links: [{ title: 'ENG-5', url: 'https://linear.app/a/issue/ENG-5/x', kind: 'issue', linkedAt: 1 }] });
    expect(pickBuildSource([linked], 'ENG-5')?.sessionId).toBe('b');
  });
  test('none for another issue, an archived session or a subagent', () => {
    expect(pickBuildSource([session('a')], 'ENG-6')).toBeNull();
    expect(pickBuildSource([session('a', { archivedAt: 5 })], 'ENG-5')).toBeNull();
    expect(pickBuildSource([session('a', { parentId: 'p' })], 'ENG-5')).toBeNull();
    expect(pickBuildSource([], 'ENG-5')).toBeNull();
  });
  test('the plan agent first, then a worktree, then the newest', () => {
    const plain = session('plain', { updatedAt: 9, worktree: null });
    const tree = session('tree', { updatedAt: 3 });
    const newer = session('newer', { updatedAt: 8 });
    const plan = session('plan', { updatedAt: 1, agent: PLAN_AGENT });
    expect(pickBuildSource([plain, tree, newer, plan], 'ENG-5')?.sessionId).toBe('plan');
    expect(pickBuildSource([plain, tree, newer], 'ENG-5')?.sessionId).toBe('newer');
    expect(pickBuildSource([plain], 'ENG-5')).toMatchObject({ sessionId: 'plain', inWorktree: false });
  });
  test('carries the folder the session runs in, its title and agent', () => {
    expect(pickBuildSource([session('a', { agent: 'plan' })], 'ENG-5')).toMatchObject({ directory: '/wt/a', title: 'Session a', agent: 'plan', inWorktree: true });
  });
});

describe('handoffShown', () => {
  const row = (plan: boolean): Handoff => ({ id: 'a:ENG-5', directory: '/r', sessionDirectory: '/wt/a', sessionId: 'a', identifier: 'ENG-5', sessionTitle: 'Plan', plan, createdAt: 1 });
  test('a reply that reads like a plan, or a session on the plan agent', () => {
    expect(handoffShown(row(true), undefined)).toBe(true);
    expect(handoffShown(row(false), session('a', { agent: PLAN_AGENT }))).toBe(true);
    expect(handoffShown(row(false), session('a', { agent: 'build' }))).toBe(false);
    expect(handoffShown(row(false), undefined)).toBe(false);
  });
  test('never while the session works again, or once it is archived', () => {
    expect(handoffShown(row(true), session('a', { activity: 'running' }))).toBe(false);
    expect(handoffShown(row(true), session('a', { activity: 'retrying' }))).toBe(false);
    expect(handoffShown(row(true), session('a', { archivedAt: 3 }))).toBe(false);
    expect(handoffShown(row(true), session('a', { activity: 'waiting-question' }))).toBe(true);
  });
});

describe('parseHandoffs', () => {
  test('keeps well formed rows and ignores anything else', () => {
    const good = { id: 'a:ENG-5', directory: '/r', sessionDirectory: '/wt', sessionId: 'a', identifier: 'ENG-5', sessionTitle: 'Plan', plan: true, createdAt: 1 };
    expect(parseHandoffs({ handoffs: [good, { id: 'x' }, 'junk', null] })).toEqual([good]);
    expect(parseHandoffs({ ok: false })).toEqual([]);
    expect(parseHandoffs(null)).toEqual([]);
    expect(parseHandoffs({ handoffs: 'no' })).toEqual([]);
  });
});

describe('plan sessions the service started', () => {
  test('count as linked even though the host shows no link on them', () => {
    const plain = session('plan1', { items: [], links: [], agent: PLAN_AGENT });
    expect(pickBuildSource([plain], 'ENG-5')).toBeNull();
    expect(pickBuildSource([plain], 'ENG-5', new Set(['plan1']))?.sessionId).toBe('plan1');
  });
  test('still lose to nothing: archived or subagent plan sessions are skipped', () => {
    expect(pickBuildSource([session('p', { items: [], archivedAt: 1 })], 'ENG-5', new Set(['p']))).toBeNull();
    expect(pickBuildSource([session('p', { items: [], parentId: 'x' })], 'ENG-5', new Set(['p']))).toBeNull();
  });
  test('the plan session wins over the empty one Start plan leaves behind', () => {
    const empty = session('empty', { updatedAt: 9 });
    const plan = session('plan1', { items: [], agent: PLAN_AGENT, updatedAt: 3 });
    expect(pickBuildSource([empty, plan], 'ENG-5', new Set(['plan1']))?.sessionId).toBe('plan1');
  });
});

describe('withPlan', () => {
  const SECTION = '---\n## Plan\n\n1. Do it\n2. Test it';
  test('the plan goes last, after a rule and a "Plan" heading, and the text above is kept', () => {
    expect(withPlan('Show saved cards first.\n\n- one\n- two', '1. Do it\n2. Test it')).toBe(`Show saved cards first.\n\n- one\n- two\n\n${SECTION}`);
  });
  test('the heading is only "Plan": no session name, which Linear would turn into a link to the issue', () => {
    const text = withPlan('x', 'p')!;
    expect(text).toContain('\n## Plan\n');
    expect(text).not.toMatch(/session|OpenChamber/);
  });
  test('the plan\'s own first title is dropped, the rest of it kept', () => {
    expect(withPlan('', '# APPSEC-21 plan: harden the module\n\n**First step:** edit `checks.tf`.\n\n## What I confirmed\n- a')).toBe('---\n## Plan\n\n**First step:** edit `checks.tf`.\n\n## What I confirmed\n- a');
    expect(withPlan('', '## Not a title\ntext')).toContain('## Not a title');
    expect(withPlan('', 'No title at all.')).toBe('---\n## Plan\n\nNo title at all.');
  });
  test('an issue with no description gets the section alone', () => {
    expect(withPlan(null, '1. Do it\n2. Test it')).toBe(SECTION);
    expect(withPlan('', '1. Do it\n2. Test it')).toBe(SECTION);
  });
  test('adding again replaces the section instead of piling them up', () => {
    const once = withPlan('Intro.', 'old plan')!;
    const twice = withPlan(once, 'new plan')!;
    expect(twice).toBe('Intro.\n\n---\n## Plan\n\nnew plan');
    expect(twice.match(/## Plan/g)?.length).toBe(1);
    expect(withPlan(twice, 'new plan')).toBe(twice);
  });
  test('a section written by the earlier version, with the session name, is replaced too', () => {
    const old = 'Intro.\n\n---\n**Plan from OpenChamber session: APPSEC-21 plan**\n\n# APPSEC-21 plan: x\n\nold text';
    expect(withPlan(old, 'new plan')).toBe('Intro.\n\n---\n## Plan\n\nnew plan');
  });
  test('the old section as Linear saved it back, with the title turned into links, is replaced too', () => {
    const saved = 'Intro.\n\n---\n\n**Plan from OpenChamber session:** [APPSEC-21](https://linear.app/t/issue/APPSEC-21/x) **plan**\n\n# [APPSEC-21](https://linear.app/t/issue/APPSEC-21/x) plan: harden `m`\n\n* a\n* b';
    expect(withPlan(saved, 'new plan')).toBe('Intro.\n\n---\n## Plan\n\nnew plan');
  });
  test('the new section as Linear saves it back (a blank line after the rule) is replaced too', () => {
    expect(withPlan('Intro.\n\n---\n\n## Plan\n\nold', 'new plan')).toBe('Intro.\n\n---\n## Plan\n\nnew plan');
  });
  test('a rule or a heading of the user\'s own that is not "Plan" is left alone', () => {
    const own = 'Intro.\n\n---\n\n## Notes\nMy own notes.';
    expect(withPlan(own, 'p')).toBe(`${own}\n\n---\n## Plan\n\np`);
  });
  test('a concise plan links its full document instead of cutting it off', () => {
    const text = withPlan('x', '**In short:** ship the change.', 'https://linear.app/acme/document/full-plan')!;
    expect(text).toContain('**In short:** ship the change.');
    expect(text).toContain('**Full plan:** [Read the full plan document](https://linear.app/acme/document/full-plan)');
    expect(text).not.toContain('[cut]');
  });
  test('a full plan passed without a document stays intact', () => {
    const plan = 'p'.repeat(30_000);
    expect(withPlan('x', plan)).toContain(plan);
  });
  test('a result over the description limit is refused', () => {
    expect(withPlan('d'.repeat(DESCRIPTION_MAX), 'plan')).toBeNull();
  });
  test('no banned dashes appear', () => {
    expect(withPlan('a', 'c')).not.toMatch(/[\u2013\u2014\u2015]/);
  });
});

describe('concise plan summary', () => {
  test('the document threshold and the issue limit are the same', () => {
    expect(planNeedsDocument('p'.repeat(PLAN_SUMMARY_MAX))).toBe(false);
    expect(planNeedsDocument('p'.repeat(PLAN_SUMMARY_MAX + 1))).toBe(true);
  });
  test('the source summary keeps the plan\'s steps without a model call', () => {
    const plan = '# ENG-5 plan\n\n## Evidence\n\nEnough detail.\n\n**In short:** ship the safe fix.\n\n## Steps\n1. Fix it.';
    const fitted = concisePlan(plan);
    expect(fitted).toContain('**In short:** ship the safe fix.');
    expect(fitted).toContain('## Steps\n1. Fix it.');
    expect(fitted).not.toContain('# ENG-5 plan');
  });
  test('a long source is bounded at a paragraph or word boundary', () => {
    const plan = `**In short:** ship it.\n\n${'Implementation detail. '.repeat(500)}`;
    const fitted = concisePlan(plan);
    expect(fitted.length).toBeGreaterThanOrEqual(PLAN_SUMMARY_MIN);
    expect(fitted.length).toBeLessThanOrEqual(PLAN_SUMMARY_MAX);
    expect(fitted.endsWith('…')).toBe(true);
    expect(fitted).not.toContain('[cut]');
  });
});

describe('planExcerpt', () => {
  test('the excerpt is the first lines, without blank ones, and clipped', () => {
    expect(planExcerpt('## Plan\n\n1. One\n2. Two\n3. Three', 3)).toBe('## Plan\n1. One\n2. Two');
    expect(planExcerpt('x'.repeat(1000)).length).toBeLessThanOrEqual(423);
    expect(planExcerpt('')).toBe('');
  });
});

describe('planningStateOf', () => {
  const state = (id: string, name: string, type: WorkflowState['type'], position: number): WorkflowState => ({ id, name, type, color: '#000', position, team: { id: 't' } } as WorkflowState);
  const states = [state('b', 'Backlog', 'backlog', 0), state('t', 'Todo', 'unstarted', 1), state('pl', 'In Planning', 'unstarted', 2), state('ip', 'In Progress', 'started', 3), state('d', 'Done', 'completed', 4)];
  const issue = (s: WorkflowState) => ({ state: s });
  test('a status named like planning comes first, even though the team files it before work', () => {
    expect(planningStateOf(issue(states[1]!), states)?.id).toBe('pl');
    expect(planningStateOf(issue(states[0]!), states)?.id).toBe('pl');
  });
  test('without one, what Start session would pick', () => {
    expect(planningStateOf(issue(states[1]!), states.filter((s) => s.id !== 'pl'))?.id).toBe('ip');
  });
  test('no move for an issue already planning, started or done', () => {
    expect(planningStateOf(issue(states[2]!), states)).toBeNull();
    expect(planningStateOf(issue(states[3]!), states)).toBeNull();
    expect(planningStateOf(issue(states[4]!), states)).toBeNull();
  });
});

describe('rowKey', () => {
  test('a plan finished again is a new row, the same row twice is not', () => {
    const row = { id: 'ses_1:ENG-5', createdAt: 100 };
    expect(rowKey(row)).toBe(rowKey({ ...row }));
    expect(rowKey(row)).not.toBe(rowKey({ ...row, createdAt: 200 }));
  });
});

describe('buildStateOf', () => {
  const state = (id: string, name: string, type: WorkflowState['type'], position: number): WorkflowState => ({ id, name, type, color: '#000', position, team: { id: 't' } } as WorkflowState);
  const states = [state('b', 'Backlog', 'backlog', 0), state('t', 'Todo', 'unstarted', 1), state('pl', 'In Planning', 'unstarted', 2), state('ip', 'In Progress', 'started', 3), state('bl', 'Blocked', 'started', 4), state('d', 'Done', 'completed', 5)];
  const issue = (s: WorkflowState) => ({ state: s });
  test('an issue in a planning status moves on to In Progress when the build starts', () => {
    expect(buildStateOf(issue(states[2]!), states)?.id).toBe('ip');
    expect(buildStateOf(issue(states[1]!), states)?.id).toBe('ip');
  });
  test('where the team files In Planning as a started status, the build still moves it on', () => {
    const startedPlanning = state('pl2', 'In Planning', 'started', 2);
    const all = [...states.filter((s) => s.id !== 'pl'), startedPlanning];
    expect(buildStateOf(issue(startedPlanning), all)?.id).toBe('ip');
    expect(buildStatesOf(all).map((s) => s.id)).toEqual(['ip', 'bl']);
    expect(buildStateOf(issue(states[3]!), all)).toBeNull();
  });
  test('no move for an issue already started or done', () => {
    expect(buildStateOf(issue(states[3]!), states)).toBeNull();
    expect(buildStateOf(issue(states[5]!), states)).toBeNull();
  });
  test('the choices are the started statuses only, and the last one used wins by name', () => {
    expect(buildStatesOf(states).map((s) => s.id)).toEqual(['ip', 'bl']);
    expect(buildStateOf(issue(states[2]!), states, 'blocked')?.id).toBe('bl');
  });
  test('a team with no started status has nowhere to move to', () => {
    expect(buildStateOf(issue(states[2]!), states.filter((s) => s.type !== 'started'))).toBeNull();
  });
});

describe('moveChoices: one row for session, plan and build', () => {
  const state = (id: string, name: string, type: WorkflowState['type'], position: number): WorkflowState => ({ id, name, type, color: '#000', position, team: { id: 't' } } as WorkflowState);
  const todo = state('t', 'Todo', 'unstarted', 1);
  const planning = state('pl', 'In Planning', 'started', 2);
  const progress = state('ip', 'In Progress', 'started', 3);
  const review = state('rv', 'In Review', 'started', 4);
  const states = [state('b', 'Backlog', 'backlog', 0), todo, planning, progress, review, state('d', 'Done', 'completed', 5)];
  const issue = (s: WorkflowState) => ({ state: s });
  const ids = (list: WorkflowState[]) => list.map((s) => s.id);

  test('a plan offers the started statuses, planning first, and starts on the planning one', () => {
    const c = moveChoices('plan', issue(todo), states);
    expect(ids(c.options)).toEqual(['pl', 'ip', 'rv']);
    expect(c.target?.id).toBe('pl');
    expect(c.moves).toBe(true);
  });
  test('a build offers the started statuses without planning, and starts on In Progress', () => {
    const c = moveChoices('build', issue(planning), states);
    expect(ids(c.options)).toEqual(['ip', 'rv']);
    expect(c.target?.id).toBe('ip');
    expect(c.moves).toBe(true);
  });
  test('an issue already where the action would put it shows that status and does not move', () => {
    const plan = moveChoices('plan', issue(planning), states);
    expect(plan.target?.id).toBe('pl');
    expect(plan.moves).toBe(false);
    const build = moveChoices('build', issue(progress), states);
    expect(build.target?.id).toBe('ip');
    expect(build.moves).toBe(false);
  });
  test('the status used last wins for a build and a session, by name', () => {
    expect(moveChoices('build', issue(planning), states, 'in review').target?.id).toBe('rv');
    expect(moveChoices('session', issue(todo), states, 'in review').target?.id).toBe('rv');
  });
  test('a session starts as Start session always did', () => {
    const c = moveChoices('session', issue(todo), states);
    expect(c.target?.id).toBe('ip');
    expect(c.moves).toBe(true);
    expect(moveChoices('session', issue(planning), states).moves).toBe(false);
  });
  test('a done issue shows nothing to move to when its status is not among the choices, and a team with no started status has no options', () => {
    expect(moveChoices('build', issue(states[5]!), states).moves).toBe(false);
    expect(moveChoices('build', issue(todo), [todo]).options).toEqual([]);
  });
});

describe('the not-a-plan message', () => {
  test('the frame and the service say the same thing, and it tells what to ask', () => {
    expect(NOT_A_PLAN_TEXT).toContain('Ask the session to repeat the final plan in full');
    expect(NOT_A_PLAN_TEXT).not.toMatch(/[\u2013\u2014\u2015]/);
  });
});

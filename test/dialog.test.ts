import { describe, expect, test } from 'bun:test';
import { documentContext, projectContext } from '../src/shared/attach-text.ts';
import {
  ensureLocation, locationLine, messagePrompt, outcomeOfAnswer, outcomeOfError, parseDraft, PROMPT_MAX, sessionPrompt, snippetOf,
} from '../src/shared/draft.ts';
import { linkedIdentifiers } from '../src/shared/linked.ts';
import { commentBody, jobFor } from '../src/dialog/jobs.ts';
import { createScope } from '../src/dialog/scope.ts';
import type { DocumentDetail, ProjectDetail } from '../src/shared/types.ts';

describe('parseDraft', () => {
  test('reads a plain JSON answer', () => {
    expect(parseDraft('{"title":"Fix login","description":"It fails."}')).toEqual({ title: 'Fix login', description: 'It fails.' });
  });
  test('reads an answer in a code fence with words around it', () => {
    const answer = 'Here is the issue:\n```json\n{"title": "Fix login", "description": "- one\\n- two"}\n```\nHope that helps.';
    expect(parseDraft(answer)).toEqual({ title: 'Fix login', description: '- one\n- two' });
  });
  test('repairs raw newlines inside the description string', () => {
    const answer = '{"title": "Fix login", "description": "Line one\nLine two"}';
    expect(parseDraft(answer)).toEqual({ title: 'Fix login', description: 'Line one\nLine two' });
  });
  test('keeps braces that appear inside the text', () => {
    expect(parseDraft('{"title":"Handle {} in config","description":"Use `{}`."}')?.title).toBe('Handle {} in config');
  });
  test('collapses whitespace in the title and cuts it at 200 characters', () => {
    expect(parseDraft('{"title":"  A\\n  B  ","description":""}')?.title).toBe('A B');
    expect(parseDraft(`{"title":"${'x'.repeat(300)}","description":""}`)?.title).toHaveLength(200);
  });
  test('refuses answers without a usable title', () => {
    expect(parseDraft('no json here')).toBeNull();
    expect(parseDraft('{"description":"only a body"}')).toBeNull();
    expect(parseDraft('{"title":"   ","description":"x"}')).toBeNull();
    expect(parseDraft('[1,2]')).toBeNull();
  });
  test('a missing description is empty', () => {
    expect(parseDraft('{"title":"Just a title"}')).toEqual({ title: 'Just a title', description: '' });
  });
});

describe('outcomes', () => {
  test('NO_MODEL opens the form empty with a note', () => {
    expect(outcomeOfError('NO_MODEL', 'x')).toEqual({ kind: 'no-model' });
  });
  test('other failures carry a message', () => {
    expect(outcomeOfError('MODEL_FAILED', 'Rate limited')).toEqual({ kind: 'failed', message: 'Rate limited' });
    expect(outcomeOfError('NOT_GRANTED', '').kind).toBe('failed');
    expect(outcomeOfError('HOST_TIMEOUT', '')).toMatchObject({ kind: 'failed' });
  });
  test('an unreadable answer is a failure', () => {
    expect(outcomeOfAnswer('sorry').kind).toBe('failed');
    expect(outcomeOfAnswer('{"title":"A","description":"b"}').kind).toBe('draft');
  });
});

describe('prompts', () => {
  test('a long message is cut to fit', () => {
    const prompt = messagePrompt('x'.repeat(200_000), 'assistant', 'Chat');
    expect(prompt.length).toBeLessThan(PROMPT_MAX);
    expect(prompt).toContain('[cut]');
  });
  test('a long chat drops its oldest messages, keeps the newest, and says so', () => {
    const messages = Array.from({ length: 40 }, (_, n) => ({ role: n % 2 ? 'assistant' as const : 'user' as const, text: `message ${n} ${'y'.repeat(7_000)}` }));
    const prompt = sessionPrompt(messages, 'Chat');
    expect(prompt.length).toBeLessThanOrEqual(PROMPT_MAX);
    expect(prompt).toContain('[earlier messages left out]');
    expect(prompt).toContain('message 39');
    expect(prompt).not.toContain('message 0 ');
  });
  test('a short chat is kept whole, oldest first', () => {
    const prompt = sessionPrompt([{ role: 'user', text: 'first' }, { role: 'assistant', text: 'second' }], 'Chat');
    expect(prompt).not.toContain('left out');
    expect(prompt.indexOf('first')).toBeLessThan(prompt.indexOf('second'));
  });
  test('one message longer than the budget is clipped, not dropped', () => {
    const prompt = sessionPrompt([{ role: 'user', text: 'z'.repeat(100_000) }], 'Chat');
    expect(prompt.length).toBeLessThanOrEqual(PROMPT_MAX);
    expect(prompt).toContain('zzzz');
  });
});

describe('diff drafting', () => {
  const file = Array.from({ length: 30 }, (_, n) => `line ${n + 1}`).join('\n');
  test('takes the selected lines plus five on each side', () => {
    const snippet = snippetOf(file, 10, 12);
    expect([snippet.from, snippet.to]).toEqual([5, 17]);
    expect(snippet.text.split('\n')).toHaveLength(13);
  });
  test('stays inside the file', () => {
    expect([snippetOf(file, 1, 2).from, snippetOf(file, 29, 30).to]).toEqual([1, 30]);
    expect(snippetOf(file, 12, 10).from).toBe(5);
  });
  test('the description always names the file and lines', () => {
    expect(ensureLocation('Fix this.', 'src/a.ts', 3, 5)).toBe('Fix this.\n\nLocation: `src/a.ts:3-5`');
    expect(ensureLocation('Check src/a.ts closely.', 'src/a.ts', 3, 5)).toBe('Check src/a.ts closely.');
    expect(ensureLocation('', 'src/a.ts', 7, 7)).toBe('Location: `src/a.ts:7`');
    expect(locationLine('a.ts', 9, 4)).toBe('Location: `a.ts:4-9`');
  });
});

describe('jobFor', () => {
  const deps = { readFile: async () => 'a\nb\nc\nd\ne', sessionTitle: 'Open chat' };
  const message = { kind: 'message', action: 'issue-from-message', sessionId: 's', sessionTitle: 'Batch taxes', directory: '/d', messageId: 'm1', role: 'assistant', text: 'The cart fails over 50 items.' } as const;

  test('a message drafts from its text', async () => {
    const job = jobFor(message, deps)!;
    expect(job.source).toBe('From a reply by the assistant');
    expect((await job.build()).prompt).toContain('The cart fails over 50 items.');
  });
  test('an empty message has nothing to draft from', async () => {
    const built = await jobFor({ ...message, text: '  ' }, deps)!.build();
    expect(built.prompt).toBeNull();
    expect(built.note).toBeTruthy();
  });
  test('the comment action is not a create job', () => {
    expect(jobFor({ ...message, action: 'comment-on-issue' }, deps)).toBeNull();
  });
  test('a selection uses the open session title', async () => {
    const job = jobFor({ kind: 'selection', action: 'issue-from-selection', sessionId: 's', directory: null, messageId: 'm', text: 'a stack trace' }, deps)!;
    expect((await job.build()).prompt).toContain('Open chat');
  });
  test('a session without its messages says why the form is empty', async () => {
    const job = jobFor({ kind: 'session', action: 'issue-from-session', sessionId: 's', sessionTitle: 'Chat', directory: null }, deps)!;
    expect((await job.build()).prompt).toBeNull();
  });
  test('a session drafts from its messages', async () => {
    const job = jobFor({ kind: 'session', action: 'issue-from-session', sessionId: 's', sessionTitle: 'Chat', directory: null, messages: [{ id: '1', role: 'user', text: 'it crashes', createdAt: 1 }] }, deps)!;
    expect(job.source).toBe('From this chat (1 message)');
    expect((await job.build()).prompt).toContain('it crashes');
  });
  test('diff lines read the file, start with a location, and finish with one', async () => {
    const job = jobFor({ kind: 'diff', action: 'issue-from-diff', directory: null, path: 'src/a.ts', startLine: 2, endLine: 3 }, deps)!;
    expect(job.initial?.description).toBe('Location: `src/a.ts:2-3`');
    const built = await job.build();
    expect(built.prompt).toContain('src/a.ts');
    expect(built.prompt).toContain('<code>');
    expect(job.finish({ title: 'T', description: 'Body' }).description).toContain('`src/a.ts:2-3`');
  });
  test('an unreadable file still drafts, from the location alone', async () => {
    const job = jobFor({ kind: 'diff', action: 'issue-from-diff', directory: null, path: 'gone.ts', startLine: 1, endLine: 1 }, { ...deps, readFile: async () => null })!;
    const built = await job.build();
    expect(built.prompt).toContain('could not read the file');
  });
  test('other items are not jobs', () => {
    expect(jobFor(null, deps)).toBeNull();
    expect(jobFor({ providerId: 'linear-dashboard', id: 'p', title: 'P', url: 'u' }, deps)).toBeNull();
  });
  test('a comment is headed with its session', () => {
    expect(commentBody('Batch taxes', ' Done. ')).toBe('**OpenChamber session: Batch taxes**\n\nDone.');
  });
});

describe('linkedIdentifiers', () => {
  test('lists issue links newest first, then started-from items, without repeats', () => {
    const ids = linkedIdentifiers({
      links: [
        { url: 'https://linear.app/acme/issue/ENG-1/old', linkedAt: 1 },
        { url: 'https://gitlab.com/acme/x/-/merge_requests/3', linkedAt: 9 },
        { url: 'https://linear.app/acme/issue/eng-7/new', linkedAt: 5 },
      ],
      items: [{ data: { identifier: 'ENG-1' } }, { data: { identifier: 'ops-2' } }, { data: undefined }],
    });
    expect(ids).toEqual(['ENG-7', 'ENG-1', 'OPS-2']);
  });
  test('no session, no issues', () => {
    expect(linkedIdentifiers(undefined)).toEqual([]);
    expect(linkedIdentifiers({})).toEqual([]);
  });
});

describe('createScope', () => {
  const teamsOf = (id: string) => (id === 'p1' ? ['t2'] : id === 'p2' ? ['t3'] : []);
  test('an active team leads and no project is chosen', () => {
    expect(createScope({ teamIds: ['t1', 't4'], projectIds: [], activeId: 't4', teamsOfProject: teamsOf })).toEqual({ teamIds: ['t4', 't1'], projectId: null });
  });
  test('a single mapped project is preselected, with its team first', () => {
    expect(createScope({ teamIds: [], projectIds: ['p1'], activeId: 'all', teamsOfProject: teamsOf })).toEqual({ teamIds: ['t2'], projectId: 'p1' });
  });
  test('several projects: only the active one is preselected', () => {
    expect(createScope({ teamIds: [], projectIds: ['p1', 'p2'], activeId: 'all', teamsOfProject: teamsOf })).toEqual({ teamIds: ['t2', 't3'], projectId: null });
    expect(createScope({ teamIds: [], projectIds: ['p1', 'p2'], activeId: 'p2', teamsOfProject: teamsOf })).toEqual({ teamIds: ['t3', 't2'], projectId: 'p2' });
  });
  test('nothing mapped offers no default', () => {
    expect(createScope({ teamIds: [], projectIds: [], activeId: undefined, teamsOfProject: teamsOf })).toEqual({ teamIds: [], projectId: null });
  });
});

describe('attach text', () => {
  const user = { id: 'u', name: 'Ada Park', displayName: 'ada', avatarUrl: null, avatarBackgroundColor: '' };
  const project = {
    id: 'p', name: 'Checkout', slugId: 's', url: 'https://linear.app/acme/project/checkout', icon: null, color: '', health: 'atRisk', progress: 0.71,
    startDate: null, targetDate: '2026-11-12', updatedAt: '', status: { id: 's', name: 'In Progress', type: 'started', color: '' }, lead: user,
    teams: { nodes: [{ id: 't', key: 'ENG', name: 'Engineering' }] }, description: 'Short.', content: '## Goal\nFaster checkout.',
    members: { nodes: [] },
    projectMilestones: { nodes: [{ id: 'm2', name: 'Payments', targetDate: null, progress: 0.5, sortOrder: 2 }, { id: 'm1', name: 'Pricing', targetDate: '2026-11-05', progress: 1, sortOrder: 1 }] },
    lastUpdate: null, projectUpdates: { nodes: [{ id: 'u1', body: 'Slipped a week.', health: 'atRisk', createdAt: '2026-11-06T16:00:00Z', url: '', user }] }, documents: { nodes: [] },
  } as unknown as ProjectDetail;

  test('a project reads as an overview with milestones in order and its latest update', () => {
    const text = projectContext(project);
    expect(text).toContain('Linear project: Checkout');
    expect(text).toContain('Health: At risk');
    expect(text.indexOf('Pricing')).toBeLessThan(text.indexOf('Payments'));
    expect(text).toContain('Slipped a week.');
    expect(text).toContain('Faster checkout.');
  });
  test('long content is cut under the host limit', () => {
    expect(projectContext({ ...project, content: 'w'.repeat(40_000) }).length).toBeLessThan(16_000);
    const doc = { id: 'd', title: 'Architecture', url: 'https://linear.app/d', updatedAt: '', project: null, creator: null, content: 'x'.repeat(40_000) } as DocumentDetail;
    expect(documentContext(doc).length).toBeLessThan(16_000);
    expect(documentContext(doc)).toContain('Linear document: Architecture');
  });
});

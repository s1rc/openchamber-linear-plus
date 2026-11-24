import { afterEach, describe, expect, mock, test } from 'bun:test';
import { load, put } from '../src/shared/cache.ts';
import type { IssueRow } from '../src/shared/types.ts';

// Stand in for the network: each test says what Linear answers.
let answer: () => Promise<unknown> = async () => ({});
const sent: { query: string; variables: unknown }[] = [];
mock.module('../src/shared/linear.ts', () => ({
  LinearError: class LinearError extends Error {
    kind: string;
    constructor(kind: string, message: string) { super(message); this.kind = kind; }
  },
  gql: async (query: string, variables: unknown) => { sent.push({ query, variables }); return answer(); },
}));
const {
  addCustomerRequest, addIssueDocument, addIssueLink, convertIssueToProject, createIssueRelation, markRead, patchIssue, remindIssue, toggleFavorite, updateIssue, writeErrorText,
} = await import('../src/shared/writes.ts');
const { LinearError } = await import('../src/shared/linear.ts');

const row = (id: string, priority: number): IssueRow => ({ id, identifier: id.toUpperCase(), priority, team: { id: 't', key: 'T' } } as unknown as IssueRow);

afterEach(() => { sent.length = 0; });

describe('patchIssue', () => {
  test('changes the issue in every list and its detail, and rolls back', async () => {
    put('issues:a', { issues: [row('i1', 3), row('i2', 3)], capped: false });
    put('view-issues:v', { issues: [row('i1', 3)], capped: false });
    put('issue:I1', { id: 'i1', identifier: 'I1', priority: 3, team: { id: 't', key: 'T', name: 'Team', states: { nodes: [] } } });
    const read = (key: string) => load(key, async () => null);
    const rollback = patchIssue('i1', { priority: 1, team: { id: 'x', key: 'X' } });
    expect(((await read('issues:a')) as { issues: IssueRow[] }).issues.map((i) => i.priority)).toEqual([1, 3]);
    expect(((await read('view-issues:v')) as { issues: IssueRow[] }).issues[0]!.priority).toBe(1);
    const detail = (await read('issue:I1')) as { priority: number; team: { name: string } };
    expect(detail.priority).toBe(1);
    expect(detail.team.name).toBe('Team');
    rollback();
    expect(((await read('issues:a')) as { issues: IssueRow[] }).issues[0]!.priority).toBe(3);
  });
});

describe('updateIssue', () => {
  test('sends the input and keeps what Linear saved', async () => {
    put('issues:b', { issues: [row('i3', 3)], capped: false });
    answer = async () => ({ issueUpdate: { success: true, issue: { ...row('i3', 2), title: 'Saved' } } });
    const saved = await updateIssue({ id: 'i3', identifier: 'I3' }, { input: { priority: 2 }, patch: { priority: 2 } });
    expect(sent[0]!.variables).toEqual({ id: 'i3', input: { priority: 2 } });
    expect(saved.title).toBe('Saved');
  });
  test('a refused change rolls back and throws', async () => {
    put('issues:c', { issues: [row('i4', 3)], capped: false });
    answer = async () => { throw new LinearError('graphql', 'Invalid scope: write required'); };
    await expect(updateIssue({ id: 'i4', identifier: 'I4' }, { input: { priority: 1 }, patch: { priority: 1 } })).rejects.toThrow('Invalid scope');
    expect(((await load('issues:c', async () => null)) as { issues: IssueRow[] }).issues[0]!.priority).toBe(3);
  });
});

describe('markRead', () => {
  test('one notification uses notificationUpdate; several go in one request', async () => {
    put('notifications', { nodes: [{ id: 'n1', readAt: null }, { id: 'n2', readAt: null }], pageInfo: { hasNextPage: false, endCursor: null } });
    answer = async () => ({ n0: { success: true }, n1: { success: true } });
    await markRead(['n1', 'n2']);
    expect(sent).toHaveLength(1);
    expect(sent[0]!.query).toContain('n1: notificationUpdate(id: "n2"');
    answer = async () => ({ notificationUpdate: { success: true } });
    await markRead(['n1']);
    expect(sent[1]!.query).toContain('mutation NotificationMarkRead(');
  });
});

describe('issue action writes', () => {
  test('links, customer requests and documents carry the issue id', async () => {
    answer = async () => {
      const query = sent.at(-1)!.query;
      if (query.includes('mutation DocumentCreate')) return { documentCreate: { success: true, document: { id: 'd1' } } };
      if (query.includes('mutation CustomerNeedCreate')) return { customerNeedCreate: { success: true } };
      return { attachmentCreate: { success: true } };
    };
    await addIssueLink({ id: 'i1', identifier: 'I1' }, { url: 'https://example.com', title: 'Example' });
    await addCustomerRequest({ id: 'i1', identifier: 'I1' }, { customerId: 'c1', body: 'Please add this' });
    await addIssueDocument({ id: 'i1', identifier: 'I1' }, { title: 'Notes', content: 'Text' });
    expect(sent.map((c) => c.variables)).toEqual([
      { input: { issueId: 'i1', url: 'https://example.com', title: 'Example' } },
      { input: { issueId: 'i1', customerId: 'c1', body: 'Please add this' } },
      { input: { issueId: 'i1', title: 'Notes', content: 'Text' } },
    ]);
  });

  test('a blocked-by relation reverses the issue ids', async () => {
    answer = async () => ({ issueRelationCreate: { success: true } });
    await createIssueRelation({ id: 'i1', identifier: 'I1' }, { id: 'i2', identifier: 'I2' }, { id: 'blocked', type: 'blocks', inverse: true });
    expect(sent[0]!.variables).toEqual({ input: { issueId: 'i2', relatedIssueId: 'i1', type: 'blocks' } });
  });

  test('favorite creates or deletes the caller\'s favorite reference', async () => {
    answer = async () => sent.at(-1)!.query.includes('query IssueFavorite')
      ? { issue: { id: 'i1', favorite: null } }
      : { favoriteCreate: { success: true } };
    await expect(toggleFavorite({ id: 'i1' })).resolves.toBe(true);
    expect(sent[1]!.variables).toEqual({ input: { issueId: 'i1' } });
    answer = async () => sent.at(-1)!.query.includes('query IssueFavorite')
      ? { issue: { id: 'i1', favorite: { id: 'f1' } } }
      : { favoriteDelete: { success: true } };
    await expect(toggleFavorite({ id: 'i1' })).resolves.toBe(false);
    expect(sent[3]!.variables).toEqual({ id: 'f1' });
  });

  test('reminders use a timestamp and project conversion uses Linear\'s native hook', async () => {
    answer = async () => sent.at(-1)!.query.includes('mutation ProjectCreate')
      ? { projectCreate: { success: true, project: { id: 'p1', name: 'Copied', url: 'u' } } }
      : { issueReminder: { success: true } };
    await remindIssue({ id: 'i1' }, '2026-11-25T12:00:00Z');
    await convertIssueToProject({ id: 'i1', identifier: 'I1', title: 'Copied', team: { id: 't1', key: 'T' } });
    expect(sent[0]!.variables).toEqual({ id: 'i1', reminderAt: '2026-11-25T12:00:00Z' });
    expect(sent[1]!.variables).toEqual({ input: { name: 'Copied', teamIds: ['t1'], convertedFromIssueId: 'i1' } });
  });
});

describe('writeErrorText', () => {
  test('a read-only connection says how to fix it', () => {
    expect(writeErrorText(new LinearError('graphql', 'Invalid scope: write required'))).toContain('can read but not write');
    expect(writeErrorText(new LinearError('graphql', 'Title is too long'))).toBe('Title is too long');
  });
});

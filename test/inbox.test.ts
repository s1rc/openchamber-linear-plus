import { describe, expect, test } from 'bun:test';
import { notificationText } from '../src/shared/inbox.ts';
import type { Notification, WorkflowState } from '../src/shared/types.ts';

const ada = { id: 'u-ada', name: 'Ada Park', displayName: 'ada', avatarUrl: null, avatarBackgroundColor: '' };
const done: WorkflowState = { id: 's', name: 'Done', type: 'completed', color: '#5e6ad2', position: 0 };
const onIssue = { id: 'i', identifier: 'ENG-9', title: 'Remove the legacy tax endpoint', url: 'https://linear.app/acme/issue/ENG-9', state: done, team: { id: 't', key: 'ENG' }, project: null };
const note = (extra: Partial<Notification>): Notification => ({ id: 'n', type: 'issueNewComment', category: 'commentsAndReplies', readAt: null, createdAt: '', actor: ada, ...extra });

describe('notificationText', () => {
  test('an issue notification names the issue and says who did what', () => {
    expect(notificationText(note({ issue: onIssue }))).toEqual({ title: 'Remove the legacy tax endpoint', detail: 'Ada Park commented', url: 'https://linear.app/acme/issue/ENG-9' });
    expect(notificationText(note({ category: 'assignments', issue: onIssue })).detail).toBe('Ada Park assigned you');
    expect(notificationText(note({ category: 'mentions', issue: onIssue })).detail).toBe('Ada Park mentioned you');
  });
  test('a status change says the new status, a reaction its emoji', () => {
    expect(notificationText(note({ category: 'statusChanges', issue: onIssue })).detail).toBe('Ada Park changed the status to Done');
    expect(notificationText(note({ category: 'reactions', reactionEmoji: '\u{1F44D}', issue: onIssue })).detail).toBe('Ada Park reacted \u{1F44D}');
  });
  test('a project update names the project, its health, and leads to the update', () => {
    const text = notificationText(note({ category: 'postsAndUpdates', project: { id: 'p', name: 'Checkout', url: 'https://linear.app/acme/project/checkout' }, projectUpdate: { health: 'atRisk', url: 'https://linear.app/acme/project/checkout/updates' } }));
    expect(text).toEqual({ title: 'Checkout', detail: 'Ada Park posted an update: At risk', url: 'https://linear.app/acme/project/checkout/updates' });
  });
  test('a document notification leads to the document', () => {
    expect(notificationText(note({ category: 'documentChanges', project: { id: 'p', name: 'Checkout', url: 'p' }, document: { title: 'Architecture', url: 'https://linear.app/acme/document/a' } }))).toMatchObject({ title: 'Architecture', url: 'https://linear.app/acme/document/a' });
  });
  test('with no actor or a category it does not know, the type is put in words', () => {
    expect(notificationText(note({ actor: null, category: 'reminders', type: 'issueReminder', issue: onIssue })).detail).toBe('Reminder');
    expect(notificationText(note({ actor: null, category: 'loops', type: 'oauthClientApproval' }))).toEqual({ title: 'Oauth client approval', detail: 'Oauth client approval', url: null });
  });
});

// Finish-comment drafts: the service writes one when a session linked to a Linear issue finishes a
// turn, and the user posts or discards it from the Work Status section. The service never posts.
import { api } from '@openchamber-ext/shared-ui';
import { host } from './host.ts';
import { gql } from './linear.ts';
import { issuesByIdentifier } from './queries.ts';
import type { IssuesByIdentifierResult } from './types.ts';
import { addComment } from './writes.ts';

export type Draft = {
  id: string;
  directory: string;
  sessionId: string;
  identifier: string;
  sessionTitle: string;
  body: string;
  createdAt: number;
};

const isDraft = (value: unknown): value is Draft => {
  if (typeof value !== 'object' || value === null) return false;
  const draft = value as Record<string, unknown>;
  return typeof draft.id === 'string' && typeof draft.identifier === 'string' && typeof draft.body === 'string';
};

/** The drafts in a service answer. Anything unexpected is no draft: the section just shows none. */
export const parseDrafts = (reply: { [key: string]: unknown } | null | undefined): Draft[] =>
  Array.isArray(reply?.drafts) ? reply.drafts.filter(isDraft) : [];

/** Drafts waiting for this folder. An unreachable or older service means none. */
export const fetchDrafts = async (directory: string): Promise<Draft[]> => {
  const reply = await api(host, 'GET', '/drafts', { query: { directory }, name: 'Linear+' });
  return reply.ok === false ? [] : parseDrafts(reply);
};

/** Posts the comment through the host's Linear connection, then tells the service it is done. */
export const postDraft = async (draft: Draft, body: string): Promise<void> => {
  const found = await gql<IssuesByIdentifierResult>(issuesByIdentifier([draft.identifier]));
  const issue = Object.values(found).find((row) => row !== null);
  if (!issue) throw new Error(`${draft.identifier} was not found in Linear.`);
  await addComment(issue, body);
  await api(host, 'POST', '/drafts', { body: { id: draft.id, action: 'posted' }, name: 'Linear+' });
};

export const discardDraft = async (draft: Draft): Promise<boolean> => {
  const reply = await api(host, 'POST', '/drafts', { body: { id: draft.id, action: 'discard' }, name: 'Linear+' });
  return reply.ok !== false;
};

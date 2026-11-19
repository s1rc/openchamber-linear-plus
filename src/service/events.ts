// Reading a session event: which Linear issues the session is tied to, the finish-comment draft and the
// plan to build candidate it can leave. Pure.
import type { GuestSessionLinkedItem } from '@openchamber/sdk';
import type { Draft, Handoff } from './types.ts';

const ISSUE_URL = /linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i;
const KEY = /^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/;
/** Sessions this extension starts carry a `guest` entry with this id prefix (read from the host's own client). */
const OWN_ID = /^guest:linear-dashboard:(.+)$/;

export const REPLY_LIMIT = 4_000;
export const DRAFTS_MAX = 50;
export const HANDOFFS_MAX = 30;
export const DRAFT_MAX_AGE_MS = 14 * 86_400_000;

/**
 * The Linear issues a session is linked to, in link order, upper-cased and without repeats. A link counts when
 * the host's own Linear names it (`provider: 'linear'`), when this extension made it (`guest:linear-dashboard:`),
 * when it is the older `linear:KEY` id, or when its address is a Linear issue page.
 */
export const linearIssuesOf = (linked: readonly GuestSessionLinkedItem[]): string[] => {
  const found: string[] = [];
  const add = (value: string | undefined) => {
    const key = value?.trim().toUpperCase();
    if (key && KEY.test(key) && !found.includes(key)) found.push(key);
  };
  for (const item of linked) {
    if (item.provider === 'linear') add(item.identifier);
    const own = OWN_ID.exec(item.id);
    if (own) add(item.identifier ?? own[1]);
    const legacy = /^linear:(.+)$/i.exec(item.id);
    if (legacy) add(legacy[1]);
    add(ISSUE_URL.exec(item.url)?.[1]);
  }
  return found;
};

export const draftBody = (title: string | null, reply: string): string => {
  const text = reply.trim();
  const cut = text.length > REPLY_LIMIT ? `${text.slice(0, REPLY_LIMIT).trimEnd()}\n\n[cut]` : text;
  return `**OpenChamber session: ${title?.trim() || 'untitled'}**\n\n${cut}`;
};

export const draftId = (sessionId: string, identifier: string): string => `${sessionId}:${identifier}`;

export type DraftInput = { directory: string; sessionId: string; identifier: string; title: string | null; reply: string; now: number };

/** One finish-comment draft, or null when the agent said nothing. */
export const buildDraft = (input: DraftInput): Draft | null => {
  if (!input.reply.trim()) return null;
  return {
    id: draftId(input.sessionId, input.identifier),
    directory: input.directory,
    sessionId: input.sessionId,
    identifier: input.identifier,
    sessionTitle: input.title?.trim() || 'Untitled session',
    body: draftBody(input.title, input.reply),
    createdAt: input.now,
  };
};

/** Adds a draft, replacing an older one for the same session and issue, and keeps the list short and fresh. */
export const upsertDraft = (drafts: readonly Draft[], draft: Draft, now: number): Draft[] =>
  [...drafts.filter((d) => d.id !== draft.id && now - d.createdAt < DRAFT_MAX_AGE_MS), draft].slice(-DRAFTS_MAX);

export const upsertHandoff = (handoffs: readonly Handoff[], handoff: Handoff): Handoff[] =>
  [...handoffs.filter((h) => h.id !== handoff.id), handoff].slice(-HANDOFFS_MAX);

/** Whether a reply reads like a plan: long enough, laid out in steps or sections, and calling itself a plan. */
export const looksLikePlan = (reply: string): boolean => {
  const text = reply.trim();
  if (text.length < 500) return false;
  const structure = text.split('\n').filter((line) => /^\s*(#{1,4}\s|\d+[.)]\s|[-*]\s)/.test(line)).length;
  return structure >= 4 && /\bplan\b/i.test(text);
};

export const handoffId = (sessionId: string, identifier: string): string => `${sessionId}:${identifier}`;

/**
 * A reply without the display blocks an agent drew in it (the card it was asked to end the plan with). They are for
 * the chat: written into an issue or sent to a build session they would only be noise.
 */
export const withoutBlocks = (reply: string): string => reply.replace(/```openui-lang[\s\S]*?```/g, '').replace(/\n{3,}/g, '\n\n').trim();

export const PLANS_KEPT = 10;

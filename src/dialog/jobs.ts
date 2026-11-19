// What each Create Linear issue action drafts from: the prompt for the Small Model, a line saying
// what the draft is from, and what the form starts with when no draft comes.
import type { GuestItem } from '@openchamber/sdk';
import {
  clip, diffPrompt, ensureLocation, lineRange, locationLine, messagePrompt, selectionPrompt, sessionPrompt, snippetOf, type Draft,
} from '../shared/draft.ts';

export type Built = {
  /** Null when there is nothing to draft from; `note` then says why. */
  prompt: string | null;
  note?: string;
};

export type Job = {
  key: string;
  /** "From a reply by the assistant", shown above the form. */
  source: string;
  /** A short quote of the text, when there is one. */
  quote: string | null;
  /** What the title and description start as before any draft. */
  initial?: Partial<Draft>;
  build: () => Promise<Built>;
  /** Puts the finishing touches on a draft. */
  finish: (draft: Draft) => Draft;
};

export type JobDeps = {
  /** UTF-8 text of a file in the open project, or null when it cannot be read. */
  readFile: (path: string) => Promise<string | null>;
  /** The open session's title, for actions whose item has none. */
  sessionTitle: string | null;
};

const keep = (draft: Draft): Draft => draft;

const quoteOf = (text: string): string | null => {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat ? (flat.length > 160 ? `${flat.slice(0, 157).trimEnd()}…` : flat) : null;
};

const NOTHING_TO_DRAFT = 'There is no text to draft from, so the form starts empty.';

/** The job for an item the Create Linear issue actions open the dialog with; null for any other item. */
/** The session menu entry that starts a build from the plan in that session. */
export const BUILD_ACTION = 'build-from-plan';

export const jobFor = (item: GuestItem | null, deps: JobDeps): Job | null => {
  if (!item || !('kind' in item)) return null;
  if (item.kind === 'message' && item.action !== 'comment-on-issue') {
    return {
      key: `message:${item.messageId}`,
      source: item.role === 'user' ? 'From a message you sent' : 'From a reply by the assistant',
      quote: quoteOf(item.text),
      build: async () => (item.text.trim() ? { prompt: messagePrompt(item.text, item.role, item.sessionTitle) } : { prompt: null, note: NOTHING_TO_DRAFT }),
      finish: keep,
    };
  }
  if (item.kind === 'selection') {
    return {
      key: `selection:${item.messageId}:${item.text.length}`,
      source: 'From the text you selected',
      quote: quoteOf(item.text),
      build: async () => (item.text.trim() ? { prompt: selectionPrompt(item.text, deps.sessionTitle) } : { prompt: null, note: NOTHING_TO_DRAFT }),
      finish: keep,
    };
  }
  if (item.kind === 'session' && item.action !== BUILD_ACTION) {
    const messages = item.messages ?? [];
    return {
      key: `session:${item.sessionId}`,
      source: messages.length ? `From this chat (${messages.length} ${messages.length === 1 ? 'message' : 'messages'})` : 'From this chat',
      quote: null,
      build: async () => (messages.length
        ? { prompt: sessionPrompt(messages.map((m) => ({ role: m.role, text: m.text })), item.sessionTitle) }
        : { prompt: null, note: 'OpenChamber did not hand over the messages of this chat, so the form starts empty.' }),
      finish: keep,
    };
  }
  if (item.kind === 'diff') {
    const { path, startLine, endLine } = item;
    return {
      key: `diff:${path}:${startLine}:${endLine}`,
      source: `From ${path}, line${startLine === endLine ? '' : 's'} ${lineRange(startLine, endLine)}`,
      quote: null,
      initial: { description: locationLine(path, startLine, endLine) },
      build: async () => {
        const content = await deps.readFile(path);
        const snippet = content === null ? null : snippetOf(content, startLine, endLine);
        return { prompt: diffPrompt(path, startLine, endLine, snippet, item.side === 'deletions') };
      },
      finish: (draft) => ({ ...draft, description: ensureLocation(draft.description, path, startLine, endLine) }),
    };
  }
  return null;
};

/** The comment text for "Comment on Linear issue": the message, headed with the session it came from. */
export const commentBody = (sessionTitle: string, text: string): string =>
  `**OpenChamber session: ${sessionTitle}**\n\n${clip(text.trim(), 20_000)}`;

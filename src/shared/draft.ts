// Drafting an issue with the Small Model: the prompts for each action, and a tolerant reader for the
// answer. Pure, so it runs under `bun test`; the host call itself is in generate.ts.

export type Draft = { title: string; description: string };

/** The most the prompt may hold. The host allows 64,000 characters for prompt and the rest is margin. */
export const PROMPT_MAX = 60_000;
const MESSAGE_MAX = 8_000;
const SNIPPET_MAX = 30_000;
const TITLE_MAX = 200;

export const DRAFT_SYSTEM = [
  'You write issues for Linear, a tracker used by software teams.',
  'Answer with one JSON object and nothing else: {"title": string, "description": string}.',
  'The title is one short line (under 80 characters) that says what needs doing, in plain words.',
  'The description is Markdown: what is wrong or wanted, why it matters when the text says so, and any detail a teammate needs. Use short paragraphs or bullet points. Quote error text and names exactly.',
  'Use only what the text contains. Do not invent causes, owners or dates. Use plain punctuation: no dashes as punctuation.',
].join('\n');

/** Keeps the start of long text, with a note that the rest is left out. */
export const clip = (text: string, max: number): string => (text.length <= max ? text : `${text.slice(0, Math.max(0, max - 10))}\n[cut]`);

export type Role = 'user' | 'assistant';

export const messagePrompt = (text: string, role: Role, sessionTitle: string): string =>
  `Draft a Linear issue from this ${role === 'user' ? 'message I sent' : 'reply from the coding assistant'} in the session "${sessionTitle}".\n\n<text>\n${clip(text.trim(), PROMPT_MAX - 400)}\n</text>`;

export const selectionPrompt = (text: string, sessionTitle: string | null): string =>
  `Draft a Linear issue from this text, which I selected in ${sessionTitle ? `the session "${sessionTitle}"` : 'a coding session'}.\n\n<text>\n${clip(text.trim(), PROMPT_MAX - 400)}\n</text>`;

export type ChatMessage = { role: Role; text: string };

/**
 * The conversation, oldest first, trimmed to the prompt limit by dropping the oldest messages. Each message is
 * clipped first, so one long reply cannot push out the rest of the conversation.
 */
export const sessionPrompt = (messages: readonly ChatMessage[], sessionTitle: string): string => {
  const head = `Draft a Linear issue from this conversation between me and a coding assistant, in the session "${sessionTitle}". Capture the problem or the task the conversation ended on, not every step.\n\n`;
  const budget = PROMPT_MAX - head.length - 200;
  const lines: string[] = [];
  let used = 0;
  let dropped = false;
  for (let at = messages.length - 1; at >= 0; at -= 1) {
    const message = messages[at]!;
    const text = message.text.trim();
    if (!text) continue;
    const line = `[${message.role}]\n${clip(text, MESSAGE_MAX)}`;
    if (used + line.length + 2 > budget) {
      if (!lines.length) lines.push(`[${message.role}]\n${clip(text, budget - 20)}`);
      dropped = true;
      break;
    }
    lines.unshift(line);
    used += line.length + 2;
  }
  return `${head}<conversation>\n${dropped ? '[earlier messages left out]\n\n' : ''}${lines.join('\n\n')}\n</conversation>`;
};

export type Snippet = { text: string; from: number; to: number };

/** The selected lines (1-based, inclusive) plus `context` lines on each side. */
export const snippetOf = (content: string, startLine: number, endLine: number, context = 5): Snippet => {
  const lines = content.split('\n');
  const first = Math.max(1, Math.min(startLine, endLine));
  const last = Math.min(lines.length, Math.max(startLine, endLine));
  const from = Math.max(1, first - context);
  const to = Math.min(lines.length, last + context);
  return { text: lines.slice(from - 1, to).join('\n'), from, to };
};

export const lineRange = (startLine: number, endLine: number): string => {
  const first = Math.min(startLine, endLine);
  const last = Math.max(startLine, endLine);
  return first === last ? `${first}` : `${first}-${last}`;
};

export const locationLine = (path: string, startLine: number, endLine: number): string => `Location: \`${path}:${lineRange(startLine, endLine)}\``;

/** Adds the file and lines to a description that does not name the file. */
export const ensureLocation = (description: string, path: string, startLine: number, endLine: number): string => {
  const text = description.trim();
  if (text.includes(path)) return text;
  const location = locationLine(path, startLine, endLine);
  return text ? `${text}\n\n${location}` : location;
};

export const diffPrompt = (path: string, startLine: number, endLine: number, snippet: Snippet | null, removedSide: boolean): string => {
  const where = `File: ${path}\nSelected lines: ${lineRange(startLine, endLine)}`;
  if (!snippet) return `Draft a Linear issue about a change to a file in my project. I could not read the file, so describe only where it is.\n\n${where}`;
  const note = removedSide ? ' The selection is on the removed side of a diff, so the lines below are the current file and may differ.' : '';
  return [
    `Draft a Linear issue about the lines I selected in a file of my project.${note} Say in the description which file and lines it concerns.`,
    '',
    `${where} (the snippet shows lines ${snippet.from} to ${snippet.to})`,
    '',
    '<code>',
    clip(snippet.text, SNIPPET_MAX),
    '</code>',
  ].join('\n');
};

/** Newlines inside JSON strings are not valid JSON, but models write them. Escapes the ones inside strings only. */
const escapeStringNewlines = (json: string): string => {
  let out = '';
  let inString = false;
  let escaped = false;
  for (const ch of json) {
    if (inString) {
      if (escaped) { escaped = false; out += ch; continue; }
      if (ch === '\\') { escaped = true; out += ch; continue; }
      if (ch === '"') { inString = false; out += ch; continue; }
      if (ch === '\n') { out += '\\n'; continue; }
      if (ch === '\r') continue;
      if (ch === '\t') { out += '\\t'; continue; }
      out += ch;
    } else {
      if (ch === '"') inString = true;
      out += ch;
    }
  }
  return out;
};

const parseObject = (json: string): Record<string, unknown> | null => {
  for (const candidate of [json, escapeStringNewlines(json)]) {
    try {
      const value: unknown = JSON.parse(candidate);
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) return value as Record<string, unknown>;
    } catch { /* try the repaired text */ }
  }
  return null;
};

/** Reads the model's answer: the JSON object, with or without a code fence or words around it. */
export const parseDraft = (answer: string): Draft | null => {
  const start = answer.indexOf('{');
  const end = answer.lastIndexOf('}');
  if (start < 0 || end <= start) return null;
  const object = parseObject(answer.slice(start, end + 1));
  if (!object || typeof object.title !== 'string') return null;
  const title = object.title.replace(/\s+/g, ' ').trim().slice(0, TITLE_MAX);
  if (!title) return null;
  const description = typeof object.description === 'string' ? object.description.trim() : '';
  return { title, description };
};

export type DraftOutcome =
  | { kind: 'draft'; draft: Draft }
  /** No Small Model is set up in OpenChamber. The form opens empty. */
  | { kind: 'no-model' }
  | { kind: 'failed'; message: string };

/** What a failed `generate` means for the form. `code` is the host's error code. */
export const outcomeOfError = (code: string | undefined, message: string): DraftOutcome => {
  if (code === 'NO_MODEL') return { kind: 'no-model' };
  if (code === 'NOT_GRANTED') return { kind: 'failed', message: 'This extension is not allowed to use the Small Model. Approve it in Settings, Extensions.' };
  if (code === 'HOST_TIMEOUT') return { kind: 'failed', message: 'The Small Model took too long to answer.' };
  return { kind: 'failed', message: message || 'The Small Model could not draft the issue.' };
};

export const outcomeOfAnswer = (answer: string): DraftOutcome => {
  const draft = parseDraft(answer);
  return draft ? { kind: 'draft', draft } : { kind: 'failed', message: 'The Small Model answered, but its answer could not be read.' };
};

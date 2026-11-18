// Arguments of the chat blocks. A model writes them, and text from a web page or an issue can steer a
// model, so nothing here is trusted: identifiers are checked against a strict pattern, text is cut to
// a length, and everything is drawn as text. The only things a block does with them are a read-only
// lookup by key and, on a click, whatever that click is for.

/** A Linear issue identifier: a team key of 1 to 7 letters, a dash, a number. */
export const IDENTIFIER = /^[A-Za-z]{1,7}-\d+$/;

/** The most issues one block shows. A longer list is cut, with a note. */
export const MAX_BLOCK_ISSUES = 25;

const MAX_NUMBER_DIGITS = 9;
const MAX_TITLE = 160;
const MAX_QUESTION = 400;
const MAX_SKIPPED_SHOWN = 3;

/** `eng-123` as `ENG-123`, or null when the text is not an identifier. */
export const parseIdentifier = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  if (!IDENTIFIER.test(text)) return null;
  if (text.slice(text.indexOf('-') + 1).length > MAX_NUMBER_DIGITS) return null;
  return text.toUpperCase();
};

export type SplitIds = {
  /** Valid identifiers, upper case, without repeats, in the order given. */
  ids: string[];
  /** Pieces that are not identifiers, shortened, as the model wrote them. */
  skipped: string[];
  /** Valid identifiers left out because the block shows at most `MAX_BLOCK_ISSUES`. */
  cut: number;
};

/** Splits the `ids` argument: identifiers separated by commas, with spaces or new lines tolerated. */
export const splitIds = (value: unknown): SplitIds => {
  const raw = typeof value === 'string' ? value : Array.isArray(value) ? value.filter((v) => typeof v === 'string').join(',') : '';
  const ids: string[] = [];
  const skipped: string[] = [];
  let cut = 0;
  for (const piece of raw.split(/[,;\s]+/)) {
    if (!piece) continue;
    const id = parseIdentifier(piece);
    if (!id) {
      if (skipped.length < MAX_SKIPPED_SHOWN && !skipped.includes(piece.slice(0, 24))) skipped.push(piece.slice(0, 24));
      continue;
    }
    if (ids.includes(id)) continue;
    if (ids.length >= MAX_BLOCK_ISSUES) cut += 1;
    else ids.push(id);
  }
  return { ids, skipped, cut };
};

/** Text for a heading: a string, on one line, cut to `max` characters. Empty when it is not a string. */
export const blockText = (value: unknown, max: number): string => {
  if (typeof value !== 'string') return '';
  const text = value.replace(/\s+/g, ' ').trim();
  return text.length > max ? `${text.slice(0, max - 3).trimEnd()}...` : text;
};

export const blockTitle = (value: unknown): string => blockText(value, MAX_TITLE);
export const blockQuestion = (value: unknown): string => blockText(value, MAX_QUESTION);

/** The IssueFilter that finds identifiers by team key and number: one clause per team. */
export const keysFilter = (ids: readonly string[]): { or: Record<string, unknown>[] } => {
  const byTeam = new Map<string, number[]>();
  for (const id of ids) {
    const [key, number] = id.split('-') as [string, string];
    const list = byTeam.get(key) ?? [];
    list.push(Number(number));
    byTeam.set(key, list);
  }
  return { or: [...byTeam].map(([key, numbers]) => ({ team: { key: { eqIgnoreCase: key } }, number: { in: numbers } })) };
};

/** How full each started state's pie is, as the dashboard draws it: the n-th of k states is n/(k+1). */
export const startedFills = (states: readonly { id: string; position: number; team: { id: string } }[]): Map<string, number> => {
  const byTeam = new Map<string, { id: string; position: number }[]>();
  for (const state of states) {
    const list = byTeam.get(state.team.id) ?? [];
    list.push(state);
    byTeam.set(state.team.id, list);
  }
  const fills = new Map<string, number>();
  for (const list of byTeam.values()) {
    list.sort((a, b) => a.position - b.position);
    list.forEach((state, at) => fills.set(state.id, (at + 1) / (list.length + 1)));
  }
  return fills;
};

/** What a pick answers the agent with. */
export const pickAnswer = (issue: { identifier: string; title: string }): string => `${issue.identifier} ${issue.title}`.slice(0, 1900);

/** The identifier at the start of an answer, when the answer is a pick. */
export const answeredIdentifier = (answered: string | null): string | null => {
  const first = answered?.trim().split(/\s+/, 1)[0];
  return parseIdentifier(first);
};

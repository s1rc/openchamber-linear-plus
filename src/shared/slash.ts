// The slash commands that draw a Linear block: /linear-issue, /linear-list and /linear-pick. The composer lists them
// when you type `/`, so nobody has to remember the block names. Each answers with a chip whose text tells the agent
// to put one block in its reply. Pure rules here; the frame that answers the host is src/background/main.ts.
//
// What can follow a command (the composer completes only the command name, so the matching happens on send):
//   /linear-issue INF-4399      a key
//   /linear-issue 4399          a number: found in the folder's teams, else teams you work in, else anywhere
//   /linear-issue infisical     words: Linear's search, the top hit
//   /linear-list [keys] [heading]   keys or numbers; with none, the agent picks the issues itself
//   /linear-pick [keys] [question]  the same, and the answer goes back to the agent
import { blockText, MAX_BLOCK_ISSUES, parseIdentifier } from './block-args.ts';

export const SLASH_COMMANDS = [
  { name: 'linear-issue', description: 'Show an issue card: /linear-issue ENG-123, a number, or words' },
  { name: 'linear-list', description: 'Show a list of issues: /linear-list [ENG-1 ENG-2] [heading]' },
  { name: 'linear-pick', description: 'Ask which issue: /linear-pick [ENG-1 ENG-2] [question]' },
] as const;

export type SlashChip = { id: string; title: string; text: string };

export class SlashError extends Error {}

/** An issue a number or words found. */
export type Match = { key: string; title: string };

/** How a command finds issues it was not given a key for. Each answers best-first. */
export type Lookup = {
  /** Issues with this number, from the nearest place that has any (this folder's teams, your teams, anywhere). */
  number: (n: number) => Promise<Match[]>;
  /** Linear's search for some words. */
  search: (term: string) => Promise<Match[]>;
};

const MAX_NUMBER_DIGITS = 9;

type Parsed = { keys: string[]; numbers: number[]; words: string };

/** Keys and bare numbers first (anywhere in the text), the other words as text. */
const parse = (args: string): Parsed => {
  const keys: string[] = [];
  const numbers: number[] = [];
  const rest: string[] = [];
  for (const token of args.split(/[\s,;]+/).filter(Boolean)) {
    const key = parseIdentifier(token);
    if (key) { if (!keys.includes(key)) keys.push(key); continue; }
    if (/^#?\d{1,9}$/.test(token) && token.replace('#', '').length <= MAX_NUMBER_DIGITS) {
      const n = Number(token.replace('#', ''));
      if (!numbers.includes(n)) numbers.push(n);
      continue;
    }
    rest.push(token);
  }
  return { keys, numbers, words: rest.join(' ') };
};

/** A string that is safe inside a double quoted openui-lang argument. */
const quoted = (value: string, max: number, fallback: string): string => {
  const text = blockText(value.replace(/["\\`]/g, ''), max);
  return JSON.stringify(text || fallback);
};

const FENCE = '```';
const block = (program: string): string => `${FENCE}openui-lang\n${program}\n${FENCE}`;
const lead = 'The user asked for a Linear block.';

const label = (m: Match) => `${m.key} ${m.title.length > 50 ? `${m.title.slice(0, 47)}...` : m.title}`;

/** One key for a number, or an error that lists what it could be. */
const keyForNumber = async (n: number, lookup: Lookup): Promise<string> => {
  const found = await lookup.number(n);
  if (found.length === 0) throw new SlashError(`No issue numbered ${n} was found.`);
  if (found.length > 1) throw new SlashError(`${n} matches ${found.slice(0, 4).map(label).join('; ')}. Type the full key.`);
  return found[0]!.key;
};

/** The chip a slash command answers with. Throws SlashError, whose message the user reads, when the input is not usable. */
export const resolveSlash = async (command: string, args: string, lookup: Lookup): Promise<SlashChip> => {
  const { keys, numbers, words } = parse(args);

  if (command === 'linear-issue') {
    let key = keys[0];
    if (!key && numbers.length > 0) key = await keyForNumber(numbers[0]!, lookup);
    if (!key) {
      const term = words.trim();
      if (!term) throw new SlashError('Give an issue key, a number or some words, for example /linear-issue ENG-123.');
      const hit = (await lookup.search(term))[0];
      if (!hit) throw new SlashError(`No issue matches "${blockText(term, 60)}". Try its key.`);
      key = hit.key;
    }
    return { id: `slash-issue-${key}`, title: `Card: ${key}`, text: `${lead} Put exactly this block in your reply, unchanged, then carry on with what they wrote:\n\n${block(`root = Stack([card])\ncard = LinearIssue("${key}")`)}` };
  }

  if (command === 'linear-list' || command === 'linear-pick') {
    const all = [...keys];
    for (const n of numbers) {
      const key = await keyForNumber(n, lookup);
      if (!all.includes(key)) all.push(key);
    }
    const shown = all.slice(0, MAX_BLOCK_ISSUES);
    const pick = command === 'linear-pick';
    const name = pick ? 'LinearPickIssue' : 'LinearIssueList';
    const text = pick ? quoted(words, 400, 'Which issue?') : quoted(words, 160, 'Linear issues');
    const root = pick ? 'pick' : 'list';
    if (shown.length > 0) {
      const ids = JSON.stringify(shown.join(','));
      return {
        id: `slash-${root}-${shown.join('-')}`,
        title: pick ? `Pick: ${shown.join(', ')}` : `List: ${shown.length} ${shown.length === 1 ? 'issue' : 'issues'}`,
        text: `${lead} Put exactly this block in your reply, unchanged, then carry on with what they wrote:\n\n${block(`root = Stack([${root}])\n${root} = ${name}(${text}, ${ids})`)}`,
      };
    }
    // No keys: the agent chooses the issues from the conversation and its Linear context, as it would for a typed request.
    const what = pick ? 'a question to choose one of some issues' : 'a list of issues';
    const where = words.trim() ? ` The ${pick ? 'question' : 'heading'} is ${text}.` : '';
    return {
      id: `slash-${root}-agent`,
      title: pick ? 'Pick an issue' : 'List of issues',
      text: `${lead} They want ${what}, and gave no keys.${where} Choose the real issues that fit what they are asking (from this conversation and your Linear context), then put a block like this in your reply, with the keys you chose in place of <keys>:\n\n${block(`root = Stack([${root}])\n${root} = ${name}(${text}, "<keys, comma separated>")`)}\n\nUse only keys you know exist. If none fit, say so instead of guessing.`,
    };
  }

  throw new SlashError(`This extension has no /${command.slice(0, 40)} command.`);
};

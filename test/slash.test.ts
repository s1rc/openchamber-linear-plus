import { describe, expect, test } from 'bun:test';
import { resolveSlash, SLASH_COMMANDS, SlashError, type Lookup, type Match } from '../src/shared/slash.ts';

const issues: Record<number, Match[]> = {
  4399: [{ key: 'INF-4399', title: 'Create the Influencer Infisical project' }],
  21: [{ key: 'APPSEC-21', title: 'Harden identity' }, { key: 'CR-21', title: 'Recruiting thing' }],
};
const lookup: Lookup = {
  number: async (n) => issues[n] ?? [],
  search: async (term) => (term.includes('infisical') ? [{ key: 'INF-4399', title: 'Create the Influencer Infisical project' }, { key: 'INF-1', title: 'x' }] : []),
};
const run = (command: string, args: string) => resolveSlash(command, args, lookup);

describe('/linear-issue', () => {
  test('a key', async () => {
    const chip = await run('linear-issue', ' inf-4399 ');
    expect(chip.title).toBe('Card: INF-4399');
    expect(chip.text).toContain('card = LinearIssue("INF-4399")');
  });

  test('a number is looked up, with or without #', async () => {
    expect((await run('linear-issue', '4399')).text).toContain('LinearIssue("INF-4399")');
    expect((await run('linear-issue', '#4399')).text).toContain('LinearIssue("INF-4399")');
  });

  test('a number in several teams is an error that lists them', async () => {
    await expect(run('linear-issue', '21')).rejects.toThrow('21 matches APPSEC-21 Harden identity; CR-21 Recruiting thing. Type the full key.');
  });

  test('a number nobody has, and words nothing matches, say so', async () => {
    await expect(run('linear-issue', '99999')).rejects.toThrow('No issue numbered 99999 was found.');
    await expect(run('linear-issue', 'zzz qqq')).rejects.toThrow('No issue matches "zzz qqq"');
  });

  test('words use the top search hit', async () => {
    expect((await run('linear-issue', 'infisical project')).text).toContain('LinearIssue("INF-4399")');
  });

  test('nothing to go on says what to type', async () => {
    await expect(run('linear-issue', '')).rejects.toThrow('/linear-issue ENG-123');
  });
});

describe('/linear-list and /linear-pick', () => {
  test('a list takes keys in any separator and the rest as its heading', async () => {
    const chip = await run('linear-list', 'inf-1, APPSEC-2 nil-3 Open work');
    expect(chip.text).toContain('list = LinearIssueList("Open work", "INF-1,APPSEC-2,NIL-3")');
    expect(chip.title).toBe('List: 3 issues');
  });

  test('numbers are looked up and joined with the keys', async () => {
    expect((await run('linear-list', 'INF-1 4399 Mine')).text).toContain('LinearIssueList("Mine", "INF-1,INF-4399")');
  });

  test('a pick takes a question, and a default when there is none', async () => {
    expect((await run('linear-pick', 'INF-1 INF-2 Which one first?')).text).toContain('LinearPickIssue("Which one first?", "INF-1,INF-2")');
    expect((await run('linear-pick', 'INF-1')).text).toContain('LinearPickIssue("Which issue?", "INF-1")');
  });

  test('keys after the words still count', async () => {
    expect((await run('linear-pick', 'Which of INF-1 or INF-2')).text).toContain('LinearPickIssue("Which of or", "INF-1,INF-2")');
  });

  test('no key is fine: the agent is told to choose the issues, with the heading or question', async () => {
    const list = await run('linear-list', 'what I am working on');
    expect(list.title).toBe('List of issues');
    expect(list.text).toContain('gave no keys');
    expect(list.text).toContain('The heading is "what I am working on".');
    expect(list.text).toContain('LinearIssueList("what I am working on", "<keys, comma separated>")');
    const pick = await run('linear-pick', '');
    expect(pick.text).toContain('LinearPickIssue("Which issue?", "<keys, comma separated>")');
    expect(pick.text).not.toContain('The question is');
  });

  test('a number in several teams stops the list with the same error', async () => {
    await expect(run('linear-list', '21')).rejects.toThrow('21 matches');
  });

  test('quotes, backslashes and fences in the words cannot break out of the block', async () => {
    const chip = await run('linear-list', 'INF-1 say "hi" \\ ``` end');
    expect(chip.text).toContain('LinearIssueList("say hi end", "INF-1")');
    expect(chip.text.match(/```/g)?.length).toBe(2);
  });
});

test('an unknown command is refused', async () => {
  await expect(run('linear-nope', 'INF-1')).rejects.toBeInstanceOf(SlashError);
});

test('the manifest lists exactly these commands', async () => {
  const manifest = (await Bun.file('package.json').json()).openchamber.contributes;
  expect(manifest.commands.map((c: { name: string }) => c.name)).toEqual(SLASH_COMMANDS.map((c) => c.name));
  expect(manifest.commands.map((c: { description: string }) => c.description)).toEqual(SLASH_COMMANDS.map((c) => c.description));
});

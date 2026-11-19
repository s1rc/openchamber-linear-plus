import { describe, expect, test } from 'bun:test';
import { parseJsonc, readChoices, type ChoicesIo } from '../src/service/choices.ts';
import { DEFAULT_ID, parseChoices, withSaved } from '../src/shared/choices-rules.ts';

const catalogue = JSON.stringify({
  anthropic: { name: 'Anthropic', models: { 'claude-sonnet-4-5': { name: 'Claude Sonnet 4.5' }, 'claude-old': { name: 'Claude Old', status: 'deprecated' } } },
  'fireworks-ai': { name: 'Fireworks AI', models: { 'accounts/fireworks/models/kimi-k3': { name: 'Kimi K3' }, 'accounts/fireworks/models/qwen': { name: 'Qwen' } } },
  other: { name: 'Other', models: { x: { name: 'Not signed in' } } },
});

const io = (files: Record<string, string>, extra: Partial<ChoicesIo> = {}): ChoicesIo => ({
  read: (path) => files[path] ?? null,
  list: (dir) => Object.keys(files).filter((p) => p.startsWith(`${dir}/`) && !p.slice(dir.length + 1).includes('/')).map((p) => p.slice(dir.length + 1)),
  configDir: '/cfg',
  signedIn: ['anthropic', 'fireworks-ai'],
  catalogue: () => catalogue,
  ...extra,
});

describe('parseJsonc', () => {
  test('comments, trailing commas and urls inside strings', () => {
    const value = parseJsonc('{\n // a comment\n "url": "https://x.dev/a//b", /* block */ "list": [1, 2,],\n}');
    expect(value).toEqual({ url: 'https://x.dev/a//b', list: [1, 2] });
  });
  test('junk and null are an empty object', () => {
    expect(parseJsonc('{ nope')).toEqual({});
    expect(parseJsonc(null)).toEqual({});
    expect(parseJsonc('[1]')).toEqual({});
  });
});

describe('readChoices agents', () => {
  test('build and plan always, in that order', () => {
    expect(readChoices(io({}), null).agents.map((a) => a.id)).toEqual(['build', 'plan']);
  });
  test('agent files and config entries are added, subagents and disabled ones are not', () => {
    const files = {
      '/cfg/agents/ship.md': '---\ndescription: Ships\nmode: primary\n---\nbody',
      '/cfg/agents/helper.md': '---\nmode: subagent\n---\n',
      '/cfg/agents/off.md': '---\ndisable: true\n---\n',
      '/cfg/agents/notes.txt': 'not an agent',
      '/cfg/opencode.json': JSON.stringify({ agent: { review: { mode: 'all' }, scout: { mode: 'subagent' }, plan: { disable: true } } }),
      '/repo/.opencode/agent/local.md': 'no front matter',
    };
    const ids = readChoices(io(files), '/repo').agents.map((a) => a.id);
    expect(ids).toEqual(['build', 'review', 'ship', 'local']);
  });
});

describe('readChoices models', () => {
  test('only signed in providers, deprecated models left out, ids are provider/model', () => {
    const models = readChoices(io({}), null).models;
    expect(models.map((m) => m.id).sort()).toEqual([
      'anthropic/claude-sonnet-4-5', 'fireworks-ai/accounts/fireworks/models/kimi-k3', 'fireworks-ai/accounts/fireworks/models/qwen',
    ]);
    expect(models.find((m) => m.id === 'anthropic/claude-sonnet-4-5')).toMatchObject({ label: 'Claude Sonnet 4.5', hint: 'Anthropic' });
  });
  test('the default model comes first, even when the catalogue lacks it; a configured provider counts as signed in', () => {
    const files = { '/cfg/opencode.json': JSON.stringify({ model: 'acme/fast-1', provider: { acme: { models: { 'fast-1': { name: 'Acme Fast' }, slow: {} } } } }) };
    const result = readChoices(io(files, { signedIn: [] }), null);
    expect(result.defaultModel).toBe('acme/fast-1');
    expect(result.models[0]).toMatchObject({ id: 'acme/fast-1', label: 'Acme Fast' });
    expect(result.models.map((m) => m.id)).toContain('acme/slow');
  });
  test('an unreadable catalogue still lists the default model', () => {
    const result = readChoices(io({ '/cfg/opencode.json': '{"model":"a/b"}' }, { catalogue: () => '{ not json' }), null);
    expect(result.models.map((m) => m.id)).toEqual(['a/b']);
  });
  test('a project config overrides the default model', () => {
    const files = { '/cfg/opencode.json': '{"model":"a/one"}', '/repo/opencode.json': '{"model":"a/two"}' };
    expect(readChoices(io(files), '/repo').defaultModel).toBe('a/two');
  });
});

describe('the frame side', () => {
  test('parseChoices keeps good rows and refuses a failed or odd answer', () => {
    expect(parseChoices({ ok: true, agents: [{ id: 'build', label: 'build' }, 1], models: [], defaultModel: 'a/b' })).toEqual({ agents: [{ id: 'build', label: 'build' }], models: [], defaultModel: 'a/b' });
    expect(parseChoices({ ok: false, error: 'x' })).toBeNull();
    expect(parseChoices({ agents: 'no' })).toBeNull();
    expect(parseChoices(null)).toBeNull();
  });
  test('withSaved puts the default first and keeps a saved value the list lacks', () => {
    const list = [{ id: 'a/b', label: 'B' }];
    expect(withSaved(list, undefined, 'Default').map((c) => c.id)).toEqual([DEFAULT_ID, 'a/b']);
    expect(withSaved(list, 'a/b', 'Default').map((c) => c.id)).toEqual([DEFAULT_ID, 'a/b']);
    expect(withSaved(list, 'x/y', 'Default').at(-1)).toMatchObject({ id: 'x/y', hint: 'saved' });
    expect(withSaved(list, '  ', 'Default').length).toBe(2);
  });
});

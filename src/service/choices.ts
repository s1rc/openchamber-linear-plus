// The agents and models Settings offers for a build, read from OpenCode's own files so nobody types a model id.
// Pure: every file read comes through `io`. Only the provider ids of OpenCode's sign-in file are read, never
// what is stored under them.
import type { ReadText } from './directories.ts';

export type Choice = { id: string; label: string; hint?: string };
export type Choices = { agents: Choice[]; models: Choice[]; defaultModel: string | null };

export type ChoicesIo = {
  read: ReadText;
  /** File names in a folder, empty when it is missing. */
  list: (directory: string) => string[];
  /** OpenCode's config folder, usually ~/.config/opencode. */
  configDir: string;
  /** Provider ids OpenCode holds a sign-in for. */
  signedIn: string[];
  /** OpenCode's model catalogue (models.json in its cache), as text. */
  catalogue: () => string | null;
};

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);

/** JSON with comments and trailing commas, as `opencode.jsonc` allows. A string is never touched. */
export const parseJsonc = (text: string | null): Record<string, unknown> => {
  if (!text) return {};
  let out = '';
  let inString = false;
  for (let i = 0; i < text.length; i += 1) {
    const c = text[i]!;
    if (inString) {
      out += c;
      if (c === '\\') { out += text[i + 1] ?? ''; i += 1; } else if (c === '"') inString = false;
    } else if (c === '"') {
      inString = true;
      out += c;
    } else if (c === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i += 1;
      out += '\n';
    } else if (c === '/' && text[i + 1] === '*') {
      i += 2;
      while (i < text.length && !(text[i] === '*' && text[i + 1] === '/')) i += 1;
      i += 1;
    } else out += c;
  }
  try {
    const value: unknown = JSON.parse(out.replace(/,(\s*[}\]])/g, '$1'));
    return isObject(value) ? value : {};
  } catch {
    return {};
  }
};

/** An agent file's `mode` and `disable` lines from its front matter. */
const frontMatter = (text: string | null): { mode: string | null; disabled: boolean } => {
  const head = text?.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] ?? '';
  const mode = head.match(/^mode:\s*["']?([A-Za-z]+)/m)?.[1] ?? null;
  const disabled = /^disable:\s*true\b/m.test(head);
  return { mode, disabled };
};

const BUILT_IN: Choice[] = [
  { id: 'build', label: 'build', hint: 'built in' },
  { id: 'plan', label: 'plan', hint: 'built in' },
];

const CONFIG_NAMES = ['opencode.json', 'opencode.jsonc'];

export const readChoices = (io: ChoicesIo, directory: string | null): Choices => {
  const folders = [io.configDir, ...(directory ? [directory, `${directory.replace(/\/+$/, '')}/.opencode`] : [])];
  const configs = folders.flatMap((folder) => CONFIG_NAMES.map((name) => parseJsonc(io.read(`${folder}/${name}`))));

  const agents = new Map<string, Choice>(BUILT_IN.map((c) => [c.id, c]));
  const addAgent = (name: string, mode: string | null, disabled: boolean) => {
    if (disabled || mode === 'subagent' || !/^[A-Za-z0-9._-]{1,64}$/.test(name)) { if (disabled || mode === 'subagent') agents.delete(name); return; }
    if (!agents.has(name)) agents.set(name, { id: name, label: name });
  };
  for (const config of configs) {
    if (!isObject(config.agent)) continue;
    for (const [name, value] of Object.entries(config.agent)) {
      const entry = isObject(value) ? value : {};
      addAgent(name, typeof entry.mode === 'string' ? entry.mode : null, entry.disable === true);
    }
  }
  for (const folder of folders) {
    for (const sub of ['agent', 'agents']) {
      for (const file of io.list(`${folder}/${sub}`)) {
        if (!file.endsWith('.md')) continue;
        const { mode, disabled } = frontMatter(io.read(`${folder}/${sub}/${file}`));
        addAgent(file.slice(0, -3), mode, disabled);
      }
    }
  }

  const defaultModel = configs.map((c) => (typeof c.model === 'string' ? c.model : null)).filter((m): m is string => m !== null).at(-1) ?? null;
  const providers = new Set<string>(io.signedIn);
  for (const config of configs) if (isObject(config.provider)) for (const id of Object.keys(config.provider)) providers.add(id);
  if (defaultModel) providers.add(defaultModel.split('/')[0]!);

  let catalogue: Record<string, unknown> = {};
  try {
    const parsed: unknown = JSON.parse(io.catalogue() ?? '{}');
    if (isObject(parsed)) catalogue = parsed;
  } catch {
    catalogue = {};
  }
  const models = new Map<string, Choice>();
  for (const provider of providers) {
    const entry = catalogue[provider];
    const providerName = isObject(entry) && typeof entry.name === 'string' ? entry.name : provider;
    const list = isObject(entry) && isObject(entry.models) ? entry.models : {};
    for (const [key, value] of Object.entries(list)) {
      const model = isObject(value) ? value : {};
      if (model.status === 'deprecated') continue;
      models.set(`${provider}/${key}`, { id: `${provider}/${key}`, label: typeof model.name === 'string' ? model.name : key, hint: providerName });
    }
    for (const config of configs) {
      const own = isObject(config.provider) && isObject(config.provider[provider]) ? (config.provider[provider] as Record<string, unknown>).models : null;
      if (!isObject(own)) continue;
      for (const [key, value] of Object.entries(own)) {
        const name = isObject(value) && typeof value.name === 'string' ? value.name : key;
        models.set(`${provider}/${key}`, { id: `${provider}/${key}`, label: name, hint: providerName });
      }
    }
  }
  if (defaultModel && !models.has(defaultModel)) models.set(defaultModel, { id: defaultModel, label: defaultModel.split('/').slice(1).join('/'), hint: 'default' });
  const sorted = [...models.values()].sort((a, b) => (a.id === defaultModel ? -1 : b.id === defaultModel ? 1 : (a.hint ?? '').localeCompare(b.hint ?? '') || a.label.localeCompare(b.label)));
  return { agents: [...agents.values()], models: sorted, defaultModel };
};

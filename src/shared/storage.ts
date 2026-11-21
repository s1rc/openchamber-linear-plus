// Extension storage: folder mappings and the last view per folder.
import { api } from '@openchamber-ext/shared-ui';
import { host } from './host.ts';

export type FinishComments = 'off' | 'draft';

export type Mapping = {
  /** The folder this mapping was made for (the OpenChamber project's directory). */
  directory: string;
  linearProjectIds: string[];
  teamIds: string[];
  /** The team or project id shown first, or 'all' for every mapped one. */
  activeProjectId: string;
  finishComments: FinishComments;
  /** The agent the plan to build handoff starts; empty means `build`. */
  buildAgent?: string;
  /** `provider/model` for the build session; empty means the host's default. */
  buildModel?: string;
  /** The agent Start plan starts; empty means `plan`. */
  planAgent?: string;
  /** `provider/model` for the plan session; empty means the host's default. */
  planModel?: string;
  /** Start build adds the plan to the issue's description first. */
  postPlan?: boolean;
  /** What the build does after the code is written: `mr` (usual options, then AI review), `auto` (all of it), or off. */
  reviewMode?: 'mr' | 'auto';
  /** The AI reviewers whose comments the build handles, comma separated; empty means CodeRabbit. */
  aiReviewers?: string;
  updatedAt: number;
};

const get = async <T,>(key: string): Promise<T | null> => {
  try {
    const value = await host.storage.get(key);
    return value === undefined || value === null ? null : (value as T);
  } catch {
    return null;
  }
};

const set = async (key: string, value: unknown): Promise<boolean> => {
  try {
    await host.storage.set(key, value as never);
    return true;
  } catch {
    return false;
  }
};

const isMapping = (value: unknown): value is Mapping =>
  typeof value === 'object' && value !== null && Array.isArray((value as Mapping).linearProjectIds) && Array.isArray((value as Mapping).teamIds);

export const getMapping = async (placeKey: string): Promise<Mapping | null> => {
  const value = await get<unknown>(`map:${placeKey}`);
  return isMapping(value) ? value : null;
};

export const setMapping = async (placeKey: string, mapping: Mapping): Promise<boolean> => {
  const saved = await set(`map:${placeKey}`, mapping);
  // Awaited, so a frame that reads the service's choices right after sees this mapping.
  await syncMappingsToService();
  return saved;
};

export const deleteMapping = async (placeKey: string): Promise<void> => {
  try { await host.storage.delete(`map:${placeKey}`); } catch { /* nothing stored */ }
  void syncMappingsToService();
};

export type StoredRepo = { host: string; path: string };

/** The git remote the main checkout reported, for worktrees whose `.git/config` cannot be read. */
export const getRepo = async (placeKey: string): Promise<StoredRepo | null> => {
  const value = await get<StoredRepo>(`repo:${placeKey}`);
  return value && typeof value.host === 'string' && typeof value.path === 'string' ? value : null;
};

export const setRepo = async (placeKey: string, repo: StoredRepo): Promise<void> => {
  const current = await getRepo(placeKey);
  if (current?.host !== repo.host || current.path !== repo.path) await set(`repo:${placeKey}`, repo);
};

/** Whether Start session also moves the issue to its team's first started status. On unless turned off. */
export const getStartMoves = async (): Promise<boolean> => (await get<boolean>('pref:start-moves')) !== false;
export const setStartMoves = (on: boolean) => set('pref:start-moves', on);

/** Whether a new issue starts assigned to you. Off unless turned on in Settings; the create form can change it each time. */
export const getAssignToMe = async (): Promise<boolean> => (await get<boolean>('pref:assign-me')) === true;
export const setAssignToMe = (on: boolean) => set('pref:assign-me', on);

/** The status Start session moved an issue to last on a team, by name, so the next start offers it first. */
export const getStartState = async (teamId: string): Promise<string | null> => {
  const value = await get<string>(`pref:start-state:${teamId}`);
  return typeof value === 'string' ? value : null;
};
export const setStartState = (teamId: string, name: string) => set(`pref:start-state:${teamId}`, name);

export const getLastView = (placeKey: string) => get<string>(`view:${placeKey}`);

/** The plan and build agent and model for every folder. A pinned folder's own choice wins over these. */
export type AgentDefaults = { planAgent?: string; planModel?: string; buildAgent?: string; buildModel?: string };

const AGENT_KEYS = ['planAgent', 'planModel', 'buildAgent', 'buildModel'] as const;

export const getAgentDefaults = async (): Promise<AgentDefaults> => {
  const value = await get<Record<string, unknown>>('pref:agents');
  const out: AgentDefaults = {};
  for (const key of AGENT_KEYS) {
    const text = value?.[key];
    if (typeof text === 'string' && text.trim()) out[key] = text.trim();
  }
  return out;
};

export const setAgentDefaults = async (defaults: AgentDefaults): Promise<boolean> => {
  const saved = await set('pref:agents', defaults);
  await syncMappingsToService();
  return saved;
};

/** Hands every mapping, and the defaults for every folder, to the service, which acts on them with no window open. Best effort. */
export const syncMappingsToService = async (options: { allowEmpty?: boolean } = {}): Promise<void> => {
  let keys: string[] = [];
  try { keys = (await host.storage.keys()) ?? []; } catch { return; }
  const directories: Record<string, Mapping> = {};
  for (const key of keys.filter((k) => k.startsWith('map:'))) {
    const mapping = await get<unknown>(key);
    if (isMapping(mapping) && mapping.directory) directories[mapping.directory] = mapping;
  }
  const defaults = await getAgentDefaults();
  const hasDefaults = Object.keys(defaults).length > 0;
  // Forgetting the last folder is a change to send; a frame that merely loaded and found none has nothing to say.
  if (options.allowEmpty === false && Object.keys(directories).length === 0 && !hasDefaults) return;
  await api(host, 'PUT', '/config', { body: hasDefaults ? { directories, defaults } : { directories }, name: 'Linear+' });
};

let synced = false;

/** Once per frame load: the service starts empty after an update or a new data folder, so it hears every mapping. */
export const syncMappingsOnce = async (): Promise<void> => {
  if (synced) return;
  synced = true;
  await syncMappingsToService({ allowEmpty: false });
};

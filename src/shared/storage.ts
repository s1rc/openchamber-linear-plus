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
  void syncMappingsToService();
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

export const getLastView = (placeKey: string) => get<string>(`view:${placeKey}`);

/** Hands every mapping to the service, which acts on them with no window open. Best effort. */
export const syncMappingsToService = async (): Promise<void> => {
  let keys: string[] = [];
  try { keys = (await host.storage.keys()) ?? []; } catch { return; }
  const directories: Record<string, Mapping> = {};
  for (const key of keys.filter((k) => k.startsWith('map:'))) {
    const mapping = await get<unknown>(key);
    if (isMapping(mapping) && mapping.directory) directories[mapping.directory] = mapping;
  }
  await api(host, 'PUT', '/config', { body: { directories }, name: 'Linear' });
};

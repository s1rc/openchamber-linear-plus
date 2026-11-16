// Stale-while-revalidate cache for Linear reads, shared by every component in one frame.
import { useEffect, useState } from 'preact/hooks';

type Entry = {
  /** The latest fetcher a mounted reader gave, so a refresh can reload what is on screen. */
  fetcher?: () => Promise<unknown>;
  value?: unknown;
  error?: unknown;
  at: number;
  promise?: Promise<unknown>;
  listeners: Set<() => void>;
};

const entries = new Map<string, Entry>();
const FRESH_MS = 30_000;

const entryOf = (key: string): Entry => {
  let entry = entries.get(key);
  if (!entry) {
    entry = { at: 0, listeners: new Set() };
    entries.set(key, entry);
  }
  return entry;
};

const notify = (entry: Entry) => { for (const listener of entry.listeners) listener(); };

/** Loads `key` with `fetcher` unless a fresh value is cached or a load is already running. */
export const load = <T,>(key: string, fetcher: () => Promise<T>, force = false): Promise<T> => {
  const entry = entryOf(key);
  if (entry.promise) return entry.promise as Promise<T>;
  if (!force && entry.value !== undefined && Date.now() - entry.at < FRESH_MS) return Promise.resolve(entry.value as T);
  const promise = fetcher().then(
    (value) => { entry.value = value; entry.error = undefined; entry.at = Date.now(); return value; },
    (error: unknown) => { entry.error = error; throw error; },
  ).finally(() => { entry.promise = undefined; notify(entry); });
  entry.promise = promise;
  notify(entry);
  return promise;
};

/** Writes a value into the cache, for optimistic updates. */
export const put = <T,>(key: string, value: T) => {
  const entry = entryOf(key);
  entry.value = value;
  entry.at = Date.now();
  notify(entry);
};

/**
 * Rewrites cached values in place, for optimistic updates across every list that holds an issue.
 * `change` returns the value unchanged to leave an entry alone. Returns a function that puts back
 * what was there, for rolling back a write Linear refused.
 */
export const patchEntries = (change: (key: string, value: unknown) => unknown): (() => void) => {
  const saved: [Entry, unknown][] = [];
  for (const [key, entry] of entries) {
    if (entry.value === undefined) continue;
    const next = change(key, entry.value);
    if (next === entry.value) continue;
    saved.push([entry, entry.value]);
    entry.value = next;
    notify(entry);
  }
  return () => {
    for (const [entry, value] of saved) {
      entry.value = value;
      notify(entry);
    }
  };
};

/** Reloads one key if a mounted view reads it, else marks it stale. */
export const refreshKey = (key: string) => {
  const entry = entries.get(key);
  if (!entry) return;
  entry.at = 0;
  if (entry.listeners.size > 0 && entry.fetcher) void load(key, entry.fetcher, true).catch(() => undefined);
};

/** Marks every key starting with `prefix` stale, and reloads the ones a mounted view is reading. */
export const invalidate = (prefix: string) => {
  for (const [key, entry] of entries) {
    if (!key.startsWith(prefix)) continue;
    entry.at = 0;
    if (entry.listeners.size > 0 && entry.fetcher) void load(key, entry.fetcher, true).catch(() => undefined);
  }
};

export type QueryState<T> = { data: T | undefined; error: unknown; loading: boolean; refresh: () => void };

/** Reads `key` through the cache and re-renders when it changes. A null key loads nothing. */
export const useQuery = <T,>(key: string | null, fetcher: () => Promise<T>): QueryState<T> => {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!key) return;
    const entry = entryOf(key);
    entry.fetcher = fetcher;
    const listener = () => setTick((n) => n + 1);
    entry.listeners.add(listener);
    void load(key, fetcher).catch(() => undefined);
    return () => { entry.listeners.delete(listener); };
  }, [key]);
  const entry = key ? entries.get(key) : undefined;
  return {
    data: entry?.value as T | undefined,
    error: entry?.error,
    loading: Boolean(entry?.promise) || (key !== null && entry?.value === undefined && entry?.error === undefined),
    refresh: () => { if (key) void load(key, fetcher, true).catch(() => undefined); },
  };
};

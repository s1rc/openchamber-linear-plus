// Where the dashboard was, per folder: the view, the issue open in each list, and the chosen tabs.
// Kept in memory so switching folders and back is instant, and in extension storage so a reload of
// the panel (OpenChamber reloads it when you switch projects) lands in the same place.
import { createContext } from 'preact';
import { host } from '../shared/host.ts';
import type { Mode, ViewOptions } from '../shared/view-options.ts';
import type { Route } from './routes.ts';

/** A list's own settings: which mode it shows, and what was changed in each mode. */
export type SavedOptions = { mode: Mode; list?: Partial<ViewOptions>; board?: Partial<ViewOptions> };

export type ViewState = {
  route?: Route;
  /** Display options per list, keyed like `openIssue`. */
  options?: Record<string, SavedOptions>;
  /** Open issue per list, keyed by the list's view key (`project-issues`, `my-issues:assigned`, ...). */
  openIssue?: Record<string, string | null>;
  /** Selected tab per tabbed view (`my-issues`, `project-detail:<id>`, ...). */
  tabs?: Record<string, string>;
};

const memory = new Map<string, ViewState>();
/** The user's own defaults for lists and boards, from "Set as my default". */
let defaults: { list?: Partial<ViewOptions>; board?: Partial<ViewOptions> } = {};
let defaultsLoaded = false;
const DEFAULTS_KEY = 'ui-defaults';
let scope: 'device' | 'instance' = 'instance';

/** Device storage keeps where you were per browser profile; older hosts only have instance storage. */
export const setViewStateScope = (deviceStorage: boolean) => { scope = deviceStorage ? 'device' : 'instance'; };

const storageKey = (placeKey: string) => `ui:${placeKey}`;

const isRoute = (value: unknown): value is Route => typeof value === 'object' && value !== null && typeof (value as Route).view === 'string';

const loadDefaults = async () => {
  if (defaultsLoaded) return;
  defaultsLoaded = true;
  try {
    const value = (await host.storage.get(DEFAULTS_KEY, { scope })) as typeof defaults | undefined;
    if (value && typeof value === 'object') defaults = { list: value.list, board: value.board };
  } catch {
    // No stored defaults.
  }
};

/** Reads the folder's state into memory. Resolves once it is there, from memory or storage. */
export const loadViewState = async (placeKey: string): Promise<ViewState> => {
  await loadDefaults();
  const cached = memory.get(placeKey);
  if (cached) return cached;
  let stored: ViewState = {};
  try {
    const value = (await host.storage.get(storageKey(placeKey), { scope })) as ViewState | undefined;
    if (value && typeof value === 'object') {
      stored = {
        ...(isRoute(value.route) ? { route: value.route } : {}),
        openIssue: typeof value.openIssue === 'object' && value.openIssue ? value.openIssue : {},
        tabs: typeof value.tabs === 'object' && value.tabs ? value.tabs : {},
        options: typeof value.options === 'object' && value.options ? value.options : {},
      };
    }
  } catch {
    // Nothing stored, or storage unavailable: start fresh.
  }
  // A load for the same folder may have finished meanwhile; keep the newer one.
  const state = memory.get(placeKey) ?? stored;
  memory.set(placeKey, state);
  return state;
};

const timers = new Map<string, ReturnType<typeof setTimeout>>();

const persist = (placeKey: string) => {
  clearTimeout(timers.get(placeKey));
  timers.set(placeKey, setTimeout(() => {
    timers.delete(placeKey);
    const state = memory.get(placeKey);
    if (state) void host.storage.set(storageKey(placeKey), state as never, { scope }).catch(() => undefined);
  }, 300));
};

const update = (placeKey: string, change: (state: ViewState) => ViewState) => {
  memory.set(placeKey, change(memory.get(placeKey) ?? {}));
  persist(placeKey);
};

export const saveRoute = (placeKey: string, route: Route) => update(placeKey, (s) => ({ ...s, route }));

export const openIssueFor = (placeKey: string | null, listKey: string): string | null =>
  (placeKey ? memory.get(placeKey)?.openIssue?.[listKey] : null) ?? null;

export const saveOpenIssue = (placeKey: string | null, listKey: string, identifier: string | null) => {
  if (!placeKey) return;
  update(placeKey, (s) => ({ ...s, openIssue: { ...s.openIssue, [listKey]: identifier } }));
};

export const tabFor = (placeKey: string | null, viewKey: string): string | undefined =>
  (placeKey ? memory.get(placeKey)?.tabs?.[viewKey] : undefined);

export const saveTab = (placeKey: string | null, viewKey: string, tab: string) => {
  if (!placeKey) return;
  update(placeKey, (s) => ({ ...s, tabs: { ...s.tabs, [viewKey]: tab } }));
};

export const savedOptionsFor = (placeKey: string | null, listKey: string): SavedOptions | undefined =>
  placeKey ? memory.get(placeKey)?.options?.[listKey] : undefined;

export const saveOptions = (placeKey: string | null, listKey: string, saved: SavedOptions) => {
  if (!placeKey) return;
  update(placeKey, (s) => ({ ...s, options: { ...s.options, [listKey]: saved } }));
};

export const userDefaults = (mode: Mode): Partial<ViewOptions> | undefined => defaults[mode];

/** Stores `options` as the starting point of every list or board that has not been changed. */
export const saveUserDefaults = (mode: Mode, options: Partial<ViewOptions>) => {
  defaults = { ...defaults, [mode]: options };
  void host.storage.set(DEFAULTS_KEY, defaults as never, { scope }).catch(() => undefined);
};

/** The open folder's storage key, for views deep in the tree. Null with no folder open. */
export const PlaceKey = createContext<string | null>(null);

/** Tests only: forget memory, as a reloaded frame would. */
export const forgetViewStateMemory = () => { memory.clear(); defaults = {}; defaultsLoaded = false; };

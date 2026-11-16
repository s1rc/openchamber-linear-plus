// A note from the Work Status section to the dashboard: "open this issue" or "open the picker".
// The section cannot draw an issue, so it leaves the note in extension storage and opens the rail
// panel, which reads it when it loads or is shown again.
import { host } from './host.ts';

export type OpenTarget = {
  /** The folder the note is for (`Place.key`), so another folder's panel never acts on it. */
  placeKey: string;
  /** An issue identifier to open, or the picker. */
  issue?: string;
  view?: 'picker';
  at: number;
};

export const OPEN_TARGET_KEY = 'open-target';

/** The rail panel's surface id in OpenChamber: `ext:` and the extension id. */
export const PANEL_SURFACE = 'ext:linear-dashboard';

/** A note older than this is ignored: the panel was not opened, so it is no longer what the user wants. */
export const OPEN_TARGET_TTL_MS = 10 * 60_000;

const ID_SHAPE = /^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/;

export const parseOpenTarget = (value: unknown, placeKey: string, now = Date.now()): OpenTarget | null => {
  if (typeof value !== 'object' || value === null) return null;
  const target = value as Partial<OpenTarget>;
  if (target.placeKey !== placeKey || typeof target.at !== 'number' || now - target.at > OPEN_TARGET_TTL_MS || target.at > now + 60_000) return null;
  if (target.view === 'picker') return { placeKey, view: 'picker', at: target.at };
  if (typeof target.issue === 'string' && ID_SHAPE.test(target.issue)) return { placeKey, issue: target.issue, at: target.at };
  return null;
};

/** Reads and clears the note for this folder. Null when there is none, or it is for another folder or stale. */
export const takeOpenTarget = async (placeKey: string): Promise<OpenTarget | null> => {
  let value: unknown;
  try { value = await host.storage.get(OPEN_TARGET_KEY); } catch { return null; }
  const target = parseOpenTarget(value, placeKey);
  if (target) await host.storage.delete(OPEN_TARGET_KEY).catch(() => undefined);
  return target;
};

/**
 * Leaves the note and shows the rail panel. Resolves false when the panel could not be opened: the
 * note stays, so the panel still lands on it when the user opens it themselves.
 */
export const openInPanel = async (target: Omit<OpenTarget, 'at'>): Promise<boolean> => {
  try {
    await host.storage.set(OPEN_TARGET_KEY, { ...target, at: Date.now() } as never);
  } catch {
    return false;
  }
  try {
    await host.openSurface(PANEL_SURFACE);
    return true;
  } catch {
    return false;
  }
};

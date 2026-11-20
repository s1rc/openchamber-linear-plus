import { connectHost, type HostReadyContext } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import { useEffect, useState } from 'preact/hooks';

export const host = connectHost();

let latest: HostReadyContext | null = null;
const listeners = new Set<(ctx: HostReadyContext) => void>();

host.onReady((ctx) => {
  latest = ctx;
  applyHostReady(ctx, document.documentElement);
  for (const listener of listeners) listener(ctx);
});

// The host sends the item in its own message after `ready` (and again when it changes), and the SDK tells only
// onItem listeners about it. Without this the dialog saw an item of null and opened as the plain + menu.
host.onItem((item) => {
  if (!latest || latest.item === item) return;
  latest = { ...latest, item };
  for (const listener of listeners) listener(latest);
});

/** The host context now, for code that is not a component. Null before the host has said ready. */
export const readyNow = (): HostReadyContext | null => latest;

/** The latest host context. Re-renders on every theme, session or directory change. */
export const useReady = (): HostReadyContext | null => {
  const [ctx, setCtx] = useState<HostReadyContext | null>(latest);
  useEffect(() => {
    listeners.add(setCtx);
    if (latest) setCtx(latest);
    return () => { listeners.delete(setCtx); };
  }, []);
  return ctx;
};

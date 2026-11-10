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

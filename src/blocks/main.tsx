import { render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { GuestBlockCall } from '@openchamber/sdk';
import { host, useReady } from '../shared/host.ts';

const App = () => {
  useReady();
  const [call, setCall] = useState<GuestBlockCall | null>(null);
  useEffect(() => host.onBlock(setCall), []);
  useEffect(() => {
    const root = document.getElementById('root')!;
    const observer = new ResizeObserver(() => { void host.setHeight(Math.ceil(root.getBoundingClientRect().height)); });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  return <div class="lin-pad sui-muted">{call ? `${call.name}(${JSON.stringify(call.args)})` : 'Waiting for the agent'}</div>;
};

render(<App />, document.getElementById('root')!);

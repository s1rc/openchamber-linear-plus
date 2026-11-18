// The chat blocks: LinearIssue, LinearIssueList and LinearPickIssue share this one page and bundle,
// and the call's name picks which to draw. The call's arguments are written by a model: they are
// validated in src/shared/block-args.ts and drawn as text, and nothing happens until a click.
import type { GuestBlockCall } from '@openchamber/sdk';
import { GUEST_BLOCK_HEIGHT_MAX } from '@openchamber/sdk';
import { render } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { host, useReady } from '../shared/host.ts';
import { IssueBlock } from './issue-block.tsx';
import { ListBlock } from './list-block.tsx';
import { PickBlock } from './pick-block.tsx';

const Drawn = ({ call }: { call: GuestBlockCall }) => {
  switch (call.name) {
    case 'LinearIssue': return <IssueBlock args={call.args} />;
    case 'LinearIssueList': return <ListBlock args={call.args} />;
    case 'LinearPickIssue': return <PickBlock args={call.args} answered={call.answered} />;
    default: return <div class="sui-muted">This Linear extension has no block called {call.name.slice(0, 40)}.</div>;
  }
};

const App = () => {
  useReady();
  const [call, setCall] = useState<GuestBlockCall | null>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => host.onBlock(setCall), []);
  // The frame is as tall as the content, up to the host's limit; `.lin-block` scrolls beyond that.
  useEffect(() => {
    const element = box.current;
    if (!element) return;
    let last = 0;
    const observer = new ResizeObserver(() => {
      const height = Math.min(Math.ceil(element.getBoundingClientRect().height), GUEST_BLOCK_HEIGHT_MAX);
      if (height === last) return;
      last = height;
      void host.setHeight(height).catch(() => undefined);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div class="lin-block" ref={box} style={{ maxHeight: GUEST_BLOCK_HEIGHT_MAX }}>
      {call ? <Drawn key={`${call.name}:${JSON.stringify(call.args)}`} call={call} /> : <div class="sui-muted">Waiting for the agent</div>}
    </div>
  );
};

render(<App />, document.getElementById('root')!);

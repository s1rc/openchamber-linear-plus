import { render } from 'preact';
import { useEffect } from 'preact/hooks';
import { host, useReady } from '../shared/host.ts';

const App = () => {
  const ctx = useReady();
  useEffect(() => {
    const root = document.getElementById('root')!;
    const observer = new ResizeObserver(() => { void host.setHeight(Math.ceil(root.getBoundingClientRect().height)); });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);
  return <div class="lin-pad sui-muted">Linear status. Directory: {ctx?.directory ?? 'none'}</div>;
};

render(<App />, document.getElementById('root')!);

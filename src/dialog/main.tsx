import { render } from 'preact';
import { useReady } from '../shared/host.ts';
import { Spinner } from '../shared/kit.tsx';
import { Dialog } from './dialog.tsx';

const App = () => {
  const ctx = useReady();
  if (!ctx) return <div class="lin-center"><Spinner label="Loading" /></div>;
  return <Dialog ctx={ctx} />;
};

render(<App />, document.getElementById('root')!);

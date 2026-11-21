import { render } from 'preact';
import { host, useReady } from '../shared/host.ts';
import { Spinner } from '../shared/kit.tsx';
import { Dialog } from './dialog.tsx';

const App = () => {
  const ctx = useReady();
  if (!ctx) return <div class="lin-center"><Spinner label="Loading" /></div>;
  return <Dialog ctx={ctx} />;
};

// The host's extension dialog does not close on Escape (it cannot see keys inside the frame), so the frame does it,
// as the host's own Linear picker does. An open select or menu takes the Escape first and only closes itself.
window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || event.isComposing || event.defaultPrevented) return;
  if (document.querySelector('.oc-sdk-popup')) return;
  event.preventDefault();
  void host.close();
}, true);

render(<App />, document.getElementById('root')!);

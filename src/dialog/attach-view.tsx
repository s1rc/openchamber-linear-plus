// The dialog for a Linear chip already on the message. The Attach tab itself is picker-view.tsx.
import type { AttachIssueRequest } from '@openchamber/sdk';
import { host } from '../shared/host.ts';
import { Button } from '../shared/kit.tsx';

/** The dialog for a project or document chip already on the message: what it is, and a way to open it. */
export const AttachedView = ({ item }: { item: AttachIssueRequest }) => (
  <div class="lin-dialog-body">
    <h2 class="lin-dialog-title">{item.title}</h2>
    <p class="lin-lead">This is attached to your message. The agent reads its text, not the page.</p>
    <div class="lin-form-foot">
      <Button label="Close" variant="ghost" size="sm" onClick={() => { void host.close(); }} />
      {item.url && <Button label="Open in Linear" size="sm" onClick={() => { void host.openUrl(item.url); }} />}
    </div>
  </div>
);

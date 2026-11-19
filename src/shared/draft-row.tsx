// A finish-comment draft waiting to be posted: "Summary ready for ENG-123" with Post and Discard, and an
// editable preview on a click. Used in the Work Status section and in Settings.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { discardDraft, postDraft, type Draft } from './drafts.ts';
import { host } from './host.ts';
import { Button, TextField } from './kit.tsx';
import { writeErrorText } from './writes.ts';

export const DraftRow = ({ draft, onDone }: { draft: Draft; onDone: () => void }) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState(draft.body);
  const [busy, setBusy] = useState<'post' | 'discard' | null>(null);

  const post = async () => {
    setBusy('post');
    try {
      await postDraft(draft, body);
      await toast(host, 'success', `Posted the summary on ${draft.identifier}`);
      onDone();
    } catch (error) {
      await toast(host, 'error', `Could not post on ${draft.identifier}: ${writeErrorText(error)}`);
      setBusy(null);
    }
  };
  const discard = async () => {
    setBusy('discard');
    if (await discardDraft(draft)) onDone();
    else {
      await toast(host, 'error', 'Could not discard the draft. Try again.');
      setBusy(null);
    }
  };

  return (
    <div class="lin-status-draft" data-draft={draft.id}>
      <div class="lin-status-line lin-status-line--wrap" role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen(!open)} onKeyDown={(event) => { if (event.key === 'Enter') setOpen(!open); }}>
        <span class="lin-status-label" title={draft.sessionTitle}>Summary ready for <span class="sui-mono lin-status-ref">{draft.identifier}</span></span>
        <span class="lin-status-actions" onClick={(event) => event.stopPropagation()}>
          <Button label="Post" size="xs" loading={busy === 'post'} disabled={busy !== null || !body.trim()} onClick={() => { void post(); }} />
          <Button label="Discard" variant="ghost" size="xs" loading={busy === 'discard'} disabled={busy !== null} onClick={() => { void discard(); }} />
        </span>
      </div>
      {open && <TextField value={body} onChange={setBody} multiline rows={5} disabled={busy !== null} />}
    </div>
  );
};

// The confirm before Delete from the issue menu. Linear moves the issue to its trash, so the dialog says how
// to get it back.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { host } from '../../shared/host.ts';
import { Button } from '../../shared/kit.tsx';
import type { IssueRow } from '../../shared/types.ts';
import { deleteIssue, writeErrorText } from '../../shared/writes.ts';
import { Modal } from './modal.tsx';

type Props = { issue: Pick<IssueRow, 'id' | 'identifier' | 'title'>; onClose: () => void; onDeleted: () => void };

export const DeleteIssueDialog = ({ issue, onClose, onDeleted }: Props) => {
  const [busy, setBusy] = useState(false);
  const remove = async () => {
    setBusy(true);
    try {
      await deleteIssue(issue);
      await toast(host, 'success', `Deleted ${issue.identifier}. Restore it from Linear's trash within 30 days.`);
      onDeleted();
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  return (
    <Modal
      title={`Delete ${issue.identifier}?`}
      onClose={onClose}
      footer={(
        <>
          <Button label="Cancel" variant="ghost" size="sm" disabled={busy} onClick={onClose} />
          <Button label={busy ? 'Deleting...' : 'Delete issue'} variant="destructive" size="sm" disabled={busy} onClick={() => { void remove(); }} />
        </>
      )}
    >
      <p class="lin-delete-title">{issue.title}</p>
      <p class="sui-muted sui-small">Linear moves the issue to its trash. You can restore it there for 30 days.</p>
    </Modal>
  );
};

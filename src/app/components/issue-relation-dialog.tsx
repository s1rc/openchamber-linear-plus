// Choose an existing issue for Mark as. Create related uses the same RelationChoice after its create form.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { host } from '../../shared/host.ts';
import type { RelationChoice } from '../../shared/issue-menu.ts';
import type { IssueRow } from '../../shared/types.ts';
import { createIssueRelation, writeErrorText } from '../../shared/writes.ts';
import { IssueSearchDialog } from './issue-search-dialog.tsx';

const TITLES: Record<RelationChoice['id'], string> = {
  related: 'Mark as related to',
  blocking: 'Mark as blocking',
  blocked: 'Mark as blocked by',
  duplicate: 'Mark as duplicate of',
  similar: 'Mark as similar to',
};

type Props = {
  issue: IssueRow;
  relation: RelationChoice;
  onClose: () => void;
};

export const IssueRelationDialog = ({ issue, relation, onClose }: Props) => {
  const [busy, setBusy] = useState(false);
  const choose = async (other: IssueRow) => {
    if (busy) return;
    setBusy(true);
    try {
      await createIssueRelation(issue, other, relation);
      await toast(host, 'success', `Linked ${issue.identifier} and ${other.identifier}`);
      onClose();
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  return (
    <IssueSearchDialog
      issue={issue}
      title={`${TITLES[relation.id]} ${issue.identifier}`}
      placeholder="Search issues by title or key"
      busy={busy}
      onClose={onClose}
      onChoose={(other) => { void choose(other); }}
    />
  );
};

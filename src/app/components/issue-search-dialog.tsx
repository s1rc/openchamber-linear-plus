// One issue picker for relations, choosing a parent, and semantic suggestions.
import { useState } from 'preact/hooks';
import { SearchField, Spinner } from '../../shared/kit.tsx';
import { useIssueSearch, useSemanticIssueSearch } from '../../shared/search.ts';
import type { IssueRow } from '../../shared/types.ts';
import { IssueRow as Row } from './issue-row.tsx';
import { Modal } from './modal.tsx';

type Props = {
  issue: IssueRow;
  title: string;
  initialQuery?: string;
  placeholder: string;
  semantic?: boolean;
  busy?: boolean;
  onClose: () => void;
  onChoose: (issue: IssueRow) => void;
};

export const IssueSearchDialog = ({ issue, title, initialQuery = '', placeholder, semantic = false, busy = false, onClose, onChoose }: Props) => {
  const [query, setQuery] = useState(initialQuery);
  const plain = useIssueSearch(semantic ? '' : query);
  const similar = useSemanticIssueSearch(semantic ? query : '');
  const result = semantic ? similar : plain;
  const issues = (result.data ?? []).filter((candidate) => candidate.id !== issue.id);
  return (
    <Modal wide title={title} onClose={onClose}>
      <div class="lin-stack">
        <SearchField value={query} onChange={setQuery} placeholder={placeholder} />
        {result.loading && <Spinner label="Searching Linear" />}
        {!result.loading && result.error && <div class="sui-muted sui-small">Search failed. Try again.</div>}
        {!result.loading && !result.error && query.trim().length >= 2 && !issues.length && <div class="sui-muted sui-small">No matching issues.</div>}
        <div class="lin-stack lin-stack--tight">
          {issues.map((candidate) => <Row key={candidate.id} issue={candidate} compact disabled={busy} onOpen={onChoose} />)}
        </div>
      </div>
    </Modal>
  );
};

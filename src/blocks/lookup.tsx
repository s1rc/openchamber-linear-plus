// Loads the issues a block names and draws the states around them: loading, not connected, an error.
import type { ComponentChildren } from 'preact';
import { host } from '../shared/host.ts';
import { Banner, Empty, Spinner } from '../shared/kit.tsx';
import { LinearError } from '../shared/linear.ts';
import { useBlockIssues, type FoundIssues } from './data.ts';

type Props = {
  ids: string[];
  children: (found: FoundIssues) => ComponentChildren;
};

export const Lookup = ({ ids, children }: Props) => {
  const query = useBlockIssues(ids);
  if (query.data) return <>{children(query.data)}</>;
  if (query.error) {
    const error = query.error instanceof LinearError ? query.error : new LinearError('network', String(query.error));
    if (error.kind === 'disconnected') {
      return <Empty title="Connect Linear" body="Sign in to Linear in OpenChamber to see these issues." action={{ label: 'Connect Linear', onClick: () => { void host.oauthStart(); } }} />;
    }
    return <Banner tone="error" title="Could not load from Linear" body={error.message} action={{ label: 'Retry', onClick: () => query.refresh() }} />;
  }
  return <div class="lin-block-wait"><Spinner label="Loading from Linear" /></div>;
};

/** One line under a block for what the model wrote that is not an issue key. */
export const SkippedNote = ({ skipped, cut }: { skipped: string[]; cut: number }) => {
  if (skipped.length === 0 && cut === 0) return null;
  const parts = [
    skipped.length > 0 ? `Not an issue key: ${skipped.join(', ')}.` : '',
    cut > 0 ? `${cut} more not shown.` : '',
  ].filter(Boolean);
  return <div class="sui-small sui-muted">{parts.join(' ')}</div>;
};

/** A row for an identifier Linear does not know, or that you cannot see. */
export const MissingRow = ({ id }: { id: string }) => (
  <div class="lin-block-missing sui-small sui-muted">
    <span class="sui-mono">{id}</span>
    <span>Not found in Linear, or you cannot see it.</span>
  </div>
);

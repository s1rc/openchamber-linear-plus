// What the dialog shows after it created an issue or posted a comment: the result, with Link, Open and Close.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { host } from '../shared/host.ts';
import { Banner, Button } from '../shared/kit.tsx';
import type { IssueRow } from '../shared/types.ts';

/** The composer chip and session link for an issue row. */
export const issueChip = (issue: IssueRow) => ({
  providerId: 'linear-dashboard',
  id: issue.identifier,
  title: `${issue.identifier} ${issue.title}`,
  url: issue.url,
  kind: 'issue' as const,
  text: `${issue.identifier}: ${issue.title}\nStatus: ${issue.state.name}.\nLink: ${issue.url}`,
  data: { issueId: issue.id, identifier: issue.identifier },
});

type Props = {
  title: string;
  issue: IssueRow;
  /** False when the session already links this issue. */
  canLink: boolean;
};

export const Done = ({ title, issue, canLink }: Props) => {
  const [linked, setLinked] = useState(false);
  const link = async () => {
    try {
      await host.sessionLink(issueChip(issue));
      setLinked(true);
      await toast(host, 'success', `Linked ${issue.identifier} to this session`);
    } catch {
      await toast(host, 'error', 'Open a session to link the issue to it.');
    }
  };
  return (
    <div class="lin-dialog-body" data-state="done">
      <Banner tone="success" title={title} body={`${issue.identifier} ${issue.title}`} />
      <div class="lin-form-foot">
        <Button label="Close" variant="ghost" size="sm" onClick={() => { void host.close(); }} />
        {canLink && <Button label={linked ? 'Linked' : 'Link to this session'} variant="outline" size="sm" disabled={linked} onClick={() => { void link(); }} />}
        <Button label="Open in Linear" size="sm" onClick={() => { void host.openUrl(issue.url); }} />
      </div>
    </div>
  );
};

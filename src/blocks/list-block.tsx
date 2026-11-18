// LinearIssueList(title, ids): several issues as rows, read live. A click opens the issue in Linear.
import { Section } from '@openchamber-ext/shared-ui/preact';
import { IssueRow } from '../app/components/issue-row.tsx';
import { blockTitle, splitIds } from '../shared/block-args.ts';
import { host } from '../shared/host.ts';
import type { PropertyId } from '../shared/view-options.ts';
import { Lookup, MissingRow, SkippedNote } from './lookup.tsx';

/** What a row shows in the chat: the usual ones, without the dates and counters of the dashboard. */
export const BLOCK_PROPERTIES: ReadonlySet<PropertyId> = new Set(['id', 'status', 'assignee', 'priority', 'labels', 'dueDate']);

export const ListBlock = ({ args }: { args: Record<string, string> }) => {
  const { ids, skipped, cut } = splitIds(args.ids);
  const title = blockTitle(args.title);
  if (ids.length === 0) {
    return (
      <Section title={title || undefined}>
        <div class="sui-muted">No issue identifiers to show.</div>
        <SkippedNote skipped={skipped} cut={cut} />
      </Section>
    );
  }
  return (
    <Section title={title || undefined}>
      <Lookup ids={ids}>
        {(found) => (
          <div class="lin-groups lin-block-rows">
            {ids.map((id) => {
              const issue = found.get(id);
              return issue
                ? <IssueRow key={id} issue={issue} properties={BLOCK_PROPERTIES} onOpen={(row) => { void host.openUrl(row.url); }} />
                : <MissingRow key={id} id={id} />;
            })}
          </div>
        )}
      </Lookup>
      <SkippedNote skipped={skipped} cut={cut} />
    </Section>
  );
};

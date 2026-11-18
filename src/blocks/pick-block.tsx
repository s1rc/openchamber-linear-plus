// LinearPickIssue(question, ids): the agent asks which issue. One click on a row answers with
// "ENG-123 Title"; the answer is final, so the rows go dead and the choice stays on show.
import { toast } from '@openchamber-ext/shared-ui';
import { Section } from '@openchamber-ext/shared-ui/preact';
import { useState } from 'preact/hooks';
import { IssueRow } from '../app/components/issue-row.tsx';
import { answeredIdentifier, blockQuestion, pickAnswer, splitIds } from '../shared/block-args.ts';
import { host } from '../shared/host.ts';
import { BLOCK_PROPERTIES } from './list-block.tsx';
import { Lookup, MissingRow, SkippedNote } from './lookup.tsx';

export const PickBlock = ({ args, answered }: { args: Record<string, string>; answered: string | null }) => {
  const { ids, skipped, cut } = splitIds(args.ids);
  const question = blockQuestion(args.question);
  const [chosen, setChosen] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const final = answered ?? chosen;
  const picked = answeredIdentifier(answered) ?? chosen;

  const choose = async (issue: { identifier: string; title: string }) => {
    if (busy || final) return;
    setBusy(true);
    try {
      await host.answerBlock(pickAnswer(issue));
      setChosen(issue.identifier);
    } catch (error) {
      await toast(host, 'error', `Could not send your choice: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Section title={question || 'Pick an issue'}>
      {ids.length === 0 ? (
        <div class="sui-muted">No issues to choose from.</div>
      ) : (
        <Lookup ids={ids}>
          {(found) => (
            <div class="lin-groups lin-block-rows" data-answered={final ? 'true' : 'false'}>
              {ids.map((id) => {
                const issue = found.get(id);
                return issue
                  ? (
                    <IssueRow
                      key={id}
                      issue={issue}
                      properties={BLOCK_PROPERTIES}
                      selected={picked === id}
                      disabled={Boolean(final) || busy}
                      onOpen={(row) => { void choose(row); }}
                    />
                  )
                  : <MissingRow key={id} id={id} />;
              })}
            </div>
          )}
        </Lookup>
      )}
      <SkippedNote skipped={skipped} cut={cut} />
      {final
        ? <div class="sui-small sui-muted" data-state="answered">{answered ? `${answeredIdentifier(answered) ? 'You chose' : 'You answered'}: ${answered}` : `You chose ${chosen}.`}</div>
        : ids.length > 0 && <div class="sui-small sui-muted">Click an issue to choose it.</div>}
    </Section>
  );
};

// Create Linear issue: the form, prefilled by the Small Model from a message, a selection, a chat or
// diff lines. The form opens at once and the draft fills in whatever has not been typed over.
import { useState } from 'preact/hooks';
import { useIssueForm } from '../app/components/create-issue.tsx';
import { host } from '../shared/host.ts';
import { Banner, Button, Spinner } from '../shared/kit.tsx';
import type { IssueRow } from '../shared/types.ts';
import { Done } from './done.tsx';
import type { Job } from './jobs.ts';
import type { Scope } from './scope.ts';
import { useDraft } from './use-draft.ts';

const DraftNote = ({ state, retry }: { state: ReturnType<typeof useDraft>['state']; retry: () => void }) => {
  if (state.kind === 'idle') return null;
  if (state.kind === 'working') return <div class="lin-draft-note"><Spinner size="sm" label="Drafting with the Small Model. You can start typing; your words stay." /></div>;
  if (state.kind === 'draft') return <div class="lin-draft-note sui-muted sui-small">Drafted by the Small Model. Check it before you create the issue.</div>;
  if (state.kind === 'nothing') return <div class="lin-draft-note sui-muted sui-small">{state.note}</div>;
  if (state.kind === 'no-model') {
    return <Banner tone="info" title="No Small Model is set up" body="Choose one in OpenChamber's settings to have issues drafted for you. The form is empty for now." />;
  }
  return <Banner tone="warning" title="Could not draft the issue" body={`${state.message} The form is empty.`} action={{ label: 'Try again', onClick: retry }} />;
};

/** The create form. With a job it drafts from the item; with none (the + menu) it starts empty and under tabs. */
export const CreateView = ({ job, scope, hidden = false }: { job: Job | null; scope: Scope; hidden?: boolean }) => {
  const { state, retry } = useDraft(job);
  const [created, setCreated] = useState<IssueRow | null>(null);
  const form = useIssueForm({
    teamIds: scope.teamIds,
    projectId: scope.projectId,
    ...(job?.initial ? { initial: job.initial } : {}),
    draft: state.kind === 'draft' ? state.draft : null,
    onCreated: setCreated,
    onEscape: () => { void host.close(); },
    rows: 8,
  });
  if (created) return <Done title="Issue created" issue={created} canLink />;
  return (
    <div class="lin-dialog-body" hidden={hidden}>
      {job && (
        <>
          <h2 class="lin-dialog-title">Create Linear issue</h2>
          <div class="lin-source">
            <span class="sui-muted sui-small">{job.source}</span>
            {job.quote && <span class="lin-quote sui-small">{job.quote}</span>}
          </div>
        </>
      )}
      <DraftNote state={state} retry={retry} />
      {form.body}
      <div class="lin-form-foot">
        <Button label="Cancel" variant="ghost" size="sm" onClick={() => { void host.close(); }} />
        <Button label={form.busy ? 'Creating...' : 'Create issue'} size="sm" disabled={!form.canSubmit} onClick={form.submit} />
      </div>
    </div>
  );
};

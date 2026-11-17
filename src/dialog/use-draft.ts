// Runs a job's draft once for the item the dialog opened with, and again on Try again.
import { useEffect, useState } from 'preact/hooks';
import type { Draft, DraftOutcome } from '../shared/draft.ts';
import { draftWithModel } from '../shared/generate.ts';
import type { Job } from './jobs.ts';

export type DraftState =
  /** Nothing to draft: the dialog was opened from the + menu. */
  | { kind: 'idle' }
  | { kind: 'working' }
  | { kind: 'draft'; draft: Draft }
  | { kind: 'nothing'; note: string }
  | Exclude<DraftOutcome, { kind: 'draft' }>;

export const useDraft = (job: Job | null): { state: DraftState; retry: () => void } => {
  const [state, setState] = useState<DraftState>(job ? { kind: 'working' } : { kind: 'idle' });
  const [run, setRun] = useState(0);

  useEffect(() => {
    let alive = true;
    if (!job) { setState({ kind: 'idle' }); return; }
    setState({ kind: 'working' });
    void (async () => {
      const built = await job.build().catch(() => ({ prompt: null, note: 'Could not read what to draft from.' }));
      if (!alive) return;
      if (!built.prompt) {
        setState({ kind: 'nothing', note: built.note ?? 'There is nothing to draft from.' });
        return;
      }
      const outcome = await draftWithModel(built.prompt);
      if (!alive) return;
      setState(outcome.kind === 'draft' ? { kind: 'draft', draft: job.finish(outcome.draft) } : outcome);
    })();
    return () => { alive = false; };
  }, [job?.key, run]);

  return { state, retry: () => setRun((n) => n + 1) };
};

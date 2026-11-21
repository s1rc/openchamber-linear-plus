// Mounted in the Work Status section and the dashboard: when a plan of this folder has finished with an estimate
// or split-out issues nobody wrote yet, this frame writes them (src/shared/plan-extras-apply.ts) and says so in a
// toast. A failure shows as a row with Retry in Work Status.
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { invalidate, useQuery } from './cache.ts';
import { fetchPlanExtras, reportExtras } from './handoff.ts';
import { host } from './host.ts';
import { Button } from './kit.tsx';
import { applyPlanExtras } from './plan-extras-apply.ts';
import { CLAIM_STALE_MS, extrasSummary, type ExtrasState } from './plan-extras.ts';

const POLL_MS = 60_000;

export const usePlanExtras = (directory: string | null) => useQuery(directory ? `plan-extras:${directory}` : null, () => fetchPlanExtras(directory!));

/** What this frame last got for each session: the service's list can lag a write by a poll, so a done one is not run again. */
const handled = new Map<string, 'done' | 'failed'>();

const due = (state: ExtrasState, now: number) => state.state === 'pending' || (state.state === 'claimed' && now - (state.claimedAt ?? 0) > CLAIM_STALE_MS);

export const PlanExtrasRunner = ({ directory, viewerId }: { directory: string; viewerId: string | null }) => {
  const extras = usePlanExtras(directory);
  useEffect(() => {
    const timer = setInterval(() => { if (document.visibilityState === 'visible') extras.refresh(); }, POLL_MS);
    return () => clearInterval(timer);
  }, [directory]);
  useEffect(() => {
    const now = Date.now();
    for (const state of extras.data ?? []) {
      if (!due(state, now) || handled.get(state.sessionId) === 'done') continue;
      void applyPlanExtras(state, viewerId).then(async (outcome) => {
        if (!outcome) return;
        handled.set(state.sessionId, outcome.state.state === 'done' ? 'done' : 'failed');
        const text = extrasSummary(outcome.state, outcome.label);
        if (outcome.state.state === 'done') await toast(host, 'success', `Plan for ${state.identifier}: ${text}.`);
        else await toast(host, 'error', `Plan for ${state.identifier}: ${outcome.state.error ?? 'a write failed'}. ${outcome.state.created?.length || (outcome.state.estimateSet ?? null) !== null ? `Done so far: ${text}. ` : ''}Retry is in Work Status.`);
        invalidate('issue');
        invalidate('status-');
        extras.refresh();
      });
    }
  }, [extras.data, viewerId]);
  return null;
};

/** Work Status: plans whose extras failed to write, with Retry. */
export const PlanExtrasFailures = ({ directory }: { directory: string }) => {
  const extras = usePlanExtras(directory);
  const [busy, setBusy] = useState<string | null>(null);
  const failed = (extras.data ?? []).filter((s) => s.state === 'failed');
  if (!failed.length) return null;
  const retry = async (state: ExtrasState) => {
    setBusy(state.sessionId);
    if (!(await reportExtras({ sessionId: state.sessionId, action: 'retry-extras' }))) await toast(host, 'error', 'Could not retry. Try again.');
    setBusy(null);
    extras.refresh();
  };
  return (
    <>
      {failed.map((state) => (
        <div class="lin-status-draft" key={state.sessionId} data-extras={state.sessionId}>
          <div class="lin-status-line lin-status-line--wrap">
            <span class="lin-status-label" title={state.error ?? ''}>
              Plan for <span class="sui-mono lin-status-ref">{state.identifier}</span>: estimate or issues not written
            </span>
            <span class="lin-status-actions">
              <Button label="Retry" size="xs" loading={busy === state.sessionId} disabled={busy !== null} onClick={() => { void retry(state); }} />
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

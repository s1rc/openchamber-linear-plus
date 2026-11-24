// "Plan ready for ENG-123" with Start Build, Add Plan Only and Dismiss, in the Work Status section. Starting the build is a
// click here; the service only listed the plan.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { invalidate } from './cache.ts';
import { dismissHandoff } from './handoff.ts';
import type { Handoff } from './handoff-rules.ts';
import { host } from './host.ts';
import { Button } from './kit.tsx';
import { AddPlanButton } from './add-plan-button.tsx';
import { sourceOfHandoff, startBuildFromHandoff } from './start-build.ts';
import { openStartedSession } from './start-session.ts';
import { writeErrorText } from './writes.ts';

export const HandoffRow = ({ handoff, onDone }: { handoff: Handoff; onDone: () => void }) => {
  const [busy, setBusy] = useState<'build' | 'plan' | 'dismiss' | null>(null);

  const build = async () => {
    setBusy('build');
    try {
      const outcome = await startBuildFromHandoff(handoff);
      if (outcome.moveError) await toast(host, 'error', `Build started, but ${handoff.identifier} was not moved: ${outcome.moveError}`);
      await toast(host, 'success', `${outcome.posted ? 'Added the plan to the issue and started' : 'Started'} a build for ${handoff.identifier}${outcome.moved ? ` and moved it to ${outcome.target!.name}` : ''}`);
      if (outcome.moved) invalidate('status-');
      onDone();
      await openStartedSession(outcome.sessionId);
    } catch (error) {
      await toast(host, 'error', `Could not start the build: ${writeErrorText(error)}`);
      setBusy(null);
    }
  };
  const dismiss = async () => {
    setBusy('dismiss');
    if (await dismissHandoff(handoff.id)) onDone();
    else {
      await toast(host, 'error', 'Could not dismiss the plan. Try again.');
      setBusy(null);
    }
  };

  return (
    <div class="lin-status-draft" data-handoff={handoff.id}>
      <div class="lin-status-line lin-status-line--wrap lin-status-line--static">
        <span class="lin-status-label" title={handoff.sessionTitle}>Plan ready for <span class="sui-mono lin-status-ref">{handoff.identifier}</span></span>
        <span class="lin-status-actions">
          <Button label={handoff.postPlan ? 'Add Plan and Build' : 'Start Build'} size="xs" loading={busy === 'build'} disabled={busy !== null} onClick={() => { void build(); }} />
          <AddPlanButton identifier={handoff.identifier} source={sourceOfHandoff(handoff)} label="Add Plan Only" doneLabel="Plan Added" size="xs" disabled={busy !== null && busy !== 'plan'} onBusy={(on) => setBusy(on ? 'plan' : null)} />
          <Button label="Dismiss" variant="ghost" size="xs" loading={busy === 'dismiss'} disabled={busy !== null} onClick={() => { void dismiss(); }} />
        </span>
      </div>
    </div>
  );
};

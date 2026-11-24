// Write Plan: writes the planning session's plan into the issue's description and starts nothing, for when someone
// else picks the work up in a session of their own. A Linear write, on the click. A reply that is not a plan is refused
// with the reason; Start build's panel can still use it anyway.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { invalidate } from './cache.ts';
import type { BuildSource } from './handoff-rules.ts';
import { host } from './host.ts';
import { Button } from './kit.tsx';
import { writePlan } from './start-build.ts';
import { writeErrorText } from './writes.ts';

type Props = {
  identifier: string;
  source: BuildSource;
  label?: string;
  /** The label once the plan is in the description. */
  doneLabel?: string;
  size?: 'xs' | 'sm';
  variant?: 'outline' | 'ghost';
  disabled?: boolean;
  /** Told when a write starts and ends, so the caller can hold its other buttons meanwhile. */
  onBusy?: (busy: boolean) => void;
};

export const AddPlanButton = ({ identifier, source, label = 'Write Plan', doneLabel = 'Plan Written', size = 'sm', variant = 'outline', disabled, onBusy }: Props) => {
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);
  const add = async () => {
    setBusy(true);
    onBusy?.(true);
    try {
      await writePlan({ identifier }, source);
      setAdded(true);
      invalidate('issue');
      await toast(host, 'success', `Added the plan to ${identifier}`);
    } catch (error) {
      await toast(host, 'error', `Could not add the plan to ${identifier}: ${writeErrorText(error)}`);
    } finally {
      setBusy(false);
      onBusy?.(false);
    }
  };
  return (
    <span class="lin-inline" title={`Adds the plan from ${source.title} to the end of ${identifier}'s description and starts nothing. A plan added before is replaced.`}>
      <Button label={added ? doneLabel : label} variant={variant} size={size} loading={busy} disabled={disabled || busy} onClick={() => { void add(); }} />
    </span>
  );
};

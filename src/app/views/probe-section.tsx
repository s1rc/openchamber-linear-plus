// Read-only check that the live Linear API answers every query the extension uses.
import { Dot, Section } from '@openchamber-ext/shared-ui/preact';
import { useState } from 'preact/hooks';
import { Button } from '../../shared/kit.tsx';
import { runProbe, type ProbeResult } from '../../shared/probe.ts';

export const ProbeSection = () => {
  const [results, setResults] = useState<ProbeResult[]>([]);
  const [running, setRunning] = useState(false);
  const start = () => {
    setResults([]);
    setRunning(true);
    void runProbe((result) => setResults((list) => [...list, result])).finally(() => setRunning(false));
  };
  const failed = results.filter((result) => !result.ok).length;
  return (
    <Section title="Linear queries">
      <div class="sui-muted sui-small">Runs each read query once through your Linear connection. Changes nothing in Linear.</div>
      <div class="sui-row">
        <Button label={running ? 'Checking' : 'Check Queries'} size="sm" loading={running} onClick={start} />
        {results.length > 0 && !running && (
          <span class="sui-small">{failed ? `${failed} of ${results.length} failed` : `All ${results.length} answered`}</span>
        )}
      </div>
      {results.map((result) => (
        <div class="sui-row sui-small">
          <Dot tone={result.ok ? 'success' : 'error'} />
          <span>{result.name}</span>
          <span class={result.ok ? 'sui-muted' : ''}>{result.detail}</span>
        </div>
      ))}
    </Section>
  );
};

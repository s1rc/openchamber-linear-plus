import { KV, Section } from '@openchamber-ext/shared-ui/preact';
import { Button } from '../../shared/kit.tsx';
import type { DetectionState } from '../../shared/use-detection.ts';
import type { Workspace } from '../../shared/workspace.ts';
import { ProbeSection } from './probe-section.tsx';
import { knownProject } from '../../shared/projects.ts';

const SOURCE_WORDS = {
  mapping: 'Saved for this folder',
  config: 'From .linear.json in the repository',
  repo: "Detected from Linear issues with merge requests in this repository",
  name: 'Detected from a name',
  none: 'Nothing detected',
} as const;

export const Settings = ({ workspace, state, onChange }: { workspace: Workspace; state: DetectionState; onChange: () => void }) => {
  const { detection, place } = state;
  return (
    <div class="lin-stack">
      <Section title="This folder">
        {place ? (
          <>
            <KV items={[
              ['Folder', place.projectDirectory],
              ['Team', detection.teamIds.map((id) => workspace.teamsById.get(id)?.name ?? '?').join(', ') || 'None'],
              ['Projects', detection.projectIds.map((id) => knownProject(id)?.name ?? '?').join(', ') || 'None'],
              ['Repository', place.repo ? `${place.repo.host}/${place.repo.path}` : 'Not found'],
              ['Source', SOURCE_WORDS[detection.source] + (detection.inferred ? ` (${detection.evidence})` : '')],
            ]} />
            <div class="sui-row">
              <Button label={state.mapped ? 'Change' : 'Pick team or projects'} size="sm" onClick={onChange} />
              {detection.inferred && <Button label="Pin" variant="outline" size="sm" onClick={() => { void state.pin(); }} />}
              {detection.mapping && <Button label="Forget this folder's choice" variant="ghost" size="sm" onClick={() => { void state.clear(); }} />}
            </div>
          </>
        ) : (
          <div class="sui-muted">Open a project in OpenChamber to map it to Linear.</div>
        )}
      </Section>
      <Section title="Account">
        <KV items={[
          ['Signed in as', `${workspace.viewer.name} (${workspace.viewer.email})`],
          ['Workspace', workspace.viewer.organization?.name ?? ''],
        ]} />
      </Section>
      <ProbeSection />
    </div>
  );
};

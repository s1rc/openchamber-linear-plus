import { KV, Section } from '@openchamber-ext/shared-ui/preact';
import { useEffect, useState } from 'preact/hooks';
import { Button, Switch } from '../../shared/kit.tsx';
import { getAssignToMe, getStartMoves, setAssignToMe, setStartMoves } from '../../shared/storage.ts';
import type { DetectionState } from '../../shared/use-detection.ts';
import type { Workspace } from '../../shared/workspace.ts';
import { AgentSettings } from './agent-settings.tsx';
import { ProbeSection } from './probe-section.tsx';
import { knownProject } from '../../shared/projects.ts';

const SOURCE_WORDS = {
  mapping: 'Saved for this folder',
  config: 'From .linear.json in the repository',
  repo: "Detected from Linear issues with merge requests in this repository",
  name: 'Detected from a name',
  none: 'Nothing detected',
} as const;

const StartMovesSwitch = () => {
  const [on, setOn] = useState<boolean | null>(null);
  useEffect(() => { void getStartMoves().then(setOn); }, []);
  if (on === null) return null;
  return (
    <Switch
      label="Start session moves the issue to In Progress"
      description="The default in the Start session dialog: the team's first started status. You can still change it each time."
      checked={on}
      onChange={(next) => { setOn(next); void setStartMoves(next); }}
    />
  );
};

const AssignToMeSwitch = () => {
  const [on, setOn] = useState<boolean | null>(null);
  useEffect(() => { void getAssignToMe().then(setOn); }, []);
  if (on === null) return null;
  return (
    <Switch
      label="Assign new issues to me"
      description="The default of the Assign to me switch in every create form: New issue, and Create Linear issue from a message, a selection, a chat or a diff. You can still change it each time."
      checked={on}
      onChange={(next) => { setOn(next); void setAssignToMe(next); }}
    />
  );
};

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
              <Button label={state.mapped ? 'Change' : 'Pick Team or Projects'} size="sm" onClick={onChange} />
              {detection.inferred && <Button label="Pin" variant="outline" size="sm" onClick={() => { void state.pin(); }} />}
              {detection.mapping && <Button label="Forget This Folder's Choice" variant="ghost" size="sm" onClick={() => { void state.clear(); }} />}
            </div>
          </>
        ) : (
          <div class="sui-muted">Open a project in OpenChamber to map it to Linear.</div>
        )}
      </Section>
      <Section title="Sessions">
        <StartMovesSwitch />
      </Section>
      <Section title="New issues">
        <AssignToMeSwitch />
      </Section>
      <AgentSettings state={state} />
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

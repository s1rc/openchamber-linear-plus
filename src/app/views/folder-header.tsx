// Above every folder view: which mapped team or project is showing, where the mapping came from,
// and the issue you are working on here.
import { Chip } from '@openchamber-ext/shared-ui/preact';
import { host } from '../../shared/host.ts';
import { Banner, Button, Tabs } from '../../shared/kit.tsx';
import { entityName, type DetectionState } from '../../shared/use-detection.ts';
import type { Workspace } from '../../shared/workspace.ts';

export const ALL = 'all';

export const mappedIds = (state: DetectionState) => [...state.detection.teamIds, ...state.detection.projectIds];

export const mappedNames = (workspace: Workspace, state: DetectionState) =>
  mappedIds(state).map((id) => entityName(workspace, id)).join(', ');

const tabLabel = (workspace: Workspace, id: string) => {
  const team = workspace.teamsById.get(id);
  return team ? `${team.key} · ${team.name}` : entityName(workspace, id);
};

/** The issue from this folder's branch or latest session: your work, whoever owns the folder. */
export const WorkRow = ({ state }: { state: DetectionState }) => {
  const work = state.detection.work;
  if (!work) return null;
  return (
    <div class="sui-row sui-small">
      <span class="sui-muted">{work.from === 'branch' ? 'Your branch:' : 'Your latest session:'}</span>
      <Chip><span class="sui-mono">{work.identifier}</span> {work.title}</Chip>
      {work.projectName && <span class="sui-muted">in {work.projectName}</span>}
      <Button label="Open" variant="ghost" size="xs" onClick={() => { void host.openUrl(work.url); }} />
    </div>
  );
};

type Props = {
  workspace: Workspace;
  state: DetectionState;
  activeId: string;
  onActive: (id: string) => void;
  onChange: () => void;
};

export const FolderHeader = ({ workspace, state, activeId, onActive, onChange }: Props) => {
  const { detection } = state;
  const ids = mappedIds(state);
  const tabs = ids.length > 1 && (
    <Tabs
      items={[...ids.map((id) => ({ id, label: tabLabel(workspace, id) })), { id: ALL, label: 'All' }]}
      activeId={ids.includes(activeId) ? activeId : ALL}
      onChange={onActive}
    />
  );

  if (detection.inferred) {
    return (
      <div class="lin-stack">
        <Banner
          tone="info"
          title={`Detected from ${detection.evidence}`}
          body={`Linear: ${mappedNames(workspace, state)}. Pin it to keep it for this folder, or change it.`}
          action={{ label: 'Pin', onClick: () => { void state.pin(); } }}
        />
        <div class="sui-row">
          {tabs}
          <span class="sui-grow" />
          <Button label="Change" variant="ghost" size="sm" onClick={onChange} />
        </div>
        <WorkRow state={state} />
      </div>
    );
  }

  return (
    <div class="lin-stack">
      <div class="sui-row">
        {tabs}
        <span class="sui-grow" />
        <span class="sui-muted sui-small">{detection.source === 'config' ? 'From .linear.json' : 'Saved for this folder'}</span>
        <Button label="Change" variant="ghost" size="xs" onClick={onChange} />
      </div>
      <WorkRow state={state} />
    </div>
  );
};

/** On global views: limits the view to the folder's team and projects, removable. */
export const ScopeChip = ({ workspace, state, scoped, onScoped }: {
  workspace: Workspace;
  state: DetectionState;
  scoped: boolean;
  onScoped: (scoped: boolean) => void;
}) => {
  if (!state.mapped) return null;
  return scoped ? (
    <div class="sui-row">
      <Chip>This folder: {mappedNames(workspace, state)}</Chip>
      <Button label="Show all" variant="ghost" size="xs" onClick={() => onScoped(false)} />
    </div>
  ) : (
    <div class="sui-row">
      <Button label="Only this folder" variant="outline" size="xs" onClick={() => onScoped(true)} />
    </div>
  );
};

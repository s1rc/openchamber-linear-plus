// The issue's properties as Linear's side column edits them: each a menu that saves on choice. A
// change shows at once and rolls back, with a toast, when Linear refuses it.
import { toast } from '@openchamber-ext/shared-ui';
import { useMemo, useState } from 'preact/hooks';
import { estimateLabel } from '../../shared/format.ts';
import { Avatar, CycleGlyph, EstimateGlyph, MilestoneGlyph, PriorityGlyph, ProjectIcon, StatusGlyph } from '../../shared/glyphs.tsx';
import { compareStates, PRIORITY_NAMES } from '../../shared/grouping.ts';
import { host } from '../../shared/host.ts';
import { Button, Checkbox, SearchField, SelectBlock } from '../../shared/kit.tsx';
import { estimateScale, type Change } from '../../shared/moves.ts';
import { useProjectMilestones, useTeamProjects } from '../../shared/projects.ts';
import { useOpenCycles, useTeamPeople } from '../../shared/team-data.ts';
import type { IssueDetail, Label, Team } from '../../shared/types.ts';
import { updateIssue, writeErrorText } from '../../shared/writes.ts';
import { LabelChip } from './issue-row.tsx';

/** Saves one change and reports a refusal. */
export const save = async (issue: Pick<IssueDetail, 'id' | 'identifier'>, change: Change): Promise<boolean> => {
  try {
    await updateIssue(issue, change);
    return true;
  } catch (error) {
    await toast(host, 'error', writeErrorText(error));
    return false;
  }
};

const NONE = '__none__';

const Row = ({ icon, children }: { icon: preact.ComponentChildren; children: preact.ComponentChildren }) => (
  <div class="lin-prop-edit">{icon}<span class="lin-prop-edit-field">{children}</span></div>
);

type Props = { issue: IssueDetail; team: Team | undefined };

export const StatusEdit = ({ issue }: Props) => {
  const states = useMemo(() => [...issue.team.states.nodes].sort(compareStates), [issue.team.states.nodes]);
  return (
    <Row icon={<StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} />}>
      <SelectBlock
        value={issue.state.id}
        options={states.map((s) => ({ id: s.id, label: s.name }))}
        onChange={(id) => {
          const state = states.find((s) => s.id === id);
          if (state && state.id !== issue.state.id) void save(issue, { input: { stateId: state.id }, patch: { state } });
        }}
      />
    </Row>
  );
};

export const PriorityEdit = ({ issue }: Props) => (
  <Row icon={<PriorityGlyph priority={issue.priority} />}>
    <SelectBlock
      value={String(issue.priority)}
      options={[0, 1, 2, 3, 4].map((p) => ({ id: String(p), label: p ? PRIORITY_NAMES[p]! : 'No priority' }))}
      onChange={(id) => {
        const priority = Number(id) as IssueDetail['priority'];
        if (priority !== issue.priority) void save(issue, { input: { priority }, patch: { priority } });
      }}
    />
  </Row>
);

export const AssigneeEdit = ({ issue }: Props) => {
  const people = useTeamPeople(issue.team.id);
  const members = people.data?.members ?? [];
  const options = [
    { id: NONE, label: 'No assignee' },
    ...(issue.assignee && !members.some((m) => m.id === issue.assignee!.id) ? [{ id: issue.assignee.id, label: issue.assignee.name }] : []),
    ...members.map((m) => ({ id: m.id, label: m.name, hint: m.displayName !== m.name ? m.displayName : undefined })),
  ];
  return (
    <Row icon={issue.assignee ? <Avatar name={issue.assignee.name} url={issue.assignee.avatarUrl} size={16} /> : <span class="lin-avatar-empty lin-avatar-empty--sm" />}>
      <SelectBlock
        value={issue.assignee?.id ?? NONE}
        searchable
        searchPlaceholder="Assign to..."
        options={options}
        onChange={(id) => {
          if (id === (issue.assignee?.id ?? NONE)) return;
          const person = members.find((m) => m.id === id) ?? null;
          void save(issue, { input: { assigneeId: id === NONE ? null : id }, patch: { assignee: id === NONE ? null : person ?? issue.assignee } });
        }}
      />
    </Row>
  );
};

export const EstimateEdit = ({ issue, team }: Props) => {
  const scale = estimateScale(team);
  if (!scale.length) return null;
  const type = team?.issueEstimationType;
  const values = issue.estimate !== null && !scale.includes(issue.estimate) ? [...scale, issue.estimate].sort((a, b) => a - b) : scale;
  return (
    <Row icon={<EstimateGlyph />}>
      <SelectBlock
        value={issue.estimate === null ? NONE : String(issue.estimate)}
        options={[{ id: NONE, label: 'No estimate' }, ...values.map((v) => ({ id: String(v), label: `${estimateLabel(v, type) ?? v}${type === 'tShirt' ? '' : ' points'}` }))]}
        onChange={(id) => {
          const estimate = id === NONE ? null : Number(id);
          if (estimate !== issue.estimate) void save(issue, { input: { estimate }, patch: { estimate } });
        }}
      />
    </Row>
  );
};

export const CycleEdit = ({ issue, team }: Props) => {
  const cycles = useOpenCycles(team?.cyclesEnabled ? issue.team.id : null, team?.activeCycle?.number);
  if (!team?.cyclesEnabled) return null;
  const list = cycles.data ?? [];
  const name = (c: { number: number; name: string | null }) => `Cycle ${c.number}${c.name ? `: ${c.name}` : ''}`;
  const options = [
    { id: NONE, label: 'No cycle' },
    ...(issue.cycle && !list.some((c) => c.id === issue.cycle!.id) ? [{ id: issue.cycle.id, label: name(issue.cycle) }] : []),
    ...list.map((c) => ({ id: c.id, label: name(c), hint: c.isActive ? 'Current' : 'Upcoming' })),
  ];
  return (
    <Row icon={<CycleGlyph />}>
      <SelectBlock
        value={issue.cycle?.id ?? NONE}
        options={options}
        onChange={(id) => {
          if (id === (issue.cycle?.id ?? NONE)) return;
          const cycle = list.find((c) => c.id === id);
          void save(issue, { input: { cycleId: id === NONE ? null : id }, patch: { cycle: cycle ? { id: cycle.id, number: cycle.number, name: cycle.name } : null } });
        }}
      />
    </Row>
  );
};

export const ProjectEdit = ({ issue }: Props) => {
  const projects = useTeamProjects([issue.team.id]);
  const list = projects.data ?? [];
  const options = [
    { id: NONE, label: 'No project' },
    ...(issue.project && !list.some((p) => p.id === issue.project!.id) ? [{ id: issue.project.id, label: issue.project.name }] : []),
    ...list.map((p) => ({ id: p.id, label: p.name })),
  ];
  return (
    <Row icon={issue.project ? <ProjectIcon icon={issue.project.icon} color={issue.project.color} /> : <ProjectIcon icon={null} color={null} />}>
      <SelectBlock
        value={issue.project?.id ?? NONE}
        searchable
        searchPlaceholder="Move to project..."
        options={options}
        onChange={(id) => {
          if (id === (issue.project?.id ?? NONE)) return;
          const project = list.find((p) => p.id === id);
          // A milestone belongs to its project, so changing project clears it, as in Linear.
          void save(issue, {
            input: { projectId: id === NONE ? null : id },
            patch: { project: project ? { id: project.id, name: project.name, color: project.color, icon: project.icon } : null, projectMilestone: null },
          });
        }}
      />
    </Row>
  );
};

export const MilestoneEdit = ({ issue }: Props) => {
  const query = useProjectMilestones(issue.project?.id ?? null);
  const list = query.data ?? [];
  if (!issue.project) return null;
  const options = [
    { id: NONE, label: 'No milestone' },
    ...(issue.projectMilestone && !list.some((m) => m.id === issue.projectMilestone!.id) ? [{ id: issue.projectMilestone.id, label: issue.projectMilestone.name }] : []),
    ...list.map((m) => ({ id: m.id, label: m.name })),
  ];
  return (
    <Row icon={<MilestoneGlyph />}>
      <SelectBlock
        value={issue.projectMilestone?.id ?? null}
        placeholder="Set milestone"
        searchable={options.length >= 8}
        searchPlaceholder="Add to milestone..."
        options={options}
        onChange={(id) => {
          if (id === (issue.projectMilestone?.id ?? NONE)) return;
          const milestone = list.find((m) => m.id === id);
          void save(issue, {
            input: { projectMilestoneId: id === NONE ? null : id },
            patch: { projectMilestone: milestone ? { id: milestone.id, name: milestone.name } : null },
          });
        }}
      />
    </Row>
  );
};

export const DueDateEdit = ({ issue }: Props) => {
  const set = (dueDate: string | null) => { if (dueDate !== issue.dueDate) void save(issue, { input: { dueDate }, patch: { dueDate } }); };
  return (
    <div class="lin-prop-edit">
      <span class="lin-due-dot" />
      <input
        type="date"
        class="lin-date"
        aria-label="Due date"
        value={issue.dueDate ?? ''}
        onChange={(event) => set((event.target as HTMLInputElement).value || null)}
      />
      {issue.dueDate && <Button label="Clear" variant="ghost" size="xs" onClick={() => set(null)} />}
    </div>
  );
};

/** The team's and workspace's labels to tick, with the chosen ones first. Used by the detail and by Create issue. */
export const LabelPicker = ({ teamId, chosen, onChange, startOpen = false }: { teamId: string; chosen: Label[]; onChange: (next: Label[]) => void; startOpen?: boolean }) => {
  const [open, setOpen] = useState(startOpen);
  const [query, setQuery] = useState('');
  const people = useTeamPeople(open ? teamId : null);
  const ids = new Set(chosen.map((l) => l.id));
  const known = new Map([...(people.data?.labels ?? []), ...chosen].map((l) => [l.id, l]));
  const q = query.trim().toLowerCase();
  const shown = [...known.values()].filter((l) => !q || l.name.toLowerCase().includes(q)).sort((a, b) => Number(ids.has(b.id)) - Number(ids.has(a.id)) || a.name.localeCompare(b.name));
  const toggle = (label: Label) => onChange(ids.has(label.id) ? chosen.filter((l) => l.id !== label.id) : [...chosen, label]);
  return (
    <div class="lin-stack lin-stack--tight">
      <div class="sui-row">
        {chosen.map((l) => <LabelChip key={l.id} label={l} />)}
        <Button label={open ? 'Done' : chosen.length ? 'Edit Labels' : 'Add Label'} variant="ghost" size="xs" onClick={() => setOpen(!open)} />
      </div>
      {open && (
        <div class="lin-label-picker">
          <SearchField value={query} onChange={setQuery} placeholder="Find a label" />
          <div class="lin-label-list">
            {!people.data && <span class="sui-muted sui-small">Loading labels</span>}
            {shown.map((label) => (
              <div class="lin-label-option" key={label.id}>
                <span class="lin-swatch" style={{ background: label.color }} />
                <Checkbox label={label.name} checked={ids.has(label.id)} onChange={() => toggle(label)} />
              </div>
            ))}
            {people.data && !shown.length && <span class="sui-muted sui-small">No label matches.</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export const LabelsEdit = ({ issue }: Props) => (
  <LabelPicker
    teamId={issue.team.id}
    chosen={issue.labels.nodes}
    onChange={(next) => { void save(issue, { input: { labelIds: next.map((l) => l.id) }, patch: { labels: { nodes: next } } }); }}
  />
);

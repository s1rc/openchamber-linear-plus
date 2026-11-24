// Create issue, as Linear's dialog: team, title, description, then status, priority, assignee,
// estimate, cycle, project and labels. Opened with C or the New issue button, and in the host's
// dialog for the Create Linear issue actions, where a Small Model draft can fill the title and
// description (src/dialog).
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import type { Draft } from '../../shared/draft.ts';
import { estimateLabel } from '../../shared/format.ts';
import { compareStates, PRIORITY_NAMES } from '../../shared/grouping.ts';
import { host } from '../../shared/host.ts';
import { Button, Select, Switch, TextField } from '../../shared/kit.tsx';
import { acceptStateOf, estimateScale } from '../../shared/moves.ts';
import { useTeamProjects } from '../../shared/projects.ts';
import { getAssignToMe } from '../../shared/storage.ts';
import { useOpenCycles, useTeamPeople } from '../../shared/team-data.ts';
import type { IssueRow, Label } from '../../shared/types.ts';
import { useWorkspace } from '../../shared/workspace.ts';
import { createIssue, writeErrorText } from '../../shared/writes.ts';
import { Modal } from './modal.tsx';
import { LabelPicker } from './property-editors.tsx';

const NONE = '__none__';

export type IssueFormInitial = Partial<Draft> & {
  stateId?: string;
  priority?: number;
  assigneeId?: string | null;
  estimate?: number | null;
  cycleId?: string | null;
  projectId?: string | null;
  labels?: Label[];
};

type FormProps = {
  /** Teams to offer first, such as the folder's. The team picker lists every team. */
  teamIds: readonly string[];
  projectId?: string | null;
  /** What the title and description start as. */
  initial?: IssueFormInitial;
  /** A draft that arrives later fills the title and description the user has not typed in yet. */
  draft?: Draft | null;
  onCreated: (issue: IssueRow) => void;
  onEscape?: () => void;
  /** Height of the description box; the host's dialog stretches it to fill the space. */
  rows?: number;
};

/** The fields of the create form and what its button does. The caller draws the footer. */
export const useIssueForm = ({ teamIds, projectId = null, initial, draft, onCreated, onEscape, rows = 6 }: FormProps) => {
  const workspace = useWorkspace().data;
  const ordered = useMemo(() => {
    const teams = workspace?.teams ?? [];
    const first = new Set([...teamIds, ...(workspace?.myTeamIds ?? [])]);
    return [...teams.filter((t) => first.has(t.id)), ...teams.filter((t) => !first.has(t.id))];
  }, [workspace, teamIds]);
  const [teamId, setTeamId] = useState<string>(teamIds[0] ?? ordered[0]?.id ?? '');
  const team = workspace?.teamsById.get(teamId);
  const states = useMemo(() => [...(workspace?.statesByTeam.get(teamId) ?? [])].sort(compareStates), [workspace, teamId]);

  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [typed, setTyped] = useState({ title: false, description: false });
  const [stateId, setStateId] = useState<string>(initial?.stateId ?? NONE);
  const [priority, setPriority] = useState(String(initial?.priority ?? 0));
  const [assigneeId, setAssigneeId] = useState<string>(initial?.assigneeId ?? NONE);
  const [estimate, setEstimate] = useState<string>(initial?.estimate === null || initial?.estimate === undefined ? NONE : String(initial.estimate));
  const [cycleId, setCycleId] = useState<string>(initial?.cycleId ?? NONE);
  const [project, setProject] = useState<string>(initial?.projectId ?? projectId ?? NONE);
  const [labels, setLabels] = useState<Label[]>(initial?.labels ?? []);
  const [busy, setBusy] = useState(false);
  // The Settings default for "Assign to me", read once; null until read.
  const [assignDefault, setAssignDefault] = useState<boolean | null>(null);
  const viewer = workspace?.viewer ?? null;
  useEffect(() => { void getAssignToMe().then(setAssignDefault, () => setAssignDefault(false)); }, []);

  useEffect(() => {
    if (!draft) return;
    if (!typed.title) setTitle(draft.title);
    if (!typed.description) setDescription(draft.description);
  }, [draft]);

  const initialTeam = useRef(teamId);
  const initialPending = useRef(Boolean(initial));
  // A new team brings its own states, people, labels and cycles. A copy keeps its source values on the first team.
  useEffect(() => {
    const preset = initialPending.current && teamId === initialTeam.current ? initial : undefined;
    setStateId(preset?.stateId ?? acceptStateOf(team, states)?.id ?? states[0]?.id ?? NONE);
    setAssigneeId(preset && preset.assigneeId !== undefined ? preset.assigneeId ?? NONE : assignDefault && viewer ? viewer.id : NONE);
    setEstimate(preset?.estimate === null || preset?.estimate === undefined ? NONE : String(preset.estimate));
    setCycleId(preset?.cycleId ?? NONE);
    setLabels(preset?.labels ?? []);
    if (preset && states.length > 0 && assignDefault !== null) initialPending.current = false;
  }, [teamId, states.length, assignDefault, viewer?.id]);

  const people = useTeamPeople(teamId || null);
  const cycles = useOpenCycles(team?.cyclesEnabled ? teamId : null, team?.activeCycle?.number);
  const projects = useTeamProjects(teamId ? [teamId] : []);
  const scale = estimateScale(team);

  const canSubmit = !busy && Boolean(title.trim()) && Boolean(teamId);

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    try {
      const issue = await createIssue({
        teamId,
        title: title.trim(),
        ...(description.trim() ? { description } : {}),
        ...(stateId !== NONE ? { stateId } : {}),
        priority: Number(priority),
        ...(assigneeId !== NONE ? { assigneeId } : {}),
        ...(estimate !== NONE ? { estimate: Number(estimate) } : {}),
        ...(cycleId !== NONE ? { cycleId } : {}),
        ...(project !== NONE ? { projectId: project } : {}),
        ...(labels.length ? { labelIds: labels.map((l) => l.id) } : {}),
      });
      await toast(host, 'success', `Created ${issue.identifier}`);
      onCreated(issue);
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };

  const projectOptions = [
    { id: NONE, label: 'No project' },
    ...(projectId && !(projects.data ?? []).some((p) => p.id === projectId) ? [{ id: projectId, label: 'This folder\'s project' }] : []),
    ...(projects.data ?? []).map((p) => ({ id: p.id, label: p.name })),
  ];

  const body = (
    <div
      onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) void submit(); if (e.key === 'Escape') onEscape?.(); }}
      class="lin-stack lin-form"
    >
      <div class="lin-field-row">
        <Select value={teamId} searchable={ordered.length > 8} options={ordered.map((t) => ({ id: t.id, label: t.name, hint: t.key }))} onChange={setTeamId} />
      </div>
      <TextField value={title} onChange={(value) => { setTyped((t) => ({ ...t, title: true })); setTitle(value); }} placeholder="Issue title" label="Title" />
      <div class="lin-grow">
        <TextField
          value={description}
          onChange={(value) => { setTyped((t) => ({ ...t, description: true })); setDescription(value); }}
          multiline
          rows={rows}
          placeholder="Add a description. Markdown works. Cmd+Enter creates."
          label="Description"
        />
      </div>
      <div class="lin-field-row">
        <Select value={stateId} options={states.map((s) => ({ id: s.id, label: s.name }))} onChange={setStateId} />
        <Select value={priority} options={[0, 1, 2, 3, 4].map((p) => ({ id: String(p), label: p ? PRIORITY_NAMES[p]! : 'No priority' }))} onChange={setPriority} />
        <Select
          value={assigneeId}
          searchable
          options={[
            { id: NONE, label: 'No assignee' },
            // You are offered even before the team's people load, or when you are not a member of that team.
            ...(viewer && !(people.data?.members ?? []).some((m) => m.id === viewer.id) ? [{ id: viewer.id, label: viewer.name, hint: 'you' }] : []),
            ...(people.data?.members ?? []).map((m) => ({ id: m.id, label: m.name, ...(m.id === viewer?.id ? { hint: 'you' } : {}) })),
          ]}
          onChange={setAssigneeId}
        />
        {scale.length > 0 && (
          <Select value={estimate} options={[{ id: NONE, label: 'No estimate' }, ...scale.map((v) => ({ id: String(v), label: estimateLabel(v, team?.issueEstimationType) ?? String(v) }))]} onChange={setEstimate} />
        )}
        {team?.cyclesEnabled && (
          <Select value={cycleId} options={[{ id: NONE, label: 'No cycle' }, ...(cycles.data ?? []).map((c) => ({ id: c.id, label: `Cycle ${c.number}`, hint: c.isActive ? 'Current' : 'Upcoming' }))]} onChange={setCycleId} />
        )}
        <Select value={project} searchable options={projectOptions} onChange={setProject} />
      </div>
      {teamId && <LabelPicker teamId={teamId} chosen={labels} onChange={setLabels} />}
      {viewer && assignDefault !== null && (
        <Switch
          label="Assign to me"
          description={`Default in Settings: ${assignDefault ? 'on' : 'off'}.`}
          checked={assigneeId === viewer.id}
          disabled={busy}
          onChange={(on) => setAssigneeId(on ? viewer.id : NONE)}
        />
      )}
    </div>
  );

  return { body, submit: () => { void submit(); }, canSubmit, busy };
};

type Props = {
  teamIds: readonly string[];
  projectId?: string | null;
  initial?: IssueFormInitial;
  onClose: () => void;
  onCreated: (issue: IssueRow) => void;
};

export const CreateIssueDialog = ({ teamIds, projectId = null, initial, onClose, onCreated }: Props) => {
  const form = useIssueForm({ teamIds, projectId, initial, onCreated, onEscape: onClose });
  return (
    <Modal
      wide
      title="New issue"
      onClose={onClose}
      footer={(
        <>
          <Button label="Cancel" variant="ghost" size="sm" onClick={onClose} />
          <Button label={form.busy ? 'Creating...' : 'Create Issue'} size="sm" disabled={!form.canSubmit} onClick={form.submit} />
        </>
      )}
    >
      {form.body}
    </Modal>
  );
};

// A project's properties as Linear edits them: title, summary, status, priority, lead, members, teams,
// dates and milestones. Each saves on choice; a change shows at once and rolls back, with a toast, when
// Linear refuses it.
import { toast } from '@openchamber-ext/shared-ui';
import { useState } from 'preact/hooks';
import { Avatar, PriorityGlyph } from '../../shared/glyphs.tsx';
import { PRIORITY_NAMES } from '../../shared/grouping.ts';
import { host } from '../../shared/host.ts';
import { Button, Checkbox, SearchField, SelectBlock, TextField } from '../../shared/kit.tsx';
import { useProjectPeople, useProjectStatuses } from '../../shared/projects.ts';
import type { ProjectDetail, User } from '../../shared/types.ts';
import { useWorkspace } from '../../shared/workspace.ts';
import { createMilestone, deleteMilestone, updateMilestone, updateProject, writeErrorText, type MilestoneInput, type ProjectChange } from '../../shared/writes.ts';
import { keepKeys } from './markdown-field.tsx';

const NONE = '__none__';

/** Saves one change and reports a refusal. */
export const saveProject = async (project: Pick<ProjectDetail, 'id'>, change: ProjectChange): Promise<boolean> => {
  try {
    await updateProject(project, change);
    return true;
  } catch (error) {
    await toast(host, 'error', writeErrorText(error));
    return false;
  }
};

type Props = { project: ProjectDetail };

/** A line of text that becomes a field on click: Enter saves, Escape cancels. */
const InlineText = ({ value, placeholder, label, className, max, onSave }: {
  value: string; placeholder: string; label: string; className: string; max?: number; onSave: (next: string) => Promise<boolean>;
}) => {
  const [draft, setDraft] = useState<string | null>(null);
  const commit = async () => {
    const next = draft?.trim() ?? '';
    if (next === value || (await onSave(next))) setDraft(null);
  };
  if (draft === null) {
    return (
      <div
        class={`${className} lin-editable${value ? '' : ' sui-muted'}`}
        role="button"
        tabIndex={0}
        title={`Edit the ${label.toLowerCase()}`}
        onClick={() => setDraft(value)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setDraft(value); } }}
      >{value || placeholder}</div>
    );
  }
  return (
    <div class="lin-stack lin-stack--tight" onKeyDown={keepKeys((e) => { if (e.key === 'Enter') { e.preventDefault(); void commit(); } if (e.key === 'Escape') setDraft(null); })}>
      <TextField value={draft} onChange={(next) => setDraft(max ? next.slice(0, max) : next)} label={label} placeholder={placeholder} />
      <div class="sui-row">
        <Button label="Save" size="xs" disabled={label === 'Name' && !draft.trim()} onClick={() => { void commit(); }} />
        <Button label="Cancel" variant="ghost" size="xs" onClick={() => setDraft(null)} />
      </div>
    </div>
  );
};

export const ProjectTitleEdit = ({ project }: Props) => (
  <InlineText
    value={project.name}
    placeholder="Project name"
    label="Name"
    className="sui-section-title lin-project-title"
    onSave={(name) => (name ? saveProject(project, { input: { name }, patch: { name } }) : Promise.resolve(false))}
  />
);

export const ProjectSummaryEdit = ({ project }: Props) => (
  <InlineText
    value={project.description}
    placeholder="Add a short summary..."
    label="Summary"
    className="sui-small lin-project-summary"
    max={255}
    onSave={(description) => saveProject(project, { input: { description }, patch: { description } })}
  />
);

const Field = ({ icon, children }: { icon?: preact.ComponentChildren; children: preact.ComponentChildren }) => (
  <div class="lin-prop-edit lin-project-prop">{icon}<span class="lin-prop-edit-field">{children}</span></div>
);

export const ProjectStatusEdit = ({ project }: Props) => {
  const statuses = useProjectStatuses();
  const list = statuses.data ?? [];
  const options = list.some((s) => s.id === project.status.id) ? list : [project.status, ...list];
  return (
    <Field icon={<span class="lin-swatch" style={{ background: project.status.color }} />}>
      <SelectBlock
        value={project.status.id}
        options={options.map((s) => ({ id: s.id, label: s.name }))}
        onChange={(id) => {
          const status = options.find((s) => s.id === id);
          if (status && status.id !== project.status.id) void saveProject(project, { input: { statusId: id }, patch: { status: { id: status.id, name: status.name, type: status.type, color: status.color } } });
        }}
      />
    </Field>
  );
};

export const ProjectPriorityEdit = ({ project }: Props) => (
  <Field icon={<PriorityGlyph priority={project.priority} />}>
    <SelectBlock
      value={String(project.priority)}
      options={[0, 1, 2, 3, 4].map((p) => ({ id: String(p), label: p ? PRIORITY_NAMES[p]! : 'No priority' }))}
      onChange={(id) => {
        const priority = Number(id) as ProjectDetail['priority'];
        if (priority !== project.priority) void saveProject(project, { input: { priority }, patch: { priority } });
      }}
    />
  </Field>
);

/** The people who can lead or join this project: members of its teams, plus anyone already on it. */
const usePeople = (project: ProjectDetail): User[] => {
  const people = useProjectPeople(project.teams.nodes.map((t) => t.id)).data ?? [];
  const known = new Map<string, User>(people.map((p) => [p.id, p]));
  for (const m of project.members.nodes) if (!known.has(m.id)) known.set(m.id, m);
  if (project.lead && !known.has(project.lead.id)) known.set(project.lead.id, project.lead);
  return [...known.values()].sort((a, b) => a.name.localeCompare(b.name));
};

export const ProjectLeadEdit = ({ project }: Props) => {
  const people = usePeople(project);
  const lead = project.lead;
  return (
    <Field icon={lead ? <Avatar name={lead.name} url={lead.avatarUrl} size={16} /> : <span class="lin-avatar-empty lin-avatar-empty--sm" />}>
      <SelectBlock
        value={lead?.id ?? NONE}
        searchable
        searchPlaceholder="Set lead..."
        options={[{ id: NONE, label: 'No lead' }, ...people.map((p) => ({ id: p.id, label: p.name }))]}
        onChange={(id) => {
          if (id === (lead?.id ?? NONE)) return;
          void saveProject(project, { input: { leadId: id === NONE ? null : id }, patch: { lead: people.find((p) => p.id === id) ?? null } });
        }}
      />
    </Field>
  );
};

type Choice = { id: string; label: string; icon?: preact.ComponentChildren };

/** What is chosen, with an Edit button that opens a list of boxes to tick. Saves on every tick. */
const MultiPicker = ({ summary, items, chosen, min = 0, onChange }: {
  summary: preact.ComponentChildren; items: Choice[]; chosen: string[]; min?: number; onChange: (next: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ids = new Set(chosen);
  const q = query.trim().toLowerCase();
  const shown = items.filter((i) => !q || i.label.toLowerCase().includes(q));
  const toggle = (id: string) => {
    const next = ids.has(id) ? chosen.filter((c) => c !== id) : [...chosen, id];
    if (next.length >= min) onChange(next);
  };
  return (
    <div class="lin-stack lin-stack--tight">
      <div class="sui-row">
        {summary}
        <Button label={open ? 'Done' : 'Edit'} variant="ghost" size="xs" onClick={() => { setOpen(!open); setQuery(''); }} />
      </div>
      {open && (
        <div class="lin-label-picker" onKeyDown={(e) => e.stopPropagation()}>
          {items.length > 8 && <SearchField value={query} onChange={setQuery} placeholder="Find" />}
          <div class="lin-label-list">
            {shown.map((item) => (
              <div class="lin-label-option" key={item.id}>
                {item.icon}
                <Checkbox label={item.label} checked={ids.has(item.id)} onChange={() => toggle(item.id)} />
              </div>
            ))}
            {!shown.length && <span class="sui-muted sui-small">Nothing matches.</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export const ProjectMembersEdit = ({ project }: Props) => {
  const people = usePeople(project);
  const members = project.members.nodes;
  return (
    <MultiPicker
      summary={members.length
        ? <span class="sui-row">{members.slice(0, 3).map((m) => <Avatar key={m.id} name={m.name} url={m.avatarUrl} size={16} />)}<span class="sui-small">{members.length} {members.length === 1 ? 'member' : 'members'}</span></span>
        : <span class="sui-muted">No members</span>}
      items={people.map((p) => ({ id: p.id, label: p.name, icon: <Avatar name={p.name} url={p.avatarUrl} size={16} /> }))}
      chosen={members.map((m) => m.id)}
      onChange={(next) => { void saveProject(project, { input: { memberIds: next }, patch: { members: { nodes: next.flatMap((id) => people.find((p) => p.id === id) ?? []) } } }); }}
    />
  );
};

export const ProjectTeamsEdit = ({ project }: Props) => {
  const teams = useWorkspace().data?.teams ?? [];
  const current = project.teams.nodes;
  const known = [...teams, ...current.filter((t) => !teams.some((w) => w.id === t.id))];
  return (
    <MultiPicker
      summary={<span>{current.map((t) => t.key).join(', ') || 'None'}</span>}
      items={known.map((t) => ({ id: t.id, label: `${t.name} (${t.key})` }))}
      chosen={current.map((t) => t.id)}
      min={1}
      onChange={(next) => { void saveProject(project, { input: { teamIds: next }, patch: { teams: { nodes: next.flatMap((id) => known.filter((t) => t.id === id).map(({ id: tid, key, name }) => ({ id: tid, key, name }))) } } }); }}
    />
  );
};

const DateField = ({ value, label, onChange }: { value: string | null; label: string; onChange: (next: string | null) => void }) => (
  <span class="lin-prop-edit">
    <input
      type="date"
      class="lin-date"
      aria-label={label}
      value={value ?? ''}
      onChange={(event) => onChange((event.target as HTMLInputElement).value || null)}
    />
    {value && <Button label="Clear" variant="ghost" size="xs" onClick={() => onChange(null)} />}
  </span>
);

export const ProjectDatesEdit = ({ project }: Props) => {
  const set = (key: 'startDate' | 'targetDate') => (next: string | null) => {
    if (next !== project[key]) void saveProject(project, { input: { [key]: next }, patch: { [key]: next } });
  };
  return (
    <span class="lin-project-dates">
      <DateField value={project.startDate} label="Start date" onChange={set('startDate')} />
      <span class="sui-muted sui-small">to</span>
      <DateField value={project.targetDate} label="Target date" onChange={set('targetDate')} />
    </span>
  );
};

type Milestone = ProjectDetail['projectMilestones']['nodes'][number];

/** Adds a milestone, or edits one: name, target date and description. Deleting asks once more. */
export const MilestoneForm = ({ project, milestone, onDone }: { project: Pick<ProjectDetail, 'id'>; milestone?: Milestone; onDone: () => void }) => {
  const [name, setName] = useState(milestone?.name ?? '');
  const [description, setDescription] = useState(milestone?.description ?? '');
  const [targetDate, setTargetDate] = useState<string | null>(milestone?.targetDate ?? null);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    try {
      await action();
      onDone();
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };
  const save = () => {
    if (!name.trim() || busy) return;
    const input: MilestoneInput = { name: name.trim(), description: description.trim() || null, targetDate };
    void run(() => (milestone ? updateMilestone(project.id, milestone.id, input) : createMilestone(project.id, input)));
  };
  return (
    <div class="lin-stack lin-stack--tight lin-milestone-form" onKeyDown={keepKeys((e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) save(); if (e.key === 'Escape') onDone(); })}>
      <TextField value={name} onChange={setName} label="Milestone name" placeholder="Milestone name" disabled={busy} />
      <DateField value={targetDate} label="Target date" onChange={setTargetDate} />
      <TextField value={description} onChange={setDescription} multiline rows={3} label="Description" placeholder="Description. Cmd+Enter saves." disabled={busy} />
      <div class="sui-row">
        <Button label={busy ? 'Saving...' : milestone ? 'Save' : 'Add Milestone'} size="xs" disabled={busy || !name.trim()} onClick={save} />
        <Button label="Cancel" variant="ghost" size="xs" disabled={busy} onClick={onDone} />
        <span class="sui-grow" />
        {milestone && !confirming && <Button label="Delete" variant="ghost" size="xs" disabled={busy} onClick={() => setConfirming(true)} />}
        {milestone && confirming && (
          <>
            <span class="sui-small sui-muted">Its issues stay in the project.</span>
            <Button label="Delete Milestone" variant="outline" size="xs" disabled={busy} onClick={() => { void run(() => deleteMilestone(project.id, milestone.id)); }} />
          </>
        )}
      </div>
    </div>
  );
};

// The icon in front of a group's name: a status icon, a person, a priority, a project, a cycle or a label.
import { Avatar, CycleGlyph, PriorityGlyph, ProjectIcon, StatusGlyph } from '../../shared/glyphs.tsx';
import type { Group } from '../../shared/grouping.ts';

export const GroupIcon = ({ group }: { group: Group }) => {
  const sample = group.sample;
  switch (group.field) {
    case 'status': {
      const state = group.state ?? sample?.state;
      return state ? <StatusGlyph type={state.type} color={state.color} teamId={group.teamId ?? sample?.team.id} stateId={state.id} size={16} /> : null;
    }
    case 'assignee': {
      const person = sample?.assignee ?? group.person;
      return person ? <Avatar name={person.name} url={person.avatarUrl} /> : <span class="lin-avatar-empty" />;
    }
    case 'priority':
      return <PriorityGlyph priority={Number(group.key)} size={16} />;
    case 'project': {
      const project = sample?.project ?? group.project;
      return project ? <ProjectIcon icon={project.icon} color={project.color} size={16} /> : null;
    }
    case 'cycle':
      return group.key === 'none' ? null : <CycleGlyph size={16} />;
    case 'label':
      return group.label ? <span class="lin-swatch" style={{ background: group.label.color }} /> : null;
    default:
      return null;
  }
};

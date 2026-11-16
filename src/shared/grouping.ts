// Splits issues into groups by a field: the list's groups, the board's columns and rows.
import { priorityRank, type GroupField } from './view-options.ts';
import type { IssueRow, Label, StateType, User, WorkflowState } from './types.ts';

/** Workflow order, left to right: triage, backlog, unstarted, started, then done and canceled. */
export const STATE_TYPE_ORDER: readonly StateType[] = ['triage', 'backlog', 'unstarted', 'started', 'completed', 'canceled', 'duplicate'];

/** Linear's `position` can run into the thousands, so type and position are compared in turn, never added. */
export const compareStates = (a: Pick<WorkflowState, 'type' | 'position'>, b: Pick<WorkflowState, 'type' | 'position'>): number =>
  STATE_TYPE_ORDER.indexOf(a.type) - STATE_TYPE_ORDER.indexOf(b.type) || a.position - b.position;

export type Group = {
  key: string;
  title: string;
  field: GroupField;
  /** Sort keys, ascending. */
  rank: [number, number];
  issues: IssueRow[];
  /** An issue in the group, or null for one made only to show an empty column. */
  sample: IssueRow | null;
  /** The group's status, for the icon and for moving an issue there. Set when one team's state. */
  state: WorkflowState | null;
  teamId: string | null;
  label: Label | null;
  /** The person or project of a group made only to show it empty; groups with issues read it from `sample`. */
  person: User | null;
  project: { id: string; name: string; icon: string | null; color: string } | null;
};

export const statusKey = (state: Pick<WorkflowState, 'type' | 'name'>) => `${state.type}|${state.name}`;

type Placement = { key: string; title: string; rank: [number, number]; state?: WorkflowState; teamId?: string; label?: Label };

const placementsOf = (issue: IssueRow, field: GroupField): Placement[] => {
  switch (field) {
    case 'status': {
      const s = issue.state;
      return [{ key: statusKey(s), title: s.name, rank: [STATE_TYPE_ORDER.indexOf(s.type), s.position], state: s, teamId: issue.team.id }];
    }
    case 'assignee':
      return [issue.assignee ? { key: issue.assignee.id, title: issue.assignee.name, rank: [0, 0] } : { key: 'none', title: 'No assignee', rank: [1, 0] }];
    case 'priority':
      return [{ key: String(issue.priority), title: PRIORITY_NAMES[issue.priority] ?? 'No priority', rank: [priorityRank(issue.priority), 0] }];
    case 'project':
      return [issue.project ? { key: issue.project.id, title: issue.project.name, rank: [0, 0] } : { key: 'none', title: 'No project', rank: [1, 0] }];
    case 'cycle':
      return [issue.cycle ? { key: issue.cycle.id, title: `Cycle ${issue.cycle.number}`, rank: [0, -issue.cycle.number] } : { key: 'none', title: 'No cycle', rank: [1, 0] }];
    case 'label': {
      const labels = issue.labels.nodes;
      return labels.length ? labels.map((label) => ({ key: label.id, title: label.name, rank: [0, 0] as [number, number], label })) : [{ key: 'none', title: 'No label', rank: [1, 0] }];
    }
    default:
      return [{ key: 'all', title: 'All issues', rank: [0, 0] }];
  }
};

/** The keys of the groups an issue sits in for a field. An issue can sit in several label groups. */
export const groupKeysOf = (issue: IssueRow, field: GroupField): string[] => placementsOf(issue, field).map((p) => p.key);

export const PRIORITY_NAMES = ['No priority', 'Urgent', 'High', 'Medium', 'Low'] as const;

/** What an empty group can be made from: the states of the teams in scope, their people, labels and projects. */
export type Seeds = {
  statesByTeam: ReadonlyMap<string, WorkflowState[]>;
  /** Teams in scope. Their states show even when none of the loaded issues is in the team. */
  teamIds?: readonly string[];
  people?: readonly User[];
  labels?: readonly Label[];
  projects?: readonly { id: string; name: string; icon: string | null; color: string }[];
};

const blank = (key: string, title: string, field: GroupField, rank: [number, number]): Group => ({
  key, title, field, rank, issues: [], sample: null, state: null, teamId: null, label: null, person: null, project: null,
});

/**
 * Groups worth showing even when empty: every state of the teams in scope (states of the same name
 * and type merge across teams), every priority, and the people, labels and projects handed in.
 */
const seedsOf = (field: GroupField, issues: IssueRow[], seeds: Seeds): Group[] => {
  switch (field) {
    case 'priority':
      return [0, 1, 2, 3, 4].map((p) => blank(String(p), PRIORITY_NAMES[p]!, field, [priorityRank(p), 0]));
    case 'status': {
      const teams = new Set([...(seeds.teamIds ?? []), ...issues.map((i) => i.team.id)]);
      const found = new Map<string, Group>();
      for (const teamId of teams) {
        for (const state of seeds.statesByTeam.get(teamId) ?? []) {
          if (state.type === 'triage' || state.type === 'duplicate') continue;
          const key = statusKey(state);
          if (!found.has(key)) found.set(key, { ...blank(key, state.name, field, [STATE_TYPE_ORDER.indexOf(state.type), state.position]), state, teamId });
        }
      }
      return [...found.values()];
    }
    case 'assignee':
      return (seeds.people ?? []).map((person) => ({ ...blank(person.id, person.name, field, [0, 0]), person }));
    case 'label':
      return (seeds.labels ?? []).map((label) => ({ ...blank(label.id, label.name, field, [0, 0]), label }));
    case 'project':
      return (seeds.projects ?? []).map((project) => ({ ...blank(project.id, project.name, field, [0, 0]), project }));
    default:
      return [];
  }
};

export const groupIssues = (
  issues: IssueRow[],
  field: GroupField,
  order: 'asc' | 'desc' = 'asc',
  seed?: Seeds,
): Group[] => {
  const groups = new Map<string, Group>();
  for (const empty of seed ? seedsOf(field, issues, seed) : []) groups.set(empty.key, empty);
  for (const issue of issues) {
    for (const p of placementsOf(issue, field)) {
      let group = groups.get(p.key);
      if (!group) {
        group = { ...blank(p.key, p.title, field, p.rank), sample: issue, state: p.state ?? null, teamId: p.teamId ?? null, label: p.label ?? null };
        groups.set(p.key, group);
      }
      group.sample ??= issue;
      group.state ??= p.state ?? null;
      group.issues.push(issue);
    }
  }
  const sorted = [...groups.values()].sort((a, b) => a.rank[0] - b.rank[0] || a.rank[1] - b.rank[1] || a.title.localeCompare(b.title));
  return order === 'desc' ? sorted.reverse() : sorted;
};

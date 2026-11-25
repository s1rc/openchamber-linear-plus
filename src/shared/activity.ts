// A project's activity. Linear records changes to a project as JSON entries in ProjectHistory: each
// entry has a `type` (status, leadId, members, teams, milestones, priority, dates, name, ...), `from`
// and `to` or `added` and `removed`, `at` in epoch ms, and `actorId` or `actorIds`. The shape is not
// in the schema, so every read here is defensive and an unknown entry still renders as a change.
import { PRIORITY_NAMES } from './grouping.ts';
import { shortDate } from './format.ts';
import type { ProjectHistoryNode } from './types.ts';

export type ProjectEvent = {
  id: string;
  /** Epoch ms. */
  at: number;
  actorId: string | null;
  entry: Record<string, unknown>;
};

/** Every entry of every history record, newest first. */
export const projectEvents = (nodes: readonly ProjectHistoryNode[]): ProjectEvent[] => {
  const events: ProjectEvent[] = [];
  for (const node of nodes) {
    if (!Array.isArray(node.entries)) continue;
    for (const raw of node.entries) {
      if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) continue;
      const entry = raw as Record<string, unknown>;
      const at = typeof entry.at === 'number' ? entry.at : new Date(node.createdAt).getTime();
      const actorId = typeof entry.actorId === 'string'
        ? entry.actorId
        : Array.isArray(entry.actorIds) && typeof entry.actorIds[0] === 'string' ? entry.actorIds[0] : null;
      events.push({ id: `${node.id}:${events.length}`, at: Number.isFinite(at) ? at : 0, actorId, entry });
    }
  }
  return events.sort((a, b) => b.at - a.at);
};

/** A value as Linear writes it: a name, an id, or an object with a name. */
const text = (value: unknown): string | null => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const v = value as Record<string, unknown>;
    for (const key of ['name', 'title', 'key']) if (typeof v[key] === 'string') return v[key];
  }
  return null;
};

const list = (value: unknown): string[] => {
  const items = Array.isArray(value) ? value : [value];
  return items.map(text).filter((v): v is string => Boolean(v));
};

const names = (value: unknown, nameOf: (id: string) => string | undefined): string[] =>
  list(value).map((v) => nameOf(v) ?? v);

const join = (items: string[]): string => items.length <= 1 ? (items[0] ?? '') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

/** What happened, without the actor: "changed status from To Do to In Progress". */
export const describeProjectEvent = (event: ProjectEvent, nameOf: (id: string) => string | undefined): string => {
  const e = event.entry;
  const type = typeof e.type === 'string' ? e.type : '';
  const from = text(e.from);
  const to = text(e.to);
  const added = names(e.added, nameOf);
  const removed = names(e.removed, nameOf);
  switch (type) {
    case 'status':
      return from && to ? `changed status from ${from} to ${to}` : to ? `set status to ${to}` : 'changed the status';
    case 'leadId':
    case 'lead':
      return to ? `set the lead to ${nameOf(to) ?? to}` : 'removed the lead';
    case 'members':
      return join([added.length ? `added ${join(added)} as ${added.length === 1 ? 'a member' : 'members'}` : '', removed.length ? `removed ${join(removed)}` : ''].filter(Boolean)) || 'changed the members';
    case 'teams':
      return join([added.length ? `added ${join(added)} as ${added.length === 1 ? 'a team' : 'teams'}` : '', removed.length ? `removed ${join(removed)}` : ''].filter(Boolean)) || 'changed the teams';
    case 'milestones':
      return join([added.length ? `added milestone ${join(added)}` : '', removed.length ? `removed milestone ${join(removed)}` : ''].filter(Boolean)) || 'changed the milestones';
    case 'priority': {
      const p = Number(e.to);
      return `set priority to ${Number.isInteger(p) && p >= 0 && p <= 4 ? PRIORITY_NAMES[p] : (to ?? 'none')}`;
    }
    case 'startDate':
    case 'targetDate': {
      const label = type === 'startDate' ? 'start date' : 'target date';
      return to ? `set ${label} to ${shortDate(to) || to}` : `removed the ${label}`;
    }
    case 'dates':
      return 'changed the dates';
    case 'name':
      return to ? `renamed the project to ${to}` : 'renamed the project';
    case 'description':
    case 'content':
      return 'updated the description';
    case 'health':
      return to ? `set health to ${to}` : 'changed the health';
    default:
      return 'updated the project';
  }
};

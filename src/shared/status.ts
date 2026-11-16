// What the Work Status section shows, worked out from Linear's answers. Pure: no host.
import { daysUntil, percent } from './format.ts';
import { statusKey } from './grouping.ts';
import type { CycleSummary, StateType, StatusCountNode, StatusMineIssue } from './types.ts';
import { priorityRank } from './view-options.ts';

/** Where a status falls on screen: what is being worked on first, the backlog last. */
const RANK: Record<string, number> = { started: 0, unstarted: 1, triage: 2, backlog: 3 };
const rankOf = (type: StateType) => RANK[type] ?? 9;

export type StatusCount = {
  key: string;
  name: string;
  type: StateType;
  color: string;
  position: number;
  count: number;
  /** A team and status of the group, for the glyph's fill. */
  teamId: string;
  stateId: string;
};

/** Open issues counted by status. Statuses with the same name and type in different teams count together. */
export const countByStatus = (nodes: readonly StatusCountNode[]): StatusCount[] => {
  const byKey = new Map<string, StatusCount>();
  for (const { state, team } of nodes) {
    const key = statusKey(state);
    const found = byKey.get(key);
    if (found) found.count += 1;
    else byKey.set(key, { key, name: state.name, type: state.type, color: state.color, position: state.position, count: 1, teamId: team.id, stateId: state.id });
  }
  return [...byKey.values()].sort((a, b) => rankOf(a.type) - rankOf(b.type) || a.position - b.position || a.name.localeCompare(b.name));
};

export const MAX_CHIPS = 6;

/** The chips to draw, and the statuses left out. */
export const limitCounts = (counts: readonly StatusCount[], max = MAX_CHIPS): { shown: StatusCount[]; hidden: StatusCount[] } => ({
  shown: counts.slice(0, max),
  hidden: counts.slice(max),
});

export const MAX_MINE = 5;

/** My issues for the section: started first, then by priority (urgent first), then the most recently updated. */
export const sortMine = (issues: readonly StatusMineIssue[], max = MAX_MINE): StatusMineIssue[] =>
  [...issues]
    .sort((a, b) => rankOf(a.state.type) - rankOf(b.state.type) || priorityRank(a.priority) - priorityRank(b.priority) || b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, max);

/** "4 days left", "ends today", "ended". */
export const daysLeftText = (endsAt: string, now = new Date()): string | null => {
  const left = daysUntil(endsAt, now);
  if (left === null) return null;
  if (left < 0) return 'ended';
  if (left === 0) return 'ends today';
  return left === 1 ? '1 day left' : `${left} days left`;
};

/** "Cycle 42 · 60% · 4 days left", with the team key in front when several teams are shown. */
export const cycleLine = (cycle: Pick<CycleSummary, 'number' | 'progress' | 'endsAt'>, teamKey: string | null, now = new Date()): string =>
  [teamKey ? `${teamKey} cycle ${cycle.number}` : `Cycle ${cycle.number}`, percent(cycle.progress), daysLeftText(cycle.endsAt, now)].filter(Boolean).join(' \u00b7 ');

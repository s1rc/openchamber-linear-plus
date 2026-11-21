// A project's milestones: how many issues each holds, as Linear shows beside the percent, and the filter
// that lists one milestone's issues. Pure.
import type { Filter } from './filters.ts';

/** Issues per milestone id, every state counted. Issues in no milestone are left out. */
export const milestoneCounts = (issues: readonly { projectMilestone: { id: string } | null }[]): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const issue of issues) {
    const id = issue.projectMilestone?.id;
    if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return counts;
};

/** "12 issues", "1 issue", or null while the count is not known. */
export const issueCountText = (count: number | undefined): string | null =>
  count === undefined ? null : `${count} ${count === 1 ? 'issue' : 'issues'}`;

/** One milestone's issues in every state: a milestone is small, and its done work is part of what it shows. */
export const milestoneFilter = (milestoneId: string): Filter => ({ projectMilestone: { id: { eq: milestoneId } } });

import type { Notification } from './types.ts';

/** Whether a notification belongs to the folder's teams or projects. Others (documents, the workspace) do not. */
export const inScope = (n: Notification, teamIds: readonly string[], projectIds: readonly string[]): boolean => {
  if (n.issue) return teamIds.includes(n.issue.team.id) || Boolean(n.issue.project && projectIds.includes(n.issue.project.id));
  if (n.project) return projectIds.includes(n.project.id) || (n.project.teams?.nodes ?? []).some((t) => teamIds.includes(t.id));
  return false;
};

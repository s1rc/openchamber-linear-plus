import { HEALTH_LABEL } from './format.ts';
import type { Notification } from './types.ts';

/** Whether a notification belongs to the folder's teams or projects. Others (documents, the workspace) do not. */
export const inScope = (n: Notification, teamIds: readonly string[], projectIds: readonly string[]): boolean => {
  if (n.issue) return teamIds.includes(n.issue.team.id) || Boolean(n.issue.project && projectIds.includes(n.issue.project.id));
  if (n.project) return projectIds.includes(n.project.id) || (n.project.teams?.nodes ?? []).some((t) => teamIds.includes(t.id));
  return false;
};

const CATEGORY_WORDS: Record<string, string> = {
  assignments: 'assigned you',
  commentsAndReplies: 'commented',
  mentions: 'mentioned you',
  statusChanges: 'changed the status',
  reactions: 'reacted',
  postsAndUpdates: 'posted an update',
  documentChanges: 'changed a document',
  subscriptions: 'updated',
  reviews: 'asked for your review',
  triage: 'added to triage',
  customers: 'added a customer request',
};

const HEALTH: Record<string, string> = HEALTH_LABEL;

const SYSTEM_WORDS: Record<string, string> = { reminders: 'Reminder', triage: 'New in triage', system: 'From Linear' };

/** `issueStatusChanged` as `Issue status changed`, for a category the words above do not cover. */
const humanize = (type: string): string => {
  const words = type.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase();
  return words ? words[0]!.toUpperCase() + words.slice(1) : 'Notification';
};

/**
 * What a notification says and where it leads, from fields Linear publishes: the title is what it is about, the
 * detail who did what (as Linear's inbox writes it), the url the issue, update, document or project.
 */
export const notificationText = (n: Notification): { title: string; detail: string; url: string | null } => {
  const actor = n.actor?.name ?? null;
  const done = CATEGORY_WORDS[n.category];
  let detail = actor && done ? `${actor} ${done}` : SYSTEM_WORDS[n.category] ?? humanize(n.type);
  if (n.category === 'reactions' && n.reactionEmoji) detail += ` ${n.reactionEmoji}`;
  if (n.category === 'statusChanges' && n.issue) detail += ` to ${n.issue.state.name}`;
  if (n.projectUpdate && HEALTH[n.projectUpdate.health]) detail += `: ${HEALTH[n.projectUpdate.health]}`;
  const title = n.issue?.title ?? n.document?.title ?? n.project?.name ?? humanize(n.type);
  const url = n.issue?.url ?? n.projectUpdate?.url ?? n.document?.url ?? n.project?.url ?? null;
  return { title, detail, url };
};

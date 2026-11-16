// The text an agent reads about an issue, for attaching it to a message or starting a session with it.
import { shortDate } from './format.ts';
import type { IssueDetail as Detail } from './types.ts';

const PRIORITY_NAME = ['No priority', 'Urgent', 'High', 'Medium', 'Low'] as const;

/** What an agent reads when the issue is attached to a message. */
export const issueContext = (issue: Detail): string => {
  const lines = [
    `${issue.identifier}: ${issue.title}`,
    `Status: ${issue.state.name}. Priority: ${PRIORITY_NAME[issue.priority]}. Team: ${issue.team.name}.`,
    issue.project ? `Project: ${issue.project.name}.` : '',
    issue.assignee ? `Assignee: ${issue.assignee.name}.` : '',
    `Link: ${issue.url}`,
    `Branch: ${issue.branchName}`,
    '',
    issue.description?.trim() ?? '',
  ];
  const comments = issue.comments.nodes.slice(-5).map((c) => `${c.user?.name ?? 'Someone'} (${shortDate(c.createdAt)}): ${c.body}`);
  const text = [...lines, ...(comments.length ? ['', 'Latest comments:', ...comments] : [])].filter((l, i, a) => l || a[i - 1]).join('\n');
  return text.length > 15_000 ? `${text.slice(0, 15_000)}\n[cut]` : text;
};

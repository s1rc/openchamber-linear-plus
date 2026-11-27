// Records where related work lives. The plan names Linear issues; their merge request, pull request
// and project links supply the repositories, so the written plan and build handoff need no guesswork.
import { keysFilter } from './block-args.ts';
import { repoFromChangeUrl, type Repo } from './detect.ts';
import { gql } from './linear.ts';
import { ISSUES_BY_KEYS } from './queries.ts';
import type { IssueDetail, IssueRow, IssuesByKeysResult } from './types.ts';

const IDENTIFIER = /(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6}-\d{1,9})(?![A-Za-z0-9])/g;
const HEADING = /^## Related repositories$/m;

/** A repository root linked from an issue, as well as its merge and pull request links. */
export const repositoryFromIssueUrl = (url: string): Repo | null => {
  const change = repoFromChangeUrl(url);
  if (change) return change;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    let path = parsed.pathname.replace(/^\/+|\/+$/g, '').replace(/\.git$/, '');
    if (host === 'gitlab.com') {
      const marker = path.indexOf('/-/');
      if (marker >= 0) path = path.slice(0, marker);
      return path.split('/').length >= 2 ? { host, path } : null;
    }
    if (host === 'github.com') {
      const parts = path.split('/');
      return parts.length >= 2 ? { host, path: parts.slice(0, 2).join('/') } : null;
    }
  } catch {
    return null;
  }
  return null;
};

const name = (repo: Repo): string => `${repo.host}/${repo.path}`;

const repositoriesOf = (issue: Pick<IssueRow, 'attachments'>): Repo[] => {
  const found = new Map<string, Repo>();
  for (const link of issue.attachments?.nodes ?? []) {
    const repo = repositoryFromIssueUrl(link.url);
    if (repo) found.set(name(repo), repo);
  }
  return [...found.values()];
};

/** Identifiers the plan names, in plan order, without the issue being planned. */
export const planIssueIdentifiers = (plan: string, identifier: string): string[] => {
  const found: string[] = [];
  for (const match of plan.matchAll(IDENTIFIER)) {
    const id = match[1]!.toUpperCase();
    if (id !== identifier.toUpperCase() && !found.includes(id)) found.push(id);
    if (found.length >= 25) break;
  }
  return found;
};

/** Adds the other repositories named issues link to. An existing section is left alone. */
export const withRelatedRepositories = async (plan: string, planned: IssueDetail): Promise<string> => {
  if (HEADING.test(plan)) return plan;
  const identifiers = planIssueIdentifiers(plan, planned.identifier);
  if (!identifiers.length) return plan;
  const data = await gql<IssuesByKeysResult>(ISSUES_BY_KEYS, { filter: keysFilter(identifiers) });
  const own = new Map<string, Repo>();
  for (const link of [...(planned.links?.nodes ?? []), ...(planned.attachments?.nodes ?? [])]) {
    const repo = repositoryFromIssueUrl(link.url);
    if (repo) own.set(name(repo), repo);
  }
  const rows = identifiers.flatMap((identifier) => {
    const issue = data.issues.nodes.find((row) => row.identifier.toUpperCase() === identifier);
    if (!issue) return [];
    const repositories = repositoriesOf(issue).filter((repo) => !own.has(name(repo)));
    return repositories.length ? [{ issue, repositories }] : [];
  });
  if (!rows.length) return plan;
  const section = [
    '## Related repositories',
    '',
    ...rows.map(({ issue, repositories }) => `- [${issue.identifier}](${issue.url}): ${repositories.map((repo) => `\`${name(repo)}\``).join(', ')}`),
  ].join('\n');
  const text = plan.trim();
  const firstBreak = text.indexOf('\n');
  if (/^#[ \t]+/.test(text) && firstBreak > 0) return `${text.slice(0, firstBreak)}\n\n${section}\n\n${text.slice(firstBreak).trimStart()}`;
  return `${section}\n\n${text}`;
};

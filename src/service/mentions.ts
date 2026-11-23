// The `@` rows and what a picked row gives the agent. Pure: the service hands it the cached snapshots, the recent
// issues, and what Linear answered when the optional API key is set.
import type { MentionsItem } from '@openchamber/sdk';
import { HEALTH_LABEL, percent, shortDate } from '../shared/format.ts';
import type { DirSnapshot, RecentIssues, SnapDoc, SnapIssue, SnapProject } from './types.ts';

export const ROWS_MAX = 20;
const TEXT_LIMIT = 15_000;
const TITLE_MAX = 120;

const clip = (text: string, max = TITLE_MAX): string => {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 3)}...` : flat;
};

export const projectRowId = (id: string): string => `project:${id}`;
export const docRowId = (id: string): string => `doc:${id}`;
export const issueRowId = (identifier: string): string => `issue:${identifier}`;

/** Issue rows shown at most, so a query that matches many issues still leaves room for projects. */
export const ISSUE_ROWS_MAX = 12;
/** Issues listed for `@` alone, under the branch's issue. */
const EMPTY_ISSUES = 6;

const KEY = /^[A-Za-z][A-Za-z0-9]{0,6}-\d{1,9}$/;
/** The issue key a query is, such as `nil-784`, upper-cased; null for words. */
export const keyOf = (query: string): string | null => (KEY.test(query.trim()) ? query.trim().toUpperCase() : null);

const issueRow = (issue: SnapIssue, note?: string): MentionsItem => ({
  id: issueRowId(issue.identifier),
  title: clip(issue.title ? `${issue.identifier} ${issue.title}` : issue.identifier),
  subtitle: clip(['Issue', issue.state, note].filter(Boolean).join(' \u00b7 ')),
  ...(issue.url ? { url: issue.url } : {}),
});

/**
 * Every issue the service knows, nearest first: what Linear just answered, the composer folder's branch issue and
 * assigned issues, the issues you opened, other folders', then your assigned issues anywhere. One row per key.
 */
const knownIssues = (snapshots: readonly { snapshot: DirSnapshot; preferred: boolean }[], recent: RecentIssues | null, live: readonly SnapIssue[]) => {
  const preferred = snapshots.filter((s) => s.preferred).map((s) => s.snapshot);
  const others = snapshots.filter((s) => !s.preferred).map((s) => s.snapshot);
  const ordered = [
    ...live,
    ...preferred.flatMap((s) => [s.branchIssue, ...s.myIssues]),
    ...(recent?.opened ?? []),
    ...others.flatMap((s) => [s.branchIssue, ...s.myIssues]),
    ...(recent?.assigned ?? []),
  ].filter((i): i is SnapIssue => Boolean(i?.identifier));
  const seen = new Map<string, SnapIssue>();
  for (const issue of ordered) {
    const had = seen.get(issue.identifier);
    // A later copy with more to read (a title, the full text) fills in what the nearer one lacks.
    if (!had) seen.set(issue.identifier, issue);
    else seen.set(issue.identifier, { ...issue, ...had, title: had.title || issue.title, text: had.text ?? issue.text, url: had.url ?? issue.url });
  }
  return [...seen.values()];
};

/** The issue rows for a query; `exact` is the row for a typed key, which goes above everything else. */
const issueRows = (query: string, snapshots: readonly { snapshot: DirSnapshot; preferred: boolean }[], recent: RecentIssues | null, live: readonly SnapIssue[]) => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const issues = knownIssues(snapshots, recent, live);
  const key = keyOf(query);
  if (key) {
    const found = issues.find((i) => i.identifier === key);
    return { exact: [found ? issueRow(found) : issueRow({ identifier: key, title: '', state: '' }, 'not cached')], rest: [] };
  }
  if (!words.length) {
    const branch = snapshots.find((s) => s.preferred)?.snapshot.branchIssue;
    return {
      exact: branch ? [issueRow(branch, 'this branch')] : [],
      rest: issues.filter((i) => i.identifier !== branch?.identifier).slice(0, EMPTY_ISSUES).map((i) => issueRow(i)),
    };
  }
  const matched = issues.filter((i) => {
    const hay = `${i.identifier} ${i.title} ${i.state}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
  return { exact: [], rest: matched.slice(0, ISSUE_ROWS_MAX).map((i) => issueRow(i)) };
};

type Candidate = { row: MentionsItem; preferred: boolean; name: string };

/**
 * Rows for a typed query: issues first (a typed key above all), then projects and documents, the composer's folder
 * first. `@` alone lists the branch's issue, a few of yours, and the folder's projects.
 */
export const mentionRows = (
  query: string,
  snapshots: readonly { snapshot: DirSnapshot; preferred: boolean }[],
  recent: RecentIssues | null = null,
  live: readonly SnapIssue[] = [],
): MentionsItem[] => {
  const issues = issueRows(query, snapshots, recent, live);
  return [...issues.exact, ...issues.rest, ...projectRows(query, snapshots)].slice(0, ROWS_MAX);
};

/** Projects and documents for a query; an empty query lists the projects only. */
const projectRows = (query: string, snapshots: readonly { snapshot: DirSnapshot; preferred: boolean }[]): MentionsItem[] => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const found: Candidate[] = [];
  const matches = (...texts: (string | null)[]) => {
    const hay = texts.filter(Boolean).join(' ').toLowerCase();
    return words.every((word) => hay.includes(word));
  };
  // The composer's folder is read first, so a project both hold is listed as that folder's.
  for (const { snapshot, preferred } of [...snapshots].sort((a, b) => Number(b.preferred) - Number(a.preferred))) {
    for (const project of snapshot.projects) {
      const id = projectRowId(project.id);
      if (seen.has(id) || !matches(project.name, project.teams.join(' '), project.status)) continue;
      seen.add(id);
      found.push({
        preferred,
        name: project.name,
        row: {
          id,
          title: clip(project.name),
          subtitle: clip(['Project', project.teams.join(', '), project.status].filter(Boolean).join(' \u00b7 ')),
          url: project.url,
        },
      });
    }
    if (!words.length) continue;
    for (const doc of snapshot.documents) {
      const id = docRowId(doc.id);
      if (seen.has(id) || !matches(doc.title, doc.project)) continue;
      seen.add(id);
      found.push({
        preferred,
        name: doc.title,
        row: { id, title: clip(doc.title), subtitle: clip(['Doc', doc.project].filter(Boolean).join(' \u00b7 ')), url: doc.url },
      });
    }
  }
  const first = words[0] ?? '';
  const rank = (c: Candidate) => (c.preferred ? 0 : 2) + (first && c.name.toLowerCase().startsWith(first) ? 0 : 1);
  return found
    .sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name))
    .slice(0, ROWS_MAX)
    .map((c) => c.row);
};

const fit = (text: string): string => (text.length > TEXT_LIMIT ? `${text.slice(0, TEXT_LIMIT)}\n[cut]` : text);

export const cachedNote = (at: number): string => `(cached at ${new Date(at).toISOString().slice(0, 16).replace('T', ' ')} UTC)`;

/** What the agent reads for a project when only the cache is known: a frame's full overview, else the summary. */
export const projectMarkdown = (project: SnapProject, cachedAt: number | null): string => {
  const base = project.text?.trim()
    ?? [
      `Linear project: ${project.name}`,
      `Status: ${project.status}.${project.health ? ` Health: ${HEALTH_LABEL[project.health as keyof typeof HEALTH_LABEL] ?? project.health}.` : ''} Progress: ${percent(project.progress)}.`,
      project.teams.length ? `Teams: ${project.teams.join(', ')}.` : '',
      project.targetDate ? `Target: ${shortDate(project.targetDate)}.` : '',
      `Link: ${project.url}`,
    ].filter(Boolean).join('\n');
  return fit(cachedAt ? `${base}\n\n${cachedNote(cachedAt)}` : base);
};

export const docMarkdown = (doc: SnapDoc, cachedAt: number | null): string => {
  const base = doc.text?.trim()
    ?? [`Linear document: ${doc.title}`, doc.project ? `Project: ${doc.project}.` : '', `Link: ${doc.url}`, '', 'The content is not cached yet. Open the document in Linear, or add a Linear personal API key in Settings, Integrations.'].filter((l, i) => l || i === 3).join('\n');
  return fit(cachedAt ? `${base}\n\n${cachedNote(cachedAt)}` : base);
};

/** What the agent reads for an issue when only the cache is known: a frame's full text, else the summary. */
export const issueMarkdown = (issue: SnapIssue, cachedAt: number | null, orgKey?: string): string => {
  const url = issue.url ?? (orgKey ? `https://linear.app/${orgKey}/issue/${issue.identifier}` : null);
  const base = issue.text?.trim()
    ?? [
      issue.title ? `${issue.identifier}: ${issue.title}` : `Linear issue ${issue.identifier}`,
      issue.state ? `Status: ${issue.state}.` : '',
      url ? `Link: ${url}` : '',
      issue.description?.trim() ? `\n${issue.description.trim()}` : '',
      issue.text || issue.description ? '' : '\nOnly the summary is cached. Read the issue with your Linear tools, open it once in the Linear+ dashboard, or add a Linear personal API key in Settings, Integrations.',
    ].filter(Boolean).join('\n');
  return fit(cachedAt ? `${base}\n\n${cachedNote(cachedAt)}` : base);
};

/** An issue the service holds, by key, with when it was cached. */
export const locateIssue = (identifier: string, snapshots: readonly DirSnapshot[], recent: RecentIssues | null): { issue: SnapIssue; at: number } | null => {
  const rows = snapshots.map((snapshot) => ({ snapshot, preferred: false }));
  const found = knownIssues(rows, recent, []).find((i) => i.identifier === identifier);
  if (!found) return null;
  const at = recent && (recent.opened.some((i) => i.identifier === identifier) || recent.assigned.some((i) => i.identifier === identifier))
    ? recent.at
    : snapshots.find((s) => s.branchIssue?.identifier === identifier || s.myIssues.some((i) => i.identifier === identifier))?.at ?? recent?.at ?? 0;
  return { issue: found, at };
};

export type Located = { kind: 'project'; project: SnapProject; at: number } | { kind: 'doc'; doc: SnapDoc; at: number } | null;

/** Finds a row's item in the cached snapshots. */
export const locate = (rowId: string, snapshots: readonly DirSnapshot[]): Located => {
  const project = rowId.startsWith('project:') ? rowId.slice(8) : null;
  const doc = rowId.startsWith('doc:') ? rowId.slice(4) : null;
  for (const snapshot of snapshots) {
    if (project) {
      const found = snapshot.projects.find((p) => p.id === project);
      if (found) return { kind: 'project', project: found, at: snapshot.at };
    }
    if (doc) {
      const found = snapshot.documents.find((d) => d.id === doc);
      if (found) return { kind: 'doc', doc: found, at: snapshot.at };
    }
  }
  return null;
};

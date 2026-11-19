// The `@` rows and what a picked row gives the agent. Pure: the service hands it the cached snapshots.
import type { MentionsItem } from '@openchamber/sdk';
import { HEALTH_LABEL, percent, shortDate } from '../shared/format.ts';
import type { DirSnapshot, SnapDoc, SnapProject } from './types.ts';

export const ROWS_MAX = 20;
const TEXT_LIMIT = 15_000;
const TITLE_MAX = 120;

const clip = (text: string, max = TITLE_MAX): string => {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 3)}...` : flat;
};

export const projectRowId = (id: string): string => `project:${id}`;
export const docRowId = (id: string): string => `doc:${id}`;

type Candidate = { row: MentionsItem; preferred: boolean; name: string };

/**
 * Rows for a typed query. Projects and documents of the composer's folder come first. An empty query lists that
 * folder's projects, so `@` alone shows what the folder is about.
 */
export const mentionRows = (query: string, snapshots: readonly { snapshot: DirSnapshot; preferred: boolean }[]): MentionsItem[] => {
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

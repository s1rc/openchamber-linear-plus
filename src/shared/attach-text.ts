// The text an agent reads when a Linear project or document is attached to a message. Under the host's
// 16,000 character limit.
import { HEALTH_LABEL, percent, shortDate } from './format.ts';
import { milestoneFraction } from './milestones.ts';
import type { DocumentDetail, ProjectDetail } from './types.ts';

const LIMIT = 15_000;

const fit = (text: string): string => (text.length > LIMIT ? `${text.slice(0, LIMIT)}\n[cut]` : text);

const compact = (lines: readonly string[]): string => lines.filter((l, i, all) => l || all[i - 1]).join('\n').trim();

/** A project's overview: status, health, dates, milestones, the latest update and its description. */
export const projectContext = (project: ProjectDetail): string => {
  const teams = project.teams.nodes.map((t) => t.name).join(', ');
  const milestones = project.projectMilestones.nodes
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((m) => `- ${m.name}${m.targetDate ? ` (${shortDate(m.targetDate)})` : ''}: ${percent(milestoneFraction(m.progress))}`);
  const update = project.projectUpdates.nodes[0];
  const body = (project.content?.trim() || project.description?.trim() || '');
  return fit(compact([
    `Linear project: ${project.name}`,
    `Status: ${project.status.name}.${project.health ? ` Health: ${HEALTH_LABEL[project.health]}.` : ''} Progress: ${percent(project.progress)}.`,
    teams ? `Teams: ${teams}.` : '',
    project.lead ? `Lead: ${project.lead.name}.` : '',
    project.startDate || project.targetDate ? `Dates: ${project.startDate ? `starts ${shortDate(project.startDate)}` : ''}${project.startDate && project.targetDate ? ', ' : ''}${project.targetDate ? `target ${shortDate(project.targetDate)}` : ''}.` : '',
    `Link: ${project.url}`,
    ...(milestones.length ? ['', 'Milestones:', ...milestones] : []),
    ...(update ? ['', `Latest update (${shortDate(update.createdAt)}, ${update.user?.name ?? 'someone'}${update.health ? `, ${HEALTH_LABEL[update.health]}` : ''}):`, update.body.trim()] : []),
    ...(body ? ['', body] : []),
  ]));
};

/** A document's title and content. */
export const documentContext = (doc: DocumentDetail): string =>
  fit(compact([
    `Linear document: ${doc.title}`,
    doc.project ? `Project: ${doc.project.name}.` : '',
    `Link: ${doc.url}`,
    '',
    doc.content?.trim() ?? '',
  ]));

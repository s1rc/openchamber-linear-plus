// The text every agent in a mapped folder reads. Short on purpose: each word costs tokens in every session.
import type { SnapIssue } from './types.ts';

/** What fits the host (4,096) is not the aim: this text is read on every turn. */
export const INSTRUCTIONS_TARGET = 800;
export const INSTRUCTIONS_MAX = 4096;

export type InstructionInput = {
  projects: { name: string; url: string }[];
  teamKeys: string[];
  branchIssue: SnapIssue | null;
  mine: SnapIssue[];
};

const clip = (text: string, max: number): string => {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, Math.max(0, max - 3)).trimEnd()}...` : flat;
};

const issueLine = (issue: SnapIssue, title: number): string => `${issue.identifier} ${clip(issue.title, title)}${issue.state ? ` [${issue.state}]` : ''}`;

type Budget = { mine: number; title: number; description: number; projects: number };

const render = (input: InstructionInput, budget: Budget): string => {
  const lines = ['Linear for this folder (from the Linear+ extension):'];
  const projects = input.projects.slice(0, budget.projects).map((p) => `${clip(p.name, 50)} (${p.url})`);
  const teams = input.teamKeys.slice(0, 4);
  const where = [projects.length ? `Projects: ${projects.join(', ')}` : '', teams.length ? `${teams.length > 1 ? 'teams' : 'team'} ${teams.join(', ')}` : ''].filter(Boolean);
  if (where.length) lines.push(`- ${where.join('; ')}.`);
  const branch = input.branchIssue;
  if (branch) {
    const description = budget.description > 0 && branch.description?.trim() ? ` ${clip(branch.description, budget.description)}` : '';
    lines.push(`- Current branch issue: ${branch.identifier}${branch.title ? ` "${clip(branch.title, 80)}"` : ''}${branch.state ? ` [${branch.state}]` : ''}.${description}`);
  }
  const mine = input.mine.filter((i) => i.identifier !== branch?.identifier).slice(0, budget.mine);
  if (mine.length) lines.push(`- My open issues here: ${mine.map((i) => issueLine(i, budget.title)).join('; ')}.`);
  const example = branch?.identifier ?? input.mine[0]?.identifier ?? (teams[0] ? `${teams[0]}-123` : 'ENG-123');
  lines.push(`- Reference issues as ${example} in commit messages and PR titles so Linear links them.`);
  lines.push('- To show issues in chat, use the LinearIssue, LinearIssueList and LinearPickIssue blocks.');
  return lines.join('\n');
};

/** Shrinks the lists step by step until the text is near the target size. */
export const buildInstructions = (input: InstructionInput): string => {
  const steps: Budget[] = [
    { mine: 10, title: 60, description: 300, projects: 3 },
    { mine: 7, title: 48, description: 200, projects: 3 },
    { mine: 4, title: 40, description: 120, projects: 2 },
    { mine: 2, title: 32, description: 60, projects: 2 },
    { mine: 0, title: 0, description: 0, projects: 1 },
  ];
  let text = '';
  for (const step of steps) {
    text = render(input, step);
    if (text.length <= INSTRUCTIONS_TARGET) return text;
  }
  return text.slice(0, INSTRUCTIONS_MAX);
};

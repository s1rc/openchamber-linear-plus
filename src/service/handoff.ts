// The first message of a build session started from a plan. Pure.
import { EXTRAS_FENCE } from '../shared/plan-extras.ts';
import type { AgentDefaults, ReviewMode } from './types.ts';

/** The host allows 64,000 characters in a prompt. The plan gets most of that; the rest is framing. */
export const PLAN_LIMIT = 40_000;

export type HandoffPromptInput = {
  /** What the build does after the code is written. Missing or `off` stops at the code. */
  review?: { mode: ReviewMode; reviewers: string };
  identifier: string;
  issueTitle?: string | null;
  branch: string | null;
  directory: string;
  planSessionTitle: string | null;
  plan: string;
  /** Titles of the issues the plan split out: separate work the build leaves alone. */
  splitOut?: string[];
};

export const handoffPrompt = (input: HandoffPromptInput): string => {
  const plan = input.plan.trim();
  const body = plan.length > PLAN_LIMIT ? `${plan.slice(0, PLAN_LIMIT).trimEnd()}\n[plan cut]` : plan;
  const head = `Build the plan below for Linear issue ${input.identifier}${input.issueTitle ? ` (${input.issueTitle.replace(/\s+/g, ' ').trim().slice(0, 160)})` : ''}.`;
  const where = [
    `Work in ${input.directory}${input.branch ? `, on branch ${input.branch}` : ''}.`,
    `Reference ${input.identifier} in commit messages and the pull request title so Linear links them.`,
    input.planSessionTitle ? `The plan came from the session "${input.planSessionTitle.replace(/\s+/g, ' ').trim().slice(0, 120)}".` : '',
  ].filter(Boolean);
  const split = (input.splitOut ?? []).filter(Boolean).slice(0, 10);
  if (split.length) {
    where.push(`The plan split these parts into separate Linear issues; leave them out of this build: ${split.map((t) => `"${t.replace(/\s+/g, ' ').trim().slice(0, 160)}"`).join(', ')}.`);
  }
  const finish = input.review && input.review.mode !== 'off' ? reviewSteps(input.review.mode, input.identifier, input.review.reviewers) : ['Implement this plan now. Follow its steps in order, run the project\'s tests, and report what changed.'];
  return [head, '', ...where, '', 'Plan:', '---', body, '---', '', ...finish].join('\n');
};

/** The names of the AI reviewers as a sentence part: `CodeRabbit`, or `CodeRabbit and Greptile`. */
export const reviewerNames = (reviewers: string | undefined): string[] => {
  const names = (reviewers ?? '').split(/[,;\n]/).map((n) => n.trim().replace(/\s+/g, ' ').slice(0, 40)).filter(Boolean).slice(0, 5);
  return names.length ? names : ['CodeRabbit'];
};

/**
 * What the build does once the code is written, in numbered steps: commit, push and open the merge request (asked for,
 * or done at once), watch the pipeline, then close out the AI reviewers' comments until none are left, asking only
 * when a decision is needed and checking for new comments again after every answer.
 */
export const reviewSteps = (mode: ReviewMode, identifier: string, reviewers: string | undefined): string[] => {
  const names = reviewerNames(reviewers);
  const who = names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names.at(-1)}` : names[0]!;
  const open = mode === 'auto'
    ? `2. Commit with a message that starts with ${identifier}, push this branch, and open a merge request (or pull request) assigned to me, with a title that starts with "${identifier}:" and a link to the Linear issue. I authorize these three steps.`
    : '2. Commit, push and open the merge request the way you normally offer them: show me those options and wait for my choice. Once the merge request exists, do not ask me again for anything in steps 3 to 7 unless step 6 says so.';
  return [
    'Implement this plan now. Follow its steps in order, then finish the work in these steps:',
    '',
    '1. Run the project\'s tests and linters, and fix what fails.',
    open,
    '3. Watch the merge request\'s pipeline until it passes or fails: check it about once a minute with a short sleep, for at most 20 minutes. Fix failures you caused, push, and watch again.',
    `4. Read every unresolved review comment written by ${who} (AI reviewers) on the merge request. For each one, fix it, or if you disagree, say why in a reply. You may reply to and resolve the threads those AI reviewers started, and only those: do not reply to, resolve or edit anyone else's threads, and do not merge.`,
    `5. After each push, wait up to 15 minutes for ${who} and the pipeline to run again, then handle any new AI comments the same way. Repeat until the pipeline is green and no AI thread is unresolved, at most 5 rounds.`,
    '6. If a comment needs a decision from me, ask me. When I answer, apply it, push, and go back to step 5: close out any new AI comments before you finish. Never finish while an AI comment is unresolved without telling me why.',
    '7. Finish with one message: the merge request link, the pipeline status, and a list of the AI comments you fixed, replied to or left for me.',
  ];
};

/** `provider/model` as the host takes it, or undefined for the host's default. */
export const cleanModel = (value: string | undefined): string | undefined => {
  const text = value?.trim();
  return text && /^[^\s/]+\/\S+$/.test(text) ? text : undefined;
};

export const cleanAgent = (value: string | undefined, fallback = 'build'): string => {
  const text = value?.trim();
  return text && /^[A-Za-z0-9._-]{1,64}$/.test(text) ? text : fallback;
};

/**
 * The agent and model a plan or build session starts with: the folder's own choice, else the one set for every
 * folder, else `plan` or `build` on the host's default model. A one-off override from the click wins over both.
 */
export const sessionChoice = (
  role: 'plan' | 'build',
  folder: { planAgent?: string; planModel?: string; buildAgent?: string; buildModel?: string } | undefined,
  defaults: AgentDefaults | undefined,
  override: { agent?: unknown; model?: unknown } = {},
): { agent: string; model?: string } => {
  const agentKey = role === 'plan' ? 'planAgent' : 'buildAgent';
  const modelKey = role === 'plan' ? 'planModel' : 'buildModel';
  const text = (value: unknown) => (typeof value === 'string' ? value : undefined);
  // The first value that is usable wins, so a bad folder value falls back to the one for every folder.
  const agent = [override.agent, folder?.[agentKey], defaults?.[agentKey]].map((v) => text(v)?.trim()).find((v) => v && cleanAgent(v, '') === v) ?? role;
  const model = [override.model, folder?.[modelKey], defaults?.[modelKey]].map((v) => cleanModel(text(v))).find(Boolean);
  return model ? { agent, model } : { agent };
};

export type PlanPromptInput = {
  identifier: string;
  issueTitle?: string | null;
  branch: string | null;
  directory: string;
  /** What the dashboard shows an agent about the issue: status, description, latest comments. */
  context: string;
  /** The team's estimate scale, as `scaleText` writes it. Without it the plan gives no estimate block. */
  scale?: string | null;
};

/**
 * How the plan ends with its estimate and any split-out issues, as one fenced JSON block the Linear+ extension reads.
 * The extension writes them to Linear when the plan finishes; the agent does not.
 */
const extrasLines = (identifier: string, scale: string | null | undefined): string[] => {
  const text = scale?.replace(/\s+/g, ' ').trim().slice(0, 400);
  if (!text) return [];
  return [
    `Size the work. ${text} Size by the effort for a coding agent like you (reading, changing and testing the code, and the review rounds), not by a person's days. Give one estimate for ${identifier} as planned, and one for each split-out issue.`,
    '',
    `If part of the work is better done as a separate issue (it can ship on its own, or it belongs to another area), leave it out of the plan and list it instead. Each one becomes a separate Linear issue in the same team and project, related to ${identifier}. Do not create issues or change estimates yourself: the Linear+ extension does it when this plan finishes. Most plans split nothing.`,
    '',
    `Put this block just before the closing card, once, with valid JSON (an empty list when nothing is split out):`,
    '```' + EXTRAS_FENCE,
    '{"estimate": 3, "issues": [{"title": "Short title", "description": "What it is and why, in markdown", "estimate": 2}]}',
    '```',
    '',
  ];
};

/** The first message of a plan session: plan only, in the issue's worktree, and stop for review. */
export const planPrompt = (input: PlanPromptInput): string => {
  const context = input.context.trim().slice(0, 20_000);
  return [
    `Plan the work for Linear issue ${input.identifier}${input.issueTitle ? ` (${input.issueTitle.replace(/\s+/g, ' ').trim().slice(0, 160)})` : ''}. Do not change any files yet.`,
    '',
    `Work in ${input.directory}${input.branch ? `, on branch ${input.branch}` : ''}.`,
    '',
    'The issue:',
    '---',
    context || `${input.identifier}`,
    '---',
    '',
    'Read the code you need, then write a plan: what to change and where, in order, how to test it, and the risks.',
    '',
    'You may ask me questions first to clarify the issue; I want that. When you are done asking, write the complete plan as a normal message.',
    '',
    ...extrasLines(input.identifier, input.scale),
    'This session only plans. A separate build session, started from the Linear+ extension, will build the plan. So the plan must be your last message, with no question card or form left open, and you must not end with a "go", "build it" or "switch agent" card or offer to build. Do not ask which agent to use. Anything still undecided goes under "Open decisions" at the end of the plan, each with your recommendation.',
    '',
    'End that final message with this block, exactly, so the Linear card with the Start build button appears under the plan (it is only a display, not a question):',
    '```openui-lang',
    'root = Stack([card])',
    `card = LinearIssue("${input.identifier}")`,
    '```',
  ].join('\n');
};

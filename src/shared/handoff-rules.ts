// The rules of plan to build that need no host: reading the service's list, choosing the planning session and
// deciding which pending handoffs show. Pure.
import type { GuestSessionRecord } from '@openchamber/sdk';
import type { Handoff } from '../service/types.ts';
import { linkedIdentifiers } from './linked.ts';

export type { Handoff };

/** The agent a plan runs as. A session on it reads as "plan ready" whatever its last reply looks like. */
export const PLAN_AGENT = 'plan';

const isHandoff = (value: unknown): value is Handoff => {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return ['id', 'directory', 'sessionDirectory', 'sessionId', 'identifier', 'sessionTitle'].every((k) => typeof row[k] === 'string') && typeof row.createdAt === 'number';
};

/** The handoffs in a service answer. Anything unexpected is none: the section just shows no row. */
export const parseHandoffs = (reply: { [key: string]: unknown } | null | undefined): Handoff[] =>
  Array.isArray(reply?.handoffs) ? reply.handoffs.filter(isHandoff) : [];

/** A planning session a build can start from. */
export type BuildSource = {
  sessionId: string;
  /** Where the session runs, often a worktree. */
  directory: string;
  title: string;
  agent: string | null;
  inWorktree: boolean;
  updatedAt: number;
};

export const sourceOf = (session: GuestSessionRecord): BuildSource => ({
  sessionId: session.id,
  directory: session.directory,
  title: session.title,
  agent: session.agent ?? null,
  inWorktree: session.worktree !== null,
  updatedAt: session.updatedAt,
});

/**
 * The session to build from for an issue: not archived, not a subagent, linked to the issue or one of the plan
 * sessions the service started for it (`known`, which carry no link). A session on the
 * plan agent comes first, then one in a worktree, then the most recently used.
 */
export const pickBuildSource = (sessions: readonly GuestSessionRecord[], identifier: string, known: ReadonlySet<string> = new Set()): BuildSource | null => {
  const wanted = identifier.toUpperCase();
  const rank = (s: BuildSource) => (s.agent === PLAN_AGENT ? 0 : 2) + (s.inWorktree ? 0 : 1);
  return sessions
    .filter((s) => s.archivedAt === null && s.parentId === null && (known.has(s.id) || linkedIdentifiers(s).includes(wanted)))
    .map(sourceOf)
    .sort((a, b) => rank(a) - rank(b) || b.updatedAt - a.updatedAt)[0] ?? null;
};

/** Whether a pending handoff is shown: its session runs the plan agent or its reply reads like a plan, and is not busy. */
export const handoffShown = (handoff: Handoff, session: GuestSessionRecord | undefined): boolean => {
  if (session && (session.archivedAt !== null || session.activity === 'running' || session.activity === 'retrying')) return false;
  return handoff.plan || session?.agent === PLAN_AGENT;
};

/**
 * The section this writes, and the ones earlier versions wrote: a rule, a heading, and everything after it, to the end.
 * The older heading named the session, which Linear turned into a link to the issue itself, and Linear saved it
 * back as `**Plan from OpenChamber session:** [APPSEC-21](...) **plan**`, so only the start of it is matched.
 */
const SECTION = /\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/;

/** Linear's description field holds far more than a plan needs; this keeps the write well inside it. */
export const DESCRIPTION_MAX = 100_000;

/** The plan without its own first title (`# APPSEC-21 plan: ...`): the section heading already says it is the plan. */
const withoutTitle = (plan: string): string => plan.replace(/^\s*#[ \t]+[^\n]*\n+/, '');

/**
 * The issue's description with the plan as its last section: a rule, a "Plan" heading, then the plan or its concise
 * summary. `documentUrl` links the full plan. A plan section written before is replaced, so adding again never piles
 * them up; everything above it is kept as it is. A rule followed by a "Plan" heading of your own at the end of the
 * description is taken for it. Null when the result would be too long.
 */
export const withPlan = (description: string | null | undefined, plan: string, documentUrl?: string): string | null => {
  const text = withoutTitle(plan.trim()).trim();
  const body = documentUrl ? `${text}\n\n**Full plan:** [Read the full plan document](${documentUrl})` : text;
  const base = (description ?? '').replace(SECTION, '').trimEnd();
  const section = `---\n## Plan\n\n${body}`;
  const next = base ? `${base}\n\n${section}` : section;
  return next.length > DESCRIPTION_MAX ? null : next;
};

/** A concise plan still gives the implementation and checks enough room. The document keeps every detail. */
export const PLAN_SUMMARY_MIN = 2_500;
export const PLAN_SUMMARY_MAX = 6_500;

/** Above the human-reading limit, the issue gets a summary and the document gets the full plan. */
export const planNeedsDocument = (plan: string): boolean => plan.length > PLAN_SUMMARY_MAX;

const clipSummary = (text: string): string => {
  if (text.length <= PLAN_SUMMARY_MAX) return text;
  const cut = text.slice(0, PLAN_SUMMARY_MAX - 1);
  const paragraph = cut.lastIndexOf('\n\n');
  const space = cut.lastIndexOf(' ');
  const at = paragraph > PLAN_SUMMARY_MAX / 2 ? paragraph : space;
  return `${cut.slice(0, at > 0 ? at : cut.length).trimEnd()}…`;
};

/** A bounded source excerpt, with no model call to stall a write and no mid-word truncation. */
export const concisePlan = (plan: string): string => clipSummary(withoutTitle(plan.trim()).trim());

/** The first lines of a plan, for the options panel: what Start build will build. */
export const planExcerpt = (plan: string, lines = 6, chars = 420): string => {
  const kept = plan.trim().split('\n').filter((l) => l.trim()).slice(0, lines).join('\n');
  return kept.length > chars ? `${kept.slice(0, chars).trimEnd()}...` : kept;
};

/**
 * What a frame remembers about a row it has handled. The same session finishing its plan again makes a new row with
 * the same id, so the time is part of the key: a plan finished again is shown again.
 */
export const rowKey = (row: { id: string; createdAt: number }): string => `${row.id}@${row.createdAt}`;

/** What a click says when the last reply of the planning session is not a plan (the service says the same). */
export const NOT_A_PLAN_TEXT = 'The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.';

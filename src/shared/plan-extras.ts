// What a plan adds to Linear besides its text: an estimate for the planned issue and, when the work splits,
// separate issues related to it. The plan session writes them as one fenced block at the end of its plan; the
// service keeps the first one per planning session and a Linear+ frame writes it (src/shared/plan-extras-apply.ts).
// Pure, and shared by the service and the frames.

/** The fence the plan prompt asks for: ```linear-plan, then JSON, then ```. */
export const EXTRAS_FENCE = 'linear-plan';

export const EXTRA_ISSUES_MAX = 10;
const TITLE_MAX = 200;
const DESCRIPTION_MAX = 8_000;

export type ExtraIssue = { title: string; description: string; estimate: number | null };
export type PlanExtras = { estimate: number | null; issues: ExtraIssue[] };

const BLOCK = new RegExp('```' + EXTRAS_FENCE + '[^\\n]*\\n([\\s\\S]*?)```', 'g');

const number = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1000 ? value : null;

const oneLine = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';

/** The last extras block of a reply, checked and trimmed. Null when there is none, it is not JSON, or it says nothing. */
export const parsePlanExtras = (reply: string): PlanExtras | null => {
  const blocks = [...reply.matchAll(BLOCK)];
  const body = blocks.at(-1)?.[1];
  if (body === undefined) return null;
  let raw: unknown;
  try {
    raw = JSON.parse(body.trim());
  } catch {
    return null;
  }
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return null;
  const record = raw as Record<string, unknown>;
  const issues: ExtraIssue[] = [];
  for (const item of Array.isArray(record.issues) ? record.issues : []) {
    if (typeof item !== 'object' || item === null) continue;
    const entry = item as Record<string, unknown>;
    const title = oneLine(entry.title, TITLE_MAX);
    if (!title) continue;
    const description = typeof entry.description === 'string' ? entry.description.trim().slice(0, DESCRIPTION_MAX) : '';
    issues.push({ title, description, estimate: number(entry.estimate) });
    if (issues.length >= EXTRA_ISSUES_MAX) break;
  }
  const estimate = number(record.estimate);
  return estimate === null && issues.length === 0 ? null : { estimate, issues };
};

/** The reply without its extras block, for the plan text that goes into a description, a draft or a build. */
export const withoutExtras = (text: string): string => text.replace(BLOCK, '').replace(/\n{3,}/g, '\n\n').trim();

/** The allowed estimate nearest to `value` (the higher one on a tie). Null when the team does not estimate. */
export const snapEstimate = (value: number | null, scale: readonly number[]): number | null => {
  if (value === null || scale.length === 0) return null;
  let best = scale[0]!;
  for (const option of scale) {
    if (Math.abs(option - value) < Math.abs(best - value) || (Math.abs(option - value) === Math.abs(best - value) && option > best)) best = option;
  }
  return best;
};

/** The line of the plan prompt that names the team's scale, so the plan sizes on it. */
export const scaleText = (scale: readonly number[], labelOf: (value: number) => string | null): string => {
  if (scale.length === 0) return 'This team does not use estimates: leave "estimate" out.';
  const named = scale.map((v) => {
    const label = labelOf(v);
    return label && label !== String(v) ? `${label} = ${v}` : String(v);
  });
  return `Estimates on this team, written as the number: ${named.join(', ')}.`;
};

/** The description of an issue a plan split out: its own text, then where it came from. */
export const extraDescription = (issue: ExtraIssue, parent: string, sessionTitle: string): string =>
  [issue.description, `Split out of ${parent} by the plan in "${oneLine(sessionTitle, 120)}". Created by Linear+.`].filter(Boolean).join('\n\n---\n\n');

/** What the service keeps for one planning session's extras, and how far a frame got writing them. */
export type ExtrasState = {
  sessionId: string;
  identifier: string;
  /** The mapped folder. */
  directory: string;
  sessionTitle: string;
  extras: PlanExtras;
  /** `pending`: nobody wrote it yet; `claimed`: a frame is writing it; `done` or `failed`: a frame finished. */
  state: 'pending' | 'claimed' | 'done' | 'failed';
  claimedAt?: number;
  /** Whether the planned issue's estimate was handled (set, or left because it had one). */
  estimateDone?: boolean;
  /** The estimate that was set, when one was. */
  estimateSet?: number | null;
  /** Identifiers of the issues created so far, in the order of `extras.issues`. A retry starts after them. */
  created?: string[];
  error?: string;
  at: number;
};

/** A claim older than this is taken to be a frame that went away mid-write; another frame may claim it. */
export const CLAIM_STALE_MS = 2 * 60_000;

export const isExtrasState = (value: unknown): value is ExtrasState => {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return ['sessionId', 'identifier', 'directory', 'sessionTitle', 'state'].every((k) => typeof row[k] === 'string')
    && typeof row.extras === 'object' && row.extras !== null && Array.isArray((row.extras as PlanExtras).issues);
};

/** "Estimate M set, created ENG-40 and ENG-41", for a toast and the Work Status line. */
export const extrasSummary = (state: Pick<ExtrasState, 'identifier' | 'estimateSet' | 'created'>, label: (value: number) => string): string => {
  const parts: string[] = [];
  if (state.estimateSet !== undefined && state.estimateSet !== null) parts.push(`set the estimate of ${state.identifier} to ${label(state.estimateSet)}`);
  const created = state.created ?? [];
  if (created.length) parts.push(`created ${created.length === 1 ? created[0] : `${created.slice(0, -1).join(', ')} and ${created.at(-1)}`}, related to ${state.identifier}`);
  return parts.length ? parts.join('; ') : `nothing to change on ${state.identifier}`;
};

// Plan to build, the frame side. The service lists planning sessions that finished a turn while linked to an
// issue (`GET /handoffs`), and starts the build session itself (`POST /handoff`) with the folder's build agent
// and model. A frame cannot change an open chat's agent or model, so the build is a new session in the same
// worktree. The Linear write (the move to In Progress) and opening the session are the frame's, on the click.
import { api } from '@openchamber-ext/shared-ui';
import type { GuestSessionRecord } from '@openchamber/sdk';
import { handoffShown, parseHandoffs, pickBuildSource, type BuildSource, type Handoff } from './handoff-rules.ts';
import { host } from './host.ts';
import { isExtrasState, type ExtrasState } from './plan-extras.ts';
import { projectForDirectory } from './start-session.ts';

/** Looks for a build source in the folder's OpenChamber project. Null when there is none or the host cannot say. */
export const findBuildSource = async (directory: string | null, identifier: string): Promise<BuildSource | null> => {
  const plans = await planSessions(identifier);
  try {
    const project = await projectForDirectory(directory);
    if (project) {
      const snapshot = await host.listSessions(project.id);
      const found = pickBuildSource(snapshot?.sessions ?? [], identifier, new Set(plans.map((p) => p.sessionId)));
      if (found) return found;
    }
  } catch {
    // The host cannot say; the service's own list below still can.
  }
  // The panel may be open in another project than the issue's repo. The service knows the plan sessions it started.
  const own = plans[0];
  return own ? { sessionId: own.sessionId, directory: own.sessionDirectory, title: own.title, agent: 'plan', inWorktree: true, updatedAt: own.createdAt } : null;
};

type PlanRow = { sessionId: string; sessionDirectory: string; title: string; createdAt: number };

/** The plan sessions the service started for an issue, newest first. They carry no link the host shows, so the service names them. */
const planSessions = async (identifier: string): Promise<PlanRow[]> => {
  const reply = await api(host, 'GET', '/plans', { query: { identifier }, name: 'Linear+' });
  const list: unknown = reply.ok === false ? [] : reply.sessions;
  if (!Array.isArray(list)) return [];
  return list
    .map((row) => row as { sessionId?: unknown; sessionDirectory?: unknown; directory?: unknown; title?: unknown; createdAt?: unknown })
    .filter((row) => typeof row.sessionId === 'string' && typeof row.createdAt === 'number')
    .map((row): PlanRow => ({
      sessionId: row.sessionId as string,
      sessionDirectory: typeof row.sessionDirectory === 'string' ? row.sessionDirectory : typeof row.directory === 'string' ? row.directory : '',
      title: typeof row.title === 'string' ? row.title : `${identifier} plan`,
      createdAt: row.createdAt as number,
    }))
    .filter((row) => row.sessionDirectory.startsWith('/'));
};

/** Pending handoffs for a folder, without the ones that do not read as a plan. An unreachable service means none. */
export const fetchHandoffs = async (directory: string): Promise<Handoff[]> => {
  const reply = await api(host, 'GET', '/handoffs', { query: { directory }, name: 'Linear+' });
  if (reply.ok === false) return [];
  const rows = parseHandoffs(reply);
  if (!rows.length) return rows;
  let sessions: readonly GuestSessionRecord[] = [];
  try {
    const project = await projectForDirectory(directory);
    if (project) sessions = (await host.listSessions(project.id))?.sessions ?? [];
  } catch {
    // Without the session list the reply's own shape decides.
  }
  return rows.filter((row) => handoffShown(row, sessions.find((s) => s.id === row.sessionId)));
};

export const dismissHandoff = async (id: string): Promise<boolean> =>
  (await api(host, 'POST', '/handoffs', { body: { id, action: 'dismiss' }, name: 'Linear+' })).ok !== false;

export type BuildStarted = { sessionId: string; directory: string };

/** Asks the service to start the build. Throws with the service's own words when it cannot. */
export const requestBuild = async (input: { source: Pick<BuildSource, 'sessionId' | 'directory' | 'title'>; identifier: string; issueTitle: string; force?: boolean; model?: string; planText?: string }): Promise<BuildStarted> => {
  const reply = await api(host, 'POST', '/handoff', {
    body: { sessionId: input.source.sessionId, sessionDirectory: input.source.directory, sessionTitle: input.source.title, identifier: input.identifier, issueTitle: input.issueTitle, ...(input.force ? { force: true } : {}), ...(input.model ? { model: input.model } : {}), ...(input.planText ? { planText: input.planText } : {}) },
    name: 'Linear+',
  });
  if (reply.ok === false || typeof reply.sessionId !== 'string') throw new Error(reply.error ?? 'The Linear+ service did not start the build.');
  return { sessionId: reply.sessionId, directory: typeof reply.directory === 'string' ? reply.directory : input.source.directory };
};

export type PlanPreview = { plan: string; postPlan: boolean; /** The last reply was not the plan: this is the latest reply that was. */ earlier: boolean;
  /** The reply reads like a plan. When it does not, building or writing it needs a deliberate "use it anyway". */
  isPlan: boolean;
  /** The session is a lead: the build runs as a session it starts under it. */
  lead: boolean;
};

/** Reads the plan a build would start from, and the folder's post-the-plan setting. Throws with the service's own words. */
export const previewPlan = async (input: { source: Pick<BuildSource, 'sessionId' | 'directory'>; identifier: string; planText?: string }): Promise<PlanPreview> => {
  const reply = await api(host, 'POST', '/handoff', {
    body: { mode: 'preview', sessionId: input.source.sessionId, sessionDirectory: input.source.directory, identifier: input.identifier, ...(input.planText ? { planText: input.planText } : {}) },
    name: 'Linear+',
  });
  if (reply.ok === false || typeof reply.plan !== 'string') throw new Error(reply.error ?? 'The Linear+ service could not read the plan.');
  return { plan: reply.plan, postPlan: reply.postPlan === true, earlier: reply.earlier === true, isPlan: reply.isPlan !== false, lead: reply.lead === true };
};

/**
 * Asks the service to start the plan session in a folder with the plan agent and model from Settings, or `model` for this one.
 * `lead`: the plan goes to a lead session instead, the one named (made with the worktree) or a new one for `true`.
 */
export const requestPlan = async (input: { identifier: string; directory: string; issueTitle: string; context: string; model?: string; scale?: string; lead?: string | true; leadTitle?: string }): Promise<BuildStarted> => {
  const { model, ...rest } = input;
  const reply = await api(host, 'POST', '/plan', { body: model ? { ...rest, model } : rest, name: 'Linear+' });
  if (reply.ok === false || typeof reply.sessionId !== 'string') throw new Error(reply.error ?? 'The Linear+ service did not start the plan.');
  return { sessionId: reply.sessionId, directory: typeof reply.directory === 'string' ? reply.directory : input.directory };
};

/** The estimates and split-out issues of a folder's recent plans, newest first. An unreachable service means none. */
export const fetchPlanExtras = async (directory: string): Promise<ExtrasState[]> => {
  const reply = await api(host, 'GET', '/handoffs', { query: { directory }, name: 'Linear+' });
  const list: unknown = reply.ok === false ? [] : reply.extras;
  return Array.isArray(list) ? list.filter(isExtrasState) : [];
};

/** One planning session's extras, or null. */
export const fetchSessionExtras = async (sessionId: string): Promise<ExtrasState | null> => {
  const reply = await api(host, 'GET', '/extras', { query: { sessionId }, name: 'Linear+' });
  return reply.ok !== false && isExtrasState(reply.extras) ? reply.extras : null;
};

/** Tells the service how writing a plan's extras goes. `claim-extras` answers whether this frame may write them. */
export const reportExtras = async (body: { sessionId: string; action: 'claim-extras' | 'extras-done' | 'extras-failed' | 'retry-extras' } & Record<string, unknown>): Promise<ExtrasState | null> => {
  const reply = await api(host, 'POST', '/handoffs', { body, name: 'Linear+' });
  if (reply.ok === false) return null;
  if (body.action === 'claim-extras' && reply.claimed !== true) return null;
  return isExtrasState(reply.state) ? reply.state : null;
};

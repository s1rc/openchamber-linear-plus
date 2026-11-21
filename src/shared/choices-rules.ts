// Reading the service's agent and model lists, and the options a select shows. Pure.
import type { Choice, Choices as Lists, CurrentChoice } from '../service/choices.ts';

export type { Choice, CurrentChoice };
/** The lists, and what a plan and a build would use here when nothing is picked (an older service sends none). */
export type Choices = Lists & { current?: { plan: CurrentChoice; build: CurrentChoice } };

const isCurrent = (value: unknown): value is CurrentChoice =>
  typeof value === 'object' && value !== null && typeof (value as CurrentChoice).agent === 'string'
  && ((value as CurrentChoice).model === undefined || typeof (value as CurrentChoice).model === 'string');

const isChoice = (value: unknown): value is Choice => typeof value === 'object' && value !== null && typeof (value as Choice).id === 'string' && typeof (value as Choice).label === 'string';

export const parseChoices = (reply: { [key: string]: unknown } | null | undefined): Choices | null => {
  if (!reply || reply.ok === false || !Array.isArray(reply.agents) || !Array.isArray(reply.models)) return null;
  return {
    agents: reply.agents.filter(isChoice),
    models: reply.models.filter(isChoice),
    defaultModel: typeof reply.defaultModel === 'string' ? reply.defaultModel : null,
    ...(isCurrent((reply.current as Record<string, unknown> | undefined)?.plan) && isCurrent((reply.current as Record<string, unknown> | undefined)?.build)
      ? { current: reply.current as { plan: CurrentChoice; build: CurrentChoice } }
      : {}),
  };
};

/** The empty choice stands for "the default": the build agent, or the model the host would use. */
export const DEFAULT_ID = '__default';

/** Options for a select: the default first, then the choices, then a saved value the list does not know. */
export const withSaved = (choices: readonly Choice[], saved: string | undefined, defaultLabel: string): Choice[] => {
  const list: Choice[] = [{ id: DEFAULT_ID, label: defaultLabel }, ...choices];
  const value = saved?.trim();
  return value && !choices.some((c) => c.id === value) ? [...list, { id: value, label: value, hint: 'saved' }] : list;
};

/** The label of the model a start would use with nothing picked: the one set in Settings, or the default. */
export const currentModelLabel = (choices: Choices, role: 'plan' | 'build'): string => {
  const model = choices.current?.[role].model;
  if (model) return choices.models.find((m) => m.id === model)?.label ?? model;
  const fallback = choices.defaultModel ? choices.models.find((m) => m.id === choices.defaultModel)?.label ?? choices.defaultModel : null;
  return fallback ? `${fallback} (default)` : 'the default model';
};

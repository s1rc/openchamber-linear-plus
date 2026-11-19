// Reading the service's agent and model lists, and the options a select shows. Pure.
import type { Choice, Choices } from '../service/choices.ts';

export type { Choice, Choices };

const isChoice = (value: unknown): value is Choice => typeof value === 'object' && value !== null && typeof (value as Choice).id === 'string' && typeof (value as Choice).label === 'string';

export const parseChoices = (reply: { [key: string]: unknown } | null | undefined): Choices | null => {
  if (!reply || reply.ok === false || !Array.isArray(reply.agents) || !Array.isArray(reply.models)) return null;
  return {
    agents: reply.agents.filter(isChoice),
    models: reply.models.filter(isChoice),
    defaultModel: typeof reply.defaultModel === 'string' ? reply.defaultModel : null,
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

// Asks the user's Small Model for an issue draft. Never throws: the form needs an outcome, not an error.
import { HostRequestError } from '@openchamber/sdk';
import { DRAFT_SYSTEM, outcomeOfAnswer, outcomeOfError, type DraftOutcome } from './draft.ts';
import { host } from './host.ts';

export const draftWithModel = async (prompt: string): Promise<DraftOutcome> => {
  try {
    const { text } = await host.generate({ prompt, system: DRAFT_SYSTEM, maxOutputTokens: 1500 });
    return outcomeOfAnswer(text);
  } catch (error) {
    if (error instanceof HostRequestError) return outcomeOfError(error.code, error.message);
    return outcomeOfError(undefined, error instanceof Error ? error.message : '');
  }
};

// A hidden frame that only answers the slash commands (/linear-issue, /linear-list, /linear-pick). It draws nothing
// and writes nothing to Linear: a number or some words are looked up read-only, and the chip it returns tells the
// agent which block to draw.
import { host } from '../shared/host.ts';
import { resolveSlash, SlashError } from '../shared/slash.ts';
import { LinearError } from '../shared/linear.ts';
import { linearLookup } from './lookup.ts';

host.onResolve(async ({ command, args }) => {
  try {
    const chip = await resolveSlash(command, args, linearLookup);
    return { providerId: 'linear-dashboard', id: chip.id, title: chip.title, url: 'https://linear.app', text: chip.text };
  } catch (failure) {
    if (failure instanceof SlashError) throw failure;
    if (failure instanceof LinearError) {
      throw new Error(failure.kind === 'disconnected' ? 'Linear is not connected. Connect it in Settings, Integrations.' : `Could not reach Linear: ${failure.message}`.slice(0, 400));
    }
    throw new Error('The Linear command could not be read.');
  }
});

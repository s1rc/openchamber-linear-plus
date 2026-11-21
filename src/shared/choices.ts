// The agents and models the service reads from OpenCode, for the build settings. Null when the service cannot say.
import { api } from '@openchamber-ext/shared-ui';
import { parseChoices, type Choices } from './choices-rules.ts';
import { host } from './host.ts';

export const fetchChoices = async (directory: string | null): Promise<Choices | null> =>
  parseChoices(await api(host, 'GET', '/choices', { query: { directory }, name: 'Linear+' }));

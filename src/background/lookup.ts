// How the slash commands find an issue from a number or some words: read-only, through the host's Linear connection.
import { resolvePlace } from '../shared/detect.ts';
import { gql } from '../shared/linear.ts';
import { readyNow } from '../shared/host.ts';
import { SLASH_BY_NUMBER, SLASH_SEARCH } from '../shared/queries.ts';
import { getMapping } from '../shared/storage.ts';
import { hostEnv } from '../shared/use-detection.ts';
import type { Lookup, Match } from '../shared/slash.ts';

type Nodes = { issues: { nodes: { identifier: string; title: string }[] } };
type Search = { searchIssues: { nodes: { identifier: string; title: string }[] } };

const matches = (nodes: { identifier: string; title: string }[]): Match[] => nodes.map((n) => ({ key: n.identifier, title: n.title }));

/** The teams this folder is saved for, or none when it is not. */
const folderTeams = async (): Promise<string[]> => {
  const directory = readyNow()?.directory;
  if (!directory) return [];
  try {
    const place = await resolvePlace(hostEnv, directory);
    return (await getMapping(place.key))?.teamIds ?? [];
  } catch {
    return [];
  }
};

const mine = { or: [{ assignee: { isMe: { eq: true } } }, { creator: { isMe: { eq: true } } }, { subscribers: { some: { isMe: { eq: true } } } }] };

export const linearLookup: Lookup = {
  // The same number exists in every team (4399 is INF-4399 and CR-4399), so the nearest place with a hit wins:
  // this folder's teams, then issues you are on, then anywhere.
  number: async (n) => {
    const teams = await folderTeams();
    const stages: Record<string, unknown>[] = [
      ...(teams.length > 0 ? [{ and: [{ number: { eq: n } }, { team: { id: { in: teams } } }] }] : []),
      { and: [{ number: { eq: n } }, mine] },
      { number: { eq: n } },
    ];
    for (const filter of stages) {
      const found = matches((await gql<Nodes>(SLASH_BY_NUMBER, { filter })).issues.nodes);
      if (found.length > 0) return found;
    }
    return [];
  },
  search: async (term) => matches((await gql<Search>(SLASH_SEARCH, { term })).searchIssues.nodes),
};

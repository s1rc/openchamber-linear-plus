// Which Linear issues a session is tied to: the issue links on it, and the issues this extension started it from.

export type SessionLike = {
  links?: readonly { url: string; linkedAt?: number }[];
  items?: readonly { data?: unknown }[];
};

const ISSUE_URL = /linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i;

/** Issue identifiers, the most recently linked first, then the ones this extension started the session with. */
export const linkedIdentifiers = (session: SessionLike | undefined | null): string[] => {
  if (!session) return [];
  const found: string[] = [];
  const add = (id: string | undefined) => {
    const upper = id?.toUpperCase();
    if (upper && !found.includes(upper)) found.push(upper);
  };
  const links = [...(session.links ?? [])].sort((a, b) => (b.linkedAt ?? 0) - (a.linkedAt ?? 0));
  for (const link of links) add(link.url.match(ISSUE_URL)?.[1]);
  for (const item of session.items ?? []) {
    const identifier = (item.data as { identifier?: unknown } | undefined)?.identifier;
    if (typeof identifier === 'string') add(identifier);
  }
  return found;
};

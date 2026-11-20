// Start build from this plan: the session menu entry on a planning session. It finds the issue the session is for
// (a link on the session, or a plan session the service started), then shows the same options as the card's
// Start build. Nothing is written until the button in it is clicked.
import type { GuestSessionItem } from '@openchamber/sdk';
import { api } from '@openchamber-ext/shared-ui';
import { useEffect, useState } from 'preact/hooks';
import { BuildPanel } from '../shared/build-panel.tsx';
import { resolvePlace } from '../shared/detect.ts';
import { sourceOf, type BuildSource } from '../shared/handoff-rules.ts';
import { host } from '../shared/host.ts';
import { Empty, Select, Spinner } from '../shared/kit.tsx';
import { linkedIdentifiers } from '../shared/linked.ts';
import { hostEnv } from '../shared/use-detection.ts';

type Found = { source: BuildSource; identifiers: string[] };

/** The issues the session is for, newest link first, and the session as a build source. */
const find = async (item: GuestSessionItem, directory: string | null): Promise<Found> => {
  const dir = item.directory ?? directory;
  const fallback: BuildSource = { sessionId: item.sessionId, directory: dir ?? '', title: item.sessionTitle, agent: null, inWorktree: false, updatedAt: 0 };
  const identifiers: string[] = [];
  let source = fallback;
  const known: string[] = [];
  // The session's own folder first (a worktree is known to its project), then the folder the dialog was opened in.
  for (const candidate of [item.directory, directory]) {
    if (!candidate) continue;
    const place = await resolvePlace(hostEnv, candidate);
    if (!place.ocProjectId) continue;
    const record = (await host.listSessions(place.ocProjectId).catch(() => undefined))?.sessions.find((s) => s.id === item.sessionId);
    if (!record) continue;
    source = sourceOf(record);
    identifiers.push(...linkedIdentifiers(record));
    break;
  }
  const planned = await api(host, 'GET', '/plans', { query: { sessionId: item.sessionId }, name: 'Linear' });
  const rows: unknown = planned.ok === false ? [] : planned.sessions;
  if (Array.isArray(rows)) for (const row of rows) { const id = (row as { identifier?: unknown }).identifier; if (typeof id === 'string' && !known.includes(id)) known.push(id); }
  // The issue the plan was started for leads: a link added later (a new issue linked to the chat) is not what this plan is for.
  return { source: source.directory ? source : { ...source, directory: dir ?? '' }, identifiers: [...known, ...identifiers.filter((id) => !known.includes(id))] };
};

export const BuildView = ({ item, directory }: { item: GuestSessionItem; directory: string | null }) => {
  const [found, setFound] = useState<Found | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  useEffect(() => {
    let live = true;
    void find(item, directory).then((result) => { if (live) { setFound(result); setPicked(result.identifiers[0] ?? null); } }, () => { if (live) setFound({ source: { sessionId: item.sessionId, directory: '', title: item.sessionTitle, agent: null, inWorktree: false, updatedAt: 0 }, identifiers: [] }); });
    return () => { live = false; };
  }, [item.sessionId]);

  if (!found) return <div class="lin-center"><Spinner label="Looking for the issue" /></div>;
  if (!picked || !found.source.directory) {
    return (
      <Empty
        title="This session has no Linear issue"
        body="Start the plan from the issue with Start plan, or link the issue to this session from the + menu, then try again."
        action={{ label: 'Close', onClick: () => { void host.close(); } }}
      />
    );
  }
  return (
    <div class="lin-build-dialog">
      <h2 class="lin-modal-title">Start a build from this plan</h2>
      {found.identifiers.length > 1 && (
        <Select value={picked} options={found.identifiers.map((id) => ({ id, label: id }))} onChange={setPicked} label="Issue" />
      )}
      <BuildPanel fill key={picked} identifier={picked} source={found.source} onClose={() => { void host.close(); }} onDone={() => { void host.close(); }} />
    </div>
  );
};

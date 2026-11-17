// Comment on Linear issue: finds the issues linked to the message's session, then posts the message
// as a comment. One linked issue is used straight away, several are offered, none means a search.
import type { GuestMessageItem } from '@openchamber/sdk';
import { toast } from '@openchamber-ext/shared-ui';
import { Chip } from '@openchamber-ext/shared-ui/preact';
import { useEffect, useState } from 'preact/hooks';
import { resolvePlace } from '../shared/detect.ts';
import { host } from '../shared/host.ts';
import { Button, List, SearchField, Spinner, TextField } from '../shared/kit.tsx';
import { linkedIdentifiers } from '../shared/linked.ts';
import { useIssueSearch } from '../shared/search.ts';
import { hostEnv } from '../shared/use-detection.ts';
import type { IssueRow } from '../shared/types.ts';
import { addComment, writeErrorText } from '../shared/writes.ts';
import { StatusGlyph } from '../shared/glyphs.tsx';
import { Done } from './done.tsx';
import { commentBody } from './jobs.ts';

/** The issues a session is linked to, newest link first. Empty when none, or when the session cannot be found. */
const loadLinked = async (item: GuestMessageItem, directory: string | null): Promise<IssueRow[]> => {
  const dir = item.directory ?? directory;
  if (!dir) return [];
  const place = await resolvePlace(hostEnv, dir);
  if (!place.ocProjectId) return [];
  const snapshot = await host.listSessions(place.ocProjectId).catch(() => undefined);
  const session = snapshot?.sessions.find((s) => s.id === item.sessionId);
  const ids = linkedIdentifiers(session).slice(0, 10);
  return ids.length ? hostEnv.issuesByIdentifier(ids) : [];
};

const IssueList = ({ issues, onPick, label }: { issues: IssueRow[]; onPick: (issue: IssueRow) => void; label: string }) => (
  <List
    ariaLabel={label}
    items={issues.map((i) => ({ id: i.id, leading: i.identifier, title: i.title, meta: i.state.name }))}
    onSelect={(id) => { const issue = issues.find((i) => i.id === id); if (issue) onPick(issue); }}
    emptyText="No issue found."
  />
);

const Picker = ({ linked, onPick }: { linked: IssueRow[]; onPick: (issue: IssueRow) => void }) => {
  const [term, setTerm] = useState('');
  const search = useIssueSearch(term);
  const searching = term.trim().length >= 2;
  return (
    <div class="lin-stack">
      <p class="lin-lead">
        {linked.length ? 'This session is linked to more than one issue. Pick the one to comment on, or search for another.' : 'No issue is linked to this session. Search for the issue to comment on.'}
      </p>
      <SearchField value={term} onChange={setTerm} placeholder="Search Linear issues" autofocus />
      {searching ? (
        search.data ? <IssueList issues={search.data} onPick={onPick} label="Search results" /> : <Spinner label="Searching" />
      ) : linked.length ? (
        <IssueList issues={linked} onPick={onPick} label="Linked issues" />
      ) : null}
    </div>
  );
};

export const CommentView = ({ item, directory }: { item: GuestMessageItem; directory: string | null }) => {
  const [linked, setLinked] = useState<IssueRow[] | null>(null);
  const [issue, setIssue] = useState<IssueRow | null>(null);
  const [picking, setPicking] = useState(false);
  const [body, setBody] = useState(() => commentBody(item.sessionTitle, item.text));
  const [busy, setBusy] = useState(false);
  const [posted, setPosted] = useState<IssueRow | null>(null);

  useEffect(() => {
    let alive = true;
    void loadLinked(item, directory).catch(() => [] as IssueRow[]).then((issues) => {
      if (!alive) return;
      setLinked(issues);
      if (issues.length === 1) setIssue(issues[0]!);
      else setPicking(true);
    });
    return () => { alive = false; };
  }, [item.sessionId, item.messageId]);

  const post = async () => {
    if (!issue || !body.trim() || busy) return;
    setBusy(true);
    try {
      await addComment(issue, body);
      await toast(host, 'success', `Commented on ${issue.identifier}`);
      setPosted(issue);
    } catch (error) {
      await toast(host, 'error', writeErrorText(error));
      setBusy(false);
    }
  };

  if (posted) return <Done title="Comment posted" issue={posted} canLink={!(linked ?? []).some((i) => i.id === posted.id)} />;
  if (linked === null) return <div class="lin-dialog-body"><Spinner label="Finding the issues linked to this session" /></div>;

  return (
    <div class="lin-dialog-body">
      <h2 class="lin-dialog-title">Comment on Linear issue</h2>
      {picking || !issue ? (
        <Picker linked={linked} onPick={(picked) => { setIssue(picked); setPicking(false); }} />
      ) : (
        <>
          <div class="lin-comment-target">
            <Chip><StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} /> <span class="sui-mono">{issue.identifier}</span> <span class="lin-ellipsis">{issue.title}</span></Chip>
            <Button label="Change issue" variant="ghost" size="xs" onClick={() => setPicking(true)} />
          </div>
          <div class="lin-grow">
            <TextField label="Comment" value={body} onChange={setBody} multiline rows={8} placeholder="Write a comment. Markdown works." />
          </div>
          <div class="lin-form-foot">
            <Button label="Cancel" variant="ghost" size="sm" onClick={() => { void host.close(); }} />
            <Button label="Post comment" size="sm" disabled={!body.trim()} loading={busy} onClick={() => { void post(); }} />
          </div>
        </>
      )}
    </div>
  );
};

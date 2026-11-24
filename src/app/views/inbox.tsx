// Inbox: your notifications, newest first. Opening one marks it read, as in Linear; Mark all read
// marks every shown notification in one request.
import { Dot } from '@openchamber-ext/shared-ui/preact';
import { useContext, useState } from 'preact/hooks';
import { useQuery } from '../../shared/cache.ts';
import { relativeTime } from '../../shared/format.ts';
import { Avatar, StatusGlyph } from '../../shared/glyphs.tsx';
import { host } from '../../shared/host.ts';
import { toast } from '@openchamber-ext/shared-ui';
import { Banner, Button, Empty, Spinner, Switch } from '../../shared/kit.tsx';
import { markRead, writeErrorText } from '../../shared/writes.ts';
import { gql } from '../../shared/linear.ts';
import { NOTIFICATIONS } from '../../shared/queries.ts';
import { inScope, notificationText } from '../../shared/inbox.ts';
import type { Notification, NotificationsResult } from '../../shared/types.ts';
import type { DetectionState } from '../../shared/use-detection.ts';
import { usePaneIssue } from '../issue-pane.tsx';
import { PlaceKey } from '../view-state.ts';

type Props = { state: DetectionState; scoped: boolean };

export const Inbox = ({ state, scoped }: Props) => {
  const placeKey = useContext(PlaceKey);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [openId, setOpenId] = usePaneIssue(placeKey, 'inbox', 'Inbox');
  const list = useQuery('notifications', async () => (await gql<NotificationsResult>(NOTIFICATIONS, { after: null })).notifications);

  const all = list.data?.nodes ?? [];
  const scopedOn = scoped && state.mapped;
  const shown = all.filter((n) => (!unreadOnly || !n.readAt) && (!scopedOn || inScope(n, state.detection.teamIds, state.detection.projectIds)));
  const unread = all.filter((n) => !n.readAt).length;

  const read = (ids: string[]) => { void markRead(ids).catch((error: unknown) => toast(host, 'error', writeErrorText(error))); };
  const shownUnread = shown.filter((n) => !n.readAt).map((n) => n.id);

  const open = (n: Notification) => {
    if (!n.readAt) read([n.id]);
    const url = notificationText(n).url;
    if (n.issue) setOpenId(n.issue.identifier);
    else if (url) void host.openUrl(url);
  };

  return (
    <div class="lin-stack">
      <div class="sui-row">
        <Switch label="Unread only" checked={unreadOnly} onChange={setUnreadOnly} />
        <span class="sui-grow" />
        <span class="sui-muted sui-small">{unread} unread of {all.length}{list.data?.pageInfo.hasNextPage ? ' (latest 50)' : ''}</span>
        {shownUnread.length > 0 && <Button label={scopedOn ? 'Mark These Read' : 'Mark All Read'} variant="outline" size="xs" onClick={() => read(shownUnread)} />}
      </div>
      {list.error && !list.data && <Banner tone="error" title="Could not load your inbox" action={{ label: 'Retry', onClick: () => list.refresh() }} />}
      {list.loading && !list.data && <div class="lin-center"><Spinner label="Loading inbox" /></div>}
      {list.data && !all.length && <Empty title="Inbox zero" body="You have no notifications." />}
      {list.data && all.length > 0 && !shown.length && (
        <Empty title={unreadOnly ? 'Nothing unread' : 'Nothing for this folder'} body={scopedOn ? 'Use Show all to see every notification.' : 'You are all caught up.'} />
      )}
      <div class="lin-inbox">
        {shown.map((n) => {
          const text = notificationText(n);
          return (
          <button type="button" class="lin-notification" key={n.id} data-unread={n.readAt ? 'false' : 'true'} onClick={() => open(n)}>
            <span class="lin-notification-dot">{!n.readAt && <Dot tone="info" />}</span>
            <Avatar name={n.actor?.name ?? 'Linear'} url={n.actor?.avatarUrl} size={22} />
            <span class="lin-notification-main">
              <span class="lin-notification-title">
                {n.issue && <StatusGlyph type={n.issue.state.type} color={n.issue.state.color} teamId={n.issue.team.id} stateId={n.issue.state.id} />}
                {n.issue && <span class="sui-mono sui-muted sui-small">{n.issue.identifier}</span>}
                <span class="lin-ellipsis">{text.title}</span>
              </span>
              <span class="sui-muted sui-small lin-ellipsis">{text.detail}{n.comment?.body ? `: ${n.comment.body.replace(/\s+/g, ' ').slice(0, 140)}` : ''}</span>
            </span>
            <span class="sui-muted sui-small lin-nowrap">{relativeTime(n.createdAt)}</span>
          </button>
          );
        })}
      </div>
    </div>
  );
};

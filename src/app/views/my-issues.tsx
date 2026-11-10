import type { HostReadyContext } from '@openchamber/sdk';
import { useContext, useState } from 'preact/hooks';
import { PlaceKey, saveTab, tabFor } from '../view-state.ts';
import { all, MY_FILTERS, scopeFilter, type MyTab } from '../../shared/filters.ts';
import { Tabs } from '../../shared/kit.tsx';
import type { DetectionState } from '../../shared/use-detection.ts';
import { IssueBrowser } from '../components/issue-browser.tsx';

const TABS: { id: MyTab; label: string }[] = [
  { id: 'assigned', label: 'Assigned' },
  { id: 'created', label: 'Created' },
  { id: 'subscribed', label: 'Subscribed' },
];

export const MyIssues = ({ ctx, state, scoped, viewerId }: { ctx: HostReadyContext; state: DetectionState; scoped: boolean; viewerId: string }) => {
  const placeKey = useContext(PlaceKey);
  const [tab, setTabState] = useState<MyTab>(() => (tabFor(placeKey, 'my-issues') as MyTab | undefined) ?? 'assigned');
  const setTab = (next: MyTab) => { setTabState(next); saveTab(placeKey, 'my-issues', next); };
  const folder = scoped && state.mapped;
  const scope = folder ? scopeFilter(state.detection.teamIds, state.detection.projectIds) : null;
  const subTeamScope = folder && state.detection.teamIds.length ? scopeFilter(state.detection.teamIds, state.detection.projectIds, true) : null;
  return (
    <div class="lin-stack">
      <Tabs items={TABS} activeId={tab} onChange={(id) => setTab(id as MyTab)} />
      <IssueBrowser
        key={tab}
        listKey={`my-issues:${tab}`}
        ctx={ctx}
        scope={all(MY_FILTERS[tab], scope)}
        teamIds={folder ? state.detection.teamIds : []}
        subTeamScope={subTeamScope ? all(MY_FILTERS[tab], subTeamScope) : null}
        viewerId={viewerId}
        emptyTitle={tab === 'assigned' ? 'Nothing assigned to you' : tab === 'created' ? 'No open issues you created' : 'No subscribed issues'}
        emptyBody={scope ? 'Nothing in this folder. Use Show all to see every team.' : 'Open issues show here.'}
      />
    </div>
  );
};

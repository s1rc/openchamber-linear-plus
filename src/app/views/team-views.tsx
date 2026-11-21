// A team's Views page, as in Linear's sidebar: Linear's three fixed views, then the team's saved views (read only).
// Opening one shows the team's issues with that view picked in the strip above the list.
import { useContext } from 'preact/hooks';
import { BUILTIN_VIEWS } from '../../shared/filters.ts';
import { useCustomViews } from '../../shared/issues.ts';
import { Empty, Spinner } from '../../shared/kit.tsx';
import { PlaceKey, saveTab } from '../view-state.ts';

const isEmoji = (icon: string | null) => Boolean(icon && /\p{Extended_Pictographic}/u.test(icon));

export const TeamViews = ({ teamId, onOpen }: { teamId: string; onOpen: () => void }) => {
  const placeKey = useContext(PlaceKey);
  const custom = useCustomViews(teamId);
  // The same key the team's issue list reads for its views strip.
  const open = (viewId: string) => { saveTab(placeKey, `view:team-issues:${teamId}`, viewId); onOpen(); };
  return (
    <div class="lin-stack">
      <div class="lin-subheading">Linear</div>
      <div class="lin-view-list">
        {BUILTIN_VIEWS.map((view) => (
          <button type="button" class="lin-view-row" key={view.id} onClick={() => open(view.id)}>
            <span class="lin-swatch" style={{ background: 'var(--oc-muted)' }} />
            <span class="lin-ellipsis">{view.label}</span>
          </button>
        ))}
      </div>
      <div class="lin-subheading">Saved views</div>
      {custom.loading && !custom.data && <Spinner size="sm" label="Loading views" />}
      {custom.data && custom.data.length === 0 && <Empty title="No saved views" body="This team has no saved views. Make them in Linear; they show here." />}
      {custom.data && custom.data.length > 0 && (
        <div class="lin-view-list">
          {custom.data.map((view) => (
            <button type="button" class="lin-view-row" key={view.id} onClick={() => open(view.id)} title={view.shared ? 'Shared view' : 'Your view'}>
              {isEmoji(view.icon) ? <span aria-hidden="true">{view.icon}</span> : <span class="lin-swatch" style={{ background: view.color ?? 'var(--oc-muted)' }} />}
              <span class="lin-ellipsis">{view.name}</span>
              <span class="sui-muted sui-small">{view.shared ? 'Shared' : 'Yours'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

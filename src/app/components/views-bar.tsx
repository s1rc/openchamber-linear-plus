// Linear's strip of saved views above a team's issues: the three fixed tabs, then the team's own.
import { BUILTIN_VIEWS, type BuiltinView } from '../../shared/filters.ts';
import type { CustomView } from '../../shared/types.ts';

type Props = {
  active: string;
  custom: CustomView[];
  onSelect: (id: string) => void;
};

const isEmoji = (icon: string | null) => Boolean(icon && /\p{Extended_Pictographic}/u.test(icon));

export const ViewsBar = ({ active, custom, onSelect }: Props) => (
  <nav class="lin-views" aria-label="Views">
    {BUILTIN_VIEWS.map((view) => (
      <button type="button" class="lin-view" key={view.id} aria-pressed={active === view.id ? 'true' : 'false'} onClick={() => onSelect(view.id satisfies BuiltinView)}>
        {view.label}
      </button>
    ))}
    {custom.length > 0 && <span class="lin-views-divider" aria-hidden="true" />}
    {custom.map((view) => (
      <button type="button" class="lin-view" key={view.id} aria-pressed={active === view.id ? 'true' : 'false'} onClick={() => onSelect(view.id)} title={view.shared ? 'Shared view' : 'Your view'}>
        {isEmoji(view.icon) ? <span aria-hidden="true">{view.icon}</span> : <span class="lin-swatch" style={{ background: view.color ?? 'var(--oc-muted)' }} />}
        <span class="lin-ellipsis">{view.name}</span>
      </button>
    ))}
  </nav>
);

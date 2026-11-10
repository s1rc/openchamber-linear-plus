// "View options", laid out as Linear's menu is: mode, grouping and sub-grouping, ordering, what to
// include, then the list or board options and the display properties. Changes apply at once and are
// remembered for this list.
import { Button, SelectBlock, SwitchBlock, Tabs } from '../../shared/kit.tsx';
import {
  GROUP_FIELDS, NESTED_CHOICES, ORDER_FIELDS, PROPERTIES, subGroupChoices,
  type GroupField, type Mode, type Nested, type OrderField, type PropertyId, type ViewOptions,
} from '../../shared/view-options.ts';

type Props = {
  mode: Mode;
  options: ViewOptions;
  /** A team is in scope, so including its sub-teams means something. */
  hasSubTeams: boolean;
  onMode: (mode: Mode) => void;
  onChange: (patch: Partial<ViewOptions>) => void;
  onReset: () => void;
  onSetDefault: () => void;
  onClose: () => void;
};

const GroupOrderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M5 13V3M2.5 5.5 5 3l2.5 2.5M11 3v10M8.5 10.5 11 13l2.5-2.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const OrderingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <path d="M4.5 13V3M2 5.5 4.5 3 7 5.5M8.5 4h5M8.5 8h3.5M8.5 12h2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

/** The small arrow button beside a label; pressed when the order is reversed. */
const DirectionToggle = ({ pressed, label, onToggle, children }: { pressed: boolean; label: string; onToggle: () => void; children: preact.ComponentChildren }) => (
  <button type="button" class="lin-icon-toggle" aria-pressed={pressed ? 'true' : 'false'} aria-label={label} title={label} onClick={onToggle}>{children}</button>
);

const Row = ({ label, direction, children }: { label: string; direction?: preact.ComponentChildren; children: preact.ComponentChildren }) => (
  <div class="lin-option-row">
    <span class="lin-option-label">{label}</span>
    <span class="lin-option-direction">{direction}</span>
    <span class="lin-option-field">{children}</span>
  </div>
);

const Toggle = (props: { label: string; checked: boolean; onChange: (on: boolean) => void }) => (
  <div class="lin-toggle-row"><SwitchBlock {...props} /></div>
);

export const OptionsPanel = ({ mode, options, hasSubTeams, onMode, onChange, onReset, onSetDefault, onClose }: Props) => {
  const board = mode === 'board';
  const toggleProperty = (id: PropertyId) => onChange({
    properties: options.properties.includes(id) ? options.properties.filter((p) => p !== id) : PROPERTIES.map((p) => p.id).filter((p) => p === id || options.properties.includes(p)),
  });
  return (
    <div class="lin-options" role="dialog" aria-label="View options">
      <div class="sui-row">
        <Tabs items={[{ id: 'list', label: 'List' }, { id: 'board', label: 'Board' }]} activeId={mode} onChange={(id) => onMode(id as Mode)} />
        <span class="sui-grow" />
        <Button label="Close" variant="ghost" size="xs" onClick={onClose} />
      </div>

      <Row
        label={board ? 'Columns' : 'Grouping'}
        direction={<DirectionToggle pressed={options.groupOrder === 'desc'} label="Reverse group order" onToggle={() => onChange({ groupOrder: options.groupOrder === 'desc' ? 'asc' : 'desc' })}><GroupOrderIcon /></DirectionToggle>}
      >
        <SelectBlock
          value={options.grouping}
          options={GROUP_FIELDS.filter((f) => f.id !== 'none').map((f) => ({ id: f.id, label: f.label }))}
          onChange={(id) => onChange({ grouping: id as GroupField, ...(options.subGrouping === id ? { subGrouping: 'none' as const } : {}) })}
        />
      </Row>
      <Row label={board ? 'Rows' : 'Sub-grouping'}>
        <SelectBlock value={options.subGrouping} options={subGroupChoices(options.grouping).map((f) => ({ id: f.id, label: f.label }))} onChange={(id) => onChange({ subGrouping: id as GroupField })} />
      </Row>
      <Row
        label="Ordering"
        direction={<DirectionToggle pressed={options.reverse} label="Reverse ordering" onToggle={() => onChange({ reverse: !options.reverse })}><OrderingIcon /></DirectionToggle>}
      >
        <SelectBlock value={options.ordering} options={ORDER_FIELDS.map((f) => ({ id: f.id, label: f.label }))} onChange={(id) => onChange({ ordering: id as OrderField })} />
      </Row>
      <Toggle label="Order completed by recency" checked={options.completedByRecency} onChange={(on) => onChange({ completedByRecency: on })} />

      <hr class="lin-options-sep" />
      {hasSubTeams && <Toggle label="Show sub-team issues" checked={options.showSubTeams} onChange={(on) => onChange({ showSubTeams: on })} />}
      <Toggle label="Show sub-issues" checked={options.showSubIssues} onChange={(on) => onChange({ showSubIssues: on })} />
      <Toggle label="Show triage issues" checked={options.showTriage} onChange={(on) => onChange({ showTriage: on })} />

      <hr class="lin-options-sep" />
      <div class="lin-option-heading lin-option-heading--section">{board ? 'Board options' : 'List options'}</div>
      {!board && (
        <Row label="Nested sub-issues">
          <SelectBlock value={options.nested} options={NESTED_CHOICES} onChange={(id) => onChange({ nested: id as Nested })} />
        </Row>
      )}
      <Toggle label={board ? 'Show empty columns' : 'Show empty groups'} checked={options.showEmpty} onChange={(on) => onChange({ showEmpty: on })} />
      {board && Object.keys(options.columns).length > 0 && (
        <div><Button label="Reset hidden and pinned columns" variant="ghost" size="xs" onClick={() => onChange({ columns: {} })} /></div>
      )}
      <div class="lin-option-heading">Display properties</div>
      <div class="lin-chip-toggles">
        {PROPERTIES.map((p) => (
          <button type="button" key={p.id} class="lin-chip-toggle" aria-pressed={options.properties.includes(p.id) ? 'true' : 'false'} onClick={() => toggleProperty(p.id)}>
            {p.label}
          </button>
        ))}
      </div>

      <hr class="lin-options-sep" />
      <div class="sui-row">
        <Button label="Reset" variant="ghost" size="sm" onClick={onReset} />
        <span class="sui-grow" />
        <Button label={`Set as my default ${board ? 'board' : 'list'}`} variant="outline" size="sm" onClick={onSetDefault} />
      </div>
    </div>
  );
};

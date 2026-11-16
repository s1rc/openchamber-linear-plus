// The board: a column per group (status by default), scrolling sideways, optionally split into rows.
// Empty columns are hidden and listed under "Hidden columns", as in Linear; any column can be hidden
// from its menu and brought back from that list. Drop a card on a column, a cell or a hidden column to
// move it there.
import { useState } from 'preact/hooks';
import { cellsOf } from '../../shared/board.ts';
import type { Group } from '../../shared/grouping.ts';
import type { ChildCount } from '../../shared/issues.ts';
import type { IssueExtras, IssueRow } from '../../shared/types.ts';
import type { PropertyId } from '../../shared/view-options.ts';
import { Menu } from '../../shared/kit.tsx';
import { GroupIcon } from './group-icon.tsx';
import { IssueCard } from './issue-card.tsx';
import { useCardDrag } from './use-card-drag.ts';

type Props = {
  columns: Group[];
  hidden: Group[];
  /** Sub-groups: each is a band of cells across the columns. Empty for a single band. */
  rows: Group[];
  properties: ReadonlySet<PropertyId>;
  openId: string | null;
  cursorId: string | null;
  hideProject: boolean;
  childCounts: ReadonlyMap<string, ChildCount> | undefined;
  extras: ReadonlyMap<string, IssueExtras> | undefined;
  onOpen: (issue: IssueRow) => void;
  onHide: (key: string) => void;
  onShow: (key: string) => void;
  /** A card dropped on a column, and the row of the cell it landed in. */
  onDrop: (issueId: string, columnKey: string, rowKey: string | null) => void;
};

export const Board = ({ columns, hidden, rows, properties, openId, cursorId, hideProject, childCounts, extras, onOpen, onHide, onShow, onDrop }: Props) => {
  const [over, setOver] = useState<string | null>(null);
  const drag = useCardDrag({ onOver: setOver, onDrop: (issueId, target) => onDrop(issueId, target.column, target.row) });
  // A cell (column and row) or a hidden column: where a dragged card can land.
  const target = (id: string, columnKey: string, rowKey: string | null) => ({
    'data-drop-id': id,
    'data-drop-column': columnKey,
    'data-drop-row': rowKey ?? '',
    'data-drop': over === id ? 'true' : undefined,
  });
  const template = { gridTemplateColumns: `repeat(${Math.max(1, columns.length)}, 272px)` };
  const bands = rows.length ? rows : [null];

  const cards = (issues: IssueRow[]) => issues.map((issue) => (
    <IssueCard
      key={issue.id}
      issue={issue}
      properties={properties}
      selected={issue.identifier === openId}
      cursor={issue.identifier === cursorId}
      hideProject={hideProject}
      subIssues={childCounts?.get(issue.id)}
      extras={extras?.get(issue.id)}
      onOpen={onOpen}
      onDragStart={drag.start(issue.id)}
    />
  ));

  return (
    <div class="lin-board-scroll">
      <div class="lin-board-inner">
        <div class="lin-board-grid lin-board-heads" style={template}>
          {columns.map((column) => (
            <header class="lin-column-head" key={column.key}>
              <GroupIcon group={column} />
              <span class="lin-ellipsis">{column.title}</span>
              <span class="sui-muted">{column.issues.length}</span>
              <span class="sui-grow" />
              <Menu label="..." variant="ghost" size="xs" items={[{ id: 'hide', label: 'Hide column' }]} onSelect={() => onHide(column.key)} />
            </header>
          ))}
        </div>
        {bands.map((band) => {
          const cells = band ? cellsOf(columns, new Set(band.issues.map((i) => i.id))) : columns;
          return (
            <section class="lin-board-band" key={band?.key ?? 'all'} aria-label={band?.title}>
              {band && (
                <div class="lin-board-band-head">
                  <GroupIcon group={band} />
                  <span>{band.title}</span>
                  <span class="sui-muted">{band.issues.length}</span>
                </div>
              )}
              <div class="lin-board-grid" style={template}>
                {cells.map((cell) => (
                  <div class="lin-column-body" key={cell.key} data-column={cell.key} {...target(`${band?.key ?? ''}>${cell.key}`, cell.key, band?.key ?? null)}>
                    {cards(cell.issues)}
                    {cell.issues.length === 0 && <div class="lin-column-empty sui-muted sui-small">No issues</div>}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
        {columns.length === 0 && <div class="sui-muted sui-small lin-column-empty">Every column is hidden. Open Hidden columns to bring one back.</div>}
      </div>
      {hidden.length > 0 && (
        <aside class="lin-hidden-cols" aria-label="Hidden columns">
          <div class="lin-hidden-title">Hidden columns</div>
          {hidden.map((column) => (
            <button type="button" class="lin-hidden-col" key={column.key} onClick={() => onShow(column.key)} title="Show this column, or drop a card here" {...target(`hidden>${column.key}`, column.key, null)}>
              <GroupIcon group={column} />
              <span class="lin-ellipsis">{column.title}</span>
              <span class="sui-muted sui-small">{column.issues.length || ''}</span>
            </button>
          ))}
        </aside>
      )}
    </div>
  );
};

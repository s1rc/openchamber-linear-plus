// An issue as a board card, laid out like Linear's: ID and assignee on top, the status icon and
// title, a row of chips, then the dates.
import { Chip } from '@openchamber-ext/shared-ui/preact';
import { shortDate } from '../../shared/format.ts';
import { Avatar, PriorityGlyph, StatusGlyph } from '../../shared/glyphs.tsx';
import type { ChildCount } from '../../shared/issues.ts';
import type { IssueExtras, IssueRow } from '../../shared/types.ts';
import type { PropertyId } from '../../shared/view-options.ts';
import { IssueChips } from './issue-chips.tsx';

type Props = {
  issue: IssueRow;
  properties: ReadonlySet<PropertyId>;
  selected?: boolean;
  cursor?: boolean;
  hideProject?: boolean;
  subIssues?: ChildCount;
  extras?: IssueExtras;
  onOpen: (issue: IssueRow) => void;
  /** Pressing the card and moving the pointer starts a drag. */
  onDragStart?: (event: PointerEvent) => void;
};

export const IssueCard = ({ issue, properties: p, selected, cursor, hideProject, subIssues, extras, onOpen, onDragStart }: Props) => {
  const hasTop = p.has('id') || p.has('assignee');
  const dates = [p.has('created') && `Created ${shortDate(issue.createdAt)}`, p.has('updated') && `Updated ${shortDate(issue.updatedAt)}`].filter(Boolean);
  return (
    <button
      type="button"
      class="lin-card"
      data-issue={issue.identifier}
      data-issue-id={issue.id}
      aria-selected={selected ? 'true' : 'false'}
      data-cursor={cursor ? 'true' : 'false'}
      onPointerDown={onDragStart}
      onDragStart={(event) => event.preventDefault()}
      onClick={() => onOpen(issue)}
    >
      {hasTop && (
        <span class="lin-card-top">
          {p.has('id') && <span class="sui-mono sui-muted sui-small">{issue.identifier}</span>}
          <span class="sui-grow" />
          {p.has('assignee') && (issue.assignee ? <Avatar name={issue.assignee.name} url={issue.assignee.avatarUrl} /> : <span class="lin-avatar-empty" aria-label="No assignee" />)}
        </span>
      )}
      <span class="lin-card-heading">
        {p.has('status') && <StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} size={16} />}
        <span class="lin-card-title">{issue.title}</span>
      </span>
      <span class="lin-card-meta">
        {p.has('priority') && <Chip><PriorityGlyph priority={issue.priority} /></Chip>}
        <IssueChips issue={issue} properties={p} subIssues={subIssues} hideProject={hideProject} extras={extras} />
      </span>
      {dates.length > 0 && <span class="sui-muted sui-small">{dates.join(' · ')}</span>}
    </button>
  );
};

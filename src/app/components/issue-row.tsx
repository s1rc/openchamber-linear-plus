// One issue as Linear lists it: priority, key, status, title, then the chips the display properties
// ask for, the assignee, and the dates. Narrow lists drop the extras right to left (container
// queries in local.css), so the row decides by its own width, not the surface.
import { shortDate } from '../../shared/format.ts';
import { Avatar, PriorityGlyph, StatusGlyph } from '../../shared/glyphs.tsx';
import type { ChildCount } from '../../shared/issues.ts';
import type { IssueExtras, IssueRow as Issue } from '../../shared/types.ts';
import type { PropertyId } from '../../shared/view-options.ts';
import { IssueChips } from './issue-chips.tsx';

export { LabelChip } from './issue-chips.tsx';

const ALL_PROPERTIES: ReadonlySet<PropertyId> = new Set(['id', 'status', 'assignee', 'priority', 'project', 'dueDate', 'cycle', 'estimate', 'labels', 'links', 'created', 'changes']);

type Props = {
  issue: Issue;
  selected?: boolean;
  cursor?: boolean;
  /** Which display properties to draw. Sub-issue lists omit it and get the usual ones. */
  properties?: ReadonlySet<PropertyId>;
  hideProject?: boolean;
  /** Only key, status, title and assignee: for sub-issue lists. */
  compact?: boolean;
  subIssues?: ChildCount;
  extras?: IssueExtras;
  /** Nesting level: a sub-issue under its parent is 1. */
  depth?: number;
  /** Not clickable: a choice that has already been made. */
  disabled?: boolean;
  onOpen: (issue: Issue) => void;
};

export const IssueRow = ({ issue, selected, cursor, properties = ALL_PROPERTIES, hideProject, compact, subIssues, extras, depth = 0, disabled, onOpen }: Props) => (
  <button
    type="button"
    class="lin-issue-row"
    aria-selected={selected ? 'true' : 'false'}
    disabled={disabled}
    data-cursor={cursor ? 'true' : 'false'}
    data-issue={issue.identifier}
    data-depth={depth || undefined}
    style={depth ? { paddingLeft: `${8 + depth * 22}px` } : undefined}
    onClick={() => onOpen(issue)}
    title={issue.title}
  >
    {properties.has('priority') || compact ? <PriorityGlyph priority={issue.priority} /> : null}
    {properties.has('id') || compact ? <span class="lin-issue-key sui-mono">{issue.identifier}</span> : null}
    {properties.has('status') || compact ? <StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} /> : null}
    <span class="lin-issue-title">{issue.title}</span>
    {!compact && (
      <span class="lin-issue-meta">
        <IssueChips issue={issue} properties={properties} subIssues={subIssues} hideProject={hideProject} extras={extras} />
      </span>
    )}
    {(properties.has('assignee') || compact) && (issue.assignee
      ? <span class="lin-meta-assignee" title={issue.assignee.name}><Avatar name={issue.assignee.name} url={issue.assignee.avatarUrl} /></span>
      : <span class="lin-avatar-empty" aria-label="No assignee" />)}
    {!compact && properties.has('created') && <span class="lin-meta-created sui-small sui-muted" title="Created">{shortDate(issue.createdAt)}</span>}
    {!compact && properties.has('updated') && <span class="lin-meta-updated sui-small sui-muted" title="Updated">{shortDate(issue.updatedAt)}</span>}
  </button>
);

// The chips an issue shows beside its title, in a list row or on a board card. The display
// properties decide which appear; each is wrapped so a narrow list can drop it (see local.css).
import { Chip } from '@openchamber-ext/shared-ui/preact';
import { changeOf, compactMoney, daysUntil, estimateLabel, shortDate, sinceLabel, slaLabel } from '../../shared/format.ts';
import { Avatar, BlockedGlyph, BlockingGlyph, ChangeGlyph, CycleGlyph, ProgressRing, ProjectIcon } from '../../shared/glyphs.tsx';
import type { ChildCount } from '../../shared/issues.ts';
import type { IssueExtras, IssueRow, Label } from '../../shared/types.ts';
import type { PropertyId } from '../../shared/view-options.ts';
import { blockingCounts } from '../../shared/relations.ts';
import { teamEstimateType } from '../../shared/workspace.ts';

export const LabelChip = ({ label }: { label: Label }) => (
  <Chip><span class="lin-swatch" style={{ background: label.color }} />{label.name}</Chip>
);

const LABELS_SHOWN = 2;

export type ChipProps = {
  issue: IssueRow;
  properties: ReadonlySet<PropertyId>;
  subIssues?: ChildCount;
  /** The list is already one project, or grouped by it. */
  hideProject?: boolean;
  /** Releases, customers and time in status, when loaded. */
  extras?: IssueExtras;
};

const LinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <path d="M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.6.6M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.6-.6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
  </svg>
);

const SlaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <circle cx="7" cy="7.5" r="4.7" fill="none" stroke="currentColor" stroke-width="1.3" />
    <path d="M7 5v2.7l1.6 1M5.5 1.8h3" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
  </svg>
);

const ReleaseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <path d="M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2zM2 4.2 7 7l5-2.8M7 7v5.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
  </svg>
);

const CustomerIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <circle cx="5" cy="5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.2" />
    <path d="M1.5 11.5c.4-2 1.8-3 3.5-3s3.1 1 3.5 3M9.5 3.4a2.2 2.2 0 0 1 0 3.9M10.5 8.8c1 .4 1.7 1.3 2 2.7" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
  </svg>
);

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <circle cx="7" cy="7" r="5.2" fill="none" stroke="currentColor" stroke-width="1.2" />
    <path d="M7 4.2V7l2 1.2" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
  </svg>
);

export const IssueChips = ({ issue, properties: p, subIssues, hideProject, extras }: ChipProps) => {
  const labels = issue.labels.nodes;
  const attachments = issue.attachments?.nodes ?? [];
  const changes = attachments.map(changeOf).filter((c) => c !== null);
  const otherLinks = attachments.filter((a) => !changeOf(a));
  const { blockedBy, blocking } = blockingCounts(issue);
  const estimate = estimateLabel(issue.estimate, teamEstimateType(issue.team.id));
  const due = issue.dueDate ? daysUntil(issue.dueDate) : null;
  const sla = p.has('sla') ? slaLabel(issue.slaBreachesAt) : null;
  const releases = extras?.releases.nodes ?? [];
  const customers = (extras?.needs.nodes ?? []).map((n) => n.customer).filter((c) => c !== null);
  const revenue = customers.reduce((sum, c) => sum + (c.revenue ?? 0), 0);
  const inStatus = p.has('timeInStatus') ? sinceLabel(extras?.stateHistory.nodes[extras.stateHistory.nodes.length - 1]?.startedAt) : null;
  return (
    <>
      {subIssues && subIssues.total > 0 && (
        <span class="lin-meta lin-meta-children" title={`${subIssues.done} of ${subIssues.total} sub-issues done`}>
          <Chip><ProgressRing done={subIssues.done} total={subIssues.total} />{subIssues.done}/{subIssues.total}</Chip>
        </span>
      )}
      {p.has('labels') && labels.length > 0 && (
        <span class="lin-meta lin-meta-labels">
          {labels.slice(0, LABELS_SHOWN).map((label) => <LabelChip key={label.id} label={label} />)}
          {labels.length > LABELS_SHOWN && <Chip>+{labels.length - LABELS_SHOWN}</Chip>}
        </span>
      )}
      {p.has('changes') && changes.length > 0 && (
        <span class="lin-meta lin-meta-change" title={changes.map((c) => `${c.label} ${c.title}`).join('\n')}>
          <Chip>
            <ChangeGlyph status={changes[0]!.status} />
            {changes.length === 1 ? changes[0]!.label : `${changes.length} ${changes[0]!.label.startsWith('!') ? 'MRs' : 'PRs'}`}
          </Chip>
        </span>
      )}
      {p.has('links') && otherLinks.length > 0 && (
        <span class="lin-meta lin-meta-links" title={otherLinks.map((a) => a.title).join('\n')}><Chip><LinkIcon />{otherLinks.length}</Chip></span>
      )}
      {p.has('project') && !hideProject && issue.project && (
        <span class="lin-meta lin-meta-project" title={issue.project.name}>
          <Chip><ProjectIcon icon={issue.project.icon} color={issue.project.color} /><span class="lin-ellipsis">{issue.project.name}</span></Chip>
        </span>
      )}
      {p.has('milestone') && issue.projectMilestone && (
        <span class="lin-meta lin-meta-milestone" title={`Milestone: ${issue.projectMilestone.name}`}><Chip><span class="lin-ellipsis">{issue.projectMilestone.name}</span></Chip></span>
      )}
      {p.has('cycle') && issue.cycle && (
        <span class="lin-meta lin-meta-cycle" title={`Cycle ${issue.cycle.number}${issue.cycle.name ? `: ${issue.cycle.name}` : ''}`}>
          <Chip><CycleGlyph />{issue.cycle.number}</Chip>
        </span>
      )}
      {blockedBy > 0 && (
        <span class="lin-meta lin-meta-blocked" title={`Blocked by ${blockedBy} ${blockedBy === 1 ? 'issue' : 'issues'}`}><Chip><BlockedGlyph />{blockedBy}</Chip></span>
      )}
      {blocking > 0 && (
        <span class="lin-meta lin-meta-blocking" title={`Blocking ${blocking} ${blocking === 1 ? 'issue' : 'issues'}`}><Chip><BlockingGlyph />{blocking}</Chip></span>
      )}
      {sla && (
        <span class={`lin-meta lin-meta-sla ${sla.overdue ? 'lin-overdue' : ''}`} title={`SLA ${issue.slaType ?? ''} breaches ${shortDate(issue.slaBreachesAt)}`}><Chip><SlaIcon />{sla.text}</Chip></span>
      )}
      {p.has('release') && releases.length > 0 && (
        <span class="lin-meta lin-meta-release" title={releases.map((r) => `${r.name}${r.version ? ` ${r.version}` : ''}`).join('\n')}>
          <Chip><ReleaseIcon /><span class="lin-ellipsis">{releases[0]!.version ?? releases[0]!.name}</span>{releases.length > 1 && ` +${releases.length - 1}`}</Chip>
        </span>
      )}
      {p.has('customers') && customers.length > 0 && (
        <span class="lin-meta lin-meta-customers" title={customers.map((c) => c.name).join('\n')}>
          <Chip><CustomerIcon /><span class="lin-ellipsis">{customers[0]!.name}</span>{customers.length > 1 && ` +${customers.length - 1}`}</Chip>
        </span>
      )}
      {p.has('customerRevenue') && revenue > 0 && (
        <span class="lin-meta lin-meta-revenue" title="Customer revenue"><Chip>{compactMoney(revenue)}</Chip></span>
      )}
      {inStatus && (
        <span class="lin-meta lin-meta-in-status" title={`In ${issue.state.name} for ${inStatus}`}><Chip><ClockIcon />{inStatus}</Chip></span>
      )}
      {p.has('estimate') && estimate && (
        <span class="lin-meta lin-meta-estimate" title="Estimate"><Chip>{estimate}</Chip></span>
      )}
      {p.has('dueDate') && issue.dueDate && (
        <span class={`lin-meta lin-meta-due sui-small ${due !== null && due < 0 ? 'lin-overdue' : 'sui-muted'}`} title="Due date">{shortDate(issue.dueDate)}</span>
      )}
      {p.has('creator') && issue.creator && (
        <span class="lin-meta lin-meta-creator" title={`Created by ${issue.creator.name}`}><Avatar name={issue.creator.name} url={issue.creator.avatarUrl} /></span>
      )}
    </>
  );
};

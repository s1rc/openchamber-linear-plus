// LinearIssue(id): one issue as a card, read live. Its actions (open, start a plan, session or build, add the plan
// only) all wait for a click.
import { Card, Chip, KV } from '@openchamber-ext/shared-ui/preact';
import { useState } from 'preact/hooks';
import { LabelChip } from '../app/components/issue-chips.tsx';
import { splitIds } from '../shared/block-args.ts';
import { BuildPanel, PlanActions, useBuildSource } from '../shared/build-panel.tsx';
import { relativeTime, shortDate } from '../shared/format.ts';
import { Avatar, PriorityGlyph, ProjectIcon, StatusGlyph } from '../shared/glyphs.tsx';
import { PRIORITY_NAMES } from '../shared/grouping.ts';
import { host, useReady } from '../shared/host.ts';
import { Button } from '../shared/kit.tsx';
import type { IssueRow } from '../shared/types.ts';
import { Lookup, MissingRow } from './lookup.tsx';
import { StartPanel } from './start-panel.tsx';

const IssueCard = ({ issue }: { issue: IssueRow }) => {
  const [panel, setPanel] = useState<'session' | 'plan' | 'build' | null>(null);
  const source = useBuildSource(useReady()?.directory ?? null, issue.identifier);
  const labels = issue.labels.nodes;
  return (
    <Card class="lin-block-card">
      <div class="lin-block-title">
        <StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} size={16} />
        <span class="lin-block-key sui-mono sui-muted">{issue.identifier}</span>
        <span class="lin-block-name">{issue.title}</span>
      </div>
      <KV
        items={[
          ['Status', <span class="lin-block-value"><StatusGlyph type={issue.state.type} color={issue.state.color} teamId={issue.team.id} stateId={issue.state.id} />{issue.state.name}</span>],
          ['Priority', <span class="lin-block-value"><PriorityGlyph priority={issue.priority} />{PRIORITY_NAMES[issue.priority]}</span>],
          ['Assignee', issue.assignee
            ? <span class="lin-block-value"><Avatar name={issue.assignee.name} url={issue.assignee.avatarUrl} />{issue.assignee.name}</span>
            : <span class="sui-muted">Unassigned</span>],
          ...(issue.project ? [['Project', <span class="lin-block-value"><ProjectIcon icon={issue.project.icon} color={issue.project.color} />{issue.project.name}</span>] as const] : []),
          ...(labels.length > 0 ? [['Labels', <span class="lin-block-value lin-block-chips">{labels.map((label) => <LabelChip key={label.id} label={label} />)}</span>] as const] : []),
          ...(issue.dueDate ? [['Due', <Chip>{shortDate(issue.dueDate)}</Chip>] as const] : []),
          ['Updated', <span class="sui-muted">{relativeTime(issue.updatedAt)}</span>],
        ]}
      />
      <div class="sui-row">
        <Button label="Open in Linear" variant="outline" size="sm" onClick={() => { void host.openUrl(issue.url); }} />
        <Button label="Start Session" variant="outline" size="sm" disabled={panel === 'session'} onClick={() => setPanel('session')} />
        <Button label="Plan" variant="outline" size="sm" disabled={panel === 'plan'} onClick={() => setPanel('plan')} />
        <PlanActions identifier={issue.identifier} source={source} size="sm" building={panel === 'build'} onBuild={() => setPanel('build')} />
      </div>
      {(panel === 'session' || panel === 'plan') && <StartPanel issue={issue} plan={panel === 'plan'} onClose={() => setPanel(null)} />}
      {panel === 'build' && source && (
        <div class="lin-block-start"><BuildPanel identifier={issue.identifier} source={source} onClose={() => setPanel(null)} /></div>
      )}
    </Card>
  );
};

export const IssueBlock = ({ args }: { args: Record<string, string> }) => {
  const { ids } = splitIds(args.id);
  const id = ids[0];
  if (!id) return <div class="sui-muted">LinearIssue needs an issue identifier such as ENG-123.</div>;
  return (
    <Lookup ids={[id]}>
      {(found) => {
        const issue = found.get(id);
        return issue ? <IssueCard issue={issue} /> : <MissingRow id={id} />;
      }}
    </Lookup>
  );
};

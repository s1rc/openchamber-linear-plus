// Cycles: a team's current cycle first, with its burn-up and issues; pick any recent or upcoming one.
import type { HostReadyContext } from '@openchamber/sdk';
import { Cards, Section, StatCard } from '@openchamber-ext/shared-ui/preact';
import { useContext, useMemo, useState } from 'preact/hooks';
import { burnupOf } from '../../shared/burnup.ts';
import { useIssueList } from '../../shared/issues.ts';
import { useQuery } from '../../shared/cache.ts';
import { daysUntil, percent, shortDate } from '../../shared/format.ts';
import { Banner, Empty, Progress, Select, Spinner } from '../../shared/kit.tsx';
import { gql } from '../../shared/linear.ts';
import { CYCLE_DETAIL, TEAM_CYCLES } from '../../shared/queries.ts';
import { orderCycles } from '../../shared/cycles.ts';
import type { CycleDetailResult, CycleSummary, TeamCyclesResult } from '../../shared/types.ts';
import type { DetectionState } from '../../shared/use-detection.ts';
import type { Workspace } from '../../shared/workspace.ts';
import { BurnupChart } from '../components/burnup-chart.tsx';
import { IssueBrowser } from '../components/issue-browser.tsx';
import { PlaceKey, saveTab, tabFor } from '../view-state.ts';

/** Cycles shown before the active one, as Linear keeps them in reach. */
const PAST_SHOWN = 6;

const cycleName = (c: CycleSummary) => `Cycle ${c.number}${c.name ? `: ${c.name}` : ''}`;
const cycleWord = (c: CycleSummary) => (c.isActive ? 'Current' : c.isFuture ? 'Upcoming' : 'Completed');

const CycleBody = ({ ctx, cycle, teamId, viewerId, estimates }: { ctx: HostReadyContext; cycle: CycleSummary; teamId: string; viewerId: string; estimates: boolean }) => {
  const detail = useQuery(`cycle:${cycle.id}`, async () => (await gql<CycleDetailResult>(CYCLE_DETAIL, { id: cycle.id })).cycle);
  // The burn-up is drawn from the cycle's own issues, the same list the browser below shows.
  const issues = useIssueList({ cycle: { id: { eq: cycle.id } } });
  const burnup = useMemo(() => (issues.data ? burnupOf(cycle, issues.data.issues, estimates) : null), [issues.data, cycle, estimates]);
  const left = daysUntil(cycle.endsAt);
  return (
    <div class="lin-stack">
      <Section title={`${cycleName(cycle)} · ${cycleWord(cycle)}`}>
        <div class="sui-muted sui-small">{shortDate(cycle.startsAt)} to {shortDate(cycle.endsAt)}</div>
        <Progress value={cycle.progress * 100} label={`${percent(cycle.progress)} complete`} />
        <Cards>
          {burnup && !cycle.isFuture && <StatCard label="Scope" value={burnup.scope} breakdown={[{ tone: 'muted', text: burnup.unit }]} />}
          {burnup && !cycle.isFuture && <StatCard label="Started" value={burnup.inProgress} breakdown={[{ tone: 'warning', text: 'in progress' }]} />}
          {burnup && !cycle.isFuture && <StatCard label="Completed" value={burnup.completed} breakdown={[{ tone: 'info', text: burnup.scope ? `${Math.round((burnup.completed / burnup.scope) * 100)}% of scope` : 'no scope' }]} />}
          {cycle.isActive && left !== null && <StatCard label="Ends" value={shortDate(cycle.endsAt)} breakdown={[{ tone: left <= 2 ? 'warning' : 'muted', text: left < 0 ? 'ended' : `${left} days left` }]} />}
          {cycle.isFuture && <StatCard label="Starts" value={shortDate(cycle.startsAt)} breakdown={[{ tone: 'muted', text: `in ${daysUntil(cycle.startsAt) ?? 0} days` }]} />}
        </Cards>
        {issues.error && !issues.data && <Banner tone="error" title="Could not load the burn-up" action={{ label: 'Retry', onClick: () => issues.refresh() }} />}
        {!issues.data && !issues.error && <Spinner size="sm" label="Loading burn-up" />}
        {burnup && !cycle.isFuture && <BurnupChart burnup={burnup} startsAt={cycle.startsAt} endsAt={cycle.endsAt} />}
        {issues.data?.capped && <div class="sui-muted sui-small">The chart counts the first 500 issues.</div>}
        {detail.data?.description && <div class="sui-muted sui-small">{detail.data.description}</div>}
      </Section>
      <IssueBrowser
        key={cycle.id}
        ctx={ctx}
        listKey={`cycle:${cycle.id}`}
        scope={{ cycle: { id: { eq: cycle.id } } }}
        teamIds={[teamId]}
        viewerId={viewerId}
        states="all"
        emptyTitle="No issues in this cycle"
        emptyBody={cycle.isFuture ? 'Nothing is planned for this cycle yet.' : 'Nothing was added to this cycle.'}
      />
    </div>
  );
};

type Props = { ctx: HostReadyContext; workspace: Workspace; state: DetectionState; scoped: boolean };

export const Cycles = ({ ctx, workspace, state, scoped }: Props) => {
  const placeKey = useContext(PlaceKey);
  const [, rerender] = useState(0);
  const withCycles = (ids: Iterable<string>) => [...ids].map((id) => workspace.teamsById.get(id)).filter((t) => t?.cyclesEnabled);
  const folderTeams = scoped ? withCycles(state.detection.teamIds) : [];
  const teams = (folderTeams.length ? folderTeams : withCycles(workspace.myTeamIds)) as NonNullable<ReturnType<typeof withCycles>[number]>[];

  const saved = tabFor(placeKey, 'cycles:team');
  const team = teams.find((t) => t.id === saved) ?? teams[0];
  const minNumber = Math.max(0, (team?.activeCycle?.number ?? 0) - PAST_SHOWN);
  const list = useQuery(team ? `cycles:${team.id}:${minNumber}` : null, async () => {
    const data = await gql<TeamCyclesResult>(TEAM_CYCLES, { teamId: team!.id, minNumber });
    return orderCycles(data.team.cycles.nodes);
  });

  if (!team) {
    return <Empty title="No team with cycles" body={scoped && state.mapped ? "This folder's team does not use cycles. Use Show all to see your other teams." : 'None of your teams use cycles.'} />;
  }

  const cycles = list.data ?? [];
  const savedCycle = tabFor(placeKey, `cycles:cycle:${team.id}`);
  const cycle = cycles.find((c) => c.id === savedCycle) ?? cycles.find((c) => c.isActive) ?? cycles.find((c) => c.isFuture) ?? cycles[0];

  return (
    <div class="lin-stack">
      <div class="sui-row">
        {teams.length > 1 && (
          <Select
            value={team.id}
            options={teams.map((t) => ({ id: t.id, label: `${t.key} · ${t.name}` }))}
            onChange={(id) => { saveTab(placeKey, 'cycles:team', id); rerender((n) => n + 1); }}
          />
        )}
        {cycles.length > 0 && cycle && (
          <Select
            value={cycle.id}
            options={cycles.map((c) => ({ id: c.id, label: cycleName(c), hint: cycleWord(c) }))}
            onChange={(id) => { saveTab(placeKey, `cycles:cycle:${team.id}`, id); rerender((n) => n + 1); }}
          />
        )}
        <span class="sui-muted sui-small">{team.name}</span>
      </div>
      {list.error && !list.data && <Banner tone="error" title="Could not load cycles" action={{ label: 'Retry', onClick: () => list.refresh() }} />}
      {list.loading && !list.data && <Spinner label="Loading cycles" />}
      {list.data && !cycle && <Empty title="No cycles yet" body={`${team.name} has no current or upcoming cycle.`} />}
      {cycle && <CycleBody key={cycle.id} ctx={ctx} cycle={cycle} teamId={team.id} viewerId={workspace.viewer.id} estimates={team.issueEstimationType !== 'notUsed'} />}
    </div>
  );
};

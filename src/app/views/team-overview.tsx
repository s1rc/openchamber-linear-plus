// A mapped team: its active cycle and its active projects.
import { Cards, Section, StatCard } from '@openchamber-ext/shared-ui/preact';
import { daysUntil, HEALTH_LABEL, HEALTH_TONE, percent, shortDate } from '../../shared/format.ts';
import { host } from '../../shared/host.ts';
import { Button, Empty, List, Progress, Spinner } from '../../shared/kit.tsx';
import { useTeamProjects } from '../../shared/projects.ts';
import type { Team } from '../../shared/types.ts';

export const TeamOverview = ({ team, orgKey, onProject }: { team: Team; orgKey: string; onProject: (id: string) => void }) => {
  const projects = useTeamProjects([team.id]);
  const cycle = team.activeCycle;
  const left = cycle ? daysUntil(cycle.endsAt) : null;
  return (
    <Section title={`${team.name} (${team.key})`}>
      {cycle ? (
        <>
          <Progress value={cycle.progress * 100} label={`Cycle ${cycle.number}${cycle.name ? `: ${cycle.name}` : ''}`} />
          <Cards>
            <StatCard label="Cycle progress" value={percent(cycle.progress)} />
            <StatCard
              label="Cycle ends"
              value={shortDate(cycle.endsAt)}
              breakdown={left === null ? undefined : [{ tone: left <= 2 ? 'warning' : 'muted', text: left < 0 ? 'ended' : `${left} days left` }]}
            />
          </Cards>
        </>
      ) : (
        <div class="sui-muted sui-small">{team.cyclesEnabled ? 'No active cycle.' : 'This team does not use cycles.'}</div>
      )}
      <div class="lin-subheading">Active projects</div>
      {projects.loading && !projects.data ? (
        <Spinner size="sm" label="Loading projects" />
      ) : projects.data?.length ? (
        <List
          items={projects.data.slice(0, 25).map((p) => ({
            id: p.id,
            title: p.name,
            subtitle: [p.status.name, p.targetDate ? `target ${shortDate(p.targetDate)}` : ''].filter(Boolean).join(' · '),
            meta: percent(p.progress),
            ...(p.health ? { badge: { label: HEALTH_LABEL[p.health], tone: HEALTH_TONE[p.health] } } : {}),
          }))}
          onSelect={onProject}
          ariaLabel={`${team.name} projects`}
        />
      ) : (
        <Empty title="No active projects" body={`${team.name} has no project in progress.`} />
      )}
      <div class="sui-row">
        <Button label="Open team in Linear" variant="outline" size="sm" onClick={() => { void host.openUrl(`https://linear.app/${orgKey}/team/${team.key}/active`); }} />
      </div>
    </Section>
  );
};

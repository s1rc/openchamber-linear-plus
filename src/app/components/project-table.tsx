// Projects as rows with columns: name and status, health, lead, target and progress. The Projects page and a team's
// overview draw the same table.
import { Dot } from '@openchamber-ext/shared-ui/preact';
import { HEALTH_LABEL, HEALTH_TONE, shortDate } from '../../shared/format.ts';
import { Avatar } from '../../shared/glyphs.tsx';
import { Progress } from '../../shared/kit.tsx';
import type { ProjectSummary } from '../../shared/types.ts';

export const ProjectTable = ({ projects, onOpen }: { projects: readonly ProjectSummary[]; onOpen: (id: string) => void }) => (
  <div class="lin-table">
    <div class="lin-table-row lin-table-head" aria-hidden="true">
      <span>Name</span><span>Health</span><span>Lead</span><span>Target</span><span>Progress</span>
    </div>
    {projects.map((p) => (
      <button type="button" class="lin-table-row" key={p.id} onClick={() => onOpen(p.id)}>
        <span class="lin-table-name">
          <span class="lin-swatch" style={{ background: p.color }} />
          <span class="lin-ellipsis">{p.name}</span>
          <span class="sui-muted sui-small lin-ellipsis">{p.status.name}</span>
        </span>
        <span class="sui-row sui-small">{p.health ? <><Dot tone={HEALTH_TONE[p.health]} />{HEALTH_LABEL[p.health]}</> : <span class="sui-muted">None</span>}</span>
        <span>{p.lead ? <span title={p.lead.name}><Avatar name={p.lead.name} url={p.lead.avatarUrl} /></span> : <span class="sui-muted sui-small">None</span>}</span>
        <span class="sui-small">{shortDate(p.targetDate) || <span class="sui-muted">None</span>}</span>
        <span class="lin-table-progress"><Progress value={p.progress * 100} /></span>
      </button>
    ))}
  </div>
);

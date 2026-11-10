import { useMemo } from 'preact/hooks';
import { legibleColor } from './colors.ts';
import type { StateType } from './types.ts';
import { startedFill } from './workspace.ts';

const pageBackground = () => (typeof document === 'undefined' ? '' : getComputedStyle(document.documentElement).getPropertyValue('--oc-bg'));

/** The pie wedge inside a started state's ring, from 12 o'clock clockwise. */
const wedge = (fraction: number): string => {
  if (fraction >= 0.999) return 'M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z';
  const angle = fraction * Math.PI * 2;
  const x = 7 + 3.8 * Math.sin(angle);
  const y = 7 - 3.8 * Math.cos(angle);
  return `M7 7L7 3.2A3.8 3.8 0 ${fraction > 0.5 ? 1 : 0} 1 ${x.toFixed(2)} ${y.toFixed(2)}z`;
};

type StatusProps = {
  type: StateType;
  color?: string;
  size?: number;
  /** Started states: how full the pie is (0 to 1). Given the team and state ids it is worked out. */
  fill?: number;
  teamId?: string;
  stateId?: string;
};

/** Linear's workflow state icon, in the state's own color. */
export const StatusGlyph = ({ type, color, size = 14, fill, teamId, stateId }: StatusProps) => {
  const base = color || 'currentColor';
  const c = useMemo(() => legibleColor(base, pageBackground()), [base, pageBackground()]);
  const common = { width: size, height: size, viewBox: '0 0 14 14', 'aria-hidden': true, style: { flex: 'none' } };
  switch (type) {
    case 'triage':
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="6.25" fill={c} />
          <path d="M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5" fill="none" stroke="var(--oc-bg)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      );
    case 'backlog':
      return (
        <svg {...common}><circle cx="7" cy="7" r="5.5" fill="none" stroke={c} stroke-width="1.5" stroke-dasharray="1.2 2.1" stroke-linecap="round" /></svg>
      );
    case 'unstarted':
      return (
        <svg {...common}><circle cx="7" cy="7" r="5.5" fill="none" stroke={c} stroke-width="1.5" /></svg>
      );
    case 'started': {
      const amount = fill ?? (teamId && stateId ? startedFill(teamId, stateId) : 0.5);
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="5.5" fill="none" stroke={c} stroke-width="1.5" />
          <path d={wedge(amount)} fill={c} />
        </svg>
      );
    }
    case 'completed':
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="6.25" fill={c} />
          <path d="M4.3 7.2l1.9 1.9 3.5-3.7" fill="none" stroke="var(--oc-bg)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      );
    case 'canceled':
    case 'duplicate':
      return (
        <svg {...common}>
          <circle cx="7" cy="7" r="6.25" fill={c} />
          <path d="M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2" fill="none" stroke="var(--oc-bg)" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      );
  }
};

/** Linear priority glyph: 0 none, 1 urgent, 2 high, 3 medium, 4 low. */
export const PriorityGlyph = ({ priority, size = 14 }: { priority: number; size?: number }) => {
  const common = { width: size, height: size, viewBox: '0 0 14 14', 'aria-hidden': true, style: { flex: 'none' } };
  if (priority === 1) {
    return (
      <svg {...common}>
        <rect x="1.5" y="1.5" width="11" height="11" rx="2.5" fill="var(--oc-warning)" />
        <path d="M7 4v3.6M7 9.4v.2" stroke="var(--oc-bg)" stroke-width="1.6" stroke-linecap="round" />
      </svg>
    );
  }
  if (priority >= 2 && priority <= 4) {
    const lit = 5 - priority;
    return (
      <svg {...common}>
        {[0, 1, 2].map((i) => (
          <rect x={2 + i * 4} y={9 - i * 3} width="2.4" height={3 + i * 3} rx="0.6" fill="currentColor" opacity={i < lit ? 1 : 0.28} />
        ))}
      </svg>
    );
  }
  return (
    <svg {...common}><path d="M2.5 7h2M6 7h2M9.5 7h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5" /></svg>
  );
};

export const Avatar = ({ name, url, size = 18 }: { name: string; url?: string | null; size?: number }) => {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]!.toUpperCase()).join('') || '?';
  // Preact 11 adds no "px" to numbers in style objects, so the units are written out.
  const style = { width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.42)}px` };
  if (url) return <img class="lin-avatar" src={url} alt={name} style={style} />;
  return <span class="lin-avatar" style={style}>{initials}</span>;
};

const TONE_COLOR = { open: 'var(--oc-info)', merged: 'var(--oc-success)', closed: 'var(--oc-muted)', draft: 'var(--oc-muted)' } as const;

/** Merge or pull request, tinted by its state. */
export const ChangeGlyph = ({ status, size = 13 }: { status: keyof typeof TONE_COLOR | null; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <g fill="none" stroke={status ? TONE_COLOR[status] : 'currentColor'} stroke-width="1.4" stroke-linecap="round">
      <circle cx="3.5" cy="3" r="1.6" /><circle cx="3.5" cy="11" r="1.6" /><circle cx="10.5" cy="11" r="1.6" />
      <path d="M3.5 4.6v4.8M10.5 9.4V6.5a2 2 0 0 0-2-2H6.5" /><path d="M7.8 3.2 6.3 4.5l1.5 1.3" />
    </g>
  </svg>
);

export const CycleGlyph = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <circle cx="7" cy="7" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4" />
    <path d="M5.6 4.6 9.2 7l-3.6 2.4z" fill="currentColor" />
  </svg>
);

export const EstimateGlyph = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <path d="M7 2 12.5 11.5h-11z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
  </svg>
);

/** Sub-issue progress ring, as Linear draws it beside "2/3". */
export const ProgressRing = ({ done, total, size = 13 }: { done: number; total: number; size?: number }) => {
  const r = 5;
  const length = 2 * Math.PI * r;
  const part = total ? Math.min(1, done / total) : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
      <circle cx="7" cy="7" r={r} fill="none" stroke="var(--oc-border)" stroke-width="2" />
      <circle cx="7" cy="7" r={r} fill="none" stroke={part >= 1 ? 'var(--oc-success)' : 'var(--oc-info)'} stroke-width="2"
        stroke-dasharray={`${length * part} ${length}`} transform="rotate(-90 7 7)" stroke-linecap="round" />
    </svg>
  );
};

/** Blocked by another issue: a red no-entry sign. */
export const BlockedGlyph = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <circle cx="7" cy="7" r="6" fill="var(--oc-error)" />
    <path d="M4 7h6" stroke="var(--oc-bg)" stroke-width="1.8" stroke-linecap="round" />
  </svg>
);

/** Blocking another issue: a flag on a square, in the warning color. */
export const BlockingGlyph = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
    <rect x="1.5" y="1.5" width="11" height="11" rx="3" fill="none" stroke="var(--oc-warning)" stroke-width="1.5" />
    <path d="M5 10V4.5h4.2l-.9 1.4.9 1.4H5" fill="var(--oc-warning)" stroke="var(--oc-warning)" stroke-width="1" stroke-linejoin="round" />
  </svg>
);

/** A project's icon: its emoji when it has one, else Linear's hexagon in the project's color. */
export const ProjectIcon = ({ icon, color, size = 13 }: { icon?: string | null; color?: string | null; size?: number }) => {
  if (icon && /\p{Extended_Pictographic}/u.test(icon)) {
    return <span class="lin-project-emoji" style={{ fontSize: `${size}px` }} aria-hidden="true">{icon}</span>;
  }
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" style={{ flex: 'none' }}>
      <path d="M7 1.2 12.2 4.1v5.8L7 12.8 1.8 9.9V4.1z" fill={color || 'var(--oc-muted)'} />
      <path d="M4.6 7h4.8M7 4.6v4.8" stroke="var(--oc-bg)" stroke-width="1.2" stroke-linecap="round" opacity="0.85" />
    </svg>
  );
};

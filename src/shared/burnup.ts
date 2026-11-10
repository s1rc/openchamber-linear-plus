// A cycle's burn-up, built from its issues. Linear's own daily history is one nightly snapshot, so
// it lags a day behind and has too few points to draw a curve; the issues' timestamps give today's
// real numbers and a history. Pure, so tests can check them.
import type { IssueRow } from './types.ts';

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
/** About 24 samples across a cycle, six to twelve hours apart: enough for a smooth curve, cheap to compute. */
const stepOf = (lengthMs: number): number => Math.max(6 * HOUR, Math.min(12 * HOUR, lengthMs / 24));

export type Sample = {
  /** Days since the cycle began, fractional. */
  day: number;
  scope: number;
  /** Work that has started, finished work included. */
  started: number;
  completed: number;
};

export type Burnup = {
  /** The cycle's length in days. */
  days: number;
  /** Days elapsed at the last sample, clamped to the cycle. */
  now: number;
  unit: 'points' | 'issues';
  samples: Sample[];
  scope: number;
  completed: number;
  /** In progress right now: started and not finished. */
  inProgress: number;
  max: number;
};

const time = (value: string | null | undefined): number | null => {
  if (!value) return null;
  const at = new Date(value).getTime();
  return Number.isNaN(at) ? null : at;
};

type Timeline = { weight: number; added: number; canceled: number | null; started: number | null; completed: number | null };

const timelineOf = (issue: IssueRow, weight: number): Timeline => {
  const completed = time(issue.completedAt);
  return {
    weight,
    // An issue added before the cycle began counts from its first day.
    added: time(issue.addedToCycleAt) ?? time(issue.createdAt) ?? 0,
    canceled: time(issue.canceledAt),
    // Moved straight to done: it started when it finished.
    started: time(issue.startedAt) ?? completed,
    completed,
  };
};

/**
 * Teams that estimate chart points; teams that do not chart issue counts. A team that estimates but
 * has no estimated work in the cycle falls back to counting issues too.
 */
export const burnupOf = (cycle: { startsAt: string; endsAt: string }, issues: IssueRow[], estimates: boolean, now = Date.now()): Burnup => {
  const start = new Date(cycle.startsAt).getTime();
  const end = new Date(cycle.endsAt).getTime();
  const days = Math.max(1, (end - start) / DAY);
  const unit: Burnup['unit'] = estimates && issues.some((i) => (i.estimate ?? 0) > 0) ? 'points' : 'issues';
  const timelines = issues.map((i) => timelineOf(i, unit === 'points' ? (i.estimate ?? 0) : 1));

  const at = (t: number): Sample => {
    let scope = 0;
    let started = 0;
    let completed = 0;
    for (const line of timelines) {
      if (line.added > t || (line.canceled !== null && line.canceled <= t)) continue;
      scope += line.weight;
      if (line.started !== null && line.started <= t) started += line.weight;
      if (line.completed !== null && line.completed <= t) completed += line.weight;
    }
    return { day: (t - start) / DAY, scope, started, completed };
  };

  const last = Math.min(now, end);
  const samples: Sample[] = [];
  if (last >= start) {
    for (let t = start; t < last; t += stepOf(end - start)) samples.push(at(t));
    samples.push(at(last));
  }
  const final = samples[samples.length - 1] ?? { day: 0, scope: 0, started: 0, completed: 0 };
  return {
    days,
    now: Math.max(0, Math.min(days, final.day)),
    unit,
    samples,
    scope: final.scope,
    completed: final.completed,
    inProgress: Math.max(0, final.started - final.completed),
    max: Math.max(1, ...samples.map((s) => s.scope)),
  };
};

export type Point = { x: number; y: number };

/** Chart coordinates: day 0 at the left, `days` at the right, 0 at the bottom. */
export const toPoints = (samples: Sample[], pick: (s: Sample) => number, days: number, max: number, width: number, height: number): Point[] =>
  samples.map((s) => ({ x: (s.day / days) * width, y: height - (pick(s) / max) * height }));

const fixed = (n: number) => n.toFixed(1);

export const pathOf = (points: Point[]): string => points.map((p, i) => `${i ? 'L' : 'M'}${fixed(p.x)} ${fixed(p.y)}`).join(' ');

/**
 * A smooth line through the points that never overshoots them (a monotone cubic, Fritsch and Carlson),
 * so a curve that only rises never dips between two samples.
 */
export const smoothPath = (points: Point[]): string => {
  const n = points.length;
  if (n < 3) return pathOf(points);
  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i += 1) {
    dx.push(points[i + 1]!.x - points[i]!.x);
    slope.push(dx[i]! === 0 ? 0 : (points[i + 1]!.y - points[i]!.y) / dx[i]!);
  }
  const tangent: number[] = [slope[0]!];
  for (let i = 1; i < n - 1; i += 1) tangent.push(slope[i - 1]! * slope[i]! <= 0 ? 0 : (slope[i - 1]! + slope[i]!) / 2);
  tangent.push(slope[n - 2]!);
  for (let i = 0; i < n - 1; i += 1) {
    if (slope[i] === 0) { tangent[i] = 0; tangent[i + 1] = 0; continue; }
    const a = tangent[i]! / slope[i]!;
    const b = tangent[i + 1]! / slope[i]!;
    const h = Math.hypot(a, b);
    if (h > 3) { tangent[i] = (3 * a / h) * slope[i]!; tangent[i + 1] = (3 * b / h) * slope[i]!; }
  }
  let d = `M${fixed(points[0]!.x)} ${fixed(points[0]!.y)}`;
  for (let i = 0; i < n - 1; i += 1) {
    const p = points[i]!;
    const q = points[i + 1]!;
    const third = dx[i]! / 3;
    d += ` C${fixed(p.x + third)} ${fixed(p.y + tangent[i]! * third)} ${fixed(q.x - third)} ${fixed(q.y - tangent[i + 1]! * third)} ${fixed(q.x)} ${fixed(q.y)}`;
  }
  return d;
};

/** The area under a path, closed down to the baseline. `path` is the smooth or straight line. */
export const areaUnder = (path: string, points: Point[], height: number): string =>
  points.length ? `${path} L${fixed(points[points.length - 1]!.x)} ${height} L${fixed(points[0]!.x)} ${height} Z` : '';

/** Round axis ticks from 0 up to the first one that covers the max, such as 0, 10, 20, 30 for 27. */
export const ticksOf = (max: number, count = 4): number[] => {
  const raw = max / count;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * magnitude).find((s) => s >= raw) ?? magnitude * 10;
  const ticks: number[] = [];
  for (let v = 0; ; v += step) {
    ticks.push(Math.round(v * 1000) / 1000);
    if (v >= max) break;
  }
  return ticks;
};

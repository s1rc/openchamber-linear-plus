// A cycle's burn-up as Linear draws it: scope, work started and work completed, with smooth curves,
// a dotted ideal line, and a marker for now. Drawn at the frame's width.
import { useEffect, useRef, useState } from 'preact/hooks';
import { areaUnder, smoothPath, ticksOf, toPoints, type Burnup } from '../../shared/burnup.ts';
import { shortDate } from '../../shared/format.ts';

const HEIGHT = 220;
const PAD = { left: 34, right: 14, top: 12, bottom: 24 };

const useWidth = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new ResizeObserver(() => setWidth(Math.floor(node.getBoundingClientRect().width)));
    observer.observe(node);
    setWidth(Math.floor(node.getBoundingClientRect().width));
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
};

export const BurnupChart = ({ burnup, startsAt, endsAt }: { burnup: Burnup; startsAt: string; endsAt: string }) => {
  const [ref, width] = useWidth();
  const w = Math.max(0, width - PAD.left - PAD.right);
  const h = HEIGHT - PAD.top - PAD.bottom;
  const { days, now, samples, unit } = burnup;
  const ticks = ticksOf(burnup.max);
  const top = ticks[ticks.length - 1] ?? burnup.max;
  const scope = toPoints(samples, (s) => s.scope, days, top, w, h);
  const started = toPoints(samples, (s) => s.started, days, top, w, h);
  const completed = toPoints(samples, (s) => s.completed, days, top, w, h);
  const x = (day: number) => (day / days) * w;
  const lastScope = scope[scope.length - 1];
  const middle = new Date(new Date(startsAt).getTime() + (new Date(endsAt).getTime() - new Date(startsAt).getTime()) / 2).toISOString();
  const middleHidden = Math.abs(now - days / 2) < days * 0.14;
  // A tick for each day of the cycle at the foot of the chart, or each week of a long one.
  const dayStep = days > 21 ? 7 : 1;
  const dayMarks = Array.from({ length: Math.floor(days / dayStep) + 1 }, (_, n) => n * dayStep).filter((d) => d <= days + 0.001);
  const startedPath = smoothPath(started);
  const completedPath = smoothPath(completed);

  return (
    <div ref={ref} class="lin-burnup">
      {w > 60 && samples.length > 1 && (
        <svg width={width} height={HEIGHT} role="img" aria-label={`Burn-up: ${burnup.completed} of ${burnup.scope} ${unit} completed`}>
          <g transform={`translate(${PAD.left} ${PAD.top})`}>
            {ticks.map((tick) => {
              const y = h - (tick / top) * h;
              return (
                <g key={tick}>
                  <line class="lin-bu-grid" x1="0" x2={w} y1={y} y2={y} />
                  <text class="lin-bu-label" x="-6" y={y + 3} text-anchor="end">{tick}</text>
                </g>
              );
            })}
            {lastScope && <path class="lin-bu-target" d={`M0 ${h} L${w} ${lastScope.y}`} />}
            <path class="lin-bu-started-area" d={areaUnder(startedPath, started, h)} />
            <path class="lin-bu-completed-area" d={areaUnder(completedPath, completed, h)} />
            <path class="lin-bu-scope" d={smoothPath(scope)} />
            {lastScope && now < days && <path class="lin-bu-scope lin-bu-scope--ahead" d={`M${lastScope.x} ${lastScope.y} L${w} ${lastScope.y}`} />}
            <path class="lin-bu-started" d={startedPath} />
            <path class="lin-bu-completed" d={completedPath} />
            {now > 0 && now < days && <line class="lin-bu-today" x1={x(now)} x2={x(now)} y1="0" y2={h} />}
            {started.length > 0 && <circle class="lin-bu-dot lin-bu-dot--started" cx={started[started.length - 1]!.x} cy={started[started.length - 1]!.y} r="3.5" />}
            {completed.length > 0 && <circle class="lin-bu-dot lin-bu-dot--completed" cx={completed[completed.length - 1]!.x} cy={completed[completed.length - 1]!.y} r="3.5" />}
            {dayMarks.map((d) => <line key={d} class="lin-bu-day" x1={x(d)} x2={x(d)} y1={h - 7} y2={h} />)}
            <text class="lin-bu-label" x="0" y={h + 16}>{shortDate(startsAt)}</text>
            <text class="lin-bu-label" x={w / 2} y={h + 16} text-anchor="middle" opacity={middleHidden ? 0 : 1}>{shortDate(middle)}</text>
            <text class="lin-bu-label" x={w} y={h + 16} text-anchor="end">{shortDate(endsAt)}</text>
            {now > 0 && now < days && <text class="lin-bu-label lin-bu-label--now" x={x(now)} y={h + 16} text-anchor="middle">Today</text>}
          </g>
        </svg>
      )}
      <div class="lin-bu-legend sui-small">
        <span class="lin-bu-key lin-bu-key--scope">Scope {burnup.scope}</span>
        <span class="lin-bu-key lin-bu-key--started">Started {burnup.inProgress}</span>
        <span class="lin-bu-key lin-bu-key--completed">Completed {burnup.completed}</span>
        <span class="sui-muted">{unit}</span>
      </div>
    </div>
  );
};

import type { CycleSummary } from './types.ts';

/**
 * The lowest cycle number to ask Linear for. Linear refuses a number comparison that is not a positive integer
 * ("number comparisons must use positive integers"), so `gte: 0` fails; cycles start at 1.
 */
export const cycleFloor = (number: number | null | undefined): number => Math.max(1, Math.floor(Number.isFinite(number) ? number! : 1));

/**
 * Upcoming cycles first with the furthest at the top, so the nearest sits just above the current one,
 * then the current cycle, then past cycles newest first.
 */
export const orderCycles = (cycles: CycleSummary[]): CycleSummary[] => {
  const rank = (c: CycleSummary) => (c.isFuture ? 0 : c.isActive ? 1 : 2);
  return [...cycles].sort((a, b) => rank(a) - rank(b) || (rank(a) === 1 ? 0 : b.number - a.number));
};

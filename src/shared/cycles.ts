import type { CycleSummary } from './types.ts';

/**
 * Upcoming cycles first with the furthest at the top, so the nearest sits just above the current one,
 * then the current cycle, then past cycles newest first.
 */
export const orderCycles = (cycles: CycleSummary[]): CycleSummary[] => {
  const rank = (c: CycleSummary) => (c.isFuture ? 0 : c.isActive ? 1 : 2);
  return [...cycles].sort((a, b) => rank(a) - rank(b) || (rank(a) === 1 ? 0 : b.number - a.number));
};

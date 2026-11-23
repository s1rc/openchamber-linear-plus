import { describe, expect, test } from 'bun:test';
import { issueCountText, milestoneCounts, milestoneDone, milestoneFilter, milestoneFraction } from '../src/shared/milestones.ts';

describe('milestones', () => {
  test('a milestone\'s progress is a percent: 2 of 5 done with 1 started is not complete', () => {
    // M2 of the GitLab migration: 2 done, 1 started (25%), 2 not started, by issue count: (2 + 0.25) / 5.
    expect(milestoneFraction(45)).toBe(0.45);
    expect(milestoneDone(45)).toBe(false);
    expect(milestoneDone(99.9)).toBe(false);
    expect(milestoneDone(100)).toBe(true);
    expect(milestoneFraction(0)).toBe(0);
    expect(milestoneFraction(Number.NaN)).toBe(0);
    expect(milestoneFraction(140)).toBe(1);
  });

  test('counts every issue per milestone and skips issues in none', () => {
    const counts = milestoneCounts([{ projectMilestone: { id: 'm1' } }, { projectMilestone: { id: 'm1' } }, { projectMilestone: null }, { projectMilestone: { id: 'm2' } }]);
    expect([...counts]).toEqual([['m1', 2], ['m2', 1]]);
  });

  test('says the count as Linear does, and nothing before it is known', () => {
    expect(issueCountText(12)).toBe('12 issues');
    expect(issueCountText(1)).toBe('1 issue');
    expect(issueCountText(0)).toBe('0 issues');
    expect(issueCountText(undefined)).toBeNull();
  });

  test('a milestone filter has no state part', () => {
    expect(milestoneFilter('m1')).toEqual({ projectMilestone: { id: { eq: 'm1' } } });
  });
});

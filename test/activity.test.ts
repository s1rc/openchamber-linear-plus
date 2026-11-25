import { describe, expect, test } from 'bun:test';
import { describeProjectEvent, projectEvents, type ProjectEvent } from '../src/shared/activity.ts';
import { projectBurnupOf, projectRange } from '../src/shared/burnup.ts';
import type { ProjectIssueTimeline } from '../src/shared/types.ts';

const event = (entry: Record<string, unknown>): ProjectEvent => ({ id: 'e1', at: 1, actorId: 'u1', entry });
const nameOf = (id: string) => ({ 'u-ada': 'Ada Park' } as Record<string, string>)[id];

describe('projectEvents', () => {
  test('flattens entries, newest first, and reads actorIds', () => {
    const events = projectEvents([
      { id: 'h1', createdAt: '2026-11-01T00:00:00Z', entries: [{ type: 'name', to: 'New', at: 100, actorId: 'u1' }] },
      { id: 'h2', createdAt: '2026-11-02T00:00:00Z', entries: [{ type: 'status', to: 'In Progress', at: 200, actorIds: ['u2'] }] },
    ]);
    expect(events.map((e) => e.entry.type)).toEqual(['status', 'name']);
    expect(events[0]!.actorId).toBe('u2');
  });

  test('ignores entries that are not objects and falls back to the record time', () => {
    const events = projectEvents([{ id: 'h1', createdAt: '2026-11-01T00:00:00Z', entries: ['x', null, { type: 'dates' }] }]);
    expect(events.length).toBe(1);
    expect(events[0]!.at).toBe(new Date('2026-11-01T00:00:00Z').getTime());
    expect(projectEvents([{ id: 'h2', createdAt: '2026-11-01T00:00:00Z', entries: { no: true } }])).toEqual([]);
  });
});

describe('describeProjectEvent', () => {
  test('status, lead, priority and dates', () => {
    expect(describeProjectEvent(event({ type: 'status', from: 'To Do', to: 'In Progress' }), nameOf)).toBe('changed status from To Do to In Progress');
    expect(describeProjectEvent(event({ type: 'status', to: 'In Progress' }), nameOf)).toBe('set status to In Progress');
    expect(describeProjectEvent(event({ type: 'leadId', to: 'u-ada' }), nameOf)).toBe('set the lead to Ada Park');
    expect(describeProjectEvent(event({ type: 'leadId', to: null }), nameOf)).toBe('removed the lead');
    expect(describeProjectEvent(event({ type: 'priority', to: 2 }), nameOf)).toBe('set priority to High');
    expect(describeProjectEvent(event({ type: 'targetDate', to: '2026-12-31' }), nameOf)).toBe('set target date to Dec 31');
    expect(describeProjectEvent(event({ type: 'startDate', to: null }), nameOf)).toBe('removed the start date');
  });

  test('members, teams and milestones use added and removed', () => {
    expect(describeProjectEvent(event({ type: 'milestones', added: ['M1'] }), nameOf)).toBe('added milestone M1');
    expect(describeProjectEvent(event({ type: 'members', added: ['u-ada'] }), nameOf)).toBe('added Ada Park as a member');
    expect(describeProjectEvent(event({ type: 'teams', removed: ['NIL'] }), nameOf)).toBe('removed NIL');
  });

  test('an unknown type still reads as a change', () => {
    expect(describeProjectEvent(event({ type: 'somethingNew' }), nameOf)).toBe('updated the project');
    expect(describeProjectEvent(event({}), nameOf)).toBe('updated the project');
  });
});

const issue = (over: Partial<ProjectIssueTimeline>): ProjectIssueTimeline => ({
  createdAt: '2026-11-01T00:00:00Z', startedAt: null, completedAt: null, canceledAt: null, estimate: null,
  state: { type: 'backlog' }, projectMilestone: null, ...over,
});
const project = { startDate: '2026-11-01', targetDate: '2026-11-11', createdAt: '2026-11-01T00:00:00Z' };
const NOW = new Date('2026-11-06T00:00:00Z').getTime();

describe('projectBurnupOf', () => {
  test('counts scope, started and completed in issues', () => {
    const burnup = projectBurnupOf(project, [
      issue({}),
      issue({ startedAt: '2026-11-03T00:00:00Z', state: { type: 'started' } }),
      issue({ startedAt: '2026-11-02T00:00:00Z', completedAt: '2026-11-04T00:00:00Z', state: { type: 'completed' } }),
    ], NOW)!;
    expect(burnup.scope).toBe(3);
    expect(burnup.completed).toBe(1);
    expect(burnup.inProgress).toBe(1);
    expect(burnup.unit).toBe('issues');
    expect(burnup.samples.length).toBeGreaterThan(2);
  });

  test('canceled and duplicate issues are not scope', () => {
    const burnup = projectBurnupOf(project, [issue({}), issue({ state: { type: 'canceled' } }), issue({ state: { type: 'duplicate' } })], NOW)!;
    expect(burnup.scope).toBe(1);
  });

  test('null with no issues or no usable range', () => {
    expect(projectBurnupOf(project, [], NOW)).toBeNull();
    expect(projectRange({ startDate: null, targetDate: null, createdAt: '2026-11-06T00:00:00Z' }, [issue({ createdAt: '2026-11-06T00:00:00Z' })], NOW)).toBeNull();
  });

  test('without dates it spans the first issue to now', () => {
    const range = projectRange({ ...project, startDate: null, targetDate: null }, [issue({ createdAt: '2026-11-01T00:00:00Z' })], NOW)!;
    expect(range.start).toBe(new Date('2026-11-01T00:00:00Z').getTime());
    expect(range.end).toBe(NOW);
  });
});

import { describe, expect, mock, test } from 'bun:test';
import type { IssueDetail, IssueRow } from '../src/shared/types.ts';

const rawPlan = '# ENG-5 plan\n\n1. Coordinate with ENG-6.\n2. Test the integration.';
const planned = {
  identifier: 'ENG-5', title: 'Coordinate the work', description: '', documents: { nodes: [] },
  team: { id: 't-eng', key: 'ENG', states: { nodes: [] } },
  state: { id: 't-eng-backlog', name: 'Backlog', type: 'backlog', color: '', position: 0 },
  attachments: { nodes: [] }, links: { nodes: [] },
} as unknown as IssueDetail;
const related = [{
  id: 'i-eng-6', identifier: 'ENG-6', url: 'https://linear.app/acme/issue/ENG-6',
  attachments: { nodes: [{ id: 'a6', url: 'https://gitlab.com/acme/ops/api/-/merge_requests/6', title: 'API MR', sourceType: 'gitlab', metadata: {} }] },
}] as unknown as IssueRow[];

let writtenDescription = '';
let buildPlan = '';
mock.module('../src/shared/handoff.ts', () => ({
  previewPlan: async (input: { planText?: string }) => ({ plan: input.planText ?? rawPlan, isPlan: true, postPlan: false, earlier: false, lead: false }),
  requestBuild: async (input: { planText?: string }) => {
    buildPlan = input.planText ?? '';
    return { sessionId: 'ses_build', directory: '/wt/eng-5' };
  },
  fetchSessionExtras: async () => null,
  reportExtras: async () => null,
}));
mock.module('../src/shared/linear.ts', () => ({
  gql: async (query: string) => {
    if (query.includes('query IssueDetail')) return { issue: planned };
    if (query.includes('query IssuesByKeys')) return { issues: { nodes: related } };
    throw new Error('Unexpected query');
  },
}));
mock.module('../src/shared/plan-extras-apply.ts', () => ({ applyPlanExtras: async () => null }));
mock.module('../src/shared/storage.ts', () => ({
  getStartMoves: async () => false,
  getStartState: async () => null,
  setStartState: async () => undefined,
}));
mock.module('../src/shared/writes.ts', () => ({
  updateIssue: async (_issue: IssueDetail, change: { patch: { description?: string } }) => {
    writtenDescription = change.patch.description ?? '';
    return planned;
  },
  addIssueDocument: async () => { throw new Error('A short plan needs no document'); },
  updateIssueDocument: async () => { throw new Error('A short plan needs no document'); },
  createIssue: async () => { throw new Error('No split-out issue is expected'); },
  writeErrorText: (error: unknown) => String(error),
}));

const { startBuildFor } = await import('../src/shared/start-build.ts');

describe('startBuildFor repositories', () => {
  test('writes and builds from the same plan with related repositories', async () => {
    const outcome = await startBuildFor(planned, {
      sessionId: 'ses_plan', directory: '/wt/eng-5', title: 'ENG-5 plan', agent: 'plan', inWorktree: true, updatedAt: 1,
    }, { move: false, post: true });
    expect(outcome.sessionId).toBe('ses_build');
    expect(writtenDescription).toContain('## Related repositories');
    expect(writtenDescription).toContain('`gitlab.com/acme/ops/api`');
    expect(buildPlan).toContain('## Related repositories');
    expect(buildPlan).toContain('[ENG-6](https://linear.app/acme/issue/ENG-6)');
    expect(buildPlan).toContain(writtenDescription.split('---\n## Plan\n\n')[1]);
  });
});

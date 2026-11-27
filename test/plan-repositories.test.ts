import { describe, expect, mock, test } from 'bun:test';
import type { IssueDetail, IssueRow } from '../src/shared/types.ts';

const sent: unknown[] = [];
mock.module('../src/shared/linear.ts', () => ({
  gql: async (_query: string, variables: unknown) => {
    sent.push(variables);
    return { issues: { nodes: related } };
  },
}));

const { planIssueIdentifiers, repositoryFromIssueUrl, withRelatedRepositories } = await import('../src/shared/plan-repositories.ts');

const linked = (identifier: string, url: string): IssueRow => ({
  id: identifier.toLowerCase(), identifier, url: `https://linear.app/acme/issue/${identifier}`,
  attachments: { nodes: [{ id: identifier, url, title: 'Repository', sourceType: null, metadata: null }] },
}) as unknown as IssueRow;

let related: IssueRow[] = [];
const planned = {
  identifier: 'ENG-5',
  attachments: { nodes: [] },
  links: { nodes: [{ id: 'own', url: 'https://gitlab.com/acme/checkout/-/merge_requests/5' }] },
} as unknown as IssueDetail;

describe('plan repositories', () => {
  test('reads merge requests, pull requests and repository roots', () => {
    expect(repositoryFromIssueUrl('https://gitlab.com/acme/ops/api/-/merge_requests/12')).toEqual({ host: 'gitlab.com', path: 'acme/ops/api' });
    expect(repositoryFromIssueUrl('https://gitlab.com/acme/ops/api')).toEqual({ host: 'gitlab.com', path: 'acme/ops/api' });
    expect(repositoryFromIssueUrl('https://github.com/acme/web/pull/9')).toEqual({ host: 'github.com', path: 'acme/web' });
    expect(repositoryFromIssueUrl('https://app.datadoghq.com/dashboard/abc')).toBeNull();
  });

  test('finds unique issue identifiers, but not the planned issue', () => {
    expect(planIssueIdentifiers('ENG-6 and ops-7; ENG-6 again, ENG-5 itself. Not X-1234567890.', 'ENG-5')).toEqual(['ENG-6', 'OPS-7']);
  });

  test('adds only other repositories, in plan order, and is idempotent', async () => {
    sent.length = 0;
    related = [
      linked('ENG-6', 'https://gitlab.com/acme/ops/api/-/merge_requests/12'),
      linked('OPS-7', 'https://github.com/acme/web/pull/9'),
      linked('ENG-8', 'https://gitlab.com/acme/checkout/-/merge_requests/8'),
    ];
    const plan = '# ENG-5 plan\n\n1. Coordinate ENG-6 with OPS-7. ENG-8 stays in this repository.';
    const result = await withRelatedRepositories(plan, planned);
    expect(result).toContain('# ENG-5 plan\n\n## Related repositories\n\n- [ENG-6](https://linear.app/acme/issue/ENG-6): `gitlab.com/acme/ops/api`\n- [OPS-7](https://linear.app/acme/issue/OPS-7): `github.com/acme/web`\n\n1. Coordinate');
    expect(result).not.toContain('ENG-8](');
    expect(sent).toHaveLength(1);
    expect(await withRelatedRepositories(result, planned)).toBe(result);
    expect(sent).toHaveLength(1);
  });

  test('leaves a plan without other issues unchanged and sends no query', async () => {
    sent.length = 0;
    expect(await withRelatedRepositories('1. Work only on ENG-5.', planned)).toBe('1. Work only on ENG-5.');
    expect(sent).toHaveLength(0);
  });
});

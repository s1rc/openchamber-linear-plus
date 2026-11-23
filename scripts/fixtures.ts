// Dev-only. Writes the harness fixtures: fake Linear answers keyed by the exact request bodies the app
// sends, so screenshots never touch a real workspace and never drift from queries.ts.
//
//   bun scripts/fixtures.ts
//
// Output: harness/fixtures/workspace.json (a connected workspace) and harness/fixtures/error.json.
import { graphqlBody } from '../src/shared/gql-body.ts';
import { all, customViewsFilter, MY_FILTERS, OPEN, scopeFilter } from '../src/shared/filters.ts';
import { keysFilter } from '../src/shared/block-args.ts';
import { browseFilter, keyFilter, modeFilter } from '../src/shared/picker.ts';
import { milestoneFilter } from '../src/shared/milestones.ts';
import { extraDescription, scaleText } from '../src/shared/plan-extras.ts';
import { teamScale } from '../src/shared/moves.ts';
import { estimateLabel } from '../src/shared/format.ts';
import { withPlan } from '../src/shared/handoff-rules.ts';
import { parseMarkdown, serializeMarkdown } from '../src/shared/rich/markdown.ts';
import { issueContext } from '../src/shared/issue-context.ts';
import { commentBody } from '../src/dialog/jobs.ts';
import { parseDraft } from '../src/shared/draft.ts';
import * as Q from '../src/shared/queries.ts';

type Saved = { status: number; body: string };
const ok = (data: unknown): Saved => ({ status: 200, body: JSON.stringify({ data }) });
const key = (query: string, variables?: Record<string, unknown>) => `POST /graphql ${graphqlBody(query, variables)}`;
const page = <T,>(nodes: T[]) => ({ nodes, pageInfo: { hasNextPage: false, endCursor: null } });

const user = (id: string, name: string) => ({ id, name, displayName: name.split(' ')[0]!.toLowerCase(), avatarUrl: null, avatarBackgroundColor: '#5e6ad2' });
const matt = user('u-matt', 'Matt Example');
const ada = user('u-ada', 'Ada Park');

const cycle = { id: 'c-42', number: 42, name: null, startsAt: '2026-11-02T12:00:00Z', endsAt: '2026-11-16T12:00:00Z', progress: 0.6, isActive: true, isFuture: false, isPast: false, completedAt: null };

const teams = [
  { id: 't-eng', key: 'ENG', name: 'Engineering', color: '#5e6ad2', icon: null, cyclesEnabled: true, triageEnabled: true, issueEstimationType: 'tShirt', issueEstimationAllowZero: false, issueEstimationExtended: false, defaultIssueState: { id: 't-eng-backlog' }, parent: null, activeCycle: cycle },
  { id: 't-mob', key: 'MOB', name: 'Mobile', color: '#26b5ce', icon: null, cyclesEnabled: false, triageEnabled: false, issueEstimationType: 'fibonacci', issueEstimationAllowZero: false, issueEstimationExtended: false, defaultIssueState: { id: 't-mob-todo' }, parent: { id: 't-eng' }, activeCycle: null },
];

// Positions run into the thousands and overlap between types, as in a long-lived workspace.
const stateSet = (teamId: string) => [
  { id: `${teamId}-triage`, name: 'Triage', type: 'triage', color: '#fc7840', position: 0 },
  { id: `${teamId}-backlog`, name: 'Backlog', type: 'backlog', color: '#bec2c8', position: 2000 },
  { id: `${teamId}-grooming`, name: 'Needs Grooming', type: 'unstarted', color: '#e5484d', position: 1100 },
  { id: `${teamId}-todo`, name: 'Todo', type: 'unstarted', color: '#e2e2e2', position: 1200 },
  { id: `${teamId}-progress`, name: 'In Progress', type: 'started', color: '#f2c94c', position: 1500 },
  { id: `${teamId}-review`, name: 'In Review', type: 'started', color: '#f4b8b8', position: 1600 },
  { id: `${teamId}-staging`, name: 'In Staging', type: 'started', color: '#4db6d4', position: 1700 },
  { id: `${teamId}-done`, name: 'Done', type: 'completed', color: '#5e6ad2', position: 3000 },
  { id: `${teamId}-canceled`, name: 'Canceled', type: 'canceled', color: '#95a2b3', position: 3100 },
  // Mobile, a sub-team of Engineering, has a status Engineering lacks, so a board drag can move team.
  ...(teamId === 't-mob' ? [{ id: 't-mob-qa', name: 'In QA', type: 'started', color: '#bb87fc', position: 1650 }] : []),
].map((s) => ({ ...s, team: { id: teamId } }));

const project = (id: string, name: string, extra: Record<string, unknown> = {}) => ({
  id, name, slugId: `s${id}`, url: `https://linear.app/acme/project/${name.toLowerCase().replace(/\s+/g, '-')}-s${id}`,
  icon: null, color: '#5e6ad2', health: 'onTrack', progress: 0.42, startDate: '2026-10-01', targetDate: '2026-11-28',
  updatedAt: '2026-11-08T12:00:00Z', status: { id: 'ps-started', name: 'In Progress', type: 'started', color: '#f2c94c' },
  lead: matt, teams: page([{ id: 't-eng', key: 'ENG', name: 'Engineering' }]), ...extra,
});

const projects = [
  project('p-repo', 'Repo'),
  project('p-checkout', 'Checkout', { health: 'atRisk', progress: 0.71, targetDate: '2026-11-12', lead: ada }),
  project('p-mobile', 'Mobile App', { health: null, progress: 0.1, teams: page([{ id: 't-mob', key: 'MOB', name: 'Mobile' }]) }),
  project('p-old', 'Old Billing', { status: { id: 'ps-done', name: 'Completed', type: 'completed', color: '#5e6ad2' }, progress: 1 }),
];

// Issues for the Engineering team, spread over states, people, priorities and labels.
const engStates = Object.fromEntries(stateSet('t-eng').map(({ team: _team, ...st }) => [st.name, st]));
const labelBug = { id: 'l-bug', name: 'Bug', color: '#eb5757' };
const labelApi = { id: 'l-api', name: 'API', color: '#26b5ce' };
const labelPerf = { id: 'l-perf', name: 'Performance', color: '#f2994a' };
let issueNumber = 10;
const mrAttachment = (n: number, status: string) => ({
  id: `a-${n}`, url: `https://gitlab.com/acme/checkout/-/merge_requests/${n}`, title: `ENG: change ${n}`, sourceType: 'gitlab', metadata: { status },
});
const issue = (title: string, stateName: string, extra: Record<string, unknown> = {}) => {
  issueNumber += 1;
  return {
    id: `i-eng-${issueNumber}`, identifier: `ENG-${issueNumber}`, number: issueNumber, title, priority: 3, estimate: null, dueDate: null,
    sortOrder: issueNumber, url: `https://linear.app/acme/issue/ENG-${issueNumber}`, branchName: `matt/eng-${issueNumber}-${title.toLowerCase().replace(/[^a-z]+/g, '-').slice(0, 30)}`,
    createdAt: `2026-10-${String(issueNumber).padStart(2, '0')}T10:00:00Z`, updatedAt: `2026-11-0${(issueNumber % 9) + 1}T10:00:00Z`, completedAt: null,
    state: engStates[stateName], assignee: matt, labels: { nodes: [] }, team: { id: 't-eng', key: 'ENG' },
    project: { id: 'p-checkout', name: 'Checkout', color: '#4cb782', icon: 'Hexagon' }, projectMilestone: null, cycle: { id: 'c-42', number: 42, name: null }, parent: null,
    slaBreachesAt: null, slaType: null, creator: ada, startedAt: null, canceledAt: null, addedToCycleAt: '2026-10-30T12:00:00Z',
    attachments: { nodes: [] }, outRelations: { nodes: [] }, inRelations: { nodes: [] },
    ...extra,
  };
};
const engIssues = [
  issue('Checkout times out when the cart has more than 50 items', 'In Progress', { priority: 1, estimate: 3, startedAt: '2026-11-03T14:00:00Z', labels: { nodes: [labelBug, labelPerf] }, dueDate: '2026-11-08', attachments: { nodes: [mrAttachment(42, 'opened')] } }),
  issue('Add idempotency keys to the payment API', 'In Review', { priority: 2, estimate: 5, startedAt: '2026-11-04T10:00:00Z', parent: { id: 'i-eng-11', identifier: 'ENG-11' }, labels: { nodes: [labelApi] }, attachments: { nodes: [mrAttachment(40, 'merged'), mrAttachment(41, 'opened')] } }),
  issue('Show saved cards first in the payment step', 'Todo', { priority: 3, estimate: 1, assignee: ada, inRelations: { nodes: [{ type: 'blocks' }] }, outRelations: { nodes: [{ type: 'blocks' }, { type: 'blocks' }] } }),
  issue('Retry webhook deliveries with backoff', 'Todo', { priority: 2, estimate: 2, labels: { nodes: [labelApi] }, project: { id: 'p-repo', name: 'Repo', color: '#5e6ad2', icon: '🚀' }, inRelations: { nodes: [{ type: 'blocks' }] } }),
  issue('Tax line shows the wrong currency symbol', 'Triage', { priority: 0, assignee: null, labels: { nodes: [labelBug] } }),
  issue('Document the refund flow', 'Backlog', { priority: 4, assignee: null, project: null, cycle: null }),
  issue('Pin the gateway sandbox version', 'Needs Grooming', { priority: 3, estimate: 3, addedToCycleAt: '2026-11-06T09:00:00Z', assignee: null, labels: { nodes: [labelApi] }, slaBreachesAt: '2026-11-30T12:00:00Z', slaType: 'all' }),
  issue('Verify refunds on the staging gateway', 'In Staging', { priority: 2, estimate: 2, startedAt: '2026-11-05T09:00:00Z', creator: matt }),
  issue('Split the order service read model', 'Backlog', { priority: 0, assignee: ada, labels: { nodes: [labelPerf, labelApi, labelBug] } }),
];
// A Mobile issue in the sub-team's own status, listed with Engineering's.
const mobStates = Object.fromEntries(stateSet('t-mob').map(({ team: _team, ...st }) => [st.name, st]));
const mobIssue = {
  ...issue('Offline banner overlaps the tab bar', 'Todo'),
  id: 'i-mob-5', identifier: 'MOB-5', number: 5, url: 'https://linear.app/acme/issue/MOB-5', branchName: 'ada/mob-5-offline-banner',
  state: mobStates['In QA'], team: { id: 't-mob', key: 'MOB' }, assignee: ada, project: null, cycle: null, estimate: 2,
};
engIssues.push(mobIssue);
const mine = engIssues.filter((i) => i.assignee === matt);

const detail = {
  ...engIssues[0],
  description: 'Carts over **50 items** take longer than 30 s to price, and the gateway gives up. See https://linear.app/acme/issue/ENG-14/retry-webhooks and [MR !42](https://gitlab.com/acme/checkout/-/merge_requests/42).\n\n## Findings\n- Happens on web and mobile\n- Started after `TaxService.lookup()` moved to one call per line\n    - `priceCart(cart)` calls it `cart.lines.length` times\n\n```ts\nawait priceCart(cart) // 31.2 s\n```\n\n## Steps\n- [ ] Batch the tax lookups into one call per cart\n- [x] Add a timing test for a 60 item cart',
  creator: ada,
  team: { id: 't-eng', key: 'ENG', name: 'Engineering', issueEstimationType: 'tShirt', issueEstimationAllowZero: false, issueEstimationExtended: false, states: { nodes: stateSet('t-eng').map(({ team: _team, ...st }) => st) } },
  children: { nodes: [engIssues[1]] },
  comments: { nodes: [
    { id: 'cm1', body: 'Reproduced with a 60 item cart: 31 s. Blocked on https://linear.app/acme/issue/ENG-13/x', createdAt: '2026-11-07T09:00:00Z', editedAt: null, url: 'https://linear.app/acme/issue/ENG-11#comment-1', user: ada, parent: null },
    { id: 'cm2', body: 'Looks like the tax call runs once per line. Batching it now.', createdAt: '2026-11-07T11:30:00Z', editedAt: null, url: 'https://linear.app/acme/issue/ENG-11#comment-2', user: matt, parent: { id: 'cm1' } },
  ] },
  links: { nodes: [
    { id: 'a1', title: 'ENG-11: batch tax lookups', subtitle: null, url: 'https://gitlab.com/acme/checkout/-/merge_requests/42', sourceType: 'gitlab', metadata: { status: 'opened' }, createdAt: '2026-11-07T12:00:00Z' },
    { id: 'a2', title: 'Datadog: checkout p99 latency', subtitle: null, url: 'https://app.datadoghq.com/dashboard/abc', sourceType: 'datadog', metadata: {}, createdAt: '2026-11-06T12:00:00Z' },
  ] },
  relations: { nodes: [{ id: 'r1', type: 'blocks', relatedIssue: { id: 'i-eng-13', identifier: 'ENG-13', title: 'Show saved cards first in the payment step', url: 'https://linear.app/acme/issue/ENG-13', state: engStates['Todo'] } }] },
  inverseRelations: { nodes: [{ id: 'r2', type: 'related', issue: { id: 'i-eng-14', identifier: 'ENG-14', title: 'Retry webhook deliveries with backoff', url: 'https://linear.app/acme/issue/ENG-14', state: engStates['Todo'] } }] },
  subscribers: { nodes: [matt, ada] },
  history: { nodes: [
    { id: 'h1', createdAt: '2026-10-11T10:05:00Z', updatedDescription: null, fromPriority: 0, toPriority: 1, fromEstimate: null, toEstimate: null, fromTitle: null, toTitle: null, actor: ada, fromState: null, toState: null, fromAssignee: null, toAssignee: null, addedLabels: [labelBug], removedLabels: null, fromCycle: null, toCycle: null, fromProject: null, toProject: null, toParent: null, relationChanges: null },
    { id: 'h2', createdAt: '2026-11-03T09:00:00Z', updatedDescription: null, fromPriority: null, toPriority: null, fromEstimate: null, toEstimate: 3, fromTitle: null, toTitle: null, actor: matt, fromState: null, toState: null, fromAssignee: null, toAssignee: matt, addedLabels: null, removedLabels: null, fromCycle: null, toCycle: { number: 42 }, fromProject: null, toProject: null, toParent: null, relationChanges: null },
    { id: 'h3', createdAt: '2026-11-07T08:00:00Z', updatedDescription: null, fromPriority: null, toPriority: null, fromEstimate: null, toEstimate: null, fromTitle: null, toTitle: null, actor: matt, fromState: { name: 'Todo', type: 'unstarted', color: '#e2e2e2' }, toState: { name: 'In Progress', type: 'started', color: '#f2c94c' }, fromAssignee: null, toAssignee: null, addedLabels: null, removedLabels: null, fromCycle: null, toCycle: null, fromProject: null, toProject: null, toParent: null, relationChanges: null },
    { id: 'h4', createdAt: '2026-11-07T12:00:00Z', updatedDescription: true, fromPriority: null, toPriority: null, fromEstimate: null, toEstimate: null, fromTitle: null, toTitle: null, actor: ada, fromState: null, toState: null, fromAssignee: null, toAssignee: null, addedLabels: null, removedLabels: null, fromCycle: null, toCycle: null, fromProject: null, toProject: null, toParent: null, relationChanges: null },
  ] },
};

const checkoutDetail = {
  ...projects[1],
  description: 'Faster, safer checkout.',
  content: '## Goal\nCut checkout time in half and remove the payment timeouts.\n\n## Out of scope\nNew payment providers.',
  members: { nodes: [matt, ada] },
  projectMilestones: { nodes: [
    { id: 'm1', name: 'Pricing under 2 s', description: 'Batch the tax lookups so a 60 item cart prices in under 2 s.', targetDate: '2026-11-05', progress: 100, sortOrder: 1 },
    { id: 'm2', name: 'Idempotent payments', description: null, targetDate: '2026-11-12', progress: 50, sortOrder: 2 },
  ] },
  lastUpdate: { id: 'u1', health: 'atRisk', createdAt: '2026-11-06T16:00:00Z' },
  projectUpdates: { nodes: [{ id: 'u1', body: 'Pricing is fixed. Payments slipped a week: the gateway sandbox was down.', health: 'atRisk', createdAt: '2026-11-06T16:00:00Z', url: 'https://linear.app/acme/project/checkout/updates', user: ada }] },
  documents: { nodes: [{ id: 'd1', title: 'Checkout architecture', url: 'https://linear.app/acme/document/checkout-architecture', updatedAt: '2026-11-01T10:00:00Z' }] },
};

// Saved views for the Engineering team.
const bugIssues = engIssues.filter((i) => i.labels.nodes.some((l) => l.id === 'l-bug'));

const issuesKey = (filter: Record<string, unknown>) => key(Q.ISSUES, { filter, after: null });
const engScope = scopeFilter(['t-eng'], [], true)!;

const workspace: Record<string, Saved> = {
  [key(Q.VIEWER)]: ok({ viewer: { ...matt, email: 'matt@example.com', organization: { id: 'org', name: 'Acme', urlKey: 'acme' }, teams: { nodes: [{ id: 't-eng' }, { id: 't-mob' }] } } }),
  [key(Q.TEAMS)]: ok({ teams: { nodes: teams } }),
  [key(Q.WORKFLOW_STATES, { after: null })]: ok({ workflowStates: page([...stateSet('t-eng'), ...stateSet('t-mob')]) }),
  // Detection for /work/repo: no team is called "repo", so it searches projects for the folder name.
  [key(Q.SEARCH_PROJECTS, { term: 'repo' })]: ok({ searchProjects: { nodes: [projects[0], projects[3]] } }),
  [key(Q.PROJECTS, { after: null, filter: { id: { in: ['p-repo'] } } })]: ok({ projects: page([projects[0]]) }),
  [key(Q.PROJECTS, { after: null, filter: { id: { in: ['p-checkout'] } } })]: ok({ projects: page([projects[1]]) }),
  // A folder named after a team (/work/engineering-api) shows the team overview with its projects.
  [key(Q.PROJECTS, { after: null, filter: { accessibleTeams: { some: { id: { eq: 't-eng' } } }, status: { type: { nin: ['completed', 'canceled'] } } } })]:
    ok({ projects: page(projects.slice(0, 2)) }),
};

// Phase 4: issue lists, an issue, a project.
workspace[issuesKey(all(OPEN, engScope))] = ok({ issues: page(engIssues) });
workspace[issuesKey(all(OPEN, all(MY_FILTERS.assigned, engScope)))] = ok({ issues: page(mine) });
workspace[issuesKey(all(OPEN, MY_FILTERS.assigned))] = ok({ issues: page(mine) });
workspace[issuesKey(all(OPEN, scopeFilter([], ['p-checkout'])))] = ok({ issues: page(engIssues.filter((i) => i.project?.id === 'p-checkout')) });
workspace[key(Q.ISSUE_DETAIL, { id: 'ENG-11' })] = ok({ issue: detail });
// Sub-issue progress: ENG-11 has 2 of 3 done, ENG-17 has 0 of 1.
const childStates = (ids: string[]) => ok({ issues: page([
  ...(ids.includes('i-eng-11') ? [{ parent: { id: 'i-eng-11' }, state: { type: 'completed' } }, { parent: { id: 'i-eng-11' }, state: { type: 'completed' } }, { parent: { id: 'i-eng-11' }, state: { type: 'started' } }] : []),
  ...(ids.includes('i-eng-17') ? [{ parent: { id: 'i-eng-17' }, state: { type: 'backlog' } }] : []),
]) });
for (const list of [engIssues, mine, engIssues.filter((i) => i.project?.id === 'p-checkout')]) {
  const ids = list.map((i) => i.id);
  workspace[key(Q.CHILD_STATES, { ids, after: null })] = childStates(ids);
}
workspace[key(Q.PROJECT_DETAIL, { id: 'p-checkout' })] = ok({ project: checkoutDetail });

workspace[key(Q.CUSTOM_VIEWS, { filter: customViewsFilter('t-eng') })] = ok({ customViews: { nodes: [
  { id: 'v-bugs', name: 'All Bugs', icon: 'Bug', color: '#eb5757', shared: true, team: { id: 't-eng' } },
  { id: 'v-impact', name: 'By Impact', icon: '🔥', color: null, shared: true, team: { id: 't-eng' } },
  { id: 'v-mine', name: 'Needs Labels', icon: null, color: '#f2c94c', shared: false, team: { id: 't-eng' } },
] } });
workspace[key(Q.CUSTOM_VIEW_ISSUES, { id: 'v-bugs', filter: engScope, after: null })] = ok({ customView: { issues: page(bugIssues) } });
workspace[key(Q.CHILD_STATES, { ids: bugIssues.map((i) => i.id), after: null })] = childStates(bugIssues.map((i) => i.id));

// Phase 5: board (same lists as the issue list), cycles, triage, inbox.
const cycleOf = (number: number, flags: Record<string, unknown>) => ({
  id: `c-${number}`, number, name: number === 42 ? 'Checkout speed' : null,
  startsAt: '', endsAt: '', progress: 0.6, isActive: false, isFuture: false, isPast: false, completedAt: null, ...flags,
});
const cycles = [
  { ...cycleOf(40, { isPast: true, progress: 0.92, completedAt: '2026-10-19T12:00:00Z' }), startsAt: '2026-10-05T12:00:00Z', endsAt: '2026-10-19T12:00:00Z' },
  { ...cycleOf(41, { isPast: true, progress: 0.78, completedAt: '2026-11-02T12:00:00Z' }), startsAt: '2026-10-19T12:00:00Z', endsAt: '2026-11-02T12:00:00Z' },
  { ...cycleOf(42, { isActive: true, progress: 0.6 }), startsAt: '2026-11-02T12:00:00Z', endsAt: '2026-11-16T12:00:00Z' },
  { ...cycleOf(43, { isFuture: true, progress: 0 }), name: null, startsAt: '2026-11-16T12:00:00Z', endsAt: '2026-11-30T12:00:00Z' },
];
workspace[key(Q.TEAM_CYCLES, { teamId: 't-eng', minNumber: 36 })] = ok({ team: { id: 't-eng', key: 'ENG', name: 'Engineering', cycles: { nodes: cycles } } });
workspace[key(Q.CYCLE_DETAIL, { id: 'c-42' })] = ok({ cycle: { ...cycles[2], description: 'Make checkout fast and keep payments reliable.' } });
workspace[key(Q.CYCLE_DETAIL, { id: 'c-43' })] = ok({ cycle: { ...cycles[3], description: null } });
// Work finished or dropped during the cycle, so the burn-up has a history to draw.
const finished = (title: string, stateName: string, extra: Record<string, unknown>) => issue(title, stateName, { priority: 3, ...extra });
const cycleIssues = [
  ...engIssues.filter((i) => i.cycle),
  finished('Cache the tax table per request', 'Done', { estimate: 3, startedAt: '2026-11-02T15:00:00Z', completedAt: '2026-11-04T16:00:00Z', addedToCycleAt: '2026-10-30T12:00:00Z' }),
  finished('Drop the unused coupon endpoint', 'Done', { estimate: 2, startedAt: '2026-11-05T09:00:00Z', completedAt: '2026-11-06T18:00:00Z', addedToCycleAt: '2026-10-30T12:00:00Z' }),
  finished('Redesign the order summary', 'Canceled', { estimate: 5, addedToCycleAt: '2026-10-30T12:00:00Z', canceledAt: '2026-11-05T12:00:00Z' }),
];
workspace[issuesKey({ cycle: { id: { eq: 'c-42' } } })] = ok({ issues: page(cycleIssues) });
workspace[issuesKey({ cycle: { id: { eq: 'c-43' } } })] = ok({ issues: page([]) });
const triageIssues = engIssues.filter((i) => i.state.type === 'triage');
workspace[issuesKey({ team: { id: { eq: 't-eng' } }, state: { type: { eq: 'triage' } } })] = ok({ issues: page(triageIssues) });
for (const list of [cycleIssues, triageIssues]) {
  const ids = list.map((i) => i.id);
  workspace[key(Q.CHILD_STATES, { ids, after: null })] = childStates(ids);
}
const doneState = engStates['Done'];
const note = (id: string, extra: Record<string, unknown>) => ({
  id, type: 'issueNewComment', category: 'commentsAndReplies', readAt: null,
  createdAt: '2026-11-09T09:00:00Z', actor: ada, ...extra,
});
workspace[key(Q.NOTIFICATIONS, { after: null })] = ok({
  notifications: page([
    note('n1', { issue: { id: 'i-eng-11', identifier: 'ENG-11', title: engIssues[0]!.title, url: 'https://linear.app/acme/issue/ENG-11', state: engStates['In Progress'], team: { id: 't-eng', key: 'ENG' }, project: { id: 'p-checkout' } }, comment: { id: 'cm1', body: 'Reproduced with a 60 item cart: 31 s.' } }),
    note('n2', { type: 'issueAssignedToYou', category: 'assignments', createdAt: '2026-11-08T15:00:00Z', issue: { id: 'i-eng-13', identifier: 'ENG-13', title: engIssues[2]!.title, url: 'https://linear.app/acme/issue/ENG-13', state: engStates['Todo'], team: { id: 't-eng', key: 'ENG' }, project: { id: 'p-checkout' } }, comment: null }),
    note('n3', { type: 'issueStatusChanged', category: 'statusChanges', createdAt: '2026-11-05T11:00:00Z', readAt: '2026-11-05T12:00:00Z', actor: matt, issue: { id: 'i-eng-9', identifier: 'ENG-9', title: 'Remove the legacy tax endpoint', url: 'https://linear.app/acme/issue/ENG-9', state: doneState, team: { id: 't-eng', key: 'ENG' }, project: null }, comment: null }),
    note('n4', { type: 'projectUpdateCreated', category: 'postsAndUpdates', createdAt: '2026-11-04T09:00:00Z', readAt: '2026-11-04T10:00:00Z', project: { id: 'p-checkout', name: 'Checkout', url: 'https://linear.app/acme/project/checkout', teams: { nodes: [{ id: 't-eng' }] } }, projectUpdate: { health: 'atRisk', url: 'https://linear.app/acme/project/checkout/updates' } }),
    note('n5', { createdAt: '2026-11-03T09:00:00Z', readAt: '2026-11-03T10:00:00Z', actor: user('u-sam', 'Sam Lee'), issue: { id: 'i-mob-4', identifier: 'MOB-4', title: 'Crash on launch with no network', url: 'https://linear.app/acme/issue/MOB-4', state: engStates['Todo'], team: { id: 't-mob', key: 'MOB' }, project: null }, comment: { id: 'cm9', body: 'Seen on iOS 19.' } }),
  ]),
});

// Costly properties (release, customers, time in status) load only when one is switched on.
workspace[key(Q.ISSUE_EXTRAS, { ids: engIssues.map((i) => i.id), after: null })] = ok({ issues: page(engIssues.map((i, n) => ({
  id: i.id,
  releases: { nodes: i.identifier === 'ENG-12' ? [{ id: 'r1', name: 'Spring release', version: '2.4.0' }] : [] },
  needs: { nodes: i.identifier === 'ENG-11'
    ? [{ id: 'n1', customer: { id: 'cu1', name: 'Acme Corp', revenue: 120000 } }, { id: 'n2', customer: { id: 'cu2', name: 'Globex', revenue: 45000 } }]
    : [] },
  stateHistory: { nodes: [{ startedAt: `2026-11-0${(n % 7) + 1}T09:00:00Z` }] },
}))) });
// "Show all" nesting also lists sub-issues the view left out.
const parentsInList = engIssues.filter((i) => i.id === 'i-eng-11' || i.id === 'i-eng-17').map((i) => i.id);
const leftOut = issue('Write the tax cache migration', 'Done', { parent: { id: 'i-eng-11', identifier: 'ENG-11' }, completedAt: '2026-11-06T10:00:00Z' });
workspace[key(Q.CHILD_ISSUES, { ids: parentsInList, after: null })] = ok({ issues: page([engIssues[1], leftOut]) });

// Phase 6: what the pickers offer, and Linear's answers to writes. The shoot clock is fixed, so every
// write has an exact key. Only fake data: no write ever reaches a real workspace.
const sam = user('u-sam', 'Sam Lee');
workspace[key(Q.TEAM_PEOPLE, { teamId: 't-eng' })] = ok({ team: {
  id: 't-eng',
  members: page([{ ...ada, active: true }, { ...matt, active: true }, { ...sam, active: true }, { ...user('u-old', 'Former Member'), active: false }]),
  labels: page([labelBug, labelApi, labelPerf, { id: 'l-ux', name: 'UX', color: '#bb87fc' }]),
} });
workspace[key(Q.WORKSPACE_LABELS)] = ok({ issueLabels: page([{ id: 'l-security', name: 'Security', color: '#eb5757', team: null }, { ...labelBug, team: { id: 't-eng' } }]) });
workspace[key(Q.TEAM_CYCLES, { teamId: 't-eng', minNumber: 42 })] = ok({ team: { id: 't-eng', key: 'ENG', name: 'Engineering', cycles: { nodes: cycles.slice(2) } } });
const updated = (row: Record<string, unknown>) => ok({ issueUpdate: { success: true, issue: row } });
const refused = { status: 200, body: JSON.stringify({ errors: [{ message: 'Invalid scope: `write` required', extensions: { code: 'FORBIDDEN' } }] }) };
const update = (id: string, input: Record<string, unknown>) => key(Q.ISSUE_UPDATE, { id, input });
const [eng11, , eng13, , eng15] = engIssues;
workspace[update('i-eng-11', { stateId: 't-eng-review' })] = updated({ ...eng11, state: engStates['In Review'] });
// A connection that can only read: the change shows, then rolls back with a toast.
workspace[update('i-eng-11', { priority: 2 })] = refused;
workspace[update('i-eng-13', { stateId: 't-eng-progress' })] = updated({ ...eng13, state: engStates['In Progress'] });
workspace[update('i-eng-13', { teamId: 't-mob', stateId: 't-mob-qa' })] = updated({ ...eng13, id: 'i-eng-13', identifier: 'MOB-6', team: { id: 't-mob', key: 'MOB' }, state: mobStates['In QA'], cycle: null });
workspace[update('i-eng-15', { stateId: 't-eng-backlog' })] = updated({ ...eng15, state: engStates['Backlog'] });
workspace[update('i-eng-15', { stateId: 't-eng-progress' })] = updated({ ...eng15, state: engStates['In Progress'] });
// The issue view ticks a task box in the description and saves it (v1.1.0).
const TICKED = detail.description.replace('- [ ] Batch', '- [x] Batch');
workspace[update('i-eng-11', { description: TICKED })] = updated({ ...eng11, description: TICKED } as never);
// The rich editor adds a task at the end of ENG-11 and saves the description as Markdown (v1.2.0).
const RICH_EDIT = serializeMarkdown(parseMarkdown(`${detail.description}\n- [ ] Ship **it**`));
workspace[update('i-eng-11', { description: RICH_EDIT })] = updated({ ...eng11, description: RICH_EDIT } as never);
// The issue menu's Delete moves ENG-14 to Linear's trash (v1.1.0).
workspace[key(Q.ISSUE_DELETE, { id: 'i-eng-14' })] = ok({ issueDelete: { success: true } });
workspace[key(Q.ISSUE_DETAIL, { id: 'ENG-15' })] = ok({ issue: {
  ...detail, ...eng15, description: 'Reported by support: euro prices show a dollar sign.', children: { nodes: [] }, comments: { nodes: [] }, links: { nodes: [] },
  relations: { nodes: [] }, inverseRelations: { nodes: [] }, history: { nodes: [] }, team: detail.team,
} });
workspace[key(Q.ISSUE_CREATE, { input: { teamId: 't-eng', title: 'Cache exchange rates', stateId: 't-eng-backlog', priority: 2 } })] = ok({ issueCreate: { success: true, issue: {
  ...issue('Cache exchange rates', 'Backlog', { priority: 2, assignee: null, project: null, cycle: null }), id: 'i-eng-30', identifier: 'ENG-30',
} } });
workspace[key(Q.COMMENT_CREATE, { input: { issueId: 'i-eng-11', body: 'Batching shipped in !42.' } })] = ok({ commentCreate: { success: true, comment: { id: 'cm3', body: 'Batching shipped in !42.', createdAt: '2026-11-09T12:00:00Z', url: '', user: matt } } });
const READ_AT = '2026-11-09T12:00:00.000Z';
workspace[key(Q.markReadMany(['n1', 'n2']), { readAt: READ_AT })] = ok({ n0: { success: true }, n1: { success: true } });
workspace[key(Q.NOTIFICATION_MARK_READ, { id: 'n1', readAt: READ_AT })] = ok({ notificationUpdate: { success: true } });

// Phase 7: the Work Status section. Counts and "my issues" for each folder the shots open, and a
// finish-comment draft the service would hold. Detection picks the scope from the folder name.
const statusRow = (i: (typeof engIssues)[number]) => ({
  id: i.id, identifier: i.identifier, title: i.title, url: i.url, priority: i.priority, updatedAt: i.updatedAt, state: i.state, team: i.team,
  project: i.project ? { id: i.project.id, name: i.project.name } : null,
});
// A realistic spread: the sample issues stand for many in the same status.
const STATUS_WEIGHT: Record<string, number> = { 'In Progress': 3, 'In Review': 2, 'In Staging': 1, 'Needs Grooming': 2, Todo: 5, Triage: 2, Backlog: 14 };
const statusFixtures = (scope: Record<string, unknown>, list: typeof engIssues) => {
  const nodes = list.filter((i) => i.state.type !== 'backlog').flatMap((i) => Array.from({ length: STATUS_WEIGHT[i.state.name] ?? 1 }, () => ({ state: i.state, team: i.team })));
  workspace[key(Q.STATUS_COUNTS, { filter: all({ state: { type: { in: ['triage', 'unstarted', 'started'] } } }, scope), after: null })] = ok({ issues: page(nodes) });
  workspace[key(Q.STATUS_MINE, { filter: all(OPEN, MY_FILTERS.assigned, scope) })] = ok({ issues: page(list.filter((i) => i.assignee === matt).map(statusRow)) });
};
statusFixtures(scopeFilter(['t-eng'], [])!, engIssues);
statusFixtures(scopeFilter([], ['p-repo'])!, engIssues.filter((i) => i.project?.id === 'p-repo'));
statusFixtures(scopeFilter([], ['p-checkout'])!, engIssues.filter((i) => i.project?.id === 'p-checkout'));
// /work/checkout has no team of that name, so detection finds the Checkout project by search.
workspace[key(Q.SEARCH_PROJECTS, { term: 'checkout' })] = ok({ searchProjects: { nodes: [projects[1]] } });

// Three projects pinned to one folder (/work/multi), for the compact lines. Needs a saved mapping, so
// it is shot through a harness that keeps extension storage (the shared one answers none).
workspace[key(Q.PROJECTS, { after: null, filter: { id: { in: ['p-checkout', 'p-mobile', 'p-repo'] } } })] = ok({ projects: page([projects[0], projects[1], projects[2]]) });
statusFixtures(scopeFilter([], ['p-checkout', 'p-mobile', 'p-repo'])!, engIssues.filter((i) => i.project));

const draft = {
  id: 'd1', directory: '/work/engineering-api', sessionId: 'ses_1', identifier: 'ENG-11', sessionTitle: 'Batch the tax lookups',
  body: '**OpenChamber session: Batch the tax lookups**\n\nTax lookups now run once per cart instead of once per line. Pricing a 60 item cart takes 1.9 s, down from 31 s. Tests cover the batch path and the empty cart.',
  createdAt: Date.parse('2026-11-09T11:00:00Z'),
};
const service: Record<string, Saved> = {
  'GET /drafts?directory=/work/engineering-api ': { status: 200, body: JSON.stringify({ drafts: [draft] }) },
  [`POST /drafts ${JSON.stringify({ id: 'd1', action: 'posted' })}`]: { status: 200, body: JSON.stringify({ ok: true }) },
  [`POST /drafts ${JSON.stringify({ id: 'd1', action: 'discard' })}`]: { status: 200, body: JSON.stringify({ ok: true }) },
};
workspace[key(Q.issuesByIdentifier(['ENG-11']))] = ok({ i0: engIssues[0] });
workspace[key(Q.COMMENT_CREATE, { input: { issueId: 'i-eng-11', body: draft.body } })] = ok({ commentCreate: { success: true, comment: { id: 'cm4', body: draft.body, createdAt: '2026-11-09T12:00:00Z', url: '', user: matt } } });

// Phase 8: the dialog. The Small Model's answers (served by the temp-dir harness as host.generate), the
// text a create click sends, the issues a session links to, and what Attach finds. Fake data only.
const MODEL_ANSWERS = {
  // A fenced answer with words around it, as small models often write.
  message: 'Here is the issue:\n```json\n{"title": "Checkout times out on carts with more than 50 items", "description": "Pricing a cart with 60 items takes about 31 s and the payment gateway gives up.\\n\\n- Started after `TaxService.lookup()` moved to one call per line\\n- `priceCart(cart)` calls it once per line\\n\\nExpected: pricing a large cart finishes in under 2 s."}\n```',
  selection: '{"title": "Tax line shows the wrong currency symbol", "description": "Euro orders show a dollar sign on the tax line of the receipt.\\n\\n```\\nTax (8%): $4.20\\n```\\n\\nThe receipt should use the order currency."}',
  session: '{"title": "Batch tax lookups when pricing a cart", "description": "Pricing calls the tax service once per line, so a 60 item cart takes 31 s.\\n\\n- Batch the lookups into one call per cart\\n- Add a test for the empty cart\\n\\nDone in this chat: batching shipped in !42, still to do is the empty cart path."}',
  diff: '{"title": "Guard against an empty cart in priceCart", "description": "`priceCart` divides by the number of lines, so an empty cart returns NaN."}',
};
const draftOf = (answer: string) => parseDraft(answer)!;
const messageDraft = draftOf(MODEL_ANSWERS.message);
workspace[key(Q.ISSUE_CREATE, { input: { teamId: 't-eng', title: messageDraft.title, description: messageDraft.description, stateId: 't-eng-backlog', priority: 0 } })] = ok({ issueCreate: { success: true, issue: {
  ...issue(messageDraft.title, 'Backlog', { priority: 0, assignee: null, project: null, cycle: null }), id: 'i-eng-31', identifier: 'ENG-31',
} } });



// The + menu's create form with only a title typed.
workspace[key(Q.ISSUE_CREATE, { input: { teamId: 't-eng', title: 'Cache exchange rates', stateId: 't-eng-backlog', priority: 0 } })] = ok({ issueCreate: { success: true, issue: {
  ...issue('Cache exchange rates', 'Backlog', { priority: 0, assignee: null, project: null, cycle: null }), id: 'i-eng-32', identifier: 'ENG-32',
} } });

// Sessions for the comment flows: ses_one links ENG-11 only, ses_two links ENG-11 and ENG-13, ses_none links nothing.
workspace[key(Q.issuesByIdentifier(['ENG-11']))] = ok({ i0: engIssues[0] });
workspace[key(Q.issuesByIdentifier(['ENG-13', 'ENG-11']))] = ok({ i0: engIssues[2], i1: engIssues[0] });
const COMMENT_TEXT = 'Batching shipped in !42. Pricing a 60 item cart now takes 1.9 s.';
workspace[key(Q.COMMENT_CREATE, { input: { issueId: 'i-eng-11', body: commentBody('Batch the tax lookups', COMMENT_TEXT) } })] = ok({ commentCreate: { success: true, comment: { id: 'cm5', body: commentBody('Batch the tax lookups', COMMENT_TEXT), createdAt: '2026-11-09T12:00:00Z', url: '', user: matt } } });
workspace[key(Q.SEARCH_ISSUES, { term: 'tax' })] = ok({ searchIssues: { nodes: [engIssues[2], engIssues[0]] } });

// Attach: this folder's projects and their documents, a search, and the text of a project and a document.
const docs = [
  { id: 'd1', title: 'Checkout architecture', url: 'https://linear.app/acme/document/checkout-architecture', updatedAt: '2026-11-01T10:00:00Z', project: { id: 'p-checkout', name: 'Checkout' } },
  { id: 'd2', title: 'Payment gateway runbook', url: 'https://linear.app/acme/document/payment-gateway-runbook', updatedAt: '2026-10-20T10:00:00Z', project: { id: 'p-checkout', name: 'Checkout' } },
  { id: 'd3', title: 'Repo onboarding', url: 'https://linear.app/acme/document/repo-onboarding', updatedAt: '2026-09-02T10:00:00Z', project: { id: 'p-repo', name: 'Repo' } },
];
workspace[key(Q.DOCUMENTS, { filter: { project: { id: { in: ['p-checkout', 'p-repo'] } } } })] = ok({ documents: { nodes: docs } });
workspace[key(Q.SEARCH_ISSUES, { term: 'check' })] = ok({ searchIssues: { nodes: [engIssues[0]] } });
workspace[key(Q.SEARCH_PROJECTS, { term: 'check' })] = ok({ searchProjects: { nodes: [projects[1]] } });
workspace[key(Q.SEARCH_DOCUMENTS, { term: 'check' })] = ok({ searchDocuments: { nodes: [docs[0]] } });
workspace[key(Q.SEARCH_ISSUES, { term: 'zzzz' })] = ok({ searchIssues: { nodes: [] } });
workspace[key(Q.SEARCH_PROJECTS, { term: 'zzzz' })] = ok({ searchProjects: { nodes: [] } });
workspace[key(Q.SEARCH_DOCUMENTS, { term: 'zzzz' })] = ok({ searchDocuments: { nodes: [] } });
workspace[key(Q.DOCUMENT, { id: 'd1' })] = ok({ document: { ...docs[0], content: '# Checkout architecture\n\nPricing, tax and payment run as three steps.\n\n1. Price the cart\n2. Look up tax\n3. Charge the card', creator: ada } });

// Phase 12: the Attach tab's picker, laid out like the host's "Start from Linear". Rows carry the
// parent's title and state, the team's name and the sub-issues' states.
const teamName: Record<string, string> = { 't-eng': 'Engineering', 't-mob': 'Mobile' };
const pickRow = (i: (typeof engIssues)[number]) => {
  const parent = i.parent ? engIssues.find((p) => p.id === i.parent!.id) : undefined;
  return {
    id: i.id, identifier: i.identifier, title: i.title, priority: i.priority, updatedAt: i.updatedAt, url: i.url, branchName: i.branchName,
    state: i.state, team: { ...i.team, name: teamName[i.team.id] }, assignee: i.assignee, labels: i.labels, project: i.project,
    parent: parent ? { id: parent.id, identifier: parent.identifier, title: parent.title, state: parent.state } : null,
    children: { nodes: engIssues.filter((c) => c.parent?.id === i.id).map((c) => ({ id: c.id, state: { type: c.state.type } })) },
  };
};
const recent = [...engIssues].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
for (const mode of ['open', 'mine', 'all'] as const) {
  for (const [teamIds, projectIds] of [[['t-eng'], []], [[], []]] as [string[], string[]][]) {
    const rows = recent.filter((i) => mode !== 'mine' || i.assignee === matt).filter((i) => !teamIds.length || teamIds.includes(i.team.id));
    workspace[key(Q.PICKER_ISSUES, { first: 50, filter: browseFilter(mode, teamIds, projectIds) })] = ok({ issues: { nodes: rows.map(pickRow) } });
  }
}
workspace[key(Q.PICKER_ISSUES, { first: 1, filter: keyFilter('ENG-13') })] = ok({ issues: { nodes: [pickRow(engIssues[2]!)] } });
workspace[key(Q.PICKER_ISSUES, { first: 1, filter: keyFilter('ENG-999') })] = ok({ issues: { nodes: [] } });
workspace[key(Q.PICKER_SEARCH, { term: 'tax', filter: modeFilter('open') })] = ok({ searchIssues: { nodes: [pickRow(engIssues[4]!), pickRow(engIssues[0]!)] } });
for (const i of recent) {
  workspace[key(Q.ISSUE_DETAIL, { id: i.id })] = ok({ issue: i.id === 'i-eng-11' ? detail : {
    ...detail, ...i, description: i.id === 'i-eng-13' ? 'Returning customers should see their saved cards before the new card form.\n\n- Sort by last used\n- Hide expired cards' : null,
    children: { nodes: [] }, comments: { nodes: [] }, links: { nodes: [] }, relations: { nodes: [] }, inverseRelations: { nodes: [] }, history: { nodes: [] },
    team: { ...detail.team, id: i.team.id, key: i.team.key, name: teamName[i.team.id] },
  } });
}
workspace[key(Q.PROJECT_DETAIL, { id: 'p-repo' })] ??= ok({ project: { ...checkoutDetail, ...projects[0], content: '## Repo\nShared tooling for every service.' } });

// Phase 12: milestone counts on the project overview, and one milestone's issues in every status.
const checkoutIssues = engIssues.filter((i) => i.project?.id === 'p-checkout');
const inM2 = checkoutIssues.slice(1, 4).map((i) => ({ ...i, projectMilestone: { id: 'm2', name: 'Idempotent payments' } }));
const doneInM1 = { ...issue('Batch the tax lookups', 'Done', { completedAt: '2026-11-04T10:00:00Z' }), projectMilestone: { id: 'm1', name: 'Pricing under 2 s' } };
workspace[key(Q.MILESTONE_ISSUES, { projectId: 'p-checkout', after: null })] = ok({ issues: page([
  ...inM2.map(() => ({ projectMilestone: { id: 'm2' } })), { projectMilestone: { id: 'm1' } }, ...checkoutIssues.slice(4).map(() => ({ projectMilestone: null })),
]) });
workspace[issuesKey(all(scopeFilter([], ['p-checkout']), milestoneFilter('m2')))] = ok({ issues: page(inM2) });
workspace[issuesKey(all(scopeFilter([], ['p-checkout']), milestoneFilter('m1')))] = ok({ issues: page([doneInM1]) });

// Phase 12: the sidebar's triage counts for the open teams.
workspace[key(Q.TRIAGE_COUNTS, { teamIds: ['t-eng'], after: null })] = ok({ issues: page(engIssues.filter((i) => i.state.type === 'triage').map((i) => ({ team: { id: i.team.id } }))) });

// Phase 9: the chat blocks. Each block reads its issues by team key and number in one request, then the
// started states of those issues' teams. Keyed by the same filter the blocks build, so a changed filter
// shows up as a missing fixture.
const blockLookup = (ids: string[], rows: typeof engIssues) => {
  workspace[key(Q.ISSUES_BY_KEYS, { filter: keysFilter(ids) })] = ok({ issues: { nodes: rows } });
  const teamIds = [...new Set(rows.filter((i) => i.state.type === 'started').map((i) => i.team.id))];
  if (teamIds.length > 0) {
    workspace[key(Q.BLOCK_STATES, { teamIds })] = ok({ workflowStates: { nodes: [...stateSet('t-eng'), ...stateSet('t-mob')]
      .filter((s) => s.type === 'started' && teamIds.includes(s.team.id)).map((s) => ({ id: s.id, position: s.position, team: s.team })) } });
  }
};
blockLookup(['ENG-11'], [engIssues[0]!]);
blockLookup(['ENG-13'], [engIssues[2]!]);
blockLookup(['ENG-999'], []);
blockLookup(['ENG-11', 'ENG-12'], [engIssues[0]!, engIssues[1]!]);
blockLookup(['ENG-11', 'ENG-12', 'ENG-13', 'MOB-5', 'ENG-999'], [engIssues[0]!, engIssues[1]!, engIssues[2]!, mobIssue]);
blockLookup(['ENG-13', 'ENG-14', 'ENG-17'], [engIssues[2]!, engIssues[3]!, engIssues[6]!]);
workspace[key(Q.ISSUE_DETAIL, { id: 'ENG-14' })] = ok({ issue: {
  ...detail, ...engIssues[3], description: 'Deliveries that fail should retry with exponential backoff.', children: { nodes: [] }, comments: { nodes: [] }, links: { nodes: [] },
  relations: { nodes: [] }, inverseRelations: { nodes: [] }, history: { nodes: [] }, team: detail.team,
} });
const eng13Detail = {
  ...detail, ...engIssues[2], description: 'Show the cards the customer used before first.', children: { nodes: [] }, comments: { nodes: [] }, links: { nodes: [] },
  relations: { nodes: [] }, inverseRelations: { nodes: [] }, history: { nodes: [] }, team: detail.team,
};
workspace[key(Q.ISSUE_DETAIL, { id: 'ENG-13' })] = ok({ issue: eng13Detail });

// Phase 10: the service. A plan ready for ENG-13 (the section's row and the build call), the service's
// own answers for Settings, and what the Start build click sends. Fake data only.
const handoff = {
  id: 'ses_plan:ENG-13', directory: '/work/engineering-api', sessionDirectory: '/work/engineering-api-wt', sessionId: 'ses_plan',
  identifier: 'ENG-13', sessionTitle: 'Plan: saved cards first', plan: true, createdAt: Date.parse('2026-11-09T11:30:00Z'),
};
service['GET /handoffs?directory=/work/engineering-api '] = { status: 200, body: JSON.stringify({ handoffs: [handoff] }) };
service[`POST /handoffs ${JSON.stringify({ id: handoff.id, action: 'dismiss' })}`] = { status: 200, body: JSON.stringify({ ok: true }) };
service['POST /snapshot *'] = { status: 200, body: JSON.stringify({ ok: true, mapped: true }) };
service['PUT /config *'] = { status: 200, body: JSON.stringify({ hasKey: false, directories: {} }) };
const CHOICES = {
  ok: true,
  current: { plan: { agent: 'plan', model: 'anthropic/claude-opus-4-5' }, build: { agent: 'build' } },
  defaultModel: 'fireworks-ai/accounts/fireworks/routers/kimi-fast-latest',
  agents: [{ id: 'build', label: 'build', hint: 'built in' }, { id: 'plan', label: 'plan', hint: 'built in' }, { id: 'review', label: 'review' }],
  models: [
    { id: 'fireworks-ai/accounts/fireworks/routers/kimi-fast-latest', label: 'Kimi Fast (latest)', hint: 'Fireworks AI' },
    { id: 'fireworks-ai/accounts/fireworks/models/kimi-k3', label: 'Kimi K3', hint: 'Fireworks AI' },
    { id: 'fireworks-ai/accounts/fireworks/models/qwen3p8', label: 'Qwen3.8', hint: 'Fireworks AI' },
    { id: 'anthropic/claude-opus-4-5', label: 'Claude Opus 4.5', hint: 'Anthropic' },
    { id: 'anthropic/claude-sonnet-4-5', label: 'Claude Sonnet 4.5', hint: 'Anthropic' },
  ],
};
service['GET /choices?directory=/work/engineering-api '] = { status: 200, body: JSON.stringify(CHOICES) };
// A plan's worktree resolves to the same folder, so Start build there offers the same lists.
service['GET /choices?directory=/work/engineering-api-wt '] = { status: 200, body: JSON.stringify(CHOICES) };
service['GET /config '] = { status: 200, body: JSON.stringify({ hasKey: false, directories: {} }) };
service[`POST /handoff ${JSON.stringify({ sessionId: handoff.sessionId, sessionDirectory: handoff.sessionDirectory, sessionTitle: handoff.sessionTitle, identifier: 'ENG-13', issueTitle: engIssues[2]!.title })}`] = {
  status: 200, body: JSON.stringify({ ok: true, sessionId: 'ses_build', directory: handoff.sessionDirectory }),
};
service[`POST /handoff ${JSON.stringify({ sessionId: 'ses_busy', sessionDirectory: handoff.sessionDirectory, sessionTitle: 'Plan: saved cards first', identifier: 'ENG-13', issueTitle: engIssues[2]!.title })}`] = {
  status: 200, body: JSON.stringify({ ok: false, error: 'The planning session is still working. Start the build when it has finished.' }),
};

// Phase 10, plan side: Start plan (the service call after the frame made the worktree), the plan a build reads
// and, with the post switch on, the comment that writes it to the issue.
const PLAN_TEXT = '## Plan\n\n1. Read `PaymentStep` and find where cards are listed\n2. Sort the saved cards by last use\n3. Add a test for the order\n4. Run the checkout suite\n\nRisk: the mobile app reads the same list.';
service[`POST /plan ${JSON.stringify({ identifier: 'ENG-13', directory: handoff.sessionDirectory, issueTitle: engIssues[2]!.title, context: issueContext(eng13Detail as never), scale: scaleText(teamScale(eng13Detail.team), (v) => estimateLabel(v, 'tShirt')) })}`] = {
  status: 200, body: JSON.stringify({ ok: true, sessionId: 'ses_plan_new', directory: handoff.sessionDirectory }),
};
service[`POST /handoff ${JSON.stringify({ mode: 'preview', sessionId: handoff.sessionId, sessionDirectory: handoff.sessionDirectory, identifier: 'ENG-13' })}`] = {
  status: 200, body: JSON.stringify({ ok: true, plan: PLAN_TEXT, postPlan: false }),
};
service[`POST /handoff ${JSON.stringify({ mode: 'preview', sessionId: handoff.sessionId, sessionDirectory: handoff.sessionDirectory, identifier: 'ENG-11' })}`] = {
  status: 200, body: JSON.stringify({ ok: true, plan: PLAN_TEXT, postPlan: false }),
};
service['GET /drafts?directory=/work/checkout '] = { status: 200, body: JSON.stringify({ drafts: [] }) };
service[`POST /handoff ${JSON.stringify({ mode: 'preview', sessionId: 'ses_post', sessionDirectory: handoff.sessionDirectory, identifier: 'ENG-13' })}`] = {
  status: 200, body: JSON.stringify({ ok: true, plan: PLAN_TEXT, postPlan: true }),
};
service[`POST /handoff ${JSON.stringify({ mode: 'preview', sessionId: 'ses_busy', sessionDirectory: handoff.sessionDirectory, identifier: 'ENG-13' })}`] = {
  status: 200, body: JSON.stringify({ ok: false, error: 'The planning session is still working. Start the build when it has finished.' }),
};
service[`POST /handoff ${JSON.stringify({ sessionId: 'ses_post', sessionDirectory: handoff.sessionDirectory, sessionTitle: 'Plan: saved cards first', identifier: 'ENG-13', issueTitle: engIssues[2]!.title })}`] = {
  status: 200, body: JSON.stringify({ ok: true, sessionId: 'ses_build', directory: handoff.sessionDirectory }),
};
service['GET /plans?sessionId=ses_plan '] = { status: 200, body: JSON.stringify({ sessions: [] }) };
service['GET /plans?identifier=ENG-13 '] = { status: 200, body: JSON.stringify({ sessions: [] }) };
service['GET /plans?identifier=ENG-11 '] = { status: 200, body: JSON.stringify({ sessions: [] }) };
const WITH_PLAN = withPlan(eng13Detail.description, PLAN_TEXT)!;
workspace[update('i-eng-13', { description: WITH_PLAN })] = updated({ ...engIssues[2]!, description: WITH_PLAN } as never);
const handoffPost = { ...handoff, directory: '/work/checkout', id: 'ses_post:ENG-13', sessionId: 'ses_post', postPlan: true };
service['GET /handoffs?directory=/work/checkout '] = { status: 200, body: JSON.stringify({ handoffs: [handoffPost] }) };

// Phase 12, item 6: a finished plan for ENG-16 with an estimate and one split-out issue, written by the Work Status
// frame with no click. A separate replay file, so the earlier shots keep their quiet service. Fake data only.
const extrasPending = {
  sessionId: 'ses_plan16', identifier: 'ENG-16', directory: '/work/engineering-api', sessionTitle: 'ENG-16 plan',
  extras: { estimate: 2.6, issues: [{ title: 'Add refund screenshots', description: 'Screens for each refund step.', estimate: 1 }] },
  state: 'pending', at: Date.parse('2026-11-09T11:40:00Z'),
};
const eng16 = engIssues.find((i) => i.identifier === 'ENG-16')!;
const extraIssue = { ...issue('Add refund screenshots', 'Backlog', { priority: 0, assignee: null, project: null, cycle: null, estimate: 1 }), id: 'i-eng-40', identifier: 'ENG-40' };
const extrasWorkspace = { ...workspace };
const extrasService = { ...service };
extrasService['GET /handoffs?directory=/work/engineering-api '] = { status: 200, body: JSON.stringify({ handoffs: [], extras: [extrasPending] }) };
extrasService[`POST /handoffs ${JSON.stringify({ sessionId: 'ses_plan16', action: 'claim-extras' })}`] = { status: 200, body: JSON.stringify({ ok: true, claimed: true, state: { ...extrasPending, state: 'claimed', claimedAt: 1 } }) };
extrasService[`POST /handoffs ${JSON.stringify({ sessionId: 'ses_plan16', action: 'extras-done', estimateDone: true, estimateSet: 3, created: ['ENG-40'] })}`] = { status: 200, body: JSON.stringify({ ok: true, state: { ...extrasPending, state: 'done', estimateDone: true, estimateSet: 3, created: ['ENG-40'] } }) };
extrasWorkspace[key(Q.ISSUE_DETAIL, { id: 'ENG-16' })] = ok({ issue: {
  ...detail, ...eng16, description: 'Write down how refunds work.', children: { nodes: [] }, comments: { nodes: [] }, links: { nodes: [] }, relations: { nodes: [] }, inverseRelations: { nodes: [] }, history: { nodes: [] }, team: detail.team,
} });
extrasWorkspace[update('i-eng-16', { estimate: 3 })] = updated({ ...eng16, estimate: 3 } as never);
extrasWorkspace[key(Q.ISSUE_CREATE, { input: { teamId: 't-eng', title: 'Add refund screenshots', description: extraDescription(extrasPending.extras.issues[0]!, 'ENG-16', 'ENG-16 plan'), estimate: 1 } })] = ok({ issueCreate: { success: true, issue: extraIssue } });
extrasWorkspace[key(Q.ISSUE_RELATION_CREATE, { input: { issueId: 'i-eng-40', relatedIssueId: 'i-eng-16', type: 'related' } })] = ok({ issueRelationCreate: { success: true } });
await Bun.write('harness/fixtures/plan-extras.json', JSON.stringify({ service: extrasService, request: extrasWorkspace }, null, 1));

await Bun.write('harness/fixtures/drafts.json', JSON.stringify(MODEL_ANSWERS, null, 1));

const error: Record<string, Saved> = {
  'POST /graphql *': { status: 200, body: JSON.stringify({ errors: [{ message: 'Linear is having trouble right now.' }] }) },
};

await Bun.write('harness/fixtures/workspace.json', JSON.stringify({ service, request: workspace }, null, 1));
await Bun.write('harness/fixtures/error.json', JSON.stringify({ service: {}, request: error }, null, 1));
console.log(`wrote ${Object.keys(workspace).length} workspace fixtures, the error fixture and the model answers`);

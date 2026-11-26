import { beforeEach, describe, expect, mock, test } from 'bun:test';

// The host is the extension storage OpenChamber keeps; fake it with a map.
const stored = new Map<string, unknown>();
const scopes: string[] = [];
mock.module('../src/shared/host.ts', () => ({
  host: {
    storage: {
      get: async (key: string, options?: { scope?: string }) => { scopes.push(options?.scope ?? 'instance'); return stored.get(key); },
      set: async (key: string, value: unknown) => { stored.set(key, structuredClone(value)); },
    },
  },
}));

const vs = await import('../src/app/view-state.ts');
const settle = () => new Promise((resolve) => setTimeout(resolve, 350));

describe('view state', () => {
  beforeEach(() => { stored.clear(); scopes.length = 0; vs.forgetViewStateMemory(); });

  test('the open issue and view survive a frame reload', async () => {
    await vs.loadViewState('p:a');
    vs.saveRoute('p:a', { view: 'project-issues' });
    vs.saveOpenIssue('p:a', 'project-issues:t-sc', 'SC-2829');
    vs.saveTab('p:a', 'my-issues', 'created');
    await settle();

    vs.forgetViewStateMemory();
    const state = await vs.loadViewState('p:a');
    expect(state.route).toEqual({ view: 'project-issues' });
    expect(vs.openIssueFor('p:a', 'project-issues:t-sc')).toBe('SC-2829');
    expect(vs.tabFor('p:a', 'my-issues')).toBe('created');
  });

  test('each folder keeps its own place', async () => {
    await vs.loadViewState('p:a');
    await vs.loadViewState('p:b');
    vs.saveOpenIssue('p:a', 'project-issues:x', 'SC-1');
    vs.saveOpenIssue('p:b', 'project-issues:x', 'CON-9');
    expect(vs.openIssueFor('p:a', 'project-issues:x')).toBe('SC-1');
    expect(vs.openIssueFor('p:b', 'project-issues:x')).toBe('CON-9');
  });

  test('each worktree of a project remembers its own open issue', async () => {
    await vs.loadViewState('p:a');
    const main = vs.issueOwnerKey('/work/repo', 'project-issues:x');
    const worktree = vs.issueOwnerKey('/work/repo-nil-779', 'project-issues:x');
    vs.saveOpenIssue('p:a', main, 'SC-1');
    vs.saveOpenIssue('p:a', worktree, 'NIL-779');
    expect(vs.openIssueFor('p:a', main)).toBe('SC-1');
    expect(vs.openIssueFor('p:a', worktree)).toBe('NIL-779');
    await settle();
    vs.forgetViewStateMemory();
    await vs.loadViewState('p:a');
    expect(vs.openIssueFor('p:a', main)).toBe('SC-1');
    expect(vs.openIssueFor('p:a', worktree)).toBe('NIL-779');
  });

  test('closing an issue is remembered too', async () => {
    await vs.loadViewState('p:a');
    vs.saveOpenIssue('p:a', 'l', 'SC-1');
    vs.saveOpenIssue('p:a', 'l', null);
    await settle();
    vs.forgetViewStateMemory();
    await vs.loadViewState('p:a');
    expect(vs.openIssueFor('p:a', 'l')).toBeNull();
  });

  test('a list keeps its display options, and a user default outlives the frame', async () => {
    await vs.loadViewState('p:a');
    vs.saveOptions('p:a', 'team-issues:t1', { mode: 'board', board: { showEmpty: true, columns: { 'started|In Progress': 'hide' } } });
    vs.saveUserDefaults('list', { reverse: true });
    await settle();
    vs.forgetViewStateMemory();
    await vs.loadViewState('p:a');
    expect(vs.savedOptionsFor('p:a', 'team-issues:t1')).toEqual({ mode: 'board', board: { showEmpty: true, columns: { 'started|In Progress': 'hide' } } });
    expect(vs.userDefaults('list')).toEqual({ reverse: true });
    expect(vs.userDefaults('board')).toBeUndefined();
  });

  test('list filters and a project milestone survive a frame reload', async () => {
    await vs.loadViewState('p:a');
    vs.saveFilters('p:a', 'project:p1', { search: 'checkout', assignee: 'me', status: 'started', showClosed: true });
    vs.saveFilters('p:a', 'project:p1', { milestone: 'm2' });
    await settle();
    vs.forgetViewStateMemory();
    await vs.loadViewState('p:a');
    expect(vs.savedFiltersFor('p:a', 'project:p1')).toEqual({ search: 'checkout', assignee: 'me', status: 'started', showClosed: true, milestone: 'm2' });
  });

  test('device storage is used when the host has it', async () => {
    vs.setViewStateScope(true);
    await vs.loadViewState('p:c');
    expect(scopes.length).toBeGreaterThan(0);
    expect(scopes.every((scope) => scope === 'device')).toBe(true);
    vs.setViewStateScope(false);
  });
});

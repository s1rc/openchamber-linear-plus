import { describe, expect, test } from 'bun:test';
import { countByTeam, defaultOpen, teamPages, teamTree, withAncestors } from '../src/app/nav.ts';
import type { Team } from '../src/shared/types.ts';

const team = (id: string, name: string, parent: string | null = null, triageEnabled = false) =>
  ({ id, key: id.toUpperCase(), name, parent: parent ? { id: parent } : null, triageEnabled }) as unknown as Team;

const nil = team('nil', 'NIL Ops', null, true);
const inf = team('inf', 'Influencer', 'nil', true);
const gm = team('gm', 'GM', 'nil');
const sec = team('sec', 'AppSec');
const deep = team('deep', 'Deep', 'inf');
const all = [nil, inf, gm, sec, deep];
const byId = new Map(all.map((t) => [t.id, t]));

describe('teamTree', () => {
  test('nests sub-teams under their parent, siblings by name', () => {
    const tree = teamTree(all, new Set(all.map((t) => t.id)));
    expect(tree.map((n) => n.team.name)).toEqual(['AppSec', 'NIL Ops']);
    expect(tree[1]!.children.map((n) => n.team.name)).toEqual(['GM', 'Influencer']);
    expect(tree[1]!.children[1]!.children.map((n) => n.team.name)).toEqual(['Deep']);
  });

  test('a sub-team whose parent is not shown is a root, and a loop loses no team', () => {
    expect(teamTree(all, new Set(['inf', 'sec'])).map((n) => n.team.name)).toEqual(['AppSec', 'Influencer']);
    const a = team('a', 'A', 'b');
    const b = team('b', 'B', 'a');
    expect(teamTree([a, b], new Set(['a', 'b'])).map((n) => n.team.name).sort()).toEqual(['A', 'B']);
  });
});

describe('the rest', () => {
  test('teamPages offers Triage only where the team uses it', () => {
    expect(teamPages(nil).map((p) => p.title)).toEqual(['Home', 'Triage', 'Issues', 'Projects', 'Views']);
    expect(teamPages(gm).map((p) => p.title)).toEqual(['Home', 'Issues', 'Projects', 'Views']);
  });

  test('the folder teams open with every team above them', () => {
    expect(withAncestors('deep', byId)).toEqual(['deep', 'inf', 'nil']);
    expect(defaultOpen(['deep', 'gm'], byId).sort()).toEqual(['deep', 'gm', 'inf', 'nil']);
  });

  test('countByTeam counts triage issues per team', () => {
    expect([...countByTeam([{ team: { id: 'a' } }, { team: { id: 'a' } }, { team: { id: 'b' } }])]).toEqual([['a', 2], ['b', 1]]);
  });
});

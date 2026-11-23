// The rich description editor's Markdown: what Linear stores must come back the same when it is not edited, and
// an edit must change only what was edited.
import { describe, expect, test } from 'bun:test';
import { EditorState, TextSelection } from 'prosemirror-state';
import { withPlan } from '../src/shared/handoff-rules.ts';
import { blockAt, setChecked, setLink, splitItem, toggleChecklist, toggleHeading, toggleList } from '../src/shared/rich/commands.ts';
import { parseMarkdown, serializeMarkdown, splitSections } from '../src/shared/rich/markdown.ts';
import { schema } from '../src/shared/rich/schema.ts';

const roundTrip = (markdown: string) => serializeMarkdown(parseMarkdown(markdown));

// NIL-784 as Linear stores it.
const NIL_784 = `Move \`teamworksdev/personnel/gm\` (ID 93642781, 5 repos) to \`teamworksdev/operations/nil-ops\`. Result: \`teamworksdev/operations/nil-ops/gm\`. The group ID does not change.

## Before

- [ ] M2 finished (runners, variables, tokens)
- [ ] \`operations/nil-ops/gm\` path is free
- [ ] Refs MRs prepared in the repo issues of this group
- [ ] Group variables REVIEW_DOMAIN, KUBE_CONTEXT (review/\\*), QA_WOLF_API_KEY move with the group; KUBE_CONTEXT value changes in M5
- [ ] Agent config MR in devops: update \`ci_access\` and \`user_access\` paths for this group in all 3 configs; merge right after the transfer

## Transfer (manual)

GitLab refuses a group transfer while any project in the group has registry images (the [NIL-764](https://linear.app/teamworks/issue/NIL-764/dry-run-a-transfer-on-a-scratch-project) dry run, 2026-11-19). gm-web has images (139 tags on 2026-11-19). Re-check every project in the group for images before the window.

- [ ] Pause gm-web pipelines and deploys
- [ ] Project transfer \`personnel/gm/gm-web\` to \`operations/nil-ops\` (holding: \`operations/nil-ops/gm-web\`; confirm the path is free)
- [ ] Group > Settings > Advanced > Transfer group, select \`operations/nil-ops\`
- [x] Confirm the gm-web registry lists its tags on the final path

gm-web refs MR points at the final path only.

## After

- [ ] Merge the refs MRs
- [ ] Run a gm-api and gm-web deploy`;

// What Linear's own editor writes: every construct the rich editor draws, each written back the same.
const CANONICAL = [
  NIL_784,
  'Plain text with **bold**, *italic*, _underscore italic_, __double__, ~~struck~~ and `code`.',
  'A bare link https://linear.app/acme/issue/ENG-14/retry_webhooks stays bare, underscores and all.',
  'A [named link](https://gitlab.com/acme/checkout/-/merge_requests/42) and a [titled one](https://x.dev "Title").',
  'First line\nsecond line after a break',
  '# One\n\n## Two\n\n### Three',
  '> A quote\n> over two lines',
  '1. one\n2. two\n3. three',
  '3. starts at three\n4. four',
  '* star bullets\n* stay stars',
  '- outer\n  - inner\n    - innermost',
  '```ts\nawait priceCart(cart) // 31.2 s\n```',
  '```\nno language\n```',
  '---',
  '![shot.png](https://uploads.linear.app/a/b/c)',
  'Text with <u>inline HTML</u> kept.',
  '| a | b |\n|---|---|\n| 1 | 2 |',
  '+++ Agent notes\n\n- file.ts\n- other\n\n+++',
  'Before\n\n+++ Collapsed\n\nInside **bold**\n\n+++\n\nAfter',
  'Escapes stay: review/\\*, \\[not a link\\], 2 \\* 3',
];

describe('rich Markdown round trip', () => {
  for (const markdown of CANONICAL) {
    test(`unchanged: ${JSON.stringify(markdown.slice(0, 50))}`, () => expect(roundTrip(markdown)).toBe(markdown));
  }

  test('a plan added by Start build is still found and replaced after a rich edit', () => {
    const text = withPlan('Returning customers should see their saved cards first.\n\n- Sort by last used\n- Hide expired cards', '1. Sort cards\n2. Hide expired ones')!;
    const saved = roundTrip(text);
    expect(roundTrip(saved)).toBe(saved);
    const again = withPlan(saved, '1. New plan')!;
    expect(again.match(/## Plan/g)?.length).toBe(1);
    expect(again).toContain('1. New plan');
    expect(again).not.toContain('Sort cards');
  });

  test('other spellings settle after one save and stay', () => {
    for (const markdown of ['## Heading\n- list right under', '- outer\n    - four-space inner', '1. a\n2. b\n\n3. loose', 'Trailing spaces   \n\n\n\nmany blank lines', '    indented code']) {
      const once = roundTrip(markdown);
      expect(roundTrip(once)).toBe(once);
      expect(parseMarkdown(once).textContent).toBe(parseMarkdown(markdown).textContent);
    }
  });

  test('an empty description is one empty paragraph and saves as nothing', () => {
    expect(parseMarkdown('').childCount).toBe(1);
    expect(roundTrip('')).toBe('');
  });

  test('what it does not draw is one kept block, exactly as written', () => {
    const doc = parseMarkdown('| a | b |\n|---|---|\n| 1 | 2 |\n\n+++ Notes\n\n```\n+++ not a section end\n```\n\n+++');
    expect(doc.childCount).toBe(2);
    expect(doc.child(0).type.name).toBe('raw');
    expect(doc.child(1).attrs.markdown).toBe('+++ Notes\n\n```\n+++ not a section end\n```\n\n+++');
  });

  test('a section with no end is ordinary text', () => {
    expect(splitSections('+++ Never closed\n\ntext')).toEqual([{ raw: false, text: '+++ Never closed\n\ntext' }]);
  });
});

const editorAt = (markdown: string, find: string) => {
  const doc = parseMarkdown(markdown);
  let at = -1;
  doc.descendants((node, pos) => {
    if (at < 0 && node.isText && node.text!.includes(find)) at = pos + node.text!.indexOf(find) + find.length;
    return at < 0;
  });
  return EditorState.create({ doc, selection: TextSelection.create(doc, at) });
};
const apply = (state: EditorState, command: (s: EditorState, d: (tr: import('prosemirror-state').Transaction) => void) => boolean) => {
  let next = state;
  command(state, (tr) => { next = next.apply(tr); });
  return next;
};
const md = (state: EditorState) => serializeMarkdown(state.doc);

describe('rich editing', () => {
  test('ticking one box changes only its line', () => {
    const state = editorAt(NIL_784, 'Merge the refs');
    let pos = -1;
    state.doc.descendants((node, p) => { if (node.type === schema.nodes.list_item && node.textContent.startsWith('Merge the refs')) pos = p; });
    const next = md(apply(state, setChecked(pos, true)));
    const changed = next.split('\n').filter((line, i) => line !== NIL_784.split('\n')[i]);
    expect(changed).toEqual(['- [x] Merge the refs MRs']);
  });

  test('Enter in a checklist starts an unticked task; in a plain list, a plain item', () => {
    const task = apply(editorAt('- [x] done', 'done'), splitItem);
    expect(md(task)).toBe('- [x] done\n- [ ] ');
    expect(task.doc.child(0).child(1).attrs.checked).toBe(false);
    const middle = apply(editorAt('- [x] done here', 'done'), splitItem);
    expect(md(middle)).toBe('- [x] done\n- [ ]  here');
    const plain = apply(editorAt('- item', 'item'), splitItem);
    expect(md(plain)).toBe('- item\n- ');
  });

  test('the checklist button turns a paragraph or a list into tasks, and back', () => {
    expect(md(apply(editorAt('Write tests', 'Write'), toggleChecklist))).toBe('- [ ] Write tests');
    const list = apply(editorAt('- a\n- b', 'a'), toggleChecklist);
    expect(md(list)).toBe('- [ ] a\n- [ ] b');
    expect(blockAt(list)).toBe('task');
    expect(md(apply(list, toggleChecklist))).toBe('- a\n- b');
  });

  test('headings and lists toggle on and off', () => {
    const heading = apply(editorAt('Title', 'Title'), toggleHeading(2));
    expect(md(heading)).toBe('## Title');
    expect(md(apply(heading, toggleHeading(2)))).toBe('Title');
    const numbered = apply(editorAt('Step', 'Step'), toggleList(schema.nodes.ordered_list!));
    expect(md(numbered)).toBe('1. Step');
    expect(md(apply(numbered, toggleList(schema.nodes.ordered_list!)))).toBe('Step');
  });

  test('a link goes on the selection, or is written bare at the cursor', () => {
    const doc = parseMarkdown('See the docs');
    const selected = EditorState.create({ doc, selection: TextSelection.create(doc, 9, 13) });
    expect(md(apply(selected, setLink('https://docs.dev')))).toBe('See the [docs](https://docs.dev)');
    expect(md(apply(editorAt('Link: ', 'Link: '), setLink('https://linear.app/a')))).toBe('Link: https://linear.app/a');
  });

  test('typed text with Markdown characters is escaped so it reads back as typed', () => {
    const state = editorAt('x', 'x');
    const next = state.apply(state.tr.insertText(' 2 * 3 [a] #tag'));
    expect(md(next)).toBe('x 2 \\* 3 \\[a\\] #tag');
    expect(parseMarkdown(md(next)).textContent).toBe('x 2 * 3 [a] #tag');
  });
});

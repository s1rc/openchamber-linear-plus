// What the rich editor's keys, input rules and toolbar do. Pure ProseMirror state commands, testable headless.
import { setBlockType, toggleMark, wrapIn } from 'prosemirror-commands';
import { InputRule, inputRules, textblockTypeInputRule, wrappingInputRule } from 'prosemirror-inputrules';
import type { MarkType, Node, NodeType } from 'prosemirror-model';
import { liftListItem, sinkListItem, splitListItem, wrapInList } from 'prosemirror-schema-list';
import type { Command, EditorState, Transaction } from 'prosemirror-state';
import { schema } from './schema.ts';

const nodes = schema.nodes;
const marks = schema.marks;

/** The list item the cursor is in, and where it starts, or null. */
export const itemAt = (state: EditorState): { node: Node; pos: number } | null => {
  const { $from } = state.selection;
  for (let depth = $from.depth; depth > 0; depth -= 1) {
    const node = $from.node(depth);
    if (node.type === nodes.list_item) return { node, pos: $from.before(depth) };
  }
  return null;
};

/** Enter in a list: the new item is a task, unticked, when the item it splits is one, wherever the cursor was. */
export const splitItem: Command = (state, dispatch) => {
  const item = itemAt(state);
  const task = Boolean(item && item.node.attrs.checked !== null);
  let split: Transaction | null = null;
  if (!splitListItem(nodes.list_item!, task ? { checked: false } : { checked: null })(state, dispatch && ((tr) => { split = tr; }))) return false;
  if (!dispatch) return true;
  const tr = split as unknown as Transaction;
  // Split in the middle of the text, ProseMirror copies the item, tick included: the new one starts unticked.
  if (task) {
    const { $from } = tr.selection;
    for (let depth = $from.depth; depth > 0; depth -= 1) {
      const node = $from.node(depth);
      if (node.type === nodes.list_item) {
        if (node.attrs.checked) tr.setNodeMarkup($from.before(depth), undefined, { ...node.attrs, checked: false });
        break;
      }
    }
  }
  dispatch(tr);
  return true;
};

/** Ticks or clears the task item at `pos`. */
export const setChecked = (pos: number, checked: boolean): Command => (state, dispatch) => {
  const node = state.doc.nodeAt(pos);
  if (!node || node.type !== nodes.list_item || node.attrs.checked === null) return false;
  dispatch?.(state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, checked }));
  return true;
};

/** Turns the list around the cursor into a checklist, or a checklist back into a plain list; wraps a paragraph in one. */
export const toggleChecklist: Command = (state, dispatch) => {
  const item = itemAt(state);
  if (!item) {
    let wrapped: Transaction | null = null;
    if (!wrapInList(nodes.bullet_list!)(state, (tr) => { wrapped = tr; })) return false;
    if (!dispatch) return true;
    // Wrapping cannot set the new item's attrs itself, so the same step makes it a task.
    const tr = wrapped as unknown as Transaction;
    const { $from } = tr.selection;
    for (let depth = $from.depth; depth > 0; depth -= 1) {
      if ($from.node(depth).type === nodes.list_item) { tr.setNodeMarkup($from.before(depth), undefined, { checked: false }); break; }
    }
    dispatch(tr);
    return true;
  }
  const $pos = state.doc.resolve(item.pos);
  const list = $pos.parent;
  const start = $pos.start();
  const task = item.node.attrs.checked === null;
  if (dispatch) {
    let tr = state.tr;
    list.forEach((child, offset) => { tr = tr.setNodeMarkup(start + offset, undefined, { ...child.attrs, checked: task ? (child.attrs.checked ?? false) : null }); });
    dispatch(tr);
  }
  return true;
};

export const isMarkActive = (state: EditorState, type: MarkType): boolean => {
  const { from, $from, to, empty } = state.selection;
  return empty ? Boolean(type.isInSet(state.storedMarks ?? $from.marks())) : state.doc.rangeHasMark(from, to, type);
};

/** The block type at the cursor, for the toolbar: `h1`..`h3`, `bullet`, `ordered`, `task`, `quote`, `code`, or `text`. */
export const blockAt = (state: EditorState): string => {
  const { $from } = state.selection;
  if ($from.parent.type === nodes.code_block) return 'code';
  if ($from.parent.type === nodes.heading) return `h${$from.parent.attrs.level as number}`;
  for (let depth = $from.depth; depth > 0; depth -= 1) {
    const node = $from.node(depth);
    if (node.type === nodes.list_item) {
      if (node.attrs.checked !== null) return 'task';
      return $from.node(depth - 1).type === nodes.ordered_list ? 'ordered' : 'bullet';
    }
    if (node.type === nodes.blockquote) return 'quote';
  }
  return 'text';
};

/** A heading of `level`, or back to text when it already is one. */
export const toggleHeading = (level: number): Command => (state, dispatch) =>
  blockAt(state) === `h${level}` ? setBlockType(nodes.paragraph!)(state, dispatch) : setBlockType(nodes.heading!, { level })(state, dispatch);

/** A list of `type`, or out of it when the cursor is already in one. */
export const toggleList = (type: NodeType): Command => (state, dispatch) => {
  const kind = blockAt(state);
  if ((type === nodes.bullet_list && kind === 'bullet') || (type === nodes.ordered_list && kind === 'ordered')) return liftListItem(nodes.list_item!)(state, dispatch);
  return wrapInList(type)(state, dispatch);
};

export const toggleCode: Command = (state, dispatch) =>
  blockAt(state) === 'code' ? setBlockType(nodes.paragraph!)(state, dispatch) : setBlockType(nodes.code_block!)(state, dispatch);

/** Sets the link on the selection, or removes it with an empty address. */
export const setLink = (href: string): Command => (state, dispatch) => {
  const { from, to, empty } = state.selection;
  const link = marks.link!;
  if (!href.trim()) {
    if (dispatch) dispatch(state.tr.removeMark(from, to, link));
    return true;
  }
  if (empty) {
    if (dispatch) dispatch(state.tr.insert(from, schema.text(href.trim(), [link.create({ href: href.trim() })])));
    return true;
  }
  if (dispatch) dispatch(state.tr.addMark(from, to, link.create({ href: href.trim() })));
  return true;
};

/** The link around the cursor or selection, for the link field to start from. */
export const linkAt = (state: EditorState): string => {
  const { $from } = state.selection;
  return (marks.link!.isInSet($from.marks()) ?? marks.link!.isInSet($from.nodeAfter?.marks ?? []))?.attrs.href as string ?? '';
};

export const keys: Record<string, Command> = {
  'Mod-b': toggleMark(marks.strong!),
  'Mod-i': toggleMark(marks.em!),
  'Mod-e': toggleMark(marks.code!),
  'Mod-Shift-x': toggleMark(marks.strike!),
  'Mod-Alt-1': toggleHeading(1),
  'Mod-Alt-2': toggleHeading(2),
  'Mod-Alt-3': toggleHeading(3),
  'Mod-Shift-7': toggleList(nodes.ordered_list!),
  'Mod-Shift-8': toggleList(nodes.bullet_list!),
  'Mod-Shift-9': toggleChecklist,
  'Mod-Shift-.': wrapIn(nodes.blockquote!),
  Enter: splitItem,
  Tab: sinkListItem(nodes.list_item!),
  'Shift-Tab': liftListItem(nodes.list_item!),
  'Shift-Enter': (state, dispatch) => {
    if (dispatch) dispatch(state.tr.replaceSelectionWith(nodes.hard_break!.create()).scrollIntoView());
    return true;
  },
};

/** `[ ] ` or `[x] ` at the start of a list item makes it a task, as Linear does. */
const taskRule = new InputRule(/^\[( |x)?\]\s$/, (state, match, start, end) => {
  const item = itemAt(state);
  if (!item || item.node.attrs.checked !== null) return null;
  return state.tr.delete(start, end).setNodeMarkup(item.pos, undefined, { checked: match[1] === 'x' });
});

export const rules = inputRules({
  rules: [
    textblockTypeInputRule(/^(#{1,6})\s$/, nodes.heading!, (match) => ({ level: match[1]!.length })),
    wrappingInputRule(/^\s*>\s$/, nodes.blockquote!),
    wrappingInputRule(/^\s*([-+*])\s$/, nodes.bullet_list!, (match) => ({ bullet: match[1] === '*' ? '*' : '-' })),
    wrappingInputRule(/^(\d+)\.\s$/, nodes.ordered_list!, (match) => ({ order: Number(match[1]) }), (match, node) => node.childCount + (node.attrs.order as number) === Number(match[1])),
    textblockTypeInputRule(/^```([\w-]*)\s$/, nodes.code_block!, (match) => ({ params: match[1] ?? '' })),
    taskRule,
  ],
});

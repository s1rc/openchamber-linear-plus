// The rich description editor: Linear-style text editing with a toolbar, keys and Markdown shortcuts (`# `, `- `,
// `[] `, `> `, ```), saved as Markdown since that is all Linear's API takes. What it does not draw (tables,
// collapsible sections, HTML) shows as it renders and is written back unchanged; edit those in the Markdown tab.
import { baseKeymap, toggleMark, wrapIn } from 'prosemirror-commands';
import { history, redo, undo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import type { Node } from 'prosemirror-model';
import { EditorState, NodeSelection, Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView, type NodeView } from 'prosemirror-view';
import { useEffect, useRef, useState } from 'preact/hooks';
import { toHtml } from '../../shared/markdown.tsx';
import {
  blockAt, isMarkActive, keys, linkAt, rules, setChecked, setLink, toggleChecklist, toggleCode, toggleHeading, toggleList,
} from '../../shared/rich/commands.ts';
import { parseMarkdown, serializeMarkdown } from '../../shared/rich/markdown.ts';
import { schema } from '../../shared/rich/schema.ts';

/** A list item; a task gets Linear's box in front of its text, and a click on the box ticks it. */
class TaskItemView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  private box: HTMLElement;
  constructor(private node: Node, private view: EditorView, private getPos: () => number | undefined) {
    this.dom = document.createElement('li');
    this.box = document.createElement('span');
    this.box.className = 'lin-task-box';
    this.box.contentEditable = 'false';
    this.box.setAttribute('role', 'checkbox');
    this.box.addEventListener('mousedown', (event) => {
      event.preventDefault();
      const pos = this.getPos();
      if (pos !== undefined) setChecked(pos, !this.node.attrs.checked)(this.view.state, this.view.dispatch);
    });
    this.contentDOM = document.createElement('div');
    this.contentDOM.className = 'lin-rich-item';
    this.dom.append(this.box, this.contentDOM);
    this.paint();
  }
  /** Only attributes change here, never the children, so ProseMirror sees no edit of its own to undo. */
  private paint() {
    const task = this.node.attrs.checked !== null;
    this.dom.className = task ? `lin-task${this.node.attrs.checked ? ' lin-task--done' : ''}` : '';
    this.box.hidden = !task;
    this.box.setAttribute('aria-checked', this.node.attrs.checked ? 'true' : 'false');
  }
  update(node: Node) {
    if (node.type !== this.node.type) return false;
    this.node = node;
    this.paint();
    return true;
  }
  stopEvent(event: Event) { return this.box.contains(event.target as globalThis.Node); }
  ignoreMutation(mutation: { type: string; target: globalThis.Node }) {
    if (mutation.type === 'selection') return false;
    return mutation.target === this.dom ? mutation.type === 'attributes' : this.box.contains(mutation.target);
  }
}

/** Markdown the editor does not draw: shown as it renders, kept as written. */
class RawView implements NodeView {
  dom: HTMLElement;
  constructor(node: Node) {
    this.dom = document.createElement('div');
    this.dom.className = 'lin-rich-raw lin-md';
    this.dom.contentEditable = 'false';
    this.dom.title = 'Kept as written. Edit it in the Markdown tab.';
    this.dom.innerHTML = toHtml(node.attrs.markdown as string).html;
  }
  stopEvent() { return true; }
  ignoreMutation() { return true; }
}

/** Marks a selected image or kept block, as the focus ring does elsewhere. */
const selectedNode = new Plugin({
  props: {
    decorations: (state) => (state.selection instanceof NodeSelection
      ? DecorationSet.create(state.doc, [Decoration.node(state.selection.from, state.selection.to, { class: 'lin-rich-selected' })])
      : null),
  },
});

type Tool = { id: string; label: string; title: string; active: boolean; run: () => void };

type Props = {
  /** The Markdown to start from. Read once: remount (a new `key`) to load other text. */
  initial: string;
  /** The Markdown after each change. Not called until the text is changed, so an untouched description is never rewritten. */
  onChange: (markdown: string) => void;
  placeholder?: string;
  autofocus?: boolean;
};

export const RichEditor = ({ initial, onChange, placeholder = 'Add a description...', autofocus = true }: Props) => {
  const mount = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView | null>(null);
  const changed = useRef(onChange);
  changed.current = onChange;
  const [, setTick] = useState(0);
  const [linking, setLinking] = useState<string | null>(null);

  useEffect(() => {
    const state = EditorState.create({
      doc: parseMarkdown(initial),
      plugins: [
        rules,
        history(),
        selectedNode,
        keymap({ 'Mod-z': undo, 'Mod-Shift-z': redo, 'Mod-y': redo, 'Mod-k': () => { setLinking(linkAt(view.current!.state)); return true; }, ...keys }),
        keymap(baseKeymap),
      ],
    });
    const editor = new EditorView(mount.current!, {
      state,
      nodeViews: {
        list_item: (node, v, getPos) => new TaskItemView(node, v, getPos),
        raw: (node) => new RawView(node),
      },
      attributes: (s) => ({
        class: 'lin-md lin-rich-doc',
        'aria-label': 'Description',
        'data-empty': s.doc.childCount === 1 && s.doc.firstChild!.isTextblock && s.doc.firstChild!.content.size === 0 ? 'true' : 'false',
        'data-placeholder': placeholder,
      }),
      dispatchTransaction: (tr) => {
        const next = editor.state.apply(tr);
        editor.updateState(next);
        if (tr.docChanged) changed.current(serializeMarkdown(next.doc));
        setTick((n) => n + 1);
      },
    });
    view.current = editor;
    if (autofocus) editor.focus();
    return () => { editor.destroy(); view.current = null; };
  }, []);

  const state = view.current?.state;
  const run = (command: (s: EditorState, d?: EditorView['dispatch']) => boolean) => () => {
    const v = view.current;
    if (!v) return;
    command(v.state, v.dispatch);
    v.focus();
  };
  const block = state ? blockAt(state) : 'text';
  const mark = (name: 'strong' | 'em' | 'strike' | 'code') => Boolean(state && isMarkActive(state, schema.marks[name]!));
  const tools: Tool[][] = [
    [
      { id: 'bold', label: 'B', title: 'Bold (Cmd+B)', active: mark('strong'), run: run(toggleMark(schema.marks.strong!)) },
      { id: 'italic', label: 'I', title: 'Italic (Cmd+I)', active: mark('em'), run: run(toggleMark(schema.marks.em!)) },
      { id: 'strike', label: 'S', title: 'Strikethrough (Cmd+Shift+X)', active: mark('strike'), run: run(toggleMark(schema.marks.strike!)) },
      { id: 'code', label: '</>', title: 'Inline code (Cmd+E)', active: mark('code'), run: run(toggleMark(schema.marks.code!)) },
      { id: 'link', label: 'Link', title: 'Link (Cmd+K)', active: Boolean(state && linkAt(state)), run: () => setLinking(state ? linkAt(state) : '') },
    ],
    [
      { id: 'h1', label: 'H1', title: 'Heading 1 (# then space)', active: block === 'h1', run: run(toggleHeading(1)) },
      { id: 'h2', label: 'H2', title: 'Heading 2 (## then space)', active: block === 'h2', run: run(toggleHeading(2)) },
      { id: 'h3', label: 'H3', title: 'Heading 3 (### then space)', active: block === 'h3', run: run(toggleHeading(3)) },
    ],
    [
      { id: 'bullet', label: '•', title: 'Bulleted list (- then space)', active: block === 'bullet', run: run(toggleList(schema.nodes.bullet_list!)) },
      { id: 'ordered', label: '1.', title: 'Numbered list (1. then space)', active: block === 'ordered', run: run(toggleList(schema.nodes.ordered_list!)) },
      { id: 'task', label: '☐', title: 'Checklist ([] then space)', active: block === 'task', run: run(toggleChecklist) },
      { id: 'quote', label: '❝', title: 'Quote (> then space)', active: block === 'quote', run: run(wrapIn(schema.nodes.blockquote!)) },
      { id: 'codeblock', label: '{ }', title: 'Code block (``` then space)', active: block === 'code', run: run(toggleCode) },
    ],
  ];

  const applyLink = (href: string) => {
    const v = view.current;
    setLinking(null);
    if (!v) return;
    setLink(href)(v.state, v.dispatch);
    v.focus();
  };

  return (
    <div class="lin-rich">
      <div class="lin-rich-bar" role="toolbar" aria-label="Formatting">
        {tools.map((group, g) => (
          <span class="lin-rich-group" key={g}>
            {group.map((tool) => (
              <button
                type="button"
                class="lin-rich-btn"
                key={tool.id}
                data-tool={tool.id}
                title={tool.title}
                aria-label={tool.title}
                aria-pressed={tool.active ? 'true' : 'false'}
                onMouseDown={(event) => event.preventDefault()}
                onClick={tool.run}
              >
                {tool.label}
              </button>
            ))}
          </span>
        ))}
      </div>
      {linking !== null && (
        <form class="lin-rich-link" onSubmit={(event) => { event.preventDefault(); applyLink(linking); }}>
          <input
            class="lin-rich-link-input"
            aria-label="Link address"
            placeholder="https://"
            value={linking}
            ref={(input) => input?.focus()}
            onInput={(event) => setLinking((event.target as HTMLInputElement).value)}
            onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); setLinking(null); view.current?.focus(); } }}
          />
          <button type="submit" class="lin-rich-btn">Apply</button>
          <button type="button" class="lin-rich-btn" onClick={() => applyLink('')}>Remove</button>
        </form>
      )}
      <div ref={mount} class="lin-rich-mount" />
    </div>
  );
};

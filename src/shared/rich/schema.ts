// The document the rich description editor edits: what Linear's Markdown can say, and a `raw` block for what it
// says that this editor does not draw (tables, `+++` collapsible sections, HTML). A raw block keeps its Markdown
// exactly, so saving never rewrites it. No DOM needed: tests build documents with it headless.
import { Schema, type DOMOutputSpec } from 'prosemirror-model';

export const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { content: 'inline*', group: 'block', parseDOM: [{ tag: 'p' }], toDOM: (): DOMOutputSpec => ['p', 0] },
    heading: {
      attrs: { level: { default: 2 } },
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [1, 2, 3, 4, 5, 6].map((level) => ({ tag: `h${level}`, attrs: { level } })),
      toDOM: (node): DOMOutputSpec => [`h${node.attrs.level as number}`, 0],
    },
    blockquote: { content: 'block+', group: 'block', defining: true, parseDOM: [{ tag: 'blockquote' }], toDOM: (): DOMOutputSpec => ['blockquote', 0] },
    horizontal_rule: { group: 'block', parseDOM: [{ tag: 'hr' }], toDOM: (): DOMOutputSpec => ['hr'] },
    code_block: {
      attrs: { params: { default: '' } },
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
      toDOM: (node): DOMOutputSpec => ['pre', { 'data-lang': (node.attrs.params as string) || null }, ['code', 0]],
    },
    bullet_list: {
      attrs: { tight: { default: true }, bullet: { default: '-' } },
      content: 'list_item+',
      group: 'block',
      parseDOM: [{ tag: 'ul' }],
      toDOM: (): DOMOutputSpec => ['ul', 0],
    },
    ordered_list: {
      attrs: { order: { default: 1 }, tight: { default: true } },
      content: 'list_item+',
      group: 'block',
      parseDOM: [{ tag: 'ol', getAttrs: (dom) => ({ order: Number((dom as HTMLElement).getAttribute('start') ?? 1) }) }],
      toDOM: (node): DOMOutputSpec => ['ol', { start: node.attrs.order === 1 ? null : node.attrs.order }, 0],
    },
    /** `checked` is null for a plain item, true or false for a task (`- [x]`, `- [ ]`). */
    list_item: {
      attrs: { checked: { default: null } },
      content: 'paragraph block*',
      defining: true,
      parseDOM: [{ tag: 'li' }],
      toDOM: (node): DOMOutputSpec => ['li', { 'data-checked': node.attrs.checked === null ? null : String(node.attrs.checked) }, 0],
    },
    /** Markdown this editor does not draw, kept as it was written. */
    raw: {
      attrs: { markdown: { default: '' } },
      group: 'block',
      atom: true,
      selectable: true,
      toDOM: (node): DOMOutputSpec => ['div', { class: 'lin-rich-raw' }, node.attrs.markdown as string],
    },
    text: { group: 'inline' },
    image: {
      inline: true,
      attrs: { src: {}, alt: { default: null }, title: { default: null } },
      group: 'inline',
      draggable: true,
      parseDOM: [{ tag: 'img[src]', getAttrs: (dom) => ({ src: (dom as HTMLElement).getAttribute('src'), alt: (dom as HTMLElement).getAttribute('alt'), title: (dom as HTMLElement).getAttribute('title') }) }],
      toDOM: (node): DOMOutputSpec => ['img', { src: node.attrs.src as string, alt: node.attrs.alt as string | null, title: node.attrs.title as string | null }],
    },
    hard_break: { inline: true, group: 'inline', selectable: false, parseDOM: [{ tag: 'br' }], toDOM: (): DOMOutputSpec => ['br'] },
  },
  marks: {
    link: {
      attrs: { href: {}, title: { default: null } },
      inclusive: false,
      parseDOM: [{ tag: 'a[href]', getAttrs: (dom) => ({ href: (dom as HTMLElement).getAttribute('href'), title: (dom as HTMLElement).getAttribute('title') }) }],
      toDOM: (mark): DOMOutputSpec => ['a', { href: mark.attrs.href as string, title: mark.attrs.title as string | null }, 0],
    },
    /** `markup` is the delimiter the text was written with (`*` or `_`), written back the same. */
    em: { attrs: { markup: { default: '*' } }, parseDOM: [{ tag: 'em' }, { tag: 'i' }], toDOM: (): DOMOutputSpec => ['em', 0] },
    strong: { attrs: { markup: { default: '**' } }, parseDOM: [{ tag: 'strong' }, { tag: 'b' }], toDOM: (): DOMOutputSpec => ['strong', 0] },
    strike: { parseDOM: [{ tag: 's' }, { tag: 'del' }], toDOM: (): DOMOutputSpec => ['s', 0] },
    code: { excludes: '_', parseDOM: [{ tag: 'code' }], toDOM: (): DOMOutputSpec => ['code', 0] },
    /** Inline HTML (`<u>`, `<br>`) kept as written. */
    raw_inline: { excludes: '_', inclusive: false, toDOM: (): DOMOutputSpec => ['span', { class: 'lin-rich-raw-inline' }, 0] },
  },
});

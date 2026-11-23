// Linear Markdown to the rich editor's document and back. Linear's API reads and writes descriptions only as
// Markdown, so the editor parses it with the same lexer the dashboard renders with (marked, GFM, line breaks) and
// writes Markdown again when it saves. What it does not draw stays as raw Markdown. Pure, no DOM.
import { Marked, type Token, type Tokens } from 'marked';
import { MarkdownSerializer, defaultMarkdownSerializer, type MarkdownSerializerState } from 'prosemirror-markdown';
import type { Mark, Node } from 'prosemirror-model';
import { schema } from './schema.ts';

const lexer = new Marked({ gfm: true, breaks: true });

const FENCE = /^\s{0,3}(`{3,}|~{3,})/;
/** Linear's collapsible section: `+++ Title`, its content, then `+++` on its own line. */
const SECTION_OPEN = /^\+\+\+(\s|$)/;
const SECTION_CLOSE = /^\+\+\+\s*$/;

type Chunk = { raw: boolean; text: string };

/** Splits out Linear's collapsible sections, which marked does not know, so they stay exactly as written. */
export const splitSections = (source: string): Chunk[] => {
  const lines = source.split('\n');
  const chunks: Chunk[] = [];
  let plain: string[] = [];
  let fence: string | null = null;
  const flush = () => { if (plain.length) chunks.push({ raw: false, text: plain.join('\n') }); plain = []; };
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]!;
    const opener = line.match(FENCE)?.[1];
    if (fence) {
      if (opener && opener[0] === fence[0] && opener.length >= fence.length) fence = null;
      plain.push(line);
      continue;
    }
    if (opener) { fence = opener; plain.push(line); continue; }
    if (SECTION_OPEN.test(line)) {
      const end = lines.findIndex((l, j) => j > i && SECTION_CLOSE.test(l));
      if (end > i) {
        flush();
        chunks.push({ raw: true, text: lines.slice(i, end + 1).join('\n') });
        i = end;
        continue;
      }
    }
    plain.push(line);
  }
  flush();
  return chunks;
};

const raw = (markdown: string): Node => schema.nodes.raw!.create({ markdown: markdown.replace(/\n+$/, '') });
const paragraph = (content: Node[] = []): Node => schema.nodes.paragraph!.create(null, content);

const inline = (tokens: Token[] | undefined, marks: readonly Mark[] = []): Node[] => {
  const out: Node[] = [];
  const text = (value: string, extra: readonly Mark[] = marks) => { if (value) out.push(schema.text(value, extra)); };
  for (const token of tokens ?? []) {
    switch (token.type) {
      case 'text': {
        const t = token as Tokens.Text;
        if (t.tokens?.length) out.push(...inline(t.tokens, marks)); else text(t.text);
        break;
      }
      case 'escape': text((token as Tokens.Escape).text); break;
      case 'strong': out.push(...inline((token as Tokens.Strong).tokens, schema.marks.strong!.create({ markup: token.raw.startsWith('__') ? '__' : '**' }).addToSet(marks))); break;
      case 'em': out.push(...inline((token as Tokens.Em).tokens, schema.marks.em!.create({ markup: token.raw.startsWith('_') ? '_' : '*' }).addToSet(marks))); break;
      case 'del': out.push(...inline((token as Tokens.Del).tokens, schema.marks.strike!.create().addToSet(marks))); break;
      case 'codespan': text((token as Tokens.Codespan).text, schema.marks.code!.create().addToSet(marks)); break;
      case 'link': {
        const t = token as Tokens.Link;
        out.push(...inline(t.tokens, schema.marks.link!.create({ href: t.href, title: t.title ?? null }).addToSet(marks)));
        break;
      }
      case 'image': {
        const t = token as Tokens.Image;
        out.push(schema.nodes.image!.create({ src: t.href, alt: t.text || null, title: t.title ?? null }));
        break;
      }
      case 'br': out.push(schema.nodes.hard_break!.create()); break;
      case 'checkbox': break;
      default: text(token.raw, schema.marks.raw_inline!.create().addToSet(marks));
    }
  }
  return out;
};

const blocks = (tokens: Token[]): Node[] => {
  const out: Node[] = [];
  for (const token of tokens) {
    switch (token.type) {
      case 'space': break;
      case 'paragraph': out.push(paragraph(inline((token as Tokens.Paragraph).tokens))); break;
      case 'text': {
        const t = token as Tokens.Text;
        out.push(paragraph(inline(t.tokens?.length ? t.tokens : [{ type: 'text', raw: t.text, text: t.text } as Tokens.Text])));
        break;
      }
      case 'heading': {
        const t = token as Tokens.Heading;
        out.push(schema.nodes.heading!.create({ level: t.depth }, inline(t.tokens)));
        break;
      }
      case 'code': {
        const t = token as Tokens.Code;
        // An indented code block has no fence to write back, so it stays as written.
        if (t.codeBlockStyle === 'indented') { out.push(raw(t.raw)); break; }
        out.push(schema.nodes.code_block!.create({ params: t.lang ?? '' }, t.text ? schema.text(t.text) : null));
        break;
      }
      case 'hr': out.push(schema.nodes.horizontal_rule!.create()); break;
      case 'blockquote': {
        const inner = blocks((token as Tokens.Blockquote).tokens);
        out.push(schema.nodes.blockquote!.create(null, inner.length ? inner : [paragraph()]));
        break;
      }
      case 'list': {
        const t = token as Tokens.List;
        const items = t.items.map((item) => {
          const inner = blocks(item.tokens.filter((x) => x.type !== 'checkbox'));
          if (inner[0]?.type !== schema.nodes.paragraph) inner.unshift(paragraph());
          return schema.nodes.list_item!.create({ checked: item.task ? Boolean(item.checked) : null }, inner);
        });
        const tight = !t.loose;
        out.push(t.ordered
          ? schema.nodes.ordered_list!.create({ order: typeof t.start === 'number' ? t.start : 1, tight }, items)
          : schema.nodes.bullet_list!.create({ tight, bullet: t.raw.trimStart()[0] ?? '-' }, items));
        break;
      }
      // Tables, HTML blocks, link definitions and anything newer: kept as written.
      default: out.push(raw(token.raw));
    }
  }
  return out;
};

/** A description as the editor's document. An empty description is one empty paragraph. */
export const parseMarkdown = (source: string): Node => {
  const content = splitSections(source.replace(/\r\n?/g, '\n')).flatMap((chunk) => (chunk.raw ? [raw(chunk.text)] : blocks(lexer.lexer(chunk.text))));
  return schema.nodes.doc!.create(null, content.length ? content : [paragraph()]);
};

const nodes = defaultMarkdownSerializer.nodes;

/** A link whose text is its own address, written bare as Linear writes it, not as `<url>`. */
const isBare = (mark: Mark, parent: Node, index: number): boolean => {
  const child = parent.child(index);
  const href = mark.attrs.href as string;
  return /^https?:\/\//i.test(href) && child.isText && child.text === href && child.marks.length === 1
    && (index === parent.childCount - 1 || !mark.isInSet(parent.child(index + 1).marks));
};

const serializer = new MarkdownSerializer({
  ...nodes,
  bullet_list: (state, node) => state.renderList(node, '  ', () => `${(node.attrs.bullet as string) || '-'} `),
  list_item: (state, node) => {
    if (node.attrs.checked !== null) state.write(node.attrs.checked ? '[x] ' : '[ ] ');
    state.renderContent(node);
  },
  // With line breaks on, as Linear reads Markdown, a new line in a paragraph is a break.
  hard_break: (state, node, parent, index) => {
    for (let i = index + 1; i < parent.childCount; i += 1) {
      if (parent.child(i).type !== node.type) { state.write('\n'); return; }
    }
  },
  raw: (state, node) => {
    state.text(node.attrs.markdown as string, false);
    state.closeBlock(node);
  },
}, {
  em: { open: (_s, mark) => mark.attrs.markup as string, close: (_s, mark) => mark.attrs.markup as string, mixable: true, expelEnclosingWhitespace: true },
  strong: { open: (_s, mark) => mark.attrs.markup as string, close: (_s, mark) => mark.attrs.markup as string, mixable: true, expelEnclosingWhitespace: true },
  strike: { open: '~~', close: '~~', mixable: true, expelEnclosingWhitespace: true },
  code: defaultMarkdownSerializer.marks.code!,
  link: {
    open: (state: MarkdownSerializerState & { inAutolink?: boolean }, mark, parent, index) => {
      state.inAutolink = isBare(mark, parent, index);
      return state.inAutolink ? '' : '[';
    },
    close: (state: MarkdownSerializerState & { inAutolink?: boolean }, mark) => {
      const bare = state.inAutolink;
      state.inAutolink = undefined;
      const href = (mark.attrs.href as string).replace(/[()"]/g, '\\$&');
      return bare ? '' : `](${href}${mark.attrs.title ? ` "${(mark.attrs.title as string).replace(/"/g, '\\"')}"` : ''})`;
    },
    mixable: true,
  },
  raw_inline: { open: '', close: '', escape: false },
}, { hardBreakNodeName: 'hard_break', strict: false });

/** The document as Markdown for Linear, with no trailing blank lines. */
export const serializeMarkdown = (doc: Node): string => serializer.serialize(doc, { tightLists: false }).replace(/\n+$/, '');

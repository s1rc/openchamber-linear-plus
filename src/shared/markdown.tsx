// Linear markdown, sanitized. Links open through the host, since a sandboxed frame cannot navigate;
// links to Linear issues become key chips that open the issue in the dashboard. Task list items draw Linear's
// boxes, which tick when the caller can save the change.
import DOMPurify from 'dompurify';
import { Marked } from 'marked';
import { useMemo } from 'preact/hooks';
import { host } from './host.ts';
import { taskMarkers } from './tasks.ts';

const ISSUE_LINK = /^https:\/\/linear\.app\/[^/]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i;
const CHANGE_LINK = /\/-\/merge_requests\/(\d+)|github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/;

// The sanitizer drops every input, so a task's box is a span, numbered and given its role after sanitizing.
const marked = new Marked({ gfm: true, breaks: true, renderer: { checkbox: ({ checked }) => `<span data-task-box="${checked ? 'x' : ''}"></span>` } });

export const toHtml = (source: string): { html: string; tasks: number } => {
  const html = marked.parse(source, { async: false }) as string;
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ['style', 'form', 'input'], FORBID_ATTR: ['style'] });
  const template = document.createElement('template');
  template.innerHTML = clean;
  for (const link of template.content.querySelectorAll('a')) {
    const href = link.getAttribute('href') ?? '';
    const issue = href.match(ISSUE_LINK)?.[1]?.toUpperCase();
    const bare = link.textContent?.trim() === href || link.textContent?.trim().toUpperCase() === issue;
    if (issue) {
      link.dataset.issue = issue;
      link.classList.add('lin-mention');
      if (bare) link.textContent = issue;
    } else if (CHANGE_LINK.test(href) && bare) {
      const [, mr, pr] = href.match(CHANGE_LINK) ?? [];
      link.textContent = mr ? `MR !${mr}` : `PR #${pr}`;
    }
  }
  const boxes = [...template.content.querySelectorAll<HTMLElement>('span[data-task-box]')];
  boxes.forEach((box, index) => {
    const checked = box.dataset.taskBox === 'x';
    box.dataset.task = String(index);
    box.className = 'lin-task-box';
    box.setAttribute('role', 'checkbox');
    box.setAttribute('aria-checked', checked ? 'true' : 'false');
    const item = box.closest('li');
    item?.classList.add('lin-task');
    if (checked) item?.classList.add('lin-task--done');
    item?.parentElement?.classList.add('lin-task-list');
  });
  return { html: template.innerHTML, tasks: boxes.length };
};

type Props = {
  source: string | null | undefined;
  empty?: string;
  /** Opens a mentioned Linear issue in the dashboard; without it the link opens in Linear. */
  onOpenIssue?: (identifier: string) => void;
  /** Ticks or clears task box `index` (in document order). Without it the boxes are read-only. */
  onToggleTask?: (index: number, checked: boolean) => void;
};

export const Markdown = ({ source, empty, onOpenIssue, onToggleTask }: Props) => {
  const rendered = useMemo(() => (source?.trim() ? toHtml(source) : { html: '', tasks: 0 }), [source]);
  // A box only ticks when the source has the same boxes marked drew, so a click never changes the wrong line.
  const toggles = Boolean(onToggleTask) && rendered.tasks > 0 && taskMarkers(source ?? '').length === rendered.tasks;
  const html = useMemo(() => (toggles ? rendered.html.replace(/role="checkbox"/g, 'role="checkbox" tabindex="0"') : rendered.html), [rendered, toggles]);
  if (!html) return empty ? <div class="sui-muted sui-small">{empty}</div> : null;
  const toggle = (box: HTMLElement) => {
    if (!toggles) return;
    onToggleTask!(Number(box.dataset.task), box.getAttribute('aria-checked') !== 'true');
  };
  const onKeyDown = (event: KeyboardEvent) => {
    const box = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-task]');
    if (!box || (event.key !== ' ' && event.key !== 'Enter')) return;
    event.preventDefault();
    toggle(box);
  };
  const onClick = (event: MouseEvent) => {
    const box = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-task]');
    if (box) { toggle(box); return; }
    const link = (event.target as HTMLElement | null)?.closest('a');
    if (!link) return;
    event.preventDefault();
    if (link.dataset.issue && onOpenIssue) { onOpenIssue(link.dataset.issue); return; }
    const href = link.getAttribute('href') ?? '';
    if (/^https?:\/\//i.test(href)) void host.openUrl(href);
  };
  return <div class={toggles ? 'lin-md lin-md--tasks' : 'lin-md'} onClick={onClick} onKeyDown={onKeyDown} dangerouslySetInnerHTML={{ __html: html }} />;
};

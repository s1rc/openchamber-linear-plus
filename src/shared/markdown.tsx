// Linear markdown, sanitized. Links open through the host, since a sandboxed frame cannot navigate;
// links to Linear issues become key chips that open the issue in the dashboard.
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useMemo } from 'preact/hooks';
import { host } from './host.ts';

const ISSUE_LINK = /^https:\/\/linear\.app\/[^/]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i;
const CHANGE_LINK = /\/-\/merge_requests\/(\d+)|github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/;

const toHtml = (source: string): string => {
  const html = marked.parse(source, { async: false, gfm: true, breaks: true }) as string;
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
  return template.innerHTML;
};

type Props = {
  source: string | null | undefined;
  empty?: string;
  /** Opens a mentioned Linear issue in the dashboard; without it the link opens in Linear. */
  onOpenIssue?: (identifier: string) => void;
};

export const Markdown = ({ source, empty, onOpenIssue }: Props) => {
  const html = useMemo(() => (source?.trim() ? toHtml(source) : ''), [source]);
  if (!html) return empty ? <div class="sui-muted sui-small">{empty}</div> : null;
  const onClick = (event: MouseEvent) => {
    const link = (event.target as HTMLElement | null)?.closest('a');
    if (!link) return;
    event.preventDefault();
    if (link.dataset.issue && onOpenIssue) { onOpenIssue(link.dataset.issue); return; }
    const href = link.getAttribute('href') ?? '';
    if (/^https?:\/\//i.test(href)) void host.openUrl(href);
  };
  return <div class="lin-md" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
};

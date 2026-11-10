// Dates and numbers as Linear shows them.

const DAY = 86_400_000;

/** "Nov 20" this year, "Nov 20, 2027" otherwise. Takes a date (YYYY-MM-DD) or a timestamp. */
export const shortDate = (value: string | null | undefined, now = new Date()): string => {
  if (!value) return '';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const sameYear = date.getFullYear() === now.getFullYear();
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', ...(sameYear ? {} : { year: 'numeric' }) });
};

/** Whole days from today until a date (YYYY-MM-DD); negative when it has passed. */
export const daysUntil = (value: string | null | undefined, now = new Date()): number | null => {
  if (!value) return null;
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value);
  if (Number.isNaN(date.getTime())) return null;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((date.getTime() - today) / DAY);
};

/** "3m ago", "5h ago", "2d ago", then a short date. */
export const relativeTime = (value: string | null | undefined, now = Date.now()): string => {
  if (!value) return '';
  const at = new Date(value).getTime();
  if (Number.isNaN(at)) return '';
  const minutes = Math.max(0, Math.round((now - at) / 60_000));
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return shortDate(value, new Date(now));
};

export const percent = (fraction: number) => `${Math.floor(Math.max(0, Math.min(1, fraction)) * 100)}%`;

export const HEALTH_LABEL = { onTrack: 'On track', atRisk: 'At risk', offTrack: 'Off track' } as const;
export const HEALTH_TONE = { onTrack: 'success', atRisk: 'warning', offTrack: 'error' } as const;

const TSHIRT: Record<number, string> = { 0: '0', 1: 'XS', 2: 'S', 3: 'M', 5: 'L', 8: 'XL', 13: 'XXL', 21: 'XXXL' };

/** An estimate the way the team writes it: T-shirt sizes, or points. */
export const estimateLabel = (estimate: number | null | undefined, type: string | undefined): string | null => {
  if (estimate === null || estimate === undefined || type === 'notUsed') return null;
  if (type === 'tShirt') return TSHIRT[estimate] ?? String(estimate);
  return String(estimate);
};

export type ChangeStatus = 'open' | 'merged' | 'closed' | 'draft' | null;
export type Change = { label: string; status: ChangeStatus; url: string; title: string };

/** A merge or pull request linked to an issue: "!3385" on GitLab, "#42" on GitHub. */
export const changeOf = (attachment: { url: string; title: string; metadata?: Record<string, unknown> | null }): Change | null => {
  const gitlab = attachment.url.match(/\/-\/merge_requests\/(\d+)/);
  const github = attachment.url.match(/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/);
  const number = gitlab?.[1] ?? github?.[1];
  if (!number) return null;
  const meta = attachment.metadata ?? {};
  const raw = String(meta.status ?? meta.state ?? '').toLowerCase();
  const draft = meta.draft === true || meta.isDraft === true || raw === 'draft';
  const status: ChangeStatus = draft ? 'draft'
    : raw === 'merged' ? 'merged'
      : raw === 'closed' ? 'closed'
        : raw === 'open' || raw === 'opened' || raw === 'approved' || raw === 'reviewing' ? 'open' : null;
  return { label: `${gitlab ? '!' : '#'}${number}`, status, url: attachment.url, title: attachment.title };
};

/** SLA time left as Linear writes it: "3w", "10d", "5h". Past the breach time it is negative and `overdue`. */
export const slaLabel = (breachesAt: string | null | undefined, now = Date.now()): { text: string; overdue: boolean } | null => {
  if (!breachesAt) return null;
  const at = new Date(breachesAt).getTime();
  if (Number.isNaN(at)) return null;
  const overdue = at < now;
  const minutes = Math.round(Math.abs(at - now) / 60_000);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const text = minutes < 60 ? `${Math.max(1, minutes)}m` : hours < 24 ? `${hours}h` : days < 14 ? `${days}d` : `${Math.round(days / 7)}w`;
  return { text: overdue ? `-${text}` : text, overdue };
};

/** Revenue as Linear abbreviates it: $950, $12k, $1.4M. */
export const compactMoney = (amount: number): string => {
  const abs = Math.abs(amount);
  const trim = (n: number) => String(Math.round(n * 10) / 10).replace(/\.0$/, '');
  if (abs >= 1_000_000) return `$${trim(amount / 1_000_000)}M`;
  if (abs >= 1_000) return `$${trim(amount / 1_000)}k`;
  return `$${Math.round(amount)}`;
};

/** How long ago, in one unit: "5m", "3h", "9d", "6w". For time in status. */
export const sinceLabel = (iso: string | null | undefined, now = Date.now()): string | null => {
  const at = iso ? new Date(iso).getTime() : NaN;
  if (Number.isNaN(at)) return null;
  const minutes = Math.max(0, Math.round((now - at) / 60_000));
  if (minutes < 60) return `${Math.max(1, minutes)}m`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.round(hours / 24);
  return days < 14 ? `${days}d` : `${Math.round(days / 7)}w`;
};

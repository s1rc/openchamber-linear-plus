// Line icons for the sidebar, drawn in the text color at 16 px, in the spirit of Linear's.
import type { ComponentChildren } from 'preact';

const Icon = ({ children }: { children: ComponentChildren }) => (
  <svg class="lin-nav-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{children}</svg>
);

export const NAV_ICONS: Record<string, () => preact.JSX.Element> = {
  inbox: () => <Icon><path d="M2.5 9.5 4 3.5h8l1.5 6v3h-11z" /><path d="M2.5 9.5h3.2l.8 1.5h3l.8-1.5h3.2" /></Icon>,
  'my-issues': () => <Icon><circle cx="8" cy="8" r="5.5" stroke-dasharray="2.2 1.6" /><circle cx="8" cy="8" r="1.6" /></Icon>,
  project: () => <Icon><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" /><rect x="9" y="9" width="4.5" height="4.5" rx="1" /></Icon>,
  issues: () => <Icon><rect x="2.5" y="4.5" width="9" height="9" rx="2" /><path d="M5 2.5h6.5a2 2 0 0 1 2 2V11" /></Icon>,
  board: () => <Icon><rect x="2.5" y="2.5" width="11" height="11" rx="2" /><path d="M6.2 2.5v11M9.8 2.5v11" /></Icon>,
  projects: () => <Icon><path d="M8 1.8 13.5 5v6L8 14.2 2.5 11V5z" /><path d="M2.5 5 8 8.2 13.5 5M8 8.2v6" /></Icon>,
  cycles: () => <Icon><path d="M13 8a5 5 0 1 1-1.5-3.6" /><path d="M13 2.8v2.4h-2.4" /></Icon>,
  home: () => <Icon><path d="M2.5 7 8 2.5 13.5 7v6.5h-3.7v-4H6.2v4H2.5z" /></Icon>,
  triage: () => <Icon><circle cx="8" cy="8" r="5.5" /><path d="M5 8h6M6.5 6.5 5 8l1.5 1.5M9.5 6.5 11 8l-1.5 1.5" /></Icon>,
  views: () => <Icon><path d="M8 2.5 13.5 5.3 8 8.1 2.5 5.3z" /><path d="M2.5 8.2 8 11l5.5-2.8M2.5 11 8 13.8l5.5-2.8" /></Icon>,
  settings: () => <Icon><circle cx="8" cy="8" r="2" /><path d="M8 1.8v1.7M8 12.5v1.7M1.8 8h1.7M12.5 8h1.7M3.6 3.6l1.2 1.2M11.2 11.2l1.2 1.2M3.6 12.4l1.2-1.2M11.2 4.8l1.2-1.2" /></Icon>,
};

export const Chevron = ({ open }: { open: boolean }) => (
  <svg class="lin-nav-chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
    <path d="M2 3.5h6L5 7z" fill="currentColor" />
  </svg>
);

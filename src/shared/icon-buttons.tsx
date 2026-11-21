// Round icon buttons, as Linear shows them beside an issue: copy link, copy ID, copy branch name.
// The kit's Button has no icon, so these are local, with the label as tooltip and accessible name.
// Shapes are Remix icons (link, git-branch, external-link), as the host draws them.
import { toast } from '@openchamber-ext/shared-ui';
import type { ComponentChildren } from 'preact';
import { host } from './host.ts';

const svg = { width: 16, height: 16, viewBox: '0 0 24 24', 'aria-hidden': true } as const;

export const LinkIcon = () => (
  <svg {...svg}><path fill="currentColor" d="M18.3638 15.5355L16.9496 14.1213L18.3638 12.7071C20.3164 10.7545 20.3164 7.58866 18.3638 5.63604C16.4112 3.68341 13.2453 3.68341 11.2927 5.63604L9.87849 7.05025L8.46428 5.63604L9.87849 4.22182C12.6122 1.48815 17.0443 1.48815 19.778 4.22182C22.5117 6.95549 22.5117 11.3876 19.778 14.1213L18.3638 15.5355ZM15.5353 18.364L14.1211 19.7782C11.3875 22.5118 6.95531 22.5118 4.22164 19.7782C1.48797 17.0445 1.48797 12.6123 4.22164 9.87868L5.63585 8.46446L7.05007 9.87868L5.63585 11.2929C3.68323 13.2455 3.68323 16.4113 5.63585 18.364C7.58847 20.3166 10.7543 20.3166 12.7069 18.364L14.1211 16.9497L15.5353 18.364ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z" /></svg>
);

export const IdIcon = () => (
  <svg {...svg} fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 3.5h10.5a2 2 0 0 1 2 2V16" />
    <rect x="3.5" y="7.5" width="13" height="13" rx="2" />
    <path d="M7.5 11v6M10.5 11h1.2a3 3 0 0 1 0 6h-1.2z" />
  </svg>
);

export const BranchIcon = () => (
  <svg {...svg}><path fill="currentColor" d="M7.10508 15.2101C8.21506 15.6501 9 16.7334 9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.6938 3.83481 15.5825 5 15.1707V8.82929C3.83481 8.41746 3 7.30622 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6C9 7.30622 8.16519 8.41746 7 8.82929V11.9996C7.83566 11.3719 8.87439 11 10 11H14C15.3835 11 16.5482 10.0635 16.8949 8.78991C15.7849 8.34988 15 7.26661 15 6C15 4.34315 16.3431 3 18 3C19.6569 3 21 4.34315 21 6C21 7.3332 20.1303 8.46329 18.9274 8.85392C18.5222 11.2085 16.4703 13 14 13H10C8.61653 13 7.45179 13.9365 7.10508 15.2101ZM6 17C5.44772 17 5 17.4477 5 18C5 18.5523 5.44772 19 6 19C6.55228 19 7 18.5523 7 18C7 17.4477 6.55228 17 6 17ZM6 5C5.44772 5 5 5.44772 5 6C5 6.55228 5.44772 7 6 7C6.55228 7 7 6.55228 7 6C7 5.44772 6.55228 5 6 5ZM18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" /></svg>
);

export const ExternalIcon = () => (
  <svg {...svg}><path fill="currentColor" d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z" /></svg>
);

export const IconButton = ({ label, onClick, children }: { label: string; onClick: () => void; children: ComponentChildren }) => (
  <button type="button" class="lin-icon-btn" aria-label={label} title={label} onClick={onClick}>{children}</button>
);

/** Copies through the host (a sandboxed frame has no clipboard of its own) and says so in a toast. */
export const copyText = async (text: string, what: string) => {
  try {
    await host.writeClipboard(text);
    await toast(host, 'success', `Copied ${what}`);
  } catch {
    await toast(host, 'error', `Could not copy ${what}`);
  }
};

type Copyable = { identifier: string; url: string; branchName?: string | null };

/** Copy link, copy ID, and copy branch name when the issue has one. */
export const CopyButtons = ({ issue }: { issue: Copyable }) => (
  <span class="lin-icon-row">
    <IconButton label="Copy link" onClick={() => { void copyText(issue.url, 'the link'); }}><LinkIcon /></IconButton>
    <IconButton label={`Copy ID (${issue.identifier})`} onClick={() => { void copyText(issue.identifier, issue.identifier); }}><IdIcon /></IconButton>
    {issue.branchName && <IconButton label="Copy branch name" onClick={() => { void copyText(issue.branchName!, 'the branch name'); }}><BranchIcon /></IconButton>}
  </span>
);

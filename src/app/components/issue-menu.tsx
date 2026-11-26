// The right-click menu on an issue row or card, laid out as Linear's: properties, relations, conversion,
// personal actions and delete. Submenus fly out beside the menu; where the frame is too narrow for that
// (the rail panel) they open in its place with a Back row. A property saves on choice, shown at once.
import { toast } from '@openchamber-ext/shared-ui';
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { Avatar, CycleGlyph, EstimateGlyph, MilestoneGlyph, PriorityGlyph, ProjectIcon, StatusGlyph } from '../../shared/glyphs.tsx';
import { host } from '../../shared/host.ts';
import { copyText, ExternalIcon } from '../../shared/icon-buttons.tsx';
import { filterItems, isShortcut, issueMenu, type GlyphName, type MenuAction, type MenuIcon, type MenuItem } from '../../shared/issue-menu.ts';
import { estimateScale } from '../../shared/moves.ts';
import { useProjectMilestones, useTeamProjects } from '../../shared/projects.ts';
import { useOpenCycles, useTeamPeople } from '../../shared/team-data.ts';
import type { IssueRow } from '../../shared/types.ts';
import { useWorkspace } from '../../shared/workspace.ts';
import { deleteIssueRelation, remindIssue, toggleFavorite, updateIssue, writeErrorText } from '../../shared/writes.ts';

const MENU_W = 236;
const SUB_W = 240;
const EDGE = 6;

const svg = { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': true } as const;

const GLYPHS: Record<GlyphName, () => preact.JSX.Element> = {
  status: () => <svg {...svg}><circle cx="8" cy="8" r="5.5" /><path d="M8 2.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" /></svg>,
  priority: () => <PriorityGlyph priority={2} />,
  assignee: () => <svg {...svg}><circle cx="8" cy="5.5" r="2.5" /><path d="M3 13.5c.6-2.6 2.6-4 5-4s4.4 1.4 5 4" /></svg>,
  due: () => <svg {...svg}><rect x="2.5" y="3.5" width="11" height="10" rx="2" /><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" /></svg>,
  labels: () => <svg {...svg}><path d="M2.5 3.5v4l6 6 5-5-6-6h-4z" /><circle cx="5.5" cy="5.5" r="0.8" fill="currentColor" /></svg>,
  project: () => <ProjectIcon icon={null} color={null} size={14} />,
  milestone: () => <MilestoneGlyph size={14} />,
  estimate: () => <EstimateGlyph size={14} />,
  cycle: () => <CycleGlyph size={14} />,
  copy: () => <svg {...svg}><rect x="5" y="2.5" width="8.5" height="10" rx="1.5" /><path d="M3 5v8a1.5 1.5 0 0 0 1.5 1.5H10" /></svg>,
  open: () => <svg {...svg}><rect x="2.5" y="2.5" width="11" height="11" rx="2" /><path d="M9.5 2.5v11" /></svg>,
  external: () => <span class="lin-menu-ext"><ExternalIcon /></span>,
  delete: () => <svg {...svg}><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.7 9h5.6l.7-9" /></svg>,
  none: () => <svg {...svg} stroke-dasharray="2 2"><circle cx="8" cy="8" r="5.5" /></svg>,
  more: () => <svg {...svg}><circle cx="4" cy="4" r="1" /><circle cx="4" cy="8" r="1" /><circle cx="4" cy="12" r="1" /><path d="M8 4h5M8 8h5M8 12h5" /></svg>,
  related: () => <svg {...svg}><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" /><path d="M6 6l4 4M10 4h3v3" /></svg>,
  mark: () => <svg {...svg}><path d="M4 14V2.5h8l-1.5 3L12 8.5H4" /></svg>,
  remove: () => <svg {...svg}><path d="M3 3l10 10M13 3L3 13" /><rect x="2" y="2" width="12" height="12" rx="2" /></svg>,
  convert: () => <svg {...svg}><path d="M3 5h8M8.5 2.5 11 5 8.5 7.5M13 11H5M7.5 8.5 5 11l2.5 2.5" /></svg>,
  favorite: () => <svg {...svg}><path d="m8 2 1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.4l-3.6 1.9.7-4.1-3-2.9 4.1-.6z" /></svg>,
  reminder: () => <svg {...svg}><circle cx="8" cy="8.5" r="5.5" /><path d="M8 5v3.5l2.5 1.5M5 1.5 2.5 4M11 1.5 13.5 4" /></svg>,
  rename: () => <svg {...svg}><path d="m3 10-.5 3.5L6 13l7.5-7.5-3-3zM9.5 3.5l3 3" /></svg>,
};

const Icon = ({ icon }: { icon: MenuIcon | undefined }) => {
  if (!icon) return <span class="lin-menu-icon" />;
  const inner = icon.kind === 'state' ? <StatusGlyph type={icon.state.type} color={icon.state.color} teamId={icon.teamId} stateId={icon.state.id} />
    : icon.kind === 'priority' ? <PriorityGlyph priority={icon.priority} />
    : icon.kind === 'person' ? <Avatar name={icon.name} url={icon.url} size={16} />
    : icon.kind === 'swatch' ? <span class="lin-swatch" style={{ background: icon.color }} />
    : icon.kind === 'project' ? <ProjectIcon icon={icon.icon} color={icon.color} size={14} />
    : GLYPHS[icon.name]();
  return <span class="lin-menu-icon">{inner}</span>;
};

/** Today as YYYY-MM-DD in the user's own time zone. */
const localToday = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

type Props = {
  issue: IssueRow;
  /** Where the click was, in the frame's viewport. */
  x: number;
  y: number;
  onClose: () => void;
  onOpen: (issue: IssueRow) => void;
  onDelete: (issue: IssueRow) => void;
  onAction: (issue: IssueRow, action: MenuAction) => void;
};

export const IssueMenu = ({ issue, x, y, onClose, onOpen, onDelete, onAction }: Props) => {
  const workspace = useWorkspace();
  const team = workspace.data?.teamsById.get(issue.team.id);
  const people = useTeamPeople(issue.team.id);
  const projects = useTeamProjects([issue.team.id]);
  const milestones = useProjectMilestones(issue.project?.id ?? null);
  const cycles = useOpenCycles(team?.cyclesEnabled ? issue.team.id : null, team?.activeCycle?.number);
  const sections = issueMenu(issue, {
    states: workspace.data?.statesByTeam.get(issue.team.id) ?? [],
    team,
    estimates: estimateScale(team),
    members: people.data?.members,
    labels: people.data?.labels,
    projects: projects.data,
    milestones: issue.project ? milestones.data : [],
    cycles: team?.cyclesEnabled ? cycles.data : [],
    today: localToday(),
    now: new Date(),
  });
  const items = sections.flat();

  const menu = useRef<HTMLDivElement>(null);
  const subMenu = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const [pos, setPos] = useState({ left: Math.max(EDGE, Math.min(x, window.innerWidth - MENU_W - EDGE)), top: y });
  const [openId, setOpenId] = useState<string | null>(null);
  const [subTop, setSubTop] = useState(0);
  const [query, setQuery] = useState('');
  // Keyboard focus: the row under the cursor in the menu, and in the open submenu when `inSub`.
  const [active, setActive] = useState(-1);
  const [subActive, setSubActive] = useState(-1);
  const [inSub, setInSub] = useState(false);

  // Too narrow to fly out on either side: the submenu takes the menu's place.
  const drill = pos.left + MENU_W + SUB_W > window.innerWidth - EDGE && pos.left - SUB_W < EDGE;
  const flyLeft = !drill && pos.left + MENU_W + SUB_W > window.innerWidth - EDGE;
  const parent = items.find((i) => i.id === openId && i.children);
  const subItems = parent ? filterItems(parent.children ?? [], query) : [];

  useLayoutEffect(() => {
    const box = menu.current?.getBoundingClientRect();
    if (!box) return;
    const top = Math.max(EDGE, Math.min(y, window.innerHeight - box.height - EDGE));
    if (top !== pos.top) setPos((p) => ({ ...p, top }));
  }, [openId, drill]);

  const openSub = (item: MenuItem, row: HTMLElement | null, byKey: boolean) => {
    if (!item.children) return;
    setOpenId(item.id);
    setQuery('');
    setSubActive(byKey ? 0 : -1);
    setInSub(byKey || drill);
    const box = row?.getBoundingClientRect();
    if (box) setSubTop(box.top - 5);
    if (item.searchable) setTimeout(() => search.current?.focus(), 0);
  };
  const closeSub = () => { setOpenId(null); setInSub(false); setQuery(''); };

  const run = (item: MenuItem) => {
    const action = item.action;
    if (!action) return;
    if (action.kind === 'change') {
      void updateIssue(issue, action.change).catch((error: unknown) => toast(host, 'error', writeErrorText(error)));
      if (item.keepOpen) return;
    }
    if (action.kind === 'copy') void copyText(action.text, action.what);
    if (action.kind === 'open') onOpen(issue);
    if (action.kind === 'open-linear') void host.openUrl(issue.url);
    if (action.kind === 'favorite') {
      void toggleFavorite(issue)
        .then((favorite) => toast(host, 'success', favorite ? `Added ${issue.identifier} to favorites` : `Removed ${issue.identifier} from favorites`))
        .catch((error: unknown) => toast(host, 'error', writeErrorText(error)));
    }
    if (action.kind === 'reminder') {
      void remindIssue(issue, action.at)
        .then(() => toast(host, 'success', `Reminder set for ${new Date(action.at).toLocaleString()}`))
        .catch((error: unknown) => toast(host, 'error', writeErrorText(error)));
    }
    if (action.kind === 'prompt' || action.kind === 'relation') onAction(issue, action);
    if (action.kind === 'delete-relation') {
      void deleteIssueRelation(issue, action.other, action.relationId)
        .then(() => toast(host, 'success', `Removed relation with ${action.other.identifier}`))
        .catch((error: unknown) => toast(host, 'error', writeErrorText(error)));
    }
    if (action.kind === 'delete') onDelete(issue);
    onClose();
  };
  const choose = (item: MenuItem, row: HTMLElement | null, byKey = false) => (item.children ? openSub(item, row, byKey) : run(item));

  const rowOf = (id: string) => menu.current?.ownerDocument.querySelector<HTMLElement>(`[data-menu-item="${CSS.escape(id)}"]`) ?? null;

  // Anchor after the main menu has settled, and fit the submenu's real height, not its 320 px maximum.
  useLayoutEffect(() => {
    if (!openId) return;
    const anchor = rowOf(openId);
    if (!anchor) return;
    const height = subMenu.current?.getBoundingClientRect().height ?? 320;
    const wanted = anchor.getBoundingClientRect().top - 5;
    const top = Math.max(EDGE, Math.min(wanted, window.innerHeight - height - EDGE));
    if (top !== subTop) setSubTop(top);
  }, [openId, drill, pos.left, pos.top, query, subItems.length]);

  // The listener stays the same while the handler is replaced on every render, so a key pressed just after a
  // change (a submenu opening) already sees it.
  const keys = useRef<(event: KeyboardEvent) => void>(() => undefined);
  keys.current = (event: KeyboardEvent) => {
    // The menu has the keys while it is open: nothing reaches the list's shortcuts or the issue pane's Escape.
    event.stopPropagation();
    const inSearch = event.target === search.current;
    if (event.key === 'Escape') { event.preventDefault(); if (openId) closeSub(); else onClose(); return; }
    if (event.key === 'Tab') { event.preventDefault(); return; }
    const sub = Boolean(openId) && inSub;
    const list = sub ? subItems : items;
    const at = sub ? subActive : active;
    const set = sub ? setSubActive : setActive;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!list.length) return;
      const step = event.key === 'ArrowDown' ? 1 : -1;
      set(at < 0 ? (step > 0 ? 0 : list.length - 1) : (at + step + list.length) % list.length);
      return;
    }
    if (event.key === 'ArrowLeft' && sub && !(inSearch && query)) { event.preventDefault(); closeSub(); return; }
    if ((event.key === 'ArrowRight' || event.key === 'Enter') && !sub) {
      const item = items[at];
      if (!item || (event.key === 'ArrowRight' && !item.children)) return;
      event.preventDefault();
      choose(item, rowOf(item.id), true);
      return;
    }
    if (event.key === 'Enter' && sub) {
      const item = subItems[Math.max(0, subActive)];
      event.preventDefault();
      if (item) run(item);
      return;
    }
    if (inSearch) return;
    const key = event.code.startsWith('Key') ? event.code.slice(3) : event.key;
    const hit = list.find((i) => isShortcut(i.shortcut, key, event.shiftKey, event.metaKey, event.altKey, event.ctrlKey));
    if (hit) {
      event.preventDefault();
      if (sub) { setSubActive(subItems.indexOf(hit)); run(hit); }
      else { setActive(items.indexOf(hit)); choose(hit, rowOf(hit.id), true); }
      return;
    }
    if (event.metaKey || event.ctrlKey || event.altKey) return;
  };
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => keys.current(event);
    const onResize = () => close.current();
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('resize', onResize);
    window.addEventListener('blur', onResize);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('blur', onResize);
    };
  }, []);

  const row = (item: MenuItem, index: number, sub: boolean) => {
    const focused = sub ? index === subActive && inSub : index === active && !inSub;
    return (
      <button
        type="button"
        role="menuitem"
        class="lin-menu-item"
        key={item.id}
        data-menu-item={item.id}
        data-active={focused || (!sub && item.id === openId) ? 'true' : undefined}
        data-danger={item.danger ? 'true' : undefined}
        aria-haspopup={item.children ? 'menu' : undefined}
        aria-expanded={item.children ? (item.id === openId ? 'true' : 'false') : undefined}
        aria-checked={item.checked === undefined ? undefined : item.checked ? 'true' : 'false'}
        onMouseEnter={(event) => {
          if (sub) { setSubActive(index); setInSub(true); return; }
          setActive(index);
          setInSub(false);
          if (drill) return;
          if (item.children) openSub(item, event.currentTarget as HTMLElement, false); else if (openId) closeSub();
        }}
        onClick={(event) => (sub ? run(item) : choose(item, event.currentTarget as HTMLElement))}
      >
        <Icon icon={item.icon} />
        <span class="lin-menu-label">{item.label}</span>
        {item.checked && <span class="lin-menu-check" aria-hidden="true">✓</span>}
        {item.shortcut && <kbd class="lin-menu-key">{item.shortcut}</kbd>}
        {item.children && <span class="lin-menu-more" aria-hidden="true">›</span>}
      </button>
    );
  };

  const subList = parent && (
    <>
      {parent.searchable && (
        <input
          ref={search}
          class="lin-menu-search"
          placeholder={`${parent.label}...`}
          aria-label={`Filter ${parent.label.toLowerCase()}`}
          value={query}
          onInput={(event) => { setQuery((event.target as HTMLInputElement).value); setSubActive(0); setInSub(true); }}
        />
      )}
      {parent.loading && !subItems.length && <div class="lin-menu-note">Loading</div>}
      {!parent.loading && !subItems.length && <div class="lin-menu-note">{query ? 'No match' : 'Nothing to choose'}</div>}
      <div class="lin-menu-scroll">{subItems.map((item, index) => row(item, index, true))}</div>
    </>
  );

  return (
    <div
      class="lin-menu-layer"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onWheel={onClose}
      onContextMenu={(event) => { event.preventDefault(); onClose(); }}
    >
      <div ref={menu} class="lin-menu" role="menu" aria-label={`${issue.identifier} actions`} style={{ left: `${pos.left}px`, top: `${pos.top}px`, width: `${MENU_W}px` }}>
        {drill && parent ? (
          <>
            <button type="button" class="lin-menu-item lin-menu-back" onClick={closeSub}>
              <span class="lin-menu-icon" aria-hidden="true">‹</span>
              <span class="lin-menu-label">{parent.label}</span>
            </button>
            {subList}
          </>
        ) : sections.map((section, s) => (
          <div class="lin-menu-section" key={s}>
            {section.map((item) => row(item, items.indexOf(item), false))}
          </div>
        ))}
      </div>
      {!drill && parent && (
        <div
          ref={subMenu}
          class="lin-menu lin-menu--sub"
          role="menu"
          aria-label={parent.label}
          style={{
            left: `${flyLeft ? pos.left - SUB_W + 4 : pos.left + MENU_W - 4}px`,
            top: `${subTop}px`,
            width: `${SUB_W}px`,
          }}
        >
          {subList}
        </div>
      )}
    </div>
  );
};

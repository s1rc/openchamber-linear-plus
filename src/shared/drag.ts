// Pure rules for dragging a card with the pointer. Native HTML5 drag-and-drop does not reach a
// sandboxed frame reliably, so the board follows the pointer itself.

/** How far the pointer must travel before a press becomes a drag, so a click still opens the issue. */
export const DRAG_THRESHOLD = 5;

export const movedFar = (dx: number, dy: number): boolean => Math.hypot(dx, dy) >= DRAG_THRESHOLD;

const EDGE = 48;
const MAX_STEP = 18;

/**
 * How far to scroll the board sideways while the pointer is near its left or right edge: negative
 * to the left, positive to the right, faster the closer to the edge, zero in the middle.
 */
export const edgeScroll = (x: number, left: number, right: number): number => {
  if (x < left + EDGE) return -Math.round(MAX_STEP * Math.min(1, (left + EDGE - x) / EDGE));
  if (x > right - EDGE) return Math.round(MAX_STEP * Math.min(1, (x - (right - EDGE)) / EDGE));
  return 0;
};

/** A place a card can be dropped, read from `data-drop-*` attributes. */
export type DropTarget = { id: string; column: string; row: string | null };

export const targetOf = (node: Element | null): DropTarget | null => {
  const zone = node?.closest<HTMLElement>('[data-drop-id]');
  if (!zone) return null;
  return { id: zone.dataset.dropId!, column: zone.dataset.dropColumn!, row: zone.dataset.dropRow || null };
};

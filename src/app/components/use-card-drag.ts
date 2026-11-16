// Drags a board card with the pointer: press and move past a few pixels, a copy of the card follows
// the pointer, the cell under it lights up, and releasing over one calls `onDrop`. Escape cancels.
import { useRef } from 'preact/hooks';
import { DRAG_THRESHOLD, edgeScroll, movedFar, targetOf, type DropTarget } from '../../shared/drag.ts';

type Options = {
  onOver: (id: string | null) => void;
  onDrop: (issueId: string, target: DropTarget) => void;
};

export const useCardDrag = ({ onOver, onDrop }: Options) => {
  const busy = useRef(false);

  /** Pointer-down handler for a card. Mouse and pen only: a finger scrolls the board instead. */
  const start = (issueId: string) => (down: PointerEvent) => {
    if (busy.current || down.button !== 0 || down.pointerType === 'touch') return;
    const card = down.currentTarget as HTMLElement;
    const doc = card.ownerDocument;
    const view = doc.defaultView!;
    const origin = { x: down.clientX, y: down.clientY };
    let ghost: HTMLElement | null = null;
    let target: DropTarget | null = null;
    let pointer = { x: origin.x, y: origin.y };
    let frame = 0;
    busy.current = true;

    const scroller = () => card.closest<HTMLElement>('.lin-board-scroll');

    const at = (x: number, y: number) => {
      const hit = targetOf(doc.elementFromPoint(x, y));
      if (hit?.id !== target?.id) onOver(hit?.id ?? null);
      target = hit;
    };

    const move = (event: PointerEvent) => {
      if (!ghost) {
        if (!movedFar(event.clientX - origin.x, event.clientY - origin.y)) return;
        const box = card.getBoundingClientRect();
        ghost = card.cloneNode(true) as HTMLElement;
        ghost.removeAttribute('data-issue');
        ghost.classList.add('lin-card-ghost');
        ghost.style.width = `${box.width}px`;
        ghost.dataset.grabX = String(origin.x - box.left);
        ghost.dataset.grabY = String(origin.y - box.top);
        doc.body.append(ghost);
        card.dataset.dragging = 'true';
        doc.body.classList.add('lin-dragging');
        try { card.setPointerCapture(down.pointerId); } catch { /* the pointer is already gone */ }
      }
      pointer = { x: event.clientX, y: event.clientY };
      ghost.style.transform = `translate(${pointer.x - Number(ghost.dataset.grabX)}px, ${pointer.y - Number(ghost.dataset.grabY)}px)`;
      at(pointer.x, pointer.y);
    };

    // While the pointer rests near the board's edge the board keeps scrolling, and the cell under
    // the pointer is looked up again as it slides by.
    const scrollLoop = () => {
      frame = view.requestAnimationFrame(scrollLoop);
      const rail = scroller();
      if (!ghost || !rail) return;
      const box = rail.getBoundingClientRect();
      const step = edgeScroll(pointer.x, box.left, box.right);
      if (!step) return;
      rail.scrollLeft += step;
      at(pointer.x, pointer.y);
    };
    frame = view.requestAnimationFrame(scrollLoop);

    const finish = (dropped: boolean) => {
      view.removeEventListener('pointermove', move);
      view.removeEventListener('pointerup', up);
      view.removeEventListener('pointercancel', cancel);
      view.removeEventListener('keydown', key, true);
      view.cancelAnimationFrame(frame);
      const moved = Boolean(ghost);
      ghost?.remove();
      delete card.dataset.dragging;
      doc.body.classList.remove('lin-dragging');
      onOver(null);
      busy.current = false;
      if (moved) {
        // The click that ends a drag must not open the issue.
        const swallow = (event: Event) => { event.stopPropagation(); event.preventDefault(); };
        view.addEventListener('click', swallow, { capture: true, once: true });
        setTimeout(() => view.removeEventListener('click', swallow, true), 0);
      }
      if (moved && dropped && target) onDrop(issueId, target);
    };
    const up = () => finish(true);
    const cancel = () => finish(false);
    const key = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      finish(false);
    };

    view.addEventListener('pointermove', move);
    view.addEventListener('pointerup', up);
    view.addEventListener('pointercancel', cancel);
    view.addEventListener('keydown', key, true);
  };

  return { start, threshold: DRAG_THRESHOLD };
};

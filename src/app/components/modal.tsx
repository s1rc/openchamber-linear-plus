// A dialog over the frame: create issue, start session, move to another team. Escape or the
// backdrop closes it; the first field takes focus.
import { useEffect, useRef } from 'preact/hooks';

type Props = {
  title: string;
  onClose: () => void;
  /** Buttons along the bottom, right-aligned. */
  footer?: preact.ComponentChildren;
  wide?: boolean;
  children: preact.ComponentChildren;
};

export const Modal = ({ title, onClose, footer, wide, children }: Props) => {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      onClose();
    };
    window.addEventListener('keydown', onKey, true);
    // The kit mounts its fields a moment after the dialog; focus the first one then.
    const timer = setTimeout(() => panel.current?.querySelector<HTMLElement>('input, textarea, [role="combobox"], button.oc-sdk-trigger')?.focus(), 30);
    return () => { window.removeEventListener('keydown', onKey, true); clearTimeout(timer); };
  }, []);
  return (
    <div class="lin-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={panel} class={wide ? 'lin-modal lin-modal--wide' : 'lin-modal'} role="dialog" aria-modal="true" aria-label={title}>
        <h2 class="lin-modal-title">{title}</h2>
        <div class="lin-modal-body">{children}</div>
        {footer && <div class="lin-modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

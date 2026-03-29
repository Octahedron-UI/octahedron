import { useCallback, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import styles from './SplitLayout.module.css';

const MIN_WIDTH = 280;
const DEFAULT_MAX_WIDTH = 800;
const KEYBOARD_STEP = 20;
const KEYBOARD_STEP_LARGE = 80;

type ResizerProps = {
  /** Whether the resizer is visible (panel to the right is open) */
  visible: boolean;
  /** Current width of the panel being resized */
  currentWidth: number;
  /** Callback when width changes */
  onWidthChange: (width: number) => void;
  /** Callback to reset width to default */
  onReset: () => void;
  /** Aria label for accessibility */
  ariaLabel?: string;
  /** ID of the panel this resizer controls */
  controlsId?: string;
};

/**
 * Compute the maximum width from DOM for keyboard/programmatic resize.
 * Panel can grow until the flex panel reaches MIN_WIDTH.
 */
function computeMaxWidth(resizerEl: HTMLElement): number {
  const panelEl = resizerEl.nextElementSibling as HTMLElement | null;
  const containerEl = panelEl?.parentElement;
  if (!panelEl || !containerEl) return DEFAULT_MAX_WIDTH;

  const flexPanel = containerEl.querySelector('[data-flex]') as HTMLElement | null;
  if (!flexPanel) return DEFAULT_MAX_WIDTH;

  return panelEl.offsetWidth + Math.max(0, flexPanel.offsetWidth - MIN_WIDTH);
}

/**
 * Draggable resize handle between panels.
 *
 * During pointer drag, BOTH the target panel and the flex (main) panel are
 * temporarily pinned to explicit pixel sizes (`flex: 0 0 <N>px`). This
 * bypasses the browser's flex-shrink algorithm entirely, guaranteeing that
 * mouse movement corresponds 1:1 with visual panel resize. On drag end,
 * the pins are removed and CSS flex layout resumes from the committed width.
 *
 * This is the same approach used by VS Code's splitview and the Allotment
 * library: the code controls every pixel during drag, not the browser.
 */
export function Resizer({
  visible,
  currentWidth,
  onWidthChange,
  onReset,
  ariaLabel = 'Resize panel',
  controlsId,
}: ResizerProps) {
  const resizerRef = useRef<HTMLDivElement>(null);

  const dragStateRef = useRef<{
    pointerId: number;
    startClientX: number;
    startPanelWidth: number;
    startFlexWidth: number;
    /** Most negative delta (panel shrinks to MIN_WIDTH) */
    minDelta: number;
    /** Most positive delta (flex panel shrinks to MIN_WIDTH) */
    maxDelta: number;
    panelEl: HTMLElement;
    flexPanelEl: HTMLElement;
  } | null>(null);

  const latestWidthRef = useRef(currentWidth);
  useEffect(() => {
    latestWidthRef.current = currentWidth;
  }, [currentWidth]);

  const endDrag = useCallback(() => {
    const drag = dragStateRef.current;
    if (drag) {
      // Commit width to React state SYNCHRONOUSLY so that Panel re-renders
      // with the new --panel-width before we remove the flex pins. Without
      // flushSync, React batches the update — the pins would be removed while
      // --panel-width still holds the OLD value, causing a visible snap-back.
      flushSync(() => {
        onWidthChange(latestWidthRef.current);
      });

      // Now safe to remove pins: React has already rendered Panel with the
      // correct --panel-width, so CSS flex layout resumes at the right size.
      drag.panelEl.style.flex = '';
      drag.flexPanelEl.style.flex = '';
    }
    dragStateRef.current = null;
    document.body.classList.remove('split-layout-dragging');
  }, [onWidthChange]);

  // Clean up on unmount (including mid-drag unmount)
  useEffect(() => {
    return () => {
      const drag = dragStateRef.current;
      if (drag) {
        drag.panelEl.style.flex = '';
        drag.flexPanelEl.style.flex = '';
      }
      document.body.classList.remove('split-layout-dragging');
    };
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const el = resizerRef.current;
    if (!el) return;

    const panelEl = el.nextElementSibling as HTMLElement | null;
    const containerEl = panelEl?.parentElement;
    if (!panelEl || !containerEl) return;

    const flexPanelEl = containerEl.querySelector('[data-flex]') as HTMLElement | null;
    if (!flexPanelEl) return;

    // Snapshot actual rendered sizes (may differ from CSS variables due to flex-shrink)
    const panelWidth = panelEl.offsetWidth;
    const flexWidth = flexPanelEl.offsetWidth;

    // Legal delta range: positive = panel grows (flex shrinks), negative = panel shrinks
    const maxDelta = Math.max(0, flexWidth - MIN_WIDTH);
    const minDelta = -Math.max(0, panelWidth - MIN_WIDTH);

    dragStateRef.current = {
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startPanelWidth: panelWidth,
      startFlexWidth: flexWidth,
      minDelta,
      maxDelta,
      panelEl,
      flexPanelEl,
    };

    // Pin both panels to explicit pixel sizes — no flex-shrink, no ambiguity
    panelEl.style.flex = `0 0 ${panelWidth}px`;
    flexPanelEl.style.flex = `0 0 ${flexWidth}px`;

    e.currentTarget.setPointerCapture(e.pointerId);
    document.body.classList.add('split-layout-dragging');
    e.preventDefault();
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    // Dragging left (clientX decreases) → positive delta → panel grows, flex shrinks
    const rawDelta = drag.startClientX - e.clientX;
    const delta = Math.min(Math.max(rawDelta, drag.minDelta), drag.maxDelta);

    const newPanelWidth = drag.startPanelWidth + delta;
    const newFlexWidth = drag.startFlexWidth - delta;

    latestWidthRef.current = newPanelWidth;

    // Update both panels — zero-sum transfer, no flex algorithm involvement
    drag.panelEl.style.flex = `0 0 ${newPanelWidth}px`;
    drag.flexPanelEl.style.flex = `0 0 ${newFlexWidth}px`;

    resizerRef.current?.setAttribute('aria-valuenow', String(Math.round(newPanelWidth)));
    e.preventDefault();
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const drag = dragStateRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      endDrag();
      e.preventDefault();
    },
    [endDrag],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const step = e.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP;
      let next = latestWidthRef.current;
      const maxWidth = resizerRef.current ? computeMaxWidth(resizerRef.current) : DEFAULT_MAX_WIDTH;

      switch (e.key) {
        case 'ArrowLeft':
          next -= step;
          break;
        case 'ArrowRight':
          next += step;
          break;
        case 'Home':
          next = MIN_WIDTH;
          break;
        case 'End':
          next = maxWidth;
          break;
        default:
          return;
      }

      e.preventDefault();
      next = Math.min(Math.max(next, MIN_WIDTH), maxWidth);
      latestWidthRef.current = next;
      onWidthChange(next);
    },
    [onWidthChange],
  );

  return (
    <div
      ref={resizerRef}
      className={styles.resizer}
      role="separator"
      aria-label={ariaLabel}
      aria-orientation="vertical"
      aria-controls={controlsId}
      aria-valuemin={MIN_WIDTH}
      aria-valuemax={DEFAULT_MAX_WIDTH}
      aria-valuenow={currentWidth}
      tabIndex={visible ? 0 : -1}
      title="Drag to resize. Double-click to reset."
      data-visible={visible || undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      onDoubleClick={onReset}
    />
  );
}

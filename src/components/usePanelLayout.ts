import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_WIDTH = 400;
const DEFAULT_MIN_WIDTH = 280;
const RESIZER_WIDTH = 1;

// ─────────────────────────────────────────────────────────────────────────────
// Storage helpers
// ─────────────────────────────────────────────────────────────────────────────

function getStorageKey(prefix: string | undefined, panelId: string): string {
  return prefix ? `tf.${prefix}.${panelId}.width` : `tf.panel.${panelId}.width`;
}

function readStoredWidth(key: string, minWidth: number): number | null {
  try {
    const raw = localStorage.getItem(key);
    if (raw != null) {
      const parsed = Number(raw);
      if (Number.isFinite(parsed) && parsed >= minWidth) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function persistWidth(key: string, width: number): void {
  try {
    localStorage.setItem(key, String(width));
  } catch {
    // ignore
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type UsePanelLayoutOptions = {
  /** Unique ID for this panel (used for localStorage key) */
  panelId: string;
  /** Whether the panel is currently open */
  isOpen: boolean;
  /** Prefix for localStorage keys */
  storagePrefix?: string;
  /** Default panel width in pixels */
  defaultWidth?: number;
  /** Minimum panel width in pixels */
  minWidth?: number;
  /** Total number of fixed-width panels in the layout (affects compact mode threshold). Default: 1 */
  numFixedPanels?: number;
};

export type PanelLayoutActions = {
  /** Current panel width */
  width: number;
  /** Set panel width (persists to localStorage) */
  setWidth: (width: number) => void;
  /** Reset to default width */
  resetWidth: () => void;
  /** Callback ref to attach to container for width measurement */
  containerRef: React.RefCallback<HTMLElement>;
  /** Whether layout is in compact mode (container too narrow) */
  isCompact: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Manages panel layout: widths, compact mode, and container measurement.
 *
 * - Width persisted to localStorage
 * - Compact mode triggers when container is too narrow for all panels
 *
 * @example
 * ```tsx
 * const layout = usePanelLayout({
 *   panelId: 'inspector',
 *   isOpen: selection.selectedId != null,
 *   storagePrefix: 'planning.run.demand',
 * });
 *
 * <SplitContainer ref={layout.containerRef}>
 *   <Panel flex>...</Panel>
 *   <Panel
 *     open={isOpen}
 *     width={layout.width}
 *     onWidthChange={layout.setWidth}
 *   >
 *     ...
 *   </Panel>
 * </SplitContainer>
 * ```
 */
export function usePanelLayout(options: UsePanelLayoutOptions): PanelLayoutActions {
  const {
    panelId,
    isOpen,
    storagePrefix,
    defaultWidth = DEFAULT_WIDTH,
    minWidth = DEFAULT_MIN_WIDTH,
    numFixedPanels = 1,
  } = options;

  // ─────────────────────────────────────────────────────────────────────────────
  // Container measurement
  // ─────────────────────────────────────────────────────────────────────────────

  const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);
  const containerRef = useCallback((node: HTMLElement | null) => {
    setContainerEl(node);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────────
  // Width state
  // ─────────────────────────────────────────────────────────────────────────────

  const [width, setWidthState] = useState(() => {
    const key = getStorageKey(storagePrefix, panelId);
    return readStoredWidth(key, minWidth) ?? defaultWidth;
  });

  const setWidth = useCallback(
    (newWidth: number) => {
      const clamped = Math.max(newWidth, minWidth);
      setWidthState(clamped);
      const key = getStorageKey(storagePrefix, panelId);
      persistWidth(key, clamped);
    },
    [storagePrefix, panelId, minWidth],
  );

  const resetWidth = useCallback(() => {
    setWidth(defaultWidth);
  }, [defaultWidth, setWidth]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Compact mode
  // ─────────────────────────────────────────────────────────────────────────────

  // Compact mode triggers when container can't fit main panel + all fixed panels
  // at min widths. Uses ResizeObserver but only triggers React state updates when
  // the boolean actually changes — pixel-level width changes are ignored.
  const compactThreshold = isOpen
    ? (1 + numFixedPanels) * minWidth + numFixedPanels * RESIZER_WIDTH
    : 0;

  const [isCompact, setIsCompact] = useState(false);

  useLayoutEffect(() => {
    if (!containerEl) return;

    const check = (w: number) => {
      const compact = isOpen && w > 0 && w < compactThreshold;
      setIsCompact((prev) => (prev !== compact ? compact : prev));
    };

    check(containerEl.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) check(entry.contentRect.width);
    });

    observer.observe(containerEl);
    return () => observer.disconnect();
  }, [containerEl, isOpen, compactThreshold]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Return
  // ─────────────────────────────────────────────────────────────────────────────

  return useMemo(
    () => ({
      width,
      setWidth,
      resetWidth,
      containerRef,
      isCompact,
    }),
    [width, setWidth, resetWidth, containerRef, isCompact],
  );
}

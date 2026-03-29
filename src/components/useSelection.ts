import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type UseSelectionOptions = {
  /** URL param name for the selection */
  urlParam: string;
};

export type SelectionActions = {
  /** Currently selected ID */
  selectedId: string | null;
  /** Select an item */
  select: (id: string) => void;
  /** Clear selection */
  deselect: () => void;
  /** Toggle selection */
  toggle: (id: string) => void;
};

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Simple URL-backed selection state for non-tabbed pages.
 *
 * - URL is the source of truth
 * - No per-tab memory (not needed for single-context pages)
 *
 * @example
 * ```tsx
 * const selection = useSelection({ urlParam: 'userId' });
 *
 * <DataTable onRowClick={(row) => selection.toggle(row.id)} />
 * <Panel open={selection.selectedId != null}>
 *   <Inspector onClose={selection.deselect} />
 * </Panel>
 * ```
 */
export function useSelection(options: UseSelectionOptions): SelectionActions {
  const { urlParam } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId = searchParams.get(urlParam);

  const select = useCallback(
    (id: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(urlParam, id);
          return next;
        },
        { replace: true },
      );
    },
    [urlParam, setSearchParams],
  );

  const deselect = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete(urlParam);
        return next;
      },
      { replace: true },
    );
  }, [urlParam, setSearchParams]);

  const toggle = useCallback(
    (id: string) => {
      if (selectedId === id) {
        deselect();
      } else {
        select(id);
      }
    },
    [selectedId, select, deselect],
  );

  return useMemo(
    () => ({
      selectedId,
      select,
      deselect,
      toggle,
    }),
    [selectedId, select, deselect, toggle],
  );
}

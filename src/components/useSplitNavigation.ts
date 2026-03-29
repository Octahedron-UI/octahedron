import { useCallback, useMemo } from 'react';

/**
 * Input for the two-level split navigation hook.
 * Works with both URL-backed (useTypedSelection) and local state detail panels.
 */
export type SplitNavigationInput = {
  /** Primary selection (panel 2). Only `selectedId` and `deselect` are consumed. */
  selection: { selectedId: string | null; deselect: () => void };
  /** Whether the detail panel (panel 3) is open */
  hasDetail: boolean;
  /** Close the detail panel */
  clearDetail: () => void;
};

export type SplitNavigationResult = {
  /** Panel IDs currently open (for SplitContainer) */
  openPanelIds: string[];
  /** Active panel in compact mode (detail > inspector > null) */
  activeCompactPanel: string | null;
  /** Close both selection and detail */
  handleClose: () => void;
  /** Close just the detail panel */
  handleDetailClose: () => void;
  /** Navigate back one level: detail → inspector → main */
  handleNavigateBack: () => void;
  /** Navigate to a specific panel (closes deeper panels) */
  handleNavigateToPanel: (panelId: string) => void;
};

/**
 * Encapsulates the repeated compact-mode and navigation handler logic
 * for 3-panel split layouts (main + inspector + detail).
 *
 * @example
 * ```tsx
 * const nav = useSplitNavigation({
 *   selection,
 *   hasDetail: detailView != null,
 *   clearDetail: detail.deselect,
 * });
 *
 * <SplitContainer
 *   activeCompactPanel={nav.activeCompactPanel}
 *   onNavigateBack={nav.handleNavigateBack}
 *   onNavigateToPanel={nav.handleNavigateToPanel}
 *   openPanelIds={nav.openPanelIds}
 * >
 *   ...
 * </SplitContainer>
 * ```
 */
export function useSplitNavigation({
  selection,
  hasDetail,
  clearDetail,
}: SplitNavigationInput): SplitNavigationResult {
  const openPanelIds = useMemo(
    () => [
      ...(selection.selectedId ? ['inspector'] : []),
      ...(hasDetail ? ['detail'] : []),
    ],
    [selection.selectedId, hasDetail],
  );

  const activeCompactPanel = hasDetail
    ? 'detail'
    : selection.selectedId
      ? 'inspector'
      : null;

  const handleClose = useCallback(() => {
    selection.deselect();
    clearDetail();
  }, [selection, clearDetail]);

  const handleDetailClose = useCallback(() => {
    clearDetail();
  }, [clearDetail]);

  const handleNavigateBack = useCallback(() => {
    if (hasDetail) {
      clearDetail();
    } else {
      selection.deselect();
    }
  }, [hasDetail, clearDetail, selection]);

  const handleNavigateToPanel = useCallback(
    (panelId: string) => {
      if (panelId === 'inspector') {
        clearDetail();
      }
    },
    [clearDetail],
  );

  return useMemo(
    () => ({
      openPanelIds,
      activeCompactPanel,
      handleClose,
      handleDetailClose,
      handleNavigateBack,
      handleNavigateToPanel,
    }),
    [
      openPanelIds,
      activeCompactPanel,
      handleClose,
      handleDetailClose,
      handleNavigateBack,
      handleNavigateToPanel,
    ],
  );
}

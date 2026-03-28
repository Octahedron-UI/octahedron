import { useCallback, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react';

type SelectionSummary = {
  totalSelectable: number;
  selectedInTable: number;
  allSelected: boolean;
  indeterminate: boolean;
};

export type TablePageSelection<Row> = {
  selectedIds: Set<string>;
  setSelectedIds: Dispatch<SetStateAction<Set<string>>>;
  onVisibleRowsChange: (visibleRows: readonly Row[]) => void;
  summary: SelectionSummary;
  setAllSelected: (nextChecked: boolean) => void;
  clearSelection: () => void;
};

export function useTablePageSelection<Row>(
  getRowId: (row: Row) => string,
): TablePageSelection<Row> {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const [visiblePageIds, setVisiblePageIds] = useState<string[]>([]);

  const getRowIdRef = useRef(getRowId);
  getRowIdRef.current = getRowId;

  const onVisibleRowsChange = useCallback((visibleRows: readonly Row[]) => {
    const nextIds = visibleRows.map((r) => getRowIdRef.current(r));
    setVisiblePageIds((prev) => {
      if (prev.length !== nextIds.length) return nextIds;
      for (let i = 0; i < prev.length; i += 1) {
        if (prev[i] !== nextIds[i]) return nextIds;
      }
      return prev;
    });
  }, []);

  const summary = useMemo<SelectionSummary>(() => {
    const totalSelectable = visiblePageIds.length;
    let selectedInTable = 0;
    for (const id of visiblePageIds) {
      if (selectedIds.has(id)) selectedInTable += 1;
    }
    const allSelected = totalSelectable > 0 && selectedInTable === totalSelectable;
    const indeterminate = selectedInTable > 0 && selectedInTable < totalSelectable;
    return { totalSelectable, selectedInTable, allSelected, indeterminate };
  }, [selectedIds, visiblePageIds]);

  const setAllSelected = useCallback(
    (nextChecked: boolean) => {
      setSelectedIds((prev) => {
        if (!visiblePageIds.length) return prev;

        if (nextChecked) {
          // Selecting: add all visible page IDs
          const next = new Set(prev);
          for (const id of visiblePageIds) {
            next.add(id);
          }
          return next;
        } else {
          // Deselecting: if selection extends beyond current page, clear everything.
          // This handles the "select all filtered" case correctly (Gmail behavior).
          const visibleSet = new Set(visiblePageIds);
          const hasSelectionBeyondPage = [...prev].some((id) => !visibleSet.has(id));

          if (hasSelectionBeyondPage) {
            return new Set();
          }

          // Selection is page-scoped, just remove visible page IDs
          const next = new Set(prev);
          for (const id of visiblePageIds) {
            next.delete(id);
          }
          return next;
        }
      });
    },
    [visiblePageIds],
  );

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  return {
    selectedIds,
    setSelectedIds,
    onVisibleRowsChange,
    summary,
    setAllSelected,
    clearSelection,
  };
}

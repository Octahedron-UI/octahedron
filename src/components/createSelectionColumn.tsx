import type { ReactNode } from 'react';

import { TableSelectionCheckbox } from './TableSelectionCheckbox';
import type { TablePageSelection } from './useTablePageSelection';

type SelectionColumnConfig<Row> = {
  /** The selection state from useTablePageSelection */
  selection: TablePageSelection<Row>;
  /** Extract the unique ID from a row */
  getRowId: (row: Row) => string;
  /** Get label for accessibility (e.g., row name for screen readers) */
  getRowLabel: (row: Row) => string;
  /** Plural noun for the items being selected (e.g., "recommendations", "groups") */
  itemsLabel?: string;
  /** Disable all checkboxes (column still visible) */
  disabled?: boolean;
};

type SelectionColumn<Row> = {
  id: string;
  name: string;
  maxWidth: number;
  align: 'center';
  noPadding: true;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  skeleton: ReactNode;
};

/**
 * Creates a checkbox selection column for DataTable.
 *
 * Usage:
 * ```tsx
 * const selection = useTablePageSelection<MyRow>((r) => r.id);
 *
 * <DataTable
 *   columns={[
 *     createSelectionColumn({
 *       selection,
 *       getRowId: (r) => r.id,
 *       getRowLabel: (r) => r.name,
 *       itemsLabel: 'items',
 *     }),
 *     // ... other columns
 *   ]}
 *   onVisibleRowsChange={selection.onVisibleRowsChange}
 * />
 * ```
 */
export function createSelectionColumn<Row>({
  selection,
  getRowId,
  getRowLabel,
  itemsLabel = 'items',
  disabled = false,
}: SelectionColumnConfig<Row>): SelectionColumn<Row> {
  return {
    id: 'select',
    name: '',
    maxWidth: 48,
    align: 'center',
    noPadding: true,
    skeleton: (
      <TableSelectionCheckbox checked={false} disabled ariaLabel="Loading" onValueChange={() => {}} />
    ),
    header: (
      <TableSelectionCheckbox
        checked={selection.summary.allSelected}
        indeterminate={selection.summary.indeterminate}
        disabled={disabled || selection.summary.totalSelectable === 0}
        ariaLabel={
          selection.summary.allSelected || selection.summary.indeterminate
            ? `Unselect all ${itemsLabel} on this page`
            : `Select all ${itemsLabel} on this page`
        }
        onValueChange={selection.setAllSelected}
      />
    ),
    cell: (row: Row) => {
      const id = getRowId(row);
      const checked = selection.selectedIds.has(id);
      const label = getRowLabel(row);
      return (
        <TableSelectionCheckbox
          checked={checked}
          disabled={disabled}
          ariaLabel={`${checked ? 'Unselect' : 'Select'} ${label}`}
          onValueChange={(isChecked) => {
            selection.setSelectedIds((prev) => {
              const next = new Set(prev);
              if (isChecked) next.add(id);
              else next.delete(id);
              return next;
            });
          }}
        />
      );
    },
  };
}

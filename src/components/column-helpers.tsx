import type { ReactNode } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Empty cell placeholder
// ─────────────────────────────────────────────────────────────────────────────

/** Muted dash for empty/null values in tables. Use with `value ?? EMPTY_CELL`. */
export const EMPTY_CELL = <span style={{ color: 'var(--gs-muted)' }}>—</span>;

// Match DataTable's column type exactly
type ColumnDef<Row> = {
  name: string;
  align?: 'left' | 'center' | 'right';
  cell: (row: Row, rowIndex: number) => ReactNode;
  sortValue?: (row: Row) => string | number | Date | null | undefined;
  tooltip?: (row: Row, rowIndex: number) => string | undefined;
};

// ─────────────────────────────────────────────────────────────────────────────
// Boolean
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Boolean column: green ✓ for true, red ✗ for false, muted — for null.
 * Center-aligned, sortable (true first, null last). Pass options to override.
 */
export function booleanColumn<Row>(
  name: string,
  getValue: (row: Row) => boolean | null | undefined,
  options?: Partial<Omit<ColumnDef<Row>, 'cell'>>,
): ColumnDef<Row> {
  return {
    name,
    align: 'center',
    sortValue: (row) => {
      const v = getValue(row);
      return v == null ? 2 : v ? 0 : 1;
    },
    ...options,
    cell: (row) => <BooleanIndicator value={getValue(row)} />,
  };
}

/**
 * Standalone boolean indicator for non-table contexts.
 * Shows ✓ for true, muted — for false/null (false is the expected default).
 */
export function BooleanIndicator({ value }: { value: boolean | null | undefined }) {
  return value ? (
    <span style={{ color: 'var(--gs-success)' }}>✓</span>
  ) : (
    <span style={{ color: 'var(--gs-muted)' }}>—</span>
  );
}

/**
 * Thin wrapper for filter column definitions.
 * Keeps explicit array syntax but adds type inference + columnsById generation.
 */

import type { TableFilterColumnDef } from './table-filters';

/**
 * Wrap filter column definitions to get type inference + columnsById.
 * Keeps explicit array syntax - no magic.
 *
 * @example
 * const filters = defineFilterColumns([
 *   { id: 'status', label: 'Status', valueInput: 'select', getValues: (row: MyRow) => [row.status] },
 *   { id: 'priority', label: 'Priority', valueInput: 'number', getValues: (row: MyRow) => row.priority != null ? [String(row.priority)] : [], getNumberValues: (row: MyRow) => row.priority != null ? [row.priority] : [] },
 * ] as const);
 *
 * // Use in component:
 * <TableToolbar filterColumns={filters.columns} ... />
 * rowMatchesFilters(row, activeFilters, filters.columnsById)
 * type FilterId = typeof filters.columnIds[number];
 */
export function defineFilterColumns<
  const T extends readonly TableFilterColumnDef<any, string>[],
>(columns: T) {
  const columnIds = columns.map((c) => c.id) as unknown as T[number]['id'][];
  const columnsById = Object.fromEntries(columns.map((c) => [c.id, c])) as {
    [K in T[number]['id']]: Extract<T[number], { id: K }>;
  };
  return { columns, columnIds, columnsById };
}

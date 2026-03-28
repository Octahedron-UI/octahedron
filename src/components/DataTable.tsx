import {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react';

import { cn } from '../lib/cn';

import { HorizontalScrollHint } from './HorizontalScrollHint';
import { SkeletonBar } from './SkeletonBar';

import styles from './DataTable.module.css';

export type DataTableColumn<Row> = {
  id?: string | number;
  name: string;
  header?: ReactNode;
  /** Maximum content width before truncation. */
  maxWidth?: number;
  align?: 'left' | 'center' | 'right';
  wrapText?: boolean;
  className?: string;
  /** Remove cell padding — content is centered. Implies grow: false. */
  noPadding?: boolean;
  /** Whether the column absorbs surplus table width. Defaults to false for noPadding columns. */
  grow?: boolean;
  cell: (row: Row, rowIndex: number) => ReactNode;
  tooltip?: (row: Row, rowIndex: number) => string | undefined;
  /** If provided, enables sorting on this column. Return the value to sort by. */
  sortValue?: (row: Row) => string | number | Date | null | undefined;
  /** Default sort order when first clicked */
  defaultSortOrder?: 'asc' | 'desc';
  /** Custom skeleton content for loading state. If not provided, uses default SkeletonBar. */
  skeleton?: ReactNode;
};

export type DataTablePaginationConfig = {
  current?: number;
  pageSize?: number;
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showControls?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
};

type DataTableProps<Row> = {
  rows: readonly Row[];
  columns: readonly DataTableColumn<Row>[];
  rowKey?: (row: Row, rowIndex: number) => string | number;
  title?: ReactNode;
  footer?: ReactNode;
  bordered?: boolean;
  striped?: boolean;
  maxHeight?: number | null;
  cellVerticalAlign?: 'top' | 'middle';
  /** Allow rows to expand beyond fixed height when content wraps */
  variableRowHeight?: boolean;
  pagination?: false | DataTablePaginationConfig;
  onVisibleRowsChange?: (rows: readonly Row[]) => void;
  selection?: {
    selectedRowIndex?: number | null;
    /** For hierarchical tables, select by row key (works with getRowKey) */
    selectedRowKey?: string | null;
    /** Called when row is clicked for selection. Optional if using onRowClick for selection logic. */
    onSelectRow?: (rowIndex: number) => void;
  };
  /** Called when a row is clicked (for navigation, etc). If provided, rows become clickable. */
  onRowClick?: (row: Row, rowIndex: number) => void;
  /** When true, render skeleton rows instead of data */
  loading?: boolean;
  /** Number of skeleton rows to show when loading (default: 8) */
  loadingRowCount?: number;
  /** Message to show when rows is empty and not loading (default: "No data") */
  emptyMessage?: ReactNode;
  /** Accessible label for the table element */
  ariaLabel?: string;
  // ─────────────────────────────────────────────────────────────────────────────
  // Hierarchical / expandable row support
  // ─────────────────────────────────────────────────────────────────────────────
  /** For hierarchical rows: get children of a row (undefined = leaf, empty array = no children) */
  getRowChildren?: (row: Row) => readonly Row[] | undefined;
  /** Unique key for tracking expansion state (required for expandable rows) */
  getRowKey?: (row: Row) => string;
  /** Controlled expansion state - set of expanded row keys */
  expandedKeys?: ReadonlySet<string>;
  /** Expansion change callback */
  onExpandedKeysChange?: (keys: Set<string>) => void;
  /** Row depth for indentation (0 = parent, 1+ = child). If not provided, all rows are depth 0. */
  getRowDepth?: (row: Row) => number;
};

function getColumnId<Row>(col: DataTableColumn<Row>, colIndex: number) {
  if (col.id != null) return col.id;
  const base = col.name.trim();
  return base ? `${base}__${colIndex}` : colIndex;
}

function getSkeletonBarWidth(rowIndex: number, colIndex: number): string {
  const seed = (rowIndex * 7 + colIndex * 13) % 5;
  const widths = ['55%', '70%', '85%', '65%', '75%'];
  return widths[seed];
}

type WrappedRow<Row> = {
  __row: Row;
  __rowIndex: number;
};

function compareSortValues(aVal: string | number | Date, bVal: string | number | Date) {
  if (typeof aVal === 'string' && typeof bVal === 'string') return aVal.localeCompare(bVal);
  if (aVal instanceof Date && bVal instanceof Date) return aVal.getTime() - bVal.getTime();
  return Number(aVal) - Number(bVal);
}

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  if (direction == null) {
    const glyphWidth = 5.85714;
    const glyphHeight = 8.85714;
    const x = (14 - glyphWidth) / 2;
    const y = (14 - glyphHeight) / 2;
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
        <svg x={x} y={y} width={glyphWidth} height={glyphHeight} viewBox="0 0 5.85714 8.85714">
          <path
            d="M0.428571 5.92857L2.92857 8.42857L5.42857 5.92857M0.428571 2.92857L2.92857 0.428571L5.42857 2.92857"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.857143"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </svg>
    );
  }

  const glyphWidth = 5.83333;
  const glyphHeight = 3.33333;
  const x = (14 - glyphWidth) / 2;
  const y = (14 - glyphHeight) / 2;

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <svg x={x} y={y} width={glyphWidth} height={glyphHeight} viewBox="0 0 5.83333 3.33333">
        <g transform={direction === 'asc' ? 'rotate(180 2.916665 1.666665)' : undefined}>
          <path
            d="M0.416667 0.416667L2.91667 2.91667L5.41667 0.416667"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.833333"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </svg>
  );
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{
        transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.15s ease',
      }}
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DataTableImpl<Row>({
  rows,
  columns,
  rowKey,
  title,
  footer,
  bordered = true,
  striped = true,
  maxHeight = null,
  cellVerticalAlign = 'middle',
  variableRowHeight = false,
  pagination = false,
  onVisibleRowsChange,
  selection,
  onRowClick,
  loading = false,
  loadingRowCount = 8,
  emptyMessage = 'No data',
  ariaLabel,
  // Hierarchical row props
  getRowChildren,
  getRowKey,
  expandedKeys,
  onExpandedKeysChange,
  getRowDepth,
}: DataTableProps<Row>) {
  const hasTitle = title != null;
  const hasFooter = footer != null;

  const dataSource: WrappedRow<Row>[] = useMemo(
    () => rows.map((row, idx) => ({ __row: row, __rowIndex: idx })),
    [rows],
  );

  const initialSort = useMemo(() => {
    for (let i = 0; i < columns.length; i += 1) {
      const col = columns[i];
      if (!col.sortValue) continue;
      if (col.defaultSortOrder === 'asc' || col.defaultSortOrder === 'desc') {
        return { colIndex: i, direction: col.defaultSortOrder };
      }
    }
    return { colIndex: null as number | null, direction: null as 'asc' | 'desc' | null };
  }, [columns]);

  const [sortColIndex, setSortColIndex] = useState<number | null>(initialSort.colIndex);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(initialSort.direction);

  const sortedDataSource = useMemo(() => {
    if (sortColIndex == null || sortDirection == null) return dataSource;
    const col = columns[sortColIndex];
    if (!col?.sortValue) return dataSource;

    const next = [...dataSource];
    next.sort((a, b) => {
      const aVal = col.sortValue!(a.__row);
      const bVal = col.sortValue!(b.__row);
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const comp = compareSortValues(aVal, bVal);
      return sortDirection === 'asc' ? comp : -comp;
    });
    return next;
  }, [columns, dataSource, sortColIndex, sortDirection]);

  const effectivePageSize = pagination ? (pagination.pageSize ?? 25) : null;
  const effectivePage = pagination ? (pagination.current ?? 1) : null;
  const pageCount =
    pagination && effectivePageSize != null
      ? Math.max(1, Math.ceil(sortedDataSource.length / Math.max(1, effectivePageSize)))
      : 1;

  const pagedRows = useMemo(() => {
    if (!pagination || effectivePageSize == null || effectivePage == null) return sortedDataSource;
    const page = Math.min(Math.max(1, effectivePage), pageCount);
    const start = (page - 1) * effectivePageSize;
    return sortedDataSource.slice(start, start + effectivePageSize);
  }, [effectivePage, effectivePageSize, pageCount, pagination, sortedDataSource]);

  // Expand paged rows to include children of expanded parents
  const expandedPagedRows = useMemo(() => {
    if (!getRowChildren || !getRowKey || !expandedKeys) return pagedRows;

    const result: WrappedRow<Row>[] = [];
    for (const record of pagedRows) {
      result.push(record);
      const key = getRowKey(record.__row);
      if (expandedKeys.has(key)) {
        const children = getRowChildren(record.__row);
        if (children) {
          for (const child of children) {
            // Child rows use __rowIndex: -1 to indicate they're not in original array
            result.push({ __row: child, __rowIndex: -1 });
          }
        }
      }
    }
    return result;
  }, [pagedRows, getRowChildren, getRowKey, expandedKeys]);

  // Toggle expansion handler
  const handleToggleExpand = useCallback(
    (key: string, e: ReactMouseEvent) => {
      e.stopPropagation();
      if (!onExpandedKeysChange || !expandedKeys) return;
      const next = new Set(expandedKeys);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      onExpandedKeysChange(next);
    },
    [expandedKeys, onExpandedKeysChange],
  );

  const visibleRowSignature = useMemo(() => {
    const keyFn = rowKey ?? ((_: Row, rowIndex: number) => rowIndex);
    return expandedPagedRows
      .map((record) => String(keyFn(record.__row, record.__rowIndex)))
      .join('|');
  }, [expandedPagedRows, rowKey]);

  const pagedRowsRef = useRef(expandedPagedRows);
  pagedRowsRef.current = expandedPagedRows;

  useLayoutEffect(() => {
    if (!onVisibleRowsChange) return;
    onVisibleRowsChange(pagedRowsRef.current.map((row) => row.__row));
  }, [onVisibleRowsChange, visibleRowSignature]);

  const onClickHeader = useCallback(
    (colIndex: number) => {
      const col = columns[colIndex];
      if (!col?.sortValue) return;

      if (sortColIndex !== colIndex) {
        setSortColIndex(colIndex);
        setSortDirection(col.defaultSortOrder ?? 'asc');
        return;
      }

      setSortDirection((prevDirection) => {
        if (prevDirection == null) return 'asc';
        if (prevDirection === 'asc') return 'desc';
        return null;
      });
    },
    [columns, sortColIndex],
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          minWidth: 0,
          minHeight: 0,
          ...(maxHeight != null ? { maxHeight } : null),
        }}
      >
        {hasTitle ? <div style={{ padding: 12 }}>{title}</div> : null}
        {hasTitle ? (
          <hr style={{ margin: 0, border: 'none', borderTop: '1px solid var(--gs-border)' }} />
        ) : null}

        <HorizontalScrollHint
          style={{
            flex: '1 1 auto',
            minWidth: 0,
            minHeight: 0,
          }}
          scrollerStyle={{
            overflowX: 'auto',
            overflowY: 'auto',
          }}
        >
          <table
            className={cn(
              styles.table,
              bordered && styles.bordered,
              striped && styles.striped,
              variableRowHeight && styles.variableRowHeight,
            )}
            aria-label={ariaLabel}
            style={{
              width: '100%',
              tableLayout: 'auto',
              minWidth: '100%',
            }}
          >
            <colgroup>
              {columns.map((col, colIndex) => {
                const shouldGrow = col.grow ?? !col.noPadding;
                // Non-growing columns declare width: 0 so the auto algorithm
                // assigns them no surplus — they size to content naturally.
                const style: CSSProperties | undefined = shouldGrow ? undefined : { width: 0 };
                return <col key={String(getColumnId(col, colIndex))} style={style} />;
              })}
            </colgroup>
            <thead>
              <tr>
                {columns.map((col, colIndex) => {
                  const isSortable = !!col.sortValue;
                  const isSorted = sortColIndex === colIndex && sortDirection != null;
                  const direction: 'asc' | 'desc' | null = isSorted ? sortDirection : null;
                  const thSort =
                    direction === 'asc'
                      ? 'ascending'
                      : direction === 'desc'
                        ? 'descending'
                        : 'none';

                  // Build the inner content (custom header, sortable button, or plain text)
                  const innerContent =
                    col.header != null ? (
                      col.header
                    ) : isSortable ? (
                      <button
                        type="button"
                        onClick={() => onClickHeader(colIndex)}
                        aria-label={`Sort by ${col.name}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 'var(--gs-space-1)',
                          border: 0,
                          padding: 0,
                          background: 'transparent',
                          cursor: 'pointer',
                          color: 'inherit',
                          fontFamily: 'inherit',
                          fontSize: 'inherit',
                          fontWeight: 'inherit',
                          lineHeight: 'inherit',
                          minWidth: 0,
                        }}
                      >
                        <span
                          style={{
                            minWidth: 0,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {col.name}
                        </span>
                        <SortIcon direction={direction} />
                      </button>
                    ) : (
                      <span
                        style={{
                          minWidth: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {col.name}
                      </span>
                    );

                  // Derive flex justification from column alignment
                  const headerJustify =
                    col.align === 'right'
                      ? 'flex-end'
                      : col.align === 'center'
                        ? 'center'
                        : 'flex-start';

                  return (
                    <th
                      key={String(getColumnId(col, colIndex))}
                      className={cn(col.className, col.noPadding && styles.noPadding)}
                      aria-sort={isSortable ? thSort : undefined}
                      style={{
                        textAlign: col.align ?? 'left',
                        verticalAlign: 'middle',
                        ...((col.grow ?? !col.noPadding) && col.maxWidth
                          ? { maxWidth: col.maxWidth }
                          : null),
                      }}
                    >
                      <div
                        className={styles.cellContent}
                        style={{
                          justifyContent: headerJustify,
                        }}
                      >
                        {innerContent}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: loadingRowCount }).map((_, rowIndex) => (
                  <tr key={`skeleton-${rowIndex}`}>
                    {columns.map((col, colIndex) => (
                      <td
                        key={String(getColumnId(col, colIndex))}
                        className={cn(col.className, col.noPadding && styles.noPadding)}
                        style={{ textAlign: col.align ?? 'left' }}
                      >
                        <div
                          className={styles.cellContent}
                          style={{
                            justifyContent:
                              col.align === 'right'
                                ? 'flex-end'
                                : col.align === 'center'
                                  ? 'center'
                                  : 'flex-start',
                          }}
                        >
                          {col.skeleton !== undefined ? (
                            col.skeleton
                          ) : (
                            <SkeletonBar
                              width={getSkeletonBarWidth(rowIndex, colIndex)}
                              align={col.align}
                            />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : expandedPagedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      textAlign: 'center',
                      color: 'var(--gs-muted)',
                      padding: 'var(--gs-space-6) var(--gs-space-4)',
                      fontStyle: 'italic',
                    }}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                expandedPagedRows.map((record, displayIndex) => {
                  const rowKeyValue = getRowKey?.(record.__row);
                  const isSelected =
                    (selection?.selectedRowKey != null &&
                      rowKeyValue != null &&
                      selection.selectedRowKey === rowKeyValue) ||
                    (selection?.selectedRowIndex != null &&
                      selection.selectedRowIndex === record.__rowIndex);
                  const isClickable = !!selection || !!onRowClick;

                  // Hierarchical row props
                  const rowDepth = getRowDepth?.(record.__row) ?? 0;
                  const hasChildren = getRowChildren
                    ? (getRowChildren(record.__row)?.length ?? 0) > 0
                    : false;
                  const isExpanded = rowKeyValue != null && expandedKeys?.has(rowKeyValue);

                  return (
                    <tr
                      key={
                        rowKeyValue ??
                        (record.__rowIndex >= 0 ? record.__rowIndex : `child-${displayIndex}`)
                      }
                      className={cn(isSelected && styles.selected, rowDepth > 0 && styles.childRow)}
                      style={isClickable ? { cursor: 'pointer' } : undefined}
                      onClick={(e: ReactMouseEvent<HTMLElement>) => {
                        if (e.defaultPrevented) return;

                        if (e.target instanceof Element) {
                          const interactive = e.target.closest(
                            'a, button, input, textarea, select, [role="button"]',
                          );
                          if (interactive) return;
                        }

                        if (onRowClick) {
                          onRowClick(record.__row, record.__rowIndex);
                        }
                        if (selection?.onSelectRow && record.__rowIndex >= 0) {
                          selection.onSelectRow(record.__rowIndex);
                        }
                      }}
                    >
                      {columns.map((col, colIndex) => {
                        const idx = record.__rowIndex;
                        const row = record.__row;
                        const content = col.cell(row, idx);
                        const tooltip = col.tooltip?.(row, idx);
                        const nowrap = !(col.wrapText ?? false);
                        const effectiveMaxWidth = col.maxWidth;

                        // For wrapText columns, use inner wrapper for wrapping
                        const needsWrapWrapper = !nowrap;

                        const tdStyle: CSSProperties = {
                          textAlign: col.align ?? 'left',
                          whiteSpace: needsWrapWrapper ? undefined : nowrap ? 'nowrap' : 'normal',
                          overflow: needsWrapWrapper ? 'visible' : 'hidden',
                          textOverflow: nowrap && !needsWrapWrapper ? 'ellipsis' : undefined,
                          verticalAlign: cellVerticalAlign,
                        };

                        // Growing columns use maxWidth to control their range.
                        // Non-growing columns are left unstyled so they size
                        // purely to content (see width: 0 on <col>).
                        if ((col.grow ?? !col.noPadding) && !needsWrapWrapper) {
                          tdStyle.maxWidth = effectiveMaxWidth;
                        }

                        // First column: add expand toggle and indentation
                        const isFirstColumn = colIndex === 0;
                        const showExpandToggle =
                          isFirstColumn && hasChildren && rowKeyValue != null;
                        const indentPx = isFirstColumn && rowDepth > 0 ? rowDepth * 24 : 0;

                        // Track if content is simple text (string/number) for truncation styling
                        const isSimpleText =
                          typeof content === 'string' || typeof content === 'number';

                        // Inner wrapper handles wrapping at maxWidth
                        let wrappedContent = needsWrapWrapper ? (
                          <div
                            style={{
                              width: 'max-content',
                              maxWidth: effectiveMaxWidth,
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                            }}
                          >
                            {content}
                          </div>
                        ) : isSimpleText ? (
                          // Simple text gets truncation styling
                          <span className={styles.cellText}>{content}</span>
                        ) : (
                          content
                        );

                        // Add expand toggle and indentation for first column
                        if (isFirstColumn && (showExpandToggle || indentPx > 0)) {
                          wrappedContent = (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--gs-space-1)',
                              }}
                            >
                              {showExpandToggle ? (
                                <button
                                  type="button"
                                  className={styles.expandToggle}
                                  onClick={(e) => handleToggleExpand(rowKeyValue, e)}
                                  aria-expanded={isExpanded}
                                  aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                                  style={{ marginLeft: indentPx }}
                                >
                                  <ChevronIcon expanded={!!isExpanded} />
                                </button>
                              ) : indentPx > 0 ? (
                                // Spacer for child rows without toggle (matches toggle width)
                                <span style={{ width: 20, marginLeft: indentPx, flexShrink: 0 }} />
                              ) : null}
                              <span
                                style={{
                                  minWidth: 0,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {content}
                              </span>
                            </div>
                          );
                        }

                        return (
                          <td
                            key={String(getColumnId(col, colIndex))}
                            className={cn(col.className, col.noPadding && styles.noPadding)}
                            title={tooltip && tooltip.trim().length ? tooltip : undefined}
                            style={tdStyle}
                          >
                            <div
                              className={styles.cellContent}
                              style={{
                                justifyContent:
                                  col.align === 'right'
                                    ? 'flex-end'
                                    : col.align === 'center'
                                      ? 'center'
                                      : 'flex-start',
                              }}
                            >
                              {wrappedContent}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </HorizontalScrollHint>

        {hasFooter ? (
          <hr style={{ margin: 0, border: 'none', borderTop: '1px solid var(--gs-border)' }} />
        ) : null}
        {hasFooter ? <div style={{ padding: 12 }}>{footer}</div> : null}
      </div>
    </>
  );
}

export const DataTable = memo(DataTableImpl) as typeof DataTableImpl;

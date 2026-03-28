import { type CSSProperties, type ReactNode, useCallback, useState } from 'react';

import { cn } from '../lib/cn';
import { AppIcon } from './AppIcon';
import { TableCard } from './TableCard';
import { Text } from './Text';

import styles from './CardTable.module.css';

type ColumnSize = 'hug' | 'fill';

// ---- Collapsible support ----

export type CollapsibleHeaderRenderProps = {
  expanded: boolean;
  toggle: () => void;
  chevron: ReactNode;
};

export type CardTableCollapsibleConfig = {
  renderHeader?: (props: CollapsibleHeaderRenderProps) => ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  storageKey?: string;
};

function getStoredState(key: string | undefined, fallback: boolean): boolean {
  if (!key) return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
  } catch {
    // localStorage unavailable
  }
  return fallback;
}

function setStoredState(key: string | undefined, value: boolean): void {
  if (!key) return;
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // localStorage unavailable
  }
}

function useCollapsible(config?: CardTableCollapsibleConfig) {
  const isControlled = config?.expanded !== undefined;
  const [internal, setInternal] = useState(() =>
    getStoredState(config?.storageKey, config?.defaultExpanded ?? true),
  );
  const expanded = isControlled ? config.expanded! : internal;

  const toggle = useCallback(() => {
    const next = !expanded;
    if (!isControlled) {
      setInternal(next);
      setStoredState(config?.storageKey, next);
    }
    config?.onExpandedChange?.(next);
  }, [expanded, isControlled, config]);

  return { expanded, toggle };
}

export type CardTableColumn<Row> = {
  key?: string | number;
  header: ReactNode;
  cell: (row: Row, rowIndex: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  size?: ColumnSize;
  /** Fixed column width in pixels (applied to <col>) */
  widthPx?: number;
  /** Maximum column width - content wraps within this limit */
  maxWidthPx?: number;
  tone?: 'default' | 'label';
};

export type CardTableProps<Row> = {
  ariaLabel: string;
  title?: ReactNode;
  columns: readonly CardTableColumn<Row>[];
  rows: readonly Row[];
  rowKey?: (row: Row, rowIndex: number) => string | number;
  showHeaders?: boolean;
  emptyState?: 'span' | 'cells';
  emptyText?: ReactNode;
  /** Footer content rendered below the table rows */
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
  scrollerStyle?: CSSProperties;
  hideScrollbar?: boolean;
  collapsible?: CardTableCollapsibleConfig;
};

function getColStyle<Row>(
  col: CardTableColumn<Row>,
  hasFlexibleColumn: boolean,
): CSSProperties | undefined {
  if (col.widthPx != null) return { width: col.widthPx };
  if (col.maxWidthPx != null) return { width: col.maxWidthPx };
  if (col.size === 'hug' && hasFlexibleColumn) return { width: '1%' };
  return undefined;
}

function getCellStyle<Row>(col: CardTableColumn<Row>): CSSProperties {
  const style: CSSProperties = { textAlign: col.align ?? 'left' };
  if (col.maxWidthPx != null) {
    style.maxWidth = col.maxWidthPx;
    style.whiteSpace = 'normal';
    style.wordBreak = 'break-word';
  }
  return style;
}

export function CardTable<Row>({
  ariaLabel,
  title,
  columns,
  rows,
  rowKey,
  showHeaders = true,
  emptyState = 'span',
  emptyText = '—',
  footer,
  className,
  style,
  scrollerStyle,
  hideScrollbar = true,
  collapsible,
}: CardTableProps<Row>) {
  if (columns.length === 0) return null;

  const { expanded, toggle } = useCollapsible(collapsible);
  const resolvedRowKey = rowKey ?? ((_: Row, rowIndex: number) => rowIndex);
  const hasFlexibleColumn = columns.some((col) => col.widthPx == null && col.size !== 'hug');
  const showThead = title != null || showHeaders;

  const handleHeaderKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  const chevron = (
    <AppIcon
      name="chevron-right"
      className={cn(styles.chevron, expanded && styles.chevronExpanded)}
    />
  );

  // Custom header via render prop
  if (collapsible?.renderHeader) {
    const customHeader = collapsible.renderHeader({ expanded, toggle, chevron });
    return (
      <div className={cn(styles.card, className)} style={style}>
        <div
          className={styles.customHeader}
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          onClick={toggle}
          onKeyDown={handleHeaderKeyDown}
        >
          {customHeader}
        </div>
        <div
          className={cn(styles.collapseWrapper, expanded && styles.collapseWrapperExpanded)}
          aria-hidden={!expanded}
        >
          <div className={styles.collapseInner}>
            <TableCard scrollerStyle={scrollerStyle} hideScrollbar={hideScrollbar}>
              <table className={styles.table} aria-label={ariaLabel}>
                <colgroup>
                  {columns.map((col, colIndex) => (
                    <col key={col.key ?? colIndex} style={getColStyle(col, hasFlexibleColumn)} />
                  ))}
                </colgroup>
                {showHeaders ? (
                  <thead>
                    <tr>
                      {columns.map((col, colIndex) => (
                        <th
                          key={col.key ?? colIndex}
                          className={styles.th}
                          style={getCellStyle(col)}
                        >
                          <Text variant="caption" as="span">
                            {col.header}
                          </Text>
                        </th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {rows.length > 0 ? (
                    rows.map((row, rowIndex) => (
                      <tr key={String(resolvedRowKey(row, rowIndex))}>
                        {columns.map((col, colIndex) => (
                          <td
                            key={col.key ?? colIndex}
                            className={cn(styles.td, col.tone === 'label' && styles.labelCell)}
                            style={getCellStyle(col)}
                          >
                            {col.tone === 'label' ? (
                              <Text variant="caption">{col.cell(row, rowIndex)}</Text>
                            ) : (
                              col.cell(row, rowIndex)
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : emptyState === 'cells' ? (
                    <tr>
                      {columns.map((col, colIndex) => (
                        <td
                          key={col.key ?? colIndex}
                          className={cn(styles.td, col.tone === 'label' && styles.labelCell)}
                          style={getCellStyle(col)}
                        >
                          {col.tone === 'label' ? (
                            <Text variant="caption">{emptyText}</Text>
                          ) : (
                            emptyText
                          )}
                        </td>
                      ))}
                    </tr>
                  ) : (
                    <tr>
                      <td className={styles.td} colSpan={columns.length}>
                        {emptyText}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {footer}
            </TableCard>
          </div>
        </div>
      </div>
    );
  }

  // Standard table (no collapsible)
  return (
    <TableCard
      className={cn(styles.card, className)}
      style={style}
      scrollerStyle={scrollerStyle}
      hideScrollbar={hideScrollbar}
    >
      <table className={styles.table} aria-label={ariaLabel}>
        <colgroup>
          {columns.map((col, colIndex) => (
            <col key={col.key ?? colIndex} style={getColStyle(col, hasFlexibleColumn)} />
          ))}
        </colgroup>

        {showThead ? (
          <thead>
            {title != null ? (
              <tr>
                <th className={styles.th} colSpan={columns.length}>
                  <Text variant="caption" as="span">
                    {title}
                  </Text>
                </th>
              </tr>
            ) : null}
            {showHeaders ? (
              <tr>
                {columns.map((col, colIndex) => (
                  <th key={col.key ?? colIndex} className={styles.th} style={getCellStyle(col)}>
                    <Text variant="caption" as="span">
                      {col.header}
                    </Text>
                  </th>
                ))}
              </tr>
            ) : null}
          </thead>
        ) : null}

        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIndex) => (
              <tr key={String(resolvedRowKey(row, rowIndex))}>
                {columns.map((col, colIndex) => (
                  <td
                    key={col.key ?? colIndex}
                    className={cn(styles.td, col.tone === 'label' && styles.labelCell)}
                    style={getCellStyle(col)}
                  >
                    {col.tone === 'label' ? (
                      <Text variant="caption">{col.cell(row, rowIndex)}</Text>
                    ) : (
                      col.cell(row, rowIndex)
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : emptyState === 'cells' ? (
            <tr>
              {columns.map((col, colIndex) => (
                <td
                  key={col.key ?? colIndex}
                  className={cn(styles.td, col.tone === 'label' && styles.labelCell)}
                  style={getCellStyle(col)}
                >
                  {col.tone === 'label' ? <Text variant="caption">{emptyText}</Text> : emptyText}
                </td>
              ))}
            </tr>
          ) : (
            <tr>
              <td className={styles.td} colSpan={columns.length}>
                {emptyText}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {footer}
    </TableCard>
  );
}

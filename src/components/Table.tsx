import type { CSSProperties, ReactNode } from 'react';

import { cn } from '../lib/cn';

import styles from './Table.module.css';

export type TableVariant = 'default' | 'bordered';

export type TableColumn<Row = never> = {
  key: string | number;
  header: ReactNode;
  /** Cell renderer — required when using data-driven `rows` prop */
  cell?: (row: Row, rowIndex: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  /** Column sizing: 'hug' fits content, 'fill' takes remaining space */
  size?: 'hug' | 'fill';
  /** Fixed max width in pixels */
  maxWidthPx?: number;
};

type BaseTableProps<Row> = {
  columns: readonly TableColumn<Row>[];
  variant?: TableVariant;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  footer?: ReactNode;
};

type ChildrenTableProps<Row> = BaseTableProps<Row> & {
  children: ReactNode;
  rows?: never;
  rowKey?: never;
};

type DataDrivenTableProps<Row> = BaseTableProps<Row> & {
  children?: never;
  rows: readonly Row[];
  rowKey?: (row: Row, rowIndex: number) => string | number;
};

export type TableProps<Row = never> = ChildrenTableProps<Row> | DataDrivenTableProps<Row>;

export function Table<Row>({
  columns,
  children,
  rows,
  rowKey,
  variant = 'default',
  className,
  style,
  ariaLabel,
  footer,
}: TableProps<Row>) {
  const colStyles = columns.map((col): CSSProperties | undefined => {
    const s: CSSProperties = {};
    if (col.align) s.textAlign = col.align;
    if (col.maxWidthPx) {
      s.maxWidth = col.maxWidthPx;
      s.overflow = 'hidden';
      s.textOverflow = 'ellipsis';
    }
    if (col.size === 'hug') s.width = '1%';
    if (col.size === 'fill') s.width = '100%';
    return Object.keys(s).length > 0 ? s : undefined;
  });

  return (
    <table
      className={cn(styles.table, variant === 'bordered' && styles.bordered, className)}
      style={style}
      aria-label={ariaLabel}
    >
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={col.key} style={colStyles[i]}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows
          ? rows.map((row, rowIndex) => (
              <tr key={rowKey ? rowKey(row, rowIndex) : rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={col.key} style={colStyles[colIndex]}>
                    {col.cell?.(row, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          : children}
      </tbody>
      {footer && <tfoot><tr><td colSpan={columns.length}>{footer}</td></tr></tfoot>}
    </table>
  );
}

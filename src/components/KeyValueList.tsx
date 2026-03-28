import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import { Text } from './Text';

import styles from './KeyValueList.module.css';

export type KeyValueListItem = {
  /** Optional stable key for list rendering */
  id?: string;
  label: ReactNode;
  value: ReactNode;
};

export type KeyValueListProps = {
  /** Optional section title displayed above the list */
  title?: string;
  /** Width of label column in pixels (default: 100) */
  labelWidthPx?: number;
  /** Items to display */
  items: readonly KeyValueListItem[];
  /** Text shown when items is empty */
  emptyText?: ReactNode;
  /**
   * When true, renders full-width separators between rows (table-like grid).
   * Separators extend edge-to-edge; cells have their own padding.
   */
  separated?: boolean;
};

/**
 * Lightweight key-value list for inspector panels.
 * Unlike KeyValueTable, this has no card borders - just clean rows.
 *
 * Variants:
 * - Default: compact rows with baseline alignment
 * - Separated: table-like grid with full-width horizontal dividers and vertical cell borders
 */
export function KeyValueList({
  title,
  labelWidthPx = 100,
  items,
  emptyText,
  separated = false,
}: KeyValueListProps) {
  const isEmpty = items.length === 0;

  if (isEmpty && !emptyText && !title) {
    return null;
  }

  return (
    <div className={cn(styles.container, separated && styles.separated)}>
      {title && (
        <Text variant="label" as="div" className={styles.title}>
          {title}
        </Text>
      )}
      {isEmpty ? (
        emptyText && <span className={styles.emptyText}>{emptyText}</span>
      ) : (
        <dl
          className={styles.list}
          style={{ '--kv-label-width': `${labelWidthPx}px` } as React.CSSProperties}
        >
          {items.map((item, i) => (
            <div key={item.id ?? `item-${i}-${typeof item.label === 'string' ? item.label : i}`} className={styles.row}>
              <dt className={styles.label}>{item.label}</dt>
              <dd className={styles.value}>{item.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

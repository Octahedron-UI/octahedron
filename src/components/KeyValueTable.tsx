import type { ReactNode } from 'react';

import { CardTable } from './CardTable';
import { SkeletonBar } from './SkeletonBar';

export type KeyValueTableItem = {
  label: ReactNode;
  value: ReactNode;
};

export type KeyValueTableProps = {
  title?: ReactNode;
  ariaLabel?: string;
  labelWidthPx: number;
  items: readonly KeyValueTableItem[];
  itemKey?: (item: KeyValueTableItem, rowIndex: number) => string | number;
  emptyText?: ReactNode;
  /** When true, renders skeleton bars in the value column */
  loading?: boolean;
  /** Number of skeleton items to render when loading. When set and loading is true, overrides `items`. */
  skeletonRowCount?: number;
};

const SKELETON_ROW: KeyValueTableItem = { label: '', value: '' };

function buildSkeletonRows(count: number): readonly KeyValueTableItem[] {
  return Array.from({ length: count }, () => SKELETON_ROW);
}

export function KeyValueTable({
  title,
  ariaLabel,
  labelWidthPx,
  items,
  itemKey,
  emptyText,
  loading,
  skeletonRowCount,
}: KeyValueTableProps) {
  const effectiveRows =
    loading && skeletonRowCount != null ? buildSkeletonRows(skeletonRowCount) : items;

  return (
    <CardTable
      ariaLabel={ariaLabel ?? (typeof title === 'string' ? title : 'Details')}
      title={title}
      showHeaders={false}
      rowKey={itemKey}
      emptyText={emptyText}
      columns={[
        {
          key: 'label',
          header: 'Label',
          tone: 'label',
          widthPx: labelWidthPx,
          cell: (row) => (loading ? <SkeletonBar width="80px" /> : row.label),
        },
        {
          key: 'value',
          header: 'Value',
          size: 'fill',
          cell: (row) => (loading ? <SkeletonBar width="180px" /> : row.value),
        },
      ]}
      rows={effectiveRows}
    />
  );
}

import { useMemo } from 'react';

import { AppIcon } from './AppIcon';
import { Button } from './Button';
import { Select, type SelectOption } from './Select';
import { Text } from './Text';
import type { PaginationState } from './pagination';

import styles from './TablePaginationBar.module.css';

export type TablePaginationBarProps = {
  pagination: PaginationState;
  onSetPageSize: (pageSize: number) => void;
  onSetPage: (page: number) => void;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
};

export function TablePaginationBar({
  pagination,
  onSetPageSize,
  onSetPage,
  pageSizeOptions = [10, 25, 50, 100],
  showSizeChanger = true,
}: TablePaginationBarProps) {
  const pageSizeSelectOptions = useMemo(
    (): SelectOption[] =>
      pageSizeOptions.map((n) => ({
        value: String(n),
        label: (
          <>
            <strong>{n}</strong> Per Page
          </>
        ),
        onClick: () => onSetPageSize(n),
      })),
    [pageSizeOptions, onSetPageSize],
  );

  return (
    <div className={styles.paginationBar}>
      {showSizeChanger && (
        <Select
          options={pageSizeSelectOptions}
          value={String(pagination.pageSize)}
          position="bottom-right"
          trigger={
            <Button rightIcon={<AppIcon name="chevron-down" />}>
              <strong>{pagination.pageSize}</strong> Per Page
            </Button>
          }
        />
      )}

      <div className={styles.paginationSelector} aria-label="Pagination">
        <div className={styles.paginationRange}>
          <Text variant="caption">
            {pagination.startRow}–{pagination.endRow} of {pagination.totalRows.toLocaleString()}
          </Text>
        </div>
        <div className={styles.paginationNav}>
          <button
            type="button"
            aria-label="Previous page"
            className={styles.paginationNavButton}
            disabled={pagination.page <= 1}
            onClick={() => onSetPage(Math.max(1, pagination.page - 1))}
          >
            <AppIcon name="chevron-left" />
          </button>
          <button
            type="button"
            aria-label="Next page"
            className={styles.paginationNavButton}
            disabled={pagination.page >= pagination.pageCount}
            onClick={() => onSetPage(Math.min(pagination.pageCount, pagination.page + 1))}
          >
            <AppIcon name="chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

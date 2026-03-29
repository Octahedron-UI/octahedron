import styles from './SelectionBanner.module.css';

export type SelectionBannerProps = {
  /** Whether all items on the current page are selected */
  allPageItemsSelected: boolean;
  /** Number of items on current page */
  pageItemCount: number;
  /** Total number of items across all pages (filtered set) */
  totalFilteredCount: number;
  /** Number of items currently selected (may span pages) */
  totalSelectedCount: number;
  /** Called when user clicks "Select all X" */
  onSelectAll: () => void;
  /** Label for the items (e.g., "recommendations", "groups") */
  itemsLabel?: string;
};

/**
 * Gmail-style banner that appears when all items on current page are selected,
 * prompting user to optionally select all filtered items across pages.
 */
export function SelectionBanner({
  allPageItemsSelected,
  pageItemCount,
  totalFilteredCount,
  totalSelectedCount,
  onSelectAll,
  itemsLabel = 'items',
}: SelectionBannerProps) {
  const allFilteredSelected = totalSelectedCount >= totalFilteredCount;
  const hasMoreBeyondPage = totalFilteredCount > pageItemCount;

  // Don't show if there's nothing beyond the current page
  if (!hasMoreBeyondPage) return null;

  // Don't show if not all page items are selected
  if (!allPageItemsSelected) return null;

  // Don't show if all filtered items are already selected
  if (allFilteredSelected) return null;

  return (
    <div className={styles.banner}>
      <span>
        All {pageItemCount} {itemsLabel} on this page selected.
      </span>
      <button type="button" className={styles.link} onClick={onSelectAll}>
        Select all {totalFilteredCount} {itemsLabel}
      </button>
    </div>
  );
}

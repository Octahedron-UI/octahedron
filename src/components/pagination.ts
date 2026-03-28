export type PaginationState = {
  totalRows: number;
  pageSize: number;
  pageCount: number;
  page: number;
  startRow: number;
  endRow: number;
};

export function computePaginationState({
  totalRows,
  pageSize,
  page,
}: {
  totalRows: number;
  pageSize: number;
  page: number;
}): PaginationState {
  const safePageSize = Math.max(1, Math.floor(pageSize));
  const safeTotal = Math.max(0, Math.floor(totalRows));
  const pageCount = Math.max(1, Math.ceil(safeTotal / safePageSize));
  const safePage = Math.min(Math.max(1, Math.floor(page)), pageCount);

  const startRow = safeTotal === 0 ? 0 : (safePage - 1) * safePageSize + 1;
  const endRow = safeTotal === 0 ? 0 : Math.min(safePage * safePageSize, safeTotal);

  return {
    totalRows: safeTotal,
    pageSize: safePageSize,
    pageCount,
    page: safePage,
    startRow,
    endRow,
  };
}

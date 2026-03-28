export type TableFilterOperator =
  | 'is'
  | 'isNot'
  | 'contains'
  | 'doesNotContain'
  | 'startsWith'
  | 'endsWith'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'isNull'
  | 'isNotNull';

export type TableFilterOperatorOption = {
  value: TableFilterOperator;
  label: string;
};

const OPERATOR_LABELS = {
  is: 'is',
  isNot: 'is not',
  contains: 'contains',
  doesNotContain: 'does not contain',
  startsWith: 'starts with',
  endsWith: 'ends with',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  isNull: 'is empty',
  isNotNull: 'is not empty',
} satisfies Record<TableFilterOperator, string>;

const OPERATOR_OPTIONS_TEXT: TableFilterOperatorOption[] = [
  { value: 'is', label: OPERATOR_LABELS.is },
  { value: 'isNot', label: OPERATOR_LABELS.isNot },
  { value: 'contains', label: OPERATOR_LABELS.contains },
  { value: 'doesNotContain', label: OPERATOR_LABELS.doesNotContain },
  { value: 'startsWith', label: OPERATOR_LABELS.startsWith },
  { value: 'endsWith', label: OPERATOR_LABELS.endsWith },
];

const OPERATOR_OPTIONS_SELECT: TableFilterOperatorOption[] = [
  { value: 'is', label: OPERATOR_LABELS.is },
  { value: 'isNot', label: OPERATOR_LABELS.isNot },
];

const OPERATOR_OPTIONS_NUMBER: TableFilterOperatorOption[] = [
  { value: 'is', label: '=' },
  { value: 'isNot', label: '!=' },
  { value: 'gt', label: OPERATOR_LABELS.gt },
  { value: 'gte', label: OPERATOR_LABELS.gte },
  { value: 'lt', label: OPERATOR_LABELS.lt },
  { value: 'lte', label: OPERATOR_LABELS.lte },
  { value: 'isNull', label: OPERATOR_LABELS.isNull },
  { value: 'isNotNull', label: OPERATOR_LABELS.isNotNull },
];

export type FilterCombinator = 'and' | 'or';

export type TableFilter<ColumnId extends string> = {
  id: string;
  columnId: ColumnId;
  operator: TableFilterOperator;
  value: string;
  combinator: FilterCombinator;
};

export type TableFilterValueInput = 'select' | 'text' | 'number';

export type TableFilterColumnDef<Row, ColumnId extends string> = {
  id: ColumnId;
  label: string;
  valueInput: TableFilterValueInput;
  getValues: (row: Row) => string[];
  getNumberValues?: (row: Row) => number[];
};

export function formatTableFilterOperator(operator: TableFilterOperator): string {
  return OPERATOR_LABELS[operator];
}

export function listTableFilterOperators(
  valueInput: TableFilterValueInput,
): readonly TableFilterOperatorOption[] {
  if (valueInput === 'select') return OPERATOR_OPTIONS_SELECT;
  if (valueInput === 'number') return OPERATOR_OPTIONS_NUMBER;
  return OPERATOR_OPTIONS_TEXT;
}

export function normalizeFilterToken(value: string) {
  return value.trim().toLowerCase();
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

export function listColumnOptions<Row>(rows: readonly Row[], getValues: (row: Row) => string[]) {
  const values = rows
    .flatMap((r) => getValues(r))
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
  return uniqueSorted(values);
}

function parseFilterNumber(value: string): number | null {
  const raw = value.trim();
  if (!raw.length) return null;

  const normalized = raw.replace(/[,_]/g, '');
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

export function rowMatchesFilter<Row, ColumnId extends string>(
  row: Row,
  filter: TableFilter<ColumnId>,
  columnsById: Record<ColumnId, TableFilterColumnDef<Row, ColumnId>>,
) {
  const column = columnsById[filter.columnId];

  // Handle isNull/isNotNull operators (no value needed)
  if (filter.operator === 'isNull' || filter.operator === 'isNotNull') {
    const rawValues = column.getNumberValues ? column.getNumberValues(row) : column.getValues(row);
    const hasValue = rawValues.length > 0 && rawValues.some((v) => v != null && v !== '');
    return filter.operator === 'isNull' ? !hasValue : hasValue;
  }

  const desired = normalizeFilterToken(filter.value);
  if (!desired.length) return true;

  const useNumeric =
    column.valueInput === 'number' &&
    (filter.operator === 'is' ||
      filter.operator === 'isNot' ||
      filter.operator === 'gt' ||
      filter.operator === 'gte' ||
      filter.operator === 'lt' ||
      filter.operator === 'lte');

  if (useNumeric) {
    const desiredNumber = parseFilterNumber(filter.value);
    if (desiredNumber == null) return true;

    const rawValues = column.getNumberValues
      ? column.getNumberValues(row)
      : column
          .getValues(row)
          .map(parseFilterNumber)
          .filter((v): v is number => v != null);

    const numericValues = rawValues.filter((v) => Number.isFinite(v));

    switch (filter.operator) {
      case 'is':
        return numericValues.some((value) => value === desiredNumber);
      case 'isNot':
        return numericValues.every((value) => value !== desiredNumber);
      case 'gt':
        return numericValues.some((value) => value > desiredNumber);
      case 'gte':
        return numericValues.some((value) => value >= desiredNumber);
      case 'lt':
        return numericValues.some((value) => value < desiredNumber);
      case 'lte':
        return numericValues.some((value) => value <= desiredNumber);
    }
  }

  const normalizedValues = column.getValues(row).map((v) => normalizeFilterToken(v));

  switch (filter.operator) {
    case 'is':
      return normalizedValues.some((value) => value === desired);
    case 'isNot':
      return normalizedValues.every((value) => value !== desired);
    case 'contains':
      return normalizedValues.some((value) => value.includes(desired));
    case 'doesNotContain':
      return normalizedValues.every((value) => !value.includes(desired));
    case 'startsWith':
      return normalizedValues.some((value) => value.startsWith(desired));
    case 'endsWith':
      return normalizedValues.some((value) => value.endsWith(desired));
    case 'gt':
    case 'gte':
    case 'lt':
    case 'lte':
      return true;
  }
}

/**
 * Evaluate whether a row matches all filters with AND/OR combinator support.
 * Evaluation is left-to-right: A AND B OR C = ((A AND B) OR C).
 * First filter's combinator is ignored (treated as initial condition).
 */
export function rowMatchesFilters<Row, ColumnId extends string>(
  row: Row,
  filters: readonly TableFilter<ColumnId>[],
  columnsById: Record<ColumnId, TableFilterColumnDef<Row, ColumnId>>,
): boolean {
  if (filters.length === 0) return true;

  let result = rowMatchesFilter(row, filters[0], columnsById);

  for (let i = 1; i < filters.length; i++) {
    const filter = filters[i];
    const matches = rowMatchesFilter(row, filter, columnsById);
    const combinator = filter.combinator ?? 'and';

    if (combinator === 'or') {
      result = result || matches;
    } else {
      result = result && matches;
    }
  }

  return result;
}

export function createFilterId() {
  return (
    globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
}

// URL filter serialization format: columnId:operator:value
// Examples:
//   daysUntilDue:lt:0        → days until due < 0 (overdue)
//   daysUntilDue:lte:7       → days until due <= 7
//   daysUntilDue:isNull:     → no due date
//   coverage:is:uncovered    → coverage is uncovered

const ALL_OPERATORS: TableFilterOperator[] = [
  'is',
  'isNot',
  'contains',
  'doesNotContain',
  'startsWith',
  'endsWith',
  'gt',
  'gte',
  'lt',
  'lte',
  'isNull',
  'isNotNull',
];

export function serializeFilter<ColumnId extends string>(
  filter: TableFilter<ColumnId>,
  options?: { includeCombinator?: boolean },
): string {
  const includeCombinator = options?.includeCombinator ?? false;
  const prefix = includeCombinator && filter.combinator === 'or' ? 'or:' : '';

  // For isNull/isNotNull, no value is needed
  if (filter.operator === 'isNull' || filter.operator === 'isNotNull') {
    return `${prefix}${filter.columnId}:${filter.operator}`;
  }
  return `${prefix}${filter.columnId}:${filter.operator}:${filter.value}`;
}

export function parseFilter<ColumnId extends string>(
  param: string,
  validColumnIds: readonly ColumnId[],
): TableFilter<ColumnId> | null {
  // Check for combinator prefix (or:)
  let combinator: FilterCombinator = 'and';
  let remainder = param;

  if (param.startsWith('or:')) {
    combinator = 'or';
    remainder = param.slice(3);
  }

  // Split on first two colons only (value may contain colons)
  const firstColon = remainder.indexOf(':');
  if (firstColon === -1) return null;

  const columnId = remainder.slice(0, firstColon) as ColumnId;
  if (!validColumnIds.includes(columnId)) return null;

  const rest = remainder.slice(firstColon + 1);
  const secondColon = rest.indexOf(':');

  let operator: TableFilterOperator;
  let value: string;

  if (secondColon === -1) {
    // No value part (for isNull/isNotNull)
    operator = rest as TableFilterOperator;
    value = '';
  } else {
    operator = rest.slice(0, secondColon) as TableFilterOperator;
    value = rest.slice(secondColon + 1);
  }

  if (!ALL_OPERATORS.includes(operator)) return null;

  return {
    id: createFilterId(),
    columnId,
    operator,
    value,
    combinator,
  };
}

export function serializeFiltersToParams<ColumnId extends string>(
  filters: TableFilter<ColumnId>[],
): URLSearchParams {
  const params = new URLSearchParams();
  for (let i = 0; i < filters.length; i++) {
    // Include combinator prefix for all filters after the first
    params.append('filter', serializeFilter(filters[i], { includeCombinator: i > 0 }));
  }
  return params;
}

export function parseFiltersFromParams<ColumnId extends string>(
  params: URLSearchParams,
  validColumnIds: readonly ColumnId[],
): TableFilter<ColumnId>[] {
  const filters: TableFilter<ColumnId>[] = [];
  for (const param of params.getAll('filter')) {
    const filter = parseFilter(param, validColumnIds);
    if (filter) filters.push(filter);
  }
  return filters;
}

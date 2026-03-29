import { useMemo, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../lib/cn';
import { deterministicColorVars } from '../lib/deterministic-colors';
import { AppIcon, ChevronDown as ChevronDownIcon } from './AppIcon';
import { Input } from './Input';
import { Select, type SelectOption } from './Select';
import styles from './FilterPill.module.css';

export type FilterPillOption = {
  value: string;
  label: ReactNode;
};

export type FilterPillSelect = {
  value: string;
  label: ReactNode;
  options: readonly FilterPillOption[];
  onValueChange: (nextValue: string) => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * Value configuration for FilterPill.
 *
 * - `kind: 'select'` — dropdown with predefined options
 * - `kind: 'text'` — free-text input
 * - `kind: 'none'` — no value input (for operators like isNull/isNotNull)
 */
export type FilterPillSelectValue = {
  kind: 'select';
  value: string;
  label: ReactNode;
  options: readonly FilterPillOption[];
  onValueChange: (nextValue: string) => void;
  disabled?: boolean;
  ariaLabel?: string;
  title?: string;
};

export type FilterPillTextValue = {
  kind: 'text';
  value: string;
  placeholder?: string;
  onValueChange: (nextValue: string) => void;
  disabled?: boolean;
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode'];
  /** Restrict input to numeric characters only (digits, minus, decimal point) */
  numeric?: boolean;
  ariaLabel?: string;
  title?: string;
  autoFocus?: boolean;
};

export type FilterPillNoneValue = {
  kind: 'none';
};

export type FilterPillValue = FilterPillSelectValue | FilterPillTextValue | FilterPillNoneValue;

export type FilterPillProps = {
  column: FilterPillSelect;
  operator: FilterPillSelect;
  value: FilterPillValue;
  valueColorSeed?: string;
  onRemove?: () => void;
  removeLabel?: string;
  className?: string;
  title?: string;
};

function toSelectOptions(
  options: readonly FilterPillOption[],
  onValueChange: (value: string) => void,
): SelectOption[] {
  return options.map((option) => ({
    value: option.value,
    label: option.label,
    onClick: () => onValueChange(option.value),
  }));
}

export function FilterPill({
  column,
  operator,
  value,
  valueColorSeed,
  onRemove,
  removeLabel,
  className,
  title,
}: FilterPillProps) {
  const columnOptions = useMemo(
    () => toSelectOptions(column.options, column.onValueChange),
    [column.options, column.onValueChange],
  );

  const operatorOptions = useMemo(
    () => toSelectOptions(operator.options, operator.onValueChange),
    [operator.options, operator.onValueChange],
  );

  const valueOptions = useMemo(
    () => (value.kind === 'select' ? toSelectOptions(value.options, value.onValueChange) : []),
    [value],
  );

  const valueColorStyle = useMemo(
    () =>
      value.kind === 'select' ? deterministicColorVars(valueColorSeed ?? value.value) : undefined,
    [value, valueColorSeed],
  );

  return (
    <span className={cn(styles.pill, className)} title={title}>
      <Select
        options={columnOptions}
        value={column.value}
        position="bottom-left"
        disabled={column.disabled || column.options.length === 0}
        menuClassName={styles.menu}
        trigger={
          <button
            type="button"
            className={cn(styles.segment, styles.segmentButton, styles.columnSegment)}
            aria-label={column.ariaLabel ?? 'Change filter property'}
            disabled={column.disabled || column.options.length === 0}
          >
            <span className={styles.segmentText}>{column.label}</span>
            <ChevronDownIcon className={styles.chevronIcon} aria-hidden />
          </button>
        }
      />

      <Select
        options={operatorOptions}
        value={operator.value}
        position="bottom"
        disabled={operator.disabled || operator.options.length === 0}
        menuClassName={styles.menu}
        trigger={
          <button
            type="button"
            className={cn(styles.segment, styles.segmentButton, styles.operatorSegment)}
            aria-label={operator.ariaLabel ?? 'Change filter operator'}
            disabled={operator.disabled || operator.options.length === 0}
          >
            <span className={styles.segmentText}>{operator.label}</span>
            <ChevronDownIcon className={styles.chevronIcon} aria-hidden />
          </button>
        }
      />

      {value.kind === 'none' ? null : value.kind === 'select' ? (
        <Select
          options={valueOptions}
          value={value.value}
          position="bottom-left"
          disabled={value.disabled || value.options.length === 0}
          menuClassName={styles.menu}
          trigger={
            <button
              type="button"
              className={cn(styles.segment, styles.segmentButton, styles.valueSelectSegment)}
              style={valueColorStyle}
              aria-label={value.ariaLabel ?? 'Change filter value'}
              title={value.title}
              disabled={value.disabled || value.options.length === 0}
            >
              <span className={styles.segmentText}>{value.label}</span>
              <ChevronDownIcon className={styles.chevronIcon} aria-hidden />
            </button>
          }
        />
      ) : (
        <span className={cn(styles.segment, styles.valueSegment)}>
          <Input
            filled
            compact
            value={value.value}
            onValueChange={(nextValue) => {
              if (value.numeric) {
                const cleaned = nextValue.replace(/[^0-9.\-,]/g, '');
                if (cleaned !== nextValue) {
                  value.onValueChange(cleaned);
                  return;
                }
              }
              value.onValueChange(nextValue);
            }}
            placeholder={value.placeholder ?? 'Value'}
            aria-label={value.ariaLabel ?? 'Change filter value'}
            inputMode={value.inputMode}
            title={value.title}
            autoFocus={value.autoFocus}
            disabled={value.disabled}
            onBlur={(e) => {
              const trimmed = e.currentTarget.value.trim();
              if (trimmed === e.currentTarget.value) return;
              value.onValueChange(trimmed);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                e.currentTarget.blur();
                return;
              }
              if (value.numeric && !e.metaKey && !e.ctrlKey) {
                const allowedKeys = [
                  'Backspace',
                  'Delete',
                  'ArrowLeft',
                  'ArrowRight',
                  'Tab',
                  'Home',
                  'End',
                ];
                const isDigit = /^[0-9]$/.test(e.key);
                const isNumericChar = e.key === '.' || e.key === '-' || e.key === ',';
                if (!allowedKeys.includes(e.key) && !isDigit && !isNumericChar) {
                  e.preventDefault();
                }
              }
            }}
          />
        </span>
      )}

      {onRemove ? (
        <button
          type="button"
          className={styles.removeButton}
          aria-label={removeLabel ?? 'Remove filter'}
          onClick={onRemove}
        >
          <AppIcon name="cross" className={styles.removeIcon} />
        </button>
      ) : null}
    </span>
  );
}

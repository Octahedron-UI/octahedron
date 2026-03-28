import { useLayoutEffect, useRef } from 'react';

import { Check, Minus } from './AppIcon';
import { cn } from '../lib/cn';
import styles from './TableSelectionCheckbox.module.css';

type TableSelectionCheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  fill?: boolean;
  ariaLabel: string;
  onValueChange: (checked: boolean) => void;
};

export function TableSelectionCheckbox({
  checked,
  indeterminate = false,
  disabled = false,
  fill = false,
  ariaLabel,
  onValueChange,
}: TableSelectionCheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const effectiveChecked = checked && !indeterminate;

  useLayoutEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={cn(styles.label, fill && styles.fill, disabled && styles.disabled)}>
      <input
        ref={inputRef}
        type="checkbox"
        className={styles.input}
        checked={effectiveChecked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => {
          const nextChecked = e.currentTarget.checked;
          if (indeterminate && nextChecked) {
            onValueChange(false);
            return;
          }
          onValueChange(nextChecked);
        }}
      />
      <div className={styles.box} aria-hidden>
        {indeterminate ? (
          <Minus className={styles.icon} size={10} strokeWidth={4} />
        ) : effectiveChecked ? (
          <Check className={styles.icon} size={10} strokeWidth={4} />
        ) : null}
      </div>
    </label>
  );
}


import { useLayoutEffect, useMemo, useRef, type ReactNode } from 'react';

import { Check, Minus } from './AppIcon';
import { cn } from '../lib/cn';
import styles from './Checkbox.module.css';

export type CheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  fill?: boolean;
  ariaLabel?: string;
  label?: ReactNode;
  /** Callback when checked state changes */
  onValueChange?: (checked: boolean) => void;
  className?: string;
  labelClassName?: string;
};

export function Checkbox({
  checked,
  indeterminate = false,
  disabled = false,
  fill = false,
  ariaLabel,
  label,
  onValueChange,
  className,
  labelClassName,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const effectiveChecked = checked && !indeterminate;

  useLayoutEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const derivedAriaLabel = useMemo(() => {
    if (ariaLabel) return ariaLabel;
    if (typeof label === 'string') return label;
    return 'Checkbox';
  }, [ariaLabel, label]);

  return (
    <label className={cn(styles.root, disabled && styles.disabled, fill && styles.fill, className)}>
      <span className={styles.control} aria-hidden>
        <input
          ref={inputRef}
          type="checkbox"
          className={styles.input}
          checked={effectiveChecked}
          disabled={disabled}
          aria-label={derivedAriaLabel}
          onChange={(e) => {
            const nextChecked = e.currentTarget.checked;
            if (indeterminate && nextChecked) {
              onValueChange?.(true);
              return;
            }
            onValueChange?.(nextChecked);
          }}
        />
        <span className={styles.box} aria-hidden>
          {indeterminate ? (
            <Minus className={styles.icon} size={10} strokeWidth={4} />
          ) : effectiveChecked ? (
            <Check className={styles.icon} size={10} strokeWidth={4} />
          ) : null}
        </span>
      </span>
      {label != null ? <span className={cn(styles.text, labelClassName)}>{label}</span> : null}
    </label>
  );
}

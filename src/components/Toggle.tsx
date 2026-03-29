import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './Toggle.module.css';

export type ToggleProps = {
  checked: boolean;
  /** Callback when toggled */
  onValueChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

export function Toggle({ checked, onValueChange, label, disabled = false, className, 'aria-label': ariaLabel }: ToggleProps) {
  return (
    <label className={cn(styles.root, disabled && styles.disabled, className)}>
      <span className={styles.track} data-checked={checked}>
        <input
          type="checkbox"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onValueChange?.(e.currentTarget.checked)}
          aria-label={label == null ? ariaLabel : undefined}
        />
        <span className={styles.thumb} />
      </span>
      {label != null ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './Selectable.module.css';

export type SelectableProps = {
  /** Whether this item is currently selected */
  selected?: boolean;
  /** Called when selection state changes */
  onValueChange?: (selected: boolean) => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'children'>;

export function Selectable({
  selected = false,
  onValueChange,
  disabled,
  className,
  children,
  ...rest
}: SelectableProps) {
  return (
    <button
      type="button"
      className={cn(styles.selectable, className)}
      data-selected={selected || undefined}
      disabled={disabled}
      onClick={() => onValueChange?.(!selected)}
      aria-pressed={selected}
      {...rest}
    >
      {children}
    </button>
  );
}

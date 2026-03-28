import type { InputHTMLAttributes } from 'react';

import { SearchLg as SearchIcon, X as ClearIcon } from './AppIcon';
import { cn } from '../lib/cn';
import styles from './SearchInput.module.css';

export type SearchInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
> & {
  id: string;
  value: string;
  onValueChange: (nextValue: string) => void;
  showClear?: boolean;
};

export function SearchInput({
  id,
  value,
  onValueChange,
  className,
  placeholder = 'Search',
  showClear = true,
  ...props
}: SearchInputProps) {
  return (
    <label htmlFor={id} className={cn(styles.search, className)}>
      <span className={styles.iconSlot} aria-hidden>
        <SearchIcon className={styles.icon} />
      </span>
      <input
        {...props}
        id={id}
        value={value}
        placeholder={placeholder}
        size={placeholder.length}
        className={styles.input}
        onChange={(e) => onValueChange(e.currentTarget.value)}
      />
      {showClear && value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={() => onValueChange('')}
          aria-label="Clear search"
        >
          <ClearIcon className={styles.icon} />
        </button>
      )}
    </label>
  );
}

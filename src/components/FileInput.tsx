import { useCallback, useRef, type FormEvent, type InputHTMLAttributes } from 'react';

import { cn } from '../lib/cn';
import styles from './FileInput.module.css';

export type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  text?: string;
  hasSelection?: boolean;
  fill?: boolean;
  onInputChange?: (e: FormEvent<HTMLInputElement>) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export function FileInput({
  text = 'Choose file...',
  hasSelection = false,
  fill = false,
  disabled,
  onInputChange,
  inputProps,
  className,
  ...props
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled],
  );

  // Strip props that would conflict with values this component must control.
  const {
    type: _type,
    disabled: _disabled,
    onChange: _onChange,
    className: _className,
    'aria-hidden': _ariaHidden,
    ...safeInputProps
  } = inputProps ?? {};

  return (
    <div
      className={cn(styles.container, fill && styles.fill, disabled && styles.disabled, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={text}
      aria-disabled={disabled || undefined}
      data-has-selection={hasSelection || undefined}
    >
      <input
        {...props}
        {...safeInputProps}
        ref={inputRef}
        type="file"
        disabled={disabled}
        onChange={onInputChange}
        className={styles.input}
        aria-hidden="true"
      />
      <span className={cn(styles.text, hasSelection && styles.textSelected)}>{text}</span>
      <span className={styles.button}>Browse</span>
    </div>
  );
}

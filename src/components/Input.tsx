import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type InputHTMLAttributes,
} from 'react';

import { useUncontrolledInput } from '../lib/useInputControl';
import { cn } from '../lib/cn';
import styles from './Input.module.css';

export type InputProps = {
  /** Inline mode: auto-sizes to content, no border */
  filled?: boolean;
  /** Compact size for dense UIs */
  compact?: boolean;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value (for native undo support) */
  defaultValue?: string;
  /** Callback when value changes (controlled mode) - extracts string from event */
  onValueChange?: (nextValue: string) => void;
  /** Full width (only applies to bordered mode) */
  fill?: boolean;
  /** Input type */
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  style?: CSSProperties;
  inputClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>;

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

/**
 * Input component that supports both controlled and uncontrolled patterns.
 *
 * For native browser undo to work correctly (undoing in word chunks rather than
 * single characters), use the uncontrolled pattern with defaultValue + ref + onBlur.
 *
 * IMPORTANT: For uncontrolled inputs, this component sets the initial value
 * imperatively via ref instead of using React's defaultValue prop. This ensures
 * consistent behavior with TextArea and preserves native undo.
 * See: https://github.com/facebook/react/issues/8514
 *
 * @example
 * // Controlled (standard React pattern)
 * <Input value={text} onValueChange={setText} />
 *
 * @example
 * // Uncontrolled (for native undo support)
 * <Input
 *   ref={inputRef}
 *   defaultValue={initialText}
 *   onBlur={(e) => syncValue(e.currentTarget.value)}
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    filled = false,
    compact = false,
    value,
    defaultValue,
    onValueChange,
    onChange,
    fill = false,
    type = 'text',
    className,
    style,
    inputClassName,
    placeholder,
    ...props
  },
  ref,
) {
  // Filled mode - always controlled, uses separate component
  if (filled) {
    return (
      <FilledInput
        {...props}
        ref={ref}
        type={type}
        value={value ?? defaultValue ?? ''}
        onValueChange={onValueChange}
        onChange={onChange}
        compact={compact}
        className={className}
        style={style}
        inputClassName={inputClassName}
        placeholder={placeholder}
      />
    );
  }

  // Bordered mode - supports uncontrolled with imperative initialization
  return (
    <BorderedInput
      {...props}
      ref={ref}
      type={type}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onChange={onChange}
      compact={compact}
      fill={fill}
      className={className}
      style={style}
      inputClassName={inputClassName}
      placeholder={placeholder}
    />
  );
});

type BorderedInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  type: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (nextValue: string) => void;
  compact: boolean;
  fill: boolean;
  className?: string;
  style?: CSSProperties;
  inputClassName?: string;
};

const BorderedInput = forwardRef<HTMLInputElement, BorderedInputProps>(function BorderedInput(
  {
    type,
    value,
    defaultValue,
    onValueChange,
    onChange,
    compact,
    fill,
    className,
    style,
    inputClassName,
    placeholder,
    ...props
  },
  ref,
) {
  const { isControlled, handleChange, localRef } = useUncontrolledInput({
    value,
    defaultValue,
    onValueChange,
    onChange,
  });

  // Forward the ref so callers can access the input element
  useImperativeHandle(ref, () => localRef.current!, [localRef]);

  return (
    <input
      {...props}
      ref={localRef}
      type={type}
      {...(isControlled && { value })}
      placeholder={placeholder}
      onChange={handleChange}
      className={cn(
        styles.bordered,
        compact && styles.compact,
        fill && styles.fill,
        className,
        inputClassName,
      )}
      style={style}
    />
  );
});

type FilledInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'size'> & {
  type: string;
  value: string;
  onValueChange?: (nextValue: string) => void;
  compact: boolean;
  className?: string;
  style?: CSSProperties;
  inputClassName?: string;
};

/**
 * Filled/inline input mode - always controlled, auto-sizes to content.
 */
const FilledInput = forwardRef<HTMLInputElement, FilledInputProps>(function FilledInput(
  {
    type,
    value,
    onValueChange,
    onChange,
    compact,
    className,
    style,
    inputClassName,
    placeholder,
    ...props
  },
  ref,
) {
  const measureText = useMemo(() => {
    return value.length ? value : (placeholder ?? '');
  }, [placeholder, value]);

  const measureValue = measureText.length ? measureText : ' ';
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [inputWidthPx, setInputWidthPx] = useState<number>(() => {
    const placeholderLength = placeholder?.length ?? 0;
    const contentLength = value.length ? value.length : placeholderLength;
    const sizeMax = compact ? 24 : 32;
    return clamp(Math.max(contentLength, 1), 1, sizeMax) * 8;
  });

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const nextWidth = Math.ceil(el.getBoundingClientRect().width);
      setInputWidthPx((prev) => (prev === nextWidth ? prev : nextWidth));
    };

    // ResizeObserver fires when the element goes from display:none → visible,
    // which getBoundingClientRect alone misses (returns 0 while hidden).
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();

    return () => observer.disconnect();
  }, [measureValue, compact]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.currentTarget.value);
    onChange?.(e);
  };

  return (
    <label className={cn(styles.filled, compact && styles.compact, className)} style={style}>
      <span ref={measureRef} className={styles.measure} aria-hidden>
        {measureValue}
      </span>
      <input
        {...props}
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        className={cn(styles.filledInput, inputClassName)}
        style={{ width: inputWidthPx }}
        onChange={handleChange}
      />
    </label>
  );
});

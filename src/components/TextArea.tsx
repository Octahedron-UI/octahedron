import {
  forwardRef,
  useImperativeHandle,
  type CSSProperties,
  type TextareaHTMLAttributes,
} from 'react';

import { useUncontrolledInput } from '../lib/useInputControl';
import { cn } from '../lib/cn';
import inputStyles from './input-styles.module.css';
import styles from './TextArea.module.css';

type TextAreaProps = {
  /** Badge mode: inline style with auto-height, no border */
  badge?: boolean;
  /** Badge variant size */
  badgeVariant?: 'default' | 'compressed';
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value (for native undo support) */
  defaultValue?: string;
  /** Callback when value changes - extracts string from event */
  onValueChange?: (nextValue: string) => void;
  /** Custom class for the textarea element itself */
  inputClassName?: string;
  className?: string;
  style?: CSSProperties;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>;

/**
 * TextArea component that supports both controlled and uncontrolled patterns.
 *
 * For native browser undo to work correctly (undoing in word chunks rather than
 * single characters), use the uncontrolled pattern with defaultValue + ref + onBlur.
 * Do NOT pass value or onChange for uncontrolled textareas.
 *
 * IMPORTANT: For uncontrolled textareas, this component sets the initial value
 * imperatively via ref instead of using React's defaultValue prop. This is because
 * React's handling of textarea defaultValue can interfere with Chrome's native
 * undo buffer. See: https://github.com/facebook/react/issues/8514
 *
 * @example
 * // Controlled (standard React pattern)
 * <TextArea value={text} onValueChange={setText} />
 *
 * @example
 * // Uncontrolled (for native undo support)
 * <TextArea
 *   ref={textareaRef}
 *   defaultValue={initialText}
 *   onBlur={(e) => syncValue(e.currentTarget.value)}
 * />
 *
 * @example
 * // Badge variant (inline editable field)
 * <TextArea badge value={text} onValueChange={setText} />
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    badge = false,
    badgeVariant = 'default',
    value,
    defaultValue,
    onValueChange,
    onChange,
    className,
    style,
    inputClassName,
    rows = 3,
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

  // Forward the ref so callers can access the textarea element
  useImperativeHandle(ref, () => localRef.current!, [localRef]);

  // Standard bordered mode (default) - uses shared input styles
  if (!badge) {
    return (
      <textarea
        {...props}
        ref={localRef}
        rows={rows}
        {...(isControlled && { value })}
        onChange={handleChange}
        className={cn(inputStyles.textarea, className, inputClassName)}
        style={style}
      />
    );
  }

  // Badge mode - inline style with wrapper span
  const variantClass = badgeVariant === 'compressed' ? styles.compressed : styles.default;

  return (
    <span className={cn(styles.badge, variantClass, className)} style={style}>
      <textarea
        {...props}
        ref={localRef}
        rows={rows}
        {...(isControlled && { value })}
        onChange={handleChange}
        className={cn(styles.textarea, inputClassName)}
      />
    </span>
  );
});

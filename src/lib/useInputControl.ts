import { useEffect, useRef, type ChangeEvent, type RefObject } from 'react';

type InputElement = HTMLInputElement | HTMLTextAreaElement;

interface UseInputControlOptions<T extends InputElement> {
  /** Controlled value (undefined = uncontrolled mode) */
  value: string | undefined;
  /** Uncontrolled initial value */
  defaultValue: string | undefined;
  /** Callback when value changes - extracts string from event */
  onValueChange: ((value: string) => void) | undefined;
  /** Native onChange handler */
  onChange: ((e: ChangeEvent<T>) => void) | undefined;
}

interface UseInputControlResult<T extends InputElement> {
  /** Whether the input is in controlled mode */
  isControlled: boolean;
  /** Change handler (undefined if no handlers provided) */
  handleChange: ((e: ChangeEvent<T>) => void) | undefined;
  /** Local ref for imperative operations */
  localRef: RefObject<T>;
  /** Has the initial value been set imperatively */
  initializedRef: RefObject<boolean>;
}

/**
 * Hook for managing controlled/uncontrolled input state.
 *
 * ## Why This Hook Exists
 *
 * React handles `<input>` and `<textarea>` elements differently during reconciliation.
 * For textareas especially, passing `value={undefined}` or using React's `defaultValue`
 * can interfere with Chrome's native undo buffer, causing undo to only remove single
 * characters instead of word chunks.
 *
 * See: https://github.com/facebook/react/issues/8514
 *
 * ## What This Hook Does
 *
 * 1. **Determines controlled vs uncontrolled mode** based on whether `value` is defined
 * 2. **Creates a unified change handler** that calls both `onValueChange` and `onChange`
 * 3. **Provides refs for imperative initialization** to bypass React's defaultValue handling
 *
 * ## Usage Pattern
 *
 * For uncontrolled inputs that preserve native undo:
 * ```tsx
 * const { isControlled, handleChange, localRef, initializedRef } = useInputControl({
 *   value, defaultValue, onValueChange, onChange
 * });
 *
 * // Set initial value imperatively (bypasses React's defaultValue)
 * useEffect(() => {
 *   if (!isControlled && localRef.current && !initializedRef.current) {
 *     localRef.current.value = defaultValue ?? '';
 *     initializedRef.current = true;
 *   }
 * }, []);
 *
 * return (
 *   <input
 *     ref={localRef}
 *     {...(isControlled && { value })}
 *     onChange={handleChange}
 *   />
 * );
 * ```
 */
export function useInputControl<T extends InputElement>({
  value,
  onValueChange,
  onChange,
}: UseInputControlOptions<T>): UseInputControlResult<T> {
  const localRef = useRef<T>(null);
  const initializedRef = useRef(false);

  const isControlled = value !== undefined;

  // Only create handler when there's actually a callback
  const hasHandler = onValueChange !== undefined || onChange !== undefined;

  const handleChange = hasHandler
    ? (e: ChangeEvent<T>) => {
        onValueChange?.(e.currentTarget.value);
        onChange?.(e);
      }
    : undefined;

  return {
    isControlled,
    handleChange,
    localRef: localRef as RefObject<T>,
    initializedRef,
  };
}

/**
 * Effect hook for imperatively setting initial value on uncontrolled inputs.
 * This bypasses React's defaultValue handling which can break Chrome's native undo buffer.
 *
 * @param isControlled - Whether the input is in controlled mode
 * @param localRef - Ref to the input element
 * @param initializedRef - Ref tracking if initialization has occurred
 * @param defaultValue - The initial value to set
 */
export function useImperativeDefaultValue<T extends InputElement>(
  isControlled: boolean,
  localRef: RefObject<T>,
  initializedRef: RefObject<boolean>,
  defaultValue: string | undefined,
): void {
  // Run once on mount to imperatively set initial value, bypassing React's
  // defaultValue which can break Chrome's native undo buffer.
  useEffect(() => {
    if (!isControlled && localRef.current && !initializedRef.current) {
      localRef.current.value = defaultValue ?? '';
      (initializedRef as { current: boolean }).current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Combined hook that handles both control state and imperative initialization.
 * Use this for the common case where you want the full uncontrolled input pattern.
 */
export function useUncontrolledInput<T extends InputElement>(
  options: UseInputControlOptions<T> & { defaultValue: string | undefined },
): UseInputControlResult<T> {
  const result = useInputControl<T>(options);

  useImperativeDefaultValue(
    result.isControlled,
    result.localRef,
    result.initializedRef,
    options.defaultValue,
  );

  return result;
}

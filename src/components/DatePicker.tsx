import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
} from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  FloatingFocusManager,
} from '@floating-ui/react';

import { useFloatingPortalRoot } from './FloatingPortalProvider';
import { cn } from '../lib/cn';
import {
  WEEKDAY_LABELS,
  MONTH_NAMES,
  getCalendarGrid,
  formatDateString,
  parseDateString,
  formatInputDate,
  formatDateMask,
  extractDateDigits,
  parseMaskedDate,
  isSameDay,
  isToday,
  addMonths,
  addYears,
  isBefore,
  isAfter,
} from '../lib/calendar-utils';
import { AppIcon } from './AppIcon';

import styles from './DatePicker.module.css';

export type DatePickerProps = {
  /** Current value in YYYY-MM-DD format */
  value?: string;
  /** Callback when the selected date changes (YYYY-MM-DD string, or empty string when cleared) */
  onValueChange?: (value: string) => void;
  /** Minimum selectable date (YYYY-MM-DD) */
  min?: string;
  /** Maximum selectable date (YYYY-MM-DD) */
  max?: string;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS class */
  className?: string;
  /** Fill container width */
  fill?: boolean;
};

export function DatePicker({
  value = '',
  onValueChange,
  min,
  max,
  placeholder = 'MM/DD/YYYY',
  disabled = false,
  id,
  className,
  fill = false,
}: DatePickerProps) {
  const portalRoot = useFloatingPortalRoot();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Local input text (masked format)
  const [inputText, setInputText] = useState(() => {
    const parsed = parseDateString(value);
    return parsed ? formatInputDate(parsed) : '';
  });

  // Parse constraints
  const minDate = useMemo(() => parseDateString(min ?? ''), [min]);
  const maxDate = useMemo(() => parseDateString(max ?? ''), [max]);

  // Current displayed month (for navigation)
  const [viewDate, setViewDate] = useState<Date>(() => {
    const parsed = parseDateString(value);
    return parsed ?? new Date();
  });

  // Sync inputText when value changes externally — done during render
  // (not useEffect) so React re-renders before painting, avoiding flash
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    const parsed = parseDateString(value);
    if (parsed) {
      setInputText(formatInputDate(parsed));
      setViewDate(parsed);
    } else {
      setInputText('');
    }
  }

  // Reset view to selected date when opening
  useEffect(() => {
    if (open) {
      const parsed = parseDateString(value);
      if (parsed) {
        setViewDate(parsed);
      }
    }
  }, [open, value]);

  // ── Floating UI ────────────────────────────────────────────
  //
  // useClick({ toggle: false }) — clicking the reference (container)
  //   opens the popup but never closes it. This also claims reference
  //   clicks so useDismiss doesn't treat them as "outside press".
  //   Result: user can click the input to type while the popup is open.
  //
  // useDismiss — closes on true outside press + Escape.
  //
  // The calendar toggle button uses stopPropagation to bypass useClick
  // and handles toggle independently.

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    middleware: [offset(4), flip({ fallbackAxisSideDirection: 'end' }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context, { toggle: false });
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  // Ref for keyboard navigation in grid
  const gridRef = useRef<HTMLDivElement>(null);
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  // Initialize focused date when opening
  useEffect(() => {
    if (open) {
      const parsed = parseDateString(value);
      setFocusedDate(parsed ?? new Date());
    }
  }, [open, value]);

  const emitChange = useCallback(
    (newValue: string) => {
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  // Check if a date is within constraints
  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (minDate && isBefore(date, minDate)) return true;
      if (maxDate && isAfter(date, maxDate)) return true;
      return false;
    },
    [minDate, maxDate],
  );

  // Handle date selection from calendar
  const selectDate = useCallback(
    (date: Date) => {
      if (isDateDisabled(date)) return;
      setInputText(formatInputDate(date));
      emitChange(formatDateString(date));
      setOpen(false);
      inputRef.current?.focus();
    },
    [emitChange, isDateDisabled],
  );

  // Handle clear
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emitChange('');
      setInputText('');
      inputRef.current?.focus();
    },
    [emitChange],
  );

  // Handle masked input change
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const digits = extractDateDigits(rawValue);
      const formatted = formatDateMask(digits);
      setInputText(formatted);

      // Try to parse and update view (but don't commit yet)
      const parsed = parseMaskedDate(formatted);
      if (parsed && !isDateDisabled(parsed)) {
        setViewDate(parsed);
        setFocusedDate(parsed);
      }
    },
    [isDateDisabled],
  );

  // Handle input blur - commit if valid, otherwise revert
  const handleInputBlur = useCallback(() => {
    const digits = extractDateDigits(inputText);

    // Empty input = clear
    if (digits.length === 0) {
      if (value) {
        emitChange('');
      }
      return;
    }

    // Complete date = try to commit
    if (digits.length === 8) {
      const parsed = parseMaskedDate(inputText);
      if (parsed && !isDateDisabled(parsed)) {
        emitChange(formatDateString(parsed));
        return;
      }
    }

    // Invalid or incomplete - revert to current value
    const currentParsed = parseDateString(value);
    setInputText(currentParsed ? formatInputDate(currentParsed) : '');
  }, [inputText, value, emitChange, isDateDisabled]);

  // Handle input keydown
  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const parsed = parseMaskedDate(inputText);
        if (parsed && !isDateDisabled(parsed)) {
          emitChange(formatDateString(parsed));
          setOpen(false);
        }
      } else if (e.key === 'Escape') {
        setOpen(false);
        // Revert to current value
        const currentParsed = parseDateString(value);
        setInputText(currentParsed ? formatInputDate(currentParsed) : '');
      } else if (e.key === 'ArrowDown' && !open) {
        e.preventDefault();
        setOpen(true);
      }
    },
    [inputText, emitChange, isDateDisabled, open, value],
  );

  // Open on keyboard focus (tab navigation) — :focus-visible
  // distinguishes keyboard from mouse focus without timing hacks
  const handleInputFocus = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      if (!disabled && !open && e.target.matches(':focus-visible')) {
        setOpen(true);
      }
    },
    [disabled, open],
  );

  // Calendar button toggle — stopPropagation prevents useClick on
  // the container from also firing
  const handleCalendarToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled) setOpen((v) => !v);
    },
    [disabled],
  );

  // Navigate months
  const goToPrevMonth = useCallback(() => {
    setViewDate((d) => addMonths(d, -1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewDate((d) => addMonths(d, 1));
  }, []);

  // Navigate years
  const goToPrevYear = useCallback(() => {
    setViewDate((d) => addYears(d, -1));
  }, []);

  const goToNextYear = useCallback(() => {
    setViewDate((d) => addYears(d, 1));
  }, []);

  // Keyboard navigation in calendar grid
  const handleGridKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!focusedDate) return;

      let nextDate: Date | null = null;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          nextDate = new Date(focusedDate);
          nextDate.setDate(nextDate.getDate() - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextDate = new Date(focusedDate);
          nextDate.setDate(nextDate.getDate() + 1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextDate = new Date(focusedDate);
          nextDate.setDate(nextDate.getDate() - 7);
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextDate = new Date(focusedDate);
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case 'PageUp':
          e.preventDefault();
          nextDate = e.shiftKey ? addYears(focusedDate, -1) : addMonths(focusedDate, -1);
          break;
        case 'PageDown':
          e.preventDefault();
          nextDate = e.shiftKey ? addYears(focusedDate, 1) : addMonths(focusedDate, 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          selectDate(focusedDate);
          return;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          inputRef.current?.focus();
          return;
      }

      if (nextDate) {
        // Update view if navigating to different month
        if (
          nextDate.getMonth() !== viewDate.getMonth() ||
          nextDate.getFullYear() !== viewDate.getFullYear()
        ) {
          setViewDate(nextDate);
        }
        setFocusedDate(nextDate);
      }
    },
    [focusedDate, selectDate, viewDate],
  );

  // Generate calendar grid
  const calendarGrid = useMemo(
    () => getCalendarGrid(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate],
  );

  // Parse selected date
  const selectedDate = useMemo(() => parseDateString(value), [value]);

  // Has value for showing clear button
  const hasValue = !!value;

  // Check if current input is incomplete (for styling)
  const isIncomplete = inputText.length > 0 && extractDateDigits(inputText).length < 8;

  return (
    <div
      ref={refs.setReference}
      className={cn(
        styles.container,
        fill && styles.fill,
        disabled && styles.disabled,
        open && styles.open,
        className,
      )}
      {...getReferenceProps()}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        id={id}
        value={inputText}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        onFocus={handleInputFocus}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(styles.input, isIncomplete && styles.incomplete)}
        autoComplete="off"
        maxLength={10}
      />
      {hasValue && !disabled && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear date"
          tabIndex={-1}
        >
          <AppIcon name="cross" />
        </button>
      )}
      <button
        type="button"
        className={styles.calendarButton}
        onClick={handleCalendarToggle}
        disabled={disabled}
        aria-label="Open calendar"
        tabIndex={-1}
      >
        <AppIcon name="calendar" />
      </button>

      {open && (
        <FloatingPortal root={portalRoot ?? undefined}>
          <FloatingFocusManager context={context} modal={false} initialFocus={-1} returnFocus={false}>
            <div
              ref={refs.setFloating}
              className={styles.calendar}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {/* Header with year and month navigation */}
              <div className={styles.header}>
                <div className={styles.navGroup}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={goToPrevYear}
                    aria-label="Previous year"
                    title="Previous year"
                  >
                    <AppIcon name="chevron-left" />
                    <AppIcon name="chevron-left" className={styles.doubleChevron} />
                  </button>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={goToPrevMonth}
                    aria-label="Previous month"
                    title="Previous month"
                  >
                    <AppIcon name="chevron-left" />
                  </button>
                </div>
                <span className={styles.monthLabel}>
                  {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>
                <div className={styles.navGroup}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={goToNextMonth}
                    aria-label="Next month"
                    title="Next month"
                  >
                    <AppIcon name="chevron-right" />
                  </button>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={goToNextYear}
                    aria-label="Next year"
                    title="Next year"
                  >
                    <AppIcon name="chevron-right" />
                    <AppIcon name="chevron-right" className={styles.doubleChevron} />
                  </button>
                </div>
              </div>

              {/* Weekday headers */}
              <div className={styles.weekdays}>
                {WEEKDAY_LABELS.map((day) => (
                  <div key={day} className={styles.weekday}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div
                ref={gridRef}
                className={styles.grid}
                role="grid"
                tabIndex={0}
                onKeyDown={handleGridKeyDown}
              >
                {calendarGrid.map((date, i) => {
                  if (!date) {
                    return <div key={`empty-${i}`} className={styles.emptyCell} />;
                  }

                  const isSelected = selectedDate && isSameDay(date, selectedDate);
                  const isTodayDate = isToday(date);
                  const isFocused = focusedDate && isSameDay(date, focusedDate);
                  const isDisabledDate = isDateDisabled(date);

                  return (
                    <button
                      key={formatDateString(date)}
                      type="button"
                      role="gridcell"
                      className={cn(
                        styles.dayButton,
                        isSelected && styles.selected,
                        isTodayDate && styles.today,
                        isFocused && styles.focused,
                        isDisabledDate && styles.dayDisabled,
                      )}
                      onClick={() => selectDate(date)}
                      disabled={isDisabledDate}
                      tabIndex={-1}
                      aria-selected={isSelected || undefined}
                      aria-current={isTodayDate ? 'date' : undefined}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </div>
  );
}

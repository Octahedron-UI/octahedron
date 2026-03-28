/**
 * Calendar utility functions for DatePicker component.
 */

/** Days of the week abbreviations */
export const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

/** Month names */
export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** Get the first day of a month */
function getFirstDayOfMonth(year: number, month: number): Date {
  return new Date(year, month, 1);
}

/** Get the last day of a month */
function getLastDayOfMonth(year: number, month: number): Date {
  return new Date(year, month + 1, 0);
}

/** Get the day of week (0-6, Sunday = 0) for the first day of the month */
function getFirstWeekday(year: number, month: number): number {
  return getFirstDayOfMonth(year, month).getDay();
}

/** Get the number of days in a month */
function getDaysInMonth(year: number, month: number): number {
  return getLastDayOfMonth(year, month).getDate();
}

/**
 * Generate calendar grid for a month.
 * Returns 6 weeks × 7 days = 42 cells.
 * Each cell is either a Date object or null (for padding).
 */
export function getCalendarGrid(year: number, month: number): (Date | null)[] {
  const firstWeekday = getFirstWeekday(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const grid: (Date | null)[] = [];

  // Padding before first day
  for (let i = 0; i < firstWeekday; i++) {
    grid.push(null);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    grid.push(new Date(year, month, day));
  }

  // Padding after last day to complete 6 weeks
  while (grid.length < 42) {
    grid.push(null);
  }

  return grid;
}

/** Format a Date to YYYY-MM-DD string */
export function formatDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Parse YYYY-MM-DD string to Date (returns null if invalid) */
export function parseDateString(value: string): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  // Validate the date is real (e.g., not Feb 30)
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

/** Check if two dates are the same day */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Check if a date is today */
export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

/** Add months to a date (returns new Date) */
export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/** Compare dates (for min/max constraints). Returns true if date is before limit. */
export function isBefore(date: Date, limit: Date): boolean {
  return formatDateString(date) < formatDateString(limit);
}

/** Compare dates (for min/max constraints). Returns true if date is after limit. */
export function isAfter(date: Date, limit: Date): boolean {
  return formatDateString(date) > formatDateString(limit);
}

/** Add years to a date (returns new Date) */
export function addYears(date: Date, years: number): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
}

/** Format date for input field display (MM/DD/YYYY) */
export function formatInputDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

/**
 * Format raw digits into MM/DD/YYYY pattern.
 * Input: "01152026" → Output: "01/15/2026"
 * Handles partial input gracefully.
 */
export function formatDateMask(digits: string): string {
  // Strip non-digits
  const d = digits.replace(/\D/g, '').slice(0, 8);

  if (d.length === 0) return '';
  if (d.length <= 2) return d;
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`;
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`;
}

/**
 * Extract just digits from a formatted date string.
 * Input: "01/15/2026" → Output: "01152026"
 */
export function extractDateDigits(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

/**
 * Parse MM/DD/YYYY or MMDDYYYY into a Date.
 * Returns null if incomplete or invalid.
 */
export function parseMaskedDate(input: string): Date | null {
  const digits = input.replace(/\D/g, '');
  if (digits.length !== 8) return null;

  const month = parseInt(digits.slice(0, 2), 10);
  const day = parseInt(digits.slice(2, 4), 10);
  const year = parseInt(digits.slice(4, 8), 10);

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  if (year < 1900 || year > 2100) return null;

  const date = new Date(year, month - 1, day);
  // Validate the date is real (e.g., not Feb 30)
  if (date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

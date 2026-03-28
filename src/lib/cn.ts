/**
 * Merges multiple class names into a single string, filtering out falsy values.
 *
 * @param classes - Variable number of class name values (strings, null, undefined, or false)
 * @returns A single space-separated string of class names
 *
 * @example
 * cn('foo', 'bar') // 'foo bar'
 * cn('foo', null, 'bar') // 'foo bar'
 * cn('foo', false && 'bar', 'baz') // 'foo baz'
 * cn(styles.base, isActive && styles.active, className) // 'base active custom'
 */
export function cn(...classes: (string | null | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

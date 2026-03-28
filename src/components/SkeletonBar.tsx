/**
 * @module SkeletonBar
 *
 * # Skeleton Design System Rules
 *
 * ## When to Show Skeletons
 *
 * | Context           | Indicator                              |
 * |-------------------|----------------------------------------|
 * | Initial page load | Skeletons via `isInitialLoad`          |
 * | Data refresh      | Keep stale data visible (no skeleton)  |
 * | Button actions    | Spinner in button                      |
 * | Tables            | `<DataTable loading={isInitialLoad}>` |
 *
 * **Key rule**: Use `isInitialLoad` from `useFetch`, not `loading`.
 *
 * ## Width Strategy - Two Fixed Widths Only
 *
 * | Width   | Use For                                        |
 * |---------|------------------------------------------------|
 * | `80px`  | Dates, short IDs, status labels, small numbers |
 * | `180px` | Descriptions, locations, multi-word summaries  |
 * | `60%`   | Variable-length text (default)                 |
 *
 * ## Content Type Reference
 *
 * | Content               | Width  |
 * |-----------------------|--------|
 * | Dates (MM-DD-YYYY)    | `80px` |
 * | Short IDs (8-char)    | `80px` |
 * | Status tags           | `80px` |
 * | Small numbers         | `80px` |
 * | Descriptions/subtitles| `180px`|
 * | Location names        | `180px`|
 * | Material/person names | `70%`  |
 * | Titles/headers        | `60%`  |
 *
 * **Default**: When unsure, use `60%`.
 *
 * ## Component Selection
 *
 * | Scenario                    | Component                         |
 * |-----------------------------|-----------------------------------|
 * | Inline null-replacement     | `<Sk w="80px">{row?.date}</Sk>`   |
 * | Explicit loading conditional| `<SkeletonBar width="180px" />`   |
 * | Multi-line text             | `<SkeletonText lines={3} />`      |
 * | Tables                      | Let DataTable handle it           |
 *
 * **Prefer `<Sk>` over ternaries** - more concise, self-documenting.
 */

import type { ReactNode } from 'react';

import { cn } from '../lib/cn';

import styles from './SkeletonBar.module.css';

export type SkeletonBarProps = {
  /** Width as CSS value. Use: '80px' (dates/IDs), '180px' (descriptions), '60%' (default) */
  width?: string;
  /** Height variant */
  size?: 'sm' | 'md' | 'lg';
  /** Horizontal alignment */
  align?: 'left' | 'center' | 'right';
  /** Additional class names */
  className?: string;
};

export function SkeletonBar({
  width = '100%',
  size = 'md',
  align = 'left',
  className,
}: SkeletonBarProps) {
  const sizeClass = size === 'sm' ? styles.sizeSm : size === 'lg' ? styles.sizeLg : styles.sizeMd;

  const alignClass =
    align === 'right'
      ? styles.alignRight
      : align === 'center'
        ? styles.alignCenter
        : styles.alignLeft;

  return (
    <div
      className={cn(styles.bar, sizeClass, alignClass, className)}
      style={{ width }}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton wrapper - shows skeleton when children is null/undefined, otherwise renders children.
 *
 * Usage:
 *   <Sk w="80px">{row?.job.name}</Sk>
 *
 * This eliminates the need for:
 *   - Separate `loading` props
 *   - Ternary expressions: `{loading ? <SkeletonBar /> : content}`
 *   - Non-null assertions: `row!.field`
 */
export function Sk({
  w = '60%',
  children,
}: {
  /** Width as CSS value. Use: '80px' (dates/IDs), '180px' (descriptions), '60%' (default) */
  w?: string;
  children: ReactNode;
}) {
  return children != null ? <>{children}</> : <SkeletonBar width={w} />;
}

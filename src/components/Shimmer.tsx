import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './Shimmer.module.css';

export type ShimmerProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Inline shimmer effect for text and icon content.
 *
 * Uses a CSS mask sweep — same timing as skeleton bars (`--octa-duration-shimmer`)
 * but applied over existing content rather than a placeholder bar.
 * Works on both text and inline SVG icons.
 *
 * Inherits color from parent — wrap in `<Text>` for muted/caption styling.
 *
 * @example
 * <Shimmer><Stars01 size={12} /> analyzing…</Shimmer>
 */
export function Shimmer({ className, children }: ShimmerProps) {
  return (
    <span className={cn(styles.shimmer, className)} aria-hidden="true">
      {children}
    </span>
  );
}

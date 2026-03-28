import type { ReactNode } from 'react';

import { cn } from '../lib/cn';

import styles from './CollapsibleContent.module.css';

export type CollapsibleContentProps = {
  children: ReactNode;
  /**
   * - 'default': Padding + bottom border (for top-level inspector sections)
   * - 'nested': Padding, no border (for collapsibles inside other sections)
   */
  variant?: 'default' | 'nested';
  className?: string;
};

/**
 * Standard content wrapper for use inside CollapsibleSection.
 * Edge-to-edge children (e.g. table rows) should use negative horizontal
 * margin to break out of the padding.
 */
export function CollapsibleContent({
  children,
  variant = 'default',
  className,
}: CollapsibleContentProps) {
  return (
    <div className={cn(styles.content, variant === 'nested' && styles.nested, className)}>
      {children}
    </div>
  );
}

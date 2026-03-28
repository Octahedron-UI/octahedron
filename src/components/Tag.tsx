import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import { deterministicColorVars } from '../lib/deterministic-colors';
import { X as CloseIcon } from './AppIcon';
import styles from './Tag.module.css';

export type TagVariant = 'success' | 'error' | 'warning' | 'info' | 'accent' | 'neutral';

export type TagProps = {
  /** Semantic variant for status colors */
  variant?: TagVariant;
  /** Explicit CSS color for custom styling */
  color?: string;
  /** Seed for deterministic color generation (defaults to children text if no variant/color) */
  seed?: string;
  /** Use monospace font */
  mono?: boolean;
  /** Make the tag a link */
  href?: string;
  /** Truncate text with ellipsis (default: true for mono) */
  truncate?: boolean;
  /** Show close button */
  closable?: boolean;
  /** Called when close button is clicked */
  onClose?: () => void;
  className?: string;
  title?: string;
  children: ReactNode;
};

function getChildrenText(children: ReactNode): string | null {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  return null;
}

export function Tag({
  variant,
  color,
  seed,
  mono,
  href,
  truncate,
  closable,
  onClose,
  className,
  title,
  children,
}: TagProps) {
  const shouldTruncate = truncate ?? mono ?? true;

  let colorStyle: React.CSSProperties | undefined;
  let variantClass: string | undefined;

  if (variant) {
    variantClass = styles[variant];
  } else if (color) {
    colorStyle = { '--tag-color': color } as React.CSSProperties;
    variantClass = styles.custom;
  } else {
    const effectiveSeed = seed ?? getChildrenText(children);
    if (effectiveSeed) {
      colorStyle = deterministicColorVars(effectiveSeed) as React.CSSProperties;
      variantClass = styles.deterministic;
    }
  }

  const textContent = shouldTruncate ? <span className={styles.text}>{children}</span> : children;
  const closeButton = closable && (
    <button
      type="button"
      className={styles.closeButton}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose?.();
      }}
      aria-label="Remove"
    >
      <CloseIcon aria-hidden />
    </button>
  );
  const combinedClassName = cn(styles.tag, variantClass, mono && styles.mono, className);

  if (href) {
    return (
      <a href={href} className={combinedClassName} style={colorStyle} title={title}>
        {textContent}
        {closeButton}
      </a>
    );
  }

  return (
    <span className={combinedClassName} style={colorStyle} title={title}>
      {textContent}
      {closeButton}
    </span>
  );
}

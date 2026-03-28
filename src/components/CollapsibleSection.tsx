import { type ReactNode, useCallback, useId, useState } from 'react';

import { cn } from '../lib/cn';
import { AppIcon } from './AppIcon';

import styles from './CollapsibleSection.module.css';


export type CollapsibleSectionProps = {
  title: string;
  defaultExpanded?: boolean;
  storageKey?: string;
  children: ReactNode;
  className?: string;
};

function getStoredState(key: string | undefined, fallback: boolean): boolean {
  if (!key) return fallback;
  try {
    const stored = localStorage.getItem(key);
    if (stored === 'true') return true;
    if (stored === 'false') return false;
  } catch {
    // localStorage unavailable
  }
  return fallback;
}

function setStoredState(key: string | undefined, value: boolean): void {
  if (!key) return;
  try {
    localStorage.setItem(key, String(value));
  } catch {
    // localStorage unavailable
  }
}

export function CollapsibleSection({
  title,
  defaultExpanded = false,
  storageKey,
  children,
  className,
}: CollapsibleSectionProps) {
  const contentId = useId();
  const [expanded, setExpanded] = useState(() => getStoredState(storageKey, defaultExpanded));

  const toggle = useCallback(() => {
    setExpanded((prev) => {
      const next = !prev;
      setStoredState(storageKey, next);
      return next;
    });
  }, [storageKey]);

  return (
    <div className={className}>
      <button
        type="button"
        className={styles.header}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={toggle}
      >
        <AppIcon
          name="chevron-right"
          className={cn(styles.chevron, expanded && styles.chevronExpanded)}
        />
        <span className={styles.title}>{title}</span>
      </button>
      <div
        id={contentId}
        className={cn(styles.contentWrapper, expanded && styles.contentWrapperExpanded)}
        aria-hidden={!expanded}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

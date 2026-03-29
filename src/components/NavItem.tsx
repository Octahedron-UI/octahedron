import type { ReactNode, KeyboardEvent } from 'react';

import { AppIcon } from './AppIcon';
import styles from './NavItem.module.css';

export type NavItemProps = {
  children: ReactNode;
  onClick: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
};

/**
 * Clickable list item with a chevron for navigating into detail views.
 * Always interactive (onClick required), always shows chevron.
 * Use this for list items that open side panels or navigate to detail views.
 */
export function NavItem({
  children,
  onClick,
  selected = false,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: NavItemProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  const itemClass = [
    styles.item,
    selected && styles.itemSelected,
    disabled && styles.itemDisabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={itemClass}
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
      aria-pressed={selected}
      aria-disabled={disabled}
      aria-label={ariaLabel}
    >
      <div className={styles.content}>{children}</div>
      <AppIcon name="chevron-right" className={styles.chevron} />
    </div>
  );
}

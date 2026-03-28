import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './Menu.module.css';

type MenuProps = {
  children: ReactNode;
  className?: string;
};

export function Menu({ children, className }: MenuProps) {
  return <div className={cn(styles.menu, className)}>{children}</div>;
}

type MenuItemProps = {
  id?: string;
  icon?: ReactNode;
  disabled?: boolean;
  active?: boolean;
  highlighted?: boolean;
  intent?: 'default' | 'danger';
  title?: string;
  onClick?: () => void;
  children: ReactNode;
};

export function MenuItem({
  id,
  icon,
  disabled,
  active,
  highlighted,
  intent = 'default',
  title,
  onClick,
  children,
}: MenuItemProps) {
  return (
    <button
      id={id}
      type="button"
      role="option"
      className={cn(styles.item, intent === 'danger' && styles.danger)}
      data-active={active || undefined}
      data-disabled={disabled || undefined}
      data-highlighted={highlighted || undefined}
      disabled={disabled}
      aria-selected={active || undefined}
      title={title}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </button>
  );
}

export function MenuDivider() {
  return <div className={styles.divider} />;
}

import { useCallback, useEffect, useRef, type AriaRole, type ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './Menu.module.css';

type MenuProps = {
  children: ReactNode;
  className?: string;
  /** ARIA role for the menu container. Defaults to "menu". Pass "presentation" when
   *  an outer element already provides a semantic role (e.g. Select's "listbox" wrapper). */
  role?: AriaRole;
};

export function Menu({ children, className, role = 'menu' }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getItems = useCallback((): HTMLButtonElement[] => {
    if (!ref.current) return [];
    return Array.from(
      ref.current.querySelectorAll<HTMLButtonElement>(
        `button.${CSS.escape(styles.item)}:not([disabled])`,
      ),
    );
  }, []);

  // Roving tabindex: exactly one non-disabled item should have tabIndex 0.
  // Prefer the active item ([data-active]), otherwise the first non-disabled item.
  useEffect(() => {
    const items = getItems();
    if (items.length === 0) return;

    const activeItem = items.find((item) => item.dataset.active !== undefined);
    const tabbable = activeItem ?? items[0];

    for (const item of items) {
      item.tabIndex = item === tabbable ? 0 : -1;
    }
  });

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Only handle keyboard nav when this Menu owns focus management (standalone menu role)
      if (role !== 'menu') return;

      const items = getItems();
      if (items.length === 0) return;

      const active = document.activeElement as HTMLElement | null;
      const currentIndex = active ? items.indexOf(active as HTMLButtonElement) : -1;

      let nextIndex: number | null = null;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = items.length - 1;
          break;
      }

      if (nextIndex !== null) {
        for (const item of items) {
          item.tabIndex = -1;
        }
        items[nextIndex].tabIndex = 0;
        items[nextIndex].focus();
      }
    },
    [role, getItems],
  );

  return (
    <div
      ref={ref}
      className={cn(styles.menu, className)}
      role={role}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
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
  /** ARIA role for the menu item. Defaults to "menuitem". Pass "option" when used inside a listbox. */
  role?: AriaRole;
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
  role = 'menuitem',
}: MenuItemProps) {
  return (
    <button
      id={id}
      type="button"
      role={role}
      tabIndex={-1}
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
  return <div className={styles.divider} role="separator" />;
}

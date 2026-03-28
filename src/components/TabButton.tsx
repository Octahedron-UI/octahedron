import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { useCallback } from 'react';

import { cn } from '../lib/cn';
import styles from './TabButton.module.css';

type TabButtonBaseProps = {
  className?: string;
  children: ReactNode;
  /** Whether this tab is currently active */
  active?: boolean;
  variant?: 'pill' | 'cutout';
};

type TabButtonActionProps = TabButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'type'> & {
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  };

export type TabButtonProps = TabButtonActionProps;

export function TabButton(props: TabButtonProps) {
  const {
    active = false,
    className,
    children,
    variant = 'pill',
    type = 'button',
    onClick,
    'aria-current': ariaCurrentProp,
    ...buttonProps
  } = props;

  const ariaCurrent = ariaCurrentProp ?? (active ? 'page' : undefined);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <button
      {...buttonProps}
      type={type}
      aria-current={ariaCurrent}
      onClick={handleClick}
      className={cn(
        styles.tabButton,
        variant === 'pill' ? styles.tabButtonPill : styles.tabButtonCutout,
        active
          ? variant === 'pill'
            ? styles.tabButtonPillActive
            : styles.tabButtonCutoutActive
          : null,
        className,
      )}
    >
      {children}
    </button>
  );
}

import { forwardRef } from 'react';

import { avatarColor } from '../lib/deterministic-colors';
import { Button, type ButtonProps } from './Button';
import styles from './UserAvatarButton.module.css';

/** Extract the first character as an uppercase initial, or '?' if empty */
function normalizeInitial(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '?';
  return trimmed.slice(0, 1).toUpperCase();
}

export type UserAvatarButtonProps = Omit<ButtonProps, 'icon' | 'variant' | 'children'> & {
  /** Display name or email - used for initial and color generation */
  name: string;
};

export const UserAvatarButton = forwardRef<HTMLButtonElement, UserAvatarButtonProps>(
  function UserAvatarButton({ name, ariaLabel, 'aria-label': htmlAriaLabel, ...props }, ref) {
    const initial = normalizeInitial(name);
    const color = avatarColor(name);

    const avatar = (
      <span className={styles.avatar} style={{ backgroundColor: color }}>
        <span className={styles.initial}>{initial}</span>
      </span>
    );

    return (
      <Button
        ref={ref}
        variant="ghost"
        icon={avatar}
        ariaLabel={ariaLabel ?? htmlAriaLabel ?? name}
        {...props}
      />
    );
  },
);

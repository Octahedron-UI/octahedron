import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

import { cn } from '../lib/cn';
import { avatarColor } from '../lib/deterministic-colors';
import controlStyles from './ControlButton.module.css';
import styles from './UserAvatarButton.module.css';

/** Extract the first character as an uppercase initial, or '?' if empty */
function normalizeInitial(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '?';
  return trimmed.slice(0, 1).toUpperCase();
}

export type UserAvatarButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Display name or email - used for initial and color generation */
  name: string;
};

export const UserAvatarButton = forwardRef<HTMLButtonElement, UserAvatarButtonProps>(
  function UserAvatarButton({ name, className, ...props }, ref) {
    const initial = normalizeInitial(name);
    const color = avatarColor(name);

    return (
      <button
        ref={ref}
        type="button"
        {...props}
        className={cn(controlStyles.control, controlStyles.iconOnly, className)}
      >
        <span className={styles.avatar} style={{ backgroundColor: color }}>
          <span className={styles.initial}>{initial}</span>
        </span>
      </button>
    );
  },
);

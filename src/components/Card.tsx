import type { CSSProperties, ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './Card.module.css';

export type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  padding?: 'none' | 'sm' | 'md';
  clip?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  title?: string;
};

export function Card({
  children,
  className,
  style,
  padding = 'sm',
  clip = false,
  interactive = false,
  onClick,
  title,
}: CardProps) {
  const paddingClass =
    padding === 'md' ? styles.paddedMd : padding === 'sm' ? styles.paddedSm : null;
  const isClickable = interactive || !!onClick;

  return (
    <div
      className={cn(
        styles.card,
        clip && styles.clipped,
        paddingClass,
        isClickable && styles.interactive,
        className,
      )}
      style={style}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      title={title}
      onKeyDown={
        isClickable && onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') onClick();
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

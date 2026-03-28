import type { ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './OptionCard.module.css';

export type OptionCardProps = {
  label: string;
  description?: string;
  badge?: ReactNode;
  variant?: 'default' | 'primary' | 'danger';
  onClick: () => void;
};

export function OptionCard({
  label,
  description,
  badge,
  variant = 'default',
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      className={cn(
        styles.card,
        variant === 'primary' && styles.primary,
        variant === 'danger' && styles.danger,
      )}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {description && <span className={styles.description}>{description}</span>}
      {badge}
    </button>
  );
}

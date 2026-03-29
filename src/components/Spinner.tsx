import { Loading01 } from '@untitledui/icons/Loading01';

import { cn } from '../lib/cn';
import styles from './Button.module.css';

export type SpinnerProps = {
  size?: number;
  className?: string;
};

export function Spinner({ size = 14, className }: SpinnerProps) {
  return (
    <span className={cn(styles.icon, styles.spinner, className)} aria-hidden="true">
      <Loading01 size={size} />
    </span>
  );
}

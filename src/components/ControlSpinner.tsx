import { Loading01 } from '@untitledui/icons/Loading01';

import { cn } from '../lib/cn';
import styles from './ControlButton.module.css';

export type ControlSpinnerProps = {
  size?: number;
  className?: string;
};

export function ControlSpinner({ size = 14, className }: ControlSpinnerProps) {
  return (
    <span className={cn(styles.icon, styles.spinner, className)} aria-hidden="true">
      <Loading01 size={size} />
    </span>
  );
}

import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './ControlButton.module.css';

export type ControlIconLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon: ReactNode;
  ariaLabel: string;
};

export function ControlIconLink({ icon, ariaLabel, className, ...props }: ControlIconLinkProps) {
  return (
    <a {...props} aria-label={ariaLabel} className={cn(styles.control, styles.iconOnly, className)}>
      {icon}
    </a>
  );
}

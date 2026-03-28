import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './TextLink.module.css';

export type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function TextLink({ className, ...props }: TextLinkProps) {
  return <a {...props} className={cn(styles.link, className)} />;
}

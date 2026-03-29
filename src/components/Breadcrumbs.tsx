import type { ReactNode } from 'react';

import { ChevronRight as ChevronRightIcon } from './AppIcon';
import { cn } from '../lib/cn';
import styles from './Breadcrumbs.module.css';

export type BreadcrumbItem = {
  label: ReactNode;
  /** URL to navigate to */
  href?: string;
  /** Click handler (uses button) - mutually exclusive with `href` */
  onClick?: () => void;
};

export function Breadcrumbs({
  items,
  ariaLabel = 'Breadcrumb',
}: {
  items: BreadcrumbItem[];
  ariaLabel?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav className={styles.row} aria-label={ariaLabel}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const className = cn(styles.crumb, isLast && styles.crumbCurrent);
          const title = typeof item.label === 'string' ? item.label : undefined;

          let content: ReactNode;

          if (item.href && !isLast) {
            content = (
              <a className={className} href={item.href} title={title}>
                {item.label}
              </a>
            );
          } else if (item.onClick && !isLast) {
            content = (
              <button type="button" className={className} onClick={item.onClick} title={title}>
                {item.label}
              </button>
            );
          } else {
            content = (
              <span className={className} aria-current={isLast ? 'page' : undefined} title={title}>
                {item.label}
              </span>
            );
          }

          return (
            <li key={index} className={styles.item}>
              {content}
              {!isLast ? <ChevronRightIcon className={styles.separator} aria-hidden /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import type { CSSProperties, ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './Banner.module.css';

export type BannerIntent = 'none' | 'success' | 'warning' | 'danger' | 'info';

export type BannerVariant = 'banner' | 'callout';

export type BannerProps = {
  variant?: BannerVariant;
  intent?: BannerIntent;
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Banner({
  variant = 'banner',
  intent = 'none',
  icon,
  title,
  children,
  action,
  className,
  style,
}: BannerProps) {
  const intentClass =
    intent === 'success'
      ? styles.success
      : intent === 'warning'
        ? styles.warning
        : intent === 'danger'
          ? styles.danger
          : intent === 'info'
            ? styles.info
            : styles.none;

  const role = intent === 'danger' || intent === 'warning' ? 'alert' : undefined;

  return (
    <div className={cn(variant === 'callout' ? styles.callout : styles.banner, intentClass, className)} style={style} role={role}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <div className={styles.content}>
        {title ? <div className={styles.title}>{title}</div> : null}
        {children ? <div className={styles.body}>{children}</div> : null}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}

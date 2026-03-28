import type { ReactNode } from 'react';

import styles from './EmptyState.module.css';

export type EmptyStateProps = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className={styles.container}>
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <div className={styles.title}>{title}</div>
      {description ? <div className={styles.description}>{description}</div> : null}
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}

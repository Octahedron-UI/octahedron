import type { ReactNode } from 'react';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';
import styles from './CompactDetailView.module.css';

type CompactDetailViewProps = {
  /** Breadcrumb chain from main panel to current panel */
  breadcrumbs: BreadcrumbItem[];
  /** Panel content to render */
  children: ReactNode;
};

/**
 * Full-screen detail view for compact mode.
 *
 * Renders a panel's content as a full-screen overlay with a breadcrumb
 * header for navigation. Used in narrow viewports where side-by-side
 * layout isn't possible.
 *
 * Supports multi-level navigation:
 * - Stock -> Details -> Demand (3-level breadcrumb chain)
 * - Each intermediate level is clickable to navigate back
 */
export function CompactDetailView({ breadcrumbs, children }: CompactDetailViewProps) {
  return (
    <div className={styles.container}>
      <Breadcrumbs items={breadcrumbs} ariaLabel="Detail navigation" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

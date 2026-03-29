import { forwardRef, useId, type ReactNode } from 'react';
import type { AppIconName } from './AppIcon';
import { PanelHeader } from './PanelHeader';
import styles from './SplitLayout.module.css';

export type PanelProps = {
  children: ReactNode;
  /** Unique panel identifier */
  id: string;
  /** Whether this is a flex panel (grows to fill) or fixed-width */
  flex?: boolean;
  /** Width in pixels (for fixed-width panels) */
  width?: number;
  /** Whether the panel is open/visible */
  open?: boolean;
  /** Icon displayed next to the label */
  icon?: AppIconName;
  /** Small category label above the title (e.g., "Demand Need", "Design") */
  label?: string;
  /** Panel title (renders header if provided) */
  title?: ReactNode;
  /** Actions to display in header */
  headerActions?: ReactNode;
  /** Close handler (renders close button if provided) */
  onClose?: () => void;
  /** Width change handler (used by resizer) */
  onWidthChange?: (width: number) => void;
  /** Reset width to default (used by resizer double-click) */
  onWidthReset?: () => void;
};

/**
 * Individual panel within a SplitContainer.
 *
 * Two modes:
 * - `flex={true}`: Panel grows to fill available space (main content)
 * - `flex={false}` + `width`: Fixed-width panel (inspector/sidebar)
 */
export const Panel = forwardRef<HTMLDivElement, PanelProps>(function Panel(
  { children, id, flex = false, width, open = true, icon, label, title, headerActions, onClose },
  ref,
) {
  const reactId = useId();
  const panelId = `panel-${id}-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  const hasHeader = label || title || headerActions || onClose;

  return (
    <div
      ref={ref}
      id={panelId}
      className={styles.panel}
      role="region"
      aria-label={label || (typeof title === 'string' ? title : undefined) || id}
      data-flex={flex || undefined}
      data-fixed={!flex || undefined}
      data-open={open || undefined}
      style={
        !flex && width ? ({ '--panel-width': `${width}px` } as React.CSSProperties) : undefined
      }
    >
      {hasHeader && (
        <PanelHeader
          icon={icon}
          label={label}
          title={title}
          actions={headerActions}
          onClose={onClose}
          closeTabIndex={open ? 0 : -1}
        />
      )}
      {hasHeader ? <div className={styles.panelBody}>{children}</div> : children}
    </div>
  );
});

/**
 * Scrollable content area for main panels with tables.
 */
export function MainScrollArea({ children }: { children: ReactNode }) {
  return <div className={styles.mainScroll}>{children}</div>;
}

/**
 * Fixed footer area for pagination.
 */
export function MainFooter({ children }: { children: ReactNode }) {
  return <div className={styles.mainFooter}>{children}</div>;
}

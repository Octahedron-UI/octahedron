import type { ReactNode } from 'react';
import { AppIcon, type AppIconName } from './AppIcon';
import { Text } from './Text';
import { Button } from './Button';
import styles from './SplitLayout.module.css';

export type PanelHeaderProps = {
  /** Icon displayed next to the label */
  icon?: AppIconName;
  /** Small category label above the title (e.g., "Demand Need", "Design") */
  label?: string;
  /** Panel title */
  title?: ReactNode;
  /** Actions to display in header */
  actions?: ReactNode;
  /** Close handler (renders close button if provided) */
  onClose?: () => void;
  /** Tab index for close button (used to disable when panel is closed) */
  closeTabIndex?: number;
};

/**
 * Header component for Panel with consistent icon + label + title pattern.
 *
 * Structure:
 * - Left: [icon] label (muted caption) above title (bold)
 * - Right: actions + close button
 */
export function PanelHeader({
  icon,
  label,
  title,
  actions,
  onClose,
  closeTabIndex = 0,
}: PanelHeaderProps) {
  return (
    <div className={styles.panelHeader}>
      <div className={styles.panelTitleGroup}>
        {label && (
          <Text variant="caption" as="div" className={styles.panelLabel}>
            {icon && <AppIcon name={icon} className={styles.panelLabelIcon} />}
            {label}
          </Text>
        )}
        {title && (
          <Text variant="title" as="div" className={styles.panelTitle}>
            {title}
          </Text>
        )}
      </div>
      <div className={styles.panelHeaderActions}>
        {actions}
        {onClose && (
          <Button
            icon={<AppIcon name="cross" />}
            ariaLabel="Close panel"
            onClick={onClose}
            tabIndex={closeTabIndex}
          />
        )}
      </div>
    </div>
  );
}

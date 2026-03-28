import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useMemo } from 'react';

import { cn } from '../lib/cn';
import { AppIcon, type AppIconName } from './AppIcon';

import controlStyles from './ControlButton.module.css';
import { ControlSpinner } from './ControlSpinner';

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: ReactNode;
  icon?: AppIconName | ReactNode;
  intent?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  minimal?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

function toIconNode(icon: LinkButtonProps['icon']): ReactNode {
  if (!icon) return undefined;
  if (typeof icon === 'string') return <AppIcon name={icon as AppIconName} />;
  return icon;
}

const intentClasses: Record<NonNullable<LinkButtonProps['intent']>, string | null> = {
  default: null,
  primary: controlStyles.intentPrimary,
  success: controlStyles.intentSuccess,
  warning: controlStyles.intentWarning,
  danger: controlStyles.intentDanger,
};

export function LinkButton({
  children,
  icon,
  intent = 'default',
  minimal,
  className,
  disabled,
  loading,
  onClick,
  ...props
}: LinkButtonProps) {
  const iconNode = useMemo(() => toIconNode(icon), [icon]);

  return (
    <a
      {...props}
      className={cn(
        controlStyles.control,
        minimal && controlStyles.minimal,
        intentClasses[intent],
        loading && controlStyles.loading,
        disabled && controlStyles.disabled,
        className,
      )}
      onClick={disabled || loading ? (e) => e.preventDefault() : onClick}
      aria-disabled={disabled || undefined}
    >
      {loading ? (
        <ControlSpinner size={16} />
      ) : iconNode ? (
        <span className={controlStyles.icon} aria-hidden>
          {iconNode}
        </span>
      ) : null}
      <span className={controlStyles.label}>{children}</span>
    </a>
  );
}

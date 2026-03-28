import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../lib/cn';
import { ControlSpinner } from './ControlSpinner';
import styles from './ControlButton.module.css';

export type ButtonColor = 'primary' | 'success' | 'warning' | 'danger' | 'accent';
export type ButtonVariant = 'solid' | 'soft' | 'ghost';

export type ControlButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> & {
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  rightIcon?: ReactNode;
  /** Visual treatment: solid (filled), soft (tinted), ghost (transparent) */
  variant?: ButtonVariant;
  /** Color family. Defaults to solid variant when set without explicit variant. */
  color?: ButtonColor;
  /** Inverted style for use on colored backgrounds (white/transparent styling) */
  inverted?: boolean;
  /** Strips fixed height so the button flows inline with text */
  compact?: boolean;
  loading?: boolean;
};

const colorClasses: Record<ButtonColor, string> = {
  primary: styles.colorPrimary,
  success: styles.colorSuccess,
  warning: styles.colorWarning,
  danger: styles.colorDanger,
  accent: styles.colorAccent,
};

const variantClasses: Record<ButtonVariant, string> = {
  solid: styles.solid,
  soft: styles.soft,
  ghost: styles.ghost,
};

export const ControlButton = forwardRef<HTMLButtonElement, ControlButtonProps>(
  function ControlButton(
    {
      type = 'button',
      icon,
      rightIcon,
      variant,
      color,
      inverted = false,
      compact = false,
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) {
    // Default to solid when a color is set without explicit variant
    const effectiveVariant = variant ?? (color ? 'solid' : undefined);

    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(
          styles.control,
          color ? colorClasses[color] : null,
          effectiveVariant ? variantClasses[effectiveVariant] : null,
          inverted ? styles.inverted : null,
          compact ? styles.compact : null,
          loading ? styles.loading : null,
          className,
        )}
      >
        {icon ? (
          <span className={cn(styles.icon, loading && styles.hidden)} aria-hidden>
            {icon}
          </span>
        ) : null}
        <span className={cn(styles.label, loading && styles.hidden)}>{children}</span>
        {rightIcon ? (
          <span className={cn(styles.icon, loading && styles.hidden)} aria-hidden>
            {rightIcon}
          </span>
        ) : null}
        {loading && (
          <span className={styles.spinnerOverlay} aria-hidden>
            <ControlSpinner size={16} />
          </span>
        )}
      </button>
    );
  },
);

export type ControlIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type' | 'children' | 'aria-label'
> & {
  icon: ReactNode;
  ariaLabel: string;
  loading?: boolean;
};

export const ControlIconButton = forwardRef<HTMLButtonElement, ControlIconButtonProps>(
  function ControlIconButton(
    { icon, ariaLabel, loading = false, disabled, className, ...props },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        type="button"
        aria-label={ariaLabel}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(styles.control, styles.iconOnly, loading ? styles.loading : null, className)}
      >
        {loading ? <ControlSpinner size={12} /> : icon}
      </button>
    );
  },
);

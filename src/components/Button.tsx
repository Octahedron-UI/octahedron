import {
  forwardRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';

import { cn } from '../lib/cn';
import { Spinner } from './Spinner';
import styles from './Button.module.css';

export type ButtonColor = 'primary' | 'success' | 'warning' | 'danger' | 'accent';
export type ButtonVariant = 'solid' | 'soft' | 'ghost';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'color'> & {
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
  /** Accessible label. When set with no children, renders as an icon-only button. */
  ariaLabel?: string;
  /** When provided, renders an <a> element instead of <button> */
  href?: string;
  target?: string;
  rel?: string;
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

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      type = 'button',
      icon,
      rightIcon,
      variant,
      color,
      inverted = false,
      compact = false,
      loading = false,
      ariaLabel,
      className,
      children,
      disabled,
      href,
      target,
      rel,
      onClick,
      ...props
    },
    ref,
  ) {
    // Default to solid when a color is set without explicit variant
    const effectiveVariant = variant ?? (color ? 'solid' : undefined);
    const iconOnly = ariaLabel != null && !children;
    const isAnchor = href != null;

    const iconOnlyClass = cn(
      styles.control,
      styles.iconOnly,
      color ? colorClasses[color] : null,
      effectiveVariant ? variantClasses[effectiveVariant] : null,
      inverted ? styles.inverted : null,
      loading ? styles.loading : null,
      disabled ? styles.disabled : null,
      className,
    );

    const fullClass = cn(
      styles.control,
      color ? colorClasses[color] : null,
      effectiveVariant ? variantClasses[effectiveVariant] : null,
      inverted ? styles.inverted : null,
      compact ? styles.compact : null,
      loading ? styles.loading : null,
      disabled ? styles.disabled : null,
      className,
    );

    const sharedContent = iconOnly ? (
      loading ? <Spinner size={12} /> : icon
    ) : (
      <>
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
            <Spinner size={16} />
          </span>
        )}
      </>
    );

    if (isAnchor) {
      const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (disabled || loading) {
          e.preventDefault();
          return;
        }
        (onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined)?.(e);
      };

      return (
        <a
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          aria-disabled={disabled || undefined}
          aria-busy={loading || undefined}
          onClick={handleClick}
          className={iconOnly ? iconOnlyClass : fullClass}
        >
          {sharedContent}
        </a>
      );
    }

    if (iconOnly) {
      return (
        <button
          {...props}
          ref={ref as React.Ref<HTMLButtonElement>}
          type={type}
          aria-label={ariaLabel}
          disabled={disabled || loading}
          aria-busy={loading || undefined}
          onClick={onClick}
          className={iconOnlyClass}
        >
          {sharedContent}
        </button>
      );
    }

    return (
      <button
        {...props}
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        aria-label={ariaLabel}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        onClick={onClick}
        className={fullClass}
      >
        {sharedContent}
      </button>
    );
  },
);

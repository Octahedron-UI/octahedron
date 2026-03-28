/**
 * Tooltip
 *
 * Lightweight tooltip using floating-ui. Shows on hover/focus with minimal delay.
 */

import React, { type ReactNode, useState, cloneElement, isValidElement } from 'react';
import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  type Placement,
} from '@floating-ui/react';

import { useFloatingPortalRoot } from './FloatingPortalProvider';

import styles from './Tooltip.module.css';

export type TooltipProps = {
  /** Content to display in the tooltip */
  content: ReactNode;
  /** Element that triggers the tooltip */
  children: ReactNode;
  /** Placement relative to trigger */
  placement?: Placement;
  /** Delay before showing (ms) */
  delay?: number;
};

/**
 * Structured tooltip content matching CodeMirror hover tooltips.
 */
export type TooltipContentProps = {
  title: string;
  subtitle?: string;
  description?: string;
  values?: readonly string[];
};

export function TooltipContent({ title, subtitle, description, values }: TooltipContentProps) {
  return (
    <>
      <div className={styles.title}>{title}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      {description && <div className={styles.description}>{description}</div>}
      {values && values.length > 0 && (
        <div className={styles.values}>
          {values.map((v, i) => (
            <code key={`${v}-${i}`}>'{v}'</code>
          ))}
        </div>
      )}
    </>
  );
}

export function Tooltip({ content, children, placement = 'top', delay = 100 }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const portalRoot = useFloatingPortalRoot();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(6), flip({ fallbackAxisSideDirection: 'start' }), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { delay: { open: delay, close: 0 } });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'tooltip' });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  // Skip rendering if no content
  if (!content) {
    return <>{children}</>;
  }

  // Clone child to add ref and props, merging existing event handlers
  const trigger = isValidElement(children) ? (
    cloneElement(children, (() => {
      const refProps = getReferenceProps();
      const mergedProps: Record<string, unknown> = { ref: refs.setReference };
      for (const [key, value] of Object.entries(refProps)) {
        const childHandler = (children as React.ReactElement).props[key];
        if (typeof childHandler === 'function' && typeof value === 'function') {
          mergedProps[key] = (...args: unknown[]) => { childHandler(...args); (value as Function)(...args); };
        } else {
          mergedProps[key] = value;
        }
      }
      return mergedProps;
    })())
  ) : (
    <span ref={refs.setReference} {...getReferenceProps()}>
      {children}
    </span>
  );

  return (
    <>
      {trigger}
      {open && (
        <FloatingPortal root={portalRoot ?? undefined}>
          <div
            ref={refs.setFloating}
            className={styles.tooltip}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

import type { ReactElement, ReactNode } from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  size,
  autoUpdate,
  FloatingPortal,
  type Placement,
} from '@floating-ui/react';

import { useFloatingPortalRoot } from './FloatingPortalProvider';
import styles from './Popover.module.css';

export type PopoverPosition = 'bottom-left' | 'bottom-right' | 'bottom';

type PopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactElement;
  position?: PopoverPosition;
  /** Match the floating element's width to the trigger */
  matchWidth?: boolean;
  children: ReactNode;
};

const POSITION_TO_PLACEMENT: Record<PopoverPosition, Placement> = {
  'bottom-left': 'bottom-start',
  'bottom-right': 'bottom-end',
  bottom: 'bottom',
};

export function Popover({
  open,
  onOpenChange,
  trigger,
  position = 'bottom-left',
  matchWidth = false,
  children,
}: PopoverProps) {
  const portalRoot = useFloatingPortalRoot();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    placement: POSITION_TO_PLACEMENT[position],
    middleware: [
      offset(4),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift({ padding: 8 }),
      ...(matchWidth
        ? [
            size({
              apply({ rects, elements }) {
                Object.assign(elements.floating.style, {
                  minWidth: `${rects.reference.width}px`,
                });
              },
            }),
          ]
        : []),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <span ref={refs.setReference} className={styles.trigger} {...getReferenceProps()}>
        {trigger}
      </span>
      {open && (
        <FloatingPortal root={portalRoot ?? undefined}>
          <div
            ref={refs.setFloating}
            className={styles.popover}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {children}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

import { useId, type ReactElement, type ReactNode } from 'react';
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
  FloatingFocusManager,
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
  'aria-label'?: string;
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
  'aria-label': ariaLabel,
  children,
}: PopoverProps) {
  const popoverId = useId();
  const portalRoot = useFloatingPortalRoot();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    placement: POSITION_TO_PLACEMENT[position],
    middleware: [
      offset(4),
      flip({ fallbackAxisSideDirection: 'end' }),
      shift({ padding: 8 }),
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
            ...(matchWidth ? { minWidth: `${rects.reference.width}px` } : {}),
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  return (
    <>
      <span
        ref={refs.setReference}
        className={styles.trigger}
        {...getReferenceProps()}
        aria-expanded={open}
        aria-controls={open ? popoverId : undefined}
      >
        {trigger}
      </span>
      {open && (
        <FloatingPortal root={portalRoot ?? undefined}>
          <FloatingFocusManager context={context}>
            <div
              ref={refs.setFloating}
              id={popoverId}
              role="dialog"
              aria-label={ariaLabel}
              className={styles.popover}
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

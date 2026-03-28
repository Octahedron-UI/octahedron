import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { AppIcon } from './AppIcon';
import { Text } from './Text';
import { ControlButton, ControlIconButton } from './ControlButton';
import { FloatingPortalProvider } from './FloatingPortalProvider';
import { cn } from '../lib/cn';
import styles from './Modal.module.css';

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  error?: ReactNode;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  hasUnsavedChanges?: boolean;
};

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  error,
  width = 480,
  className,
  style,
  hasUnsavedChanges = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mouseDownTargetRef = useRef<EventTarget | null>(null);
  const [confirmDiscardOpen, setConfirmDiscardOpen] = useState(false);
  const titleId = useId();

  // Sync dialog open state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
      setConfirmDiscardOpen(false);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    if (hasUnsavedChanges) {
      setConfirmDiscardOpen(true);
    } else {
      onClose();
    }
  }, [hasUnsavedChanges, onClose]);

  const handleConfirmDiscard = useCallback(() => {
    setConfirmDiscardOpen(false);
    onClose();
  }, [onClose]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    mouseDownTargetRef.current = e.target;
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      // Only close if BOTH mousedown and mouseup occurred on the backdrop
      const clickedOnBackdrop = e.target === dialogRef.current;
      const mouseDownOnBackdrop = mouseDownTargetRef.current === dialogRef.current;

      if (clickedOnBackdrop && mouseDownOnBackdrop) {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleCancel = useCallback(
    (e: React.SyntheticEvent<HTMLDialogElement>) => {
      e.preventDefault();
      handleClose();
    },
    [handleClose],
  );

  const confirmDialogRef = useRef<HTMLDialogElement>(null);

  // Sync confirm dialog open state
  useEffect(() => {
    const dialog = confirmDialogRef.current;
    if (!dialog) return;

    if (confirmDiscardOpen && !dialog.open) {
      dialog.showModal();
    } else if (!confirmDiscardOpen && dialog.open) {
      dialog.close();
    }
  }, [confirmDiscardOpen]);

  const handleCancelDiscard = useCallback(() => {
    setConfirmDiscardOpen(false);
  }, []);

  const handleConfirmDialogCancel = useCallback((e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault();
    setConfirmDiscardOpen(false);
  }, []);

  return (
    <>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onMouseDown={handleMouseDown}
        onClick={handleBackdropClick}
        onCancel={handleCancel}
      >
        <div className={cn(styles.container, className)} style={{ ...style, width }}>
          <div className={styles.header}>
            <Text variant="title" as="div" className={styles.title} id={titleId}>
              {title}
            </Text>
            <ControlIconButton
              icon={<AppIcon name="cross" />}
              ariaLabel="Close"
              onClick={handleClose}
              className={styles.closeButton}
            />
          </div>
          {error ? (
            <div className={styles.error}>
              <AppIcon name="warning-sign" className={styles.errorIcon} />
              <div className={styles.errorContent}>{error}</div>
            </div>
          ) : null}
          <div className={styles.body}>
            <FloatingPortalProvider>{children}</FloatingPortalProvider>
          </div>
          {footer ? <div className={styles.footer}>{footer}</div> : null}
        </div>
      </dialog>

      <dialog ref={confirmDialogRef} className={styles.dialog} onCancel={handleConfirmDialogCancel}>
        <div className={styles.container} style={{ width: 400 }}>
          <div className={styles.header}>
            <Text variant="title" as="div" className={styles.title}>
              Discard changes?
            </Text>
            <ControlIconButton
              icon={<AppIcon name="cross" />}
              ariaLabel="Close"
              onClick={handleCancelDiscard}
              className={styles.closeButton}
            />
          </div>
          <div className={styles.body}>You have unsaved changes that will be lost.</div>
          <div className={styles.footer}>
            <ModalActions>
              <ControlButton onClick={handleCancelDiscard}>Cancel</ControlButton>
              <ControlButton color="warning" onClick={handleConfirmDiscard}>
                Discard
              </ControlButton>
            </ModalActions>
          </div>
        </div>
      </dialog>
    </>
  );
}

export type ModalActionsProps = {
  children: ReactNode;
  className?: string;
};

export function ModalActions({ children, className }: ModalActionsProps) {
  return <div className={cn(styles.actions, className)}>{children}</div>;
}

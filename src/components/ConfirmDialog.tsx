import type { ReactNode } from 'react';

import { Button } from './Button';
import { Modal, ModalActions } from './Modal';

import styles from './ConfirmDialog.module.css';

export type ConfirmDialogIntent = 'default' | 'danger' | 'warning';

export type ConfirmDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: ReactNode;
  children: ReactNode;
  intent?: ConfirmDialogIntent;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

const DEFAULT_CONFIRM_TEXT: Record<ConfirmDialogIntent, string> = {
  default: 'Confirm',
  danger: 'Delete',
  warning: 'Confirm',
};

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirm',
  children,
  intent = 'default',
  confirmText,
  cancelText = 'Cancel',
  loading = false,
}: ConfirmDialogProps) {
  const resolvedConfirmText = confirmText ?? DEFAULT_CONFIRM_TEXT[intent];
  const buttonColor =
    intent === 'danger'
      ? ('danger' as const)
      : intent === 'warning'
        ? ('warning' as const)
        : ('primary' as const);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      width={400}
      footer={
        <ModalActions>
          <Button onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            color={buttonColor}
            onClick={() => void onConfirm()}
            loading={loading}
            disabled={loading}
          >
            {resolvedConfirmText}
          </Button>
        </ModalActions>
      }
    >
      <div className={styles.body}>{children}</div>
    </Modal>
  );
}

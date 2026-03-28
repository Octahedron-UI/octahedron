import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ConfirmDialog } from './ConfirmDialog';
import { ControlButton } from './ControlButton';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Overlay/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ControlButton onClick={() => setOpen(true)}>Open Confirm</ControlButton>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Confirm Action"
        >
          Are you sure you want to proceed?
        </ConfirmDialog>
      </>
    );
  },
};

export const Danger: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ControlButton color="danger" onClick={() => setOpen(true)}>
          Delete Item
        </ControlButton>
        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => setOpen(false)}
          title="Delete Item"
          intent="danger"
        >
          This action cannot be undone. The item and all associated data will be permanently removed.
        </ConfirmDialog>
      </>
    );
  },
};

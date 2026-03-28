import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Modal, ModalActions } from './Modal';
import { ControlButton } from './ControlButton';

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    title: 'Edit Profile',
    children: 'Modal body content goes here.',
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ControlButton onClick={() => setOpen(true)}>Open Modal</ControlButton>
        <Modal {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ControlButton onClick={() => setOpen(true)}>Open Modal</ControlButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          footer={
            <ModalActions>
              <ControlButton onClick={() => setOpen(false)}>Cancel</ControlButton>
              <ControlButton color="primary" onClick={() => setOpen(false)}>
                Save
              </ControlButton>
            </ModalActions>
          }
        >
          Are you sure you want to save these changes?
        </Modal>
      </>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ControlButton onClick={() => setOpen(true)}>Open Modal</ControlButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Import Data"
          error="3 rows failed validation. Please fix the errors and try again."
        >
          Upload your CSV file to import inventory data.
        </Modal>
      </>
    );
  },
};

export const WithUnsavedChanges: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ControlButton onClick={() => setOpen(true)}>Open Modal</ControlButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Edit Item"
          hasUnsavedChanges
        >
          Try closing this modal to see the discard confirmation.
        </Modal>
      </>
    );
  },
};

export const CustomWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <ControlButton onClick={() => setOpen(true)}>Open Modal</ControlButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Wide Modal"
          width={720}
        >
          This modal uses a custom width of 720px.
        </Modal>
      </>
    );
  },
};

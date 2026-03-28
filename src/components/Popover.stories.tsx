import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Popover } from './Popover';
import { ControlButton } from './ControlButton';

const meta: Meta<typeof Popover> = {
  title: 'Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<ControlButton>Toggle Popover</ControlButton>}
      >
        <div style={{ padding: 12 }}>Popover content goes here.</div>
      </Popover>
    );
  },
};

export const BottomRight: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<ControlButton>Bottom Right</ControlButton>}
        position="bottom-right"
      >
        <div style={{ padding: 12 }}>Aligned to bottom-right.</div>
      </Popover>
    );
  },
};

export const MatchWidth: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
        trigger={<ControlButton style={{ width: 240 }}>Match Width Trigger</ControlButton>}
        matchWidth
      >
        <div style={{ padding: 12 }}>This popover matches the trigger width.</div>
      </Popover>
    );
  },
};

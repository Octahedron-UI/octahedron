import type { Meta, StoryObj } from '@storybook/react-vite';

import { ControlButton, ControlIconButton } from './ControlButton';
import { AppIcon } from './AppIcon';

const meta: Meta<typeof ControlButton> = {
  title: 'Actions/ControlButton',
  component: ControlButton,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ControlButton>;

export const Default: Story = {
  args: { children: 'Button' },
};

export const Solid: Story = {
  args: { variant: 'solid', color: 'primary', children: 'Solid' },
};

export const Soft: Story = {
  args: { variant: 'soft', color: 'primary', children: 'Soft' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const WithIcon: Story = {
  args: { icon: <AppIcon name="plus" />, color: 'primary', children: 'Add Item' },
};

export const WithRightIcon: Story = {
  args: { rightIcon: <AppIcon name="chevron-right" />, children: 'Next' },
};

export const Compact: Story = {
  args: { compact: true, children: 'Compact' },
};

export const Loading: Story = {
  args: { loading: true, color: 'primary', children: 'Saving...' },
};

export const Danger: Story = {
  args: { color: 'danger', children: 'Delete' },
};

export const Success: Story = {
  args: { color: 'success', children: 'Approve' },
};

export const Accent: Story = {
  args: { color: 'accent', children: 'Featured' },
};

export const IconButton: StoryObj<typeof ControlIconButton> = {
  render: () => (
    <ControlIconButton icon={<AppIcon name="edit" />} ariaLabel="Edit" />
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppIcon } from './AppIcon';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search or filter criteria.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No orders yet',
    description: 'Create your first order to get started.',
    action: <button type="button">Create Order</button>,
  },
};

export const WithIcon: Story = {
  args: {
    icon: <AppIcon name="box" size={32} />,
    title: 'No inventory items',
    description: 'Add items to start tracking your inventory.',
    action: <button type="button">Add Item</button>,
  },
};

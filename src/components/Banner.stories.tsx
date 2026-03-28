import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppIcon } from './AppIcon';
import { Banner } from './Banner';

const meta: Meta<typeof Banner> = {
  title: 'Feedback/Banner',
  component: Banner,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: { children: 'This is a general-purpose banner with no specific intent.' },
};

export const Success: Story = {
  args: { intent: 'success', children: 'Order #4821 has been confirmed and is ready for fulfillment.' },
};

export const Warning: Story = {
  args: { intent: 'warning', children: 'Inventory for 3 SKUs is below the reorder threshold.' },
};

export const Danger: Story = {
  args: { intent: 'danger', children: 'Payment failed. Please update your billing information.' },
};

export const Info: Story = {
  args: { intent: 'info', children: 'A new version of the platform is available.' },
};

export const WithTitle: Story = {
  args: {
    intent: 'warning',
    title: 'Low Stock Alert',
    children: '12 items are below minimum inventory levels and need to be reordered.',
  },
};

export const WithAction: Story = {
  args: {
    intent: 'danger',
    title: 'Sync Failed',
    children: 'The last inventory sync encountered 3 errors.',
    action: <button type="button">Retry</button>,
  },
};

export const WithIcon: Story = {
  args: {
    intent: 'info',
    icon: <AppIcon name="info-sign" />,
    children: 'Scheduled maintenance window: Saturday 2:00 AM - 4:00 AM UTC.',
  },
};

// ── Callout variant ──

export const Callout: Story = {
  args: {
    variant: 'callout',
    children: 'This is a callout box with rounded corners for inset placement.',
  },
};

export const CalloutWithIntent: Story = {
  args: {
    variant: 'callout',
    intent: 'warning',
    title: 'Low Stock Alert',
    children: '12 items are below minimum inventory levels and need to be reordered.',
  },
};

export const CalloutWithIcon: Story = {
  args: {
    variant: 'callout',
    intent: 'info',
    icon: <AppIcon name="info-sign" />,
    children: 'Scheduled maintenance window: Saturday 2:00 AM - 4:00 AM UTC.',
  },
};

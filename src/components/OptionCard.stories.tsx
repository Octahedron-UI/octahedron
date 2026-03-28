import type { Meta, StoryObj } from '@storybook/react-vite';

import { OptionCard } from './OptionCard';

const meta: Meta<typeof OptionCard> = {
  title: 'Layout/OptionCard',
  component: OptionCard,
  tags: ['autodocs'],
  args: {
    onClick: () => {},
  },
};
export default meta;
type Story = StoryObj<typeof OptionCard>;

export const Default: Story = {
  args: { label: 'Standard Plan' },
};

export const Primary: Story = {
  args: { label: 'Pro Plan', variant: 'primary' },
};

export const Danger: Story = {
  args: { label: 'Delete Account', variant: 'danger' },
};

export const WithBadge: Story = {
  args: {
    label: 'Enterprise Plan',
    badge: <span style={{ fontSize: 12, padding: '2px 6px', background: 'var(--color-accent-3)', borderRadius: 4 }}>Popular</span>,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Team Plan',
    description: 'Best for teams of 5-20 members with shared billing.',
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Display/Tag',
  component: Tag,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: { children: 'Untagged' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Active' },
};

export const Error: Story = {
  args: { variant: 'error', children: 'Overdue' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Pending' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'In Transit' },
};

export const Accent: Story = {
  args: { variant: 'accent', children: 'Featured' },
};

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Draft' },
};

export const Closable: Story = {
  args: { variant: 'info', closable: true, children: 'Removable', onClose: () => {} },
};

export const WithHref: Story = {
  args: { href: '#', variant: 'accent', children: 'View Details' },
};

export const Mono: Story = {
  args: { mono: true, children: 'PO-20260327' },
};

export const WithColorSeed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag seed="alpha">Alpha</Tag>
      <Tag seed="beta">Beta</Tag>
      <Tag seed="gamma">Gamma</Tag>
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    children: 'Very long tag content that should be truncated',
    truncate: true,
  },
  decorators: [(Story) => <div style={{ maxWidth: 120 }}><Story /></div>],
};

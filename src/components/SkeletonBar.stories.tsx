import type { Meta, StoryObj } from '@storybook/react-vite';

import { SkeletonBar } from './SkeletonBar';

const meta: Meta<typeof SkeletonBar> = {
  title: 'Feedback/SkeletonBar',
  component: SkeletonBar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SkeletonBar>;

export const Default: Story = {
  args: { width: '60%' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SkeletonBar width="180px" size="sm" />
      <SkeletonBar width="180px" size="md" />
      <SkeletonBar width="180px" size="lg" />
    </div>
  ),
};

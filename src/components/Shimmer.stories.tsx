import type { Meta, StoryObj } from '@storybook/react-vite';

import { Shimmer } from './Shimmer';

const meta: Meta<typeof Shimmer> = {
  title: 'Feedback/Shimmer',
  component: Shimmer,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Shimmer>;

export const Default: Story = {
  args: { children: 'Loading content...' },
};

export const WithIcon: Story = {
  render: () => (
    <Shimmer>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
      </svg>
      {' '}analyzing...
    </Shimmer>
  ),
};

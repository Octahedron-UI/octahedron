import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Display/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 50 },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const Full: Story = {
  args: { value: 100 },
};

export const CustomColor: Story = {
  args: { value: 72, color: 'var(--gs-success)' },
};

export const CustomHeight: Story = {
  args: { value: 65, height: 12 },
};

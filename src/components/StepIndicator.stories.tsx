import type { Meta, StoryObj } from '@storybook/react-vite';

import { StepIndicator } from './StepIndicator';

const meta: Meta<typeof StepIndicator> = {
  title: 'Feedback/StepIndicator',
  component: StepIndicator,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StepIndicator>;

export const Default: Story = {
  args: {
    steps: [
      { key: 'details', label: 'Details', status: 'completed' },
      { key: 'review', label: 'Review', status: 'current' },
      { key: 'confirm', label: 'Confirm', status: 'upcoming' },
    ],
  },
};

export const AllCompleted: Story = {
  args: {
    steps: [
      { key: 'details', label: 'Details', status: 'completed' },
      { key: 'review', label: 'Review', status: 'completed' },
      { key: 'confirm', label: 'Confirm', status: 'completed' },
    ],
  },
};

export const AllUpcoming: Story = {
  args: {
    steps: [
      { key: 'details', label: 'Details', status: 'upcoming' },
      { key: 'review', label: 'Review', status: 'upcoming' },
      { key: 'confirm', label: 'Confirm', status: 'upcoming' },
    ],
  },
};

export const Clickable: Story = {
  args: {
    steps: [
      { key: 'details', label: 'Details', status: 'completed' },
      { key: 'shipping', label: 'Shipping', status: 'completed' },
      { key: 'payment', label: 'Payment', status: 'current' },
      { key: 'confirm', label: 'Confirm', status: 'upcoming' },
    ],
    onStepClick: (key) => alert(`Navigate to: ${key}`),
  },
};

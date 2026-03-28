import type { Meta, StoryObj } from '@storybook/react-vite';

import { StackedBar } from './StackedBar';

const meta: Meta<typeof StackedBar> = {
  title: 'Display/StackedBar',
  component: StackedBar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StackedBar>;

const defaultSegments = [
  { id: 'allocated', value: 45, color: '#22d3a7', label: '45 Allocated' },
  { id: 'in-transit', value: 25, color: '#3b82f6', label: '25 In Transit' },
  { id: 'pending', value: 15, color: '#f59e0b', label: '15 Pending' },
  { id: 'shortfall', value: 15, color: '#ef4444', label: '15 Short' },
];

export const Default: Story = {
  args: {
    segments: defaultSegments,
    title: 'Fulfillment Breakdown',
    label: '85/100',
  },
};

export const WithTitle: Story = {
  args: {
    segments: defaultSegments.slice(0, 3),
    title: 'Supply Breakdown',
    label: '85/100',
  },
};

export const WithLegend: Story = {
  args: {
    segments: defaultSegments,
    title: 'Inventory Status',
    showLegend: true,
    label: '85/100',
  },
};

export const Interactive: Story = {
  args: {
    segments: defaultSegments,
    interactive: true,
    showLegend: true,
    onSegmentClick: (id) => alert(`Clicked: ${id}`),
  },
};

export const Loading: Story = {
  args: {
    segments: [],
    loading: true,
    showLegend: true,
    label: ' ',
    title: 'Loading Data',
  },
};

export const Empty: Story = {
  args: {
    segments: [
      { id: 'empty', value: 0, color: '#22d3a7' },
    ],
    emptyMessage: 'No allocation data available',
    label: '0/0',
  },
};

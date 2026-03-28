import type { Meta, StoryObj } from '@storybook/react-vite';

import { SurfaceCard } from './SurfaceCard';

const meta: Meta<typeof SurfaceCard> = {
  title: 'Layout/SurfaceCard',
  component: SurfaceCard,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SurfaceCard>;

export const Default: Story = {
  args: {
    children: 'Basic card content with default small padding.',
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    padding: 'md',
    onClick: () => {},
    children: 'Clickable card with medium padding. Hover to see the interactive state.',
  },
};

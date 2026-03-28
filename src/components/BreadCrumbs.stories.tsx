import type { Meta, StoryObj } from '@storybook/react-vite';

import { BreadCrumbs } from './BreadCrumbs';

const meta: Meta<typeof BreadCrumbs> = {
  title: 'Navigation/BreadCrumbs',
  component: BreadCrumbs,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof BreadCrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Widget Pro' },
    ],
  },
};

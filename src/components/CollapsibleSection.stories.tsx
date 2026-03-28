import type { Meta, StoryObj } from '@storybook/react-vite';

import { CollapsibleSection } from './CollapsibleSection';

const meta: Meta<typeof CollapsibleSection> = {
  title: 'Layout/CollapsibleSection',
  component: CollapsibleSection,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CollapsibleSection>;

export const Default: Story = {
  args: {
    title: 'Advanced Options',
    defaultExpanded: true,
    children: 'Expanded section content. Configure advanced settings here.',
  },
};

export const Collapsed: Story = {
  args: {
    title: 'Additional Details',
    defaultExpanded: false,
    children: 'This content is hidden by default. Click the header to reveal it.',
  },
};

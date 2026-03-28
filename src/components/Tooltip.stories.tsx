import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip, TooltipContent } from './Tooltip';
import { ControlButton } from './ControlButton';

const meta: Meta<typeof Tooltip> = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Save your changes',
    children: <ControlButton>Hover me</ControlButton>,
  },
};

export const TopPlacement: Story = {
  args: {
    content: 'Tooltip on top',
    placement: 'top',
    children: <ControlButton>Top</ControlButton>,
  },
  decorators: [(Story) => <div style={{ paddingTop: 60 }}><Story /></div>],
};

export const WithDelay: Story = {
  args: {
    content: 'Delayed tooltip (500ms)',
    delay: 500,
    children: <ControlButton>Hover and wait</ControlButton>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <TooltipContent
        title="status"
        subtitle="string"
        description="Current order fulfillment status."
        values={['pending', 'shipped', 'delivered']}
      />
    ),
    children: <ControlButton>Rich Tooltip</ControlButton>,
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Forms/Slider',
  component: Slider,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return <Slider {...args} min={0} max={100} step={1} value={value} onValueChange={setValue} />;
  },
};

export const CustomRange: Story = {
  render: (args) => {
    const [value, setValue] = useState(0.5);
    return (
      <Slider {...args} min={0} max={1} step={0.01} value={value} onValueChange={setValue} />
    );
  },
};

export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    step: 1,
    value: 30,
    disabled: true,
    onValueChange: () => {},
  },
};

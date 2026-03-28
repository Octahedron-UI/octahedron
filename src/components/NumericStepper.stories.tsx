import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumericStepper } from './NumericStepper';

const meta: Meta<typeof NumericStepper> = {
  title: 'Forms/NumericStepper',
  component: NumericStepper,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof NumericStepper>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(0);
    return <NumericStepper {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [value, setValue] = useState(1);
    return <NumericStepper {...args} value={value} onValueChange={setValue} min={1} max={10} />;
  },
};

export const WithStep: Story = {
  render: (args) => {
    const [value, setValue] = useState(0);
    return <NumericStepper {...args} value={value} onValueChange={setValue} step={5} min={0} max={100} />;
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    disabled: true,
    onValueChange: () => {},
  },
};

export const ShowPlusSign: Story = {
  render: (args) => {
    const [value, setValue] = useState(5);
    return (
      <NumericStepper
        {...args}
        value={value}
        onValueChange={setValue}
        min={-10}
        max={10}
        showPlusSign
      />
    );
  },
};

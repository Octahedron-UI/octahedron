import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Forms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onValueChange={setChecked} />;
  },
};

export const On: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Toggle {...args} checked={checked} onValueChange={setChecked} />;
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Toggle {...args} checked={checked} onValueChange={setChecked} label="Enable notifications" />;
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Feature unavailable',
    onValueChange: () => {},
  },
};

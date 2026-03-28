import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onValueChange={setChecked} />;
  },
};

export const Checked: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Checkbox {...args} checked={checked} onValueChange={setChecked} />;
  },
};

export const Indeterminate: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} indeterminate onValueChange={setChecked} />;
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onValueChange={setChecked}
        label="I agree to the terms and conditions"
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Unavailable option',
    onValueChange: () => {},
  },
};

export const Fill: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onValueChange={setChecked} label="Full width" fill />;
  },
};

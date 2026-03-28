import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <DatePicker {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('2026-03-15');
    return <DatePicker {...args} value={value} onValueChange={setValue} />;
  },
};

export const WithMinMax: Story = {
  render: (args) => {
    const [value, setValue] = useState('2026-03-15');
    return (
      <DatePicker
        {...args}
        value={value}
        onValueChange={setValue}
        min="2026-03-01"
        max="2026-03-31"
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    value: '2026-01-01',
    disabled: true,
  },
};

export const Fill: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <DatePicker {...args} value={value} onValueChange={setValue} fill />;
  },
};

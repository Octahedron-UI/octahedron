import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date', 'time', 'datetime-local'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Filled: Story = {
  args: { filled: true, value: 'Inline text' },
};

export const Compact: Story = {
  args: { compact: true, placeholder: 'Compact input' },
};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Enter your email address' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Cannot edit this' },
};

export const Fill: Story = {
  args: { fill: true, placeholder: 'Full width input' },
};

export const Password: Story = {
  args: { type: 'password', placeholder: 'Enter password' },
};

export const Number: Story = {
  args: { type: 'number', placeholder: '0' },
};

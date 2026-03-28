import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Forms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    badgeVariant: {
      control: 'select',
      options: ['default', 'compressed'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Describe the issue in detail...' },
};

export const Badge: Story = {
  args: { badge: true, value: 'Inline editable text', rows: 1 },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'This content is read-only and cannot be modified.' },
};

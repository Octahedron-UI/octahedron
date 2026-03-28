import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileInput } from './FileInput';

const meta: Meta<typeof FileInput> = {
  title: 'Forms/FileInput',
  component: FileInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};

export const WithSelection: Story = {
  args: {
    text: 'report-2026-q1.csv',
    hasSelection: true,
  },
};

export const Fill: Story = {
  args: { fill: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropZone } from './DropZone';
const meta: Meta<typeof DropZone> = {
  title: 'Forms/DropZone',
  component: DropZone,
  tags: ['autodocs'],
  args: {
    onFiles: () => {},
  },
};
export default meta;
type Story = StoryObj<typeof DropZone>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    text: 'Drop your CSV or Excel files here',
    accept: '.csv,.xlsx',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

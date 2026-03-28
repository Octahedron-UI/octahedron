import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Text>;

export const Title: Story = {
  args: { variant: 'title', children: 'Page Title' },
};

export const Label: Story = {
  args: { variant: 'label', children: 'Field Label' },
};

export const Body: Story = {
  args: { variant: 'body', children: 'Body text for paragraphs and general content.' },
};

export const Caption: Story = {
  args: { variant: 'caption', children: 'Updated 3 minutes ago' },
};

export const Overline: Story = {
  args: { variant: 'overline', children: 'Section Header' },
};

export const Muted: Story = {
  args: { intent: 'muted', children: 'Muted helper text' },
};

export const Info: Story = {
  args: { intent: 'info', children: 'Informational message' },
};

export const Success: Story = {
  args: { intent: 'success', children: 'Operation completed' },
};

export const Warning: Story = {
  args: { intent: 'warning', children: 'Approaching usage limit' },
};

export const Danger: Story = {
  args: { intent: 'danger', children: 'Failed to save changes' },
};

export const Accent: Story = {
  args: { intent: 'accent', children: 'Featured item' },
};

export const Mono: Story = {
  args: { mono: true, children: 'SKU-00482-A' },
};

export const Italic: Story = {
  args: { italic: true, children: 'No description provided' },
};

export const WithIntent: Story = {
  name: 'With Intent (success/warning/danger)',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text intent="success">Operation completed successfully</Text>
      <Text intent="warning">Approaching usage limit</Text>
      <Text intent="danger">Failed to save changes</Text>
    </div>
  ),
};

export const Truncated: Story = {
  args: {
    truncate: true,
    children: 'This is a very long line of text that should be truncated with an ellipsis when it overflows the container width',
  },
  decorators: [(Story) => <div style={{ maxWidth: 240 }}><Story /></div>],
};

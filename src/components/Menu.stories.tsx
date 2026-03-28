import type { Meta, StoryObj } from '@storybook/react-vite';

import { Menu, MenuItem, MenuDivider } from './Menu';
import { AppIcon } from './AppIcon';

const meta: Meta<typeof Menu> = {
  title: 'Overlay/Menu',
  component: Menu,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 220 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuItem onClick={() => {}}>Edit</MenuItem>
      <MenuItem onClick={() => {}}>Duplicate</MenuItem>
      <MenuDivider />
      <MenuItem onClick={() => {}}>Archive</MenuItem>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <MenuItem icon={<AppIcon name="edit" />} onClick={() => {}}>Edit</MenuItem>
      <MenuItem icon={<AppIcon name="duplicate" />} onClick={() => {}}>Duplicate</MenuItem>
      <MenuItem icon={<AppIcon name="download" />} onClick={() => {}}>Export</MenuItem>
    </Menu>
  ),
};

export const WithDanger: Story = {
  render: () => (
    <Menu>
      <MenuItem onClick={() => {}}>Edit</MenuItem>
      <MenuItem onClick={() => {}}>Duplicate</MenuItem>
      <MenuDivider />
      <MenuItem intent="danger" onClick={() => {}}>Delete</MenuItem>
    </Menu>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <Menu>
      <MenuItem onClick={() => {}}>Edit</MenuItem>
      <MenuItem disabled onClick={() => {}}>Duplicate (unavailable)</MenuItem>
      <MenuItem onClick={() => {}}>Archive</MenuItem>
    </Menu>
  ),
};

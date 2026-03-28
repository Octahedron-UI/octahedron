import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Forms/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <SearchInput {...args} id="search-default" value={value} onValueChange={setValue} />;
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('active users');
    return <SearchInput {...args} id="search-value" value={value} onValueChange={setValue} />;
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <SearchInput {...args} id="search-disabled" value={value} onValueChange={setValue} disabled />
    );
  },
};

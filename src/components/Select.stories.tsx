import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'badge'] },
    size: { control: 'select', options: ['default', 'compact'] },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
  { value: 'draft', label: 'Draft' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'deleted', label: 'Deleted', disabled: true },
];

const timezoneOptions = [
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
  { value: 'Europe/Berlin', label: 'Central European Time (CET)' },
  { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
  { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
];

const groupedOptions = [
  {
    label: 'North America',
    options: [
      { value: 'America/New_York', label: 'Eastern Time (ET)' },
      { value: 'America/Chicago', label: 'Central Time (CT)' },
      { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
      { value: 'Europe/Berlin', label: 'Central European Time (CET)' },
    ],
  },
  {
    label: 'Asia-Pacific',
    options: [
      { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
      { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('active');
    return (
      <Select
        options={statusOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select status"
      />
    );
  },
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = useState('America/New_York');
    return (
      <Select
        groups={groupedOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select timezone"
      />
    );
  },
};

export const Badge: Story = {
  render: () => {
    const [value, setValue] = useState('active');
    return (
      <Select
        options={statusOptions}
        value={value}
        onValueChange={setValue}
        variant="badge"
      />
    );
  },
};

export const Compact: Story = {
  render: () => {
    const [value, setValue] = useState('active');
    return (
      <Select
        options={statusOptions}
        value={value}
        onValueChange={setValue}
        size="compact"
      />
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={timezoneOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Search timezones..."
        searchable
        searchPlaceholder="Filter timezones..."
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Select
      options={statusOptions}
      value="active"
      disabled
    />
  ),
};

export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        options={statusOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Choose a status..."
      />
    );
  },
};

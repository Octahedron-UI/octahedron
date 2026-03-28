import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterPill } from './FilterPill';

const meta: Meta<typeof FilterPill> = {
  title: 'Forms/FilterPill',
  component: FilterPill,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FilterPill>;

const columnOptions = [
  { value: 'status', label: 'Status' },
  { value: 'priority', label: 'Priority' },
  { value: 'assignee', label: 'Assignee' },
];

const operatorOptions = [
  { value: 'is', label: 'is' },
  { value: 'is_not', label: 'is not' },
  { value: 'contains', label: 'contains' },
];

const statusValueOptions = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
];

export const SelectValue: Story = {
  render: () => {
    const [col, setCol] = useState('status');
    const [op, setOp] = useState('is');
    const [val, setVal] = useState('active');
    return (
      <FilterPill
        column={{
          value: col,
          label: columnOptions.find((o) => o.value === col)?.label ?? col,
          options: columnOptions,
          onValueChange: setCol,
        }}
        operator={{
          value: op,
          label: operatorOptions.find((o) => o.value === op)?.label ?? op,
          options: operatorOptions,
          onValueChange: setOp,
        }}
        value={{
          kind: 'select',
          value: val,
          label: statusValueOptions.find((o) => o.value === val)?.label ?? val,
          options: statusValueOptions,
          onValueChange: setVal,
        }}
        onRemove={() => {}}
      />
    );
  },
};

export const TextValue: Story = {
  render: () => {
    const [col, setCol] = useState('assignee');
    const [op, setOp] = useState('contains');
    const [val, setVal] = useState('John');
    return (
      <FilterPill
        column={{
          value: col,
          label: columnOptions.find((o) => o.value === col)?.label ?? col,
          options: columnOptions,
          onValueChange: setCol,
        }}
        operator={{
          value: op,
          label: operatorOptions.find((o) => o.value === op)?.label ?? op,
          options: operatorOptions,
          onValueChange: setOp,
        }}
        value={{
          kind: 'text',
          value: val,
          placeholder: 'Name...',
          onValueChange: setVal,
        }}
        onRemove={() => {}}
      />
    );
  },
};

export const NoneValue: Story = {
  render: () => {
    const [col, setCol] = useState('status');
    const [op, setOp] = useState('is');
    return (
      <FilterPill
        column={{
          value: col,
          label: columnOptions.find((o) => o.value === col)?.label ?? col,
          options: columnOptions,
          onValueChange: setCol,
        }}
        operator={{
          value: op,
          label: operatorOptions.find((o) => o.value === op)?.label ?? op,
          options: operatorOptions,
          onValueChange: setOp,
        }}
        value={{ kind: 'none' }}
        onRemove={() => {}}
      />
    );
  },
};

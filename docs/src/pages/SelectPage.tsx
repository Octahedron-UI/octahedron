import { useState } from 'react';
import { Select } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'dragonfruit', label: 'Dragonfruit' },
];

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
    ],
  },
];

export function SelectPage() {
  const [fruit, setFruit] = useState('apple');
  const [searchable, setSearchable] = useState('apple');
  const [badge, setBadge] = useState('cherry');
  const [grouped, setGrouped] = useState('apple');

  return (
    <>
      <h1 className="docs-title">Select</h1>
      <p className="docs-description">
        Dropdown select built on Popover and Menu, supporting search, groups, and badge styling.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<Select options={options} value={fruit} onValueChange={setFruit} />`}>
          <Select options={fruitOptions} value={fruit} onValueChange={setFruit} />
        </Demo>

        <Demo code={`<Select options={options} value={value} onValueChange={setValue} searchable />`}>
          <Select options={fruitOptions} value={searchable} onValueChange={setSearchable} searchable />
        </Demo>

        <Demo code={`<Select options={options} value={value} onValueChange={setValue} variant="badge" />`}>
          <Select options={fruitOptions} value={badge} onValueChange={setBadge} variant="badge" />
        </Demo>

        <Demo code={`<Select groups={groups} value={value} onValueChange={setValue} />`}>
          <Select groups={groupedOptions} value={grouped} onValueChange={setGrouped} />
        </Demo>

        <Demo code={`<Select options={options} value="apple" disabled />`}>
          <Select options={fruitOptions} value="apple" disabled />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'options', type: 'SelectEntry[]', description: 'Flat list of options (use options or groups, not both)' },
            { name: 'groups', type: 'SelectGroup[]', description: 'Grouped options with optional headers' },
            { name: 'value', type: 'string', description: 'Current selected value' },
            { name: 'onValueChange', type: '(value: string) => void', description: 'Called when a non-onClick option is selected' },
            { name: 'trigger', type: 'ReactElement', description: 'Custom trigger element (overrides variant)' },
            { name: 'placeholder', type: 'string', default: '"Select..."', description: 'Placeholder when no value selected' },
            { name: 'variant', type: '"default" | "badge"', default: '"default"', description: 'Trigger style variant' },
            { name: 'size', type: '"default" | "compact"', default: '"default"', description: 'Trigger size' },
            { name: 'colorSeed', type: 'string', description: 'Seed for deterministic badge colors (falls back to value)' },
            { name: 'fill', type: 'boolean', description: 'Fill available width' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select' },
            { name: 'position', type: 'PopoverPosition', default: '"bottom-left"', description: 'Popover placement' },
            { name: 'open', type: 'boolean', description: 'Controlled popover open state' },
            { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback when popover open state changes' },
            { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable search input for filtering options' },
            { name: 'filterOption', type: '(option, query) => boolean', description: 'Custom filter function' },
            { name: 'searchPlaceholder', type: 'string', default: '"Search..."', description: 'Placeholder for search input' },
            { name: 'noResultsMessage', type: 'ReactNode', default: '"No options found"', description: 'Message shown when no options match filter' },
            { name: 'id', type: 'string', description: 'Form integration id' },
            { name: 'className', type: 'string', description: 'Class name for the trigger' },
            { name: 'menuClassName', type: 'string', description: 'Class name for the menu' },
          ]}
        />
      </div>
    </>
  );
}

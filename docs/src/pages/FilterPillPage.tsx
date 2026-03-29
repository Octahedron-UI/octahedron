import { useState } from 'react';
import { FilterPill } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function FilterPillPage() {
  const [textValue, setTextValue] = useState('acme');
  const [selectValue, setSelectValue] = useState('active');

  return (
    <div>
      <h1>FilterPill</h1>
      <p>Compound filter pill for data table filtering. Displays column, operator, and value as a segmented control with dropdowns and text inputs.</p>

      <h2>Text Filter</h2>
      <Demo code={`const [textValue, setTextValue] = useState('acme');\n\n<FilterPill\n  column={{\n    value: 'name',\n    label: 'Name',\n    options: [\n      { value: 'name', label: 'Name' },\n      { value: 'email', label: 'Email' },\n    ],\n    onValueChange: () => {},\n  }}\n  operator={{\n    value: 'contains',\n    label: 'contains',\n    options: [\n      { value: 'contains', label: 'contains' },\n      { value: 'equals', label: 'equals' },\n    ],\n    onValueChange: () => {},\n  }}\n  value={{\n    kind: 'text',\n    value: textValue,\n    onValueChange: setTextValue,\n    placeholder: 'Filter value',\n  }}\n  onRemove={() => {}}\n/>`}>
        <FilterPill
          column={{
            value: 'name',
            label: 'Name',
            options: [
              { value: 'name', label: 'Name' },
              { value: 'email', label: 'Email' },
            ],
            onValueChange: () => {},
          }}
          operator={{
            value: 'contains',
            label: 'contains',
            options: [
              { value: 'contains', label: 'contains' },
              { value: 'equals', label: 'equals' },
            ],
            onValueChange: () => {},
          }}
          value={{
            kind: 'text',
            value: textValue,
            onValueChange: setTextValue,
            placeholder: 'Filter value',
          }}
          onRemove={() => {}}
        />
      </Demo>

      <h2>Select Filter</h2>
      <Demo code={`const [selectValue, setSelectValue] = useState('active');\n\n<FilterPill\n  column={{\n    value: 'status',\n    label: 'Status',\n    options: [\n      { value: 'status', label: 'Status' },\n      { value: 'priority', label: 'Priority' },\n    ],\n    onValueChange: () => {},\n  }}\n  operator={{\n    value: 'is',\n    label: 'is',\n    options: [\n      { value: 'is', label: 'is' },\n      { value: 'is_not', label: 'is not' },\n    ],\n    onValueChange: () => {},\n  }}\n  value={{\n    kind: 'select',\n    value: selectValue,\n    label: selectValue === 'active' ? 'Active' : 'Inactive',\n    options: [\n      { value: 'active', label: 'Active' },\n      { value: 'inactive', label: 'Inactive' },\n    ],\n    onValueChange: setSelectValue,\n  }}\n  valueColorSeed={selectValue}\n  onRemove={() => {}}\n/>`}>
        <FilterPill
          column={{
            value: 'status',
            label: 'Status',
            options: [
              { value: 'status', label: 'Status' },
              { value: 'priority', label: 'Priority' },
            ],
            onValueChange: () => {},
          }}
          operator={{
            value: 'is',
            label: 'is',
            options: [
              { value: 'is', label: 'is' },
              { value: 'is_not', label: 'is not' },
            ],
            onValueChange: () => {},
          }}
          value={{
            kind: 'select',
            value: selectValue,
            label: selectValue === 'active' ? 'Active' : 'Inactive',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ],
            onValueChange: setSelectValue,
          }}
          valueColorSeed={selectValue}
          onRemove={() => {}}
        />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'column', type: 'FilterPillSelect', description: 'Column selector config: value, label, options, onValueChange, disabled, ariaLabel. Required.' },
          { name: 'operator', type: 'FilterPillSelect', description: 'Operator selector config: value, label, options, onValueChange, disabled, ariaLabel. Required.' },
          { name: 'value', type: 'FilterPillValue', description: "Value input config. Discriminated union: kind 'select' (dropdown), 'text' (free input), or 'none' (no value). Required." },
          { name: 'valueColorSeed', type: 'string', description: 'Seed for deterministic color on the value segment.' },
          { name: 'onRemove', type: '() => void', description: 'Called when the remove button is clicked.' },
          { name: 'removeLabel', type: 'string', description: 'Accessible label for the remove button.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
          { name: 'title', type: 'string', description: 'HTML title attribute.' },
        ]}
      />
    </div>
  );
}

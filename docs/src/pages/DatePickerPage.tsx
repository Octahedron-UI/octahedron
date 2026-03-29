import { useState } from 'react';
import { DatePicker } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function DatePickerPage() {
  const [date, setDate] = useState('');
  const [constrained, setConstrained] = useState('2025-06-15');

  return (
    <>
      <h1 className="docs-title">DatePicker</h1>
      <p className="docs-description">
        Date input with a calendar popup for selecting dates.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<DatePicker value={date} onValueChange={setDate} placeholder="Select a date" />`}>
          <DatePicker value={date} onValueChange={setDate} placeholder="Select a date" />
        </Demo>

        <Demo code={`<DatePicker value={constrained} onValueChange={setConstrained} min="2025-01-01" max="2025-12-31" />`}>
          <DatePicker value={constrained} onValueChange={setConstrained} min="2025-01-01" max="2025-12-31" />
        </Demo>

        <Demo code={`<DatePicker value="" onValueChange={() => {}} fill placeholder="Full width" />`}>
          <DatePicker value="" onValueChange={() => {}} fill placeholder="Full width" />
        </Demo>

        <Demo code={`<DatePicker value="2025-03-01" onValueChange={() => {}} disabled />`}>
          <DatePicker value="2025-03-01" onValueChange={() => {}} disabled />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'value', type: 'string', description: 'Selected date in YYYY-MM-DD format' },
            { name: 'onValueChange', type: '(value: string) => void', description: 'Callback when date changes' },
            { name: 'min', type: 'string', description: 'Minimum selectable date (YYYY-MM-DD)' },
            { name: 'max', type: 'string', description: 'Maximum selectable date (YYYY-MM-DD)' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the date picker' },
            { name: 'fill', type: 'boolean', default: 'false', description: 'Full width mode' },
            { name: 'id', type: 'string', description: 'Input id' },
            { name: 'className', type: 'string', description: 'Class name for the root element' },
          ]}
        />
      </div>
    </>
  );
}

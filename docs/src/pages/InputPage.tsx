import { useState } from 'react';
import { Input } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function InputPage() {
  const [value, setValue] = useState('');
  const [filledValue, setFilledValue] = useState('Edit me');

  return (
    <>
      <h1 className="docs-title">Input</h1>
      <p className="docs-description">
        Text input supporting controlled and uncontrolled patterns, with bordered and filled variants.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<Input value={value} onValueChange={setValue} placeholder="Enter text..." />`}>
          <Input value={value} onValueChange={setValue} placeholder="Enter text..." />
        </Demo>

        <Demo code={`<Input filled value={filledValue} onValueChange={setFilledValue} />`}>
          <Input filled value={filledValue} onValueChange={setFilledValue} />
        </Demo>

        <Demo code={`<Input compact placeholder="Compact input" />`}>
          <Input compact placeholder="Compact input" />
        </Demo>

        <Demo code={`<Input disabled placeholder="Disabled" />`}>
          <Input disabled placeholder="Disabled" />
        </Demo>

        <Demo code={`<Input fill placeholder="Full width input" />`}>
          <Input fill placeholder="Full width input" />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'value', type: 'string', description: 'Controlled value' },
            { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value (for native undo support)' },
            { name: 'onValueChange', type: '(value: string) => void', description: 'Callback when value changes (controlled mode)' },
            { name: 'filled', type: 'boolean', default: 'false', description: 'Inline mode: auto-sizes to content, no border' },
            { name: 'compact', type: 'boolean', default: 'false', description: 'Compact size for dense UIs' },
            { name: 'fill', type: 'boolean', default: 'false', description: 'Full width (only applies to bordered mode)' },
            { name: 'type', type: 'HTMLInputTypeAttribute', default: '"text"', description: 'Input type' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text' },
            { name: 'disabled', type: 'boolean', description: 'Disables the input' },
            { name: 'className', type: 'string', description: 'Class name for the wrapper' },
            { name: 'style', type: 'CSSProperties', description: 'Inline styles for the wrapper' },
            { name: 'inputClassName', type: 'string', description: 'Class name for the inner input element' },
          ]}
        />
      </div>
    </>
  );
}

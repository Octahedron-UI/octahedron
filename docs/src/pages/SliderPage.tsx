import { useState } from 'react';
import { Slider } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function SliderPage() {
  const [value, setValue] = useState(50);

  return (
    <>
      <h1 className="docs-title">Slider</h1>
      <p className="docs-description">
        Styled range input for selecting a numeric value within a range.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<Slider min={0} max={100} step={1} value={value} onValueChange={setValue} />`}>
          <Slider min={0} max={100} step={1} value={value} onValueChange={setValue} />
        </Demo>

        <Demo code={`<Slider min={0} max={100} step={1} value={50} onValueChange={() => {}} disabled />`}>
          <Slider min={0} max={100} step={1} value={50} onValueChange={() => {}} disabled />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'min', type: 'number', description: 'Minimum value (required)' },
            { name: 'max', type: 'number', description: 'Maximum value (required)' },
            { name: 'step', type: 'number', description: 'Step increment (required)' },
            { name: 'value', type: 'number', description: 'Current value (required)' },
            { name: 'onValueChange', type: '(value: number) => void', description: 'Callback when value changes (required)' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider' },
            { name: 'className', type: 'string', description: 'Class name for the root element' },
          ]}
        />
      </div>
    </>
  );
}

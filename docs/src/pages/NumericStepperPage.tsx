import { useState } from 'react';
import { NumericStepper } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function NumericStepperPage() {
  const [basic, setBasic] = useState(0);
  const [bounded, setBounded] = useState(5);
  const [stepped, setStepped] = useState(0);
  const [signed, setSigned] = useState(3);

  return (
    <>
      <h1 className="docs-title">NumericStepper</h1>
      <p className="docs-description">
        Increment/decrement control for numeric values.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<NumericStepper value={value} onValueChange={setValue} />`}>
          <NumericStepper value={basic} onValueChange={setBasic} />
        </Demo>

        <Demo code={`<NumericStepper value={value} onValueChange={setValue} min={0} max={10} />`}>
          <NumericStepper value={bounded} onValueChange={setBounded} min={0} max={10} />
        </Demo>

        <Demo code={`<NumericStepper value={value} onValueChange={setValue} step={5} />`}>
          <NumericStepper value={stepped} onValueChange={setStepped} step={5} />
        </Demo>

        <Demo code={`<NumericStepper value={value} onValueChange={setValue} showPlusSign />`}>
          <NumericStepper value={signed} onValueChange={setSigned} showPlusSign />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'value', type: 'number', description: 'Current value (required)' },
            { name: 'onValueChange', type: '(value: number) => void', description: 'Callback when value changes (required)' },
            { name: 'min', type: 'number', description: 'Minimum allowed value' },
            { name: 'max', type: 'number', description: 'Maximum allowed value' },
            { name: 'step', type: 'number', default: '1', description: 'Increment/decrement step size' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the control' },
            { name: 'showPlusSign', type: 'boolean', default: 'false', description: 'Show + prefix for positive values' },
            { name: 'className', type: 'string', description: 'Class name for the root element' },
          ]}
        />
      </div>
    </>
  );
}

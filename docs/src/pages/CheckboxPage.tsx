import { useState } from 'react';
import { Checkbox } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function CheckboxPage() {
  const [unchecked, setUnchecked] = useState(false);
  const [checked, setChecked] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  const [labeled, setLabeled] = useState(false);

  return (
    <>
      <h1 className="docs-title">Checkbox</h1>
      <p className="docs-description">
        Checkbox control with support for checked, indeterminate, and disabled states.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<Checkbox checked={false} onValueChange={setChecked} />`}>
          <Checkbox checked={unchecked} onValueChange={setUnchecked} />
        </Demo>

        <Demo code={`<Checkbox checked={true} onValueChange={setChecked} />`}>
          <Checkbox checked={checked} onValueChange={setChecked} />
        </Demo>

        <Demo code={`<Checkbox checked={false} indeterminate onValueChange={setChecked} />`}>
          <Checkbox checked={indeterminate} indeterminate={!indeterminate} onValueChange={setIndeterminate} />
        </Demo>

        <Demo code={`<Checkbox checked={checked} onValueChange={setChecked} label="Accept terms" />`}>
          <Checkbox checked={labeled} onValueChange={setLabeled} label="Accept terms" />
        </Demo>

        <Demo code={`<Checkbox checked={true} disabled label="Disabled" />`}>
          <Checkbox checked={true} disabled label="Disabled" />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'checked', type: 'boolean', description: 'Whether the checkbox is checked (required)' },
            { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Show indeterminate (minus) state' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox' },
            { name: 'fill', type: 'boolean', default: 'false', description: 'Full width layout' },
            { name: 'label', type: 'ReactNode', description: 'Label displayed next to the checkbox' },
            { name: 'ariaLabel', type: 'string', description: 'Accessible label (falls back to label text)' },
            { name: 'onValueChange', type: '(checked: boolean) => void', description: 'Callback when checked state changes' },
            { name: 'className', type: 'string', description: 'Class name for the root element' },
            { name: 'labelClassName', type: 'string', description: 'Class name for the label element' },
          ]}
        />
      </div>
    </>
  );
}

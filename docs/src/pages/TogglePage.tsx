import { useState } from 'react';
import { Toggle } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TogglePage() {
  const [off, setOff] = useState(false);
  const [on, setOn] = useState(true);
  const [labeled, setLabeled] = useState(false);

  return (
    <>
      <h1 className="docs-title">Toggle</h1>
      <p className="docs-description">
        Toggle switch for binary on/off states.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<Toggle checked={false} onValueChange={setChecked} />`}>
          <Toggle checked={off} onValueChange={setOff} />
        </Demo>

        <Demo code={`<Toggle checked={true} onValueChange={setChecked} />`}>
          <Toggle checked={on} onValueChange={setOn} />
        </Demo>

        <Demo code={`<Toggle checked={checked} onValueChange={setChecked} label="Enable notifications" />`}>
          <Toggle checked={labeled} onValueChange={setLabeled} label="Enable notifications" />
        </Demo>

        <Demo code={`<Toggle checked={true} disabled label="Disabled" />`}>
          <Toggle checked={true} disabled label="Disabled" />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'checked', type: 'boolean', description: 'Whether the toggle is on (required)' },
            { name: 'onValueChange', type: '(checked: boolean) => void', description: 'Callback when toggled' },
            { name: 'label', type: 'ReactNode', description: 'Label displayed next to the toggle' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle' },
            { name: 'className', type: 'string', description: 'Class name for the root element' },
          ]}
        />
      </div>
    </>
  );
}

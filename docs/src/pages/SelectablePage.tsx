import { useState } from 'react';
import { Selectable } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function SelectablePage() {
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <h1>Selectable</h1>
      <p>Toggleable selection button for filter chips, multi-select options, and tag-style controls.</p>

      <h2>Basic</h2>
      <Demo code={`const [selected, setSelected] = useState(false);\n\n<Selectable selected={selected} onValueChange={setSelected}>\n  Toggle me\n</Selectable>`}>
        <Selectable selected={selected} onValueChange={setSelected}>
          Toggle me
        </Selectable>
      </Demo>

      <h2>Disabled</h2>
      <Demo code={`<Selectable selected={false} disabled>Disabled</Selectable>\n<Selectable selected={true} disabled>Disabled selected</Selectable>`}>
        <Selectable selected={false} disabled>Disabled</Selectable>
        <Selectable selected={true} disabled>Disabled selected</Selectable>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'selected', type: 'boolean', description: 'Whether the button is in the selected state.' },
          { name: 'onValueChange', type: '(selected: boolean) => void', description: 'Called when selection state changes.' },
          { name: 'disabled', type: 'boolean', description: 'Disables the button.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
          { name: 'children', type: 'ReactNode', description: 'Button content.' },
          { name: '...rest', type: 'ButtonHTMLAttributes', description: 'All standard button attributes.' },
        ]}
      />
    </div>
  );
}

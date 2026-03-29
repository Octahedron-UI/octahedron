import { useState } from 'react';
import { CombinatorToggle } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function CombinatorTogglePage() {
  const [value, setValue] = useState<'and' | 'or'>('and');

  return (
    <div>
      <h1>CombinatorToggle</h1>
      <p>Pill-shaped toggle for switching between AND/OR filter combinators. Click to toggle between states.</p>

      <h2>Basic</h2>
      <Demo code={`const [value, setValue] = useState<'and' | 'or'>('and');\n\n<CombinatorToggle value={value} onValueChange={setValue} />`}>
        <CombinatorToggle value={value} onValueChange={setValue} />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'value', type: "'and' | 'or' | undefined", description: "Current combinator value. Defaults to 'and'." },
          { name: 'onValueChange', type: "(value: 'and' | 'or') => void", description: 'Called when the toggle is clicked.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

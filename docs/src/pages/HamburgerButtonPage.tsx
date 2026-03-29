import { useState } from 'react';
import { HamburgerButton } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function HamburgerButtonPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>HamburgerButton</h1>
      <p>Animated hamburger menu toggle button. Transitions between a hamburger icon and a close icon.</p>

      <h2>Toggle</h2>
      <Demo code={`const [open, setOpen] = useState(false);\n\n<HamburgerButton open={open} onClick={() => setOpen(!open)} />`}>
        <HamburgerButton open={open} onClick={() => setOpen(!open)} />
      </Demo>

      <h2>States</h2>
      <Demo code={`<HamburgerButton open={false} onClick={() => {}} />\n<HamburgerButton open={true} onClick={() => {}} />`}>
        <HamburgerButton open={false} onClick={() => {}} />
        <HamburgerButton open={true} onClick={() => {}} />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'Whether the menu is open. Controls the icon state (required).' },
          { name: 'onClick', type: '() => void', description: 'Called when the button is clicked (required).' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

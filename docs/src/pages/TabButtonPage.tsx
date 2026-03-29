import { TabButton } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TabButtonPage() {
  return (
    <div>
      <h1>TabButton</h1>
      <p>Standalone tab button for building custom tab interfaces. Supports pill and cutout visual variants.</p>

      <h2>Pill Variant</h2>
      <Demo code={`<TabButton variant="pill" active>Active</TabButton>\n<TabButton variant="pill">Inactive</TabButton>`}>
        <TabButton variant="pill" active>Active</TabButton>
        <TabButton variant="pill">Inactive</TabButton>
      </Demo>

      <h2>Cutout Variant</h2>
      <Demo code={`<TabButton variant="cutout" active>Active</TabButton>\n<TabButton variant="cutout">Inactive</TabButton>`}>
        <TabButton variant="cutout" active>Active</TabButton>
        <TabButton variant="cutout">Inactive</TabButton>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'active', type: 'boolean', description: 'Whether the tab is in the active state.' },
          { name: 'variant', type: "'pill' | 'cutout'", description: 'Visual variant of the tab button.' },
          { name: 'children', type: 'ReactNode', description: 'Tab label content.' },
          { name: '...rest', type: 'ButtonHTMLAttributes', description: 'All standard button attributes.' },
        ]}
      />
    </div>
  );
}

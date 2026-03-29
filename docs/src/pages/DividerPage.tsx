import { Divider } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function DividerPage() {
  return (
    <div>
      <h1>Divider</h1>
      <p>Horizontal separator for visually dividing content sections.</p>

      <h2>Basic</h2>
      <Demo direction="column" code={`<p>Content above the divider.</p>\n<Divider />\n<p>Content below the divider.</p>`}>
        <p>Content above the divider.</p>
        <Divider />
        <p>Content below the divider.</p>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

import { Table } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TablePage() {
  return (
    <div>
      <h1>Table</h1>
      <p>Lightweight styled table for static tabular data. No interactivity — just clean presentation.</p>

      <h2>Basic</h2>
      <Demo direction="column" code={`<Table columns={[
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
  { key: 'email', header: 'Email' },
]}>
  <tr><td>Alice</td><td>Engineer</td><td>alice@example.com</td></tr>
  <tr><td>Bob</td><td>Designer</td><td>bob@example.com</td></tr>
  <tr><td>Charlie</td><td>PM</td><td>charlie@example.com</td></tr>
</Table>`}>
        <Table columns={[
          { key: 'name', header: 'Name' },
          { key: 'role', header: 'Role' },
          { key: 'email', header: 'Email' },
        ]}>
          <tr><td>Alice</td><td>Engineer</td><td>alice@example.com</td></tr>
          <tr><td>Bob</td><td>Designer</td><td>bob@example.com</td></tr>
          <tr><td>Charlie</td><td>PM</td><td>charlie@example.com</td></tr>
        </Table>
      </Demo>

      <h2>With Code Cells</h2>
      <Demo direction="column" code={`<Table columns={[
  { key: 'token', header: 'Token' },
  { key: 'value', header: 'Value' },
]}>
  <tr><td><code>--spacing-sm</code></td><td><code>4px</code></td></tr>
  <tr><td><code>--spacing-md</code></td><td><code>8px</code></td></tr>
  <tr><td><code>--spacing-lg</code></td><td><code>16px</code></td></tr>
</Table>`}>
        <Table columns={[
          { key: 'token', header: 'Token' },
          { key: 'value', header: 'Value' },
        ]}>
          <tr><td><code>--spacing-sm</code></td><td><code>4px</code></td></tr>
          <tr><td><code>--spacing-md</code></td><td><code>8px</code></td></tr>
          <tr><td><code>--spacing-lg</code></td><td><code>16px</code></td></tr>
        </Table>
      </Demo>

      <h2>Bordered</h2>
      <Demo direction="column" code={`<Table variant="bordered" columns={[
  { key: 'class', header: 'Customer Class' },
  { key: '30min', header: '30 min' },
  { key: '1hr', header: '1 hr' },
  { key: '4hr', header: '4 hr' },
]}>
  <tr><td>Residential</td><td>$2.70</td><td>$3.90</td><td>$9.20</td></tr>
  <tr><td>Commercial</td><td>$15.20</td><td>$21.80</td><td>$68.30</td></tr>
  <tr><td>Industrial</td><td>$45.10</td><td>$82.50</td><td>$195.00</td></tr>
</Table>`}>
        <Table variant="bordered" columns={[
          { key: 'class', header: 'Customer Class' },
          { key: '30min', header: '30 min' },
          { key: '1hr', header: '1 hr' },
          { key: '4hr', header: '4 hr' },
        ]}>
          <tr><td>Residential</td><td>$2.70</td><td>$3.90</td><td>$9.20</td></tr>
          <tr><td>Commercial</td><td>$15.20</td><td>$21.80</td><td>$68.30</td></tr>
          <tr><td>Industrial</td><td>$45.10</td><td>$82.50</td><td>$195.00</td></tr>
        </Table>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'columns', type: 'TableColumn[]', description: 'Column definitions with key and header. Required.' },
          { name: 'children', type: 'ReactNode', description: 'Table body content (<tr> elements). Required.' },
          { name: 'variant', type: "'default' | 'bordered'", default: "'default'", description: 'Visual style. Bordered adds grid lines and surface-colored headers.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

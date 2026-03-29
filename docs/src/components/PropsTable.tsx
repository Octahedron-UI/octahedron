import { Table } from 'octahedron';

type Prop = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

const columns = [
  { key: 'prop', header: 'Prop' },
  { key: 'type', header: 'Type' },
  { key: 'default', header: 'Default' },
  { key: 'description', header: 'Description' },
];

export function PropsTable({ props }: { props: Prop[] }) {
  return (
    <Table columns={columns}>
      {props.map((p) => (
        <tr key={p.name}>
          <td><code>{p.name}</code></td>
          <td><code>{p.type}</code></td>
          <td>{p.default ? <code>{p.default}</code> : '—'}</td>
          <td>{p.description}</td>
        </tr>
      ))}
    </Table>
  );
}

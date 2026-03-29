import { DataTable } from 'octahedron';
import type { DataTableColumn } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

type Person = { name: string; email: string; role: string };

const sampleData: Person[] = [
  { name: 'Alice Chen', email: 'alice@example.com', role: 'Engineer' },
  { name: 'Bob Martinez', email: 'bob@example.com', role: 'Designer' },
  { name: 'Carol Johnson', email: 'carol@example.com', role: 'Manager' },
  { name: 'Dave Kim', email: 'dave@example.com', role: 'Engineer' },
  { name: 'Eve Wilson', email: 'eve@example.com', role: 'Designer' },
];

const columns: DataTableColumn<Person>[] = [
  { name: 'Name', cell: (row) => row.name },
  { name: 'Email', cell: (row) => row.email },
  { name: 'Role', cell: (row) => row.role },
];

const sortableColumns: DataTableColumn<Person>[] = [
  { name: 'Name', cell: (row) => row.name, sortValue: (row) => row.name },
  { name: 'Email', cell: (row) => row.email, sortValue: (row) => row.email },
  { name: 'Role', cell: (row) => row.role, sortValue: (row) => row.role },
];

export function DataTablePage() {
  return (
    <div>
      <h1>DataTable</h1>
      <p>Feature-rich table with sorting, pagination, loading skeletons, empty state, and hierarchical row support.</p>

      <h2>Basic</h2>
      <Demo direction="column" code={`const columns: DataTableColumn<Person>[] = [\n  { name: 'Name', cell: (row) => row.name },\n  { name: 'Email', cell: (row) => row.email },\n  { name: 'Role', cell: (row) => row.role },\n];\n\n<DataTable rows={data} columns={columns} />`}>
        <DataTable rows={sampleData} columns={columns} />
      </Demo>

      <h2>Sortable Columns</h2>
      <Demo direction="column" code={`const columns: DataTableColumn<Person>[] = [\n  { name: 'Name', cell: (row) => row.name, sortValue: (row) => row.name },\n  { name: 'Email', cell: (row) => row.email, sortValue: (row) => row.email },\n  { name: 'Role', cell: (row) => row.role, sortValue: (row) => row.role },\n];\n\n<DataTable rows={data} columns={columns} />`}>
        <DataTable rows={sampleData} columns={sortableColumns} />
      </Demo>

      <h2>Loading State</h2>
      <Demo direction="column" code={`<DataTable rows={[]} columns={columns} loading loadingRowCount={5} />`}>
        <DataTable rows={[]} columns={columns} loading loadingRowCount={5} />
      </Demo>

      <h2>Empty State</h2>
      <Demo direction="column" code={`<DataTable rows={[]} columns={columns} emptyMessage="No team members found." />`}>
        <DataTable rows={[]} columns={columns} emptyMessage="No team members found." />
      </Demo>

      <h2>DataTableProps</h2>
      <PropsTable
        props={[
          { name: 'rows', type: 'readonly Row[]', description: 'Array of row data (required).' },
          { name: 'columns', type: 'readonly DataTableColumn<Row>[]', description: 'Column definitions (required).' },
          { name: 'rowKey', type: '(row, index) => string | number', description: 'Unique key extractor for each row.' },
          { name: 'title', type: 'ReactNode', description: 'Content rendered above the table.' },
          { name: 'footer', type: 'ReactNode', description: 'Content rendered below the table.' },
          { name: 'bordered', type: 'boolean', default: 'true', description: 'Show cell borders.' },
          { name: 'striped', type: 'boolean', default: 'true', description: 'Alternate row background colors.' },
          { name: 'maxHeight', type: 'number | null', default: 'null', description: 'Maximum height before scrolling.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton loading rows.' },
          { name: 'loadingRowCount', type: 'number', default: '8', description: 'Number of skeleton rows when loading.' },
          { name: 'emptyMessage', type: 'ReactNode', default: '"No data"', description: 'Message shown when rows is empty and not loading.' },
          { name: 'pagination', type: 'false | DataTablePaginationConfig', default: 'false', description: 'Pagination configuration. Pass false to disable.' },
          { name: 'onRowClick', type: '(row, index) => void', description: 'Called when a row is clicked. Makes rows appear clickable.' },
          { name: 'ariaLabel', type: 'string', description: 'Accessible label for the table element.' },
        ]}
      />

      <h2>DataTableColumn</h2>
      <PropsTable
        props={[
          { name: 'name', type: 'string', description: 'Column header text (required).' },
          { name: 'cell', type: '(row, index) => ReactNode', description: 'Render function for cell content (required).' },
          { name: 'id', type: 'string | number', description: 'Unique column identifier. Defaults to name + index.' },
          { name: 'header', type: 'ReactNode', description: 'Custom header content. Overrides default name rendering.' },
          { name: 'maxWidth', type: 'number', description: 'Maximum content width before truncation.' },
          { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Text alignment for header and cells.' },
          { name: 'wrapText', type: 'boolean', description: 'Allow text wrapping in cells.' },
          { name: 'noPadding', type: 'boolean', description: 'Remove cell padding. Content is centered. Implies grow: false.' },
          { name: 'grow', type: 'boolean', description: 'Whether the column absorbs surplus table width.' },
          { name: 'sortValue', type: '(row) => string | number | Date | null', description: 'Enables sorting. Return the value to sort by.' },
          { name: 'defaultSortOrder', type: "'asc' | 'desc'", description: 'Default sort direction when first clicked.' },
          { name: 'skeleton', type: 'ReactNode', description: 'Custom skeleton content for loading state.' },
          { name: 'tooltip', type: '(row, index) => string | undefined', description: 'Tooltip text for each cell.' },
        ]}
      />
    </div>
  );
}

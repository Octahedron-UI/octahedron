import { SelectionBanner } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function SelectionBannerPage() {
  return (
    <div>
      <h1>SelectionBanner</h1>
      <p>Gmail-style bulk selection banner. Appears when all items on the current page are selected, prompting the user to select all items across pages.</p>

      <h2>All Page Items Selected</h2>
      <Demo direction="column" code={`<SelectionBanner\n  allPageItemsSelected\n  pageItemCount={25}\n  totalFilteredCount={142}\n  totalSelectedCount={25}\n  onSelectAll={() => {}}\n  itemsLabel="records"\n/>`}>
        <SelectionBanner
          allPageItemsSelected
          pageItemCount={25}
          totalFilteredCount={142}
          totalSelectedCount={25}
          onSelectAll={() => {}}
          itemsLabel="records"
        />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'allPageItemsSelected', type: 'boolean', description: 'Whether all items on the current page are selected.' },
          { name: 'pageItemCount', type: 'number', description: 'Number of items on the current page.' },
          { name: 'totalFilteredCount', type: 'number', description: 'Total number of items across all pages (filtered set).' },
          { name: 'totalSelectedCount', type: 'number', description: 'Number of items currently selected (may span pages).' },
          { name: 'onSelectAll', type: '() => void', description: 'Called when the user clicks "Select all X".' },
          { name: 'itemsLabel', type: 'string', default: "'items'", description: 'Label for the items (e.g., "recommendations", "groups").' },
        ]}
      />
    </div>
  );
}

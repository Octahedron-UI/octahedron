import { useState } from 'react';
import { SearchInput } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function SearchInputPage() {
  const [query, setQuery] = useState('');
  const [withPlaceholder, setWithPlaceholder] = useState('');
  const [cleared, setCleared] = useState('some text');

  return (
    <>
      <h1 className="docs-title">SearchInput</h1>
      <p className="docs-description">
        Search input with a built-in search icon and optional clear button.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<SearchInput id="search-basic" value={query} onValueChange={setQuery} />`}>
          <SearchInput id="search-basic" value={query} onValueChange={setQuery} />
        </Demo>

        <Demo code={`<SearchInput id="search-placeholder" value={withPlaceholder} onValueChange={setWithPlaceholder} placeholder="Search members..." />`}>
          <SearchInput id="search-placeholder" value={withPlaceholder} onValueChange={setWithPlaceholder} placeholder="Search members..." />
        </Demo>

        <Demo code={`<SearchInput id="search-clear" value={cleared} onValueChange={setCleared} />`}>
          <SearchInput id="search-clear" value={cleared} onValueChange={setCleared} />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'id', type: 'string', description: 'Input id (required)' },
            { name: 'value', type: 'string', description: 'Controlled value (required)' },
            { name: 'onValueChange', type: '(value: string) => void', description: 'Callback when value changes (required)' },
            { name: 'showClear', type: 'boolean', default: 'true', description: 'Whether to show the clear button when input has a value' },
            { name: 'placeholder', type: 'string', description: 'Placeholder text' },
            { name: 'disabled', type: 'boolean', description: 'Disables the input' },
            { name: 'className', type: 'string', description: 'Class name for the root element' },
          ]}
        />
      </div>
    </>
  );
}

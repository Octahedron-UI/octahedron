import { FileInput } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function FileInputPage() {
  return (
    <>
      <h1 className="docs-title">FileInput</h1>
      <p className="docs-description">
        Styled file input with a browse button.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<FileInput text="Choose file" />`}>
          <FileInput text="Choose file" />
        </Demo>

        <Demo code={`<FileInput text="Upload image" accept="image/*" />`}>
          <FileInput text="Upload image" accept="image/*" />
        </Demo>

        <Demo code={`<FileInput text="Choose file" fill />`}>
          <FileInput text="Choose file" fill />
        </Demo>

        <Demo code={`<FileInput text="Choose file" disabled />`}>
          <FileInput text="Choose file" disabled />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'text', type: 'string', description: 'Button label text' },
            { name: 'hasSelection', type: 'boolean', default: 'false', description: 'Whether a file is currently selected' },
            { name: 'fill', type: 'boolean', default: 'false', description: 'Full width mode' },
            { name: 'onInputChange', type: '(e: ChangeEvent) => void', description: 'Callback when a file is selected' },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input' },
            { name: 'accept', type: 'string', description: 'Accepted file types (e.g. "image/*", ".pdf")' },
            { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow selecting multiple files' },
          ]}
        />
      </div>
    </>
  );
}

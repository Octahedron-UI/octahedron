import { DropZone } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function DropZonePage() {
  return (
    <div>
      <h1>DropZone</h1>
      <p>File drag-and-drop zone for uploading files.</p>

      <h2>Basic</h2>
      <Demo code={`<DropZone onFiles={(files) => console.log(files)} />`}>
        <DropZone onFiles={(files) => console.log(files)} />
      </Demo>

      <h2>With Accept Filter</h2>
      <Demo code={`<DropZone\n  accept="image/*"\n  text="Drop images here"\n  onFiles={(files) => console.log(files)}\n/>`}>
        <DropZone
          accept="image/*"
          text="Drop images here"
          onFiles={(files) => console.log(files)}
        />
      </Demo>

      <h2>Disabled</h2>
      <Demo code={`<DropZone disabled onFiles={(files) => console.log(files)} />`}>
        <DropZone disabled onFiles={(files) => console.log(files)} />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'accept', type: 'string', description: 'Accepted file types (e.g. "image/*").' },
          { name: 'multiple', type: 'boolean', description: 'Allow multiple file selection.' },
          { name: 'onFiles', type: '(files: FileList) => void', description: 'Called when files are dropped or selected (required).' },
          { name: 'text', type: 'string', description: 'Custom instruction text.' },
          { name: 'icon', type: 'ReactNode', description: 'Custom icon element.' },
          { name: 'disabled', type: 'boolean', description: 'Disable the drop zone.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

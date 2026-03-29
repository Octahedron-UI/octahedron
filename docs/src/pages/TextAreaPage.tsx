import { TextArea } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TextAreaPage() {
  return (
    <>
      <h1 className="docs-title">TextArea</h1>
      <p className="docs-description">
        Textarea with an optional badge mode for compact inline display.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Examples</h2>

        <Demo code={`<TextArea defaultValue="Hello world" />`}>
          <TextArea defaultValue="Hello world" />
        </Demo>

        <Demo code={`<TextArea placeholder="Enter a description..." />`}>
          <TextArea placeholder="Enter a description..." />
        </Demo>

        <Demo code={`<TextArea badge defaultValue="Badge mode" />`}>
          <TextArea badge defaultValue="Badge mode" />
        </Demo>

        <Demo code={`<TextArea disabled defaultValue="Disabled textarea" />`}>
          <TextArea disabled defaultValue="Disabled textarea" />
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'badge', type: 'boolean', default: 'false', description: 'Renders in compact badge mode' },
            { name: 'badgeVariant', type: "'default' | 'compressed'", default: "'default'", description: 'Badge sizing variant' },
            { name: 'value', type: 'string', description: 'Controlled value' },
            { name: 'defaultValue', type: 'string', description: 'Uncontrolled default value' },
            { name: 'onValueChange', type: '(value: string) => void', description: 'Callback when value changes' },
            { name: 'inputClassName', type: 'string', description: 'Class name for the inner textarea element' },
            { name: 'className', type: 'string', description: 'Class name for the wrapper' },
            { name: 'style', type: 'CSSProperties', description: 'Inline styles for the wrapper' },
          ]}
        />
      </div>
    </>
  );
}

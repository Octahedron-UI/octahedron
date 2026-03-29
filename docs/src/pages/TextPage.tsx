import { Text } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TextPage() {
  return (
    <>
      <h1 className="docs-title">Text</h1>
      <p className="docs-description">
        Polymorphic text component with semantic variants, intents, and typographic options.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Variants</h2>

        <Demo code={`<Text variant="title">Title text</Text>`} direction="column">
          <Text variant="title">Title text</Text>
          <Text variant="label">Label text</Text>
          <Text variant="body">Body text</Text>
          <Text variant="caption">Caption text</Text>
          <Text variant="overline">Overline text</Text>
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Intents</h2>

        <Demo
          code={`<Text intent="muted">Muted</Text>\n<Text intent="success">Success</Text>\n<Text intent="warning">Warning</Text>\n<Text intent="danger">Danger</Text>`}
          direction="column"
        >
          <Text intent="muted">Muted text</Text>
          <Text intent="info">Info text</Text>
          <Text intent="success">Success text</Text>
          <Text intent="warning">Warning text</Text>
          <Text intent="danger">Danger text</Text>
          <Text intent="accent">Accent text</Text>
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Options</h2>

        <Demo code={`<Text mono>Monospace text</Text>`}>
          <Text mono>Monospace text</Text>
        </Demo>

        <Demo code={`<Text italic>Italic text</Text>`}>
          <Text italic>Italic text</Text>
        </Demo>

        <Demo code={`<Text truncate style={{ maxWidth: 200 }}>This is a very long text that will be truncated</Text>`}>
          <Text truncate style={{ maxWidth: 200 }}>This is a very long text that will be truncated when it overflows</Text>
        </Demo>

        <Demo code={`<Text as="div" variant="label">Rendered as div</Text>`}>
          <Text as="div" variant="label">Rendered as div</Text>
        </Demo>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">API</h2>
        <PropsTable
          props={[
            { name: 'variant', type: '"title" | "label" | "body" | "caption" | "overline"', default: '"body"', description: 'Text style variant' },
            { name: 'as', type: 'ElementType', description: 'Render as a different HTML element (overrides variant default)' },
            { name: 'intent', type: '"muted" | "info" | "success" | "warning" | "danger" | "accent"', description: 'Semantic color intent' },
            { name: 'mono', type: 'boolean', description: 'Use monospace font' },
            { name: 'italic', type: 'boolean', description: 'Italic text' },
            { name: 'truncate', type: 'boolean', description: 'Truncate text with ellipsis on overflow' },
            { name: 'className', type: 'string', description: 'Additional class name' },
          ]}
        />
      </div>
    </>
  );
}

import { useState } from 'react';
import { Tag } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TagPage() {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <h1>Tag</h1>
      <p>Compact label for status, categories, and metadata. Supports semantic variants, deterministic seed colors, and closable state.</p>

      <h2>Variants</h2>
      <Demo code={`<Tag variant="success">Success</Tag>\n<Tag variant="error">Error</Tag>\n<Tag variant="warning">Warning</Tag>\n<Tag variant="info">Info</Tag>\n<Tag variant="accent">Accent</Tag>\n<Tag variant="neutral">Neutral</Tag>`}>
        <Tag variant="success">Success</Tag>
        <Tag variant="error">Error</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="info">Info</Tag>
        <Tag variant="accent">Accent</Tag>
        <Tag variant="neutral">Neutral</Tag>
      </Demo>

      <h2>Closable</h2>
      <Demo code={`const [visible, setVisible] = useState(true);\n\n{visible && (\n  <Tag variant="info" closable onClose={() => setVisible(false)}>\n    Dismissable\n  </Tag>\n)}`}>
        {visible ? (
          <Tag variant="info" closable onClose={() => setVisible(false)}>Dismissable</Tag>
        ) : (
          <button type="button" onClick={() => setVisible(true)}>Reset</button>
        )}
      </Demo>

      <h2>Seed Color</h2>
      <Demo code={`<Tag seed="alice">Alice</Tag>\n<Tag seed="bob">Bob</Tag>\n<Tag seed="charlie">Charlie</Tag>\n<Tag seed="delta">Delta</Tag>`}>
        <Tag seed="alice">Alice</Tag>
        <Tag seed="bob">Bob</Tag>
        <Tag seed="charlie">Charlie</Tag>
        <Tag seed="delta">Delta</Tag>
      </Demo>

      <h2>Mono</h2>
      <Demo code={`<Tag mono>SYS_001</Tag>\n<Tag mono>REF_4829</Tag>`}>
        <Tag mono>SYS_001</Tag>
        <Tag mono>REF_4829</Tag>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'variant', type: "'success' | 'error' | 'warning' | 'info' | 'accent' | 'neutral'", description: 'Semantic variant for status colors.' },
          { name: 'color', type: 'string', description: 'Explicit CSS color for custom styling.' },
          { name: 'seed', type: 'string', description: 'Seed for deterministic color generation. Defaults to children text if no variant or color.' },
          { name: 'mono', type: 'boolean', description: 'Use monospace font.' },
          { name: 'href', type: 'string', description: 'Makes the tag a link.' },
          { name: 'truncate', type: 'boolean', default: 'true', description: 'Truncate text with ellipsis. Defaults to true for mono tags.' },
          { name: 'closable', type: 'boolean', description: 'Show a close button.' },
          { name: 'onClose', type: '() => void', description: 'Called when close button is clicked.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
          { name: 'title', type: 'string', description: 'HTML title attribute for hover text.' },
          { name: 'children', type: 'ReactNode', description: 'Tag content (required).' },
        ]}
      />
    </div>
  );
}

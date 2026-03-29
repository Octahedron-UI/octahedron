import { Card } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function CardPage() {
  return (
    <div>
      <h1>Card</h1>
      <p>Elevated card container for grouping related content.</p>

      <h2>Basic</h2>
      <Demo code={`<Card>Basic card content.</Card>`}>
        <Card>Basic card content.</Card>
      </Demo>

      <h2>Padding Variants</h2>
      <Demo direction="column" code={`<Card padding="none">No padding.</Card>\n<Card padding="sm">Small padding.</Card>\n<Card padding="md">Medium padding.</Card>`}>
        <Card padding="none">No padding.</Card>
        <Card padding="sm">Small padding.</Card>
        <Card padding="md">Medium padding.</Card>
      </Demo>

      <h2>Interactive</h2>
      <Demo direction="column" code={`<Card interactive onClick={() => alert('Clicked!')}>\n  Click this card.\n</Card>`}>
        <Card interactive onClick={() => alert('Clicked!')}>
          Click this card.
        </Card>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Card content.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
          { name: 'padding', type: "'none' | 'sm' | 'md'", description: 'Inner padding size.' },
          { name: 'clip', type: 'boolean', description: 'Clip overflowing content.' },
          { name: 'interactive', type: 'boolean', description: 'Enable hover and active states.' },
          { name: 'onClick', type: '() => void', description: 'Click handler.' },
          { name: 'title', type: 'string', description: 'HTML title attribute.' },
        ]}
      />
    </div>
  );
}

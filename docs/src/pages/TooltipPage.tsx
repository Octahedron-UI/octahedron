import { Tooltip, Button } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TooltipPage() {
  return (
    <div>
      <h1>Tooltip</h1>
      <p>Lightweight tooltip using floating-ui. Appears on hover and focus with configurable placement and delay.</p>

      <h2>Default</h2>
      <Demo code={`<Tooltip content="This is a tooltip">\n  <Button>Hover me</Button>\n</Tooltip>`}>
        <Tooltip content="This is a tooltip">
          <Button>Hover me</Button>
        </Tooltip>
      </Demo>

      <h2>Placements</h2>
      <Demo code={`<Tooltip content="Top" placement="top">\n  <Button>Top</Button>\n</Tooltip>\n<Tooltip content="Bottom" placement="bottom">\n  <Button>Bottom</Button>\n</Tooltip>\n<Tooltip content="Left" placement="left">\n  <Button>Left</Button>\n</Tooltip>\n<Tooltip content="Right" placement="right">\n  <Button>Right</Button>\n</Tooltip>`}>
        <Tooltip content="Top" placement="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip content="Bottom" placement="bottom">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip content="Left" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right" placement="right">
          <Button>Right</Button>
        </Tooltip>
      </Demo>

      <h2>With Delay</h2>
      <Demo code={`<Tooltip content="Instant" delay={0}>\n  <Button>No delay</Button>\n</Tooltip>\n<Tooltip content="Default (100ms)">\n  <Button>Default delay</Button>\n</Tooltip>\n<Tooltip content="Slow (500ms)" delay={500}>\n  <Button>500ms delay</Button>\n</Tooltip>`}>
        <Tooltip content="Instant" delay={0}>
          <Button>No delay</Button>
        </Tooltip>
        <Tooltip content="Default (100ms)">
          <Button>Default delay</Button>
        </Tooltip>
        <Tooltip content="Slow (500ms)" delay={500}>
          <Button>500ms delay</Button>
        </Tooltip>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'content', type: 'ReactNode', description: 'Content to display in the tooltip (required).' },
          { name: 'children', type: 'ReactNode', description: 'Trigger element (required).' },
          { name: 'placement', type: 'Placement', default: "'top'", description: 'Position relative to the trigger. Supports all floating-ui placements.' },
          { name: 'delay', type: 'number', default: '100', description: 'Delay in milliseconds before showing the tooltip.' },
        ]}
      />
    </div>
  );
}

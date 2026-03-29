import { useState } from 'react';
import { StackedBar } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function StackedBarPage() {
  const [clicked, setClicked] = useState('');

  return (
    <div>
      <h1>StackedBar</h1>
      <p>Horizontal stacked bar chart for visualizing proportional data. Supports legend, interactivity, and loading states.</p>

      <h2>Basic</h2>
      <Demo direction="column" code={`<StackedBar\n  segments={[\n    { id: 'completed', value: 60, color: '#22c55e', label: '60 Completed' },\n    { id: 'in-progress', value: 25, color: '#3b82f6', label: '25 In Progress' },\n    { id: 'blocked', value: 15, color: '#ef4444', label: '15 Blocked' },\n  ]}\n/>`}>
        <StackedBar
          segments={[
            { id: 'completed', value: 60, color: '#22c55e', label: '60 Completed' },
            { id: 'in-progress', value: 25, color: '#3b82f6', label: '25 In Progress' },
            { id: 'blocked', value: 15, color: '#ef4444', label: '15 Blocked' },
          ]}
        />
      </Demo>

      <h2>With Legend</h2>
      <Demo direction="column" code={`<StackedBar\n  title="Sprint Progress"\n  segments={[\n    { id: 'done', value: 12, color: '#22c55e', label: '12 Done' },\n    { id: 'review', value: 5, color: '#f59e0b', label: '5 In Review' },\n    { id: 'todo', value: 8, color: '#94a3b8', label: '8 To Do' },\n  ]}\n  showLegend\n/>`}>
        <StackedBar
          title="Sprint Progress"
          segments={[
            { id: 'done', value: 12, color: '#22c55e', label: '12 Done' },
            { id: 'review', value: 5, color: '#f59e0b', label: '5 In Review' },
            { id: 'todo', value: 8, color: '#94a3b8', label: '8 To Do' },
          ]}
          showLegend
        />
      </Demo>

      <h2>Interactive</h2>
      <Demo direction="column" code={`const [clicked, setClicked] = useState('');\n\n<StackedBar\n  segments={[\n    { id: 'overdue', value: 5, color: '#ef4444', label: '5 Overdue' },\n    { id: 'due-soon', value: 10, color: '#f59e0b', label: '10 Due Soon' },\n    { id: 'on-track', value: 30, color: '#22c55e', label: '30 On Track' },\n  ]}\n  interactive\n  onSegmentClick={(id) => setClicked(id)}\n  showLegend\n/>`}>
        <StackedBar
          segments={[
            { id: 'overdue', value: 5, color: '#ef4444', label: '5 Overdue' },
            { id: 'due-soon', value: 10, color: '#f59e0b', label: '10 Due Soon' },
            { id: 'on-track', value: 30, color: '#22c55e', label: '30 On Track' },
          ]}
          interactive
          onSegmentClick={(id) => setClicked(id)}
          showLegend
        />
        {clicked && <p>Clicked: {clicked}</p>}
      </Demo>

      <h2>Loading</h2>
      <Demo direction="column" code={`<StackedBar segments={[]} loading showLegend />`}>
        <StackedBar segments={[]} loading showLegend />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'segments', type: 'Segment[]', description: 'Segments to render. Each has id (string), value (number), color (string), and optional label (ReactNode). Required.' },
          { name: 'total', type: 'number', description: 'Total value for percentage calculation. Defaults to sum of segment values.' },
          { name: 'height', type: 'number', default: '8', description: 'Bar height in pixels.' },
          { name: 'title', type: 'string', description: 'Title displayed above the bar.' },
          { name: 'showLegend', type: 'boolean', default: 'false', description: 'Show legend with colored dots below the bar.' },
          { name: 'emptyMessage', type: 'string', description: 'Message shown when all segments are empty.' },
          { name: 'interactive', type: 'boolean', default: 'false', description: 'Enable hover effects and click handlers.' },
          { name: 'onSegmentClick', type: '(id: string, index: number) => void', description: 'Called when a segment or legend item is clicked. Requires interactive.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Show skeleton placeholder instead of the bar.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

import { Skeleton, Spinner, ProgressBar } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function LoadingPage() {
  return (
    <div>
      <h1>Loading &amp; Skeletons</h1>
      <p>Components for representing loading states, skeleton placeholders, and progress indicators.</p>

      <h2>Skeleton Bar</h2>
      <Demo direction="column" code={`<Skeleton />\n<Skeleton width="60%" />\n<Skeleton size="sm" width="40%" />\n<Skeleton size="lg" />`}>
        <Skeleton />
        <Skeleton width="60%" />
        <Skeleton size="sm" width="40%" />
        <Skeleton size="lg" />
      </Demo>

      <h3>Alignment</h3>
      <Demo direction="column" code={`<Skeleton width="50%" align="left" />\n<Skeleton width="50%" align="center" />\n<Skeleton width="50%" align="right" />`}>
        <Skeleton width="50%" align="left" />
        <Skeleton width="50%" align="center" />
        <Skeleton width="50%" align="right" />
      </Demo>

      <h2>Skeleton Text</h2>
      <Demo direction="column" code={`<Skeleton variant="text" />\n<Skeleton variant="text" lines={5} lastLineWidth="40%" />\n<Skeleton variant="text" size="sm" lines={2} />`}>
        <Skeleton variant="text" />
        <Skeleton variant="text" lines={5} lastLineWidth="40%" />
        <Skeleton variant="text" size="sm" lines={2} />
      </Demo>

      <h2>Spinner</h2>
      <Demo code={`<Spinner />\n<Spinner size={24} />\n<Spinner size={32} />`}>
        <Spinner />
        <Spinner size={24} />
        <Spinner size={32} />
      </Demo>

      <h2>ProgressBar</h2>
      <Demo direction="column" code={`<ProgressBar value={25} />\n<ProgressBar value={60} height={10} />\n<ProgressBar value={90} color="var(--color-danger)" />`}>
        <ProgressBar value={25} />
        <ProgressBar value={60} height={10} />
        <ProgressBar value={90} color="var(--color-danger)" />
      </Demo>

      <h2>Skeleton Props (Bar)</h2>
      <PropsTable
        props={[
          { name: 'variant', type: "'bar' | 'text'", default: "'bar'", description: 'Skeleton type.' },
          { name: 'width', type: 'string', default: "'100%'", description: 'Width of the skeleton bar.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height preset.' },
          { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Horizontal alignment of the bar.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />

      <h2>Skeleton Props (Text)</h2>
      <PropsTable
        props={[
          { name: 'variant', type: "'text'", description: "Must be 'text'." },
          { name: 'lines', type: 'number', default: '3', description: 'Number of skeleton lines to render.' },
          { name: 'lastLineWidth', type: 'string', default: "'60%'", description: 'Width of the last line for a natural look.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height preset for each line.' },
        ]}
      />

      <h2>Spinner Props</h2>
      <PropsTable
        props={[
          { name: 'size', type: 'number', default: '14', description: 'Diameter of the spinner in pixels.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />

      <h2>ProgressBar Props</h2>
      <PropsTable
        props={[
          { name: 'value', type: 'number', description: 'Progress value from 0 to 100 (required).' },
          { name: 'color', type: 'string', description: 'Custom color for the progress fill.' },
          { name: 'height', type: 'number', default: '6', description: 'Height of the bar in pixels.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

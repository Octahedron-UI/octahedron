import { StepIndicator } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function StepIndicatorPage() {
  return (
    <div>
      <h1>StepIndicator</h1>
      <p>Displays progress through a multi-step workflow. Each step shows its completion status.</p>

      <h2>In Progress</h2>
      <Demo direction="column" code={`<StepIndicator\n  steps={[\n    { key: 'account', label: 'Account', status: 'completed' },\n    { key: 'profile', label: 'Profile', status: 'completed' },\n    { key: 'payment', label: 'Payment', status: 'current' },\n    { key: 'review', label: 'Review', status: 'upcoming' },\n  ]}\n/>`}>
        <StepIndicator
          steps={[
            { key: 'account', label: 'Account', status: 'completed' },
            { key: 'profile', label: 'Profile', status: 'completed' },
            { key: 'payment', label: 'Payment', status: 'current' },
            { key: 'review', label: 'Review', status: 'upcoming' },
          ]}
        />
      </Demo>

      <h2>First Step</h2>
      <Demo direction="column" code={`<StepIndicator\n  steps={[\n    { key: 'details', label: 'Details', status: 'current' },\n    { key: 'shipping', label: 'Shipping', status: 'upcoming' },\n    { key: 'payment', label: 'Payment', status: 'upcoming' },\n    { key: 'confirm', label: 'Confirm', status: 'upcoming' },\n  ]}\n/>`}>
        <StepIndicator
          steps={[
            { key: 'details', label: 'Details', status: 'current' },
            { key: 'shipping', label: 'Shipping', status: 'upcoming' },
            { key: 'payment', label: 'Payment', status: 'upcoming' },
            { key: 'confirm', label: 'Confirm', status: 'upcoming' },
          ]}
        />
      </Demo>

      <h2>All Completed</h2>
      <Demo direction="column" code={`<StepIndicator\n  steps={[\n    { key: 'upload', label: 'Upload', status: 'completed' },\n    { key: 'process', label: 'Process', status: 'completed' },\n    { key: 'verify', label: 'Verify', status: 'completed' },\n    { key: 'done', label: 'Done', status: 'completed' },\n  ]}\n/>`}>
        <StepIndicator
          steps={[
            { key: 'upload', label: 'Upload', status: 'completed' },
            { key: 'process', label: 'Process', status: 'completed' },
            { key: 'verify', label: 'Verify', status: 'completed' },
            { key: 'done', label: 'Done', status: 'completed' },
          ]}
        />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'steps', type: 'Step[]', description: "Array of step objects. Each has key (string), label (ReactNode), and status ('completed' | 'current' | 'upcoming'). Required." },
          { name: 'onStepClick', type: '(key: string) => void', description: 'Called when a step is clicked.' },
          { name: 'ariaLabel', type: 'string', description: 'Accessible label for the step indicator.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

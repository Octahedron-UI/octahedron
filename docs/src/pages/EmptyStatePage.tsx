import { EmptyState, Button } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function EmptyStatePage() {
  return (
    <div>
      <h1>EmptyState</h1>
      <p>Placeholder for empty content areas. Guides users with a title, description, and optional action.</p>

      <h2>Basic</h2>
      <Demo code={`<EmptyState title="No results" />`}>
        <EmptyState title="No results" />
      </Demo>

      <h2>With Description</h2>
      <Demo code={`<EmptyState\n  title="No projects yet"\n  description="Create your first project to get started."\n/>`}>
        <EmptyState
          title="No projects yet"
          description="Create your first project to get started."
        />
      </Demo>

      <h2>With Action</h2>
      <Demo code={`<EmptyState\n  title="No members"\n  description="Invite people to join your team."\n  action={<Button>Invite members</Button>}\n/>`}>
        <EmptyState
          title="No members"
          description="Invite people to join your team."
          action={<Button>Invite members</Button>}
        />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'icon', type: 'ReactNode', description: 'Icon displayed above the title.' },
          { name: 'title', type: 'ReactNode', description: 'Primary message (required).' },
          { name: 'description', type: 'ReactNode', description: 'Secondary supporting text.' },
          { name: 'action', type: 'ReactNode', description: 'Action element such as a button.' },
        ]}
      />
    </div>
  );
}

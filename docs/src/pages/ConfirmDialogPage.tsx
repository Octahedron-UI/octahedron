import { useState } from 'react';
import { ConfirmDialog, Button } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function ConfirmDialogPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [dangerOpen, setDangerOpen] = useState(false);
  const [warningOpen, setWarningOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);

  return (
    <div>
      <h1>ConfirmDialog</h1>
      <p>Confirmation dialog built on Modal. Provides a standard confirm/cancel pattern with intent-based styling and async support.</p>

      <h2>Basic</h2>
      <Demo code={`const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Confirm action</Button>\n<ConfirmDialog\n  open={open}\n  onClose={() => setOpen(false)}\n  onConfirm={() => setOpen(false)}\n  title="Confirm Action"\n>\n  Are you sure you want to proceed?\n</ConfirmDialog>`}>
        <Button onClick={() => setBasicOpen(true)}>Confirm action</Button>
        <ConfirmDialog
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          onConfirm={() => setBasicOpen(false)}
          title="Confirm Action"
        >
          Are you sure you want to proceed?
        </ConfirmDialog>
      </Demo>

      <h2>Danger Intent</h2>
      <Demo code={`<ConfirmDialog\n  open={open}\n  onClose={() => setOpen(false)}\n  onConfirm={() => setOpen(false)}\n  title="Delete Item"\n  intent="danger"\n  confirmText="Delete"\n>\n  This action cannot be undone. The item will be permanently removed.\n</ConfirmDialog>`}>
        <Button onClick={() => setDangerOpen(true)}>Delete item</Button>
        <ConfirmDialog
          open={dangerOpen}
          onClose={() => setDangerOpen(false)}
          onConfirm={() => setDangerOpen(false)}
          title="Delete Item"
          intent="danger"
          confirmText="Delete"
        >
          This action cannot be undone. The item will be permanently removed.
        </ConfirmDialog>
      </Demo>

      <h2>Warning Intent</h2>
      <Demo code={`<ConfirmDialog\n  open={open}\n  onClose={() => setOpen(false)}\n  onConfirm={() => setOpen(false)}\n  title="Discard Changes"\n  intent="warning"\n  confirmText="Discard"\n  cancelText="Keep editing"\n>\n  You have unsaved changes that will be lost.\n</ConfirmDialog>`}>
        <Button onClick={() => setWarningOpen(true)}>Discard changes</Button>
        <ConfirmDialog
          open={warningOpen}
          onClose={() => setWarningOpen(false)}
          onConfirm={() => setWarningOpen(false)}
          title="Discard Changes"
          intent="warning"
          confirmText="Discard"
          cancelText="Keep editing"
        >
          You have unsaved changes that will be lost.
        </ConfirmDialog>
      </Demo>

      <h2>Loading State</h2>
      <Demo code={`<ConfirmDialog\n  open={open}\n  onClose={() => setOpen(false)}\n  onConfirm={() => setOpen(false)}\n  title="Processing"\n  loading\n>\n  Please wait while we process your request.\n</ConfirmDialog>`}>
        <Button onClick={() => setLoadingOpen(true)}>Show loading</Button>
        <ConfirmDialog
          open={loadingOpen}
          onClose={() => setLoadingOpen(false)}
          onConfirm={() => setLoadingOpen(false)}
          title="Processing"
          loading
        >
          Please wait while we process your request.
        </ConfirmDialog>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'Controls whether the dialog is visible (required).' },
          { name: 'onClose', type: '() => void', description: 'Called when the dialog is dismissed (required).' },
          { name: 'onConfirm', type: '() => void | Promise<void>', description: 'Called when the confirm button is clicked. Supports async handlers (required).' },
          { name: 'title', type: 'ReactNode', description: 'Dialog title displayed in the header.' },
          { name: 'children', type: 'ReactNode', description: 'Body content (required).' },
          { name: 'intent', type: "'default' | 'danger' | 'warning'", default: "'default'", description: 'Semantic intent that controls confirm button styling.' },
          { name: 'confirmText', type: 'string', default: "'Confirm'", description: 'Label for the confirm button.' },
          { name: 'cancelText', type: 'string', default: "'Cancel'", description: 'Label for the cancel button.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading state on the confirm button and disables actions.' },
        ]}
      />
    </div>
  );
}

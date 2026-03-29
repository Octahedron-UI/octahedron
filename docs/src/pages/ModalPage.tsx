import { useState } from 'react';
import { Modal, ModalActions, Button } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function ModalPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [footerOpen, setFooterOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [wideOpen, setWideOpen] = useState(false);

  return (
    <div>
      <h1>Modal</h1>
      <p>Dialog overlay built on the native <code>&lt;dialog&gt;</code> element. Supports footer actions, error display, and unsaved-changes confirmation.</p>

      <h2>Basic Modal</h2>
      <Demo code={`const [open, setOpen] = useState(false);\n\n<Button onClick={() => setOpen(true)}>Open modal</Button>\n<Modal open={open} onClose={() => setOpen(false)} title="Basic Modal">\n  <p>This is the modal body content.</p>\n</Modal>`}>
        <Button onClick={() => setBasicOpen(true)}>Open modal</Button>
        <Modal open={basicOpen} onClose={() => setBasicOpen(false)} title="Basic Modal">
          <p>This is the modal body content.</p>
        </Modal>
      </Demo>

      <h2>With Footer</h2>
      <Demo code={`<Modal\n  open={open}\n  onClose={() => setOpen(false)}\n  title="Confirm Action"\n  footer={\n    <ModalActions>\n      <Button onClick={() => setOpen(false)}>Cancel</Button>\n      <Button color="primary" onClick={() => setOpen(false)}>Confirm</Button>\n    </ModalActions>\n  }\n>\n  <p>Are you sure you want to proceed?</p>\n</Modal>`}>
        <Button onClick={() => setFooterOpen(true)}>Open with footer</Button>
        <Modal
          open={footerOpen}
          onClose={() => setFooterOpen(false)}
          title="Confirm Action"
          footer={
            <ModalActions>
              <Button onClick={() => setFooterOpen(false)}>Cancel</Button>
              <Button color="primary" onClick={() => setFooterOpen(false)}>Confirm</Button>
            </ModalActions>
          }
        >
          <p>Are you sure you want to proceed?</p>
        </Modal>
      </Demo>

      <h2>With Error</h2>
      <Demo code={`<Modal\n  open={open}\n  onClose={() => setOpen(false)}\n  title="Save Changes"\n  error="Failed to save. Please try again."\n  footer={\n    <ModalActions>\n      <Button onClick={() => setOpen(false)}>Cancel</Button>\n      <Button color="primary">Retry</Button>\n    </ModalActions>\n  }\n>\n  <p>Your changes could not be saved.</p>\n</Modal>`}>
        <Button onClick={() => setErrorOpen(true)}>Open with error</Button>
        <Modal
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Save Changes"
          error="Failed to save. Please try again."
          footer={
            <ModalActions>
              <Button onClick={() => setErrorOpen(false)}>Cancel</Button>
              <Button color="primary">Retry</Button>
            </ModalActions>
          }
        >
          <p>Your changes could not be saved.</p>
        </Modal>
      </Demo>

      <h2>Custom Width</h2>
      <Demo code={`<Modal\n  open={open}\n  onClose={() => setOpen(false)}\n  title="Wide Modal"\n  width={720}\n>\n  <p>This modal uses a custom width of 720px.</p>\n</Modal>`}>
        <Button onClick={() => setWideOpen(true)}>Open wide modal</Button>
        <Modal open={wideOpen} onClose={() => setWideOpen(false)} title="Wide Modal" width={720}>
          <p>This modal uses a custom width of 720px.</p>
        </Modal>
      </Demo>

      <h2>Modal Props</h2>
      <PropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'Controls whether the modal is visible (required).' },
          { name: 'onClose', type: '() => void', description: 'Called when the modal is dismissed (required).' },
          { name: 'title', type: 'ReactNode', description: 'Modal title displayed in the header (required).' },
          { name: 'children', type: 'ReactNode', description: 'Body content (required).' },
          { name: 'footer', type: 'ReactNode', description: 'Footer content, typically ModalActions with buttons.' },
          { name: 'error', type: 'ReactNode', description: 'Error message displayed between header and body.' },
          { name: 'width', type: 'number | string', default: '480', description: 'Width of the modal container.' },
          { name: 'hasUnsavedChanges', type: 'boolean', default: 'false', description: 'When true, closing shows a discard-changes confirmation dialog.' },
          { name: 'className', type: 'string', description: 'Additional CSS class on the container.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles on the container.' },
        ]}
      />

      <h2>ModalActions Props</h2>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Action buttons to display (required).' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}

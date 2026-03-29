import { useState } from 'react';
import { Popover, Button } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function PopoverPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);
  const [matchOpen, setMatchOpen] = useState(false);

  return (
    <div>
      <h1>Popover</h1>
      <p>Floating content panel anchored to a trigger element. Supports configurable positioning and width matching.</p>

      <h2>Basic</h2>
      <Demo code={`const [open, setOpen] = useState(false);\n\n<Popover\n  open={open}\n  onOpenChange={setOpen}\n  trigger={<Button>Toggle popover</Button>}\n>\n  <p>Popover content goes here.</p>\n</Popover>`}>
        <Popover
          open={basicOpen}
          onOpenChange={setBasicOpen}
          trigger={<Button>Toggle popover</Button>}
        >
          <p>Popover content goes here.</p>
        </Popover>
      </Demo>

      <h2>Positions</h2>
      <Demo code={`<Popover\n  open={open}\n  onOpenChange={setOpen}\n  trigger={<Button>Bottom-right</Button>}\n  position="bottom-right"\n>\n  <p>Aligned to the right.</p>\n</Popover>\n<Popover\n  open={open}\n  onOpenChange={setOpen}\n  trigger={<Button>Bottom</Button>}\n  position="bottom"\n>\n  <p>Centered below.</p>\n</Popover>`}>
        <Popover
          open={rightOpen}
          onOpenChange={setRightOpen}
          trigger={<Button>Bottom-right</Button>}
          position="bottom-right"
        >
          <p>Aligned to the right.</p>
        </Popover>
        <Popover
          open={bottomOpen}
          onOpenChange={setBottomOpen}
          trigger={<Button>Bottom</Button>}
          position="bottom"
        >
          <p>Centered below.</p>
        </Popover>
      </Demo>

      <h2>Match Trigger Width</h2>
      <Demo code={`<Popover\n  open={open}\n  onOpenChange={setOpen}\n  trigger={<Button style={{ width: 200 }}>Wide trigger</Button>}\n  matchWidth\n>\n  <p>This popover matches the trigger width.</p>\n</Popover>`}>
        <Popover
          open={matchOpen}
          onOpenChange={setMatchOpen}
          trigger={<Button style={{ width: 200 }}>Wide trigger</Button>}
          matchWidth
        >
          <p>This popover matches the trigger width.</p>
        </Popover>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'open', type: 'boolean', description: 'Controls whether the popover is visible (required).' },
          { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the popover should open or close (required).' },
          { name: 'trigger', type: 'ReactElement', description: 'Element that anchors the popover (required).' },
          { name: 'position', type: "'bottom-left' | 'bottom-right' | 'bottom'", default: "'bottom-left'", description: 'Position of the popover relative to the trigger.' },
          { name: 'matchWidth', type: 'boolean', default: 'false', description: 'When true, the popover matches the trigger width.' },
          { name: 'children', type: 'ReactNode', description: 'Content displayed inside the popover.' },
        ]}
      />
    </div>
  );
}

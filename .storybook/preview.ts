import type { Preview } from '@storybook/react-vite';

// tokens.css already imports brand.css internally
import '../src/tokens.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    layout: 'padded',
  },
  decorators: [
    (Story, context) => {
      // Ensure dark class is on the body for CSS variable resolution
      document.body.classList.add('dark');
      // Storybook may reset classes between stories — reapply
      if (!document.body.classList.contains('dark')) {
        document.body.classList.add('dark');
      }
      return Story();
    },
  ],
};

export default preview;

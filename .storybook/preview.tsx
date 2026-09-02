import type { Preview } from '@storybook/react-vite';
import '../packages/core/theme/color.css';
import '../packages/core/theme/reset.css';
import { FlickeringGrid } from './FlickeringGrid';
import './preview.css';

const preview: Preview = {
  decorators: [
    Story => (
      <div className='storybook-stage'>
        <FlickeringGrid
          className='storybook-grid'
          color='lightblue'
          flickerChance={0.1}
          gridGap={20}
          maxOpacity={0.2}
          squareSize={2}
        />
        <div className='storybook-story'>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    a11y: {
      test: 'todo',
    },
    controls: {
      disable: true,
    },
    layout: 'fullscreen',
  },
};

export default preview;

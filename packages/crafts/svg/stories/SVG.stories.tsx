import { Binding, Pane } from '@core/debug';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { type Shape, Svg } from '../src/SVG';

const DEFAULT_CONFIG = {
  stroke: '#000',
  shape: 'circle',
  gradient: 'url(#horizontal-gradient)',
  animate: false,
};

const meta = {
  title: 'Crafts/Svg',
  component: Svg,
} satisfies Meta<typeof Svg>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultStory = () => {
  const [devValue, setDevValue] = useState(DEFAULT_CONFIG);
  return (
    <div style={{ width: '60%', height: '60%' }}>
      <Pane
        initialValue={DEFAULT_CONFIG}
        config={{
          title: 'SVG',
        }}
      >
        <Binding
          name='stroke'
          onChange={value => {
            setDevValue({
              ...devValue,
              stroke: value as string,
            });
          }}
        />
        <Binding
          name='shape'
          onChange={value => {
            setDevValue({ ...devValue, shape: value as Shape });
          }}
          options={{
            circle: 'circle',
            square: 'square',
            triangle: 'triangle',
          }}
        />
        <Binding
          name='gradient'
          onChange={value => {
            setDevValue({ ...devValue, gradient: value as string });
          }}
          options={{
            horizontal: 'url(#horizontal-gradient)',
            vertical: 'url(#vertical-gradient)',
          }}
        />
        <Binding
          name='animate'
          onChange={value => {
            setDevValue({ ...devValue, animate: value as boolean });
          }}
        />
      </Pane>
      <Svg
        shape={devValue.shape as Shape}
        stroke={devValue.stroke}
        gradient={devValue.gradient}
        animate={devValue.animate}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    shape: 'circle',
    stroke: DEFAULT_CONFIG.stroke,
    gradient: DEFAULT_CONFIG.gradient,
    animate: DEFAULT_CONFIG.animate,
  },
  render: () => <DefaultStory />,
};

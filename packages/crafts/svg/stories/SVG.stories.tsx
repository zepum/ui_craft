import type { Story } from '@ladle/react';
import { type Shape, Svg } from '../src/SVG';
import { Binding, Pane } from '../../../core/debug/src';
import { useState } from 'react';

const DEFAULT_CONFIG = {
  stroke: '#000',
  shape: 'circle',
  gradient: 'url(#horizontal-gradient)',
  animate: false,
};

export const Default: Story = () => {
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

import type { Story } from '@ladle/react';
import { MeshGradient, MeshGradientProps } from 'src/MeshGradient';
import { Binding, Pane } from '../../../core/debug/src';
import { useState } from 'react';

const DEFAULT_CONFIG = {
  points: 4,
  color0: '#ff0000',
  color1: '#00ff00',
  color2: '#0000ff',
  color3: '#ffff00',
};

export const Default: Story = () => {
  const [devValue, setDevValue] = useState(DEFAULT_CONFIG);
  return (
    <div style={{ width: '60%', height: '60%' }}>
      <Pane
        initialValue={DEFAULT_CONFIG}
        config={{
          title: 'Mesh Gradient',
        }}
      >
        <Binding
          name='points'
          value={devValue.points}
          config={{
            type: 'number',
            min: 4,
            max: 8,
            step: 1,
            label: 'point of starting gradient',
          }}
          onChange={value => {
            setDevValue({
              ...devValue,
              points: value,
            });
          }}
        />
        <Binding
          name='color0'
          value={devValue.color0}
          config={{
            type: 'color',
            label: `그라디언트 색상 0`,
          }}
          onChange={value => {
            setDevValue({ ...devValue, color0: value });
          }}
        />
        <Binding
          name='color1'
          value={devValue.color1}
          config={{
            type: 'color',
            label: `그라디언트 색상 1`,
          }}
          onChange={value => {
            setDevValue({ ...devValue, color1: value });
          }}
        />
        <Binding
          name='color2'
          value={devValue.color2}
          config={{
            type: 'color',
            label: `그라디언트 색상 2`,
          }}
          onChange={value => {
            setDevValue({ ...devValue, color2: value });
          }}
        />
        <Binding
          name='color3'
          value={devValue.color3}
          config={{
            type: 'color',
            label: `그라디언트 색상 3`,
          }}
          onChange={value => {
            setDevValue({ ...devValue, color3: value });
          }}
        />
      </Pane>
      <MeshGradient
        color0={devValue.color0}
        color1={devValue.color1}
        color2={devValue.color2}
        color3={devValue.color3}
        points={devValue.points}
      />
    </div>
  );
};

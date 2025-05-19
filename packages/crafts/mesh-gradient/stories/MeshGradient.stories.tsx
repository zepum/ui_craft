import type { Story } from '@ladle/react';
import type { Tint } from 'src/MeshGradient';
import { MeshGradient, MeshGradientProps } from 'src/MeshGradient';
import { Binding, Pane } from '../../../core/debug/src';
import { useState } from 'react';

const DEFAULT_CONFIG = {
  color0: { r: 33, g: 255, b: 147, a: 1.0 },
  color1: { r: 0, g: 255, b: 255, a: 1.0 },
  color2: { r: 3, g: 0, b: 255, a: 1.0 },
  color3: { r: 170, g: 84, b: 255, a: 1.0 },
  center: { r: 255, g: 0, b: 0, a: 1.0 },
};

export const Default: Story = () => {
  const [devValue, setDevValue] = useState(DEFAULT_CONFIG);
  return (
    <div>
      <Pane
        initialValue={DEFAULT_CONFIG}
        config={{
          title: 'Mesh Gradient',
        }}
      >
        <Binding
          name='color0'
          value={devValue.color0}
          onChange={value => {
            setDevValue({ ...devValue, color0: value as Tint });
          }}
        />
        <Binding
          name='color1'
          value={devValue.color1}
          onChange={value => {
            setDevValue({ ...devValue, color1: value as Tint });
          }}
        />
        <Binding
          name='color2'
          value={devValue.color2}
          onChange={value => {
            setDevValue({ ...devValue, color2: value as Tint });
          }}
        />
        <Binding
          name='color3'
          value={devValue.color3}
          onChange={value => {
            setDevValue({ ...devValue, color3: value as Tint });
          }}
        />
        <Binding
          name='center'
          value={devValue.center}
          onChange={value => {
            setDevValue({ ...devValue, center: value as Tint });
          }}
        />
      </Pane>
      <MeshGradient
        color0={devValue.color0}
        color1={devValue.color1}
        color2={devValue.color2}
        color3={devValue.color3}
        center={devValue.center}
      />
    </div>
  );
};

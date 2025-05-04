import type { Story } from '@ladle/react';
import { TextMorphing } from '../src/TextMorphing';
import { useState } from 'react';
import { Binding, Pane } from '@core/debug';

const DEFAULT_CONFIG = {
  morphingTime: 1.2,
  cooldownTime: 0.5,
};

export const Default: Story = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Pane initialValue={DEFAULT_CONFIG} config={{ title: 'Text morphing config' }}>
        <Binding
          name='morphingTime'
          min={1}
          max={3}
          step={0.1}
          onChange={value => {
            setConfig(prev => ({ ...prev, morphingTime: Number(value) }));
          }}
        />
        <Binding
          name='cooldownTime'
          min={0.1}
          max={3}
          step={0.1}
          onChange={value => {
            setConfig(prev => ({ ...prev, cooldownTime: Number(value) }));
          }}
        />
      </Pane>

      <TextMorphing morphingTime={config.morphingTime} cooldownTime={config.cooldownTime} />
    </div>
  );
};

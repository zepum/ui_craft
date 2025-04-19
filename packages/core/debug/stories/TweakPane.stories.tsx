import type { Story } from '@ladle/react';
import { usePane } from '../src/usePane';
import { useEffect } from 'react';
export const Basic: Story = () => {
  const pane = usePane({
    title: 'Debug',
  });

  useEffect(() => {
    if (!pane) return;

    const PARAMS = {
      speed: 50,
      primary: '#f00',
    };

    pane.addBinding(PARAMS, 'speed', {
      min: 0,
      max: 100,
      step: 0.1,
    });

    pane.addBinding(PARAMS, 'primary', {
      type: 'color',
    });

    return () => {
      pane.dispose();
    };
  }, [pane]);

  return null;
};

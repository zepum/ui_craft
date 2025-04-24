import type { Story } from '@ladle/react';
import { Svg } from '../src/SVG';

export const Default: Story = () => {
  return (
    <div style={{ width: '60%', height: '60%' }}>
      <Svg shape='circle' />
    </div>
  );
};

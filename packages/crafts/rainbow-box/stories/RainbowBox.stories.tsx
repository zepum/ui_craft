import React from 'react';
import type { Story } from '@ladle/react';
import { RainbowBox } from '../src/RainbowBox';
import type { RainbowBoxProps } from '../src/RainbowBox';
const Template: Story = args => {
  return <RainbowBox {...args} />;
};
export const Default = Template.bind({});
Default.args = {
  gradientAngle: 90,
  animated: true,
  borderRadius: '200px',
  borderWidth: '1.3px',
};

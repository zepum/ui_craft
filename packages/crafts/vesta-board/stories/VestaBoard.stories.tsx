import type { Story } from '@ladle/react';
import { VestaBoard } from '../src/VestaBoard';
import { useState } from 'react';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const DEFAULT: Story = () => {
  const [value, setValue] = useState('tanos_effect@avenue.com');

  return <VestaBoard />;
};

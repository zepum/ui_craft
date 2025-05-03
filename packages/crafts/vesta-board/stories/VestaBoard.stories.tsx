import type { Story } from '@ladle/react';
import { CHAR_SET, VestaBoard } from '../src/VestaBoard';
import { useState } from 'react';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const DEFAULT: Story = () => {
  const [value, setValue] = useState('tanos_effect@avenue.com');

  return (
    <VestaBoard
      columnCount={12}
      lines={[
        {
          text: 'hi world',
          align: 'center',
          color: 'oklch(0.64 0.296 240)',
          charset: CHAR_SET,
        },
        {
          text: '',
          align: 'left',
          color: '#fff',
          charset: CHAR_SET,
        },
        {
          text: '',
          align: 'left',
          color: '#fff',
          charset: CHAR_SET,
        },
        {
          text: '',
          align: 'left',
          color: '#fff',
          charset: CHAR_SET,
        },
        {
          text: '',
          align: 'right',
          color: '#fff',
          charset: CHAR_SET,
        },
      ]}
    />
  );
};

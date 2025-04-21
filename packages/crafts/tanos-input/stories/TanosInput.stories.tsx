import type { Story } from '@ladle/react';
import { TanosInput } from '../src/TanosInput';
import { useState } from 'react';
import './TanosInput.stories.css';

export const Basic: Story = () => {
  const [value, setValue] = useState('우뿌ㅜ뿌뿌뿌ㅜ뻐ㅏㅣ우아ㅣ런이ㅓㄹ');
  return (
    <div className='container'>
      <TanosInput value={value} onChange={e => setValue(e.target.value)} />
    </div>
  );
};

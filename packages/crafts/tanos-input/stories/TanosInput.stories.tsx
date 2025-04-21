import type { Story } from '@ladle/react';
import { TanosInput, TanosProvider, TanosTrigger } from '../src/TanosInput';
import { useState } from 'react';
import './TanosInput.stories.css';

export const Basic: Story = () => {
  const [value, setValue] = useState('우뿌ㅜ뿌뿌뿌ㅜ뻐ㅏㅣ우아ㅣ런이ㅓㄹ');
  return (
    <TanosProvider>
      <div className='container'>
        <TanosInput value={value} onChange={e => setValue(e.target.value)} setValue={setValue} />
        <TanosTrigger>
          <button type='button' className='btn'>
            제출하기
          </button>
        </TanosTrigger>
      </div>
    </TanosProvider>
  );
};

import type { Story } from '@ladle/react';
import { TanosInput, TanosProvider, TanosTrigger } from '../src/TanosInput';
import { useState } from 'react';
import './TanosInput.stories.css';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const DEFAULT: Story = () => {
  const [value, setValue] = useState('tanos_effect@avenue.com');

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

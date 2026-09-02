import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { TanosInput, TanosProvider, TanosTrigger } from '../src/TanosInput';
import './TanosInput.stories.css';

const meta = {
  title: 'Crafts/TanosInput',
  component: TanosInput,
} satisfies Meta<typeof TanosInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultStory = () => {
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

export const Default: Story = {
  render: () => <DefaultStory />,
};

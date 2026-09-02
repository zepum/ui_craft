import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { Trivision } from '../src/Trivision';
import styles from './Trivision.stories.module.css';

const meta = {
  title: 'Crafts/Trivision',
  component: Trivision,
} satisfies Meta<typeof Trivision>;

export default meta;

type Story = StoryObj<typeof meta>;

const DefaultStory = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count => count + 1);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <Trivision
        count={count}
        segmentCount={50}
        images={['/jungle.jpg', '/tokyoNight.jpg', '/waterfall.jpg']}
        duration={1}
        gap={1}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    count: 0,
    segmentCount: 50,
    images: ['/jungle.jpg', '/tokyoNight.jpg', '/waterfall.jpg'],
    duration: 1,
    gap: 1,
  },
  render: () => <DefaultStory />,
};

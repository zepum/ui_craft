import type { Story } from '@ladle/react';
import { Trivision } from '../src/Trivision';
import styles from './Trivision.stories.module.css';
import { useEffect, useState } from 'react';

export const Default: Story = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setCount(count => count + 1);
    }, 2000);
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

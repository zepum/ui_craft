import type { Story } from '@ladle/react';
import { Trivision } from '../src/Trivision';
import styles from './Trivision.stories.module.css';

export const Default: Story = () => {
  return (
    <div className={styles.container}>
      <Trivision />
    </div>
  );
};

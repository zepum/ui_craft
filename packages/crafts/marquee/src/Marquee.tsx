import type { CSSProperties } from 'react';
import styles from './Marquee.module.css';

export const Marquee = () => {
  return (
    <div style={{ '--count': 5 } as CSSProperties} className={styles.marqueeContainer}>
      <div style={{ '--idx': 0 } as CSSProperties} className={styles.marqueeItem} />
      <div style={{ '--idx': 1 } as CSSProperties} className={styles.marqueeItem} />
      <div style={{ '--idx': 2 } as CSSProperties} className={styles.marqueeItem} />
      <div style={{ '--idx': 3 } as CSSProperties} className={styles.marqueeItem} />
      <div style={{ '--idx': 4 } as CSSProperties} className={styles.marqueeItem} />
    </div>
  );
};

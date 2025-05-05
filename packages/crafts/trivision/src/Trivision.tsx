import { TrivisionSegment } from './TrivisionSegment';
import styles from './Trivision.module.css';
import { useState } from 'react';
export const Trivision = () => {
  const [count, setCount] = useState(5);
  return (
    <div
      style={{ height: '400px', '--trivision-width': '200px', '--segment-count': count } as React.CSSProperties}
      className={styles.container}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <TrivisionSegment key={idx} idx={idx} />
      ))}
    </div>
  );
};

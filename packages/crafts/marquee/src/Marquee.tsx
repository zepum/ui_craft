import styles from './Marquee.module.css';

export const Marquee = () => {
  return (
    <div style={{ '--count': 5 }} className={styles.marqueeContainer}>
      <div style={{ '--idx': 0 }} className={styles.marqueeItem}></div>
      <div style={{ '--idx': 1 }} className={styles.marqueeItem}></div>
      <div style={{ '--idx': 2 }} className={styles.marqueeItem}></div>
      <div style={{ '--idx': 3 }} className={styles.marqueeItem}></div>
      <div style={{ '--idx': 4 }} className={styles.marqueeItem}></div>
    </div>
  );
};

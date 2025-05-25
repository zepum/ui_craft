import type { ComponentProps, CSSProperties } from 'react';
import styles from './Marquee.module.css';

const prefix = 'https://tft-utils.s3.ap-northeast-2.amazonaws.com/ui-craft';
const IMAGE_LIST = [
  `${prefix}/de.jpg`,
  `${prefix}/bolca.webp`,
  `${prefix}/gun.webp`,
  `${prefix}/rick.jpg`,
  `${prefix}/elon.webp`,
];

export const Marquee = ({ className = '', ...rest }: ComponentProps<'div'>) => {
  return (
    <div style={{ '--count': 5 } as CSSProperties} className={`${styles.marqueeContainer} ${className}`} {...rest}>
      {IMAGE_LIST.map((image, idx) => (
        <img
          key={image}
          style={{ '--idx': idx } as CSSProperties}
          className={styles.marqueeItem}
          src={image}
          alt={image}
        />
      ))}
    </div>
  );
};

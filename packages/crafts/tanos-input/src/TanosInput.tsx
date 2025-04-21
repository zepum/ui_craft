import React, { useId } from 'react';
import styles from './tanos-input.module.css';

export const TanosInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>((props, ref) => {
  const id = useId();
  return (
    <label htmlFor={id} className={`${styles.container} ${styles.animate}`}>
      <input id={id} className={`${styles.input} ${styles['masked-text']}`} type='text' ref={ref} {...props} />
      <input
        className={`${styles.input} ${styles.overlay}`}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        readOnly
        type='text'
        ref={ref}
        {...props}
      />
      <svg style={{ display: 'none' }}>
        <filter id={'top-filter'}>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='1.8'
            numOctaves='10'
            result='turbulence'
            seed={1}
            stitchTiles={'noStitch'}
          />
          <feDisplacementMap
            in2='turbulence'
            in='SourceGraphic'
            result='Source'
            scale={20}
            xChannelSelector='G'
            yChannelSelector='R'
          />
        </filter>
        <filter id={'bottom-filter'}>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='1.8'
            numOctaves='10'
            result='turbulence'
            seed={1}
            stitchTiles={'noStitch'}
          />
          <feDisplacementMap
            in2='turbulence'
            in='SourceGraphic'
            result='Source'
            scale={20}
            xChannelSelector='G'
            yChannelSelector='R'
          />
        </filter>
      </svg>
    </label>
  );
});

import React, { useEffect, useId, useImperativeHandle, useRef } from 'react';
import styles from './tanos-input.module.css';

type TanosInputProps = React.ComponentProps<'input'> & {
  setValue?: (value: string) => void;
};

export const TanosContext = React.createContext<{
  startAnimationRef: React.MutableRefObject<() => void>;
}>({
  startAnimationRef: { current: () => {} },
});

export const useTanos = () => {
  return React.useContext(TanosContext);
};

export const TanosProvider = ({ children }: { children: React.ReactNode }) => {
  const startAnimationRef = useRef<() => void>(() => {});

  return <TanosContext.Provider value={{ startAnimationRef }}>{children}</TanosContext.Provider>;
};

export const TanosTrigger = ({
  children,
  tanosWhenClick = true,
}: { children: React.ReactNode; tanosWhenClick?: boolean }) => {
  const { startAnimationRef } = useTanos();

  const handleClick = () => {
    if (tanosWhenClick) {
      startAnimationRef.current?.();
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};

export const TanosInput = React.forwardRef<HTMLInputElement, TanosInputProps>((props, ref) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const id = useId();
  const { setValue, ...inputProps } = props;
  const { startAnimationRef } = useTanos();

  useImperativeHandle(startAnimationRef, () => startAni);

  const startAni = () => {
    if (labelRef.current) {
      labelRef.current.classList.add(styles.animate);
    }
  };

  const resetAni = () => {
    document.documentElement.style.setProperty('--tanos-progress', '0%');
    if (labelRef.current) {
      labelRef.current.classList.remove(styles.animate);
    }
  };

  return (
    <label
      ref={labelRef}
      htmlFor={id}
      className={`${styles.container}`}
      onAnimationEnd={() => {
        resetAni();
      }}
    >
      <input id={id} className={`${styles.input} ${styles['masked-text']}`} ref={ref} {...inputProps} />
      <input
        {...inputProps}
        className={`${styles.input} ${styles.overlay}`}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        readOnly
        ref={ref}
      />
      <svg style={{ display: 'none' }}>
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

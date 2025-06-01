import styles from './MeshGradient.module.css';
import { useRef, useState } from 'react';
export interface Tint {
  r: number;
  g: number;
  b: number;
  a: number;
}
export type MeshGradientProps = {
  color0: Tint;
  color1: Tint;
  color2: Tint;
  color3: Tint;
  center: Tint;
};
export const MeshGradient = ({ color0, color1, color2, color3, center }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = event => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const x = (event.nativeEvent.offsetX / rect.width) * 100;
      const y = (event.nativeEvent.offsetY / rect.height) * 100;

      if (elementRef.current) {
        elementRef.current.style.setProperty('--position-x', `${x}%`);
        elementRef.current.style.setProperty('--position-y', `${y}%`);
      }
    }
  };

  const toRgba = color => {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  };
  const toRgbaEnd = color => {
    return `rgba(${color.r},${color.g},${color.b}, 0.0)`;
  };
  return (
    <div className={styles.bg}>
      <div className={styles.container}>
        <div
          className={styles.mesh}
          ref={elementRef}
          onMouseMove={handleMouseMove}
          style={
            {
              '--position-x': '50%',
              '--position-y': '50%',
              '--color0': toRgba(color0),
              '--color0-end': toRgbaEnd(color0),
              '--color1': toRgba(color1),
              '--color1-end': toRgbaEnd(color1),
              '--color2': toRgba(color2),
              '--color2-end': toRgbaEnd(color2),
              '--color3': toRgba(color3),
              '--color3-end': toRgbaEnd(color3),
              '--center-color': toRgba(center),
              '--center-color-end': toRgbaEnd(center),
            } as React.CSSProperties
          }
        ></div>
      </div>
    </div>
  );
};

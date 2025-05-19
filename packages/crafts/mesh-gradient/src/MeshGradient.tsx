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

export const MeshGradient: React.FC<MeshGradientProps> = ({ color0, color1, color2, color3, center }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const elementRef = useRef<HTMLInputElement>(null);
  const handleMouseMove = event => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      setPosition({ x, y });
    }
  };

  const toRgba = color => {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  };
  const toRgbaEnd = color => {
    return `rgba(${color.r},${color.g},${color.b}, 0.0)`;
  };
  const gradientStyle = `
  radial-gradient(circle at ${position.x}% ${position.y}% ,${toRgba(center)} 0%,  ${toRgbaEnd(center)} 50%),
  radial-gradient(circle at ${100 - position.x}% ${100 - position.y}% ,${toRgba(center)} 0%,  ${toRgbaEnd(center)} 50%),
  radial-gradient(circle at 0% 0%, ${toRgba(color0)} 0%,  ${toRgbaEnd(color0)} 70%),
  radial-gradient(circle at 100% 0%, ${toRgba(color1)} 0%, ${toRgbaEnd(color1)} 80%),
  radial-gradient(circle at 0% 100%, ${toRgba(color2)} 0%, ${toRgbaEnd(color2)} 90%),
  radial-gradient(circle at 100% 100%, ${toRgba(color3)} 0%, ${toRgbaEnd(color3)} 100%)
  `;
  const containerStyle: React.CSSProperties = {
    width: '400px',
    height: '400px',
  };
  const meshGradientStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '200px',
    background: gradientStyle,
  };
  const backgroundStyle = {
    width: '500px',
    height: '500px',
    background: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div style={containerStyle}>
        <div style={meshGradientStyle} ref={elementRef} onMouseMove={handleMouseMove}></div>
      </div>
    </div>
  );
};

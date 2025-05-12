import styles from './MeshGradient.module.css';
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
  points?: number;
};

export const MeshGradient: React.FC<MeshGradientProps> = ({ color0, color1, color2, color3, points }) => {
  console.log('Rendering MeshGradient with colors:', { color0, color1, color2, color3 });

  const toRgba = color => {
    return `rgba(${color.r},${color.g},${color.b},${color.a})`;
  };
  const toRgbaEnd = color => {
    return `rgba(${color.r},${color.g},${color.b},0.0)`;
  };
  const gradientStyle = `
  radial-gradient(circle at 0% 0%, ${toRgba(color0)} 0%,  ${toRgbaEnd(color0)} 100%),
  radial-gradient(circle at 100% 0%, ${toRgba(color1)} 0%, ${toRgbaEnd(color1)} 100%),
  radial-gradient(circle at 0% 100%, ${toRgba(color2)} 0%, ${toRgbaEnd(color2)} 100%),
  radial-gradient(circle at 100% 100%, ${toRgba(color3)} 0%, ${toRgbaEnd(color3)} 100%)
  `;
  const containerStyle: React.CSSProperties = {
    width: '400px',
    height: '300px',
  };
  const meshGradientStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    background: gradientStyle,
  };
  return (
    <div style={containerStyle}>
      <div style={meshGradientStyle}></div>
    </div>
  );
};

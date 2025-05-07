import styles from './MeshGradient.module.css';
export type MeshGradientProps = {
  color0?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  points?: number;
};

export const MeshGradient: React.FC<MeshGradientProps> = ({
  color0 = '#ff0000',
  color1 = '#00ff00',
  color2 = '#0000ff',
  color3 = '#ffff00',
  points,
}) => {
  console.log('Rendering MeshGradient with colors:', { color0, color1, color2, color3 });

  const gradientStyle = `radial-gradient(circle at 0% 0%, ${color0} 0%, ${color0} 100%),
  radial-gradient(circle at 100% 0%, ${color1} 0%, ${color1} 100%),
  radial-gradient(circle at 0% 100%, ${color2} 0%, ${color2} 100%),
  radial-gradient(circle at 100% 100%, ${color3} 0%, ${color3} 100%)`;

  const meshGradientStyle: React.CSSProperties = {
    background: gradientStyle,

    width: '300px',
    height: '300px',
    borderRadius: '8px',
  };
  return (
    <>
      <div style={meshGradientStyle}></div>
    </>
  );
};

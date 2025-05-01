import React from 'react';

export type RainbowBoxProps = {
  children?: React.ReactNode;
  gradientAngle?: number;
  animated?: boolean;
  borderRadius?: string;
  borderWidth: string;
};
export const RainbowBox: React.FC<RainbowBoxProps> = ({
  children,
  animated,
  gradientAngle,
  borderRadius,
  borderWidth,
}) => {
  const rainbowGradient = `conic-gradient(
    from 0deg,
    #ff0000, /* 빨강 - 0도 */
    #ff8000, /* 주황 */
    #ffff00, /* 노랑 */
    #80ff00, /* 연두 */
    #00ff00, /* 초록 */
    #00ff80, /* 청록 */
    #00ffff, /* 하늘 */
    #0080ff, /* 밝은 파랑 */
    #0000ff, /* 파랑 */
    #8000ff, /* 보라 */
    #ff00ff, /* 마젠타 */
    #ff0080, /* 분홍 */
    #ff0000  /* 빨강으로 돌아옴 - 360도 */
  )`;
  const animationStyle = animated
    ? {
        animation: 'rainbow-spin ease-in 12s infinite',
      }
    : {};
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    height: '300px',
    width: '300px',
    borderRadius,
    padding: borderWidth,
    background: rainbowGradient,
    ...animationStyle,
  };
  const contentStyle: React.CSSProperties = {
    height: '100%',
    width: '100%',
    borderRadius: `calc(${borderRadius} - ${borderWidth})`,
    backgroundColor: '#FFF',
    display: 'flex',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 1,
  };

  return (
    <>
      {animated && (
        <style>
          {`
            @keyframes rainbow-spin {
              0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }        
        `}
        </style>
      )}
      <div className='rainbow-box' style={containerStyle}>
        {/* {children} */}
        <div style={contentStyle}>{children}</div>
      </div>
    </>
  );
};

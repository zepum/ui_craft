import styles from './SVG.module.css';

const SHAPE_PRESET = ['circle', 'square', 'triangle'] as const;
export type Shape = (typeof SHAPE_PRESET)[number];

export const Svg = ({
  shape,
  stroke,
  gradient,
  animate,
}: {
  shape: Shape;
  stroke?: string;
  gradient?: string;
  animate?: boolean;
}) => {
  return (
    <>
      <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <linearGradient id='horizontal-gradient'>
            <stop stopColor={'#649173'} offset='0%' />
            <stop stopColor={'#DBD5A4'} offset='100%' />
          </linearGradient>
          <linearGradient id='vertical-gradient' x1='0' x2='0' y1='0' y2='1'>
            <stop stopColor={'#649173'} offset='0%' />
            <stop stopColor={'#DBD5A4'} offset='100%' />
          </linearGradient>
        </defs>
        <defs>
          <g id='circle'>
            <circle cx='100' cy='100' r='40' />
          </g>
          <g id='square'>
            <rect x='50' y='50' width='80' height='80' />
          </g>
          <g id='triangle'>
            <polygon points='100 30, 50 130, 150 130' />
          </g>
        </defs>
        <use
          className={animate ? styles.strokeAnimate : ''}
          href={`#${shape}`}
          stroke-dasharray={[4]}
          stroke={stroke}
          fill={gradient}
        />
      </svg>
    </>
  );
};

import styles from './SVG.module.css';

const SHAPE_PRESET = ['circle', 'square', 'triangle', 'heart', 'polygon'];

export const Svg = () => {
  return <SVGFactory shape='heart' />;
};

// 각 모양에 따른 path 를 새로운 defs 안에 <g></g> 로 묶고, switch 문을 없애고 use 를 사용하기
const SVGFactory = ({ shape }: { shape: string }) => {
  return (
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

      {(() => {
        switch (shape) {
          case 'circle':
            return <circle cx='100' cy='100' r='40' fill='url(#horizontal-gradient)' />;
          case 'square':
            return <rect x='50' y='50' width='100' height='100' fill='url(#horizontal-gradient)' />;
          case 'triangle':
            return <polygon points='100 30, 50 130, 150 130' fill='url(#horizontal-gradient)' />;
          case 'heart':
            return (
              <path
                d='M 0 200 v -200 h 200 a 100 100 90 0 1 0 200 a 100 100 90 0 1 -200 0 Z'
                fill='url(#horizontal-gradient)'
              />
            );
          case 'polygon':
            return <polygon points='100 0, 0 100, 200 100' fill='url(#horizontal-gradient)' />;
          default:
            return (
              <text
                x='10'
                y='30'
                fill='url(#horizontal-gradient)'
                fontSize='12'
                fontWeight='bold'
              >{`⚠️ No Matched shape: ${shape} ⚠️`}</text>
            );
        }
      })()}
    </svg>
  );
};

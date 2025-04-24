import styles from './SVG.module.css';
import { useEffect, useState } from 'react';
import { usePane } from '@core/debug';

const SHAPE_PRESET = ['circle', 'square', 'triangle'] as const;
type Shape = (typeof SHAPE_PRESET)[number];

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
  const [__DBG_storke, setStroke] = useState(stroke ?? '#000');
  const [__DBG_shape, setShape] = useState<Shape>(shape);
  const [__DBG_gradient, setGradient] = useState(gradient ?? 'url(#horizontal-gradient)');
  const [__DBG_strokeAnimationActive, setStrokeAnimationActive] = useState(animate ?? false);
  const pane = usePane({
    title: 'DEBUGGER',
  });

  useEffect(() => {
    if (!pane) {
      return;
    }

    const initialConfig = {
      stroke: '#000',
      shape: shape,
      gradient: 'url(#horizontal-gradient)',
      animate: false,
    };

    pane.addBinding(initialConfig, 'stroke').on('change', ({ value }) => {
      setStroke(value);
    });
    pane
      .addBinding(initialConfig, 'shape', {
        options: {
          circle: 'circle',
          square: 'square',
          triangle: 'triangle',
        },
      })
      .on('change', ({ value }) => {
        setShape(value);
      });

    pane
      .addBinding(initialConfig, 'gradient', {
        options: {
          horizontal: 'url(#horizontal-gradient)',
          vertical: 'url(#vertical-gradient)',
        },
      })
      .on('change', ({ value }) => {
        setGradient(value);
      });

    pane.addBinding(initialConfig, 'animate').on('change', ({ value }) => {
      setStrokeAnimationActive(value);
    });

    return () => {
      if (pane) {
        pane.dispose();
      }
    };
  }, [pane]);

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
        className={__DBG_strokeAnimationActive ? styles.strokeAnimate : ''}
        href={`#${__DBG_shape}`}
        stroke-dasharray={[4]}
        stroke={__DBG_storke}
        fill={__DBG_gradient}
      />
    </svg>
  );
};

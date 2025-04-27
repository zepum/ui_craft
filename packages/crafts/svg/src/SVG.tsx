import styles from './SVG.module.css';
import { useEffect, useState } from 'react';
import { usePane } from '@core/debug';

const SHAPE_PRESET = ['circle', 'square', 'triangle'] as const;
type Shape = (typeof SHAPE_PRESET)[number];

const DEFAULT_CONFIG = {
  stroke: '#000',
  shape: 'circle',
  gradient: 'url(#horizontal-gradient)',
  animate: false,
};

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
  const { pane, __DEV_config, setConfig } = usePane({
    title: 'DEBUGGER',
    defaultConfig: DEFAULT_CONFIG,
  });

  useEffect(() => {
    if (!pane) {
      return;
    }

    pane.addBinding(DEFAULT_CONFIG, 'stroke').on('change', setConfig);
    pane
      .addBinding(DEFAULT_CONFIG, 'shape', {
        options: {
          circle: 'circle',
          square: 'square',
          triangle: 'triangle',
        },
      })
      .on('change', setConfig);

    pane
      .addBinding(DEFAULT_CONFIG, 'gradient', {
        options: {
          horizontal: 'url(#horizontal-gradient)',
          vertical: 'url(#vertical-gradient)',
        },
      })
      .on('change', setConfig);

    pane.addBinding(DEFAULT_CONFIG, 'animate').on('change', setConfig);
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
        className={__DEV_config.animate ? styles.strokeAnimate : ''}
        href={`#${__DEV_config.shape}`}
        stroke-dasharray={[4]}
        stroke={__DEV_config.stroke}
        fill={__DEV_config.gradient}
      />
    </svg>
  );
};

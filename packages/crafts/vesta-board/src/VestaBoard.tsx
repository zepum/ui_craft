import { VestaLine } from './VestaLine';
import styles from './VestaBoard.module.css';

export const CHAR_SET = ' abcdefghijklmnopqrstuvwxyz!@ ';
export type Shape = 'default' | 'ellipse';
export type Theme = 'default' | 'sky' | 'peach' | 'magic';

export type VestaBoardProps = {
  columnCount: number;
  lines: Array<{
    text: string;
    align: 'left' | 'center' | 'right';
    color: string;
    charset: string;
  }>;
  blockShape: Shape;
  theme: Theme;
};

export const VestaBoard = ({ columnCount, lines, blockShape, theme }: VestaBoardProps) => {
  return (
    <>
      <svg>
        <clipPath id='ellipse-top' clipPathUnits='objectBoundingBox'>
          <path d='M 0 0.49 A 0.5 0.49 0 1 1 1 0.49 Z' />
        </clipPath>
        <clipPath id='ellipse-bottom' clipPathUnits='objectBoundingBox'>
          <path d='M 0 0.51 A 0.5 0.49 0 1 0 1 0.51 Z' />
        </clipPath>
      </svg>
      <div className={styles.boardContainer} data-shape={blockShape} data-theme={theme}>
        {lines.map((line, index) => (
          <VestaLine
            key={`vesta-line-${index}`}
            row={index}
            column={columnCount}
            text={line.text.toLowerCase()}
            align={line.align}
            color={line.color}
            charset={line.charset}
          />
        ))}
      </div>
    </>
  );
};

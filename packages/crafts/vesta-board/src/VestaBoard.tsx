import { VestaLine } from './VestaLine';
import styles from './VestaBoard.module.css';

export const CHAR_SET = ' abcdefghijklmnopqrstuvwxyz!@ ';

export type VestaBoardProps = {
  columnCount: number;
  lines: Array<{
    text: string;
    align: 'left' | 'center' | 'right';
    color: string;
    charset: string;
  }>;
};

export const VestaBoard = ({ columnCount, lines }: VestaBoardProps) => {
  return (
    <div className={styles.boardContainer}>
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
  );
};

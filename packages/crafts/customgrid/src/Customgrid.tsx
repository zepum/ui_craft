import React, { useEffect, useState } from 'react';
import styles from './Customgrid.module.css';

// 1)  그리드 만들기
// 2)  그리드 좌표 위  원 올 수 있게
// 3) 그리드 조절하면 원 자동으로

export type CustomgridProps = {
  rowVar: number;
  colVar: number;
  gapXVar: number;
  gapYVar: number;
  colorInVar: string;
  colorOutVar: string;
  size: number;
};
const Customgrid = ({ rowVar, colVar, gapXVar, gapYVar, colorInVar, colorOutVar, size }) => {
  const [grid, setGrid] = useState(
    Array(rowVar)
      .fill(0)
      .map(() => Array(colVar).fill(0)),
  );
  useEffect(() => {
    setGrid(
      Array(rowVar)
        .fill(0)
        .map(() => Array(colVar).fill(0)),
    );
  }, [rowVar, colVar]);
  return (
    <div className={styles.container}>
      <div className={styles.grid} style={{ '--cols': colVar, '--rows': rowVar } as React.CSSProperties}>
        {grid?.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div className={styles.dotContainer} key={`${rowIndex}-${colIndex}`}>
              <div
                className={styles.dot}
                style={
                  {
                    '--x': rowIndex,
                    '--y': colIndex % colVar,
                    '--size': `${size}px`,
                    '--color-in': colorInVar,
                    '--color-out': colorOutVar,
                  } as React.CSSProperties
                }
              ></div>
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Customgrid;

import React, { useState } from 'react';
import styles from './Customgrid.module.css';

// 1)  그리드 만들기
// 2)  그리드 좌표 위  원 올 수 있게
// 3) 그리드 조절하면 원 자동으로
const Customgrid = () => {
  const [gridData, setGridData] = useState({
    rows: 5,
    cols: 9,
    grid: Array(5)
      .fill(0)
      .map(() => Array(9).fill(0)),
  });
  return (
    <div className={styles.container}>
      <div className={styles.grid} style={{ '--cols': gridData.cols, '--rows': gridData.rows } as React.CSSProperties}>
        {gridData?.grid.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={styles.dot}
              style={{ '--x': rowIndex, '--y': colIndex % gridData.cols } as React.CSSProperties}
            ></div>
          )),
        )}
      </div>
    </div>
  );
};

export default Customgrid;

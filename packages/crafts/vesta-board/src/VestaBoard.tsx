import { useState } from 'react';
import './VestaBoard.css';
import { VestaBlock } from './VestaBlock';

const charset = ' abcdefghijklmnopqrstuvwxyz!@ ';

export const VestaBoard = () => {
  return <VestaLine />;
};

export const VestaLine = () => {
  const [line, setLine] = useState<string>('cool');

  return (
    <div>
      <input type='text' value={line} onChange={e => setLine(e.target.value)} />
      <div style={{ display: 'flex', gap: '10px' }}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <VestaBlock key={idx} charset={charset} targetChar={line[idx]} />
        ))}
      </div>
    </div>
  );
};

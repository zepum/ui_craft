import type { Story } from '@ladle/react';
import { Binding, Pane } from '../../../core/debug/src';
import Customgrid from 'src/Customgrid';
import { useState } from 'react';
import { CustomgridProps } from 'src/Customgrid';

const DEFAULT_CONFIG = {
  rowVar: 3,
  colVar: 5,
  gapXVar: 50,
  gapYVar: 50,
  size: 50,
  colorInVar: '#cefac4',
  colorOutVar: 'rgb(30, 144, 255)',
};
export const Default: Story = () => {
  const [devValue, setDevValue] = useState(DEFAULT_CONFIG);
  return (
    <div>
      <Pane initialValue={DEFAULT_CONFIG} config={{ title: 'Custom Grid' }}>
        <Binding
          name='rowVar'
          value={devValue.rowVar}
          min={1}
          max={20}
          step={1}
          onChange={value => {
            setDevValue({ ...devValue, rowVar: value as number });
          }}
        />
        <Binding
          name='colVar'
          value={devValue.colVar}
          min={1}
          max={20}
          step={1}
          onChange={value => {
            setDevValue({ ...devValue, colVar: value as number });
          }}
        />
        {/* <Binding
          name='gapXVar'
          value={devValue.gapXVar}
          onChange={value => {
            setDevValue({ ...devValue, gapXVar: value as number });
          }}
        />
        <Binding
          name='gapYVar'
          value={devValue.gapYVar}
          onChange={value => {
            setDevValue({ ...devValue, gapYVar: value as number });
          }}
        /> */}
        <Binding
          name='colorInVar'
          value={devValue.colorInVar}
          onChange={value => {
            setDevValue({ ...devValue, colorInVar: value as string });
          }}
        />
        <Binding
          name='colorOutVar'
          value={devValue.colorOutVar}
          onChange={value => {
            setDevValue({ ...devValue, colorOutVar: value as string });
          }}
        />
        <Binding
          name='size'
          value={devValue.size}
          min={20}
          max={200}
          onChange={value => {
            setDevValue({ ...devValue, size: value as number });
          }}
        />
      </Pane>

      <Customgrid
        rowVar={devValue.rowVar}
        colVar={devValue.colVar}
        gapXVar={devValue.gapXVar}
        gapYVar={devValue.gapYVar}
        colorInVar={devValue.colorInVar}
        colorOutVar={devValue.colorOutVar}
        size={devValue.size}
      />
    </div>
  );
};

// control things: row, cols, gap (x,y), colors, size (total 7 things)

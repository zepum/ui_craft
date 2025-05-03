import type { Story } from '@ladle/react';
import { CHAR_SET, VestaBoard } from '../src/VestaBoard';
import { useState } from 'react';
import { Binding, Folder, FolderBinding, Pane, PaneButton, usePane } from '@core/debug';
import { pick } from 'es-toolkit';

type Line = {
  id: string;
  text: string;
  align: 'center' | 'left' | 'right';
  color: string;
  charset: string;
};

const createLine = (
  text: string,
  options?: {
    align: 'center' | 'left' | 'right';
    color: string;
    charset: string;
  },
): Line => {
  return {
    id: Math.random().toString(36).substring(2, 8),
    text,
    align: options?.align ?? 'center',
    color: options?.color ?? '#fff',
    charset: options?.charset ?? CHAR_SET,
  };
};

const INITIAL_LINES = [
  createLine('hi world', {
    align: 'center',
    color: '#eee',
    charset: CHAR_SET,
  }),
  createLine(''),
  createLine(''),
  createLine(''),
];

const INITIAL_VALUE = {
  columnCount: 12,
  lines: INITIAL_LINES,
};

export const DEFAULT: Story = () => {
  const [devValue, setDevValue] = useState(INITIAL_VALUE);

  return (
    <>
      <Pane initialValue={pick(INITIAL_VALUE, ['columnCount'])} config={{ title: 'VestaBoard' }}>
        <Binding
          name='columnCount'
          onChange={value => {
            setDevValue(prev => ({ ...prev, columnCount: value as number }));
          }}
          step={1}
          min={1}
          max={20}
          label='column'
        />
        <PaneButton
          label='Add Line'
          title='+'
          onClick={() => {
            setDevValue(prev => ({
              ...prev,
              lines: [...prev.lines, createLine('')],
            }));
          }}
        />
        {devValue.lines.map((line, idx) => {
          return (
            <Folder expanded={false} key={line.id} initialValue={line} title={`Line ${idx + 1}`}>
              <FolderBinding
                name='text'
                onChange={value => {
                  setDevValue(prev => ({
                    ...prev,
                    lines: updateLine(prev.lines, line.id, 'text', value),
                  }));
                }}
              />
              <FolderBinding
                name='align'
                onChange={value => {
                  setDevValue(prev => ({
                    ...prev,
                    lines: updateLine(prev.lines, line.id, 'align', value),
                  }));
                }}
                options={{
                  left: 'left',
                  center: 'center',
                  right: 'right',
                }}
              />
              <FolderBinding
                name='color'
                onChange={value => {
                  setDevValue(prev => ({
                    ...prev,
                    lines: updateLine(prev.lines, line.id, 'color', value),
                  }));
                }}
              />
              <FolderBinding
                name='charset'
                onChange={value => {
                  setDevValue(prev => ({
                    ...prev,
                    lines: updateLine(prev.lines, line.id, 'charset', value),
                  }));
                }}
              />
            </Folder>
          );
        })}
      </Pane>
      <VestaBoard columnCount={devValue.columnCount} lines={devValue.lines} />
    </>
  );
};

const updateLine = (lines: Line[], id: string, key: string, value: unknown) => {
  return lines.map(line => {
    if (line.id === id) {
      return { ...line, [key]: value };
    }
    return line;
  });
};

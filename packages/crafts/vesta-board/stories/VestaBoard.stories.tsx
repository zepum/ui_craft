import type { Story } from '@ladle/react';
import { CHAR_SET, type Shape, type Theme, VestaBoard } from '../src/VestaBoard';
import { useState } from 'react';
import { Binding, Folder, FolderBinding, Pane, PaneButton } from '@core/debug';
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
    align: options?.align ?? 'left',
    color: options?.color ?? '#fff',
    charset: options?.charset ?? CHAR_SET,
  };
};

const INITIAL_LINES = [
  createLine('I hope', {
    align: 'left',
    color: '#eee',
    charset: CHAR_SET,
  }),
  createLine('you have'),
  createLine('a good Day'),
  createLine('GOD bless U!', {
    color: '#26c7e8',
    align: 'center',
    charset: CHAR_SET,
  }),
];

const INITIAL_VALUE = {
  columnCount: 12,
  lines: INITIAL_LINES,
  shape: 'default',
  theme: 'default',
};

export const DEFAULT: Story = () => {
  const [devValue, setDevValue] = useState(INITIAL_VALUE);

  return (
    <>
      <Pane initialValue={pick(INITIAL_VALUE, ['columnCount', 'shape', 'theme'])} config={{ title: 'VestaBoard' }}>
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
        <Binding
          name='shape'
          onChange={value => {
            setDevValue(prev => ({ ...prev, shape: value as string }));
          }}
          options={{
            default: 'default',
            ellipse: 'ellipse',
          }}
        />
        <Binding
          name='theme'
          onChange={value => {
            setDevValue(prev => ({ ...prev, theme: value as string }));
          }}
          options={{
            default: 'default',
            sky: 'sky',
            peach: 'peach',
            magic: 'magic',
          }}
        />
        <PaneButton
          label='clear'
          title='🗑️'
          onClick={() => {
            setDevValue(prev => ({ ...prev, lines: clearAllLines(prev.lines) }));
          }}
        ></PaneButton>
        <PaneButton
          label='redo'
          title='↩️'
          onClick={() => {
            setDevValue(prev => ({ ...prev, lines: redoAllLines(prev.lines) }));
          }}
        ></PaneButton>
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
      <VestaBoard
        columnCount={devValue.columnCount}
        lines={devValue.lines}
        blockShape={devValue.shape as Shape}
        theme={devValue.theme as Theme}
      />
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

const clearAllLines = (lines: Line[]) => {
  return lines.map(line => {
    return {
      ...line,
      text: '',
    };
  });
};

const redoAllLines = (lines: Line[]) => {
  const TEXT = ['I hope', 'you have', 'a good Day', 'GOD bless U!'];
  return lines.map((line, idx) => {
    return {
      ...line,
      text: TEXT[idx],
    };
  });
};

import '../packages/core/theme/color.css';
import '../packages/core/theme/reset.css';
import { FlickeringGrid } from './FlickingGrid';
import './ladle.css';
import type { GlobalProvider, StoryDefault } from '@ladle/react';
import React from 'react';

export const argTypes = {};

export const Provider: GlobalProvider = ({ children, globalState, storyMeta }) => {
  return (
    <>
      <FlickeringGrid
        style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
        squareSize={2}
        gridGap={20}
        color='lightblue'
        maxOpacity={0.2}
        flickerChance={0.1}
      />
      {children}
    </>
  );
};

import type { StorybookConfig } from '@storybook/react-vite';

const config = {
  stories: ['../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
} satisfies StorybookConfig;

export default config;

import type { Meta, StoryObj } from '@storybook/react-vite';
import { PieMenu } from '../src/PieMenu';

const meta = {
  title: 'Crafts/PieMenu',
  component: PieMenu,
} satisfies Meta<typeof PieMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSelect: () => {},
  },
};

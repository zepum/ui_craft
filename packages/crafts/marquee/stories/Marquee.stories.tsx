import type { Meta, StoryObj } from '@storybook/react-vite';
import { Marquee } from '../src/Marquee';

const meta = {
  title: 'Crafts/Marquee',
  component: Marquee,
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Marquee />,
};

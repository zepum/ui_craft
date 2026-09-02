import type { Meta, StoryObj } from '@storybook/react-vite';
import { Viewtransition } from '../src/Viewtransition';

const meta = {
  title: 'Crafts/Viewtransition',
  component: Viewtransition,
} satisfies Meta<typeof Viewtransition>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Highlight } from '../src/Highlight';
import styles from './Highlight.stories.module.css';

const meta = {
  title: 'Crafts/Highlight',
  component: Highlight,
} satisfies Meta<typeof Highlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <main className={styles.canvas}>
      <header className={styles.toolbar}>
        <Highlight />
        <span className={styles.productName}>Canvas</span>
      </header>
      <section className={styles.workspace}>
        <p className={styles.eyebrow}>Highlight menu</p>
        <h1 className={styles.title}>Everything you need in one menu.</h1>
        <p className={styles.description}>Open the top-left menu and try Editor settings.</p>
      </section>
    </main>
  ),
};

export const OpenWithEditorSettings: Story = {
  render: () => (
    <main className={styles.canvas}>
      <header className={styles.toolbar}>
        <Highlight defaultOpen />
        <span className={styles.productName}>Canvas</span>
      </header>
    </main>
  ),
};

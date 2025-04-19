import styles from './styles/style.module.css';
import { usePane } from '@core/debug';

export const Test = () => {
  const pane = usePane({
    title: 'Hotkey',
  });

  return <h1 className={styles.title}>하이</h1>;
};

import * as styles from './style.module.css';
import { usePane } from '@core/debug';

export const Test = () => {
  const pane = usePane({
    title: 'Hotkey',
  });

  return <h1 className={''}>하이</h1>;
};

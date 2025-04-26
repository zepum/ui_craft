import { useEffect } from 'react';
import styles from './VestaBoard.module.css';
import { usePane } from '@core/debug';

const DEV_SETTINGS = {
  outline: true,
} as const;

export const VestaBoard = () => {
  const { pane, __DEV_config, setConfig } = usePane({
    defaultConfig: DEV_SETTINGS,
    title: 'Setting',
  });

  useEffect(() => {
    if (!pane) return;
    pane.addBinding(DEV_SETTINGS, 'outline').on('change', setConfig);
  }, [pane]);

  return (
    <div data-outline={__DEV_config.outline} className={styles.object}>
      {/* foward top */}
      <div>A</div>
      {/* foward bottom */}
      <div>A</div>
      {/* backward top */}
      {/* <div>A</div> */}
      {/* backward bottom */}
      {/* <div></div> */}
    </div>
  );
};

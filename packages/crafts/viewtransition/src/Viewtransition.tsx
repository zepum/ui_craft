import { useState, useCallback } from 'react';
import styles from './Viewtransition.module.css';

export interface ViewtransitionProps {
  /**
   * Optional className for the container
   */
  className?: string;
}

export const Viewtransition: React.FC<ViewtransitionProps> = ({ className = '' }) => {
  const [currentScreen, setCurrentScreen] = useState<'screen1' | 'screen2'>('screen1');

  const handleTransition = useCallback((screen: 'screen1' | 'screen2') => {
    if (!document.startViewTransition) {
      setCurrentScreen(screen);
      return;
    }

    document.startViewTransition(() => {
      setCurrentScreen(screen);
    });
  }, []);

  return (
    <div className={`${styles.container} ${className}`}>
      {currentScreen === 'screen1' ? (
        <div className={styles.screen} style={{ viewTransitionName: 'screen-content' }}>
          <h2 className={styles.title}>Screen 1</h2>
          <p className={styles.description}>This is the first screen content.</p>
          <button className={styles.button} onClick={() => handleTransition('screen2')} type='button'>
            Go to Screen 2
          </button>
        </div>
      ) : (
        <div className={styles.screen} style={{ viewTransitionName: 'screen-content' }}>
          <h2 className={styles.title}>Screen 2</h2>
          <p className={styles.description}>This is the second screen content.</p>
          <button className={styles.button} onClick={() => handleTransition('screen1')} type='button'>
            Go to Screen 1
          </button>
        </div>
      )}
    </div>
  );
};

export default Viewtransition;

import styles from './TrivisionSegment.module.css';

type TrivisionSegmentProps = {
  idx: number;
};

export const TrivisionSegment = ({ idx }: TrivisionSegmentProps) => {
  return (
    <div className={styles.segmentContainer} style={{ '--segment-idx': idx } as React.CSSProperties}>
      <div className={'face'}>
        <div className={styles.imageFace} style={{ backgroundImage: 'url(/jungle.jpg)' }} />
      </div>
      <div className={'face'}>
        <div className={styles.imageFace} style={{ backgroundImage: 'url(/tokyoNight.jpg)' }} />
      </div>
      <div className={'face'}>
        <div className={styles.imageFace} style={{ backgroundImage: 'url(/waterfall.jpg)' }} />
      </div>
    </div>
  );
};

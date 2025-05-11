import styles from './TrivisionSegment.module.css';

type TrivisionSegmentProps = {
  idx: number;
  images: [string, string, string];
};

export const SEGMENT_CLASSNAME = 'segment';

export const TrivisionSegment = ({ idx, images }: TrivisionSegmentProps) => {
  return (
    <div
      className={`${styles.segmentContainer} ${SEGMENT_CLASSNAME}`}
      style={{ '--segment-idx': idx } as React.CSSProperties}
    >
      <div className={'face'}>
        <div className={styles.imageFace} style={{ backgroundImage: `url(${images[0]})` }} />
      </div>
      <div className={'face'}>
        <div className={styles.imageFace} style={{ backgroundImage: `url(${images[1]})` }} />
      </div>
      <div className={'face'}>
        <div className={styles.imageFace} style={{ backgroundImage: `url(${images[2]})` }} />
      </div>
    </div>
  );
};

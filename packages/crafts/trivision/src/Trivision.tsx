import { SEGMENT_CLASSNAME, TrivisionSegment } from './TrivisionSegment';
import styles from './Trivision.module.css';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useResizeObserver } from 'usehooks-ts';

gsap.registerPlugin(useGSAP);

const POLY = 3;

const isLoaded = (images: [string, string, string]): Promise<unknown> => {
  return Promise.all(
    images.map(image => {
      const img = new Image();
      img.src = image;
      console.log(image);
      return new Promise(resolve => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    }),
  );
};

export type TrivisionProps = {
  count: number;
  segmentCount: number;
  images: [string, string, string];
  duration: number;
  /**
   * 세그먼트 간의 간격 (단위 px)
   */
  gap?: number;
};

export const Trivision = ({ count, segmentCount, images, duration, gap = 3 }: TrivisionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [show, setShow] = useState(false);

  const { width } = useResizeObserver({
    ref: containerRef,
  });

  useEffect(() => {
    isLoaded(images)
      .then(result => {
        setShow(true);
      })
      .catch(() => {
        setShow(true);
      });
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
      });

      const segments: HTMLElement[] = gsap.utils.toArray(`.${SEGMENT_CLASSNAME}`);
      const duration = 1.5;
      const stagger = 0.05;
      tl.to(segments, {
        '--segment-rotate': '120deg',
        duration,
        stagger,
      })
        .addLabel('cycle')
        .to(
          segments,
          {
            '--segment-rotate': '240deg',
            duration,
            stagger,
          },
          '>',
        )
        .to(
          segments,
          {
            '--segment-rotate': '360deg',
            duration,
            stagger,
          },
          '>',
        );
      tlRef.current = tl;
    },
    {
      scope: containerRef, // 스코프 지정
    },
  );

  useGSAP(
    () => {
      if (!tlRef.current) return;
      const cycleTime = tlRef.current.labels.cycle ?? 0;
      const targetPosition = count * cycleTime;
      gsap.to(tlRef.current, {
        totalTime: targetPosition,
        duration,
        ease: 'power1.inOut',
        overwrite: true,
      });
    },
    {
      scope: containerRef, // 스코프 추가
      dependencies: [count, duration],
    },
  );

  return (
    <div
      style={
        {
          width: '100%',
          height: '100%',
          '--trivision-width': `${width}px`,
          '--segment-count': segmentCount,
          minWidth: 'var(--trivision-width)',
          '--segment-gap': `${gap}px`,
        } as React.CSSProperties
      }
    >
      <div data-show={show} ref={containerRef} className={styles.container}>
        {Array.from({ length: segmentCount }).map((_, idx) => (
          <TrivisionSegment images={images} key={idx} idx={idx} />
        ))}
      </div>
    </div>
  );
};

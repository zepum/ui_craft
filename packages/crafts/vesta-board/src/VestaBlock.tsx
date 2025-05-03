import { useGSAP } from '@gsap/react';
import { useEffect, useMemo, useRef } from 'react';
import { Subject } from 'rxjs';
import styles from './VestaBlock.module.css';
import gsap from 'gsap';

type VestaBlockProps = {
  targetChar: string;
  /**
   * @example
   * "abcdefg"
   */
  charset: string;
};

gsap.registerPlugin(useGSAP);

export const VestaBlock = ({ targetChar, charset }: VestaBlockProps) => {
  const subject = useMemo(() => new Subject<string>(), []);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetChar) return;
    subject.next(targetChar);
  }, [targetChar]);

  useGSAP(
    () => {
      const tl = gsap
        .timeline({
          repeat: charset.length - 2,
          paused: true,
          onRepeat: () => {
            const idx = Math.floor(tl.totalTime());

            gsap.set('.forward', {
              innerText: charset[idx],
            });
            gsap.set('.backward', {
              innerText: charset[idx + 1],
            });
            gsap.fromTo('.backwardTop', { filter: 'brightness(0.5)' }, { filter: 'brightness(1)' });
            gsap.fromTo('.forwardBottom', { filter: 'brightness(1)' }, { filter: 'brightness(0.2)' });
          },
        })
        .add([
          gsap.fromTo('.forwardTop', { rotateX: 0 }, { rotateX: -180, duration: 1 }),
          gsap.fromTo('.backwardBottom', { rotateX: 180 }, { rotateX: 0, duration: 1 }),
        ]);

      const duration = tl.totalDuration();
      const scrubber = gsap.to(tl, {
        totalTime: duration,
        repeat: -1,
        paused: true,
        duration: duration,
        ease: 'none',
      });

      subject.subscribe(char => {
        const character = char;
        const currentIndex = charset.indexOf(charset[Math.round(tl.totalTime())]);
        const desiredIndex = charset.indexOf(character);
        // if the current index is greater, loop around
        // we seem to have to add an extra 0.5 to make up for gaps
        const shift =
          currentIndex > desiredIndex ? charset.length - 1 - currentIndex + desiredIndex : desiredIndex - currentIndex;
        // this is how you throw an extra loop in for the stagger
        const padding = 0;
        gsap.to(scrubber, {
          delay: 0,
          totalTime: `+=${shift + padding}`,
          ease: 'power1.out',
          duration: (shift + padding) * gsap.utils.random(0.1, 0.12),
        });
      });
    },
    {
      scope: container,
    },
  );

  return (
    <div ref={container} className={styles.blockContainer}>
      {/* foward top */}
      <div className={'forward forwardTop'}></div>
      {/* foward bottom */}
      <div className={'forward forwardBottom'}></div>
      {/* backward top */}
      <div className={'backward backwardTop'}></div>
      {/* backward bottom */}
      <div className={'backward backwardBottom'}></div>
    </div>
  );
};

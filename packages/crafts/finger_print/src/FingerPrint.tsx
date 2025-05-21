import styles from './FingerPrint.module.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

export const FingerPrint = () => {
  const ref = useRef<SVGSVGElement>(null);
  const strokeColor = 'oklch(0.627 0.194 149.214)';
  const tlRef = useRef<GSAPTimeline>(null);

  useGSAP(
    () => {
      const paths: SVGPathElement[] = gsap.utils.toArray('path');
      const targetPaths = paths.filter((path, idx) => idx % 2 === 1);
      const tl = gsap.timeline({
        paused: true,
      });
      tlRef.current = tl;
      for (const path of targetPaths) {
        const length = Math.ceil(path.getTotalLength());

        gsap.set(path, {
          strokeDashoffset: length,
          strokeDasharray: length,
        });
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 0.75,
            ease: 'power3.inOut',
          },
          '<',
        );
      }
      // tl.play();
    },
    { scope: ref },
  );

  return (
    <>
      <svg
        onClick={() => {
          tlRef.current?.play();
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            tlRef.current?.play();
          }
        }}
        className={styles.fingerPrint}
        xmlns='http://www.w3.org/2000/svg'
        width='120'
        ref={ref}
        height='120'
        viewBox='0 0 24 24'
        fill='none'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3' />
        <path d='M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3' stroke={strokeColor} />
        <path d='M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6' />
        <path d='M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6' stroke={strokeColor} />
        <path d='M12 11v2a14 14 0 0 0 2.5 8' />
        <path d='M12 11v2a14 14 0 0 0 2.5 8' stroke={strokeColor} />
        <path d='M8 15a18 18 0 0 0 1.8 6' />
        <path d='M8 15a18 18 0 0 0 1.8 6' stroke={strokeColor} />
        <path d='M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95' />
        <path d='M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95' stroke={strokeColor} />
      </svg>
    </>
  );
};

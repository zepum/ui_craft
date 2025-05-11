import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SEGMENT_CLASSNAME } from './TrivisionSegment';

export const useTrivisionTL = ({ scope }: { scope: React.RefObject<HTMLElement> }) => {
  const timelineRef = useRef<typeof gsap.timeline>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.add(
        gsap.to(`.${SEGMENT_CLASSNAME}`, {
          '--segment-rotate': '+= 120deg',
          duration: 2,
          ease: 'linear',
          stagger: 0.5,
        }),
      );
    },
    {
      scope,
    },
  );

  return {
    timelineRef,
  };
};

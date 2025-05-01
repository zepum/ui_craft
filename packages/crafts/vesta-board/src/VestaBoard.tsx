import { useEffect, useRef, useState } from 'react';
import './VestaBoard.css';
import { usePane } from '@core/debug';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const DEV_SETTINGS = {
  devMode: false,
  target: 'a',
  rotateX: 0,
  flipTrigger: 0,
} as const;

const charset = 'abcdefghijklmnopqrstuvwxyz';

export const VestaBoard = () => {
  return <VestaLine />;
};

export const VestaLine = () => {
  return <VestaBlock />;
};

type VestaBlockProps = {
  currentChar: string;
  targetChar: string;
};

export const VestaBlock = ({ currentChar, targetChar }: VestaBlockProps) => {
  const { pane, __DEV_config, setConfig, _setConfig } = usePane({
    defaultConfig: DEV_SETTINGS,
    title: 'Setting',
  });

  useEffect(() => {
    if (!pane) return;
    pane.addBinding(DEV_SETTINGS, 'devMode').on('change', setConfig);
    pane.addBinding(DEV_SETTINGS, 'rotateX').on('change', setConfig);
    pane.addBinding(DEV_SETTINGS, 'target').on('change', setConfig);
    pane.addButton({ title: 'flipTrigger' }).on('click', () => {
      _setConfig(prev => ({
        ...prev,
        flipTrigger: prev.flipTrigger + 1,
      }));
    });
  }, [pane]);

  useGSAP(
    async () => {
      const object = document.querySelector('.object');
      const [forwardTop, forwardBottom, backwardTop, backwardBottom] = Array.from(
        document.querySelectorAll('.object > div'),
      );

      // 항상 타임라인을 생성
      const tl = gsap.timeline();

      // devMode가 활성화된 경우에만 애니메이션 실행
      if (__DEV_config.devMode) {
        gsap.set(object, { attr: { 'data-devMode': 'true' } });
        tl.to([forwardTop, forwardBottom], { translateX: 200, attr: { 'data-label': 'A' } });
      } else {
        gsap.set(object, { attr: { 'data-devMode': 'false' } });
        // devMode가 false인 경우 원래 위치로 되돌림
        tl.to([forwardTop, forwardBottom], { translateX: 0, attr: { 'data-label': '' } });
      }

      return () => {
        tl.revert();
      };
    },
    {
      dependencies: [__DEV_config.devMode],
    },
  );

  useGSAP(
    async () => {
      if (!__DEV_config.flipTrigger) {
        return;
      }
      const [forwardTop, forwardBottom, backwardTop, backwardBottom] = Array.from(
        document.querySelectorAll('.object > div'),
      );

      const tl = gsap
        .timeline({
          onRepeat: () => {},
          onComplete: () => {
            const currentChar = backwardTop.innerHTML.toString().toUpperCase();
            const nextChar = charset.toUpperCase()[charset.indexOf(currentChar.toLocaleLowerCase()) + 1];
          },
        })
        .fromTo(backwardBottom, { rotateX: 180 }, { rotateX: 0 }, 0)
        .fromTo(forwardTop, { rotateX: 0 }, { rotateX: -180 }, 0);
    },
    {
      dependencies: [__DEV_config.flipTrigger],
    },
  );

  useGSAP(
    () => {
      const [forwardTop, forwardBottom, backwardTop, backwardBottom] = Array.from(
        document.querySelectorAll('.object > div'),
      );

      let repeatCount = 0;
      const initialCharIdx = charset.indexOf(forwardTop.innerHTML.toString());
      const targetCharIdx = charset.indexOf(__DEV_config.target);

      const calcDistance = (from: number, to: number) => {
        if (from === to) {
          return 0;
        }
        if (from < to) {
          return to - from;
        }
        return charset.length - from + to;
      };
      const distance = calcDistance(initialCharIdx, targetCharIdx);

      if (distance === 0 || targetCharIdx === -1) {
        return;
      }

      const calcDuration = gsap.utils.pipe(
        (distance: number) => {
          const clamped = gsap.utils.clamp(0, charset.length, distance);
          return clamped;
        },
        (clamped: number) => {
          const mapped = gsap.utils.mapRange(0, charset.length, 0, 1, clamped);
          return mapped;
        },
        (mapped: number) => {
          const eased = gsap.parseEase('power3.out')(mapped);
          return eased;
        },
      );

      const tl = gsap
        .timeline({
          repeat: distance - 1,
          paused: true,
        })
        .add([
          gsap.fromTo([forwardTop], { rotateX: 0 }, { rotateX: -180, duration: 1 }),
          gsap.fromTo([backwardBottom], { rotateX: 180 }, { rotateX: 0, duration: 1 }),
        ])
        .call(
          () => {
            repeatCount++;
            gsap.set([forwardTop, forwardBottom], {
              innerText: charset[(initialCharIdx + repeatCount) % charset.length],
            });
            gsap.set([forwardTop], {
              rotateX: 0,
            });
            gsap.set([backwardTop, backwardBottom], {
              innerText: charset[(initialCharIdx + repeatCount + 1) % charset.length],
            });
            gsap.set([backwardBottom], {
              rotateX: 180,
            });
          },
          [],
          '>',
        );

      console.log(tl.totalDuration());
      console.log(tl.totalTime());

      const shift = distance;
      // this is how you throw an extra loop in for the stagger
      const padding = 0;
      gsap.to(tl, {
        delay: 0,
        totalTime: `${shift + padding}`,
        ease: 'power1.out',
        duration: 2,
      });

      console.log('totalDuration', tl.totalDuration());
      console.log('duration', tl.duration());
      console.log('totalTime', tl.totalTime());
    },
    {
      dependencies: [__DEV_config.target],
    },
  );

  return (
    <div className={'object'}>
      {/* foward top */}
      <div className={'forward forwardTop'}>a</div>
      {/* foward bottom */}
      <div className={'forward forwardBottom'}>a</div>
      {/* backward top */}
      <div className={'backward backwardTop'}>b</div>
      {/* backward bottom */}
      <div className={'backward backwardBottom'}>b</div>
    </div>
  );
};

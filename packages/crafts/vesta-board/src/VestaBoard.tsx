import { useEffect, useRef } from 'react';
import './VestaBoard.css';
import { usePane } from '@core/debug';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const DEV_SETTINGS = {
  outline: true,
  rotateX: 0,
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
  const { pane, __DEV_config, setConfig } = usePane({
    defaultConfig: DEV_SETTINGS,
    title: 'Setting',
  });

  useEffect(() => {
    if (!pane) return;
    pane.addBinding(DEV_SETTINGS, 'outline').on('change', setConfig);
    pane.addBinding(DEV_SETTINGS, 'rotateX').on('change', setConfig);
  }, [pane]);

  useGSAP(async () => {
    const [forwardTop, forwardBottom, backwardTop, backwardBottom] = Array.from(
      document.querySelectorAll('.object > div'),
    );

    const tl = gsap
      .timeline({
        // paused: true,
        repeat: 1,
        onRepeat: arg => {
          console.log(arg);
          gsap.set([forwardTop, forwardBottom], { innerText: 'B' });
          gsap.set([forwardTop], { rotateX: 0 });
          gsap.set([backwardTop, backwardBottom], { innerText: 'C' });
        },
      })
      .fromTo(backwardBottom, { rotateX: 180 }, { rotateX: 0 }, 0)
      .fromTo(forwardTop, { rotateX: 0 }, { rotateX: -180 }, 0);

    // tl.play();
    // confirm the letters
    // gsap.set([backwardTop, backwardBottom], { innerText: 'B' });
    // gsap.set([forwardTop, forwardBottom], { innerText: 'C' });
  });

  return (
    <div data-outline={__DEV_config.outline} className={'object'}>
      {/* foward top */}
      <div className={'forward forwardTop'}>A</div>
      {/* foward bottom */}
      <div className={'forward forwardBottom'}>A</div>
      {/* backward top */}
      <div className={'backward backwardTop'}>B</div>
      {/* backward bottom */}
      <div className={'backward backwardBottom'}>B</div>
    </div>
  );
};

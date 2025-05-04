import { useEffect, useRef } from 'react';
import styles from './TextMorphing.module.css';
import { calculateBlurEffect, calculateOpacity, getCircularIndex } from './utils';
import type { AnimationState } from './types';

const DEFAULT_MORPHING_TIME = 1.2;
const DEFAULT_COOLDOWN_TIME = 0.5;
const DEFAULT_TEXTS = [
  '바위 아래 작은 샘물도 흘러서',
  '바다로 갈 뜻을 가지고 있고,',
  '뜰 앞의 작은 나무도',
  '하늘을 꿰뚫을 마음을 가지고 있다.',
];

export interface TextMorphingProps {
  morphingTime?: number;
  cooldownTime?: number;
}

export const TextMorphing = ({
  morphingTime = DEFAULT_MORPHING_TIME,
  cooldownTime = DEFAULT_COOLDOWN_TIME,
}: TextMorphingProps) => {
  const texts = DEFAULT_TEXTS;

  const animationState = useRef<AnimationState>({
    textIndex: texts.length - 1,
    time: new Date(),
    morphingElapsedTime: 0,
    cooldownRemainingTime: cooldownTime,
  });

  const animationFrameIdRef = useRef<number>(0);
  const prevTextRef = useRef<HTMLSpanElement>(null);
  const nextTextRef = useRef<HTMLSpanElement>(null);

  // 모핑 효과 적용 함수
  const updateMorphing = (fraction: number) => {
    if (!prevTextRef.current || !nextTextRef.current) return;

    nextTextRef.current.style.filter = `blur(${calculateBlurEffect(fraction)}px)`;
    nextTextRef.current.style.opacity = calculateOpacity(fraction);

    prevTextRef.current.style.filter = `blur(${calculateBlurEffect(fraction, { isInverse: true })}px)`;
    prevTextRef.current.style.opacity = calculateOpacity(fraction, { isInverse: true });

    // 텍스트 내용 업데이트
    const { textIndex } = animationState.current;
    const textsLength = texts.length;
    prevTextRef.current.textContent = texts[getCircularIndex(textIndex, textsLength)];
    nextTextRef.current.textContent = texts[getCircularIndex(textIndex + 1, textsLength)];
  };

  // 모핑 처리 함수
  const doMorphing = () => {
    const state = animationState.current;
    const updatedMorphElapsedTime = state.morphingElapsedTime - state.cooldownRemainingTime;

    state.morphingElapsedTime = updatedMorphElapsedTime;
    state.cooldownRemainingTime = 0;

    const rawFraction = updatedMorphElapsedTime / morphingTime;
    const fraction = rawFraction > 1 ? 1 : rawFraction;

    if (rawFraction > 1) {
      state.cooldownRemainingTime = cooldownTime;
    }

    updateMorphing(fraction);
  };

  // 쿨다운 상태 설정 함수
  const doCooldown = () => {
    if (!prevTextRef.current || !nextTextRef.current) return;

    animationState.current.morphingElapsedTime = 0;
    nextTextRef.current.style.filter = '';
    nextTextRef.current.style.opacity = '100%';
    prevTextRef.current.style.filter = '';
    prevTextRef.current.style.opacity = '0%';
  };

  const animate = () => {
    const state = animationState.current;

    const newTime = new Date();
    const shouldIncrementIndex = state.cooldownRemainingTime > 0;
    const dt = (newTime.getTime() - state.time.getTime()) / 1000;
    state.time = newTime;

    state.cooldownRemainingTime -= dt;

    if (state.cooldownRemainingTime <= 0) {
      if (shouldIncrementIndex) state.textIndex++;
      doMorphing();
    } else {
      doCooldown();
    }
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  // 텍스트 초기화 함수
  const initializeText = () => {
    if (prevTextRef.current && nextTextRef.current) {
      const { textIndex } = animationState.current;
      const textsLength = texts.length;

      const prevText = texts[getCircularIndex(textIndex, textsLength)];
      const nextText = texts[getCircularIndex(textIndex + 1, textsLength)];
      prevTextRef.current.textContent = prevText;
      nextTextRef.current.textContent = nextText;
    }
  };

  // 애니메이션 시작 함수
  const startAnimation = () => {
    // 애니메이션 상태 초기화
    animationState.current = {
      textIndex: texts.length - 1,
      time: new Date(),
      morphingElapsedTime: 0,
      cooldownRemainingTime: cooldownTime,
    };

    initializeText();
    cancelAnimationFrame(animationFrameIdRef.current);
    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  // props가 변경될 때마다 애니메이션 초기화
  useEffect(() => {
    startAnimation();
    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [morphingTime, cooldownTime]);

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <span ref={prevTextRef} className={styles.text} />
        <span ref={nextTextRef} className={styles.text} />
      </div>

      <svg className={styles.morphingSvg}>
        <defs>
          <filter id='morphingFilter'>
            <feColorMatrix
              in='SourceGraphic'
              type='matrix'
              values='1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140'
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

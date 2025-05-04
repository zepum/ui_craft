import { useEffect, useRef, useState } from 'react';
import styles from './TextMorphing.module.css';
import { calculateBlurEffect, calculateOpacity, getCircularIndex } from './utils';
import type { AnimationState, TextConfig } from './types';

export const TextMorphing = () => {
  // TODO: 컨트롤러 빼기
  const [textConfig, setTextConfig] = useState<TextConfig>({
    texts: [
      '바위 아래 작은 샘물도 흘러서',
      '바다로 갈 뜻을 가지고 있고,',
      '뜰 앞의 작은 나무도',
      '하늘을 꿰뚫을 마음을 가지고 있다.',
    ],
    morphingTime: 1.2,
    cooldownTime: 0.5,
  });

  // 텍스트 모핑 애니메이션의 타이밍을 제어하기 위한 상태
  const animationState = useRef<AnimationState>({
    textIndex: textConfig.texts.length - 1,
    time: new Date(),
    morphingElapsedTime: 0, // 모핑 애니메이션이 진행된 시간
    cooldownRemainingTime: textConfig.cooldownTime, // 다음 모핑까지 남은 대기 시간
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
    const textsLength = textConfig.texts.length;
    prevTextRef.current.textContent = textConfig.texts[getCircularIndex(textIndex, textsLength)];
    nextTextRef.current.textContent = textConfig.texts[getCircularIndex(textIndex + 1, textsLength)];
  };

  // 모핑 처리 함수
  const doMorphing = () => {
    const state = animationState.current;
    const updatedMorphElapsedTime = state.morphingElapsedTime - state.cooldownRemainingTime;

    state.morphingElapsedTime = updatedMorphElapsedTime;
    state.cooldownRemainingTime = 0;

    const rawFraction = updatedMorphElapsedTime / textConfig.morphingTime;
    const fraction = rawFraction > 1 ? 1 : rawFraction;

    if (rawFraction > 1) {
      state.cooldownRemainingTime = textConfig.cooldownTime;
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

  useEffect(() => {
    const initializeText = () => {
      if (prevTextRef.current && nextTextRef.current) {
        const { textIndex } = animationState.current;
        const textsLength = textConfig.texts.length;

        const prevText = textConfig.texts[getCircularIndex(textIndex, textsLength)];
        const nextText = textConfig.texts[getCircularIndex(textIndex + 1, textsLength)];
        prevTextRef.current.textContent = prevText;
        nextTextRef.current.textContent = nextText;
      }
    };

    initializeText();
    animationFrameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameIdRef.current);
  }, [prevTextRef.current, nextTextRef.current]);

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

/**
 * 프랙션 값에 따라 블러 효과를 계산하는 함수
 * @param fraction 0 ~ 1 사이의 진행 비율
 * @param options 블러 계산 옵션
 * @returns 계산된 블러 값 (픽셀)
 */
export const calculateBlurEffect = (
  fraction: number,
  options?: {
    minValue?: number; // 최소 블러 값 (기본값: 0)
    maxValue?: number; // 최대 블러 값 (기본값: 100)
    intensity?: number; // 블러 강도 (기본값: 8)
    isInverse?: boolean; // true면 fraction을 반전시킴 (1 - fraction)
    easing?: (x: number) => number; // 사용자 정의 이징 함수, 기본 이징은 선형 (x => x)
  },
): number => {
  const MIN_FRACTION = 0;
  const MAX_FRACTION = 1;
  const SAFE_FRACTION = 0.01;
  const { minValue = 0, maxValue = 100, intensity = 8, isInverse = false, easing = (x: number) => x } = options || {};

  const boundedFraction = Math.max(MIN_FRACTION, Math.min(MAX_FRACTION, fraction));
  const inversedFraction = isInverse ? MAX_FRACTION - boundedFraction : boundedFraction;
  const easedFraction = easing(inversedFraction);
  const safeFraction = Math.max(SAFE_FRACTION, easedFraction);
  const blurValue = intensity / safeFraction - intensity;

  return Math.max(minValue, Math.min(maxValue, blurValue));
};

/**
 * 프랙션 값에 따라 불투명도를 계산하는 함수
 * @param fraction 0~1 사이의 진행 비율
 * @param options 불투명도 계산 옵션
 * @returns 계산된 불투명도 CSS 값 (예: "75%")
 */
export const calculateOpacity = (
  fraction: number,
  options?: {
    power?: number; // 지수값 (기본값: 0.4)
    minOpacity?: number; // 최소 불투명도 (0-100, 기본값: 0)
    maxOpacity?: number; // 최대 불투명도 (0-100, 기본값: 100)
    isInverse?: boolean; // true면 fraction을 반전시킴 (1-fraction)
    easing?: (x: number) => number; // 사용자 정의 이징 함수, 기본 이징은 선형 (x => x)
  },
): string => {
  const MIN_FRACTION = 0;
  const MAX_FRACTION = 1;
  const { isInverse = false, power = 0.4, minOpacity = 0, maxOpacity = 100, easing = (x: number) => x } = options || {};

  const boundedFraction = Math.max(MIN_FRACTION, Math.min(MAX_FRACTION, fraction));
  const inversedFraction = isInverse ? MAX_FRACTION - boundedFraction : boundedFraction;
  const easedFraction = easing(inversedFraction);
  const opacityValue = easedFraction ** power * 100;
  const clampedOpacity = Math.max(minOpacity, Math.min(maxOpacity, opacityValue));

  return `${clampedOpacity}%`;
};

/**
 * 배열 길이에 맞게 순환되는 인덱스를 계산하는 유틸 함수
 * @param index 원본 인덱스 (음수 또는 배열 길이를 초과하는 값 가능)
 * @param length 배열 길이
 * @returns 정규화된 인덱스 (항상 0 ~ length - 1 사이의 값)
 */
export const getCircularIndex = (index: number, length: number): number => {
  if (length <= 0) {
    throw new Error('길이는 양수여야 함');
  }

  return ((index % length) + length) % length;
};

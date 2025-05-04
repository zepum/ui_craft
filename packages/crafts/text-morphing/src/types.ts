export type TextConfig = {
  texts: string[];
  morphingTime: number;
  cooldownTime: number;
};

export type AnimationState = {
  textIndex: number;
  time: Date;
  morphingElapsedTime: number;
  cooldownRemainingTime: number;
};

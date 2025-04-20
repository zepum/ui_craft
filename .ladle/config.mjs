/** @type {import('@ladle/react').UserConfig} */
export default {
  // pnpm workspace 를 사용하면 node_modules 에서 중복된 stories 파일이 생기므로,
  // "!**/node_modules/**/*.stories.{js,jsx,ts,tsx}" 를 추가하여 중복된 스토리파일을 무시한다.
  stories: ['packages/**/*.stories.{ts,tsx}', '!**/node_modules/**/*.stories.{js,jsx,ts,tsx}'],
};

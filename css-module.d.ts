declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Global styles imported for their side effects (TypeScript 6 checks these imports).
declare module '*.css' {}

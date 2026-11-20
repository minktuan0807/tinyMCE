declare module '*.js' {
  const juice: (html: string, options?: Record<string, unknown>) => string;
  export default juice;
}

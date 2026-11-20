declare const tinymce: any;

interface Window {
  tinymce: any;
}

declare module '*.html?raw' {
  const content: string;
  export default content;
}

import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'node_modules', 'tinymce');
const target = join(root, 'public', 'tinymce');

await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(join(source, 'tinymce.min.js'), join(target, 'tinymce.min.js'));
for (const folder of ['skins', 'icons', 'themes', 'models', 'plugins']) {
  await cp(join(source, folder), join(target, folder), { recursive: true });
}
await mkdir(join(target, 'langs'), { recursive: true });
const languageSource = join(root, 'node_modules', 'tinymce-i18n', 'langs8', 'vi.js');
await cp(languageSource, join(target, 'langs', 'vi.js'));
const fonts = join(root, 'public', 'fonts');
await mkdir(fonts, { recursive: true });
await cp(join(root, 'node_modules', '@fontsource', 'tinos', 'files', 'tinos-vietnamese-400-normal.woff2'), join(fonts, 'Tinos-Regular.woff2'));
await cp(join(root, 'node_modules', '@fontsource', 'tinos', 'files', 'tinos-vietnamese-700-normal.woff2'), join(fonts, 'Tinos-Bold.woff2'));
console.log('Copied TinyMCE runtime to public/tinymce');

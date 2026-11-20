import DOMPurify from 'dompurify';
import { buildFullDocument } from './buildFullDocument';
import type { AppState } from '../types';

export async function copyText(text: string) { try { await navigator.clipboard.writeText(text); } catch { const area = document.createElement('textarea'); area.value = text; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); } }
export async function copyContentHtml(body: string) { await copyText(DOMPurify.sanitize(body, { ADD_ATTR: ['style', 'class'] })); }
export async function copyFullHtml(body: string, state: AppState) { await copyText(buildFullDocument(body, state)); }
export async function copyInlineHtml(body: string, state: AppState) { const full = buildFullDocument(body, state); await copyText(inlineCssFallback(full)); }

function inlineCssFallback(html: string) {
  const parser = new DOMParser(); const doc = parser.parseFromString(html, 'text/html');
  doc.querySelectorAll('style').forEach((style) => {
    for (const rule of Array.from(style.sheet?.cssRules || [])) {
      if (!(rule instanceof CSSStyleRule)) continue;
      try { doc.querySelectorAll(rule.selectorText).forEach((node) => (node as HTMLElement).style.cssText += `;${rule.style.cssText}`); } catch { /* skip unsupported selector */ }
    }
    style.remove();
  });
  return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
}

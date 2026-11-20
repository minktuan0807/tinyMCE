import DOMPurify from 'dompurify';
import type { AppState } from '../types';
import { contentCss } from '../editor/config';

export function buildFullDocument(body: string, appState: AppState, inline = false) {
  const cleanBody = DOMPurify.sanitize(body, { ADD_ATTR: ['style', 'class', 'data-mce-style'] });
  const bg = appState.background;
  const watermark = appState.watermark;
  const paper = contentCss(appState.pageSettings) + `\nbody{background-color:${bg.color};background-image:${bg.image ? `url(${JSON.stringify(bg.image)})` : 'none'};background-repeat:${bg.repeat};background-size:${bg.size};background-position:${bg.position};}`;
  const mark = watermark.enabled ? `<div class="document-watermark" style="opacity:${watermark.opacity};transform:rotate(${watermark.rotation}deg);font-size:${watermark.fontSize}pt;">${watermark.image ? `<img src="${watermark.image}" alt="" />` : DOMPurify.sanitize(watermark.text)}</div>` : '';
  const css = `${paper}\n.document-shell{position:relative}.document-watermark{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;color:#6b7280;font-weight:bold;text-align:center;z-index:0}.document-watermark img{max-width:75%;max-height:75%}.document-content{position:relative;z-index:1}@media print{html{background:#fff}body{box-shadow:none;margin:0;background-image:none}.mce-pagebreak{page-break-after:always;border:0;height:0}.mce-pagebreak::after{display:none}@page{size:${appState.pageSettings.size} ${appState.pageSettings.orientation};margin:${appState.pageSettings.marginTop}mm ${appState.pageSettings.marginRight}mm ${appState.pageSettings.marginBottom}mm ${appState.pageSettings.marginLeft}mm}}`;
  return `<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Văn bản hành chính</title><style>${css}</style></head><body><div class="document-shell">${mark}<div class="document-content">${cleanBody}</div></div></body></html>`;
}

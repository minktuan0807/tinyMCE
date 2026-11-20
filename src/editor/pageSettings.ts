import type { PageSettings } from '../types';
import { state, saveState } from '../state';
import { contentCss } from './config';

export function applyPageSettings(editor: any, page: PageSettings) {
  Object.assign(state.pageSettings, page); saveState();
  const doc = editor.getDoc(); const style = doc.getElementById('app-page-style') || doc.createElement('style');
  style.id = 'app-page-style'; style.textContent = contentCss(page); doc.head.appendChild(style);
  editor.fire('page-settings-changed');
}

export function openPageSettings(editor: any) {
  const p = state.pageSettings;
  editor.windowManager.open({ title: 'Thiết lập trang', size: 'normal', body: { type: 'panel', items: [
    { type:'selectbox', name:'size', label:'Khổ giấy', items:[{text:'A4',value:'A4'},{text:'A5',value:'A5'},{text:'Letter',value:'Letter'}] },
    { type:'selectbox', name:'orientation', label:'Hướng giấy', items:[{text:'Dọc',value:'portrait'},{text:'Ngang',value:'landscape'}] },
    ...(['marginTop','marginBottom','marginLeft','marginRight'] as const).map((name) => ({ type:'input', name, label:`Lề ${({marginTop:'trên',marginBottom:'dưới',marginLeft:'trái',marginRight:'phải'} as any)[name]} (mm)`, inputMode:'decimal' })),
  ] }, initialData: { ...p }, buttons: [{ type:'cancel', text:'Hủy' }, { type:'submit', text:'Áp dụng', buttonType:'primary' }], onSubmit: (api: any) => { applyPageSettings(editor, { ...p, ...api.getData(), marginTop:Number(api.getData().marginTop), marginBottom:Number(api.getData().marginBottom), marginLeft:Number(api.getData().marginLeft), marginRight:Number(api.getData().marginRight) }); api.close(); } });
}

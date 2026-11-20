import type { AppState } from './types';

export const defaultState: AppState = {
  pageSettings: { size: 'A4', orientation: 'portrait', marginTop: 20, marginBottom: 20, marginLeft: 30, marginRight: 15 },
  background: { color: '#ffffff', image: '', repeat: 'no-repeat', size: 'cover', position: 'center' },
  watermark: { enabled: false, text: 'BẢN NHÁP', image: '', opacity: 0.12, rotation: -35, fontSize: 64 },
};

export const state: AppState = structuredClone(defaultState);

export function saveState() { localStorage.setItem('van-ban-viet:settings', JSON.stringify(state)); }
export function loadState() {
  try { Object.assign(state, JSON.parse(localStorage.getItem('van-ban-viet:settings') || '{}')); } catch { /* use defaults */ }
}

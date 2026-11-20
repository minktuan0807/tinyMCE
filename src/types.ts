export type PageSize = 'A4' | 'A5' | 'Letter';
export type Orientation = 'portrait' | 'landscape';

export interface PageSettings {
  size: PageSize;
  orientation: Orientation;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
}

export interface BackgroundSettings {
  color: string;
  image: string;
  repeat: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
  size: 'auto' | 'cover' | 'contain';
  position: string;
}

export interface WatermarkSettings {
  enabled: boolean;
  text: string;
  image: string;
  opacity: number;
  rotation: number;
  fontSize: number;
}

export interface AppState {
  pageSettings: PageSettings;
  background: BackgroundSettings;
  watermark: WatermarkSettings;
}

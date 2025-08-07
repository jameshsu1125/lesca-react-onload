import { ReactElement } from 'react';

export interface Result {
  total: number;
  loaded: number;
  index?: number;
  url?: string;
}

export interface OnLoaderProps {
  children: ReactElement;
  hideBeforeLoaded?: boolean;
  onStep?: (state: Result) => void;
  onload?: (state: Result) => void;
}

export interface ImageOnloadResult {
  loaded: number;
  total: number;
  index: number;
  url: string;
}

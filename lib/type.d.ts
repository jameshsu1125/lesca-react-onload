import { ReactElement } from 'react';
export interface Result {
    total: number;
    loaded: number;
    index?: number;
    url?: string;
    /** 載入失敗的圖片網址（失敗仍會計入 loaded，進度不會卡住） */
    failed?: string[];
}
export type onStart = Pick<Result, 'total' | 'loaded'> & {
    urls: string[];
};
export interface LoaderOptions {
    hideBeforeLoaded?: boolean;
    onStart?: (state: onStart) => void;
    onUpdate?: (state: Result) => void;
}
export interface OnLoaderProps {
    children: ReactElement;
    hideBeforeLoaded?: boolean;
    onStep?: (state: Result) => void;
    onload?: (state: Result) => void;
    onStart?: (state: onStart) => void;
}
export interface ImageOnloadResult {
    loaded: number;
    total: number;
    index: number;
    url: string;
}

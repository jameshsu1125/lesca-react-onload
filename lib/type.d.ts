import { ReactElement } from 'react';
export interface OnLoaderProps {
    children: ReactElement;
    hideBeforeLoaded?: boolean;
    onStep?: Function;
    onload?: Function;
}
export interface ImageOnloadResult {
    loaded: number;
    total: number;
    index: number;
    url: string;
}

import type { LoaderOptions, Result } from './type';
/**
 * 預載 target 內所有圖片並回報進度。
 * - 載入失敗的圖片會以 console.warn 警告，並視為「已處理」，不會卡住整體進度。
 * - 圖片依 DOM 順序一張一張載入。
 * - 相同網址在同一次載入中只會請求一次。
 */
export declare const loadImages: (target: HTMLElement, options?: LoaderOptions) => Promise<Result>;

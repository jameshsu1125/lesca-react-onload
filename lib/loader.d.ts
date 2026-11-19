import type { LoaderOptions, Result } from './type';
/** 隱藏元素並回傳還原函式（還原成原本的 inline display，而不是強制設成 block / flex） */
export declare const hideTarget: (target: HTMLElement) => () => void;
/**
 * 預載 target 內所有圖片並回報進度。
 * - 載入失敗的圖片會以 console.warn 警告，並視為「已處理」，不會卡住整體進度。
 * - 圖片依 DOM 順序一張一張載入。
 * - 相同網址在同一次載入中只會請求一次。
 */
export declare const loadImages: (target: HTMLElement, options?: LoaderOptions) => Promise<Result>;

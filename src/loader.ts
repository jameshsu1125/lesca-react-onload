import type { LoaderOptions, Result } from './type';

const TAG = '[lesca-react-onload]';
const URL_PATTERN = /url\((['"]?)(.*?)\1\)/gi;

type Item = { url: string; index: number };

const extractUrls = (value: string) =>
  Array.from(value.matchAll(URL_PATTERN), (match) => match[2]).filter(Boolean);

const getStyleValue = (el: Element, property: string, pseudo?: string) => {
  try {
    return window.getComputedStyle(el, pseudo).getPropertyValue(property);
  } catch {
    return '';
  }
};

/** 掃描 target 與其子孫的 <img src>、background-image、mask-image 與 ::before / ::after 背景圖 */
const scan = (target: HTMLElement): Item[] => {
  const items: Item[] = [];
  [target, ...Array.from(target.querySelectorAll('*'))].forEach((el, index) => {
    const urls: string[] = [];
    const src = el.tagName === 'IMG' ? el.getAttribute('src') : null;
    if (src) urls.push(src);

    ['background-image', '-webkit-mask-image', 'mask-image'].forEach((property) =>
      urls.push(...extractUrls(getStyleValue(el, property))),
    );
    ['::before', '::after'].forEach((pseudo) =>
      urls.push(...extractUrls(getStyleValue(el, 'background-image', pseudo))),
    );

    urls.forEach((url) => items.push({ url, index }));
  });
  return items;
};

const loadOne = (url: string) =>
  new Promise<boolean>((resolve) => {
    const image = new Image();
    image.onload = () => resolve(true);
    image.onerror = () => {
      console.warn(`${TAG} Failed to load image: ${url}`);
      resolve(false);
    };
    image.src = url;
  });

/**
 * 預載 target 內所有圖片並回報進度。
 * - 載入失敗的圖片會以 console.warn 警告，並視為「已處理」，不會卡住整體進度。
 * - 相同網址在同一次載入中只會請求一次。
 */
export const loadImages = (target: HTMLElement, options: LoaderOptions = {}): Promise<Result> => {
  const { hideBeforeLoaded = true, onStart, onUpdate } = options;

  const previousDisplay = target.style.display;
  if (hideBeforeLoaded) target.style.display = 'none';
  const restore = () => {
    if (hideBeforeLoaded) target.style.display = previousDisplay;
  };

  const items = scan(target);
  const total = items.length;
  onStart?.({ total, loaded: 0, urls: items.map((item) => item.url) });

  if (total === 0) {
    restore();
    return Promise.resolve({ total: 0, loaded: 0, failed: [] });
  }

  return new Promise<Result>((resolve) => {
    const requests = new Map<string, Promise<boolean>>();
    const failed: string[] = [];
    let loaded = 0; // 已處理（成功 + 失敗）的數量，讓進度能走到 100%

    items.forEach(({ url, index }) => {
      let request = requests.get(url);
      if (!request) {
        request = loadOne(url);
        requests.set(url, request);
      }

      request.then((ok) => {
        loaded++;
        if (!ok && !failed.includes(url)) failed.push(url);
        const result: Result = { total, loaded, index, url, failed: [...failed] };

        if (loaded === total) {
          restore();
          requestAnimationFrame(() => resolve(result));
        } else {
          onUpdate?.(result);
        }
      });
    });
  });
};

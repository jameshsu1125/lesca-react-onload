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

/** 隱藏元素並回傳還原函式（還原成原本的 inline display，而不是強制設成 block / flex） */
export const hideTarget = (target: HTMLElement) => {
  const previousDisplay = target.style.display;
  target.style.display = 'none';
  return () => {
    target.style.display = previousDisplay;
  };
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
 * - 圖片依 DOM 順序一張一張載入。
 * - 相同網址在同一次載入中只會請求一次。
 */
export const loadImages = (target: HTMLElement, options: LoaderOptions = {}): Promise<Result> => {
  const { hideBeforeLoaded = true, onStart, onUpdate } = options;

  const show = hideBeforeLoaded ? hideTarget(target) : undefined;
  const restore = () => show?.();

  const items = scan(target);
  const total = items.length;
  onStart?.({ total, loaded: 0, urls: items.map((item) => item.url) });

  if (total === 0) {
    restore();
    return Promise.resolve({ total: 0, loaded: 0, failed: [] });
  }

  return (async () => {
    const results = new Map<string, boolean>();
    const failed: string[] = [];
    let loaded = 0; // 已處理（成功 + 失敗）的數量，讓進度能走到 100%

    // 一張一張依序載入；相同網址只請求一次，之後直接沿用結果
    for (const { url, index } of items) {
      let ok = results.get(url);
      if (ok === undefined) {
        ok = await loadOne(url);
        results.set(url, ok);
      }

      loaded++;
      if (!ok && !failed.includes(url)) failed.push(url);
      const result: Result = { total, loaded, index, url, failed: [...failed] };

      if (loaded === total) {
        restore();
        await new Promise((resolve) => requestAnimationFrame(resolve));
        return result;
      }
      onUpdate?.(result);
    }
    // 理論上不會到這裡（items 非空時最後一輪必定 return）
    restore();
    return { total, loaded, failed: [...failed] };
  })();
};

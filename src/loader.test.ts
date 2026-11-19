import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { loadImages } from './loader';
import type { Result } from './type';

// jsdom 不會真的載入圖片，也沒有實作 pseudo-element 的 getComputedStyle，這裡都用假的取代
const requested: string[] = [];
let failing: string[] = [];
let manual: FakeImage[] | null = null; // 設定後圖片不會自動完成，改由測試手動觸發

class FakeImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  set src(url: string) {
    requested.push(url);
    if (manual) manual.push(this);
    else setTimeout(() => (failing.includes(url) ? this.onerror : this.onload)?.(), 0);
  }
}

const realGetComputedStyle = window.getComputedStyle.bind(window);

let host: HTMLDivElement;
let warn: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  requested.length = 0;
  failing = [];
  manual = null;
  vi.stubGlobal('Image', FakeImage);
  vi.spyOn(window, 'getComputedStyle').mockImplementation((el, pseudo) =>
    pseudo
      ? ({ getPropertyValue: () => 'none' } as unknown as CSSStyleDeclaration)
      : realGetComputedStyle(el),
  );
  warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  host = document.createElement('div');
  document.body.appendChild(host);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  host.remove();
});

describe('loadImages', () => {
  it('依序一張一張載入：前一張完成後才開始下一張', async () => {
    host.innerHTML = '<img src="/1.png" /><img src="/2.png" /><img src="/3.png" />';
    const pending: FakeImage[] = [];
    manual = pending;
    const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

    const promise = loadImages(host);
    expect(requested).toEqual(['/1.png']);

    for (const expected of [
      ['/1.png', '/2.png'],
      ['/1.png', '/2.png', '/3.png'],
    ]) {
      pending.shift()?.onload?.();
      await flush();
      expect(requested).toEqual(expected);
    }
    pending.shift()?.onload?.();
    expect(await promise).toMatchObject({ total: 3, loaded: 3 });
  });

  it('沒有圖片時直接完成', async () => {
    host.innerHTML = '<p>text</p>';
    expect(await loadImages(host)).toEqual({ total: 0, loaded: 0, failed: [] });
  });

  it('掃描 <img> 與 background-image，並回報進度', async () => {
    host.innerHTML = `
      <img src="/a.png" />
      <div style="background-image: url('/b.png'), url(/c.png)"></div>`;
    const onStart = vi.fn();
    const updates: Result[] = [];

    const result = await loadImages(host, { onStart, onUpdate: (r) => updates.push(r) });

    expect(onStart).toHaveBeenCalledWith({
      total: 3,
      loaded: 0,
      urls: ['/a.png', expect.stringContaining('/b.png'), expect.stringContaining('/c.png')],
    });
    expect(updates.map((u) => u.loaded)).toEqual([1, 2]);
    expect(result).toMatchObject({ total: 3, loaded: 3, failed: [] });
    expect(warn).not.toHaveBeenCalled();
  });

  it('圖片載入失敗時：警告、不卡住，且仍會完成', async () => {
    host.innerHTML = '<img src="/ok.png" /><img src="/broken.png" />';
    failing = ['/broken.png'];

    const result = await loadImages(host);

    expect(result).toMatchObject({ total: 2, loaded: 2, failed: ['/broken.png'] });
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('/broken.png'));
  });

  it('相同網址只請求一次，失敗也只警告一次', async () => {
    host.innerHTML = '<img src="/dup.png" /><img src="/dup.png" /><img src="/dup.png" />';
    failing = ['/dup.png'];

    const result = await loadImages(host);

    expect(requested).toEqual(['/dup.png']);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({ total: 3, loaded: 3, failed: ['/dup.png'] });
  });

  it('hideBeforeLoaded：載入期間隱藏，完成後還原原本的 display', async () => {
    host.style.display = 'grid';
    host.innerHTML = '<img src="/a.png" />';

    const promise = loadImages(host, { hideBeforeLoaded: true });
    expect(host.style.display).toBe('none');
    await promise;
    expect(host.style.display).toBe('grid');
  });

  it('hideBeforeLoaded=false：不動 display', async () => {
    host.style.display = 'grid';
    host.innerHTML = '<img src="/a.png" />';

    const promise = loadImages(host, { hideBeforeLoaded: false });
    expect(host.style.display).toBe('grid');
    await promise;
    expect(host.style.display).toBe('grid');
  });
});

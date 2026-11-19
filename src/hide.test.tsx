import { act, cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import OnloadProvider from '.';

// 使用真實 loader（不 mock），驗證 hideBeforeLoaded 的實際效果
let finishImages: () => void;
let pending: Array<() => void> = [];

beforeEach(() => {
  pending = [];
  finishImages = () => pending.splice(0).forEach((fn) => fn());
  vi.stubGlobal(
    'Image',
    class {
      onload: (() => void) | null = null;
      set src(_url: string) {
        pending.push(() => this.onload?.());
      }
    },
  );
  vi.spyOn(window, 'getComputedStyle').mockImplementation(
    () => ({ getPropertyValue: () => 'none' }) as unknown as CSSStyleDeclaration,
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('hideBeforeLoaded（真實 loader）', () => {
  it('掛載後、第一次繪製前就必須隱藏，不能等到下一個 frame', () => {
    const { container } = render(
      <OnloadProvider>
        <div data-testid='box'>
          <img src='/a.png' />
        </div>
      </OnloadProvider>,
    );
    expect((container.firstElementChild as HTMLElement).style.display).toBe('none');
  });

  it('載入完成後還原；hideBeforeLoaded=false 則從頭到尾不隱藏', async () => {
    const onload = vi.fn();
    const { container } = render(
      <OnloadProvider onload={onload}>
        <div style={{ display: 'grid' }}>
          <img src='/a.png' />
        </div>
      </OnloadProvider>,
    );
    const box = container.firstElementChild as HTMLElement;
    expect(box.style.display).toBe('none');
    await vi.waitFor(() => expect(pending.length).toBe(1)); // 掃描開始、正在載入
    expect(box.style.display).toBe('none');
    await act(async () => {
      finishImages();
      await vi.waitFor(() => expect(onload).toHaveBeenCalled());
    });
    expect(box.style.display).toBe('grid');
  });
});

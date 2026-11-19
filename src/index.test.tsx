import { act, cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Result, onStart } from './type';

type LoadOptions = {
  hideBeforeLoaded?: boolean;
  onStart?: (e: onStart) => void;
  onUpdate?: (e: Result) => void;
};

const mock = vi.hoisted(() => ({
  load: vi.fn(),
}));

vi.mock('./loader', () => ({
  loadImages: (target: HTMLElement, options: LoadOptions) => mock.load(target, options),
}));

import OnloadProvider from '.';

// 讓測試控制 load() 何時完成
let finish: (r: Result) => void;
let options: LoadOptions;

const frame = () => new Promise((r) => requestAnimationFrame(() => r(null)));
const loadCalled = () => vi.waitFor(() => expect(mock.load).toHaveBeenCalledTimes(1));

beforeEach(() => {
  mock.load.mockReset().mockImplementation((_target: HTMLElement, o: LoadOptions) => {
    options = o;
    return new Promise<Result>((resolve) => {
      finish = resolve;
    });
  });
});

afterEach(cleanup);

describe('OnloadProvider', () => {
  it('依序轉發 onStart / onStep / onload', async () => {
    const onStart = vi.fn();
    const onStep = vi.fn();
    const onload = vi.fn();
    render(
      <OnloadProvider onStart={onStart} onStep={onStep} onload={onload}>
        <div />
      </OnloadProvider>,
    );
    await loadCalled();

    const start = { total: 2, loaded: 0, urls: ['a', 'b'] };
    const step = { total: 2, loaded: 1, index: 0, url: 'a' };
    const done = { total: 2, loaded: 2, index: 1, url: 'b' };
    options.onStart?.(start);
    options.onUpdate?.(step);
    await act(async () => finish(done));

    expect(onStart).toHaveBeenCalledWith(start);
    expect(onStep).toHaveBeenCalledWith(step);
    expect(onload).toHaveBeenCalledWith(done);
  });

  it('callback 更新後使用最新的版本', async () => {
    const first = vi.fn();
    const second = vi.fn();
    const { rerender } = render(
      <OnloadProvider onStep={first}>
        <div />
      </OnloadProvider>,
    );
    await loadCalled();
    rerender(
      <OnloadProvider onStep={second}>
        <div />
      </OnloadProvider>,
    );

    options.onUpdate?.({ total: 1, loaded: 1 });

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('卸載後不再觸發 callback', async () => {
    const onStep = vi.fn();
    const onload = vi.fn();
    const { unmount } = render(
      <OnloadProvider onStep={onStep} onload={onload}>
        <div />
      </OnloadProvider>,
    );
    await loadCalled();
    unmount();

    options.onUpdate?.({ total: 1, loaded: 1 });
    await act(async () => finish({ total: 1, loaded: 1 }));

    expect(onStep).not.toHaveBeenCalled();
    expect(onload).not.toHaveBeenCalled();
  });

  it('在掃描開始前卸載，不會呼叫 load', async () => {
    const { unmount } = render(
      <OnloadProvider>
        <div />
      </OnloadProvider>,
    );
    unmount();
    await frame();
    await frame();

    expect(mock.load).not.toHaveBeenCalled();
  });

  it('保留子元素原本的 ref（物件與函式）', async () => {
    const objectRef = createRef<HTMLDivElement>();
    const fnRef = vi.fn();

    render(
      <OnloadProvider>
        <div ref={objectRef} />
      </OnloadProvider>,
    );
    await loadCalled();
    expect(objectRef.current).toBeInstanceOf(HTMLDivElement);

    render(
      <OnloadProvider>
        <div ref={fnRef} />
      </OnloadProvider>,
    );
    expect(fnRef).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('把 hideBeforeLoaded 傳給 loader（預設 true）', async () => {
    const { unmount } = render(
      <OnloadProvider hideBeforeLoaded={false}>
        <div />
      </OnloadProvider>,
    );
    await loadCalled();
    expect(options.hideBeforeLoaded).toBe(false);
    unmount();

    mock.load.mockClear();
    render(
      <OnloadProvider>
        <div />
      </OnloadProvider>,
    );
    await loadCalled();
    expect(options.hideBeforeLoaded).toBe(true);
  });
});

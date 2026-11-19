import ImageOnload from 'lesca-image-onload';
import { cloneElement, isValidElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ReactElement, ReactNode, Ref } from 'react';
import { OnLoaderProps } from './type';

const setRef = <T,>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
};

const OnloadProvider = (props: OnLoaderProps): ReactNode => {
  const { children, hideBeforeLoaded = true } = props;

  const [target, setTarget] = useState<HTMLElement | null>(null);

  // 永遠指向最新的 callback，避免 effect 只跑一次造成 stale closure
  const callbacks = useRef(props);
  useLayoutEffect(() => {
    callbacks.current = props;
  });

  const childRef = isValidElement(children)
    ? (children as ReactElement<{ ref?: Ref<HTMLElement> }>).props.ref
    : undefined;

  // 同時寫入內部 ref 與子元素原本的 ref，不覆蓋使用者自己的 ref
  const mergedRef = useCallback(
    (node: HTMLElement | null) => {
      setTarget(node);
      setRef(childRef, node);
    },
    [childRef],
  );

  useEffect(() => {
    if (!target) return;

    let disposed = false;
    const imageOnload = new ImageOnload(target, hideBeforeLoaded);

    // 等一個 frame 讓子元素的樣式（例如 CSS-in-JS、Tailwind）套用完成再掃描
    const frame = requestAnimationFrame(() => {
      imageOnload
        .load({
          hideBeforeLoaded,
          onStart: (r) => {
            if (!disposed) callbacks.current.onStart?.(r);
          },
          onUpdate: (e) => {
            if (!disposed) callbacks.current.onStep?.(e);
          },
        })
        .then((e) => {
          if (!disposed) callbacks.current.onload?.(e);
        });
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
    };
    // 只在目標元素掛載時執行；hideBeforeLoaded 以掛載當下的值為準
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return isValidElement(children)
    ? cloneElement(children as ReactElement<{ ref?: Ref<HTMLElement> }>, { ref: mergedRef })
    : children;
};

export default OnloadProvider;

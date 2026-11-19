import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { ReactElement, ReactNode, Ref } from 'react';
import { hideTarget, loadImages } from './loader';
import { OnLoaderProps } from './type';

const setRef = <T,>(ref: Ref<T> | undefined, value: T | null) => {
  if (typeof ref === 'function') ref(value);
  else if (ref) ref.current = value;
};

const OnloadProvider = (props: OnLoaderProps): ReactNode => {
  const { children, hideBeforeLoaded = true } = props;

  const [target, setTarget] = useState<HTMLElement | null>(null);

  const hidden = useRef<(() => void) | undefined>(undefined);

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

  // 在瀏覽器繪製前就先隱藏，避免內容閃現一個 frame 之後才消失
  useLayoutEffect(() => {
    if (!target || !hideBeforeLoaded) return;
    const show = hideTarget(target);
    hidden.current = show;
    return () => {
      hidden.current = undefined;
      show();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  useEffect(() => {
    if (!target) return;

    let disposed = false;

    // 等一個 frame 讓子元素的樣式（例如 CSS-in-JS、Tailwind）套用完成再掃描
    const frame = requestAnimationFrame(() => {
      loadImages(target, {
        hideBeforeLoaded: false, // 隱藏與還原由上面的 layout effect 負責
        onStart: (r) => {
          if (!disposed) callbacks.current.onStart?.(r);
        },
        onUpdate: (e) => {
          if (!disposed) callbacks.current.onStep?.(e);
        },
      }).then((e) => {
        if (disposed) return;
        hidden.current?.();
        callbacks.current.onload?.(e);
      });
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return isValidElement(children)
    ? cloneElement(children as ReactElement<{ ref?: Ref<HTMLElement> }>, { ref: mergedRef })
    : children;
};

export default OnloadProvider;

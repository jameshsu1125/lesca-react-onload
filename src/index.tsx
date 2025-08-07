import ImageOnload from 'lesca-image-onload';
import React, { Children, cloneElement, useEffect, useRef } from 'react';
import { OnLoaderProps } from './type';

const OnloadProvider = ({ children, hideBeforeLoaded = true, onStep, onload }: OnLoaderProps) => {
  const ref = useRef(undefined);

  useEffect(() => {
    if (ref && ref.current) {
      new ImageOnload()
        .load(ref.current, {
          hideBeforeLoaded,
          onUpdate: (e) => onStep?.(e),
        })
        .then((e) => onload?.(e));
    }
  }, []);
  return Children.map(children, (child) =>
    // Ensure child is a valid React element before spreading props
    child && typeof child === 'object' && 'props' in child
      ? cloneElement(child as React.ReactElement, { ...(child as any).props, ref })
      : child,
  );
};

export default OnloadProvider;

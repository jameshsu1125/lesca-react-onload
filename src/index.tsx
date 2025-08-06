import ImageOnload from 'lesca-image-onload';
import { Children, cloneElement, useEffect, useRef } from 'react';
import { ImageOnloadResult, OnLoaderProps } from './type';

const OnloadProvider = ({
  children,
  hideBeforeLoaded = true,
  onStep = () => {},
  onload = () => {},
}: OnLoaderProps) => {
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      new ImageOnload()
        .load(ref.current, { hideBeforeLoaded, onUpdate: (e: any) => onStep?.(e) })
        .then((e: any) => {
          onload?.(e as ImageOnloadResult);
        });
    }
  }, []);
  return Children.map(children, (child) => {
    if (!child || typeof child !== 'object' || !('props' in child)) return child;
    return cloneElement(child as React.ReactElement, { ...(child as any).props, ref });
  });
};

export default OnloadProvider;

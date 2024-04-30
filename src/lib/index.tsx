import ImageOnload from 'lesca-image-onload';
import { Result } from 'lesca-image-onload/lib/type';
import { Children, cloneElement, useEffect, useRef } from 'react';
import { ImageOnloadResult, OnLoaderProps } from './type';

const OnloadProvider = ({
  children,
  hideBeforeLoaded = true,
  onStep = () => {},
  onload = () => {},
}: OnLoaderProps) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      new ImageOnload()
        .load(ref.current, {
          hideBeforeLoaded,
          onUpdate: (e: Result) => onStep?.(e),
        })
        .then((e: any) => {
          onload?.(e as ImageOnloadResult);
        });
    }
  }, []);
  return Children.map(children, (child) => cloneElement(child, { ...child.props, ref }));
};

export default OnloadProvider;

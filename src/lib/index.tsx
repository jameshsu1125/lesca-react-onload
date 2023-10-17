import ImageOnload from 'lesca-image-onload';
import { Children, cloneElement, useEffect, useRef } from 'react';
import { ImageOnloadResult, OnLoaderProps } from './type';

const OnloadProvider = ({ children, hideBeforeLoaded, onStep, onload }: OnLoaderProps) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      new ImageOnload()
        .load(ref.current, {
          hideBeforeLoaded,
          onUpdate: (e: ImageOnloadResult) => onStep?.(e),
        })
        .then((e: any) => {
          onload?.(e as ImageOnloadResult);
        });
    }
  }, []);
  return Children.map(children, (child) => cloneElement(child, { ...child.props, ref }));
};

OnloadProvider.defaultProps = {
  hideBeforeLoaded: true,
  onStep: () => {},
  onload: () => {},
};

export default OnloadProvider;

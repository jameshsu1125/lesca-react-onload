import { Children, cloneElement, useEffect, useRef } from 'react';
import ImageOnload from 'lesca-image-onload';
import { ImageOnloadResult, OnLoaderProps } from './type';

const OnLoaderProvider = ({ children, hideBeforeLoaded, onStep, onload }: OnLoaderProps) => {
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

OnLoaderProvider.defaultProps = {
  hideBeforeLoaded: true,
  onStep: () => {},
  onload: () => {},
};

export default OnLoaderProvider;

/// <reference types="react" />
import { OnLoaderProps } from './type';
declare const OnloadProvider: {
    ({ children, hideBeforeLoaded, onStep, onload }: OnLoaderProps): import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>[];
    defaultProps: {
        hideBeforeLoaded: boolean;
        onStep: () => void;
        onload: () => void;
    };
};
export default OnloadProvider;

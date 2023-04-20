var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "lesca-image-onload"], function (require, exports, react_1, lesca_image_onload_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    lesca_image_onload_1 = __importDefault(lesca_image_onload_1);
    var OnLoaderProvider = function (_a) {
        var children = _a.children, hideBeforeLoaded = _a.hideBeforeLoaded, onStep = _a.onStep, onload = _a.onload;
        var ref = (0, react_1.useRef)();
        (0, react_1.useEffect)(function () {
            if (ref.current) {
                new lesca_image_onload_1.default()
                    .load(ref.current, {
                    hideBeforeLoaded: hideBeforeLoaded,
                    onUpdate: function (e) { return onStep === null || onStep === void 0 ? void 0 : onStep(e); },
                })
                    .then(function (e) {
                    onload === null || onload === void 0 ? void 0 : onload(e);
                });
            }
        }, []);
        return react_1.Children.map(children, function (child) { return (0, react_1.cloneElement)(child, __assign(__assign({}, child.props), { ref: ref })); });
    };
    OnLoaderProvider.defaultProps = {
        hideBeforeLoaded: true,
        onStep: function () { },
        onload: function () { },
    };
    exports.default = OnLoaderProvider;
});

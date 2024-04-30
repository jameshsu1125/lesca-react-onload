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
define(["require", "exports", "lesca-image-onload", "react"], function (require, exports, lesca_image_onload_1, react_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    lesca_image_onload_1 = __importDefault(lesca_image_onload_1);
    var OnloadProvider = function (_a) {
        var children = _a.children, _b = _a.hideBeforeLoaded, hideBeforeLoaded = _b === void 0 ? true : _b, _c = _a.onStep, onStep = _c === void 0 ? function () { } : _c, _d = _a.onload, onload = _d === void 0 ? function () { } : _d;
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
    exports.default = OnloadProvider;
});

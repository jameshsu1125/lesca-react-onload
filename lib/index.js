"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = require("react");
var _lescaImageOnload = _interopRequireDefault(require("lesca-image-onload"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var OnLoaderProvider = function OnLoaderProvider(_ref) {
  var children = _ref.children,
    hideBeforeLoaded = _ref.hideBeforeLoaded,
    onStep = _ref.onStep,
    onload = _ref.onload;
  var ref = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    if (ref.current) {
      new _lescaImageOnload["default"]().load(ref.current, {
        hideBeforeLoaded: hideBeforeLoaded,
        onUpdate: function onUpdate(e) {
          return onStep === null || onStep === void 0 ? void 0 : onStep(e);
        }
      }).then(function (e) {
        onload === null || onload === void 0 ? void 0 : onload(e);
      });
    }
  }, []);
  return _react.Children.map(children, function (child) {
    return /*#__PURE__*/(0, _react.cloneElement)(child, _objectSpread(_objectSpread({}, child.props), {}, {
      ref: ref
    }));
  });
};
OnLoaderProvider.defaultProps = {
  hideBeforeLoaded: true,
  onStep: function onStep() {},
  onload: function onload() {}
};
var _default = OnLoaderProvider;
exports["default"] = _default;
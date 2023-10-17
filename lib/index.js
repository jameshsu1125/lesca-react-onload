"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _lescaImageOnload = _interopRequireDefault(require("lesca-image-onload"));
var _react = require("react");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var OnloadProvider = function OnloadProvider(_ref) {
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
        onload === null || onload === void 0 || onload(e);
      });
    }
  }, []);
  return _react.Children.map(children, function (child) {
    return /*#__PURE__*/(0, _react.cloneElement)(child, _objectSpread(_objectSpread({}, child.props), {}, {
      ref: ref
    }));
  });
};
OnloadProvider.defaultProps = {
  hideBeforeLoaded: true,
  onStep: function onStep() {},
  onload: function onload() {}
};
var _default = exports["default"] = OnloadProvider;
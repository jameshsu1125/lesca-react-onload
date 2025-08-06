var x = /* @__PURE__ */ ((p) => (p[p.unload = 0] = "unload", p[p.loading = 1] = "loading", p[p.loaded = 2] = "loaded", p))(x || {});
const B = {
  hideBeforeLoaded: !0,
  onUpdate: (p) => {
  }
};
class F {
  index;
  result;
  /**
   * add event by dom background
   * @param {HTMLElement} target
   * @param {Options} options
   * @returns Promise
   */
  constructor() {
    this.index = 0, this.result = [];
  }
  load(a, _ = B) {
    if (!a)
      return new Promise((d) => {
        d({ total: 0, loaded: 0 });
      });
    const h = { ...B, ..._ }, { onUpdate: E, hideBeforeLoaded: l } = h, S = this.getStyle(a, "display") === "flex" ? "flex" : "block";
    l && (a.style.display = "none");
    var $ = Array.from(a.querySelectorAll("*"));
    [a, ...$].forEach((d, v) => {
      const y = d.tagName, T = d.getAttribute("src"), m = this.getStyle(d, "background-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), C = this.getStyle(d, "-webkit-mask-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), g = x.unload;
      return y === "IMG" && T ? (this.result.push({ url: T, index: v, status: g }), !0) : y === "DIV" && m !== "none" ? (m.includes("gradient") || this.result.push({ url: m, index: v, status: g }), !0) : (y === "DIV" && C !== "none" && this.result.push({ url: C, index: v, status: g }), !1);
    });
    const j = ({
      resolve: d = (y) => console.log(y),
      reject: v = (y) => console.log(y)
    }) => {
      if (this.result.length === 0) {
        l && (a.style.display = S), d({ total: 0, loaded: 0 });
        return;
      }
      const y = this.result[this.index], T = this.result.length, { url: m, index: C } = y;
      y.status = x.loading;
      const g = new Image();
      g.onload = () => {
        y.status = x.loaded;
        const R = this.result.filter((P) => P.status === x.loaded).length;
        T === R ? (l && (a.style.display = S), requestAnimationFrame(() => d({ url: m, total: T, loaded: R, index: C }))) : (E({ url: m, total: T, loaded: R, index: C }), this.index++, j({ resolve: d, reject: v }));
      }, g.src = m;
    };
    return new Promise((d, v) => {
      j({ resolve: d, reject: v });
    });
  }
  getStyle(a, _) {
    let h;
    const E = a.ownerDocument.defaultView;
    return E && E.getComputedStyle ? (_ = _.replace(/([A-Z])/g, "-$1").toLowerCase(), E.getComputedStyle(a, null).getPropertyValue(_)) : a.currentStyle ? (_ = _.replace(/\-(\w)/g, function(l, S) {
      return S.toUpperCase();
    }), h = a.currentStyle[_], h) : "";
  }
}
var L = { exports: {} }, o = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var G;
function tt() {
  if (G) return o;
  G = 1;
  var p = Symbol.for("react.transitional.element"), a = Symbol.for("react.portal"), _ = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), l = Symbol.for("react.consumer"), S = Symbol.for("react.context"), $ = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), d = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), y = Symbol.iterator;
  function T(t) {
    return t === null || typeof t != "object" ? null : (t = y && t[y] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var m = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, C = Object.assign, g = {};
  function R(t, e, r) {
    this.props = t, this.context = e, this.refs = g, this.updater = r || m;
  }
  R.prototype.isReactComponent = {}, R.prototype.setState = function(t, e) {
    if (typeof t != "object" && typeof t != "function" && t != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, t, e, "setState");
  }, R.prototype.forceUpdate = function(t) {
    this.updater.enqueueForceUpdate(this, t, "forceUpdate");
  };
  function P() {
  }
  P.prototype = R.prototype;
  function N(t, e, r) {
    this.props = t, this.context = e, this.refs = g, this.updater = r || m;
  }
  var I = N.prototype = new P();
  I.constructor = N, C(I, R.prototype), I.isPureReactComponent = !0;
  var Y = Array.isArray, i = { H: null, A: null, T: null, S: null, V: null }, b = Object.prototype.hasOwnProperty;
  function M(t, e, r, n, s, f) {
    return r = f.ref, {
      $$typeof: p,
      type: t,
      key: e,
      ref: r !== void 0 ? r : null,
      props: f
    };
  }
  function W(t, e) {
    return M(
      t.type,
      e,
      void 0,
      void 0,
      void 0,
      t.props
    );
  }
  function U(t) {
    return typeof t == "object" && t !== null && t.$$typeof === p;
  }
  function Z(t) {
    var e = { "=": "=0", ":": "=2" };
    return "$" + t.replace(/[=:]/g, function(r) {
      return e[r];
    });
  }
  var D = /\/+/g;
  function k(t, e) {
    return typeof t == "object" && t !== null && t.key != null ? Z("" + t.key) : e.toString(36);
  }
  function q() {
  }
  function Q(t) {
    switch (t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw t.reason;
      default:
        switch (typeof t.status == "string" ? t.then(q, q) : (t.status = "pending", t.then(
          function(e) {
            t.status === "pending" && (t.status = "fulfilled", t.value = e);
          },
          function(e) {
            t.status === "pending" && (t.status = "rejected", t.reason = e);
          }
        )), t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw t.reason;
        }
    }
    throw t;
  }
  function A(t, e, r, n, s) {
    var f = typeof t;
    (f === "undefined" || f === "boolean") && (t = null);
    var u = !1;
    if (t === null) u = !0;
    else
      switch (f) {
        case "bigint":
        case "string":
        case "number":
          u = !0;
          break;
        case "object":
          switch (t.$$typeof) {
            case p:
            case a:
              u = !0;
              break;
            case v:
              return u = t._init, A(
                u(t._payload),
                e,
                r,
                n,
                s
              );
          }
      }
    if (u)
      return s = s(t), u = n === "" ? "." + k(t, 0) : n, Y(s) ? (r = "", u != null && (r = u.replace(D, "$&/") + "/"), A(s, e, r, "", function(J) {
        return J;
      })) : s != null && (U(s) && (s = W(
        s,
        r + (s.key == null || t && t.key === s.key ? "" : ("" + s.key).replace(
          D,
          "$&/"
        ) + "/") + u
      )), e.push(s)), 1;
    u = 0;
    var w = n === "" ? "." : n + ":";
    if (Y(t))
      for (var c = 0; c < t.length; c++)
        n = t[c], f = w + k(n, c), u += A(
          n,
          e,
          r,
          f,
          s
        );
    else if (c = T(t), typeof c == "function")
      for (t = c.call(t), c = 0; !(n = t.next()).done; )
        n = n.value, f = w + k(n, c++), u += A(
          n,
          e,
          r,
          f,
          s
        );
    else if (f === "object") {
      if (typeof t.then == "function")
        return A(
          Q(t),
          e,
          r,
          n,
          s
        );
      throw e = String(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return u;
  }
  function O(t, e, r) {
    if (t == null) return t;
    var n = [], s = 0;
    return A(t, n, "", "", function(f) {
      return e.call(r, f, s++);
    }), n;
  }
  function V(t) {
    if (t._status === -1) {
      var e = t._result;
      e = e(), e.then(
        function(r) {
          (t._status === 0 || t._status === -1) && (t._status = 1, t._result = r);
        },
        function(r) {
          (t._status === 0 || t._status === -1) && (t._status = 2, t._result = r);
        }
      ), t._status === -1 && (t._status = 0, t._result = e);
    }
    if (t._status === 1) return t._result.default;
    throw t._result;
  }
  var z = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  function X() {
  }
  return o.Children = {
    map: O,
    forEach: function(t, e, r) {
      O(
        t,
        function() {
          e.apply(this, arguments);
        },
        r
      );
    },
    count: function(t) {
      var e = 0;
      return O(t, function() {
        e++;
      }), e;
    },
    toArray: function(t) {
      return O(t, function(e) {
        return e;
      }) || [];
    },
    only: function(t) {
      if (!U(t))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return t;
    }
  }, o.Component = R, o.Fragment = _, o.Profiler = E, o.PureComponent = N, o.StrictMode = h, o.Suspense = j, o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, o.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(t) {
      return i.H.useMemoCache(t);
    }
  }, o.cache = function(t) {
    return function() {
      return t.apply(null, arguments);
    };
  }, o.cloneElement = function(t, e, r) {
    if (t == null)
      throw Error(
        "The argument must be a React element, but you passed " + t + "."
      );
    var n = C({}, t.props), s = t.key, f = void 0;
    if (e != null)
      for (u in e.ref !== void 0 && (f = void 0), e.key !== void 0 && (s = "" + e.key), e)
        !b.call(e, u) || u === "key" || u === "__self" || u === "__source" || u === "ref" && e.ref === void 0 || (n[u] = e[u]);
    var u = arguments.length - 2;
    if (u === 1) n.children = r;
    else if (1 < u) {
      for (var w = Array(u), c = 0; c < u; c++)
        w[c] = arguments[c + 2];
      n.children = w;
    }
    return M(t.type, s, void 0, void 0, f, n);
  }, o.createContext = function(t) {
    return t = {
      $$typeof: S,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, t.Provider = t, t.Consumer = {
      $$typeof: l,
      _context: t
    }, t;
  }, o.createElement = function(t, e, r) {
    var n, s = {}, f = null;
    if (e != null)
      for (n in e.key !== void 0 && (f = "" + e.key), e)
        b.call(e, n) && n !== "key" && n !== "__self" && n !== "__source" && (s[n] = e[n]);
    var u = arguments.length - 2;
    if (u === 1) s.children = r;
    else if (1 < u) {
      for (var w = Array(u), c = 0; c < u; c++)
        w[c] = arguments[c + 2];
      s.children = w;
    }
    if (t && t.defaultProps)
      for (n in u = t.defaultProps, u)
        s[n] === void 0 && (s[n] = u[n]);
    return M(t, f, void 0, void 0, null, s);
  }, o.createRef = function() {
    return { current: null };
  }, o.forwardRef = function(t) {
    return { $$typeof: $, render: t };
  }, o.isValidElement = U, o.lazy = function(t) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: t },
      _init: V
    };
  }, o.memo = function(t, e) {
    return {
      $$typeof: d,
      type: t,
      compare: e === void 0 ? null : e
    };
  }, o.startTransition = function(t) {
    var e = i.T, r = {};
    i.T = r;
    try {
      var n = t(), s = i.S;
      s !== null && s(r, n), typeof n == "object" && n !== null && typeof n.then == "function" && n.then(X, z);
    } catch (f) {
      z(f);
    } finally {
      i.T = e;
    }
  }, o.unstable_useCacheRefresh = function() {
    return i.H.useCacheRefresh();
  }, o.use = function(t) {
    return i.H.use(t);
  }, o.useActionState = function(t, e, r) {
    return i.H.useActionState(t, e, r);
  }, o.useCallback = function(t, e) {
    return i.H.useCallback(t, e);
  }, o.useContext = function(t) {
    return i.H.useContext(t);
  }, o.useDebugValue = function() {
  }, o.useDeferredValue = function(t, e) {
    return i.H.useDeferredValue(t, e);
  }, o.useEffect = function(t, e, r) {
    var n = i.H;
    if (typeof r == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return n.useEffect(t, e);
  }, o.useId = function() {
    return i.H.useId();
  }, o.useImperativeHandle = function(t, e, r) {
    return i.H.useImperativeHandle(t, e, r);
  }, o.useInsertionEffect = function(t, e) {
    return i.H.useInsertionEffect(t, e);
  }, o.useLayoutEffect = function(t, e) {
    return i.H.useLayoutEffect(t, e);
  }, o.useMemo = function(t, e) {
    return i.H.useMemo(t, e);
  }, o.useOptimistic = function(t, e) {
    return i.H.useOptimistic(t, e);
  }, o.useReducer = function(t, e, r) {
    return i.H.useReducer(t, e, r);
  }, o.useRef = function(t) {
    return i.H.useRef(t);
  }, o.useState = function(t) {
    return i.H.useState(t);
  }, o.useSyncExternalStore = function(t, e, r) {
    return i.H.useSyncExternalStore(
      t,
      e,
      r
    );
  }, o.useTransition = function() {
    return i.H.useTransition();
  }, o.version = "19.1.1", o;
}
var K;
function et() {
  return K || (K = 1, L.exports = tt()), L.exports;
}
var H = et();
const rt = ({
  children: p,
  hideBeforeLoaded: a = !0,
  onStep: _ = () => {
  },
  onload: h = () => {
  }
}) => {
  const E = H.useRef(null);
  return H.useEffect(() => {
    E.current && new F().load(E.current, { hideBeforeLoaded: a, onUpdate: (l) => _?.(l) }).then((l) => {
      h?.(l);
    });
  }, []), H.Children.map(p, (l) => !l || typeof l != "object" || !("props" in l) ? l : H.cloneElement(l, { ...l.props, ref: E }));
};
export {
  rt as default
};

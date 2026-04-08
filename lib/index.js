import { useRef as S, useEffect as b, Children as V, cloneElement as k } from "react";
var y = /* @__PURE__ */ ((o) => (o[o.unload = 0] = "unload", o[o.loading = 1] = "loading", o[o.loaded = 2] = "loaded", o))(y || {});
const x = {
  hideBeforeLoaded: !0,
  onUpdate: (o) => {
  }
};
class v {
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
  load(t, l = x) {
    if (!t)
      return new Promise((r) => {
        r({ total: 0, loaded: 0 });
      });
    const c = { ...x, ...l }, { onUpdate: n, hideBeforeLoaded: e } = c, f = this.getStyle(t, "display") === "flex" ? "flex" : "block";
    e && (t.style.display = "none");
    var w = Array.from(t.querySelectorAll("*"));
    [t, ...w].forEach((r, a) => {
      const s = r.tagName, g = r.getAttribute("src"), u = this.getStyle(r, "background-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), h = this.getStyle(r, "-webkit-mask-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), p = window.getComputedStyle(r, "::before").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), d = window.getComputedStyle(r, "::after").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), i = y.unload;
      s === "IMG" && g && this.result.push({ url: g, index: a, status: i }), s === "DIV" && u !== "none" && (u.includes("gradient") || this.result.push({ url: u, index: a, status: i })), s === "DIV" && h !== "none" && this.result.push({ url: h, index: a, status: i }), s === "DIV" && p !== "none" && (p.includes("gradient") || this.result.push({ url: p, index: a, status: i })), s === "DIV" && d !== "none" && (d.includes("gradient") || this.result.push({ url: d, index: a, status: i }));
    });
    const m = ({
      resolve: r = (s) => console.log(s),
      reject: a = (s) => console.log(s)
    }) => {
      if (this.result.length === 0) {
        e && (t.style.display = f), r({ total: 0, loaded: 0 });
        return;
      }
      const s = this.result[this.index], g = this.result.length, { url: u, index: h } = s;
      s.status = y.loading;
      const p = new Image();
      p.onload = () => {
        s.status = y.loaded;
        const d = this.result.filter((i) => i.status === y.loaded).length;
        g === d ? (e && (t.style.display = f), requestAnimationFrame(() => r({ url: u, total: g, loaded: d, index: h }))) : (n({ url: u, total: g, loaded: d, index: h }), this.index++, m({ resolve: r, reject: a }));
      }, p.src = u;
    };
    return new Promise((r, a) => {
      m({ resolve: r, reject: a });
    });
  }
  getStyle(t, l) {
    let c;
    const n = t.ownerDocument.defaultView;
    return n && n.getComputedStyle ? (l = l.replace(/([A-Z])/g, "-$1").toLowerCase(), n.getComputedStyle(t, null).getPropertyValue(l)) : t.currentStyle ? (l = l.replace(/\-(\w)/g, function(e, f) {
      return f.toUpperCase();
    }), c = t.currentStyle[l], c) : "";
  }
}
const I = ({ children: o, hideBeforeLoaded: t = !0, onStep: l, onload: c }) => {
  const n = S(void 0);
  return b(() => {
    n && n.current && new v().load(n.current, {
      hideBeforeLoaded: t,
      onUpdate: (e) => {
        console.log(e), l?.(e);
      }
    }).then((e) => c?.(e));
  }, []), V.map(
    o,
    (e) => (
      // Ensure child is a valid React element before spreading props
      e && typeof e == "object" && "props" in e ? k(e, { ...e.props, ref: n }) : e
    )
  );
};
export {
  I as default
};

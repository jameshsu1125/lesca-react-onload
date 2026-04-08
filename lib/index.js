import { useRef as b, useEffect as C, Children as V, cloneElement as k } from "react";
var f = /* @__PURE__ */ ((l) => (l[l.unload = 0] = "unload", l[l.loading = 1] = "loading", l[l.loaded = 2] = "loaded", l))(f || {});
const x = {
  hideBeforeLoaded: !0,
  onUpdate: (l) => {
  },
  onStart: (l) => {
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
  load(r, s = x) {
    if (!r)
      return new Promise((t) => {
        t({ total: 0, loaded: 0 });
      });
    const g = { ...x, ...s }, { onUpdate: u, onStart: m, hideBeforeLoaded: n } = g, e = this.getStyle(r, "display") === "flex" ? "flex" : "block";
    n && (r.style.display = "none");
    var w = Array.from(r.querySelectorAll("*"));
    [r, ...w].forEach((t, a) => {
      const o = t.tagName, p = t.getAttribute("src"), d = this.getStyle(t, "background-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), y = this.getStyle(t, "-webkit-mask-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), h = window.getComputedStyle(t, "::before").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), i = window.getComputedStyle(t, "::after").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), c = f.unload;
      o === "IMG" && p && this.result.push({ url: p, index: a, status: c }), o === "DIV" && d !== "none" && (d.includes("gradient") || this.result.push({ url: d, index: a, status: c })), o === "DIV" && y !== "none" && this.result.push({ url: y, index: a, status: c }), o === "DIV" && h !== "none" && (h.includes("gradient") || this.result.push({ url: h, index: a, status: c })), o === "DIV" && i !== "none" && (i.includes("gradient") || this.result.push({ url: i, index: a, status: c }));
    }), m({ total: this.result.length, loaded: 0, urls: this.result.map((t) => t.url) });
    const S = ({
      resolve: t = (o) => console.log(o),
      reject: a = (o) => console.log(o)
    }) => {
      if (this.result.length === 0) {
        n && (r.style.display = e), t({ total: 0, loaded: 0 });
        return;
      }
      const o = this.result[this.index], p = this.result.length, { url: d, index: y } = o;
      o.status = f.loading;
      const h = new Image();
      h.onload = () => {
        o.status = f.loaded;
        const i = this.result.filter((c) => c.status === f.loaded).length;
        p === i ? (n && (r.style.display = e), requestAnimationFrame(() => t({ url: d, total: p, loaded: i, index: y }))) : (u({ url: d, total: p, loaded: i, index: y }), this.index++, S({ resolve: t, reject: a }));
      }, h.src = d;
    };
    return new Promise((t, a) => {
      S({ resolve: t, reject: a });
    });
  }
  getStyle(r, s) {
    let g;
    const u = r.ownerDocument.defaultView;
    return u && u.getComputedStyle ? (s = s.replace(/([A-Z])/g, "-$1").toLowerCase(), u.getComputedStyle(r, null).getPropertyValue(s)) : r.currentStyle ? (s = s.replace(/\-(\w)/g, function(m, n) {
      return n.toUpperCase();
    }), g = r.currentStyle[s], g) : "";
  }
}
const P = (l) => {
  const { children: r, hideBeforeLoaded: s = !0, onStep: g, onload: u, onStart: m } = l, n = b(void 0);
  return C(() => {
    n && n.current && (m?.(), new v().load(n.current, {
      hideBeforeLoaded: s,
      onStart: (e) => {
        console.log(e);
      },
      onUpdate: (e) => {
        console.log(e), g?.(e);
      }
    }).then((e) => u?.(e)));
  }, []), V.map(
    r,
    (e) => (
      // Ensure child is a valid React element before spreading props
      e && typeof e == "object" && "props" in e ? k(e, { ...e.props, ref: n }) : e
    )
  );
};
export {
  P as default
};

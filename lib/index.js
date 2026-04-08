import { useRef as b, useEffect as C, Children as V, cloneElement as k } from "react";
var f = /* @__PURE__ */ ((s) => (s[s.unload = 0] = "unload", s[s.loading = 1] = "loading", s[s.loaded = 2] = "loaded", s))(f || {});
const x = {
  hideBeforeLoaded: !0,
  onUpdate: (s) => {
  },
  onStart: (s) => {
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
  load(r, l = x) {
    if (!r)
      return new Promise((e) => {
        e({ total: 0, loaded: 0 });
      });
    const g = { ...x, ...l }, { onUpdate: u, onStart: m, hideBeforeLoaded: n } = g, t = this.getStyle(r, "display") === "flex" ? "flex" : "block";
    n && (r.style.display = "none");
    var w = Array.from(r.querySelectorAll("*"));
    [r, ...w].forEach((e, a) => {
      const o = e.tagName, p = e.getAttribute("src"), d = this.getStyle(e, "background-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), y = this.getStyle(e, "-webkit-mask-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), h = window.getComputedStyle(e, "::before").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), i = window.getComputedStyle(e, "::after").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), c = f.unload;
      o === "IMG" && p && this.result.push({ url: p, index: a, status: c }), o === "DIV" && d !== "none" && (d.includes("gradient") || this.result.push({ url: d, index: a, status: c })), o === "DIV" && y !== "none" && this.result.push({ url: y, index: a, status: c }), o === "DIV" && h !== "none" && (h.includes("gradient") || this.result.push({ url: h, index: a, status: c })), o === "DIV" && i !== "none" && (i.includes("gradient") || this.result.push({ url: i, index: a, status: c }));
    }), m({ total: this.result.length, loaded: 0, urls: this.result.map((e) => e.url) });
    const S = ({
      resolve: e = (o) => console.log(o),
      reject: a = (o) => console.log(o)
    }) => {
      if (this.result.length === 0) {
        n && (r.style.display = t), e({ total: 0, loaded: 0 });
        return;
      }
      const o = this.result[this.index], p = this.result.length, { url: d, index: y } = o;
      o.status = f.loading;
      const h = new Image();
      h.onload = () => {
        o.status = f.loaded;
        const i = this.result.filter((c) => c.status === f.loaded).length;
        p === i ? (n && (r.style.display = t), requestAnimationFrame(() => e({ url: d, total: p, loaded: i, index: y }))) : (u({ url: d, total: p, loaded: i, index: y }), this.index++, S({ resolve: e, reject: a }));
      }, h.src = d;
    };
    return new Promise((e, a) => {
      S({ resolve: e, reject: a });
    });
  }
  getStyle(r, l) {
    let g;
    const u = r.ownerDocument.defaultView;
    return u && u.getComputedStyle ? (l = l.replace(/([A-Z])/g, "-$1").toLowerCase(), u.getComputedStyle(r, null).getPropertyValue(l)) : r.currentStyle ? (l = l.replace(/\-(\w)/g, function(m, n) {
      return n.toUpperCase();
    }), g = r.currentStyle[l], g) : "";
  }
}
const P = (s) => {
  const { children: r, hideBeforeLoaded: l = !0, onStep: g, onload: u, onStart: m } = s, n = b(void 0);
  return C(() => {
    n && n.current && new v().load(n.current, {
      hideBeforeLoaded: l,
      onStart: (t) => {
        m?.(t);
      },
      onUpdate: (t) => {
        g?.(t);
      }
    }).then((t) => u?.(t));
  }, []), V.map(
    r,
    (t) => (
      // Ensure child is a valid React element before spreading props
      t && typeof t == "object" && "props" in t ? k(t, { ...t.props, ref: n }) : t
    )
  );
};
export {
  P as default
};

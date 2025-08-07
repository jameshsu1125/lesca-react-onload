import { useRef as S, useEffect as v, Children as b, cloneElement as A } from "react";
var p = /* @__PURE__ */ ((l) => (l[l.unload = 0] = "unload", l[l.loading = 1] = "loading", l[l.loaded = 2] = "loaded", l))(p || {});
const m = {
  hideBeforeLoaded: !0,
  onUpdate: (l) => {
  }
};
class C {
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
  load(t, s = m) {
    if (!t)
      return new Promise((r) => {
        r({ total: 0, loaded: 0 });
      });
    const d = { ...m, ...s }, { onUpdate: n, hideBeforeLoaded: e } = d, f = this.getStyle(t, "display") === "flex" ? "flex" : "block";
    e && (t.style.display = "none");
    var x = Array.from(t.querySelectorAll("*"));
    [t, ...x].forEach((r, a) => {
      const o = r.tagName, i = r.getAttribute("src"), u = this.getStyle(r, "background-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), g = this.getStyle(r, "-webkit-mask-image").replace(
        /url\((['"])?(.*?)\1\)/gi,
        "$2"
      ), c = p.unload;
      return o === "IMG" && i ? (this.result.push({ url: i, index: a, status: c }), !0) : o === "DIV" && u !== "none" ? (u.includes("gradient") || this.result.push({ url: u, index: a, status: c }), !0) : (o === "DIV" && g !== "none" && this.result.push({ url: g, index: a, status: c }), !1);
    });
    const y = ({
      resolve: r = (o) => console.log(o),
      reject: a = (o) => console.log(o)
    }) => {
      if (this.result.length === 0) {
        e && (t.style.display = f), r({ total: 0, loaded: 0 });
        return;
      }
      const o = this.result[this.index], i = this.result.length, { url: u, index: g } = o;
      o.status = p.loading;
      const c = new Image();
      c.onload = () => {
        o.status = p.loaded;
        const h = this.result.filter((w) => w.status === p.loaded).length;
        i === h ? (e && (t.style.display = f), requestAnimationFrame(() => r({ url: u, total: i, loaded: h, index: g }))) : (n({ url: u, total: i, loaded: h, index: g }), this.index++, y({ resolve: r, reject: a }));
      }, c.src = u;
    };
    return new Promise((r, a) => {
      y({ resolve: r, reject: a });
    });
  }
  getStyle(t, s) {
    let d;
    const n = t.ownerDocument.defaultView;
    return n && n.getComputedStyle ? (s = s.replace(/([A-Z])/g, "-$1").toLowerCase(), n.getComputedStyle(t, null).getPropertyValue(s)) : t.currentStyle ? (s = s.replace(/\-(\w)/g, function(e, f) {
      return f.toUpperCase();
    }), d = t.currentStyle[s], d) : "";
  }
}
const k = ({ children: l, hideBeforeLoaded: t = !0, onStep: s, onload: d }) => {
  const n = S(void 0);
  return v(() => {
    n && n.current && new C().load(n.current, {
      hideBeforeLoaded: t,
      onUpdate: (e) => s?.(e)
    }).then((e) => d?.(e));
  }, []), b.map(
    l,
    (e) => (
      // Ensure child is a valid React element before spreading props
      e && typeof e == "object" && "props" in e ? A(e, { ...e.props, ref: n }) : e
    )
  );
};
export {
  k as default
};

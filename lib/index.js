import { cloneElement as e, isValidElement as t, useCallback as n, useEffect as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
// node_modules/lesca-image-onload/lib/index.js
var s = /* @__PURE__ */ function(e) {
	return e[e.unload = 0] = "unload", e[e.loading = 1] = "loading", e[e.loaded = 2] = "loaded", e;
}({}), c = {
	onUpdate: (e) => {
		Date.now() < 100 && console.log(e);
	},
	onStart: (e) => {
		Date.now() < 100 && console.log(e);
	}
}, l = class {
	index;
	result;
	target = null;
	hideBeforeLoaded = !0;
	constructor(e, t) {
		this.target = e, t !== void 0 && (this.hideBeforeLoaded = t), this.index = 0, this.result = [];
	}
	load(e = c) {
		if (!this.target) return new Promise((e) => {
			e({
				total: 0,
				loaded: 0
			});
		});
		let { onUpdate: t, onStart: n, hideBeforeLoaded: r } = {
			...c,
			...e
		}, i = this.getStyle(this.target, "display") === "flex" ? "flex" : "block";
		r && (this.target.style.display = "none");
		let a = Array.from(this.target.querySelectorAll("*"));
		[this.target, ...a].forEach((e, t) => {
			let n = e.tagName, r = e.getAttribute("src"), i = this.getStyle(e, "background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), a = this.getStyle(e, "-webkit-mask-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), o = window.getComputedStyle(e, "::before").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), c = window.getComputedStyle(e, "::after").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), l = s.unload;
			n === "IMG" && r && this.result.push({
				url: r,
				index: t,
				status: l
			}), n === "DIV" && i !== "none" && (i.includes("gradient") || this.result.push({
				url: i,
				index: t,
				status: l
			})), n === "DIV" && a !== "none" && this.result.push({
				url: a,
				index: t,
				status: l
			}), n === "DIV" && o !== "none" && (o.includes("gradient") || this.result.push({
				url: o,
				index: t,
				status: l
			})), n === "DIV" && c !== "none" && (c.includes("gradient") || this.result.push({
				url: c,
				index: t,
				status: l
			}));
		}), n({
			total: this.result.length,
			loaded: 0,
			urls: this.result.map((e) => e.url)
		});
		let o = ({ resolve: e = (e) => console.log(e), reject: n = (e) => console.log(e) }) => {
			if (this.result.length === 0) {
				this.hideBeforeLoaded && this.target && (this.target.style.display = i), e({
					total: 0,
					loaded: 0
				});
				return;
			}
			let r = this.result[this.index], a = this.result.length, { url: c, index: l } = r;
			r.status = s.loading;
			let u = new Image();
			u.onload = () => {
				r.status = s.loaded;
				let u = this.result.filter((e) => e.status === s.loaded).length;
				a === u ? (this.hideBeforeLoaded && this.target && (this.target.style.display = i), requestAnimationFrame(() => e({
					url: c,
					total: a,
					loaded: u,
					index: l
				}))) : (t({
					url: c,
					total: a,
					loaded: u,
					index: l
				}), this.index++, o({
					resolve: e,
					reject: n
				}));
			}, u.src = c;
		};
		return new Promise((e, t) => {
			o({
				resolve: e,
				reject: t
			});
		});
	}
	getStyle(e, t) {
		let n, r = e.ownerDocument.defaultView;
		return r && r.getComputedStyle ? (t = t.replace(/([A-Z])/g, "-$1").toLowerCase(), r.getComputedStyle(e, null).getPropertyValue(t)) : e.currentStyle ? (t = t.replace(/\-(\w)/g, function(e, t) {
			return t.toUpperCase();
		}), n = e.currentStyle[t], n) : "";
	}
}, u = (e, t) => {
	typeof e == "function" ? e(t) : e && (e.current = t);
}, d = (s) => {
	let { children: c, hideBeforeLoaded: d = !0 } = s, [f, p] = o(null), m = a(s);
	i(() => {
		m.current = s;
	});
	let h = t(c) ? c.props.ref : void 0, g = n((e) => {
		p(e), u(h, e);
	}, [h]);
	return r(() => {
		if (!f) return;
		let e = !1, t = new l(f, d), n = requestAnimationFrame(() => {
			t.load({
				hideBeforeLoaded: d,
				onStart: (t) => {
					e || m.current.onStart?.(t);
				},
				onUpdate: (t) => {
					e || m.current.onStep?.(t);
				}
			}).then((t) => {
				e || m.current.onload?.(t);
			});
		});
		return () => {
			e = !0, cancelAnimationFrame(n);
		};
	}, [f]), t(c) ? e(c, { ref: g }) : c;
};
export { d as default };

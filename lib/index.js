import { Children as e, cloneElement as t, useEffect as n, useRef as r } from "react";
//#region node_modules/lesca-image-onload/lib/index.js
var i = /* @__PURE__ */ function(e) {
	return e[e.unload = 0] = "unload", e[e.loading = 1] = "loading", e[e.loaded = 2] = "loaded", e;
}({}), a = {
	onUpdate: (e) => {
		Date.now() < 100 && console.log(e);
	},
	onStart: (e) => {
		Date.now() < 100 && console.log(e);
	}
}, o = class {
	index;
	result;
	target = null;
	hideBeforeLoaded = !0;
	constructor(e, t) {
		this.target = e, t !== void 0 && (this.hideBeforeLoaded = t), this.index = 0, this.result = [];
	}
	load(e = a) {
		if (!this.target) return new Promise((e) => {
			e({
				total: 0,
				loaded: 0
			});
		});
		let { onUpdate: t, onStart: n, hideBeforeLoaded: r } = {
			...a,
			...e
		}, o = this.getStyle(this.target, "display") === "flex" ? "flex" : "block";
		r && (this.target.style.display = "none");
		let s = Array.from(this.target.querySelectorAll("*"));
		[this.target, ...s].forEach((e, t) => {
			let n = e.tagName, r = e.getAttribute("src"), a = this.getStyle(e, "background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), o = this.getStyle(e, "-webkit-mask-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), s = window.getComputedStyle(e, "::before").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), c = window.getComputedStyle(e, "::after").getPropertyValue("background-image").replace(/url\((['"])?(.*?)\1\)/gi, "$2"), l = i.unload;
			n === "IMG" && r && this.result.push({
				url: r,
				index: t,
				status: l
			}), n === "DIV" && a !== "none" && (a.includes("gradient") || this.result.push({
				url: a,
				index: t,
				status: l
			})), n === "DIV" && o !== "none" && this.result.push({
				url: o,
				index: t,
				status: l
			}), n === "DIV" && s !== "none" && (s.includes("gradient") || this.result.push({
				url: s,
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
		let c = ({ resolve: e = (e) => console.log(e), reject: n = (e) => console.log(e) }) => {
			if (this.result.length === 0) {
				this.hideBeforeLoaded && this.target && (this.target.style.display = o), e({
					total: 0,
					loaded: 0
				});
				return;
			}
			let r = this.result[this.index], a = this.result.length, { url: s, index: l } = r;
			r.status = i.loading;
			let u = new Image();
			u.onload = () => {
				r.status = i.loaded;
				let u = this.result.filter((e) => e.status === i.loaded).length;
				a === u ? (this.hideBeforeLoaded && this.target && (this.target.style.display = o), requestAnimationFrame(() => e({
					url: s,
					total: a,
					loaded: u,
					index: l
				}))) : (t({
					url: s,
					total: a,
					loaded: u,
					index: l
				}), this.index++, c({
					resolve: e,
					reject: n
				}));
			}, u.src = s;
		};
		return new Promise((e, t) => {
			c({
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
}, s = (i) => {
	let { children: a, hideBeforeLoaded: s = !0, onStep: c, onload: l, onStart: u } = i, d = r(void 0);
	return n(() => {
		if (d && d.current) {
			let e = new o(d.current);
			requestAnimationFrame(() => {
				e.load({
					hideBeforeLoaded: s,
					onStart: (e) => {
						u?.(e);
					},
					onUpdate: (e) => {
						c?.(e);
					}
				}).then((e) => l?.(e));
			});
		}
	}, []), e.map(a, (e) => e && typeof e == "object" && "props" in e ? t(e, {
		...e.props,
		ref: d
	}) : e);
};
//#endregion
export { s as default };

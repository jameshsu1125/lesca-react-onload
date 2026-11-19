import { cloneElement as e, isValidElement as t, useCallback as n, useEffect as r, useLayoutEffect as i, useRef as a, useState as o } from "react";
// src/loader.ts
var s = "[lesca-react-onload]", c = /url\((['"]?)(.*?)\1\)/gi, l = (e) => Array.from(e.matchAll(c), (e) => e[2]).filter(Boolean), u = (e, t, n) => {
	try {
		return window.getComputedStyle(e, n).getPropertyValue(t);
	} catch {
		return "";
	}
}, d = (e) => {
	let t = [];
	return [e, ...Array.from(e.querySelectorAll("*"))].forEach((e, n) => {
		let r = [], i = e.tagName === "IMG" ? e.getAttribute("src") : null;
		i && r.push(i), [
			"background-image",
			"-webkit-mask-image",
			"mask-image"
		].forEach((t) => r.push(...l(u(e, t)))), ["::before", "::after"].forEach((t) => r.push(...l(u(e, "background-image", t)))), r.forEach((e) => t.push({
			url: e,
			index: n
		}));
	}), t;
}, f = (e) => new Promise((t) => {
	let n = new Image();
	n.onload = () => t(!0), n.onerror = () => {
		console.warn(`${s} Failed to load image: ${e}`), t(!1);
	}, n.src = e;
}), p = (e, t = {}) => {
	let { hideBeforeLoaded: n = !0, onStart: r, onUpdate: i } = t, a = e.style.display;
	n && (e.style.display = "none");
	let o = () => {
		n && (e.style.display = a);
	}, s = d(e), c = s.length;
	return r?.({
		total: c,
		loaded: 0,
		urls: s.map((e) => e.url)
	}), c === 0 ? (o(), Promise.resolve({
		total: 0,
		loaded: 0,
		failed: []
	})) : (async () => {
		let e = /* @__PURE__ */ new Map(), t = [], n = 0;
		for (let { url: r, index: a } of s) {
			let s = e.get(r);
			s === void 0 && (s = await f(r), e.set(r, s)), n++, !s && !t.includes(r) && t.push(r);
			let l = {
				total: c,
				loaded: n,
				index: a,
				url: r,
				failed: [...t]
			};
			if (n === c) return o(), await new Promise((e) => requestAnimationFrame(e)), l;
			i?.(l);
		}
		return o(), {
			total: c,
			loaded: n,
			failed: [...t]
		};
	})();
}, m = (e, t) => {
	typeof e == "function" ? e(t) : e && (e.current = t);
}, h = (s) => {
	let { children: c, hideBeforeLoaded: l = !0 } = s, [u, d] = o(null), f = a(s);
	i(() => {
		f.current = s;
	});
	let h = t(c) ? c.props.ref : void 0, g = n((e) => {
		d(e), m(h, e);
	}, [h]);
	return r(() => {
		if (!u) return;
		let e = !1, t = requestAnimationFrame(() => {
			p(u, {
				hideBeforeLoaded: l,
				onStart: (t) => {
					e || f.current.onStart?.(t);
				},
				onUpdate: (t) => {
					e || f.current.onStep?.(t);
				}
			}).then((t) => {
				e || f.current.onload?.(t);
			});
		});
		return () => {
			e = !0, cancelAnimationFrame(t);
		};
	}, [u]), t(c) ? e(c, { ref: g }) : c;
};
export { h as default };

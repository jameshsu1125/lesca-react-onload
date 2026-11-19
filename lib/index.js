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
}, f = (e) => {
	let t = e.style.display;
	return e.style.display = "none", () => {
		e.style.display = t;
	};
}, p = (e) => new Promise((t) => {
	let n = new Image();
	n.onload = () => t(!0), n.onerror = () => {
		console.warn(`${s} Failed to load image: ${e}`), t(!1);
	}, n.src = e;
}), m = (e, t = {}) => {
	let { hideBeforeLoaded: n = !0, onStart: r, onUpdate: i } = t, a = n ? f(e) : void 0, o = () => a?.(), s = d(e), c = s.length;
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
			s === void 0 && (s = await p(r), e.set(r, s)), n++, !s && !t.includes(r) && t.push(r);
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
}, h = (e, t) => {
	typeof e == "function" ? e(t) : e && (e.current = t);
}, g = (s) => {
	let { children: c, hideBeforeLoaded: l = !0 } = s, [u, d] = o(null), p = a(void 0), g = a(s);
	i(() => {
		g.current = s;
	});
	let _ = t(c) ? c.props.ref : void 0, v = n((e) => {
		d(e), h(_, e);
	}, [_]);
	return i(() => {
		if (!u || !l) return;
		let e = f(u);
		return p.current = e, () => {
			p.current = void 0, e();
		};
	}, [u]), r(() => {
		if (!u) return;
		let e = !1, t = requestAnimationFrame(() => {
			m(u, {
				hideBeforeLoaded: !1,
				onStart: (t) => {
					e || g.current.onStart?.(t);
				},
				onUpdate: (t) => {
					e || g.current.onStep?.(t);
				}
			}).then((t) => {
				e || (p.current?.(), g.current.onload?.(t));
			});
		});
		return () => {
			e = !0, cancelAnimationFrame(t);
		};
	}, [u]), t(c) ? e(c, { ref: v }) : c;
};
export { g as default };

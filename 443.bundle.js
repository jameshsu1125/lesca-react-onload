(self.webpackChunklesca_react_onload=self.webpackChunklesca_react_onload||[]).push([[443],{835:function(e,t,n){var r,o,a=this&&this.__assign||function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)};r=[n,t,n(893),n(294),n(638)],o=function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=(0,r.memo)((function(e){var t=e.children;return(0,r.useEffect)((function(){}),[]),(0,n.jsx)("div",a({className:"border-l-8 pl-3 border-primary-focus my-5 text-2xl capitalize"},{children:t}))}));t.default=o}.apply(t,r),void 0===o||(e.exports=o)},681:function(e,t,n){var r,o,a=this&&this.__assign||function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};r=[n,t,n(893),n(294),n(872),n(835)],o=function(e,t,n,r,o,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),o=l(o),i=l(i);var s=function(){var e=(0,r.useState)(0),t=e[0],l=e[1],i=(0,r.useState)(""),s=i[0],u=i[1];return(0,n.jsxs)("div",a({className:"my-4"},{children:[(0,n.jsx)(o.default,a({onStep:function(e){var t=e.total,n=e.loaded,r=e.url;l(Math.floor(n/t*100)),u("target: ".concat(r," was loaded."))},onload:function(e){var t=e.total,n=e.loaded;e.url,l(Math.floor(n/t*100)),u("all target was loaded")}},{children:(0,n.jsx)("div",a({className:"w-full flex flex-row flex-wrap"},{children:Array.from(Array(12).keys()).map((function(e){return(0,n.jsx)("img",{src:"https://picsum.photos/id/".concat(10+3*e+e,"/350/300")},e)}))}))})),(0,n.jsxs)("div",a({className:"w-full"},{children:[(0,n.jsx)("progress",{className:"progress progress-primary w-full",value:t,max:"100"}),(0,n.jsx)("div",a({className:"w-full text-primary"},{children:s}))]}))]}))},u=(0,r.memo)((function(){var e=(0,r.useState)(),t=e[0],o=e[1];return(0,n.jsxs)("div",a({className:"w-full"},{children:[(0,n.jsx)(i.default,{children:"Demo"}),(0,n.jsx)("p",a({className:"my-4"},{children:"Any background-image of div and src image of img will be pre-load."})),t&&(0,n.jsx)(s,{}),(0,n.jsx)("div",a({className:"btn-group"},{children:(0,n.jsx)("button",a({onClick:function(){return o(!0)},className:"btn"},{children:"load component"}))}))]}))}));t.default=u}.apply(t,r),void 0===o||(e.exports=o)},872:function(e,t,n){var r,o,a=this&&this.__assign||function(){return a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},a.apply(this,arguments)},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};r=[n,t,n(294),n(247)],o=function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),r=l(r);var o=function(e){var t=e.children,o=e.hideBeforeLoaded,l=e.onStep,i=e.onload,s=(0,n.useRef)();return(0,n.useEffect)((function(){s.current&&(new r.default).load(s.current,{hideBeforeLoaded:o,onUpdate:function(e){return null==l?void 0:l(e)}}).then((function(e){null==i||i(e)}))}),[]),n.Children.map(t,(function(e){return(0,n.cloneElement)(e,a(a({},e.props),{ref:s}))}))};o.defaultProps={hideBeforeLoaded:!0,onStep:function(){},onload:function(){}},t.default=o}.apply(t,r),void 0===o||(e.exports=o)},559:(e,t,n)=>{var r=n(81),o=n(645)(r);o.push([e.id,".installation .copy {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0);\n  cursor: pointer;\n}\n.installation .copy > svg {\n  position: absolute;\n  top: 0.3rem;\n  right: 1.3rem;\n  display: none;\n}\n.installation:hover .copy > svg {\n  display: block;\n}\n",""]),e.exports=o},247:function(e,t,n){var r,o=this&&this.__assign||function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o.apply(this,arguments)},a=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))};r=function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r={hideBeforeLoaded:!0,onUpdate:function(e){}};!function(e){e[e.unload=0]="unload",e[e.loading=1]="loading",e[e.loaded=2]="loaded"}(n||(n={}));var l=function(){function e(){this.index=0,this.result=[]}return e.prototype.load=function(e,t){var l=this;void 0===t&&(t=r);var i=o(o({},r),t),s=i.onUpdate,u=i.hideBeforeLoaded,c="flex"===this.getStyle(e,"display")?"flex":"block";u&&(e.style.display="none");var d=Array.from(e.querySelectorAll("*"));a([e],d,!0).forEach((function(e,t){var r=e.tagName,o=e.getAttribute("src"),a=l.getStyle(e,"background-image").replace(/url\((['"])?(.*?)\1\)/gi,"$2").split(",")[0],i=l.getStyle(e,"-webkit-mask-image").replace(/url\((['"])?(.*?)\1\)/gi,"$2").split(",")[0],s=n.unload;return"IMG"===r&&o?(l.result.push({url:o,index:t,status:s}),!0):"DIV"===r&&"none"!==a&&a.indexOf("http")>=0?(l.result.push({url:a,index:t,status:s}),!0):("DIV"===r&&"none"!==i&&l.result.push({url:i,index:t,status:s}),!1)}));var f=function(t){var r=t.resolve,o=void 0===r?function(e){return console.log(e)}:r,a=t.reject,i=void 0===a?function(e){return console.log(e)}:a;if(0!==l.result.length){var d=l.result[l.index],p=l.result.length,h=d.url,v=d.index;d.status=n.loading;var y=new Image;y.onload=function(){d.status=n.loaded;var t=l.result.filter((function(e){return e.status===n.loaded})).length;p===t?(u&&(e.style.display=c),requestAnimationFrame((function(){return o({url:h,total:p,loaded:t,index:v})}))):(s({url:h,total:p,loaded:t,index:v}),l.index++,f({resolve:o,reject:i}))},y.src=h}else o({total:0,loaded:0})};return new Promise((function(e,t){f({resolve:e,reject:t})}))},e.prototype.getStyle=function(e,t){var n=e.ownerDocument.defaultView;return n&&n.getComputedStyle?(t=t.replace(/([A-Z])/g,"-$1").toLowerCase(),n.getComputedStyle(e,null).getPropertyValue(t)):e.currentStyle?(t=t.replace(/\-(\w)/g,(function(e,t){return t.toUpperCase()})),e.currentStyle[t]):""},e}();t.default=l}.apply(t,[n,t]),void 0===r||(e.exports=r)},638:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>x});var r=n(379),o=n.n(r),a=n(795),l=n.n(a),i=n(569),s=n.n(i),u=n(565),c=n.n(u),d=n(216),f=n.n(d),p=n(589),h=n.n(p),v=n(559),y=n.n(v),g={};for(const e in v)"default"!==e&&(g[e]=()=>v[e]);n.d(t,g);var m={};m.styleTagTransform=h(),m.setAttributes=c(),m.insert=s().bind(null,"head"),m.domAPI=l(),m.insertStyleElement=f(),o()(y(),m);const x=y()&&y().locals?y().locals:void 0},443:(e,t,n)=>{var r={"./":94,"./demo/":681};function o(e){var t=a(e);return n(t)}function a(e){if(!n.o(r,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return r[e]}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id=443}}]);
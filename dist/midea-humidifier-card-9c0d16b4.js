/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=s.get(this.cssText);return e&&void 0===t&&(s.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new n(s,i)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var a,l;const h={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},d=(t,e)=>e!==t&&(e==e||t==t),c={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:d};class u extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=c){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||c}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=c){var s,n;const o=this.constructor._$Eh(t,i);if(void 0!==o&&!0===i.reflect){const r=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:h.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Ei=null}}_$AK(t,e){var i,s,n;const o=this.constructor,r=o._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=o.getPropertyOptions(r),a=t.converter,l=null!==(n=null!==(s=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof a?a:null)&&void 0!==n?n:h.fromAttribute;this._$Ei=r,this[r]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||d)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var p,f;u.finalized=!0,u.elementProperties=new Map,u.elementStyles=[],u.shadowRootOptions={mode:"open"},null===(a=globalThis.reactiveElementPolyfillSupport)||void 0===a||a.call(globalThis,{ReactiveElement:u}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.0.0");const m=globalThis.trustedTypes,_=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,v=`lit$${(Math.random()+"").slice(9)}$`,y="?"+v,g=`<${y}>`,$=document,A=(t="")=>$.createComment(t),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,b=Array.isArray,w=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,x=/>/g,H=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,E=/'/g,L=/"/g,M=/^(?:script|style|textarea)$/i,V=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),T=V(1),P=V(2),k=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),U=new WeakMap,O=$.createTreeWalker($,129,null,!1),R=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=w;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===w?"!--"===l[1]?r=S:void 0!==l[1]?r=x:void 0!==l[2]?(M.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=H):void 0!==l[3]&&(r=H):r===H?">"===l[0]?(r=null!=n?n:w,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?H:'"'===l[3]?L:E):r===L||r===E?r=H:r===S||r===x?r=w:(r=H,n=void 0);const c=r===H&&t[e+1].startsWith("/>")?" ":"";o+=r===w?i+g:h>=0?(s.push(a),i.slice(0,h)+"$lit$"+i.slice(h)+v+c):i+v+(-2===h?(s.push(void 0),e):c)}const a=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==_?_.createHTML(a):a,s]};class z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,h]=R(t,e);if(this.el=z.createElement(l,i),O.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=O.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(v)){const i=h[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(v),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?F:"?"===e[1]?Z:"@"===e[1]?q:B})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(M.test(s.tagName)){const t=s.textContent.split(v),e=t.length-1;if(e>0){s.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],A()),O.nextNode(),a.push({type:2,index:++n});s.append(t[e],A())}}}else if(8===s.nodeType)if(s.data===y)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(v,t+1));)a.push({type:7,index:n}),t+=v.length-1}n++}}static createElement(t,e){const i=$.createElement("template");return i.innerHTML=t,i}}function I(t,e,i=t,s){var n,o,r,a;if(e===k)return e;let l=void 0!==s?null===(n=i._$Cl)||void 0===n?void 0:n[s]:i._$Cu;const h=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,s)),void 0!==s?(null!==(r=(a=i)._$Cl)&&void 0!==r?r:a._$Cl=[])[s]=l:i._$Cu=l),void 0!==l&&(e=I(t,l._$AS(t,e.values),l,s)),e}class j{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:$).importNode(i,!0);O.currentNode=n;let o=O.nextNode(),r=0,a=0,l=s[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new D(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new W(o,this,t)),this.v.push(e),l=s[++a]}r!==(null==l?void 0:l.index)&&(o=O.nextNode(),r++)}return n}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class D{constructor(t,e,i,s){var n;this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=I(this,t,e),C(t)?t===N||null==t||""===t?(this._$AH!==N&&this._$AR(),this._$AH=N):t!==this._$AH&&t!==k&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return b(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==N&&C(this._$AH)?this._$AA.nextSibling.data=t:this.S($.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=z.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(i);else{const t=new j(n,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new z(t)),e}M(t){b(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new D(this.A(A()),this.A(A()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class B{constructor(t,e,i,s,n){this.type=1,this._$AH=N,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=N}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=I(this,t,e,0),o=!C(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=I(this,s[i+r],e,r),a===k&&(a=this._$AH[r]),o||(o=!C(a)||a!==this._$AH[r]),a===N?t=N:t!==N&&(t+=(null!=a?a:"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.k(t)}k(t){t===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class F extends B{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===N?void 0:t}}class Z extends B{constructor(){super(...arguments),this.type=4}k(t){t&&t!==N?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class q extends B{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=I(this,t,e,0))&&void 0!==i?i:N)===k)return;const s=this._$AH,n=t===N&&s!==N||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==N&&(s===N||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class W{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){I(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var J,K,G;null===(p=globalThis.litHtmlPolyfillSupport)||void 0===p||p.call(globalThis,z,D),(null!==(f=globalThis.litHtmlVersions)&&void 0!==f?f:globalThis.litHtmlVersions=[]).push("2.0.0");class Q extends u{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new D(e.insertBefore(A(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return k}}Q.finalized=!0,Q._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Q}),null===(K=globalThis.litElementPolyfillSupport)||void 0===K||K.call(globalThis,{LitElement:Q}),(null!==(G=globalThis.litElementVersions)&&void 0!==G?G:globalThis.litElementVersions=[]).push("3.0.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const X=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,Y=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function tt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Y(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function et(t){return tt({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const it=1;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){var e;if(super(t),t.type!==it||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,s;if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.et)||void 0===i?void 0:i.has(t))&&this.st.add(t);return this.render(e)}const n=t.element.classList;this.st.forEach((t=>{t in e||(n.remove(t),this.st.delete(t))}));for(const t in e){const i=!!e[t];i===this.st.has(t)||(null===(s=this.et)||void 0===s?void 0:s.has(t))||(i?(n.add(t),this.st.add(t)):(n.remove(t),this.st.delete(t)))}return k}});var nt="[^\\s]+";function ot(t,e){for(var i=[],s=0,n=t.length;s<n;s++)i.push(t[s].substr(0,e));return i}var rt=function(t){return function(e,i){var s=i[t].map((function(t){return t.toLowerCase()})),n=s.indexOf(e.toLowerCase());return n>-1?n:null}};function at(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var s=0,n=e;s<n.length;s++){var o=n[s];for(var r in o)t[r]=o[r]}return t}var lt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],ht=["January","February","March","April","May","June","July","August","September","October","November","December"],dt=ot(ht,3),ct={dayNamesShort:ot(lt,3),dayNames:lt,monthNamesShort:dt,monthNames:ht,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},ut=(at({},ct),function(t){return+t-1}),pt=[null,"[1-9]\\d?"],ft=[null,nt],mt=["isPm",nt,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],_t=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];rt("monthNamesShort"),rt("monthNames");function vt(){return(vt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();var yt,gt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(yt||(yt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(gt||(gt={}));var $t=function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n};const At={silent:0,medium:1,turbo:2,tank:3},Ct={off:0,set:1,smart:2,continuous:3,dry:4},bt=(t,e)=>Ct[t]-Ct[e],wt=(t,e)=>At[t]-At[e],St=(t,e,i,s,n,o)=>{const r=[];(null==n?void 0:n.length)&&r.push((t=>n.includes(function(t){return t.substr(0,t.indexOf("."))}(t)))),o&&r.push((e=>t.states[e]&&o(t.states[e])));const a=((t,e,i)=>{(!i||i>t.length)&&(i=t.length);const s=[];for(let n=0;n<t.length&&s.length<i;n++){let i=!0;for(const s of e)if(!s(t[n])){i=!1;break}i&&s.push(t[n])}return s})(i,r,e);if(a.length<e&&s.length){const i=St(t,e-a.length,s,[],n,o);a.push(...i)}return a},xt=t=>void 0===t.attributes.friendly_name?Ht(t.entity_id).replace(/_/g," "):t.attributes.friendly_name||"",Ht=t=>t.substr(t.indexOf(".")+1),Et=/^(\w+)\.(\w+)$/,Lt=t=>Et.test(t),Mt=(t,e=!0)=>{if(!t||!Array.isArray(t))throw new Error("Entities need to be an array");return t.map(((t,i)=>{if("object"==typeof t&&!Array.isArray(t)&&t.type)return t;let s;if("string"==typeof t)s={entity:t};else{if("object"!=typeof t||Array.isArray(t))throw new Error(`Invalid entity specified at position ${i}.`);if(!("entity"in t))throw new Error(`Entity object at position ${i} is missing entity field.`);s=t}if(e&&!Lt(s.entity))throw new Error(`Invalid entity ID at position ${i}: ${s.entity}`);return s}))};const Vt=["unavailable","unknown"],Tt={off:"M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z",set:"M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5",continuous:"M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",smart:"M13 3C16.9 3 20 6.1 20 10C20 12.8 18.4 15.2 16 16.3V21H9V18H8C6.9 18 6 17.1 6 16V13H4.5C4.1 13 3.8 12.5 4.1 12.2L6 9.7C6.2 5.9 9.2 3 13 3M13 1C8.4 1 4.6 4.4 4.1 8.9L2.5 11C1.9 11.8 1.9 12.8 2.3 13.6C2.7 14.3 3.3 14.8 4 14.9V16C4 17.9 5.3 19.4 7 19.9V23H18V17.5C20.5 15.8 22 13.1 22 10C22 5 18 1 13 1M14 14H12V13H14V14M15.6 9.5C15.3 9.9 15 10.3 14.5 10.6V12H11.5V10.6C10.1 9.8 9.6 7.9 10.4 6.5S13.1 4.6 14.5 5.4 16.4 8.1 15.6 9.5Z",dry:"M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.07C5.31,13.46 4.68,13.46 4.29,13.07L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.12V20A1,1 0 0,1 16,21"},Pt={off:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",on:"M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19M13,17H11V7H13V17Z"},kt={silent:"M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M17 15V17H18V23H20V15H17Z",medium:"M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M16 15V17H19V18H18C16.9 18 16 18.9 16 20V23H21V21H18V20H19C20.11 20 21 19.11 21 18V17C21 15.9 20.11 15 19 15H16Z",turbo:"M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M21 21V20.5C21 19.67 20.33 19 19.5 19C20.33 19 21 18.33 21 17.5V17C21 15.89 20.1 15 19 15H16V17H19V18H17V20H19V21H16V23H19C20.11 23 21 22.11 21 21",tank:"M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"},Nt="midea-humidifier-card";console.info(`%c${Nt}: 1.0.1`,"font-weight: bold"),window.customCards=window.customCards||[],window.customCards.push({type:"midea-humidifier-card",name:"Midea Humidifier Card",description:"Midea Humidifier Lan companion card"});let Ut=class extends Q{static async getConfigElement(){return await import("./midea-humidifier-card-editor-5d8e6178.js"),document.createElement(Nt+"-editor")}static getStubConfig(t,e,i){const s=St(t,1,e,i,["humidifier"]);return console.warn(`[${Nt}::getStubConfig]: trying to prefill config automatically`),{type:"humidifier",entity:s[0]||"",fan_entity:`fan.${s[0]}_fan`,tank_entity:`binary_sensor.${s[0]}_tank_full`,defrost_entity:`binary_sensor.${s[0]}_defrosting`,filter_entity:`binary_sensor.${s[0]}_replace_filter`,humidity_entity:`sensor.${s[0]}_humidity`,temperature_entity:`sensor.${s[0]}_temperature`,ion_entity:`switch.${s[0]}_ion_mode`,swap_target_and_current_humidity:!1,show_ion_toggle:!0}}getCardSize(){return 6}setConfig(t){if(!t.entity||"humidifier"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the humidifier domain");this._config=t}_lower(t){return null==t?void 0:t.toLowerCase()}_renderPowerIcon(t,e){if(!Pt[this._lower(t)])return T``;return T`
      <ha-icon-button
        class=${st({"selected-icon":!(t!==e)})}
        .status=${t}
        @click=${this._handlePowerAction}
        tabindex="0"
        .path=${Pt[this._lower(t)]}
        .label=${this._lower(t)}
      >
      <ha-text>${t}</ha-text>
      </ha-icon-button>
    `}_renderFanIcon(t,e,i){const s=!(e!==t);return kt[this._lower(t)]?T`
      <ha-icon-button
        class=${st({"selected-icon":s&&!i})}
        .mode=${t}
        @click=${this._handleFanAction}
        tabindex="0"
        .path=${kt[this._lower(t)]}
        .label=${this._lower(t)}
      >
      </ha-icon-button>
    `:T``}_renderIcon(t,e,i){const s=!(this._lower(e)!==this._lower(t));return Tt[this._lower(t)]?T`
      <ha-icon-button
        class=${st({"selected-icon":s&&!i})}
        .mode=${t}
        @click=${this._handleAction}
        tabindex="0"
        .path=${Tt[this._lower(t)]}
        .label=${this._lower(t)}
      >
      </ha-icon-button>
    `:T``}_handlePowerAction(t){const e="on"===t.currentTarget.status?"turn_on":"turn_off";this.hass.callService("humidifier",e,{entity_id:this._config.entity})}_handleFanAction(t){this.hass.callService("fan","set_preset_mode",{entity_id:this._config.fan_entity,preset_mode:t.currentTarget.mode})}_handleToggleIonModeAction(){this.hass.callService("switch","toggle",{entity_id:this._config.ion_entity})}_handleAction(t){this.hass.callService("humidifier","set_mode",{entity_id:this._config.entity,mode:t.currentTarget.mode})}_getWarningText(t){return T`<div>
      ${t.tank?T`<hui-warning>The tank is full !</hui-warning>`:T``}
      ${t.defrost?T`<hui-warning>Applicance is defrosting</hui-warning>`:T``}
      ${t.filter?T`<hui-warning>Please install or change the filter</hui-warning>`:T``}
    </div>`}render(){var t,e,i,s,n,o,r;if(!this.hass||!this._config)return T``;const a=this.hass.states[this._config.entity],l=this.hass.states[this._config.fan_entity],h=this.hass.states[this._config.tank_entity],d=this.hass.states[this._config.filter_entity],c=this.hass.states[this._config.defrost_entity],u=this.hass.states[this._config.ion_entity],p=this._lower(a.attributes.mode)in Tt?a.attributes.mode:"unknown-mode",f=this._lower(null===(t=null==l?void 0:l.attributes)||void 0===t?void 0:t.preset_mode)in kt?null===(e=null==l?void 0:l.attributes)||void 0===e?void 0:e.preset_mode:"unknown-fan-mode",m=this.hass.states[this._config.humidity_entity].state,_=a.state,v=!("off"!==_),y=null===(i=this.hass.states[this._config.temperature_entity])||void 0===i?void 0:i.state,g=parseFloat(y);if(!a)return T`
        <hui-warning>
          ${$=this.hass,A=this._config.entity,"NOT_RUNNING"!==$.config.state?$.localize("ui.panel.lovelace.warning.entity_not_found","entity",A||"[empty]"):$.localize("ui.panel.lovelace.warning.starting")}
        </hui-warning>
      `;var $,A;const C=!0===this._config.swap_target_and_current_humidity,b=this._config.name||xt(this.hass.states[this._config.entity]),w=null!==a.attributes.humidity&&Number.isFinite(Number(a.attributes.humidity))?a.attributes.humidity:a.attributes.min_humidity,S=function(t){return function(t){var e=t.locale.language||"en";return t.translationMetadata.translations[e]&&t.translationMetadata.translations[e].isRTL||!1}(t)?"rtl":"ltr"}(this.hass),x=Vt.includes(a.state)||v?T` 
          <round-slider 
            .min=${a.attributes.min_humidity||0} 
            .max=${a.attributes.max_humidity||100} 
            .value=${w} 
            disabled="true">
          </round-slider>`:T`
          <round-slider
            .value=${w}
            .min=${a.attributes.min_humidity||0}
            .max=${a.attributes.max_humidity||100}           
            .rtl=${"rtl"===S}
            step="5"
            @value-changing=${this._dragEvent}
            @value-changed=${this._setTargetHumidity}>
          </round-slider>
        `,H=P`
      <svg viewBox="0 0 40 20">
        <text
          x="50%"
          dx="1"
          y="60%"
          text-anchor="middle"
          style="font-size: 13px;"
        >
          ${this._targetHumidity&&!isNaN(this._targetHumidity)?P`${C?T`${null===(s=this._currentHumidity)||void 0===s?void 0:s.toFixed()}`:T`${this._targetHumidity.toFixed()}`}
              <tspan dx="-3" dy="-6.5" style="font-size: 4px;">
                %
              </tspan>
              `:""}
        </text>
      </svg>
    `,E=P`
    <svg id="set-values">
      <g>
        <text text-anchor="middle" class="set-value">
        ${Vt.includes(m)||void 0===this._currentHumidity||null===this._currentHumidity?"":P`
                    ${C?null===(n=this._targetHumidity)||void 0===n?void 0:n.toFixed():this._currentHumidity.toFixed()}% - ${y?g:""}°C
                    `}
        </text>
        <text
            dy="22"
            text-anchor="middle"
            id="set-mode"
          >
            ${this.hass.localize(`state.default.${a.state}`)}
            ${a.attributes.mode&&!Vt.includes(a.state)?T`
                    -
                    ${this.hass.localize(`state_attributes.humidifier.mode.${a.attributes.mode}`)||a.attributes.mode}
                  `:""}
          </text>
      </g>
    </svg>
    `,L={tank:"on"===(null==h?void 0:h.state),defrost:"on"===(null==c?void 0:c.state),filter:"on"===(null==d?void 0:d.state)},M="on"===(null==h?void 0:h.state)||"on"===(null==c?void 0:c.state)||"on"===(null==d?void 0:d.state)||!1;return T`
      <ha-card
        class=${st({[M?"error":p]:!0})}
      >
        <ha-icon-button
          class="more-info"
          .label=${this.hass.localize("ui.panel.lovelace.cards.show_more_info")}
          .path=${"M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"}
          @click=${this._handleMoreInfo}
          tabindex="0"
        ></ha-icon-button>
        <div class="content">
          <div id="controls">
            <div id="slider">
              ${x}
              <div id="slider-center">
                <div id="humidity">${H} ${E}</div>
              </div>
            </div>
          </div>
          <div id="info" .title=${b}>
            <div id="modes">
              ${(a.attributes.available_modes||[]).concat().sort(bt).map((t=>this._renderIcon(t,p,v)))}
              ${(null==L?void 0:L.defrost)?T`<ha-icon-button
                  class=${st({"defrost-icon":L.defrost})}
                  tabindex="0"                  
                  .path=${"M20.79,13.95L18.46,14.57L16.46,13.44V10.56L18.46,9.43L20.79,10.05L21.31,8.12L19.54,7.65L20,5.88L18.07,5.36L17.45,7.69L15.45,8.82L13,7.38V5.12L14.71,3.41L13.29,2L12,3.29L10.71,2L9.29,3.41L11,5.12V7.38L8.5,8.82L6.5,7.69L5.92,5.36L4,5.88L4.47,7.65L2.7,8.12L3.22,10.05L5.55,9.43L7.55,10.56V13.45L5.55,14.58L3.22,13.96L2.7,15.89L4.47,16.36L4,18.12L5.93,18.64L6.55,16.31L8.55,15.18L11,16.62V18.88L9.29,20.59L10.71,22L12,20.71L13.29,22L14.7,20.59L13,18.88V16.62L15.5,15.17L17.5,16.3L18.12,18.63L20,18.12L19.53,16.35L21.3,15.88L20.79,13.95M9.5,10.56L12,9.11L14.5,10.56V13.44L12,14.89L9.5,13.44V10.56Z"}
                  .label=${"Defrost"}                
                  ></ha-icon-button>`:T``} 
            </div>
            <div id="modes">
              ${!0===(null===(o=this._config)||void 0===o?void 0:o.show_ion_toggle)?T`<ha-icon-button
                  class=${st({"ion-icon":"on"===u.state})}
                  tabindex="0"  
                  @click=${this._handleToggleIonModeAction}                
                  .path=${"M11,9A4,4 0 0,1 15,13A4,4 0 0,1 11,17A4,4 0 0,1 7,13A4,4 0 0,1 11,9M11,11A2,2 0 0,0 9,13A2,2 0 0,0 11,15A2,2 0 0,0 13,13A2,2 0 0,0 11,11M7,4H14A4,4 0 0,1 18,8V9H16V8A2,2 0 0,0 14,6H7A2,2 0 0,0 5,8V20H16V18H18V22H3V8A4,4 0 0,1 7,4M16,11C18.5,11 18.5,9 21,9V11C18.5,11 18.5,13 16,13V11M16,15C18.5,15 18.5,13 21,13V15C18.5,15 18.5,17 16,17V15Z"}
                  .label=${"Ion"}                
                  ></ha-icon-button>`:T``}                
              ${((null===(r=null==l?void 0:l.attributes)||void 0===r?void 0:r.preset_modes)||[]).concat().sort(wt).map((t=>this._renderFanIcon(t,f,v)))}
              ${this._renderPowerIcon("off"===_?"on":"off",_)}             
            </div>          
            ${b}
          </div>
        </div>
        ${M?this._getWarningText(L):T``}
      </ha-card>
    `}shouldUpdate(t){return function(t,e){if(function(t,e){if(e.has("_config"))return!0;const i=e.get("hass");return!i||i.connected!==t.hass.connected||i.themes!==t.hass.themes||i.locale!==t.hass.locale||i.localize!==t.hass.localize||i.config.state!==t.hass.config.state}(t,e))return!0;const i=e.get("hass");return Mt(t._config.entities,!1).some((e=>"entity"in e&&i.states[e.entity]!==t.hass.states[e.entity]))}(this,t)}updated(t){if(super.updated(t),!this._config||!this.hass||!t.has("hass")&&!t.has("_config"))return;const e=t.get("hass"),i=t.get("_config");e&&i&&e.themes===this.hass.themes&&i.theme===this._config.theme||function(t,e,i,s){void 0===s&&(s=!1),t._themes||(t._themes={});var n=e.default_theme;("default"===i||i&&e.themes[i])&&(n=i);var o=vt({},t._themes);if("default"!==n){var r=e.themes[n];Object.keys(r).forEach((function(e){var i="--"+e;t._themes[i]="",o[i]=r[e]}))}if(t.updateStyles?t.updateStyles(o):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,o),s){var a=document.querySelector("meta[name=theme-color]");if(a){a.hasAttribute("default-content")||a.setAttribute("default-content",a.getAttribute("content"));var l=o["--primary-color"]||a.getAttribute("default-content");a.setAttribute("content",l)}}}(this,this.hass.themes,this._config.theme);const s=this.hass.states[this._config.entity];if(!s)return;const n=this.hass.states[this._config.fan_entity];n&&(e&&e.states[this._config.entity]===s&&e.states[this._config.fan_entity]===n||this._rescale_svg())}willUpdate(t){if(!this.hass||!this._config||!t.has("hass"))return;const e=this.hass.states[this._config.entity];if(!e)return;const i=this.hass.states[this._config.humidity_entity];if(!i)return;const s=t.get("hass");s&&s.states[this._config.entity]===e||(this._targetHumidity=this._getTargetHumidity(e)),s&&s.states[this._config.humidity_entity]===e||(this._currentHumidity=this._getCurrentHumidity(i))}_rescale_svg(){this.shadowRoot&&this.shadowRoot.querySelector("ha-card")&&this.shadowRoot.querySelector("ha-card").updateComplete.then((()=>{const t=this.shadowRoot.querySelector("#set-values"),e=t.querySelector("g").getBBox();t.setAttribute("viewBox",`${e.x} ${e.y} ${e.width} ${e.height}`),t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`)}))}_getTargetHumidity(t){if(!Vt.includes(t.state))return t.attributes.humidity}_dragEvent(t){this._targetHumidity=t.detail.value}_setTargetHumidity(t){this.hass.callService("humidifier","set_humidity",{entity_id:this._config.entity,humidity:t.detail.value})}_getCurrentHumidity(t){if(!Vt.includes(t.state)&&!isNaN(parseFloat(t.state)))return parseFloat(t.state)}_handleMoreInfo(){$t(this,"hass-more-info",{entityId:this._config.entity})}static get styles(){return o`
      :host {
        display: block;
      }

      ha-card {
        height: 100%;
        position: relative;
        overflow: hidden;
        --name-font-size: 1.2rem;
        --brightness-font-size: 1.2rem;
        --rail-border-color: transparent;
      }     
      .Off {
        --mode-color: var(--state-climate-idle-color);
      }
      .Dry {
        --mode-color: var(--state-climate-heat-color);
      }
      .Smart {
        --mode-color: var(--state-climate-cool-color);
      }
      .Continuous {
        --mode-color: var(--state-climate-eco-color);
      }
      .Set {
        --mode-color: var(--state-climate-manual-color);
      }
      .unknown-mode {
        --mode-color: var(--state-unknown-color);
      }
      .error {
        --mode-color: var(--error-color);
      }

      .more-info {
        position: absolute;
        cursor: pointer;
        top: 0;
        right: 0;
        border-radius: 100%;
        color: var(--secondary-text-color);
        z-index: 1;
      }

      .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      #controls {
        display: flex;
        justify-content: center;
        padding: 16px;
        position: relative;
      }

      #slider {
        height: 100%;
        width: 100%;
        position: relative;
        max-width: 250px;
        min-width: 100px;
      }

      round-slider {
        --round-slider-path-color: var(--slider-track-color);
        --round-slider-bar-color: var(--mode-color);
        padding-bottom: 10%;
      }

      #slider-center {
        position: absolute;
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        box-sizing: border-box;
        border-radius: 100%;
        left: 20px;
        top: 20px;
        text-align: center;
        overflow-wrap: break-word;
        pointer-events: none;
      }

      #humidity {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 50%;
        top: 45%;
        left: 50%;
      }

      #set-values {
        max-width: 80%;
        transform: translate(0, -50%);
        font-size: 20px;
      }

      #set-mode {
        fill: var(--secondary-text-color);
        font-size: 16px;
      }

      #info {
        display: flex-vertical;
        justify-content: center;
        text-align: center;
        padding: 16px;
        margin-top: -60px;
        font-size: var(--name-font-size);
      }

      #modes > * {
        color: var(--disabled-text-color);
        cursor: pointer;
        display: inline-block;
      }

      #modes .selected-icon {
        color: var(--mode-color);
      }

      #modes .defrost-icon {
        color: var(--state-climate-cool-color);
      }      

      #modes .ion-icon {
        color: var(--secondary-text-color);
      }        

      text {
        fill: var(--primary-text-color);
      }
    `}};t([tt({attribute:!1})],Ut.prototype,"hass",void 0),t([et()],Ut.prototype,"_config",void 0),t([et()],Ut.prototype,"_targetHumidity",void 0),t([et()],Ut.prototype,"_currentHumidity",void 0),Ut=t([X(Nt)],Ut);export{$t as A,Ut as M,t as _,X as a,Ht as b,xt as c,tt as e,St as f,Lt as i,Q as n,Mt as p,o as r,et as t,T as y};

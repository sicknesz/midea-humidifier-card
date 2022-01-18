function t(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}var e="M22.1 21.5L2.4 1.7L1.1 3L3.8 5.7C3.3 6.3 3 7.1 3 8V22H18V19.9L20.8 22.7L22.1 21.5M9.6 11.5L12.4 14.3C12.1 14.7 11.6 15 11 15C9.9 15 9 14.1 9 13C9 12.4 9.3 11.9 9.6 11.5M16 17.9V20H5V8C5 7.7 5.1 7.4 5.2 7.1L8.2 10.1C7.5 10.8 7 11.9 7 13C7 15.2 8.8 17 11 17C12.1 17 13.2 16.5 13.9 15.8L16 17.9M17 13.8C17.1 12.5 19 10.5 19 10.5S21 12.7 21 14C21 15 20.2 15.9 19.2 16L17 13.8M9.2 6L7.2 4H14C16.2 4 18 5.8 18 8V9H16V8C16 6.9 15.1 6 14 6H9.2Z";var i={version:"Version",invalid_configuration:"Invalid configuration",tank_is_full:"Caution : Water tank is full, please empty it",change_airfilter:"Caution : Please change the air filter",defrosting:"Caution : Please wait, currently defrosting...",tank:"Tank",filter:"Filter",defrost:"Defrost"},n={common:i},s={version:"Version",invalid_configuration:"Configuration invalide",tank_is_full:"Attention : Le réservoir est plein",change_airfilter:"Attention : Changer le filtre à air",defrosting:"Attention : Dégivrage en cours...",tank:"Réservoir",filter:"Filtre",defrost:"Dégivrage"},o={common:s};const r={en:Object.freeze({__proto__:null,common:i,default:n}),fr:Object.freeze({__proto__:null,common:s,default:o})};function a(t,e="",i=""){const n=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let s;try{s=t.split(".").reduce(((t,e)=>t[e]),r[n])}catch(e){s=t.split(".").reduce(((t,e)=>t[e]),r.en)}return void 0===s&&(s=t.split(".").reduce(((t,e)=>t[e]),r.en)),""!==e&&""!==i&&(s=s.replace(e,i)),s}const l=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,h=Symbol(),d=new Map;class c{constructor(t,e){if(this._$cssResult$=!0,e!==h)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=d.get(this.cssText);return l&&void 0===t&&(d.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const u=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new c(i,h)},_=l?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new c("string"==typeof t?t:t+"",h))(e)})(t):t;var f,p;const m={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),g={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:v};class y extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Eh(i,e);void 0!==n&&(this._$Eu.set(n,i),t.push(n))})),t}static createProperty(t,e=g){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||g}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(_(t))}else void 0!==t&&e.push(_(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{l?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),n=window.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=g){var n,s;const o=this.constructor._$Eh(t,i);if(void 0!==o&&!0===i.reflect){const r=(null!==(s=null===(n=i.converter)||void 0===n?void 0:n.toAttribute)&&void 0!==s?s:m.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Ei=null}}_$AK(t,e){var i,n,s;const o=this.constructor,r=o._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=o.getPropertyOptions(r),a=t.converter,l=null!==(s=null!==(n=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==n?n:"function"==typeof a?a:null)&&void 0!==s?s:m.fromAttribute;this._$Ei=r,this[r]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}var $,C;y.finalized=!0,y.elementProperties=new Map,y.elementStyles=[],y.shadowRootOptions={mode:"open"},null===(f=globalThis.reactiveElementPolyfillSupport)||void 0===f||f.call(globalThis,{ReactiveElement:y}),(null!==(p=globalThis.reactiveElementVersions)&&void 0!==p?p:globalThis.reactiveElementVersions=[]).push("1.0.0");const b=globalThis.trustedTypes,A=b?b.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,S="?"+w,x=`<${S}>`,H=document,E=(t="")=>H.createComment(t),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,V=Array.isArray,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,T=/>/g,z=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,P=/'/g,O=/"/g,N=/^(?:script|style|textarea)$/i,U=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),R=U(1),I=U(2),D=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),B=new WeakMap,F=H.createTreeWalker(H,129,null,!1),q=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":"",r=M;for(let e=0;e<i;e++){const i=t[e];let a,l,h=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===M?"!--"===l[1]?r=L:void 0!==l[1]?r=T:void 0!==l[2]?(N.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=null!=s?s:M,h=-1):void 0===l[1]?h=-2:(h=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?z:'"'===l[3]?O:P):r===O||r===P?r=z:r===L||r===T?r=M:(r=z,s=void 0);const c=r===z&&t[e+1].startsWith("/>")?" ":"";o+=r===M?i+x:h>=0?(n.push(a),i.slice(0,h)+"$lit$"+i.slice(h)+w+c):i+w+(-2===h?(n.push(void 0),e):c)}const a=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==A?A.createHTML(a):a,n]};class Z{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const r=t.length-1,a=this.parts,[l,h]=q(t,e);if(this.el=Z.createElement(l,i),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=F.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(w)){const i=h[o++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+"$lit$").split(w),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?Q:"?"===e[1]?X:"@"===e[1]?Y:G})}else a.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(N.test(n.tagName)){const t=n.textContent.split(w),e=t.length-1;if(e>0){n.textContent=b?b.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],E()),F.nextNode(),a.push({type:2,index:++s});n.append(t[e],E())}}}else if(8===n.nodeType)if(n.data===S)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(w,t+1));)a.push({type:7,index:s}),t+=w.length-1}s++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function W(t,e,i=t,n){var s,o,r,a;if(e===D)return e;let l=void 0!==n?null===(s=i._$Cl)||void 0===s?void 0:s[n]:i._$Cu;const h=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==h&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===h?l=void 0:(l=new h(t),l._$AT(t,i,n)),void 0!==n?(null!==(r=(a=i)._$Cl)&&void 0!==r?r:a._$Cl=[])[n]=l:i._$Cu=l),void 0!==l&&(e=W(t,l._$AS(t,e.values),l,n)),e}class J{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:n}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:H).importNode(i,!0);F.currentNode=s;let o=F.nextNode(),r=0,a=0,l=n[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new K(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new tt(o,this,t)),this.v.push(e),l=n[++a]}r!==(null==l?void 0:l.index)&&(o=F.nextNode(),r++)}return s}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class K{constructor(t,e,i,n){var s;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cg=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),k(t)?t===j||null==t||""===t?(this._$AH!==j&&this._$AR(),this._$AH=j):t!==this._$AH&&t!==D&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return V(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==j&&k(this._$AH)?this._$AA.nextSibling.data=t:this.S(H.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:n}=t,s="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=Z.createElement(n.h,this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.m(i);else{const t=new J(s,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new Z(t)),e}M(t){V(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new K(this.A(E()),this.A(E()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class G{constructor(t,e,i,n,s){this.type=1,this._$AH=j,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=W(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==D,o&&(this._$AH=t);else{const n=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=W(this,n[i+r],e,r),a===D&&(a=this._$AH[r]),o||(o=!k(a)||a!==this._$AH[r]),a===j?t=j:t!==j&&(t+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}o&&!n&&this.k(t)}k(t){t===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Q extends G{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===j?void 0:t}}class X extends G{constructor(){super(...arguments),this.type=4}k(t){t&&t!==j?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class Y extends G{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=W(this,t,e,0))&&void 0!==i?i:j)===D)return;const n=this._$AH,s=t===j&&n!==j||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==j&&(n===j||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class tt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}var et,it,nt;null===($=globalThis.litHtmlPolyfillSupport)||void 0===$||$.call(globalThis,Z,K),(null!==(C=globalThis.litHtmlVersions)&&void 0!==C?C:globalThis.litHtmlVersions=[]).push("2.0.0");class st extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var n,s;const o=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let r=o._$litPart$;if(void 0===r){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=r=new K(e.insertBefore(E(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return D}}st.finalized=!0,st._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:st}),null===(it=globalThis.litElementPolyfillSupport)||void 0===it||it.call(globalThis,{LitElement:st}),(null!==(nt=globalThis.litElementVersions)&&void 0!==nt?nt:globalThis.litElementVersions=[]).push("3.0.0");const ot=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){window.customElements.define(t,e)}}})(t,e),rt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function at(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):rt(t,e)}function lt(t){return at({...t,state:!0})}const ht=1;const dt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}{constructor(t){var e;if(super(t),t.type!==ht||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var i,n;if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(i=this.et)||void 0===i?void 0:i.has(t))&&this.st.add(t);return this.render(e)}const s=t.element.classList;this.st.forEach((t=>{t in e||(s.remove(t),this.st.delete(t))}));for(const t in e){const i=!!e[t];i===this.st.has(t)||(null===(n=this.et)||void 0===n?void 0:n.has(t))||(i?(s.add(t),this.st.add(t)):(s.remove(t),this.st.delete(t)))}return D}});var ct="[^\\s]+";function ut(t,e){for(var i=[],n=0,s=t.length;n<s;n++)i.push(t[n].substr(0,e));return i}var _t=function(t){return function(e,i){var n=i[t].map((function(t){return t.toLowerCase()})),s=n.indexOf(e.toLowerCase());return s>-1?s:null}};function ft(t){for(var e=[],i=1;i<arguments.length;i++)e[i-1]=arguments[i];for(var n=0,s=e;n<s.length;n++){var o=s[n];for(var r in o)t[r]=o[r]}return t}var pt=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],mt=["January","February","March","April","May","June","July","August","September","October","November","December"],vt=ut(mt,3),gt={dayNamesShort:ut(pt,3),dayNames:pt,monthNamesShort:vt,monthNames:mt,amPm:["am","pm"],DoFn:function(t){return t+["th","st","nd","rd"][t%10>3?0:(t-t%10!=10?1:0)*t%10]}},yt=(ft({},gt),function(t){return+t-1}),$t=[null,"[1-9]\\d?"],Ct=[null,ct],bt=["isPm",ct,function(t,e){var i=t.toLowerCase();return i===e.amPm[0]?0:i===e.amPm[1]?1:null}],At=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(t){var e=(t+"").match(/([+-]|\d\d)/gi);if(e){var i=60*+e[1]+parseInt(e[2],10);return"+"===e[0]?i:-i}return 0}];_t("monthNamesShort"),_t("monthNames");function wt(){return(wt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}!function(){try{(new Date).toLocaleDateString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleString("i")}catch(t){return"RangeError"===t.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(t){return"RangeError"===t.name}}();var St,xt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(St||(St={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(xt||(xt={}));var Ht=function(t,e,i,n){n=n||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,t.dispatchEvent(s),s};const Et={silent:0,medium:1,turbo:2},kt={off:0,set:1,smart:2,continuous:3,dry:4},Vt=(t,e)=>kt[t]-kt[e],Mt=(t,e)=>Et[t]-Et[e],Lt=(t,e,i,n,s,o)=>{const r=[];(null==s?void 0:s.length)&&r.push((t=>s.includes(function(t){return t.substr(0,t.indexOf("."))}(t)))),o&&r.push((e=>t.states[e]&&o(t.states[e])));const a=((t,e,i)=>{(!i||i>t.length)&&(i=t.length);const n=[];for(let s=0;s<t.length&&n.length<i;s++){let i=!0;for(const n of e)if(!n(t[s])){i=!1;break}i&&n.push(t[s])}return n})(i,r,e);if(a.length<e&&n.length){const i=Lt(t,e-a.length,n,[],s,o);a.push(...i)}return a},Tt=t=>void 0===t.attributes.friendly_name?zt(t.entity_id).replace(/_/g," "):t.attributes.friendly_name||"",zt=t=>t.substr(t.indexOf(".")+1),Pt=/^(\w+)\.(\w+)$/,Ot=t=>Pt.test(t),Nt=(t,e=!0)=>{if(!t||!Array.isArray(t))throw new Error("Entities need to be an array");return t.map(((t,i)=>{if("object"==typeof t&&!Array.isArray(t)&&t.type)return t;let n;if("string"==typeof t)n={entity:t};else{if("object"!=typeof t||Array.isArray(t))throw new Error(`Invalid entity specified at position ${i}.`);if(!("entity"in t))throw new Error(`Entity object at position ${i} is missing entity field.`);n=t}if(e&&!Ot(n.entity))throw new Error(`Invalid entity ID at position ${i}: ${n.entity}`);return n}))};const Ut=["unavailable","unknown"],Rt={off:e,set:"M11 9C8.79 9 7 10.79 7 13S8.79 17 11 17 15 15.21 15 13 13.21 9 11 9M11 15C9.9 15 9 14.11 9 13S9.9 11 11 11 13 11.9 13 13 12.11 15 11 15M7 4H14C16.21 4 18 5.79 18 8V9H16V8C16 6.9 15.11 6 14 6H7C5.9 6 5 6.9 5 8V20H16V18H18V22H3V8C3 5.79 4.79 4 7 4M19 10.5C19 10.5 21 12.67 21 14C21 15.1 20.1 16 19 16S17 15.1 17 14C17 12.67 19 10.5 19 10.5",continuous:"M12,6V9L16,5L12,1V4A8,8 0 0,0 4,12C4,13.57 4.46,15.03 5.24,16.26L6.7,14.8C6.25,13.97 6,13 6,12A6,6 0 0,1 12,6M18.76,7.74L17.3,9.2C17.74,10.04 18,11 18,12A6,6 0 0,1 12,18V15L8,19L12,23V20A8,8 0 0,0 20,12C20,10.43 19.54,8.97 18.76,7.74Z",smart:"M13 3C16.9 3 20 6.1 20 10C20 12.8 18.4 15.2 16 16.3V21H9V18H8C6.9 18 6 17.1 6 16V13H4.5C4.1 13 3.8 12.5 4.1 12.2L6 9.7C6.2 5.9 9.2 3 13 3M13 1C8.4 1 4.6 4.4 4.1 8.9L2.5 11C1.9 11.8 1.9 12.8 2.3 13.6C2.7 14.3 3.3 14.8 4 14.9V16C4 17.9 5.3 19.4 7 19.9V23H18V17.5C20.5 15.8 22 13.1 22 10C22 5 18 1 13 1M14 14H12V13H14V14M15.6 9.5C15.3 9.9 15 10.3 14.5 10.6V12H11.5V10.6C10.1 9.8 9.6 7.9 10.4 6.5S13.1 4.6 14.5 5.4 16.4 8.1 15.6 9.5Z",dry:"M16,21H8A1,1 0 0,1 7,20V12.07L5.7,13.07C5.31,13.46 4.68,13.46 4.29,13.07L1.46,10.29C1.07,9.9 1.07,9.27 1.46,8.88L7.34,3H9C9,4.1 10.34,5 12,5C13.66,5 15,4.1 15,3H16.66L22.54,8.88C22.93,9.27 22.93,9.9 22.54,10.29L19.71,13.12C19.32,13.5 18.69,13.5 18.3,13.12L17,12.12V20A1,1 0 0,1 16,21"},It={off:"M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13",on:"M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5A7,7 0 0,1 19,12A7,7 0 0,1 12,19M13,17H11V7H13V17Z"},Dt={silent:"M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M17 15V17H18V23H20V15H17Z",medium:"M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M16 15V17H19V18H18C16.9 18 16 18.9 16 20V23H21V21H18V20H19C20.11 20 21 19.11 21 18V17C21 15.9 20.11 15 19 15H16Z",turbo:"M13 19C13 17.59 13.5 16.3 14.3 15.28C14.17 14.97 14.03 14.65 13.86 14.34C14.26 14 14.57 13.59 14.77 13.11C15.26 13.21 15.78 13.39 16.25 13.67C17.07 13.25 18 13 19 13C20.05 13 21.03 13.27 21.89 13.74C21.95 13.37 22 12.96 22 12.5C22 8.92 18.03 8.13 14.33 10.13C14 9.73 13.59 9.42 13.11 9.22C13.3 8.29 13.74 7.24 14.73 6.75C17.09 5.57 17 2 12.5 2C8.93 2 8.14 5.96 10.13 9.65C9.72 9.97 9.4 10.39 9.21 10.87C8.28 10.68 7.23 10.25 6.73 9.26C5.56 6.89 2 7 2 11.5C2 15.07 5.95 15.85 9.64 13.87C9.96 14.27 10.39 14.59 10.88 14.79C10.68 15.71 10.24 16.75 9.26 17.24C6.9 18.42 7 22 11.5 22C12.31 22 13 21.78 13.5 21.41C13.19 20.67 13 19.86 13 19M12 13C11.43 13 11 12.55 11 12S11.43 11 12 11C12.54 11 13 11.45 13 12S12.54 13 12 13M21 21V20.5C21 19.67 20.33 19 19.5 19C20.33 19 21 18.33 21 17.5V17C21 15.89 20.1 15 19 15H16V17H19V18H17V20H19V21H16V23H19C20.11 23 21 22.11 21 21"};console.info("%c midea-humidifier-card %c 1.0.5","color: cyan; background: black; font-weight: bold;","color: darkblue; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:"midea-humidifier-card",name:"Midea Humidifier Card",description:"Midea/Inventor Humidifier lovelace UI card"});let jt=class extends st{static async getConfigElement(){return await Promise.resolve().then((function(){return Ft})),document.createElement("midea-humidifier-card-editor")}static getStubConfig(t,e,i){const n=Lt(t,1,e,i,["humidifier"])||[];if(!n||!n[0].includes("."))return{type:"'custom:midea-humidifier-card'",entity:"",fan_entity:"",tank_entity:"",defrost_entity:"",filter_entity:"",humidity_entity:"",temperature_entity:"",ion_entity:"",swap_target_and_current_humidity:!0,show_ion_toggle:!0};const s=n[0].split(".")[1];return{type:"custom:midea-humidifier-card",entity:`humidifier.${s}`,fan_entity:`fan.${s}_fan`,tank_entity:`binary_sensor.${s}_tank_full`,defrost_entity:`binary_sensor.${s}_defrosting`,filter_entity:`binary_sensor.${s}_replace_filter`,humidity_entity:`sensor.${s}_humidity`,temperature_entity:`sensor.${s}_temperature`,ion_entity:`switch.${s}_ion_mode`,swap_target_and_current_humidity:!0,show_ion_toggle:!0}}getCardSize(){return 6}setConfig(t){if(!t.entity||"humidifier"!==t.entity.split(".")[0])throw new Error("Specify an entity from within the humidifier domain");if(!t.fan_entity||"fan"!==t.fan_entity.split(".")[0])throw new Error("Specify a fan_entity from within the fan domain");if(!t.humidity_entity||!t.temperature_entity)throw new Error("Humidity and temperature sensors entity are required for this card to function properly");this._config=this.autoWatchEntities(t)}autoWatchEntities(t){const{entities:e=[]}=t;Object.keys(t).map((i=>{i.includes("entity")&&(e.includes(t[i])||e.push(t[i]))}));return Object.assign(Object.assign({},t),{entities:e})}_lower(t){return null==t?void 0:t.toLowerCase()}_renderPowerIcon(t,e){if(!It[this._lower(t)])return R``;return R`
      <ha-icon-button
        class=${dt({"selected-icon":!(t!==e)})}
        .status=${t}
        @click=${this._handlePowerAction}
        tabindex="0"
        .path=${It[this._lower(t)]}
        .label=${this._lower(t)}
      >
      <ha-text>${t}</ha-text>
      </ha-icon-button>
    `}_renderFanIcon(t,e,i){const n=!(e!==t);return Dt[this._lower(t)]?R`
      <ha-icon-button
        class=${dt({"selected-icon":n&&!i})}
        .mode=${t}
        @click=${this._handleFanAction}
        tabindex="0"
        .path=${Dt[this._lower(t)]}
        .label=${this._lower(t)}
      >
      </ha-icon-button>
    `:R``}_renderIcon(t,e,i){const n=!(this._lower(e)!==this._lower(t));return Rt[this._lower(t)]?R`
      <ha-icon-button
        class=${dt({"selected-icon":n&&!i})}
        .mode=${t}
        @click=${this._handleAction}
        tabindex="0"
        .path=${Rt[this._lower(t)]}
        .label=${this._lower(t)}
      >
      </ha-icon-button>
    `:R``}_handlePowerAction(t){const e="on"===t.currentTarget.status?"turn_on":"turn_off";this.hass.callService("humidifier",e,{entity_id:this._config.entity})}_handleFanAction(t){this.hass.callService("fan","set_preset_mode",{entity_id:this._config.fan_entity,preset_mode:t.currentTarget.mode})}_handleToggleIonModeAction(){this.hass.callService("switch","toggle",{entity_id:this._config.ion_entity})}_handleAction(t){this.hass.callService("humidifier","set_mode",{entity_id:this._config.entity,mode:t.currentTarget.mode})}_getWarningText(t){return R`<div>
      ${t.tank?R`<hui-warning>${a("common.tank_is_full")}</hui-warning>`:R``}
      ${t.defrost?R`<hui-warning>${a("common.defrosting")}</hui-warning>`:R``}
      ${t.filter?R`<hui-warning>${a("common.change_airfilter")}</hui-warning>`:R``}
    </div>`}_get(t,e){return e.reduce(((t,e)=>t&&"undefined"!==t[e]?t[e]:void 0),t)}_readHassState(t){const e=this._get(this,["_config",t]);if(e){return this._get(this,["hass","states",e])}}render(){var t,i,n,s,o,r,a,l;if(!this.hass||!this._config)return R``;const h=this._readHassState("entity"),d=this._readHassState("fan_entity"),c=this._readHassState("tank_entity"),u=this._readHassState("filter_entity"),_=this._readHassState("defrost_entity"),f=this._readHassState("ion_entity"),p=this._lower(null===(t=null==h?void 0:h.attributes)||void 0===t?void 0:t.mode)in Rt?null===(i=null==h?void 0:h.attributes)||void 0===i?void 0:i.mode:"unknown-mode",m=this._lower(null===(n=null==d?void 0:d.attributes)||void 0===n?void 0:n.preset_mode)in Dt?null===(s=null==d?void 0:d.attributes)||void 0===s?void 0:s.preset_mode:"unknown-fan-mode",v=this.hass.states[this._config.humidity_entity].state,g=h.state,y=!("off"!==g),$=this.hass.states[this._config.temperature_entity].state,C=parseFloat($);if(!h)return R`
        <hui-warning>
          ${b=this.hass,A=this._config.entity,"NOT_RUNNING"!==b.config.state?b.localize("ui.panel.lovelace.warning.entity_not_found","entity",A||"[empty]"):b.localize("ui.panel.lovelace.warning.starting")}
        </hui-warning>
      `;var b,A;const w=!0===this._config.swap_target_and_current_humidity,S=this._config.name||Tt(this.hass.states[this._config.entity]),x=null!==h.attributes.humidity&&Number.isFinite(Number(h.attributes.humidity))?h.attributes.humidity:h.attributes.min_humidity,H=function(t){return function(t){var e=t.locale.language||"en";return t.translationMetadata.translations[e]&&t.translationMetadata.translations[e].isRTL||!1}(t)?"rtl":"ltr"}(this.hass),E=Ut.includes(h.state)||y?R` 
          <round-slider 
            .min=${h.attributes.min_humidity||0} 
            .max=${h.attributes.max_humidity||100} 
            .value=${x} 
            disabled="true">
          </round-slider>`:R`
          <round-slider
            .value=${x}
            .min=${h.attributes.min_humidity||0}
            .max=${h.attributes.max_humidity||100}           
            .rtl=${"rtl"===H}
            step="5"
            @value-changing=${this._dragEvent}
            @value-changed=${this._setTargetHumidity}>
          </round-slider>
        `,k=I`
      <svg viewBox="0 0 40 20">
        <text
          x="50%"
          dx="1"
          y="60%"
          text-anchor="middle"
          style="font-size: 13px;"
        >
          ${this._targetHumidity&&!isNaN(this._targetHumidity)?I`${w?R`${null===(o=this._currentHumidity)||void 0===o?void 0:o.toFixed()}`:R`${this._targetHumidity.toFixed()}`}
              <tspan dx="-3" dy="-6.5" style="font-size: 4px;">
                %
              </tspan>
              `:""}
        </text>
      </svg>
    `,V=I`
    <svg id="set-values">
      <g>
        <text text-anchor="middle" class="set-value">
        ${Ut.includes(v)||void 0===this._currentHumidity||null===this._currentHumidity?"":I`
                    ${w?null===(r=this._targetHumidity)||void 0===r?void 0:r.toFixed():this._currentHumidity.toFixed()}% - ${$?C:""}°C
                    `}
        </text>
        <text
            dy="22"
            text-anchor="middle"
            id="set-mode"
          >
            ${this.hass.localize(`state.default.${h.state}`)}
            ${h.attributes.mode&&!Ut.includes(h.state)?R`
                    -
                    ${this.hass.localize(`state_attributes.humidifier.mode.${h.attributes.mode}`)||h.attributes.mode}
                  `:""}
          </text>
      </g>
    </svg>
    `,M={tank:"on"===(null==c?void 0:c.state),defrost:"on"===(null==_?void 0:_.state),filter:"on"===(null==u?void 0:u.state)},L="on"===(null==c?void 0:c.state)||"on"===(null==_?void 0:_.state)||"on"===(null==u?void 0:u.state)||!1;return R`
      <ha-card
        class=${dt({[L?"error":p]:!0})}
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
              ${E}
              <div id="slider-center">
                <div id="humidity">${k} ${V}</div>
              </div>
            </div>
          </div>
          <div id="info" .title=${S}>
            <div id="modes">
              ${(h.attributes.available_modes||[]).concat().sort(Vt).map((t=>this._renderIcon(t,p,y)))}
              ${(null==M?void 0:M.defrost)?R`<ha-icon-button
                  class=${dt({"defrost-icon":M.defrost&&!y})}
                  tabindex="0"                  
                  .path=${"M8 17.85C8 19.04 7.11 20 6 20S4 19.04 4 17.85C4 16.42 6 14 6 14S8 16.42 8 17.85M16.46 12V10.56L18.46 9.43L20.79 10.05L21.31 8.12L19.54 7.65L20 5.88L18.07 5.36L17.45 7.69L15.45 8.82L13 7.38V5.12L14.71 3.41L13.29 2L12 3.29L10.71 2L9.29 3.41L11 5.12V7.38L8.5 8.82L6.5 7.69L5.92 5.36L4 5.88L4.47 7.65L2.7 8.12L3.22 10.05L5.55 9.43L7.55 10.56V12H2V13H22V12H16.46M9.5 12V10.56L12 9.11L14.5 10.56V12H9.5M20 17.85C20 19.04 19.11 20 18 20S16 19.04 16 17.85C16 16.42 18 14 18 14S20 16.42 20 17.85M14 20.85C14 22.04 13.11 23 12 23S10 22.04 10 20.85C10 19.42 12 17 12 17S14 19.42 14 20.85Z"}
                  .label=${"Defrost"}                
                  ></ha-icon-button>`:R``} 
            </div>
            <div id="modes">
              ${!0===(null===(a=this._config)||void 0===a?void 0:a.show_ion_toggle)?R`<ha-icon-button
                  class=${dt({"ion-icon":"on"===f.state&&!y})}
                  tabindex="0"  
                  @click=${this._handleToggleIonModeAction}                
                  .path=${"on"===f.state?"M11,9A4,4 0 0,1 15,13A4,4 0 0,1 11,17A4,4 0 0,1 7,13A4,4 0 0,1 11,9M11,11A2,2 0 0,0 9,13A2,2 0 0,0 11,15A2,2 0 0,0 13,13A2,2 0 0,0 11,11M7,4H14A4,4 0 0,1 18,8V9H16V8A2,2 0 0,0 14,6H7A2,2 0 0,0 5,8V20H16V18H18V22H3V8A4,4 0 0,1 7,4M16,11C18.5,11 18.5,9 21,9V11C18.5,11 18.5,13 16,13V11M16,15C18.5,15 18.5,13 21,13V15C18.5,15 18.5,17 16,17V15Z":e}
                  .label=${"Ion"}                
                  ></ha-icon-button>`:R``}                
              ${((null===(l=null==d?void 0:d.attributes)||void 0===l?void 0:l.preset_modes)||[]).concat().sort(Mt).map((t=>this._renderFanIcon(t,m,y)))}
              ${this._renderPowerIcon("off"===g?"on":"off",g)}             
            </div>          
            ${S}
          </div>
        </div>
        <div id="warnings">
          ${L?this._getWarningText(M):R``}
        </div> 
      </ha-card>
    `}shouldUpdate(t){return function(t,e){if(function(t,e){if(e.has("_config"))return!0;const i=e.get("hass");return!i||i.connected!==t.hass.connected||i.themes!==t.hass.themes||i.locale!==t.hass.locale||i.localize!==t.hass.localize||i.config.state!==t.hass.config.state}(t,e))return!0;const i=e.get("hass");return Nt(t._config.entities,!1).some((e=>"entity"in e&&i.states[e.entity]!==t.hass.states[e.entity]))}(this,t)}updated(t){if(super.updated(t),!this._config||!this.hass||!t.has("hass")&&!t.has("_config"))return;const e=t.get("hass"),i=t.get("_config");e&&i&&e.themes===this.hass.themes&&i.theme===this._config.theme||function(t,e,i,n){void 0===n&&(n=!1),t._themes||(t._themes={});var s=e.default_theme;("default"===i||i&&e.themes[i])&&(s=i);var o=wt({},t._themes);if("default"!==s){var r=e.themes[s];Object.keys(r).forEach((function(e){var i="--"+e;t._themes[i]="",o[i]=r[e]}))}if(t.updateStyles?t.updateStyles(o):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,o),n){var a=document.querySelector("meta[name=theme-color]");if(a){a.hasAttribute("default-content")||a.setAttribute("default-content",a.getAttribute("content"));var l=o["--primary-color"]||a.getAttribute("default-content");a.setAttribute("content",l)}}}(this,this.hass.themes,this._config.theme);const n=this.hass.states[this._config.entity];if(!n)return;const s=this.hass.states[this._config.fan_entity];s&&(e&&e.states[this._config.entity]===n&&e.states[this._config.fan_entity]===s||this._rescale_svg())}willUpdate(t){if(!this.hass||!this._config||!t.has("hass"))return;const e=this.hass.states[this._config.entity];if(!e)return;const i=this.hass.states[this._config.humidity_entity];if(!i)return;const n=t.get("hass");n&&n.states[this._config.entity]===e||(this._targetHumidity=this._getTargetHumidity(e)),n&&n.states[this._config.humidity_entity]===e||(this._currentHumidity=this._getCurrentHumidity(i))}_rescale_svg(){this.shadowRoot&&this.shadowRoot.querySelector("ha-card")&&this.shadowRoot.querySelector("ha-card").updateComplete.then((()=>{const t=this.shadowRoot.querySelector("#set-values"),e=t.querySelector("g").getBBox();t.setAttribute("viewBox",`${e.x} ${e.y} ${e.width} ${e.height}`),t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`)}))}_getTargetHumidity(t){if(!Ut.includes(t.state))return t.attributes.humidity}_dragEvent(t){this._targetHumidity=t.detail.value}_setTargetHumidity(t){this.hass.callService("humidifier","set_humidity",{entity_id:this._config.entity,humidity:t.detail.value})}_getCurrentHumidity(t){if(!Ut.includes(t.state)&&!isNaN(parseFloat(t.state)))return parseFloat(t.state)}_handleMoreInfo(){Ht(this,"hass-more-info",{entityId:this._config.entity})}static get styles(){return u`
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

      #warnings {
        padding: 16px;
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
        color: var(--mode-color);
      }        

      text {
        fill: var(--primary-text-color);
      }
    `}};t([at({attribute:!1})],jt.prototype,"hass",void 0),t([lt()],jt.prototype,"_config",void 0),t([lt()],jt.prototype,"_targetHumidity",void 0),t([lt()],jt.prototype,"_currentHumidity",void 0),jt=t([ot("midea-humidifier-card")],jt);let Bt=class extends st{constructor(){super(...arguments),this._initialized=!1}setConfig(t){this._config=t,this.loadCardHelpers()}shouldUpdate(){return this._initialized||this._initialize(),!0}get _name(){var t;return(null===(t=this._config)||void 0===t?void 0:t.name)||""}get _entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.entity)||""}get _fan_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.fan_entity)||""}get _humidity_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.humidity_entity)||""}get _temperature_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.temperature_entity)||""}get _ion_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.ion_entity)||""}get _defrost_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.defrost_entity)||""}get _filter_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.filter_entity)||""}get _tank_entity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.tank_entity)||""}get _show_ion_toggle(){var t;return(null===(t=this._config)||void 0===t?void 0:t.show_ion_toggle)||!1}get _swap_target_and_current_humidity(){var t;return(null===(t=this._config)||void 0===t?void 0:t.swap_target_and_current_humidity)||!1}render(){if(!this.hass||!this._helpers)return R``;this._helpers.importMoreInfoControl("climate");const t=["sensor"],e=["binary_sensor"];return R`
      <div class="card-config">
        <ha-entity-picker
            .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ${this.hass.localize("ui.panel.lovelace.editor.card.humidifier.name")}"
            .hass=${this.hass}
            .value=${this._entity}
            .configValue=${"entity"}
            .includeDomains=${["humidifier"]}
            @change=${this._valueChanged}
            allow-custom-entity
          ></ha-entity-picker>
          <ha-entity-picker
            .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ${this.hass.localize("state_attributes.climate.hvac_action.fan")}"
            .hass=${this.hass}
            .value=${this._fan_entity}
            .configValue=${"fan_entity"}
            .includeDomains=${["fan"]}
            @change=${this._valueChanged}
            allow-custom-entity
          ></ha-entity-picker>          
          <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ${this.hass.localize("ui.card.weather.attributes.humidity")}"
          .hass=${this.hass}
          .value=${this._humidity_entity}
          .configValue=${"humidity_entity"}
          .includeDomains=${t}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ${this.hass.localize("ui.card.weather.attributes.temperature")}"
          .hass=${this.hass}
          .value=${this._temperature_entity}
          .configValue=${"temperature_entity"}
          .includeDomains=${t}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} (${this.hass.localize("ui.panel.lovelace.editor.card.config.required")}) - ION Switch"
          .hass=${this.hass}
          .value=${this._ion_entity}
          .configValue=${"ion_entity"}
          .includeDomains=${["switch"]}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>        
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} - ${a("common.tank")}"
          .hass=${this.hass}
          .value=${this._tank_entity}
          .configValue=${"tank_entity"}
          .includeDomains=${e}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} - ${a("common.defrost")}"
          .hass=${this.hass}
          .value=${this._defrost_entity}
          .configValue=${"defrost_entity"}
          .includeDomains=${e}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>  
        <ha-entity-picker
          .label="${this.hass.localize("ui.panel.lovelace.editor.card.generic.entity")} - ${a("common.filter")}"
          .hass=${this.hass}
          .value=${this._filter_entity}
          .configValue=${"filter_entity"}
          .includeDomains=${e}
          @change=${this._valueChanged}
          allow-custom-entity
        ></ha-entity-picker>                                           
        <ha-formfield .label=${"Toggle ion toggle icon "+(this._show_ion_toggle?"off":"on")}>
          <ha-switch
            .checked=${!1!==this._show_ion_toggle}
            .configValue=${"show_ion_toggle"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>
        <ha-formfield .label=${"Toggle swap current and target humidity display "+(this._swap_target_and_current_humidity?"off":"on")}>
          <ha-switch
            .checked=${!1!==this._swap_target_and_current_humidity}
            .configValue=${"swap_target_and_current_humidity"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>                                
      </div>
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(this[`_${e.configValue}`]!==e.value){if(e.configValue)if(""===e.value){const t=Object.assign({},this._config);delete t[e.configValue],this._config=t}else this._config=Object.assign(Object.assign({},this._config),{[e.configValue]:void 0!==e.checked?e.checked:e.value});Ht(this,"config-changed",{config:this._config})}}static get styles(){return u`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `}};t([at({attribute:!1})],Bt.prototype,"hass",void 0),t([lt()],Bt.prototype,"_config",void 0),t([lt()],Bt.prototype,"_helpers",void 0),Bt=t([ot("midea-humidifier-card-editor")],Bt);var Ft=Object.freeze({__proto__:null,get MideaHumidifierCardEditor(){return Bt}});export{jt as MideaHumidifierCard,zt as computeObjectId,Tt as computeStateName,Lt as findEntities,Ot as isValidEntityId,Nt as processConfigEntities};

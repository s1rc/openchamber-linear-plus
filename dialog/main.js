(()=>{var D,Yo,Ki,Le,fn,kt,Qo,At,Zo,mn,_n,zi,ot=Symbol.for("pv"),It={},Ct=[],qi=/^m(i|n|o|s|text|space)$/,En=Array.isArray,er=Ct.slice,je=Object.assign;function He(e){e&&e.parentNode&&e.remove()}function Rt(e,t,n,o,r){var s={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:ot,__v:r||++Yo,__i:-1,__u:0};return!r&&D.vnode&&D.vnode(s),s}function ge(e){return e.children}function Ot(e,t){this.props=e,this.context=t,this.__g=0}function De(e,t){if(t==null)return e.__&&De(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:De(e)}function Ji(e){var t,n=e.__v,o=n.__e,r=[],s=[],i=e.__P;i&&((t=je({constructor:ot},n)).__v=n.__v+1,D.vnode&&D.vnode(t),hn(i,t,n,e.__n,i.namespaceURI,32&n.__u?[o]:null,r,o||De(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,ir(r,t,s),n.__=n.__e=null,t.__e!=o&&tr(t))}function tr(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),tr(e)}function qo(e){(8&e.__g||(e.__g|=8,Le.push(e),kt++))&&fn==D.debounceRendering||((fn=D.debounceRendering)||queueMicrotask)(nr)}function nr(){try{for(var e,t=1;Le.length;)Le.length>t&&Le.sort(Qo),e=Le.shift(),t=Le.length,8&e.__g&&Ji(e)}finally{(kt=Le.length)&&(fn||queueMicrotask)(nr)}}function or(e,t,n,o,r,s,i,a,u,_,p){var h,m,d,E,y,O,T=o.__k||Ct,x=t.length;for(u=Yi(n,t,T,u,x),h=0;h<x;h++)(d=n.__k[h])!=null&&(m=~d.__i&&T[d.__i]||It,d.__i=h,O=hn(e,d,m,r,s,i,a,u,_,p),E=d.__e,(m.ref!=d.ref||8&m.__u)&&(m.ref&&Sn(m.ref,null,d,m),d.ref&&p.push(d.ref,d.__c||E,d)),y=y||E,4&d.__u?(u=rr(d,u,e,!m.__v),m.__e&&(m.__e=null)):typeof d.type=="function"&&O!==void 0?u=O:E&&(u=E.nextSibling),d.__u&=-21);return n.__e=y,u}function Yi(e,t,n,o,r){var s,i,a,u,_,p,h,m,d,E=n.length,y=E,O=0,T=0,x=e.__k=Array(r);for(s=0;s<r;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=x[s]=Rt(null,i):En(i)?i=x[s]=Rt(ge,{children:i}):i.constructor===ot&&i.__b?i=x[s]=Rt(i.type,i.props,i.key,i.ref,i.__v):x[s]=i,u=s+O,i.__=e,i.__b=e.__b+1,a=null,~(_=i.__i=Qi(i,n,u,y))&&(y--,(a=n[_])&&(a.__u|=2)),a&&a.__v?(i.__u|=16,_==u-1?O--:_==u+1?O++:_!=u&&(_>u?O--:O++,T=1)):(~_||(r>E?O--:r<E&&O++),typeof i.type!="function"&&(i.__u|=4))):x[s]=null;if(T){for(p=[],h=[],s=0;s<r;s++)if((i=x[s])&&16&i.__u){for(O=0,m=p.length;O<m;)p[d=O+m>>1]<i.__i?O=d+1:m=d;p[O]=i.__i,h[s]=O+1}for(O=p.length;s--;)h[s]&&(h[s]==O?O--:x[s].__u|=4)}if(y)for(s=0;s<E;s++)!(a=n[s])||2&a.__u||(a.__e==o&&(o=De(a)),Tn(a,a));return o}function rr(e,t,n,o){var r,s,i,a;if(typeof e.type=="function"){if(e.props.__P)return t;if(r=e.__k)for(s=0;s<r.length;s++)r[s]&&(r[s].__=e,t=rr(r[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=De(e))&&!t.parentNode&&(t=null),i=e.__e,a=t;a&&a.nodeType==8;)a=a.nextSibling;for(i!=a&&(!o&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Qi(e,t,n,o){var r,{key:s,type:i}=e,a=t[n],u=a&&!(2&a.__u);if(a===null&&s==null||u&&s==a.key&&i==a.type)return n;if(o>(u?1:0)){for(r=n-1;r>=0;r--)if((a=t[r])&&!(2&a.__u)&&s==a.key&&i==a.type)return r;for(r=n+1;r<t.length;r++)if((a=t[r])&&!(2&a.__u)&&s==a.key&&i==a.type)return r}return-1}function Jo(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function xt(e,t,n,o,r){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||Jo(e.style,t);if(n)for(t in n)o&&n[t]==o[t]||Jo(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof o!="function"&&(o=null),(e.__e||(e.__e={}))[t]=n,n&&o||(i=_n[t]||(_n[t]=Zi(t)),(e.__a||(e.__a={}))[t]=mn,s=t!=(t=t.replace(Zo,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(a){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function Zi(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[At]==null)t[At]=mn++;else if(t[At]<this.__a[e])return;return n(D.event?D.event(t):t)}}}function hn(e,t,n,o,r,s,i,a,u,_){var p,h,m,d,E,y,O,T,x,A,M,q,te,L,J,ue,ne,V,S=t.type;if(t.constructor!==ot)return null;128&n.__u&&(u=32&n.__u,p=n.__c.__z)&&(t.__u|=u,h=s=[],p.nodeType==8?a=bt(p,s):s.push(p),a=s[0]||a),(p=D.__b)&&p(t);e:if(typeof S=="function"){m=i.length;try{if(T=t.props,x=(p=S.prototype)&&p.render,A=(p=S.contextType)&&o[p.__c],M=p?A?A.props.value:p.__:o,(d=n.__c)?(t.__c=d,2&d.__g&&(d.__g|=1)):(x?t.__c=d=new S(T,M):(t.__c=d=new Ot(T,M),d.constructor=S,d.render=ta),A&&A.sub(d),d.state||(d.state={}),d.__n=o,d.__g|=8,d.__h=[],d.__k=[]),x&&(d.__s||(d.__s=d.state),S.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=je({},d.__s)),je(d.__s,S.getDerivedStateFromProps(T,d.__s)))),E=d.props,y=d.state,d.__v=t,n.__c){if(T!==E&&x&&!S.getDerivedStateFromProps&&d.componentWillReceiveProps&&d.componentWillReceiveProps(T,M),t.__v==n.__v&&!(8&d.__g)||!(4&d.__g)&&d.shouldComponentUpdate&&d.shouldComponentUpdate(T,d.__s,M)===!1){t.__v!=n.__v&&(d.props=T,d.state=d.__s,d.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(g){g&&(g.__=t)}),Ct.push.apply(d.__h,d.__k),d.__k=[],d.__h.length&&i.push(d),a=De(n);break e}d.componentWillUpdate&&d.componentWillUpdate(T,d.__s,M),x&&d.componentDidUpdate&&d.__h.push(function(){d.componentDidUpdate(E,y,O)})}else x&&!S.getDerivedStateFromProps&&d.componentWillMount&&d.componentWillMount(),x&&d.componentDidMount&&d.__h.push(d.componentDidMount);d.context=M,d.props=T,d.__P=e,d.__g&=-5,q=D.__r,te=x?25:0;do d.__g&=-9,q&&q(t),p=d.render(d.props,d.state=d.__s,d.context);while(8&d.__g&&++te<25);x&&(Ct.push.apply(d.__h,d.__k),d.__k=[]),d.state=d.__s,d.getChildContext&&(o=je({},o,d.getChildContext())),x&&n.__c&&d.getSnapshotBeforeUpdate&&(O=d.getSnapshotBeforeUpdate(E,y)),L=p&&p.type===ge&&p.key==null?p.props.children:p,T.__P&&(p=a,r=(e=T.__P).namespaceURI,u=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(g){g&&Tn(g,g)}),n.__k=null),a=n.__k?De(n,0):null),a=or(e,En(L)?L:[L],t,n,o,r,s,i,a,u,_),T.__P&&(t.__e=null,a=p),t.__u&=-161,h&&h.some(He),d.__h.length&&i.push(d),1&d.__g&&(d.__g&=-4)}catch(g){if(i.length=m,t.__v=null,u||s)if(g&&g.then){if(t.__u|=128|u,s){for(~(ne=s.indexOf(a||void 0))||(ne=s.length);(V=s[ne-1])&&V.nodeType==8;)ne--;for(;ne<s.length;ne++)if(V=s[ne])if(s[ne]=null,J){if(V==ue)break}else{if(V.nodeType!=8)break;V.data.startsWith("$s")&&(ue=bt(J=V))}}if(!J){for(;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;J=a}(p=bt(J=t.__c.__z||(t.__c.__z=J)))?(t.__e=J,a=p):t.__e=a,a=a&&a.nextSibling}else s&&s.some(He);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),g&&g.then||sr(t),D.__e(g,t,n)}}else a=t.__e=ea(n.__e,t,n,o,r,s,i,u,_,e);return(p=D.diffed)&&p(t),a}function bt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function sr(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(sr))}function ir(e,t,n){for(var o=0;o<n.length;)Sn(n[o++],n[o++],n[o++]);D.__c&&D.__c(t,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(s){s.call(r)})}catch(s){D.__e(s,r.__v)}})}function ea(e,t,n,o,r,s,i,a,u,_){var p,h,m,d,E,y,O,T,x=n.props||It,{props:A,type:M}=t;if(M=="svg"?r="http://www.w3.org/2000/svg":M=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((E=s[p])&&(M?E.localName==M:E.nodeType==3)){e=E,s[p]=null;break}}if(!e){if(T=_.ownerDocument||document,!M)return T.createTextNode(A);e=T.createElementNS(r,M,A.is?A:_),a&&(D.__m&&D.__m(t,s),a=!1),s=null}if(M){if(_=M=="template"&&e.content||e,s=M=="textarea"&&A.defaultValue!=null?null:s&&er.call(_.childNodes),!a&&s)for(x={},p=0;p<e.attributes.length;p++)x[(E=e.attributes[p]).name]=E.value;for(p in x)E=x[p],p=="dangerouslySetInnerHTML"?m=E:p=="children"||(p in A)||p=="value"&&("defaultValue"in A)||p=="checked"&&("defaultChecked"in A)||xt(e,p,null,E,r);for(p in A)E=A[p],p=="children"?d=E:p=="dangerouslySetInnerHTML"?h=E:p=="value"?y=E:p=="checked"?O=E:a&&typeof E!="function"||x[p]===E||xt(e,p,E,x[p],r);h?(a||m&&(h.__html==m.__html||h.__html==e.innerHTML)||(e.innerHTML=h.__html),t.__k=[]):(m&&(e.textContent=""),(M=="foreignObject"||r=="http://www.w3.org/1998/Math/MathML"&&qi.test(M))&&(r="http://www.w3.org/1999/xhtml"),or(_,En(d)?d:[d],t,n,o,r,s,i,s?s[0]:n.__k&&De(n,0),a,u),s&&s.some(He)),a&&M!="textarea"||(p="value",M=="progress"&&y==null?e.removeAttribute(p):y==null||y===e[p]&&(M!="progress"||y)||xt(e,p,y,x[p],r),p="checked",O!=null&&O!=e[p]&&xt(e,p,O,x[p],r))}else x===A||a&&e.data==A||(e.data=A);return e}function Sn(e,t,n,o){try{typeof e=="function"?t?t.__x=e(t)||1:o&&(o=o.__c||o.__e)&&(t=o.__x)&&(o.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(r){D.__e(r,n)}}function Tn(e,t,n){var o,r,s,i;if(D.unmount&&D.unmount(e),!(o=e.ref)||o.current&&o.current!=e.__e||Sn(o,null,t,e),o=e.__c){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(a){D.__e(a,t)}o.__P=o.__n=null}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&Tn(o[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(o=e.__c)&&(o=o.__z)&&(r=bt(o,s=[]))&&(o==e.__e&&s.some(He),He(r),He(o)),n||He(e.__e),e.__e=e.__c=e.__=null}function ta(e,t,n){return this.constructor(e,n)}function ar(e,t){var n,o,r,s;D.__&&D.__(e,t),t.nodeType==9&&(t=t.documentElement),o=(n=e&&32&e.__u)?null:t.__k,t.__k=Rt(ge,{children:[e]}),r=[],s=[],hn(t,t.__k,o||It,It,t.namespaceURI,o?null:t.firstChild?er.call(t.childNodes):null,r,o?o.__e:t.firstChild,n,s),ir(r,t.__k,s),t.__k.props.children=null}D={__e:function(e,t,n,o){for(var r,s,i;t=t.__;)if((r=t.__c)&&!(1&r.__g)){r.__g|=4;try{if((i=(s=r.constructor)&&s.getDerivedStateFromError)&&r.setState(s.getDerivedStateFromError(e)),r.componentDidCatch&&(r.componentDidCatch(e,o||{}),i=1),i&&8&r.__g)return void(r.__g|=2)}catch(a){e=a}}throw kt=0,e}},Yo=0,Ki=function(e){return e!=null&&e.constructor===ot},Ot.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=je({},this.state)),typeof e=="function"&&(e=e(je({},n),this.props)),e&&(je(n,e),this.__v&&(t&&this.__k.push(t),qo(this)))},Ot.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),qo(this))},Ot.prototype.render=ge,Le=[],kt=0,Qo=function(e,t){return e.__v.__b-t.__v.__b},At=Symbol(),Zo=/(PointerCapture)$|Capture$/i,mn=0,_n={},zi=0;var U="openchamber.sdk",N=1;var gn=`
:root {
  /* Quiet at rest like the app's own thumbs; hover gives a clear grab target. */
  --oc-scrollbar-thumb: color-mix(in srgb, var(--oc-muted, currentColor) 18%, transparent);
  --oc-scrollbar-thumb-hover: color-mix(in srgb, var(--oc-muted, currentColor) 36%, transparent);
  scrollbar-gutter: stable;
}
* {
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}
:hover, [data-oc-scrolling] {
  scrollbar-color: var(--oc-scrollbar-thumb) transparent;
}
/* Chromium's standard scrollbar properties otherwise override its pseudo-elements. */
@supports selector(::-webkit-scrollbar) {
  *, :hover, [data-oc-scrolling] { scrollbar-width: auto; scrollbar-color: auto; }
  ::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 999px;
    min-width: 24px;
    min-height: 24px;
  }
  :hover::-webkit-scrollbar-thumb, [data-oc-scrolling]::-webkit-scrollbar-thumb { background: var(--oc-scrollbar-thumb); }
  ::-webkit-scrollbar-thumb:hover { background: var(--oc-scrollbar-thumb-hover); }
  ::-webkit-scrollbar-corner { background: transparent; }
  ::-webkit-scrollbar-button { display: none; width: 0; height: 0; }
}
@media (forced-colors: active) {
  *, :hover, [data-oc-scrolling] { scrollbar-color: auto; }
  ::-webkit-scrollbar-thumb, ::-webkit-scrollbar-thumb:hover { background: CanvasText; }
}
`;function yn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(o)=>{let r=o.target===e?t:o.target;if(!(r instanceof Element))return;if(!r.hasAttribute("data-oc-scrolling"))r.setAttribute("data-oc-scrolling","");let s=n.get(r);if(s!==void 0)clearTimeout(s);n.set(r,setTimeout(()=>{n.delete(r),r.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var na=`(${yn.toString()})(document);`;var xn=128,An=65536;var vt=128;var wt=65536;var ur=/^[a-z][a-z0-9-]{0,39}$/;var cr=(e)=>Object(e)===e&&!Array.isArray(e),Rn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),lr=(e)=>String(e)===e&&e.length>=1&&e.length<=60,dr=(e)=>String(e)===e&&e.length>=1&&e.length<=80,pr=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!cr(n)||!ur.test(n.id)||!lr(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Rn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Rn(n,["kind","id","label","value","options","disabled"]))return!1;if(!dr(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let o=new Set;for(let r of n.options){if(!cr(r)||!Rn(r,["value","label"])||!dr(r.value)||!lr(r.label)||o.has(r.value))return!1;o.add(r.value)}if(!o.has(n.value))return!1}return!0};var fr=["{id}","{segment}","{segments+}"];var Lc=new Set(fr);var _r=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var $c=new Set(_r);var Mt=20000000,Pt=256;var On=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,mr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var Er=/^[A-Za-z0-9_-]{1,80}$/;var hr=["left","right","top","bottom"];var Sr=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let o=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of o)if(!Sr(r,t+1,n))return!1;return!0},bn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(bn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(bn)}return String(e)===e||Number.isFinite(e)},kn=(e)=>{try{if(String(e.id)!==e.id||!Er.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!hr.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Sr(e.data)||!bn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Cn=2000;var gr=["file","directory","other","missing"],vn=(e)=>Boolean(e&&"sessionId"in e),wn=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var yr=/^[0-9a-f]{7,64}$/i,Mn=(e)=>yr.test(e),Ut=500,Nt=32000,xr=16000,Ar=128,Rr=200,Or=2000,br=16000,kr=80,Ir=200,Cr=16000;var vr=2000;var Pn=20000,Lt=1024,Dt=2000000;var $t=64000,Gt=8000,Un=4000;var Nn=960000;var wr=999,Mr=1e4,rt=500,Pr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Ur=["stopped","starting","ready","failed"],ra=new Set(Pr),Nr=(e)=>ra.has(e),Lr=(e)=>e&&Nr(e)?e:"HOST_REJECTED",ze=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ze);if(Object(e)===e)return Object.values(e).every(ze);return!1},Dr=(e)=>ze(e)&&JSON.stringify(e).length<=Cr,Tr=(e)=>e?.trim().slice(0,Ir)??"",qe=(e)=>{let t=e.id.trim().slice(0,Ar),n=e.title.trim().slice(0,Rr),o=e.url.trim().slice(0,Or),r=e.text?.trim().slice(0,br),s=e.author?.trim().slice(0,kr),i=e.kind==="pull"?"pull":"issue",a={providerId:e.providerId.trim(),id:t,title:n||t,url:o,kind:i};if(r)a.text=r;if(s)a.author=s;if(i==="pull"){let u=Tr(e.branches?.head),_=Tr(e.branches?.base);if(u&&_)a.branches={head:u,base:_}}if(Dr(e.data))a.data=e.data;return a},Ln=(e)=>{let t=qe(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Dn=(e)=>{let t={text:e.text.trim().slice(0,xr)};if(e.send)t.send=!0;return t},$n=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(wr,Math.max(0,Math.round(e)))},Gn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Mr,Math.max(0,Math.ceil(e)))};var Je=(e)=>e.length>0&&e.length<=Lt&&!e.includes("\x00")&&!e.includes("\\");var Ht=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>vr)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},sa=new Set(Ur),Hn=(e)=>Boolean(e&&"status"in e&&sa.has(String(e.status))&&!("body"in e)),jt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),jn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Vn=(e)=>Boolean(e&&"written"in e&&e.written===!0),Bn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),ia=new Set(gr),Fn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&ia.has(String(e.kind))&&Number.isFinite(e.size)),Xn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),aa=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ca=(e)=>Object(e)===e?e:null,In=(e)=>String(e)===e&&e.length>0,la=(e)=>{if(!In(e.id))return null;if(e.ok===!0){let t={channel:U,v:N,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&In(e.error))return{channel:U,v:N,type:"result",id:e.id,ok:!1,error:e.error,code:Lr(In(e.code)?e.code:void 0)};return null},Wn=(e)=>{let t=ca(e);if(!t||t.channel!==U||t.v!==N)return null;if(t.type==="result")return la(t);if(!aa.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var $r=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),da=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class k extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var Gr=()=>Promise.reject(new k("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Vt=()=>Promise.reject(new k("BAD_PATH",`File path must be 1 to ${Lt} characters without NUL or backslash.`)),Bt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new k("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},P=(e)=>(e.value+=1,`oc-${e.value}`),Kn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new k("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((c)=>c===t.parent),o=e.requestTimeoutMs??Pn,r=new Set,s=new Set,i=new Set,a=new Set,u=new Set,_=new Set,p=new Set,h=new Set,m=new Set,d=new Set,E=new Set,y=new Set,O=[],T=null,x=null,A=new Set,M=new Set,q=null,te=null,L=!1,J=new Map,ue=new Map,ne=new Map,V=!1,S={value:0},g=null,Ae=null,Ie=!1,Ne=!1,et=null,tt=(c)=>{if(!c)return null;return{sessionId:c.id,phase:c.busy?"started":"completed"}},fe=(c)=>{t.parent.postMessage(c,"*")},ht=()=>{if(V||t.parent===t||y.size===0||g?.features?.lateGenerateResults!==!0)return;fe({channel:U,v:N,type:"generate-late-listen"})},j=(c,l)=>{for(let b of c)try{b(l)}catch(I){console.error(I)}},nt=(c)=>{if(!(c instanceof MessageEvent))return;if(!n(c.source))return;let l=Wn(c.data);if(!l)return;if(l.type==="workspace"){let I=ue.get(l.payload.subscriptionId);if(I)j([I],l.payload.snapshot);return}if(l.type==="shells"){let I=ne.get(l.payload.subscriptionId);if(I)j([I],l.payload.snapshot);return}if(l.type==="ready"){if(g=l.payload,Ae=tt(l.payload.session),j(r,l.payload),j(s,l.payload.directory),j(i,l.payload.session),Ae)j(a,Ae);if(j(u,l.payload.connection),j(_,l.payload.settings),j(p,l.payload.item),l.payload.block)j(h,l.payload.block);ht();return}if(l.type==="service-event"){j(m,l.payload);return}if(l.type==="generate-late"){if(y.size===0)O.push(l.payload);else j(y,l.payload);return}if(l.type==="directory"){if(g)g={...g,directory:l.payload.directory};j(s,l.payload.directory);return}if(l.type==="session"){if(g)g={...g,session:l.payload.session};if(!l.payload.session)Ae=null;else if(Ae?.sessionId!==l.payload.session.id)Ae=tt(l.payload.session);j(i,l.payload.session);return}if(l.type==="session-lifecycle"){Ae=l.payload,j(a,l.payload);return}if(l.type==="connection"){if(g)g={...g,connection:l.payload.connection};j(u,l.payload.connection);return}if(l.type==="settings"){if(g)g={...g,settings:l.payload.settings};j(_,l.payload.settings);return}if(l.type==="item"){if(g)g={...g,item:l.payload.item};j(p,l.payload.item);return}if(l.type==="status-control-event"){j(d,l.payload);return}if(l.type==="popover-closed"){j(E,l.payload);return}if(l.type==="action"){let I=(B)=>{if(!V)fe({channel:U,v:N,type:"action-result",id:l.id,payload:B})},W=x;if(!W){I({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(l.payload)).then(()=>I({ok:!0}),(B)=>{let oe=(B instanceof Error?B.message:String(B)).trim();I({ok:!1,error:(oe||"Action failed.").slice(0,rt)})});return}if(l.type==="file-open"){let I=l.payload;if(te&&mr(te,I))return;te=I,j(A,l.payload);return}if(l.type==="file-saved"){j(M,l.payload.version);return}if(l.type==="file-snapshot"){let I=(oe)=>{if(!V)fe({channel:U,v:N,type:"file-snapshot-result",id:l.id,payload:oe})},W=(oe)=>I({error:(oe.trim()||"Could not read the edited file.").slice(0,rt)}),B=q;if(!B){W("This extension does not edit files.");return}Promise.resolve().then(()=>B(l.payload.purpose)).then((oe)=>{if(On(oe)>Mt){W(`The file is over ${Mt} ${"bytes"in oe?"bytes":"characters"}.`);return}if(oe.version.length>Pt){W(`The snapshot version is over ${Pt} characters.`);return}I({snapshot:"bytes"in oe?{bytes:oe.bytes,version:oe.version}:{content:oe.content,version:oe.version}})},(oe)=>W(oe instanceof Error?oe.message:String(oe)));return}if(l.type==="resolve"){let I=(B)=>{fe({channel:U,v:N,type:"resolve-result",id:l.id,payload:B})},W=T;if(!W){I({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(l.payload)).then((B)=>I({item:B?qe(B):null}),(B)=>{let oe=(B instanceof Error?B.message:String(B)).trim();I({error:(oe||"Command failed.").slice(0,rt)})});return}let b=J.get(l.id);if(!b)return;if(clearTimeout(b.timer),J.delete(l.id),l.ok){b.resolve(l.payload);return}b.reject(new k(l.code,l.error))};t.addEventListener("message",nt),fe({channel:U,v:N,type:"hello"});let ie=(c,l=o)=>{if(V||t.parent===t)return Promise.reject(new k("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((b,I)=>{let W=setTimeout(()=>{J.delete(c.id),I(new k("HOST_TIMEOUT","Host did not answer in time."))},l);J.set(c.id,{resolve:b,reject:I,timer:W}),fe(c)})},X=(c)=>ie(c).then(()=>{return}),Y={channel:U,v:N},St=(c)=>{if(!V&&t.parent!==t)fe(c)},v=()=>St({...Y,type:"file-save"}),Re=(c)=>{if(!$r(c)||!da(c))return;c.preventDefault(),v()},Ke=(c)=>{if(!$r(c)||c.key!=="Escape"||g?.surface!=="popover"||!g.popover)return;c.preventDefault(),Ko(g.popover.id,"escape").catch(()=>{return})},Tt=()=>{let c=g?.surface==="popover"?g.popover:void 0;if(!c)return;let l=Ie||Ne;if(et===l)return;et=l,zo(c.id,l).catch(()=>{return})},gt=()=>{if(g?.surface!=="popover"||Ie)return;Ie=!0,Tt()},Fo=(c)=>{if(g?.surface!=="popover"||c.relatedTarget!==null||!Ie)return;Ie=!1,Tt()},Xo=()=>{if(g?.surface!=="popover"||Ne)return;Ne=!0,Tt()},Wo=()=>{if(g?.surface!=="popover"||!Ne)return;Ne=!1,Tt()},Oe=(c,l=1024)=>{if(!c.trim()||c.length>l)throw new k("HOST_REJECTED",`Identity must contain 1 to ${l} characters.`)},un=async(c)=>{if(c.kind!=="projects")Oe(c.projectId);let l=await ie({...Y,type:"workspace-read",id:P(S),payload:c});if(!l||!("kind"in l)||!("state"in l)||l.kind!==c.kind)throw new k("HOST_REJECTED","Host did not return workspace data.");return l},pn=async(c,l)=>{if(c.kind!=="projects")Oe(c.projectId);let b=P(S);ue.set(b,l);try{await X({...Y,type:"workspace-subscribe",id:P(S),payload:{subscriptionId:b,query:c}})}catch(I){if(ue.delete(b),!V)fe({...Y,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:b}});throw I}return()=>{if(!ue.delete(b)||V)return;fe({...Y,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:b}})}},Wi=async(c,l)=>{if(c.kind==="session")Oe(c.sessionId);if(c.kind==="project")Oe(c.projectId);let b=P(S);ne.set(b,l);try{await X({...Y,type:"shells-subscribe",id:P(S),payload:{subscriptionId:b,scope:c}})}catch(I){if(ne.delete(b),!V)fe({...Y,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:b}});throw I}return()=>{if(!ne.delete(b)||V)return;fe({...Y,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:b}})}},yt=async(c)=>{if("key"in c&&(c.key.length===0||c.key.length>xn))throw new k("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!ze(c.value))throw new k("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>An)throw new k("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&g?.features?.deviceStorage!==!0)throw new k("UNSUPPORTED","This host does not support device storage.");let l=await ie({...Y,type:"storage",id:P(S),payload:c});if(!l||!("storage"in l)||l.op!==c.op)throw new k("HOST_REJECTED","Host did not return storage data.");return l},Ko=(c,l)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===c)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):X({...Y,type:"popover-close",id:P(S),payload:l?{id:c,reason:l}:{id:c}}),zo=(c,l)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===c)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):X({...Y,type:"popover-anchor",id:P(S),payload:{id:c,active:l}});return t.addEventListener("keydown",Ke,!0),t.addEventListener("pointerover",gt),t.addEventListener("pointermove",gt),t.addEventListener("pointerout",Fo),t.addEventListener("focus",Xo),t.addEventListener("blur",Wo),{onAction:(c)=>(x=c,()=>{if(x===c)x=null}),listProjects:async()=>{let c=await un({kind:"projects"});if(c.kind!=="projects")throw new k("HOST_REJECTED","Expected projects.");return c},listWorktrees:async(c)=>{let l=await un({kind:"worktrees",projectId:c});if(l.kind!=="worktrees")throw new k("HOST_REJECTED","Expected worktrees.");return l},listSessions:async(c)=>{let l=await un({kind:"sessions",projectId:c});if(l.kind!=="sessions")throw new k("HOST_REJECTED","Expected sessions.");return l},onProjects:(c)=>pn({kind:"projects"},(l)=>{if(l.kind==="projects")c(l)}),onWorktrees:(c,l)=>pn({kind:"worktrees",projectId:c},(b)=>{if(b.kind==="worktrees")l(b)}),onSessions:(c,l)=>pn({kind:"sessions",projectId:c},(b)=>{if(b.kind==="sessions")l(b)}),onRunningShells:(c,l)=>Wi(c,l),readShellOutput:async(c,l)=>{Oe(c,vt);let b=l?.cursor;if(b!==void 0&&(!Number.isInteger(b)||b<0))throw new k("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let I=l?.tailBytes;if(I!==void 0&&(!Number.isInteger(I)||I<1||I>wt))throw new k("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${wt}.`);let B=await ie({...Y,type:"shell-output",id:P(S),payload:{shellId:c,cursor:b,tailBytes:I}});if(!B||typeof B.output!=="string"||!Number.isFinite(B.cursor))throw new k("HOST_REJECTED","Host did not return shell output.");return B},stopShell:async(c)=>{if(Oe(c,vt),(await ie({...Y,type:"shell-stop",id:P(S),payload:{shellId:c}}))?.stopped!==!0)throw new k("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(c)=>{Oe(c),await X({...Y,type:"open-session",id:P(S),payload:{sessionId:c}})},storage:{get:async(c,l)=>{let b=Bt(l),I={op:"get",key:c};if(b)I.scope=b;let W=await yt(I);return W.op==="get"&&W.found?W.value:void 0},set:async(c,l,b)=>{let I=Bt(b),W={op:"set",key:c,value:l};if(I)W.scope=I;await yt(W)},delete:async(c,l)=>{let b=Bt(l),I={op:"delete",key:c};if(b)I.scope=b;await yt(I)},keys:async(c)=>{let l=Bt(c),b={op:"keys"};if(l)b.scope=l;let I=await yt(b);if(I.op!=="keys")throw new k("HOST_REJECTED","Expected storage keys.");return I.keys}},onReady:(c)=>{if(r.add(c),g)c(g);return()=>{r.delete(c)}},onDirectory:(c)=>{if(s.add(c),g)c(g.directory);return()=>{s.delete(c)}},onSession:(c)=>{if(i.add(c),g)c(g.session);return()=>{i.delete(c)}},onSessionLifecycle:(c)=>{if(a.add(c),Ae)c(Ae);return()=>{a.delete(c)}},onConnection:(c)=>{if(u.add(c),g)c(g.connection);return()=>{u.delete(c)}},onSettings:(c)=>{if(_.add(c),g)c(g.settings);return()=>{_.delete(c)}},onItem:(c)=>{if(p.add(c),g)c(g.item);return()=>{p.delete(c)}},onBlock:(c)=>{if(h.add(c),g?.block)c(g.block);return()=>{h.delete(c)}},onServiceEvent:(c)=>(m.add(c),()=>{m.delete(c)}),onStatusControl:(c)=>(d.add(c),()=>{d.delete(c)}),onPopoverClosed:(c)=>(E.add(c),()=>{E.delete(c)}),setStatusControls:(c)=>{if(g?.features?.statusControls!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support status controls."));if(!pr(c))return Promise.reject(new k("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return X({...Y,type:"status-controls",id:P(S),payload:{controls:c}})},openPopover:(c)=>{if(g?.features?.popovers!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support popovers."));if(!kn(c))return Promise.reject(new k("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return X({...Y,type:"popover-open",id:P(S),payload:c})},closePopover:Ko,setPopoverAnchorActive:zo,onResolve:(c)=>(T=c,()=>{if(T===c)T=null}),toast:(c)=>{let l=c.message.trim();if(!l||l.length>Ut)return Promise.reject(new k("HOST_REJECTED",`Toast message must contain 1 to ${Ut} characters.`));if(c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>Nt))return Promise.reject(new k("HOST_REJECTED",`Toast copy text must contain 1 to ${Nt} characters.`));return X({channel:U,v:N,type:"toast",id:P(S),payload:{...c,message:l}})},openUrl:(c)=>X({channel:U,v:N,type:"open-url",id:P(S),payload:{url:c}}),openCommit:(c)=>Mn(c)?X({channel:U,v:N,type:"open-commit",id:P(S),payload:{sha:c}}):Promise.reject(new k("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(c)=>X({channel:U,v:N,type:"block-answer",id:P(S),payload:{text:c.trim().slice(0,Cn)}}),openSurface:(c)=>X({channel:U,v:N,type:"open-surface",id:P(S),payload:{surfaceId:c}}),writeClipboard:(c)=>X({channel:U,v:N,type:"clipboard-write",id:P(S),payload:{text:c}}),compose:(c)=>X({channel:U,v:N,type:"compose",id:P(S),payload:c}),attach:(c)=>X({channel:U,v:N,type:"attach",id:P(S),payload:qe(c)}),startSession:async(c)=>{if(c.projectId!==void 0)Oe(c.projectId);let l=c.worktree;if(l&&l!==!0)if(l.kind==="existing")Oe(l.directory);else{if(l.name!==void 0)Oe(l.name,200);if(l.baseBranch!==void 0)Oe(l.baseBranch,200)}let b=await ie({channel:U,v:N,type:"start-session",id:P(S),payload:Ln(c)},e.requestTimeoutMs??180000);if(!vn(b))throw new k("HOST_REJECTED","Host did not return a session.");return b},prompt:(c)=>ie({channel:U,v:N,type:"prompt",id:P(S),payload:Dn(c)}).then((l)=>{if(!wn(l))throw new k("HOST_REJECTED","Host did not return a prompt result.");return l}),sessionLink:(c)=>X({channel:U,v:N,type:"session-link",id:P(S),payload:qe(c)}),close:()=>X({channel:U,v:N,type:"close",id:P(S)}),oauthStart:()=>X({channel:U,v:N,type:"oauth-start",id:P(S)}),oauthDisconnect:()=>X({channel:U,v:N,type:"oauth-disconnect",id:P(S)}),request:(c)=>(Ht(c.path)?ie({channel:U,v:N,type:"request",id:P(S),payload:c}):Gr()).then((l)=>{if(!jt(l))throw new k("HOST_REJECTED","Host request result was empty.");return l}),serviceRequest:(c)=>(Ht(c.path)?ie({channel:U,v:N,type:"service-request",id:P(S),payload:c}):Gr()).then((l)=>{if(!jt(l))throw new k("HOST_REJECTED","Host service request result was empty.");return l}),serviceStatus:()=>ie({channel:U,v:N,type:"service-status",id:P(S)}).then((c)=>{if(!Hn(c))throw new k("HOST_REJECTED","Host did not return service status.");return c}),readFile:(c)=>(Je(c)?ie({channel:U,v:N,type:"file-read",id:P(S),payload:{path:c}}):Vt()).then((l)=>{if(!jn(l))throw new k("HOST_REJECTED","Host did not return file content.");return l}),writeFile:(c,l)=>{if(!Je(c))return Vt();if(l.length>Dt)return Promise.reject(new k("FILE_TOO_LARGE",`Content is over ${Dt} characters.`));return ie({channel:U,v:N,type:"file-write",id:P(S),payload:{path:c,content:l}}).then((b)=>{if(!Vn(b))throw new k("HOST_REJECTED","Host did not confirm the write.");return b})},listDir:(c)=>(Je(c)?ie({channel:U,v:N,type:"file-list",id:P(S),payload:{path:c}}):Vt()).then((l)=>{if(!Bn(l))throw new k("HOST_REJECTED","Host did not return directory entries.");return l}),stat:(c)=>(Je(c)?ie({channel:U,v:N,type:"file-stat",id:P(S),payload:{path:c}}):Vt()).then((l)=>{if(!Fn(l))throw new k("HOST_REJECTED","Host did not return file status.");return l}),generate:(c)=>{let l=c.prompt.trim(),b=c.system?.trim();if(l.length===0||l.length>$t)return Promise.reject(new k("HOST_REJECTED",`Prompt must be 1 to ${$t} characters.`));if(b!==void 0&&(b.length===0||b.length>Gt))return Promise.reject(new k("HOST_REJECTED",`System prompt must be 1 to ${Gt} characters.`));let I=c.maxOutputTokens===void 0?void 0:Math.min(Un,Math.max(1,Math.floor(c.maxOutputTokens)));if(I!==void 0&&!Number.isFinite(I))return Promise.reject(new k("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:l};if(b!==void 0)W.system=b;if(I!==void 0)W.maxOutputTokens=I;return ie({channel:U,v:N,type:"generate",id:P(S),payload:W},e.requestTimeoutMs??Nn).then((B)=>{if(!Xn(B))throw new k("HOST_REJECTED","Host did not return generated text.");return B})},onLateGenerateResult:(c)=>{y.add(c);for(let l of O.splice(0))j([c],l);return ht(),()=>{y.delete(c)}},setBadge:(c)=>X({channel:U,v:N,type:"badge",id:P(S),payload:{count:$n(c)}}),setHeight:(c)=>X({channel:U,v:N,type:"resize",id:P(S),payload:{height:Gn(c)}}),onFileOpen:(c)=>{if(A.add(c),!L)L=!0,t.addEventListener("keydown",Re,!0);if(te)c(te);return()=>{A.delete(c)}},onFileSnapshot:(c)=>(q=c,()=>{if(q===c)q=null}),onFileSaved:(c)=>(M.add(c),()=>{M.delete(c)}),reportFileChange:(c)=>St({...Y,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:v,reportFileUnsupported:()=>St({...Y,type:"file-unsupported"}),dispose:()=>{for(let c of ue.keys())fe({...Y,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:c}});ue.clear();for(let c of ne.keys())fe({...Y,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:c}});if(ne.clear(),V=!0,T=null,x=null,q=null,A.clear(),M.clear(),L)t.removeEventListener("keydown",Re,!0);t.removeEventListener("message",nt),t.removeEventListener("keydown",Ke,!0),t.removeEventListener("pointerover",gt),t.removeEventListener("pointermove",gt),t.removeEventListener("pointerout",Fo),t.removeEventListener("focus",Xo),t.removeEventListener("blur",Wo);for(let c of J.values())clearTimeout(c.timer),c.reject(new k("HOST_UNAVAILABLE","Host client was disposed."));J.clear(),r.clear(),s.clear(),i.clear(),a.clear(),u.clear(),_.clear(),p.clear(),h.clear(),m.clear(),d.clear(),E.clear(),y.clear(),O.length=0}}};var Hr=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Zc=new Set(Hr);var jr=["none","agent","user"];var tl=new Set(jr);var ua=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],pa=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Vr=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,o]of ua)t.style.setProperty(n,e.tokens[o]);for(let[n,o,r]of pa){let s=e.tokens[r]??"";t.style.setProperty(n,s),t.style.setProperty(o,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},zn=(e,t)=>{if(Vr(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var fa={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},K=(e,t)=>`var(--${e}, var(--oc-${fa[e]}, ${t}))`,ve=K("surface-background","transparent"),Xt=K("surface-elevated","transparent"),Ye=K("surface-elevated-foreground","inherit"),Ee=K("surface-foreground","inherit"),Q=K("surface-muted-foreground","gray"),_a=K("surface-muted","transparent"),Ve=K("interactive-border","currentColor"),_e=K("interactive-hover","transparent"),Be=K("interactive-active","transparent"),qn=K("interactive-selection","transparent"),Jn=K("interactive-selection-foreground","inherit"),Ce=K("primary","currentColor"),Yn=K("primary-text","inherit"),Qn=K("error-text","inherit"),ma=K("font-sans","inherit"),Zn=K("font-mono","monospace"),Wr=K("radius","9px"),eo=`calc(${Wr} - 2px)`,Br=`calc(${Wr} - 4px)`,Z=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,Fr=`background-image: linear-gradient(${_e}, ${_e});`,to=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,no="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Xr="box-shadow: var(--oc-sdk-lit);",oo=`inset 0 0.5px 0 0 ${Z(Ee,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Ea=`
:root {
  --oc-sdk-edge: ${Z(Ee,16)};
  --oc-sdk-field-bg: ${Xt};
  --oc-sdk-raised-bg: ${ve};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Z(Ee,14)};
  --oc-sdk-field-bg: ${Z(ve,50,Xt)};
  --oc-sdk-raised-bg: ${Xt};
  --oc-sdk-field-lift: ${oo};
  --oc-sdk-raised-lift: ${oo};
  --oc-sdk-lit: ${oo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Ft=(e)=>{let t=K(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${K(`${e}-text`,"inherit")}; }`},ha=`
.oc-sdk { box-sizing: border-box; font-size: 0.875rem; line-height: 1.45; }
.oc-sdk *, .oc-sdk *::before, .oc-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.oc-sdk) :where(button, input, textarea), :where(button.oc-sdk, input.oc-sdk, textarea.oc-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.oc-sdk) :where(button), :where(button.oc-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.oc-sdk button:disabled, button.oc-sdk:disabled, .oc-sdk[aria-disabled="true"], .oc-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }

.oc-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 32px; padding: 0 12px; border: 1px solid transparent; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; }
.oc-sdk-btn[data-size="sm"] { gap: 6px; height: 28px; padding: 0 10px; font-size: 0.8125rem; }
.oc-sdk-btn[data-size="xs"] { gap: 4px; height: 24px; padding: 0 8px; font-size: 0.75rem; }
.oc-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.oc-sdk-btn > .oc-sdk-spinner-ring { width: 14px; height: 14px; }

.oc-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-field-note { font-size: 0.75rem; }
.oc-sdk-input { display: block; width: 100%; min-width: 0; height: 32px; padding: 0 10px; border: 0; font-size: 0.875rem; line-height: 1.45; appearance: none; }
textarea.oc-sdk-input { height: auto; padding: 8px 10px; resize: vertical; }

.oc-sdk-search { position: relative; min-width: 0; }
.oc-sdk-search .oc-sdk-input { padding-left: 34px; padding-right: 34px; }
.oc-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.oc-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-clear { display: inline-flex; }

.oc-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; width: auto; max-width: 100%; min-width: 0; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; text-align: left; }
.oc-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-trigger-chevron { flex: 0 0 auto; }
.oc-sdk-popup { position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid transparent; }
.oc-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.oc-sdk-popup-search .oc-sdk-input { height: 28px; font-size: 0.8125rem; }
.oc-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; font-size: 0.8125rem; text-align: left; }
.oc-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; }
.oc-sdk-option-check { flex: 0 0 auto; display: inline-flex; width: 14px; visibility: hidden; }
.oc-sdk-option[aria-selected="true"] > .oc-sdk-option-check { visibility: visible; }
.oc-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; }

.oc-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.oc-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid transparent; }
.oc-sdk-check-box > svg { display: none; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box > svg { display: block; }
.oc-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; }
.oc-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; }
.oc-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.oc-sdk-check-label { font-size: 0.875rem; }
.oc-sdk-check-desc { font-size: 0.75rem; }

.oc-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; max-width: 100%; overflow: auto; }
.oc-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; font-size: 0.8125rem; font-weight: 500; white-space: nowrap; }
.oc-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; }

.oc-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; }

.oc-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.oc-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; text-align: left; }
.oc-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.oc-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.oc-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; }
.oc-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; }

.oc-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.oc-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.oc-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; }
.oc-sdk-empty-action { margin-top: 12px; }

@keyframes oc-sdk-spin { to { transform: rotate(360deg); } }
.oc-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; }
.oc-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid transparent; animation: oc-sdk-spin .8s linear infinite; }
.oc-sdk-spinner[data-size="sm"] .oc-sdk-spinner-ring { width: 12px; height: 12px; }

.oc-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid transparent; }
.oc-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.oc-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; }
.oc-sdk-banner-body { font-size: 0.8125rem; }
.oc-sdk-banner-action { flex: 0 0 auto; }

.oc-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; }
.oc-sdk-separator::before, .oc-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; }
.oc-sdk-separator[data-labeled="false"]::after { display: none; }
.oc-sdk-popup > .oc-sdk-separator { margin: 4px 0; }

.oc-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.oc-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; font-variant-numeric: tabular-nums; }
.oc-sdk-progress-track { height: 6px; overflow: hidden; }
.oc-sdk-progress-fill { height: 100%; transform-origin: left; transition: transform 200ms ease-out; }
.oc-sdk-progress-value { display: inline-flex; align-items: center; gap: 2px; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { font-weight: 600; }

.oc-sdk-menu { position: relative; display: inline-flex; }

.oc-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.oc-sdk-text img { display: block; max-width: 100%; margin: 8px 0; }
`,Kr=`${Ea}
.oc-sdk { color: ${Ee}; font-family: ${ma}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Fr} }
.oc-sdk-mono { font-family: ${Zn}; }
.oc-sdk-muted { color: ${Q}; }
${Ft("success")}${Ft("warning")}${Ft("error")}${Ft("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Ce}; --oc-sdk-tone-text: ${Yn}; }

.oc-sdk-btn { border-radius: ${eo}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Br}; }
.oc-sdk-btn[data-variant="default"] { color: ${Yn}; background: ${Z(Ce,10,ve)}; border-color: ${Z(Ce,12)}; ${Xr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Z(Ce,16,ve)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Z(Ce,22,ve)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${_a}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Be}, ${Be}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ye}; ${no} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Be}, ${Be}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${_e}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Be}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${K("status-error","red")}; color: ${Qn}; background: ${Z("var(--oc-sdk-tone)",7,ve)}; border-color: ${Z("var(--oc-sdk-tone)",12)}; ${Xr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Z("var(--oc-sdk-tone)",9,ve)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Z("var(--oc-sdk-tone)",11,ve)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Q}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Qn}; }
.oc-sdk-input { border-radius: ${eo}; background: var(--oc-sdk-field-bg); color: ${Ye}; ${to("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Q}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${to(Z(Ee,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${to(K("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Zn}; }

.oc-sdk-search-icon { color: ${Q}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Ce}; }
.oc-sdk-search-clear { border-radius: ${Br}; color: ${Q}; }
.oc-sdk-search-clear:hover { background: ${_e}; color: ${Ee}; }

.oc-sdk-trigger { border-radius: ${eo}; background: var(--oc-sdk-raised-bg); color: ${Ye}; ${no} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Be}, ${Be}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Q}; }
.oc-sdk-trigger-chevron { color: ${Q}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ye}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Xt}; background-clip: padding-box; color: ${Ye}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${_e}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${qn}; color: ${Jn}; }
.oc-sdk-option-check { color: ${Ee}; }
.oc-sdk-option[data-destructive="true"] { color: ${Qn}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Z(K("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Q}; }
.oc-sdk-popup-empty { color: ${Q}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ve}; border-radius: 4px; color: ${Ee}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Z(Ee,60,Ve)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ve}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ve}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Ce}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Fr} }
.oc-sdk-check-desc { color: ${Q}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Z(Ee,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Q}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Ee}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Jn}; background: ${qn}; border-color: ${Ve}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ye}; background: var(--oc-sdk-raised-bg); ${no} }
.oc-sdk-tab-count { color: ${Q}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Z(Ee,6)}; color: ${Q}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Z("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${_e}; }
.oc-sdk-row[aria-selected="true"] { background: ${qn}; color: ${Jn}; }
.oc-sdk-row-lead { font-family: ${Zn}; color: ${Q}; }
.oc-sdk-row-sub { color: ${Q}; }
.oc-sdk-row-meta { color: ${Q}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Q}; }

.oc-sdk-empty-body { color: ${Q}; }

.oc-sdk-spinner { color: ${Q}; }
.oc-sdk-spinner-ring { border-color: ${Ve}; border-top-color: ${Ce}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Z("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Q}; }

.oc-sdk-separator { color: ${Q}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Z(Ve,40)}; }

.oc-sdk-progress-label { color: ${Q}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Z(Ee,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Ce}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${K("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${K("success-text","inherit")}; }

.oc-sdk-text a { color: ${Yn}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Z(Ve,60)}; }
`,G=`
${gn}
${ha}
${Kr}`;var zr="oc-sdk-ui-style",we=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},H=(e)=>{let t=document.getElementById(zr);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}yn(document);let n=document.createElement("style");n.id=zr,n.textContent=e,document.head.appendChild(n)},R=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},me=(e)=>{let t=R("button",e);return t.type="button",t},F=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},he=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},qr=(e,t)=>{let n=(o)=>{if(o.target instanceof Node&&e.contains(o.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var Sa=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Me=(e,t)=>{H(G);let n=t,o=me("oc-sdk oc-sdk-btn"),r=Sa(),s=document.createElement("span");o.append(s),e.append(o);let i=()=>{if(o.dataset.variant=n.variant??"default",o.dataset.size=n.size??"default",o.disabled=Boolean(n.disabled)||Boolean(n.loading),o.dataset.loading=n.loading?"true":"false",o.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&r.parentNode!==o)o.prepend(r);else if(!n.loading&&r.parentNode===o)r.remove();F(s,n.label)},a=()=>{if(n.disabled||n.loading)return;n.onClick()};return o.addEventListener("click",a),i(),{update:(u)=>{n={...n,...u},i()},dispose:()=>{o.removeEventListener("click",a),o.remove()}}};var ro=(e,t)=>{H(G);let n=t,o=R("label","oc-sdk oc-sdk-field"),r=R("span","oc-sdk-field-label"),s=n.multiline?R("textarea","oc-sdk-input"):R("input","oc-sdk-input"),i=R("span","oc-sdk-field-note");o.append(r,s,i),e.append(o);let a=()=>{if(F(r,n.label),r.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),he(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let _=Boolean(n.error);o.dataset.invalid=_?"true":"false",s.setAttribute("aria-invalid",_?"true":"false");let p=n.error??n.helper??"";F(i,p),i.hidden=p===""},u=()=>{n.onChange(s.value)};return s.addEventListener("input",u),a(),{update:(_)=>{n={...n,..._},a()},dispose:()=>{s.removeEventListener("input",u),o.remove()}}};var Ta={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},be=(e,t,n)=>{let o=document.createElementNS("http://www.w3.org/2000/svg","svg");if(o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("fill","currentColor"),n)o.setAttribute("class",n);let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",Ta[e]),o.append(r),o};var so=(e,t)=>{H(G);let n=t,o=R("div","oc-sdk oc-sdk-search"),r=R("input","oc-sdk-input");r.type="text",r.spellcheck=!1,r.autocomplete="off",r.setAttribute("role","searchbox");let s=me("oc-sdk-search-clear");s.append(be("close",14)),s.tabIndex=-1,o.append(be("search",16,"oc-sdk-search-icon"),r,s),e.append(o);let i=()=>{let p=n.placeholder??"Search";if(he(r,"placeholder",p),r.setAttribute("aria-label",n.label??p),s.setAttribute("aria-label","Clear search"),r.value!==n.value)r.value=n.value;o.dataset.active=n.value.trim()===""?"false":"true"},a=()=>{if(n.value!=="")n.onChange("");r.focus()},u=()=>{n.onChange(r.value)},_=(p)=>{if(p.key==="Escape"&&r.value!=="")p.preventDefault(),a()};if(r.addEventListener("input",u),r.addEventListener("keydown",_),s.addEventListener("click",a),i(),n.autofocus)r.focus();return{update:(p)=>{n={...n,...p},i()},dispose:()=>{r.removeEventListener("input",u),r.removeEventListener("keydown",_),s.removeEventListener("click",a),o.remove()}}};var ke=(e,t="vertical")=>{let[n,o]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===o||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Pe=(e,t,n)=>{let o=e.filter((u)=>!u.disabled);if(o.length===0)return null;let r=o[0],s=o[o.length-1];if(n==="first"||!r||!s)return r?.id??null;if(n==="last")return s.id;let i=o.findIndex((u)=>u.id===t);if(i===-1)return n==="next"?r.id:s.id;return o[Math.min(o.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var Jr=(e,t)=>`${e}-${t??""}`,Wt=(e,t,n,o)=>{let r=me("oc-sdk-option");if(r.id=Jr(e,n.id),r.setAttribute("role",t),r.tabIndex=-1,r.disabled=Boolean(n.disabled),t==="option")r.setAttribute("aria-selected",n.selected?"true":"false");r.dataset.destructive=n.destructive?"true":"false";let s=R("span","oc-sdk-option-label");if(s.textContent=n.label,r.append(s),n.hint){let i=R("span","oc-sdk-option-hint");i.textContent=n.hint,r.append(i)}if(t==="option"){r.dataset.mark="check";let i=R("span","oc-sdk-option-check");i.append(be("check",14)),r.append(i)}return r.addEventListener("pointerenter",o.hover),r.addEventListener("click",o.pick),r},Kt=(e,t,n,o)=>{let r=Jr(n,o);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===r?"true":"false";he(t,"aria-activedescendant",o?r:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ga=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let o=e.offsetHeight,r=window.innerHeight-n.bottom-8;if(o>r&&n.top-8>r)e.style.top=`${Math.max(8,Math.round(n.top-4-o))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},zt=(e,t,n,o)=>{e.append(n),ga(n,t);let r=qr(e,o),s=()=>{o()},i=(a)=>{if(a.target instanceof Node&&n.contains(a.target))return;o()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{r(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var Yr=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((o)=>o.label.toLowerCase().includes(n)||o.id.toLowerCase().includes(n))},ya=0,qt=(e,t)=>{H(G);let n=t,o=`oc-sdk-select-${ya+=1}`,r=R("div","oc-sdk oc-sdk-select"),s=R("span","oc-sdk-field-label");s.id=`${o}-label`;let i=me("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let a=R("span","oc-sdk-trigger-value");i.append(a,be("chevron",14,"oc-sdk-trigger-chevron")),r.append(s,i),e.append(r);let u="",_=null,p=null,h=R("div","oc-sdk oc-sdk-popup"),m=R("div","oc-sdk-popup-search"),d=R("input","oc-sdk-input");d.type="text",d.autocomplete="off",m.append(d);let E=R("div");E.setAttribute("role","listbox"),E.tabIndex=-1,h.append(E);let y=()=>Yr(n.options,n.searchable?u:""),O=()=>n.searchable?d:E,T=(S)=>{_=S,Kt(E,O(),o,S)},x=()=>{we(E);let S=y();if(S.length===0){let g=R("div","oc-sdk-popup-empty");g.textContent="No matches",E.append(g)}for(let g of S)E.append(Wt(o,"option",{...g,selected:g.id===n.value},{hover:()=>T(g.id),pick:()=>q(g.id)}));T(S.some((g)=>g.id===_)?_:S[0]?.id??null)},A=()=>{let S=p;p=null,S?.(),u="",d.value="",i.setAttribute("aria-expanded","false")},M=()=>{if(p||n.disabled)return;if(_=n.value,d.placeholder=n.searchPlaceholder??"Search",n.searchable)h.prepend(m);else m.remove();x(),p=zt(r,i,h,A),i.setAttribute("aria-expanded","true"),O().focus()},q=(S)=>{if(A(),i.focus(),S!==n.value)n.onChange(S)},te=()=>{if(p)A();else M()},L=(S)=>{if(!p&&ke(S))S.preventDefault(),M()},J=(S)=>{let g=ke(S);if(g)S.preventDefault(),T(Pe(y(),_,g));else if(S.key==="Enter"){if(S.preventDefault(),_)q(_)}else if(S.key==="Escape")S.preventDefault(),A(),i.focus();else if(n.searchable&&S.target!==d&&S.key.length===1&&!S.ctrlKey&&!S.metaKey)d.focus()},ue=()=>{u=d.value,x()},ne=(S)=>{if(p&&!(S.relatedTarget instanceof Node&&r.contains(S.relatedTarget)))A()},V=()=>{F(s,n.label),s.hidden=!n.label;let S=n.options.find((g)=>g.id===n.value);if(F(a,S?.label??n.placeholder??"Select"),a.dataset.empty=S?"false":"true",i.disabled=Boolean(n.disabled),p)x()};return i.addEventListener("click",te),i.addEventListener("keydown",L),h.addEventListener("keydown",J),d.addEventListener("input",ue),r.addEventListener("focusout",ne),V(),{update:(S)=>{n={...n,...S},V()},dispose:()=>{A(),i.removeEventListener("click",te),i.removeEventListener("keydown",L),h.removeEventListener("keydown",J),d.removeEventListener("input",ue),r.removeEventListener("focusout",ne),r.remove()}}};var Qr=(e,t,n)=>{H(G);let o=t,r=me("oc-sdk oc-sdk-check");r.setAttribute("role",n);let s=R("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(be("check",12));let i=R("span","oc-sdk-check-text"),a=R("span","oc-sdk-check-label"),u=R("span","oc-sdk-check-desc");i.append(a,u),r.append(s,i),e.append(r);let _=()=>{r.setAttribute("aria-checked",o.checked?"true":"false"),r.disabled=Boolean(o.disabled),F(a,o.label),F(u,o.description),u.hidden=!o.description},p=()=>{if(!o.disabled)o.onChange(!o.checked)};return r.addEventListener("click",p),_(),{update:(h)=>{o={...o,...h},_()},dispose:()=>{r.removeEventListener("click",p),r.remove()}}},io=(e,t)=>Qr(e,t,"checkbox"),Jt=(e,t)=>Qr(e,t,"switch");var ao=(e,t)=>{H(G);let n=t,o=R("div","oc-sdk oc-sdk-tabs");o.setAttribute("role","tablist"),e.append(o);let r=()=>{we(o),o.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let a=me("oc-sdk-tab");a.setAttribute("role","tab");let u=i.id===n.activeId;a.setAttribute("aria-selected",u?"true":"false"),a.tabIndex=u?0:-1,a.dataset.id=i.id;let _=R("span");if(_.textContent=i.label,a.append(_),i.count!==void 0){let p=R("span","oc-sdk-tab-count");p.textContent=String(i.count),a.append(p)}a.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),o.append(a)}},s=(i)=>{let a=ke(i,"horizontal");if(!a)return;let u=Pe(n.items,n.activeId,a);if(u&&u!==n.activeId){i.preventDefault(),n.onChange(u);let _=o.querySelector(`[data-id="${CSS.escape(u)}"]`);if(_ instanceof HTMLElement)_.focus()}};return o.addEventListener("keydown",s),r(),{update:(i)=>{n={...n,...i},r()},dispose:()=>{o.removeEventListener("keydown",s),o.remove()}}};var st=(e,t)=>{he(e,"data-tone",t&&t!=="neutral"?t:null)},co=(e,t)=>{H(G);let n=t,o=R("span","oc-sdk oc-sdk-badge");e.append(o);let r=()=>{F(o,n.label),st(o,n.tone)};return r(),{update:(s)=>{n={...n,...s},r()},dispose:()=>{o.remove()}}};var xa=0,lo=(e,t)=>{H(G);let n=t,o=`oc-sdk-list-${xa+=1}`,r=R("div","oc-sdk oc-sdk-list");r.setAttribute("role","listbox"),r.tabIndex=0,e.append(r);let s=null,i=(h)=>`${o}-${h}`,a=(h)=>{s=h;for(let m of Array.from(r.children))if(m instanceof HTMLElement)m.dataset.active=m.id===i(h??"")?"true":"false";he(r,"aria-activedescendant",h?i(h):null),r.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},u=(h,m)=>{let d=R("span",h);return d.textContent=m,d},_=()=>{if(we(r),he(r,"aria-label",n.ariaLabel),n.items.length===0){r.append(u("oc-sdk-list-empty",n.emptyText??"Nothing here")),a(null);return}for(let m of n.items){let d=me("oc-sdk-row");if(d.id=i(m.id),d.setAttribute("role","option"),d.setAttribute("aria-selected",m.id===n.selectedId?"true":"false"),d.disabled=Boolean(m.disabled),d.tabIndex=-1,m.leading)d.append(u("oc-sdk-row-lead",m.leading));let E=R("span","oc-sdk-row-main");if(E.append(u("oc-sdk-row-title",m.title)),m.subtitle)E.append(u("oc-sdk-row-sub",m.subtitle));if(d.append(E),m.badge){let y=u("oc-sdk-badge",m.badge.label);st(y,m.badge.tone),d.append(y)}if(m.meta)d.append(u("oc-sdk-row-meta",m.meta));d.addEventListener("click",()=>n.onSelect(m.id)),r.append(d)}let h=n.items.some((m)=>m.id===s&&!m.disabled);a(h?s:n.selectedId??null)},p=(h)=>{let m=ke(h);if(m){h.preventDefault(),a(Pe(n.items,s,m));return}if((h.key==="Enter"||h.key===" ")&&s)h.preventDefault(),n.onSelect(s)};return r.addEventListener("keydown",p),_(),{update:(h)=>{n={...n,...h},_()},dispose:()=>{r.removeEventListener("keydown",p),r.remove()}}};var uo=(e,t)=>{H(G);let n=t,o=R("div","oc-sdk oc-sdk-empty"),r=R("h2","oc-sdk-empty-title"),s=R("p","oc-sdk-empty-body"),i=R("div","oc-sdk-empty-action");o.append(r,s,i),e.append(o);let a=null,u=()=>{if(F(r,n.title),F(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){a?.dispose(),a=null;return}let _={label:n.action.label,onClick:n.action.onClick};if(a)a.update(_);else a=Me(i,{..._,variant:"outline",size:"sm"})};return u(),{update:(_)=>{n={...n,..._},u()},dispose:()=>{a?.dispose(),a=null,o.remove()}}};var po=(e,t={})=>{H(G);let n=t,o=R("span","oc-sdk oc-sdk-spinner");o.setAttribute("role","status");let r=R("span","oc-sdk-spinner-ring");r.setAttribute("aria-hidden","true");let s=R("span");o.append(r,s),e.append(o);let i=()=>{o.dataset.size=n.size??"default",F(s,n.label),s.hidden=!n.label,o.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(a)=>{n={...n,...a},i()},dispose:()=>{o.remove()}}};var fo=(e,t)=>{H(G);let n=t,o=R("div","oc-sdk oc-sdk-banner"),r=R("div","oc-sdk-banner-text"),s=R("div","oc-sdk-banner-title"),i=R("div","oc-sdk-banner-body"),a=R("div","oc-sdk-banner-action");r.append(s,i),o.append(r,a),e.append(o);let u=null,_=()=>{if(o.dataset.tone=n.tone,o.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),F(s,n.title),F(i,n.body),i.hidden=!n.body,a.hidden=!n.action,!n.action){u?.dispose(),u=null;return}let p={label:n.action.label,onClick:n.action.onClick};if(u)u.update(p);else u=Me(a,{...p,variant:"outline",size:"xs"})};return _(),{update:(p)=>{n={...n,...p},_()},dispose:()=>{u?.dispose(),u=null,o.remove()}}};var Aa=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,_o=(e,t)=>{H(G);let n=t,o=R("div","oc-sdk oc-sdk-progress"),r=R("div","oc-sdk-progress-label"),s=R("span"),i=R("span","oc-sdk-progress-value"),a=R("span"),u=be("check",14);i.append(u,a),r.append(s,i);let _=R("div","oc-sdk-progress-track");_.setAttribute("role","progressbar"),_.setAttribute("aria-valuemin","0"),_.setAttribute("aria-valuemax","100");let p=R("div","oc-sdk-progress-fill");_.append(p),o.append(r,_),e.append(o);let h=()=>{let m=Aa(n.value);if(st(p,n.tone),p.style.transform=`scaleX(${m/100})`,_.setAttribute("aria-valuenow",String(m)),n.label)_.setAttribute("aria-label",n.label);else _.removeAttribute("aria-label");F(s,n.label),F(a,`${m}%`);let d=m===100&&(!n.tone||n.tone==="neutral");he(o,"data-done",d?"true":null),u.style.display=d?"":"none",r.hidden=!n.label};return h(),{update:(m)=>{n={...n,...m},h()},dispose:()=>{o.remove()}}};var Zr=(e)=>e.filter((t)=>!("separator"in t)),Ra=0,mo=(e,t)=>{H(G);let n=t,o=`oc-sdk-menu-${Ra+=1}`,r=R("div","oc-sdk oc-sdk-menu");e.append(r);let s=R("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,a=null,u=Me(r,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)m();else d()}}),_=r.querySelector("button");_?.setAttribute("aria-haspopup","menu");let p=(T)=>{a=T,Kt(s,s,o,T)},h=()=>{we(s);for(let T of n.items){if("separator"in T){let x=R("div","oc-sdk-separator");x.dataset.labeled="false",s.append(x);continue}s.append(Wt(o,"menuitem",T,{hover:()=>p(T.id),pick:()=>E(T.id)}))}p(Zr(n.items).some((T)=>T.id===a)?a:null)},m=()=>{let T=i;i=null,T?.(),a=null,_?.setAttribute("aria-expanded","false")},d=()=>{if(i||!_)return;h(),i=zt(r,_,s,m),_.setAttribute("aria-expanded","true"),s.focus()},E=(T)=>{m(),_?.focus(),n.onSelect(T)},y=(T)=>{let x=ke(T);if(x)T.preventDefault(),p(Pe(Zr(n.items),a,x));else if(T.key==="Enter"||T.key===" "){if(T.preventDefault(),a)E(a)}else if(T.key==="Escape")T.preventDefault(),m(),_?.focus()},O=(T)=>{if(i&&!(T.relatedTarget instanceof Node&&r.contains(T.relatedTarget)))m()};return s.addEventListener("keydown",y),r.addEventListener("focusout",O),{update:(T)=>{if(n={...n,...T},u.update({label:n.label,variant:n.variant,size:n.size}),i)h()},dispose:()=>{m(),s.removeEventListener("keydown",y),r.removeEventListener("focusout",O),u.dispose(),r.remove()}}};var at,se,Eo,es,ho=Object.is,ct=0,ls=[],So=[],re=D,{__b:ts,__r:ns,diffed:os,__c:rs,unmount:ss,__:is}=re;function go(e,t){re.__h&&re.__h(se,e,ct||t),ct=0;var n=se.__H||(se.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function C(e){return ct=1,Oa(us,e)}function Oa(e,t,n){var o=go(at++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):us(void 0,t),function(s){var i=(o.__N||o.__)[0],a=o.t(i,s);ho(i,a)||(o.__N=[a,o.__[1]],o.__c.setState({}))}],o.__c=se,!se.__f)){se.__f=!0;var r=se.shouldComponentUpdate;se.shouldComponentUpdate=function(s,i,a){var u=this.__H;if(!u)return!0;var _=!1,p=this.props!=s;if(u.__.some(function(m){m.__N&&(_=!0,ho(m.__[0],m.__N[0])||(p=!0))}),r){var h=r.call(this,s,i,a);return _?h||p:h}return!_||p}}return o.__}function ee(e,t){var n=go(at++,3);!re.__s&&ds(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,se.__H.__h.push(n))}function Ue(e){return ct=5,ye(function(){return{current:e}},[])}function ye(e,t){var n=go(at++,7);return ds(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function Qe(e,t){return ct=8,ye(function(){return e},t)}function ba(){var e;do{for(;e=So.shift();)try{it(e)}catch(n){re.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=ls.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(it),t.__h.some(To),t.__h=[]}catch(n){t.__h=[],re.__e(n,e.__v)}}}while(So.length)}re.__b=function(e){se=null,ts&&ts(e)},re.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),is&&is(e,t)},re.__r=function(e){ns&&ns(e),at=0;var t=(se=e.__c).__H;t&&(Eo==se?se.__h=[]:(t.__h.some(it),t.__h.some(To),at=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),Eo=se},re.diffed=function(e){os&&os(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&cs(ls.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),Eo=se=null},re.__c=function(e,t){t.some(function(n){try{n.__h.some(it),n.__h=n.__h.filter(function(o){return!o.__||To(o)})}catch(o){n.__h=[function(){throw o}]}}),rs&&rs(e,t)},re.unmount=function(e){ss&&ss(e);var t,n,o=e.__c;o&&o.__H&&(o.__H.__.some(function(r){try{if(r.__P&&r.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}r.__P=n,cs(So.push(r))}else it(r)}catch(s){t=s}}),o.__H=void 0,t&&re.__e(t,o.__v))};var as=typeof requestAnimationFrame=="function";function ka(e){var t,n=function(){clearTimeout(o),as&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,35);as&&(t=requestAnimationFrame(n))}function cs(e){e!=1&&es==re.requestAnimationFrame||((es=re.requestAnimationFrame)||ka)(ba)}function it(e){var t=se,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),se=t}function To(e){var t=se;e.__c=e.__(),se=t}function ds(e,t){return!e||e.length!=t.length||t.some(function(n,o){return!ho(n,e[o])})}function us(e,t){return typeof t=="function"?t(e):t}var w=Kn(),Yt=null,yo=new Set;w.onReady((e)=>{Yt=e,zn(e,document.documentElement);for(let t of yo)t(e)});var ps=()=>{let[e,t]=C(Yt);return ee(()=>{if(yo.add(t),Yt)t(Yt);return()=>{yo.delete(t)}},[]),e};var Ia=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},fs=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),Ca=(e,t)=>{let n=e;for(let o of t){if(n===null||n===void 0)return;n=n[o]}return n},xo=(e,t)=>{let n=(o,r)=>{if(typeof o==="function")return(...s)=>{let i=Ca(t.current,r);return typeof i==="function"?i(...s):void 0};if(Array.isArray(o))return o.map((s,i)=>n(s,[...r,i]));if(Ia(o))return Object.fromEntries(Object.entries(o).map(([s,i])=>[s,n(i,[...r,s])]));return o};return n(e,[])};var va=Symbol.for("pv"),wa=0;function f(e,t,n,o,r,s){t||(t={});var i,a,u=t;if("ref"in u&&typeof e!="function")for(a in u={},t)a=="ref"?i=t[a]:u[a]=t[a];var _={type:e,props:u,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:va,__v:--wa,__i:-1,__u:0};return(r||s)&&(_.__source=r,_.__self=s),D.vnode&&D.vnode(_),_}var Ma=(...e)=>e.filter(Boolean).join(" ");var Qt=({children:e,class:t})=>f("span",{class:Ma("sui-chip",t),children:e},void 0,!1,void 0,this);var _s=(e,t)=>{let n=Ue(null),o=Ue(null),r=Ue(t);r.current=t;let s=fs(t),i=Ue(!1);ee(()=>{if(!n.current)return;return o.current=e(n.current,xo(r.current,r)),i.current=!0,()=>{o.current?.dispose(),o.current=null,i.current=!1}},[]);let a=Ue(s);return ee(()=>{if(!i.current||a.current===s)return;a.current=s,o.current?.update(xo(r.current,r))},[s]),n};var pe=(e,t="inline-flex")=>(n)=>{let o=_s(e,n);return f("span",{ref:o,style:{display:t}},void 0,!1,void 0,this)},le=pe(Me),$e=pe(qt),lt=pe(ro,"block"),Ze=pe(so,"block"),ms=pe(ao),th=pe(mo),nh=pe(co),xe=pe(po),Fe=pe(fo,"block"),Es=pe(uo,"block"),oh=pe(_o,"block"),dt=pe(lo,"block"),hs=pe(io),rh=pe(Jt),sh=pe(Jt,"block"),Pa=pe(qt,"block");var Ss=(e,t)=>JSON.stringify({query:e,variables:t});class ae extends Error{kind;constructor(e,t){super(t);this.kind=e}}var z=async(e,t)=>{let n;try{n=await w.request({method:"POST",path:"/graphql",body:Ss(e,t)})}catch(r){if(r instanceof k){if(r.code==="DISCONNECTED"||r.code==="NO_INTEGRATION")throw new ae("disconnected","Linear is not connected.");throw new ae("network",r.message||"Could not reach Linear.")}throw new ae("network",r instanceof Error?r.message:"Could not reach Linear.")}let o;try{o=JSON.parse(n.body)}catch{throw new ae("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new ae("disconnected","Linear sign-in expired.");if(o.errors?.length){let r=o.errors[0],s=r.extensions?.code==="RATELIMITED"||r.extensions?.type==="ratelimited";throw new ae(s?"rate-limited":"graphql",r.message)}if(!o.data)throw new ae("graphql","Linear returned no data.");return o.data};var ut=new Map,Ua=30000,gs=(e)=>{let t=ut.get(e);if(!t)t={at:0,listeners:new Set},ut.set(e,t);return t},Ts=(e)=>{for(let t of e.listeners)t()},Se=(e,t,n=!1)=>{let o=gs(e);if(o.promise)return o.promise;if(!n&&o.value!==void 0&&Date.now()-o.at<Ua)return Promise.resolve(o.value);let r=t().then((s)=>(o.value=s,o.error=void 0,o.at=Date.now(),s),(s)=>{throw o.error=s,s}).finally(()=>{o.promise=void 0,Ts(o)});return o.promise=r,Ts(o),r};var ys=(e)=>{let t=ut.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)Se(e,t.fetcher,!0).catch(()=>{return})},Ao=(e)=>{for(let[t,n]of ut){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)Se(t,n.fetcher,!0).catch(()=>{return})}},Te=(e,t)=>{let[,n]=C(0);ee(()=>{if(!e)return;let r=gs(e);r.fetcher=t;let s=()=>n((i)=>i+1);return r.listeners.add(s),Se(e,t).catch(()=>{return}),()=>{r.listeners.delete(s)}},[e]);let o=e?ut.get(e):void 0;return{data:o?.value,error:o?.error,loading:Boolean(o?.promise)||e!==null&&o?.value===void 0&&o?.error===void 0,refresh:()=>{if(e)Se(e,t,!0).catch(()=>{return})}}};var xs=`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,As=`
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        activeCycle { id number name startsAt endsAt progress isActive isFuture isPast completedAt }
      }
    }
  }
`,Rs=`
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { id name type color position team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,Os=`
  query TeamPeople($teamId: String!) {
    team(id: $teamId) {
      id
      members(first: 250) { nodes { id name displayName avatarUrl avatarBackgroundColor active } }
      labels(first: 250) { nodes { id name color } }
    }
  }
`,bs=`
  query WorkspaceLabels {
    issueLabels(first: 250) { nodes { id name color team { id } } }
  }
`,Ro=`
  query Projects($after: String, $filter: ProjectFilter) {
    projects(first: 100, after: $after, filter: $filter) {
      nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 }
      pageInfo { hasNextPage endCursor }
    }
  }
`,ks=`
  query ProjectDetail($id: String!) {
    project(id: $id) {
      
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }

      description content
      members(first: 50) { nodes { id name displayName avatarUrl avatarBackgroundColor } }
      projectMilestones(first: 50) { nodes { id name targetDate progress sortOrder } }
      lastUpdate { id health createdAt }
      projectUpdates(first: 5) { nodes { id body health createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
      documents(first: 50) { nodes { id title url updatedAt } }
    }
  }
`;var Oo=(e)=>`
  query IssuesByIdentifier {
    ${e.map((t,n)=>`i${n}: issue(id: ${JSON.stringify(t)}) { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 }`).join(`
    `)}
  }
`,Is=`
  query TeamCycles($teamId: String!, $minNumber: Float!) {
    team(id: $teamId) {
      id key name
      cycles(first: 25, filter: { number: { gte: $minNumber } }) { nodes { id number name startsAt endsAt progress isActive isFuture isPast completedAt } }
    }
  }
`;var Cs=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`,vs=`
  query SearchIssues($term: String!, $filter: IssueFilter) {
    searchIssues(term: $term, first: 20, filter: $filter) { nodes { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 } }
  }
`,ws=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`,Ms=`
  query SearchDocuments($term: String!) {
    searchDocuments(term: $term, first: 20) { nodes { id title url updatedAt project { id name } } }
  }
`,Ps=`
  query Documents($filter: DocumentFilter) {
    documents(first: 100, filter: $filter) { nodes { id title url updatedAt project { id name } } }
  }
`,Us=`
  query Document($id: String!) {
    document(id: $id) { id title content url updatedAt project { id name } creator { id name displayName avatarUrl avatarBackgroundColor } }
  }
`;var Ns=`
  mutation IssueCreate($input: IssueCreateInput!) {
    issueCreate(input: $input) { success issue { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 } }
  }
`,Ls=`
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`;var Ds=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,mh={VIEWER:`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,TEAMS:`
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        activeCycle { id number name startsAt endsAt progress isActive isFuture isPast completedAt }
      }
    }
  }
`,WORKFLOW_STATES:`
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { id name type color position team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,TEAM_PEOPLE:`
  query TeamPeople($teamId: String!) {
    team(id: $teamId) {
      id
      members(first: 250) { nodes { id name displayName avatarUrl avatarBackgroundColor active } }
      labels(first: 250) { nodes { id name color } }
    }
  }
`,WORKSPACE_LABELS:`
  query WorkspaceLabels {
    issueLabels(first: 250) { nodes { id name color team { id } } }
  }
`,PROJECTS:`
  query Projects($after: String, $filter: ProjectFilter) {
    projects(first: 100, after: $after, filter: $filter) {
      nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 }
      pageInfo { hasNextPage endCursor }
    }
  }
`,PROJECT_DETAIL:`
  query ProjectDetail($id: String!) {
    project(id: $id) {
      
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }

      description content
      members(first: 50) { nodes { id name displayName avatarUrl avatarBackgroundColor } }
      projectMilestones(first: 50) { nodes { id name targetDate progress sortOrder } }
      lastUpdate { id health createdAt }
      projectUpdates(first: 5) { nodes { id body health createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
      documents(first: 50) { nodes { id title url updatedAt } }
    }
  }
`,ISSUES:`
  query Issues($filter: IssueFilter, $after: String) {
    issues(first: 100, after: $after, filter: $filter) {
      nodes { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 }
      pageInfo { hasNextPage endCursor }
    }
  }
`,CHILD_STATES:`
  query ChildStates($ids: [ID!], $after: String) {
    issues(first: 250, after: $after, filter: { parent: { id: { in: $ids } } }) {
      nodes { parent { id } state { type } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,CHILD_ISSUES:`
  query ChildIssues($ids: [ID!], $after: String) {
    issues(first: 100, after: $after, filter: { parent: { id: { in: $ids } } }) {
      nodes { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 }
      pageInfo { hasNextPage endCursor }
    }
  }
`,ISSUE_EXTRAS:`
  query IssueExtras($ids: [ID!], $after: String) {
    issues(first: 100, after: $after, filter: { id: { in: $ids } }) {
      nodes {
        id
        releases(first: 2) { nodes { id name version } }
        needs(first: 3) { nodes { id customer { id name revenue } } }
        stateHistory(last: 1) { nodes { startedAt } }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`,ISSUE_DETAIL:`
  query IssueDetail($id: String!) {
    issue(id: $id) {
      
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }

      description
      creator { id name displayName avatarUrl avatarBackgroundColor }
      team { id key name states(first: 100) { nodes { id name type color position } } }
      children(first: 50) { nodes { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 } }
      comments(first: 100) { nodes { id body createdAt editedAt url user { id name displayName avatarUrl avatarBackgroundColor } parent { id } } }
      links: attachments(first: 50) { nodes { id title subtitle url sourceType metadata createdAt } }
      relations(first: 25) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
      inverseRelations(first: 25) { nodes { id type issue { id identifier title url state { id name type color position } } } }
      subscribers(first: 25) { nodes { id name displayName avatarUrl avatarBackgroundColor } }
      history(first: 40) {
        nodes {
          id createdAt updatedDescription fromPriority toPriority fromEstimate toEstimate fromTitle toTitle
          actor { id name avatarUrl }
          fromState { name type color } toState { name type color }
          fromAssignee { name } toAssignee { name }
          addedLabels { name color } removedLabels { name color }
          fromCycle { number } toCycle { number }
          fromProject { name } toProject { name }
          toParent { identifier }
          relationChanges { identifier type }
        }
      }
    }
  }
`,STATUS_COUNTS:`
  query StatusCounts($filter: IssueFilter, $after: String) {
    issues(first: 250, after: $after, filter: $filter) {
      nodes { state { id name type color position } team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,STATUS_MINE:`
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { id name type color position } team { id key } project { id name } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,ISSUES_BY_IDENTIFIER:Oo(["ENG-1","ENG-2"]),TEAM_CYCLES:`
  query TeamCycles($teamId: String!, $minNumber: Float!) {
    team(id: $teamId) {
      id key name
      cycles(first: 25, filter: { number: { gte: $minNumber } }) { nodes { id number name startsAt endsAt progress isActive isFuture isPast completedAt } }
    }
  }
`,CYCLE_DETAIL:`
  query CycleDetail($id: String!) {
    cycle(id: $id) { id number name startsAt endsAt progress isActive isFuture isPast completedAt description }
  }
`,CUSTOM_VIEWS:`
  query CustomViews($filter: CustomViewFilter) {
    customViews(first: 50, filter: $filter) {
      nodes { id name icon color shared team { id } }
    }
  }
`,CUSTOM_VIEW_ISSUES:`
  query CustomViewIssues($id: String!, $filter: IssueFilter, $after: String) {
    customView(id: $id) {
      issues(first: 100, after: $after, filter: $filter) {
        nodes { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
`,NOTIFICATIONS:`
  query Notifications($after: String) {
    notificationsUnreadCount
    notifications(first: 50, after: $after) {
      nodes {
        id type title subtitle url inboxUrl readAt createdAt
        actor { id name displayName avatarUrl avatarBackgroundColor }
        ... on IssueNotification {
          issue { id identifier title url state { id name type color position } team { id key } project { id } }
          comment { id body }
        }
        ... on ProjectNotification {
          project { id name url teams(first: 5) { nodes { id } } }
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`,REPO_ATTACHMENTS:`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`,SEARCH_ISSUES:`
  query SearchIssues($term: String!, $filter: IssueFilter) {
    searchIssues(term: $term, first: 20, filter: $filter) { nodes { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 } }
  }
`,SEARCH_PROJECTS:`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`,SEARCH_DOCUMENTS:`
  query SearchDocuments($term: String!) {
    searchDocuments(term: $term, first: 20) { nodes { id title url updatedAt project { id name } } }
  }
`,DOCUMENTS:`
  query Documents($filter: DocumentFilter) {
    documents(first: 100, filter: $filter) { nodes { id title url updatedAt project { id name } } }
  }
`,DOCUMENT:`
  query Document($id: String!) {
    document(id: $id) { id title content url updatedAt project { id name } creator { id name displayName avatarUrl avatarBackgroundColor } }
  }
`,ISSUE_UPDATE:`
  mutation IssueUpdate($id: String!, $input: IssueUpdateInput!) {
    issueUpdate(id: $id, input: $input) { success issue { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 } }
  }
`,ISSUE_CREATE:`
  mutation IssueCreate($input: IssueCreateInput!) {
    issueCreate(input: $input) { success issue { 
  id identifier number title priority estimate dueDate sortOrder url branchName createdAt updatedAt completedAt
  slaBreachesAt slaType startedAt canceledAt addedToCycleAt
  creator { id name avatarUrl }
  state { id name type color position }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 20) { nodes { id name color } }
  team { id key }
  project { id name color icon }
  projectMilestone { id name }
  cycle { id number name }
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type } }
  inRelations: inverseRelations(first: 5) { nodes { type } }
 } }
  }
`,COMMENT_CREATE:`
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`,PROJECT_UPDATE_CREATE:`
  mutation ProjectUpdateCreate($input: ProjectUpdateCreateInput!) {
    projectUpdateCreate(input: $input) { success projectUpdate { id body health createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`,NOTIFICATION_MARK_READ:`
  mutation NotificationMarkRead($id: String!, $readAt: DateTime!) {
    notificationUpdate(id: $id, input: { readAt: $readAt }) { success }
  }
`,NOTIFICATION_MARK_ALL_READ:`
  mutation NotificationMarkAllRead($input: NotificationEntityInput!, $readAt: DateTime!) {
    notificationMarkReadAll(input: $input, readAt: $readAt) { success }
  }
`,NOTIFICATIONS_MARK_READ:Ds(["n1","n2"])};var $s=new Map,bo=(e)=>{for(let t of e)$s.set(t.id,t);return e},Zt=(e)=>$s.get(e),Na={type:{nin:["completed","canceled"]}},en=async(e)=>{if(!e.length)return[];let t=await z(Ro,{after:null,filter:{id:{in:[...e].sort()}}});return bo(t.projects.nodes)},ko=async(e)=>{let t=await z(ws,{term:e});return bo(t.searchProjects.nodes)},La=async(e)=>{let t=await z(Ro,{after:null,filter:{accessibleTeams:{some:{id:{eq:e}}},status:Na}});return bo(t.projects.nodes).sort((n,o)=>n.name.localeCompare(o.name))},Gs=(e)=>{let t=e.length?`projects:${[...e].sort().join(",")}`:null;return Te(t,()=>en(e))},pt=(e)=>{let t=e.length?`team-projects:${[...e].sort().join(",")}`:null;return Te(t,async()=>{let n=await Promise.all(e.map((r)=>Se(`team-projects:${r}`,()=>La(r)))),o=new Set;return n.flat().filter((r)=>o.has(r.id)?!1:(o.add(r.id),!0))})},Hs=(e)=>{let[t,n]=C(e);return ee(()=>{let o=setTimeout(()=>n(e.trim()),250);return()=>clearTimeout(o)},[e]),Te(t.length>=2?`project-search:${t.toLowerCase()}`:null,()=>ko(t))};async function Io(e,t,n,o={}){let r=o.name??"extension",s={};for(let[i,a]of Object.entries(o.query??{}))if(a)s[i]=a;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...o.body!==void 0?{body:JSON.stringify(o.body)}:{}}),a;try{a=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${r} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&a.ok===void 0)return{ok:!1,error:String(a.message??`Error ${i.status}`),code:"failed"};return a}catch(i){let a=i.code;if(a==="NO_SERVICE")return{ok:!1,error:`Approve the ${r} service in Settings > Extensions.`,code:"failed"};if(a==="SERVICE_FAILED")return{ok:!1,error:`The ${r} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${r} service.`,code:"failed"}}}async function de(e,t,n,o={}){try{await e.toast({kind:t,message:n,...o.dismiss?{dismiss:!0}:{}})}catch{}}var tn={source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null,work:null},$a=(e)=>{let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)},ft=(e)=>e.replace(/\/+$/,""),Co=(e)=>ft(e).split("/").pop()??"",Ga=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,Ha=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),n=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(n)return{host:n[1].toLowerCase(),path:n[2]};let o=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(o)return{host:o[1].toLowerCase(),path:o[2]};return null},ja=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],n=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],o=t??n;return o?Ha(o):null},Va=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let n=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(n)return{host:n[1].toLowerCase(),path:n[2]};return null},Ba=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,nn=async(e,t)=>{let n=ft(t),o=(await e.listProjects().catch(()=>{return}))?.projects??[],r=o.find((m)=>ft(m.directory)===n)??null,s=null;for(let m of r?[r]:o){let E=((await e.listWorktrees(m.id).catch(()=>{return}))?.worktrees??[]).find((y)=>ft(y.directory)===n);if(E){r=m,s=E.branch||null;break}}if(!s)s=Ga(await e.readFile(".git/HEAD"));let i=r?`p:${r.id}`:`d:${$a(n)}`,u=[...r?(await e.listSessions(r.id).catch(()=>{return}))?.sessions??[]:[]].sort((m,d)=>d.updatedAt-m.updatedAt),_=[],p=null;for(let m of u){for(let d of m.links??[]){let E=d.url.match(Ba)?.[1]?.toUpperCase();if(E&&!_.includes(E))_.push(E);if(!p&&d.kind==="change")p=Va(d.url)}for(let d of m.items){let E=d.data,y=typeof E?.identifier==="string"?E.identifier.toUpperCase():null;if(y&&!_.includes(y))_.push(y)}}let h=ja(await e.readFile(".git/config"));if(h)await e.setRepo(i,h).catch(()=>{return});else h=await e.getRepo(i).catch(()=>null)??p;return{key:i,ocProjectId:r?.id??null,projectDirectory:r?ft(r.directory):n,directory:n,branch:s,repo:h,linkedIssues:_.slice(0,20)}},Fa=(e,t)=>{let n=[];for(let o of e.matchAll(/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6})-(\d+)(?![A-Za-z0-9])/g)){let r=o[1].toUpperCase(),s=`${r}-${o[2]}`;if(t.has(r)&&!n.includes(s))n.push(s)}return n},_t=(e)=>e.toLowerCase().replace(/[^a-z0-9]/g,""),js=new Set(["api","app","apps","web","ui","service","services","svc","server","client","helm","chart","charts","terraform","tf","infra","argo","deploy","config","lib","libs","sdk","core","backend","frontend","mobile","ios","android","worker"]),Xa=(e)=>{let t=[],n=(i,a,u)=>{if(_t(i).length>=2&&!t.some((_)=>_t(_.text)===_t(i)))t.push({text:i,weight:a,label:u})},o=Co(e.projectDirectory),r=e.repo?Co(e.repo.path):"";if(n(o,1,`folder name "${o}"`),r)n(r,1,`repository "${r}"`);for(let i of[o,r].join("-").split(/[-_.\s]+/))if(i.length>=2&&!js.has(i.toLowerCase()))n(i,0.8,`the word "${i}" in the repository name`);let s=e.repo?e.repo.path.split("/").slice(0,-1).reverse():[];for(let i of s)if(!js.has(i.toLowerCase()))n(i,0.7,`repository group "${i}"`);return t},Wa=(e,t)=>{let n=_t(e),o=_t(t);if(n.length<3||o.length<3)return 0;if(n===o)return 3;if(n.startsWith(o)||o.startsWith(n))return 2;if(n.includes(o)||o.includes(n))return 1;return 0};var Vs=(e,t)=>{let n=null;for(let o of t)for(let r of e){let s=Wa(o.name,r.text)*r.weight;if(o.key&&o.key.toLowerCase()===r.text.toLowerCase()&&o.key.length>=2)s=Math.max(s,2.5*r.weight);if(s>=1.4&&(!n||s>n.score))n={item:o,score:s,label:r.label}}return n},Ka=(e)=>e.status.type!=="completed"&&e.status.type!=="canceled";var za=async(e,t,n)=>{let o=t.branch?Fa(t.branch,n).slice(0,3):[],r=t.linkedIssues.slice(0,1),s=[...o,...r.filter((a)=>!o.includes(a))];if(!s.length)return null;let i=await e.issuesByIdentifier(s).catch(()=>[]);for(let a of s){let u=i.find((_)=>_.identifier===a);if(u)return{identifier:u.identifier,title:u.title,url:u.url,teamKey:u.team.key,projectName:u.project?.name??null,from:o.includes(a)?"branch":"session"}}return null},Bs=(...e)=>e.flatMap((t)=>Array.isArray(t)?t:t===void 0?[]:[t]).filter((t)=>typeof t==="string"),Fs=(e)=>[...new Set(e)],qa=async(e,t,n)=>{let o;try{o=JSON.parse(t)}catch{return null}let r=Bs(o.teams,o.team).map((i)=>n.find((a)=>a.id===i||a.key.toLowerCase()===i.toLowerCase())?.id).filter((i)=>Boolean(i)),s=[];for(let i of Bs(o.projects,o.project)){let a=i.trim(),u=a.match(/linear\.app\/[^/]+\/project\/([^/?#]+)/i)?.[1]?.split("-").pop(),p=(await e.projectsByIds([u??a]).catch(()=>[]))[0]??(await e.searchProjects(a).catch(()=>[])).find((h)=>h.name.toLowerCase()===a.toLowerCase());if(p)s.push(p.id)}return r.length||s.length?{teamIds:Fs(r),projectIds:Fs(s)}:null},Xs=async(e,t,n)=>{let o=new Set(n.map((h)=>h.key.toUpperCase())),r=await za(e,t,o),s=(h)=>({...h,work:r}),i=await e.getMapping(t.key);if(i&&(i.linearProjectIds.length||i.teamIds.length))return s({source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:i.teamIds,projectIds:i.linearProjectIds,mapping:i});let a=await e.readFile(".linear.json");if(a){let h=await qa(e,a,n);if(h)return s({source:"config",inferred:!1,evidence:".linear.json",...h,mapping:null})}if(t.repo){let h=await e.repoAttachments(`${t.repo.host}/${t.repo.path}/`).catch(()=>[]),m=new Map;for(let y of h)if(y.issue)m.set(y.issue.id,{team:y.issue.team.id,project:y.issue.project?.id??null});let d=new Map;for(let{team:y}of m.values())d.set(y,(d.get(y)??0)+1);let E=[...d.entries()].sort((y,O)=>O[1]-y[1])[0];if(E&&E[1]>=3){let y=new Map;for(let{team:x,project:A}of m.values())if(x===E[0]&&A)y.set(A,(y.get(A)??0)+1);let O=[...y.entries()].sort((x,A)=>A[1]-x[1])[0],T=O&&O[1]>=3&&O[1]/E[1]>=0.6?[O[0]]:[];return s({source:"repo",inferred:!0,evidence:`${E[1]} issues with merge requests in ${Co(t.repo.path)}`,teamIds:[E[0]],projectIds:T,mapping:null})}}let u=Xa(t),_=Vs(u,n);if(_)return s({source:"name",inferred:!0,evidence:_.label,teamIds:[_.item.id],projectIds:[],mapping:null});let p=u[0]?.text;if(p){let h=(await e.searchProjects(p).catch(()=>[])).filter(Ka),m=Vs(u,h);if(m)return s({source:"name",inferred:!0,evidence:m.label,teamIds:[],projectIds:[m.item.id],mapping:null})}return s({source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null})};var vo=async(e)=>{try{let t=await w.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},Ws=async(e,t)=>{try{return await w.storage.set(e,t),!0}catch{return!1}},Ks=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),zs=async(e)=>{let t=await vo(`map:${e}`);return Ks(t)?t:null},wo=async(e,t)=>{let n=await Ws(`map:${e}`,t);return Ys(),n},qs=async(e)=>{try{await w.storage.delete(`map:${e}`)}catch{}Ys()},Mo=async(e)=>{let t=await vo(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},Js=async(e,t)=>{let n=await Mo(e);if(n?.host!==t.host||n.path!==t.path)await Ws(`repo:${e}`,t)};var Ys=async()=>{let e=[];try{e=await w.storage.keys()??[]}catch{return}let t={};for(let n of e.filter((o)=>o.startsWith("map:"))){let o=await vo(n);if(Ks(o)&&o.directory)t[o.directory]=o}await Io(w,"PUT","/config",{body:{directories:t},name:"Linear"})};var Ja=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,mt={listProjects:()=>w.listProjects(),listWorktrees:(e)=>w.listWorktrees(e),listSessions:(e)=>w.listSessions(e),readFile:(e)=>w.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:zs,getRepo:Mo,setRepo:Js,issuesByIdentifier:async(e)=>{let t=e.filter((o)=>Ja.test(o));if(!t.length)return[];let n=await z(Oo(t));return Object.values(n).filter((o)=>Boolean(o))},repoAttachments:async(e)=>(await z(Cs,{url:e})).attachments.nodes,searchProjects:ko,projectsByIds:en},Ya=(e,t)=>e.teamsById.get(t)?.name??Zt(t)?.name??"Unknown",Qs=(e,t)=>{let[n,o]=C(null),[r,s]=C(tn),[i,a]=C(!1),[u,_]=C(0),p=Ue(0);ee(()=>{a(!1)},[e]),ee(()=>{if(!t)return;let T=++p.current;if(!e){o(null),s(tn),a(!0);return}(async()=>{let x=await nn(mt,e),A=await Xs(mt,x,t.teams).catch(()=>tn);if(T!==p.current)return;let M=A.teamIds.filter((L)=>t.teamsById.has(L)),q=A.projectIds.length?await en(A.projectIds).catch(()=>[]):[],te=A.projectIds.filter((L)=>q.some((J)=>J.id===L));if(T!==p.current)return;o(x),s({...A,teamIds:M,projectIds:te}),a(!0)})()},[e,t,u]);let h=Qe(()=>_((T)=>T+1),[]),m=Qe(async(T,x)=>{if(!n)return!1;let A=[...T,...x],M=r.mapping?.activeProjectId,q={directory:n.projectDirectory,linearProjectIds:x,teamIds:T,activeProjectId:A.length===1?A[0]:M&&A.includes(M)?M:A[0]??"all",finishComments:r.mapping?.finishComments??"off",updatedAt:Date.now()};s((L)=>({...L,source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:T,projectIds:x,mapping:q}));let te=await wo(n.key,q);if(!te)await de(w,"error","Could not save this folder's choice. It applies until you reload.");return te},[n,r]),d=Qe(async()=>{if(!await m(r.teamIds,r.projectIds))return;let T=t?[...r.teamIds,...r.projectIds].map((x)=>Ya(t,x)).join(", "):"";await de(w,"success",T?`Pinned ${T} to this folder`:"Pinned to this folder")},[m,r,t]),E=Qe(async()=>{if(!n)return;await qs(n.key),h()},[n,h]),y=Qe((T)=>{if(!n||!r.mapping)return;let x={...r.mapping,activeProjectId:T,updatedAt:Date.now()};s((A)=>({...A,mapping:x})),wo(n.key,x)},[n,r]),O=r.teamIds.length+r.projectIds.length>0;return{place:n,detection:r,settled:i,mapped:O,refresh:h,save:m,pin:d,clear:E,setActive:y}};var Qa=5,Po=null,Zs=(e,t)=>{let n=Po?.statesByTeam.get(e)?.filter((r)=>r.type==="started")??[],o=n.findIndex((r)=>r.id===t);return o<0?0.5:(o+1)/(n.length+1)};var Za=async()=>{let e=new Map,t=null;for(let n=0;n<Qa;n+=1){let o=await z(Rs,{after:t});for(let{team:r,...s}of o.workflowStates.nodes){let i=e.get(r.id)??[];i.push(s),e.set(r.id,i)}if(!o.workflowStates.pageInfo.hasNextPage)break;t=o.workflowStates.pageInfo.endCursor}for(let n of e.values())n.sort((o,r)=>o.position-r.position);return e},ec=async()=>{let[e,t,n]=await Promise.all([z(xs).then((o)=>o.viewer),z(As).then((o)=>o.teams.nodes),Za()]);return t.sort((o,r)=>o.name.localeCompare(r.name)),Po={viewer:e,teams:t,teamsById:new Map(t.map((o)=>[o.id,o])),myTeamIds:new Set(e.teams?.nodes.map((o)=>o.id)??[]),statesByTeam:n},Po},tc="workspace";var on=()=>Te(tc,ec);var Ge=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let o=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...o?{}:{year:"numeric"}})};var ei=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let o=Math.max(0,Math.round((t-n)/60000));if(o<1)return"just now";if(o<60)return`${o}m ago`;let r=Math.round(o/60);if(r<24)return`${r}h ago`;let s=Math.round(r/24);if(s<30)return`${s}d ago`;return Ge(e,new Date(t))},Uo=(e)=>`${Math.floor(Math.max(0,Math.min(1,e))*100)}%`,No={onTrack:"On track",atRisk:"At risk",offTrack:"Off track"};var nc={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},rn=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return nc[e]??String(e);return String(e)};var ti=15000,ni=(e)=>e.length>ti?`${e.slice(0,ti)}
[cut]`:e,oi=(e)=>e.filter((t,n,o)=>t||o[n-1]).join(`
`).trim(),ri=(e)=>{let t=e.teams.nodes.map((s)=>s.name).join(", "),n=e.projectMilestones.nodes.slice().sort((s,i)=>s.sortOrder-i.sortOrder).map((s)=>`- ${s.name}${s.targetDate?` (${Ge(s.targetDate)})`:""}: ${Uo(s.progress)}`),o=e.projectUpdates.nodes[0],r=e.content?.trim()||e.description?.trim()||"";return ni(oi([`Linear project: ${e.name}`,`Status: ${e.status.name}.${e.health?` Health: ${No[e.health]}.`:""} Progress: ${Uo(e.progress)}.`,t?`Teams: ${t}.`:"",e.lead?`Lead: ${e.lead.name}.`:"",e.startDate||e.targetDate?`Dates: ${e.startDate?`starts ${Ge(e.startDate)}`:""}${e.startDate&&e.targetDate?", ":""}${e.targetDate?`target ${Ge(e.targetDate)}`:""}.`:"",`Link: ${e.url}`,...n.length?["","Milestones:",...n]:[],...o?["",`Latest update (${Ge(o.createdAt)}, ${o.user?.name??"someone"}${o.health?`, ${No[o.health]}`:""}):`,o.body.trim()]:[],...r?["",r]:[]]))},si=(e)=>ni(oi([`Linear document: ${e.title}`,e.project?`Project: ${e.project.name}.`:"",`Link: ${e.url}`,"",e.content?.trim()??""]));var sn=(e)=>{let[t,n]=C(e);return ee(()=>{let o=setTimeout(()=>n(e.trim()),250);return()=>clearTimeout(o)},[e]),t},ii=(e)=>e.length>=2,ai=(e)=>{let t=sn(e);return Te(ii(t)?`issue-search:${t.toLowerCase()}`:null,async()=>(await z(vs,{term:t})).searchIssues.nodes)},ci=(e)=>{let t=sn(e);return Te(ii(t)?`document-search:${t.toLowerCase()}`:null,async()=>(await z(Ms,{term:t})).searchDocuments.nodes)},li=(e)=>Te(e.length?`project-documents:${[...e].sort().join(",")}`:null,async()=>(await z(Ps,{filter:{project:{id:{in:[...e].sort()}}}})).documents.nodes),di=(e)=>Se(`project:${e}`,async()=>(await z(ks,{id:e})).project),ui=(e)=>Se(`document:${e}`,async()=>(await z(Us,{id:e})).document);var Xe=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ae&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ae&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."};var pi=async(e)=>{let t=await z(Ns,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new ae("graphql","Linear did not create the issue.");return Ao("issues:"),Ao("view-issues:"),t.issueCreate.issue},fi=async(e,t)=>{if(!(await z(Ls,{input:{issueId:e.id,body:t}})).commentCreate.success)throw new ae("graphql","Linear did not save the comment.");ys(`issue:${e.identifier}`)};var _i="linear-dashboard",oc=(e)=>({id:`project:${e.id}`,title:e.name,subtitle:["Project",e.teams.nodes.map((t)=>t.name).join(", "),e.status.name].filter(Boolean).join(" · "),badge:{label:"Project",tone:"info"}}),rc=(e)=>({id:`doc:${e.id}`,title:e.title,subtitle:["Document",e.project?.name,e.updatedAt?`updated ${ei(e.updatedAt)}`:""].filter(Boolean).join(" · "),badge:{label:"Doc"}}),sc=(e)=>{let t=new Set;return e.filter((n)=>t.has(n.id)?!1:(t.add(n.id),!0))},mi=({scope:e,projectIds:t})=>{let[n,o]=C(""),[r,s]=C(null),a=sn(n).length>=2,u=Gs(t),_=pt(e.teamIds),p=Hs(a?n:""),h=ci(a?n:""),m=ye(()=>sc([...u.data??[],..._.data??[]]).slice(0,20),[u.data,_.data]),d=li(m.map((A)=>A.id)),E=a?p.data:m,y=a?h.data:d.data,O=a?!p.data||!h.data:u.loading||_.loading,T=async(A)=>{s(A);try{let[M,q]=[A.slice(0,A.indexOf(":")),A.slice(A.indexOf(":")+1)],te=M==="project"?await(async()=>{let L=await di(q);return{providerId:_i,id:A,title:L.name,url:L.url,kind:"issue",text:ri(L),data:{kind:"project",id:L.id}}})():await(async()=>{let L=await ui(q);return{providerId:_i,id:A,title:L.title,url:L.url,kind:"issue",text:si(L),data:{kind:"document",id:L.id}}})();await w.attach(te),await de(w,"success",`Attached ${te.title} to your message`),await w.close()}catch(M){await de(w,"error",M instanceof ae?Xe(M):"Could not attach it. Open a chat first, then try again."),s(null)}},x=!O&&!E?.length&&!y?.length;return f("div",{class:"lin-stack",children:[f("p",{class:"lin-lead",children:["Attach a Linear project or document to your message, so the agent can read it.",!a&&(m.length?" Showing this folder's projects; type to search all of Linear.":" Type to search Linear.")]},void 0,!0,void 0,this),f(Ze,{value:n,onChange:o,placeholder:"Search projects and documents",autofocus:!0},void 0,!1,void 0,this),r&&f(xe,{size:"sm",label:"Reading it from Linear"},void 0,!1,void 0,this),E&&E.length>0&&f("div",{class:"lin-attach-group",children:[f("div",{class:"lin-subheading",children:"Projects"},void 0,!1,void 0,this),f(dt,{ariaLabel:"Projects",items:E.map(oc),onSelect:(A)=>{if(!r)T(A)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),y&&y.length>0&&f("div",{class:"lin-attach-group",children:[f("div",{class:"lin-subheading",children:"Documents"},void 0,!1,void 0,this),f(dt,{ariaLabel:"Documents",items:y.map(rc),onSelect:(A)=>{if(!r)T(A)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),O&&f(xe,{label:a?"Searching":"Loading"},void 0,!1,void 0,this),x&&f("div",{class:"sui-muted sui-small",children:a?"No project or document matches.":"Nothing for this folder yet."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Ei=({item:e})=>f("div",{class:"lin-dialog-body",children:[f("h2",{class:"lin-dialog-title",children:e.title},void 0,!1,void 0,this),f("p",{class:"lin-lead",children:"This is attached to your message. The agent reads its text, not the page."},void 0,!1,void 0,this),f("div",{class:"lin-form-foot",children:[f(le,{label:"Close",variant:"ghost",size:"sm",onClick:()=>{w.close()}},void 0,!1,void 0,this),e.url&&f(le,{label:"Open in Linear",size:"sm",onClick:()=>{w.openUrl(e.url)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this);var ic=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,hi=(e)=>{if(!e)return[];let t=[],n=(r)=>{let s=r?.toUpperCase();if(s&&!t.includes(s))t.push(s)},o=[...e.links??[]].sort((r,s)=>(s.linkedAt??0)-(r.linkedAt??0));for(let r of o)n(r.url.match(ic)?.[1]);for(let r of e.items??[]){let s=r.data?.identifier;if(typeof s==="string")n(s)}return t};var Si=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let r=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(r.slice(0,2),16),parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16)]}let o=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return o?[Number(o[1]),Number(o[2]),Number(o[3])]:null},Ti=([e,t,n])=>{let o=(r)=>{let s=r/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*o(e)+0.7152*o(t)+0.0722*o(n)},ac=(e,t)=>{let[n,o]=[Ti(e),Ti(t)].sort((r,s)=>s-r);return(n+0.05)/(o+0.05)};var gi=(e,t)=>{let n=Si(e),o=Si(t);if(!n||!o||ac(n,o)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var yi=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),cc=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),o=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${o.toFixed(2)}z`},an=({type:e,color:t,size:n=14,fill:o,teamId:r,stateId:s})=>{let i=t||"currentColor",a=ye(()=>gi(i,yi()),[i,yi()]),u={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return f("svg",{...u,children:[f("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),f("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return f("svg",{...u,children:f("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return f("svg",{...u,children:f("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let _=o??(r&&s?Zs(r,s):0.5);return f("svg",{...u,children:[f("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this),f("path",{d:cc(_),fill:a},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return f("svg",{...u,children:[f("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),f("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return f("svg",{...u,children:[f("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),f("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}};var lc=(e)=>({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:`${e.identifier}: ${e.title}
Status: ${e.state.name}.
Link: ${e.url}`,data:{issueId:e.id,identifier:e.identifier}}),cn=({title:e,issue:t,canLink:n})=>{let[o,r]=C(!1),s=async()=>{try{await w.sessionLink(lc(t)),r(!0),await de(w,"success",`Linked ${t.identifier} to this session`)}catch{await de(w,"error","Open a session to link the issue to it.")}};return f("div",{class:"lin-dialog-body","data-state":"done",children:[f(Fe,{tone:"success",title:e,body:`${t.identifier} ${t.title}`},void 0,!1,void 0,this),f("div",{class:"lin-form-foot",children:[f(le,{label:"Close",variant:"ghost",size:"sm",onClick:()=>{w.close()}},void 0,!1,void 0,this),n&&f(le,{label:o?"Linked":"Link to this session",variant:"outline",size:"sm",disabled:o,onClick:()=>{s()}},void 0,!1,void 0,this),f(le,{label:"Open in Linear",size:"sm",onClick:()=>{w.openUrl(t.url)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var xi=["You write issues for Linear, a tracker used by software teams.",'Answer with one JSON object and nothing else: {"title": string, "description": string}.',"The title is one short line (under 80 characters) that says what needs doing, in plain words.","The description is Markdown: what is wrong or wanted, why it matters when the text says so, and any detail a teammate needs. Use short paragraphs or bullet points. Quote error text and names exactly.","Use only what the text contains. Do not invent causes, owners or dates. Use plain punctuation: no dashes as punctuation."].join(`
`),We=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-10))}
[cut]`,Ai=(e,t,n)=>`Draft a Linear issue from this ${t==="user"?"message I sent":"reply from the coding assistant"} in the session "${n}".

<text>
${We(e.trim(),59600)}
</text>`,Ri=(e,t)=>`Draft a Linear issue from this text, which I selected in ${t?`the session "${t}"`:"a coding session"}.

<text>
${We(e.trim(),59600)}
</text>`,Oi=(e,t)=>{let n=`Draft a Linear issue from this conversation between me and a coding assistant, in the session "${t}". Capture the problem or the task the conversation ended on, not every step.

`,o=60000-n.length-200,r=[],s=0,i=!1;for(let a=e.length-1;a>=0;a-=1){let u=e[a],_=u.text.trim();if(!_)continue;let p=`[${u.role}]
${We(_,8000)}`;if(s+p.length+2>o){if(!r.length)r.push(`[${u.role}]
${We(_,o-20)}`);i=!0;break}r.unshift(p),s+=p.length+2}return`${n}<conversation>
${i?`[earlier messages left out]

`:""}${r.join(`

`)}
</conversation>`},bi=(e,t,n,o=5)=>{let r=e.split(`
`),s=Math.max(1,Math.min(t,n)),i=Math.min(r.length,Math.max(t,n)),a=Math.max(1,s-o),u=Math.min(r.length,i+o);return{text:r.slice(a-1,u).join(`
`),from:a,to:u}},ln=(e,t)=>{let n=Math.min(e,t),o=Math.max(e,t);return n===o?`${n}`:`${n}-${o}`},Lo=(e,t,n)=>`Location: \`${e}:${ln(t,n)}\``,ki=(e,t,n,o)=>{let r=e.trim();if(r.includes(t))return r;let s=Lo(t,n,o);return r?`${r}

${s}`:s},Ii=(e,t,n,o,r)=>{let s=`File: ${e}
Selected lines: ${ln(t,n)}`;if(!o)return`Draft a Linear issue about a change to a file in my project. I could not read the file, so describe only where it is.

${s}`;return[`Draft a Linear issue about the lines I selected in a file of my project.${r?" The selection is on the removed side of a diff, so the lines below are the current file and may differ.":""} Say in the description which file and lines it concerns.`,"",`${s} (the snippet shows lines ${o.from} to ${o.to})`,"","<code>",We(o.text,30000),"</code>"].join(`
`)},dc=(e)=>{let t="",n=!1,o=!1;for(let r of e)if(n){if(o){o=!1,t+=r;continue}if(r==="\\"){o=!0,t+=r;continue}if(r==='"'){n=!1,t+=r;continue}if(r===`
`){t+="\\n";continue}if(r==="\r")continue;if(r==="\t"){t+="\\t";continue}t+=r}else{if(r==='"')n=!0;t+=r}return t},uc=(e)=>{for(let t of[e,dc(e)])try{let n=JSON.parse(t);if(typeof n==="object"&&n!==null&&!Array.isArray(n))return n}catch{}return null},pc=(e)=>{let t=e.indexOf("{"),n=e.lastIndexOf("}");if(t<0||n<=t)return null;let o=uc(e.slice(t,n+1));if(!o||typeof o.title!=="string")return null;let r=o.title.replace(/\s+/g," ").trim().slice(0,200);if(!r)return null;let s=typeof o.description==="string"?o.description.trim():"";return{title:r,description:s}},Do=(e,t)=>{if(e==="NO_MODEL")return{kind:"no-model"};if(e==="NOT_GRANTED")return{kind:"failed",message:"This extension is not allowed to use the Small Model. Approve it in Settings, Extensions."};if(e==="HOST_TIMEOUT")return{kind:"failed",message:"The Small Model took too long to answer."};return{kind:"failed",message:t||"The Small Model could not draft the issue."}},Ci=(e)=>{let t=pc(e);return t?{kind:"draft",draft:t}:{kind:"failed",message:"The Small Model answered, but its answer could not be read."}};var $o=(e)=>e,vi=(e)=>{let t=e.replace(/\s+/g," ").trim();return t?t.length>160?`${t.slice(0,157).trimEnd()}…`:t:null},wi="There is no text to draft from, so the form starts empty.",Mi=(e,t)=>{if(!e||!("kind"in e))return null;if(e.kind==="message"&&e.action!=="comment-on-issue")return{key:`message:${e.messageId}`,source:e.role==="user"?"From a message you sent":"From a reply by the assistant",quote:vi(e.text),build:async()=>e.text.trim()?{prompt:Ai(e.text,e.role,e.sessionTitle)}:{prompt:null,note:wi},finish:$o};if(e.kind==="selection")return{key:`selection:${e.messageId}:${e.text.length}`,source:"From the text you selected",quote:vi(e.text),build:async()=>e.text.trim()?{prompt:Ri(e.text,t.sessionTitle)}:{prompt:null,note:wi},finish:$o};if(e.kind==="session"){let n=e.messages??[];return{key:`session:${e.sessionId}`,source:n.length?`From this chat (${n.length} ${n.length===1?"message":"messages"})`:"From this chat",quote:null,build:async()=>n.length?{prompt:Oi(n.map((o)=>({role:o.role,text:o.text})),e.sessionTitle)}:{prompt:null,note:"OpenChamber did not hand over the messages of this chat, so the form starts empty."},finish:$o}}if(e.kind==="diff"){let{path:n,startLine:o,endLine:r}=e;return{key:`diff:${n}:${o}:${r}`,source:`From ${n}, line${o===r?"":"s"} ${ln(o,r)}`,quote:null,initial:{description:Lo(n,o,r)},build:async()=>{let s=await t.readFile(n),i=s===null?null:bi(s,o,r);return{prompt:Ii(n,o,r,i,e.side==="deletions")}},finish:(s)=>({...s,description:ki(s.description,n,o,r)})}}return null},Pi=(e,t)=>`**OpenChamber session: ${e}**

${We(t.trim(),20000)}`;var fc=async(e,t)=>{let n=e.directory??t;if(!n)return[];let o=await nn(mt,n);if(!o.ocProjectId)return[];let s=(await w.listSessions(o.ocProjectId).catch(()=>{return}))?.sessions.find((a)=>a.id===e.sessionId),i=hi(s).slice(0,10);return i.length?mt.issuesByIdentifier(i):[]},Ui=({issues:e,onPick:t,label:n})=>f(dt,{ariaLabel:n,items:e.map((o)=>({id:o.id,leading:o.identifier,title:o.title,meta:o.state.name})),onSelect:(o)=>{let r=e.find((s)=>s.id===o);if(r)t(r)},emptyText:"No issue found."},void 0,!1,void 0,this),_c=({linked:e,onPick:t})=>{let[n,o]=C(""),r=ai(n),s=n.trim().length>=2;return f("div",{class:"lin-stack",children:[f("p",{class:"lin-lead",children:e.length?"This session is linked to more than one issue. Pick the one to comment on, or search for another.":"No issue is linked to this session. Search for the issue to comment on."},void 0,!1,void 0,this),f(Ze,{value:n,onChange:o,placeholder:"Search Linear issues",autofocus:!0},void 0,!1,void 0,this),s?r.data?f(Ui,{issues:r.data,onPick:t,label:"Search results"},void 0,!1,void 0,this):f(xe,{label:"Searching"},void 0,!1,void 0,this):e.length?f(Ui,{issues:e,onPick:t,label:"Linked issues"},void 0,!1,void 0,this):null]},void 0,!0,void 0,this)},Ni=({item:e,directory:t})=>{let[n,o]=C(null),[r,s]=C(null),[i,a]=C(!1),[u,_]=C(()=>Pi(e.sessionTitle,e.text)),[p,h]=C(!1),[m,d]=C(null);ee(()=>{let y=!0;return fc(e,t).catch(()=>[]).then((O)=>{if(!y)return;if(o(O),O.length===1)s(O[0]);else a(!0)}),()=>{y=!1}},[e.sessionId,e.messageId]);let E=async()=>{if(!r||!u.trim()||p)return;h(!0);try{await fi(r,u),await de(w,"success",`Commented on ${r.identifier}`),d(r)}catch(y){await de(w,"error",Xe(y)),h(!1)}};if(m)return f(cn,{title:"Comment posted",issue:m,canLink:!(n??[]).some((y)=>y.id===m.id)},void 0,!1,void 0,this);if(n===null)return f("div",{class:"lin-dialog-body",children:f(xe,{label:"Finding the issues linked to this session"},void 0,!1,void 0,this)},void 0,!1,void 0,this);return f("div",{class:"lin-dialog-body",children:[f("h2",{class:"lin-dialog-title",children:"Comment on Linear issue"},void 0,!1,void 0,this),i||!r?f(_c,{linked:n,onPick:(y)=>{s(y),a(!1)}},void 0,!1,void 0,this):f(ge,{children:[f("div",{class:"lin-comment-target",children:[f(Qt,{children:[f(an,{type:r.state.type,color:r.state.color,teamId:r.team.id,stateId:r.state.id},void 0,!1,void 0,this)," ",f("span",{class:"sui-mono",children:r.identifier},void 0,!1,void 0,this)," ",f("span",{class:"lin-ellipsis",children:r.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),f(le,{label:"Change issue",variant:"ghost",size:"xs",onClick:()=>a(!0)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),f("div",{class:"lin-grow",children:f(lt,{label:"Comment",value:u,onChange:_,multiline:!0,rows:8,placeholder:"Write a comment. Markdown works."},void 0,!1,void 0,this)},void 0,!1,void 0,this),f("div",{class:"lin-form-foot",children:[f(le,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>{w.close()}},void 0,!1,void 0,this),f(le,{label:"Post comment",size:"sm",disabled:!u.trim(),loading:p,onClick:()=>{E()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Li=["triage","backlog","unstarted","started","completed","canceled","duplicate"],Et=(e,t)=>Li.indexOf(e.type)-Li.indexOf(t.type)||e.position-t.position;var Go=["No priority","Urgent","High","Medium","Low"];var mc=(e)=>[...e??[]].sort(Et);var Di=(e,t)=>{let n=mc(t);return n.find((r)=>r.id===e?.defaultIssueState?.id&&r.type!=="triage")??n.find((r)=>r.type==="backlog")??n.find((r)=>r.type==="unstarted")??null};var Ec={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},Ho=(e)=>{let t=e?Ec[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]};var $i=(e,t)=>e.name.localeCompare(t.name),hc=(e)=>Se(`team-people:${e}`,async()=>(await z(Os,{teamId:e})).team),Sc=()=>Se("workspace-labels",async()=>(await z(bs)).issueLabels.nodes.filter((e)=>!e.team).map(({team:e,...t})=>t)),dn=(e)=>Te(e?`pickers:${e}`:null,async()=>{let[t,n]=await Promise.all([hc(e),Sc()]),o=new Set,r=[...t.labels.nodes,...n].filter((s)=>o.has(s.id)?!1:(o.add(s.id),!0)).sort($i);return{members:t.members.nodes.filter((s)=>s.active).sort($i),labels:r}}),jo=(e,t)=>Te(e?`open-cycles:${e}`:null,async()=>(await z(Is,{teamId:e,minNumber:t??0})).team.cycles.nodes.filter((o)=>o.isActive||o.isFuture).sort((o,r)=>o.number-r.number));var Vo=({label:e})=>f(Qt,{children:[f("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this);var Hi=({teamId:e,chosen:t,onChange:n,startOpen:o=!1})=>{let[r,s]=C(o),[i,a]=C(""),u=dn(r?e:null),_=new Set(t.map((E)=>E.id)),p=new Map([...u.data?.labels??[],...t].map((E)=>[E.id,E])),h=i.trim().toLowerCase(),m=[...p.values()].filter((E)=>!h||E.name.toLowerCase().includes(h)).sort((E,y)=>Number(_.has(y.id))-Number(_.has(E.id))||E.name.localeCompare(y.name)),d=(E)=>n(_.has(E.id)?t.filter((y)=>y.id!==E.id):[...t,E]);return f("div",{class:"lin-stack lin-stack--tight",children:[f("div",{class:"sui-row",children:[t.map((E)=>f(Vo,{label:E},E.id,!1,void 0,this)),f(le,{label:r?"Done":t.length?"Edit labels":"Add label",variant:"ghost",size:"xs",onClick:()=>s(!r)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),r&&f("div",{class:"lin-label-picker",children:[f(Ze,{value:i,onChange:a,placeholder:"Find a label"},void 0,!1,void 0,this),f("div",{class:"lin-label-list",children:[!u.data&&f("span",{class:"sui-muted sui-small",children:"Loading labels"},void 0,!1,void 0,this),m.map((E)=>f("div",{class:"lin-label-option",children:[f("span",{class:"lin-swatch",style:{background:E.color}},void 0,!1,void 0,this),f(hs,{label:E.name,checked:_.has(E.id),onChange:()=>d(E)},void 0,!1,void 0,this)]},E.id,!0,void 0,this)),u.data&&!m.length&&f("span",{class:"sui-muted sui-small",children:"No label matches."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var ce="__none__",ji=({teamIds:e,projectId:t=null,initial:n,draft:o,onCreated:r,onEscape:s,rows:i=6})=>{let a=on().data,u=ye(()=>{let v=a?.teams??[],Re=new Set([...e,...a?.myTeamIds??[]]);return[...v.filter((Ke)=>Re.has(Ke.id)),...v.filter((Ke)=>!Re.has(Ke.id))]},[a,e]),[_,p]=C(e[0]??u[0]?.id??""),h=a?.teamsById.get(_),m=ye(()=>[...a?.statesByTeam.get(_)??[]].sort(Et),[a,_]),[d,E]=C(n?.title??""),[y,O]=C(n?.description??""),[T,x]=C({title:!1,description:!1}),[A,M]=C(ce),[q,te]=C("0"),[L,J]=C(ce),[ue,ne]=C(ce),[V,S]=C(ce),[g,Ae]=C(t??ce),[Ie,Ne]=C([]),[et,tt]=C(!1);ee(()=>{if(!o)return;if(!T.title)E(o.title);if(!T.description)O(o.description)},[o]),ee(()=>{M(Di(h,m)?.id??m[0]?.id??ce),J(ce),ne(ce),S(ce),Ne([])},[_,m.length]);let fe=dn(_||null),ht=jo(h?.cyclesEnabled?_:null,h?.activeCycle?.number),j=pt(_?[_]:[]),nt=Ho(h),ie=!et&&Boolean(d.trim())&&Boolean(_),X=async()=>{if(!ie)return;tt(!0);try{let v=await pi({teamId:_,title:d.trim(),...y.trim()?{description:y}:{},...A!==ce?{stateId:A}:{},priority:Number(q),...L!==ce?{assigneeId:L}:{},...ue!==ce?{estimate:Number(ue)}:{},...V!==ce?{cycleId:V}:{},...g!==ce?{projectId:g}:{},...Ie.length?{labelIds:Ie.map((Re)=>Re.id)}:{}});await de(w,"success",`Created ${v.identifier}`),r(v)}catch(v){await de(w,"error",Xe(v)),tt(!1)}},Y=[{id:ce,label:"No project"},...t&&!(j.data??[]).some((v)=>v.id===t)?[{id:t,label:"This folder's project"}]:[],...(j.data??[]).map((v)=>({id:v.id,label:v.name}))];return{body:f("div",{onKeyDown:(v)=>{if(v.stopPropagation(),v.key==="Enter"&&(v.metaKey||v.ctrlKey))X();if(v.key==="Escape")s?.()},class:"lin-stack lin-form",children:[f("div",{class:"lin-field-row",children:f($e,{value:_,searchable:u.length>8,options:u.map((v)=>({id:v.id,label:v.name,hint:v.key})),onChange:p},void 0,!1,void 0,this)},void 0,!1,void 0,this),f(lt,{value:d,onChange:(v)=>{x((Re)=>({...Re,title:!0})),E(v)},placeholder:"Issue title",label:"Title"},void 0,!1,void 0,this),f("div",{class:"lin-grow",children:f(lt,{value:y,onChange:(v)=>{x((Re)=>({...Re,description:!0})),O(v)},multiline:!0,rows:i,placeholder:"Add a description. Markdown works. Cmd+Enter creates.",label:"Description"},void 0,!1,void 0,this)},void 0,!1,void 0,this),f("div",{class:"lin-field-row",children:[f($e,{value:A,options:m.map((v)=>({id:v.id,label:v.name})),onChange:M},void 0,!1,void 0,this),f($e,{value:q,options:[0,1,2,3,4].map((v)=>({id:String(v),label:v?Go[v]:"No priority"})),onChange:te},void 0,!1,void 0,this),f($e,{value:L,searchable:!0,options:[{id:ce,label:"No assignee"},...(fe.data?.members??[]).map((v)=>({id:v.id,label:v.name}))],onChange:J},void 0,!1,void 0,this),nt.length>0&&f($e,{value:ue,options:[{id:ce,label:"No estimate"},...nt.map((v)=>({id:String(v),label:rn(v,h?.issueEstimationType)??String(v)}))],onChange:ne},void 0,!1,void 0,this),h?.cyclesEnabled&&f($e,{value:V,options:[{id:ce,label:"No cycle"},...(ht.data??[]).map((v)=>({id:v.id,label:`Cycle ${v.number}`,hint:v.isActive?"Current":"Upcoming"}))],onChange:S},void 0,!1,void 0,this),f($e,{value:g,searchable:!0,options:Y,onChange:Ae},void 0,!1,void 0,this)]},void 0,!0,void 0,this),_&&f(Hi,{teamId:_,chosen:Ie,onChange:Ne},void 0,!1,void 0,this)]},void 0,!0,void 0,this),submit:()=>{X()},canSubmit:ie,busy:et}};var Vi=async(e)=>{try{let{text:t}=await w.generate({prompt:e,system:xi,maxOutputTokens:1500});return Ci(t)}catch(t){if(t instanceof k)return Do(t.code,t.message);return Do(void 0,t instanceof Error?t.message:"")}};var Bi=(e)=>{let[t,n]=C(e?{kind:"working"}:{kind:"idle"}),[o,r]=C(0);return ee(()=>{let s=!0;if(!e){n({kind:"idle"});return}return n({kind:"working"}),(async()=>{let i=await e.build().catch(()=>({prompt:null,note:"Could not read what to draft from."}));if(!s)return;if(!i.prompt){n({kind:"nothing",note:i.note??"There is nothing to draft from."});return}let a=await Vi(i.prompt);if(!s)return;n(a.kind==="draft"?{kind:"draft",draft:e.finish(a.draft)}:a)})(),()=>{s=!1}},[e?.key,o]),{state:t,retry:()=>r((s)=>s+1)}};var xc=({state:e,retry:t})=>{if(e.kind==="idle")return null;if(e.kind==="working")return f("div",{class:"lin-draft-note",children:f(xe,{size:"sm",label:"Drafting with the Small Model. You can start typing; your words stay."},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(e.kind==="draft")return f("div",{class:"lin-draft-note sui-muted sui-small",children:"Drafted by the Small Model. Check it before you create the issue."},void 0,!1,void 0,this);if(e.kind==="nothing")return f("div",{class:"lin-draft-note sui-muted sui-small",children:e.note},void 0,!1,void 0,this);if(e.kind==="no-model")return f(Fe,{tone:"info",title:"No Small Model is set up",body:"Choose one in OpenChamber's settings to have issues drafted for you. The form is empty for now."},void 0,!1,void 0,this);return f(Fe,{tone:"warning",title:"Could not draft the issue",body:`${e.message} The form is empty.`,action:{label:"Try again",onClick:t}},void 0,!1,void 0,this)},Bo=({job:e,scope:t,hidden:n=!1})=>{let{state:o,retry:r}=Bi(e),[s,i]=C(null),a=ji({teamIds:t.teamIds,projectId:t.projectId,...e?.initial?{initial:e.initial}:{},draft:o.kind==="draft"?o.draft:null,onCreated:i,onEscape:()=>{w.close()},rows:8});if(s)return f(cn,{title:"Issue created",issue:s,canLink:!0},void 0,!1,void 0,this);return f("div",{class:"lin-dialog-body",hidden:n,children:[e&&f(ge,{children:[f("h2",{class:"lin-dialog-title",children:"Create Linear issue"},void 0,!1,void 0,this),f("div",{class:"lin-source",children:[f("span",{class:"sui-muted sui-small",children:e.source},void 0,!1,void 0,this),e.quote&&f("span",{class:"lin-quote sui-small",children:e.quote},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),f(xc,{state:o,retry:r},void 0,!1,void 0,this),a.body,f("div",{class:"lin-form-foot",children:[f(le,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>{w.close()}},void 0,!1,void 0,this),f(le,{label:a.busy?"Creating...":"Create issue",size:"sm",disabled:!a.canSubmit,onClick:a.submit},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Fi=({teamIds:e,projectIds:t,activeId:n,teamsOfProject:o})=>{let r=n&&t.includes(n)?n:t.length===1?t[0]:null,s=[],i=(a)=>{if(!s.includes(a))s.push(a)};if(n&&e.includes(n))i(n);if(r)for(let a of o(r))i(a);for(let a of e)i(a);for(let a of t)for(let u of o(a))i(u);return{teamIds:s,projectId:n&&e.includes(n)?null:r}};var Ac=(e)=>{if(!e)return"none";if(!("kind"in e)||!("action"in e))return`chip:${e.id??""}`;return`${e.kind}:${e.action}:${"messageId"in e?e.messageId:("sessionId"in e)?e.sessionId:("path"in e)?`${e.path}`:""}`},Rc=({scope:e,projectIds:t})=>{let[n,o]=C("create");return f("div",{class:"lin-dialog-body",children:[f(ms,{items:[{id:"create",label:"Create issue"},{id:"attach",label:"Attach"}],activeId:n,onChange:(r)=>o(r)},void 0,!1,void 0,this),f(Bo,{job:null,scope:e,hidden:n!=="create"},void 0,!1,void 0,this),n==="attach"&&f(mi,{scope:e,projectIds:t},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Xi=({ctx:e})=>{let t=on(),n=Qs(e.directory,t.data),o=e.item,r=Ac(o),s=ye(()=>Mi(o,{readFile:(u)=>w.readFile(u).then((_)=>_?.content??null,()=>null),sessionTitle:e.session?.title??null}),[r]);if(t.error&&!t.data){let u=t.error instanceof ae?t.error:new ae("network",String(t.error));if(u.kind==="disconnected")return f("div",{class:"lin-dialog",children:f(Es,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber, then open this again.",action:{label:"Connect Linear",onClick:()=>{w.oauthStart()}}},void 0,!1,void 0,this)},void 0,!1,void 0,this);return f("div",{class:"lin-dialog",children:f(Fe,{tone:"error",title:"Could not load Linear",body:u.message,action:{label:"Retry",onClick:()=>t.refresh()}},void 0,!1,void 0,this)},void 0,!1,void 0,this)}if(!t.data||!n.settled)return f("div",{class:"lin-center",children:f(xe,{label:"Loading Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let i=Fi({teamIds:n.detection.teamIds,projectIds:n.detection.projectIds,activeId:n.detection.mapping?.activeProjectId,teamsOfProject:(u)=>Zt(u)?.teams.nodes.map((_)=>_.id)??[]}),a;if(s)a=f(Bo,{job:s,scope:i},s.key,!1,void 0,this);else if(o&&"kind"in o&&o.kind==="message"&&o.action==="comment-on-issue")a=f(Ni,{item:o,directory:e.directory},r,!1,void 0,this);else if(o&&"providerId"in o)a=f(Ei,{item:o},void 0,!1,void 0,this);else a=f(Rc,{scope:i,projectIds:n.detection.projectIds},void 0,!1,void 0,this);return f("div",{class:"lin-dialog",children:a},void 0,!1,void 0,this)};var Oc=()=>{let e=ps();if(!e)return f("div",{class:"lin-center",children:f(xe,{label:"Loading"},void 0,!1,void 0,this)},void 0,!1,void 0,this);return f(Xi,{ctx:e},void 0,!1,void 0,this)};ar(f(Oc,{},void 0,!1,void 0,this),document.getElementById("root"));})();

(()=>{var G,tr,ra,De,Sn,kt,nr,At,or,Tn,gn,sa,rt=Symbol.for("pv"),It={},Ct=[],ia=/^m(i|n|o|s|text|space)$/,yn=Array.isArray,rr=Ct.slice,je=Object.assign;function He(e){e&&e.parentNode&&e.remove()}function Rt(e,t,n,o,r){var s={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:rt,__v:r||++tr,__i:-1,__u:0};return!r&&G.vnode&&G.vnode(s),s}function Te(e){return e.children}function bt(e,t){this.props=e,this.context=t,this.__g=0}function $e(e,t){if(t==null)return e.__&&$e(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:$e(e)}function aa(e){var t,n=e.__v,o=n.__e,r=[],s=[],i=e.__P;i&&((t=je({constructor:rt},n)).__v=n.__v+1,G.vnode&&G.vnode(t),xn(i,t,n,e.__n,i.namespaceURI,32&n.__u?[o]:null,r,o||$e(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,dr(r,t,s),n.__=n.__e=null,t.__e!=o&&sr(t))}function sr(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),sr(e)}function Zo(e){(8&e.__g||(e.__g|=8,De.push(e),kt++))&&Sn==G.debounceRendering||((Sn=G.debounceRendering)||queueMicrotask)(ir)}function ir(){try{for(var e,t=1;De.length;)De.length>t&&De.sort(nr),e=De.shift(),t=De.length,8&e.__g&&aa(e)}finally{(kt=De.length)&&(Sn||queueMicrotask)(ir)}}function ar(e,t,n,o,r,s,i,a,u,m,p){var h,_,l,E,y,b,g=o.__k||Ct,x=t.length;for(u=ca(n,t,g,u,x),h=0;h<x;h++)(l=n.__k[h])!=null&&(_=~l.__i&&g[l.__i]||It,l.__i=h,b=xn(e,l,_,r,s,i,a,u,m,p),E=l.__e,(_.ref!=l.ref||8&_.__u)&&(_.ref&&An(_.ref,null,l,_),l.ref&&p.push(l.ref,l.__c||E,l)),y=y||E,4&l.__u?(u=cr(l,u,e,!_.__v),_.__e&&(_.__e=null)):typeof l.type=="function"&&b!==void 0?u=b:E&&(u=E.nextSibling),l.__u&=-21);return n.__e=y,u}function ca(e,t,n,o,r){var s,i,a,u,m,p,h,_,l,E=n.length,y=E,b=0,g=0,x=e.__k=Array(r);for(s=0;s<r;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=x[s]=Rt(null,i):yn(i)?i=x[s]=Rt(Te,{children:i}):i.constructor===rt&&i.__b?i=x[s]=Rt(i.type,i.props,i.key,i.ref,i.__v):x[s]=i,u=s+b,i.__=e,i.__b=e.__b+1,a=null,~(m=i.__i=la(i,n,u,y))&&(y--,(a=n[m])&&(a.__u|=2)),a&&a.__v?(i.__u|=16,m==u-1?b--:m==u+1?b++:m!=u&&(m>u?b--:b++,g=1)):(~m||(r>E?b--:r<E&&b++),typeof i.type!="function"&&(i.__u|=4))):x[s]=null;if(g){for(p=[],h=[],s=0;s<r;s++)if((i=x[s])&&16&i.__u){for(b=0,_=p.length;b<_;)p[l=b+_>>1]<i.__i?b=l+1:_=l;p[b]=i.__i,h[s]=b+1}for(b=p.length;s--;)h[s]&&(h[s]==b?b--:x[s].__u|=4)}if(y)for(s=0;s<E;s++)!(a=n[s])||2&a.__u||(a.__e==o&&(o=$e(a)),Rn(a,a));return o}function cr(e,t,n,o){var r,s,i,a;if(typeof e.type=="function"){if(e.props.__P)return t;if(r=e.__k)for(s=0;s<r.length;s++)r[s]&&(r[s].__=e,t=cr(r[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=$e(e))&&!t.parentNode&&(t=null),i=e.__e,a=t;a&&a.nodeType==8;)a=a.nextSibling;for(i!=a&&(!o&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function la(e,t,n,o){var r,{key:s,type:i}=e,a=t[n],u=a&&!(2&a.__u);if(a===null&&s==null||u&&s==a.key&&i==a.type)return n;if(o>(u?1:0)){for(r=n-1;r>=0;r--)if((a=t[r])&&!(2&a.__u)&&s==a.key&&i==a.type)return r;for(r=n+1;r<t.length;r++)if((a=t[r])&&!(2&a.__u)&&s==a.key&&i==a.type)return r}return-1}function er(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function xt(e,t,n,o,r){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||er(e.style,t);if(n)for(t in n)o&&n[t]==o[t]||er(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof o!="function"&&(o=null),(e.__e||(e.__e={}))[t]=n,n&&o||(i=gn[t]||(gn[t]=da(t)),(e.__a||(e.__a={}))[t]=Tn,s=t!=(t=t.replace(or,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(a){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function da(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[At]==null)t[At]=Tn++;else if(t[At]<this.__a[e])return;return n(G.event?G.event(t):t)}}}function xn(e,t,n,o,r,s,i,a,u,m){var p,h,_,l,E,y,b,g,x,R,U,K,ne,N,j,oe,z,M,S=t.type;if(t.constructor!==rt)return null;128&n.__u&&(u=32&n.__u,p=n.__c.__z)&&(t.__u|=u,h=s=[],p.nodeType==8?a=Ot(p,s):s.push(p),a=s[0]||a),(p=G.__b)&&p(t);e:if(typeof S=="function"){_=i.length;try{if(g=t.props,x=(p=S.prototype)&&p.render,R=(p=S.contextType)&&o[p.__c],U=p?R?R.props.value:p.__:o,(l=n.__c)?(t.__c=l,2&l.__g&&(l.__g|=1)):(x?t.__c=l=new S(g,U):(t.__c=l=new bt(g,U),l.constructor=S,l.render=pa),R&&R.sub(l),l.state||(l.state={}),l.__n=o,l.__g|=8,l.__h=[],l.__k=[]),x&&(l.__s||(l.__s=l.state),S.getDerivedStateFromProps&&(l.__s==l.state&&(l.__s=je({},l.__s)),je(l.__s,S.getDerivedStateFromProps(g,l.__s)))),E=l.props,y=l.state,l.__v=t,n.__c){if(g!==E&&x&&!S.getDerivedStateFromProps&&l.componentWillReceiveProps&&l.componentWillReceiveProps(g,U),t.__v==n.__v&&!(8&l.__g)||!(4&l.__g)&&l.shouldComponentUpdate&&l.shouldComponentUpdate(g,l.__s,U)===!1){t.__v!=n.__v&&(l.props=g,l.state=l.__s,l.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(T){T&&(T.__=t)}),Ct.push.apply(l.__h,l.__k),l.__k=[],l.__h.length&&i.push(l),a=$e(n);break e}l.componentWillUpdate&&l.componentWillUpdate(g,l.__s,U),x&&l.componentDidUpdate&&l.__h.push(function(){l.componentDidUpdate(E,y,b)})}else x&&!S.getDerivedStateFromProps&&l.componentWillMount&&l.componentWillMount(),x&&l.componentDidMount&&l.__h.push(l.componentDidMount);l.context=U,l.props=g,l.__P=e,l.__g&=-5,K=G.__r,ne=x?25:0;do l.__g&=-9,K&&K(t),p=l.render(l.props,l.state=l.__s,l.context);while(8&l.__g&&++ne<25);x&&(Ct.push.apply(l.__h,l.__k),l.__k=[]),l.state=l.__s,l.getChildContext&&(o=je({},o,l.getChildContext())),x&&n.__c&&l.getSnapshotBeforeUpdate&&(b=l.getSnapshotBeforeUpdate(E,y)),N=p&&p.type===Te&&p.key==null?p.props.children:p,g.__P&&(p=a,r=(e=g.__P).namespaceURI,u=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(T){T&&Rn(T,T)}),n.__k=null),a=n.__k?$e(n,0):null),a=ar(e,yn(N)?N:[N],t,n,o,r,s,i,a,u,m),g.__P&&(t.__e=null,a=p),t.__u&=-161,h&&h.some(He),l.__h.length&&i.push(l),1&l.__g&&(l.__g&=-4)}catch(T){if(i.length=_,t.__v=null,u||s)if(T&&T.then){if(t.__u|=128|u,s){for(~(z=s.indexOf(a||void 0))||(z=s.length);(M=s[z-1])&&M.nodeType==8;)z--;for(;z<s.length;z++)if(M=s[z])if(s[z]=null,j){if(M==oe)break}else{if(M.nodeType!=8)break;M.data.startsWith("$s")&&(oe=Ot(j=M))}}if(!j){for(;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;j=a}(p=Ot(j=t.__c.__z||(t.__c.__z=j)))?(t.__e=j,a=p):t.__e=a,a=a&&a.nextSibling}else s&&s.some(He);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),T&&T.then||lr(t),G.__e(T,t,n)}}else a=t.__e=ua(n.__e,t,n,o,r,s,i,u,m,e);return(p=G.diffed)&&p(t),a}function Ot(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function lr(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(lr))}function dr(e,t,n){for(var o=0;o<n.length;)An(n[o++],n[o++],n[o++]);G.__c&&G.__c(t,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(s){s.call(r)})}catch(s){G.__e(s,r.__v)}})}function ua(e,t,n,o,r,s,i,a,u,m){var p,h,_,l,E,y,b,g,x=n.props||It,{props:R,type:U}=t;if(U=="svg"?r="http://www.w3.org/2000/svg":U=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((E=s[p])&&(U?E.localName==U:E.nodeType==3)){e=E,s[p]=null;break}}if(!e){if(g=m.ownerDocument||document,!U)return g.createTextNode(R);e=g.createElementNS(r,U,R.is?R:m),a&&(G.__m&&G.__m(t,s),a=!1),s=null}if(U){if(m=U=="template"&&e.content||e,s=U=="textarea"&&R.defaultValue!=null?null:s&&rr.call(m.childNodes),!a&&s)for(x={},p=0;p<e.attributes.length;p++)x[(E=e.attributes[p]).name]=E.value;for(p in x)E=x[p],p=="dangerouslySetInnerHTML"?_=E:p=="children"||(p in R)||p=="value"&&("defaultValue"in R)||p=="checked"&&("defaultChecked"in R)||xt(e,p,null,E,r);for(p in R)E=R[p],p=="children"?l=E:p=="dangerouslySetInnerHTML"?h=E:p=="value"?y=E:p=="checked"?b=E:a&&typeof E!="function"||x[p]===E||xt(e,p,E,x[p],r);h?(a||_&&(h.__html==_.__html||h.__html==e.innerHTML)||(e.innerHTML=h.__html),t.__k=[]):(_&&(e.textContent=""),(U=="foreignObject"||r=="http://www.w3.org/1998/Math/MathML"&&ia.test(U))&&(r="http://www.w3.org/1999/xhtml"),ar(m,yn(l)?l:[l],t,n,o,r,s,i,s?s[0]:n.__k&&$e(n,0),a,u),s&&s.some(He)),a&&U!="textarea"||(p="value",U=="progress"&&y==null?e.removeAttribute(p):y==null||y===e[p]&&(U!="progress"||y)||xt(e,p,y,x[p],r),p="checked",b!=null&&b!=e[p]&&xt(e,p,b,x[p],r))}else x===R||a&&e.data==R||(e.data=R);return e}function An(e,t,n,o){try{typeof e=="function"?t?t.__x=e(t)||1:o&&(o=o.__c||o.__e)&&(t=o.__x)&&(o.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(r){G.__e(r,n)}}function Rn(e,t,n){var o,r,s,i;if(G.unmount&&G.unmount(e),!(o=e.ref)||o.current&&o.current!=e.__e||An(o,null,t,e),o=e.__c){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(a){G.__e(a,t)}o.__P=o.__n=null}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&Rn(o[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(o=e.__c)&&(o=o.__z)&&(r=Ot(o,s=[]))&&(o==e.__e&&s.some(He),He(r),He(o)),n||He(e.__e),e.__e=e.__c=e.__=null}function pa(e,t,n){return this.constructor(e,n)}function ur(e,t){var n,o,r,s;G.__&&G.__(e,t),t.nodeType==9&&(t=t.documentElement),o=(n=e&&32&e.__u)?null:t.__k,t.__k=Rt(Te,{children:[e]}),r=[],s=[],xn(t,t.__k,o||It,It,t.namespaceURI,o?null:t.firstChild?rr.call(t.childNodes):null,r,o?o.__e:t.firstChild,n,s),dr(r,t.__k,s),t.__k.props.children=null}G={__e:function(e,t,n,o){for(var r,s,i;t=t.__;)if((r=t.__c)&&!(1&r.__g)){r.__g|=4;try{if((i=(s=r.constructor)&&s.getDerivedStateFromError)&&r.setState(s.getDerivedStateFromError(e)),r.componentDidCatch&&(r.componentDidCatch(e,o||{}),i=1),i&&8&r.__g)return void(r.__g|=2)}catch(a){e=a}}throw kt=0,e}},tr=0,ra=function(e){return e!=null&&e.constructor===rt},bt.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=je({},this.state)),typeof e=="function"&&(e=e(je({},n),this.props)),e&&(je(n,e),this.__v&&(t&&this.__k.push(t),Zo(this)))},bt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Zo(this))},bt.prototype.render=Te,De=[],kt=0,nr=function(e,t){return e.__v.__b-t.__v.__b},At=Symbol(),or=/(PointerCapture)$|Capture$/i,Tn=0,gn={},sa=0;var L="openchamber.sdk",D=1;var bn=`
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
`;function On(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(o)=>{let r=o.target===e?t:o.target;if(!(r instanceof Element))return;if(!r.hasAttribute("data-oc-scrolling"))r.setAttribute("data-oc-scrolling","");let s=n.get(r);if(s!==void 0)clearTimeout(s);n.set(r,setTimeout(()=>{n.delete(r),r.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var fa=`(${On.toString()})(document);`;var kn=128,In=65536;var vt=128;var wt=65536;var _r=/^[a-z][a-z0-9-]{0,39}$/;var pr=(e)=>Object(e)===e&&!Array.isArray(e),Cn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),fr=(e)=>String(e)===e&&e.length>=1&&e.length<=60,mr=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Er=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!pr(n)||!_r.test(n.id)||!fr(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Cn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Cn(n,["kind","id","label","value","options","disabled"]))return!1;if(!mr(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let o=new Set;for(let r of n.options){if(!pr(r)||!Cn(r,["value","label"])||!mr(r.value)||!fr(r.label)||o.has(r.value))return!1;o.add(r.value)}if(!o.has(n.value))return!1}return!0};var hr=["{id}","{segment}","{segments+}"];var tl=new Set(hr);var Sr=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var ol=new Set(Sr);var Mt=20000000,Pt=256;var vn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,gr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var Tr=/^[A-Za-z0-9_-]{1,80}$/;var yr=["left","right","top","bottom"];var xr=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let o=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of o)if(!xr(r,t+1,n))return!1;return!0},wn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(wn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(wn)}return String(e)===e||Number.isFinite(e)},Mn=(e)=>{try{if(String(e.id)!==e.id||!Tr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!yr.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!xr(e.data)||!wn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Un=2000;var Rr=["file","directory","other","missing"],Nn=(e)=>Boolean(e&&"sessionId"in e),Ln=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var br=/^[0-9a-f]{7,64}$/i,Dn=(e)=>br.test(e),Ut=500,Nt=32000,Or=16000,kr=128,Ir=200,Cr=2000,vr=16000,wr=80,Mr=200,Pr=16000;var Ur=2000;var $n=20000,Lt=1024,Dt=2000000;var $t=64000,Gt=8000,Gn=4000;var Hn=960000;var Nr=999,Lr=1e4,st=500,Dr=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],$r=["stopped","starting","ready","failed"],_a=new Set(Dr),Gr=(e)=>_a.has(e),Hr=(e)=>e&&Gr(e)?e:"HOST_REJECTED",ze=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ze);if(Object(e)===e)return Object.values(e).every(ze);return!1},jr=(e)=>ze(e)&&JSON.stringify(e).length<=Pr,Ar=(e)=>e?.trim().slice(0,Mr)??"",qe=(e)=>{let t=e.id.trim().slice(0,kr),n=e.title.trim().slice(0,Ir),o=e.url.trim().slice(0,Cr),r=e.text?.trim().slice(0,vr),s=e.author?.trim().slice(0,wr),i=e.kind==="pull"?"pull":"issue",a={providerId:e.providerId.trim(),id:t,title:n||t,url:o,kind:i};if(r)a.text=r;if(s)a.author=s;if(i==="pull"){let u=Ar(e.branches?.head),m=Ar(e.branches?.base);if(u&&m)a.branches={head:u,base:m}}if(jr(e.data))a.data=e.data;return a},jn=(e)=>{let t=qe(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Vn=(e)=>{let t={text:e.text.trim().slice(0,Or)};if(e.send)t.send=!0;return t},Fn=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Nr,Math.max(0,Math.round(e)))},Bn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Lr,Math.max(0,Math.ceil(e)))};var Je=(e)=>e.length>0&&e.length<=Lt&&!e.includes("\x00")&&!e.includes("\\");var Ht=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Ur)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Ea=new Set($r),Xn=(e)=>Boolean(e&&"status"in e&&Ea.has(String(e.status))&&!("body"in e)),jt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Wn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Kn=(e)=>Boolean(e&&"written"in e&&e.written===!0),zn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),ha=new Set(Rr),qn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&ha.has(String(e.kind))&&Number.isFinite(e.size)),Jn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Sa=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ga=(e)=>Object(e)===e?e:null,Pn=(e)=>String(e)===e&&e.length>0,Ta=(e)=>{if(!Pn(e.id))return null;if(e.ok===!0){let t={channel:L,v:D,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Pn(e.error))return{channel:L,v:D,type:"result",id:e.id,ok:!1,error:e.error,code:Hr(Pn(e.code)?e.code:void 0)};return null},Yn=(e)=>{let t=ga(e);if(!t||t.channel!==L||t.v!==D)return null;if(t.type==="result")return Ta(t);if(!Sa.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var Vr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ya=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class k extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var Fr=()=>Promise.reject(new k("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Vt=()=>Promise.reject(new k("BAD_PATH",`File path must be 1 to ${Lt} characters without NUL or backslash.`)),Ft=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new k("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},P=(e)=>(e.value+=1,`oc-${e.value}`),Qn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new k("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((c)=>c===t.parent),o=e.requestTimeoutMs??$n,r=new Set,s=new Set,i=new Set,a=new Set,u=new Set,m=new Set,p=new Set,h=new Set,_=new Set,l=new Set,E=new Set,y=new Set,b=[],g=null,x=null,R=new Set,U=new Set,K=null,ne=null,N=!1,j=new Map,oe=new Map,z=new Map,M=!1,S={value:0},T=null,Ae=null,Ce=!1,Le=!1,tt=null,nt=(c)=>{if(!c)return null;return{sessionId:c.id,phase:c.busy?"started":"completed"}},fe=(c)=>{t.parent.postMessage(c,"*")},ht=()=>{if(M||t.parent===t||y.size===0||T?.features?.lateGenerateResults!==!0)return;fe({channel:L,v:D,type:"generate-late-listen"})},B=(c,d)=>{for(let O of c)try{O(d)}catch(I){console.error(I)}},ot=(c)=>{if(!(c instanceof MessageEvent))return;if(!n(c.source))return;let d=Yn(c.data);if(!d)return;if(d.type==="workspace"){let I=oe.get(d.payload.subscriptionId);if(I)B([I],d.payload.snapshot);return}if(d.type==="shells"){let I=z.get(d.payload.subscriptionId);if(I)B([I],d.payload.snapshot);return}if(d.type==="ready"){if(T=d.payload,Ae=nt(d.payload.session),B(r,d.payload),B(s,d.payload.directory),B(i,d.payload.session),Ae)B(a,Ae);if(B(u,d.payload.connection),B(m,d.payload.settings),B(p,d.payload.item),d.payload.block)B(h,d.payload.block);ht();return}if(d.type==="service-event"){B(_,d.payload);return}if(d.type==="generate-late"){if(y.size===0)b.push(d.payload);else B(y,d.payload);return}if(d.type==="directory"){if(T)T={...T,directory:d.payload.directory};B(s,d.payload.directory);return}if(d.type==="session"){if(T)T={...T,session:d.payload.session};if(!d.payload.session)Ae=null;else if(Ae?.sessionId!==d.payload.session.id)Ae=nt(d.payload.session);B(i,d.payload.session);return}if(d.type==="session-lifecycle"){Ae=d.payload,B(a,d.payload);return}if(d.type==="connection"){if(T)T={...T,connection:d.payload.connection};B(u,d.payload.connection);return}if(d.type==="settings"){if(T)T={...T,settings:d.payload.settings};B(m,d.payload.settings);return}if(d.type==="item"){if(T)T={...T,item:d.payload.item};B(p,d.payload.item);return}if(d.type==="status-control-event"){B(l,d.payload);return}if(d.type==="popover-closed"){B(E,d.payload);return}if(d.type==="action"){let I=(X)=>{if(!M)fe({channel:L,v:D,type:"action-result",id:d.id,payload:X})},J=x;if(!J){I({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>J(d.payload)).then(()=>I({ok:!0}),(X)=>{let re=(X instanceof Error?X.message:String(X)).trim();I({ok:!1,error:(re||"Action failed.").slice(0,st)})});return}if(d.type==="file-open"){let I=d.payload;if(ne&&gr(ne,I))return;ne=I,B(R,d.payload);return}if(d.type==="file-saved"){B(U,d.payload.version);return}if(d.type==="file-snapshot"){let I=(re)=>{if(!M)fe({channel:L,v:D,type:"file-snapshot-result",id:d.id,payload:re})},J=(re)=>I({error:(re.trim()||"Could not read the edited file.").slice(0,st)}),X=K;if(!X){J("This extension does not edit files.");return}Promise.resolve().then(()=>X(d.payload.purpose)).then((re)=>{if(vn(re)>Mt){J(`The file is over ${Mt} ${"bytes"in re?"bytes":"characters"}.`);return}if(re.version.length>Pt){J(`The snapshot version is over ${Pt} characters.`);return}I({snapshot:"bytes"in re?{bytes:re.bytes,version:re.version}:{content:re.content,version:re.version}})},(re)=>J(re instanceof Error?re.message:String(re)));return}if(d.type==="resolve"){let I=(X)=>{fe({channel:L,v:D,type:"resolve-result",id:d.id,payload:X})},J=g;if(!J){I({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>J(d.payload)).then((X)=>I({item:X?qe(X):null}),(X)=>{let re=(X instanceof Error?X.message:String(X)).trim();I({error:(re||"Command failed.").slice(0,st)})});return}let O=j.get(d.id);if(!O)return;if(clearTimeout(O.timer),j.delete(d.id),d.ok){O.resolve(d.payload);return}O.reject(new k(d.code,d.error))};t.addEventListener("message",ot),fe({channel:L,v:D,type:"hello"});let ae=(c,d=o)=>{if(M||t.parent===t)return Promise.reject(new k("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((O,I)=>{let J=setTimeout(()=>{j.delete(c.id),I(new k("HOST_TIMEOUT","Host did not answer in time."))},d);j.set(c.id,{resolve:O,reject:I,timer:J}),fe(c)})},q=(c)=>ae(c).then(()=>{return}),Q={channel:L,v:D},St=(c)=>{if(!M&&t.parent!==t)fe(c)},v=()=>St({...Q,type:"file-save"}),Re=(c)=>{if(!Vr(c)||!ya(c))return;c.preventDefault(),v()},Ke=(c)=>{if(!Vr(c)||c.key!=="Escape"||T?.surface!=="popover"||!T.popover)return;c.preventDefault(),Yo(T.popover.id,"escape").catch(()=>{return})},gt=()=>{let c=T?.surface==="popover"?T.popover:void 0;if(!c)return;let d=Ce||Le;if(tt===d)return;tt=d,Qo(c.id,d).catch(()=>{return})},Tt=()=>{if(T?.surface!=="popover"||Ce)return;Ce=!0,gt()},zo=(c)=>{if(T?.surface!=="popover"||c.relatedTarget!==null||!Ce)return;Ce=!1,gt()},qo=()=>{if(T?.surface!=="popover"||Le)return;Le=!0,gt()},Jo=()=>{if(T?.surface!=="popover"||!Le)return;Le=!1,gt()},be=(c,d=1024)=>{if(!c.trim()||c.length>d)throw new k("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},En=async(c)=>{if(c.kind!=="projects")be(c.projectId);let d=await ae({...Q,type:"workspace-read",id:P(S),payload:c});if(!d||!("kind"in d)||!("state"in d)||d.kind!==c.kind)throw new k("HOST_REJECTED","Host did not return workspace data.");return d},hn=async(c,d)=>{if(c.kind!=="projects")be(c.projectId);let O=P(S);oe.set(O,d);try{await q({...Q,type:"workspace-subscribe",id:P(S),payload:{subscriptionId:O,query:c}})}catch(I){if(oe.delete(O),!M)fe({...Q,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:O}});throw I}return()=>{if(!oe.delete(O)||M)return;fe({...Q,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:O}})}},oa=async(c,d)=>{if(c.kind==="session")be(c.sessionId);if(c.kind==="project")be(c.projectId);let O=P(S);z.set(O,d);try{await q({...Q,type:"shells-subscribe",id:P(S),payload:{subscriptionId:O,scope:c}})}catch(I){if(z.delete(O),!M)fe({...Q,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:O}});throw I}return()=>{if(!z.delete(O)||M)return;fe({...Q,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:O}})}},yt=async(c)=>{if("key"in c&&(c.key.length===0||c.key.length>kn))throw new k("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!ze(c.value))throw new k("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>In)throw new k("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&T?.features?.deviceStorage!==!0)throw new k("UNSUPPORTED","This host does not support device storage.");let d=await ae({...Q,type:"storage",id:P(S),payload:c});if(!d||!("storage"in d)||d.op!==c.op)throw new k("HOST_REJECTED","Host did not return storage data.");return d},Yo=(c,d)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===c)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):q({...Q,type:"popover-close",id:P(S),payload:d?{id:c,reason:d}:{id:c}}),Qo=(c,d)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===c)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):q({...Q,type:"popover-anchor",id:P(S),payload:{id:c,active:d}});return t.addEventListener("keydown",Ke,!0),t.addEventListener("pointerover",Tt),t.addEventListener("pointermove",Tt),t.addEventListener("pointerout",zo),t.addEventListener("focus",qo),t.addEventListener("blur",Jo),{onAction:(c)=>(x=c,()=>{if(x===c)x=null}),listProjects:async()=>{let c=await En({kind:"projects"});if(c.kind!=="projects")throw new k("HOST_REJECTED","Expected projects.");return c},listWorktrees:async(c)=>{let d=await En({kind:"worktrees",projectId:c});if(d.kind!=="worktrees")throw new k("HOST_REJECTED","Expected worktrees.");return d},listSessions:async(c)=>{let d=await En({kind:"sessions",projectId:c});if(d.kind!=="sessions")throw new k("HOST_REJECTED","Expected sessions.");return d},onProjects:(c)=>hn({kind:"projects"},(d)=>{if(d.kind==="projects")c(d)}),onWorktrees:(c,d)=>hn({kind:"worktrees",projectId:c},(O)=>{if(O.kind==="worktrees")d(O)}),onSessions:(c,d)=>hn({kind:"sessions",projectId:c},(O)=>{if(O.kind==="sessions")d(O)}),onRunningShells:(c,d)=>oa(c,d),readShellOutput:async(c,d)=>{be(c,vt);let O=d?.cursor;if(O!==void 0&&(!Number.isInteger(O)||O<0))throw new k("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let I=d?.tailBytes;if(I!==void 0&&(!Number.isInteger(I)||I<1||I>wt))throw new k("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${wt}.`);let X=await ae({...Q,type:"shell-output",id:P(S),payload:{shellId:c,cursor:O,tailBytes:I}});if(!X||typeof X.output!=="string"||!Number.isFinite(X.cursor))throw new k("HOST_REJECTED","Host did not return shell output.");return X},stopShell:async(c)=>{if(be(c,vt),(await ae({...Q,type:"shell-stop",id:P(S),payload:{shellId:c}}))?.stopped!==!0)throw new k("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(c)=>{be(c),await q({...Q,type:"open-session",id:P(S),payload:{sessionId:c}})},storage:{get:async(c,d)=>{let O=Ft(d),I={op:"get",key:c};if(O)I.scope=O;let J=await yt(I);return J.op==="get"&&J.found?J.value:void 0},set:async(c,d,O)=>{let I=Ft(O),J={op:"set",key:c,value:d};if(I)J.scope=I;await yt(J)},delete:async(c,d)=>{let O=Ft(d),I={op:"delete",key:c};if(O)I.scope=O;await yt(I)},keys:async(c)=>{let d=Ft(c),O={op:"keys"};if(d)O.scope=d;let I=await yt(O);if(I.op!=="keys")throw new k("HOST_REJECTED","Expected storage keys.");return I.keys}},onReady:(c)=>{if(r.add(c),T)c(T);return()=>{r.delete(c)}},onDirectory:(c)=>{if(s.add(c),T)c(T.directory);return()=>{s.delete(c)}},onSession:(c)=>{if(i.add(c),T)c(T.session);return()=>{i.delete(c)}},onSessionLifecycle:(c)=>{if(a.add(c),Ae)c(Ae);return()=>{a.delete(c)}},onConnection:(c)=>{if(u.add(c),T)c(T.connection);return()=>{u.delete(c)}},onSettings:(c)=>{if(m.add(c),T)c(T.settings);return()=>{m.delete(c)}},onItem:(c)=>{if(p.add(c),T)c(T.item);return()=>{p.delete(c)}},onBlock:(c)=>{if(h.add(c),T?.block)c(T.block);return()=>{h.delete(c)}},onServiceEvent:(c)=>(_.add(c),()=>{_.delete(c)}),onStatusControl:(c)=>(l.add(c),()=>{l.delete(c)}),onPopoverClosed:(c)=>(E.add(c),()=>{E.delete(c)}),setStatusControls:(c)=>{if(T?.features?.statusControls!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support status controls."));if(!Er(c))return Promise.reject(new k("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return q({...Q,type:"status-controls",id:P(S),payload:{controls:c}})},openPopover:(c)=>{if(T?.features?.popovers!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support popovers."));if(!Mn(c))return Promise.reject(new k("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return q({...Q,type:"popover-open",id:P(S),payload:c})},closePopover:Yo,setPopoverAnchorActive:Qo,onResolve:(c)=>(g=c,()=>{if(g===c)g=null}),toast:(c)=>{let d=c.message.trim();if(!d||d.length>Ut)return Promise.reject(new k("HOST_REJECTED",`Toast message must contain 1 to ${Ut} characters.`));if(c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>Nt))return Promise.reject(new k("HOST_REJECTED",`Toast copy text must contain 1 to ${Nt} characters.`));return q({channel:L,v:D,type:"toast",id:P(S),payload:{...c,message:d}})},openUrl:(c)=>q({channel:L,v:D,type:"open-url",id:P(S),payload:{url:c}}),openCommit:(c)=>Dn(c)?q({channel:L,v:D,type:"open-commit",id:P(S),payload:{sha:c}}):Promise.reject(new k("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(c)=>q({channel:L,v:D,type:"block-answer",id:P(S),payload:{text:c.trim().slice(0,Un)}}),openSurface:(c)=>q({channel:L,v:D,type:"open-surface",id:P(S),payload:{surfaceId:c}}),writeClipboard:(c)=>q({channel:L,v:D,type:"clipboard-write",id:P(S),payload:{text:c}}),compose:(c)=>q({channel:L,v:D,type:"compose",id:P(S),payload:c}),attach:(c)=>q({channel:L,v:D,type:"attach",id:P(S),payload:qe(c)}),startSession:async(c)=>{if(c.projectId!==void 0)be(c.projectId);let d=c.worktree;if(d&&d!==!0)if(d.kind==="existing")be(d.directory);else{if(d.name!==void 0)be(d.name,200);if(d.baseBranch!==void 0)be(d.baseBranch,200)}let O=await ae({channel:L,v:D,type:"start-session",id:P(S),payload:jn(c)},e.requestTimeoutMs??180000);if(!Nn(O))throw new k("HOST_REJECTED","Host did not return a session.");return O},prompt:(c)=>ae({channel:L,v:D,type:"prompt",id:P(S),payload:Vn(c)}).then((d)=>{if(!Ln(d))throw new k("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:(c)=>q({channel:L,v:D,type:"session-link",id:P(S),payload:qe(c)}),close:()=>q({channel:L,v:D,type:"close",id:P(S)}),oauthStart:()=>q({channel:L,v:D,type:"oauth-start",id:P(S)}),oauthDisconnect:()=>q({channel:L,v:D,type:"oauth-disconnect",id:P(S)}),request:(c)=>(Ht(c.path)?ae({channel:L,v:D,type:"request",id:P(S),payload:c}):Fr()).then((d)=>{if(!jt(d))throw new k("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:(c)=>(Ht(c.path)?ae({channel:L,v:D,type:"service-request",id:P(S),payload:c}):Fr()).then((d)=>{if(!jt(d))throw new k("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>ae({channel:L,v:D,type:"service-status",id:P(S)}).then((c)=>{if(!Xn(c))throw new k("HOST_REJECTED","Host did not return service status.");return c}),readFile:(c)=>(Je(c)?ae({channel:L,v:D,type:"file-read",id:P(S),payload:{path:c}}):Vt()).then((d)=>{if(!Wn(d))throw new k("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(c,d)=>{if(!Je(c))return Vt();if(d.length>Dt)return Promise.reject(new k("FILE_TOO_LARGE",`Content is over ${Dt} characters.`));return ae({channel:L,v:D,type:"file-write",id:P(S),payload:{path:c,content:d}}).then((O)=>{if(!Kn(O))throw new k("HOST_REJECTED","Host did not confirm the write.");return O})},listDir:(c)=>(Je(c)?ae({channel:L,v:D,type:"file-list",id:P(S),payload:{path:c}}):Vt()).then((d)=>{if(!zn(d))throw new k("HOST_REJECTED","Host did not return directory entries.");return d}),stat:(c)=>(Je(c)?ae({channel:L,v:D,type:"file-stat",id:P(S),payload:{path:c}}):Vt()).then((d)=>{if(!qn(d))throw new k("HOST_REJECTED","Host did not return file status.");return d}),generate:(c)=>{let d=c.prompt.trim(),O=c.system?.trim();if(d.length===0||d.length>$t)return Promise.reject(new k("HOST_REJECTED",`Prompt must be 1 to ${$t} characters.`));if(O!==void 0&&(O.length===0||O.length>Gt))return Promise.reject(new k("HOST_REJECTED",`System prompt must be 1 to ${Gt} characters.`));let I=c.maxOutputTokens===void 0?void 0:Math.min(Gn,Math.max(1,Math.floor(c.maxOutputTokens)));if(I!==void 0&&!Number.isFinite(I))return Promise.reject(new k("HOST_REJECTED","maxOutputTokens must be a number."));let J={prompt:d};if(O!==void 0)J.system=O;if(I!==void 0)J.maxOutputTokens=I;return ae({channel:L,v:D,type:"generate",id:P(S),payload:J},e.requestTimeoutMs??Hn).then((X)=>{if(!Jn(X))throw new k("HOST_REJECTED","Host did not return generated text.");return X})},onLateGenerateResult:(c)=>{y.add(c);for(let d of b.splice(0))B([c],d);return ht(),()=>{y.delete(c)}},setBadge:(c)=>q({channel:L,v:D,type:"badge",id:P(S),payload:{count:Fn(c)}}),setHeight:(c)=>q({channel:L,v:D,type:"resize",id:P(S),payload:{height:Bn(c)}}),onFileOpen:(c)=>{if(R.add(c),!N)N=!0,t.addEventListener("keydown",Re,!0);if(ne)c(ne);return()=>{R.delete(c)}},onFileSnapshot:(c)=>(K=c,()=>{if(K===c)K=null}),onFileSaved:(c)=>(U.add(c),()=>{U.delete(c)}),reportFileChange:(c)=>St({...Q,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:v,reportFileUnsupported:()=>St({...Q,type:"file-unsupported"}),dispose:()=>{for(let c of oe.keys())fe({...Q,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:c}});oe.clear();for(let c of z.keys())fe({...Q,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:c}});if(z.clear(),M=!0,g=null,x=null,K=null,R.clear(),U.clear(),N)t.removeEventListener("keydown",Re,!0);t.removeEventListener("message",ot),t.removeEventListener("keydown",Ke,!0),t.removeEventListener("pointerover",Tt),t.removeEventListener("pointermove",Tt),t.removeEventListener("pointerout",zo),t.removeEventListener("focus",qo),t.removeEventListener("blur",Jo);for(let c of j.values())clearTimeout(c.timer),c.reject(new k("HOST_UNAVAILABLE","Host client was disposed."));j.clear(),r.clear(),s.clear(),i.clear(),a.clear(),u.clear(),m.clear(),p.clear(),h.clear(),_.clear(),l.clear(),E.clear(),y.clear(),b.length=0}}};var Br=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Sl=new Set(Br);var Xr=["none","agent","user"];var Tl=new Set(Xr);var xa=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Aa=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Wr=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,o]of xa)t.style.setProperty(n,e.tokens[o]);for(let[n,o,r]of Aa){let s=e.tokens[r]??"";t.style.setProperty(n,s),t.style.setProperty(o,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Zn=(e,t)=>{if(Wr(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var Ra={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},Y=(e,t)=>`var(--${e}, var(--oc-${Ra[e]}, ${t}))`,we=Y("surface-background","transparent"),Xt=Y("surface-elevated","transparent"),Ye=Y("surface-elevated-foreground","inherit"),he=Y("surface-foreground","inherit"),Z=Y("surface-muted-foreground","gray"),ba=Y("surface-muted","transparent"),Ve=Y("interactive-border","currentColor"),_e=Y("interactive-hover","transparent"),Fe=Y("interactive-active","transparent"),eo=Y("interactive-selection","transparent"),to=Y("interactive-selection-foreground","inherit"),ve=Y("primary","currentColor"),no=Y("primary-text","inherit"),oo=Y("error-text","inherit"),Oa=Y("font-sans","inherit"),ro=Y("font-mono","monospace"),Jr=Y("radius","9px"),so=`calc(${Jr} - 2px)`,Kr=`calc(${Jr} - 4px)`,ee=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,zr=`background-image: linear-gradient(${_e}, ${_e});`,io=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,ao="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",qr="box-shadow: var(--oc-sdk-lit);",co=`inset 0 0.5px 0 0 ${ee(he,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,ka=`
:root {
  --oc-sdk-edge: ${ee(he,16)};
  --oc-sdk-field-bg: ${Xt};
  --oc-sdk-raised-bg: ${we};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${ee(he,14)};
  --oc-sdk-field-bg: ${ee(we,50,Xt)};
  --oc-sdk-raised-bg: ${Xt};
  --oc-sdk-field-lift: ${co};
  --oc-sdk-raised-lift: ${co};
  --oc-sdk-lit: ${co};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Bt=(e)=>{let t=Y(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${Y(`${e}-text`,"inherit")}; }`},Ia=`
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
`,Yr=`${ka}
.oc-sdk { color: ${he}; font-family: ${Oa}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${zr} }
.oc-sdk-mono { font-family: ${ro}; }
.oc-sdk-muted { color: ${Z}; }
${Bt("success")}${Bt("warning")}${Bt("error")}${Bt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ve}; --oc-sdk-tone-text: ${no}; }

.oc-sdk-btn { border-radius: ${so}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Kr}; }
.oc-sdk-btn[data-variant="default"] { color: ${no}; background: ${ee(ve,10,we)}; border-color: ${ee(ve,12)}; ${qr} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${ee(ve,16,we)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${ee(ve,22,we)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ba}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Fe}, ${Fe}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ye}; ${ao} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Fe}, ${Fe}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${_e}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Fe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${Y("status-error","red")}; color: ${oo}; background: ${ee("var(--oc-sdk-tone)",7,we)}; border-color: ${ee("var(--oc-sdk-tone)",12)}; ${qr} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${ee("var(--oc-sdk-tone)",9,we)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${ee("var(--oc-sdk-tone)",11,we)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Z}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${oo}; }
.oc-sdk-input { border-radius: ${so}; background: var(--oc-sdk-field-bg); color: ${Ye}; ${io("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Z}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${io(ee(he,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${io(Y("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${ro}; }

.oc-sdk-search-icon { color: ${Z}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ve}; }
.oc-sdk-search-clear { border-radius: ${Kr}; color: ${Z}; }
.oc-sdk-search-clear:hover { background: ${_e}; color: ${he}; }

.oc-sdk-trigger { border-radius: ${so}; background: var(--oc-sdk-raised-bg); color: ${Ye}; ${ao} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Fe}, ${Fe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Z}; }
.oc-sdk-trigger-chevron { color: ${Z}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ye}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Xt}; background-clip: padding-box; color: ${Ye}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${_e}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${eo}; color: ${to}; }
.oc-sdk-option-check { color: ${he}; }
.oc-sdk-option[data-destructive="true"] { color: ${oo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${ee(Y("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Z}; }
.oc-sdk-popup-empty { color: ${Z}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ve}; border-radius: 4px; color: ${he}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${ee(he,60,Ve)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ve}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${we}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ve}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${zr} }
.oc-sdk-check-desc { color: ${Z}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${ee(he,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Z}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${he}; }
.oc-sdk-tab[aria-selected="true"] { color: ${to}; background: ${eo}; border-color: ${Ve}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ye}; background: var(--oc-sdk-raised-bg); ${ao} }
.oc-sdk-tab-count { color: ${Z}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${ee(he,6)}; color: ${Z}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${ee("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${_e}; }
.oc-sdk-row[aria-selected="true"] { background: ${eo}; color: ${to}; }
.oc-sdk-row-lead { font-family: ${ro}; color: ${Z}; }
.oc-sdk-row-sub { color: ${Z}; }
.oc-sdk-row-meta { color: ${Z}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Z}; }

.oc-sdk-empty-body { color: ${Z}; }

.oc-sdk-spinner { color: ${Z}; }
.oc-sdk-spinner-ring { border-color: ${Ve}; border-top-color: ${ve}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${ee("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Z}; }

.oc-sdk-separator { color: ${Z}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${ee(Ve,40)}; }

.oc-sdk-progress-label { color: ${Z}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${ee(he,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ve}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${Y("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${Y("success-text","inherit")}; }

.oc-sdk-text a { color: ${no}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${ee(Ve,60)}; }
`,V=`
${bn}
${Ia}
${Yr}`;var Qr="oc-sdk-ui-style",Me=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},F=(e)=>{let t=document.getElementById(Qr);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}On(document);let n=document.createElement("style");n.id=Qr,n.textContent=e,document.head.appendChild(n)},A=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},Ee=(e)=>{let t=A("button",e);return t.type="button",t},W=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},Se=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},Zr=(e,t)=>{let n=(o)=>{if(o.target instanceof Node&&e.contains(o.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var Ca=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Pe=(e,t)=>{F(V);let n=t,o=Ee("oc-sdk oc-sdk-btn"),r=Ca(),s=document.createElement("span");o.append(s),e.append(o);let i=()=>{if(o.dataset.variant=n.variant??"default",o.dataset.size=n.size??"default",o.disabled=Boolean(n.disabled)||Boolean(n.loading),o.dataset.loading=n.loading?"true":"false",o.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&r.parentNode!==o)o.prepend(r);else if(!n.loading&&r.parentNode===o)r.remove();W(s,n.label)},a=()=>{if(n.disabled||n.loading)return;n.onClick()};return o.addEventListener("click",a),i(),{update:(u)=>{n={...n,...u},i()},dispose:()=>{o.removeEventListener("click",a),o.remove()}}};var lo=(e,t)=>{F(V);let n=t,o=A("label","oc-sdk oc-sdk-field"),r=A("span","oc-sdk-field-label"),s=n.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),i=A("span","oc-sdk-field-note");o.append(r,s,i),e.append(o);let a=()=>{if(W(r,n.label),r.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),Se(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let m=Boolean(n.error);o.dataset.invalid=m?"true":"false",s.setAttribute("aria-invalid",m?"true":"false");let p=n.error??n.helper??"";W(i,p),i.hidden=p===""},u=()=>{n.onChange(s.value)};return s.addEventListener("input",u),a(),{update:(m)=>{n={...n,...m},a()},dispose:()=>{s.removeEventListener("input",u),o.remove()}}};var va={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Oe=(e,t,n)=>{let o=document.createElementNS("http://www.w3.org/2000/svg","svg");if(o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("fill","currentColor"),n)o.setAttribute("class",n);let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",va[e]),o.append(r),o};var uo=(e,t)=>{F(V);let n=t,o=A("div","oc-sdk oc-sdk-search"),r=A("input","oc-sdk-input");r.type="text",r.spellcheck=!1,r.autocomplete="off",r.setAttribute("role","searchbox");let s=Ee("oc-sdk-search-clear");s.append(Oe("close",14)),s.tabIndex=-1,o.append(Oe("search",16,"oc-sdk-search-icon"),r,s),e.append(o);let i=()=>{let p=n.placeholder??"Search";if(Se(r,"placeholder",p),r.setAttribute("aria-label",n.label??p),s.setAttribute("aria-label","Clear search"),r.value!==n.value)r.value=n.value;o.dataset.active=n.value.trim()===""?"false":"true"},a=()=>{if(n.value!=="")n.onChange("");r.focus()},u=()=>{n.onChange(r.value)},m=(p)=>{if(p.key==="Escape"&&r.value!=="")p.preventDefault(),a()};if(r.addEventListener("input",u),r.addEventListener("keydown",m),s.addEventListener("click",a),i(),n.autofocus)r.focus();return{update:(p)=>{n={...n,...p},i()},dispose:()=>{r.removeEventListener("input",u),r.removeEventListener("keydown",m),s.removeEventListener("click",a),o.remove()}}};var ke=(e,t="vertical")=>{let[n,o]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===o||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Ue=(e,t,n)=>{let o=e.filter((u)=>!u.disabled);if(o.length===0)return null;let r=o[0],s=o[o.length-1];if(n==="first"||!r||!s)return r?.id??null;if(n==="last")return s.id;let i=o.findIndex((u)=>u.id===t);if(i===-1)return n==="next"?r.id:s.id;return o[Math.min(o.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var es=(e,t)=>`${e}-${t??""}`,Wt=(e,t,n,o)=>{let r=Ee("oc-sdk-option");if(r.id=es(e,n.id),r.setAttribute("role",t),r.tabIndex=-1,r.disabled=Boolean(n.disabled),t==="option")r.setAttribute("aria-selected",n.selected?"true":"false");r.dataset.destructive=n.destructive?"true":"false";let s=A("span","oc-sdk-option-label");if(s.textContent=n.label,r.append(s),n.hint){let i=A("span","oc-sdk-option-hint");i.textContent=n.hint,r.append(i)}if(t==="option"){r.dataset.mark="check";let i=A("span","oc-sdk-option-check");i.append(Oe("check",14)),r.append(i)}return r.addEventListener("pointerenter",o.hover),r.addEventListener("click",o.pick),r},Kt=(e,t,n,o)=>{let r=es(n,o);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===r?"true":"false";Se(t,"aria-activedescendant",o?r:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var wa=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let o=e.offsetHeight,r=window.innerHeight-n.bottom-8;if(o>r&&n.top-8>r)e.style.top=`${Math.max(8,Math.round(n.top-4-o))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},zt=(e,t,n,o)=>{e.append(n),wa(n,t);let r=Zr(e,o),s=()=>{o()},i=(a)=>{if(a.target instanceof Node&&n.contains(a.target))return;o()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{r(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var ts=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((o)=>o.label.toLowerCase().includes(n)||o.id.toLowerCase().includes(n))},Ma=0,qt=(e,t)=>{F(V);let n=t,o=`oc-sdk-select-${Ma+=1}`,r=A("div","oc-sdk oc-sdk-select"),s=A("span","oc-sdk-field-label");s.id=`${o}-label`;let i=Ee("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let a=A("span","oc-sdk-trigger-value");i.append(a,Oe("chevron",14,"oc-sdk-trigger-chevron")),r.append(s,i),e.append(r);let u="",m=null,p=null,h=A("div","oc-sdk oc-sdk-popup"),_=A("div","oc-sdk-popup-search"),l=A("input","oc-sdk-input");l.type="text",l.autocomplete="off",_.append(l);let E=A("div");E.setAttribute("role","listbox"),E.tabIndex=-1,h.append(E);let y=()=>ts(n.options,n.searchable?u:""),b=()=>n.searchable?l:E,g=(S)=>{m=S,Kt(E,b(),o,S)},x=()=>{Me(E);let S=y();if(S.length===0){let T=A("div","oc-sdk-popup-empty");T.textContent="No matches",E.append(T)}for(let T of S)E.append(Wt(o,"option",{...T,selected:T.id===n.value},{hover:()=>g(T.id),pick:()=>K(T.id)}));g(S.some((T)=>T.id===m)?m:S[0]?.id??null)},R=()=>{let S=p;p=null,S?.(),u="",l.value="",i.setAttribute("aria-expanded","false")},U=()=>{if(p||n.disabled)return;if(m=n.value,l.placeholder=n.searchPlaceholder??"Search",n.searchable)h.prepend(_);else _.remove();x(),p=zt(r,i,h,R),i.setAttribute("aria-expanded","true"),b().focus()},K=(S)=>{if(R(),i.focus(),S!==n.value)n.onChange(S)},ne=()=>{if(p)R();else U()},N=(S)=>{if(!p&&ke(S))S.preventDefault(),U()},j=(S)=>{let T=ke(S);if(T)S.preventDefault(),g(Ue(y(),m,T));else if(S.key==="Enter"){if(S.preventDefault(),m)K(m)}else if(S.key==="Escape")S.preventDefault(),R(),i.focus();else if(n.searchable&&S.target!==l&&S.key.length===1&&!S.ctrlKey&&!S.metaKey)l.focus()},oe=()=>{u=l.value,x()},z=(S)=>{if(p&&!(S.relatedTarget instanceof Node&&r.contains(S.relatedTarget)))R()},M=()=>{W(s,n.label),s.hidden=!n.label;let S=n.options.find((T)=>T.id===n.value);if(W(a,S?.label??n.placeholder??"Select"),a.dataset.empty=S?"false":"true",i.disabled=Boolean(n.disabled),p)x()};return i.addEventListener("click",ne),i.addEventListener("keydown",N),h.addEventListener("keydown",j),l.addEventListener("input",oe),r.addEventListener("focusout",z),M(),{update:(S)=>{n={...n,...S},M()},dispose:()=>{R(),i.removeEventListener("click",ne),i.removeEventListener("keydown",N),h.removeEventListener("keydown",j),l.removeEventListener("input",oe),r.removeEventListener("focusout",z),r.remove()}}};var ns=(e,t,n)=>{F(V);let o=t,r=Ee("oc-sdk oc-sdk-check");r.setAttribute("role",n);let s=A("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(Oe("check",12));let i=A("span","oc-sdk-check-text"),a=A("span","oc-sdk-check-label"),u=A("span","oc-sdk-check-desc");i.append(a,u),r.append(s,i),e.append(r);let m=()=>{r.setAttribute("aria-checked",o.checked?"true":"false"),r.disabled=Boolean(o.disabled),W(a,o.label),W(u,o.description),u.hidden=!o.description},p=()=>{if(!o.disabled)o.onChange(!o.checked)};return r.addEventListener("click",p),m(),{update:(h)=>{o={...o,...h},m()},dispose:()=>{r.removeEventListener("click",p),r.remove()}}},po=(e,t)=>ns(e,t,"checkbox"),Jt=(e,t)=>ns(e,t,"switch");var fo=(e,t)=>{F(V);let n=t,o=A("div","oc-sdk oc-sdk-tabs");o.setAttribute("role","tablist"),e.append(o);let r=()=>{Me(o),o.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let a=Ee("oc-sdk-tab");a.setAttribute("role","tab");let u=i.id===n.activeId;a.setAttribute("aria-selected",u?"true":"false"),a.tabIndex=u?0:-1,a.dataset.id=i.id;let m=A("span");if(m.textContent=i.label,a.append(m),i.count!==void 0){let p=A("span","oc-sdk-tab-count");p.textContent=String(i.count),a.append(p)}a.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),o.append(a)}},s=(i)=>{let a=ke(i,"horizontal");if(!a)return;let u=Ue(n.items,n.activeId,a);if(u&&u!==n.activeId){i.preventDefault(),n.onChange(u);let m=o.querySelector(`[data-id="${CSS.escape(u)}"]`);if(m instanceof HTMLElement)m.focus()}};return o.addEventListener("keydown",s),r(),{update:(i)=>{n={...n,...i},r()},dispose:()=>{o.removeEventListener("keydown",s),o.remove()}}};var it=(e,t)=>{Se(e,"data-tone",t&&t!=="neutral"?t:null)},mo=(e,t)=>{F(V);let n=t,o=A("span","oc-sdk oc-sdk-badge");e.append(o);let r=()=>{W(o,n.label),it(o,n.tone)};return r(),{update:(s)=>{n={...n,...s},r()},dispose:()=>{o.remove()}}};var Pa=0,_o=(e,t)=>{F(V);let n=t,o=`oc-sdk-list-${Pa+=1}`,r=A("div","oc-sdk oc-sdk-list");r.setAttribute("role","listbox"),r.tabIndex=0,e.append(r);let s=null,i=(h)=>`${o}-${h}`,a=(h)=>{s=h;for(let _ of Array.from(r.children))if(_ instanceof HTMLElement)_.dataset.active=_.id===i(h??"")?"true":"false";Se(r,"aria-activedescendant",h?i(h):null),r.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},u=(h,_)=>{let l=A("span",h);return l.textContent=_,l},m=()=>{if(Me(r),Se(r,"aria-label",n.ariaLabel),n.items.length===0){r.append(u("oc-sdk-list-empty",n.emptyText??"Nothing here")),a(null);return}for(let _ of n.items){let l=Ee("oc-sdk-row");if(l.id=i(_.id),l.setAttribute("role","option"),l.setAttribute("aria-selected",_.id===n.selectedId?"true":"false"),l.disabled=Boolean(_.disabled),l.tabIndex=-1,_.leading)l.append(u("oc-sdk-row-lead",_.leading));let E=A("span","oc-sdk-row-main");if(E.append(u("oc-sdk-row-title",_.title)),_.subtitle)E.append(u("oc-sdk-row-sub",_.subtitle));if(l.append(E),_.badge){let y=u("oc-sdk-badge",_.badge.label);it(y,_.badge.tone),l.append(y)}if(_.meta)l.append(u("oc-sdk-row-meta",_.meta));l.addEventListener("click",()=>n.onSelect(_.id)),r.append(l)}let h=n.items.some((_)=>_.id===s&&!_.disabled);a(h?s:n.selectedId??null)},p=(h)=>{let _=ke(h);if(_){h.preventDefault(),a(Ue(n.items,s,_));return}if((h.key==="Enter"||h.key===" ")&&s)h.preventDefault(),n.onSelect(s)};return r.addEventListener("keydown",p),m(),{update:(h)=>{n={...n,...h},m()},dispose:()=>{r.removeEventListener("keydown",p),r.remove()}}};var Eo=(e,t)=>{F(V);let n=t,o=A("div","oc-sdk oc-sdk-empty"),r=A("h2","oc-sdk-empty-title"),s=A("p","oc-sdk-empty-body"),i=A("div","oc-sdk-empty-action");o.append(r,s,i),e.append(o);let a=null,u=()=>{if(W(r,n.title),W(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){a?.dispose(),a=null;return}let m={label:n.action.label,onClick:n.action.onClick};if(a)a.update(m);else a=Pe(i,{...m,variant:"outline",size:"sm"})};return u(),{update:(m)=>{n={...n,...m},u()},dispose:()=>{a?.dispose(),a=null,o.remove()}}};var ho=(e,t={})=>{F(V);let n=t,o=A("span","oc-sdk oc-sdk-spinner");o.setAttribute("role","status");let r=A("span","oc-sdk-spinner-ring");r.setAttribute("aria-hidden","true");let s=A("span");o.append(r,s),e.append(o);let i=()=>{o.dataset.size=n.size??"default",W(s,n.label),s.hidden=!n.label,o.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(a)=>{n={...n,...a},i()},dispose:()=>{o.remove()}}};var So=(e,t)=>{F(V);let n=t,o=A("div","oc-sdk oc-sdk-banner"),r=A("div","oc-sdk-banner-text"),s=A("div","oc-sdk-banner-title"),i=A("div","oc-sdk-banner-body"),a=A("div","oc-sdk-banner-action");r.append(s,i),o.append(r,a),e.append(o);let u=null,m=()=>{if(o.dataset.tone=n.tone,o.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),W(s,n.title),W(i,n.body),i.hidden=!n.body,a.hidden=!n.action,!n.action){u?.dispose(),u=null;return}let p={label:n.action.label,onClick:n.action.onClick};if(u)u.update(p);else u=Pe(a,{...p,variant:"outline",size:"xs"})};return m(),{update:(p)=>{n={...n,...p},m()},dispose:()=>{u?.dispose(),u=null,o.remove()}}};var Ua=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,go=(e,t)=>{F(V);let n=t,o=A("div","oc-sdk oc-sdk-progress"),r=A("div","oc-sdk-progress-label"),s=A("span"),i=A("span","oc-sdk-progress-value"),a=A("span"),u=Oe("check",14);i.append(u,a),r.append(s,i);let m=A("div","oc-sdk-progress-track");m.setAttribute("role","progressbar"),m.setAttribute("aria-valuemin","0"),m.setAttribute("aria-valuemax","100");let p=A("div","oc-sdk-progress-fill");m.append(p),o.append(r,m),e.append(o);let h=()=>{let _=Ua(n.value);if(it(p,n.tone),p.style.transform=`scaleX(${_/100})`,m.setAttribute("aria-valuenow",String(_)),n.label)m.setAttribute("aria-label",n.label);else m.removeAttribute("aria-label");W(s,n.label),W(a,`${_}%`);let l=_===100&&(!n.tone||n.tone==="neutral");Se(o,"data-done",l?"true":null),u.style.display=l?"":"none",r.hidden=!n.label};return h(),{update:(_)=>{n={...n,..._},h()},dispose:()=>{o.remove()}}};var os=(e)=>e.filter((t)=>!("separator"in t)),Na=0,To=(e,t)=>{F(V);let n=t,o=`oc-sdk-menu-${Na+=1}`,r=A("div","oc-sdk oc-sdk-menu");e.append(r);let s=A("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,a=null,u=Pe(r,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)_();else l()}}),m=r.querySelector("button");m?.setAttribute("aria-haspopup","menu");let p=(g)=>{a=g,Kt(s,s,o,g)},h=()=>{Me(s);for(let g of n.items){if("separator"in g){let x=A("div","oc-sdk-separator");x.dataset.labeled="false",s.append(x);continue}s.append(Wt(o,"menuitem",g,{hover:()=>p(g.id),pick:()=>E(g.id)}))}p(os(n.items).some((g)=>g.id===a)?a:null)},_=()=>{let g=i;i=null,g?.(),a=null,m?.setAttribute("aria-expanded","false")},l=()=>{if(i||!m)return;h(),i=zt(r,m,s,_),m.setAttribute("aria-expanded","true"),s.focus()},E=(g)=>{_(),m?.focus(),n.onSelect(g)},y=(g)=>{let x=ke(g);if(x)g.preventDefault(),p(Ue(os(n.items),a,x));else if(g.key==="Enter"||g.key===" "){if(g.preventDefault(),a)E(a)}else if(g.key==="Escape")g.preventDefault(),_(),m?.focus()},b=(g)=>{if(i&&!(g.relatedTarget instanceof Node&&r.contains(g.relatedTarget)))_()};return s.addEventListener("keydown",y),r.addEventListener("focusout",b),{update:(g)=>{if(n={...n,...g},u.update({label:n.label,variant:n.variant,size:n.size}),i)h()},dispose:()=>{_(),s.removeEventListener("keydown",y),r.removeEventListener("focusout",b),u.dispose(),r.remove()}}};var ct,ie,yo,rs,xo=Object.is,lt=0,fs=[],Ao=[],se=G,{__b:ss,__r:is,diffed:as,__c:cs,unmount:ls,__:ds}=se;function bo(e,t){se.__h&&se.__h(ie,e,lt||t),lt=0;var n=ie.__H||(ie.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function C(e){return lt=1,La(_s,e)}function La(e,t,n){var o=bo(ct++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):_s(void 0,t),function(s){var i=(o.__N||o.__)[0],a=o.t(i,s);xo(i,a)||(o.__N=[a,o.__[1]],o.__c.setState({}))}],o.__c=ie,!ie.__f)){ie.__f=!0;var r=ie.shouldComponentUpdate;ie.shouldComponentUpdate=function(s,i,a){var u=this.__H;if(!u)return!0;var m=!1,p=this.props!=s;if(u.__.some(function(_){_.__N&&(m=!0,xo(_.__[0],_.__N[0])||(p=!0))}),r){var h=r.call(this,s,i,a);return m?h||p:h}return!m||p}}return o.__}function te(e,t){var n=bo(ct++,3);!se.__s&&ms(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,ie.__H.__h.push(n))}function Ne(e){return lt=5,ye(function(){return{current:e}},[])}function ye(e,t){var n=bo(ct++,7);return ms(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function Qe(e,t){return lt=8,ye(function(){return e},t)}function Da(){var e;do{for(;e=Ao.shift();)try{at(e)}catch(n){se.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=fs.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(at),t.__h.some(Ro),t.__h=[]}catch(n){t.__h=[],se.__e(n,e.__v)}}}while(Ao.length)}se.__b=function(e){ie=null,ss&&ss(e)},se.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),ds&&ds(e,t)},se.__r=function(e){is&&is(e),ct=0;var t=(ie=e.__c).__H;t&&(yo==ie?ie.__h=[]:(t.__h.some(at),t.__h.some(Ro),ct=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),yo=ie},se.diffed=function(e){as&&as(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&ps(fs.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),yo=ie=null},se.__c=function(e,t){t.some(function(n){try{n.__h.some(at),n.__h=n.__h.filter(function(o){return!o.__||Ro(o)})}catch(o){n.__h=[function(){throw o}]}}),cs&&cs(e,t)},se.unmount=function(e){ls&&ls(e);var t,n,o=e.__c;o&&o.__H&&(o.__H.__.some(function(r){try{if(r.__P&&r.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}r.__P=n,ps(Ao.push(r))}else at(r)}catch(s){t=s}}),o.__H=void 0,t&&se.__e(t,o.__v))};var us=typeof requestAnimationFrame=="function";function $a(e){var t,n=function(){clearTimeout(o),us&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,35);us&&(t=requestAnimationFrame(n))}function ps(e){e!=1&&rs==se.requestAnimationFrame||((rs=se.requestAnimationFrame)||$a)(Da)}function at(e){var t=ie,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),ie=t}function Ro(e){var t=ie;e.__c=e.__(),ie=t}function ms(e,t){return!e||e.length!=t.length||t.some(function(n,o){return!xo(n,e[o])})}function _s(e,t){return typeof t=="function"?t(e):t}var w=Qn(),Yt=null,Oo=new Set;w.onReady((e)=>{Yt=e,Zn(e,document.documentElement);for(let t of Oo)t(e)});var Es=()=>{let[e,t]=C(Yt);return te(()=>{if(Oo.add(t),Yt)t(Yt);return()=>{Oo.delete(t)}},[]),e};var Ga=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},hs=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),Ha=(e,t)=>{let n=e;for(let o of t){if(n===null||n===void 0)return;n=n[o]}return n},ko=(e,t)=>{let n=(o,r)=>{if(typeof o==="function")return(...s)=>{let i=Ha(t.current,r);return typeof i==="function"?i(...s):void 0};if(Array.isArray(o))return o.map((s,i)=>n(s,[...r,i]));if(Ga(o))return Object.fromEntries(Object.entries(o).map(([s,i])=>[s,n(i,[...r,s])]));return o};return n(e,[])};var ja=Symbol.for("pv"),Va=0;function f(e,t,n,o,r,s){t||(t={});var i,a,u=t;if("ref"in u&&typeof e!="function")for(a in u={},t)a=="ref"?i=t[a]:u[a]=t[a];var m={type:e,props:u,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:ja,__v:--Va,__i:-1,__u:0};return(r||s)&&(m.__source=r,m.__self=s),G.vnode&&G.vnode(m),m}var Fa=(...e)=>e.filter(Boolean).join(" ");var Qt=({children:e,class:t})=>f("span",{class:Fa("sui-chip",t),children:e},void 0,!1,void 0,this);var Ss=(e,t)=>{let n=Ne(null),o=Ne(null),r=Ne(t);r.current=t;let s=hs(t),i=Ne(!1);te(()=>{if(!n.current)return;return o.current=e(n.current,ko(r.current,r)),i.current=!0,()=>{o.current?.dispose(),o.current=null,i.current=!1}},[]);let a=Ne(s);return te(()=>{if(!i.current||a.current===s)return;a.current=s,o.current?.update(ko(r.current,r))},[s]),n};var pe=(e,t="inline-flex")=>(n)=>{let o=Ss(e,n);return f("span",{ref:o,style:{display:t}},void 0,!1,void 0,this)},de=pe(Pe),Ge=pe(qt),dt=pe(lo,"block"),Ze=pe(uo,"block"),gs=pe(fo),Th=pe(To),yh=pe(mo),xe=pe(ho),Be=pe(So,"block"),Ts=pe(Eo,"block"),xh=pe(go,"block"),et=pe(_o,"block"),ys=pe(po),Ah=pe(Jt),Rh=pe(Jt,"block"),Ba=pe(qt,"block");var xs=(e,t)=>JSON.stringify({query:e,variables:t});class ce extends Error{kind;constructor(e,t){super(t);this.kind=e}}var H=async(e,t)=>{let n;try{n=await w.request({method:"POST",path:"/graphql",body:xs(e,t)})}catch(r){if(r instanceof k){if(r.code==="DISCONNECTED"||r.code==="NO_INTEGRATION")throw new ce("disconnected","Linear is not connected.");throw new ce("network",r.message||"Could not reach Linear.")}throw new ce("network",r instanceof Error?r.message:"Could not reach Linear.")}let o;try{o=JSON.parse(n.body)}catch{throw new ce("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new ce("disconnected","Linear sign-in expired.");if(o.errors?.length){let r=o.errors[0],s=r.extensions?.code==="RATELIMITED"||r.extensions?.type==="ratelimited";throw new ce(s?"rate-limited":"graphql",r.message)}if(!o.data)throw new ce("graphql","Linear returned no data.");return o.data};var ut=new Map,Xa=30000,Rs=(e)=>{let t=ut.get(e);if(!t)t={at:0,listeners:new Set},ut.set(e,t);return t},As=(e)=>{for(let t of e.listeners)t()},ge=(e,t,n=!1)=>{let o=Rs(e);if(o.promise)return o.promise;if(!n&&o.value!==void 0&&Date.now()-o.at<Xa)return Promise.resolve(o.value);let r=t().then((s)=>(o.value=s,o.error=void 0,o.at=Date.now(),s),(s)=>{throw o.error=s,s}).finally(()=>{o.promise=void 0,As(o)});return o.promise=r,As(o),r};var bs=(e)=>{let t=ut.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)ge(e,t.fetcher,!0).catch(()=>{return})},Io=(e)=>{for(let[t,n]of ut){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)ge(t,n.fetcher,!0).catch(()=>{return})}},me=(e,t)=>{let[,n]=C(0);te(()=>{if(!e)return;let r=Rs(e);r.fetcher=t;let s=()=>n((i)=>i+1);return r.listeners.add(s),ge(e,t).catch(()=>{return}),()=>{r.listeners.delete(s)}},[e]);let o=e?ut.get(e):void 0;return{data:o?.value,error:o?.error,loading:Boolean(o?.promise)||e!==null&&o?.value===void 0&&o?.error===void 0,refresh:()=>{if(e)ge(e,t,!0).catch(()=>{return})}}};var Os=`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,ks=`
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        activeCycle { id number name startsAt endsAt progress isActive isFuture isPast completedAt }
      }
    }
  }
`,Is=`
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { id name type color position team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,Cs=`
  query TeamPeople($teamId: String!) {
    team(id: $teamId) {
      id
      members(first: 250) { nodes { id name displayName avatarUrl avatarBackgroundColor active } }
      labels(first: 250) { nodes { id name color } }
    }
  }
`,vs=`
  query WorkspaceLabels {
    issueLabels(first: 250) { nodes { id name color team { id } } }
  }
`,Co=`
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
`,ws=`
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
`;var Ms=`
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
`;var Ps=`
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { id name type color position } team { id key } project { id name } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,Zt=(e)=>`
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
`;var Us=`
  query TeamCycles($teamId: String!, $minNumber: Float!) {
    team(id: $teamId) {
      id key name
      cycles(first: 25, filter: { number: { gte: $minNumber } }) { nodes { id number name startsAt endsAt progress isActive isFuture isPast completedAt } }
    }
  }
`;var Ns=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`,Ls=`
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
`,Ds=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`,$s=`
  query SearchDocuments($term: String!) {
    searchDocuments(term: $term, first: 20) { nodes { id title url updatedAt project { id name } } }
  }
`,Gs=`
  query Documents($filter: DocumentFilter) {
    documents(first: 100, filter: $filter) { nodes { id title url updatedAt project { id name } } }
  }
`,Hs=`
  query Document($id: String!) {
    document(id: $id) { id title content url updatedAt project { id name } creator { id name displayName avatarUrl avatarBackgroundColor } }
  }
`;var js=`
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
`,Vs=`
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`;var Fs=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,Uh={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:Zt(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
  query IssuesByKeys($filter: IssueFilter) {
    issues(first: 25, filter: $filter) { nodes { 
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
`,BLOCK_STATES:`
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`,TEAM_CYCLES:`
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
`,NOTIFICATIONS_MARK_READ:Fs(["n1","n2"])};var Bs=new Map,vo=(e)=>{for(let t of e)Bs.set(t.id,t);return e},en=(e)=>Bs.get(e),Wa={type:{nin:["completed","canceled"]}},tn=async(e)=>{if(!e.length)return[];let t=await H(Co,{after:null,filter:{id:{in:[...e].sort()}}});return vo(t.projects.nodes)},wo=async(e)=>{let t=await H(Ds,{term:e});return vo(t.searchProjects.nodes)},Ka=async(e)=>{let t=await H(Co,{after:null,filter:{accessibleTeams:{some:{id:{eq:e}}},status:Wa}});return vo(t.projects.nodes).sort((n,o)=>n.name.localeCompare(o.name))},Xs=(e)=>{let t=e.length?`projects:${[...e].sort().join(",")}`:null;return me(t,()=>tn(e))},pt=(e)=>{let t=e.length?`team-projects:${[...e].sort().join(",")}`:null;return me(t,async()=>{let n=await Promise.all(e.map((r)=>ge(`team-projects:${r}`,()=>Ka(r)))),o=new Set;return n.flat().filter((r)=>o.has(r.id)?!1:(o.add(r.id),!0))})},Ws=(e)=>{let[t,n]=C(e);return te(()=>{let o=setTimeout(()=>n(e.trim()),250);return()=>clearTimeout(o)},[e]),me(t.length>=2?`project-search:${t.toLowerCase()}`:null,()=>wo(t))};async function nn(e,t,n,o={}){let r=o.name??"extension",s={};for(let[i,a]of Object.entries(o.query??{}))if(a)s[i]=a;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...o.body!==void 0?{body:JSON.stringify(o.body)}:{}}),a;try{a=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${r} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&a.ok===void 0)return{ok:!1,error:String(a.message??`Error ${i.status}`),code:"failed"};return a}catch(i){let a=i.code;if(a==="NO_SERVICE")return{ok:!1,error:`Approve the ${r} service in Settings > Extensions.`,code:"failed"};if(a==="SERVICE_FAILED")return{ok:!1,error:`The ${r} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${r} service.`,code:"failed"}}}async function ue(e,t,n,o={}){try{await e.toast({kind:t,message:n,...o.dismiss?{dismiss:!0}:{}})}catch{}}var on={source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null,work:null},qa=(e)=>{let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)},ft=(e)=>e.replace(/\/+$/,""),Mo=(e)=>ft(e).split("/").pop()??"",Ja=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,Ya=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),n=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(n)return{host:n[1].toLowerCase(),path:n[2]};let o=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(o)return{host:o[1].toLowerCase(),path:o[2]};return null},Qa=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],n=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],o=t??n;return o?Ya(o):null},Za=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let n=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(n)return{host:n[1].toLowerCase(),path:n[2]};return null},ec=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,rn=async(e,t)=>{let n=ft(t),o=(await e.listProjects().catch(()=>{return}))?.projects??[],r=o.find((_)=>ft(_.directory)===n)??null,s=null;for(let _ of r?[r]:o){let E=((await e.listWorktrees(_.id).catch(()=>{return}))?.worktrees??[]).find((y)=>ft(y.directory)===n);if(E){r=_,s=E.branch||null;break}}if(!s)s=Ja(await e.readFile(".git/HEAD"));let i=r?`p:${r.id}`:`d:${qa(n)}`,u=[...r?(await e.listSessions(r.id).catch(()=>{return}))?.sessions??[]:[]].sort((_,l)=>l.updatedAt-_.updatedAt),m=[],p=null;for(let _ of u){for(let l of _.links??[]){let E=l.url.match(ec)?.[1]?.toUpperCase();if(E&&!m.includes(E))m.push(E);if(!p&&l.kind==="change")p=Za(l.url)}for(let l of _.items){let E=l.data,y=typeof E?.identifier==="string"?E.identifier.toUpperCase():null;if(y&&!m.includes(y))m.push(y)}}let h=Qa(await e.readFile(".git/config"));if(h)await e.setRepo(i,h).catch(()=>{return});else h=await e.getRepo(i).catch(()=>null)??p;return{key:i,ocProjectId:r?.id??null,projectDirectory:r?ft(r.directory):n,directory:n,branch:s,repo:h,linkedIssues:m.slice(0,20)}},tc=(e,t)=>{let n=[];for(let o of e.matchAll(/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6})-(\d+)(?![A-Za-z0-9])/g)){let r=o[1].toUpperCase(),s=`${r}-${o[2]}`;if(t.has(r)&&!n.includes(s))n.push(s)}return n},mt=(e)=>e.toLowerCase().replace(/[^a-z0-9]/g,""),Ks=new Set(["api","app","apps","web","ui","service","services","svc","server","client","helm","chart","charts","terraform","tf","infra","argo","deploy","config","lib","libs","sdk","core","backend","frontend","mobile","ios","android","worker"]),nc=(e)=>{let t=[],n=(i,a,u)=>{if(mt(i).length>=2&&!t.some((m)=>mt(m.text)===mt(i)))t.push({text:i,weight:a,label:u})},o=Mo(e.projectDirectory),r=e.repo?Mo(e.repo.path):"";if(n(o,1,`folder name "${o}"`),r)n(r,1,`repository "${r}"`);for(let i of[o,r].join("-").split(/[-_.\s]+/))if(i.length>=2&&!Ks.has(i.toLowerCase()))n(i,0.8,`the word "${i}" in the repository name`);let s=e.repo?e.repo.path.split("/").slice(0,-1).reverse():[];for(let i of s)if(!Ks.has(i.toLowerCase()))n(i,0.7,`repository group "${i}"`);return t},oc=(e,t)=>{let n=mt(e),o=mt(t);if(n.length<3||o.length<3)return 0;if(n===o)return 3;if(n.startsWith(o)||o.startsWith(n))return 2;if(n.includes(o)||o.includes(n))return 1;return 0};var zs=(e,t)=>{let n=null;for(let o of t)for(let r of e){let s=oc(o.name,r.text)*r.weight;if(o.key&&o.key.toLowerCase()===r.text.toLowerCase()&&o.key.length>=2)s=Math.max(s,2.5*r.weight);if(s>=1.4&&(!n||s>n.score))n={item:o,score:s,label:r.label}}return n},rc=(e)=>e.status.type!=="completed"&&e.status.type!=="canceled";var sc=async(e,t,n)=>{let o=t.branch?tc(t.branch,n).slice(0,3):[],r=t.linkedIssues.slice(0,1),s=[...o,...r.filter((a)=>!o.includes(a))];if(!s.length)return null;let i=await e.issuesByIdentifier(s).catch(()=>[]);for(let a of s){let u=i.find((m)=>m.identifier===a);if(u)return{identifier:u.identifier,title:u.title,url:u.url,teamKey:u.team.key,projectName:u.project?.name??null,from:o.includes(a)?"branch":"session"}}return null},qs=(...e)=>e.flatMap((t)=>Array.isArray(t)?t:t===void 0?[]:[t]).filter((t)=>typeof t==="string"),Js=(e)=>[...new Set(e)],ic=async(e,t,n)=>{let o;try{o=JSON.parse(t)}catch{return null}let r=qs(o.teams,o.team).map((i)=>n.find((a)=>a.id===i||a.key.toLowerCase()===i.toLowerCase())?.id).filter((i)=>Boolean(i)),s=[];for(let i of qs(o.projects,o.project)){let a=i.trim(),u=a.match(/linear\.app\/[^/]+\/project\/([^/?#]+)/i)?.[1]?.split("-").pop(),p=(await e.projectsByIds([u??a]).catch(()=>[]))[0]??(await e.searchProjects(a).catch(()=>[])).find((h)=>h.name.toLowerCase()===a.toLowerCase());if(p)s.push(p.id)}return r.length||s.length?{teamIds:Js(r),projectIds:Js(s)}:null},Ys=async(e,t,n)=>{let o=new Set(n.map((h)=>h.key.toUpperCase())),r=await sc(e,t,o),s=(h)=>({...h,work:r}),i=await e.getMapping(t.key);if(i&&(i.linearProjectIds.length||i.teamIds.length))return s({source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:i.teamIds,projectIds:i.linearProjectIds,mapping:i});let a=await e.readFile(".linear.json");if(a){let h=await ic(e,a,n);if(h)return s({source:"config",inferred:!1,evidence:".linear.json",...h,mapping:null})}if(t.repo){let h=await e.repoAttachments(`${t.repo.host}/${t.repo.path}/`).catch(()=>[]),_=new Map;for(let y of h)if(y.issue)_.set(y.issue.id,{team:y.issue.team.id,project:y.issue.project?.id??null});let l=new Map;for(let{team:y}of _.values())l.set(y,(l.get(y)??0)+1);let E=[...l.entries()].sort((y,b)=>b[1]-y[1])[0];if(E&&E[1]>=3){let y=new Map;for(let{team:x,project:R}of _.values())if(x===E[0]&&R)y.set(R,(y.get(R)??0)+1);let b=[...y.entries()].sort((x,R)=>R[1]-x[1])[0],g=b&&b[1]>=3&&b[1]/E[1]>=0.6?[b[0]]:[];return s({source:"repo",inferred:!0,evidence:`${E[1]} issues with merge requests in ${Mo(t.repo.path)}`,teamIds:[E[0]],projectIds:g,mapping:null})}}let u=nc(t),m=zs(u,n);if(m)return s({source:"name",inferred:!0,evidence:m.label,teamIds:[m.item.id],projectIds:[],mapping:null});let p=u[0]?.text;if(p){let h=(await e.searchProjects(p).catch(()=>[])).filter(rc),_=zs(u,h);if(_)return s({source:"name",inferred:!0,evidence:_.label,teamIds:[],projectIds:[_.item.id],mapping:null})}return s({source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null})};var Po=async(e)=>{try{let t=await w.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},Qs=async(e,t)=>{try{return await w.storage.set(e,t),!0}catch{return!1}},Zs=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),ei=async(e)=>{let t=await Po(`map:${e}`);return Zs(t)?t:null},Uo=async(e,t)=>{let n=await Qs(`map:${e}`,t);return oi(),n},ti=async(e)=>{try{await w.storage.delete(`map:${e}`)}catch{}oi()},No=async(e)=>{let t=await Po(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},ni=async(e,t)=>{let n=await No(e);if(n?.host!==t.host||n.path!==t.path)await Qs(`repo:${e}`,t)};var oi=async()=>{let e=[];try{e=await w.storage.keys()??[]}catch{return}let t={};for(let n of e.filter((o)=>o.startsWith("map:"))){let o=await Po(n);if(Zs(o)&&o.directory)t[o.directory]=o}await nn(w,"PUT","/config",{body:{directories:t},name:"Linear"})};var ac=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,_t={listProjects:()=>w.listProjects(),listWorktrees:(e)=>w.listWorktrees(e),listSessions:(e)=>w.listSessions(e),readFile:(e)=>w.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:ei,getRepo:No,setRepo:ni,issuesByIdentifier:async(e)=>{let t=e.filter((o)=>ac.test(o));if(!t.length)return[];let n=await H(Zt(t));return Object.values(n).filter((o)=>Boolean(o))},repoAttachments:async(e)=>(await H(Ns,{url:e})).attachments.nodes,searchProjects:wo,projectsByIds:tn},cc=(e,t)=>e.teamsById.get(t)?.name??en(t)?.name??"Unknown",ri=(e,t)=>{let[n,o]=C(null),[r,s]=C(on),[i,a]=C(!1),[u,m]=C(0),p=Ne(0);te(()=>{a(!1)},[e]),te(()=>{if(!t)return;let g=++p.current;if(!e){o(null),s(on),a(!0);return}(async()=>{let x=await rn(_t,e),R=await Ys(_t,x,t.teams).catch(()=>on);if(g!==p.current)return;let U=R.teamIds.filter((N)=>t.teamsById.has(N)),K=R.projectIds.length?await tn(R.projectIds).catch(()=>[]):[],ne=R.projectIds.filter((N)=>K.some((j)=>j.id===N));if(g!==p.current)return;o(x),s({...R,teamIds:U,projectIds:ne}),a(!0)})()},[e,t,u]);let h=Qe(()=>m((g)=>g+1),[]),_=Qe(async(g,x)=>{if(!n)return!1;let R=[...g,...x],U=r.mapping?.activeProjectId,K={directory:n.projectDirectory,linearProjectIds:x,teamIds:g,activeProjectId:R.length===1?R[0]:U&&R.includes(U)?U:R[0]??"all",finishComments:r.mapping?.finishComments??"off",updatedAt:Date.now()};s((N)=>({...N,source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:g,projectIds:x,mapping:K}));let ne=await Uo(n.key,K);if(!ne)await ue(w,"error","Could not save this folder's choice. It applies until you reload.");return ne},[n,r]),l=Qe(async()=>{if(!await _(r.teamIds,r.projectIds))return;let g=t?[...r.teamIds,...r.projectIds].map((x)=>cc(t,x)).join(", "):"";await ue(w,"success",g?`Pinned ${g} to this folder`:"Pinned to this folder")},[_,r,t]),E=Qe(async()=>{if(!n)return;await ti(n.key),h()},[n,h]),y=Qe((g)=>{if(!n||!r.mapping)return;let x={...r.mapping,activeProjectId:g,updatedAt:Date.now()};s((R)=>({...R,mapping:x})),Uo(n.key,x)},[n,r]),b=r.teamIds.length+r.projectIds.length>0;return{place:n,detection:r,settled:i,mapped:b,refresh:h,save:_,pin:l,clear:E,setActive:y}};var lc=5,Lo=null,dc=new Map;var si=(e,t)=>{let n=dc.get(t);if(n!==void 0)return n;let o=Lo?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],r=o.findIndex((s)=>s.id===t);return r<0?0.5:(r+1)/(o.length+1)};var uc=async()=>{let e=new Map,t=null;for(let n=0;n<lc;n+=1){let o=await H(Is,{after:t});for(let{team:r,...s}of o.workflowStates.nodes){let i=e.get(r.id)??[];i.push(s),e.set(r.id,i)}if(!o.workflowStates.pageInfo.hasNextPage)break;t=o.workflowStates.pageInfo.endCursor}for(let n of e.values())n.sort((o,r)=>o.position-r.position);return e},pc=async()=>{let[e,t,n]=await Promise.all([H(Os).then((o)=>o.viewer),H(ks).then((o)=>o.teams.nodes),uc()]);return t.sort((o,r)=>o.name.localeCompare(r.name)),Lo={viewer:e,teams:t,teamsById:new Map(t.map((o)=>[o.id,o])),myTeamIds:new Set(e.teams?.nodes.map((o)=>o.id)??[]),statesByTeam:n},Lo},fc="workspace";var sn=()=>me(fc,pc);var ii={state:{type:{nin:["completed","canceled","duplicate"]}}};var ai=(e,t,n=!1)=>{let o=[];if(e.length){let r=[...e].sort();o.push({team:n?{or:[{id:{in:r}},{ancestors:{some:{id:{in:r}}}}]}:{id:{in:r}}})}if(t.length)o.push({project:{id:{in:[...t].sort()}}});if(!o.length)return null;return o.length===1?o[0]:{or:o}},ci=(...e)=>{let t=e.filter((n)=>Boolean(n));return t.length===1?t[0]:{and:t}},li={assigned:{assignee:{isMe:{eq:!0}}},created:{creator:{isMe:{eq:!0}}},subscribed:{subscribers:{some:{isMe:{eq:!0}}}}};var Xe=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ce&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ce&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."};var di=async(e)=>{let t=await H(js,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new ce("graphql","Linear did not create the issue.");return Io("issues:"),Io("view-issues:"),t.issueCreate.issue},Do=async(e,t)=>{if(!(await H(Vs,{input:{issueId:e.id,body:t}})).commentCreate.success)throw new ce("graphql","Linear did not save the comment.");bs(`issue:${e.identifier}`)};var mc=async(e)=>{let t=await H(Ps,{filter:ci(ii,li.assigned,e)});return{issues:t.issues.nodes,more:t.issues.pageInfo.hasNextPage}};var ui=(e)=>me(e?`status-mine:${JSON.stringify(e)}`:null,()=>mc(e));var Ie=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let o=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...o?{}:{year:"numeric"}})};var pi=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let o=Math.max(0,Math.round((t-n)/60000));if(o<1)return"just now";if(o<60)return`${o}m ago`;let r=Math.round(o/60);if(r<24)return`${r}h ago`;let s=Math.round(r/24);if(s<30)return`${s}d ago`;return Ie(e,new Date(t))},an=(e)=>`${Math.floor(Math.max(0,Math.min(1,e))*100)}%`,$o={onTrack:"On track",atRisk:"At risk",offTrack:"Off track"};var _c={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},cn=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return _c[e]??String(e);return String(e)};var fi=15000,mi=(e)=>e.length>fi?`${e.slice(0,fi)}
[cut]`:e,_i=(e)=>e.filter((t,n,o)=>t||o[n-1]).join(`
`).trim(),Ei=(e)=>{let t=e.teams.nodes.map((s)=>s.name).join(", "),n=e.projectMilestones.nodes.slice().sort((s,i)=>s.sortOrder-i.sortOrder).map((s)=>`- ${s.name}${s.targetDate?` (${Ie(s.targetDate)})`:""}: ${an(s.progress)}`),o=e.projectUpdates.nodes[0],r=e.content?.trim()||e.description?.trim()||"";return mi(_i([`Linear project: ${e.name}`,`Status: ${e.status.name}.${e.health?` Health: ${$o[e.health]}.`:""} Progress: ${an(e.progress)}.`,t?`Teams: ${t}.`:"",e.lead?`Lead: ${e.lead.name}.`:"",e.startDate||e.targetDate?`Dates: ${e.startDate?`starts ${Ie(e.startDate)}`:""}${e.startDate&&e.targetDate?", ":""}${e.targetDate?`target ${Ie(e.targetDate)}`:""}.`:"",`Link: ${e.url}`,...n.length?["","Milestones:",...n]:[],...o?["",`Latest update (${Ie(o.createdAt)}, ${o.user?.name??"someone"}${o.health?`, ${$o[o.health]}`:""}):`,o.body.trim()]:[],...r?["",r]:[]]))},hi=(e)=>mi(_i([`Linear document: ${e.title}`,e.project?`Project: ${e.project.name}.`:"",`Link: ${e.url}`,"",e.content?.trim()??""]));var Ec=["No priority","Urgent","High","Medium","Low"],Si=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${Ec[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],n=e.comments.nodes.slice(-5).map((r)=>`${r.user?.name??"Someone"} (${Ie(r.createdAt)}): ${r.body}`),o=[...t,...n.length?["","Latest comments:",...n]:[]].filter((r,s,i)=>r||i[s-1]).join(`
`);return o.length>15000?`${o.slice(0,15000)}
[cut]`:o};var ln=(e)=>{let[t,n]=C(e);return te(()=>{let o=setTimeout(()=>n(e.trim()),250);return()=>clearTimeout(o)},[e]),t},gi=(e)=>e.length>=2,dn=(e)=>{let t=ln(e);return me(gi(t)?`issue-search:${t.toLowerCase()}`:null,async()=>(await H(Ls,{term:t})).searchIssues.nodes)},Ti=(e)=>{let t=ln(e);return me(gi(t)?`document-search:${t.toLowerCase()}`:null,async()=>(await H($s,{term:t})).searchDocuments.nodes)},yi=(e)=>me(e.length?`project-documents:${[...e].sort().join(",")}`:null,async()=>(await H(Gs,{filter:{project:{id:{in:[...e].sort()}}}})).documents.nodes),xi=(e)=>ge(`project:${e}`,async()=>(await H(ws,{id:e})).project),Ai=(e)=>ge(`document:${e}`,async()=>(await H(Hs,{id:e})).document);var un=(e)=>e===0?5:e;var Ri=["triage","backlog","unstarted","started","completed","canceled","duplicate"],Et=(e,t)=>Ri.indexOf(e.type)-Ri.indexOf(t.type)||e.position-t.position;var Go=["No priority","Urgent","High","Medium","Low"];var gc={started:0,unstarted:1,triage:2,backlog:3},bi=(e)=>gc[e]??9;var Tc=5,Oi=(e,t=Tc)=>[...e].sort((n,o)=>bi(n.state.type)-bi(o.state.type)||un(n.priority)-un(o.priority)||o.updatedAt.localeCompare(n.updatedAt)).slice(0,t);var Ho="linear-dashboard",yc=(e)=>({id:`issue:${e.identifier}`,leading:e.identifier,title:e.title,meta:e.state.name}),xc=(e)=>({id:`project:${e.id}`,title:e.name,subtitle:["Project",e.teams.nodes.map((t)=>t.name).join(", "),e.status.name].filter(Boolean).join(" · "),badge:{label:"Project",tone:"info"}}),Ac=(e)=>({id:`doc:${e.id}`,title:e.title,subtitle:["Document",e.project?.name,e.updatedAt?`updated ${pi(e.updatedAt)}`:""].filter(Boolean).join(" · "),badge:{label:"Doc"}}),Rc=(e)=>{let t=new Set;return e.filter((n)=>t.has(n.id)?!1:(t.add(n.id),!0))},ki=({scope:e,projectIds:t,teamIds:n})=>{let[o,r]=C(""),[s,i]=C(null),u=ln(o).length>=2,m=ui(u?null:ai(n,t)??{}),p=dn(u?o:""),h=Xs(t),_=pt(e.teamIds),l=Ws(u?o:""),E=Ti(u?o:""),y=ye(()=>Rc([...h.data??[],..._.data??[]]).slice(0,20),[h.data,_.data]),b=yi(y.map((N)=>N.id)),g=u?p.data?.slice(0,20):m.data?Oi(m.data.issues,15):void 0,x=u?l.data:y,R=u?E.data:b.data,U=u?!l.data||!E.data||!p.data:h.loading||_.loading||m.loading,K=async(N)=>{i(N);try{let[j,oe]=[N.slice(0,N.indexOf(":")),N.slice(N.indexOf(":")+1)],z=j==="issue"?await(async()=>{let M=(await H(Ms,{id:oe})).issue;return{providerId:Ho,id:M.identifier,title:`${M.identifier} ${M.title}`,url:M.url,kind:"issue",text:Si(M),data:{issueId:M.id,identifier:M.identifier}}})():j==="project"?await(async()=>{let M=await xi(oe);return{providerId:Ho,id:N,title:M.name,url:M.url,kind:"issue",text:Ei(M),data:{kind:"project",id:M.id}}})():await(async()=>{let M=await Ai(oe);return{providerId:Ho,id:N,title:M.title,url:M.url,kind:"issue",text:hi(M),data:{kind:"document",id:M.id}}})();await w.attach(z),await ue(w,"success",`Attached ${z.title} to your message`),await w.close()}catch(j){await ue(w,"error",j instanceof ce?Xe(j):"Could not attach it. Open a chat first, then try again."),i(null)}},ne=!U&&!g?.length&&!x?.length&&!R?.length;return f("div",{class:"lin-stack",children:[f("p",{class:"lin-lead",children:["Attach a Linear issue, project or document, so the agent can read it.",!u&&" Showing your open issues and this folder's projects; type to search all of Linear."]},void 0,!0,void 0,this),f(Ze,{value:o,onChange:r,placeholder:"Search issues, projects and documents",autofocus:!0},void 0,!1,void 0,this),s&&f(xe,{size:"sm",label:"Reading it from Linear"},void 0,!1,void 0,this),g&&g.length>0&&f("div",{class:"lin-attach-group",children:[f("div",{class:"lin-subheading",children:u?"Issues":"Your open issues"},void 0,!1,void 0,this),f(et,{ariaLabel:"Issues",items:g.map(yc),onSelect:(N)=>{if(!s)K(N)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),x&&x.length>0&&f("div",{class:"lin-attach-group",children:[f("div",{class:"lin-subheading",children:"Projects"},void 0,!1,void 0,this),f(et,{ariaLabel:"Projects",items:x.map(xc),onSelect:(N)=>{if(!s)K(N)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),R&&R.length>0&&f("div",{class:"lin-attach-group",children:[f("div",{class:"lin-subheading",children:"Documents"},void 0,!1,void 0,this),f(et,{ariaLabel:"Documents",items:R.map(Ac),onSelect:(N)=>{if(!s)K(N)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),U&&f(xe,{label:u?"Searching":"Loading"},void 0,!1,void 0,this),ne&&f("div",{class:"sui-muted sui-small",children:u?"No issue, project or document matches.":"Nothing for this folder yet."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Ii=({item:e})=>f("div",{class:"lin-dialog-body",children:[f("h2",{class:"lin-dialog-title",children:e.title},void 0,!1,void 0,this),f("p",{class:"lin-lead",children:"This is attached to your message. The agent reads its text, not the page."},void 0,!1,void 0,this),f("div",{class:"lin-form-foot",children:[f(de,{label:"Close",variant:"ghost",size:"sm",onClick:()=>{w.close()}},void 0,!1,void 0,this),e.url&&f(de,{label:"Open in Linear",size:"sm",onClick:()=>{w.openUrl(e.url)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this);var bc=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,Ci=(e)=>{if(!e)return[];let t=[],n=(r)=>{let s=r?.toUpperCase();if(s&&!t.includes(s))t.push(s)},o=[...e.links??[]].sort((r,s)=>(s.linkedAt??0)-(r.linkedAt??0));for(let r of o)n(r.url.match(bc)?.[1]);for(let r of e.items??[]){let s=r.data?.identifier;if(typeof s==="string")n(s)}return t};var vi=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let r=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(r.slice(0,2),16),parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16)]}let o=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return o?[Number(o[1]),Number(o[2]),Number(o[3])]:null},wi=([e,t,n])=>{let o=(r)=>{let s=r/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*o(e)+0.7152*o(t)+0.0722*o(n)},Oc=(e,t)=>{let[n,o]=[wi(e),wi(t)].sort((r,s)=>s-r);return(n+0.05)/(o+0.05)};var Mi=(e,t)=>{let n=vi(e),o=vi(t);if(!n||!o||Oc(n,o)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Pi=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),kc=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),o=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${o.toFixed(2)}z`},pn=({type:e,color:t,size:n=14,fill:o,teamId:r,stateId:s})=>{let i=t||"currentColor",a=ye(()=>Mi(i,Pi()),[i,Pi()]),u={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return f("svg",{...u,children:[f("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),f("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return f("svg",{...u,children:f("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return f("svg",{...u,children:f("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let m=o??(r&&s?si(r,s):0.5);return f("svg",{...u,children:[f("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this),f("path",{d:kc(m),fill:a},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return f("svg",{...u,children:[f("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),f("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return f("svg",{...u,children:[f("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),f("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}};var Ic=(e)=>({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:`${e.identifier}: ${e.title}
Status: ${e.state.name}.
Link: ${e.url}`,data:{issueId:e.id,identifier:e.identifier}}),fn=({title:e,issue:t,canLink:n})=>{let[o,r]=C(!1),s=async()=>{try{await w.sessionLink(Ic(t)),r(!0),await ue(w,"success",`Linked ${t.identifier} to this session`)}catch{await ue(w,"error","Open a session to link the issue to it.")}};return f("div",{class:"lin-dialog-body","data-state":"done",children:[f(Be,{tone:"success",title:e,body:`${t.identifier} ${t.title}`},void 0,!1,void 0,this),f("div",{class:"lin-form-foot",children:[f(de,{label:"Close",variant:"ghost",size:"sm",onClick:()=>{w.close()}},void 0,!1,void 0,this),n&&f(de,{label:o?"Linked":"Link to this session",variant:"outline",size:"sm",disabled:o,onClick:()=>{s()}},void 0,!1,void 0,this),f(de,{label:"Open in Linear",size:"sm",onClick:()=>{w.openUrl(t.url)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Ui=["You write issues for Linear, a tracker used by software teams.",'Answer with one JSON object and nothing else: {"title": string, "description": string}.',"The title is one short line (under 80 characters) that says what needs doing, in plain words.","The description is Markdown: what is wrong or wanted, why it matters when the text says so, and any detail a teammate needs. Use short paragraphs or bullet points. Quote error text and names exactly.","Use only what the text contains. Do not invent causes, owners or dates. Use plain punctuation: no dashes as punctuation."].join(`
`),We=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-10))}
[cut]`,Ni=(e,t,n)=>`Draft a Linear issue from this ${t==="user"?"message I sent":"reply from the coding assistant"} in the session "${n}".

<text>
${We(e.trim(),59600)}
</text>`,Li=(e,t)=>`Draft a Linear issue from this text, which I selected in ${t?`the session "${t}"`:"a coding session"}.

<text>
${We(e.trim(),59600)}
</text>`,Di=(e,t)=>{let n=`Draft a Linear issue from this conversation between me and a coding assistant, in the session "${t}". Capture the problem or the task the conversation ended on, not every step.

`,o=60000-n.length-200,r=[],s=0,i=!1;for(let a=e.length-1;a>=0;a-=1){let u=e[a],m=u.text.trim();if(!m)continue;let p=`[${u.role}]
${We(m,8000)}`;if(s+p.length+2>o){if(!r.length)r.push(`[${u.role}]
${We(m,o-20)}`);i=!0;break}r.unshift(p),s+=p.length+2}return`${n}<conversation>
${i?`[earlier messages left out]

`:""}${r.join(`

`)}
</conversation>`},$i=(e,t,n,o=5)=>{let r=e.split(`
`),s=Math.max(1,Math.min(t,n)),i=Math.min(r.length,Math.max(t,n)),a=Math.max(1,s-o),u=Math.min(r.length,i+o);return{text:r.slice(a-1,u).join(`
`),from:a,to:u}},mn=(e,t)=>{let n=Math.min(e,t),o=Math.max(e,t);return n===o?`${n}`:`${n}-${o}`},jo=(e,t,n)=>`Location: \`${e}:${mn(t,n)}\``,Gi=(e,t,n,o)=>{let r=e.trim();if(r.includes(t))return r;let s=jo(t,n,o);return r?`${r}

${s}`:s},Hi=(e,t,n,o,r)=>{let s=`File: ${e}
Selected lines: ${mn(t,n)}`;if(!o)return`Draft a Linear issue about a change to a file in my project. I could not read the file, so describe only where it is.

${s}`;return[`Draft a Linear issue about the lines I selected in a file of my project.${r?" The selection is on the removed side of a diff, so the lines below are the current file and may differ.":""} Say in the description which file and lines it concerns.`,"",`${s} (the snippet shows lines ${o.from} to ${o.to})`,"","<code>",We(o.text,30000),"</code>"].join(`
`)},Cc=(e)=>{let t="",n=!1,o=!1;for(let r of e)if(n){if(o){o=!1,t+=r;continue}if(r==="\\"){o=!0,t+=r;continue}if(r==='"'){n=!1,t+=r;continue}if(r===`
`){t+="\\n";continue}if(r==="\r")continue;if(r==="\t"){t+="\\t";continue}t+=r}else{if(r==='"')n=!0;t+=r}return t},vc=(e)=>{for(let t of[e,Cc(e)])try{let n=JSON.parse(t);if(typeof n==="object"&&n!==null&&!Array.isArray(n))return n}catch{}return null},wc=(e)=>{let t=e.indexOf("{"),n=e.lastIndexOf("}");if(t<0||n<=t)return null;let o=vc(e.slice(t,n+1));if(!o||typeof o.title!=="string")return null;let r=o.title.replace(/\s+/g," ").trim().slice(0,200);if(!r)return null;let s=typeof o.description==="string"?o.description.trim():"";return{title:r,description:s}},Vo=(e,t)=>{if(e==="NO_MODEL")return{kind:"no-model"};if(e==="NOT_GRANTED")return{kind:"failed",message:"This extension is not allowed to use the Small Model. Approve it in Settings, Extensions."};if(e==="HOST_TIMEOUT")return{kind:"failed",message:"The Small Model took too long to answer."};return{kind:"failed",message:t||"The Small Model could not draft the issue."}},ji=(e)=>{let t=wc(e);return t?{kind:"draft",draft:t}:{kind:"failed",message:"The Small Model answered, but its answer could not be read."}};var Fo=(e)=>e,Vi=(e)=>{let t=e.replace(/\s+/g," ").trim();return t?t.length>160?`${t.slice(0,157).trimEnd()}…`:t:null},Fi="There is no text to draft from, so the form starts empty.",Bi=(e,t)=>{if(!e||!("kind"in e))return null;if(e.kind==="message"&&e.action!=="comment-on-issue")return{key:`message:${e.messageId}`,source:e.role==="user"?"From a message you sent":"From a reply by the assistant",quote:Vi(e.text),build:async()=>e.text.trim()?{prompt:Ni(e.text,e.role,e.sessionTitle)}:{prompt:null,note:Fi},finish:Fo};if(e.kind==="selection")return{key:`selection:${e.messageId}:${e.text.length}`,source:"From the text you selected",quote:Vi(e.text),build:async()=>e.text.trim()?{prompt:Li(e.text,t.sessionTitle)}:{prompt:null,note:Fi},finish:Fo};if(e.kind==="session"){let n=e.messages??[];return{key:`session:${e.sessionId}`,source:n.length?`From this chat (${n.length} ${n.length===1?"message":"messages"})`:"From this chat",quote:null,build:async()=>n.length?{prompt:Di(n.map((o)=>({role:o.role,text:o.text})),e.sessionTitle)}:{prompt:null,note:"OpenChamber did not hand over the messages of this chat, so the form starts empty."},finish:Fo}}if(e.kind==="diff"){let{path:n,startLine:o,endLine:r}=e;return{key:`diff:${n}:${o}:${r}`,source:`From ${n}, line${o===r?"":"s"} ${mn(o,r)}`,quote:null,initial:{description:jo(n,o,r)},build:async()=>{let s=await t.readFile(n),i=s===null?null:$i(s,o,r);return{prompt:Hi(n,o,r,i,e.side==="deletions")}},finish:(s)=>({...s,description:Gi(s.description,n,o,r)})}}return null},Xi=(e,t)=>`**OpenChamber session: ${e}**

${We(t.trim(),20000)}`;var Mc=async(e,t)=>{let n=e.directory??t;if(!n)return[];let o=await rn(_t,n);if(!o.ocProjectId)return[];let s=(await w.listSessions(o.ocProjectId).catch(()=>{return}))?.sessions.find((a)=>a.id===e.sessionId),i=Ci(s).slice(0,10);return i.length?_t.issuesByIdentifier(i):[]},Wi=({issues:e,onPick:t,label:n})=>f(et,{ariaLabel:n,items:e.map((o)=>({id:o.id,leading:o.identifier,title:o.title,meta:o.state.name})),onSelect:(o)=>{let r=e.find((s)=>s.id===o);if(r)t(r)},emptyText:"No issue found."},void 0,!1,void 0,this),Pc=({linked:e,onPick:t})=>{let[n,o]=C(""),r=dn(n),s=n.trim().length>=2;return f("div",{class:"lin-stack",children:[f("p",{class:"lin-lead",children:e.length?"This session is linked to more than one issue. Pick the one to comment on, or search for another.":"No issue is linked to this session. Search for the issue to comment on."},void 0,!1,void 0,this),f(Ze,{value:n,onChange:o,placeholder:"Search Linear issues",autofocus:!0},void 0,!1,void 0,this),s?r.data?f(Wi,{issues:r.data,onPick:t,label:"Search results"},void 0,!1,void 0,this):f(xe,{label:"Searching"},void 0,!1,void 0,this):e.length?f(Wi,{issues:e,onPick:t,label:"Linked issues"},void 0,!1,void 0,this):null]},void 0,!0,void 0,this)},Ki=({item:e,directory:t})=>{let[n,o]=C(null),[r,s]=C(null),[i,a]=C(!1),[u,m]=C(()=>Xi(e.sessionTitle,e.text)),[p,h]=C(!1),[_,l]=C(null);te(()=>{let y=!0;return Mc(e,t).catch(()=>[]).then((b)=>{if(!y)return;if(o(b),b.length===1)s(b[0]);else a(!0)}),()=>{y=!1}},[e.sessionId,e.messageId]);let E=async()=>{if(!r||!u.trim()||p)return;h(!0);try{await Do(r,u),await ue(w,"success",`Commented on ${r.identifier}`),l(r)}catch(y){await ue(w,"error",Xe(y)),h(!1)}};if(_)return f(fn,{title:"Comment posted",issue:_,canLink:!(n??[]).some((y)=>y.id===_.id)},void 0,!1,void 0,this);if(n===null)return f("div",{class:"lin-dialog-body",children:f(xe,{label:"Finding the issues linked to this session"},void 0,!1,void 0,this)},void 0,!1,void 0,this);return f("div",{class:"lin-dialog-body",children:[f("h2",{class:"lin-dialog-title",children:"Comment on Linear issue"},void 0,!1,void 0,this),i||!r?f(Pc,{linked:n,onPick:(y)=>{s(y),a(!1)}},void 0,!1,void 0,this):f(Te,{children:[f("div",{class:"lin-comment-target",children:[f(Qt,{children:[f(pn,{type:r.state.type,color:r.state.color,teamId:r.team.id,stateId:r.state.id},void 0,!1,void 0,this)," ",f("span",{class:"sui-mono",children:r.identifier},void 0,!1,void 0,this)," ",f("span",{class:"lin-ellipsis",children:r.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),f(de,{label:"Change issue",variant:"ghost",size:"xs",onClick:()=>a(!0)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),f("div",{class:"lin-grow",children:f(dt,{label:"Comment",value:u,onChange:m,multiline:!0,rows:8,placeholder:"Write a comment. Markdown works."},void 0,!1,void 0,this)},void 0,!1,void 0,this),f("div",{class:"lin-form-foot",children:[f(de,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>{w.close()}},void 0,!1,void 0,this),f(de,{label:"Post comment",size:"sm",disabled:!u.trim(),loading:p,onClick:()=>{E()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Uc=(e)=>[...e??[]].sort(Et);var zi=(e,t)=>{let n=Uc(t);return n.find((r)=>r.id===e?.defaultIssueState?.id&&r.type!=="triage")??n.find((r)=>r.type==="backlog")??n.find((r)=>r.type==="unstarted")??null};var Nc={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},Bo=(e)=>{let t=e?Nc[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]};var qi=(e,t)=>e.name.localeCompare(t.name),Lc=(e)=>ge(`team-people:${e}`,async()=>(await H(Cs,{teamId:e})).team),Dc=()=>ge("workspace-labels",async()=>(await H(vs)).issueLabels.nodes.filter((e)=>!e.team).map(({team:e,...t})=>t)),_n=(e)=>me(e?`pickers:${e}`:null,async()=>{let[t,n]=await Promise.all([Lc(e),Dc()]),o=new Set,r=[...t.labels.nodes,...n].filter((s)=>o.has(s.id)?!1:(o.add(s.id),!0)).sort(qi);return{members:t.members.nodes.filter((s)=>s.active).sort(qi),labels:r}}),Xo=(e,t)=>me(e?`open-cycles:${e}`:null,async()=>(await H(Us,{teamId:e,minNumber:t??0})).team.cycles.nodes.filter((o)=>o.isActive||o.isFuture).sort((o,r)=>o.number-r.number));var Wo=({label:e})=>f(Qt,{children:[f("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this);var Yi=({teamId:e,chosen:t,onChange:n,startOpen:o=!1})=>{let[r,s]=C(o),[i,a]=C(""),u=_n(r?e:null),m=new Set(t.map((E)=>E.id)),p=new Map([...u.data?.labels??[],...t].map((E)=>[E.id,E])),h=i.trim().toLowerCase(),_=[...p.values()].filter((E)=>!h||E.name.toLowerCase().includes(h)).sort((E,y)=>Number(m.has(y.id))-Number(m.has(E.id))||E.name.localeCompare(y.name)),l=(E)=>n(m.has(E.id)?t.filter((y)=>y.id!==E.id):[...t,E]);return f("div",{class:"lin-stack lin-stack--tight",children:[f("div",{class:"sui-row",children:[t.map((E)=>f(Wo,{label:E},E.id,!1,void 0,this)),f(de,{label:r?"Done":t.length?"Edit labels":"Add label",variant:"ghost",size:"xs",onClick:()=>s(!r)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),r&&f("div",{class:"lin-label-picker",children:[f(Ze,{value:i,onChange:a,placeholder:"Find a label"},void 0,!1,void 0,this),f("div",{class:"lin-label-list",children:[!u.data&&f("span",{class:"sui-muted sui-small",children:"Loading labels"},void 0,!1,void 0,this),_.map((E)=>f("div",{class:"lin-label-option",children:[f("span",{class:"lin-swatch",style:{background:E.color}},void 0,!1,void 0,this),f(ys,{label:E.name,checked:m.has(E.id),onChange:()=>l(E)},void 0,!1,void 0,this)]},E.id,!0,void 0,this)),u.data&&!_.length&&f("span",{class:"sui-muted sui-small",children:"No label matches."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var le="__none__",Qi=({teamIds:e,projectId:t=null,initial:n,draft:o,onCreated:r,onEscape:s,rows:i=6})=>{let a=sn().data,u=ye(()=>{let v=a?.teams??[],Re=new Set([...e,...a?.myTeamIds??[]]);return[...v.filter((Ke)=>Re.has(Ke.id)),...v.filter((Ke)=>!Re.has(Ke.id))]},[a,e]),[m,p]=C(e[0]??u[0]?.id??""),h=a?.teamsById.get(m),_=ye(()=>[...a?.statesByTeam.get(m)??[]].sort(Et),[a,m]),[l,E]=C(n?.title??""),[y,b]=C(n?.description??""),[g,x]=C({title:!1,description:!1}),[R,U]=C(le),[K,ne]=C("0"),[N,j]=C(le),[oe,z]=C(le),[M,S]=C(le),[T,Ae]=C(t??le),[Ce,Le]=C([]),[tt,nt]=C(!1);te(()=>{if(!o)return;if(!g.title)E(o.title);if(!g.description)b(o.description)},[o]),te(()=>{U(zi(h,_)?.id??_[0]?.id??le),j(le),z(le),S(le),Le([])},[m,_.length]);let fe=_n(m||null),ht=Xo(h?.cyclesEnabled?m:null,h?.activeCycle?.number),B=pt(m?[m]:[]),ot=Bo(h),ae=!tt&&Boolean(l.trim())&&Boolean(m),q=async()=>{if(!ae)return;nt(!0);try{let v=await di({teamId:m,title:l.trim(),...y.trim()?{description:y}:{},...R!==le?{stateId:R}:{},priority:Number(K),...N!==le?{assigneeId:N}:{},...oe!==le?{estimate:Number(oe)}:{},...M!==le?{cycleId:M}:{},...T!==le?{projectId:T}:{},...Ce.length?{labelIds:Ce.map((Re)=>Re.id)}:{}});await ue(w,"success",`Created ${v.identifier}`),r(v)}catch(v){await ue(w,"error",Xe(v)),nt(!1)}},Q=[{id:le,label:"No project"},...t&&!(B.data??[]).some((v)=>v.id===t)?[{id:t,label:"This folder's project"}]:[],...(B.data??[]).map((v)=>({id:v.id,label:v.name}))];return{body:f("div",{onKeyDown:(v)=>{if(v.stopPropagation(),v.key==="Enter"&&(v.metaKey||v.ctrlKey))q();if(v.key==="Escape")s?.()},class:"lin-stack lin-form",children:[f("div",{class:"lin-field-row",children:f(Ge,{value:m,searchable:u.length>8,options:u.map((v)=>({id:v.id,label:v.name,hint:v.key})),onChange:p},void 0,!1,void 0,this)},void 0,!1,void 0,this),f(dt,{value:l,onChange:(v)=>{x((Re)=>({...Re,title:!0})),E(v)},placeholder:"Issue title",label:"Title"},void 0,!1,void 0,this),f("div",{class:"lin-grow",children:f(dt,{value:y,onChange:(v)=>{x((Re)=>({...Re,description:!0})),b(v)},multiline:!0,rows:i,placeholder:"Add a description. Markdown works. Cmd+Enter creates.",label:"Description"},void 0,!1,void 0,this)},void 0,!1,void 0,this),f("div",{class:"lin-field-row",children:[f(Ge,{value:R,options:_.map((v)=>({id:v.id,label:v.name})),onChange:U},void 0,!1,void 0,this),f(Ge,{value:K,options:[0,1,2,3,4].map((v)=>({id:String(v),label:v?Go[v]:"No priority"})),onChange:ne},void 0,!1,void 0,this),f(Ge,{value:N,searchable:!0,options:[{id:le,label:"No assignee"},...(fe.data?.members??[]).map((v)=>({id:v.id,label:v.name}))],onChange:j},void 0,!1,void 0,this),ot.length>0&&f(Ge,{value:oe,options:[{id:le,label:"No estimate"},...ot.map((v)=>({id:String(v),label:cn(v,h?.issueEstimationType)??String(v)}))],onChange:z},void 0,!1,void 0,this),h?.cyclesEnabled&&f(Ge,{value:M,options:[{id:le,label:"No cycle"},...(ht.data??[]).map((v)=>({id:v.id,label:`Cycle ${v.number}`,hint:v.isActive?"Current":"Upcoming"}))],onChange:S},void 0,!1,void 0,this),f(Ge,{value:T,searchable:!0,options:Q,onChange:Ae},void 0,!1,void 0,this)]},void 0,!0,void 0,this),m&&f(Yi,{teamId:m,chosen:Ce,onChange:Le},void 0,!1,void 0,this)]},void 0,!0,void 0,this),submit:()=>{q()},canSubmit:ae,busy:tt}};var Zi=async(e)=>{try{let{text:t}=await w.generate({prompt:e,system:Ui,maxOutputTokens:1500});return ji(t)}catch(t){if(t instanceof k)return Vo(t.code,t.message);return Vo(void 0,t instanceof Error?t.message:"")}};var ea=(e)=>{let[t,n]=C(e?{kind:"working"}:{kind:"idle"}),[o,r]=C(0);return te(()=>{let s=!0;if(!e){n({kind:"idle"});return}return n({kind:"working"}),(async()=>{let i=await e.build().catch(()=>({prompt:null,note:"Could not read what to draft from."}));if(!s)return;if(!i.prompt){n({kind:"nothing",note:i.note??"There is nothing to draft from."});return}let a=await Zi(i.prompt);if(!s)return;n(a.kind==="draft"?{kind:"draft",draft:e.finish(a.draft)}:a)})(),()=>{s=!1}},[e?.key,o]),{state:t,retry:()=>r((s)=>s+1)}};var jc=({state:e,retry:t})=>{if(e.kind==="idle")return null;if(e.kind==="working")return f("div",{class:"lin-draft-note",children:f(xe,{size:"sm",label:"Drafting with the Small Model. You can start typing; your words stay."},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(e.kind==="draft")return f("div",{class:"lin-draft-note sui-muted sui-small",children:"Drafted by the Small Model. Check it before you create the issue."},void 0,!1,void 0,this);if(e.kind==="nothing")return f("div",{class:"lin-draft-note sui-muted sui-small",children:e.note},void 0,!1,void 0,this);if(e.kind==="no-model")return f(Be,{tone:"info",title:"No Small Model is set up",body:"Choose one in OpenChamber's settings to have issues drafted for you. The form is empty for now."},void 0,!1,void 0,this);return f(Be,{tone:"warning",title:"Could not draft the issue",body:`${e.message} The form is empty.`,action:{label:"Try again",onClick:t}},void 0,!1,void 0,this)},Ko=({job:e,scope:t,hidden:n=!1})=>{let{state:o,retry:r}=ea(e),[s,i]=C(null),a=Qi({teamIds:t.teamIds,projectId:t.projectId,...e?.initial?{initial:e.initial}:{},draft:o.kind==="draft"?o.draft:null,onCreated:i,onEscape:()=>{w.close()},rows:8});if(s)return f(fn,{title:"Issue created",issue:s,canLink:!0},void 0,!1,void 0,this);return f("div",{class:"lin-dialog-body",hidden:n,children:[e&&f(Te,{children:[f("h2",{class:"lin-dialog-title",children:"Create Linear issue"},void 0,!1,void 0,this),f("div",{class:"lin-source",children:[f("span",{class:"sui-muted sui-small",children:e.source},void 0,!1,void 0,this),e.quote&&f("span",{class:"lin-quote sui-small",children:e.quote},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),f(jc,{state:o,retry:r},void 0,!1,void 0,this),a.body,f("div",{class:"lin-form-foot",children:[f(de,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>{w.close()}},void 0,!1,void 0,this),f(de,{label:a.busy?"Creating...":"Create issue",size:"sm",disabled:!a.canSubmit,onClick:a.submit},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var ta=({teamIds:e,projectIds:t,activeId:n,teamsOfProject:o})=>{let r=n&&t.includes(n)?n:t.length===1?t[0]:null,s=[],i=(a)=>{if(!s.includes(a))s.push(a)};if(n&&e.includes(n))i(n);if(r)for(let a of o(r))i(a);for(let a of e)i(a);for(let a of t)for(let u of o(a))i(u);return{teamIds:s,projectId:n&&e.includes(n)?null:r}};var Vc=(e)=>{if(!e)return"none";if(!("kind"in e)||!("action"in e))return`chip:${e.id??""}`;return`${e.kind}:${e.action}:${"messageId"in e?e.messageId:("sessionId"in e)?e.sessionId:("path"in e)?`${e.path}`:""}`},Fc=({scope:e,projectIds:t,teamIds:n,hasSession:o})=>{let[r,s]=C(o?"create":"attach");return f("div",{class:"lin-dialog-body",children:[f(gs,{items:[{id:"create",label:"Create issue"},{id:"attach",label:"Attach"}],activeId:r,onChange:(i)=>s(i)},void 0,!1,void 0,this),f(Ko,{job:null,scope:e,hidden:r!=="create"},void 0,!1,void 0,this),r==="attach"&&f(ki,{scope:e,projectIds:t,teamIds:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},na=({ctx:e})=>{let t=sn(),n=ri(e.directory,t.data),o=e.item,r=Vc(o),s=ye(()=>Bi(o,{readFile:(u)=>w.readFile(u).then((m)=>m?.content??null,()=>null),sessionTitle:e.session?.title??null}),[r]);if(t.error&&!t.data){let u=t.error instanceof ce?t.error:new ce("network",String(t.error));if(u.kind==="disconnected")return f("div",{class:"lin-dialog",children:f(Ts,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber, then open this again.",action:{label:"Connect Linear",onClick:()=>{w.oauthStart()}}},void 0,!1,void 0,this)},void 0,!1,void 0,this);return f("div",{class:"lin-dialog",children:f(Be,{tone:"error",title:"Could not load Linear",body:u.message,action:{label:"Retry",onClick:()=>t.refresh()}},void 0,!1,void 0,this)},void 0,!1,void 0,this)}if(!t.data||!n.settled)return f("div",{class:"lin-center",children:f(xe,{label:"Loading Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let i=ta({teamIds:n.detection.teamIds,projectIds:n.detection.projectIds,activeId:n.detection.mapping?.activeProjectId,teamsOfProject:(u)=>en(u)?.teams.nodes.map((m)=>m.id)??[]}),a;if(s)a=f(Ko,{job:s,scope:i},s.key,!1,void 0,this);else if(o&&"kind"in o&&o.kind==="message"&&o.action==="comment-on-issue")a=f(Ki,{item:o,directory:e.directory},r,!1,void 0,this);else if(o&&"providerId"in o)a=f(Ii,{item:o},void 0,!1,void 0,this);else a=f(Fc,{scope:i,projectIds:n.detection.projectIds,teamIds:n.detection.teamIds,hasSession:Boolean(e.session)},void 0,!1,void 0,this);return f("div",{class:"lin-dialog",children:a},void 0,!1,void 0,this)};var Bc=()=>{let e=Es();if(!e)return f("div",{class:"lin-center",children:f(xe,{label:"Loading"},void 0,!1,void 0,this)},void 0,!1,void 0,this);return f(na,{ctx:e},void 0,!1,void 0,this)};ur(f(Bc,{},void 0,!1,void 0,this),document.getElementById("root"));})();

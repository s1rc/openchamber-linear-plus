(()=>{var F,yr,La,Ve,vn,Nt,br,wt,xr,Pn,wn,Da,pt=Symbol.for("pv"),Lt={},Dt=[],$a=/^m(i|n|o|s|text|space)$/,Mn=Array.isArray,Ar=Dt.slice,Ke=Object.assign;function We(e){e&&e.parentNode&&e.remove()}function Pt(e,t,n,o,r){var s={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:pt,__v:r||++yr,__i:-1,__u:0};return!r&&F.vnode&&F.vnode(s),s}function ke(e){return e.children}function Mt(e,t){this.props=e,this.context=t,this.__g=0}function Xe(e,t){if(t==null)return e.__&&Xe(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:Xe(e)}function Ga(e){var t,n=e.__v,o=n.__e,r=[],s=[],i=e.__P;i&&((t=Ke({constructor:pt},n)).__v=n.__v+1,F.vnode&&F.vnode(t),Un(i,t,n,e.__n,i.namespaceURI,32&n.__u?[o]:null,r,o||Xe(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,vr(r,t,s),n.__=n.__e=null,t.__e!=o&&kr(t))}function kr(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),kr(e)}function gr(e){(8&e.__g||(e.__g|=8,Ve.push(e),Nt++))&&vn==F.debounceRendering||((vn=F.debounceRendering)||queueMicrotask)(Rr)}function Rr(){try{for(var e,t=1;Ve.length;)Ve.length>t&&Ve.sort(br),e=Ve.shift(),t=Ve.length,8&e.__g&&Ga(e)}finally{(Nt=Ve.length)&&(vn||queueMicrotask)(Rr)}}function Or(e,t,n,o,r,s,i,a,d,m,f){var E,_,u,h,T,I,b=o.__k||Dt,y=t.length;for(d=Ha(n,t,b,d,y),E=0;E<y;E++)(u=n.__k[E])!=null&&(_=~u.__i&&b[u.__i]||Lt,u.__i=E,I=Un(e,u,_,r,s,i,a,d,m,f),h=u.__e,(_.ref!=u.ref||8&_.__u)&&(_.ref&&Nn(_.ref,null,u,_),u.ref&&f.push(u.ref,u.__c||h,u)),T=T||h,4&u.__u?(d=Ir(u,d,e,!_.__v),_.__e&&(_.__e=null)):typeof u.type=="function"&&I!==void 0?d=I:h&&(d=h.nextSibling),u.__u&=-21);return n.__e=T,d}function Ha(e,t,n,o,r){var s,i,a,d,m,f,E,_,u,h=n.length,T=h,I=0,b=0,y=e.__k=Array(r);for(s=0;s<r;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=y[s]=Pt(null,i):Mn(i)?i=y[s]=Pt(ke,{children:i}):i.constructor===pt&&i.__b?i=y[s]=Pt(i.type,i.props,i.key,i.ref,i.__v):y[s]=i,d=s+I,i.__=e,i.__b=e.__b+1,a=null,~(m=i.__i=Ba(i,n,d,T))&&(T--,(a=n[m])&&(a.__u|=2)),a&&a.__v?(i.__u|=16,m==d-1?I--:m==d+1?I++:m!=d&&(m>d?I--:I++,b=1)):(~m||(r>h?I--:r<h&&I++),typeof i.type!="function"&&(i.__u|=4))):y[s]=null;if(b){for(f=[],E=[],s=0;s<r;s++)if((i=y[s])&&16&i.__u){for(I=0,_=f.length;I<_;)f[u=I+_>>1]<i.__i?I=u+1:_=u;f[I]=i.__i,E[s]=I+1}for(I=f.length;s--;)E[s]&&(E[s]==I?I--:y[s].__u|=4)}if(T)for(s=0;s<h;s++)!(a=n[s])||2&a.__u||(a.__e==o&&(o=Xe(a)),Ln(a,a));return o}function Ir(e,t,n,o){var r,s,i,a;if(typeof e.type=="function"){if(e.props.__P)return t;if(r=e.__k)for(s=0;s<r.length;s++)r[s]&&(r[s].__=e,t=Ir(r[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=Xe(e))&&!t.parentNode&&(t=null),i=e.__e,a=t;a&&a.nodeType==8;)a=a.nextSibling;for(i!=a&&(!o&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Ba(e,t,n,o){var r,{key:s,type:i}=e,a=t[n],d=a&&!(2&a.__u);if(a===null&&s==null||d&&s==a.key&&i==a.type)return n;if(o>(d?1:0)){for(r=n-1;r>=0;r--)if((a=t[r])&&!(2&a.__u)&&s==a.key&&i==a.type)return r;for(r=n+1;r<t.length;r++)if((a=t[r])&&!(2&a.__u)&&s==a.key&&i==a.type)return r}return-1}function Tr(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function vt(e,t,n,o,r){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||Tr(e.style,t);if(n)for(t in n)o&&n[t]==o[t]||Tr(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof o!="function"&&(o=null),(e.__e||(e.__e={}))[t]=n,n&&o||(i=wn[t]||(wn[t]=ja(t)),(e.__a||(e.__a={}))[t]=Pn,s=t!=(t=t.replace(xr,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(a){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function ja(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[wt]==null)t[wt]=Pn++;else if(t[wt]<this.__a[e])return;return n(F.event?F.event(t):t)}}}function Un(e,t,n,o,r,s,i,a,d,m){var f,E,_,u,h,T,I,b,y,O,A,B,te,N,L,q,K,M,S=t.type;if(t.constructor!==pt)return null;128&n.__u&&(d=32&n.__u,f=n.__c.__z)&&(t.__u|=d,E=s=[],f.nodeType==8?a=Ut(f,s):s.push(f),a=s[0]||a),(f=F.__b)&&f(t);e:if(typeof S=="function"){_=i.length;try{if(b=t.props,y=(f=S.prototype)&&f.render,O=(f=S.contextType)&&o[f.__c],A=f?O?O.props.value:f.__:o,(u=n.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(y?t.__c=u=new S(b,A):(t.__c=u=new Mt(b,A),u.constructor=S,u.render=Va),O&&O.sub(u),u.state||(u.state={}),u.__n=o,u.__g|=8,u.__h=[],u.__k=[]),y&&(u.__s||(u.__s=u.state),S.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=Ke({},u.__s)),Ke(u.__s,S.getDerivedStateFromProps(b,u.__s)))),h=u.props,T=u.state,u.__v=t,n.__c){if(b!==h&&y&&!S.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(b,A),t.__v==n.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(b,u.__s,A)===!1){t.__v!=n.__v&&(u.props=b,u.state=u.__s,u.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(g){g&&(g.__=t)}),Dt.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),a=Xe(n);break e}u.componentWillUpdate&&u.componentWillUpdate(b,u.__s,A),y&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(h,T,I)})}else y&&!S.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),y&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=A,u.props=b,u.__P=e,u.__g&=-5,B=F.__r,te=y?25:0;do u.__g&=-9,B&&B(t),f=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++te<25);y&&(Dt.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(o=Ke({},o,u.getChildContext())),y&&n.__c&&u.getSnapshotBeforeUpdate&&(I=u.getSnapshotBeforeUpdate(h,T)),N=f&&f.type===ke&&f.key==null?f.props.children:f,b.__P&&(f=a,r=(e=b.__P).namespaceURI,d=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(g){g&&Ln(g,g)}),n.__k=null),a=n.__k?Xe(n,0):null),a=Or(e,Mn(N)?N:[N],t,n,o,r,s,i,a,d,m),b.__P&&(t.__e=null,a=f),t.__u&=-161,E&&E.some(We),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(g){if(i.length=_,t.__v=null,d||s)if(g&&g.then){if(t.__u|=128|d,s){for(~(K=s.indexOf(a||void 0))||(K=s.length);(M=s[K-1])&&M.nodeType==8;)K--;for(;K<s.length;K++)if(M=s[K])if(s[K]=null,L){if(M==q)break}else{if(M.nodeType!=8)break;M.data.startsWith("$s")&&(q=Ut(L=M))}}if(!L){for(;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;L=a}(f=Ut(L=t.__c.__z||(t.__c.__z=L)))?(t.__e=L,a=f):t.__e=a,a=a&&a.nextSibling}else s&&s.some(We);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),g&&g.then||Cr(t),F.__e(g,t,n)}}else a=t.__e=Fa(n.__e,t,n,o,r,s,i,d,m,e);return(f=F.diffed)&&f(t),a}function Ut(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function Cr(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(Cr))}function vr(e,t,n){for(var o=0;o<n.length;)Nn(n[o++],n[o++],n[o++]);F.__c&&F.__c(t,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(s){s.call(r)})}catch(s){F.__e(s,r.__v)}})}function Fa(e,t,n,o,r,s,i,a,d,m){var f,E,_,u,h,T,I,b,y=n.props||Lt,{props:O,type:A}=t;if(A=="svg"?r="http://www.w3.org/2000/svg":A=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s){for(f=0;f<s.length;f++)if((h=s[f])&&(A?h.localName==A:h.nodeType==3)){e=h,s[f]=null;break}}if(!e){if(b=m.ownerDocument||document,!A)return b.createTextNode(O);e=b.createElementNS(r,A,O.is?O:m),a&&(F.__m&&F.__m(t,s),a=!1),s=null}if(A){if(m=A=="template"&&e.content||e,s=A=="textarea"&&O.defaultValue!=null?null:s&&Ar.call(m.childNodes),!a&&s)for(y={},f=0;f<e.attributes.length;f++)y[(h=e.attributes[f]).name]=h.value;for(f in y)h=y[f],f=="dangerouslySetInnerHTML"?_=h:f=="children"||(f in O)||f=="value"&&("defaultValue"in O)||f=="checked"&&("defaultChecked"in O)||vt(e,f,null,h,r);for(f in O)h=O[f],f=="children"?u=h:f=="dangerouslySetInnerHTML"?E=h:f=="value"?T=h:f=="checked"?I=h:a&&typeof h!="function"||y[f]===h||vt(e,f,h,y[f],r);E?(a||_&&(E.__html==_.__html||E.__html==e.innerHTML)||(e.innerHTML=E.__html),t.__k=[]):(_&&(e.textContent=""),(A=="foreignObject"||r=="http://www.w3.org/1998/Math/MathML"&&$a.test(A))&&(r="http://www.w3.org/1999/xhtml"),Or(m,Mn(u)?u:[u],t,n,o,r,s,i,s?s[0]:n.__k&&Xe(n,0),a,d),s&&s.some(We)),a&&A!="textarea"||(f="value",A=="progress"&&T==null?e.removeAttribute(f):T==null||T===e[f]&&(A!="progress"||T)||vt(e,f,T,y[f],r),f="checked",I!=null&&I!=e[f]&&vt(e,f,I,y[f],r))}else y===O||a&&e.data==O||(e.data=O);return e}function Nn(e,t,n,o){try{typeof e=="function"?t?t.__x=e(t)||1:o&&(o=o.__c||o.__e)&&(t=o.__x)&&(o.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(r){F.__e(r,n)}}function Ln(e,t,n){var o,r,s,i;if(F.unmount&&F.unmount(e),!(o=e.ref)||o.current&&o.current!=e.__e||Nn(o,null,t,e),o=e.__c){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(a){F.__e(a,t)}o.__P=o.__n=null}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&Ln(o[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(o=e.__c)&&(o=o.__z)&&(r=Ut(o,s=[]))&&(o==e.__e&&s.some(We),We(r),We(o)),n||We(e.__e),e.__e=e.__c=e.__=null}function Va(e,t,n){return this.constructor(e,n)}function wr(e,t){var n,o,r,s;F.__&&F.__(e,t),t.nodeType==9&&(t=t.documentElement),o=(n=e&&32&e.__u)?null:t.__k,t.__k=Pt(ke,{children:[e]}),r=[],s=[],Un(t,t.__k,o||Lt,Lt,t.namespaceURI,o?null:t.firstChild?Ar.call(t.childNodes):null,r,o?o.__e:t.firstChild,n,s),vr(r,t.__k,s),t.__k.props.children=null}F={__e:function(e,t,n,o){for(var r,s,i;t=t.__;)if((r=t.__c)&&!(1&r.__g)){r.__g|=4;try{if((i=(s=r.constructor)&&s.getDerivedStateFromError)&&r.setState(s.getDerivedStateFromError(e)),r.componentDidCatch&&(r.componentDidCatch(e,o||{}),i=1),i&&8&r.__g)return void(r.__g|=2)}catch(a){e=a}}throw Nt=0,e}},yr=0,La=function(e){return e!=null&&e.constructor===pt},Mt.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=Ke({},this.state)),typeof e=="function"&&(e=e(Ke({},n),this.props)),e&&(Ke(n,e),this.__v&&(t&&this.__k.push(t),gr(this)))},Mt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),gr(this))},Mt.prototype.render=ke,Ve=[],Nt=0,br=function(e,t){return e.__v.__b-t.__v.__b},wt=Symbol(),xr=/(PointerCapture)$|Capture$/i,Pn=0,wn={},Da=0;var D="openchamber.sdk",G=1;var Dn=`
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
`;function $n(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(o)=>{let r=o.target===e?t:o.target;if(!(r instanceof Element))return;if(!r.hasAttribute("data-oc-scrolling"))r.setAttribute("data-oc-scrolling","");let s=n.get(r);if(s!==void 0)clearTimeout(s);n.set(r,setTimeout(()=>{n.delete(r),r.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Xa=`(${$n.toString()})(document);`;var Gn=128,Hn=65536;var $t=128;var Gt=65536;var Nr=/^[a-z][a-z0-9-]{0,39}$/;var Pr=(e)=>Object(e)===e&&!Array.isArray(e),Bn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),Mr=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Ur=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Lr=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!Pr(n)||!Nr.test(n.id)||!Mr(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Bn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Bn(n,["kind","id","label","value","options","disabled"]))return!1;if(!Ur(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let o=new Set;for(let r of n.options){if(!Pr(r)||!Bn(r,["value","label"])||!Ur(r.value)||!Mr(r.label)||o.has(r.value))return!1;o.add(r.value)}if(!o.has(n.value))return!1}return!0};var Dr=["{id}","{segment}","{segments+}"];var Gl=new Set(Dr);var $r=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Bl=new Set($r);var Ht=20000000,Bt=256;var jn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Gr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var Hr=/^[A-Za-z0-9_-]{1,80}$/;var Br=["left","right","top","bottom"];var jr=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let o=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of o)if(!jr(r,t+1,n))return!1;return!0},Fn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Fn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Fn)}return String(e)===e||Number.isFinite(e)},Vn=(e)=>{try{if(String(e.id)!==e.id||!Hr.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Br.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!jr(e.data)||!Fn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Wn=2000;var Vr=["file","directory","other","missing"],Kn=(e)=>Boolean(e&&"sessionId"in e),zn=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Xr=/^[0-9a-f]{7,64}$/i,qn=(e)=>Xr.test(e),jt=500,Ft=32000,Wr=16000,Kr=128,zr=200,qr=2000,Jr=16000,Yr=80,Qr=200,Zr=16000;var es=2000;var Jn=20000,Vt=1024,Xt=2000000;var Wt=64000,Kt=8000,Yn=4000;var Qn=960000;var ts=999,ns=1e4,ft=500,os=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],rs=["stopped","starting","ready","failed"],Ka=new Set(os),ss=(e)=>Ka.has(e),is=(e)=>e&&ss(e)?e:"HOST_REJECTED",nt=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(nt);if(Object(e)===e)return Object.values(e).every(nt);return!1},as=(e)=>nt(e)&&JSON.stringify(e).length<=Zr,Fr=(e)=>e?.trim().slice(0,Qr)??"",ot=(e)=>{let t=e.id.trim().slice(0,Kr),n=e.title.trim().slice(0,zr),o=e.url.trim().slice(0,qr),r=e.text?.trim().slice(0,Jr),s=e.author?.trim().slice(0,Yr),i=e.kind==="pull"?"pull":"issue",a={providerId:e.providerId.trim(),id:t,title:n||t,url:o,kind:i};if(r)a.text=r;if(s)a.author=s;if(i==="pull"){let d=Fr(e.branches?.head),m=Fr(e.branches?.base);if(d&&m)a.branches={head:d,base:m}}if(as(e.data))a.data=e.data;return a},Zn=(e)=>{let t=ot(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},eo=(e)=>{let t={text:e.text.trim().slice(0,Wr)};if(e.send)t.send=!0;return t},to=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ts,Math.max(0,Math.round(e)))},no=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(ns,Math.max(0,Math.ceil(e)))};var rt=(e)=>e.length>0&&e.length<=Vt&&!e.includes("\x00")&&!e.includes("\\");var zt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>es)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},za=new Set(rs),oo=(e)=>Boolean(e&&"status"in e&&za.has(String(e.status))&&!("body"in e)),qt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),ro=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),so=(e)=>Boolean(e&&"written"in e&&e.written===!0),io=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),qa=new Set(Vr),ao=(e)=>Boolean(e&&"kind"in e&&"size"in e&&qa.has(String(e.kind))&&Number.isFinite(e.size)),co=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Ja=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Ya=(e)=>Object(e)===e?e:null,Xn=(e)=>String(e)===e&&e.length>0,Qa=(e)=>{if(!Xn(e.id))return null;if(e.ok===!0){let t={channel:D,v:G,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Xn(e.error))return{channel:D,v:G,type:"result",id:e.id,ok:!1,error:e.error,code:is(Xn(e.code)?e.code:void 0)};return null},lo=(e)=>{let t=Ya(e);if(!t||t.channel!==D||t.v!==G)return null;if(t.type==="result")return Qa(t);if(!Ja.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var cs=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Za=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class v extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var ls=()=>Promise.reject(new v("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Jt=()=>Promise.reject(new v("BAD_PATH",`File path must be 1 to ${Vt} characters without NUL or backslash.`)),Yt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new v("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},U=(e)=>(e.value+=1,`oc-${e.value}`),uo=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new v("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((c)=>c===t.parent),o=e.requestTimeoutMs??Jn,r=new Set,s=new Set,i=new Set,a=new Set,d=new Set,m=new Set,f=new Set,E=new Set,_=new Set,u=new Set,h=new Set,T=new Set,I=[],b=null,y=null,O=new Set,A=new Set,B=null,te=null,N=!1,L=new Map,q=new Map,K=new Map,M=!1,S={value:0},g=null,Ee=null,Ie=!1,Pe=!1,j=null,ae=(c)=>{if(!c)return null;return{sessionId:c.id,phase:c.busy?"started":"completed"}},me=(c)=>{t.parent.postMessage(c,"*")},et=()=>{if(M||t.parent===t||T.size===0||g?.features?.lateGenerateResults!==!0)return;me({channel:D,v:G,type:"generate-late-listen"})},z=(c,p)=>{for(let C of c)try{C(p)}catch(w){console.error(w)}},ut=(c)=>{if(!(c instanceof MessageEvent))return;if(!n(c.source))return;let p=lo(c.data);if(!p)return;if(p.type==="workspace"){let w=q.get(p.payload.subscriptionId);if(w)z([w],p.payload.snapshot);return}if(p.type==="shells"){let w=K.get(p.payload.subscriptionId);if(w)z([w],p.payload.snapshot);return}if(p.type==="ready"){if(g=p.payload,Ee=ae(p.payload.session),z(r,p.payload),z(s,p.payload.directory),z(i,p.payload.session),Ee)z(a,Ee);if(z(d,p.payload.connection),z(m,p.payload.settings),z(f,p.payload.item),p.payload.block)z(E,p.payload.block);et();return}if(p.type==="service-event"){z(_,p.payload);return}if(p.type==="generate-late"){if(T.size===0)I.push(p.payload);else z(T,p.payload);return}if(p.type==="directory"){if(g)g={...g,directory:p.payload.directory};z(s,p.payload.directory);return}if(p.type==="session"){if(g)g={...g,session:p.payload.session};if(!p.payload.session)Ee=null;else if(Ee?.sessionId!==p.payload.session.id)Ee=ae(p.payload.session);z(i,p.payload.session);return}if(p.type==="session-lifecycle"){Ee=p.payload,z(a,p.payload);return}if(p.type==="connection"){if(g)g={...g,connection:p.payload.connection};z(d,p.payload.connection);return}if(p.type==="settings"){if(g)g={...g,settings:p.payload.settings};z(m,p.payload.settings);return}if(p.type==="item"){if(g)g={...g,item:p.payload.item};z(f,p.payload.item);return}if(p.type==="status-control-event"){z(u,p.payload);return}if(p.type==="popover-closed"){z(h,p.payload);return}if(p.type==="action"){let w=(J)=>{if(!M)me({channel:D,v:G,type:"action-result",id:p.id,payload:J})},Z=y;if(!Z){w({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>Z(p.payload)).then(()=>w({ok:!0}),(J)=>{let ce=(J instanceof Error?J.message:String(J)).trim();w({ok:!1,error:(ce||"Action failed.").slice(0,ft)})});return}if(p.type==="file-open"){let w=p.payload;if(te&&Gr(te,w))return;te=w,z(O,p.payload);return}if(p.type==="file-saved"){z(A,p.payload.version);return}if(p.type==="file-snapshot"){let w=(ce)=>{if(!M)me({channel:D,v:G,type:"file-snapshot-result",id:p.id,payload:ce})},Z=(ce)=>w({error:(ce.trim()||"Could not read the edited file.").slice(0,ft)}),J=B;if(!J){Z("This extension does not edit files.");return}Promise.resolve().then(()=>J(p.payload.purpose)).then((ce)=>{if(jn(ce)>Ht){Z(`The file is over ${Ht} ${"bytes"in ce?"bytes":"characters"}.`);return}if(ce.version.length>Bt){Z(`The snapshot version is over ${Bt} characters.`);return}w({snapshot:"bytes"in ce?{bytes:ce.bytes,version:ce.version}:{content:ce.content,version:ce.version}})},(ce)=>Z(ce instanceof Error?ce.message:String(ce)));return}if(p.type==="resolve"){let w=(J)=>{me({channel:D,v:G,type:"resolve-result",id:p.id,payload:J})},Z=b;if(!Z){w({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>Z(p.payload)).then((J)=>w({item:J?ot(J):null}),(J)=>{let ce=(J instanceof Error?J.message:String(J)).trim();w({error:(ce||"Command failed.").slice(0,ft)})});return}let C=L.get(p.id);if(!C)return;if(clearTimeout(C.timer),L.delete(p.id),p.ok){C.resolve(p.payload);return}C.reject(new v(p.code,p.error))};t.addEventListener("message",ut),me({channel:D,v:G,type:"hello"});let pe=(c,p=o)=>{if(M||t.parent===t)return Promise.reject(new v("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((C,w)=>{let Z=setTimeout(()=>{L.delete(c.id),w(new v("HOST_TIMEOUT","Host did not answer in time."))},p);L.set(c.id,{resolve:C,reject:w,timer:Z}),me(c)})},Q=(c)=>pe(c).then(()=>{return}),ne={channel:D,v:G},Rt=(c)=>{if(!M&&t.parent!==t)me(c)},P=()=>Rt({...ne,type:"file-save"}),Ce=(c)=>{if(!cs(c)||!Za(c))return;c.preventDefault(),P()},tt=(c)=>{if(!cs(c)||c.key!=="Escape"||g?.surface!=="popover"||!g.popover)return;c.preventDefault(),Er(g.popover.id,"escape").catch(()=>{return})},Ot=()=>{let c=g?.surface==="popover"?g.popover:void 0;if(!c)return;let p=Ie||Pe;if(j===p)return;j=p,Sr(c.id,p).catch(()=>{return})},It=()=>{if(g?.surface!=="popover"||Ie)return;Ie=!0,Ot()},mr=(c)=>{if(g?.surface!=="popover"||c.relatedTarget!==null||!Ie)return;Ie=!1,Ot()},_r=()=>{if(g?.surface!=="popover"||Pe)return;Pe=!0,Ot()},hr=()=>{if(g?.surface!=="popover"||!Pe)return;Pe=!1,Ot()},ve=(c,p=1024)=>{if(!c.trim()||c.length>p)throw new v("HOST_REJECTED",`Identity must contain 1 to ${p} characters.`)},In=async(c)=>{if(c.kind!=="projects")ve(c.projectId);let p=await pe({...ne,type:"workspace-read",id:U(S),payload:c});if(!p||!("kind"in p)||!("state"in p)||p.kind!==c.kind)throw new v("HOST_REJECTED","Host did not return workspace data.");return p},Cn=async(c,p)=>{if(c.kind!=="projects")ve(c.projectId);let C=U(S);q.set(C,p);try{await Q({...ne,type:"workspace-subscribe",id:U(S),payload:{subscriptionId:C,query:c}})}catch(w){if(q.delete(C),!M)me({...ne,type:"workspace-unsubscribe",id:U(S),payload:{subscriptionId:C}});throw w}return()=>{if(!q.delete(C)||M)return;me({...ne,type:"workspace-unsubscribe",id:U(S),payload:{subscriptionId:C}})}},Na=async(c,p)=>{if(c.kind==="session")ve(c.sessionId);if(c.kind==="project")ve(c.projectId);let C=U(S);K.set(C,p);try{await Q({...ne,type:"shells-subscribe",id:U(S),payload:{subscriptionId:C,scope:c}})}catch(w){if(K.delete(C),!M)me({...ne,type:"shells-unsubscribe",id:U(S),payload:{subscriptionId:C}});throw w}return()=>{if(!K.delete(C)||M)return;me({...ne,type:"shells-unsubscribe",id:U(S),payload:{subscriptionId:C}})}},Ct=async(c)=>{if("key"in c&&(c.key.length===0||c.key.length>Gn))throw new v("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!nt(c.value))throw new v("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>Hn)throw new v("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&g?.features?.deviceStorage!==!0)throw new v("UNSUPPORTED","This host does not support device storage.");let p=await pe({...ne,type:"storage",id:U(S),payload:c});if(!p||!("storage"in p)||p.op!==c.op)throw new v("HOST_REJECTED","Host did not return storage data.");return p},Er=(c,p)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===c)?Promise.reject(new v("UNSUPPORTED","This host does not support popovers.")):Q({...ne,type:"popover-close",id:U(S),payload:p?{id:c,reason:p}:{id:c}}),Sr=(c,p)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===c)?Promise.reject(new v("UNSUPPORTED","This host does not support popovers.")):Q({...ne,type:"popover-anchor",id:U(S),payload:{id:c,active:p}});return t.addEventListener("keydown",tt,!0),t.addEventListener("pointerover",It),t.addEventListener("pointermove",It),t.addEventListener("pointerout",mr),t.addEventListener("focus",_r),t.addEventListener("blur",hr),{onAction:(c)=>(y=c,()=>{if(y===c)y=null}),listProjects:async()=>{let c=await In({kind:"projects"});if(c.kind!=="projects")throw new v("HOST_REJECTED","Expected projects.");return c},listWorktrees:async(c)=>{let p=await In({kind:"worktrees",projectId:c});if(p.kind!=="worktrees")throw new v("HOST_REJECTED","Expected worktrees.");return p},listSessions:async(c)=>{let p=await In({kind:"sessions",projectId:c});if(p.kind!=="sessions")throw new v("HOST_REJECTED","Expected sessions.");return p},onProjects:(c)=>Cn({kind:"projects"},(p)=>{if(p.kind==="projects")c(p)}),onWorktrees:(c,p)=>Cn({kind:"worktrees",projectId:c},(C)=>{if(C.kind==="worktrees")p(C)}),onSessions:(c,p)=>Cn({kind:"sessions",projectId:c},(C)=>{if(C.kind==="sessions")p(C)}),onRunningShells:(c,p)=>Na(c,p),readShellOutput:async(c,p)=>{ve(c,$t);let C=p?.cursor;if(C!==void 0&&(!Number.isInteger(C)||C<0))throw new v("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let w=p?.tailBytes;if(w!==void 0&&(!Number.isInteger(w)||w<1||w>Gt))throw new v("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Gt}.`);let J=await pe({...ne,type:"shell-output",id:U(S),payload:{shellId:c,cursor:C,tailBytes:w}});if(!J||typeof J.output!=="string"||!Number.isFinite(J.cursor))throw new v("HOST_REJECTED","Host did not return shell output.");return J},stopShell:async(c)=>{if(ve(c,$t),(await pe({...ne,type:"shell-stop",id:U(S),payload:{shellId:c}}))?.stopped!==!0)throw new v("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(c)=>{ve(c),await Q({...ne,type:"open-session",id:U(S),payload:{sessionId:c}})},storage:{get:async(c,p)=>{let C=Yt(p),w={op:"get",key:c};if(C)w.scope=C;let Z=await Ct(w);return Z.op==="get"&&Z.found?Z.value:void 0},set:async(c,p,C)=>{let w=Yt(C),Z={op:"set",key:c,value:p};if(w)Z.scope=w;await Ct(Z)},delete:async(c,p)=>{let C=Yt(p),w={op:"delete",key:c};if(C)w.scope=C;await Ct(w)},keys:async(c)=>{let p=Yt(c),C={op:"keys"};if(p)C.scope=p;let w=await Ct(C);if(w.op!=="keys")throw new v("HOST_REJECTED","Expected storage keys.");return w.keys}},onReady:(c)=>{if(r.add(c),g)c(g);return()=>{r.delete(c)}},onDirectory:(c)=>{if(s.add(c),g)c(g.directory);return()=>{s.delete(c)}},onSession:(c)=>{if(i.add(c),g)c(g.session);return()=>{i.delete(c)}},onSessionLifecycle:(c)=>{if(a.add(c),Ee)c(Ee);return()=>{a.delete(c)}},onConnection:(c)=>{if(d.add(c),g)c(g.connection);return()=>{d.delete(c)}},onSettings:(c)=>{if(m.add(c),g)c(g.settings);return()=>{m.delete(c)}},onItem:(c)=>{if(f.add(c),g)c(g.item);return()=>{f.delete(c)}},onBlock:(c)=>{if(E.add(c),g?.block)c(g.block);return()=>{E.delete(c)}},onServiceEvent:(c)=>(_.add(c),()=>{_.delete(c)}),onStatusControl:(c)=>(u.add(c),()=>{u.delete(c)}),onPopoverClosed:(c)=>(h.add(c),()=>{h.delete(c)}),setStatusControls:(c)=>{if(g?.features?.statusControls!==!0)return Promise.reject(new v("UNSUPPORTED","This host does not support status controls."));if(!Lr(c))return Promise.reject(new v("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Q({...ne,type:"status-controls",id:U(S),payload:{controls:c}})},openPopover:(c)=>{if(g?.features?.popovers!==!0)return Promise.reject(new v("UNSUPPORTED","This host does not support popovers."));if(!Vn(c))return Promise.reject(new v("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Q({...ne,type:"popover-open",id:U(S),payload:c})},closePopover:Er,setPopoverAnchorActive:Sr,onResolve:(c)=>(b=c,()=>{if(b===c)b=null}),toast:(c)=>{let p=c.message.trim();if(!p||p.length>jt)return Promise.reject(new v("HOST_REJECTED",`Toast message must contain 1 to ${jt} characters.`));if(c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>Ft))return Promise.reject(new v("HOST_REJECTED",`Toast copy text must contain 1 to ${Ft} characters.`));return Q({channel:D,v:G,type:"toast",id:U(S),payload:{...c,message:p}})},openUrl:(c)=>Q({channel:D,v:G,type:"open-url",id:U(S),payload:{url:c}}),openCommit:(c)=>qn(c)?Q({channel:D,v:G,type:"open-commit",id:U(S),payload:{sha:c}}):Promise.reject(new v("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(c)=>Q({channel:D,v:G,type:"block-answer",id:U(S),payload:{text:c.trim().slice(0,Wn)}}),openSurface:(c)=>Q({channel:D,v:G,type:"open-surface",id:U(S),payload:{surfaceId:c}}),writeClipboard:(c)=>Q({channel:D,v:G,type:"clipboard-write",id:U(S),payload:{text:c}}),compose:(c)=>Q({channel:D,v:G,type:"compose",id:U(S),payload:c}),attach:(c)=>Q({channel:D,v:G,type:"attach",id:U(S),payload:ot(c)}),startSession:async(c)=>{if(c.projectId!==void 0)ve(c.projectId);let p=c.worktree;if(p&&p!==!0)if(p.kind==="existing")ve(p.directory);else{if(p.name!==void 0)ve(p.name,200);if(p.baseBranch!==void 0)ve(p.baseBranch,200)}let C=await pe({channel:D,v:G,type:"start-session",id:U(S),payload:Zn(c)},e.requestTimeoutMs??180000);if(!Kn(C))throw new v("HOST_REJECTED","Host did not return a session.");return C},prompt:(c)=>pe({channel:D,v:G,type:"prompt",id:U(S),payload:eo(c)}).then((p)=>{if(!zn(p))throw new v("HOST_REJECTED","Host did not return a prompt result.");return p}),sessionLink:(c)=>Q({channel:D,v:G,type:"session-link",id:U(S),payload:ot(c)}),close:()=>Q({channel:D,v:G,type:"close",id:U(S)}),oauthStart:()=>Q({channel:D,v:G,type:"oauth-start",id:U(S)}),oauthDisconnect:()=>Q({channel:D,v:G,type:"oauth-disconnect",id:U(S)}),request:(c)=>(zt(c.path)?pe({channel:D,v:G,type:"request",id:U(S),payload:c}):ls()).then((p)=>{if(!qt(p))throw new v("HOST_REJECTED","Host request result was empty.");return p}),serviceRequest:(c)=>(zt(c.path)?pe({channel:D,v:G,type:"service-request",id:U(S),payload:c}):ls()).then((p)=>{if(!qt(p))throw new v("HOST_REJECTED","Host service request result was empty.");return p}),serviceStatus:()=>pe({channel:D,v:G,type:"service-status",id:U(S)}).then((c)=>{if(!oo(c))throw new v("HOST_REJECTED","Host did not return service status.");return c}),readFile:(c)=>(rt(c)?pe({channel:D,v:G,type:"file-read",id:U(S),payload:{path:c}}):Jt()).then((p)=>{if(!ro(p))throw new v("HOST_REJECTED","Host did not return file content.");return p}),writeFile:(c,p)=>{if(!rt(c))return Jt();if(p.length>Xt)return Promise.reject(new v("FILE_TOO_LARGE",`Content is over ${Xt} characters.`));return pe({channel:D,v:G,type:"file-write",id:U(S),payload:{path:c,content:p}}).then((C)=>{if(!so(C))throw new v("HOST_REJECTED","Host did not confirm the write.");return C})},listDir:(c)=>(rt(c)?pe({channel:D,v:G,type:"file-list",id:U(S),payload:{path:c}}):Jt()).then((p)=>{if(!io(p))throw new v("HOST_REJECTED","Host did not return directory entries.");return p}),stat:(c)=>(rt(c)?pe({channel:D,v:G,type:"file-stat",id:U(S),payload:{path:c}}):Jt()).then((p)=>{if(!ao(p))throw new v("HOST_REJECTED","Host did not return file status.");return p}),generate:(c)=>{let p=c.prompt.trim(),C=c.system?.trim();if(p.length===0||p.length>Wt)return Promise.reject(new v("HOST_REJECTED",`Prompt must be 1 to ${Wt} characters.`));if(C!==void 0&&(C.length===0||C.length>Kt))return Promise.reject(new v("HOST_REJECTED",`System prompt must be 1 to ${Kt} characters.`));let w=c.maxOutputTokens===void 0?void 0:Math.min(Yn,Math.max(1,Math.floor(c.maxOutputTokens)));if(w!==void 0&&!Number.isFinite(w))return Promise.reject(new v("HOST_REJECTED","maxOutputTokens must be a number."));let Z={prompt:p};if(C!==void 0)Z.system=C;if(w!==void 0)Z.maxOutputTokens=w;return pe({channel:D,v:G,type:"generate",id:U(S),payload:Z},e.requestTimeoutMs??Qn).then((J)=>{if(!co(J))throw new v("HOST_REJECTED","Host did not return generated text.");return J})},onLateGenerateResult:(c)=>{T.add(c);for(let p of I.splice(0))z([c],p);return et(),()=>{T.delete(c)}},setBadge:(c)=>Q({channel:D,v:G,type:"badge",id:U(S),payload:{count:to(c)}}),setHeight:(c)=>Q({channel:D,v:G,type:"resize",id:U(S),payload:{height:no(c)}}),onFileOpen:(c)=>{if(O.add(c),!N)N=!0,t.addEventListener("keydown",Ce,!0);if(te)c(te);return()=>{O.delete(c)}},onFileSnapshot:(c)=>(B=c,()=>{if(B===c)B=null}),onFileSaved:(c)=>(A.add(c),()=>{A.delete(c)}),reportFileChange:(c)=>Rt({...ne,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:P,reportFileUnsupported:()=>Rt({...ne,type:"file-unsupported"}),dispose:()=>{for(let c of q.keys())me({...ne,type:"workspace-unsubscribe",id:U(S),payload:{subscriptionId:c}});q.clear();for(let c of K.keys())me({...ne,type:"shells-unsubscribe",id:U(S),payload:{subscriptionId:c}});if(K.clear(),M=!0,b=null,y=null,B=null,O.clear(),A.clear(),N)t.removeEventListener("keydown",Ce,!0);t.removeEventListener("message",ut),t.removeEventListener("keydown",tt,!0),t.removeEventListener("pointerover",It),t.removeEventListener("pointermove",It),t.removeEventListener("pointerout",mr),t.removeEventListener("focus",_r),t.removeEventListener("blur",hr);for(let c of L.values())clearTimeout(c.timer),c.reject(new v("HOST_UNAVAILABLE","Host client was disposed."));L.clear(),r.clear(),s.clear(),i.clear(),a.clear(),d.clear(),m.clear(),f.clear(),E.clear(),_.clear(),u.clear(),h.clear(),T.clear(),I.length=0}}};var ds=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var nd=new Set(ds);var us=["none","agent","user"];var rd=new Set(us);var ec=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],tc=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ps=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,o]of ec)t.style.setProperty(n,e.tokens[o]);for(let[n,o,r]of tc){let s=e.tokens[r]??"";t.style.setProperty(n,s),t.style.setProperty(o,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},po=(e,t)=>{if(ps(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var nc={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},ee=(e,t)=>`var(--${e}, var(--oc-${nc[e]}, ${t}))`,De=ee("surface-background","transparent"),Zt=ee("surface-elevated","transparent"),st=ee("surface-elevated-foreground","inherit"),be=ee("surface-foreground","inherit"),oe=ee("surface-muted-foreground","gray"),oc=ee("surface-muted","transparent"),ze=ee("interactive-border","currentColor"),ge=ee("interactive-hover","transparent"),qe=ee("interactive-active","transparent"),fo=ee("interactive-selection","transparent"),mo=ee("interactive-selection-foreground","inherit"),Le=ee("primary","currentColor"),_o=ee("primary-text","inherit"),ho=ee("error-text","inherit"),rc=ee("font-sans","inherit"),Eo=ee("font-mono","monospace"),hs=ee("radius","9px"),So=`calc(${hs} - 2px)`,fs=`calc(${hs} - 4px)`,re=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,ms=`background-image: linear-gradient(${ge}, ${ge});`,go=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,To="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",_s="box-shadow: var(--oc-sdk-lit);",yo=`inset 0 0.5px 0 0 ${re(be,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,sc=`
:root {
  --oc-sdk-edge: ${re(be,16)};
  --oc-sdk-field-bg: ${Zt};
  --oc-sdk-raised-bg: ${De};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${re(be,14)};
  --oc-sdk-field-bg: ${re(De,50,Zt)};
  --oc-sdk-raised-bg: ${Zt};
  --oc-sdk-field-lift: ${yo};
  --oc-sdk-raised-lift: ${yo};
  --oc-sdk-lit: ${yo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Qt=(e)=>{let t=ee(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${ee(`${e}-text`,"inherit")}; }`},ic=`
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
`,Es=`${sc}
.oc-sdk { color: ${be}; font-family: ${rc}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ms} }
.oc-sdk-mono { font-family: ${Eo}; }
.oc-sdk-muted { color: ${oe}; }
${Qt("success")}${Qt("warning")}${Qt("error")}${Qt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Le}; --oc-sdk-tone-text: ${_o}; }

.oc-sdk-btn { border-radius: ${So}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${fs}; }
.oc-sdk-btn[data-variant="default"] { color: ${_o}; background: ${re(Le,10,De)}; border-color: ${re(Le,12)}; ${_s} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${re(Le,16,De)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${re(Le,22,De)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${oc}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${ge}, ${ge}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${qe}, ${qe}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${st}; ${To} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${ge}, ${ge}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${qe}, ${qe}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${ge}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${qe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${ee("status-error","red")}; color: ${ho}; background: ${re("var(--oc-sdk-tone)",7,De)}; border-color: ${re("var(--oc-sdk-tone)",12)}; ${_s} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${re("var(--oc-sdk-tone)",9,De)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${re("var(--oc-sdk-tone)",11,De)}; box-shadow: none; }

.oc-sdk-field-note { color: ${oe}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${ho}; }
.oc-sdk-input { border-radius: ${So}; background: var(--oc-sdk-field-bg); color: ${st}; ${go("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${oe}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${ge}, ${ge}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${go(re(be,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${go(ee("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Eo}; }

.oc-sdk-search-icon { color: ${oe}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Le}; }
.oc-sdk-search-clear { border-radius: ${fs}; color: ${oe}; }
.oc-sdk-search-clear:hover { background: ${ge}; color: ${be}; }

.oc-sdk-trigger { border-radius: ${So}; background: var(--oc-sdk-raised-bg); color: ${st}; ${To} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${ge}, ${ge}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${qe}, ${qe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${oe}; }
.oc-sdk-trigger-chevron { color: ${oe}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${st}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Zt}; background-clip: padding-box; color: ${st}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${ge}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${fo}; color: ${mo}; }
.oc-sdk-option-check { color: ${be}; }
.oc-sdk-option[data-destructive="true"] { color: ${ho}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${re(ee("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${oe}; }
.oc-sdk-popup-empty { color: ${oe}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${ze}; border-radius: 4px; color: ${be}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${re(be,60,ze)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${ze}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${De}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Le}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ms} }
.oc-sdk-check-desc { color: ${oe}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${re(be,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${oe}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${be}; }
.oc-sdk-tab[aria-selected="true"] { color: ${mo}; background: ${fo}; border-color: ${ze}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${st}; background: var(--oc-sdk-raised-bg); ${To} }
.oc-sdk-tab-count { color: ${oe}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${re(be,6)}; color: ${oe}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${re("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${ge}; }
.oc-sdk-row[aria-selected="true"] { background: ${fo}; color: ${mo}; }
.oc-sdk-row-lead { font-family: ${Eo}; color: ${oe}; }
.oc-sdk-row-sub { color: ${oe}; }
.oc-sdk-row-meta { color: ${oe}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${oe}; }

.oc-sdk-empty-body { color: ${oe}; }

.oc-sdk-spinner { color: ${oe}; }
.oc-sdk-spinner-ring { border-color: ${ze}; border-top-color: ${Le}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${re("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${oe}; }

.oc-sdk-separator { color: ${oe}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${re(ze,40)}; }

.oc-sdk-progress-label { color: ${oe}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${re(be,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Le}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${ee("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${ee("success-text","inherit")}; }

.oc-sdk-text a { color: ${_o}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${re(ze,60)}; }
`,V=`
${Dn}
${ic}
${Es}`;var Ss="oc-sdk-ui-style",$e=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},X=(e)=>{let t=document.getElementById(Ss);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}$n(document);let n=document.createElement("style");n.id=Ss,n.textContent=e,document.head.appendChild(n)},k=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},Te=(e)=>{let t=k("button",e);return t.type="button",t},Y=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},xe=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},gs=(e,t)=>{let n=(o)=>{if(o.target instanceof Node&&e.contains(o.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var ac=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ge=(e,t)=>{X(V);let n=t,o=Te("oc-sdk oc-sdk-btn"),r=ac(),s=document.createElement("span");o.append(s),e.append(o);let i=()=>{if(o.dataset.variant=n.variant??"default",o.dataset.size=n.size??"default",o.disabled=Boolean(n.disabled)||Boolean(n.loading),o.dataset.loading=n.loading?"true":"false",o.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&r.parentNode!==o)o.prepend(r);else if(!n.loading&&r.parentNode===o)r.remove();Y(s,n.label)},a=()=>{if(n.disabled||n.loading)return;n.onClick()};return o.addEventListener("click",a),i(),{update:(d)=>{n={...n,...d},i()},dispose:()=>{o.removeEventListener("click",a),o.remove()}}};var bo=(e,t)=>{X(V);let n=t,o=k("label","oc-sdk oc-sdk-field"),r=k("span","oc-sdk-field-label"),s=n.multiline?k("textarea","oc-sdk-input"):k("input","oc-sdk-input"),i=k("span","oc-sdk-field-note");o.append(r,s,i),e.append(o);let a=()=>{if(Y(r,n.label),r.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),xe(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let m=Boolean(n.error);o.dataset.invalid=m?"true":"false",s.setAttribute("aria-invalid",m?"true":"false");let f=n.error??n.helper??"";Y(i,f),i.hidden=f===""},d=()=>{n.onChange(s.value)};return s.addEventListener("input",d),a(),{update:(m)=>{n={...n,...m},a()},dispose:()=>{s.removeEventListener("input",d),o.remove()}}};var cc={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},we=(e,t,n)=>{let o=document.createElementNS("http://www.w3.org/2000/svg","svg");if(o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("fill","currentColor"),n)o.setAttribute("class",n);let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",cc[e]),o.append(r),o};var xo=(e,t)=>{X(V);let n=t,o=k("div","oc-sdk oc-sdk-search"),r=k("input","oc-sdk-input");r.type="text",r.spellcheck=!1,r.autocomplete="off",r.setAttribute("role","searchbox");let s=Te("oc-sdk-search-clear");s.append(we("close",14)),s.tabIndex=-1,o.append(we("search",16,"oc-sdk-search-icon"),r,s),e.append(o);let i=()=>{let f=n.placeholder??"Search";if(xe(r,"placeholder",f),r.setAttribute("aria-label",n.label??f),s.setAttribute("aria-label","Clear search"),r.value!==n.value)r.value=n.value;o.dataset.active=n.value.trim()===""?"false":"true"},a=()=>{if(n.value!=="")n.onChange("");r.focus()},d=()=>{n.onChange(r.value)},m=(f)=>{if(f.key==="Escape"&&r.value!=="")f.preventDefault(),a()};if(r.addEventListener("input",d),r.addEventListener("keydown",m),s.addEventListener("click",a),i(),n.autofocus)r.focus();return{update:(f)=>{n={...n,...f},i()},dispose:()=>{r.removeEventListener("input",d),r.removeEventListener("keydown",m),s.removeEventListener("click",a),o.remove()}}};var Me=(e,t="vertical")=>{let[n,o]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===o||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},He=(e,t,n)=>{let o=e.filter((d)=>!d.disabled);if(o.length===0)return null;let r=o[0],s=o[o.length-1];if(n==="first"||!r||!s)return r?.id??null;if(n==="last")return s.id;let i=o.findIndex((d)=>d.id===t);if(i===-1)return n==="next"?r.id:s.id;return o[Math.min(o.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var Ts=(e,t)=>`${e}-${t??""}`,en=(e,t,n,o)=>{let r=Te("oc-sdk-option");if(r.id=Ts(e,n.id),r.setAttribute("role",t),r.tabIndex=-1,r.disabled=Boolean(n.disabled),t==="option")r.setAttribute("aria-selected",n.selected?"true":"false");r.dataset.destructive=n.destructive?"true":"false";let s=k("span","oc-sdk-option-label");if(s.textContent=n.label,r.append(s),n.hint){let i=k("span","oc-sdk-option-hint");i.textContent=n.hint,r.append(i)}if(t==="option"){r.dataset.mark="check";let i=k("span","oc-sdk-option-check");i.append(we("check",14)),r.append(i)}return r.addEventListener("pointerenter",o.hover),r.addEventListener("click",o.pick),r},tn=(e,t,n,o)=>{let r=Ts(n,o);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===r?"true":"false";xe(t,"aria-activedescendant",o?r:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var lc=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let o=e.offsetHeight,r=window.innerHeight-n.bottom-8;if(o>r&&n.top-8>r)e.style.top=`${Math.max(8,Math.round(n.top-4-o))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},nn=(e,t,n,o)=>{e.append(n),lc(n,t);let r=gs(e,o),s=()=>{o()},i=(a)=>{if(a.target instanceof Node&&n.contains(a.target))return;o()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{r(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var ys=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((o)=>o.label.toLowerCase().includes(n)||o.id.toLowerCase().includes(n))},dc=0,on=(e,t)=>{X(V);let n=t,o=`oc-sdk-select-${dc+=1}`,r=k("div","oc-sdk oc-sdk-select"),s=k("span","oc-sdk-field-label");s.id=`${o}-label`;let i=Te("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let a=k("span","oc-sdk-trigger-value");i.append(a,we("chevron",14,"oc-sdk-trigger-chevron")),r.append(s,i),e.append(r);let d="",m=null,f=null,E=k("div","oc-sdk oc-sdk-popup"),_=k("div","oc-sdk-popup-search"),u=k("input","oc-sdk-input");u.type="text",u.autocomplete="off",_.append(u);let h=k("div");h.setAttribute("role","listbox"),h.tabIndex=-1,E.append(h);let T=()=>ys(n.options,n.searchable?d:""),I=()=>n.searchable?u:h,b=(S)=>{m=S,tn(h,I(),o,S)},y=()=>{$e(h);let S=T();if(S.length===0){let g=k("div","oc-sdk-popup-empty");g.textContent="No matches",h.append(g)}for(let g of S)h.append(en(o,"option",{...g,selected:g.id===n.value},{hover:()=>b(g.id),pick:()=>B(g.id)}));b(S.some((g)=>g.id===m)?m:S[0]?.id??null)},O=()=>{let S=f;f=null,S?.(),d="",u.value="",i.setAttribute("aria-expanded","false")},A=()=>{if(f||n.disabled)return;if(m=n.value,u.placeholder=n.searchPlaceholder??"Search",n.searchable)E.prepend(_);else _.remove();y(),f=nn(r,i,E,O),i.setAttribute("aria-expanded","true"),I().focus()},B=(S)=>{if(O(),i.focus(),S!==n.value)n.onChange(S)},te=()=>{if(f)O();else A()},N=(S)=>{if(!f&&Me(S))S.preventDefault(),A()},L=(S)=>{let g=Me(S);if(g)S.preventDefault(),b(He(T(),m,g));else if(S.key==="Enter"){if(S.preventDefault(),m)B(m)}else if(S.key==="Escape")S.preventDefault(),O(),i.focus();else if(n.searchable&&S.target!==u&&S.key.length===1&&!S.ctrlKey&&!S.metaKey)u.focus()},q=()=>{d=u.value,y()},K=(S)=>{if(f&&!(S.relatedTarget instanceof Node&&r.contains(S.relatedTarget)))O()},M=()=>{Y(s,n.label),s.hidden=!n.label;let S=n.options.find((g)=>g.id===n.value);if(Y(a,S?.label??n.placeholder??"Select"),a.dataset.empty=S?"false":"true",i.disabled=Boolean(n.disabled),f)y()};return i.addEventListener("click",te),i.addEventListener("keydown",N),E.addEventListener("keydown",L),u.addEventListener("input",q),r.addEventListener("focusout",K),M(),{update:(S)=>{n={...n,...S},M()},dispose:()=>{O(),i.removeEventListener("click",te),i.removeEventListener("keydown",N),E.removeEventListener("keydown",L),u.removeEventListener("input",q),r.removeEventListener("focusout",K),r.remove()}}};var bs=(e,t,n)=>{X(V);let o=t,r=Te("oc-sdk oc-sdk-check");r.setAttribute("role",n);let s=k("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(we("check",12));let i=k("span","oc-sdk-check-text"),a=k("span","oc-sdk-check-label"),d=k("span","oc-sdk-check-desc");i.append(a,d),r.append(s,i),e.append(r);let m=()=>{r.setAttribute("aria-checked",o.checked?"true":"false"),r.disabled=Boolean(o.disabled),Y(a,o.label),Y(d,o.description),d.hidden=!o.description},f=()=>{if(!o.disabled)o.onChange(!o.checked)};return r.addEventListener("click",f),m(),{update:(E)=>{o={...o,...E},m()},dispose:()=>{r.removeEventListener("click",f),r.remove()}}},Ao=(e,t)=>bs(e,t,"checkbox"),rn=(e,t)=>bs(e,t,"switch");var ko=(e,t)=>{X(V);let n=t,o=k("div","oc-sdk oc-sdk-tabs");o.setAttribute("role","tablist"),e.append(o);let r=()=>{$e(o),o.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let a=Te("oc-sdk-tab");a.setAttribute("role","tab");let d=i.id===n.activeId;a.setAttribute("aria-selected",d?"true":"false"),a.tabIndex=d?0:-1,a.dataset.id=i.id;let m=k("span");if(m.textContent=i.label,a.append(m),i.count!==void 0){let f=k("span","oc-sdk-tab-count");f.textContent=String(i.count),a.append(f)}a.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),o.append(a)}},s=(i)=>{let a=Me(i,"horizontal");if(!a)return;let d=He(n.items,n.activeId,a);if(d&&d!==n.activeId){i.preventDefault(),n.onChange(d);let m=o.querySelector(`[data-id="${CSS.escape(d)}"]`);if(m instanceof HTMLElement)m.focus()}};return o.addEventListener("keydown",s),r(),{update:(i)=>{n={...n,...i},r()},dispose:()=>{o.removeEventListener("keydown",s),o.remove()}}};var mt=(e,t)=>{xe(e,"data-tone",t&&t!=="neutral"?t:null)},Ro=(e,t)=>{X(V);let n=t,o=k("span","oc-sdk oc-sdk-badge");e.append(o);let r=()=>{Y(o,n.label),mt(o,n.tone)};return r(),{update:(s)=>{n={...n,...s},r()},dispose:()=>{o.remove()}}};var uc=0,Oo=(e,t)=>{X(V);let n=t,o=`oc-sdk-list-${uc+=1}`,r=k("div","oc-sdk oc-sdk-list");r.setAttribute("role","listbox"),r.tabIndex=0,e.append(r);let s=null,i=(E)=>`${o}-${E}`,a=(E)=>{s=E;for(let _ of Array.from(r.children))if(_ instanceof HTMLElement)_.dataset.active=_.id===i(E??"")?"true":"false";xe(r,"aria-activedescendant",E?i(E):null),r.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},d=(E,_)=>{let u=k("span",E);return u.textContent=_,u},m=()=>{if($e(r),xe(r,"aria-label",n.ariaLabel),n.items.length===0){r.append(d("oc-sdk-list-empty",n.emptyText??"Nothing here")),a(null);return}for(let _ of n.items){let u=Te("oc-sdk-row");if(u.id=i(_.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",_.id===n.selectedId?"true":"false"),u.disabled=Boolean(_.disabled),u.tabIndex=-1,_.leading)u.append(d("oc-sdk-row-lead",_.leading));let h=k("span","oc-sdk-row-main");if(h.append(d("oc-sdk-row-title",_.title)),_.subtitle)h.append(d("oc-sdk-row-sub",_.subtitle));if(u.append(h),_.badge){let T=d("oc-sdk-badge",_.badge.label);mt(T,_.badge.tone),u.append(T)}if(_.meta)u.append(d("oc-sdk-row-meta",_.meta));u.addEventListener("click",()=>n.onSelect(_.id)),r.append(u)}let E=n.items.some((_)=>_.id===s&&!_.disabled);a(E?s:n.selectedId??null)},f=(E)=>{let _=Me(E);if(_){E.preventDefault(),a(He(n.items,s,_));return}if((E.key==="Enter"||E.key===" ")&&s)E.preventDefault(),n.onSelect(s)};return r.addEventListener("keydown",f),m(),{update:(E)=>{n={...n,...E},m()},dispose:()=>{r.removeEventListener("keydown",f),r.remove()}}};var Io=(e,t)=>{X(V);let n=t,o=k("div","oc-sdk oc-sdk-empty"),r=k("h2","oc-sdk-empty-title"),s=k("p","oc-sdk-empty-body"),i=k("div","oc-sdk-empty-action");o.append(r,s,i),e.append(o);let a=null,d=()=>{if(Y(r,n.title),Y(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){a?.dispose(),a=null;return}let m={label:n.action.label,onClick:n.action.onClick};if(a)a.update(m);else a=Ge(i,{...m,variant:"outline",size:"sm"})};return d(),{update:(m)=>{n={...n,...m},d()},dispose:()=>{a?.dispose(),a=null,o.remove()}}};var Co=(e,t={})=>{X(V);let n=t,o=k("span","oc-sdk oc-sdk-spinner");o.setAttribute("role","status");let r=k("span","oc-sdk-spinner-ring");r.setAttribute("aria-hidden","true");let s=k("span");o.append(r,s),e.append(o);let i=()=>{o.dataset.size=n.size??"default",Y(s,n.label),s.hidden=!n.label,o.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(a)=>{n={...n,...a},i()},dispose:()=>{o.remove()}}};var vo=(e,t)=>{X(V);let n=t,o=k("div","oc-sdk oc-sdk-banner"),r=k("div","oc-sdk-banner-text"),s=k("div","oc-sdk-banner-title"),i=k("div","oc-sdk-banner-body"),a=k("div","oc-sdk-banner-action");r.append(s,i),o.append(r,a),e.append(o);let d=null,m=()=>{if(o.dataset.tone=n.tone,o.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),Y(s,n.title),Y(i,n.body),i.hidden=!n.body,a.hidden=!n.action,!n.action){d?.dispose(),d=null;return}let f={label:n.action.label,onClick:n.action.onClick};if(d)d.update(f);else d=Ge(a,{...f,variant:"outline",size:"xs"})};return m(),{update:(f)=>{n={...n,...f},m()},dispose:()=>{d?.dispose(),d=null,o.remove()}}};var pc=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,wo=(e,t)=>{X(V);let n=t,o=k("div","oc-sdk oc-sdk-progress"),r=k("div","oc-sdk-progress-label"),s=k("span"),i=k("span","oc-sdk-progress-value"),a=k("span"),d=we("check",14);i.append(d,a),r.append(s,i);let m=k("div","oc-sdk-progress-track");m.setAttribute("role","progressbar"),m.setAttribute("aria-valuemin","0"),m.setAttribute("aria-valuemax","100");let f=k("div","oc-sdk-progress-fill");m.append(f),o.append(r,m),e.append(o);let E=()=>{let _=pc(n.value);if(mt(f,n.tone),f.style.transform=`scaleX(${_/100})`,m.setAttribute("aria-valuenow",String(_)),n.label)m.setAttribute("aria-label",n.label);else m.removeAttribute("aria-label");Y(s,n.label),Y(a,`${_}%`);let u=_===100&&(!n.tone||n.tone==="neutral");xe(o,"data-done",u?"true":null),d.style.display=u?"":"none",r.hidden=!n.label};return E(),{update:(_)=>{n={...n,..._},E()},dispose:()=>{o.remove()}}};var xs=(e)=>e.filter((t)=>!("separator"in t)),fc=0,Po=(e,t)=>{X(V);let n=t,o=`oc-sdk-menu-${fc+=1}`,r=k("div","oc-sdk oc-sdk-menu");e.append(r);let s=k("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,a=null,d=Ge(r,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)_();else u()}}),m=r.querySelector("button");m?.setAttribute("aria-haspopup","menu");let f=(b)=>{a=b,tn(s,s,o,b)},E=()=>{$e(s);for(let b of n.items){if("separator"in b){let y=k("div","oc-sdk-separator");y.dataset.labeled="false",s.append(y);continue}s.append(en(o,"menuitem",b,{hover:()=>f(b.id),pick:()=>h(b.id)}))}f(xs(n.items).some((b)=>b.id===a)?a:null)},_=()=>{let b=i;i=null,b?.(),a=null,m?.setAttribute("aria-expanded","false")},u=()=>{if(i||!m)return;E(),i=nn(r,m,s,_),m.setAttribute("aria-expanded","true"),s.focus()},h=(b)=>{_(),m?.focus(),n.onSelect(b)},T=(b)=>{let y=Me(b);if(y)b.preventDefault(),f(He(xs(n.items),a,y));else if(b.key==="Enter"||b.key===" "){if(b.preventDefault(),a)h(a)}else if(b.key==="Escape")b.preventDefault(),_(),m?.focus()},I=(b)=>{if(i&&!(b.relatedTarget instanceof Node&&r.contains(b.relatedTarget)))_()};return s.addEventListener("keydown",T),r.addEventListener("focusout",I),{update:(b)=>{if(n={...n,...b},d.update({label:n.label,variant:n.variant,size:n.size}),i)E()},dispose:()=>{_(),s.removeEventListener("keydown",T),r.removeEventListener("focusout",I),d.dispose(),r.remove()}}};var ht,de,Mo,As,Uo=Object.is,Et=0,Ms=[],No=[],le=F,{__b:ks,__r:Rs,diffed:Os,__c:Is,unmount:Cs,__:vs}=le;function Do(e,t){le.__h&&le.__h(de,e,Et||t),Et=0;var n=de.__H||(de.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function x(e){return Et=1,mc(Ns,e)}function mc(e,t,n){var o=Do(ht++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):Ns(void 0,t),function(s){var i=(o.__N||o.__)[0],a=o.t(i,s);Uo(i,a)||(o.__N=[a,o.__[1]],o.__c.setState({}))}],o.__c=de,!de.__f)){de.__f=!0;var r=de.shouldComponentUpdate;de.shouldComponentUpdate=function(s,i,a){var d=this.__H;if(!d)return!0;var m=!1,f=this.props!=s;if(d.__.some(function(_){_.__N&&(m=!0,Uo(_.__[0],_.__N[0])||(f=!0))}),r){var E=r.call(this,s,i,a);return m?E||f:E}return!m||f}}return o.__}function W(e,t){var n=Do(ht++,3);!le.__s&&Us(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,de.__H.__h.push(n))}function Be(e){return Et=5,ye(function(){return{current:e}},[])}function ye(e,t){var n=Do(ht++,7);return Us(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function Je(e,t){return Et=8,ye(function(){return e},t)}function _c(){var e;do{for(;e=No.shift();)try{_t(e)}catch(n){le.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=Ms.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(_t),t.__h.some(Lo),t.__h=[]}catch(n){t.__h=[],le.__e(n,e.__v)}}}while(No.length)}le.__b=function(e){de=null,ks&&ks(e)},le.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),vs&&vs(e,t)},le.__r=function(e){Rs&&Rs(e),ht=0;var t=(de=e.__c).__H;t&&(Mo==de?de.__h=[]:(t.__h.some(_t),t.__h.some(Lo),ht=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),Mo=de},le.diffed=function(e){Os&&Os(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&Ps(Ms.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),Mo=de=null},le.__c=function(e,t){t.some(function(n){try{n.__h.some(_t),n.__h=n.__h.filter(function(o){return!o.__||Lo(o)})}catch(o){n.__h=[function(){throw o}]}}),Is&&Is(e,t)},le.unmount=function(e){Cs&&Cs(e);var t,n,o=e.__c;o&&o.__H&&(o.__H.__.some(function(r){try{if(r.__P&&r.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}r.__P=n,Ps(No.push(r))}else _t(r)}catch(s){t=s}}),o.__H=void 0,t&&le.__e(t,o.__v))};var ws=typeof requestAnimationFrame=="function";function hc(e){var t,n=function(){clearTimeout(o),ws&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,35);ws&&(t=requestAnimationFrame(n))}function Ps(e){e!=1&&As==le.requestAnimationFrame||((As=le.requestAnimationFrame)||hc)(_c)}function _t(e){var t=de,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),de=t}function Lo(e){var t=de;e.__c=e.__(),de=t}function Us(e,t){return!e||e.length!=t.length||t.some(function(n,o){return!Uo(n,e[o])})}function Ns(e,t){return typeof t=="function"?t(e):t}var R=uo(),je=null,sn=new Set;R.onReady((e)=>{je=e,po(e,document.documentElement);for(let t of sn)t(e)});R.onItem((e)=>{if(!je||je.item===e)return;je={...je,item:e};for(let t of sn)t(je)});var Ls=()=>{let[e,t]=x(je);return W(()=>{if(sn.add(t),je)t(je);return()=>{sn.delete(t)}},[]),e};var Ec=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},Ds=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),Sc=(e,t)=>{let n=e;for(let o of t){if(n===null||n===void 0)return;n=n[o]}return n},$o=(e,t)=>{let n=(o,r)=>{if(typeof o==="function")return(...s)=>{let i=Sc(t.current,r);return typeof i==="function"?i(...s):void 0};if(Array.isArray(o))return o.map((s,i)=>n(s,[...r,i]));if(Ec(o))return Object.fromEntries(Object.entries(o).map(([s,i])=>[s,n(i,[...r,s])]));return o};return n(e,[])};var gc=Symbol.for("pv"),Tc=0;function l(e,t,n,o,r,s){t||(t={});var i,a,d=t;if("ref"in d&&typeof e!="function")for(a in d={},t)a=="ref"?i=t[a]:d[a]=t[a];var m={type:e,props:d,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:gc,__v:--Tc,__i:-1,__u:0};return(r||s)&&(m.__source=r,m.__self=s),F.vnode&&F.vnode(m),m}var yc=(...e)=>e.filter(Boolean).join(" ");var an=({children:e,class:t})=>l("span",{class:yc("sui-chip",t),children:e},void 0,!1,void 0,this);var $s=(e,t)=>{let n=Be(null),o=Be(null),r=Be(t);r.current=t;let s=Ds(t),i=Be(!1);W(()=>{if(!n.current)return;return o.current=e(n.current,$o(r.current,r)),i.current=!0,()=>{o.current?.dispose(),o.current=null,i.current=!1}},[]);let a=Be(s);return W(()=>{if(!i.current||a.current===s)return;a.current=s,o.current?.update($o(r.current,r))},[s]),n};var _e=(e,t="inline-flex")=>(n)=>{let o=$s(e,n);return l("span",{ref:o,style:{display:t}},void 0,!1,void 0,this)},ie=_e(Ge),Re=_e(on),St=_e(bo,"block"),it=_e(xo,"block"),Gs=_e(ko),rS=_e(Po),sS=_e(Ro),he=_e(Co),Oe=_e(vo,"block"),cn=_e(Io,"block"),iS=_e(wo,"block"),at=_e(Oo,"block"),Hs=_e(Ao),ln=_e(rn),aS=_e(rn,"block"),bc=_e(on,"block");var Bs=(e,t)=>JSON.stringify({query:e,variables:t});class ue extends Error{kind;constructor(e,t){super(t);this.kind=e}}var H=async(e,t)=>{let n;try{n=await R.request({method:"POST",path:"/graphql",body:Bs(e,t)})}catch(r){if(r instanceof v){if(r.code==="DISCONNECTED"||r.code==="NO_INTEGRATION")throw new ue("disconnected","Linear is not connected.");throw new ue("network",r.message||"Could not reach Linear.")}throw new ue("network",r instanceof Error?r.message:"Could not reach Linear.")}let o;try{o=JSON.parse(n.body)}catch{throw new ue("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new ue("disconnected","Linear sign-in expired.");if(o.errors?.length){let r=o.errors[0],s=r.extensions?.code==="RATELIMITED"||r.extensions?.type==="ratelimited";throw new ue(s?"rate-limited":"graphql",r.message)}if(!o.data)throw new ue("graphql","Linear returned no data.");return o.data};var ct=new Map,xc=30000,js=(e)=>{let t=ct.get(e);if(!t)t={at:0,listeners:new Set},ct.set(e,t);return t},dn=(e)=>{for(let t of e.listeners)t()},Ae=(e,t,n=!1)=>{let o=js(e);if(o.promise)return o.promise;if(!n&&o.value!==void 0&&Date.now()-o.at<xc)return Promise.resolve(o.value);let r=t().then((s)=>(o.value=s,o.error=void 0,o.at=Date.now(),s),(s)=>{throw o.error=s,s}).finally(()=>{o.promise=void 0,dn(o)});return o.promise=r,dn(o),r};var Fs=(e)=>{let t=[];for(let[n,o]of ct){if(o.value===void 0)continue;let r=e(n,o.value);if(r===o.value)continue;t.push([o,o.value]),o.value=r,dn(o)}return()=>{for(let[n,o]of t)n.value=o,dn(n)}},Go=(e)=>{let t=ct.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)Ae(e,t.fetcher,!0).catch(()=>{return})},Ye=(e)=>{for(let[t,n]of ct){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)Ae(t,n.fetcher,!0).catch(()=>{return})}},Se=(e,t)=>{let[,n]=x(0);W(()=>{if(!e)return;let r=js(e);r.fetcher=t;let s=()=>n((i)=>i+1);return r.listeners.add(s),Ae(e,t).catch(()=>{return}),()=>{r.listeners.delete(s)}},[e]);let o=e?ct.get(e):void 0;return{data:o?.value,error:o?.error,loading:Boolean(o?.promise)||e!==null&&o?.value===void 0&&o?.error===void 0,refresh:()=>{if(e)Ae(e,t,!0).catch(()=>{return})}}};var Vs=`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,Xs=`
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        activeCycle { id number name startsAt endsAt progress isActive isFuture isPast completedAt }
      }
    }
  }
`,Ws=`
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { id name type color position team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,Ks=`
  query TeamPeople($teamId: String!) {
    team(id: $teamId) {
      id
      members(first: 250) { nodes { id name displayName avatarUrl avatarBackgroundColor active } }
      labels(first: 250) { nodes { id name color } }
    }
  }
`,zs=`
  query WorkspaceLabels {
    issueLabels(first: 250) { nodes { id name color team { id } } }
  }
`,Ho=`
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
`,qs=`
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
`;var lt=`
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
`;var Js=`
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { id name type color position } team { id key } project { id name } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,un=(e)=>`
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
`;var Ys=`
  query TeamCycles($teamId: String!, $minNumber: Float!) {
    team(id: $teamId) {
      id key name
      cycles(first: 25, filter: { number: { gte: $minNumber } }) { nodes { id number name startsAt endsAt progress isActive isFuture isPast completedAt } }
    }
  }
`;var Qs=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`,Zs=`
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
`,ei=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`,ti=`
  query SearchDocuments($term: String!) {
    searchDocuments(term: $term, first: 20) { nodes { id title url updatedAt project { id name } } }
  }
`,ni=`
  query Documents($filter: DocumentFilter) {
    documents(first: 100, filter: $filter) { nodes { id title url updatedAt project { id name } } }
  }
`,oi=`
  query Document($id: String!) {
    document(id: $id) { id title content url updatedAt project { id name } creator { id name displayName avatarUrl avatarBackgroundColor } }
  }
`,ri=`
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
`,si=`
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
`,ii=`
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`;var ai=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,ES={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:un(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,BRANCH_ISSUE:`
  query BranchIssue($filter: IssueFilter) {
    issues(first: 1, filter: $filter) { nodes { identifier title url description state { name } } }
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
`,NOTIFICATIONS_MARK_READ:ai(["n1","n2"])};var ci=new Map,Bo=(e)=>{for(let t of e)ci.set(t.id,t);return e},pn=(e)=>ci.get(e),Ac={type:{nin:["completed","canceled"]}},fn=async(e)=>{if(!e.length)return[];let t=await H(Ho,{after:null,filter:{id:{in:[...e].sort()}}});return Bo(t.projects.nodes)},jo=async(e)=>{let t=await H(ei,{term:e});return Bo(t.searchProjects.nodes)},kc=async(e)=>{let t=await H(Ho,{after:null,filter:{accessibleTeams:{some:{id:{eq:e}}},status:Ac}});return Bo(t.projects.nodes).sort((n,o)=>n.name.localeCompare(o.name))},li=(e)=>{let t=e.length?`projects:${[...e].sort().join(",")}`:null;return Se(t,()=>fn(e))},gt=(e)=>{let t=e.length?`team-projects:${[...e].sort().join(",")}`:null;return Se(t,async()=>{let n=await Promise.all(e.map((r)=>Ae(`team-projects:${r}`,()=>kc(r)))),o=new Set;return n.flat().filter((r)=>o.has(r.id)?!1:(o.add(r.id),!0))})},di=(e)=>{let[t,n]=x(e);return W(()=>{let o=setTimeout(()=>n(e.trim()),250);return()=>clearTimeout(o)},[e]),Se(t.length>=2?`project-search:${t.toLowerCase()}`:null,()=>jo(t))};async function Fe(e,t,n,o={}){let r=o.name??"extension",s={};for(let[i,a]of Object.entries(o.query??{}))if(a)s[i]=a;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...o.body!==void 0?{body:JSON.stringify(o.body)}:{}}),a;try{a=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${r} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&a.ok===void 0)return{ok:!1,error:String(a.message??`Error ${i.status}`),code:"failed"};return a}catch(i){let a=i.code;if(a==="NO_SERVICE")return{ok:!1,error:`Approve the ${r} service in Settings > Extensions.`,code:"failed"};if(a==="SERVICE_FAILED")return{ok:!1,error:`The ${r} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${r} service.`,code:"failed"}}}async function se(e,t,n,o={}){try{await e.toast({kind:t,message:n,...o.dismiss?{dismiss:!0}:{}})}catch{}}var mn={source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null,work:null},Oc=(e)=>{let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)},Tt=(e)=>e.replace(/\/+$/,""),Fo=(e)=>Tt(e).split("/").pop()??"",Ic=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,Cc=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),n=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(n)return{host:n[1].toLowerCase(),path:n[2]};let o=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(o)return{host:o[1].toLowerCase(),path:o[2]};return null},vc=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],n=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],o=t??n;return o?Cc(o):null},wc=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let n=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(n)return{host:n[1].toLowerCase(),path:n[2]};return null},Pc=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,dt=async(e,t)=>{let n=Tt(t),o=(await e.listProjects().catch(()=>{return}))?.projects??[],r=o.find((_)=>Tt(_.directory)===n)??null,s=null;for(let _ of r?[r]:o){let h=((await e.listWorktrees(_.id).catch(()=>{return}))?.worktrees??[]).find((T)=>Tt(T.directory)===n);if(h){r=_,s=h.branch||null;break}}if(!s)s=Ic(await e.readFile(".git/HEAD"));let i=r?`p:${r.id}`:`d:${Oc(n)}`,d=[...r?(await e.listSessions(r.id).catch(()=>{return}))?.sessions??[]:[]].sort((_,u)=>u.updatedAt-_.updatedAt),m=[],f=null;for(let _ of d){for(let u of _.links??[]){let h=u.url.match(Pc)?.[1]?.toUpperCase();if(h&&!m.includes(h))m.push(h);if(!f&&u.kind==="change")f=wc(u.url)}for(let u of _.items){let h=u.data,T=typeof h?.identifier==="string"?h.identifier.toUpperCase():null;if(T&&!m.includes(T))m.push(T)}}let E=vc(await e.readFile(".git/config"));if(E)await e.setRepo(i,E).catch(()=>{return});else E=await e.getRepo(i).catch(()=>null)??f;return{key:i,ocProjectId:r?.id??null,projectDirectory:r?Tt(r.directory):n,directory:n,branch:s,repo:E,linkedIssues:m.slice(0,20)}},Mc=(e,t)=>{let n=[];for(let o of e.matchAll(/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6})-(\d+)(?![A-Za-z0-9])/g)){let r=o[1].toUpperCase(),s=`${r}-${o[2]}`;if(t.has(r)&&!n.includes(s))n.push(s)}return n},yt=(e)=>e.toLowerCase().replace(/[^a-z0-9]/g,""),ui=new Set(["api","app","apps","web","ui","service","services","svc","server","client","helm","chart","charts","terraform","tf","infra","argo","deploy","config","lib","libs","sdk","core","backend","frontend","mobile","ios","android","worker","shared","common","util","utils","tools","tool","kit","test","tests","docs","demo","example","examples","sandbox","extension","extensions"]),Uc=(e)=>{let t=[],n=(i,a,d)=>{if(yt(i).length>=2&&!t.some((m)=>yt(m.text)===yt(i)))t.push({text:i,weight:a,label:d})},o=Fo(e.projectDirectory),r=e.repo?Fo(e.repo.path):"";if(n(o,1,`folder name "${o}"`),r)n(r,1,`repository "${r}"`);for(let i of[o,r].join("-").split(/[-_.\s]+/))if(i.length>=2&&!ui.has(i.toLowerCase()))n(i,0.8,`the word "${i}" in the repository name`);let s=e.repo?e.repo.path.split("/").slice(0,-1).reverse():[];for(let i of s)if(!ui.has(i.toLowerCase()))n(i,0.7,`repository group "${i}"`);return t},Nc=(e,t)=>{let n=yt(e),o=yt(t);if(n.length<3||o.length<3)return 0;if(n===o)return 3;if(n.startsWith(o)||o.startsWith(n))return 2;if(n.includes(o)||o.includes(n))return 1;return 0};var pi=(e,t,n=1.4)=>{let o=null;for(let r of t)for(let s of e){let i=Nc(r.name,s.text)*s.weight;if(r.key&&r.key.toLowerCase()===s.text.toLowerCase()&&r.key.length>=2)i=Math.max(i,2.5*s.weight);if(i>=n&&(!o||i>o.score))o={item:r,score:i,label:s.label}}return o},Lc=(e)=>e.status.type!=="completed"&&e.status.type!=="canceled";var Dc=async(e,t,n)=>{let o=t.branch?Mc(t.branch,n).slice(0,3):[],r=t.linkedIssues.slice(0,1),s=[...o,...r.filter((a)=>!o.includes(a))];if(!s.length)return null;let i=await e.issuesByIdentifier(s).catch(()=>[]);for(let a of s){let d=i.find((m)=>m.identifier===a);if(d)return{identifier:d.identifier,title:d.title,url:d.url,teamKey:d.team.key,projectName:d.project?.name??null,from:o.includes(a)?"branch":"session"}}return null},fi=(...e)=>e.flatMap((t)=>Array.isArray(t)?t:t===void 0?[]:[t]).filter((t)=>typeof t==="string"),mi=(e)=>[...new Set(e)],$c=async(e,t,n)=>{let o;try{o=JSON.parse(t)}catch{return null}let r=fi(o.teams,o.team).map((i)=>n.find((a)=>a.id===i||a.key.toLowerCase()===i.toLowerCase())?.id).filter((i)=>Boolean(i)),s=[];for(let i of fi(o.projects,o.project)){let a=i.trim(),d=a.match(/linear\.app\/[^/]+\/project\/([^/?#]+)/i)?.[1]?.split("-").pop(),f=(await e.projectsByIds([d??a]).catch(()=>[]))[0]??(await e.searchProjects(a).catch(()=>[])).find((E)=>E.name.toLowerCase()===a.toLowerCase());if(f)s.push(f.id)}return r.length||s.length?{teamIds:mi(r),projectIds:mi(s)}:null},_i=async(e,t,n)=>{let o=new Set(n.map((E)=>E.key.toUpperCase())),r=await Dc(e,t,o),s=(E)=>({...E,work:r}),i=await e.getMapping(t.key);if(i&&(i.linearProjectIds.length||i.teamIds.length))return s({source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:i.teamIds,projectIds:i.linearProjectIds,mapping:i});let a=await e.readFile(".linear.json");if(a){let E=await $c(e,a,n);if(E)return s({source:"config",inferred:!1,evidence:".linear.json",...E,mapping:null})}if(t.repo){let E=await e.repoAttachments(`${t.repo.host}/${t.repo.path}/`).catch(()=>[]),_=new Map;for(let T of E)if(T.issue)_.set(T.issue.id,{team:T.issue.team.id,project:T.issue.project?.id??null});let u=new Map;for(let{team:T}of _.values())u.set(T,(u.get(T)??0)+1);let h=[...u.entries()].sort((T,I)=>I[1]-T[1])[0];if(h&&h[1]>=3){let T=new Map;for(let{team:y,project:O}of _.values())if(y===h[0]&&O)T.set(O,(T.get(O)??0)+1);let I=[...T.entries()].sort((y,O)=>O[1]-y[1])[0],b=I&&I[1]>=3&&I[1]/h[1]>=0.6?[I[0]]:[];return s({source:"repo",inferred:!0,evidence:`${h[1]} issues with merge requests in ${Fo(t.repo.path)}`,teamIds:[h[0]],projectIds:b,mapping:null})}}let d=Uc(t),m=pi(d,n);if(m)return s({source:"name",inferred:!0,evidence:m.label,teamIds:[m.item.id],projectIds:[],mapping:null});let f=d[0]?.text;if(f){let E=(await e.searchProjects(f).catch(()=>[])).filter(Lc),_=pi(d,E,2);if(_)return s({source:"name",inferred:!0,evidence:_.label,teamIds:[],projectIds:[_.item.id],mapping:null})}return s({source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null})};var bt=async(e)=>{try{let t=await R.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},Vo=async(e,t)=>{try{return await R.storage.set(e,t),!0}catch{return!1}},hi=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),Ei=async(e)=>{let t=await bt(`map:${e}`);return hi(t)?t:null},_n=async(e,t)=>{let n=await Vo(`map:${e}`,t);return Ti(),n},Si=async(e)=>{try{await R.storage.delete(`map:${e}`)}catch{}Ti()},Xo=async(e)=>{let t=await bt(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},gi=async(e,t)=>{let n=await Xo(e);if(n?.host!==t.host||n.path!==t.path)await Vo(`repo:${e}`,t)},Wo=async()=>await bt("pref:start-moves")!==!1;var Ko=async(e)=>{let t=await bt(`pref:start-state:${e}`);return typeof t==="string"?t:null},zo=(e,t)=>Vo(`pref:start-state:${e}`,t);var Ti=async(e={})=>{let t=[];try{t=await R.storage.keys()??[]}catch{return}let n={};for(let o of t.filter((r)=>r.startsWith("map:"))){let r=await bt(o);if(hi(r)&&r.directory)n[r.directory]=r}if(e.allowEmpty===!1&&Object.keys(n).length===0)return;await Fe(R,"PUT","/config",{body:{directories:n},name:"Linear"})};var Gc=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,Qe={listProjects:()=>R.listProjects(),listWorktrees:(e)=>R.listWorktrees(e),listSessions:(e)=>R.listSessions(e),readFile:(e)=>R.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:Ei,getRepo:Xo,setRepo:gi,issuesByIdentifier:async(e)=>{let t=e.filter((o)=>Gc.test(o));if(!t.length)return[];let n=await H(un(t));return Object.values(n).filter((o)=>Boolean(o))},repoAttachments:async(e)=>(await H(Qs,{url:e})).attachments.nodes,searchProjects:jo,projectsByIds:fn},Hc=(e,t)=>e.teamsById.get(t)?.name??pn(t)?.name??"Unknown",yi=(e,t)=>{let[n,o]=x(null),[r,s]=x(mn),[i,a]=x(!1),[d,m]=x(0),f=Be(0);W(()=>{a(!1)},[e]),W(()=>{if(!t)return;let y=++f.current;if(!e){o(null),s(mn),a(!0);return}(async()=>{let O=await dt(Qe,e),A=await _i(Qe,O,t.teams).catch(()=>mn);if(y!==f.current)return;let B=A.teamIds.filter((L)=>t.teamsById.has(L)),te=A.projectIds.length?await fn(A.projectIds).catch(()=>[]):[],N=A.projectIds.filter((L)=>te.some((q)=>q.id===L));if(y!==f.current)return;o(O),s({...A,teamIds:B,projectIds:N}),a(!0)})()},[e,t,d]);let E=Je(()=>m((y)=>y+1),[]),_=Je(async(y,O)=>{if(!n)return!1;let A=[...y,...O],B=r.mapping?.activeProjectId,te={directory:n.projectDirectory,linearProjectIds:O,teamIds:y,activeProjectId:A.length===1?A[0]:B&&A.includes(B)?B:A[0]??"all",finishComments:r.mapping?.finishComments??"off",updatedAt:Date.now()};s((L)=>({...L,source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:y,projectIds:O,mapping:te}));let N=await _n(n.key,te);if(!N)await se(R,"error","Could not save this folder's choice. It applies until you reload.");return N},[n,r]),u=Je(async()=>{if(!await _(r.teamIds,r.projectIds))return;let y=t?[...r.teamIds,...r.projectIds].map((O)=>Hc(t,O)).join(", "):"";await se(R,"success",y?`Pinned ${y} to this folder`:"Pinned to this folder")},[_,r,t]),h=Je(async()=>{if(!n)return;await Si(n.key),E()},[n,E]),T=Je((y)=>{if(!n||!r.mapping)return;let O={...r.mapping,activeProjectId:y,updatedAt:Date.now()};s((A)=>({...A,mapping:O})),_n(n.key,O)},[n,r]),I=Je(async(y)=>{if(!n||!r.mapping)return!1;let O={...r.mapping,...y,updatedAt:Date.now()};s((B)=>({...B,mapping:O}));let A=await _n(n.key,O);if(!A)await se(R,"error","Could not save the setting. It applies until you reload.");return A},[n,r]),b=r.teamIds.length+r.projectIds.length>0;return{place:n,detection:r,settled:i,mapped:b,refresh:E,save:_,pin:u,clear:h,setActive:T,update:I}};var Bc=5,qo=null,jc=new Map;var bi=(e,t)=>{let n=jc.get(t);if(n!==void 0)return n;let o=qo?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],r=o.findIndex((s)=>s.id===t);return r<0?0.5:(r+1)/(o.length+1)};var Fc=async()=>{let e=new Map,t=null;for(let n=0;n<Bc;n+=1){let o=await H(Ws,{after:t});for(let{team:r,...s}of o.workflowStates.nodes){let i=e.get(r.id)??[];i.push(s),e.set(r.id,i)}if(!o.workflowStates.pageInfo.hasNextPage)break;t=o.workflowStates.pageInfo.endCursor}for(let n of e.values())n.sort((o,r)=>o.position-r.position);return e},Vc=async()=>{let[e,t,n]=await Promise.all([H(Vs).then((o)=>o.viewer),H(Xs).then((o)=>o.teams.nodes),Fc()]);return t.sort((o,r)=>o.name.localeCompare(r.name)),qo={viewer:e,teams:t,teamsById:new Map(t.map((o)=>[o.id,o])),myTeamIds:new Set(e.teams?.nodes.map((o)=>o.id)??[]),statesByTeam:n},qo},Xc="workspace";var hn=()=>Se(Xc,Vc);var xi={state:{type:{nin:["completed","canceled","duplicate"]}}};var Ai=(e,t,n=!1)=>{let o=[];if(e.length){let r=[...e].sort();o.push({team:n?{or:[{id:{in:r}},{ancestors:{some:{id:{in:r}}}}]}:{id:{in:r}}})}if(t.length)o.push({project:{id:{in:[...t].sort()}}});if(!o.length)return null;return o.length===1?o[0]:{or:o}},ki=(...e)=>{let t=e.filter((n)=>Boolean(n));return t.length===1?t[0]:{and:t}},Ri={assigned:{assignee:{isMe:{eq:!0}}},created:{creator:{isMe:{eq:!0}}},subscribed:{subscribers:{some:{isMe:{eq:!0}}}}};var Ue=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ue&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ue&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},Wc=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),Oi=(e,t)=>Fs((n,o)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&Wc(o)&&o.issues.some((r)=>r.id===e)){let{description:r,...s}=t;return{...o,issues:o.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof o==="object"&&o!==null&&o.id===e){let{team:r,...s}=t;return{...o,...s}}return o}),Kc=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new ue("graphql","Linear did not save the change.");return e.issueUpdate.issue},xt=async(e,t)=>{let n=Oi(e.id,t.patch);try{let o=Kc(await H(ri,{id:e.id,input:t.input}));if(Oi(e.id,o),Go(`issue:${e.identifier}`),"stateId"in t.input)Ye("children:");return o}catch(o){throw n(),o}};var Ii=async(e)=>{let t=await H(si,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new ue("graphql","Linear did not create the issue.");return Ye("issues:"),Ye("view-issues:"),t.issueCreate.issue},Jo=async(e,t)=>{if(!(await H(ii,{input:{issueId:e.id,body:t}})).commentCreate.success)throw new ue("graphql","Linear did not save the comment.");Go(`issue:${e.identifier}`)};var zc=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,At=(e)=>{if(!e)return[];let t=[],n=(r)=>{let s=r?.toUpperCase();if(s&&!t.includes(s))t.push(s)},o=[...e.links??[]].sort((r,s)=>(s.linkedAt??0)-(r.linkedAt??0));for(let r of o)n(r.url.match(zc)?.[1]);for(let r of e.items??[]){let s=r.data?.identifier;if(typeof s==="string")n(s)}return t};var Ci=(e)=>({sessionId:e.id,directory:e.directory,title:e.title,agent:e.agent??null,inWorktree:e.worktree!==null,updatedAt:e.updatedAt});var qc=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,Jc=1e5,Yc=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),vi=(e,t)=>{let n=Yc(t.trim()).trim(),o=n.length>20000?`${n.slice(0,20000).trimEnd()}

[cut]`:n,r=(e??"").replace(qc,"").trimEnd(),s=`---
## Plan

${o}`,i=r?`${r}

${s}`:s;return i.length>Jc?null:i},wi=(e,t=6,n=420)=>{let o=e.trim().split(`
`).filter((r)=>r.trim()).slice(0,t).join(`
`);return o.length>n?`${o.slice(0,n).trimEnd()}...`:o};var Pi="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var Ne=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let o=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...o?{}:{year:"numeric"}})};var Mi=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let o=Math.max(0,Math.round((t-n)/60000));if(o<1)return"just now";if(o<60)return`${o}m ago`;let r=Math.round(o/60);if(r<24)return`${r}h ago`;let s=Math.round(r/24);if(s<30)return`${s}d ago`;return Ne(e,new Date(t))},En=(e)=>`${Math.floor(Math.max(0,Math.min(1,e))*100)}%`,Yo={onTrack:"On track",atRisk:"At risk",offTrack:"Off track"};var Qc={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},Sn=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return Qc[e]??String(e);return String(e)};var Zc=["No priority","Urgent","High","Medium","Low"],Qo=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${Zc[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],n=e.comments.nodes.slice(-5).map((r)=>`${r.user?.name??"Someone"} (${Ne(r.createdAt)}): ${r.body}`),o=[...t,...n.length?["","Latest comments:",...n]:[]].filter((r,s,i)=>r||i[s-1]).join(`
`);return o.length>15000?`${o.slice(0,15000)}
[cut]`:o};var gn=(e)=>e===0?5:e;var Ui=["triage","backlog","unstarted","started","completed","canceled","duplicate"],kt=(e,t)=>Ui.indexOf(e.type)-Ui.indexOf(t.type)||e.position-t.position;var Zo=["No priority","Urgent","High","Medium","Low"];var er=(e)=>[...e??[]].sort(kt);var Ni=(e,t)=>{let n=er(t);return n.find((r)=>r.id===e?.defaultIssueState?.id&&r.type!=="triage")??n.find((r)=>r.type==="backlog")??n.find((r)=>r.type==="unstarted")??null};var tr=(e)=>er(e).filter((t)=>t.type==="started"||t.type==="unstarted"&&/plan/i.test(t.name)),nr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let o=tr(t);if(e.state.type==="started"||o.some((r)=>r.id===e.state.id))return null;return Li(o.filter((r)=>r.type==="started"),n,o)},Li=(e,t,n=e)=>{let o=t?.trim().toLowerCase();return(o?n.find((r)=>r.name.trim().toLowerCase()===o):void 0)??e.find((r)=>/^in progress$/i.test(r.name.trim()))??e.find((r)=>/progress|doing|working|development|started/i.test(r.name))??e.find((r)=>!/block|hold|pause|wait|stuck/i.test(r.name))??e[0]??null},Di=(e)=>/plan/i.test(e.name),$i=(e)=>er(e).filter((t)=>t.type==="started"&&!Di(t)),or=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!Di(e.state))return null;return Li($i(t),n)},Gi=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let o=tr(t);if(e.state.type==="started"||o.some((r)=>r.id===e.state.id))return null;return o.find((r)=>/plan/i.test(r.name))??nr(e,t,n)},Hi=(e,t,n,o)=>{let r=e==="build"?$i(n):tr(n),s=e==="build"?or(t,n,o):e==="plan"?Gi(t,n,o):nr(t,n,o),i=s??r.find((a)=>a.id===t.state.id)??null;return{options:r,target:i,moves:s!==null}},tl={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},rr=(e)=>{let t=e?tl[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]};var Bi=async(e)=>{try{await R.openSession(e)}catch{}};var ji=async(e)=>{let t=await Fe(R,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{}},name:"Linear"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},Tn=async(e)=>{let t=await Fe(R,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier},name:"Linear"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1}};var nl=async(e)=>{let t=await H(Js,{filter:ki(xi,Ri.assigned,e)});return{issues:t.issues.nodes,more:t.issues.pageInfo.hasNextPage}};var Fi=(e)=>Se(e?`status-mine:${JSON.stringify(e)}`:null,()=>nl(e));var Vi=15000,Xi=(e)=>e.length>Vi?`${e.slice(0,Vi)}
[cut]`:e,Wi=(e)=>e.filter((t,n,o)=>t||o[n-1]).join(`
`).trim(),Ki=(e)=>{let t=e.teams.nodes.map((s)=>s.name).join(", "),n=e.projectMilestones.nodes.slice().sort((s,i)=>s.sortOrder-i.sortOrder).map((s)=>`- ${s.name}${s.targetDate?` (${Ne(s.targetDate)})`:""}: ${En(s.progress)}`),o=e.projectUpdates.nodes[0],r=e.content?.trim()||e.description?.trim()||"";return Xi(Wi([`Linear project: ${e.name}`,`Status: ${e.status.name}.${e.health?` Health: ${Yo[e.health]}.`:""} Progress: ${En(e.progress)}.`,t?`Teams: ${t}.`:"",e.lead?`Lead: ${e.lead.name}.`:"",e.startDate||e.targetDate?`Dates: ${e.startDate?`starts ${Ne(e.startDate)}`:""}${e.startDate&&e.targetDate?", ":""}${e.targetDate?`target ${Ne(e.targetDate)}`:""}.`:"",`Link: ${e.url}`,...n.length?["","Milestones:",...n]:[],...o?["",`Latest update (${Ne(o.createdAt)}, ${o.user?.name??"someone"}${o.health?`, ${Yo[o.health]}`:""}):`,o.body.trim()]:[],...r?["",r]:[]]))},zi=(e)=>Xi(Wi([`Linear document: ${e.title}`,e.project?`Project: ${e.project.name}.`:"",`Link: ${e.url}`,"",e.content?.trim()??""]));var yn=(e)=>{let[t,n]=x(e);return W(()=>{let o=setTimeout(()=>n(e.trim()),250);return()=>clearTimeout(o)},[e]),t},qi=(e)=>e.length>=2,bn=(e)=>{let t=yn(e);return Se(qi(t)?`issue-search:${t.toLowerCase()}`:null,async()=>(await H(Zs,{term:t})).searchIssues.nodes)},Ji=(e)=>{let t=yn(e);return Se(qi(t)?`document-search:${t.toLowerCase()}`:null,async()=>(await H(ti,{term:t})).searchDocuments.nodes)},Yi=(e)=>Se(e.length?`project-documents:${[...e].sort().join(",")}`:null,async()=>(await H(ni,{filter:{project:{id:{in:[...e].sort()}}}})).documents.nodes),Qi=(e)=>Ae(`project:${e}`,async()=>(await H(qs,{id:e})).project),Zi=(e)=>Ae(`document:${e}`,async()=>(await H(oi,{id:e})).document);var rl={started:0,unstarted:1,triage:2,backlog:3},ea=(e)=>rl[e]??9;var sl=5,ta=(e,t=sl)=>[...e].sort((n,o)=>ea(n.state.type)-ea(o.state.type)||gn(n.priority)-gn(o.priority)||o.updatedAt.localeCompare(n.updatedAt)).slice(0,t);var sr="linear-dashboard",il=(e)=>({id:`issue:${e.identifier}`,leading:e.identifier,title:e.title,meta:e.state.name}),al=(e)=>({id:`project:${e.id}`,title:e.name,subtitle:["Project",e.teams.nodes.map((t)=>t.name).join(", "),e.status.name].filter(Boolean).join(" · "),badge:{label:"Project",tone:"info"}}),cl=(e)=>({id:`doc:${e.id}`,title:e.title,subtitle:["Document",e.project?.name,e.updatedAt?`updated ${Mi(e.updatedAt)}`:""].filter(Boolean).join(" · "),badge:{label:"Doc"}}),ll=(e)=>{let t=new Set;return e.filter((n)=>t.has(n.id)?!1:(t.add(n.id),!0))},na=({scope:e,projectIds:t,teamIds:n})=>{let[o,r]=x(""),[s,i]=x(null),d=yn(o).length>=2,m=Fi(d?null:Ai(n,t)??{}),f=bn(d?o:""),E=li(t),_=gt(e.teamIds),u=di(d?o:""),h=Ji(d?o:""),T=ye(()=>ll([...E.data??[],..._.data??[]]).slice(0,20),[E.data,_.data]),I=Yi(T.map((N)=>N.id)),b=d?f.data?.slice(0,20):m.data?ta(m.data.issues,15):void 0,y=d?u.data:T,O=d?h.data:I.data,A=d?!u.data||!h.data||!f.data:E.loading||_.loading||m.loading,B=async(N)=>{i(N);try{let[L,q]=[N.slice(0,N.indexOf(":")),N.slice(N.indexOf(":")+1)],K=L==="issue"?await(async()=>{let M=(await H(lt,{id:q})).issue;return{providerId:sr,id:M.identifier,title:`${M.identifier} ${M.title}`,url:M.url,kind:"issue",text:Qo(M),data:{issueId:M.id,identifier:M.identifier}}})():L==="project"?await(async()=>{let M=await Qi(q);return{providerId:sr,id:N,title:M.name,url:M.url,kind:"issue",text:Ki(M),data:{kind:"project",id:M.id}}})():await(async()=>{let M=await Zi(q);return{providerId:sr,id:N,title:M.title,url:M.url,kind:"issue",text:zi(M),data:{kind:"document",id:M.id}}})();await R.attach(K),await se(R,"success",`Attached ${K.title} to your message`),await R.close()}catch(L){await se(R,"error",L instanceof ue?Ue(L):"Could not attach it. Open a chat first, then try again."),i(null)}},te=!A&&!b?.length&&!y?.length&&!O?.length;return l("div",{class:"lin-stack",children:[l("p",{class:"lin-lead",children:["Attach a Linear issue, project or document, so the agent can read it.",!d&&" Showing your open issues and this folder's projects; type to search all of Linear."]},void 0,!0,void 0,this),l(it,{value:o,onChange:r,placeholder:"Search issues, projects and documents",autofocus:!0},void 0,!1,void 0,this),s&&l(he,{size:"sm",label:"Reading it from Linear"},void 0,!1,void 0,this),b&&b.length>0&&l("div",{class:"lin-attach-group",children:[l("div",{class:"lin-subheading",children:d?"Issues":"Your open issues"},void 0,!1,void 0,this),l(at,{ariaLabel:"Issues",items:b.map(il),onSelect:(N)=>{if(!s)B(N)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),y&&y.length>0&&l("div",{class:"lin-attach-group",children:[l("div",{class:"lin-subheading",children:"Projects"},void 0,!1,void 0,this),l(at,{ariaLabel:"Projects",items:y.map(al),onSelect:(N)=>{if(!s)B(N)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),O&&O.length>0&&l("div",{class:"lin-attach-group",children:[l("div",{class:"lin-subheading",children:"Documents"},void 0,!1,void 0,this),l(at,{ariaLabel:"Documents",items:O.map(cl),onSelect:(N)=>{if(!s)B(N)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),A&&l(he,{label:d?"Searching":"Loading"},void 0,!1,void 0,this),te&&l("div",{class:"sui-muted sui-small",children:d?"No issue, project or document matches.":"Nothing for this folder yet."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},oa=({item:e})=>l("div",{class:"lin-dialog-body",children:[l("h2",{class:"lin-dialog-title",children:e.title},void 0,!1,void 0,this),l("p",{class:"lin-lead",children:"This is attached to your message. The agent reads its text, not the page."},void 0,!1,void 0,this),l("div",{class:"lin-form-foot",children:[l(ie,{label:"Close",variant:"ghost",size:"sm",onClick:()=>{R.close()}},void 0,!1,void 0,this),e.url&&l(ie,{label:"Open in Linear",size:"sm",onClick:()=>{R.openUrl(e.url)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this);var ra=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let r=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(r.slice(0,2),16),parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16)]}let o=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return o?[Number(o[1]),Number(o[2]),Number(o[3])]:null},sa=([e,t,n])=>{let o=(r)=>{let s=r/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*o(e)+0.7152*o(t)+0.0722*o(n)},dl=(e,t)=>{let[n,o]=[sa(e),sa(t)].sort((r,s)=>s-r);return(n+0.05)/(o+0.05)};var ia=(e,t)=>{let n=ra(e),o=ra(t);if(!n||!o||dl(n,o)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var aa=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),ul=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),o=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${o.toFixed(2)}z`},xn=({type:e,color:t,size:n=14,fill:o,teamId:r,stateId:s})=>{let i=t||"currentColor",a=ye(()=>ia(i,aa()),[i,aa()]),d={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return l("svg",{...d,children:[l("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),l("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return l("svg",{...d,children:l("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return l("svg",{...d,children:l("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let m=o??(r&&s?bi(r,s):0.5);return l("svg",{...d,children:[l("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this),l("path",{d:ul(m),fill:a},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return l("svg",{...d,children:[l("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),l("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return l("svg",{...d,children:[l("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),l("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}};var pl=(e)=>({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:`${e.identifier}: ${e.title}
Status: ${e.state.name}.
Link: ${e.url}`,data:{issueId:e.id,identifier:e.identifier}}),An=({title:e,issue:t,canLink:n})=>{let[o,r]=x(!1),s=async()=>{try{await R.sessionLink(pl(t)),r(!0),await se(R,"success",`Linked ${t.identifier} to this session`)}catch{await se(R,"error","Open a session to link the issue to it.")}};return l("div",{class:"lin-dialog-body","data-state":"done",children:[l(Oe,{tone:"success",title:e,body:`${t.identifier} ${t.title}`},void 0,!1,void 0,this),l("div",{class:"lin-form-foot",children:[l(ie,{label:"Close",variant:"ghost",size:"sm",onClick:()=>{R.close()}},void 0,!1,void 0,this),n&&l(ie,{label:o?"Linked":"Link to this session",variant:"outline",size:"sm",disabled:o,onClick:()=>{s()}},void 0,!1,void 0,this),l(ie,{label:"Open in Linear",size:"sm",onClick:()=>{R.openUrl(t.url)}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var ca=["You write issues for Linear, a tracker used by software teams.",'Answer with one JSON object and nothing else: {"title": string, "description": string}.',"The title is one short line (under 80 characters) that says what needs doing, in plain words.","The description is Markdown: what is wrong or wanted, why it matters when the text says so, and any detail a teammate needs. Use short paragraphs or bullet points. Quote error text and names exactly.","Use only what the text contains. Do not invent causes, owners or dates. Use plain punctuation: no dashes as punctuation."].join(`
`),Ze=(e,t)=>e.length<=t?e:`${e.slice(0,Math.max(0,t-10))}
[cut]`,la=(e,t,n)=>`Draft a Linear issue from this ${t==="user"?"message I sent":"reply from the coding assistant"} in the session "${n}".

<text>
${Ze(e.trim(),59600)}
</text>`,da=(e,t)=>`Draft a Linear issue from this text, which I selected in ${t?`the session "${t}"`:"a coding session"}.

<text>
${Ze(e.trim(),59600)}
</text>`,ua=(e,t)=>{let n=`Draft a Linear issue from this conversation between me and a coding assistant, in the session "${t}". Capture the problem or the task the conversation ended on, not every step.

`,o=60000-n.length-200,r=[],s=0,i=!1;for(let a=e.length-1;a>=0;a-=1){let d=e[a],m=d.text.trim();if(!m)continue;let f=`[${d.role}]
${Ze(m,8000)}`;if(s+f.length+2>o){if(!r.length)r.push(`[${d.role}]
${Ze(m,o-20)}`);i=!0;break}r.unshift(f),s+=f.length+2}return`${n}<conversation>
${i?`[earlier messages left out]

`:""}${r.join(`

`)}
</conversation>`},pa=(e,t,n,o=5)=>{let r=e.split(`
`),s=Math.max(1,Math.min(t,n)),i=Math.min(r.length,Math.max(t,n)),a=Math.max(1,s-o),d=Math.min(r.length,i+o);return{text:r.slice(a-1,d).join(`
`),from:a,to:d}},kn=(e,t)=>{let n=Math.min(e,t),o=Math.max(e,t);return n===o?`${n}`:`${n}-${o}`},ir=(e,t,n)=>`Location: \`${e}:${kn(t,n)}\``,fa=(e,t,n,o)=>{let r=e.trim();if(r.includes(t))return r;let s=ir(t,n,o);return r?`${r}

${s}`:s},ma=(e,t,n,o,r)=>{let s=`File: ${e}
Selected lines: ${kn(t,n)}`;if(!o)return`Draft a Linear issue about a change to a file in my project. I could not read the file, so describe only where it is.

${s}`;return[`Draft a Linear issue about the lines I selected in a file of my project.${r?" The selection is on the removed side of a diff, so the lines below are the current file and may differ.":""} Say in the description which file and lines it concerns.`,"",`${s} (the snippet shows lines ${o.from} to ${o.to})`,"","<code>",Ze(o.text,30000),"</code>"].join(`
`)},fl=(e)=>{let t="",n=!1,o=!1;for(let r of e)if(n){if(o){o=!1,t+=r;continue}if(r==="\\"){o=!0,t+=r;continue}if(r==='"'){n=!1,t+=r;continue}if(r===`
`){t+="\\n";continue}if(r==="\r")continue;if(r==="\t"){t+="\\t";continue}t+=r}else{if(r==='"')n=!0;t+=r}return t},ml=(e)=>{for(let t of[e,fl(e)])try{let n=JSON.parse(t);if(typeof n==="object"&&n!==null&&!Array.isArray(n))return n}catch{}return null},_l=(e)=>{let t=e.indexOf("{"),n=e.lastIndexOf("}");if(t<0||n<=t)return null;let o=ml(e.slice(t,n+1));if(!o||typeof o.title!=="string")return null;let r=o.title.replace(/\s+/g," ").trim().slice(0,200);if(!r)return null;let s=typeof o.description==="string"?o.description.trim():"";return{title:r,description:s}},ar=(e,t)=>{if(e==="NO_MODEL")return{kind:"no-model"};if(e==="NOT_GRANTED")return{kind:"failed",message:"This extension is not allowed to use the Small Model. Approve it in Settings, Extensions."};if(e==="HOST_TIMEOUT")return{kind:"failed",message:"The Small Model took too long to answer."};return{kind:"failed",message:t||"The Small Model could not draft the issue."}},_a=(e)=>{let t=_l(e);return t?{kind:"draft",draft:t}:{kind:"failed",message:"The Small Model answered, but its answer could not be read."}};var cr=(e)=>e,ha=(e)=>{let t=e.replace(/\s+/g," ").trim();return t?t.length>160?`${t.slice(0,157).trimEnd()}…`:t:null},Ea="There is no text to draft from, so the form starts empty.",lr="build-from-plan",Sa=(e,t)=>{if(!e||!("kind"in e))return null;if(e.kind==="message"&&e.action!=="comment-on-issue")return{key:`message:${e.messageId}`,source:e.role==="user"?"From a message you sent":"From a reply by the assistant",quote:ha(e.text),build:async()=>e.text.trim()?{prompt:la(e.text,e.role,e.sessionTitle)}:{prompt:null,note:Ea},finish:cr};if(e.kind==="selection")return{key:`selection:${e.messageId}:${e.text.length}`,source:"From the text you selected",quote:ha(e.text),build:async()=>e.text.trim()?{prompt:da(e.text,t.sessionTitle)}:{prompt:null,note:Ea},finish:cr};if(e.kind==="session"&&e.action!==lr){let n=e.messages??[];return{key:`session:${e.sessionId}`,source:n.length?`From this chat (${n.length} ${n.length===1?"message":"messages"})`:"From this chat",quote:null,build:async()=>n.length?{prompt:ua(n.map((o)=>({role:o.role,text:o.text})),e.sessionTitle)}:{prompt:null,note:"OpenChamber did not hand over the messages of this chat, so the form starts empty."},finish:cr}}if(e.kind==="diff"){let{path:n,startLine:o,endLine:r}=e;return{key:`diff:${n}:${o}:${r}`,source:`From ${n}, line${o===r?"":"s"} ${kn(o,r)}`,quote:null,initial:{description:ir(n,o,r)},build:async()=>{let s=await t.readFile(n),i=s===null?null:pa(s,o,r);return{prompt:ma(n,o,r,i,e.side==="deletions")}},finish:(s)=>({...s,description:fa(s.description,n,o,r)})}}return null},ga=(e,t)=>`**OpenChamber session: ${e}**

${Ze(t.trim(),20000)}`;var hl=async(e,t)=>{let n=e.directory??t;if(!n)return[];let o=await dt(Qe,n);if(!o.ocProjectId)return[];let s=(await R.listSessions(o.ocProjectId).catch(()=>{return}))?.sessions.find((a)=>a.id===e.sessionId),i=At(s).slice(0,10);return i.length?Qe.issuesByIdentifier(i):[]},Ta=({issues:e,onPick:t,label:n})=>l(at,{ariaLabel:n,items:e.map((o)=>({id:o.id,leading:o.identifier,title:o.title,meta:o.state.name})),onSelect:(o)=>{let r=e.find((s)=>s.id===o);if(r)t(r)},emptyText:"No issue found."},void 0,!1,void 0,this),El=({linked:e,onPick:t})=>{let[n,o]=x(""),r=bn(n),s=n.trim().length>=2;return l("div",{class:"lin-stack",children:[l("p",{class:"lin-lead",children:e.length?"This session is linked to more than one issue. Pick the one to comment on, or search for another.":"No issue is linked to this session. Search for the issue to comment on."},void 0,!1,void 0,this),l(it,{value:n,onChange:o,placeholder:"Search Linear issues",autofocus:!0},void 0,!1,void 0,this),s?r.data?l(Ta,{issues:r.data,onPick:t,label:"Search results"},void 0,!1,void 0,this):l(he,{label:"Searching"},void 0,!1,void 0,this):e.length?l(Ta,{issues:e,onPick:t,label:"Linked issues"},void 0,!1,void 0,this):null]},void 0,!0,void 0,this)},ya=({item:e,directory:t})=>{let[n,o]=x(null),[r,s]=x(null),[i,a]=x(!1),[d,m]=x(()=>ga(e.sessionTitle,e.text)),[f,E]=x(!1),[_,u]=x(null);W(()=>{let T=!0;return hl(e,t).catch(()=>[]).then((I)=>{if(!T)return;if(o(I),I.length===1)s(I[0]);else a(!0)}),()=>{T=!1}},[e.sessionId,e.messageId]);let h=async()=>{if(!r||!d.trim()||f)return;E(!0);try{await Jo(r,d),await se(R,"success",`Commented on ${r.identifier}`),u(r)}catch(T){await se(R,"error",Ue(T)),E(!1)}};if(_)return l(An,{title:"Comment posted",issue:_,canLink:!(n??[]).some((T)=>T.id===_.id)},void 0,!1,void 0,this);if(n===null)return l("div",{class:"lin-dialog-body",children:l(he,{label:"Finding the issues linked to this session"},void 0,!1,void 0,this)},void 0,!1,void 0,this);return l("div",{class:"lin-dialog-body",children:[l("h2",{class:"lin-dialog-title",children:"Comment on Linear issue"},void 0,!1,void 0,this),i||!r?l(El,{linked:n,onPick:(T)=>{s(T),a(!1)}},void 0,!1,void 0,this):l(ke,{children:[l("div",{class:"lin-comment-target",children:[l(an,{children:[l(xn,{type:r.state.type,color:r.state.color,teamId:r.team.id,stateId:r.state.id},void 0,!1,void 0,this)," ",l("span",{class:"sui-mono",children:r.identifier},void 0,!1,void 0,this)," ",l("span",{class:"lin-ellipsis",children:r.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),l(ie,{label:"Change issue",variant:"ghost",size:"xs",onClick:()=>a(!0)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),l("div",{class:"lin-grow",children:l(St,{label:"Comment",value:d,onChange:m,multiline:!0,rows:8,placeholder:"Write a comment. Markdown works."},void 0,!1,void 0,this)},void 0,!1,void 0,this),l("div",{class:"lin-form-foot",children:[l(ie,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>{R.close()}},void 0,!1,void 0,this),l(ie,{label:"Post comment",size:"sm",disabled:!d.trim(),loading:f,onClick:()=>{h()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var ba=(e,t)=>e.name.localeCompare(t.name),Sl=(e)=>Ae(`team-people:${e}`,async()=>(await H(Ks,{teamId:e})).team),gl=()=>Ae("workspace-labels",async()=>(await H(zs)).issueLabels.nodes.filter((e)=>!e.team).map(({team:e,...t})=>t)),Rn=(e)=>Se(e?`pickers:${e}`:null,async()=>{let[t,n]=await Promise.all([Sl(e),gl()]),o=new Set,r=[...t.labels.nodes,...n].filter((s)=>o.has(s.id)?!1:(o.add(s.id),!0)).sort(ba);return{members:t.members.nodes.filter((s)=>s.active).sort(ba),labels:r}}),dr=(e,t)=>Se(e?`open-cycles:${e}`:null,async()=>(await H(Ys,{teamId:e,minNumber:t??0})).team.cycles.nodes.filter((o)=>o.isActive||o.isFuture).sort((o,r)=>o.number-r.number));var ur=({label:e})=>l(an,{children:[l("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this);var Aa=({teamId:e,chosen:t,onChange:n,startOpen:o=!1})=>{let[r,s]=x(o),[i,a]=x(""),d=Rn(r?e:null),m=new Set(t.map((h)=>h.id)),f=new Map([...d.data?.labels??[],...t].map((h)=>[h.id,h])),E=i.trim().toLowerCase(),_=[...f.values()].filter((h)=>!E||h.name.toLowerCase().includes(E)).sort((h,T)=>Number(m.has(T.id))-Number(m.has(h.id))||h.name.localeCompare(T.name)),u=(h)=>n(m.has(h.id)?t.filter((T)=>T.id!==h.id):[...t,h]);return l("div",{class:"lin-stack lin-stack--tight",children:[l("div",{class:"sui-row",children:[t.map((h)=>l(ur,{label:h},h.id,!1,void 0,this)),l(ie,{label:r?"Done":t.length?"Edit labels":"Add label",variant:"ghost",size:"xs",onClick:()=>s(!r)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),r&&l("div",{class:"lin-label-picker",children:[l(it,{value:i,onChange:a,placeholder:"Find a label"},void 0,!1,void 0,this),l("div",{class:"lin-label-list",children:[!d.data&&l("span",{class:"sui-muted sui-small",children:"Loading labels"},void 0,!1,void 0,this),_.map((h)=>l("div",{class:"lin-label-option",children:[l("span",{class:"lin-swatch",style:{background:h.color}},void 0,!1,void 0,this),l(Hs,{label:h.name,checked:m.has(h.id),onChange:()=>u(h)},void 0,!1,void 0,this)]},h.id,!0,void 0,this)),d.data&&!_.length&&l("span",{class:"sui-muted sui-small",children:"No label matches."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var fe="__none__",ka=({teamIds:e,projectId:t=null,initial:n,draft:o,onCreated:r,onEscape:s,rows:i=6})=>{let a=hn().data,d=ye(()=>{let P=a?.teams??[],Ce=new Set([...e,...a?.myTeamIds??[]]);return[...P.filter((tt)=>Ce.has(tt.id)),...P.filter((tt)=>!Ce.has(tt.id))]},[a,e]),[m,f]=x(e[0]??d[0]?.id??""),E=a?.teamsById.get(m),_=ye(()=>[...a?.statesByTeam.get(m)??[]].sort(kt),[a,m]),[u,h]=x(n?.title??""),[T,I]=x(n?.description??""),[b,y]=x({title:!1,description:!1}),[O,A]=x(fe),[B,te]=x("0"),[N,L]=x(fe),[q,K]=x(fe),[M,S]=x(fe),[g,Ee]=x(t??fe),[Ie,Pe]=x([]),[j,ae]=x(!1);W(()=>{if(!o)return;if(!b.title)h(o.title);if(!b.description)I(o.description)},[o]),W(()=>{A(Ni(E,_)?.id??_[0]?.id??fe),L(fe),K(fe),S(fe),Pe([])},[m,_.length]);let me=Rn(m||null),et=dr(E?.cyclesEnabled?m:null,E?.activeCycle?.number),z=gt(m?[m]:[]),ut=rr(E),pe=!j&&Boolean(u.trim())&&Boolean(m),Q=async()=>{if(!pe)return;ae(!0);try{let P=await Ii({teamId:m,title:u.trim(),...T.trim()?{description:T}:{},...O!==fe?{stateId:O}:{},priority:Number(B),...N!==fe?{assigneeId:N}:{},...q!==fe?{estimate:Number(q)}:{},...M!==fe?{cycleId:M}:{},...g!==fe?{projectId:g}:{},...Ie.length?{labelIds:Ie.map((Ce)=>Ce.id)}:{}});await se(R,"success",`Created ${P.identifier}`),r(P)}catch(P){await se(R,"error",Ue(P)),ae(!1)}},ne=[{id:fe,label:"No project"},...t&&!(z.data??[]).some((P)=>P.id===t)?[{id:t,label:"This folder's project"}]:[],...(z.data??[]).map((P)=>({id:P.id,label:P.name}))];return{body:l("div",{onKeyDown:(P)=>{if(P.stopPropagation(),P.key==="Enter"&&(P.metaKey||P.ctrlKey))Q();if(P.key==="Escape")s?.()},class:"lin-stack lin-form",children:[l("div",{class:"lin-field-row",children:l(Re,{value:m,searchable:d.length>8,options:d.map((P)=>({id:P.id,label:P.name,hint:P.key})),onChange:f},void 0,!1,void 0,this)},void 0,!1,void 0,this),l(St,{value:u,onChange:(P)=>{y((Ce)=>({...Ce,title:!0})),h(P)},placeholder:"Issue title",label:"Title"},void 0,!1,void 0,this),l("div",{class:"lin-grow",children:l(St,{value:T,onChange:(P)=>{y((Ce)=>({...Ce,description:!0})),I(P)},multiline:!0,rows:i,placeholder:"Add a description. Markdown works. Cmd+Enter creates.",label:"Description"},void 0,!1,void 0,this)},void 0,!1,void 0,this),l("div",{class:"lin-field-row",children:[l(Re,{value:O,options:_.map((P)=>({id:P.id,label:P.name})),onChange:A},void 0,!1,void 0,this),l(Re,{value:B,options:[0,1,2,3,4].map((P)=>({id:String(P),label:P?Zo[P]:"No priority"})),onChange:te},void 0,!1,void 0,this),l(Re,{value:N,searchable:!0,options:[{id:fe,label:"No assignee"},...(me.data?.members??[]).map((P)=>({id:P.id,label:P.name}))],onChange:L},void 0,!1,void 0,this),ut.length>0&&l(Re,{value:q,options:[{id:fe,label:"No estimate"},...ut.map((P)=>({id:String(P),label:Sn(P,E?.issueEstimationType)??String(P)}))],onChange:K},void 0,!1,void 0,this),E?.cyclesEnabled&&l(Re,{value:M,options:[{id:fe,label:"No cycle"},...(et.data??[]).map((P)=>({id:P.id,label:`Cycle ${P.number}`,hint:P.isActive?"Current":"Upcoming"}))],onChange:S},void 0,!1,void 0,this),l(Re,{value:g,searchable:!0,options:ne,onChange:Ee},void 0,!1,void 0,this)]},void 0,!0,void 0,this),m&&l(Aa,{teamId:m,chosen:Ie,onChange:Pe},void 0,!1,void 0,this)]},void 0,!0,void 0,this),submit:()=>{Q()},canSubmit:pe,busy:j}};var Ra=async(e)=>{try{let{text:t}=await R.generate({prompt:e,system:ca,maxOutputTokens:1500});return _a(t)}catch(t){if(t instanceof v)return ar(t.code,t.message);return ar(void 0,t instanceof Error?t.message:"")}};var Oa=(e)=>{let[t,n]=x(e?{kind:"working"}:{kind:"idle"}),[o,r]=x(0);return W(()=>{let s=!0;if(!e){n({kind:"idle"});return}return n({kind:"working"}),(async()=>{let i=await e.build().catch(()=>({prompt:null,note:"Could not read what to draft from."}));if(!s)return;if(!i.prompt){n({kind:"nothing",note:i.note??"There is nothing to draft from."});return}let a=await Ra(i.prompt);if(!s)return;n(a.kind==="draft"?{kind:"draft",draft:e.finish(a.draft)}:a)})(),()=>{s=!1}},[e?.key,o]),{state:t,retry:()=>r((s)=>s+1)}};var xl=({state:e,retry:t})=>{if(e.kind==="idle")return null;if(e.kind==="working")return l("div",{class:"lin-draft-note",children:l(he,{size:"sm",label:"Drafting with the Small Model. You can start typing; your words stay."},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(e.kind==="draft")return l("div",{class:"lin-draft-note sui-muted sui-small",children:"Drafted by the Small Model. Check it before you create the issue."},void 0,!1,void 0,this);if(e.kind==="nothing")return l("div",{class:"lin-draft-note sui-muted sui-small",children:e.note},void 0,!1,void 0,this);if(e.kind==="no-model")return l(Oe,{tone:"info",title:"No Small Model is set up",body:"Choose one in OpenChamber's settings to have issues drafted for you. The form is empty for now."},void 0,!1,void 0,this);return l(Oe,{tone:"warning",title:"Could not draft the issue",body:`${e.message} The form is empty.`,action:{label:"Try again",onClick:t}},void 0,!1,void 0,this)},pr=({job:e,scope:t,hidden:n=!1})=>{let{state:o,retry:r}=Oa(e),[s,i]=x(null),a=ka({teamIds:t.teamIds,projectId:t.projectId,...e?.initial?{initial:e.initial}:{},draft:o.kind==="draft"?o.draft:null,onCreated:i,onEscape:()=>{R.close()},rows:8});if(s)return l(An,{title:"Issue created",issue:s,canLink:!0},void 0,!1,void 0,this);return l("div",{class:"lin-dialog-body",hidden:n,children:[e&&l(ke,{children:[l("h2",{class:"lin-dialog-title",children:"Create Linear issue"},void 0,!1,void 0,this),l("div",{class:"lin-source",children:[l("span",{class:"sui-muted sui-small",children:e.source},void 0,!1,void 0,this),e.quote&&l("span",{class:"lin-quote sui-small",children:e.quote},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),l(xl,{state:o,retry:r},void 0,!1,void 0,this),a.body,l("div",{class:"lin-form-foot",children:[l(ie,{label:"Cancel",variant:"ghost",size:"sm",onClick:()=>{R.close()}},void 0,!1,void 0,this),l(ie,{label:a.busy?"Creating...":"Create issue",size:"sm",disabled:!a.canSubmit,onClick:a.submit},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Ia=(e,t,n,o)=>{let r=ye(()=>t?Hi(e,t,t.team.states.nodes,n):null,[e,t,n]),[s,i]=x(null),[a,d]=x(null),m=r?.options??[],f=m.find((u)=>u.id===s)??r?.target??null,E=a??Boolean(r?.moves&&o),_=Boolean(t&&f&&E&&f.id!==t.state.id);return{options:m,selected:f,move:_,select:(u)=>{if(i(u),t&&u!==t.state.id)d(!0)},toggle:d}},Ca=({choice:e,disabled:t})=>l("div",{class:"lin-move-row",children:[l(ln,{label:"Move the issue to",checked:e.move,disabled:t||e.options.length===0,onChange:e.toggle},void 0,!1,void 0,this),e.options.length>0&&l(Re,{value:e.selected?.id??null,options:e.options.map((n)=>({id:n.id,label:n.name})),disabled:t,onChange:e.select},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var fr=async(e,t,n=!1)=>{let{plan:o,isPlan:r}=await Tn({source:t,identifier:e.identifier});if(!r&&!n)throw Error(Pi);let s=(await H(lt,{id:e.identifier})).issue,i=vi(s.description,o);if(i===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);await xt(s,{input:{description:i},patch:{description:i}})};var va=async(e,t,n)=>{let o=!1;if(n.post)await fr(e,t,n.force),o=!0;let r=await ji({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force}),s=n.state??or(e,e.team.states.nodes,n.lastState),i=!1,a=null;if(n.move&&s)try{await xt(e,{input:{stateId:s.id},patch:{state:s}}),i=!0}catch(d){a=Ue(d)}return{sessionId:r.sessionId,target:s,moved:i,moveError:a,posted:o}};var On=(e)=>e instanceof Error?e.message:String(e),Al=(e)=>e.replace(/\/+$/,"").split("/").pop()||e,wa=({identifier:e,source:t,detail:n,onClose:o,onDone:r,fill:s})=>{let[i,a]=x(n??null),[d,m]=x(null),[f,E]=x(!0),[_,u]=x(null),[h,T]=x(!1),[I,b]=x(null),[y,O]=x(null),[A,B]=x(null),[te,N]=x(null),[L,q]=x(!1),[K,M]=x(!1),[S,g]=x(!1),Ee=Ia("build",i,_,f);if(W(()=>{let j=!0;return B(null),N(null),Tn({source:t,identifier:e}).then((ae)=>{if(j)B(ae),q(ae.postPlan)},(ae)=>{if(j)N(On(ae))}),()=>{j=!1}},[e,t.sessionId]),W(()=>{let j=!0;return Promise.all([n?Promise.resolve(n):H(lt,{id:e}).then((ae)=>ae.issue),Wo().catch(()=>!0)]).then(([ae,me])=>{if(!j)return;a(ae),E(me),Ko(ae.team.id).then((et)=>{if(j)u(et)},()=>{return})},(ae)=>{if(j)m(On(ae))}),()=>{j=!1}},[e,n]),y)return l("div",{class:"lin-build","data-state":"started",children:l("div",{class:"sui-small",children:y},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(d)return l(Oe,{tone:"error",title:"Could not read the issue",body:d,action:{label:"Close",onClick:o}},void 0,!1,void 0,this);if(!i)return l(he,{label:"Reading the issue"},void 0,!1,void 0,this);let Ie=async()=>{T(!0),b(null);try{await fr(i,t,S),Ye("issue"),await se(R,"success",`Added the plan to ${i.identifier}.`),M(!0)}catch(j){b(On(j))}finally{T(!1)}},Pe=async()=>{T(!0),b(null);try{let j=await va(i,t,{move:Ee.move,post:L&&Boolean(A),force:S,state:Ee.selected,lastState:_});if(j.moved&&j.target)zo(i.team.id,j.target.name).catch(()=>{return});if(j.moveError)await se(R,"error",`Build started, but ${i.identifier} was not moved: ${j.moveError}`);let ae=`${j.posted?"Added the plan to the issue and started":"Started"} a build for ${i.identifier}${j.moved?` and moved it to ${j.target.name}`:""}.`;if(await se(R,"success",ae),O(ae),j.moved)Ye("block:");await Bi(j.sessionId),r?.()}catch(j){b(On(j))}finally{T(!1)}};return l("div",{class:s?"lin-build lin-build--fill":"lin-build","data-state":"options",children:[l("div",{class:"sui-small",children:["Builds from the last reply in ",l("strong",{children:t.title},void 0,!1,void 0,this),t.agent?` (${t.agent} agent)`:"",", in ",Al(t.directory),", as a new session. It uses the folder's build agent and model from Settings."]},void 0,!0,void 0,this),te&&l(Oe,{tone:"warning",title:"The plan cannot be read yet",body:te},void 0,!1,void 0,this),A&&!A.isPlan&&l(Oe,{tone:"warning",title:"The last reply is not a plan",body:'Ask the planning session: "Repeat the final plan in full, unchanged, as your last message. No question cards." Then reopen this. Writing or building from a chat answer would put the wrong text in the issue and the build.',action:S?void 0:{label:"Use it anyway",onClick:()=>g(!0)}},void 0,!1,void 0,this),A?.earlier&&l("div",{class:"sui-muted sui-small",children:"The last reply in that session is not the plan, so this is the latest reply that was."},void 0,!1,void 0,this),A&&l("pre",{class:"lin-build-plan",children:s?A.plan.trim():wi(A.plan)},void 0,!1,void 0,this),I&&l(Oe,{tone:"error",title:"Could not start the build",body:I},void 0,!1,void 0,this),l(ln,{label:"Add the plan to the issue description first",description:L?`A plan section at the end of ${i.identifier}'s description, replaced if one is already there. Then the build starts.`:void 0,checked:L&&Boolean(A),disabled:!A||h,onChange:q},void 0,!1,void 0,this),l(Ca,{choice:Ee,disabled:h},void 0,!1,void 0,this),l("div",{class:"sui-row",children:[l(ie,{label:h?"Starting...":L&&A?"Add plan and build":"Start build",size:"sm",disabled:h||!A||!A.isPlan&&!S,onClick:()=>{Pe()}},void 0,!1,void 0,this),l(ie,{label:K?"Plan added":"Add plan only",variant:"outline",size:"sm",disabled:h||!A||!A.isPlan&&!S,onClick:()=>{Ie()}},void 0,!1,void 0,this),l(ie,{label:"Cancel",variant:"ghost",size:"sm",disabled:h,onClick:o},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var kl=async(e,t)=>{let n=e.directory??t,o={sessionId:e.sessionId,directory:n??"",title:e.sessionTitle,agent:null,inWorktree:!1,updatedAt:0},r=[],s=o,i=[];for(let m of[e.directory,t]){if(!m)continue;let f=await dt(Qe,m);if(!f.ocProjectId)continue;let E=(await R.listSessions(f.ocProjectId).catch(()=>{return}))?.sessions.find((_)=>_.id===e.sessionId);if(!E)continue;s=Ci(E),r.push(...At(E));break}let a=await Fe(R,"GET","/plans",{query:{sessionId:e.sessionId},name:"Linear"}),d=a.ok===!1?[]:a.sessions;if(Array.isArray(d))for(let m of d){let f=m.identifier;if(typeof f==="string"&&!i.includes(f))i.push(f)}return{source:s.directory?s:{...s,directory:n??""},identifiers:[...i,...r.filter((m)=>!i.includes(m))]}},Pa=({item:e,directory:t})=>{let[n,o]=x(null),[r,s]=x(null);if(W(()=>{let i=!0;return kl(e,t).then((a)=>{if(i)o(a),s(a.identifiers[0]??null)},()=>{if(i)o({source:{sessionId:e.sessionId,directory:"",title:e.sessionTitle,agent:null,inWorktree:!1,updatedAt:0},identifiers:[]})}),()=>{i=!1}},[e.sessionId]),!n)return l("div",{class:"lin-center",children:l(he,{label:"Looking for the issue"},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(!r||!n.source.directory)return l(cn,{title:"This session has no Linear issue",body:"Start the plan from the issue with Start plan, or link the issue to this session from the + menu, then try again.",action:{label:"Close",onClick:()=>{R.close()}}},void 0,!1,void 0,this);return l("div",{class:"lin-build-dialog",children:[l("h2",{class:"lin-modal-title",children:"Start a build from this plan"},void 0,!1,void 0,this),n.identifiers.length>1&&l(Re,{value:r,options:n.identifiers.map((i)=>({id:i,label:i})),onChange:s,label:"Issue"},void 0,!1,void 0,this),l(wa,{fill:!0,identifier:r,source:n.source,onClose:()=>{R.close()},onDone:()=>{R.close()}},r,!1,void 0,this)]},void 0,!0,void 0,this)};var Ma=({teamIds:e,projectIds:t,activeId:n,teamsOfProject:o})=>{let r=n&&t.includes(n)?n:t.length===1?t[0]:null,s=[],i=(a)=>{if(!s.includes(a))s.push(a)};if(n&&e.includes(n))i(n);if(r)for(let a of o(r))i(a);for(let a of e)i(a);for(let a of t)for(let d of o(a))i(d);return{teamIds:s,projectId:n&&e.includes(n)?null:r}};var Rl=(e)=>{if(!e)return"none";if(!("kind"in e)||!("action"in e))return`chip:${e.id??""}`;return`${e.kind}:${e.action}:${"messageId"in e?e.messageId:("sessionId"in e)?e.sessionId:("path"in e)?`${e.path}`:""}`},Ol=({scope:e,projectIds:t,teamIds:n,hasSession:o})=>{let[r,s]=x(o?"create":"attach");return l("div",{class:"lin-dialog-body",children:[l(Gs,{items:[{id:"create",label:"Create issue"},{id:"attach",label:"Attach"}],activeId:r,onChange:(i)=>s(i)},void 0,!1,void 0,this),l(pr,{job:null,scope:e,hidden:r!=="create"},void 0,!1,void 0,this),r==="attach"&&l(na,{scope:e,projectIds:t,teamIds:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Ua=({ctx:e})=>{let t=hn(),n=yi(e.directory,t.data),o=e.item,r=Rl(o),s=ye(()=>Sa(o,{readFile:(d)=>R.readFile(d).then((m)=>m?.content??null,()=>null),sessionTitle:e.session?.title??null}),[r]);if(t.error&&!t.data){let d=t.error instanceof ue?t.error:new ue("network",String(t.error));if(d.kind==="disconnected")return l("div",{class:"lin-dialog",children:l(cn,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber, then open this again.",action:{label:"Connect Linear",onClick:()=>{R.oauthStart()}}},void 0,!1,void 0,this)},void 0,!1,void 0,this);return l("div",{class:"lin-dialog",children:l(Oe,{tone:"error",title:"Could not load Linear",body:d.message,action:{label:"Retry",onClick:()=>t.refresh()}},void 0,!1,void 0,this)},void 0,!1,void 0,this)}if(!t.data||!n.settled)return l("div",{class:"lin-center",children:l(he,{label:"Loading Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let i=Ma({teamIds:n.detection.teamIds,projectIds:n.detection.projectIds,activeId:n.detection.mapping?.activeProjectId,teamsOfProject:(d)=>pn(d)?.teams.nodes.map((m)=>m.id)??[]}),a;if(s)a=l(pr,{job:s,scope:i},s.key,!1,void 0,this);else if(o&&"kind"in o&&o.kind==="message"&&o.action==="comment-on-issue")a=l(ya,{item:o,directory:e.directory},r,!1,void 0,this);else if(o&&"kind"in o&&o.kind==="session"&&o.action===lr)a=l(Pa,{item:o,directory:e.directory},r,!1,void 0,this);else if(o&&"providerId"in o)a=l(oa,{item:o},void 0,!1,void 0,this);else a=l(Ol,{scope:i,projectIds:n.detection.projectIds,teamIds:n.detection.teamIds,hasSession:Boolean(e.session)},void 0,!1,void 0,this);return l("div",{class:"lin-dialog",children:a},void 0,!1,void 0,this)};var Il=()=>{let e=Ls();if(!e)return l("div",{class:"lin-center",children:l(he,{label:"Loading"},void 0,!1,void 0,this)},void 0,!1,void 0,this);return l(Ua,{ctx:e},void 0,!1,void 0,this)};wr(l(Il,{},void 0,!1,void 0,this),document.getElementById("root"));})();

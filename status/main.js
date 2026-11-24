(()=>{var N,Zr,_a,Me,dn,ht,eo,mt,to,pn,un,ma,Ye=Symbol.for("pv"),Tt={},yt=[],Ea=/^m(i|n|o|s|text|space)$/,fn=Array.isArray,no=yt.slice,Le=Object.assign;function Ne(e){e&&e.parentNode&&e.remove()}function Et(e,t,n,r,o){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Ye,__v:o||++Zr,__i:-1,__u:0};return!o&&N.vnode&&N.vnode(s),s}function ge(e){return e.children}function St(e,t){this.props=e,this.context=t,this.__g=0}function Ue(e,t){if(t==null)return e.__&&Ue(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:Ue(e)}function Sa(e){var t,n=e.__v,r=n.__e,o=[],s=[],i=e.__P;i&&((t=Le({constructor:Ye},n)).__v=n.__v+1,N.vnode&&N.vnode(t),_n(i,t,n,e.__n,i.namespaceURI,32&n.__u?[r]:null,o,r||Ue(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,co(o,t,s),n.__=n.__e=null,t.__e!=r&&ro(t))}function ro(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),ro(e)}function Yr(e){(8&e.__g||(e.__g|=8,Me.push(e),ht++))&&dn==N.debounceRendering||((dn=N.debounceRendering)||queueMicrotask)(oo)}function oo(){try{for(var e,t=1;Me.length;)Me.length>t&&Me.sort(eo),e=Me.shift(),t=Me.length,8&e.__g&&Sa(e)}finally{(ht=Me.length)&&(dn||queueMicrotask)(oo)}}function so(e,t,n,r,o,s,i,a,p,f,d){var _,m,u,h,R,b,y=r.__k||yt,T=t.length;for(p=ga(n,t,y,p,T),_=0;_<T;_++)(u=n.__k[_])!=null&&(m=~u.__i&&y[u.__i]||Tt,u.__i=_,b=_n(e,u,m,o,s,i,a,p,f,d),h=u.__e,(m.ref!=u.ref||8&m.__u)&&(m.ref&&mn(m.ref,null,u,m),u.ref&&d.push(u.ref,u.__c||h,u)),R=R||h,4&u.__u?(p=io(u,p,e,!m.__v),m.__e&&(m.__e=null)):typeof u.type=="function"&&b!==void 0?p=b:h&&(p=h.nextSibling),u.__u&=-21);return n.__e=R,p}function ga(e,t,n,r,o){var s,i,a,p,f,d,_,m,u,h=n.length,R=h,b=0,y=0,T=e.__k=Array(o);for(s=0;s<o;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=T[s]=Et(null,i):fn(i)?i=T[s]=Et(ge,{children:i}):i.constructor===Ye&&i.__b?i=T[s]=Et(i.type,i.props,i.key,i.ref,i.__v):T[s]=i,p=s+b,i.__=e,i.__b=e.__b+1,a=null,~(f=i.__i=ha(i,n,p,R))&&(R--,(a=n[f])&&(a.__u|=2)),a&&a.__v?(i.__u|=16,f==p-1?b--:f==p+1?b++:f!=p&&(f>p?b--:b++,y=1)):(~f||(o>h?b--:o<h&&b++),typeof i.type!="function"&&(i.__u|=4))):T[s]=null;if(y){for(d=[],_=[],s=0;s<o;s++)if((i=T[s])&&16&i.__u){for(b=0,m=d.length;b<m;)d[u=b+m>>1]<i.__i?b=u+1:m=u;d[b]=i.__i,_[s]=b+1}for(b=d.length;s--;)_[s]&&(_[s]==b?b--:T[s].__u|=4)}if(R)for(s=0;s<h;s++)!(a=n[s])||2&a.__u||(a.__e==r&&(r=Ue(a)),En(a,a));return r}function io(e,t,n,r){var o,s,i,a;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=io(o[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=Ue(e))&&!t.parentNode&&(t=null),i=e.__e,a=t;a&&a.nodeType==8;)a=a.nextSibling;for(i!=a&&(!r&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function ha(e,t,n,r){var o,{key:s,type:i}=e,a=t[n],p=a&&!(2&a.__u);if(a===null&&s==null||p&&s==a.key&&i==a.type)return n;if(r>(p?1:0)){for(o=n-1;o>=0;o--)if((a=t[o])&&!(2&a.__u)&&s==a.key&&i==a.type)return o;for(o=n+1;o<t.length;o++)if((a=t[o])&&!(2&a.__u)&&s==a.key&&i==a.type)return o}return-1}function Qr(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function _t(e,t,n,r,o){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Qr(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||Qr(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof r!="function"&&(r=null),(e.__e||(e.__e={}))[t]=n,n&&r||(i=un[t]||(un[t]=Ta(t)),(e.__a||(e.__a={}))[t]=pn,s=t!=(t=t.replace(to,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(a){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function Ta(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[mt]==null)t[mt]=pn++;else if(t[mt]<this.__a[e])return;return n(N.event?N.event(t):t)}}}function _n(e,t,n,r,o,s,i,a,p,f){var d,_,m,u,h,R,b,y,T,k,v,X,Z,ee,O,se,ie,Y,S=t.type;if(t.constructor!==Ye)return null;128&n.__u&&(p=32&n.__u,d=n.__c.__z)&&(t.__u|=p,_=s=[],d.nodeType==8?a=gt(d,s):s.push(d),a=s[0]||a),(d=N.__b)&&d(t);e:if(typeof S=="function"){m=i.length;try{if(y=t.props,T=(d=S.prototype)&&d.render,k=(d=S.contextType)&&r[d.__c],v=d?k?k.props.value:d.__:r,(u=n.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(T?t.__c=u=new S(y,v):(t.__c=u=new St(y,v),u.constructor=S,u.render=xa),k&&k.sub(u),u.state||(u.state={}),u.__n=r,u.__g|=8,u.__h=[],u.__k=[]),T&&(u.__s||(u.__s=u.state),S.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=Le({},u.__s)),Le(u.__s,S.getDerivedStateFromProps(y,u.__s)))),h=u.props,R=u.state,u.__v=t,n.__c){if(y!==h&&T&&!S.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(y,v),t.__v==n.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(y,u.__s,v)===!1){t.__v!=n.__v&&(u.props=y,u.state=u.__s,u.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(g){g&&(g.__=t)}),yt.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),a=Ue(n);break e}u.componentWillUpdate&&u.componentWillUpdate(y,u.__s,v),T&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(h,R,b)})}else T&&!S.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),T&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=v,u.props=y,u.__P=e,u.__g&=-5,X=N.__r,Z=T?25:0;do u.__g&=-9,X&&X(t),d=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++Z<25);T&&(yt.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(r=Le({},r,u.getChildContext())),T&&n.__c&&u.getSnapshotBeforeUpdate&&(b=u.getSnapshotBeforeUpdate(h,R)),ee=d&&d.type===ge&&d.key==null?d.props.children:d,y.__P&&(d=a,o=(e=y.__P).namespaceURI,p=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(g){g&&En(g,g)}),n.__k=null),a=n.__k?Ue(n,0):null),a=so(e,fn(ee)?ee:[ee],t,n,r,o,s,i,a,p,f),y.__P&&(t.__e=null,a=d),t.__u&=-161,_&&_.some(Ne),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(g){if(i.length=m,t.__v=null,p||s)if(g&&g.then){if(t.__u|=128|p,s){for(~(ie=s.indexOf(a||void 0))||(ie=s.length);(Y=s[ie-1])&&Y.nodeType==8;)ie--;for(;ie<s.length;ie++)if(Y=s[ie])if(s[ie]=null,O){if(Y==se)break}else{if(Y.nodeType!=8)break;Y.data.startsWith("$s")&&(se=gt(O=Y))}}if(!O){for(;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;O=a}(d=gt(O=t.__c.__z||(t.__c.__z=O)))?(t.__e=O,a=d):t.__e=a,a=a&&a.nextSibling}else s&&s.some(Ne);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),g&&g.then||ao(t),N.__e(g,t,n)}}else a=t.__e=ya(n.__e,t,n,r,o,s,i,p,f,e);return(d=N.diffed)&&d(t),a}function gt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function ao(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(ao))}function co(e,t,n){for(var r=0;r<n.length;)mn(n[r++],n[r++],n[r++]);N.__c&&N.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){N.__e(s,o.__v)}})}function ya(e,t,n,r,o,s,i,a,p,f){var d,_,m,u,h,R,b,y,T=n.props||Tt,{props:k,type:v}=t;if(v=="svg"?o="http://www.w3.org/2000/svg":v=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(d=0;d<s.length;d++)if((h=s[d])&&(v?h.localName==v:h.nodeType==3)){e=h,s[d]=null;break}}if(!e){if(y=f.ownerDocument||document,!v)return y.createTextNode(k);e=y.createElementNS(o,v,k.is?k:f),a&&(N.__m&&N.__m(t,s),a=!1),s=null}if(v){if(f=v=="template"&&e.content||e,s=v=="textarea"&&k.defaultValue!=null?null:s&&no.call(f.childNodes),!a&&s)for(T={},d=0;d<e.attributes.length;d++)T[(h=e.attributes[d]).name]=h.value;for(d in T)h=T[d],d=="dangerouslySetInnerHTML"?m=h:d=="children"||(d in k)||d=="value"&&("defaultValue"in k)||d=="checked"&&("defaultChecked"in k)||_t(e,d,null,h,o);for(d in k)h=k[d],d=="children"?u=h:d=="dangerouslySetInnerHTML"?_=h:d=="value"?R=h:d=="checked"?b=h:a&&typeof h!="function"||T[d]===h||_t(e,d,h,T[d],o);_?(a||m&&(_.__html==m.__html||_.__html==e.innerHTML)||(e.innerHTML=_.__html),t.__k=[]):(m&&(e.textContent=""),(v=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&Ea.test(v))&&(o="http://www.w3.org/1999/xhtml"),so(f,fn(u)?u:[u],t,n,r,o,s,i,s?s[0]:n.__k&&Ue(n,0),a,p),s&&s.some(Ne)),a&&v!="textarea"||(d="value",v=="progress"&&R==null?e.removeAttribute(d):R==null||R===e[d]&&(v!="progress"||R)||_t(e,d,R,T[d],o),d="checked",b!=null&&b!=e[d]&&_t(e,d,b,T[d],o))}else T===k||a&&e.data==k||(e.data=k);return e}function mn(e,t,n,r){try{typeof e=="function"?t?t.__x=e(t)||1:r&&(r=r.__c||r.__e)&&(t=r.__x)&&(r.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){N.__e(o,n)}}function En(e,t,n){var r,o,s,i;if(N.unmount&&N.unmount(e),!(r=e.ref)||r.current&&r.current!=e.__e||mn(r,null,t,e),r=e.__c){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(a){N.__e(a,t)}r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&En(r[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(r=e.__c)&&(r=r.__z)&&(o=gt(r,s=[]))&&(r==e.__e&&s.some(Ne),Ne(o),Ne(r)),n||Ne(e.__e),e.__e=e.__c=e.__=null}function xa(e,t,n){return this.constructor(e,n)}function lo(e,t){var n,r,o,s;N.__&&N.__(e,t),t.nodeType==9&&(t=t.documentElement),r=(n=e&&32&e.__u)?null:t.__k,t.__k=Et(ge,{children:[e]}),o=[],s=[],_n(t,t.__k,r||Tt,Tt,t.namespaceURI,r?null:t.firstChild?no.call(t.childNodes):null,o,r?r.__e:t.firstChild,n,s),co(o,t.__k,s),t.__k.props.children=null}N={__e:function(e,t,n,r){for(var o,s,i;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((i=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,r||{}),i=1),i&&8&o.__g)return void(o.__g|=2)}catch(a){e=a}}throw ht=0,e}},Zr=0,_a=function(e){return e!=null&&e.constructor===Ye},St.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=Le({},this.state)),typeof e=="function"&&(e=e(Le({},n),this.props)),e&&(Le(n,e),this.__v&&(t&&this.__k.push(t),Yr(this)))},St.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Yr(this))},St.prototype.render=ge,Me=[],ht=0,eo=function(e,t){return e.__v.__b-t.__v.__b},mt=Symbol(),to=/(PointerCapture)$|Capture$/i,pn=0,un={},ma=0;var Ze,oe,Sn,uo,gn=Object.is,et=0,To=[],hn=[],re=N,{__b:po,__r:fo,diffed:_o,__c:mo,unmount:Eo,__:So}=re;function yn(e,t){re.__h&&re.__h(oe,e,et||t),et=0;var n=oe.__H||(oe.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function z(e){return et=1,Aa(xo,e)}function Aa(e,t,n){var r=yn(Ze++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):xo(void 0,t),function(s){var i=(r.__N||r.__)[0],a=r.t(i,s);gn(i,a)||(r.__N=[a,r.__[1]],r.__c.setState({}))}],r.__c=oe,!oe.__f)){oe.__f=!0;var o=oe.shouldComponentUpdate;oe.shouldComponentUpdate=function(s,i,a){var p=this.__H;if(!p)return!0;var f=!1,d=this.props!=s;if(p.__.some(function(m){m.__N&&(f=!0,gn(m.__[0],m.__N[0])||(d=!0))}),o){var _=o.call(this,s,i,a);return f?_||d:_}return!f||d}}return r.__}function K(e,t){var n=yn(Ze++,3);!re.__s&&yo(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,oe.__H.__h.push(n))}function Te(e){return et=5,De(function(){return{current:e}},[])}function De(e,t){var n=yn(Ze++,7);return yo(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function Ie(e,t){return et=8,De(function(){return e},t)}function Oa(){var e;do{for(;e=hn.shift();)try{Qe(e)}catch(n){re.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=To.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Qe),t.__h.some(Tn),t.__h=[]}catch(n){t.__h=[],re.__e(n,e.__v)}}}while(hn.length)}re.__b=function(e){oe=null,po&&po(e)},re.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),So&&So(e,t)},re.__r=function(e){fo&&fo(e),Ze=0;var t=(oe=e.__c).__H;t&&(Sn==oe?oe.__h=[]:(t.__h.some(Qe),t.__h.some(Tn),Ze=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),Sn=oe},re.diffed=function(e){_o&&_o(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&ho(To.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),Sn=oe=null},re.__c=function(e,t){t.some(function(n){try{n.__h.some(Qe),n.__h=n.__h.filter(function(r){return!r.__||Tn(r)})}catch(r){n.__h=[function(){throw r}]}}),mo&&mo(e,t)},re.unmount=function(e){Eo&&Eo(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{if(o.__P&&o.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}o.__P=n,ho(hn.push(o))}else Qe(o)}catch(s){t=s}}),r.__H=void 0,t&&re.__e(t,r.__v))};var go=typeof requestAnimationFrame=="function";function Ra(e){var t,n=function(){clearTimeout(r),go&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);go&&(t=requestAnimationFrame(n))}function ho(e){e!=1&&uo==re.requestAnimationFrame||((uo=re.requestAnimationFrame)||Ra)(Oa)}function Qe(e){var t=oe,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),oe=t}function Tn(e){var t=oe;e.__c=e.__(),oe=t}function yo(e,t){return!e||e.length!=t.length||t.some(function(n,r){return!gn(n,e[r])})}function xo(e,t){return typeof t=="function"?t(e):t}var Ia=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},Ao=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),ba=(e,t)=>{let n=e;for(let r of t){if(n===null||n===void 0)return;n=n[r]}return n},xn=(e,t)=>{let n=(r,o)=>{if(typeof r==="function")return(...s)=>{let i=ba(t.current,o);return typeof i==="function"?i(...s):void 0};if(Array.isArray(r))return r.map((s,i)=>n(s,[...o,i]));if(Ia(r))return Object.fromEntries(Object.entries(r).map(([s,i])=>[s,n(i,[...o,s])]));return r};return n(e,[])};var ka=Symbol.for("pv"),Ca=0;function E(e,t,n,r,o,s){t||(t={});var i,a,p=t;if("ref"in p&&typeof e!="function")for(a in p={},t)a=="ref"?i=t[a]:p[a]=t[a];var f={type:e,props:p,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:ka,__v:--Ca,__i:-1,__u:0};return(o||s)&&(f.__source=o,f.__self=s),N.vnode&&N.vnode(f),f}var Oo=(...e)=>e.filter(Boolean).join(" "),An=({tone:e,class:t})=>E("span",{class:Oo("sui-dot",`sui-dot--${e}`,t)},void 0,!1,void 0,this),Ro=({children:e,class:t})=>E("span",{class:Oo("sui-chip",t),children:e},void 0,!1,void 0,this);var Io=(e,t)=>{let n=Te(null),r=Te(null),o=Te(t);o.current=t;let s=Ao(t),i=Te(!1);K(()=>{if(!n.current)return;return r.current=e(n.current,xn(o.current,o)),i.current=!0,()=>{r.current?.dispose(),r.current=null,i.current=!1}},[]);let a=Te(s);return K(()=>{if(!i.current||a.current===s)return;a.current=s,r.current?.update(xn(o.current,o))},[s]),n};async function ae(e,t,n,r={}){let o=r.name??"extension",s={};for(let[i,a]of Object.entries(r.query??{}))if(a)s[i]=a;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...r.body!==void 0?{body:JSON.stringify(r.body)}:{}}),a;try{a=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${o} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&a.ok===void 0)return{ok:!1,error:String(a.message??`Error ${i.status}`),code:"failed"};return a}catch(i){let a=i.code;if(a==="NO_SERVICE")return{ok:!1,error:`Approve the ${o} service in Settings > Extensions.`,code:"failed"};if(a==="SERVICE_FAILED")return{ok:!1,error:`The ${o} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${o} service.`,code:"failed"}}}async function H(e,t,n,r={}){try{await e.toast({kind:t,message:n,...r.dismiss?{dismiss:!0}:{}})}catch{}}var Fe=new Map,va=30000,bo=(e)=>{let t=Fe.get(e);if(!t)t={at:0,listeners:new Set},Fe.set(e,t);return t},xt=(e)=>{for(let t of e.listeners)t()},$e=(e,t,n=!1)=>{let r=bo(e);if(r.promise)return r.promise;if(!n&&r.value!==void 0&&Date.now()-r.at<va)return Promise.resolve(r.value);let o=t().then((s)=>(r.value=s,r.error=void 0,r.at=Date.now(),s),(s)=>{throw r.error=s,s}).finally(()=>{r.promise=void 0,xt(r)});return r.promise=o,xt(r),o};var ko=(e)=>{let t=[];for(let[n,r]of Fe){if(r.value===void 0)continue;let o=e(n,r.value);if(o===r.value)continue;t.push([r,r.value]),r.value=o,xt(r)}return()=>{for(let[n,r]of t)n.value=r,xt(n)}},On=(e)=>{let t=Fe.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)$e(e,t.fetcher,!0).catch(()=>{return})},ue=(e)=>{for(let[t,n]of Fe){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)$e(t,n.fetcher,!0).catch(()=>{return})}},ye=(e,t)=>{let[,n]=z(0);K(()=>{if(!e)return;let o=bo(e);o.fetcher=t;let s=()=>n((i)=>i+1);return o.listeners.add(s),$e(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let r=e?Fe.get(e):void 0;return{data:r?.value,error:r?.error,loading:Boolean(r?.promise)||e!==null&&r?.value===void 0&&r?.error===void 0,refresh:()=>{if(e)$e(e,t,!0).catch(()=>{return})}}};var M="openchamber.sdk",U=1;var Rn=`
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
`;function In(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(r)=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=n.get(o);if(s!==void 0)clearTimeout(s);n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Pa=`(${In.toString()})(document);`;var bn=128,kn=65536;var At=128;var Ot=65536;var Po=/^[a-z][a-z0-9-]{0,39}$/;var Co=(e)=>Object(e)===e&&!Array.isArray(e),Cn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),wo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,vo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Mo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!Co(n)||!Po.test(n.id)||!wo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Cn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Cn(n,["kind","id","label","value","options","disabled"]))return!1;if(!vo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!Co(o)||!Cn(o,["value","label"])||!vo(o.value)||!wo(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var Uo=["{id}","{segment}","{segments+}"];var zl=new Set(Uo);var No=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Jl=new Set(No);var Rt=20000000,It=256;var wn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Lo=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var Do=/^[A-Za-z0-9_-]{1,80}$/;var $o=["left","right","top","bottom"];var Go=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!Go(o,t+1,n))return!1;return!0},vn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(vn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(vn)}return String(e)===e||Number.isFinite(e)},Pn=(e)=>{try{if(String(e.id)!==e.id||!Do.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!$o.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Go(e.data)||!vn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Un=2000;var Bo=["file","directory","other","missing"],Nn=(e)=>Boolean(e&&"sessionId"in e),Ln=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Fo=/^[0-9a-f]{7,64}$/i,Dn=(e)=>Fo.test(e),bt=500,kt=32000,jo=16000,Vo=128,Xo=200,Wo=2000,Ko=16000,zo=80,qo=200,Jo=16000;var Yo=2000;var $n=20000,Ct=1024,wt=2000000;var vt=64000,Pt=8000,Gn=4000;var Hn=960000;var Qo=999,Zo=1e4,tt=500,es=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],ts=["stopped","starting","ready","failed"],Ua=new Set(es),ns=(e)=>Ua.has(e),rs=(e)=>e&&ns(e)?e:"HOST_REJECTED",je=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(je);if(Object(e)===e)return Object.values(e).every(je);return!1},os=(e)=>je(e)&&JSON.stringify(e).length<=Jo,Ho=(e)=>e?.trim().slice(0,qo)??"",Ve=(e)=>{let t=e.id.trim().slice(0,Vo),n=e.title.trim().slice(0,Xo),r=e.url.trim().slice(0,Wo),o=e.text?.trim().slice(0,Ko),s=e.author?.trim().slice(0,zo),i=e.kind==="pull"?"pull":"issue",a={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o)a.text=o;if(s)a.author=s;if(i==="pull"){let p=Ho(e.branches?.head),f=Ho(e.branches?.base);if(p&&f)a.branches={head:p,base:f}}if(os(e.data))a.data=e.data;return a},Bn=(e)=>{let t=Ve(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Fn=(e)=>{let t={text:e.text.trim().slice(0,jo)};if(e.send)t.send=!0;return t},jn=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Qo,Math.max(0,Math.round(e)))},Vn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Zo,Math.max(0,Math.ceil(e)))};var Xe=(e)=>e.length>0&&e.length<=Ct&&!e.includes("\x00")&&!e.includes("\\");var Mt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Yo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Na=new Set(ts),Xn=(e)=>Boolean(e&&"status"in e&&Na.has(String(e.status))&&!("body"in e)),Ut=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Wn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Kn=(e)=>Boolean(e&&"written"in e&&e.written===!0),zn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),La=new Set(Bo),qn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&La.has(String(e.kind))&&Number.isFinite(e.size)),Jn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Da=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),$a=(e)=>Object(e)===e?e:null,Mn=(e)=>String(e)===e&&e.length>0,Ga=(e)=>{if(!Mn(e.id))return null;if(e.ok===!0){let t={channel:M,v:U,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Mn(e.error))return{channel:M,v:U,type:"result",id:e.id,ok:!1,error:e.error,code:rs(Mn(e.code)?e.code:void 0)};return null},Yn=(e)=>{let t=$a(e);if(!t||t.channel!==M||t.v!==U)return null;if(t.type==="result")return Ga(t);if(!Da.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var ss=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Ha=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class w extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var is=()=>Promise.reject(new w("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Nt=()=>Promise.reject(new w("BAD_PATH",`File path must be 1 to ${Ct} characters without NUL or backslash.`)),Lt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new w("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},P=(e)=>(e.value+=1,`oc-${e.value}`),Qn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new w("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((c)=>c===t.parent),r=e.requestTimeoutMs??$n,o=new Set,s=new Set,i=new Set,a=new Set,p=new Set,f=new Set,d=new Set,_=new Set,m=new Set,u=new Set,h=new Set,R=new Set,b=[],y=null,T=null,k=new Set,v=new Set,X=null,Z=null,ee=!1,O=new Map,se=new Map,ie=new Map,Y=!1,S={value:0},g=null,Re=null,qe=!1,Je=!1,Gr=null,Hr=(c)=>{if(!c)return null;return{sessionId:c.id,phase:c.busy?"started":"completed"}},_e=(c)=>{t.parent.postMessage(c,"*")},Br=()=>{if(Y||t.parent===t||R.size===0||g?.features?.lateGenerateResults!==!0)return;_e({channel:M,v:U,type:"generate-late-listen"})},W=(c,l)=>{for(let I of c)try{I(l)}catch(C){console.error(C)}},Fr=(c)=>{if(!(c instanceof MessageEvent))return;if(!n(c.source))return;let l=Yn(c.data);if(!l)return;if(l.type==="workspace"){let C=se.get(l.payload.subscriptionId);if(C)W([C],l.payload.snapshot);return}if(l.type==="shells"){let C=ie.get(l.payload.subscriptionId);if(C)W([C],l.payload.snapshot);return}if(l.type==="ready"){if(g=l.payload,Re=Hr(l.payload.session),W(o,l.payload),W(s,l.payload.directory),W(i,l.payload.session),Re)W(a,Re);if(W(p,l.payload.connection),W(f,l.payload.settings),W(d,l.payload.item),l.payload.block)W(_,l.payload.block);Br();return}if(l.type==="service-event"){W(m,l.payload);return}if(l.type==="generate-late"){if(R.size===0)b.push(l.payload);else W(R,l.payload);return}if(l.type==="directory"){if(g)g={...g,directory:l.payload.directory};W(s,l.payload.directory);return}if(l.type==="session"){if(g)g={...g,session:l.payload.session};if(!l.payload.session)Re=null;else if(Re?.sessionId!==l.payload.session.id)Re=Hr(l.payload.session);W(i,l.payload.session);return}if(l.type==="session-lifecycle"){Re=l.payload,W(a,l.payload);return}if(l.type==="connection"){if(g)g={...g,connection:l.payload.connection};W(p,l.payload.connection);return}if(l.type==="settings"){if(g)g={...g,settings:l.payload.settings};W(f,l.payload.settings);return}if(l.type==="item"){if(g)g={...g,item:l.payload.item};W(d,l.payload.item);return}if(l.type==="status-control-event"){W(u,l.payload);return}if(l.type==="popover-closed"){W(h,l.payload);return}if(l.type==="action"){let C=(G)=>{if(!Y)_e({channel:M,v:U,type:"action-result",id:l.id,payload:G})},j=T;if(!j){C({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>j(l.payload)).then(()=>C({ok:!0}),(G)=>{let ne=(G instanceof Error?G.message:String(G)).trim();C({ok:!1,error:(ne||"Action failed.").slice(0,tt)})});return}if(l.type==="file-open"){let C=l.payload;if(Z&&Lo(Z,C))return;Z=C,W(k,l.payload);return}if(l.type==="file-saved"){W(v,l.payload.version);return}if(l.type==="file-snapshot"){let C=(ne)=>{if(!Y)_e({channel:M,v:U,type:"file-snapshot-result",id:l.id,payload:ne})},j=(ne)=>C({error:(ne.trim()||"Could not read the edited file.").slice(0,tt)}),G=X;if(!G){j("This extension does not edit files.");return}Promise.resolve().then(()=>G(l.payload.purpose)).then((ne)=>{if(wn(ne)>Rt){j(`The file is over ${Rt} ${"bytes"in ne?"bytes":"characters"}.`);return}if(ne.version.length>It){j(`The snapshot version is over ${It} characters.`);return}C({snapshot:"bytes"in ne?{bytes:ne.bytes,version:ne.version}:{content:ne.content,version:ne.version}})},(ne)=>j(ne instanceof Error?ne.message:String(ne)));return}if(l.type==="resolve"){let C=(G)=>{_e({channel:M,v:U,type:"resolve-result",id:l.id,payload:G})},j=y;if(!j){C({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>j(l.payload)).then((G)=>C({item:G?Ve(G):null}),(G)=>{let ne=(G instanceof Error?G.message:String(G)).trim();C({error:(ne||"Command failed.").slice(0,tt)})});return}let I=O.get(l.id);if(!I)return;if(clearTimeout(I.timer),O.delete(l.id),l.ok){I.resolve(l.payload);return}I.reject(new w(l.code,l.error))};t.addEventListener("message",Fr),_e({channel:M,v:U,type:"hello"});let de=(c,l=r)=>{if(Y||t.parent===t)return Promise.reject(new w("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((I,C)=>{let j=setTimeout(()=>{O.delete(c.id),C(new w("HOST_TIMEOUT","Host did not answer in time."))},l);O.set(c.id,{resolve:I,reject:C,timer:j}),_e(c)})},Q=(c)=>de(c).then(()=>{return}),te={channel:M,v:U},an=(c)=>{if(!Y&&t.parent!==t)_e(c)},jr=()=>an({...te,type:"file-save"}),Vr=(c)=>{if(!ss(c)||!Ha(c))return;c.preventDefault(),jr()},Xr=(c)=>{if(!ss(c)||c.key!=="Escape"||g?.surface!=="popover"||!g.popover)return;c.preventDefault(),qr(g.popover.id,"escape").catch(()=>{return})},ut=()=>{let c=g?.surface==="popover"?g.popover:void 0;if(!c)return;let l=qe||Je;if(Gr===l)return;Gr=l,Jr(c.id,l).catch(()=>{return})},pt=()=>{if(g?.surface!=="popover"||qe)return;qe=!0,ut()},Wr=(c)=>{if(g?.surface!=="popover"||c.relatedTarget!==null||!qe)return;qe=!1,ut()},Kr=()=>{if(g?.surface!=="popover"||Je)return;Je=!0,ut()},zr=()=>{if(g?.surface!=="popover"||!Je)return;Je=!1,ut()},he=(c,l=1024)=>{if(!c.trim()||c.length>l)throw new w("HOST_REJECTED",`Identity must contain 1 to ${l} characters.`)},cn=async(c)=>{if(c.kind!=="projects")he(c.projectId);let l=await de({...te,type:"workspace-read",id:P(S),payload:c});if(!l||!("kind"in l)||!("state"in l)||l.kind!==c.kind)throw new w("HOST_REJECTED","Host did not return workspace data.");return l},ln=async(c,l)=>{if(c.kind!=="projects")he(c.projectId);let I=P(S);se.set(I,l);try{await Q({...te,type:"workspace-subscribe",id:P(S),payload:{subscriptionId:I,query:c}})}catch(C){if(se.delete(I),!Y)_e({...te,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:I}});throw C}return()=>{if(!se.delete(I)||Y)return;_e({...te,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:I}})}},fa=async(c,l)=>{if(c.kind==="session")he(c.sessionId);if(c.kind==="project")he(c.projectId);let I=P(S);ie.set(I,l);try{await Q({...te,type:"shells-subscribe",id:P(S),payload:{subscriptionId:I,scope:c}})}catch(C){if(ie.delete(I),!Y)_e({...te,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:I}});throw C}return()=>{if(!ie.delete(I)||Y)return;_e({...te,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:I}})}},ft=async(c)=>{if("key"in c&&(c.key.length===0||c.key.length>bn))throw new w("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!je(c.value))throw new w("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>kn)throw new w("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&g?.features?.deviceStorage!==!0)throw new w("UNSUPPORTED","This host does not support device storage.");let l=await de({...te,type:"storage",id:P(S),payload:c});if(!l||!("storage"in l)||l.op!==c.op)throw new w("HOST_REJECTED","Host did not return storage data.");return l},qr=(c,l)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===c)?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):Q({...te,type:"popover-close",id:P(S),payload:l?{id:c,reason:l}:{id:c}}),Jr=(c,l)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===c)?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):Q({...te,type:"popover-anchor",id:P(S),payload:{id:c,active:l}});return t.addEventListener("keydown",Xr,!0),t.addEventListener("pointerover",pt),t.addEventListener("pointermove",pt),t.addEventListener("pointerout",Wr),t.addEventListener("focus",Kr),t.addEventListener("blur",zr),{onAction:(c)=>(T=c,()=>{if(T===c)T=null}),listProjects:async()=>{let c=await cn({kind:"projects"});if(c.kind!=="projects")throw new w("HOST_REJECTED","Expected projects.");return c},listWorktrees:async(c)=>{let l=await cn({kind:"worktrees",projectId:c});if(l.kind!=="worktrees")throw new w("HOST_REJECTED","Expected worktrees.");return l},listSessions:async(c)=>{let l=await cn({kind:"sessions",projectId:c});if(l.kind!=="sessions")throw new w("HOST_REJECTED","Expected sessions.");return l},onProjects:(c)=>ln({kind:"projects"},(l)=>{if(l.kind==="projects")c(l)}),onWorktrees:(c,l)=>ln({kind:"worktrees",projectId:c},(I)=>{if(I.kind==="worktrees")l(I)}),onSessions:(c,l)=>ln({kind:"sessions",projectId:c},(I)=>{if(I.kind==="sessions")l(I)}),onRunningShells:(c,l)=>fa(c,l),readShellOutput:async(c,l)=>{he(c,At);let I=l?.cursor;if(I!==void 0&&(!Number.isInteger(I)||I<0))throw new w("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let C=l?.tailBytes;if(C!==void 0&&(!Number.isInteger(C)||C<1||C>Ot))throw new w("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ot}.`);let G=await de({...te,type:"shell-output",id:P(S),payload:{shellId:c,cursor:I,tailBytes:C}});if(!G||typeof G.output!=="string"||!Number.isFinite(G.cursor))throw new w("HOST_REJECTED","Host did not return shell output.");return G},stopShell:async(c)=>{if(he(c,At),(await de({...te,type:"shell-stop",id:P(S),payload:{shellId:c}}))?.stopped!==!0)throw new w("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(c)=>{he(c),await Q({...te,type:"open-session",id:P(S),payload:{sessionId:c}})},storage:{get:async(c,l)=>{let I=Lt(l),C={op:"get",key:c};if(I)C.scope=I;let j=await ft(C);return j.op==="get"&&j.found?j.value:void 0},set:async(c,l,I)=>{let C=Lt(I),j={op:"set",key:c,value:l};if(C)j.scope=C;await ft(j)},delete:async(c,l)=>{let I=Lt(l),C={op:"delete",key:c};if(I)C.scope=I;await ft(C)},keys:async(c)=>{let l=Lt(c),I={op:"keys"};if(l)I.scope=l;let C=await ft(I);if(C.op!=="keys")throw new w("HOST_REJECTED","Expected storage keys.");return C.keys}},onReady:(c)=>{if(o.add(c),g)c(g);return()=>{o.delete(c)}},onDirectory:(c)=>{if(s.add(c),g)c(g.directory);return()=>{s.delete(c)}},onSession:(c)=>{if(i.add(c),g)c(g.session);return()=>{i.delete(c)}},onSessionLifecycle:(c)=>{if(a.add(c),Re)c(Re);return()=>{a.delete(c)}},onConnection:(c)=>{if(p.add(c),g)c(g.connection);return()=>{p.delete(c)}},onSettings:(c)=>{if(f.add(c),g)c(g.settings);return()=>{f.delete(c)}},onItem:(c)=>{if(d.add(c),g)c(g.item);return()=>{d.delete(c)}},onBlock:(c)=>{if(_.add(c),g?.block)c(g.block);return()=>{_.delete(c)}},onServiceEvent:(c)=>(m.add(c),()=>{m.delete(c)}),onStatusControl:(c)=>(u.add(c),()=>{u.delete(c)}),onPopoverClosed:(c)=>(h.add(c),()=>{h.delete(c)}),setStatusControls:(c)=>{if(g?.features?.statusControls!==!0)return Promise.reject(new w("UNSUPPORTED","This host does not support status controls."));if(!Mo(c))return Promise.reject(new w("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Q({...te,type:"status-controls",id:P(S),payload:{controls:c}})},openPopover:(c)=>{if(g?.features?.popovers!==!0)return Promise.reject(new w("UNSUPPORTED","This host does not support popovers."));if(!Pn(c))return Promise.reject(new w("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Q({...te,type:"popover-open",id:P(S),payload:c})},closePopover:qr,setPopoverAnchorActive:Jr,onResolve:(c)=>(y=c,()=>{if(y===c)y=null}),toast:(c)=>{let l=c.message.trim();if(!l||l.length>bt)return Promise.reject(new w("HOST_REJECTED",`Toast message must contain 1 to ${bt} characters.`));if(c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>kt))return Promise.reject(new w("HOST_REJECTED",`Toast copy text must contain 1 to ${kt} characters.`));return Q({channel:M,v:U,type:"toast",id:P(S),payload:{...c,message:l}})},openUrl:(c)=>Q({channel:M,v:U,type:"open-url",id:P(S),payload:{url:c}}),openCommit:(c)=>Dn(c)?Q({channel:M,v:U,type:"open-commit",id:P(S),payload:{sha:c}}):Promise.reject(new w("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(c)=>Q({channel:M,v:U,type:"block-answer",id:P(S),payload:{text:c.trim().slice(0,Un)}}),openSurface:(c)=>Q({channel:M,v:U,type:"open-surface",id:P(S),payload:{surfaceId:c}}),writeClipboard:(c)=>Q({channel:M,v:U,type:"clipboard-write",id:P(S),payload:{text:c}}),compose:(c)=>Q({channel:M,v:U,type:"compose",id:P(S),payload:c}),attach:(c)=>Q({channel:M,v:U,type:"attach",id:P(S),payload:Ve(c)}),startSession:async(c)=>{if(c.projectId!==void 0)he(c.projectId);let l=c.worktree;if(l&&l!==!0)if(l.kind==="existing")he(l.directory);else{if(l.name!==void 0)he(l.name,200);if(l.baseBranch!==void 0)he(l.baseBranch,200)}let I=await de({channel:M,v:U,type:"start-session",id:P(S),payload:Bn(c)},e.requestTimeoutMs??180000);if(!Nn(I))throw new w("HOST_REJECTED","Host did not return a session.");return I},prompt:(c)=>de({channel:M,v:U,type:"prompt",id:P(S),payload:Fn(c)}).then((l)=>{if(!Ln(l))throw new w("HOST_REJECTED","Host did not return a prompt result.");return l}),sessionLink:(c)=>Q({channel:M,v:U,type:"session-link",id:P(S),payload:Ve(c)}),close:()=>Q({channel:M,v:U,type:"close",id:P(S)}),oauthStart:()=>Q({channel:M,v:U,type:"oauth-start",id:P(S)}),oauthDisconnect:()=>Q({channel:M,v:U,type:"oauth-disconnect",id:P(S)}),request:(c)=>(Mt(c.path)?de({channel:M,v:U,type:"request",id:P(S),payload:c}):is()).then((l)=>{if(!Ut(l))throw new w("HOST_REJECTED","Host request result was empty.");return l}),serviceRequest:(c)=>(Mt(c.path)?de({channel:M,v:U,type:"service-request",id:P(S),payload:c}):is()).then((l)=>{if(!Ut(l))throw new w("HOST_REJECTED","Host service request result was empty.");return l}),serviceStatus:()=>de({channel:M,v:U,type:"service-status",id:P(S)}).then((c)=>{if(!Xn(c))throw new w("HOST_REJECTED","Host did not return service status.");return c}),readFile:(c)=>(Xe(c)?de({channel:M,v:U,type:"file-read",id:P(S),payload:{path:c}}):Nt()).then((l)=>{if(!Wn(l))throw new w("HOST_REJECTED","Host did not return file content.");return l}),writeFile:(c,l)=>{if(!Xe(c))return Nt();if(l.length>wt)return Promise.reject(new w("FILE_TOO_LARGE",`Content is over ${wt} characters.`));return de({channel:M,v:U,type:"file-write",id:P(S),payload:{path:c,content:l}}).then((I)=>{if(!Kn(I))throw new w("HOST_REJECTED","Host did not confirm the write.");return I})},listDir:(c)=>(Xe(c)?de({channel:M,v:U,type:"file-list",id:P(S),payload:{path:c}}):Nt()).then((l)=>{if(!zn(l))throw new w("HOST_REJECTED","Host did not return directory entries.");return l}),stat:(c)=>(Xe(c)?de({channel:M,v:U,type:"file-stat",id:P(S),payload:{path:c}}):Nt()).then((l)=>{if(!qn(l))throw new w("HOST_REJECTED","Host did not return file status.");return l}),generate:(c)=>{let l=c.prompt.trim(),I=c.system?.trim();if(l.length===0||l.length>vt)return Promise.reject(new w("HOST_REJECTED",`Prompt must be 1 to ${vt} characters.`));if(I!==void 0&&(I.length===0||I.length>Pt))return Promise.reject(new w("HOST_REJECTED",`System prompt must be 1 to ${Pt} characters.`));let C=c.maxOutputTokens===void 0?void 0:Math.min(Gn,Math.max(1,Math.floor(c.maxOutputTokens)));if(C!==void 0&&!Number.isFinite(C))return Promise.reject(new w("HOST_REJECTED","maxOutputTokens must be a number."));let j={prompt:l};if(I!==void 0)j.system=I;if(C!==void 0)j.maxOutputTokens=C;return de({channel:M,v:U,type:"generate",id:P(S),payload:j},e.requestTimeoutMs??Hn).then((G)=>{if(!Jn(G))throw new w("HOST_REJECTED","Host did not return generated text.");return G})},onLateGenerateResult:(c)=>{R.add(c);for(let l of b.splice(0))W([c],l);return Br(),()=>{R.delete(c)}},setBadge:(c)=>Q({channel:M,v:U,type:"badge",id:P(S),payload:{count:jn(c)}}),setHeight:(c)=>Q({channel:M,v:U,type:"resize",id:P(S),payload:{height:Vn(c)}}),onFileOpen:(c)=>{if(k.add(c),!ee)ee=!0,t.addEventListener("keydown",Vr,!0);if(Z)c(Z);return()=>{k.delete(c)}},onFileSnapshot:(c)=>(X=c,()=>{if(X===c)X=null}),onFileSaved:(c)=>(v.add(c),()=>{v.delete(c)}),reportFileChange:(c)=>an({...te,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:jr,reportFileUnsupported:()=>an({...te,type:"file-unsupported"}),dispose:()=>{for(let c of se.keys())_e({...te,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:c}});se.clear();for(let c of ie.keys())_e({...te,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:c}});if(ie.clear(),Y=!0,y=null,T=null,X=null,k.clear(),v.clear(),ee)t.removeEventListener("keydown",Vr,!0);t.removeEventListener("message",Fr),t.removeEventListener("keydown",Xr,!0),t.removeEventListener("pointerover",pt),t.removeEventListener("pointermove",pt),t.removeEventListener("pointerout",Wr),t.removeEventListener("focus",Kr),t.removeEventListener("blur",zr);for(let c of O.values())clearTimeout(c.timer),c.reject(new w("HOST_UNAVAILABLE","Host client was disposed."));O.clear(),o.clear(),s.clear(),i.clear(),a.clear(),p.clear(),f.clear(),d.clear(),_.clear(),m.clear(),u.clear(),h.clear(),R.clear(),b.length=0}}};var as=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var ud=new Set(as);var cs=["none","agent","user"];var fd=new Set(cs);var Ba=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Fa=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ls=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of Ba)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of Fa){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Zn=(e,t)=>{if(ls(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var ja={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},V=(e,t)=>`var(--${e}, var(--oc-${ja[e]}, ${t}))`,ke=V("surface-background","transparent"),$t=V("surface-elevated","transparent"),We=V("surface-elevated-foreground","inherit"),me=V("surface-foreground","inherit"),q=V("surface-muted-foreground","gray"),Va=V("surface-muted","transparent"),Ge=V("interactive-border","currentColor"),pe=V("interactive-hover","transparent"),He=V("interactive-active","transparent"),er=V("interactive-selection","transparent"),tr=V("interactive-selection-foreground","inherit"),be=V("primary","currentColor"),nr=V("primary-text","inherit"),rr=V("error-text","inherit"),Xa=V("font-sans","inherit"),or=V("font-mono","monospace"),fs=V("radius","9px"),sr=`calc(${fs} - 2px)`,ds=`calc(${fs} - 4px)`,J=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,us=`background-image: linear-gradient(${pe}, ${pe});`,ir=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,ar="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ps="box-shadow: var(--oc-sdk-lit);",cr=`inset 0 0.5px 0 0 ${J(me,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Wa=`
:root {
  --oc-sdk-edge: ${J(me,16)};
  --oc-sdk-field-bg: ${$t};
  --oc-sdk-raised-bg: ${ke};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${J(me,14)};
  --oc-sdk-field-bg: ${J(ke,50,$t)};
  --oc-sdk-raised-bg: ${$t};
  --oc-sdk-field-lift: ${cr};
  --oc-sdk-raised-lift: ${cr};
  --oc-sdk-lit: ${cr};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Dt=(e)=>{let t=V(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${V(`${e}-text`,"inherit")}; }`},Ka=`
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
`,_s=`${Wa}
.oc-sdk { color: ${me}; font-family: ${Xa}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${us} }
.oc-sdk-mono { font-family: ${or}; }
.oc-sdk-muted { color: ${q}; }
${Dt("success")}${Dt("warning")}${Dt("error")}${Dt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${be}; --oc-sdk-tone-text: ${nr}; }

.oc-sdk-btn { border-radius: ${sr}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${ds}; }
.oc-sdk-btn[data-variant="default"] { color: ${nr}; background: ${J(be,10,ke)}; border-color: ${J(be,12)}; ${ps} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${J(be,16,ke)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${J(be,22,ke)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Va}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${He}, ${He}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${We}; ${ar} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${He}, ${He}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${pe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${He}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${V("status-error","red")}; color: ${rr}; background: ${J("var(--oc-sdk-tone)",7,ke)}; border-color: ${J("var(--oc-sdk-tone)",12)}; ${ps} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${J("var(--oc-sdk-tone)",9,ke)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${J("var(--oc-sdk-tone)",11,ke)}; box-shadow: none; }

.oc-sdk-field-note { color: ${q}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${rr}; }
.oc-sdk-input { border-radius: ${sr}; background: var(--oc-sdk-field-bg); color: ${We}; ${ir("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${q}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${ir(J(me,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${ir(V("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${or}; }

.oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${be}; }
.oc-sdk-search-clear { border-radius: ${ds}; color: ${q}; }
.oc-sdk-search-clear:hover { background: ${pe}; color: ${me}; }

.oc-sdk-trigger { border-radius: ${sr}; background: var(--oc-sdk-raised-bg); color: ${We}; ${ar} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${He}, ${He}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${q}; }
.oc-sdk-trigger-chevron { color: ${q}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${We}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${$t}; background-clip: padding-box; color: ${We}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${pe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${er}; color: ${tr}; }
.oc-sdk-option-check { color: ${me}; }
.oc-sdk-option[data-destructive="true"] { color: ${rr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${J(V("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${q}; }
.oc-sdk-popup-empty { color: ${q}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ge}; border-radius: 4px; color: ${me}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${J(me,60,Ge)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ge}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ke}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${be}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${us} }
.oc-sdk-check-desc { color: ${q}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${J(me,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${q}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${me}; }
.oc-sdk-tab[aria-selected="true"] { color: ${tr}; background: ${er}; border-color: ${Ge}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${We}; background: var(--oc-sdk-raised-bg); ${ar} }
.oc-sdk-tab-count { color: ${q}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${J(me,6)}; color: ${q}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${J("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${pe}; }
.oc-sdk-row[aria-selected="true"] { background: ${er}; color: ${tr}; }
.oc-sdk-row-lead { font-family: ${or}; color: ${q}; }
.oc-sdk-row-sub { color: ${q}; }
.oc-sdk-row-meta { color: ${q}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${q}; }

.oc-sdk-empty-body { color: ${q}; }

.oc-sdk-spinner { color: ${q}; }
.oc-sdk-spinner-ring { border-color: ${Ge}; border-top-color: ${be}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${J("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${q}; }

.oc-sdk-separator { color: ${q}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${J(Ge,40)}; }

.oc-sdk-progress-label { color: ${q}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${J(me,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${be}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${V("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${V("success-text","inherit")}; }

.oc-sdk-text a { color: ${nr}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${J(Ge,60)}; }
`,L=`
${Rn}
${Ka}
${_s}`;var ms="oc-sdk-ui-style",Ce=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},D=(e)=>{let t=document.getElementById(ms);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}In(document);let n=document.createElement("style");n.id=ms,n.textContent=e,document.head.appendChild(n)},x=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},fe=(e)=>{let t=x("button",e);return t.type="button",t},B=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},Ee=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},Es=(e,t)=>{let n=(r)=>{if(r.target instanceof Node&&e.contains(r.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var za=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},we=(e,t)=>{D(L);let n=t,r=fe("oc-sdk oc-sdk-btn"),o=za(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{if(r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=Boolean(n.disabled)||Boolean(n.loading),r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r)r.prepend(o);else if(!n.loading&&o.parentNode===r)o.remove();B(s,n.label)},a=()=>{if(n.disabled||n.loading)return;n.onClick()};return r.addEventListener("click",a),i(),{update:(p)=>{n={...n,...p},i()},dispose:()=>{r.removeEventListener("click",a),r.remove()}}};var lr=(e,t)=>{D(L);let n=t,r=x("label","oc-sdk oc-sdk-field"),o=x("span","oc-sdk-field-label"),s=n.multiline?x("textarea","oc-sdk-input"):x("input","oc-sdk-input"),i=x("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let a=()=>{if(B(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),Ee(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let f=Boolean(n.error);r.dataset.invalid=f?"true":"false",s.setAttribute("aria-invalid",f?"true":"false");let d=n.error??n.helper??"";B(i,d),i.hidden=d===""},p=()=>{n.onChange(s.value)};return s.addEventListener("input",p),a(),{update:(f)=>{n={...n,...f},a()},dispose:()=>{s.removeEventListener("input",p),r.remove()}}};var qa={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},xe=(e,t,n)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n)r.setAttribute("class",n);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",qa[e]),r.append(o),r};var dr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-search"),o=x("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=fe("oc-sdk-search-clear");s.append(xe("close",14)),s.tabIndex=-1,r.append(xe("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let d=n.placeholder??"Search";if(Ee(o,"placeholder",d),o.setAttribute("aria-label",n.label??d),s.setAttribute("aria-label","Clear search"),o.value!==n.value)o.value=n.value;r.dataset.active=n.value.trim()===""?"false":"true"},a=()=>{if(n.value!=="")n.onChange("");o.focus()},p=()=>{n.onChange(o.value)},f=(d)=>{if(d.key==="Escape"&&o.value!=="")d.preventDefault(),a()};if(o.addEventListener("input",p),o.addEventListener("keydown",f),s.addEventListener("click",a),i(),n.autofocus)o.focus();return{update:(d)=>{n={...n,...d},i()},dispose:()=>{o.removeEventListener("input",p),o.removeEventListener("keydown",f),s.removeEventListener("click",a),r.remove()}}};var Ae=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},ve=(e,t,n)=>{let r=e.filter((p)=>!p.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex((p)=>p.id===t);if(i===-1)return n==="next"?o.id:s.id;return r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var Ss=(e,t)=>`${e}-${t??""}`,Gt=(e,t,n,r)=>{let o=fe("oc-sdk-option");if(o.id=Ss(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(n.disabled),t==="option")o.setAttribute("aria-selected",n.selected?"true":"false");o.dataset.destructive=n.destructive?"true":"false";let s=x("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=x("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=x("span","oc-sdk-option-check");i.append(xe("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Ht=(e,t,n,r)=>{let o=Ss(n,r);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";Ee(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Ja=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;if(r>o&&n.top-8>o)e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},Bt=(e,t,n,r)=>{e.append(n),Ja(n,t);let o=Es(e,r),s=()=>{r()},i=(a)=>{if(a.target instanceof Node&&n.contains(a.target))return;r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var gs=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((r)=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n))},Ya=0,Ft=(e,t)=>{D(L);let n=t,r=`oc-sdk-select-${Ya+=1}`,o=x("div","oc-sdk oc-sdk-select"),s=x("span","oc-sdk-field-label");s.id=`${r}-label`;let i=fe("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let a=x("span","oc-sdk-trigger-value");i.append(a,xe("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let p="",f=null,d=null,_=x("div","oc-sdk oc-sdk-popup"),m=x("div","oc-sdk-popup-search"),u=x("input","oc-sdk-input");u.type="text",u.autocomplete="off",m.append(u);let h=x("div");h.setAttribute("role","listbox"),h.tabIndex=-1,_.append(h);let R=()=>gs(n.options,n.searchable?p:""),b=()=>n.searchable?u:h,y=(S)=>{f=S,Ht(h,b(),r,S)},T=()=>{Ce(h);let S=R();if(S.length===0){let g=x("div","oc-sdk-popup-empty");g.textContent="No matches",h.append(g)}for(let g of S)h.append(Gt(r,"option",{...g,selected:g.id===n.value},{hover:()=>y(g.id),pick:()=>X(g.id)}));y(S.some((g)=>g.id===f)?f:S[0]?.id??null)},k=()=>{let S=d;d=null,S?.(),p="",u.value="",i.setAttribute("aria-expanded","false")},v=()=>{if(d||n.disabled)return;if(f=n.value,u.placeholder=n.searchPlaceholder??"Search",n.searchable)_.prepend(m);else m.remove();T(),d=Bt(o,i,_,k),i.setAttribute("aria-expanded","true"),b().focus()},X=(S)=>{if(k(),i.focus(),S!==n.value)n.onChange(S)},Z=()=>{if(d)k();else v()},ee=(S)=>{if(!d&&Ae(S))S.preventDefault(),v()},O=(S)=>{let g=Ae(S);if(g)S.preventDefault(),y(ve(R(),f,g));else if(S.key==="Enter"){if(S.preventDefault(),f)X(f)}else if(S.key==="Escape")S.preventDefault(),k(),i.focus();else if(n.searchable&&S.target!==u&&S.key.length===1&&!S.ctrlKey&&!S.metaKey)u.focus()},se=()=>{p=u.value,T()},ie=(S)=>{if(d&&!(S.relatedTarget instanceof Node&&o.contains(S.relatedTarget)))k()},Y=()=>{B(s,n.label),s.hidden=!n.label;let S=n.options.find((g)=>g.id===n.value);if(B(a,S?.label??n.placeholder??"Select"),a.dataset.empty=S?"false":"true",i.disabled=Boolean(n.disabled),d)T()};return i.addEventListener("click",Z),i.addEventListener("keydown",ee),_.addEventListener("keydown",O),u.addEventListener("input",se),o.addEventListener("focusout",ie),Y(),{update:(S)=>{n={...n,...S},Y()},dispose:()=>{k(),i.removeEventListener("click",Z),i.removeEventListener("keydown",ee),_.removeEventListener("keydown",O),u.removeEventListener("input",se),o.removeEventListener("focusout",ie),o.remove()}}};var hs=(e,t,n)=>{D(L);let r=t,o=fe("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=x("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(xe("check",12));let i=x("span","oc-sdk-check-text"),a=x("span","oc-sdk-check-label"),p=x("span","oc-sdk-check-desc");i.append(a,p),o.append(s,i),e.append(o);let f=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=Boolean(r.disabled),B(a,r.label),B(p,r.description),p.hidden=!r.description},d=()=>{if(!r.disabled)r.onChange(!r.checked)};return o.addEventListener("click",d),f(),{update:(_)=>{r={...r,..._},f()},dispose:()=>{o.removeEventListener("click",d),o.remove()}}},ur=(e,t)=>hs(e,t,"checkbox"),jt=(e,t)=>hs(e,t,"switch");var pr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Ce(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let a=fe("oc-sdk-tab");a.setAttribute("role","tab");let p=i.id===n.activeId;a.setAttribute("aria-selected",p?"true":"false"),a.tabIndex=p?0:-1,a.dataset.id=i.id;let f=x("span");if(f.textContent=i.label,a.append(f),i.count!==void 0){let d=x("span","oc-sdk-tab-count");d.textContent=String(i.count),a.append(d)}a.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),r.append(a)}},s=(i)=>{let a=Ae(i,"horizontal");if(!a)return;let p=ve(n.items,n.activeId,a);if(p&&p!==n.activeId){i.preventDefault(),n.onChange(p);let f=r.querySelector(`[data-id="${CSS.escape(p)}"]`);if(f instanceof HTMLElement)f.focus()}};return r.addEventListener("keydown",s),o(),{update:(i)=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var nt=(e,t)=>{Ee(e,"data-tone",t&&t!=="neutral"?t:null)},fr=(e,t)=>{D(L);let n=t,r=x("span","oc-sdk oc-sdk-badge");e.append(r);let o=()=>{B(r,n.label),nt(r,n.tone)};return o(),{update:(s)=>{n={...n,...s},o()},dispose:()=>{r.remove()}}};var Qa=0,_r=(e,t)=>{D(L);let n=t,r=`oc-sdk-list-${Qa+=1}`,o=x("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,i=(_)=>`${r}-${_}`,a=(_)=>{s=_;for(let m of Array.from(o.children))if(m instanceof HTMLElement)m.dataset.active=m.id===i(_??"")?"true":"false";Ee(o,"aria-activedescendant",_?i(_):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},p=(_,m)=>{let u=x("span",_);return u.textContent=m,u},f=()=>{if(Ce(o),Ee(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(p("oc-sdk-list-empty",n.emptyText??"Nothing here")),a(null);return}for(let m of n.items){let u=fe("oc-sdk-row");if(u.id=i(m.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",m.id===n.selectedId?"true":"false"),u.disabled=Boolean(m.disabled),u.tabIndex=-1,m.leading)u.append(p("oc-sdk-row-lead",m.leading));let h=x("span","oc-sdk-row-main");if(h.append(p("oc-sdk-row-title",m.title)),m.subtitle)h.append(p("oc-sdk-row-sub",m.subtitle));if(u.append(h),m.badge){let R=p("oc-sdk-badge",m.badge.label);nt(R,m.badge.tone),u.append(R)}if(m.meta)u.append(p("oc-sdk-row-meta",m.meta));u.addEventListener("click",()=>n.onSelect(m.id)),o.append(u)}let _=n.items.some((m)=>m.id===s&&!m.disabled);a(_?s:n.selectedId??null)},d=(_)=>{let m=Ae(_);if(m){_.preventDefault(),a(ve(n.items,s,m));return}if((_.key==="Enter"||_.key===" ")&&s)_.preventDefault(),n.onSelect(s)};return o.addEventListener("keydown",d),f(),{update:(_)=>{n={...n,..._},f()},dispose:()=>{o.removeEventListener("keydown",d),o.remove()}}};var mr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-empty"),o=x("h2","oc-sdk-empty-title"),s=x("p","oc-sdk-empty-body"),i=x("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let a=null,p=()=>{if(B(o,n.title),B(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){a?.dispose(),a=null;return}let f={label:n.action.label,onClick:n.action.onClick};if(a)a.update(f);else a=we(i,{...f,variant:"outline",size:"sm"})};return p(),{update:(f)=>{n={...n,...f},p()},dispose:()=>{a?.dispose(),a=null,r.remove()}}};var Er=(e,t={})=>{D(L);let n=t,r=x("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=x("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=x("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",B(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(a)=>{n={...n,...a},i()},dispose:()=>{r.remove()}}};var Sr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-banner"),o=x("div","oc-sdk-banner-text"),s=x("div","oc-sdk-banner-title"),i=x("div","oc-sdk-banner-body"),a=x("div","oc-sdk-banner-action");o.append(s,i),r.append(o,a),e.append(r);let p=null,f=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),B(s,n.title),B(i,n.body),i.hidden=!n.body,a.hidden=!n.action,!n.action){p?.dispose(),p=null;return}let d={label:n.action.label,onClick:n.action.onClick};if(p)p.update(d);else p=we(a,{...d,variant:"outline",size:"xs"})};return f(),{update:(d)=>{n={...n,...d},f()},dispose:()=>{p?.dispose(),p=null,r.remove()}}};var Za=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,gr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-progress"),o=x("div","oc-sdk-progress-label"),s=x("span"),i=x("span","oc-sdk-progress-value"),a=x("span"),p=xe("check",14);i.append(p,a),o.append(s,i);let f=x("div","oc-sdk-progress-track");f.setAttribute("role","progressbar"),f.setAttribute("aria-valuemin","0"),f.setAttribute("aria-valuemax","100");let d=x("div","oc-sdk-progress-fill");f.append(d),r.append(o,f),e.append(r);let _=()=>{let m=Za(n.value);if(nt(d,n.tone),d.style.transform=`scaleX(${m/100})`,f.setAttribute("aria-valuenow",String(m)),n.label)f.setAttribute("aria-label",n.label);else f.removeAttribute("aria-label");B(s,n.label),B(a,`${m}%`);let u=m===100&&(!n.tone||n.tone==="neutral");Ee(r,"data-done",u?"true":null),p.style.display=u?"":"none",o.hidden=!n.label};return _(),{update:(m)=>{n={...n,...m},_()},dispose:()=>{r.remove()}}};var Ts=(e)=>e.filter((t)=>!("separator"in t)),ec=0,hr=(e,t)=>{D(L);let n=t,r=`oc-sdk-menu-${ec+=1}`,o=x("div","oc-sdk oc-sdk-menu");e.append(o);let s=x("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,a=null,p=we(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)m();else u()}}),f=o.querySelector("button");f?.setAttribute("aria-haspopup","menu");let d=(y)=>{a=y,Ht(s,s,r,y)},_=()=>{Ce(s);for(let y of n.items){if("separator"in y){let T=x("div","oc-sdk-separator");T.dataset.labeled="false",s.append(T);continue}s.append(Gt(r,"menuitem",y,{hover:()=>d(y.id),pick:()=>h(y.id)}))}d(Ts(n.items).some((y)=>y.id===a)?a:null)},m=()=>{let y=i;i=null,y?.(),a=null,f?.setAttribute("aria-expanded","false")},u=()=>{if(i||!f)return;_(),i=Bt(o,f,s,m),f.setAttribute("aria-expanded","true"),s.focus()},h=(y)=>{m(),f?.focus(),n.onSelect(y)},R=(y)=>{let T=Ae(y);if(T)y.preventDefault(),d(ve(Ts(n.items),a,T));else if(y.key==="Enter"||y.key===" "){if(y.preventDefault(),a)h(a)}else if(y.key==="Escape")y.preventDefault(),m(),f?.focus()},b=(y)=>{if(i&&!(y.relatedTarget instanceof Node&&o.contains(y.relatedTarget)))m()};return s.addEventListener("keydown",R),o.addEventListener("focusout",b),{update:(y)=>{if(n={...n,...y},p.update({label:n.label,variant:n.variant,size:n.size}),i)_()},dispose:()=>{m(),s.removeEventListener("keydown",R),o.removeEventListener("focusout",b),p.dispose(),o.remove()}}};var A=Qn(),Pe=null,Vt=new Set;A.onReady((e)=>{Pe=e,Zn(e,document.documentElement);for(let t of Vt)t(e)});A.onItem((e)=>{if(!Pe||Pe.item===e)return;Pe={...Pe,item:e};for(let t of Vt)t(Pe)});var ys=()=>{let[e,t]=z(Pe);return K(()=>{if(Vt.add(t),Pe)t(Pe);return()=>{Vt.delete(t)}},[]),e};var xs=(e,t)=>JSON.stringify({query:e,variables:t});class ce extends Error{kind;constructor(e,t){super(t);this.kind=e}}var F=async(e,t)=>{let n;try{n=await A.request({method:"POST",path:"/graphql",body:xs(e,t)})}catch(o){if(o instanceof w){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new ce("disconnected","Linear is not connected.");throw new ce("network",o.message||"Could not reach Linear.")}throw new ce("network",o instanceof Error?o.message:"Could not reach Linear.")}let r;try{r=JSON.parse(n.body)}catch{throw new ce("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new ce("disconnected","Linear sign-in expired.");if(r.errors?.length){let o=r.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new ce(s?"rate-limited":"graphql",o.message)}if(!r.data)throw new ce("graphql","Linear returned no data.");return r.data};var As=`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,Os=`
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        parent { id }
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
`;var Is=`
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
`;var rt=`
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
      team { id key name issueEstimationType issueEstimationAllowZero issueEstimationExtended states(first: 100) { nodes { id name type color position } } }
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
`;var bs=`
  query StatusCounts($filter: IssueFilter, $after: String) {
    issues(first: 250, after: $after, filter: $filter) {
      nodes { state { id name type color position } team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,ks=`
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { id name type color position } team { id key } project { id name } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,ot=(e)=>`
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
`;var Cs=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`;var ws=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`;var vs=`
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
`;var Ps=`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
  }
`,Ms=`
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
`,Us=`
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`;var Ns=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,ig={VIEWER:`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,TEAMS:`
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        parent { id }
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
      projectMilestones(first: 50) { nodes { id name description targetDate progress sortOrder } }
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
      team { id key name issueEstimationType issueEstimationAllowZero issueEstimationExtended states(first: 100) { nodes { id name type color position } } }
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
`,ISSUES_BY_IDENTIFIER:ot(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,SLASH_BY_NUMBER:`
  query SlashByNumber($filter: IssueFilter) {
    issues(first: 6, filter: $filter) { nodes { identifier title } }
  }
`,SLASH_SEARCH:`
  query SlashSearch($term: String!) {
    searchIssues(term: $term, first: 3) { nodes { identifier title } }
  }
`,MENTION_ISSUE:`
  query MentionIssue($id: String!) {
    issue(id: $id) { identifier title url state { name } }
  }
`,MENTION_SEARCH:`
  query MentionSearch($term: String!) {
    searchIssues(term: $term, first: 8) { nodes { identifier title url state { name } } }
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
    notifications(first: 50, after: $after) {
      nodes {
        id type category readAt createdAt
        actor { id name displayName avatarUrl avatarBackgroundColor }
        ... on IssueNotification {
          reactionEmoji
          issue { id identifier title url state { id name type color position } team { id key } project { id } }
          comment { id body }
        }
        ... on ProjectNotification {
          reactionEmoji
          project { id name url teams(first: 5) { nodes { id } } }
          projectUpdate { health url }
          comment { id body }
          document { title url }
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
`,PICKER_ISSUES:`
  query PickerIssues($filter: IssueFilter, $first: Int) {
    issues(first: $first, filter: $filter, orderBy: updatedAt) { nodes { 
  id identifier title priority updatedAt url branchName
  state { id name type color position }
  team { id key name }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 6) { nodes { id name color } }
  project { id name color icon }
  parent { id identifier title state { id name type color position } }
  children(first: 25) { nodes { id state { type } } }
 } }
  }
`,PICKER_SEARCH:`
  query PickerSearch($term: String!, $filter: IssueFilter) {
    searchIssues(term: $term, first: 30, filter: $filter) { nodes { 
  id identifier title priority updatedAt url branchName
  state { id name type color position }
  team { id key name }
  assignee { id name displayName avatarUrl avatarBackgroundColor }
  labels(first: 6) { nodes { id name color } }
  project { id name color icon }
  parent { id identifier title state { id name type color position } }
  children(first: 25) { nodes { id state { type } } }
 } }
  }
`,MILESTONE_ISSUES:`
  query MilestoneIssues($projectId: ID!, $after: String) {
    issues(first: 250, after: $after, filter: { project: { id: { eq: $projectId } } }) {
      nodes { projectMilestone { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,TRIAGE_COUNTS:`
  query TriageCounts($teamIds: [ID!]) {
    issues(first: 250, filter: { team: { id: { in: $teamIds } }, state: { type: { eq: "triage" } } }) {
      nodes { team { id } }
      pageInfo { hasNextPage endCursor }
    }
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
`,ISSUE_DELETE:`
  mutation IssueDelete($id: String!) {
    issueDelete(id: $id) { success }
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
`,ISSUE_RELATION_CREATE:`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
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
`,NOTIFICATIONS_MARK_READ:Ns(["n1","n2"])};var Oe=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ce&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ce&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},tc=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),Ls=(e,t)=>ko((n,r)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&tc(r)&&r.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...r,issues:r.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof r==="object"&&r!==null&&r.id===e){let{team:o,...s}=t;return{...r,...s}}return r}),nc=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new ce("graphql","Linear did not save the change.");return e.issueUpdate.issue},Ke=async(e,t)=>{let n=Ls(e.id,t.patch);try{let r=nc(await F(vs,{id:e.id,input:t.input}));if(Ls(e.id,r),On(`issue:${e.identifier}`),"stateId"in t.input)ue("children:");return r}catch(r){throw n(),r}};var Ds=async(e)=>{let t=await F(Ms,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new ce("graphql","Linear did not create the issue.");return ue("issues:"),ue("view-issues:"),t.issueCreate.issue},$s=async(e,t)=>{if(!(await F(Us,{input:{issueId:e.id,body:t}})).commentCreate.success)throw new ce("graphql","Linear did not save the comment.");On(`issue:${e.identifier}`)};var rc=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return typeof t.id==="string"&&typeof t.identifier==="string"&&typeof t.body==="string"},oc=(e)=>Array.isArray(e?.drafts)?e.drafts.filter(rc):[],Gs=async(e)=>{let t=await ae(A,"GET","/drafts",{query:{directory:e},name:"Linear+"});return t.ok===!1?[]:oc(t)},Hs=async(e,t)=>{let n=await F(ot([e.identifier])),r=Object.values(n).find((o)=>o!==null);if(!r)throw Error(`${e.identifier} was not found in Linear.`);await $s(r,t),await ae(A,"POST","/drafts",{body:{id:e.id,action:"posted"},name:"Linear+"})},Bs=async(e)=>(await ae(A,"POST","/drafts",{body:{id:e.id,action:"discard"},name:"Linear+"})).ok!==!1;var le=(e,t="inline-flex")=>(n)=>{let r=Io(e,n);return E("span",{ref:r,style:{display:t}},void 0,!1,void 0,this)},Se=le(we),Ag=le(Ft),Fs=le(lr,"block"),Og=le(dr,"block"),Rg=le(pr),Ig=le(hr),bg=le(fr),Xt=le(Er),Tr=le(Sr,"block"),kg=le(mr,"block"),js=le(gr,"block"),Cg=le(_r,"block"),wg=le(ur),vg=le(jt),Pg=le(jt,"block"),Mg=le(Ft,"block");var Vs=({draft:e,onDone:t})=>{let[n,r]=z(!1),[o,s]=z(e.body),[i,a]=z(null),p=async()=>{a("post");try{await Hs(e,o),await H(A,"success",`Posted the summary on ${e.identifier}`),t()}catch(d){await H(A,"error",`Could not post on ${e.identifier}: ${Oe(d)}`),a(null)}},f=async()=>{if(a("discard"),await Bs(e))t();else await H(A,"error","Could not discard the draft. Try again."),a(null)};return E("div",{class:"lin-status-draft","data-draft":e.id,children:[E("div",{class:"lin-status-line lin-status-line--wrap",role:"button",tabIndex:0,"aria-expanded":n,onClick:()=>r(!n),onKeyDown:(d)=>{if(d.key==="Enter")r(!n)},children:[E("span",{class:"lin-status-label",title:e.sessionTitle,children:["Summary ready for ",E("span",{class:"sui-mono lin-status-ref",children:e.identifier},void 0,!1,void 0,this)]},void 0,!0,void 0,this),E("span",{class:"lin-status-actions",onClick:(d)=>d.stopPropagation(),children:[E(Se,{label:"Post",size:"xs",loading:i==="post",disabled:i!==null||!o.trim(),onClick:()=>{p()}},void 0,!1,void 0,this),E(Se,{label:"Discard",variant:"ghost",size:"xs",loading:i==="discard",disabled:i!==null,onClick:()=>{f()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),n&&E(Fs,{value:o,onChange:s,multiline:!0,rows:5,disabled:i!==null},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var sc="plan",ic=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["id","directory","sessionDirectory","sessionId","identifier","sessionTitle"].every((n)=>typeof t[n]==="string")&&typeof t.createdAt==="number"},Xs=(e)=>Array.isArray(e?.handoffs)?e.handoffs.filter(ic):[];var Ws=(e,t)=>{if(t&&(t.archivedAt!==null||t.activity==="running"||t.activity==="retrying"))return!1;return e.plan||t?.agent===sc},ac=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,cc=1e5,lc=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),Ks=(e,t)=>{let n=lc(t.trim()).trim(),r=n.length>20000?`${n.slice(0,20000).trimEnd()}

[cut]`:n,o=(e??"").replace(ac,"").trimEnd(),s=`---
## Plan

${r}`,i=o?`${o}

${s}`:s;return i.length>cc?null:i};var st=(e)=>`${e.id}@${e.createdAt}`,zs="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var zg=new RegExp("```linear-plan[^\\n]*\\n([\\s\\S]*?)```","g");var dc=(e,t)=>typeof e==="string"?e.replace(/\s+/g," ").trim().slice(0,t):"";var yr=(e,t)=>{if(e===null||t.length===0)return null;let n=t[0];for(let r of t)if(Math.abs(r-e)<Math.abs(n-e)||Math.abs(r-e)===Math.abs(n-e)&&r>n)n=r;return n};var qs=(e,t,n)=>[e.description,`Split out of ${t} by the plan in "${dc(n,120)}". Created by Linear+.`].filter(Boolean).join(`

---

`),Js=120000,Wt=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["sessionId","identifier","directory","sessionTitle","state"].every((n)=>typeof t[n]==="string")&&typeof t.extras==="object"&&t.extras!==null&&Array.isArray(t.extras.issues)},Ys=(e,t)=>{let n=[];if(e.estimateSet!==void 0&&e.estimateSet!==null)n.push(`set the estimate of ${e.identifier} to ${t(e.estimateSet)}`);let r=e.created??[];if(r.length)n.push(`created ${r.length===1?r[0]:`${r.slice(0,-1).join(", ")} and ${r.at(-1)}`}, related to ${e.identifier}`);return n.length?n.join("; "):`nothing to change on ${e.identifier}`};var it=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let r=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...r?{}:{year:"numeric"}})},Qs=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let r=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-r)/86400000)};var at=(e)=>`${Math.floor(Math.max(0,Math.min(1,e))*100)}%`,Kt={onTrack:"On track",atRisk:"At risk",offTrack:"Off track"},zt={onTrack:"success",atRisk:"warning",offTrack:"error"},uc={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},xr=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return uc[e]??String(e);return String(e)};var qt=(e)=>e===0?5:e;var Zs=["triage","backlog","unstarted","started","completed","canceled","duplicate"],ei=(e,t)=>Zs.indexOf(e.type)-Zs.indexOf(t.type)||e.position-t.position,Ar=(e)=>`${e.type}|${e.name}`;var pc=(e)=>[...e??[]].sort(ei);var fc=(e,t,n=e)=>{let r=t?.trim().toLowerCase();return(r?n.find((o)=>o.name.trim().toLowerCase()===r):void 0)??e.find((o)=>/^in progress$/i.test(o.name.trim()))??e.find((o)=>/progress|doing|working|development|started/i.test(o.name))??e.find((o)=>!/block|hold|pause|wait|stuck/i.test(o.name))??e[0]??null},ti=(e)=>/plan/i.test(e.name),_c=(e)=>pc(e).filter((t)=>t.type==="started"&&!ti(t)),ni=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!ti(e.state))return null;return fc(_c(t),n)};var mc={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},Ec=(e)=>{let t=e?mc[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]},Or=(e)=>Ec({issueEstimationType:e.issueEstimationType??"notUsed",issueEstimationAllowZero:e.issueEstimationAllowZero??!1,issueEstimationExtended:e.issueEstimationExtended??!1});var Be=async(e)=>{try{let t=await A.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},Rr=async(e,t)=>{try{return await A.storage.set(e,t),!0}catch{return!1}},oi=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),si=async(e)=>{let t=await Be(`map:${e}`);return oi(t)?t:null},Jt=async(e,t)=>{let n=await Rr(`map:${e}`,t);return await br(),n},ii=async(e)=>{try{await A.storage.delete(`map:${e}`)}catch{}br()},Ir=async(e)=>{let t=await Be(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},ai=async(e,t)=>{let n=await Ir(e);if(n?.host!==t.host||n.path!==t.path)await Rr(`repo:${e}`,t)},ci=async()=>await Be("pref:start-moves")!==!1;var li=async()=>await Be("pref:assign-me")===!0;var di=async(e)=>{let t=await Be(`pref:start-state:${e}`);return typeof t==="string"?t:null},ui=(e,t)=>Rr(`pref:start-state:${e}`,t);var Sc=["planAgent","planModel","buildAgent","buildModel"],gc=async()=>{let e=await Be("pref:agents"),t={};for(let n of Sc){let r=e?.[n];if(typeof r==="string"&&r.trim())t[n]=r.trim()}return t};var br=async(e={})=>{let t=[];try{t=await A.storage.keys()??[]}catch{return}let n={};for(let s of t.filter((i)=>i.startsWith("map:"))){let i=await Be(s);if(oi(i)&&i.directory)n[i.directory]=i}let r=await gc(),o=Object.keys(r).length>0;if(e.allowEmpty===!1&&Object.keys(n).length===0&&!o)return;await ae(A,"PUT","/config",{body:o?{directories:n,defaults:r}:{directories:n},name:"Linear+"})},ri=!1,pi=async()=>{if(ri)return;ri=!0,await br({allowEmpty:!1})};var kr=(e)=>e.replace(/\/+$/,""),fi=async(e)=>{if(!e)return null;try{let t=kr(e),n=(await A.listProjects())?.projects??[],r=n.find((o)=>kr(o.directory)===t);if(r)return r;for(let o of n)if(((await A.listWorktrees(o.id))?.worktrees??[]).some((i)=>kr(i.directory)===t))return o}catch{}return null};var _i=async(e)=>{try{await A.openSession(e)}catch{}};var mi=async(e)=>{let t=await ae(A,"GET","/handoffs",{query:{directory:e},name:"Linear+"});if(t.ok===!1)return[];let n=Xs(t);if(!n.length)return n;let r=[];try{let o=await fi(e);if(o)r=(await A.listSessions(o.id))?.sessions??[]}catch{}return n.filter((o)=>Ws(o,r.find((s)=>s.id===o.sessionId)))},Ei=async(e)=>(await ae(A,"POST","/handoffs",{body:{id:e,action:"dismiss"},name:"Linear+"})).ok!==!1,Si=async(e)=>{let t=await ae(A,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{},...e.model?{model:e.model}:{}},name:"Linear+"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear+ service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},gi=async(e)=>{let t=await ae(A,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier},name:"Linear+"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear+ service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1,lead:t.lead===!0}};var hi=async(e)=>{let t=await ae(A,"GET","/handoffs",{query:{directory:e},name:"Linear+"}),n=t.ok===!1?[]:t.extras;return Array.isArray(n)?n.filter(Wt):[]},Ti=async(e)=>{let t=await ae(A,"GET","/extras",{query:{sessionId:e},name:"Linear+"});return t.ok!==!1&&Wt(t.extras)?t.extras:null},ze=async(e)=>{let t=await ae(A,"POST","/handoffs",{body:e,name:"Linear+"});if(t.ok===!1)return null;if(e.action==="claim-extras"&&t.claimed!==!0)return null;return Wt(t.state)?t.state:null};var Cr=new Set,Yt=async(e,t)=>{if(Cr.has(e.sessionId))return null;Cr.add(e.sessionId);try{let n=await ze({sessionId:e.sessionId,action:"claim-extras"});if(!n)return null;let r=n.estimateDone===!0,o=n.estimateSet??null,s=[...n.created??[]],i=(a)=>String(a);try{let a=(await F(rt,{id:n.identifier})).issue,p=Or(a.team);if(i=(_)=>xr(_,a.team.issueEstimationType)??String(_),!r){let _=a.estimate===null?yr(n.extras.estimate,p):null;if(_!==null)await Ke(a,{input:{estimate:_},patch:{estimate:_}}),o=_;r=!0}let f=t&&await li().catch(()=>!1)?t:null;for(let _ of n.extras.issues.slice(s.length)){let m=yr(_.estimate,p),u=await Ds({teamId:a.team.id,title:_.title,description:qs(_,a.identifier,n.sessionTitle),...a.project?{projectId:a.project.id}:{},...m!==null?{estimate:m}:{},...f?{assigneeId:f}:{}});s.push(u.identifier),await F(Ps,{input:{issueId:u.id,relatedIssueId:a.id,type:"related"}})}return{state:await ze({sessionId:n.sessionId,action:"extras-done",estimateDone:r,estimateSet:o,created:s})??{...n,state:"done",estimateDone:r,estimateSet:o,created:s},label:i}}catch(a){let p=Oe(a);return{state:await ze({sessionId:n.sessionId,action:"extras-failed",estimateDone:r,estimateSet:o,created:s,error:p})??{...n,state:"failed",estimateDone:r,estimateSet:o,created:s,error:p},label:i}}}finally{Cr.delete(e.sessionId)}};var Tc=5,Qt=null,yc=new Map;var yi=(e,t)=>{let n=yc.get(t);if(n!==void 0)return n;let r=Qt?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=r.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(r.length+1)},xi=()=>Qt?.viewer.id??null;var xc=async()=>{let e=new Map,t=null;for(let n=0;n<Tc;n+=1){let r=await F(Rs,{after:t});for(let{team:o,...s}of r.workflowStates.nodes){let i=e.get(o.id)??[];i.push(s),e.set(o.id,i)}if(!r.workflowStates.pageInfo.hasNextPage)break;t=r.workflowStates.pageInfo.endCursor}for(let n of e.values())n.sort((r,o)=>r.position-o.position);return e},Ai=async()=>{let[e,t,n]=await Promise.all([F(As).then((r)=>r.viewer),F(Os).then((r)=>r.teams.nodes),xc()]);return t.sort((r,o)=>r.name.localeCompare(o.name)),Qt={viewer:e,teams:t,teamsById:new Map(t.map((r)=>[r.id,r])),myTeamIds:new Set(e.teams?.nodes.map((r)=>r.id)??[]),statesByTeam:n},Qt},Oi="workspace",wr=(e=!1)=>$e(Oi,Ai,e),Ri=()=>ye(Oi,Ai);var Ii=async(e,t,n=!1)=>{let{plan:r,isPlan:o}=await gi({source:t,identifier:e.identifier});if(!o&&!n)throw Error(zs);let s=(await F(rt,{id:e.identifier})).issue,i=Ks(s.description,r);if(i===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);await Ke(s,{input:{description:i},patch:{description:i}})},bi=(e)=>Ii({identifier:e.identifier},{sessionId:e.sessionId,directory:e.sessionDirectory,title:e.sessionTitle,agent:null,inWorktree:!0,updatedAt:e.createdAt}),Ac=async(e,t,n)=>{let r=!1;if(n.post)await Ii(e,t,n.force),r=!0;let o=await Ti(t.sessionId).catch(()=>null);if(o&&(o.state==="pending"||o.state==="claimed"))await Yt(o,xi()).catch(()=>null);let s=await Si({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force,...n.model?{model:n.model}:{}}),i=n.state??ni(e,e.team.states.nodes,n.lastState),a=!1,p=null;if(n.move&&i)try{await Ke(e,{input:{stateId:i.id},patch:{state:i}}),a=!0}catch(f){p=Oe(f)}return{sessionId:s.sessionId,target:i,moved:a,moveError:p,posted:r}},ki=async(e)=>{let t=(await F(rt,{id:e.identifier})).issue,[n,r]=await Promise.all([ci().catch(()=>!0),di(t.team.id).catch(()=>null)]),o={sessionId:e.sessionId,directory:e.sessionDirectory,title:e.sessionTitle,agent:null,inWorktree:!0,updatedAt:e.createdAt},s=await Ac(t,o,{move:n,post:e.postPlan===!0,lastState:r});if(s.moved&&s.target)ui(t.team.id,s.target.name).catch(()=>{return});return{...s,issue:t}};var Ci=({handoff:e,onDone:t})=>{let[n,r]=z(null),[o,s]=z(!1),i=async()=>{r("build");try{let f=await ki(e);if(f.moveError)await H(A,"error",`Build started, but ${e.identifier} was not moved: ${f.moveError}`);if(await H(A,"success",`${f.posted?"Added the plan to the issue and started":"Started"} a build for ${e.identifier}${f.moved?` and moved it to ${f.target.name}`:""}`),f.moved)ue("status-");t(),await _i(f.sessionId)}catch(f){await H(A,"error",`Could not start the build: ${Oe(f)}`),r(null)}},a=async()=>{r("plan");try{await bi(e),s(!0),ue("issue"),await H(A,"success",`Added the plan to ${e.identifier}`)}catch(f){await H(A,"error",`Could not add the plan to ${e.identifier}: ${Oe(f)}`)}r(null)},p=async()=>{if(r("dismiss"),await Ei(e.id))t();else await H(A,"error","Could not dismiss the plan. Try again."),r(null)};return E("div",{class:"lin-status-draft","data-handoff":e.id,children:E("div",{class:"lin-status-line lin-status-line--wrap",children:[E("span",{class:"lin-status-label",title:e.sessionTitle,children:["Plan ready for ",E("span",{class:"sui-mono lin-status-ref",children:e.identifier},void 0,!1,void 0,this)]},void 0,!0,void 0,this),E("span",{class:"lin-status-actions",children:[E(Se,{label:e.postPlan?"Add plan and build":"Start build",size:"xs",loading:n==="build",disabled:n!==null,onClick:()=>{i()}},void 0,!1,void 0,this),E(Se,{label:o?"Plan added":"Add plan only",variant:"outline",size:"xs",loading:n==="plan",disabled:n!==null,onClick:()=>{a()}},void 0,!1,void 0,this),E(Se,{label:"Dismiss",variant:"ghost",size:"xs",loading:n==="dismiss",disabled:n!==null,onClick:()=>{p()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this)};var wi={state:{type:{nin:["completed","canceled","duplicate"]}}};var Zt=(e,t,n=!1)=>{let r=[];if(e.length){let o=[...e].sort();r.push({team:n?{or:[{id:{in:o}},{ancestors:{some:{id:{in:o}}}}]}:{id:{in:o}}})}if(t.length)r.push({project:{id:{in:[...t].sort()}}});if(!r.length)return null;return r.length===1?r[0]:{or:r}},vr=(...e)=>{let t=e.filter((n)=>Boolean(n));return t.length===1?t[0]:{and:t}},en={assigned:{assignee:{isMe:{eq:!0}}},created:{creator:{isMe:{eq:!0}}},subscribed:{subscribers:{some:{isMe:{eq:!0}}}}};var vi=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let o=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:null},Pi=([e,t,n])=>{let r=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*r(e)+0.7152*r(t)+0.0722*r(n)},Oc=(e,t)=>{let[n,r]=[Pi(e),Pi(t)].sort((o,s)=>s-o);return(n+0.05)/(r+0.05)};var Mi=(e,t)=>{let n=vi(e),r=vi(t);if(!n||!r||Oc(n,r)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Ui=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),Rc=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),r=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${r.toFixed(2)}z`},Pr=({type:e,color:t,size:n=14,fill:r,teamId:o,stateId:s})=>{let i=t||"currentColor",a=De(()=>Mi(i,Ui()),[i,Ui()]),p={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),E("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return E("svg",{...p,children:E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return E("svg",{...p,children:E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let f=r??(o&&s?yi(o,s):0.5);return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this),E("path",{d:Rc(f),fill:a},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),E("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),E("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}};var Ic="open-target",bc="ext:linear-dashboard";var Mr=async(e)=>{try{await A.storage.set(Ic,{...e,at:Date.now()})}catch{return!1}try{return await A.openSurface(bc),!0}catch{return!1}};var Ni=new Map,Li=(e)=>{for(let t of e)Ni.set(t.id,t);return e},Di=(e)=>Ni.get(e);var tn=async(e)=>{if(!e.length)return[];let t=await F(Is,{after:null,filter:{id:{in:[...e].sort()}}});return Li(t.projects.nodes)},$i=async(e)=>{let t=await F(ws,{term:e});return Li(t.searchProjects.nodes)};var nn=(e)=>{let t=e.length?`projects:${[...e].sort().join(",")}`:null;return ye(t,()=>tn(e))};var kc={state:{type:{in:["triage","unstarted","started"]}}},Cc=4,wc=async(e)=>{let t=vr(kc,e),n=[],r=null;for(let o=0;o<Cc;o+=1){let s=await F(bs,{filter:t,after:r});if(n.push(...s.issues.nodes),!s.issues.pageInfo.hasNextPage)return{nodes:n,capped:!1};r=s.issues.pageInfo.endCursor}return{nodes:n,capped:!0}},vc=async(e)=>{let t=await F(ks,{filter:vr(wi,en.assigned,e)});return{issues:t.issues.nodes,more:t.issues.pageInfo.hasNextPage}},Gi=(e)=>ye(e?`status-counts:${JSON.stringify(e)}`:null,()=>wc(e)),ct=(e)=>ye(e?`status-mine:${JSON.stringify(e)}`:null,()=>vc(e)),Hi=(e)=>ye(e?`status-drafts:${e}`:null,()=>Gs(e)),Bi=(e)=>ye(e?`status-handoffs:${e}`:null,()=>mi(e));var Fi=(e,t)=>({id:e.id,name:e.name,url:e.url,status:e.status.name,health:e.health,progress:e.progress,targetDate:e.targetDate,teams:e.teams.nodes.map((n)=>n.key),...t?{text:t}:{}});var Ur=(e)=>({identifier:e.identifier,title:e.title,state:e.state.name,url:e.url});var Pc=300000,ji=new Map,Nr=async(e)=>{let t=JSON.stringify(e),n=`${e.directory}|${Object.keys(e).sort().join(",")}`,r=ji.get(n);if(r&&r.signature===t&&Date.now()-r.at<Pc)return;ji.set(n,{signature:t,at:Date.now()}),await ae(A,"POST","/snapshot",{body:e,name:"Linear+"})},Vi=(e,t,n,r,o=[])=>({directory:e,teamKeys:o.map((s)=>s.key),teams:t.map((s)=>({id:s.id,key:s.key,name:s.name})),projects:n.map((s)=>Fi(s)),myIssues:r.map(Ur)});var Mc="(none)";var Xi=(e,t,n)=>({directory:e||Mc,assignedIssues:t.map(Ur),...n?{orgKey:n}:{}});var Wi=({directory:e,workspace:t,state:n})=>{let r=[...n.detection.teamIds,...n.detection.projectIds],o=r.filter((_)=>t.teamsById.has(_)),s=r.filter((_)=>!t.teamsById.has(_)),i=nn(s),a=ct(Zt(o,s));K(()=>{pi()},[]);let p=o.map((_)=>t.teamsById.get(_)),f=(s.length===0||i.data!==void 0)&&a.data!==void 0,d=JSON.stringify([i.data?.map((_)=>[_.id,_.progress,_.health,_.status.name]),a.data?.issues.map((_)=>[_.identifier,_.state.name])]);return K(()=>{if(!n.detection.mapping||!f)return;Nr(Vi(e,p,i.data??[],a.data?.issues??[],t.teams))},[e,f,d,n.detection.mapping?.updatedAt]),null},Ki=({directory:e,orgKey:t})=>{let n=ct(en.assigned),r=JSON.stringify(n.data?.issues.map((o)=>[o.identifier,o.title,o.state.name]));return K(()=>{if(n.data)Nr(Xi(e,n.data.issues,t))},[e,r,t]),null};var Uc=60000,qi=(e)=>ye(e?`plan-extras:${e}`:null,()=>hi(e)),zi=new Map,Nc=(e,t)=>e.state==="pending"||e.state==="claimed"&&t-(e.claimedAt??0)>Js,Ji=({directory:e,viewerId:t})=>{let n=qi(e);return K(()=>{let r=setInterval(()=>{if(document.visibilityState==="visible")n.refresh()},Uc);return()=>clearInterval(r)},[e]),K(()=>{let r=Date.now();for(let o of n.data??[]){if(!Nc(o,r)||zi.get(o.sessionId)==="done")continue;Yt(o,t).then(async(s)=>{if(!s)return;zi.set(o.sessionId,s.state.state==="done"?"done":"failed");let i=Ys(s.state,s.label);if(s.state.state==="done")await H(A,"success",`Plan for ${o.identifier}: ${i}.`);else await H(A,"error",`Plan for ${o.identifier}: ${s.state.error??"a write failed"}. ${s.state.created?.length||(s.state.estimateSet??null)!==null?`Done so far: ${i}. `:""}Retry is in Work Status.`);ue("issue"),ue("status-"),n.refresh()})}},[n.data,t]),null},Yi=({directory:e})=>{let t=qi(e),[n,r]=z(null),o=(t.data??[]).filter((i)=>i.state==="failed");if(!o.length)return null;let s=async(i)=>{if(r(i.sessionId),!await ze({sessionId:i.sessionId,action:"retry-extras"}))await H(A,"error","Could not retry. Try again.");r(null),t.refresh()};return E(ge,{children:o.map((i)=>E("div",{class:"lin-status-draft","data-extras":i.sessionId,children:E("div",{class:"lin-status-line lin-status-line--wrap",children:[E("span",{class:"lin-status-label",title:i.error??"",children:["Plan for ",E("span",{class:"sui-mono lin-status-ref",children:i.identifier},void 0,!1,void 0,this),": estimate or issues not written"]},void 0,!0,void 0,this),E("span",{class:"lin-status-actions",children:E(Se,{label:"Retry",size:"xs",loading:n===i.sessionId,disabled:n!==null,onClick:()=>{s(i)}},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},i.sessionId,!1,void 0,this))},void 0,!1,void 0,this)};var Lc={started:0,unstarted:1,triage:2,backlog:3},rn=(e)=>Lc[e]??9,Qi=(e)=>{let t=new Map;for(let{state:n,team:r}of e){let o=Ar(n),s=t.get(o);if(s)s.count+=1;else t.set(o,{key:o,name:n.name,type:n.type,color:n.color,position:n.position,count:1,teamId:r.id,stateId:n.id})}return[...t.values()].sort((n,r)=>rn(n.type)-rn(r.type)||n.position-r.position||n.name.localeCompare(r.name))},Dc=6,Zi=(e,t=Dc)=>({shown:e.slice(0,t),hidden:e.slice(t)}),$c=5,ea=(e,t=$c)=>[...e].sort((n,r)=>rn(n.state.type)-rn(r.state.type)||qt(n.priority)-qt(r.priority)||r.updatedAt.localeCompare(n.updatedAt)).slice(0,t),Gc=(e,t=new Date)=>{let n=Qs(e,t);if(n===null)return null;if(n<0)return"ended";if(n===0)return"ends today";return n===1?"1 day left":`${n} days left`},ta=(e,t,n=new Date)=>[t?`${t} cycle ${e.number}`:`Cycle ${e.number}`,at(e.progress),Gc(e.endsAt,n)].filter(Boolean).join(" · ");var on={source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null,work:null},Hc=(e)=>{let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)},lt=(e)=>e.replace(/\/+$/,""),Lr=(e)=>lt(e).split("/").pop()??"",Bc=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,Fc=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),n=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(n)return{host:n[1].toLowerCase(),path:n[2]};let r=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(r)return{host:r[1].toLowerCase(),path:r[2]};return null},jc=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],n=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],r=t??n;return r?Fc(r):null},Vc=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let n=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(n)return{host:n[1].toLowerCase(),path:n[2]};return null},Xc=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,ia=async(e,t)=>{let n=lt(t),r=(await e.listProjects().catch(()=>{return}))?.projects??[],o=r.find((m)=>lt(m.directory)===n)??null,s=null;for(let m of o?[o]:r){let h=((await e.listWorktrees(m.id).catch(()=>{return}))?.worktrees??[]).find((R)=>lt(R.directory)===n);if(h){o=m,s=h.branch||null;break}}if(!s)s=Bc(await e.readFile(".git/HEAD"));let i=o?`p:${o.id}`:`d:${Hc(n)}`,p=[...o?(await e.listSessions(o.id).catch(()=>{return}))?.sessions??[]:[]].sort((m,u)=>u.updatedAt-m.updatedAt),f=[],d=null;for(let m of p){for(let u of m.links??[]){let h=u.url.match(Xc)?.[1]?.toUpperCase();if(h&&!f.includes(h))f.push(h);if(!d&&u.kind==="change")d=Vc(u.url)}for(let u of m.items){let h=u.data,R=typeof h?.identifier==="string"?h.identifier.toUpperCase():null;if(R&&!f.includes(R))f.push(R)}}let _=jc(await e.readFile(".git/config"));if(_)await e.setRepo(i,_).catch(()=>{return});else _=await e.getRepo(i).catch(()=>null)??d;return{key:i,ocProjectId:o?.id??null,projectDirectory:o?lt(o.directory):n,directory:n,branch:s,repo:_,linkedIssues:f.slice(0,20)}},Wc=(e,t)=>{let n=[];for(let r of e.matchAll(/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6})-(\d+)(?![A-Za-z0-9])/g)){let o=r[1].toUpperCase(),s=`${o}-${r[2]}`;if(t.has(o)&&!n.includes(s))n.push(s)}return n},dt=(e)=>e.toLowerCase().replace(/[^a-z0-9]/g,""),na=new Set(["api","app","apps","web","ui","service","services","svc","server","client","helm","chart","charts","terraform","tf","infra","argo","deploy","config","lib","libs","sdk","core","backend","frontend","mobile","ios","android","worker","shared","common","util","utils","tools","tool","kit","test","tests","docs","demo","example","examples","sandbox","extension","extensions"]),Kc=(e)=>{let t=[],n=(i,a,p)=>{if(dt(i).length>=2&&!t.some((f)=>dt(f.text)===dt(i)))t.push({text:i,weight:a,label:p})},r=Lr(e.projectDirectory),o=e.repo?Lr(e.repo.path):"";if(n(r,1,`folder name "${r}"`),o)n(o,1,`repository "${o}"`);for(let i of[r,o].join("-").split(/[-_.\s]+/))if(i.length>=2&&!na.has(i.toLowerCase()))n(i,0.8,`the word "${i}" in the repository name`);let s=e.repo?e.repo.path.split("/").slice(0,-1).reverse():[];for(let i of s)if(!na.has(i.toLowerCase()))n(i,0.7,`repository group "${i}"`);return t},zc=(e,t)=>{let n=dt(e),r=dt(t);if(n.length<3||r.length<3)return 0;if(n===r)return 3;if(n.startsWith(r)||r.startsWith(n))return 2;if(n.includes(r)||r.includes(n))return 1;return 0};var ra=(e,t,n=1.4)=>{let r=null;for(let o of t)for(let s of e){let i=zc(o.name,s.text)*s.weight;if(o.key&&o.key.toLowerCase()===s.text.toLowerCase()&&o.key.length>=2)i=Math.max(i,2.5*s.weight);if(i>=n&&(!r||i>r.score))r={item:o,score:i,label:s.label}}return r},qc=(e)=>e.status.type!=="completed"&&e.status.type!=="canceled";var Jc=async(e,t,n)=>{let r=t.branch?Wc(t.branch,n).slice(0,3):[],o=t.linkedIssues.slice(0,1),s=[...r,...o.filter((a)=>!r.includes(a))];if(!s.length)return null;let i=await e.issuesByIdentifier(s).catch(()=>[]);for(let a of s){let p=i.find((f)=>f.identifier===a);if(p)return{identifier:p.identifier,title:p.title,url:p.url,teamKey:p.team.key,projectName:p.project?.name??null,from:r.includes(a)?"branch":"session"}}return null},oa=(...e)=>e.flatMap((t)=>Array.isArray(t)?t:t===void 0?[]:[t]).filter((t)=>typeof t==="string"),sa=(e)=>[...new Set(e)],Yc=async(e,t,n)=>{let r;try{r=JSON.parse(t)}catch{return null}let o=oa(r.teams,r.team).map((i)=>n.find((a)=>a.id===i||a.key.toLowerCase()===i.toLowerCase())?.id).filter((i)=>Boolean(i)),s=[];for(let i of oa(r.projects,r.project)){let a=i.trim(),p=a.match(/linear\.app\/[^/]+\/project\/([^/?#]+)/i)?.[1]?.split("-").pop(),d=(await e.projectsByIds([p??a]).catch(()=>[]))[0]??(await e.searchProjects(a).catch(()=>[])).find((_)=>_.name.toLowerCase()===a.toLowerCase());if(d)s.push(d.id)}return o.length||s.length?{teamIds:sa(o),projectIds:sa(s)}:null},aa=async(e,t,n)=>{let r=new Set(n.map((_)=>_.key.toUpperCase())),o=await Jc(e,t,r),s=(_)=>({..._,work:o}),i=await e.getMapping(t.key);if(i&&(i.linearProjectIds.length||i.teamIds.length))return s({source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:i.teamIds,projectIds:i.linearProjectIds,mapping:i});let a=await e.readFile(".linear.json");if(a){let _=await Yc(e,a,n);if(_)return s({source:"config",inferred:!1,evidence:".linear.json",..._,mapping:null})}if(t.repo){let _=await e.repoAttachments(`${t.repo.host}/${t.repo.path}/`).catch(()=>[]),m=new Map;for(let R of _)if(R.issue)m.set(R.issue.id,{team:R.issue.team.id,project:R.issue.project?.id??null});let u=new Map;for(let{team:R}of m.values())u.set(R,(u.get(R)??0)+1);let h=[...u.entries()].sort((R,b)=>b[1]-R[1])[0];if(h&&h[1]>=3){let R=new Map;for(let{team:T,project:k}of m.values())if(T===h[0]&&k)R.set(k,(R.get(k)??0)+1);let b=[...R.entries()].sort((T,k)=>k[1]-T[1])[0],y=b&&b[1]>=3&&b[1]/h[1]>=0.6?[b[0]]:[];return s({source:"repo",inferred:!0,evidence:`${h[1]} issues with merge requests in ${Lr(t.repo.path)}`,teamIds:[h[0]],projectIds:y,mapping:null})}}let p=Kc(t),f=ra(p,n);if(f)return s({source:"name",inferred:!0,evidence:f.label,teamIds:[f.item.id],projectIds:[],mapping:null});let d=p[0]?.text;if(d){let _=(await e.searchProjects(d).catch(()=>[])).filter(qc),m=ra(p,_,2);if(m)return s({source:"name",inferred:!0,evidence:m.label,teamIds:[],projectIds:[m.item.id],mapping:null})}return s({source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null})};var Qc=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,ca={listProjects:()=>A.listProjects(),listWorktrees:(e)=>A.listWorktrees(e),listSessions:(e)=>A.listSessions(e),readFile:(e)=>A.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:si,getRepo:Ir,setRepo:ai,issuesByIdentifier:async(e)=>{let t=e.filter((r)=>Qc.test(r));if(!t.length)return[];let n=await F(ot(t));return Object.values(n).filter((r)=>Boolean(r))},repoAttachments:async(e)=>(await F(Cs,{url:e})).attachments.nodes,searchProjects:$i,projectsByIds:tn},Dr=(e,t)=>e.teamsById.get(t)?.name??Di(t)?.name??"Unknown",la=(e,t)=>{let[n,r]=z(null),[o,s]=z(on),[i,a]=z(!1),[p,f]=z(0),d=Te(0);K(()=>{a(!1)},[e]),K(()=>{if(!t)return;let T=++d.current;if(!e){r(null),s(on),a(!0);return}(async()=>{let k=await ia(ca,e),v=await aa(ca,k,t.teams).catch(()=>on);if(T!==d.current)return;let X=v.teamIds.filter((O)=>t.teamsById.has(O)),Z=v.projectIds.length?await tn(v.projectIds).catch(()=>[]):[],ee=v.projectIds.filter((O)=>Z.some((se)=>se.id===O));if(T!==d.current)return;r(k),s({...v,teamIds:X,projectIds:ee}),a(!0)})()},[e,t,p]);let _=Ie(()=>f((T)=>T+1),[]),m=Ie(async(T,k)=>{if(!n)return!1;let v=[...T,...k],X=o.mapping?.activeProjectId,Z={directory:n.projectDirectory,linearProjectIds:k,teamIds:T,activeProjectId:v.length===1?v[0]:X&&v.includes(X)?X:v[0]??"all",finishComments:o.mapping?.finishComments??"off",updatedAt:Date.now()};s((O)=>({...O,source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:T,projectIds:k,mapping:Z}));let ee=await Jt(n.key,Z);if(!ee)await H(A,"error","Could not save this folder's choice. It applies until you reload.");return ee},[n,o]),u=Ie(async()=>{if(!await m(o.teamIds,o.projectIds))return;let T=t?[...o.teamIds,...o.projectIds].map((k)=>Dr(t,k)).join(", "):"";await H(A,"success",T?`Pinned ${T} to this folder`:"Pinned to this folder")},[m,o,t]),h=Ie(async()=>{if(!n)return;await ii(n.key),_()},[n,_]),R=Ie((T)=>{if(!n||!o.mapping)return;let k={...o.mapping,activeProjectId:T,updatedAt:Date.now()};s((v)=>({...v,mapping:k})),Jt(n.key,k)},[n,o]),b=Ie(async(T)=>{if(!n||!o.mapping)return!1;let k={...o.mapping,...T,updatedAt:Date.now()};s((X)=>({...X,mapping:k}));let v=await Jt(n.key,k);if(!v)await H(A,"error","Could not save the setting. It applies until you reload.");return v},[n,o]),y=o.teamIds.length+o.projectIds.length>0;return{place:n,detection:o,settled:i,mapped:y,refresh:_,save:m,pin:u,clear:h,setActive:R,update:b}};var Zc=3,el=2,ua="refresh",$r=new Set;A.onStatusControl((e)=>{if(e.id===ua)for(let t of $r)t()});var tl=(e)=>{let t=[...e.detection.teamIds,...e.detection.projectIds],n=e.detection.mapping?.activeProjectId??t[0]??"all";return n==="all"||!t.includes(n)?t:[n]},da=(e)=>e.targetDate?`target ${it(e.targetDate)}`:"no target date",nl=({projects:e})=>{if(e.length===1){let t=e[0],n=t.health?zt[t.health]:void 0;return E("div",{class:"lin-status-block",children:[E(js,{label:t.name,value:t.progress*100,tone:n},void 0,!1,void 0,this),E("div",{class:"sui-row sui-small sui-muted",children:[t.health&&E(An,{tone:zt[t.health]},void 0,!1,void 0,this),E("span",{children:[t.health?Kt[t.health]:t.status.name,da(t)].join(" · ")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}return E("div",{class:"lin-status-block",children:e.slice(0,Zc).map((t)=>E("div",{class:"lin-status-project",title:`${t.name}: ${t.health?Kt[t.health]:t.status.name}, ${da(t)}`,children:[E(An,{tone:t.health?zt[t.health]:"muted"},void 0,!1,void 0,this),E("span",{class:"lin-ellipsis sui-grow",children:t.name},void 0,!1,void 0,this),E("span",{class:"sui-muted sui-small",children:at(t.progress)},void 0,!1,void 0,this),E("span",{class:"sui-muted sui-small lin-status-date",children:t.targetDate?it(t.targetDate):""},void 0,!1,void 0,this)]},t.id,!0,void 0,this))},void 0,!1,void 0,this)},rl=(e,t,n)=>{let r=new Set(t.filter((o)=>e.teamsById.has(o)));for(let o of n)for(let s of o.teams.nodes)r.add(s.id);return[...r].map((o)=>e.teamsById.get(o)).filter((o)=>Boolean(o?.activeCycle))},ol=({issue:e,onOpen:t})=>E("div",{class:"lin-status-line",role:"button",tabIndex:0,"data-issue":e.identifier,title:`${e.identifier} ${e.title} (${e.state.name})`,onClick:t,onKeyDown:(n)=>{if(n.key==="Enter")t()},children:[E(Pr,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:13},void 0,!1,void 0,this),E("span",{class:"sui-mono sui-muted lin-status-key",children:e.identifier},void 0,!1,void 0,this),E("span",{class:"lin-ellipsis sui-grow",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),sn=({children:e,action:t})=>E("div",{class:"sui-row",children:[E("span",{class:"sui-muted sui-grow",children:e},void 0,!1,void 0,this),t&&E(Se,{label:t.label,variant:"outline",size:"xs",onClick:t.onClick},void 0,!1,void 0,this)]},void 0,!0,void 0,this),sl=({directory:e,workspace:t,state:n})=>{let r=tl(n),o=r.filter((O)=>t.teamsById.has(O)),s=r.filter((O)=>!t.teamsById.has(O)),i=Zt(o,s),a=nn(s),p=Gi(i),f=ct(i),d=Hi(e),_=Bi(e),[m,u]=z(new Set),h=n.place?.key??"",R=rl(t,r,a.data??[]).slice(0,el),b=De(()=>Zi(Qi(p.data?.nodes??[])),[p.data]),y=De(()=>ea(f.data?.issues??[]),[f.data]),T=(d.data??[]).filter((O)=>!m.has(st(O))),k=(_.data??[]).filter((O)=>!m.has(st(O))),v=async(O)=>{if(!await Mr({placeKey:h,issue:O}))await H(A,"info",`Open the Linear panel to see ${O}.`)},X=s.length>0&&a.loading&&!a.data||p.loading&&!p.data||f.loading&&!f.data,Z=[a.error,p.error,f.error].find((O)=>O!==void 0&&O!==null),ee=[a.data?.length?"project":"",R.length?"cycle":"",b.shown.length?"chips":"",y.length?"mine":"",k.length?"plans":"",T.length?"drafts":""].filter(Boolean);return E(ge,{children:[n.detection.inferred&&E("div",{class:"lin-status-hint sui-small",children:[E("span",{class:"sui-muted sui-grow lin-ellipsis",title:`Detected from ${n.detection.evidence}`,children:[il(t,n)," (detected from ",n.detection.evidence,")"]},void 0,!0,void 0,this),E(Se,{label:"Pin",variant:"outline",size:"xs",onClick:()=>{n.pin()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),k.map((O)=>E(Ci,{handoff:O,onDone:()=>{u((se)=>new Set(se).add(st(O))),_.refresh()}},O.id,!1,void 0,this)),E(Yi,{directory:e},void 0,!1,void 0,this),T.map((O)=>E(Vs,{draft:O,onDone:()=>{u((se)=>new Set(se).add(st(O))),d.refresh()}},O.id,!1,void 0,this)),a.data?.length?E(nl,{projects:a.data},void 0,!1,void 0,this):null,R.map((O)=>E("div",{class:"sui-small",children:ta(O.activeCycle,R.length>1?O.key:null)},O.id,!1,void 0,this)),b.shown.length>0&&E("div",{class:"sui-row",children:[b.shown.map((O)=>E(Ro,{children:[E(Pr,{type:O.type,color:O.color,teamId:O.teamId,stateId:O.stateId,size:12},void 0,!1,void 0,this),O.count," ",O.name]},O.key,!0,void 0,this)),b.hidden.length>0&&E("span",{class:"sui-muted sui-small",title:b.hidden.map((O)=>`${O.count} ${O.name}`).join(", "),children:["+",b.hidden.length," more"]},void 0,!0,void 0,this),p.data?.capped&&E("span",{class:"sui-muted sui-small",children:["counted the first ",p.data.nodes.length.toLocaleString("en-US")]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),y.length>0&&E("div",{class:"lin-status-block",children:[E("div",{class:"lin-subheading",children:["My issues",f.data?.more?" (first 50)":""]},void 0,!0,void 0,this),y.map((O)=>E(ol,{issue:O,onOpen:()=>{v(O.identifier)}},O.id,!1,void 0,this))]},void 0,!0,void 0,this),X&&!ee.length&&E(Xt,{size:"sm",label:"Loading Linear"},void 0,!1,void 0,this),Z!==void 0&&!ee.length&&E(al,{error:Z},void 0,!1,void 0,this),!X&&Z===void 0&&!ee.length&&E(sn,{children:"Nothing open for this folder in Linear."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},il=(e,t)=>[...t.detection.teamIds,...t.detection.projectIds].map((n)=>Dr(e,n)).join(", "),al=({error:e})=>E(Tr,{tone:"error",title:"Could not load Linear",body:e instanceof Error?e.message:String(e)},void 0,!1,void 0,this),pa=()=>{let e=ys(),t=Ri(),n=e?.directory??null,r=la(n,t.data),o=Te(null),[s,i]=z(!1);K(()=>{let d=o.current;if(!d)return;let _=new ResizeObserver(()=>{A.setHeight(Math.ceil(d.getBoundingClientRect().height)).catch(()=>{return})});return _.observe(d),()=>_.disconnect()},[]);let a=Ie(()=>{ue(""),r.refresh(),wr(!0).then(()=>H(A,"success","Linear refreshed"),()=>H(A,"error","Could not refresh Linear. Check the connection and try again."))},[r.refresh]),p=Te(a);p.current=a,K(()=>{let d=()=>p.current();return $r.add(d),()=>{$r.delete(d)}},[]),K(()=>{if(!e?.features?.statusControls){i(!1);return}let d=()=>A.setStatusControls([{kind:"button",id:ua,label:"Refresh"}]).then(()=>i(!0),()=>i(!1));return d(),A.onDirectory(()=>{d()})},[e?.features?.statusControls]),K(()=>{let d=setInterval(()=>{if(document.visibilityState!=="visible")return;ue("status-"),ue("projects:"),wr(!0).catch(()=>{return})},60000);return()=>clearInterval(d)},[]);let f=(()=>{if(!e)return E(Xt,{size:"sm",label:"Loading"},void 0,!1,void 0,this);if(!n)return E(sn,{children:"Open a project to see its Linear work."},void 0,!1,void 0,this);if(t.error&&!t.data){let _=t.error instanceof ce?t.error:new ce("network",String(t.error));return _.kind==="disconnected"?E(sn,{action:{label:"Connect",onClick:()=>{A.oauthStart()}},children:"Linear is not connected."},void 0,!1,void 0,this):E(Tr,{tone:"error",title:"Could not load Linear",body:_.message,action:{label:"Retry",onClick:()=>t.refresh()}},void 0,!1,void 0,this)}if(!t.data||!r.settled)return E(Xt,{size:"sm",label:"Loading Linear"},void 0,!1,void 0,this);let d=E(Ki,{directory:n,orgKey:t.data.viewer.organization?.urlKey??null},void 0,!1,void 0,this);if(!r.mapped)return E(ge,{children:[d,E(sn,{action:{label:"Pick",onClick:()=>{cl(r.place?.key??"")}},children:"Pick a Linear project"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return E(ge,{children:[d,E(Wi,{directory:n,workspace:t.data,state:r},void 0,!1,void 0,this),E(Ji,{directory:n,viewerId:t.data.viewer.id},void 0,!1,void 0,this),E(sl,{directory:n,workspace:t.data,state:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)})();return E("div",{class:"lin-status",ref:o,children:[f,!s&&e&&n&&r.settled&&E("div",{class:"lin-status-refresh",children:E(Se,{label:"Refresh",variant:"ghost",size:"xs",onClick:a},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},cl=async(e)=>{if(!await Mr({placeKey:e,view:"picker"}))await H(A,"info","Open the Linear panel to pick a project.")};lo(E(pa,{},void 0,!1,void 0,this),document.getElementById("root"));})();

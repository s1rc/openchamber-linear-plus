(()=>{var N,Fr,Xi,we,nn,_t,jr,dt,Xr,on,rn,Wi,Ke=Symbol.for("pv"),mt={},Et=[],Ki=/^m(i|n|o|s|text|space)$/,sn=Array.isArray,Wr=Et.slice,Ne=Object.assign;function Ue(e){e&&e.parentNode&&e.remove()}function ut(e,t,n,r,o){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Ke,__v:o||++Fr,__i:-1,__u:0};return!o&&N.vnode&&N.vnode(s),s}function Ae(e){return e.children}function pt(e,t){this.props=e,this.context=t,this.__g=0}function Pe(e,t){if(t==null)return e.__&&Pe(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:Pe(e)}function zi(e){var t,n=e.__v,r=n.__e,o=[],s=[],i=e.__P;i&&((t=Ne({constructor:Ke},n)).__v=n.__v+1,N.vnode&&N.vnode(t),an(i,t,n,e.__n,i.namespaceURI,32&n.__u?[r]:null,o,r||Pe(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,Qr(o,t,s),n.__=n.__e=null,t.__e!=r&&Kr(t))}function Kr(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),Kr(e)}function Br(e){(8&e.__g||(e.__g|=8,we.push(e),_t++))&&nn==N.debounceRendering||((nn=N.debounceRendering)||queueMicrotask)(zr)}function zr(){try{for(var e,t=1;we.length;)we.length>t&&we.sort(jr),e=we.shift(),t=we.length,8&e.__g&&zi(e)}finally{(_t=we.length)&&(nn||queueMicrotask)(zr)}}function qr(e,t,n,r,o,s,i,c,p,f,d){var _,m,u,T,O,b,y=r.__k||Et,g=t.length;for(p=qi(n,t,y,p,g),_=0;_<g;_++)(u=n.__k[_])!=null&&(m=~u.__i&&y[u.__i]||mt,u.__i=_,b=an(e,u,m,o,s,i,c,p,f,d),T=u.__e,(m.ref!=u.ref||8&m.__u)&&(m.ref&&cn(m.ref,null,u,m),u.ref&&d.push(u.ref,u.__c||T,u)),O=O||T,4&u.__u?(p=Jr(u,p,e,!m.__v),m.__e&&(m.__e=null)):typeof u.type=="function"&&b!==void 0?p=b:T&&(p=T.nextSibling),u.__u&=-21);return n.__e=O,p}function qi(e,t,n,r,o){var s,i,c,p,f,d,_,m,u,T=n.length,O=T,b=0,y=0,g=e.__k=Array(o);for(s=0;s<o;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=g[s]=ut(null,i):sn(i)?i=g[s]=ut(Ae,{children:i}):i.constructor===Ke&&i.__b?i=g[s]=ut(i.type,i.props,i.key,i.ref,i.__v):g[s]=i,p=s+b,i.__=e,i.__b=e.__b+1,c=null,~(f=i.__i=Ji(i,n,p,O))&&(O--,(c=n[f])&&(c.__u|=2)),c&&c.__v?(i.__u|=16,f==p-1?b--:f==p+1?b++:f!=p&&(f>p?b--:b++,y=1)):(~f||(o>T?b--:o<T&&b++),typeof i.type!="function"&&(i.__u|=4))):g[s]=null;if(y){for(d=[],_=[],s=0;s<o;s++)if((i=g[s])&&16&i.__u){for(b=0,m=d.length;b<m;)d[u=b+m>>1]<i.__i?b=u+1:m=u;d[b]=i.__i,_[s]=b+1}for(b=d.length;s--;)_[s]&&(_[s]==b?b--:g[s].__u|=4)}if(O)for(s=0;s<T;s++)!(c=n[s])||2&c.__u||(c.__e==r&&(r=Pe(c)),ln(c,c));return r}function Jr(e,t,n,r){var o,s,i,c;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=Jr(o[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=Pe(e))&&!t.parentNode&&(t=null),i=e.__e,c=t;c&&c.nodeType==8;)c=c.nextSibling;for(i!=c&&(!r&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Ji(e,t,n,r){var o,{key:s,type:i}=e,c=t[n],p=c&&!(2&c.__u);if(c===null&&s==null||p&&s==c.key&&i==c.type)return n;if(r>(p?1:0)){for(o=n-1;o>=0;o--)if((c=t[o])&&!(2&c.__u)&&s==c.key&&i==c.type)return o;for(o=n+1;o<t.length;o++)if((c=t[o])&&!(2&c.__u)&&s==c.key&&i==c.type)return o}return-1}function Vr(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function lt(e,t,n,r,o){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Vr(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||Vr(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof r!="function"&&(r=null),(e.__e||(e.__e={}))[t]=n,n&&r||(i=rn[t]||(rn[t]=Yi(t)),(e.__a||(e.__a={}))[t]=on,s=t!=(t=t.replace(Xr,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(c){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function Yi(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[dt]==null)t[dt]=on++;else if(t[dt]<this.__a[e])return;return n(N.event?N.event(t):t)}}}function an(e,t,n,r,o,s,i,c,p,f){var d,_,m,u,T,O,b,y,g,I,w,F,J,Y,x,se,ie,K,S=t.type;if(t.constructor!==Ke)return null;128&n.__u&&(p=32&n.__u,d=n.__c.__z)&&(t.__u|=p,_=s=[],d.nodeType==8?c=ft(d,s):s.push(d),c=s[0]||c),(d=N.__b)&&d(t);e:if(typeof S=="function"){m=i.length;try{if(y=t.props,g=(d=S.prototype)&&d.render,I=(d=S.contextType)&&r[d.__c],w=d?I?I.props.value:d.__:r,(u=n.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(g?t.__c=u=new S(y,w):(t.__c=u=new pt(y,w),u.constructor=S,u.render=Zi),I&&I.sub(u),u.state||(u.state={}),u.__n=r,u.__g|=8,u.__h=[],u.__k=[]),g&&(u.__s||(u.__s=u.state),S.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=Ne({},u.__s)),Ne(u.__s,S.getDerivedStateFromProps(y,u.__s)))),T=u.props,O=u.state,u.__v=t,n.__c){if(y!==T&&g&&!S.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(y,w),t.__v==n.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(y,u.__s,w)===!1){t.__v!=n.__v&&(u.props=y,u.state=u.__s,u.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(h){h&&(h.__=t)}),Et.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),c=Pe(n);break e}u.componentWillUpdate&&u.componentWillUpdate(y,u.__s,w),g&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(T,O,b)})}else g&&!S.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),g&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=w,u.props=y,u.__P=e,u.__g&=-5,F=N.__r,J=g?25:0;do u.__g&=-9,F&&F(t),d=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++J<25);g&&(Et.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(r=Ne({},r,u.getChildContext())),g&&n.__c&&u.getSnapshotBeforeUpdate&&(b=u.getSnapshotBeforeUpdate(T,O)),Y=d&&d.type===Ae&&d.key==null?d.props.children:d,y.__P&&(d=c,o=(e=y.__P).namespaceURI,p=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(h){h&&ln(h,h)}),n.__k=null),c=n.__k?Pe(n,0):null),c=qr(e,sn(Y)?Y:[Y],t,n,r,o,s,i,c,p,f),y.__P&&(t.__e=null,c=d),t.__u&=-161,_&&_.some(Ue),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(h){if(i.length=m,t.__v=null,p||s)if(h&&h.then){if(t.__u|=128|p,s){for(~(ie=s.indexOf(c||void 0))||(ie=s.length);(K=s[ie-1])&&K.nodeType==8;)ie--;for(;ie<s.length;ie++)if(K=s[ie])if(s[ie]=null,x){if(K==se)break}else{if(K.nodeType!=8)break;K.data.startsWith("$s")&&(se=ft(x=K))}}if(!x){for(;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;x=c}(d=ft(x=t.__c.__z||(t.__c.__z=x)))?(t.__e=x,c=d):t.__e=c,c=c&&c.nextSibling}else s&&s.some(Ue);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),h&&h.then||Yr(t),N.__e(h,t,n)}}else c=t.__e=Qi(n.__e,t,n,r,o,s,i,p,f,e);return(d=N.diffed)&&d(t),c}function ft(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function Yr(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(Yr))}function Qr(e,t,n){for(var r=0;r<n.length;)cn(n[r++],n[r++],n[r++]);N.__c&&N.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){N.__e(s,o.__v)}})}function Qi(e,t,n,r,o,s,i,c,p,f){var d,_,m,u,T,O,b,y,g=n.props||mt,{props:I,type:w}=t;if(w=="svg"?o="http://www.w3.org/2000/svg":w=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(d=0;d<s.length;d++)if((T=s[d])&&(w?T.localName==w:T.nodeType==3)){e=T,s[d]=null;break}}if(!e){if(y=f.ownerDocument||document,!w)return y.createTextNode(I);e=y.createElementNS(o,w,I.is?I:f),c&&(N.__m&&N.__m(t,s),c=!1),s=null}if(w){if(f=w=="template"&&e.content||e,s=w=="textarea"&&I.defaultValue!=null?null:s&&Wr.call(f.childNodes),!c&&s)for(g={},d=0;d<e.attributes.length;d++)g[(T=e.attributes[d]).name]=T.value;for(d in g)T=g[d],d=="dangerouslySetInnerHTML"?m=T:d=="children"||(d in I)||d=="value"&&("defaultValue"in I)||d=="checked"&&("defaultChecked"in I)||lt(e,d,null,T,o);for(d in I)T=I[d],d=="children"?u=T:d=="dangerouslySetInnerHTML"?_=T:d=="value"?O=T:d=="checked"?b=T:c&&typeof T!="function"||g[d]===T||lt(e,d,T,g[d],o);_?(c||m&&(_.__html==m.__html||_.__html==e.innerHTML)||(e.innerHTML=_.__html),t.__k=[]):(m&&(e.textContent=""),(w=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&Ki.test(w))&&(o="http://www.w3.org/1999/xhtml"),qr(f,sn(u)?u:[u],t,n,r,o,s,i,s?s[0]:n.__k&&Pe(n,0),c,p),s&&s.some(Ue)),c&&w!="textarea"||(d="value",w=="progress"&&O==null?e.removeAttribute(d):O==null||O===e[d]&&(w!="progress"||O)||lt(e,d,O,g[d],o),d="checked",b!=null&&b!=e[d]&&lt(e,d,b,g[d],o))}else g===I||c&&e.data==I||(e.data=I);return e}function cn(e,t,n,r){try{typeof e=="function"?t?t.__x=e(t)||1:r&&(r=r.__c||r.__e)&&(t=r.__x)&&(r.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){N.__e(o,n)}}function ln(e,t,n){var r,o,s,i;if(N.unmount&&N.unmount(e),!(r=e.ref)||r.current&&r.current!=e.__e||cn(r,null,t,e),r=e.__c){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(c){N.__e(c,t)}r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&ln(r[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(r=e.__c)&&(r=r.__z)&&(o=ft(r,s=[]))&&(r==e.__e&&s.some(Ue),Ue(o),Ue(r)),n||Ue(e.__e),e.__e=e.__c=e.__=null}function Zi(e,t,n){return this.constructor(e,n)}function Zr(e,t){var n,r,o,s;N.__&&N.__(e,t),t.nodeType==9&&(t=t.documentElement),r=(n=e&&32&e.__u)?null:t.__k,t.__k=ut(Ae,{children:[e]}),o=[],s=[],an(t,t.__k,r||mt,mt,t.namespaceURI,r?null:t.firstChild?Wr.call(t.childNodes):null,o,r?r.__e:t.firstChild,n,s),Qr(o,t.__k,s),t.__k.props.children=null}N={__e:function(e,t,n,r){for(var o,s,i;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((i=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,r||{}),i=1),i&&8&o.__g)return void(o.__g|=2)}catch(c){e=c}}throw _t=0,e}},Fr=0,Xi=function(e){return e!=null&&e.constructor===Ke},pt.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=Ne({},this.state)),typeof e=="function"&&(e=e(Ne({},n),this.props)),e&&(Ne(n,e),this.__v&&(t&&this.__k.push(t),Br(this)))},pt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Br(this))},pt.prototype.render=Ae,we=[],_t=0,jr=function(e,t){return e.__v.__b-t.__v.__b},dt=Symbol(),Xr=/(PointerCapture)$|Capture$/i,on=0,rn={},Wi=0;var qe,ne,dn,eo,un=Object.is,Je=0,lo=[],pn=[],ee=N,{__b:to,__r:no,diffed:ro,__c:oo,unmount:so,__:io}=ee;function _n(e,t){ee.__h&&ee.__h(ne,e,Je||t),Je=0;var n=ne.__H||(ne.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function te(e){return Je=1,ea(po,e)}function ea(e,t,n){var r=_n(qe++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):po(void 0,t),function(s){var i=(r.__N||r.__)[0],c=r.t(i,s);un(i,c)||(r.__N=[c,r.__[1]],r.__c.setState({}))}],r.__c=ne,!ne.__f)){ne.__f=!0;var o=ne.shouldComponentUpdate;ne.shouldComponentUpdate=function(s,i,c){var p=this.__H;if(!p)return!0;var f=!1,d=this.props!=s;if(p.__.some(function(m){m.__N&&(f=!0,un(m.__[0],m.__N[0])||(d=!0))}),o){var _=o.call(this,s,i,c);return f?_||d:_}return!f||d}}return r.__}function re(e,t){var n=_n(qe++,3);!ee.__s&&uo(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,ne.__H.__h.push(n))}function Se(e){return Je=5,Le(function(){return{current:e}},[])}function Le(e,t){var n=_n(qe++,7);return uo(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function xe(e,t){return Je=8,Le(function(){return e},t)}function ta(){var e;do{for(;e=pn.shift();)try{ze(e)}catch(n){ee.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=lo.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(ze),t.__h.some(fn),t.__h=[]}catch(n){t.__h=[],ee.__e(n,e.__v)}}}while(pn.length)}ee.__b=function(e){ne=null,to&&to(e)},ee.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),io&&io(e,t)},ee.__r=function(e){no&&no(e),qe=0;var t=(ne=e.__c).__H;t&&(dn==ne?ne.__h=[]:(t.__h.some(ze),t.__h.some(fn),qe=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),dn=ne},ee.diffed=function(e){ro&&ro(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&co(lo.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),dn=ne=null},ee.__c=function(e,t){t.some(function(n){try{n.__h.some(ze),n.__h=n.__h.filter(function(r){return!r.__||fn(r)})}catch(r){n.__h=[function(){throw r}]}}),oo&&oo(e,t)},ee.unmount=function(e){so&&so(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{if(o.__P&&o.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}o.__P=n,co(pn.push(o))}else ze(o)}catch(s){t=s}}),r.__H=void 0,t&&ee.__e(t,r.__v))};var ao=typeof requestAnimationFrame=="function";function na(e){var t,n=function(){clearTimeout(r),ao&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);ao&&(t=requestAnimationFrame(n))}function co(e){e!=1&&eo==ee.requestAnimationFrame||((eo=ee.requestAnimationFrame)||na)(ta)}function ze(e){var t=ne,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),ne=t}function fn(e){var t=ne;e.__c=e.__(),ne=t}function uo(e,t){return!e||e.length!=t.length||t.some(function(n,r){return!un(n,e[r])})}function po(e,t){return typeof t=="function"?t(e):t}var ra=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},fo=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),oa=(e,t)=>{let n=e;for(let r of t){if(n===null||n===void 0)return;n=n[r]}return n},mn=(e,t)=>{let n=(r,o)=>{if(typeof r==="function")return(...s)=>{let i=oa(t.current,o);return typeof i==="function"?i(...s):void 0};if(Array.isArray(r))return r.map((s,i)=>n(s,[...o,i]));if(ra(r))return Object.fromEntries(Object.entries(r).map(([s,i])=>[s,n(i,[...o,s])]));return r};return n(e,[])};var sa=Symbol.for("pv"),ia=0;function E(e,t,n,r,o,s){t||(t={});var i,c,p=t;if("ref"in p&&typeof e!="function")for(c in p={},t)c=="ref"?i=t[c]:p[c]=t[c];var f={type:e,props:p,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:sa,__v:--ia,__i:-1,__u:0};return(o||s)&&(f.__source=o,f.__self=s),N.vnode&&N.vnode(f),f}var _o=(...e)=>e.filter(Boolean).join(" "),En=({tone:e,class:t})=>E("span",{class:_o("sui-dot",`sui-dot--${e}`,t)},void 0,!1,void 0,this),mo=({children:e,class:t})=>E("span",{class:_o("sui-chip",t),children:e},void 0,!1,void 0,this);var Eo=(e,t)=>{let n=Se(null),r=Se(null),o=Se(t);o.current=t;let s=fo(t),i=Se(!1);re(()=>{if(!n.current)return;return r.current=e(n.current,mn(o.current,o)),i.current=!0,()=>{r.current?.dispose(),r.current=null,i.current=!1}},[]);let c=Se(s);return re(()=>{if(!i.current||c.current===s)return;c.current=s,r.current?.update(mn(o.current,o))},[s]),n};async function de(e,t,n,r={}){let o=r.name??"extension",s={};for(let[i,c]of Object.entries(r.query??{}))if(c)s[i]=c;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...r.body!==void 0?{body:JSON.stringify(r.body)}:{}}),c;try{c=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${o} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&c.ok===void 0)return{ok:!1,error:String(c.message??`Error ${i.status}`),code:"failed"};return c}catch(i){let c=i.code;if(c==="NO_SERVICE")return{ok:!1,error:`Approve the ${o} service in Settings > Extensions.`,code:"failed"};if(c==="SERVICE_FAILED")return{ok:!1,error:`The ${o} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${o} service.`,code:"failed"}}}async function oe(e,t,n,r={}){try{await e.toast({kind:t,message:n,...r.dismiss?{dismiss:!0}:{}})}catch{}}var He=new Map,ca=30000,So=(e)=>{let t=He.get(e);if(!t)t={at:0,listeners:new Set},He.set(e,t);return t},St=(e)=>{for(let t of e.listeners)t()},De=(e,t,n=!1)=>{let r=So(e);if(r.promise)return r.promise;if(!n&&r.value!==void 0&&Date.now()-r.at<ca)return Promise.resolve(r.value);let o=t().then((s)=>(r.value=s,r.error=void 0,r.at=Date.now(),s),(s)=>{throw r.error=s,s}).finally(()=>{r.promise=void 0,St(r)});return r.promise=o,St(r),o};var ho=(e)=>{let t=[];for(let[n,r]of He){if(r.value===void 0)continue;let o=e(n,r.value);if(o===r.value)continue;t.push([r,r.value]),r.value=o,St(r)}return()=>{for(let[n,r]of t)n.value=r,St(n)}},Sn=(e)=>{let t=He.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)De(e,t.fetcher,!0).catch(()=>{return})},Oe=(e)=>{for(let[t,n]of He){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)De(t,n.fetcher,!0).catch(()=>{return})}},Re=(e,t)=>{let[,n]=te(0);re(()=>{if(!e)return;let o=So(e);o.fetcher=t;let s=()=>n((i)=>i+1);return o.listeners.add(s),De(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let r=e?He.get(e):void 0;return{data:r?.value,error:r?.error,loading:Boolean(r?.promise)||e!==null&&r?.value===void 0&&r?.error===void 0,refresh:()=>{if(e)De(e,t,!0).catch(()=>{return})}}};var M="openchamber.sdk",U=1;var hn=`
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
`;function Tn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(r)=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=n.get(o);if(s!==void 0)clearTimeout(s);n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var la=`(${Tn.toString()})(document);`;var gn=128,yn=65536;var ht=128;var Tt=65536;var Ao=/^[a-z][a-z0-9-]{0,39}$/;var To=(e)=>Object(e)===e&&!Array.isArray(e),An=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),go=(e)=>String(e)===e&&e.length>=1&&e.length<=60,yo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,xo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!To(n)||!Ao.test(n.id)||!go(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!An(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!An(n,["kind","id","label","value","options","disabled"]))return!1;if(!yo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!To(o)||!An(o,["value","label"])||!yo(o.value)||!go(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var Oo=["{id}","{segment}","{segments+}"];var ml=new Set(Oo);var Ro=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Sl=new Set(Ro);var gt=20000000,yt=256;var xn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,ko=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var bo=/^[A-Za-z0-9_-]{1,80}$/;var Io=["left","right","top","bottom"];var Co=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!Co(o,t+1,n))return!1;return!0},On=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(On);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(On)}return String(e)===e||Number.isFinite(e)},Rn=(e)=>{try{if(String(e.id)!==e.id||!bo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Io.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Co(e.data)||!On(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var bn=2000;var wo=["file","directory","other","missing"],In=(e)=>Boolean(e&&"sessionId"in e),Cn=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Po=/^[0-9a-f]{7,64}$/i,vn=(e)=>Po.test(e),At=500,xt=32000,Mo=16000,Uo=128,No=200,Lo=2000,Do=16000,$o=80,Go=200,Ho=16000;var Bo=2000;var wn=20000,Ot=1024,Rt=2000000;var kt=64000,bt=8000,Pn=4000;var Mn=960000;var Vo=999,Fo=1e4,Ye=500,jo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Xo=["stopped","starting","ready","failed"],ua=new Set(jo),Wo=(e)=>ua.has(e),Ko=(e)=>e&&Wo(e)?e:"HOST_REJECTED",Be=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Be);if(Object(e)===e)return Object.values(e).every(Be);return!1},zo=(e)=>Be(e)&&JSON.stringify(e).length<=Ho,vo=(e)=>e?.trim().slice(0,Go)??"",Ve=(e)=>{let t=e.id.trim().slice(0,Uo),n=e.title.trim().slice(0,No),r=e.url.trim().slice(0,Lo),o=e.text?.trim().slice(0,Do),s=e.author?.trim().slice(0,$o),i=e.kind==="pull"?"pull":"issue",c={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o)c.text=o;if(s)c.author=s;if(i==="pull"){let p=vo(e.branches?.head),f=vo(e.branches?.base);if(p&&f)c.branches={head:p,base:f}}if(zo(e.data))c.data=e.data;return c},Un=(e)=>{let t=Ve(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Nn=(e)=>{let t={text:e.text.trim().slice(0,Mo)};if(e.send)t.send=!0;return t},Ln=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Vo,Math.max(0,Math.round(e)))},Dn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Fo,Math.max(0,Math.ceil(e)))};var Fe=(e)=>e.length>0&&e.length<=Ot&&!e.includes("\x00")&&!e.includes("\\");var It=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Bo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},pa=new Set(Xo),$n=(e)=>Boolean(e&&"status"in e&&pa.has(String(e.status))&&!("body"in e)),Ct=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Gn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Hn=(e)=>Boolean(e&&"written"in e&&e.written===!0),Bn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),fa=new Set(wo),Vn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&fa.has(String(e.kind))&&Number.isFinite(e.size)),Fn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),_a=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ma=(e)=>Object(e)===e?e:null,kn=(e)=>String(e)===e&&e.length>0,Ea=(e)=>{if(!kn(e.id))return null;if(e.ok===!0){let t={channel:M,v:U,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&kn(e.error))return{channel:M,v:U,type:"result",id:e.id,ok:!1,error:e.error,code:Ko(kn(e.code)?e.code:void 0)};return null},jn=(e)=>{let t=ma(e);if(!t||t.channel!==M||t.v!==U)return null;if(t.type==="result")return Ea(t);if(!_a.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var qo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Sa=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class v extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var Jo=()=>Promise.reject(new v("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),vt=()=>Promise.reject(new v("BAD_PATH",`File path must be 1 to ${Ot} characters without NUL or backslash.`)),wt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new v("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},P=(e)=>(e.value+=1,`oc-${e.value}`),Xn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new v("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((a)=>a===t.parent),r=e.requestTimeoutMs??wn,o=new Set,s=new Set,i=new Set,c=new Set,p=new Set,f=new Set,d=new Set,_=new Set,m=new Set,u=new Set,T=new Set,O=new Set,b=[],y=null,g=null,I=new Set,w=new Set,F=null,J=null,Y=!1,x=new Map,se=new Map,ie=new Map,K=!1,S={value:0},h=null,ye=null,Xe=!1,We=!1,Cr=null,vr=(a)=>{if(!a)return null;return{sessionId:a.id,phase:a.busy?"started":"completed"}},fe=(a)=>{t.parent.postMessage(a,"*")},wr=()=>{if(K||t.parent===t||O.size===0||h?.features?.lateGenerateResults!==!0)return;fe({channel:M,v:U,type:"generate-late-listen"})},j=(a,l)=>{for(let R of a)try{R(l)}catch(C){console.error(C)}},Pr=(a)=>{if(!(a instanceof MessageEvent))return;if(!n(a.source))return;let l=jn(a.data);if(!l)return;if(l.type==="workspace"){let C=se.get(l.payload.subscriptionId);if(C)j([C],l.payload.snapshot);return}if(l.type==="shells"){let C=ie.get(l.payload.subscriptionId);if(C)j([C],l.payload.snapshot);return}if(l.type==="ready"){if(h=l.payload,ye=vr(l.payload.session),j(o,l.payload),j(s,l.payload.directory),j(i,l.payload.session),ye)j(c,ye);if(j(p,l.payload.connection),j(f,l.payload.settings),j(d,l.payload.item),l.payload.block)j(_,l.payload.block);wr();return}if(l.type==="service-event"){j(m,l.payload);return}if(l.type==="generate-late"){if(O.size===0)b.push(l.payload);else j(O,l.payload);return}if(l.type==="directory"){if(h)h={...h,directory:l.payload.directory};j(s,l.payload.directory);return}if(l.type==="session"){if(h)h={...h,session:l.payload.session};if(!l.payload.session)ye=null;else if(ye?.sessionId!==l.payload.session.id)ye=vr(l.payload.session);j(i,l.payload.session);return}if(l.type==="session-lifecycle"){ye=l.payload,j(c,l.payload);return}if(l.type==="connection"){if(h)h={...h,connection:l.payload.connection};j(p,l.payload.connection);return}if(l.type==="settings"){if(h)h={...h,settings:l.payload.settings};j(f,l.payload.settings);return}if(l.type==="item"){if(h)h={...h,item:l.payload.item};j(d,l.payload.item);return}if(l.type==="status-control-event"){j(u,l.payload);return}if(l.type==="popover-closed"){j(T,l.payload);return}if(l.type==="action"){let C=(G)=>{if(!K)fe({channel:M,v:U,type:"action-result",id:l.id,payload:G})},B=g;if(!B){C({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>B(l.payload)).then(()=>C({ok:!0}),(G)=>{let Z=(G instanceof Error?G.message:String(G)).trim();C({ok:!1,error:(Z||"Action failed.").slice(0,Ye)})});return}if(l.type==="file-open"){let C=l.payload;if(J&&ko(J,C))return;J=C,j(I,l.payload);return}if(l.type==="file-saved"){j(w,l.payload.version);return}if(l.type==="file-snapshot"){let C=(Z)=>{if(!K)fe({channel:M,v:U,type:"file-snapshot-result",id:l.id,payload:Z})},B=(Z)=>C({error:(Z.trim()||"Could not read the edited file.").slice(0,Ye)}),G=F;if(!G){B("This extension does not edit files.");return}Promise.resolve().then(()=>G(l.payload.purpose)).then((Z)=>{if(xn(Z)>gt){B(`The file is over ${gt} ${"bytes"in Z?"bytes":"characters"}.`);return}if(Z.version.length>yt){B(`The snapshot version is over ${yt} characters.`);return}C({snapshot:"bytes"in Z?{bytes:Z.bytes,version:Z.version}:{content:Z.content,version:Z.version}})},(Z)=>B(Z instanceof Error?Z.message:String(Z)));return}if(l.type==="resolve"){let C=(G)=>{fe({channel:M,v:U,type:"resolve-result",id:l.id,payload:G})},B=y;if(!B){C({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>B(l.payload)).then((G)=>C({item:G?Ve(G):null}),(G)=>{let Z=(G instanceof Error?G.message:String(G)).trim();C({error:(Z||"Command failed.").slice(0,Ye)})});return}let R=x.get(l.id);if(!R)return;if(clearTimeout(R.timer),x.delete(l.id),l.ok){R.resolve(l.payload);return}R.reject(new v(l.code,l.error))};t.addEventListener("message",Pr),fe({channel:M,v:U,type:"hello"});let le=(a,l=r)=>{if(K||t.parent===t)return Promise.reject(new v("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,C)=>{let B=setTimeout(()=>{x.delete(a.id),C(new v("HOST_TIMEOUT","Host did not answer in time."))},l);x.set(a.id,{resolve:R,reject:C,timer:B}),fe(a)})},z=(a)=>le(a).then(()=>{return}),Q={channel:M,v:U},Zt=(a)=>{if(!K&&t.parent!==t)fe(a)},Mr=()=>Zt({...Q,type:"file-save"}),Ur=(a)=>{if(!qo(a)||!Sa(a))return;a.preventDefault(),Mr()},Nr=(a)=>{if(!qo(a)||a.key!=="Escape"||h?.surface!=="popover"||!h.popover)return;a.preventDefault(),Gr(h.popover.id,"escape").catch(()=>{return})},it=()=>{let a=h?.surface==="popover"?h.popover:void 0;if(!a)return;let l=Xe||We;if(Cr===l)return;Cr=l,Hr(a.id,l).catch(()=>{return})},at=()=>{if(h?.surface!=="popover"||Xe)return;Xe=!0,it()},Lr=(a)=>{if(h?.surface!=="popover"||a.relatedTarget!==null||!Xe)return;Xe=!1,it()},Dr=()=>{if(h?.surface!=="popover"||We)return;We=!0,it()},$r=()=>{if(h?.surface!=="popover"||!We)return;We=!1,it()},Ee=(a,l=1024)=>{if(!a.trim()||a.length>l)throw new v("HOST_REJECTED",`Identity must contain 1 to ${l} characters.`)},en=async(a)=>{if(a.kind!=="projects")Ee(a.projectId);let l=await le({...Q,type:"workspace-read",id:P(S),payload:a});if(!l||!("kind"in l)||!("state"in l)||l.kind!==a.kind)throw new v("HOST_REJECTED","Host did not return workspace data.");return l},tn=async(a,l)=>{if(a.kind!=="projects")Ee(a.projectId);let R=P(S);se.set(R,l);try{await z({...Q,type:"workspace-subscribe",id:P(S),payload:{subscriptionId:R,query:a}})}catch(C){if(se.delete(R),!K)fe({...Q,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:R}});throw C}return()=>{if(!se.delete(R)||K)return;fe({...Q,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:R}})}},ji=async(a,l)=>{if(a.kind==="session")Ee(a.sessionId);if(a.kind==="project")Ee(a.projectId);let R=P(S);ie.set(R,l);try{await z({...Q,type:"shells-subscribe",id:P(S),payload:{subscriptionId:R,scope:a}})}catch(C){if(ie.delete(R),!K)fe({...Q,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:R}});throw C}return()=>{if(!ie.delete(R)||K)return;fe({...Q,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:R}})}},ct=async(a)=>{if("key"in a&&(a.key.length===0||a.key.length>gn))throw new v("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(a.op==="set"&&!Be(a.value))throw new v("HOST_REJECTED","Storage values must be JSON.");if(a.op==="set"&&new TextEncoder().encode(JSON.stringify(a.value)).length>yn)throw new v("HOST_REJECTED","Storage value exceeds 64 KiB.");if(a.scope==="device"&&h?.features?.deviceStorage!==!0)throw new v("UNSUPPORTED","This host does not support device storage.");let l=await le({...Q,type:"storage",id:P(S),payload:a});if(!l||!("storage"in l)||l.op!==a.op)throw new v("HOST_REJECTED","Host did not return storage data.");return l},Gr=(a,l)=>h?.features?.popovers!==!0&&!(h?.surface==="popover"&&h.popover?.id===a)?Promise.reject(new v("UNSUPPORTED","This host does not support popovers.")):z({...Q,type:"popover-close",id:P(S),payload:l?{id:a,reason:l}:{id:a}}),Hr=(a,l)=>h?.features?.popovers!==!0&&!(h?.surface==="popover"&&h.popover?.id===a)?Promise.reject(new v("UNSUPPORTED","This host does not support popovers.")):z({...Q,type:"popover-anchor",id:P(S),payload:{id:a,active:l}});return t.addEventListener("keydown",Nr,!0),t.addEventListener("pointerover",at),t.addEventListener("pointermove",at),t.addEventListener("pointerout",Lr),t.addEventListener("focus",Dr),t.addEventListener("blur",$r),{onAction:(a)=>(g=a,()=>{if(g===a)g=null}),listProjects:async()=>{let a=await en({kind:"projects"});if(a.kind!=="projects")throw new v("HOST_REJECTED","Expected projects.");return a},listWorktrees:async(a)=>{let l=await en({kind:"worktrees",projectId:a});if(l.kind!=="worktrees")throw new v("HOST_REJECTED","Expected worktrees.");return l},listSessions:async(a)=>{let l=await en({kind:"sessions",projectId:a});if(l.kind!=="sessions")throw new v("HOST_REJECTED","Expected sessions.");return l},onProjects:(a)=>tn({kind:"projects"},(l)=>{if(l.kind==="projects")a(l)}),onWorktrees:(a,l)=>tn({kind:"worktrees",projectId:a},(R)=>{if(R.kind==="worktrees")l(R)}),onSessions:(a,l)=>tn({kind:"sessions",projectId:a},(R)=>{if(R.kind==="sessions")l(R)}),onRunningShells:(a,l)=>ji(a,l),readShellOutput:async(a,l)=>{Ee(a,ht);let R=l?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new v("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let C=l?.tailBytes;if(C!==void 0&&(!Number.isInteger(C)||C<1||C>Tt))throw new v("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Tt}.`);let G=await le({...Q,type:"shell-output",id:P(S),payload:{shellId:a,cursor:R,tailBytes:C}});if(!G||typeof G.output!=="string"||!Number.isFinite(G.cursor))throw new v("HOST_REJECTED","Host did not return shell output.");return G},stopShell:async(a)=>{if(Ee(a,ht),(await le({...Q,type:"shell-stop",id:P(S),payload:{shellId:a}}))?.stopped!==!0)throw new v("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(a)=>{Ee(a),await z({...Q,type:"open-session",id:P(S),payload:{sessionId:a}})},storage:{get:async(a,l)=>{let R=wt(l),C={op:"get",key:a};if(R)C.scope=R;let B=await ct(C);return B.op==="get"&&B.found?B.value:void 0},set:async(a,l,R)=>{let C=wt(R),B={op:"set",key:a,value:l};if(C)B.scope=C;await ct(B)},delete:async(a,l)=>{let R=wt(l),C={op:"delete",key:a};if(R)C.scope=R;await ct(C)},keys:async(a)=>{let l=wt(a),R={op:"keys"};if(l)R.scope=l;let C=await ct(R);if(C.op!=="keys")throw new v("HOST_REJECTED","Expected storage keys.");return C.keys}},onReady:(a)=>{if(o.add(a),h)a(h);return()=>{o.delete(a)}},onDirectory:(a)=>{if(s.add(a),h)a(h.directory);return()=>{s.delete(a)}},onSession:(a)=>{if(i.add(a),h)a(h.session);return()=>{i.delete(a)}},onSessionLifecycle:(a)=>{if(c.add(a),ye)a(ye);return()=>{c.delete(a)}},onConnection:(a)=>{if(p.add(a),h)a(h.connection);return()=>{p.delete(a)}},onSettings:(a)=>{if(f.add(a),h)a(h.settings);return()=>{f.delete(a)}},onItem:(a)=>{if(d.add(a),h)a(h.item);return()=>{d.delete(a)}},onBlock:(a)=>{if(_.add(a),h?.block)a(h.block);return()=>{_.delete(a)}},onServiceEvent:(a)=>(m.add(a),()=>{m.delete(a)}),onStatusControl:(a)=>(u.add(a),()=>{u.delete(a)}),onPopoverClosed:(a)=>(T.add(a),()=>{T.delete(a)}),setStatusControls:(a)=>{if(h?.features?.statusControls!==!0)return Promise.reject(new v("UNSUPPORTED","This host does not support status controls."));if(!xo(a))return Promise.reject(new v("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return z({...Q,type:"status-controls",id:P(S),payload:{controls:a}})},openPopover:(a)=>{if(h?.features?.popovers!==!0)return Promise.reject(new v("UNSUPPORTED","This host does not support popovers."));if(!Rn(a))return Promise.reject(new v("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return z({...Q,type:"popover-open",id:P(S),payload:a})},closePopover:Gr,setPopoverAnchorActive:Hr,onResolve:(a)=>(y=a,()=>{if(y===a)y=null}),toast:(a)=>{let l=a.message.trim();if(!l||l.length>At)return Promise.reject(new v("HOST_REJECTED",`Toast message must contain 1 to ${At} characters.`));if(a.copy&&a.copy!==!0&&(!a.copy.text.length||a.copy.text.length>xt))return Promise.reject(new v("HOST_REJECTED",`Toast copy text must contain 1 to ${xt} characters.`));return z({channel:M,v:U,type:"toast",id:P(S),payload:{...a,message:l}})},openUrl:(a)=>z({channel:M,v:U,type:"open-url",id:P(S),payload:{url:a}}),openCommit:(a)=>vn(a)?z({channel:M,v:U,type:"open-commit",id:P(S),payload:{sha:a}}):Promise.reject(new v("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(a)=>z({channel:M,v:U,type:"block-answer",id:P(S),payload:{text:a.trim().slice(0,bn)}}),openSurface:(a)=>z({channel:M,v:U,type:"open-surface",id:P(S),payload:{surfaceId:a}}),writeClipboard:(a)=>z({channel:M,v:U,type:"clipboard-write",id:P(S),payload:{text:a}}),compose:(a)=>z({channel:M,v:U,type:"compose",id:P(S),payload:a}),attach:(a)=>z({channel:M,v:U,type:"attach",id:P(S),payload:Ve(a)}),startSession:async(a)=>{if(a.projectId!==void 0)Ee(a.projectId);let l=a.worktree;if(l&&l!==!0)if(l.kind==="existing")Ee(l.directory);else{if(l.name!==void 0)Ee(l.name,200);if(l.baseBranch!==void 0)Ee(l.baseBranch,200)}let R=await le({channel:M,v:U,type:"start-session",id:P(S),payload:Un(a)},e.requestTimeoutMs??180000);if(!In(R))throw new v("HOST_REJECTED","Host did not return a session.");return R},prompt:(a)=>le({channel:M,v:U,type:"prompt",id:P(S),payload:Nn(a)}).then((l)=>{if(!Cn(l))throw new v("HOST_REJECTED","Host did not return a prompt result.");return l}),sessionLink:(a)=>z({channel:M,v:U,type:"session-link",id:P(S),payload:Ve(a)}),close:()=>z({channel:M,v:U,type:"close",id:P(S)}),oauthStart:()=>z({channel:M,v:U,type:"oauth-start",id:P(S)}),oauthDisconnect:()=>z({channel:M,v:U,type:"oauth-disconnect",id:P(S)}),request:(a)=>(It(a.path)?le({channel:M,v:U,type:"request",id:P(S),payload:a}):Jo()).then((l)=>{if(!Ct(l))throw new v("HOST_REJECTED","Host request result was empty.");return l}),serviceRequest:(a)=>(It(a.path)?le({channel:M,v:U,type:"service-request",id:P(S),payload:a}):Jo()).then((l)=>{if(!Ct(l))throw new v("HOST_REJECTED","Host service request result was empty.");return l}),serviceStatus:()=>le({channel:M,v:U,type:"service-status",id:P(S)}).then((a)=>{if(!$n(a))throw new v("HOST_REJECTED","Host did not return service status.");return a}),readFile:(a)=>(Fe(a)?le({channel:M,v:U,type:"file-read",id:P(S),payload:{path:a}}):vt()).then((l)=>{if(!Gn(l))throw new v("HOST_REJECTED","Host did not return file content.");return l}),writeFile:(a,l)=>{if(!Fe(a))return vt();if(l.length>Rt)return Promise.reject(new v("FILE_TOO_LARGE",`Content is over ${Rt} characters.`));return le({channel:M,v:U,type:"file-write",id:P(S),payload:{path:a,content:l}}).then((R)=>{if(!Hn(R))throw new v("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(a)=>(Fe(a)?le({channel:M,v:U,type:"file-list",id:P(S),payload:{path:a}}):vt()).then((l)=>{if(!Bn(l))throw new v("HOST_REJECTED","Host did not return directory entries.");return l}),stat:(a)=>(Fe(a)?le({channel:M,v:U,type:"file-stat",id:P(S),payload:{path:a}}):vt()).then((l)=>{if(!Vn(l))throw new v("HOST_REJECTED","Host did not return file status.");return l}),generate:(a)=>{let l=a.prompt.trim(),R=a.system?.trim();if(l.length===0||l.length>kt)return Promise.reject(new v("HOST_REJECTED",`Prompt must be 1 to ${kt} characters.`));if(R!==void 0&&(R.length===0||R.length>bt))return Promise.reject(new v("HOST_REJECTED",`System prompt must be 1 to ${bt} characters.`));let C=a.maxOutputTokens===void 0?void 0:Math.min(Pn,Math.max(1,Math.floor(a.maxOutputTokens)));if(C!==void 0&&!Number.isFinite(C))return Promise.reject(new v("HOST_REJECTED","maxOutputTokens must be a number."));let B={prompt:l};if(R!==void 0)B.system=R;if(C!==void 0)B.maxOutputTokens=C;return le({channel:M,v:U,type:"generate",id:P(S),payload:B},e.requestTimeoutMs??Mn).then((G)=>{if(!Fn(G))throw new v("HOST_REJECTED","Host did not return generated text.");return G})},onLateGenerateResult:(a)=>{O.add(a);for(let l of b.splice(0))j([a],l);return wr(),()=>{O.delete(a)}},setBadge:(a)=>z({channel:M,v:U,type:"badge",id:P(S),payload:{count:Ln(a)}}),setHeight:(a)=>z({channel:M,v:U,type:"resize",id:P(S),payload:{height:Dn(a)}}),onFileOpen:(a)=>{if(I.add(a),!Y)Y=!0,t.addEventListener("keydown",Ur,!0);if(J)a(J);return()=>{I.delete(a)}},onFileSnapshot:(a)=>(F=a,()=>{if(F===a)F=null}),onFileSaved:(a)=>(w.add(a),()=>{w.delete(a)}),reportFileChange:(a)=>Zt({...Q,type:"file-change",payload:{dirty:a.dirty,edited:a.edited}}),requestFileSave:Mr,reportFileUnsupported:()=>Zt({...Q,type:"file-unsupported"}),dispose:()=>{for(let a of se.keys())fe({...Q,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:a}});se.clear();for(let a of ie.keys())fe({...Q,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:a}});if(ie.clear(),K=!0,y=null,g=null,F=null,I.clear(),w.clear(),Y)t.removeEventListener("keydown",Ur,!0);t.removeEventListener("message",Pr),t.removeEventListener("keydown",Nr,!0),t.removeEventListener("pointerover",at),t.removeEventListener("pointermove",at),t.removeEventListener("pointerout",Lr),t.removeEventListener("focus",Dr),t.removeEventListener("blur",$r);for(let a of x.values())clearTimeout(a.timer),a.reject(new v("HOST_UNAVAILABLE","Host client was disposed."));x.clear(),o.clear(),s.clear(),i.clear(),c.clear(),p.clear(),f.clear(),d.clear(),_.clear(),m.clear(),u.clear(),T.clear(),O.clear(),b.length=0}}};var Yo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Pl=new Set(Yo);var Qo=["none","agent","user"];var Ul=new Set(Qo);var ha=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ta=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Zo=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of ha)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of Ta){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Wn=(e,t)=>{if(Zo(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var ga={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},V=(e,t)=>`var(--${e}, var(--oc-${ga[e]}, ${t}))`,be=V("surface-background","transparent"),Mt=V("surface-elevated","transparent"),je=V("surface-elevated-foreground","inherit"),_e=V("surface-foreground","inherit"),X=V("surface-muted-foreground","gray"),ya=V("surface-muted","transparent"),$e=V("interactive-border","currentColor"),ue=V("interactive-hover","transparent"),Ge=V("interactive-active","transparent"),Kn=V("interactive-selection","transparent"),zn=V("interactive-selection-foreground","inherit"),ke=V("primary","currentColor"),qn=V("primary-text","inherit"),Jn=V("error-text","inherit"),Aa=V("font-sans","inherit"),Yn=V("font-mono","monospace"),rs=V("radius","9px"),Qn=`calc(${rs} - 2px)`,es=`calc(${rs} - 4px)`,W=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,ts=`background-image: linear-gradient(${ue}, ${ue});`,Zn=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,er="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ns="box-shadow: var(--oc-sdk-lit);",tr=`inset 0 0.5px 0 0 ${W(_e,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,xa=`
:root {
  --oc-sdk-edge: ${W(_e,16)};
  --oc-sdk-field-bg: ${Mt};
  --oc-sdk-raised-bg: ${be};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${W(_e,14)};
  --oc-sdk-field-bg: ${W(be,50,Mt)};
  --oc-sdk-raised-bg: ${Mt};
  --oc-sdk-field-lift: ${tr};
  --oc-sdk-raised-lift: ${tr};
  --oc-sdk-lit: ${tr};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Pt=(e)=>{let t=V(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${V(`${e}-text`,"inherit")}; }`},Oa=`
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
`,os=`${xa}
.oc-sdk { color: ${_e}; font-family: ${Aa}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ts} }
.oc-sdk-mono { font-family: ${Yn}; }
.oc-sdk-muted { color: ${X}; }
${Pt("success")}${Pt("warning")}${Pt("error")}${Pt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ke}; --oc-sdk-tone-text: ${qn}; }

.oc-sdk-btn { border-radius: ${Qn}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${es}; }
.oc-sdk-btn[data-variant="default"] { color: ${qn}; background: ${W(ke,10,be)}; border-color: ${W(ke,12)}; ${ns} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${W(ke,16,be)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${W(ke,22,be)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ya}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${ue}, ${ue}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ge}, ${Ge}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${je}; ${er} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${ue}, ${ue}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ge}, ${Ge}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${ue}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ge}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${V("status-error","red")}; color: ${Jn}; background: ${W("var(--oc-sdk-tone)",7,be)}; border-color: ${W("var(--oc-sdk-tone)",12)}; ${ns} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${W("var(--oc-sdk-tone)",9,be)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${W("var(--oc-sdk-tone)",11,be)}; box-shadow: none; }

.oc-sdk-field-note { color: ${X}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Jn}; }
.oc-sdk-input { border-radius: ${Qn}; background: var(--oc-sdk-field-bg); color: ${je}; ${Zn("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${X}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${ue}, ${ue}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Zn(W(_e,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Zn(V("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Yn}; }

.oc-sdk-search-icon { color: ${X}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ke}; }
.oc-sdk-search-clear { border-radius: ${es}; color: ${X}; }
.oc-sdk-search-clear:hover { background: ${ue}; color: ${_e}; }

.oc-sdk-trigger { border-radius: ${Qn}; background: var(--oc-sdk-raised-bg); color: ${je}; ${er} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${ue}, ${ue}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ge}, ${Ge}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${X}; }
.oc-sdk-trigger-chevron { color: ${X}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${je}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Mt}; background-clip: padding-box; color: ${je}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${ue}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Kn}; color: ${zn}; }
.oc-sdk-option-check { color: ${_e}; }
.oc-sdk-option[data-destructive="true"] { color: ${Jn}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${W(V("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${X}; }
.oc-sdk-popup-empty { color: ${X}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${$e}; border-radius: 4px; color: ${_e}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${W(_e,60,$e)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${$e}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${be}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ke}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ts} }
.oc-sdk-check-desc { color: ${X}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${W(_e,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${X}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${_e}; }
.oc-sdk-tab[aria-selected="true"] { color: ${zn}; background: ${Kn}; border-color: ${$e}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${je}; background: var(--oc-sdk-raised-bg); ${er} }
.oc-sdk-tab-count { color: ${X}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${W(_e,6)}; color: ${X}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${W("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${ue}; }
.oc-sdk-row[aria-selected="true"] { background: ${Kn}; color: ${zn}; }
.oc-sdk-row-lead { font-family: ${Yn}; color: ${X}; }
.oc-sdk-row-sub { color: ${X}; }
.oc-sdk-row-meta { color: ${X}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${X}; }

.oc-sdk-empty-body { color: ${X}; }

.oc-sdk-spinner { color: ${X}; }
.oc-sdk-spinner-ring { border-color: ${$e}; border-top-color: ${ke}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${W("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${X}; }

.oc-sdk-separator { color: ${X}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${W($e,40)}; }

.oc-sdk-progress-label { color: ${X}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${W(_e,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ke}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${V("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${V("success-text","inherit")}; }

.oc-sdk-text a { color: ${qn}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${W($e,60)}; }
`,L=`
${hn}
${Oa}
${os}`;var ss="oc-sdk-ui-style",Ie=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},D=(e)=>{let t=document.getElementById(ss);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}Tn(document);let n=document.createElement("style");n.id=ss,n.textContent=e,document.head.appendChild(n)},A=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},pe=(e)=>{let t=A("button",e);return t.type="button",t},H=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},me=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},is=(e,t)=>{let n=(r)=>{if(r.target instanceof Node&&e.contains(r.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var Ra=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ce=(e,t)=>{D(L);let n=t,r=pe("oc-sdk oc-sdk-btn"),o=Ra(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{if(r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=Boolean(n.disabled)||Boolean(n.loading),r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r)r.prepend(o);else if(!n.loading&&o.parentNode===r)o.remove();H(s,n.label)},c=()=>{if(n.disabled||n.loading)return;n.onClick()};return r.addEventListener("click",c),i(),{update:(p)=>{n={...n,...p},i()},dispose:()=>{r.removeEventListener("click",c),r.remove()}}};var nr=(e,t)=>{D(L);let n=t,r=A("label","oc-sdk oc-sdk-field"),o=A("span","oc-sdk-field-label"),s=n.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),i=A("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let c=()=>{if(H(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),me(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let f=Boolean(n.error);r.dataset.invalid=f?"true":"false",s.setAttribute("aria-invalid",f?"true":"false");let d=n.error??n.helper??"";H(i,d),i.hidden=d===""},p=()=>{n.onChange(s.value)};return s.addEventListener("input",p),c(),{update:(f)=>{n={...n,...f},c()},dispose:()=>{s.removeEventListener("input",p),r.remove()}}};var ka={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},he=(e,t,n)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n)r.setAttribute("class",n);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",ka[e]),r.append(o),r};var rr=(e,t)=>{D(L);let n=t,r=A("div","oc-sdk oc-sdk-search"),o=A("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=pe("oc-sdk-search-clear");s.append(he("close",14)),s.tabIndex=-1,r.append(he("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let d=n.placeholder??"Search";if(me(o,"placeholder",d),o.setAttribute("aria-label",n.label??d),s.setAttribute("aria-label","Clear search"),o.value!==n.value)o.value=n.value;r.dataset.active=n.value.trim()===""?"false":"true"},c=()=>{if(n.value!=="")n.onChange("");o.focus()},p=()=>{n.onChange(o.value)},f=(d)=>{if(d.key==="Escape"&&o.value!=="")d.preventDefault(),c()};if(o.addEventListener("input",p),o.addEventListener("keydown",f),s.addEventListener("click",c),i(),n.autofocus)o.focus();return{update:(d)=>{n={...n,...d},i()},dispose:()=>{o.removeEventListener("input",p),o.removeEventListener("keydown",f),s.removeEventListener("click",c),r.remove()}}};var ge=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},ve=(e,t,n)=>{let r=e.filter((p)=>!p.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex((p)=>p.id===t);if(i===-1)return n==="next"?o.id:s.id;return r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var as=(e,t)=>`${e}-${t??""}`,Ut=(e,t,n,r)=>{let o=pe("oc-sdk-option");if(o.id=as(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(n.disabled),t==="option")o.setAttribute("aria-selected",n.selected?"true":"false");o.dataset.destructive=n.destructive?"true":"false";let s=A("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=A("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=A("span","oc-sdk-option-check");i.append(he("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Nt=(e,t,n,r)=>{let o=as(n,r);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";me(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ba=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;if(r>o&&n.top-8>o)e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},Lt=(e,t,n,r)=>{e.append(n),ba(n,t);let o=is(e,r),s=()=>{r()},i=(c)=>{if(c.target instanceof Node&&n.contains(c.target))return;r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var cs=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((r)=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n))},Ia=0,Dt=(e,t)=>{D(L);let n=t,r=`oc-sdk-select-${Ia+=1}`,o=A("div","oc-sdk oc-sdk-select"),s=A("span","oc-sdk-field-label");s.id=`${r}-label`;let i=pe("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let c=A("span","oc-sdk-trigger-value");i.append(c,he("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let p="",f=null,d=null,_=A("div","oc-sdk oc-sdk-popup"),m=A("div","oc-sdk-popup-search"),u=A("input","oc-sdk-input");u.type="text",u.autocomplete="off",m.append(u);let T=A("div");T.setAttribute("role","listbox"),T.tabIndex=-1,_.append(T);let O=()=>cs(n.options,n.searchable?p:""),b=()=>n.searchable?u:T,y=(S)=>{f=S,Nt(T,b(),r,S)},g=()=>{Ie(T);let S=O();if(S.length===0){let h=A("div","oc-sdk-popup-empty");h.textContent="No matches",T.append(h)}for(let h of S)T.append(Ut(r,"option",{...h,selected:h.id===n.value},{hover:()=>y(h.id),pick:()=>F(h.id)}));y(S.some((h)=>h.id===f)?f:S[0]?.id??null)},I=()=>{let S=d;d=null,S?.(),p="",u.value="",i.setAttribute("aria-expanded","false")},w=()=>{if(d||n.disabled)return;if(f=n.value,u.placeholder=n.searchPlaceholder??"Search",n.searchable)_.prepend(m);else m.remove();g(),d=Lt(o,i,_,I),i.setAttribute("aria-expanded","true"),b().focus()},F=(S)=>{if(I(),i.focus(),S!==n.value)n.onChange(S)},J=()=>{if(d)I();else w()},Y=(S)=>{if(!d&&ge(S))S.preventDefault(),w()},x=(S)=>{let h=ge(S);if(h)S.preventDefault(),y(ve(O(),f,h));else if(S.key==="Enter"){if(S.preventDefault(),f)F(f)}else if(S.key==="Escape")S.preventDefault(),I(),i.focus();else if(n.searchable&&S.target!==u&&S.key.length===1&&!S.ctrlKey&&!S.metaKey)u.focus()},se=()=>{p=u.value,g()},ie=(S)=>{if(d&&!(S.relatedTarget instanceof Node&&o.contains(S.relatedTarget)))I()},K=()=>{H(s,n.label),s.hidden=!n.label;let S=n.options.find((h)=>h.id===n.value);if(H(c,S?.label??n.placeholder??"Select"),c.dataset.empty=S?"false":"true",i.disabled=Boolean(n.disabled),d)g()};return i.addEventListener("click",J),i.addEventListener("keydown",Y),_.addEventListener("keydown",x),u.addEventListener("input",se),o.addEventListener("focusout",ie),K(),{update:(S)=>{n={...n,...S},K()},dispose:()=>{I(),i.removeEventListener("click",J),i.removeEventListener("keydown",Y),_.removeEventListener("keydown",x),u.removeEventListener("input",se),o.removeEventListener("focusout",ie),o.remove()}}};var ls=(e,t,n)=>{D(L);let r=t,o=pe("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=A("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(he("check",12));let i=A("span","oc-sdk-check-text"),c=A("span","oc-sdk-check-label"),p=A("span","oc-sdk-check-desc");i.append(c,p),o.append(s,i),e.append(o);let f=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=Boolean(r.disabled),H(c,r.label),H(p,r.description),p.hidden=!r.description},d=()=>{if(!r.disabled)r.onChange(!r.checked)};return o.addEventListener("click",d),f(),{update:(_)=>{r={...r,..._},f()},dispose:()=>{o.removeEventListener("click",d),o.remove()}}},or=(e,t)=>ls(e,t,"checkbox"),$t=(e,t)=>ls(e,t,"switch");var sr=(e,t)=>{D(L);let n=t,r=A("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Ie(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let c=pe("oc-sdk-tab");c.setAttribute("role","tab");let p=i.id===n.activeId;c.setAttribute("aria-selected",p?"true":"false"),c.tabIndex=p?0:-1,c.dataset.id=i.id;let f=A("span");if(f.textContent=i.label,c.append(f),i.count!==void 0){let d=A("span","oc-sdk-tab-count");d.textContent=String(i.count),c.append(d)}c.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),r.append(c)}},s=(i)=>{let c=ge(i,"horizontal");if(!c)return;let p=ve(n.items,n.activeId,c);if(p&&p!==n.activeId){i.preventDefault(),n.onChange(p);let f=r.querySelector(`[data-id="${CSS.escape(p)}"]`);if(f instanceof HTMLElement)f.focus()}};return r.addEventListener("keydown",s),o(),{update:(i)=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var Qe=(e,t)=>{me(e,"data-tone",t&&t!=="neutral"?t:null)},ir=(e,t)=>{D(L);let n=t,r=A("span","oc-sdk oc-sdk-badge");e.append(r);let o=()=>{H(r,n.label),Qe(r,n.tone)};return o(),{update:(s)=>{n={...n,...s},o()},dispose:()=>{r.remove()}}};var Ca=0,ar=(e,t)=>{D(L);let n=t,r=`oc-sdk-list-${Ca+=1}`,o=A("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,i=(_)=>`${r}-${_}`,c=(_)=>{s=_;for(let m of Array.from(o.children))if(m instanceof HTMLElement)m.dataset.active=m.id===i(_??"")?"true":"false";me(o,"aria-activedescendant",_?i(_):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},p=(_,m)=>{let u=A("span",_);return u.textContent=m,u},f=()=>{if(Ie(o),me(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(p("oc-sdk-list-empty",n.emptyText??"Nothing here")),c(null);return}for(let m of n.items){let u=pe("oc-sdk-row");if(u.id=i(m.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",m.id===n.selectedId?"true":"false"),u.disabled=Boolean(m.disabled),u.tabIndex=-1,m.leading)u.append(p("oc-sdk-row-lead",m.leading));let T=A("span","oc-sdk-row-main");if(T.append(p("oc-sdk-row-title",m.title)),m.subtitle)T.append(p("oc-sdk-row-sub",m.subtitle));if(u.append(T),m.badge){let O=p("oc-sdk-badge",m.badge.label);Qe(O,m.badge.tone),u.append(O)}if(m.meta)u.append(p("oc-sdk-row-meta",m.meta));u.addEventListener("click",()=>n.onSelect(m.id)),o.append(u)}let _=n.items.some((m)=>m.id===s&&!m.disabled);c(_?s:n.selectedId??null)},d=(_)=>{let m=ge(_);if(m){_.preventDefault(),c(ve(n.items,s,m));return}if((_.key==="Enter"||_.key===" ")&&s)_.preventDefault(),n.onSelect(s)};return o.addEventListener("keydown",d),f(),{update:(_)=>{n={...n,..._},f()},dispose:()=>{o.removeEventListener("keydown",d),o.remove()}}};var cr=(e,t)=>{D(L);let n=t,r=A("div","oc-sdk oc-sdk-empty"),o=A("h2","oc-sdk-empty-title"),s=A("p","oc-sdk-empty-body"),i=A("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let c=null,p=()=>{if(H(o,n.title),H(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let f={label:n.action.label,onClick:n.action.onClick};if(c)c.update(f);else c=Ce(i,{...f,variant:"outline",size:"sm"})};return p(),{update:(f)=>{n={...n,...f},p()},dispose:()=>{c?.dispose(),c=null,r.remove()}}};var lr=(e,t={})=>{D(L);let n=t,r=A("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=A("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=A("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",H(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(c)=>{n={...n,...c},i()},dispose:()=>{r.remove()}}};var dr=(e,t)=>{D(L);let n=t,r=A("div","oc-sdk oc-sdk-banner"),o=A("div","oc-sdk-banner-text"),s=A("div","oc-sdk-banner-title"),i=A("div","oc-sdk-banner-body"),c=A("div","oc-sdk-banner-action");o.append(s,i),r.append(o,c),e.append(r);let p=null,f=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),H(s,n.title),H(i,n.body),i.hidden=!n.body,c.hidden=!n.action,!n.action){p?.dispose(),p=null;return}let d={label:n.action.label,onClick:n.action.onClick};if(p)p.update(d);else p=Ce(c,{...d,variant:"outline",size:"xs"})};return f(),{update:(d)=>{n={...n,...d},f()},dispose:()=>{p?.dispose(),p=null,r.remove()}}};var va=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,ur=(e,t)=>{D(L);let n=t,r=A("div","oc-sdk oc-sdk-progress"),o=A("div","oc-sdk-progress-label"),s=A("span"),i=A("span","oc-sdk-progress-value"),c=A("span"),p=he("check",14);i.append(p,c),o.append(s,i);let f=A("div","oc-sdk-progress-track");f.setAttribute("role","progressbar"),f.setAttribute("aria-valuemin","0"),f.setAttribute("aria-valuemax","100");let d=A("div","oc-sdk-progress-fill");f.append(d),r.append(o,f),e.append(r);let _=()=>{let m=va(n.value);if(Qe(d,n.tone),d.style.transform=`scaleX(${m/100})`,f.setAttribute("aria-valuenow",String(m)),n.label)f.setAttribute("aria-label",n.label);else f.removeAttribute("aria-label");H(s,n.label),H(c,`${m}%`);let u=m===100&&(!n.tone||n.tone==="neutral");me(r,"data-done",u?"true":null),p.style.display=u?"":"none",o.hidden=!n.label};return _(),{update:(m)=>{n={...n,...m},_()},dispose:()=>{r.remove()}}};var ds=(e)=>e.filter((t)=>!("separator"in t)),wa=0,pr=(e,t)=>{D(L);let n=t,r=`oc-sdk-menu-${wa+=1}`,o=A("div","oc-sdk oc-sdk-menu");e.append(o);let s=A("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,c=null,p=Ce(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)m();else u()}}),f=o.querySelector("button");f?.setAttribute("aria-haspopup","menu");let d=(y)=>{c=y,Nt(s,s,r,y)},_=()=>{Ie(s);for(let y of n.items){if("separator"in y){let g=A("div","oc-sdk-separator");g.dataset.labeled="false",s.append(g);continue}s.append(Ut(r,"menuitem",y,{hover:()=>d(y.id),pick:()=>T(y.id)}))}d(ds(n.items).some((y)=>y.id===c)?c:null)},m=()=>{let y=i;i=null,y?.(),c=null,f?.setAttribute("aria-expanded","false")},u=()=>{if(i||!f)return;_(),i=Lt(o,f,s,m),f.setAttribute("aria-expanded","true"),s.focus()},T=(y)=>{m(),f?.focus(),n.onSelect(y)},O=(y)=>{let g=ge(y);if(g)y.preventDefault(),d(ve(ds(n.items),c,g));else if(y.key==="Enter"||y.key===" "){if(y.preventDefault(),c)T(c)}else if(y.key==="Escape")y.preventDefault(),m(),f?.focus()},b=(y)=>{if(i&&!(y.relatedTarget instanceof Node&&o.contains(y.relatedTarget)))m()};return s.addEventListener("keydown",O),o.addEventListener("focusout",b),{update:(y)=>{if(n={...n,...y},p.update({label:n.label,variant:n.variant,size:n.size}),i)_()},dispose:()=>{m(),s.removeEventListener("keydown",O),o.removeEventListener("focusout",b),p.dispose(),o.remove()}}};var k=Xn(),Gt=null,fr=new Set;k.onReady((e)=>{Gt=e,Wn(e,document.documentElement);for(let t of fr)t(e)});var us=()=>{let[e,t]=te(Gt);return re(()=>{if(fr.add(t),Gt)t(Gt);return()=>{fr.delete(t)}},[]),e};var ps=(e,t)=>JSON.stringify({query:e,variables:t});class ae extends Error{kind;constructor(e,t){super(t);this.kind=e}}var q=async(e,t)=>{let n;try{n=await k.request({method:"POST",path:"/graphql",body:ps(e,t)})}catch(o){if(o instanceof v){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new ae("disconnected","Linear is not connected.");throw new ae("network",o.message||"Could not reach Linear.")}throw new ae("network",o instanceof Error?o.message:"Could not reach Linear.")}let r;try{r=JSON.parse(n.body)}catch{throw new ae("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new ae("disconnected","Linear sign-in expired.");if(r.errors?.length){let o=r.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new ae(s?"rate-limited":"graphql",o.message)}if(!r.data)throw new ae("graphql","Linear returned no data.");return r.data};var fs=`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,_s=`
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        activeCycle { id number name startsAt endsAt progress isActive isFuture isPast completedAt }
      }
    }
  }
`,ms=`
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { id name type color position team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`;var Es=`
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
`;var _r=`
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
`;var Ss=`
  query StatusCounts($filter: IssueFilter, $after: String) {
    issues(first: 250, after: $after, filter: $filter) {
      nodes { state { id name type color position } team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,hs=`
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { id name type color position } team { id key } project { id name } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,Ze=(e)=>`
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
`;var Ts=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`;var gs=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`;var ys=`
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
`;var As=`
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`;var xs=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,bS={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:Ze(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:xs(["n1","n2"])};var Me=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ae&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ae&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},Pa=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),Os=(e,t)=>ho((n,r)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&Pa(r)&&r.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...r,issues:r.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof r==="object"&&r!==null&&r.id===e){let{team:o,...s}=t;return{...r,...s}}return r}),Ma=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new ae("graphql","Linear did not save the change.");return e.issueUpdate.issue},Ht=async(e,t)=>{let n=Os(e.id,t.patch);try{let r=Ma(await q(ys,{id:e.id,input:t.input}));if(Os(e.id,r),Sn(`issue:${e.identifier}`),"stateId"in t.input)Oe("children:");return r}catch(r){throw n(),r}};var Rs=async(e,t)=>{if(!(await q(As,{input:{issueId:e.id,body:t}})).commentCreate.success)throw new ae("graphql","Linear did not save the comment.");Sn(`issue:${e.identifier}`)};var Ua=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return typeof t.id==="string"&&typeof t.identifier==="string"&&typeof t.body==="string"},Na=(e)=>Array.isArray(e?.drafts)?e.drafts.filter(Ua):[],ks=async(e)=>{let t=await de(k,"GET","/drafts",{query:{directory:e},name:"Linear"});return t.ok===!1?[]:Na(t)},bs=async(e,t)=>{let n=await q(Ze([e.identifier])),r=Object.values(n).find((o)=>o!==null);if(!r)throw Error(`${e.identifier} was not found in Linear.`);await Rs(r,t),await de(k,"POST","/drafts",{body:{id:e.id,action:"posted"},name:"Linear"})},Is=async(e)=>(await de(k,"POST","/drafts",{body:{id:e.id,action:"discard"},name:"Linear"})).ok!==!1;var ce=(e,t="inline-flex")=>(n)=>{let r=Eo(e,n);return E("span",{ref:r,style:{display:t}},void 0,!1,void 0,this)},Te=ce(Ce),jS=ce(Dt),Cs=ce(nr,"block"),XS=ce(rr,"block"),WS=ce(sr),KS=ce(pr),zS=ce(ir),Bt=ce(lr),mr=ce(dr,"block"),qS=ce(cr,"block"),vs=ce(ur,"block"),JS=ce(ar,"block"),YS=ce(or),QS=ce($t),ZS=ce($t,"block"),eh=ce(Dt,"block");var ws=({draft:e,onDone:t})=>{let[n,r]=te(!1),[o,s]=te(e.body),[i,c]=te(null),p=async()=>{c("post");try{await bs(e,o),await oe(k,"success",`Posted the summary on ${e.identifier}`),t()}catch(d){await oe(k,"error",`Could not post on ${e.identifier}: ${Me(d)}`),c(null)}},f=async()=>{if(c("discard"),await Is(e))t();else await oe(k,"error","Could not discard the draft. Try again."),c(null)};return E("div",{class:"lin-status-draft","data-draft":e.id,children:[E("div",{class:"lin-status-line lin-status-line--wrap",role:"button",tabIndex:0,"aria-expanded":n,onClick:()=>r(!n),onKeyDown:(d)=>{if(d.key==="Enter")r(!n)},children:[E("span",{class:"lin-status-label",title:e.sessionTitle,children:["Summary ready for ",E("span",{class:"sui-mono lin-status-ref",children:e.identifier},void 0,!1,void 0,this)]},void 0,!0,void 0,this),E("span",{class:"lin-status-actions",onClick:(d)=>d.stopPropagation(),children:[E(Te,{label:"Post",size:"xs",loading:i==="post",disabled:i!==null||!o.trim(),onClick:()=>{p()}},void 0,!1,void 0,this),E(Te,{label:"Discard",variant:"ghost",size:"xs",loading:i==="discard",disabled:i!==null,onClick:()=>{f()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),n&&E(Cs,{value:o,onChange:s,multiline:!0,rows:5,disabled:i!==null},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var La="plan",Da=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["id","directory","sessionDirectory","sessionId","identifier","sessionTitle"].every((n)=>typeof t[n]==="string")&&typeof t.createdAt==="number"},Ps=(e)=>Array.isArray(e?.handoffs)?e.handoffs.filter(Da):[];var Ms=(e,t)=>{if(t&&(t.archivedAt!==null||t.activity==="running"||t.activity==="retrying"))return!1;return e.plan||t?.agent===La},$a=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,Ga=1e5,Ha=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),Us=(e,t)=>{let n=Ha(t.trim()).trim(),r=n.length>20000?`${n.slice(0,20000).trimEnd()}

[cut]`:n,o=(e??"").replace($a,"").trimEnd(),s=`---
## Plan

${r}`,i=o?`${o}

${s}`:s;return i.length>Ga?null:i};var et=(e)=>`${e.id}@${e.createdAt}`,Ns="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var tt=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let r=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...r?{}:{year:"numeric"}})},Ls=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let r=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-r)/86400000)};var nt=(e)=>`${Math.floor(Math.max(0,Math.min(1,e))*100)}%`,Vt={onTrack:"On track",atRisk:"At risk",offTrack:"Off track"},Ft={onTrack:"success",atRisk:"warning",offTrack:"error"};var jt=(e)=>e===0?5:e;var Ds=["triage","backlog","unstarted","started","completed","canceled","duplicate"],$s=(e,t)=>Ds.indexOf(e.type)-Ds.indexOf(t.type)||e.position-t.position,Er=(e)=>`${e.type}|${e.name}`;var Ba=(e)=>[...e??[]].sort($s);var Va=(e,t,n=e)=>{let r=t?.trim().toLowerCase();return(r?n.find((o)=>o.name.trim().toLowerCase()===r):void 0)??e.find((o)=>/^in progress$/i.test(o.name.trim()))??e.find((o)=>/progress|doing|working|development|started/i.test(o.name))??e.find((o)=>!/block|hold|pause|wait|stuck/i.test(o.name))??e[0]??null},Gs=(e)=>/plan/i.test(e.name),Fa=(e)=>Ba(e).filter((t)=>t.type==="started"&&!Gs(t)),Hs=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!Gs(e.state))return null;return Va(Fa(t),n)};var Sr=(e)=>e.replace(/\/+$/,""),Bs=async(e)=>{if(!e)return null;try{let t=Sr(e),n=(await k.listProjects())?.projects??[],r=n.find((o)=>Sr(o.directory)===t);if(r)return r;for(let o of n)if(((await k.listWorktrees(o.id))?.worktrees??[]).some((i)=>Sr(i.directory)===t))return o}catch{}return null};var Vs=async(e)=>{try{await k.openSession(e)}catch{}};var Fs=async(e)=>{let t=await de(k,"GET","/handoffs",{query:{directory:e},name:"Linear"});if(t.ok===!1)return[];let n=Ps(t);if(!n.length)return n;let r=[];try{let o=await Bs(e);if(o)r=(await k.listSessions(o.id))?.sessions??[]}catch{}return n.filter((o)=>Ms(o,r.find((s)=>s.id===o.sessionId)))},js=async(e)=>(await de(k,"POST","/handoffs",{body:{id:e,action:"dismiss"},name:"Linear"})).ok!==!1,Xs=async(e)=>{let t=await de(k,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{}},name:"Linear"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},Ws=async(e)=>{let t=await de(k,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier},name:"Linear"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1}};var rt=async(e)=>{try{let t=await k.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},hr=async(e,t)=>{try{return await k.storage.set(e,t),!0}catch{return!1}},zs=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),qs=async(e)=>{let t=await rt(`map:${e}`);return zs(t)?t:null},Xt=async(e,t)=>{let n=await hr(`map:${e}`,t);return gr(),n},Js=async(e)=>{try{await k.storage.delete(`map:${e}`)}catch{}gr()},Tr=async(e)=>{let t=await rt(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},Ys=async(e,t)=>{let n=await Tr(e);if(n?.host!==t.host||n.path!==t.path)await hr(`repo:${e}`,t)},Qs=async()=>await rt("pref:start-moves")!==!1;var Zs=async(e)=>{let t=await rt(`pref:start-state:${e}`);return typeof t==="string"?t:null},ei=(e,t)=>hr(`pref:start-state:${e}`,t);var gr=async(e={})=>{let t=[];try{t=await k.storage.keys()??[]}catch{return}let n={};for(let r of t.filter((o)=>o.startsWith("map:"))){let o=await rt(r);if(zs(o)&&o.directory)n[o.directory]=o}if(e.allowEmpty===!1&&Object.keys(n).length===0)return;await de(k,"PUT","/config",{body:{directories:n},name:"Linear"})},Ks=!1,ti=async()=>{if(Ks)return;Ks=!0,await gr({allowEmpty:!1})};var ni=async(e,t,n=!1)=>{let{plan:r,isPlan:o}=await Ws({source:t,identifier:e.identifier});if(!o&&!n)throw Error(Ns);let s=(await q(_r,{id:e.identifier})).issue,i=Us(s.description,r);if(i===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);await Ht(s,{input:{description:i},patch:{description:i}})},ri=(e)=>ni({identifier:e.identifier},{sessionId:e.sessionId,directory:e.sessionDirectory,title:e.sessionTitle,agent:null,inWorktree:!0,updatedAt:e.createdAt}),ja=async(e,t,n)=>{let r=!1;if(n.post)await ni(e,t,n.force),r=!0;let o=await Xs({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force}),s=n.state??Hs(e,e.team.states.nodes,n.lastState),i=!1,c=null;if(n.move&&s)try{await Ht(e,{input:{stateId:s.id},patch:{state:s}}),i=!0}catch(p){c=Me(p)}return{sessionId:o.sessionId,target:s,moved:i,moveError:c,posted:r}},oi=async(e)=>{let t=(await q(_r,{id:e.identifier})).issue,[n,r]=await Promise.all([Qs().catch(()=>!0),Zs(t.team.id).catch(()=>null)]),o={sessionId:e.sessionId,directory:e.sessionDirectory,title:e.sessionTitle,agent:null,inWorktree:!0,updatedAt:e.createdAt},s=await ja(t,o,{move:n,post:e.postPlan===!0,lastState:r});if(s.moved&&s.target)ei(t.team.id,s.target.name).catch(()=>{return});return{...s,issue:t}};var si=({handoff:e,onDone:t})=>{let[n,r]=te(null),[o,s]=te(!1),i=async()=>{r("build");try{let f=await oi(e);if(f.moveError)await oe(k,"error",`Build started, but ${e.identifier} was not moved: ${f.moveError}`);if(await oe(k,"success",`${f.posted?"Added the plan to the issue and started":"Started"} a build for ${e.identifier}${f.moved?` and moved it to ${f.target.name}`:""}`),f.moved)Oe("status-");t(),await Vs(f.sessionId)}catch(f){await oe(k,"error",`Could not start the build: ${Me(f)}`),r(null)}},c=async()=>{r("plan");try{await ri(e),s(!0),Oe("issue"),await oe(k,"success",`Added the plan to ${e.identifier}`)}catch(f){await oe(k,"error",`Could not add the plan to ${e.identifier}: ${Me(f)}`)}r(null)},p=async()=>{if(r("dismiss"),await js(e.id))t();else await oe(k,"error","Could not dismiss the plan. Try again."),r(null)};return E("div",{class:"lin-status-draft","data-handoff":e.id,children:E("div",{class:"lin-status-line lin-status-line--wrap",children:[E("span",{class:"lin-status-label",title:e.sessionTitle,children:["Plan ready for ",E("span",{class:"sui-mono lin-status-ref",children:e.identifier},void 0,!1,void 0,this)]},void 0,!0,void 0,this),E("span",{class:"lin-status-actions",children:[E(Te,{label:e.postPlan?"Add plan and build":"Start build",size:"xs",loading:n==="build",disabled:n!==null,onClick:()=>{i()}},void 0,!1,void 0,this),E(Te,{label:o?"Plan added":"Add plan only",variant:"outline",size:"xs",loading:n==="plan",disabled:n!==null,onClick:()=>{c()}},void 0,!1,void 0,this),E(Te,{label:"Dismiss",variant:"ghost",size:"xs",loading:n==="dismiss",disabled:n!==null,onClick:()=>{p()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this)};var ii={state:{type:{nin:["completed","canceled","duplicate"]}}};var Wt=(e,t,n=!1)=>{let r=[];if(e.length){let o=[...e].sort();r.push({team:n?{or:[{id:{in:o}},{ancestors:{some:{id:{in:o}}}}]}:{id:{in:o}}})}if(t.length)r.push({project:{id:{in:[...t].sort()}}});if(!r.length)return null;return r.length===1?r[0]:{or:r}},yr=(...e)=>{let t=e.filter((n)=>Boolean(n));return t.length===1?t[0]:{and:t}},ai={assigned:{assignee:{isMe:{eq:!0}}},created:{creator:{isMe:{eq:!0}}},subscribed:{subscribers:{some:{isMe:{eq:!0}}}}};var ci=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let o=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:null},li=([e,t,n])=>{let r=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*r(e)+0.7152*r(t)+0.0722*r(n)},Xa=(e,t)=>{let[n,r]=[li(e),li(t)].sort((o,s)=>s-o);return(n+0.05)/(r+0.05)};var di=(e,t)=>{let n=ci(e),r=ci(t);if(!n||!r||Xa(n,r)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Wa=5,Ar=null,Ka=new Map;var ui=(e,t)=>{let n=Ka.get(t);if(n!==void 0)return n;let r=Ar?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=r.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(r.length+1)};var za=async()=>{let e=new Map,t=null;for(let n=0;n<Wa;n+=1){let r=await q(ms,{after:t});for(let{team:o,...s}of r.workflowStates.nodes){let i=e.get(o.id)??[];i.push(s),e.set(o.id,i)}if(!r.workflowStates.pageInfo.hasNextPage)break;t=r.workflowStates.pageInfo.endCursor}for(let n of e.values())n.sort((r,o)=>r.position-o.position);return e},pi=async()=>{let[e,t,n]=await Promise.all([q(fs).then((r)=>r.viewer),q(_s).then((r)=>r.teams.nodes),za()]);return t.sort((r,o)=>r.name.localeCompare(o.name)),Ar={viewer:e,teams:t,teamsById:new Map(t.map((r)=>[r.id,r])),myTeamIds:new Set(e.teams?.nodes.map((r)=>r.id)??[]),statesByTeam:n},Ar},fi="workspace",xr=(e=!1)=>De(fi,pi,e),_i=()=>Re(fi,pi);var mi=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),qa=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),r=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${r.toFixed(2)}z`},Or=({type:e,color:t,size:n=14,fill:r,teamId:o,stateId:s})=>{let i=t||"currentColor",c=Le(()=>di(i,mi()),[i,mi()]),p={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),E("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return E("svg",{...p,children:E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return E("svg",{...p,children:E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let f=r??(o&&s?ui(o,s):0.5);return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this),E("path",{d:qa(f),fill:c},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),E("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),E("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}};var Ja="open-target",Ya="ext:linear-dashboard";var Rr=async(e)=>{try{await k.storage.set(Ja,{...e,at:Date.now()})}catch{return!1}try{return await k.openSurface(Ya),!0}catch{return!1}};var Ei=new Map,Si=(e)=>{for(let t of e)Ei.set(t.id,t);return e},hi=(e)=>Ei.get(e);var Kt=async(e)=>{if(!e.length)return[];let t=await q(Es,{after:null,filter:{id:{in:[...e].sort()}}});return Si(t.projects.nodes)},Ti=async(e)=>{let t=await q(gs,{term:e});return Si(t.searchProjects.nodes)};var zt=(e)=>{let t=e.length?`projects:${[...e].sort().join(",")}`:null;return Re(t,()=>Kt(e))};var Qa={state:{type:{in:["triage","unstarted","started"]}}},Za=4,ec=async(e)=>{let t=yr(Qa,e),n=[],r=null;for(let o=0;o<Za;o+=1){let s=await q(Ss,{filter:t,after:r});if(n.push(...s.issues.nodes),!s.issues.pageInfo.hasNextPage)return{nodes:n,capped:!1};r=s.issues.pageInfo.endCursor}return{nodes:n,capped:!0}},tc=async(e)=>{let t=await q(hs,{filter:yr(ii,ai.assigned,e)});return{issues:t.issues.nodes,more:t.issues.pageInfo.hasNextPage}},gi=(e)=>Re(e?`status-counts:${JSON.stringify(e)}`:null,()=>ec(e)),qt=(e)=>Re(e?`status-mine:${JSON.stringify(e)}`:null,()=>tc(e)),yi=(e)=>Re(e?`status-drafts:${e}`:null,()=>ks(e)),Ai=(e)=>Re(e?`status-handoffs:${e}`:null,()=>Fs(e));var xi=(e,t)=>({id:e.id,name:e.name,url:e.url,status:e.status.name,health:e.health,progress:e.progress,targetDate:e.targetDate,teams:e.teams.nodes.map((n)=>n.key),...t?{text:t}:{}});var Oi=(e)=>({identifier:e.identifier,title:e.title,state:e.state.name,url:e.url});var nc=300000,Ri=new Map,ki=async(e)=>{let t=JSON.stringify(e),n=`${e.directory}|${Object.keys(e).sort().join(",")}`,r=Ri.get(n);if(r&&r.signature===t&&Date.now()-r.at<nc)return;Ri.set(n,{signature:t,at:Date.now()}),await de(k,"POST","/snapshot",{body:e,name:"Linear"})},bi=(e,t,n,r,o=[])=>({directory:e,teamKeys:o.map((s)=>s.key),teams:t.map((s)=>({id:s.id,key:s.key,name:s.name})),projects:n.map((s)=>xi(s)),myIssues:r.map(Oi)});var Ii=({directory:e,workspace:t,state:n})=>{let r=[...n.detection.teamIds,...n.detection.projectIds],o=r.filter((_)=>t.teamsById.has(_)),s=r.filter((_)=>!t.teamsById.has(_)),i=zt(s),c=qt(Wt(o,s));re(()=>{ti()},[]);let p=o.map((_)=>t.teamsById.get(_)),f=(s.length===0||i.data!==void 0)&&c.data!==void 0,d=JSON.stringify([i.data?.map((_)=>[_.id,_.progress,_.health,_.status.name]),c.data?.issues.map((_)=>[_.identifier,_.state.name])]);return re(()=>{if(!n.detection.mapping||!f)return;ki(bi(e,p,i.data??[],c.data?.issues??[],t.teams))},[e,f,d,n.detection.mapping?.updatedAt]),null};var rc={started:0,unstarted:1,triage:2,backlog:3},Jt=(e)=>rc[e]??9,Ci=(e)=>{let t=new Map;for(let{state:n,team:r}of e){let o=Er(n),s=t.get(o);if(s)s.count+=1;else t.set(o,{key:o,name:n.name,type:n.type,color:n.color,position:n.position,count:1,teamId:r.id,stateId:n.id})}return[...t.values()].sort((n,r)=>Jt(n.type)-Jt(r.type)||n.position-r.position||n.name.localeCompare(r.name))},oc=6,vi=(e,t=oc)=>({shown:e.slice(0,t),hidden:e.slice(t)}),sc=5,wi=(e,t=sc)=>[...e].sort((n,r)=>Jt(n.state.type)-Jt(r.state.type)||jt(n.priority)-jt(r.priority)||r.updatedAt.localeCompare(n.updatedAt)).slice(0,t),ic=(e,t=new Date)=>{let n=Ls(e,t);if(n===null)return null;if(n<0)return"ended";if(n===0)return"ends today";return n===1?"1 day left":`${n} days left`},Pi=(e,t,n=new Date)=>[t?`${t} cycle ${e.number}`:`Cycle ${e.number}`,nt(e.progress),ic(e.endsAt,n)].filter(Boolean).join(" · ");var Yt={source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null,work:null},ac=(e)=>{let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)},ot=(e)=>e.replace(/\/+$/,""),kr=(e)=>ot(e).split("/").pop()??"",cc=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,lc=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),n=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(n)return{host:n[1].toLowerCase(),path:n[2]};let r=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(r)return{host:r[1].toLowerCase(),path:r[2]};return null},dc=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],n=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],r=t??n;return r?lc(r):null},uc=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let n=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(n)return{host:n[1].toLowerCase(),path:n[2]};return null},pc=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,Di=async(e,t)=>{let n=ot(t),r=(await e.listProjects().catch(()=>{return}))?.projects??[],o=r.find((m)=>ot(m.directory)===n)??null,s=null;for(let m of o?[o]:r){let T=((await e.listWorktrees(m.id).catch(()=>{return}))?.worktrees??[]).find((O)=>ot(O.directory)===n);if(T){o=m,s=T.branch||null;break}}if(!s)s=cc(await e.readFile(".git/HEAD"));let i=o?`p:${o.id}`:`d:${ac(n)}`,p=[...o?(await e.listSessions(o.id).catch(()=>{return}))?.sessions??[]:[]].sort((m,u)=>u.updatedAt-m.updatedAt),f=[],d=null;for(let m of p){for(let u of m.links??[]){let T=u.url.match(pc)?.[1]?.toUpperCase();if(T&&!f.includes(T))f.push(T);if(!d&&u.kind==="change")d=uc(u.url)}for(let u of m.items){let T=u.data,O=typeof T?.identifier==="string"?T.identifier.toUpperCase():null;if(O&&!f.includes(O))f.push(O)}}let _=dc(await e.readFile(".git/config"));if(_)await e.setRepo(i,_).catch(()=>{return});else _=await e.getRepo(i).catch(()=>null)??d;return{key:i,ocProjectId:o?.id??null,projectDirectory:o?ot(o.directory):n,directory:n,branch:s,repo:_,linkedIssues:f.slice(0,20)}},fc=(e,t)=>{let n=[];for(let r of e.matchAll(/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6})-(\d+)(?![A-Za-z0-9])/g)){let o=r[1].toUpperCase(),s=`${o}-${r[2]}`;if(t.has(o)&&!n.includes(s))n.push(s)}return n},st=(e)=>e.toLowerCase().replace(/[^a-z0-9]/g,""),Mi=new Set(["api","app","apps","web","ui","service","services","svc","server","client","helm","chart","charts","terraform","tf","infra","argo","deploy","config","lib","libs","sdk","core","backend","frontend","mobile","ios","android","worker"]),_c=(e)=>{let t=[],n=(i,c,p)=>{if(st(i).length>=2&&!t.some((f)=>st(f.text)===st(i)))t.push({text:i,weight:c,label:p})},r=kr(e.projectDirectory),o=e.repo?kr(e.repo.path):"";if(n(r,1,`folder name "${r}"`),o)n(o,1,`repository "${o}"`);for(let i of[r,o].join("-").split(/[-_.\s]+/))if(i.length>=2&&!Mi.has(i.toLowerCase()))n(i,0.8,`the word "${i}" in the repository name`);let s=e.repo?e.repo.path.split("/").slice(0,-1).reverse():[];for(let i of s)if(!Mi.has(i.toLowerCase()))n(i,0.7,`repository group "${i}"`);return t},mc=(e,t)=>{let n=st(e),r=st(t);if(n.length<3||r.length<3)return 0;if(n===r)return 3;if(n.startsWith(r)||r.startsWith(n))return 2;if(n.includes(r)||r.includes(n))return 1;return 0};var Ui=(e,t)=>{let n=null;for(let r of t)for(let o of e){let s=mc(r.name,o.text)*o.weight;if(r.key&&r.key.toLowerCase()===o.text.toLowerCase()&&r.key.length>=2)s=Math.max(s,2.5*o.weight);if(s>=1.4&&(!n||s>n.score))n={item:r,score:s,label:o.label}}return n},Ec=(e)=>e.status.type!=="completed"&&e.status.type!=="canceled";var Sc=async(e,t,n)=>{let r=t.branch?fc(t.branch,n).slice(0,3):[],o=t.linkedIssues.slice(0,1),s=[...r,...o.filter((c)=>!r.includes(c))];if(!s.length)return null;let i=await e.issuesByIdentifier(s).catch(()=>[]);for(let c of s){let p=i.find((f)=>f.identifier===c);if(p)return{identifier:p.identifier,title:p.title,url:p.url,teamKey:p.team.key,projectName:p.project?.name??null,from:r.includes(c)?"branch":"session"}}return null},Ni=(...e)=>e.flatMap((t)=>Array.isArray(t)?t:t===void 0?[]:[t]).filter((t)=>typeof t==="string"),Li=(e)=>[...new Set(e)],hc=async(e,t,n)=>{let r;try{r=JSON.parse(t)}catch{return null}let o=Ni(r.teams,r.team).map((i)=>n.find((c)=>c.id===i||c.key.toLowerCase()===i.toLowerCase())?.id).filter((i)=>Boolean(i)),s=[];for(let i of Ni(r.projects,r.project)){let c=i.trim(),p=c.match(/linear\.app\/[^/]+\/project\/([^/?#]+)/i)?.[1]?.split("-").pop(),d=(await e.projectsByIds([p??c]).catch(()=>[]))[0]??(await e.searchProjects(c).catch(()=>[])).find((_)=>_.name.toLowerCase()===c.toLowerCase());if(d)s.push(d.id)}return o.length||s.length?{teamIds:Li(o),projectIds:Li(s)}:null},$i=async(e,t,n)=>{let r=new Set(n.map((_)=>_.key.toUpperCase())),o=await Sc(e,t,r),s=(_)=>({..._,work:o}),i=await e.getMapping(t.key);if(i&&(i.linearProjectIds.length||i.teamIds.length))return s({source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:i.teamIds,projectIds:i.linearProjectIds,mapping:i});let c=await e.readFile(".linear.json");if(c){let _=await hc(e,c,n);if(_)return s({source:"config",inferred:!1,evidence:".linear.json",..._,mapping:null})}if(t.repo){let _=await e.repoAttachments(`${t.repo.host}/${t.repo.path}/`).catch(()=>[]),m=new Map;for(let O of _)if(O.issue)m.set(O.issue.id,{team:O.issue.team.id,project:O.issue.project?.id??null});let u=new Map;for(let{team:O}of m.values())u.set(O,(u.get(O)??0)+1);let T=[...u.entries()].sort((O,b)=>b[1]-O[1])[0];if(T&&T[1]>=3){let O=new Map;for(let{team:g,project:I}of m.values())if(g===T[0]&&I)O.set(I,(O.get(I)??0)+1);let b=[...O.entries()].sort((g,I)=>I[1]-g[1])[0],y=b&&b[1]>=3&&b[1]/T[1]>=0.6?[b[0]]:[];return s({source:"repo",inferred:!0,evidence:`${T[1]} issues with merge requests in ${kr(t.repo.path)}`,teamIds:[T[0]],projectIds:y,mapping:null})}}let p=_c(t),f=Ui(p,n);if(f)return s({source:"name",inferred:!0,evidence:f.label,teamIds:[f.item.id],projectIds:[],mapping:null});let d=p[0]?.text;if(d){let _=(await e.searchProjects(d).catch(()=>[])).filter(Ec),m=Ui(p,_);if(m)return s({source:"name",inferred:!0,evidence:m.label,teamIds:[],projectIds:[m.item.id],mapping:null})}return s({source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null})};var Tc=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,Gi={listProjects:()=>k.listProjects(),listWorktrees:(e)=>k.listWorktrees(e),listSessions:(e)=>k.listSessions(e),readFile:(e)=>k.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:qs,getRepo:Tr,setRepo:Ys,issuesByIdentifier:async(e)=>{let t=e.filter((r)=>Tc.test(r));if(!t.length)return[];let n=await q(Ze(t));return Object.values(n).filter((r)=>Boolean(r))},repoAttachments:async(e)=>(await q(Ts,{url:e})).attachments.nodes,searchProjects:Ti,projectsByIds:Kt},br=(e,t)=>e.teamsById.get(t)?.name??hi(t)?.name??"Unknown",Hi=(e,t)=>{let[n,r]=te(null),[o,s]=te(Yt),[i,c]=te(!1),[p,f]=te(0),d=Se(0);re(()=>{c(!1)},[e]),re(()=>{if(!t)return;let g=++d.current;if(!e){r(null),s(Yt),c(!0);return}(async()=>{let I=await Di(Gi,e),w=await $i(Gi,I,t.teams).catch(()=>Yt);if(g!==d.current)return;let F=w.teamIds.filter((x)=>t.teamsById.has(x)),J=w.projectIds.length?await Kt(w.projectIds).catch(()=>[]):[],Y=w.projectIds.filter((x)=>J.some((se)=>se.id===x));if(g!==d.current)return;r(I),s({...w,teamIds:F,projectIds:Y}),c(!0)})()},[e,t,p]);let _=xe(()=>f((g)=>g+1),[]),m=xe(async(g,I)=>{if(!n)return!1;let w=[...g,...I],F=o.mapping?.activeProjectId,J={directory:n.projectDirectory,linearProjectIds:I,teamIds:g,activeProjectId:w.length===1?w[0]:F&&w.includes(F)?F:w[0]??"all",finishComments:o.mapping?.finishComments??"off",updatedAt:Date.now()};s((x)=>({...x,source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:g,projectIds:I,mapping:J}));let Y=await Xt(n.key,J);if(!Y)await oe(k,"error","Could not save this folder's choice. It applies until you reload.");return Y},[n,o]),u=xe(async()=>{if(!await m(o.teamIds,o.projectIds))return;let g=t?[...o.teamIds,...o.projectIds].map((I)=>br(t,I)).join(", "):"";await oe(k,"success",g?`Pinned ${g} to this folder`:"Pinned to this folder")},[m,o,t]),T=xe(async()=>{if(!n)return;await Js(n.key),_()},[n,_]),O=xe((g)=>{if(!n||!o.mapping)return;let I={...o.mapping,activeProjectId:g,updatedAt:Date.now()};s((w)=>({...w,mapping:I})),Xt(n.key,I)},[n,o]),b=xe(async(g)=>{if(!n||!o.mapping)return!1;let I={...o.mapping,...g,updatedAt:Date.now()};s((F)=>({...F,mapping:I}));let w=await Xt(n.key,I);if(!w)await oe(k,"error","Could not save the setting. It applies until you reload.");return w},[n,o]),y=o.teamIds.length+o.projectIds.length>0;return{place:n,detection:o,settled:i,mapped:y,refresh:_,save:m,pin:u,clear:T,setActive:O,update:b}};var gc=3,yc=2,Vi="refresh",Ir=new Set;k.onStatusControl((e)=>{if(e.id===Vi)for(let t of Ir)t()});var Ac=(e)=>{let t=[...e.detection.teamIds,...e.detection.projectIds],n=e.detection.mapping?.activeProjectId??t[0]??"all";return n==="all"||!t.includes(n)?t:[n]},Bi=(e)=>e.targetDate?`target ${tt(e.targetDate)}`:"no target date",xc=({projects:e})=>{if(e.length===1){let t=e[0],n=t.health?Ft[t.health]:void 0;return E("div",{class:"lin-status-block",children:[E(vs,{label:t.name,value:t.progress*100,tone:n},void 0,!1,void 0,this),E("div",{class:"sui-row sui-small sui-muted",children:[t.health&&E(En,{tone:Ft[t.health]},void 0,!1,void 0,this),E("span",{children:[t.health?Vt[t.health]:t.status.name,Bi(t)].join(" · ")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}return E("div",{class:"lin-status-block",children:e.slice(0,gc).map((t)=>E("div",{class:"lin-status-project",title:`${t.name}: ${t.health?Vt[t.health]:t.status.name}, ${Bi(t)}`,children:[E(En,{tone:t.health?Ft[t.health]:"muted"},void 0,!1,void 0,this),E("span",{class:"lin-ellipsis sui-grow",children:t.name},void 0,!1,void 0,this),E("span",{class:"sui-muted sui-small",children:nt(t.progress)},void 0,!1,void 0,this),E("span",{class:"sui-muted sui-small lin-status-date",children:t.targetDate?tt(t.targetDate):""},void 0,!1,void 0,this)]},t.id,!0,void 0,this))},void 0,!1,void 0,this)},Oc=(e,t,n)=>{let r=new Set(t.filter((o)=>e.teamsById.has(o)));for(let o of n)for(let s of o.teams.nodes)r.add(s.id);return[...r].map((o)=>e.teamsById.get(o)).filter((o)=>Boolean(o?.activeCycle))},Rc=({issue:e,onOpen:t})=>E("div",{class:"lin-status-line",role:"button",tabIndex:0,"data-issue":e.identifier,title:`${e.identifier} ${e.title} (${e.state.name})`,onClick:t,onKeyDown:(n)=>{if(n.key==="Enter")t()},children:[E(Or,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:13},void 0,!1,void 0,this),E("span",{class:"sui-mono sui-muted lin-status-key",children:e.identifier},void 0,!1,void 0,this),E("span",{class:"lin-ellipsis sui-grow",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Qt=({children:e,action:t})=>E("div",{class:"sui-row",children:[E("span",{class:"sui-muted sui-grow",children:e},void 0,!1,void 0,this),t&&E(Te,{label:t.label,variant:"outline",size:"xs",onClick:t.onClick},void 0,!1,void 0,this)]},void 0,!0,void 0,this),kc=({directory:e,workspace:t,state:n})=>{let r=Ac(n),o=r.filter((x)=>t.teamsById.has(x)),s=r.filter((x)=>!t.teamsById.has(x)),i=Wt(o,s),c=zt(s),p=gi(i),f=qt(i),d=yi(e),_=Ai(e),[m,u]=te(new Set),T=n.place?.key??"",O=Oc(t,r,c.data??[]).slice(0,yc),b=Le(()=>vi(Ci(p.data?.nodes??[])),[p.data]),y=Le(()=>wi(f.data?.issues??[]),[f.data]),g=(d.data??[]).filter((x)=>!m.has(et(x))),I=(_.data??[]).filter((x)=>!m.has(et(x))),w=async(x)=>{if(!await Rr({placeKey:T,issue:x}))await oe(k,"info",`Open the Linear panel to see ${x}.`)},F=s.length>0&&c.loading&&!c.data||p.loading&&!p.data||f.loading&&!f.data,J=[c.error,p.error,f.error].find((x)=>x!==void 0&&x!==null),Y=[c.data?.length?"project":"",O.length?"cycle":"",b.shown.length?"chips":"",y.length?"mine":"",I.length?"plans":"",g.length?"drafts":""].filter(Boolean);return E(Ae,{children:[n.detection.inferred&&E("div",{class:"lin-status-hint sui-small",children:[E("span",{class:"sui-muted sui-grow lin-ellipsis",title:`Detected from ${n.detection.evidence}`,children:[bc(t,n)," (detected from ",n.detection.evidence,")"]},void 0,!0,void 0,this),E(Te,{label:"Pin",variant:"outline",size:"xs",onClick:()=>{n.pin()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),I.map((x)=>E(si,{handoff:x,onDone:()=>{u((se)=>new Set(se).add(et(x))),_.refresh()}},x.id,!1,void 0,this)),g.map((x)=>E(ws,{draft:x,onDone:()=>{u((se)=>new Set(se).add(et(x))),d.refresh()}},x.id,!1,void 0,this)),c.data?.length?E(xc,{projects:c.data},void 0,!1,void 0,this):null,O.map((x)=>E("div",{class:"sui-small",children:Pi(x.activeCycle,O.length>1?x.key:null)},x.id,!1,void 0,this)),b.shown.length>0&&E("div",{class:"sui-row",children:[b.shown.map((x)=>E(mo,{children:[E(Or,{type:x.type,color:x.color,teamId:x.teamId,stateId:x.stateId,size:12},void 0,!1,void 0,this),x.count," ",x.name]},x.key,!0,void 0,this)),b.hidden.length>0&&E("span",{class:"sui-muted sui-small",title:b.hidden.map((x)=>`${x.count} ${x.name}`).join(", "),children:["+",b.hidden.length," more"]},void 0,!0,void 0,this),p.data?.capped&&E("span",{class:"sui-muted sui-small",children:["counted the first ",p.data.nodes.length.toLocaleString("en-US")]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),y.length>0&&E("div",{class:"lin-status-block",children:[E("div",{class:"lin-subheading",children:["My issues",f.data?.more?" (first 50)":""]},void 0,!0,void 0,this),y.map((x)=>E(Rc,{issue:x,onOpen:()=>{w(x.identifier)}},x.id,!1,void 0,this))]},void 0,!0,void 0,this),F&&!Y.length&&E(Bt,{size:"sm",label:"Loading Linear"},void 0,!1,void 0,this),J!==void 0&&!Y.length&&E(Ic,{error:J},void 0,!1,void 0,this),!F&&J===void 0&&!Y.length&&E(Qt,{children:"Nothing open for this folder in Linear."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},bc=(e,t)=>[...t.detection.teamIds,...t.detection.projectIds].map((n)=>br(e,n)).join(", "),Ic=({error:e})=>E(mr,{tone:"error",title:"Could not load Linear",body:e instanceof Error?e.message:String(e)},void 0,!1,void 0,this),Fi=()=>{let e=us(),t=_i(),n=e?.directory??null,r=Hi(n,t.data),o=Se(null),[s,i]=te(!1);re(()=>{let d=o.current;if(!d)return;let _=new ResizeObserver(()=>{k.setHeight(Math.ceil(d.getBoundingClientRect().height)).catch(()=>{return})});return _.observe(d),()=>_.disconnect()},[]);let c=xe(()=>{Oe(""),xr(!0).catch(()=>{return}),r.refresh()},[r.refresh]),p=Se(c);p.current=c,re(()=>{let d=()=>p.current();return Ir.add(d),()=>{Ir.delete(d)}},[]),re(()=>{if(!e?.features?.statusControls){i(!1);return}let d=()=>k.setStatusControls([{kind:"button",id:Vi,label:"Refresh"}]).then(()=>i(!0),()=>i(!1));return d(),k.onDirectory(()=>{d()})},[e?.features?.statusControls]),re(()=>{let d=setInterval(()=>{if(document.visibilityState!=="visible")return;Oe("status-"),Oe("projects:"),xr(!0).catch(()=>{return})},60000);return()=>clearInterval(d)},[]);let f=(()=>{if(!e)return E(Bt,{size:"sm",label:"Loading"},void 0,!1,void 0,this);if(!n)return E(Qt,{children:"Open a project to see its Linear work."},void 0,!1,void 0,this);if(t.error&&!t.data){let d=t.error instanceof ae?t.error:new ae("network",String(t.error));return d.kind==="disconnected"?E(Qt,{action:{label:"Connect",onClick:()=>{k.oauthStart()}},children:"Linear is not connected."},void 0,!1,void 0,this):E(mr,{tone:"error",title:"Could not load Linear",body:d.message,action:{label:"Retry",onClick:()=>t.refresh()}},void 0,!1,void 0,this)}if(!t.data||!r.settled)return E(Bt,{size:"sm",label:"Loading Linear"},void 0,!1,void 0,this);if(!r.mapped)return E(Qt,{action:{label:"Pick",onClick:()=>{Cc(r.place?.key??"")}},children:"Pick a Linear project"},void 0,!1,void 0,this);return E(Ae,{children:[E(Ii,{directory:n,workspace:t.data,state:r},void 0,!1,void 0,this),E(kc,{directory:n,workspace:t.data,state:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)})();return E("div",{class:"lin-status",ref:o,children:[f,!s&&e&&n&&r.settled&&E("div",{class:"lin-status-refresh",children:E(Te,{label:"Refresh",variant:"ghost",size:"xs",onClick:c},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Cc=async(e)=>{if(!await Rr({placeKey:e,view:"picker"}))await oe(k,"info","Open the Linear panel to pick a project.")};Zr(E(Fi,{},void 0,!1,void 0,this),document.getElementById("root"));})();

(()=>{var N,ro,Ia,Me,fn,yt,oo,St,so,_n,mn,Oa,Qe=Symbol.for("pv"),xt={},At=[],ba=/^m(i|n|o|s|text|space)$/,En=Array.isArray,io=At.slice,De=Object.assign;function Le(e){e&&e.parentNode&&e.remove()}function Tt(e,t,n,r,o){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Qe,__v:o||++ro,__i:-1,__u:0};return!o&&N.vnode&&N.vnode(s),s}function Te(e){return e.children}function gt(e,t){this.props=e,this.context=t,this.__g=0}function Ue(e,t){if(t==null)return e.__&&Ue(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:Ue(e)}function ka(e){var t,n=e.__v,r=n.__e,o=[],s=[],i=e.__P;i&&((t=De({constructor:Qe},n)).__v=n.__v+1,N.vnode&&N.vnode(t),Sn(i,t,n,e.__n,i.namespaceURI,32&n.__u?[r]:null,o,r||Ue(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,fo(o,t,s),n.__=n.__e=null,t.__e!=r&&ao(t))}function ao(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),ao(e)}function to(e){(8&e.__g||(e.__g|=8,Me.push(e),yt++))&&fn==N.debounceRendering||((fn=N.debounceRendering)||queueMicrotask)(co)}function co(){try{for(var e,t=1;Me.length;)Me.length>t&&Me.sort(oo),e=Me.shift(),t=Me.length,8&e.__g&&ka(e)}finally{(yt=Me.length)&&(fn||queueMicrotask)(co)}}function lo(e,t,n,r,o,s,i,a,p,f,l){var m,_,u,g,R,k,h=r.__k||At,y=t.length;for(p=Ca(n,t,h,p,y),m=0;m<y;m++)(u=n.__k[m])!=null&&(_=~u.__i&&h[u.__i]||xt,u.__i=m,k=Sn(e,u,_,o,s,i,a,p,f,l),g=u.__e,(_.ref!=u.ref||8&_.__u)&&(_.ref&&Tn(_.ref,null,u,_),u.ref&&l.push(u.ref,u.__c||g,u)),R=R||g,4&u.__u?(p=uo(u,p,e,!_.__v),_.__e&&(_.__e=null)):typeof u.type=="function"&&k!==void 0?p=k:g&&(p=g.nextSibling),u.__u&=-21);return n.__e=R,p}function Ca(e,t,n,r,o){var s,i,a,p,f,l,m,_,u,g=n.length,R=g,k=0,h=0,y=e.__k=Array(o);for(s=0;s<o;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=y[s]=Tt(null,i):En(i)?i=y[s]=Tt(Te,{children:i}):i.constructor===Qe&&i.__b?i=y[s]=Tt(i.type,i.props,i.key,i.ref,i.__v):y[s]=i,p=s+k,i.__=e,i.__b=e.__b+1,a=null,~(f=i.__i=wa(i,n,p,R))&&(R--,(a=n[f])&&(a.__u|=2)),a&&a.__v?(i.__u|=16,f==p-1?k--:f==p+1?k++:f!=p&&(f>p?k--:k++,h=1)):(~f||(o>g?k--:o<g&&k++),typeof i.type!="function"&&(i.__u|=4))):y[s]=null;if(h){for(l=[],m=[],s=0;s<o;s++)if((i=y[s])&&16&i.__u){for(k=0,_=l.length;k<_;)l[u=k+_>>1]<i.__i?k=u+1:_=u;l[k]=i.__i,m[s]=k+1}for(k=l.length;s--;)m[s]&&(m[s]==k?k--:y[s].__u|=4)}if(R)for(s=0;s<g;s++)!(a=n[s])||2&a.__u||(a.__e==r&&(r=Ue(a)),gn(a,a));return r}function uo(e,t,n,r){var o,s,i,a;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=uo(o[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=Ue(e))&&!t.parentNode&&(t=null),i=e.__e,a=t;a&&a.nodeType==8;)a=a.nextSibling;for(i!=a&&(!r&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function wa(e,t,n,r){var o,{key:s,type:i}=e,a=t[n],p=a&&!(2&a.__u);if(a===null&&s==null||p&&s==a.key&&i==a.type)return n;if(r>(p?1:0)){for(o=n-1;o>=0;o--)if((a=t[o])&&!(2&a.__u)&&s==a.key&&i==a.type)return o;for(o=n+1;o<t.length;o++)if((a=t[o])&&!(2&a.__u)&&s==a.key&&i==a.type)return o}return-1}function no(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function Et(e,t,n,r,o){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||no(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||no(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof r!="function"&&(r=null),(e.__e||(e.__e={}))[t]=n,n&&r||(i=mn[t]||(mn[t]=va(t)),(e.__a||(e.__a={}))[t]=_n,s=t!=(t=t.replace(so,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(a){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function va(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[St]==null)t[St]=_n++;else if(t[St]<this.__a[e])return;return n(N.event?N.event(t):t)}}}function Sn(e,t,n,r,o,s,i,a,p,f){var l,m,_,u,g,R,k,h,y,b,v,Z,ae,ce,j,I,J,ee,S=t.type;if(t.constructor!==Qe)return null;128&n.__u&&(p=32&n.__u,l=n.__c.__z)&&(t.__u|=p,m=s=[],l.nodeType==8?a=ht(l,s):s.push(l),a=s[0]||a),(l=N.__b)&&l(t);e:if(typeof S=="function"){_=i.length;try{if(h=t.props,y=(l=S.prototype)&&l.render,b=(l=S.contextType)&&r[l.__c],v=l?b?b.props.value:l.__:r,(u=n.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(y?t.__c=u=new S(h,v):(t.__c=u=new gt(h,v),u.constructor=S,u.render=Ma),b&&b.sub(u),u.state||(u.state={}),u.__n=r,u.__g|=8,u.__h=[],u.__k=[]),y&&(u.__s||(u.__s=u.state),S.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=De({},u.__s)),De(u.__s,S.getDerivedStateFromProps(h,u.__s)))),g=u.props,R=u.state,u.__v=t,n.__c){if(h!==g&&y&&!S.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(h,v),t.__v==n.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(h,u.__s,v)===!1){t.__v!=n.__v&&(u.props=h,u.state=u.__s,u.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(T){T&&(T.__=t)}),At.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),a=Ue(n);break e}u.componentWillUpdate&&u.componentWillUpdate(h,u.__s,v),y&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(g,R,k)})}else y&&!S.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),y&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=v,u.props=h,u.__P=e,u.__g&=-5,Z=N.__r,ae=y?25:0;do u.__g&=-9,Z&&Z(t),l=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++ae<25);y&&(At.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(r=De({},r,u.getChildContext())),y&&n.__c&&u.getSnapshotBeforeUpdate&&(k=u.getSnapshotBeforeUpdate(g,R)),ce=l&&l.type===Te&&l.key==null?l.props.children:l,h.__P&&(l=a,o=(e=h.__P).namespaceURI,p=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(T){T&&gn(T,T)}),n.__k=null),a=n.__k?Ue(n,0):null),a=lo(e,En(ce)?ce:[ce],t,n,r,o,s,i,a,p,f),h.__P&&(t.__e=null,a=l),t.__u&=-161,m&&m.some(Le),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(T){if(i.length=_,t.__v=null,p||s)if(T&&T.then){if(t.__u|=128|p,s){for(~(J=s.indexOf(a||void 0))||(J=s.length);(ee=s[J-1])&&ee.nodeType==8;)J--;for(;J<s.length;J++)if(ee=s[J])if(s[J]=null,j){if(ee==I)break}else{if(ee.nodeType!=8)break;ee.data.startsWith("$s")&&(I=ht(j=ee))}}if(!j){for(;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;j=a}(l=ht(j=t.__c.__z||(t.__c.__z=j)))?(t.__e=j,a=l):t.__e=a,a=a&&a.nextSibling}else s&&s.some(Le);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),T&&T.then||po(t),N.__e(T,t,n)}}else a=t.__e=Pa(n.__e,t,n,r,o,s,i,p,f,e);return(l=N.diffed)&&l(t),a}function ht(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function po(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(po))}function fo(e,t,n){for(var r=0;r<n.length;)Tn(n[r++],n[r++],n[r++]);N.__c&&N.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){N.__e(s,o.__v)}})}function Pa(e,t,n,r,o,s,i,a,p,f){var l,m,_,u,g,R,k,h,y=n.props||xt,{props:b,type:v}=t;if(v=="svg"?o="http://www.w3.org/2000/svg":v=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(l=0;l<s.length;l++)if((g=s[l])&&(v?g.localName==v:g.nodeType==3)){e=g,s[l]=null;break}}if(!e){if(h=f.ownerDocument||document,!v)return h.createTextNode(b);e=h.createElementNS(o,v,b.is?b:f),a&&(N.__m&&N.__m(t,s),a=!1),s=null}if(v){if(f=v=="template"&&e.content||e,s=v=="textarea"&&b.defaultValue!=null?null:s&&io.call(f.childNodes),!a&&s)for(y={},l=0;l<e.attributes.length;l++)y[(g=e.attributes[l]).name]=g.value;for(l in y)g=y[l],l=="dangerouslySetInnerHTML"?_=g:l=="children"||(l in b)||l=="value"&&("defaultValue"in b)||l=="checked"&&("defaultChecked"in b)||Et(e,l,null,g,o);for(l in b)g=b[l],l=="children"?u=g:l=="dangerouslySetInnerHTML"?m=g:l=="value"?R=g:l=="checked"?k=g:a&&typeof g!="function"||y[l]===g||Et(e,l,g,y[l],o);m?(a||_&&(m.__html==_.__html||m.__html==e.innerHTML)||(e.innerHTML=m.__html),t.__k=[]):(_&&(e.textContent=""),(v=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&ba.test(v))&&(o="http://www.w3.org/1999/xhtml"),lo(f,En(u)?u:[u],t,n,r,o,s,i,s?s[0]:n.__k&&Ue(n,0),a,p),s&&s.some(Le)),a&&v!="textarea"||(l="value",v=="progress"&&R==null?e.removeAttribute(l):R==null||R===e[l]&&(v!="progress"||R)||Et(e,l,R,y[l],o),l="checked",k!=null&&k!=e[l]&&Et(e,l,k,y[l],o))}else y===b||a&&e.data==b||(e.data=b);return e}function Tn(e,t,n,r){try{typeof e=="function"?t?t.__x=e(t)||1:r&&(r=r.__c||r.__e)&&(t=r.__x)&&(r.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){N.__e(o,n)}}function gn(e,t,n){var r,o,s,i;if(N.unmount&&N.unmount(e),!(r=e.ref)||r.current&&r.current!=e.__e||Tn(r,null,t,e),r=e.__c){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(a){N.__e(a,t)}r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&gn(r[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(r=e.__c)&&(r=r.__z)&&(o=ht(r,s=[]))&&(r==e.__e&&s.some(Le),Le(o),Le(r)),n||Le(e.__e),e.__e=e.__c=e.__=null}function Ma(e,t,n){return this.constructor(e,n)}function mo(e,t){var n,r,o,s;N.__&&N.__(e,t),t.nodeType==9&&(t=t.documentElement),r=(n=e&&32&e.__u)?null:t.__k,t.__k=Tt(Te,{children:[e]}),o=[],s=[],Sn(t,t.__k,r||xt,xt,t.namespaceURI,r?null:t.firstChild?io.call(t.childNodes):null,o,r?r.__e:t.firstChild,n,s),fo(o,t.__k,s),t.__k.props.children=null}N={__e:function(e,t,n,r){for(var o,s,i;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((i=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,r||{}),i=1),i&&8&o.__g)return void(o.__g|=2)}catch(a){e=a}}throw yt=0,e}},ro=0,Ia=function(e){return e!=null&&e.constructor===Qe},gt.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=De({},this.state)),typeof e=="function"&&(e=e(De({},n),this.props)),e&&(De(n,e),this.__v&&(t&&this.__k.push(t),to(this)))},gt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),to(this))},gt.prototype.render=Te,Me=[],yt=0,oo=function(e,t){return e.__v.__b-t.__v.__b},St=Symbol(),so=/(PointerCapture)$|Capture$/i,_n=0,mn={},Oa=0;var et,se,hn,_o,yn=Object.is,tt=0,Ro=[],xn=[],oe=N,{__b:Eo,__r:So,diffed:To,__c:go,unmount:ho,__:yo}=oe;function Rn(e,t){oe.__h&&oe.__h(se,e,tt||t),tt=0;var n=se.__H||(se.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function X(e){return tt=1,Ua(Oo,e)}function Ua(e,t,n){var r=Rn(et++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):Oo(void 0,t),function(s){var i=(r.__N||r.__)[0],a=r.t(i,s);yn(i,a)||(r.__N=[a,r.__[1]],r.__c.setState({}))}],r.__c=se,!se.__f)){se.__f=!0;var o=se.shouldComponentUpdate;se.shouldComponentUpdate=function(s,i,a){var p=this.__H;if(!p)return!0;var f=!1,l=this.props!=s;if(p.__.some(function(_){_.__N&&(f=!0,yn(_.__[0],_.__N[0])||(l=!0))}),o){var m=o.call(this,s,i,a);return f?m||l:m}return!f||l}}return r.__}function z(e,t){var n=Rn(et++,3);!oe.__s&&Io(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,se.__H.__h.push(n))}function ye(e){return tt=5,$e(function(){return{current:e}},[])}function $e(e,t){var n=Rn(et++,7);return Io(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function Oe(e,t){return tt=8,$e(function(){return e},t)}function Na(){var e;do{for(;e=xn.shift();)try{Ze(e)}catch(n){oe.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=Ro.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Ze),t.__h.some(An),t.__h=[]}catch(n){t.__h=[],oe.__e(n,e.__v)}}}while(xn.length)}oe.__b=function(e){se=null,Eo&&Eo(e)},oe.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),yo&&yo(e,t)},oe.__r=function(e){So&&So(e),et=0;var t=(se=e.__c).__H;t&&(hn==se?se.__h=[]:(t.__h.some(Ze),t.__h.some(An),et=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),hn=se},oe.diffed=function(e){To&&To(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&Ao(Ro.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),hn=se=null},oe.__c=function(e,t){t.some(function(n){try{n.__h.some(Ze),n.__h=n.__h.filter(function(r){return!r.__||An(r)})}catch(r){n.__h=[function(){throw r}]}}),go&&go(e,t)},oe.unmount=function(e){ho&&ho(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{if(o.__P&&o.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}o.__P=n,Ao(xn.push(o))}else Ze(o)}catch(s){t=s}}),r.__H=void 0,t&&oe.__e(t,r.__v))};var xo=typeof requestAnimationFrame=="function";function La(e){var t,n=function(){clearTimeout(r),xo&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);xo&&(t=requestAnimationFrame(n))}function Ao(e){e!=1&&_o==oe.requestAnimationFrame||((_o=oe.requestAnimationFrame)||La)(Na)}function Ze(e){var t=se,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),se=t}function An(e){var t=se;e.__c=e.__(),se=t}function Io(e,t){return!e||e.length!=t.length||t.some(function(n,r){return!yn(n,e[r])})}function Oo(e,t){return typeof t=="function"?t(e):t}var Da=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},bo=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),$a=(e,t)=>{let n=e;for(let r of t){if(n===null||n===void 0)return;n=n[r]}return n},In=(e,t)=>{let n=(r,o)=>{if(typeof r==="function")return(...s)=>{let i=$a(t.current,o);return typeof i==="function"?i(...s):void 0};if(Array.isArray(r))return r.map((s,i)=>n(s,[...o,i]));if(Da(r))return Object.fromEntries(Object.entries(r).map(([s,i])=>[s,n(i,[...o,s])]));return r};return n(e,[])};var Ga=Symbol.for("pv"),Ha=0;function E(e,t,n,r,o,s){t||(t={});var i,a,p=t;if("ref"in p&&typeof e!="function")for(a in p={},t)a=="ref"?i=t[a]:p[a]=t[a];var f={type:e,props:p,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Ga,__v:--Ha,__i:-1,__u:0};return(o||s)&&(f.__source=o,f.__self=s),N.vnode&&N.vnode(f),f}var ko=(...e)=>e.filter(Boolean).join(" "),On=({tone:e,class:t})=>E("span",{class:ko("sui-dot",`sui-dot--${e}`,t)},void 0,!1,void 0,this),Co=({children:e,class:t})=>E("span",{class:ko("sui-chip",t),children:e},void 0,!1,void 0,this);var wo=(e,t)=>{let n=ye(null),r=ye(null),o=ye(t);o.current=t;let s=bo(t),i=ye(!1);z(()=>{if(!n.current)return;return r.current=e(n.current,In(o.current,o)),i.current=!0,()=>{r.current?.dispose(),r.current=null,i.current=!1}},[]);let a=ye(s);return z(()=>{if(!i.current||a.current===s)return;a.current=s,r.current?.update(In(o.current,o))},[s]),n};async function le(e,t,n,r={}){let o=r.name??"extension",s={};for(let[i,a]of Object.entries(r.query??{}))if(a)s[i]=a;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...r.body!==void 0?{body:JSON.stringify(r.body)}:{}}),a;try{a=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${o} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&a.ok===void 0)return{ok:!1,error:String(a.message??`Error ${i.status}`),code:"failed"};return a}catch(i){let a=i.code;if(a==="NO_SERVICE")return{ok:!1,error:`Approve the ${o} service in Settings > Extensions.`,code:"failed"};if(a==="SERVICE_FAILED")return{ok:!1,error:`The ${o} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${o} service.`,code:"failed"}}}async function H(e,t,n,r={}){try{await e.toast({kind:t,message:n,...r.dismiss?{dismiss:!0}:{}})}catch{}}var Fe=new Map,Fa=30000,vo=(e)=>{let t=Fe.get(e);if(!t)t={at:0,listeners:new Set},Fe.set(e,t);return t},Rt=(e)=>{for(let t of e.listeners)t()},Ne=(e,t,n=!1)=>{let r=vo(e);if(r.promise)return r.promise;if(!n&&r.value!==void 0&&Date.now()-r.at<Fa)return Promise.resolve(r.value);let o=t().then((s)=>(r.value=s,r.error=void 0,r.at=Date.now(),s),(s)=>{throw r.error=s,s}).finally(()=>{r.promise=void 0,Rt(r)});return r.promise=o,Rt(r),o};var Po=(e)=>{let t=[];for(let[n,r]of Fe){if(r.value===void 0)continue;let o=e(n,r.value);if(o===r.value)continue;t.push([r,r.value]),r.value=o,Rt(r)}return()=>{for(let[n,r]of t)n.value=r,Rt(n)}},Be=(e)=>{let t=Fe.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)Ne(e,t.fetcher,!0).catch(()=>{return})},q=(e)=>{for(let[t,n]of Fe){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)Ne(t,n.fetcher,!0).catch(()=>{return})}},ge=(e,t)=>{let[,n]=X(0);z(()=>{if(!e)return;let o=vo(e);o.fetcher=t;let s=()=>n((i)=>i+1);return o.listeners.add(s),Ne(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let r=e?Fe.get(e):void 0;return{data:r?.value,error:r?.error,loading:Boolean(r?.promise)||e!==null&&r?.value===void 0&&r?.error===void 0,refresh:()=>{if(e)Ne(e,t,!0).catch(()=>{return})}}};var M="openchamber.sdk",U=1;var bn=`
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
`;function kn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(r)=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=n.get(o);if(s!==void 0)clearTimeout(s);n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Ba=`(${kn.toString()})(document);`;var Cn=128,wn=65536;var It=128;var Ot=65536;var Lo=/^[a-z][a-z0-9-]{0,39}$/;var Mo=(e)=>Object(e)===e&&!Array.isArray(e),vn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),Uo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,No=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Do=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!Mo(n)||!Lo.test(n.id)||!Uo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!vn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!vn(n,["kind","id","label","value","options","disabled"]))return!1;if(!No(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!Mo(o)||!vn(o,["value","label"])||!No(o.value)||!Uo(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var $o=["{id}","{segment}","{segments+}"];var sd=new Set($o);var Go=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var ad=new Set(Go);var bt=20000000,kt=256;var Pn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Ho=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var jo=/^[A-Za-z0-9_-]{1,80}$/;var Fo=["left","right","top","bottom"];var Bo=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!Bo(o,t+1,n))return!1;return!0},Mn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Mn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Mn)}return String(e)===e||Number.isFinite(e)},Un=(e)=>{try{if(String(e.id)!==e.id||!jo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Fo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Bo(e.data)||!Mn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Ln=2000;var Xo=["file","directory","other","missing"],Dn=(e)=>Boolean(e&&"sessionId"in e),$n=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Wo=/^[0-9a-f]{7,64}$/i,Gn=(e)=>Wo.test(e),Ct=500,wt=32000,Ko=16000,zo=128,qo=200,Jo=2000,Yo=16000,Qo=80,Zo=200,es=16000;var ts=2000;var Hn=20000,vt=1024,Pt=2000000;var Mt=64000,Ut=8000,jn=4000;var Fn=960000;var ns=999,rs=1e4,nt=500,os=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],ss=["stopped","starting","ready","failed"],Xa=new Set(os),is=(e)=>Xa.has(e),as=(e)=>e&&is(e)?e:"HOST_REJECTED",Ve=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Ve);if(Object(e)===e)return Object.values(e).every(Ve);return!1},cs=(e)=>Ve(e)&&JSON.stringify(e).length<=es,Vo=(e)=>e?.trim().slice(0,Zo)??"",Xe=(e)=>{let t=e.id.trim().slice(0,zo),n=e.title.trim().slice(0,qo),r=e.url.trim().slice(0,Jo),o=e.text?.trim().slice(0,Yo),s=e.author?.trim().slice(0,Qo),i=e.kind==="pull"?"pull":"issue",a={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o)a.text=o;if(s)a.author=s;if(i==="pull"){let p=Vo(e.branches?.head),f=Vo(e.branches?.base);if(p&&f)a.branches={head:p,base:f}}if(cs(e.data))a.data=e.data;return a},Bn=(e)=>{let t=Xe(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Vn=(e)=>{let t={text:e.text.trim().slice(0,Ko)};if(e.send)t.send=!0;return t},Xn=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ns,Math.max(0,Math.round(e)))},Wn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(rs,Math.max(0,Math.ceil(e)))};var We=(e)=>e.length>0&&e.length<=vt&&!e.includes("\x00")&&!e.includes("\\");var Nt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>ts)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Wa=new Set(ss),Kn=(e)=>Boolean(e&&"status"in e&&Wa.has(String(e.status))&&!("body"in e)),Lt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),zn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),qn=(e)=>Boolean(e&&"written"in e&&e.written===!0),Jn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Ka=new Set(Xo),Yn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Ka.has(String(e.kind))&&Number.isFinite(e.size)),Qn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),za=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),qa=(e)=>Object(e)===e?e:null,Nn=(e)=>String(e)===e&&e.length>0,Ja=(e)=>{if(!Nn(e.id))return null;if(e.ok===!0){let t={channel:M,v:U,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Nn(e.error))return{channel:M,v:U,type:"result",id:e.id,ok:!1,error:e.error,code:as(Nn(e.code)?e.code:void 0)};return null},Zn=(e)=>{let t=qa(e);if(!t||t.channel!==M||t.v!==U)return null;if(t.type==="result")return Ja(t);if(!za.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var ls=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Ya=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class w extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var ds=()=>Promise.reject(new w("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Dt=()=>Promise.reject(new w("BAD_PATH",`File path must be 1 to ${vt} characters without NUL or backslash.`)),$t=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new w("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},P=(e)=>(e.value+=1,`oc-${e.value}`),er=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new w("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((c)=>c===t.parent),r=e.requestTimeoutMs??Hn,o=new Set,s=new Set,i=new Set,a=new Set,p=new Set,f=new Set,l=new Set,m=new Set,_=new Set,u=new Set,g=new Set,R=new Set,k=[],h=null,y=null,b=new Set,v=new Set,Z=null,ae=null,ce=!1,j=new Map,I=new Map,J=new Map,ee=!1,S={value:0},T=null,Ie=null,Je=!1,Ye=!1,Br=null,Vr=(c)=>{if(!c)return null;return{sessionId:c.id,phase:c.busy?"started":"completed"}},_e=(c)=>{t.parent.postMessage(c,"*")},Xr=()=>{if(ee||t.parent===t||R.size===0||T?.features?.lateGenerateResults!==!0)return;_e({channel:M,v:U,type:"generate-late-listen"})},K=(c,d)=>{for(let O of c)try{O(d)}catch(C){console.error(C)}},Wr=(c)=>{if(!(c instanceof MessageEvent))return;if(!n(c.source))return;let d=Zn(c.data);if(!d)return;if(d.type==="workspace"){let C=I.get(d.payload.subscriptionId);if(C)K([C],d.payload.snapshot);return}if(d.type==="shells"){let C=J.get(d.payload.subscriptionId);if(C)K([C],d.payload.snapshot);return}if(d.type==="ready"){if(T=d.payload,Ie=Vr(d.payload.session),K(o,d.payload),K(s,d.payload.directory),K(i,d.payload.session),Ie)K(a,Ie);if(K(p,d.payload.connection),K(f,d.payload.settings),K(l,d.payload.item),d.payload.block)K(m,d.payload.block);Xr();return}if(d.type==="service-event"){K(_,d.payload);return}if(d.type==="generate-late"){if(R.size===0)k.push(d.payload);else K(R,d.payload);return}if(d.type==="directory"){if(T)T={...T,directory:d.payload.directory};K(s,d.payload.directory);return}if(d.type==="session"){if(T)T={...T,session:d.payload.session};if(!d.payload.session)Ie=null;else if(Ie?.sessionId!==d.payload.session.id)Ie=Vr(d.payload.session);K(i,d.payload.session);return}if(d.type==="session-lifecycle"){Ie=d.payload,K(a,d.payload);return}if(d.type==="connection"){if(T)T={...T,connection:d.payload.connection};K(p,d.payload.connection);return}if(d.type==="settings"){if(T)T={...T,settings:d.payload.settings};K(f,d.payload.settings);return}if(d.type==="item"){if(T)T={...T,item:d.payload.item};K(l,d.payload.item);return}if(d.type==="status-control-event"){K(u,d.payload);return}if(d.type==="popover-closed"){K(g,d.payload);return}if(d.type==="action"){let C=(F)=>{if(!ee)_e({channel:M,v:U,type:"action-result",id:d.id,payload:F})},V=y;if(!V){C({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>V(d.payload)).then(()=>C({ok:!0}),(F)=>{let re=(F instanceof Error?F.message:String(F)).trim();C({ok:!1,error:(re||"Action failed.").slice(0,nt)})});return}if(d.type==="file-open"){let C=d.payload;if(ae&&Ho(ae,C))return;ae=C,K(b,d.payload);return}if(d.type==="file-saved"){K(v,d.payload.version);return}if(d.type==="file-snapshot"){let C=(re)=>{if(!ee)_e({channel:M,v:U,type:"file-snapshot-result",id:d.id,payload:re})},V=(re)=>C({error:(re.trim()||"Could not read the edited file.").slice(0,nt)}),F=Z;if(!F){V("This extension does not edit files.");return}Promise.resolve().then(()=>F(d.payload.purpose)).then((re)=>{if(Pn(re)>bt){V(`The file is over ${bt} ${"bytes"in re?"bytes":"characters"}.`);return}if(re.version.length>kt){V(`The snapshot version is over ${kt} characters.`);return}C({snapshot:"bytes"in re?{bytes:re.bytes,version:re.version}:{content:re.content,version:re.version}})},(re)=>V(re instanceof Error?re.message:String(re)));return}if(d.type==="resolve"){let C=(F)=>{_e({channel:M,v:U,type:"resolve-result",id:d.id,payload:F})},V=h;if(!V){C({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>V(d.payload)).then((F)=>C({item:F?Xe(F):null}),(F)=>{let re=(F instanceof Error?F.message:String(F)).trim();C({error:(re||"Command failed.").slice(0,nt)})});return}let O=j.get(d.id);if(!O)return;if(clearTimeout(O.timer),j.delete(d.id),d.ok){O.resolve(d.payload);return}O.reject(new w(d.code,d.error))};t.addEventListener("message",Wr),_e({channel:M,v:U,type:"hello"});let ue=(c,d=r)=>{if(ee||t.parent===t)return Promise.reject(new w("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((O,C)=>{let V=setTimeout(()=>{j.delete(c.id),C(new w("HOST_TIMEOUT","Host did not answer in time."))},d);j.set(c.id,{resolve:O,reject:C,timer:V}),_e(c)})},te=(c)=>ue(c).then(()=>{return}),ne={channel:M,v:U},dn=(c)=>{if(!ee&&t.parent!==t)_e(c)},Kr=()=>dn({...ne,type:"file-save"}),zr=(c)=>{if(!ls(c)||!Ya(c))return;c.preventDefault(),Kr()},qr=(c)=>{if(!ls(c)||c.key!=="Escape"||T?.surface!=="popover"||!T.popover)return;c.preventDefault(),Zr(T.popover.id,"escape").catch(()=>{return})},ft=()=>{let c=T?.surface==="popover"?T.popover:void 0;if(!c)return;let d=Je||Ye;if(Br===d)return;Br=d,eo(c.id,d).catch(()=>{return})},mt=()=>{if(T?.surface!=="popover"||Je)return;Je=!0,ft()},Jr=(c)=>{if(T?.surface!=="popover"||c.relatedTarget!==null||!Je)return;Je=!1,ft()},Yr=()=>{if(T?.surface!=="popover"||Ye)return;Ye=!0,ft()},Qr=()=>{if(T?.surface!=="popover"||!Ye)return;Ye=!1,ft()},he=(c,d=1024)=>{if(!c.trim()||c.length>d)throw new w("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},un=async(c)=>{if(c.kind!=="projects")he(c.projectId);let d=await ue({...ne,type:"workspace-read",id:P(S),payload:c});if(!d||!("kind"in d)||!("state"in d)||d.kind!==c.kind)throw new w("HOST_REJECTED","Host did not return workspace data.");return d},pn=async(c,d)=>{if(c.kind!=="projects")he(c.projectId);let O=P(S);I.set(O,d);try{await te({...ne,type:"workspace-subscribe",id:P(S),payload:{subscriptionId:O,query:c}})}catch(C){if(I.delete(O),!ee)_e({...ne,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:O}});throw C}return()=>{if(!I.delete(O)||ee)return;_e({...ne,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:O}})}},Ra=async(c,d)=>{if(c.kind==="session")he(c.sessionId);if(c.kind==="project")he(c.projectId);let O=P(S);J.set(O,d);try{await te({...ne,type:"shells-subscribe",id:P(S),payload:{subscriptionId:O,scope:c}})}catch(C){if(J.delete(O),!ee)_e({...ne,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:O}});throw C}return()=>{if(!J.delete(O)||ee)return;_e({...ne,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:O}})}},_t=async(c)=>{if("key"in c&&(c.key.length===0||c.key.length>Cn))throw new w("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!Ve(c.value))throw new w("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>wn)throw new w("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&T?.features?.deviceStorage!==!0)throw new w("UNSUPPORTED","This host does not support device storage.");let d=await ue({...ne,type:"storage",id:P(S),payload:c});if(!d||!("storage"in d)||d.op!==c.op)throw new w("HOST_REJECTED","Host did not return storage data.");return d},Zr=(c,d)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===c)?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):te({...ne,type:"popover-close",id:P(S),payload:d?{id:c,reason:d}:{id:c}}),eo=(c,d)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===c)?Promise.reject(new w("UNSUPPORTED","This host does not support popovers.")):te({...ne,type:"popover-anchor",id:P(S),payload:{id:c,active:d}});return t.addEventListener("keydown",qr,!0),t.addEventListener("pointerover",mt),t.addEventListener("pointermove",mt),t.addEventListener("pointerout",Jr),t.addEventListener("focus",Yr),t.addEventListener("blur",Qr),{onAction:(c)=>(y=c,()=>{if(y===c)y=null}),listProjects:async()=>{let c=await un({kind:"projects"});if(c.kind!=="projects")throw new w("HOST_REJECTED","Expected projects.");return c},listWorktrees:async(c)=>{let d=await un({kind:"worktrees",projectId:c});if(d.kind!=="worktrees")throw new w("HOST_REJECTED","Expected worktrees.");return d},listSessions:async(c)=>{let d=await un({kind:"sessions",projectId:c});if(d.kind!=="sessions")throw new w("HOST_REJECTED","Expected sessions.");return d},onProjects:(c)=>pn({kind:"projects"},(d)=>{if(d.kind==="projects")c(d)}),onWorktrees:(c,d)=>pn({kind:"worktrees",projectId:c},(O)=>{if(O.kind==="worktrees")d(O)}),onSessions:(c,d)=>pn({kind:"sessions",projectId:c},(O)=>{if(O.kind==="sessions")d(O)}),onRunningShells:(c,d)=>Ra(c,d),readShellOutput:async(c,d)=>{he(c,It);let O=d?.cursor;if(O!==void 0&&(!Number.isInteger(O)||O<0))throw new w("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let C=d?.tailBytes;if(C!==void 0&&(!Number.isInteger(C)||C<1||C>Ot))throw new w("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Ot}.`);let F=await ue({...ne,type:"shell-output",id:P(S),payload:{shellId:c,cursor:O,tailBytes:C}});if(!F||typeof F.output!=="string"||!Number.isFinite(F.cursor))throw new w("HOST_REJECTED","Host did not return shell output.");return F},stopShell:async(c)=>{if(he(c,It),(await ue({...ne,type:"shell-stop",id:P(S),payload:{shellId:c}}))?.stopped!==!0)throw new w("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(c)=>{he(c),await te({...ne,type:"open-session",id:P(S),payload:{sessionId:c}})},storage:{get:async(c,d)=>{let O=$t(d),C={op:"get",key:c};if(O)C.scope=O;let V=await _t(C);return V.op==="get"&&V.found?V.value:void 0},set:async(c,d,O)=>{let C=$t(O),V={op:"set",key:c,value:d};if(C)V.scope=C;await _t(V)},delete:async(c,d)=>{let O=$t(d),C={op:"delete",key:c};if(O)C.scope=O;await _t(C)},keys:async(c)=>{let d=$t(c),O={op:"keys"};if(d)O.scope=d;let C=await _t(O);if(C.op!=="keys")throw new w("HOST_REJECTED","Expected storage keys.");return C.keys}},onReady:(c)=>{if(o.add(c),T)c(T);return()=>{o.delete(c)}},onDirectory:(c)=>{if(s.add(c),T)c(T.directory);return()=>{s.delete(c)}},onSession:(c)=>{if(i.add(c),T)c(T.session);return()=>{i.delete(c)}},onSessionLifecycle:(c)=>{if(a.add(c),Ie)c(Ie);return()=>{a.delete(c)}},onConnection:(c)=>{if(p.add(c),T)c(T.connection);return()=>{p.delete(c)}},onSettings:(c)=>{if(f.add(c),T)c(T.settings);return()=>{f.delete(c)}},onItem:(c)=>{if(l.add(c),T)c(T.item);return()=>{l.delete(c)}},onBlock:(c)=>{if(m.add(c),T?.block)c(T.block);return()=>{m.delete(c)}},onServiceEvent:(c)=>(_.add(c),()=>{_.delete(c)}),onStatusControl:(c)=>(u.add(c),()=>{u.delete(c)}),onPopoverClosed:(c)=>(g.add(c),()=>{g.delete(c)}),setStatusControls:(c)=>{if(T?.features?.statusControls!==!0)return Promise.reject(new w("UNSUPPORTED","This host does not support status controls."));if(!Do(c))return Promise.reject(new w("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return te({...ne,type:"status-controls",id:P(S),payload:{controls:c}})},openPopover:(c)=>{if(T?.features?.popovers!==!0)return Promise.reject(new w("UNSUPPORTED","This host does not support popovers."));if(!Un(c))return Promise.reject(new w("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return te({...ne,type:"popover-open",id:P(S),payload:c})},closePopover:Zr,setPopoverAnchorActive:eo,onResolve:(c)=>(h=c,()=>{if(h===c)h=null}),toast:(c)=>{let d=c.message.trim();if(!d||d.length>Ct)return Promise.reject(new w("HOST_REJECTED",`Toast message must contain 1 to ${Ct} characters.`));if(c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>wt))return Promise.reject(new w("HOST_REJECTED",`Toast copy text must contain 1 to ${wt} characters.`));return te({channel:M,v:U,type:"toast",id:P(S),payload:{...c,message:d}})},openUrl:(c)=>te({channel:M,v:U,type:"open-url",id:P(S),payload:{url:c}}),openCommit:(c)=>Gn(c)?te({channel:M,v:U,type:"open-commit",id:P(S),payload:{sha:c}}):Promise.reject(new w("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(c)=>te({channel:M,v:U,type:"block-answer",id:P(S),payload:{text:c.trim().slice(0,Ln)}}),openSurface:(c)=>te({channel:M,v:U,type:"open-surface",id:P(S),payload:{surfaceId:c}}),writeClipboard:(c)=>te({channel:M,v:U,type:"clipboard-write",id:P(S),payload:{text:c}}),compose:(c)=>te({channel:M,v:U,type:"compose",id:P(S),payload:c}),attach:(c)=>te({channel:M,v:U,type:"attach",id:P(S),payload:Xe(c)}),startSession:async(c)=>{if(c.projectId!==void 0)he(c.projectId);let d=c.worktree;if(d&&d!==!0)if(d.kind==="existing")he(d.directory);else{if(d.name!==void 0)he(d.name,200);if(d.baseBranch!==void 0)he(d.baseBranch,200)}let O=await ue({channel:M,v:U,type:"start-session",id:P(S),payload:Bn(c)},e.requestTimeoutMs??180000);if(!Dn(O))throw new w("HOST_REJECTED","Host did not return a session.");return O},prompt:(c)=>ue({channel:M,v:U,type:"prompt",id:P(S),payload:Vn(c)}).then((d)=>{if(!$n(d))throw new w("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:(c)=>te({channel:M,v:U,type:"session-link",id:P(S),payload:Xe(c)}),close:()=>te({channel:M,v:U,type:"close",id:P(S)}),oauthStart:()=>te({channel:M,v:U,type:"oauth-start",id:P(S)}),oauthDisconnect:()=>te({channel:M,v:U,type:"oauth-disconnect",id:P(S)}),request:(c)=>(Nt(c.path)?ue({channel:M,v:U,type:"request",id:P(S),payload:c}):ds()).then((d)=>{if(!Lt(d))throw new w("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:(c)=>(Nt(c.path)?ue({channel:M,v:U,type:"service-request",id:P(S),payload:c}):ds()).then((d)=>{if(!Lt(d))throw new w("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>ue({channel:M,v:U,type:"service-status",id:P(S)}).then((c)=>{if(!Kn(c))throw new w("HOST_REJECTED","Host did not return service status.");return c}),readFile:(c)=>(We(c)?ue({channel:M,v:U,type:"file-read",id:P(S),payload:{path:c}}):Dt()).then((d)=>{if(!zn(d))throw new w("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(c,d)=>{if(!We(c))return Dt();if(d.length>Pt)return Promise.reject(new w("FILE_TOO_LARGE",`Content is over ${Pt} characters.`));return ue({channel:M,v:U,type:"file-write",id:P(S),payload:{path:c,content:d}}).then((O)=>{if(!qn(O))throw new w("HOST_REJECTED","Host did not confirm the write.");return O})},listDir:(c)=>(We(c)?ue({channel:M,v:U,type:"file-list",id:P(S),payload:{path:c}}):Dt()).then((d)=>{if(!Jn(d))throw new w("HOST_REJECTED","Host did not return directory entries.");return d}),stat:(c)=>(We(c)?ue({channel:M,v:U,type:"file-stat",id:P(S),payload:{path:c}}):Dt()).then((d)=>{if(!Yn(d))throw new w("HOST_REJECTED","Host did not return file status.");return d}),generate:(c)=>{let d=c.prompt.trim(),O=c.system?.trim();if(d.length===0||d.length>Mt)return Promise.reject(new w("HOST_REJECTED",`Prompt must be 1 to ${Mt} characters.`));if(O!==void 0&&(O.length===0||O.length>Ut))return Promise.reject(new w("HOST_REJECTED",`System prompt must be 1 to ${Ut} characters.`));let C=c.maxOutputTokens===void 0?void 0:Math.min(jn,Math.max(1,Math.floor(c.maxOutputTokens)));if(C!==void 0&&!Number.isFinite(C))return Promise.reject(new w("HOST_REJECTED","maxOutputTokens must be a number."));let V={prompt:d};if(O!==void 0)V.system=O;if(C!==void 0)V.maxOutputTokens=C;return ue({channel:M,v:U,type:"generate",id:P(S),payload:V},e.requestTimeoutMs??Fn).then((F)=>{if(!Qn(F))throw new w("HOST_REJECTED","Host did not return generated text.");return F})},onLateGenerateResult:(c)=>{R.add(c);for(let d of k.splice(0))K([c],d);return Xr(),()=>{R.delete(c)}},setBadge:(c)=>te({channel:M,v:U,type:"badge",id:P(S),payload:{count:Xn(c)}}),setHeight:(c)=>te({channel:M,v:U,type:"resize",id:P(S),payload:{height:Wn(c)}}),onFileOpen:(c)=>{if(b.add(c),!ce)ce=!0,t.addEventListener("keydown",zr,!0);if(ae)c(ae);return()=>{b.delete(c)}},onFileSnapshot:(c)=>(Z=c,()=>{if(Z===c)Z=null}),onFileSaved:(c)=>(v.add(c),()=>{v.delete(c)}),reportFileChange:(c)=>dn({...ne,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:Kr,reportFileUnsupported:()=>dn({...ne,type:"file-unsupported"}),dispose:()=>{for(let c of I.keys())_e({...ne,type:"workspace-unsubscribe",id:P(S),payload:{subscriptionId:c}});I.clear();for(let c of J.keys())_e({...ne,type:"shells-unsubscribe",id:P(S),payload:{subscriptionId:c}});if(J.clear(),ee=!0,h=null,y=null,Z=null,b.clear(),v.clear(),ce)t.removeEventListener("keydown",zr,!0);t.removeEventListener("message",Wr),t.removeEventListener("keydown",qr,!0),t.removeEventListener("pointerover",mt),t.removeEventListener("pointermove",mt),t.removeEventListener("pointerout",Jr),t.removeEventListener("focus",Yr),t.removeEventListener("blur",Qr);for(let c of j.values())clearTimeout(c.timer),c.reject(new w("HOST_UNAVAILABLE","Host client was disposed."));j.clear(),o.clear(),s.clear(),i.clear(),a.clear(),p.clear(),f.clear(),l.clear(),m.clear(),_.clear(),u.clear(),g.clear(),R.clear(),k.length=0}}};var us=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var xd=new Set(us);var ps=["none","agent","user"];var Rd=new Set(ps);var Qa=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Za=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],fs=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of Qa)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of Za){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},tr=(e,t)=>{if(fs(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var ec={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},W=(e,t)=>`var(--${e}, var(--oc-${ec[e]}, ${t}))`,ke=W("surface-background","transparent"),Ht=W("surface-elevated","transparent"),Ke=W("surface-elevated-foreground","inherit"),Ee=W("surface-foreground","inherit"),Y=W("surface-muted-foreground","gray"),tc=W("surface-muted","transparent"),Ge=W("interactive-border","currentColor"),pe=W("interactive-hover","transparent"),He=W("interactive-active","transparent"),nr=W("interactive-selection","transparent"),rr=W("interactive-selection-foreground","inherit"),be=W("primary","currentColor"),or=W("primary-text","inherit"),sr=W("error-text","inherit"),nc=W("font-sans","inherit"),ir=W("font-mono","monospace"),Ss=W("radius","9px"),ar=`calc(${Ss} - 2px)`,ms=`calc(${Ss} - 4px)`,Q=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,_s=`background-image: linear-gradient(${pe}, ${pe});`,cr=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,lr="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Es="box-shadow: var(--oc-sdk-lit);",dr=`inset 0 0.5px 0 0 ${Q(Ee,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,rc=`
:root {
  --oc-sdk-edge: ${Q(Ee,16)};
  --oc-sdk-field-bg: ${Ht};
  --oc-sdk-raised-bg: ${ke};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Q(Ee,14)};
  --oc-sdk-field-bg: ${Q(ke,50,Ht)};
  --oc-sdk-raised-bg: ${Ht};
  --oc-sdk-field-lift: ${dr};
  --oc-sdk-raised-lift: ${dr};
  --oc-sdk-lit: ${dr};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Gt=(e)=>{let t=W(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${W(`${e}-text`,"inherit")}; }`},oc=`
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
`,Ts=`${rc}
.oc-sdk { color: ${Ee}; font-family: ${nc}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${_s} }
.oc-sdk-mono { font-family: ${ir}; }
.oc-sdk-muted { color: ${Y}; }
${Gt("success")}${Gt("warning")}${Gt("error")}${Gt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${be}; --oc-sdk-tone-text: ${or}; }

.oc-sdk-btn { border-radius: ${ar}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${ms}; }
.oc-sdk-btn[data-variant="default"] { color: ${or}; background: ${Q(be,10,ke)}; border-color: ${Q(be,12)}; ${Es} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Q(be,16,ke)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Q(be,22,ke)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${tc}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${He}, ${He}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ke}; ${lr} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${He}, ${He}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${pe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${He}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${W("status-error","red")}; color: ${sr}; background: ${Q("var(--oc-sdk-tone)",7,ke)}; border-color: ${Q("var(--oc-sdk-tone)",12)}; ${Es} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Q("var(--oc-sdk-tone)",9,ke)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Q("var(--oc-sdk-tone)",11,ke)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Y}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${sr}; }
.oc-sdk-input { border-radius: ${ar}; background: var(--oc-sdk-field-bg); color: ${Ke}; ${cr("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Y}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${cr(Q(Ee,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${cr(W("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${ir}; }

.oc-sdk-search-icon { color: ${Y}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${be}; }
.oc-sdk-search-clear { border-radius: ${ms}; color: ${Y}; }
.oc-sdk-search-clear:hover { background: ${pe}; color: ${Ee}; }

.oc-sdk-trigger { border-radius: ${ar}; background: var(--oc-sdk-raised-bg); color: ${Ke}; ${lr} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${pe}, ${pe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${He}, ${He}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Y}; }
.oc-sdk-trigger-chevron { color: ${Y}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ke}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ht}; background-clip: padding-box; color: ${Ke}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${pe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${nr}; color: ${rr}; }
.oc-sdk-option-check { color: ${Ee}; }
.oc-sdk-option[data-destructive="true"] { color: ${sr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Q(W("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Y}; }
.oc-sdk-popup-empty { color: ${Y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ge}; border-radius: 4px; color: ${Ee}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Q(Ee,60,Ge)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ge}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ke}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${be}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${_s} }
.oc-sdk-check-desc { color: ${Y}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Q(Ee,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Y}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Ee}; }
.oc-sdk-tab[aria-selected="true"] { color: ${rr}; background: ${nr}; border-color: ${Ge}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ke}; background: var(--oc-sdk-raised-bg); ${lr} }
.oc-sdk-tab-count { color: ${Y}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Q(Ee,6)}; color: ${Y}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Q("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${pe}; }
.oc-sdk-row[aria-selected="true"] { background: ${nr}; color: ${rr}; }
.oc-sdk-row-lead { font-family: ${ir}; color: ${Y}; }
.oc-sdk-row-sub { color: ${Y}; }
.oc-sdk-row-meta { color: ${Y}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Y}; }

.oc-sdk-empty-body { color: ${Y}; }

.oc-sdk-spinner { color: ${Y}; }
.oc-sdk-spinner-ring { border-color: ${Ge}; border-top-color: ${be}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Q("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Y}; }

.oc-sdk-separator { color: ${Y}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Q(Ge,40)}; }

.oc-sdk-progress-label { color: ${Y}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Q(Ee,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${be}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${W("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${W("success-text","inherit")}; }

.oc-sdk-text a { color: ${or}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Q(Ge,60)}; }
`,L=`
${bn}
${oc}
${Ts}`;var gs="oc-sdk-ui-style",Ce=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},D=(e)=>{let t=document.getElementById(gs);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}kn(document);let n=document.createElement("style");n.id=gs,n.textContent=e,document.head.appendChild(n)},x=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},fe=(e)=>{let t=x("button",e);return t.type="button",t},B=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},Se=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},hs=(e,t)=>{let n=(r)=>{if(r.target instanceof Node&&e.contains(r.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var sc=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},we=(e,t)=>{D(L);let n=t,r=fe("oc-sdk oc-sdk-btn"),o=sc(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{if(r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=Boolean(n.disabled)||Boolean(n.loading),r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r)r.prepend(o);else if(!n.loading&&o.parentNode===r)o.remove();B(s,n.label)},a=()=>{if(n.disabled||n.loading)return;n.onClick()};return r.addEventListener("click",a),i(),{update:(p)=>{n={...n,...p},i()},dispose:()=>{r.removeEventListener("click",a),r.remove()}}};var ur=(e,t)=>{D(L);let n=t,r=x("label","oc-sdk oc-sdk-field"),o=x("span","oc-sdk-field-label"),s=n.multiline?x("textarea","oc-sdk-input"):x("input","oc-sdk-input"),i=x("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let a=()=>{if(B(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),Se(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let f=Boolean(n.error);r.dataset.invalid=f?"true":"false",s.setAttribute("aria-invalid",f?"true":"false");let l=n.error??n.helper??"";B(i,l),i.hidden=l===""},p=()=>{n.onChange(s.value)};return s.addEventListener("input",p),a(),{update:(f)=>{n={...n,...f},a()},dispose:()=>{s.removeEventListener("input",p),r.remove()}}};var ic={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},xe=(e,t,n)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n)r.setAttribute("class",n);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",ic[e]),r.append(o),r};var pr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-search"),o=x("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=fe("oc-sdk-search-clear");s.append(xe("close",14)),s.tabIndex=-1,r.append(xe("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let l=n.placeholder??"Search";if(Se(o,"placeholder",l),o.setAttribute("aria-label",n.label??l),s.setAttribute("aria-label","Clear search"),o.value!==n.value)o.value=n.value;r.dataset.active=n.value.trim()===""?"false":"true"},a=()=>{if(n.value!=="")n.onChange("");o.focus()},p=()=>{n.onChange(o.value)},f=(l)=>{if(l.key==="Escape"&&o.value!=="")l.preventDefault(),a()};if(o.addEventListener("input",p),o.addEventListener("keydown",f),s.addEventListener("click",a),i(),n.autofocus)o.focus();return{update:(l)=>{n={...n,...l},i()},dispose:()=>{o.removeEventListener("input",p),o.removeEventListener("keydown",f),s.removeEventListener("click",a),r.remove()}}};var Re=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},ve=(e,t,n)=>{let r=e.filter((p)=>!p.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex((p)=>p.id===t);if(i===-1)return n==="next"?o.id:s.id;return r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var ys=(e,t)=>`${e}-${t??""}`,jt=(e,t,n,r)=>{let o=fe("oc-sdk-option");if(o.id=ys(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(n.disabled),t==="option")o.setAttribute("aria-selected",n.selected?"true":"false");o.dataset.destructive=n.destructive?"true":"false";let s=x("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=x("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=x("span","oc-sdk-option-check");i.append(xe("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Ft=(e,t,n,r)=>{let o=ys(n,r);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";Se(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ac=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;if(r>o&&n.top-8>o)e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},Bt=(e,t,n,r)=>{e.append(n),ac(n,t);let o=hs(e,r),s=()=>{r()},i=(a)=>{if(a.target instanceof Node&&n.contains(a.target))return;r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var xs=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((r)=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n))},cc=0,Vt=(e,t)=>{D(L);let n=t,r=`oc-sdk-select-${cc+=1}`,o=x("div","oc-sdk oc-sdk-select"),s=x("span","oc-sdk-field-label");s.id=`${r}-label`;let i=fe("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let a=x("span","oc-sdk-trigger-value");i.append(a,xe("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let p="",f=null,l=null,m=x("div","oc-sdk oc-sdk-popup"),_=x("div","oc-sdk-popup-search"),u=x("input","oc-sdk-input");u.type="text",u.autocomplete="off",_.append(u);let g=x("div");g.setAttribute("role","listbox"),g.tabIndex=-1,m.append(g);let R=()=>xs(n.options,n.searchable?p:""),k=()=>n.searchable?u:g,h=(S)=>{f=S,Ft(g,k(),r,S)},y=()=>{Ce(g);let S=R();if(S.length===0){let T=x("div","oc-sdk-popup-empty");T.textContent="No matches",g.append(T)}for(let T of S)g.append(jt(r,"option",{...T,selected:T.id===n.value},{hover:()=>h(T.id),pick:()=>Z(T.id)}));h(S.some((T)=>T.id===f)?f:S[0]?.id??null)},b=()=>{let S=l;l=null,S?.(),p="",u.value="",i.setAttribute("aria-expanded","false")},v=()=>{if(l||n.disabled)return;if(f=n.value,u.placeholder=n.searchPlaceholder??"Search",n.searchable)m.prepend(_);else _.remove();y(),l=Bt(o,i,m,b),i.setAttribute("aria-expanded","true"),k().focus()},Z=(S)=>{if(b(),i.focus(),S!==n.value)n.onChange(S)},ae=()=>{if(l)b();else v()},ce=(S)=>{if(!l&&Re(S))S.preventDefault(),v()},j=(S)=>{let T=Re(S);if(T)S.preventDefault(),h(ve(R(),f,T));else if(S.key==="Enter"){if(S.preventDefault(),f)Z(f)}else if(S.key==="Escape")S.preventDefault(),b(),i.focus();else if(n.searchable&&S.target!==u&&S.key.length===1&&!S.ctrlKey&&!S.metaKey)u.focus()},I=()=>{p=u.value,y()},J=(S)=>{if(l&&!(S.relatedTarget instanceof Node&&o.contains(S.relatedTarget)))b()},ee=()=>{B(s,n.label),s.hidden=!n.label;let S=n.options.find((T)=>T.id===n.value);if(B(a,S?.label??n.placeholder??"Select"),a.dataset.empty=S?"false":"true",i.disabled=Boolean(n.disabled),l)y()};return i.addEventListener("click",ae),i.addEventListener("keydown",ce),m.addEventListener("keydown",j),u.addEventListener("input",I),o.addEventListener("focusout",J),ee(),{update:(S)=>{n={...n,...S},ee()},dispose:()=>{b(),i.removeEventListener("click",ae),i.removeEventListener("keydown",ce),m.removeEventListener("keydown",j),u.removeEventListener("input",I),o.removeEventListener("focusout",J),o.remove()}}};var As=(e,t,n)=>{D(L);let r=t,o=fe("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=x("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(xe("check",12));let i=x("span","oc-sdk-check-text"),a=x("span","oc-sdk-check-label"),p=x("span","oc-sdk-check-desc");i.append(a,p),o.append(s,i),e.append(o);let f=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=Boolean(r.disabled),B(a,r.label),B(p,r.description),p.hidden=!r.description},l=()=>{if(!r.disabled)r.onChange(!r.checked)};return o.addEventListener("click",l),f(),{update:(m)=>{r={...r,...m},f()},dispose:()=>{o.removeEventListener("click",l),o.remove()}}},fr=(e,t)=>As(e,t,"checkbox"),Xt=(e,t)=>As(e,t,"switch");var mr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Ce(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let a=fe("oc-sdk-tab");a.setAttribute("role","tab");let p=i.id===n.activeId;a.setAttribute("aria-selected",p?"true":"false"),a.tabIndex=p?0:-1,a.dataset.id=i.id;let f=x("span");if(f.textContent=i.label,a.append(f),i.count!==void 0){let l=x("span","oc-sdk-tab-count");l.textContent=String(i.count),a.append(l)}a.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),r.append(a)}},s=(i)=>{let a=Re(i,"horizontal");if(!a)return;let p=ve(n.items,n.activeId,a);if(p&&p!==n.activeId){i.preventDefault(),n.onChange(p);let f=r.querySelector(`[data-id="${CSS.escape(p)}"]`);if(f instanceof HTMLElement)f.focus()}};return r.addEventListener("keydown",s),o(),{update:(i)=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var rt=(e,t)=>{Se(e,"data-tone",t&&t!=="neutral"?t:null)},_r=(e,t)=>{D(L);let n=t,r=x("span","oc-sdk oc-sdk-badge");e.append(r);let o=()=>{B(r,n.label),rt(r,n.tone)};return o(),{update:(s)=>{n={...n,...s},o()},dispose:()=>{r.remove()}}};var lc=0,Er=(e,t)=>{D(L);let n=t,r=`oc-sdk-list-${lc+=1}`,o=x("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,i=(m)=>`${r}-${m}`,a=(m)=>{s=m;for(let _ of Array.from(o.children))if(_ instanceof HTMLElement)_.dataset.active=_.id===i(m??"")?"true":"false";Se(o,"aria-activedescendant",m?i(m):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},p=(m,_)=>{let u=x("span",m);return u.textContent=_,u},f=()=>{if(Ce(o),Se(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(p("oc-sdk-list-empty",n.emptyText??"Nothing here")),a(null);return}for(let _ of n.items){let u=fe("oc-sdk-row");if(u.id=i(_.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",_.id===n.selectedId?"true":"false"),u.disabled=Boolean(_.disabled),u.tabIndex=-1,_.leading)u.append(p("oc-sdk-row-lead",_.leading));let g=x("span","oc-sdk-row-main");if(g.append(p("oc-sdk-row-title",_.title)),_.subtitle)g.append(p("oc-sdk-row-sub",_.subtitle));if(u.append(g),_.badge){let R=p("oc-sdk-badge",_.badge.label);rt(R,_.badge.tone),u.append(R)}if(_.meta)u.append(p("oc-sdk-row-meta",_.meta));u.addEventListener("click",()=>n.onSelect(_.id)),o.append(u)}let m=n.items.some((_)=>_.id===s&&!_.disabled);a(m?s:n.selectedId??null)},l=(m)=>{let _=Re(m);if(_){m.preventDefault(),a(ve(n.items,s,_));return}if((m.key==="Enter"||m.key===" ")&&s)m.preventDefault(),n.onSelect(s)};return o.addEventListener("keydown",l),f(),{update:(m)=>{n={...n,...m},f()},dispose:()=>{o.removeEventListener("keydown",l),o.remove()}}};var Sr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-empty"),o=x("h2","oc-sdk-empty-title"),s=x("p","oc-sdk-empty-body"),i=x("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let a=null,p=()=>{if(B(o,n.title),B(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){a?.dispose(),a=null;return}let f={label:n.action.label,onClick:n.action.onClick};if(a)a.update(f);else a=we(i,{...f,variant:"outline",size:"sm"})};return p(),{update:(f)=>{n={...n,...f},p()},dispose:()=>{a?.dispose(),a=null,r.remove()}}};var Tr=(e,t={})=>{D(L);let n=t,r=x("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=x("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=x("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",B(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(a)=>{n={...n,...a},i()},dispose:()=>{r.remove()}}};var gr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-banner"),o=x("div","oc-sdk-banner-text"),s=x("div","oc-sdk-banner-title"),i=x("div","oc-sdk-banner-body"),a=x("div","oc-sdk-banner-action");o.append(s,i),r.append(o,a),e.append(r);let p=null,f=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),B(s,n.title),B(i,n.body),i.hidden=!n.body,a.hidden=!n.action,!n.action){p?.dispose(),p=null;return}let l={label:n.action.label,onClick:n.action.onClick};if(p)p.update(l);else p=we(a,{...l,variant:"outline",size:"xs"})};return f(),{update:(l)=>{n={...n,...l},f()},dispose:()=>{p?.dispose(),p=null,r.remove()}}};var dc=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,hr=(e,t)=>{D(L);let n=t,r=x("div","oc-sdk oc-sdk-progress"),o=x("div","oc-sdk-progress-label"),s=x("span"),i=x("span","oc-sdk-progress-value"),a=x("span"),p=xe("check",14);i.append(p,a),o.append(s,i);let f=x("div","oc-sdk-progress-track");f.setAttribute("role","progressbar"),f.setAttribute("aria-valuemin","0"),f.setAttribute("aria-valuemax","100");let l=x("div","oc-sdk-progress-fill");f.append(l),r.append(o,f),e.append(r);let m=()=>{let _=dc(n.value);if(rt(l,n.tone),l.style.transform=`scaleX(${_/100})`,f.setAttribute("aria-valuenow",String(_)),n.label)f.setAttribute("aria-label",n.label);else f.removeAttribute("aria-label");B(s,n.label),B(a,`${_}%`);let u=_===100&&(!n.tone||n.tone==="neutral");Se(r,"data-done",u?"true":null),p.style.display=u?"":"none",o.hidden=!n.label};return m(),{update:(_)=>{n={...n,..._},m()},dispose:()=>{r.remove()}}};var Rs=(e)=>e.filter((t)=>!("separator"in t)),uc=0,yr=(e,t)=>{D(L);let n=t,r=`oc-sdk-menu-${uc+=1}`,o=x("div","oc-sdk oc-sdk-menu");e.append(o);let s=x("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,a=null,p=we(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)_();else u()}}),f=o.querySelector("button");f?.setAttribute("aria-haspopup","menu");let l=(h)=>{a=h,Ft(s,s,r,h)},m=()=>{Ce(s);for(let h of n.items){if("separator"in h){let y=x("div","oc-sdk-separator");y.dataset.labeled="false",s.append(y);continue}s.append(jt(r,"menuitem",h,{hover:()=>l(h.id),pick:()=>g(h.id)}))}l(Rs(n.items).some((h)=>h.id===a)?a:null)},_=()=>{let h=i;i=null,h?.(),a=null,f?.setAttribute("aria-expanded","false")},u=()=>{if(i||!f)return;m(),i=Bt(o,f,s,_),f.setAttribute("aria-expanded","true"),s.focus()},g=(h)=>{_(),f?.focus(),n.onSelect(h)},R=(h)=>{let y=Re(h);if(y)h.preventDefault(),l(ve(Rs(n.items),a,y));else if(h.key==="Enter"||h.key===" "){if(h.preventDefault(),a)g(a)}else if(h.key==="Escape")h.preventDefault(),_(),f?.focus()},k=(h)=>{if(i&&!(h.relatedTarget instanceof Node&&o.contains(h.relatedTarget)))_()};return s.addEventListener("keydown",R),o.addEventListener("focusout",k),{update:(h)=>{if(n={...n,...h},p.update({label:n.label,variant:n.variant,size:n.size}),i)m()},dispose:()=>{_(),s.removeEventListener("keydown",R),o.removeEventListener("focusout",k),p.dispose(),o.remove()}}};var A=er(),Pe=null,Wt=new Set;A.onReady((e)=>{Pe=e,tr(e,document.documentElement);for(let t of Wt)t(e)});A.onItem((e)=>{if(!Pe||Pe.item===e)return;Pe={...Pe,item:e};for(let t of Wt)t(Pe)});var Is=()=>{let[e,t]=X(Pe);return z(()=>{if(Wt.add(t),Pe)t(Pe);return()=>{Wt.delete(t)}},[]),e};var Os=(e,t)=>JSON.stringify({query:e,variables:t});class ie extends Error{kind;constructor(e,t){super(t);this.kind=e}}var G=async(e,t)=>{let n;try{n=await A.request({method:"POST",path:"/graphql",body:Os(e,t)})}catch(o){if(o instanceof w){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new ie("disconnected","Linear is not connected.");throw new ie("network",o.message||"Could not reach Linear.")}throw new ie("network",o instanceof Error?o.message:"Could not reach Linear.")}let r;try{r=JSON.parse(n.body)}catch{throw new ie("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new ie("disconnected","Linear sign-in expired.");if(r.errors?.length){let o=r.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new ie(s?"rate-limited":"graphql",o.message)}if(!r.data)throw new ie("graphql","Linear returned no data.");return r.data};var bs=`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,ks=`
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
`,Cs=`
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { id name type color position team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`;var ws=`
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
`;var ot=`
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }

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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
 } }
      comments(first: 100) { nodes { id body createdAt editedAt url user { id name displayName avatarUrl avatarBackgroundColor } parent { id } } }
      links: attachments(first: 50) { nodes { id title subtitle url sourceType metadata createdAt } }
      documents(first: 50) { nodes { id title url updatedAt } }
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
`;var vs=`
  query StatusCounts($filter: IssueFilter, $after: String) {
    issues(first: 250, after: $after, filter: $filter) {
      nodes { state { id name type color position } team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,Ps=`
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { id name type color position } team { id key } project { id name } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,st=(e)=>`
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
 }`).join(`
    `)}
  }
`;var Ms=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`;var Us=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`;var Ns=`
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
 } }
  }
`;var xr=`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
  }
`;var Ls=`
  mutation DocumentCreate($input: DocumentCreateInput!) {
    documentCreate(input: $input) { success document { id title url updatedAt } }
  }
`,Ds=`
  mutation DocumentUpdate($id: String!, $input: DocumentUpdateInput!) {
    documentUpdate(id: $id, input: $input) { success document { id title url updatedAt } }
  }
`;var $s=`
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
 } }
  }
`,Gs=`
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`;var Hs=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,ST={VIEWER:`
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

      description content priority createdAt
      members(first: 50) { nodes { id name displayName avatarUrl avatarBackgroundColor } }
      projectMilestones(first: 50) { nodes { id name description targetDate progress sortOrder } }
      lastUpdate { id health createdAt }
      projectUpdates(first: 5) { nodes { id body health createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
      documents(first: 50) { nodes { id title url updatedAt } }
    }
  }
`,PROJECT_STATUSES:`
  query ProjectStatuses {
    projectStatuses(first: 50) { nodes { id name type color position } }
  }
`,PROJECT_MILESTONES:`
  query ProjectMilestones($projectId: String!) {
    project(id: $projectId) {
      id
      projectMilestones(first: 250) { nodes { id name sortOrder } }
    }
  }
`,ISSUE_RELEASES:`
  query IssueReleases($id: String!) {
    issue(id: $id) { id releases(first: 250) { nodes { id name version } } }
    releaseSearch(first: 50) { id name version }
  }
`,CUSTOMERS:`
  query Customers {
    customers(first: 250) { nodes { id name } }
  }
`,ISSUE_FAVORITE:`
  query IssueFavorite($id: String!) {
    issue(id: $id) { id favorite { id } }
  }
`,SEMANTIC_ISSUES:`
  query SemanticIssues($query: String!) {
    semanticSearch(query: $query, types: [issue], maxResults: 10) {
      results { id type issue {
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
} }
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }

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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
 } }
      comments(first: 100) { nodes { id body createdAt editedAt url user { id name displayName avatarUrl avatarBackgroundColor } parent { id } } }
      links: attachments(first: 50) { nodes { id title subtitle url sourceType metadata createdAt } }
      documents(first: 50) { nodes { id title url updatedAt } }
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
`,ISSUES_BY_IDENTIFIER:st(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
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
      nodes { createdAt startedAt completedAt canceledAt estimate state { type } projectMilestone { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,PROJECT_ACTIVITY:`
  query ProjectActivity($id: String!) {
    project(id: $id) { id history(first: 25) { nodes { id createdAt entries } } }
  }
`,USERS:`
  query Users($filter: UserFilter) {
    users(first: 50, filter: $filter) { nodes { id name displayName avatarUrl avatarBackgroundColor } }
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
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
  parent { id identifier title }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { id type relatedIssue { id identifier title url state { id name type color position } } } }
  inRelations: inverseRelations(first: 5) { nodes { id type issue { id identifier title url state { id name type color position } } } }
 } }
  }
`,ISSUE_RELATION_CREATE:`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
  }
`,ISSUE_RELATION_UPDATE:`
  mutation IssueRelationUpdate($id: String!, $input: IssueRelationUpdateInput!) {
    issueRelationUpdate(id: $id, input: $input) { success }
  }
`,ISSUE_RELATION_DELETE:`
  mutation IssueRelationDelete($id: String!) {
    issueRelationDelete(id: $id) { success }
  }
`,ATTACHMENT_CREATE:`
  mutation AttachmentCreate($input: AttachmentCreateInput!) {
    attachmentCreate(input: $input) { success attachment { id url title } }
  }
`,CUSTOMER_NEED_CREATE:`
  mutation CustomerNeedCreate($input: CustomerNeedCreateInput!) {
    customerNeedCreate(input: $input) { success need { id } }
  }
`,DOCUMENT_CREATE:`
  mutation DocumentCreate($input: DocumentCreateInput!) {
    documentCreate(input: $input) { success document { id title url updatedAt } }
  }
`,DOCUMENT_UPDATE:`
  mutation DocumentUpdate($id: String!, $input: DocumentUpdateInput!) {
    documentUpdate(id: $id, input: $input) { success document { id title url updatedAt } }
  }
`,FAVORITE_CREATE:`
  mutation FavoriteCreate($input: FavoriteCreateInput!) {
    favoriteCreate(input: $input) { success favorite { id } }
  }
`,FAVORITE_DELETE:`
  mutation FavoriteDelete($id: String!) {
    favoriteDelete(id: $id) { success }
  }
`,ISSUE_REMINDER:`
  mutation IssueReminder($id: String!, $reminderAt: DateTime!) {
    issueReminder(id: $id, reminderAt: $reminderAt) { success }
  }
`,PROJECT_CREATE:`
  mutation ProjectCreate($input: ProjectCreateInput!) {
    projectCreate(input: $input) { success project { id name url } }
  }
`,PROJECT_EDIT:`
  mutation ProjectEdit($id: String!, $input: ProjectUpdateInput!) {
    projectUpdate(id: $id, input: $input) { success }
  }
`,MILESTONE_CREATE:`
  mutation MilestoneCreate($input: ProjectMilestoneCreateInput!) {
    projectMilestoneCreate(input: $input) { success }
  }
`,MILESTONE_EDIT:`
  mutation MilestoneEdit($id: String!, $input: ProjectMilestoneUpdateInput!) {
    projectMilestoneUpdate(id: $id, input: $input) { success }
  }
`,MILESTONE_DELETE:`
  mutation MilestoneDelete($id: String!) {
    projectMilestoneDelete(id: $id) { success }
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
`,NOTIFICATIONS_MARK_READ:Hs(["n1","n2"])};var Ae=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ie&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ie&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},pc=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),js=(e,t)=>Po((n,r)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&pc(r)&&r.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...r,issues:r.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof r==="object"&&r!==null&&r.id===e){let{team:o,...s}=t;return{...r,...s}}return r}),fc=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new ie("graphql","Linear did not save the change.");return e.issueUpdate.issue},ze=async(e,t)=>{let n=js(e.id,t.patch);try{let r=fc(await G(Ns,{id:e.id,input:t.input}));if(js(e.id,r),Be(`issue:${e.identifier}`),"stateId"in t.input)q("children:");if("projectMilestoneId"in t.input||"projectId"in t.input)q("issues:"),q("view-issues:"),q("milestone-counts:");if("parentId"in t.input)q("issues:"),q("view-issues:"),q("children:");if(["releaseIds","addedReleaseIds","removedReleaseIds"].some((o)=>(o in t.input)))q("extras:"),q("issue-releases:");return r}catch(r){throw n(),r}};var Fs=async(e)=>{let t=await G($s,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new ie("graphql","Linear did not create the issue.");return q("issues:"),q("view-issues:"),t.issueCreate.issue};var Bs=async(e,t)=>{let n=await G(Ls,{input:{issueId:e.id,...t}});if(!n.documentCreate.success)throw new ie("graphql","Linear did not create the document.");return Be(`issue:${e.identifier}`),n.documentCreate.document},Vs=async(e,t,n)=>{let r=await G(Ds,{id:t,input:n});if(!r.documentUpdate.success)throw new ie("graphql","Linear did not update the document.");return Be(`issue:${e.identifier}`),Be(`document:${t}`),r.documentUpdate.document};var Xs=async(e,t)=>{if(!(await G(Gs,{input:{issueId:e.id,body:t}})).commentCreate.success)throw new ie("graphql","Linear did not save the comment.");Be(`issue:${e.identifier}`)};var mc=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return typeof t.id==="string"&&typeof t.identifier==="string"&&typeof t.body==="string"},_c=(e)=>Array.isArray(e?.drafts)?e.drafts.filter(mc):[],Ws=async(e)=>{let t=await le(A,"GET","/drafts",{query:{directory:e},name:"Linear+"});return t.ok===!1?[]:_c(t)},Ks=async(e,t)=>{let n=await G(st([e.identifier])),r=Object.values(n).find((o)=>o!==null);if(!r)throw Error(`${e.identifier} was not found in Linear.`);await Xs(r,t),await le(A,"POST","/drafts",{body:{id:e.id,action:"posted"},name:"Linear+"})},zs=async(e)=>(await le(A,"POST","/drafts",{body:{id:e.id,action:"discard"},name:"Linear+"})).ok!==!1;var de=(e,t="inline-flex")=>(n)=>{let r=wo(e,n);return E("span",{ref:r,style:{display:t}},void 0,!1,void 0,this)},me=de(we),KT=de(Vt),qs=de(ur,"block"),zT=de(pr,"block"),qT=de(mr),JT=de(yr),YT=de(_r),Kt=de(Tr),Ar=de(gr,"block"),QT=de(Sr,"block"),Js=de(hr,"block"),ZT=de(Er,"block"),eg=de(fr),tg=de(Xt),ng=de(Xt,"block"),rg=de(Vt,"block");var Ys=({draft:e,onDone:t})=>{let[n,r]=X(!1),[o,s]=X(e.body),[i,a]=X(null),p=async()=>{a("post");try{await Ks(e,o),await H(A,"success",`Posted the summary on ${e.identifier}`),t()}catch(l){await H(A,"error",`Could not post on ${e.identifier}: ${Ae(l)}`),a(null)}},f=async()=>{if(a("discard"),await zs(e))t();else await H(A,"error","Could not discard the draft. Try again."),a(null)};return E("div",{class:"lin-status-draft","data-draft":e.id,children:[E("div",{class:"lin-status-line lin-status-line--wrap",role:"button",tabIndex:0,"aria-expanded":n,onClick:()=>r(!n),onKeyDown:(l)=>{if(l.key==="Enter")r(!n)},children:[E("span",{class:"lin-status-label",title:e.sessionTitle,children:["Summary ready for ",E("span",{class:"sui-mono lin-status-ref",children:e.identifier},void 0,!1,void 0,this)]},void 0,!0,void 0,this),E("span",{class:"lin-status-actions",onClick:(l)=>l.stopPropagation(),children:[E(me,{label:"Post",size:"xs",loading:i==="post",disabled:i!==null||!o.trim(),onClick:()=>{p()}},void 0,!1,void 0,this),E(me,{label:"Discard",variant:"ghost",size:"xs",loading:i==="discard",disabled:i!==null,onClick:()=>{f()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),n&&E(qs,{value:o,onChange:s,multiline:!0,rows:5,disabled:i!==null},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Ec="plan",Sc=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["id","directory","sessionDirectory","sessionId","identifier","sessionTitle"].every((n)=>typeof t[n]==="string")&&typeof t.createdAt==="number"},Qs=(e)=>Array.isArray(e?.handoffs)?e.handoffs.filter(Sc):[];var Zs=(e,t)=>{if(t&&(t.archivedAt!==null||t.activity==="running"||t.activity==="retrying"))return!1;return e.plan||t?.agent===Ec},Tc=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,gc=1e5,ei=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),ti=(e,t,n)=>{let r=ei(t.trim()).trim(),o=n?`${r}

**Full plan:** [Read the full plan document](${n})`:r,s=(e??"").replace(Tc,"").trimEnd(),i=`---
## Plan

${o}`,a=s?`${s}

${i}`:i;return a.length>gc?null:a};var zt=6500,ni=(e)=>e.length>zt,hc=(e)=>{if(e.length<=zt)return e;let t=e.slice(0,zt-1),n=t.lastIndexOf(`

`),r=t.lastIndexOf(" "),o=n>zt/2?n:r;return`${t.slice(0,o>0?o:t.length).trimEnd()}…`},ri=(e)=>hc(ei(e.trim()).trim());var it=(e)=>`${e.id}@${e.createdAt}`,oi="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var Tg=new RegExp("```linear-plan[^\\n]*\\n([\\s\\S]*?)```","g");var yc=(e,t)=>typeof e==="string"?e.replace(/\s+/g," ").trim().slice(0,t):"";var Rr=(e,t)=>{if(e===null||t.length===0)return null;let n=t[0];for(let r of t)if(Math.abs(r-e)<Math.abs(n-e)||Math.abs(r-e)===Math.abs(n-e)&&r>n)n=r;return n};var si=(e,t,n)=>[e.description,`Split out of ${t} by the plan in "${yc(n,120)}". Created by Linear+.`].filter(Boolean).join(`

---

`),ii=120000,qt=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["sessionId","identifier","directory","sessionTitle","state"].every((n)=>typeof t[n]==="string")&&typeof t.extras==="object"&&t.extras!==null&&Array.isArray(t.extras.issues)},ai=(e,t)=>{let n=[];if(e.estimateSet!==void 0&&e.estimateSet!==null)n.push(`set the estimate of ${e.identifier} to ${t(e.estimateSet)}`);let r=e.created??[];if(r.length)n.push(`created ${r.length===1?r[0]:`${r.slice(0,-1).join(", ")} and ${r.at(-1)}`}, related to ${e.identifier}`);return n.length?n.join("; "):`nothing to change on ${e.identifier}`};var at=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let r=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...r?{}:{year:"numeric"}})},ci=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let r=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-r)/86400000)};var ct=(e)=>`${Math.floor(Math.max(0,Math.min(1,e))*100)}%`,Jt={onTrack:"On track",atRisk:"At risk",offTrack:"Off track"},Yt={onTrack:"success",atRisk:"warning",offTrack:"error"},xc={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},Ir=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return xc[e]??String(e);return String(e)};var Qt=(e)=>e===0?5:e;var li=["triage","backlog","unstarted","started","completed","canceled","duplicate"],di=(e,t)=>li.indexOf(e.type)-li.indexOf(t.type)||e.position-t.position,Or=(e)=>`${e.type}|${e.name}`;var Ac=(e)=>[...e??[]].sort(di);var Rc=(e,t,n=e)=>{let r=t?.trim().toLowerCase();return(r?n.find((o)=>o.name.trim().toLowerCase()===r):void 0)??e.find((o)=>/^in progress$/i.test(o.name.trim()))??e.find((o)=>/progress|doing|working|development|started/i.test(o.name))??e.find((o)=>!/block|hold|pause|wait|stuck/i.test(o.name))??e[0]??null},ui=(e)=>/plan/i.test(e.name),Ic=(e)=>Ac(e).filter((t)=>t.type==="started"&&!ui(t)),pi=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!ui(e.state))return null;return Rc(Ic(t),n)};var Oc={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},bc=(e)=>{let t=e?Oc[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]},br=(e)=>bc({issueEstimationType:e.issueEstimationType??"notUsed",issueEstimationAllowZero:e.issueEstimationAllowZero??!1,issueEstimationExtended:e.issueEstimationExtended??!1});var je=async(e)=>{try{let t=await A.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},kr=async(e,t)=>{try{return await A.storage.set(e,t),!0}catch{return!1}},mi=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),_i=async(e)=>{let t=await je(`map:${e}`);return mi(t)?t:null},Zt=async(e,t)=>{let n=await kr(`map:${e}`,t);return await wr(),n},Ei=async(e)=>{try{await A.storage.delete(`map:${e}`)}catch{}wr()},Cr=async(e)=>{let t=await je(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},Si=async(e,t)=>{let n=await Cr(e);if(n?.host!==t.host||n.path!==t.path)await kr(`repo:${e}`,t)},Ti=async()=>await je("pref:start-moves")!==!1;var gi=async()=>await je("pref:assign-me")===!0;var hi=async(e)=>{let t=await je(`pref:start-state:${e}`);return typeof t==="string"?t:null},yi=(e,t)=>kr(`pref:start-state:${e}`,t);var kc=["planAgent","planModel","buildAgent","buildModel","aiReviewers"],Cc=async()=>{let e=await je("pref:agents"),t={};for(let n of kc){let r=e?.[n];if(typeof r==="string"&&r.trim())t[n]=r.trim()}if(e?.reviewMode==="mr"||e?.reviewMode==="auto")t.reviewMode=e.reviewMode;if(e?.finishComments==="draft")t.finishComments="draft";if(e?.postPlan===!0)t.postPlan=!0;return t};var wr=async(e={})=>{let t=[];try{t=await A.storage.keys()??[]}catch{return}let n={};for(let s of t.filter((i)=>i.startsWith("map:"))){let i=await je(s);if(mi(i)&&i.directory)n[i.directory]=i}let r=await Cc(),o=Object.keys(r).length>0;if(e.allowEmpty===!1&&Object.keys(n).length===0&&!o)return;await le(A,"PUT","/config",{body:o?{directories:n,defaults:r}:{directories:n},name:"Linear+"})},fi=!1,xi=async()=>{if(fi)return;fi=!0,await wr({allowEmpty:!1})};var vr=(e)=>e.replace(/\/+$/,""),Ai=async(e)=>{if(!e)return null;try{let t=vr(e),n=(await A.listProjects())?.projects??[],r=n.find((o)=>vr(o.directory)===t);if(r)return r;for(let o of n)if(((await A.listWorktrees(o.id))?.worktrees??[]).some((i)=>vr(i.directory)===t))return o}catch{}return null};var Ri=async(e)=>{try{await A.openSession(e)}catch{}};var Ii=async(e)=>{let t=await le(A,"GET","/handoffs",{query:{directory:e},name:"Linear+"});if(t.ok===!1)return[];let n=Qs(t);if(!n.length)return n;let r=[];try{let o=await Ai(e);if(o)r=(await A.listSessions(o.id))?.sessions??[]}catch{}return n.filter((o)=>Zs(o,r.find((s)=>s.id===o.sessionId)))},Oi=async(e)=>(await le(A,"POST","/handoffs",{body:{id:e,action:"dismiss"},name:"Linear+"})).ok!==!1,bi=async(e)=>{let t=await le(A,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{},...e.model?{model:e.model}:{},...e.planText?{planText:e.planText}:{}},name:"Linear+"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear+ service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},ki=async(e)=>{let t=await le(A,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier,...e.planText?{planText:e.planText}:{}},name:"Linear+"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear+ service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1,lead:t.lead===!0}};var Ci=async(e)=>{let t=await le(A,"GET","/handoffs",{query:{directory:e},name:"Linear+"}),n=t.ok===!1?[]:t.extras;return Array.isArray(n)?n.filter(qt):[]},wi=async(e)=>{let t=await le(A,"GET","/extras",{query:{sessionId:e},name:"Linear+"});return t.ok!==!1&&qt(t.extras)?t.extras:null},qe=async(e)=>{let t=await le(A,"POST","/handoffs",{body:e,name:"Linear+"});if(t.ok===!1)return null;if(e.action==="claim-extras"&&t.claimed!==!0)return null;return qt(t.state)?t.state:null};var Pr=new Set,en=async(e,t)=>{if(Pr.has(e.sessionId))return null;Pr.add(e.sessionId);try{let n=await qe({sessionId:e.sessionId,action:"claim-extras"});if(!n)return null;let r=n.estimateDone===!0,o=n.estimateSet??null,s=[...n.created??[]],i=(a)=>String(a);try{let a=(await G(ot,{id:n.identifier})).issue,p=br(a.team);if(i=(m)=>Ir(m,a.team.issueEstimationType)??String(m),!r){let m=a.estimate===null?Rr(n.extras.estimate,p):null;if(m!==null)await ze(a,{input:{estimate:m},patch:{estimate:m}}),o=m;r=!0}let f=t&&await gi().catch(()=>!1)?t:null;for(let m of n.extras.issues.slice(s.length)){let _=Rr(m.estimate,p),u=await Fs({teamId:a.team.id,title:m.title,description:si(m,a.identifier,n.sessionTitle),...a.project?{projectId:a.project.id}:{},..._!==null?{estimate:_}:{},...f?{assigneeId:f}:{}});s.push(u.identifier),await G(xr,{input:{issueId:u.id,relatedIssueId:a.id,type:"related"}})}return{state:await qe({sessionId:n.sessionId,action:"extras-done",estimateDone:r,estimateSet:o,created:s})??{...n,state:"done",estimateDone:r,estimateSet:o,created:s},label:i}}catch(a){let p=Ae(a);return{state:await qe({sessionId:n.sessionId,action:"extras-failed",estimateDone:r,estimateSet:o,created:s,error:p})??{...n,state:"failed",estimateDone:r,estimateSet:o,created:s,error:p},label:i}}}finally{Pr.delete(e.sessionId)}};var vc=5,tn=null,Pc=new Map;var vi=(e,t)=>{let n=Pc.get(t);if(n!==void 0)return n;let r=tn?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=r.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(r.length+1)},Pi=()=>tn?.viewer.id??null;var Mc=async()=>{let e=new Map,t=null;for(let n=0;n<vc;n+=1){let r=await G(Cs,{after:t});for(let{team:o,...s}of r.workflowStates.nodes){let i=e.get(o.id)??[];i.push(s),e.set(o.id,i)}if(!r.workflowStates.pageInfo.hasNextPage)break;t=r.workflowStates.pageInfo.endCursor}for(let n of e.values())n.sort((r,o)=>r.position-o.position);return e},Mi=async()=>{let[e,t,n]=await Promise.all([G(bs).then((r)=>r.viewer),G(ks).then((r)=>r.teams.nodes),Mc()]);return t.sort((r,o)=>r.name.localeCompare(o.name)),tn={viewer:e,teams:t,teamsById:new Map(t.map((r)=>[r.id,r])),myTeamIds:new Set(e.teams?.nodes.map((r)=>r.id)??[]),statesByTeam:n},tn},Ui="workspace",Mr=(e=!1)=>Ne(Ui,Mi,e),Ni=()=>ge(Ui,Mi);var Ur=async(e,t,n=!1,r)=>{let{plan:o,isPlan:s}=await ki({source:t,identifier:e.identifier,...r?{planText:r}:{}});if(!s&&!n)throw Error(oi);let i=(await G(ot,{id:e.identifier})).issue,a=`${e.identifier} plan: ${i.title}`.slice(0,200),p=i.documents?.nodes.find((_)=>i.description?.includes(_.url))??i.documents?.nodes.find((_)=>_.title===a),f=ni(o)?await(p?Vs(i,p.id,{title:a,content:o}):Bs(i,{title:a,content:o})):null,l=f?ri(o):o,m=ti(i.description,l,f?.url);if(m===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);return await ze(i,{input:{description:m},patch:{description:m}}),{document:f}},Nr=(e)=>({sessionId:e.sessionId,directory:e.sessionDirectory,title:e.sessionTitle,agent:null,inWorktree:!0,updatedAt:e.createdAt}),Uc=async(e,t,n)=>{let r=!1,o=!1;if(n.post){let l=await Ur(e,t,n.force,n.planText);r=!0,o=Boolean(l.document)}let s=await wi(t.sessionId).catch(()=>null);if(s&&(s.state==="pending"||s.state==="claimed"))await en(s,Pi()).catch(()=>null);let i=await bi({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force,...n.model?{model:n.model}:{},...n.planText?{planText:n.planText}:{}}),a=n.state??pi(e,e.team.states.nodes,n.lastState),p=!1,f=null;if(n.move&&a)try{await ze(e,{input:{stateId:a.id},patch:{state:a}}),p=!0}catch(l){f=Ae(l)}return{sessionId:i.sessionId,target:a,moved:p,moveError:f,posted:r,postedDocument:o}},Li=async(e)=>{let t=(await G(ot,{id:e.identifier})).issue,[n,r]=await Promise.all([Ti().catch(()=>!0),hi(t.team.id).catch(()=>null)]),o=await Uc(t,Nr(e),{move:n,post:e.postPlan===!0,lastState:r});if(o.moved&&o.target)yi(t.team.id,o.target.name).catch(()=>{return});return{...o,issue:t}};var Di=({identifier:e,source:t,label:n="Write Plan",doneLabel:r="Plan Written",size:o="sm",variant:s="outline",disabled:i,onBusy:a})=>{let[p,f]=X(!1),[l,m]=X(!1),_=async()=>{f(!0),a?.(!0);try{let u=await Ur({identifier:e},t);m(!0),q("issue"),await H(A,"success",u.document?`Added a concise plan to ${e}, with the full plan in a linked document`:`Added the plan to ${e}`)}catch(u){await H(A,"error",`Could not add the plan to ${e}: ${Ae(u)}`)}finally{f(!1),a?.(!1)}};return E("span",{class:"lin-inline",title:`Adds the plan from ${t.title} to the end of ${e}'s description and starts nothing. A plan added before is replaced.`,children:E(me,{label:l?r:n,variant:s,size:o,loading:p,disabled:i||p,onClick:()=>{_()}},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var $i=({handoff:e,onDone:t})=>{let[n,r]=X(null),o=async()=>{r("build");try{let i=await Li(e);if(i.moveError)await H(A,"error",`Build started, but ${e.identifier} was not moved: ${i.moveError}`);if(await H(A,"success",`${i.postedDocument?"Added a concise plan and full plan document to the issue and started":i.posted?"Added the plan to the issue and started":"Started"} a build for ${e.identifier}${i.moved?` and moved it to ${i.target.name}`:""}`),i.moved)q("status-");t(),await Ri(i.sessionId)}catch(i){await H(A,"error",`Could not start the build: ${Ae(i)}`),r(null)}},s=async()=>{if(r("dismiss"),await Oi(e.id))t();else await H(A,"error","Could not dismiss the plan. Try again."),r(null)};return E("div",{class:"lin-status-draft","data-handoff":e.id,children:E("div",{class:"lin-status-line lin-status-line--wrap lin-status-line--static",children:[E("span",{class:"lin-status-label",title:e.sessionTitle,children:["Plan ready for ",E("span",{class:"sui-mono lin-status-ref",children:e.identifier},void 0,!1,void 0,this)]},void 0,!0,void 0,this),E("span",{class:"lin-status-actions",children:[E(me,{label:e.postPlan?"Write Plan and Build":"Start Build",size:"xs",loading:n==="build",disabled:n!==null,onClick:()=>{o()}},void 0,!1,void 0,this),E(Di,{identifier:e.identifier,source:Nr(e),size:"xs",disabled:n!==null&&n!=="plan",onBusy:(i)=>r(i?"plan":null)},void 0,!1,void 0,this),E(me,{label:"Dismiss",variant:"ghost",size:"xs",loading:n==="dismiss",disabled:n!==null,onClick:()=>{s()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this)};var Gi={state:{type:{nin:["completed","canceled","duplicate"]}}};var nn=(e,t,n=!1)=>{let r=[];if(e.length){let o=[...e].sort();r.push({team:n?{or:[{id:{in:o}},{ancestors:{some:{id:{in:o}}}}]}:{id:{in:o}}})}if(t.length)r.push({project:{id:{in:[...t].sort()}}});if(!r.length)return null;return r.length===1?r[0]:{or:r}},Lr=(...e)=>{let t=e.filter((n)=>Boolean(n));return t.length===1?t[0]:{and:t}},rn={assigned:{assignee:{isMe:{eq:!0}}},created:{creator:{isMe:{eq:!0}}},subscribed:{subscribers:{some:{isMe:{eq:!0}}}}};var Hi=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let o=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:null},ji=([e,t,n])=>{let r=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*r(e)+0.7152*r(t)+0.0722*r(n)},Nc=(e,t)=>{let[n,r]=[ji(e),ji(t)].sort((o,s)=>s-o);return(n+0.05)/(r+0.05)};var Fi=(e,t)=>{let n=Hi(e),r=Hi(t);if(!n||!r||Nc(n,r)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Bi=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),Lc=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),r=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${r.toFixed(2)}z`},Dr=({type:e,color:t,size:n=14,fill:r,teamId:o,stateId:s})=>{let i=t||"currentColor",a=$e(()=>Fi(i,Bi()),[i,Bi()]),p={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),E("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return E("svg",{...p,children:E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return E("svg",{...p,children:E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let f=r??(o&&s?vi(o,s):0.5);return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:a,"stroke-width":"1.5"},void 0,!1,void 0,this),E("path",{d:Lc(f),fill:a},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),E("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return E("svg",{...p,children:[E("circle",{cx:"7",cy:"7",r:"6.25",fill:a},void 0,!1,void 0,this),E("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}};var Dc="open-target",$c="ext:linear-dashboard";var $r=async(e)=>{try{await A.storage.set(Dc,{...e,at:Date.now()})}catch{return!1}try{return await A.openSurface($c),!0}catch{return!1}};var Vi=new Map,Xi=(e)=>{for(let t of e)Vi.set(t.id,t);return e},Wi=(e)=>Vi.get(e);var on=async(e)=>{if(!e.length)return[];let t=await G(ws,{after:null,filter:{id:{in:[...e].sort()}}});return Xi(t.projects.nodes)},Ki=async(e)=>{let t=await G(Us,{term:e});return Xi(t.searchProjects.nodes)};var sn=(e)=>{let t=e.length?`projects:${[...e].sort().join(",")}`:null;return ge(t,()=>on(e))};var Gc={state:{type:{in:["triage","unstarted","started"]}}},Hc=4,jc=async(e)=>{let t=Lr(Gc,e),n=[],r=null;for(let o=0;o<Hc;o+=1){let s=await G(vs,{filter:t,after:r});if(n.push(...s.issues.nodes),!s.issues.pageInfo.hasNextPage)return{nodes:n,capped:!1};r=s.issues.pageInfo.endCursor}return{nodes:n,capped:!0}},Fc=async(e)=>{let t=await G(Ps,{filter:Lr(Gi,rn.assigned,e)});return{issues:t.issues.nodes,more:t.issues.pageInfo.hasNextPage}},zi=(e)=>ge(e?`status-counts:${JSON.stringify(e)}`:null,()=>jc(e)),lt=(e)=>ge(e?`status-mine:${JSON.stringify(e)}`:null,()=>Fc(e)),qi=(e)=>ge(e?`status-drafts:${e}`:null,()=>Ws(e)),Ji=(e)=>ge(e?`status-handoffs:${e}`:null,()=>Ii(e));var Yi=(e,t)=>({id:e.id,name:e.name,url:e.url,status:e.status.name,health:e.health,progress:e.progress,targetDate:e.targetDate,teams:e.teams.nodes.map((n)=>n.key),...t?{text:t}:{}});var Gr=(e)=>({identifier:e.identifier,title:e.title,state:e.state.name,url:e.url});var Bc=300000,Qi=new Map,Hr=async(e)=>{let t=JSON.stringify(e),n=`${e.directory}|${Object.keys(e).sort().join(",")}`,r=Qi.get(n);if(r&&r.signature===t&&Date.now()-r.at<Bc)return;Qi.set(n,{signature:t,at:Date.now()}),await le(A,"POST","/snapshot",{body:e,name:"Linear+"})},Zi=(e,t,n,r,o=[])=>({directory:e,teamKeys:o.map((s)=>s.key),teams:t.map((s)=>({id:s.id,key:s.key,name:s.name})),projects:n.map((s)=>Yi(s)),myIssues:r.map(Gr)});var Vc="(none)";var ea=(e,t,n)=>({directory:e||Vc,assignedIssues:t.map(Gr),...n?{orgKey:n}:{}});var ta=({directory:e,workspace:t,state:n})=>{let r=[...n.detection.teamIds,...n.detection.projectIds],o=r.filter((m)=>t.teamsById.has(m)),s=r.filter((m)=>!t.teamsById.has(m)),i=sn(s),a=lt(nn(o,s));z(()=>{xi()},[]);let p=o.map((m)=>t.teamsById.get(m)),f=(s.length===0||i.data!==void 0)&&a.data!==void 0,l=JSON.stringify([i.data?.map((m)=>[m.id,m.progress,m.health,m.status.name]),a.data?.issues.map((m)=>[m.identifier,m.state.name])]);return z(()=>{if(!n.detection.mapping||!f)return;Hr(Zi(e,p,i.data??[],a.data?.issues??[],t.teams))},[e,f,l,n.detection.mapping?.updatedAt]),null},na=({directory:e,orgKey:t})=>{let n=lt(rn.assigned),r=JSON.stringify(n.data?.issues.map((o)=>[o.identifier,o.title,o.state.name]));return z(()=>{if(n.data)Hr(ea(e,n.data.issues,t))},[e,r,t]),null};var Xc=60000,oa=(e)=>ge(e?`plan-extras:${e}`:null,()=>Ci(e)),ra=new Map,Wc=(e,t)=>e.state==="pending"||e.state==="claimed"&&t-(e.claimedAt??0)>ii,sa=({directory:e,viewerId:t})=>{let n=oa(e);return z(()=>{let r=setInterval(()=>{if(document.visibilityState==="visible")n.refresh()},Xc);return()=>clearInterval(r)},[e]),z(()=>{let r=Date.now();for(let o of n.data??[]){let s=`${o.sessionId}:${o.at}`;if(!Wc(o,r)||ra.get(s)==="done")continue;en(o,t).then(async(i)=>{if(!i)return;ra.set(s,i.state.state==="done"?"done":"failed");let a=ai(i.state,i.label);if(i.state.state==="done")await H(A,"success",`Plan for ${o.identifier}: ${a}.`);else await H(A,"error",`Plan for ${o.identifier}: ${i.state.error??"a write failed"}. ${i.state.created?.length||(i.state.estimateSet??null)!==null?`Done so far: ${a}. `:""}Retry is in Work Status.`);q("issue"),q("status-"),n.refresh()})}},[n.data,t]),null},ia=({directory:e})=>{let t=oa(e),[n,r]=X(null),o=(t.data??[]).filter((i)=>i.state==="failed");if(!o.length)return null;let s=async(i)=>{if(r(i.sessionId),!await qe({sessionId:i.sessionId,action:"retry-extras"}))await H(A,"error","Could not retry. Try again.");r(null),t.refresh()};return E(Te,{children:o.map((i)=>E("div",{class:"lin-status-draft","data-extras":i.sessionId,children:E("div",{class:"lin-status-line lin-status-line--wrap",children:[E("span",{class:"lin-status-label",title:i.error??"",children:["Plan for ",E("span",{class:"sui-mono lin-status-ref",children:i.identifier},void 0,!1,void 0,this),": estimate or issues not written"]},void 0,!0,void 0,this),E("span",{class:"lin-status-actions",children:E(me,{label:"Retry",size:"xs",loading:n===i.sessionId,disabled:n!==null,onClick:()=>{s(i)}},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},i.sessionId,!1,void 0,this))},void 0,!1,void 0,this)};var Kc={started:0,unstarted:1,triage:2,backlog:3},an=(e)=>Kc[e]??9,aa=(e)=>{let t=new Map;for(let{state:n,team:r}of e){let o=Or(n),s=t.get(o);if(s)s.count+=1;else t.set(o,{key:o,name:n.name,type:n.type,color:n.color,position:n.position,count:1,teamId:r.id,stateId:n.id})}return[...t.values()].sort((n,r)=>an(n.type)-an(r.type)||n.position-r.position||n.name.localeCompare(r.name))},zc=6,ca=(e,t=zc)=>({shown:e.slice(0,t),hidden:e.slice(t)}),qc=5,la=(e,t=qc)=>[...e].sort((n,r)=>an(n.state.type)-an(r.state.type)||Qt(n.priority)-Qt(r.priority)||r.updatedAt.localeCompare(n.updatedAt)).slice(0,t),Jc=(e,t=new Date)=>{let n=ci(e,t);if(n===null)return null;if(n<0)return"ended";if(n===0)return"ends today";return n===1?"1 day left":`${n} days left`},da=(e,t,n=new Date)=>[t?`${t} cycle ${e.number}`:`Cycle ${e.number}`,ct(e.progress),Jc(e.endsAt,n)].filter(Boolean).join(" · ");var ua=(e,t,n,r,o)=>{let s=[...n,...r],i=e?.activeProjectId;return{...e??{},directory:t,linearProjectIds:r,teamIds:n,activeProjectId:s.length===1?s[0]:i&&s.includes(i)?i:s[0]??"all",finishComments:e?.finishComments??"off",updatedAt:o}};var cn={source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null,work:null},Yc=(e)=>{let t=2166136261;for(let n=0;n<e.length;n+=1)t^=e.charCodeAt(n),t=Math.imul(t,16777619)>>>0;return t.toString(36)},dt=(e)=>e.replace(/\/+$/,""),pt=(e)=>dt(e).split("/").pop()??"",Qc=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,Zc=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),n=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(n)return{host:n[1].toLowerCase(),path:n[2]};let r=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(r)return{host:r[1].toLowerCase(),path:r[2]};return null},el=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],n=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],r=t??n;return r?Zc(r):null},tl=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let n=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(n)return{host:n[1].toLowerCase(),path:n[2]};return null},nl=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,Ea=async(e,t)=>{let n=dt(t),r=(await e.listProjects().catch(()=>{return}))?.projects??[],o=r.find((_)=>dt(_.directory)===n)??null,s=null;for(let _ of o?[o]:r){let g=((await e.listWorktrees(_.id).catch(()=>{return}))?.worktrees??[]).find((R)=>dt(R.directory)===n);if(g){o=_,s=g.branch||null;break}}if(!s)s=Qc(await e.readFile(".git/HEAD"));let i=o?`p:${o.id}`:`d:${Yc(n)}`,p=[...o?(await e.listSessions(o.id).catch(()=>{return}))?.sessions??[]:[]].sort((_,u)=>u.updatedAt-_.updatedAt),f=[],l=null;for(let _ of p){for(let u of _.links??[]){let g=u.url.match(nl)?.[1]?.toUpperCase();if(g&&!f.includes(g))f.push(g);if(!l&&u.kind==="change")l=tl(u.url)}for(let u of _.items){let g=u.data,R=typeof g?.identifier==="string"?g.identifier.toUpperCase():null;if(R&&!f.includes(R))f.push(R)}}let m=el(await e.readFile(".git/config"));if(m)await e.setRepo(i,m).catch(()=>{return});else m=await e.getRepo(i).catch(()=>null)??l;return{key:i,ocProjectId:o?.id??null,projectDirectory:o?dt(o.directory):n,directory:n,branch:s,repo:m,linkedIssues:f.slice(0,20)}},Sa=(e,t)=>{let n=[];for(let r of e.matchAll(/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6})-(\d+)(?![A-Za-z0-9])/g)){let o=r[1].toUpperCase(),s=`${o}-${r[2]}`;if(t.has(o)&&!n.includes(s))n.push(s)}return n},ut=(e)=>e.toLowerCase().replace(/[^a-z0-9]/g,""),pa=new Set(["api","app","apps","web","ui","service","services","svc","server","client","helm","chart","charts","terraform","tf","infra","argo","deploy","config","lib","libs","sdk","core","backend","frontend","mobile","ios","android","worker","shared","common","util","utils","tools","tool","kit","test","tests","docs","demo","example","examples","sandbox","extension","extensions"]),rl=(e)=>{let t=[],n=(i,a,p)=>{if(ut(i).length>=2&&!t.some((f)=>ut(f.text)===ut(i)))t.push({text:i,weight:a,label:p})},r=pt(e.projectDirectory),o=e.repo?pt(e.repo.path):"";if(n(r,1,`folder name "${r}"`),o)n(o,1,`repository "${o}"`);for(let i of[r,o].join("-").split(/[-_.\s]+/))if(i.length>=2&&!pa.has(i.toLowerCase()))n(i,0.8,`the word "${i}" in the repository name`);let s=e.repo?e.repo.path.split("/").slice(0,-1).reverse():[];for(let i of s)if(!pa.has(i.toLowerCase()))n(i,0.7,`repository group "${i}"`);return t},ol=(e,t)=>{let n=ut(e),r=ut(t);if(n.length<3||r.length<3)return 0;if(n===r)return 3;if(n.startsWith(r)||r.startsWith(n))return 2;if(n.includes(r)||r.includes(n))return 1;return 0};var fa=(e,t,n=1.4)=>{let r=null;for(let o of t)for(let s of e){let i=ol(o.name,s.text)*s.weight;if(o.key&&o.key.toLowerCase()===s.text.toLowerCase()&&o.key.length>=2)i=Math.max(i,2.5*s.weight);if(i>=n&&(!r||i>r.score))r={item:o,score:i,label:s.label}}return r},sl=(e)=>e.status.type!=="completed"&&e.status.type!=="canceled";var il=(e,t)=>{if(e.directory===e.projectDirectory)return null;let n=pt(e.directory),r=pt(e.projectDirectory),o=r&&n.toLowerCase().startsWith(`${r.toLowerCase()}-`)?n.slice(r.length+1):n,s=Sa(o,t)[0];return s&&o.toUpperCase().startsWith(s)?s:null},al=async(e,t,n)=>{let r=t.branch?Sa(t.branch,n).slice(0,3):[],o=il(t,n),s=t.linkedIssues.slice(0,1),i=[...new Set([...r,...o?[o]:[],...s])];if(!i.length)return null;let a=await e.issuesByIdentifier(i).catch(()=>[]);for(let p of i){let f=a.find((l)=>l.identifier===p);if(f)return{identifier:f.identifier,title:f.title,url:f.url,teamKey:f.team.key,projectName:f.project?.name??null,from:r.includes(p)?"branch":p===o?"worktree":"session"}}return null},ma=(...e)=>e.flatMap((t)=>Array.isArray(t)?t:t===void 0?[]:[t]).filter((t)=>typeof t==="string"),_a=(e)=>[...new Set(e)],cl=async(e,t,n)=>{let r;try{r=JSON.parse(t)}catch{return null}let o=ma(r.teams,r.team).map((i)=>n.find((a)=>a.id===i||a.key.toLowerCase()===i.toLowerCase())?.id).filter((i)=>Boolean(i)),s=[];for(let i of ma(r.projects,r.project)){let a=i.trim(),p=a.match(/linear\.app\/[^/]+\/project\/([^/?#]+)/i)?.[1]?.split("-").pop(),l=(await e.projectsByIds([p??a]).catch(()=>[]))[0]??(await e.searchProjects(a).catch(()=>[])).find((m)=>m.name.toLowerCase()===a.toLowerCase());if(l)s.push(l.id)}return o.length||s.length?{teamIds:_a(o),projectIds:_a(s)}:null},Ta=async(e,t,n)=>{let r=new Set(n.map((m)=>m.key.toUpperCase())),o=await al(e,t,r),s=(m)=>({...m,work:o}),i=await e.getMapping(t.key);if(i&&(i.linearProjectIds.length||i.teamIds.length))return s({source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:i.teamIds,projectIds:i.linearProjectIds,mapping:i});let a=await e.readFile(".linear.json");if(a){let m=await cl(e,a,n);if(m)return s({source:"config",inferred:!1,evidence:".linear.json",...m,mapping:null})}if(t.repo){let m=await e.repoAttachments(`${t.repo.host}/${t.repo.path}/`).catch(()=>[]),_=new Map;for(let R of m)if(R.issue)_.set(R.issue.id,{team:R.issue.team.id,project:R.issue.project?.id??null});let u=new Map;for(let{team:R}of _.values())u.set(R,(u.get(R)??0)+1);let g=[...u.entries()].sort((R,k)=>k[1]-R[1])[0];if(g&&g[1]>=3){let R=new Map;for(let{team:y,project:b}of _.values())if(y===g[0]&&b)R.set(b,(R.get(b)??0)+1);let k=[...R.entries()].sort((y,b)=>b[1]-y[1])[0],h=k&&k[1]>=3&&k[1]/g[1]>=0.6?[k[0]]:[];return s({source:"repo",inferred:!0,evidence:`${g[1]} issues with merge requests in ${pt(t.repo.path)}`,teamIds:[g[0]],projectIds:h,mapping:null})}}let p=rl(t),f=fa(p,n);if(f)return s({source:"name",inferred:!0,evidence:f.label,teamIds:[f.item.id],projectIds:[],mapping:null});let l=p[0]?.text;if(l){let m=(await e.searchProjects(l).catch(()=>[])).filter(sl),_=fa(p,m,2);if(_)return s({source:"name",inferred:!0,evidence:_.label,teamIds:[],projectIds:[_.item.id],mapping:null})}return s({source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null})};var ll=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,ga={listProjects:()=>A.listProjects(),listWorktrees:(e)=>A.listWorktrees(e),listSessions:(e)=>A.listSessions(e),readFile:(e)=>A.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:_i,getRepo:Cr,setRepo:Si,issuesByIdentifier:async(e)=>{let t=e.filter((r)=>ll.test(r));if(!t.length)return[];let n=await G(st(t));return Object.values(n).filter((r)=>Boolean(r))},repoAttachments:async(e)=>(await G(Ms,{url:e})).attachments.nodes,searchProjects:Ki,projectsByIds:on},jr=(e,t)=>e.teamsById.get(t)?.name??Wi(t)?.name??"Unknown",ha=(e,t)=>{let[n,r]=X(null),[o,s]=X(cn),[i,a]=X(!1),[p,f]=X(0),l=ye(0);z(()=>{a(!1)},[e]),z(()=>{if(!t)return;let y=++l.current;if(!e){r(null),s(cn),a(!0);return}(async()=>{let b=await Ea(ga,e),v=await Ta(ga,b,t.teams).catch(()=>cn);if(y!==l.current)return;let Z=v.teamIds.filter((j)=>t.teamsById.has(j)),ae=v.projectIds.length?await on(v.projectIds).catch(()=>[]):[],ce=v.projectIds.filter((j)=>ae.some((I)=>I.id===j));if(y!==l.current)return;r(b),s({...v,teamIds:Z,projectIds:ce}),a(!0)})()},[e,t,p]);let m=Oe(()=>f((y)=>y+1),[]),_=Oe(async(y,b)=>{if(!n)return!1;let v=ua(o.mapping,n.projectDirectory,y,b,Date.now());s((ae)=>({...ae,source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:y,projectIds:b,mapping:v}));let Z=await Zt(n.key,v);if(!Z)await H(A,"error","Could not save this folder's choice. It applies until you reload.");return Z},[n,o]),u=Oe(async()=>{if(!await _(o.teamIds,o.projectIds))return;let y=t?[...o.teamIds,...o.projectIds].map((b)=>jr(t,b)).join(", "):"";await H(A,"success",y?`Pinned ${y} to this folder`:"Pinned to this folder")},[_,o,t]),g=Oe(async()=>{if(!n)return;await Ei(n.key),m()},[n,m]),R=Oe((y)=>{if(!n||!o.mapping)return;let b={...o.mapping,activeProjectId:y,updatedAt:Date.now()};s((v)=>({...v,mapping:b})),Zt(n.key,b)},[n,o]),k=Oe(async(y)=>{if(!n||!o.mapping)return!1;let b={...o.mapping,...y,updatedAt:Date.now()};s((Z)=>({...Z,mapping:b}));let v=await Zt(n.key,b);if(!v)await H(A,"error","Could not save the setting. It applies until you reload.");return v},[n,o]),h=o.teamIds.length+o.projectIds.length>0;return{place:n,detection:o,settled:i,mapped:h,refresh:m,save:_,pin:u,clear:g,setActive:R,update:k}};var dl=3,ul=2,xa="refresh",Fr=new Set;A.onStatusControl((e)=>{if(e.id===xa)for(let t of Fr)t()});var pl=(e)=>{let t=[...e.detection.teamIds,...e.detection.projectIds],n=e.detection.mapping?.activeProjectId??t[0]??"all";return n==="all"||!t.includes(n)?t:[n]},ya=(e)=>e.targetDate?`target ${at(e.targetDate)}`:"no target date",fl=({projects:e})=>{if(e.length===1){let t=e[0],n=t.health?Yt[t.health]:void 0;return E("div",{class:"lin-status-block",children:[E(Js,{label:t.name,value:t.progress*100,tone:n},void 0,!1,void 0,this),E("div",{class:"sui-row sui-small sui-muted",children:[t.health&&E(On,{tone:Yt[t.health]},void 0,!1,void 0,this),E("span",{children:[t.health?Jt[t.health]:t.status.name,ya(t)].join(" · ")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}return E("div",{class:"lin-status-block",children:e.slice(0,dl).map((t)=>E("div",{class:"lin-status-project",title:`${t.name}: ${t.health?Jt[t.health]:t.status.name}, ${ya(t)}`,children:[E(On,{tone:t.health?Yt[t.health]:"muted"},void 0,!1,void 0,this),E("span",{class:"lin-ellipsis sui-grow",children:t.name},void 0,!1,void 0,this),E("span",{class:"sui-muted sui-small",children:ct(t.progress)},void 0,!1,void 0,this),E("span",{class:"sui-muted sui-small lin-status-date",children:t.targetDate?at(t.targetDate):""},void 0,!1,void 0,this)]},t.id,!0,void 0,this))},void 0,!1,void 0,this)},ml=(e,t,n)=>{let r=new Set(t.filter((o)=>e.teamsById.has(o)));for(let o of n)for(let s of o.teams.nodes)r.add(s.id);return[...r].map((o)=>e.teamsById.get(o)).filter((o)=>Boolean(o?.activeCycle))},_l=({issue:e,onOpen:t})=>E("div",{class:"lin-status-line",role:"button",tabIndex:0,"data-issue":e.identifier,title:`${e.identifier} ${e.title} (${e.state.name})`,onClick:t,onKeyDown:(n)=>{if(n.key==="Enter")t()},children:[E(Dr,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:13},void 0,!1,void 0,this),E("span",{class:"sui-mono sui-muted lin-status-key",children:e.identifier},void 0,!1,void 0,this),E("span",{class:"lin-ellipsis sui-grow",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ln=({children:e,action:t})=>E("div",{class:"sui-row",children:[E("span",{class:"sui-muted sui-grow",children:e},void 0,!1,void 0,this),t&&E(me,{label:t.label,variant:"outline",size:"xs",onClick:t.onClick},void 0,!1,void 0,this)]},void 0,!0,void 0,this),El=({directory:e,sessionId:t,workspace:n,state:r})=>{let o=pl(r),s=o.filter((I)=>n.teamsById.has(I)),i=o.filter((I)=>!n.teamsById.has(I)),a=nn(s,i),p=sn(i),f=zi(a),l=lt(a),m=qi(e),_=Ji(e),[u,g]=X(new Set),R=r.place?.key??"",k=ml(n,o,p.data??[]).slice(0,ul),h=$e(()=>ca(aa(f.data?.nodes??[])),[f.data]),y=$e(()=>la(l.data?.issues??[]),[l.data]),b=(m.data??[]).filter((I)=>!u.has(it(I))),v=(_.data??[]).filter((I)=>(!t||I.sessionId===t)&&!u.has(it(I))),Z=async(I)=>{if(!await $r({placeKey:R,issue:I}))await H(A,"info",`Open the Linear panel to see ${I}.`)},ae=i.length>0&&p.loading&&!p.data||f.loading&&!f.data||l.loading&&!l.data,ce=[p.error,f.error,l.error].find((I)=>I!==void 0&&I!==null),j=[p.data?.length?"project":"",k.length?"cycle":"",h.shown.length?"chips":"",y.length?"mine":"",v.length?"plans":"",b.length?"drafts":""].filter(Boolean);return E(Te,{children:[r.detection.inferred&&E("div",{class:"lin-status-hint sui-small",children:[E("span",{class:"sui-muted sui-grow lin-ellipsis",title:`Detected from ${r.detection.evidence}`,children:[Sl(n,r)," (detected from ",r.detection.evidence,")"]},void 0,!0,void 0,this),E(me,{label:"Pin",variant:"outline",size:"xs",onClick:()=>{r.pin()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),v.map((I)=>E($i,{handoff:I,onDone:()=>{g((J)=>new Set(J).add(it(I))),_.refresh()}},I.id,!1,void 0,this)),E(ia,{directory:e},void 0,!1,void 0,this),b.map((I)=>E(Ys,{draft:I,onDone:()=>{g((J)=>new Set(J).add(it(I))),m.refresh()}},I.id,!1,void 0,this)),p.data?.length?E(fl,{projects:p.data},void 0,!1,void 0,this):null,k.map((I)=>E("div",{class:"sui-small",children:da(I.activeCycle,k.length>1?I.key:null)},I.id,!1,void 0,this)),h.shown.length>0&&E("div",{class:"sui-row",children:[h.shown.map((I)=>E(Co,{children:[E(Dr,{type:I.type,color:I.color,teamId:I.teamId,stateId:I.stateId,size:12},void 0,!1,void 0,this),I.count," ",I.name]},I.key,!0,void 0,this)),h.hidden.length>0&&E("span",{class:"sui-muted sui-small",title:h.hidden.map((I)=>`${I.count} ${I.name}`).join(", "),children:["+",h.hidden.length," more"]},void 0,!0,void 0,this),f.data?.capped&&E("span",{class:"sui-muted sui-small",children:["counted the first ",f.data.nodes.length.toLocaleString("en-US")]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),y.length>0&&E("div",{class:"lin-status-block",children:[E("div",{class:"lin-subheading",children:["My issues",l.data?.more?" (first 50)":""]},void 0,!0,void 0,this),y.map((I)=>E(_l,{issue:I,onOpen:()=>{Z(I.identifier)}},I.id,!1,void 0,this))]},void 0,!0,void 0,this),ae&&!j.length&&E(Kt,{size:"sm",label:"Loading Linear"},void 0,!1,void 0,this),ce!==void 0&&!j.length&&E(Tl,{error:ce},void 0,!1,void 0,this),!ae&&ce===void 0&&!j.length&&E(ln,{children:"Nothing open for this folder in Linear."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Sl=(e,t)=>[...t.detection.teamIds,...t.detection.projectIds].map((n)=>jr(e,n)).join(", "),Tl=({error:e})=>E(Ar,{tone:"error",title:"Could not load Linear",body:e instanceof Error?e.message:String(e)},void 0,!1,void 0,this),Aa=()=>{let e=Is(),t=Ni(),n=e?.directory??null,r=ha(n,t.data),o=ye(null),[s,i]=X(!1);z(()=>{let l=o.current;if(!l)return;let m=new ResizeObserver(()=>{A.setHeight(Math.ceil(l.getBoundingClientRect().height)).catch(()=>{return})});return m.observe(l),()=>m.disconnect()},[]);let a=Oe(()=>{q(""),r.refresh(),Mr(!0).then(()=>H(A,"success","Linear refreshed"),()=>H(A,"error","Could not refresh Linear. Check the connection and try again."))},[r.refresh]),p=ye(a);p.current=a,z(()=>{let l=()=>p.current();return Fr.add(l),()=>{Fr.delete(l)}},[]),z(()=>{if(!e?.features?.statusControls){i(!1);return}let l=()=>A.setStatusControls([{kind:"button",id:xa,label:"Refresh"}]).then(()=>i(!0),()=>i(!1));return l(),A.onDirectory(()=>{l()})},[e?.features?.statusControls]),z(()=>{let l=setInterval(()=>{if(document.visibilityState!=="visible")return;q("status-"),q("projects:"),Mr(!0).catch(()=>{return})},60000);return()=>clearInterval(l)},[]);let f=(()=>{if(!e)return E(Kt,{size:"sm",label:"Loading"},void 0,!1,void 0,this);if(!n)return E(ln,{children:"Open a project to see its Linear work."},void 0,!1,void 0,this);if(t.error&&!t.data){let m=t.error instanceof ie?t.error:new ie("network",String(t.error));return m.kind==="disconnected"?E(ln,{action:{label:"Connect",onClick:()=>{A.oauthStart()}},children:"Linear is not connected."},void 0,!1,void 0,this):E(Ar,{tone:"error",title:"Could not load Linear",body:m.message,action:{label:"Retry",onClick:()=>t.refresh()}},void 0,!1,void 0,this)}if(!t.data||!r.settled)return E(Kt,{size:"sm",label:"Loading Linear"},void 0,!1,void 0,this);let l=E(na,{directory:n,orgKey:t.data.viewer.organization?.urlKey??null},void 0,!1,void 0,this);if(!r.mapped)return E(Te,{children:[l,E(ln,{action:{label:"Pick",onClick:()=>{gl(r.place?.key??"")}},children:"Pick a Linear project"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return E(Te,{children:[l,E(ta,{directory:n,workspace:t.data,state:r},void 0,!1,void 0,this),E(sa,{directory:n,viewerId:t.data.viewer.id},void 0,!1,void 0,this),E(El,{directory:n,sessionId:e.session?.id??null,workspace:t.data,state:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)})();return E("div",{class:"lin-status",ref:o,children:[f,!s&&e&&n&&r.settled&&E("div",{class:"lin-status-refresh",children:E(me,{label:"Refresh",variant:"ghost",size:"xs",onClick:a},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},gl=async(e)=>{if(!await $r({placeKey:e,view:"picker"}))await H(A,"info","Open the Linear panel to pick a project.")};mo(E(Aa,{},void 0,!1,void 0,this),document.getElementById("root"));})();

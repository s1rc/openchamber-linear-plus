(()=>{var N,vo,ai,xe,jt,lt,wo,st,Mo,Wt,Kt,ci,Xe=Symbol.for("pv"),dt={},ut=[],li=/^m(i|n|o|s|text|space)$/,zt=Array.isArray,Uo=ut.slice,we=Object.assign;function ve(e){e&&e.parentNode&&e.remove()}function it(e,t,r,o,n){var s={type:e,props:t,key:r,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Xe,__v:n||++vo,__i:-1,__u:0};return!n&&N.vnode&&N.vnode(s),s}function Ie(e){return e.children}function at(e,t){this.props=e,this.context=t,this.__g=0}function be(e,t){if(t==null)return e.__&&be(e.__,e.__i+1);for(var r;t<e.__k.length;t++)if((r=e.__k[t])&&r.__e)return r.__e;return typeof e.type!="function"||e.props.__P?null:be(e)}function di(e){var t,r=e.__v,o=r.__e,n=[],s=[],i=e.__P;i&&((t=we({constructor:Xe},r)).__v=r.__v+1,N.vnode&&N.vnode(t),qt(i,t,r,e.__n,i.namespaceURI,32&r.__u?[o]:null,n,o||be(r),32&r.__u,s),t.__v=r.__v,t.__.__k[t.__i]=t,$o(n,t,s),r.__=r.__e=null,t.__e!=o&&Po(t))}function Po(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),Po(e)}function ko(e){(8&e.__g||(e.__g|=8,xe.push(e),lt++))&&jt==N.debounceRendering||((jt=N.debounceRendering)||queueMicrotask)(No)}function No(){try{for(var e,t=1;xe.length;)xe.length>t&&xe.sort(wo),e=xe.shift(),t=xe.length,8&e.__g&&di(e)}finally{(lt=xe.length)&&(jt||queueMicrotask)(No)}}function Lo(e,t,r,o,n,s,i,c,p,_,d){var E,f,u,h,O,b,T=o.__k||ut,A=t.length;for(p=ui(r,t,T,p,A),E=0;E<A;E++)(u=r.__k[E])!=null&&(f=~u.__i&&T[u.__i]||dt,u.__i=E,b=qt(e,u,f,n,s,i,c,p,_,d),h=u.__e,(f.ref!=u.ref||8&f.__u)&&(f.ref&&Yt(f.ref,null,u,f),u.ref&&d.push(u.ref,u.__c||h,u)),O=O||h,4&u.__u?(p=Do(u,p,e,!f.__v),f.__e&&(f.__e=null)):typeof u.type=="function"&&b!==void 0?p=b:h&&(p=h.nextSibling),u.__u&=-21);return r.__e=O,p}function ui(e,t,r,o,n){var s,i,c,p,_,d,E,f,u,h=r.length,O=h,b=0,T=0,A=e.__k=Array(n);for(s=0;s<n;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=A[s]=it(null,i):zt(i)?i=A[s]=it(Ie,{children:i}):i.constructor===Xe&&i.__b?i=A[s]=it(i.type,i.props,i.key,i.ref,i.__v):A[s]=i,p=s+b,i.__=e,i.__b=e.__b+1,c=null,~(_=i.__i=pi(i,r,p,O))&&(O--,(c=r[_])&&(c.__u|=2)),c&&c.__v?(i.__u|=16,_==p-1?b--:_==p+1?b++:_!=p&&(_>p?b--:b++,T=1)):(~_||(n>h?b--:n<h&&b++),typeof i.type!="function"&&(i.__u|=4))):A[s]=null;if(T){for(d=[],E=[],s=0;s<n;s++)if((i=A[s])&&16&i.__u){for(b=0,f=d.length;b<f;)d[u=b+f>>1]<i.__i?b=u+1:f=u;d[b]=i.__i,E[s]=b+1}for(b=d.length;s--;)E[s]&&(E[s]==b?b--:A[s].__u|=4)}if(O)for(s=0;s<h;s++)!(c=r[s])||2&c.__u||(c.__e==o&&(o=be(c)),Jt(c,c));return o}function Do(e,t,r,o){var n,s,i,c;if(typeof e.type=="function"){if(e.props.__P)return t;if(n=e.__k)for(s=0;s<n.length;s++)n[s]&&(n[s].__=e,t=Do(n[s],t,r,!1));return t}for(t&&!t.parentNode&&(t=be(e))&&!t.parentNode&&(t=null),i=e.__e,c=t;c&&c.nodeType==8;)c=c.nextSibling;for(i!=c&&(!o&&r.moveBefore&&i.parentNode?r.moveBefore(i,t):r.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function pi(e,t,r,o){var n,{key:s,type:i}=e,c=t[r],p=c&&!(2&c.__u);if(c===null&&s==null||p&&s==c.key&&i==c.type)return r;if(o>(p?1:0)){for(n=r-1;n>=0;n--)if((c=t[n])&&!(2&c.__u)&&s==c.key&&i==c.type)return n;for(n=r+1;n<t.length;n++)if((c=t[n])&&!(2&c.__u)&&s==c.key&&i==c.type)return n}return-1}function Co(e,t,r){r==null&&(r=""),t[0]=="-"?e.setProperty(t,r):e[t]=r}function nt(e,t,r,o,n){var s,i;if(t=="style")if(typeof r=="string")e.style.cssText=r;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(t in o)r&&t in r||Co(e.style,t);if(r)for(t in r)o&&r[t]==o[t]||Co(e.style,t,r[t])}else if(t[0]=="o"&&t[1]=="n")typeof r!="function"&&(r=null),typeof o!="function"&&(o=null),(e.__e||(e.__e={}))[t]=r,r&&o||(i=Kt[t]||(Kt[t]=_i(t)),(e.__a||(e.__a={}))[t]=Wt,s=t!=(t=t.replace(Mo,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),r?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(n=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=r==null?"":r)}catch(c){}if(typeof r=="function")return;r==null||r===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&r==1?"":r)}}function _i(e){return function(t){var r=this.__e;if(r){if(r=r[e],t[st]==null)t[st]=Wt++;else if(t[st]<this.__a[e])return;return r(N.event?N.event(t):t)}}}function qt(e,t,r,o,n,s,i,c,p,_){var d,E,f,u,h,O,b,T,A,x,w,K,I,Q,Z,_e,te,W,m=t.type;if(t.constructor!==Xe)return null;128&r.__u&&(p=32&r.__u,d=r.__c.__z)&&(t.__u|=p,E=s=[],d.nodeType==8?c=ct(d,s):s.push(d),c=s[0]||c),(d=N.__b)&&d(t);e:if(typeof m=="function"){f=i.length;try{if(T=t.props,A=(d=m.prototype)&&d.render,x=(d=m.contextType)&&o[d.__c],w=d?x?x.props.value:d.__:o,(u=r.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(A?t.__c=u=new m(T,w):(t.__c=u=new at(T,w),u.constructor=m,u.render=Ei),x&&x.sub(u),u.state||(u.state={}),u.__n=o,u.__g|=8,u.__h=[],u.__k=[]),A&&(u.__s||(u.__s=u.state),m.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=we({},u.__s)),we(u.__s,m.getDerivedStateFromProps(T,u.__s)))),h=u.props,O=u.state,u.__v=t,r.__c){if(T!==h&&A&&!m.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(T,w),t.__v==r.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(T,u.__s,w)===!1){t.__v!=r.__v&&(u.props=T,u.state=u.__s,u.__g&=-9),t.__e=r.__e,t.__k=r.__k,t.__k.some(function(g){g&&(g.__=t)}),ut.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),c=be(r);break e}u.componentWillUpdate&&u.componentWillUpdate(T,u.__s,w),A&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(h,O,b)})}else A&&!m.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),A&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=w,u.props=T,u.__P=e,u.__g&=-5,K=N.__r,I=A?25:0;do u.__g&=-9,K&&K(t),d=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++I<25);A&&(ut.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(o=we({},o,u.getChildContext())),A&&r.__c&&u.getSnapshotBeforeUpdate&&(b=u.getSnapshotBeforeUpdate(h,O)),Q=d&&d.type===Ie&&d.key==null?d.props.children:d,T.__P&&(d=c,n=(e=T.__P).namespaceURI,p=s=null,r.props&&r.props.__P!=e&&(r.__k.some(function(g){g&&Jt(g,g)}),r.__k=null),c=r.__k?be(r,0):null),c=Lo(e,zt(Q)?Q:[Q],t,r,o,n,s,i,c,p,_),T.__P&&(t.__e=null,c=d),t.__u&=-161,E&&E.some(ve),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(g){if(i.length=f,t.__v=null,p||s)if(g&&g.then){if(t.__u|=128|p,s){for(~(te=s.indexOf(c||void 0))||(te=s.length);(W=s[te-1])&&W.nodeType==8;)te--;for(;te<s.length;te++)if(W=s[te])if(s[te]=null,Z){if(W==_e)break}else{if(W.nodeType!=8)break;W.data.startsWith("$s")&&(_e=ct(Z=W))}}if(!Z){for(;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;Z=c}(d=ct(Z=t.__c.__z||(t.__c.__z=Z)))?(t.__e=Z,c=d):t.__e=c,c=c&&c.nextSibling}else s&&s.some(ve);else t.__e=r.__e;t.__k||(t.__k=r.__k||[]),g&&g.then||Go(t),N.__e(g,t,r)}}else c=t.__e=fi(r.__e,t,r,o,n,s,i,p,_,e);return(d=N.diffed)&&d(t),c}function ct(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var r=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))r++;else if(e.data.startsWith("/$s")&&!--r)return e}t&&t.push(e)}}function Go(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(Go))}function $o(e,t,r){for(var o=0;o<r.length;)Yt(r[o++],r[o++],r[o++]);N.__c&&N.__c(t,e),e.some(function(n){try{e=n.__h,n.__h=[],e.some(function(s){s.call(n)})}catch(s){N.__e(s,n.__v)}})}function fi(e,t,r,o,n,s,i,c,p,_){var d,E,f,u,h,O,b,T,A=r.props||dt,{props:x,type:w}=t;if(w=="svg"?n="http://www.w3.org/2000/svg":w=="math"?n="http://www.w3.org/1998/Math/MathML":n||(n="http://www.w3.org/1999/xhtml"),s){for(d=0;d<s.length;d++)if((h=s[d])&&(w?h.localName==w:h.nodeType==3)){e=h,s[d]=null;break}}if(!e){if(T=_.ownerDocument||document,!w)return T.createTextNode(x);e=T.createElementNS(n,w,x.is?x:_),c&&(N.__m&&N.__m(t,s),c=!1),s=null}if(w){if(_=w=="template"&&e.content||e,s=w=="textarea"&&x.defaultValue!=null?null:s&&Uo.call(_.childNodes),!c&&s)for(A={},d=0;d<e.attributes.length;d++)A[(h=e.attributes[d]).name]=h.value;for(d in A)h=A[d],d=="dangerouslySetInnerHTML"?f=h:d=="children"||(d in x)||d=="value"&&("defaultValue"in x)||d=="checked"&&("defaultChecked"in x)||nt(e,d,null,h,n);for(d in x)h=x[d],d=="children"?u=h:d=="dangerouslySetInnerHTML"?E=h:d=="value"?O=h:d=="checked"?b=h:c&&typeof h!="function"||A[d]===h||nt(e,d,h,A[d],n);E?(c||f&&(E.__html==f.__html||E.__html==e.innerHTML)||(e.innerHTML=E.__html),t.__k=[]):(f&&(e.textContent=""),(w=="foreignObject"||n=="http://www.w3.org/1998/Math/MathML"&&li.test(w))&&(n="http://www.w3.org/1999/xhtml"),Lo(_,zt(u)?u:[u],t,r,o,n,s,i,s?s[0]:r.__k&&be(r,0),c,p),s&&s.some(ve)),c&&w!="textarea"||(d="value",w=="progress"&&O==null?e.removeAttribute(d):O==null||O===e[d]&&(w!="progress"||O)||nt(e,d,O,A[d],n),d="checked",b!=null&&b!=e[d]&&nt(e,d,b,A[d],n))}else A===x||c&&e.data==x||(e.data=x);return e}function Yt(e,t,r,o){try{typeof e=="function"?t?t.__x=e(t)||1:o&&(o=o.__c||o.__e)&&(t=o.__x)&&(o.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(n){N.__e(n,r)}}function Jt(e,t,r){var o,n,s,i;if(N.unmount&&N.unmount(e),!(o=e.ref)||o.current&&o.current!=e.__e||Yt(o,null,t,e),o=e.__c){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(c){N.__e(c,t)}o.__P=o.__n=null}if(o=e.__k)for(i=0;i<o.length;i++)o[i]&&Jt(o[i],t,typeof e.type!="function"||r&&!e.props.__P);!r&&(o=e.__c)&&(o=o.__z)&&(n=ct(o,s=[]))&&(o==e.__e&&s.some(ve),ve(n),ve(o)),r||ve(e.__e),e.__e=e.__c=e.__=null}function Ei(e,t,r){return this.constructor(e,r)}function Ho(e,t){var r,o,n,s;N.__&&N.__(e,t),t.nodeType==9&&(t=t.documentElement),o=(r=e&&32&e.__u)?null:t.__k,t.__k=it(Ie,{children:[e]}),n=[],s=[],qt(t,t.__k,o||dt,dt,t.namespaceURI,o?null:t.firstChild?Uo.call(t.childNodes):null,n,o?o.__e:t.firstChild,r,s),$o(n,t.__k,s),t.__k.props.children=null}N={__e:function(e,t,r,o){for(var n,s,i;t=t.__;)if((n=t.__c)&&!(1&n.__g)){n.__g|=4;try{if((i=(s=n.constructor)&&s.getDerivedStateFromError)&&n.setState(s.getDerivedStateFromError(e)),n.componentDidCatch&&(n.componentDidCatch(e,o||{}),i=1),i&&8&n.__g)return void(n.__g|=2)}catch(c){e=c}}throw lt=0,e}},vo=0,ai=function(e){return e!=null&&e.constructor===Xe},at.prototype.setState=function(e,t){var r=this.__s;r&&r!=this.state||(r=this.__s=we({},this.state)),typeof e=="function"&&(e=e(we({},r),this.props)),e&&(we(r,e),this.__v&&(t&&this.__k.push(t),ko(this)))},at.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),ko(this))},at.prototype.render=Ie,xe=[],lt=0,wo=function(e,t){return e.__v.__b-t.__v.__b},st=Symbol(),Mo=/(PointerCapture)$|Capture$/i,Wt=0,Kt={},ci=0;var Ke,ee,Qt,Vo,Zt=Object.is,We=0,Yo=[],er=[],J=N,{__b:Fo,__r:Bo,diffed:Xo,__c:jo,unmount:Ko,__:Wo}=J;function rr(e,t){J.__h&&J.__h(ee,e,We||t),We=0;var r=ee.__H||(ee.__H={__:[],__h:[]});return e>=r.__.length&&r.__.push({}),r.__[e]}function oe(e){return We=1,mi(Qo,e)}function mi(e,t,r){var o=rr(Ke++,2);if(o.t=e,!o.__c&&(o.__=[r?r(t):Qo(void 0,t),function(s){var i=(o.__N||o.__)[0],c=o.t(i,s);Zt(i,c)||(o.__N=[c,o.__[1]],o.__c.setState({}))}],o.__c=ee,!ee.__f)){ee.__f=!0;var n=ee.shouldComponentUpdate;ee.shouldComponentUpdate=function(s,i,c){var p=this.__H;if(!p)return!0;var _=!1,d=this.props!=s;if(p.__.some(function(f){f.__N&&(_=!0,Zt(f.__[0],f.__N[0])||(d=!0))}),n){var E=n.call(this,s,i,c);return _?E||d:E}return!_||d}}return o.__}function ne(e,t){var r=rr(Ke++,3);!J.__s&&Jo(r.__H,t)&&(r.__P=!0,r.__=e,r.u=t,ee.__H.__h.push(r))}function Ee(e){return We=5,Me(function(){return{current:e}},[])}function Me(e,t){var r=rr(Ke++,7);return Jo(r.__H,t)&&(r.__=e(),r.__H=t),r.__}function ke(e,t){return We=8,Me(function(){return e},t)}function Si(){var e;do{for(;e=er.shift();)try{je(e)}catch(r){J.__e(r,{__:(e=e.__P)&&e.__v})}for(;e=Yo.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(je),t.__h.some(tr),t.__h=[]}catch(r){t.__h=[],J.__e(r,e.__v)}}}while(er.length)}J.__b=function(e){ee=null,Fo&&Fo(e)},J.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Wo&&Wo(e,t)},J.__r=function(e){Bo&&Bo(e),Ke=0;var t=(ee=e.__c).__H;t&&(Qt==ee?ee.__h=[]:(t.__h.some(je),t.__h.some(tr),Ke=0),t.__h=[],t.__.some(function(r){r.__N&&(r.__=r.__N),r.u=r.__N=void 0})),Qt=ee},J.diffed=function(e){Xo&&Xo(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&qo(Yo.push(t)),t.__H.__.some(function(r){r.u&&(r.__H=r.u)})),Qt=ee=null},J.__c=function(e,t){t.some(function(r){try{r.__h.some(je),r.__h=r.__h.filter(function(o){return!o.__||tr(o)})}catch(o){r.__h=[function(){throw o}]}}),jo&&jo(e,t)},J.unmount=function(e){Ko&&Ko(e);var t,r,o=e.__c;o&&o.__H&&(o.__H.__.some(function(n){try{if(n.__P&&n.__c){if(r===void 0){for(r=e.__;r&&(!r.__c||!r.__c.__P);)r=r.__;r=r&&r.__c}n.__P=r,qo(er.push(n))}else je(n)}catch(s){t=s}}),o.__H=void 0,t&&J.__e(t,o.__v))};var zo=typeof requestAnimationFrame=="function";function Ti(e){var t,r=function(){clearTimeout(o),zo&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(r,35);zo&&(t=requestAnimationFrame(r))}function qo(e){e!=1&&Vo==J.requestAnimationFrame||((Vo=J.requestAnimationFrame)||Ti)(Si)}function je(e){var t=ee,r=e.__c;typeof r=="function"&&(e.__c=void 0,r()),ee=t}function tr(e){var t=ee;e.__c=e.__(),ee=t}function Jo(e,t){return!e||e.length!=t.length||t.some(function(r,o){return!Zt(r,e[o])})}function Qo(e,t){return typeof t=="function"?t(e):t}var hi=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},Zo=(e)=>JSON.stringify(e,(t,r)=>typeof r==="function"?"[fn]":r),gi=(e,t)=>{let r=e;for(let o of t){if(r===null||r===void 0)return;r=r[o]}return r},or=(e,t)=>{let r=(o,n)=>{if(typeof o==="function")return(...s)=>{let i=gi(t.current,n);return typeof i==="function"?i(...s):void 0};if(Array.isArray(o))return o.map((s,i)=>r(s,[...n,i]));if(hi(o))return Object.fromEntries(Object.entries(o).map(([s,i])=>[s,r(i,[...n,s])]));return o};return r(e,[])};var yi=Symbol.for("pv"),Ai=0;function S(e,t,r,o,n,s){t||(t={});var i,c,p=t;if("ref"in p&&typeof e!="function")for(c in p={},t)c=="ref"?i=t[c]:p[c]=t[c];var _={type:e,props:p,key:r,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:yi,__v:--Ai,__i:-1,__u:0};return(n||s)&&(_.__source=n,_.__self=s),N.vnode&&N.vnode(_),_}var en=(...e)=>e.filter(Boolean).join(" "),nr=({tone:e,class:t})=>S("span",{class:en("sui-dot",`sui-dot--${e}`,t)},void 0,!1,void 0,this),tn=({children:e,class:t})=>S("span",{class:en("sui-chip",t),children:e},void 0,!1,void 0,this);var rn=(e,t)=>{let r=Ee(null),o=Ee(null),n=Ee(t);n.current=t;let s=Zo(t),i=Ee(!1);ne(()=>{if(!r.current)return;return o.current=e(r.current,or(n.current,n)),i.current=!0,()=>{o.current?.dispose(),o.current=null,i.current=!1}},[]);let c=Ee(s);return ne(()=>{if(!i.current||c.current===s)return;c.current=s,o.current?.update(or(n.current,n))},[s]),r};async function Ue(e,t,r,o={}){let n=o.name??"extension",s={};for(let[i,c]of Object.entries(o.query??{}))if(c)s[i]=c;try{let i=await e.serviceRequest({method:t,path:r,...Object.keys(s).length?{query:s}:{},...o.body!==void 0?{body:JSON.stringify(o.body)}:{}}),c;try{c=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${n} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&c.ok===void 0)return{ok:!1,error:String(c.message??`Error ${i.status}`),code:"failed"};return c}catch(i){let c=i.code;if(c==="NO_SERVICE")return{ok:!1,error:`Approve the ${n} service in Settings > Extensions.`,code:"failed"};if(c==="SERVICE_FAILED")return{ok:!1,error:`The ${n} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${n} service.`,code:"failed"}}}async function Se(e,t,r,o={}){try{await e.toast({kind:t,message:r,...o.dismiss?{dismiss:!0}:{}})}catch{}}var ze=new Map,Ri=30000,nn=(e)=>{let t=ze.get(e);if(!t)t={at:0,listeners:new Set},ze.set(e,t);return t},on=(e)=>{for(let t of e.listeners)t()},Pe=(e,t,r=!1)=>{let o=nn(e);if(o.promise)return o.promise;if(!r&&o.value!==void 0&&Date.now()-o.at<Ri)return Promise.resolve(o.value);let n=t().then((s)=>(o.value=s,o.error=void 0,o.at=Date.now(),s),(s)=>{throw o.error=s,s}).finally(()=>{o.promise=void 0,on(o)});return o.promise=n,on(o),n};var sn=(e)=>{let t=ze.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)Pe(e,t.fetcher,!0).catch(()=>{return})},qe=(e)=>{for(let[t,r]of ze){if(!t.startsWith(e))continue;if(r.at=0,r.listeners.size>0&&r.fetcher)Pe(t,r.fetcher,!0).catch(()=>{return})}},Ce=(e,t)=>{let[,r]=oe(0);ne(()=>{if(!e)return;let n=nn(e);n.fetcher=t;let s=()=>r((i)=>i+1);return n.listeners.add(s),Pe(e,t).catch(()=>{return}),()=>{n.listeners.delete(s)}},[e]);let o=e?ze.get(e):void 0;return{data:o?.value,error:o?.error,loading:Boolean(o?.promise)||e!==null&&o?.value===void 0&&o?.error===void 0,refresh:()=>{if(e)Pe(e,t,!0).catch(()=>{return})}}};var M="openchamber.sdk",U=1;var sr=`
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
`;function ir(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",(o)=>{let n=o.target===e?t:o.target;if(!(n instanceof Element))return;if(!n.hasAttribute("data-oc-scrolling"))n.setAttribute("data-oc-scrolling","");let s=r.get(n);if(s!==void 0)clearTimeout(s);r.set(n,setTimeout(()=>{r.delete(n),n.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var xi=`(${ir.toString()})(document);`;var ar=128,cr=65536;var pt=128;var _t=65536;var dn=/^[a-z][a-z0-9-]{0,39}$/;var an=(e)=>Object(e)===e&&!Array.isArray(e),lr=(e,t)=>Object.keys(e).every((r)=>t.includes(r)),cn=(e)=>String(e)===e&&e.length>=1&&e.length<=60,ln=(e)=>String(e)===e&&e.length>=1&&e.length<=80,un=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let r of e){if(!an(r)||!dn.test(r.id)||!cn(r.label))return!1;if(r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1)return!1;if(t.has(r.id))return!1;if(t.add(r.id),r.kind==="button"){if(!lr(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!lr(r,["kind","id","label","value","options","disabled"]))return!1;if(!ln(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let o=new Set;for(let n of r.options){if(!an(n)||!lr(n,["value","label"])||!ln(n.value)||!cn(n.label)||o.has(n.value))return!1;o.add(n.value)}if(!o.has(r.value))return!1}return!0};var pn=["{id}","{segment}","{segments+}"];var gc=new Set(pn);var _n=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Ac=new Set(_n);var ft=20000000,Et=256;var dr=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,fn=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==t.bytes[r])return!1;return!0};var En=/^[A-Za-z0-9_-]{1,80}$/;var mn=["left","right","top","bottom"];var Sn=(e,t=0,r={remaining:16000})=>{if(--r.remaining<0||t>=32)return!1;if(e===null)return!0;let o=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let n of o)if(!Sn(n,t+1,r))return!1;return!0},ur=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(ur);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(ur)}return String(e)===e||Number.isFinite(e)},pr=(e)=>{try{if(String(e.id)!==e.id||!En.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!mn.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Sn(e.data)||!ur(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var fr=2000;var hn=["file","directory","other","missing"],Er=(e)=>Boolean(e&&"sessionId"in e),mr=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var gn=/^[0-9a-f]{7,64}$/i,Sr=(e)=>gn.test(e),mt=500,St=32000,yn=16000,An=128,On=200,Rn=2000,xn=16000,bn=80,In=200,kn=16000;var Cn=2000;var Tr=20000,Tt=1024,ht=2000000;var gt=64000,yt=8000,hr=4000;var gr=960000;var vn=999,wn=1e4,Ye=500,Mn=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Un=["stopped","starting","ready","failed"],Ii=new Set(Mn),Pn=(e)=>Ii.has(e),Nn=(e)=>e&&Pn(e)?e:"HOST_REJECTED",De=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(De);if(Object(e)===e)return Object.values(e).every(De);return!1},Ln=(e)=>De(e)&&JSON.stringify(e).length<=kn,Tn=(e)=>e?.trim().slice(0,In)??"",Ge=(e)=>{let t=e.id.trim().slice(0,An),r=e.title.trim().slice(0,On),o=e.url.trim().slice(0,Rn),n=e.text?.trim().slice(0,xn),s=e.author?.trim().slice(0,bn),i=e.kind==="pull"?"pull":"issue",c={providerId:e.providerId.trim(),id:t,title:r||t,url:o,kind:i};if(n)c.text=n;if(s)c.author=s;if(i==="pull"){let p=Tn(e.branches?.head),_=Tn(e.branches?.base);if(p&&_)c.branches={head:p,base:_}}if(Ln(e.data))c.data=e.data;return c},yr=(e)=>{let t=Ge(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Ar=(e)=>{let t={text:e.text.trim().slice(0,yn)};if(e.send)t.send=!0;return t},Or=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(vn,Math.max(0,Math.round(e)))},Rr=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(wn,Math.max(0,Math.ceil(e)))};var $e=(e)=>e.length>0&&e.length<=Tt&&!e.includes("\x00")&&!e.includes("\\");var At=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Cn)return!1;return!e.split("/").some((r)=>r==="."||r==="..")},ki=new Set(Un),xr=(e)=>Boolean(e&&"status"in e&&ki.has(String(e.status))&&!("body"in e)),Ot=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),br=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Ir=(e)=>Boolean(e&&"written"in e&&e.written===!0),kr=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Ci=new Set(hn),Cr=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Ci.has(String(e.kind))&&Number.isFinite(e.size)),vr=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),vi=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),wi=(e)=>Object(e)===e?e:null,_r=(e)=>String(e)===e&&e.length>0,Mi=(e)=>{if(!_r(e.id))return null;if(e.ok===!0){let t={channel:M,v:U,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&_r(e.error))return{channel:M,v:U,type:"result",id:e.id,ok:!1,error:e.error,code:Nn(_r(e.code)?e.code:void 0)};return null},wr=(e)=>{let t=wi(e);if(!t||t.channel!==M||t.v!==U)return null;if(t.type==="result")return Mi(t);if(!vi.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var Dn=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),Ui=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class C extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var Gn=()=>Promise.reject(new C("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Rt=()=>Promise.reject(new C("BAD_PATH",`File path must be 1 to ${Tt} characters without NUL or backslash.`)),xt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new C("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},v=(e)=>(e.value+=1,`oc-${e.value}`),Mr=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new C("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??((a)=>a===t.parent),o=e.requestTimeoutMs??Tr,n=new Set,s=new Set,i=new Set,c=new Set,p=new Set,_=new Set,d=new Set,E=new Set,f=new Set,u=new Set,h=new Set,O=new Set,b=[],T=null,A=null,x=new Set,w=new Set,K=null,I=null,Q=!1,Z=new Map,_e=new Map,te=new Map,W=!1,m={value:0},g=null,he=null,Fe=!1,Be=!1,mo=null,So=(a)=>{if(!a)return null;return{sessionId:a.id,phase:a.busy?"started":"completed"}},de=(a)=>{t.parent.postMessage(a,"*")},To=()=>{if(W||t.parent===t||O.size===0||g?.features?.lateGenerateResults!==!0)return;de({channel:M,v:U,type:"generate-late-listen"})},B=(a,l)=>{for(let R of a)try{R(l)}catch(k){console.error(k)}},ho=(a)=>{if(!(a instanceof MessageEvent))return;if(!r(a.source))return;let l=wr(a.data);if(!l)return;if(l.type==="workspace"){let k=_e.get(l.payload.subscriptionId);if(k)B([k],l.payload.snapshot);return}if(l.type==="shells"){let k=te.get(l.payload.subscriptionId);if(k)B([k],l.payload.snapshot);return}if(l.type==="ready"){if(g=l.payload,he=So(l.payload.session),B(n,l.payload),B(s,l.payload.directory),B(i,l.payload.session),he)B(c,he);if(B(p,l.payload.connection),B(_,l.payload.settings),B(d,l.payload.item),l.payload.block)B(E,l.payload.block);To();return}if(l.type==="service-event"){B(f,l.payload);return}if(l.type==="generate-late"){if(O.size===0)b.push(l.payload);else B(O,l.payload);return}if(l.type==="directory"){if(g)g={...g,directory:l.payload.directory};B(s,l.payload.directory);return}if(l.type==="session"){if(g)g={...g,session:l.payload.session};if(!l.payload.session)he=null;else if(he?.sessionId!==l.payload.session.id)he=So(l.payload.session);B(i,l.payload.session);return}if(l.type==="session-lifecycle"){he=l.payload,B(c,l.payload);return}if(l.type==="connection"){if(g)g={...g,connection:l.payload.connection};B(p,l.payload.connection);return}if(l.type==="settings"){if(g)g={...g,settings:l.payload.settings};B(_,l.payload.settings);return}if(l.type==="item"){if(g)g={...g,item:l.payload.item};B(d,l.payload.item);return}if(l.type==="status-control-event"){B(u,l.payload);return}if(l.type==="popover-closed"){B(h,l.payload);return}if(l.type==="action"){let k=(G)=>{if(!W)de({channel:M,v:U,type:"action-result",id:l.id,payload:G})},V=A;if(!V){k({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>V(l.payload)).then(()=>k({ok:!0}),(G)=>{let Y=(G instanceof Error?G.message:String(G)).trim();k({ok:!1,error:(Y||"Action failed.").slice(0,Ye)})});return}if(l.type==="file-open"){let k=l.payload;if(I&&fn(I,k))return;I=k,B(x,l.payload);return}if(l.type==="file-saved"){B(w,l.payload.version);return}if(l.type==="file-snapshot"){let k=(Y)=>{if(!W)de({channel:M,v:U,type:"file-snapshot-result",id:l.id,payload:Y})},V=(Y)=>k({error:(Y.trim()||"Could not read the edited file.").slice(0,Ye)}),G=K;if(!G){V("This extension does not edit files.");return}Promise.resolve().then(()=>G(l.payload.purpose)).then((Y)=>{if(dr(Y)>ft){V(`The file is over ${ft} ${"bytes"in Y?"bytes":"characters"}.`);return}if(Y.version.length>Et){V(`The snapshot version is over ${Et} characters.`);return}k({snapshot:"bytes"in Y?{bytes:Y.bytes,version:Y.version}:{content:Y.content,version:Y.version}})},(Y)=>V(Y instanceof Error?Y.message:String(Y)));return}if(l.type==="resolve"){let k=(G)=>{de({channel:M,v:U,type:"resolve-result",id:l.id,payload:G})},V=T;if(!V){k({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>V(l.payload)).then((G)=>k({item:G?Ge(G):null}),(G)=>{let Y=(G instanceof Error?G.message:String(G)).trim();k({error:(Y||"Command failed.").slice(0,Ye)})});return}let R=Z.get(l.id);if(!R)return;if(clearTimeout(R.timer),Z.delete(l.id),l.ok){R.resolve(l.payload);return}R.reject(new C(l.code,l.error))};t.addEventListener("message",ho),de({channel:M,v:U,type:"hello"});let ie=(a,l=o)=>{if(W||t.parent===t)return Promise.reject(new C("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,k)=>{let V=setTimeout(()=>{Z.delete(a.id),k(new C("HOST_TIMEOUT","Host did not answer in time."))},l);Z.set(a.id,{resolve:R,reject:k,timer:V}),de(a)})},z=(a)=>ie(a).then(()=>{return}),q={channel:M,v:U},Ft=(a)=>{if(!W&&t.parent!==t)de(a)},go=()=>Ft({...q,type:"file-save"}),yo=(a)=>{if(!Dn(a)||!Ui(a))return;a.preventDefault(),go()},Ao=(a)=>{if(!Dn(a)||a.key!=="Escape"||g?.surface!=="popover"||!g.popover)return;a.preventDefault(),bo(g.popover.id,"escape").catch(()=>{return})},tt=()=>{let a=g?.surface==="popover"?g.popover:void 0;if(!a)return;let l=Fe||Be;if(mo===l)return;mo=l,Io(a.id,l).catch(()=>{return})},rt=()=>{if(g?.surface!=="popover"||Fe)return;Fe=!0,tt()},Oo=(a)=>{if(g?.surface!=="popover"||a.relatedTarget!==null||!Fe)return;Fe=!1,tt()},Ro=()=>{if(g?.surface!=="popover"||Be)return;Be=!0,tt()},xo=()=>{if(g?.surface!=="popover"||!Be)return;Be=!1,tt()},fe=(a,l=1024)=>{if(!a.trim()||a.length>l)throw new C("HOST_REJECTED",`Identity must contain 1 to ${l} characters.`)},Bt=async(a)=>{if(a.kind!=="projects")fe(a.projectId);let l=await ie({...q,type:"workspace-read",id:v(m),payload:a});if(!l||!("kind"in l)||!("state"in l)||l.kind!==a.kind)throw new C("HOST_REJECTED","Host did not return workspace data.");return l},Xt=async(a,l)=>{if(a.kind!=="projects")fe(a.projectId);let R=v(m);_e.set(R,l);try{await z({...q,type:"workspace-subscribe",id:v(m),payload:{subscriptionId:R,query:a}})}catch(k){if(_e.delete(R),!W)de({...q,type:"workspace-unsubscribe",id:v(m),payload:{subscriptionId:R}});throw k}return()=>{if(!_e.delete(R)||W)return;de({...q,type:"workspace-unsubscribe",id:v(m),payload:{subscriptionId:R}})}},ii=async(a,l)=>{if(a.kind==="session")fe(a.sessionId);if(a.kind==="project")fe(a.projectId);let R=v(m);te.set(R,l);try{await z({...q,type:"shells-subscribe",id:v(m),payload:{subscriptionId:R,scope:a}})}catch(k){if(te.delete(R),!W)de({...q,type:"shells-unsubscribe",id:v(m),payload:{subscriptionId:R}});throw k}return()=>{if(!te.delete(R)||W)return;de({...q,type:"shells-unsubscribe",id:v(m),payload:{subscriptionId:R}})}},ot=async(a)=>{if("key"in a&&(a.key.length===0||a.key.length>ar))throw new C("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(a.op==="set"&&!De(a.value))throw new C("HOST_REJECTED","Storage values must be JSON.");if(a.op==="set"&&new TextEncoder().encode(JSON.stringify(a.value)).length>cr)throw new C("HOST_REJECTED","Storage value exceeds 64 KiB.");if(a.scope==="device"&&g?.features?.deviceStorage!==!0)throw new C("UNSUPPORTED","This host does not support device storage.");let l=await ie({...q,type:"storage",id:v(m),payload:a});if(!l||!("storage"in l)||l.op!==a.op)throw new C("HOST_REJECTED","Host did not return storage data.");return l},bo=(a,l)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===a)?Promise.reject(new C("UNSUPPORTED","This host does not support popovers.")):z({...q,type:"popover-close",id:v(m),payload:l?{id:a,reason:l}:{id:a}}),Io=(a,l)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===a)?Promise.reject(new C("UNSUPPORTED","This host does not support popovers.")):z({...q,type:"popover-anchor",id:v(m),payload:{id:a,active:l}});return t.addEventListener("keydown",Ao,!0),t.addEventListener("pointerover",rt),t.addEventListener("pointermove",rt),t.addEventListener("pointerout",Oo),t.addEventListener("focus",Ro),t.addEventListener("blur",xo),{onAction:(a)=>(A=a,()=>{if(A===a)A=null}),listProjects:async()=>{let a=await Bt({kind:"projects"});if(a.kind!=="projects")throw new C("HOST_REJECTED","Expected projects.");return a},listWorktrees:async(a)=>{let l=await Bt({kind:"worktrees",projectId:a});if(l.kind!=="worktrees")throw new C("HOST_REJECTED","Expected worktrees.");return l},listSessions:async(a)=>{let l=await Bt({kind:"sessions",projectId:a});if(l.kind!=="sessions")throw new C("HOST_REJECTED","Expected sessions.");return l},onProjects:(a)=>Xt({kind:"projects"},(l)=>{if(l.kind==="projects")a(l)}),onWorktrees:(a,l)=>Xt({kind:"worktrees",projectId:a},(R)=>{if(R.kind==="worktrees")l(R)}),onSessions:(a,l)=>Xt({kind:"sessions",projectId:a},(R)=>{if(R.kind==="sessions")l(R)}),onRunningShells:(a,l)=>ii(a,l),readShellOutput:async(a,l)=>{fe(a,pt);let R=l?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new C("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let k=l?.tailBytes;if(k!==void 0&&(!Number.isInteger(k)||k<1||k>_t))throw new C("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${_t}.`);let G=await ie({...q,type:"shell-output",id:v(m),payload:{shellId:a,cursor:R,tailBytes:k}});if(!G||typeof G.output!=="string"||!Number.isFinite(G.cursor))throw new C("HOST_REJECTED","Host did not return shell output.");return G},stopShell:async(a)=>{if(fe(a,pt),(await ie({...q,type:"shell-stop",id:v(m),payload:{shellId:a}}))?.stopped!==!0)throw new C("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(a)=>{fe(a),await z({...q,type:"open-session",id:v(m),payload:{sessionId:a}})},storage:{get:async(a,l)=>{let R=xt(l),k={op:"get",key:a};if(R)k.scope=R;let V=await ot(k);return V.op==="get"&&V.found?V.value:void 0},set:async(a,l,R)=>{let k=xt(R),V={op:"set",key:a,value:l};if(k)V.scope=k;await ot(V)},delete:async(a,l)=>{let R=xt(l),k={op:"delete",key:a};if(R)k.scope=R;await ot(k)},keys:async(a)=>{let l=xt(a),R={op:"keys"};if(l)R.scope=l;let k=await ot(R);if(k.op!=="keys")throw new C("HOST_REJECTED","Expected storage keys.");return k.keys}},onReady:(a)=>{if(n.add(a),g)a(g);return()=>{n.delete(a)}},onDirectory:(a)=>{if(s.add(a),g)a(g.directory);return()=>{s.delete(a)}},onSession:(a)=>{if(i.add(a),g)a(g.session);return()=>{i.delete(a)}},onSessionLifecycle:(a)=>{if(c.add(a),he)a(he);return()=>{c.delete(a)}},onConnection:(a)=>{if(p.add(a),g)a(g.connection);return()=>{p.delete(a)}},onSettings:(a)=>{if(_.add(a),g)a(g.settings);return()=>{_.delete(a)}},onItem:(a)=>{if(d.add(a),g)a(g.item);return()=>{d.delete(a)}},onBlock:(a)=>{if(E.add(a),g?.block)a(g.block);return()=>{E.delete(a)}},onServiceEvent:(a)=>(f.add(a),()=>{f.delete(a)}),onStatusControl:(a)=>(u.add(a),()=>{u.delete(a)}),onPopoverClosed:(a)=>(h.add(a),()=>{h.delete(a)}),setStatusControls:(a)=>{if(g?.features?.statusControls!==!0)return Promise.reject(new C("UNSUPPORTED","This host does not support status controls."));if(!un(a))return Promise.reject(new C("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return z({...q,type:"status-controls",id:v(m),payload:{controls:a}})},openPopover:(a)=>{if(g?.features?.popovers!==!0)return Promise.reject(new C("UNSUPPORTED","This host does not support popovers."));if(!pr(a))return Promise.reject(new C("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return z({...q,type:"popover-open",id:v(m),payload:a})},closePopover:bo,setPopoverAnchorActive:Io,onResolve:(a)=>(T=a,()=>{if(T===a)T=null}),toast:(a)=>{let l=a.message.trim();if(!l||l.length>mt)return Promise.reject(new C("HOST_REJECTED",`Toast message must contain 1 to ${mt} characters.`));if(a.copy&&a.copy!==!0&&(!a.copy.text.length||a.copy.text.length>St))return Promise.reject(new C("HOST_REJECTED",`Toast copy text must contain 1 to ${St} characters.`));return z({channel:M,v:U,type:"toast",id:v(m),payload:{...a,message:l}})},openUrl:(a)=>z({channel:M,v:U,type:"open-url",id:v(m),payload:{url:a}}),openCommit:(a)=>Sr(a)?z({channel:M,v:U,type:"open-commit",id:v(m),payload:{sha:a}}):Promise.reject(new C("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(a)=>z({channel:M,v:U,type:"block-answer",id:v(m),payload:{text:a.trim().slice(0,fr)}}),openSurface:(a)=>z({channel:M,v:U,type:"open-surface",id:v(m),payload:{surfaceId:a}}),writeClipboard:(a)=>z({channel:M,v:U,type:"clipboard-write",id:v(m),payload:{text:a}}),compose:(a)=>z({channel:M,v:U,type:"compose",id:v(m),payload:a}),attach:(a)=>z({channel:M,v:U,type:"attach",id:v(m),payload:Ge(a)}),startSession:async(a)=>{if(a.projectId!==void 0)fe(a.projectId);let l=a.worktree;if(l&&l!==!0)if(l.kind==="existing")fe(l.directory);else{if(l.name!==void 0)fe(l.name,200);if(l.baseBranch!==void 0)fe(l.baseBranch,200)}let R=await ie({channel:M,v:U,type:"start-session",id:v(m),payload:yr(a)},e.requestTimeoutMs??180000);if(!Er(R))throw new C("HOST_REJECTED","Host did not return a session.");return R},prompt:(a)=>ie({channel:M,v:U,type:"prompt",id:v(m),payload:Ar(a)}).then((l)=>{if(!mr(l))throw new C("HOST_REJECTED","Host did not return a prompt result.");return l}),sessionLink:(a)=>z({channel:M,v:U,type:"session-link",id:v(m),payload:Ge(a)}),close:()=>z({channel:M,v:U,type:"close",id:v(m)}),oauthStart:()=>z({channel:M,v:U,type:"oauth-start",id:v(m)}),oauthDisconnect:()=>z({channel:M,v:U,type:"oauth-disconnect",id:v(m)}),request:(a)=>(At(a.path)?ie({channel:M,v:U,type:"request",id:v(m),payload:a}):Gn()).then((l)=>{if(!Ot(l))throw new C("HOST_REJECTED","Host request result was empty.");return l}),serviceRequest:(a)=>(At(a.path)?ie({channel:M,v:U,type:"service-request",id:v(m),payload:a}):Gn()).then((l)=>{if(!Ot(l))throw new C("HOST_REJECTED","Host service request result was empty.");return l}),serviceStatus:()=>ie({channel:M,v:U,type:"service-status",id:v(m)}).then((a)=>{if(!xr(a))throw new C("HOST_REJECTED","Host did not return service status.");return a}),readFile:(a)=>($e(a)?ie({channel:M,v:U,type:"file-read",id:v(m),payload:{path:a}}):Rt()).then((l)=>{if(!br(l))throw new C("HOST_REJECTED","Host did not return file content.");return l}),writeFile:(a,l)=>{if(!$e(a))return Rt();if(l.length>ht)return Promise.reject(new C("FILE_TOO_LARGE",`Content is over ${ht} characters.`));return ie({channel:M,v:U,type:"file-write",id:v(m),payload:{path:a,content:l}}).then((R)=>{if(!Ir(R))throw new C("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(a)=>($e(a)?ie({channel:M,v:U,type:"file-list",id:v(m),payload:{path:a}}):Rt()).then((l)=>{if(!kr(l))throw new C("HOST_REJECTED","Host did not return directory entries.");return l}),stat:(a)=>($e(a)?ie({channel:M,v:U,type:"file-stat",id:v(m),payload:{path:a}}):Rt()).then((l)=>{if(!Cr(l))throw new C("HOST_REJECTED","Host did not return file status.");return l}),generate:(a)=>{let l=a.prompt.trim(),R=a.system?.trim();if(l.length===0||l.length>gt)return Promise.reject(new C("HOST_REJECTED",`Prompt must be 1 to ${gt} characters.`));if(R!==void 0&&(R.length===0||R.length>yt))return Promise.reject(new C("HOST_REJECTED",`System prompt must be 1 to ${yt} characters.`));let k=a.maxOutputTokens===void 0?void 0:Math.min(hr,Math.max(1,Math.floor(a.maxOutputTokens)));if(k!==void 0&&!Number.isFinite(k))return Promise.reject(new C("HOST_REJECTED","maxOutputTokens must be a number."));let V={prompt:l};if(R!==void 0)V.system=R;if(k!==void 0)V.maxOutputTokens=k;return ie({channel:M,v:U,type:"generate",id:v(m),payload:V},e.requestTimeoutMs??gr).then((G)=>{if(!vr(G))throw new C("HOST_REJECTED","Host did not return generated text.");return G})},onLateGenerateResult:(a)=>{O.add(a);for(let l of b.splice(0))B([a],l);return To(),()=>{O.delete(a)}},setBadge:(a)=>z({channel:M,v:U,type:"badge",id:v(m),payload:{count:Or(a)}}),setHeight:(a)=>z({channel:M,v:U,type:"resize",id:v(m),payload:{height:Rr(a)}}),onFileOpen:(a)=>{if(x.add(a),!Q)Q=!0,t.addEventListener("keydown",yo,!0);if(I)a(I);return()=>{x.delete(a)}},onFileSnapshot:(a)=>(K=a,()=>{if(K===a)K=null}),onFileSaved:(a)=>(w.add(a),()=>{w.delete(a)}),reportFileChange:(a)=>Ft({...q,type:"file-change",payload:{dirty:a.dirty,edited:a.edited}}),requestFileSave:go,reportFileUnsupported:()=>Ft({...q,type:"file-unsupported"}),dispose:()=>{for(let a of _e.keys())de({...q,type:"workspace-unsubscribe",id:v(m),payload:{subscriptionId:a}});_e.clear();for(let a of te.keys())de({...q,type:"shells-unsubscribe",id:v(m),payload:{subscriptionId:a}});if(te.clear(),W=!0,T=null,A=null,K=null,x.clear(),w.clear(),Q)t.removeEventListener("keydown",yo,!0);t.removeEventListener("message",ho),t.removeEventListener("keydown",Ao,!0),t.removeEventListener("pointerover",rt),t.removeEventListener("pointermove",rt),t.removeEventListener("pointerout",Oo),t.removeEventListener("focus",Ro),t.removeEventListener("blur",xo);for(let a of Z.values())clearTimeout(a.timer),a.reject(new C("HOST_UNAVAILABLE","Host client was disposed."));Z.clear(),n.clear(),s.clear(),i.clear(),c.clear(),p.clear(),_.clear(),d.clear(),E.clear(),f.clear(),u.clear(),h.clear(),O.clear(),b.length=0}}};var $n=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Dc=new Set($n);var Hn=["none","agent","user"];var $c=new Set(Hn);var Pi=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ni=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Vn=(e,t)=>{t.style.colorScheme=e.mode;for(let[r,o]of Pi)t.style.setProperty(r,e.tokens[o]);for(let[r,o,n]of Ni){let s=e.tokens[n]??"";t.style.setProperty(r,s),t.style.setProperty(o,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Ur=(e,t)=>{if(Vn(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var Li={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(e,t)=>`var(--${e}, var(--oc-${Li[e]}, ${t}))`,ye=F("surface-background","transparent"),It=F("surface-elevated","transparent"),He=F("surface-elevated-foreground","inherit"),ue=F("surface-foreground","inherit"),X=F("surface-muted-foreground","gray"),Di=F("surface-muted","transparent"),Ne=F("interactive-border","currentColor"),ce=F("interactive-hover","transparent"),Le=F("interactive-active","transparent"),Pr=F("interactive-selection","transparent"),Nr=F("interactive-selection-foreground","inherit"),ge=F("primary","currentColor"),Lr=F("primary-text","inherit"),Dr=F("error-text","inherit"),Gi=F("font-sans","inherit"),Gr=F("font-mono","monospace"),jn=F("radius","9px"),$r=`calc(${jn} - 2px)`,Fn=`calc(${jn} - 4px)`,j=(e,t,r="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${r})`,Bn=`background-image: linear-gradient(${ce}, ${ce});`,Hr=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Vr="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Xn="box-shadow: var(--oc-sdk-lit);",Fr=`inset 0 0.5px 0 0 ${j(ue,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,$i=`
:root {
  --oc-sdk-edge: ${j(ue,16)};
  --oc-sdk-field-bg: ${It};
  --oc-sdk-raised-bg: ${ye};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${j(ue,14)};
  --oc-sdk-field-bg: ${j(ye,50,It)};
  --oc-sdk-raised-bg: ${It};
  --oc-sdk-field-lift: ${Fr};
  --oc-sdk-raised-lift: ${Fr};
  --oc-sdk-lit: ${Fr};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,bt=(e)=>{let t=F(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${F(`${e}-text`,"inherit")}; }`},Hi=`
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
`,Kn=`${$i}
.oc-sdk { color: ${ue}; font-family: ${Gi}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Bn} }
.oc-sdk-mono { font-family: ${Gr}; }
.oc-sdk-muted { color: ${X}; }
${bt("success")}${bt("warning")}${bt("error")}${bt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ge}; --oc-sdk-tone-text: ${Lr}; }

.oc-sdk-btn { border-radius: ${$r}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Fn}; }
.oc-sdk-btn[data-variant="default"] { color: ${Lr}; background: ${j(ge,10,ye)}; border-color: ${j(ge,12)}; ${Xn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${j(ge,16,ye)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${j(ge,22,ye)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Di}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${He}; ${Vr} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Le}, ${Le}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${ce}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Le}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${Dr}; background: ${j("var(--oc-sdk-tone)",7,ye)}; border-color: ${j("var(--oc-sdk-tone)",12)}; ${Xn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${j("var(--oc-sdk-tone)",9,ye)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${j("var(--oc-sdk-tone)",11,ye)}; box-shadow: none; }

.oc-sdk-field-note { color: ${X}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Dr}; }
.oc-sdk-input { border-radius: ${$r}; background: var(--oc-sdk-field-bg); color: ${He}; ${Hr("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${X}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Hr(j(ue,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Hr(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Gr}; }

.oc-sdk-search-icon { color: ${X}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ge}; }
.oc-sdk-search-clear { border-radius: ${Fn}; color: ${X}; }
.oc-sdk-search-clear:hover { background: ${ce}; color: ${ue}; }

.oc-sdk-trigger { border-radius: ${$r}; background: var(--oc-sdk-raised-bg); color: ${He}; ${Vr} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Le}, ${Le}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${X}; }
.oc-sdk-trigger-chevron { color: ${X}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${He}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${It}; background-clip: padding-box; color: ${He}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${ce}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Pr}; color: ${Nr}; }
.oc-sdk-option-check { color: ${ue}; }
.oc-sdk-option[data-destructive="true"] { color: ${Dr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${j(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${X}; }
.oc-sdk-popup-empty { color: ${X}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ne}; border-radius: 4px; color: ${ue}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${j(ue,60,Ne)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ne}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ye}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ge}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Bn} }
.oc-sdk-check-desc { color: ${X}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${j(ue,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${X}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ue}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Nr}; background: ${Pr}; border-color: ${Ne}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${He}; background: var(--oc-sdk-raised-bg); ${Vr} }
.oc-sdk-tab-count { color: ${X}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${j(ue,6)}; color: ${X}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${j("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${ce}; }
.oc-sdk-row[aria-selected="true"] { background: ${Pr}; color: ${Nr}; }
.oc-sdk-row-lead { font-family: ${Gr}; color: ${X}; }
.oc-sdk-row-sub { color: ${X}; }
.oc-sdk-row-meta { color: ${X}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${X}; }

.oc-sdk-empty-body { color: ${X}; }

.oc-sdk-spinner { color: ${X}; }
.oc-sdk-spinner-ring { border-color: ${Ne}; border-top-color: ${ge}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${j("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${X}; }

.oc-sdk-separator { color: ${X}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${j(Ne,40)}; }

.oc-sdk-progress-label { color: ${X}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${j(ue,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ge}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${Lr}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${j(Ne,60)}; }
`,L=`
${sr}
${Hi}
${Kn}`;var Wn="oc-sdk-ui-style",Ae=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},D=(e)=>{let t=document.getElementById(Wn);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}ir(document);let r=document.createElement("style");r.id=Wn,r.textContent=e,document.head.appendChild(r)},y=(e,t)=>{let r=document.createElement(e);if(t)r.className=t;return r},le=(e)=>{let t=y("button",e);return t.type="button",t},H=(e,t)=>{let r=t??"";if(e.textContent!==r)e.textContent=r},pe=(e,t,r)=>{if(r===void 0||r===null||r==="")e.removeAttribute(t);else if(e.getAttribute(t)!==r)e.setAttribute(t,r)},zn=(e,t)=>{let r=(o)=>{if(o.target instanceof Node&&e.contains(o.target))return;t()};return document.addEventListener("pointerdown",r,!0),()=>{document.removeEventListener("pointerdown",r,!0)}};var Vi=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Oe=(e,t)=>{D(L);let r=t,o=le("oc-sdk oc-sdk-btn"),n=Vi(),s=document.createElement("span");o.append(s),e.append(o);let i=()=>{if(o.dataset.variant=r.variant??"default",o.dataset.size=r.size??"default",o.disabled=Boolean(r.disabled)||Boolean(r.loading),o.dataset.loading=r.loading?"true":"false",o.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&n.parentNode!==o)o.prepend(n);else if(!r.loading&&n.parentNode===o)n.remove();H(s,r.label)},c=()=>{if(r.disabled||r.loading)return;r.onClick()};return o.addEventListener("click",c),i(),{update:(p)=>{r={...r,...p},i()},dispose:()=>{o.removeEventListener("click",c),o.remove()}}};var Br=(e,t)=>{D(L);let r=t,o=y("label","oc-sdk oc-sdk-field"),n=y("span","oc-sdk-field-label"),s=r.multiline?y("textarea","oc-sdk-input"):y("input","oc-sdk-input"),i=y("span","oc-sdk-field-note");o.append(n,s,i),e.append(o);let c=()=>{if(H(n,r.label),n.hidden=!r.label,s instanceof HTMLInputElement)s.type=r.password?"password":"text";else s.rows=r.rows??3;if(s.value!==r.value)s.value=r.value;s.disabled=Boolean(r.disabled),pe(s,"placeholder",r.placeholder),s.dataset.mono=r.mono?"true":"false";let _=Boolean(r.error);o.dataset.invalid=_?"true":"false",s.setAttribute("aria-invalid",_?"true":"false");let d=r.error??r.helper??"";H(i,d),i.hidden=d===""},p=()=>{r.onChange(s.value)};return s.addEventListener("input",p),c(),{update:(_)=>{r={...r,..._},c()},dispose:()=>{s.removeEventListener("input",p),o.remove()}}};var Fi={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},me=(e,t,r)=>{let o=document.createElementNS("http://www.w3.org/2000/svg","svg");if(o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("fill","currentColor"),r)o.setAttribute("class",r);let n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d",Fi[e]),o.append(n),o};var Xr=(e,t)=>{D(L);let r=t,o=y("div","oc-sdk oc-sdk-search"),n=y("input","oc-sdk-input");n.type="text",n.spellcheck=!1,n.autocomplete="off",n.setAttribute("role","searchbox");let s=le("oc-sdk-search-clear");s.append(me("close",14)),s.tabIndex=-1,o.append(me("search",16,"oc-sdk-search-icon"),n,s),e.append(o);let i=()=>{let d=r.placeholder??"Search";if(pe(n,"placeholder",d),n.setAttribute("aria-label",r.label??d),s.setAttribute("aria-label","Clear search"),n.value!==r.value)n.value=r.value;o.dataset.active=r.value.trim()===""?"false":"true"},c=()=>{if(r.value!=="")r.onChange("");n.focus()},p=()=>{r.onChange(n.value)},_=(d)=>{if(d.key==="Escape"&&n.value!=="")d.preventDefault(),c()};if(n.addEventListener("input",p),n.addEventListener("keydown",_),s.addEventListener("click",c),i(),r.autofocus)n.focus();return{update:(d)=>{r={...r,...d},i()},dispose:()=>{n.removeEventListener("input",p),n.removeEventListener("keydown",_),s.removeEventListener("click",c),o.remove()}}};var Te=(e,t="vertical")=>{let[r,o]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===o||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Re=(e,t,r)=>{let o=e.filter((p)=>!p.disabled);if(o.length===0)return null;let n=o[0],s=o[o.length-1];if(r==="first"||!n||!s)return n?.id??null;if(r==="last")return s.id;let i=o.findIndex((p)=>p.id===t);if(i===-1)return r==="next"?n.id:s.id;return o[Math.min(o.length-1,Math.max(0,i+(r==="next"?1:-1)))]?.id??null};var qn=(e,t)=>`${e}-${t??""}`,kt=(e,t,r,o)=>{let n=le("oc-sdk-option");if(n.id=qn(e,r.id),n.setAttribute("role",t),n.tabIndex=-1,n.disabled=Boolean(r.disabled),t==="option")n.setAttribute("aria-selected",r.selected?"true":"false");n.dataset.destructive=r.destructive?"true":"false";let s=y("span","oc-sdk-option-label");if(s.textContent=r.label,n.append(s),r.hint){let i=y("span","oc-sdk-option-hint");i.textContent=r.hint,n.append(i)}if(t==="option"){n.dataset.mark="check";let i=y("span","oc-sdk-option-check");i.append(me("check",14)),n.append(i)}return n.addEventListener("pointerenter",o.hover),n.addEventListener("click",o.pick),n},Ct=(e,t,r,o)=>{let n=qn(r,o);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===n?"true":"false";pe(t,"aria-activedescendant",o?n:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Bi=(e,t)=>{let r=t.getBoundingClientRect();e.style.minWidth=`${Math.round(r.width)}px`,e.style.left=`${Math.round(r.left)}px`,e.style.top=`${Math.round(r.bottom+4)}px`;let o=e.offsetHeight,n=window.innerHeight-r.bottom-8;if(o>n&&r.top-8>n)e.style.top=`${Math.max(8,Math.round(r.top-4-o))}px`;let s=r.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(r.left-s))}px`},vt=(e,t,r,o)=>{e.append(r),Bi(r,t);let n=zn(e,o),s=()=>{o()},i=(c)=>{if(c.target instanceof Node&&r.contains(c.target))return;o()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{n(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),r.remove()}};var Yn=(e,t)=>{let r=t.trim().toLowerCase();if(!r)return[...e];return e.filter((o)=>o.label.toLowerCase().includes(r)||o.id.toLowerCase().includes(r))},Xi=0,wt=(e,t)=>{D(L);let r=t,o=`oc-sdk-select-${Xi+=1}`,n=y("div","oc-sdk oc-sdk-select"),s=y("span","oc-sdk-field-label");s.id=`${o}-label`;let i=le("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let c=y("span","oc-sdk-trigger-value");i.append(c,me("chevron",14,"oc-sdk-trigger-chevron")),n.append(s,i),e.append(n);let p="",_=null,d=null,E=y("div","oc-sdk oc-sdk-popup"),f=y("div","oc-sdk-popup-search"),u=y("input","oc-sdk-input");u.type="text",u.autocomplete="off",f.append(u);let h=y("div");h.setAttribute("role","listbox"),h.tabIndex=-1,E.append(h);let O=()=>Yn(r.options,r.searchable?p:""),b=()=>r.searchable?u:h,T=(m)=>{_=m,Ct(h,b(),o,m)},A=()=>{Ae(h);let m=O();if(m.length===0){let g=y("div","oc-sdk-popup-empty");g.textContent="No matches",h.append(g)}for(let g of m)h.append(kt(o,"option",{...g,selected:g.id===r.value},{hover:()=>T(g.id),pick:()=>K(g.id)}));T(m.some((g)=>g.id===_)?_:m[0]?.id??null)},x=()=>{let m=d;d=null,m?.(),p="",u.value="",i.setAttribute("aria-expanded","false")},w=()=>{if(d||r.disabled)return;if(_=r.value,u.placeholder=r.searchPlaceholder??"Search",r.searchable)E.prepend(f);else f.remove();A(),d=vt(n,i,E,x),i.setAttribute("aria-expanded","true"),b().focus()},K=(m)=>{if(x(),i.focus(),m!==r.value)r.onChange(m)},I=()=>{if(d)x();else w()},Q=(m)=>{if(!d&&Te(m))m.preventDefault(),w()},Z=(m)=>{let g=Te(m);if(g)m.preventDefault(),T(Re(O(),_,g));else if(m.key==="Enter"){if(m.preventDefault(),_)K(_)}else if(m.key==="Escape")m.preventDefault(),x(),i.focus();else if(r.searchable&&m.target!==u&&m.key.length===1&&!m.ctrlKey&&!m.metaKey)u.focus()},_e=()=>{p=u.value,A()},te=(m)=>{if(d&&!(m.relatedTarget instanceof Node&&n.contains(m.relatedTarget)))x()},W=()=>{H(s,r.label),s.hidden=!r.label;let m=r.options.find((g)=>g.id===r.value);if(H(c,m?.label??r.placeholder??"Select"),c.dataset.empty=m?"false":"true",i.disabled=Boolean(r.disabled),d)A()};return i.addEventListener("click",I),i.addEventListener("keydown",Q),E.addEventListener("keydown",Z),u.addEventListener("input",_e),n.addEventListener("focusout",te),W(),{update:(m)=>{r={...r,...m},W()},dispose:()=>{x(),i.removeEventListener("click",I),i.removeEventListener("keydown",Q),E.removeEventListener("keydown",Z),u.removeEventListener("input",_e),n.removeEventListener("focusout",te),n.remove()}}};var Jn=(e,t,r)=>{D(L);let o=t,n=le("oc-sdk oc-sdk-check");n.setAttribute("role",r);let s=y("span",r==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(r==="checkbox")s.append(me("check",12));let i=y("span","oc-sdk-check-text"),c=y("span","oc-sdk-check-label"),p=y("span","oc-sdk-check-desc");i.append(c,p),n.append(s,i),e.append(n);let _=()=>{n.setAttribute("aria-checked",o.checked?"true":"false"),n.disabled=Boolean(o.disabled),H(c,o.label),H(p,o.description),p.hidden=!o.description},d=()=>{if(!o.disabled)o.onChange(!o.checked)};return n.addEventListener("click",d),_(),{update:(E)=>{o={...o,...E},_()},dispose:()=>{n.removeEventListener("click",d),n.remove()}}},jr=(e,t)=>Jn(e,t,"checkbox"),Mt=(e,t)=>Jn(e,t,"switch");var Kr=(e,t)=>{D(L);let r=t,o=y("div","oc-sdk oc-sdk-tabs");o.setAttribute("role","tablist"),e.append(o);let n=()=>{Ae(o),o.dataset.track=r.trackBackground?"true":"false";for(let i of r.items){let c=le("oc-sdk-tab");c.setAttribute("role","tab");let p=i.id===r.activeId;c.setAttribute("aria-selected",p?"true":"false"),c.tabIndex=p?0:-1,c.dataset.id=i.id;let _=y("span");if(_.textContent=i.label,c.append(_),i.count!==void 0){let d=y("span","oc-sdk-tab-count");d.textContent=String(i.count),c.append(d)}c.addEventListener("click",()=>{if(i.id!==r.activeId)r.onChange(i.id)}),o.append(c)}},s=(i)=>{let c=Te(i,"horizontal");if(!c)return;let p=Re(r.items,r.activeId,c);if(p&&p!==r.activeId){i.preventDefault(),r.onChange(p);let _=o.querySelector(`[data-id="${CSS.escape(p)}"]`);if(_ instanceof HTMLElement)_.focus()}};return o.addEventListener("keydown",s),n(),{update:(i)=>{r={...r,...i},n()},dispose:()=>{o.removeEventListener("keydown",s),o.remove()}}};var Je=(e,t)=>{pe(e,"data-tone",t&&t!=="neutral"?t:null)},Wr=(e,t)=>{D(L);let r=t,o=y("span","oc-sdk oc-sdk-badge");e.append(o);let n=()=>{H(o,r.label),Je(o,r.tone)};return n(),{update:(s)=>{r={...r,...s},n()},dispose:()=>{o.remove()}}};var ji=0,zr=(e,t)=>{D(L);let r=t,o=`oc-sdk-list-${ji+=1}`,n=y("div","oc-sdk oc-sdk-list");n.setAttribute("role","listbox"),n.tabIndex=0,e.append(n);let s=null,i=(E)=>`${o}-${E}`,c=(E)=>{s=E;for(let f of Array.from(n.children))if(f instanceof HTMLElement)f.dataset.active=f.id===i(E??"")?"true":"false";pe(n,"aria-activedescendant",E?i(E):null),n.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},p=(E,f)=>{let u=y("span",E);return u.textContent=f,u},_=()=>{if(Ae(n),pe(n,"aria-label",r.ariaLabel),r.items.length===0){n.append(p("oc-sdk-list-empty",r.emptyText??"Nothing here")),c(null);return}for(let f of r.items){let u=le("oc-sdk-row");if(u.id=i(f.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",f.id===r.selectedId?"true":"false"),u.disabled=Boolean(f.disabled),u.tabIndex=-1,f.leading)u.append(p("oc-sdk-row-lead",f.leading));let h=y("span","oc-sdk-row-main");if(h.append(p("oc-sdk-row-title",f.title)),f.subtitle)h.append(p("oc-sdk-row-sub",f.subtitle));if(u.append(h),f.badge){let O=p("oc-sdk-badge",f.badge.label);Je(O,f.badge.tone),u.append(O)}if(f.meta)u.append(p("oc-sdk-row-meta",f.meta));u.addEventListener("click",()=>r.onSelect(f.id)),n.append(u)}let E=r.items.some((f)=>f.id===s&&!f.disabled);c(E?s:r.selectedId??null)},d=(E)=>{let f=Te(E);if(f){E.preventDefault(),c(Re(r.items,s,f));return}if((E.key==="Enter"||E.key===" ")&&s)E.preventDefault(),r.onSelect(s)};return n.addEventListener("keydown",d),_(),{update:(E)=>{r={...r,...E},_()},dispose:()=>{n.removeEventListener("keydown",d),n.remove()}}};var qr=(e,t)=>{D(L);let r=t,o=y("div","oc-sdk oc-sdk-empty"),n=y("h2","oc-sdk-empty-title"),s=y("p","oc-sdk-empty-body"),i=y("div","oc-sdk-empty-action");o.append(n,s,i),e.append(o);let c=null,p=()=>{if(H(n,r.title),H(s,r.body),s.hidden=!r.body,i.hidden=!r.action,!r.action){c?.dispose(),c=null;return}let _={label:r.action.label,onClick:r.action.onClick};if(c)c.update(_);else c=Oe(i,{..._,variant:"outline",size:"sm"})};return p(),{update:(_)=>{r={...r,..._},p()},dispose:()=>{c?.dispose(),c=null,o.remove()}}};var Yr=(e,t={})=>{D(L);let r=t,o=y("span","oc-sdk oc-sdk-spinner");o.setAttribute("role","status");let n=y("span","oc-sdk-spinner-ring");n.setAttribute("aria-hidden","true");let s=y("span");o.append(n,s),e.append(o);let i=()=>{o.dataset.size=r.size??"default",H(s,r.label),s.hidden=!r.label,o.setAttribute("aria-label",r.label??"Loading")};return i(),{update:(c)=>{r={...r,...c},i()},dispose:()=>{o.remove()}}};var Jr=(e,t)=>{D(L);let r=t,o=y("div","oc-sdk oc-sdk-banner"),n=y("div","oc-sdk-banner-text"),s=y("div","oc-sdk-banner-title"),i=y("div","oc-sdk-banner-body"),c=y("div","oc-sdk-banner-action");n.append(s,i),o.append(n,c),e.append(o);let p=null,_=()=>{if(o.dataset.tone=r.tone,o.setAttribute("role",r.tone==="error"||r.tone==="warning"?"alert":"status"),H(s,r.title),H(i,r.body),i.hidden=!r.body,c.hidden=!r.action,!r.action){p?.dispose(),p=null;return}let d={label:r.action.label,onClick:r.action.onClick};if(p)p.update(d);else p=Oe(c,{...d,variant:"outline",size:"xs"})};return _(),{update:(d)=>{r={...r,...d},_()},dispose:()=>{p?.dispose(),p=null,o.remove()}}};var Ki=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,Qr=(e,t)=>{D(L);let r=t,o=y("div","oc-sdk oc-sdk-progress"),n=y("div","oc-sdk-progress-label"),s=y("span"),i=y("span","oc-sdk-progress-value"),c=y("span"),p=me("check",14);i.append(p,c),n.append(s,i);let _=y("div","oc-sdk-progress-track");_.setAttribute("role","progressbar"),_.setAttribute("aria-valuemin","0"),_.setAttribute("aria-valuemax","100");let d=y("div","oc-sdk-progress-fill");_.append(d),o.append(n,_),e.append(o);let E=()=>{let f=Ki(r.value);if(Je(d,r.tone),d.style.transform=`scaleX(${f/100})`,_.setAttribute("aria-valuenow",String(f)),r.label)_.setAttribute("aria-label",r.label);else _.removeAttribute("aria-label");H(s,r.label),H(c,`${f}%`);let u=f===100&&(!r.tone||r.tone==="neutral");pe(o,"data-done",u?"true":null),p.style.display=u?"":"none",n.hidden=!r.label};return E(),{update:(f)=>{r={...r,...f},E()},dispose:()=>{o.remove()}}};var Qn=(e)=>e.filter((t)=>!("separator"in t)),Wi=0,Zr=(e,t)=>{D(L);let r=t,o=`oc-sdk-menu-${Wi+=1}`,n=y("div","oc-sdk oc-sdk-menu");e.append(n);let s=y("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,c=null,p=Oe(n,{label:r.label,variant:r.variant,size:r.size,onClick:()=>{if(i)f();else u()}}),_=n.querySelector("button");_?.setAttribute("aria-haspopup","menu");let d=(T)=>{c=T,Ct(s,s,o,T)},E=()=>{Ae(s);for(let T of r.items){if("separator"in T){let A=y("div","oc-sdk-separator");A.dataset.labeled="false",s.append(A);continue}s.append(kt(o,"menuitem",T,{hover:()=>d(T.id),pick:()=>h(T.id)}))}d(Qn(r.items).some((T)=>T.id===c)?c:null)},f=()=>{let T=i;i=null,T?.(),c=null,_?.setAttribute("aria-expanded","false")},u=()=>{if(i||!_)return;E(),i=vt(n,_,s,f),_.setAttribute("aria-expanded","true"),s.focus()},h=(T)=>{f(),_?.focus(),r.onSelect(T)},O=(T)=>{let A=Te(T);if(A)T.preventDefault(),d(Re(Qn(r.items),c,A));else if(T.key==="Enter"||T.key===" "){if(T.preventDefault(),c)h(c)}else if(T.key==="Escape")T.preventDefault(),f(),_?.focus()},b=(T)=>{if(i&&!(T.relatedTarget instanceof Node&&n.contains(T.relatedTarget)))f()};return s.addEventListener("keydown",O),n.addEventListener("focusout",b),{update:(T)=>{if(r={...r,...T},p.update({label:r.label,variant:r.variant,size:r.size}),i)E()},dispose:()=>{f(),s.removeEventListener("keydown",O),n.removeEventListener("focusout",b),p.dispose(),n.remove()}}};var P=Mr(),Ut=null,eo=new Set;P.onReady((e)=>{Ut=e,Ur(e,document.documentElement);for(let t of eo)t(e)});var Zn=()=>{let[e,t]=oe(Ut);return ne(()=>{if(eo.add(t),Ut)t(Ut);return()=>{eo.delete(t)}},[]),e};var es=(e,t)=>JSON.stringify({query:e,variables:t});class ae extends Error{kind;constructor(e,t){super(t);this.kind=e}}var re=async(e,t)=>{let r;try{r=await P.request({method:"POST",path:"/graphql",body:es(e,t)})}catch(n){if(n instanceof C){if(n.code==="DISCONNECTED"||n.code==="NO_INTEGRATION")throw new ae("disconnected","Linear is not connected.");throw new ae("network",n.message||"Could not reach Linear.")}throw new ae("network",n instanceof Error?n.message:"Could not reach Linear.")}let o;try{o=JSON.parse(r.body)}catch{throw new ae("network",`Linear answered with status ${r.status}.`)}if(r.status===401)throw new ae("disconnected","Linear sign-in expired.");if(o.errors?.length){let n=o.errors[0],s=n.extensions?.code==="RATELIMITED"||n.extensions?.type==="ratelimited";throw new ae(s?"rate-limited":"graphql",n.message)}if(!o.data)throw new ae("graphql","Linear returned no data.");return o.data};var ts=`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,rs=`
  query Teams {
    teams(first: 100) {
      nodes {
        id key name color icon cyclesEnabled triageEnabled issueEstimationType issueEstimationAllowZero issueEstimationExtended
        defaultIssueState { id }
        activeCycle { id number name startsAt endsAt progress isActive isFuture isPast completedAt }
      }
    }
  }
`,os=`
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { id name type color position team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`;var ns=`
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
`;var ss=`
  query StatusCounts($filter: IssueFilter, $after: String) {
    issues(first: 250, after: $after, filter: $filter) {
      nodes { state { id name type color position } team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,is=`
  query StatusMine($filter: IssueFilter) {
    issues(first: 50, filter: $filter) {
      nodes { id identifier title url priority updatedAt state { id name type color position } team { id key } project { id name } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,Qe=(e)=>`
  query IssuesByIdentifier {
    ${e.map((t,r)=>`i${r}: issue(id: ${JSON.stringify(t)}) { 
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
`;var as=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`;var cs=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`;var ls=`
  mutation CommentCreate($input: CommentCreateInput!) {
    commentCreate(input: $input) { success comment { id body createdAt url user { id name displayName avatarUrl avatarBackgroundColor } } }
  }
`;var ds=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,r)=>`n${r}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,Mm={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:Qe(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:ds(["n1","n2"])};var us=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ae&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ae&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."};var ps=async(e,t)=>{if(!(await re(ls,{input:{issueId:e.id,body:t}})).commentCreate.success)throw new ae("graphql","Linear did not save the comment.");sn(`issue:${e.identifier}`)};var zi=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return typeof t.id==="string"&&typeof t.identifier==="string"&&typeof t.body==="string"},qi=(e)=>Array.isArray(e?.drafts)?e.drafts.filter(zi):[],_s=async(e)=>{let t=await Ue(P,"GET","/drafts",{query:{directory:e},name:"Linear"});return t.ok===!1?[]:qi(t)},fs=async(e,t)=>{let r=await re(Qe([e.identifier])),o=Object.values(r).find((n)=>n!==null);if(!o)throw Error(`${e.identifier} was not found in Linear.`);await ps(o,t),await Ue(P,"POST","/drafts",{body:{id:e.id,action:"posted"},name:"Linear"})},Es=async(e)=>(await Ue(P,"POST","/drafts",{body:{id:e.id,action:"discard"},name:"Linear"})).ok!==!1;var ms={state:{type:{nin:["completed","canceled","duplicate"]}}};var Ss=(e,t,r=!1)=>{let o=[];if(e.length){let n=[...e].sort();o.push({team:r?{or:[{id:{in:n}},{ancestors:{some:{id:{in:n}}}}]}:{id:{in:n}}})}if(t.length)o.push({project:{id:{in:[...t].sort()}}});if(!o.length)return null;return o.length===1?o[0]:{or:o}},to=(...e)=>{let t=e.filter((r)=>Boolean(r));return t.length===1?t[0]:{and:t}},Ts={assigned:{assignee:{isMe:{eq:!0}}},created:{creator:{isMe:{eq:!0}}},subscribed:{subscribers:{some:{isMe:{eq:!0}}}}};var ro=(e,t=new Date)=>{if(!e)return"";let r=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(r.getTime()))return"";let o=r.getFullYear()===t.getFullYear();return r.toLocaleDateString("en-US",{month:"short",day:"numeric",...o?{}:{year:"numeric"}})},hs=(e,t=new Date)=>{if(!e)return null;let r=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(r.getTime()))return null;let o=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((r.getTime()-o)/86400000)};var Pt=(e)=>`${Math.floor(Math.max(0,Math.min(1,e))*100)}%`,oo={onTrack:"On track",atRisk:"At risk",offTrack:"Off track"},Nt={onTrack:"success",atRisk:"warning",offTrack:"error"};var gs=(e)=>{let t=e.trim().toLowerCase(),r=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(r){let n=r[1].length===3?r[1].split("").map((s)=>s+s).join(""):r[1];return[parseInt(n.slice(0,2),16),parseInt(n.slice(2,4),16),parseInt(n.slice(4,6),16)]}let o=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return o?[Number(o[1]),Number(o[2]),Number(o[3])]:null},ys=([e,t,r])=>{let o=(n)=>{let s=n/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*o(e)+0.7152*o(t)+0.0722*o(r)},Yi=(e,t)=>{let[r,o]=[ys(e),ys(t)].sort((n,s)=>s-n);return(r+0.05)/(o+0.05)};var As=(e,t)=>{let r=gs(e),o=gs(t);if(!r||!o||Yi(r,o)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Ji=5,no=null,Qi=new Map;var Os=(e,t)=>{let r=Qi.get(t);if(r!==void 0)return r;let o=no?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],n=o.findIndex((s)=>s.id===t);return n<0?0.5:(n+1)/(o.length+1)};var Zi=async()=>{let e=new Map,t=null;for(let r=0;r<Ji;r+=1){let o=await re(os,{after:t});for(let{team:n,...s}of o.workflowStates.nodes){let i=e.get(n.id)??[];i.push(s),e.set(n.id,i)}if(!o.workflowStates.pageInfo.hasNextPage)break;t=o.workflowStates.pageInfo.endCursor}for(let r of e.values())r.sort((o,n)=>o.position-n.position);return e},Rs=async()=>{let[e,t,r]=await Promise.all([re(ts).then((o)=>o.viewer),re(rs).then((o)=>o.teams.nodes),Zi()]);return t.sort((o,n)=>o.name.localeCompare(n.name)),no={viewer:e,teams:t,teamsById:new Map(t.map((o)=>[o.id,o])),myTeamIds:new Set(e.teams?.nodes.map((o)=>o.id)??[]),statesByTeam:r},no},xs="workspace",so=(e=!1)=>Pe(xs,Rs,e),bs=()=>Ce(xs,Rs);var Is=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),ea=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,r=7+3.8*Math.sin(t),o=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${r.toFixed(2)} ${o.toFixed(2)}z`},io=({type:e,color:t,size:r=14,fill:o,teamId:n,stateId:s})=>{let i=t||"currentColor",c=Me(()=>As(i,Is()),[i,Is()]),p={width:r,height:r,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return S("svg",{...p,children:[S("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),S("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return S("svg",{...p,children:S("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return S("svg",{...p,children:S("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let _=o??(n&&s?Os(n,s):0.5);return S("svg",{...p,children:[S("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this),S("path",{d:ea(_),fill:c},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return S("svg",{...p,children:[S("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),S("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return S("svg",{...p,children:[S("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),S("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}};var se=(e,t="inline-flex")=>(r)=>{let o=rn(e,r);return S("span",{ref:o,style:{display:t}},void 0,!1,void 0,this)},Ve=se(Oe),lS=se(wt),ks=se(Br,"block"),dS=se(Xr,"block"),uS=se(Kr),pS=se(Zr),_S=se(Wr),Lt=se(Yr),ao=se(Jr,"block"),fS=se(qr,"block"),Cs=se(Qr,"block"),ES=se(zr,"block"),mS=se(jr),SS=se(Mt),TS=se(Mt,"block"),hS=se(wt,"block");var ta="open-target",ra="ext:linear-dashboard";var co=async(e)=>{try{await P.storage.set(ta,{...e,at:Date.now()})}catch{return!1}try{return await P.openSurface(ra),!0}catch{return!1}};var vs=new Map,ws=(e)=>{for(let t of e)vs.set(t.id,t);return e},Ms=(e)=>vs.get(e);var Dt=async(e)=>{if(!e.length)return[];let t=await re(ns,{after:null,filter:{id:{in:[...e].sort()}}});return ws(t.projects.nodes)},Us=async(e)=>{let t=await re(cs,{term:e});return ws(t.searchProjects.nodes)};var Ps=(e)=>{let t=e.length?`projects:${[...e].sort().join(",")}`:null;return Ce(t,()=>Dt(e))};var Gt=(e)=>e===0?5:e;var Ns=(e)=>`${e.type}|${e.name}`;var oa={started:0,unstarted:1,triage:2,backlog:3},$t=(e)=>oa[e]??9,Ls=(e)=>{let t=new Map;for(let{state:r,team:o}of e){let n=Ns(r),s=t.get(n);if(s)s.count+=1;else t.set(n,{key:n,name:r.name,type:r.type,color:r.color,position:r.position,count:1,teamId:o.id,stateId:r.id})}return[...t.values()].sort((r,o)=>$t(r.type)-$t(o.type)||r.position-o.position||r.name.localeCompare(o.name))},na=6,Ds=(e,t=na)=>({shown:e.slice(0,t),hidden:e.slice(t)}),sa=5,Gs=(e,t=sa)=>[...e].sort((r,o)=>$t(r.state.type)-$t(o.state.type)||Gt(r.priority)-Gt(o.priority)||o.updatedAt.localeCompare(r.updatedAt)).slice(0,t),ia=(e,t=new Date)=>{let r=hs(e,t);if(r===null)return null;if(r<0)return"ended";if(r===0)return"ends today";return r===1?"1 day left":`${r} days left`},$s=(e,t,r=new Date)=>[t?`${t} cycle ${e.number}`:`Cycle ${e.number}`,Pt(e.progress),ia(e.endsAt,r)].filter(Boolean).join(" · ");var Ht={source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null,work:null},aa=(e)=>{let t=2166136261;for(let r=0;r<e.length;r+=1)t^=e.charCodeAt(r),t=Math.imul(t,16777619)>>>0;return t.toString(36)},Ze=(e)=>e.replace(/\/+$/,""),lo=(e)=>Ze(e).split("/").pop()??"",ca=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,la=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),r=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(r)return{host:r[1].toLowerCase(),path:r[2]};let o=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(o)return{host:o[1].toLowerCase(),path:o[2]};return null},da=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],r=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],o=t??r;return o?la(o):null},ua=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let r=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(r)return{host:r[1].toLowerCase(),path:r[2]};return null},pa=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,Xs=async(e,t)=>{let r=Ze(t),o=(await e.listProjects().catch(()=>{return}))?.projects??[],n=o.find((f)=>Ze(f.directory)===r)??null,s=null;for(let f of n?[n]:o){let h=((await e.listWorktrees(f.id).catch(()=>{return}))?.worktrees??[]).find((O)=>Ze(O.directory)===r);if(h){n=f,s=h.branch||null;break}}if(!s)s=ca(await e.readFile(".git/HEAD"));let i=n?`p:${n.id}`:`d:${aa(r)}`,p=[...n?(await e.listSessions(n.id).catch(()=>{return}))?.sessions??[]:[]].sort((f,u)=>u.updatedAt-f.updatedAt),_=[],d=null;for(let f of p){for(let u of f.links??[]){let h=u.url.match(pa)?.[1]?.toUpperCase();if(h&&!_.includes(h))_.push(h);if(!d&&u.kind==="change")d=ua(u.url)}for(let u of f.items){let h=u.data,O=typeof h?.identifier==="string"?h.identifier.toUpperCase():null;if(O&&!_.includes(O))_.push(O)}}let E=da(await e.readFile(".git/config"));if(E)await e.setRepo(i,E).catch(()=>{return});else E=await e.getRepo(i).catch(()=>null)??d;return{key:i,ocProjectId:n?.id??null,projectDirectory:n?Ze(n.directory):r,directory:r,branch:s,repo:E,linkedIssues:_.slice(0,20)}},_a=(e,t)=>{let r=[];for(let o of e.matchAll(/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6})-(\d+)(?![A-Za-z0-9])/g)){let n=o[1].toUpperCase(),s=`${n}-${o[2]}`;if(t.has(n)&&!r.includes(s))r.push(s)}return r},et=(e)=>e.toLowerCase().replace(/[^a-z0-9]/g,""),Hs=new Set(["api","app","apps","web","ui","service","services","svc","server","client","helm","chart","charts","terraform","tf","infra","argo","deploy","config","lib","libs","sdk","core","backend","frontend","mobile","ios","android","worker"]),fa=(e)=>{let t=[],r=(i,c,p)=>{if(et(i).length>=2&&!t.some((_)=>et(_.text)===et(i)))t.push({text:i,weight:c,label:p})},o=lo(e.projectDirectory),n=e.repo?lo(e.repo.path):"";if(r(o,1,`folder name "${o}"`),n)r(n,1,`repository "${n}"`);for(let i of[o,n].join("-").split(/[-_.\s]+/))if(i.length>=2&&!Hs.has(i.toLowerCase()))r(i,0.8,`the word "${i}" in the repository name`);let s=e.repo?e.repo.path.split("/").slice(0,-1).reverse():[];for(let i of s)if(!Hs.has(i.toLowerCase()))r(i,0.7,`repository group "${i}"`);return t},Ea=(e,t)=>{let r=et(e),o=et(t);if(r.length<3||o.length<3)return 0;if(r===o)return 3;if(r.startsWith(o)||o.startsWith(r))return 2;if(r.includes(o)||o.includes(r))return 1;return 0};var Vs=(e,t)=>{let r=null;for(let o of t)for(let n of e){let s=Ea(o.name,n.text)*n.weight;if(o.key&&o.key.toLowerCase()===n.text.toLowerCase()&&o.key.length>=2)s=Math.max(s,2.5*n.weight);if(s>=1.4&&(!r||s>r.score))r={item:o,score:s,label:n.label}}return r},ma=(e)=>e.status.type!=="completed"&&e.status.type!=="canceled";var Sa=async(e,t,r)=>{let o=t.branch?_a(t.branch,r).slice(0,3):[],n=t.linkedIssues.slice(0,1),s=[...o,...n.filter((c)=>!o.includes(c))];if(!s.length)return null;let i=await e.issuesByIdentifier(s).catch(()=>[]);for(let c of s){let p=i.find((_)=>_.identifier===c);if(p)return{identifier:p.identifier,title:p.title,url:p.url,teamKey:p.team.key,projectName:p.project?.name??null,from:o.includes(c)?"branch":"session"}}return null},Fs=(...e)=>e.flatMap((t)=>Array.isArray(t)?t:t===void 0?[]:[t]).filter((t)=>typeof t==="string"),Bs=(e)=>[...new Set(e)],Ta=async(e,t,r)=>{let o;try{o=JSON.parse(t)}catch{return null}let n=Fs(o.teams,o.team).map((i)=>r.find((c)=>c.id===i||c.key.toLowerCase()===i.toLowerCase())?.id).filter((i)=>Boolean(i)),s=[];for(let i of Fs(o.projects,o.project)){let c=i.trim(),p=c.match(/linear\.app\/[^/]+\/project\/([^/?#]+)/i)?.[1]?.split("-").pop(),d=(await e.projectsByIds([p??c]).catch(()=>[]))[0]??(await e.searchProjects(c).catch(()=>[])).find((E)=>E.name.toLowerCase()===c.toLowerCase());if(d)s.push(d.id)}return n.length||s.length?{teamIds:Bs(n),projectIds:Bs(s)}:null},js=async(e,t,r)=>{let o=new Set(r.map((E)=>E.key.toUpperCase())),n=await Sa(e,t,o),s=(E)=>({...E,work:n}),i=await e.getMapping(t.key);if(i&&(i.linearProjectIds.length||i.teamIds.length))return s({source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:i.teamIds,projectIds:i.linearProjectIds,mapping:i});let c=await e.readFile(".linear.json");if(c){let E=await Ta(e,c,r);if(E)return s({source:"config",inferred:!1,evidence:".linear.json",...E,mapping:null})}if(t.repo){let E=await e.repoAttachments(`${t.repo.host}/${t.repo.path}/`).catch(()=>[]),f=new Map;for(let O of E)if(O.issue)f.set(O.issue.id,{team:O.issue.team.id,project:O.issue.project?.id??null});let u=new Map;for(let{team:O}of f.values())u.set(O,(u.get(O)??0)+1);let h=[...u.entries()].sort((O,b)=>b[1]-O[1])[0];if(h&&h[1]>=3){let O=new Map;for(let{team:A,project:x}of f.values())if(A===h[0]&&x)O.set(x,(O.get(x)??0)+1);let b=[...O.entries()].sort((A,x)=>x[1]-A[1])[0],T=b&&b[1]>=3&&b[1]/h[1]>=0.6?[b[0]]:[];return s({source:"repo",inferred:!0,evidence:`${h[1]} issues with merge requests in ${lo(t.repo.path)}`,teamIds:[h[0]],projectIds:T,mapping:null})}}let p=fa(t),_=Vs(p,r);if(_)return s({source:"name",inferred:!0,evidence:_.label,teamIds:[_.item.id],projectIds:[],mapping:null});let d=p[0]?.text;if(d){let E=(await e.searchProjects(d).catch(()=>[])).filter(ma),f=Vs(p,E);if(f)return s({source:"name",inferred:!0,evidence:f.label,teamIds:[],projectIds:[f.item.id],mapping:null})}return s({source:"none",inferred:!1,evidence:"",teamIds:[],projectIds:[],mapping:null})};var uo=async(e)=>{try{let t=await P.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},Ks=async(e,t)=>{try{return await P.storage.set(e,t),!0}catch{return!1}},Ws=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),zs=async(e)=>{let t=await uo(`map:${e}`);return Ws(t)?t:null},po=async(e,t)=>{let r=await Ks(`map:${e}`,t);return Js(),r},qs=async(e)=>{try{await P.storage.delete(`map:${e}`)}catch{}Js()},_o=async(e)=>{let t=await uo(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},Ys=async(e,t)=>{let r=await _o(e);if(r?.host!==t.host||r.path!==t.path)await Ks(`repo:${e}`,t)};var Js=async()=>{let e=[];try{e=await P.storage.keys()??[]}catch{return}let t={};for(let r of e.filter((o)=>o.startsWith("map:"))){let o=await uo(r);if(Ws(o)&&o.directory)t[o.directory]=o}await Ue(P,"PUT","/config",{body:{directories:t},name:"Linear"})};var ha=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,Qs={listProjects:()=>P.listProjects(),listWorktrees:(e)=>P.listWorktrees(e),listSessions:(e)=>P.listSessions(e),readFile:(e)=>P.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:zs,getRepo:_o,setRepo:Ys,issuesByIdentifier:async(e)=>{let t=e.filter((o)=>ha.test(o));if(!t.length)return[];let r=await re(Qe(t));return Object.values(r).filter((o)=>Boolean(o))},repoAttachments:async(e)=>(await re(as,{url:e})).attachments.nodes,searchProjects:Us,projectsByIds:Dt},fo=(e,t)=>e.teamsById.get(t)?.name??Ms(t)?.name??"Unknown",Zs=(e,t)=>{let[r,o]=oe(null),[n,s]=oe(Ht),[i,c]=oe(!1),[p,_]=oe(0),d=Ee(0);ne(()=>{c(!1)},[e]),ne(()=>{if(!t)return;let T=++d.current;if(!e){o(null),s(Ht),c(!0);return}(async()=>{let A=await Xs(Qs,e),x=await js(Qs,A,t.teams).catch(()=>Ht);if(T!==d.current)return;let w=x.teamIds.filter((Q)=>t.teamsById.has(Q)),K=x.projectIds.length?await Dt(x.projectIds).catch(()=>[]):[],I=x.projectIds.filter((Q)=>K.some((Z)=>Z.id===Q));if(T!==d.current)return;o(A),s({...x,teamIds:w,projectIds:I}),c(!0)})()},[e,t,p]);let E=ke(()=>_((T)=>T+1),[]),f=ke(async(T,A)=>{if(!r)return!1;let x=[...T,...A],w=n.mapping?.activeProjectId,K={directory:r.projectDirectory,linearProjectIds:A,teamIds:T,activeProjectId:x.length===1?x[0]:w&&x.includes(w)?w:x[0]??"all",finishComments:n.mapping?.finishComments??"off",updatedAt:Date.now()};s((Q)=>({...Q,source:"mapping",inferred:!1,evidence:"saved for this folder",teamIds:T,projectIds:A,mapping:K}));let I=await po(r.key,K);if(!I)await Se(P,"error","Could not save this folder's choice. It applies until you reload.");return I},[r,n]),u=ke(async()=>{if(!await f(n.teamIds,n.projectIds))return;let T=t?[...n.teamIds,...n.projectIds].map((A)=>fo(t,A)).join(", "):"";await Se(P,"success",T?`Pinned ${T} to this folder`:"Pinned to this folder")},[f,n,t]),h=ke(async()=>{if(!r)return;await qs(r.key),E()},[r,E]),O=ke((T)=>{if(!r||!n.mapping)return;let A={...n.mapping,activeProjectId:T,updatedAt:Date.now()};s((x)=>({...x,mapping:A})),po(r.key,A)},[r,n]),b=n.teamIds.length+n.projectIds.length>0;return{place:r,detection:n,settled:i,mapped:b,refresh:E,save:f,pin:u,clear:h,setActive:O}};var ga={state:{type:{in:["triage","unstarted","started"]}}},ya=4,Aa=async(e)=>{let t=to(ga,e),r=[],o=null;for(let n=0;n<ya;n+=1){let s=await re(ss,{filter:t,after:o});if(r.push(...s.issues.nodes),!s.issues.pageInfo.hasNextPage)return{nodes:r,capped:!1};o=s.issues.pageInfo.endCursor}return{nodes:r,capped:!0}},Oa=async(e)=>{let t=await re(is,{filter:to(ms,Ts.assigned,e)});return{issues:t.issues.nodes,more:t.issues.pageInfo.hasNextPage}},ei=(e)=>Ce(e?`status-counts:${JSON.stringify(e)}`:null,()=>Aa(e)),ti=(e)=>Ce(e?`status-mine:${JSON.stringify(e)}`:null,()=>Oa(e)),ri=(e)=>Ce(e?`status-drafts:${e}`:null,()=>_s(e));var Ra=3,xa=2,ni="refresh",Eo=new Set;P.onStatusControl((e)=>{if(e.id===ni)for(let t of Eo)t()});var ba=(e)=>{let t=[...e.detection.teamIds,...e.detection.projectIds],r=e.detection.mapping?.activeProjectId??t[0]??"all";return r==="all"||!t.includes(r)?t:[r]},oi=(e)=>e.targetDate?`target ${ro(e.targetDate)}`:"no target date",Ia=({projects:e})=>{if(e.length===1){let t=e[0],r=t.health?Nt[t.health]:void 0;return S("div",{class:"lin-status-block",children:[S(Cs,{label:t.name,value:t.progress*100,tone:r},void 0,!1,void 0,this),S("div",{class:"sui-row sui-small sui-muted",children:[t.health&&S(nr,{tone:Nt[t.health]},void 0,!1,void 0,this),S("span",{children:[t.health?oo[t.health]:t.status.name,oi(t)].join(" · ")},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)}return S("div",{class:"lin-status-block",children:e.slice(0,Ra).map((t)=>S("div",{class:"lin-status-project",title:`${t.name}: ${t.health?oo[t.health]:t.status.name}, ${oi(t)}`,children:[S(nr,{tone:t.health?Nt[t.health]:"muted"},void 0,!1,void 0,this),S("span",{class:"lin-ellipsis sui-grow",children:t.name},void 0,!1,void 0,this),S("span",{class:"sui-muted sui-small",children:Pt(t.progress)},void 0,!1,void 0,this),S("span",{class:"sui-muted sui-small lin-status-date",children:t.targetDate?ro(t.targetDate):""},void 0,!1,void 0,this)]},t.id,!0,void 0,this))},void 0,!1,void 0,this)},ka=(e,t,r)=>{let o=new Set(t.filter((n)=>e.teamsById.has(n)));for(let n of r)for(let s of n.teams.nodes)o.add(s.id);return[...o].map((n)=>e.teamsById.get(n)).filter((n)=>Boolean(n?.activeCycle))},Ca=({issue:e,onOpen:t})=>S("div",{class:"lin-status-line",role:"button",tabIndex:0,"data-issue":e.identifier,title:`${e.identifier} ${e.title} (${e.state.name})`,onClick:t,onKeyDown:(r)=>{if(r.key==="Enter")t()},children:[S(io,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:13},void 0,!1,void 0,this),S("span",{class:"sui-mono sui-muted lin-status-key",children:e.identifier},void 0,!1,void 0,this),S("span",{class:"lin-ellipsis sui-grow",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),va=({draft:e,onDone:t})=>{let[r,o]=oe(!1),[n,s]=oe(e.body),[i,c]=oe(null),p=async()=>{c("post");try{await fs(e,n),await Se(P,"success",`Posted the summary on ${e.identifier}`),t()}catch(d){await Se(P,"error",`Could not post on ${e.identifier}: ${us(d)}`),c(null)}},_=async()=>{if(c("discard"),await Es(e))t();else await Se(P,"error","Could not discard the draft. Try again."),c(null)};return S("div",{class:"lin-status-draft","data-draft":e.id,children:[S("div",{class:"lin-status-line",role:"button",tabIndex:0,"aria-expanded":r,onClick:()=>o(!r),onKeyDown:(d)=>{if(d.key==="Enter")o(!r)},children:[S("span",{class:"lin-ellipsis sui-grow",title:e.sessionTitle,children:["Summary ready for ",S("span",{class:"sui-mono lin-status-ref",children:e.identifier},void 0,!1,void 0,this)]},void 0,!0,void 0,this),S("span",{class:"lin-status-actions",onClick:(d)=>d.stopPropagation(),children:[S(Ve,{label:"Post",size:"xs",loading:i==="post",disabled:i!==null||!n.trim(),onClick:()=>{p()}},void 0,!1,void 0,this),S(Ve,{label:"Discard",variant:"ghost",size:"xs",loading:i==="discard",disabled:i!==null,onClick:()=>{_()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),r&&S(ks,{value:n,onChange:s,multiline:!0,rows:5,disabled:i!==null},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Vt=({children:e,action:t})=>S("div",{class:"sui-row",children:[S("span",{class:"sui-muted sui-grow",children:e},void 0,!1,void 0,this),t&&S(Ve,{label:t.label,variant:"outline",size:"xs",onClick:t.onClick},void 0,!1,void 0,this)]},void 0,!0,void 0,this),wa=({directory:e,workspace:t,state:r})=>{let o=ba(r),n=o.filter((I)=>t.teamsById.has(I)),s=o.filter((I)=>!t.teamsById.has(I)),i=Ss(n,s),c=Ps(s),p=ei(i),_=ti(i),d=ri(e),[E,f]=oe(new Set),u=r.place?.key??"",h=ka(t,o,c.data??[]).slice(0,xa),O=Me(()=>Ds(Ls(p.data?.nodes??[])),[p.data]),b=Me(()=>Gs(_.data?.issues??[]),[_.data]),T=(d.data??[]).filter((I)=>!E.has(I.id)),A=async(I)=>{if(!await co({placeKey:u,issue:I}))await Se(P,"info",`Open the Linear panel to see ${I}.`)},x=s.length>0&&c.loading&&!c.data||p.loading&&!p.data||_.loading&&!_.data,w=[c.error,p.error,_.error].find((I)=>I!==void 0&&I!==null),K=[c.data?.length?"project":"",h.length?"cycle":"",O.shown.length?"chips":"",b.length?"mine":"",T.length?"drafts":""].filter(Boolean);return S(Ie,{children:[r.detection.inferred&&S("div",{class:"lin-status-hint sui-small",children:[S("span",{class:"sui-muted sui-grow lin-ellipsis",title:`Detected from ${r.detection.evidence}`,children:[Ma(t,r)," (detected from ",r.detection.evidence,")"]},void 0,!0,void 0,this),S(Ve,{label:"Pin",variant:"outline",size:"xs",onClick:()=>{r.pin()}},void 0,!1,void 0,this)]},void 0,!0,void 0,this),c.data?.length?S(Ia,{projects:c.data},void 0,!1,void 0,this):null,h.map((I)=>S("div",{class:"sui-small",children:$s(I.activeCycle,h.length>1?I.key:null)},I.id,!1,void 0,this)),O.shown.length>0&&S("div",{class:"sui-row",children:[O.shown.map((I)=>S(tn,{children:[S(io,{type:I.type,color:I.color,teamId:I.teamId,stateId:I.stateId,size:12},void 0,!1,void 0,this),I.count," ",I.name]},I.key,!0,void 0,this)),O.hidden.length>0&&S("span",{class:"sui-muted sui-small",title:O.hidden.map((I)=>`${I.count} ${I.name}`).join(", "),children:["+",O.hidden.length," more"]},void 0,!0,void 0,this),p.data?.capped&&S("span",{class:"sui-muted sui-small",children:["counted the first ",p.data.nodes.length.toLocaleString("en-US")]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),b.length>0&&S("div",{class:"lin-status-block",children:[S("div",{class:"lin-subheading",children:["My issues",_.data?.more?" (first 50)":""]},void 0,!0,void 0,this),b.map((I)=>S(Ca,{issue:I,onOpen:()=>{A(I.identifier)}},I.id,!1,void 0,this))]},void 0,!0,void 0,this),T.map((I)=>S(va,{draft:I,onDone:()=>{f((Q)=>new Set(Q).add(I.id)),d.refresh()}},I.id,!1,void 0,this)),x&&!K.length&&S(Lt,{size:"sm",label:"Loading Linear"},void 0,!1,void 0,this),w!==void 0&&!K.length&&S(Ua,{error:w},void 0,!1,void 0,this),!x&&w===void 0&&!K.length&&S(Vt,{children:"Nothing open for this folder in Linear."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Ma=(e,t)=>[...t.detection.teamIds,...t.detection.projectIds].map((r)=>fo(e,r)).join(", "),Ua=({error:e})=>S(ao,{tone:"error",title:"Could not load Linear",body:e instanceof Error?e.message:String(e)},void 0,!1,void 0,this),si=()=>{let e=Zn(),t=bs(),r=e?.directory??null,o=Zs(r,t.data),n=Ee(null),[s,i]=oe(!1);ne(()=>{let d=n.current;if(!d)return;let E=new ResizeObserver(()=>{P.setHeight(Math.ceil(d.getBoundingClientRect().height)).catch(()=>{return})});return E.observe(d),()=>E.disconnect()},[]);let c=ke(()=>{qe(""),so(!0).catch(()=>{return}),o.refresh()},[o.refresh]),p=Ee(c);p.current=c,ne(()=>{let d=()=>p.current();return Eo.add(d),()=>{Eo.delete(d)}},[]),ne(()=>{if(!e?.features?.statusControls){i(!1);return}let d=()=>P.setStatusControls([{kind:"button",id:ni,label:"Refresh"}]).then(()=>i(!0),()=>i(!1));return d(),P.onDirectory(()=>{d()})},[e?.features?.statusControls]),ne(()=>{let d=setInterval(()=>{if(document.visibilityState!=="visible")return;qe("status-"),qe("projects:"),so(!0).catch(()=>{return})},60000);return()=>clearInterval(d)},[]);let _=(()=>{if(!e)return S(Lt,{size:"sm",label:"Loading"},void 0,!1,void 0,this);if(!r)return S(Vt,{children:"Open a project to see its Linear work."},void 0,!1,void 0,this);if(t.error&&!t.data){let d=t.error instanceof ae?t.error:new ae("network",String(t.error));return d.kind==="disconnected"?S(Vt,{action:{label:"Connect",onClick:()=>{P.oauthStart()}},children:"Linear is not connected."},void 0,!1,void 0,this):S(ao,{tone:"error",title:"Could not load Linear",body:d.message,action:{label:"Retry",onClick:()=>t.refresh()}},void 0,!1,void 0,this)}if(!t.data||!o.settled)return S(Lt,{size:"sm",label:"Loading Linear"},void 0,!1,void 0,this);if(!o.mapped)return S(Vt,{action:{label:"Pick",onClick:()=>{Pa(o.place?.key??"")}},children:"Pick a Linear project"},void 0,!1,void 0,this);return S(wa,{directory:r,workspace:t.data,state:o},void 0,!1,void 0,this)})();return S("div",{class:"lin-status",ref:n,children:[_,!s&&e&&r&&o.settled&&S("div",{class:"lin-status-refresh",children:S(Ve,{label:"Refresh",variant:"ghost",size:"xs",onClick:c},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Pa=async(e)=>{if(!await co({placeKey:e,view:"picker"}))await Se(P,"info","Open the Linear panel to pick a project.")};Ho(S(si,{},void 0,!1,void 0,this),document.getElementById("root"));})();

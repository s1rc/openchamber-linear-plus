(()=>{var x="openchamber.sdk",y=1;var ut=`
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
`;function bo(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",(i)=>{let s=i.target===e?t:i.target;if(!(s instanceof Element))return;if(!s.hasAttribute("data-oc-scrolling"))s.setAttribute("data-oc-scrolling","");let a=o.get(s);if(a!==void 0)clearTimeout(a);o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var an=`(${bo.toString()})(document);`;var pt=128,_t=65536;var we=128;var Pe=65536;var vo=/^[a-z][a-z0-9-]{0,39}$/;var ko=(e)=>Object(e)===e&&!Array.isArray(e),Et=(e,t)=>Object.keys(e).every((o)=>t.includes(o)),Co=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Uo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Mo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!ko(o)||!vo.test(o.id)||!Co(o.label))return!1;if(o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1)return!1;if(t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Et(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Et(o,["kind","id","label","value","options","disabled"]))return!1;if(!Uo(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let i=new Set;for(let s of o.options){if(!ko(s)||!Et(s,["value","label"])||!Uo(s.value)||!Co(s.label)||i.has(s.value))return!1;i.add(s.value)}if(!i.has(o.value))return!1}return!0};var No=["{id}","{segment}","{segments+}"];var fs=new Set(No);var wo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Ts=new Set(wo);var Le=20000000,De=256;var ft=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Po=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var Lo=/^[A-Za-z0-9_-]{1,80}$/;var Do=["left","right","top","bottom"];var $o=(e,t=0,o={remaining:16000})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of i)if(!$o(s,t+1,o))return!1;return!0},St=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(St);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(St)}return String(e)===e||Number.isFinite(e)},Tt=(e)=>{try{if(String(e.id)!==e.id||!Lo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Do.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!$o(e.data)||!St(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ht=2000;var Ho=["file","directory","other","missing"],At=(e)=>Boolean(e&&"sessionId"in e),gt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Vo=/^[0-9a-f]{7,64}$/i,Ot=(e)=>Vo.test(e),$e=500,Ge=32000,Xo=16000,Bo=128,Fo=200,jo=2000,Ko=16000,Wo=80,zo=200,qo=16000;var Jo=2000;var Rt=20000,He=1024,Ve=2000000;var Xe=64000,Be=8000,xt=4000;var yt=960000;var Yo=999,Qo=1e4,be=500,Zo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],er=["stopped","starting","ready","failed"],dn=new Set(Zo),tr=(e)=>dn.has(e),or=(e)=>e&&tr(e)?e:"HOST_REJECTED",Ae=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Ae);if(Object(e)===e)return Object.values(e).every(Ae);return!1},rr=(e)=>Ae(e)&&JSON.stringify(e).length<=qo,Go=(e)=>e?.trim().slice(0,zo)??"",ge=(e)=>{let t=e.id.trim().slice(0,Bo),o=e.title.trim().slice(0,Fo),i=e.url.trim().slice(0,jo),s=e.text?.trim().slice(0,Ko),a=e.author?.trim().slice(0,Wo),d=e.kind==="pull"?"pull":"issue",l={providerId:e.providerId.trim(),id:t,title:o||t,url:i,kind:d};if(s)l.text=s;if(a)l.author=a;if(d==="pull"){let T=Go(e.branches?.head),R=Go(e.branches?.base);if(T&&R)l.branches={head:T,base:R}}if(rr(e.data))l.data=e.data;return l},It=(e)=>{let t=ge(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},bt=(e)=>{let t={text:e.text.trim().slice(0,Xo)};if(e.send)t.send=!0;return t},kt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Yo,Math.max(0,Math.round(e)))},Ct=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Qo,Math.max(0,Math.ceil(e)))};var Oe=(e)=>e.length>0&&e.length<=He&&!e.includes("\x00")&&!e.includes("\\");var Fe=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Jo)return!1;return!e.split("/").some((o)=>o==="."||o==="..")},ln=new Set(er),Ut=(e)=>Boolean(e&&"status"in e&&ln.has(String(e.status))&&!("body"in e)),je=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),vt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Mt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Nt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),un=new Set(Ho),wt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&un.has(String(e.kind))&&Number.isFinite(e.size)),Pt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),pn=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),_n=(e)=>Object(e)===e?e:null,mt=(e)=>String(e)===e&&e.length>0,En=(e)=>{if(!mt(e.id))return null;if(e.ok===!0){let t={channel:x,v:y,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&mt(e.error))return{channel:x,v:y,type:"result",id:e.id,ok:!1,error:e.error,code:or(mt(e.code)?e.code:void 0)};return null},Lt=(e)=>{let t=_n(e);if(!t||t.channel!==x||t.v!==y)return null;if(t.type==="result")return En(t);if(!pn.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var nr=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),fn=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class m extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var sr=()=>Promise.reject(new m("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ke=()=>Promise.reject(new m("BAD_PATH",`File path must be 1 to ${He} characters without NUL or backslash.`)),We=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new m("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},h=(e)=>(e.value+=1,`oc-${e.value}`),Dt=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new m("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??((r)=>r===t.parent),i=e.requestTimeoutMs??Rt,s=new Set,a=new Set,d=new Set,l=new Set,T=new Set,R=new Set,u=new Set,g=new Set,A=new Set,c=new Set,f=new Set,I=new Set,b=[],k=null,O=null,w=new Set,C=new Set,re=null,le=null,ue=!1,W=new Map,ne=new Map,F=new Map,X=!1,E={value:0},p=null,se=null,ye=!1,Ie=!1,fo=null,So=(r)=>{if(!r)return null;return{sessionId:r.id,phase:r.busy?"started":"completed"}},Q=(r)=>{t.parent.postMessage(r,"*")},To=()=>{if(X||t.parent===t||I.size===0||p?.features?.lateGenerateResults!==!0)return;Q({channel:x,v:y,type:"generate-late-listen"})},P=(r,n)=>{for(let _ of r)try{_(n)}catch(S){console.error(S)}},mo=(r)=>{if(!(r instanceof MessageEvent))return;if(!o(r.source))return;let n=Lt(r.data);if(!n)return;if(n.type==="workspace"){let S=ne.get(n.payload.subscriptionId);if(S)P([S],n.payload.snapshot);return}if(n.type==="shells"){let S=F.get(n.payload.subscriptionId);if(S)P([S],n.payload.snapshot);return}if(n.type==="ready"){if(p=n.payload,se=So(n.payload.session),P(s,n.payload),P(a,n.payload.directory),P(d,n.payload.session),se)P(l,se);if(P(T,n.payload.connection),P(R,n.payload.settings),P(u,n.payload.item),n.payload.block)P(g,n.payload.block);To();return}if(n.type==="service-event"){P(A,n.payload);return}if(n.type==="generate-late"){if(I.size===0)b.push(n.payload);else P(I,n.payload);return}if(n.type==="directory"){if(p)p={...p,directory:n.payload.directory};P(a,n.payload.directory);return}if(n.type==="session"){if(p)p={...p,session:n.payload.session};if(!n.payload.session)se=null;else if(se?.sessionId!==n.payload.session.id)se=So(n.payload.session);P(d,n.payload.session);return}if(n.type==="session-lifecycle"){se=n.payload,P(l,n.payload);return}if(n.type==="connection"){if(p)p={...p,connection:n.payload.connection};P(T,n.payload.connection);return}if(n.type==="settings"){if(p)p={...p,settings:n.payload.settings};P(R,n.payload.settings);return}if(n.type==="item"){if(p)p={...p,item:n.payload.item};P(u,n.payload.item);return}if(n.type==="status-control-event"){P(c,n.payload);return}if(n.type==="popover-closed"){P(f,n.payload);return}if(n.type==="action"){let S=(U)=>{if(!X)Q({channel:x,v:y,type:"action-result",id:n.id,payload:U})},v=O;if(!v){S({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>v(n.payload)).then(()=>S({ok:!0}),(U)=>{let V=(U instanceof Error?U.message:String(U)).trim();S({ok:!1,error:(V||"Action failed.").slice(0,be)})});return}if(n.type==="file-open"){let S=n.payload;if(le&&Po(le,S))return;le=S,P(w,n.payload);return}if(n.type==="file-saved"){P(C,n.payload.version);return}if(n.type==="file-snapshot"){let S=(V)=>{if(!X)Q({channel:x,v:y,type:"file-snapshot-result",id:n.id,payload:V})},v=(V)=>S({error:(V.trim()||"Could not read the edited file.").slice(0,be)}),U=re;if(!U){v("This extension does not edit files.");return}Promise.resolve().then(()=>U(n.payload.purpose)).then((V)=>{if(ft(V)>Le){v(`The file is over ${Le} ${"bytes"in V?"bytes":"characters"}.`);return}if(V.version.length>De){v(`The snapshot version is over ${De} characters.`);return}S({snapshot:"bytes"in V?{bytes:V.bytes,version:V.version}:{content:V.content,version:V.version}})},(V)=>v(V instanceof Error?V.message:String(V)));return}if(n.type==="resolve"){let S=(U)=>{Q({channel:x,v:y,type:"resolve-result",id:n.id,payload:U})},v=k;if(!v){S({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>v(n.payload)).then((U)=>S({item:U?ge(U):null}),(U)=>{let V=(U instanceof Error?U.message:String(U)).trim();S({error:(V||"Command failed.").slice(0,be)})});return}let _=W.get(n.id);if(!_)return;if(clearTimeout(_.timer),W.delete(n.id),n.ok){_.resolve(n.payload);return}_.reject(new m(n.code,n.error))};t.addEventListener("message",mo),Q({channel:x,v:y,type:"hello"});let j=(r,n=i)=>{if(X||t.parent===t)return Promise.reject(new m("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((_,S)=>{let v=setTimeout(()=>{W.delete(r.id),S(new m("HOST_TIMEOUT","Host did not answer in time."))},n);W.set(r.id,{resolve:_,reject:S,timer:v}),Q(r)})},G=(r)=>j(r).then(()=>{return}),H={channel:x,v:y},ct=(r)=>{if(!X&&t.parent!==t)Q(r)},ho=()=>ct({...H,type:"file-save"}),Ao=(r)=>{if(!nr(r)||!fn(r))return;r.preventDefault(),ho()},go=(r)=>{if(!nr(r)||r.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;r.preventDefault(),yo(p.popover.id,"escape").catch(()=>{return})},ve=()=>{let r=p?.surface==="popover"?p.popover:void 0;if(!r)return;let n=ye||Ie;if(fo===n)return;fo=n,Io(r.id,n).catch(()=>{return})},Me=()=>{if(p?.surface!=="popover"||ye)return;ye=!0,ve()},Oo=(r)=>{if(p?.surface!=="popover"||r.relatedTarget!==null||!ye)return;ye=!1,ve()},Ro=()=>{if(p?.surface!=="popover"||Ie)return;Ie=!0,ve()},xo=()=>{if(p?.surface!=="popover"||!Ie)return;Ie=!1,ve()},ee=(r,n=1024)=>{if(!r.trim()||r.length>n)throw new m("HOST_REJECTED",`Identity must contain 1 to ${n} characters.`)},dt=async(r)=>{if(r.kind!=="projects")ee(r.projectId);let n=await j({...H,type:"workspace-read",id:h(E),payload:r});if(!n||!("kind"in n)||!("state"in n)||n.kind!==r.kind)throw new m("HOST_REJECTED","Host did not return workspace data.");return n},lt=async(r,n)=>{if(r.kind!=="projects")ee(r.projectId);let _=h(E);ne.set(_,n);try{await G({...H,type:"workspace-subscribe",id:h(E),payload:{subscriptionId:_,query:r}})}catch(S){if(ne.delete(_),!X)Q({...H,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:_}});throw S}return()=>{if(!ne.delete(_)||X)return;Q({...H,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:_}})}},sn=async(r,n)=>{if(r.kind==="session")ee(r.sessionId);if(r.kind==="project")ee(r.projectId);let _=h(E);F.set(_,n);try{await G({...H,type:"shells-subscribe",id:h(E),payload:{subscriptionId:_,scope:r}})}catch(S){if(F.delete(_),!X)Q({...H,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:_}});throw S}return()=>{if(!F.delete(_)||X)return;Q({...H,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:_}})}},Ne=async(r)=>{if("key"in r&&(r.key.length===0||r.key.length>pt))throw new m("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(r.op==="set"&&!Ae(r.value))throw new m("HOST_REJECTED","Storage values must be JSON.");if(r.op==="set"&&new TextEncoder().encode(JSON.stringify(r.value)).length>_t)throw new m("HOST_REJECTED","Storage value exceeds 64 KiB.");if(r.scope==="device"&&p?.features?.deviceStorage!==!0)throw new m("UNSUPPORTED","This host does not support device storage.");let n=await j({...H,type:"storage",id:h(E),payload:r});if(!n||!("storage"in n)||n.op!==r.op)throw new m("HOST_REJECTED","Host did not return storage data.");return n},yo=(r,n)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===r)?Promise.reject(new m("UNSUPPORTED","This host does not support popovers.")):G({...H,type:"popover-close",id:h(E),payload:n?{id:r,reason:n}:{id:r}}),Io=(r,n)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===r)?Promise.reject(new m("UNSUPPORTED","This host does not support popovers.")):G({...H,type:"popover-anchor",id:h(E),payload:{id:r,active:n}});return t.addEventListener("keydown",go,!0),t.addEventListener("pointerover",Me),t.addEventListener("pointermove",Me),t.addEventListener("pointerout",Oo),t.addEventListener("focus",Ro),t.addEventListener("blur",xo),{onAction:(r)=>(O=r,()=>{if(O===r)O=null}),listProjects:async()=>{let r=await dt({kind:"projects"});if(r.kind!=="projects")throw new m("HOST_REJECTED","Expected projects.");return r},listWorktrees:async(r)=>{let n=await dt({kind:"worktrees",projectId:r});if(n.kind!=="worktrees")throw new m("HOST_REJECTED","Expected worktrees.");return n},listSessions:async(r)=>{let n=await dt({kind:"sessions",projectId:r});if(n.kind!=="sessions")throw new m("HOST_REJECTED","Expected sessions.");return n},onProjects:(r)=>lt({kind:"projects"},(n)=>{if(n.kind==="projects")r(n)}),onWorktrees:(r,n)=>lt({kind:"worktrees",projectId:r},(_)=>{if(_.kind==="worktrees")n(_)}),onSessions:(r,n)=>lt({kind:"sessions",projectId:r},(_)=>{if(_.kind==="sessions")n(_)}),onRunningShells:(r,n)=>sn(r,n),readShellOutput:async(r,n)=>{ee(r,we);let _=n?.cursor;if(_!==void 0&&(!Number.isInteger(_)||_<0))throw new m("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let S=n?.tailBytes;if(S!==void 0&&(!Number.isInteger(S)||S<1||S>Pe))throw new m("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Pe}.`);let U=await j({...H,type:"shell-output",id:h(E),payload:{shellId:r,cursor:_,tailBytes:S}});if(!U||typeof U.output!=="string"||!Number.isFinite(U.cursor))throw new m("HOST_REJECTED","Host did not return shell output.");return U},stopShell:async(r)=>{if(ee(r,we),(await j({...H,type:"shell-stop",id:h(E),payload:{shellId:r}}))?.stopped!==!0)throw new m("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(r)=>{ee(r),await G({...H,type:"open-session",id:h(E),payload:{sessionId:r}})},storage:{get:async(r,n)=>{let _=We(n),S={op:"get",key:r};if(_)S.scope=_;let v=await Ne(S);return v.op==="get"&&v.found?v.value:void 0},set:async(r,n,_)=>{let S=We(_),v={op:"set",key:r,value:n};if(S)v.scope=S;await Ne(v)},delete:async(r,n)=>{let _=We(n),S={op:"delete",key:r};if(_)S.scope=_;await Ne(S)},keys:async(r)=>{let n=We(r),_={op:"keys"};if(n)_.scope=n;let S=await Ne(_);if(S.op!=="keys")throw new m("HOST_REJECTED","Expected storage keys.");return S.keys}},onReady:(r)=>{if(s.add(r),p)r(p);return()=>{s.delete(r)}},onDirectory:(r)=>{if(a.add(r),p)r(p.directory);return()=>{a.delete(r)}},onSession:(r)=>{if(d.add(r),p)r(p.session);return()=>{d.delete(r)}},onSessionLifecycle:(r)=>{if(l.add(r),se)r(se);return()=>{l.delete(r)}},onConnection:(r)=>{if(T.add(r),p)r(p.connection);return()=>{T.delete(r)}},onSettings:(r)=>{if(R.add(r),p)r(p.settings);return()=>{R.delete(r)}},onItem:(r)=>{if(u.add(r),p)r(p.item);return()=>{u.delete(r)}},onBlock:(r)=>{if(g.add(r),p?.block)r(p.block);return()=>{g.delete(r)}},onServiceEvent:(r)=>(A.add(r),()=>{A.delete(r)}),onStatusControl:(r)=>(c.add(r),()=>{c.delete(r)}),onPopoverClosed:(r)=>(f.add(r),()=>{f.delete(r)}),setStatusControls:(r)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new m("UNSUPPORTED","This host does not support status controls."));if(!Mo(r))return Promise.reject(new m("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return G({...H,type:"status-controls",id:h(E),payload:{controls:r}})},openPopover:(r)=>{if(p?.features?.popovers!==!0)return Promise.reject(new m("UNSUPPORTED","This host does not support popovers."));if(!Tt(r))return Promise.reject(new m("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return G({...H,type:"popover-open",id:h(E),payload:r})},closePopover:yo,setPopoverAnchorActive:Io,onResolve:(r)=>(k=r,()=>{if(k===r)k=null}),toast:(r)=>{let n=r.message.trim();if(!n||n.length>$e)return Promise.reject(new m("HOST_REJECTED",`Toast message must contain 1 to ${$e} characters.`));if(r.copy&&r.copy!==!0&&(!r.copy.text.length||r.copy.text.length>Ge))return Promise.reject(new m("HOST_REJECTED",`Toast copy text must contain 1 to ${Ge} characters.`));return G({channel:x,v:y,type:"toast",id:h(E),payload:{...r,message:n}})},openUrl:(r)=>G({channel:x,v:y,type:"open-url",id:h(E),payload:{url:r}}),openCommit:(r)=>Ot(r)?G({channel:x,v:y,type:"open-commit",id:h(E),payload:{sha:r}}):Promise.reject(new m("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(r)=>G({channel:x,v:y,type:"block-answer",id:h(E),payload:{text:r.trim().slice(0,ht)}}),openSurface:(r)=>G({channel:x,v:y,type:"open-surface",id:h(E),payload:{surfaceId:r}}),writeClipboard:(r)=>G({channel:x,v:y,type:"clipboard-write",id:h(E),payload:{text:r}}),compose:(r)=>G({channel:x,v:y,type:"compose",id:h(E),payload:r}),attach:(r)=>G({channel:x,v:y,type:"attach",id:h(E),payload:ge(r)}),startSession:async(r)=>{if(r.projectId!==void 0)ee(r.projectId);let n=r.worktree;if(n&&n!==!0)if(n.kind==="existing")ee(n.directory);else{if(n.name!==void 0)ee(n.name,200);if(n.baseBranch!==void 0)ee(n.baseBranch,200)}let _=await j({channel:x,v:y,type:"start-session",id:h(E),payload:It(r)},e.requestTimeoutMs??180000);if(!At(_))throw new m("HOST_REJECTED","Host did not return a session.");return _},prompt:(r)=>j({channel:x,v:y,type:"prompt",id:h(E),payload:bt(r)}).then((n)=>{if(!gt(n))throw new m("HOST_REJECTED","Host did not return a prompt result.");return n}),sessionLink:(r)=>G({channel:x,v:y,type:"session-link",id:h(E),payload:ge(r)}),close:()=>G({channel:x,v:y,type:"close",id:h(E)}),oauthStart:()=>G({channel:x,v:y,type:"oauth-start",id:h(E)}),oauthDisconnect:()=>G({channel:x,v:y,type:"oauth-disconnect",id:h(E)}),request:(r)=>(Fe(r.path)?j({channel:x,v:y,type:"request",id:h(E),payload:r}):sr()).then((n)=>{if(!je(n))throw new m("HOST_REJECTED","Host request result was empty.");return n}),serviceRequest:(r)=>(Fe(r.path)?j({channel:x,v:y,type:"service-request",id:h(E),payload:r}):sr()).then((n)=>{if(!je(n))throw new m("HOST_REJECTED","Host service request result was empty.");return n}),serviceStatus:()=>j({channel:x,v:y,type:"service-status",id:h(E)}).then((r)=>{if(!Ut(r))throw new m("HOST_REJECTED","Host did not return service status.");return r}),readFile:(r)=>(Oe(r)?j({channel:x,v:y,type:"file-read",id:h(E),payload:{path:r}}):Ke()).then((n)=>{if(!vt(n))throw new m("HOST_REJECTED","Host did not return file content.");return n}),writeFile:(r,n)=>{if(!Oe(r))return Ke();if(n.length>Ve)return Promise.reject(new m("FILE_TOO_LARGE",`Content is over ${Ve} characters.`));return j({channel:x,v:y,type:"file-write",id:h(E),payload:{path:r,content:n}}).then((_)=>{if(!Mt(_))throw new m("HOST_REJECTED","Host did not confirm the write.");return _})},listDir:(r)=>(Oe(r)?j({channel:x,v:y,type:"file-list",id:h(E),payload:{path:r}}):Ke()).then((n)=>{if(!Nt(n))throw new m("HOST_REJECTED","Host did not return directory entries.");return n}),stat:(r)=>(Oe(r)?j({channel:x,v:y,type:"file-stat",id:h(E),payload:{path:r}}):Ke()).then((n)=>{if(!wt(n))throw new m("HOST_REJECTED","Host did not return file status.");return n}),generate:(r)=>{let n=r.prompt.trim(),_=r.system?.trim();if(n.length===0||n.length>Xe)return Promise.reject(new m("HOST_REJECTED",`Prompt must be 1 to ${Xe} characters.`));if(_!==void 0&&(_.length===0||_.length>Be))return Promise.reject(new m("HOST_REJECTED",`System prompt must be 1 to ${Be} characters.`));let S=r.maxOutputTokens===void 0?void 0:Math.min(xt,Math.max(1,Math.floor(r.maxOutputTokens)));if(S!==void 0&&!Number.isFinite(S))return Promise.reject(new m("HOST_REJECTED","maxOutputTokens must be a number."));let v={prompt:n};if(_!==void 0)v.system=_;if(S!==void 0)v.maxOutputTokens=S;return j({channel:x,v:y,type:"generate",id:h(E),payload:v},e.requestTimeoutMs??yt).then((U)=>{if(!Pt(U))throw new m("HOST_REJECTED","Host did not return generated text.");return U})},onLateGenerateResult:(r)=>{I.add(r);for(let n of b.splice(0))P([r],n);return To(),()=>{I.delete(r)}},setBadge:(r)=>G({channel:x,v:y,type:"badge",id:h(E),payload:{count:kt(r)}}),setHeight:(r)=>G({channel:x,v:y,type:"resize",id:h(E),payload:{height:Ct(r)}}),onFileOpen:(r)=>{if(w.add(r),!ue)ue=!0,t.addEventListener("keydown",Ao,!0);if(le)r(le);return()=>{w.delete(r)}},onFileSnapshot:(r)=>(re=r,()=>{if(re===r)re=null}),onFileSaved:(r)=>(C.add(r),()=>{C.delete(r)}),reportFileChange:(r)=>ct({...H,type:"file-change",payload:{dirty:r.dirty,edited:r.edited}}),requestFileSave:ho,reportFileUnsupported:()=>ct({...H,type:"file-unsupported"}),dispose:()=>{for(let r of ne.keys())Q({...H,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:r}});ne.clear();for(let r of F.keys())Q({...H,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:r}});if(F.clear(),X=!0,k=null,O=null,re=null,w.clear(),C.clear(),ue)t.removeEventListener("keydown",Ao,!0);t.removeEventListener("message",mo),t.removeEventListener("keydown",go,!0),t.removeEventListener("pointerover",Me),t.removeEventListener("pointermove",Me),t.removeEventListener("pointerout",Oo),t.removeEventListener("focus",Ro),t.removeEventListener("blur",xo);for(let r of W.values())clearTimeout(r.timer),r.reject(new m("HOST_UNAVAILABLE","Host client was disposed."));W.clear(),s.clear(),a.clear(),d.clear(),l.clear(),T.clear(),R.clear(),u.clear(),g.clear(),A.clear(),c.clear(),f.clear(),I.clear(),b.length=0}}};var ir=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Ms=new Set(ir);var ar=["none","agent","user"];var ws=new Set(ar);var Sn=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Tn=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],cr=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,i]of Sn)t.style.setProperty(o,e.tokens[i]);for(let[o,i,s]of Tn){let a=e.tokens[s]??"";t.style.setProperty(o,a),t.style.setProperty(i,a)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},$t=(e,t)=>{if(cr(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var mn={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},M=(e,t)=>`var(--${e}, var(--oc-${mn[e]}, ${t}))`,ae=M("surface-background","transparent"),qe=M("surface-elevated","transparent"),Re=M("surface-elevated-foreground","inherit"),Z=M("surface-foreground","inherit"),L=M("surface-muted-foreground","gray"),hn=M("surface-muted","transparent"),fe=M("interactive-border","currentColor"),z=M("interactive-hover","transparent"),Se=M("interactive-active","transparent"),Gt=M("interactive-selection","transparent"),Ht=M("interactive-selection-foreground","inherit"),ie=M("primary","currentColor"),Vt=M("primary-text","inherit"),Xt=M("error-text","inherit"),An=M("font-sans","inherit"),Bt=M("font-mono","monospace"),pr=M("radius","9px"),Ft=`calc(${pr} - 2px)`,dr=`calc(${pr} - 4px)`,D=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,lr=`background-image: linear-gradient(${z}, ${z});`,jt=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Kt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ur="box-shadow: var(--oc-sdk-lit);",Wt=`inset 0 0.5px 0 0 ${D(Z,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,gn=`
:root {
  --oc-sdk-edge: ${D(Z,16)};
  --oc-sdk-field-bg: ${qe};
  --oc-sdk-raised-bg: ${ae};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${D(Z,14)};
  --oc-sdk-field-bg: ${D(ae,50,qe)};
  --oc-sdk-raised-bg: ${qe};
  --oc-sdk-field-lift: ${Wt};
  --oc-sdk-raised-lift: ${Wt};
  --oc-sdk-lit: ${Wt};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,ze=(e)=>{let t=M(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${M(`${e}-text`,"inherit")}; }`},On=`
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
`,_r=`${gn}
.oc-sdk { color: ${Z}; font-family: ${An}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${lr} }
.oc-sdk-mono { font-family: ${Bt}; }
.oc-sdk-muted { color: ${L}; }
${ze("success")}${ze("warning")}${ze("error")}${ze("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ie}; --oc-sdk-tone-text: ${Vt}; }

.oc-sdk-btn { border-radius: ${Ft}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${dr}; }
.oc-sdk-btn[data-variant="default"] { color: ${Vt}; background: ${D(ie,10,ae)}; border-color: ${D(ie,12)}; ${ur} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${D(ie,16,ae)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${D(ie,22,ae)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${hn}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Re}; ${Kt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Se}, ${Se}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${z}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Se}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${M("status-error","red")}; color: ${Xt}; background: ${D("var(--oc-sdk-tone)",7,ae)}; border-color: ${D("var(--oc-sdk-tone)",12)}; ${ur} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${D("var(--oc-sdk-tone)",9,ae)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${D("var(--oc-sdk-tone)",11,ae)}; box-shadow: none; }

.oc-sdk-field-note { color: ${L}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Xt}; }
.oc-sdk-input { border-radius: ${Ft}; background: var(--oc-sdk-field-bg); color: ${Re}; ${jt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${L}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${jt(D(Z,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${jt(M("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Bt}; }

.oc-sdk-search-icon { color: ${L}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ie}; }
.oc-sdk-search-clear { border-radius: ${dr}; color: ${L}; }
.oc-sdk-search-clear:hover { background: ${z}; color: ${Z}; }

.oc-sdk-trigger { border-radius: ${Ft}; background: var(--oc-sdk-raised-bg); color: ${Re}; ${Kt} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${L}; }
.oc-sdk-trigger-chevron { color: ${L}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Re}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${qe}; background-clip: padding-box; color: ${Re}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${z}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Gt}; color: ${Ht}; }
.oc-sdk-option-check { color: ${Z}; }
.oc-sdk-option[data-destructive="true"] { color: ${Xt}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${D(M("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${L}; }
.oc-sdk-popup-empty { color: ${L}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${fe}; border-radius: 4px; color: ${Z}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${D(Z,60,fe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${fe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${ae}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ie}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${lr} }
.oc-sdk-check-desc { color: ${L}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${D(Z,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${L}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Z}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Ht}; background: ${Gt}; border-color: ${fe}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Re}; background: var(--oc-sdk-raised-bg); ${Kt} }
.oc-sdk-tab-count { color: ${L}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${D(Z,6)}; color: ${L}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${D("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${z}; }
.oc-sdk-row[aria-selected="true"] { background: ${Gt}; color: ${Ht}; }
.oc-sdk-row-lead { font-family: ${Bt}; color: ${L}; }
.oc-sdk-row-sub { color: ${L}; }
.oc-sdk-row-meta { color: ${L}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${L}; }

.oc-sdk-empty-body { color: ${L}; }

.oc-sdk-spinner { color: ${L}; }
.oc-sdk-spinner-ring { border-color: ${fe}; border-top-color: ${ie}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${D("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${L}; }

.oc-sdk-separator { color: ${L}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${D(fe,40)}; }

.oc-sdk-progress-label { color: ${L}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${D(Z,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ie}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${M("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${M("success-text","inherit")}; }

.oc-sdk-text a { color: ${Vt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${D(fe,60)}; }
`,K=`
${ut}
${On}
${_r}`;var N,Sr,bn,pe,Jt,nt,Tr,tt,mr,Qt,Yt,kn,Ce=Symbol.for("pv"),hr={},st=[],Cn=/^m(i|n|o|s|text|space)$/,Zt=Array.isArray,Un=st.slice,me=Object.assign;function Te(e){e&&e.parentNode&&e.remove()}function qt(e,t,o,i,s){var a={type:e,props:t,key:o,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Ce,__v:s||++Sr,__i:-1,__u:0};return!s&&N.vnode&&N.vnode(a),a}function eo(e){return e.children}function ot(e,t){this.props=e,this.context=t,this.__g=0}function _e(e,t){if(t==null)return e.__&&_e(e.__,e.__i+1);for(var o;t<e.__k.length;t++)if((o=e.__k[t])&&o.__e)return o.__e;return typeof e.type!="function"||e.props.__P?null:_e(e)}function vn(e){var t,o=e.__v,i=o.__e,s=[],a=[],d=e.__P;d&&((t=me({constructor:Ce},o)).__v=o.__v+1,N.vnode&&N.vnode(t),xr(d,t,o,e.__n,d.namespaceURI,32&o.__u?[i]:null,s,i||_e(o),32&o.__u,a),t.__v=o.__v,t.__.__k[t.__i]=t,Pn(s,t,a),o.__=o.__e=null,t.__e!=i&&Ar(t))}function Ar(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),Ar(e)}function Er(e){(8&e.__g||(e.__g|=8,pe.push(e),nt++))&&Jt==N.debounceRendering||((Jt=N.debounceRendering)||queueMicrotask)(gr)}function gr(){try{for(var e,t=1;pe.length;)pe.length>t&&pe.sort(Tr),e=pe.shift(),t=pe.length,8&e.__g&&vn(e)}finally{(nt=pe.length)&&(Jt||queueMicrotask)(gr)}}function Or(e,t,o,i,s,a,d,l,T,R,u){var g,A,c,f,I,b,k=i.__k||st,O=t.length;for(T=Mn(o,t,k,T,O),g=0;g<O;g++)(c=o.__k[g])!=null&&(A=~c.__i&&k[c.__i]||hr,c.__i=g,b=xr(e,c,A,s,a,d,l,T,R,u),f=c.__e,(A.ref!=c.ref||8&A.__u)&&(A.ref&&to(A.ref,null,c,A),c.ref&&u.push(c.ref,c.__c||f,c)),I=I||f,4&c.__u?(T=Rr(c,T,e,!A.__v),A.__e&&(A.__e=null)):typeof c.type=="function"&&b!==void 0?T=b:f&&(T=f.nextSibling),c.__u&=-21);return o.__e=I,T}function Mn(e,t,o,i,s){var a,d,l,T,R,u,g,A,c,f=o.length,I=f,b=0,k=0,O=e.__k=Array(s);for(a=0;a<s;a++)(d=t[a])!=null&&typeof d!="boolean"&&typeof d!="function"?(typeof d!="object"||d.constructor===String?d=O[a]=qt(null,d):Zt(d)?d=O[a]=qt(eo,{children:d}):d.constructor===Ce&&d.__b?d=O[a]=qt(d.type,d.props,d.key,d.ref,d.__v):O[a]=d,T=a+b,d.__=e,d.__b=e.__b+1,l=null,~(R=d.__i=Nn(d,o,T,I))&&(I--,(l=o[R])&&(l.__u|=2)),l&&l.__v?(d.__u|=16,R==T-1?b--:R==T+1?b++:R!=T&&(R>T?b--:b++,k=1)):(~R||(s>f?b--:s<f&&b++),typeof d.type!="function"&&(d.__u|=4))):O[a]=null;if(k){for(u=[],g=[],a=0;a<s;a++)if((d=O[a])&&16&d.__u){for(b=0,A=u.length;b<A;)u[c=b+A>>1]<d.__i?b=c+1:A=c;u[b]=d.__i,g[a]=b+1}for(b=u.length;a--;)g[a]&&(g[a]==b?b--:O[a].__u|=4)}if(I)for(a=0;a<f;a++)!(l=o[a])||2&l.__u||(l.__e==i&&(i=_e(l)),oo(l,l));return i}function Rr(e,t,o,i){var s,a,d,l;if(typeof e.type=="function"){if(e.props.__P)return t;if(s=e.__k)for(a=0;a<s.length;a++)s[a]&&(s[a].__=e,t=Rr(s[a],t,o,!1));return t}for(t&&!t.parentNode&&(t=_e(e))&&!t.parentNode&&(t=null),d=e.__e,l=t;l&&l.nodeType==8;)l=l.nextSibling;for(d!=l&&(!i&&o.moveBefore&&d.parentNode?o.moveBefore(d,t):o.insertBefore(d,t||null)),t=d;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Nn(e,t,o,i){var s,{key:a,type:d}=e,l=t[o],T=l&&!(2&l.__u);if(l===null&&a==null||T&&a==l.key&&d==l.type)return o;if(i>(T?1:0)){for(s=o-1;s>=0;s--)if((l=t[s])&&!(2&l.__u)&&a==l.key&&d==l.type)return s;for(s=o+1;s<t.length;s++)if((l=t[s])&&!(2&l.__u)&&a==l.key&&d==l.type)return s}return-1}function fr(e,t,o){o==null&&(o=""),t[0]=="-"?e.setProperty(t,o):e[t]=o}function et(e,t,o,i,s){var a,d;if(t=="style")if(typeof o=="string")e.style.cssText=o;else{if(typeof i=="string"&&(e.style.cssText=i=""),i)for(t in i)o&&t in o||fr(e.style,t);if(o)for(t in o)i&&o[t]==i[t]||fr(e.style,t,o[t])}else if(t[0]=="o"&&t[1]=="n")typeof o!="function"&&(o=null),typeof i!="function"&&(i=null),(e.__e||(e.__e={}))[t]=o,o&&i||(d=Yt[t]||(Yt[t]=wn(t)),(e.__a||(e.__a={}))[t]=Qt,a=t!=(t=t.replace(mr,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),o?e.addEventListener(t,d,a):e.removeEventListener(t,d,a));else{if(s=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=o==null?"":o)}catch(l){}if(typeof o=="function")return;o==null||o===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&o==1?"":o)}}function wn(e){return function(t){var o=this.__e;if(o){if(o=o[e],t[tt]==null)t[tt]=Qt++;else if(t[tt]<this.__a[e])return;return o(N.event?N.event(t):t)}}}function xr(e,t,o,i,s,a,d,l,T,R){var u,g,A,c,f,I,b,k,O,w,C,re,le,ue,W,ne,F,X,E=t.type;if(t.constructor!==Ce)return null;128&o.__u&&(T=32&o.__u,u=o.__c.__z)&&(t.__u|=T,g=a=[],u.nodeType==8?l=rt(u,a):a.push(u),l=a[0]||l),(u=N.__b)&&u(t);e:if(typeof E=="function"){A=d.length;try{if(k=t.props,O=(u=E.prototype)&&u.render,w=(u=E.contextType)&&i[u.__c],C=u?w?w.props.value:u.__:i,(c=o.__c)?(t.__c=c,2&c.__g&&(c.__g|=1)):(O?t.__c=c=new E(k,C):(t.__c=c=new ot(k,C),c.constructor=E,c.render=Dn),w&&w.sub(c),c.state||(c.state={}),c.__n=i,c.__g|=8,c.__h=[],c.__k=[]),O&&(c.__s||(c.__s=c.state),E.getDerivedStateFromProps&&(c.__s==c.state&&(c.__s=me({},c.__s)),me(c.__s,E.getDerivedStateFromProps(k,c.__s)))),f=c.props,I=c.state,c.__v=t,o.__c){if(k!==f&&O&&!E.getDerivedStateFromProps&&c.componentWillReceiveProps&&c.componentWillReceiveProps(k,C),t.__v==o.__v&&!(8&c.__g)||!(4&c.__g)&&c.shouldComponentUpdate&&c.shouldComponentUpdate(k,c.__s,C)===!1){t.__v!=o.__v&&(c.props=k,c.state=c.__s,c.__g&=-9),t.__e=o.__e,t.__k=o.__k,t.__k.some(function(p){p&&(p.__=t)}),st.push.apply(c.__h,c.__k),c.__k=[],c.__h.length&&d.push(c),l=_e(o);break e}c.componentWillUpdate&&c.componentWillUpdate(k,c.__s,C),O&&c.componentDidUpdate&&c.__h.push(function(){c.componentDidUpdate(f,I,b)})}else O&&!E.getDerivedStateFromProps&&c.componentWillMount&&c.componentWillMount(),O&&c.componentDidMount&&c.__h.push(c.componentDidMount);c.context=C,c.props=k,c.__P=e,c.__g&=-5,re=N.__r,le=O?25:0;do c.__g&=-9,re&&re(t),u=c.render(c.props,c.state=c.__s,c.context);while(8&c.__g&&++le<25);O&&(st.push.apply(c.__h,c.__k),c.__k=[]),c.state=c.__s,c.getChildContext&&(i=me({},i,c.getChildContext())),O&&o.__c&&c.getSnapshotBeforeUpdate&&(b=c.getSnapshotBeforeUpdate(f,I)),ue=u&&u.type===eo&&u.key==null?u.props.children:u,k.__P&&(u=l,s=(e=k.__P).namespaceURI,T=a=null,o.props&&o.props.__P!=e&&(o.__k.some(function(p){p&&oo(p,p)}),o.__k=null),l=o.__k?_e(o,0):null),l=Or(e,Zt(ue)?ue:[ue],t,o,i,s,a,d,l,T,R),k.__P&&(t.__e=null,l=u),t.__u&=-161,g&&g.some(Te),c.__h.length&&d.push(c),1&c.__g&&(c.__g&=-4)}catch(p){if(d.length=A,t.__v=null,T||a)if(p&&p.then){if(t.__u|=128|T,a){for(~(F=a.indexOf(l||void 0))||(F=a.length);(X=a[F-1])&&X.nodeType==8;)F--;for(;F<a.length;F++)if(X=a[F])if(a[F]=null,W){if(X==ne)break}else{if(X.nodeType!=8)break;X.data.startsWith("$s")&&(ne=rt(W=X))}}if(!W){for(;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;W=l}(u=rt(W=t.__c.__z||(t.__c.__z=W)))?(t.__e=W,l=u):t.__e=l,l=l&&l.nextSibling}else a&&a.some(Te);else t.__e=o.__e;t.__k||(t.__k=o.__k||[]),p&&p.then||yr(t),N.__e(p,t,o)}}else l=t.__e=Ln(o.__e,t,o,i,s,a,d,T,R,e);return(u=N.diffed)&&u(t),l}function rt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var o=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))o++;else if(e.data.startsWith("/$s")&&!--o)return e}t&&t.push(e)}}function yr(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(yr))}function Pn(e,t,o){for(var i=0;i<o.length;)to(o[i++],o[i++],o[i++]);N.__c&&N.__c(t,e),e.some(function(s){try{e=s.__h,s.__h=[],e.some(function(a){a.call(s)})}catch(a){N.__e(a,s.__v)}})}function Ln(e,t,o,i,s,a,d,l,T,R){var u,g,A,c,f,I,b,k,O=o.props||hr,{props:w,type:C}=t;if(C=="svg"?s="http://www.w3.org/2000/svg":C=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),a){for(u=0;u<a.length;u++)if((f=a[u])&&(C?f.localName==C:f.nodeType==3)){e=f,a[u]=null;break}}if(!e){if(k=R.ownerDocument||document,!C)return k.createTextNode(w);e=k.createElementNS(s,C,w.is?w:R),l&&(N.__m&&N.__m(t,a),l=!1),a=null}if(C){if(R=C=="template"&&e.content||e,a=C=="textarea"&&w.defaultValue!=null?null:a&&Un.call(R.childNodes),!l&&a)for(O={},u=0;u<e.attributes.length;u++)O[(f=e.attributes[u]).name]=f.value;for(u in O)f=O[u],u=="dangerouslySetInnerHTML"?A=f:u=="children"||(u in w)||u=="value"&&("defaultValue"in w)||u=="checked"&&("defaultChecked"in w)||et(e,u,null,f,s);for(u in w)f=w[u],u=="children"?c=f:u=="dangerouslySetInnerHTML"?g=f:u=="value"?I=f:u=="checked"?b=f:l&&typeof f!="function"||O[u]===f||et(e,u,f,O[u],s);g?(l||A&&(g.__html==A.__html||g.__html==e.innerHTML)||(e.innerHTML=g.__html),t.__k=[]):(A&&(e.textContent=""),(C=="foreignObject"||s=="http://www.w3.org/1998/Math/MathML"&&Cn.test(C))&&(s="http://www.w3.org/1999/xhtml"),Or(R,Zt(c)?c:[c],t,o,i,s,a,d,a?a[0]:o.__k&&_e(o,0),l,T),a&&a.some(Te)),l&&C!="textarea"||(u="value",C=="progress"&&I==null?e.removeAttribute(u):I==null||I===e[u]&&(C!="progress"||I)||et(e,u,I,O[u],s),u="checked",b!=null&&b!=e[u]&&et(e,u,b,O[u],s))}else O===w||l&&e.data==w||(e.data=w);return e}function to(e,t,o,i){try{typeof e=="function"?t?t.__x=e(t)||1:i&&(i=i.__c||i.__e)&&(t=i.__x)&&(i.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(s){N.__e(s,o)}}function oo(e,t,o){var i,s,a,d;if(N.unmount&&N.unmount(e),!(i=e.ref)||i.current&&i.current!=e.__e||to(i,null,t,e),i=e.__c){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(l){N.__e(l,t)}i.__P=i.__n=null}if(i=e.__k)for(d=0;d<i.length;d++)i[d]&&oo(i[d],t,typeof e.type!="function"||o&&!e.props.__P);!o&&(i=e.__c)&&(i=i.__z)&&(s=rt(i,a=[]))&&(i==e.__e&&a.some(Te),Te(s),Te(i)),o||Te(e.__e),e.__e=e.__c=e.__=null}function Dn(e,t,o){return this.constructor(e,o)}N={__e:function(e,t,o,i){for(var s,a,d;t=t.__;)if((s=t.__c)&&!(1&s.__g)){s.__g|=4;try{if((d=(a=s.constructor)&&a.getDerivedStateFromError)&&s.setState(a.getDerivedStateFromError(e)),s.componentDidCatch&&(s.componentDidCatch(e,i||{}),d=1),d&&8&s.__g)return void(s.__g|=2)}catch(l){e=l}}throw nt=0,e}},Sr=0,bn=function(e){return e!=null&&e.constructor===Ce},ot.prototype.setState=function(e,t){var o=this.__s;o&&o!=this.state||(o=this.__s=me({},this.state)),typeof e=="function"&&(e=e(me({},o),this.props)),e&&(me(o,e),this.__v&&(t&&this.__k.push(t),Er(this)))},ot.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Er(this))},ot.prototype.render=eo,pe=[],nt=0,Tr=function(e,t){return e.__v.__b-t.__v.__b},tt=Symbol(),mr=/(PointerCapture)$|Capture$/i,Qt=0,Yt={},kn=0;var Ir,te,ro,br;var Lr=[],no=[],B=N,{__b:kr,__r:Cr,diffed:Ur,__c:vr,unmount:Mr,__:Nr}=B;function $n(){var e;do{for(;e=no.shift();)try{Ue(e)}catch(o){B.__e(o,{__:(e=e.__P)&&e.__v})}for(;e=Lr.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Ue),t.__h.some(so),t.__h=[]}catch(o){t.__h=[],B.__e(o,e.__v)}}}while(no.length)}B.__b=function(e){te=null,kr&&kr(e)},B.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Nr&&Nr(e,t)},B.__r=function(e){Cr&&Cr(e),Ir=0;var t=(te=e.__c).__H;t&&(ro==te?te.__h=[]:(t.__h.some(Ue),t.__h.some(so),Ir=0),t.__h=[],t.__.some(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})),ro=te},B.diffed=function(e){Ur&&Ur(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&Pr(Lr.push(t)),t.__H.__.some(function(o){o.u&&(o.__H=o.u)})),ro=te=null},B.__c=function(e,t){t.some(function(o){try{o.__h.some(Ue),o.__h=o.__h.filter(function(i){return!i.__||so(i)})}catch(i){o.__h=[function(){throw i}]}}),vr&&vr(e,t)},B.unmount=function(e){Mr&&Mr(e);var t,o,i=e.__c;i&&i.__H&&(i.__H.__.some(function(s){try{if(s.__P&&s.__c){if(o===void 0){for(o=e.__;o&&(!o.__c||!o.__c.__P);)o=o.__;o=o&&o.__c}s.__P=o,Pr(no.push(s))}else Ue(s)}catch(a){t=a}}),i.__H=void 0,t&&B.__e(t,i.__v))};var wr=typeof requestAnimationFrame=="function";function Gn(e){var t,o=function(){clearTimeout(i),wr&&cancelAnimationFrame(t),setTimeout(e)},i=setTimeout(o,35);wr&&(t=requestAnimationFrame(o))}function Pr(e){e!=1&&br==B.requestAnimationFrame||((br=B.requestAnimationFrame)||Gn)($n)}function Ue(e){var t=te,o=e.__c;typeof o=="function"&&(e.__c=void 0,o()),te=t}function so(e){var t=te;e.__c=e.__(),te=t}var Y=Dt(),he=null,Dr=new Set;Y.onReady((e)=>{he=e,$t(e,document.documentElement);for(let t of Dr)t(e)});Y.onItem((e)=>{if(!he||he.item===e)return;he={...he,item:e};for(let t of Dr)t(he)});var $r=()=>he;var Hn=/^[A-Za-z]{1,7}-\d+$/,Gr=25;var Hr=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!Hn.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()};var co=(e,t)=>{if(typeof e!=="string")return"";let o=e.replace(/\s+/g," ").trim();return o.length>t?`${o.slice(0,t-3).trimEnd()}...`:o};class Ee extends Error{}var Vn=9,Xn=(e)=>{let t=[],o=[],i=[];for(let s of e.split(/[\s,;]+/).filter(Boolean)){let a=Hr(s);if(a){if(!t.includes(a))t.push(a);continue}if(/^#?\d{1,9}$/.test(s)&&s.replace("#","").length<=Vn){let d=Number(s.replace("#",""));if(!o.includes(d))o.push(d);continue}i.push(s)}return{keys:t,numbers:o,words:i.join(" ")}},Vr=(e,t,o)=>{let i=co(e.replace(/["\\`]/g,""),t);return JSON.stringify(i||o)},Xr="```",lo=(e)=>`${Xr}openui-lang
${e}
${Xr}`,uo="The user asked for a Linear block.",Bn=(e)=>`${e.key} ${e.title.length>50?`${e.title.slice(0,47)}...`:e.title}`,Br=async(e,t)=>{let o=await t.number(e);if(o.length===0)throw new Ee(`No issue numbered ${e} was found.`);if(o.length>1)throw new Ee(`${e} matches ${o.slice(0,4).map(Bn).join("; ")}. Type the full key.`);return o[0].key},Fr=async(e,t,o)=>{let{keys:i,numbers:s,words:a}=Xn(t);if(e==="linear-issue"){let d=i[0];if(!d&&s.length>0)d=await Br(s[0],o);if(!d){let l=a.trim();if(!l)throw new Ee("Give an issue key, a number or some words, for example /linear-issue ENG-123.");let T=(await o.search(l))[0];if(!T)throw new Ee(`No issue matches "${co(l,60)}". Try its key.`);d=T.key}return{id:`slash-issue-${d}`,title:`Card: ${d}`,text:`${uo} Put exactly this block in your reply, unchanged, then carry on with what they wrote:

${lo(`root = Stack([card])
card = LinearIssue("${d}")`)}`}}if(e==="linear-list"||e==="linear-pick"){let d=[...i];for(let f of s){let I=await Br(f,o);if(!d.includes(I))d.push(I)}let l=d.slice(0,Gr),T=e==="linear-pick",R=T?"LinearPickIssue":"LinearIssueList",u=T?Vr(a,400,"Which issue?"):Vr(a,160,"Linear issues"),g=T?"pick":"list";if(l.length>0){let f=JSON.stringify(l.join(","));return{id:`slash-${g}-${l.join("-")}`,title:T?`Pick: ${l.join(", ")}`:`List: ${l.length} ${l.length===1?"issue":"issues"}`,text:`${uo} Put exactly this block in your reply, unchanged, then carry on with what they wrote:

${lo(`root = Stack([${g}])
${g} = ${R}(${u}, ${f})`)}`}}let A=T?"a question to choose one of some issues":"a list of issues",c=a.trim()?` The ${T?"question":"heading"} is ${u}.`:"";return{id:`slash-${g}-agent`,title:T?"Pick an issue":"List of issues",text:`${uo} They want ${A}, and gave no keys.${c} Choose the real issues that fit what they are asking (from this conversation and your Linear context), then put a block like this in your reply, with the keys you chose in place of <keys>:

${lo(`root = Stack([${g}])
${g} = ${R}(${u}, "<keys, comma separated>")`)}

Use only keys you know exist. If none fit, say so instead of guessing.`}}throw new Ee(`This extension has no /${e.slice(0,40)} command.`)};var jr=(e,t)=>JSON.stringify({query:e,variables:t});class oe extends Error{kind;constructor(e,t){super(t);this.kind=e}}var de=async(e,t)=>{let o;try{o=await Y.request({method:"POST",path:"/graphql",body:jr(e,t)})}catch(s){if(s instanceof m){if(s.code==="DISCONNECTED"||s.code==="NO_INTEGRATION")throw new oe("disconnected","Linear is not connected.");throw new oe("network",s.message||"Could not reach Linear.")}throw new oe("network",s instanceof Error?s.message:"Could not reach Linear.")}let i;try{i=JSON.parse(o.body)}catch{throw new oe("network",`Linear answered with status ${o.status}.`)}if(o.status===401)throw new oe("disconnected","Linear sign-in expired.");if(i.errors?.length){let s=i.errors[0],a=s.extensions?.code==="RATELIMITED"||s.extensions?.type==="ratelimited";throw new oe(a?"rate-limited":"graphql",s.message)}if(!i.data)throw new oe("graphql","Linear returned no data.");return i.data};var Fn=(e)=>{let t=2166136261;for(let o=0;o<e.length;o+=1)t^=e.charCodeAt(o),t=Math.imul(t,16777619)>>>0;return t.toString(36)},it=(e)=>e.replace(/\/+$/,"");var jn=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,Kn=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),o=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(o)return{host:o[1].toLowerCase(),path:o[2]};let i=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(i)return{host:i[1].toLowerCase(),path:i[2]};return null},Wn=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],o=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],i=t??o;return i?Kn(i):null},zn=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let o=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(o)return{host:o[1].toLowerCase(),path:o[2]};return null},qn=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,po=async(e,t)=>{let o=it(t),i=(await e.listProjects().catch(()=>{return}))?.projects??[],s=i.find((A)=>it(A.directory)===o)??null,a=null;for(let A of s?[s]:i){let f=((await e.listWorktrees(A.id).catch(()=>{return}))?.worktrees??[]).find((I)=>it(I.directory)===o);if(f){s=A,a=f.branch||null;break}}if(!a)a=jn(await e.readFile(".git/HEAD"));let d=s?`p:${s.id}`:`d:${Fn(o)}`,T=[...s?(await e.listSessions(s.id).catch(()=>{return}))?.sessions??[]:[]].sort((A,c)=>c.updatedAt-A.updatedAt),R=[],u=null;for(let A of T){for(let c of A.links??[]){let f=c.url.match(qn)?.[1]?.toUpperCase();if(f&&!R.includes(f))R.push(f);if(!u&&c.kind==="change")u=zn(c.url)}for(let c of A.items){let f=c.data,I=typeof f?.identifier==="string"?f.identifier.toUpperCase():null;if(I&&!R.includes(I))R.push(I)}}let g=Wn(await e.readFile(".git/config"));if(g)await e.setRepo(d,g).catch(()=>{return});else g=await e.getRepo(d).catch(()=>null)??u;return{key:d,ocProjectId:s?.id??null,projectDirectory:s?it(s.directory):o,directory:o,branch:a,repo:g,linkedIssues:R.slice(0,20)}};var Kr=`
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
`;var _o=(e)=>`
  query IssuesByIdentifier {
    ${e.map((t,o)=>`i${o}: issue(id: ${JSON.stringify(t)}) { 
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
`;var Wr=`
  query SlashByNumber($filter: IssueFilter) {
    issues(first: 6, filter: $filter) { nodes { identifier title } }
  }
`,zr=`
  query SlashSearch($term: String!) {
    searchIssues(term: $term, first: 3) { nodes { identifier title } }
  }
`;var qr=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`;var Jr=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`;var Jn=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,o)=>`n${o}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,z_={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:_o(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:Jn(["n1","n2"])};var Yr=async(e)=>{try{let t=await Y.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},es=async(e,t)=>{try{return await Y.storage.set(e,t),!0}catch{return!1}},ts=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),at=async(e)=>{let t=await Yr(`map:${e}`);return ts(t)?t:null};var Eo=async(e)=>{let t=await Yr(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},Qr=async(e,t)=>{let o=await Eo(e);if(o?.host!==t.host||o.path!==t.path)await es(`repo:${e}`,t)};var os=new Map,Zr=(e)=>{for(let t of e)os.set(t.id,t);return e};var en=async(e)=>{if(!e.length)return[];let t=await de(Kr,{after:null,filter:{id:{in:[...e].sort()}}});return Zr(t.projects.nodes)},tn=async(e)=>{let t=await de(Jr,{term:e});return Zr(t.searchProjects.nodes)};var rs=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,on={listProjects:()=>Y.listProjects(),listWorktrees:(e)=>Y.listWorktrees(e),listSessions:(e)=>Y.listSessions(e),readFile:(e)=>Y.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:at,getRepo:Eo,setRepo:Qr,issuesByIdentifier:async(e)=>{let t=e.filter((i)=>rs.test(i));if(!t.length)return[];let o=await de(_o(t));return Object.values(o).filter((i)=>Boolean(i))},repoAttachments:async(e)=>(await de(qr,{url:e})).attachments.nodes,searchProjects:tn,projectsByIds:en};var rn=(e)=>e.map((t)=>({key:t.identifier,title:t.title})),ns=async()=>{let e=$r()?.directory;if(!e)return[];try{let t=await po(on,e);return(await at(t.key))?.teamIds??[]}catch{return[]}},ss={or:[{assignee:{isMe:{eq:!0}}},{creator:{isMe:{eq:!0}}},{subscribers:{some:{isMe:{eq:!0}}}}]},nn={number:async(e)=>{let t=await ns(),o=[...t.length>0?[{and:[{number:{eq:e}},{team:{id:{in:t}}}]}]:[],{and:[{number:{eq:e}},ss]},{number:{eq:e}}];for(let i of o){let s=rn((await de(Wr,{filter:i})).issues.nodes);if(s.length>0)return s}return[]},search:async(e)=>rn((await de(zr,{term:e})).searchIssues.nodes)};Y.onResolve(async({command:e,args:t})=>{try{let o=await Fr(e,t,nn);return{providerId:"linear-dashboard",id:o.id,title:o.title,url:"https://linear.app",text:o.text}}catch(o){if(o instanceof Ee)throw o;if(o instanceof oe)throw Error(o.kind==="disconnected"?"Linear is not connected. Connect it in Settings, Integrations.":`Could not reach Linear: ${o.message}`.slice(0,400));throw Error("The Linear command could not be read.")}});})();

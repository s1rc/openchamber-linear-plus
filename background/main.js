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
`;function Co(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let o=new WeakMap;e.addEventListener("scroll",(i)=>{let s=i.target===e?t:i.target;if(!(s instanceof Element))return;if(!s.hasAttribute("data-oc-scrolling"))s.setAttribute("data-oc-scrolling","");let a=o.get(s);if(a!==void 0)clearTimeout(a);o.set(s,setTimeout(()=>{o.delete(s),s.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ar=`(${Co.toString()})(document);`;var pt=128,_t=65536;var we=128;var Pe=65536;var Mo=/^[a-z][a-z0-9-]{0,39}$/;var bo=(e)=>Object(e)===e&&!Array.isArray(e),Et=(e,t)=>Object.keys(e).every((o)=>t.includes(o)),ko=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Uo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,vo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let o of e){if(!bo(o)||!Mo.test(o.id)||!ko(o.label))return!1;if(o.disabled!==void 0&&o.disabled!==!0&&o.disabled!==!1)return!1;if(t.has(o.id))return!1;if(t.add(o.id),o.kind==="button"){if(!Et(o,["kind","id","label","disabled"]))return!1;continue}if(o.kind!=="select"||!Et(o,["kind","id","label","value","options","disabled"]))return!1;if(!Uo(o.value)||!Array.isArray(o.options)||o.options.length<1||o.options.length>16)return!1;let i=new Set;for(let s of o.options){if(!bo(s)||!Et(s,["value","label"])||!Uo(s.value)||!ko(s.label)||i.has(s.value))return!1;i.add(s.value)}if(!i.has(o.value))return!1}return!0};var No=["{id}","{segment}","{segments+}"];var fs=new Set(No);var wo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Ts=new Set(wo);var Le=20000000,De=256;var ft=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Po=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let o=0;o<e.bytes.byteLength;o+=1)if(e.bytes[o]!==t.bytes[o])return!1;return!0};var Lo=/^[A-Za-z0-9_-]{1,80}$/;var Do=["left","right","top","bottom"];var $o=(e,t=0,o={remaining:16000})=>{if(--o.remaining<0||t>=32)return!1;if(e===null)return!0;let i=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let s of i)if(!$o(s,t+1,o))return!1;return!0},St=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(St);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(St)}return String(e)===e||Number.isFinite(e)},Tt=(e)=>{try{if(String(e.id)!==e.id||!Lo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Do.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!$o(e.data)||!St(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ht=2000;var Ho=["file","directory","other","missing"],At=(e)=>Boolean(e&&"sessionId"in e),gt=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Vo=/^[0-9a-f]{7,64}$/i,Ot=(e)=>Vo.test(e),$e=500,Ge=32000,Xo=16000,Fo=128,Bo=200,jo=2000,Ko=16000,Wo=80,zo=200,qo=16000;var Jo=2000;var Rt=20000,He=1024,Ve=2000000;var Xe=64000,Fe=8000,xt=4000;var yt=960000;var Yo=999,Qo=1e4,Ce=500,Zo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],en=["stopped","starting","ready","failed"],dr=new Set(Zo),tn=(e)=>dr.has(e),on=(e)=>e&&tn(e)?e:"HOST_REJECTED",Ae=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Ae);if(Object(e)===e)return Object.values(e).every(Ae);return!1},nn=(e)=>Ae(e)&&JSON.stringify(e).length<=qo,Go=(e)=>e?.trim().slice(0,zo)??"",ge=(e)=>{let t=e.id.trim().slice(0,Fo),o=e.title.trim().slice(0,Bo),i=e.url.trim().slice(0,jo),s=e.text?.trim().slice(0,Ko),a=e.author?.trim().slice(0,Wo),d=e.kind==="pull"?"pull":"issue",l={providerId:e.providerId.trim(),id:t,title:o||t,url:i,kind:d};if(s)l.text=s;if(a)l.author=a;if(d==="pull"){let T=Go(e.branches?.head),R=Go(e.branches?.base);if(T&&R)l.branches={head:T,base:R}}if(nn(e.data))l.data=e.data;return l},It=(e)=>{let t=ge(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Ct=(e)=>{let t={text:e.text.trim().slice(0,Xo)};if(e.send)t.send=!0;return t},bt=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Yo,Math.max(0,Math.round(e)))},kt=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Qo,Math.max(0,Math.ceil(e)))};var Oe=(e)=>e.length>0&&e.length<=He&&!e.includes("\x00")&&!e.includes("\\");var Be=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Jo)return!1;return!e.split("/").some((o)=>o==="."||o==="..")},lr=new Set(en),Ut=(e)=>Boolean(e&&"status"in e&&lr.has(String(e.status))&&!("body"in e)),je=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Mt=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),vt=(e)=>Boolean(e&&"written"in e&&e.written===!0),Nt=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),ur=new Set(Ho),wt=(e)=>Boolean(e&&"kind"in e&&"size"in e&&ur.has(String(e.kind))&&Number.isFinite(e.size)),Pt=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),pr=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),_r=(e)=>Object(e)===e?e:null,mt=(e)=>String(e)===e&&e.length>0,Er=(e)=>{if(!mt(e.id))return null;if(e.ok===!0){let t={channel:x,v:y,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&mt(e.error))return{channel:x,v:y,type:"result",id:e.id,ok:!1,error:e.error,code:on(mt(e.code)?e.code:void 0)};return null},Lt=(e)=>{let t=_r(e);if(!t||t.channel!==x||t.v!==y)return null;if(t.type==="result")return Er(t);if(!pr.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var rn=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),fr=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class m extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var sn=()=>Promise.reject(new m("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Ke=()=>Promise.reject(new m("BAD_PATH",`File path must be 1 to ${He} characters without NUL or backslash.`)),We=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new m("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},h=(e)=>(e.value+=1,`oc-${e.value}`),Dt=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new m("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let o=e.acceptSource??((n)=>n===t.parent),i=e.requestTimeoutMs??Rt,s=new Set,a=new Set,d=new Set,l=new Set,T=new Set,R=new Set,u=new Set,g=new Set,A=new Set,c=new Set,f=new Set,I=new Set,C=[],b=null,O=null,w=new Set,k=new Set,ne=null,le=null,ue=!1,W=new Map,re=new Map,B=new Map,X=!1,E={value:0},p=null,se=null,ye=!1,Ie=!1,fo=null,So=(n)=>{if(!n)return null;return{sessionId:n.id,phase:n.busy?"started":"completed"}},Q=(n)=>{t.parent.postMessage(n,"*")},To=()=>{if(X||t.parent===t||I.size===0||p?.features?.lateGenerateResults!==!0)return;Q({channel:x,v:y,type:"generate-late-listen"})},P=(n,r)=>{for(let _ of n)try{_(r)}catch(S){console.error(S)}},mo=(n)=>{if(!(n instanceof MessageEvent))return;if(!o(n.source))return;let r=Lt(n.data);if(!r)return;if(r.type==="workspace"){let S=re.get(r.payload.subscriptionId);if(S)P([S],r.payload.snapshot);return}if(r.type==="shells"){let S=B.get(r.payload.subscriptionId);if(S)P([S],r.payload.snapshot);return}if(r.type==="ready"){if(p=r.payload,se=So(r.payload.session),P(s,r.payload),P(a,r.payload.directory),P(d,r.payload.session),se)P(l,se);if(P(T,r.payload.connection),P(R,r.payload.settings),P(u,r.payload.item),r.payload.block)P(g,r.payload.block);To();return}if(r.type==="service-event"){P(A,r.payload);return}if(r.type==="generate-late"){if(I.size===0)C.push(r.payload);else P(I,r.payload);return}if(r.type==="directory"){if(p)p={...p,directory:r.payload.directory};P(a,r.payload.directory);return}if(r.type==="session"){if(p)p={...p,session:r.payload.session};if(!r.payload.session)se=null;else if(se?.sessionId!==r.payload.session.id)se=So(r.payload.session);P(d,r.payload.session);return}if(r.type==="session-lifecycle"){se=r.payload,P(l,r.payload);return}if(r.type==="connection"){if(p)p={...p,connection:r.payload.connection};P(T,r.payload.connection);return}if(r.type==="settings"){if(p)p={...p,settings:r.payload.settings};P(R,r.payload.settings);return}if(r.type==="item"){if(p)p={...p,item:r.payload.item};P(u,r.payload.item);return}if(r.type==="status-control-event"){P(c,r.payload);return}if(r.type==="popover-closed"){P(f,r.payload);return}if(r.type==="action"){let S=(U)=>{if(!X)Q({channel:x,v:y,type:"action-result",id:r.id,payload:U})},M=O;if(!M){S({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>M(r.payload)).then(()=>S({ok:!0}),(U)=>{let V=(U instanceof Error?U.message:String(U)).trim();S({ok:!1,error:(V||"Action failed.").slice(0,Ce)})});return}if(r.type==="file-open"){let S=r.payload;if(le&&Po(le,S))return;le=S,P(w,r.payload);return}if(r.type==="file-saved"){P(k,r.payload.version);return}if(r.type==="file-snapshot"){let S=(V)=>{if(!X)Q({channel:x,v:y,type:"file-snapshot-result",id:r.id,payload:V})},M=(V)=>S({error:(V.trim()||"Could not read the edited file.").slice(0,Ce)}),U=ne;if(!U){M("This extension does not edit files.");return}Promise.resolve().then(()=>U(r.payload.purpose)).then((V)=>{if(ft(V)>Le){M(`The file is over ${Le} ${"bytes"in V?"bytes":"characters"}.`);return}if(V.version.length>De){M(`The snapshot version is over ${De} characters.`);return}S({snapshot:"bytes"in V?{bytes:V.bytes,version:V.version}:{content:V.content,version:V.version}})},(V)=>M(V instanceof Error?V.message:String(V)));return}if(r.type==="resolve"){let S=(U)=>{Q({channel:x,v:y,type:"resolve-result",id:r.id,payload:U})},M=b;if(!M){S({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>M(r.payload)).then((U)=>S({item:U?ge(U):null}),(U)=>{let V=(U instanceof Error?U.message:String(U)).trim();S({error:(V||"Command failed.").slice(0,Ce)})});return}let _=W.get(r.id);if(!_)return;if(clearTimeout(_.timer),W.delete(r.id),r.ok){_.resolve(r.payload);return}_.reject(new m(r.code,r.error))};t.addEventListener("message",mo),Q({channel:x,v:y,type:"hello"});let j=(n,r=i)=>{if(X||t.parent===t)return Promise.reject(new m("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((_,S)=>{let M=setTimeout(()=>{W.delete(n.id),S(new m("HOST_TIMEOUT","Host did not answer in time."))},r);W.set(n.id,{resolve:_,reject:S,timer:M}),Q(n)})},G=(n)=>j(n).then(()=>{return}),H={channel:x,v:y},ct=(n)=>{if(!X&&t.parent!==t)Q(n)},ho=()=>ct({...H,type:"file-save"}),Ao=(n)=>{if(!rn(n)||!fr(n))return;n.preventDefault(),ho()},go=(n)=>{if(!rn(n)||n.key!=="Escape"||p?.surface!=="popover"||!p.popover)return;n.preventDefault(),yo(p.popover.id,"escape").catch(()=>{return})},Me=()=>{let n=p?.surface==="popover"?p.popover:void 0;if(!n)return;let r=ye||Ie;if(fo===r)return;fo=r,Io(n.id,r).catch(()=>{return})},ve=()=>{if(p?.surface!=="popover"||ye)return;ye=!0,Me()},Oo=(n)=>{if(p?.surface!=="popover"||n.relatedTarget!==null||!ye)return;ye=!1,Me()},Ro=()=>{if(p?.surface!=="popover"||Ie)return;Ie=!0,Me()},xo=()=>{if(p?.surface!=="popover"||!Ie)return;Ie=!1,Me()},ee=(n,r=1024)=>{if(!n.trim()||n.length>r)throw new m("HOST_REJECTED",`Identity must contain 1 to ${r} characters.`)},dt=async(n)=>{if(n.kind!=="projects")ee(n.projectId);let r=await j({...H,type:"workspace-read",id:h(E),payload:n});if(!r||!("kind"in r)||!("state"in r)||r.kind!==n.kind)throw new m("HOST_REJECTED","Host did not return workspace data.");return r},lt=async(n,r)=>{if(n.kind!=="projects")ee(n.projectId);let _=h(E);re.set(_,r);try{await G({...H,type:"workspace-subscribe",id:h(E),payload:{subscriptionId:_,query:n}})}catch(S){if(re.delete(_),!X)Q({...H,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:_}});throw S}return()=>{if(!re.delete(_)||X)return;Q({...H,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:_}})}},ir=async(n,r)=>{if(n.kind==="session")ee(n.sessionId);if(n.kind==="project")ee(n.projectId);let _=h(E);B.set(_,r);try{await G({...H,type:"shells-subscribe",id:h(E),payload:{subscriptionId:_,scope:n}})}catch(S){if(B.delete(_),!X)Q({...H,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:_}});throw S}return()=>{if(!B.delete(_)||X)return;Q({...H,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:_}})}},Ne=async(n)=>{if("key"in n&&(n.key.length===0||n.key.length>pt))throw new m("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(n.op==="set"&&!Ae(n.value))throw new m("HOST_REJECTED","Storage values must be JSON.");if(n.op==="set"&&new TextEncoder().encode(JSON.stringify(n.value)).length>_t)throw new m("HOST_REJECTED","Storage value exceeds 64 KiB.");if(n.scope==="device"&&p?.features?.deviceStorage!==!0)throw new m("UNSUPPORTED","This host does not support device storage.");let r=await j({...H,type:"storage",id:h(E),payload:n});if(!r||!("storage"in r)||r.op!==n.op)throw new m("HOST_REJECTED","Host did not return storage data.");return r},yo=(n,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===n)?Promise.reject(new m("UNSUPPORTED","This host does not support popovers.")):G({...H,type:"popover-close",id:h(E),payload:r?{id:n,reason:r}:{id:n}}),Io=(n,r)=>p?.features?.popovers!==!0&&!(p?.surface==="popover"&&p.popover?.id===n)?Promise.reject(new m("UNSUPPORTED","This host does not support popovers.")):G({...H,type:"popover-anchor",id:h(E),payload:{id:n,active:r}});return t.addEventListener("keydown",go,!0),t.addEventListener("pointerover",ve),t.addEventListener("pointermove",ve),t.addEventListener("pointerout",Oo),t.addEventListener("focus",Ro),t.addEventListener("blur",xo),{onAction:(n)=>(O=n,()=>{if(O===n)O=null}),listProjects:async()=>{let n=await dt({kind:"projects"});if(n.kind!=="projects")throw new m("HOST_REJECTED","Expected projects.");return n},listWorktrees:async(n)=>{let r=await dt({kind:"worktrees",projectId:n});if(r.kind!=="worktrees")throw new m("HOST_REJECTED","Expected worktrees.");return r},listSessions:async(n)=>{let r=await dt({kind:"sessions",projectId:n});if(r.kind!=="sessions")throw new m("HOST_REJECTED","Expected sessions.");return r},onProjects:(n)=>lt({kind:"projects"},(r)=>{if(r.kind==="projects")n(r)}),onWorktrees:(n,r)=>lt({kind:"worktrees",projectId:n},(_)=>{if(_.kind==="worktrees")r(_)}),onSessions:(n,r)=>lt({kind:"sessions",projectId:n},(_)=>{if(_.kind==="sessions")r(_)}),onRunningShells:(n,r)=>ir(n,r),readShellOutput:async(n,r)=>{ee(n,we);let _=r?.cursor;if(_!==void 0&&(!Number.isInteger(_)||_<0))throw new m("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let S=r?.tailBytes;if(S!==void 0&&(!Number.isInteger(S)||S<1||S>Pe))throw new m("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Pe}.`);let U=await j({...H,type:"shell-output",id:h(E),payload:{shellId:n,cursor:_,tailBytes:S}});if(!U||typeof U.output!=="string"||!Number.isFinite(U.cursor))throw new m("HOST_REJECTED","Host did not return shell output.");return U},stopShell:async(n)=>{if(ee(n,we),(await j({...H,type:"shell-stop",id:h(E),payload:{shellId:n}}))?.stopped!==!0)throw new m("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(n)=>{ee(n),await G({...H,type:"open-session",id:h(E),payload:{sessionId:n}})},storage:{get:async(n,r)=>{let _=We(r),S={op:"get",key:n};if(_)S.scope=_;let M=await Ne(S);return M.op==="get"&&M.found?M.value:void 0},set:async(n,r,_)=>{let S=We(_),M={op:"set",key:n,value:r};if(S)M.scope=S;await Ne(M)},delete:async(n,r)=>{let _=We(r),S={op:"delete",key:n};if(_)S.scope=_;await Ne(S)},keys:async(n)=>{let r=We(n),_={op:"keys"};if(r)_.scope=r;let S=await Ne(_);if(S.op!=="keys")throw new m("HOST_REJECTED","Expected storage keys.");return S.keys}},onReady:(n)=>{if(s.add(n),p)n(p);return()=>{s.delete(n)}},onDirectory:(n)=>{if(a.add(n),p)n(p.directory);return()=>{a.delete(n)}},onSession:(n)=>{if(d.add(n),p)n(p.session);return()=>{d.delete(n)}},onSessionLifecycle:(n)=>{if(l.add(n),se)n(se);return()=>{l.delete(n)}},onConnection:(n)=>{if(T.add(n),p)n(p.connection);return()=>{T.delete(n)}},onSettings:(n)=>{if(R.add(n),p)n(p.settings);return()=>{R.delete(n)}},onItem:(n)=>{if(u.add(n),p)n(p.item);return()=>{u.delete(n)}},onBlock:(n)=>{if(g.add(n),p?.block)n(p.block);return()=>{g.delete(n)}},onServiceEvent:(n)=>(A.add(n),()=>{A.delete(n)}),onStatusControl:(n)=>(c.add(n),()=>{c.delete(n)}),onPopoverClosed:(n)=>(f.add(n),()=>{f.delete(n)}),setStatusControls:(n)=>{if(p?.features?.statusControls!==!0)return Promise.reject(new m("UNSUPPORTED","This host does not support status controls."));if(!vo(n))return Promise.reject(new m("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return G({...H,type:"status-controls",id:h(E),payload:{controls:n}})},openPopover:(n)=>{if(p?.features?.popovers!==!0)return Promise.reject(new m("UNSUPPORTED","This host does not support popovers."));if(!Tt(n))return Promise.reject(new m("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return G({...H,type:"popover-open",id:h(E),payload:n})},closePopover:yo,setPopoverAnchorActive:Io,onResolve:(n)=>(b=n,()=>{if(b===n)b=null}),toast:(n)=>{let r=n.message.trim();if(!r||r.length>$e)return Promise.reject(new m("HOST_REJECTED",`Toast message must contain 1 to ${$e} characters.`));if(n.copy&&n.copy!==!0&&(!n.copy.text.length||n.copy.text.length>Ge))return Promise.reject(new m("HOST_REJECTED",`Toast copy text must contain 1 to ${Ge} characters.`));return G({channel:x,v:y,type:"toast",id:h(E),payload:{...n,message:r}})},openUrl:(n)=>G({channel:x,v:y,type:"open-url",id:h(E),payload:{url:n}}),openCommit:(n)=>Ot(n)?G({channel:x,v:y,type:"open-commit",id:h(E),payload:{sha:n}}):Promise.reject(new m("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(n)=>G({channel:x,v:y,type:"block-answer",id:h(E),payload:{text:n.trim().slice(0,ht)}}),openSurface:(n)=>G({channel:x,v:y,type:"open-surface",id:h(E),payload:{surfaceId:n}}),writeClipboard:(n)=>G({channel:x,v:y,type:"clipboard-write",id:h(E),payload:{text:n}}),compose:(n)=>G({channel:x,v:y,type:"compose",id:h(E),payload:n}),attach:(n)=>G({channel:x,v:y,type:"attach",id:h(E),payload:ge(n)}),startSession:async(n)=>{if(n.projectId!==void 0)ee(n.projectId);let r=n.worktree;if(r&&r!==!0)if(r.kind==="existing")ee(r.directory);else{if(r.name!==void 0)ee(r.name,200);if(r.baseBranch!==void 0)ee(r.baseBranch,200)}let _=await j({channel:x,v:y,type:"start-session",id:h(E),payload:It(n)},e.requestTimeoutMs??180000);if(!At(_))throw new m("HOST_REJECTED","Host did not return a session.");return _},prompt:(n)=>j({channel:x,v:y,type:"prompt",id:h(E),payload:Ct(n)}).then((r)=>{if(!gt(r))throw new m("HOST_REJECTED","Host did not return a prompt result.");return r}),sessionLink:(n)=>G({channel:x,v:y,type:"session-link",id:h(E),payload:ge(n)}),close:()=>G({channel:x,v:y,type:"close",id:h(E)}),oauthStart:()=>G({channel:x,v:y,type:"oauth-start",id:h(E)}),oauthDisconnect:()=>G({channel:x,v:y,type:"oauth-disconnect",id:h(E)}),request:(n)=>(Be(n.path)?j({channel:x,v:y,type:"request",id:h(E),payload:n}):sn()).then((r)=>{if(!je(r))throw new m("HOST_REJECTED","Host request result was empty.");return r}),serviceRequest:(n)=>(Be(n.path)?j({channel:x,v:y,type:"service-request",id:h(E),payload:n}):sn()).then((r)=>{if(!je(r))throw new m("HOST_REJECTED","Host service request result was empty.");return r}),serviceStatus:()=>j({channel:x,v:y,type:"service-status",id:h(E)}).then((n)=>{if(!Ut(n))throw new m("HOST_REJECTED","Host did not return service status.");return n}),readFile:(n)=>(Oe(n)?j({channel:x,v:y,type:"file-read",id:h(E),payload:{path:n}}):Ke()).then((r)=>{if(!Mt(r))throw new m("HOST_REJECTED","Host did not return file content.");return r}),writeFile:(n,r)=>{if(!Oe(n))return Ke();if(r.length>Ve)return Promise.reject(new m("FILE_TOO_LARGE",`Content is over ${Ve} characters.`));return j({channel:x,v:y,type:"file-write",id:h(E),payload:{path:n,content:r}}).then((_)=>{if(!vt(_))throw new m("HOST_REJECTED","Host did not confirm the write.");return _})},listDir:(n)=>(Oe(n)?j({channel:x,v:y,type:"file-list",id:h(E),payload:{path:n}}):Ke()).then((r)=>{if(!Nt(r))throw new m("HOST_REJECTED","Host did not return directory entries.");return r}),stat:(n)=>(Oe(n)?j({channel:x,v:y,type:"file-stat",id:h(E),payload:{path:n}}):Ke()).then((r)=>{if(!wt(r))throw new m("HOST_REJECTED","Host did not return file status.");return r}),generate:(n)=>{let r=n.prompt.trim(),_=n.system?.trim();if(r.length===0||r.length>Xe)return Promise.reject(new m("HOST_REJECTED",`Prompt must be 1 to ${Xe} characters.`));if(_!==void 0&&(_.length===0||_.length>Fe))return Promise.reject(new m("HOST_REJECTED",`System prompt must be 1 to ${Fe} characters.`));let S=n.maxOutputTokens===void 0?void 0:Math.min(xt,Math.max(1,Math.floor(n.maxOutputTokens)));if(S!==void 0&&!Number.isFinite(S))return Promise.reject(new m("HOST_REJECTED","maxOutputTokens must be a number."));let M={prompt:r};if(_!==void 0)M.system=_;if(S!==void 0)M.maxOutputTokens=S;return j({channel:x,v:y,type:"generate",id:h(E),payload:M},e.requestTimeoutMs??yt).then((U)=>{if(!Pt(U))throw new m("HOST_REJECTED","Host did not return generated text.");return U})},onLateGenerateResult:(n)=>{I.add(n);for(let r of C.splice(0))P([n],r);return To(),()=>{I.delete(n)}},setBadge:(n)=>G({channel:x,v:y,type:"badge",id:h(E),payload:{count:bt(n)}}),setHeight:(n)=>G({channel:x,v:y,type:"resize",id:h(E),payload:{height:kt(n)}}),onFileOpen:(n)=>{if(w.add(n),!ue)ue=!0,t.addEventListener("keydown",Ao,!0);if(le)n(le);return()=>{w.delete(n)}},onFileSnapshot:(n)=>(ne=n,()=>{if(ne===n)ne=null}),onFileSaved:(n)=>(k.add(n),()=>{k.delete(n)}),reportFileChange:(n)=>ct({...H,type:"file-change",payload:{dirty:n.dirty,edited:n.edited}}),requestFileSave:ho,reportFileUnsupported:()=>ct({...H,type:"file-unsupported"}),dispose:()=>{for(let n of re.keys())Q({...H,type:"workspace-unsubscribe",id:h(E),payload:{subscriptionId:n}});re.clear();for(let n of B.keys())Q({...H,type:"shells-unsubscribe",id:h(E),payload:{subscriptionId:n}});if(B.clear(),X=!0,b=null,O=null,ne=null,w.clear(),k.clear(),ue)t.removeEventListener("keydown",Ao,!0);t.removeEventListener("message",mo),t.removeEventListener("keydown",go,!0),t.removeEventListener("pointerover",ve),t.removeEventListener("pointermove",ve),t.removeEventListener("pointerout",Oo),t.removeEventListener("focus",Ro),t.removeEventListener("blur",xo);for(let n of W.values())clearTimeout(n.timer),n.reject(new m("HOST_UNAVAILABLE","Host client was disposed."));W.clear(),s.clear(),a.clear(),d.clear(),l.clear(),T.clear(),R.clear(),u.clear(),g.clear(),A.clear(),c.clear(),f.clear(),I.clear(),C.length=0}}};var an=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var vs=new Set(an);var cn=["none","agent","user"];var ws=new Set(cn);var Sr=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Tr=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],dn=(e,t)=>{t.style.colorScheme=e.mode;for(let[o,i]of Sr)t.style.setProperty(o,e.tokens[i]);for(let[o,i,s]of Tr){let a=e.tokens[s]??"";t.style.setProperty(o,a),t.style.setProperty(i,a)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},$t=(e,t)=>{if(dn(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var mr={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},v=(e,t)=>`var(--${e}, var(--oc-${mr[e]}, ${t}))`,ae=v("surface-background","transparent"),qe=v("surface-elevated","transparent"),Re=v("surface-elevated-foreground","inherit"),Z=v("surface-foreground","inherit"),L=v("surface-muted-foreground","gray"),hr=v("surface-muted","transparent"),fe=v("interactive-border","currentColor"),z=v("interactive-hover","transparent"),Se=v("interactive-active","transparent"),Gt=v("interactive-selection","transparent"),Ht=v("interactive-selection-foreground","inherit"),ie=v("primary","currentColor"),Vt=v("primary-text","inherit"),Xt=v("error-text","inherit"),Ar=v("font-sans","inherit"),Ft=v("font-mono","monospace"),_n=v("radius","9px"),Bt=`calc(${_n} - 2px)`,ln=`calc(${_n} - 4px)`,D=(e,t,o="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${o})`,un=`background-image: linear-gradient(${z}, ${z});`,jt=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Kt="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",pn="box-shadow: var(--oc-sdk-lit);",Wt=`inset 0 0.5px 0 0 ${D(Z,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,gr=`
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
}`,ze=(e)=>{let t=v(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${v(`${e}-text`,"inherit")}; }`},Or=`
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
`,En=`${gr}
.oc-sdk { color: ${Z}; font-family: ${Ar}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${un} }
.oc-sdk-mono { font-family: ${Ft}; }
.oc-sdk-muted { color: ${L}; }
${ze("success")}${ze("warning")}${ze("error")}${ze("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ie}; --oc-sdk-tone-text: ${Vt}; }

.oc-sdk-btn { border-radius: ${Bt}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${ln}; }
.oc-sdk-btn[data-variant="default"] { color: ${Vt}; background: ${D(ie,10,ae)}; border-color: ${D(ie,12)}; ${pn} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${D(ie,16,ae)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${D(ie,22,ae)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${hr}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Se}, ${Se}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Re}; ${Kt} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Se}, ${Se}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${z}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Se}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${v("status-error","red")}; color: ${Xt}; background: ${D("var(--oc-sdk-tone)",7,ae)}; border-color: ${D("var(--oc-sdk-tone)",12)}; ${pn} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${D("var(--oc-sdk-tone)",9,ae)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${D("var(--oc-sdk-tone)",11,ae)}; box-shadow: none; }

.oc-sdk-field-note { color: ${L}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Xt}; }
.oc-sdk-input { border-radius: ${Bt}; background: var(--oc-sdk-field-bg); color: ${Re}; ${jt("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${L}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${z}, ${z}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${jt(D(Z,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${jt(v("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Ft}; }

.oc-sdk-search-icon { color: ${L}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ie}; }
.oc-sdk-search-clear { border-radius: ${ln}; color: ${L}; }
.oc-sdk-search-clear:hover { background: ${z}; color: ${Z}; }

.oc-sdk-trigger { border-radius: ${Bt}; background: var(--oc-sdk-raised-bg); color: ${Re}; ${Kt} transition: background 150ms ease-out; }
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
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${D(v("status-error","red"),10)}; }
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
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${un} }
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
.oc-sdk-row-lead { font-family: ${Ft}; color: ${L}; }
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
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${v("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${v("success-text","inherit")}; }

.oc-sdk-text a { color: ${Vt}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${D(fe,60)}; }
`,K=`
${ut}
${Or}
${En}`;var N,Tn,Cr,pe,Jt,rt,mn,tt,hn,Qt,Yt,br,ke=Symbol.for("pv"),An={},st=[],kr=/^m(i|n|o|s|text|space)$/,Zt=Array.isArray,Ur=st.slice,me=Object.assign;function Te(e){e&&e.parentNode&&e.remove()}function qt(e,t,o,i,s){var a={type:e,props:t,key:o,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:ke,__v:s||++Tn,__i:-1,__u:0};return!s&&N.vnode&&N.vnode(a),a}function eo(e){return e.children}function ot(e,t){this.props=e,this.context=t,this.__g=0}function _e(e,t){if(t==null)return e.__&&_e(e.__,e.__i+1);for(var o;t<e.__k.length;t++)if((o=e.__k[t])&&o.__e)return o.__e;return typeof e.type!="function"||e.props.__P?null:_e(e)}function Mr(e){var t,o=e.__v,i=o.__e,s=[],a=[],d=e.__P;d&&((t=me({constructor:ke},o)).__v=o.__v+1,N.vnode&&N.vnode(t),yn(d,t,o,e.__n,d.namespaceURI,32&o.__u?[i]:null,s,i||_e(o),32&o.__u,a),t.__v=o.__v,t.__.__k[t.__i]=t,Pr(s,t,a),o.__=o.__e=null,t.__e!=i&&gn(t))}function gn(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),gn(e)}function fn(e){(8&e.__g||(e.__g|=8,pe.push(e),rt++))&&Jt==N.debounceRendering||((Jt=N.debounceRendering)||queueMicrotask)(On)}function On(){try{for(var e,t=1;pe.length;)pe.length>t&&pe.sort(mn),e=pe.shift(),t=pe.length,8&e.__g&&Mr(e)}finally{(rt=pe.length)&&(Jt||queueMicrotask)(On)}}function Rn(e,t,o,i,s,a,d,l,T,R,u){var g,A,c,f,I,C,b=i.__k||st,O=t.length;for(T=vr(o,t,b,T,O),g=0;g<O;g++)(c=o.__k[g])!=null&&(A=~c.__i&&b[c.__i]||An,c.__i=g,C=yn(e,c,A,s,a,d,l,T,R,u),f=c.__e,(A.ref!=c.ref||8&A.__u)&&(A.ref&&to(A.ref,null,c,A),c.ref&&u.push(c.ref,c.__c||f,c)),I=I||f,4&c.__u?(T=xn(c,T,e,!A.__v),A.__e&&(A.__e=null)):typeof c.type=="function"&&C!==void 0?T=C:f&&(T=f.nextSibling),c.__u&=-21);return o.__e=I,T}function vr(e,t,o,i,s){var a,d,l,T,R,u,g,A,c,f=o.length,I=f,C=0,b=0,O=e.__k=Array(s);for(a=0;a<s;a++)(d=t[a])!=null&&typeof d!="boolean"&&typeof d!="function"?(typeof d!="object"||d.constructor===String?d=O[a]=qt(null,d):Zt(d)?d=O[a]=qt(eo,{children:d}):d.constructor===ke&&d.__b?d=O[a]=qt(d.type,d.props,d.key,d.ref,d.__v):O[a]=d,T=a+C,d.__=e,d.__b=e.__b+1,l=null,~(R=d.__i=Nr(d,o,T,I))&&(I--,(l=o[R])&&(l.__u|=2)),l&&l.__v?(d.__u|=16,R==T-1?C--:R==T+1?C++:R!=T&&(R>T?C--:C++,b=1)):(~R||(s>f?C--:s<f&&C++),typeof d.type!="function"&&(d.__u|=4))):O[a]=null;if(b){for(u=[],g=[],a=0;a<s;a++)if((d=O[a])&&16&d.__u){for(C=0,A=u.length;C<A;)u[c=C+A>>1]<d.__i?C=c+1:A=c;u[C]=d.__i,g[a]=C+1}for(C=u.length;a--;)g[a]&&(g[a]==C?C--:O[a].__u|=4)}if(I)for(a=0;a<f;a++)!(l=o[a])||2&l.__u||(l.__e==i&&(i=_e(l)),oo(l,l));return i}function xn(e,t,o,i){var s,a,d,l;if(typeof e.type=="function"){if(e.props.__P)return t;if(s=e.__k)for(a=0;a<s.length;a++)s[a]&&(s[a].__=e,t=xn(s[a],t,o,!1));return t}for(t&&!t.parentNode&&(t=_e(e))&&!t.parentNode&&(t=null),d=e.__e,l=t;l&&l.nodeType==8;)l=l.nextSibling;for(d!=l&&(!i&&o.moveBefore&&d.parentNode?o.moveBefore(d,t):o.insertBefore(d,t||null)),t=d;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Nr(e,t,o,i){var s,{key:a,type:d}=e,l=t[o],T=l&&!(2&l.__u);if(l===null&&a==null||T&&a==l.key&&d==l.type)return o;if(i>(T?1:0)){for(s=o-1;s>=0;s--)if((l=t[s])&&!(2&l.__u)&&a==l.key&&d==l.type)return s;for(s=o+1;s<t.length;s++)if((l=t[s])&&!(2&l.__u)&&a==l.key&&d==l.type)return s}return-1}function Sn(e,t,o){o==null&&(o=""),t[0]=="-"?e.setProperty(t,o):e[t]=o}function et(e,t,o,i,s){var a,d;if(t=="style")if(typeof o=="string")e.style.cssText=o;else{if(typeof i=="string"&&(e.style.cssText=i=""),i)for(t in i)o&&t in o||Sn(e.style,t);if(o)for(t in o)i&&o[t]==i[t]||Sn(e.style,t,o[t])}else if(t[0]=="o"&&t[1]=="n")typeof o!="function"&&(o=null),typeof i!="function"&&(i=null),(e.__e||(e.__e={}))[t]=o,o&&i||(d=Yt[t]||(Yt[t]=wr(t)),(e.__a||(e.__a={}))[t]=Qt,a=t!=(t=t.replace(hn,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),o?e.addEventListener(t,d,a):e.removeEventListener(t,d,a));else{if(s=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=o==null?"":o)}catch(l){}if(typeof o=="function")return;o==null||o===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&o==1?"":o)}}function wr(e){return function(t){var o=this.__e;if(o){if(o=o[e],t[tt]==null)t[tt]=Qt++;else if(t[tt]<this.__a[e])return;return o(N.event?N.event(t):t)}}}function yn(e,t,o,i,s,a,d,l,T,R){var u,g,A,c,f,I,C,b,O,w,k,ne,le,ue,W,re,B,X,E=t.type;if(t.constructor!==ke)return null;128&o.__u&&(T=32&o.__u,u=o.__c.__z)&&(t.__u|=T,g=a=[],u.nodeType==8?l=nt(u,a):a.push(u),l=a[0]||l),(u=N.__b)&&u(t);e:if(typeof E=="function"){A=d.length;try{if(b=t.props,O=(u=E.prototype)&&u.render,w=(u=E.contextType)&&i[u.__c],k=u?w?w.props.value:u.__:i,(c=o.__c)?(t.__c=c,2&c.__g&&(c.__g|=1)):(O?t.__c=c=new E(b,k):(t.__c=c=new ot(b,k),c.constructor=E,c.render=Dr),w&&w.sub(c),c.state||(c.state={}),c.__n=i,c.__g|=8,c.__h=[],c.__k=[]),O&&(c.__s||(c.__s=c.state),E.getDerivedStateFromProps&&(c.__s==c.state&&(c.__s=me({},c.__s)),me(c.__s,E.getDerivedStateFromProps(b,c.__s)))),f=c.props,I=c.state,c.__v=t,o.__c){if(b!==f&&O&&!E.getDerivedStateFromProps&&c.componentWillReceiveProps&&c.componentWillReceiveProps(b,k),t.__v==o.__v&&!(8&c.__g)||!(4&c.__g)&&c.shouldComponentUpdate&&c.shouldComponentUpdate(b,c.__s,k)===!1){t.__v!=o.__v&&(c.props=b,c.state=c.__s,c.__g&=-9),t.__e=o.__e,t.__k=o.__k,t.__k.some(function(p){p&&(p.__=t)}),st.push.apply(c.__h,c.__k),c.__k=[],c.__h.length&&d.push(c),l=_e(o);break e}c.componentWillUpdate&&c.componentWillUpdate(b,c.__s,k),O&&c.componentDidUpdate&&c.__h.push(function(){c.componentDidUpdate(f,I,C)})}else O&&!E.getDerivedStateFromProps&&c.componentWillMount&&c.componentWillMount(),O&&c.componentDidMount&&c.__h.push(c.componentDidMount);c.context=k,c.props=b,c.__P=e,c.__g&=-5,ne=N.__r,le=O?25:0;do c.__g&=-9,ne&&ne(t),u=c.render(c.props,c.state=c.__s,c.context);while(8&c.__g&&++le<25);O&&(st.push.apply(c.__h,c.__k),c.__k=[]),c.state=c.__s,c.getChildContext&&(i=me({},i,c.getChildContext())),O&&o.__c&&c.getSnapshotBeforeUpdate&&(C=c.getSnapshotBeforeUpdate(f,I)),ue=u&&u.type===eo&&u.key==null?u.props.children:u,b.__P&&(u=l,s=(e=b.__P).namespaceURI,T=a=null,o.props&&o.props.__P!=e&&(o.__k.some(function(p){p&&oo(p,p)}),o.__k=null),l=o.__k?_e(o,0):null),l=Rn(e,Zt(ue)?ue:[ue],t,o,i,s,a,d,l,T,R),b.__P&&(t.__e=null,l=u),t.__u&=-161,g&&g.some(Te),c.__h.length&&d.push(c),1&c.__g&&(c.__g&=-4)}catch(p){if(d.length=A,t.__v=null,T||a)if(p&&p.then){if(t.__u|=128|T,a){for(~(B=a.indexOf(l||void 0))||(B=a.length);(X=a[B-1])&&X.nodeType==8;)B--;for(;B<a.length;B++)if(X=a[B])if(a[B]=null,W){if(X==re)break}else{if(X.nodeType!=8)break;X.data.startsWith("$s")&&(re=nt(W=X))}}if(!W){for(;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;W=l}(u=nt(W=t.__c.__z||(t.__c.__z=W)))?(t.__e=W,l=u):t.__e=l,l=l&&l.nextSibling}else a&&a.some(Te);else t.__e=o.__e;t.__k||(t.__k=o.__k||[]),p&&p.then||In(t),N.__e(p,t,o)}}else l=t.__e=Lr(o.__e,t,o,i,s,a,d,T,R,e);return(u=N.diffed)&&u(t),l}function nt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var o=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))o++;else if(e.data.startsWith("/$s")&&!--o)return e}t&&t.push(e)}}function In(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(In))}function Pr(e,t,o){for(var i=0;i<o.length;)to(o[i++],o[i++],o[i++]);N.__c&&N.__c(t,e),e.some(function(s){try{e=s.__h,s.__h=[],e.some(function(a){a.call(s)})}catch(a){N.__e(a,s.__v)}})}function Lr(e,t,o,i,s,a,d,l,T,R){var u,g,A,c,f,I,C,b,O=o.props||An,{props:w,type:k}=t;if(k=="svg"?s="http://www.w3.org/2000/svg":k=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),a){for(u=0;u<a.length;u++)if((f=a[u])&&(k?f.localName==k:f.nodeType==3)){e=f,a[u]=null;break}}if(!e){if(b=R.ownerDocument||document,!k)return b.createTextNode(w);e=b.createElementNS(s,k,w.is?w:R),l&&(N.__m&&N.__m(t,a),l=!1),a=null}if(k){if(R=k=="template"&&e.content||e,a=k=="textarea"&&w.defaultValue!=null?null:a&&Ur.call(R.childNodes),!l&&a)for(O={},u=0;u<e.attributes.length;u++)O[(f=e.attributes[u]).name]=f.value;for(u in O)f=O[u],u=="dangerouslySetInnerHTML"?A=f:u=="children"||(u in w)||u=="value"&&("defaultValue"in w)||u=="checked"&&("defaultChecked"in w)||et(e,u,null,f,s);for(u in w)f=w[u],u=="children"?c=f:u=="dangerouslySetInnerHTML"?g=f:u=="value"?I=f:u=="checked"?C=f:l&&typeof f!="function"||O[u]===f||et(e,u,f,O[u],s);g?(l||A&&(g.__html==A.__html||g.__html==e.innerHTML)||(e.innerHTML=g.__html),t.__k=[]):(A&&(e.textContent=""),(k=="foreignObject"||s=="http://www.w3.org/1998/Math/MathML"&&kr.test(k))&&(s="http://www.w3.org/1999/xhtml"),Rn(R,Zt(c)?c:[c],t,o,i,s,a,d,a?a[0]:o.__k&&_e(o,0),l,T),a&&a.some(Te)),l&&k!="textarea"||(u="value",k=="progress"&&I==null?e.removeAttribute(u):I==null||I===e[u]&&(k!="progress"||I)||et(e,u,I,O[u],s),u="checked",C!=null&&C!=e[u]&&et(e,u,C,O[u],s))}else O===w||l&&e.data==w||(e.data=w);return e}function to(e,t,o,i){try{typeof e=="function"?t?t.__x=e(t)||1:i&&(i=i.__c||i.__e)&&(t=i.__x)&&(i.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(s){N.__e(s,o)}}function oo(e,t,o){var i,s,a,d;if(N.unmount&&N.unmount(e),!(i=e.ref)||i.current&&i.current!=e.__e||to(i,null,t,e),i=e.__c){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(l){N.__e(l,t)}i.__P=i.__n=null}if(i=e.__k)for(d=0;d<i.length;d++)i[d]&&oo(i[d],t,typeof e.type!="function"||o&&!e.props.__P);!o&&(i=e.__c)&&(i=i.__z)&&(s=nt(i,a=[]))&&(i==e.__e&&a.some(Te),Te(s),Te(i)),o||Te(e.__e),e.__e=e.__c=e.__=null}function Dr(e,t,o){return this.constructor(e,o)}N={__e:function(e,t,o,i){for(var s,a,d;t=t.__;)if((s=t.__c)&&!(1&s.__g)){s.__g|=4;try{if((d=(a=s.constructor)&&a.getDerivedStateFromError)&&s.setState(a.getDerivedStateFromError(e)),s.componentDidCatch&&(s.componentDidCatch(e,i||{}),d=1),d&&8&s.__g)return void(s.__g|=2)}catch(l){e=l}}throw rt=0,e}},Tn=0,Cr=function(e){return e!=null&&e.constructor===ke},ot.prototype.setState=function(e,t){var o=this.__s;o&&o!=this.state||(o=this.__s=me({},this.state)),typeof e=="function"&&(e=e(me({},o),this.props)),e&&(me(o,e),this.__v&&(t&&this.__k.push(t),fn(this)))},ot.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),fn(this))},ot.prototype.render=eo,pe=[],rt=0,mn=function(e,t){return e.__v.__b-t.__v.__b},tt=Symbol(),hn=/(PointerCapture)$|Capture$/i,Qt=0,Yt={},br=0;var Cn,te,no,bn;var Dn=[],ro=[],F=N,{__b:kn,__r:Un,diffed:Mn,__c:vn,unmount:Nn,__:wn}=F;function $r(){var e;do{for(;e=ro.shift();)try{Ue(e)}catch(o){F.__e(o,{__:(e=e.__P)&&e.__v})}for(;e=Dn.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Ue),t.__h.some(so),t.__h=[]}catch(o){t.__h=[],F.__e(o,e.__v)}}}while(ro.length)}F.__b=function(e){te=null,kn&&kn(e)},F.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),wn&&wn(e,t)},F.__r=function(e){Un&&Un(e),Cn=0;var t=(te=e.__c).__H;t&&(no==te?te.__h=[]:(t.__h.some(Ue),t.__h.some(so),Cn=0),t.__h=[],t.__.some(function(o){o.__N&&(o.__=o.__N),o.u=o.__N=void 0})),no=te},F.diffed=function(e){Mn&&Mn(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&Ln(Dn.push(t)),t.__H.__.some(function(o){o.u&&(o.__H=o.u)})),no=te=null},F.__c=function(e,t){t.some(function(o){try{o.__h.some(Ue),o.__h=o.__h.filter(function(i){return!i.__||so(i)})}catch(i){o.__h=[function(){throw i}]}}),vn&&vn(e,t)},F.unmount=function(e){Nn&&Nn(e);var t,o,i=e.__c;i&&i.__H&&(i.__H.__.some(function(s){try{if(s.__P&&s.__c){if(o===void 0){for(o=e.__;o&&(!o.__c||!o.__c.__P);)o=o.__;o=o&&o.__c}s.__P=o,Ln(ro.push(s))}else Ue(s)}catch(a){t=a}}),i.__H=void 0,t&&F.__e(t,i.__v))};var Pn=typeof requestAnimationFrame=="function";function Gr(e){var t,o=function(){clearTimeout(i),Pn&&cancelAnimationFrame(t),setTimeout(e)},i=setTimeout(o,35);Pn&&(t=requestAnimationFrame(o))}function Ln(e){e!=1&&bn==F.requestAnimationFrame||((bn=F.requestAnimationFrame)||Gr)($r)}function Ue(e){var t=te,o=e.__c;typeof o=="function"&&(e.__c=void 0,o()),te=t}function so(e){var t=te;e.__c=e.__(),te=t}var Y=Dt(),he=null,$n=new Set;Y.onReady((e)=>{he=e,$t(e,document.documentElement);for(let t of $n)t(e)});Y.onItem((e)=>{if(!he||he.item===e)return;he={...he,item:e};for(let t of $n)t(he)});var Gn=()=>he;var Hr=/^[A-Za-z]{1,7}-\d+$/,Hn=25;var Vn=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!Hr.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()};var co=(e,t)=>{if(typeof e!=="string")return"";let o=e.replace(/\s+/g," ").trim();return o.length>t?`${o.slice(0,t-3).trimEnd()}...`:o};class Ee extends Error{}var Vr=9,Xr=(e)=>{let t=[],o=[],i=[];for(let s of e.split(/[\s,;]+/).filter(Boolean)){let a=Vn(s);if(a){if(!t.includes(a))t.push(a);continue}if(/^#?\d{1,9}$/.test(s)&&s.replace("#","").length<=Vr){let d=Number(s.replace("#",""));if(!o.includes(d))o.push(d);continue}i.push(s)}return{keys:t,numbers:o,words:i.join(" ")}},Xn=(e,t,o)=>{let i=co(e.replace(/["\\`]/g,""),t);return JSON.stringify(i||o)},Fn="```",lo=(e)=>`${Fn}openui-lang
${e}
${Fn}`,uo="The user asked for a Linear block.",Fr=(e)=>`${e.key} ${e.title.length>50?`${e.title.slice(0,47)}...`:e.title}`,Bn=async(e,t)=>{let o=await t.number(e);if(o.length===0)throw new Ee(`No issue numbered ${e} was found.`);if(o.length>1)throw new Ee(`${e} matches ${o.slice(0,4).map(Fr).join("; ")}. Type the full key.`);return o[0].key},jn=async(e,t,o)=>{let{keys:i,numbers:s,words:a}=Xr(t);if(e==="linear-issue"){let d=i[0];if(!d&&s.length>0)d=await Bn(s[0],o);if(!d){let l=a.trim();if(!l)throw new Ee("Give an issue key, a number or some words, for example /linear-issue ENG-123.");let T=(await o.search(l))[0];if(!T)throw new Ee(`No issue matches "${co(l,60)}". Try its key.`);d=T.key}return{id:`slash-issue-${d}`,title:`Card: ${d}`,text:`${uo} Put exactly this block in your reply, unchanged, then carry on with what they wrote:

${lo(`root = Stack([card])
card = LinearIssue("${d}")`)}`}}if(e==="linear-list"||e==="linear-pick"){let d=[...i];for(let f of s){let I=await Bn(f,o);if(!d.includes(I))d.push(I)}let l=d.slice(0,Hn),T=e==="linear-pick",R=T?"LinearPickIssue":"LinearIssueList",u=T?Xn(a,400,"Which issue?"):Xn(a,160,"Linear issues"),g=T?"pick":"list";if(l.length>0){let f=JSON.stringify(l.join(","));return{id:`slash-${g}-${l.join("-")}`,title:T?`Pick: ${l.join(", ")}`:`List: ${l.length} ${l.length===1?"issue":"issues"}`,text:`${uo} Put exactly this block in your reply, unchanged, then carry on with what they wrote:

${lo(`root = Stack([${g}])
${g} = ${R}(${u}, ${f})`)}`}}let A=T?"a question to choose one of some issues":"a list of issues",c=a.trim()?` The ${T?"question":"heading"} is ${u}.`:"";return{id:`slash-${g}-agent`,title:T?"Pick an issue":"List of issues",text:`${uo} They want ${A}, and gave no keys.${c} Choose the real issues that fit what they are asking (from this conversation and your Linear context), then put a block like this in your reply, with the keys you chose in place of <keys>:

${lo(`root = Stack([${g}])
${g} = ${R}(${u}, "<keys, comma separated>")`)}

Use only keys you know exist. If none fit, say so instead of guessing.`}}throw new Ee(`This extension has no /${e.slice(0,40)} command.`)};var Kn=(e,t)=>JSON.stringify({query:e,variables:t});class oe extends Error{kind;constructor(e,t){super(t);this.kind=e}}var de=async(e,t)=>{let o;try{o=await Y.request({method:"POST",path:"/graphql",body:Kn(e,t)})}catch(s){if(s instanceof m){if(s.code==="DISCONNECTED"||s.code==="NO_INTEGRATION")throw new oe("disconnected","Linear is not connected.");throw new oe("network",s.message||"Could not reach Linear.")}throw new oe("network",s instanceof Error?s.message:"Could not reach Linear.")}let i;try{i=JSON.parse(o.body)}catch{throw new oe("network",`Linear answered with status ${o.status}.`)}if(o.status===401)throw new oe("disconnected","Linear sign-in expired.");if(i.errors?.length){let s=i.errors[0],a=s.extensions?.code==="RATELIMITED"||s.extensions?.type==="ratelimited";throw new oe(a?"rate-limited":"graphql",s.message)}if(!i.data)throw new oe("graphql","Linear returned no data.");return i.data};var Br=(e)=>{let t=2166136261;for(let o=0;o<e.length;o+=1)t^=e.charCodeAt(o),t=Math.imul(t,16777619)>>>0;return t.toString(36)},it=(e)=>e.replace(/\/+$/,"");var jr=(e)=>e?.match(/^ref:\s*refs\/heads\/(.+?)\s*$/m)?.[1]||null,Kr=(e)=>{let t=e.trim().replace(/\.git$/,"").replace(/\/+$/,""),o=t.match(/^[^@/\s]+@([^:/\s]+):(?!\d+\/)(.+)$/);if(o)return{host:o[1].toLowerCase(),path:o[2]};let i=t.match(/^[a-z+]+:\/\/(?:[^@/]+@)?([^:/]+)(?::\d+)?\/(.+)$/i);if(i)return{host:i[1].toLowerCase(),path:i[2]};return null},Wr=(e)=>{if(!e)return null;let t=e.match(/\[remote "origin"\][^[]*?^\s*url\s*=\s*(\S+)/m)?.[1],o=e.match(/^\s*url\s*=\s*(\S+)/m)?.[1],i=t??o;return i?Kr(i):null},zr=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let o=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(o)return{host:o[1].toLowerCase(),path:o[2]};return null},qr=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,po=async(e,t)=>{let o=it(t),i=(await e.listProjects().catch(()=>{return}))?.projects??[],s=i.find((A)=>it(A.directory)===o)??null,a=null;for(let A of s?[s]:i){let f=((await e.listWorktrees(A.id).catch(()=>{return}))?.worktrees??[]).find((I)=>it(I.directory)===o);if(f){s=A,a=f.branch||null;break}}if(!a)a=jr(await e.readFile(".git/HEAD"));let d=s?`p:${s.id}`:`d:${Br(o)}`,T=[...s?(await e.listSessions(s.id).catch(()=>{return}))?.sessions??[]:[]].sort((A,c)=>c.updatedAt-A.updatedAt),R=[],u=null;for(let A of T){for(let c of A.links??[]){let f=c.url.match(qr)?.[1]?.toUpperCase();if(f&&!R.includes(f))R.push(f);if(!u&&c.kind==="change")u=zr(c.url)}for(let c of A.items){let f=c.data,I=typeof f?.identifier==="string"?f.identifier.toUpperCase():null;if(I&&!R.includes(I))R.push(I)}}let g=Wr(await e.readFile(".git/config"));if(g)await e.setRepo(d,g).catch(()=>{return});else g=await e.getRepo(d).catch(()=>null)??u;return{key:d,ocProjectId:s?.id??null,projectDirectory:s?it(s.directory):o,directory:o,branch:a,repo:g,linkedIssues:R.slice(0,20)}};var Wn=`
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
 }`).join(`
    `)}
  }
`;var zn=`
  query SlashByNumber($filter: IssueFilter) {
    issues(first: 6, filter: $filter) { nodes { identifier title } }
  }
`,qn=`
  query SlashSearch($term: String!) {
    searchIssues(term: $term, first: 3) { nodes { identifier title } }
  }
`;var Jn=`
  query RepoAttachments($url: String!) {
    attachments(first: 100, filter: { url: { contains: $url } }) {
      nodes { url issue { id identifier team { id } project { id } } }
    }
  }
`;var Yn=`
  query SearchProjects($term: String!) {
    searchProjects(term: $term, first: 20) { nodes { 
  id name slugId url icon color health progress startDate targetDate updatedAt
  status { id name type color }
  lead { id name displayName avatarUrl avatarBackgroundColor }
  teams(first: 10) { nodes { id key name } }
 } }
  }
`;var Jr=(e)=>`
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
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
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
  parent { id identifier }
  attachments(first: 4) { nodes { id url title sourceType metadata } }
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }

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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
 } }
  }
`,ISSUE_RELATION_CREATE:`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
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
`,NOTIFICATIONS_MARK_READ:Jr(["n1","n2"])};var Qn=async(e)=>{try{let t=await Y.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},es=async(e,t)=>{try{return await Y.storage.set(e,t),!0}catch{return!1}},ts=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.linearProjectIds)&&Array.isArray(e.teamIds),at=async(e)=>{let t=await Qn(`map:${e}`);return ts(t)?t:null};var Eo=async(e)=>{let t=await Qn(`repo:${e}`);return t&&typeof t.host==="string"&&typeof t.path==="string"?t:null},Zn=async(e,t)=>{let o=await Eo(e);if(o?.host!==t.host||o.path!==t.path)await es(`repo:${e}`,t)};var os=new Map,er=(e)=>{for(let t of e)os.set(t.id,t);return e};var tr=async(e)=>{if(!e.length)return[];let t=await de(Wn,{after:null,filter:{id:{in:[...e].sort()}}});return er(t.projects.nodes)},or=async(e)=>{let t=await de(Yn,{term:e});return er(t.searchProjects.nodes)};var ns=/^[A-Za-z][A-Za-z0-9]{0,6}-\d+$/,nr={listProjects:()=>Y.listProjects(),listWorktrees:(e)=>Y.listWorktrees(e),listSessions:(e)=>Y.listSessions(e),readFile:(e)=>Y.readFile(e).then((t)=>t?.content??null,()=>null),getMapping:at,getRepo:Eo,setRepo:Zn,issuesByIdentifier:async(e)=>{let t=e.filter((i)=>ns.test(i));if(!t.length)return[];let o=await de(_o(t));return Object.values(o).filter((i)=>Boolean(i))},repoAttachments:async(e)=>(await de(Jn,{url:e})).attachments.nodes,searchProjects:or,projectsByIds:tr};var rr=(e)=>e.map((t)=>({key:t.identifier,title:t.title})),rs=async()=>{let e=Gn()?.directory;if(!e)return[];try{let t=await po(nr,e);return(await at(t.key))?.teamIds??[]}catch{return[]}},ss={or:[{assignee:{isMe:{eq:!0}}},{creator:{isMe:{eq:!0}}},{subscribers:{some:{isMe:{eq:!0}}}}]},sr={number:async(e)=>{let t=await rs(),o=[...t.length>0?[{and:[{number:{eq:e}},{team:{id:{in:t}}}]}]:[],{and:[{number:{eq:e}},ss]},{number:{eq:e}}];for(let i of o){let s=rr((await de(zn,{filter:i})).issues.nodes);if(s.length>0)return s}return[]},search:async(e)=>rr((await de(qn,{term:e})).searchIssues.nodes)};Y.onResolve(async({command:e,args:t})=>{try{let o=await jn(e,t,sr);return{providerId:"linear-dashboard",id:o.id,title:o.title,url:"https://linear.app",text:o.text}}catch(o){if(o instanceof Ee)throw o;if(o instanceof oe)throw Error(o.kind==="disconnected"?"Linear is not connected. Connect it in Settings, Integrations.":`Could not reach Linear: ${o.message}`.slice(0,400));throw Error("The Linear command could not be read.")}});})();

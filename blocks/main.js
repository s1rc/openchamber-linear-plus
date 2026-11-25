(()=>{var N="openchamber.sdk",L=1;var On=`
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
`;function bn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(r)=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=n.get(o);if(s!==void 0)clearTimeout(s);n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var na=`(${bn.toString()})(document);`;var In=128,kn=65536;var bt=128;var It=65536;var lo=/^[a-z][a-z0-9-]{0,39}$/;var io=(e)=>Object(e)===e&&!Array.isArray(e),Cn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),ao=(e)=>String(e)===e&&e.length>=1&&e.length<=60,co=(e)=>String(e)===e&&e.length>=1&&e.length<=80,uo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!io(n)||!lo.test(n.id)||!ao(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!Cn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!Cn(n,["kind","id","label","value","options","disabled"]))return!1;if(!co(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!io(o)||!Cn(o,["value","label"])||!co(o.value)||!ao(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var po=["{id}","{segment}","{segments+}"];var vc=new Set(po);var kt=960;var fo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Mc=new Set(fo);var Ct=20000000,vt=256;var vn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,_o=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var mo=/^[A-Za-z0-9_-]{1,80}$/;var Eo=["left","right","top","bottom"];var So=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!So(o,t+1,n))return!1;return!0},wn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(wn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(wn)}return String(e)===e||Number.isFinite(e)},Mn=(e)=>{try{if(String(e.id)!==e.id||!mo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Eo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!So(e.data)||!wn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Un=2000;var To=["file","directory","other","missing"],Nn=(e)=>Boolean(e&&"sessionId"in e),Ln=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var go=/^[0-9a-f]{7,64}$/i,Dn=(e)=>go.test(e),wt=500,Mt=32000,yo=16000,Ao=128,xo=200,Ro=2000,Oo=16000,bo=80,Io=200,ko=16000;var Co=2000;var $n=20000,Pt=1024,Ut=2000000;var Nt=64000,Lt=8000,Gn=4000;var Bn=960000;var vo=999,wo=1e4,ct=500,Mo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],Po=["stopped","starting","ready","failed"],oa=new Set(Mo),Uo=(e)=>oa.has(e),No=(e)=>e&&Uo(e)?e:"HOST_REJECTED",ze=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ze);if(Object(e)===e)return Object.values(e).every(ze);return!1},Lo=(e)=>ze(e)&&JSON.stringify(e).length<=ko,ho=(e)=>e?.trim().slice(0,Io)??"",qe=(e)=>{let t=e.id.trim().slice(0,Ao),n=e.title.trim().slice(0,xo),r=e.url.trim().slice(0,Ro),o=e.text?.trim().slice(0,Oo),s=e.author?.trim().slice(0,bo),i=e.kind==="pull"?"pull":"issue",l={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o)l.text=o;if(s)l.author=s;if(i==="pull"){let f=ho(e.branches?.head),_=ho(e.branches?.base);if(f&&_)l.branches={head:f,base:_}}if(Lo(e.data))l.data=e.data;return l},Hn=(e)=>{let t=qe(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Vn=(e)=>{let t={text:e.text.trim().slice(0,yo)};if(e.send)t.send=!0;return t},Fn=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(vo,Math.max(0,Math.round(e)))},Xn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(wo,Math.max(0,Math.ceil(e)))};var Ye=(e)=>e.length>0&&e.length<=Pt&&!e.includes("\x00")&&!e.includes("\\");var Dt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Co)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},sa=new Set(Po),jn=(e)=>Boolean(e&&"status"in e&&sa.has(String(e.status))&&!("body"in e)),$t=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Wn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Kn=(e)=>Boolean(e&&"written"in e&&e.written===!0),zn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),ia=new Set(To),qn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&ia.has(String(e.kind))&&Number.isFinite(e.size)),Yn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),aa=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ca=(e)=>Object(e)===e?e:null,Pn=(e)=>String(e)===e&&e.length>0,la=(e)=>{if(!Pn(e.id))return null;if(e.ok===!0){let t={channel:N,v:L,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Pn(e.error))return{channel:N,v:L,type:"result",id:e.id,ok:!1,error:e.error,code:No(Pn(e.code)?e.code:void 0)};return null},Jn=(e)=>{let t=ca(e);if(!t||t.channel!==N||t.v!==L)return null;if(t.type==="result")return la(t);if(!aa.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var Do=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),da=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class I extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var $o=()=>Promise.reject(new I("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Gt=()=>Promise.reject(new I("BAD_PATH",`File path must be 1 to ${Pt} characters without NUL or backslash.`)),Bt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new I("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},M=(e)=>(e.value+=1,`oc-${e.value}`),Qn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new I("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((c)=>c===t.parent),r=e.requestTimeoutMs??$n,o=new Set,s=new Set,i=new Set,l=new Set,f=new Set,_=new Set,p=new Set,S=new Set,m=new Set,u=new Set,h=new Set,R=new Set,k=[],y=null,g=null,U=new Set,O=new Set,ie=null,ae=null,se=!1,H=new Map,ce=new Map,z=new Map,V=!1,E={value:0},T=null,le=null,Te=!1,Re=!1,Ke=null,Ce=(c)=>{if(!c)return null;return{sessionId:c.id,phase:c.busy?"started":"completed"}},P=(c)=>{t.parent.postMessage(c,"*")},ee=()=>{if(V||t.parent===t||R.size===0||T?.features?.lateGenerateResults!==!0)return;P({channel:N,v:L,type:"generate-late-listen"})},C=(c,d)=>{for(let x of c)try{x(d)}catch(b){console.error(b)}},me=(c)=>{if(!(c instanceof MessageEvent))return;if(!n(c.source))return;let d=Jn(c.data);if(!d)return;if(d.type==="workspace"){let b=ce.get(d.payload.subscriptionId);if(b)C([b],d.payload.snapshot);return}if(d.type==="shells"){let b=z.get(d.payload.subscriptionId);if(b)C([b],d.payload.snapshot);return}if(d.type==="ready"){if(T=d.payload,le=Ce(d.payload.session),C(o,d.payload),C(s,d.payload.directory),C(i,d.payload.session),le)C(l,le);if(C(f,d.payload.connection),C(_,d.payload.settings),C(p,d.payload.item),d.payload.block)C(S,d.payload.block);ee();return}if(d.type==="service-event"){C(m,d.payload);return}if(d.type==="generate-late"){if(R.size===0)k.push(d.payload);else C(R,d.payload);return}if(d.type==="directory"){if(T)T={...T,directory:d.payload.directory};C(s,d.payload.directory);return}if(d.type==="session"){if(T)T={...T,session:d.payload.session};if(!d.payload.session)le=null;else if(le?.sessionId!==d.payload.session.id)le=Ce(d.payload.session);C(i,d.payload.session);return}if(d.type==="session-lifecycle"){le=d.payload,C(l,d.payload);return}if(d.type==="connection"){if(T)T={...T,connection:d.payload.connection};C(f,d.payload.connection);return}if(d.type==="settings"){if(T)T={...T,settings:d.payload.settings};C(_,d.payload.settings);return}if(d.type==="item"){if(T)T={...T,item:d.payload.item};C(p,d.payload.item);return}if(d.type==="status-control-event"){C(u,d.payload);return}if(d.type==="popover-closed"){C(h,d.payload);return}if(d.type==="action"){let b=(X)=>{if(!V)P({channel:N,v:L,type:"action-result",id:d.id,payload:X})},W=g;if(!W){b({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(d.payload)).then(()=>b({ok:!0}),(X)=>{let Q=(X instanceof Error?X.message:String(X)).trim();b({ok:!1,error:(Q||"Action failed.").slice(0,ct)})});return}if(d.type==="file-open"){let b=d.payload;if(ae&&_o(ae,b))return;ae=b,C(U,d.payload);return}if(d.type==="file-saved"){C(O,d.payload.version);return}if(d.type==="file-snapshot"){let b=(Q)=>{if(!V)P({channel:N,v:L,type:"file-snapshot-result",id:d.id,payload:Q})},W=(Q)=>b({error:(Q.trim()||"Could not read the edited file.").slice(0,ct)}),X=ie;if(!X){W("This extension does not edit files.");return}Promise.resolve().then(()=>X(d.payload.purpose)).then((Q)=>{if(vn(Q)>Ct){W(`The file is over ${Ct} ${"bytes"in Q?"bytes":"characters"}.`);return}if(Q.version.length>vt){W(`The snapshot version is over ${vt} characters.`);return}b({snapshot:"bytes"in Q?{bytes:Q.bytes,version:Q.version}:{content:Q.content,version:Q.version}})},(Q)=>W(Q instanceof Error?Q.message:String(Q)));return}if(d.type==="resolve"){let b=(X)=>{P({channel:N,v:L,type:"resolve-result",id:d.id,payload:X})},W=y;if(!W){b({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(d.payload)).then((X)=>b({item:X?qe(X):null}),(X)=>{let Q=(X instanceof Error?X.message:String(X)).trim();b({error:(Q||"Command failed.").slice(0,ct)})});return}let x=H.get(d.id);if(!x)return;if(clearTimeout(x.timer),H.delete(d.id),d.ok){x.resolve(d.payload);return}x.reject(new I(d.code,d.error))};t.addEventListener("message",me),P({channel:N,v:L,type:"hello"});let te=(c,d=r)=>{if(V||t.parent===t)return Promise.reject(new I("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((x,b)=>{let W=setTimeout(()=>{H.delete(c.id),b(new I("HOST_TIMEOUT","Host did not answer in time."))},d);H.set(c.id,{resolve:x,reject:b,timer:W}),P(c)})},F=(c)=>te(c).then(()=>{return}),q={channel:N,v:L},at=(c)=>{if(!V&&t.parent!==t)P(c)},Qr=()=>at({...q,type:"file-save"}),Zr=(c)=>{if(!Do(c)||!da(c))return;c.preventDefault(),Qr()},eo=(c)=>{if(!Do(c)||c.key!=="Escape"||T?.surface!=="popover"||!T.popover)return;c.preventDefault(),oo(T.popover.id,"escape").catch(()=>{return})},xt=()=>{let c=T?.surface==="popover"?T.popover:void 0;if(!c)return;let d=Te||Re;if(Ke===d)return;Ke=d,so(c.id,d).catch(()=>{return})},Rt=()=>{if(T?.surface!=="popover"||Te)return;Te=!0,xt()},to=(c)=>{if(T?.surface!=="popover"||c.relatedTarget!==null||!Te)return;Te=!1,xt()},no=()=>{if(T?.surface!=="popover"||Re)return;Re=!0,xt()},ro=()=>{if(T?.surface!=="popover"||!Re)return;Re=!1,xt()},Oe=(c,d=1024)=>{if(!c.trim()||c.length>d)throw new I("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},xn=async(c)=>{if(c.kind!=="projects")Oe(c.projectId);let d=await te({...q,type:"workspace-read",id:M(E),payload:c});if(!d||!("kind"in d)||!("state"in d)||d.kind!==c.kind)throw new I("HOST_REJECTED","Host did not return workspace data.");return d},Rn=async(c,d)=>{if(c.kind!=="projects")Oe(c.projectId);let x=M(E);ce.set(x,d);try{await F({...q,type:"workspace-subscribe",id:M(E),payload:{subscriptionId:x,query:c}})}catch(b){if(ce.delete(x),!V)P({...q,type:"workspace-unsubscribe",id:M(E),payload:{subscriptionId:x}});throw b}return()=>{if(!ce.delete(x)||V)return;P({...q,type:"workspace-unsubscribe",id:M(E),payload:{subscriptionId:x}})}},ta=async(c,d)=>{if(c.kind==="session")Oe(c.sessionId);if(c.kind==="project")Oe(c.projectId);let x=M(E);z.set(x,d);try{await F({...q,type:"shells-subscribe",id:M(E),payload:{subscriptionId:x,scope:c}})}catch(b){if(z.delete(x),!V)P({...q,type:"shells-unsubscribe",id:M(E),payload:{subscriptionId:x}});throw b}return()=>{if(!z.delete(x)||V)return;P({...q,type:"shells-unsubscribe",id:M(E),payload:{subscriptionId:x}})}},Ot=async(c)=>{if("key"in c&&(c.key.length===0||c.key.length>In))throw new I("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!ze(c.value))throw new I("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>kn)throw new I("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&T?.features?.deviceStorage!==!0)throw new I("UNSUPPORTED","This host does not support device storage.");let d=await te({...q,type:"storage",id:M(E),payload:c});if(!d||!("storage"in d)||d.op!==c.op)throw new I("HOST_REJECTED","Host did not return storage data.");return d},oo=(c,d)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===c)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):F({...q,type:"popover-close",id:M(E),payload:d?{id:c,reason:d}:{id:c}}),so=(c,d)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===c)?Promise.reject(new I("UNSUPPORTED","This host does not support popovers.")):F({...q,type:"popover-anchor",id:M(E),payload:{id:c,active:d}});return t.addEventListener("keydown",eo,!0),t.addEventListener("pointerover",Rt),t.addEventListener("pointermove",Rt),t.addEventListener("pointerout",to),t.addEventListener("focus",no),t.addEventListener("blur",ro),{onAction:(c)=>(g=c,()=>{if(g===c)g=null}),listProjects:async()=>{let c=await xn({kind:"projects"});if(c.kind!=="projects")throw new I("HOST_REJECTED","Expected projects.");return c},listWorktrees:async(c)=>{let d=await xn({kind:"worktrees",projectId:c});if(d.kind!=="worktrees")throw new I("HOST_REJECTED","Expected worktrees.");return d},listSessions:async(c)=>{let d=await xn({kind:"sessions",projectId:c});if(d.kind!=="sessions")throw new I("HOST_REJECTED","Expected sessions.");return d},onProjects:(c)=>Rn({kind:"projects"},(d)=>{if(d.kind==="projects")c(d)}),onWorktrees:(c,d)=>Rn({kind:"worktrees",projectId:c},(x)=>{if(x.kind==="worktrees")d(x)}),onSessions:(c,d)=>Rn({kind:"sessions",projectId:c},(x)=>{if(x.kind==="sessions")d(x)}),onRunningShells:(c,d)=>ta(c,d),readShellOutput:async(c,d)=>{Oe(c,bt);let x=d?.cursor;if(x!==void 0&&(!Number.isInteger(x)||x<0))throw new I("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let b=d?.tailBytes;if(b!==void 0&&(!Number.isInteger(b)||b<1||b>It))throw new I("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${It}.`);let X=await te({...q,type:"shell-output",id:M(E),payload:{shellId:c,cursor:x,tailBytes:b}});if(!X||typeof X.output!=="string"||!Number.isFinite(X.cursor))throw new I("HOST_REJECTED","Host did not return shell output.");return X},stopShell:async(c)=>{if(Oe(c,bt),(await te({...q,type:"shell-stop",id:M(E),payload:{shellId:c}}))?.stopped!==!0)throw new I("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(c)=>{Oe(c),await F({...q,type:"open-session",id:M(E),payload:{sessionId:c}})},storage:{get:async(c,d)=>{let x=Bt(d),b={op:"get",key:c};if(x)b.scope=x;let W=await Ot(b);return W.op==="get"&&W.found?W.value:void 0},set:async(c,d,x)=>{let b=Bt(x),W={op:"set",key:c,value:d};if(b)W.scope=b;await Ot(W)},delete:async(c,d)=>{let x=Bt(d),b={op:"delete",key:c};if(x)b.scope=x;await Ot(b)},keys:async(c)=>{let d=Bt(c),x={op:"keys"};if(d)x.scope=d;let b=await Ot(x);if(b.op!=="keys")throw new I("HOST_REJECTED","Expected storage keys.");return b.keys}},onReady:(c)=>{if(o.add(c),T)c(T);return()=>{o.delete(c)}},onDirectory:(c)=>{if(s.add(c),T)c(T.directory);return()=>{s.delete(c)}},onSession:(c)=>{if(i.add(c),T)c(T.session);return()=>{i.delete(c)}},onSessionLifecycle:(c)=>{if(l.add(c),le)c(le);return()=>{l.delete(c)}},onConnection:(c)=>{if(f.add(c),T)c(T.connection);return()=>{f.delete(c)}},onSettings:(c)=>{if(_.add(c),T)c(T.settings);return()=>{_.delete(c)}},onItem:(c)=>{if(p.add(c),T)c(T.item);return()=>{p.delete(c)}},onBlock:(c)=>{if(S.add(c),T?.block)c(T.block);return()=>{S.delete(c)}},onServiceEvent:(c)=>(m.add(c),()=>{m.delete(c)}),onStatusControl:(c)=>(u.add(c),()=>{u.delete(c)}),onPopoverClosed:(c)=>(h.add(c),()=>{h.delete(c)}),setStatusControls:(c)=>{if(T?.features?.statusControls!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support status controls."));if(!uo(c))return Promise.reject(new I("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return F({...q,type:"status-controls",id:M(E),payload:{controls:c}})},openPopover:(c)=>{if(T?.features?.popovers!==!0)return Promise.reject(new I("UNSUPPORTED","This host does not support popovers."));if(!Mn(c))return Promise.reject(new I("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return F({...q,type:"popover-open",id:M(E),payload:c})},closePopover:oo,setPopoverAnchorActive:so,onResolve:(c)=>(y=c,()=>{if(y===c)y=null}),toast:(c)=>{let d=c.message.trim();if(!d||d.length>wt)return Promise.reject(new I("HOST_REJECTED",`Toast message must contain 1 to ${wt} characters.`));if(c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>Mt))return Promise.reject(new I("HOST_REJECTED",`Toast copy text must contain 1 to ${Mt} characters.`));return F({channel:N,v:L,type:"toast",id:M(E),payload:{...c,message:d}})},openUrl:(c)=>F({channel:N,v:L,type:"open-url",id:M(E),payload:{url:c}}),openCommit:(c)=>Dn(c)?F({channel:N,v:L,type:"open-commit",id:M(E),payload:{sha:c}}):Promise.reject(new I("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(c)=>F({channel:N,v:L,type:"block-answer",id:M(E),payload:{text:c.trim().slice(0,Un)}}),openSurface:(c)=>F({channel:N,v:L,type:"open-surface",id:M(E),payload:{surfaceId:c}}),writeClipboard:(c)=>F({channel:N,v:L,type:"clipboard-write",id:M(E),payload:{text:c}}),compose:(c)=>F({channel:N,v:L,type:"compose",id:M(E),payload:c}),attach:(c)=>F({channel:N,v:L,type:"attach",id:M(E),payload:qe(c)}),startSession:async(c)=>{if(c.projectId!==void 0)Oe(c.projectId);let d=c.worktree;if(d&&d!==!0)if(d.kind==="existing")Oe(d.directory);else{if(d.name!==void 0)Oe(d.name,200);if(d.baseBranch!==void 0)Oe(d.baseBranch,200)}let x=await te({channel:N,v:L,type:"start-session",id:M(E),payload:Hn(c)},e.requestTimeoutMs??180000);if(!Nn(x))throw new I("HOST_REJECTED","Host did not return a session.");return x},prompt:(c)=>te({channel:N,v:L,type:"prompt",id:M(E),payload:Vn(c)}).then((d)=>{if(!Ln(d))throw new I("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:(c)=>F({channel:N,v:L,type:"session-link",id:M(E),payload:qe(c)}),close:()=>F({channel:N,v:L,type:"close",id:M(E)}),oauthStart:()=>F({channel:N,v:L,type:"oauth-start",id:M(E)}),oauthDisconnect:()=>F({channel:N,v:L,type:"oauth-disconnect",id:M(E)}),request:(c)=>(Dt(c.path)?te({channel:N,v:L,type:"request",id:M(E),payload:c}):$o()).then((d)=>{if(!$t(d))throw new I("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:(c)=>(Dt(c.path)?te({channel:N,v:L,type:"service-request",id:M(E),payload:c}):$o()).then((d)=>{if(!$t(d))throw new I("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>te({channel:N,v:L,type:"service-status",id:M(E)}).then((c)=>{if(!jn(c))throw new I("HOST_REJECTED","Host did not return service status.");return c}),readFile:(c)=>(Ye(c)?te({channel:N,v:L,type:"file-read",id:M(E),payload:{path:c}}):Gt()).then((d)=>{if(!Wn(d))throw new I("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(c,d)=>{if(!Ye(c))return Gt();if(d.length>Ut)return Promise.reject(new I("FILE_TOO_LARGE",`Content is over ${Ut} characters.`));return te({channel:N,v:L,type:"file-write",id:M(E),payload:{path:c,content:d}}).then((x)=>{if(!Kn(x))throw new I("HOST_REJECTED","Host did not confirm the write.");return x})},listDir:(c)=>(Ye(c)?te({channel:N,v:L,type:"file-list",id:M(E),payload:{path:c}}):Gt()).then((d)=>{if(!zn(d))throw new I("HOST_REJECTED","Host did not return directory entries.");return d}),stat:(c)=>(Ye(c)?te({channel:N,v:L,type:"file-stat",id:M(E),payload:{path:c}}):Gt()).then((d)=>{if(!qn(d))throw new I("HOST_REJECTED","Host did not return file status.");return d}),generate:(c)=>{let d=c.prompt.trim(),x=c.system?.trim();if(d.length===0||d.length>Nt)return Promise.reject(new I("HOST_REJECTED",`Prompt must be 1 to ${Nt} characters.`));if(x!==void 0&&(x.length===0||x.length>Lt))return Promise.reject(new I("HOST_REJECTED",`System prompt must be 1 to ${Lt} characters.`));let b=c.maxOutputTokens===void 0?void 0:Math.min(Gn,Math.max(1,Math.floor(c.maxOutputTokens)));if(b!==void 0&&!Number.isFinite(b))return Promise.reject(new I("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:d};if(x!==void 0)W.system=x;if(b!==void 0)W.maxOutputTokens=b;return te({channel:N,v:L,type:"generate",id:M(E),payload:W},e.requestTimeoutMs??Bn).then((X)=>{if(!Yn(X))throw new I("HOST_REJECTED","Host did not return generated text.");return X})},onLateGenerateResult:(c)=>{R.add(c);for(let d of k.splice(0))C([c],d);return ee(),()=>{R.delete(c)}},setBadge:(c)=>F({channel:N,v:L,type:"badge",id:M(E),payload:{count:Fn(c)}}),setHeight:(c)=>F({channel:N,v:L,type:"resize",id:M(E),payload:{height:Xn(c)}}),onFileOpen:(c)=>{if(U.add(c),!se)se=!0,t.addEventListener("keydown",Zr,!0);if(ae)c(ae);return()=>{U.delete(c)}},onFileSnapshot:(c)=>(ie=c,()=>{if(ie===c)ie=null}),onFileSaved:(c)=>(O.add(c),()=>{O.delete(c)}),reportFileChange:(c)=>at({...q,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:Qr,reportFileUnsupported:()=>at({...q,type:"file-unsupported"}),dispose:()=>{for(let c of ce.keys())P({...q,type:"workspace-unsubscribe",id:M(E),payload:{subscriptionId:c}});ce.clear();for(let c of z.keys())P({...q,type:"shells-unsubscribe",id:M(E),payload:{subscriptionId:c}});if(z.clear(),V=!0,y=null,g=null,ie=null,U.clear(),O.clear(),se)t.removeEventListener("keydown",Zr,!0);t.removeEventListener("message",me),t.removeEventListener("keydown",eo,!0),t.removeEventListener("pointerover",Rt),t.removeEventListener("pointermove",Rt),t.removeEventListener("pointerout",to),t.removeEventListener("focus",no),t.removeEventListener("blur",ro);for(let c of H.values())clearTimeout(c.timer),c.reject(new I("HOST_UNAVAILABLE","Host client was disposed."));H.clear(),o.clear(),s.clear(),i.clear(),l.clear(),f.clear(),_.clear(),p.clear(),S.clear(),m.clear(),u.clear(),h.clear(),R.clear(),k.length=0}}};var Go=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Kc=new Set(Go);var Bo=["none","agent","user"];var qc=new Set(Bo);var D,Fo,ua,De,Zn,Wt,Xo,Vt,jo,tr,er,pa,lt=Symbol.for("pv"),Kt={},zt=[],fa=/^m(i|n|o|s|text|space)$/,nr=Array.isArray,Wo=zt.slice,Fe=Object.assign;function Ve(e){e&&e.parentNode&&e.remove()}function Ft(e,t,n,r,o){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:lt,__v:o||++Fo,__i:-1,__u:0};return!o&&D.vnode&&D.vnode(s),s}function Ae(e){return e.children}function Xt(e,t){this.props=e,this.context=t,this.__g=0}function $e(e,t){if(t==null)return e.__&&$e(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:$e(e)}function _a(e){var t,n=e.__v,r=n.__e,o=[],s=[],i=e.__P;i&&((t=Fe({constructor:lt},n)).__v=n.__v+1,D.vnode&&D.vnode(t),rr(i,t,n,e.__n,i.namespaceURI,32&n.__u?[r]:null,o,r||$e(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,Qo(o,t,s),n.__=n.__e=null,t.__e!=r&&Ko(t))}function Ko(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),Ko(e)}function Ho(e){(8&e.__g||(e.__g|=8,De.push(e),Wt++))&&Zn==D.debounceRendering||((Zn=D.debounceRendering)||queueMicrotask)(zo)}function zo(){try{for(var e,t=1;De.length;)De.length>t&&De.sort(Xo),e=De.shift(),t=De.length,8&e.__g&&_a(e)}finally{(Wt=De.length)&&(Zn||queueMicrotask)(zo)}}function qo(e,t,n,r,o,s,i,l,f,_,p){var S,m,u,h,R,k,y=r.__k||zt,g=t.length;for(f=ma(n,t,y,f,g),S=0;S<g;S++)(u=n.__k[S])!=null&&(m=~u.__i&&y[u.__i]||Kt,u.__i=S,k=rr(e,u,m,o,s,i,l,f,_,p),h=u.__e,(m.ref!=u.ref||8&m.__u)&&(m.ref&&or(m.ref,null,u,m),u.ref&&p.push(u.ref,u.__c||h,u)),R=R||h,4&u.__u?(f=Yo(u,f,e,!m.__v),m.__e&&(m.__e=null)):typeof u.type=="function"&&k!==void 0?f=k:h&&(f=h.nextSibling),u.__u&=-21);return n.__e=R,f}function ma(e,t,n,r,o){var s,i,l,f,_,p,S,m,u,h=n.length,R=h,k=0,y=0,g=e.__k=Array(o);for(s=0;s<o;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=g[s]=Ft(null,i):nr(i)?i=g[s]=Ft(Ae,{children:i}):i.constructor===lt&&i.__b?i=g[s]=Ft(i.type,i.props,i.key,i.ref,i.__v):g[s]=i,f=s+k,i.__=e,i.__b=e.__b+1,l=null,~(_=i.__i=Ea(i,n,f,R))&&(R--,(l=n[_])&&(l.__u|=2)),l&&l.__v?(i.__u|=16,_==f-1?k--:_==f+1?k++:_!=f&&(_>f?k--:k++,y=1)):(~_||(o>h?k--:o<h&&k++),typeof i.type!="function"&&(i.__u|=4))):g[s]=null;if(y){for(p=[],S=[],s=0;s<o;s++)if((i=g[s])&&16&i.__u){for(k=0,m=p.length;k<m;)p[u=k+m>>1]<i.__i?k=u+1:m=u;p[k]=i.__i,S[s]=k+1}for(k=p.length;s--;)S[s]&&(S[s]==k?k--:g[s].__u|=4)}if(R)for(s=0;s<h;s++)!(l=n[s])||2&l.__u||(l.__e==r&&(r=$e(l)),sr(l,l));return r}function Yo(e,t,n,r){var o,s,i,l;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=Yo(o[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=$e(e))&&!t.parentNode&&(t=null),i=e.__e,l=t;l&&l.nodeType==8;)l=l.nextSibling;for(i!=l&&(!r&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Ea(e,t,n,r){var o,{key:s,type:i}=e,l=t[n],f=l&&!(2&l.__u);if(l===null&&s==null||f&&s==l.key&&i==l.type)return n;if(r>(f?1:0)){for(o=n-1;o>=0;o--)if((l=t[o])&&!(2&l.__u)&&s==l.key&&i==l.type)return o;for(o=n+1;o<t.length;o++)if((l=t[o])&&!(2&l.__u)&&s==l.key&&i==l.type)return o}return-1}function Vo(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function Ht(e,t,n,r,o){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Vo(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||Vo(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof r!="function"&&(r=null),(e.__e||(e.__e={}))[t]=n,n&&r||(i=er[t]||(er[t]=Sa(t)),(e.__a||(e.__a={}))[t]=tr,s=t!=(t=t.replace(jo,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(l){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function Sa(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[Vt]==null)t[Vt]=tr++;else if(t[Vt]<this.__a[e])return;return n(D.event?D.event(t):t)}}}function rr(e,t,n,r,o,s,i,l,f,_){var p,S,m,u,h,R,k,y,g,U,O,ie,ae,se,H,ce,z,V,E=t.type;if(t.constructor!==lt)return null;128&n.__u&&(f=32&n.__u,p=n.__c.__z)&&(t.__u|=f,S=s=[],p.nodeType==8?l=jt(p,s):s.push(p),l=s[0]||l),(p=D.__b)&&p(t);e:if(typeof E=="function"){m=i.length;try{if(y=t.props,g=(p=E.prototype)&&p.render,U=(p=E.contextType)&&r[p.__c],O=p?U?U.props.value:p.__:r,(u=n.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(g?t.__c=u=new E(y,O):(t.__c=u=new Xt(y,O),u.constructor=E,u.render=Ta),U&&U.sub(u),u.state||(u.state={}),u.__n=r,u.__g|=8,u.__h=[],u.__k=[]),g&&(u.__s||(u.__s=u.state),E.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=Fe({},u.__s)),Fe(u.__s,E.getDerivedStateFromProps(y,u.__s)))),h=u.props,R=u.state,u.__v=t,n.__c){if(y!==h&&g&&!E.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(y,O),t.__v==n.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(y,u.__s,O)===!1){t.__v!=n.__v&&(u.props=y,u.state=u.__s,u.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(T){T&&(T.__=t)}),zt.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),l=$e(n);break e}u.componentWillUpdate&&u.componentWillUpdate(y,u.__s,O),g&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(h,R,k)})}else g&&!E.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),g&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=O,u.props=y,u.__P=e,u.__g&=-5,ie=D.__r,ae=g?25:0;do u.__g&=-9,ie&&ie(t),p=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++ae<25);g&&(zt.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(r=Fe({},r,u.getChildContext())),g&&n.__c&&u.getSnapshotBeforeUpdate&&(k=u.getSnapshotBeforeUpdate(h,R)),se=p&&p.type===Ae&&p.key==null?p.props.children:p,y.__P&&(p=l,o=(e=y.__P).namespaceURI,f=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(T){T&&sr(T,T)}),n.__k=null),l=n.__k?$e(n,0):null),l=qo(e,nr(se)?se:[se],t,n,r,o,s,i,l,f,_),y.__P&&(t.__e=null,l=p),t.__u&=-161,S&&S.some(Ve),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(T){if(i.length=m,t.__v=null,f||s)if(T&&T.then){if(t.__u|=128|f,s){for(~(z=s.indexOf(l||void 0))||(z=s.length);(V=s[z-1])&&V.nodeType==8;)z--;for(;z<s.length;z++)if(V=s[z])if(s[z]=null,H){if(V==ce)break}else{if(V.nodeType!=8)break;V.data.startsWith("$s")&&(ce=jt(H=V))}}if(!H){for(;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;H=l}(p=jt(H=t.__c.__z||(t.__c.__z=H)))?(t.__e=H,l=p):t.__e=l,l=l&&l.nextSibling}else s&&s.some(Ve);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),T&&T.then||Jo(t),D.__e(T,t,n)}}else l=t.__e=ha(n.__e,t,n,r,o,s,i,f,_,e);return(p=D.diffed)&&p(t),l}function jt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function Jo(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(Jo))}function Qo(e,t,n){for(var r=0;r<n.length;)or(n[r++],n[r++],n[r++]);D.__c&&D.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){D.__e(s,o.__v)}})}function ha(e,t,n,r,o,s,i,l,f,_){var p,S,m,u,h,R,k,y,g=n.props||Kt,{props:U,type:O}=t;if(O=="svg"?o="http://www.w3.org/2000/svg":O=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((h=s[p])&&(O?h.localName==O:h.nodeType==3)){e=h,s[p]=null;break}}if(!e){if(y=_.ownerDocument||document,!O)return y.createTextNode(U);e=y.createElementNS(o,O,U.is?U:_),l&&(D.__m&&D.__m(t,s),l=!1),s=null}if(O){if(_=O=="template"&&e.content||e,s=O=="textarea"&&U.defaultValue!=null?null:s&&Wo.call(_.childNodes),!l&&s)for(g={},p=0;p<e.attributes.length;p++)g[(h=e.attributes[p]).name]=h.value;for(p in g)h=g[p],p=="dangerouslySetInnerHTML"?m=h:p=="children"||(p in U)||p=="value"&&("defaultValue"in U)||p=="checked"&&("defaultChecked"in U)||Ht(e,p,null,h,o);for(p in U)h=U[p],p=="children"?u=h:p=="dangerouslySetInnerHTML"?S=h:p=="value"?R=h:p=="checked"?k=h:l&&typeof h!="function"||g[p]===h||Ht(e,p,h,g[p],o);S?(l||m&&(S.__html==m.__html||S.__html==e.innerHTML)||(e.innerHTML=S.__html),t.__k=[]):(m&&(e.textContent=""),(O=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&fa.test(O))&&(o="http://www.w3.org/1999/xhtml"),qo(_,nr(u)?u:[u],t,n,r,o,s,i,s?s[0]:n.__k&&$e(n,0),l,f),s&&s.some(Ve)),l&&O!="textarea"||(p="value",O=="progress"&&R==null?e.removeAttribute(p):R==null||R===e[p]&&(O!="progress"||R)||Ht(e,p,R,g[p],o),p="checked",k!=null&&k!=e[p]&&Ht(e,p,k,g[p],o))}else g===U||l&&e.data==U||(e.data=U);return e}function or(e,t,n,r){try{typeof e=="function"?t?t.__x=e(t)||1:r&&(r=r.__c||r.__e)&&(t=r.__x)&&(r.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){D.__e(o,n)}}function sr(e,t,n){var r,o,s,i;if(D.unmount&&D.unmount(e),!(r=e.ref)||r.current&&r.current!=e.__e||or(r,null,t,e),r=e.__c){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(l){D.__e(l,t)}r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&sr(r[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(r=e.__c)&&(r=r.__z)&&(o=jt(r,s=[]))&&(r==e.__e&&s.some(Ve),Ve(o),Ve(r)),n||Ve(e.__e),e.__e=e.__c=e.__=null}function Ta(e,t,n){return this.constructor(e,n)}function Zo(e,t){var n,r,o,s;D.__&&D.__(e,t),t.nodeType==9&&(t=t.documentElement),r=(n=e&&32&e.__u)?null:t.__k,t.__k=Ft(Ae,{children:[e]}),o=[],s=[],rr(t,t.__k,r||Kt,Kt,t.namespaceURI,r?null:t.firstChild?Wo.call(t.childNodes):null,o,r?r.__e:t.firstChild,n,s),Qo(o,t.__k,s),t.__k.props.children=null}D={__e:function(e,t,n,r){for(var o,s,i;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((i=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,r||{}),i=1),i&&8&o.__g)return void(o.__g|=2)}catch(l){e=l}}throw Wt=0,e}},Fo=0,ua=function(e){return e!=null&&e.constructor===lt},Xt.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=Fe({},this.state)),typeof e=="function"&&(e=e(Fe({},n),this.props)),e&&(Fe(n,e),this.__v&&(t&&this.__k.push(t),Ho(this)))},Xt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Ho(this))},Xt.prototype.render=Ae,De=[],Wt=0,Xo=function(e,t){return e.__v.__b-t.__v.__b},Vt=Symbol(),jo=/(PointerCapture)$|Capture$/i,tr=0,er={},pa=0;var ut,ne,ir,es,ar=Object.is,qt=0,ls=[],cr=[],Z=D,{__b:ts,__r:ns,diffed:rs,__c:os,unmount:ss,__:is}=Z;function dr(e,t){Z.__h&&Z.__h(ne,e,qt||t),qt=0;var n=ne.__H||(ne.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function v(e){return qt=1,ga(us,e)}function ga(e,t,n){var r=dr(ut++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):us(void 0,t),function(s){var i=(r.__N||r.__)[0],l=r.t(i,s);ar(i,l)||(r.__N=[l,r.__[1]],r.__c.setState({}))}],r.__c=ne,!ne.__f)){ne.__f=!0;var o=ne.shouldComponentUpdate;ne.shouldComponentUpdate=function(s,i,l){var f=this.__H;if(!f)return!0;var _=!1,p=this.props!=s;if(f.__.some(function(m){m.__N&&(_=!0,ar(m.__[0],m.__N[0])||(p=!0))}),o){var S=o.call(this,s,i,l);return _?S||p:S}return!_||p}}return r.__}function de(e,t){var n=dr(ut++,3);!Z.__s&&ds(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,ne.__H.__h.push(n))}function Ge(e){return qt=5,pt(function(){return{current:e}},[])}function pt(e,t){var n=dr(ut++,7);return ds(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function ya(){var e;do{for(;e=cr.shift();)try{dt(e)}catch(n){Z.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=ls.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(dt),t.__h.some(lr),t.__h=[]}catch(n){t.__h=[],Z.__e(n,e.__v)}}}while(cr.length)}Z.__b=function(e){ne=null,ts&&ts(e)},Z.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),is&&is(e,t)},Z.__r=function(e){ns&&ns(e),ut=0;var t=(ne=e.__c).__H;t&&(ir==ne?ne.__h=[]:(t.__h.some(dt),t.__h.some(lr),ut=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),ir=ne},Z.diffed=function(e){rs&&rs(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&cs(ls.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),ir=ne=null},Z.__c=function(e,t){t.some(function(n){try{n.__h.some(dt),n.__h=n.__h.filter(function(r){return!r.__||lr(r)})}catch(r){n.__h=[function(){throw r}]}}),os&&os(e,t)},Z.unmount=function(e){ss&&ss(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{if(o.__P&&o.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}o.__P=n,cs(cr.push(o))}else dt(o)}catch(s){t=s}}),r.__H=void 0,t&&Z.__e(t,r.__v))};var as=typeof requestAnimationFrame=="function";function Aa(e){var t,n=function(){clearTimeout(r),as&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);as&&(t=requestAnimationFrame(n))}function cs(e){e!=1&&es==Z.requestAnimationFrame||((es=Z.requestAnimationFrame)||Aa)(ya)}function dt(e){var t=ne,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),ne=t}function lr(e){var t=ne;e.__c=e.__(),ne=t}function ds(e,t){return!e||e.length!=t.length||t.some(function(n,r){return!ar(n,e[r])})}function us(e,t){return typeof t=="function"?t(e):t}var xa=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ra=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ps=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of xa)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of Ra){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},ur=(e,t)=>{if(ps(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var Oa={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},K=(e,t)=>`var(--${e}, var(--oc-${Oa[e]}, ${t}))`,Me=K("surface-background","transparent"),Jt=K("surface-elevated","transparent"),Je=K("surface-elevated-foreground","inherit"),ge=K("surface-foreground","inherit"),Y=K("surface-muted-foreground","gray"),ba=K("surface-muted","transparent"),Xe=K("interactive-border","currentColor"),Ee=K("interactive-hover","transparent"),je=K("interactive-active","transparent"),pr=K("interactive-selection","transparent"),fr=K("interactive-selection-foreground","inherit"),we=K("primary","currentColor"),_r=K("primary-text","inherit"),mr=K("error-text","inherit"),Ia=K("font-sans","inherit"),Er=K("font-mono","monospace"),Es=K("radius","9px"),Sr=`calc(${Es} - 2px)`,fs=`calc(${Es} - 4px)`,J=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,_s=`background-image: linear-gradient(${Ee}, ${Ee});`,hr=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Tr="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ms="box-shadow: var(--oc-sdk-lit);",gr=`inset 0 0.5px 0 0 ${J(ge,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,ka=`
:root {
  --oc-sdk-edge: ${J(ge,16)};
  --oc-sdk-field-bg: ${Jt};
  --oc-sdk-raised-bg: ${Me};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${J(ge,14)};
  --oc-sdk-field-bg: ${J(Me,50,Jt)};
  --oc-sdk-raised-bg: ${Jt};
  --oc-sdk-field-lift: ${gr};
  --oc-sdk-raised-lift: ${gr};
  --oc-sdk-lit: ${gr};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Yt=(e)=>{let t=K(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${K(`${e}-text`,"inherit")}; }`},Ca=`
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
`,Ss=`${ka}
.oc-sdk { color: ${ge}; font-family: ${Ia}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${_s} }
.oc-sdk-mono { font-family: ${Er}; }
.oc-sdk-muted { color: ${Y}; }
${Yt("success")}${Yt("warning")}${Yt("error")}${Yt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${we}; --oc-sdk-tone-text: ${_r}; }

.oc-sdk-btn { border-radius: ${Sr}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${fs}; }
.oc-sdk-btn[data-variant="default"] { color: ${_r}; background: ${J(we,10,Me)}; border-color: ${J(we,12)}; ${ms} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${J(we,16,Me)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${J(we,22,Me)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ba}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${je}, ${je}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Je}; ${Tr} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${je}, ${je}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Ee}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${je}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${K("status-error","red")}; color: ${mr}; background: ${J("var(--oc-sdk-tone)",7,Me)}; border-color: ${J("var(--oc-sdk-tone)",12)}; ${ms} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${J("var(--oc-sdk-tone)",9,Me)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${J("var(--oc-sdk-tone)",11,Me)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Y}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${mr}; }
.oc-sdk-input { border-radius: ${Sr}; background: var(--oc-sdk-field-bg); color: ${Je}; ${hr("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Y}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${hr(J(ge,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${hr(K("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Er}; }

.oc-sdk-search-icon { color: ${Y}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${we}; }
.oc-sdk-search-clear { border-radius: ${fs}; color: ${Y}; }
.oc-sdk-search-clear:hover { background: ${Ee}; color: ${ge}; }

.oc-sdk-trigger { border-radius: ${Sr}; background: var(--oc-sdk-raised-bg); color: ${Je}; ${Tr} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${je}, ${je}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Y}; }
.oc-sdk-trigger-chevron { color: ${Y}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Je}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Jt}; background-clip: padding-box; color: ${Je}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Ee}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${pr}; color: ${fr}; }
.oc-sdk-option-check { color: ${ge}; }
.oc-sdk-option[data-destructive="true"] { color: ${mr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${J(K("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Y}; }
.oc-sdk-popup-empty { color: ${Y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Xe}; border-radius: 4px; color: ${ge}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${J(ge,60,Xe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Xe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Me}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${we}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${_s} }
.oc-sdk-check-desc { color: ${Y}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${J(ge,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Y}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ge}; }
.oc-sdk-tab[aria-selected="true"] { color: ${fr}; background: ${pr}; border-color: ${Xe}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Je}; background: var(--oc-sdk-raised-bg); ${Tr} }
.oc-sdk-tab-count { color: ${Y}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${J(ge,6)}; color: ${Y}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${J("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Ee}; }
.oc-sdk-row[aria-selected="true"] { background: ${pr}; color: ${fr}; }
.oc-sdk-row-lead { font-family: ${Er}; color: ${Y}; }
.oc-sdk-row-sub { color: ${Y}; }
.oc-sdk-row-meta { color: ${Y}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Y}; }

.oc-sdk-empty-body { color: ${Y}; }

.oc-sdk-spinner { color: ${Y}; }
.oc-sdk-spinner-ring { border-color: ${Xe}; border-top-color: ${we}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${J("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Y}; }

.oc-sdk-separator { color: ${Y}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${J(Xe,40)}; }

.oc-sdk-progress-label { color: ${Y}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${J(ge,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${we}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${K("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${K("success-text","inherit")}; }

.oc-sdk-text a { color: ${_r}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${J(Xe,60)}; }
`,G=`
${On}
${Ca}
${Ss}`;var hs="oc-sdk-ui-style",Pe=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},B=(e)=>{let t=document.getElementById(hs);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}bn(document);let n=document.createElement("style");n.id=hs,n.textContent=e,document.head.appendChild(n)},A=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},Se=(e)=>{let t=A("button",e);return t.type="button",t},j=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},ye=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},Ts=(e,t)=>{let n=(r)=>{if(r.target instanceof Node&&e.contains(r.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var va=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ue=(e,t)=>{B(G);let n=t,r=Se("oc-sdk oc-sdk-btn"),o=va(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{if(r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=Boolean(n.disabled)||Boolean(n.loading),r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r)r.prepend(o);else if(!n.loading&&o.parentNode===r)o.remove();j(s,n.label)},l=()=>{if(n.disabled||n.loading)return;n.onClick()};return r.addEventListener("click",l),i(),{update:(f)=>{n={...n,...f},i()},dispose:()=>{r.removeEventListener("click",l),r.remove()}}};var yr=(e,t)=>{B(G);let n=t,r=A("label","oc-sdk oc-sdk-field"),o=A("span","oc-sdk-field-label"),s=n.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),i=A("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let l=()=>{if(j(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),ye(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let _=Boolean(n.error);r.dataset.invalid=_?"true":"false",s.setAttribute("aria-invalid",_?"true":"false");let p=n.error??n.helper??"";j(i,p),i.hidden=p===""},f=()=>{n.onChange(s.value)};return s.addEventListener("input",f),l(),{update:(_)=>{n={...n,..._},l()},dispose:()=>{s.removeEventListener("input",f),r.remove()}}};var wa={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},be=(e,t,n)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n)r.setAttribute("class",n);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",wa[e]),r.append(o),r};var Ar=(e,t)=>{B(G);let n=t,r=A("div","oc-sdk oc-sdk-search"),o=A("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Se("oc-sdk-search-clear");s.append(be("close",14)),s.tabIndex=-1,r.append(be("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let p=n.placeholder??"Search";if(ye(o,"placeholder",p),o.setAttribute("aria-label",n.label??p),s.setAttribute("aria-label","Clear search"),o.value!==n.value)o.value=n.value;r.dataset.active=n.value.trim()===""?"false":"true"},l=()=>{if(n.value!=="")n.onChange("");o.focus()},f=()=>{n.onChange(o.value)},_=(p)=>{if(p.key==="Escape"&&o.value!=="")p.preventDefault(),l()};if(o.addEventListener("input",f),o.addEventListener("keydown",_),s.addEventListener("click",l),i(),n.autofocus)o.focus();return{update:(p)=>{n={...n,...p},i()},dispose:()=>{o.removeEventListener("input",f),o.removeEventListener("keydown",_),s.removeEventListener("click",l),r.remove()}}};var ve=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Ne=(e,t,n)=>{let r=e.filter((f)=>!f.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex((f)=>f.id===t);if(i===-1)return n==="next"?o.id:s.id;return r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var gs=(e,t)=>`${e}-${t??""}`,Qt=(e,t,n,r)=>{let o=Se("oc-sdk-option");if(o.id=gs(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(n.disabled),t==="option")o.setAttribute("aria-selected",n.selected?"true":"false");o.dataset.destructive=n.destructive?"true":"false";let s=A("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=A("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=A("span","oc-sdk-option-check");i.append(be("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Zt=(e,t,n,r)=>{let o=gs(n,r);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";ye(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Ma=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;if(r>o&&n.top-8>o)e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},en=(e,t,n,r)=>{e.append(n),Ma(n,t);let o=Ts(e,r),s=()=>{r()},i=(l)=>{if(l.target instanceof Node&&n.contains(l.target))return;r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var ys=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((r)=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n))},Pa=0,tn=(e,t)=>{B(G);let n=t,r=`oc-sdk-select-${Pa+=1}`,o=A("div","oc-sdk oc-sdk-select"),s=A("span","oc-sdk-field-label");s.id=`${r}-label`;let i=Se("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let l=A("span","oc-sdk-trigger-value");i.append(l,be("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let f="",_=null,p=null,S=A("div","oc-sdk oc-sdk-popup"),m=A("div","oc-sdk-popup-search"),u=A("input","oc-sdk-input");u.type="text",u.autocomplete="off",m.append(u);let h=A("div");h.setAttribute("role","listbox"),h.tabIndex=-1,S.append(h);let R=()=>ys(n.options,n.searchable?f:""),k=()=>n.searchable?u:h,y=(E)=>{_=E,Zt(h,k(),r,E)},g=()=>{Pe(h);let E=R();if(E.length===0){let T=A("div","oc-sdk-popup-empty");T.textContent="No matches",h.append(T)}for(let T of E)h.append(Qt(r,"option",{...T,selected:T.id===n.value},{hover:()=>y(T.id),pick:()=>ie(T.id)}));y(E.some((T)=>T.id===_)?_:E[0]?.id??null)},U=()=>{let E=p;p=null,E?.(),f="",u.value="",i.setAttribute("aria-expanded","false")},O=()=>{if(p||n.disabled)return;if(_=n.value,u.placeholder=n.searchPlaceholder??"Search",n.searchable)S.prepend(m);else m.remove();g(),p=en(o,i,S,U),i.setAttribute("aria-expanded","true"),k().focus()},ie=(E)=>{if(U(),i.focus(),E!==n.value)n.onChange(E)},ae=()=>{if(p)U();else O()},se=(E)=>{if(!p&&ve(E))E.preventDefault(),O()},H=(E)=>{let T=ve(E);if(T)E.preventDefault(),y(Ne(R(),_,T));else if(E.key==="Enter"){if(E.preventDefault(),_)ie(_)}else if(E.key==="Escape")E.preventDefault(),U(),i.focus();else if(n.searchable&&E.target!==u&&E.key.length===1&&!E.ctrlKey&&!E.metaKey)u.focus()},ce=()=>{f=u.value,g()},z=(E)=>{if(p&&!(E.relatedTarget instanceof Node&&o.contains(E.relatedTarget)))U()},V=()=>{j(s,n.label),s.hidden=!n.label;let E=n.options.find((T)=>T.id===n.value);if(j(l,E?.label??n.placeholder??"Select"),l.dataset.empty=E?"false":"true",i.disabled=Boolean(n.disabled),p)g()};return i.addEventListener("click",ae),i.addEventListener("keydown",se),S.addEventListener("keydown",H),u.addEventListener("input",ce),o.addEventListener("focusout",z),V(),{update:(E)=>{n={...n,...E},V()},dispose:()=>{U(),i.removeEventListener("click",ae),i.removeEventListener("keydown",se),S.removeEventListener("keydown",H),u.removeEventListener("input",ce),o.removeEventListener("focusout",z),o.remove()}}};var As=(e,t,n)=>{B(G);let r=t,o=Se("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=A("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(be("check",12));let i=A("span","oc-sdk-check-text"),l=A("span","oc-sdk-check-label"),f=A("span","oc-sdk-check-desc");i.append(l,f),o.append(s,i),e.append(o);let _=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=Boolean(r.disabled),j(l,r.label),j(f,r.description),f.hidden=!r.description},p=()=>{if(!r.disabled)r.onChange(!r.checked)};return o.addEventListener("click",p),_(),{update:(S)=>{r={...r,...S},_()},dispose:()=>{o.removeEventListener("click",p),o.remove()}}},xr=(e,t)=>As(e,t,"checkbox"),nn=(e,t)=>As(e,t,"switch");var Rr=(e,t)=>{B(G);let n=t,r=A("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Pe(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let l=Se("oc-sdk-tab");l.setAttribute("role","tab");let f=i.id===n.activeId;l.setAttribute("aria-selected",f?"true":"false"),l.tabIndex=f?0:-1,l.dataset.id=i.id;let _=A("span");if(_.textContent=i.label,l.append(_),i.count!==void 0){let p=A("span","oc-sdk-tab-count");p.textContent=String(i.count),l.append(p)}l.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),r.append(l)}},s=(i)=>{let l=ve(i,"horizontal");if(!l)return;let f=Ne(n.items,n.activeId,l);if(f&&f!==n.activeId){i.preventDefault(),n.onChange(f);let _=r.querySelector(`[data-id="${CSS.escape(f)}"]`);if(_ instanceof HTMLElement)_.focus()}};return r.addEventListener("keydown",s),o(),{update:(i)=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var ft=(e,t)=>{ye(e,"data-tone",t&&t!=="neutral"?t:null)},Or=(e,t)=>{B(G);let n=t,r=A("span","oc-sdk oc-sdk-badge");e.append(r);let o=()=>{j(r,n.label),ft(r,n.tone)};return o(),{update:(s)=>{n={...n,...s},o()},dispose:()=>{r.remove()}}};var Ua=0,br=(e,t)=>{B(G);let n=t,r=`oc-sdk-list-${Ua+=1}`,o=A("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,i=(S)=>`${r}-${S}`,l=(S)=>{s=S;for(let m of Array.from(o.children))if(m instanceof HTMLElement)m.dataset.active=m.id===i(S??"")?"true":"false";ye(o,"aria-activedescendant",S?i(S):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},f=(S,m)=>{let u=A("span",S);return u.textContent=m,u},_=()=>{if(Pe(o),ye(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(f("oc-sdk-list-empty",n.emptyText??"Nothing here")),l(null);return}for(let m of n.items){let u=Se("oc-sdk-row");if(u.id=i(m.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",m.id===n.selectedId?"true":"false"),u.disabled=Boolean(m.disabled),u.tabIndex=-1,m.leading)u.append(f("oc-sdk-row-lead",m.leading));let h=A("span","oc-sdk-row-main");if(h.append(f("oc-sdk-row-title",m.title)),m.subtitle)h.append(f("oc-sdk-row-sub",m.subtitle));if(u.append(h),m.badge){let R=f("oc-sdk-badge",m.badge.label);ft(R,m.badge.tone),u.append(R)}if(m.meta)u.append(f("oc-sdk-row-meta",m.meta));u.addEventListener("click",()=>n.onSelect(m.id)),o.append(u)}let S=n.items.some((m)=>m.id===s&&!m.disabled);l(S?s:n.selectedId??null)},p=(S)=>{let m=ve(S);if(m){S.preventDefault(),l(Ne(n.items,s,m));return}if((S.key==="Enter"||S.key===" ")&&s)S.preventDefault(),n.onSelect(s)};return o.addEventListener("keydown",p),_(),{update:(S)=>{n={...n,...S},_()},dispose:()=>{o.removeEventListener("keydown",p),o.remove()}}};var Ir=(e,t)=>{B(G);let n=t,r=A("div","oc-sdk oc-sdk-empty"),o=A("h2","oc-sdk-empty-title"),s=A("p","oc-sdk-empty-body"),i=A("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let l=null,f=()=>{if(j(o,n.title),j(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){l?.dispose(),l=null;return}let _={label:n.action.label,onClick:n.action.onClick};if(l)l.update(_);else l=Ue(i,{..._,variant:"outline",size:"sm"})};return f(),{update:(_)=>{n={...n,..._},f()},dispose:()=>{l?.dispose(),l=null,r.remove()}}};var kr=(e,t={})=>{B(G);let n=t,r=A("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=A("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=A("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",j(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(l)=>{n={...n,...l},i()},dispose:()=>{r.remove()}}};var Cr=(e,t)=>{B(G);let n=t,r=A("div","oc-sdk oc-sdk-banner"),o=A("div","oc-sdk-banner-text"),s=A("div","oc-sdk-banner-title"),i=A("div","oc-sdk-banner-body"),l=A("div","oc-sdk-banner-action");o.append(s,i),r.append(o,l),e.append(r);let f=null,_=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),j(s,n.title),j(i,n.body),i.hidden=!n.body,l.hidden=!n.action,!n.action){f?.dispose(),f=null;return}let p={label:n.action.label,onClick:n.action.onClick};if(f)f.update(p);else f=Ue(l,{...p,variant:"outline",size:"xs"})};return _(),{update:(p)=>{n={...n,...p},_()},dispose:()=>{f?.dispose(),f=null,r.remove()}}};var Na=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,vr=(e,t)=>{B(G);let n=t,r=A("div","oc-sdk oc-sdk-progress"),o=A("div","oc-sdk-progress-label"),s=A("span"),i=A("span","oc-sdk-progress-value"),l=A("span"),f=be("check",14);i.append(f,l),o.append(s,i);let _=A("div","oc-sdk-progress-track");_.setAttribute("role","progressbar"),_.setAttribute("aria-valuemin","0"),_.setAttribute("aria-valuemax","100");let p=A("div","oc-sdk-progress-fill");_.append(p),r.append(o,_),e.append(r);let S=()=>{let m=Na(n.value);if(ft(p,n.tone),p.style.transform=`scaleX(${m/100})`,_.setAttribute("aria-valuenow",String(m)),n.label)_.setAttribute("aria-label",n.label);else _.removeAttribute("aria-label");j(s,n.label),j(l,`${m}%`);let u=m===100&&(!n.tone||n.tone==="neutral");ye(r,"data-done",u?"true":null),f.style.display=u?"":"none",o.hidden=!n.label};return S(),{update:(m)=>{n={...n,...m},S()},dispose:()=>{r.remove()}}};var xs=(e)=>e.filter((t)=>!("separator"in t)),La=0,wr=(e,t)=>{B(G);let n=t,r=`oc-sdk-menu-${La+=1}`,o=A("div","oc-sdk oc-sdk-menu");e.append(o);let s=A("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,l=null,f=Ue(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)m();else u()}}),_=o.querySelector("button");_?.setAttribute("aria-haspopup","menu");let p=(y)=>{l=y,Zt(s,s,r,y)},S=()=>{Pe(s);for(let y of n.items){if("separator"in y){let g=A("div","oc-sdk-separator");g.dataset.labeled="false",s.append(g);continue}s.append(Qt(r,"menuitem",y,{hover:()=>p(y.id),pick:()=>h(y.id)}))}p(xs(n.items).some((y)=>y.id===l)?l:null)},m=()=>{let y=i;i=null,y?.(),l=null,_?.setAttribute("aria-expanded","false")},u=()=>{if(i||!_)return;S(),i=en(o,_,s,m),_.setAttribute("aria-expanded","true"),s.focus()},h=(y)=>{m(),_?.focus(),n.onSelect(y)},R=(y)=>{let g=ve(y);if(g)y.preventDefault(),p(Ne(xs(n.items),l,g));else if(y.key==="Enter"||y.key===" "){if(y.preventDefault(),l)h(l)}else if(y.key==="Escape")y.preventDefault(),m(),_?.focus()},k=(y)=>{if(i&&!(y.relatedTarget instanceof Node&&o.contains(y.relatedTarget)))m()};return s.addEventListener("keydown",R),o.addEventListener("focusout",k),{update:(y)=>{if(n={...n,...y},f.update({label:n.label,variant:n.variant,size:n.size}),i)S()},dispose:()=>{m(),s.removeEventListener("keydown",R),o.removeEventListener("focusout",k),f.dispose(),o.remove()}}};var w=Qn(),Le=null,rn=new Set;w.onReady((e)=>{Le=e,ur(e,document.documentElement);for(let t of rn)t(e)});w.onItem((e)=>{if(!Le||Le.item===e)return;Le={...Le,item:e};for(let t of rn)t(Le)});var Qe=()=>{let[e,t]=v(Le);return de(()=>{if(rn.add(t),Le)t(Le);return()=>{rn.delete(t)}},[]),e};var Da=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},Rs=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),$a=(e,t)=>{let n=e;for(let r of t){if(n===null||n===void 0)return;n=n[r]}return n},Mr=(e,t)=>{let n=(r,o)=>{if(typeof r==="function")return(...s)=>{let i=$a(t.current,o);return typeof i==="function"?i(...s):void 0};if(Array.isArray(r))return r.map((s,i)=>n(s,[...o,i]));if(Da(r))return Object.fromEntries(Object.entries(r).map(([s,i])=>[s,n(i,[...o,s])]));return r};return n(e,[])};var Ga=Symbol.for("pv"),Ba=0;function a(e,t,n,r,o,s){t||(t={});var i,l,f=t;if("ref"in f&&typeof e!="function")for(l in f={},t)l=="ref"?i=t[l]:f[l]=t[l];var _={type:e,props:f,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Ga,__v:--Ba,__i:-1,__u:0};return(o||s)&&(_.__source=o,_.__self=s),D.vnode&&D.vnode(_),_}var Pr=(...e)=>e.filter(Boolean).join(" ");var re=({children:e,class:t})=>a("span",{class:Pr("sui-chip",t),children:e},void 0,!1,void 0,this),Os=({children:e,onClick:t,pressed:n,class:r})=>t?a("button",{type:"button",class:Pr("sui-card",r),"aria-pressed":n,onClick:t,children:e},void 0,!1,void 0,this):a("div",{class:Pr("sui-card sui-card--static",r),children:e},void 0,!1,void 0,this);var _t=({title:e,children:t})=>a("div",{class:"sui-section",children:[e&&a("h3",{class:"sui-section-title",children:e},void 0,!1,void 0,this),t]},void 0,!0,void 0,this),bs=({items:e})=>a("dl",{class:"sui-kv",children:e.flatMap(([t,n])=>[a("dt",{children:t},void 0,!1,void 0,this),a("dd",{children:n},void 0,!1,void 0,this)])},void 0,!1,void 0,this),Is=(e,t)=>{let n=Ge(null),r=Ge(null),o=Ge(t);o.current=t;let s=Rs(t),i=Ge(!1);de(()=>{if(!n.current)return;return r.current=e(n.current,Mr(o.current,o)),i.current=!0,()=>{r.current?.dispose(),r.current=null,i.current=!1}},[]);let l=Ge(s);return de(()=>{if(!i.current||l.current===s)return;l.current=s,r.current?.update(Mr(o.current,o))},[s]),n};var Ie=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let r=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...r?{}:{year:"numeric"}})},ks=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let r=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-r)/86400000)},Cs=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let r=Math.max(0,Math.round((t-n)/60000));if(r<1)return"just now";if(r<60)return`${r}m ago`;let o=Math.round(r/60);if(o<24)return`${o}h ago`;let s=Math.round(o/24);if(s<30)return`${s}d ago`;return Ie(e,new Date(t))};var Ha={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},Ze=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return Ha[e]??String(e);return String(e)},Ur=(e)=>{let t=e.url.match(/\/-\/merge_requests\/(\d+)/),n=e.url.match(/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/),r=t?.[1]??n?.[1];if(!r)return null;let o=e.metadata??{},s=String(o.status??o.state??"").toLowerCase(),l=o.draft===!0||o.isDraft===!0||s==="draft"?"draft":s==="merged"?"merged":s==="closed"?"closed":s==="open"||s==="opened"||s==="approved"||s==="reviewing"?"open":null;return{label:`${t?"!":"#"}${r}`,status:l,url:e.url,title:e.title}},vs=(e,t=Date.now())=>{if(!e)return null;let n=new Date(e).getTime();if(Number.isNaN(n))return null;let r=n<t,o=Math.round(Math.abs(n-t)/60000),s=Math.round(o/60),i=Math.round(s/24),l=o<60?`${Math.max(1,o)}m`:s<24?`${s}h`:i<14?`${i}d`:`${Math.round(i/7)}w`;return{text:r?`-${l}`:l,overdue:r}},ws=(e)=>{let t=Math.abs(e),n=(r)=>String(Math.round(r*10)/10).replace(/\.0$/,"");if(t>=1e6)return`$${n(e/1e6)}M`;if(t>=1000)return`$${n(e/1000)}k`;return`$${Math.round(e)}`},Ms=(e,t=Date.now())=>{let n=e?new Date(e).getTime():NaN;if(Number.isNaN(n))return null;let r=Math.max(0,Math.round((t-n)/60000));if(r<60)return`${Math.max(1,r)}m`;let o=Math.round(r/60);if(o<24)return`${o}h`;let s=Math.round(o/24);return s<14?`${s}d`:`${Math.round(s/7)}w`};var Ps=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let o=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:null},Us=([e,t,n])=>{let r=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*r(e)+0.7152*r(t)+0.0722*r(n)},Va=(e,t)=>{let[n,r]=[Us(e),Us(t)].sort((o,s)=>s-o);return(n+0.05)/(r+0.05)};var Ns=(e,t)=>{let n=Ps(e),r=Ps(t);if(!n||!r||Va(n,r)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var et=new Map,Fa=30000,Ls=(e)=>{let t=et.get(e);if(!t)t={at:0,listeners:new Set},et.set(e,t);return t},on=(e)=>{for(let t of e.listeners)t()},mt=(e,t,n=!1)=>{let r=Ls(e);if(r.promise)return r.promise;if(!n&&r.value!==void 0&&Date.now()-r.at<Fa)return Promise.resolve(r.value);let o=t().then((s)=>(r.value=s,r.error=void 0,r.at=Date.now(),s),(s)=>{throw r.error=s,s}).finally(()=>{r.promise=void 0,on(r)});return r.promise=o,on(r),o};var Ds=(e)=>{let t=[];for(let[n,r]of et){if(r.value===void 0)continue;let o=e(n,r.value);if(o===r.value)continue;t.push([r,r.value]),r.value=o,on(r)}return()=>{for(let[n,r]of t)n.value=r,on(n)}},$s=(e)=>{let t=et.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)mt(e,t.fetcher,!0).catch(()=>{return})},oe=(e)=>{for(let[t,n]of et){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)mt(t,n.fetcher,!0).catch(()=>{return})}},Et=(e,t)=>{let[,n]=v(0);de(()=>{if(!e)return;let o=Ls(e);o.fetcher=t;let s=()=>n((i)=>i+1);return o.listeners.add(s),mt(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let r=e?et.get(e):void 0;return{data:r?.value,error:r?.error,loading:Boolean(r?.promise)||e!==null&&r?.value===void 0&&r?.error===void 0,refresh:()=>{if(e)mt(e,t,!0).catch(()=>{return})}}};var Gs=(e,t)=>JSON.stringify({query:e,variables:t});class ue extends Error{kind;constructor(e,t){super(t);this.kind=e}}var pe=async(e,t)=>{let n;try{n=await w.request({method:"POST",path:"/graphql",body:Gs(e,t)})}catch(o){if(o instanceof I){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new ue("disconnected","Linear is not connected.");throw new ue("network",o.message||"Could not reach Linear.")}throw new ue("network",o instanceof Error?o.message:"Could not reach Linear.")}let r;try{r=JSON.parse(n.body)}catch{throw new ue("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new ue("disconnected","Linear sign-in expired.");if(r.errors?.length){let o=r.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new ue(s?"rate-limited":"graphql",o.message)}if(!r.data)throw new ue("graphql","Linear returned no data.");return r.data};var Be=`
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
`;var Xa=(e)=>`
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
  outRelations: relations(first: 5) { nodes { type relatedIssue { state { type } } } }
  inRelations: inverseRelations(first: 5) { nodes { type issue { state { type } } } }
 }`).join(`
    `)}
  }
`,Bs=`
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
`;var Hs=`
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`;var Vs=`
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
`;var Nr=`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
  }
`;var Fs=`
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
`;var Xs=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,nS={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:Xa(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:Xs(["n1","n2"])};var Lr=null,js=new Map,Ws=(e)=>{for(let[t,n]of e)js.set(t,n)},Ks=(e,t)=>{let n=js.get(t);if(n!==void 0)return n;let r=Lr?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=r.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(r.length+1)},zs=()=>Lr?.viewer.id??null,qs=(e)=>Lr?.teamsById.get(e)?.issueEstimationType;var Ys=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),ja=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),r=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${r.toFixed(2)}z`},St=({type:e,color:t,size:n=14,fill:r,teamId:o,stateId:s})=>{let i=t||"currentColor",l=pt(()=>Ns(i,Ys()),[i,Ys()]),f={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return a("svg",{...f,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return a("svg",{...f,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return a("svg",{...f,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let _=r??(o&&s?Ks(o,s):0.5);return a("svg",{...f,children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:ja(_),fill:l},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return a("svg",{...f,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return a("svg",{...f,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}},sn=({priority:e,size:t=14})=>{let n={width:t,height:t,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};if(e===1)return a("svg",{...n,children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"2.5",fill:"var(--oc-warning)"},void 0,!1,void 0,this),a("path",{d:"M7 4v3.6M7 9.4v.2",stroke:"var(--oc-bg)","stroke-width":"1.6","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);if(e>=2&&e<=4){let r=5-e;return a("svg",{...n,children:[0,1,2].map((o)=>a("rect",{x:2+o*4,y:9-o*3,width:"2.4",height:3+o*3,rx:"0.6",fill:"currentColor",opacity:o<r?1:0.28},void 0,!1,void 0,this))},void 0,!1,void 0,this)}return a("svg",{...n,children:a("path",{d:"M2.5 7h2M6 7h2M9.5 7h2",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round",opacity:"0.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},tt=({name:e,url:t,size:n=18})=>{let r=e.split(/\s+/).filter(Boolean).slice(0,2).map((s)=>s[0].toUpperCase()).join("")||"?",o={width:`${n}px`,height:`${n}px`,fontSize:`${Math.round(n*0.42)}px`};if(t)return a("img",{class:"lin-avatar",src:t,alt:e,style:o},void 0,!1,void 0,this);return a("span",{class:"lin-avatar",style:o,children:r},void 0,!1,void 0,this)},Wa={open:"var(--oc-info)",merged:"var(--oc-success)",closed:"var(--oc-muted)",draft:"var(--oc-muted)"},Js=({status:e,size:t=13})=>a("svg",{width:t,height:t,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("g",{fill:"none",stroke:e?Wa[e]:"currentColor","stroke-width":"1.4","stroke-linecap":"round",children:[a("circle",{cx:"3.5",cy:"3",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"3.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"10.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("path",{d:"M3.5 4.6v4.8M10.5 9.4V6.5a2 2 0 0 0-2-2H6.5"},void 0,!1,void 0,this),a("path",{d:"M7.8 3.2 6.3 4.5l1.5 1.3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),Qs=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:"currentColor","stroke-width":"1.4"},void 0,!1,void 0,this),a("path",{d:"M5.6 4.6 9.2 7l-3.6 2.4z",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Zs=({done:e,total:t,size:n=13})=>{let o=2*Math.PI*5,s=t?Math.min(1,e/t):0;return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:"var(--oc-border)","stroke-width":"2"},void 0,!1,void 0,this),a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:s>=1?"var(--oc-success)":"var(--oc-info)","stroke-width":"2","stroke-dasharray":`${o*s} ${o}`,transform:"rotate(-90 7 7)","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},ei=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"6",fill:"var(--oc-error)"},void 0,!1,void 0,this),a("path",{d:"M4 7h6",stroke:"var(--oc-bg)","stroke-width":"1.8","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ti=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"3",fill:"none",stroke:"var(--oc-warning)","stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:"M5 10V4.5h4.2l-.9 1.4.9 1.4H5",fill:"var(--oc-warning)",stroke:"var(--oc-warning)","stroke-width":"1","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),an=({icon:e,color:t,size:n=13})=>{if(e&&/\p{Extended_Pictographic}/u.test(e))return a("span",{class:"lin-project-emoji",style:{fontSize:`${n}px`},"aria-hidden":"true",children:e},void 0,!1,void 0,this);return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("path",{d:"M7 1.2 12.2 4.1v5.8L7 12.8 1.8 9.9V4.1z",fill:t||"var(--oc-muted)"},void 0,!1,void 0,this),a("path",{d:"M4.6 7h4.8M7 4.6v4.8",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round",opacity:"0.85"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Dr=(e)=>["completed","canceled","duplicate"].includes(e.type);var ni=(e)=>{if(Dr(e.state))return{blockedBy:0,blocking:0};return{blockedBy:(e.inRelations?.nodes??[]).filter((t)=>t.type==="blocks"&&!Dr(t.issue.state)).length,blocking:(e.outRelations?.nodes??[]).filter((t)=>t.type==="blocks"&&!Dr(t.relatedIssue.state)).length}};var cn=({label:e})=>a(re,{children:[a("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this),$r=2,Ka=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.6.6M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.6-.6",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),za=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7.5",r:"4.7",fill:"none",stroke:"currentColor","stroke-width":"1.3"},void 0,!1,void 0,this),a("path",{d:"M7 5v2.7l1.6 1M5.5 1.8h3",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),qa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2zM2 4.2 7 7l5-2.8M7 7v5.5",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),Ya=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"5",cy:"5",r:"2.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M1.5 11.5c.4-2 1.8-3 3.5-3s3.1 1 3.5 3M9.5 3.4a2.2 2.2 0 0 1 0 3.9M10.5 8.8c1 .4 1.7 1.3 2 2.7",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Ja=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M7 4.2V7l2 1.2",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ri=({issue:e,properties:t,subIssues:n,hideProject:r,extras:o})=>{let s=e.labels.nodes,i=e.attachments?.nodes??[],l=i.map(Ur).filter((g)=>g!==null),f=i.filter((g)=>!Ur(g)),{blockedBy:_,blocking:p}=ni(e),S=Ze(e.estimate,qs(e.team.id)),m=e.dueDate?ks(e.dueDate):null,u=t.has("sla")?vs(e.slaBreachesAt):null,h=o?.releases.nodes??[],R=(o?.needs.nodes??[]).map((g)=>g.customer).filter((g)=>g!==null),k=R.reduce((g,U)=>g+(U.revenue??0),0),y=t.has("timeInStatus")?Ms(o?.stateHistory.nodes[o.stateHistory.nodes.length-1]?.startedAt):null;return a(Ae,{children:[n&&n.total>0&&a("span",{class:"lin-meta lin-meta-children",title:`${n.done} of ${n.total} sub-issues done`,children:a(re,{children:[a(Zs,{done:n.done,total:n.total},void 0,!1,void 0,this),n.done,"/",n.total]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("labels")&&s.length>0&&a("span",{class:"lin-meta lin-meta-labels",children:[s.slice(0,$r).map((g)=>a(cn,{label:g},g.id,!1,void 0,this)),s.length>$r&&a(re,{children:["+",s.length-$r]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),t.has("changes")&&l.length>0&&a("span",{class:"lin-meta lin-meta-change",title:l.map((g)=>`${g.label} ${g.title}`).join(`
`),children:a(re,{children:[a(Js,{status:l[0].status},void 0,!1,void 0,this),l.length===1?l[0].label:`${l.length} ${l[0].label.startsWith("!")?"MRs":"PRs"}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("links")&&f.length>0&&a("span",{class:"lin-meta lin-meta-links",title:f.map((g)=>g.title).join(`
`),children:a(re,{children:[a(Ka,{},void 0,!1,void 0,this),f.length]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("project")&&!r&&e.project&&a("span",{class:"lin-meta lin-meta-project",title:e.project.name,children:a(re,{children:[a(an,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:e.project.name},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("milestone")&&e.projectMilestone&&a("span",{class:"lin-meta lin-meta-milestone",title:`Milestone: ${e.projectMilestone.name}`,children:a(re,{children:a("span",{class:"lin-ellipsis",children:e.projectMilestone.name},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("cycle")&&e.cycle&&a("span",{class:"lin-meta lin-meta-cycle",title:`Cycle ${e.cycle.number}${e.cycle.name?`: ${e.cycle.name}`:""}`,children:a(re,{children:[a(Qs,{},void 0,!1,void 0,this),e.cycle.number]},void 0,!0,void 0,this)},void 0,!1,void 0,this),_>0&&a("span",{class:"lin-meta lin-meta-blocked",title:`Blocked by ${_} ${_===1?"issue":"issues"}`,children:a(re,{children:[a(ei,{},void 0,!1,void 0,this),_]},void 0,!0,void 0,this)},void 0,!1,void 0,this),p>0&&a("span",{class:"lin-meta lin-meta-blocking",title:`Blocking ${p} ${p===1?"issue":"issues"}`,children:a(re,{children:[a(ti,{},void 0,!1,void 0,this),p]},void 0,!0,void 0,this)},void 0,!1,void 0,this),u&&a("span",{class:`lin-meta lin-meta-sla ${u.overdue?"lin-overdue":""}`,title:`SLA ${e.slaType??""} breaches ${Ie(e.slaBreachesAt)}`,children:a(re,{children:[a(za,{},void 0,!1,void 0,this),u.text]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("release")&&h.length>0&&a("span",{class:"lin-meta lin-meta-release",title:h.map((g)=>`${g.name}${g.version?` ${g.version}`:""}`).join(`
`),children:a(re,{children:[a(qa,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:h[0].version??h[0].name},void 0,!1,void 0,this),h.length>1&&` +${h.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customers")&&R.length>0&&a("span",{class:"lin-meta lin-meta-customers",title:R.map((g)=>g.name).join(`
`),children:a(re,{children:[a(Ya,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:R[0].name},void 0,!1,void 0,this),R.length>1&&` +${R.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customerRevenue")&&k>0&&a("span",{class:"lin-meta lin-meta-revenue",title:"Customer revenue",children:a(re,{children:ws(k)},void 0,!1,void 0,this)},void 0,!1,void 0,this),y&&a("span",{class:"lin-meta lin-meta-in-status",title:`In ${e.state.name} for ${y}`,children:a(re,{children:[a(Ja,{},void 0,!1,void 0,this),y]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("estimate")&&S&&a("span",{class:"lin-meta lin-meta-estimate",title:"Estimate",children:a(re,{children:S},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("dueDate")&&e.dueDate&&a("span",{class:`lin-meta lin-meta-due sui-small ${m!==null&&m<0?"lin-overdue":"sui-muted"}`,title:"Due date",children:Ie(e.dueDate)},void 0,!1,void 0,this),t.has("creator")&&e.creator&&a("span",{class:"lin-meta lin-meta-creator",title:`Created by ${e.creator.name}`,children:a(tt,{name:e.creator.name,url:e.creator.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Qa=/^[A-Za-z]{1,7}-\d+$/;var oi=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!Qa.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()},nt=(e)=>{let t=typeof e==="string"?e:Array.isArray(e)?e.filter((s)=>typeof s==="string").join(","):"",n=[],r=[],o=0;for(let s of t.split(/[,;\s]+/)){if(!s)continue;let i=oi(s);if(!i){if(r.length<3&&!r.includes(s.slice(0,24)))r.push(s.slice(0,24));continue}if(n.includes(i))continue;if(n.length>=25)o+=1;else n.push(i)}return{ids:n,skipped:r,cut:o}},si=(e,t)=>{if(typeof e!=="string")return"";let n=e.replace(/\s+/g," ").trim();return n.length>t?`${n.slice(0,t-3).trimEnd()}...`:n},ii=(e)=>si(e,160),ai=(e)=>si(e,400),ci=(e)=>{let t=new Map;for(let n of e){let[r,o]=n.split("-"),s=t.get(r)??[];s.push(Number(o)),t.set(r,s)}return{or:[...t].map(([n,r])=>({and:[{team:{key:{eqIgnoreCase:n}}},{number:{in:r}}]}))}},li=(e)=>{let t=new Map;for(let r of e){let o=t.get(r.team.id)??[];o.push(r),t.set(r.team.id,o)}let n=new Map;for(let r of t.values())r.sort((o,s)=>o.position-s.position),r.forEach((o,s)=>n.set(o.id,(s+1)/(r.length+1)));return n},di=(e)=>`${e.identifier} ${e.title}`.slice(0,1900),Gr=(e)=>{let t=e?.trim().split(/\s+/,1)[0];return oi(t)};async function ke(e,t,n,r={}){let o=r.name??"extension",s={};for(let[i,l]of Object.entries(r.query??{}))if(l)s[i]=l;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...r.body!==void 0?{body:JSON.stringify(r.body)}:{}}),l;try{l=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${o} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&l.ok===void 0)return{ok:!1,error:String(l.message??`Error ${i.status}`),code:"failed"};return l}catch(i){let l=i.code;if(l==="NO_SERVICE")return{ok:!1,error:`Approve the ${o} service in Settings > Extensions.`,code:"failed"};if(l==="SERVICE_FAILED")return{ok:!1,error:`The ${o} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${o} service.`,code:"failed"}}}async function he(e,t,n,r={}){try{await e.toast({kind:t,message:n,...r.dismiss?{dismiss:!0}:{}})}catch{}}var ec=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,ui=(e)=>{if(!e)return[];let t=[],n=(o)=>{let s=o?.toUpperCase();if(s&&!t.includes(s))t.push(s)},r=[...e.links??[]].sort((o,s)=>(s.linkedAt??0)-(o.linkedAt??0));for(let o of r)n(o.url.match(ec)?.[1]);for(let o of e.items??[]){let s=o.data?.identifier;if(typeof s==="string")n(s)}return t};var tc="plan";var nc=(e)=>({sessionId:e.id,directory:e.directory,title:e.title,agent:e.agent??null,inWorktree:e.worktree!==null,updatedAt:e.updatedAt}),pi=(e,t,n=new Set)=>{let r=t.toUpperCase(),o=(s)=>(s.agent===tc?0:2)+(s.inWorktree?0:1);return e.filter((s)=>s.archivedAt===null&&s.parentId===null&&(n.has(s.id)||ui(s).includes(r))).map(nc).sort((s,i)=>o(s)-o(i)||i.updatedAt-s.updatedAt)[0]??null};var rc=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,oc=1e5,sc=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),fi=(e,t)=>{let n=sc(t.trim()).trim(),r=n.length>20000?`${n.slice(0,20000).trimEnd()}

[cut]`:n,o=(e??"").replace(rc,"").trimEnd(),s=`---
## Plan

${r}`,i=o?`${o}

${s}`:s;return i.length>oc?null:i},_i=(e,t=6,n=420)=>{let r=e.trim().split(`
`).filter((o)=>o.trim()).slice(0,t).join(`
`);return r.length>n?`${r.slice(0,n).trimEnd()}...`:r};var mi="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var jS=new RegExp("```linear-plan[^\\n]*\\n([\\s\\S]*?)```","g");var ic=(e,t)=>typeof e==="string"?e.replace(/\s+/g," ").trim().slice(0,t):"";var Br=(e,t)=>{if(e===null||t.length===0)return null;let n=t[0];for(let r of t)if(Math.abs(r-e)<Math.abs(n-e)||Math.abs(r-e)===Math.abs(n-e)&&r>n)n=r;return n},Ei=(e,t)=>{if(e.length===0)return'This team does not use estimates: leave "estimate" out.';return`Estimates on this team, written as the number: ${e.map((r)=>{let o=t(r);return o&&o!==String(r)?`${o} = ${r}`:String(r)}).join(", ")}.`},Si=(e,t,n)=>[e.description,`Split out of ${t} by the plan in "${ic(n,120)}". Created by Linear+.`].filter(Boolean).join(`

---

`);var Hr=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["sessionId","identifier","directory","sessionTitle","state"].every((n)=>typeof t[n]==="string")&&typeof t.extras==="object"&&t.extras!==null&&Array.isArray(t.extras.issues)};var ac=["No priority","Urgent","High","Medium","Low"],Vr=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${ac[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],n=e.comments.nodes.slice(-5).map((o)=>`${o.user?.name??"Someone"} (${Ie(o.createdAt)}): ${o.body}`),r=[...t,...n.length?["","Latest comments:",...n]:[]].filter((o,s,i)=>o||i[s-1]).join(`
`);return r.length>15000?`${r.slice(0,15000)}
[cut]`:r};var hi=["triage","backlog","unstarted","started","completed","canceled","duplicate"],Ti=(e,t)=>hi.indexOf(e.type)-hi.indexOf(t.type)||e.position-t.position;var gi=["No priority","Urgent","High","Medium","Low"];var yi=(e)=>[...e??[]].sort(Ti);var Fr=(e)=>yi(e).filter((t)=>t.type==="started"||t.type==="unstarted"&&/plan/i.test(t.name)),ln=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=Fr(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return Ai(r.filter((o)=>o.type==="started"),n,r)},Ai=(e,t,n=e)=>{let r=t?.trim().toLowerCase();return(r?n.find((o)=>o.name.trim().toLowerCase()===r):void 0)??e.find((o)=>/^in progress$/i.test(o.name.trim()))??e.find((o)=>/progress|doing|working|development|started/i.test(o.name))??e.find((o)=>!/block|hold|pause|wait|stuck/i.test(o.name))??e[0]??null},xi=(e)=>/plan/i.test(e.name),Ri=(e)=>yi(e).filter((t)=>t.type==="started"&&!xi(t)),Xr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!xi(e.state))return null;return Ai(Ri(t),n)},jr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=Fr(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return r.find((o)=>/plan/i.test(o.name))??ln(e,t,n)},Oi=(e,t,n,r)=>{let o=e==="build"?Ri(n):Fr(n),s=e==="build"?Xr(t,n,r):e==="plan"?jr(t,n,r):ln(t,n,r),i=s??o.find((l)=>l.id===t.state.id)??null;return{options:o,target:i,moves:s!==null}},cc={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},lc=(e)=>{let t=e?cc[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]},dn=(e)=>lc({issueEstimationType:e.issueEstimationType??"notUsed",issueEstimationAllowZero:e.issueEstimationAllowZero??!1,issueEstimationExtended:e.issueEstimationExtended??!1}),bi=(e,t)=>{let n=t.trim().replace(/^refs\/heads\//,"").toLowerCase();if(!n)return null;return e.find((r)=>r.status==="ready"&&r.branch.replace(/^refs\/heads\//,"").toLowerCase()===n)?.directory??null},Wr=(e,t)=>t>0?`${e}-${t+1}`:e;var un=async(e)=>{try{let t=await w.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},dc=async(e,t)=>{try{return await w.storage.set(e,t),!0}catch{return!1}};var ht=async()=>await un("pref:start-moves")!==!1;var Ii=async()=>await un("pref:assign-me")===!0;var pn=async()=>await un("pref:lead-mode")===!0;var Tt=async(e)=>{let t=await un(`pref:start-state:${e}`);return typeof t==="string"?t:null},gt=(e,t)=>dc(`pref:start-state:${e}`,t);var He=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ue&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ue&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},uc=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),ki=(e,t)=>Ds((n,r)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&uc(r)&&r.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...r,issues:r.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof r==="object"&&r!==null&&r.id===e){let{team:o,...s}=t;return{...r,...s}}return r}),pc=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new ue("graphql","Linear did not save the change.");return e.issueUpdate.issue},We=async(e,t)=>{let n=ki(e.id,t.patch);try{let r=pc(await pe(Vs,{id:e.id,input:t.input}));if(ki(e.id,r),$s(`issue:${e.identifier}`),"stateId"in t.input)oe("children:");if("projectMilestoneId"in t.input||"projectId"in t.input)oe("issues:"),oe("view-issues:"),oe("milestone-counts:");if("parentId"in t.input)oe("issues:"),oe("view-issues:"),oe("children:");if(["releaseIds","addedReleaseIds","removedReleaseIds"].some((o)=>(o in t.input)))oe("extras:"),oe("issue-releases:");return r}catch(r){throw n(),r}};var Ci=async(e)=>{let t=await pe(Fs,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new ue("graphql","Linear did not create the issue.");return oe("issues:"),oe("view-issues:"),t.issueCreate.issue};var vi=async(e,t)=>{let n=await w.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:Vr(e),data:{issueId:e.id,identifier:e.identifier},worktree:t.existing?{kind:"existing",directory:t.existing}:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(n.sessionId===null)return{started:!1,directory:n.directory};let r=t.state??ln(e,e.team.states.nodes),{moved:o,moveError:s}=await wi(e,r,t.move);return{started:!0,sessionId:n.sessionId,target:r,moved:o,moveError:s}},wi=async(e,t,n)=>{let r=!1,o=null;if(n&&t)try{await We(e,{input:{stateId:t.id},patch:{state:t}}),r=!0}catch(s){o=He(s)}return{moved:r,moveError:o}},Mi=async(e,t)=>{let n=t.lead??await pn().catch(()=>!1),r=t.existing??null,o=n?t.existingSession??null:null;if(!r){let _=await w.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",data:{issueId:e.id,identifier:e.identifier},worktree:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(_.sessionId===null)return{started:!1,directory:_.directory};if(r=_.worktree?.directory??_.directory??t.directoryHint??null,!r)return{started:!1,directory:"",error:"The host did not say which folder the session is in."};if(n)o=_.sessionId}let s;try{let _=Ei(dn(e.team),(p)=>Ze(p,e.team.issueEstimationType));s=(await Ui({identifier:e.identifier,directory:r,issueTitle:e.title,context:Vr(e),scale:_,...t.model?{model:t.model}:{},...n?{lead:o??!0,leadTitle:`${e.identifier} ${e.title}`}:{}})).sessionId}catch(_){return{started:!1,directory:r,error:_ instanceof Error?_.message:String(_),...o?{session:o}:{}}}let i=t.state??jr(e,e.team.states.nodes),{moved:l,moveError:f}=await wi(e,i,t.move);return{started:!0,sessionId:s,target:i,moved:l,moveError:f}},Kr=(e)=>e.replace(/\/+$/,""),zr=async(e)=>{if(!e)return null;try{let t=Kr(e),n=(await w.listProjects())?.projects??[],r=n.find((o)=>Kr(o.directory)===t);if(r)return r;for(let o of n)if(((await w.listWorktrees(o.id))?.worktrees??[]).some((i)=>Kr(i.directory)===t))return o}catch{}return null},Pi=async(e,t)=>{try{let n=await zr(e);if(!n)return null;return bi((await w.listWorktrees(n.id))?.worktrees??[],t)}catch{return null}},fn=async(e)=>{try{await w.openSession(e)}catch{}};var Ni=async(e,t)=>{let n=await fc(t);try{let o=await zr(e);if(o){let s=await w.listSessions(o.id),i=pi(s?.sessions??[],t,new Set(n.map((l)=>l.sessionId)));if(i)return i}}catch{}let r=n[0];return r?{sessionId:r.sessionId,directory:r.sessionDirectory,title:r.title,agent:"plan",inWorktree:!0,updatedAt:r.createdAt}:null},fc=async(e)=>{let t=await ke(w,"GET","/plans",{query:{identifier:e},name:"Linear+"}),n=t.ok===!1?[]:t.sessions;if(!Array.isArray(n))return[];return n.map((r)=>r).filter((r)=>typeof r.sessionId==="string"&&typeof r.createdAt==="number").map((r)=>({sessionId:r.sessionId,sessionDirectory:typeof r.sessionDirectory==="string"?r.sessionDirectory:typeof r.directory==="string"?r.directory:"",title:typeof r.title==="string"?r.title:`${e} plan`,createdAt:r.createdAt})).filter((r)=>r.sessionDirectory.startsWith("/"))};var Li=async(e)=>{let t=await ke(w,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{},...e.model?{model:e.model}:{}},name:"Linear+"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear+ service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},_n=async(e)=>{let t=await ke(w,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier},name:"Linear+"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear+ service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1,lead:t.lead===!0}},Ui=async(e)=>{let{model:t,...n}=e,r=await ke(w,"POST","/plan",{body:t?{...n,model:t}:n,name:"Linear+"});if(r.ok===!1||typeof r.sessionId!=="string")throw Error(r.error??"The Linear+ service did not start the plan.");return{sessionId:r.sessionId,directory:typeof r.directory==="string"?r.directory:e.directory}};var Di=async(e)=>{let t=await ke(w,"GET","/extras",{query:{sessionId:e},name:"Linear+"});return t.ok!==!1&&Hr(t.extras)?t.extras:null},mn=async(e)=>{let t=await ke(w,"POST","/handoffs",{body:e,name:"Linear+"});if(t.ok===!1)return null;if(e.action==="claim-extras"&&t.claimed!==!0)return null;return Hr(t.state)?t.state:null};var fe=(e,t="inline-flex")=>(n)=>{let r=Is(e,n);return a("span",{ref:r,style:{display:t}},void 0,!1,void 0,this)},_e=fe(Ue),En=fe(tn),jh=fe(yr,"block"),Wh=fe(Ar,"block"),Kh=fe(Rr),zh=fe(wr),qh=fe(Or),rt=fe(kr),xe=fe(Cr,"block"),$i=fe(Ir,"block"),Yh=fe(vr,"block"),Jh=fe(br,"block"),Qh=fe(xr),ot=fe(nn),Zh=fe(nn,"block"),eT=fe(tn,"block");var Gi=(e)=>typeof e==="object"&&e!==null&&typeof e.agent==="string"&&(e.model===void 0||typeof e.model==="string"),Bi=(e)=>typeof e==="object"&&e!==null&&typeof e.id==="string"&&typeof e.label==="string",Hi=(e)=>{if(!e||e.ok===!1||!Array.isArray(e.agents)||!Array.isArray(e.models))return null;return{agents:e.agents.filter(Bi),models:e.models.filter(Bi),defaultModel:typeof e.defaultModel==="string"?e.defaultModel:null,...Gi(e.current?.plan)&&Gi(e.current?.build)?{current:e.current}:{}}},Sn="__default";var Vi=(e,t)=>{let n=e.current?.[t].model;if(n)return e.models.find((o)=>o.id===n)?.label??n;let r=e.defaultModel?e.models.find((o)=>o.id===e.defaultModel)?.label??e.defaultModel:null;return r?`${r} (default)`:"the default model"};var Fi=async(e)=>Hi(await ke(w,"GET","/choices",{query:{directory:e},name:"Linear+"}));var hn=({role:e,directory:t,value:n,onChange:r,disabled:o})=>{let s=Et(`start-choices:${t??""}`,()=>Fi(t));if(!s.data)return null;let i=[{id:Sn,label:`From Settings: ${Vi(s.data,e)}`},...s.data.models];return a("div",{class:"lin-model-pick",children:a(En,{label:e==="plan"?"Plan model":"Build model",value:n||Sn,options:i,searchable:!0,searchPlaceholder:"Search models",disabled:o,onChange:(l)=>r(l===Sn?"":l)},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var Tn=(e,t,n,r)=>{let o=pt(()=>t?Oi(e,t,t.team.states.nodes,n):null,[e,t,n]),[s,i]=v(null),[l,f]=v(null),_=o?.options??[],p=_.find((u)=>u.id===s)??o?.target??null,S=l??Boolean(o?.moves&&r),m=Boolean(t&&p&&S&&p.id!==t.state.id);return{options:_,selected:p,move:m,select:(u)=>{if(i(u),t&&u!==t.state.id)f(!0)},toggle:f}},gn=({choice:e,disabled:t})=>a("div",{class:"lin-move-row",children:[a(ot,{label:"Move the issue to",checked:e.move,disabled:t||e.options.length===0,onChange:e.toggle},void 0,!1,void 0,this),e.options.length>0&&a(En,{value:e.selected?.id??null,options:e.options.map((n)=>({id:n.id,label:n.name})),disabled:t,onChange:e.select},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var qr=new Set,Xi=async(e,t)=>{if(qr.has(e.sessionId))return null;qr.add(e.sessionId);try{let n=await mn({sessionId:e.sessionId,action:"claim-extras"});if(!n)return null;let r=n.estimateDone===!0,o=n.estimateSet??null,s=[...n.created??[]],i=(l)=>String(l);try{let l=(await pe(Be,{id:n.identifier})).issue,f=dn(l.team);if(i=(S)=>Ze(S,l.team.issueEstimationType)??String(S),!r){let S=l.estimate===null?Br(n.extras.estimate,f):null;if(S!==null)await We(l,{input:{estimate:S},patch:{estimate:S}}),o=S;r=!0}let _=t&&await Ii().catch(()=>!1)?t:null;for(let S of n.extras.issues.slice(s.length)){let m=Br(S.estimate,f),u=await Ci({teamId:l.team.id,title:S.title,description:Si(S,l.identifier,n.sessionTitle),...l.project?{projectId:l.project.id}:{},...m!==null?{estimate:m}:{},..._?{assigneeId:_}:{}});s.push(u.identifier),await pe(Nr,{input:{issueId:u.id,relatedIssueId:l.id,type:"related"}})}return{state:await mn({sessionId:n.sessionId,action:"extras-done",estimateDone:r,estimateSet:o,created:s})??{...n,state:"done",estimateDone:r,estimateSet:o,created:s},label:i}}catch(l){let f=He(l);return{state:await mn({sessionId:n.sessionId,action:"extras-failed",estimateDone:r,estimateSet:o,created:s,error:f})??{...n,state:"failed",estimateDone:r,estimateSet:o,created:s,error:f},label:i}}}finally{qr.delete(e.sessionId)}};var yt=async(e,t,n=!1)=>{let{plan:r,isPlan:o}=await _n({source:t,identifier:e.identifier});if(!o&&!n)throw Error(mi);let s=(await pe(Be,{id:e.identifier})).issue,i=fi(s.description,r);if(i===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);await We(s,{input:{description:i},patch:{description:i}})};var ji=async(e,t,n)=>{let r=!1;if(n.post)await yt(e,t,n.force),r=!0;let o=await Di(t.sessionId).catch(()=>null);if(o&&(o.state==="pending"||o.state==="claimed"))await Xi(o,zs()).catch(()=>null);let s=await Li({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force,...n.model?{model:n.model}:{}}),i=n.state??Xr(e,e.team.states.nodes,n.lastState),l=!1,f=null;if(n.move&&i)try{await We(e,{input:{stateId:i.id},patch:{state:i}}),l=!0}catch(_){f=He(_)}return{sessionId:s.sessionId,target:i,moved:l,moveError:f,posted:r}};var Wi=({identifier:e,source:t,label:n="Write Plan",doneLabel:r="Plan Written",size:o="sm",variant:s="outline",disabled:i,onBusy:l})=>{let[f,_]=v(!1),[p,S]=v(!1),m=async()=>{_(!0),l?.(!0);try{await yt({identifier:e},t),S(!0),oe("issue"),await he(w,"success",`Added the plan to ${e}`)}catch(u){await he(w,"error",`Could not add the plan to ${e}: ${He(u)}`)}finally{_(!1),l?.(!1)}};return a("span",{class:"lin-inline",title:`Adds the plan from ${t.title} to the end of ${e}'s description and starts nothing. A plan added before is replaced.`,children:a(_e,{label:p?r:n,variant:s,size:o,loading:f,disabled:i||f,onClick:()=>{m()}},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var yn=(e)=>e instanceof Error?e.message:String(e),_c=(e)=>e.replace(/\/+$/,"").split("/").pop()||e,Ki=({identifier:e,source:t,detail:n,onClose:r,onDone:o,fill:s})=>{let[i,l]=v(n??null),[f,_]=v(null),[p,S]=v(!0),[m,u]=v(null),[h,R]=v(!1),[k,y]=v(null),[g,U]=v(null),[O,ie]=v(null),[ae,se]=v(null),[H,ce]=v(!1),[z,V]=v(!1),[E,T]=v(!1),le=Tn("build",i,m,p),[Te,Re]=v("");if(de(()=>{let P=!0;return ie(null),se(null),_n({source:t,identifier:e}).then((ee)=>{if(P)ie(ee),ce(ee.postPlan)},(ee)=>{if(P)se(yn(ee))}),()=>{P=!1}},[e,t.sessionId]),de(()=>{let P=!0;return Promise.all([n?Promise.resolve(n):pe(Be,{id:e}).then((ee)=>ee.issue),ht().catch(()=>!0)]).then(([ee,C])=>{if(!P)return;l(ee),S(C),Tt(ee.team.id).then((me)=>{if(P)u(me)},()=>{return})},(ee)=>{if(P)_(yn(ee))}),()=>{P=!1}},[e,n]),g)return a("div",{class:"lin-build","data-state":"started",children:a("div",{class:"sui-small",children:g},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(f)return a(xe,{tone:"error",title:"Could not read the issue",body:f,action:{label:"Close",onClick:r}},void 0,!1,void 0,this);if(!i)return a(rt,{label:"Reading the issue"},void 0,!1,void 0,this);let Ke=async()=>{R(!0),y(null);try{await yt(i,t,E),oe("issue"),await he(w,"success",`Added the plan to ${i.identifier}.`),V(!0)}catch(P){y(yn(P))}finally{R(!1)}},Ce=async()=>{R(!0),y(null);try{let P=await ji(i,t,{move:le.move,post:H&&Boolean(O),force:E,state:le.selected,lastState:m,...Te?{model:Te}:{}});if(P.moved&&P.target)gt(i.team.id,P.target.name).catch(()=>{return});if(P.moveError)await he(w,"error",`Build started, but ${i.identifier} was not moved: ${P.moveError}`);let ee=`${P.posted?"Added the plan to the issue and started":"Started"} a build for ${i.identifier}${P.moved?` and moved it to ${P.target.name}`:""}.`;if(await he(w,"success",ee),U(ee),P.moved)oe("block:");await fn(P.sessionId),o?.()}catch(P){y(yn(P))}finally{R(!1)}};return a("div",{class:s?"lin-build lin-build--fill":"lin-build","data-state":"options",children:[a("div",{class:"sui-small",children:["Builds from the last reply in ",a("strong",{children:t.title},void 0,!1,void 0,this),t.agent?` (${t.agent} agent)`:"",", in ",_c(t.directory),", ",O?.lead?"as a session that lead starts under it":"as a new session",". It uses the build agent from Settings, on the model below."]},void 0,!0,void 0,this),ae&&a(xe,{tone:"warning",title:"The plan cannot be read yet",body:ae},void 0,!1,void 0,this),O&&!O.isPlan&&a(xe,{tone:"warning",title:"The last reply is not a plan",body:'Ask the planning session: "Repeat the final plan in full, unchanged, as your last message. No question cards." Then reopen this. Writing or building from a chat answer would put the wrong text in the issue and the build.',action:E?void 0:{label:"Use It Anyway",onClick:()=>T(!0)}},void 0,!1,void 0,this),O?.earlier&&a("div",{class:"sui-muted sui-small",children:"The last reply in that session is not the plan, so this is the latest reply that was."},void 0,!1,void 0,this),O&&a("pre",{class:"lin-build-plan",children:s?O.plan.trim():_i(O.plan)},void 0,!1,void 0,this),k&&a(xe,{tone:"error",title:"Could not start the build",body:k},void 0,!1,void 0,this),a(ot,{label:"Add the plan to the issue description first",description:H?`A plan section at the end of ${i.identifier}'s description, replaced if one is already there. Then the build starts.`:void 0,checked:H&&Boolean(O),disabled:!O||h,onChange:ce},void 0,!1,void 0,this),a(gn,{choice:le,disabled:h},void 0,!1,void 0,this),a(hn,{role:"build",directory:t.directory,value:Te,onChange:Re,disabled:h},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(_e,{label:h?"Starting...":H&&O?"Write Plan and Build":"Start Build",size:"sm",disabled:h||!O||!O.isPlan&&!E,onClick:()=>{Ce()}},void 0,!1,void 0,this),a(_e,{label:z?"Plan Written":"Write Plan",variant:"outline",size:"sm",disabled:h||!O||!O.isPlan&&!E,onClick:()=>{Ke()}},void 0,!1,void 0,this),a(_e,{label:"Cancel",variant:"ghost",size:"sm",disabled:h,onClick:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},zi=(e,t)=>{let[n,r]=v(void 0);return de(()=>{let o=!0;if(r(void 0),!e){r(null);return}return Ni(e,t).then((s)=>{if(o)r(s)},()=>{if(o)r(null)}),()=>{o=!1}},[e,t]),n},mc="Plan first: click Plan to start a planning session for this issue. Write Plan and Build work once it has a plan.",qi=({identifier:e,source:t,size:n,onBuild:r,building:o})=>{if(t)return a(Ae,{children:[a(Wi,{identifier:e,source:t,size:n},void 0,!1,void 0,this),a(_e,{label:"Build",variant:"outline",size:n,disabled:o,onClick:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this);let s=t===null?mc:void 0;return a("span",{class:"lin-inline lin-plan-first",title:s,"aria-label":s,children:[a(_e,{label:"Write Plan",variant:"outline",size:n,disabled:!0,onClick:()=>{return}},void 0,!1,void 0,this),a(_e,{label:"Build",variant:"outline",size:n,disabled:!0,onClick:()=>{return}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Ec=async(e)=>{let t=await pe(Bs,{filter:ci(e)}),n=new Map;for(let o of t.issues.nodes)n.set(o.identifier.toUpperCase(),o);let r=[...new Set(t.issues.nodes.filter((o)=>o.state.type==="started").map((o)=>o.team.id))];if(r.length>0)try{Ws(li((await pe(Hs,{teamIds:r})).workflowStates.nodes))}catch{}return n},Yi=(e)=>Et(e.length>0?`block:${e.join(",")}`:null,()=>Ec(e));var st=({ids:e,children:t})=>{let n=Yi(e);if(n.data)return a(Ae,{children:t(n.data)},void 0,!1,void 0,this);if(n.error){let r=n.error instanceof ue?n.error:new ue("network",String(n.error));if(r.kind==="disconnected")return a($i,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber to see these issues.",action:{label:"Connect Linear",onClick:()=>{w.oauthStart()}}},void 0,!1,void 0,this);return a(xe,{tone:"error",title:"Could not load from Linear",body:r.message,action:{label:"Retry",onClick:()=>n.refresh()}},void 0,!1,void 0,this)}return a("div",{class:"lin-block-wait",children:a(rt,{label:"Loading from Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},At=({skipped:e,cut:t})=>{if(e.length===0&&t===0)return null;let n=[e.length>0?`Not an issue key: ${e.join(", ")}.`:"",t>0?`${t} more not shown.`:""].filter(Boolean);return a("div",{class:"sui-small sui-muted",children:n.join(" ")},void 0,!1,void 0,this)},it=({id:e})=>a("div",{class:"lin-block-missing sui-small sui-muted",children:[a("span",{class:"sui-mono",children:e},void 0,!1,void 0,this),a("span",{children:"Not found in Linear, or you cannot see it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Yr=(e)=>e instanceof Error?e.message:String(e),Ji=({issue:e,plan:t,onClose:n})=>{let r=t?"plan":"session",[o,s]=v(null),[i,l]=v(null),[f,_]=v(!0),[p,S]=v(!0),[m,u]=v(!1),[h,R]=v(null),[k,y]=v(null),[g,U]=v(null),[O,ie]=v(null),[ae,se]=v(null),[H,ce]=v(0),[z,V]=v(null),[E,T]=v(null),le=Qe()?.directory??null,Te=Tn(t?"plan":"session",o,z,p),[Re,Ke]=v("");if(de(()=>{let C=!0;return s(null),l(null),Promise.all([pe(Be,{id:e.identifier}),ht().catch(()=>!0),Tt(e.team.id).catch(()=>null),pn().catch(()=>!1)]).then(([me,te,F,q])=>{if(!C)return;s(me.issue),S(te),V(F),U(q),Pi(le,me.issue.branchName).then((at)=>{if(C)ie(at)})},(me)=>{if(C)l(Yr(me))}),()=>{C=!1}},[e.identifier]),E)return a("div",{class:"lin-block-start","data-state":"started",children:a("div",{class:"sui-small",children:E},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(i)return a("div",{class:"lin-block-start",children:a(xe,{tone:"error",title:"Could not read the issue",body:i,action:{label:"Close",onClick:n}},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(!o)return a("div",{class:"lin-block-start",children:a(rt,{label:"Reading the issue"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let Ce=h??O,P=Wr(o.branchName,H),ee=async()=>{u(!0),se(null);try{let C=await(t?Mi:vi)(o,{worktree:f,move:Te.move,existing:Ce,branch:P,state:Te.selected,directoryHint:le,...t&&Re?{model:Re}:{},...t&&g!==null?{lead:g,existingSession:k}:{}});if(!C.started){R(C.directory),y(C.session??null),se(C.error??null);return}if(C.moveError)await he(w,"error",`The ${r} started, but ${o.identifier} was not moved: ${C.moveError}`);if(!t&&C.moved&&C.target)gt(o.team.id,C.target.name).catch(()=>{return});let me=`Started a ${r} for ${o.identifier}${C.moved?` and moved it to ${C.target.name}`:""}.`;if(await he(w,"success",me),T(me),C.moved)oe("block:");await fn(C.sessionId)}catch(C){let me=f&&!Ce;if(me)ce((F)=>F+1);let te=me?` A branch named ${P} may already exist. Start again to try ${Wr(o.branchName,H+1)}, or turn off "Work in a new worktree".`:"";se(`${Yr(C).replace(/\.+$/,"")}.${te}`),await he(w,"error",`Could not start a ${r}: ${Yr(C)}`)}finally{u(!1)}};return a("div",{class:"lin-block-start","data-state":"options",children:[h&&a(xe,{tone:"warning",title:`The worktree is ready, but the ${r} did not start`,body:`Retry starts the ${r} in ${h}.`},void 0,!1,void 0,this),!h&&O&&a(xe,{tone:"info",title:"This issue already has a worktree",body:`The session starts in ${O}, on branch ${o.branchName}.`},void 0,!1,void 0,this),t&&!h&&a("div",{class:"sui-muted sui-small",children:g?"Makes the worktree with one lead session. The lead starts the plan as a session nested under it, with the plan agent from Settings on the model below, and later the build the same way. The plan changes no files.":"Makes the worktree, then starts a planning session in it with the plan agent from Settings, on the model below. It plans and stops: it changes no files."},void 0,!1,void 0,this),ae&&a(xe,{tone:"error",title:`Could not start a ${r}`,body:ae},void 0,!1,void 0,this),a(ot,{label:Ce?"Work in the existing worktree":"Work in a new worktree",description:`Branch ${P}`,checked:f||Boolean(Ce),disabled:Boolean(Ce)||m,onChange:_},void 0,!1,void 0,this),a(gn,{choice:Te,disabled:m},void 0,!1,void 0,this),t&&a(hn,{role:"plan",directory:le,value:Re,onChange:Ke,disabled:m},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(_e,{label:m?"Starting...":h?"Retry in That Worktree":O?"Start in That Worktree":t?"Start Plan":"Start Session",size:"sm",disabled:m,onClick:()=>{ee()}},void 0,!1,void 0,this),a(_e,{label:"Cancel",variant:"ghost",size:"sm",disabled:m,onClick:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Sc=({issue:e})=>{let[t,n]=v(null),r=zi(Qe()?.directory??null,e.identifier),o=e.labels.nodes;return a(Os,{class:"lin-block-card",children:[a("div",{class:"lin-block-title",children:[a(St,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:16},void 0,!1,void 0,this),a("span",{class:"lin-block-key sui-mono sui-muted",children:e.identifier},void 0,!1,void 0,this),a("span",{class:"lin-block-name",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),a(bs,{items:[["Status",a("span",{class:"lin-block-value",children:[a(St,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this),e.state.name]},void 0,!0,void 0,this)],["Priority",a("span",{class:"lin-block-value",children:[a(sn,{priority:e.priority},void 0,!1,void 0,this),gi[e.priority]]},void 0,!0,void 0,this)],["Assignee",e.assignee?a("span",{class:"lin-block-value",children:[a(tt,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this),e.assignee.name]},void 0,!0,void 0,this):a("span",{class:"sui-muted",children:"Unassigned"},void 0,!1,void 0,this)],...e.project?[["Project",a("span",{class:"lin-block-value",children:[a(an,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),e.project.name]},void 0,!0,void 0,this)]]:[],...o.length>0?[["Labels",a("span",{class:"lin-block-value lin-block-chips",children:o.map((s)=>a(cn,{label:s},s.id,!1,void 0,this))},void 0,!1,void 0,this)]]:[],...e.dueDate?[["Due",a(re,{children:Ie(e.dueDate)},void 0,!1,void 0,this)]]:[],["Updated",a("span",{class:"sui-muted",children:Cs(e.updatedAt)},void 0,!1,void 0,this)]]},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(_e,{label:"Open in Linear",variant:"outline",size:"sm",onClick:()=>{w.openUrl(e.url)}},void 0,!1,void 0,this),a(_e,{label:"Start Session",variant:"outline",size:"sm",disabled:t==="session",onClick:()=>n("session")},void 0,!1,void 0,this),a(_e,{label:"Plan",variant:"outline",size:"sm",disabled:t==="plan",onClick:()=>n("plan")},void 0,!1,void 0,this),a(qi,{identifier:e.identifier,source:r,size:"sm",building:t==="build",onBuild:()=>n("build")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),(t==="session"||t==="plan")&&a(Ji,{issue:e,plan:t==="plan",onClose:()=>n(null)},void 0,!1,void 0,this),t==="build"&&r&&a("div",{class:"lin-block-start",children:a(Ki,{identifier:e.identifier,source:r,onClose:()=>n(null)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Qi=({args:e})=>{let{ids:t}=nt(e.id),n=t[0];if(!n)return a("div",{class:"sui-muted",children:"LinearIssue needs an issue identifier such as ENG-123."},void 0,!1,void 0,this);return a(st,{ids:[n],children:(r)=>{let o=r.get(n);return o?a(Sc,{issue:o},void 0,!1,void 0,this):a(it,{id:n},void 0,!1,void 0,this)}},void 0,!1,void 0,this)};var hc=new Set(["id","status","assignee","priority","project","dueDate","cycle","estimate","labels","links","created","changes"]),An=({issue:e,selected:t,cursor:n,properties:r=hc,hideProject:o,compact:s,subIssues:i,extras:l,depth:f=0,disabled:_,onOpen:p})=>a("button",{type:"button",class:"lin-issue-row","aria-selected":t?"true":"false",disabled:_,"data-cursor":n?"true":"false","data-issue":e.identifier,"data-depth":f||void 0,style:f?{paddingLeft:`${8+f*22}px`}:void 0,onClick:()=>p(e),title:e.title,children:[r.has("priority")||s?a(sn,{priority:e.priority},void 0,!1,void 0,this):null,r.has("id")||s?a("span",{class:"lin-issue-key sui-mono",children:e.identifier},void 0,!1,void 0,this):null,r.has("status")||s?a(St,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this):null,a("span",{class:"lin-issue-title",children:e.title},void 0,!1,void 0,this),!s&&a("span",{class:"lin-issue-meta",children:a(ri,{issue:e,properties:r,subIssues:i,hideProject:o,extras:l},void 0,!1,void 0,this)},void 0,!1,void 0,this),(r.has("assignee")||s)&&(e.assignee?a("span",{class:"lin-meta-assignee",title:e.assignee.name,children:a(tt,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this):a("span",{class:"lin-avatar-empty","aria-label":"No assignee"},void 0,!1,void 0,this)),!s&&r.has("created")&&a("span",{class:"lin-meta-created sui-small sui-muted",title:"Created",children:Ie(e.createdAt)},void 0,!1,void 0,this),!s&&r.has("updated")&&a("span",{class:"lin-meta-updated sui-small sui-muted",title:"Updated",children:Ie(e.updatedAt)},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Jr=new Set(["id","status","assignee","priority","labels","dueDate"]),Zi=({args:e})=>{let{ids:t,skipped:n,cut:r}=nt(e.ids),o=ii(e.title);if(t.length===0)return a(_t,{title:o||void 0,children:[a("div",{class:"sui-muted",children:"No issue identifiers to show."},void 0,!1,void 0,this),a(At,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return a(_t,{title:o||void 0,children:[a(st,{ids:t,children:(s)=>a("div",{class:"lin-groups lin-block-rows",children:t.map((i)=>{let l=s.get(i);return l?a(An,{issue:l,properties:Jr,onOpen:(f)=>{w.openUrl(f.url)}},i,!1,void 0,this):a(it,{id:i},i,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(At,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var ea=({args:e,answered:t})=>{let{ids:n,skipped:r,cut:o}=nt(e.ids),s=ai(e.question),[i,l]=v(null),[f,_]=v(!1),p=t??i,S=Gr(t)??i,m=async(u)=>{if(f||p)return;_(!0);try{await w.answerBlock(di(u)),l(u.identifier)}catch(h){await he(w,"error",`Could not send your choice: ${h instanceof Error?h.message:String(h)}`)}finally{_(!1)}};return a(_t,{title:s||"Pick an issue",children:[n.length===0?a("div",{class:"sui-muted",children:"No issues to choose from."},void 0,!1,void 0,this):a(st,{ids:n,children:(u)=>a("div",{class:"lin-groups lin-block-rows","data-answered":p?"true":"false",children:n.map((h)=>{let R=u.get(h);return R?a(An,{issue:R,properties:Jr,selected:S===h,disabled:Boolean(p)||f,onOpen:(k)=>{m(k)}},h,!1,void 0,this):a(it,{id:h},h,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(At,{skipped:r,cut:o},void 0,!1,void 0,this),p?a("div",{class:"sui-small sui-muted","data-state":"answered",children:t?`${Gr(t)?"You chose":"You answered"}: ${t}`:`You chose ${i}.`},void 0,!1,void 0,this):n.length>0&&a("div",{class:"sui-small sui-muted",children:"Click an issue to choose it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Tc=({call:e})=>{switch(e.name){case"LinearIssue":return a(Qi,{args:e.args},void 0,!1,void 0,this);case"LinearIssueList":return a(Zi,{args:e.args},void 0,!1,void 0,this);case"LinearPickIssue":return a(ea,{args:e.args,answered:e.answered},void 0,!1,void 0,this);default:return a("div",{class:"sui-muted",children:["The Linear+ extension has no block called ",e.name.slice(0,40),"."]},void 0,!0,void 0,this)}},gc=()=>{Qe();let[e,t]=v(null),n=Ge(null);return de(()=>w.onBlock(t),[]),de(()=>{let r=n.current;if(!r)return;let o=0,s=new ResizeObserver(()=>{let i=Math.min(Math.ceil(r.getBoundingClientRect().height),kt);if(i===o)return;o=i,w.setHeight(i).catch(()=>{return})});return s.observe(r),()=>s.disconnect()},[]),a("div",{class:"lin-block",ref:n,style:{maxHeight:kt},children:e?a(Tc,{call:e},`${e.name}:${JSON.stringify(e.args)}`,!1,void 0,this):a("div",{class:"sui-muted",children:"Waiting for the agent"},void 0,!1,void 0,this)},void 0,!1,void 0,this)};Zo(a(gc,{},void 0,!1,void 0,this),document.getElementById("root"));})();

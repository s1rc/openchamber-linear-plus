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
`;function Rn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(r)=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=n.get(o);if(s!==void 0)clearTimeout(s);n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Qi=`(${Rn.toString()})(document);`;var bn=128,kn=65536;var Rt=128;var bt=65536;var ao=/^[a-z][a-z0-9-]{0,39}$/;var oo=(e)=>Object(e)===e&&!Array.isArray(e),In=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),so=(e)=>String(e)===e&&e.length>=1&&e.length<=60,io=(e)=>String(e)===e&&e.length>=1&&e.length<=80,co=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!oo(n)||!ao.test(n.id)||!so(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!In(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!In(n,["kind","id","label","value","options","disabled"]))return!1;if(!io(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!oo(o)||!In(o,["value","label"])||!io(o.value)||!so(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var lo=["{id}","{segment}","{segments+}"];var Rc=new Set(lo);var kt=960;var uo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var kc=new Set(uo);var It=20000000,Ct=256;var Cn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,po=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var _o=/^[A-Za-z0-9_-]{1,80}$/;var fo=["left","right","top","bottom"];var mo=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!mo(o,t+1,n))return!1;return!0},vn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(vn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(vn)}return String(e)===e||Number.isFinite(e)},wn=(e)=>{try{if(String(e.id)!==e.id||!_o.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!fo.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!mo(e.data)||!vn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Pn=2000;var So=["file","directory","other","missing"],Un=(e)=>Boolean(e&&"sessionId"in e),Nn=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var ho=/^[0-9a-f]{7,64}$/i,Ln=(e)=>ho.test(e),vt=500,wt=32000,To=16000,go=128,yo=200,xo=2000,Ao=16000,Oo=80,Ro=200,bo=16000;var ko=2000;var Dn=20000,Mt=1024,Pt=2000000;var Ut=64000,Nt=8000,$n=4000;var Gn=960000;var Io=999,Co=1e4,ct=500,vo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],wo=["stopped","starting","ready","failed"],ea=new Set(vo),Mo=(e)=>ea.has(e),Po=(e)=>e&&Mo(e)?e:"HOST_REJECTED",Ke=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Ke);if(Object(e)===e)return Object.values(e).every(Ke);return!1},Uo=(e)=>Ke(e)&&JSON.stringify(e).length<=bo,Eo=(e)=>e?.trim().slice(0,Ro)??"",ze=(e)=>{let t=e.id.trim().slice(0,go),n=e.title.trim().slice(0,yo),r=e.url.trim().slice(0,xo),o=e.text?.trim().slice(0,Ao),s=e.author?.trim().slice(0,Oo),i=e.kind==="pull"?"pull":"issue",l={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o)l.text=o;if(s)l.author=s;if(i==="pull"){let _=Eo(e.branches?.head),f=Eo(e.branches?.base);if(_&&f)l.branches={head:_,base:f}}if(Uo(e.data))l.data=e.data;return l},Hn=(e)=>{let t=ze(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Bn=(e)=>{let t={text:e.text.trim().slice(0,To)};if(e.send)t.send=!0;return t},Vn=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Io,Math.max(0,Math.round(e)))},Fn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Co,Math.max(0,Math.ceil(e)))};var qe=(e)=>e.length>0&&e.length<=Mt&&!e.includes("\x00")&&!e.includes("\\");var Lt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>ko)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},ta=new Set(wo),Xn=(e)=>Boolean(e&&"status"in e&&ta.has(String(e.status))&&!("body"in e)),Dt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),jn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Wn=(e)=>Boolean(e&&"written"in e&&e.written===!0),Kn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),na=new Set(So),zn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&na.has(String(e.kind))&&Number.isFinite(e.size)),qn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),ra=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),oa=(e)=>Object(e)===e?e:null,Mn=(e)=>String(e)===e&&e.length>0,sa=(e)=>{if(!Mn(e.id))return null;if(e.ok===!0){let t={channel:N,v:L,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Mn(e.error))return{channel:N,v:L,type:"result",id:e.id,ok:!1,error:e.error,code:Po(Mn(e.code)?e.code:void 0)};return null},Yn=(e)=>{let t=oa(e);if(!t||t.channel!==N||t.v!==L)return null;if(t.type==="result")return sa(t);if(!ra.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var No=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ia=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class k extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var Lo=()=>Promise.reject(new k("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),$t=()=>Promise.reject(new k("BAD_PATH",`File path must be 1 to ${Mt} characters without NUL or backslash.`)),Gt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new k("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},M=(e)=>(e.value+=1,`oc-${e.value}`),Jn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new k("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((c)=>c===t.parent),r=e.requestTimeoutMs??Dn,o=new Set,s=new Set,i=new Set,l=new Set,_=new Set,f=new Set,p=new Set,h=new Set,m=new Set,u=new Set,S=new Set,O=new Set,I=[],y=null,T=null,U=new Set,R=new Set,se=null,ie=null,oe=!1,B=new Map,ae=new Map,z=new Map,V=!1,E={value:0},g=null,ce=null,Ee=!1,ye=!1,We=null,ke=(c)=>{if(!c)return null;return{sessionId:c.id,phase:c.busy?"started":"completed"}},P=(c)=>{t.parent.postMessage(c,"*")},ee=()=>{if(V||t.parent===t||O.size===0||g?.features?.lateGenerateResults!==!0)return;P({channel:N,v:L,type:"generate-late-listen"})},C=(c,d)=>{for(let A of c)try{A(d)}catch(b){console.error(b)}},_e=(c)=>{if(!(c instanceof MessageEvent))return;if(!n(c.source))return;let d=Yn(c.data);if(!d)return;if(d.type==="workspace"){let b=ae.get(d.payload.subscriptionId);if(b)C([b],d.payload.snapshot);return}if(d.type==="shells"){let b=z.get(d.payload.subscriptionId);if(b)C([b],d.payload.snapshot);return}if(d.type==="ready"){if(g=d.payload,ce=ke(d.payload.session),C(o,d.payload),C(s,d.payload.directory),C(i,d.payload.session),ce)C(l,ce);if(C(_,d.payload.connection),C(f,d.payload.settings),C(p,d.payload.item),d.payload.block)C(h,d.payload.block);ee();return}if(d.type==="service-event"){C(m,d.payload);return}if(d.type==="generate-late"){if(O.size===0)I.push(d.payload);else C(O,d.payload);return}if(d.type==="directory"){if(g)g={...g,directory:d.payload.directory};C(s,d.payload.directory);return}if(d.type==="session"){if(g)g={...g,session:d.payload.session};if(!d.payload.session)ce=null;else if(ce?.sessionId!==d.payload.session.id)ce=ke(d.payload.session);C(i,d.payload.session);return}if(d.type==="session-lifecycle"){ce=d.payload,C(l,d.payload);return}if(d.type==="connection"){if(g)g={...g,connection:d.payload.connection};C(_,d.payload.connection);return}if(d.type==="settings"){if(g)g={...g,settings:d.payload.settings};C(f,d.payload.settings);return}if(d.type==="item"){if(g)g={...g,item:d.payload.item};C(p,d.payload.item);return}if(d.type==="status-control-event"){C(u,d.payload);return}if(d.type==="popover-closed"){C(S,d.payload);return}if(d.type==="action"){let b=(X)=>{if(!V)P({channel:N,v:L,type:"action-result",id:d.id,payload:X})},W=T;if(!W){b({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(d.payload)).then(()=>b({ok:!0}),(X)=>{let Q=(X instanceof Error?X.message:String(X)).trim();b({ok:!1,error:(Q||"Action failed.").slice(0,ct)})});return}if(d.type==="file-open"){let b=d.payload;if(ie&&po(ie,b))return;ie=b,C(U,d.payload);return}if(d.type==="file-saved"){C(R,d.payload.version);return}if(d.type==="file-snapshot"){let b=(Q)=>{if(!V)P({channel:N,v:L,type:"file-snapshot-result",id:d.id,payload:Q})},W=(Q)=>b({error:(Q.trim()||"Could not read the edited file.").slice(0,ct)}),X=se;if(!X){W("This extension does not edit files.");return}Promise.resolve().then(()=>X(d.payload.purpose)).then((Q)=>{if(Cn(Q)>It){W(`The file is over ${It} ${"bytes"in Q?"bytes":"characters"}.`);return}if(Q.version.length>Ct){W(`The snapshot version is over ${Ct} characters.`);return}b({snapshot:"bytes"in Q?{bytes:Q.bytes,version:Q.version}:{content:Q.content,version:Q.version}})},(Q)=>W(Q instanceof Error?Q.message:String(Q)));return}if(d.type==="resolve"){let b=(X)=>{P({channel:N,v:L,type:"resolve-result",id:d.id,payload:X})},W=y;if(!W){b({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(d.payload)).then((X)=>b({item:X?ze(X):null}),(X)=>{let Q=(X instanceof Error?X.message:String(X)).trim();b({error:(Q||"Command failed.").slice(0,ct)})});return}let A=B.get(d.id);if(!A)return;if(clearTimeout(A.timer),B.delete(d.id),d.ok){A.resolve(d.payload);return}A.reject(new k(d.code,d.error))};t.addEventListener("message",_e),P({channel:N,v:L,type:"hello"});let te=(c,d=r)=>{if(V||t.parent===t)return Promise.reject(new k("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((A,b)=>{let W=setTimeout(()=>{B.delete(c.id),b(new k("HOST_TIMEOUT","Host did not answer in time."))},d);B.set(c.id,{resolve:A,reject:b,timer:W}),P(c)})},F=(c)=>te(c).then(()=>{return}),q={channel:N,v:L},at=(c)=>{if(!V&&t.parent!==t)P(c)},Yr=()=>at({...q,type:"file-save"}),Jr=(c)=>{if(!No(c)||!ia(c))return;c.preventDefault(),Yr()},Qr=(c)=>{if(!No(c)||c.key!=="Escape"||g?.surface!=="popover"||!g.popover)return;c.preventDefault(),no(g.popover.id,"escape").catch(()=>{return})},xt=()=>{let c=g?.surface==="popover"?g.popover:void 0;if(!c)return;let d=Ee||ye;if(We===d)return;We=d,ro(c.id,d).catch(()=>{return})},At=()=>{if(g?.surface!=="popover"||Ee)return;Ee=!0,xt()},Zr=(c)=>{if(g?.surface!=="popover"||c.relatedTarget!==null||!Ee)return;Ee=!1,xt()},eo=()=>{if(g?.surface!=="popover"||ye)return;ye=!0,xt()},to=()=>{if(g?.surface!=="popover"||!ye)return;ye=!1,xt()},xe=(c,d=1024)=>{if(!c.trim()||c.length>d)throw new k("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},xn=async(c)=>{if(c.kind!=="projects")xe(c.projectId);let d=await te({...q,type:"workspace-read",id:M(E),payload:c});if(!d||!("kind"in d)||!("state"in d)||d.kind!==c.kind)throw new k("HOST_REJECTED","Host did not return workspace data.");return d},An=async(c,d)=>{if(c.kind!=="projects")xe(c.projectId);let A=M(E);ae.set(A,d);try{await F({...q,type:"workspace-subscribe",id:M(E),payload:{subscriptionId:A,query:c}})}catch(b){if(ae.delete(A),!V)P({...q,type:"workspace-unsubscribe",id:M(E),payload:{subscriptionId:A}});throw b}return()=>{if(!ae.delete(A)||V)return;P({...q,type:"workspace-unsubscribe",id:M(E),payload:{subscriptionId:A}})}},Ji=async(c,d)=>{if(c.kind==="session")xe(c.sessionId);if(c.kind==="project")xe(c.projectId);let A=M(E);z.set(A,d);try{await F({...q,type:"shells-subscribe",id:M(E),payload:{subscriptionId:A,scope:c}})}catch(b){if(z.delete(A),!V)P({...q,type:"shells-unsubscribe",id:M(E),payload:{subscriptionId:A}});throw b}return()=>{if(!z.delete(A)||V)return;P({...q,type:"shells-unsubscribe",id:M(E),payload:{subscriptionId:A}})}},Ot=async(c)=>{if("key"in c&&(c.key.length===0||c.key.length>bn))throw new k("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!Ke(c.value))throw new k("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>kn)throw new k("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&g?.features?.deviceStorage!==!0)throw new k("UNSUPPORTED","This host does not support device storage.");let d=await te({...q,type:"storage",id:M(E),payload:c});if(!d||!("storage"in d)||d.op!==c.op)throw new k("HOST_REJECTED","Host did not return storage data.");return d},no=(c,d)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===c)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):F({...q,type:"popover-close",id:M(E),payload:d?{id:c,reason:d}:{id:c}}),ro=(c,d)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===c)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):F({...q,type:"popover-anchor",id:M(E),payload:{id:c,active:d}});return t.addEventListener("keydown",Qr,!0),t.addEventListener("pointerover",At),t.addEventListener("pointermove",At),t.addEventListener("pointerout",Zr),t.addEventListener("focus",eo),t.addEventListener("blur",to),{onAction:(c)=>(T=c,()=>{if(T===c)T=null}),listProjects:async()=>{let c=await xn({kind:"projects"});if(c.kind!=="projects")throw new k("HOST_REJECTED","Expected projects.");return c},listWorktrees:async(c)=>{let d=await xn({kind:"worktrees",projectId:c});if(d.kind!=="worktrees")throw new k("HOST_REJECTED","Expected worktrees.");return d},listSessions:async(c)=>{let d=await xn({kind:"sessions",projectId:c});if(d.kind!=="sessions")throw new k("HOST_REJECTED","Expected sessions.");return d},onProjects:(c)=>An({kind:"projects"},(d)=>{if(d.kind==="projects")c(d)}),onWorktrees:(c,d)=>An({kind:"worktrees",projectId:c},(A)=>{if(A.kind==="worktrees")d(A)}),onSessions:(c,d)=>An({kind:"sessions",projectId:c},(A)=>{if(A.kind==="sessions")d(A)}),onRunningShells:(c,d)=>Ji(c,d),readShellOutput:async(c,d)=>{xe(c,Rt);let A=d?.cursor;if(A!==void 0&&(!Number.isInteger(A)||A<0))throw new k("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let b=d?.tailBytes;if(b!==void 0&&(!Number.isInteger(b)||b<1||b>bt))throw new k("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${bt}.`);let X=await te({...q,type:"shell-output",id:M(E),payload:{shellId:c,cursor:A,tailBytes:b}});if(!X||typeof X.output!=="string"||!Number.isFinite(X.cursor))throw new k("HOST_REJECTED","Host did not return shell output.");return X},stopShell:async(c)=>{if(xe(c,Rt),(await te({...q,type:"shell-stop",id:M(E),payload:{shellId:c}}))?.stopped!==!0)throw new k("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(c)=>{xe(c),await F({...q,type:"open-session",id:M(E),payload:{sessionId:c}})},storage:{get:async(c,d)=>{let A=Gt(d),b={op:"get",key:c};if(A)b.scope=A;let W=await Ot(b);return W.op==="get"&&W.found?W.value:void 0},set:async(c,d,A)=>{let b=Gt(A),W={op:"set",key:c,value:d};if(b)W.scope=b;await Ot(W)},delete:async(c,d)=>{let A=Gt(d),b={op:"delete",key:c};if(A)b.scope=A;await Ot(b)},keys:async(c)=>{let d=Gt(c),A={op:"keys"};if(d)A.scope=d;let b=await Ot(A);if(b.op!=="keys")throw new k("HOST_REJECTED","Expected storage keys.");return b.keys}},onReady:(c)=>{if(o.add(c),g)c(g);return()=>{o.delete(c)}},onDirectory:(c)=>{if(s.add(c),g)c(g.directory);return()=>{s.delete(c)}},onSession:(c)=>{if(i.add(c),g)c(g.session);return()=>{i.delete(c)}},onSessionLifecycle:(c)=>{if(l.add(c),ce)c(ce);return()=>{l.delete(c)}},onConnection:(c)=>{if(_.add(c),g)c(g.connection);return()=>{_.delete(c)}},onSettings:(c)=>{if(f.add(c),g)c(g.settings);return()=>{f.delete(c)}},onItem:(c)=>{if(p.add(c),g)c(g.item);return()=>{p.delete(c)}},onBlock:(c)=>{if(h.add(c),g?.block)c(g.block);return()=>{h.delete(c)}},onServiceEvent:(c)=>(m.add(c),()=>{m.delete(c)}),onStatusControl:(c)=>(u.add(c),()=>{u.delete(c)}),onPopoverClosed:(c)=>(S.add(c),()=>{S.delete(c)}),setStatusControls:(c)=>{if(g?.features?.statusControls!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support status controls."));if(!co(c))return Promise.reject(new k("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return F({...q,type:"status-controls",id:M(E),payload:{controls:c}})},openPopover:(c)=>{if(g?.features?.popovers!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support popovers."));if(!wn(c))return Promise.reject(new k("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return F({...q,type:"popover-open",id:M(E),payload:c})},closePopover:no,setPopoverAnchorActive:ro,onResolve:(c)=>(y=c,()=>{if(y===c)y=null}),toast:(c)=>{let d=c.message.trim();if(!d||d.length>vt)return Promise.reject(new k("HOST_REJECTED",`Toast message must contain 1 to ${vt} characters.`));if(c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>wt))return Promise.reject(new k("HOST_REJECTED",`Toast copy text must contain 1 to ${wt} characters.`));return F({channel:N,v:L,type:"toast",id:M(E),payload:{...c,message:d}})},openUrl:(c)=>F({channel:N,v:L,type:"open-url",id:M(E),payload:{url:c}}),openCommit:(c)=>Ln(c)?F({channel:N,v:L,type:"open-commit",id:M(E),payload:{sha:c}}):Promise.reject(new k("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(c)=>F({channel:N,v:L,type:"block-answer",id:M(E),payload:{text:c.trim().slice(0,Pn)}}),openSurface:(c)=>F({channel:N,v:L,type:"open-surface",id:M(E),payload:{surfaceId:c}}),writeClipboard:(c)=>F({channel:N,v:L,type:"clipboard-write",id:M(E),payload:{text:c}}),compose:(c)=>F({channel:N,v:L,type:"compose",id:M(E),payload:c}),attach:(c)=>F({channel:N,v:L,type:"attach",id:M(E),payload:ze(c)}),startSession:async(c)=>{if(c.projectId!==void 0)xe(c.projectId);let d=c.worktree;if(d&&d!==!0)if(d.kind==="existing")xe(d.directory);else{if(d.name!==void 0)xe(d.name,200);if(d.baseBranch!==void 0)xe(d.baseBranch,200)}let A=await te({channel:N,v:L,type:"start-session",id:M(E),payload:Hn(c)},e.requestTimeoutMs??180000);if(!Un(A))throw new k("HOST_REJECTED","Host did not return a session.");return A},prompt:(c)=>te({channel:N,v:L,type:"prompt",id:M(E),payload:Bn(c)}).then((d)=>{if(!Nn(d))throw new k("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:(c)=>F({channel:N,v:L,type:"session-link",id:M(E),payload:ze(c)}),close:()=>F({channel:N,v:L,type:"close",id:M(E)}),oauthStart:()=>F({channel:N,v:L,type:"oauth-start",id:M(E)}),oauthDisconnect:()=>F({channel:N,v:L,type:"oauth-disconnect",id:M(E)}),request:(c)=>(Lt(c.path)?te({channel:N,v:L,type:"request",id:M(E),payload:c}):Lo()).then((d)=>{if(!Dt(d))throw new k("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:(c)=>(Lt(c.path)?te({channel:N,v:L,type:"service-request",id:M(E),payload:c}):Lo()).then((d)=>{if(!Dt(d))throw new k("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>te({channel:N,v:L,type:"service-status",id:M(E)}).then((c)=>{if(!Xn(c))throw new k("HOST_REJECTED","Host did not return service status.");return c}),readFile:(c)=>(qe(c)?te({channel:N,v:L,type:"file-read",id:M(E),payload:{path:c}}):$t()).then((d)=>{if(!jn(d))throw new k("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(c,d)=>{if(!qe(c))return $t();if(d.length>Pt)return Promise.reject(new k("FILE_TOO_LARGE",`Content is over ${Pt} characters.`));return te({channel:N,v:L,type:"file-write",id:M(E),payload:{path:c,content:d}}).then((A)=>{if(!Wn(A))throw new k("HOST_REJECTED","Host did not confirm the write.");return A})},listDir:(c)=>(qe(c)?te({channel:N,v:L,type:"file-list",id:M(E),payload:{path:c}}):$t()).then((d)=>{if(!Kn(d))throw new k("HOST_REJECTED","Host did not return directory entries.");return d}),stat:(c)=>(qe(c)?te({channel:N,v:L,type:"file-stat",id:M(E),payload:{path:c}}):$t()).then((d)=>{if(!zn(d))throw new k("HOST_REJECTED","Host did not return file status.");return d}),generate:(c)=>{let d=c.prompt.trim(),A=c.system?.trim();if(d.length===0||d.length>Ut)return Promise.reject(new k("HOST_REJECTED",`Prompt must be 1 to ${Ut} characters.`));if(A!==void 0&&(A.length===0||A.length>Nt))return Promise.reject(new k("HOST_REJECTED",`System prompt must be 1 to ${Nt} characters.`));let b=c.maxOutputTokens===void 0?void 0:Math.min($n,Math.max(1,Math.floor(c.maxOutputTokens)));if(b!==void 0&&!Number.isFinite(b))return Promise.reject(new k("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:d};if(A!==void 0)W.system=A;if(b!==void 0)W.maxOutputTokens=b;return te({channel:N,v:L,type:"generate",id:M(E),payload:W},e.requestTimeoutMs??Gn).then((X)=>{if(!qn(X))throw new k("HOST_REJECTED","Host did not return generated text.");return X})},onLateGenerateResult:(c)=>{O.add(c);for(let d of I.splice(0))C([c],d);return ee(),()=>{O.delete(c)}},setBadge:(c)=>F({channel:N,v:L,type:"badge",id:M(E),payload:{count:Vn(c)}}),setHeight:(c)=>F({channel:N,v:L,type:"resize",id:M(E),payload:{height:Fn(c)}}),onFileOpen:(c)=>{if(U.add(c),!oe)oe=!0,t.addEventListener("keydown",Jr,!0);if(ie)c(ie);return()=>{U.delete(c)}},onFileSnapshot:(c)=>(se=c,()=>{if(se===c)se=null}),onFileSaved:(c)=>(R.add(c),()=>{R.delete(c)}),reportFileChange:(c)=>at({...q,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:Yr,reportFileUnsupported:()=>at({...q,type:"file-unsupported"}),dispose:()=>{for(let c of ae.keys())P({...q,type:"workspace-unsubscribe",id:M(E),payload:{subscriptionId:c}});ae.clear();for(let c of z.keys())P({...q,type:"shells-unsubscribe",id:M(E),payload:{subscriptionId:c}});if(z.clear(),V=!0,y=null,T=null,se=null,U.clear(),R.clear(),oe)t.removeEventListener("keydown",Jr,!0);t.removeEventListener("message",_e),t.removeEventListener("keydown",Qr,!0),t.removeEventListener("pointerover",At),t.removeEventListener("pointermove",At),t.removeEventListener("pointerout",Zr),t.removeEventListener("focus",eo),t.removeEventListener("blur",to);for(let c of B.values())clearTimeout(c.timer),c.reject(new k("HOST_UNAVAILABLE","Host client was disposed."));B.clear(),o.clear(),s.clear(),i.clear(),l.clear(),_.clear(),f.clear(),p.clear(),h.clear(),m.clear(),u.clear(),S.clear(),O.clear(),I.length=0}}};var Do=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Vc=new Set(Do);var $o=["none","agent","user"];var Xc=new Set($o);var D,Bo,aa,De,Qn,jt,Vo,Bt,Fo,er,Zn,ca,lt=Symbol.for("pv"),Wt={},Kt=[],la=/^m(i|n|o|s|text|space)$/,tr=Array.isArray,Xo=Kt.slice,Ve=Object.assign;function Be(e){e&&e.parentNode&&e.remove()}function Vt(e,t,n,r,o){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:lt,__v:o||++Bo,__i:-1,__u:0};return!o&&D.vnode&&D.vnode(s),s}function Ie(e){return e.children}function Ft(e,t){this.props=e,this.context=t,this.__g=0}function $e(e,t){if(t==null)return e.__&&$e(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:$e(e)}function da(e){var t,n=e.__v,r=n.__e,o=[],s=[],i=e.__P;i&&((t=Ve({constructor:lt},n)).__v=n.__v+1,D.vnode&&D.vnode(t),nr(i,t,n,e.__n,i.namespaceURI,32&n.__u?[r]:null,o,r||$e(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,Yo(o,t,s),n.__=n.__e=null,t.__e!=r&&jo(t))}function jo(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),jo(e)}function Go(e){(8&e.__g||(e.__g|=8,De.push(e),jt++))&&Qn==D.debounceRendering||((Qn=D.debounceRendering)||queueMicrotask)(Wo)}function Wo(){try{for(var e,t=1;De.length;)De.length>t&&De.sort(Vo),e=De.shift(),t=De.length,8&e.__g&&da(e)}finally{(jt=De.length)&&(Qn||queueMicrotask)(Wo)}}function Ko(e,t,n,r,o,s,i,l,_,f,p){var h,m,u,S,O,I,y=r.__k||Kt,T=t.length;for(_=ua(n,t,y,_,T),h=0;h<T;h++)(u=n.__k[h])!=null&&(m=~u.__i&&y[u.__i]||Wt,u.__i=h,I=nr(e,u,m,o,s,i,l,_,f,p),S=u.__e,(m.ref!=u.ref||8&m.__u)&&(m.ref&&rr(m.ref,null,u,m),u.ref&&p.push(u.ref,u.__c||S,u)),O=O||S,4&u.__u?(_=zo(u,_,e,!m.__v),m.__e&&(m.__e=null)):typeof u.type=="function"&&I!==void 0?_=I:S&&(_=S.nextSibling),u.__u&=-21);return n.__e=O,_}function ua(e,t,n,r,o){var s,i,l,_,f,p,h,m,u,S=n.length,O=S,I=0,y=0,T=e.__k=Array(o);for(s=0;s<o;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=T[s]=Vt(null,i):tr(i)?i=T[s]=Vt(Ie,{children:i}):i.constructor===lt&&i.__b?i=T[s]=Vt(i.type,i.props,i.key,i.ref,i.__v):T[s]=i,_=s+I,i.__=e,i.__b=e.__b+1,l=null,~(f=i.__i=pa(i,n,_,O))&&(O--,(l=n[f])&&(l.__u|=2)),l&&l.__v?(i.__u|=16,f==_-1?I--:f==_+1?I++:f!=_&&(f>_?I--:I++,y=1)):(~f||(o>S?I--:o<S&&I++),typeof i.type!="function"&&(i.__u|=4))):T[s]=null;if(y){for(p=[],h=[],s=0;s<o;s++)if((i=T[s])&&16&i.__u){for(I=0,m=p.length;I<m;)p[u=I+m>>1]<i.__i?I=u+1:m=u;p[I]=i.__i,h[s]=I+1}for(I=p.length;s--;)h[s]&&(h[s]==I?I--:T[s].__u|=4)}if(O)for(s=0;s<S;s++)!(l=n[s])||2&l.__u||(l.__e==r&&(r=$e(l)),or(l,l));return r}function zo(e,t,n,r){var o,s,i,l;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=zo(o[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=$e(e))&&!t.parentNode&&(t=null),i=e.__e,l=t;l&&l.nodeType==8;)l=l.nextSibling;for(i!=l&&(!r&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function pa(e,t,n,r){var o,{key:s,type:i}=e,l=t[n],_=l&&!(2&l.__u);if(l===null&&s==null||_&&s==l.key&&i==l.type)return n;if(r>(_?1:0)){for(o=n-1;o>=0;o--)if((l=t[o])&&!(2&l.__u)&&s==l.key&&i==l.type)return o;for(o=n+1;o<t.length;o++)if((l=t[o])&&!(2&l.__u)&&s==l.key&&i==l.type)return o}return-1}function Ho(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function Ht(e,t,n,r,o){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Ho(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||Ho(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof r!="function"&&(r=null),(e.__e||(e.__e={}))[t]=n,n&&r||(i=Zn[t]||(Zn[t]=_a(t)),(e.__a||(e.__a={}))[t]=er,s=t!=(t=t.replace(Fo,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(l){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function _a(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[Bt]==null)t[Bt]=er++;else if(t[Bt]<this.__a[e])return;return n(D.event?D.event(t):t)}}}function nr(e,t,n,r,o,s,i,l,_,f){var p,h,m,u,S,O,I,y,T,U,R,se,ie,oe,B,ae,z,V,E=t.type;if(t.constructor!==lt)return null;128&n.__u&&(_=32&n.__u,p=n.__c.__z)&&(t.__u|=_,h=s=[],p.nodeType==8?l=Xt(p,s):s.push(p),l=s[0]||l),(p=D.__b)&&p(t);e:if(typeof E=="function"){m=i.length;try{if(y=t.props,T=(p=E.prototype)&&p.render,U=(p=E.contextType)&&r[p.__c],R=p?U?U.props.value:p.__:r,(u=n.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(T?t.__c=u=new E(y,R):(t.__c=u=new Ft(y,R),u.constructor=E,u.render=ma),U&&U.sub(u),u.state||(u.state={}),u.__n=r,u.__g|=8,u.__h=[],u.__k=[]),T&&(u.__s||(u.__s=u.state),E.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=Ve({},u.__s)),Ve(u.__s,E.getDerivedStateFromProps(y,u.__s)))),S=u.props,O=u.state,u.__v=t,n.__c){if(y!==S&&T&&!E.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(y,R),t.__v==n.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(y,u.__s,R)===!1){t.__v!=n.__v&&(u.props=y,u.state=u.__s,u.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(g){g&&(g.__=t)}),Kt.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),l=$e(n);break e}u.componentWillUpdate&&u.componentWillUpdate(y,u.__s,R),T&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(S,O,I)})}else T&&!E.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),T&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=R,u.props=y,u.__P=e,u.__g&=-5,se=D.__r,ie=T?25:0;do u.__g&=-9,se&&se(t),p=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++ie<25);T&&(Kt.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(r=Ve({},r,u.getChildContext())),T&&n.__c&&u.getSnapshotBeforeUpdate&&(I=u.getSnapshotBeforeUpdate(S,O)),oe=p&&p.type===Ie&&p.key==null?p.props.children:p,y.__P&&(p=l,o=(e=y.__P).namespaceURI,_=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(g){g&&or(g,g)}),n.__k=null),l=n.__k?$e(n,0):null),l=Ko(e,tr(oe)?oe:[oe],t,n,r,o,s,i,l,_,f),y.__P&&(t.__e=null,l=p),t.__u&=-161,h&&h.some(Be),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(g){if(i.length=m,t.__v=null,_||s)if(g&&g.then){if(t.__u|=128|_,s){for(~(z=s.indexOf(l||void 0))||(z=s.length);(V=s[z-1])&&V.nodeType==8;)z--;for(;z<s.length;z++)if(V=s[z])if(s[z]=null,B){if(V==ae)break}else{if(V.nodeType!=8)break;V.data.startsWith("$s")&&(ae=Xt(B=V))}}if(!B){for(;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;B=l}(p=Xt(B=t.__c.__z||(t.__c.__z=B)))?(t.__e=B,l=p):t.__e=l,l=l&&l.nextSibling}else s&&s.some(Be);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),g&&g.then||qo(t),D.__e(g,t,n)}}else l=t.__e=fa(n.__e,t,n,r,o,s,i,_,f,e);return(p=D.diffed)&&p(t),l}function Xt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function qo(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(qo))}function Yo(e,t,n){for(var r=0;r<n.length;)rr(n[r++],n[r++],n[r++]);D.__c&&D.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){D.__e(s,o.__v)}})}function fa(e,t,n,r,o,s,i,l,_,f){var p,h,m,u,S,O,I,y,T=n.props||Wt,{props:U,type:R}=t;if(R=="svg"?o="http://www.w3.org/2000/svg":R=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((S=s[p])&&(R?S.localName==R:S.nodeType==3)){e=S,s[p]=null;break}}if(!e){if(y=f.ownerDocument||document,!R)return y.createTextNode(U);e=y.createElementNS(o,R,U.is?U:f),l&&(D.__m&&D.__m(t,s),l=!1),s=null}if(R){if(f=R=="template"&&e.content||e,s=R=="textarea"&&U.defaultValue!=null?null:s&&Xo.call(f.childNodes),!l&&s)for(T={},p=0;p<e.attributes.length;p++)T[(S=e.attributes[p]).name]=S.value;for(p in T)S=T[p],p=="dangerouslySetInnerHTML"?m=S:p=="children"||(p in U)||p=="value"&&("defaultValue"in U)||p=="checked"&&("defaultChecked"in U)||Ht(e,p,null,S,o);for(p in U)S=U[p],p=="children"?u=S:p=="dangerouslySetInnerHTML"?h=S:p=="value"?O=S:p=="checked"?I=S:l&&typeof S!="function"||T[p]===S||Ht(e,p,S,T[p],o);h?(l||m&&(h.__html==m.__html||h.__html==e.innerHTML)||(e.innerHTML=h.__html),t.__k=[]):(m&&(e.textContent=""),(R=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&la.test(R))&&(o="http://www.w3.org/1999/xhtml"),Ko(f,tr(u)?u:[u],t,n,r,o,s,i,s?s[0]:n.__k&&$e(n,0),l,_),s&&s.some(Be)),l&&R!="textarea"||(p="value",R=="progress"&&O==null?e.removeAttribute(p):O==null||O===e[p]&&(R!="progress"||O)||Ht(e,p,O,T[p],o),p="checked",I!=null&&I!=e[p]&&Ht(e,p,I,T[p],o))}else T===U||l&&e.data==U||(e.data=U);return e}function rr(e,t,n,r){try{typeof e=="function"?t?t.__x=e(t)||1:r&&(r=r.__c||r.__e)&&(t=r.__x)&&(r.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){D.__e(o,n)}}function or(e,t,n){var r,o,s,i;if(D.unmount&&D.unmount(e),!(r=e.ref)||r.current&&r.current!=e.__e||rr(r,null,t,e),r=e.__c){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(l){D.__e(l,t)}r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&or(r[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(r=e.__c)&&(r=r.__z)&&(o=Xt(r,s=[]))&&(r==e.__e&&s.some(Be),Be(o),Be(r)),n||Be(e.__e),e.__e=e.__c=e.__=null}function ma(e,t,n){return this.constructor(e,n)}function Jo(e,t){var n,r,o,s;D.__&&D.__(e,t),t.nodeType==9&&(t=t.documentElement),r=(n=e&&32&e.__u)?null:t.__k,t.__k=Vt(Ie,{children:[e]}),o=[],s=[],nr(t,t.__k,r||Wt,Wt,t.namespaceURI,r?null:t.firstChild?Xo.call(t.childNodes):null,o,r?r.__e:t.firstChild,n,s),Yo(o,t.__k,s),t.__k.props.children=null}D={__e:function(e,t,n,r){for(var o,s,i;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((i=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,r||{}),i=1),i&&8&o.__g)return void(o.__g|=2)}catch(l){e=l}}throw jt=0,e}},Bo=0,aa=function(e){return e!=null&&e.constructor===lt},Ft.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=Ve({},this.state)),typeof e=="function"&&(e=e(Ve({},n),this.props)),e&&(Ve(n,e),this.__v&&(t&&this.__k.push(t),Go(this)))},Ft.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Go(this))},Ft.prototype.render=Ie,De=[],jt=0,Vo=function(e,t){return e.__v.__b-t.__v.__b},Bt=Symbol(),Fo=/(PointerCapture)$|Capture$/i,er=0,Zn={},ca=0;var ut,ne,sr,Qo,ir=Object.is,zt=0,as=[],ar=[],Z=D,{__b:Zo,__r:es,diffed:ts,__c:ns,unmount:rs,__:os}=Z;function lr(e,t){Z.__h&&Z.__h(ne,e,zt||t),zt=0;var n=ne.__H||(ne.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function v(e){return zt=1,Ea(ls,e)}function Ea(e,t,n){var r=lr(ut++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):ls(void 0,t),function(s){var i=(r.__N||r.__)[0],l=r.t(i,s);ir(i,l)||(r.__N=[l,r.__[1]],r.__c.setState({}))}],r.__c=ne,!ne.__f)){ne.__f=!0;var o=ne.shouldComponentUpdate;ne.shouldComponentUpdate=function(s,i,l){var _=this.__H;if(!_)return!0;var f=!1,p=this.props!=s;if(_.__.some(function(m){m.__N&&(f=!0,ir(m.__[0],m.__N[0])||(p=!0))}),o){var h=o.call(this,s,i,l);return f?h||p:h}return!f||p}}return r.__}function le(e,t){var n=lr(ut++,3);!Z.__s&&cs(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,ne.__H.__h.push(n))}function Ge(e){return zt=5,pt(function(){return{current:e}},[])}function pt(e,t){var n=lr(ut++,7);return cs(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function Sa(){var e;do{for(;e=ar.shift();)try{dt(e)}catch(n){Z.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=as.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(dt),t.__h.some(cr),t.__h=[]}catch(n){t.__h=[],Z.__e(n,e.__v)}}}while(ar.length)}Z.__b=function(e){ne=null,Zo&&Zo(e)},Z.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),os&&os(e,t)},Z.__r=function(e){es&&es(e),ut=0;var t=(ne=e.__c).__H;t&&(sr==ne?ne.__h=[]:(t.__h.some(dt),t.__h.some(cr),ut=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),sr=ne},Z.diffed=function(e){ts&&ts(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&is(as.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),sr=ne=null},Z.__c=function(e,t){t.some(function(n){try{n.__h.some(dt),n.__h=n.__h.filter(function(r){return!r.__||cr(r)})}catch(r){n.__h=[function(){throw r}]}}),ns&&ns(e,t)},Z.unmount=function(e){rs&&rs(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{if(o.__P&&o.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}o.__P=n,is(ar.push(o))}else dt(o)}catch(s){t=s}}),r.__H=void 0,t&&Z.__e(t,r.__v))};var ss=typeof requestAnimationFrame=="function";function ha(e){var t,n=function(){clearTimeout(r),ss&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);ss&&(t=requestAnimationFrame(n))}function is(e){e!=1&&Qo==Z.requestAnimationFrame||((Qo=Z.requestAnimationFrame)||ha)(Sa)}function dt(e){var t=ne,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),ne=t}function cr(e){var t=ne;e.__c=e.__(),ne=t}function cs(e,t){return!e||e.length!=t.length||t.some(function(n,r){return!ir(n,e[r])})}function ls(e,t){return typeof t=="function"?t(e):t}var Ta=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],ga=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ds=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of Ta)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of ga){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},dr=(e,t)=>{if(ds(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var ya={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},K=(e,t)=>`var(--${e}, var(--oc-${ya[e]}, ${t}))`,we=K("surface-background","transparent"),Yt=K("surface-elevated","transparent"),Ye=K("surface-elevated-foreground","inherit"),Se=K("surface-foreground","inherit"),Y=K("surface-muted-foreground","gray"),xa=K("surface-muted","transparent"),Fe=K("interactive-border","currentColor"),fe=K("interactive-hover","transparent"),Xe=K("interactive-active","transparent"),ur=K("interactive-selection","transparent"),pr=K("interactive-selection-foreground","inherit"),ve=K("primary","currentColor"),_r=K("primary-text","inherit"),fr=K("error-text","inherit"),Aa=K("font-sans","inherit"),mr=K("font-mono","monospace"),fs=K("radius","9px"),Er=`calc(${fs} - 2px)`,us=`calc(${fs} - 4px)`,J=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,ps=`background-image: linear-gradient(${fe}, ${fe});`,Sr=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,hr="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",_s="box-shadow: var(--oc-sdk-lit);",Tr=`inset 0 0.5px 0 0 ${J(Se,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Oa=`
:root {
  --oc-sdk-edge: ${J(Se,16)};
  --oc-sdk-field-bg: ${Yt};
  --oc-sdk-raised-bg: ${we};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${J(Se,14)};
  --oc-sdk-field-bg: ${J(we,50,Yt)};
  --oc-sdk-raised-bg: ${Yt};
  --oc-sdk-field-lift: ${Tr};
  --oc-sdk-raised-lift: ${Tr};
  --oc-sdk-lit: ${Tr};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,qt=(e)=>{let t=K(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${K(`${e}-text`,"inherit")}; }`},Ra=`
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
`,ms=`${Oa}
.oc-sdk { color: ${Se}; font-family: ${Aa}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${ps} }
.oc-sdk-mono { font-family: ${mr}; }
.oc-sdk-muted { color: ${Y}; }
${qt("success")}${qt("warning")}${qt("error")}${qt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ve}; --oc-sdk-tone-text: ${_r}; }

.oc-sdk-btn { border-radius: ${Er}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${us}; }
.oc-sdk-btn[data-variant="default"] { color: ${_r}; background: ${J(ve,10,we)}; border-color: ${J(ve,12)}; ${_s} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${J(ve,16,we)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${J(ve,22,we)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${xa}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Xe}, ${Xe}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Ye}; ${hr} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Xe}, ${Xe}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${fe}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Xe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${K("status-error","red")}; color: ${fr}; background: ${J("var(--oc-sdk-tone)",7,we)}; border-color: ${J("var(--oc-sdk-tone)",12)}; ${_s} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${J("var(--oc-sdk-tone)",9,we)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${J("var(--oc-sdk-tone)",11,we)}; box-shadow: none; }

.oc-sdk-field-note { color: ${Y}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${fr}; }
.oc-sdk-input { border-radius: ${Er}; background: var(--oc-sdk-field-bg); color: ${Ye}; ${Sr("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${Y}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Sr(J(Se,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Sr(K("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${mr}; }

.oc-sdk-search-icon { color: ${Y}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ve}; }
.oc-sdk-search-clear { border-radius: ${us}; color: ${Y}; }
.oc-sdk-search-clear:hover { background: ${fe}; color: ${Se}; }

.oc-sdk-trigger { border-radius: ${Er}; background: var(--oc-sdk-raised-bg); color: ${Ye}; ${hr} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${fe}, ${fe}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Xe}, ${Xe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${Y}; }
.oc-sdk-trigger-chevron { color: ${Y}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Ye}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Yt}; background-clip: padding-box; color: ${Ye}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${fe}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${ur}; color: ${pr}; }
.oc-sdk-option-check { color: ${Se}; }
.oc-sdk-option[data-destructive="true"] { color: ${fr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${J(K("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${Y}; }
.oc-sdk-popup-empty { color: ${Y}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Fe}; border-radius: 4px; color: ${Se}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${J(Se,60,Fe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Fe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${we}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ve}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${ps} }
.oc-sdk-check-desc { color: ${Y}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${J(Se,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${Y}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Se}; }
.oc-sdk-tab[aria-selected="true"] { color: ${pr}; background: ${ur}; border-color: ${Fe}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Ye}; background: var(--oc-sdk-raised-bg); ${hr} }
.oc-sdk-tab-count { color: ${Y}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${J(Se,6)}; color: ${Y}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${J("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${fe}; }
.oc-sdk-row[aria-selected="true"] { background: ${ur}; color: ${pr}; }
.oc-sdk-row-lead { font-family: ${mr}; color: ${Y}; }
.oc-sdk-row-sub { color: ${Y}; }
.oc-sdk-row-meta { color: ${Y}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${Y}; }

.oc-sdk-empty-body { color: ${Y}; }

.oc-sdk-spinner { color: ${Y}; }
.oc-sdk-spinner-ring { border-color: ${Fe}; border-top-color: ${ve}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${J("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${Y}; }

.oc-sdk-separator { color: ${Y}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${J(Fe,40)}; }

.oc-sdk-progress-label { color: ${Y}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${J(Se,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ve}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${K("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${K("success-text","inherit")}; }

.oc-sdk-text a { color: ${_r}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${J(Fe,60)}; }
`,G=`
${On}
${Ra}
${ms}`;var Es="oc-sdk-ui-style",Me=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},H=(e)=>{let t=document.getElementById(Es);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}Rn(document);let n=document.createElement("style");n.id=Es,n.textContent=e,document.head.appendChild(n)},x=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},me=(e)=>{let t=x("button",e);return t.type="button",t},j=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},he=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},Ss=(e,t)=>{let n=(r)=>{if(r.target instanceof Node&&e.contains(r.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var ba=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Pe=(e,t)=>{H(G);let n=t,r=me("oc-sdk oc-sdk-btn"),o=ba(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{if(r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=Boolean(n.disabled)||Boolean(n.loading),r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r)r.prepend(o);else if(!n.loading&&o.parentNode===r)o.remove();j(s,n.label)},l=()=>{if(n.disabled||n.loading)return;n.onClick()};return r.addEventListener("click",l),i(),{update:(_)=>{n={...n,..._},i()},dispose:()=>{r.removeEventListener("click",l),r.remove()}}};var gr=(e,t)=>{H(G);let n=t,r=x("label","oc-sdk oc-sdk-field"),o=x("span","oc-sdk-field-label"),s=n.multiline?x("textarea","oc-sdk-input"):x("input","oc-sdk-input"),i=x("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let l=()=>{if(j(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),he(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let f=Boolean(n.error);r.dataset.invalid=f?"true":"false",s.setAttribute("aria-invalid",f?"true":"false");let p=n.error??n.helper??"";j(i,p),i.hidden=p===""},_=()=>{n.onChange(s.value)};return s.addEventListener("input",_),l(),{update:(f)=>{n={...n,...f},l()},dispose:()=>{s.removeEventListener("input",_),r.remove()}}};var ka={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ae=(e,t,n)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n)r.setAttribute("class",n);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",ka[e]),r.append(o),r};var yr=(e,t)=>{H(G);let n=t,r=x("div","oc-sdk oc-sdk-search"),o=x("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=me("oc-sdk-search-clear");s.append(Ae("close",14)),s.tabIndex=-1,r.append(Ae("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let p=n.placeholder??"Search";if(he(o,"placeholder",p),o.setAttribute("aria-label",n.label??p),s.setAttribute("aria-label","Clear search"),o.value!==n.value)o.value=n.value;r.dataset.active=n.value.trim()===""?"false":"true"},l=()=>{if(n.value!=="")n.onChange("");o.focus()},_=()=>{n.onChange(o.value)},f=(p)=>{if(p.key==="Escape"&&o.value!=="")p.preventDefault(),l()};if(o.addEventListener("input",_),o.addEventListener("keydown",f),s.addEventListener("click",l),i(),n.autofocus)o.focus();return{update:(p)=>{n={...n,...p},i()},dispose:()=>{o.removeEventListener("input",_),o.removeEventListener("keydown",f),s.removeEventListener("click",l),r.remove()}}};var Ce=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Ue=(e,t,n)=>{let r=e.filter((_)=>!_.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex((_)=>_.id===t);if(i===-1)return n==="next"?o.id:s.id;return r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var hs=(e,t)=>`${e}-${t??""}`,Jt=(e,t,n,r)=>{let o=me("oc-sdk-option");if(o.id=hs(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(n.disabled),t==="option")o.setAttribute("aria-selected",n.selected?"true":"false");o.dataset.destructive=n.destructive?"true":"false";let s=x("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=x("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=x("span","oc-sdk-option-check");i.append(Ae("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Qt=(e,t,n,r)=>{let o=hs(n,r);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";he(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Ia=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;if(r>o&&n.top-8>o)e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},Zt=(e,t,n,r)=>{e.append(n),Ia(n,t);let o=Ss(e,r),s=()=>{r()},i=(l)=>{if(l.target instanceof Node&&n.contains(l.target))return;r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var Ts=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((r)=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n))},Ca=0,en=(e,t)=>{H(G);let n=t,r=`oc-sdk-select-${Ca+=1}`,o=x("div","oc-sdk oc-sdk-select"),s=x("span","oc-sdk-field-label");s.id=`${r}-label`;let i=me("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let l=x("span","oc-sdk-trigger-value");i.append(l,Ae("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let _="",f=null,p=null,h=x("div","oc-sdk oc-sdk-popup"),m=x("div","oc-sdk-popup-search"),u=x("input","oc-sdk-input");u.type="text",u.autocomplete="off",m.append(u);let S=x("div");S.setAttribute("role","listbox"),S.tabIndex=-1,h.append(S);let O=()=>Ts(n.options,n.searchable?_:""),I=()=>n.searchable?u:S,y=(E)=>{f=E,Qt(S,I(),r,E)},T=()=>{Me(S);let E=O();if(E.length===0){let g=x("div","oc-sdk-popup-empty");g.textContent="No matches",S.append(g)}for(let g of E)S.append(Jt(r,"option",{...g,selected:g.id===n.value},{hover:()=>y(g.id),pick:()=>se(g.id)}));y(E.some((g)=>g.id===f)?f:E[0]?.id??null)},U=()=>{let E=p;p=null,E?.(),_="",u.value="",i.setAttribute("aria-expanded","false")},R=()=>{if(p||n.disabled)return;if(f=n.value,u.placeholder=n.searchPlaceholder??"Search",n.searchable)h.prepend(m);else m.remove();T(),p=Zt(o,i,h,U),i.setAttribute("aria-expanded","true"),I().focus()},se=(E)=>{if(U(),i.focus(),E!==n.value)n.onChange(E)},ie=()=>{if(p)U();else R()},oe=(E)=>{if(!p&&Ce(E))E.preventDefault(),R()},B=(E)=>{let g=Ce(E);if(g)E.preventDefault(),y(Ue(O(),f,g));else if(E.key==="Enter"){if(E.preventDefault(),f)se(f)}else if(E.key==="Escape")E.preventDefault(),U(),i.focus();else if(n.searchable&&E.target!==u&&E.key.length===1&&!E.ctrlKey&&!E.metaKey)u.focus()},ae=()=>{_=u.value,T()},z=(E)=>{if(p&&!(E.relatedTarget instanceof Node&&o.contains(E.relatedTarget)))U()},V=()=>{j(s,n.label),s.hidden=!n.label;let E=n.options.find((g)=>g.id===n.value);if(j(l,E?.label??n.placeholder??"Select"),l.dataset.empty=E?"false":"true",i.disabled=Boolean(n.disabled),p)T()};return i.addEventListener("click",ie),i.addEventListener("keydown",oe),h.addEventListener("keydown",B),u.addEventListener("input",ae),o.addEventListener("focusout",z),V(),{update:(E)=>{n={...n,...E},V()},dispose:()=>{U(),i.removeEventListener("click",ie),i.removeEventListener("keydown",oe),h.removeEventListener("keydown",B),u.removeEventListener("input",ae),o.removeEventListener("focusout",z),o.remove()}}};var gs=(e,t,n)=>{H(G);let r=t,o=me("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=x("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(Ae("check",12));let i=x("span","oc-sdk-check-text"),l=x("span","oc-sdk-check-label"),_=x("span","oc-sdk-check-desc");i.append(l,_),o.append(s,i),e.append(o);let f=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=Boolean(r.disabled),j(l,r.label),j(_,r.description),_.hidden=!r.description},p=()=>{if(!r.disabled)r.onChange(!r.checked)};return o.addEventListener("click",p),f(),{update:(h)=>{r={...r,...h},f()},dispose:()=>{o.removeEventListener("click",p),o.remove()}}},xr=(e,t)=>gs(e,t,"checkbox"),tn=(e,t)=>gs(e,t,"switch");var Ar=(e,t)=>{H(G);let n=t,r=x("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Me(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let l=me("oc-sdk-tab");l.setAttribute("role","tab");let _=i.id===n.activeId;l.setAttribute("aria-selected",_?"true":"false"),l.tabIndex=_?0:-1,l.dataset.id=i.id;let f=x("span");if(f.textContent=i.label,l.append(f),i.count!==void 0){let p=x("span","oc-sdk-tab-count");p.textContent=String(i.count),l.append(p)}l.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),r.append(l)}},s=(i)=>{let l=Ce(i,"horizontal");if(!l)return;let _=Ue(n.items,n.activeId,l);if(_&&_!==n.activeId){i.preventDefault(),n.onChange(_);let f=r.querySelector(`[data-id="${CSS.escape(_)}"]`);if(f instanceof HTMLElement)f.focus()}};return r.addEventListener("keydown",s),o(),{update:(i)=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var _t=(e,t)=>{he(e,"data-tone",t&&t!=="neutral"?t:null)},Or=(e,t)=>{H(G);let n=t,r=x("span","oc-sdk oc-sdk-badge");e.append(r);let o=()=>{j(r,n.label),_t(r,n.tone)};return o(),{update:(s)=>{n={...n,...s},o()},dispose:()=>{r.remove()}}};var va=0,Rr=(e,t)=>{H(G);let n=t,r=`oc-sdk-list-${va+=1}`,o=x("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,i=(h)=>`${r}-${h}`,l=(h)=>{s=h;for(let m of Array.from(o.children))if(m instanceof HTMLElement)m.dataset.active=m.id===i(h??"")?"true":"false";he(o,"aria-activedescendant",h?i(h):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},_=(h,m)=>{let u=x("span",h);return u.textContent=m,u},f=()=>{if(Me(o),he(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(_("oc-sdk-list-empty",n.emptyText??"Nothing here")),l(null);return}for(let m of n.items){let u=me("oc-sdk-row");if(u.id=i(m.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",m.id===n.selectedId?"true":"false"),u.disabled=Boolean(m.disabled),u.tabIndex=-1,m.leading)u.append(_("oc-sdk-row-lead",m.leading));let S=x("span","oc-sdk-row-main");if(S.append(_("oc-sdk-row-title",m.title)),m.subtitle)S.append(_("oc-sdk-row-sub",m.subtitle));if(u.append(S),m.badge){let O=_("oc-sdk-badge",m.badge.label);_t(O,m.badge.tone),u.append(O)}if(m.meta)u.append(_("oc-sdk-row-meta",m.meta));u.addEventListener("click",()=>n.onSelect(m.id)),o.append(u)}let h=n.items.some((m)=>m.id===s&&!m.disabled);l(h?s:n.selectedId??null)},p=(h)=>{let m=Ce(h);if(m){h.preventDefault(),l(Ue(n.items,s,m));return}if((h.key==="Enter"||h.key===" ")&&s)h.preventDefault(),n.onSelect(s)};return o.addEventListener("keydown",p),f(),{update:(h)=>{n={...n,...h},f()},dispose:()=>{o.removeEventListener("keydown",p),o.remove()}}};var br=(e,t)=>{H(G);let n=t,r=x("div","oc-sdk oc-sdk-empty"),o=x("h2","oc-sdk-empty-title"),s=x("p","oc-sdk-empty-body"),i=x("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let l=null,_=()=>{if(j(o,n.title),j(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){l?.dispose(),l=null;return}let f={label:n.action.label,onClick:n.action.onClick};if(l)l.update(f);else l=Pe(i,{...f,variant:"outline",size:"sm"})};return _(),{update:(f)=>{n={...n,...f},_()},dispose:()=>{l?.dispose(),l=null,r.remove()}}};var kr=(e,t={})=>{H(G);let n=t,r=x("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=x("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=x("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",j(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(l)=>{n={...n,...l},i()},dispose:()=>{r.remove()}}};var Ir=(e,t)=>{H(G);let n=t,r=x("div","oc-sdk oc-sdk-banner"),o=x("div","oc-sdk-banner-text"),s=x("div","oc-sdk-banner-title"),i=x("div","oc-sdk-banner-body"),l=x("div","oc-sdk-banner-action");o.append(s,i),r.append(o,l),e.append(r);let _=null,f=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),j(s,n.title),j(i,n.body),i.hidden=!n.body,l.hidden=!n.action,!n.action){_?.dispose(),_=null;return}let p={label:n.action.label,onClick:n.action.onClick};if(_)_.update(p);else _=Pe(l,{...p,variant:"outline",size:"xs"})};return f(),{update:(p)=>{n={...n,...p},f()},dispose:()=>{_?.dispose(),_=null,r.remove()}}};var wa=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,Cr=(e,t)=>{H(G);let n=t,r=x("div","oc-sdk oc-sdk-progress"),o=x("div","oc-sdk-progress-label"),s=x("span"),i=x("span","oc-sdk-progress-value"),l=x("span"),_=Ae("check",14);i.append(_,l),o.append(s,i);let f=x("div","oc-sdk-progress-track");f.setAttribute("role","progressbar"),f.setAttribute("aria-valuemin","0"),f.setAttribute("aria-valuemax","100");let p=x("div","oc-sdk-progress-fill");f.append(p),r.append(o,f),e.append(r);let h=()=>{let m=wa(n.value);if(_t(p,n.tone),p.style.transform=`scaleX(${m/100})`,f.setAttribute("aria-valuenow",String(m)),n.label)f.setAttribute("aria-label",n.label);else f.removeAttribute("aria-label");j(s,n.label),j(l,`${m}%`);let u=m===100&&(!n.tone||n.tone==="neutral");he(r,"data-done",u?"true":null),_.style.display=u?"":"none",o.hidden=!n.label};return h(),{update:(m)=>{n={...n,...m},h()},dispose:()=>{r.remove()}}};var ys=(e)=>e.filter((t)=>!("separator"in t)),Ma=0,vr=(e,t)=>{H(G);let n=t,r=`oc-sdk-menu-${Ma+=1}`,o=x("div","oc-sdk oc-sdk-menu");e.append(o);let s=x("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,l=null,_=Pe(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)m();else u()}}),f=o.querySelector("button");f?.setAttribute("aria-haspopup","menu");let p=(y)=>{l=y,Qt(s,s,r,y)},h=()=>{Me(s);for(let y of n.items){if("separator"in y){let T=x("div","oc-sdk-separator");T.dataset.labeled="false",s.append(T);continue}s.append(Jt(r,"menuitem",y,{hover:()=>p(y.id),pick:()=>S(y.id)}))}p(ys(n.items).some((y)=>y.id===l)?l:null)},m=()=>{let y=i;i=null,y?.(),l=null,f?.setAttribute("aria-expanded","false")},u=()=>{if(i||!f)return;h(),i=Zt(o,f,s,m),f.setAttribute("aria-expanded","true"),s.focus()},S=(y)=>{m(),f?.focus(),n.onSelect(y)},O=(y)=>{let T=Ce(y);if(T)y.preventDefault(),p(Ue(ys(n.items),l,T));else if(y.key==="Enter"||y.key===" "){if(y.preventDefault(),l)S(l)}else if(y.key==="Escape")y.preventDefault(),m(),f?.focus()},I=(y)=>{if(i&&!(y.relatedTarget instanceof Node&&o.contains(y.relatedTarget)))m()};return s.addEventListener("keydown",O),o.addEventListener("focusout",I),{update:(y)=>{if(n={...n,...y},_.update({label:n.label,variant:n.variant,size:n.size}),i)h()},dispose:()=>{m(),s.removeEventListener("keydown",O),o.removeEventListener("focusout",I),_.dispose(),o.remove()}}};var w=Jn(),Ne=null,nn=new Set;w.onReady((e)=>{Ne=e,dr(e,document.documentElement);for(let t of nn)t(e)});w.onItem((e)=>{if(!Ne||Ne.item===e)return;Ne={...Ne,item:e};for(let t of nn)t(Ne)});var Je=()=>{let[e,t]=v(Ne);return le(()=>{if(nn.add(t),Ne)t(Ne);return()=>{nn.delete(t)}},[]),e};var Pa=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},xs=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),Ua=(e,t)=>{let n=e;for(let r of t){if(n===null||n===void 0)return;n=n[r]}return n},wr=(e,t)=>{let n=(r,o)=>{if(typeof r==="function")return(...s)=>{let i=Ua(t.current,o);return typeof i==="function"?i(...s):void 0};if(Array.isArray(r))return r.map((s,i)=>n(s,[...o,i]));if(Pa(r))return Object.fromEntries(Object.entries(r).map(([s,i])=>[s,n(i,[...o,s])]));return r};return n(e,[])};var Na=Symbol.for("pv"),La=0;function a(e,t,n,r,o,s){t||(t={});var i,l,_=t;if("ref"in _&&typeof e!="function")for(l in _={},t)l=="ref"?i=t[l]:_[l]=t[l];var f={type:e,props:_,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Na,__v:--La,__i:-1,__u:0};return(o||s)&&(f.__source=o,f.__self=s),D.vnode&&D.vnode(f),f}var Mr=(...e)=>e.filter(Boolean).join(" ");var re=({children:e,class:t})=>a("span",{class:Mr("sui-chip",t),children:e},void 0,!1,void 0,this),As=({children:e,onClick:t,pressed:n,class:r})=>t?a("button",{type:"button",class:Mr("sui-card",r),"aria-pressed":n,onClick:t,children:e},void 0,!1,void 0,this):a("div",{class:Mr("sui-card sui-card--static",r),children:e},void 0,!1,void 0,this);var ft=({title:e,children:t})=>a("div",{class:"sui-section",children:[e&&a("h3",{class:"sui-section-title",children:e},void 0,!1,void 0,this),t]},void 0,!0,void 0,this),Os=({items:e})=>a("dl",{class:"sui-kv",children:e.flatMap(([t,n])=>[a("dt",{children:t},void 0,!1,void 0,this),a("dd",{children:n},void 0,!1,void 0,this)])},void 0,!1,void 0,this),Rs=(e,t)=>{let n=Ge(null),r=Ge(null),o=Ge(t);o.current=t;let s=xs(t),i=Ge(!1);le(()=>{if(!n.current)return;return r.current=e(n.current,wr(o.current,o)),i.current=!0,()=>{r.current?.dispose(),r.current=null,i.current=!1}},[]);let l=Ge(s);return le(()=>{if(!i.current||l.current===s)return;l.current=s,r.current?.update(wr(o.current,o))},[s]),n};var Oe=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let r=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...r?{}:{year:"numeric"}})},bs=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let r=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-r)/86400000)},ks=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let r=Math.max(0,Math.round((t-n)/60000));if(r<1)return"just now";if(r<60)return`${r}m ago`;let o=Math.round(r/60);if(o<24)return`${o}h ago`;let s=Math.round(o/24);if(s<30)return`${s}d ago`;return Oe(e,new Date(t))};var Da={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},Qe=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return Da[e]??String(e);return String(e)},Pr=(e)=>{let t=e.url.match(/\/-\/merge_requests\/(\d+)/),n=e.url.match(/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/),r=t?.[1]??n?.[1];if(!r)return null;let o=e.metadata??{},s=String(o.status??o.state??"").toLowerCase(),l=o.draft===!0||o.isDraft===!0||s==="draft"?"draft":s==="merged"?"merged":s==="closed"?"closed":s==="open"||s==="opened"||s==="approved"||s==="reviewing"?"open":null;return{label:`${t?"!":"#"}${r}`,status:l,url:e.url,title:e.title}},Is=(e,t=Date.now())=>{if(!e)return null;let n=new Date(e).getTime();if(Number.isNaN(n))return null;let r=n<t,o=Math.round(Math.abs(n-t)/60000),s=Math.round(o/60),i=Math.round(s/24),l=o<60?`${Math.max(1,o)}m`:s<24?`${s}h`:i<14?`${i}d`:`${Math.round(i/7)}w`;return{text:r?`-${l}`:l,overdue:r}},Cs=(e)=>{let t=Math.abs(e),n=(r)=>String(Math.round(r*10)/10).replace(/\.0$/,"");if(t>=1e6)return`$${n(e/1e6)}M`;if(t>=1000)return`$${n(e/1000)}k`;return`$${Math.round(e)}`},vs=(e,t=Date.now())=>{let n=e?new Date(e).getTime():NaN;if(Number.isNaN(n))return null;let r=Math.max(0,Math.round((t-n)/60000));if(r<60)return`${Math.max(1,r)}m`;let o=Math.round(r/60);if(o<24)return`${o}h`;let s=Math.round(o/24);return s<14?`${s}d`:`${Math.round(s/7)}w`};var ws=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let o=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:null},Ms=([e,t,n])=>{let r=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*r(e)+0.7152*r(t)+0.0722*r(n)},$a=(e,t)=>{let[n,r]=[Ms(e),Ms(t)].sort((o,s)=>s-o);return(n+0.05)/(r+0.05)};var Ps=(e,t)=>{let n=ws(e),r=ws(t);if(!n||!r||$a(n,r)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Ze=new Map,Ga=30000,Us=(e)=>{let t=Ze.get(e);if(!t)t={at:0,listeners:new Set},Ze.set(e,t);return t},rn=(e)=>{for(let t of e.listeners)t()},mt=(e,t,n=!1)=>{let r=Us(e);if(r.promise)return r.promise;if(!n&&r.value!==void 0&&Date.now()-r.at<Ga)return Promise.resolve(r.value);let o=t().then((s)=>(r.value=s,r.error=void 0,r.at=Date.now(),s),(s)=>{throw r.error=s,s}).finally(()=>{r.promise=void 0,rn(r)});return r.promise=o,rn(r),o};var Ns=(e)=>{let t=[];for(let[n,r]of Ze){if(r.value===void 0)continue;let o=e(n,r.value);if(o===r.value)continue;t.push([r,r.value]),r.value=o,rn(r)}return()=>{for(let[n,r]of t)n.value=r,rn(n)}},Ls=(e)=>{let t=Ze.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)mt(e,t.fetcher,!0).catch(()=>{return})},Le=(e)=>{for(let[t,n]of Ze){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)mt(t,n.fetcher,!0).catch(()=>{return})}},Et=(e,t)=>{let[,n]=v(0);le(()=>{if(!e)return;let o=Us(e);o.fetcher=t;let s=()=>n((i)=>i+1);return o.listeners.add(s),mt(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let r=e?Ze.get(e):void 0;return{data:r?.value,error:r?.error,loading:Boolean(r?.promise)||e!==null&&r?.value===void 0&&r?.error===void 0,refresh:()=>{if(e)mt(e,t,!0).catch(()=>{return})}}};var Ds=(e,t)=>JSON.stringify({query:e,variables:t});class de extends Error{kind;constructor(e,t){super(t);this.kind=e}}var ue=async(e,t)=>{let n;try{n=await w.request({method:"POST",path:"/graphql",body:Ds(e,t)})}catch(o){if(o instanceof k){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new de("disconnected","Linear is not connected.");throw new de("network",o.message||"Could not reach Linear.")}throw new de("network",o instanceof Error?o.message:"Could not reach Linear.")}let r;try{r=JSON.parse(n.body)}catch{throw new de("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new de("disconnected","Linear sign-in expired.");if(r.errors?.length){let o=r.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new de(s?"rate-limited":"graphql",o.message)}if(!r.data)throw new de("graphql","Linear returned no data.");return r.data};var He=`
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
`;var Ha=(e)=>`
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
`,$s=`
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
`;var Gs=`
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`;var Hs=`
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
`;var Bs=`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
  }
`,Vs=`
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
`;var Fs=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,JE={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:Ha(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:Fs(["n1","n2"])};var Ur=null,Xs=new Map,js=(e)=>{for(let[t,n]of e)Xs.set(t,n)},Ws=(e,t)=>{let n=Xs.get(t);if(n!==void 0)return n;let r=Ur?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=r.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(r.length+1)},Ks=()=>Ur?.viewer.id??null,zs=(e)=>Ur?.teamsById.get(e)?.issueEstimationType;var qs=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),Ba=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),r=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${r.toFixed(2)}z`},St=({type:e,color:t,size:n=14,fill:r,teamId:o,stateId:s})=>{let i=t||"currentColor",l=pt(()=>Ps(i,qs()),[i,qs()]),_={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return a("svg",{..._,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return a("svg",{..._,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let f=r??(o&&s?Ws(o,s):0.5);return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:Ba(f),fill:l},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}},on=({priority:e,size:t=14})=>{let n={width:t,height:t,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};if(e===1)return a("svg",{...n,children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"2.5",fill:"var(--oc-warning)"},void 0,!1,void 0,this),a("path",{d:"M7 4v3.6M7 9.4v.2",stroke:"var(--oc-bg)","stroke-width":"1.6","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);if(e>=2&&e<=4){let r=5-e;return a("svg",{...n,children:[0,1,2].map((o)=>a("rect",{x:2+o*4,y:9-o*3,width:"2.4",height:3+o*3,rx:"0.6",fill:"currentColor",opacity:o<r?1:0.28},void 0,!1,void 0,this))},void 0,!1,void 0,this)}return a("svg",{...n,children:a("path",{d:"M2.5 7h2M6 7h2M9.5 7h2",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round",opacity:"0.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},et=({name:e,url:t,size:n=18})=>{let r=e.split(/\s+/).filter(Boolean).slice(0,2).map((s)=>s[0].toUpperCase()).join("")||"?",o={width:`${n}px`,height:`${n}px`,fontSize:`${Math.round(n*0.42)}px`};if(t)return a("img",{class:"lin-avatar",src:t,alt:e,style:o},void 0,!1,void 0,this);return a("span",{class:"lin-avatar",style:o,children:r},void 0,!1,void 0,this)},Va={open:"var(--oc-info)",merged:"var(--oc-success)",closed:"var(--oc-muted)",draft:"var(--oc-muted)"},Ys=({status:e,size:t=13})=>a("svg",{width:t,height:t,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("g",{fill:"none",stroke:e?Va[e]:"currentColor","stroke-width":"1.4","stroke-linecap":"round",children:[a("circle",{cx:"3.5",cy:"3",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"3.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"10.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("path",{d:"M3.5 4.6v4.8M10.5 9.4V6.5a2 2 0 0 0-2-2H6.5"},void 0,!1,void 0,this),a("path",{d:"M7.8 3.2 6.3 4.5l1.5 1.3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),Js=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:"currentColor","stroke-width":"1.4"},void 0,!1,void 0,this),a("path",{d:"M5.6 4.6 9.2 7l-3.6 2.4z",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Qs=({done:e,total:t,size:n=13})=>{let o=2*Math.PI*5,s=t?Math.min(1,e/t):0;return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:"var(--oc-border)","stroke-width":"2"},void 0,!1,void 0,this),a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:s>=1?"var(--oc-success)":"var(--oc-info)","stroke-width":"2","stroke-dasharray":`${o*s} ${o}`,transform:"rotate(-90 7 7)","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Zs=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"6",fill:"var(--oc-error)"},void 0,!1,void 0,this),a("path",{d:"M4 7h6",stroke:"var(--oc-bg)","stroke-width":"1.8","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ei=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"3",fill:"none",stroke:"var(--oc-warning)","stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:"M5 10V4.5h4.2l-.9 1.4.9 1.4H5",fill:"var(--oc-warning)",stroke:"var(--oc-warning)","stroke-width":"1","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),sn=({icon:e,color:t,size:n=13})=>{if(e&&/\p{Extended_Pictographic}/u.test(e))return a("span",{class:"lin-project-emoji",style:{fontSize:`${n}px`},"aria-hidden":"true",children:e},void 0,!1,void 0,this);return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("path",{d:"M7 1.2 12.2 4.1v5.8L7 12.8 1.8 9.9V4.1z",fill:t||"var(--oc-muted)"},void 0,!1,void 0,this),a("path",{d:"M4.6 7h4.8M7 4.6v4.8",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round",opacity:"0.85"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var an=({label:e})=>a(re,{children:[a("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this),Nr=2,Fa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.6.6M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.6-.6",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),Xa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7.5",r:"4.7",fill:"none",stroke:"currentColor","stroke-width":"1.3"},void 0,!1,void 0,this),a("path",{d:"M7 5v2.7l1.6 1M5.5 1.8h3",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ja=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2zM2 4.2 7 7l5-2.8M7 7v5.5",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),Wa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"5",cy:"5",r:"2.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M1.5 11.5c.4-2 1.8-3 3.5-3s3.1 1 3.5 3M9.5 3.4a2.2 2.2 0 0 1 0 3.9M10.5 8.8c1 .4 1.7 1.3 2 2.7",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Ka=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M7 4.2V7l2 1.2",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ti=({issue:e,properties:t,subIssues:n,hideProject:r,extras:o})=>{let s=e.labels.nodes,i=e.attachments?.nodes??[],l=i.map(Pr).filter((T)=>T!==null),_=i.filter((T)=>!Pr(T)),f=(e.inRelations?.nodes??[]).filter((T)=>T.type==="blocks").length,p=(e.outRelations?.nodes??[]).filter((T)=>T.type==="blocks").length,h=Qe(e.estimate,zs(e.team.id)),m=e.dueDate?bs(e.dueDate):null,u=t.has("sla")?Is(e.slaBreachesAt):null,S=o?.releases.nodes??[],O=(o?.needs.nodes??[]).map((T)=>T.customer).filter((T)=>T!==null),I=O.reduce((T,U)=>T+(U.revenue??0),0),y=t.has("timeInStatus")?vs(o?.stateHistory.nodes[o.stateHistory.nodes.length-1]?.startedAt):null;return a(Ie,{children:[n&&n.total>0&&a("span",{class:"lin-meta lin-meta-children",title:`${n.done} of ${n.total} sub-issues done`,children:a(re,{children:[a(Qs,{done:n.done,total:n.total},void 0,!1,void 0,this),n.done,"/",n.total]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("labels")&&s.length>0&&a("span",{class:"lin-meta lin-meta-labels",children:[s.slice(0,Nr).map((T)=>a(an,{label:T},T.id,!1,void 0,this)),s.length>Nr&&a(re,{children:["+",s.length-Nr]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),t.has("changes")&&l.length>0&&a("span",{class:"lin-meta lin-meta-change",title:l.map((T)=>`${T.label} ${T.title}`).join(`
`),children:a(re,{children:[a(Ys,{status:l[0].status},void 0,!1,void 0,this),l.length===1?l[0].label:`${l.length} ${l[0].label.startsWith("!")?"MRs":"PRs"}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("links")&&_.length>0&&a("span",{class:"lin-meta lin-meta-links",title:_.map((T)=>T.title).join(`
`),children:a(re,{children:[a(Fa,{},void 0,!1,void 0,this),_.length]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("project")&&!r&&e.project&&a("span",{class:"lin-meta lin-meta-project",title:e.project.name,children:a(re,{children:[a(sn,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:e.project.name},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("milestone")&&e.projectMilestone&&a("span",{class:"lin-meta lin-meta-milestone",title:`Milestone: ${e.projectMilestone.name}`,children:a(re,{children:a("span",{class:"lin-ellipsis",children:e.projectMilestone.name},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("cycle")&&e.cycle&&a("span",{class:"lin-meta lin-meta-cycle",title:`Cycle ${e.cycle.number}${e.cycle.name?`: ${e.cycle.name}`:""}`,children:a(re,{children:[a(Js,{},void 0,!1,void 0,this),e.cycle.number]},void 0,!0,void 0,this)},void 0,!1,void 0,this),f>0&&a("span",{class:"lin-meta lin-meta-blocked",title:`Blocked by ${f} ${f===1?"issue":"issues"}`,children:a(re,{children:[a(Zs,{},void 0,!1,void 0,this),f]},void 0,!0,void 0,this)},void 0,!1,void 0,this),p>0&&a("span",{class:"lin-meta lin-meta-blocking",title:`Blocking ${p} ${p===1?"issue":"issues"}`,children:a(re,{children:[a(ei,{},void 0,!1,void 0,this),p]},void 0,!0,void 0,this)},void 0,!1,void 0,this),u&&a("span",{class:`lin-meta lin-meta-sla ${u.overdue?"lin-overdue":""}`,title:`SLA ${e.slaType??""} breaches ${Oe(e.slaBreachesAt)}`,children:a(re,{children:[a(Xa,{},void 0,!1,void 0,this),u.text]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("release")&&S.length>0&&a("span",{class:"lin-meta lin-meta-release",title:S.map((T)=>`${T.name}${T.version?` ${T.version}`:""}`).join(`
`),children:a(re,{children:[a(ja,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:S[0].version??S[0].name},void 0,!1,void 0,this),S.length>1&&` +${S.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customers")&&O.length>0&&a("span",{class:"lin-meta lin-meta-customers",title:O.map((T)=>T.name).join(`
`),children:a(re,{children:[a(Wa,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:O[0].name},void 0,!1,void 0,this),O.length>1&&` +${O.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customerRevenue")&&I>0&&a("span",{class:"lin-meta lin-meta-revenue",title:"Customer revenue",children:a(re,{children:Cs(I)},void 0,!1,void 0,this)},void 0,!1,void 0,this),y&&a("span",{class:"lin-meta lin-meta-in-status",title:`In ${e.state.name} for ${y}`,children:a(re,{children:[a(Ka,{},void 0,!1,void 0,this),y]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("estimate")&&h&&a("span",{class:"lin-meta lin-meta-estimate",title:"Estimate",children:a(re,{children:h},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("dueDate")&&e.dueDate&&a("span",{class:`lin-meta lin-meta-due sui-small ${m!==null&&m<0?"lin-overdue":"sui-muted"}`,title:"Due date",children:Oe(e.dueDate)},void 0,!1,void 0,this),t.has("creator")&&e.creator&&a("span",{class:"lin-meta lin-meta-creator",title:`Created by ${e.creator.name}`,children:a(et,{name:e.creator.name,url:e.creator.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var za=/^[A-Za-z]{1,7}-\d+$/;var ni=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!za.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()},tt=(e)=>{let t=typeof e==="string"?e:Array.isArray(e)?e.filter((s)=>typeof s==="string").join(","):"",n=[],r=[],o=0;for(let s of t.split(/[,;\s]+/)){if(!s)continue;let i=ni(s);if(!i){if(r.length<3&&!r.includes(s.slice(0,24)))r.push(s.slice(0,24));continue}if(n.includes(i))continue;if(n.length>=25)o+=1;else n.push(i)}return{ids:n,skipped:r,cut:o}},ri=(e,t)=>{if(typeof e!=="string")return"";let n=e.replace(/\s+/g," ").trim();return n.length>t?`${n.slice(0,t-3).trimEnd()}...`:n},oi=(e)=>ri(e,160),si=(e)=>ri(e,400),ii=(e)=>{let t=new Map;for(let n of e){let[r,o]=n.split("-"),s=t.get(r)??[];s.push(Number(o)),t.set(r,s)}return{or:[...t].map(([n,r])=>({and:[{team:{key:{eqIgnoreCase:n}}},{number:{in:r}}]}))}},ai=(e)=>{let t=new Map;for(let r of e){let o=t.get(r.team.id)??[];o.push(r),t.set(r.team.id,o)}let n=new Map;for(let r of t.values())r.sort((o,s)=>o.position-s.position),r.forEach((o,s)=>n.set(o.id,(s+1)/(r.length+1)));return n},ci=(e)=>`${e.identifier} ${e.title}`.slice(0,1900),Lr=(e)=>{let t=e?.trim().split(/\s+/,1)[0];return ni(t)};async function Re(e,t,n,r={}){let o=r.name??"extension",s={};for(let[i,l]of Object.entries(r.query??{}))if(l)s[i]=l;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...r.body!==void 0?{body:JSON.stringify(r.body)}:{}}),l;try{l=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${o} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&l.ok===void 0)return{ok:!1,error:String(l.message??`Error ${i.status}`),code:"failed"};return l}catch(i){let l=i.code;if(l==="NO_SERVICE")return{ok:!1,error:`Approve the ${o} service in Settings > Extensions.`,code:"failed"};if(l==="SERVICE_FAILED")return{ok:!1,error:`The ${o} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${o} service.`,code:"failed"}}}async function be(e,t,n,r={}){try{await e.toast({kind:t,message:n,...r.dismiss?{dismiss:!0}:{}})}catch{}}var Ya=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,li=(e)=>{if(!e)return[];let t=[],n=(o)=>{let s=o?.toUpperCase();if(s&&!t.includes(s))t.push(s)},r=[...e.links??[]].sort((o,s)=>(s.linkedAt??0)-(o.linkedAt??0));for(let o of r)n(o.url.match(Ya)?.[1]);for(let o of e.items??[]){let s=o.data?.identifier;if(typeof s==="string")n(s)}return t};var Ja="plan";var Qa=(e)=>({sessionId:e.id,directory:e.directory,title:e.title,agent:e.agent??null,inWorktree:e.worktree!==null,updatedAt:e.updatedAt}),di=(e,t,n=new Set)=>{let r=t.toUpperCase(),o=(s)=>(s.agent===Ja?0:2)+(s.inWorktree?0:1);return e.filter((s)=>s.archivedAt===null&&s.parentId===null&&(n.has(s.id)||li(s).includes(r))).map(Qa).sort((s,i)=>o(s)-o(i)||i.updatedAt-s.updatedAt)[0]??null};var Za=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,ec=1e5,tc=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),ui=(e,t)=>{let n=tc(t.trim()).trim(),r=n.length>20000?`${n.slice(0,20000).trimEnd()}

[cut]`:n,o=(e??"").replace(Za,"").trimEnd(),s=`---
## Plan

${r}`,i=o?`${o}

${s}`:s;return i.length>ec?null:i},pi=(e,t=6,n=420)=>{let r=e.trim().split(`
`).filter((o)=>o.trim()).slice(0,t).join(`
`);return r.length>n?`${r.slice(0,n).trimEnd()}...`:r};var _i="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var $S=new RegExp("```linear-plan[^\\n]*\\n([\\s\\S]*?)```","g");var nc=(e,t)=>typeof e==="string"?e.replace(/\s+/g," ").trim().slice(0,t):"";var Dr=(e,t)=>{if(e===null||t.length===0)return null;let n=t[0];for(let r of t)if(Math.abs(r-e)<Math.abs(n-e)||Math.abs(r-e)===Math.abs(n-e)&&r>n)n=r;return n},fi=(e,t)=>{if(e.length===0)return'This team does not use estimates: leave "estimate" out.';return`Estimates on this team, written as the number: ${e.map((r)=>{let o=t(r);return o&&o!==String(r)?`${o} = ${r}`:String(r)}).join(", ")}.`},mi=(e,t,n)=>[e.description,`Split out of ${t} by the plan in "${nc(n,120)}". Created by Linear+.`].filter(Boolean).join(`

---

`);var $r=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["sessionId","identifier","directory","sessionTitle","state"].every((n)=>typeof t[n]==="string")&&typeof t.extras==="object"&&t.extras!==null&&Array.isArray(t.extras.issues)};var rc=["No priority","Urgent","High","Medium","Low"],Gr=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${rc[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],n=e.comments.nodes.slice(-5).map((o)=>`${o.user?.name??"Someone"} (${Oe(o.createdAt)}): ${o.body}`),r=[...t,...n.length?["","Latest comments:",...n]:[]].filter((o,s,i)=>o||i[s-1]).join(`
`);return r.length>15000?`${r.slice(0,15000)}
[cut]`:r};var Ei=["triage","backlog","unstarted","started","completed","canceled","duplicate"],Si=(e,t)=>Ei.indexOf(e.type)-Ei.indexOf(t.type)||e.position-t.position;var hi=["No priority","Urgent","High","Medium","Low"];var Ti=(e)=>[...e??[]].sort(Si);var Hr=(e)=>Ti(e).filter((t)=>t.type==="started"||t.type==="unstarted"&&/plan/i.test(t.name)),cn=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=Hr(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return gi(r.filter((o)=>o.type==="started"),n,r)},gi=(e,t,n=e)=>{let r=t?.trim().toLowerCase();return(r?n.find((o)=>o.name.trim().toLowerCase()===r):void 0)??e.find((o)=>/^in progress$/i.test(o.name.trim()))??e.find((o)=>/progress|doing|working|development|started/i.test(o.name))??e.find((o)=>!/block|hold|pause|wait|stuck/i.test(o.name))??e[0]??null},yi=(e)=>/plan/i.test(e.name),xi=(e)=>Ti(e).filter((t)=>t.type==="started"&&!yi(t)),Br=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!yi(e.state))return null;return gi(xi(t),n)},Vr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=Hr(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return r.find((o)=>/plan/i.test(o.name))??cn(e,t,n)},Ai=(e,t,n,r)=>{let o=e==="build"?xi(n):Hr(n),s=e==="build"?Br(t,n,r):e==="plan"?Vr(t,n,r):cn(t,n,r),i=s??o.find((l)=>l.id===t.state.id)??null;return{options:o,target:i,moves:s!==null}},oc={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},sc=(e)=>{let t=e?oc[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]},ln=(e)=>sc({issueEstimationType:e.issueEstimationType??"notUsed",issueEstimationAllowZero:e.issueEstimationAllowZero??!1,issueEstimationExtended:e.issueEstimationExtended??!1}),Oi=(e,t)=>{let n=t.trim().replace(/^refs\/heads\//,"").toLowerCase();if(!n)return null;return e.find((r)=>r.status==="ready"&&r.branch.replace(/^refs\/heads\//,"").toLowerCase()===n)?.directory??null},Fr=(e,t)=>t>0?`${e}-${t+1}`:e;var dn=async(e)=>{try{let t=await w.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},ic=async(e,t)=>{try{return await w.storage.set(e,t),!0}catch{return!1}};var ht=async()=>await dn("pref:start-moves")!==!1;var Ri=async()=>await dn("pref:assign-me")===!0;var un=async()=>await dn("pref:lead-mode")===!0;var Tt=async(e)=>{let t=await dn(`pref:start-state:${e}`);return typeof t==="string"?t:null},gt=(e,t)=>ic(`pref:start-state:${e}`,t);var nt=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof de&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof de&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},ac=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),bi=(e,t)=>Ns((n,r)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&ac(r)&&r.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...r,issues:r.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof r==="object"&&r!==null&&r.id===e){let{team:o,...s}=t;return{...r,...s}}return r}),cc=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new de("graphql","Linear did not save the change.");return e.issueUpdate.issue},je=async(e,t)=>{let n=bi(e.id,t.patch);try{let r=cc(await ue(Hs,{id:e.id,input:t.input}));if(bi(e.id,r),Ls(`issue:${e.identifier}`),"stateId"in t.input)Le("children:");return r}catch(r){throw n(),r}};var ki=async(e)=>{let t=await ue(Vs,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new de("graphql","Linear did not create the issue.");return Le("issues:"),Le("view-issues:"),t.issueCreate.issue};var Ii=async(e,t)=>{let n=await w.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:Gr(e),data:{issueId:e.id,identifier:e.identifier},worktree:t.existing?{kind:"existing",directory:t.existing}:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(n.sessionId===null)return{started:!1,directory:n.directory};let r=t.state??cn(e,e.team.states.nodes),{moved:o,moveError:s}=await Ci(e,r,t.move);return{started:!0,sessionId:n.sessionId,target:r,moved:o,moveError:s}},Ci=async(e,t,n)=>{let r=!1,o=null;if(n&&t)try{await je(e,{input:{stateId:t.id},patch:{state:t}}),r=!0}catch(s){o=nt(s)}return{moved:r,moveError:o}},vi=async(e,t)=>{let n=t.lead??await un().catch(()=>!1),r=t.existing??null,o=n?t.existingSession??null:null;if(!r){let f=await w.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",data:{issueId:e.id,identifier:e.identifier},worktree:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(f.sessionId===null)return{started:!1,directory:f.directory};if(r=f.worktree?.directory??f.directory??t.directoryHint??null,!r)return{started:!1,directory:"",error:"The host did not say which folder the session is in."};if(n)o=f.sessionId}let s;try{let f=fi(ln(e.team),(p)=>Qe(p,e.team.issueEstimationType));s=(await Mi({identifier:e.identifier,directory:r,issueTitle:e.title,context:Gr(e),scale:f,...t.model?{model:t.model}:{},...n?{lead:o??!0,leadTitle:`${e.identifier} ${e.title}`}:{}})).sessionId}catch(f){return{started:!1,directory:r,error:f instanceof Error?f.message:String(f),...o?{session:o}:{}}}let i=t.state??Vr(e,e.team.states.nodes),{moved:l,moveError:_}=await Ci(e,i,t.move);return{started:!0,sessionId:s,target:i,moved:l,moveError:_}},Xr=(e)=>e.replace(/\/+$/,""),jr=async(e)=>{if(!e)return null;try{let t=Xr(e),n=(await w.listProjects())?.projects??[],r=n.find((o)=>Xr(o.directory)===t);if(r)return r;for(let o of n)if(((await w.listWorktrees(o.id))?.worktrees??[]).some((i)=>Xr(i.directory)===t))return o}catch{}return null},wi=async(e,t)=>{try{let n=await jr(e);if(!n)return null;return Oi((await w.listWorktrees(n.id))?.worktrees??[],t)}catch{return null}},pn=async(e)=>{try{await w.openSession(e)}catch{}};var Pi=async(e,t)=>{let n=await lc(t);try{let o=await jr(e);if(o){let s=await w.listSessions(o.id),i=di(s?.sessions??[],t,new Set(n.map((l)=>l.sessionId)));if(i)return i}}catch{}let r=n[0];return r?{sessionId:r.sessionId,directory:r.sessionDirectory,title:r.title,agent:"plan",inWorktree:!0,updatedAt:r.createdAt}:null},lc=async(e)=>{let t=await Re(w,"GET","/plans",{query:{identifier:e},name:"Linear+"}),n=t.ok===!1?[]:t.sessions;if(!Array.isArray(n))return[];return n.map((r)=>r).filter((r)=>typeof r.sessionId==="string"&&typeof r.createdAt==="number").map((r)=>({sessionId:r.sessionId,sessionDirectory:typeof r.sessionDirectory==="string"?r.sessionDirectory:typeof r.directory==="string"?r.directory:"",title:typeof r.title==="string"?r.title:`${e} plan`,createdAt:r.createdAt})).filter((r)=>r.sessionDirectory.startsWith("/"))};var Ui=async(e)=>{let t=await Re(w,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{},...e.model?{model:e.model}:{}},name:"Linear+"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear+ service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},_n=async(e)=>{let t=await Re(w,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier},name:"Linear+"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear+ service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1,lead:t.lead===!0}},Mi=async(e)=>{let{model:t,...n}=e,r=await Re(w,"POST","/plan",{body:t?{...n,model:t}:n,name:"Linear+"});if(r.ok===!1||typeof r.sessionId!=="string")throw Error(r.error??"The Linear+ service did not start the plan.");return{sessionId:r.sessionId,directory:typeof r.directory==="string"?r.directory:e.directory}};var Ni=async(e)=>{let t=await Re(w,"GET","/extras",{query:{sessionId:e},name:"Linear+"});return t.ok!==!1&&$r(t.extras)?t.extras:null},fn=async(e)=>{let t=await Re(w,"POST","/handoffs",{body:e,name:"Linear+"});if(t.ok===!1)return null;if(e.action==="claim-extras"&&t.claimed!==!0)return null;return $r(t.state)?t.state:null};var pe=(e,t="inline-flex")=>(n)=>{let r=Rs(e,n);return a("span",{ref:r,style:{display:t}},void 0,!1,void 0,this)},Te=pe(Pe),mn=pe(en),bh=pe(gr,"block"),kh=pe(yr,"block"),Ih=pe(Ar),Ch=pe(vr),vh=pe(Or),rt=pe(kr),ge=pe(Ir,"block"),Li=pe(br,"block"),wh=pe(Cr,"block"),Mh=pe(Rr,"block"),Ph=pe(xr),ot=pe(tn),Uh=pe(tn,"block"),Nh=pe(en,"block");var Di=(e)=>typeof e==="object"&&e!==null&&typeof e.agent==="string"&&(e.model===void 0||typeof e.model==="string"),$i=(e)=>typeof e==="object"&&e!==null&&typeof e.id==="string"&&typeof e.label==="string",Gi=(e)=>{if(!e||e.ok===!1||!Array.isArray(e.agents)||!Array.isArray(e.models))return null;return{agents:e.agents.filter($i),models:e.models.filter($i),defaultModel:typeof e.defaultModel==="string"?e.defaultModel:null,...Di(e.current?.plan)&&Di(e.current?.build)?{current:e.current}:{}}},En="__default";var Hi=(e,t)=>{let n=e.current?.[t].model;if(n)return e.models.find((o)=>o.id===n)?.label??n;let r=e.defaultModel?e.models.find((o)=>o.id===e.defaultModel)?.label??e.defaultModel:null;return r?`${r} (default)`:"the default model"};var Bi=async(e)=>Gi(await Re(w,"GET","/choices",{query:{directory:e},name:"Linear+"}));var Sn=({role:e,directory:t,value:n,onChange:r,disabled:o})=>{let s=Et(`start-choices:${t??""}`,()=>Bi(t));if(!s.data)return null;let i=[{id:En,label:`From Settings: ${Hi(s.data,e)}`},...s.data.models];return a("div",{class:"lin-model-pick",children:a(mn,{label:e==="plan"?"Plan model":"Build model",value:n||En,options:i,searchable:!0,searchPlaceholder:"Search models",disabled:o,onChange:(l)=>r(l===En?"":l)},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var hn=(e,t,n,r)=>{let o=pt(()=>t?Ai(e,t,t.team.states.nodes,n):null,[e,t,n]),[s,i]=v(null),[l,_]=v(null),f=o?.options??[],p=f.find((u)=>u.id===s)??o?.target??null,h=l??Boolean(o?.moves&&r),m=Boolean(t&&p&&h&&p.id!==t.state.id);return{options:f,selected:p,move:m,select:(u)=>{if(i(u),t&&u!==t.state.id)_(!0)},toggle:_}},Tn=({choice:e,disabled:t})=>a("div",{class:"lin-move-row",children:[a(ot,{label:"Move the issue to",checked:e.move,disabled:t||e.options.length===0,onChange:e.toggle},void 0,!1,void 0,this),e.options.length>0&&a(mn,{value:e.selected?.id??null,options:e.options.map((n)=>({id:n.id,label:n.name})),disabled:t,onChange:e.select},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Wr=new Set,Vi=async(e,t)=>{if(Wr.has(e.sessionId))return null;Wr.add(e.sessionId);try{let n=await fn({sessionId:e.sessionId,action:"claim-extras"});if(!n)return null;let r=n.estimateDone===!0,o=n.estimateSet??null,s=[...n.created??[]],i=(l)=>String(l);try{let l=(await ue(He,{id:n.identifier})).issue,_=ln(l.team);if(i=(h)=>Qe(h,l.team.issueEstimationType)??String(h),!r){let h=l.estimate===null?Dr(n.extras.estimate,_):null;if(h!==null)await je(l,{input:{estimate:h},patch:{estimate:h}}),o=h;r=!0}let f=t&&await Ri().catch(()=>!1)?t:null;for(let h of n.extras.issues.slice(s.length)){let m=Dr(h.estimate,_),u=await ki({teamId:l.team.id,title:h.title,description:mi(h,l.identifier,n.sessionTitle),...l.project?{projectId:l.project.id}:{},...m!==null?{estimate:m}:{},...f?{assigneeId:f}:{}});s.push(u.identifier),await ue(Bs,{input:{issueId:u.id,relatedIssueId:l.id,type:"related"}})}return{state:await fn({sessionId:n.sessionId,action:"extras-done",estimateDone:r,estimateSet:o,created:s})??{...n,state:"done",estimateDone:r,estimateSet:o,created:s},label:i}}catch(l){let _=nt(l);return{state:await fn({sessionId:n.sessionId,action:"extras-failed",estimateDone:r,estimateSet:o,created:s,error:_})??{...n,state:"failed",estimateDone:r,estimateSet:o,created:s,error:_},label:i}}}finally{Wr.delete(e.sessionId)}};var Kr=async(e,t,n=!1)=>{let{plan:r,isPlan:o}=await _n({source:t,identifier:e.identifier});if(!o&&!n)throw Error(_i);let s=(await ue(He,{id:e.identifier})).issue,i=ui(s.description,r);if(i===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);await je(s,{input:{description:i},patch:{description:i}})};var Fi=async(e,t,n)=>{let r=!1;if(n.post)await Kr(e,t,n.force),r=!0;let o=await Ni(t.sessionId).catch(()=>null);if(o&&(o.state==="pending"||o.state==="claimed"))await Vi(o,Ks()).catch(()=>null);let s=await Ui({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force,...n.model?{model:n.model}:{}}),i=n.state??Br(e,e.team.states.nodes,n.lastState),l=!1,_=null;if(n.move&&i)try{await je(e,{input:{stateId:i.id},patch:{state:i}}),l=!0}catch(f){_=nt(f)}return{sessionId:s.sessionId,target:i,moved:l,moveError:_,posted:r}};var gn=(e)=>e instanceof Error?e.message:String(e),dc=(e)=>e.replace(/\/+$/,"").split("/").pop()||e,Xi=({identifier:e,source:t,detail:n,onClose:r,onDone:o,fill:s})=>{let[i,l]=v(n??null),[_,f]=v(null),[p,h]=v(!0),[m,u]=v(null),[S,O]=v(!1),[I,y]=v(null),[T,U]=v(null),[R,se]=v(null),[ie,oe]=v(null),[B,ae]=v(!1),[z,V]=v(!1),[E,g]=v(!1),ce=hn("build",i,m,p),[Ee,ye]=v("");if(le(()=>{let P=!0;return se(null),oe(null),_n({source:t,identifier:e}).then((ee)=>{if(P)se(ee),ae(ee.postPlan)},(ee)=>{if(P)oe(gn(ee))}),()=>{P=!1}},[e,t.sessionId]),le(()=>{let P=!0;return Promise.all([n?Promise.resolve(n):ue(He,{id:e}).then((ee)=>ee.issue),ht().catch(()=>!0)]).then(([ee,C])=>{if(!P)return;l(ee),h(C),Tt(ee.team.id).then((_e)=>{if(P)u(_e)},()=>{return})},(ee)=>{if(P)f(gn(ee))}),()=>{P=!1}},[e,n]),T)return a("div",{class:"lin-build","data-state":"started",children:a("div",{class:"sui-small",children:T},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(_)return a(ge,{tone:"error",title:"Could not read the issue",body:_,action:{label:"Close",onClick:r}},void 0,!1,void 0,this);if(!i)return a(rt,{label:"Reading the issue"},void 0,!1,void 0,this);let We=async()=>{O(!0),y(null);try{await Kr(i,t,E),Le("issue"),await be(w,"success",`Added the plan to ${i.identifier}.`),V(!0)}catch(P){y(gn(P))}finally{O(!1)}},ke=async()=>{O(!0),y(null);try{let P=await Fi(i,t,{move:ce.move,post:B&&Boolean(R),force:E,state:ce.selected,lastState:m,...Ee?{model:Ee}:{}});if(P.moved&&P.target)gt(i.team.id,P.target.name).catch(()=>{return});if(P.moveError)await be(w,"error",`Build started, but ${i.identifier} was not moved: ${P.moveError}`);let ee=`${P.posted?"Added the plan to the issue and started":"Started"} a build for ${i.identifier}${P.moved?` and moved it to ${P.target.name}`:""}.`;if(await be(w,"success",ee),U(ee),P.moved)Le("block:");await pn(P.sessionId),o?.()}catch(P){y(gn(P))}finally{O(!1)}};return a("div",{class:s?"lin-build lin-build--fill":"lin-build","data-state":"options",children:[a("div",{class:"sui-small",children:["Builds from the last reply in ",a("strong",{children:t.title},void 0,!1,void 0,this),t.agent?` (${t.agent} agent)`:"",", in ",dc(t.directory),", ",R?.lead?"as a session that lead starts under it":"as a new session",". It uses the build agent from Settings, on the model below."]},void 0,!0,void 0,this),ie&&a(ge,{tone:"warning",title:"The plan cannot be read yet",body:ie},void 0,!1,void 0,this),R&&!R.isPlan&&a(ge,{tone:"warning",title:"The last reply is not a plan",body:'Ask the planning session: "Repeat the final plan in full, unchanged, as your last message. No question cards." Then reopen this. Writing or building from a chat answer would put the wrong text in the issue and the build.',action:E?void 0:{label:"Use it anyway",onClick:()=>g(!0)}},void 0,!1,void 0,this),R?.earlier&&a("div",{class:"sui-muted sui-small",children:"The last reply in that session is not the plan, so this is the latest reply that was."},void 0,!1,void 0,this),R&&a("pre",{class:"lin-build-plan",children:s?R.plan.trim():pi(R.plan)},void 0,!1,void 0,this),I&&a(ge,{tone:"error",title:"Could not start the build",body:I},void 0,!1,void 0,this),a(ot,{label:"Add the plan to the issue description first",description:B?`A plan section at the end of ${i.identifier}'s description, replaced if one is already there. Then the build starts.`:void 0,checked:B&&Boolean(R),disabled:!R||S,onChange:ae},void 0,!1,void 0,this),a(Tn,{choice:ce,disabled:S},void 0,!1,void 0,this),a(Sn,{role:"build",directory:t.directory,value:Ee,onChange:ye,disabled:S},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(Te,{label:S?"Starting...":B&&R?"Add plan and build":"Start build",size:"sm",disabled:S||!R||!R.isPlan&&!E,onClick:()=>{ke()}},void 0,!1,void 0,this),a(Te,{label:z?"Plan added":"Add plan only",variant:"outline",size:"sm",disabled:S||!R||!R.isPlan&&!E,onClick:()=>{We()}},void 0,!1,void 0,this),a(Te,{label:"Cancel",variant:"ghost",size:"sm",disabled:S,onClick:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},ji=(e,t)=>{let[n,r]=v(null);return le(()=>{let o=!0;if(r(null),!e)return;return Pi(e,t).then((s)=>{if(o)r(s)}),()=>{o=!1}},[e,t]),n};var uc=async(e)=>{let t=await ue($s,{filter:ii(e)}),n=new Map;for(let o of t.issues.nodes)n.set(o.identifier.toUpperCase(),o);let r=[...new Set(t.issues.nodes.filter((o)=>o.state.type==="started").map((o)=>o.team.id))];if(r.length>0)try{js(ai((await ue(Gs,{teamIds:r})).workflowStates.nodes))}catch{}return n},Wi=(e)=>Et(e.length>0?`block:${e.join(",")}`:null,()=>uc(e));var st=({ids:e,children:t})=>{let n=Wi(e);if(n.data)return a(Ie,{children:t(n.data)},void 0,!1,void 0,this);if(n.error){let r=n.error instanceof de?n.error:new de("network",String(n.error));if(r.kind==="disconnected")return a(Li,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber to see these issues.",action:{label:"Connect Linear",onClick:()=>{w.oauthStart()}}},void 0,!1,void 0,this);return a(ge,{tone:"error",title:"Could not load from Linear",body:r.message,action:{label:"Retry",onClick:()=>n.refresh()}},void 0,!1,void 0,this)}return a("div",{class:"lin-block-wait",children:a(rt,{label:"Loading from Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},yt=({skipped:e,cut:t})=>{if(e.length===0&&t===0)return null;let n=[e.length>0?`Not an issue key: ${e.join(", ")}.`:"",t>0?`${t} more not shown.`:""].filter(Boolean);return a("div",{class:"sui-small sui-muted",children:n.join(" ")},void 0,!1,void 0,this)},it=({id:e})=>a("div",{class:"lin-block-missing sui-small sui-muted",children:[a("span",{class:"sui-mono",children:e},void 0,!1,void 0,this),a("span",{children:"Not found in Linear, or you cannot see it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var zr=(e)=>e instanceof Error?e.message:String(e),Ki=({issue:e,plan:t,onClose:n})=>{let r=t?"plan":"session",[o,s]=v(null),[i,l]=v(null),[_,f]=v(!0),[p,h]=v(!0),[m,u]=v(!1),[S,O]=v(null),[I,y]=v(null),[T,U]=v(null),[R,se]=v(null),[ie,oe]=v(null),[B,ae]=v(0),[z,V]=v(null),[E,g]=v(null),ce=Je()?.directory??null,Ee=hn(t?"plan":"session",o,z,p),[ye,We]=v("");if(le(()=>{let C=!0;return s(null),l(null),Promise.all([ue(He,{id:e.identifier}),ht().catch(()=>!0),Tt(e.team.id).catch(()=>null),un().catch(()=>!1)]).then(([_e,te,F,q])=>{if(!C)return;s(_e.issue),h(te),V(F),U(q),wi(ce,_e.issue.branchName).then((at)=>{if(C)se(at)})},(_e)=>{if(C)l(zr(_e))}),()=>{C=!1}},[e.identifier]),E)return a("div",{class:"lin-block-start","data-state":"started",children:a("div",{class:"sui-small",children:E},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(i)return a("div",{class:"lin-block-start",children:a(ge,{tone:"error",title:"Could not read the issue",body:i,action:{label:"Close",onClick:n}},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(!o)return a("div",{class:"lin-block-start",children:a(rt,{label:"Reading the issue"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let ke=S??R,P=Fr(o.branchName,B),ee=async()=>{u(!0),oe(null);try{let C=await(t?vi:Ii)(o,{worktree:_,move:Ee.move,existing:ke,branch:P,state:Ee.selected,directoryHint:ce,...t&&ye?{model:ye}:{},...t&&T!==null?{lead:T,existingSession:I}:{}});if(!C.started){O(C.directory),y(C.session??null),oe(C.error??null);return}if(C.moveError)await be(w,"error",`The ${r} started, but ${o.identifier} was not moved: ${C.moveError}`);if(!t&&C.moved&&C.target)gt(o.team.id,C.target.name).catch(()=>{return});let _e=`Started a ${r} for ${o.identifier}${C.moved?` and moved it to ${C.target.name}`:""}.`;if(await be(w,"success",_e),g(_e),C.moved)Le("block:");await pn(C.sessionId)}catch(C){let _e=_&&!ke;if(_e)ae((F)=>F+1);let te=_e?` A branch named ${P} may already exist. Start again to try ${Fr(o.branchName,B+1)}, or turn off "Work in a new worktree".`:"";oe(`${zr(C).replace(/\.+$/,"")}.${te}`),await be(w,"error",`Could not start a ${r}: ${zr(C)}`)}finally{u(!1)}};return a("div",{class:"lin-block-start","data-state":"options",children:[S&&a(ge,{tone:"warning",title:`The worktree is ready, but the ${r} did not start`,body:`Retry starts the ${r} in ${S}.`},void 0,!1,void 0,this),!S&&R&&a(ge,{tone:"info",title:"This issue already has a worktree",body:`The session starts in ${R}, on branch ${o.branchName}.`},void 0,!1,void 0,this),t&&!S&&a("div",{class:"sui-muted sui-small",children:T?"Makes the worktree with one lead session. The lead starts the plan as a session nested under it, with the plan agent from Settings on the model below, and later the build the same way. The plan changes no files.":"Makes the worktree, then starts a planning session in it with the plan agent from Settings, on the model below. It plans and stops: it changes no files."},void 0,!1,void 0,this),ie&&a(ge,{tone:"error",title:`Could not start a ${r}`,body:ie},void 0,!1,void 0,this),a(ot,{label:ke?"Work in the existing worktree":"Work in a new worktree",description:`Branch ${P}`,checked:_||Boolean(ke),disabled:Boolean(ke)||m,onChange:f},void 0,!1,void 0,this),a(Tn,{choice:Ee,disabled:m},void 0,!1,void 0,this),t&&a(Sn,{role:"plan",directory:ce,value:ye,onChange:We,disabled:m},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(Te,{label:m?"Starting...":S?"Retry in that worktree":R?"Start in that worktree":t?"Start plan":"Start session",size:"sm",disabled:m,onClick:()=>{ee()}},void 0,!1,void 0,this),a(Te,{label:"Cancel",variant:"ghost",size:"sm",disabled:m,onClick:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var pc=({issue:e})=>{let[t,n]=v(null),r=ji(Je()?.directory??null,e.identifier),o=e.labels.nodes;return a(As,{class:"lin-block-card",children:[a("div",{class:"lin-block-title",children:[a(St,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:16},void 0,!1,void 0,this),a("span",{class:"lin-block-key sui-mono sui-muted",children:e.identifier},void 0,!1,void 0,this),a("span",{class:"lin-block-name",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),a(Os,{items:[["Status",a("span",{class:"lin-block-value",children:[a(St,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this),e.state.name]},void 0,!0,void 0,this)],["Priority",a("span",{class:"lin-block-value",children:[a(on,{priority:e.priority},void 0,!1,void 0,this),hi[e.priority]]},void 0,!0,void 0,this)],["Assignee",e.assignee?a("span",{class:"lin-block-value",children:[a(et,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this),e.assignee.name]},void 0,!0,void 0,this):a("span",{class:"sui-muted",children:"Unassigned"},void 0,!1,void 0,this)],...e.project?[["Project",a("span",{class:"lin-block-value",children:[a(sn,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),e.project.name]},void 0,!0,void 0,this)]]:[],...o.length>0?[["Labels",a("span",{class:"lin-block-value lin-block-chips",children:o.map((s)=>a(an,{label:s},s.id,!1,void 0,this))},void 0,!1,void 0,this)]]:[],...e.dueDate?[["Due",a(re,{children:Oe(e.dueDate)},void 0,!1,void 0,this)]]:[],["Updated",a("span",{class:"sui-muted",children:ks(e.updatedAt)},void 0,!1,void 0,this)]]},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(Te,{label:"Open in Linear",variant:"outline",size:"sm",onClick:()=>{w.openUrl(e.url)}},void 0,!1,void 0,this),a(Te,{label:"Start plan",variant:"outline",size:"sm",disabled:t==="plan",onClick:()=>n("plan")},void 0,!1,void 0,this),a(Te,{label:"Start session",variant:"outline",size:"sm",disabled:t==="session",onClick:()=>n("session")},void 0,!1,void 0,this),r&&a(Te,{label:"Start build",variant:"outline",size:"sm",disabled:t==="build",onClick:()=>n("build")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),(t==="session"||t==="plan")&&a(Ki,{issue:e,plan:t==="plan",onClose:()=>n(null)},void 0,!1,void 0,this),t==="build"&&r&&a("div",{class:"lin-block-start",children:a(Xi,{identifier:e.identifier,source:r,onClose:()=>n(null)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},zi=({args:e})=>{let{ids:t}=tt(e.id),n=t[0];if(!n)return a("div",{class:"sui-muted",children:"LinearIssue needs an issue identifier such as ENG-123."},void 0,!1,void 0,this);return a(st,{ids:[n],children:(r)=>{let o=r.get(n);return o?a(pc,{issue:o},void 0,!1,void 0,this):a(it,{id:n},void 0,!1,void 0,this)}},void 0,!1,void 0,this)};var _c=new Set(["id","status","assignee","priority","project","dueDate","cycle","estimate","labels","links","created","changes"]),yn=({issue:e,selected:t,cursor:n,properties:r=_c,hideProject:o,compact:s,subIssues:i,extras:l,depth:_=0,disabled:f,onOpen:p})=>a("button",{type:"button",class:"lin-issue-row","aria-selected":t?"true":"false",disabled:f,"data-cursor":n?"true":"false","data-issue":e.identifier,"data-depth":_||void 0,style:_?{paddingLeft:`${8+_*22}px`}:void 0,onClick:()=>p(e),title:e.title,children:[r.has("priority")||s?a(on,{priority:e.priority},void 0,!1,void 0,this):null,r.has("id")||s?a("span",{class:"lin-issue-key sui-mono",children:e.identifier},void 0,!1,void 0,this):null,r.has("status")||s?a(St,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this):null,a("span",{class:"lin-issue-title",children:e.title},void 0,!1,void 0,this),!s&&a("span",{class:"lin-issue-meta",children:a(ti,{issue:e,properties:r,subIssues:i,hideProject:o,extras:l},void 0,!1,void 0,this)},void 0,!1,void 0,this),(r.has("assignee")||s)&&(e.assignee?a("span",{class:"lin-meta-assignee",title:e.assignee.name,children:a(et,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this):a("span",{class:"lin-avatar-empty","aria-label":"No assignee"},void 0,!1,void 0,this)),!s&&r.has("created")&&a("span",{class:"lin-meta-created sui-small sui-muted",title:"Created",children:Oe(e.createdAt)},void 0,!1,void 0,this),!s&&r.has("updated")&&a("span",{class:"lin-meta-updated sui-small sui-muted",title:"Updated",children:Oe(e.updatedAt)},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var qr=new Set(["id","status","assignee","priority","labels","dueDate"]),qi=({args:e})=>{let{ids:t,skipped:n,cut:r}=tt(e.ids),o=oi(e.title);if(t.length===0)return a(ft,{title:o||void 0,children:[a("div",{class:"sui-muted",children:"No issue identifiers to show."},void 0,!1,void 0,this),a(yt,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return a(ft,{title:o||void 0,children:[a(st,{ids:t,children:(s)=>a("div",{class:"lin-groups lin-block-rows",children:t.map((i)=>{let l=s.get(i);return l?a(yn,{issue:l,properties:qr,onOpen:(_)=>{w.openUrl(_.url)}},i,!1,void 0,this):a(it,{id:i},i,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(yt,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Yi=({args:e,answered:t})=>{let{ids:n,skipped:r,cut:o}=tt(e.ids),s=si(e.question),[i,l]=v(null),[_,f]=v(!1),p=t??i,h=Lr(t)??i,m=async(u)=>{if(_||p)return;f(!0);try{await w.answerBlock(ci(u)),l(u.identifier)}catch(S){await be(w,"error",`Could not send your choice: ${S instanceof Error?S.message:String(S)}`)}finally{f(!1)}};return a(ft,{title:s||"Pick an issue",children:[n.length===0?a("div",{class:"sui-muted",children:"No issues to choose from."},void 0,!1,void 0,this):a(st,{ids:n,children:(u)=>a("div",{class:"lin-groups lin-block-rows","data-answered":p?"true":"false",children:n.map((S)=>{let O=u.get(S);return O?a(yn,{issue:O,properties:qr,selected:h===S,disabled:Boolean(p)||_,onOpen:(I)=>{m(I)}},S,!1,void 0,this):a(it,{id:S},S,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(yt,{skipped:r,cut:o},void 0,!1,void 0,this),p?a("div",{class:"sui-small sui-muted","data-state":"answered",children:t?`${Lr(t)?"You chose":"You answered"}: ${t}`:`You chose ${i}.`},void 0,!1,void 0,this):n.length>0&&a("div",{class:"sui-small sui-muted",children:"Click an issue to choose it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var fc=({call:e})=>{switch(e.name){case"LinearIssue":return a(zi,{args:e.args},void 0,!1,void 0,this);case"LinearIssueList":return a(qi,{args:e.args},void 0,!1,void 0,this);case"LinearPickIssue":return a(Yi,{args:e.args,answered:e.answered},void 0,!1,void 0,this);default:return a("div",{class:"sui-muted",children:["The Linear+ extension has no block called ",e.name.slice(0,40),"."]},void 0,!0,void 0,this)}},mc=()=>{Je();let[e,t]=v(null),n=Ge(null);return le(()=>w.onBlock(t),[]),le(()=>{let r=n.current;if(!r)return;let o=0,s=new ResizeObserver(()=>{let i=Math.min(Math.ceil(r.getBoundingClientRect().height),kt);if(i===o)return;o=i,w.setHeight(i).catch(()=>{return})});return s.observe(r),()=>s.disconnect()},[]),a("div",{class:"lin-block",ref:n,style:{maxHeight:kt},children:e?a(fc,{call:e},`${e.name}:${JSON.stringify(e.args)}`,!1,void 0,this):a("div",{class:"sui-muted",children:"Waiting for the agent"},void 0,!1,void 0,this)},void 0,!1,void 0,this)};Jo(a(mc,{},void 0,!1,void 0,this),document.getElementById("root"));})();

(()=>{var C="openchamber.sdk",v=1;var Qt=`
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
`;function Zt(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let r=new WeakMap;e.addEventListener("scroll",(n)=>{let o=n.target===e?t:n.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=r.get(o);if(s!==void 0)clearTimeout(s);r.set(o,setTimeout(()=>{r.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var ni=`(${Zt.toString()})(document);`;var er=128,tr=65536;var ct=128;var lt=65536;var Mn=/^[a-z][a-z0-9-]{0,39}$/;var Cn=(e)=>Object(e)===e&&!Array.isArray(e),rr=(e,t)=>Object.keys(e).every((r)=>t.includes(r)),vn=(e)=>String(e)===e&&e.length>=1&&e.length<=60,wn=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Un=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let r of e){if(!Cn(r)||!Mn.test(r.id)||!vn(r.label))return!1;if(r.disabled!==void 0&&r.disabled!==!0&&r.disabled!==!1)return!1;if(t.has(r.id))return!1;if(t.add(r.id),r.kind==="button"){if(!rr(r,["kind","id","label","disabled"]))return!1;continue}if(r.kind!=="select"||!rr(r,["kind","id","label","value","options","disabled"]))return!1;if(!wn(r.value)||!Array.isArray(r.options)||r.options.length<1||r.options.length>16)return!1;let n=new Set;for(let o of r.options){if(!Cn(o)||!rr(o,["value","label"])||!wn(o.value)||!vn(o.label)||n.has(o.value))return!1;n.add(o.value)}if(!n.has(r.value))return!1}return!0};var Nn=["{id}","{segment}","{segments+}"];var ya=new Set(Nn);var dt=960;var Pn=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Aa=new Set(Pn);var ut=20000000,pt=256;var nr=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Ln=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let r=0;r<e.bytes.byteLength;r+=1)if(e.bytes[r]!==t.bytes[r])return!1;return!0};var Dn=/^[A-Za-z0-9_-]{1,80}$/;var $n=["left","right","top","bottom"];var Gn=(e,t=0,r={remaining:16000})=>{if(--r.remaining<0||t>=32)return!1;if(e===null)return!0;let n=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of n)if(!Gn(o,t+1,r))return!1;return!0},or=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(or);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(or)}return String(e)===e||Number.isFinite(e)},sr=(e)=>{try{if(String(e.id)!==e.id||!Dn.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!$n.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!Gn(e.data)||!or(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var ar=2000;var Vn=["file","directory","other","missing"],cr=(e)=>Boolean(e&&"sessionId"in e),lr=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Bn=/^[0-9a-f]{7,64}$/i,dr=(e)=>Bn.test(e),_t=500,ft=32000,Xn=16000,Fn=128,jn=200,Kn=2000,Wn=16000,zn=80,Yn=200,Jn=16000;var qn=2000;var ur=20000,Et=1024,mt=2000000;var St=64000,Tt=8000,pr=4000;var _r=960000;var Qn=999,Zn=1e4,Ye=500,eo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],to=["stopped","starting","ready","failed"],si=new Set(eo),ro=(e)=>si.has(e),no=(e)=>e&&ro(e)?e:"HOST_REJECTED",Ge=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Ge);if(Object(e)===e)return Object.values(e).every(Ge);return!1},oo=(e)=>Ge(e)&&JSON.stringify(e).length<=Jn,Hn=(e)=>e?.trim().slice(0,Yn)??"",He=(e)=>{let t=e.id.trim().slice(0,Fn),r=e.title.trim().slice(0,jn),n=e.url.trim().slice(0,Kn),o=e.text?.trim().slice(0,Wn),s=e.author?.trim().slice(0,zn),a=e.kind==="pull"?"pull":"issue",l={providerId:e.providerId.trim(),id:t,title:r||t,url:n,kind:a};if(o)l.text=o;if(s)l.author=s;if(a==="pull"){let _=Hn(e.branches?.head),f=Hn(e.branches?.base);if(_&&f)l.branches={head:_,base:f}}if(oo(e.data))l.data=e.data;return l},fr=(e)=>{let t=He(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Er=(e)=>{let t={text:e.text.trim().slice(0,Xn)};if(e.send)t.send=!0;return t},mr=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Qn,Math.max(0,Math.round(e)))},Sr=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Zn,Math.max(0,Math.ceil(e)))};var Ve=(e)=>e.length>0&&e.length<=Et&&!e.includes("\x00")&&!e.includes("\\");var ht=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>qn)return!1;return!e.split("/").some((r)=>r==="."||r==="..")},ii=new Set(to),Tr=(e)=>Boolean(e&&"status"in e&&ii.has(String(e.status))&&!("body"in e)),gt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),hr=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),gr=(e)=>Boolean(e&&"written"in e&&e.written===!0),yr=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),ai=new Set(Vn),Or=(e)=>Boolean(e&&"kind"in e&&"size"in e&&ai.has(String(e.kind))&&Number.isFinite(e.size)),Ar=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),ci=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),li=(e)=>Object(e)===e?e:null,ir=(e)=>String(e)===e&&e.length>0,di=(e)=>{if(!ir(e.id))return null;if(e.ok===!0){let t={channel:C,v,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&ir(e.error))return{channel:C,v,type:"result",id:e.id,ok:!1,error:e.error,code:no(ir(e.code)?e.code:void 0)};return null},Rr=(e)=>{let t=li(e);if(!t||t.channel!==C||t.v!==v)return null;if(t.type==="result")return di(t);if(!ci.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var so=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ui=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class x extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var io=()=>Promise.reject(new x("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),yt=()=>Promise.reject(new x("BAD_PATH",`File path must be 1 to ${Et} characters without NUL or backslash.`)),Ot=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new x("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},I=(e)=>(e.value+=1,`oc-${e.value}`),xr=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new x("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let r=e.acceptSource??((i)=>i===t.parent),n=e.requestTimeoutMs??ur,o=new Set,s=new Set,a=new Set,l=new Set,_=new Set,f=new Set,p=new Set,g=new Set,m=new Set,u=new Set,h=new Set,k=new Set,b=[],y=null,T=null,w=new Set,M=new Set,ie=null,de=null,ue=!1,Y=new Map,ae=new Map,J=new Map,G=!1,E={value:0},S=null,pe=null,we=!1,U=!1,_e=null,$e=(i)=>{if(!i)return null;return{sessionId:i.id,phase:i.busy?"started":"completed"}},re=(i)=>{t.parent.postMessage(i,"*")},ot=()=>{if(G||t.parent===t||k.size===0||S?.features?.lateGenerateResults!==!0)return;re({channel:C,v,type:"generate-late-listen"})},j=(i,d)=>{for(let A of i)try{A(d)}catch(R){console.error(R)}},gn=(i)=>{if(!(i instanceof MessageEvent))return;if(!r(i.source))return;let d=Rr(i.data);if(!d)return;if(d.type==="workspace"){let R=ae.get(d.payload.subscriptionId);if(R)j([R],d.payload.snapshot);return}if(d.type==="shells"){let R=J.get(d.payload.subscriptionId);if(R)j([R],d.payload.snapshot);return}if(d.type==="ready"){if(S=d.payload,pe=$e(d.payload.session),j(o,d.payload),j(s,d.payload.directory),j(a,d.payload.session),pe)j(l,pe);if(j(_,d.payload.connection),j(f,d.payload.settings),j(p,d.payload.item),d.payload.block)j(g,d.payload.block);ot();return}if(d.type==="service-event"){j(m,d.payload);return}if(d.type==="generate-late"){if(k.size===0)b.push(d.payload);else j(k,d.payload);return}if(d.type==="directory"){if(S)S={...S,directory:d.payload.directory};j(s,d.payload.directory);return}if(d.type==="session"){if(S)S={...S,session:d.payload.session};if(!d.payload.session)pe=null;else if(pe?.sessionId!==d.payload.session.id)pe=$e(d.payload.session);j(a,d.payload.session);return}if(d.type==="session-lifecycle"){pe=d.payload,j(l,d.payload);return}if(d.type==="connection"){if(S)S={...S,connection:d.payload.connection};j(_,d.payload.connection);return}if(d.type==="settings"){if(S)S={...S,settings:d.payload.settings};j(f,d.payload.settings);return}if(d.type==="item"){if(S)S={...S,item:d.payload.item};j(p,d.payload.item);return}if(d.type==="status-control-event"){j(u,d.payload);return}if(d.type==="popover-closed"){j(h,d.payload);return}if(d.type==="action"){let R=(H)=>{if(!G)re({channel:C,v,type:"action-result",id:d.id,payload:H})},B=T;if(!B){R({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>B(d.payload)).then(()=>R({ok:!0}),(H)=>{let Q=(H instanceof Error?H.message:String(H)).trim();R({ok:!1,error:(Q||"Action failed.").slice(0,Ye)})});return}if(d.type==="file-open"){let R=d.payload;if(de&&Ln(de,R))return;de=R,j(w,d.payload);return}if(d.type==="file-saved"){j(M,d.payload.version);return}if(d.type==="file-snapshot"){let R=(Q)=>{if(!G)re({channel:C,v,type:"file-snapshot-result",id:d.id,payload:Q})},B=(Q)=>R({error:(Q.trim()||"Could not read the edited file.").slice(0,Ye)}),H=ie;if(!H){B("This extension does not edit files.");return}Promise.resolve().then(()=>H(d.payload.purpose)).then((Q)=>{if(nr(Q)>ut){B(`The file is over ${ut} ${"bytes"in Q?"bytes":"characters"}.`);return}if(Q.version.length>pt){B(`The snapshot version is over ${pt} characters.`);return}R({snapshot:"bytes"in Q?{bytes:Q.bytes,version:Q.version}:{content:Q.content,version:Q.version}})},(Q)=>B(Q instanceof Error?Q.message:String(Q)));return}if(d.type==="resolve"){let R=(H)=>{re({channel:C,v,type:"resolve-result",id:d.id,payload:H})},B=y;if(!B){R({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>B(d.payload)).then((H)=>R({item:H?He(H):null}),(H)=>{let Q=(H instanceof Error?H.message:String(H)).trim();R({error:(Q||"Command failed.").slice(0,Ye)})});return}let A=Y.get(d.id);if(!A)return;if(clearTimeout(A.timer),Y.delete(d.id),d.ok){A.resolve(d.payload);return}A.reject(new x(d.code,d.error))};t.addEventListener("message",gn),re({channel:C,v,type:"hello"});let oe=(i,d=n)=>{if(G||t.parent===t)return Promise.reject(new x("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((A,R)=>{let B=setTimeout(()=>{Y.delete(i.id),R(new x("HOST_TIMEOUT","Host did not answer in time."))},d);Y.set(i.id,{resolve:A,reject:R,timer:B}),re(i)})},z=(i)=>oe(i).then(()=>{return}),q={channel:C,v},Yt=(i)=>{if(!G&&t.parent!==t)re(i)},yn=()=>Yt({...q,type:"file-save"}),On=(i)=>{if(!so(i)||!ui(i))return;i.preventDefault(),yn()},An=(i)=>{if(!so(i)||i.key!=="Escape"||S?.surface!=="popover"||!S.popover)return;i.preventDefault(),bn(S.popover.id,"escape").catch(()=>{return})},st=()=>{let i=S?.surface==="popover"?S.popover:void 0;if(!i)return;let d=we||U;if(_e===d)return;_e=d,In(i.id,d).catch(()=>{return})},it=()=>{if(S?.surface!=="popover"||we)return;we=!0,st()},Rn=(i)=>{if(S?.surface!=="popover"||i.relatedTarget!==null||!we)return;we=!1,st()},xn=()=>{if(S?.surface!=="popover"||U)return;U=!0,st()},kn=()=>{if(S?.surface!=="popover"||!U)return;U=!1,st()},Se=(i,d=1024)=>{if(!i.trim()||i.length>d)throw new x("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},Jt=async(i)=>{if(i.kind!=="projects")Se(i.projectId);let d=await oe({...q,type:"workspace-read",id:I(E),payload:i});if(!d||!("kind"in d)||!("state"in d)||d.kind!==i.kind)throw new x("HOST_REJECTED","Host did not return workspace data.");return d},qt=async(i,d)=>{if(i.kind!=="projects")Se(i.projectId);let A=I(E);ae.set(A,d);try{await z({...q,type:"workspace-subscribe",id:I(E),payload:{subscriptionId:A,query:i}})}catch(R){if(ae.delete(A),!G)re({...q,type:"workspace-unsubscribe",id:I(E),payload:{subscriptionId:A}});throw R}return()=>{if(!ae.delete(A)||G)return;re({...q,type:"workspace-unsubscribe",id:I(E),payload:{subscriptionId:A}})}},ri=async(i,d)=>{if(i.kind==="session")Se(i.sessionId);if(i.kind==="project")Se(i.projectId);let A=I(E);J.set(A,d);try{await z({...q,type:"shells-subscribe",id:I(E),payload:{subscriptionId:A,scope:i}})}catch(R){if(J.delete(A),!G)re({...q,type:"shells-unsubscribe",id:I(E),payload:{subscriptionId:A}});throw R}return()=>{if(!J.delete(A)||G)return;re({...q,type:"shells-unsubscribe",id:I(E),payload:{subscriptionId:A}})}},at=async(i)=>{if("key"in i&&(i.key.length===0||i.key.length>er))throw new x("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(i.op==="set"&&!Ge(i.value))throw new x("HOST_REJECTED","Storage values must be JSON.");if(i.op==="set"&&new TextEncoder().encode(JSON.stringify(i.value)).length>tr)throw new x("HOST_REJECTED","Storage value exceeds 64 KiB.");if(i.scope==="device"&&S?.features?.deviceStorage!==!0)throw new x("UNSUPPORTED","This host does not support device storage.");let d=await oe({...q,type:"storage",id:I(E),payload:i});if(!d||!("storage"in d)||d.op!==i.op)throw new x("HOST_REJECTED","Host did not return storage data.");return d},bn=(i,d)=>S?.features?.popovers!==!0&&!(S?.surface==="popover"&&S.popover?.id===i)?Promise.reject(new x("UNSUPPORTED","This host does not support popovers.")):z({...q,type:"popover-close",id:I(E),payload:d?{id:i,reason:d}:{id:i}}),In=(i,d)=>S?.features?.popovers!==!0&&!(S?.surface==="popover"&&S.popover?.id===i)?Promise.reject(new x("UNSUPPORTED","This host does not support popovers.")):z({...q,type:"popover-anchor",id:I(E),payload:{id:i,active:d}});return t.addEventListener("keydown",An,!0),t.addEventListener("pointerover",it),t.addEventListener("pointermove",it),t.addEventListener("pointerout",Rn),t.addEventListener("focus",xn),t.addEventListener("blur",kn),{onAction:(i)=>(T=i,()=>{if(T===i)T=null}),listProjects:async()=>{let i=await Jt({kind:"projects"});if(i.kind!=="projects")throw new x("HOST_REJECTED","Expected projects.");return i},listWorktrees:async(i)=>{let d=await Jt({kind:"worktrees",projectId:i});if(d.kind!=="worktrees")throw new x("HOST_REJECTED","Expected worktrees.");return d},listSessions:async(i)=>{let d=await Jt({kind:"sessions",projectId:i});if(d.kind!=="sessions")throw new x("HOST_REJECTED","Expected sessions.");return d},onProjects:(i)=>qt({kind:"projects"},(d)=>{if(d.kind==="projects")i(d)}),onWorktrees:(i,d)=>qt({kind:"worktrees",projectId:i},(A)=>{if(A.kind==="worktrees")d(A)}),onSessions:(i,d)=>qt({kind:"sessions",projectId:i},(A)=>{if(A.kind==="sessions")d(A)}),onRunningShells:(i,d)=>ri(i,d),readShellOutput:async(i,d)=>{Se(i,ct);let A=d?.cursor;if(A!==void 0&&(!Number.isInteger(A)||A<0))throw new x("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let R=d?.tailBytes;if(R!==void 0&&(!Number.isInteger(R)||R<1||R>lt))throw new x("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${lt}.`);let H=await oe({...q,type:"shell-output",id:I(E),payload:{shellId:i,cursor:A,tailBytes:R}});if(!H||typeof H.output!=="string"||!Number.isFinite(H.cursor))throw new x("HOST_REJECTED","Host did not return shell output.");return H},stopShell:async(i)=>{if(Se(i,ct),(await oe({...q,type:"shell-stop",id:I(E),payload:{shellId:i}}))?.stopped!==!0)throw new x("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(i)=>{Se(i),await z({...q,type:"open-session",id:I(E),payload:{sessionId:i}})},storage:{get:async(i,d)=>{let A=Ot(d),R={op:"get",key:i};if(A)R.scope=A;let B=await at(R);return B.op==="get"&&B.found?B.value:void 0},set:async(i,d,A)=>{let R=Ot(A),B={op:"set",key:i,value:d};if(R)B.scope=R;await at(B)},delete:async(i,d)=>{let A=Ot(d),R={op:"delete",key:i};if(A)R.scope=A;await at(R)},keys:async(i)=>{let d=Ot(i),A={op:"keys"};if(d)A.scope=d;let R=await at(A);if(R.op!=="keys")throw new x("HOST_REJECTED","Expected storage keys.");return R.keys}},onReady:(i)=>{if(o.add(i),S)i(S);return()=>{o.delete(i)}},onDirectory:(i)=>{if(s.add(i),S)i(S.directory);return()=>{s.delete(i)}},onSession:(i)=>{if(a.add(i),S)i(S.session);return()=>{a.delete(i)}},onSessionLifecycle:(i)=>{if(l.add(i),pe)i(pe);return()=>{l.delete(i)}},onConnection:(i)=>{if(_.add(i),S)i(S.connection);return()=>{_.delete(i)}},onSettings:(i)=>{if(f.add(i),S)i(S.settings);return()=>{f.delete(i)}},onItem:(i)=>{if(p.add(i),S)i(S.item);return()=>{p.delete(i)}},onBlock:(i)=>{if(g.add(i),S?.block)i(S.block);return()=>{g.delete(i)}},onServiceEvent:(i)=>(m.add(i),()=>{m.delete(i)}),onStatusControl:(i)=>(u.add(i),()=>{u.delete(i)}),onPopoverClosed:(i)=>(h.add(i),()=>{h.delete(i)}),setStatusControls:(i)=>{if(S?.features?.statusControls!==!0)return Promise.reject(new x("UNSUPPORTED","This host does not support status controls."));if(!Un(i))return Promise.reject(new x("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return z({...q,type:"status-controls",id:I(E),payload:{controls:i}})},openPopover:(i)=>{if(S?.features?.popovers!==!0)return Promise.reject(new x("UNSUPPORTED","This host does not support popovers."));if(!sr(i))return Promise.reject(new x("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return z({...q,type:"popover-open",id:I(E),payload:i})},closePopover:bn,setPopoverAnchorActive:In,onResolve:(i)=>(y=i,()=>{if(y===i)y=null}),toast:(i)=>{let d=i.message.trim();if(!d||d.length>_t)return Promise.reject(new x("HOST_REJECTED",`Toast message must contain 1 to ${_t} characters.`));if(i.copy&&i.copy!==!0&&(!i.copy.text.length||i.copy.text.length>ft))return Promise.reject(new x("HOST_REJECTED",`Toast copy text must contain 1 to ${ft} characters.`));return z({channel:C,v,type:"toast",id:I(E),payload:{...i,message:d}})},openUrl:(i)=>z({channel:C,v,type:"open-url",id:I(E),payload:{url:i}}),openCommit:(i)=>dr(i)?z({channel:C,v,type:"open-commit",id:I(E),payload:{sha:i}}):Promise.reject(new x("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(i)=>z({channel:C,v,type:"block-answer",id:I(E),payload:{text:i.trim().slice(0,ar)}}),openSurface:(i)=>z({channel:C,v,type:"open-surface",id:I(E),payload:{surfaceId:i}}),writeClipboard:(i)=>z({channel:C,v,type:"clipboard-write",id:I(E),payload:{text:i}}),compose:(i)=>z({channel:C,v,type:"compose",id:I(E),payload:i}),attach:(i)=>z({channel:C,v,type:"attach",id:I(E),payload:He(i)}),startSession:async(i)=>{if(i.projectId!==void 0)Se(i.projectId);let d=i.worktree;if(d&&d!==!0)if(d.kind==="existing")Se(d.directory);else{if(d.name!==void 0)Se(d.name,200);if(d.baseBranch!==void 0)Se(d.baseBranch,200)}let A=await oe({channel:C,v,type:"start-session",id:I(E),payload:fr(i)},e.requestTimeoutMs??180000);if(!cr(A))throw new x("HOST_REJECTED","Host did not return a session.");return A},prompt:(i)=>oe({channel:C,v,type:"prompt",id:I(E),payload:Er(i)}).then((d)=>{if(!lr(d))throw new x("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:(i)=>z({channel:C,v,type:"session-link",id:I(E),payload:He(i)}),close:()=>z({channel:C,v,type:"close",id:I(E)}),oauthStart:()=>z({channel:C,v,type:"oauth-start",id:I(E)}),oauthDisconnect:()=>z({channel:C,v,type:"oauth-disconnect",id:I(E)}),request:(i)=>(ht(i.path)?oe({channel:C,v,type:"request",id:I(E),payload:i}):io()).then((d)=>{if(!gt(d))throw new x("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:(i)=>(ht(i.path)?oe({channel:C,v,type:"service-request",id:I(E),payload:i}):io()).then((d)=>{if(!gt(d))throw new x("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>oe({channel:C,v,type:"service-status",id:I(E)}).then((i)=>{if(!Tr(i))throw new x("HOST_REJECTED","Host did not return service status.");return i}),readFile:(i)=>(Ve(i)?oe({channel:C,v,type:"file-read",id:I(E),payload:{path:i}}):yt()).then((d)=>{if(!hr(d))throw new x("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(i,d)=>{if(!Ve(i))return yt();if(d.length>mt)return Promise.reject(new x("FILE_TOO_LARGE",`Content is over ${mt} characters.`));return oe({channel:C,v,type:"file-write",id:I(E),payload:{path:i,content:d}}).then((A)=>{if(!gr(A))throw new x("HOST_REJECTED","Host did not confirm the write.");return A})},listDir:(i)=>(Ve(i)?oe({channel:C,v,type:"file-list",id:I(E),payload:{path:i}}):yt()).then((d)=>{if(!yr(d))throw new x("HOST_REJECTED","Host did not return directory entries.");return d}),stat:(i)=>(Ve(i)?oe({channel:C,v,type:"file-stat",id:I(E),payload:{path:i}}):yt()).then((d)=>{if(!Or(d))throw new x("HOST_REJECTED","Host did not return file status.");return d}),generate:(i)=>{let d=i.prompt.trim(),A=i.system?.trim();if(d.length===0||d.length>St)return Promise.reject(new x("HOST_REJECTED",`Prompt must be 1 to ${St} characters.`));if(A!==void 0&&(A.length===0||A.length>Tt))return Promise.reject(new x("HOST_REJECTED",`System prompt must be 1 to ${Tt} characters.`));let R=i.maxOutputTokens===void 0?void 0:Math.min(pr,Math.max(1,Math.floor(i.maxOutputTokens)));if(R!==void 0&&!Number.isFinite(R))return Promise.reject(new x("HOST_REJECTED","maxOutputTokens must be a number."));let B={prompt:d};if(A!==void 0)B.system=A;if(R!==void 0)B.maxOutputTokens=R;return oe({channel:C,v,type:"generate",id:I(E),payload:B},e.requestTimeoutMs??_r).then((H)=>{if(!Ar(H))throw new x("HOST_REJECTED","Host did not return generated text.");return H})},onLateGenerateResult:(i)=>{k.add(i);for(let d of b.splice(0))j([i],d);return ot(),()=>{k.delete(i)}},setBadge:(i)=>z({channel:C,v,type:"badge",id:I(E),payload:{count:mr(i)}}),setHeight:(i)=>z({channel:C,v,type:"resize",id:I(E),payload:{height:Sr(i)}}),onFileOpen:(i)=>{if(w.add(i),!ue)ue=!0,t.addEventListener("keydown",On,!0);if(de)i(de);return()=>{w.delete(i)}},onFileSnapshot:(i)=>(ie=i,()=>{if(ie===i)ie=null}),onFileSaved:(i)=>(M.add(i),()=>{M.delete(i)}),reportFileChange:(i)=>Yt({...q,type:"file-change",payload:{dirty:i.dirty,edited:i.edited}}),requestFileSave:yn,reportFileUnsupported:()=>Yt({...q,type:"file-unsupported"}),dispose:()=>{for(let i of ae.keys())re({...q,type:"workspace-unsubscribe",id:I(E),payload:{subscriptionId:i}});ae.clear();for(let i of J.keys())re({...q,type:"shells-unsubscribe",id:I(E),payload:{subscriptionId:i}});if(J.clear(),G=!0,y=null,T=null,ie=null,w.clear(),M.clear(),ue)t.removeEventListener("keydown",On,!0);t.removeEventListener("message",gn),t.removeEventListener("keydown",An,!0),t.removeEventListener("pointerover",it),t.removeEventListener("pointermove",it),t.removeEventListener("pointerout",Rn),t.removeEventListener("focus",xn),t.removeEventListener("blur",kn);for(let i of Y.values())clearTimeout(i.timer),i.reject(new x("HOST_UNAVAILABLE","Host client was disposed."));Y.clear(),o.clear(),s.clear(),a.clear(),l.clear(),_.clear(),f.clear(),p.clear(),g.clear(),m.clear(),u.clear(),h.clear(),k.clear(),b.length=0}}};var ao=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var $a=new Set(ao);var co=["none","agent","user"];var Ha=new Set(co);var N,po,pi,be,kr,It,_o,Rt,fo,Ir,br,_i,Je=Symbol.for("pv"),Ct={},vt=[],fi=/^m(i|n|o|s|text|space)$/,Cr=Array.isArray,Eo=vt.slice,Ue=Object.assign;function Me(e){e&&e.parentNode&&e.remove()}function xt(e,t,r,n,o){var s={type:e,props:t,key:r,ref:n,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Je,__v:o||++po,__i:-1,__u:0};return!o&&N.vnode&&N.vnode(s),s}function ge(e){return e.children}function kt(e,t){this.props=e,this.context=t,this.__g=0}function Ie(e,t){if(t==null)return e.__&&Ie(e.__,e.__i+1);for(var r;t<e.__k.length;t++)if((r=e.__k[t])&&r.__e)return r.__e;return typeof e.type!="function"||e.props.__P?null:Ie(e)}function Ei(e){var t,r=e.__v,n=r.__e,o=[],s=[],a=e.__P;a&&((t=Ue({constructor:Je},r)).__v=r.__v+1,N.vnode&&N.vnode(t),vr(a,t,r,e.__n,a.namespaceURI,32&r.__u?[n]:null,o,n||Ie(r),32&r.__u,s),t.__v=r.__v,t.__.__k[t.__i]=t,yo(o,t,s),r.__=r.__e=null,t.__e!=n&&mo(t))}function mo(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),mo(e)}function lo(e){(8&e.__g||(e.__g|=8,be.push(e),It++))&&kr==N.debounceRendering||((kr=N.debounceRendering)||queueMicrotask)(So)}function So(){try{for(var e,t=1;be.length;)be.length>t&&be.sort(_o),e=be.shift(),t=be.length,8&e.__g&&Ei(e)}finally{(It=be.length)&&(kr||queueMicrotask)(So)}}function To(e,t,r,n,o,s,a,l,_,f,p){var g,m,u,h,k,b,y=n.__k||vt,T=t.length;for(_=mi(r,t,y,_,T),g=0;g<T;g++)(u=r.__k[g])!=null&&(m=~u.__i&&y[u.__i]||Ct,u.__i=g,b=vr(e,u,m,o,s,a,l,_,f,p),h=u.__e,(m.ref!=u.ref||8&m.__u)&&(m.ref&&wr(m.ref,null,u,m),u.ref&&p.push(u.ref,u.__c||h,u)),k=k||h,4&u.__u?(_=ho(u,_,e,!m.__v),m.__e&&(m.__e=null)):typeof u.type=="function"&&b!==void 0?_=b:h&&(_=h.nextSibling),u.__u&=-21);return r.__e=k,_}function mi(e,t,r,n,o){var s,a,l,_,f,p,g,m,u,h=r.length,k=h,b=0,y=0,T=e.__k=Array(o);for(s=0;s<o;s++)(a=t[s])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a!="object"||a.constructor===String?a=T[s]=xt(null,a):Cr(a)?a=T[s]=xt(ge,{children:a}):a.constructor===Je&&a.__b?a=T[s]=xt(a.type,a.props,a.key,a.ref,a.__v):T[s]=a,_=s+b,a.__=e,a.__b=e.__b+1,l=null,~(f=a.__i=Si(a,r,_,k))&&(k--,(l=r[f])&&(l.__u|=2)),l&&l.__v?(a.__u|=16,f==_-1?b--:f==_+1?b++:f!=_&&(f>_?b--:b++,y=1)):(~f||(o>h?b--:o<h&&b++),typeof a.type!="function"&&(a.__u|=4))):T[s]=null;if(y){for(p=[],g=[],s=0;s<o;s++)if((a=T[s])&&16&a.__u){for(b=0,m=p.length;b<m;)p[u=b+m>>1]<a.__i?b=u+1:m=u;p[b]=a.__i,g[s]=b+1}for(b=p.length;s--;)g[s]&&(g[s]==b?b--:T[s].__u|=4)}if(k)for(s=0;s<h;s++)!(l=r[s])||2&l.__u||(l.__e==n&&(n=Ie(l)),Mr(l,l));return n}function ho(e,t,r,n){var o,s,a,l;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=ho(o[s],t,r,!1));return t}for(t&&!t.parentNode&&(t=Ie(e))&&!t.parentNode&&(t=null),a=e.__e,l=t;l&&l.nodeType==8;)l=l.nextSibling;for(a!=l&&(!n&&r.moveBefore&&a.parentNode?r.moveBefore(a,t):r.insertBefore(a,t||null)),t=a;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Si(e,t,r,n){var o,{key:s,type:a}=e,l=t[r],_=l&&!(2&l.__u);if(l===null&&s==null||_&&s==l.key&&a==l.type)return r;if(n>(_?1:0)){for(o=r-1;o>=0;o--)if((l=t[o])&&!(2&l.__u)&&s==l.key&&a==l.type)return o;for(o=r+1;o<t.length;o++)if((l=t[o])&&!(2&l.__u)&&s==l.key&&a==l.type)return o}return-1}function uo(e,t,r){r==null&&(r=""),t[0]=="-"?e.setProperty(t,r):e[t]=r}function At(e,t,r,n,o){var s,a;if(t=="style")if(typeof r=="string")e.style.cssText=r;else{if(typeof n=="string"&&(e.style.cssText=n=""),n)for(t in n)r&&t in r||uo(e.style,t);if(r)for(t in r)n&&r[t]==n[t]||uo(e.style,t,r[t])}else if(t[0]=="o"&&t[1]=="n")typeof r!="function"&&(r=null),typeof n!="function"&&(n=null),(e.__e||(e.__e={}))[t]=r,r&&n||(a=br[t]||(br[t]=Ti(t)),(e.__a||(e.__a={}))[t]=Ir,s=t!=(t=t.replace(fo,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),r?e.addEventListener(t,a,s):e.removeEventListener(t,a,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=r==null?"":r)}catch(l){}if(typeof r=="function")return;r==null||r===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&r==1?"":r)}}function Ti(e){return function(t){var r=this.__e;if(r){if(r=r[e],t[Rt]==null)t[Rt]=Ir++;else if(t[Rt]<this.__a[e])return;return r(N.event?N.event(t):t)}}}function vr(e,t,r,n,o,s,a,l,_,f){var p,g,m,u,h,k,b,y,T,w,M,ie,de,ue,Y,ae,J,G,E=t.type;if(t.constructor!==Je)return null;128&r.__u&&(_=32&r.__u,p=r.__c.__z)&&(t.__u|=_,g=s=[],p.nodeType==8?l=bt(p,s):s.push(p),l=s[0]||l),(p=N.__b)&&p(t);e:if(typeof E=="function"){m=a.length;try{if(y=t.props,T=(p=E.prototype)&&p.render,w=(p=E.contextType)&&n[p.__c],M=p?w?w.props.value:p.__:n,(u=r.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(T?t.__c=u=new E(y,M):(t.__c=u=new kt(y,M),u.constructor=E,u.render=gi),w&&w.sub(u),u.state||(u.state={}),u.__n=n,u.__g|=8,u.__h=[],u.__k=[]),T&&(u.__s||(u.__s=u.state),E.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=Ue({},u.__s)),Ue(u.__s,E.getDerivedStateFromProps(y,u.__s)))),h=u.props,k=u.state,u.__v=t,r.__c){if(y!==h&&T&&!E.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(y,M),t.__v==r.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(y,u.__s,M)===!1){t.__v!=r.__v&&(u.props=y,u.state=u.__s,u.__g&=-9),t.__e=r.__e,t.__k=r.__k,t.__k.some(function(S){S&&(S.__=t)}),vt.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&a.push(u),l=Ie(r);break e}u.componentWillUpdate&&u.componentWillUpdate(y,u.__s,M),T&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(h,k,b)})}else T&&!E.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),T&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=M,u.props=y,u.__P=e,u.__g&=-5,ie=N.__r,de=T?25:0;do u.__g&=-9,ie&&ie(t),p=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++de<25);T&&(vt.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(n=Ue({},n,u.getChildContext())),T&&r.__c&&u.getSnapshotBeforeUpdate&&(b=u.getSnapshotBeforeUpdate(h,k)),ue=p&&p.type===ge&&p.key==null?p.props.children:p,y.__P&&(p=l,o=(e=y.__P).namespaceURI,_=s=null,r.props&&r.props.__P!=e&&(r.__k.some(function(S){S&&Mr(S,S)}),r.__k=null),l=r.__k?Ie(r,0):null),l=To(e,Cr(ue)?ue:[ue],t,r,n,o,s,a,l,_,f),y.__P&&(t.__e=null,l=p),t.__u&=-161,g&&g.some(Me),u.__h.length&&a.push(u),1&u.__g&&(u.__g&=-4)}catch(S){if(a.length=m,t.__v=null,_||s)if(S&&S.then){if(t.__u|=128|_,s){for(~(J=s.indexOf(l||void 0))||(J=s.length);(G=s[J-1])&&G.nodeType==8;)J--;for(;J<s.length;J++)if(G=s[J])if(s[J]=null,Y){if(G==ae)break}else{if(G.nodeType!=8)break;G.data.startsWith("$s")&&(ae=bt(Y=G))}}if(!Y){for(;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;Y=l}(p=bt(Y=t.__c.__z||(t.__c.__z=Y)))?(t.__e=Y,l=p):t.__e=l,l=l&&l.nextSibling}else s&&s.some(Me);else t.__e=r.__e;t.__k||(t.__k=r.__k||[]),S&&S.then||go(t),N.__e(S,t,r)}}else l=t.__e=hi(r.__e,t,r,n,o,s,a,_,f,e);return(p=N.diffed)&&p(t),l}function bt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var r=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))r++;else if(e.data.startsWith("/$s")&&!--r)return e}t&&t.push(e)}}function go(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(go))}function yo(e,t,r){for(var n=0;n<r.length;)wr(r[n++],r[n++],r[n++]);N.__c&&N.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){N.__e(s,o.__v)}})}function hi(e,t,r,n,o,s,a,l,_,f){var p,g,m,u,h,k,b,y,T=r.props||Ct,{props:w,type:M}=t;if(M=="svg"?o="http://www.w3.org/2000/svg":M=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((h=s[p])&&(M?h.localName==M:h.nodeType==3)){e=h,s[p]=null;break}}if(!e){if(y=f.ownerDocument||document,!M)return y.createTextNode(w);e=y.createElementNS(o,M,w.is?w:f),l&&(N.__m&&N.__m(t,s),l=!1),s=null}if(M){if(f=M=="template"&&e.content||e,s=M=="textarea"&&w.defaultValue!=null?null:s&&Eo.call(f.childNodes),!l&&s)for(T={},p=0;p<e.attributes.length;p++)T[(h=e.attributes[p]).name]=h.value;for(p in T)h=T[p],p=="dangerouslySetInnerHTML"?m=h:p=="children"||(p in w)||p=="value"&&("defaultValue"in w)||p=="checked"&&("defaultChecked"in w)||At(e,p,null,h,o);for(p in w)h=w[p],p=="children"?u=h:p=="dangerouslySetInnerHTML"?g=h:p=="value"?k=h:p=="checked"?b=h:l&&typeof h!="function"||T[p]===h||At(e,p,h,T[p],o);g?(l||m&&(g.__html==m.__html||g.__html==e.innerHTML)||(e.innerHTML=g.__html),t.__k=[]):(m&&(e.textContent=""),(M=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&fi.test(M))&&(o="http://www.w3.org/1999/xhtml"),To(f,Cr(u)?u:[u],t,r,n,o,s,a,s?s[0]:r.__k&&Ie(r,0),l,_),s&&s.some(Me)),l&&M!="textarea"||(p="value",M=="progress"&&k==null?e.removeAttribute(p):k==null||k===e[p]&&(M!="progress"||k)||At(e,p,k,T[p],o),p="checked",b!=null&&b!=e[p]&&At(e,p,b,T[p],o))}else T===w||l&&e.data==w||(e.data=w);return e}function wr(e,t,r,n){try{typeof e=="function"?t?t.__x=e(t)||1:n&&(n=n.__c||n.__e)&&(t=n.__x)&&(n.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){N.__e(o,r)}}function Mr(e,t,r){var n,o,s,a;if(N.unmount&&N.unmount(e),!(n=e.ref)||n.current&&n.current!=e.__e||wr(n,null,t,e),n=e.__c){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(l){N.__e(l,t)}n.__P=n.__n=null}if(n=e.__k)for(a=0;a<n.length;a++)n[a]&&Mr(n[a],t,typeof e.type!="function"||r&&!e.props.__P);!r&&(n=e.__c)&&(n=n.__z)&&(o=bt(n,s=[]))&&(n==e.__e&&s.some(Me),Me(o),Me(n)),r||Me(e.__e),e.__e=e.__c=e.__=null}function gi(e,t,r){return this.constructor(e,r)}function Oo(e,t){var r,n,o,s;N.__&&N.__(e,t),t.nodeType==9&&(t=t.documentElement),n=(r=e&&32&e.__u)?null:t.__k,t.__k=xt(ge,{children:[e]}),o=[],s=[],vr(t,t.__k,n||Ct,Ct,t.namespaceURI,n?null:t.firstChild?Eo.call(t.childNodes):null,o,n?n.__e:t.firstChild,r,s),yo(o,t.__k,s),t.__k.props.children=null}N={__e:function(e,t,r,n){for(var o,s,a;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((a=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,n||{}),a=1),a&&8&o.__g)return void(o.__g|=2)}catch(l){e=l}}throw It=0,e}},po=0,pi=function(e){return e!=null&&e.constructor===Je},kt.prototype.setState=function(e,t){var r=this.__s;r&&r!=this.state||(r=this.__s=Ue({},this.state)),typeof e=="function"&&(e=e(Ue({},r),this.props)),e&&(Ue(r,e),this.__v&&(t&&this.__k.push(t),lo(this)))},kt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),lo(this))},kt.prototype.render=ge,be=[],It=0,_o=function(e,t){return e.__v.__b-t.__v.__b},Rt=Symbol(),fo=/(PointerCapture)$|Capture$/i,Ir=0,br={},_i=0;var Qe,ee,Ur,Ao,Nr=Object.is,wt=0,Mo=[],Pr=[],Z=N,{__b:Ro,__r:xo,diffed:ko,__c:bo,unmount:Io,__:Co}=Z;function Dr(e,t){Z.__h&&Z.__h(ee,e,wt||t),wt=0;var r=ee.__H||(ee.__H={__:[],__h:[]});return e>=r.__.length&&r.__.push({}),r.__[e]}function X(e){return wt=1,yi(No,e)}function yi(e,t,r){var n=Dr(Qe++,2);if(n.t=e,!n.__c&&(n.__=[r?r(t):No(void 0,t),function(s){var a=(n.__N||n.__)[0],l=n.t(a,s);Nr(a,l)||(n.__N=[l,n.__[1]],n.__c.setState({}))}],n.__c=ee,!ee.__f)){ee.__f=!0;var o=ee.shouldComponentUpdate;ee.shouldComponentUpdate=function(s,a,l){var _=this.__H;if(!_)return!0;var f=!1,p=this.props!=s;if(_.__.some(function(m){m.__N&&(f=!0,Nr(m.__[0],m.__N[0])||(p=!0))}),o){var g=o.call(this,s,a,l);return f?g||p:g}return!f||p}}return n.__}function me(e,t){var r=Dr(Qe++,3);!Z.__s&&Uo(r.__H,t)&&(r.__P=!0,r.__=e,r.u=t,ee.__H.__h.push(r))}function Ce(e){return wt=5,$r(function(){return{current:e}},[])}function $r(e,t){var r=Dr(Qe++,7);return Uo(r.__H,t)&&(r.__=e(),r.__H=t),r.__}function Oi(){var e;do{for(;e=Pr.shift();)try{qe(e)}catch(r){Z.__e(r,{__:(e=e.__P)&&e.__v})}for(;e=Mo.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(qe),t.__h.some(Lr),t.__h=[]}catch(r){t.__h=[],Z.__e(r,e.__v)}}}while(Pr.length)}Z.__b=function(e){ee=null,Ro&&Ro(e)},Z.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Co&&Co(e,t)},Z.__r=function(e){xo&&xo(e),Qe=0;var t=(ee=e.__c).__H;t&&(Ur==ee?ee.__h=[]:(t.__h.some(qe),t.__h.some(Lr),Qe=0),t.__h=[],t.__.some(function(r){r.__N&&(r.__=r.__N),r.u=r.__N=void 0})),Ur=ee},Z.diffed=function(e){ko&&ko(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&wo(Mo.push(t)),t.__H.__.some(function(r){r.u&&(r.__H=r.u)})),Ur=ee=null},Z.__c=function(e,t){t.some(function(r){try{r.__h.some(qe),r.__h=r.__h.filter(function(n){return!n.__||Lr(n)})}catch(n){r.__h=[function(){throw n}]}}),bo&&bo(e,t)},Z.unmount=function(e){Io&&Io(e);var t,r,n=e.__c;n&&n.__H&&(n.__H.__.some(function(o){try{if(o.__P&&o.__c){if(r===void 0){for(r=e.__;r&&(!r.__c||!r.__c.__P);)r=r.__;r=r&&r.__c}o.__P=r,wo(Pr.push(o))}else qe(o)}catch(s){t=s}}),n.__H=void 0,t&&Z.__e(t,n.__v))};var vo=typeof requestAnimationFrame=="function";function Ai(e){var t,r=function(){clearTimeout(n),vo&&cancelAnimationFrame(t),setTimeout(e)},n=setTimeout(r,35);vo&&(t=requestAnimationFrame(r))}function wo(e){e!=1&&Ao==Z.requestAnimationFrame||((Ao=Z.requestAnimationFrame)||Ai)(Oi)}function qe(e){var t=ee,r=e.__c;typeof r=="function"&&(e.__c=void 0,r()),ee=t}function Lr(e){var t=ee;e.__c=e.__(),ee=t}function Uo(e,t){return!e||e.length!=t.length||t.some(function(r,n){return!Nr(r,e[n])})}function No(e,t){return typeof t=="function"?t(e):t}var Ri=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],xi=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Po=(e,t)=>{t.style.colorScheme=e.mode;for(let[r,n]of Ri)t.style.setProperty(r,e.tokens[n]);for(let[r,n,o]of xi){let s=e.tokens[o]??"";t.style.setProperty(r,s),t.style.setProperty(n,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Gr=(e,t)=>{if(Po(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var ki={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},F=(e,t)=>`var(--${e}, var(--oc-${ki[e]}, ${t}))`,Ae=F("surface-background","transparent"),Ut=F("surface-elevated","transparent"),Be=F("surface-elevated-foreground","inherit"),fe=F("surface-foreground","inherit"),K=F("surface-muted-foreground","gray"),bi=F("surface-muted","transparent"),Ne=F("interactive-border","currentColor"),ce=F("interactive-hover","transparent"),Pe=F("interactive-active","transparent"),Hr=F("interactive-selection","transparent"),Vr=F("interactive-selection-foreground","inherit"),Oe=F("primary","currentColor"),Br=F("primary-text","inherit"),Xr=F("error-text","inherit"),Ii=F("font-sans","inherit"),Fr=F("font-mono","monospace"),Go=F("radius","9px"),jr=`calc(${Go} - 2px)`,Lo=`calc(${Go} - 4px)`,W=(e,t,r="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${r})`,Do=`background-image: linear-gradient(${ce}, ${ce});`,Kr=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Wr="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",$o="box-shadow: var(--oc-sdk-lit);",zr=`inset 0 0.5px 0 0 ${W(fe,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,Ci=`
:root {
  --oc-sdk-edge: ${W(fe,16)};
  --oc-sdk-field-bg: ${Ut};
  --oc-sdk-raised-bg: ${Ae};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${W(fe,14)};
  --oc-sdk-field-bg: ${W(Ae,50,Ut)};
  --oc-sdk-raised-bg: ${Ut};
  --oc-sdk-field-lift: ${zr};
  --oc-sdk-raised-lift: ${zr};
  --oc-sdk-lit: ${zr};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Mt=(e)=>{let t=F(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${F(`${e}-text`,"inherit")}; }`},vi=`
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
`,Ho=`${Ci}
.oc-sdk { color: ${fe}; font-family: ${Ii}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Do} }
.oc-sdk-mono { font-family: ${Fr}; }
.oc-sdk-muted { color: ${K}; }
${Mt("success")}${Mt("warning")}${Mt("error")}${Mt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Oe}; --oc-sdk-tone-text: ${Br}; }

.oc-sdk-btn { border-radius: ${jr}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Lo}; }
.oc-sdk-btn[data-variant="default"] { color: ${Br}; background: ${W(Oe,10,Ae)}; border-color: ${W(Oe,12)}; ${$o} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${W(Oe,16,Ae)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${W(Oe,22,Ae)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${bi}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Pe}, ${Pe}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Be}; ${Wr} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Pe}, ${Pe}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${ce}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Pe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${F("status-error","red")}; color: ${Xr}; background: ${W("var(--oc-sdk-tone)",7,Ae)}; border-color: ${W("var(--oc-sdk-tone)",12)}; ${$o} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${W("var(--oc-sdk-tone)",9,Ae)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${W("var(--oc-sdk-tone)",11,Ae)}; box-shadow: none; }

.oc-sdk-field-note { color: ${K}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Xr}; }
.oc-sdk-input { border-radius: ${jr}; background: var(--oc-sdk-field-bg); color: ${Be}; ${Kr("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${K}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${Kr(W(fe,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${Kr(F("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Fr}; }

.oc-sdk-search-icon { color: ${K}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Oe}; }
.oc-sdk-search-clear { border-radius: ${Lo}; color: ${K}; }
.oc-sdk-search-clear:hover { background: ${ce}; color: ${fe}; }

.oc-sdk-trigger { border-radius: ${jr}; background: var(--oc-sdk-raised-bg); color: ${Be}; ${Wr} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${ce}, ${ce}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Pe}, ${Pe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${K}; }
.oc-sdk-trigger-chevron { color: ${K}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Be}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ut}; background-clip: padding-box; color: ${Be}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${ce}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Hr}; color: ${Vr}; }
.oc-sdk-option-check { color: ${fe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Xr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${W(F("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${K}; }
.oc-sdk-popup-empty { color: ${K}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Ne}; border-radius: 4px; color: ${fe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${W(fe,60,Ne)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Ne}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Ae}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Oe}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Do} }
.oc-sdk-check-desc { color: ${K}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${W(fe,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${K}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${fe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Vr}; background: ${Hr}; border-color: ${Ne}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Be}; background: var(--oc-sdk-raised-bg); ${Wr} }
.oc-sdk-tab-count { color: ${K}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${W(fe,6)}; color: ${K}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${W("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${ce}; }
.oc-sdk-row[aria-selected="true"] { background: ${Hr}; color: ${Vr}; }
.oc-sdk-row-lead { font-family: ${Fr}; color: ${K}; }
.oc-sdk-row-sub { color: ${K}; }
.oc-sdk-row-meta { color: ${K}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${K}; }

.oc-sdk-empty-body { color: ${K}; }

.oc-sdk-spinner { color: ${K}; }
.oc-sdk-spinner-ring { border-color: ${Ne}; border-top-color: ${Oe}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${W("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${K}; }

.oc-sdk-separator { color: ${K}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${W(Ne,40)}; }

.oc-sdk-progress-label { color: ${K}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${W(fe,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Oe}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${F("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${F("success-text","inherit")}; }

.oc-sdk-text a { color: ${Br}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${W(Ne,60)}; }
`,P=`
${Qt}
${vi}
${Ho}`;var Vo="oc-sdk-ui-style",Re=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},L=(e)=>{let t=document.getElementById(Vo);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}Zt(document);let r=document.createElement("style");r.id=Vo,r.textContent=e,document.head.appendChild(r)},O=(e,t)=>{let r=document.createElement(e);if(t)r.className=t;return r},le=(e)=>{let t=O("button",e);return t.type="button",t},V=(e,t)=>{let r=t??"";if(e.textContent!==r)e.textContent=r},Ee=(e,t,r)=>{if(r===void 0||r===null||r==="")e.removeAttribute(t);else if(e.getAttribute(t)!==r)e.setAttribute(t,r)},Bo=(e,t)=>{let r=(n)=>{if(n.target instanceof Node&&e.contains(n.target))return;t()};return document.addEventListener("pointerdown",r,!0),()=>{document.removeEventListener("pointerdown",r,!0)}};var wi=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},xe=(e,t)=>{L(P);let r=t,n=le("oc-sdk oc-sdk-btn"),o=wi(),s=document.createElement("span");n.append(s),e.append(n);let a=()=>{if(n.dataset.variant=r.variant??"default",n.dataset.size=r.size??"default",n.disabled=Boolean(r.disabled)||Boolean(r.loading),n.dataset.loading=r.loading?"true":"false",n.setAttribute("aria-busy",r.loading?"true":"false"),r.loading&&o.parentNode!==n)n.prepend(o);else if(!r.loading&&o.parentNode===n)o.remove();V(s,r.label)},l=()=>{if(r.disabled||r.loading)return;r.onClick()};return n.addEventListener("click",l),a(),{update:(_)=>{r={...r,..._},a()},dispose:()=>{n.removeEventListener("click",l),n.remove()}}};var Yr=(e,t)=>{L(P);let r=t,n=O("label","oc-sdk oc-sdk-field"),o=O("span","oc-sdk-field-label"),s=r.multiline?O("textarea","oc-sdk-input"):O("input","oc-sdk-input"),a=O("span","oc-sdk-field-note");n.append(o,s,a),e.append(n);let l=()=>{if(V(o,r.label),o.hidden=!r.label,s instanceof HTMLInputElement)s.type=r.password?"password":"text";else s.rows=r.rows??3;if(s.value!==r.value)s.value=r.value;s.disabled=Boolean(r.disabled),Ee(s,"placeholder",r.placeholder),s.dataset.mono=r.mono?"true":"false";let f=Boolean(r.error);n.dataset.invalid=f?"true":"false",s.setAttribute("aria-invalid",f?"true":"false");let p=r.error??r.helper??"";V(a,p),a.hidden=p===""},_=()=>{r.onChange(s.value)};return s.addEventListener("input",_),l(),{update:(f)=>{r={...r,...f},l()},dispose:()=>{s.removeEventListener("input",_),n.remove()}}};var Mi={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Te=(e,t,r)=>{let n=document.createElementNS("http://www.w3.org/2000/svg","svg");if(n.setAttribute("viewBox","0 0 24 24"),n.setAttribute("width",String(t)),n.setAttribute("height",String(t)),n.setAttribute("aria-hidden","true"),n.setAttribute("fill","currentColor"),r)n.setAttribute("class",r);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",Mi[e]),n.append(o),n};var Jr=(e,t)=>{L(P);let r=t,n=O("div","oc-sdk oc-sdk-search"),o=O("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=le("oc-sdk-search-clear");s.append(Te("close",14)),s.tabIndex=-1,n.append(Te("search",16,"oc-sdk-search-icon"),o,s),e.append(n);let a=()=>{let p=r.placeholder??"Search";if(Ee(o,"placeholder",p),o.setAttribute("aria-label",r.label??p),s.setAttribute("aria-label","Clear search"),o.value!==r.value)o.value=r.value;n.dataset.active=r.value.trim()===""?"false":"true"},l=()=>{if(r.value!=="")r.onChange("");o.focus()},_=()=>{r.onChange(o.value)},f=(p)=>{if(p.key==="Escape"&&o.value!=="")p.preventDefault(),l()};if(o.addEventListener("input",_),o.addEventListener("keydown",f),s.addEventListener("click",l),a(),r.autofocus)o.focus();return{update:(p)=>{r={...r,...p},a()},dispose:()=>{o.removeEventListener("input",_),o.removeEventListener("keydown",f),s.removeEventListener("click",l),n.remove()}}};var ye=(e,t="vertical")=>{let[r,n]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},ke=(e,t,r)=>{let n=e.filter((_)=>!_.disabled);if(n.length===0)return null;let o=n[0],s=n[n.length-1];if(r==="first"||!o||!s)return o?.id??null;if(r==="last")return s.id;let a=n.findIndex((_)=>_.id===t);if(a===-1)return r==="next"?o.id:s.id;return n[Math.min(n.length-1,Math.max(0,a+(r==="next"?1:-1)))]?.id??null};var Xo=(e,t)=>`${e}-${t??""}`,Nt=(e,t,r,n)=>{let o=le("oc-sdk-option");if(o.id=Xo(e,r.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(r.disabled),t==="option")o.setAttribute("aria-selected",r.selected?"true":"false");o.dataset.destructive=r.destructive?"true":"false";let s=O("span","oc-sdk-option-label");if(s.textContent=r.label,o.append(s),r.hint){let a=O("span","oc-sdk-option-hint");a.textContent=r.hint,o.append(a)}if(t==="option"){o.dataset.mark="check";let a=O("span","oc-sdk-option-check");a.append(Te("check",14)),o.append(a)}return o.addEventListener("pointerenter",n.hover),o.addEventListener("click",n.pick),o},Pt=(e,t,r,n)=>{let o=Xo(r,n);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";Ee(t,"aria-activedescendant",n?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Ui=(e,t)=>{let r=t.getBoundingClientRect();e.style.minWidth=`${Math.round(r.width)}px`,e.style.left=`${Math.round(r.left)}px`,e.style.top=`${Math.round(r.bottom+4)}px`;let n=e.offsetHeight,o=window.innerHeight-r.bottom-8;if(n>o&&r.top-8>o)e.style.top=`${Math.max(8,Math.round(r.top-4-n))}px`;let s=r.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(r.left-s))}px`},Lt=(e,t,r,n)=>{e.append(r),Ui(r,t);let o=Bo(e,n),s=()=>{n()},a=(l)=>{if(l.target instanceof Node&&r.contains(l.target))return;n()};return window.addEventListener("resize",s),window.addEventListener("scroll",a,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",a,!0),r.remove()}};var Fo=(e,t)=>{let r=t.trim().toLowerCase();if(!r)return[...e];return e.filter((n)=>n.label.toLowerCase().includes(r)||n.id.toLowerCase().includes(r))},Ni=0,Dt=(e,t)=>{L(P);let r=t,n=`oc-sdk-select-${Ni+=1}`,o=O("div","oc-sdk oc-sdk-select"),s=O("span","oc-sdk-field-label");s.id=`${n}-label`;let a=le("oc-sdk-trigger");a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-labelledby",s.id);let l=O("span","oc-sdk-trigger-value");a.append(l,Te("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,a),e.append(o);let _="",f=null,p=null,g=O("div","oc-sdk oc-sdk-popup"),m=O("div","oc-sdk-popup-search"),u=O("input","oc-sdk-input");u.type="text",u.autocomplete="off",m.append(u);let h=O("div");h.setAttribute("role","listbox"),h.tabIndex=-1,g.append(h);let k=()=>Fo(r.options,r.searchable?_:""),b=()=>r.searchable?u:h,y=(E)=>{f=E,Pt(h,b(),n,E)},T=()=>{Re(h);let E=k();if(E.length===0){let S=O("div","oc-sdk-popup-empty");S.textContent="No matches",h.append(S)}for(let S of E)h.append(Nt(n,"option",{...S,selected:S.id===r.value},{hover:()=>y(S.id),pick:()=>ie(S.id)}));y(E.some((S)=>S.id===f)?f:E[0]?.id??null)},w=()=>{let E=p;p=null,E?.(),_="",u.value="",a.setAttribute("aria-expanded","false")},M=()=>{if(p||r.disabled)return;if(f=r.value,u.placeholder=r.searchPlaceholder??"Search",r.searchable)g.prepend(m);else m.remove();T(),p=Lt(o,a,g,w),a.setAttribute("aria-expanded","true"),b().focus()},ie=(E)=>{if(w(),a.focus(),E!==r.value)r.onChange(E)},de=()=>{if(p)w();else M()},ue=(E)=>{if(!p&&ye(E))E.preventDefault(),M()},Y=(E)=>{let S=ye(E);if(S)E.preventDefault(),y(ke(k(),f,S));else if(E.key==="Enter"){if(E.preventDefault(),f)ie(f)}else if(E.key==="Escape")E.preventDefault(),w(),a.focus();else if(r.searchable&&E.target!==u&&E.key.length===1&&!E.ctrlKey&&!E.metaKey)u.focus()},ae=()=>{_=u.value,T()},J=(E)=>{if(p&&!(E.relatedTarget instanceof Node&&o.contains(E.relatedTarget)))w()},G=()=>{V(s,r.label),s.hidden=!r.label;let E=r.options.find((S)=>S.id===r.value);if(V(l,E?.label??r.placeholder??"Select"),l.dataset.empty=E?"false":"true",a.disabled=Boolean(r.disabled),p)T()};return a.addEventListener("click",de),a.addEventListener("keydown",ue),g.addEventListener("keydown",Y),u.addEventListener("input",ae),o.addEventListener("focusout",J),G(),{update:(E)=>{r={...r,...E},G()},dispose:()=>{w(),a.removeEventListener("click",de),a.removeEventListener("keydown",ue),g.removeEventListener("keydown",Y),u.removeEventListener("input",ae),o.removeEventListener("focusout",J),o.remove()}}};var jo=(e,t,r)=>{L(P);let n=t,o=le("oc-sdk oc-sdk-check");o.setAttribute("role",r);let s=O("span",r==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(r==="checkbox")s.append(Te("check",12));let a=O("span","oc-sdk-check-text"),l=O("span","oc-sdk-check-label"),_=O("span","oc-sdk-check-desc");a.append(l,_),o.append(s,a),e.append(o);let f=()=>{o.setAttribute("aria-checked",n.checked?"true":"false"),o.disabled=Boolean(n.disabled),V(l,n.label),V(_,n.description),_.hidden=!n.description},p=()=>{if(!n.disabled)n.onChange(!n.checked)};return o.addEventListener("click",p),f(),{update:(g)=>{n={...n,...g},f()},dispose:()=>{o.removeEventListener("click",p),o.remove()}}},qr=(e,t)=>jo(e,t,"checkbox"),$t=(e,t)=>jo(e,t,"switch");var Qr=(e,t)=>{L(P);let r=t,n=O("div","oc-sdk oc-sdk-tabs");n.setAttribute("role","tablist"),e.append(n);let o=()=>{Re(n),n.dataset.track=r.trackBackground?"true":"false";for(let a of r.items){let l=le("oc-sdk-tab");l.setAttribute("role","tab");let _=a.id===r.activeId;l.setAttribute("aria-selected",_?"true":"false"),l.tabIndex=_?0:-1,l.dataset.id=a.id;let f=O("span");if(f.textContent=a.label,l.append(f),a.count!==void 0){let p=O("span","oc-sdk-tab-count");p.textContent=String(a.count),l.append(p)}l.addEventListener("click",()=>{if(a.id!==r.activeId)r.onChange(a.id)}),n.append(l)}},s=(a)=>{let l=ye(a,"horizontal");if(!l)return;let _=ke(r.items,r.activeId,l);if(_&&_!==r.activeId){a.preventDefault(),r.onChange(_);let f=n.querySelector(`[data-id="${CSS.escape(_)}"]`);if(f instanceof HTMLElement)f.focus()}};return n.addEventListener("keydown",s),o(),{update:(a)=>{r={...r,...a},o()},dispose:()=>{n.removeEventListener("keydown",s),n.remove()}}};var Ze=(e,t)=>{Ee(e,"data-tone",t&&t!=="neutral"?t:null)},Zr=(e,t)=>{L(P);let r=t,n=O("span","oc-sdk oc-sdk-badge");e.append(n);let o=()=>{V(n,r.label),Ze(n,r.tone)};return o(),{update:(s)=>{r={...r,...s},o()},dispose:()=>{n.remove()}}};var Pi=0,en=(e,t)=>{L(P);let r=t,n=`oc-sdk-list-${Pi+=1}`,o=O("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,a=(g)=>`${n}-${g}`,l=(g)=>{s=g;for(let m of Array.from(o.children))if(m instanceof HTMLElement)m.dataset.active=m.id===a(g??"")?"true":"false";Ee(o,"aria-activedescendant",g?a(g):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},_=(g,m)=>{let u=O("span",g);return u.textContent=m,u},f=()=>{if(Re(o),Ee(o,"aria-label",r.ariaLabel),r.items.length===0){o.append(_("oc-sdk-list-empty",r.emptyText??"Nothing here")),l(null);return}for(let m of r.items){let u=le("oc-sdk-row");if(u.id=a(m.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",m.id===r.selectedId?"true":"false"),u.disabled=Boolean(m.disabled),u.tabIndex=-1,m.leading)u.append(_("oc-sdk-row-lead",m.leading));let h=O("span","oc-sdk-row-main");if(h.append(_("oc-sdk-row-title",m.title)),m.subtitle)h.append(_("oc-sdk-row-sub",m.subtitle));if(u.append(h),m.badge){let k=_("oc-sdk-badge",m.badge.label);Ze(k,m.badge.tone),u.append(k)}if(m.meta)u.append(_("oc-sdk-row-meta",m.meta));u.addEventListener("click",()=>r.onSelect(m.id)),o.append(u)}let g=r.items.some((m)=>m.id===s&&!m.disabled);l(g?s:r.selectedId??null)},p=(g)=>{let m=ye(g);if(m){g.preventDefault(),l(ke(r.items,s,m));return}if((g.key==="Enter"||g.key===" ")&&s)g.preventDefault(),r.onSelect(s)};return o.addEventListener("keydown",p),f(),{update:(g)=>{r={...r,...g},f()},dispose:()=>{o.removeEventListener("keydown",p),o.remove()}}};var tn=(e,t)=>{L(P);let r=t,n=O("div","oc-sdk oc-sdk-empty"),o=O("h2","oc-sdk-empty-title"),s=O("p","oc-sdk-empty-body"),a=O("div","oc-sdk-empty-action");n.append(o,s,a),e.append(n);let l=null,_=()=>{if(V(o,r.title),V(s,r.body),s.hidden=!r.body,a.hidden=!r.action,!r.action){l?.dispose(),l=null;return}let f={label:r.action.label,onClick:r.action.onClick};if(l)l.update(f);else l=xe(a,{...f,variant:"outline",size:"sm"})};return _(),{update:(f)=>{r={...r,...f},_()},dispose:()=>{l?.dispose(),l=null,n.remove()}}};var rn=(e,t={})=>{L(P);let r=t,n=O("span","oc-sdk oc-sdk-spinner");n.setAttribute("role","status");let o=O("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=O("span");n.append(o,s),e.append(n);let a=()=>{n.dataset.size=r.size??"default",V(s,r.label),s.hidden=!r.label,n.setAttribute("aria-label",r.label??"Loading")};return a(),{update:(l)=>{r={...r,...l},a()},dispose:()=>{n.remove()}}};var nn=(e,t)=>{L(P);let r=t,n=O("div","oc-sdk oc-sdk-banner"),o=O("div","oc-sdk-banner-text"),s=O("div","oc-sdk-banner-title"),a=O("div","oc-sdk-banner-body"),l=O("div","oc-sdk-banner-action");o.append(s,a),n.append(o,l),e.append(n);let _=null,f=()=>{if(n.dataset.tone=r.tone,n.setAttribute("role",r.tone==="error"||r.tone==="warning"?"alert":"status"),V(s,r.title),V(a,r.body),a.hidden=!r.body,l.hidden=!r.action,!r.action){_?.dispose(),_=null;return}let p={label:r.action.label,onClick:r.action.onClick};if(_)_.update(p);else _=xe(l,{...p,variant:"outline",size:"xs"})};return f(),{update:(p)=>{r={...r,...p},f()},dispose:()=>{_?.dispose(),_=null,n.remove()}}};var Li=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,on=(e,t)=>{L(P);let r=t,n=O("div","oc-sdk oc-sdk-progress"),o=O("div","oc-sdk-progress-label"),s=O("span"),a=O("span","oc-sdk-progress-value"),l=O("span"),_=Te("check",14);a.append(_,l),o.append(s,a);let f=O("div","oc-sdk-progress-track");f.setAttribute("role","progressbar"),f.setAttribute("aria-valuemin","0"),f.setAttribute("aria-valuemax","100");let p=O("div","oc-sdk-progress-fill");f.append(p),n.append(o,f),e.append(n);let g=()=>{let m=Li(r.value);if(Ze(p,r.tone),p.style.transform=`scaleX(${m/100})`,f.setAttribute("aria-valuenow",String(m)),r.label)f.setAttribute("aria-label",r.label);else f.removeAttribute("aria-label");V(s,r.label),V(l,`${m}%`);let u=m===100&&(!r.tone||r.tone==="neutral");Ee(n,"data-done",u?"true":null),_.style.display=u?"":"none",o.hidden=!r.label};return g(),{update:(m)=>{r={...r,...m},g()},dispose:()=>{n.remove()}}};var Ko=(e)=>e.filter((t)=>!("separator"in t)),Di=0,sn=(e,t)=>{L(P);let r=t,n=`oc-sdk-menu-${Di+=1}`,o=O("div","oc-sdk oc-sdk-menu");e.append(o);let s=O("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let a=null,l=null,_=xe(o,{label:r.label,variant:r.variant,size:r.size,onClick:()=>{if(a)m();else u()}}),f=o.querySelector("button");f?.setAttribute("aria-haspopup","menu");let p=(y)=>{l=y,Pt(s,s,n,y)},g=()=>{Re(s);for(let y of r.items){if("separator"in y){let T=O("div","oc-sdk-separator");T.dataset.labeled="false",s.append(T);continue}s.append(Nt(n,"menuitem",y,{hover:()=>p(y.id),pick:()=>h(y.id)}))}p(Ko(r.items).some((y)=>y.id===l)?l:null)},m=()=>{let y=a;a=null,y?.(),l=null,f?.setAttribute("aria-expanded","false")},u=()=>{if(a||!f)return;g(),a=Lt(o,f,s,m),f.setAttribute("aria-expanded","true"),s.focus()},h=(y)=>{m(),f?.focus(),r.onSelect(y)},k=(y)=>{let T=ye(y);if(T)y.preventDefault(),p(ke(Ko(r.items),l,T));else if(y.key==="Enter"||y.key===" "){if(y.preventDefault(),l)h(l)}else if(y.key==="Escape")y.preventDefault(),m(),f?.focus()},b=(y)=>{if(a&&!(y.relatedTarget instanceof Node&&o.contains(y.relatedTarget)))m()};return s.addEventListener("keydown",k),o.addEventListener("focusout",b),{update:(y)=>{if(r={...r,...y},_.update({label:r.label,variant:r.variant,size:r.size}),a)g()},dispose:()=>{m(),s.removeEventListener("keydown",k),o.removeEventListener("focusout",b),_.dispose(),o.remove()}}};var D=xr(),Gt=null,an=new Set;D.onReady((e)=>{Gt=e,Gr(e,document.documentElement);for(let t of an)t(e)});var Ht=()=>{let[e,t]=X(Gt);return me(()=>{if(an.add(t),Gt)t(Gt);return()=>{an.delete(t)}},[]),e};var $i=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},Wo=(e)=>JSON.stringify(e,(t,r)=>typeof r==="function"?"[fn]":r),Gi=(e,t)=>{let r=e;for(let n of t){if(r===null||r===void 0)return;r=r[n]}return r},cn=(e,t)=>{let r=(n,o)=>{if(typeof n==="function")return(...s)=>{let a=Gi(t.current,o);return typeof a==="function"?a(...s):void 0};if(Array.isArray(n))return n.map((s,a)=>r(s,[...o,a]));if($i(n))return Object.fromEntries(Object.entries(n).map(([s,a])=>[s,r(a,[...o,s])]));return n};return r(e,[])};var Hi=Symbol.for("pv"),Vi=0;function c(e,t,r,n,o,s){t||(t={});var a,l,_=t;if("ref"in _&&typeof e!="function")for(l in _={},t)l=="ref"?a=t[l]:_[l]=t[l];var f={type:e,props:_,key:r,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Hi,__v:--Vi,__i:-1,__u:0};return(o||s)&&(f.__source=o,f.__self=s),N.vnode&&N.vnode(f),f}var ln=(...e)=>e.filter(Boolean).join(" ");var te=({children:e,class:t})=>c("span",{class:ln("sui-chip",t),children:e},void 0,!1,void 0,this),zo=({children:e,onClick:t,pressed:r,class:n})=>t?c("button",{type:"button",class:ln("sui-card",n),"aria-pressed":r,onClick:t,children:e},void 0,!1,void 0,this):c("div",{class:ln("sui-card sui-card--static",n),children:e},void 0,!1,void 0,this);var et=({title:e,children:t})=>c("div",{class:"sui-section",children:[e&&c("h3",{class:"sui-section-title",children:e},void 0,!1,void 0,this),t]},void 0,!0,void 0,this),Yo=({items:e})=>c("dl",{class:"sui-kv",children:e.flatMap(([t,r])=>[c("dt",{children:t},void 0,!1,void 0,this),c("dd",{children:r},void 0,!1,void 0,this)])},void 0,!1,void 0,this),Jo=(e,t)=>{let r=Ce(null),n=Ce(null),o=Ce(t);o.current=t;let s=Wo(t),a=Ce(!1);me(()=>{if(!r.current)return;return n.current=e(r.current,cn(o.current,o)),a.current=!0,()=>{n.current?.dispose(),n.current=null,a.current=!1}},[]);let l=Ce(s);return me(()=>{if(!a.current||l.current===s)return;l.current=s,n.current?.update(cn(o.current,o))},[s]),r};var he=(e,t=new Date)=>{if(!e)return"";let r=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(r.getTime()))return"";let n=r.getFullYear()===t.getFullYear();return r.toLocaleDateString("en-US",{month:"short",day:"numeric",...n?{}:{year:"numeric"}})},qo=(e,t=new Date)=>{if(!e)return null;let r=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(r.getTime()))return null;let n=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((r.getTime()-n)/86400000)},Qo=(e,t=Date.now())=>{if(!e)return"";let r=new Date(e).getTime();if(Number.isNaN(r))return"";let n=Math.max(0,Math.round((t-r)/60000));if(n<1)return"just now";if(n<60)return`${n}m ago`;let o=Math.round(n/60);if(o<24)return`${o}h ago`;let s=Math.round(o/24);if(s<30)return`${s}d ago`;return he(e,new Date(t))};var Bi={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},Zo=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return Bi[e]??String(e);return String(e)},dn=(e)=>{let t=e.url.match(/\/-\/merge_requests\/(\d+)/),r=e.url.match(/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/),n=t?.[1]??r?.[1];if(!n)return null;let o=e.metadata??{},s=String(o.status??o.state??"").toLowerCase(),l=o.draft===!0||o.isDraft===!0||s==="draft"?"draft":s==="merged"?"merged":s==="closed"?"closed":s==="open"||s==="opened"||s==="approved"||s==="reviewing"?"open":null;return{label:`${t?"!":"#"}${n}`,status:l,url:e.url,title:e.title}},es=(e,t=Date.now())=>{if(!e)return null;let r=new Date(e).getTime();if(Number.isNaN(r))return null;let n=r<t,o=Math.round(Math.abs(r-t)/60000),s=Math.round(o/60),a=Math.round(s/24),l=o<60?`${Math.max(1,o)}m`:s<24?`${s}h`:a<14?`${a}d`:`${Math.round(a/7)}w`;return{text:n?`-${l}`:l,overdue:n}},ts=(e)=>{let t=Math.abs(e),r=(n)=>String(Math.round(n*10)/10).replace(/\.0$/,"");if(t>=1e6)return`$${r(e/1e6)}M`;if(t>=1000)return`$${r(e/1000)}k`;return`$${Math.round(e)}`},rs=(e,t=Date.now())=>{let r=e?new Date(e).getTime():NaN;if(Number.isNaN(r))return null;let n=Math.max(0,Math.round((t-r)/60000));if(n<60)return`${Math.max(1,n)}m`;let o=Math.round(n/60);if(o<24)return`${o}h`;let s=Math.round(o/24);return s<14?`${s}d`:`${Math.round(s/7)}w`};var ns=(e)=>{let t=e.trim().toLowerCase(),r=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(r){let o=r[1].length===3?r[1].split("").map((s)=>s+s).join(""):r[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let n=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return n?[Number(n[1]),Number(n[2]),Number(n[3])]:null},os=([e,t,r])=>{let n=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*n(e)+0.7152*n(t)+0.0722*n(r)},Xi=(e,t)=>{let[r,n]=[os(e),os(t)].sort((o,s)=>s-o);return(r+0.05)/(n+0.05)};var ss=(e,t)=>{let r=ns(e),n=ns(t);if(!r||!n||Xi(r,n)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Xe=new Map,Fi=30000,is=(e)=>{let t=Xe.get(e);if(!t)t={at:0,listeners:new Set},Xe.set(e,t);return t},Vt=(e)=>{for(let t of e.listeners)t()},tt=(e,t,r=!1)=>{let n=is(e);if(n.promise)return n.promise;if(!r&&n.value!==void 0&&Date.now()-n.at<Fi)return Promise.resolve(n.value);let o=t().then((s)=>(n.value=s,n.error=void 0,n.at=Date.now(),s),(s)=>{throw n.error=s,s}).finally(()=>{n.promise=void 0,Vt(n)});return n.promise=o,Vt(n),o};var as=(e)=>{let t=[];for(let[r,n]of Xe){if(n.value===void 0)continue;let o=e(r,n.value);if(o===n.value)continue;t.push([n,n.value]),n.value=o,Vt(n)}return()=>{for(let[r,n]of t)r.value=n,Vt(r)}},cs=(e)=>{let t=Xe.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)tt(e,t.fetcher,!0).catch(()=>{return})},Bt=(e)=>{for(let[t,r]of Xe){if(!t.startsWith(e))continue;if(r.at=0,r.listeners.size>0&&r.fetcher)tt(t,r.fetcher,!0).catch(()=>{return})}},un=(e,t)=>{let[,r]=X(0);me(()=>{if(!e)return;let o=is(e);o.fetcher=t;let s=()=>r((a)=>a+1);return o.listeners.add(s),tt(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let n=e?Xe.get(e):void 0;return{data:n?.value,error:n?.error,loading:Boolean(n?.promise)||e!==null&&n?.value===void 0&&n?.error===void 0,refresh:()=>{if(e)tt(e,t,!0).catch(()=>{return})}}};var ls=(e,t)=>JSON.stringify({query:e,variables:t});class se extends Error{kind;constructor(e,t){super(t);this.kind=e}}var ve=async(e,t)=>{let r;try{r=await D.request({method:"POST",path:"/graphql",body:ls(e,t)})}catch(o){if(o instanceof x){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new se("disconnected","Linear is not connected.");throw new se("network",o.message||"Could not reach Linear.")}throw new se("network",o instanceof Error?o.message:"Could not reach Linear.")}let n;try{n=JSON.parse(r.body)}catch{throw new se("network",`Linear answered with status ${r.status}.`)}if(r.status===401)throw new se("disconnected","Linear sign-in expired.");if(n.errors?.length){let o=n.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new se(s?"rate-limited":"graphql",o.message)}if(!n.data)throw new se("graphql","Linear returned no data.");return n.data};var ds=`
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
`;var ji=(e)=>`
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
`,us=`
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
`,ps=`
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`;var _s=`
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
`;var fs=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,r)=>`n${r}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,WE={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:ji(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:fs(["n1","n2"])};var Es=null,ms=new Map,Ss=(e)=>{for(let[t,r]of e)ms.set(t,r)},Ts=(e,t)=>{let r=ms.get(t);if(r!==void 0)return r;let n=Es?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=n.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(n.length+1)},hs=(e)=>Es?.teamsById.get(e)?.issueEstimationType;var gs=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),Ki=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,r=7+3.8*Math.sin(t),n=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${r.toFixed(2)} ${n.toFixed(2)}z`},rt=({type:e,color:t,size:r=14,fill:n,teamId:o,stateId:s})=>{let a=t||"currentColor",l=$r(()=>ss(a,gs()),[a,gs()]),_={width:r,height:r,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return c("svg",{..._,children:[c("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),c("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return c("svg",{..._,children:c("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return c("svg",{..._,children:c("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let f=n??(o&&s?Ts(o,s):0.5);return c("svg",{..._,children:[c("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5"},void 0,!1,void 0,this),c("path",{d:Ki(f),fill:l},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return c("svg",{..._,children:[c("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),c("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return c("svg",{..._,children:[c("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),c("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}},Xt=({priority:e,size:t=14})=>{let r={width:t,height:t,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};if(e===1)return c("svg",{...r,children:[c("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"2.5",fill:"var(--oc-warning)"},void 0,!1,void 0,this),c("path",{d:"M7 4v3.6M7 9.4v.2",stroke:"var(--oc-bg)","stroke-width":"1.6","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);if(e>=2&&e<=4){let n=5-e;return c("svg",{...r,children:[0,1,2].map((o)=>c("rect",{x:2+o*4,y:9-o*3,width:"2.4",height:3+o*3,rx:"0.6",fill:"currentColor",opacity:o<n?1:0.28},void 0,!1,void 0,this))},void 0,!1,void 0,this)}return c("svg",{...r,children:c("path",{d:"M2.5 7h2M6 7h2M9.5 7h2",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round",opacity:"0.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},Fe=({name:e,url:t,size:r=18})=>{let n=e.split(/\s+/).filter(Boolean).slice(0,2).map((s)=>s[0].toUpperCase()).join("")||"?",o={width:`${r}px`,height:`${r}px`,fontSize:`${Math.round(r*0.42)}px`};if(t)return c("img",{class:"lin-avatar",src:t,alt:e,style:o},void 0,!1,void 0,this);return c("span",{class:"lin-avatar",style:o,children:n},void 0,!1,void 0,this)},Wi={open:"var(--oc-info)",merged:"var(--oc-success)",closed:"var(--oc-muted)",draft:"var(--oc-muted)"},ys=({status:e,size:t=13})=>c("svg",{width:t,height:t,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:c("g",{fill:"none",stroke:e?Wi[e]:"currentColor","stroke-width":"1.4","stroke-linecap":"round",children:[c("circle",{cx:"3.5",cy:"3",r:"1.6"},void 0,!1,void 0,this),c("circle",{cx:"3.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),c("circle",{cx:"10.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),c("path",{d:"M3.5 4.6v4.8M10.5 9.4V6.5a2 2 0 0 0-2-2H6.5"},void 0,!1,void 0,this),c("path",{d:"M7.8 3.2 6.3 4.5l1.5 1.3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),Os=({size:e=13})=>c("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[c("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:"currentColor","stroke-width":"1.4"},void 0,!1,void 0,this),c("path",{d:"M5.6 4.6 9.2 7l-3.6 2.4z",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var As=({done:e,total:t,size:r=13})=>{let o=2*Math.PI*5,s=t?Math.min(1,e/t):0;return c("svg",{width:r,height:r,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[c("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:"var(--oc-border)","stroke-width":"2"},void 0,!1,void 0,this),c("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:s>=1?"var(--oc-success)":"var(--oc-info)","stroke-width":"2","stroke-dasharray":`${o*s} ${o}`,transform:"rotate(-90 7 7)","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Rs=({size:e=13})=>c("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[c("circle",{cx:"7",cy:"7",r:"6",fill:"var(--oc-error)"},void 0,!1,void 0,this),c("path",{d:"M4 7h6",stroke:"var(--oc-bg)","stroke-width":"1.8","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),xs=({size:e=13})=>c("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[c("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"3",fill:"none",stroke:"var(--oc-warning)","stroke-width":"1.5"},void 0,!1,void 0,this),c("path",{d:"M5 10V4.5h4.2l-.9 1.4.9 1.4H5",fill:"var(--oc-warning)",stroke:"var(--oc-warning)","stroke-width":"1","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Ft=({icon:e,color:t,size:r=13})=>{if(e&&/\p{Extended_Pictographic}/u.test(e))return c("span",{class:"lin-project-emoji",style:{fontSize:`${r}px`},"aria-hidden":"true",children:e},void 0,!1,void 0,this);return c("svg",{width:r,height:r,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[c("path",{d:"M7 1.2 12.2 4.1v5.8L7 12.8 1.8 9.9V4.1z",fill:t||"var(--oc-muted)"},void 0,!1,void 0,this),c("path",{d:"M4.6 7h4.8M7 4.6v4.8",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round",opacity:"0.85"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var jt=({label:e})=>c(te,{children:[c("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this),pn=2,zi=()=>c("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:c("path",{d:"M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.6.6M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.6-.6",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),Yi=()=>c("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[c("circle",{cx:"7",cy:"7.5",r:"4.7",fill:"none",stroke:"currentColor","stroke-width":"1.3"},void 0,!1,void 0,this),c("path",{d:"M7 5v2.7l1.6 1M5.5 1.8h3",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Ji=()=>c("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:c("path",{d:"M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2zM2 4.2 7 7l5-2.8M7 7v5.5",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),qi=()=>c("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[c("circle",{cx:"5",cy:"5",r:"2.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),c("path",{d:"M1.5 11.5c.4-2 1.8-3 3.5-3s3.1 1 3.5 3M9.5 3.4a2.2 2.2 0 0 1 0 3.9M10.5 8.8c1 .4 1.7 1.3 2 2.7",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Qi=()=>c("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[c("circle",{cx:"7",cy:"7",r:"5.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),c("path",{d:"M7 4.2V7l2 1.2",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ks=({issue:e,properties:t,subIssues:r,hideProject:n,extras:o})=>{let s=e.labels.nodes,a=e.attachments?.nodes??[],l=a.map(dn).filter((T)=>T!==null),_=a.filter((T)=>!dn(T)),f=(e.inRelations?.nodes??[]).filter((T)=>T.type==="blocks").length,p=(e.outRelations?.nodes??[]).filter((T)=>T.type==="blocks").length,g=Zo(e.estimate,hs(e.team.id)),m=e.dueDate?qo(e.dueDate):null,u=t.has("sla")?es(e.slaBreachesAt):null,h=o?.releases.nodes??[],k=(o?.needs.nodes??[]).map((T)=>T.customer).filter((T)=>T!==null),b=k.reduce((T,w)=>T+(w.revenue??0),0),y=t.has("timeInStatus")?rs(o?.stateHistory.nodes[o.stateHistory.nodes.length-1]?.startedAt):null;return c(ge,{children:[r&&r.total>0&&c("span",{class:"lin-meta lin-meta-children",title:`${r.done} of ${r.total} sub-issues done`,children:c(te,{children:[c(As,{done:r.done,total:r.total},void 0,!1,void 0,this),r.done,"/",r.total]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("labels")&&s.length>0&&c("span",{class:"lin-meta lin-meta-labels",children:[s.slice(0,pn).map((T)=>c(jt,{label:T},T.id,!1,void 0,this)),s.length>pn&&c(te,{children:["+",s.length-pn]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),t.has("changes")&&l.length>0&&c("span",{class:"lin-meta lin-meta-change",title:l.map((T)=>`${T.label} ${T.title}`).join(`
`),children:c(te,{children:[c(ys,{status:l[0].status},void 0,!1,void 0,this),l.length===1?l[0].label:`${l.length} ${l[0].label.startsWith("!")?"MRs":"PRs"}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("links")&&_.length>0&&c("span",{class:"lin-meta lin-meta-links",title:_.map((T)=>T.title).join(`
`),children:c(te,{children:[c(zi,{},void 0,!1,void 0,this),_.length]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("project")&&!n&&e.project&&c("span",{class:"lin-meta lin-meta-project",title:e.project.name,children:c(te,{children:[c(Ft,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),c("span",{class:"lin-ellipsis",children:e.project.name},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("milestone")&&e.projectMilestone&&c("span",{class:"lin-meta lin-meta-milestone",title:`Milestone: ${e.projectMilestone.name}`,children:c(te,{children:c("span",{class:"lin-ellipsis",children:e.projectMilestone.name},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("cycle")&&e.cycle&&c("span",{class:"lin-meta lin-meta-cycle",title:`Cycle ${e.cycle.number}${e.cycle.name?`: ${e.cycle.name}`:""}`,children:c(te,{children:[c(Os,{},void 0,!1,void 0,this),e.cycle.number]},void 0,!0,void 0,this)},void 0,!1,void 0,this),f>0&&c("span",{class:"lin-meta lin-meta-blocked",title:`Blocked by ${f} ${f===1?"issue":"issues"}`,children:c(te,{children:[c(Rs,{},void 0,!1,void 0,this),f]},void 0,!0,void 0,this)},void 0,!1,void 0,this),p>0&&c("span",{class:"lin-meta lin-meta-blocking",title:`Blocking ${p} ${p===1?"issue":"issues"}`,children:c(te,{children:[c(xs,{},void 0,!1,void 0,this),p]},void 0,!0,void 0,this)},void 0,!1,void 0,this),u&&c("span",{class:`lin-meta lin-meta-sla ${u.overdue?"lin-overdue":""}`,title:`SLA ${e.slaType??""} breaches ${he(e.slaBreachesAt)}`,children:c(te,{children:[c(Yi,{},void 0,!1,void 0,this),u.text]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("release")&&h.length>0&&c("span",{class:"lin-meta lin-meta-release",title:h.map((T)=>`${T.name}${T.version?` ${T.version}`:""}`).join(`
`),children:c(te,{children:[c(Ji,{},void 0,!1,void 0,this),c("span",{class:"lin-ellipsis",children:h[0].version??h[0].name},void 0,!1,void 0,this),h.length>1&&` +${h.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customers")&&k.length>0&&c("span",{class:"lin-meta lin-meta-customers",title:k.map((T)=>T.name).join(`
`),children:c(te,{children:[c(qi,{},void 0,!1,void 0,this),c("span",{class:"lin-ellipsis",children:k[0].name},void 0,!1,void 0,this),k.length>1&&` +${k.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customerRevenue")&&b>0&&c("span",{class:"lin-meta lin-meta-revenue",title:"Customer revenue",children:c(te,{children:ts(b)},void 0,!1,void 0,this)},void 0,!1,void 0,this),y&&c("span",{class:"lin-meta lin-meta-in-status",title:`In ${e.state.name} for ${y}`,children:c(te,{children:[c(Qi,{},void 0,!1,void 0,this),y]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("estimate")&&g&&c("span",{class:"lin-meta lin-meta-estimate",title:"Estimate",children:c(te,{children:g},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("dueDate")&&e.dueDate&&c("span",{class:`lin-meta lin-meta-due sui-small ${m!==null&&m<0?"lin-overdue":"sui-muted"}`,title:"Due date",children:he(e.dueDate)},void 0,!1,void 0,this),t.has("creator")&&e.creator&&c("span",{class:"lin-meta lin-meta-creator",title:`Created by ${e.creator.name}`,children:c(Fe,{name:e.creator.name,url:e.creator.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Zi=/^[A-Za-z]{1,7}-\d+$/;var bs=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!Zi.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()},je=(e)=>{let t=typeof e==="string"?e:Array.isArray(e)?e.filter((s)=>typeof s==="string").join(","):"",r=[],n=[],o=0;for(let s of t.split(/[,;\s]+/)){if(!s)continue;let a=bs(s);if(!a){if(n.length<3&&!n.includes(s.slice(0,24)))n.push(s.slice(0,24));continue}if(r.includes(a))continue;if(r.length>=25)o+=1;else r.push(a)}return{ids:r,skipped:n,cut:o}},Is=(e,t)=>{if(typeof e!=="string")return"";let r=e.replace(/\s+/g," ").trim();return r.length>t?`${r.slice(0,t-3).trimEnd()}...`:r},Cs=(e)=>Is(e,160),vs=(e)=>Is(e,400),ws=(e)=>{let t=new Map;for(let r of e){let[n,o]=r.split("-"),s=t.get(n)??[];s.push(Number(o)),t.set(n,s)}return{or:[...t].map(([r,n])=>({team:{key:{eqIgnoreCase:r}},number:{in:n}}))}},Ms=(e)=>{let t=new Map;for(let n of e){let o=t.get(n.team.id)??[];o.push(n),t.set(n.team.id,o)}let r=new Map;for(let n of t.values())n.sort((o,s)=>o.position-s.position),n.forEach((o,s)=>r.set(o.id,(s+1)/(n.length+1)));return r},Us=(e)=>`${e.identifier} ${e.title}`.slice(0,1900),_n=(e)=>{let t=e?.trim().split(/\s+/,1)[0];return bs(t)};var Ns=["triage","backlog","unstarted","started","completed","canceled","duplicate"],Ps=(e,t)=>Ns.indexOf(e.type)-Ns.indexOf(t.type)||e.position-t.position;var Ls=["No priority","Urgent","High","Medium","Low"];var ne=(e,t="inline-flex")=>(r)=>{let n=Jo(e,r);return c("span",{ref:n,style:{display:t}},void 0,!1,void 0,this)},Ke=ne(xe),Ds=ne(Dt),gm=ne(Yr,"block"),ym=ne(Jr,"block"),Om=ne(Qr),Am=ne(sn),Rm=ne(Zr),Kt=ne(rn),Le=ne(nn,"block"),$s=ne(tn,"block"),xm=ne(on,"block"),km=ne(en,"block"),bm=ne(qr),fn=ne($t),Im=ne($t,"block"),Cm=ne(Dt,"block");var ea=async(e)=>{let t=await ve(us,{filter:ws(e)}),r=new Map;for(let o of t.issues.nodes)r.set(o.identifier.toUpperCase(),o);let n=[...new Set(t.issues.nodes.filter((o)=>o.state.type==="started").map((o)=>o.team.id))];if(n.length>0)try{Ss(Ms((await ve(ps,{teamIds:n})).workflowStates.nodes))}catch{}return r},Gs=(e)=>un(e.length>0?`block:${e.join(",")}`:null,()=>ea(e));var We=({ids:e,children:t})=>{let r=Gs(e);if(r.data)return c(ge,{children:t(r.data)},void 0,!1,void 0,this);if(r.error){let n=r.error instanceof se?r.error:new se("network",String(r.error));if(n.kind==="disconnected")return c($s,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber to see these issues.",action:{label:"Connect Linear",onClick:()=>{D.oauthStart()}}},void 0,!1,void 0,this);return c(Le,{tone:"error",title:"Could not load from Linear",body:n.message,action:{label:"Retry",onClick:()=>r.refresh()}},void 0,!1,void 0,this)}return c("div",{class:"lin-block-wait",children:c(Kt,{label:"Loading from Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},nt=({skipped:e,cut:t})=>{if(e.length===0&&t===0)return null;let r=[e.length>0?`Not an issue key: ${e.join(", ")}.`:"",t>0?`${t} more not shown.`:""].filter(Boolean);return c("div",{class:"sui-small sui-muted",children:r.join(" ")},void 0,!1,void 0,this)},ze=({id:e})=>c("div",{class:"lin-block-missing sui-small sui-muted",children:[c("span",{class:"sui-mono",children:e},void 0,!1,void 0,this),c("span",{children:"Not found in Linear, or you cannot see it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this);async function De(e,t,r,n={}){try{await e.toast({kind:t,message:r,...n.dismiss?{dismiss:!0}:{}})}catch{}}var na=(e)=>[...e??[]].sort(Ps);var En=(e)=>na(e).filter((t)=>t.type==="started"||t.type==="unstarted"&&/plan/i.test(t.name)),Wt=(e,t,r)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let n=En(t);if(e.state.type==="started"||n.some((a)=>a.id===e.state.id))return null;let o=r?.trim().toLowerCase(),s=n.filter((a)=>a.type==="started");return(o?n.find((a)=>a.name.trim().toLowerCase()===o):void 0)??s.find((a)=>/^in progress$/i.test(a.name.trim()))??s.find((a)=>/progress|doing|working|development|started/i.test(a.name))??s.find((a)=>!/block|hold|pause|wait|stuck/i.test(a.name))??s[0]??null};var Hs=(e,t)=>{let r=t.trim().replace(/^refs\/heads\//,"").toLowerCase();if(!r)return null;return e.find((n)=>n.status==="ready"&&n.branch.replace(/^refs\/heads\//,"").toLowerCase()===r)?.directory??null},mn=(e,t)=>t>0?`${e}-${t+1}`:e;var oa=["No priority","Urgent","High","Medium","Low"],Vs=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${oa[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],r=e.comments.nodes.slice(-5).map((o)=>`${o.user?.name??"Someone"} (${he(o.createdAt)}): ${o.body}`),n=[...t,...r.length?["","Latest comments:",...r]:[]].filter((o,s,a)=>o||a[s-1]).join(`
`);return n.length>15000?`${n.slice(0,15000)}
[cut]`:n};var Xs=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof se&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof se&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},sa=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),Bs=(e,t)=>as((r,n)=>{if((r.startsWith("issues:")||r.startsWith("view-issues:"))&&sa(n)&&n.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...n,issues:n.issues.map((a)=>a.id===e?{...a,...s}:a)}}if(r.startsWith("issue:")&&typeof n==="object"&&n!==null&&n.id===e){let{team:o,...s}=t;return{...n,...s}}return n}),ia=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new se("graphql","Linear did not save the change.");return e.issueUpdate.issue},Fs=async(e,t)=>{let r=Bs(e.id,t.patch);try{let n=ia(await ve(_s,{id:e.id,input:t.input}));if(Bs(e.id,n),cs(`issue:${e.identifier}`),"stateId"in t.input)Bt("children:");return n}catch(n){throw r(),n}};var js=async(e,t)=>{let r=await D.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:Vs(e),data:{issueId:e.id,identifier:e.identifier},worktree:t.existing?{kind:"existing",directory:t.existing}:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(r.sessionId===null)return{started:!1,directory:r.directory};let n=t.state??Wt(e,e.team.states.nodes),o=!1,s=null;if(t.move&&n)try{await Fs(e,{input:{stateId:n.id},patch:{state:n}}),o=!0}catch(a){s=Xs(a)}return{started:!0,sessionId:r.sessionId,target:n,moved:o,moveError:s}},Sn=(e)=>e.replace(/\/+$/,""),Ks=async(e,t)=>{if(!e)return null;try{let r=Sn(e),n=(await D.listProjects())?.projects??[],o=n.find((s)=>Sn(s.directory)===r)??null;if(!o){for(let s of n)if(((await D.listWorktrees(s.id))?.worktrees??[]).some((l)=>Sn(l.directory)===r)){o=s;break}}if(!o)return null;return Hs((await D.listWorktrees(o.id))?.worktrees??[],t)}catch{return null}},Ws=async(e)=>{try{await D.openSession(e)}catch{}};var zs=async(e)=>{try{let t=await D.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},aa=async(e,t)=>{try{return await D.storage.set(e,t),!0}catch{return!1}};var Ys=async()=>await zs("pref:start-moves")!==!1;var Js=async(e)=>{let t=await zs(`pref:start-state:${e}`);return typeof t==="string"?t:null},qs=(e,t)=>aa(`pref:start-state:${e}`,t);var Tn=(e)=>e instanceof Error?e.message:String(e),Qs=({issue:e,onClose:t})=>{let[r,n]=X(null),[o,s]=X(null),[a,l]=X(!0),[_,f]=X(!0),[p,g]=X(!1),[m,u]=X(null),[h,k]=X(null),[b,y]=X(null),[T,w]=X(0),[M,ie]=X(null),[de,ue]=X(null),[Y,ae]=X(null),J=Ht()?.directory??null;if(me(()=>{let U=!0;return n(null),s(null),Promise.all([ve(ds,{id:e.identifier}),Ys().catch(()=>!0),Js(e.team.id).catch(()=>null)]).then(([_e,$e,re])=>{if(!U)return;n(_e.issue),f($e),ue(re),Ks(J,_e.issue.branchName).then((ot)=>{if(U)k(ot)})},(_e)=>{if(U)s(Tn(_e))}),()=>{U=!1}},[e.identifier]),Y)return c("div",{class:"lin-block-start","data-state":"started",children:c("div",{class:"sui-small",children:Y},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(o)return c("div",{class:"lin-block-start",children:c(Le,{tone:"error",title:"Could not read the issue",body:o,action:{label:"Close",onClick:t}},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(!r)return c("div",{class:"lin-block-start",children:c(Kt,{label:"Reading the issue"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let G=En(r.team.states.nodes),E=G.find((U)=>U.id===M)??Wt(r,r.team.states.nodes,de),S=m??h,pe=mn(r.branchName,T),we=async()=>{g(!0),y(null);try{let U=await js(r,{worktree:a,move:_&&Boolean(E),existing:S,branch:pe,state:E});if(!U.started){u(U.directory);return}if(U.moveError)await De(D,"error",`Session started, but ${r.identifier} was not moved: ${U.moveError}`);if(U.moved&&U.target)qs(r.team.id,U.target.name).catch(()=>{return});let _e=`Started a session for ${r.identifier}${U.moved?` and moved it to ${U.target.name}`:""}.`;if(await De(D,"success",_e),ae(_e),U.moved)Bt("block:");await Ws(U.sessionId)}catch(U){let _e=a&&!S;if(_e)w((re)=>re+1);let $e=_e?` A branch named ${pe} may already exist. Start again to try ${mn(r.branchName,T+1)}, or turn off "Work in a new worktree".`:"";y(`${Tn(U).replace(/\.+$/,"")}.${$e}`),await De(D,"error",`Could not start a session: ${Tn(U)}`)}finally{g(!1)}};return c("div",{class:"lin-block-start","data-state":"options",children:[m&&c(Le,{tone:"warning",title:"The worktree is ready, but the session did not start",body:`Retry starts the session in ${m}.`},void 0,!1,void 0,this),!m&&h&&c(Le,{tone:"info",title:"This issue already has a worktree",body:`The session starts in ${h}, on branch ${r.branchName}.`},void 0,!1,void 0,this),b&&c(Le,{tone:"error",title:"Could not start a session",body:b},void 0,!1,void 0,this),c(fn,{label:S?"Work in the existing worktree":"Work in a new worktree",description:`Branch ${pe}`,checked:a||Boolean(S),disabled:Boolean(S)||p,onChange:l},void 0,!1,void 0,this),c(fn,{label:E?"Move the issue to":"Move the issue",description:E?void 0:`${r.identifier} is already ${r.state.name}.`,checked:_&&Boolean(E),disabled:!E||p,onChange:f},void 0,!1,void 0,this),E&&G.length>1&&c(Ds,{value:E.id,options:G.map((U)=>({id:U.id,label:U.name})),disabled:!_||p,onChange:ie},void 0,!1,void 0,this),c("div",{class:"sui-row",children:[c(Ke,{label:p?"Starting...":m?"Retry in that worktree":h?"Start in that worktree":"Start session",size:"sm",disabled:p,onClick:()=>{we()}},void 0,!1,void 0,this),c(Ke,{label:"Cancel",variant:"ghost",size:"sm",disabled:p,onClick:t},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var ca=({issue:e})=>{let[t,r]=X(!1),n=e.labels.nodes;return c(zo,{class:"lin-block-card",children:[c("div",{class:"lin-block-title",children:[c(rt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:16},void 0,!1,void 0,this),c("span",{class:"lin-block-key sui-mono sui-muted",children:e.identifier},void 0,!1,void 0,this),c("span",{class:"lin-block-name",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),c(Yo,{items:[["Status",c("span",{class:"lin-block-value",children:[c(rt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this),e.state.name]},void 0,!0,void 0,this)],["Priority",c("span",{class:"lin-block-value",children:[c(Xt,{priority:e.priority},void 0,!1,void 0,this),Ls[e.priority]]},void 0,!0,void 0,this)],["Assignee",e.assignee?c("span",{class:"lin-block-value",children:[c(Fe,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this),e.assignee.name]},void 0,!0,void 0,this):c("span",{class:"sui-muted",children:"Unassigned"},void 0,!1,void 0,this)],...e.project?[["Project",c("span",{class:"lin-block-value",children:[c(Ft,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),e.project.name]},void 0,!0,void 0,this)]]:[],...n.length>0?[["Labels",c("span",{class:"lin-block-value lin-block-chips",children:n.map((o)=>c(jt,{label:o},o.id,!1,void 0,this))},void 0,!1,void 0,this)]]:[],...e.dueDate?[["Due",c(te,{children:he(e.dueDate)},void 0,!1,void 0,this)]]:[],["Updated",c("span",{class:"sui-muted",children:Qo(e.updatedAt)},void 0,!1,void 0,this)]]},void 0,!1,void 0,this),c("div",{class:"sui-row",children:[c(Ke,{label:"Open in Linear",variant:"outline",size:"sm",onClick:()=>{D.openUrl(e.url)}},void 0,!1,void 0,this),c(Ke,{label:"Start session",variant:"outline",size:"sm",disabled:t,onClick:()=>r(!0)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),t&&c(Qs,{issue:e,onClose:()=>r(!1)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Zs=({args:e})=>{let{ids:t}=je(e.id),r=t[0];if(!r)return c("div",{class:"sui-muted",children:"LinearIssue needs an issue identifier such as ENG-123."},void 0,!1,void 0,this);return c(We,{ids:[r],children:(n)=>{let o=n.get(r);return o?c(ca,{issue:o},void 0,!1,void 0,this):c(ze,{id:r},void 0,!1,void 0,this)}},void 0,!1,void 0,this)};var la=new Set(["id","status","assignee","priority","project","dueDate","cycle","estimate","labels","links","created","changes"]),zt=({issue:e,selected:t,cursor:r,properties:n=la,hideProject:o,compact:s,subIssues:a,extras:l,depth:_=0,disabled:f,onOpen:p})=>c("button",{type:"button",class:"lin-issue-row","aria-selected":t?"true":"false",disabled:f,"data-cursor":r?"true":"false","data-issue":e.identifier,"data-depth":_||void 0,style:_?{paddingLeft:`${8+_*22}px`}:void 0,onClick:()=>p(e),title:e.title,children:[n.has("priority")||s?c(Xt,{priority:e.priority},void 0,!1,void 0,this):null,n.has("id")||s?c("span",{class:"lin-issue-key sui-mono",children:e.identifier},void 0,!1,void 0,this):null,n.has("status")||s?c(rt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this):null,c("span",{class:"lin-issue-title",children:e.title},void 0,!1,void 0,this),!s&&c("span",{class:"lin-issue-meta",children:c(ks,{issue:e,properties:n,subIssues:a,hideProject:o,extras:l},void 0,!1,void 0,this)},void 0,!1,void 0,this),(n.has("assignee")||s)&&(e.assignee?c("span",{class:"lin-meta-assignee",title:e.assignee.name,children:c(Fe,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this):c("span",{class:"lin-avatar-empty","aria-label":"No assignee"},void 0,!1,void 0,this)),!s&&n.has("created")&&c("span",{class:"lin-meta-created sui-small sui-muted",title:"Created",children:he(e.createdAt)},void 0,!1,void 0,this),!s&&n.has("updated")&&c("span",{class:"lin-meta-updated sui-small sui-muted",title:"Updated",children:he(e.updatedAt)},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var hn=new Set(["id","status","assignee","priority","labels","dueDate"]),ei=({args:e})=>{let{ids:t,skipped:r,cut:n}=je(e.ids),o=Cs(e.title);if(t.length===0)return c(et,{title:o||void 0,children:[c("div",{class:"sui-muted",children:"No issue identifiers to show."},void 0,!1,void 0,this),c(nt,{skipped:r,cut:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return c(et,{title:o||void 0,children:[c(We,{ids:t,children:(s)=>c("div",{class:"lin-groups lin-block-rows",children:t.map((a)=>{let l=s.get(a);return l?c(zt,{issue:l,properties:hn,onOpen:(_)=>{D.openUrl(_.url)}},a,!1,void 0,this):c(ze,{id:a},a,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),c(nt,{skipped:r,cut:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var ti=({args:e,answered:t})=>{let{ids:r,skipped:n,cut:o}=je(e.ids),s=vs(e.question),[a,l]=X(null),[_,f]=X(!1),p=t??a,g=_n(t)??a,m=async(u)=>{if(_||p)return;f(!0);try{await D.answerBlock(Us(u)),l(u.identifier)}catch(h){await De(D,"error",`Could not send your choice: ${h instanceof Error?h.message:String(h)}`)}finally{f(!1)}};return c(et,{title:s||"Pick an issue",children:[r.length===0?c("div",{class:"sui-muted",children:"No issues to choose from."},void 0,!1,void 0,this):c(We,{ids:r,children:(u)=>c("div",{class:"lin-groups lin-block-rows","data-answered":p?"true":"false",children:r.map((h)=>{let k=u.get(h);return k?c(zt,{issue:k,properties:hn,selected:g===h,disabled:Boolean(p)||_,onOpen:(b)=>{m(b)}},h,!1,void 0,this):c(ze,{id:h},h,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),c(nt,{skipped:n,cut:o},void 0,!1,void 0,this),p?c("div",{class:"sui-small sui-muted","data-state":"answered",children:t?`${_n(t)?"You chose":"You answered"}: ${t}`:`You chose ${a}.`},void 0,!1,void 0,this):r.length>0&&c("div",{class:"sui-small sui-muted",children:"Click an issue to choose it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var da=({call:e})=>{switch(e.name){case"LinearIssue":return c(Zs,{args:e.args},void 0,!1,void 0,this);case"LinearIssueList":return c(ei,{args:e.args},void 0,!1,void 0,this);case"LinearPickIssue":return c(ti,{args:e.args,answered:e.answered},void 0,!1,void 0,this);default:return c("div",{class:"sui-muted",children:["This Linear extension has no block called ",e.name.slice(0,40),"."]},void 0,!0,void 0,this)}},ua=()=>{Ht();let[e,t]=X(null),r=Ce(null);return me(()=>D.onBlock(t),[]),me(()=>{let n=r.current;if(!n)return;let o=0,s=new ResizeObserver(()=>{let a=Math.min(Math.ceil(n.getBoundingClientRect().height),dt);if(a===o)return;o=a,D.setHeight(a).catch(()=>{return})});return s.observe(n),()=>s.disconnect()},[]),c("div",{class:"lin-block",ref:r,style:{maxHeight:dt},children:e?c(da,{call:e},`${e.name}:${JSON.stringify(e.args)}`,!1,void 0,this):c("div",{class:"sui-muted",children:"Waiting for the agent"},void 0,!1,void 0,this)},void 0,!1,void 0,this)};Oo(c(ua,{},void 0,!1,void 0,this),document.getElementById("root"));})();

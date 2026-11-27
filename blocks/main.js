(()=>{var B="openchamber.sdk",H=1;var Zn=`
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
`;function eo(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(o)=>{let r=o.target===e?t:o.target;if(!(r instanceof Element))return;if(!r.hasAttribute("data-oc-scrolling"))r.setAttribute("data-oc-scrolling","");let s=n.get(r);if(s!==void 0)clearTimeout(s);n.set(r,setTimeout(()=>{n.delete(r),r.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var sc=`(${eo.toString()})(document);`;var to=128,no=65536;var zt=128;var qt=65536;var Nr=/^[a-z][a-z0-9-]{0,39}$/;var Mr=(e)=>Object(e)===e&&!Array.isArray(e),oo=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),Pr=(e)=>String(e)===e&&e.length>=1&&e.length<=60,Ur=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Lr=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!Mr(n)||!Nr.test(n.id)||!Pr(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!oo(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!oo(n,["kind","id","label","value","options","disabled"]))return!1;if(!Ur(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let o=new Set;for(let r of n.options){if(!Mr(r)||!oo(r,["value","label"])||!Ur(r.value)||!Pr(r.label)||o.has(r.value))return!1;o.add(r.value)}if(!o.has(n.value))return!1}return!0};var Dr=["{id}","{segment}","{segments+}"];var Zl=new Set(Dr);var Yt=960;var $r=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var td=new Set($r);var Jt=20000000,Qt=256;var ro=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Gr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var Br=/^[A-Za-z0-9_-]{1,80}$/;var Hr=["left","right","top","bottom"];var jr=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let o=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let r of o)if(!jr(r,t+1,n))return!1;return!0},so=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(so);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(so)}return String(e)===e||Number.isFinite(e)},io=(e)=>{try{if(String(e.id)!==e.id||!Br.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!Hr.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!jr(e.data)||!so(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var co=2000;var Vr=["file","directory","other","missing"],lo=(e)=>Boolean(e&&"sessionId"in e),uo=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Xr=/^[0-9a-f]{7,64}$/i,po=(e)=>Xr.test(e),Zt=500,en=32000,Wr=16000,Kr=128,zr=200,qr=2000,Yr=16000,Jr=80,Qr=200,Zr=16000;var es=2000;var fo=20000,tn=1024,nn=2000000;var on=64000,rn=8000,mo=4000;var _o=960000;var ts=999,ns=1e4,Pt=500,os=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],rs=["stopped","starting","ready","failed"],ac=new Set(os),ss=(e)=>ac.has(e),is=(e)=>e&&ss(e)?e:"HOST_REJECTED",Et=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Et);if(Object(e)===e)return Object.values(e).every(Et);return!1},as=(e)=>Et(e)&&JSON.stringify(e).length<=Zr,Fr=(e)=>e?.trim().slice(0,Qr)??"",ht=(e)=>{let t=e.id.trim().slice(0,Kr),n=e.title.trim().slice(0,zr),o=e.url.trim().slice(0,qr),r=e.text?.trim().slice(0,Yr),s=e.author?.trim().slice(0,Jr),a=e.kind==="pull"?"pull":"issue",c={providerId:e.providerId.trim(),id:t,title:n||t,url:o,kind:a};if(r)c.text=r;if(s)c.author=s;if(a==="pull"){let f=Fr(e.branches?.head),m=Fr(e.branches?.base);if(f&&m)c.branches={head:f,base:m}}if(as(e.data))c.data=e.data;return c},Eo=(e)=>{let t=ht(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},ho=(e)=>{let t={text:e.text.trim().slice(0,Wr)};if(e.send)t.send=!0;return t},So=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ts,Math.max(0,Math.round(e)))},go=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(ns,Math.max(0,Math.ceil(e)))};var St=(e)=>e.length>0&&e.length<=tn&&!e.includes("\x00")&&!e.includes("\\");var sn=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>es)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},cc=new Set(rs),To=(e)=>Boolean(e&&"status"in e&&cc.has(String(e.status))&&!("body"in e)),an=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),yo=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),bo=(e)=>Boolean(e&&"written"in e&&e.written===!0),ko=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),lc=new Set(Vr),xo=(e)=>Boolean(e&&"kind"in e&&"size"in e&&lc.has(String(e.kind))&&Number.isFinite(e.size)),Ro=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),dc=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),uc=(e)=>Object(e)===e?e:null,ao=(e)=>String(e)===e&&e.length>0,pc=(e)=>{if(!ao(e.id))return null;if(e.ok===!0){let t={channel:B,v:H,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&ao(e.error))return{channel:B,v:H,type:"result",id:e.id,ok:!1,error:e.error,code:is(ao(e.code)?e.code:void 0)};return null},Ao=(e)=>{let t=uc(e);if(!t||t.channel!==B||t.v!==H)return null;if(t.type==="result")return pc(t);if(!dc.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var cs=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),fc=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class P extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var ls=()=>Promise.reject(new P("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),cn=()=>Promise.reject(new P("BAD_PATH",`File path must be 1 to ${tn} characters without NUL or backslash.`)),ln=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new P("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},D=(e)=>(e.value+=1,`oc-${e.value}`),Io=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new P("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((l)=>l===t.parent),o=e.requestTimeoutMs??fo,r=new Set,s=new Set,a=new Set,c=new Set,f=new Set,m=new Set,u=new Set,h=new Set,E=new Set,d=new Set,y=new Set,O=new Set,A=[],k=null,b=null,N=new Set,v=new Set,j=null,V=null,ae=!1,z=new Map,re=new Map,X=new Map,W=!1,S={value:0},T=null,ue=null,_=!1,Q=!1,me=null,ye=(l)=>{if(!l)return null;return{sessionId:l.id,phase:l.busy?"started":"completed"}},pe=(l)=>{t.parent.postMessage(l,"*")},L=()=>{if(W||t.parent===t||O.size===0||T?.features?.lateGenerateResults!==!0)return;pe({channel:B,v:H,type:"generate-late-listen"})},x=(l,p)=>{for(let w of l)try{w(p)}catch(M){console.error(M)}},be=(l)=>{if(!(l instanceof MessageEvent))return;if(!n(l.source))return;let p=Ao(l.data);if(!p)return;if(p.type==="workspace"){let M=re.get(p.payload.subscriptionId);if(M)x([M],p.payload.snapshot);return}if(p.type==="shells"){let M=X.get(p.payload.subscriptionId);if(M)x([M],p.payload.snapshot);return}if(p.type==="ready"){if(T=p.payload,ue=ye(p.payload.session),x(r,p.payload),x(s,p.payload.directory),x(a,p.payload.session),ue)x(c,ue);if(x(f,p.payload.connection),x(m,p.payload.settings),x(u,p.payload.item),p.payload.block)x(h,p.payload.block);L();return}if(p.type==="service-event"){x(E,p.payload);return}if(p.type==="generate-late"){if(O.size===0)A.push(p.payload);else x(O,p.payload);return}if(p.type==="directory"){if(T)T={...T,directory:p.payload.directory};x(s,p.payload.directory);return}if(p.type==="session"){if(T)T={...T,session:p.payload.session};if(!p.payload.session)ue=null;else if(ue?.sessionId!==p.payload.session.id)ue=ye(p.payload.session);x(a,p.payload.session);return}if(p.type==="session-lifecycle"){ue=p.payload,x(c,p.payload);return}if(p.type==="connection"){if(T)T={...T,connection:p.payload.connection};x(f,p.payload.connection);return}if(p.type==="settings"){if(T)T={...T,settings:p.payload.settings};x(m,p.payload.settings);return}if(p.type==="item"){if(T)T={...T,item:p.payload.item};x(u,p.payload.item);return}if(p.type==="status-control-event"){x(d,p.payload);return}if(p.type==="popover-closed"){x(y,p.payload);return}if(p.type==="action"){let M=(te)=>{if(!W)pe({channel:B,v:H,type:"action-result",id:p.id,payload:te})},se=b;if(!se){M({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>se(p.payload)).then(()=>M({ok:!0}),(te)=>{let _e=(te instanceof Error?te.message:String(te)).trim();M({ok:!1,error:(_e||"Action failed.").slice(0,Pt)})});return}if(p.type==="file-open"){let M=p.payload;if(V&&Gr(V,M))return;V=M,x(N,p.payload);return}if(p.type==="file-saved"){x(v,p.payload.version);return}if(p.type==="file-snapshot"){let M=(_e)=>{if(!W)pe({channel:B,v:H,type:"file-snapshot-result",id:p.id,payload:_e})},se=(_e)=>M({error:(_e.trim()||"Could not read the edited file.").slice(0,Pt)}),te=j;if(!te){se("This extension does not edit files.");return}Promise.resolve().then(()=>te(p.payload.purpose)).then((_e)=>{if(ro(_e)>Jt){se(`The file is over ${Jt} ${"bytes"in _e?"bytes":"characters"}.`);return}if(_e.version.length>Qt){se(`The snapshot version is over ${Qt} characters.`);return}M({snapshot:"bytes"in _e?{bytes:_e.bytes,version:_e.version}:{content:_e.content,version:_e.version}})},(_e)=>se(_e instanceof Error?_e.message:String(_e)));return}if(p.type==="resolve"){let M=(te)=>{pe({channel:B,v:H,type:"resolve-result",id:p.id,payload:te})},se=k;if(!se){M({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>se(p.payload)).then((te)=>M({item:te?ht(te):null}),(te)=>{let _e=(te instanceof Error?te.message:String(te)).trim();M({error:(_e||"Command failed.").slice(0,Pt)})});return}let w=z.get(p.id);if(!w)return;if(clearTimeout(w.timer),z.delete(p.id),p.ok){w.resolve(p.payload);return}w.reject(new P(p.code,p.error))};t.addEventListener("message",be),pe({channel:B,v:H,type:"hello"});let Z=(l,p=o)=>{if(W||t.parent===t)return Promise.reject(new P("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((w,M)=>{let se=setTimeout(()=>{z.delete(l.id),M(new P("HOST_TIMEOUT","Host did not answer in time."))},p);z.set(l.id,{resolve:w,reject:M,timer:se}),pe(l)})},K=(l)=>Z(l).then(()=>{return}),ee={channel:B,v:H},Ve=(l)=>{if(!W&&t.parent!==t)pe(l)},Ot=()=>Ve({...ee,type:"file-save"}),Ct=(l)=>{if(!cs(l)||!fc(l))return;l.preventDefault(),Ot()},wt=(l)=>{if(!cs(l)||l.key!=="Escape"||T?.surface!=="popover"||!T.popover)return;l.preventDefault(),wr(T.popover.id,"escape").catch(()=>{return})},at=()=>{let l=T?.surface==="popover"?T.popover:void 0;if(!l)return;let p=_||Q;if(me===p)return;me=p,vr(l.id,p).catch(()=>{return})},g=()=>{if(T?.surface!=="popover"||_)return;_=!0,at()},U=(l)=>{if(T?.surface!=="popover"||l.relatedTarget!==null||!_)return;_=!1,at()},G=()=>{if(T?.surface!=="popover"||Q)return;Q=!0,at()},Ae=()=>{if(T?.surface!=="popover"||!Q)return;Q=!1,at()},he=(l,p=1024)=>{if(!l.trim()||l.length>p)throw new P("HOST_REJECTED",`Identity must contain 1 to ${p} characters.`)},vt=async(l)=>{if(l.kind!=="projects")he(l.projectId);let p=await Z({...ee,type:"workspace-read",id:D(S),payload:l});if(!p||!("kind"in p)||!("state"in p)||p.kind!==l.kind)throw new P("HOST_REJECTED","Host did not return workspace data.");return p},Mt=async(l,p)=>{if(l.kind!=="projects")he(l.projectId);let w=D(S);re.set(w,p);try{await K({...ee,type:"workspace-subscribe",id:D(S),payload:{subscriptionId:w,query:l}})}catch(M){if(re.delete(w),!W)pe({...ee,type:"workspace-unsubscribe",id:D(S),payload:{subscriptionId:w}});throw M}return()=>{if(!re.delete(w)||W)return;pe({...ee,type:"workspace-unsubscribe",id:D(S),payload:{subscriptionId:w}})}},Ze=async(l,p)=>{if(l.kind==="session")he(l.sessionId);if(l.kind==="project")he(l.projectId);let w=D(S);X.set(w,p);try{await K({...ee,type:"shells-subscribe",id:D(S),payload:{subscriptionId:w,scope:l}})}catch(M){if(X.delete(w),!W)pe({...ee,type:"shells-unsubscribe",id:D(S),payload:{subscriptionId:w}});throw M}return()=>{if(!X.delete(w)||W)return;pe({...ee,type:"shells-unsubscribe",id:D(S),payload:{subscriptionId:w}})}},ke=async(l)=>{if("key"in l&&(l.key.length===0||l.key.length>to))throw new P("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!Et(l.value))throw new P("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>no)throw new P("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&T?.features?.deviceStorage!==!0)throw new P("UNSUPPORTED","This host does not support device storage.");let p=await Z({...ee,type:"storage",id:D(S),payload:l});if(!p||!("storage"in p)||p.op!==l.op)throw new P("HOST_REJECTED","Host did not return storage data.");return p},wr=(l,p)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===l)?Promise.reject(new P("UNSUPPORTED","This host does not support popovers.")):K({...ee,type:"popover-close",id:D(S),payload:p?{id:l,reason:p}:{id:l}}),vr=(l,p)=>T?.features?.popovers!==!0&&!(T?.surface==="popover"&&T.popover?.id===l)?Promise.reject(new P("UNSUPPORTED","This host does not support popovers.")):K({...ee,type:"popover-anchor",id:D(S),payload:{id:l,active:p}});return t.addEventListener("keydown",wt,!0),t.addEventListener("pointerover",g),t.addEventListener("pointermove",g),t.addEventListener("pointerout",U),t.addEventListener("focus",G),t.addEventListener("blur",Ae),{onAction:(l)=>(b=l,()=>{if(b===l)b=null}),listProjects:async()=>{let l=await vt({kind:"projects"});if(l.kind!=="projects")throw new P("HOST_REJECTED","Expected projects.");return l},listWorktrees:async(l)=>{let p=await vt({kind:"worktrees",projectId:l});if(p.kind!=="worktrees")throw new P("HOST_REJECTED","Expected worktrees.");return p},listSessions:async(l)=>{let p=await vt({kind:"sessions",projectId:l});if(p.kind!=="sessions")throw new P("HOST_REJECTED","Expected sessions.");return p},onProjects:(l)=>Mt({kind:"projects"},(p)=>{if(p.kind==="projects")l(p)}),onWorktrees:(l,p)=>Mt({kind:"worktrees",projectId:l},(w)=>{if(w.kind==="worktrees")p(w)}),onSessions:(l,p)=>Mt({kind:"sessions",projectId:l},(w)=>{if(w.kind==="sessions")p(w)}),onRunningShells:(l,p)=>Ze(l,p),readShellOutput:async(l,p)=>{he(l,zt);let w=p?.cursor;if(w!==void 0&&(!Number.isInteger(w)||w<0))throw new P("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let M=p?.tailBytes;if(M!==void 0&&(!Number.isInteger(M)||M<1||M>qt))throw new P("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${qt}.`);let te=await Z({...ee,type:"shell-output",id:D(S),payload:{shellId:l,cursor:w,tailBytes:M}});if(!te||typeof te.output!=="string"||!Number.isFinite(te.cursor))throw new P("HOST_REJECTED","Host did not return shell output.");return te},stopShell:async(l)=>{if(he(l,zt),(await Z({...ee,type:"shell-stop",id:D(S),payload:{shellId:l}}))?.stopped!==!0)throw new P("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(l)=>{he(l),await K({...ee,type:"open-session",id:D(S),payload:{sessionId:l}})},storage:{get:async(l,p)=>{let w=ln(p),M={op:"get",key:l};if(w)M.scope=w;let se=await ke(M);return se.op==="get"&&se.found?se.value:void 0},set:async(l,p,w)=>{let M=ln(w),se={op:"set",key:l,value:p};if(M)se.scope=M;await ke(se)},delete:async(l,p)=>{let w=ln(p),M={op:"delete",key:l};if(w)M.scope=w;await ke(M)},keys:async(l)=>{let p=ln(l),w={op:"keys"};if(p)w.scope=p;let M=await ke(w);if(M.op!=="keys")throw new P("HOST_REJECTED","Expected storage keys.");return M.keys}},onReady:(l)=>{if(r.add(l),T)l(T);return()=>{r.delete(l)}},onDirectory:(l)=>{if(s.add(l),T)l(T.directory);return()=>{s.delete(l)}},onSession:(l)=>{if(a.add(l),T)l(T.session);return()=>{a.delete(l)}},onSessionLifecycle:(l)=>{if(c.add(l),ue)l(ue);return()=>{c.delete(l)}},onConnection:(l)=>{if(f.add(l),T)l(T.connection);return()=>{f.delete(l)}},onSettings:(l)=>{if(m.add(l),T)l(T.settings);return()=>{m.delete(l)}},onItem:(l)=>{if(u.add(l),T)l(T.item);return()=>{u.delete(l)}},onBlock:(l)=>{if(h.add(l),T?.block)l(T.block);return()=>{h.delete(l)}},onServiceEvent:(l)=>(E.add(l),()=>{E.delete(l)}),onStatusControl:(l)=>(d.add(l),()=>{d.delete(l)}),onPopoverClosed:(l)=>(y.add(l),()=>{y.delete(l)}),setStatusControls:(l)=>{if(T?.features?.statusControls!==!0)return Promise.reject(new P("UNSUPPORTED","This host does not support status controls."));if(!Lr(l))return Promise.reject(new P("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return K({...ee,type:"status-controls",id:D(S),payload:{controls:l}})},openPopover:(l)=>{if(T?.features?.popovers!==!0)return Promise.reject(new P("UNSUPPORTED","This host does not support popovers."));if(!io(l))return Promise.reject(new P("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return K({...ee,type:"popover-open",id:D(S),payload:l})},closePopover:wr,setPopoverAnchorActive:vr,onResolve:(l)=>(k=l,()=>{if(k===l)k=null}),toast:(l)=>{let p=l.message.trim();if(!p||p.length>Zt)return Promise.reject(new P("HOST_REJECTED",`Toast message must contain 1 to ${Zt} characters.`));if(l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>en))return Promise.reject(new P("HOST_REJECTED",`Toast copy text must contain 1 to ${en} characters.`));return K({channel:B,v:H,type:"toast",id:D(S),payload:{...l,message:p}})},openUrl:(l)=>K({channel:B,v:H,type:"open-url",id:D(S),payload:{url:l}}),openCommit:(l)=>po(l)?K({channel:B,v:H,type:"open-commit",id:D(S),payload:{sha:l}}):Promise.reject(new P("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(l)=>K({channel:B,v:H,type:"block-answer",id:D(S),payload:{text:l.trim().slice(0,co)}}),openSurface:(l)=>K({channel:B,v:H,type:"open-surface",id:D(S),payload:{surfaceId:l}}),writeClipboard:(l)=>K({channel:B,v:H,type:"clipboard-write",id:D(S),payload:{text:l}}),compose:(l)=>K({channel:B,v:H,type:"compose",id:D(S),payload:l}),attach:(l)=>K({channel:B,v:H,type:"attach",id:D(S),payload:ht(l)}),startSession:async(l)=>{if(l.projectId!==void 0)he(l.projectId);let p=l.worktree;if(p&&p!==!0)if(p.kind==="existing")he(p.directory);else{if(p.name!==void 0)he(p.name,200);if(p.baseBranch!==void 0)he(p.baseBranch,200)}let w=await Z({channel:B,v:H,type:"start-session",id:D(S),payload:Eo(l)},e.requestTimeoutMs??180000);if(!lo(w))throw new P("HOST_REJECTED","Host did not return a session.");return w},prompt:(l)=>Z({channel:B,v:H,type:"prompt",id:D(S),payload:ho(l)}).then((p)=>{if(!uo(p))throw new P("HOST_REJECTED","Host did not return a prompt result.");return p}),sessionLink:(l)=>K({channel:B,v:H,type:"session-link",id:D(S),payload:ht(l)}),close:()=>K({channel:B,v:H,type:"close",id:D(S)}),oauthStart:()=>K({channel:B,v:H,type:"oauth-start",id:D(S)}),oauthDisconnect:()=>K({channel:B,v:H,type:"oauth-disconnect",id:D(S)}),request:(l)=>(sn(l.path)?Z({channel:B,v:H,type:"request",id:D(S),payload:l}):ls()).then((p)=>{if(!an(p))throw new P("HOST_REJECTED","Host request result was empty.");return p}),serviceRequest:(l)=>(sn(l.path)?Z({channel:B,v:H,type:"service-request",id:D(S),payload:l}):ls()).then((p)=>{if(!an(p))throw new P("HOST_REJECTED","Host service request result was empty.");return p}),serviceStatus:()=>Z({channel:B,v:H,type:"service-status",id:D(S)}).then((l)=>{if(!To(l))throw new P("HOST_REJECTED","Host did not return service status.");return l}),readFile:(l)=>(St(l)?Z({channel:B,v:H,type:"file-read",id:D(S),payload:{path:l}}):cn()).then((p)=>{if(!yo(p))throw new P("HOST_REJECTED","Host did not return file content.");return p}),writeFile:(l,p)=>{if(!St(l))return cn();if(p.length>nn)return Promise.reject(new P("FILE_TOO_LARGE",`Content is over ${nn} characters.`));return Z({channel:B,v:H,type:"file-write",id:D(S),payload:{path:l,content:p}}).then((w)=>{if(!bo(w))throw new P("HOST_REJECTED","Host did not confirm the write.");return w})},listDir:(l)=>(St(l)?Z({channel:B,v:H,type:"file-list",id:D(S),payload:{path:l}}):cn()).then((p)=>{if(!ko(p))throw new P("HOST_REJECTED","Host did not return directory entries.");return p}),stat:(l)=>(St(l)?Z({channel:B,v:H,type:"file-stat",id:D(S),payload:{path:l}}):cn()).then((p)=>{if(!xo(p))throw new P("HOST_REJECTED","Host did not return file status.");return p}),generate:(l)=>{let p=l.prompt.trim(),w=l.system?.trim();if(p.length===0||p.length>on)return Promise.reject(new P("HOST_REJECTED",`Prompt must be 1 to ${on} characters.`));if(w!==void 0&&(w.length===0||w.length>rn))return Promise.reject(new P("HOST_REJECTED",`System prompt must be 1 to ${rn} characters.`));let M=l.maxOutputTokens===void 0?void 0:Math.min(mo,Math.max(1,Math.floor(l.maxOutputTokens)));if(M!==void 0&&!Number.isFinite(M))return Promise.reject(new P("HOST_REJECTED","maxOutputTokens must be a number."));let se={prompt:p};if(w!==void 0)se.system=w;if(M!==void 0)se.maxOutputTokens=M;return Z({channel:B,v:H,type:"generate",id:D(S),payload:se},e.requestTimeoutMs??_o).then((te)=>{if(!Ro(te))throw new P("HOST_REJECTED","Host did not return generated text.");return te})},onLateGenerateResult:(l)=>{O.add(l);for(let p of A.splice(0))x([l],p);return L(),()=>{O.delete(l)}},setBadge:(l)=>K({channel:B,v:H,type:"badge",id:D(S),payload:{count:So(l)}}),setHeight:(l)=>K({channel:B,v:H,type:"resize",id:D(S),payload:{height:go(l)}}),onFileOpen:(l)=>{if(N.add(l),!ae)ae=!0,t.addEventListener("keydown",Ct,!0);if(V)l(V);return()=>{N.delete(l)}},onFileSnapshot:(l)=>(j=l,()=>{if(j===l)j=null}),onFileSaved:(l)=>(v.add(l),()=>{v.delete(l)}),reportFileChange:(l)=>Ve({...ee,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:Ot,reportFileUnsupported:()=>Ve({...ee,type:"file-unsupported"}),dispose:()=>{for(let l of re.keys())pe({...ee,type:"workspace-unsubscribe",id:D(S),payload:{subscriptionId:l}});re.clear();for(let l of X.keys())pe({...ee,type:"shells-unsubscribe",id:D(S),payload:{subscriptionId:l}});if(X.clear(),W=!0,k=null,b=null,j=null,N.clear(),v.clear(),ae)t.removeEventListener("keydown",Ct,!0);t.removeEventListener("message",be),t.removeEventListener("keydown",wt,!0),t.removeEventListener("pointerover",g),t.removeEventListener("pointermove",g),t.removeEventListener("pointerout",U),t.removeEventListener("focus",G),t.removeEventListener("blur",Ae);for(let l of z.values())clearTimeout(l.timer),l.reject(new P("HOST_UNAVAILABLE","Host client was disposed."));z.clear(),r.clear(),s.clear(),a.clear(),c.clear(),f.clear(),m.clear(),u.clear(),h.clear(),E.clear(),d.clear(),y.clear(),O.clear(),A.length=0}}};var ds=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Ed=new Set(ds);var us=["none","agent","user"];var Sd=new Set(us);var q,ms,mc,et,Oo,_n,_s,un,Es,wo,Co,_c,Ut=Symbol.for("pv"),En={},hn=[],Ec=/^m(i|n|o|s|text|space)$/,vo=Array.isArray,hs=hn.slice,lt=Object.assign;function ct(e){e&&e.parentNode&&e.remove()}function pn(e,t,n,o,r){var s={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Ut,__v:r||++ms,__i:-1,__u:0};return!r&&q.vnode&&q.vnode(s),s}function xe(e){return e.children}function fn(e,t){this.props=e,this.context=t,this.__g=0}function tt(e,t){if(t==null)return e.__&&tt(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:tt(e)}function hc(e){var t,n=e.__v,o=n.__e,r=[],s=[],a=e.__P;a&&((t=lt({constructor:Ut},n)).__v=n.__v+1,q.vnode&&q.vnode(t),Mo(a,t,n,e.__n,a.namespaceURI,32&n.__u?[o]:null,r,o||tt(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,ks(r,t,s),n.__=n.__e=null,t.__e!=o&&Ss(t))}function Ss(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),Ss(e)}function ps(e){(8&e.__g||(e.__g|=8,et.push(e),_n++))&&Oo==q.debounceRendering||((Oo=q.debounceRendering)||queueMicrotask)(gs)}function gs(){try{for(var e,t=1;et.length;)et.length>t&&et.sort(_s),e=et.shift(),t=et.length,8&e.__g&&hc(e)}finally{(_n=et.length)&&(Oo||queueMicrotask)(gs)}}function Ts(e,t,n,o,r,s,a,c,f,m,u){var h,E,d,y,O,A,k=o.__k||hn,b=t.length;for(f=Sc(n,t,k,f,b),h=0;h<b;h++)(d=n.__k[h])!=null&&(E=~d.__i&&k[d.__i]||En,d.__i=h,A=Mo(e,d,E,r,s,a,c,f,m,u),y=d.__e,(E.ref!=d.ref||8&E.__u)&&(E.ref&&Po(E.ref,null,d,E),d.ref&&u.push(d.ref,d.__c||y,d)),O=O||y,4&d.__u?(f=ys(d,f,e,!E.__v),E.__e&&(E.__e=null)):typeof d.type=="function"&&A!==void 0?f=A:y&&(f=y.nextSibling),d.__u&=-21);return n.__e=O,f}function Sc(e,t,n,o,r){var s,a,c,f,m,u,h,E,d,y=n.length,O=y,A=0,k=0,b=e.__k=Array(r);for(s=0;s<r;s++)(a=t[s])!=null&&typeof a!="boolean"&&typeof a!="function"?(typeof a!="object"||a.constructor===String?a=b[s]=pn(null,a):vo(a)?a=b[s]=pn(xe,{children:a}):a.constructor===Ut&&a.__b?a=b[s]=pn(a.type,a.props,a.key,a.ref,a.__v):b[s]=a,f=s+A,a.__=e,a.__b=e.__b+1,c=null,~(m=a.__i=gc(a,n,f,O))&&(O--,(c=n[m])&&(c.__u|=2)),c&&c.__v?(a.__u|=16,m==f-1?A--:m==f+1?A++:m!=f&&(m>f?A--:A++,k=1)):(~m||(r>y?A--:r<y&&A++),typeof a.type!="function"&&(a.__u|=4))):b[s]=null;if(k){for(u=[],h=[],s=0;s<r;s++)if((a=b[s])&&16&a.__u){for(A=0,E=u.length;A<E;)u[d=A+E>>1]<a.__i?A=d+1:E=d;u[A]=a.__i,h[s]=A+1}for(A=u.length;s--;)h[s]&&(h[s]==A?A--:b[s].__u|=4)}if(O)for(s=0;s<y;s++)!(c=n[s])||2&c.__u||(c.__e==o&&(o=tt(c)),Uo(c,c));return o}function ys(e,t,n,o){var r,s,a,c;if(typeof e.type=="function"){if(e.props.__P)return t;if(r=e.__k)for(s=0;s<r.length;s++)r[s]&&(r[s].__=e,t=ys(r[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=tt(e))&&!t.parentNode&&(t=null),a=e.__e,c=t;c&&c.nodeType==8;)c=c.nextSibling;for(a!=c&&(!o&&n.moveBefore&&a.parentNode?n.moveBefore(a,t):n.insertBefore(a,t||null)),t=a;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function gc(e,t,n,o){var r,{key:s,type:a}=e,c=t[n],f=c&&!(2&c.__u);if(c===null&&s==null||f&&s==c.key&&a==c.type)return n;if(o>(f?1:0)){for(r=n-1;r>=0;r--)if((c=t[r])&&!(2&c.__u)&&s==c.key&&a==c.type)return r;for(r=n+1;r<t.length;r++)if((c=t[r])&&!(2&c.__u)&&s==c.key&&a==c.type)return r}return-1}function fs(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function dn(e,t,n,o,r){var s,a;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof o=="string"&&(e.style.cssText=o=""),o)for(t in o)n&&t in n||fs(e.style,t);if(n)for(t in n)o&&n[t]==o[t]||fs(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof o!="function"&&(o=null),(e.__e||(e.__e={}))[t]=n,n&&o||(a=Co[t]||(Co[t]=Tc(t)),(e.__a||(e.__a={}))[t]=wo,s=t!=(t=t.replace(Es,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,a,s):e.removeEventListener(t,a,s));else{if(r=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(c){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function Tc(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[un]==null)t[un]=wo++;else if(t[un]<this.__a[e])return;return n(q.event?q.event(t):t)}}}function Mo(e,t,n,o,r,s,a,c,f,m){var u,h,E,d,y,O,A,k,b,N,v,j,V,ae,z,re,X,W,S=t.type;if(t.constructor!==Ut)return null;128&n.__u&&(f=32&n.__u,u=n.__c.__z)&&(t.__u|=f,h=s=[],u.nodeType==8?c=mn(u,s):s.push(u),c=s[0]||c),(u=q.__b)&&u(t);e:if(typeof S=="function"){E=a.length;try{if(k=t.props,b=(u=S.prototype)&&u.render,N=(u=S.contextType)&&o[u.__c],v=u?N?N.props.value:u.__:o,(d=n.__c)?(t.__c=d,2&d.__g&&(d.__g|=1)):(b?t.__c=d=new S(k,v):(t.__c=d=new fn(k,v),d.constructor=S,d.render=bc),N&&N.sub(d),d.state||(d.state={}),d.__n=o,d.__g|=8,d.__h=[],d.__k=[]),b&&(d.__s||(d.__s=d.state),S.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=lt({},d.__s)),lt(d.__s,S.getDerivedStateFromProps(k,d.__s)))),y=d.props,O=d.state,d.__v=t,n.__c){if(k!==y&&b&&!S.getDerivedStateFromProps&&d.componentWillReceiveProps&&d.componentWillReceiveProps(k,v),t.__v==n.__v&&!(8&d.__g)||!(4&d.__g)&&d.shouldComponentUpdate&&d.shouldComponentUpdate(k,d.__s,v)===!1){t.__v!=n.__v&&(d.props=k,d.state=d.__s,d.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(T){T&&(T.__=t)}),hn.push.apply(d.__h,d.__k),d.__k=[],d.__h.length&&a.push(d),c=tt(n);break e}d.componentWillUpdate&&d.componentWillUpdate(k,d.__s,v),b&&d.componentDidUpdate&&d.__h.push(function(){d.componentDidUpdate(y,O,A)})}else b&&!S.getDerivedStateFromProps&&d.componentWillMount&&d.componentWillMount(),b&&d.componentDidMount&&d.__h.push(d.componentDidMount);d.context=v,d.props=k,d.__P=e,d.__g&=-5,j=q.__r,V=b?25:0;do d.__g&=-9,j&&j(t),u=d.render(d.props,d.state=d.__s,d.context);while(8&d.__g&&++V<25);b&&(hn.push.apply(d.__h,d.__k),d.__k=[]),d.state=d.__s,d.getChildContext&&(o=lt({},o,d.getChildContext())),b&&n.__c&&d.getSnapshotBeforeUpdate&&(A=d.getSnapshotBeforeUpdate(y,O)),ae=u&&u.type===xe&&u.key==null?u.props.children:u,k.__P&&(u=c,r=(e=k.__P).namespaceURI,f=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(T){T&&Uo(T,T)}),n.__k=null),c=n.__k?tt(n,0):null),c=Ts(e,vo(ae)?ae:[ae],t,n,o,r,s,a,c,f,m),k.__P&&(t.__e=null,c=u),t.__u&=-161,h&&h.some(ct),d.__h.length&&a.push(d),1&d.__g&&(d.__g&=-4)}catch(T){if(a.length=E,t.__v=null,f||s)if(T&&T.then){if(t.__u|=128|f,s){for(~(X=s.indexOf(c||void 0))||(X=s.length);(W=s[X-1])&&W.nodeType==8;)X--;for(;X<s.length;X++)if(W=s[X])if(s[X]=null,z){if(W==re)break}else{if(W.nodeType!=8)break;W.data.startsWith("$s")&&(re=mn(z=W))}}if(!z){for(;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;z=c}(u=mn(z=t.__c.__z||(t.__c.__z=z)))?(t.__e=z,c=u):t.__e=c,c=c&&c.nextSibling}else s&&s.some(ct);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),T&&T.then||bs(t),q.__e(T,t,n)}}else c=t.__e=yc(n.__e,t,n,o,r,s,a,f,m,e);return(u=q.diffed)&&u(t),c}function mn(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function bs(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(bs))}function ks(e,t,n){for(var o=0;o<n.length;)Po(n[o++],n[o++],n[o++]);q.__c&&q.__c(t,e),e.some(function(r){try{e=r.__h,r.__h=[],e.some(function(s){s.call(r)})}catch(s){q.__e(s,r.__v)}})}function yc(e,t,n,o,r,s,a,c,f,m){var u,h,E,d,y,O,A,k,b=n.props||En,{props:N,type:v}=t;if(v=="svg"?r="http://www.w3.org/2000/svg":v=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),s){for(u=0;u<s.length;u++)if((y=s[u])&&(v?y.localName==v:y.nodeType==3)){e=y,s[u]=null;break}}if(!e){if(k=m.ownerDocument||document,!v)return k.createTextNode(N);e=k.createElementNS(r,v,N.is?N:m),c&&(q.__m&&q.__m(t,s),c=!1),s=null}if(v){if(m=v=="template"&&e.content||e,s=v=="textarea"&&N.defaultValue!=null?null:s&&hs.call(m.childNodes),!c&&s)for(b={},u=0;u<e.attributes.length;u++)b[(y=e.attributes[u]).name]=y.value;for(u in b)y=b[u],u=="dangerouslySetInnerHTML"?E=y:u=="children"||(u in N)||u=="value"&&("defaultValue"in N)||u=="checked"&&("defaultChecked"in N)||dn(e,u,null,y,r);for(u in N)y=N[u],u=="children"?d=y:u=="dangerouslySetInnerHTML"?h=y:u=="value"?O=y:u=="checked"?A=y:c&&typeof y!="function"||b[u]===y||dn(e,u,y,b[u],r);h?(c||E&&(h.__html==E.__html||h.__html==e.innerHTML)||(e.innerHTML=h.__html),t.__k=[]):(E&&(e.textContent=""),(v=="foreignObject"||r=="http://www.w3.org/1998/Math/MathML"&&Ec.test(v))&&(r="http://www.w3.org/1999/xhtml"),Ts(m,vo(d)?d:[d],t,n,o,r,s,a,s?s[0]:n.__k&&tt(n,0),c,f),s&&s.some(ct)),c&&v!="textarea"||(u="value",v=="progress"&&O==null?e.removeAttribute(u):O==null||O===e[u]&&(v!="progress"||O)||dn(e,u,O,b[u],r),u="checked",A!=null&&A!=e[u]&&dn(e,u,A,b[u],r))}else b===N||c&&e.data==N||(e.data=N);return e}function Po(e,t,n,o){try{typeof e=="function"?t?t.__x=e(t)||1:o&&(o=o.__c||o.__e)&&(t=o.__x)&&(o.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(r){q.__e(r,n)}}function Uo(e,t,n){var o,r,s,a;if(q.unmount&&q.unmount(e),!(o=e.ref)||o.current&&o.current!=e.__e||Po(o,null,t,e),o=e.__c){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(c){q.__e(c,t)}o.__P=o.__n=null}if(o=e.__k)for(a=0;a<o.length;a++)o[a]&&Uo(o[a],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(o=e.__c)&&(o=o.__z)&&(r=mn(o,s=[]))&&(o==e.__e&&s.some(ct),ct(r),ct(o)),n||ct(e.__e),e.__e=e.__c=e.__=null}function bc(e,t,n){return this.constructor(e,n)}function xs(e,t){var n,o,r,s;q.__&&q.__(e,t),t.nodeType==9&&(t=t.documentElement),o=(n=e&&32&e.__u)?null:t.__k,t.__k=pn(xe,{children:[e]}),r=[],s=[],Mo(t,t.__k,o||En,En,t.namespaceURI,o?null:t.firstChild?hs.call(t.childNodes):null,r,o?o.__e:t.firstChild,n,s),ks(r,t.__k,s),t.__k.props.children=null}q={__e:function(e,t,n,o){for(var r,s,a;t=t.__;)if((r=t.__c)&&!(1&r.__g)){r.__g|=4;try{if((a=(s=r.constructor)&&s.getDerivedStateFromError)&&r.setState(s.getDerivedStateFromError(e)),r.componentDidCatch&&(r.componentDidCatch(e,o||{}),a=1),a&&8&r.__g)return void(r.__g|=2)}catch(c){e=c}}throw _n=0,e}},ms=0,mc=function(e){return e!=null&&e.constructor===Ut},fn.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=lt({},this.state)),typeof e=="function"&&(e=e(lt({},n),this.props)),e&&(lt(n,e),this.__v&&(t&&this.__k.push(t),ps(this)))},fn.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),ps(this))},fn.prototype.render=xe,et=[],_n=0,_s=function(e,t){return e.__v.__b-t.__v.__b},un=Symbol(),Es=/(PointerCapture)$|Capture$/i,wo=0,Co={},_c=0;var gt,Ee,No,Rs,Lo=Object.is,Sn=0,Us=[],Do=[],fe=q,{__b:As,__r:Is,diffed:Os,__c:Cs,unmount:ws,__:vs}=fe;function gn(e,t){fe.__h&&fe.__h(Ee,e,Sn||t),Sn=0;var n=Ee.__H||(Ee.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function C(e){return Sn=1,kc(Ns,e)}function kc(e,t,n){var o=gn(gt++,2);if(o.t=e,!o.__c&&(o.__=[n?n(t):Ns(void 0,t),function(s){var a=(o.__N||o.__)[0],c=o.t(a,s);Lo(a,c)||(o.__N=[c,o.__[1]],o.__c.setState({}))}],o.__c=Ee,!Ee.__f)){Ee.__f=!0;var r=Ee.shouldComponentUpdate;Ee.shouldComponentUpdate=function(s,a,c){var f=this.__H;if(!f)return!0;var m=!1,u=this.props!=s;if(f.__.some(function(E){E.__N&&(m=!0,Lo(E.__[0],E.__N[0])||(u=!0))}),r){var h=r.call(this,s,a,c);return m?h||u:h}return!m||u}}return o.__}function Se(e,t){var n=gn(gt++,3);!fe.__s&&Bo(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,Ee.__H.__h.push(n))}function Go(e,t){var n=gn(gt++,4);!fe.__s&&Bo(n.__H,t)&&(n.__P=!1,n.__=e,n.u=t,Ee.__h.push(n))}function we(e){return Sn=5,Lt(function(){return{current:e}},[])}function Lt(e,t){var n=gn(gt++,7);return Bo(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function xc(){var e;do{for(;e=Do.shift();)try{Nt(e)}catch(n){fe.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=Us.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(Nt),t.__h.some($o),t.__h=[]}catch(n){t.__h=[],fe.__e(n,e.__v)}}}while(Do.length)}fe.__b=function(e){Ee=null,As&&As(e)},fe.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),vs&&vs(e,t)},fe.__r=function(e){Is&&Is(e),gt=0;var t=(Ee=e.__c).__H;t&&(No==Ee?Ee.__h=[]:(t.__h.some(Nt),t.__h.some($o),gt=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),No=Ee},fe.diffed=function(e){Os&&Os(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&Ps(Us.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),No=Ee=null},fe.__c=function(e,t){t.some(function(n){try{n.__h.some(Nt),n.__h=n.__h.filter(function(o){return!o.__||$o(o)})}catch(o){n.__h=[function(){throw o}]}}),Cs&&Cs(e,t)},fe.unmount=function(e){ws&&ws(e);var t,n,o=e.__c;o&&o.__H&&(o.__H.__.some(function(r){try{if(r.__P&&r.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}r.__P=n,Ps(Do.push(r))}else Nt(r)}catch(s){t=s}}),o.__H=void 0,t&&fe.__e(t,o.__v))};var Ms=typeof requestAnimationFrame=="function";function Rc(e){var t,n=function(){clearTimeout(o),Ms&&cancelAnimationFrame(t),setTimeout(e)},o=setTimeout(n,35);Ms&&(t=requestAnimationFrame(n))}function Ps(e){e!=1&&Rs==fe.requestAnimationFrame||((Rs=fe.requestAnimationFrame)||Rc)(xc)}function Nt(e){var t=Ee,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),Ee=t}function $o(e){var t=Ee;e.__c=e.__(),Ee=t}function Bo(e,t){return!e||e.length!=t.length||t.some(function(n,o){return!Lo(n,e[o])})}function Ns(e,t){return typeof t=="function"?t(e):t}var Ac=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ic=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Ls=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,o]of Ac)t.style.setProperty(n,e.tokens[o]);for(let[n,o,r]of Ic){let s=e.tokens[r]??"";t.style.setProperty(n,s),t.style.setProperty(o,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Ho=(e,t)=>{if(Ls(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var Oc={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},ie=(e,t)=>`var(--${e}, var(--oc-${Oc[e]}, ${t}))`,We=ie("surface-background","transparent"),yn=ie("surface-elevated","transparent"),Tt=ie("surface-elevated-foreground","inherit"),Pe=ie("surface-foreground","inherit"),ce=ie("surface-muted-foreground","gray"),Cc=ie("surface-muted","transparent"),dt=ie("interactive-border","currentColor"),ve=ie("interactive-hover","transparent"),ut=ie("interactive-active","transparent"),jo=ie("interactive-selection","transparent"),Fo=ie("interactive-selection-foreground","inherit"),Xe=ie("primary","currentColor"),Vo=ie("primary-text","inherit"),Xo=ie("error-text","inherit"),wc=ie("font-sans","inherit"),Wo=ie("font-mono","monospace"),Bs=ie("radius","9px"),Ko=`calc(${Bs} - 2px)`,Ds=`calc(${Bs} - 4px)`,le=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,$s=`background-image: linear-gradient(${ve}, ${ve});`,zo=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,qo="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Gs="box-shadow: var(--oc-sdk-lit);",Yo=`inset 0 0.5px 0 0 ${le(Pe,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,vc=`
:root {
  --oc-sdk-edge: ${le(Pe,16)};
  --oc-sdk-field-bg: ${yn};
  --oc-sdk-raised-bg: ${We};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${le(Pe,14)};
  --oc-sdk-field-bg: ${le(We,50,yn)};
  --oc-sdk-raised-bg: ${yn};
  --oc-sdk-field-lift: ${Yo};
  --oc-sdk-raised-lift: ${Yo};
  --oc-sdk-lit: ${Yo};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Tn=(e)=>{let t=ie(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${ie(`${e}-text`,"inherit")}; }`},Mc=`
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
`,Hs=`${vc}
.oc-sdk { color: ${Pe}; font-family: ${wc}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${$s} }
.oc-sdk-mono { font-family: ${Wo}; }
.oc-sdk-muted { color: ${ce}; }
${Tn("success")}${Tn("warning")}${Tn("error")}${Tn("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${Xe}; --oc-sdk-tone-text: ${Vo}; }

.oc-sdk-btn { border-radius: ${Ko}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Ds}; }
.oc-sdk-btn[data-variant="default"] { color: ${Vo}; background: ${le(Xe,10,We)}; border-color: ${le(Xe,12)}; ${Gs} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${le(Xe,16,We)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${le(Xe,22,We)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Cc}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${ut}, ${ut}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Tt}; ${qo} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${ut}, ${ut}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${ve}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${ut}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${ie("status-error","red")}; color: ${Xo}; background: ${le("var(--oc-sdk-tone)",7,We)}; border-color: ${le("var(--oc-sdk-tone)",12)}; ${Gs} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${le("var(--oc-sdk-tone)",9,We)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${le("var(--oc-sdk-tone)",11,We)}; box-shadow: none; }

.oc-sdk-field-note { color: ${ce}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Xo}; }
.oc-sdk-input { border-radius: ${Ko}; background: var(--oc-sdk-field-bg); color: ${Tt}; ${zo("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${ce}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${zo(le(Pe,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${zo(ie("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${Wo}; }

.oc-sdk-search-icon { color: ${ce}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${Xe}; }
.oc-sdk-search-clear { border-radius: ${Ds}; color: ${ce}; }
.oc-sdk-search-clear:hover { background: ${ve}; color: ${Pe}; }

.oc-sdk-trigger { border-radius: ${Ko}; background: var(--oc-sdk-raised-bg); color: ${Tt}; ${qo} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${ve}, ${ve}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${ut}, ${ut}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${ce}; }
.oc-sdk-trigger-chevron { color: ${ce}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Tt}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${yn}; background-clip: padding-box; color: ${Tt}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${ve}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${jo}; color: ${Fo}; }
.oc-sdk-option-check { color: ${Pe}; }
.oc-sdk-option[data-destructive="true"] { color: ${Xo}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${le(ie("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${ce}; }
.oc-sdk-popup-empty { color: ${ce}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${dt}; border-radius: 4px; color: ${Pe}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${le(Pe,60,dt)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${dt}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${We}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${Xe}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${$s} }
.oc-sdk-check-desc { color: ${ce}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${le(Pe,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${ce}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${Pe}; }
.oc-sdk-tab[aria-selected="true"] { color: ${Fo}; background: ${jo}; border-color: ${dt}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Tt}; background: var(--oc-sdk-raised-bg); ${qo} }
.oc-sdk-tab-count { color: ${ce}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${le(Pe,6)}; color: ${ce}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${le("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${ve}; }
.oc-sdk-row[aria-selected="true"] { background: ${jo}; color: ${Fo}; }
.oc-sdk-row-lead { font-family: ${Wo}; color: ${ce}; }
.oc-sdk-row-sub { color: ${ce}; }
.oc-sdk-row-meta { color: ${ce}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${ce}; }

.oc-sdk-empty-body { color: ${ce}; }

.oc-sdk-spinner { color: ${ce}; }
.oc-sdk-spinner-ring { border-color: ${dt}; border-top-color: ${Xe}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${le("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${ce}; }

.oc-sdk-separator { color: ${ce}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${le(dt,40)}; }

.oc-sdk-progress-label { color: ${ce}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${le(Pe,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${Xe}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${ie("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${ie("success-text","inherit")}; }

.oc-sdk-text a { color: ${Vo}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${le(dt,60)}; }
`,Y=`
${Zn}
${Mc}
${Hs}`;var js="oc-sdk-ui-style",Ke=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},J=(e)=>{let t=document.getElementById(js);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}eo(document);let n=document.createElement("style");n.id=js,n.textContent=e,document.head.appendChild(n)},R=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},Me=(e)=>{let t=R("button",e);return t.type="button",t},ne=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},Ue=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},Fs=(e,t)=>{let n=(o)=>{if(o.target instanceof Node&&e.contains(o.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var Pc=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},ze=(e,t)=>{J(Y);let n=t,o=Me("oc-sdk oc-sdk-btn"),r=Pc(),s=document.createElement("span");o.append(s),e.append(o);let a=()=>{if(o.dataset.variant=n.variant??"default",o.dataset.size=n.size??"default",o.disabled=Boolean(n.disabled)||Boolean(n.loading),o.dataset.loading=n.loading?"true":"false",o.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&r.parentNode!==o)o.prepend(r);else if(!n.loading&&r.parentNode===o)r.remove();ne(s,n.label)},c=()=>{if(n.disabled||n.loading)return;n.onClick()};return o.addEventListener("click",c),a(),{update:(f)=>{n={...n,...f},a()},dispose:()=>{o.removeEventListener("click",c),o.remove()}}};var Jo=(e,t)=>{J(Y);let n=t,o=R("label","oc-sdk oc-sdk-field"),r=R("span","oc-sdk-field-label"),s=n.multiline?R("textarea","oc-sdk-input"):R("input","oc-sdk-input"),a=R("span","oc-sdk-field-note");o.append(r,s,a),e.append(o);let c=()=>{if(ne(r,n.label),r.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),Ue(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let m=Boolean(n.error);o.dataset.invalid=m?"true":"false",s.setAttribute("aria-invalid",m?"true":"false");let u=n.error??n.helper??"";ne(a,u),a.hidden=u===""},f=()=>{n.onChange(s.value)};return s.addEventListener("input",f),c(),{update:(m)=>{n={...n,...m},c()},dispose:()=>{s.removeEventListener("input",f),o.remove()}}};var Uc={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ge=(e,t,n)=>{let o=document.createElementNS("http://www.w3.org/2000/svg","svg");if(o.setAttribute("viewBox","0 0 24 24"),o.setAttribute("width",String(t)),o.setAttribute("height",String(t)),o.setAttribute("aria-hidden","true"),o.setAttribute("fill","currentColor"),n)o.setAttribute("class",n);let r=document.createElementNS("http://www.w3.org/2000/svg","path");return r.setAttribute("d",Uc[e]),o.append(r),o};var Qo=(e,t)=>{J(Y);let n=t,o=R("div","oc-sdk oc-sdk-search"),r=R("input","oc-sdk-input");r.type="text",r.spellcheck=!1,r.autocomplete="off",r.setAttribute("role","searchbox");let s=Me("oc-sdk-search-clear");s.append(Ge("close",14)),s.tabIndex=-1,o.append(Ge("search",16,"oc-sdk-search-icon"),r,s),e.append(o);let a=()=>{let u=n.placeholder??"Search";if(Ue(r,"placeholder",u),r.setAttribute("aria-label",n.label??u),s.setAttribute("aria-label","Clear search"),r.value!==n.value)r.value=n.value;o.dataset.active=n.value.trim()===""?"false":"true"},c=()=>{if(n.value!=="")n.onChange("");r.focus()},f=()=>{n.onChange(r.value)},m=(u)=>{if(u.key==="Escape"&&r.value!=="")u.preventDefault(),c()};if(r.addEventListener("input",f),r.addEventListener("keydown",m),s.addEventListener("click",c),a(),n.autofocus)r.focus();return{update:(u)=>{n={...n,...u},a()},dispose:()=>{r.removeEventListener("input",f),r.removeEventListener("keydown",m),s.removeEventListener("click",c),o.remove()}}};var je=(e,t="vertical")=>{let[n,o]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===o||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},qe=(e,t,n)=>{let o=e.filter((f)=>!f.disabled);if(o.length===0)return null;let r=o[0],s=o[o.length-1];if(n==="first"||!r||!s)return r?.id??null;if(n==="last")return s.id;let a=o.findIndex((f)=>f.id===t);if(a===-1)return n==="next"?r.id:s.id;return o[Math.min(o.length-1,Math.max(0,a+(n==="next"?1:-1)))]?.id??null};var Vs=(e,t)=>`${e}-${t??""}`,bn=(e,t,n,o)=>{let r=Me("oc-sdk-option");if(r.id=Vs(e,n.id),r.setAttribute("role",t),r.tabIndex=-1,r.disabled=Boolean(n.disabled),t==="option")r.setAttribute("aria-selected",n.selected?"true":"false");r.dataset.destructive=n.destructive?"true":"false";let s=R("span","oc-sdk-option-label");if(s.textContent=n.label,r.append(s),n.hint){let a=R("span","oc-sdk-option-hint");a.textContent=n.hint,r.append(a)}if(t==="option"){r.dataset.mark="check";let a=R("span","oc-sdk-option-check");a.append(Ge("check",14)),r.append(a)}return r.addEventListener("pointerenter",o.hover),r.addEventListener("click",o.pick),r},kn=(e,t,n,o)=>{let r=Vs(n,o);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===r?"true":"false";Ue(t,"aria-activedescendant",o?r:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Nc=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let o=e.offsetHeight,r=window.innerHeight-n.bottom-8;if(o>r&&n.top-8>r)e.style.top=`${Math.max(8,Math.round(n.top-4-o))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},xn=(e,t,n,o)=>{e.append(n),Nc(n,t);let r=Fs(e,o),s=()=>{o()},a=(c)=>{if(c.target instanceof Node&&n.contains(c.target))return;o()};return window.addEventListener("resize",s),window.addEventListener("scroll",a,!0),()=>{r(),window.removeEventListener("resize",s),window.removeEventListener("scroll",a,!0),n.remove()}};var Xs=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((o)=>o.label.toLowerCase().includes(n)||o.id.toLowerCase().includes(n))},Lc=0,Rn=(e,t)=>{J(Y);let n=t,o=`oc-sdk-select-${Lc+=1}`,r=R("div","oc-sdk oc-sdk-select"),s=R("span","oc-sdk-field-label");s.id=`${o}-label`;let a=Me("oc-sdk-trigger");a.setAttribute("aria-haspopup","listbox"),a.setAttribute("aria-labelledby",s.id);let c=R("span","oc-sdk-trigger-value");a.append(c,Ge("chevron",14,"oc-sdk-trigger-chevron")),r.append(s,a),e.append(r);let f="",m=null,u=null,h=R("div","oc-sdk oc-sdk-popup"),E=R("div","oc-sdk-popup-search"),d=R("input","oc-sdk-input");d.type="text",d.autocomplete="off",E.append(d);let y=R("div");y.setAttribute("role","listbox"),y.tabIndex=-1,h.append(y);let O=()=>Xs(n.options,n.searchable?f:""),A=()=>n.searchable?d:y,k=(S)=>{m=S,kn(y,A(),o,S)},b=()=>{Ke(y);let S=O();if(S.length===0){let T=R("div","oc-sdk-popup-empty");T.textContent="No matches",y.append(T)}for(let T of S)y.append(bn(o,"option",{...T,selected:T.id===n.value},{hover:()=>k(T.id),pick:()=>j(T.id)}));k(S.some((T)=>T.id===m)?m:S[0]?.id??null)},N=()=>{let S=u;u=null,S?.(),f="",d.value="",a.setAttribute("aria-expanded","false")},v=()=>{if(u||n.disabled)return;if(m=n.value,d.placeholder=n.searchPlaceholder??"Search",n.searchable)h.prepend(E);else E.remove();b(),u=xn(r,a,h,N),a.setAttribute("aria-expanded","true"),A().focus()},j=(S)=>{if(N(),a.focus(),S!==n.value)n.onChange(S)},V=()=>{if(u)N();else v()},ae=(S)=>{if(!u&&je(S))S.preventDefault(),v()},z=(S)=>{let T=je(S);if(T)S.preventDefault(),k(qe(O(),m,T));else if(S.key==="Enter"){if(S.preventDefault(),m)j(m)}else if(S.key==="Escape")S.preventDefault(),N(),a.focus();else if(n.searchable&&S.target!==d&&S.key.length===1&&!S.ctrlKey&&!S.metaKey)d.focus()},re=()=>{f=d.value,b()},X=(S)=>{if(u&&!(S.relatedTarget instanceof Node&&r.contains(S.relatedTarget)))N()},W=()=>{ne(s,n.label),s.hidden=!n.label;let S=n.options.find((T)=>T.id===n.value);if(ne(c,S?.label??n.placeholder??"Select"),c.dataset.empty=S?"false":"true",a.disabled=Boolean(n.disabled),u)b()};return a.addEventListener("click",V),a.addEventListener("keydown",ae),h.addEventListener("keydown",z),d.addEventListener("input",re),r.addEventListener("focusout",X),W(),{update:(S)=>{n={...n,...S},W()},dispose:()=>{N(),a.removeEventListener("click",V),a.removeEventListener("keydown",ae),h.removeEventListener("keydown",z),d.removeEventListener("input",re),r.removeEventListener("focusout",X),r.remove()}}};var Ws=(e,t,n)=>{J(Y);let o=t,r=Me("oc-sdk oc-sdk-check");r.setAttribute("role",n);let s=R("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(Ge("check",12));let a=R("span","oc-sdk-check-text"),c=R("span","oc-sdk-check-label"),f=R("span","oc-sdk-check-desc");a.append(c,f),r.append(s,a),e.append(r);let m=()=>{r.setAttribute("aria-checked",o.checked?"true":"false"),r.disabled=Boolean(o.disabled),ne(c,o.label),ne(f,o.description),f.hidden=!o.description},u=()=>{if(!o.disabled)o.onChange(!o.checked)};return r.addEventListener("click",u),m(),{update:(h)=>{o={...o,...h},m()},dispose:()=>{r.removeEventListener("click",u),r.remove()}}},Zo=(e,t)=>Ws(e,t,"checkbox"),An=(e,t)=>Ws(e,t,"switch");var er=(e,t)=>{J(Y);let n=t,o=R("div","oc-sdk oc-sdk-tabs");o.setAttribute("role","tablist"),e.append(o);let r=()=>{Ke(o),o.dataset.track=n.trackBackground?"true":"false";for(let a of n.items){let c=Me("oc-sdk-tab");c.setAttribute("role","tab");let f=a.id===n.activeId;c.setAttribute("aria-selected",f?"true":"false"),c.tabIndex=f?0:-1,c.dataset.id=a.id;let m=R("span");if(m.textContent=a.label,c.append(m),a.count!==void 0){let u=R("span","oc-sdk-tab-count");u.textContent=String(a.count),c.append(u)}c.addEventListener("click",()=>{if(a.id!==n.activeId)n.onChange(a.id)}),o.append(c)}},s=(a)=>{let c=je(a,"horizontal");if(!c)return;let f=qe(n.items,n.activeId,c);if(f&&f!==n.activeId){a.preventDefault(),n.onChange(f);let m=o.querySelector(`[data-id="${CSS.escape(f)}"]`);if(m instanceof HTMLElement)m.focus()}};return o.addEventListener("keydown",s),r(),{update:(a)=>{n={...n,...a},r()},dispose:()=>{o.removeEventListener("keydown",s),o.remove()}}};var Dt=(e,t)=>{Ue(e,"data-tone",t&&t!=="neutral"?t:null)},tr=(e,t)=>{J(Y);let n=t,o=R("span","oc-sdk oc-sdk-badge");e.append(o);let r=()=>{ne(o,n.label),Dt(o,n.tone)};return r(),{update:(s)=>{n={...n,...s},r()},dispose:()=>{o.remove()}}};var Dc=0,nr=(e,t)=>{J(Y);let n=t,o=`oc-sdk-list-${Dc+=1}`,r=R("div","oc-sdk oc-sdk-list");r.setAttribute("role","listbox"),r.tabIndex=0,e.append(r);let s=null,a=(h)=>`${o}-${h}`,c=(h)=>{s=h;for(let E of Array.from(r.children))if(E instanceof HTMLElement)E.dataset.active=E.id===a(h??"")?"true":"false";Ue(r,"aria-activedescendant",h?a(h):null),r.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},f=(h,E)=>{let d=R("span",h);return d.textContent=E,d},m=()=>{if(Ke(r),Ue(r,"aria-label",n.ariaLabel),n.items.length===0){r.append(f("oc-sdk-list-empty",n.emptyText??"Nothing here")),c(null);return}for(let E of n.items){let d=Me("oc-sdk-row");if(d.id=a(E.id),d.setAttribute("role","option"),d.setAttribute("aria-selected",E.id===n.selectedId?"true":"false"),d.disabled=Boolean(E.disabled),d.tabIndex=-1,E.leading)d.append(f("oc-sdk-row-lead",E.leading));let y=R("span","oc-sdk-row-main");if(y.append(f("oc-sdk-row-title",E.title)),E.subtitle)y.append(f("oc-sdk-row-sub",E.subtitle));if(d.append(y),E.badge){let O=f("oc-sdk-badge",E.badge.label);Dt(O,E.badge.tone),d.append(O)}if(E.meta)d.append(f("oc-sdk-row-meta",E.meta));d.addEventListener("click",()=>n.onSelect(E.id)),r.append(d)}let h=n.items.some((E)=>E.id===s&&!E.disabled);c(h?s:n.selectedId??null)},u=(h)=>{let E=je(h);if(E){h.preventDefault(),c(qe(n.items,s,E));return}if((h.key==="Enter"||h.key===" ")&&s)h.preventDefault(),n.onSelect(s)};return r.addEventListener("keydown",u),m(),{update:(h)=>{n={...n,...h},m()},dispose:()=>{r.removeEventListener("keydown",u),r.remove()}}};var or=(e,t)=>{J(Y);let n=t,o=R("div","oc-sdk oc-sdk-empty"),r=R("h2","oc-sdk-empty-title"),s=R("p","oc-sdk-empty-body"),a=R("div","oc-sdk-empty-action");o.append(r,s,a),e.append(o);let c=null,f=()=>{if(ne(r,n.title),ne(s,n.body),s.hidden=!n.body,a.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let m={label:n.action.label,onClick:n.action.onClick};if(c)c.update(m);else c=ze(a,{...m,variant:"outline",size:"sm"})};return f(),{update:(m)=>{n={...n,...m},f()},dispose:()=>{c?.dispose(),c=null,o.remove()}}};var rr=(e,t={})=>{J(Y);let n=t,o=R("span","oc-sdk oc-sdk-spinner");o.setAttribute("role","status");let r=R("span","oc-sdk-spinner-ring");r.setAttribute("aria-hidden","true");let s=R("span");o.append(r,s),e.append(o);let a=()=>{o.dataset.size=n.size??"default",ne(s,n.label),s.hidden=!n.label,o.setAttribute("aria-label",n.label??"Loading")};return a(),{update:(c)=>{n={...n,...c},a()},dispose:()=>{o.remove()}}};var sr=(e,t)=>{J(Y);let n=t,o=R("div","oc-sdk oc-sdk-banner"),r=R("div","oc-sdk-banner-text"),s=R("div","oc-sdk-banner-title"),a=R("div","oc-sdk-banner-body"),c=R("div","oc-sdk-banner-action");r.append(s,a),o.append(r,c),e.append(o);let f=null,m=()=>{if(o.dataset.tone=n.tone,o.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),ne(s,n.title),ne(a,n.body),a.hidden=!n.body,c.hidden=!n.action,!n.action){f?.dispose(),f=null;return}let u={label:n.action.label,onClick:n.action.onClick};if(f)f.update(u);else f=ze(c,{...u,variant:"outline",size:"xs"})};return m(),{update:(u)=>{n={...n,...u},m()},dispose:()=>{f?.dispose(),f=null,o.remove()}}};var $c=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,ir=(e,t)=>{J(Y);let n=t,o=R("div","oc-sdk oc-sdk-progress"),r=R("div","oc-sdk-progress-label"),s=R("span"),a=R("span","oc-sdk-progress-value"),c=R("span"),f=Ge("check",14);a.append(f,c),r.append(s,a);let m=R("div","oc-sdk-progress-track");m.setAttribute("role","progressbar"),m.setAttribute("aria-valuemin","0"),m.setAttribute("aria-valuemax","100");let u=R("div","oc-sdk-progress-fill");m.append(u),o.append(r,m),e.append(o);let h=()=>{let E=$c(n.value);if(Dt(u,n.tone),u.style.transform=`scaleX(${E/100})`,m.setAttribute("aria-valuenow",String(E)),n.label)m.setAttribute("aria-label",n.label);else m.removeAttribute("aria-label");ne(s,n.label),ne(c,`${E}%`);let d=E===100&&(!n.tone||n.tone==="neutral");Ue(o,"data-done",d?"true":null),f.style.display=d?"":"none",r.hidden=!n.label};return h(),{update:(E)=>{n={...n,...E},h()},dispose:()=>{o.remove()}}};var Ks=(e)=>e.filter((t)=>!("separator"in t)),Gc=0,ar=(e,t)=>{J(Y);let n=t,o=`oc-sdk-menu-${Gc+=1}`,r=R("div","oc-sdk oc-sdk-menu");e.append(r);let s=R("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let a=null,c=null,f=ze(r,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(a)E();else d()}}),m=r.querySelector("button");m?.setAttribute("aria-haspopup","menu");let u=(k)=>{c=k,kn(s,s,o,k)},h=()=>{Ke(s);for(let k of n.items){if("separator"in k){let b=R("div","oc-sdk-separator");b.dataset.labeled="false",s.append(b);continue}s.append(bn(o,"menuitem",k,{hover:()=>u(k.id),pick:()=>y(k.id)}))}u(Ks(n.items).some((k)=>k.id===c)?c:null)},E=()=>{let k=a;a=null,k?.(),c=null,m?.setAttribute("aria-expanded","false")},d=()=>{if(a||!m)return;h(),a=xn(r,m,s,E),m.setAttribute("aria-expanded","true"),s.focus()},y=(k)=>{E(),m?.focus(),n.onSelect(k)},O=(k)=>{let b=je(k);if(b)k.preventDefault(),u(qe(Ks(n.items),c,b));else if(k.key==="Enter"||k.key===" "){if(k.preventDefault(),c)y(c)}else if(k.key==="Escape")k.preventDefault(),E(),m?.focus()},A=(k)=>{if(a&&!(k.relatedTarget instanceof Node&&r.contains(k.relatedTarget)))E()};return s.addEventListener("keydown",O),r.addEventListener("focusout",A),{update:(k)=>{if(n={...n,...k},f.update({label:n.label,variant:n.variant,size:n.size}),a)h()},dispose:()=>{E(),s.removeEventListener("keydown",O),r.removeEventListener("focusout",A),f.dispose(),r.remove()}}};var I=Io(),Ye=null,In=new Set;I.onReady((e)=>{Ye=e,Ho(e,document.documentElement);for(let t of In)t(e)});I.onItem((e)=>{if(!Ye||Ye.item===e)return;Ye={...Ye,item:e};for(let t of In)t(Ye)});var yt=()=>{let[e,t]=C(Ye);return Se(()=>{if(In.add(t),Ye)t(Ye);return()=>{In.delete(t)}},[]),e};var Bc=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},zs=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),Hc=(e,t)=>{let n=e;for(let o of t){if(n===null||n===void 0)return;n=n[o]}return n},cr=(e,t)=>{let n=(o,r)=>{if(typeof o==="function")return(...s)=>{let a=Hc(t.current,r);return typeof a==="function"?a(...s):void 0};if(Array.isArray(o))return o.map((s,a)=>n(s,[...r,a]));if(Bc(o))return Object.fromEntries(Object.entries(o).map(([s,a])=>[s,n(a,[...r,s])]));return o};return n(e,[])};var jc=Symbol.for("pv"),Fc=0;function i(e,t,n,o,r,s){t||(t={});var a,c,f=t;if("ref"in f&&typeof e!="function")for(c in f={},t)c=="ref"?a=t[c]:f[c]=t[c];var m={type:e,props:f,key:n,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:jc,__v:--Fc,__i:-1,__u:0};return(r||s)&&(m.__source=r,m.__self=s),q.vnode&&q.vnode(m),m}var lr=(...e)=>e.filter(Boolean).join(" ");var ge=({children:e,class:t})=>i("span",{class:lr("sui-chip",t),children:e},void 0,!1,void 0,this),qs=({children:e,onClick:t,pressed:n,class:o})=>t?i("button",{type:"button",class:lr("sui-card",o),"aria-pressed":n,onClick:t,children:e},void 0,!1,void 0,this):i("div",{class:lr("sui-card sui-card--static",o),children:e},void 0,!1,void 0,this);var $t=({title:e,children:t})=>i("div",{class:"sui-section",children:[e&&i("h3",{class:"sui-section-title",children:e},void 0,!1,void 0,this),t]},void 0,!0,void 0,this),Ys=({items:e})=>i("dl",{class:"sui-kv",children:e.flatMap(([t,n])=>[i("dt",{children:t},void 0,!1,void 0,this),i("dd",{children:n},void 0,!1,void 0,this)])},void 0,!1,void 0,this),Js=(e,t)=>{let n=we(null),o=we(null),r=we(t);r.current=t;let s=zs(t),a=we(!1);Se(()=>{if(!n.current)return;return o.current=e(n.current,cr(r.current,r)),a.current=!0,()=>{o.current?.dispose(),o.current=null,a.current=!1}},[]);let c=we(s);return Se(()=>{if(!a.current||c.current===s)return;c.current=s,o.current?.update(cr(r.current,r))},[s]),n};var Be=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let o=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...o?{}:{year:"numeric"}})},Qs=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let o=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-o)/86400000)},Zs=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let o=Math.max(0,Math.round((t-n)/60000));if(o<1)return"just now";if(o<60)return`${o}m ago`;let r=Math.round(o/60);if(r<24)return`${r}h ago`;let s=Math.round(r/24);if(s<30)return`${s}d ago`;return Be(e,new Date(t))};var Vc={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},nt=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return Vc[e]??String(e);return String(e)},dr=(e)=>{let t=e.url.match(/\/-\/merge_requests\/(\d+)/),n=e.url.match(/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/),o=t?.[1]??n?.[1];if(!o)return null;let r=e.metadata??{},s=String(r.status??r.state??"").toLowerCase(),c=r.draft===!0||r.isDraft===!0||s==="draft"?"draft":s==="merged"?"merged":s==="closed"?"closed":s==="open"||s==="opened"||s==="approved"||s==="reviewing"?"open":null;return{label:`${t?"!":"#"}${o}`,status:c,url:e.url,title:e.title}},ei=(e,t=Date.now())=>{if(!e)return null;let n=new Date(e).getTime();if(Number.isNaN(n))return null;let o=n<t,r=Math.round(Math.abs(n-t)/60000),s=Math.round(r/60),a=Math.round(s/24),c=r<60?`${Math.max(1,r)}m`:s<24?`${s}h`:a<14?`${a}d`:`${Math.round(a/7)}w`;return{text:o?`-${c}`:c,overdue:o}},ti=(e)=>{let t=Math.abs(e),n=(o)=>String(Math.round(o*10)/10).replace(/\.0$/,"");if(t>=1e6)return`$${n(e/1e6)}M`;if(t>=1000)return`$${n(e/1000)}k`;return`$${Math.round(e)}`},ni=(e,t=Date.now())=>{let n=e?new Date(e).getTime():NaN;if(Number.isNaN(n))return null;let o=Math.max(0,Math.round((t-n)/60000));if(o<60)return`${Math.max(1,o)}m`;let r=Math.round(o/60);if(r<24)return`${r}h`;let s=Math.round(r/24);return s<14?`${s}d`:`${Math.round(s/7)}w`};var oi=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let r=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(r.slice(0,2),16),parseInt(r.slice(2,4),16),parseInt(r.slice(4,6),16)]}let o=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return o?[Number(o[1]),Number(o[2]),Number(o[3])]:null},ri=([e,t,n])=>{let o=(r)=>{let s=r/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*o(e)+0.7152*o(t)+0.0722*o(n)},Xc=(e,t)=>{let[n,o]=[ri(e),ri(t)].sort((r,s)=>s-r);return(n+0.05)/(o+0.05)};var si=(e,t)=>{let n=oi(e),o=oi(t);if(!n||!o||Xc(n,o)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var bt=new Map,Wc=30000,ii=(e)=>{let t=bt.get(e);if(!t)t={at:0,listeners:new Set},bt.set(e,t);return t},On=(e)=>{for(let t of e.listeners)t()},Fe=(e,t,n=!1)=>{let o=ii(e);if(o.promise)return o.promise;if(!n&&o.value!==void 0&&Date.now()-o.at<Wc)return Promise.resolve(o.value);let r=t().then((s)=>(o.value=s,o.error=void 0,o.at=Date.now(),s),(s)=>{throw o.error=s,s}).finally(()=>{o.promise=void 0,On(o)});return o.promise=r,On(o),r};var ai=(e)=>{let t=[];for(let[n,o]of bt){if(o.value===void 0)continue;let r=e(n,o.value);if(r===o.value)continue;t.push([o,o.value]),o.value=r,On(o)}return()=>{for(let[n,o]of t)n.value=o,On(n)}},pt=(e)=>{let t=bt.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)Fe(e,t.fetcher,!0).catch(()=>{return})},de=(e)=>{for(let[t,n]of bt){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)Fe(t,n.fetcher,!0).catch(()=>{return})}},Le=(e,t)=>{let[,n]=C(0);Se(()=>{if(!e)return;let r=ii(e);r.fetcher=t;let s=()=>n((a)=>a+1);return r.listeners.add(s),Fe(e,t).catch(()=>{return}),()=>{r.listeners.delete(s)}},[e]);let o=e?bt.get(e):void 0;return{data:o?.value,error:o?.error,loading:Boolean(o?.promise)||e!==null&&o?.value===void 0&&o?.error===void 0,refresh:()=>{if(e)Fe(e,t,!0).catch(()=>{return})}}};var ci=(e,t)=>JSON.stringify({query:e,variables:t});class Te extends Error{kind;constructor(e,t){super(t);this.kind=e}}var F=async(e,t)=>{let n;try{n=await I.request({method:"POST",path:"/graphql",body:ci(e,t)})}catch(r){if(r instanceof P){if(r.code==="DISCONNECTED"||r.code==="NO_INTEGRATION")throw new Te("disconnected","Linear is not connected.");throw new Te("network",r.message||"Could not reach Linear.")}throw new Te("network",r instanceof Error?r.message:"Could not reach Linear.")}let o;try{o=JSON.parse(n.body)}catch{throw new Te("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new Te("disconnected","Linear sign-in expired.");if(o.errors?.length){let r=o.errors[0],s=r.extensions?.code==="RATELIMITED"||r.extensions?.type==="ratelimited";throw new Te(s?"rate-limited":"graphql",r.message)}if(!o.data)throw new Te("graphql","Linear returned no data.");return o.data};var li=`
  query Viewer {
    viewer { id name displayName avatarUrl avatarBackgroundColor email organization { id name urlKey } teams(first: 50) { nodes { id } } }
  }
`,di=`
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
`,ui=`
  query WorkflowStates($after: String) {
    workflowStates(first: 250, after: $after) {
      nodes { id name type color position team { id } }
      pageInfo { hasNextPage endCursor }
    }
  }
`,pi=`
  query TeamPeople($teamId: String!) {
    team(id: $teamId) {
      id
      members(first: 250) { nodes { id name displayName avatarUrl avatarBackgroundColor active } }
      labels(first: 250) { nodes { id name color } }
    }
  }
`,fi=`
  query WorkspaceLabels {
    issueLabels(first: 250) { nodes { id name color team { id } } }
  }
`,mi=`
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
`;var _i=`
  query ProjectMilestones($projectId: String!) {
    project(id: $projectId) {
      id
      projectMilestones(first: 250) { nodes { id name sortOrder } }
    }
  }
`;var Ei=`
  query IssueFavorite($id: String!) {
    issue(id: $id) { id favorite { id } }
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
`;var Kc=(e)=>`
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
`,Cn=`
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
`;var hi=`
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`,Si=`
  query TeamCycles($teamId: String!, $minNumber: Float!) {
    team(id: $teamId) {
      id key name
      cycles(first: 25, filter: { number: { gte: $minNumber } }) { nodes { id number name startsAt endsAt progress isActive isFuture isPast completedAt } }
    }
  }
`;var gi=`
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
`;var ur=`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
  }
`;var Ti=`
  mutation IssueRelationDelete($id: String!) {
    issueRelationDelete(id: $id) { success }
  }
`;var yi=`
  mutation DocumentCreate($input: DocumentCreateInput!) {
    documentCreate(input: $input) { success document { id title url updatedAt } }
  }
`,bi=`
  mutation DocumentUpdate($id: String!, $input: DocumentUpdateInput!) {
    documentUpdate(id: $id, input: $input) { success document { id title url updatedAt } }
  }
`,ki=`
  mutation FavoriteCreate($input: FavoriteCreateInput!) {
    favoriteCreate(input: $input) { success favorite { id } }
  }
`,xi=`
  mutation FavoriteDelete($id: String!) {
    favoriteDelete(id: $id) { success }
  }
`,Ri=`
  mutation IssueReminder($id: String!, $reminderAt: DateTime!) {
    issueReminder(id: $id, reminderAt: $reminderAt) { success }
  }
`;var Ai=`
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
`;var Ii=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,RS={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:Kc(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:Ii(["n1","n2"])};var zc=5,Gt=null,Oi=new Map,Ci=(e)=>{for(let[t,n]of e)Oi.set(t,n)},wi=(e,t)=>{let n=Oi.get(t);if(n!==void 0)return n;let o=Gt?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],r=o.findIndex((s)=>s.id===t);return r<0?0.5:(r+1)/(o.length+1)},vi=()=>Gt?.viewer.id??null,Mi=(e)=>Gt?.teamsById.get(e)?.issueEstimationType,qc=async()=>{let e=new Map,t=null;for(let n=0;n<zc;n+=1){let o=await F(ui,{after:t});for(let{team:r,...s}of o.workflowStates.nodes){let a=e.get(r.id)??[];a.push(s),e.set(r.id,a)}if(!o.workflowStates.pageInfo.hasNextPage)break;t=o.workflowStates.pageInfo.endCursor}for(let n of e.values())n.sort((o,r)=>o.position-r.position);return e},Yc=async()=>{let[e,t,n]=await Promise.all([F(li).then((o)=>o.viewer),F(di).then((o)=>o.teams.nodes),qc()]);return t.sort((o,r)=>o.name.localeCompare(r.name)),Gt={viewer:e,teams:t,teamsById:new Map(t.map((o)=>[o.id,o])),myTeamIds:new Set(e.teams?.nodes.map((o)=>o.id)??[]),statesByTeam:n},Gt},Jc="workspace";var Pi=()=>Le(Jc,Yc);var Ui=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),Qc=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),o=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${o.toFixed(2)}z`},ft=({type:e,color:t,size:n=14,fill:o,teamId:r,stateId:s})=>{let a=t||"currentColor",c=Lt(()=>si(a,Ui()),[a,Ui()]),f={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return i("svg",{...f,children:[i("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),i("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return i("svg",{...f,children:i("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return i("svg",{...f,children:i("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let m=o??(r&&s?wi(r,s):0.5);return i("svg",{...f,children:[i("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this),i("path",{d:Qc(m),fill:c},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return i("svg",{...f,children:[i("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),i("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return i("svg",{...f,children:[i("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),i("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}},mt=({priority:e,size:t=14})=>{let n={width:t,height:t,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};if(e===1)return i("svg",{...n,children:[i("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"2.5",fill:"var(--oc-warning)"},void 0,!1,void 0,this),i("path",{d:"M7 4v3.6M7 9.4v.2",stroke:"var(--oc-bg)","stroke-width":"1.6","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);if(e>=2&&e<=4){let o=5-e;return i("svg",{...n,children:[0,1,2].map((r)=>i("rect",{x:2+r*4,y:9-r*3,width:"2.4",height:3+r*3,rx:"0.6",fill:"currentColor",opacity:r<o?1:0.28},void 0,!1,void 0,this))},void 0,!1,void 0,this)}return i("svg",{...n,children:i("path",{d:"M2.5 7h2M6 7h2M9.5 7h2",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round",opacity:"0.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},rt=({name:e,url:t,size:n=18})=>{let o=e.split(/\s+/).filter(Boolean).slice(0,2).map((s)=>s[0].toUpperCase()).join("")||"?",r={width:`${n}px`,height:`${n}px`,fontSize:`${Math.round(n*0.42)}px`};if(t)return i("img",{class:"lin-avatar",src:t,alt:e,style:r},void 0,!1,void 0,this);return i("span",{class:"lin-avatar",style:r,children:o},void 0,!1,void 0,this)},Zc={open:"var(--oc-info)",merged:"var(--oc-success)",closed:"var(--oc-muted)",draft:"var(--oc-muted)"},Ni=({status:e,size:t=13})=>i("svg",{width:t,height:t,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:i("g",{fill:"none",stroke:e?Zc[e]:"currentColor","stroke-width":"1.4","stroke-linecap":"round",children:[i("circle",{cx:"3.5",cy:"3",r:"1.6"},void 0,!1,void 0,this),i("circle",{cx:"3.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),i("circle",{cx:"10.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),i("path",{d:"M3.5 4.6v4.8M10.5 9.4V6.5a2 2 0 0 0-2-2H6.5"},void 0,!1,void 0,this),i("path",{d:"M7.8 3.2 6.3 4.5l1.5 1.3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),wn=({size:e=13})=>i("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[i("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:"currentColor","stroke-width":"1.4"},void 0,!1,void 0,this),i("path",{d:"M5.6 4.6 9.2 7l-3.6 2.4z",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Li=({size:e=13})=>i("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:i("path",{d:"M7 2 12.5 11.5h-11z",fill:"none",stroke:"currentColor","stroke-width":"1.4","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),Di=({size:e=13})=>i("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:i("path",{d:"M7 1.8 12.2 7 7 12.2 1.8 7z",fill:"none",stroke:"currentColor","stroke-width":"1.4","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),$i=({done:e,total:t,size:n=13})=>{let r=2*Math.PI*5,s=t?Math.min(1,e/t):0;return i("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[i("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:"var(--oc-border)","stroke-width":"2"},void 0,!1,void 0,this),i("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:s>=1?"var(--oc-success)":"var(--oc-info)","stroke-width":"2","stroke-dasharray":`${r*s} ${r}`,transform:"rotate(-90 7 7)","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Gi=({size:e=13})=>i("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[i("circle",{cx:"7",cy:"7",r:"6",fill:"var(--oc-error)"},void 0,!1,void 0,this),i("path",{d:"M4 7h6",stroke:"var(--oc-bg)","stroke-width":"1.8","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Bi=({size:e=13})=>i("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[i("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"3",fill:"none",stroke:"var(--oc-warning)","stroke-width":"1.5"},void 0,!1,void 0,this),i("path",{d:"M5 10V4.5h4.2l-.9 1.4.9 1.4H5",fill:"var(--oc-warning)",stroke:"var(--oc-warning)","stroke-width":"1","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),_t=({icon:e,color:t,size:n=13})=>{if(e&&/\p{Extended_Pictographic}/u.test(e))return i("span",{class:"lin-project-emoji",style:{fontSize:`${n}px`},"aria-hidden":"true",children:e},void 0,!1,void 0,this);return i("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[i("path",{d:"M7 1.2 12.2 4.1v5.8L7 12.8 1.8 9.9V4.1z",fill:t||"var(--oc-muted)"},void 0,!1,void 0,this),i("path",{d:"M4.6 7h4.8M7 4.6v4.8",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round",opacity:"0.85"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var pr=(e)=>["completed","canceled","duplicate"].includes(e.type);var Hi=(e)=>{if(pr(e.state))return{blockedBy:0,blocking:0};return{blockedBy:(e.inRelations?.nodes??[]).filter((t)=>t.type==="blocks"&&!pr(t.issue.state)).length,blocking:(e.outRelations?.nodes??[]).filter((t)=>t.type==="blocks"&&!pr(t.relatedIssue.state)).length}};var vn=({label:e})=>i(ge,{children:[i("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this),fr=2,el=()=>i("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:i("path",{d:"M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.6.6M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.6-.6",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),tl=()=>i("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[i("circle",{cx:"7",cy:"7.5",r:"4.7",fill:"none",stroke:"currentColor","stroke-width":"1.3"},void 0,!1,void 0,this),i("path",{d:"M7 5v2.7l1.6 1M5.5 1.8h3",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),nl=()=>i("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:i("path",{d:"M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2zM2 4.2 7 7l5-2.8M7 7v5.5",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),ol=()=>i("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[i("circle",{cx:"5",cy:"5",r:"2.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),i("path",{d:"M1.5 11.5c.4-2 1.8-3 3.5-3s3.1 1 3.5 3M9.5 3.4a2.2 2.2 0 0 1 0 3.9M10.5 8.8c1 .4 1.7 1.3 2 2.7",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),rl=()=>i("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[i("circle",{cx:"7",cy:"7",r:"5.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),i("path",{d:"M7 4.2V7l2 1.2",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ji=({issue:e,properties:t,subIssues:n,hideProject:o,extras:r})=>{let s=e.labels.nodes,a=e.attachments?.nodes??[],c=a.map(dr).filter((b)=>b!==null),f=a.filter((b)=>!dr(b)),{blockedBy:m,blocking:u}=Hi(e),h=nt(e.estimate,Mi(e.team.id)),E=e.dueDate?Qs(e.dueDate):null,d=t.has("sla")?ei(e.slaBreachesAt):null,y=r?.releases.nodes??[],O=(r?.needs.nodes??[]).map((b)=>b.customer).filter((b)=>b!==null),A=O.reduce((b,N)=>b+(N.revenue??0),0),k=t.has("timeInStatus")?ni(r?.stateHistory.nodes[r.stateHistory.nodes.length-1]?.startedAt):null;return i(xe,{children:[n&&n.total>0&&i("span",{class:"lin-meta lin-meta-children",title:`${n.done} of ${n.total} sub-issues done`,children:i(ge,{children:[i($i,{done:n.done,total:n.total},void 0,!1,void 0,this),n.done,"/",n.total]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("labels")&&s.length>0&&i("span",{class:"lin-meta lin-meta-labels",children:[s.slice(0,fr).map((b)=>i(vn,{label:b},b.id,!1,void 0,this)),s.length>fr&&i(ge,{children:["+",s.length-fr]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),t.has("changes")&&c.length>0&&i("span",{class:"lin-meta lin-meta-change",title:c.map((b)=>`${b.label} ${b.title}`).join(`
`),children:i(ge,{children:[i(Ni,{status:c[0].status},void 0,!1,void 0,this),c.length===1?c[0].label:`${c.length} ${c[0].label.startsWith("!")?"MRs":"PRs"}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("links")&&f.length>0&&i("span",{class:"lin-meta lin-meta-links",title:f.map((b)=>b.title).join(`
`),children:i(ge,{children:[i(el,{},void 0,!1,void 0,this),f.length]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("project")&&!o&&e.project&&i("span",{class:"lin-meta lin-meta-project",title:e.project.name,children:i(ge,{children:[i(_t,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),i("span",{class:"lin-ellipsis",children:e.project.name},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("milestone")&&e.projectMilestone&&i("span",{class:"lin-meta lin-meta-milestone",title:`Milestone: ${e.projectMilestone.name}`,children:i(ge,{children:i("span",{class:"lin-ellipsis",children:e.projectMilestone.name},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("cycle")&&e.cycle&&i("span",{class:"lin-meta lin-meta-cycle",title:`Cycle ${e.cycle.number}${e.cycle.name?`: ${e.cycle.name}`:""}`,children:i(ge,{children:[i(wn,{},void 0,!1,void 0,this),e.cycle.number]},void 0,!0,void 0,this)},void 0,!1,void 0,this),m>0&&i("span",{class:"lin-meta lin-meta-blocked",title:`Blocked by ${m} ${m===1?"issue":"issues"}`,children:i(ge,{children:[i(Gi,{},void 0,!1,void 0,this),m]},void 0,!0,void 0,this)},void 0,!1,void 0,this),u>0&&i("span",{class:"lin-meta lin-meta-blocking",title:`Blocking ${u} ${u===1?"issue":"issues"}`,children:i(ge,{children:[i(Bi,{},void 0,!1,void 0,this),u]},void 0,!0,void 0,this)},void 0,!1,void 0,this),d&&i("span",{class:`lin-meta lin-meta-sla ${d.overdue?"lin-overdue":""}`,title:`SLA ${e.slaType??""} breaches ${Be(e.slaBreachesAt)}`,children:i(ge,{children:[i(tl,{},void 0,!1,void 0,this),d.text]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("release")&&y.length>0&&i("span",{class:"lin-meta lin-meta-release",title:y.map((b)=>`${b.name}${b.version?` ${b.version}`:""}`).join(`
`),children:i(ge,{children:[i(nl,{},void 0,!1,void 0,this),i("span",{class:"lin-ellipsis",children:y[0].version??y[0].name},void 0,!1,void 0,this),y.length>1&&` +${y.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customers")&&O.length>0&&i("span",{class:"lin-meta lin-meta-customers",title:O.map((b)=>b.name).join(`
`),children:i(ge,{children:[i(ol,{},void 0,!1,void 0,this),i("span",{class:"lin-ellipsis",children:O[0].name},void 0,!1,void 0,this),O.length>1&&` +${O.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customerRevenue")&&A>0&&i("span",{class:"lin-meta lin-meta-revenue",title:"Customer revenue",children:i(ge,{children:ti(A)},void 0,!1,void 0,this)},void 0,!1,void 0,this),k&&i("span",{class:"lin-meta lin-meta-in-status",title:`In ${e.state.name} for ${k}`,children:i(ge,{children:[i(rl,{},void 0,!1,void 0,this),k]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("estimate")&&h&&i("span",{class:"lin-meta lin-meta-estimate",title:"Estimate",children:i(ge,{children:h},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("dueDate")&&e.dueDate&&i("span",{class:`lin-meta lin-meta-due sui-small ${E!==null&&E<0?"lin-overdue":"sui-muted"}`,title:"Due date",children:Be(e.dueDate)},void 0,!1,void 0,this),t.has("creator")&&e.creator&&i("span",{class:"lin-meta lin-meta-creator",title:`Created by ${e.creator.name}`,children:i(rt,{name:e.creator.name,url:e.creator.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};async function He(e,t,n,o={}){let r=o.name??"extension",s={};for(let[a,c]of Object.entries(o.query??{}))if(c)s[a]=c;try{let a=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...o.body!==void 0?{body:JSON.stringify(o.body)}:{}}),c;try{c=JSON.parse(a.body)}catch{return{ok:!1,error:`The ${r} service answered something unreadable.`,code:"failed"}}if(a.status>=400&&c.ok===void 0)return{ok:!1,error:String(c.message??`Error ${a.status}`),code:"failed"};return c}catch(a){let c=a.code;if(c==="NO_SERVICE")return{ok:!1,error:`Approve the ${r} service in Settings > Extensions.`,code:"failed"};if(c==="SERVICE_FAILED")return{ok:!1,error:`The ${r} service did not start. Try again.`,code:"failed"};return{ok:!1,error:a instanceof Error?a.message:`Could not reach the ${r} service.`,code:"failed"}}}async function oe(e,t,n,o={}){try{await e.toast({kind:t,message:n,...o.dismiss?{dismiss:!0}:{}})}catch{}}var il={width:16,height:16,viewBox:"0 0 24 24","aria-hidden":!0};var Fi=()=>i("svg",{...il,children:i("path",{fill:"currentColor",d:"M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"},void 0,!1,void 0,this)},void 0,!1,void 0,this);var Vi=async(e,t)=>{try{await I.writeClipboard(e),await oe(I,"success",`Copied ${t}`)}catch{await oe(I,"error",`Could not copy ${t}`)}};var Xi=["triage","backlog","unstarted","started","completed","canceled","duplicate"],Mn=(e,t)=>Xi.indexOf(e.type)-Xi.indexOf(t.type)||e.position-t.position;var Pn=["No priority","Urgent","High","Medium","Low"];var Un=8,Re=(e,t)=>({kind:"change",change:{input:e,patch:t}}),De=(e)=>({kind:"prompt",prompt:e}),st=(e,t)=>({kind:"relation",relation:e,create:t}),mr=(e,t)=>{let[n,o,r]=e.split("-").map(Number);return new Date(Date.UTC(n,o-1,r+t)).toISOString().slice(0,10)},al=(e)=>{let[t,n,o]=e.split("-").map(Number);return(5-new Date(Date.UTC(t,n-1,o)).getUTCDay()+7)%7},cl=(e)=>`Cycle ${e.number}${e.name?`: ${e.name}`:""}`,it={related:{id:"related",type:"related",inverse:!1},blocking:{id:"blocking",type:"blocks",inverse:!1},blocked:{id:"blocked",type:"blocks",inverse:!0},duplicate:{id:"duplicate",type:"duplicate",inverse:!1},similar:{id:"similar",type:"similar",inverse:!1}},ll=(e)=>{let t=new Date(e.getTime()+3600000),n=new Date(e);n.setDate(n.getDate()+1),n.setHours(9,0,0,0);let o=new Date(e.getTime()+604800000),r=new Date(e);return r.setMonth(r.getMonth()+1),[{id:"hour",label:"In one hour",at:t.toISOString()},{id:"tomorrow",label:"Tomorrow at 9 AM",at:n.toISOString()},{id:"week",label:"In one week",at:o.toISOString()},{id:"month",label:"In one month",at:r.toISOString()}]},Wi=(e,t)=>{let n=[...t.states].sort(Mn),o={id:"status",label:"Status",shortcut:"S",icon:{kind:"glyph",name:"status"},children:n.map((_)=>({id:`status:${_.id}`,label:_.name,icon:{kind:"state",state:_,teamId:e.team.id},checked:_.id===e.state.id,action:Re({stateId:_.id},{state:_})}))},r={id:"priority",label:"Priority",shortcut:"P",icon:{kind:"glyph",name:"priority"},children:[0,1,2,3,4].map((_)=>({id:`priority:${_}`,label:_?Pn[_]:"No priority",icon:{kind:"priority",priority:_},checked:e.priority===_,action:Re({priority:_},{priority:_})}))},s=t.members??[],a=e.assignee&&!s.some((_)=>_.id===e.assignee.id)?[e.assignee,...s]:s,c={id:"assignee",label:"Assignee",shortcut:"A",icon:{kind:"glyph",name:"assignee"},loading:!t.members,searchable:a.length>=Un,children:[{id:"assignee:none",label:"No assignee",icon:{kind:"glyph",name:"none"},checked:!e.assignee,action:Re({assigneeId:null},{assignee:null})},...a.map((_)=>({id:`assignee:${_.id}`,label:_.name,icon:{kind:"person",name:_.name,url:_.avatarUrl},checked:e.assignee?.id===_.id,action:Re({assigneeId:_.id},{assignee:_})}))]},f=al(t.today),m={id:"due",label:"Due date",shortcut:"⇧D",icon:{kind:"glyph",name:"due"},children:[{id:"due:today",label:"Today",date:t.today},{id:"due:tomorrow",label:"Tomorrow",date:mr(t.today,1)},{id:"due:friday",label:f===0?"End of this week (today)":"End of this week",date:mr(t.today,f)},{id:"due:week",label:"In one week",date:mr(t.today,7)}].map(({id:_,label:Q,date:me})=>({id:_,label:Q,checked:e.dueDate===me,action:Re({dueDate:me},{dueDate:me})})).concat(e.dueDate?[{id:"due:none",label:"Remove due date",checked:!1,action:Re({dueDate:null},{dueDate:null})}]:[])},u=new Set(e.labels.nodes.map((_)=>_.id)),h=[...new Map([...e.labels.nodes,...t.labels??[]].map((_)=>[_.id,_])).values()],E={id:"labels",label:"Labels",shortcut:"L",icon:{kind:"glyph",name:"labels"},loading:!t.labels,searchable:h.length>=Un,children:h.sort((_,Q)=>Number(u.has(Q.id))-Number(u.has(_.id))||_.name.localeCompare(Q.name)).map((_)=>{let Q=u.has(_.id)?e.labels.nodes.filter((me)=>me.id!==_.id):[...e.labels.nodes,_];return{id:`label:${_.id}`,label:_.name,icon:{kind:"swatch",color:_.color},checked:u.has(_.id),keepOpen:!0,action:Re({labelIds:Q.map((me)=>me.id)},{labels:{nodes:Q}})}})},d=t.projects??[],y=e.project&&!d.some((_)=>_.id===e.project.id)?[e.project,...d]:d,O={id:"project",label:"Project",shortcut:"⇧P",icon:{kind:"glyph",name:"project"},loading:!t.projects,searchable:y.length>=Un,children:[{id:"project:none",label:"No project",icon:{kind:"glyph",name:"none"},checked:!e.project,action:Re({projectId:null},{project:null,projectMilestone:null})},...y.map((_)=>({id:`project:${_.id}`,label:_.name,icon:{kind:"project",icon:_.icon,color:_.color},checked:e.project?.id===_.id,action:Re({projectId:_.id},{project:{id:_.id,name:_.name,color:_.color,icon:_.icon},projectMilestone:null})}))]},A=t.milestones??[],k=e.projectMilestone&&!A.some((_)=>_.id===e.projectMilestone.id)?[e.projectMilestone,...A]:A,b={id:"milestone",label:"Milestone",shortcut:"⇧M",icon:{kind:"glyph",name:"milestone"},loading:Boolean(e.project&&!t.milestones),searchable:k.length>=Un,children:[{id:"milestone:none",label:"No milestone",icon:{kind:"glyph",name:"none"},checked:!e.projectMilestone,action:Re({projectMilestoneId:null},{projectMilestone:null})},...k.map((_)=>({id:`milestone:${_.id}`,label:_.name,icon:{kind:"glyph",name:"milestone"},checked:e.projectMilestone?.id===_.id,action:Re({projectMilestoneId:_.id},{projectMilestone:{id:_.id,name:_.name}})}))]},N=t.team?.issueEstimationType,v=e.estimate!==null&&t.estimates.length&&!t.estimates.includes(e.estimate)?[...t.estimates,e.estimate].sort((_,Q)=>_-Q):t.estimates,j=v.length?{id:"estimate",label:"Estimate",shortcut:"⇧E",icon:{kind:"glyph",name:"estimate"},children:[{id:"estimate:none",label:"No estimate",checked:e.estimate===null,action:Re({estimate:null},{estimate:null})},...v.map((_)=>({id:`estimate:${_}`,label:`${nt(_,N)??_}${N==="tShirt"?"":_===1?" point":" points"}`,checked:e.estimate===_,action:Re({estimate:_},{estimate:_})}))]}:null,V=t.cycles??[],ae=e.cycle&&!V.some((_)=>_.id===e.cycle.id)?[e.cycle,...V]:V,z=t.team?.cyclesEnabled?{id:"cycle",label:"Cycle",shortcut:"⇧C",icon:{kind:"glyph",name:"cycle"},loading:!t.cycles,children:[{id:"cycle:none",label:"No cycle",checked:!e.cycle,action:Re({cycleId:null},{cycle:null})},...ae.map((_)=>({id:`cycle:${_.id}`,label:cl(_),checked:e.cycle?.id===_.id,action:Re({cycleId:_.id},{cycle:{id:_.id,number:_.number,name:_.name}})}))]}:null,re={id:"more",label:"More properties",icon:{kind:"glyph",name:"more"},children:[{id:"team",label:"Team",shortcut:"⌘⇧M",icon:{kind:"glyph",name:"assignee"},action:De("team")},{id:"release",label:"Release",shortcut:"⌥R",icon:{kind:"glyph",name:"project"},action:De("release")},{id:"sla",label:"SLA...",icon:{kind:"glyph",name:"due"},action:De("sla")},{id:"add-link",label:"Add link...",shortcut:"⌃L",icon:{kind:"glyph",name:"external"},action:De("link")},{id:"add-customer",label:"Add customer request...",shortcut:"⌃R",icon:{kind:"glyph",name:"assignee"},action:De("customer")},{id:"add-document",label:"Add document",icon:{kind:"glyph",name:"open"},action:De("document")},{id:"suggestions",label:"Find suggestions",icon:{kind:"glyph",name:"status"},action:De("suggestions")},{id:"rename",label:"Rename...",shortcut:"⇧R",icon:{kind:"glyph",name:"rename"},action:De("rename")}]},X={id:"create-related",label:"Create related",icon:{kind:"glyph",name:"related"},children:[{id:"create-related:related",label:"Related issue...",action:st(it.related,!0)},{id:"create-related:blocking",label:"Blocking issue...",action:st(it.blocking,!0)},{id:"create-related:blocked",label:"Blocked by issue...",action:st(it.blocked,!0)}]},W={id:"mark-as",label:"Mark as",icon:{kind:"glyph",name:"mark"},children:[{id:"mark-as:related",label:"Related to...",action:st(it.related,!1)},{id:"mark-as:blocking",label:"Blocking...",action:st(it.blocking,!1)},{id:"mark-as:blocked",label:"Blocked by...",action:st(it.blocked,!1)},{id:"mark-as:duplicate",label:"Duplicate of...",action:st(it.duplicate,!1)},{id:"mark-as:similar",label:"Similar to...",action:st(it.similar,!1)}]},S={id:"remove",label:"Remove",icon:{kind:"glyph",name:"remove"},children:[...e.parent?[{id:"remove:parent",label:`Parent issue ${e.parent.identifier}${e.parent.title?` ${e.parent.title}`:""}`,action:Re({parentId:null},{parent:null})}]:[],...e.inRelations.nodes.filter((_)=>_.type==="blocks").map((_)=>({id:`remove:blocked:${_.id}`,label:`Blocked issue ${_.issue.identifier} ${_.issue.title}`,action:{kind:"delete-relation",relationId:_.id,other:_.issue}})),...e.outRelations.nodes.filter((_)=>_.type==="blocks").map((_)=>({id:`remove:blocking:${_.id}`,label:`Blocking issue ${_.relatedIssue.identifier} ${_.relatedIssue.title}`,action:{kind:"delete-relation",relationId:_.id,other:_.relatedIssue}}))]},T={id:"convert",label:"Convert to",icon:{kind:"glyph",name:"convert"},children:[{id:"convert:subissue",label:"Sub-issue of...",action:De("convert-subissue")},...e.parent?[{id:"convert:top-level",label:"Top-level issue",action:Re({parentId:null},{parent:null})}]:[],{id:"convert:project",label:"Project...",action:De("convert-project")}]},ue={id:"copy",label:"Copy",icon:{kind:"glyph",name:"copy"},children:[{id:"copy:id",label:"Copy ID",action:{kind:"copy",text:e.identifier,what:e.identifier}},{id:"copy:link",label:"Copy link",action:{kind:"copy",text:e.url,what:"the link"}},{id:"copy:title",label:"Copy title",action:{kind:"copy",text:e.title,what:"the title"}},...e.branchName?[{id:"copy:branch",label:"Copy branch name",action:{kind:"copy",text:e.branchName,what:"the branch name"}}]:[],{id:"copy:markdown",label:"Copy as Markdown link",action:{kind:"copy",text:`[${e.identifier}: ${e.title}](${e.url})`,what:"the Markdown link"}}]};return[[o,r,c,m,E,O,b,...j?[j]:[],...z?[z]:[],re],[X,W,S],[{id:"open",label:"Open",icon:{kind:"glyph",name:"open"},action:{kind:"open"}},ue,T,{id:"make-copy",label:"Make a copy...",icon:{kind:"glyph",name:"copy"},action:De("copy")},{id:"open-in",label:"Open in",icon:{kind:"glyph",name:"external"},children:[{id:"open-in:linear",label:"Linear",icon:{kind:"glyph",name:"external"},action:{kind:"open-linear"}}]}],[{id:"favorite",label:"Favorite",shortcut:"⌥F",icon:{kind:"glyph",name:"favorite"},action:{kind:"favorite"}},{id:"remind",label:"Remind me",shortcut:"⇧H",icon:{kind:"glyph",name:"reminder"},children:[...ll(t.now).map((_)=>({id:`remind:${_.id}`,label:_.label,action:{kind:"reminder",at:_.at}})),{id:"remind:custom",label:"Custom...",action:De("reminder-custom")}]}],[{id:"delete",label:"Delete...",icon:{kind:"glyph",name:"delete"},danger:!0,action:{kind:"delete"}}]]},Ki=(e,t)=>{let n=t.toLowerCase().split(/\s+/).filter(Boolean);return n.length?e.filter((o)=>n.every((r)=>o.label.toLowerCase().includes(r))):e},zi=(e,t,n,o=!1,r=!1,s=!1)=>{if(!e)return!1;return n===e.includes("⇧")&&o===e.includes("⌘")&&r===e.includes("⌥")&&s===e.includes("⌃")&&t.toUpperCase()===e.slice(-1)};var qi=(e)=>[...e??[]].sort(Mn);var _r=(e)=>qi(e).filter((t)=>t.type==="started"||t.type==="unstarted"&&/plan/i.test(t.name)),Nn=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let o=_r(t);if(e.state.type==="started"||o.some((r)=>r.id===e.state.id))return null;return Yi(o.filter((r)=>r.type==="started"),n,o)},Yi=(e,t,n=e)=>{let o=t?.trim().toLowerCase();return(o?n.find((r)=>r.name.trim().toLowerCase()===o):void 0)??e.find((r)=>/^in progress$/i.test(r.name.trim()))??e.find((r)=>/progress|doing|working|development|started/i.test(r.name))??e.find((r)=>!/block|hold|pause|wait|stuck/i.test(r.name))??e[0]??null},Ji=(e)=>/plan/i.test(e.name),Qi=(e)=>qi(e).filter((t)=>t.type==="started"&&!Ji(t)),Er=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!Ji(e.state))return null;return Yi(Qi(t),n)},hr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let o=_r(t);if(e.state.type==="started"||o.some((r)=>r.id===e.state.id))return null;return o.find((r)=>/plan/i.test(r.name))??Nn(e,t,n)},Zi=(e,t,n,o)=>{let r=e==="build"?Qi(n):_r(n),s=e==="build"?Er(t,n,o):e==="plan"?hr(t,n,o):Nn(t,n,o),a=s??r.find((c)=>c.id===t.state.id)??null;return{options:r,target:a,moves:s!==null}},dl={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},Sr=(e)=>{let t=e?dl[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]},Ln=(e)=>Sr({issueEstimationType:e.issueEstimationType??"notUsed",issueEstimationAllowZero:e.issueEstimationAllowZero??!1,issueEstimationExtended:e.issueEstimationExtended??!1}),ea=(e,t)=>{let n=t.trim().replace(/^refs\/heads\//,"").toLowerCase();if(!n)return null;return e.find((o)=>o.status==="ready"&&o.branch.replace(/^refs\/heads\//,"").toLowerCase()===n)?.directory??null},gr=(e,t)=>t>0?`${e}-${t+1}`:e;var ta=(e)=>Math.max(1,Math.floor(Number.isFinite(e)?e:1));var na=(e,t)=>e.name.localeCompare(t.name),oa=(e)=>Fe(`team-people:${e}`,async()=>(await F(pi,{teamId:e})).team),ul=()=>Fe("workspace-labels",async()=>(await F(fi)).issueLabels.nodes.filter((e)=>!e.team).map(({team:e,...t})=>t)),ra=(e)=>Le(e?`pickers:${e}`:null,async()=>{let[t,n]=await Promise.all([oa(e),ul()]),o=new Set,r=[...t.labels.nodes,...n].filter((s)=>o.has(s.id)?!1:(o.add(s.id),!0)).sort(na);return{members:t.members.nodes.filter((s)=>s.active).sort(na),labels:r}});var sa=(e,t)=>Le(e?`open-cycles:${e}`:null,async()=>(await F(Si,{teamId:e,minNumber:ta(t)})).team.cycles.nodes.filter((o)=>o.isActive||o.isFuture).sort((o,r)=>o.number-r.number));var pl=new Map,fl=(e)=>{for(let t of e)pl.set(t.id,t);return e};var ml={type:{nin:["completed","canceled"]}};var _l=async(e)=>{let t=await F(mi,{after:null,filter:{accessibleTeams:{some:{id:{eq:e}}},status:ml}});return fl(t.projects.nodes).sort((n,o)=>n.name.localeCompare(o.name))};var ia=(e)=>{let t=e.length?`team-projects:${[...e].sort().join(",")}`:null;return Le(t,async()=>{let n=await Promise.all(e.map((r)=>Fe(`team-projects:${r}`,()=>_l(r)))),o=new Set;return n.flat().filter((r)=>o.has(r.id)?!1:(o.add(r.id),!0))})};var aa=(e)=>Le(e?`project-milestones:${e}`:null,async()=>[...(await F(_i,{projectId:e})).project.projectMilestones.nodes].sort((n,o)=>n.sortOrder-o.sortOrder));var Ne=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof Te&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof Te&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},El=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),ca=(e,t)=>ai((n,o)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&El(o)&&o.issues.some((r)=>r.id===e)){let{description:r,...s}=t;return{...o,issues:o.issues.map((a)=>a.id===e?{...a,...s}:a)}}if(n.startsWith("block:")&&o instanceof Map){let r=!1,s=new Map;for(let[a,c]of o)if(c.id!==e)s.set(a,c);else{let{description:f,...m}=t;s.set(a,{...c,...m}),r=!0}return r?s:o}if(n.startsWith("issue:")&&typeof o==="object"&&o!==null&&o.id===e){let{team:r,...s}=t;return{...o,...s}}return o}),hl=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new Te("graphql","Linear did not save the change.");return e.issueUpdate.issue},Je=async(e,t)=>{let n=ca(e.id,t.patch);try{let o=hl(await F(gi,{id:e.id,input:t.input}));if(ca(e.id,o),pt(`issue:${e.identifier}`),"stateId"in t.input)de("children:");if("projectMilestoneId"in t.input||"projectId"in t.input)de("issues:"),de("view-issues:"),de("milestone-counts:");if("parentId"in t.input)de("issues:"),de("view-issues:"),de("children:");if(["releaseIds","addedReleaseIds","removedReleaseIds"].some((r)=>(r in t.input)))de("extras:"),de("issue-releases:");return o}catch(o){throw n(),o}};var la=async(e)=>{let t=await F(Ai,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new Te("graphql","Linear did not create the issue.");if(de("issues:"),de("view-issues:"),"parentId"in e)de("children:");return t.issueCreate.issue},Dn=(e,t)=>{if(!Object.values(e).every((n)=>n.success))throw new Te("graphql",t)};var da=async(e,t)=>{let n=await F(yi,{input:{issueId:e.id,...t}});if(!n.documentCreate.success)throw new Te("graphql","Linear did not create the document.");return pt(`issue:${e.identifier}`),n.documentCreate.document},ua=async(e,t,n)=>{let o=await F(bi,{id:t,input:n});if(!o.documentUpdate.success)throw new Te("graphql","Linear did not update the document.");return pt(`issue:${e.identifier}`),pt(`document:${t}`),o.documentUpdate.document};var Sl=(e,t)=>{pt(`issue:${e.identifier}`),pt(`issue:${t.identifier}`),de("issues:"),de("view-issues:")};var pa=async(e,t,n)=>{Dn(await F(Ti,{id:n}),"Linear did not remove the relation."),Sl(e,t)},fa=async(e)=>{let t=await F(Ei,{id:e.id});if(t.issue.favorite)return Dn(await F(xi,{id:t.issue.favorite.id}),"Linear did not remove the favorite."),!1;return Dn(await F(ki,{input:{issueId:e.id}}),"Linear did not favorite the issue."),!0},ma=async(e,t)=>{Dn(await F(Ri,{id:e.id,reminderAt:t}),"Linear did not set the reminder.")};var Bt=236,Ht=240,Qe=6,Ie={width:14,height:14,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor","stroke-width":1.4,"stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":!0},gl={status:()=>i("svg",{...Ie,children:[i("circle",{cx:"8",cy:"8",r:"5.5"},void 0,!1,void 0,this),i("path",{d:"M8 2.5a5.5 5.5 0 0 1 0 11z",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),priority:()=>i(mt,{priority:2},void 0,!1,void 0,this),assignee:()=>i("svg",{...Ie,children:[i("circle",{cx:"8",cy:"5.5",r:"2.5"},void 0,!1,void 0,this),i("path",{d:"M3 13.5c.6-2.6 2.6-4 5-4s4.4 1.4 5 4"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),due:()=>i("svg",{...Ie,children:[i("rect",{x:"2.5",y:"3.5",width:"11",height:"10",rx:"2"},void 0,!1,void 0,this),i("path",{d:"M2.5 6.5h11M5.5 2v3M10.5 2v3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),labels:()=>i("svg",{...Ie,children:[i("path",{d:"M2.5 3.5v4l6 6 5-5-6-6h-4z"},void 0,!1,void 0,this),i("circle",{cx:"5.5",cy:"5.5",r:"0.8",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),project:()=>i(_t,{icon:null,color:null,size:14},void 0,!1,void 0,this),milestone:()=>i(Di,{size:14},void 0,!1,void 0,this),estimate:()=>i(Li,{size:14},void 0,!1,void 0,this),cycle:()=>i(wn,{size:14},void 0,!1,void 0,this),copy:()=>i("svg",{...Ie,children:[i("rect",{x:"5",y:"2.5",width:"8.5",height:"10",rx:"1.5"},void 0,!1,void 0,this),i("path",{d:"M3 5v8a1.5 1.5 0 0 0 1.5 1.5H10"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),open:()=>i("svg",{...Ie,children:[i("rect",{x:"2.5",y:"2.5",width:"11",height:"11",rx:"2"},void 0,!1,void 0,this),i("path",{d:"M9.5 2.5v11"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),external:()=>i("span",{class:"lin-menu-ext",children:i(Fi,{},void 0,!1,void 0,this)},void 0,!1,void 0,this),delete:()=>i("svg",{...Ie,children:i("path",{d:"M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.7 9h5.6l.7-9"},void 0,!1,void 0,this)},void 0,!1,void 0,this),none:()=>i("svg",{...Ie,"stroke-dasharray":"2 2",children:i("circle",{cx:"8",cy:"8",r:"5.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this),more:()=>i("svg",{...Ie,children:[i("circle",{cx:"4",cy:"4",r:"1"},void 0,!1,void 0,this),i("circle",{cx:"4",cy:"8",r:"1"},void 0,!1,void 0,this),i("circle",{cx:"4",cy:"12",r:"1"},void 0,!1,void 0,this),i("path",{d:"M8 4h5M8 8h5M8 12h5"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),related:()=>i("svg",{...Ie,children:[i("rect",{x:"2",y:"2",width:"5",height:"5",rx:"1"},void 0,!1,void 0,this),i("rect",{x:"9",y:"9",width:"5",height:"5",rx:"1"},void 0,!1,void 0,this),i("path",{d:"M6 6l4 4M10 4h3v3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),mark:()=>i("svg",{...Ie,children:i("path",{d:"M4 14V2.5h8l-1.5 3L12 8.5H4"},void 0,!1,void 0,this)},void 0,!1,void 0,this),remove:()=>i("svg",{...Ie,children:[i("path",{d:"M3 3l10 10M13 3L3 13"},void 0,!1,void 0,this),i("rect",{x:"2",y:"2",width:"12",height:"12",rx:"2"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),convert:()=>i("svg",{...Ie,children:i("path",{d:"M3 5h8M8.5 2.5 11 5 8.5 7.5M13 11H5M7.5 8.5 5 11l2.5 2.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this),favorite:()=>i("svg",{...Ie,children:i("path",{d:"m8 2 1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.4l-3.6 1.9.7-4.1-3-2.9 4.1-.6z"},void 0,!1,void 0,this)},void 0,!1,void 0,this),reminder:()=>i("svg",{...Ie,children:[i("circle",{cx:"8",cy:"8.5",r:"5.5"},void 0,!1,void 0,this),i("path",{d:"M8 5v3.5l2.5 1.5M5 1.5 2.5 4M11 1.5 13.5 4"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),rename:()=>i("svg",{...Ie,children:i("path",{d:"m3 10-.5 3.5L6 13l7.5-7.5-3-3zM9.5 3.5l3 3"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},Tl=({icon:e})=>{if(!e)return i("span",{class:"lin-menu-icon"},void 0,!1,void 0,this);let t=e.kind==="state"?i(ft,{type:e.state.type,color:e.state.color,teamId:e.teamId,stateId:e.state.id},void 0,!1,void 0,this):e.kind==="priority"?i(mt,{priority:e.priority},void 0,!1,void 0,this):e.kind==="person"?i(rt,{name:e.name,url:e.url,size:16},void 0,!1,void 0,this):e.kind==="swatch"?i("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this):e.kind==="project"?i(_t,{icon:e.icon,color:e.color,size:14},void 0,!1,void 0,this):gl[e.name]();return i("span",{class:"lin-menu-icon",children:t},void 0,!1,void 0,this)},yl=()=>{let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`},$n=({issue:e,x:t,y:n,propertiesOnly:o=!1,onClose:r,onOpen:s,onDelete:a,onAction:c})=>{let f=Pi(),m=f.data?.teamsById.get(e.team.id),u=ra(e.team.id),h=ia([e.team.id]),E=aa(e.project?.id??null),d=sa(m?.cyclesEnabled?e.team.id:null,m?.activeCycle?.number),y=Wi(e,{states:f.data?.statesByTeam.get(e.team.id)??[],team:m,estimates:Sr(m),members:u.data?.members,labels:u.data?.labels,projects:h.data,milestones:e.project?E.data:[],cycles:m?.cyclesEnabled?d.data:[],today:yl(),now:new Date}),O=o?[y[0].filter((g)=>g.id!=="more")]:y,A=O.flat(),k=we(null),b=we(null),N=we(null),[v,j]=C({left:Math.max(Qe,Math.min(t,window.innerWidth-Bt-Qe)),top:n}),[V,ae]=C(null),[z,re]=C(0),[X,W]=C(""),[S,T]=C(-1),[ue,_]=C(-1),[Q,me]=C(!1),ye=v.left+Bt+Ht>window.innerWidth-Qe&&v.left-Ht<Qe,pe=!ye&&v.left+Bt+Ht>window.innerWidth-Qe,L=A.find((g)=>g.id===V&&g.children),x=L?Ki(L.children??[],X):[];Go(()=>{let g=k.current?.getBoundingClientRect();if(!g)return;let U=Math.max(Qe,Math.min(n,window.innerHeight-g.height-Qe));if(U!==v.top)j((G)=>({...G,top:U}))},[V,ye]);let be=(g,U,G)=>{if(!g.children)return;ae(g.id),W(""),_(G?0:-1),me(G||ye);let Ae=U?.getBoundingClientRect();if(Ae)re(Ae.top-5);if(g.searchable)setTimeout(()=>N.current?.focus(),0)},Z=()=>{ae(null),me(!1),W("")},K=(g)=>{let U=g.action;if(!U)return;if(U.kind==="change"){if(Je(e,U.change).catch((G)=>oe(I,"error",Ne(G))),g.keepOpen)return}if(U.kind==="copy")Vi(U.text,U.what);if(U.kind==="open")s?.(e);if(U.kind==="open-linear")I.openUrl(e.url);if(U.kind==="favorite")fa(e).then((G)=>oe(I,"success",G?`Added ${e.identifier} to favorites`:`Removed ${e.identifier} from favorites`)).catch((G)=>oe(I,"error",Ne(G)));if(U.kind==="reminder")ma(e,U.at).then(()=>oe(I,"success",`Reminder set for ${new Date(U.at).toLocaleString()}`)).catch((G)=>oe(I,"error",Ne(G)));if(U.kind==="prompt"||U.kind==="relation")c?.(e,U);if(U.kind==="delete-relation")pa(e,U.other,U.relationId).then(()=>oe(I,"success",`Removed relation with ${U.other.identifier}`)).catch((G)=>oe(I,"error",Ne(G)));if(U.kind==="delete")a?.(e);r()},ee=(g,U,G=!1)=>g.children?be(g,U,G):K(g),Ve=(g)=>k.current?.ownerDocument.querySelector(`[data-menu-item="${CSS.escape(g)}"]`)??null;Go(()=>{if(!V)return;let g=Ve(V);if(!g)return;let U=b.current?.getBoundingClientRect().height??320,G=g.getBoundingClientRect().top-5,Ae=Math.max(Qe,Math.min(G,window.innerHeight-U-Qe));if(Ae!==z)re(Ae)},[V,ye,v.left,v.top,X,x.length]);let Ot=we(()=>{return});Ot.current=(g)=>{g.stopPropagation();let U=g.target===N.current;if(g.key==="Escape"){if(g.preventDefault(),V)Z();else r();return}if(g.key==="Tab"){g.preventDefault();return}let G=Boolean(V)&&Q,Ae=G?x:A,he=G?ue:S,vt=G?_:T;if(g.key==="ArrowDown"||g.key==="ArrowUp"){if(g.preventDefault(),!Ae.length)return;let ke=g.key==="ArrowDown"?1:-1;vt(he<0?ke>0?0:Ae.length-1:(he+ke+Ae.length)%Ae.length);return}if(g.key==="ArrowLeft"&&G&&!(U&&X)){g.preventDefault(),Z();return}if((g.key==="ArrowRight"||g.key==="Enter")&&!G){let ke=A[he];if(!ke||g.key==="ArrowRight"&&!ke.children)return;g.preventDefault(),ee(ke,Ve(ke.id),!0);return}if(g.key==="Enter"&&G){let ke=x[Math.max(0,ue)];if(g.preventDefault(),ke)K(ke);return}if(U)return;let Mt=g.code.startsWith("Key")?g.code.slice(3):g.key,Ze=Ae.find((ke)=>zi(ke.shortcut,Mt,g.shiftKey,g.metaKey,g.altKey,g.ctrlKey));if(Ze){if(g.preventDefault(),G)_(x.indexOf(Ze)),K(Ze);else T(A.indexOf(Ze)),ee(Ze,Ve(Ze.id),!0);return}if(g.metaKey||g.ctrlKey||g.altKey)return};let Ct=we(r);Ct.current=r,Se(()=>{let g=(G)=>Ot.current(G),U=()=>Ct.current();return window.addEventListener("keydown",g,!0),window.addEventListener("resize",U),window.addEventListener("blur",U),()=>{window.removeEventListener("keydown",g,!0),window.removeEventListener("resize",U),window.removeEventListener("blur",U)}},[]);let wt=(g,U,G)=>{let Ae=G?U===ue&&Q:U===S&&!Q;return i("button",{type:"button",role:"menuitem",class:"lin-menu-item","data-menu-item":g.id,"data-active":Ae||!G&&g.id===V?"true":void 0,"data-danger":g.danger?"true":void 0,"aria-haspopup":g.children?"menu":void 0,"aria-expanded":g.children?g.id===V?"true":"false":void 0,"aria-checked":g.checked===void 0?void 0:g.checked?"true":"false",onMouseEnter:(he)=>{if(G){_(U),me(!0);return}if(T(U),me(!1),ye)return;if(g.children)be(g,he.currentTarget,!1);else if(V)Z()},onClick:(he)=>G?K(g):ee(g,he.currentTarget),children:[i(Tl,{icon:g.icon},void 0,!1,void 0,this),i("span",{class:"lin-menu-label",children:g.label},void 0,!1,void 0,this),g.checked&&i("span",{class:"lin-menu-check","aria-hidden":"true",children:"✓"},void 0,!1,void 0,this),g.shortcut&&i("kbd",{class:"lin-menu-key",children:g.shortcut},void 0,!1,void 0,this),g.children&&i("span",{class:"lin-menu-more","aria-hidden":"true",children:"›"},void 0,!1,void 0,this)]},g.id,!0,void 0,this)},at=L&&i(xe,{children:[L.searchable&&i("input",{ref:N,class:"lin-menu-search",placeholder:`${L.label}...`,"aria-label":`Filter ${L.label.toLowerCase()}`,value:X,onInput:(g)=>{W(g.target.value),_(0),me(!0)}},void 0,!1,void 0,this),L.loading&&!x.length&&i("div",{class:"lin-menu-note",children:"Loading"},void 0,!1,void 0,this),!L.loading&&!x.length&&i("div",{class:"lin-menu-note",children:X?"No match":"Nothing to choose"},void 0,!1,void 0,this),i("div",{class:"lin-menu-scroll",children:x.map((g,U)=>wt(g,U,!0))},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return i("div",{class:"lin-menu-layer",onMouseDown:(g)=>{if(g.target===g.currentTarget)r()},onWheel:(g)=>{if(g.target===g.currentTarget)r()},onContextMenu:(g)=>{g.preventDefault(),r()},children:[i("div",{ref:k,class:"lin-menu",role:"menu","aria-label":`${e.identifier} actions`,style:{left:`${v.left}px`,top:`${v.top}px`,width:`${Bt}px`},children:ye&&L?i(xe,{children:[i("button",{type:"button",class:"lin-menu-item lin-menu-back",onClick:Z,children:[i("span",{class:"lin-menu-icon","aria-hidden":"true",children:"‹"},void 0,!1,void 0,this),i("span",{class:"lin-menu-label",children:L.label},void 0,!1,void 0,this)]},void 0,!0,void 0,this),at]},void 0,!0,void 0,this):O.map((g,U)=>i("div",{class:"lin-menu-section",children:g.map((G)=>wt(G,A.indexOf(G),!1))},U,!1,void 0,this))},void 0,!1,void 0,this),!ye&&L&&i("div",{ref:b,class:"lin-menu lin-menu--sub",role:"menu","aria-label":L.label,style:{left:`${pe?v.left-Ht+4:v.left+Bt-4}px`,top:`${z}px`,width:`${Ht}px`},children:at},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var bl=/^[A-Za-z]{1,7}-\d+$/;var _a=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!bl.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()},kt=(e)=>{let t=typeof e==="string"?e:Array.isArray(e)?e.filter((s)=>typeof s==="string").join(","):"",n=[],o=[],r=0;for(let s of t.split(/[,;\s]+/)){if(!s)continue;let a=_a(s);if(!a){if(o.length<3&&!o.includes(s.slice(0,24)))o.push(s.slice(0,24));continue}if(n.includes(a))continue;if(n.length>=25)r+=1;else n.push(a)}return{ids:n,skipped:o,cut:r}},Ea=(e,t)=>{if(typeof e!=="string")return"";let n=e.replace(/\s+/g," ").trim();return n.length>t?`${n.slice(0,t-3).trimEnd()}...`:n},ha=(e)=>Ea(e,160),Sa=(e)=>Ea(e,400),Gn=(e)=>{let t=new Map;for(let n of e){let[o,r]=n.split("-"),s=t.get(o)??[];s.push(Number(r)),t.set(o,s)}return{or:[...t].map(([n,o])=>({and:[{team:{key:{eqIgnoreCase:n}}},{number:{in:o}}]}))}},ga=(e)=>{let t=new Map;for(let o of e){let r=t.get(o.team.id)??[];r.push(o),t.set(o.team.id,r)}let n=new Map;for(let o of t.values())o.sort((r,s)=>r.position-s.position),o.forEach((r,s)=>n.set(r.id,(s+1)/(o.length+1)));return n},Ta=(e)=>`${e.identifier} ${e.title}`.slice(0,1900),Tr=(e)=>{let t=e?.trim().split(/\s+/,1)[0];return _a(t)};var kl=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,ya=(e)=>{if(!e)return[];let t=[],n=(r)=>{let s=r?.toUpperCase();if(s&&!t.includes(s))t.push(s)},o=[...e.links??[]].sort((r,s)=>(s.linkedAt??0)-(r.linkedAt??0));for(let r of o)n(r.url.match(kl)?.[1]);for(let r of e.items??[]){let s=r.data?.identifier;if(typeof s==="string")n(s)}return t};var xl="plan";var Rl=(e)=>({sessionId:e.id,directory:e.directory,title:e.title,agent:e.agent??null,inWorktree:e.worktree!==null,updatedAt:e.updatedAt}),ba=(e,t,n=new Set)=>{let o=t.toUpperCase(),r=(s)=>(s.agent===xl?0:2)+(s.inWorktree?0:1);return e.filter((s)=>s.archivedAt===null&&s.parentId===null&&(n.has(s.id)||ya(s).includes(o))).map(Rl).sort((s,a)=>r(s)-r(a)||a.updatedAt-s.updatedAt)[0]??null};var Al=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,Il=1e5,ka=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),xa=(e,t,n)=>{let o=ka(t.trim()).trim(),r=n?`${o}

**Full plan:** [Read the full plan document](${n})`:o,s=(e??"").replace(Al,"").trimEnd(),a=`---
## Plan

${r}`,c=s?`${s}

${a}`:a;return c.length>Il?null:c};var Bn=6500,Ra=(e)=>e.length>Bn,Ol=(e)=>{if(e.length<=Bn)return e;let t=e.slice(0,Bn-1),n=t.lastIndexOf(`

`),o=t.lastIndexOf(" "),r=n>Bn/2?n:o;return`${t.slice(0,r>0?r:t.length).trimEnd()}…`},Aa=(e)=>Ol(ka(e.trim()).trim()),Ia=(e,t=6,n=420)=>{let o=e.trim().split(`
`).filter((r)=>r.trim()).slice(0,t).join(`
`);return o.length>n?`${o.slice(0,n).trimEnd()}...`:o};var Oa="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var ET=new RegExp("```linear-plan[^\\n]*\\n([\\s\\S]*?)```","g");var Cl=(e,t)=>typeof e==="string"?e.replace(/\s+/g," ").trim().slice(0,t):"";var yr=(e,t)=>{if(e===null||t.length===0)return null;let n=t[0];for(let o of t)if(Math.abs(o-e)<Math.abs(n-e)||Math.abs(o-e)===Math.abs(n-e)&&o>n)n=o;return n},Ca=(e,t)=>{if(e.length===0)return'This team does not use estimates: leave "estimate" out.';return`Estimates on this team, written as the number: ${e.map((o)=>{let r=t(o);return r&&r!==String(o)?`${r} = ${o}`:String(o)}).join(", ")}.`},wa=(e,t,n)=>[e.description,`Split out of ${t} by the plan in "${Cl(n,120)}". Created by Linear+.`].filter(Boolean).join(`

---

`);var br=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["sessionId","identifier","directory","sessionTitle","state"].every((n)=>typeof t[n]==="string")&&typeof t.extras==="object"&&t.extras!==null&&Array.isArray(t.extras.issues)};var wl=["No priority","Urgent","High","Medium","Low"],kr=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${wl[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],n=e.comments.nodes.slice(-5).map((r)=>`${r.user?.name??"Someone"} (${Be(r.createdAt)}): ${r.body}`),o=[...t,...n.length?["","Latest comments:",...n]:[]].filter((r,s,a)=>r||a[s-1]).join(`
`);return o.length>15000?`${o.slice(0,15000)}
[cut]`:o};var Hn=async(e)=>{try{let t=await I.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},vl=async(e,t)=>{try{return await I.storage.set(e,t),!0}catch{return!1}};var jt=async()=>await Hn("pref:start-moves")!==!1;var va=async()=>await Hn("pref:assign-me")===!0;var jn=async()=>await Hn("pref:lead-mode")===!0;var Ft=async(e)=>{let t=await Hn(`pref:start-state:${e}`);return typeof t==="string"?t:null},Vt=(e,t)=>vl(`pref:start-state:${e}`,t);var Ma=async(e,t)=>{let n=await I.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:kr(e),data:{issueId:e.id,identifier:e.identifier},worktree:t.existing?{kind:"existing",directory:t.existing}:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(n.sessionId===null)return{started:!1,directory:n.directory};let o=t.state??Nn(e,e.team.states.nodes),{moved:r,moveError:s}=await Pa(e,o,t.move);return{started:!0,sessionId:n.sessionId,target:o,moved:r,moveError:s}},Pa=async(e,t,n)=>{let o=!1,r=null;if(n&&t)try{await Je(e,{input:{stateId:t.id},patch:{state:t}}),o=!0}catch(s){r=Ne(s)}return{moved:o,moveError:r}},Ua=async(e,t)=>{let n=t.lead??await jn().catch(()=>!1),o=t.existing??null,r=n?t.existingSession??null:null;if(!o){let m=await I.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",data:{issueId:e.id,identifier:e.identifier},worktree:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(m.sessionId===null)return{started:!1,directory:m.directory};if(o=m.worktree?.directory??m.directory??t.directoryHint??null,!o)return{started:!1,directory:"",error:"The host did not say which folder the session is in."};if(n)r=m.sessionId}let s;try{let m=Ca(Ln(e.team),(u)=>nt(u,e.team.issueEstimationType));s=(await La({identifier:e.identifier,directory:o,issueTitle:e.title,context:kr(e),scale:m,...t.model?{model:t.model}:{},...n?{lead:r??!0,leadTitle:`${e.identifier} ${e.title}`}:{}})).sessionId}catch(m){return{started:!1,directory:o,error:m instanceof Error?m.message:String(m),...r?{session:r}:{}}}let a=t.state??hr(e,e.team.states.nodes),{moved:c,moveError:f}=await Pa(e,a,t.move);return{started:!0,sessionId:s,target:a,moved:c,moveError:f}},xr=(e)=>e.replace(/\/+$/,""),Rr=async(e)=>{if(!e)return null;try{let t=xr(e),n=(await I.listProjects())?.projects??[],o=n.find((r)=>xr(r.directory)===t);if(o)return o;for(let r of n)if(((await I.listWorktrees(r.id))?.worktrees??[]).some((a)=>xr(a.directory)===t))return r}catch{}return null},Na=async(e,t)=>{try{let n=await Rr(e);if(!n)return null;return ea((await I.listWorktrees(n.id))?.worktrees??[],t)}catch{return null}},Fn=async(e)=>{try{await I.openSession(e)}catch{}};var Da=async(e,t)=>{let n=await Ml(t);try{let r=await Rr(e);if(r){let s=await I.listSessions(r.id),a=ba(s?.sessions??[],t,new Set(n.map((c)=>c.sessionId)));if(a)return a}}catch{}let o=n[0];return o?{sessionId:o.sessionId,directory:o.sessionDirectory,title:o.title,agent:"plan",inWorktree:!0,updatedAt:o.createdAt}:null},Ml=async(e)=>{let t=await He(I,"GET","/plans",{query:{identifier:e},name:"Linear+"}),n=t.ok===!1?[]:t.sessions;if(!Array.isArray(n))return[];return n.map((o)=>o).filter((o)=>typeof o.sessionId==="string"&&typeof o.createdAt==="number").map((o)=>({sessionId:o.sessionId,sessionDirectory:typeof o.sessionDirectory==="string"?o.sessionDirectory:typeof o.directory==="string"?o.directory:"",title:typeof o.title==="string"?o.title:`${e} plan`,createdAt:o.createdAt})).filter((o)=>o.sessionDirectory.startsWith("/"))};var $a=async(e)=>{let t=await He(I,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{},...e.model?{model:e.model}:{},...e.planText?{planText:e.planText}:{}},name:"Linear+"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear+ service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},Xt=async(e)=>{let t=await He(I,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier,...e.planText?{planText:e.planText}:{}},name:"Linear+"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear+ service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1,lead:t.lead===!0}},La=async(e)=>{let{model:t,...n}=e,o=await He(I,"POST","/plan",{body:t?{...n,model:t}:n,name:"Linear+"});if(o.ok===!1||typeof o.sessionId!=="string")throw Error(o.error??"The Linear+ service did not start the plan.");return{sessionId:o.sessionId,directory:typeof o.directory==="string"?o.directory:e.directory}};var Ga=async(e)=>{let t=await He(I,"GET","/extras",{query:{sessionId:e},name:"Linear+"});return t.ok!==!1&&br(t.extras)?t.extras:null},Vn=async(e)=>{let t=await He(I,"POST","/handoffs",{body:e,name:"Linear+"});if(t.ok===!1)return null;if(e.action==="claim-extras"&&t.claimed!==!0)return null;return br(t.state)?t.state:null};var Oe=(e,t="inline-flex")=>(n)=>{let o=Js(e,n);return i("span",{ref:o,style:{display:t}},void 0,!1,void 0,this)},Ce=Oe(ze),Xn=Oe(Rn),jT=Oe(Jo,"block"),FT=Oe(Qo,"block"),VT=Oe(er),XT=Oe(ar),WT=Oe(tr),xt=Oe(rr),$e=Oe(sr,"block"),Ba=Oe(or,"block"),KT=Oe(ir,"block"),zT=Oe(nr,"block"),qT=Oe(Zo),Rt=Oe(An),YT=Oe(An,"block"),JT=Oe(Rn,"block");var Ha=(e)=>typeof e==="object"&&e!==null&&typeof e.agent==="string"&&(e.model===void 0||typeof e.model==="string"),ja=(e)=>typeof e==="object"&&e!==null&&typeof e.id==="string"&&typeof e.label==="string",Fa=(e)=>{if(!e||e.ok===!1||!Array.isArray(e.agents)||!Array.isArray(e.models))return null;return{agents:e.agents.filter(ja),models:e.models.filter(ja),defaultModel:typeof e.defaultModel==="string"?e.defaultModel:null,...Ha(e.current?.plan)&&Ha(e.current?.build)?{current:e.current}:{}}},Wn="__default";var Va=(e,t)=>{let n=e.current?.[t].model;if(n)return e.models.find((r)=>r.id===n)?.label??n;let o=e.defaultModel?e.models.find((r)=>r.id===e.defaultModel)?.label??e.defaultModel:null;return o?`${o} (default)`:"the default model"};var Xa=async(e)=>Fa(await He(I,"GET","/choices",{query:{directory:e},name:"Linear+"}));var Kn=({role:e,directory:t,value:n,onChange:o,disabled:r})=>{let s=Le(`start-choices:${t??""}`,()=>Xa(t));if(!s.data)return null;let a=[{id:Wn,label:`From Settings: ${Va(s.data,e)}`},...s.data.models];return i("div",{class:"lin-model-pick",children:i(Xn,{label:e==="plan"?"Plan model":"Build model",value:n||Wn,options:a,searchable:!0,searchPlaceholder:"Search models",disabled:r,onChange:(c)=>o(c===Wn?"":c)},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var zn=(e,t,n,o)=>{let r=Lt(()=>t?Zi(e,t,t.team.states.nodes,n):null,[e,t,n]),[s,a]=C(null),[c,f]=C(null),m=r?.options??[],u=m.find((d)=>d.id===s)??r?.target??null,h=c??Boolean(r?.moves&&o),E=Boolean(t&&u&&h&&u.id!==t.state.id);return{options:m,selected:u,move:E,select:(d)=>{if(a(d),t&&d!==t.state.id)f(!0)},toggle:f}},qn=({choice:e,disabled:t})=>i("div",{class:"lin-move-row",children:[i(Rt,{label:"Move the issue to",checked:e.move,disabled:t||e.options.length===0,onChange:e.toggle},void 0,!1,void 0,this),e.options.length>0&&i(Xn,{value:e.selected?.id??null,options:e.options.map((n)=>({id:n.id,label:n.name})),disabled:t,onChange:e.select},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Ar=new Set,Wa=async(e,t)=>{if(Ar.has(e.sessionId))return null;Ar.add(e.sessionId);try{let n=await Vn({sessionId:e.sessionId,action:"claim-extras"});if(!n)return null;let o=n.estimateDone===!0,r=n.estimateSet??null,s=[...n.created??[]],a=(c)=>String(c);try{let c=(await F(ot,{id:n.identifier})).issue,f=Ln(c.team);if(a=(h)=>nt(h,c.team.issueEstimationType)??String(h),!o){let h=c.estimate===null?yr(n.extras.estimate,f):null;if(h!==null)await Je(c,{input:{estimate:h},patch:{estimate:h}}),r=h;o=!0}let m=t&&await va().catch(()=>!1)?t:null;for(let h of n.extras.issues.slice(s.length)){let E=yr(h.estimate,f),d=await la({teamId:c.team.id,title:h.title,description:wa(h,c.identifier,n.sessionTitle),...c.project?{projectId:c.project.id}:{},...E!==null?{estimate:E}:{},...m?{assigneeId:m}:{}});s.push(d.identifier),await F(ur,{input:{issueId:d.id,relatedIssueId:c.id,type:"related"}})}return{state:await Vn({sessionId:n.sessionId,action:"extras-done",estimateDone:o,estimateSet:r,created:s})??{...n,state:"done",estimateDone:o,estimateSet:r,created:s},label:a}}catch(c){let f=Ne(c);return{state:await Vn({sessionId:n.sessionId,action:"extras-failed",estimateDone:o,estimateSet:r,created:s,error:f})??{...n,state:"failed",estimateDone:o,estimateSet:r,created:s,error:f},label:a}}}finally{Ar.delete(e.sessionId)}};var Ka=(e)=>{let t=e.match(/^https?:\/\/([^/]+)\/(.+?)\/-\/merge_requests\/\d+/i);if(t)return{host:t[1].toLowerCase(),path:t[2]};let n=e.match(/^https?:\/\/([^/]+)\/([^/]+\/[^/]+)\/pull\/\d+/i);if(n)return{host:n[1].toLowerCase(),path:n[2]};return null};var Pl=/(?:^|[^A-Za-z0-9])([A-Za-z][A-Za-z0-9]{0,6}-\d{1,9})(?![A-Za-z0-9])/g,Ul=/^## Related repositories$/m,za=(e)=>{let t=Ka(e);if(t)return t;try{let n=new URL(e),o=n.hostname.toLowerCase(),r=n.pathname.replace(/^\/+|\/+$/g,"").replace(/\.git$/,"");if(o==="gitlab.com"){let s=r.indexOf("/-/");if(s>=0)r=r.slice(0,s);return r.split("/").length>=2?{host:o,path:r}:null}if(o==="github.com"){let s=r.split("/");return s.length>=2?{host:o,path:s.slice(0,2).join("/")}:null}}catch{return null}return null},Yn=(e)=>`${e.host}/${e.path}`,Nl=(e)=>{let t=new Map;for(let n of e.attachments?.nodes??[]){let o=za(n.url);if(o)t.set(Yn(o),o)}return[...t.values()]},Ll=(e,t)=>{let n=[];for(let o of e.matchAll(Pl)){let r=o[1].toUpperCase();if(r!==t.toUpperCase()&&!n.includes(r))n.push(r);if(n.length>=25)break}return n},Ir=async(e,t)=>{if(Ul.test(e))return e;let n=Ll(e,t.identifier);if(!n.length)return e;let o=await F(Cn,{filter:Gn(n)}),r=new Map;for(let m of[...t.links?.nodes??[],...t.attachments?.nodes??[]]){let u=za(m.url);if(u)r.set(Yn(u),u)}let s=n.flatMap((m)=>{let u=o.issues.nodes.find((E)=>E.identifier.toUpperCase()===m);if(!u)return[];let h=Nl(u).filter((E)=>!r.has(Yn(E)));return h.length?[{issue:u,repositories:h}]:[]});if(!s.length)return e;let a=["## Related repositories","",...s.map(({issue:m,repositories:u})=>`- [${m.identifier}](${m.url}): ${u.map((h)=>`\`${Yn(h)}\``).join(", ")}`)].join(`
`),c=e.trim(),f=c.indexOf(`
`);if(/^#[ \t]+/.test(c)&&f>0)return`${c.slice(0,f)}

${a}

${c.slice(f).trimStart()}`;return`${a}

${c}`};var Wt=async(e,t,n=!1,o)=>{let{plan:r,isPlan:s}=await Xt({source:t,identifier:e.identifier,...o?{planText:o}:{}});if(!s&&!n)throw Error(Oa);let a=(await F(ot,{id:e.identifier})).issue,c=await Ir(r,a).catch(()=>r),f=`${e.identifier} plan: ${a.title}`.slice(0,200),m=a.documents?.nodes.find((d)=>a.description?.includes(d.url))??a.documents?.nodes.find((d)=>d.title===f),u=Ra(c)?await(m?ua(a,m.id,{title:f,content:c}):da(a,{title:f,content:c})):null,h=u?Aa(c):c,E=xa(a.description,h,u?.url);if(E===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);return await Je(a,{input:{description:E},patch:{description:E}}),{document:u}};var qa=async(e,t,n)=>{let o=!1,r=!1,s=n.planText;try{let h=s??(await Xt({source:t,identifier:e.identifier})).plan,E=await Ir(h,e);if(E!==h)s=E}catch{}if(n.post){let h=await Wt(e,t,n.force,s);o=!0,r=Boolean(h.document)}let a=await Ga(t.sessionId).catch(()=>null);if(a&&(a.state==="pending"||a.state==="claimed"))await Wa(a,vi()).catch(()=>null);let c=await $a({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force,...n.model?{model:n.model}:{},...s?{planText:s}:{}}),f=n.state??Er(e,e.team.states.nodes,n.lastState),m=!1,u=null;if(n.move&&f)try{await Je(e,{input:{stateId:f.id},patch:{state:f}}),m=!0}catch(h){u=Ne(h)}return{sessionId:c.sessionId,target:f,moved:m,moveError:u,posted:o,postedDocument:r}};var Ya=({identifier:e,source:t,label:n="Write Plan",doneLabel:o="Plan Written",size:r="sm",variant:s="outline",disabled:a,onBusy:c})=>{let[f,m]=C(!1),[u,h]=C(!1),E=async()=>{m(!0),c?.(!0);try{let d=await Wt({identifier:e},t);h(!0),de("issue"),await oe(I,"success",d.document?`Added a concise plan to ${e}, with the full plan in a linked document`:`Added the plan to ${e}`)}catch(d){await oe(I,"error",`Could not add the plan to ${e}: ${Ne(d)}`)}finally{m(!1),c?.(!1)}};return i("span",{class:"lin-inline",title:`Adds the plan from ${t.title} to the end of ${e}'s description and starts nothing. A plan added before is replaced.`,children:i(Ce,{label:u?o:n,variant:s,size:r,loading:f,disabled:a||f,onClick:()=>{E()}},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var Jn=(e)=>e instanceof Error?e.message:String(e),Dl=(e)=>e.replace(/\/+$/,"").split("/").pop()||e,Ja=({identifier:e,source:t,detail:n,onClose:o,onDone:r,fill:s,planText:a})=>{let[c,f]=C(n??null),[m,u]=C(null),[h,E]=C(!0),[d,y]=C(null),[O,A]=C(!1),[k,b]=C(null),[N,v]=C(null),[j,V]=C(null),[ae,z]=C(null),[re,X]=C(!1),[W,S]=C(!1),[T,ue]=C(!1),_=zn("build",c,d,h),[Q,me]=C("");if(Se(()=>{let L=!0;return V(null),z(null),Xt({source:t,identifier:e,...a?{planText:a}:{}}).then((x)=>{if(L)V(x),X(x.postPlan)},(x)=>{if(L)z(Jn(x))}),()=>{L=!1}},[e,t.sessionId,a]),Se(()=>{let L=!0;return Promise.all([n?Promise.resolve(n):F(ot,{id:e}).then((x)=>x.issue),jt().catch(()=>!0)]).then(([x,be])=>{if(!L)return;f(x),E(be),Ft(x.team.id).then((Z)=>{if(L)y(Z)},()=>{return})},(x)=>{if(L)u(Jn(x))}),()=>{L=!1}},[e,n]),N)return i("div",{class:"lin-build","data-state":"started",children:i("div",{class:"sui-small",children:N},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(m)return i($e,{tone:"error",title:"Could not read the issue",body:m,action:{label:"Close",onClick:o}},void 0,!1,void 0,this);if(!c)return i(xt,{label:"Reading the issue"},void 0,!1,void 0,this);let ye=async()=>{A(!0),b(null);try{let L=await Wt(c,t,T,a);de("issue"),await oe(I,"success",L.document?`Added a concise plan to ${c.identifier}, with the full plan in a linked document.`:`Added the plan to ${c.identifier}.`),S(!0)}catch(L){b(Jn(L))}finally{A(!1)}},pe=async()=>{A(!0),b(null);try{let L=await qa(c,t,{move:_.move,post:re&&Boolean(j),force:T,state:_.selected,lastState:d,...Q?{model:Q}:{},...a?{planText:a}:{}});if(L.moved&&L.target)Vt(c.team.id,L.target.name).catch(()=>{return});if(L.moveError)await oe(I,"error",`Build started, but ${c.identifier} was not moved: ${L.moveError}`);let x=`${L.postedDocument?"Added a concise plan and full plan document to the issue and started":L.posted?"Added the plan to the issue and started":"Started"} a build for ${c.identifier}${L.moved?` and moved it to ${L.target.name}`:""}.`;if(await oe(I,"success",x),v(x),L.moved)de("block:");await Fn(L.sessionId),r?.()}catch(L){b(Jn(L))}finally{A(!1)}};return i("div",{class:s?"lin-build lin-build--fill":"lin-build","data-state":"options",children:[i("div",{class:"sui-small",children:["Builds from the last reply in ",i("strong",{children:t.title},void 0,!1,void 0,this),t.agent?` (${t.agent} agent)`:"",", in ",Dl(t.directory),", ",j?.lead?"as a session that lead starts under it":"as a new session",". It uses the build agent from Settings, on the model below."]},void 0,!0,void 0,this),ae&&i($e,{tone:"warning",title:"The plan cannot be read yet",body:ae},void 0,!1,void 0,this),j&&!j.isPlan&&i($e,{tone:"warning",title:"The last reply is not a plan",body:'Ask the planning session: "Repeat the final plan in full, unchanged, as your last message. No question cards." Then reopen this. Writing or building from a chat answer would put the wrong text in the issue and the build.',action:T?void 0:{label:"Use It Anyway",onClick:()=>ue(!0)}},void 0,!1,void 0,this),j?.earlier&&i("div",{class:"sui-muted sui-small",children:"The last reply in that session is not the plan, so this is the latest reply that was."},void 0,!1,void 0,this),j&&i("pre",{class:"lin-build-plan",children:s?j.plan.trim():Ia(j.plan)},void 0,!1,void 0,this),k&&i($e,{tone:"error",title:"Could not start the build",body:k},void 0,!1,void 0,this),i(Rt,{label:"Add the plan to the issue description first",description:re?`A plan section at the end of ${c.identifier}'s description, replaced if one is already there. A long plan becomes a concise summary with a linked full-plan document. Then the build starts.`:void 0,checked:re&&Boolean(j),disabled:!j||O,onChange:X},void 0,!1,void 0,this),i(qn,{choice:_,disabled:O},void 0,!1,void 0,this),i(Kn,{role:"build",directory:t.directory,value:Q,onChange:me,disabled:O},void 0,!1,void 0,this),i("div",{class:"sui-row",children:[i(Ce,{label:O?"Starting...":re&&j?"Write Plan and Build":"Start Build",size:"sm",disabled:O||!j||!j.isPlan&&!T,onClick:()=>{pe()}},void 0,!1,void 0,this),i(Ce,{label:W?"Plan Written":"Write Plan",variant:"outline",size:"sm",disabled:O||!j||!j.isPlan&&!T,onClick:()=>{ye()}},void 0,!1,void 0,this),i(Ce,{label:"Cancel",variant:"ghost",size:"sm",disabled:O,onClick:o},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},Qa=(e,t)=>{let[n,o]=C(void 0);return Se(()=>{let r=!0;if(o(void 0),!e){o(null);return}return Da(e,t).then((s)=>{if(r)o(s)},()=>{if(r)o(null)}),()=>{r=!1}},[e,t]),n},$l="Plan first: click Plan to start a planning session for this issue. Write Plan and Build work once it has a plan.",Za=({identifier:e,source:t,size:n,onBuild:o,building:r})=>{if(t)return i(xe,{children:[i(Ya,{identifier:e,source:t,size:n},void 0,!1,void 0,this),i(Ce,{label:"Build",variant:"outline",size:n,disabled:r,onClick:o},void 0,!1,void 0,this)]},void 0,!0,void 0,this);let s=t===null?$l:void 0;return i("span",{class:"lin-inline lin-plan-first",title:s,"aria-label":s,children:[i(Ce,{label:"Write Plan",variant:"outline",size:n,disabled:!0,onClick:()=>{return}},void 0,!1,void 0,this),i(Ce,{label:"Build",variant:"outline",size:n,disabled:!0,onClick:()=>{return}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Gl=async(e)=>{let t=await F(Cn,{filter:Gn(e)}),n=new Map;for(let r of t.issues.nodes)n.set(r.identifier.toUpperCase(),r);let o=[...new Set(t.issues.nodes.filter((r)=>r.state.type==="started").map((r)=>r.team.id))];if(o.length>0)try{Ci(ga((await F(hi,{teamIds:o})).workflowStates.nodes))}catch{}return n},ec=(e)=>Le(e.length>0?`block:${e.join(",")}`:null,()=>Gl(e));var At=({ids:e,children:t})=>{let n=ec(e);if(n.data)return i(xe,{children:t(n.data)},void 0,!1,void 0,this);if(n.error){let o=n.error instanceof Te?n.error:new Te("network",String(n.error));if(o.kind==="disconnected")return i(Ba,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber to see these issues.",action:{label:"Connect Linear",onClick:()=>{I.oauthStart()}}},void 0,!1,void 0,this);return i($e,{tone:"error",title:"Could not load from Linear",body:o.message,action:{label:"Retry",onClick:()=>n.refresh()}},void 0,!1,void 0,this)}return i("div",{class:"lin-block-wait",children:i(xt,{label:"Loading from Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},Kt=({skipped:e,cut:t})=>{if(e.length===0&&t===0)return null;let n=[e.length>0?`Not an issue key: ${e.join(", ")}.`:"",t>0?`${t} more not shown.`:""].filter(Boolean);return i("div",{class:"sui-small sui-muted",children:n.join(" ")},void 0,!1,void 0,this)},It=({id:e})=>i("div",{class:"lin-block-missing sui-small sui-muted",children:[i("span",{class:"sui-mono",children:e},void 0,!1,void 0,this),i("span",{children:"Not found in Linear, or you cannot see it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Or=(e)=>e instanceof Error?e.message:String(e),tc=({issue:e,plan:t,onClose:n})=>{let o=t?"plan":"session",[r,s]=C(null),[a,c]=C(null),[f,m]=C(!0),[u,h]=C(!0),[E,d]=C(!1),[y,O]=C(null),[A,k]=C(null),[b,N]=C(null),[v,j]=C(null),[V,ae]=C(null),[z,re]=C(0),[X,W]=C(null),[S,T]=C(null),ue=yt()?.directory??null,_=zn(t?"plan":"session",r,X,u),[Q,me]=C("");if(Se(()=>{let x=!0;return s(null),c(null),Promise.all([F(ot,{id:e.identifier}),jt().catch(()=>!0),Ft(e.team.id).catch(()=>null),jn().catch(()=>!1)]).then(([be,Z,K,ee])=>{if(!x)return;s(be.issue),h(Z),W(K),N(ee),Na(ue,be.issue.branchName).then((Ve)=>{if(x)j(Ve)})},(be)=>{if(x)c(Or(be))}),()=>{x=!1}},[e.identifier]),S)return i("div",{class:"lin-block-start","data-state":"started",children:i("div",{class:"sui-small",children:S},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(a)return i("div",{class:"lin-block-start",children:i($e,{tone:"error",title:"Could not read the issue",body:a,action:{label:"Close",onClick:n}},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(!r)return i("div",{class:"lin-block-start",children:i(xt,{label:"Reading the issue"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let ye=y??v,pe=gr(r.branchName,z),L=async()=>{d(!0),ae(null);try{let x=await(t?Ua:Ma)(r,{worktree:f,move:_.move,existing:ye,branch:pe,state:_.selected,directoryHint:ue,...t&&Q?{model:Q}:{},...t&&b!==null?{lead:b,existingSession:A}:{}});if(!x.started){O(x.directory),k(x.session??null),ae(x.error??null);return}if(x.moveError)await oe(I,"error",`The ${o} started, but ${r.identifier} was not moved: ${x.moveError}`);if(!t&&x.moved&&x.target)Vt(r.team.id,x.target.name).catch(()=>{return});let be=`Started a ${o} for ${r.identifier}${x.moved?` and moved it to ${x.target.name}`:""}.`;if(await oe(I,"success",be),T(be),x.moved)de("block:");await Fn(x.sessionId)}catch(x){let be=f&&!ye;if(be)re((K)=>K+1);let Z=be?` A branch named ${pe} may already exist. Start again to try ${gr(r.branchName,z+1)}, or turn off "Work in a new worktree".`:"";ae(`${Or(x).replace(/\.+$/,"")}.${Z}`),await oe(I,"error",`Could not start a ${o}: ${Or(x)}`)}finally{d(!1)}};return i("div",{class:"lin-block-start","data-state":"options",children:[y&&i($e,{tone:"warning",title:`The worktree is ready, but the ${o} did not start`,body:`Retry starts the ${o} in ${y}.`},void 0,!1,void 0,this),!y&&v&&i($e,{tone:"info",title:"This issue already has a worktree",body:`The session starts in ${v}, on branch ${r.branchName}.`},void 0,!1,void 0,this),t&&!y&&i("div",{class:"sui-muted sui-small",children:b?"Makes the worktree with one lead session. The lead starts the plan as a session nested under it, with the plan agent from Settings on the model below, and later the build the same way. The plan changes no files.":"Makes the worktree, then starts a planning session in it with the plan agent from Settings, on the model below. It plans and stops: it changes no files."},void 0,!1,void 0,this),V&&i($e,{tone:"error",title:`Could not start a ${o}`,body:V},void 0,!1,void 0,this),i(Rt,{label:ye?"Work in the existing worktree":"Work in a new worktree",description:`Branch ${pe}`,checked:f||Boolean(ye),disabled:Boolean(ye)||E,onChange:m},void 0,!1,void 0,this),i(qn,{choice:_,disabled:E},void 0,!1,void 0,this),t&&i(Kn,{role:"plan",directory:ue,value:Q,onChange:me,disabled:E},void 0,!1,void 0,this),i("div",{class:"sui-row",children:[i(Ce,{label:E?"Starting...":y?"Retry in That Worktree":v?"Start in That Worktree":t?"Start Plan":"Start Session",size:"sm",disabled:E,onClick:()=>{L()}},void 0,!1,void 0,this),i(Ce,{label:"Cancel",variant:"ghost",size:"sm",disabled:E,onClick:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Bl=({issue:e})=>{let[t,n]=C(null),[o,r]=C(null),s=Qa(yt()?.directory??null,e.identifier),a=e.labels.nodes;return i("div",{onContextMenu:(c)=>{c.preventDefault(),r({x:c.clientX,y:c.clientY})},children:[i(qs,{class:"lin-block-card",children:[i("div",{class:"lin-block-title",children:[i(ft,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:16},void 0,!1,void 0,this),i("span",{class:"lin-block-key sui-mono sui-muted",children:e.identifier},void 0,!1,void 0,this),i("span",{class:"lin-block-name",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),i(Ys,{items:[["Status",i("span",{class:"lin-block-value",children:[i(ft,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this),e.state.name]},void 0,!0,void 0,this)],["Priority",i("span",{class:"lin-block-value",children:[i(mt,{priority:e.priority},void 0,!1,void 0,this),Pn[e.priority]]},void 0,!0,void 0,this)],["Assignee",e.assignee?i("span",{class:"lin-block-value",children:[i(rt,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this),e.assignee.name]},void 0,!0,void 0,this):i("span",{class:"sui-muted",children:"Unassigned"},void 0,!1,void 0,this)],...e.project?[["Project",i("span",{class:"lin-block-value",children:[i(_t,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),e.project.name]},void 0,!0,void 0,this)]]:[],...a.length>0?[["Labels",i("span",{class:"lin-block-value lin-block-chips",children:a.map((c)=>i(vn,{label:c},c.id,!1,void 0,this))},void 0,!1,void 0,this)]]:[],...e.dueDate?[["Due",i(ge,{children:Be(e.dueDate)},void 0,!1,void 0,this)]]:[],["Updated",i("span",{class:"sui-muted",children:Zs(e.updatedAt)},void 0,!1,void 0,this)]]},void 0,!1,void 0,this),i("div",{class:"sui-row",children:[i(Ce,{label:"Open in Linear",variant:"outline",size:"sm",onClick:()=>{I.openUrl(e.url)}},void 0,!1,void 0,this),i(Ce,{label:"Start Session",variant:"outline",size:"sm",disabled:t==="session",onClick:()=>n("session")},void 0,!1,void 0,this),i(Ce,{label:"Plan",variant:"outline",size:"sm",disabled:t==="plan",onClick:()=>n("plan")},void 0,!1,void 0,this),i(Za,{identifier:e.identifier,source:s,size:"sm",building:t==="build",onBuild:()=>n("build")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),(t==="session"||t==="plan")&&i(tc,{issue:e,plan:t==="plan",onClose:()=>n(null)},void 0,!1,void 0,this),t==="build"&&s&&i("div",{class:"lin-block-start",children:i(Ja,{identifier:e.identifier,source:s,onClose:()=>n(null)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this),o&&i($n,{issue:e,x:o.x,y:o.y,propertiesOnly:!0,onClose:()=>r(null)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},nc=({args:e})=>{let{ids:t}=kt(e.id),n=t[0];if(!n)return i("div",{class:"sui-muted",children:"LinearIssue needs an issue identifier such as ENG-123."},void 0,!1,void 0,this);return i(At,{ids:[n],children:(o)=>{let r=o.get(n);return r?i(Bl,{issue:r},void 0,!1,void 0,this):i(It,{id:n},void 0,!1,void 0,this)}},void 0,!1,void 0,this)};var Hl=new Set(["id","status","assignee","priority","project","dueDate","cycle","estimate","labels","links","created","changes"]),Qn=({issue:e,selected:t,cursor:n,properties:o=Hl,hideProject:r,compact:s,subIssues:a,extras:c,depth:f=0,disabled:m,onOpen:u})=>i("button",{type:"button",class:"lin-issue-row","aria-selected":t?"true":"false",disabled:m,"data-cursor":n?"true":"false","data-issue":e.identifier,"data-depth":f||void 0,style:f?{paddingLeft:`${8+f*22}px`}:void 0,onClick:()=>u(e),title:e.title,children:[o.has("priority")||s?i(mt,{priority:e.priority},void 0,!1,void 0,this):null,o.has("id")||s?i("span",{class:"lin-issue-key sui-mono",children:e.identifier},void 0,!1,void 0,this):null,o.has("status")||s?i(ft,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this):null,i("span",{class:"lin-issue-title",children:e.title},void 0,!1,void 0,this),!s&&i("span",{class:"lin-issue-meta",children:i(ji,{issue:e,properties:o,subIssues:a,hideProject:r,extras:c},void 0,!1,void 0,this)},void 0,!1,void 0,this),(o.has("assignee")||s)&&(e.assignee?i("span",{class:"lin-meta-assignee",title:e.assignee.name,children:i(rt,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this):i("span",{class:"lin-avatar-empty","aria-label":"No assignee"},void 0,!1,void 0,this)),!s&&o.has("created")&&i("span",{class:"lin-meta-created sui-small sui-muted",title:"Created",children:Be(e.createdAt)},void 0,!1,void 0,this),!s&&o.has("updated")&&i("span",{class:"lin-meta-updated sui-small sui-muted",title:"Updated",children:Be(e.updatedAt)},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Cr=new Set(["id","status","assignee","priority","labels","dueDate"]),oc=({args:e})=>{let{ids:t,skipped:n,cut:o}=kt(e.ids),r=ha(e.title),[s,a]=C(null);if(t.length===0)return i($t,{title:r||void 0,children:[i("div",{class:"sui-muted",children:"No issue identifiers to show."},void 0,!1,void 0,this),i(Kt,{skipped:n,cut:o},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return i($t,{title:r||void 0,children:[i(At,{ids:t,children:(c)=>i(xe,{children:[i("div",{class:"lin-groups lin-block-rows",onContextMenu:(f)=>{let m=f.target?.closest("[data-issue]")?.dataset.issue;if(!m||!c.has(m))return;f.preventDefault(),a({id:m,x:f.clientX,y:f.clientY})},children:t.map((f)=>{let m=c.get(f);return m?i(Qn,{issue:m,properties:Cr,onOpen:(u)=>{I.openUrl(u.url)}},f,!1,void 0,this):i(It,{id:f},f,!1,void 0,this)})},void 0,!1,void 0,this),s&&c.has(s.id)&&i($n,{issue:c.get(s.id),x:s.x,y:s.y,propertiesOnly:!0,onClose:()=>a(null)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),i(Kt,{skipped:n,cut:o},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var rc=({args:e,answered:t})=>{let{ids:n,skipped:o,cut:r}=kt(e.ids),s=Sa(e.question),[a,c]=C(null),[f,m]=C(!1),u=t??a,h=Tr(t)??a,E=async(d)=>{if(f||u)return;m(!0);try{await I.answerBlock(Ta(d)),c(d.identifier)}catch(y){await oe(I,"error",`Could not send your choice: ${y instanceof Error?y.message:String(y)}`)}finally{m(!1)}};return i($t,{title:s||"Pick an issue",children:[n.length===0?i("div",{class:"sui-muted",children:"No issues to choose from."},void 0,!1,void 0,this):i(At,{ids:n,children:(d)=>i("div",{class:"lin-groups lin-block-rows","data-answered":u?"true":"false",children:n.map((y)=>{let O=d.get(y);return O?i(Qn,{issue:O,properties:Cr,selected:h===y,disabled:Boolean(u)||f,onOpen:(A)=>{E(A)}},y,!1,void 0,this):i(It,{id:y},y,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),i(Kt,{skipped:o,cut:r},void 0,!1,void 0,this),u?i("div",{class:"sui-small sui-muted","data-state":"answered",children:t?`${Tr(t)?"You chose":"You answered"}: ${t}`:`You chose ${a}.`},void 0,!1,void 0,this):n.length>0&&i("div",{class:"sui-small sui-muted",children:"Click an issue to choose it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var jl=({call:e})=>{switch(e.name){case"LinearIssue":return i(nc,{args:e.args},void 0,!1,void 0,this);case"LinearIssueList":return i(oc,{args:e.args},void 0,!1,void 0,this);case"LinearPickIssue":return i(rc,{args:e.args,answered:e.answered},void 0,!1,void 0,this);default:return i("div",{class:"sui-muted",children:["The Linear+ extension has no block called ",e.name.slice(0,40),"."]},void 0,!0,void 0,this)}},Fl=()=>{yt();let[e,t]=C(null),n=we(null);return Se(()=>I.onBlock(t),[]),Se(()=>{let o=n.current;if(!o)return;let r=0,s=new ResizeObserver(()=>{let a=Math.min(Math.ceil(o.getBoundingClientRect().height),Yt);if(a===r)return;r=a,I.setHeight(a).catch(()=>{return})});return s.observe(o),()=>s.disconnect()},[]),i("div",{class:"lin-block",ref:n,style:{maxHeight:Yt},children:e?i(jl,{call:e},`${e.name}:${JSON.stringify(e.args)}`,!1,void 0,this):i("div",{class:"sui-muted",children:"Waiting for the agent"},void 0,!1,void 0,this)},void 0,!1,void 0,this)};xs(i(Fl,{},void 0,!1,void 0,this),document.getElementById("root"));})();

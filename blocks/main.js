(()=>{var P="openchamber.sdk",N=1;var pn=`
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
`;function _n(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(r)=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=n.get(o);if(s!==void 0)clearTimeout(s);n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var vi=`(${_n.toString()})(document);`;var fn=128,En=65536;var ht=128;var Tt=65536;var qr=/^[a-z][a-z0-9-]{0,39}$/;var Wr=(e)=>Object(e)===e&&!Array.isArray(e),mn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),Kr=(e)=>String(e)===e&&e.length>=1&&e.length<=60,zr=(e)=>String(e)===e&&e.length>=1&&e.length<=80,Yr=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!Wr(n)||!qr.test(n.id)||!Kr(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!mn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!mn(n,["kind","id","label","value","options","disabled"]))return!1;if(!zr(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!Wr(o)||!mn(o,["value","label"])||!zr(o.value)||!Kr(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var Jr=["{id}","{segment}","{segments+}"];var ec=new Set(Jr);var gt=960;var Qr=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var nc=new Set(Qr);var yt=20000000,At=256;var Sn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Zr=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var eo=/^[A-Za-z0-9_-]{1,80}$/;var to=["left","right","top","bottom"];var no=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!no(o,t+1,n))return!1;return!0},hn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(hn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(hn)}return String(e)===e||Number.isFinite(e)},Tn=(e)=>{try{if(String(e.id)!==e.id||!eo.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!to.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!no(e.data)||!hn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var yn=2000;var oo=["file","directory","other","missing"],An=(e)=>Boolean(e&&"sessionId"in e),On=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var so=/^[0-9a-f]{7,64}$/i,xn=(e)=>so.test(e),Ot=500,xt=32000,io=16000,ao=128,co=200,lo=2000,uo=16000,po=80,_o=200,fo=16000;var Eo=2000;var Rn=20000,Rt=1024,kt=2000000;var bt=64000,It=8000,kn=4000;var bn=960000;var mo=999,So=1e4,tt=500,ho=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],To=["stopped","starting","ready","failed"],Mi=new Set(ho),go=(e)=>Mi.has(e),yo=(e)=>e&&go(e)?e:"HOST_REJECTED",Ve=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(Ve);if(Object(e)===e)return Object.values(e).every(Ve);return!1},Ao=(e)=>Ve(e)&&JSON.stringify(e).length<=fo,ro=(e)=>e?.trim().slice(0,_o)??"",Fe=(e)=>{let t=e.id.trim().slice(0,ao),n=e.title.trim().slice(0,co),r=e.url.trim().slice(0,lo),o=e.text?.trim().slice(0,uo),s=e.author?.trim().slice(0,po),i=e.kind==="pull"?"pull":"issue",l={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o)l.text=o;if(s)l.author=s;if(i==="pull"){let _=ro(e.branches?.head),f=ro(e.branches?.base);if(_&&f)l.branches={head:_,base:f}}if(Ao(e.data))l.data=e.data;return l},In=(e)=>{let t=Fe(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Cn=(e)=>{let t={text:e.text.trim().slice(0,io)};if(e.send)t.send=!0;return t},vn=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(mo,Math.max(0,Math.round(e)))},wn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(So,Math.max(0,Math.ceil(e)))};var Xe=(e)=>e.length>0&&e.length<=Rt&&!e.includes("\x00")&&!e.includes("\\");var Ct=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>Eo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},Ui=new Set(To),Mn=(e)=>Boolean(e&&"status"in e&&Ui.has(String(e.status))&&!("body"in e)),vt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Un=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Pn=(e)=>Boolean(e&&"written"in e&&e.written===!0),Nn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),Pi=new Set(oo),Ln=(e)=>Boolean(e&&"kind"in e&&"size"in e&&Pi.has(String(e.kind))&&Number.isFinite(e.size)),Dn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),Ni=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Li=(e)=>Object(e)===e?e:null,gn=(e)=>String(e)===e&&e.length>0,Di=(e)=>{if(!gn(e.id))return null;if(e.ok===!0){let t={channel:P,v:N,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&gn(e.error))return{channel:P,v:N,type:"result",id:e.id,ok:!1,error:e.error,code:yo(gn(e.code)?e.code:void 0)};return null},$n=(e)=>{let t=Li(e);if(!t||t.channel!==P||t.v!==N)return null;if(t.type==="result")return Di(t);if(!Ni.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var Oo=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),$i=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class b extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var xo=()=>Promise.reject(new b("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),wt=()=>Promise.reject(new b("BAD_PATH",`File path must be 1 to ${Rt} characters without NUL or backslash.`)),Mt=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new b("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},C=(e)=>(e.value+=1,`oc-${e.value}`),Gn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new b("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((c)=>c===t.parent),r=e.requestTimeoutMs??Rn,o=new Set,s=new Set,i=new Set,l=new Set,_=new Set,f=new Set,p=new Set,g=new Set,m=new Set,u=new Set,h=new Set,I=new Set,x=[],y=null,T=null,k=new Set,U=new Set,se=null,ae=null,oe=!1,W=new Map,ce=new Map,K=new Map,L=!1,E={value:0},S=null,Ee=null,G=!1,v=!1,J=null,Me=(c)=>{if(!c)return null;return{sessionId:c.id,phase:c.busy?"started":"completed"}},ie=(c)=>{t.parent.postMessage(c,"*")},Lr=()=>{if(L||t.parent===t||I.size===0||S?.features?.lateGenerateResults!==!0)return;ie({channel:P,v:N,type:"generate-late-listen"})},z=(c,d)=>{for(let O of c)try{O(d)}catch(R){console.error(R)}},Dr=(c)=>{if(!(c instanceof MessageEvent))return;if(!n(c.source))return;let d=$n(c.data);if(!d)return;if(d.type==="workspace"){let R=ce.get(d.payload.subscriptionId);if(R)z([R],d.payload.snapshot);return}if(d.type==="shells"){let R=K.get(d.payload.subscriptionId);if(R)z([R],d.payload.snapshot);return}if(d.type==="ready"){if(S=d.payload,Ee=Me(d.payload.session),z(o,d.payload),z(s,d.payload.directory),z(i,d.payload.session),Ee)z(l,Ee);if(z(_,d.payload.connection),z(f,d.payload.settings),z(p,d.payload.item),d.payload.block)z(g,d.payload.block);Lr();return}if(d.type==="service-event"){z(m,d.payload);return}if(d.type==="generate-late"){if(I.size===0)x.push(d.payload);else z(I,d.payload);return}if(d.type==="directory"){if(S)S={...S,directory:d.payload.directory};z(s,d.payload.directory);return}if(d.type==="session"){if(S)S={...S,session:d.payload.session};if(!d.payload.session)Ee=null;else if(Ee?.sessionId!==d.payload.session.id)Ee=Me(d.payload.session);z(i,d.payload.session);return}if(d.type==="session-lifecycle"){Ee=d.payload,z(l,d.payload);return}if(d.type==="connection"){if(S)S={...S,connection:d.payload.connection};z(_,d.payload.connection);return}if(d.type==="settings"){if(S)S={...S,settings:d.payload.settings};z(f,d.payload.settings);return}if(d.type==="item"){if(S)S={...S,item:d.payload.item};z(p,d.payload.item);return}if(d.type==="status-control-event"){z(u,d.payload);return}if(d.type==="popover-closed"){z(h,d.payload);return}if(d.type==="action"){let R=(V)=>{if(!L)ie({channel:P,v:N,type:"action-result",id:d.id,payload:V})},X=T;if(!X){R({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>X(d.payload)).then(()=>R({ok:!0}),(V)=>{let ee=(V instanceof Error?V.message:String(V)).trim();R({ok:!1,error:(ee||"Action failed.").slice(0,tt)})});return}if(d.type==="file-open"){let R=d.payload;if(ae&&Zr(ae,R))return;ae=R,z(k,d.payload);return}if(d.type==="file-saved"){z(U,d.payload.version);return}if(d.type==="file-snapshot"){let R=(ee)=>{if(!L)ie({channel:P,v:N,type:"file-snapshot-result",id:d.id,payload:ee})},X=(ee)=>R({error:(ee.trim()||"Could not read the edited file.").slice(0,tt)}),V=se;if(!V){X("This extension does not edit files.");return}Promise.resolve().then(()=>V(d.payload.purpose)).then((ee)=>{if(Sn(ee)>yt){X(`The file is over ${yt} ${"bytes"in ee?"bytes":"characters"}.`);return}if(ee.version.length>At){X(`The snapshot version is over ${At} characters.`);return}R({snapshot:"bytes"in ee?{bytes:ee.bytes,version:ee.version}:{content:ee.content,version:ee.version}})},(ee)=>X(ee instanceof Error?ee.message:String(ee)));return}if(d.type==="resolve"){let R=(V)=>{ie({channel:P,v:N,type:"resolve-result",id:d.id,payload:V})},X=y;if(!X){R({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>X(d.payload)).then((V)=>R({item:V?Fe(V):null}),(V)=>{let ee=(V instanceof Error?V.message:String(V)).trim();R({error:(ee||"Command failed.").slice(0,tt)})});return}let O=W.get(d.id);if(!O)return;if(clearTimeout(O.timer),W.delete(d.id),d.ok){O.resolve(d.payload);return}O.reject(new b(d.code,d.error))};t.addEventListener("message",Dr),ie({channel:P,v:N,type:"hello"});let ue=(c,d=r)=>{if(L||t.parent===t)return Promise.reject(new b("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((O,R)=>{let X=setTimeout(()=>{W.delete(c.id),R(new b("HOST_TIMEOUT","Host did not answer in time."))},d);W.set(c.id,{resolve:O,reject:R,timer:X}),ie(c)})},Q=(c)=>ue(c).then(()=>{return}),Z={channel:P,v:N},ln=(c)=>{if(!L&&t.parent!==t)ie(c)},$r=()=>ln({...Z,type:"file-save"}),Gr=(c)=>{if(!Oo(c)||!$i(c))return;c.preventDefault(),$r()},Hr=(c)=>{if(!Oo(c)||c.key!=="Escape"||S?.surface!=="popover"||!S.popover)return;c.preventDefault(),Xr(S.popover.id,"escape").catch(()=>{return})},Et=()=>{let c=S?.surface==="popover"?S.popover:void 0;if(!c)return;let d=G||v;if(J===d)return;J=d,jr(c.id,d).catch(()=>{return})},mt=()=>{if(S?.surface!=="popover"||G)return;G=!0,Et()},Br=(c)=>{if(S?.surface!=="popover"||c.relatedTarget!==null||!G)return;G=!1,Et()},Vr=()=>{if(S?.surface!=="popover"||v)return;v=!0,Et()},Fr=()=>{if(S?.surface!=="popover"||!v)return;v=!1,Et()},ye=(c,d=1024)=>{if(!c.trim()||c.length>d)throw new b("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},dn=async(c)=>{if(c.kind!=="projects")ye(c.projectId);let d=await ue({...Z,type:"workspace-read",id:C(E),payload:c});if(!d||!("kind"in d)||!("state"in d)||d.kind!==c.kind)throw new b("HOST_REJECTED","Host did not return workspace data.");return d},un=async(c,d)=>{if(c.kind!=="projects")ye(c.projectId);let O=C(E);ce.set(O,d);try{await Q({...Z,type:"workspace-subscribe",id:C(E),payload:{subscriptionId:O,query:c}})}catch(R){if(ce.delete(O),!L)ie({...Z,type:"workspace-unsubscribe",id:C(E),payload:{subscriptionId:O}});throw R}return()=>{if(!ce.delete(O)||L)return;ie({...Z,type:"workspace-unsubscribe",id:C(E),payload:{subscriptionId:O}})}},Ci=async(c,d)=>{if(c.kind==="session")ye(c.sessionId);if(c.kind==="project")ye(c.projectId);let O=C(E);K.set(O,d);try{await Q({...Z,type:"shells-subscribe",id:C(E),payload:{subscriptionId:O,scope:c}})}catch(R){if(K.delete(O),!L)ie({...Z,type:"shells-unsubscribe",id:C(E),payload:{subscriptionId:O}});throw R}return()=>{if(!K.delete(O)||L)return;ie({...Z,type:"shells-unsubscribe",id:C(E),payload:{subscriptionId:O}})}},St=async(c)=>{if("key"in c&&(c.key.length===0||c.key.length>fn))throw new b("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(c.op==="set"&&!Ve(c.value))throw new b("HOST_REJECTED","Storage values must be JSON.");if(c.op==="set"&&new TextEncoder().encode(JSON.stringify(c.value)).length>En)throw new b("HOST_REJECTED","Storage value exceeds 64 KiB.");if(c.scope==="device"&&S?.features?.deviceStorage!==!0)throw new b("UNSUPPORTED","This host does not support device storage.");let d=await ue({...Z,type:"storage",id:C(E),payload:c});if(!d||!("storage"in d)||d.op!==c.op)throw new b("HOST_REJECTED","Host did not return storage data.");return d},Xr=(c,d)=>S?.features?.popovers!==!0&&!(S?.surface==="popover"&&S.popover?.id===c)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):Q({...Z,type:"popover-close",id:C(E),payload:d?{id:c,reason:d}:{id:c}}),jr=(c,d)=>S?.features?.popovers!==!0&&!(S?.surface==="popover"&&S.popover?.id===c)?Promise.reject(new b("UNSUPPORTED","This host does not support popovers.")):Q({...Z,type:"popover-anchor",id:C(E),payload:{id:c,active:d}});return t.addEventListener("keydown",Hr,!0),t.addEventListener("pointerover",mt),t.addEventListener("pointermove",mt),t.addEventListener("pointerout",Br),t.addEventListener("focus",Vr),t.addEventListener("blur",Fr),{onAction:(c)=>(T=c,()=>{if(T===c)T=null}),listProjects:async()=>{let c=await dn({kind:"projects"});if(c.kind!=="projects")throw new b("HOST_REJECTED","Expected projects.");return c},listWorktrees:async(c)=>{let d=await dn({kind:"worktrees",projectId:c});if(d.kind!=="worktrees")throw new b("HOST_REJECTED","Expected worktrees.");return d},listSessions:async(c)=>{let d=await dn({kind:"sessions",projectId:c});if(d.kind!=="sessions")throw new b("HOST_REJECTED","Expected sessions.");return d},onProjects:(c)=>un({kind:"projects"},(d)=>{if(d.kind==="projects")c(d)}),onWorktrees:(c,d)=>un({kind:"worktrees",projectId:c},(O)=>{if(O.kind==="worktrees")d(O)}),onSessions:(c,d)=>un({kind:"sessions",projectId:c},(O)=>{if(O.kind==="sessions")d(O)}),onRunningShells:(c,d)=>Ci(c,d),readShellOutput:async(c,d)=>{ye(c,ht);let O=d?.cursor;if(O!==void 0&&(!Number.isInteger(O)||O<0))throw new b("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let R=d?.tailBytes;if(R!==void 0&&(!Number.isInteger(R)||R<1||R>Tt))throw new b("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Tt}.`);let V=await ue({...Z,type:"shell-output",id:C(E),payload:{shellId:c,cursor:O,tailBytes:R}});if(!V||typeof V.output!=="string"||!Number.isFinite(V.cursor))throw new b("HOST_REJECTED","Host did not return shell output.");return V},stopShell:async(c)=>{if(ye(c,ht),(await ue({...Z,type:"shell-stop",id:C(E),payload:{shellId:c}}))?.stopped!==!0)throw new b("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(c)=>{ye(c),await Q({...Z,type:"open-session",id:C(E),payload:{sessionId:c}})},storage:{get:async(c,d)=>{let O=Mt(d),R={op:"get",key:c};if(O)R.scope=O;let X=await St(R);return X.op==="get"&&X.found?X.value:void 0},set:async(c,d,O)=>{let R=Mt(O),X={op:"set",key:c,value:d};if(R)X.scope=R;await St(X)},delete:async(c,d)=>{let O=Mt(d),R={op:"delete",key:c};if(O)R.scope=O;await St(R)},keys:async(c)=>{let d=Mt(c),O={op:"keys"};if(d)O.scope=d;let R=await St(O);if(R.op!=="keys")throw new b("HOST_REJECTED","Expected storage keys.");return R.keys}},onReady:(c)=>{if(o.add(c),S)c(S);return()=>{o.delete(c)}},onDirectory:(c)=>{if(s.add(c),S)c(S.directory);return()=>{s.delete(c)}},onSession:(c)=>{if(i.add(c),S)c(S.session);return()=>{i.delete(c)}},onSessionLifecycle:(c)=>{if(l.add(c),Ee)c(Ee);return()=>{l.delete(c)}},onConnection:(c)=>{if(_.add(c),S)c(S.connection);return()=>{_.delete(c)}},onSettings:(c)=>{if(f.add(c),S)c(S.settings);return()=>{f.delete(c)}},onItem:(c)=>{if(p.add(c),S)c(S.item);return()=>{p.delete(c)}},onBlock:(c)=>{if(g.add(c),S?.block)c(S.block);return()=>{g.delete(c)}},onServiceEvent:(c)=>(m.add(c),()=>{m.delete(c)}),onStatusControl:(c)=>(u.add(c),()=>{u.delete(c)}),onPopoverClosed:(c)=>(h.add(c),()=>{h.delete(c)}),setStatusControls:(c)=>{if(S?.features?.statusControls!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support status controls."));if(!Yr(c))return Promise.reject(new b("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Q({...Z,type:"status-controls",id:C(E),payload:{controls:c}})},openPopover:(c)=>{if(S?.features?.popovers!==!0)return Promise.reject(new b("UNSUPPORTED","This host does not support popovers."));if(!Tn(c))return Promise.reject(new b("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Q({...Z,type:"popover-open",id:C(E),payload:c})},closePopover:Xr,setPopoverAnchorActive:jr,onResolve:(c)=>(y=c,()=>{if(y===c)y=null}),toast:(c)=>{let d=c.message.trim();if(!d||d.length>Ot)return Promise.reject(new b("HOST_REJECTED",`Toast message must contain 1 to ${Ot} characters.`));if(c.copy&&c.copy!==!0&&(!c.copy.text.length||c.copy.text.length>xt))return Promise.reject(new b("HOST_REJECTED",`Toast copy text must contain 1 to ${xt} characters.`));return Q({channel:P,v:N,type:"toast",id:C(E),payload:{...c,message:d}})},openUrl:(c)=>Q({channel:P,v:N,type:"open-url",id:C(E),payload:{url:c}}),openCommit:(c)=>xn(c)?Q({channel:P,v:N,type:"open-commit",id:C(E),payload:{sha:c}}):Promise.reject(new b("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(c)=>Q({channel:P,v:N,type:"block-answer",id:C(E),payload:{text:c.trim().slice(0,yn)}}),openSurface:(c)=>Q({channel:P,v:N,type:"open-surface",id:C(E),payload:{surfaceId:c}}),writeClipboard:(c)=>Q({channel:P,v:N,type:"clipboard-write",id:C(E),payload:{text:c}}),compose:(c)=>Q({channel:P,v:N,type:"compose",id:C(E),payload:c}),attach:(c)=>Q({channel:P,v:N,type:"attach",id:C(E),payload:Fe(c)}),startSession:async(c)=>{if(c.projectId!==void 0)ye(c.projectId);let d=c.worktree;if(d&&d!==!0)if(d.kind==="existing")ye(d.directory);else{if(d.name!==void 0)ye(d.name,200);if(d.baseBranch!==void 0)ye(d.baseBranch,200)}let O=await ue({channel:P,v:N,type:"start-session",id:C(E),payload:In(c)},e.requestTimeoutMs??180000);if(!An(O))throw new b("HOST_REJECTED","Host did not return a session.");return O},prompt:(c)=>ue({channel:P,v:N,type:"prompt",id:C(E),payload:Cn(c)}).then((d)=>{if(!On(d))throw new b("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:(c)=>Q({channel:P,v:N,type:"session-link",id:C(E),payload:Fe(c)}),close:()=>Q({channel:P,v:N,type:"close",id:C(E)}),oauthStart:()=>Q({channel:P,v:N,type:"oauth-start",id:C(E)}),oauthDisconnect:()=>Q({channel:P,v:N,type:"oauth-disconnect",id:C(E)}),request:(c)=>(Ct(c.path)?ue({channel:P,v:N,type:"request",id:C(E),payload:c}):xo()).then((d)=>{if(!vt(d))throw new b("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:(c)=>(Ct(c.path)?ue({channel:P,v:N,type:"service-request",id:C(E),payload:c}):xo()).then((d)=>{if(!vt(d))throw new b("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>ue({channel:P,v:N,type:"service-status",id:C(E)}).then((c)=>{if(!Mn(c))throw new b("HOST_REJECTED","Host did not return service status.");return c}),readFile:(c)=>(Xe(c)?ue({channel:P,v:N,type:"file-read",id:C(E),payload:{path:c}}):wt()).then((d)=>{if(!Un(d))throw new b("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(c,d)=>{if(!Xe(c))return wt();if(d.length>kt)return Promise.reject(new b("FILE_TOO_LARGE",`Content is over ${kt} characters.`));return ue({channel:P,v:N,type:"file-write",id:C(E),payload:{path:c,content:d}}).then((O)=>{if(!Pn(O))throw new b("HOST_REJECTED","Host did not confirm the write.");return O})},listDir:(c)=>(Xe(c)?ue({channel:P,v:N,type:"file-list",id:C(E),payload:{path:c}}):wt()).then((d)=>{if(!Nn(d))throw new b("HOST_REJECTED","Host did not return directory entries.");return d}),stat:(c)=>(Xe(c)?ue({channel:P,v:N,type:"file-stat",id:C(E),payload:{path:c}}):wt()).then((d)=>{if(!Ln(d))throw new b("HOST_REJECTED","Host did not return file status.");return d}),generate:(c)=>{let d=c.prompt.trim(),O=c.system?.trim();if(d.length===0||d.length>bt)return Promise.reject(new b("HOST_REJECTED",`Prompt must be 1 to ${bt} characters.`));if(O!==void 0&&(O.length===0||O.length>It))return Promise.reject(new b("HOST_REJECTED",`System prompt must be 1 to ${It} characters.`));let R=c.maxOutputTokens===void 0?void 0:Math.min(kn,Math.max(1,Math.floor(c.maxOutputTokens)));if(R!==void 0&&!Number.isFinite(R))return Promise.reject(new b("HOST_REJECTED","maxOutputTokens must be a number."));let X={prompt:d};if(O!==void 0)X.system=O;if(R!==void 0)X.maxOutputTokens=R;return ue({channel:P,v:N,type:"generate",id:C(E),payload:X},e.requestTimeoutMs??bn).then((V)=>{if(!Dn(V))throw new b("HOST_REJECTED","Host did not return generated text.");return V})},onLateGenerateResult:(c)=>{I.add(c);for(let d of x.splice(0))z([c],d);return Lr(),()=>{I.delete(c)}},setBadge:(c)=>Q({channel:P,v:N,type:"badge",id:C(E),payload:{count:vn(c)}}),setHeight:(c)=>Q({channel:P,v:N,type:"resize",id:C(E),payload:{height:wn(c)}}),onFileOpen:(c)=>{if(k.add(c),!oe)oe=!0,t.addEventListener("keydown",Gr,!0);if(ae)c(ae);return()=>{k.delete(c)}},onFileSnapshot:(c)=>(se=c,()=>{if(se===c)se=null}),onFileSaved:(c)=>(U.add(c),()=>{U.delete(c)}),reportFileChange:(c)=>ln({...Z,type:"file-change",payload:{dirty:c.dirty,edited:c.edited}}),requestFileSave:$r,reportFileUnsupported:()=>ln({...Z,type:"file-unsupported"}),dispose:()=>{for(let c of ce.keys())ie({...Z,type:"workspace-unsubscribe",id:C(E),payload:{subscriptionId:c}});ce.clear();for(let c of K.keys())ie({...Z,type:"shells-unsubscribe",id:C(E),payload:{subscriptionId:c}});if(K.clear(),L=!0,y=null,T=null,se=null,k.clear(),U.clear(),oe)t.removeEventListener("keydown",Gr,!0);t.removeEventListener("message",Dr),t.removeEventListener("keydown",Hr,!0),t.removeEventListener("pointerover",mt),t.removeEventListener("pointermove",mt),t.removeEventListener("pointerout",Br),t.removeEventListener("focus",Vr),t.removeEventListener("blur",Fr);for(let c of W.values())clearTimeout(c.timer),c.reject(new b("HOST_UNAVAILABLE","Host client was disposed."));W.clear(),o.clear(),s.clear(),i.clear(),l.clear(),_.clear(),f.clear(),p.clear(),g.clear(),m.clear(),u.clear(),h.clear(),I.clear(),x.length=0}}};var Ro=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Sc=new Set(Ro);var ko=["none","agent","user"];var Tc=new Set(ko);var D,Co,Gi,Ue,Hn,$t,vo,Pt,wo,Vn,Bn,Hi,nt=Symbol.for("pv"),Gt={},Ht=[],Bi=/^m(i|n|o|s|text|space)$/,Fn=Array.isArray,Mo=Ht.slice,De=Object.assign;function Le(e){e&&e.parentNode&&e.remove()}function Nt(e,t,n,r,o){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:nt,__v:o||++Co,__i:-1,__u:0};return!o&&D.vnode&&D.vnode(s),s}function Re(e){return e.children}function Lt(e,t){this.props=e,this.context=t,this.__g=0}function Pe(e,t){if(t==null)return e.__&&Pe(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:Pe(e)}function Vi(e){var t,n=e.__v,r=n.__e,o=[],s=[],i=e.__P;i&&((t=De({constructor:nt},n)).__v=n.__v+1,D.vnode&&D.vnode(t),Xn(i,t,n,e.__n,i.namespaceURI,32&n.__u?[r]:null,o,r||Pe(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,$o(o,t,s),n.__=n.__e=null,t.__e!=r&&Uo(t))}function Uo(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),Uo(e)}function bo(e){(8&e.__g||(e.__g|=8,Ue.push(e),$t++))&&Hn==D.debounceRendering||((Hn=D.debounceRendering)||queueMicrotask)(Po)}function Po(){try{for(var e,t=1;Ue.length;)Ue.length>t&&Ue.sort(vo),e=Ue.shift(),t=Ue.length,8&e.__g&&Vi(e)}finally{($t=Ue.length)&&(Hn||queueMicrotask)(Po)}}function No(e,t,n,r,o,s,i,l,_,f,p){var g,m,u,h,I,x,y=r.__k||Ht,T=t.length;for(_=Fi(n,t,y,_,T),g=0;g<T;g++)(u=n.__k[g])!=null&&(m=~u.__i&&y[u.__i]||Gt,u.__i=g,x=Xn(e,u,m,o,s,i,l,_,f,p),h=u.__e,(m.ref!=u.ref||8&m.__u)&&(m.ref&&jn(m.ref,null,u,m),u.ref&&p.push(u.ref,u.__c||h,u)),I=I||h,4&u.__u?(_=Lo(u,_,e,!m.__v),m.__e&&(m.__e=null)):typeof u.type=="function"&&x!==void 0?_=x:h&&(_=h.nextSibling),u.__u&=-21);return n.__e=I,_}function Fi(e,t,n,r,o){var s,i,l,_,f,p,g,m,u,h=n.length,I=h,x=0,y=0,T=e.__k=Array(o);for(s=0;s<o;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=T[s]=Nt(null,i):Fn(i)?i=T[s]=Nt(Re,{children:i}):i.constructor===nt&&i.__b?i=T[s]=Nt(i.type,i.props,i.key,i.ref,i.__v):T[s]=i,_=s+x,i.__=e,i.__b=e.__b+1,l=null,~(f=i.__i=Xi(i,n,_,I))&&(I--,(l=n[f])&&(l.__u|=2)),l&&l.__v?(i.__u|=16,f==_-1?x--:f==_+1?x++:f!=_&&(f>_?x--:x++,y=1)):(~f||(o>h?x--:o<h&&x++),typeof i.type!="function"&&(i.__u|=4))):T[s]=null;if(y){for(p=[],g=[],s=0;s<o;s++)if((i=T[s])&&16&i.__u){for(x=0,m=p.length;x<m;)p[u=x+m>>1]<i.__i?x=u+1:m=u;p[x]=i.__i,g[s]=x+1}for(x=p.length;s--;)g[s]&&(g[s]==x?x--:T[s].__u|=4)}if(I)for(s=0;s<h;s++)!(l=n[s])||2&l.__u||(l.__e==r&&(r=Pe(l)),Wn(l,l));return r}function Lo(e,t,n,r){var o,s,i,l;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=Lo(o[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=Pe(e))&&!t.parentNode&&(t=null),i=e.__e,l=t;l&&l.nodeType==8;)l=l.nextSibling;for(i!=l&&(!r&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Xi(e,t,n,r){var o,{key:s,type:i}=e,l=t[n],_=l&&!(2&l.__u);if(l===null&&s==null||_&&s==l.key&&i==l.type)return n;if(r>(_?1:0)){for(o=n-1;o>=0;o--)if((l=t[o])&&!(2&l.__u)&&s==l.key&&i==l.type)return o;for(o=n+1;o<t.length;o++)if((l=t[o])&&!(2&l.__u)&&s==l.key&&i==l.type)return o}return-1}function Io(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function Ut(e,t,n,r,o){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Io(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||Io(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof r!="function"&&(r=null),(e.__e||(e.__e={}))[t]=n,n&&r||(i=Bn[t]||(Bn[t]=ji(t)),(e.__a||(e.__a={}))[t]=Vn,s=t!=(t=t.replace(wo,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(l){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function ji(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[Pt]==null)t[Pt]=Vn++;else if(t[Pt]<this.__a[e])return;return n(D.event?D.event(t):t)}}}function Xn(e,t,n,r,o,s,i,l,_,f){var p,g,m,u,h,I,x,y,T,k,U,se,ae,oe,W,ce,K,L,E=t.type;if(t.constructor!==nt)return null;128&n.__u&&(_=32&n.__u,p=n.__c.__z)&&(t.__u|=_,g=s=[],p.nodeType==8?l=Dt(p,s):s.push(p),l=s[0]||l),(p=D.__b)&&p(t);e:if(typeof E=="function"){m=i.length;try{if(y=t.props,T=(p=E.prototype)&&p.render,k=(p=E.contextType)&&r[p.__c],U=p?k?k.props.value:p.__:r,(u=n.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(T?t.__c=u=new E(y,U):(t.__c=u=new Lt(y,U),u.constructor=E,u.render=Ki),k&&k.sub(u),u.state||(u.state={}),u.__n=r,u.__g|=8,u.__h=[],u.__k=[]),T&&(u.__s||(u.__s=u.state),E.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=De({},u.__s)),De(u.__s,E.getDerivedStateFromProps(y,u.__s)))),h=u.props,I=u.state,u.__v=t,n.__c){if(y!==h&&T&&!E.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(y,U),t.__v==n.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(y,u.__s,U)===!1){t.__v!=n.__v&&(u.props=y,u.state=u.__s,u.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(S){S&&(S.__=t)}),Ht.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),l=Pe(n);break e}u.componentWillUpdate&&u.componentWillUpdate(y,u.__s,U),T&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(h,I,x)})}else T&&!E.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),T&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=U,u.props=y,u.__P=e,u.__g&=-5,se=D.__r,ae=T?25:0;do u.__g&=-9,se&&se(t),p=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++ae<25);T&&(Ht.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(r=De({},r,u.getChildContext())),T&&n.__c&&u.getSnapshotBeforeUpdate&&(x=u.getSnapshotBeforeUpdate(h,I)),oe=p&&p.type===Re&&p.key==null?p.props.children:p,y.__P&&(p=l,o=(e=y.__P).namespaceURI,_=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(S){S&&Wn(S,S)}),n.__k=null),l=n.__k?Pe(n,0):null),l=No(e,Fn(oe)?oe:[oe],t,n,r,o,s,i,l,_,f),y.__P&&(t.__e=null,l=p),t.__u&=-161,g&&g.some(Le),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(S){if(i.length=m,t.__v=null,_||s)if(S&&S.then){if(t.__u|=128|_,s){for(~(K=s.indexOf(l||void 0))||(K=s.length);(L=s[K-1])&&L.nodeType==8;)K--;for(;K<s.length;K++)if(L=s[K])if(s[K]=null,W){if(L==ce)break}else{if(L.nodeType!=8)break;L.data.startsWith("$s")&&(ce=Dt(W=L))}}if(!W){for(;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;W=l}(p=Dt(W=t.__c.__z||(t.__c.__z=W)))?(t.__e=W,l=p):t.__e=l,l=l&&l.nextSibling}else s&&s.some(Le);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),S&&S.then||Do(t),D.__e(S,t,n)}}else l=t.__e=Wi(n.__e,t,n,r,o,s,i,_,f,e);return(p=D.diffed)&&p(t),l}function Dt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function Do(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(Do))}function $o(e,t,n){for(var r=0;r<n.length;)jn(n[r++],n[r++],n[r++]);D.__c&&D.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){D.__e(s,o.__v)}})}function Wi(e,t,n,r,o,s,i,l,_,f){var p,g,m,u,h,I,x,y,T=n.props||Gt,{props:k,type:U}=t;if(U=="svg"?o="http://www.w3.org/2000/svg":U=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((h=s[p])&&(U?h.localName==U:h.nodeType==3)){e=h,s[p]=null;break}}if(!e){if(y=f.ownerDocument||document,!U)return y.createTextNode(k);e=y.createElementNS(o,U,k.is?k:f),l&&(D.__m&&D.__m(t,s),l=!1),s=null}if(U){if(f=U=="template"&&e.content||e,s=U=="textarea"&&k.defaultValue!=null?null:s&&Mo.call(f.childNodes),!l&&s)for(T={},p=0;p<e.attributes.length;p++)T[(h=e.attributes[p]).name]=h.value;for(p in T)h=T[p],p=="dangerouslySetInnerHTML"?m=h:p=="children"||(p in k)||p=="value"&&("defaultValue"in k)||p=="checked"&&("defaultChecked"in k)||Ut(e,p,null,h,o);for(p in k)h=k[p],p=="children"?u=h:p=="dangerouslySetInnerHTML"?g=h:p=="value"?I=h:p=="checked"?x=h:l&&typeof h!="function"||T[p]===h||Ut(e,p,h,T[p],o);g?(l||m&&(g.__html==m.__html||g.__html==e.innerHTML)||(e.innerHTML=g.__html),t.__k=[]):(m&&(e.textContent=""),(U=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&Bi.test(U))&&(o="http://www.w3.org/1999/xhtml"),No(f,Fn(u)?u:[u],t,n,r,o,s,i,s?s[0]:n.__k&&Pe(n,0),l,_),s&&s.some(Le)),l&&U!="textarea"||(p="value",U=="progress"&&I==null?e.removeAttribute(p):I==null||I===e[p]&&(U!="progress"||I)||Ut(e,p,I,T[p],o),p="checked",x!=null&&x!=e[p]&&Ut(e,p,x,T[p],o))}else T===k||l&&e.data==k||(e.data=k);return e}function jn(e,t,n,r){try{typeof e=="function"?t?t.__x=e(t)||1:r&&(r=r.__c||r.__e)&&(t=r.__x)&&(r.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){D.__e(o,n)}}function Wn(e,t,n){var r,o,s,i;if(D.unmount&&D.unmount(e),!(r=e.ref)||r.current&&r.current!=e.__e||jn(r,null,t,e),r=e.__c){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(l){D.__e(l,t)}r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&Wn(r[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(r=e.__c)&&(r=r.__z)&&(o=Dt(r,s=[]))&&(r==e.__e&&s.some(Le),Le(o),Le(r)),n||Le(e.__e),e.__e=e.__c=e.__=null}function Ki(e,t,n){return this.constructor(e,n)}function Go(e,t){var n,r,o,s;D.__&&D.__(e,t),t.nodeType==9&&(t=t.documentElement),r=(n=e&&32&e.__u)?null:t.__k,t.__k=Nt(Re,{children:[e]}),o=[],s=[],Xn(t,t.__k,r||Gt,Gt,t.namespaceURI,r?null:t.firstChild?Mo.call(t.childNodes):null,o,r?r.__e:t.firstChild,n,s),$o(o,t.__k,s),t.__k.props.children=null}D={__e:function(e,t,n,r){for(var o,s,i;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((i=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,r||{}),i=1),i&&8&o.__g)return void(o.__g|=2)}catch(l){e=l}}throw $t=0,e}},Co=0,Gi=function(e){return e!=null&&e.constructor===nt},Lt.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=De({},this.state)),typeof e=="function"&&(e=e(De({},n),this.props)),e&&(De(n,e),this.__v&&(t&&this.__k.push(t),bo(this)))},Lt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),bo(this))},Lt.prototype.render=Re,Ue=[],$t=0,vo=function(e,t){return e.__v.__b-t.__v.__b},Pt=Symbol(),wo=/(PointerCapture)$|Capture$/i,Vn=0,Bn={},Hi=0;var ot,ne,Kn,Ho,zn=Object.is,Bt=0,qo=[],qn=[],te=D,{__b:Bo,__r:Vo,diffed:Fo,__c:Xo,unmount:jo,__:Wo}=te;function Jn(e,t){te.__h&&te.__h(ne,e,Bt||t),Bt=0;var n=ne.__H||(ne.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function w(e){return Bt=1,zi(Jo,e)}function zi(e,t,n){var r=Jn(ot++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):Jo(void 0,t),function(s){var i=(r.__N||r.__)[0],l=r.t(i,s);zn(i,l)||(r.__N=[l,r.__[1]],r.__c.setState({}))}],r.__c=ne,!ne.__f)){ne.__f=!0;var o=ne.shouldComponentUpdate;ne.shouldComponentUpdate=function(s,i,l){var _=this.__H;if(!_)return!0;var f=!1,p=this.props!=s;if(_.__.some(function(m){m.__N&&(f=!0,zn(m.__[0],m.__N[0])||(p=!0))}),o){var g=o.call(this,s,i,l);return f?g||p:g}return!f||p}}return r.__}function le(e,t){var n=Jn(ot++,3);!te.__s&&Yo(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,ne.__H.__h.push(n))}function Ne(e){return Bt=5,st(function(){return{current:e}},[])}function st(e,t){var n=Jn(ot++,7);return Yo(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function qi(){var e;do{for(;e=qn.shift();)try{rt(e)}catch(n){te.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=qo.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(rt),t.__h.some(Yn),t.__h=[]}catch(n){t.__h=[],te.__e(n,e.__v)}}}while(qn.length)}te.__b=function(e){ne=null,Bo&&Bo(e)},te.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),Wo&&Wo(e,t)},te.__r=function(e){Vo&&Vo(e),ot=0;var t=(ne=e.__c).__H;t&&(Kn==ne?ne.__h=[]:(t.__h.some(rt),t.__h.some(Yn),ot=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),Kn=ne},te.diffed=function(e){Fo&&Fo(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&zo(qo.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),Kn=ne=null},te.__c=function(e,t){t.some(function(n){try{n.__h.some(rt),n.__h=n.__h.filter(function(r){return!r.__||Yn(r)})}catch(r){n.__h=[function(){throw r}]}}),Xo&&Xo(e,t)},te.unmount=function(e){jo&&jo(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{if(o.__P&&o.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}o.__P=n,zo(qn.push(o))}else rt(o)}catch(s){t=s}}),r.__H=void 0,t&&te.__e(t,r.__v))};var Ko=typeof requestAnimationFrame=="function";function Yi(e){var t,n=function(){clearTimeout(r),Ko&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);Ko&&(t=requestAnimationFrame(n))}function zo(e){e!=1&&Ho==te.requestAnimationFrame||((Ho=te.requestAnimationFrame)||Yi)(qi)}function rt(e){var t=ne,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),ne=t}function Yn(e){var t=ne;e.__c=e.__(),ne=t}function Yo(e,t){return!e||e.length!=t.length||t.some(function(n,r){return!zn(n,e[r])})}function Jo(e,t){return typeof t=="function"?t(e):t}var Ji=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Qi=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],Qo=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of Ji)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of Qi){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},Qn=(e,t)=>{if(Qo(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var Zi={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},j=(e,t)=>`var(--${e}, var(--oc-${Zi[e]}, ${t}))`,Ie=j("surface-background","transparent"),Ft=j("surface-elevated","transparent"),je=j("surface-elevated-foreground","inherit"),me=j("surface-foreground","inherit"),q=j("surface-muted-foreground","gray"),ea=j("surface-muted","transparent"),$e=j("interactive-border","currentColor"),_e=j("interactive-hover","transparent"),Ge=j("interactive-active","transparent"),Zn=j("interactive-selection","transparent"),er=j("interactive-selection-foreground","inherit"),be=j("primary","currentColor"),tr=j("primary-text","inherit"),nr=j("error-text","inherit"),ta=j("font-sans","inherit"),rr=j("font-mono","monospace"),ns=j("radius","9px"),or=`calc(${ns} - 2px)`,Zo=`calc(${ns} - 4px)`,Y=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,es=`background-image: linear-gradient(${_e}, ${_e});`,sr=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,ir="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ts="box-shadow: var(--oc-sdk-lit);",ar=`inset 0 0.5px 0 0 ${Y(me,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,na=`
:root {
  --oc-sdk-edge: ${Y(me,16)};
  --oc-sdk-field-bg: ${Ft};
  --oc-sdk-raised-bg: ${Ie};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Y(me,14)};
  --oc-sdk-field-bg: ${Y(Ie,50,Ft)};
  --oc-sdk-raised-bg: ${Ft};
  --oc-sdk-field-lift: ${ar};
  --oc-sdk-raised-lift: ${ar};
  --oc-sdk-lit: ${ar};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Vt=(e)=>{let t=j(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${j(`${e}-text`,"inherit")}; }`},ra=`
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
`,rs=`${na}
.oc-sdk { color: ${me}; font-family: ${ta}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${es} }
.oc-sdk-mono { font-family: ${rr}; }
.oc-sdk-muted { color: ${q}; }
${Vt("success")}${Vt("warning")}${Vt("error")}${Vt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${be}; --oc-sdk-tone-text: ${tr}; }

.oc-sdk-btn { border-radius: ${or}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${Zo}; }
.oc-sdk-btn[data-variant="default"] { color: ${tr}; background: ${Y(be,10,Ie)}; border-color: ${Y(be,12)}; ${ts} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Y(be,16,Ie)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Y(be,22,Ie)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ea}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Ge}, ${Ge}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${je}; ${ir} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Ge}, ${Ge}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${_e}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Ge}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${j("status-error","red")}; color: ${nr}; background: ${Y("var(--oc-sdk-tone)",7,Ie)}; border-color: ${Y("var(--oc-sdk-tone)",12)}; ${ts} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Y("var(--oc-sdk-tone)",9,Ie)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Y("var(--oc-sdk-tone)",11,Ie)}; box-shadow: none; }

.oc-sdk-field-note { color: ${q}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${nr}; }
.oc-sdk-input { border-radius: ${or}; background: var(--oc-sdk-field-bg); color: ${je}; ${sr("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${q}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${sr(Y(me,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${sr(j("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${rr}; }

.oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${be}; }
.oc-sdk-search-clear { border-radius: ${Zo}; color: ${q}; }
.oc-sdk-search-clear:hover { background: ${_e}; color: ${me}; }

.oc-sdk-trigger { border-radius: ${or}; background: var(--oc-sdk-raised-bg); color: ${je}; ${ir} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${_e}, ${_e}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Ge}, ${Ge}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${q}; }
.oc-sdk-trigger-chevron { color: ${q}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${je}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Ft}; background-clip: padding-box; color: ${je}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${_e}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${Zn}; color: ${er}; }
.oc-sdk-option-check { color: ${me}; }
.oc-sdk-option[data-destructive="true"] { color: ${nr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Y(j("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${q}; }
.oc-sdk-popup-empty { color: ${q}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${$e}; border-radius: 4px; color: ${me}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Y(me,60,$e)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${$e}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Ie}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${be}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${es} }
.oc-sdk-check-desc { color: ${q}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Y(me,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${q}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${me}; }
.oc-sdk-tab[aria-selected="true"] { color: ${er}; background: ${Zn}; border-color: ${$e}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${je}; background: var(--oc-sdk-raised-bg); ${ir} }
.oc-sdk-tab-count { color: ${q}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Y(me,6)}; color: ${q}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${_e}; }
.oc-sdk-row[aria-selected="true"] { background: ${Zn}; color: ${er}; }
.oc-sdk-row-lead { font-family: ${rr}; color: ${q}; }
.oc-sdk-row-sub { color: ${q}; }
.oc-sdk-row-meta { color: ${q}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${q}; }

.oc-sdk-empty-body { color: ${q}; }

.oc-sdk-spinner { color: ${q}; }
.oc-sdk-spinner-ring { border-color: ${$e}; border-top-color: ${be}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${q}; }

.oc-sdk-separator { color: ${q}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Y($e,40)}; }

.oc-sdk-progress-label { color: ${q}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y(me,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${be}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${j("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${j("success-text","inherit")}; }

.oc-sdk-text a { color: ${tr}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Y($e,60)}; }
`,H=`
${pn}
${ra}
${rs}`;var os="oc-sdk-ui-style",Ce=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},B=(e)=>{let t=document.getElementById(os);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}_n(document);let n=document.createElement("style");n.id=os,n.textContent=e,document.head.appendChild(n)},A=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},fe=(e)=>{let t=A("button",e);return t.type="button",t},F=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},Se=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},ss=(e,t)=>{let n=(r)=>{if(r.target instanceof Node&&e.contains(r.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var oa=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},ve=(e,t)=>{B(H);let n=t,r=fe("oc-sdk oc-sdk-btn"),o=oa(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{if(r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=Boolean(n.disabled)||Boolean(n.loading),r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r)r.prepend(o);else if(!n.loading&&o.parentNode===r)o.remove();F(s,n.label)},l=()=>{if(n.disabled||n.loading)return;n.onClick()};return r.addEventListener("click",l),i(),{update:(_)=>{n={...n,..._},i()},dispose:()=>{r.removeEventListener("click",l),r.remove()}}};var cr=(e,t)=>{B(H);let n=t,r=A("label","oc-sdk oc-sdk-field"),o=A("span","oc-sdk-field-label"),s=n.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),i=A("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let l=()=>{if(F(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),Se(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let f=Boolean(n.error);r.dataset.invalid=f?"true":"false",s.setAttribute("aria-invalid",f?"true":"false");let p=n.error??n.helper??"";F(i,p),i.hidden=p===""},_=()=>{n.onChange(s.value)};return s.addEventListener("input",_),l(),{update:(f)=>{n={...n,...f},l()},dispose:()=>{s.removeEventListener("input",_),r.remove()}}};var sa={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ae=(e,t,n)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n)r.setAttribute("class",n);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",sa[e]),r.append(o),r};var lr=(e,t)=>{B(H);let n=t,r=A("div","oc-sdk oc-sdk-search"),o=A("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=fe("oc-sdk-search-clear");s.append(Ae("close",14)),s.tabIndex=-1,r.append(Ae("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let p=n.placeholder??"Search";if(Se(o,"placeholder",p),o.setAttribute("aria-label",n.label??p),s.setAttribute("aria-label","Clear search"),o.value!==n.value)o.value=n.value;r.dataset.active=n.value.trim()===""?"false":"true"},l=()=>{if(n.value!=="")n.onChange("");o.focus()},_=()=>{n.onChange(o.value)},f=(p)=>{if(p.key==="Escape"&&o.value!=="")p.preventDefault(),l()};if(o.addEventListener("input",_),o.addEventListener("keydown",f),s.addEventListener("click",l),i(),n.autofocus)o.focus();return{update:(p)=>{n={...n,...p},i()},dispose:()=>{o.removeEventListener("input",_),o.removeEventListener("keydown",f),s.removeEventListener("click",l),r.remove()}}};var ke=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},we=(e,t,n)=>{let r=e.filter((_)=>!_.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex((_)=>_.id===t);if(i===-1)return n==="next"?o.id:s.id;return r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var is=(e,t)=>`${e}-${t??""}`,Xt=(e,t,n,r)=>{let o=fe("oc-sdk-option");if(o.id=is(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(n.disabled),t==="option")o.setAttribute("aria-selected",n.selected?"true":"false");o.dataset.destructive=n.destructive?"true":"false";let s=A("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=A("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=A("span","oc-sdk-option-check");i.append(Ae("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},jt=(e,t,n,r)=>{let o=is(n,r);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";Se(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ia=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;if(r>o&&n.top-8>o)e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},Wt=(e,t,n,r)=>{e.append(n),ia(n,t);let o=ss(e,r),s=()=>{r()},i=(l)=>{if(l.target instanceof Node&&n.contains(l.target))return;r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var as=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((r)=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n))},aa=0,Kt=(e,t)=>{B(H);let n=t,r=`oc-sdk-select-${aa+=1}`,o=A("div","oc-sdk oc-sdk-select"),s=A("span","oc-sdk-field-label");s.id=`${r}-label`;let i=fe("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let l=A("span","oc-sdk-trigger-value");i.append(l,Ae("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let _="",f=null,p=null,g=A("div","oc-sdk oc-sdk-popup"),m=A("div","oc-sdk-popup-search"),u=A("input","oc-sdk-input");u.type="text",u.autocomplete="off",m.append(u);let h=A("div");h.setAttribute("role","listbox"),h.tabIndex=-1,g.append(h);let I=()=>as(n.options,n.searchable?_:""),x=()=>n.searchable?u:h,y=(E)=>{f=E,jt(h,x(),r,E)},T=()=>{Ce(h);let E=I();if(E.length===0){let S=A("div","oc-sdk-popup-empty");S.textContent="No matches",h.append(S)}for(let S of E)h.append(Xt(r,"option",{...S,selected:S.id===n.value},{hover:()=>y(S.id),pick:()=>se(S.id)}));y(E.some((S)=>S.id===f)?f:E[0]?.id??null)},k=()=>{let E=p;p=null,E?.(),_="",u.value="",i.setAttribute("aria-expanded","false")},U=()=>{if(p||n.disabled)return;if(f=n.value,u.placeholder=n.searchPlaceholder??"Search",n.searchable)g.prepend(m);else m.remove();T(),p=Wt(o,i,g,k),i.setAttribute("aria-expanded","true"),x().focus()},se=(E)=>{if(k(),i.focus(),E!==n.value)n.onChange(E)},ae=()=>{if(p)k();else U()},oe=(E)=>{if(!p&&ke(E))E.preventDefault(),U()},W=(E)=>{let S=ke(E);if(S)E.preventDefault(),y(we(I(),f,S));else if(E.key==="Enter"){if(E.preventDefault(),f)se(f)}else if(E.key==="Escape")E.preventDefault(),k(),i.focus();else if(n.searchable&&E.target!==u&&E.key.length===1&&!E.ctrlKey&&!E.metaKey)u.focus()},ce=()=>{_=u.value,T()},K=(E)=>{if(p&&!(E.relatedTarget instanceof Node&&o.contains(E.relatedTarget)))k()},L=()=>{F(s,n.label),s.hidden=!n.label;let E=n.options.find((S)=>S.id===n.value);if(F(l,E?.label??n.placeholder??"Select"),l.dataset.empty=E?"false":"true",i.disabled=Boolean(n.disabled),p)T()};return i.addEventListener("click",ae),i.addEventListener("keydown",oe),g.addEventListener("keydown",W),u.addEventListener("input",ce),o.addEventListener("focusout",K),L(),{update:(E)=>{n={...n,...E},L()},dispose:()=>{k(),i.removeEventListener("click",ae),i.removeEventListener("keydown",oe),g.removeEventListener("keydown",W),u.removeEventListener("input",ce),o.removeEventListener("focusout",K),o.remove()}}};var cs=(e,t,n)=>{B(H);let r=t,o=fe("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=A("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(Ae("check",12));let i=A("span","oc-sdk-check-text"),l=A("span","oc-sdk-check-label"),_=A("span","oc-sdk-check-desc");i.append(l,_),o.append(s,i),e.append(o);let f=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=Boolean(r.disabled),F(l,r.label),F(_,r.description),_.hidden=!r.description},p=()=>{if(!r.disabled)r.onChange(!r.checked)};return o.addEventListener("click",p),f(),{update:(g)=>{r={...r,...g},f()},dispose:()=>{o.removeEventListener("click",p),o.remove()}}},dr=(e,t)=>cs(e,t,"checkbox"),zt=(e,t)=>cs(e,t,"switch");var ur=(e,t)=>{B(H);let n=t,r=A("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Ce(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let l=fe("oc-sdk-tab");l.setAttribute("role","tab");let _=i.id===n.activeId;l.setAttribute("aria-selected",_?"true":"false"),l.tabIndex=_?0:-1,l.dataset.id=i.id;let f=A("span");if(f.textContent=i.label,l.append(f),i.count!==void 0){let p=A("span","oc-sdk-tab-count");p.textContent=String(i.count),l.append(p)}l.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),r.append(l)}},s=(i)=>{let l=ke(i,"horizontal");if(!l)return;let _=we(n.items,n.activeId,l);if(_&&_!==n.activeId){i.preventDefault(),n.onChange(_);let f=r.querySelector(`[data-id="${CSS.escape(_)}"]`);if(f instanceof HTMLElement)f.focus()}};return r.addEventListener("keydown",s),o(),{update:(i)=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var it=(e,t)=>{Se(e,"data-tone",t&&t!=="neutral"?t:null)},pr=(e,t)=>{B(H);let n=t,r=A("span","oc-sdk oc-sdk-badge");e.append(r);let o=()=>{F(r,n.label),it(r,n.tone)};return o(),{update:(s)=>{n={...n,...s},o()},dispose:()=>{r.remove()}}};var ca=0,_r=(e,t)=>{B(H);let n=t,r=`oc-sdk-list-${ca+=1}`,o=A("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,i=(g)=>`${r}-${g}`,l=(g)=>{s=g;for(let m of Array.from(o.children))if(m instanceof HTMLElement)m.dataset.active=m.id===i(g??"")?"true":"false";Se(o,"aria-activedescendant",g?i(g):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},_=(g,m)=>{let u=A("span",g);return u.textContent=m,u},f=()=>{if(Ce(o),Se(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(_("oc-sdk-list-empty",n.emptyText??"Nothing here")),l(null);return}for(let m of n.items){let u=fe("oc-sdk-row");if(u.id=i(m.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",m.id===n.selectedId?"true":"false"),u.disabled=Boolean(m.disabled),u.tabIndex=-1,m.leading)u.append(_("oc-sdk-row-lead",m.leading));let h=A("span","oc-sdk-row-main");if(h.append(_("oc-sdk-row-title",m.title)),m.subtitle)h.append(_("oc-sdk-row-sub",m.subtitle));if(u.append(h),m.badge){let I=_("oc-sdk-badge",m.badge.label);it(I,m.badge.tone),u.append(I)}if(m.meta)u.append(_("oc-sdk-row-meta",m.meta));u.addEventListener("click",()=>n.onSelect(m.id)),o.append(u)}let g=n.items.some((m)=>m.id===s&&!m.disabled);l(g?s:n.selectedId??null)},p=(g)=>{let m=ke(g);if(m){g.preventDefault(),l(we(n.items,s,m));return}if((g.key==="Enter"||g.key===" ")&&s)g.preventDefault(),n.onSelect(s)};return o.addEventListener("keydown",p),f(),{update:(g)=>{n={...n,...g},f()},dispose:()=>{o.removeEventListener("keydown",p),o.remove()}}};var fr=(e,t)=>{B(H);let n=t,r=A("div","oc-sdk oc-sdk-empty"),o=A("h2","oc-sdk-empty-title"),s=A("p","oc-sdk-empty-body"),i=A("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let l=null,_=()=>{if(F(o,n.title),F(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){l?.dispose(),l=null;return}let f={label:n.action.label,onClick:n.action.onClick};if(l)l.update(f);else l=ve(i,{...f,variant:"outline",size:"sm"})};return _(),{update:(f)=>{n={...n,...f},_()},dispose:()=>{l?.dispose(),l=null,r.remove()}}};var Er=(e,t={})=>{B(H);let n=t,r=A("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=A("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=A("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",F(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(l)=>{n={...n,...l},i()},dispose:()=>{r.remove()}}};var mr=(e,t)=>{B(H);let n=t,r=A("div","oc-sdk oc-sdk-banner"),o=A("div","oc-sdk-banner-text"),s=A("div","oc-sdk-banner-title"),i=A("div","oc-sdk-banner-body"),l=A("div","oc-sdk-banner-action");o.append(s,i),r.append(o,l),e.append(r);let _=null,f=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),F(s,n.title),F(i,n.body),i.hidden=!n.body,l.hidden=!n.action,!n.action){_?.dispose(),_=null;return}let p={label:n.action.label,onClick:n.action.onClick};if(_)_.update(p);else _=ve(l,{...p,variant:"outline",size:"xs"})};return f(),{update:(p)=>{n={...n,...p},f()},dispose:()=>{_?.dispose(),_=null,r.remove()}}};var la=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,Sr=(e,t)=>{B(H);let n=t,r=A("div","oc-sdk oc-sdk-progress"),o=A("div","oc-sdk-progress-label"),s=A("span"),i=A("span","oc-sdk-progress-value"),l=A("span"),_=Ae("check",14);i.append(_,l),o.append(s,i);let f=A("div","oc-sdk-progress-track");f.setAttribute("role","progressbar"),f.setAttribute("aria-valuemin","0"),f.setAttribute("aria-valuemax","100");let p=A("div","oc-sdk-progress-fill");f.append(p),r.append(o,f),e.append(r);let g=()=>{let m=la(n.value);if(it(p,n.tone),p.style.transform=`scaleX(${m/100})`,f.setAttribute("aria-valuenow",String(m)),n.label)f.setAttribute("aria-label",n.label);else f.removeAttribute("aria-label");F(s,n.label),F(l,`${m}%`);let u=m===100&&(!n.tone||n.tone==="neutral");Se(r,"data-done",u?"true":null),_.style.display=u?"":"none",o.hidden=!n.label};return g(),{update:(m)=>{n={...n,...m},g()},dispose:()=>{r.remove()}}};var ls=(e)=>e.filter((t)=>!("separator"in t)),da=0,hr=(e,t)=>{B(H);let n=t,r=`oc-sdk-menu-${da+=1}`,o=A("div","oc-sdk oc-sdk-menu");e.append(o);let s=A("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,l=null,_=ve(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)m();else u()}}),f=o.querySelector("button");f?.setAttribute("aria-haspopup","menu");let p=(y)=>{l=y,jt(s,s,r,y)},g=()=>{Ce(s);for(let y of n.items){if("separator"in y){let T=A("div","oc-sdk-separator");T.dataset.labeled="false",s.append(T);continue}s.append(Xt(r,"menuitem",y,{hover:()=>p(y.id),pick:()=>h(y.id)}))}p(ls(n.items).some((y)=>y.id===l)?l:null)},m=()=>{let y=i;i=null,y?.(),l=null,f?.setAttribute("aria-expanded","false")},u=()=>{if(i||!f)return;g(),i=Wt(o,f,s,m),f.setAttribute("aria-expanded","true"),s.focus()},h=(y)=>{m(),f?.focus(),n.onSelect(y)},I=(y)=>{let T=ke(y);if(T)y.preventDefault(),p(we(ls(n.items),l,T));else if(y.key==="Enter"||y.key===" "){if(y.preventDefault(),l)h(l)}else if(y.key==="Escape")y.preventDefault(),m(),f?.focus()},x=(y)=>{if(i&&!(y.relatedTarget instanceof Node&&o.contains(y.relatedTarget)))m()};return s.addEventListener("keydown",I),o.addEventListener("focusout",x),{update:(y)=>{if(n={...n,...y},_.update({label:n.label,variant:n.variant,size:n.size}),i)g()},dispose:()=>{m(),s.removeEventListener("keydown",I),o.removeEventListener("focusout",x),_.dispose(),o.remove()}}};var M=Gn(),qt=null,Tr=new Set;M.onReady((e)=>{qt=e,Qn(e,document.documentElement);for(let t of Tr)t(e)});var We=()=>{let[e,t]=w(qt);return le(()=>{if(Tr.add(t),qt)t(qt);return()=>{Tr.delete(t)}},[]),e};var ua=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},ds=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),pa=(e,t)=>{let n=e;for(let r of t){if(n===null||n===void 0)return;n=n[r]}return n},gr=(e,t)=>{let n=(r,o)=>{if(typeof r==="function")return(...s)=>{let i=pa(t.current,o);return typeof i==="function"?i(...s):void 0};if(Array.isArray(r))return r.map((s,i)=>n(s,[...o,i]));if(ua(r))return Object.fromEntries(Object.entries(r).map(([s,i])=>[s,n(i,[...o,s])]));return r};return n(e,[])};var _a=Symbol.for("pv"),fa=0;function a(e,t,n,r,o,s){t||(t={});var i,l,_=t;if("ref"in _&&typeof e!="function")for(l in _={},t)l=="ref"?i=t[l]:_[l]=t[l];var f={type:e,props:_,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:_a,__v:--fa,__i:-1,__u:0};return(o||s)&&(f.__source=o,f.__self=s),D.vnode&&D.vnode(f),f}var yr=(...e)=>e.filter(Boolean).join(" ");var re=({children:e,class:t})=>a("span",{class:yr("sui-chip",t),children:e},void 0,!1,void 0,this),us=({children:e,onClick:t,pressed:n,class:r})=>t?a("button",{type:"button",class:yr("sui-card",r),"aria-pressed":n,onClick:t,children:e},void 0,!1,void 0,this):a("div",{class:yr("sui-card sui-card--static",r),children:e},void 0,!1,void 0,this);var at=({title:e,children:t})=>a("div",{class:"sui-section",children:[e&&a("h3",{class:"sui-section-title",children:e},void 0,!1,void 0,this),t]},void 0,!0,void 0,this),ps=({items:e})=>a("dl",{class:"sui-kv",children:e.flatMap(([t,n])=>[a("dt",{children:t},void 0,!1,void 0,this),a("dd",{children:n},void 0,!1,void 0,this)])},void 0,!1,void 0,this),_s=(e,t)=>{let n=Ne(null),r=Ne(null),o=Ne(t);o.current=t;let s=ds(t),i=Ne(!1);le(()=>{if(!n.current)return;return r.current=e(n.current,gr(o.current,o)),i.current=!0,()=>{r.current?.dispose(),r.current=null,i.current=!1}},[]);let l=Ne(s);return le(()=>{if(!i.current||l.current===s)return;l.current=s,r.current?.update(gr(o.current,o))},[s]),n};var Oe=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let r=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...r?{}:{year:"numeric"}})},fs=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let r=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-r)/86400000)},Es=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let r=Math.max(0,Math.round((t-n)/60000));if(r<1)return"just now";if(r<60)return`${r}m ago`;let o=Math.round(r/60);if(o<24)return`${o}h ago`;let s=Math.round(o/24);if(s<30)return`${s}d ago`;return Oe(e,new Date(t))};var Ea={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},ms=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return Ea[e]??String(e);return String(e)},Ar=(e)=>{let t=e.url.match(/\/-\/merge_requests\/(\d+)/),n=e.url.match(/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/),r=t?.[1]??n?.[1];if(!r)return null;let o=e.metadata??{},s=String(o.status??o.state??"").toLowerCase(),l=o.draft===!0||o.isDraft===!0||s==="draft"?"draft":s==="merged"?"merged":s==="closed"?"closed":s==="open"||s==="opened"||s==="approved"||s==="reviewing"?"open":null;return{label:`${t?"!":"#"}${r}`,status:l,url:e.url,title:e.title}},Ss=(e,t=Date.now())=>{if(!e)return null;let n=new Date(e).getTime();if(Number.isNaN(n))return null;let r=n<t,o=Math.round(Math.abs(n-t)/60000),s=Math.round(o/60),i=Math.round(s/24),l=o<60?`${Math.max(1,o)}m`:s<24?`${s}h`:i<14?`${i}d`:`${Math.round(i/7)}w`;return{text:r?`-${l}`:l,overdue:r}},hs=(e)=>{let t=Math.abs(e),n=(r)=>String(Math.round(r*10)/10).replace(/\.0$/,"");if(t>=1e6)return`$${n(e/1e6)}M`;if(t>=1000)return`$${n(e/1000)}k`;return`$${Math.round(e)}`},Ts=(e,t=Date.now())=>{let n=e?new Date(e).getTime():NaN;if(Number.isNaN(n))return null;let r=Math.max(0,Math.round((t-n)/60000));if(r<60)return`${Math.max(1,r)}m`;let o=Math.round(r/60);if(o<24)return`${o}h`;let s=Math.round(o/24);return s<14?`${s}d`:`${Math.round(s/7)}w`};var gs=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let o=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:null},ys=([e,t,n])=>{let r=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*r(e)+0.7152*r(t)+0.0722*r(n)},ma=(e,t)=>{let[n,r]=[ys(e),ys(t)].sort((o,s)=>s-o);return(n+0.05)/(r+0.05)};var As=(e,t)=>{let n=gs(e),r=gs(t);if(!n||!r||ma(n,r)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Ke=new Map,Sa=30000,Os=(e)=>{let t=Ke.get(e);if(!t)t={at:0,listeners:new Set},Ke.set(e,t);return t},Yt=(e)=>{for(let t of e.listeners)t()},ct=(e,t,n=!1)=>{let r=Os(e);if(r.promise)return r.promise;if(!n&&r.value!==void 0&&Date.now()-r.at<Sa)return Promise.resolve(r.value);let o=t().then((s)=>(r.value=s,r.error=void 0,r.at=Date.now(),s),(s)=>{throw r.error=s,s}).finally(()=>{r.promise=void 0,Yt(r)});return r.promise=o,Yt(r),o};var xs=(e)=>{let t=[];for(let[n,r]of Ke){if(r.value===void 0)continue;let o=e(n,r.value);if(o===r.value)continue;t.push([r,r.value]),r.value=o,Yt(r)}return()=>{for(let[n,r]of t)n.value=r,Yt(n)}},Rs=(e)=>{let t=Ke.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)ct(e,t.fetcher,!0).catch(()=>{return})},He=(e)=>{for(let[t,n]of Ke){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)ct(t,n.fetcher,!0).catch(()=>{return})}},Or=(e,t)=>{let[,n]=w(0);le(()=>{if(!e)return;let o=Os(e);o.fetcher=t;let s=()=>n((i)=>i+1);return o.listeners.add(s),ct(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let r=e?Ke.get(e):void 0;return{data:r?.value,error:r?.error,loading:Boolean(r?.promise)||e!==null&&r?.value===void 0&&r?.error===void 0,refresh:()=>{if(e)ct(e,t,!0).catch(()=>{return})}}};var ks=(e,t)=>JSON.stringify({query:e,variables:t});class pe extends Error{kind;constructor(e,t){super(t);this.kind=e}}var he=async(e,t)=>{let n;try{n=await M.request({method:"POST",path:"/graphql",body:ks(e,t)})}catch(o){if(o instanceof b){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new pe("disconnected","Linear is not connected.");throw new pe("network",o.message||"Could not reach Linear.")}throw new pe("network",o instanceof Error?o.message:"Could not reach Linear.")}let r;try{r=JSON.parse(n.body)}catch{throw new pe("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new pe("disconnected","Linear sign-in expired.");if(r.errors?.length){let o=r.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new pe(s?"rate-limited":"graphql",o.message)}if(!r.data)throw new pe("graphql","Linear returned no data.");return r.data};var ze=`
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
`;var ha=(e)=>`
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
`,bs=`
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
`;var Is=`
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`;var Cs=`
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
`;var vs=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,km={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:ha(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:vs(["n1","n2"])};var ws=null,Ms=new Map,Us=(e)=>{for(let[t,n]of e)Ms.set(t,n)},Ps=(e,t)=>{let n=Ms.get(t);if(n!==void 0)return n;let r=ws?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=r.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(r.length+1)},Ns=(e)=>ws?.teamsById.get(e)?.issueEstimationType;var Ls=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),Ta=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),r=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${r.toFixed(2)}z`},lt=({type:e,color:t,size:n=14,fill:r,teamId:o,stateId:s})=>{let i=t||"currentColor",l=st(()=>As(i,Ls()),[i,Ls()]),_={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return a("svg",{..._,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return a("svg",{..._,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let f=r??(o&&s?Ps(o,s):0.5);return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:l,"stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:Ta(f),fill:l},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:l},void 0,!1,void 0,this),a("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}},Jt=({priority:e,size:t=14})=>{let n={width:t,height:t,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};if(e===1)return a("svg",{...n,children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"2.5",fill:"var(--oc-warning)"},void 0,!1,void 0,this),a("path",{d:"M7 4v3.6M7 9.4v.2",stroke:"var(--oc-bg)","stroke-width":"1.6","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);if(e>=2&&e<=4){let r=5-e;return a("svg",{...n,children:[0,1,2].map((o)=>a("rect",{x:2+o*4,y:9-o*3,width:"2.4",height:3+o*3,rx:"0.6",fill:"currentColor",opacity:o<r?1:0.28},void 0,!1,void 0,this))},void 0,!1,void 0,this)}return a("svg",{...n,children:a("path",{d:"M2.5 7h2M6 7h2M9.5 7h2",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round",opacity:"0.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},qe=({name:e,url:t,size:n=18})=>{let r=e.split(/\s+/).filter(Boolean).slice(0,2).map((s)=>s[0].toUpperCase()).join("")||"?",o={width:`${n}px`,height:`${n}px`,fontSize:`${Math.round(n*0.42)}px`};if(t)return a("img",{class:"lin-avatar",src:t,alt:e,style:o},void 0,!1,void 0,this);return a("span",{class:"lin-avatar",style:o,children:r},void 0,!1,void 0,this)},ga={open:"var(--oc-info)",merged:"var(--oc-success)",closed:"var(--oc-muted)",draft:"var(--oc-muted)"},Ds=({status:e,size:t=13})=>a("svg",{width:t,height:t,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("g",{fill:"none",stroke:e?ga[e]:"currentColor","stroke-width":"1.4","stroke-linecap":"round",children:[a("circle",{cx:"3.5",cy:"3",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"3.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"10.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("path",{d:"M3.5 4.6v4.8M10.5 9.4V6.5a2 2 0 0 0-2-2H6.5"},void 0,!1,void 0,this),a("path",{d:"M7.8 3.2 6.3 4.5l1.5 1.3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),$s=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:"currentColor","stroke-width":"1.4"},void 0,!1,void 0,this),a("path",{d:"M5.6 4.6 9.2 7l-3.6 2.4z",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Gs=({done:e,total:t,size:n=13})=>{let o=2*Math.PI*5,s=t?Math.min(1,e/t):0;return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:"var(--oc-border)","stroke-width":"2"},void 0,!1,void 0,this),a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:s>=1?"var(--oc-success)":"var(--oc-info)","stroke-width":"2","stroke-dasharray":`${o*s} ${o}`,transform:"rotate(-90 7 7)","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Hs=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"6",fill:"var(--oc-error)"},void 0,!1,void 0,this),a("path",{d:"M4 7h6",stroke:"var(--oc-bg)","stroke-width":"1.8","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Bs=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"3",fill:"none",stroke:"var(--oc-warning)","stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:"M5 10V4.5h4.2l-.9 1.4.9 1.4H5",fill:"var(--oc-warning)",stroke:"var(--oc-warning)","stroke-width":"1","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Qt=({icon:e,color:t,size:n=13})=>{if(e&&/\p{Extended_Pictographic}/u.test(e))return a("span",{class:"lin-project-emoji",style:{fontSize:`${n}px`},"aria-hidden":"true",children:e},void 0,!1,void 0,this);return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("path",{d:"M7 1.2 12.2 4.1v5.8L7 12.8 1.8 9.9V4.1z",fill:t||"var(--oc-muted)"},void 0,!1,void 0,this),a("path",{d:"M4.6 7h4.8M7 4.6v4.8",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round",opacity:"0.85"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Zt=({label:e})=>a(re,{children:[a("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this),xr=2,ya=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.6.6M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.6-.6",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),Aa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7.5",r:"4.7",fill:"none",stroke:"currentColor","stroke-width":"1.3"},void 0,!1,void 0,this),a("path",{d:"M7 5v2.7l1.6 1M5.5 1.8h3",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Oa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2zM2 4.2 7 7l5-2.8M7 7v5.5",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),xa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"5",cy:"5",r:"2.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M1.5 11.5c.4-2 1.8-3 3.5-3s3.1 1 3.5 3M9.5 3.4a2.2 2.2 0 0 1 0 3.9M10.5 8.8c1 .4 1.7 1.3 2 2.7",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Ra=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M7 4.2V7l2 1.2",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Vs=({issue:e,properties:t,subIssues:n,hideProject:r,extras:o})=>{let s=e.labels.nodes,i=e.attachments?.nodes??[],l=i.map(Ar).filter((T)=>T!==null),_=i.filter((T)=>!Ar(T)),f=(e.inRelations?.nodes??[]).filter((T)=>T.type==="blocks").length,p=(e.outRelations?.nodes??[]).filter((T)=>T.type==="blocks").length,g=ms(e.estimate,Ns(e.team.id)),m=e.dueDate?fs(e.dueDate):null,u=t.has("sla")?Ss(e.slaBreachesAt):null,h=o?.releases.nodes??[],I=(o?.needs.nodes??[]).map((T)=>T.customer).filter((T)=>T!==null),x=I.reduce((T,k)=>T+(k.revenue??0),0),y=t.has("timeInStatus")?Ts(o?.stateHistory.nodes[o.stateHistory.nodes.length-1]?.startedAt):null;return a(Re,{children:[n&&n.total>0&&a("span",{class:"lin-meta lin-meta-children",title:`${n.done} of ${n.total} sub-issues done`,children:a(re,{children:[a(Gs,{done:n.done,total:n.total},void 0,!1,void 0,this),n.done,"/",n.total]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("labels")&&s.length>0&&a("span",{class:"lin-meta lin-meta-labels",children:[s.slice(0,xr).map((T)=>a(Zt,{label:T},T.id,!1,void 0,this)),s.length>xr&&a(re,{children:["+",s.length-xr]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),t.has("changes")&&l.length>0&&a("span",{class:"lin-meta lin-meta-change",title:l.map((T)=>`${T.label} ${T.title}`).join(`
`),children:a(re,{children:[a(Ds,{status:l[0].status},void 0,!1,void 0,this),l.length===1?l[0].label:`${l.length} ${l[0].label.startsWith("!")?"MRs":"PRs"}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("links")&&_.length>0&&a("span",{class:"lin-meta lin-meta-links",title:_.map((T)=>T.title).join(`
`),children:a(re,{children:[a(ya,{},void 0,!1,void 0,this),_.length]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("project")&&!r&&e.project&&a("span",{class:"lin-meta lin-meta-project",title:e.project.name,children:a(re,{children:[a(Qt,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:e.project.name},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("milestone")&&e.projectMilestone&&a("span",{class:"lin-meta lin-meta-milestone",title:`Milestone: ${e.projectMilestone.name}`,children:a(re,{children:a("span",{class:"lin-ellipsis",children:e.projectMilestone.name},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("cycle")&&e.cycle&&a("span",{class:"lin-meta lin-meta-cycle",title:`Cycle ${e.cycle.number}${e.cycle.name?`: ${e.cycle.name}`:""}`,children:a(re,{children:[a($s,{},void 0,!1,void 0,this),e.cycle.number]},void 0,!0,void 0,this)},void 0,!1,void 0,this),f>0&&a("span",{class:"lin-meta lin-meta-blocked",title:`Blocked by ${f} ${f===1?"issue":"issues"}`,children:a(re,{children:[a(Hs,{},void 0,!1,void 0,this),f]},void 0,!0,void 0,this)},void 0,!1,void 0,this),p>0&&a("span",{class:"lin-meta lin-meta-blocking",title:`Blocking ${p} ${p===1?"issue":"issues"}`,children:a(re,{children:[a(Bs,{},void 0,!1,void 0,this),p]},void 0,!0,void 0,this)},void 0,!1,void 0,this),u&&a("span",{class:`lin-meta lin-meta-sla ${u.overdue?"lin-overdue":""}`,title:`SLA ${e.slaType??""} breaches ${Oe(e.slaBreachesAt)}`,children:a(re,{children:[a(Aa,{},void 0,!1,void 0,this),u.text]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("release")&&h.length>0&&a("span",{class:"lin-meta lin-meta-release",title:h.map((T)=>`${T.name}${T.version?` ${T.version}`:""}`).join(`
`),children:a(re,{children:[a(Oa,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:h[0].version??h[0].name},void 0,!1,void 0,this),h.length>1&&` +${h.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customers")&&I.length>0&&a("span",{class:"lin-meta lin-meta-customers",title:I.map((T)=>T.name).join(`
`),children:a(re,{children:[a(xa,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:I[0].name},void 0,!1,void 0,this),I.length>1&&` +${I.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customerRevenue")&&x>0&&a("span",{class:"lin-meta lin-meta-revenue",title:"Customer revenue",children:a(re,{children:hs(x)},void 0,!1,void 0,this)},void 0,!1,void 0,this),y&&a("span",{class:"lin-meta lin-meta-in-status",title:`In ${e.state.name} for ${y}`,children:a(re,{children:[a(Ra,{},void 0,!1,void 0,this),y]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("estimate")&&g&&a("span",{class:"lin-meta lin-meta-estimate",title:"Estimate",children:a(re,{children:g},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("dueDate")&&e.dueDate&&a("span",{class:`lin-meta lin-meta-due sui-small ${m!==null&&m<0?"lin-overdue":"sui-muted"}`,title:"Due date",children:Oe(e.dueDate)},void 0,!1,void 0,this),t.has("creator")&&e.creator&&a("span",{class:"lin-meta lin-meta-creator",title:`Created by ${e.creator.name}`,children:a(qe,{name:e.creator.name,url:e.creator.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var ka=/^[A-Za-z]{1,7}-\d+$/;var Fs=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!ka.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()},Ye=(e)=>{let t=typeof e==="string"?e:Array.isArray(e)?e.filter((s)=>typeof s==="string").join(","):"",n=[],r=[],o=0;for(let s of t.split(/[,;\s]+/)){if(!s)continue;let i=Fs(s);if(!i){if(r.length<3&&!r.includes(s.slice(0,24)))r.push(s.slice(0,24));continue}if(n.includes(i))continue;if(n.length>=25)o+=1;else n.push(i)}return{ids:n,skipped:r,cut:o}},Xs=(e,t)=>{if(typeof e!=="string")return"";let n=e.replace(/\s+/g," ").trim();return n.length>t?`${n.slice(0,t-3).trimEnd()}...`:n},js=(e)=>Xs(e,160),Ws=(e)=>Xs(e,400),Ks=(e)=>{let t=new Map;for(let n of e){let[r,o]=n.split("-"),s=t.get(r)??[];s.push(Number(o)),t.set(r,s)}return{or:[...t].map(([n,r])=>({and:[{team:{key:{eqIgnoreCase:n}}},{number:{in:r}}]}))}},zs=(e)=>{let t=new Map;for(let r of e){let o=t.get(r.team.id)??[];o.push(r),t.set(r.team.id,o)}let n=new Map;for(let r of t.values())r.sort((o,s)=>o.position-s.position),r.forEach((o,s)=>n.set(o.id,(s+1)/(r.length+1)));return n},qs=(e)=>`${e.identifier} ${e.title}`.slice(0,1900),Rr=(e)=>{let t=e?.trim().split(/\s+/,1)[0];return Fs(t)};async function Be(e,t,n,r={}){let o=r.name??"extension",s={};for(let[i,l]of Object.entries(r.query??{}))if(l)s[i]=l;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...r.body!==void 0?{body:JSON.stringify(r.body)}:{}}),l;try{l=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${o} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&l.ok===void 0)return{ok:!1,error:String(l.message??`Error ${i.status}`),code:"failed"};return l}catch(i){let l=i.code;if(l==="NO_SERVICE")return{ok:!1,error:`Approve the ${o} service in Settings > Extensions.`,code:"failed"};if(l==="SERVICE_FAILED")return{ok:!1,error:`The ${o} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${o} service.`,code:"failed"}}}async function xe(e,t,n,r={}){try{await e.toast({kind:t,message:n,...r.dismiss?{dismiss:!0}:{}})}catch{}}var Ia=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,Ys=(e)=>{if(!e)return[];let t=[],n=(o)=>{let s=o?.toUpperCase();if(s&&!t.includes(s))t.push(s)},r=[...e.links??[]].sort((o,s)=>(s.linkedAt??0)-(o.linkedAt??0));for(let o of r)n(o.url.match(Ia)?.[1]);for(let o of e.items??[]){let s=o.data?.identifier;if(typeof s==="string")n(s)}return t};var Ca="plan";var va=(e)=>({sessionId:e.id,directory:e.directory,title:e.title,agent:e.agent??null,inWorktree:e.worktree!==null,updatedAt:e.updatedAt}),Js=(e,t,n=new Set)=>{let r=t.toUpperCase(),o=(s)=>(s.agent===Ca?0:2)+(s.inWorktree?0:1);return e.filter((s)=>s.archivedAt===null&&s.parentId===null&&(n.has(s.id)||Ys(s).includes(r))).map(va).sort((s,i)=>o(s)-o(i)||i.updatedAt-s.updatedAt)[0]??null};var wa=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,Ma=1e5,Ua=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),Qs=(e,t)=>{let n=Ua(t.trim()).trim(),r=n.length>20000?`${n.slice(0,20000).trimEnd()}

[cut]`:n,o=(e??"").replace(wa,"").trimEnd(),s=`---
## Plan

${r}`,i=o?`${o}

${s}`:s;return i.length>Ma?null:i},Zs=(e,t=6,n=420)=>{let r=e.trim().split(`
`).filter((o)=>o.trim()).slice(0,t).join(`
`);return r.length>n?`${r.slice(0,n).trimEnd()}...`:r};var ei="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var Pa=["No priority","Urgent","High","Medium","Low"],kr=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${Pa[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],n=e.comments.nodes.slice(-5).map((o)=>`${o.user?.name??"Someone"} (${Oe(o.createdAt)}): ${o.body}`),r=[...t,...n.length?["","Latest comments:",...n]:[]].filter((o,s,i)=>o||i[s-1]).join(`
`);return r.length>15000?`${r.slice(0,15000)}
[cut]`:r};var ti=["triage","backlog","unstarted","started","completed","canceled","duplicate"],ni=(e,t)=>ti.indexOf(e.type)-ti.indexOf(t.type)||e.position-t.position;var ri=["No priority","Urgent","High","Medium","Low"];var oi=(e)=>[...e??[]].sort(ni);var br=(e)=>oi(e).filter((t)=>t.type==="started"||t.type==="unstarted"&&/plan/i.test(t.name)),en=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=br(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return si(r.filter((o)=>o.type==="started"),n,r)},si=(e,t,n=e)=>{let r=t?.trim().toLowerCase();return(r?n.find((o)=>o.name.trim().toLowerCase()===r):void 0)??e.find((o)=>/^in progress$/i.test(o.name.trim()))??e.find((o)=>/progress|doing|working|development|started/i.test(o.name))??e.find((o)=>!/block|hold|pause|wait|stuck/i.test(o.name))??e[0]??null},ii=(e)=>/plan/i.test(e.name),ai=(e)=>oi(e).filter((t)=>t.type==="started"&&!ii(t)),Ir=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!ii(e.state))return null;return si(ai(t),n)},Cr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=br(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return r.find((o)=>/plan/i.test(o.name))??en(e,t,n)},ci=(e,t,n,r)=>{let o=e==="build"?ai(n):br(n),s=e==="build"?Ir(t,n,r):e==="plan"?Cr(t,n,r):en(t,n,r),i=s??o.find((l)=>l.id===t.state.id)??null;return{options:o,target:i,moves:s!==null}};var li=(e,t)=>{let n=t.trim().replace(/^refs\/heads\//,"").toLowerCase();if(!n)return null;return e.find((r)=>r.status==="ready"&&r.branch.replace(/^refs\/heads\//,"").toLowerCase()===n)?.directory??null},vr=(e,t)=>t>0?`${e}-${t+1}`:e;var tn=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof pe&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof pe&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},Na=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),di=(e,t)=>xs((n,r)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&Na(r)&&r.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...r,issues:r.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof r==="object"&&r!==null&&r.id===e){let{team:o,...s}=t;return{...r,...s}}return r}),La=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new pe("graphql","Linear did not save the change.");return e.issueUpdate.issue},dt=async(e,t)=>{let n=di(e.id,t.patch);try{let r=La(await he(Cs,{id:e.id,input:t.input}));if(di(e.id,r),Rs(`issue:${e.identifier}`),"stateId"in t.input)He("children:");return r}catch(r){throw n(),r}};var ui=async(e,t)=>{let n=await M.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:kr(e),data:{issueId:e.id,identifier:e.identifier},worktree:t.existing?{kind:"existing",directory:t.existing}:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(n.sessionId===null)return{started:!1,directory:n.directory};let r=t.state??en(e,e.team.states.nodes),{moved:o,moveError:s}=await pi(e,r,t.move);return{started:!0,sessionId:n.sessionId,target:r,moved:o,moveError:s}},pi=async(e,t,n)=>{let r=!1,o=null;if(n&&t)try{await dt(e,{input:{stateId:t.id},patch:{state:t}}),r=!0}catch(s){o=tn(s)}return{moved:r,moveError:o}},_i=async(e,t)=>{let n=t.existing??null;if(!n){let l=await M.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",data:{issueId:e.id,identifier:e.identifier},worktree:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(l.sessionId===null)return{started:!1,directory:l.directory};if(n=l.worktree?.directory??l.directory??t.directoryHint??null,!n)return{started:!1,directory:"",error:"The host did not say which folder the session is in."}}let r;try{r=(await Ei({identifier:e.identifier,directory:n,issueTitle:e.title,context:kr(e)})).sessionId}catch(l){return{started:!1,directory:n,error:l instanceof Error?l.message:String(l)}}let o=t.state??Cr(e,e.team.states.nodes),{moved:s,moveError:i}=await pi(e,o,t.move);return{started:!0,sessionId:r,target:o,moved:s,moveError:i}},wr=(e)=>e.replace(/\/+$/,""),Mr=async(e)=>{if(!e)return null;try{let t=wr(e),n=(await M.listProjects())?.projects??[],r=n.find((o)=>wr(o.directory)===t);if(r)return r;for(let o of n)if(((await M.listWorktrees(o.id))?.worktrees??[]).some((i)=>wr(i.directory)===t))return o}catch{}return null},fi=async(e,t)=>{try{let n=await Mr(e);if(!n)return null;return li((await M.listWorktrees(n.id))?.worktrees??[],t)}catch{return null}},nn=async(e)=>{try{await M.openSession(e)}catch{}};var mi=async(e,t)=>{let n=await Da(t);try{let o=await Mr(e);if(o){let s=await M.listSessions(o.id),i=Js(s?.sessions??[],t,new Set(n.map((l)=>l.sessionId)));if(i)return i}}catch{}let r=n[0];return r?{sessionId:r.sessionId,directory:r.sessionDirectory,title:r.title,agent:"plan",inWorktree:!0,updatedAt:r.createdAt}:null},Da=async(e)=>{let t=await Be(M,"GET","/plans",{query:{identifier:e},name:"Linear"}),n=t.ok===!1?[]:t.sessions;if(!Array.isArray(n))return[];return n.map((r)=>r).filter((r)=>typeof r.sessionId==="string"&&typeof r.createdAt==="number").map((r)=>({sessionId:r.sessionId,sessionDirectory:typeof r.sessionDirectory==="string"?r.sessionDirectory:typeof r.directory==="string"?r.directory:"",title:typeof r.title==="string"?r.title:`${e} plan`,createdAt:r.createdAt})).filter((r)=>r.sessionDirectory.startsWith("/"))};var Si=async(e)=>{let t=await Be(M,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{}},name:"Linear"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},rn=async(e)=>{let t=await Be(M,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier},name:"Linear"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1}},Ei=async(e)=>{let t=await Be(M,"POST","/plan",{body:e,name:"Linear"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear service did not start the plan.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.directory}};var de=(e,t="inline-flex")=>(n)=>{let r=_s(e,n);return a("span",{ref:r,style:{display:t}},void 0,!1,void 0,this)},Te=de(ve),hi=de(Kt),WS=de(cr,"block"),KS=de(lr,"block"),zS=de(ur),qS=de(hr),YS=de(pr),Je=de(Er),ge=de(mr,"block"),Ti=de(fr,"block"),JS=de(Sr,"block"),QS=de(_r,"block"),ZS=de(dr),Qe=de(zt),eh=de(zt,"block"),th=de(Kt,"block");var on=(e,t,n,r)=>{let o=st(()=>t?ci(e,t,t.team.states.nodes,n):null,[e,t,n]),[s,i]=w(null),[l,_]=w(null),f=o?.options??[],p=f.find((u)=>u.id===s)??o?.target??null,g=l??Boolean(o?.moves&&r),m=Boolean(t&&p&&g&&p.id!==t.state.id);return{options:f,selected:p,move:m,select:(u)=>{if(i(u),t&&u!==t.state.id)_(!0)},toggle:_}},sn=({choice:e,disabled:t})=>a("div",{class:"lin-move-row",children:[a(Qe,{label:"Move the issue to",checked:e.move,disabled:t||e.options.length===0,onChange:e.toggle},void 0,!1,void 0,this),e.options.length>0&&a(hi,{value:e.selected?.id??null,options:e.options.map((n)=>({id:n.id,label:n.name})),disabled:t,onChange:e.select},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var gi=async(e)=>{try{let t=await M.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},$a=async(e,t)=>{try{return await M.storage.set(e,t),!0}catch{return!1}};var ut=async()=>await gi("pref:start-moves")!==!1;var pt=async(e)=>{let t=await gi(`pref:start-state:${e}`);return typeof t==="string"?t:null},_t=(e,t)=>$a(`pref:start-state:${e}`,t);var Ur=async(e,t,n=!1)=>{let{plan:r,isPlan:o}=await rn({source:t,identifier:e.identifier});if(!o&&!n)throw Error(ei);let s=(await he(ze,{id:e.identifier})).issue,i=Qs(s.description,r);if(i===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);await dt(s,{input:{description:i},patch:{description:i}})};var yi=async(e,t,n)=>{let r=!1;if(n.post)await Ur(e,t,n.force),r=!0;let o=await Si({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force}),s=n.state??Ir(e,e.team.states.nodes,n.lastState),i=!1,l=null;if(n.move&&s)try{await dt(e,{input:{stateId:s.id},patch:{state:s}}),i=!0}catch(_){l=tn(_)}return{sessionId:o.sessionId,target:s,moved:i,moveError:l,posted:r}};var an=(e)=>e instanceof Error?e.message:String(e),Ga=(e)=>e.replace(/\/+$/,"").split("/").pop()||e,Ai=({identifier:e,source:t,detail:n,onClose:r,onDone:o})=>{let[s,i]=w(n??null),[l,_]=w(null),[f,p]=w(!0),[g,m]=w(null),[u,h]=w(!1),[I,x]=w(null),[y,T]=w(null),[k,U]=w(null),[se,ae]=w(null),[oe,W]=w(!1),[ce,K]=w(!1),[L,E]=w(!1),S=on("build",s,g,f);if(le(()=>{let v=!0;return U(null),ae(null),rn({source:t,identifier:e}).then((J)=>{if(v)U(J),W(J.postPlan)},(J)=>{if(v)ae(an(J))}),()=>{v=!1}},[e,t.sessionId]),le(()=>{let v=!0;return Promise.all([n?Promise.resolve(n):he(ze,{id:e}).then((J)=>J.issue),ut().catch(()=>!0)]).then(([J,Me])=>{if(!v)return;i(J),p(Me),pt(J.team.id).then((ie)=>{if(v)m(ie)},()=>{return})},(J)=>{if(v)_(an(J))}),()=>{v=!1}},[e,n]),y)return a("div",{class:"lin-build","data-state":"started",children:a("div",{class:"sui-small",children:y},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(l)return a(ge,{tone:"error",title:"Could not read the issue",body:l,action:{label:"Close",onClick:r}},void 0,!1,void 0,this);if(!s)return a(Je,{label:"Reading the issue"},void 0,!1,void 0,this);let Ee=async()=>{h(!0),x(null);try{await Ur(s,t,L),He("issue"),await xe(M,"success",`Added the plan to ${s.identifier}.`),K(!0)}catch(v){x(an(v))}finally{h(!1)}},G=async()=>{h(!0),x(null);try{let v=await yi(s,t,{move:S.move,post:oe&&Boolean(k),force:L,state:S.selected,lastState:g});if(v.moved&&v.target)_t(s.team.id,v.target.name).catch(()=>{return});if(v.moveError)await xe(M,"error",`Build started, but ${s.identifier} was not moved: ${v.moveError}`);let J=`${v.posted?"Added the plan to the issue and started":"Started"} a build for ${s.identifier}${v.moved?` and moved it to ${v.target.name}`:""}.`;if(await xe(M,"success",J),T(J),v.moved)He("block:");await nn(v.sessionId),o?.()}catch(v){x(an(v))}finally{h(!1)}};return a("div",{class:"lin-build","data-state":"options",children:[a("div",{class:"sui-small",children:["Builds from the last reply in ",a("strong",{children:t.title},void 0,!1,void 0,this),t.agent?` (${t.agent} agent)`:"",", in ",Ga(t.directory),", as a new session. It uses the folder's build agent and model from Settings."]},void 0,!0,void 0,this),se&&a(ge,{tone:"warning",title:"The plan cannot be read yet",body:se},void 0,!1,void 0,this),k&&!k.isPlan&&a(ge,{tone:"warning",title:"The last reply is not a plan",body:'Ask the planning session: "Repeat the final plan in full, unchanged, as your last message. No question cards." Then reopen this. Writing or building from a chat answer would put the wrong text in the issue and the build.',action:L?void 0:{label:"Use it anyway",onClick:()=>E(!0)}},void 0,!1,void 0,this),k?.earlier&&a("div",{class:"sui-muted sui-small",children:"The last reply in that session is not the plan, so this is the latest reply that was."},void 0,!1,void 0,this),k&&a("pre",{class:"lin-build-plan",children:Zs(k.plan)},void 0,!1,void 0,this),I&&a(ge,{tone:"error",title:"Could not start the build",body:I},void 0,!1,void 0,this),a(Qe,{label:"Add the plan to the issue description first",description:oe?`A plan section at the end of ${s.identifier}'s description, replaced if one is already there. Then the build starts.`:void 0,checked:oe&&Boolean(k),disabled:!k||u,onChange:W},void 0,!1,void 0,this),a(sn,{choice:S,disabled:u},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(Te,{label:u?"Starting...":oe&&k?"Add plan and build":"Start build",size:"sm",disabled:u||!k||!k.isPlan&&!L,onClick:()=>{G()}},void 0,!1,void 0,this),a(Te,{label:ce?"Plan added":"Add plan only",variant:"outline",size:"sm",disabled:u||!k||!k.isPlan&&!L,onClick:()=>{Ee()}},void 0,!1,void 0,this),a(Te,{label:"Cancel",variant:"ghost",size:"sm",disabled:u,onClick:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},Oi=(e,t)=>{let[n,r]=w(null);return le(()=>{let o=!0;if(r(null),!e)return;return mi(e,t).then((s)=>{if(o)r(s)}),()=>{o=!1}},[e,t]),n};var Ha=async(e)=>{let t=await he(bs,{filter:Ks(e)}),n=new Map;for(let o of t.issues.nodes)n.set(o.identifier.toUpperCase(),o);let r=[...new Set(t.issues.nodes.filter((o)=>o.state.type==="started").map((o)=>o.team.id))];if(r.length>0)try{Us(zs((await he(Is,{teamIds:r})).workflowStates.nodes))}catch{}return n},xi=(e)=>Or(e.length>0?`block:${e.join(",")}`:null,()=>Ha(e));var Ze=({ids:e,children:t})=>{let n=xi(e);if(n.data)return a(Re,{children:t(n.data)},void 0,!1,void 0,this);if(n.error){let r=n.error instanceof pe?n.error:new pe("network",String(n.error));if(r.kind==="disconnected")return a(Ti,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber to see these issues.",action:{label:"Connect Linear",onClick:()=>{M.oauthStart()}}},void 0,!1,void 0,this);return a(ge,{tone:"error",title:"Could not load from Linear",body:r.message,action:{label:"Retry",onClick:()=>n.refresh()}},void 0,!1,void 0,this)}return a("div",{class:"lin-block-wait",children:a(Je,{label:"Loading from Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},ft=({skipped:e,cut:t})=>{if(e.length===0&&t===0)return null;let n=[e.length>0?`Not an issue key: ${e.join(", ")}.`:"",t>0?`${t} more not shown.`:""].filter(Boolean);return a("div",{class:"sui-small sui-muted",children:n.join(" ")},void 0,!1,void 0,this)},et=({id:e})=>a("div",{class:"lin-block-missing sui-small sui-muted",children:[a("span",{class:"sui-mono",children:e},void 0,!1,void 0,this),a("span",{children:"Not found in Linear, or you cannot see it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Pr=(e)=>e instanceof Error?e.message:String(e),Ri=({issue:e,plan:t,onClose:n})=>{let r=t?"plan":"session",[o,s]=w(null),[i,l]=w(null),[_,f]=w(!0),[p,g]=w(!0),[m,u]=w(!1),[h,I]=w(null),[x,y]=w(null),[T,k]=w(null),[U,se]=w(0),[ae,oe]=w(null),[W,ce]=w(null),K=We()?.directory??null,L=on(t?"plan":"session",o,ae,p);if(le(()=>{let G=!0;return s(null),l(null),Promise.all([he(ze,{id:e.identifier}),ut().catch(()=>!0),pt(e.team.id).catch(()=>null)]).then(([v,J,Me])=>{if(!G)return;s(v.issue),g(J),oe(Me),fi(K,v.issue.branchName).then((ie)=>{if(G)y(ie)})},(v)=>{if(G)l(Pr(v))}),()=>{G=!1}},[e.identifier]),W)return a("div",{class:"lin-block-start","data-state":"started",children:a("div",{class:"sui-small",children:W},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(i)return a("div",{class:"lin-block-start",children:a(ge,{tone:"error",title:"Could not read the issue",body:i,action:{label:"Close",onClick:n}},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(!o)return a("div",{class:"lin-block-start",children:a(Je,{label:"Reading the issue"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let E=h??x,S=vr(o.branchName,U),Ee=async()=>{u(!0),k(null);try{let G=await(t?_i:ui)(o,{worktree:_,move:L.move,existing:E,branch:S,state:L.selected,directoryHint:K});if(!G.started){I(G.directory),k(G.error??null);return}if(G.moveError)await xe(M,"error",`The ${r} started, but ${o.identifier} was not moved: ${G.moveError}`);if(!t&&G.moved&&G.target)_t(o.team.id,G.target.name).catch(()=>{return});let v=`Started a ${r} for ${o.identifier}${G.moved?` and moved it to ${G.target.name}`:""}.`;if(await xe(M,"success",v),ce(v),G.moved)He("block:");await nn(G.sessionId)}catch(G){let v=_&&!E;if(v)se((Me)=>Me+1);let J=v?` A branch named ${S} may already exist. Start again to try ${vr(o.branchName,U+1)}, or turn off "Work in a new worktree".`:"";k(`${Pr(G).replace(/\.+$/,"")}.${J}`),await xe(M,"error",`Could not start a ${r}: ${Pr(G)}`)}finally{u(!1)}};return a("div",{class:"lin-block-start","data-state":"options",children:[h&&a(ge,{tone:"warning",title:`The worktree is ready, but the ${r} did not start`,body:`Retry starts the ${r} in ${h}.`},void 0,!1,void 0,this),!h&&x&&a(ge,{tone:"info",title:"This issue already has a worktree",body:`The session starts in ${x}, on branch ${o.branchName}.`},void 0,!1,void 0,this),t&&!h&&a("div",{class:"sui-muted sui-small",children:"Makes the worktree, then starts a planning session in it with the folder's plan agent and model. It plans and stops: it changes no files."},void 0,!1,void 0,this),T&&a(ge,{tone:"error",title:`Could not start a ${r}`,body:T},void 0,!1,void 0,this),a(Qe,{label:E?"Work in the existing worktree":"Work in a new worktree",description:`Branch ${S}`,checked:_||Boolean(E),disabled:Boolean(E)||m,onChange:f},void 0,!1,void 0,this),a(sn,{choice:L,disabled:m},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(Te,{label:m?"Starting...":h?"Retry in that worktree":x?"Start in that worktree":t?"Start plan":"Start session",size:"sm",disabled:m,onClick:()=>{Ee()}},void 0,!1,void 0,this),a(Te,{label:"Cancel",variant:"ghost",size:"sm",disabled:m,onClick:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Ba=({issue:e})=>{let[t,n]=w(null),r=Oi(We()?.directory??null,e.identifier),o=e.labels.nodes;return a(us,{class:"lin-block-card",children:[a("div",{class:"lin-block-title",children:[a(lt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:16},void 0,!1,void 0,this),a("span",{class:"lin-block-key sui-mono sui-muted",children:e.identifier},void 0,!1,void 0,this),a("span",{class:"lin-block-name",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),a(ps,{items:[["Status",a("span",{class:"lin-block-value",children:[a(lt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this),e.state.name]},void 0,!0,void 0,this)],["Priority",a("span",{class:"lin-block-value",children:[a(Jt,{priority:e.priority},void 0,!1,void 0,this),ri[e.priority]]},void 0,!0,void 0,this)],["Assignee",e.assignee?a("span",{class:"lin-block-value",children:[a(qe,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this),e.assignee.name]},void 0,!0,void 0,this):a("span",{class:"sui-muted",children:"Unassigned"},void 0,!1,void 0,this)],...e.project?[["Project",a("span",{class:"lin-block-value",children:[a(Qt,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),e.project.name]},void 0,!0,void 0,this)]]:[],...o.length>0?[["Labels",a("span",{class:"lin-block-value lin-block-chips",children:o.map((s)=>a(Zt,{label:s},s.id,!1,void 0,this))},void 0,!1,void 0,this)]]:[],...e.dueDate?[["Due",a(re,{children:Oe(e.dueDate)},void 0,!1,void 0,this)]]:[],["Updated",a("span",{class:"sui-muted",children:Es(e.updatedAt)},void 0,!1,void 0,this)]]},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(Te,{label:"Open in Linear",variant:"outline",size:"sm",onClick:()=>{M.openUrl(e.url)}},void 0,!1,void 0,this),a(Te,{label:"Start plan",variant:"outline",size:"sm",disabled:t==="plan",onClick:()=>n("plan")},void 0,!1,void 0,this),a(Te,{label:"Start session",variant:"outline",size:"sm",disabled:t==="session",onClick:()=>n("session")},void 0,!1,void 0,this),r&&a(Te,{label:"Start build",variant:"outline",size:"sm",disabled:t==="build",onClick:()=>n("build")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),(t==="session"||t==="plan")&&a(Ri,{issue:e,plan:t==="plan",onClose:()=>n(null)},void 0,!1,void 0,this),t==="build"&&r&&a("div",{class:"lin-block-start",children:a(Ai,{identifier:e.identifier,source:r,onClose:()=>n(null)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},ki=({args:e})=>{let{ids:t}=Ye(e.id),n=t[0];if(!n)return a("div",{class:"sui-muted",children:"LinearIssue needs an issue identifier such as ENG-123."},void 0,!1,void 0,this);return a(Ze,{ids:[n],children:(r)=>{let o=r.get(n);return o?a(Ba,{issue:o},void 0,!1,void 0,this):a(et,{id:n},void 0,!1,void 0,this)}},void 0,!1,void 0,this)};var Va=new Set(["id","status","assignee","priority","project","dueDate","cycle","estimate","labels","links","created","changes"]),cn=({issue:e,selected:t,cursor:n,properties:r=Va,hideProject:o,compact:s,subIssues:i,extras:l,depth:_=0,disabled:f,onOpen:p})=>a("button",{type:"button",class:"lin-issue-row","aria-selected":t?"true":"false",disabled:f,"data-cursor":n?"true":"false","data-issue":e.identifier,"data-depth":_||void 0,style:_?{paddingLeft:`${8+_*22}px`}:void 0,onClick:()=>p(e),title:e.title,children:[r.has("priority")||s?a(Jt,{priority:e.priority},void 0,!1,void 0,this):null,r.has("id")||s?a("span",{class:"lin-issue-key sui-mono",children:e.identifier},void 0,!1,void 0,this):null,r.has("status")||s?a(lt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this):null,a("span",{class:"lin-issue-title",children:e.title},void 0,!1,void 0,this),!s&&a("span",{class:"lin-issue-meta",children:a(Vs,{issue:e,properties:r,subIssues:i,hideProject:o,extras:l},void 0,!1,void 0,this)},void 0,!1,void 0,this),(r.has("assignee")||s)&&(e.assignee?a("span",{class:"lin-meta-assignee",title:e.assignee.name,children:a(qe,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this):a("span",{class:"lin-avatar-empty","aria-label":"No assignee"},void 0,!1,void 0,this)),!s&&r.has("created")&&a("span",{class:"lin-meta-created sui-small sui-muted",title:"Created",children:Oe(e.createdAt)},void 0,!1,void 0,this),!s&&r.has("updated")&&a("span",{class:"lin-meta-updated sui-small sui-muted",title:"Updated",children:Oe(e.updatedAt)},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Nr=new Set(["id","status","assignee","priority","labels","dueDate"]),bi=({args:e})=>{let{ids:t,skipped:n,cut:r}=Ye(e.ids),o=js(e.title);if(t.length===0)return a(at,{title:o||void 0,children:[a("div",{class:"sui-muted",children:"No issue identifiers to show."},void 0,!1,void 0,this),a(ft,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return a(at,{title:o||void 0,children:[a(Ze,{ids:t,children:(s)=>a("div",{class:"lin-groups lin-block-rows",children:t.map((i)=>{let l=s.get(i);return l?a(cn,{issue:l,properties:Nr,onOpen:(_)=>{M.openUrl(_.url)}},i,!1,void 0,this):a(et,{id:i},i,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(ft,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Ii=({args:e,answered:t})=>{let{ids:n,skipped:r,cut:o}=Ye(e.ids),s=Ws(e.question),[i,l]=w(null),[_,f]=w(!1),p=t??i,g=Rr(t)??i,m=async(u)=>{if(_||p)return;f(!0);try{await M.answerBlock(qs(u)),l(u.identifier)}catch(h){await xe(M,"error",`Could not send your choice: ${h instanceof Error?h.message:String(h)}`)}finally{f(!1)}};return a(at,{title:s||"Pick an issue",children:[n.length===0?a("div",{class:"sui-muted",children:"No issues to choose from."},void 0,!1,void 0,this):a(Ze,{ids:n,children:(u)=>a("div",{class:"lin-groups lin-block-rows","data-answered":p?"true":"false",children:n.map((h)=>{let I=u.get(h);return I?a(cn,{issue:I,properties:Nr,selected:g===h,disabled:Boolean(p)||_,onOpen:(x)=>{m(x)}},h,!1,void 0,this):a(et,{id:h},h,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(ft,{skipped:r,cut:o},void 0,!1,void 0,this),p?a("div",{class:"sui-small sui-muted","data-state":"answered",children:t?`${Rr(t)?"You chose":"You answered"}: ${t}`:`You chose ${i}.`},void 0,!1,void 0,this):n.length>0&&a("div",{class:"sui-small sui-muted",children:"Click an issue to choose it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Fa=({call:e})=>{switch(e.name){case"LinearIssue":return a(ki,{args:e.args},void 0,!1,void 0,this);case"LinearIssueList":return a(bi,{args:e.args},void 0,!1,void 0,this);case"LinearPickIssue":return a(Ii,{args:e.args,answered:e.answered},void 0,!1,void 0,this);default:return a("div",{class:"sui-muted",children:["This Linear extension has no block called ",e.name.slice(0,40),"."]},void 0,!0,void 0,this)}},Xa=()=>{We();let[e,t]=w(null),n=Ne(null);return le(()=>M.onBlock(t),[]),le(()=>{let r=n.current;if(!r)return;let o=0,s=new ResizeObserver(()=>{let i=Math.min(Math.ceil(r.getBoundingClientRect().height),gt);if(i===o)return;o=i,M.setHeight(i).catch(()=>{return})});return s.observe(r),()=>s.disconnect()},[]),a("div",{class:"lin-block",ref:n,style:{maxHeight:gt},children:e?a(Fa,{call:e},`${e.name}:${JSON.stringify(e.args)}`,!1,void 0,this):a("div",{class:"sui-muted",children:"Waiting for the agent"},void 0,!1,void 0,this)},void 0,!1,void 0,this)};Go(a(Xa,{},void 0,!1,void 0,this),document.getElementById("root"));})();

(()=>{var U="openchamber.sdk",N=1;var bn=`
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
`;function kn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(r)=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=n.get(o);if(s!==void 0)clearTimeout(s);n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var da=`(${kn.toString()})(document);`;var Cn=128,wn=65536;var bt=128;var kt=65536;var po=/^[a-z][a-z0-9-]{0,39}$/;var co=(e)=>Object(e)===e&&!Array.isArray(e),vn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),lo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,uo=(e)=>String(e)===e&&e.length>=1&&e.length<=80,fo=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!co(n)||!po.test(n.id)||!lo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!vn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!vn(n,["kind","id","label","value","options","disabled"]))return!1;if(!uo(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!co(o)||!vn(o,["value","label"])||!uo(o.value)||!lo(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var _o=["{id}","{segment}","{segments+}"];var $c=new Set(_o);var Ct=960;var mo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var Bc=new Set(mo);var wt=20000000,vt=256;var Mn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,Eo=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var So=/^[A-Za-z0-9_-]{1,80}$/;var ho=["left","right","top","bottom"];var To=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!To(o,t+1,n))return!1;return!0},Pn=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(Pn);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(Pn)}return String(e)===e||Number.isFinite(e)},Un=(e)=>{try{if(String(e.id)!==e.id||!So.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!ho.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!To(e.data)||!Pn(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var Ln=2000;var yo=["file","directory","other","missing"],Dn=(e)=>Boolean(e&&"sessionId"in e),$n=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var Ao=/^[0-9a-f]{7,64}$/i,Gn=(e)=>Ao.test(e),Mt=500,Pt=32000,xo=16000,Ro=128,Oo=200,Io=2000,bo=16000,ko=80,Co=200,wo=16000;var vo=2000;var Bn=20000,Ut=1024,Nt=2000000;var Lt=64000,Dt=8000,Hn=4000;var Vn=960000;var Mo=999,Po=1e4,ct=500,Uo=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],No=["stopped","starting","ready","failed"],pa=new Set(Uo),Lo=(e)=>pa.has(e),Do=(e)=>e&&Lo(e)?e:"HOST_REJECTED",ze=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(ze);if(Object(e)===e)return Object.values(e).every(ze);return!1},$o=(e)=>ze(e)&&JSON.stringify(e).length<=wo,go=(e)=>e?.trim().slice(0,Co)??"",qe=(e)=>{let t=e.id.trim().slice(0,Ro),n=e.title.trim().slice(0,Oo),r=e.url.trim().slice(0,Io),o=e.text?.trim().slice(0,bo),s=e.author?.trim().slice(0,ko),i=e.kind==="pull"?"pull":"issue",c={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o)c.text=o;if(s)c.author=s;if(i==="pull"){let f=go(e.branches?.head),_=go(e.branches?.base);if(f&&_)c.branches={head:f,base:_}}if($o(e.data))c.data=e.data;return c},Fn=(e)=>{let t=qe(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Xn=(e)=>{let t={text:e.text.trim().slice(0,xo)};if(e.send)t.send=!0;return t},jn=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(Mo,Math.max(0,Math.round(e)))},Wn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Po,Math.max(0,Math.ceil(e)))};var Ye=(e)=>e.length>0&&e.length<=Ut&&!e.includes("\x00")&&!e.includes("\\");var $t=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>vo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},fa=new Set(No),Kn=(e)=>Boolean(e&&"status"in e&&fa.has(String(e.status))&&!("body"in e)),Gt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),zn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),qn=(e)=>Boolean(e&&"written"in e&&e.written===!0),Yn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),_a=new Set(yo),Jn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&_a.has(String(e.kind))&&Number.isFinite(e.size)),Qn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),ma=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),Ea=(e)=>Object(e)===e?e:null,Nn=(e)=>String(e)===e&&e.length>0,Sa=(e)=>{if(!Nn(e.id))return null;if(e.ok===!0){let t={channel:U,v:N,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&Nn(e.error))return{channel:U,v:N,type:"result",id:e.id,ok:!1,error:e.error,code:Do(Nn(e.code)?e.code:void 0)};return null},Zn=(e)=>{let t=Ea(e);if(!t||t.channel!==U||t.v!==N)return null;if(t.type==="result")return Sa(t);if(!ma.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var Go=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),ha=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class k extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var Bo=()=>Promise.reject(new k("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Bt=()=>Promise.reject(new k("BAD_PATH",`File path must be 1 to ${Ut} characters without NUL or backslash.`)),Ht=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new k("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},v=(e)=>(e.value+=1,`oc-${e.value}`),er=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new k("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((l)=>l===t.parent),r=e.requestTimeoutMs??Bn,o=new Set,s=new Set,i=new Set,c=new Set,f=new Set,_=new Set,p=new Set,S=new Set,m=new Set,d=new Set,T=new Set,O=new Set,b=[],y=null,g=null,M=new Set,P=new Set,D=null,de=null,ae=!1,z=new Map,ne=new Map,q=new Map,V=!1,E={value:0},h=null,_e=null,Te=!1,ge=!1,Ke=null,Ce=(l)=>{if(!l)return null;return{sessionId:l.id,phase:l.busy?"started":"completed"}},re=(l)=>{t.parent.postMessage(l,"*")},L=()=>{if(V||t.parent===t||O.size===0||h?.features?.lateGenerateResults!==!0)return;re({channel:U,v:N,type:"generate-late-listen"})},x=(l,u)=>{for(let R of l)try{R(u)}catch(I){console.error(I)}},me=(l)=>{if(!(l instanceof MessageEvent))return;if(!n(l.source))return;let u=Zn(l.data);if(!u)return;if(u.type==="workspace"){let I=ne.get(u.payload.subscriptionId);if(I)x([I],u.payload.snapshot);return}if(u.type==="shells"){let I=q.get(u.payload.subscriptionId);if(I)x([I],u.payload.snapshot);return}if(u.type==="ready"){if(h=u.payload,_e=Ce(u.payload.session),x(o,u.payload),x(s,u.payload.directory),x(i,u.payload.session),_e)x(c,_e);if(x(f,u.payload.connection),x(_,u.payload.settings),x(p,u.payload.item),u.payload.block)x(S,u.payload.block);L();return}if(u.type==="service-event"){x(m,u.payload);return}if(u.type==="generate-late"){if(O.size===0)b.push(u.payload);else x(O,u.payload);return}if(u.type==="directory"){if(h)h={...h,directory:u.payload.directory};x(s,u.payload.directory);return}if(u.type==="session"){if(h)h={...h,session:u.payload.session};if(!u.payload.session)_e=null;else if(_e?.sessionId!==u.payload.session.id)_e=Ce(u.payload.session);x(i,u.payload.session);return}if(u.type==="session-lifecycle"){_e=u.payload,x(c,u.payload);return}if(u.type==="connection"){if(h)h={...h,connection:u.payload.connection};x(f,u.payload.connection);return}if(u.type==="settings"){if(h)h={...h,settings:u.payload.settings};x(_,u.payload.settings);return}if(u.type==="item"){if(h)h={...h,item:u.payload.item};x(p,u.payload.item);return}if(u.type==="status-control-event"){x(d,u.payload);return}if(u.type==="popover-closed"){x(T,u.payload);return}if(u.type==="action"){let I=(X)=>{if(!V)re({channel:U,v:N,type:"action-result",id:u.id,payload:X})},W=g;if(!W){I({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>W(u.payload)).then(()=>I({ok:!0}),(X)=>{let ee=(X instanceof Error?X.message:String(X)).trim();I({ok:!1,error:(ee||"Action failed.").slice(0,ct)})});return}if(u.type==="file-open"){let I=u.payload;if(de&&Eo(de,I))return;de=I,x(M,u.payload);return}if(u.type==="file-saved"){x(P,u.payload.version);return}if(u.type==="file-snapshot"){let I=(ee)=>{if(!V)re({channel:U,v:N,type:"file-snapshot-result",id:u.id,payload:ee})},W=(ee)=>I({error:(ee.trim()||"Could not read the edited file.").slice(0,ct)}),X=D;if(!X){W("This extension does not edit files.");return}Promise.resolve().then(()=>X(u.payload.purpose)).then((ee)=>{if(Mn(ee)>wt){W(`The file is over ${wt} ${"bytes"in ee?"bytes":"characters"}.`);return}if(ee.version.length>vt){W(`The snapshot version is over ${vt} characters.`);return}I({snapshot:"bytes"in ee?{bytes:ee.bytes,version:ee.version}:{content:ee.content,version:ee.version}})},(ee)=>W(ee instanceof Error?ee.message:String(ee)));return}if(u.type==="resolve"){let I=(X)=>{re({channel:U,v:N,type:"resolve-result",id:u.id,payload:X})},W=y;if(!W){I({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>W(u.payload)).then((X)=>I({item:X?qe(X):null}),(X)=>{let ee=(X instanceof Error?X.message:String(X)).trim();I({error:(ee||"Command failed.").slice(0,ct)})});return}let R=z.get(u.id);if(!R)return;if(clearTimeout(R.timer),z.delete(u.id),u.ok){R.resolve(u.payload);return}R.reject(new k(u.code,u.error))};t.addEventListener("message",me),re({channel:U,v:N,type:"hello"});let Z=(l,u=r)=>{if(V||t.parent===t)return Promise.reject(new k("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((R,I)=>{let W=setTimeout(()=>{z.delete(l.id),I(new k("HOST_TIMEOUT","Host did not answer in time."))},u);z.set(l.id,{resolve:R,reject:I,timer:W}),re(l)})},F=(l)=>Z(l).then(()=>{return}),Y={channel:U,v:N},at=(l)=>{if(!V&&t.parent!==t)re(l)},eo=()=>at({...Y,type:"file-save"}),to=(l)=>{if(!Go(l)||!ha(l))return;l.preventDefault(),eo()},no=(l)=>{if(!Go(l)||l.key!=="Escape"||h?.surface!=="popover"||!h.popover)return;l.preventDefault(),io(h.popover.id,"escape").catch(()=>{return})},Rt=()=>{let l=h?.surface==="popover"?h.popover:void 0;if(!l)return;let u=Te||ge;if(Ke===u)return;Ke=u,ao(l.id,u).catch(()=>{return})},Ot=()=>{if(h?.surface!=="popover"||Te)return;Te=!0,Rt()},ro=(l)=>{if(h?.surface!=="popover"||l.relatedTarget!==null||!Te)return;Te=!1,Rt()},oo=()=>{if(h?.surface!=="popover"||ge)return;ge=!0,Rt()},so=()=>{if(h?.surface!=="popover"||!ge)return;ge=!1,Rt()},Oe=(l,u=1024)=>{if(!l.trim()||l.length>u)throw new k("HOST_REJECTED",`Identity must contain 1 to ${u} characters.`)},On=async(l)=>{if(l.kind!=="projects")Oe(l.projectId);let u=await Z({...Y,type:"workspace-read",id:v(E),payload:l});if(!u||!("kind"in u)||!("state"in u)||u.kind!==l.kind)throw new k("HOST_REJECTED","Host did not return workspace data.");return u},In=async(l,u)=>{if(l.kind!=="projects")Oe(l.projectId);let R=v(E);ne.set(R,u);try{await F({...Y,type:"workspace-subscribe",id:v(E),payload:{subscriptionId:R,query:l}})}catch(I){if(ne.delete(R),!V)re({...Y,type:"workspace-unsubscribe",id:v(E),payload:{subscriptionId:R}});throw I}return()=>{if(!ne.delete(R)||V)return;re({...Y,type:"workspace-unsubscribe",id:v(E),payload:{subscriptionId:R}})}},la=async(l,u)=>{if(l.kind==="session")Oe(l.sessionId);if(l.kind==="project")Oe(l.projectId);let R=v(E);q.set(R,u);try{await F({...Y,type:"shells-subscribe",id:v(E),payload:{subscriptionId:R,scope:l}})}catch(I){if(q.delete(R),!V)re({...Y,type:"shells-unsubscribe",id:v(E),payload:{subscriptionId:R}});throw I}return()=>{if(!q.delete(R)||V)return;re({...Y,type:"shells-unsubscribe",id:v(E),payload:{subscriptionId:R}})}},It=async(l)=>{if("key"in l&&(l.key.length===0||l.key.length>Cn))throw new k("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!ze(l.value))throw new k("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>wn)throw new k("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&h?.features?.deviceStorage!==!0)throw new k("UNSUPPORTED","This host does not support device storage.");let u=await Z({...Y,type:"storage",id:v(E),payload:l});if(!u||!("storage"in u)||u.op!==l.op)throw new k("HOST_REJECTED","Host did not return storage data.");return u},io=(l,u)=>h?.features?.popovers!==!0&&!(h?.surface==="popover"&&h.popover?.id===l)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):F({...Y,type:"popover-close",id:v(E),payload:u?{id:l,reason:u}:{id:l}}),ao=(l,u)=>h?.features?.popovers!==!0&&!(h?.surface==="popover"&&h.popover?.id===l)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):F({...Y,type:"popover-anchor",id:v(E),payload:{id:l,active:u}});return t.addEventListener("keydown",no,!0),t.addEventListener("pointerover",Ot),t.addEventListener("pointermove",Ot),t.addEventListener("pointerout",ro),t.addEventListener("focus",oo),t.addEventListener("blur",so),{onAction:(l)=>(g=l,()=>{if(g===l)g=null}),listProjects:async()=>{let l=await On({kind:"projects"});if(l.kind!=="projects")throw new k("HOST_REJECTED","Expected projects.");return l},listWorktrees:async(l)=>{let u=await On({kind:"worktrees",projectId:l});if(u.kind!=="worktrees")throw new k("HOST_REJECTED","Expected worktrees.");return u},listSessions:async(l)=>{let u=await On({kind:"sessions",projectId:l});if(u.kind!=="sessions")throw new k("HOST_REJECTED","Expected sessions.");return u},onProjects:(l)=>In({kind:"projects"},(u)=>{if(u.kind==="projects")l(u)}),onWorktrees:(l,u)=>In({kind:"worktrees",projectId:l},(R)=>{if(R.kind==="worktrees")u(R)}),onSessions:(l,u)=>In({kind:"sessions",projectId:l},(R)=>{if(R.kind==="sessions")u(R)}),onRunningShells:(l,u)=>la(l,u),readShellOutput:async(l,u)=>{Oe(l,bt);let R=u?.cursor;if(R!==void 0&&(!Number.isInteger(R)||R<0))throw new k("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let I=u?.tailBytes;if(I!==void 0&&(!Number.isInteger(I)||I<1||I>kt))throw new k("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${kt}.`);let X=await Z({...Y,type:"shell-output",id:v(E),payload:{shellId:l,cursor:R,tailBytes:I}});if(!X||typeof X.output!=="string"||!Number.isFinite(X.cursor))throw new k("HOST_REJECTED","Host did not return shell output.");return X},stopShell:async(l)=>{if(Oe(l,bt),(await Z({...Y,type:"shell-stop",id:v(E),payload:{shellId:l}}))?.stopped!==!0)throw new k("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(l)=>{Oe(l),await F({...Y,type:"open-session",id:v(E),payload:{sessionId:l}})},storage:{get:async(l,u)=>{let R=Ht(u),I={op:"get",key:l};if(R)I.scope=R;let W=await It(I);return W.op==="get"&&W.found?W.value:void 0},set:async(l,u,R)=>{let I=Ht(R),W={op:"set",key:l,value:u};if(I)W.scope=I;await It(W)},delete:async(l,u)=>{let R=Ht(u),I={op:"delete",key:l};if(R)I.scope=R;await It(I)},keys:async(l)=>{let u=Ht(l),R={op:"keys"};if(u)R.scope=u;let I=await It(R);if(I.op!=="keys")throw new k("HOST_REJECTED","Expected storage keys.");return I.keys}},onReady:(l)=>{if(o.add(l),h)l(h);return()=>{o.delete(l)}},onDirectory:(l)=>{if(s.add(l),h)l(h.directory);return()=>{s.delete(l)}},onSession:(l)=>{if(i.add(l),h)l(h.session);return()=>{i.delete(l)}},onSessionLifecycle:(l)=>{if(c.add(l),_e)l(_e);return()=>{c.delete(l)}},onConnection:(l)=>{if(f.add(l),h)l(h.connection);return()=>{f.delete(l)}},onSettings:(l)=>{if(_.add(l),h)l(h.settings);return()=>{_.delete(l)}},onItem:(l)=>{if(p.add(l),h)l(h.item);return()=>{p.delete(l)}},onBlock:(l)=>{if(S.add(l),h?.block)l(h.block);return()=>{S.delete(l)}},onServiceEvent:(l)=>(m.add(l),()=>{m.delete(l)}),onStatusControl:(l)=>(d.add(l),()=>{d.delete(l)}),onPopoverClosed:(l)=>(T.add(l),()=>{T.delete(l)}),setStatusControls:(l)=>{if(h?.features?.statusControls!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support status controls."));if(!fo(l))return Promise.reject(new k("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return F({...Y,type:"status-controls",id:v(E),payload:{controls:l}})},openPopover:(l)=>{if(h?.features?.popovers!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support popovers."));if(!Un(l))return Promise.reject(new k("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return F({...Y,type:"popover-open",id:v(E),payload:l})},closePopover:io,setPopoverAnchorActive:ao,onResolve:(l)=>(y=l,()=>{if(y===l)y=null}),toast:(l)=>{let u=l.message.trim();if(!u||u.length>Mt)return Promise.reject(new k("HOST_REJECTED",`Toast message must contain 1 to ${Mt} characters.`));if(l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>Pt))return Promise.reject(new k("HOST_REJECTED",`Toast copy text must contain 1 to ${Pt} characters.`));return F({channel:U,v:N,type:"toast",id:v(E),payload:{...l,message:u}})},openUrl:(l)=>F({channel:U,v:N,type:"open-url",id:v(E),payload:{url:l}}),openCommit:(l)=>Gn(l)?F({channel:U,v:N,type:"open-commit",id:v(E),payload:{sha:l}}):Promise.reject(new k("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(l)=>F({channel:U,v:N,type:"block-answer",id:v(E),payload:{text:l.trim().slice(0,Ln)}}),openSurface:(l)=>F({channel:U,v:N,type:"open-surface",id:v(E),payload:{surfaceId:l}}),writeClipboard:(l)=>F({channel:U,v:N,type:"clipboard-write",id:v(E),payload:{text:l}}),compose:(l)=>F({channel:U,v:N,type:"compose",id:v(E),payload:l}),attach:(l)=>F({channel:U,v:N,type:"attach",id:v(E),payload:qe(l)}),startSession:async(l)=>{if(l.projectId!==void 0)Oe(l.projectId);let u=l.worktree;if(u&&u!==!0)if(u.kind==="existing")Oe(u.directory);else{if(u.name!==void 0)Oe(u.name,200);if(u.baseBranch!==void 0)Oe(u.baseBranch,200)}let R=await Z({channel:U,v:N,type:"start-session",id:v(E),payload:Fn(l)},e.requestTimeoutMs??180000);if(!Dn(R))throw new k("HOST_REJECTED","Host did not return a session.");return R},prompt:(l)=>Z({channel:U,v:N,type:"prompt",id:v(E),payload:Xn(l)}).then((u)=>{if(!$n(u))throw new k("HOST_REJECTED","Host did not return a prompt result.");return u}),sessionLink:(l)=>F({channel:U,v:N,type:"session-link",id:v(E),payload:qe(l)}),close:()=>F({channel:U,v:N,type:"close",id:v(E)}),oauthStart:()=>F({channel:U,v:N,type:"oauth-start",id:v(E)}),oauthDisconnect:()=>F({channel:U,v:N,type:"oauth-disconnect",id:v(E)}),request:(l)=>($t(l.path)?Z({channel:U,v:N,type:"request",id:v(E),payload:l}):Bo()).then((u)=>{if(!Gt(u))throw new k("HOST_REJECTED","Host request result was empty.");return u}),serviceRequest:(l)=>($t(l.path)?Z({channel:U,v:N,type:"service-request",id:v(E),payload:l}):Bo()).then((u)=>{if(!Gt(u))throw new k("HOST_REJECTED","Host service request result was empty.");return u}),serviceStatus:()=>Z({channel:U,v:N,type:"service-status",id:v(E)}).then((l)=>{if(!Kn(l))throw new k("HOST_REJECTED","Host did not return service status.");return l}),readFile:(l)=>(Ye(l)?Z({channel:U,v:N,type:"file-read",id:v(E),payload:{path:l}}):Bt()).then((u)=>{if(!zn(u))throw new k("HOST_REJECTED","Host did not return file content.");return u}),writeFile:(l,u)=>{if(!Ye(l))return Bt();if(u.length>Nt)return Promise.reject(new k("FILE_TOO_LARGE",`Content is over ${Nt} characters.`));return Z({channel:U,v:N,type:"file-write",id:v(E),payload:{path:l,content:u}}).then((R)=>{if(!qn(R))throw new k("HOST_REJECTED","Host did not confirm the write.");return R})},listDir:(l)=>(Ye(l)?Z({channel:U,v:N,type:"file-list",id:v(E),payload:{path:l}}):Bt()).then((u)=>{if(!Yn(u))throw new k("HOST_REJECTED","Host did not return directory entries.");return u}),stat:(l)=>(Ye(l)?Z({channel:U,v:N,type:"file-stat",id:v(E),payload:{path:l}}):Bt()).then((u)=>{if(!Jn(u))throw new k("HOST_REJECTED","Host did not return file status.");return u}),generate:(l)=>{let u=l.prompt.trim(),R=l.system?.trim();if(u.length===0||u.length>Lt)return Promise.reject(new k("HOST_REJECTED",`Prompt must be 1 to ${Lt} characters.`));if(R!==void 0&&(R.length===0||R.length>Dt))return Promise.reject(new k("HOST_REJECTED",`System prompt must be 1 to ${Dt} characters.`));let I=l.maxOutputTokens===void 0?void 0:Math.min(Hn,Math.max(1,Math.floor(l.maxOutputTokens)));if(I!==void 0&&!Number.isFinite(I))return Promise.reject(new k("HOST_REJECTED","maxOutputTokens must be a number."));let W={prompt:u};if(R!==void 0)W.system=R;if(I!==void 0)W.maxOutputTokens=I;return Z({channel:U,v:N,type:"generate",id:v(E),payload:W},e.requestTimeoutMs??Vn).then((X)=>{if(!Qn(X))throw new k("HOST_REJECTED","Host did not return generated text.");return X})},onLateGenerateResult:(l)=>{O.add(l);for(let u of b.splice(0))x([l],u);return L(),()=>{O.delete(l)}},setBadge:(l)=>F({channel:U,v:N,type:"badge",id:v(E),payload:{count:jn(l)}}),setHeight:(l)=>F({channel:U,v:N,type:"resize",id:v(E),payload:{height:Wn(l)}}),onFileOpen:(l)=>{if(M.add(l),!ae)ae=!0,t.addEventListener("keydown",to,!0);if(de)l(de);return()=>{M.delete(l)}},onFileSnapshot:(l)=>(D=l,()=>{if(D===l)D=null}),onFileSaved:(l)=>(P.add(l),()=>{P.delete(l)}),reportFileChange:(l)=>at({...Y,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:eo,reportFileUnsupported:()=>at({...Y,type:"file-unsupported"}),dispose:()=>{for(let l of ne.keys())re({...Y,type:"workspace-unsubscribe",id:v(E),payload:{subscriptionId:l}});ne.clear();for(let l of q.keys())re({...Y,type:"shells-unsubscribe",id:v(E),payload:{subscriptionId:l}});if(q.clear(),V=!0,y=null,g=null,D=null,M.clear(),P.clear(),ae)t.removeEventListener("keydown",to,!0);t.removeEventListener("message",me),t.removeEventListener("keydown",no,!0),t.removeEventListener("pointerover",Ot),t.removeEventListener("pointermove",Ot),t.removeEventListener("pointerout",ro),t.removeEventListener("focus",oo),t.removeEventListener("blur",so);for(let l of z.values())clearTimeout(l.timer),l.reject(new k("HOST_UNAVAILABLE","Host client was disposed."));z.clear(),o.clear(),s.clear(),i.clear(),c.clear(),f.clear(),_.clear(),p.clear(),S.clear(),m.clear(),d.clear(),T.clear(),O.clear(),b.length=0}}};var Ho=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var tl=new Set(Ho);var Vo=["none","agent","user"];var rl=new Set(Vo);var G,jo,Ta,De,tr,Kt,Wo,Ft,Ko,rr,nr,ga,lt=Symbol.for("pv"),zt={},qt=[],ya=/^m(i|n|o|s|text|space)$/,or=Array.isArray,zo=qt.slice,Fe=Object.assign;function Ve(e){e&&e.parentNode&&e.remove()}function Xt(e,t,n,r,o){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:lt,__v:o||++jo,__i:-1,__u:0};return!o&&G.vnode&&G.vnode(s),s}function xe(e){return e.children}function jt(e,t){this.props=e,this.context=t,this.__g=0}function $e(e,t){if(t==null)return e.__&&$e(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:$e(e)}function Aa(e){var t,n=e.__v,r=n.__e,o=[],s=[],i=e.__P;i&&((t=Fe({constructor:lt},n)).__v=n.__v+1,G.vnode&&G.vnode(t),sr(i,t,n,e.__n,i.namespaceURI,32&n.__u?[r]:null,o,r||$e(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,es(o,t,s),n.__=n.__e=null,t.__e!=r&&qo(t))}function qo(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),qo(e)}function Fo(e){(8&e.__g||(e.__g|=8,De.push(e),Kt++))&&tr==G.debounceRendering||((tr=G.debounceRendering)||queueMicrotask)(Yo)}function Yo(){try{for(var e,t=1;De.length;)De.length>t&&De.sort(Wo),e=De.shift(),t=De.length,8&e.__g&&Aa(e)}finally{(Kt=De.length)&&(tr||queueMicrotask)(Yo)}}function Jo(e,t,n,r,o,s,i,c,f,_,p){var S,m,d,T,O,b,y=r.__k||qt,g=t.length;for(f=xa(n,t,y,f,g),S=0;S<g;S++)(d=n.__k[S])!=null&&(m=~d.__i&&y[d.__i]||zt,d.__i=S,b=sr(e,d,m,o,s,i,c,f,_,p),T=d.__e,(m.ref!=d.ref||8&m.__u)&&(m.ref&&ir(m.ref,null,d,m),d.ref&&p.push(d.ref,d.__c||T,d)),O=O||T,4&d.__u?(f=Qo(d,f,e,!m.__v),m.__e&&(m.__e=null)):typeof d.type=="function"&&b!==void 0?f=b:T&&(f=T.nextSibling),d.__u&=-21);return n.__e=O,f}function xa(e,t,n,r,o){var s,i,c,f,_,p,S,m,d,T=n.length,O=T,b=0,y=0,g=e.__k=Array(o);for(s=0;s<o;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=g[s]=Xt(null,i):or(i)?i=g[s]=Xt(xe,{children:i}):i.constructor===lt&&i.__b?i=g[s]=Xt(i.type,i.props,i.key,i.ref,i.__v):g[s]=i,f=s+b,i.__=e,i.__b=e.__b+1,c=null,~(_=i.__i=Ra(i,n,f,O))&&(O--,(c=n[_])&&(c.__u|=2)),c&&c.__v?(i.__u|=16,_==f-1?b--:_==f+1?b++:_!=f&&(_>f?b--:b++,y=1)):(~_||(o>T?b--:o<T&&b++),typeof i.type!="function"&&(i.__u|=4))):g[s]=null;if(y){for(p=[],S=[],s=0;s<o;s++)if((i=g[s])&&16&i.__u){for(b=0,m=p.length;b<m;)p[d=b+m>>1]<i.__i?b=d+1:m=d;p[b]=i.__i,S[s]=b+1}for(b=p.length;s--;)S[s]&&(S[s]==b?b--:g[s].__u|=4)}if(O)for(s=0;s<T;s++)!(c=n[s])||2&c.__u||(c.__e==r&&(r=$e(c)),ar(c,c));return r}function Qo(e,t,n,r){var o,s,i,c;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=Qo(o[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=$e(e))&&!t.parentNode&&(t=null),i=e.__e,c=t;c&&c.nodeType==8;)c=c.nextSibling;for(i!=c&&(!r&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function Ra(e,t,n,r){var o,{key:s,type:i}=e,c=t[n],f=c&&!(2&c.__u);if(c===null&&s==null||f&&s==c.key&&i==c.type)return n;if(r>(f?1:0)){for(o=n-1;o>=0;o--)if((c=t[o])&&!(2&c.__u)&&s==c.key&&i==c.type)return o;for(o=n+1;o<t.length;o++)if((c=t[o])&&!(2&c.__u)&&s==c.key&&i==c.type)return o}return-1}function Xo(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function Vt(e,t,n,r,o){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Xo(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||Xo(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof r!="function"&&(r=null),(e.__e||(e.__e={}))[t]=n,n&&r||(i=nr[t]||(nr[t]=Oa(t)),(e.__a||(e.__a={}))[t]=rr,s=t!=(t=t.replace(Ko,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(c){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function Oa(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[Ft]==null)t[Ft]=rr++;else if(t[Ft]<this.__a[e])return;return n(G.event?G.event(t):t)}}}function sr(e,t,n,r,o,s,i,c,f,_){var p,S,m,d,T,O,b,y,g,M,P,D,de,ae,z,ne,q,V,E=t.type;if(t.constructor!==lt)return null;128&n.__u&&(f=32&n.__u,p=n.__c.__z)&&(t.__u|=f,S=s=[],p.nodeType==8?c=Wt(p,s):s.push(p),c=s[0]||c),(p=G.__b)&&p(t);e:if(typeof E=="function"){m=i.length;try{if(y=t.props,g=(p=E.prototype)&&p.render,M=(p=E.contextType)&&r[p.__c],P=p?M?M.props.value:p.__:r,(d=n.__c)?(t.__c=d,2&d.__g&&(d.__g|=1)):(g?t.__c=d=new E(y,P):(t.__c=d=new jt(y,P),d.constructor=E,d.render=ba),M&&M.sub(d),d.state||(d.state={}),d.__n=r,d.__g|=8,d.__h=[],d.__k=[]),g&&(d.__s||(d.__s=d.state),E.getDerivedStateFromProps&&(d.__s==d.state&&(d.__s=Fe({},d.__s)),Fe(d.__s,E.getDerivedStateFromProps(y,d.__s)))),T=d.props,O=d.state,d.__v=t,n.__c){if(y!==T&&g&&!E.getDerivedStateFromProps&&d.componentWillReceiveProps&&d.componentWillReceiveProps(y,P),t.__v==n.__v&&!(8&d.__g)||!(4&d.__g)&&d.shouldComponentUpdate&&d.shouldComponentUpdate(y,d.__s,P)===!1){t.__v!=n.__v&&(d.props=y,d.state=d.__s,d.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(h){h&&(h.__=t)}),qt.push.apply(d.__h,d.__k),d.__k=[],d.__h.length&&i.push(d),c=$e(n);break e}d.componentWillUpdate&&d.componentWillUpdate(y,d.__s,P),g&&d.componentDidUpdate&&d.__h.push(function(){d.componentDidUpdate(T,O,b)})}else g&&!E.getDerivedStateFromProps&&d.componentWillMount&&d.componentWillMount(),g&&d.componentDidMount&&d.__h.push(d.componentDidMount);d.context=P,d.props=y,d.__P=e,d.__g&=-5,D=G.__r,de=g?25:0;do d.__g&=-9,D&&D(t),p=d.render(d.props,d.state=d.__s,d.context);while(8&d.__g&&++de<25);g&&(qt.push.apply(d.__h,d.__k),d.__k=[]),d.state=d.__s,d.getChildContext&&(r=Fe({},r,d.getChildContext())),g&&n.__c&&d.getSnapshotBeforeUpdate&&(b=d.getSnapshotBeforeUpdate(T,O)),ae=p&&p.type===xe&&p.key==null?p.props.children:p,y.__P&&(p=c,o=(e=y.__P).namespaceURI,f=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(h){h&&ar(h,h)}),n.__k=null),c=n.__k?$e(n,0):null),c=Jo(e,or(ae)?ae:[ae],t,n,r,o,s,i,c,f,_),y.__P&&(t.__e=null,c=p),t.__u&=-161,S&&S.some(Ve),d.__h.length&&i.push(d),1&d.__g&&(d.__g&=-4)}catch(h){if(i.length=m,t.__v=null,f||s)if(h&&h.then){if(t.__u|=128|f,s){for(~(q=s.indexOf(c||void 0))||(q=s.length);(V=s[q-1])&&V.nodeType==8;)q--;for(;q<s.length;q++)if(V=s[q])if(s[q]=null,z){if(V==ne)break}else{if(V.nodeType!=8)break;V.data.startsWith("$s")&&(ne=Wt(z=V))}}if(!z){for(;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;z=c}(p=Wt(z=t.__c.__z||(t.__c.__z=z)))?(t.__e=z,c=p):t.__e=c,c=c&&c.nextSibling}else s&&s.some(Ve);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),h&&h.then||Zo(t),G.__e(h,t,n)}}else c=t.__e=Ia(n.__e,t,n,r,o,s,i,f,_,e);return(p=G.diffed)&&p(t),c}function Wt(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function Zo(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(Zo))}function es(e,t,n){for(var r=0;r<n.length;)ir(n[r++],n[r++],n[r++]);G.__c&&G.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){G.__e(s,o.__v)}})}function Ia(e,t,n,r,o,s,i,c,f,_){var p,S,m,d,T,O,b,y,g=n.props||zt,{props:M,type:P}=t;if(P=="svg"?o="http://www.w3.org/2000/svg":P=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((T=s[p])&&(P?T.localName==P:T.nodeType==3)){e=T,s[p]=null;break}}if(!e){if(y=_.ownerDocument||document,!P)return y.createTextNode(M);e=y.createElementNS(o,P,M.is?M:_),c&&(G.__m&&G.__m(t,s),c=!1),s=null}if(P){if(_=P=="template"&&e.content||e,s=P=="textarea"&&M.defaultValue!=null?null:s&&zo.call(_.childNodes),!c&&s)for(g={},p=0;p<e.attributes.length;p++)g[(T=e.attributes[p]).name]=T.value;for(p in g)T=g[p],p=="dangerouslySetInnerHTML"?m=T:p=="children"||(p in M)||p=="value"&&("defaultValue"in M)||p=="checked"&&("defaultChecked"in M)||Vt(e,p,null,T,o);for(p in M)T=M[p],p=="children"?d=T:p=="dangerouslySetInnerHTML"?S=T:p=="value"?O=T:p=="checked"?b=T:c&&typeof T!="function"||g[p]===T||Vt(e,p,T,g[p],o);S?(c||m&&(S.__html==m.__html||S.__html==e.innerHTML)||(e.innerHTML=S.__html),t.__k=[]):(m&&(e.textContent=""),(P=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&ya.test(P))&&(o="http://www.w3.org/1999/xhtml"),Jo(_,or(d)?d:[d],t,n,r,o,s,i,s?s[0]:n.__k&&$e(n,0),c,f),s&&s.some(Ve)),c&&P!="textarea"||(p="value",P=="progress"&&O==null?e.removeAttribute(p):O==null||O===e[p]&&(P!="progress"||O)||Vt(e,p,O,g[p],o),p="checked",b!=null&&b!=e[p]&&Vt(e,p,b,g[p],o))}else g===M||c&&e.data==M||(e.data=M);return e}function ir(e,t,n,r){try{typeof e=="function"?t?t.__x=e(t)||1:r&&(r=r.__c||r.__e)&&(t=r.__x)&&(r.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){G.__e(o,n)}}function ar(e,t,n){var r,o,s,i;if(G.unmount&&G.unmount(e),!(r=e.ref)||r.current&&r.current!=e.__e||ir(r,null,t,e),r=e.__c){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(c){G.__e(c,t)}r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&ar(r[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(r=e.__c)&&(r=r.__z)&&(o=Wt(r,s=[]))&&(r==e.__e&&s.some(Ve),Ve(o),Ve(r)),n||Ve(e.__e),e.__e=e.__c=e.__=null}function ba(e,t,n){return this.constructor(e,n)}function ts(e,t){var n,r,o,s;G.__&&G.__(e,t),t.nodeType==9&&(t=t.documentElement),r=(n=e&&32&e.__u)?null:t.__k,t.__k=Xt(xe,{children:[e]}),o=[],s=[],sr(t,t.__k,r||zt,zt,t.namespaceURI,r?null:t.firstChild?zo.call(t.childNodes):null,o,r?r.__e:t.firstChild,n,s),es(o,t.__k,s),t.__k.props.children=null}G={__e:function(e,t,n,r){for(var o,s,i;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((i=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,r||{}),i=1),i&&8&o.__g)return void(o.__g|=2)}catch(c){e=c}}throw Kt=0,e}},jo=0,Ta=function(e){return e!=null&&e.constructor===lt},jt.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=Fe({},this.state)),typeof e=="function"&&(e=e(Fe({},n),this.props)),e&&(Fe(n,e),this.__v&&(t&&this.__k.push(t),Fo(this)))},jt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Fo(this))},jt.prototype.render=xe,De=[],Kt=0,Wo=function(e,t){return e.__v.__b-t.__v.__b},Ft=Symbol(),Ko=/(PointerCapture)$|Capture$/i,rr=0,nr={},ga=0;var ut,oe,cr,ns,lr=Object.is,Yt=0,us=[],dr=[],te=G,{__b:rs,__r:os,diffed:ss,__c:is,unmount:as,__:cs}=te;function pr(e,t){te.__h&&te.__h(oe,e,Yt||t),Yt=0;var n=oe.__H||(oe.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function C(e){return Yt=1,ka(fs,e)}function ka(e,t,n){var r=pr(ut++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):fs(void 0,t),function(s){var i=(r.__N||r.__)[0],c=r.t(i,s);lr(i,c)||(r.__N=[c,r.__[1]],r.__c.setState({}))}],r.__c=oe,!oe.__f)){oe.__f=!0;var o=oe.shouldComponentUpdate;oe.shouldComponentUpdate=function(s,i,c){var f=this.__H;if(!f)return!0;var _=!1,p=this.props!=s;if(f.__.some(function(m){m.__N&&(_=!0,lr(m.__[0],m.__N[0])||(p=!0))}),o){var S=o.call(this,s,i,c);return _?S||p:S}return!_||p}}return r.__}function ue(e,t){var n=pr(ut++,3);!te.__s&&ps(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,oe.__H.__h.push(n))}function Ge(e){return Yt=5,pt(function(){return{current:e}},[])}function pt(e,t){var n=pr(ut++,7);return ps(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function Ca(){var e;do{for(;e=dr.shift();)try{dt(e)}catch(n){te.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=us.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(dt),t.__h.some(ur),t.__h=[]}catch(n){t.__h=[],te.__e(n,e.__v)}}}while(dr.length)}te.__b=function(e){oe=null,rs&&rs(e)},te.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),cs&&cs(e,t)},te.__r=function(e){os&&os(e),ut=0;var t=(oe=e.__c).__H;t&&(cr==oe?oe.__h=[]:(t.__h.some(dt),t.__h.some(ur),ut=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),cr=oe},te.diffed=function(e){ss&&ss(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&ds(us.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),cr=oe=null},te.__c=function(e,t){t.some(function(n){try{n.__h.some(dt),n.__h=n.__h.filter(function(r){return!r.__||ur(r)})}catch(r){n.__h=[function(){throw r}]}}),is&&is(e,t)},te.unmount=function(e){as&&as(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{if(o.__P&&o.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}o.__P=n,ds(dr.push(o))}else dt(o)}catch(s){t=s}}),r.__H=void 0,t&&te.__e(t,r.__v))};var ls=typeof requestAnimationFrame=="function";function wa(e){var t,n=function(){clearTimeout(r),ls&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);ls&&(t=requestAnimationFrame(n))}function ds(e){e!=1&&ns==te.requestAnimationFrame||((ns=te.requestAnimationFrame)||wa)(Ca)}function dt(e){var t=oe,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),oe=t}function ur(e){var t=oe;e.__c=e.__(),oe=t}function ps(e,t){return!e||e.length!=t.length||t.some(function(n,r){return!lr(n,e[r])})}function fs(e,t){return typeof t=="function"?t(e):t}var va=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ma=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],_s=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of va)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of Ma){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},fr=(e,t)=>{if(_s(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var Pa={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},K=(e,t)=>`var(--${e}, var(--oc-${Pa[e]}, ${t}))`,Me=K("surface-background","transparent"),Qt=K("surface-elevated","transparent"),Je=K("surface-elevated-foreground","inherit"),ye=K("surface-foreground","inherit"),J=K("surface-muted-foreground","gray"),Ua=K("surface-muted","transparent"),Xe=K("interactive-border","currentColor"),Ee=K("interactive-hover","transparent"),je=K("interactive-active","transparent"),_r=K("interactive-selection","transparent"),mr=K("interactive-selection-foreground","inherit"),ve=K("primary","currentColor"),Er=K("primary-text","inherit"),Sr=K("error-text","inherit"),Na=K("font-sans","inherit"),hr=K("font-mono","monospace"),hs=K("radius","9px"),Tr=`calc(${hs} - 2px)`,ms=`calc(${hs} - 4px)`,Q=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,Es=`background-image: linear-gradient(${Ee}, ${Ee});`,gr=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,yr="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",Ss="box-shadow: var(--oc-sdk-lit);",Ar=`inset 0 0.5px 0 0 ${Q(ye,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,La=`
:root {
  --oc-sdk-edge: ${Q(ye,16)};
  --oc-sdk-field-bg: ${Qt};
  --oc-sdk-raised-bg: ${Me};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Q(ye,14)};
  --oc-sdk-field-bg: ${Q(Me,50,Qt)};
  --oc-sdk-raised-bg: ${Qt};
  --oc-sdk-field-lift: ${Ar};
  --oc-sdk-raised-lift: ${Ar};
  --oc-sdk-lit: ${Ar};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,Jt=(e)=>{let t=K(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${K(`${e}-text`,"inherit")}; }`},Da=`
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
`,Ts=`${La}
.oc-sdk { color: ${ye}; font-family: ${Na}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${Es} }
.oc-sdk-mono { font-family: ${hr}; }
.oc-sdk-muted { color: ${J}; }
${Jt("success")}${Jt("warning")}${Jt("error")}${Jt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ve}; --oc-sdk-tone-text: ${Er}; }

.oc-sdk-btn { border-radius: ${Tr}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${ms}; }
.oc-sdk-btn[data-variant="default"] { color: ${Er}; background: ${Q(ve,10,Me)}; border-color: ${Q(ve,12)}; ${Ss} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Q(ve,16,Me)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Q(ve,22,Me)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${Ua}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${je}, ${je}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${Je}; ${yr} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${je}, ${je}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${Ee}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${je}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${K("status-error","red")}; color: ${Sr}; background: ${Q("var(--oc-sdk-tone)",7,Me)}; border-color: ${Q("var(--oc-sdk-tone)",12)}; ${Ss} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Q("var(--oc-sdk-tone)",9,Me)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Q("var(--oc-sdk-tone)",11,Me)}; box-shadow: none; }

.oc-sdk-field-note { color: ${J}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${Sr}; }
.oc-sdk-input { border-radius: ${Tr}; background: var(--oc-sdk-field-bg); color: ${Je}; ${gr("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${J}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${gr(Q(ye,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${gr(K("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${hr}; }

.oc-sdk-search-icon { color: ${J}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ve}; }
.oc-sdk-search-clear { border-radius: ${ms}; color: ${J}; }
.oc-sdk-search-clear:hover { background: ${Ee}; color: ${ye}; }

.oc-sdk-trigger { border-radius: ${Tr}; background: var(--oc-sdk-raised-bg); color: ${Je}; ${yr} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${Ee}, ${Ee}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${je}, ${je}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${J}; }
.oc-sdk-trigger-chevron { color: ${J}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${Je}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${Qt}; background-clip: padding-box; color: ${Je}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${Ee}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${_r}; color: ${mr}; }
.oc-sdk-option-check { color: ${ye}; }
.oc-sdk-option[data-destructive="true"] { color: ${Sr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Q(K("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${J}; }
.oc-sdk-popup-empty { color: ${J}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Xe}; border-radius: 4px; color: ${ye}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Q(ye,60,Xe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Xe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${Me}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ve}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${Es} }
.oc-sdk-check-desc { color: ${J}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Q(ye,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${J}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${ye}; }
.oc-sdk-tab[aria-selected="true"] { color: ${mr}; background: ${_r}; border-color: ${Xe}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${Je}; background: var(--oc-sdk-raised-bg); ${yr} }
.oc-sdk-tab-count { color: ${J}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Q(ye,6)}; color: ${J}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Q("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${Ee}; }
.oc-sdk-row[aria-selected="true"] { background: ${_r}; color: ${mr}; }
.oc-sdk-row-lead { font-family: ${hr}; color: ${J}; }
.oc-sdk-row-sub { color: ${J}; }
.oc-sdk-row-meta { color: ${J}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${J}; }

.oc-sdk-empty-body { color: ${J}; }

.oc-sdk-spinner { color: ${J}; }
.oc-sdk-spinner-ring { border-color: ${Xe}; border-top-color: ${ve}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Q("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${J}; }

.oc-sdk-separator { color: ${J}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Q(Xe,40)}; }

.oc-sdk-progress-label { color: ${J}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Q(ye,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ve}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${K("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${K("success-text","inherit")}; }

.oc-sdk-text a { color: ${Er}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Q(Xe,60)}; }
`,B=`
${bn}
${Da}
${Ts}`;var gs="oc-sdk-ui-style",Pe=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},H=(e)=>{let t=document.getElementById(gs);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}kn(document);let n=document.createElement("style");n.id=gs,n.textContent=e,document.head.appendChild(n)},A=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},Se=(e)=>{let t=A("button",e);return t.type="button",t},j=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},Ae=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},ys=(e,t)=>{let n=(r)=>{if(r.target instanceof Node&&e.contains(r.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var $a=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ue=(e,t)=>{H(B);let n=t,r=Se("oc-sdk oc-sdk-btn"),o=$a(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{if(r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=Boolean(n.disabled)||Boolean(n.loading),r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r)r.prepend(o);else if(!n.loading&&o.parentNode===r)o.remove();j(s,n.label)},c=()=>{if(n.disabled||n.loading)return;n.onClick()};return r.addEventListener("click",c),i(),{update:(f)=>{n={...n,...f},i()},dispose:()=>{r.removeEventListener("click",c),r.remove()}}};var xr=(e,t)=>{H(B);let n=t,r=A("label","oc-sdk oc-sdk-field"),o=A("span","oc-sdk-field-label"),s=n.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),i=A("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let c=()=>{if(j(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),Ae(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let _=Boolean(n.error);r.dataset.invalid=_?"true":"false",s.setAttribute("aria-invalid",_?"true":"false");let p=n.error??n.helper??"";j(i,p),i.hidden=p===""},f=()=>{n.onChange(s.value)};return s.addEventListener("input",f),c(),{update:(_)=>{n={...n,..._},c()},dispose:()=>{s.removeEventListener("input",f),r.remove()}}};var Ga={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},Ie=(e,t,n)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n)r.setAttribute("class",n);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",Ga[e]),r.append(o),r};var Rr=(e,t)=>{H(B);let n=t,r=A("div","oc-sdk oc-sdk-search"),o=A("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Se("oc-sdk-search-clear");s.append(Ie("close",14)),s.tabIndex=-1,r.append(Ie("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let p=n.placeholder??"Search";if(Ae(o,"placeholder",p),o.setAttribute("aria-label",n.label??p),s.setAttribute("aria-label","Clear search"),o.value!==n.value)o.value=n.value;r.dataset.active=n.value.trim()===""?"false":"true"},c=()=>{if(n.value!=="")n.onChange("");o.focus()},f=()=>{n.onChange(o.value)},_=(p)=>{if(p.key==="Escape"&&o.value!=="")p.preventDefault(),c()};if(o.addEventListener("input",f),o.addEventListener("keydown",_),s.addEventListener("click",c),i(),n.autofocus)o.focus();return{update:(p)=>{n={...n,...p},i()},dispose:()=>{o.removeEventListener("input",f),o.removeEventListener("keydown",_),s.removeEventListener("click",c),r.remove()}}};var we=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Ne=(e,t,n)=>{let r=e.filter((f)=>!f.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex((f)=>f.id===t);if(i===-1)return n==="next"?o.id:s.id;return r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var As=(e,t)=>`${e}-${t??""}`,Zt=(e,t,n,r)=>{let o=Se("oc-sdk-option");if(o.id=As(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(n.disabled),t==="option")o.setAttribute("aria-selected",n.selected?"true":"false");o.dataset.destructive=n.destructive?"true":"false";let s=A("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=A("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=A("span","oc-sdk-option-check");i.append(Ie("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},en=(e,t,n,r)=>{let o=As(n,r);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";Ae(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var Ba=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;if(r>o&&n.top-8>o)e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},tn=(e,t,n,r)=>{e.append(n),Ba(n,t);let o=ys(e,r),s=()=>{r()},i=(c)=>{if(c.target instanceof Node&&n.contains(c.target))return;r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var xs=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((r)=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n))},Ha=0,nn=(e,t)=>{H(B);let n=t,r=`oc-sdk-select-${Ha+=1}`,o=A("div","oc-sdk oc-sdk-select"),s=A("span","oc-sdk-field-label");s.id=`${r}-label`;let i=Se("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let c=A("span","oc-sdk-trigger-value");i.append(c,Ie("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let f="",_=null,p=null,S=A("div","oc-sdk oc-sdk-popup"),m=A("div","oc-sdk-popup-search"),d=A("input","oc-sdk-input");d.type="text",d.autocomplete="off",m.append(d);let T=A("div");T.setAttribute("role","listbox"),T.tabIndex=-1,S.append(T);let O=()=>xs(n.options,n.searchable?f:""),b=()=>n.searchable?d:T,y=(E)=>{_=E,en(T,b(),r,E)},g=()=>{Pe(T);let E=O();if(E.length===0){let h=A("div","oc-sdk-popup-empty");h.textContent="No matches",T.append(h)}for(let h of E)T.append(Zt(r,"option",{...h,selected:h.id===n.value},{hover:()=>y(h.id),pick:()=>D(h.id)}));y(E.some((h)=>h.id===_)?_:E[0]?.id??null)},M=()=>{let E=p;p=null,E?.(),f="",d.value="",i.setAttribute("aria-expanded","false")},P=()=>{if(p||n.disabled)return;if(_=n.value,d.placeholder=n.searchPlaceholder??"Search",n.searchable)S.prepend(m);else m.remove();g(),p=tn(o,i,S,M),i.setAttribute("aria-expanded","true"),b().focus()},D=(E)=>{if(M(),i.focus(),E!==n.value)n.onChange(E)},de=()=>{if(p)M();else P()},ae=(E)=>{if(!p&&we(E))E.preventDefault(),P()},z=(E)=>{let h=we(E);if(h)E.preventDefault(),y(Ne(O(),_,h));else if(E.key==="Enter"){if(E.preventDefault(),_)D(_)}else if(E.key==="Escape")E.preventDefault(),M(),i.focus();else if(n.searchable&&E.target!==d&&E.key.length===1&&!E.ctrlKey&&!E.metaKey)d.focus()},ne=()=>{f=d.value,g()},q=(E)=>{if(p&&!(E.relatedTarget instanceof Node&&o.contains(E.relatedTarget)))M()},V=()=>{j(s,n.label),s.hidden=!n.label;let E=n.options.find((h)=>h.id===n.value);if(j(c,E?.label??n.placeholder??"Select"),c.dataset.empty=E?"false":"true",i.disabled=Boolean(n.disabled),p)g()};return i.addEventListener("click",de),i.addEventListener("keydown",ae),S.addEventListener("keydown",z),d.addEventListener("input",ne),o.addEventListener("focusout",q),V(),{update:(E)=>{n={...n,...E},V()},dispose:()=>{M(),i.removeEventListener("click",de),i.removeEventListener("keydown",ae),S.removeEventListener("keydown",z),d.removeEventListener("input",ne),o.removeEventListener("focusout",q),o.remove()}}};var Rs=(e,t,n)=>{H(B);let r=t,o=Se("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=A("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(Ie("check",12));let i=A("span","oc-sdk-check-text"),c=A("span","oc-sdk-check-label"),f=A("span","oc-sdk-check-desc");i.append(c,f),o.append(s,i),e.append(o);let _=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=Boolean(r.disabled),j(c,r.label),j(f,r.description),f.hidden=!r.description},p=()=>{if(!r.disabled)r.onChange(!r.checked)};return o.addEventListener("click",p),_(),{update:(S)=>{r={...r,...S},_()},dispose:()=>{o.removeEventListener("click",p),o.remove()}}},Or=(e,t)=>Rs(e,t,"checkbox"),rn=(e,t)=>Rs(e,t,"switch");var Ir=(e,t)=>{H(B);let n=t,r=A("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Pe(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let c=Se("oc-sdk-tab");c.setAttribute("role","tab");let f=i.id===n.activeId;c.setAttribute("aria-selected",f?"true":"false"),c.tabIndex=f?0:-1,c.dataset.id=i.id;let _=A("span");if(_.textContent=i.label,c.append(_),i.count!==void 0){let p=A("span","oc-sdk-tab-count");p.textContent=String(i.count),c.append(p)}c.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),r.append(c)}},s=(i)=>{let c=we(i,"horizontal");if(!c)return;let f=Ne(n.items,n.activeId,c);if(f&&f!==n.activeId){i.preventDefault(),n.onChange(f);let _=r.querySelector(`[data-id="${CSS.escape(f)}"]`);if(_ instanceof HTMLElement)_.focus()}};return r.addEventListener("keydown",s),o(),{update:(i)=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var ft=(e,t)=>{Ae(e,"data-tone",t&&t!=="neutral"?t:null)},br=(e,t)=>{H(B);let n=t,r=A("span","oc-sdk oc-sdk-badge");e.append(r);let o=()=>{j(r,n.label),ft(r,n.tone)};return o(),{update:(s)=>{n={...n,...s},o()},dispose:()=>{r.remove()}}};var Va=0,kr=(e,t)=>{H(B);let n=t,r=`oc-sdk-list-${Va+=1}`,o=A("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,i=(S)=>`${r}-${S}`,c=(S)=>{s=S;for(let m of Array.from(o.children))if(m instanceof HTMLElement)m.dataset.active=m.id===i(S??"")?"true":"false";Ae(o,"aria-activedescendant",S?i(S):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},f=(S,m)=>{let d=A("span",S);return d.textContent=m,d},_=()=>{if(Pe(o),Ae(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(f("oc-sdk-list-empty",n.emptyText??"Nothing here")),c(null);return}for(let m of n.items){let d=Se("oc-sdk-row");if(d.id=i(m.id),d.setAttribute("role","option"),d.setAttribute("aria-selected",m.id===n.selectedId?"true":"false"),d.disabled=Boolean(m.disabled),d.tabIndex=-1,m.leading)d.append(f("oc-sdk-row-lead",m.leading));let T=A("span","oc-sdk-row-main");if(T.append(f("oc-sdk-row-title",m.title)),m.subtitle)T.append(f("oc-sdk-row-sub",m.subtitle));if(d.append(T),m.badge){let O=f("oc-sdk-badge",m.badge.label);ft(O,m.badge.tone),d.append(O)}if(m.meta)d.append(f("oc-sdk-row-meta",m.meta));d.addEventListener("click",()=>n.onSelect(m.id)),o.append(d)}let S=n.items.some((m)=>m.id===s&&!m.disabled);c(S?s:n.selectedId??null)},p=(S)=>{let m=we(S);if(m){S.preventDefault(),c(Ne(n.items,s,m));return}if((S.key==="Enter"||S.key===" ")&&s)S.preventDefault(),n.onSelect(s)};return o.addEventListener("keydown",p),_(),{update:(S)=>{n={...n,...S},_()},dispose:()=>{o.removeEventListener("keydown",p),o.remove()}}};var Cr=(e,t)=>{H(B);let n=t,r=A("div","oc-sdk oc-sdk-empty"),o=A("h2","oc-sdk-empty-title"),s=A("p","oc-sdk-empty-body"),i=A("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let c=null,f=()=>{if(j(o,n.title),j(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let _={label:n.action.label,onClick:n.action.onClick};if(c)c.update(_);else c=Ue(i,{..._,variant:"outline",size:"sm"})};return f(),{update:(_)=>{n={...n,..._},f()},dispose:()=>{c?.dispose(),c=null,r.remove()}}};var wr=(e,t={})=>{H(B);let n=t,r=A("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=A("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=A("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",j(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(c)=>{n={...n,...c},i()},dispose:()=>{r.remove()}}};var vr=(e,t)=>{H(B);let n=t,r=A("div","oc-sdk oc-sdk-banner"),o=A("div","oc-sdk-banner-text"),s=A("div","oc-sdk-banner-title"),i=A("div","oc-sdk-banner-body"),c=A("div","oc-sdk-banner-action");o.append(s,i),r.append(o,c),e.append(r);let f=null,_=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),j(s,n.title),j(i,n.body),i.hidden=!n.body,c.hidden=!n.action,!n.action){f?.dispose(),f=null;return}let p={label:n.action.label,onClick:n.action.onClick};if(f)f.update(p);else f=Ue(c,{...p,variant:"outline",size:"xs"})};return _(),{update:(p)=>{n={...n,...p},_()},dispose:()=>{f?.dispose(),f=null,r.remove()}}};var Fa=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,Mr=(e,t)=>{H(B);let n=t,r=A("div","oc-sdk oc-sdk-progress"),o=A("div","oc-sdk-progress-label"),s=A("span"),i=A("span","oc-sdk-progress-value"),c=A("span"),f=Ie("check",14);i.append(f,c),o.append(s,i);let _=A("div","oc-sdk-progress-track");_.setAttribute("role","progressbar"),_.setAttribute("aria-valuemin","0"),_.setAttribute("aria-valuemax","100");let p=A("div","oc-sdk-progress-fill");_.append(p),r.append(o,_),e.append(r);let S=()=>{let m=Fa(n.value);if(ft(p,n.tone),p.style.transform=`scaleX(${m/100})`,_.setAttribute("aria-valuenow",String(m)),n.label)_.setAttribute("aria-label",n.label);else _.removeAttribute("aria-label");j(s,n.label),j(c,`${m}%`);let d=m===100&&(!n.tone||n.tone==="neutral");Ae(r,"data-done",d?"true":null),f.style.display=d?"":"none",o.hidden=!n.label};return S(),{update:(m)=>{n={...n,...m},S()},dispose:()=>{r.remove()}}};var Os=(e)=>e.filter((t)=>!("separator"in t)),Xa=0,Pr=(e,t)=>{H(B);let n=t,r=`oc-sdk-menu-${Xa+=1}`,o=A("div","oc-sdk oc-sdk-menu");e.append(o);let s=A("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,c=null,f=Ue(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)m();else d()}}),_=o.querySelector("button");_?.setAttribute("aria-haspopup","menu");let p=(y)=>{c=y,en(s,s,r,y)},S=()=>{Pe(s);for(let y of n.items){if("separator"in y){let g=A("div","oc-sdk-separator");g.dataset.labeled="false",s.append(g);continue}s.append(Zt(r,"menuitem",y,{hover:()=>p(y.id),pick:()=>T(y.id)}))}p(Os(n.items).some((y)=>y.id===c)?c:null)},m=()=>{let y=i;i=null,y?.(),c=null,_?.setAttribute("aria-expanded","false")},d=()=>{if(i||!_)return;S(),i=tn(o,_,s,m),_.setAttribute("aria-expanded","true"),s.focus()},T=(y)=>{m(),_?.focus(),n.onSelect(y)},O=(y)=>{let g=we(y);if(g)y.preventDefault(),p(Ne(Os(n.items),c,g));else if(y.key==="Enter"||y.key===" "){if(y.preventDefault(),c)T(c)}else if(y.key==="Escape")y.preventDefault(),m(),_?.focus()},b=(y)=>{if(i&&!(y.relatedTarget instanceof Node&&o.contains(y.relatedTarget)))m()};return s.addEventListener("keydown",O),o.addEventListener("focusout",b),{update:(y)=>{if(n={...n,...y},f.update({label:n.label,variant:n.variant,size:n.size}),i)S()},dispose:()=>{m(),s.removeEventListener("keydown",O),o.removeEventListener("focusout",b),f.dispose(),o.remove()}}};var w=er(),Le=null,on=new Set;w.onReady((e)=>{Le=e,fr(e,document.documentElement);for(let t of on)t(e)});w.onItem((e)=>{if(!Le||Le.item===e)return;Le={...Le,item:e};for(let t of on)t(Le)});var Qe=()=>{let[e,t]=C(Le);return ue(()=>{if(on.add(t),Le)t(Le);return()=>{on.delete(t)}},[]),e};var ja=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},Is=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),Wa=(e,t)=>{let n=e;for(let r of t){if(n===null||n===void 0)return;n=n[r]}return n},Ur=(e,t)=>{let n=(r,o)=>{if(typeof r==="function")return(...s)=>{let i=Wa(t.current,o);return typeof i==="function"?i(...s):void 0};if(Array.isArray(r))return r.map((s,i)=>n(s,[...o,i]));if(ja(r))return Object.fromEntries(Object.entries(r).map(([s,i])=>[s,n(i,[...o,s])]));return r};return n(e,[])};var Ka=Symbol.for("pv"),za=0;function a(e,t,n,r,o,s){t||(t={});var i,c,f=t;if("ref"in f&&typeof e!="function")for(c in f={},t)c=="ref"?i=t[c]:f[c]=t[c];var _={type:e,props:f,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Ka,__v:--za,__i:-1,__u:0};return(o||s)&&(_.__source=o,_.__self=s),G.vnode&&G.vnode(_),_}var Nr=(...e)=>e.filter(Boolean).join(" ");var se=({children:e,class:t})=>a("span",{class:Nr("sui-chip",t),children:e},void 0,!1,void 0,this),bs=({children:e,onClick:t,pressed:n,class:r})=>t?a("button",{type:"button",class:Nr("sui-card",r),"aria-pressed":n,onClick:t,children:e},void 0,!1,void 0,this):a("div",{class:Nr("sui-card sui-card--static",r),children:e},void 0,!1,void 0,this);var _t=({title:e,children:t})=>a("div",{class:"sui-section",children:[e&&a("h3",{class:"sui-section-title",children:e},void 0,!1,void 0,this),t]},void 0,!0,void 0,this),ks=({items:e})=>a("dl",{class:"sui-kv",children:e.flatMap(([t,n])=>[a("dt",{children:t},void 0,!1,void 0,this),a("dd",{children:n},void 0,!1,void 0,this)])},void 0,!1,void 0,this),Cs=(e,t)=>{let n=Ge(null),r=Ge(null),o=Ge(t);o.current=t;let s=Is(t),i=Ge(!1);ue(()=>{if(!n.current)return;return r.current=e(n.current,Ur(o.current,o)),i.current=!0,()=>{r.current?.dispose(),r.current=null,i.current=!1}},[]);let c=Ge(s);return ue(()=>{if(!i.current||c.current===s)return;c.current=s,r.current?.update(Ur(o.current,o))},[s]),n};var be=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let r=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...r?{}:{year:"numeric"}})},ws=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let r=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-r)/86400000)},vs=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let r=Math.max(0,Math.round((t-n)/60000));if(r<1)return"just now";if(r<60)return`${r}m ago`;let o=Math.round(r/60);if(o<24)return`${o}h ago`;let s=Math.round(o/24);if(s<30)return`${s}d ago`;return be(e,new Date(t))};var qa={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},Ze=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return qa[e]??String(e);return String(e)},Lr=(e)=>{let t=e.url.match(/\/-\/merge_requests\/(\d+)/),n=e.url.match(/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/),r=t?.[1]??n?.[1];if(!r)return null;let o=e.metadata??{},s=String(o.status??o.state??"").toLowerCase(),c=o.draft===!0||o.isDraft===!0||s==="draft"?"draft":s==="merged"?"merged":s==="closed"?"closed":s==="open"||s==="opened"||s==="approved"||s==="reviewing"?"open":null;return{label:`${t?"!":"#"}${r}`,status:c,url:e.url,title:e.title}},Ms=(e,t=Date.now())=>{if(!e)return null;let n=new Date(e).getTime();if(Number.isNaN(n))return null;let r=n<t,o=Math.round(Math.abs(n-t)/60000),s=Math.round(o/60),i=Math.round(s/24),c=o<60?`${Math.max(1,o)}m`:s<24?`${s}h`:i<14?`${i}d`:`${Math.round(i/7)}w`;return{text:r?`-${c}`:c,overdue:r}},Ps=(e)=>{let t=Math.abs(e),n=(r)=>String(Math.round(r*10)/10).replace(/\.0$/,"");if(t>=1e6)return`$${n(e/1e6)}M`;if(t>=1000)return`$${n(e/1000)}k`;return`$${Math.round(e)}`},Us=(e,t=Date.now())=>{let n=e?new Date(e).getTime():NaN;if(Number.isNaN(n))return null;let r=Math.max(0,Math.round((t-n)/60000));if(r<60)return`${Math.max(1,r)}m`;let o=Math.round(r/60);if(o<24)return`${o}h`;let s=Math.round(o/24);return s<14?`${s}d`:`${Math.round(s/7)}w`};var Ns=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let o=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:null},Ls=([e,t,n])=>{let r=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*r(e)+0.7152*r(t)+0.0722*r(n)},Ya=(e,t)=>{let[n,r]=[Ls(e),Ls(t)].sort((o,s)=>s-o);return(n+0.05)/(r+0.05)};var Ds=(e,t)=>{let n=Ns(e),r=Ns(t);if(!n||!r||Ya(n,r)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var et=new Map,Ja=30000,$s=(e)=>{let t=et.get(e);if(!t)t={at:0,listeners:new Set},et.set(e,t);return t},sn=(e)=>{for(let t of e.listeners)t()},mt=(e,t,n=!1)=>{let r=$s(e);if(r.promise)return r.promise;if(!n&&r.value!==void 0&&Date.now()-r.at<Ja)return Promise.resolve(r.value);let o=t().then((s)=>(r.value=s,r.error=void 0,r.at=Date.now(),s),(s)=>{throw r.error=s,s}).finally(()=>{r.promise=void 0,sn(r)});return r.promise=o,sn(r),o};var Gs=(e)=>{let t=[];for(let[n,r]of et){if(r.value===void 0)continue;let o=e(n,r.value);if(o===r.value)continue;t.push([r,r.value]),r.value=o,sn(r)}return()=>{for(let[n,r]of t)n.value=r,sn(n)}},Et=(e)=>{let t=et.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)mt(e,t.fetcher,!0).catch(()=>{return})},ie=(e)=>{for(let[t,n]of et){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)mt(t,n.fetcher,!0).catch(()=>{return})}},St=(e,t)=>{let[,n]=C(0);ue(()=>{if(!e)return;let o=$s(e);o.fetcher=t;let s=()=>n((i)=>i+1);return o.listeners.add(s),mt(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let r=e?et.get(e):void 0;return{data:r?.value,error:r?.error,loading:Boolean(r?.promise)||e!==null&&r?.value===void 0&&r?.error===void 0,refresh:()=>{if(e)mt(e,t,!0).catch(()=>{return})}}};var Bs=(e,t)=>JSON.stringify({query:e,variables:t});class ce extends Error{kind;constructor(e,t){super(t);this.kind=e}}var le=async(e,t)=>{let n;try{n=await w.request({method:"POST",path:"/graphql",body:Bs(e,t)})}catch(o){if(o instanceof k){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new ce("disconnected","Linear is not connected.");throw new ce("network",o.message||"Could not reach Linear.")}throw new ce("network",o instanceof Error?o.message:"Could not reach Linear.")}let r;try{r=JSON.parse(n.body)}catch{throw new ce("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new ce("disconnected","Linear sign-in expired.");if(r.errors?.length){let o=r.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new ce(s?"rate-limited":"graphql",o.message)}if(!r.data)throw new ce("graphql","Linear returned no data.");return r.data};var Be=`
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
`;var Qa=(e)=>`
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
`,Hs=`
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
`;var Vs=`
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`;var Fs=`
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
`;var Dr=`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
  }
`;var Xs=`
  mutation DocumentCreate($input: DocumentCreateInput!) {
    documentCreate(input: $input) { success document { id title url updatedAt } }
  }
`,js=`
  mutation DocumentUpdate($id: String!, $input: DocumentUpdateInput!) {
    documentUpdate(id: $id, input: $input) { success document { id title url updatedAt } }
  }
`;var Ws=`
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
`;var Ks=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,dS={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:Qa(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:Ks(["n1","n2"])};var $r=null,zs=new Map,qs=(e)=>{for(let[t,n]of e)zs.set(t,n)},Ys=(e,t)=>{let n=zs.get(t);if(n!==void 0)return n;let r=$r?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=r.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(r.length+1)},Js=()=>$r?.viewer.id??null,Qs=(e)=>$r?.teamsById.get(e)?.issueEstimationType;var Zs=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),Za=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),r=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${r.toFixed(2)}z`},ht=({type:e,color:t,size:n=14,fill:r,teamId:o,stateId:s})=>{let i=t||"currentColor",c=pt(()=>Ds(i,Zs()),[i,Zs()]),f={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return a("svg",{...f,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),a("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return a("svg",{...f,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return a("svg",{...f,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let _=r??(o&&s?Ys(o,s):0.5);return a("svg",{...f,children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:Za(_),fill:c},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return a("svg",{...f,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),a("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return a("svg",{...f,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),a("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}},an=({priority:e,size:t=14})=>{let n={width:t,height:t,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};if(e===1)return a("svg",{...n,children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"2.5",fill:"var(--oc-warning)"},void 0,!1,void 0,this),a("path",{d:"M7 4v3.6M7 9.4v.2",stroke:"var(--oc-bg)","stroke-width":"1.6","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);if(e>=2&&e<=4){let r=5-e;return a("svg",{...n,children:[0,1,2].map((o)=>a("rect",{x:2+o*4,y:9-o*3,width:"2.4",height:3+o*3,rx:"0.6",fill:"currentColor",opacity:o<r?1:0.28},void 0,!1,void 0,this))},void 0,!1,void 0,this)}return a("svg",{...n,children:a("path",{d:"M2.5 7h2M6 7h2M9.5 7h2",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round",opacity:"0.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},tt=({name:e,url:t,size:n=18})=>{let r=e.split(/\s+/).filter(Boolean).slice(0,2).map((s)=>s[0].toUpperCase()).join("")||"?",o={width:`${n}px`,height:`${n}px`,fontSize:`${Math.round(n*0.42)}px`};if(t)return a("img",{class:"lin-avatar",src:t,alt:e,style:o},void 0,!1,void 0,this);return a("span",{class:"lin-avatar",style:o,children:r},void 0,!1,void 0,this)},ec={open:"var(--oc-info)",merged:"var(--oc-success)",closed:"var(--oc-muted)",draft:"var(--oc-muted)"},ei=({status:e,size:t=13})=>a("svg",{width:t,height:t,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("g",{fill:"none",stroke:e?ec[e]:"currentColor","stroke-width":"1.4","stroke-linecap":"round",children:[a("circle",{cx:"3.5",cy:"3",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"3.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"10.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("path",{d:"M3.5 4.6v4.8M10.5 9.4V6.5a2 2 0 0 0-2-2H6.5"},void 0,!1,void 0,this),a("path",{d:"M7.8 3.2 6.3 4.5l1.5 1.3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),ti=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:"currentColor","stroke-width":"1.4"},void 0,!1,void 0,this),a("path",{d:"M5.6 4.6 9.2 7l-3.6 2.4z",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var ni=({done:e,total:t,size:n=13})=>{let o=2*Math.PI*5,s=t?Math.min(1,e/t):0;return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:"var(--oc-border)","stroke-width":"2"},void 0,!1,void 0,this),a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:s>=1?"var(--oc-success)":"var(--oc-info)","stroke-width":"2","stroke-dasharray":`${o*s} ${o}`,transform:"rotate(-90 7 7)","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},ri=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"6",fill:"var(--oc-error)"},void 0,!1,void 0,this),a("path",{d:"M4 7h6",stroke:"var(--oc-bg)","stroke-width":"1.8","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),oi=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"3",fill:"none",stroke:"var(--oc-warning)","stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:"M5 10V4.5h4.2l-.9 1.4.9 1.4H5",fill:"var(--oc-warning)",stroke:"var(--oc-warning)","stroke-width":"1","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),cn=({icon:e,color:t,size:n=13})=>{if(e&&/\p{Extended_Pictographic}/u.test(e))return a("span",{class:"lin-project-emoji",style:{fontSize:`${n}px`},"aria-hidden":"true",children:e},void 0,!1,void 0,this);return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("path",{d:"M7 1.2 12.2 4.1v5.8L7 12.8 1.8 9.9V4.1z",fill:t||"var(--oc-muted)"},void 0,!1,void 0,this),a("path",{d:"M4.6 7h4.8M7 4.6v4.8",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round",opacity:"0.85"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Gr=(e)=>["completed","canceled","duplicate"].includes(e.type);var si=(e)=>{if(Gr(e.state))return{blockedBy:0,blocking:0};return{blockedBy:(e.inRelations?.nodes??[]).filter((t)=>t.type==="blocks"&&!Gr(t.issue.state)).length,blocking:(e.outRelations?.nodes??[]).filter((t)=>t.type==="blocks"&&!Gr(t.relatedIssue.state)).length}};var ln=({label:e})=>a(se,{children:[a("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this),Br=2,tc=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.6.6M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.6-.6",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),nc=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7.5",r:"4.7",fill:"none",stroke:"currentColor","stroke-width":"1.3"},void 0,!1,void 0,this),a("path",{d:"M7 5v2.7l1.6 1M5.5 1.8h3",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),rc=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2zM2 4.2 7 7l5-2.8M7 7v5.5",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),oc=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"5",cy:"5",r:"2.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M1.5 11.5c.4-2 1.8-3 3.5-3s3.1 1 3.5 3M9.5 3.4a2.2 2.2 0 0 1 0 3.9M10.5 8.8c1 .4 1.7 1.3 2 2.7",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),sc=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M7 4.2V7l2 1.2",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ii=({issue:e,properties:t,subIssues:n,hideProject:r,extras:o})=>{let s=e.labels.nodes,i=e.attachments?.nodes??[],c=i.map(Lr).filter((g)=>g!==null),f=i.filter((g)=>!Lr(g)),{blockedBy:_,blocking:p}=si(e),S=Ze(e.estimate,Qs(e.team.id)),m=e.dueDate?ws(e.dueDate):null,d=t.has("sla")?Ms(e.slaBreachesAt):null,T=o?.releases.nodes??[],O=(o?.needs.nodes??[]).map((g)=>g.customer).filter((g)=>g!==null),b=O.reduce((g,M)=>g+(M.revenue??0),0),y=t.has("timeInStatus")?Us(o?.stateHistory.nodes[o.stateHistory.nodes.length-1]?.startedAt):null;return a(xe,{children:[n&&n.total>0&&a("span",{class:"lin-meta lin-meta-children",title:`${n.done} of ${n.total} sub-issues done`,children:a(se,{children:[a(ni,{done:n.done,total:n.total},void 0,!1,void 0,this),n.done,"/",n.total]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("labels")&&s.length>0&&a("span",{class:"lin-meta lin-meta-labels",children:[s.slice(0,Br).map((g)=>a(ln,{label:g},g.id,!1,void 0,this)),s.length>Br&&a(se,{children:["+",s.length-Br]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),t.has("changes")&&c.length>0&&a("span",{class:"lin-meta lin-meta-change",title:c.map((g)=>`${g.label} ${g.title}`).join(`
`),children:a(se,{children:[a(ei,{status:c[0].status},void 0,!1,void 0,this),c.length===1?c[0].label:`${c.length} ${c[0].label.startsWith("!")?"MRs":"PRs"}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("links")&&f.length>0&&a("span",{class:"lin-meta lin-meta-links",title:f.map((g)=>g.title).join(`
`),children:a(se,{children:[a(tc,{},void 0,!1,void 0,this),f.length]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("project")&&!r&&e.project&&a("span",{class:"lin-meta lin-meta-project",title:e.project.name,children:a(se,{children:[a(cn,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:e.project.name},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("milestone")&&e.projectMilestone&&a("span",{class:"lin-meta lin-meta-milestone",title:`Milestone: ${e.projectMilestone.name}`,children:a(se,{children:a("span",{class:"lin-ellipsis",children:e.projectMilestone.name},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("cycle")&&e.cycle&&a("span",{class:"lin-meta lin-meta-cycle",title:`Cycle ${e.cycle.number}${e.cycle.name?`: ${e.cycle.name}`:""}`,children:a(se,{children:[a(ti,{},void 0,!1,void 0,this),e.cycle.number]},void 0,!0,void 0,this)},void 0,!1,void 0,this),_>0&&a("span",{class:"lin-meta lin-meta-blocked",title:`Blocked by ${_} ${_===1?"issue":"issues"}`,children:a(se,{children:[a(ri,{},void 0,!1,void 0,this),_]},void 0,!0,void 0,this)},void 0,!1,void 0,this),p>0&&a("span",{class:"lin-meta lin-meta-blocking",title:`Blocking ${p} ${p===1?"issue":"issues"}`,children:a(se,{children:[a(oi,{},void 0,!1,void 0,this),p]},void 0,!0,void 0,this)},void 0,!1,void 0,this),d&&a("span",{class:`lin-meta lin-meta-sla ${d.overdue?"lin-overdue":""}`,title:`SLA ${e.slaType??""} breaches ${be(e.slaBreachesAt)}`,children:a(se,{children:[a(nc,{},void 0,!1,void 0,this),d.text]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("release")&&T.length>0&&a("span",{class:"lin-meta lin-meta-release",title:T.map((g)=>`${g.name}${g.version?` ${g.version}`:""}`).join(`
`),children:a(se,{children:[a(rc,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:T[0].version??T[0].name},void 0,!1,void 0,this),T.length>1&&` +${T.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customers")&&O.length>0&&a("span",{class:"lin-meta lin-meta-customers",title:O.map((g)=>g.name).join(`
`),children:a(se,{children:[a(oc,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:O[0].name},void 0,!1,void 0,this),O.length>1&&` +${O.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customerRevenue")&&b>0&&a("span",{class:"lin-meta lin-meta-revenue",title:"Customer revenue",children:a(se,{children:Ps(b)},void 0,!1,void 0,this)},void 0,!1,void 0,this),y&&a("span",{class:"lin-meta lin-meta-in-status",title:`In ${e.state.name} for ${y}`,children:a(se,{children:[a(sc,{},void 0,!1,void 0,this),y]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("estimate")&&S&&a("span",{class:"lin-meta lin-meta-estimate",title:"Estimate",children:a(se,{children:S},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("dueDate")&&e.dueDate&&a("span",{class:`lin-meta lin-meta-due sui-small ${m!==null&&m<0?"lin-overdue":"sui-muted"}`,title:"Due date",children:be(e.dueDate)},void 0,!1,void 0,this),t.has("creator")&&e.creator&&a("span",{class:"lin-meta lin-meta-creator",title:`Created by ${e.creator.name}`,children:a(tt,{name:e.creator.name,url:e.creator.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var ic=/^[A-Za-z]{1,7}-\d+$/;var ai=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!ic.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()},nt=(e)=>{let t=typeof e==="string"?e:Array.isArray(e)?e.filter((s)=>typeof s==="string").join(","):"",n=[],r=[],o=0;for(let s of t.split(/[,;\s]+/)){if(!s)continue;let i=ai(s);if(!i){if(r.length<3&&!r.includes(s.slice(0,24)))r.push(s.slice(0,24));continue}if(n.includes(i))continue;if(n.length>=25)o+=1;else n.push(i)}return{ids:n,skipped:r,cut:o}},ci=(e,t)=>{if(typeof e!=="string")return"";let n=e.replace(/\s+/g," ").trim();return n.length>t?`${n.slice(0,t-3).trimEnd()}...`:n},li=(e)=>ci(e,160),di=(e)=>ci(e,400),ui=(e)=>{let t=new Map;for(let n of e){let[r,o]=n.split("-"),s=t.get(r)??[];s.push(Number(o)),t.set(r,s)}return{or:[...t].map(([n,r])=>({and:[{team:{key:{eqIgnoreCase:n}}},{number:{in:r}}]}))}},pi=(e)=>{let t=new Map;for(let r of e){let o=t.get(r.team.id)??[];o.push(r),t.set(r.team.id,o)}let n=new Map;for(let r of t.values())r.sort((o,s)=>o.position-s.position),r.forEach((o,s)=>n.set(o.id,(s+1)/(r.length+1)));return n},fi=(e)=>`${e.identifier} ${e.title}`.slice(0,1900),Hr=(e)=>{let t=e?.trim().split(/\s+/,1)[0];return ai(t)};async function ke(e,t,n,r={}){let o=r.name??"extension",s={};for(let[i,c]of Object.entries(r.query??{}))if(c)s[i]=c;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...r.body!==void 0?{body:JSON.stringify(r.body)}:{}}),c;try{c=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${o} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&c.ok===void 0)return{ok:!1,error:String(c.message??`Error ${i.status}`),code:"failed"};return c}catch(i){let c=i.code;if(c==="NO_SERVICE")return{ok:!1,error:`Approve the ${o} service in Settings > Extensions.`,code:"failed"};if(c==="SERVICE_FAILED")return{ok:!1,error:`The ${o} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${o} service.`,code:"failed"}}}async function he(e,t,n,r={}){try{await e.toast({kind:t,message:n,...r.dismiss?{dismiss:!0}:{}})}catch{}}var cc=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,_i=(e)=>{if(!e)return[];let t=[],n=(o)=>{let s=o?.toUpperCase();if(s&&!t.includes(s))t.push(s)},r=[...e.links??[]].sort((o,s)=>(s.linkedAt??0)-(o.linkedAt??0));for(let o of r)n(o.url.match(cc)?.[1]);for(let o of e.items??[]){let s=o.data?.identifier;if(typeof s==="string")n(s)}return t};var lc="plan";var dc=(e)=>({sessionId:e.id,directory:e.directory,title:e.title,agent:e.agent??null,inWorktree:e.worktree!==null,updatedAt:e.updatedAt}),mi=(e,t,n=new Set)=>{let r=t.toUpperCase(),o=(s)=>(s.agent===lc?0:2)+(s.inWorktree?0:1);return e.filter((s)=>s.archivedAt===null&&s.parentId===null&&(n.has(s.id)||_i(s).includes(r))).map(dc).sort((s,i)=>o(s)-o(i)||i.updatedAt-s.updatedAt)[0]??null};var uc=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,pc=1e5,Ei=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),Si=(e,t,n)=>{let r=Ei(t.trim()).trim(),o=n?`${r}

**Full plan:** [Read the full plan document](${n})`:r,s=(e??"").replace(uc,"").trimEnd(),i=`---
## Plan

${o}`,c=s?`${s}

${i}`:i;return c.length>pc?null:c};var dn=6500,hi=(e)=>e.length>dn,fc=(e)=>{if(e.length<=dn)return e;let t=e.slice(0,dn-1),n=t.lastIndexOf(`

`),r=t.lastIndexOf(" "),o=n>dn/2?n:r;return`${t.slice(0,o>0?o:t.length).trimEnd()}…`},Ti=(e)=>fc(Ei(e.trim()).trim()),gi=(e,t=6,n=420)=>{let r=e.trim().split(`
`).filter((o)=>o.trim()).slice(0,t).join(`
`);return r.length>n?`${r.slice(0,n).trimEnd()}...`:r};var yi="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var ZS=new RegExp("```linear-plan[^\\n]*\\n([\\s\\S]*?)```","g");var _c=(e,t)=>typeof e==="string"?e.replace(/\s+/g," ").trim().slice(0,t):"";var Vr=(e,t)=>{if(e===null||t.length===0)return null;let n=t[0];for(let r of t)if(Math.abs(r-e)<Math.abs(n-e)||Math.abs(r-e)===Math.abs(n-e)&&r>n)n=r;return n},Ai=(e,t)=>{if(e.length===0)return'This team does not use estimates: leave "estimate" out.';return`Estimates on this team, written as the number: ${e.map((r)=>{let o=t(r);return o&&o!==String(r)?`${o} = ${r}`:String(r)}).join(", ")}.`},xi=(e,t,n)=>[e.description,`Split out of ${t} by the plan in "${_c(n,120)}". Created by Linear+.`].filter(Boolean).join(`

---

`);var Fr=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["sessionId","identifier","directory","sessionTitle","state"].every((n)=>typeof t[n]==="string")&&typeof t.extras==="object"&&t.extras!==null&&Array.isArray(t.extras.issues)};var mc=["No priority","Urgent","High","Medium","Low"],Xr=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${mc[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],n=e.comments.nodes.slice(-5).map((o)=>`${o.user?.name??"Someone"} (${be(o.createdAt)}): ${o.body}`),r=[...t,...n.length?["","Latest comments:",...n]:[]].filter((o,s,i)=>o||i[s-1]).join(`
`);return r.length>15000?`${r.slice(0,15000)}
[cut]`:r};var Ri=["triage","backlog","unstarted","started","completed","canceled","duplicate"],Oi=(e,t)=>Ri.indexOf(e.type)-Ri.indexOf(t.type)||e.position-t.position;var Ii=["No priority","Urgent","High","Medium","Low"];var bi=(e)=>[...e??[]].sort(Oi);var jr=(e)=>bi(e).filter((t)=>t.type==="started"||t.type==="unstarted"&&/plan/i.test(t.name)),un=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=jr(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return ki(r.filter((o)=>o.type==="started"),n,r)},ki=(e,t,n=e)=>{let r=t?.trim().toLowerCase();return(r?n.find((o)=>o.name.trim().toLowerCase()===r):void 0)??e.find((o)=>/^in progress$/i.test(o.name.trim()))??e.find((o)=>/progress|doing|working|development|started/i.test(o.name))??e.find((o)=>!/block|hold|pause|wait|stuck/i.test(o.name))??e[0]??null},Ci=(e)=>/plan/i.test(e.name),wi=(e)=>bi(e).filter((t)=>t.type==="started"&&!Ci(t)),Wr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!Ci(e.state))return null;return ki(wi(t),n)},Kr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=jr(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return r.find((o)=>/plan/i.test(o.name))??un(e,t,n)},vi=(e,t,n,r)=>{let o=e==="build"?wi(n):jr(n),s=e==="build"?Wr(t,n,r):e==="plan"?Kr(t,n,r):un(t,n,r),i=s??o.find((c)=>c.id===t.state.id)??null;return{options:o,target:i,moves:s!==null}},Ec={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},Sc=(e)=>{let t=e?Ec[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]},pn=(e)=>Sc({issueEstimationType:e.issueEstimationType??"notUsed",issueEstimationAllowZero:e.issueEstimationAllowZero??!1,issueEstimationExtended:e.issueEstimationExtended??!1}),Mi=(e,t)=>{let n=t.trim().replace(/^refs\/heads\//,"").toLowerCase();if(!n)return null;return e.find((r)=>r.status==="ready"&&r.branch.replace(/^refs\/heads\//,"").toLowerCase()===n)?.directory??null},zr=(e,t)=>t>0?`${e}-${t+1}`:e;var fn=async(e)=>{try{let t=await w.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},hc=async(e,t)=>{try{return await w.storage.set(e,t),!0}catch{return!1}};var Tt=async()=>await fn("pref:start-moves")!==!1;var Pi=async()=>await fn("pref:assign-me")===!0;var _n=async()=>await fn("pref:lead-mode")===!0;var gt=async(e)=>{let t=await fn(`pref:start-state:${e}`);return typeof t==="string"?t:null},yt=(e,t)=>hc(`pref:start-state:${e}`,t);var He=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof ce&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof ce&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},Tc=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),Ui=(e,t)=>Gs((n,r)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&Tc(r)&&r.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...r,issues:r.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof r==="object"&&r!==null&&r.id===e){let{team:o,...s}=t;return{...r,...s}}return r}),gc=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new ce("graphql","Linear did not save the change.");return e.issueUpdate.issue},We=async(e,t)=>{let n=Ui(e.id,t.patch);try{let r=gc(await le(Fs,{id:e.id,input:t.input}));if(Ui(e.id,r),Et(`issue:${e.identifier}`),"stateId"in t.input)ie("children:");if("projectMilestoneId"in t.input||"projectId"in t.input)ie("issues:"),ie("view-issues:"),ie("milestone-counts:");if("parentId"in t.input)ie("issues:"),ie("view-issues:"),ie("children:");if(["releaseIds","addedReleaseIds","removedReleaseIds"].some((o)=>(o in t.input)))ie("extras:"),ie("issue-releases:");return r}catch(r){throw n(),r}};var Ni=async(e)=>{let t=await le(Ws,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new ce("graphql","Linear did not create the issue.");return ie("issues:"),ie("view-issues:"),t.issueCreate.issue};var Li=async(e,t)=>{let n=await le(Xs,{input:{issueId:e.id,...t}});if(!n.documentCreate.success)throw new ce("graphql","Linear did not create the document.");return Et(`issue:${e.identifier}`),n.documentCreate.document},Di=async(e,t,n)=>{let r=await le(js,{id:t,input:n});if(!r.documentUpdate.success)throw new ce("graphql","Linear did not update the document.");return Et(`issue:${e.identifier}`),Et(`document:${t}`),r.documentUpdate.document};var $i=async(e,t)=>{let n=await w.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:Xr(e),data:{issueId:e.id,identifier:e.identifier},worktree:t.existing?{kind:"existing",directory:t.existing}:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(n.sessionId===null)return{started:!1,directory:n.directory};let r=t.state??un(e,e.team.states.nodes),{moved:o,moveError:s}=await Gi(e,r,t.move);return{started:!0,sessionId:n.sessionId,target:r,moved:o,moveError:s}},Gi=async(e,t,n)=>{let r=!1,o=null;if(n&&t)try{await We(e,{input:{stateId:t.id},patch:{state:t}}),r=!0}catch(s){o=He(s)}return{moved:r,moveError:o}},Bi=async(e,t)=>{let n=t.lead??await _n().catch(()=>!1),r=t.existing??null,o=n?t.existingSession??null:null;if(!r){let _=await w.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",data:{issueId:e.id,identifier:e.identifier},worktree:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(_.sessionId===null)return{started:!1,directory:_.directory};if(r=_.worktree?.directory??_.directory??t.directoryHint??null,!r)return{started:!1,directory:"",error:"The host did not say which folder the session is in."};if(n)o=_.sessionId}let s;try{let _=Ai(pn(e.team),(p)=>Ze(p,e.team.issueEstimationType));s=(await Vi({identifier:e.identifier,directory:r,issueTitle:e.title,context:Xr(e),scale:_,...t.model?{model:t.model}:{},...n?{lead:o??!0,leadTitle:`${e.identifier} ${e.title}`}:{}})).sessionId}catch(_){return{started:!1,directory:r,error:_ instanceof Error?_.message:String(_),...o?{session:o}:{}}}let i=t.state??Kr(e,e.team.states.nodes),{moved:c,moveError:f}=await Gi(e,i,t.move);return{started:!0,sessionId:s,target:i,moved:c,moveError:f}},qr=(e)=>e.replace(/\/+$/,""),Yr=async(e)=>{if(!e)return null;try{let t=qr(e),n=(await w.listProjects())?.projects??[],r=n.find((o)=>qr(o.directory)===t);if(r)return r;for(let o of n)if(((await w.listWorktrees(o.id))?.worktrees??[]).some((i)=>qr(i.directory)===t))return o}catch{}return null},Hi=async(e,t)=>{try{let n=await Yr(e);if(!n)return null;return Mi((await w.listWorktrees(n.id))?.worktrees??[],t)}catch{return null}},mn=async(e)=>{try{await w.openSession(e)}catch{}};var Fi=async(e,t)=>{let n=await yc(t);try{let o=await Yr(e);if(o){let s=await w.listSessions(o.id),i=mi(s?.sessions??[],t,new Set(n.map((c)=>c.sessionId)));if(i)return i}}catch{}let r=n[0];return r?{sessionId:r.sessionId,directory:r.sessionDirectory,title:r.title,agent:"plan",inWorktree:!0,updatedAt:r.createdAt}:null},yc=async(e)=>{let t=await ke(w,"GET","/plans",{query:{identifier:e},name:"Linear+"}),n=t.ok===!1?[]:t.sessions;if(!Array.isArray(n))return[];return n.map((r)=>r).filter((r)=>typeof r.sessionId==="string"&&typeof r.createdAt==="number").map((r)=>({sessionId:r.sessionId,sessionDirectory:typeof r.sessionDirectory==="string"?r.sessionDirectory:typeof r.directory==="string"?r.directory:"",title:typeof r.title==="string"?r.title:`${e} plan`,createdAt:r.createdAt})).filter((r)=>r.sessionDirectory.startsWith("/"))};var Xi=async(e)=>{let t=await ke(w,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{},...e.model?{model:e.model}:{},...e.planText?{planText:e.planText}:{}},name:"Linear+"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear+ service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},En=async(e)=>{let t=await ke(w,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier,...e.planText?{planText:e.planText}:{}},name:"Linear+"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear+ service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1,lead:t.lead===!0}},Vi=async(e)=>{let{model:t,...n}=e,r=await ke(w,"POST","/plan",{body:t?{...n,model:t}:n,name:"Linear+"});if(r.ok===!1||typeof r.sessionId!=="string")throw Error(r.error??"The Linear+ service did not start the plan.");return{sessionId:r.sessionId,directory:typeof r.directory==="string"?r.directory:e.directory}};var ji=async(e)=>{let t=await ke(w,"GET","/extras",{query:{sessionId:e},name:"Linear+"});return t.ok!==!1&&Fr(t.extras)?t.extras:null},Sn=async(e)=>{let t=await ke(w,"POST","/handoffs",{body:e,name:"Linear+"});if(t.ok===!1)return null;if(e.action==="claim-extras"&&t.claimed!==!0)return null;return Fr(t.state)?t.state:null};var pe=(e,t="inline-flex")=>(n)=>{let r=Cs(e,n);return a("span",{ref:r,style:{display:t}},void 0,!1,void 0,this)},fe=pe(Ue),hn=pe(nn),eT=pe(xr,"block"),tT=pe(Rr,"block"),nT=pe(Ir),rT=pe(Pr),oT=pe(br),rt=pe(wr),Re=pe(vr,"block"),Wi=pe(Cr,"block"),sT=pe(Mr,"block"),iT=pe(kr,"block"),aT=pe(Or),ot=pe(rn),cT=pe(rn,"block"),lT=pe(nn,"block");var Ki=(e)=>typeof e==="object"&&e!==null&&typeof e.agent==="string"&&(e.model===void 0||typeof e.model==="string"),zi=(e)=>typeof e==="object"&&e!==null&&typeof e.id==="string"&&typeof e.label==="string",qi=(e)=>{if(!e||e.ok===!1||!Array.isArray(e.agents)||!Array.isArray(e.models))return null;return{agents:e.agents.filter(zi),models:e.models.filter(zi),defaultModel:typeof e.defaultModel==="string"?e.defaultModel:null,...Ki(e.current?.plan)&&Ki(e.current?.build)?{current:e.current}:{}}},Tn="__default";var Yi=(e,t)=>{let n=e.current?.[t].model;if(n)return e.models.find((o)=>o.id===n)?.label??n;let r=e.defaultModel?e.models.find((o)=>o.id===e.defaultModel)?.label??e.defaultModel:null;return r?`${r} (default)`:"the default model"};var Ji=async(e)=>qi(await ke(w,"GET","/choices",{query:{directory:e},name:"Linear+"}));var gn=({role:e,directory:t,value:n,onChange:r,disabled:o})=>{let s=St(`start-choices:${t??""}`,()=>Ji(t));if(!s.data)return null;let i=[{id:Tn,label:`From Settings: ${Yi(s.data,e)}`},...s.data.models];return a("div",{class:"lin-model-pick",children:a(hn,{label:e==="plan"?"Plan model":"Build model",value:n||Tn,options:i,searchable:!0,searchPlaceholder:"Search models",disabled:o,onChange:(c)=>r(c===Tn?"":c)},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var yn=(e,t,n,r)=>{let o=pt(()=>t?vi(e,t,t.team.states.nodes,n):null,[e,t,n]),[s,i]=C(null),[c,f]=C(null),_=o?.options??[],p=_.find((d)=>d.id===s)??o?.target??null,S=c??Boolean(o?.moves&&r),m=Boolean(t&&p&&S&&p.id!==t.state.id);return{options:_,selected:p,move:m,select:(d)=>{if(i(d),t&&d!==t.state.id)f(!0)},toggle:f}},An=({choice:e,disabled:t})=>a("div",{class:"lin-move-row",children:[a(ot,{label:"Move the issue to",checked:e.move,disabled:t||e.options.length===0,onChange:e.toggle},void 0,!1,void 0,this),e.options.length>0&&a(hn,{value:e.selected?.id??null,options:e.options.map((n)=>({id:n.id,label:n.name})),disabled:t,onChange:e.select},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Jr=new Set,Qi=async(e,t)=>{if(Jr.has(e.sessionId))return null;Jr.add(e.sessionId);try{let n=await Sn({sessionId:e.sessionId,action:"claim-extras"});if(!n)return null;let r=n.estimateDone===!0,o=n.estimateSet??null,s=[...n.created??[]],i=(c)=>String(c);try{let c=(await le(Be,{id:n.identifier})).issue,f=pn(c.team);if(i=(S)=>Ze(S,c.team.issueEstimationType)??String(S),!r){let S=c.estimate===null?Vr(n.extras.estimate,f):null;if(S!==null)await We(c,{input:{estimate:S},patch:{estimate:S}}),o=S;r=!0}let _=t&&await Pi().catch(()=>!1)?t:null;for(let S of n.extras.issues.slice(s.length)){let m=Vr(S.estimate,f),d=await Ni({teamId:c.team.id,title:S.title,description:xi(S,c.identifier,n.sessionTitle),...c.project?{projectId:c.project.id}:{},...m!==null?{estimate:m}:{},..._?{assigneeId:_}:{}});s.push(d.identifier),await le(Dr,{input:{issueId:d.id,relatedIssueId:c.id,type:"related"}})}return{state:await Sn({sessionId:n.sessionId,action:"extras-done",estimateDone:r,estimateSet:o,created:s})??{...n,state:"done",estimateDone:r,estimateSet:o,created:s},label:i}}catch(c){let f=He(c);return{state:await Sn({sessionId:n.sessionId,action:"extras-failed",estimateDone:r,estimateSet:o,created:s,error:f})??{...n,state:"failed",estimateDone:r,estimateSet:o,created:s,error:f},label:i}}}finally{Jr.delete(e.sessionId)}};var At=async(e,t,n=!1,r)=>{let{plan:o,isPlan:s}=await En({source:t,identifier:e.identifier,...r?{planText:r}:{}});if(!s&&!n)throw Error(yi);let i=(await le(Be,{id:e.identifier})).issue,c=`${e.identifier} plan: ${i.title}`.slice(0,200),f=i.documents?.nodes.find((m)=>i.description?.includes(m.url))??i.documents?.nodes.find((m)=>m.title===c),_=hi(o)?await(f?Di(i,f.id,{title:c,content:o}):Li(i,{title:c,content:o})):null,p=_?Ti(o):o,S=Si(i.description,p,_?.url);if(S===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);return await We(i,{input:{description:S},patch:{description:S}}),{document:_}};var Zi=async(e,t,n)=>{let r=!1,o=!1;if(n.post){let p=await At(e,t,n.force,n.planText);r=!0,o=Boolean(p.document)}let s=await ji(t.sessionId).catch(()=>null);if(s&&(s.state==="pending"||s.state==="claimed"))await Qi(s,Js()).catch(()=>null);let i=await Xi({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force,...n.model?{model:n.model}:{},...n.planText?{planText:n.planText}:{}}),c=n.state??Wr(e,e.team.states.nodes,n.lastState),f=!1,_=null;if(n.move&&c)try{await We(e,{input:{stateId:c.id},patch:{state:c}}),f=!0}catch(p){_=He(p)}return{sessionId:i.sessionId,target:c,moved:f,moveError:_,posted:r,postedDocument:o}};var ea=({identifier:e,source:t,label:n="Write Plan",doneLabel:r="Plan Written",size:o="sm",variant:s="outline",disabled:i,onBusy:c})=>{let[f,_]=C(!1),[p,S]=C(!1),m=async()=>{_(!0),c?.(!0);try{let d=await At({identifier:e},t);S(!0),ie("issue"),await he(w,"success",d.document?`Added a concise plan to ${e}, with the full plan in a linked document`:`Added the plan to ${e}`)}catch(d){await he(w,"error",`Could not add the plan to ${e}: ${He(d)}`)}finally{_(!1),c?.(!1)}};return a("span",{class:"lin-inline",title:`Adds the plan from ${t.title} to the end of ${e}'s description and starts nothing. A plan added before is replaced.`,children:a(fe,{label:p?r:n,variant:s,size:o,loading:f,disabled:i||f,onClick:()=>{m()}},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var xn=(e)=>e instanceof Error?e.message:String(e),Ac=(e)=>e.replace(/\/+$/,"").split("/").pop()||e,ta=({identifier:e,source:t,detail:n,onClose:r,onDone:o,fill:s,planText:i})=>{let[c,f]=C(n??null),[_,p]=C(null),[S,m]=C(!0),[d,T]=C(null),[O,b]=C(!1),[y,g]=C(null),[M,P]=C(null),[D,de]=C(null),[ae,z]=C(null),[ne,q]=C(!1),[V,E]=C(!1),[h,_e]=C(!1),Te=yn("build",c,d,S),[ge,Ke]=C("");if(ue(()=>{let L=!0;return de(null),z(null),En({source:t,identifier:e,...i?{planText:i}:{}}).then((x)=>{if(L)de(x),q(x.postPlan)},(x)=>{if(L)z(xn(x))}),()=>{L=!1}},[e,t.sessionId,i]),ue(()=>{let L=!0;return Promise.all([n?Promise.resolve(n):le(Be,{id:e}).then((x)=>x.issue),Tt().catch(()=>!0)]).then(([x,me])=>{if(!L)return;f(x),m(me),gt(x.team.id).then((Z)=>{if(L)T(Z)},()=>{return})},(x)=>{if(L)p(xn(x))}),()=>{L=!1}},[e,n]),M)return a("div",{class:"lin-build","data-state":"started",children:a("div",{class:"sui-small",children:M},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(_)return a(Re,{tone:"error",title:"Could not read the issue",body:_,action:{label:"Close",onClick:r}},void 0,!1,void 0,this);if(!c)return a(rt,{label:"Reading the issue"},void 0,!1,void 0,this);let Ce=async()=>{b(!0),g(null);try{let L=await At(c,t,h,i);ie("issue"),await he(w,"success",L.document?`Added a concise plan to ${c.identifier}, with the full plan in a linked document.`:`Added the plan to ${c.identifier}.`),E(!0)}catch(L){g(xn(L))}finally{b(!1)}},re=async()=>{b(!0),g(null);try{let L=await Zi(c,t,{move:Te.move,post:ne&&Boolean(D),force:h,state:Te.selected,lastState:d,...ge?{model:ge}:{},...i?{planText:i}:{}});if(L.moved&&L.target)yt(c.team.id,L.target.name).catch(()=>{return});if(L.moveError)await he(w,"error",`Build started, but ${c.identifier} was not moved: ${L.moveError}`);let x=`${L.postedDocument?"Added a concise plan and full plan document to the issue and started":L.posted?"Added the plan to the issue and started":"Started"} a build for ${c.identifier}${L.moved?` and moved it to ${L.target.name}`:""}.`;if(await he(w,"success",x),P(x),L.moved)ie("block:");await mn(L.sessionId),o?.()}catch(L){g(xn(L))}finally{b(!1)}};return a("div",{class:s?"lin-build lin-build--fill":"lin-build","data-state":"options",children:[a("div",{class:"sui-small",children:["Builds from the last reply in ",a("strong",{children:t.title},void 0,!1,void 0,this),t.agent?` (${t.agent} agent)`:"",", in ",Ac(t.directory),", ",D?.lead?"as a session that lead starts under it":"as a new session",". It uses the build agent from Settings, on the model below."]},void 0,!0,void 0,this),ae&&a(Re,{tone:"warning",title:"The plan cannot be read yet",body:ae},void 0,!1,void 0,this),D&&!D.isPlan&&a(Re,{tone:"warning",title:"The last reply is not a plan",body:'Ask the planning session: "Repeat the final plan in full, unchanged, as your last message. No question cards." Then reopen this. Writing or building from a chat answer would put the wrong text in the issue and the build.',action:h?void 0:{label:"Use It Anyway",onClick:()=>_e(!0)}},void 0,!1,void 0,this),D?.earlier&&a("div",{class:"sui-muted sui-small",children:"The last reply in that session is not the plan, so this is the latest reply that was."},void 0,!1,void 0,this),D&&a("pre",{class:"lin-build-plan",children:s?D.plan.trim():gi(D.plan)},void 0,!1,void 0,this),y&&a(Re,{tone:"error",title:"Could not start the build",body:y},void 0,!1,void 0,this),a(ot,{label:"Add the plan to the issue description first",description:ne?`A plan section at the end of ${c.identifier}'s description, replaced if one is already there. A long plan becomes a concise summary with a linked full-plan document. Then the build starts.`:void 0,checked:ne&&Boolean(D),disabled:!D||O,onChange:q},void 0,!1,void 0,this),a(An,{choice:Te,disabled:O},void 0,!1,void 0,this),a(gn,{role:"build",directory:t.directory,value:ge,onChange:Ke,disabled:O},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(fe,{label:O?"Starting...":ne&&D?"Write Plan and Build":"Start Build",size:"sm",disabled:O||!D||!D.isPlan&&!h,onClick:()=>{re()}},void 0,!1,void 0,this),a(fe,{label:V?"Plan Written":"Write Plan",variant:"outline",size:"sm",disabled:O||!D||!D.isPlan&&!h,onClick:()=>{Ce()}},void 0,!1,void 0,this),a(fe,{label:"Cancel",variant:"ghost",size:"sm",disabled:O,onClick:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},na=(e,t)=>{let[n,r]=C(void 0);return ue(()=>{let o=!0;if(r(void 0),!e){r(null);return}return Fi(e,t).then((s)=>{if(o)r(s)},()=>{if(o)r(null)}),()=>{o=!1}},[e,t]),n},xc="Plan first: click Plan to start a planning session for this issue. Write Plan and Build work once it has a plan.",ra=({identifier:e,source:t,size:n,onBuild:r,building:o})=>{if(t)return a(xe,{children:[a(ea,{identifier:e,source:t,size:n},void 0,!1,void 0,this),a(fe,{label:"Build",variant:"outline",size:n,disabled:o,onClick:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this);let s=t===null?xc:void 0;return a("span",{class:"lin-inline lin-plan-first",title:s,"aria-label":s,children:[a(fe,{label:"Write Plan",variant:"outline",size:n,disabled:!0,onClick:()=>{return}},void 0,!1,void 0,this),a(fe,{label:"Build",variant:"outline",size:n,disabled:!0,onClick:()=>{return}},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Rc=async(e)=>{let t=await le(Hs,{filter:ui(e)}),n=new Map;for(let o of t.issues.nodes)n.set(o.identifier.toUpperCase(),o);let r=[...new Set(t.issues.nodes.filter((o)=>o.state.type==="started").map((o)=>o.team.id))];if(r.length>0)try{qs(pi((await le(Vs,{teamIds:r})).workflowStates.nodes))}catch{}return n},oa=(e)=>St(e.length>0?`block:${e.join(",")}`:null,()=>Rc(e));var st=({ids:e,children:t})=>{let n=oa(e);if(n.data)return a(xe,{children:t(n.data)},void 0,!1,void 0,this);if(n.error){let r=n.error instanceof ce?n.error:new ce("network",String(n.error));if(r.kind==="disconnected")return a(Wi,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber to see these issues.",action:{label:"Connect Linear",onClick:()=>{w.oauthStart()}}},void 0,!1,void 0,this);return a(Re,{tone:"error",title:"Could not load from Linear",body:r.message,action:{label:"Retry",onClick:()=>n.refresh()}},void 0,!1,void 0,this)}return a("div",{class:"lin-block-wait",children:a(rt,{label:"Loading from Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},xt=({skipped:e,cut:t})=>{if(e.length===0&&t===0)return null;let n=[e.length>0?`Not an issue key: ${e.join(", ")}.`:"",t>0?`${t} more not shown.`:""].filter(Boolean);return a("div",{class:"sui-small sui-muted",children:n.join(" ")},void 0,!1,void 0,this)},it=({id:e})=>a("div",{class:"lin-block-missing sui-small sui-muted",children:[a("span",{class:"sui-mono",children:e},void 0,!1,void 0,this),a("span",{children:"Not found in Linear, or you cannot see it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Qr=(e)=>e instanceof Error?e.message:String(e),sa=({issue:e,plan:t,onClose:n})=>{let r=t?"plan":"session",[o,s]=C(null),[i,c]=C(null),[f,_]=C(!0),[p,S]=C(!0),[m,d]=C(!1),[T,O]=C(null),[b,y]=C(null),[g,M]=C(null),[P,D]=C(null),[de,ae]=C(null),[z,ne]=C(0),[q,V]=C(null),[E,h]=C(null),_e=Qe()?.directory??null,Te=yn(t?"plan":"session",o,q,p),[ge,Ke]=C("");if(ue(()=>{let x=!0;return s(null),c(null),Promise.all([le(Be,{id:e.identifier}),Tt().catch(()=>!0),gt(e.team.id).catch(()=>null),_n().catch(()=>!1)]).then(([me,Z,F,Y])=>{if(!x)return;s(me.issue),S(Z),V(F),M(Y),Hi(_e,me.issue.branchName).then((at)=>{if(x)D(at)})},(me)=>{if(x)c(Qr(me))}),()=>{x=!1}},[e.identifier]),E)return a("div",{class:"lin-block-start","data-state":"started",children:a("div",{class:"sui-small",children:E},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(i)return a("div",{class:"lin-block-start",children:a(Re,{tone:"error",title:"Could not read the issue",body:i,action:{label:"Close",onClick:n}},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(!o)return a("div",{class:"lin-block-start",children:a(rt,{label:"Reading the issue"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let Ce=T??P,re=zr(o.branchName,z),L=async()=>{d(!0),ae(null);try{let x=await(t?Bi:$i)(o,{worktree:f,move:Te.move,existing:Ce,branch:re,state:Te.selected,directoryHint:_e,...t&&ge?{model:ge}:{},...t&&g!==null?{lead:g,existingSession:b}:{}});if(!x.started){O(x.directory),y(x.session??null),ae(x.error??null);return}if(x.moveError)await he(w,"error",`The ${r} started, but ${o.identifier} was not moved: ${x.moveError}`);if(!t&&x.moved&&x.target)yt(o.team.id,x.target.name).catch(()=>{return});let me=`Started a ${r} for ${o.identifier}${x.moved?` and moved it to ${x.target.name}`:""}.`;if(await he(w,"success",me),h(me),x.moved)ie("block:");await mn(x.sessionId)}catch(x){let me=f&&!Ce;if(me)ne((F)=>F+1);let Z=me?` A branch named ${re} may already exist. Start again to try ${zr(o.branchName,z+1)}, or turn off "Work in a new worktree".`:"";ae(`${Qr(x).replace(/\.+$/,"")}.${Z}`),await he(w,"error",`Could not start a ${r}: ${Qr(x)}`)}finally{d(!1)}};return a("div",{class:"lin-block-start","data-state":"options",children:[T&&a(Re,{tone:"warning",title:`The worktree is ready, but the ${r} did not start`,body:`Retry starts the ${r} in ${T}.`},void 0,!1,void 0,this),!T&&P&&a(Re,{tone:"info",title:"This issue already has a worktree",body:`The session starts in ${P}, on branch ${o.branchName}.`},void 0,!1,void 0,this),t&&!T&&a("div",{class:"sui-muted sui-small",children:g?"Makes the worktree with one lead session. The lead starts the plan as a session nested under it, with the plan agent from Settings on the model below, and later the build the same way. The plan changes no files.":"Makes the worktree, then starts a planning session in it with the plan agent from Settings, on the model below. It plans and stops: it changes no files."},void 0,!1,void 0,this),de&&a(Re,{tone:"error",title:`Could not start a ${r}`,body:de},void 0,!1,void 0,this),a(ot,{label:Ce?"Work in the existing worktree":"Work in a new worktree",description:`Branch ${re}`,checked:f||Boolean(Ce),disabled:Boolean(Ce)||m,onChange:_},void 0,!1,void 0,this),a(An,{choice:Te,disabled:m},void 0,!1,void 0,this),t&&a(gn,{role:"plan",directory:_e,value:ge,onChange:Ke,disabled:m},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(fe,{label:m?"Starting...":T?"Retry in That Worktree":P?"Start in That Worktree":t?"Start Plan":"Start Session",size:"sm",disabled:m,onClick:()=>{L()}},void 0,!1,void 0,this),a(fe,{label:"Cancel",variant:"ghost",size:"sm",disabled:m,onClick:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var Oc=({issue:e})=>{let[t,n]=C(null),r=na(Qe()?.directory??null,e.identifier),o=e.labels.nodes;return a(bs,{class:"lin-block-card",children:[a("div",{class:"lin-block-title",children:[a(ht,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:16},void 0,!1,void 0,this),a("span",{class:"lin-block-key sui-mono sui-muted",children:e.identifier},void 0,!1,void 0,this),a("span",{class:"lin-block-name",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),a(ks,{items:[["Status",a("span",{class:"lin-block-value",children:[a(ht,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this),e.state.name]},void 0,!0,void 0,this)],["Priority",a("span",{class:"lin-block-value",children:[a(an,{priority:e.priority},void 0,!1,void 0,this),Ii[e.priority]]},void 0,!0,void 0,this)],["Assignee",e.assignee?a("span",{class:"lin-block-value",children:[a(tt,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this),e.assignee.name]},void 0,!0,void 0,this):a("span",{class:"sui-muted",children:"Unassigned"},void 0,!1,void 0,this)],...e.project?[["Project",a("span",{class:"lin-block-value",children:[a(cn,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),e.project.name]},void 0,!0,void 0,this)]]:[],...o.length>0?[["Labels",a("span",{class:"lin-block-value lin-block-chips",children:o.map((s)=>a(ln,{label:s},s.id,!1,void 0,this))},void 0,!1,void 0,this)]]:[],...e.dueDate?[["Due",a(se,{children:be(e.dueDate)},void 0,!1,void 0,this)]]:[],["Updated",a("span",{class:"sui-muted",children:vs(e.updatedAt)},void 0,!1,void 0,this)]]},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(fe,{label:"Open in Linear",variant:"outline",size:"sm",onClick:()=>{w.openUrl(e.url)}},void 0,!1,void 0,this),a(fe,{label:"Start Session",variant:"outline",size:"sm",disabled:t==="session",onClick:()=>n("session")},void 0,!1,void 0,this),a(fe,{label:"Plan",variant:"outline",size:"sm",disabled:t==="plan",onClick:()=>n("plan")},void 0,!1,void 0,this),a(ra,{identifier:e.identifier,source:r,size:"sm",building:t==="build",onBuild:()=>n("build")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),(t==="session"||t==="plan")&&a(sa,{issue:e,plan:t==="plan",onClose:()=>n(null)},void 0,!1,void 0,this),t==="build"&&r&&a("div",{class:"lin-block-start",children:a(ta,{identifier:e.identifier,source:r,onClose:()=>n(null)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},ia=({args:e})=>{let{ids:t}=nt(e.id),n=t[0];if(!n)return a("div",{class:"sui-muted",children:"LinearIssue needs an issue identifier such as ENG-123."},void 0,!1,void 0,this);return a(st,{ids:[n],children:(r)=>{let o=r.get(n);return o?a(Oc,{issue:o},void 0,!1,void 0,this):a(it,{id:n},void 0,!1,void 0,this)}},void 0,!1,void 0,this)};var Ic=new Set(["id","status","assignee","priority","project","dueDate","cycle","estimate","labels","links","created","changes"]),Rn=({issue:e,selected:t,cursor:n,properties:r=Ic,hideProject:o,compact:s,subIssues:i,extras:c,depth:f=0,disabled:_,onOpen:p})=>a("button",{type:"button",class:"lin-issue-row","aria-selected":t?"true":"false",disabled:_,"data-cursor":n?"true":"false","data-issue":e.identifier,"data-depth":f||void 0,style:f?{paddingLeft:`${8+f*22}px`}:void 0,onClick:()=>p(e),title:e.title,children:[r.has("priority")||s?a(an,{priority:e.priority},void 0,!1,void 0,this):null,r.has("id")||s?a("span",{class:"lin-issue-key sui-mono",children:e.identifier},void 0,!1,void 0,this):null,r.has("status")||s?a(ht,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this):null,a("span",{class:"lin-issue-title",children:e.title},void 0,!1,void 0,this),!s&&a("span",{class:"lin-issue-meta",children:a(ii,{issue:e,properties:r,subIssues:i,hideProject:o,extras:c},void 0,!1,void 0,this)},void 0,!1,void 0,this),(r.has("assignee")||s)&&(e.assignee?a("span",{class:"lin-meta-assignee",title:e.assignee.name,children:a(tt,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this):a("span",{class:"lin-avatar-empty","aria-label":"No assignee"},void 0,!1,void 0,this)),!s&&r.has("created")&&a("span",{class:"lin-meta-created sui-small sui-muted",title:"Created",children:be(e.createdAt)},void 0,!1,void 0,this),!s&&r.has("updated")&&a("span",{class:"lin-meta-updated sui-small sui-muted",title:"Updated",children:be(e.updatedAt)},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Zr=new Set(["id","status","assignee","priority","labels","dueDate"]),aa=({args:e})=>{let{ids:t,skipped:n,cut:r}=nt(e.ids),o=li(e.title);if(t.length===0)return a(_t,{title:o||void 0,children:[a("div",{class:"sui-muted",children:"No issue identifiers to show."},void 0,!1,void 0,this),a(xt,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return a(_t,{title:o||void 0,children:[a(st,{ids:t,children:(s)=>a("div",{class:"lin-groups lin-block-rows",children:t.map((i)=>{let c=s.get(i);return c?a(Rn,{issue:c,properties:Zr,onOpen:(f)=>{w.openUrl(f.url)}},i,!1,void 0,this):a(it,{id:i},i,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(xt,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var ca=({args:e,answered:t})=>{let{ids:n,skipped:r,cut:o}=nt(e.ids),s=di(e.question),[i,c]=C(null),[f,_]=C(!1),p=t??i,S=Hr(t)??i,m=async(d)=>{if(f||p)return;_(!0);try{await w.answerBlock(fi(d)),c(d.identifier)}catch(T){await he(w,"error",`Could not send your choice: ${T instanceof Error?T.message:String(T)}`)}finally{_(!1)}};return a(_t,{title:s||"Pick an issue",children:[n.length===0?a("div",{class:"sui-muted",children:"No issues to choose from."},void 0,!1,void 0,this):a(st,{ids:n,children:(d)=>a("div",{class:"lin-groups lin-block-rows","data-answered":p?"true":"false",children:n.map((T)=>{let O=d.get(T);return O?a(Rn,{issue:O,properties:Zr,selected:S===T,disabled:Boolean(p)||f,onOpen:(b)=>{m(b)}},T,!1,void 0,this):a(it,{id:T},T,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(xt,{skipped:r,cut:o},void 0,!1,void 0,this),p?a("div",{class:"sui-small sui-muted","data-state":"answered",children:t?`${Hr(t)?"You chose":"You answered"}: ${t}`:`You chose ${i}.`},void 0,!1,void 0,this):n.length>0&&a("div",{class:"sui-small sui-muted",children:"Click an issue to choose it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var bc=({call:e})=>{switch(e.name){case"LinearIssue":return a(ia,{args:e.args},void 0,!1,void 0,this);case"LinearIssueList":return a(aa,{args:e.args},void 0,!1,void 0,this);case"LinearPickIssue":return a(ca,{args:e.args,answered:e.answered},void 0,!1,void 0,this);default:return a("div",{class:"sui-muted",children:["The Linear+ extension has no block called ",e.name.slice(0,40),"."]},void 0,!0,void 0,this)}},kc=()=>{Qe();let[e,t]=C(null),n=Ge(null);return ue(()=>w.onBlock(t),[]),ue(()=>{let r=n.current;if(!r)return;let o=0,s=new ResizeObserver(()=>{let i=Math.min(Math.ceil(r.getBoundingClientRect().height),Ct);if(i===o)return;o=i,w.setHeight(i).catch(()=>{return})});return s.observe(r),()=>s.disconnect()},[]),a("div",{class:"lin-block",ref:n,style:{maxHeight:Ct},children:e?a(bc,{call:e},`${e.name}:${JSON.stringify(e.args)}`,!1,void 0,this):a("div",{class:"sui-muted",children:"Waiting for the agent"},void 0,!1,void 0,this)},void 0,!1,void 0,this)};ts(a(kc,{},void 0,!1,void 0,this),document.getElementById("root"));})();

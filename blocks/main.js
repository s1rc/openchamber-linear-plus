(()=>{var P="openchamber.sdk",N=1;var An=`
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
`;function xn(e){let t=e.documentElement;if(t.hasAttribute("data-oc-scrollbar-activity"))return;t.setAttribute("data-oc-scrollbar-activity","");let n=new WeakMap;e.addEventListener("scroll",(r)=>{let o=r.target===e?t:r.target;if(!(o instanceof Element))return;if(!o.hasAttribute("data-oc-scrolling"))o.setAttribute("data-oc-scrolling","");let s=n.get(o);if(s!==void 0)clearTimeout(s);n.set(o,setTimeout(()=>{n.delete(o),o.removeAttribute("data-oc-scrolling")},1000))},{capture:!0,passive:!0})}var Ji=`(${xn.toString()})(document);`;var On=128,Rn=65536;var Ot=128;var Rt=65536;var io=/^[a-z][a-z0-9-]{0,39}$/;var ro=(e)=>Object(e)===e&&!Array.isArray(e),bn=(e,t)=>Object.keys(e).every((n)=>t.includes(n)),oo=(e)=>String(e)===e&&e.length>=1&&e.length<=60,so=(e)=>String(e)===e&&e.length>=1&&e.length<=80,ao=(e)=>{if(!Array.isArray(e)||e.length>4)return!1;let t=new Set;for(let n of e){if(!ro(n)||!io.test(n.id)||!oo(n.label))return!1;if(n.disabled!==void 0&&n.disabled!==!0&&n.disabled!==!1)return!1;if(t.has(n.id))return!1;if(t.add(n.id),n.kind==="button"){if(!bn(n,["kind","id","label","disabled"]))return!1;continue}if(n.kind!=="select"||!bn(n,["kind","id","label","value","options","disabled"]))return!1;if(!so(n.value)||!Array.isArray(n.options)||n.options.length<1||n.options.length>16)return!1;let r=new Set;for(let o of n.options){if(!ro(o)||!bn(o,["value","label"])||!so(o.value)||!oo(o.label)||r.has(o.value))return!1;r.add(o.value)}if(!r.has(n.value))return!1}return!0};var co=["{id}","{segment}","{segments+}"];var Oc=new Set(co);var bt=960;var lo=["turn-finished","turn-failed","permission-asked","question-asked","turn-started","session-created","session-archived","session-deleted"];var bc=new Set(lo);var kt=20000000,It=256;var kn=(e)=>("bytes"in e)?e.bytes.byteLength:e.content.length,uo=(e,t)=>{if(e.path!==t.path||e.readOnly!==t.readOnly)return!1;if(e.encoding==="text"||t.encoding==="text")return e.encoding==="text"&&t.encoding==="text"&&e.content===t.content;if(e.bytes.byteLength!==t.bytes.byteLength)return!1;for(let n=0;n<e.bytes.byteLength;n+=1)if(e.bytes[n]!==t.bytes[n])return!1;return!0};var po=/^[A-Za-z0-9_-]{1,80}$/;var _o=["left","right","top","bottom"];var fo=(e,t=0,n={remaining:16000})=>{if(--n.remaining<0||t>=32)return!1;if(e===null)return!0;let r=Array.isArray(e)?e:Object(e)===e?Object.values(e):[];for(let o of r)if(!fo(o,t+1,n))return!1;return!0},In=(e)=>{if(e===null||e===!0||e===!1)return!0;if(Array.isArray(e))return Object.keys(e).every((t)=>/^(0|[1-9]\d*)$/.test(t)&&Number(t)<e.length)&&e.every(In);if(Object(e)===e){let t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype)&&Object.values(e).every(In)}return String(e)===e||Number.isFinite(e)},Cn=(e)=>{try{if(String(e.id)!==e.id||!po.test(e.id)||!Number.isFinite(e.anchor.x)||Math.abs(e.anchor.x)>1e5||!Number.isFinite(e.anchor.y)||Math.abs(e.anchor.y)>1e5||!Number.isFinite(e.anchor.width)||!Number.isFinite(e.anchor.height)||e.anchor.width<=0||e.anchor.height<=0||e.anchor.width>1e5||e.anchor.height>1e5||!Number.isInteger(e.width)||e.width<160||e.width>640||!Number.isInteger(e.height)||e.height<48||e.height>480||e.side!==void 0&&!_o.includes(e.side)||e.focus!==void 0&&e.focus!==!0&&e.focus!==!1||!fo(e.data)||!In(e.data))return!1;return JSON.stringify(e.data).length<=16000}catch{return!1}};var wn=2000;var Eo=["file","directory","other","missing"],Mn=(e)=>Boolean(e&&"sessionId"in e),Un=(e)=>Boolean(e&&"sent"in e&&!("sessionId"in e));var So=/^[0-9a-f]{7,64}$/i,Pn=(e)=>So.test(e),Ct=500,vt=32000,ho=16000,To=128,go=200,yo=2000,Ao=16000,xo=80,Oo=200,Ro=16000;var bo=2000;var Nn=20000,wt=1024,Mt=2000000;var Ut=64000,Pt=8000,Ln=4000;var Dn=960000;var ko=999,Io=1e4,it=500,Co=["HOST_UNAVAILABLE","HOST_TIMEOUT","HOST_REJECTED","DISCONNECTED","DISABLED","BAD_PATH","NO_INTEGRATION","NO_SERVICE","SERVICE_FAILED","REQUEST_FAILED","RESPONSE_TOO_LARGE","NO_SESSION","SESSION_BUSY","NOT_GRANTED","NO_DIRECTORY","NOT_FOUND","FILE_TOO_LARGE","DENIED","NO_MODEL","MODEL_FAILED","UNSUPPORTED"],vo=["stopped","starting","ready","failed"],Zi=new Set(Co),wo=(e)=>Zi.has(e),Mo=(e)=>e&&wo(e)?e:"HOST_REJECTED",We=(e)=>{if(e===void 0)return!1;if(e===null||e===!0||e===!1)return!0;if(String(e)===e)return!0;if(Number(e)===e)return Number.isFinite(e);if(Array.isArray(e))return e.every(We);if(Object(e)===e)return Object.values(e).every(We);return!1},Uo=(e)=>We(e)&&JSON.stringify(e).length<=Ro,mo=(e)=>e?.trim().slice(0,Oo)??"",Ke=(e)=>{let t=e.id.trim().slice(0,To),n=e.title.trim().slice(0,go),r=e.url.trim().slice(0,yo),o=e.text?.trim().slice(0,Ao),s=e.author?.trim().slice(0,xo),i=e.kind==="pull"?"pull":"issue",c={providerId:e.providerId.trim(),id:t,title:n||t,url:r,kind:i};if(o)c.text=o;if(s)c.author=s;if(i==="pull"){let _=mo(e.branches?.head),f=mo(e.branches?.base);if(_&&f)c.branches={head:_,base:f}}if(Uo(e.data))c.data=e.data;return c},$n=(e)=>{let t=Ke(e);if(e.projectId)t.projectId=e.projectId;if(e.navigation)t.navigation=e.navigation;if(e.worktree)t.worktree=e.worktree;return t},Gn=(e)=>{let t={text:e.text.trim().slice(0,ho)};if(e.send)t.send=!0;return t},Hn=(e)=>{if(e===null||!Number.isFinite(e))return null;return Math.min(ko,Math.max(0,Math.round(e)))},Bn=(e)=>{if(!Number.isFinite(e))return 0;return Math.min(Io,Math.max(0,Math.ceil(e)))};var ze=(e)=>e.length>0&&e.length<=wt&&!e.includes("\x00")&&!e.includes("\\");var Nt=(e)=>{if(!e.startsWith("/")||e.includes("\x00")||e.includes("\\")||e.includes("://"))return!1;if(e.length>bo)return!1;return!e.split("/").some((n)=>n==="."||n==="..")},ea=new Set(vo),Vn=(e)=>Boolean(e&&"status"in e&&ea.has(String(e.status))&&!("body"in e)),Lt=(e)=>Boolean(e&&"status"in e&&"body"in e&&Number.isInteger(e.status)),Fn=(e)=>Boolean(e&&"content"in e&&String(e.content)===e.content),Xn=(e)=>Boolean(e&&"written"in e&&e.written===!0),jn=(e)=>Boolean(e&&"entries"in e&&Array.isArray(e.entries)),ta=new Set(Eo),Wn=(e)=>Boolean(e&&"kind"in e&&"size"in e&&ta.has(String(e.kind))&&Number.isFinite(e.size)),Kn=(e)=>Boolean(e&&"text"in e&&String(e.text)===e.text&&!("status"in e)),na=new Set(["workspace","shells","ready","directory","session","connection","settings","session-lifecycle","item","resolve","action","service-event","status-control-event","popover-closed","file-open","file-snapshot","file-saved","generate-late"]),ra=(e)=>Object(e)===e?e:null,vn=(e)=>String(e)===e&&e.length>0,oa=(e)=>{if(!vn(e.id))return null;if(e.ok===!0){let t={channel:P,v:N,type:"result",id:e.id,ok:!0};if(Object(e.payload)===e.payload)t.payload=e.payload;return t}if(e.ok===!1&&vn(e.error))return{channel:P,v:N,type:"result",id:e.id,ok:!1,error:e.error,code:Mo(vn(e.code)?e.code:void 0)};return null},zn=(e)=>{let t=ra(e);if(!t||t.channel!==P||t.v!==N)return null;if(t.type==="result")return oa(t);if(!na.has(String(t.type))||Object(t.payload)!==t.payload)return null;return t};var Po=(e)=>("key"in e)&&("metaKey"in e)&&("ctrlKey"in e),sa=(e)=>(e.metaKey||e.ctrlKey)&&!e.altKey&&!e.shiftKey&&e.key.toLowerCase()==="s";class k extends Error{code;constructor(e,t){super(t);this.name="HostRequestError",this.code=e}}var No=()=>Promise.reject(new k("BAD_PATH",'Request path must start with "/" and stay on the declared origin.')),Dt=()=>Promise.reject(new k("BAD_PATH",`File path must be 1 to ${wt} characters without NUL or backslash.`)),$t=(e)=>{if(e===void 0)return;if(Object(e)!==e||Array.isArray(e)||e.scope!==void 0&&e.scope!=="instance"&&e.scope!=="device")throw new k("HOST_REJECTED",'Storage scope must be "instance" or "device".');return e.scope==="device"?"device":void 0},v=(e)=>(e.value+=1,`oc-${e.value}`),qn=(e={})=>{let t=e.target??("window"in globalThis?window:null);if(!t)throw new k("HOST_UNAVAILABLE","No window. connectHost runs in a browser frame.");let n=e.acceptSource??((l)=>l===t.parent),r=e.requestTimeoutMs??Nn,o=new Set,s=new Set,i=new Set,c=new Set,_=new Set,f=new Set,p=new Set,h=new Set,E=new Set,u=new Set,S=new Set,O=new Set,R=[],y=null,T=null,U=new Set,I=new Set,se=null,ae=null,ce=!1,V=new Map,ie=new Map,W=new Map,H=!1,m={value:0},g=null,ne=null,Se=!1,Ce=!1,F=null,_e=(l)=>{if(!l)return null;return{sessionId:l.id,phase:l.busy?"started":"completed"}},M=(l)=>{t.parent.postMessage(l,"*")},J=()=>{if(H||t.parent===t||O.size===0||g?.features?.lateGenerateResults!==!0)return;M({channel:P,v:N,type:"generate-late-listen"})},B=(l,d)=>{for(let x of l)try{x(d)}catch(b){console.error(b)}},gt=(l)=>{if(!(l instanceof MessageEvent))return;if(!n(l.source))return;let d=zn(l.data);if(!d)return;if(d.type==="workspace"){let b=ie.get(d.payload.subscriptionId);if(b)B([b],d.payload.snapshot);return}if(d.type==="shells"){let b=W.get(d.payload.subscriptionId);if(b)B([b],d.payload.snapshot);return}if(d.type==="ready"){if(g=d.payload,ne=_e(d.payload.session),B(o,d.payload),B(s,d.payload.directory),B(i,d.payload.session),ne)B(c,ne);if(B(_,d.payload.connection),B(f,d.payload.settings),B(p,d.payload.item),d.payload.block)B(h,d.payload.block);J();return}if(d.type==="service-event"){B(E,d.payload);return}if(d.type==="generate-late"){if(O.size===0)R.push(d.payload);else B(O,d.payload);return}if(d.type==="directory"){if(g)g={...g,directory:d.payload.directory};B(s,d.payload.directory);return}if(d.type==="session"){if(g)g={...g,session:d.payload.session};if(!d.payload.session)ne=null;else if(ne?.sessionId!==d.payload.session.id)ne=_e(d.payload.session);B(i,d.payload.session);return}if(d.type==="session-lifecycle"){ne=d.payload,B(c,d.payload);return}if(d.type==="connection"){if(g)g={...g,connection:d.payload.connection};B(_,d.payload.connection);return}if(d.type==="settings"){if(g)g={...g,settings:d.payload.settings};B(f,d.payload.settings);return}if(d.type==="item"){if(g)g={...g,item:d.payload.item};B(p,d.payload.item);return}if(d.type==="status-control-event"){B(u,d.payload);return}if(d.type==="popover-closed"){B(S,d.payload);return}if(d.type==="action"){let b=(X)=>{if(!H)M({channel:P,v:N,type:"action-result",id:d.id,payload:X})},K=T;if(!K){b({ok:!1,error:"This extension does not handle background actions."});return}Promise.resolve().then(()=>K(d.payload)).then(()=>b({ok:!0}),(X)=>{let ee=(X instanceof Error?X.message:String(X)).trim();b({ok:!1,error:(ee||"Action failed.").slice(0,it)})});return}if(d.type==="file-open"){let b=d.payload;if(ae&&uo(ae,b))return;ae=b,B(U,d.payload);return}if(d.type==="file-saved"){B(I,d.payload.version);return}if(d.type==="file-snapshot"){let b=(ee)=>{if(!H)M({channel:P,v:N,type:"file-snapshot-result",id:d.id,payload:ee})},K=(ee)=>b({error:(ee.trim()||"Could not read the edited file.").slice(0,it)}),X=se;if(!X){K("This extension does not edit files.");return}Promise.resolve().then(()=>X(d.payload.purpose)).then((ee)=>{if(kn(ee)>kt){K(`The file is over ${kt} ${"bytes"in ee?"bytes":"characters"}.`);return}if(ee.version.length>It){K(`The snapshot version is over ${It} characters.`);return}b({snapshot:"bytes"in ee?{bytes:ee.bytes,version:ee.version}:{content:ee.content,version:ee.version}})},(ee)=>K(ee instanceof Error?ee.message:String(ee)));return}if(d.type==="resolve"){let b=(X)=>{M({channel:P,v:N,type:"resolve-result",id:d.id,payload:X})},K=y;if(!K){b({error:"This extension does not resolve commands."});return}Promise.resolve().then(()=>K(d.payload)).then((X)=>b({item:X?Ke(X):null}),(X)=>{let ee=(X instanceof Error?X.message:String(X)).trim();b({error:(ee||"Command failed.").slice(0,it)})});return}let x=V.get(d.id);if(!x)return;if(clearTimeout(x.timer),V.delete(d.id),d.ok){x.resolve(d.payload);return}x.reject(new k(d.code,d.error))};t.addEventListener("message",gt),M({channel:P,v:N,type:"hello"});let fe=(l,d=r)=>{if(H||t.parent===t)return Promise.reject(new k("HOST_UNAVAILABLE","No host frame. This page is not in an iframe."));return new Promise((x,b)=>{let K=setTimeout(()=>{V.delete(l.id),b(new k("HOST_TIMEOUT","Host did not answer in time."))},d);V.set(l.id,{resolve:x,reject:b,timer:K}),M(l)})},Q=(l)=>fe(l).then(()=>{return}),Z={channel:P,v:N},Tn=(l)=>{if(!H&&t.parent!==t)M(l)},qr=()=>Tn({...Z,type:"file-save"}),Yr=(l)=>{if(!Po(l)||!sa(l))return;l.preventDefault(),qr()},Jr=(l)=>{if(!Po(l)||l.key!=="Escape"||g?.surface!=="popover"||!g.popover)return;l.preventDefault(),to(g.popover.id,"escape").catch(()=>{return})},yt=()=>{let l=g?.surface==="popover"?g.popover:void 0;if(!l)return;let d=Se||Ce;if(F===d)return;F=d,no(l.id,d).catch(()=>{return})},At=()=>{if(g?.surface!=="popover"||Se)return;Se=!0,yt()},Qr=(l)=>{if(g?.surface!=="popover"||l.relatedTarget!==null||!Se)return;Se=!1,yt()},Zr=()=>{if(g?.surface!=="popover"||Ce)return;Ce=!0,yt()},eo=()=>{if(g?.surface!=="popover"||!Ce)return;Ce=!1,yt()},Ae=(l,d=1024)=>{if(!l.trim()||l.length>d)throw new k("HOST_REJECTED",`Identity must contain 1 to ${d} characters.`)},gn=async(l)=>{if(l.kind!=="projects")Ae(l.projectId);let d=await fe({...Z,type:"workspace-read",id:v(m),payload:l});if(!d||!("kind"in d)||!("state"in d)||d.kind!==l.kind)throw new k("HOST_REJECTED","Host did not return workspace data.");return d},yn=async(l,d)=>{if(l.kind!=="projects")Ae(l.projectId);let x=v(m);ie.set(x,d);try{await Q({...Z,type:"workspace-subscribe",id:v(m),payload:{subscriptionId:x,query:l}})}catch(b){if(ie.delete(x),!H)M({...Z,type:"workspace-unsubscribe",id:v(m),payload:{subscriptionId:x}});throw b}return()=>{if(!ie.delete(x)||H)return;M({...Z,type:"workspace-unsubscribe",id:v(m),payload:{subscriptionId:x}})}},Yi=async(l,d)=>{if(l.kind==="session")Ae(l.sessionId);if(l.kind==="project")Ae(l.projectId);let x=v(m);W.set(x,d);try{await Q({...Z,type:"shells-subscribe",id:v(m),payload:{subscriptionId:x,scope:l}})}catch(b){if(W.delete(x),!H)M({...Z,type:"shells-unsubscribe",id:v(m),payload:{subscriptionId:x}});throw b}return()=>{if(!W.delete(x)||H)return;M({...Z,type:"shells-unsubscribe",id:v(m),payload:{subscriptionId:x}})}},xt=async(l)=>{if("key"in l&&(l.key.length===0||l.key.length>On))throw new k("HOST_REJECTED","Storage key must contain 1 to 128 characters.");if(l.op==="set"&&!We(l.value))throw new k("HOST_REJECTED","Storage values must be JSON.");if(l.op==="set"&&new TextEncoder().encode(JSON.stringify(l.value)).length>Rn)throw new k("HOST_REJECTED","Storage value exceeds 64 KiB.");if(l.scope==="device"&&g?.features?.deviceStorage!==!0)throw new k("UNSUPPORTED","This host does not support device storage.");let d=await fe({...Z,type:"storage",id:v(m),payload:l});if(!d||!("storage"in d)||d.op!==l.op)throw new k("HOST_REJECTED","Host did not return storage data.");return d},to=(l,d)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===l)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):Q({...Z,type:"popover-close",id:v(m),payload:d?{id:l,reason:d}:{id:l}}),no=(l,d)=>g?.features?.popovers!==!0&&!(g?.surface==="popover"&&g.popover?.id===l)?Promise.reject(new k("UNSUPPORTED","This host does not support popovers.")):Q({...Z,type:"popover-anchor",id:v(m),payload:{id:l,active:d}});return t.addEventListener("keydown",Jr,!0),t.addEventListener("pointerover",At),t.addEventListener("pointermove",At),t.addEventListener("pointerout",Qr),t.addEventListener("focus",Zr),t.addEventListener("blur",eo),{onAction:(l)=>(T=l,()=>{if(T===l)T=null}),listProjects:async()=>{let l=await gn({kind:"projects"});if(l.kind!=="projects")throw new k("HOST_REJECTED","Expected projects.");return l},listWorktrees:async(l)=>{let d=await gn({kind:"worktrees",projectId:l});if(d.kind!=="worktrees")throw new k("HOST_REJECTED","Expected worktrees.");return d},listSessions:async(l)=>{let d=await gn({kind:"sessions",projectId:l});if(d.kind!=="sessions")throw new k("HOST_REJECTED","Expected sessions.");return d},onProjects:(l)=>yn({kind:"projects"},(d)=>{if(d.kind==="projects")l(d)}),onWorktrees:(l,d)=>yn({kind:"worktrees",projectId:l},(x)=>{if(x.kind==="worktrees")d(x)}),onSessions:(l,d)=>yn({kind:"sessions",projectId:l},(x)=>{if(x.kind==="sessions")d(x)}),onRunningShells:(l,d)=>Yi(l,d),readShellOutput:async(l,d)=>{Ae(l,Ot);let x=d?.cursor;if(x!==void 0&&(!Number.isInteger(x)||x<0))throw new k("HOST_REJECTED","Shell output cursor must be a non-negative integer.");let b=d?.tailBytes;if(b!==void 0&&(!Number.isInteger(b)||b<1||b>Rt))throw new k("HOST_REJECTED",`Shell output tailBytes must be an integer between 1 and ${Rt}.`);let X=await fe({...Z,type:"shell-output",id:v(m),payload:{shellId:l,cursor:x,tailBytes:b}});if(!X||typeof X.output!=="string"||!Number.isFinite(X.cursor))throw new k("HOST_REJECTED","Host did not return shell output.");return X},stopShell:async(l)=>{if(Ae(l,Ot),(await fe({...Z,type:"shell-stop",id:v(m),payload:{shellId:l}}))?.stopped!==!0)throw new k("HOST_REJECTED","Host did not stop the shell.");return{stopped:!0}},openSession:async(l)=>{Ae(l),await Q({...Z,type:"open-session",id:v(m),payload:{sessionId:l}})},storage:{get:async(l,d)=>{let x=$t(d),b={op:"get",key:l};if(x)b.scope=x;let K=await xt(b);return K.op==="get"&&K.found?K.value:void 0},set:async(l,d,x)=>{let b=$t(x),K={op:"set",key:l,value:d};if(b)K.scope=b;await xt(K)},delete:async(l,d)=>{let x=$t(d),b={op:"delete",key:l};if(x)b.scope=x;await xt(b)},keys:async(l)=>{let d=$t(l),x={op:"keys"};if(d)x.scope=d;let b=await xt(x);if(b.op!=="keys")throw new k("HOST_REJECTED","Expected storage keys.");return b.keys}},onReady:(l)=>{if(o.add(l),g)l(g);return()=>{o.delete(l)}},onDirectory:(l)=>{if(s.add(l),g)l(g.directory);return()=>{s.delete(l)}},onSession:(l)=>{if(i.add(l),g)l(g.session);return()=>{i.delete(l)}},onSessionLifecycle:(l)=>{if(c.add(l),ne)l(ne);return()=>{c.delete(l)}},onConnection:(l)=>{if(_.add(l),g)l(g.connection);return()=>{_.delete(l)}},onSettings:(l)=>{if(f.add(l),g)l(g.settings);return()=>{f.delete(l)}},onItem:(l)=>{if(p.add(l),g)l(g.item);return()=>{p.delete(l)}},onBlock:(l)=>{if(h.add(l),g?.block)l(g.block);return()=>{h.delete(l)}},onServiceEvent:(l)=>(E.add(l),()=>{E.delete(l)}),onStatusControl:(l)=>(u.add(l),()=>{u.delete(l)}),onPopoverClosed:(l)=>(S.add(l),()=>{S.delete(l)}),setStatusControls:(l)=>{if(g?.features?.statusControls!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support status controls."));if(!ao(l))return Promise.reject(new k("HOST_REJECTED","Status controls must have unique bounded ids and valid selected options."));return Q({...Z,type:"status-controls",id:v(m),payload:{controls:l}})},openPopover:(l)=>{if(g?.features?.popovers!==!0)return Promise.reject(new k("UNSUPPORTED","This host does not support popovers."));if(!Cn(l))return Promise.reject(new k("HOST_REJECTED","Popover requests need bounded geometry and JSON data."));return Q({...Z,type:"popover-open",id:v(m),payload:l})},closePopover:to,setPopoverAnchorActive:no,onResolve:(l)=>(y=l,()=>{if(y===l)y=null}),toast:(l)=>{let d=l.message.trim();if(!d||d.length>Ct)return Promise.reject(new k("HOST_REJECTED",`Toast message must contain 1 to ${Ct} characters.`));if(l.copy&&l.copy!==!0&&(!l.copy.text.length||l.copy.text.length>vt))return Promise.reject(new k("HOST_REJECTED",`Toast copy text must contain 1 to ${vt} characters.`));return Q({channel:P,v:N,type:"toast",id:v(m),payload:{...l,message:d}})},openUrl:(l)=>Q({channel:P,v:N,type:"open-url",id:v(m),payload:{url:l}}),openCommit:(l)=>Pn(l)?Q({channel:P,v:N,type:"open-commit",id:v(m),payload:{sha:l}}):Promise.reject(new k("HOST_REJECTED","Commit id must be 7 to 64 hex characters.")),answerBlock:(l)=>Q({channel:P,v:N,type:"block-answer",id:v(m),payload:{text:l.trim().slice(0,wn)}}),openSurface:(l)=>Q({channel:P,v:N,type:"open-surface",id:v(m),payload:{surfaceId:l}}),writeClipboard:(l)=>Q({channel:P,v:N,type:"clipboard-write",id:v(m),payload:{text:l}}),compose:(l)=>Q({channel:P,v:N,type:"compose",id:v(m),payload:l}),attach:(l)=>Q({channel:P,v:N,type:"attach",id:v(m),payload:Ke(l)}),startSession:async(l)=>{if(l.projectId!==void 0)Ae(l.projectId);let d=l.worktree;if(d&&d!==!0)if(d.kind==="existing")Ae(d.directory);else{if(d.name!==void 0)Ae(d.name,200);if(d.baseBranch!==void 0)Ae(d.baseBranch,200)}let x=await fe({channel:P,v:N,type:"start-session",id:v(m),payload:$n(l)},e.requestTimeoutMs??180000);if(!Mn(x))throw new k("HOST_REJECTED","Host did not return a session.");return x},prompt:(l)=>fe({channel:P,v:N,type:"prompt",id:v(m),payload:Gn(l)}).then((d)=>{if(!Un(d))throw new k("HOST_REJECTED","Host did not return a prompt result.");return d}),sessionLink:(l)=>Q({channel:P,v:N,type:"session-link",id:v(m),payload:Ke(l)}),close:()=>Q({channel:P,v:N,type:"close",id:v(m)}),oauthStart:()=>Q({channel:P,v:N,type:"oauth-start",id:v(m)}),oauthDisconnect:()=>Q({channel:P,v:N,type:"oauth-disconnect",id:v(m)}),request:(l)=>(Nt(l.path)?fe({channel:P,v:N,type:"request",id:v(m),payload:l}):No()).then((d)=>{if(!Lt(d))throw new k("HOST_REJECTED","Host request result was empty.");return d}),serviceRequest:(l)=>(Nt(l.path)?fe({channel:P,v:N,type:"service-request",id:v(m),payload:l}):No()).then((d)=>{if(!Lt(d))throw new k("HOST_REJECTED","Host service request result was empty.");return d}),serviceStatus:()=>fe({channel:P,v:N,type:"service-status",id:v(m)}).then((l)=>{if(!Vn(l))throw new k("HOST_REJECTED","Host did not return service status.");return l}),readFile:(l)=>(ze(l)?fe({channel:P,v:N,type:"file-read",id:v(m),payload:{path:l}}):Dt()).then((d)=>{if(!Fn(d))throw new k("HOST_REJECTED","Host did not return file content.");return d}),writeFile:(l,d)=>{if(!ze(l))return Dt();if(d.length>Mt)return Promise.reject(new k("FILE_TOO_LARGE",`Content is over ${Mt} characters.`));return fe({channel:P,v:N,type:"file-write",id:v(m),payload:{path:l,content:d}}).then((x)=>{if(!Xn(x))throw new k("HOST_REJECTED","Host did not confirm the write.");return x})},listDir:(l)=>(ze(l)?fe({channel:P,v:N,type:"file-list",id:v(m),payload:{path:l}}):Dt()).then((d)=>{if(!jn(d))throw new k("HOST_REJECTED","Host did not return directory entries.");return d}),stat:(l)=>(ze(l)?fe({channel:P,v:N,type:"file-stat",id:v(m),payload:{path:l}}):Dt()).then((d)=>{if(!Wn(d))throw new k("HOST_REJECTED","Host did not return file status.");return d}),generate:(l)=>{let d=l.prompt.trim(),x=l.system?.trim();if(d.length===0||d.length>Ut)return Promise.reject(new k("HOST_REJECTED",`Prompt must be 1 to ${Ut} characters.`));if(x!==void 0&&(x.length===0||x.length>Pt))return Promise.reject(new k("HOST_REJECTED",`System prompt must be 1 to ${Pt} characters.`));let b=l.maxOutputTokens===void 0?void 0:Math.min(Ln,Math.max(1,Math.floor(l.maxOutputTokens)));if(b!==void 0&&!Number.isFinite(b))return Promise.reject(new k("HOST_REJECTED","maxOutputTokens must be a number."));let K={prompt:d};if(x!==void 0)K.system=x;if(b!==void 0)K.maxOutputTokens=b;return fe({channel:P,v:N,type:"generate",id:v(m),payload:K},e.requestTimeoutMs??Dn).then((X)=>{if(!Kn(X))throw new k("HOST_REJECTED","Host did not return generated text.");return X})},onLateGenerateResult:(l)=>{O.add(l);for(let d of R.splice(0))B([l],d);return J(),()=>{O.delete(l)}},setBadge:(l)=>Q({channel:P,v:N,type:"badge",id:v(m),payload:{count:Hn(l)}}),setHeight:(l)=>Q({channel:P,v:N,type:"resize",id:v(m),payload:{height:Bn(l)}}),onFileOpen:(l)=>{if(U.add(l),!ce)ce=!0,t.addEventListener("keydown",Yr,!0);if(ae)l(ae);return()=>{U.delete(l)}},onFileSnapshot:(l)=>(se=l,()=>{if(se===l)se=null}),onFileSaved:(l)=>(I.add(l),()=>{I.delete(l)}),reportFileChange:(l)=>Tn({...Z,type:"file-change",payload:{dirty:l.dirty,edited:l.edited}}),requestFileSave:qr,reportFileUnsupported:()=>Tn({...Z,type:"file-unsupported"}),dispose:()=>{for(let l of ie.keys())M({...Z,type:"workspace-unsubscribe",id:v(m),payload:{subscriptionId:l}});ie.clear();for(let l of W.keys())M({...Z,type:"shells-unsubscribe",id:v(m),payload:{subscriptionId:l}});if(W.clear(),H=!0,y=null,T=null,se=null,U.clear(),I.clear(),ce)t.removeEventListener("keydown",Yr,!0);t.removeEventListener("message",gt),t.removeEventListener("keydown",Jr,!0),t.removeEventListener("pointerover",At),t.removeEventListener("pointermove",At),t.removeEventListener("pointerout",Qr),t.removeEventListener("focus",Zr),t.removeEventListener("blur",eo);for(let l of V.values())clearTimeout(l.timer),l.reject(new k("HOST_UNAVAILABLE","Host client was disposed."));V.clear(),o.clear(),s.clear(),i.clear(),c.clear(),_.clear(),f.clear(),p.clear(),h.clear(),E.clear(),u.clear(),S.clear(),O.clear(),R.length=0}}};var Lo=["browser.open","browser.snapshot","browser.click","browser.type","browser.select","browser.scroll","browser.back","browser.forward","browser.inspect","browser.capture","browser.resize","browser.close"];var Bc=new Set(Lo);var Do=["none","agent","user"];var Fc=new Set(Do);var L,Ho,ia,De,Yn,Xt,Bo,Ht,Vo,Qn,Jn,aa,at=Symbol.for("pv"),jt={},Wt=[],ca=/^m(i|n|o|s|text|space)$/,Zn=Array.isArray,Fo=Wt.slice,Ve=Object.assign;function Be(e){e&&e.parentNode&&e.remove()}function Bt(e,t,n,r,o){var s={type:e,props:t,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__c:null,constructor:at,__v:o||++Ho,__i:-1,__u:0};return!o&&L.vnode&&L.vnode(s),s}function ke(e){return e.children}function Vt(e,t){this.props=e,this.context=t,this.__g=0}function $e(e,t){if(t==null)return e.__&&$e(e.__,e.__i+1);for(var n;t<e.__k.length;t++)if((n=e.__k[t])&&n.__e)return n.__e;return typeof e.type!="function"||e.props.__P?null:$e(e)}function la(e){var t,n=e.__v,r=n.__e,o=[],s=[],i=e.__P;i&&((t=Ve({constructor:at},n)).__v=n.__v+1,L.vnode&&L.vnode(t),er(i,t,n,e.__n,i.namespaceURI,32&n.__u?[r]:null,o,r||$e(n),32&n.__u,s),t.__v=n.__v,t.__.__k[t.__i]=t,qo(o,t,s),n.__=n.__e=null,t.__e!=r&&Xo(t))}function Xo(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(t){return t&&(e.__e=t.__e)}),Xo(e)}function $o(e){(8&e.__g||(e.__g|=8,De.push(e),Xt++))&&Yn==L.debounceRendering||((Yn=L.debounceRendering)||queueMicrotask)(jo)}function jo(){try{for(var e,t=1;De.length;)De.length>t&&De.sort(Bo),e=De.shift(),t=De.length,8&e.__g&&la(e)}finally{(Xt=De.length)&&(Yn||queueMicrotask)(jo)}}function Wo(e,t,n,r,o,s,i,c,_,f,p){var h,E,u,S,O,R,y=r.__k||Wt,T=t.length;for(_=da(n,t,y,_,T),h=0;h<T;h++)(u=n.__k[h])!=null&&(E=~u.__i&&y[u.__i]||jt,u.__i=h,R=er(e,u,E,o,s,i,c,_,f,p),S=u.__e,(E.ref!=u.ref||8&E.__u)&&(E.ref&&tr(E.ref,null,u,E),u.ref&&p.push(u.ref,u.__c||S,u)),O=O||S,4&u.__u?(_=Ko(u,_,e,!E.__v),E.__e&&(E.__e=null)):typeof u.type=="function"&&R!==void 0?_=R:S&&(_=S.nextSibling),u.__u&=-21);return n.__e=O,_}function da(e,t,n,r,o){var s,i,c,_,f,p,h,E,u,S=n.length,O=S,R=0,y=0,T=e.__k=Array(o);for(s=0;s<o;s++)(i=t[s])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor===String?i=T[s]=Bt(null,i):Zn(i)?i=T[s]=Bt(ke,{children:i}):i.constructor===at&&i.__b?i=T[s]=Bt(i.type,i.props,i.key,i.ref,i.__v):T[s]=i,_=s+R,i.__=e,i.__b=e.__b+1,c=null,~(f=i.__i=ua(i,n,_,O))&&(O--,(c=n[f])&&(c.__u|=2)),c&&c.__v?(i.__u|=16,f==_-1?R--:f==_+1?R++:f!=_&&(f>_?R--:R++,y=1)):(~f||(o>S?R--:o<S&&R++),typeof i.type!="function"&&(i.__u|=4))):T[s]=null;if(y){for(p=[],h=[],s=0;s<o;s++)if((i=T[s])&&16&i.__u){for(R=0,E=p.length;R<E;)p[u=R+E>>1]<i.__i?R=u+1:E=u;p[R]=i.__i,h[s]=R+1}for(R=p.length;s--;)h[s]&&(h[s]==R?R--:T[s].__u|=4)}if(O)for(s=0;s<S;s++)!(c=n[s])||2&c.__u||(c.__e==r&&(r=$e(c)),nr(c,c));return r}function Ko(e,t,n,r){var o,s,i,c;if(typeof e.type=="function"){if(e.props.__P)return t;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,t=Ko(o[s],t,n,!1));return t}for(t&&!t.parentNode&&(t=$e(e))&&!t.parentNode&&(t=null),i=e.__e,c=t;c&&c.nodeType==8;)c=c.nextSibling;for(i!=c&&(!r&&n.moveBefore&&i.parentNode?n.moveBefore(i,t):n.insertBefore(i,t||null)),t=i;(t=t&&t.nextSibling)&&t.nodeType==8&&!t.data.startsWith("$s"););return t}function ua(e,t,n,r){var o,{key:s,type:i}=e,c=t[n],_=c&&!(2&c.__u);if(c===null&&s==null||_&&s==c.key&&i==c.type)return n;if(r>(_?1:0)){for(o=n-1;o>=0;o--)if((c=t[o])&&!(2&c.__u)&&s==c.key&&i==c.type)return o;for(o=n+1;o<t.length;o++)if((c=t[o])&&!(2&c.__u)&&s==c.key&&i==c.type)return o}return-1}function Go(e,t,n){n==null&&(n=""),t[0]=="-"?e.setProperty(t,n):e[t]=n}function Gt(e,t,n,r,o){var s,i;if(t=="style")if(typeof n=="string")e.style.cssText=n;else{if(typeof r=="string"&&(e.style.cssText=r=""),r)for(t in r)n&&t in n||Go(e.style,t);if(n)for(t in n)r&&n[t]==r[t]||Go(e.style,t,n[t])}else if(t[0]=="o"&&t[1]=="n")typeof n!="function"&&(n=null),typeof r!="function"&&(r=null),(e.__e||(e.__e={}))[t]=n,n&&r||(i=Jn[t]||(Jn[t]=pa(t)),(e.__a||(e.__a={}))[t]=Qn,s=t!=(t=t.replace(Vo,"$1")),(t=t.slice(2))[0]<"a"&&(t=t.toLowerCase()),n?e.addEventListener(t,i,s):e.removeEventListener(t,i,s));else{if(o=="http://www.w3.org/2000/svg")t=t.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(t!="width"&&t!="height"&&t!="href"&&t!="list"&&t!="form"&&t!="tabIndex"&&t!="download"&&t!="rowSpan"&&t!="colSpan"&&t!="role"&&t!="popover"&&t in e)try{return void(e[t]=n==null?"":n)}catch(c){}if(typeof n=="function")return;n==null||n===!1&&t[4]!="-"?e.removeAttribute(t):e.setAttribute(t,t=="popover"&&n==1?"":n)}}function pa(e){return function(t){var n=this.__e;if(n){if(n=n[e],t[Ht]==null)t[Ht]=Qn++;else if(t[Ht]<this.__a[e])return;return n(L.event?L.event(t):t)}}}function er(e,t,n,r,o,s,i,c,_,f){var p,h,E,u,S,O,R,y,T,U,I,se,ae,ce,V,ie,W,H,m=t.type;if(t.constructor!==at)return null;128&n.__u&&(_=32&n.__u,p=n.__c.__z)&&(t.__u|=_,h=s=[],p.nodeType==8?c=Ft(p,s):s.push(p),c=s[0]||c),(p=L.__b)&&p(t);e:if(typeof m=="function"){E=i.length;try{if(y=t.props,T=(p=m.prototype)&&p.render,U=(p=m.contextType)&&r[p.__c],I=p?U?U.props.value:p.__:r,(u=n.__c)?(t.__c=u,2&u.__g&&(u.__g|=1)):(T?t.__c=u=new m(y,I):(t.__c=u=new Vt(y,I),u.constructor=m,u.render=fa),U&&U.sub(u),u.state||(u.state={}),u.__n=r,u.__g|=8,u.__h=[],u.__k=[]),T&&(u.__s||(u.__s=u.state),m.getDerivedStateFromProps&&(u.__s==u.state&&(u.__s=Ve({},u.__s)),Ve(u.__s,m.getDerivedStateFromProps(y,u.__s)))),S=u.props,O=u.state,u.__v=t,n.__c){if(y!==S&&T&&!m.getDerivedStateFromProps&&u.componentWillReceiveProps&&u.componentWillReceiveProps(y,I),t.__v==n.__v&&!(8&u.__g)||!(4&u.__g)&&u.shouldComponentUpdate&&u.shouldComponentUpdate(y,u.__s,I)===!1){t.__v!=n.__v&&(u.props=y,u.state=u.__s,u.__g&=-9),t.__e=n.__e,t.__k=n.__k,t.__k.some(function(g){g&&(g.__=t)}),Wt.push.apply(u.__h,u.__k),u.__k=[],u.__h.length&&i.push(u),c=$e(n);break e}u.componentWillUpdate&&u.componentWillUpdate(y,u.__s,I),T&&u.componentDidUpdate&&u.__h.push(function(){u.componentDidUpdate(S,O,R)})}else T&&!m.getDerivedStateFromProps&&u.componentWillMount&&u.componentWillMount(),T&&u.componentDidMount&&u.__h.push(u.componentDidMount);u.context=I,u.props=y,u.__P=e,u.__g&=-5,se=L.__r,ae=T?25:0;do u.__g&=-9,se&&se(t),p=u.render(u.props,u.state=u.__s,u.context);while(8&u.__g&&++ae<25);T&&(Wt.push.apply(u.__h,u.__k),u.__k=[]),u.state=u.__s,u.getChildContext&&(r=Ve({},r,u.getChildContext())),T&&n.__c&&u.getSnapshotBeforeUpdate&&(R=u.getSnapshotBeforeUpdate(S,O)),ce=p&&p.type===ke&&p.key==null?p.props.children:p,y.__P&&(p=c,o=(e=y.__P).namespaceURI,_=s=null,n.props&&n.props.__P!=e&&(n.__k.some(function(g){g&&nr(g,g)}),n.__k=null),c=n.__k?$e(n,0):null),c=Wo(e,Zn(ce)?ce:[ce],t,n,r,o,s,i,c,_,f),y.__P&&(t.__e=null,c=p),t.__u&=-161,h&&h.some(Be),u.__h.length&&i.push(u),1&u.__g&&(u.__g&=-4)}catch(g){if(i.length=E,t.__v=null,_||s)if(g&&g.then){if(t.__u|=128|_,s){for(~(W=s.indexOf(c||void 0))||(W=s.length);(H=s[W-1])&&H.nodeType==8;)W--;for(;W<s.length;W++)if(H=s[W])if(s[W]=null,V){if(H==ie)break}else{if(H.nodeType!=8)break;H.data.startsWith("$s")&&(ie=Ft(V=H))}}if(!V){for(;c&&c.nodeType==8&&c.nextSibling;)c=c.nextSibling;V=c}(p=Ft(V=t.__c.__z||(t.__c.__z=V)))?(t.__e=V,c=p):t.__e=c,c=c&&c.nextSibling}else s&&s.some(Be);else t.__e=n.__e;t.__k||(t.__k=n.__k||[]),g&&g.then||zo(t),L.__e(g,t,n)}}else c=t.__e=_a(n.__e,t,n,r,o,s,i,_,f,e);return(p=L.diffed)&&p(t),c}function Ft(e,t){if(e&&e.nodeType==8&&e.data.startsWith("$s"))for(var n=1;e=e.nextSibling;){if(e.nodeType==8){if(e.data.startsWith("$s"))n++;else if(e.data.startsWith("/$s")&&!--n)return e}t&&t.push(e)}}function zo(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(zo))}function qo(e,t,n){for(var r=0;r<n.length;)tr(n[r++],n[r++],n[r++]);L.__c&&L.__c(t,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){L.__e(s,o.__v)}})}function _a(e,t,n,r,o,s,i,c,_,f){var p,h,E,u,S,O,R,y,T=n.props||jt,{props:U,type:I}=t;if(I=="svg"?o="http://www.w3.org/2000/svg":I=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((S=s[p])&&(I?S.localName==I:S.nodeType==3)){e=S,s[p]=null;break}}if(!e){if(y=f.ownerDocument||document,!I)return y.createTextNode(U);e=y.createElementNS(o,I,U.is?U:f),c&&(L.__m&&L.__m(t,s),c=!1),s=null}if(I){if(f=I=="template"&&e.content||e,s=I=="textarea"&&U.defaultValue!=null?null:s&&Fo.call(f.childNodes),!c&&s)for(T={},p=0;p<e.attributes.length;p++)T[(S=e.attributes[p]).name]=S.value;for(p in T)S=T[p],p=="dangerouslySetInnerHTML"?E=S:p=="children"||(p in U)||p=="value"&&("defaultValue"in U)||p=="checked"&&("defaultChecked"in U)||Gt(e,p,null,S,o);for(p in U)S=U[p],p=="children"?u=S:p=="dangerouslySetInnerHTML"?h=S:p=="value"?O=S:p=="checked"?R=S:c&&typeof S!="function"||T[p]===S||Gt(e,p,S,T[p],o);h?(c||E&&(h.__html==E.__html||h.__html==e.innerHTML)||(e.innerHTML=h.__html),t.__k=[]):(E&&(e.textContent=""),(I=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&ca.test(I))&&(o="http://www.w3.org/1999/xhtml"),Wo(f,Zn(u)?u:[u],t,n,r,o,s,i,s?s[0]:n.__k&&$e(n,0),c,_),s&&s.some(Be)),c&&I!="textarea"||(p="value",I=="progress"&&O==null?e.removeAttribute(p):O==null||O===e[p]&&(I!="progress"||O)||Gt(e,p,O,T[p],o),p="checked",R!=null&&R!=e[p]&&Gt(e,p,R,T[p],o))}else T===U||c&&e.data==U||(e.data=U);return e}function tr(e,t,n,r){try{typeof e=="function"?t?t.__x=e(t)||1:r&&(r=r.__c||r.__e)&&(t=r.__x)&&(r.__x=null,typeof t=="function"?t():e(null)):e.current=t}catch(o){L.__e(o,n)}}function nr(e,t,n){var r,o,s,i;if(L.unmount&&L.unmount(e),!(r=e.ref)||r.current&&r.current!=e.__e||tr(r,null,t,e),r=e.__c){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(c){L.__e(c,t)}r.__P=r.__n=null}if(r=e.__k)for(i=0;i<r.length;i++)r[i]&&nr(r[i],t,typeof e.type!="function"||n&&!e.props.__P);!n&&(r=e.__c)&&(r=r.__z)&&(o=Ft(r,s=[]))&&(r==e.__e&&s.some(Be),Be(o),Be(r)),n||Be(e.__e),e.__e=e.__c=e.__=null}function fa(e,t,n){return this.constructor(e,n)}function Yo(e,t){var n,r,o,s;L.__&&L.__(e,t),t.nodeType==9&&(t=t.documentElement),r=(n=e&&32&e.__u)?null:t.__k,t.__k=Bt(ke,{children:[e]}),o=[],s=[],er(t,t.__k,r||jt,jt,t.namespaceURI,r?null:t.firstChild?Fo.call(t.childNodes):null,o,r?r.__e:t.firstChild,n,s),qo(o,t.__k,s),t.__k.props.children=null}L={__e:function(e,t,n,r){for(var o,s,i;t=t.__;)if((o=t.__c)&&!(1&o.__g)){o.__g|=4;try{if((i=(s=o.constructor)&&s.getDerivedStateFromError)&&o.setState(s.getDerivedStateFromError(e)),o.componentDidCatch&&(o.componentDidCatch(e,r||{}),i=1),i&&8&o.__g)return void(o.__g|=2)}catch(c){e=c}}throw Xt=0,e}},Ho=0,ia=function(e){return e!=null&&e.constructor===at},Vt.prototype.setState=function(e,t){var n=this.__s;n&&n!=this.state||(n=this.__s=Ve({},this.state)),typeof e=="function"&&(e=e(Ve({},n),this.props)),e&&(Ve(n,e),this.__v&&(t&&this.__k.push(t),$o(this)))},Vt.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),$o(this))},Vt.prototype.render=ke,De=[],Xt=0,Bo=function(e,t){return e.__v.__b-t.__v.__b},Ht=Symbol(),Vo=/(PointerCapture)$|Capture$/i,Qn=0,Jn={},aa=0;var lt,re,rr,Jo,or=Object.is,Kt=0,is=[],sr=[],te=L,{__b:Qo,__r:Zo,diffed:es,__c:ts,unmount:ns,__:rs}=te;function ar(e,t){te.__h&&te.__h(re,e,Kt||t),Kt=0;var n=re.__H||(re.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function w(e){return Kt=1,ma(cs,e)}function ma(e,t,n){var r=ar(lt++,2);if(r.t=e,!r.__c&&(r.__=[n?n(t):cs(void 0,t),function(s){var i=(r.__N||r.__)[0],c=r.t(i,s);or(i,c)||(r.__N=[c,r.__[1]],r.__c.setState({}))}],r.__c=re,!re.__f)){re.__f=!0;var o=re.shouldComponentUpdate;re.shouldComponentUpdate=function(s,i,c){var _=this.__H;if(!_)return!0;var f=!1,p=this.props!=s;if(_.__.some(function(E){E.__N&&(f=!0,or(E.__[0],E.__N[0])||(p=!0))}),o){var h=o.call(this,s,i,c);return f?h||p:h}return!f||p}}return r.__}function le(e,t){var n=ar(lt++,3);!te.__s&&as(n.__H,t)&&(n.__P=!0,n.__=e,n.u=t,re.__H.__h.push(n))}function Ge(e){return Kt=5,dt(function(){return{current:e}},[])}function dt(e,t){var n=ar(lt++,7);return as(n.__H,t)&&(n.__=e(),n.__H=t),n.__}function Ea(){var e;do{for(;e=sr.shift();)try{ct(e)}catch(n){te.__e(n,{__:(e=e.__P)&&e.__v})}for(;e=is.shift();){var t=e.__H;if(e.__P&&t)try{t.__h.some(ct),t.__h.some(ir),t.__h=[]}catch(n){t.__h=[],te.__e(n,e.__v)}}}while(sr.length)}te.__b=function(e){re=null,Qo&&Qo(e)},te.__=function(e,t){e&&t.__k&&t.__k.__m&&(e.__m=t.__k.__m),rs&&rs(e,t)},te.__r=function(e){Zo&&Zo(e),lt=0;var t=(re=e.__c).__H;t&&(rr==re?re.__h=[]:(t.__h.some(ct),t.__h.some(ir),lt=0),t.__h=[],t.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})),rr=re},te.diffed=function(e){es&&es(e);var t=e.__c;t&&t.__H&&(t.__H.__h.length&&ss(is.push(t)),t.__H.__.some(function(n){n.u&&(n.__H=n.u)})),rr=re=null},te.__c=function(e,t){t.some(function(n){try{n.__h.some(ct),n.__h=n.__h.filter(function(r){return!r.__||ir(r)})}catch(r){n.__h=[function(){throw r}]}}),ts&&ts(e,t)},te.unmount=function(e){ns&&ns(e);var t,n,r=e.__c;r&&r.__H&&(r.__H.__.some(function(o){try{if(o.__P&&o.__c){if(n===void 0){for(n=e.__;n&&(!n.__c||!n.__c.__P);)n=n.__;n=n&&n.__c}o.__P=n,ss(sr.push(o))}else ct(o)}catch(s){t=s}}),r.__H=void 0,t&&te.__e(t,r.__v))};var os=typeof requestAnimationFrame=="function";function Sa(e){var t,n=function(){clearTimeout(r),os&&cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,35);os&&(t=requestAnimationFrame(n))}function ss(e){e!=1&&Jo==te.requestAnimationFrame||((Jo=te.requestAnimationFrame)||Sa)(Ea)}function ct(e){var t=re,n=e.__c;typeof n=="function"&&(e.__c=void 0,n()),re=t}function ir(e){var t=re;e.__c=e.__(),re=t}function as(e,t){return!e||e.length!=t.length||t.some(function(n,r){return!or(n,e[r])})}function cs(e,t){return typeof t=="function"?t(e):t}var ha=[["--oc-bg","background"],["--oc-elevated","elevated"],["--oc-fg","foreground"],["--oc-muted","muted"],["--oc-subtle","subtle"],["--oc-border","border"],["--oc-hover","hover"],["--oc-selection","selection"],["--oc-focus","focus"],["--oc-primary","primary"],["--oc-muted-surface","mutedSurface"],["--oc-elevated-fg","elevatedForeground"],["--oc-active","active"],["--oc-selection-fg","selectionForeground"],["--oc-primary-fg","primaryForeground"],["--oc-primary-text","primaryText"],["--oc-success-text","successText"],["--oc-warning-text","warningText"],["--oc-error-text","errorText"],["--oc-info-text","infoText"],["--oc-success","success"],["--oc-warning","warning"],["--oc-error","error"],["--oc-info","info"],["--oc-font","font"],["--oc-mono","mono"],["--oc-radius","radius"],["--surface-background","background"],["--surface-elevated","elevated"],["--surface-foreground","foreground"],["--surface-muted-foreground","muted"],["--surface-subtle","subtle"],["--interactive-border","border"],["--interactive-hover","hover"],["--interactive-selection","selection"],["--interactive-focus-ring","focus"],["--primary","primary"],["--surface-muted","mutedSurface"],["--surface-elevated-foreground","elevatedForeground"],["--interactive-active","active"],["--interactive-selection-foreground","selectionForeground"],["--primary-foreground","primaryForeground"],["--primary-text","primaryText"],["--success-text","successText"],["--warning-text","warningText"],["--error-text","errorText"],["--info-text","infoText"],["--status-success","success"],["--status-warning","warning"],["--status-error","error"],["--status-info","info"],["--font-sans","font"],["--font-mono","mono"],["--radius","radius"]],Ta=[["--oc-syntax-keyword","--syntax-keyword","syntaxKeyword"],["--oc-syntax-string","--syntax-string","syntaxString"],["--oc-syntax-number","--syntax-number","syntaxNumber"],["--oc-syntax-function","--syntax-function","syntaxFunction"],["--oc-syntax-type","--syntax-type","syntaxType"],["--oc-syntax-comment","--syntax-comment","syntaxComment"],["--oc-syntax-variable","--syntax-variable","syntaxVariable"],["--oc-syntax-operator","--syntax-operator","syntaxOperator"]],ls=(e,t)=>{t.style.colorScheme=e.mode;for(let[n,r]of ha)t.style.setProperty(n,e.tokens[r]);for(let[n,r,o]of Ta){let s=e.tokens[o]??"";t.style.setProperty(n,s),t.style.setProperty(r,s)}t.style.setProperty("font-family",e.tokens.font),t.style.setProperty("font-size","0.875rem"),t.style.setProperty("line-height","1.45"),t.style.setProperty("color",e.tokens.foreground)},cr=(e,t)=>{if(ls(e.theme,t),t.dataset)t.dataset.ocSurface=e.surface,t.dataset.ocTheme=e.theme.mode};var ga={"surface-background":"bg","surface-elevated":"elevated","surface-elevated-foreground":"elevated-fg","surface-foreground":"fg","surface-muted-foreground":"muted","surface-muted":"muted-surface","surface-subtle":"subtle","interactive-border":"border","interactive-hover":"hover","interactive-active":"active","interactive-selection":"selection","interactive-selection-foreground":"selection-fg","interactive-focus-ring":"focus",primary:"primary","primary-foreground":"primary-fg","primary-text":"primary-text","success-text":"success-text","warning-text":"warning-text","error-text":"error-text","info-text":"info-text","status-success":"success","status-warning":"warning","status-error":"error","status-info":"info","font-sans":"font","font-mono":"mono",radius:"radius"},z=(e,t)=>`var(--${e}, var(--oc-${ga[e]}, ${t}))`,we=z("surface-background","transparent"),qt=z("surface-elevated","transparent"),qe=z("surface-elevated-foreground","inherit"),he=z("surface-foreground","inherit"),q=z("surface-muted-foreground","gray"),ya=z("surface-muted","transparent"),Fe=z("interactive-border","currentColor"),me=z("interactive-hover","transparent"),Xe=z("interactive-active","transparent"),lr=z("interactive-selection","transparent"),dr=z("interactive-selection-foreground","inherit"),ve=z("primary","currentColor"),ur=z("primary-text","inherit"),pr=z("error-text","inherit"),Aa=z("font-sans","inherit"),_r=z("font-mono","monospace"),_s=z("radius","9px"),fr=`calc(${_s} - 2px)`,ds=`calc(${_s} - 4px)`,Y=(e,t,n="transparent")=>`color-mix(in srgb, ${e} ${t}%, ${n})`,us=`background-image: linear-gradient(${me}, ${me});`,mr=(e,t="0.5px")=>`box-shadow: inset 0 0 0 ${t} ${e}, var(--oc-sdk-field-lift);`,Er="border-color: var(--oc-sdk-edge); box-shadow: var(--oc-sdk-raised-lift);",ps="box-shadow: var(--oc-sdk-lit);",Sr=`inset 0 0.5px 0 0 ${Y(he,8)}, 0 1px 2px 0 rgb(0 0 0 / 0.4)`,xa=`
:root {
  --oc-sdk-edge: ${Y(he,16)};
  --oc-sdk-field-bg: ${qt};
  --oc-sdk-raised-bg: ${we};
  --oc-sdk-field-lift: inset 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --oc-sdk-raised-lift: 0 1px 1.5px 0 rgb(0 0 0 / 0.08);
  --oc-sdk-lit: inset 0 1px 0 0 rgb(255 255 255 / 0.2), 0 1px 1.5px 0 rgb(0 0 0 / 0.1);
  --oc-sdk-float-edge: rgb(0 0 0 / 0.14);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 1px 2px -0.5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.08), 0 12px 20px -4px rgb(0 0 0 / 0.06);
}
:root[data-oc-theme="dark"] {
  --oc-sdk-edge: ${Y(he,14)};
  --oc-sdk-field-bg: ${Y(we,50,qt)};
  --oc-sdk-raised-bg: ${qt};
  --oc-sdk-field-lift: ${Sr};
  --oc-sdk-raised-lift: ${Sr};
  --oc-sdk-lit: ${Sr};
  --oc-sdk-float-edge: rgb(0 0 0 / 0.55);
  --oc-sdk-float: inset 0 1px 0 0 rgb(255 255 255 / 0.04), inset 0 0 0 0.5px rgb(255 255 255 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.25), 0 4px 8px 0 rgb(0 0 0 / 0.25);
}`,zt=(e)=>{let t=z(`status-${e}`,"currentColor");return`
.oc-sdk[data-tone="${e}"], .oc-sdk [data-tone="${e}"] { --oc-sdk-tone: ${t}; --oc-sdk-tone-text: ${z(`${e}-text`,"inherit")}; }`},Oa=`
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
`,fs=`${xa}
.oc-sdk { color: ${he}; font-family: ${Aa}; }
.oc-sdk :focus-visible, .oc-sdk:focus-visible { outline: none; }
.oc-sdk :where(button, a[href], [role="button"], [role="tab"], [role="option"]):focus-visible, button.oc-sdk:focus-visible { ${us} }
.oc-sdk-mono { font-family: ${_r}; }
.oc-sdk-muted { color: ${q}; }
${zt("success")}${zt("warning")}${zt("error")}${zt("info")}
.oc-sdk[data-tone="primary"], .oc-sdk [data-tone="primary"] { --oc-sdk-tone: ${ve}; --oc-sdk-tone-text: ${ur}; }

.oc-sdk-btn { border-radius: ${fr}; transition: background 150ms ease-out, color 150ms ease-out; }
.oc-sdk-btn[data-size="xs"] { border-radius: ${ds}; }
.oc-sdk-btn[data-variant="default"] { color: ${ur}; background: ${Y(ve,10,we)}; border-color: ${Y(ve,12)}; ${ps} }
.oc-sdk-btn[data-variant="default"]:hover { background: ${Y(ve,16,we)}; }
.oc-sdk-btn[data-variant="default"]:active { background: ${Y(ve,22,we)}; box-shadow: none; }
.oc-sdk-btn[data-variant="secondary"] { background: ${ya}; color: var(--oc-fg); }
.oc-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${me}, ${me}); }
.oc-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${Xe}, ${Xe}); }
.oc-sdk-btn[data-variant="outline"] { background: var(--oc-sdk-raised-bg); color: ${qe}; ${Er} }
.oc-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${me}, ${me}); }
.oc-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${Xe}, ${Xe}); box-shadow: none; }
.oc-sdk-btn[data-variant="ghost"] { background: transparent; }
.oc-sdk-btn[data-variant="ghost"]:hover { background: ${me}; }
.oc-sdk-btn[data-variant="ghost"]:active { background: ${Xe}; }
.oc-sdk-btn[data-variant="destructive"] { --oc-sdk-tone: ${z("status-error","red")}; color: ${pr}; background: ${Y("var(--oc-sdk-tone)",7,we)}; border-color: ${Y("var(--oc-sdk-tone)",12)}; ${ps} }
.oc-sdk-btn[data-variant="destructive"]:hover { background: ${Y("var(--oc-sdk-tone)",9,we)}; }
.oc-sdk-btn[data-variant="destructive"]:active { background: ${Y("var(--oc-sdk-tone)",11,we)}; box-shadow: none; }

.oc-sdk-field-note { color: ${q}; }
.oc-sdk-field[data-invalid="true"] .oc-sdk-field-note { color: ${pr}; }
.oc-sdk-input { border-radius: ${fr}; background: var(--oc-sdk-field-bg); color: ${qe}; ${mr("var(--oc-sdk-edge)")} transition: background 150ms ease-out; }
.oc-sdk-input::placeholder { color: ${q}; }
.oc-sdk-input:hover:not(:focus) { background-image: linear-gradient(${me}, ${me}); }
.oc-sdk-input:focus, .oc-sdk-input:focus-visible { ${mr(Y(he,26),"1px")} }
.oc-sdk-field[data-invalid="true"] .oc-sdk-input, .oc-sdk-field[data-invalid="true"] .oc-sdk-input:focus { ${mr(z("status-error","red"),"1px")} }
.oc-sdk-input[data-mono="true"] { font-family: ${_r}; }

.oc-sdk-search-icon { color: ${q}; }
.oc-sdk-search[data-active="true"] .oc-sdk-search-icon { color: ${ve}; }
.oc-sdk-search-clear { border-radius: ${ds}; color: ${q}; }
.oc-sdk-search-clear:hover { background: ${me}; color: ${he}; }

.oc-sdk-trigger { border-radius: ${fr}; background: var(--oc-sdk-raised-bg); color: ${qe}; ${Er} transition: background 150ms ease-out; }
.oc-sdk-trigger:hover { background-image: linear-gradient(${me}, ${me}); }
.oc-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${Xe}, ${Xe}); }
.oc-sdk-trigger-value[data-empty="true"] { color: ${q}; }
.oc-sdk-trigger-chevron { color: ${q}; }
/* The app's floating level: the glass edge (a hairline ring and a lit top line, dark outside and light inside in dark themes) over soft shadows. The outer ring is the border, over the page like the app's. */
.oc-sdk-popup { --surface-foreground: ${qe}; border-color: var(--oc-sdk-float-edge); border-radius: 12px; background: ${qt}; background-clip: padding-box; color: ${qe}; box-shadow: var(--oc-sdk-float); }
.oc-sdk-option { border-radius: 8px; }
.oc-sdk-option[data-active="true"] { background: ${me}; }
/* A selected option shows a check mark in the text colour, like the app's own pickers. Options without the mark come
   from bundles built before it existed and keep the selection fill as their only sign of the choice. */
.oc-sdk-option[aria-selected="true"]:not([data-mark]) { background: ${lr}; color: ${dr}; }
.oc-sdk-option-check { color: ${he}; }
.oc-sdk-option[data-destructive="true"] { color: ${pr}; }
.oc-sdk-option[data-destructive="true"][data-active="true"] { background: ${Y(z("status-error","red"),10)}; }
.oc-sdk-option-hint { color: ${q}; }
.oc-sdk-popup-empty { color: ${q}; }

/* Checked stays neutral: the mark carries the state, and the primary colour stays with primary actions. */
.oc-sdk-check-box { border-color: ${Fe}; border-radius: 4px; color: ${he}; transition: border-color 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-box { border-color: ${Y(he,60,Fe)}; }
.oc-sdk-check-thumb { border-radius: 9999px; background: ${Fe}; transition: background 150ms ease-out; }
.oc-sdk-check-thumb::after { border-radius: 9999px; background: ${we}; transition: transform 150ms ease-out; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb { background: ${ve}; }
.oc-sdk-check[aria-checked="true"] .oc-sdk-check-thumb::after { transform: translateX(16px); }
.oc-sdk-check:focus-visible { box-shadow: none; }
.oc-sdk-check:focus-visible .oc-sdk-check-box, .oc-sdk-check:focus-visible .oc-sdk-check-thumb { ${us} }
.oc-sdk-check-desc { color: ${q}; }

.oc-sdk-tabs { border-radius: 10px; }
.oc-sdk-tabs[data-track="true"] { background: ${Y(he,4)}; box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.16); }
.oc-sdk-tab { border-radius: 8px; color: ${q}; transition: color 150ms ease-out, background 150ms ease-out; }
.oc-sdk-tab:hover { color: ${he}; }
.oc-sdk-tab[aria-selected="true"] { color: ${dr}; background: ${lr}; border-color: ${Fe}; }
.oc-sdk-tabs[data-track="true"] .oc-sdk-tab[aria-selected="true"] { color: ${qe}; background: var(--oc-sdk-raised-bg); ${Er} }
.oc-sdk-tab-count { color: ${q}; }

/* The app's neutral badge: a step of the text colour, the same in every theme. */
.oc-sdk-badge { border-radius: 9999px; background: ${Y(he,6)}; color: ${q}; }
.oc-sdk-badge[data-tone] { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); background: ${Y("var(--oc-sdk-tone)",15)}; }

.oc-sdk-row { border-radius: 6px; transition: background 120ms ease-out; }
.oc-sdk-row:hover, .oc-sdk-row[data-active="true"] { background: ${me}; }
.oc-sdk-row[aria-selected="true"] { background: ${lr}; color: ${dr}; }
.oc-sdk-row-lead { font-family: ${_r}; color: ${q}; }
.oc-sdk-row-sub { color: ${q}; }
.oc-sdk-row-meta { color: ${q}; }
.oc-sdk-row[aria-selected="true"] .oc-sdk-row-lead, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-sub, .oc-sdk-row[aria-selected="true"] .oc-sdk-row-meta { color: inherit; opacity: .75; }
.oc-sdk-list-empty { color: ${q}; }

.oc-sdk-empty-body { color: ${q}; }

.oc-sdk-spinner { color: ${q}; }
.oc-sdk-spinner-ring { border-color: ${Fe}; border-top-color: ${ve}; border-radius: 9999px; }

/* Set apart by its tint alone, like the app's banners. */
.oc-sdk-banner { border-color: transparent; border-radius: 8px; background: ${Y("var(--oc-sdk-tone)",10)}; }
.oc-sdk-banner-title { color: var(--oc-sdk-tone-text, var(--oc-sdk-tone)); }
.oc-sdk-banner-body { color: ${q}; }

.oc-sdk-separator { color: ${q}; }
.oc-sdk-separator::before, .oc-sdk-separator::after { background: ${Y(Fe,40)}; }

.oc-sdk-progress-label { color: ${q}; }
/* The app's progress: a groove a step of the text colour, green once done. Older bundles mark done only through aria-valuenow. */
.oc-sdk-progress-track { border-radius: 9999px; background: ${Y(he,6)}; }
.oc-sdk-progress-fill { border-radius: 9999px; background: var(--oc-sdk-tone, ${ve}); }
.oc-sdk-progress-track[aria-valuenow="100"] > .oc-sdk-progress-fill:not([data-tone]) { background: ${z("status-success","currentColor")}; }
.oc-sdk-progress[data-done="true"] .oc-sdk-progress-value { color: ${z("success-text","inherit")}; }

.oc-sdk-text a { color: ${ur}; text-decoration: underline; text-underline-offset: 2px; }
.oc-sdk-text img { border-radius: 8px; border: 1px solid ${Y(Fe,60)}; }
`,D=`
${An}
${Oa}
${fs}`;var ms="oc-sdk-ui-style",Me=(e)=>{while(e.firstChild)e.removeChild(e.firstChild)},G=(e)=>{let t=document.getElementById(ms);if(t instanceof HTMLStyleElement){if(t.textContent!==e)t.textContent=e;return}xn(document);let n=document.createElement("style");n.id=ms,n.textContent=e,document.head.appendChild(n)},A=(e,t)=>{let n=document.createElement(e);if(t)n.className=t;return n},Ee=(e)=>{let t=A("button",e);return t.type="button",t},j=(e,t)=>{let n=t??"";if(e.textContent!==n)e.textContent=n},Te=(e,t,n)=>{if(n===void 0||n===null||n==="")e.removeAttribute(t);else if(e.getAttribute(t)!==n)e.setAttribute(t,n)},Es=(e,t)=>{let n=(r)=>{if(r.target instanceof Node&&e.contains(r.target))return;t()};return document.addEventListener("pointerdown",n,!0),()=>{document.removeEventListener("pointerdown",n,!0)}};var Ra=()=>{let e=document.createElement("span");return e.className="oc-sdk-spinner-ring",e.setAttribute("aria-hidden","true"),e},Ue=(e,t)=>{G(D);let n=t,r=Ee("oc-sdk oc-sdk-btn"),o=Ra(),s=document.createElement("span");r.append(s),e.append(r);let i=()=>{if(r.dataset.variant=n.variant??"default",r.dataset.size=n.size??"default",r.disabled=Boolean(n.disabled)||Boolean(n.loading),r.dataset.loading=n.loading?"true":"false",r.setAttribute("aria-busy",n.loading?"true":"false"),n.loading&&o.parentNode!==r)r.prepend(o);else if(!n.loading&&o.parentNode===r)o.remove();j(s,n.label)},c=()=>{if(n.disabled||n.loading)return;n.onClick()};return r.addEventListener("click",c),i(),{update:(_)=>{n={...n,..._},i()},dispose:()=>{r.removeEventListener("click",c),r.remove()}}};var hr=(e,t)=>{G(D);let n=t,r=A("label","oc-sdk oc-sdk-field"),o=A("span","oc-sdk-field-label"),s=n.multiline?A("textarea","oc-sdk-input"):A("input","oc-sdk-input"),i=A("span","oc-sdk-field-note");r.append(o,s,i),e.append(r);let c=()=>{if(j(o,n.label),o.hidden=!n.label,s instanceof HTMLInputElement)s.type=n.password?"password":"text";else s.rows=n.rows??3;if(s.value!==n.value)s.value=n.value;s.disabled=Boolean(n.disabled),Te(s,"placeholder",n.placeholder),s.dataset.mono=n.mono?"true":"false";let f=Boolean(n.error);r.dataset.invalid=f?"true":"false",s.setAttribute("aria-invalid",f?"true":"false");let p=n.error??n.helper??"";j(i,p),i.hidden=p===""},_=()=>{n.onChange(s.value)};return s.addEventListener("input",_),c(),{update:(f)=>{n={...n,...f},c()},dispose:()=>{s.removeEventListener("input",_),r.remove()}}};var ba={search:"M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z",chevron:"M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z",check:"M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z",close:"M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"},xe=(e,t,n)=>{let r=document.createElementNS("http://www.w3.org/2000/svg","svg");if(r.setAttribute("viewBox","0 0 24 24"),r.setAttribute("width",String(t)),r.setAttribute("height",String(t)),r.setAttribute("aria-hidden","true"),r.setAttribute("fill","currentColor"),n)r.setAttribute("class",n);let o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d",ba[e]),r.append(o),r};var Tr=(e,t)=>{G(D);let n=t,r=A("div","oc-sdk oc-sdk-search"),o=A("input","oc-sdk-input");o.type="text",o.spellcheck=!1,o.autocomplete="off",o.setAttribute("role","searchbox");let s=Ee("oc-sdk-search-clear");s.append(xe("close",14)),s.tabIndex=-1,r.append(xe("search",16,"oc-sdk-search-icon"),o,s),e.append(r);let i=()=>{let p=n.placeholder??"Search";if(Te(o,"placeholder",p),o.setAttribute("aria-label",n.label??p),s.setAttribute("aria-label","Clear search"),o.value!==n.value)o.value=n.value;r.dataset.active=n.value.trim()===""?"false":"true"},c=()=>{if(n.value!=="")n.onChange("");o.focus()},_=()=>{n.onChange(o.value)},f=(p)=>{if(p.key==="Escape"&&o.value!=="")p.preventDefault(),c()};if(o.addEventListener("input",_),o.addEventListener("keydown",f),s.addEventListener("click",c),i(),n.autofocus)o.focus();return{update:(p)=>{n={...n,...p},i()},dispose:()=>{o.removeEventListener("input",_),o.removeEventListener("keydown",f),s.removeEventListener("click",c),r.remove()}}};var Ie=(e,t="vertical")=>{let[n,r]=t==="vertical"?["ArrowDown","ArrowUp"]:["ArrowRight","ArrowLeft"];if(e.key===n||e.ctrlKey&&e.key.toLowerCase()==="n")return"next";if(e.key===r||e.ctrlKey&&e.key.toLowerCase()==="p")return"previous";if(e.key==="Home")return"first";if(e.key==="End")return"last";return null},Pe=(e,t,n)=>{let r=e.filter((_)=>!_.disabled);if(r.length===0)return null;let o=r[0],s=r[r.length-1];if(n==="first"||!o||!s)return o?.id??null;if(n==="last")return s.id;let i=r.findIndex((_)=>_.id===t);if(i===-1)return n==="next"?o.id:s.id;return r[Math.min(r.length-1,Math.max(0,i+(n==="next"?1:-1)))]?.id??null};var Ss=(e,t)=>`${e}-${t??""}`,Yt=(e,t,n,r)=>{let o=Ee("oc-sdk-option");if(o.id=Ss(e,n.id),o.setAttribute("role",t),o.tabIndex=-1,o.disabled=Boolean(n.disabled),t==="option")o.setAttribute("aria-selected",n.selected?"true":"false");o.dataset.destructive=n.destructive?"true":"false";let s=A("span","oc-sdk-option-label");if(s.textContent=n.label,o.append(s),n.hint){let i=A("span","oc-sdk-option-hint");i.textContent=n.hint,o.append(i)}if(t==="option"){o.dataset.mark="check";let i=A("span","oc-sdk-option-check");i.append(xe("check",14)),o.append(i)}return o.addEventListener("pointerenter",r.hover),o.addEventListener("click",r.pick),o},Jt=(e,t,n,r)=>{let o=Ss(n,r);for(let s of Array.from(e.children))if(s instanceof HTMLElement&&s.classList.contains("oc-sdk-option"))s.dataset.active=s.id===o?"true":"false";Te(t,"aria-activedescendant",r?o:null),e.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})};var ka=(e,t)=>{let n=t.getBoundingClientRect();e.style.minWidth=`${Math.round(n.width)}px`,e.style.left=`${Math.round(n.left)}px`,e.style.top=`${Math.round(n.bottom+4)}px`;let r=e.offsetHeight,o=window.innerHeight-n.bottom-8;if(r>o&&n.top-8>o)e.style.top=`${Math.max(8,Math.round(n.top-4-r))}px`;let s=n.left+e.offsetWidth-window.innerWidth+8;if(s>0)e.style.left=`${Math.max(8,Math.round(n.left-s))}px`},Qt=(e,t,n,r)=>{e.append(n),ka(n,t);let o=Es(e,r),s=()=>{r()},i=(c)=>{if(c.target instanceof Node&&n.contains(c.target))return;r()};return window.addEventListener("resize",s),window.addEventListener("scroll",i,!0),()=>{o(),window.removeEventListener("resize",s),window.removeEventListener("scroll",i,!0),n.remove()}};var hs=(e,t)=>{let n=t.trim().toLowerCase();if(!n)return[...e];return e.filter((r)=>r.label.toLowerCase().includes(n)||r.id.toLowerCase().includes(n))},Ia=0,Zt=(e,t)=>{G(D);let n=t,r=`oc-sdk-select-${Ia+=1}`,o=A("div","oc-sdk oc-sdk-select"),s=A("span","oc-sdk-field-label");s.id=`${r}-label`;let i=Ee("oc-sdk-trigger");i.setAttribute("aria-haspopup","listbox"),i.setAttribute("aria-labelledby",s.id);let c=A("span","oc-sdk-trigger-value");i.append(c,xe("chevron",14,"oc-sdk-trigger-chevron")),o.append(s,i),e.append(o);let _="",f=null,p=null,h=A("div","oc-sdk oc-sdk-popup"),E=A("div","oc-sdk-popup-search"),u=A("input","oc-sdk-input");u.type="text",u.autocomplete="off",E.append(u);let S=A("div");S.setAttribute("role","listbox"),S.tabIndex=-1,h.append(S);let O=()=>hs(n.options,n.searchable?_:""),R=()=>n.searchable?u:S,y=(m)=>{f=m,Jt(S,R(),r,m)},T=()=>{Me(S);let m=O();if(m.length===0){let g=A("div","oc-sdk-popup-empty");g.textContent="No matches",S.append(g)}for(let g of m)S.append(Yt(r,"option",{...g,selected:g.id===n.value},{hover:()=>y(g.id),pick:()=>se(g.id)}));y(m.some((g)=>g.id===f)?f:m[0]?.id??null)},U=()=>{let m=p;p=null,m?.(),_="",u.value="",i.setAttribute("aria-expanded","false")},I=()=>{if(p||n.disabled)return;if(f=n.value,u.placeholder=n.searchPlaceholder??"Search",n.searchable)h.prepend(E);else E.remove();T(),p=Qt(o,i,h,U),i.setAttribute("aria-expanded","true"),R().focus()},se=(m)=>{if(U(),i.focus(),m!==n.value)n.onChange(m)},ae=()=>{if(p)U();else I()},ce=(m)=>{if(!p&&Ie(m))m.preventDefault(),I()},V=(m)=>{let g=Ie(m);if(g)m.preventDefault(),y(Pe(O(),f,g));else if(m.key==="Enter"){if(m.preventDefault(),f)se(f)}else if(m.key==="Escape")m.preventDefault(),U(),i.focus();else if(n.searchable&&m.target!==u&&m.key.length===1&&!m.ctrlKey&&!m.metaKey)u.focus()},ie=()=>{_=u.value,T()},W=(m)=>{if(p&&!(m.relatedTarget instanceof Node&&o.contains(m.relatedTarget)))U()},H=()=>{j(s,n.label),s.hidden=!n.label;let m=n.options.find((g)=>g.id===n.value);if(j(c,m?.label??n.placeholder??"Select"),c.dataset.empty=m?"false":"true",i.disabled=Boolean(n.disabled),p)T()};return i.addEventListener("click",ae),i.addEventListener("keydown",ce),h.addEventListener("keydown",V),u.addEventListener("input",ie),o.addEventListener("focusout",W),H(),{update:(m)=>{n={...n,...m},H()},dispose:()=>{U(),i.removeEventListener("click",ae),i.removeEventListener("keydown",ce),h.removeEventListener("keydown",V),u.removeEventListener("input",ie),o.removeEventListener("focusout",W),o.remove()}}};var Ts=(e,t,n)=>{G(D);let r=t,o=Ee("oc-sdk oc-sdk-check");o.setAttribute("role",n);let s=A("span",n==="switch"?"oc-sdk-check-thumb":"oc-sdk-check-box");if(n==="checkbox")s.append(xe("check",12));let i=A("span","oc-sdk-check-text"),c=A("span","oc-sdk-check-label"),_=A("span","oc-sdk-check-desc");i.append(c,_),o.append(s,i),e.append(o);let f=()=>{o.setAttribute("aria-checked",r.checked?"true":"false"),o.disabled=Boolean(r.disabled),j(c,r.label),j(_,r.description),_.hidden=!r.description},p=()=>{if(!r.disabled)r.onChange(!r.checked)};return o.addEventListener("click",p),f(),{update:(h)=>{r={...r,...h},f()},dispose:()=>{o.removeEventListener("click",p),o.remove()}}},gr=(e,t)=>Ts(e,t,"checkbox"),en=(e,t)=>Ts(e,t,"switch");var yr=(e,t)=>{G(D);let n=t,r=A("div","oc-sdk oc-sdk-tabs");r.setAttribute("role","tablist"),e.append(r);let o=()=>{Me(r),r.dataset.track=n.trackBackground?"true":"false";for(let i of n.items){let c=Ee("oc-sdk-tab");c.setAttribute("role","tab");let _=i.id===n.activeId;c.setAttribute("aria-selected",_?"true":"false"),c.tabIndex=_?0:-1,c.dataset.id=i.id;let f=A("span");if(f.textContent=i.label,c.append(f),i.count!==void 0){let p=A("span","oc-sdk-tab-count");p.textContent=String(i.count),c.append(p)}c.addEventListener("click",()=>{if(i.id!==n.activeId)n.onChange(i.id)}),r.append(c)}},s=(i)=>{let c=Ie(i,"horizontal");if(!c)return;let _=Pe(n.items,n.activeId,c);if(_&&_!==n.activeId){i.preventDefault(),n.onChange(_);let f=r.querySelector(`[data-id="${CSS.escape(_)}"]`);if(f instanceof HTMLElement)f.focus()}};return r.addEventListener("keydown",s),o(),{update:(i)=>{n={...n,...i},o()},dispose:()=>{r.removeEventListener("keydown",s),r.remove()}}};var ut=(e,t)=>{Te(e,"data-tone",t&&t!=="neutral"?t:null)},Ar=(e,t)=>{G(D);let n=t,r=A("span","oc-sdk oc-sdk-badge");e.append(r);let o=()=>{j(r,n.label),ut(r,n.tone)};return o(),{update:(s)=>{n={...n,...s},o()},dispose:()=>{r.remove()}}};var Ca=0,xr=(e,t)=>{G(D);let n=t,r=`oc-sdk-list-${Ca+=1}`,o=A("div","oc-sdk oc-sdk-list");o.setAttribute("role","listbox"),o.tabIndex=0,e.append(o);let s=null,i=(h)=>`${r}-${h}`,c=(h)=>{s=h;for(let E of Array.from(o.children))if(E instanceof HTMLElement)E.dataset.active=E.id===i(h??"")?"true":"false";Te(o,"aria-activedescendant",h?i(h):null),o.querySelector('[data-active="true"]')?.scrollIntoView({block:"nearest"})},_=(h,E)=>{let u=A("span",h);return u.textContent=E,u},f=()=>{if(Me(o),Te(o,"aria-label",n.ariaLabel),n.items.length===0){o.append(_("oc-sdk-list-empty",n.emptyText??"Nothing here")),c(null);return}for(let E of n.items){let u=Ee("oc-sdk-row");if(u.id=i(E.id),u.setAttribute("role","option"),u.setAttribute("aria-selected",E.id===n.selectedId?"true":"false"),u.disabled=Boolean(E.disabled),u.tabIndex=-1,E.leading)u.append(_("oc-sdk-row-lead",E.leading));let S=A("span","oc-sdk-row-main");if(S.append(_("oc-sdk-row-title",E.title)),E.subtitle)S.append(_("oc-sdk-row-sub",E.subtitle));if(u.append(S),E.badge){let O=_("oc-sdk-badge",E.badge.label);ut(O,E.badge.tone),u.append(O)}if(E.meta)u.append(_("oc-sdk-row-meta",E.meta));u.addEventListener("click",()=>n.onSelect(E.id)),o.append(u)}let h=n.items.some((E)=>E.id===s&&!E.disabled);c(h?s:n.selectedId??null)},p=(h)=>{let E=Ie(h);if(E){h.preventDefault(),c(Pe(n.items,s,E));return}if((h.key==="Enter"||h.key===" ")&&s)h.preventDefault(),n.onSelect(s)};return o.addEventListener("keydown",p),f(),{update:(h)=>{n={...n,...h},f()},dispose:()=>{o.removeEventListener("keydown",p),o.remove()}}};var Or=(e,t)=>{G(D);let n=t,r=A("div","oc-sdk oc-sdk-empty"),o=A("h2","oc-sdk-empty-title"),s=A("p","oc-sdk-empty-body"),i=A("div","oc-sdk-empty-action");r.append(o,s,i),e.append(r);let c=null,_=()=>{if(j(o,n.title),j(s,n.body),s.hidden=!n.body,i.hidden=!n.action,!n.action){c?.dispose(),c=null;return}let f={label:n.action.label,onClick:n.action.onClick};if(c)c.update(f);else c=Ue(i,{...f,variant:"outline",size:"sm"})};return _(),{update:(f)=>{n={...n,...f},_()},dispose:()=>{c?.dispose(),c=null,r.remove()}}};var Rr=(e,t={})=>{G(D);let n=t,r=A("span","oc-sdk oc-sdk-spinner");r.setAttribute("role","status");let o=A("span","oc-sdk-spinner-ring");o.setAttribute("aria-hidden","true");let s=A("span");r.append(o,s),e.append(r);let i=()=>{r.dataset.size=n.size??"default",j(s,n.label),s.hidden=!n.label,r.setAttribute("aria-label",n.label??"Loading")};return i(),{update:(c)=>{n={...n,...c},i()},dispose:()=>{r.remove()}}};var br=(e,t)=>{G(D);let n=t,r=A("div","oc-sdk oc-sdk-banner"),o=A("div","oc-sdk-banner-text"),s=A("div","oc-sdk-banner-title"),i=A("div","oc-sdk-banner-body"),c=A("div","oc-sdk-banner-action");o.append(s,i),r.append(o,c),e.append(r);let _=null,f=()=>{if(r.dataset.tone=n.tone,r.setAttribute("role",n.tone==="error"||n.tone==="warning"?"alert":"status"),j(s,n.title),j(i,n.body),i.hidden=!n.body,c.hidden=!n.action,!n.action){_?.dispose(),_=null;return}let p={label:n.action.label,onClick:n.action.onClick};if(_)_.update(p);else _=Ue(c,{...p,variant:"outline",size:"xs"})};return f(),{update:(p)=>{n={...n,...p},f()},dispose:()=>{_?.dispose(),_=null,r.remove()}}};var va=(e)=>Number.isFinite(e)?Math.min(100,Math.max(0,Math.floor(e))):0,kr=(e,t)=>{G(D);let n=t,r=A("div","oc-sdk oc-sdk-progress"),o=A("div","oc-sdk-progress-label"),s=A("span"),i=A("span","oc-sdk-progress-value"),c=A("span"),_=xe("check",14);i.append(_,c),o.append(s,i);let f=A("div","oc-sdk-progress-track");f.setAttribute("role","progressbar"),f.setAttribute("aria-valuemin","0"),f.setAttribute("aria-valuemax","100");let p=A("div","oc-sdk-progress-fill");f.append(p),r.append(o,f),e.append(r);let h=()=>{let E=va(n.value);if(ut(p,n.tone),p.style.transform=`scaleX(${E/100})`,f.setAttribute("aria-valuenow",String(E)),n.label)f.setAttribute("aria-label",n.label);else f.removeAttribute("aria-label");j(s,n.label),j(c,`${E}%`);let u=E===100&&(!n.tone||n.tone==="neutral");Te(r,"data-done",u?"true":null),_.style.display=u?"":"none",o.hidden=!n.label};return h(),{update:(E)=>{n={...n,...E},h()},dispose:()=>{r.remove()}}};var gs=(e)=>e.filter((t)=>!("separator"in t)),wa=0,Ir=(e,t)=>{G(D);let n=t,r=`oc-sdk-menu-${wa+=1}`,o=A("div","oc-sdk oc-sdk-menu");e.append(o);let s=A("div","oc-sdk oc-sdk-popup");s.setAttribute("role","menu"),s.tabIndex=-1;let i=null,c=null,_=Ue(o,{label:n.label,variant:n.variant,size:n.size,onClick:()=>{if(i)E();else u()}}),f=o.querySelector("button");f?.setAttribute("aria-haspopup","menu");let p=(y)=>{c=y,Jt(s,s,r,y)},h=()=>{Me(s);for(let y of n.items){if("separator"in y){let T=A("div","oc-sdk-separator");T.dataset.labeled="false",s.append(T);continue}s.append(Yt(r,"menuitem",y,{hover:()=>p(y.id),pick:()=>S(y.id)}))}p(gs(n.items).some((y)=>y.id===c)?c:null)},E=()=>{let y=i;i=null,y?.(),c=null,f?.setAttribute("aria-expanded","false")},u=()=>{if(i||!f)return;h(),i=Qt(o,f,s,E),f.setAttribute("aria-expanded","true"),s.focus()},S=(y)=>{E(),f?.focus(),n.onSelect(y)},O=(y)=>{let T=Ie(y);if(T)y.preventDefault(),p(Pe(gs(n.items),c,T));else if(y.key==="Enter"||y.key===" "){if(y.preventDefault(),c)S(c)}else if(y.key==="Escape")y.preventDefault(),E(),f?.focus()},R=(y)=>{if(i&&!(y.relatedTarget instanceof Node&&o.contains(y.relatedTarget)))E()};return s.addEventListener("keydown",O),o.addEventListener("focusout",R),{update:(y)=>{if(n={...n,...y},_.update({label:n.label,variant:n.variant,size:n.size}),i)h()},dispose:()=>{E(),s.removeEventListener("keydown",O),o.removeEventListener("focusout",R),_.dispose(),o.remove()}}};var C=qn(),Ne=null,tn=new Set;C.onReady((e)=>{Ne=e,cr(e,document.documentElement);for(let t of tn)t(e)});C.onItem((e)=>{if(!Ne||Ne.item===e)return;Ne={...Ne,item:e};for(let t of tn)t(Ne)});var Ye=()=>{let[e,t]=w(Ne);return le(()=>{if(tn.add(t),Ne)t(Ne);return()=>{tn.delete(t)}},[]),e};var Ma=(e)=>{if(!e||typeof e!=="object")return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||t===null},ys=(e)=>JSON.stringify(e,(t,n)=>typeof n==="function"?"[fn]":n),Ua=(e,t)=>{let n=e;for(let r of t){if(n===null||n===void 0)return;n=n[r]}return n},Cr=(e,t)=>{let n=(r,o)=>{if(typeof r==="function")return(...s)=>{let i=Ua(t.current,o);return typeof i==="function"?i(...s):void 0};if(Array.isArray(r))return r.map((s,i)=>n(s,[...o,i]));if(Ma(r))return Object.fromEntries(Object.entries(r).map(([s,i])=>[s,n(i,[...o,s])]));return r};return n(e,[])};var Pa=Symbol.for("pv"),Na=0;function a(e,t,n,r,o,s){t||(t={});var i,c,_=t;if("ref"in _&&typeof e!="function")for(c in _={},t)c=="ref"?i=t[c]:_[c]=t[c];var f={type:e,props:_,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:Pa,__v:--Na,__i:-1,__u:0};return(o||s)&&(f.__source=o,f.__self=s),L.vnode&&L.vnode(f),f}var vr=(...e)=>e.filter(Boolean).join(" ");var oe=({children:e,class:t})=>a("span",{class:vr("sui-chip",t),children:e},void 0,!1,void 0,this),As=({children:e,onClick:t,pressed:n,class:r})=>t?a("button",{type:"button",class:vr("sui-card",r),"aria-pressed":n,onClick:t,children:e},void 0,!1,void 0,this):a("div",{class:vr("sui-card sui-card--static",r),children:e},void 0,!1,void 0,this);var pt=({title:e,children:t})=>a("div",{class:"sui-section",children:[e&&a("h3",{class:"sui-section-title",children:e},void 0,!1,void 0,this),t]},void 0,!0,void 0,this),xs=({items:e})=>a("dl",{class:"sui-kv",children:e.flatMap(([t,n])=>[a("dt",{children:t},void 0,!1,void 0,this),a("dd",{children:n},void 0,!1,void 0,this)])},void 0,!1,void 0,this),Os=(e,t)=>{let n=Ge(null),r=Ge(null),o=Ge(t);o.current=t;let s=ys(t),i=Ge(!1);le(()=>{if(!n.current)return;return r.current=e(n.current,Cr(o.current,o)),i.current=!0,()=>{r.current?.dispose(),r.current=null,i.current=!1}},[]);let c=Ge(s);return le(()=>{if(!i.current||c.current===s)return;c.current=s,r.current?.update(Cr(o.current,o))},[s]),n};var Oe=(e,t=new Date)=>{if(!e)return"";let n=/^\d{4}-\d{2}-\d{2}$/.test(e)?new Date(`${e}T00:00:00`):new Date(e);if(Number.isNaN(n.getTime()))return"";let r=n.getFullYear()===t.getFullYear();return n.toLocaleDateString("en-US",{month:"short",day:"numeric",...r?{}:{year:"numeric"}})},Rs=(e,t=new Date)=>{if(!e)return null;let n=new Date(/^\d{4}-\d{2}-\d{2}$/.test(e)?`${e}T00:00:00`:e);if(Number.isNaN(n.getTime()))return null;let r=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();return Math.round((n.getTime()-r)/86400000)},bs=(e,t=Date.now())=>{if(!e)return"";let n=new Date(e).getTime();if(Number.isNaN(n))return"";let r=Math.max(0,Math.round((t-n)/60000));if(r<1)return"just now";if(r<60)return`${r}m ago`;let o=Math.round(r/60);if(o<24)return`${o}h ago`;let s=Math.round(o/24);if(s<30)return`${s}d ago`;return Oe(e,new Date(t))};var La={0:"0",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"},Je=(e,t)=>{if(e===null||e===void 0||t==="notUsed")return null;if(t==="tShirt")return La[e]??String(e);return String(e)},wr=(e)=>{let t=e.url.match(/\/-\/merge_requests\/(\d+)/),n=e.url.match(/github\.com\/[^/]+\/[^/]+\/pull\/(\d+)/),r=t?.[1]??n?.[1];if(!r)return null;let o=e.metadata??{},s=String(o.status??o.state??"").toLowerCase(),c=o.draft===!0||o.isDraft===!0||s==="draft"?"draft":s==="merged"?"merged":s==="closed"?"closed":s==="open"||s==="opened"||s==="approved"||s==="reviewing"?"open":null;return{label:`${t?"!":"#"}${r}`,status:c,url:e.url,title:e.title}},ks=(e,t=Date.now())=>{if(!e)return null;let n=new Date(e).getTime();if(Number.isNaN(n))return null;let r=n<t,o=Math.round(Math.abs(n-t)/60000),s=Math.round(o/60),i=Math.round(s/24),c=o<60?`${Math.max(1,o)}m`:s<24?`${s}h`:i<14?`${i}d`:`${Math.round(i/7)}w`;return{text:r?`-${c}`:c,overdue:r}},Is=(e)=>{let t=Math.abs(e),n=(r)=>String(Math.round(r*10)/10).replace(/\.0$/,"");if(t>=1e6)return`$${n(e/1e6)}M`;if(t>=1000)return`$${n(e/1000)}k`;return`$${Math.round(e)}`},Cs=(e,t=Date.now())=>{let n=e?new Date(e).getTime():NaN;if(Number.isNaN(n))return null;let r=Math.max(0,Math.round((t-n)/60000));if(r<60)return`${Math.max(1,r)}m`;let o=Math.round(r/60);if(o<24)return`${o}h`;let s=Math.round(o/24);return s<14?`${s}d`:`${Math.round(s/7)}w`};var vs=(e)=>{let t=e.trim().toLowerCase(),n=t.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);if(n){let o=n[1].length===3?n[1].split("").map((s)=>s+s).join(""):n[1];return[parseInt(o.slice(0,2),16),parseInt(o.slice(2,4),16),parseInt(o.slice(4,6),16)]}let r=t.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:null},ws=([e,t,n])=>{let r=(o)=>{let s=o/255;return s<=0.03928?s/12.92:((s+0.055)/1.055)**2.4};return 0.2126*r(e)+0.7152*r(t)+0.0722*r(n)},Da=(e,t)=>{let[n,r]=[ws(e),ws(t)].sort((o,s)=>s-o);return(n+0.05)/(r+0.05)};var Ms=(e,t)=>{let n=vs(e),r=vs(t);if(!n||!r||Da(n,r)>=1.8)return e;return`color-mix(in srgb, ${e} 45%, var(--oc-fg))`};var Qe=new Map,$a=30000,Us=(e)=>{let t=Qe.get(e);if(!t)t={at:0,listeners:new Set},Qe.set(e,t);return t},nn=(e)=>{for(let t of e.listeners)t()},_t=(e,t,n=!1)=>{let r=Us(e);if(r.promise)return r.promise;if(!n&&r.value!==void 0&&Date.now()-r.at<$a)return Promise.resolve(r.value);let o=t().then((s)=>(r.value=s,r.error=void 0,r.at=Date.now(),s),(s)=>{throw r.error=s,s}).finally(()=>{r.promise=void 0,nn(r)});return r.promise=o,nn(r),o};var Ps=(e)=>{let t=[];for(let[n,r]of Qe){if(r.value===void 0)continue;let o=e(n,r.value);if(o===r.value)continue;t.push([r,r.value]),r.value=o,nn(r)}return()=>{for(let[n,r]of t)n.value=r,nn(n)}},Ns=(e)=>{let t=Qe.get(e);if(!t)return;if(t.at=0,t.listeners.size>0&&t.fetcher)_t(e,t.fetcher,!0).catch(()=>{return})},Le=(e)=>{for(let[t,n]of Qe){if(!t.startsWith(e))continue;if(n.at=0,n.listeners.size>0&&n.fetcher)_t(t,n.fetcher,!0).catch(()=>{return})}},ft=(e,t)=>{let[,n]=w(0);le(()=>{if(!e)return;let o=Us(e);o.fetcher=t;let s=()=>n((i)=>i+1);return o.listeners.add(s),_t(e,t).catch(()=>{return}),()=>{o.listeners.delete(s)}},[e]);let r=e?Qe.get(e):void 0;return{data:r?.value,error:r?.error,loading:Boolean(r?.promise)||e!==null&&r?.value===void 0&&r?.error===void 0,refresh:()=>{if(e)_t(e,t,!0).catch(()=>{return})}}};var Ls=(e,t)=>JSON.stringify({query:e,variables:t});class de extends Error{kind;constructor(e,t){super(t);this.kind=e}}var ue=async(e,t)=>{let n;try{n=await C.request({method:"POST",path:"/graphql",body:Ls(e,t)})}catch(o){if(o instanceof k){if(o.code==="DISCONNECTED"||o.code==="NO_INTEGRATION")throw new de("disconnected","Linear is not connected.");throw new de("network",o.message||"Could not reach Linear.")}throw new de("network",o instanceof Error?o.message:"Could not reach Linear.")}let r;try{r=JSON.parse(n.body)}catch{throw new de("network",`Linear answered with status ${n.status}.`)}if(n.status===401)throw new de("disconnected","Linear sign-in expired.");if(r.errors?.length){let o=r.errors[0],s=o.extensions?.code==="RATELIMITED"||o.extensions?.type==="ratelimited";throw new de(s?"rate-limited":"graphql",o.message)}if(!r.data)throw new de("graphql","Linear returned no data.");return r.data};var He=`
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
`;var Ga=(e)=>`
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
`,Ds=`
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
`;var $s=`
  query BlockStates($teamIds: [ID!]) {
    workflowStates(first: 100, filter: { team: { id: { in: $teamIds } }, type: { eq: "started" } }) {
      nodes { id position team { id } }
    }
  }
`;var Gs=`
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
`;var Hs=`
  mutation IssueRelationCreate($input: IssueRelationCreateInput!) {
    issueRelationCreate(input: $input) { success }
  }
`,Bs=`
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
`;var Vs=(e)=>`
  mutation NotificationsMarkRead($readAt: DateTime!) {
    ${e.map((t,n)=>`n${n}: notificationUpdate(id: ${JSON.stringify(t)}, input: { readAt: $readAt }) { success }`).join(`
    `)}
  }
`,YE={VIEWER:`
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
`,ISSUES_BY_IDENTIFIER:Ga(["ENG-1","ENG-2"]),ISSUES_BY_KEYS:`
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
`,NOTIFICATIONS_MARK_READ:Vs(["n1","n2"])};var Mr=null,Fs=new Map,Xs=(e)=>{for(let[t,n]of e)Fs.set(t,n)},js=(e,t)=>{let n=Fs.get(t);if(n!==void 0)return n;let r=Mr?.statesByTeam.get(e)?.filter((s)=>s.type==="started")??[],o=r.findIndex((s)=>s.id===t);return o<0?0.5:(o+1)/(r.length+1)},Ws=()=>Mr?.viewer.id??null,Ks=(e)=>Mr?.teamsById.get(e)?.issueEstimationType;var zs=()=>typeof document>"u"?"":getComputedStyle(document.documentElement).getPropertyValue("--oc-bg"),Ha=(e)=>{if(e>=0.999)return"M7 3.2a3.8 3.8 0 1 1 0 7.6a3.8 3.8 0 1 1 0-7.6z";let t=e*Math.PI*2,n=7+3.8*Math.sin(t),r=7-3.8*Math.cos(t);return`M7 7L7 3.2A3.8 3.8 0 ${e>0.5?1:0} 1 ${n.toFixed(2)} ${r.toFixed(2)}z`},mt=({type:e,color:t,size:n=14,fill:r,teamId:o,stateId:s})=>{let i=t||"currentColor",c=dt(()=>Ms(i,zs()),[i,zs()]),_={width:n,height:n,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};switch(e){case"triage":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),a("path",{d:"M3.9 7h6.2M5.3 5.5 3.8 7l1.5 1.5M8.7 5.5 10.2 7 8.7 8.5",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"backlog":return a("svg",{..._,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5","stroke-dasharray":"1.2 2.1","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"unstarted":return a("svg",{..._,children:a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this);case"started":{let f=r??(o&&s?js(o,s):0.5);return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:c,"stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:Ha(f),fill:c},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}case"completed":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),a("path",{d:"M4.3 7.2l1.9 1.9 3.5-3.7",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);case"canceled":case"duplicate":return a("svg",{..._,children:[a("circle",{cx:"7",cy:"7",r:"6.25",fill:c},void 0,!1,void 0,this),a("path",{d:"M4.8 4.8l4.4 4.4M9.2 4.8L4.8 9.2",fill:"none",stroke:"var(--oc-bg)","stroke-width":"1.5","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)}},rn=({priority:e,size:t=14})=>{let n={width:t,height:t,viewBox:"0 0 14 14","aria-hidden":!0,style:{flex:"none"}};if(e===1)return a("svg",{...n,children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"2.5",fill:"var(--oc-warning)"},void 0,!1,void 0,this),a("path",{d:"M7 4v3.6M7 9.4v.2",stroke:"var(--oc-bg)","stroke-width":"1.6","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);if(e>=2&&e<=4){let r=5-e;return a("svg",{...n,children:[0,1,2].map((o)=>a("rect",{x:2+o*4,y:9-o*3,width:"2.4",height:3+o*3,rx:"0.6",fill:"currentColor",opacity:o<r?1:0.28},void 0,!1,void 0,this))},void 0,!1,void 0,this)}return a("svg",{...n,children:a("path",{d:"M2.5 7h2M6 7h2M9.5 7h2",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round",opacity:"0.5"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},Ze=({name:e,url:t,size:n=18})=>{let r=e.split(/\s+/).filter(Boolean).slice(0,2).map((s)=>s[0].toUpperCase()).join("")||"?",o={width:`${n}px`,height:`${n}px`,fontSize:`${Math.round(n*0.42)}px`};if(t)return a("img",{class:"lin-avatar",src:t,alt:e,style:o},void 0,!1,void 0,this);return a("span",{class:"lin-avatar",style:o,children:r},void 0,!1,void 0,this)},Ba={open:"var(--oc-info)",merged:"var(--oc-success)",closed:"var(--oc-muted)",draft:"var(--oc-muted)"},qs=({status:e,size:t=13})=>a("svg",{width:t,height:t,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("g",{fill:"none",stroke:e?Ba[e]:"currentColor","stroke-width":"1.4","stroke-linecap":"round",children:[a("circle",{cx:"3.5",cy:"3",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"3.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("circle",{cx:"10.5",cy:"11",r:"1.6"},void 0,!1,void 0,this),a("path",{d:"M3.5 4.6v4.8M10.5 9.4V6.5a2 2 0 0 0-2-2H6.5"},void 0,!1,void 0,this),a("path",{d:"M7.8 3.2 6.3 4.5l1.5 1.3"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),Ys=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.5",fill:"none",stroke:"currentColor","stroke-width":"1.4"},void 0,!1,void 0,this),a("path",{d:"M5.6 4.6 9.2 7l-3.6 2.4z",fill:"currentColor"},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Js=({done:e,total:t,size:n=13})=>{let o=2*Math.PI*5,s=t?Math.min(1,e/t):0;return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:"var(--oc-border)","stroke-width":"2"},void 0,!1,void 0,this),a("circle",{cx:"7",cy:"7",r:5,fill:"none",stroke:s>=1?"var(--oc-success)":"var(--oc-info)","stroke-width":"2","stroke-dasharray":`${o*s} ${o}`,transform:"rotate(-90 7 7)","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Qs=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"6",fill:"var(--oc-error)"},void 0,!1,void 0,this),a("path",{d:"M4 7h6",stroke:"var(--oc-bg)","stroke-width":"1.8","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Zs=({size:e=13})=>a("svg",{width:e,height:e,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("rect",{x:"1.5",y:"1.5",width:"11",height:"11",rx:"3",fill:"none",stroke:"var(--oc-warning)","stroke-width":"1.5"},void 0,!1,void 0,this),a("path",{d:"M5 10V4.5h4.2l-.9 1.4.9 1.4H5",fill:"var(--oc-warning)",stroke:"var(--oc-warning)","stroke-width":"1","stroke-linejoin":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),on=({icon:e,color:t,size:n=13})=>{if(e&&/\p{Extended_Pictographic}/u.test(e))return a("span",{class:"lin-project-emoji",style:{fontSize:`${n}px`},"aria-hidden":"true",children:e},void 0,!1,void 0,this);return a("svg",{width:n,height:n,viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("path",{d:"M7 1.2 12.2 4.1v5.8L7 12.8 1.8 9.9V4.1z",fill:t||"var(--oc-muted)"},void 0,!1,void 0,this),a("path",{d:"M4.6 7h4.8M7 4.6v4.8",stroke:"var(--oc-bg)","stroke-width":"1.2","stroke-linecap":"round",opacity:"0.85"},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var sn=({label:e})=>a(oe,{children:[a("span",{class:"lin-swatch",style:{background:e.color}},void 0,!1,void 0,this),e.name]},void 0,!0,void 0,this),Ur=2,Va=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M6 8a2.5 2.5 0 0 0 3.5 0l2-2A2.5 2.5 0 0 0 8 2.5l-.6.6M8 6a2.5 2.5 0 0 0-3.5 0l-2 2A2.5 2.5 0 0 0 6 11.5l.6-.6",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),Fa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7.5",r:"4.7",fill:"none",stroke:"currentColor","stroke-width":"1.3"},void 0,!1,void 0,this),a("path",{d:"M7 5v2.7l1.6 1M5.5 1.8h3",fill:"none",stroke:"currentColor","stroke-width":"1.3","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Xa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:a("path",{d:"M7 1.5 12 4.2v5.6L7 12.5 2 9.8V4.2zM2 4.2 7 7l5-2.8M7 7v5.5",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linejoin":"round"},void 0,!1,void 0,this)},void 0,!1,void 0,this),ja=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"5",cy:"5",r:"2.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M1.5 11.5c.4-2 1.8-3 3.5-3s3.1 1 3.5 3M9.5 3.4a2.2 2.2 0 0 1 0 3.9M10.5 8.8c1 .4 1.7 1.3 2 2.7",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),Wa=()=>a("svg",{width:"13",height:"13",viewBox:"0 0 14 14","aria-hidden":"true",style:{flex:"none"},children:[a("circle",{cx:"7",cy:"7",r:"5.2",fill:"none",stroke:"currentColor","stroke-width":"1.2"},void 0,!1,void 0,this),a("path",{d:"M7 4.2V7l2 1.2",fill:"none",stroke:"currentColor","stroke-width":"1.2","stroke-linecap":"round"},void 0,!1,void 0,this)]},void 0,!0,void 0,this),ei=({issue:e,properties:t,subIssues:n,hideProject:r,extras:o})=>{let s=e.labels.nodes,i=e.attachments?.nodes??[],c=i.map(wr).filter((T)=>T!==null),_=i.filter((T)=>!wr(T)),f=(e.inRelations?.nodes??[]).filter((T)=>T.type==="blocks").length,p=(e.outRelations?.nodes??[]).filter((T)=>T.type==="blocks").length,h=Je(e.estimate,Ks(e.team.id)),E=e.dueDate?Rs(e.dueDate):null,u=t.has("sla")?ks(e.slaBreachesAt):null,S=o?.releases.nodes??[],O=(o?.needs.nodes??[]).map((T)=>T.customer).filter((T)=>T!==null),R=O.reduce((T,U)=>T+(U.revenue??0),0),y=t.has("timeInStatus")?Cs(o?.stateHistory.nodes[o.stateHistory.nodes.length-1]?.startedAt):null;return a(ke,{children:[n&&n.total>0&&a("span",{class:"lin-meta lin-meta-children",title:`${n.done} of ${n.total} sub-issues done`,children:a(oe,{children:[a(Js,{done:n.done,total:n.total},void 0,!1,void 0,this),n.done,"/",n.total]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("labels")&&s.length>0&&a("span",{class:"lin-meta lin-meta-labels",children:[s.slice(0,Ur).map((T)=>a(sn,{label:T},T.id,!1,void 0,this)),s.length>Ur&&a(oe,{children:["+",s.length-Ur]},void 0,!0,void 0,this)]},void 0,!0,void 0,this),t.has("changes")&&c.length>0&&a("span",{class:"lin-meta lin-meta-change",title:c.map((T)=>`${T.label} ${T.title}`).join(`
`),children:a(oe,{children:[a(qs,{status:c[0].status},void 0,!1,void 0,this),c.length===1?c[0].label:`${c.length} ${c[0].label.startsWith("!")?"MRs":"PRs"}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("links")&&_.length>0&&a("span",{class:"lin-meta lin-meta-links",title:_.map((T)=>T.title).join(`
`),children:a(oe,{children:[a(Va,{},void 0,!1,void 0,this),_.length]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("project")&&!r&&e.project&&a("span",{class:"lin-meta lin-meta-project",title:e.project.name,children:a(oe,{children:[a(on,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:e.project.name},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("milestone")&&e.projectMilestone&&a("span",{class:"lin-meta lin-meta-milestone",title:`Milestone: ${e.projectMilestone.name}`,children:a(oe,{children:a("span",{class:"lin-ellipsis",children:e.projectMilestone.name},void 0,!1,void 0,this)},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("cycle")&&e.cycle&&a("span",{class:"lin-meta lin-meta-cycle",title:`Cycle ${e.cycle.number}${e.cycle.name?`: ${e.cycle.name}`:""}`,children:a(oe,{children:[a(Ys,{},void 0,!1,void 0,this),e.cycle.number]},void 0,!0,void 0,this)},void 0,!1,void 0,this),f>0&&a("span",{class:"lin-meta lin-meta-blocked",title:`Blocked by ${f} ${f===1?"issue":"issues"}`,children:a(oe,{children:[a(Qs,{},void 0,!1,void 0,this),f]},void 0,!0,void 0,this)},void 0,!1,void 0,this),p>0&&a("span",{class:"lin-meta lin-meta-blocking",title:`Blocking ${p} ${p===1?"issue":"issues"}`,children:a(oe,{children:[a(Zs,{},void 0,!1,void 0,this),p]},void 0,!0,void 0,this)},void 0,!1,void 0,this),u&&a("span",{class:`lin-meta lin-meta-sla ${u.overdue?"lin-overdue":""}`,title:`SLA ${e.slaType??""} breaches ${Oe(e.slaBreachesAt)}`,children:a(oe,{children:[a(Fa,{},void 0,!1,void 0,this),u.text]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("release")&&S.length>0&&a("span",{class:"lin-meta lin-meta-release",title:S.map((T)=>`${T.name}${T.version?` ${T.version}`:""}`).join(`
`),children:a(oe,{children:[a(Xa,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:S[0].version??S[0].name},void 0,!1,void 0,this),S.length>1&&` +${S.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customers")&&O.length>0&&a("span",{class:"lin-meta lin-meta-customers",title:O.map((T)=>T.name).join(`
`),children:a(oe,{children:[a(ja,{},void 0,!1,void 0,this),a("span",{class:"lin-ellipsis",children:O[0].name},void 0,!1,void 0,this),O.length>1&&` +${O.length-1}`]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("customerRevenue")&&R>0&&a("span",{class:"lin-meta lin-meta-revenue",title:"Customer revenue",children:a(oe,{children:Is(R)},void 0,!1,void 0,this)},void 0,!1,void 0,this),y&&a("span",{class:"lin-meta lin-meta-in-status",title:`In ${e.state.name} for ${y}`,children:a(oe,{children:[a(Wa,{},void 0,!1,void 0,this),y]},void 0,!0,void 0,this)},void 0,!1,void 0,this),t.has("estimate")&&h&&a("span",{class:"lin-meta lin-meta-estimate",title:"Estimate",children:a(oe,{children:h},void 0,!1,void 0,this)},void 0,!1,void 0,this),t.has("dueDate")&&e.dueDate&&a("span",{class:`lin-meta lin-meta-due sui-small ${E!==null&&E<0?"lin-overdue":"sui-muted"}`,title:"Due date",children:Oe(e.dueDate)},void 0,!1,void 0,this),t.has("creator")&&e.creator&&a("span",{class:"lin-meta lin-meta-creator",title:`Created by ${e.creator.name}`,children:a(Ze,{name:e.creator.name,url:e.creator.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var Ka=/^[A-Za-z]{1,7}-\d+$/;var ti=(e)=>{if(typeof e!=="string")return null;let t=e.trim();if(!Ka.test(t))return null;if(t.slice(t.indexOf("-")+1).length>9)return null;return t.toUpperCase()},et=(e)=>{let t=typeof e==="string"?e:Array.isArray(e)?e.filter((s)=>typeof s==="string").join(","):"",n=[],r=[],o=0;for(let s of t.split(/[,;\s]+/)){if(!s)continue;let i=ti(s);if(!i){if(r.length<3&&!r.includes(s.slice(0,24)))r.push(s.slice(0,24));continue}if(n.includes(i))continue;if(n.length>=25)o+=1;else n.push(i)}return{ids:n,skipped:r,cut:o}},ni=(e,t)=>{if(typeof e!=="string")return"";let n=e.replace(/\s+/g," ").trim();return n.length>t?`${n.slice(0,t-3).trimEnd()}...`:n},ri=(e)=>ni(e,160),oi=(e)=>ni(e,400),si=(e)=>{let t=new Map;for(let n of e){let[r,o]=n.split("-"),s=t.get(r)??[];s.push(Number(o)),t.set(r,s)}return{or:[...t].map(([n,r])=>({and:[{team:{key:{eqIgnoreCase:n}}},{number:{in:r}}]}))}},ii=(e)=>{let t=new Map;for(let r of e){let o=t.get(r.team.id)??[];o.push(r),t.set(r.team.id,o)}let n=new Map;for(let r of t.values())r.sort((o,s)=>o.position-s.position),r.forEach((o,s)=>n.set(o.id,(s+1)/(r.length+1)));return n},ai=(e)=>`${e.identifier} ${e.title}`.slice(0,1900),Pr=(e)=>{let t=e?.trim().split(/\s+/,1)[0];return ti(t)};async function Re(e,t,n,r={}){let o=r.name??"extension",s={};for(let[i,c]of Object.entries(r.query??{}))if(c)s[i]=c;try{let i=await e.serviceRequest({method:t,path:n,...Object.keys(s).length?{query:s}:{},...r.body!==void 0?{body:JSON.stringify(r.body)}:{}}),c;try{c=JSON.parse(i.body)}catch{return{ok:!1,error:`The ${o} service answered something unreadable.`,code:"failed"}}if(i.status>=400&&c.ok===void 0)return{ok:!1,error:String(c.message??`Error ${i.status}`),code:"failed"};return c}catch(i){let c=i.code;if(c==="NO_SERVICE")return{ok:!1,error:`Approve the ${o} service in Settings > Extensions.`,code:"failed"};if(c==="SERVICE_FAILED")return{ok:!1,error:`The ${o} service did not start. Try again.`,code:"failed"};return{ok:!1,error:i instanceof Error?i.message:`Could not reach the ${o} service.`,code:"failed"}}}async function be(e,t,n,r={}){try{await e.toast({kind:t,message:n,...r.dismiss?{dismiss:!0}:{}})}catch{}}var qa=/linear\.app\/[^/\s]+\/issue\/([A-Za-z][A-Za-z0-9]{0,6}-\d+)/i,ci=(e)=>{if(!e)return[];let t=[],n=(o)=>{let s=o?.toUpperCase();if(s&&!t.includes(s))t.push(s)},r=[...e.links??[]].sort((o,s)=>(s.linkedAt??0)-(o.linkedAt??0));for(let o of r)n(o.url.match(qa)?.[1]);for(let o of e.items??[]){let s=o.data?.identifier;if(typeof s==="string")n(s)}return t};var Ya="plan";var Ja=(e)=>({sessionId:e.id,directory:e.directory,title:e.title,agent:e.agent??null,inWorktree:e.worktree!==null,updatedAt:e.updatedAt}),li=(e,t,n=new Set)=>{let r=t.toUpperCase(),o=(s)=>(s.agent===Ya?0:2)+(s.inWorktree?0:1);return e.filter((s)=>s.archivedAt===null&&s.parentId===null&&(n.has(s.id)||ci(s).includes(r))).map(Ja).sort((s,i)=>o(s)-o(i)||i.updatedAt-s.updatedAt)[0]??null};var Qa=/\n*(?:^|\n)---\n+(?:## Plan|\*\*Plan from OpenChamber session:[^\n]*)\n[\s\S]*$/,Za=1e5,ec=(e)=>e.replace(/^\s*#[ \t]+[^\n]*\n+/,""),di=(e,t)=>{let n=ec(t.trim()).trim(),r=n.length>20000?`${n.slice(0,20000).trimEnd()}

[cut]`:n,o=(e??"").replace(Qa,"").trimEnd(),s=`---
## Plan

${r}`,i=o?`${o}

${s}`:s;return i.length>Za?null:i},ui=(e,t=6,n=420)=>{let r=e.trim().split(`
`).filter((o)=>o.trim()).slice(0,t).join(`
`);return r.length>n?`${r.slice(0,n).trimEnd()}...`:r};var pi="The last reply in that session is not a plan. Ask the session to repeat the final plan in full, then try again.";var DS=new RegExp("```linear-plan[^\\n]*\\n([\\s\\S]*?)```","g");var tc=(e,t)=>typeof e==="string"?e.replace(/\s+/g," ").trim().slice(0,t):"";var Nr=(e,t)=>{if(e===null||t.length===0)return null;let n=t[0];for(let r of t)if(Math.abs(r-e)<Math.abs(n-e)||Math.abs(r-e)===Math.abs(n-e)&&r>n)n=r;return n},_i=(e,t)=>{if(e.length===0)return'This team does not use estimates: leave "estimate" out.';return`Estimates on this team, written as the number: ${e.map((r)=>{let o=t(r);return o&&o!==String(r)?`${o} = ${r}`:String(r)}).join(", ")}.`},fi=(e,t,n)=>[e.description,`Split out of ${t} by the plan in "${tc(n,120)}". Created by Linear+.`].filter(Boolean).join(`

---

`);var Lr=(e)=>{if(typeof e!=="object"||e===null)return!1;let t=e;return["sessionId","identifier","directory","sessionTitle","state"].every((n)=>typeof t[n]==="string")&&typeof t.extras==="object"&&t.extras!==null&&Array.isArray(t.extras.issues)};var nc=["No priority","Urgent","High","Medium","Low"],Dr=(e)=>{let t=[`${e.identifier}: ${e.title}`,`Status: ${e.state.name}. Priority: ${nc[e.priority]}. Team: ${e.team.name}.`,e.project?`Project: ${e.project.name}.`:"",e.assignee?`Assignee: ${e.assignee.name}.`:"",`Link: ${e.url}`,`Branch: ${e.branchName}`,"",e.description?.trim()??""],n=e.comments.nodes.slice(-5).map((o)=>`${o.user?.name??"Someone"} (${Oe(o.createdAt)}): ${o.body}`),r=[...t,...n.length?["","Latest comments:",...n]:[]].filter((o,s,i)=>o||i[s-1]).join(`
`);return r.length>15000?`${r.slice(0,15000)}
[cut]`:r};var mi=["triage","backlog","unstarted","started","completed","canceled","duplicate"],Ei=(e,t)=>mi.indexOf(e.type)-mi.indexOf(t.type)||e.position-t.position;var Si=["No priority","Urgent","High","Medium","Low"];var hi=(e)=>[...e??[]].sort(Ei);var $r=(e)=>hi(e).filter((t)=>t.type==="started"||t.type==="unstarted"&&/plan/i.test(t.name)),an=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=$r(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return Ti(r.filter((o)=>o.type==="started"),n,r)},Ti=(e,t,n=e)=>{let r=t?.trim().toLowerCase();return(r?n.find((o)=>o.name.trim().toLowerCase()===r):void 0)??e.find((o)=>/^in progress$/i.test(o.name.trim()))??e.find((o)=>/progress|doing|working|development|started/i.test(o.name))??e.find((o)=>!/block|hold|pause|wait|stuck/i.test(o.name))??e[0]??null},gi=(e)=>/plan/i.test(e.name),yi=(e)=>hi(e).filter((t)=>t.type==="started"&&!gi(t)),Gr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;if(e.state.type==="started"&&!gi(e.state))return null;return Ti(yi(t),n)},Hr=(e,t,n)=>{if(["completed","canceled","duplicate"].includes(e.state.type))return null;let r=$r(t);if(e.state.type==="started"||r.some((o)=>o.id===e.state.id))return null;return r.find((o)=>/plan/i.test(o.name))??an(e,t,n)},Ai=(e,t,n,r)=>{let o=e==="build"?yi(n):$r(n),s=e==="build"?Gr(t,n,r):e==="plan"?Hr(t,n,r):an(t,n,r),i=s??o.find((c)=>c.id===t.state.id)??null;return{options:o,target:i,moves:s!==null}},rc={exponential:{base:[1,2,4,8,16],extended:[32,64]},fibonacci:{base:[1,2,3,5,8],extended:[13,21]},linear:{base:[1,2,3,4,5],extended:[6,7]},tShirt:{base:[1,2,3,5,8],extended:[13,21]}},oc=(e)=>{let t=e?rc[e.issueEstimationType]:void 0;if(!t)return[];return[...e.issueEstimationAllowZero?[0]:[],...t.base,...e.issueEstimationExtended?t.extended:[]]},cn=(e)=>oc({issueEstimationType:e.issueEstimationType??"notUsed",issueEstimationAllowZero:e.issueEstimationAllowZero??!1,issueEstimationExtended:e.issueEstimationExtended??!1}),xi=(e,t)=>{let n=t.trim().replace(/^refs\/heads\//,"").toLowerCase();if(!n)return null;return e.find((r)=>r.status==="ready"&&r.branch.replace(/^refs\/heads\//,"").toLowerCase()===n)?.directory??null},Br=(e,t)=>t>0?`${e}-${t+1}`:e;var tt=(e)=>{let t=e instanceof Error?e.message:String(e);if(e instanceof de&&e.kind==="disconnected")return"Linear is not connected. Connect it in OpenChamber, then try again.";if(e instanceof de&&e.kind==="rate-limited")return"Linear is limiting requests. Wait a minute, then try again.";if(/scope|permission|forbidden|not authori[sz]ed|access denied/i.test(t))return"Linear refused the change: this connection can read but not write. Reconnect Linear in OpenChamber's settings and allow write access.";return t||"Linear did not save the change."},sc=(e)=>typeof e==="object"&&e!==null&&Array.isArray(e.issues),Oi=(e,t)=>Ps((n,r)=>{if((n.startsWith("issues:")||n.startsWith("view-issues:"))&&sc(r)&&r.issues.some((o)=>o.id===e)){let{description:o,...s}=t;return{...r,issues:r.issues.map((i)=>i.id===e?{...i,...s}:i)}}if(n.startsWith("issue:")&&typeof r==="object"&&r!==null&&r.id===e){let{team:o,...s}=t;return{...r,...s}}return r}),ic=(e)=>{if(!e.issueUpdate.success||!e.issueUpdate.issue)throw new de("graphql","Linear did not save the change.");return e.issueUpdate.issue},je=async(e,t)=>{let n=Oi(e.id,t.patch);try{let r=ic(await ue(Gs,{id:e.id,input:t.input}));if(Oi(e.id,r),Ns(`issue:${e.identifier}`),"stateId"in t.input)Le("children:");return r}catch(r){throw n(),r}};var Ri=async(e)=>{let t=await ue(Bs,{input:e});if(!t.issueCreate.success||!t.issueCreate.issue)throw new de("graphql","Linear did not create the issue.");return Le("issues:"),Le("view-issues:"),t.issueCreate.issue};var bi=async(e,t)=>{let n=await C.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",text:Dr(e),data:{issueId:e.id,identifier:e.identifier},worktree:t.existing?{kind:"existing",directory:t.existing}:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(n.sessionId===null)return{started:!1,directory:n.directory};let r=t.state??an(e,e.team.states.nodes),{moved:o,moveError:s}=await ki(e,r,t.move);return{started:!0,sessionId:n.sessionId,target:r,moved:o,moveError:s}},ki=async(e,t,n)=>{let r=!1,o=null;if(n&&t)try{await je(e,{input:{stateId:t.id},patch:{state:t}}),r=!0}catch(s){o=tt(s)}return{moved:r,moveError:o}},Ii=async(e,t)=>{let n=t.existing??null;if(!n){let c=await C.startSession({providerId:"linear-dashboard",id:e.identifier,title:`${e.identifier} ${e.title}`,url:e.url,kind:"issue",data:{issueId:e.id,identifier:e.identifier},worktree:t.worktree?{kind:"new",name:t.branch??e.branchName}:!1,navigation:"preserve"});if(c.sessionId===null)return{started:!1,directory:c.directory};if(n=c.worktree?.directory??c.directory??t.directoryHint??null,!n)return{started:!1,directory:"",error:"The host did not say which folder the session is in."}}let r;try{let c=_i(cn(e.team),(_)=>Je(_,e.team.issueEstimationType));r=(await vi({identifier:e.identifier,directory:n,issueTitle:e.title,context:Dr(e),scale:c,...t.model?{model:t.model}:{}})).sessionId}catch(c){return{started:!1,directory:n,error:c instanceof Error?c.message:String(c)}}let o=t.state??Hr(e,e.team.states.nodes),{moved:s,moveError:i}=await ki(e,o,t.move);return{started:!0,sessionId:r,target:o,moved:s,moveError:i}},Vr=(e)=>e.replace(/\/+$/,""),Fr=async(e)=>{if(!e)return null;try{let t=Vr(e),n=(await C.listProjects())?.projects??[],r=n.find((o)=>Vr(o.directory)===t);if(r)return r;for(let o of n)if(((await C.listWorktrees(o.id))?.worktrees??[]).some((i)=>Vr(i.directory)===t))return o}catch{}return null},Ci=async(e,t)=>{try{let n=await Fr(e);if(!n)return null;return xi((await C.listWorktrees(n.id))?.worktrees??[],t)}catch{return null}},ln=async(e)=>{try{await C.openSession(e)}catch{}};var wi=async(e,t)=>{let n=await ac(t);try{let o=await Fr(e);if(o){let s=await C.listSessions(o.id),i=li(s?.sessions??[],t,new Set(n.map((c)=>c.sessionId)));if(i)return i}}catch{}let r=n[0];return r?{sessionId:r.sessionId,directory:r.sessionDirectory,title:r.title,agent:"plan",inWorktree:!0,updatedAt:r.createdAt}:null},ac=async(e)=>{let t=await Re(C,"GET","/plans",{query:{identifier:e},name:"Linear+"}),n=t.ok===!1?[]:t.sessions;if(!Array.isArray(n))return[];return n.map((r)=>r).filter((r)=>typeof r.sessionId==="string"&&typeof r.createdAt==="number").map((r)=>({sessionId:r.sessionId,sessionDirectory:typeof r.sessionDirectory==="string"?r.sessionDirectory:typeof r.directory==="string"?r.directory:"",title:typeof r.title==="string"?r.title:`${e} plan`,createdAt:r.createdAt})).filter((r)=>r.sessionDirectory.startsWith("/"))};var Mi=async(e)=>{let t=await Re(C,"POST","/handoff",{body:{sessionId:e.source.sessionId,sessionDirectory:e.source.directory,sessionTitle:e.source.title,identifier:e.identifier,issueTitle:e.issueTitle,...e.force?{force:!0}:{},...e.model?{model:e.model}:{}},name:"Linear+"});if(t.ok===!1||typeof t.sessionId!=="string")throw Error(t.error??"The Linear+ service did not start the build.");return{sessionId:t.sessionId,directory:typeof t.directory==="string"?t.directory:e.source.directory}},dn=async(e)=>{let t=await Re(C,"POST","/handoff",{body:{mode:"preview",sessionId:e.source.sessionId,sessionDirectory:e.source.directory,identifier:e.identifier},name:"Linear+"});if(t.ok===!1||typeof t.plan!=="string")throw Error(t.error??"The Linear+ service could not read the plan.");return{plan:t.plan,postPlan:t.postPlan===!0,earlier:t.earlier===!0,isPlan:t.isPlan!==!1}},vi=async(e)=>{let{model:t,...n}=e,r=await Re(C,"POST","/plan",{body:t?{...n,model:t}:n,name:"Linear+"});if(r.ok===!1||typeof r.sessionId!=="string")throw Error(r.error??"The Linear+ service did not start the plan.");return{sessionId:r.sessionId,directory:typeof r.directory==="string"?r.directory:e.directory}};var Ui=async(e)=>{let t=await Re(C,"GET","/extras",{query:{sessionId:e},name:"Linear+"});return t.ok!==!1&&Lr(t.extras)?t.extras:null},un=async(e)=>{let t=await Re(C,"POST","/handoffs",{body:e,name:"Linear+"});if(t.ok===!1)return null;if(e.action==="claim-extras"&&t.claimed!==!0)return null;return Lr(t.state)?t.state:null};var pe=(e,t="inline-flex")=>(n)=>{let r=Os(e,n);return a("span",{ref:r,style:{display:t}},void 0,!1,void 0,this)},ge=pe(Ue),pn=pe(Zt),yh=pe(hr,"block"),Ah=pe(Tr,"block"),xh=pe(yr),Oh=pe(Ir),Rh=pe(Ar),nt=pe(Rr),ye=pe(br,"block"),Pi=pe(Or,"block"),bh=pe(kr,"block"),kh=pe(xr,"block"),Ih=pe(gr),rt=pe(en),Ch=pe(en,"block"),vh=pe(Zt,"block");var Ni=(e)=>typeof e==="object"&&e!==null&&typeof e.agent==="string"&&(e.model===void 0||typeof e.model==="string"),Li=(e)=>typeof e==="object"&&e!==null&&typeof e.id==="string"&&typeof e.label==="string",Di=(e)=>{if(!e||e.ok===!1||!Array.isArray(e.agents)||!Array.isArray(e.models))return null;return{agents:e.agents.filter(Li),models:e.models.filter(Li),defaultModel:typeof e.defaultModel==="string"?e.defaultModel:null,...Ni(e.current?.plan)&&Ni(e.current?.build)?{current:e.current}:{}}},_n="__default";var $i=(e,t)=>{let n=e.current?.[t].model;if(n)return e.models.find((o)=>o.id===n)?.label??n;let r=e.defaultModel?e.models.find((o)=>o.id===e.defaultModel)?.label??e.defaultModel:null;return r?`${r} (default)`:"the default model"};var Gi=async(e)=>Di(await Re(C,"GET","/choices",{query:{directory:e},name:"Linear+"}));var fn=({role:e,directory:t,value:n,onChange:r,disabled:o})=>{let s=ft(`start-choices:${t??""}`,()=>Gi(t));if(!s.data)return null;let i=[{id:_n,label:`From Settings: ${$i(s.data,e)}`},...s.data.models];return a("div",{class:"lin-model-pick",children:a(pn,{label:e==="plan"?"Plan model":"Build model",value:n||_n,options:i,searchable:!0,searchPlaceholder:"Search models",disabled:o,onChange:(c)=>r(c===_n?"":c)},void 0,!1,void 0,this)},void 0,!1,void 0,this)};var mn=(e,t,n,r)=>{let o=dt(()=>t?Ai(e,t,t.team.states.nodes,n):null,[e,t,n]),[s,i]=w(null),[c,_]=w(null),f=o?.options??[],p=f.find((u)=>u.id===s)??o?.target??null,h=c??Boolean(o?.moves&&r),E=Boolean(t&&p&&h&&p.id!==t.state.id);return{options:f,selected:p,move:E,select:(u)=>{if(i(u),t&&u!==t.state.id)_(!0)},toggle:_}},En=({choice:e,disabled:t})=>a("div",{class:"lin-move-row",children:[a(rt,{label:"Move the issue to",checked:e.move,disabled:t||e.options.length===0,onChange:e.toggle},void 0,!1,void 0,this),e.options.length>0&&a(pn,{value:e.selected?.id??null,options:e.options.map((n)=>({id:n.id,label:n.name})),disabled:t,onChange:e.select},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Xr=async(e)=>{try{let t=await C.storage.get(e);return t===void 0||t===null?null:t}catch{return null}},cc=async(e,t)=>{try{return await C.storage.set(e,t),!0}catch{return!1}};var Et=async()=>await Xr("pref:start-moves")!==!1;var Hi=async()=>await Xr("pref:assign-me")===!0;var St=async(e)=>{let t=await Xr(`pref:start-state:${e}`);return typeof t==="string"?t:null},ht=(e,t)=>cc(`pref:start-state:${e}`,t);var jr=new Set,Bi=async(e,t)=>{if(jr.has(e.sessionId))return null;jr.add(e.sessionId);try{let n=await un({sessionId:e.sessionId,action:"claim-extras"});if(!n)return null;let r=n.estimateDone===!0,o=n.estimateSet??null,s=[...n.created??[]],i=(c)=>String(c);try{let c=(await ue(He,{id:n.identifier})).issue,_=cn(c.team);if(i=(h)=>Je(h,c.team.issueEstimationType)??String(h),!r){let h=c.estimate===null?Nr(n.extras.estimate,_):null;if(h!==null)await je(c,{input:{estimate:h},patch:{estimate:h}}),o=h;r=!0}let f=t&&await Hi().catch(()=>!1)?t:null;for(let h of n.extras.issues.slice(s.length)){let E=Nr(h.estimate,_),u=await Ri({teamId:c.team.id,title:h.title,description:fi(h,c.identifier,n.sessionTitle),...c.project?{projectId:c.project.id}:{},...E!==null?{estimate:E}:{},...f?{assigneeId:f}:{}});s.push(u.identifier),await ue(Hs,{input:{issueId:u.id,relatedIssueId:c.id,type:"related"}})}return{state:await un({sessionId:n.sessionId,action:"extras-done",estimateDone:r,estimateSet:o,created:s})??{...n,state:"done",estimateDone:r,estimateSet:o,created:s},label:i}}catch(c){let _=tt(c);return{state:await un({sessionId:n.sessionId,action:"extras-failed",estimateDone:r,estimateSet:o,created:s,error:_})??{...n,state:"failed",estimateDone:r,estimateSet:o,created:s,error:_},label:i}}}finally{jr.delete(e.sessionId)}};var Wr=async(e,t,n=!1)=>{let{plan:r,isPlan:o}=await dn({source:t,identifier:e.identifier});if(!o&&!n)throw Error(pi);let s=(await ue(He,{id:e.identifier})).issue,i=di(s.description,r);if(i===null)throw Error(`The description of ${e.identifier} would be too long with the plan in it.`);await je(s,{input:{description:i},patch:{description:i}})};var Vi=async(e,t,n)=>{let r=!1;if(n.post)await Wr(e,t,n.force),r=!0;let o=await Ui(t.sessionId).catch(()=>null);if(o&&(o.state==="pending"||o.state==="claimed"))await Bi(o,Ws()).catch(()=>null);let s=await Mi({source:t,identifier:e.identifier,issueTitle:e.title,force:n.force,...n.model?{model:n.model}:{}}),i=n.state??Gr(e,e.team.states.nodes,n.lastState),c=!1,_=null;if(n.move&&i)try{await je(e,{input:{stateId:i.id},patch:{state:i}}),c=!0}catch(f){_=tt(f)}return{sessionId:s.sessionId,target:i,moved:c,moveError:_,posted:r}};var Sn=(e)=>e instanceof Error?e.message:String(e),lc=(e)=>e.replace(/\/+$/,"").split("/").pop()||e,Fi=({identifier:e,source:t,detail:n,onClose:r,onDone:o,fill:s})=>{let[i,c]=w(n??null),[_,f]=w(null),[p,h]=w(!0),[E,u]=w(null),[S,O]=w(!1),[R,y]=w(null),[T,U]=w(null),[I,se]=w(null),[ae,ce]=w(null),[V,ie]=w(!1),[W,H]=w(!1),[m,g]=w(!1),ne=mn("build",i,E,p),[Se,Ce]=w("");if(le(()=>{let M=!0;return se(null),ce(null),dn({source:t,identifier:e}).then((J)=>{if(M)se(J),ie(J.postPlan)},(J)=>{if(M)ce(Sn(J))}),()=>{M=!1}},[e,t.sessionId]),le(()=>{let M=!0;return Promise.all([n?Promise.resolve(n):ue(He,{id:e}).then((J)=>J.issue),Et().catch(()=>!0)]).then(([J,B])=>{if(!M)return;c(J),h(B),St(J.team.id).then((gt)=>{if(M)u(gt)},()=>{return})},(J)=>{if(M)f(Sn(J))}),()=>{M=!1}},[e,n]),T)return a("div",{class:"lin-build","data-state":"started",children:a("div",{class:"sui-small",children:T},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(_)return a(ye,{tone:"error",title:"Could not read the issue",body:_,action:{label:"Close",onClick:r}},void 0,!1,void 0,this);if(!i)return a(nt,{label:"Reading the issue"},void 0,!1,void 0,this);let F=async()=>{O(!0),y(null);try{await Wr(i,t,m),Le("issue"),await be(C,"success",`Added the plan to ${i.identifier}.`),H(!0)}catch(M){y(Sn(M))}finally{O(!1)}},_e=async()=>{O(!0),y(null);try{let M=await Vi(i,t,{move:ne.move,post:V&&Boolean(I),force:m,state:ne.selected,lastState:E,...Se?{model:Se}:{}});if(M.moved&&M.target)ht(i.team.id,M.target.name).catch(()=>{return});if(M.moveError)await be(C,"error",`Build started, but ${i.identifier} was not moved: ${M.moveError}`);let J=`${M.posted?"Added the plan to the issue and started":"Started"} a build for ${i.identifier}${M.moved?` and moved it to ${M.target.name}`:""}.`;if(await be(C,"success",J),U(J),M.moved)Le("block:");await ln(M.sessionId),o?.()}catch(M){y(Sn(M))}finally{O(!1)}};return a("div",{class:s?"lin-build lin-build--fill":"lin-build","data-state":"options",children:[a("div",{class:"sui-small",children:["Builds from the last reply in ",a("strong",{children:t.title},void 0,!1,void 0,this),t.agent?` (${t.agent} agent)`:"",", in ",lc(t.directory),", as a new session. It uses the build agent from Settings, on the model below."]},void 0,!0,void 0,this),ae&&a(ye,{tone:"warning",title:"The plan cannot be read yet",body:ae},void 0,!1,void 0,this),I&&!I.isPlan&&a(ye,{tone:"warning",title:"The last reply is not a plan",body:'Ask the planning session: "Repeat the final plan in full, unchanged, as your last message. No question cards." Then reopen this. Writing or building from a chat answer would put the wrong text in the issue and the build.',action:m?void 0:{label:"Use it anyway",onClick:()=>g(!0)}},void 0,!1,void 0,this),I?.earlier&&a("div",{class:"sui-muted sui-small",children:"The last reply in that session is not the plan, so this is the latest reply that was."},void 0,!1,void 0,this),I&&a("pre",{class:"lin-build-plan",children:s?I.plan.trim():ui(I.plan)},void 0,!1,void 0,this),R&&a(ye,{tone:"error",title:"Could not start the build",body:R},void 0,!1,void 0,this),a(rt,{label:"Add the plan to the issue description first",description:V?`A plan section at the end of ${i.identifier}'s description, replaced if one is already there. Then the build starts.`:void 0,checked:V&&Boolean(I),disabled:!I||S,onChange:ie},void 0,!1,void 0,this),a(En,{choice:ne,disabled:S},void 0,!1,void 0,this),a(fn,{role:"build",directory:t.directory,value:Se,onChange:Ce,disabled:S},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(ge,{label:S?"Starting...":V&&I?"Add plan and build":"Start build",size:"sm",disabled:S||!I||!I.isPlan&&!m,onClick:()=>{_e()}},void 0,!1,void 0,this),a(ge,{label:W?"Plan added":"Add plan only",variant:"outline",size:"sm",disabled:S||!I||!I.isPlan&&!m,onClick:()=>{F()}},void 0,!1,void 0,this),a(ge,{label:"Cancel",variant:"ghost",size:"sm",disabled:S,onClick:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)},Xi=(e,t)=>{let[n,r]=w(null);return le(()=>{let o=!0;if(r(null),!e)return;return wi(e,t).then((s)=>{if(o)r(s)}),()=>{o=!1}},[e,t]),n};var dc=async(e)=>{let t=await ue(Ds,{filter:si(e)}),n=new Map;for(let o of t.issues.nodes)n.set(o.identifier.toUpperCase(),o);let r=[...new Set(t.issues.nodes.filter((o)=>o.state.type==="started").map((o)=>o.team.id))];if(r.length>0)try{Xs(ii((await ue($s,{teamIds:r})).workflowStates.nodes))}catch{}return n},ji=(e)=>ft(e.length>0?`block:${e.join(",")}`:null,()=>dc(e));var ot=({ids:e,children:t})=>{let n=ji(e);if(n.data)return a(ke,{children:t(n.data)},void 0,!1,void 0,this);if(n.error){let r=n.error instanceof de?n.error:new de("network",String(n.error));if(r.kind==="disconnected")return a(Pi,{title:"Connect Linear",body:"Sign in to Linear in OpenChamber to see these issues.",action:{label:"Connect Linear",onClick:()=>{C.oauthStart()}}},void 0,!1,void 0,this);return a(ye,{tone:"error",title:"Could not load from Linear",body:r.message,action:{label:"Retry",onClick:()=>n.refresh()}},void 0,!1,void 0,this)}return a("div",{class:"lin-block-wait",children:a(nt,{label:"Loading from Linear"},void 0,!1,void 0,this)},void 0,!1,void 0,this)},Tt=({skipped:e,cut:t})=>{if(e.length===0&&t===0)return null;let n=[e.length>0?`Not an issue key: ${e.join(", ")}.`:"",t>0?`${t} more not shown.`:""].filter(Boolean);return a("div",{class:"sui-small sui-muted",children:n.join(" ")},void 0,!1,void 0,this)},st=({id:e})=>a("div",{class:"lin-block-missing sui-small sui-muted",children:[a("span",{class:"sui-mono",children:e},void 0,!1,void 0,this),a("span",{children:"Not found in Linear, or you cannot see it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var Kr=(e)=>e instanceof Error?e.message:String(e),Wi=({issue:e,plan:t,onClose:n})=>{let r=t?"plan":"session",[o,s]=w(null),[i,c]=w(null),[_,f]=w(!0),[p,h]=w(!0),[E,u]=w(!1),[S,O]=w(null),[R,y]=w(null),[T,U]=w(null),[I,se]=w(0),[ae,ce]=w(null),[V,ie]=w(null),W=Ye()?.directory??null,H=mn(t?"plan":"session",o,ae,p),[m,g]=w("");if(le(()=>{let F=!0;return s(null),c(null),Promise.all([ue(He,{id:e.identifier}),Et().catch(()=>!0),St(e.team.id).catch(()=>null)]).then(([_e,M,J])=>{if(!F)return;s(_e.issue),h(M),ce(J),Ci(W,_e.issue.branchName).then((B)=>{if(F)y(B)})},(_e)=>{if(F)c(Kr(_e))}),()=>{F=!1}},[e.identifier]),V)return a("div",{class:"lin-block-start","data-state":"started",children:a("div",{class:"sui-small",children:V},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(i)return a("div",{class:"lin-block-start",children:a(ye,{tone:"error",title:"Could not read the issue",body:i,action:{label:"Close",onClick:n}},void 0,!1,void 0,this)},void 0,!1,void 0,this);if(!o)return a("div",{class:"lin-block-start",children:a(nt,{label:"Reading the issue"},void 0,!1,void 0,this)},void 0,!1,void 0,this);let ne=S??R,Se=Br(o.branchName,I),Ce=async()=>{u(!0),U(null);try{let F=await(t?Ii:bi)(o,{worktree:_,move:H.move,existing:ne,branch:Se,state:H.selected,directoryHint:W,...t&&m?{model:m}:{}});if(!F.started){O(F.directory),U(F.error??null);return}if(F.moveError)await be(C,"error",`The ${r} started, but ${o.identifier} was not moved: ${F.moveError}`);if(!t&&F.moved&&F.target)ht(o.team.id,F.target.name).catch(()=>{return});let _e=`Started a ${r} for ${o.identifier}${F.moved?` and moved it to ${F.target.name}`:""}.`;if(await be(C,"success",_e),ie(_e),F.moved)Le("block:");await ln(F.sessionId)}catch(F){let _e=_&&!ne;if(_e)se((J)=>J+1);let M=_e?` A branch named ${Se} may already exist. Start again to try ${Br(o.branchName,I+1)}, or turn off "Work in a new worktree".`:"";U(`${Kr(F).replace(/\.+$/,"")}.${M}`),await be(C,"error",`Could not start a ${r}: ${Kr(F)}`)}finally{u(!1)}};return a("div",{class:"lin-block-start","data-state":"options",children:[S&&a(ye,{tone:"warning",title:`The worktree is ready, but the ${r} did not start`,body:`Retry starts the ${r} in ${S}.`},void 0,!1,void 0,this),!S&&R&&a(ye,{tone:"info",title:"This issue already has a worktree",body:`The session starts in ${R}, on branch ${o.branchName}.`},void 0,!1,void 0,this),t&&!S&&a("div",{class:"sui-muted sui-small",children:"Makes the worktree, then starts a planning session in it with the plan agent from Settings, on the model below. It plans and stops: it changes no files."},void 0,!1,void 0,this),T&&a(ye,{tone:"error",title:`Could not start a ${r}`,body:T},void 0,!1,void 0,this),a(rt,{label:ne?"Work in the existing worktree":"Work in a new worktree",description:`Branch ${Se}`,checked:_||Boolean(ne),disabled:Boolean(ne)||E,onChange:f},void 0,!1,void 0,this),a(En,{choice:H,disabled:E},void 0,!1,void 0,this),t&&a(fn,{role:"plan",directory:W,value:m,onChange:g,disabled:E},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(ge,{label:E?"Starting...":S?"Retry in that worktree":R?"Start in that worktree":t?"Start plan":"Start session",size:"sm",disabled:E,onClick:()=>{Ce()}},void 0,!1,void 0,this),a(ge,{label:"Cancel",variant:"ghost",size:"sm",disabled:E,onClick:n},void 0,!1,void 0,this)]},void 0,!0,void 0,this)]},void 0,!0,void 0,this)};var uc=({issue:e})=>{let[t,n]=w(null),r=Xi(Ye()?.directory??null,e.identifier),o=e.labels.nodes;return a(As,{class:"lin-block-card",children:[a("div",{class:"lin-block-title",children:[a(mt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id,size:16},void 0,!1,void 0,this),a("span",{class:"lin-block-key sui-mono sui-muted",children:e.identifier},void 0,!1,void 0,this),a("span",{class:"lin-block-name",children:e.title},void 0,!1,void 0,this)]},void 0,!0,void 0,this),a(xs,{items:[["Status",a("span",{class:"lin-block-value",children:[a(mt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this),e.state.name]},void 0,!0,void 0,this)],["Priority",a("span",{class:"lin-block-value",children:[a(rn,{priority:e.priority},void 0,!1,void 0,this),Si[e.priority]]},void 0,!0,void 0,this)],["Assignee",e.assignee?a("span",{class:"lin-block-value",children:[a(Ze,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this),e.assignee.name]},void 0,!0,void 0,this):a("span",{class:"sui-muted",children:"Unassigned"},void 0,!1,void 0,this)],...e.project?[["Project",a("span",{class:"lin-block-value",children:[a(on,{icon:e.project.icon,color:e.project.color},void 0,!1,void 0,this),e.project.name]},void 0,!0,void 0,this)]]:[],...o.length>0?[["Labels",a("span",{class:"lin-block-value lin-block-chips",children:o.map((s)=>a(sn,{label:s},s.id,!1,void 0,this))},void 0,!1,void 0,this)]]:[],...e.dueDate?[["Due",a(oe,{children:Oe(e.dueDate)},void 0,!1,void 0,this)]]:[],["Updated",a("span",{class:"sui-muted",children:bs(e.updatedAt)},void 0,!1,void 0,this)]]},void 0,!1,void 0,this),a("div",{class:"sui-row",children:[a(ge,{label:"Open in Linear",variant:"outline",size:"sm",onClick:()=>{C.openUrl(e.url)}},void 0,!1,void 0,this),a(ge,{label:"Start plan",variant:"outline",size:"sm",disabled:t==="plan",onClick:()=>n("plan")},void 0,!1,void 0,this),a(ge,{label:"Start session",variant:"outline",size:"sm",disabled:t==="session",onClick:()=>n("session")},void 0,!1,void 0,this),r&&a(ge,{label:"Start build",variant:"outline",size:"sm",disabled:t==="build",onClick:()=>n("build")},void 0,!1,void 0,this)]},void 0,!0,void 0,this),(t==="session"||t==="plan")&&a(Wi,{issue:e,plan:t==="plan",onClose:()=>n(null)},void 0,!1,void 0,this),t==="build"&&r&&a("div",{class:"lin-block-start",children:a(Fi,{identifier:e.identifier,source:r,onClose:()=>n(null)},void 0,!1,void 0,this)},void 0,!1,void 0,this)]},void 0,!0,void 0,this)},Ki=({args:e})=>{let{ids:t}=et(e.id),n=t[0];if(!n)return a("div",{class:"sui-muted",children:"LinearIssue needs an issue identifier such as ENG-123."},void 0,!1,void 0,this);return a(ot,{ids:[n],children:(r)=>{let o=r.get(n);return o?a(uc,{issue:o},void 0,!1,void 0,this):a(st,{id:n},void 0,!1,void 0,this)}},void 0,!1,void 0,this)};var pc=new Set(["id","status","assignee","priority","project","dueDate","cycle","estimate","labels","links","created","changes"]),hn=({issue:e,selected:t,cursor:n,properties:r=pc,hideProject:o,compact:s,subIssues:i,extras:c,depth:_=0,disabled:f,onOpen:p})=>a("button",{type:"button",class:"lin-issue-row","aria-selected":t?"true":"false",disabled:f,"data-cursor":n?"true":"false","data-issue":e.identifier,"data-depth":_||void 0,style:_?{paddingLeft:`${8+_*22}px`}:void 0,onClick:()=>p(e),title:e.title,children:[r.has("priority")||s?a(rn,{priority:e.priority},void 0,!1,void 0,this):null,r.has("id")||s?a("span",{class:"lin-issue-key sui-mono",children:e.identifier},void 0,!1,void 0,this):null,r.has("status")||s?a(mt,{type:e.state.type,color:e.state.color,teamId:e.team.id,stateId:e.state.id},void 0,!1,void 0,this):null,a("span",{class:"lin-issue-title",children:e.title},void 0,!1,void 0,this),!s&&a("span",{class:"lin-issue-meta",children:a(ei,{issue:e,properties:r,subIssues:i,hideProject:o,extras:c},void 0,!1,void 0,this)},void 0,!1,void 0,this),(r.has("assignee")||s)&&(e.assignee?a("span",{class:"lin-meta-assignee",title:e.assignee.name,children:a(Ze,{name:e.assignee.name,url:e.assignee.avatarUrl},void 0,!1,void 0,this)},void 0,!1,void 0,this):a("span",{class:"lin-avatar-empty","aria-label":"No assignee"},void 0,!1,void 0,this)),!s&&r.has("created")&&a("span",{class:"lin-meta-created sui-small sui-muted",title:"Created",children:Oe(e.createdAt)},void 0,!1,void 0,this),!s&&r.has("updated")&&a("span",{class:"lin-meta-updated sui-small sui-muted",title:"Updated",children:Oe(e.updatedAt)},void 0,!1,void 0,this)]},void 0,!0,void 0,this);var zr=new Set(["id","status","assignee","priority","labels","dueDate"]),zi=({args:e})=>{let{ids:t,skipped:n,cut:r}=et(e.ids),o=ri(e.title);if(t.length===0)return a(pt,{title:o||void 0,children:[a("div",{class:"sui-muted",children:"No issue identifiers to show."},void 0,!1,void 0,this),a(Tt,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this);return a(pt,{title:o||void 0,children:[a(ot,{ids:t,children:(s)=>a("div",{class:"lin-groups lin-block-rows",children:t.map((i)=>{let c=s.get(i);return c?a(hn,{issue:c,properties:zr,onOpen:(_)=>{C.openUrl(_.url)}},i,!1,void 0,this):a(st,{id:i},i,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(Tt,{skipped:n,cut:r},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var qi=({args:e,answered:t})=>{let{ids:n,skipped:r,cut:o}=et(e.ids),s=oi(e.question),[i,c]=w(null),[_,f]=w(!1),p=t??i,h=Pr(t)??i,E=async(u)=>{if(_||p)return;f(!0);try{await C.answerBlock(ai(u)),c(u.identifier)}catch(S){await be(C,"error",`Could not send your choice: ${S instanceof Error?S.message:String(S)}`)}finally{f(!1)}};return a(pt,{title:s||"Pick an issue",children:[n.length===0?a("div",{class:"sui-muted",children:"No issues to choose from."},void 0,!1,void 0,this):a(ot,{ids:n,children:(u)=>a("div",{class:"lin-groups lin-block-rows","data-answered":p?"true":"false",children:n.map((S)=>{let O=u.get(S);return O?a(hn,{issue:O,properties:zr,selected:h===S,disabled:Boolean(p)||_,onOpen:(R)=>{E(R)}},S,!1,void 0,this):a(st,{id:S},S,!1,void 0,this)})},void 0,!1,void 0,this)},void 0,!1,void 0,this),a(Tt,{skipped:r,cut:o},void 0,!1,void 0,this),p?a("div",{class:"sui-small sui-muted","data-state":"answered",children:t?`${Pr(t)?"You chose":"You answered"}: ${t}`:`You chose ${i}.`},void 0,!1,void 0,this):n.length>0&&a("div",{class:"sui-small sui-muted",children:"Click an issue to choose it."},void 0,!1,void 0,this)]},void 0,!0,void 0,this)};var _c=({call:e})=>{switch(e.name){case"LinearIssue":return a(Ki,{args:e.args},void 0,!1,void 0,this);case"LinearIssueList":return a(zi,{args:e.args},void 0,!1,void 0,this);case"LinearPickIssue":return a(qi,{args:e.args,answered:e.answered},void 0,!1,void 0,this);default:return a("div",{class:"sui-muted",children:["The Linear+ extension has no block called ",e.name.slice(0,40),"."]},void 0,!0,void 0,this)}},fc=()=>{Ye();let[e,t]=w(null),n=Ge(null);return le(()=>C.onBlock(t),[]),le(()=>{let r=n.current;if(!r)return;let o=0,s=new ResizeObserver(()=>{let i=Math.min(Math.ceil(r.getBoundingClientRect().height),bt);if(i===o)return;o=i,C.setHeight(i).catch(()=>{return})});return s.observe(r),()=>s.disconnect()},[]),a("div",{class:"lin-block",ref:n,style:{maxHeight:bt},children:e?a(_c,{call:e},`${e.name}:${JSON.stringify(e.args)}`,!1,void 0,this):a("div",{class:"sui-muted",children:"Waiting for the agent"},void 0,!1,void 0,this)},void 0,!1,void 0,this)};Yo(a(fc,{},void 0,!1,void 0,this),document.getElementById("root"));})();

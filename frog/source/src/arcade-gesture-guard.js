const NATIVE_CONTROL='input,select,textarea,[contenteditable]:not([contenteditable="false"])';
const ZOOM_KEYS=new Set(['+','=','-','_','0']);
const ZOOM_CODES=new Set(['Equal','Minus','Digit0','NumpadAdd','NumpadSubtract','Numpad0']);

// Cancel browser gestures, never pointer propagation: the game still owns each
// stick, held button and camera drag. Install once after the game UI is created.
export function installArcadeGestureGuard({document=globalThis.document,surfaces,enabled=()=>true}={}){
 const roots=surfaces??[...document.querySelectorAll('#arcade-world,#arcade-labels,#arcade-ui')];
 const listeners=[],gameTouches=new Set();
 let gameGesture=false;
 const nativeControl=node=>(node?.nodeType===3?node.parentElement:node)?.closest?.(NATIVE_CONTROL);
 const gameNode=node=>!!node?.nodeType&&!nativeControl(node)&&roots.some(root=>root&&(root===node||root.contains?.(node)));
 const eventNodes=event=>{
  const path=event.composedPath?.()||[];
  return path.length?path:[event.target];
 };
 const gameEvent=event=>{
  const nodes=eventNodes(event);
  return !nodes.some(nativeControl)&&nodes.some(gameNode);
 };
 const prevent=event=>{if(event.cancelable)event.preventDefault();};
 const listen=(type,handler,passive=false)=>{
  const options={capture:true,passive};
  document.addEventListener(type,handler,options);
  listeners.push([type,handler,options]);
 };
 const clear=()=>{gameTouches.clear();gameGesture=false;};
 const active=()=>{if(enabled())return true;clear();return false;};
 const gameTouch=event=>gameTouches.size>0||gameEvent(event)||Array.from(event.touches||[]).some(touch=>gameNode(touch.target));

 listen('touchstart',event=>{
  if(!active())return;
  for(const touch of event.changedTouches||[])if(gameNode(touch.target))gameTouches.add(touch.identifier);
  // Cancelling every touchstart would also suppress native click synthesis on
  // menu buttons. Only a multi-touch start needs the additional pinch guard.
  if(event.touches?.length>1&&gameTouch(event))prevent(event);
 });
 listen('touchmove',event=>{if(active()&&gameTouch(event))prevent(event);});
 const releaseTouches=event=>{
  for(const touch of event.changedTouches||[])gameTouches.delete(touch.identifier);
  if(!event.touches?.length)gameTouches.clear();
 };
 listen('touchend',releaseTouches,true);
 listen('touchcancel',releaseTouches,true);

 for(const type of ['gesturestart','gesturechange','gestureend'])listen(type,event=>{
  if(!active())return;
  if(type==='gesturestart')gameGesture=gameTouch(event);
  if(gameGesture||gameTouch(event))prevent(event);
  if(type==='gestureend')gameGesture=false;
 });
 // Wheel includes trackpad pan and the Ctrl-wheel events used for pinch zoom.
 // Native form controls retain their normal editing and slider interactions.
 for(const type of ['wheel','dblclick','selectstart','contextmenu','dragstart'])listen(type,event=>{
  if(active()&&gameEvent(event))prevent(event);
 });
 listen('keydown',event=>{
  if(!active()||!(event.ctrlKey||event.metaKey)||event.altKey||(!ZOOM_KEYS.has(event.key)&&!ZOOM_CODES.has(event.code)))return;
  if(eventNodes(event).some(nativeControl))return;
  const pageTarget=[document,document.body,document.documentElement].includes(event.target);
  if(gameEvent(event)||(roots.length&&pageTarget))prevent(event);
 });
 listen('visibilitychange',()=>{if(document.hidden)clear();},true);

 return ()=>{
  for(const [type,handler,options] of listeners)document.removeEventListener(type,handler,options);
  listeners.length=0;clear();
 };
}

const KEYS=['move','aim','fire'];
const GAP=8;
const bounded=(v,min,max)=>Math.max(min,Math.min(max,v));
const number=(v,fallback)=>Number.isFinite(v)?v:fallback;
const rect=(p,size)=>({left:p.x-size.width/2,top:p.y-size.height/2,right:p.x+size.width/2,bottom:p.y+size.height/2,...(size.shape==='circle'?{shape:'circle'}:{})});
const circle=box=>({x:(box.left+box.right)/2,y:(box.top+box.bottom)/2,radius:Math.min(box.right-box.left,box.bottom-box.top)/2});
function overlap(a,b,gap=GAP){
 if(a.shape==='circle'&&b.shape==='circle'){
  const ac=circle(a),bc=circle(b);return Math.hypot(ac.x-bc.x,ac.y-bc.y)<ac.radius+bc.radius+gap-.001;
 }
 if(a.shape==='circle'||b.shape==='circle'){
  const c=circle(a.shape==='circle'?a:b),box=a.shape==='circle'?b:a;
  return Math.hypot(c.x-bounded(c.x,box.left,box.right),c.y-bounded(c.y,box.top,box.bottom))<c.radius+gap-.001;
 }
 return a.left<b.right+gap&&a.right>b.left-gap&&a.top<b.bottom+gap&&a.bottom>b.top-gap;
}

function freePosition(target,size,bounds,obstacles,fallback=target){
 const minX=bounds.left+size.width/2,maxX=Math.max(minX,bounds.right-size.width/2);
 const minY=bounds.top+size.height/2,maxY=Math.max(minY,bounds.bottom-size.height/2-number(size.overflowBottom,0));
 const clip=p=>({x:bounded(number(p?.x,minX),minX,maxX),y:bounded(number(p?.y,minY),minY,maxY)});
 const desired=clip(target),free=p=>!obstacles.some(b=>overlap(rect(p,size),b));
 // An unobstructed drag follows the finger exactly, without grid snapping.
 if(free(desired))return desired;
 const candidates=[clip(fallback)];
 for(const block of obstacles){
  candidates.push(clip({x:block.left-size.width/2-GAP,y:desired.y}),clip({x:block.right+size.width/2+GAP,y:desired.y}),clip({x:desired.x,y:block.top-size.height/2-GAP}),clip({x:desired.x,y:block.bottom+size.height/2+GAP}));
  if(size.shape==='circle'){
   const radius=Math.min(size.width,size.height)/2+GAP;
   const origin=block.shape==='circle'?circle(block):{x:bounded(desired.x,block.left,block.right),y:bounded(desired.y,block.top,block.bottom),radius:0};
   const angle=Math.atan2(desired.y-origin.y,desired.x-origin.x),distance=radius+origin.radius;
   // The closest circular boundary leaves the transparent corners usable.
   candidates.push(clip({x:origin.x+Math.cos(angle)*distance,y:origin.y+Math.sin(angle)*distance}));
   if(block.shape==='circle')for(let i=0;i<24;i++)candidates.push(clip({x:origin.x+Math.cos(i*Math.PI/12)*distance,y:origin.y+Math.sin(i*Math.PI/12)*distance}));
  }
 }
 // A compact grid also finds free corners when more than one obstacle intersects.
 for(let y=minY;y<=maxY+16;y+=16)for(let x=minX;x<=maxX+16;x+=16)candidates.push(clip({x,y}));
 let best=null,score=Infinity;
 for(const p of candidates){
  if(!free(p))continue;
  const distance=(p.x-desired.x)**2+(p.y-desired.y)**2;
  if(distance<score){best=p;score=distance;}
 }
 return best||clip(fallback);
}

export function defaultTouchPositions(width,height,controls,activeKeys=KEYS){
 const portrait=height>=width,active=new Set(activeKeys),positions={};
 const move=active.has('move')&&controls.move,aim=active.has('aim')&&controls.aim,fire=active.has('fire')&&controls.fire;
 if(move)positions.move={x:14+move.width/2,y:height-26-move.height/2};
 if(aim)positions.aim={x:width-14-aim.width/2,y:height-26-aim.height/2};
 if(fire)positions.fire=aim?(portrait
  ?{x:width-14-aim.width/2,y:height-26-aim.height-20-fire.height/2}
  :{x:width-14-aim.width-22-fire.width/2,y:height-26-fire.height/2})
  :{x:width-14-fire.width/2,y:height-26-fire.height/2};
 return positions;
}

// Pure placement logic is shared by initial load, orientation changes and tests.
// Preferred positions are normalized viewport centers, not fragile CSS offsets.
export function solveTouchLayout({width,height,controls={},activeKeys=KEYS,preferred={},blocked=[],insets={}}){
 const keys=KEYS.filter(key=>activeKeys.includes(key)&&controls[key]);
 const bounds={left:Math.max(4,number(insets.left,0)+4),top:Math.max(4,number(insets.top,0)+4),right:width-Math.max(4,number(insets.right,0)+4),bottom:height-Math.max(6,number(insets.bottom,0)+4)};
 const defaults=defaultTouchPositions(width,height,controls,keys),positions={},obstacles=[...blocked];
 for(const key of keys){
  const saved=preferred[key],wanted=saved&&Number.isFinite(saved.x)&&Number.isFinite(saved.y)?{x:saved.x*width,y:saved.y*height}:defaults[key];
  positions[key]=freePosition(wanted,controls[key],bounds,obstacles,defaults[key]);
  obstacles.push(rect(positions[key],controls[key]));
 }
 return {positions,bounds};
}

export function createTouchLayout({root,movePad,aimPad,fireButton,toggleButton,storageKey='frog.touch-layout.v1',onEditingChange=()=>{},announce=()=>{}}){
 const doc=root.ownerDocument,view=doc.defaultView,controls={move:movePad,aim:aimPad,fire:fireButton};
 const hint=root.querySelector('#layout-hint');
 let editing=false,drag=null,positions={},sizes={},bounds={},activeKeys=[],saved={portrait:{},landscape:{}},frame=0,destroyed=false;
 let viewport={width:view.innerWidth,height:view.innerHeight,mode:view.innerHeight>=view.innerWidth?'portrait':'landscape'};
 const removers=[];
 const listen=(el,event,handler,options)=>{el.addEventListener(event,handler,options);removers.push(()=>el.removeEventListener(event,handler,options));};
 const orientation=()=>view.innerHeight>=view.innerWidth?'portrait':'landscape';
 const visible=el=>{
  if(!el||el.hidden||el.closest('[hidden]'))return false;
  const css=view.getComputedStyle(el),r=el.getBoundingClientRect();
  return css.display!=='none'&&css.visibility!=='hidden'&&css.visibility!=='collapse'&&r.width>0&&r.height>0;
 };
 const integratedFire=()=>!!(fireButton&&aimPad?.contains?.(fireButton));
 try{
  const stored=JSON.parse(view.localStorage.getItem(storageKey)||'null');
  if(stored?.version===1)for(const mode of ['portrait','landscape'])for(const key of KEYS){
   const p=stored[mode]?.[key];
   if(Number.isFinite(p?.x)&&Number.isFinite(p?.y))saved[mode][key]={x:bounded(p.x,0,1),y:bounded(p.y,0,1)};
  }
 }catch{}
 const persist=(keys=activeKeys)=>{
  const {mode,width,height}=viewport;
  // Temporarily hidden catapult controls retain their last saved positions.
  for(const key of keys)if(positions[key])saved[mode][key]={x:positions[key].x/width,y:positions[key].y/height};
  try{view.localStorage.setItem(storageKey,JSON.stringify({version:1,...saved}));}catch{}
 };
 const blockedRects=()=>{
  const out=[];
  // Passive HUD cards and map/status text do not claim whole forbidden regions.
  // Only the actual buttons must remain reachable around the movable pads.
  for(const el of doc.querySelectorAll('#pause-button, #view-button, #layout-button, #layout-hint .layout-reset, #kick-button, #catapult-button, #sabotage-button')){
   if(!visible(el))continue;
   const r=el.getBoundingClientRect();if(r.width&&r.height)out.push({left:r.left,top:r.top,right:r.right,bottom:r.bottom});
  }
  return out;
 };
 const paint=()=>{
  for(const key of activeKeys){const el=controls[key],p=positions[key];if(!p)continue;el.style.left=`${p.x-sizes[key].width/2}px`;el.style.top=`${p.y-sizes[key].height/2}px`;el.style.right='auto';el.style.bottom='auto';}
 };
 const refresh=()=>{
  if(destroyed)return;
  const nextKeys=KEYS.filter(key=>visible(controls[key])&&(key!=='fire'||!integratedFire()));
  if(drag&&!nextKeys.includes(drag.key))finishDrag();
  activeKeys=nextKeys;
  const style=view.getComputedStyle(root),insets={};
  for(const edge of ['left','right','top','bottom'])insets[edge]=parseFloat(style.getPropertyValue(`--touch-safe-${edge}`))||0;
  for(const key of activeKeys){const el=controls[key],r=el.getBoundingClientRect(),caption=el.querySelector('.stick-caption')?.getBoundingClientRect();sizes[key]={width:Math.max(44,r.width),height:Math.max(44,r.height),shape:'circle',overflowBottom:Math.max(0,(caption?.bottom||r.bottom)-r.bottom)};}
  for(const key of KEYS)controls[key]?.classList.toggle('layout-draggable',editing&&activeKeys.includes(key));
  const result=solveTouchLayout({width:view.innerWidth,height:view.innerHeight,controls:sizes,activeKeys,preferred:saved[orientation()],blocked:blockedRects(),insets});
  positions=result.positions;bounds=result.bounds;viewport={width:view.innerWidth,height:view.innerHeight,mode:orientation()};paint();
 };
 const requestRefresh=()=>{view.cancelAnimationFrame(frame);frame=view.requestAnimationFrame(refresh);};
 const finishDrag=()=>{if(!drag)return;const key=drag.key;drag=null;persist([key]);};
 const setEditing=value=>{
  const next=Boolean(value);if(next===editing)return;
  finishDrag();editing=next;root.classList.toggle('layout-editing',editing);toggleButton.setAttribute('aria-pressed',String(editing));toggleButton.setAttribute('aria-label',editing?'Ολοκλήρωση αλλαγής θέσεων χειριστηρίων':'Αλλαγή θέσεων χειριστηρίων');
  toggleButton.querySelector('span')?.replaceChildren(editing?'ΤΕΛΟΣ':'ΘΕΣΕΙΣ');
  if(hint)hint.hidden=!editing;
  // Let gameplay update its contextual buttons before measuring obstacles.
  onEditingChange(editing);
  // Reserve the real Reset button only while it is visible. Any temporary
  // displacement is restored on exit without overwriting a saved preference.
  refresh();
  for(const key of KEYS){const el=controls[key];if(!el)continue;el.setAttribute('data-layout-label',{move:'ΚΙΝΗΣΗ',aim:integratedFire()?'ΣΤΟΧΕΥΣΗ + ΠΥΡ':'ΣΤΟΧΕΥΣΗ',fire:'ΒΟΛΗ'}[key]);el.classList.toggle('layout-draggable',editing&&activeKeys.includes(key));}
  announce(editing?'Σύρε τα χειριστήρια σε όλη την οθόνη. Πάτησε ΤΕΛΟΣ για να συνεχίσεις.':'Οι θέσεις των χειριστηρίων αποθηκεύτηκαν.');
 };
 const reset=()=>{for(const key of activeKeys)delete saved[orientation()][key];refresh();persist();announce('Επαναφέρθηκαν οι αρχικές θέσεις χειριστηρίων.');};
 if(hint){
  if(!hint.textContent.trim())hint.append('Σύρε τα ορατά χειριστήρια. ');
  const resetButton=doc.createElement('button');resetButton.type='button';resetButton.className='layout-reset';resetButton.textContent='ΕΠΑΝΑΦΟΡΑ';resetButton.setAttribute('aria-label','Επαναφορά αρχικών θέσεων χειριστηρίων');hint.append(resetButton);listen(resetButton,'click',reset);
 }
 for(const key of KEYS){
  const el=controls[key];
  if(!el)continue;
  listen(el,'pointerdown',event=>{
   if(!editing||!activeKeys.includes(key)||!visible(el))return;event.preventDefault();event.stopImmediatePropagation();if(drag)return;
   if(!positions[key])refresh();drag={key,id:event.pointerId,dx:event.clientX-positions[key].x,dy:event.clientY-positions[key].y};el.setPointerCapture?.(event.pointerId);
  },true);
  listen(el,'pointermove',event=>{
   if(!editing||!activeKeys.includes(key)||!visible(el))return;event.preventDefault();event.stopImmediatePropagation();if(!drag||drag.id!==event.pointerId||drag.key!==key)return;
   const obstacles=blockedRects();for(const other of activeKeys)if(other!==key&&positions[other])obstacles.push(rect(positions[other],sizes[other]));
   positions[key]=freePosition({x:event.clientX-drag.dx,y:event.clientY-drag.dy},sizes[key],bounds,obstacles,positions[key]);paint();
  },true);
  for(const name of ['pointerup','pointercancel','lostpointercapture'])listen(el,name,event=>{
   if(!editing)return;event.preventDefault?.();event.stopImmediatePropagation();if(drag?.id===event.pointerId)finishDrag();
  },true);
  listen(el,'click',event=>{if(editing){event.preventDefault();event.stopImmediatePropagation();}},true);
 }
 let lastTouch=-Infinity;
 listen(toggleButton,'pointerdown',event=>{if(event.pointerType!=='touch')return;event.preventDefault();event.stopPropagation();lastTouch=Date.now();setEditing(!editing);});
 listen(toggleButton,'click',event=>{if(event.detail===0||Date.now()-lastTouch>600)setEditing(!editing);});
 listen(view,'resize',()=>{finishDrag();requestRefresh();});
 listen(view,'orientationchange',requestRefresh);
 listen(view,'keydown',event=>{if(editing&&event.code==='Escape'){event.preventDefault();event.stopImmediatePropagation();setEditing(false);}},true);
 listen(view,'blur',()=>{finishDrag();if(editing)setEditing(false);});
 toggleButton.setAttribute('aria-pressed','false');requestRefresh();
 return {get editing(){return editing;},setEditing,refresh,reset,destroy(){if(destroyed)return;setEditing(false);destroyed=true;view.cancelAnimationFrame(frame);for(const remove of removers)remove();}};
}

// Pure rules shared by runtime and regression tests. Coordinates are metres.
export const GREEK_GATES=[
 {id:'hall-pressure',kind:'pressure',x:0,z:5,width:5.2,height:4.25,wallWidth:25,plates:[{x:-4.8,z:9},{x:-3.2,z:9}],homes:[{x:-5.2,z:12.5},{x:-2.8,z:12.5}]},
 {id:'crypt-fire',kind:'fire',x:0,z:-12.5,width:5.2,height:4.25,wallWidth:17.5,plates:[],homes:[]},
 {id:'archive-secret',kind:'pressure',secret:true,x:-60,z:-8.5,rotation:Math.PI/2,width:1.65,height:2.9,wallWidth:4,plates:[{x:-57.7,z:-7.8}],homes:[{x:-55.8,z:-9.8}]},
];
// Shared fixed tray: two independent sockets in one plinth, or one socket.
// Retaining kerbs/rails use the same dimensions as the editable Blender kit.
export function pressureTray(plates){
 if(!plates.length)return null;
 const x=(plates[0].x+plates.at(-1).x)/2,y=plates[0].y??0,z=plates[0].z,w=plates.at(-1).x-plates[0].x+1.72,d=1.72,edge=.14;
 const fixtures=[{x,y:y+.02,z,w,h:.12,d,tag:'pressure-tray-floor',floor:true}];
 for(const side of [-1,1]){
  fixtures.push({x:x+side*(w-edge)/2,y:y+.22,z,w:edge,h:.28,d,tag:'pressure-tray-rim'});
  fixtures.push({x,y:y+.22,z:z+side*(d-edge)/2,w:w-edge*2,h:.28,d:edge,tag:'pressure-tray-rim'});
 }
 if(plates.length===2)fixtures.push({x,y:y+.22,z,w:edge,h:.28,d:d-edge*2,tag:'pressure-tray-divider'});
 return {x,y,z,w,d,asset:plates.length===2?'double-tray':'single-tray',fixtures};
}
export function plateOccupants(plates,weights,held){
 const used=new Set();
 return plates.map(p=>{
  const e=weights.find(e=>!used.has(e)&&e!==held&&!e.removed&&e.indestructible&&
   Math.hypot(e.body.position.x-p.x,e.body.position.z-p.z)<.48&&
   e.supported!==false&&e.body.position.y>=(p.y??0)+.32&&e.body.position.y<(p.y??0)+.9&&
   Math.hypot(e.body.velocity.x,e.body.velocity.y,e.body.velocity.z)<.65);
  if(e)used.add(e);return e||null;
 });
}
export function stepGate(state,dt,{occupied=[],heat=false}={}){
 const delta=Math.max(0,Math.min(dt,.05));
 if(state.phase==='locked'){
  if(state.kind==='pressure')state.charge=occupied.length>0&&occupied.every(Boolean)?state.charge+delta:0;
  else state.charge=Math.max(0,Math.min(2.5,state.charge+(heat?delta:-delta*.22)));
  if(state.charge>=(state.kind==='fire'?2.5:.4))state.phase='opening';
 }
 if(state.phase==='opening'){
  state.open=Math.min(1,state.open+delta/1.45);
  if(state.open>=1)state.phase='open';
 }
 return state;
}
export function weightNeedsRecovery(e,floors,home){
 const p=e.body.position;
 if(!Number.isFinite(p.x+p.y+p.z))return true;
 const tops=floors.map(f=>(f.y??0)+(f.h??0)/2),floorY=home?.floorY;
 if(p.y<Math.min(0,...tops)-.8||p.y>Math.max(0,...tops)+35)return true;
 // An unsolved supply that falls to a lower storey must return upstairs.
 if(Number.isFinite(floorY)&&p.y<floorY-.5)return true;
 // Keep each puzzle supply in its accessible approach area. A throw into an
 // adjoining locked room cannot strand it. Moving solved weights is harmless.
 if(home&&Math.hypot(p.x-home.x,p.z-home.z)>12)return true;
 return !floors.some(f=>(f.y??0)+(f.h??0)/2<=p.y+.2&&Math.abs(p.x-f.x)<f.w/2+.2&&Math.abs(p.z-f.z)<f.d/2+.2);
}
export function flameReachesGate(engine,gate,segmentBox,colliders){
 if(!engine?.heart?.firing||engine.heart.state!=='piloted')return false;
 return engine.streams.some(s=>{
  const end={x:s.origin.x+s.direction.x*s.length,z:s.origin.z+s.direction.z*s.length};
  const hit=segmentBox(s.origin,end,gate.blocker,.06);
  if(hit===null)return false;
  const y=s.origin.y+s.direction.y*s.length*hit;
  const floorY=gate.floorY??0;
  return y>floorY+.05&&y<floorY+gate.height&&!colliders.some(b=>b!==gate.blocker&&b.y-b.h/2<y&&b.y+b.h/2>y&&(segmentBox(s.origin,end,b)??Infinity)<hit-.001);
 });
}

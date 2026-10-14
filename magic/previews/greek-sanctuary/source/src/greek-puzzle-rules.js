// Pure rules shared by runtime and regression tests. Coordinates are metres.
export const GREEK_GATES=[
 {id:'hall-pressure',kind:'pressure',x:0,z:5,width:5.2,height:4.25,wallWidth:25,plates:[{x:-2,z:9},{x:2,z:9}],homes:[{x:-4,z:13},{x:4,z:13}]},
 {id:'crypt-fire',kind:'fire',x:0,z:-12.5,width:5.2,height:4.25,wallWidth:17.5,plates:[],homes:[]},
 {id:'archive-secret',kind:'pressure',secret:true,x:-60,z:-8.5,rotation:Math.PI/2,width:1.65,height:2.9,wallWidth:4,plates:[{x:-57.7,z:-7.8}],homes:[{x:-55.8,z:-9.8}]},
];
export function plateOccupants(plates,weights,held){
 const used=new Set();
 return plates.map(p=>{
  const e=weights.find(e=>!used.has(e)&&e!==held&&!e.removed&&e.indestructible&&
   Math.hypot(e.body.position.x-p.x,e.body.position.z-p.z)<.48&&
   e.supported!==false&&e.body.position.y>=.32&&e.body.position.y<.9&&
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
 if(!Number.isFinite(p.x+p.y+p.z)||p.y<-.8||p.y>35)return true;
 // Keep each puzzle supply in its accessible approach area. A throw into an
 // adjoining locked room cannot strand it. Moving solved weights is harmless.
 if(home&&Math.hypot(p.x-home.x,p.z-home.z)>12)return true;
 return !floors.some(f=>Math.abs(p.x-f.x)<f.w/2+.2&&Math.abs(p.z-f.z)<f.d/2+.2);
}
export function flameReachesGate(engine,gate,segmentBox,colliders){
 if(!engine?.heart?.firing||engine.heart.state!=='piloted')return false;
 return engine.streams.some(s=>{
  const end={x:s.origin.x+s.direction.x*s.length,z:s.origin.z+s.direction.z*s.length};
  const hit=segmentBox(s.origin,end,gate.blocker,.06);
  if(hit===null)return false;
  const y=s.origin.y+s.direction.y*s.length*hit;
  return y>.05&&y<gate.height&&!colliders.some(b=>b!==gate.blocker&&b.y-b.h/2<y&&b.y+b.h/2>y&&(segmentBox(s.origin,end,b)??Infinity)<hit-.001);
 });
}

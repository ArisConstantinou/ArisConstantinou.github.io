export const containsPoint=(r,p,pad=0)=>p.x>=r.x-pad&&p.x<=r.x+r.w+pad&&p.z>=r.z-pad&&p.z<=r.z+r.d+pad;
export const rectDistance=(r,p)=>Math.hypot(Math.max(r.x-p.x,0,p.x-r.x-r.w),Math.max(r.z-p.z,0,p.z-r.z-r.d));
export function createRoomZones(rooms,corridors=[],secrets=[]){
 secrets=secrets.map(r=>({...r,secret:true}));
 const passages=corridors.map((r,i)=>({...r,id:`passage-${i}`,passage:true}));
 const regions=[...secrets,...rooms,...passages];
 const sourceZones=new WeakMap();let focusX,focusZ,focusZone;
 function locate(p,previous){
  const secret=secrets.find(r=>containsPoint(r,p));if(secret)return secret;
  const old=rooms.find(r=>r.id===previous&&containsPoint(r,p,.08));if(old)return old;
  return rooms.find(r=>containsPoint(r,p))||passages.find(r=>containsPoint(r,p))||regions.reduce((a,b)=>rectDistance(a,p)<=rectDistance(b,p)?a:b);
 }
 function view(p,previous){
  const zone=locate(p,previous),rects=zone.passage||zone.secret?[zone]:rooms.filter(r=>r.id===zone.id);
  if(zone.passage){
   // The corridor remains visible in full; reveal only the adjoining doorway
   // shoulders, not both complete rooms through their closed walls.
   for(const id of [zone.from,zone.to]){const r=rooms.find(r=>r.id===id);if(!r)continue;
    const x=Math.max(r.x,Math.min(p.x,r.x+r.w)),z=Math.max(r.z,Math.min(p.z,r.z+r.d));
    rects.push({id:id+'-threshold',x:Math.max(r.x,x-3),z:Math.max(r.z,z-3),w:Math.min(r.x+r.w,x+3)-Math.max(r.x,x-3),d:Math.min(r.z+r.d,z+3)-Math.max(r.z,z-3)});
   }
  }else{
   for(const c of passages)if(c.from===zone.id||c.to===zone.id)rects.push(c);
   // Keep the narrow exterior entrance readable from the starting courtyard.
   if(zone.id==='courtyard')rects.push(rooms.find(r=>r.id==='bridge'));
  }
  return {zone,rects:rects.filter(Boolean).slice(0,8)};
 }
 function torchAllowed(torch,focus){
  if(!torch.lit||Math.abs(torch.position.y-(focus.y??1))>4||Math.hypot(torch.position.x-focus.x,torch.position.z-focus.z)>14)return false;
  if(focus.x!==focusX||focus.z!==focusZ){focusX=focus.x;focusZ=focus.z;focusZone=locate(focus);}
  let cached=sourceZones.get(torch);if(!cached||cached.x!==torch.position.x||cached.z!==torch.position.z){cached={x:torch.position.x,z:torch.position.z,zone:locate(torch.position)};sourceZones.set(torch,cached);}
  const a=focusZone,b=cached.zone;
  return a.id===b.id;
 }
 return {rooms,passages,secrets,locate,view,torchAllowed};
}

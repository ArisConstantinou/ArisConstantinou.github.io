// Metres. Original fourteen room cores and every puzzle connection stay fixed.
// These exterior wings form actual L/T/stepped footprints, never bounding-box floors.
export const ROOM_ARCHITECTURE={
 courtyard:{style:'greek-stoa',height:5.2},hall:{style:'greek-andron',height:7.4},
 crypt:{style:'greek-tomb',height:5.1},armoury:{style:'gothic',height:6.8},
 barracks:{style:'greek-house',height:5.8},prison:{style:'greek-fort',height:5.4},
 ritual:{style:'greek-andron',height:7.0},library:{style:'gothic',height:10.0},
 forge:{style:'gothic',height:7.2},catacombs:{style:'greek-tomb',height:4.9},
 sanctum:{style:'greek-temple',height:8.2},gallery:{style:'greek-stoa',height:9.4},
 watchtower:{style:'greek-fort',height:10.6},gatehouse:{style:'gothic',height:8.2}
};
const wings=[
 ['library',-67,-4.8,7,9,'Reading recess'],
 ['armoury',-39,-15,6,5,'Harness workshop'],
 ['forge',-68.25,-29,7,8,'Smithing bay'],
 ['gatehouse',-47,18,7,9,'Guard chamber'],
 ['barracks',33,-15,6,5,'Sleeping alcove'],
 ['prison',-29,-35,8,5,'Holding chamber'],
 ['catacombs',-16.75,-39,8,5,'Burial recess'],
 ['gallery',60,-9,5,11,'Sculpture exedra'],
 ['gallery',65,-7,4,7,'Sculpture exedra end'],
 ['watchtower',61.25,-33,6,10,'Lookout wing'],
 ['watchtower',67.25,-31,6,6,'Lookout end'],
 ['courtyard',15,18,6,7,'Eastern stoa']
].map(([id,x,z,w,d,label])=>({id,x,z,w,d,label,architectureWing:true}));
let active=[];
export function architecturePieces(rectangles){
 if(rectangles.some(r=>r.architectureWing))return rectangles;
 const originals=rectangles.filter(r=>!r.architectureWing),ids=new Set(originals.map(r=>r.id)),pieces=wings.filter(r=>ids.has(r.id)).map(r=>({...r,role:r.label,label:originals.find(p=>p.id===r.id).label}));
 for(const a of pieces)for(const b of originals){
  if(a.id===b.id)continue;
  // A separate room/corridor/secret cannot touch a new wing, bypassing a gate.
  const gap=.75;
  if(a.x<b.x+b.w+gap&&a.x+a.w>b.x-gap&&a.z<b.z+b.d+gap&&a.z+a.d>b.z-gap)
   throw Error('Architecture wing encroaches on '+b.id+': '+a.label);
 }
 active=[...originals,...pieces];return active;
}
export function architectureProfile(id){return ROOM_ARCHITECTURE[id?.replace('-secret','')]||{style:'greek-stoa',height:4.25};}
export function architecturalHeight(id,height){return height<2?height:id?.endsWith('-secret')?4.25:architectureProfile(id).height;}
export function architectureAt(x,z){return active.find(r=>r.id!=='bridge'&&x>=r.x-.7&&x<=r.x+r.w+.7&&z>=r.z-.7&&z<=r.z+r.d+.7);}
export function wingZones(){return active.filter(r=>r.architectureWing).map(r=>({name:r.id,label:r.label,secret:false,architectureWing:true,xMin:r.x,xMax:r.x+r.w,zMin:r.z,zMax:r.z+r.d}));}
export function activeArchitecture(){return active;}
export function architecturalWingReservations(roomId=null){
 const result=[];
 for(const w of active.filter(r=>r.architectureWing&&(!roomId||r.id===roomId))){
  let connection=null;
  for(const r of active.filter(r=>r!==w&&r.id===w.id)){
   const zSpan=Math.min(w.z+w.d,r.z+r.d)-Math.max(w.z,r.z),xSpan=Math.min(w.x+w.w,r.x+r.w)-Math.max(w.x,r.x);
   if(zSpan>=3.8&&Math.abs(r.x+r.w-w.x)<.001)connection={axis:'x',at:w.x,dir:1};
   else if(zSpan>=3.8&&Math.abs(w.x+w.w-r.x)<.001)connection={axis:'x',at:r.x,dir:-1};
   else if(xSpan>=3.8&&Math.abs(r.z+r.d-w.z)<.001)connection={axis:'z',at:w.z,dir:1};
   else if(xSpan>=3.8&&Math.abs(w.z+w.d-r.z)<.001)connection={axis:'z',at:r.z,dir:-1};
   if(connection)break;
  }
  if(!connection)throw Error('No physical wing entry for '+w.role);
  const c=connection,far=c.axis==='x'?(c.dir>0?w.x+w.w:w.x):(c.dir>0?w.z+w.d:w.z),start=c.at-c.dir*2;
  result.push({x:c.axis==='x'?(far+start)/2:w.x+w.w/2,y:1.95,z:c.axis==='z'?(far+start)/2:w.z+w.d/2,w:c.axis==='x'?Math.abs(far-start):3.8,h:3.9,d:c.axis==='z'?Math.abs(far-start):3.8,tag:'architecture-wing-circulation',room:w.id,role:w.role});
 }
 return result;
}
// Planning reservations only; never rendered or installed as physics bodies.
// A tray in either stair-side aisle seals the engine's route to the back room.
export function pressureTransitReservations(g){
 if((g.floorY??0)!==0)return [];
 const wings=architecturalWingReservations(g.approach);
 if(g.approach==='library'||g.approach==='gallery'){
  const center=g.approach==='library'?-51.25:51.25;
  return [...wings,...[-5.25,5.25].map(dx=>({x:center+dx,y:2,z:-3,w:3.8,h:4,d:10.5,tag:'architecture-clear-transit'}))];
 }
 if(g.approach!=='watchtower')return wings;
 return [...wings,...[45.5,57.0].map(x=>({x,y:2,z:-28,w:3.8,h:4,d:10.0,tag:'architecture-clear-transit'})),{x:51.25,y:2,z:-20.8,w:6.4,h:4,d:3.0,tag:'architecture-stair-approach'}];
}
export function architecturalSupplyAreas(g,room){
 if(!room)return [];if((g.floorY??0)!==0)return [room];
 const areas=active.filter(r=>r.id===room.id);return areas.length?areas:[room];
}
export function architecturalSupplyRange(g,areas){
 // Upper storeys cover the bays nearest these doors. Search the rest of the
 // same connected room instead of forcing its supplies beneath the landing.
 if(!['watchtower','library','gallery'].includes(g.approach))return 10;
 return Math.max(10,...areas.flatMap(r=>[r.x,r.x+r.w].flatMap(x=>[r.z,r.z+r.d].map(z=>Math.hypot(x-g.x,z-g.z)))));
}

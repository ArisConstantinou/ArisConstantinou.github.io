export const TEMPLE={precinct:{x:3.5,z:-142,w:43,d:85},connection:{x:21.5,z:-57,w:7,d:2},stylobate:{x:9.55,z:-137,w:30.9,d:69.5,y:1.2},cx:25,cz:-102.25,columnHeight:10.2};
export const MONUMENT_REGIONS={crypt:{style:'gothic',height:5.4},prison:{style:'gothic',height:5.8},catacombs:{style:'gothic',height:5.2},parthenon:{style:'greek-temple',height:.9}};
export function monumentPieces(originals){
 const result=[{...TEMPLE.precinct,id:'parthenon',label:'Παρθενώνας — ερείπια',role:'Temple precinct'},{...TEMPLE.connection,id:'parthenon',label:'Πρόπυλο του Ιερού',role:'Temple approach'}].map(r=>({...r,architectureWing:true,monument:true}));
 for(const a of result)for(const b of originals){if(b.id==='sanctum')continue;if(a.x<b.x+b.w+.7&&a.x+a.w>b.x-.7&&a.z<b.z+b.d+.7&&a.z+a.d>b.z-.7)throw Error('Temple precinct intersects '+b.id);}
 return result;
}
export const monumentReservations=()=>[{x:25,y:2,z:-51.1,w:13,h:4,d:6.6,tag:'monument-entry-puzzle-reservation'}];
export const monumentIsGothic=id=>['library','armoury','forge','gatehouse','crypt','prison','catacombs'].includes(id?.replace('-secret',''));
export function templeEncounter(entities,zones){const room=zones.find(r=>r.name==='sanctum'),roomName=e=>e.room?.name??e.room,inRoom=e=>room&&e.body.position.x>=room.xMin&&e.body.position.x<=room.xMax&&e.body.position.z>=room.zMin&&e.body.position.z<=room.zMax;return {boss:entities.find(e=>e.kind==='boss'&&(roomName(e)==='sanctum'||!roomName(e)&&inRoom(e))),guards:entities.filter(e=>e.category==='actor'&&!e.isPlayer&&e.kind!=='boss'&&roomName(e)==='sanctum').slice(0,2)};}
// Disjoint horizontal patches. Nested full rectangles would create false
// navigation layers inside the solid stylobate.
export function crepidomaPatches(){const result=[],s=TEMPLE.stylobate;
 for(let i=0;i<5;i++){
  const w=s.w+5-i,d=s.d+5-i,y=(i+1)*.2,base={y:y/2,h:y,tag:'fullmap-stair',stairId:'parthenon-crepidoma',slope:.4,tier:i};
  for(const sign of [-1,1]){
   result.push({...base,x:TEMPLE.cx,z:TEMPLE.cz+sign*(d/2-.25),w,d:.5});
   result.push({...base,x:TEMPLE.cx+sign*(w/2-.25),z:TEMPLE.cz,w:.5,d:d-1});
  }
 }
 result.push({x:TEMPLE.cx,y:.6,z:TEMPLE.cz,w:s.w,h:1.2,d:s.d,tag:'fullmap-stair',stairId:'parthenon-crepidoma',slope:.4,tier:5});return result;
}

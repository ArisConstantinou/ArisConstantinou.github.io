import {existingRooms,newRooms,corridors,secretAreas,layoutScale} from './castle-layout.js';
import {GREEK_GATES} from './greek-puzzle-rules.js';

const rooms=[...existingRooms,...newRooms],byId=new Map(rooms.map(r=>[r.id,r]));
const fireShortcuts=new Set(['crypt-ritual','forge-prison']);
const center=r=>({x:r.x+r.w/2,z:r.z+r.d/2});
// Depths use only wizard-solvable connections. This determines the accessible
// side on which to put each puzzle supply, independently of the HEARTH spawn.
function depths(){
 const edges=[['courtyard','hall'],['bridge','courtyard'],...corridors.filter(c=>!fireShortcuts.has(c.from+'-'+c.to)).map(c=>[c.from,c.to])],d=new Map([['courtyard',0]]),queue=['courtyard'];
 for(let i=0;i<queue.length;i++)for(const [a,b]of edges){const n=a===queue[i]?b:b===queue[i]?a:null;if(n&&!d.has(n)){d.set(n,d.get(queue[i])+1);queue.push(n);}}
 if(d.size!==rooms.length)throw Error('Greek progression disconnects a room');return d;
}
const depth=depths();
export function greekGatePlan(engineRoom=null){
 const result=GREEK_GATES.map(g=>({...g,plates:g.plates.map(p=>({...p})),homes:g.homes.map(p=>({...p})),approachSign:1}));
 for(const c of corridors){
  const id=c.from+'-'+c.to,vertical=c.vertical||c.w===3*layoutScale&&c.d!==3*layoutScale;
  const boss=byId.get(c.from).boss||byId.get(c.to).boss,fire=fireShortcuts.has(id),engine=c.from===engineRoom||c.to===engineRoom;
  const approach=depth.get(c.from)<=depth.get(c.to)?c.from:c.to;
  const p=center(byId.get(approach)),x=c.x+c.w/2,z=c.z+c.d/2,width=vertical?c.w:c.d;
  result.push({id:'passage-'+id,kind:fire?'fire':boss||engine?'pressure':'open',dynamic:true,from:c.from,to:c.to,approach,
   approachSign:(vertical?p.z-z:p.x-x)>=0?1:-1,x,z,rotation:vertical?0:Math.PI/2,width,height:4.25,wallWidth:width,plates:[],homes:[]});
 }
 for(const r of secretAreas.filter(r=>r.id!=='library-secret'))result.push({id:r.id,kind:'pressure',secret:true,dynamic:true,approach:r.parent,approachSign:1,x:r.entrance.x,z:r.entrance.z,rotation:r.axis==='z'?Math.PI/2:0,width:2.1,height:2.9,wallWidth:2.1,plates:[],homes:[]});
 return result;
}

export function findPressureSupply(g,colliders,props,reserved=[],engine=null){
 const room=byId.get(g.approach);if(!room)throw Error('Missing approach room for '+g.id);
 const hx=g.secret?.86:1.66,hz=.86,floorY=g.floorY??0;
 const clear=(x,z,w,d)=>colliders.every(b=>b.y-b.h/2>floorY+2.8||b.y+b.h/2<floorY+.08||Math.abs(x-b.x)>w+b.w/2+.22||Math.abs(z-b.z)>d+b.d/2+.22)
  &&props.every(p=>Math.abs((p.floorY??0)-floorY)>2.8||Math.abs(x-p.x)>w+(p.w||1)/2+.35||Math.abs(z-p.z)>d+(p.d||1)/2+.35)
  &&reserved.every(p=>Math.abs((p.y??0)-floorY)>2.8||Math.abs(x-p.x)>w+p.w/2+.35||Math.abs(z-p.z)>d+p.d/2+.35)
  &&(!engine||Math.abs((engine.y??1.22)-1.22-floorY)>3||Math.hypot(x-engine.x,z-engine.z)>Math.hypot(w,d)+2.1);
 const candidates=[];
 for(let x=room.x+hx+.6;x<room.x+room.w-hx-.6;x+=.65)for(let z=room.z+hz+.6;z<room.z+room.d-hz-.6;z+=.65){
  const distance=Math.hypot(x-g.x,z-g.z),signed=((x-g.x)*Math.sin(g.rotation||0)+(z-g.z)*Math.cos(g.rotation||0))*g.approachSign;
  if(distance<2.8||distance>10||signed<1.8||!clear(x,z,hx,hz))continue;
  // Keep the centre of the approach clear; prefer a nearby shoulder.
  const lateral=Math.abs((x-g.x)*Math.cos(g.rotation||0)-(z-g.z)*Math.sin(g.rotation||0));
  candidates.push({x,z,score:Math.abs(distance-4.6)+(lateral<2.8?5:0)});
 }
 candidates.sort((a,b)=>a.score-b.score);
 for(const tray of candidates){
  const homes=[];
  for(let x=room.x+1;x<room.x+room.w-1;x+=.65)for(let z=room.z+1;z<room.z+room.d-1;z+=.65){
   const d=Math.hypot(x-tray.x,z-tray.z),signed=((x-g.x)*Math.sin(g.rotation||0)+(z-g.z)*Math.cos(g.rotation||0))*g.approachSign;
   if(d<1.8||d>4.2||signed<1.4||Math.abs(x-tray.x)<hx+.8&&Math.abs(z-tray.z)<hz+.8||!clear(x,z,.5,.5))continue;
   homes.push({x,z,d});
  }
  homes.sort((a,b)=>a.d-b.d);const chosen=[];
  for(const p of homes)if(chosen.every(q=>Math.hypot(p.x-q.x,p.z-q.z)>1.45)){chosen.push({x:p.x,y:floorY,z:p.z});if(chosen.length===(g.secret?1:2))break;}
  if(chosen.length!==(g.secret?1:2))continue;
  return {plates:g.secret?[{x:tray.x,y:floorY,z:tray.z}]:[{x:tray.x-.8,y:floorY,z:tray.z},{x:tray.x+.8,y:floorY,z:tray.z}],homes:chosen};
 }
 throw Error('No clear pressure supply in '+g.approach+' for '+g.id);
}

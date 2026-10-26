import {WORLD_BOUNDARY} from './world-config.js';
const definitions=[{id:'1',name:'Αιχμή',color:'#a9d779',key:'4'},{id:'2',name:'Πτέρυγα',color:'#78bccc',key:'5'},{id:'3',name:'Εφεδρεία',color:'#d6b873',key:'6'}];
const validFrog=f=>f&&f.team==='ally'&&!f.dead;

export function createTacticalGroups(saved){
  return definitions.map(d=>({...d,ids:[...new Set((saved?.find?.(g=>String(g.id)===d.id)?.ids||[]).filter(id=>typeof id==='string'))]}));
}
export function saveTacticalGroup(game,groupId){
  game.tacticalGroups??=createTacticalGroups();
  const group=game.tacticalGroups.find(g=>g.id===String(groupId));if(!group)return false;
  const living=new Set(game.frogs.filter(validFrog).map(f=>f.id));
  const ids=[...(game.selectedIds||[])].filter(id=>living.has(id));if(!ids.length)return false;
  for(const other of game.tacticalGroups)other.ids=other.id===group.id?ids:other.ids.filter(id=>!ids.includes(id));
  return true;
}
export function selectTacticalGroup(game,groupId){
  const group=game.tacticalGroups?.find(g=>g.id===String(groupId));if(!group)return false;
  const ids=new Set(group.ids);game.selectedIds=new Set(game.frogs.filter(f=>validFrog(f)&&ids.has(f.id)).map(f=>f.id));return game.selectedIds.size>0;
}
export function tacticalSnapshot(game){
  const living=new Set(game.frogs.filter(validFrog).map(f=>f.id)),selected=game.selectedIds||new Set();
  return (game.tacticalGroups||definitions).map(g=>({...g,ids:(g.ids||[]).filter(id=>living.has(id)),count:(g.ids||[]).filter(id=>living.has(id)).length,selected:!!g.ids?.length&&g.ids.filter(id=>living.has(id)).every(id=>selected.has(id))}));
}

/** A flank is a real two-leg path before attacking, never a teleport or damage bonus. */
export function orderFlank(game,ids,side){
  const aimed=game.aimTarget?.kind==='actor'?game.aimTarget.entity:null;
  const target=aimed&&(aimed.team==='predator'||game.hostile(game.player,aimed))?aimed:game.hunt&&!game.hunt.dead?game.hunt:game.camps.filter(c=>!c.destroyed&&c.team.startsWith('enemy')&&(!game.creekMode||!['coexist','respect','yielded'].includes(c.creekRelation))).sort((a,b)=>Math.hypot(a.x-game.player.x,a.z-game.player.z)-Math.hypot(b.x-game.player.x,b.z-game.player.z))[0];
  if(!target)return false;
  const selected=new Set(ids),squad=game.frogs.filter(f=>validFrog(f)&&selected.has(f.id));if(!squad.length)return false;
  const dx=target.x-game.player.x,dz=target.z-game.player.z,d=Math.max(1,Math.hypot(dx,dz)),sign=side==='left'?-1:1;
  const clamp=v=>Math.max(-WORLD_BOUNDARY+6,Math.min(WORLD_BOUNDARY-6,v));
  squad.forEach((f,i)=>{
    if(f.trainingPaid)game.cancelTraining(f);game.rallyAlly?.(f);f.guard=false;f.order='flank';f.orderTarget=target;f.combatTarget=null;f.intent=null;f.brain=0;
    const width=12+(i%3)*1.8;
    f.tacticalPath=[{x:clamp(game.player.x+dx*.45+dz/d*width*sign),z:clamp(game.player.z+dz*.45-dx/d*width*sign)},{x:clamp(target.x+dz/d*(width+5)*sign),z:clamp(target.z-dx/d*(width+5)*sign)}];f.tacticalTargetId=target.id;
  });return true;
}

export function tacticalIntent(game,frog){
  if(frog.order!=='flank')return null;
  let target=frog.orderTarget;
  if(!target&&frog.tacticalTargetId)target=[...game.frogs,...game.predators,...game.camps].find(x=>x.id===frog.tacticalTargetId);
  if(!target||target.dead||target.destroyed||target.surrendered||(target.model&&target.team!=='predator'&&!game.hostile(frog,target))||(!target.model&&!target.team?.startsWith('enemy'))){frog.order='follow';frog.tacticalPath=[];frog.orderTarget=null;return null;}
  frog.orderTarget=target;
  const immediate=game.frogs.find(e=>game.hostile(frog,e)&&Math.hypot(e.x-frog.x,e.z-frog.z)<2.2);
  if(immediate)return {kind:'attack',target:immediate,support:true};
  while(frog.tacticalPath?.length&&Math.hypot(frog.x-frog.tacticalPath[0].x,frog.z-frog.tacticalPath[0].z)<2.2)frog.tacticalPath.shift();
  if(frog.tacticalPath?.length)return {kind:'move',target:frog.tacticalPath[0],support:true};
  frog.order='attack';return {kind:target.model?'attack':'camp-attack',target,support:true};
}

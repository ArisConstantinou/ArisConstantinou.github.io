// One local defender per storage. This module owns no frog combat rules and
// receives the shared ground/hit callbacks from the model to avoid a cycle.
import {BASES,ARENA_ROCKS,resolveArenaMove,hasWallSight} from './arcade-bases.js';
import {FROG_BODY,actorVerticalBounds} from './arcade-actor-bounds.js';

export const GUARD_BODY=Object.freeze({radius:.46,height:.62,centerY:.31});
export const GUARD_RULES=Object.freeze({maxHealth:4,bodyRadius:GUARD_BODY.radius,bodyHeight:GUARD_BODY.height,attackRadius:GUARD_BODY.radius,detectionRange:4.2,leashRadius:5.1,patrolRadius:.45,patrolSpeed:.65,windupSeconds:.95,chargeSpeed:8,chargeSeconds:.4,recoverySeconds:1.15,cooldownSeconds:1.65,respawnSeconds:20,hitSeconds:.18,hitInvulnerability:.1,damage:1,force:7});
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const unit=(x,z)=>{const d=Math.hypot(x,z);return d>1e-9?{x:x/d,z:z/d}:{x:0,z:1};};
const geometry=guard=>BASES.find(base=>base.id===guard?.baseId);
const emit=(state,event)=>state.events?.push(event);

export function guardActive(guard){return !!guard&&guard.kind==='guard'&&guard.health>0&&guard.mode!=='disabled'&&guard.mode!=='gone';}
export function guardHome(guard){
 const base=geometry(guard);if(!base)return null;
 const forward=unit(base.gate.x-base.stock.x,base.gate.z-base.stock.z);
 return {x:base.stock.x+forward.x*.75-forward.z*1.2,z:base.stock.z+forward.z*.75+forward.x*1.2,face:Math.atan2(forward.x,forward.z)};
}
function freshGuard(base,index=0){
 const guard={kind:'guard',id:`guard-${base.owner}`,owner:base.owner,baseId:base.id};
 const home=guardHome(guard);
 return {...guard,...home,health:GUARD_RULES.maxHealth,maxHealth:GUARD_RULES.maxHealth,mode:'patrol',windup:0,charge:0,recovery:0,cooldown:0,respawnTime:0,hit:0,invuln:0,targetId:null,chargeX:Math.sin(home.face),chargeZ:Math.cos(home.face),chargeOriginX:home.x,chargeOriginZ:home.z,chargeHit:false,patrolPhase:index*Math.PI*2/3};
}
export function createGuards(){return BASES.map(freshGuard);}

function segmentDistance(a,b,p){
 const dx=b.x-a.x,dz=b.z-a.z,length=dx*dx+dz*dz,t=length>1e-12?clamp(((p.x-a.x)*dx+(p.z-a.z)*dz)/length,0,1):0;
 return Math.hypot(a.x+dx*t-p.x,a.z+dz*t-p.z);
}
export function guardHasSight(a,b){return hasWallSight(a,b,.08)&&ARENA_ROCKS.every(rock=>segmentDistance(a,b,rock)>rock.r+.08);}
export function guardOverlapsActorHeight(guard,actor,ground=()=>0,padding=0){
 const floor=finite(ground(guard.x,guard.z)),body=actorVerticalBounds(actor,ground(actor.x,actor.z));
 return body.bottom<=floor+GUARD_BODY.height+padding&&body.top>=floor-padding;
}
function hostileActor(guard,actor){return actor&&actor.id!==guard.owner&&!actor.ko&&!actor.eliminated;}
function canStrike(guard,actor,ground){return hostileActor(guard,actor)&&actor.invuln<=0&&actor.spawnShield<=0&&guardOverlapsActorHeight(guard,actor,ground)&&guardHasSight(guard,actor);}
function recover(guard,seconds=GUARD_RULES.recoverySeconds){
 guard.mode='recover';guard.windup=0;guard.charge=0;guard.recovery=seconds;guard.cooldown=Math.max(guard.cooldown,GUARD_RULES.cooldownSeconds);guard.targetId=null;
}
export function hitGuard(state,guard,attack={}){
 if(state.phase!=='battle'||!guardActive(guard)||attack.owner===guard.owner||guard.invuln>0)return false;
 const damage=clamp(Math.floor(finite(attack.damage,1)),1,GUARD_RULES.maxHealth),before=guard.health;
 guard.health=Math.max(0,guard.health-damage);guard.hit=GUARD_RULES.hitSeconds;guard.invuln=GUARD_RULES.hitInvulnerability;
 recover(guard,.35);
 emit(state,{type:'guardHit',id:guard.id,baseId:guard.baseId,owner:attack.owner,x:guard.x,z:guard.z,health:guard.health,damage:before-guard.health,dx:finite(attack.dx),dz:finite(attack.dz)});
 if(attack.owner==='player'&&state.stats)state.stats.hits++;
 if(guard.health===0){
  guard.mode='disabled';guard.respawnTime=GUARD_RULES.respawnSeconds;guard.recovery=0;guard.cooldown=0;guard.invuln=0;
  emit(state,{type:'guardDown',id:guard.id,baseId:guard.baseId,owner:attack.owner,x:guard.x,z:guard.z});
 }
 return true;
}
export function removeBaseGuards(state,baseId){
 for(const guard of state.guards||[])if(guard.baseId===baseId&&guard.mode!=='gone'){
  Object.assign(guard,{mode:'gone',health:0,windup:0,charge:0,recovery:0,cooldown:0,respawnTime:0,targetId:null});
  emit(state,{type:'guardGone',id:guard.id,baseId});
 }
}

// Restrict a straight charge to the storage leash before asking the same
// scenery sweep used by frogs. Stop at a solid; never bend the committed lane.
function chargeSegment(guard,length){
 const base=geometry(guard);if(!base)return {point:{x:guard.x,z:guard.z},blocked:true};
 const direction=unit(guard.chargeX,guard.chargeZ),ox=guard.x-base.stock.x,oz=guard.z-base.stock.z,dot=ox*direction.x+oz*direction.z;
 const toLeash=Math.max(0,-dot+Math.sqrt(Math.max(0,dot*dot+GUARD_RULES.leashRadius**2-ox*ox-oz*oz))),travel=Math.min(length,toLeash);
 const point=resolveArenaMove(guard,direction.x*travel,direction.z*travel,{radius:GUARD_BODY.radius});
 const expected={x:guard.x+direction.x*travel,z:guard.z+direction.z*travel};
 return {point,blocked:travel<length-1e-6||distance(point,expected)>1e-5};
}
export function guardChargeLane(guard){
 const start={x:finite(guard.chargeOriginX,guard.x),z:finite(guard.chargeOriginZ,guard.z)},cursor={...guard,...start},points=[start];
 let remaining=GUARD_RULES.chargeSpeed*GUARD_RULES.chargeSeconds;
 while(remaining>1e-7){const length=Math.min(.08,remaining),next=chargeSegment(cursor,length);Object.assign(cursor,next.point);points.push({...next.point});remaining-=length;if(next.blocked)break;}
 return {start,end:points.at(-1),points,distance:distance(start,points.at(-1))};
}
function firstBodyContact(a,b,actor,radius){
 const dx=b.x-a.x,dz=b.z-a.z,ox=a.x-actor.x,oz=a.z-actor.z,A=dx*dx+dz*dz,C=ox*ox+oz*oz-radius*radius;
 if(C<=0)return 0;if(A<1e-12)return null;
 const B=ox*dx+oz*dz,D=B*B-A*C;if(D<0)return null;
 const t=(-B-Math.sqrt(D))/A;return t>=0&&t<=1?t:null;
}
function moveCharge(state,guard,dt,ground,hitActor){
 let remaining=GUARD_RULES.chargeSpeed*Math.min(dt,guard.charge),blocked=false;
 while(remaining>1e-7&&!guard.chargeHit){
  const from={x:guard.x,z:guard.z},length=Math.min(.08,remaining),next=chargeSegment(guard,length),contacts=[];
  for(const actor of state.actors){
   if(!hostileActor(guard,actor))continue;
   const t=firstBodyContact(from,next.point,actor,GUARD_RULES.attackRadius+FROG_BODY.movementRadius);if(t===null)continue;
   const at={...guard,x:from.x+(next.point.x-from.x)*t,z:from.z+(next.point.z-from.z)*t};
   if(canStrike(at,actor,ground))contacts.push({actor,t,at});
  }
  const contact=contacts.sort((a,b)=>a.t-b.t||a.actor.id.localeCompare(b.actor.id))[0];
  if(contact&&hitActor(state,contact.actor,{owner:guard.id,dx:guard.chargeX,dz:guard.chargeZ,damage:GUARD_RULES.damage,force:GUARD_RULES.force})){
   guard.x=contact.at.x;guard.z=contact.at.z;guard.chargeHit=true;
   emit(state,{type:'guardStrike',id:guard.id,targetId:contact.actor.id,baseId:guard.baseId,x:guard.x,z:guard.z});
  }else Object.assign(guard,next.point);
  remaining-=length;if(next.blocked){blocked=true;break;}
 }
 guard.charge=Math.max(0,guard.charge-dt);
 if(guard.chargeHit||blocked||guard.charge<=1e-8)recover(guard);
}
function patrol(guard,dt){
 const home=guardHome(guard);if(!home)return;
 guard.patrolPhase=(guard.patrolPhase+dt*.65)%(Math.PI*2);
 const near=distance(guard,home)<1,goal=near?{x:home.x+Math.sin(guard.patrolPhase)*GUARD_RULES.patrolRadius,z:home.z+Math.cos(guard.patrolPhase)*GUARD_RULES.patrolRadius*.55}:home;
 const d=distance(guard,goal);if(d<.02)return;
 const direction=unit(goal.x-guard.x,goal.z-guard.z),travel=Math.min(d,GUARD_RULES.patrolSpeed*dt),next=resolveArenaMove(guard,direction.x*travel,direction.z*travel,{radius:GUARD_BODY.radius});
 if(distance(guard,next)>.001)guard.face=Math.atan2(next.x-guard.x,next.z-guard.z);
 Object.assign(guard,next);
}
export function stepGuards(state,dt,{ground=()=>0,hitActor=()=>false}={}){
 dt=clamp(finite(dt),0,.05);if(dt===0)return;
 for(const guard of state.guards||[]){
  const base=state.bases?.find(base=>base.id===guard.baseId);
  if(!base||base.destroyed){removeBaseGuards(state,guard.baseId);continue;}
  if(guard.mode==='gone')continue;
  guard.hit=Math.max(0,guard.hit-dt);guard.invuln=Math.max(0,guard.invuln-dt);guard.cooldown=Math.max(0,guard.cooldown-dt);
  if(guard.mode==='disabled'){
   guard.respawnTime=Math.max(0,guard.respawnTime-dt);
   if(guard.respawnTime<=1e-8){Object.assign(guard,freshGuard(geometry(guard)));guard.cooldown=GUARD_RULES.windupSeconds;emit(state,{type:'guardRespawn',id:guard.id,baseId:guard.baseId,x:guard.x,z:guard.z});}
   continue;
  }
  if(state.phase!=='battle'){guard.mode='patrol';guard.windup=guard.charge=guard.recovery=0;guard.targetId=null;patrol(guard,dt);continue;}
  if(guard.mode==='windup'){
   guard.windup=Math.max(0,guard.windup-dt);
   if(guard.windup<=1e-8){guard.mode='charge';guard.charge=GUARD_RULES.chargeSeconds;emit(state,{type:'guardCharge',id:guard.id,baseId:guard.baseId,x:guard.x,z:guard.z});}
   continue;
  }
  if(guard.mode==='charge'){moveCharge(state,guard,dt,ground,hitActor);continue;}
  if(guard.mode==='recover'){guard.recovery=Math.max(0,guard.recovery-dt);if(guard.recovery<=1e-8)guard.mode='patrol';else continue;}
  const homeGeometry=geometry(guard),target=guard.cooldown<=0?state.actors.filter(actor=>hostileActor(guard,actor)&&actor.spawnShield<=0&&distance(actor,homeGeometry.stock)<=GUARD_RULES.leashRadius&&distance(guard,actor)<=GUARD_RULES.detectionRange&&guardHasSight(guard,actor)).sort((a,b)=>distance(guard,a)-distance(guard,b)||a.id.localeCompare(b.id))[0]:null;
  if(target){
   const direction=unit(target.x-guard.x,target.z-guard.z);
   Object.assign(guard,{mode:'windup',windup:GUARD_RULES.windupSeconds,charge:0,targetId:target.id,chargeX:direction.x,chargeZ:direction.z,chargeOriginX:guard.x,chargeOriginZ:guard.z,chargeHit:false,face:Math.atan2(direction.x,direction.z)});
   emit(state,{type:'guardWindup',id:guard.id,targetId:target.id,baseId:guard.baseId,x:guard.x,z:guard.z});
  }else patrol(guard,dt);
 }
}

export function restoreGuards(state,saved){
 state.guards=createGuards();
 for(const guard of state.guards){
  const base=state.bases.find(base=>base.id===guard.baseId);
  if(base?.destroyed){Object.assign(guard,{mode:'gone',health:0});continue;}
  const old=Array.isArray(saved)?saved.find(value=>value?.id===guard.id&&value.owner===guard.owner&&value.baseId===guard.baseId):null;
  if(!old)continue;
  guard.health=clamp(Math.floor(finite(old.health,GUARD_RULES.maxHealth)),0,GUARD_RULES.maxHealth);
  if(Number.isFinite(old.x)&&Number.isFinite(old.z)&&distance(old,geometry(guard).stock)<=GUARD_RULES.leashRadius){
   const clear=resolveArenaMove(old,0,0,{radius:GUARD_BODY.radius});if(distance(clear,geometry(guard).stock)<=GUARD_RULES.leashRadius)Object.assign(guard,clear);
  }
  guard.face=finite(old.face,guard.face);guard.patrolPhase=finite(old.patrolPhase,guard.patrolPhase)%(Math.PI*2);
  if(guard.health===0||old.mode==='disabled'){
   guard.health=0;guard.mode='disabled';guard.respawnTime=clamp(finite(old.respawnTime,GUARD_RULES.respawnSeconds),.01,GUARD_RULES.respawnSeconds);
  }else{
   // Resuming never releases an almost-expired surprise charge. Preserve
   // health and position, then require a fresh readable acquisition cue.
   guard.cooldown=Math.max(GUARD_RULES.windupSeconds,clamp(finite(old.cooldown),0,GUARD_RULES.cooldownSeconds));
  }
 }
 return state.guards;
}

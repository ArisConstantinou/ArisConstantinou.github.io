import {scenerySurfaces} from './arcade-scenery-contact.js';
import {ammunitionCapacity,characterProfile,aerialAttack,CHARACTER_IDS} from './arcade-character-classes.js';
import {freshStats,cleanStats} from './arcade-leaderboard.js';
import {AIR_RULES,stepFlight,canAirVolley,landingSurfaces} from './arcade-air-movement.js';
// FROG arcade rules. Rendering-free and deterministic for repeatable tests.
import {ARTILLERY,CATAPULTS,createCatapults,nearbyCatapult,interactCatapult,catapultSeatPoint,releaseCatapult,throwStone,stepArtillery} from './arcade-artillery.js';
import {BASES,ARENA_ROCKS,resolveArenaMove,hasWallSight,coverAt,terrainSpeed,navigateTo,insideHome} from './arcade-bases.js';
import {PROJECTILE,normalizeAim,worldRay,projectileLaunch,projectilePoint,traceProjectile,projectileOrigin,projectileGround,projectileMouth} from './arcade-projectiles.js';
import {FROG_BODY,frogBody,actorBodiesOverlapHeight} from './arcade-actor-bounds.js';
import {resetBotAim,planBotShot} from './arcade-bot-combat.js';
import {ARENA_RADIUS,ARENA_MOVE_RADIUS,BATTLEGROUND_SWARMS} from './arcade-battleground.js';
import {GUARD_BODY,createGuards,guardActive,guardOverlapsActorHeight,hitGuard,stepGuards,restoreGuards,removeBaseGuards} from './arcade-guards.js';
export {setProjectileWorld,projectileOrigin} from './arcade-projectiles.js';

export const ARCADE_VERSION = '4.4.19';
export const SAVE_KEY = 'frog-arcade-save-v1';
export const SETTINGS_KEY = 'frog-arcade-settings-v1';
export const RULES = Object.freeze({radius:ARENA_RADIUS,capacity:90,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:2.4,kickCooldown:1.1,kickDuration:.48,hopDuration:.30,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:20,sabotageSeconds:8,sabotageRange:2.4,sabotageRecovery:.55,respawnSeconds:12,respawnProtectionSeconds:1,revealSeconds:2.5});
export const OBSTACLES = ARENA_ROCKS;
const ORIGINAL_SWARM_POINTS=[[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]];
export const FLIES_PER_SWARM=12;
export const SWARMS = Object.freeze([...ORIGINAL_SWARM_POINTS,...BATTLEGROUND_SWARMS].map(([x,z],i)=>Object.freeze({id:`swarm-${i}`,x,z,radius:2.1})));
const LEGACY_FLY_COUNT=ORIGINAL_SWARM_POINTS.length*FLIES_PER_SWARM,FLY_COUNT=SWARMS.length*FLIES_PER_SWARM;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const norm=(x,z)=>{const n=Math.hypot(x,z);return n>1e-6?{x:x/n,z:z/n}:{x:0,z:1};};
const finite=(v,f=0)=>Number.isFinite(v)?v:f;
function rng(s){let t=s.seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}
function actor(id,x,z,heading=Math.PI){
 return {id,x,z,aimX:Math.sin(heading),aimY:0,aimZ:Math.cos(heading),aim3D:false,aiming:false,poseAiming:false,poseAimYaw:null,face:heading,ammo:RULES.capacity,load:1,dizzy:0,finishHits:0,dizzyTime:0,ko:false,eliminated:false,respawnTime:0,hit:0,invuln:0,spawnShield:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:false,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,flight:null,support:null,dashCooldown:0,airSpit:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,knockUpFloor:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:false,machineTimer:id==='rival-1'?8:12,machineSeeking:false,aimWindup:0,aiShotReady:0,aiCharging:false,aiTargetId:null,aiReaction:0,aiBurstShots:0,aiAimPoint:null,aiAimX:Math.sin(heading),aiAimY:0,aiAimZ:Math.cos(heading),refilling:false,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0};
}
function rememberAimFacing(a){
 if(a.id==='player'&&Number.isFinite(a.aimX)&&Number.isFinite(a.aimZ)&&Math.hypot(a.aimX,a.aimZ)>.001)a.poseAimYaw=Math.atan2(a.aimX,a.aimZ);
}
export function ownBase(s,a){return s.bases?.find(b=>b.owner===a.id)||null;}
const baseGeometry=b=>BASES.find(g=>g.id===b?.id);

// Resolve every scenery contact together, so sliding past a corner or rock
// cannot put the frog back inside a different solid.
export function moveBody(a,dx,dz,s=null){
 const next=resolveArenaMove(a,dx,dz,{arenaRadius:ARENA_MOVE_RADIUS,ground:(x,z)=>s?projectileGround(s,x,z):0,catapults:s?.catapults});a.x=next.x;a.z=next.z;
}
const overlappingHeight=(s,a,b,padding=0)=>b.kind==='guard'?guardOverlapsActorHeight(b,a,(x,z)=>projectileGround(s,x,z),padding):actorBodiesOverlapHeight(a,b,{groundA:projectileGround(s,a.x,a.z),groundB:projectileGround(s,b.x,b.z),padding});
// Small symmetric body contacts keep active frogs distinct. Scenery still
// constrains every correction; a neighbour can never push a frog through a wall.
export function resolveActorContacts(s){
 const actors=s.actors.filter(a=>!a.ko&&!a.eliminated);
 for(let pass=0;pass<3;pass++)for(let i=0;i<actors.length;i++)for(let j=i+1;j<actors.length;j++){
  const a=actors[i],b=actors[j],minimum=frogBody(a).movementRadius+frogBody(b).movementRadius,dx=b.x-a.x,dz=b.z-a.z,d=Math.hypot(dx,dz);
  if(d>=minimum-1e-5||!overlappingHeight(s,a,b))continue;
  const movableA=!a.catapultId,movableB=!b.catapultId,total=Number(movableA)+Number(movableB);if(!total)continue;
  const nx=d>1e-7?dx/d:1,nz=d>1e-7?dz/d:0,share=(minimum-d+1e-4)/total;
  const ax=a.x,az=a.z,bx=b.x,bz=b.z;
  if(movableA)moveBody(a,-nx*share,-nz*share,s);
  if(movableB)moveBody(b,nx*share,nz*share,s);
  const remaining=minimum-Math.hypot(b.x-a.x,b.z-a.z);
  if(remaining>1e-5){
   const travelledA=(ax-a.x)*nx+(az-a.z)*nz,travelledB=(b.x-bx)*nx+(b.z-bz)*nz;
   if(movableB&&(!movableA||travelledA<share*.5))moveBody(b,nx*(remaining+1e-4),nz*(remaining+1e-4),s);
   else if(movableA&&(!movableB||travelledB<share*.5))moveBody(a,-nx*(remaining+1e-4),-nz*(remaining+1e-4),s);
  }
 }
}
function segmentCircle(x,z,nx,nz,c,r){const dx=nx-x,dz=nz-z,ox=x-c.x,oz=z-c.z,A=dx*dx+dz*dz,C=ox*ox+oz*oz-r*r;if(C<=0)return 0;if(A<1e-12)return null;const B=2*(ox*dx+oz*dz),D=B*B-4*A*C;if(D<0)return null;const t=(-B-Math.sqrt(D))/(2*A);return t>=0&&t<=1?t:null;}
export function clearPickupPath(a,f){return hasWallSight(a,f,.1)&&OBSTACLES.every(o=>segmentCircle(a.x,a.z,f.x,f.z,o,o.r+.1)===null);}
export function canDetect(observer,target){return !target.ko&&!target.eliminated&&distance(observer,target)<=23&&clearPickupPath(observer,target)&&(!coverAt(target)||target.revealedTime>0||distance(observer,target)<2.2);}
function placeFly(s,f){
 const patch=SWARMS[Math.floor(f.id/FLIES_PER_SWARM)];f.swarmId=patch.id;
 const angle=rng(s)*Math.PI*2,r=Math.sqrt(rng(s))*patch.radius;
 f.x=patch.x+Math.sin(angle)*r;f.z=patch.z+Math.cos(angle)*r;f.wait=0;f.phase=rng(s)*Math.PI*2;
}
export function newRound(seed=731){
 const s={version:2,swarmVersion:1,guardVersion:1,seed,time:0,status:'playing',phase:'countdown',intro:RULES.introSeconds,actors:BASES.map(b=>actor(b.owner,b.spawn.x,b.spawn.z,b.spawnHeading)),bases:BASES.map(b=>({id:b.id,owner:b.owner,x:b.x,z:b.z,destroyed:false,destroyedAt:null,progress:0,attackerId:null})),guards:createGuards(),flies:[],catapults:createCatapults(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0,basesDestroyed:0}};
 s.scoreboard=Object.fromEntries(s.actors.map(a=>[a.id,freshStats()]));s.scoreboardSince=0;
 for(let i=0;i<FLY_COUNT;i++){const f={id:i,swarmId:'',x:0,z:0,wait:0,phase:0};placeFly(s,f);s.flies.push(f);}
 return s;
}
export function fireRing(x,y){const d=Math.hypot(x,y);return {x:d>.08?x/Math.max(1,d):0,z:d>.08?y/Math.max(1,d):0,fire:d>=.72};}
export function kickTarget(s,a,targetId=undefined){
 if(!a||!Array.isArray(s?.actors))return null;
 // Preserve Q's ordinary frog priority, including the dizzy target badge.
 // Guards are the close defensive fallback or an explicitly requested body.
 const reachable=b=>(targetId===undefined||b.id===targetId)&&distance(a,b)<=RULES.kickRange&&overlappingHeight(s,a,b,.1)&&clearPickupPath(a,b);
  const frog=s.actors.filter(b=>b.id!==a.id&&!b.ko&&!b.eliminated&&(targetId!==undefined||!(b.spawnShield>0))&&reachable(b)).sort((b,c)=>distance(a,b)-distance(a,c))[0];
 if(frog)return frog;
 return (s.guards||[]).filter(b=>guardActive(b)&&b.owner!==a.id&&reachable(b)).sort((b,c)=>distance(a,b)-distance(a,c))[0]||null;
}
// One readiness query drives keyboard Q and the contextual button. In
// particular, the brief damage immunity between bullets is not an input lock:
// a kick may wind up now and deliver its single contact when immunity expires.
export function kickAvailability(s,a,targetId=undefined){
 if(s?.status!=='playing'||s.phase!=='battle'||!a||a.ko||a.eliminated)return {state:'unavailable',reason:'inactive',target:null};
 if(a.dizzyTime>0||a.knockUp>0)return {state:'unavailable',reason:'incapacitated',target:null};
 if(a.catapultId)return {state:'unavailable',reason:'mounted',target:null};
 if(a.hit>0)return {state:'unavailable',reason:'hit',target:null};
 if(a.kick>0||a.kickCooldown>0)return {state:'cooldown',reason:'cooldown',target:null};
 const target=targetId===undefined?kickTarget(s,a):s.actors?.find(b=>b.id===targetId&&b.id!==a.id&&!b.ko&&!b.eliminated)||(s.guards||[]).find(b=>b.id===targetId&&b.owner!==a.id&&guardActive(b));
 if(!target)return {state:'unavailable',reason:'target',target:null};
 if(distance(a,target)>RULES.kickRange)return {state:'out-of-range',reason:'range',target};
 if(!overlappingHeight(s,a,target,.1))return {state:'blocked',reason:'height',target};
 if(!clearPickupPath(a,target))return {state:'blocked',reason:'wall',target};
 if(target.spawnShield>0)return {state:'unavailable',reason:'protection',target};
 return {state:'ready',reason:'ready',target};
}
export function canKick(s,a,targetId=undefined){
 return kickAvailability(s,a,targetId).state==='ready';
}
export function collect(s,a){
 if(a.ko||a.eliminated||a.dizzyTime>0||a.catapultId||a.tongue>0||a.ammo>=ammunitionCapacity(a)||a.height>RULES.pickupRange)return false;
 const home=ownBase(s,a),stock=baseGeometry(home)?.stock;
 if(home&&!home.destroyed&&stock&&distance(a,stock)<=RULES.pickupRange&&clearPickupPath(a,stock)){
  a.tongue=RULES.tongueInterval;a.ammo++;
  s.events.push({type:'tongue',id:a.id,x:stock.x,z:stock.z,baseId:home.id});
  if(a.id==='player')s.stats.caught++;if(s.scoreboard?.[a.id])s.scoreboard[a.id].caught++;
  return true;
 }
 const f=s.flies.filter(f=>f.wait<=0&&distance(a,f)<=RULES.pickupRange&&clearPickupPath(a,f)).sort((f,g)=>distance(a,f)-distance(a,g))[0];
 if(!f)return false;
 a.tongue=RULES.tongueInterval;a.ammo++;f.wait=7+rng(s)*4;
 s.events.push({type:'tongue',id:a.id,x:f.x,z:f.z,swarmId:f.swarmId});if(a.id==='player')s.stats.caught++;if(s.scoreboard?.[a.id])s.scoreboard[a.id].caught++;return true;
}
// Camera rays see the same solid geometry as shots. The context lives outside
// serialized state; attach it after a fresh game, resume or QA replacement.
export function traceWorldRay(s,origin,direction,range,options={}){return worldRay(s,origin,direction,range,{...options,obstacles:OBSTACLES});}
export function traceShot(s,a,range=RULES.projectileSpeed*RULES.projectileLifetime+PROJECTILE.muzzleOffset){
 const launch=projectileLaunch(s,a),length=Math.max(0,finite(range)),contact=traceProjectile(s,launch,length,{obstacles:OBSTACLES,ignoreId:a.id,hitActors:s.phase==='battle',arenaRadius:RULES.radius-.2});
 const endpoint=contact||projectilePoint(s,launch,length),distance=contact?.distance??length;
 return {x:endpoint.x,y:endpoint.y,z:endpoint.z,distance,targetId:contact?.targetId??null,blocked:contact?.blocked??false,kind:contact?.kind??null,normal:contact?.normal??null,origin:{x:launch.x,y:launch.y,z:launch.z},muzzle:projectilePoint(s,launch,Math.min(PROJECTILE.muzzleOffset,distance)),direction:{x:launch.dx,y:launch.dy,z:launch.dz}};
}
function projectileImpact(s,bullet,contact){
 Object.assign(bullet,{x:contact.x,y:contact.y,z:contact.z,life:0});
 if(contact.kind==='actor'||contact.kind==='guard'){const target=contact.kind==='guard'?s.guards?.find(g=>g.id===contact.targetId):s.actors.find(a=>a.id===contact.targetId);if(target&&hit(s,target,bullet)&&bullet.scoredShot&&s.scoreboard?.[bullet.owner])s.scoreboard[bullet.owner].shotHits++;}
 s.events.push({type:'splat',x:bullet.x,y:bullet.y,z:bullet.z,wall:contact.kind==='wall'||contact.kind==='rock'||contact.kind==='roof',kind:contact.kind,normal:contact.normal,dx:bullet.dx,dy:bullet.dy,dz:bullet.dz});
}
export function shoot(s,a){
 if(a.ko||a.eliminated||a.dizzyTime>0||a.hit>0||a.catapultId||a.knockUp>0||a.kick>0||a.shot>0||(a.ammo<=0&&!(s.training&&a.id==='player'))||(a.id!=='player'&&s.phase!=='battle'))return false;
 a.shot=RULES.shotInterval;if(s.training&&a.id==='player')a.ammo=ammunitionCapacity(a);else a.ammo--;a.spawnShield=0;a.revealedTime=RULES.revealSeconds;
 rememberAimFacing(a);
 const launch=projectileLaunch(s,a),bullet={id:s.nextId++,owner:a.id,scoredShot:s.phase==='battle',...launch,life:RULES.projectileLifetime};
 // Sweep source to muzzle so nearby solids cannot be skipped by its offset.
 const contact=traceProjectile(s,bullet,PROJECTILE.muzzleOffset,{obstacles:OBSTACLES,ignoreId:a.id,hitActors:s.phase==='battle',arenaRadius:RULES.radius-.2});
 if(contact)projectileImpact(s,bullet,contact);
 else{Object.assign(bullet,projectilePoint(s,bullet,PROJECTILE.muzzleOffset));s.bullets.push(bullet);}
 s.events.push({type:'shot',id:a.id});if(a.id==='player')s.stats.shots++;if(s.phase==='battle'&&s.scoreboard?.[a.id])s.scoreboard[a.id].shots++;return true;
}
export function shootAirVolley(s,a){
 if(!canAirVolley(s,a)||a.hit>0||a.kick>0)return false;
 const ability=aerialAttack(a);
 if(ability&&['bodySlam','airKick'].includes(ability.kind)){
  a.flight.fired=true;a.flight.queued=false;a.spawnShield=0;a.revealedTime=RULES.revealSeconds;
  const duration=ability.kind==='bodySlam'?2/3:ability.double?.6:8/15;
  a.classAction={kind:ability.kind,clip:ability.kind==='bodySlam'?'BodySlam':ability.double?'DoubleKick':'AirKick',duration,remaining:duration,damage:ability.damage,settled:false};
  if(ability.kind==='bodySlam'){a.flight.vy=-24;a.flight.vx*=.55;a.flight.vz*=.55;}else a.flight.vy=Math.min(a.flight.vy,-14);
  s.events.push({type:'classAttack',id:a.id,kind:ability.kind,double:ability.double});return true;
 }
 a.flight.fired=true;a.flight.queued=false;
 const origin=projectileMouth(s,a),plan=aerialAttack(a),count=plan?.count||3,yaw=Number.isFinite(a.poseAimYaw)?a.poseAimYaw:a.face||0,right={x:Math.cos(yaw),z:-Math.sin(yaw)};
 if(s.training&&a.id==='player')a.ammo=ammunitionCapacity(a);else a.ammo-=count;a.lastVolleyDouble=a.characterClass==='medium'&&a.flight.jumps>=2;
 a.shot=RULES.shotInterval;a.spawnShield=0;a.revealedTime=RULES.revealSeconds;
 const directions=count===8?Array.from({length:8},(_,i)=>normalizeAim(Math.sin(i*Math.PI/4)*.85,-1,Math.cos(i*Math.PI/4)*.85)):[-1,0,1].map(side=>normalizeAim(right.x*AIR_RULES.spread*side,-1,right.z*AIR_RULES.spread*side));
 for(const direction of directions){
  const bullet={id:s.nextId++,owner:a.id,scoredShot:s.phase==='battle',...origin,dx:direction.x,dy:direction.y,dz:direction.z,followGround:false,life:RULES.projectileLifetime,airVolley:true};
  const contact=traceProjectile(s,bullet,.16,{obstacles:OBSTACLES,ignoreId:a.id,hitActors:s.phase==='battle',arenaRadius:RULES.radius-.2});
  if(contact)projectileImpact(s,bullet,contact);else{Object.assign(bullet,projectilePoint(s,bullet,.16));s.bullets.push(bullet);}
 }
 s.events.push({type:'shot',id:a.id,count,airVolley:true});if(a.id==='player')s.stats.shots+=count;if(s.phase==='battle'&&s.scoreboard?.[a.id])s.scoreboard[a.id].shots+=count;return true;
}

function settleClassAttack(s,a,slam=false){
 const action=a.classAction;if(!action||action.settled||s.phase!=='battle')return;if(slam){action.settled=true;action.impactRemaining=action.remaining;}
 const candidates=[...s.actors,...(s.guards||[])].filter(t=>t.id!==a.id&&!t.ko&&!t.eliminated&&(t.kind!=='guard'||guardActive(t)&&t.owner!==a.id));
 for(const t of candidates){
  const dx=t.x-a.x,dz=t.z-a.z,d=Math.hypot(dx,dz),reach=slam?2.8:2.65;
  if(d>reach||!clearPickupPath(a,t))continue;
  const dy=projectileGround(s,t.x,t.z)+t.height-projectileGround(s,a.x,a.z)-a.height;
  if(Math.abs(dy)>(slam?1:1.6))continue;
  if(!slam&&d>.01&&(dx*a.aimX+dz*a.aimZ)/d<.15)continue;
  const direction=norm(dx,dz),contact=hit(s,t,{owner:a.id,dx:direction.x,dz:direction.z,damage:action.damage,force:slam?17:15});if(contact&&!slam){action.settled=true;break;}
 }
 if(slam)s.events.push({type:'classSlam',id:a.id,x:a.x,z:a.z,strength:action.damage});
}
function stopSabotage(s,a,reason='interrupted'){
 for(const b of s.bases||[]){if(b.attackerId!==a.id||b.destroyed)continue;if(b.progress>0)s.events.push({type:'sabotageInterrupted',baseId:b.id,id:b.owner,by:a.id,reason});b.progress=0;b.attackerId=null;}
 a.sabotageId=null;
}
function knockOut(s,a,b){
 if(s.scoreboard?.[a.id])s.scoreboard[a.id].deaths++;if(b.owner!==a.id&&s.scoreboard?.[b.owner])s.scoreboard[b.owner].kos++;
 stopSabotage(s,a,'knockout');releaseCatapult(s,a);resetBotAim(a);a.ko=true;a.dizzyTime=0;a.flight=null;a.support=null;a.airSpit=0;a.hop=0;a.knockUp=0;a.knockUpStart=0;a.height=.9;a.impulseX=b.dx*17;a.impulseZ=b.dz*17;a.ammo=0;
 a.respawnTime=s.training?1.5:ownBase(s,a)?.destroyed?0:RULES.respawnSeconds;
 s.events.push({type:'ko',id:a.id,by:b.owner,x:a.x,z:a.z,dx:b.dx,dz:b.dz});if(b.owner==='player'&&a.id!=='player')s.stats.kos++;
}
export function hit(s,a,b){
 if(a?.kind==='guard')return hitGuard(s,a,b);
 if(a.ko||a.eliminated||a.invuln>0||a.spawnShield>0)return false;
 const startHeight=Math.max(0,a.height),startFloor=Math.min(startHeight,Math.max(0,finite(a.support?.y,projectileGround(s,a.x,a.z))-projectileGround(s,a.x,a.z))),direction=norm(finite(b.dx),finite(b.dz)),force=clamp(finite(b.force,5),0,30);let damage=clamp(Math.floor(finite(b.damage,1)),1,9);
 a.classAction=null;stopSabotage(s,a,'hit');a.sabotageRecovery=RULES.sabotageRecovery;resetBotAim(a);a.aiShotReady=Math.max(a.aiShotReady,.4);
 a.hit=.23;a.invuln=.12;a.impulseX=direction.x*force;a.impulseZ=direction.z*force;a.revealedTime=RULES.revealSeconds;
 if(a.dizzyTime<=0){const hits=Math.min(damage,RULES.dizzyHits-a.dizzy);a.dizzy+=hits;damage-=hits;if(a.dizzy>=RULES.dizzyHits){a.dizzy=RULES.dizzyHits;a.dizzyTime=RULES.dizzySeconds;a.finishHits=0;a.hop=0;if(a.knockUp<=0&&!a.flight&&!a.support)a.height=0;releaseCatapult(s,a);s.events.push({type:'dizzy',id:a.id});}}
 if(a.dizzyTime>0&&damage>0)a.finishHits=Math.min(RULES.finishHits,a.finishHits+damage);
 if(finite(b.lift)>0){releaseCatapult(s,a);a.knockUpDuration=clamp(finite(b.liftDuration,.48),.25,.65);a.knockUp=a.knockUpDuration;a.knockUpPeak=clamp(b.lift,.1,1.2);a.knockUpStart=startHeight;a.knockUpFloor=startFloor;a.height=startHeight;a.flight=null;a.support=null;a.hop=0;a.hopX=a.hopZ=0;a.hopSpeed=0;a.kick=0;a.kickPending=false;}
 s.events.push({type:'hit',id:a.id,owner:b.owner,x:a.x,z:a.z,...(Number.isFinite(b.y)?{y:b.y}:{}),dx:direction.x,dz:direction.z});if(b.owner==='player'&&a.id!=='player')s.stats.hits++;
 if(a.finishHits>=RULES.finishHits)knockOut(s,a,{...b,dx:direction.x,dz:direction.z});return true;
}
export function kick(s,a,targetId=undefined){
 if(!canKick(s,a,targetId))return false;
 const target=kickTarget(s,a,targetId);
 const d=norm(target.x-a.x,target.z-a.z);a.aimX=d.x;a.aimY=0;a.aimZ=d.z;a.aim3D=false;rememberAimFacing(a);a.kick=RULES.kickDuration;a.kickCooldown=RULES.kickCooldown;a.kickPending=true;a.kickId=target.id;a.spawnShield=0;a.revealedTime=RULES.revealSeconds;s.events.push({type:'kick',id:a.id});return true;
}
function settleKick(s,a){
 const t=s.actors.find(b=>b.id===a.kickId)||s.guards?.find(g=>g.id===a.kickId);
 if(!t||t.ko||t.eliminated||t.spawnShield>0||t.kind==='guard'&&!guardActive(t)||distance(a,t)>RULES.kickRange+.25||!overlappingHeight(s,a,t,.1)||!clearPickupPath(a,t)){a.kickPending=false;return;}
 // A fly that arrived just before the boot must not consume the whole kick.
 // Recheck geometry while waiting, then apply exactly one ordinary hit.
 if(t.invuln>0&&a.kick>0)return;
 a.kickPending=false;
 const d=norm(t.x-a.x,t.z-a.z);hit(s,t,{owner:a.id,dx:d.x,dz:d.z,damage:a.characterClass==='heavy'?2:1,force:a.characterClass==='heavy'?17:14});
}
export function sabotageTarget(s,a){
 if(a.ko||a.eliminated||a.catapultId)return null;
 return (s.bases||[]).filter(b=>!b.destroyed&&b.owner!==a.id&&distance(a,baseGeometry(b).stock)<=RULES.sabotageRange&&clearPickupPath(a,baseGeometry(b).stock)).sort((b,c)=>distance(a,baseGeometry(b).stock)-distance(a,baseGeometry(c).stock))[0]||null;
}
function destroyBase(s,b,attacker){
 b.destroyed=true;b.destroyedAt=s.time;if(s.scoreboard?.[attacker.id])s.scoreboard[attacker.id].bases++;b.progress=RULES.sabotageSeconds;b.attackerId=null;attacker.sabotageId=null;
 removeBaseGuards(s,b.id);
 const owner=s.actors.find(a=>a.id===b.owner);
 if(owner){stopSabotage(s,owner,'eliminated');releaseCatapult(s,owner);owner.eliminated=true;owner.ko=true;owner.respawnTime=0;owner.ammo=0;owner.dizzyTime=0;owner.hop=0;owner.height=0;owner.flight=null;owner.support=null;owner.knockUp=0;}
 if(attacker.id==='player')s.stats.basesDestroyed++;
 s.events.push({type:'baseDestroyed',baseId:b.id,id:b.owner,by:attacker.id,x:b.x,z:b.z});
}
function updateSabotage(s,requests,dt){
 // Evaluate after all damage: a hit on this very frame breaks the channel.
 for(const b of s.bases){
  if(b.destroyed)continue;
  const candidates=s.actors.filter(a=>requests.get(a.id)===b.id&&!a.ko&&!a.eliminated&&a.dizzyTime<=0&&a.hit<=0&&a.sabotageRecovery<=0&&a.knockUp<=0&&a.kick<=0&&a.shot<=0&&a.hop<=0&&!a.flight&&a.height<1&&sabotageTarget(s,a)?.id===b.id);
  const holder=candidates.find(a=>a.id===b.attackerId)||candidates.sort((a,c)=>a.id.localeCompare(c.id))[0];
  if(!holder){if(b.attackerId){const previous=s.actors.find(a=>a.id===b.attackerId);if(previous)stopSabotage(s,previous,'released');}continue;}
  if(b.attackerId!==holder.id){
   if(b.attackerId){const previous=s.actors.find(a=>a.id===b.attackerId);if(previous)stopSabotage(s,previous,'interrupted');}
   b.progress=0;b.attackerId=holder.id;holder.sabotageId=b.id;
   s.events.push({type:'sabotageStart',baseId:b.id,id:b.owner,by:holder.id});
  }
  const stock=baseGeometry(b).stock,toStock=norm(stock.x-holder.x,stock.z-holder.z);
  holder.sabotageId=b.id;holder.spawnShield=0;holder.aiming=false;holder.face=Math.atan2(toStock.x,toStock.z);holder.aimX=toStock.x;holder.aimY=0;holder.aimZ=toStock.z;holder.aim3D=false;rememberAimFacing(holder);holder.revealedTime=RULES.revealSeconds;b.progress=Math.min(RULES.sabotageSeconds,b.progress+dt);
  if(b.progress>=RULES.sabotageSeconds-1e-8)destroyBase(s,b,holder);
 }
}
function navigateIntent(s,a,goal,extra={}){const move=navigateTo(a,goal,{catapults:s.catapults});return {mx:move.x,mz:move.z,aiming:false,...extra};}
const resetEnemyAim=resetBotAim;
function combatIntent(s,a,target){
 const d=distance(a,target),to=norm(target.x-a.x,target.z-a.z);
 const source=projectileOrigin(s,a),body=target.kind==='guard'?{y:projectileGround(s,target.x,target.z)+GUARD_BODY.centerY}:projectileOrigin(s,target),vertical=(body.y-source.y)/Math.max(.01,d);
 if(a.brain<=0){a.brain=.7+rng(s)*.5;a.decision=rng(s)>.5?1:-1;}
 let fire=false;
 if(d<16&&a.ammo>0&&a.kick<=0&&clearPickupPath(a,target)){
  fire=planBotShot(a,{targetId:target.id,x:to.x,z:to.z,vertical,distance:d,moving:Math.hypot(a.hopX,a.hopZ)>.1,origin:source,random:()=>rng(s)});
 }else resetEnemyAim(a);
 let mx=0,mz=0;
 if(d>11){const move=navigateTo(a,target,{catapults:s.catapults});mx=move.x;mz=move.z;}
 else{const chase=d<6?-1:0;mx=to.x*chase+to.z*a.decision*.45;mz=to.z*chase-to.x*a.decision*.45;}
 const closeKick=d<RULES.kickRange&&a.kickCooldown<=0&&overlappingHeight(s,a,target,.1);
 // A short physical kick needs planted feet; retreating throughout its windup
 // would make every newly corrected close-range strike miss its own target.
 if(a.kick>0||closeKick){mx=0;mz=0;}
 return {mx,mz,aiming:true,ax:a.aiCharging||fire?a.aiAimX:to.x,ay:a.aiCharging||fire?finite(a.aiAimY):vertical,az:a.aiCharging||fire?a.aiAimZ:to.z,fire,kick:closeKick,...(closeKick&&target.kind==='guard'?{kickTargetId:target.id}:{})};
}
export function rivalIntent(s,a){
 if(s.training){
  if(a.ko||a.eliminated||a.dizzyTime>0||a.knockUp>0)return {};
  const first=a.id==='rival-1',tx=first?Math.sin(s.time*.6)*4:Math.cos(s.time*.45)*4.5,tz=first?-3:-8+Math.sin(s.time*.7)*1.2;
  const dx=tx-a.x,dz=tz-a.z,d=Math.hypot(dx,dz),speed=Math.min(.5,d*1.2);
  return d>.12?{mx:dx/d*speed,mz:dz/d*speed,aiming:false}:{};
 }

 if(s.phase!=='battle'||a.ko||a.eliminated||a.dizzyTime>0||a.knockUp>0){resetEnemyAim(a);return {};}
 if(a.hit>0){resetEnemyAim(a);const away=norm(a.impulseX,a.impulseZ);return {mx:away.x,mz:away.z,aiming:false};}
 const home=ownBase(s,a),homeGeometry=baseGeometry(home);
 const seen=[...s.actors.filter(b=>b!==a&&canDetect(a,b)),...(s.guards||[]).filter(g=>g.owner!==a.id&&guardActive(g)&&canDetect(a,g))].sort((b,c)=>distance(a,b)-distance(a,c));
 // Keep a visible opponent while fighting, instead of snapping between two
 // nearly equidistant frogs and reading a fresh perfect aim every frame.
 const target=seen.find(b=>b.id===a.aiTargetId&&distance(a,b)<16)||seen[0],d=target?distance(a,target):Infinity;
 if(a.catapultId){
  resetEnemyAim(a);
  if(!target||d<7||a.catapultShots>=2){a.machineTimer=18;a.machineSeeking=false;return {interactCatapult:true};}
  const c=s.catapults.find(c=>c.id===a.catapultId),to=norm(target.x-a.x,target.z-a.z);
  return {aiming:true,ax:to.x,az:to.z,throwStone:c?.loaded&&a.catapultAim<=0?{x:target.x,z:target.z}:undefined};
 }
 if(a.ammo<ammunitionCapacity(a)*.1)a.refilling=true;
 if(a.ammo>=ammunitionCapacity(a)*.8)a.refilling=false;
 if(a.refilling&&home&&!home.destroyed){
  if(distance(a,homeGeometry.stock)<=RULES.pickupRange-.35&&clearPickupPath(a,homeGeometry.stock)){
   if(target&&d<5&&a.ammo>0)return combatIntent(s,a,target);
   resetEnemyAim(a);
   return {};
  }
  resetEnemyAim(a);
  return navigateIntent(s,a,homeGeometry.stock);
 }
 // A public storage alarm gives a reason to return home, without revealing hidden frogs.
 if(home?.attackerId&&home.attackerId!==a.id){
  const invader=seen.find(b=>b.id===home.attackerId);
  if(invader)return combatIntent(s,a,invader);
  resetEnemyAim(a);return navigateIntent(s,a,homeGeometry.stock);
 }
 const candidate=s.bases.find(b=>b.id===a.raidId&&!b.destroyed&&b.owner!==a.id);
 if(!candidate){
  const enemyBases=s.bases.filter(b=>!b.destroyed&&b.owner!==a.id);
  const preferred=a.id==='rival-1'?'rival-2':'player';
  a.raidId=(enemyBases.find(b=>b.owner===preferred)||enemyBases[0])?.id||null;
 }
 const raid=s.bases.find(b=>b.id===a.raidId),raidStock=baseGeometry(raid)?.stock;
 const defendingGuard=(s.guards||[]).find(g=>g.baseId===raid?.id&&guardActive(g));
 if(defendingGuard&&distance(a,raidStock)<=RULES.sabotageRange+1){
  a.machineSeeking=false;
  if(clearPickupPath(a,defendingGuard))return combatIntent(s,a,defendingGuard);
  resetEnemyAim(a);return navigateIntent(s,a,defendingGuard);
 }
 if(raid&&distance(a,raidStock)<=RULES.sabotageRange-.2&&(a.sabotageId===raid.id||!target||d>6.5)){
  resetEnemyAim(a);a.machineSeeking=false;return {sabotage:true,aiming:false};
 }
 if(target&&d<16){
  const machine=s.catapults.find(c=>c.owner===a.id&&!c.occupant);
  if(a.machineTimer<=0&&!a.machineSeeking){a.machineSeeking=!!machine&&d>11&&rng(s)<.35;a.machineTimer=8;}
  if(a.machineSeeking&&machine){
   if(d<7){a.machineSeeking=false;a.machineTimer=12;}
   else{resetEnemyAim(a);return navigateIntent(s,a,{x:machine.x,z:machine.z+2.2},{interactCatapult:nearbyCatapult(s,a)?.id===machine.id});}
  }
  return combatIntent(s,a,target);
 }
 resetEnemyAim(a);
 if(raidStock)return navigateIntent(s,a,raidStock);
 return {};
}
function respawn(s,a){
 if(s.training){const p=TRAINING_SPAWNS[a.id];Object.assign(a,actor(a.id,p.x,p.z,a.id==='player'?Math.PI:0));s.events.push({type:'respawn',id:a.id,x:a.x,z:a.z});return;}

 const home=ownBase(s,a),geometry=baseGeometry(home);if(!home||home.destroyed||!geometry)return;
 // Appear at the nearest clear place inside the same home. A defender must
 // never materialize inside an invader and cancel a channel by pushing it away.
 const others=s.actors.filter(b=>b!==a&&!b.ko&&!b.eliminated),candidates=[];
 for(const x of [0,-.8,.8,-1.6,1.6])for(const z of [0,-.8,.8,-1.6,1.6]){
  const p={x:geometry.spawn.x+x,z:geometry.spawn.z+z,characterClass:a.characterClass};
  if(!insideHome(geometry,p,frogBody(a).movementRadius))continue;
  const valid=resolveArenaMove(p,0,0,{arenaRadius:ARENA_MOVE_RADIUS,catapults:s.catapults,ground:(x,z)=>projectileGround(s,x,z)});if(distance(p,valid)>.01)continue;
  if(others.some(b=>distance(p,b)<frogBody(a).movementRadius+frogBody(b).movementRadius+.03))continue;
  candidates.push({...p,cost:x*x+z*z});
 }
 const position=candidates.sort((b,c)=>b.cost-c.cost)[0]||geometry.spawn;
 const fresh=actor(a.id,position.x,position.z,geometry.spawnHeading);fresh.ammo=ammunitionCapacity(a);Object.assign(a,fresh,{classAction:null,spawnShield:RULES.respawnProtectionSeconds});
 s.events.push({type:'respawn',id:a.id,x:a.x,z:a.z});
}
function evaluateWinner(s){
 const playerBase=s.bases.find(b=>b.owner==='player'),intact=s.bases.filter(b=>!b.destroyed);
 if(playerBase?.destroyed)s.status='lost';else if(intact.length===1&&intact[0].owner==='player')s.status='won';
}
export function step(s,input={},dt=1/60){
 if(s.status!=='playing')return;s.events.length=0;dt=clamp(finite(dt),0,.05);if(dt===0)return;s.time+=dt;
 if(s.phase==='countdown'){s.intro=Math.max(0,s.intro-dt);if(s.intro<1e-8){s.intro=0;s.phase='battle';s.events.push({type:'battle'});}}
 for(const f of s.flies)if(f.wait>0){f.wait-=dt;if(f.wait<=0)placeFly(s,f);}
 const sabotageRequests=new Map();
 for(const a of s.actors){
  for(const k of ['dashCooldown','airSpit','shot','tongue','invuln','spawnShield','hit','idle','kickCooldown','aimWindup','aiShotReady','aiReaction','brain','catapultAim','sabotageRecovery','revealedTime'])a[k]=Math.max(0,finite(a[k])-dt);
  if(s.phase==='battle')a.machineTimer=Math.max(0,a.machineTimer-dt);
  if(a.ko){
   releaseCatapult(s,a);moveBody(a,a.impulseX*dt,a.impulseZ*dt,s);a.impulseX*=Math.exp(-dt*3);a.impulseZ*=Math.exp(-dt*3);a.height=Math.max(0,a.height-dt*1.6);
   if(!a.eliminated&&!ownBase(s,a)?.destroyed){a.respawnTime=Math.max(0,a.respawnTime-dt);if(a.respawnTime<1e-8)respawn(s,a);}continue;
  }
  if(a.classAction){a.classAction.remaining=Math.max(0,a.classAction.remaining-dt);if(a.classAction.kind==='airKick'&&a.classAction.remaining<=a.classAction.duration-.18)settleClassAttack(s,a);if(a.classAction.remaining===0&&a.classAction.kind!=='bodySlam')a.classAction=null;}
  a.catapultAction=Math.max(0,(a.catapultAction||0)-dt);
  if(a.kick>0){a.kick=Math.max(0,a.kick-dt);if(a.kickPending&&a.kick<.30)settleKick(s,a);}
  if(a.dizzyTime>0){a.dizzyTime=Math.max(0,a.dizzyTime-dt);if(a.dizzyTime===0){a.dizzy=0;a.finishHits=0;a.invuln=.55;s.events.push({type:'recover',id:a.id});}}
  const c=a.id==='player'?input:rivalIntent(s,a);
  if(c.interactCatapult&&!a.interactHeld)interactCatapult(s,a);a.interactHeld=!!c.interactCatapult;
  const mx=a.catapultId?0:finite(c.mx),mz=a.catapultId?0:finite(c.mz),len=Math.hypot(mx,mz),moving=len>.08&&a.knockUp<=0;
  const suppliedAim=Number.isFinite(c.ax)&&Number.isFinite(c.az)&&Math.hypot(c.ax,finite(c.ay),c.az)>.05;
  a.aiming=c.aiming===undefined?suppliedAim:c.aiming===true;
  if(a.aiming&&suppliedAim&&a.kick<=0){const n=normalizeAim(c.ax,finite(c.ay),c.az);a.aimX=n.x;a.aimY=n.y;a.aimZ=n.z;a.aim3D=Number.isFinite(c.ay);}
  a.poseAiming=a.id==='player'&&a.aiming&&suppliedAim&&a.kick<=0&&(c.faceAim===true||c.fire===true);
  if(a.poseAiming)rememberAimFacing(a);
  if(moving){a.face=Math.atan2(mx,mz);if(!a.aiming&&a.kick<=0){const n=norm(mx,mz);a.aimX=n.x;a.aimY=0;a.aimZ=n.z;a.aim3D=false;}}
  const flightHandled=stepFlight(s,a,c,dt,{ground:(x,z)=>projectileGround(s,x,z),move:(dx,dz)=>moveBody(a,dx,dz,s),volley:()=>shootAirVolley(s,a),mount:()=>interactCatapult(s,a)});
  if(!a.flight&&a.classAction?.kind==='bodySlam'&&!a.classAction.settled){settleClassAttack(s,a,true);a.idle=Math.max(a.idle,.18);}
  if(a.classAction?.remaining===0)a.classAction=null;
  if(!a.flight&&a.height<1&&s.phase==='battle'&&c.sabotage&&!moving&&!c.fire&&!c.kick&&!c.throwStone){const target=sabotageTarget(s,a);if(target)sabotageRequests.set(a.id,target.id);}
  if(a.dizzyTime<=0){
   collect(s,a);
   if(c.kick&&!flightHandled)kick(s,a,c.kickTargetId);if(c.fire&&!a.flight?.queued&&!c.airVolley)shoot(s,a);if(c.throwStone)throwStone(s,a,c.throwStone);
   if(a.catapultId){const machine=s.catapults.find(c=>c.id===a.catapultId);if(machine){machine.aimX=a.aimX;machine.aimZ=a.aimZ;Object.assign(a,catapultSeatPoint(machine,a));a.impulseX=a.impulseZ=0;}}
   if(!flightHandled&&a.knockUp<=0&&a.hop<=0&&a.idle<=0&&moving){a.hop=RULES.hopDuration;a.hopSpeed=clamp(len,0,1);s.events.push({type:'hop',id:a.id,x:a.x,z:a.z,strength:a.hopSpeed});}
   if(!flightHandled&&a.knockUp<=0&&a.hop>0){
    a.hop=Math.max(0,a.hop-dt);const speed=(a.id==='player'?8.8:6.2)*terrainSpeed(a)*characterProfile(a).move,scale=moving?speed/Math.max(1,len):0;
    a.hopX=mx*scale;a.hopZ=mz*scale;moveBody(a,a.hopX*dt,a.hopZ*dt,s);
    a.height=Math.sin((1-a.hop/RULES.hopDuration)*Math.PI)*(.35+.32*a.hopSpeed)*characterProfile(a).jump;
    if(a.hop===0){a.height=0;a.hopX=0;a.hopZ=0;a.idle=RULES.landingDuration;s.events.push({type:'land',id:a.id,x:a.x,z:a.z});}
   }
  }
  moveBody(a,a.impulseX*dt,a.impulseZ*dt,s);a.impulseX*=Math.exp(-dt*10);a.impulseZ*=Math.exp(-dt*10);
  if(a.knockUp>0){
   const beforeY=projectileGround(s,a.x,a.z)+a.height;
   a.knockUp=Math.max(0,a.knockUp-dt);const progress=1-a.knockUp/a.knockUpDuration;
   a.height=finite(a.knockUpFloor)+(a.knockUpStart-finite(a.knockUpFloor))*(1-progress)+Math.sin(progress*Math.PI)*a.knockUpPeak;
   let landing=null;
   if(projectileGround(s,a.x,a.z)+a.height<=beforeY){landing=landingSurfaces(s,a.x,a.z,(x,z)=>projectileGround(s,x,z),a).filter(p=>beforeY>=p.y-.02&&projectileGround(s,a.x,a.z)+a.height<=p.y+.001).sort((p,q)=>q.y-p.y)[0];if(landing){a.knockUp=0;a.support=landing.id?landing:null;a.height=Math.max(0,landing.y-projectileGround(s,a.x,a.z));}}
   if(a.knockUp===0){if(!landing&&a.height>.03)a.flight={kind:'fall',y:projectileGround(s,a.x,a.z)+a.height,vy:-1,vx:a.impulseX,vz:a.impulseZ,jumps:1,launchVelocity:16,time:0,queued:false,fired:false};else if(!landing)a.height=0;a.knockUpStart=0;a.knockUpFloor=0;a.idle=RULES.landingDuration;s.events.push({type:'land',id:a.id,x:a.x,z:a.z,stone:true,strength:a.knockUpPeak});}
  }
  a.load+=(a.ammo/ammunitionCapacity(a)-a.load)*(1-Math.exp(-dt*12));
 }
 resolveActorContacts(s);
 for(const b of s.bullets){
  const travel=Math.min(dt,Math.max(0,b.life));b.life-=dt;if(travel<=0)continue;
  const distance=RULES.projectileSpeed*travel,contact=traceProjectile(s,b,distance,{obstacles:OBSTACLES,ignoreId:b.owner,hitActors:s.phase==='battle',arenaRadius:RULES.radius-.2});
  if(contact)projectileImpact(s,b,contact);else Object.assign(b,projectilePoint(s,b,distance));
 }
 s.bullets=s.bullets.filter(b=>b.life>0);stepArtillery(s,dt,hit);
 stepGuards(s,dt,{ground:(x,z)=>projectileGround(s,x,z),hitActor:hit});
 if(!s.training){updateSabotage(s,sabotageRequests,dt);evaluateWinner(s);}
}
export function saveRound(s){return JSON.stringify({...s,events:[],bullets:[],shells:[]});}
export function loadRound(raw){
 try{
  const v=JSON.parse(raw);if(v?.training)return null;if(![1,2].includes(v?.version)||!Array.isArray(v.actors)||v.actors.length!==3||!Array.isArray(v.flies)||![LEGACY_FLY_COUNT,FLY_COUNT].includes(v.flies.length))return null;
  if(!['playing','won','lost'].includes(v.status))return null;
  const legacy=v.version===1,s=newRound(finite(v.seed,731));
  s.time=clamp(finite(v.time),0,1e7);s.nextId=clamp(Math.floor(finite(v.nextId,1)),1,1e9);
  s.intro=legacy?RULES.introSeconds:clamp(finite(v.intro,RULES.introSeconds),0,RULES.introSeconds);
  s.phase=!legacy&&(v.phase==='battle'||s.intro===0)?'battle':'countdown';
  if(!legacy){
   if(!Array.isArray(v.bases)||v.bases.length!==BASES.length)return null;
   for(const b of s.bases){const old=v.bases.find(base=>base?.id===b.id&&base?.owner===b.owner);if(!old)return null;b.destroyed=old.destroyed===true;b.destroyedAt=b.destroyed&&Number.isFinite(old.destroyedAt)&&old.destroyedAt>=0&&old.destroyedAt<=s.time?old.destroyedAt:null;b.progress=b.destroyed?RULES.sabotageSeconds:0;}
  }
  for(let i=0;i<3;i++){
   const old=v.actors[i],a=s.actors[i];if(old?.id!==a.id||!Number.isFinite(old.x)||!Number.isFinite(old.z))return null;
   for(const key of Object.keys(a))if(typeof a[key]==='number')a[key]=clamp(finite(old[key],a[key]),-1e4,1e4);
   if(CHARACTER_IDS.includes(old.characterClass))a.characterClass=old.characterClass;
   const home=ownBase(s,a),eliminated=home.destroyed,ko=eliminated||old.ko===true;
   Object.assign(a,{ko,eliminated,respawnTime:ko&&!eliminated?clamp(finite(old.respawnTime,RULES.respawnSeconds)||RULES.respawnSeconds,.01,RULES.respawnSeconds):0,aiming:false,catapultId:null,interactHeld:false,machineSeeking:false,aiCharging:false,aimWindup:0,aiTargetId:null,aiReaction:0,aiBurstShots:0,aiAimPoint:null,refilling:old.refilling===true||finite(old.ammo)<ammunitionCapacity(a)*.1,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0,ammo:eliminated?0:clamp(Math.floor(finite(old.ammo)),0,ammunitionCapacity(a)),load:clamp(finite(old.load),0,1),dizzy:clamp(finite(old.dizzy),0,RULES.dizzyHits),finishHits:clamp(finite(old.finishHits),0,RULES.finishHits),dizzyTime:clamp(finite(old.dizzyTime),0,RULES.dizzySeconds),kickPending:false,kick:0,hop:0,hopX:0,hopZ:0,height:0,flight:null,support:null,dashCooldown:0,airSpit:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,knockUpFloor:0,idle:0,impulseX:0,impulseZ:0});
   for(const key of ['shot','tongue','invuln','hit','kickCooldown','aiShotReady'])a[key]=clamp(a[key],0,2);
   a.spawnShield=clamp(finite(old.spawnShield),0,RULES.respawnProtectionSeconds);
   a.machineTimer=clamp(a.machineTimer,0,30);a.face=finite(a.face,Math.PI);
   a.poseAiming=false;a.poseAimYaw=!legacy&&a.id==='player'&&Number.isFinite(old.poseAimYaw)?Math.atan2(Math.sin(old.poseAimYaw),Math.cos(old.poseAimYaw)):null;
   a.aim3D=old.aim3D===true||Math.abs(finite(old.aimY))>1e-9;
   const aim=normalizeAim(a.aimX,a.aim3D?a.aimY:0,a.aimZ,{x:Math.sin(a.face),y:0,z:Math.cos(a.face)});a.aimX=aim.x;a.aimY=aim.y;a.aimZ=aim.z;
   // Version 1 starts a new shared warm-up. Place each frog inside its new home
   // for that transition; ordinary version 2 resumes keep their travel position.
   if(legacy){const g=baseGeometry(home);Object.assign(a,{x:g.spawn.x,z:g.spawn.z,face:g.spawnHeading,aimX:Math.sin(g.spawnHeading),aimY:0,aimZ:Math.cos(g.spawnHeading),aim3D:false});}
   if(!legacy&&!ko&&typeof old.support?.id==='string'&&finite(old.height)>0&&finite(old.height)<32){const support=(a.characterClass&&old.support.id.startsWith('rock:')?scenerySurfaces(s,a.x,a.z,()=>0):landingSurfaces(s,a.x,a.z,()=>0,a)).find(p=>p.id===old.support.id);if(support){a.support={...support,y:finite(old.support.y,support.y)};a.height=old.height;}}
   moveBody(a,0,0,s);
  }
  // Existing patch IDs and their first 72 flies keep their saved positions and
  // depletion. Old saves receive only the four freshly initialized outer patches.
  for(let i=0;i<v.flies.length;i++){
   const f=v.flies[i],patch=SWARMS[Math.floor(i/FLIES_PER_SWARM)];if(!f)continue;
   if(v.swarmVersion===1&&f.swarmId===patch.id&&Number.isFinite(f.x)&&Number.isFinite(f.z)&&distance(f,patch)<=patch.radius+.001)Object.assign(s.flies[i],{x:f.x,z:f.z,phase:finite(f.phase)});
   s.flies[i].wait=clamp(finite(f.wait),0,12);
  }
  if(Array.isArray(v.catapults))for(const c of s.catapults){
   const old=v.catapults.find(t=>t.id===c.id);if(old){c.cooldown=clamp(finite(old.cooldown),0,ARTILLERY.cooldown);c.loaded=c.cooldown===0;}
   const mounted=!legacy&&v.actors.find(a=>a.catapultId===c.id);if(mounted){const a=s.actors.find(a=>a.id===mounted.id);a.x=c.x;a.z=c.z+2.3;moveBody(a,0,0,s);}
  }
  restoreGuards(s,v.guards);
  for(const k of Object.keys(s.stats))s.stats[k]=Math.max(0,Math.floor(finite(v.stats?.[k])));
  s.scoreboard=Object.fromEntries(s.actors.map(a=>[a.id,cleanStats(v.scoreboard?.[a.id])]));
  s.scoreboardSince=v.scoreboard?clamp(finite(v.scoreboardSince),0,s.time):s.phase==='countdown'?0:s.time;
  if(typeof v.recordId==='string'&&/^[a-zA-Z0-9-]{1,90}$/.test(v.recordId))s.recordId=v.recordId;
  evaluateWinner(s);return s;
 }catch{return null;}
}

const TRAINING_SPAWNS=Object.freeze({player:{x:0,z:4},'rival-1':{x:-3,z:-3},'rival-2':{x:3,z:-8}});
export function newTrainingRound(seed=731){
 const s=newRound(seed);Object.assign(s,{training:true,phase:'battle',intro:0,guards:[]});
 for(const a of s.actors){const p=TRAINING_SPAWNS[a.id];Object.assign(a,actor(a.id,p.x,p.z,a.id==='player'?Math.PI:0));}
 return s;
}

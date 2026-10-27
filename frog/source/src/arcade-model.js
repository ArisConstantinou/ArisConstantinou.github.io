// FROG arcade rules. Rendering-free and deterministic for repeatable tests.
import {ARTILLERY,CATAPULTS,createCatapults,interactCatapult,releaseCatapult,throwStone,stepArtillery} from './arcade-artillery.js';
import {BASES,resolveWallMove,hasWallSight,coverAt,terrainSpeed,navigateTo} from './arcade-bases.js';
import {PROJECTILE,normalizeAim,worldRay,projectileLaunch,projectilePoint,traceProjectile} from './arcade-projectiles.js';
export {setProjectileWorld,projectileOrigin} from './arcade-projectiles.js';

export const ARCADE_VERSION = '4.3.10';
export const SAVE_KEY = 'frog-arcade-save-v1';
export const SETTINGS_KEY = 'frog-arcade-settings-v1';
export const RULES = Object.freeze({radius:25,capacity:60,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.30,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:20,sabotageSeconds:10,sabotageRange:2.4,sabotageRecovery:.55,respawnSeconds:12,revealSeconds:2.5});
export const OBSTACLES = Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]);
export const SWARMS = Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([x,z],i)=>Object.freeze({id:`swarm-${i}`,x,z,radius:2.1})));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const norm=(x,z)=>{const n=Math.hypot(x,z);return n>1e-6?{x:x/n,z:z/n}:{x:0,z:1};};
const finite=(v,f=0)=>Number.isFinite(v)?v:f;
function rng(s){let t=s.seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}
function actor(id,x,z,heading=Math.PI){
 return {id,x,z,aimX:Math.sin(heading),aimY:0,aimZ:Math.cos(heading),aim3D:false,aiming:false,face:heading,ammo:RULES.capacity,load:1,dizzy:0,finishHits:0,dizzyTime:0,ko:false,eliminated:false,respawnTime:0,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:false,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:false,machineTimer:id==='rival-1'?8:12,machineSeeking:false,aimWindup:0,aiShotReady:0,aiCharging:false,aiAimX:Math.sin(heading),aiAimZ:Math.cos(heading),refilling:false,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0};
}
export function ownBase(s,a){return s.bases?.find(b=>b.owner===a.id)||null;}
const baseGeometry=b=>BASES.find(g=>g.id===b?.id);

// Substeps keep both normal hops and large hit impulses on the same side of walls.
export function moveBody(a,dx,dz){
 const count=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.35));
 for(let step=0;step<count;step++){
  let {x,z}=resolveWallMove(a,dx/count,dz/count);
  for(const o of OBSTACLES){const d=Math.hypot(x-o.x,z-o.z),r=o.r+.78;if(d<r){const n=norm(x-o.x,z-o.z);x=o.x+n.x*r;z=o.z+n.z*r;}}
  for(const c of CATAPULTS){if(a.catapultId===c.id)continue;const d=Math.hypot(x-c.x,z-c.z),r=ARTILLERY.baseRadius+.78;if(d<r){const n=norm(x-c.x,z-c.z);x=c.x+n.x*r;z=c.z+n.z*r;}}
  ({x,z}=resolveWallMove(a,x-a.x,z-a.z));
  const d=Math.hypot(x,z);if(d>RULES.radius-1){x*=(RULES.radius-1)/d;z*=(RULES.radius-1)/d;}
  const final=resolveWallMove({x,z},0,0);a.x=final.x;a.z=final.z;
 }
}
function segmentCircle(x,z,nx,nz,c,r){const dx=nx-x,dz=nz-z,ox=x-c.x,oz=z-c.z,A=dx*dx+dz*dz,C=ox*ox+oz*oz-r*r;if(C<=0)return 0;if(A<1e-12)return null;const B=2*(ox*dx+oz*dz),D=B*B-4*A*C;if(D<0)return null;const t=(-B-Math.sqrt(D))/(2*A);return t>=0&&t<=1?t:null;}
export function clearPickupPath(a,f){return hasWallSight(a,f,.1)&&OBSTACLES.every(o=>segmentCircle(a.x,a.z,f.x,f.z,o,o.r+.1)===null);}
export function canDetect(observer,target){return !target.ko&&!target.eliminated&&distance(observer,target)<=23&&clearPickupPath(observer,target)&&(!coverAt(target)||target.revealedTime>0||distance(observer,target)<2.2);}
function placeFly(s,f){
 const patch=SWARMS[Math.floor(f.id/12)];f.swarmId=patch.id;
 const angle=rng(s)*Math.PI*2,r=Math.sqrt(rng(s))*patch.radius;
 f.x=patch.x+Math.sin(angle)*r;f.z=patch.z+Math.cos(angle)*r;f.wait=0;f.phase=rng(s)*Math.PI*2;
}
export function newRound(seed=731){
 const s={version:2,swarmVersion:1,seed,time:0,status:'playing',phase:'countdown',intro:RULES.introSeconds,actors:BASES.map(b=>actor(b.owner,b.spawn.x,b.spawn.z,b.spawnHeading)),bases:BASES.map(b=>({id:b.id,owner:b.owner,x:b.x,z:b.z,destroyed:false,progress:0,attackerId:null})),flies:[],catapults:createCatapults(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0,basesDestroyed:0}};
 for(let i=0;i<72;i++){const f={id:i,swarmId:'',x:0,z:0,wait:0,phase:0};placeFly(s,f);s.flies.push(f);}
 return s;
}
export function fireRing(x,y){const d=Math.hypot(x,y);return {x:d>.08?x/Math.max(1,d):0,z:d>.08?y/Math.max(1,d):0,fire:d>=.72};}
export function kickTarget(s,a){return s.actors.filter(b=>b!==a&&!b.ko&&distance(a,b)<=RULES.kickRange&&clearPickupPath(a,b)).sort((b,c)=>distance(a,b)-distance(a,c))[0]||null;}
export function collect(s,a){
 if(a.ko||a.eliminated||a.dizzyTime>0||a.catapultId||a.tongue>0||a.ammo>=RULES.capacity)return false;
 const home=ownBase(s,a),stock=baseGeometry(home)?.stock;
 if(home&&!home.destroyed&&stock&&distance(a,stock)<=RULES.pickupRange&&clearPickupPath(a,stock)){
  a.tongue=RULES.tongueInterval;a.ammo++;
  s.events.push({type:'tongue',id:a.id,x:stock.x,z:stock.z,baseId:home.id});
  if(a.id==='player')s.stats.caught++;
  return true;
 }
 const f=s.flies.filter(f=>f.wait<=0&&distance(a,f)<=RULES.pickupRange&&clearPickupPath(a,f)).sort((f,g)=>distance(a,f)-distance(a,g))[0];
 if(!f)return false;
 a.tongue=RULES.tongueInterval;a.ammo++;f.wait=7+rng(s)*4;
 s.events.push({type:'tongue',id:a.id,x:f.x,z:f.z,swarmId:f.swarmId});if(a.id==='player')s.stats.caught++;return true;
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
 if(contact.kind==='actor'){const target=s.actors.find(a=>a.id===contact.targetId);if(target)hit(s,target,bullet);}
 s.events.push({type:'splat',x:bullet.x,y:bullet.y,z:bullet.z,wall:contact.kind==='wall'||contact.kind==='rock',kind:contact.kind,normal:contact.normal,dx:bullet.dx,dy:bullet.dy,dz:bullet.dz});
}
export function shoot(s,a){
 if(a.ko||a.eliminated||a.dizzyTime>0||a.hit>0||a.catapultId||a.knockUp>0||a.shot>0||a.ammo<=0||(a.id!=='player'&&s.phase!=='battle'))return false;
 a.shot=RULES.shotInterval;a.ammo--;a.revealedTime=RULES.revealSeconds;
 const launch=projectileLaunch(s,a),bullet={id:s.nextId++,owner:a.id,...launch,life:RULES.projectileLifetime};
 // Sweep source to muzzle so nearby solids cannot be skipped by its offset.
 const contact=traceProjectile(s,bullet,PROJECTILE.muzzleOffset,{obstacles:OBSTACLES,ignoreId:a.id,hitActors:s.phase==='battle',arenaRadius:RULES.radius-.2});
 if(contact)projectileImpact(s,bullet,contact);
 else{Object.assign(bullet,projectilePoint(s,bullet,PROJECTILE.muzzleOffset));s.bullets.push(bullet);}
 s.events.push({type:'shot',id:a.id});if(a.id==='player')s.stats.shots++;return true;
}
function stopSabotage(s,a,reason='interrupted'){
 for(const b of s.bases||[]){if(b.attackerId!==a.id||b.destroyed)continue;if(b.progress>0)s.events.push({type:'sabotageInterrupted',baseId:b.id,id:b.owner,by:a.id,reason});b.progress=0;b.attackerId=null;}
 a.sabotageId=null;
}
function knockOut(s,a,b){
 stopSabotage(s,a,'knockout');releaseCatapult(s,a);a.ko=true;a.dizzyTime=0;a.hop=0;a.knockUp=0;a.knockUpStart=0;a.height=.9;a.impulseX=b.dx*17;a.impulseZ=b.dz*17;a.ammo=0;a.aiCharging=false;
 a.respawnTime=ownBase(s,a)?.destroyed?0:RULES.respawnSeconds;
 s.events.push({type:'ko',id:a.id,by:b.owner,x:a.x,z:a.z,dx:b.dx,dz:b.dz});if(b.owner==='player'&&a.id!=='player')s.stats.kos++;
}
export function hit(s,a,b){
 if(a.ko||a.eliminated||a.invuln>0)return false;
 const startHeight=Math.max(0,a.height),direction=norm(finite(b.dx),finite(b.dz)),force=clamp(finite(b.force,5),0,30);let damage=clamp(Math.floor(finite(b.damage,1)),1,9);
 stopSabotage(s,a,'hit');a.sabotageRecovery=RULES.sabotageRecovery;a.aiCharging=false;a.aimWindup=0;a.aiShotReady=Math.max(a.aiShotReady,.4);
 a.hit=.23;a.invuln=.12;a.impulseX=direction.x*force;a.impulseZ=direction.z*force;a.revealedTime=RULES.revealSeconds;
 if(a.dizzyTime<=0){const hits=Math.min(damage,RULES.dizzyHits-a.dizzy);a.dizzy+=hits;damage-=hits;if(a.dizzy>=RULES.dizzyHits){a.dizzy=RULES.dizzyHits;a.dizzyTime=RULES.dizzySeconds;a.finishHits=0;a.hop=0;if(a.knockUp<=0)a.height=0;releaseCatapult(s,a);s.events.push({type:'dizzy',id:a.id});}}
 if(a.dizzyTime>0&&damage>0)a.finishHits=Math.min(RULES.finishHits,a.finishHits+damage);
 if(finite(b.lift)>0){releaseCatapult(s,a);a.knockUpDuration=clamp(finite(b.liftDuration,.48),.25,.65);a.knockUp=a.knockUpDuration;a.knockUpPeak=clamp(b.lift,.1,1.2);a.knockUpStart=startHeight;a.height=startHeight;a.hop=0;a.hopX=a.hopZ=0;a.hopSpeed=0;a.kick=0;a.kickPending=false;}
 s.events.push({type:'hit',id:a.id,owner:b.owner,x:a.x,z:a.z,...(Number.isFinite(b.y)?{y:b.y}:{}),dx:direction.x,dz:direction.z});if(b.owner==='player'&&a.id!=='player')s.stats.hits++;
 if(a.finishHits>=RULES.finishHits)knockOut(s,a,{...b,dx:direction.x,dz:direction.z});return true;
}
export function kick(s,a){
 if(s.phase!=='battle'||a.ko||a.eliminated||a.dizzyTime>0||a.hit>0||a.catapultId||a.knockUp>0||a.kick>0||a.kickCooldown>0)return false;
 const target=kickTarget(s,a);if(!target)return false;
 const d=norm(target.x-a.x,target.z-a.z);a.aimX=d.x;a.aimY=0;a.aimZ=d.z;a.aim3D=false;a.kick=RULES.kickDuration;a.kickCooldown=RULES.kickCooldown;a.kickPending=true;a.kickId=target.id;a.revealedTime=RULES.revealSeconds;s.events.push({type:'kick',id:a.id});return true;
}
function settleKick(s,a){
 a.kickPending=false;const t=s.actors.find(b=>b.id===a.kickId);
 if(!t||t.ko||distance(a,t)>RULES.kickRange+.25||!clearPickupPath(a,t))return;
 const d=norm(t.x-a.x,t.z-a.z);hit(s,t,{owner:a.id,dx:d.x,dz:d.z,damage:1,force:14});
 if(!t.ko){t.impulseX=d.x*14;t.impulseZ=d.z*14;}
}
export function sabotageTarget(s,a){
 if(a.ko||a.eliminated||a.catapultId)return null;
 return (s.bases||[]).filter(b=>!b.destroyed&&b.owner!==a.id&&distance(a,baseGeometry(b).stock)<=RULES.sabotageRange&&clearPickupPath(a,baseGeometry(b).stock)).sort((b,c)=>distance(a,baseGeometry(b).stock)-distance(a,baseGeometry(c).stock))[0]||null;
}
function destroyBase(s,b,attacker){
 b.destroyed=true;b.progress=RULES.sabotageSeconds;b.attackerId=null;attacker.sabotageId=null;
 const owner=s.actors.find(a=>a.id===b.owner);
 if(owner){stopSabotage(s,owner,'eliminated');releaseCatapult(s,owner);owner.eliminated=true;owner.ko=true;owner.respawnTime=0;owner.ammo=0;owner.dizzyTime=0;owner.hop=0;owner.height=0;owner.knockUp=0;}
 if(attacker.id==='player')s.stats.basesDestroyed++;
 s.events.push({type:'baseDestroyed',baseId:b.id,id:b.owner,by:attacker.id,x:b.x,z:b.z});
}
function updateSabotage(s,requests,dt){
 // Evaluate after all damage: a hit on this very frame breaks the channel.
 for(const b of s.bases){
  if(b.destroyed)continue;
  const candidates=s.actors.filter(a=>requests.get(a.id)===b.id&&!a.ko&&!a.eliminated&&a.dizzyTime<=0&&a.hit<=0&&a.sabotageRecovery<=0&&a.knockUp<=0&&a.kick<=0&&a.shot<=0&&a.hop<=0&&sabotageTarget(s,a)?.id===b.id);
  const holder=candidates.find(a=>a.id===b.attackerId)||candidates.sort((a,c)=>a.id.localeCompare(c.id))[0];
  if(!holder){if(b.attackerId){const previous=s.actors.find(a=>a.id===b.attackerId);if(previous)stopSabotage(s,previous,'released');}continue;}
  if(b.attackerId!==holder.id){
   if(b.attackerId){const previous=s.actors.find(a=>a.id===b.attackerId);if(previous)stopSabotage(s,previous,'interrupted');}
   b.progress=0;b.attackerId=holder.id;holder.sabotageId=b.id;
   s.events.push({type:'sabotageStart',baseId:b.id,id:b.owner,by:holder.id});
  }
  const stock=baseGeometry(b).stock,toStock=norm(stock.x-holder.x,stock.z-holder.z);
  holder.sabotageId=b.id;holder.aiming=false;holder.face=Math.atan2(toStock.x,toStock.z);holder.aimX=toStock.x;holder.aimY=0;holder.aimZ=toStock.z;holder.aim3D=false;holder.revealedTime=RULES.revealSeconds;b.progress=Math.min(RULES.sabotageSeconds,b.progress+dt);
  if(b.progress>=RULES.sabotageSeconds-1e-8)destroyBase(s,b,holder);
 }
}
function navigateIntent(a,goal,extra={}){const move=navigateTo(a,goal);return {mx:move.x,mz:move.z,aiming:false,...extra};}
function resetEnemyAim(a){a.aiCharging=false;a.aimWindup=0;}
function combatIntent(s,a,target){
 const d=distance(a,target),to=norm(target.x-a.x,target.z-a.z);
 a.brain-=1/60;if(a.brain<=0){a.brain=.7+rng(s)*.5;a.decision=rng(s)>.5?1:-1;}
 let fire=false;
 if(d<16&&a.ammo>0&&clearPickupPath(a,target)){
  if(!a.aiCharging&&a.aiShotReady<=0){const error=(rng(s)-.5)*.08,cos=Math.cos(error),sin=Math.sin(error);a.aiAimX=to.x*cos-to.z*sin;a.aiAimZ=to.x*sin+to.z*cos;a.aimWindup=.32;a.aiCharging=true;}
  else if(a.aiCharging&&a.aimWindup<=0){fire=true;a.aiCharging=false;a.aiShotReady=.22+rng(s)*.1;}
 }else resetEnemyAim(a);
 let mx=0,mz=0;
 if(d>11){const move=navigateTo(a,target);mx=move.x;mz=move.z;}
 else{const chase=d<6?-1:0;mx=to.x*chase+to.z*a.decision*.45;mz=to.z*chase-to.x*a.decision*.45;}
 return {mx,mz,aiming:true,ax:a.aiCharging||fire?a.aiAimX:to.x,az:a.aiCharging||fire?a.aiAimZ:to.z,fire,kick:d<3.3};
}
export function rivalIntent(s,a){
 if(s.phase!=='battle'||a.ko||a.eliminated)return {};
 if(a.hit>0){resetEnemyAim(a);const away=norm(a.impulseX,a.impulseZ);return {mx:away.x,mz:away.z,aiming:false};}
 const home=ownBase(s,a),homeGeometry=baseGeometry(home);
 const seen=s.actors.filter(b=>b!==a&&canDetect(a,b)).sort((b,c)=>distance(a,b)-distance(a,c));
 const target=seen[0],d=target?distance(a,target):Infinity;
 if(a.catapultId){
  if(!target||d<7||a.catapultShots>=2){a.machineTimer=18;a.machineSeeking=false;return {interactCatapult:true};}
  const c=s.catapults.find(c=>c.id===a.catapultId),to=norm(target.x-a.x,target.z-a.z);
  return {aiming:true,ax:to.x,az:to.z,throwStone:c?.loaded&&a.catapultAim<=0?{x:target.x,z:target.z}:undefined};
 }
 if(a.ammo<6)a.refilling=true;
 if(a.ammo>=48)a.refilling=false;
 if(a.refilling&&home&&!home.destroyed){
  resetEnemyAim(a);
  if(distance(a,homeGeometry.stock)<=RULES.pickupRange-.35&&clearPickupPath(a,homeGeometry.stock)){
   if(target&&d<5&&a.ammo>0)return combatIntent(s,a,target);
   return {};
  }
  return navigateIntent(a,homeGeometry.stock);
 }
 // A public storage alarm gives a reason to return home, without revealing hidden frogs.
 if(home?.attackerId&&home.attackerId!==a.id){
  const invader=seen.find(b=>b.id===home.attackerId);
  if(invader)return combatIntent(s,a,invader);
  resetEnemyAim(a);return navigateIntent(a,homeGeometry.stock);
 }
 const candidate=s.bases.find(b=>b.id===a.raidId&&!b.destroyed&&b.owner!==a.id);
 if(!candidate){
  const enemyBases=s.bases.filter(b=>!b.destroyed&&b.owner!==a.id);
  const preferred=a.id==='rival-1'?'rival-2':'player';
  a.raidId=(enemyBases.find(b=>b.owner===preferred)||enemyBases[0])?.id||null;
 }
 const raid=s.bases.find(b=>b.id===a.raidId),raidStock=baseGeometry(raid)?.stock;
 if(raid&&distance(a,raidStock)<=RULES.sabotageRange-.2&&(a.sabotageId===raid.id||!target||d>6.5)){
  resetEnemyAim(a);a.machineSeeking=false;return {sabotage:true,aiming:false};
 }
 if(target&&d<16){
  const machine=s.catapults.find(c=>c.owner===a.id&&!c.occupant);
  if(a.machineTimer<=0&&!a.machineSeeking){a.machineSeeking=!!machine&&d>11&&rng(s)<.35;a.machineTimer=8;}
  if(a.machineSeeking&&machine){
   if(d<7){a.machineSeeking=false;a.machineTimer=12;}
   else return navigateIntent(a,{x:machine.x,z:machine.z+2.2},{interactCatapult:distance(a,machine)<=ARTILLERY.interactionRange&&hasWallSight(a,machine)});
  }
  return combatIntent(s,a,target);
 }
 resetEnemyAim(a);
 if(raidStock)return navigateIntent(a,raidStock);
 return {};
}
function respawn(s,a){
 const home=ownBase(s,a),geometry=baseGeometry(home);if(!home||home.destroyed||!geometry)return;
 const fresh=actor(a.id,geometry.spawn.x,geometry.spawn.z,geometry.spawnHeading);Object.assign(a,fresh,{invuln:1});
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
  for(const k of ['shot','tongue','invuln','hit','idle','kickCooldown','aimWindup','aiShotReady','catapultAim','sabotageRecovery','revealedTime'])a[k]=Math.max(0,a[k]-dt);
  if(s.phase==='battle')a.machineTimer=Math.max(0,a.machineTimer-dt);
  if(a.ko){
   releaseCatapult(s,a);moveBody(a,a.impulseX*dt,a.impulseZ*dt);a.impulseX*=Math.exp(-dt*3);a.impulseZ*=Math.exp(-dt*3);a.height=Math.max(0,a.height-dt*1.6);
   if(!a.eliminated&&!ownBase(s,a)?.destroyed){a.respawnTime=Math.max(0,a.respawnTime-dt);if(a.respawnTime<1e-8)respawn(s,a);}continue;
  }
  if(a.kick>0){a.kick=Math.max(0,a.kick-dt);if(a.kickPending&&a.kick<.30)settleKick(s,a);}
  if(a.dizzyTime>0){a.dizzyTime=Math.max(0,a.dizzyTime-dt);if(a.dizzyTime===0){a.dizzy=0;a.finishHits=0;a.invuln=.55;s.events.push({type:'recover',id:a.id});}}
  const c=a.id==='player'?input:rivalIntent(s,a);
  if(c.interactCatapult&&!a.interactHeld)interactCatapult(s,a);a.interactHeld=!!c.interactCatapult;
  const mx=a.catapultId?0:finite(c.mx),mz=a.catapultId?0:finite(c.mz),len=Math.hypot(mx,mz),moving=len>.08&&a.knockUp<=0;
  const suppliedAim=Number.isFinite(c.ax)&&Number.isFinite(c.az)&&Math.hypot(c.ax,finite(c.ay),c.az)>.05;
  a.aiming=c.aiming===undefined?suppliedAim:c.aiming===true;
  if(a.aiming&&suppliedAim){const n=normalizeAim(c.ax,finite(c.ay),c.az);a.aimX=n.x;a.aimY=n.y;a.aimZ=n.z;a.aim3D=Number.isFinite(c.ay);}
  if(moving){a.face=Math.atan2(mx,mz);if(!a.aiming&&a.kick<=0){const n=norm(mx,mz);a.aimX=n.x;a.aimY=0;a.aimZ=n.z;a.aim3D=false;}}
  if(s.phase==='battle'&&c.sabotage&&!moving&&!c.fire&&!c.kick&&!c.throwStone){const target=sabotageTarget(s,a);if(target)sabotageRequests.set(a.id,target.id);}
  if(a.dizzyTime<=0){
   collect(s,a);
   if(c.fire)shoot(s,a);if(c.kick)kick(s,a);if(c.throwStone)throwStone(s,a,c.throwStone);
   if(a.catapultId){const machine=s.catapults.find(c=>c.id===a.catapultId);if(machine){machine.aimX=a.aimX;machine.aimZ=a.aimZ;a.x=machine.x;a.z=machine.z;a.impulseX=a.impulseZ=0;}}
   if(a.knockUp<=0&&a.hop<=0&&a.idle<=0&&moving){a.hop=RULES.hopDuration;a.hopSpeed=clamp(len,0,1);}
   if(a.knockUp<=0&&a.hop>0){
    a.hop=Math.max(0,a.hop-dt);const speed=(a.id==='player'?8.8:6.2)*terrainSpeed(a),scale=moving?speed/Math.max(1,len):0;
    a.hopX=mx*scale;a.hopZ=mz*scale;moveBody(a,a.hopX*dt,a.hopZ*dt);
    a.height=Math.sin((1-a.hop/RULES.hopDuration)*Math.PI)*(.35+.32*a.hopSpeed);
    if(a.hop===0){a.height=0;a.hopX=0;a.hopZ=0;a.idle=RULES.landingDuration;s.events.push({type:'land',id:a.id,x:a.x,z:a.z});}
   }
  }
  moveBody(a,a.impulseX*dt,a.impulseZ*dt);a.impulseX*=Math.exp(-dt*10);a.impulseZ*=Math.exp(-dt*10);
  if(a.knockUp>0){
   a.knockUp=Math.max(0,a.knockUp-dt);const progress=1-a.knockUp/a.knockUpDuration;
   a.height=a.knockUpStart*(1-progress)+Math.sin(progress*Math.PI)*a.knockUpPeak;
   if(a.knockUp===0){a.height=0;a.knockUpStart=0;a.idle=RULES.landingDuration;s.events.push({type:'land',id:a.id,x:a.x,z:a.z,stone:true,strength:a.knockUpPeak});}
  }
  a.load+=(a.ammo/RULES.capacity-a.load)*(1-Math.exp(-dt*12));
 }
 for(const b of s.bullets){
  const travel=Math.min(dt,Math.max(0,b.life));b.life-=dt;if(travel<=0)continue;
  const distance=RULES.projectileSpeed*travel,contact=traceProjectile(s,b,distance,{obstacles:OBSTACLES,ignoreId:b.owner,hitActors:s.phase==='battle',arenaRadius:RULES.radius-.2});
  if(contact)projectileImpact(s,b,contact);else Object.assign(b,projectilePoint(s,b,distance));
 }
 s.bullets=s.bullets.filter(b=>b.life>0);stepArtillery(s,dt,hit);
 updateSabotage(s,sabotageRequests,dt);evaluateWinner(s);
}
export function saveRound(s){return JSON.stringify({...s,events:[],bullets:[],shells:[]});}
export function loadRound(raw){
 try{
  const v=JSON.parse(raw);if(![1,2].includes(v?.version)||!Array.isArray(v.actors)||v.actors.length!==3||!Array.isArray(v.flies)||v.flies.length!==72)return null;
  if(!['playing','won','lost'].includes(v.status))return null;
  const legacy=v.version===1,s=newRound(finite(v.seed,731));
  s.time=clamp(finite(v.time),0,1e7);s.nextId=clamp(Math.floor(finite(v.nextId,1)),1,1e9);
  s.intro=legacy?RULES.introSeconds:clamp(finite(v.intro,RULES.introSeconds),0,RULES.introSeconds);
  s.phase=!legacy&&(v.phase==='battle'||s.intro===0)?'battle':'countdown';
  if(!legacy){
   if(!Array.isArray(v.bases)||v.bases.length!==BASES.length)return null;
   for(const b of s.bases){const old=v.bases.find(base=>base?.id===b.id&&base?.owner===b.owner);if(!old)return null;b.destroyed=old.destroyed===true;b.progress=b.destroyed?RULES.sabotageSeconds:0;}
  }
  for(let i=0;i<3;i++){
   const old=v.actors[i],a=s.actors[i];if(old?.id!==a.id||!Number.isFinite(old.x)||!Number.isFinite(old.z))return null;
   for(const key of Object.keys(a))if(typeof a[key]==='number')a[key]=clamp(finite(old[key],a[key]),-1e4,1e4);
   const home=ownBase(s,a),eliminated=home.destroyed,ko=eliminated||old.ko===true;
   Object.assign(a,{ko,eliminated,respawnTime:ko&&!eliminated?clamp(finite(old.respawnTime,RULES.respawnSeconds)||RULES.respawnSeconds,.01,RULES.respawnSeconds):0,aiming:false,catapultId:null,interactHeld:false,machineSeeking:false,aiCharging:false,aimWindup:0,refilling:old.refilling===true||finite(old.ammo)<6,raidId:null,sabotageId:null,sabotageRecovery:0,revealedTime:0,ammo:eliminated?0:clamp(Math.floor(finite(old.ammo)),0,RULES.capacity),load:clamp(finite(old.load),0,1),dizzy:clamp(finite(old.dizzy),0,RULES.dizzyHits),finishHits:clamp(finite(old.finishHits),0,RULES.finishHits),dizzyTime:clamp(finite(old.dizzyTime),0,RULES.dizzySeconds),kickPending:false,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,impulseX:0,impulseZ:0});
   for(const key of ['shot','tongue','invuln','hit','kickCooldown','aiShotReady'])a[key]=clamp(a[key],0,2);
   a.machineTimer=clamp(a.machineTimer,0,30);a.face=finite(a.face,Math.PI);
   a.aim3D=old.aim3D===true||Math.abs(finite(old.aimY))>1e-9;
   const aim=normalizeAim(a.aimX,a.aim3D?a.aimY:0,a.aimZ,{x:Math.sin(a.face),y:0,z:Math.cos(a.face)});a.aimX=aim.x;a.aimY=aim.y;a.aimZ=aim.z;
   // Version 1 starts a new shared warm-up. Place each frog inside its new home
   // for that transition; ordinary version 2 resumes keep their travel position.
   if(legacy){const g=baseGeometry(home);Object.assign(a,{x:g.spawn.x,z:g.spawn.z,face:g.spawnHeading,aimX:Math.sin(g.spawnHeading),aimY:0,aimZ:Math.cos(g.spawnHeading),aim3D:false});}
   moveBody(a,0,0);
  }
  for(let i=0;i<72;i++){
   const f=v.flies[i],patch=SWARMS[Math.floor(i/12)];if(!f)continue;
   if(v.swarmVersion===1&&f.swarmId===patch.id&&Number.isFinite(f.x)&&Number.isFinite(f.z)&&distance(f,patch)<=patch.radius+.001)Object.assign(s.flies[i],{x:f.x,z:f.z,phase:finite(f.phase)});
   s.flies[i].wait=clamp(finite(f.wait),0,12);
  }
  if(Array.isArray(v.catapults))for(const c of s.catapults){
   const old=v.catapults.find(t=>t.id===c.id);if(old){c.cooldown=clamp(finite(old.cooldown),0,ARTILLERY.cooldown);c.loaded=c.cooldown===0;}
   const mounted=!legacy&&v.actors.find(a=>a.catapultId===c.id);if(mounted){const a=s.actors.find(a=>a.id===mounted.id);a.x=c.x;a.z=c.z+2.3;moveBody(a,0,0);}
  }
  for(const k of Object.keys(s.stats))s.stats[k]=Math.max(0,Math.floor(finite(v.stats?.[k])));
  evaluateWinner(s);return s;
 }catch{return null;}
}

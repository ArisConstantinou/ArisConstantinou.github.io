// FROG arcade rules. Rendering-free and deterministic for repeatable tests.
import {ARTILLERY,CATAPULTS,createCatapults,interactCatapult,releaseCatapult,throwStone,stepArtillery} from './arcade-artillery.js';
export const ARCADE_VERSION = '4.2.0';
export const SAVE_KEY = 'frog-arcade-save-v1';
export const SETTINGS_KEY = 'frog-arcade-settings-v1';
export const RULES = Object.freeze({radius:25,capacity:40,dizzyHits:6,finishHits:3,dizzySeconds:4.5,tongueRange:3.2,pickupRange:3.2,tongueInterval:.22,kickRange:3.6,kickCooldown:1.1,kickDuration:.48,hopDuration:.30,landingDuration:.035,shotInterval:.14,projectileSpeed:32,projectileLifetime:.65,introSeconds:5});
export const OBSTACLES = Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]);
export const SWARMS = Object.freeze([[0,3.5],[-13,8],[13,1],[-12,-11],[10,-14],[2,17]].map(([x,z],i)=>Object.freeze({id:`swarm-${i}`,x,z,radius:2.1})));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const norm=(x,z)=>{const n=Math.hypot(x,z);return n>1e-6?{x:x/n,z:z/n}:{x:0,z:1};};
const finite=(v,f=0)=>Number.isFinite(v)?v:f;
function rng(s){let t=s.seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}
function actor(id,x,z){return {id,x,z,aimX:0,aimZ:-1,aiming:false,face:Math.PI,ammo:0,load:0,dizzy:0,finishHits:0,dizzyTime:0,ko:false,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickCooldown:0,kickPending:false,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,hopSpeed:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0,brain:0,decision:0,catapultId:null,catapultShots:0,catapultAim:0,interactHeld:false,machineTimer:id==='rival-1'?8:12,machineSeeking:false,aimWindup:0,aiShotReady:0,aiCharging:false,aiAimX:0,aiAimZ:-1};}
export function moveBody(a,dx,dz){
 let x=a.x+dx,z=a.z+dz;
 for(const o of OBSTACLES){const d=Math.hypot(x-o.x,z-o.z),r=o.r+.78;if(d<r){const n=norm(x-o.x,z-o.z);x=o.x+n.x*r;z=o.z+n.z*r;}}
 for(const c of CATAPULTS){if(a.catapultId===c.id)continue;const d=Math.hypot(x-c.x,z-c.z),r=ARTILLERY.baseRadius+.78;if(d<r){const n=norm(x-c.x,z-c.z);x=c.x+n.x*r;z=c.z+n.z*r;}}
 const d=Math.hypot(x,z);if(d>RULES.radius-1){x*= (RULES.radius-1)/d;z*= (RULES.radius-1)/d;}
 a.x=x;a.z=z;
}
function segmentCircle(x,z,nx,nz,c,r){const dx=nx-x,dz=nz-z,ox=x-c.x,oz=z-c.z,A=dx*dx+dz*dz,C=ox*ox+oz*oz-r*r;if(C<=0)return 0;if(A<1e-12)return null;const B=2*(ox*dx+oz*dz),D=B*B-4*A*C;if(D<0)return null;const t=(-B-Math.sqrt(D))/(2*A);return t>=0&&t<=1?t:null;}
export function clearPickupPath(a,f){return OBSTACLES.every(o=>segmentCircle(a.x,a.z,f.x,f.z,o,o.r+.1)===null);}
function placeFly(s,f){
 const patch=SWARMS[Math.floor(f.id/12)];f.swarmId=patch.id;
 const angle=rng(s)*Math.PI*2,r=Math.sqrt(rng(s))*patch.radius;
 f.x=patch.x+Math.sin(angle)*r;f.z=patch.z+Math.cos(angle)*r;f.wait=0;f.phase=rng(s)*Math.PI*2;
}
export function newRound(seed=731){
 const s={version:1,swarmVersion:1,seed,time:0,status:'playing',phase:'collect',intro:RULES.introSeconds,actors:[actor('player',0,8),actor('rival-1',-8,-16),actor('rival-2',8,-16)],flies:[],catapults:createCatapults(),shells:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0}};
 for(let i=0;i<72;i++){const f={id:i,swarmId:'',x:0,z:0,wait:0,phase:0};placeFly(s,f);s.flies.push(f);}
 // One close fly draws attention to the first refill patch; the rest need a short hop.
 Object.assign(s.flies[0],{x:0,z:5.5});
 return s;
}
export function fireRing(x,y){const d=Math.hypot(x,y);return {x:d>.08?x/Math.max(1,d):0,z:d>.08?y/Math.max(1,d):0,fire:d>=.72};}
export function kickTarget(s,a){return s.actors.filter(b=>b!==a&&!b.ko&&distance(a,b)<=RULES.kickRange&&clearPickupPath(a,b)).sort((b,c)=>distance(a,b)-distance(a,c))[0]||null;}
export function collect(s,a){
 if(a.ko||a.dizzyTime>0||a.catapultId||a.tongue>0||a.ammo>=RULES.capacity||(a.id!=='player'&&s.phase!=='battle'))return false;
 const f=s.flies.filter(f=>f.wait<=0&&distance(a,f)<=RULES.pickupRange&&clearPickupPath(a,f)).sort((f,g)=>distance(a,f)-distance(a,g))[0];
 if(!f)return false;
 a.tongue=RULES.tongueInterval;a.ammo++;f.wait=7+rng(s)*4;
 s.events.push({type:'tongue',id:a.id,x:f.x,z:f.z,swarmId:f.swarmId});if(a.id==='player')s.stats.caught++;return true;
}
export function shoot(s,a){
 if(a.ko||a.dizzyTime>0||a.catapultId||a.shot>0||a.ammo<=0||(a.id!=='player'&&s.phase!=='battle'))return false;
 a.shot=RULES.shotInterval;a.ammo--;const d=norm(a.aimX,a.aimZ);
 s.bullets.push({id:s.nextId++,owner:a.id,x:a.x+d.x*1.2,z:a.z+d.z*1.2,dx:d.x,dz:d.z,life:RULES.projectileLifetime});
 s.events.push({type:'shot',id:a.id});if(a.id==='player'){s.stats.shots++;if(s.phase==='practice'){s.phase='countdown';s.intro=RULES.introSeconds;}}return true;
}
function knockOut(s,a,b){
 releaseCatapult(s,a);a.ko=true;a.dizzyTime=0;a.hop=0;a.knockUp=0;a.knockUpStart=0;a.height=.9;a.impulseX=b.dx*17;a.impulseZ=b.dz*17;
 s.events.push({type:'ko',id:a.id,by:b.owner,x:a.x,z:a.z,dx:b.dx,dz:b.dz});if(b.owner==='player'&&a.id!=='player')s.stats.kos++;
}
export function hit(s,a,b){
 if(a.ko||a.invuln>0)return false;
 const startHeight=Math.max(0,a.height),direction=norm(finite(b.dx),finite(b.dz)),force=clamp(finite(b.force,5),0,30);let damage=clamp(Math.floor(finite(b.damage,1)),1,9);
 a.hit=.23;a.invuln=.12;a.impulseX=direction.x*force;a.impulseZ=direction.z*force;
 if(a.dizzyTime<=0){const hits=Math.min(damage,RULES.dizzyHits-a.dizzy);a.dizzy+=hits;damage-=hits;if(a.dizzy>=RULES.dizzyHits){a.dizzy=RULES.dizzyHits;a.dizzyTime=RULES.dizzySeconds;a.finishHits=0;a.hop=0;if(a.knockUp<=0)a.height=0;releaseCatapult(s,a);s.events.push({type:'dizzy',id:a.id});}}
 if(a.dizzyTime>0&&damage>0)a.finishHits=Math.min(RULES.finishHits,a.finishHits+damage);
 if(finite(b.lift)>0){releaseCatapult(s,a);a.knockUpDuration=clamp(finite(b.liftDuration,.48),.25,.65);a.knockUp=a.knockUpDuration;a.knockUpPeak=clamp(b.lift,.1,1.2);a.knockUpStart=startHeight;a.height=startHeight;a.hop=0;a.hopX=a.hopZ=0;a.hopSpeed=0;a.kick=0;a.kickPending=false;}
 s.events.push({type:'hit',id:a.id,owner:b.owner,x:a.x,z:a.z,dx:direction.x,dz:direction.z});if(b.owner==='player'&&a.id!=='player')s.stats.hits++;
 if(a.finishHits>=RULES.finishHits)knockOut(s,a,{...b,dx:direction.x,dz:direction.z});return true;
}
export function kick(s,a){
 if(s.phase!=='battle'||a.ko||a.dizzyTime>0||a.catapultId||a.knockUp>0||a.kick>0||a.kickCooldown>0)return false;
 const target=kickTarget(s,a);if(!target)return false;
 const d=norm(target.x-a.x,target.z-a.z);a.aimX=d.x;a.aimZ=d.z;a.kick=RULES.kickDuration;a.kickCooldown=RULES.kickCooldown;a.kickPending=true;a.kickId=target.id;s.events.push({type:'kick',id:a.id});return true;
}
function settleKick(s,a){
 a.kickPending=false;const t=s.actors.find(b=>b.id===a.kickId);
 if(!t||t.ko||distance(a,t)>RULES.kickRange+.25||!clearPickupPath(a,t))return;
 const d=norm(t.x-a.x,t.z-a.z);hit(s,t,{owner:a.id,dx:d.x,dz:d.z,damage:1,force:14});
 // A defensive shove still creates space during the target's brief damage immunity.
 if(!t.ko){t.impulseX=d.x*14;t.impulseZ=d.z*14;}
}
export function rivalIntent(s,a){
 if(s.phase!=='battle')return {};
 const opponents=s.actors.filter(b=>b!==a&&!b.ko);if(!opponents.length)return {};
 const target=opponents.reduce((b,c)=>distance(a,b)<distance(a,c)?b:c);const d=distance(a,target),to=norm(target.x-a.x,target.z-a.z);
 a.brain-=1/60;if(a.brain<=0){a.brain=.7+rng(s)*.5;a.decision=rng(s)>.5?1:-1;}
 const intent={aiming:true,ax:to.x,az:to.z,kick:d<3.3};
 if(a.catapultId){
  if(d<7||a.catapultShots>=2){a.machineTimer=18;a.machineSeeking=false;return {...intent,interactCatapult:true};}
  const c=s.catapults.find(c=>c.id===a.catapultId);
  return {...intent,throwStone:c?.loaded&&a.catapultAim<=0?{x:target.x,z:target.z}:undefined};
 }
 const machine=s.catapults.find(c=>c.owner===a.id&&!c.occupant);
 if(a.machineTimer<=0&&!a.machineSeeking){a.machineSeeking=!!machine&&d>9&&rng(s)<.45;a.machineTimer=5;}
 if(a.machineSeeking&&machine){
  if(d<6){a.machineSeeking=false;a.machineTimer=12;}
  else{const n=norm(machine.x-a.x,machine.z-a.z);return {...intent,mx:n.x,mz:n.z,aiming:false,interactCatapult:distance(a,machine)<=ARTILLERY.interactionRange};}
 }
 if(a.ammo<5){a.aiCharging=false;a.aimWindup=0;const fly=s.flies.filter(f=>f.wait<=0).sort((f,g)=>distance(a,f)-distance(a,g))[0];if(fly){const n=norm(fly.x-a.x,fly.z-a.z);return {...intent,mx:n.x,mz:n.z,aiming:false};}}
 // Opponents commit to a visible aim for .32 s, giving the player time to dodge.
 let fire=false;
 if(d<16&&a.ammo>0&&clearPickupPath(a,target)){
  if(!a.aiCharging&&a.aiShotReady<=0){const error=(rng(s)-.5)*.08,cos=Math.cos(error),sin=Math.sin(error);a.aiAimX=to.x*cos-to.z*sin;a.aiAimZ=to.x*sin+to.z*cos;a.aimWindup=.32;a.aiCharging=true;}
  else if(a.aiCharging&&a.aimWindup<=0){fire=true;a.aiCharging=false;a.aiShotReady=.22+rng(s)*.1;}
 }else{a.aiCharging=false;a.aimWindup=0;}
 const chase=d>11?1:d<6?-1:0;
 return {...intent,mx:to.x*chase+to.z*a.decision*.45,mz:to.z*chase-to.x*a.decision*.45,ax:a.aiCharging||fire?a.aiAimX:to.x,az:a.aiCharging||fire?a.aiAimZ:to.z,fire};
}
export function step(s,input={},dt=1/60){
 if(s.status!=='playing')return;s.events.length=0;dt=clamp(finite(dt),0,.05);if(dt===0)return;s.time+=dt;
 if(s.phase==='collect'&&s.stats.caught>=5)s.phase='practice';
 if(s.phase==='countdown'){s.intro=Math.max(0,s.intro-dt);if(s.intro===0){s.phase='battle';s.events.push({type:'battle'});}}
 for(const f of s.flies)if(f.wait>0){f.wait-=dt;if(f.wait<=0)placeFly(s,f);}
 for(const a of s.actors){
  for(const k of ['shot','tongue','invuln','hit','idle','kickCooldown','aimWindup','aiShotReady','catapultAim'])a[k]=Math.max(0,a[k]-dt);
  if(s.phase==='battle')a.machineTimer=Math.max(0,a.machineTimer-dt);
  if(a.ko){releaseCatapult(s,a);moveBody(a,a.impulseX*dt,a.impulseZ*dt);a.impulseX*=Math.exp(-dt*3);a.impulseZ*=Math.exp(-dt*3);a.height=Math.max(0,a.height-dt*1.6);continue;}
  if(a.kick>0){a.kick=Math.max(0,a.kick-dt);if(a.kickPending&&a.kick<.30)settleKick(s,a);}
  if(a.dizzyTime>0){a.dizzyTime=Math.max(0,a.dizzyTime-dt);if(a.dizzyTime===0){a.dizzy=0;a.finishHits=0;a.invuln=.55;s.events.push({type:'recover',id:a.id});}}
  const c=a.id==='player'?input:rivalIntent(s,a);
  if(c.interactCatapult&&!a.interactHeld)interactCatapult(s,a);a.interactHeld=!!c.interactCatapult;
  const mx=a.catapultId?0:finite(c.mx),mz=a.catapultId?0:finite(c.mz),len=Math.hypot(mx,mz),moving=len>.08&&a.knockUp<=0;
  const suppliedAim=Number.isFinite(c.ax)&&Number.isFinite(c.az)&&Math.hypot(c.ax,c.az)>.05;
  a.aiming=c.aiming===undefined?suppliedAim:c.aiming===true;
  if(a.aiming&&suppliedAim){const n=norm(c.ax,c.az);a.aimX=n.x;a.aimZ=n.z;}
  if(moving){a.face=Math.atan2(mx,mz);if(!a.aiming&&a.kick<=0){const n=norm(mx,mz);a.aimX=n.x;a.aimZ=n.z;}}
  if(a.dizzyTime<=0){
   collect(s,a);
   if(s.phase==='collect'&&s.stats.caught>=5)s.phase='practice';
   if(c.fire)shoot(s,a);if(c.kick)kick(s,a);if(c.throwStone)throwStone(s,a,c.throwStone);
   if(a.catapultId){const machine=s.catapults.find(c=>c.id===a.catapultId);if(machine){machine.aimX=a.aimX;machine.aimZ=a.aimZ;a.x=machine.x;a.z=machine.z;a.impulseX=a.impulseZ=0;}}
   if(a.knockUp<=0&&a.hop<=0&&a.idle<=0&&moving){a.hop=RULES.hopDuration;a.hopSpeed=clamp(len,0,1);}
   if(a.knockUp<=0&&a.hop>0){
    a.hop=Math.max(0,a.hop-dt);const speed=a.id==='player'?8.8:6.2,scale=moving?speed/Math.max(1,len):0;
    // Short, steerable hops retain analog strength; releasing the stick brakes now.
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
  const travel=Math.min(dt,Math.max(0,b.life));b.life-=dt;if(travel<=0)continue;const nx=b.x+b.dx*RULES.projectileSpeed*travel,nz=b.z+b.dz*RULES.projectileSpeed*travel;
  let closest=2,contact=null;
  for(const o of OBSTACLES){const t=segmentCircle(b.x,b.z,nx,nz,o,o.r+.1);if(t!==null&&t<closest){closest=t;contact={type:'wall',o};}}
  for(const a of s.actors){if(s.phase!=='battle'||a.id===b.owner||a.ko)continue;const t=segmentCircle(b.x,b.z,nx,nz,a,1+a.load*.2);if(t!==null&&t<closest){closest=t;contact={type:'actor',a};}}
  if(contact){b.x+=(nx-b.x)*closest;b.z+=(nz-b.z)*closest;b.life=0;if(contact.type==='actor')hit(s,contact.a,b);s.events.push({type:'splat',x:b.x,z:b.z,wall:contact.type==='wall',dx:b.dx,dz:b.dz});}
  else{b.x=nx;b.z=nz;if(Math.hypot(nx,nz)>RULES.radius-.2){b.life=0;s.events.push({type:'splat',x:nx,z:nz,wall:false,dx:b.dx,dz:b.dz});}}
 }
 s.bullets=s.bullets.filter(b=>b.life>0);stepArtillery(s,dt,hit);
 if(s.actors[0].ko)s.status='lost';else if(s.actors.slice(1).every(a=>a.ko))s.status='won';
}
export function saveRound(s){return JSON.stringify({...s,events:[],bullets:[],shells:[]});}
export function loadRound(raw){
 try{
 const v=JSON.parse(raw);if(v?.version!==1||!Array.isArray(v.actors)||v.actors.length!==3||!Array.isArray(v.flies)||v.flies.length!==72)return null;
 if(!['playing','won','lost'].includes(v.status))return null;
 const s=newRound(finite(v.seed,731));s.time=clamp(finite(v.time),0,1e7);s.status=v.status;s.nextId=Math.max(1,Math.floor(finite(v.nextId,1)));s.intro=clamp(finite(v.intro,RULES.introSeconds),0,RULES.introSeconds);s.phase=['collect','practice','countdown','battle'].includes(v.phase)?v.phase:(finite(v.stats?.caught)>=5?'practice':'collect');
 for(let i=0;i<3;i++){const a=v.actors[i];if(a.id!==s.actors[i].id||!Number.isFinite(a.x)||!Number.isFinite(a.z))return null;for(const key of Object.keys(s.actors[i]))if(typeof s.actors[i][key]==='number')s.actors[i][key]=finite(a[key],s.actors[i][key]);Object.assign(s.actors[i],{ko:!!a.ko,aiming:false,catapultId:null,interactHeld:false,machineSeeking:false,aiCharging:false,aimWindup:0,ammo:clamp(Math.floor(finite(a.ammo)),0,RULES.capacity),load:clamp(finite(a.load),0,1),dizzy:clamp(finite(a.dizzy),0,RULES.dizzyHits),finishHits:clamp(finite(a.finishHits),0,RULES.finishHits),dizzyTime:clamp(finite(a.dizzyTime),0,RULES.dizzySeconds),kickPending:false,kick:0,hop:0,hopX:0,hopZ:0,height:0,knockUp:0,knockUpDuration:0,knockUpPeak:0,knockUpStart:0,idle:0});moveBody(s.actors[i],0,0);}
 for(let i=0;i<72;i++){
  const f=v.flies[i],patch=SWARMS[Math.floor(i/12)];if(!f)continue;
  // Keep depleted stock/timers, but move old scattered flies into permanent patches.
  if(v.swarmVersion===1&&f.swarmId===patch.id&&Number.isFinite(f.x)&&Number.isFinite(f.z)&&distance(f,patch)<=patch.radius+.001)Object.assign(s.flies[i],{x:f.x,z:f.z,phase:finite(f.phase)});
  s.flies[i].wait=clamp(finite(f.wait),0,12);
 }
 if(Array.isArray(v.catapults))for(const c of s.catapults){const old=v.catapults.find(t=>t.id===c.id);if(old){c.cooldown=clamp(finite(old.cooldown),0,ARTILLERY.cooldown);c.loaded=c.cooldown===0;}const mounted=v.actors.find(a=>a.catapultId===c.id);if(mounted){const a=s.actors.find(a=>a.id===mounted.id);a.x=c.x;a.z=c.z+2.3;moveBody(a,0,0);}}
 for(const k of Object.keys(s.stats))s.stats[k]=Math.max(0,Math.floor(finite(v.stats?.[k])));return s;
 }catch{return null;}
}

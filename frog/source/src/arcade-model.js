// FROG arcade rules. Rendering-free and deterministic for repeatable tests.
export const ARCADE_VERSION = '4.1.0';
export const SAVE_KEY = 'frog-arcade-save-v2';
export const SETTINGS_KEY = 'frog-arcade-settings-v1';
export const RULES = Object.freeze({radius:25,capacity:40,dizzyHits:6,dizzySeconds:4.5,tongueRange:8,kickRange:3.6,shotInterval:.14,projectileSpeed:32,startGrace:14,sightRange:13.5,enemyShotInterval:.42});
export const OBSTACLES = Object.freeze([{x:-8,z:2,r:1.5},{x:8,z:-3,r:1.7},{x:-2,z:-12,r:1.4},{x:13,z:12,r:1.6}]);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const norm=(x,z)=>{const n=Math.hypot(x,z);return n>1e-6?{x:x/n,z:z/n}:{x:0,z:1};};
const finite=(v,f=0)=>Number.isFinite(v)?v:f;
function rng(s){let t=s.seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;}
function actor(id,x,z){return {id,x,z,aimX:0,aimZ:-1,face:Math.PI,ammo:0,load:0,dizzy:0,dizzyTime:0,ko:false,hit:0,invuln:0,shot:0,tongue:0,kick:0,kickPending:false,impulseX:0,impulseZ:0,hop:0,hopX:0,hopZ:0,height:0,idle:0,brain:0,decision:0,targetId:null,targetLock:0,alert:0,patrolX:x,patrolZ:z,patrolTime:0};}
export function moveBody(a,dx,dz){
 let x=a.x+dx,z=a.z+dz;
 for(const o of OBSTACLES){const d=Math.hypot(x-o.x,z-o.z),r=o.r+.78;if(d<r){const n=norm(x-o.x,z-o.z);x=o.x+n.x*r;z=o.z+n.z*r;}}
 const d=Math.hypot(x,z);if(d>RULES.radius-1){x*= (RULES.radius-1)/d;z*= (RULES.radius-1)/d;}
 a.x=x;a.z=z;
}
function placeFly(s,f){
 for(let i=0;i<50;i++){const a=rng(s)*Math.PI*2,r=Math.sqrt(rng(s))*22;f.x=Math.sin(a)*r;f.z=Math.cos(a)*r;if(OBSTACLES.every(o=>distance(f,o)>o.r+1.3))break;}
 f.wait=0;f.phase=rng(s)*6.28;
}
export function newRound(seed=731){
 const s={version:2,seed,time:0,grace:RULES.startGrace,status:'playing',actors:[actor('player',0,18),actor('rival-1',-13,-7),actor('rival-2',13,-7)],flies:[],bullets:[],events:[],nextId:1,stats:{caught:0,shots:0,hits:0,kos:0}};
 for(let i=0;i<72;i++){const f={id:i,x:0,z:0,wait:0,phase:0};placeFly(s,f);s.flies.push(f);}
 // A visible first mouthful, not a tutorial panel or a free ammo refill.
 for(let i=0;i<10;i++){s.flies[i].x=(i%5-2)*.85;s.flies[i].z=15.2-Math.floor(i/5)*1.2;}
 // Rival food is near their own spawn, not next to the player.
 for(let j=1;j<=2;j++)for(let i=0;i<8;i++){const f=s.flies[10+(j-1)*8+i],a=s.actors[j];f.x=a.x+(j===1?1:-1)*(2+i%4*.65);f.z=a.z-1.5-Math.floor(i/4);}
 return s;
}
export function fireRing(x,y){const d=Math.hypot(x,y);return {x:d>.08?x/Math.max(1,d):0,z:d>.08?y/Math.max(1,d):0,fire:d>=.72};}
export function kickTarget(s,a){return s.actors.filter(b=>b!==a&&!b.ko&&b.dizzyTime>0&&distance(a,b)<=RULES.kickRange).sort((b,c)=>distance(a,b)-distance(a,c))[0]||null;}
export function collect(s,a){
 if(a.ko||a.dizzyTime>0||a.tongue>0||a.ammo>=RULES.capacity)return false;
 a.tongue=.22;
 const candidates=s.flies.filter(f=>f.wait<=0&&distance(a,f)<=RULES.tongueRange&&hasSight(a,f)).sort((f,g)=>{
  const rank=b=>distance(a,b)-2*((b.x-a.x)*a.aimX+(b.z-a.z)*a.aimZ)/Math.max(.1,distance(a,b));return rank(f)-rank(g);
 });
 const f=candidates[0];if(!f){s.events.push({type:'tongue',id:a.id,x:a.x+a.aimX*4,z:a.z+a.aimZ*4,empty:true});return false;}
 a.ammo++;f.wait=7+rng(s)*4;s.events.push({type:'tongue',id:a.id,x:f.x,z:f.z});if(a.id==='player')s.stats.caught++;return true;
}
export function shoot(s,a){
 if(a.ko||a.dizzyTime>0||a.shot>0||a.ammo<=0)return false;
 if(a.id==='player')s.grace=0;
 a.shot=a.id==='player'?RULES.shotInterval:RULES.enemyShotInterval;a.ammo--;const d=norm(a.aimX,a.aimZ);
 s.bullets.push({id:s.nextId++,owner:a.id,x:a.x+d.x*1.2,z:a.z+d.z*1.2,dx:d.x,dz:d.z,life:1.6});
 s.events.push({type:'shot',id:a.id});if(a.id==='player')s.stats.shots++;return true;
}
export function hit(s,a,b){
 if(a.ko||a.invuln>0||(a.id==='player'&&s.grace>0))return false;
 a.hit=.23;a.invuln=.15;a.impulseX=b.dx*5;a.impulseZ=b.dz*5;
 if(a.dizzyTime<=0){a.dizzy++;if(a.dizzy>=RULES.dizzyHits){a.dizzy=RULES.dizzyHits;a.dizzyTime=RULES.dizzySeconds;a.hop=0;a.height=0;s.events.push({type:'dizzy',id:a.id});}}
 s.events.push({type:'hit',id:a.id,x:a.x,z:a.z,dx:b.dx,dz:b.dz});if(b.owner==='player')s.stats.hits++;return true;
}
export function kick(s,a){
 if(a.ko||a.dizzyTime>0||a.kick>0)return false;
 const target=kickTarget(s,a);if(!target)return false;
 const d=norm(target.x-a.x,target.z-a.z);a.aimX=d.x;a.aimZ=d.z;a.kick=.48;a.kickPending=true;a.kickId=target.id;s.events.push({type:'kick',id:a.id});return true;
}
function settleKick(s,a){
 a.kickPending=false;const t=s.actors.find(b=>b.id===a.kickId);
 if(!t||t.ko||t.dizzyTime<=0||(t.id==='player'&&s.grace>0)||distance(a,t)>RULES.kickRange+.25)return;
 const d=norm(t.x-a.x,t.z-a.z);t.ko=true;t.dizzyTime=0;t.height=.9;t.impulseX=d.x*17;t.impulseZ=d.z*17;
 s.events.push({type:'ko',id:t.id,by:a.id,x:t.x,z:t.z,dx:d.x,dz:d.z});if(a.id==='player')s.stats.kos++;
}
// No player bias: rivals only react to opponents they can actually see.
export function hasSight(a,b){
 return OBSTACLES.every(o=>segmentCircle(a.x,a.z,b.x,b.z,o,o.r+.2)===null);
}
export function chooseTarget(s,a){
 const candidates=s.actors.filter(b=>b!==a&&!b.ko&&!(b.id==='player'&&s.grace>0)&&distance(a,b)<=RULES.sightRange&&hasSight(a,b));
 const held=candidates.find(b=>b.id===a.targetId);
 if(held&&a.targetLock>0)return held;
 return candidates.sort((b,c)=>distance(a,b)-distance(a,c)||b.id.localeCompare(c.id))[0]||null;
}
export function intent(s,a,dt=1/60){
 a.targetLock=Math.max(0,a.targetLock-dt);a.alert=Math.max(0,a.alert-dt);
 const target=s.time<4?null:chooseTarget(s,a);
 if((target?.id||null)!==a.targetId){a.targetId=target?.id||null;a.targetLock=1.8;a.alert=target?.id==='player'?1.1:.55;}
 a.brain-=dt;if(a.brain<=0){a.brain=.7+rng(s)*.5;a.decision=rng(s)>.5?1:-1;}
 const needsFood=a.ammo<(target?4:18);
 if(needsFood){
  const flies=s.flies.filter(f=>f.wait<=0&&!(s.grace>0&&distance(f,s.actors[0])<11));
  const f=flies.sort((b,c)=>distance(a,b)-distance(a,c))[0];
  if(f){const n=norm(f.x-a.x,f.z-a.z),d=distance(a,f);return {mx:d>4?n.x:0,mz:d>4?n.z:0,ax:n.x,az:n.z,collect:d<RULES.tongueRange};}
 }
 if(!target){
  // Local wandering, never GPS pursuit of the player across the arena.
  a.patrolTime-=dt;
  if(a.patrolTime<=0||Math.hypot(a.patrolX-a.x,a.patrolZ-a.z)<2){
   a.patrolTime=3+rng(s)*3;const angle=rng(s)*Math.PI*2;
   const centerX=s.time<20?(a.id==='rival-1'?-7:7):a.x,centerZ=s.time<20?-7:a.z;
   a.patrolX=clamp(centerX+Math.cos(angle)*7,-19,19);a.patrolZ=clamp(centerZ+Math.sin(angle)*7,-19,19);
   if(s.grace>0&&Math.hypot(a.patrolX-s.actors[0].x,a.patrolZ-s.actors[0].z)<12)a.patrolZ=-7;
  }
  const n=norm(a.patrolX-a.x,a.patrolZ-a.z);return {mx:n.x*.6,mz:n.z*.6,ax:n.x,az:n.z};
 }
 const d=distance(a,target),to=norm(target.x-a.x,target.z-a.z),chase=target.dizzyTime>0?1:d>10?1:d<6?-1:0;
 const aimError=Math.sin(s.time*2.1+(a.id==='rival-1'?0:2))*.075;
 return {mx:to.x*chase+to.z*a.decision*.4,mz:to.z*chase-to.x*a.decision*.4,ax:to.x+to.z*aimError,az:to.z-to.x*aimError,fire:a.alert<=0&&d<13&&target.dizzyTime<=0,collect:a.ammo<18&&d>9,kick:target.dizzyTime>0&&d<3.3};
}
function segmentCircle(x,z,nx,nz,c,r){const dx=nx-x,dz=nz-z,ox=x-c.x,oz=z-c.z,A=dx*dx+dz*dz,C=ox*ox+oz*oz-r*r;if(C<=0)return 0;if(A<1e-12)return null;const B=2*(ox*dx+oz*dz),D=B*B-4*A*C;if(D<0)return null;const t=(-B-Math.sqrt(D))/(2*A);return t>=0&&t<=1?t:null;}
export function step(s,input={},dt=1/60){
 if(s.status!=='playing')return;s.events.length=0;dt=clamp(finite(dt),0,.05);s.time+=dt;s.grace=Math.max(0,finite(s.grace)-dt);
 for(const f of s.flies)if(f.wait>0){f.wait-=dt;if(f.wait<=0)placeFly(s,f);}
 for(const a of s.actors){
  for(const k of ['shot','tongue','invuln','hit','idle'])a[k]=Math.max(0,a[k]-dt);
  if(a.ko){moveBody(a,a.impulseX*dt,a.impulseZ*dt);a.impulseX*=Math.exp(-dt*3);a.impulseZ*=Math.exp(-dt*3);a.height=Math.max(0,a.height-dt*1.6);continue;}
  if(a.kick>0){a.kick-=dt;if(a.kickPending&&a.kick<.30)settleKick(s,a);}
  if(a.dizzyTime>0){a.dizzyTime=Math.max(0,a.dizzyTime-dt);if(a.dizzyTime===0){a.dizzy=0;a.invuln=.55;s.events.push({type:'recover',id:a.id});}}
  const c=a.id==='player'?input:intent(s,a,dt);
  if(Number.isFinite(c.ax)&&Number.isFinite(c.az)&&Math.hypot(c.ax,c.az)>.05){const n=norm(c.ax,c.az);a.aimX=n.x;a.aimZ=n.z;}
  if(a.dizzyTime<=0){
   if(c.collect)collect(s,a);if(c.fire)shoot(s,a);if(c.kick)kick(s,a);
   const mx=finite(c.mx),mz=finite(c.mz),len=Math.hypot(mx,mz);
   if(a.hop<=0&&a.idle<=0&&a.kick<=0&&len>.1){const n=norm(mx,mz);a.hop=.43;a.hopX=n.x*(a.id==='player'?8.8:6.2);a.hopZ=n.z*(a.id==='player'?8.8:6.2);a.face=Math.atan2(n.x,n.z);}
   if(a.hop>0){a.hop=Math.max(0,a.hop-dt);moveBody(a,a.hopX*dt,a.hopZ*dt);a.height=Math.sin((1-a.hop/.43)*Math.PI)*1.15;if(a.hop===0){a.height=0;a.idle=.085;s.events.push({type:'land',id:a.id,x:a.x,z:a.z});}}
  }
  moveBody(a,a.impulseX*dt,a.impulseZ*dt);a.impulseX*=Math.exp(-dt*10);a.impulseZ*=Math.exp(-dt*10);
  a.load+=(a.ammo/RULES.capacity-a.load)*(1-Math.exp(-dt*12));
 }
 for(const b of s.bullets){
  b.life-=dt;if(b.life<=0)continue;const nx=b.x+b.dx*RULES.projectileSpeed*dt,nz=b.z+b.dz*RULES.projectileSpeed*dt;
  let closest=2,contact=null;
  for(const o of OBSTACLES){const t=segmentCircle(b.x,b.z,nx,nz,o,o.r+.1);if(t!==null&&t<closest){closest=t;contact={type:'wall',o};}}
  for(const a of s.actors){if(a.id===b.owner||a.ko||(a.id==='player'&&s.grace>0))continue;const t=segmentCircle(b.x,b.z,nx,nz,a,1+a.load*.2);if(t!==null&&t<closest){closest=t;contact={type:'actor',a};}}
  if(contact){b.x+=(nx-b.x)*closest;b.z+=(nz-b.z)*closest;b.life=0;if(contact.type==='actor')hit(s,contact.a,b);s.events.push({type:'splat',x:b.x,z:b.z,wall:contact.type==='wall',dx:b.dx,dz:b.dz});}
  else{b.x=nx;b.z=nz;if(Math.hypot(nx,nz)>RULES.radius-.2){b.life=0;s.events.push({type:'splat',x:nx,z:nz,wall:false,dx:b.dx,dz:b.dz});}}
 }
 s.bullets=s.bullets.filter(b=>b.life>0);
 if(s.actors[0].ko)s.status='lost';else if(s.actors.slice(1).every(a=>a.ko))s.status='won';
}
export function saveRound(s){return JSON.stringify({...s,events:[],bullets:[]});}
export function loadRound(raw){
 try{
 const v=JSON.parse(raw);if(v?.version!==2||!Array.isArray(v.actors)||v.actors.length!==3||!Array.isArray(v.flies)||v.flies.length!==72)return null;
 if(!['playing','won','lost'].includes(v.status))return null;
 const s=newRound(finite(v.seed,731));s.time=clamp(finite(v.time),0,1e7);s.status=v.status;s.grace=clamp(finite(v.grace),0,RULES.startGrace);s.nextId=Math.max(1,Math.floor(finite(v.nextId,1)));
 for(let i=0;i<3;i++){const a=v.actors[i];if(a.id!==s.actors[i].id||!Number.isFinite(a.x)||!Number.isFinite(a.z))return null;for(const key of Object.keys(s.actors[i]))if(typeof s.actors[i][key]==='number')s.actors[i][key]=finite(a[key],s.actors[i][key]);Object.assign(s.actors[i],{ko:!!a.ko,ammo:clamp(Math.floor(finite(a.ammo)),0,40),load:clamp(finite(a.load),0,1),dizzy:clamp(finite(a.dizzy),0,6),dizzyTime:clamp(finite(a.dizzyTime),0,4.5),kickPending:false,kick:0});moveBody(s.actors[i],0,0);}
 for(let i=0;i<72;i++){const f=v.flies[i];if(Number.isFinite(f?.x)&&Number.isFinite(f?.z))Object.assign(s.flies[i],{x:clamp(f.x,-24,24),z:clamp(f.z,-24,24),wait:clamp(finite(f.wait),0,12),phase:finite(f.phase)});}
 for(const k of Object.keys(s.stats))s.stats[k]=Math.max(0,Math.floor(finite(v.stats?.[k])));return s;
 }catch{return null;}
}

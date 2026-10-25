import * as THREE from 'three';
import { PREDATORS, clamp } from './rules.js';
import {WORLD_BOUNDARY} from './world-config.js';
import {insideFort,canPassGate,resolveFortMovement,gatePoint} from './fortification.js';
import {applyCombatImpulse} from './combat-feedback.js';

const distance = (a,b) => Math.hypot(a.x-b.x,a.z-b.z);
const friendly = f => f && (f.team==='player'||f.team==='ally');
const alive = f => f && !f.dead && f.hp>0;
const point = (p,y=.3) => new THREE.Vector3(p.x,(p.y||0)+y,p.z);
const angleLerp = (a,b,t) => a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*Math.min(1,t);
const detection = {heron:21,snake:17,fish:23};
const radius = {heron:2.65,snake:1.65,fish:2.85};
const lungeDuration = {heron:.44,snake:.38,fish:.58};
const mouthOffset = {heron:1.8,snake:2.05,fish:1.35};
const mouthPosition = new THREE.Vector3();

function initialize(p) {
  if(p._aiReady)return;
  const defaults=PREDATORS[p.type];
  p._aiReady=true;p.baseSpeed=Number.isFinite(p.baseSpeed)&&p.baseSpeed>0?p.baseSpeed:Number.isFinite(p.speed)&&p.speed>0?p.speed:defaults.speed;p.speed=0;p.health=p.hp;
  p.baseWindup=Number.isFinite(p.windup)&&p.windup>0?p.windup:defaults.windup;
  p.baseRecover=Number.isFinite(p.recover)&&p.recover>0?p.recover:defaults.recover;
  p.windup=p.baseWindup;p.recover=p.baseRecover;
  p.strikeRadius=Number.isFinite(p.strikeRadius)&&p.strikeRadius>0?p.strikeRadius:radius[p.type]*(p.boss?(p.type==='fish'?1.8:1.45):1);
  p.lungeTime=Number.isFinite(p.lungeTime)&&p.lungeTime>0?p.lungeTime:lungeDuration[p.type];
  p.burstCount=Number.isFinite(p.burstCount)?clamp(Math.round(p.burstCount),1,5):p.boss?(p.type==='heron'?2:p.type==='snake'?3:1):1;
  p.burstRemaining=0;p.burstIndex=0;p.enraged=!!p.boss&&p.hp<=p.maxHp*.5;p.defeatNotified=!!p.defeatNotified;
  p.grabCooldown=0;p.thinkTime=0;p.chaseTime=0;p.lostTime=0;p.huntUntil=0;
  p.playerDamage=Math.max(0,Number(p.playerDamage)||0);p.lastCombatAt=Number.isFinite(p.lastCombatAt)?p.lastCombatAt:-100;p.engagedPlayer=false;p.hitAnim=0;
  p.repelAwarded=!!p.repelAwarded;p.killAwarded=!!p.killAwarded;p.provokedUntil=Number(p.provokedUntil)||0;p.hunting=false;p.fearPressure=0;
  p.attackDuration=1;p.attackType='lunge';p.movePulse=0;p.grace=p.grace||0;
}
function surface(game,x,z) {return game.world.getSurface(x,z);}
function wet(game,x,z) {const s=surface(game,x,z);return s.type==='water'||s.type==='lily'||(s.type==='leaf')||s.height<.13;}
function protectedByGrace(game,p,f) {
  return friendly(f) && game.elapsed<(game.graceUntil||0) && game.elapsed>=(p.provokedUntil||0);
}
function canReach(game,p,f) {
  if(!alive(f)||f.grabbedBy&&f.grabbedBy!==p||protectedByGrace(game,p,f))return false;
  if(p.eventRole==='guardian'&&game.elapsed>=(p.provokedUntil||0)&&distance(f,p.anchor)>(p.territoryRadius||26))return false;
  if(p.type!=='heron'&&(game.camps||[]).some(c=>!c.destroyed&&insideFort(c,f)&&!insideFort(c,p)&&!canPassGate(c,p)))return false;
  if(p.type==='fish')return wet(game,f.x,f.z)&&f.y<1.15;
  if(p.type==='snake')return f.y-surface(game,f.x,f.z).height<2.2;
  return f.y-surface(game,f.x,f.z).height<4.1;
}
function neighbors(game,f,r=5) {
  const team=f.team==='player'?'ally':f.team;
  let count=0;
  for(const other of game.frogs) {
    if(other===f||!alive(other)||other.grabbedBy)continue;
    if((other.team==='player'?'ally':other.team)===team&&distance(other,f)<r)count++;
  }
  return count;
}
function visibleToPlayer(game,p,r=37) {return game.player&&distance(game.player,p)<r;}
function sound(game,p,name,intensity=1) {
  if(!visibleToPlayer(game,p,42))return;
  game.audio?.play?.(name,{intensity:intensity*Math.max(.25,1-distance(game.player,p)/52)});
}
function activateHunt(game,p) {
  p.engagedPlayer=true;p.huntUntil=game.elapsed+10;p.hunting=true;
  if(!game.hunt||game.hunt.dead||game.hunt.phase==='dormant'||distance(game.player,p)<distance(game.player,game.hunt)*.72)game.hunt=p;
  if(!p.announced || game.elapsed-p.announced>28) {
    p.announced=game.elapsed;
    game.ui?.toast?.(`${p.name} σε κυνηγά! Πολέμησε για να τον απωθήσεις ή να τον σκοτώσεις.`, 'warning');
    sound(game,p,'hunt',.9);
  }
}
function enter(p,phase) {p.phase=phase;p.phaseTime=0;p.speed=0;}
function acquire(game,p) {
  let best=null,bestScore=Infinity;
  const range=detection[p.type];
  for(const f of game.frogs) {
    if(!canReach(game,p,f))continue;
    const d=distance(p,f);if(d>range)continue;
    const near=neighbors(game,f);
    const score=d+(f.hp/f.maxHp)*2.3+Math.min(near,5)*.65-(f.hp<f.maxHp*.45?2:0);
    if(score<bestScore){bestScore=score;best=f;}
  }
  if(best) {
    p.target=best;p.targetId=best.id;p.chaseTime=0;p.lostTime=0;enter(p,'stalk');
    if(friendly(best)&&visibleToPlayer(game,p,40))activateHunt(game,p);
    else sound(game,p,p.type,.45);
  }
  return best;
}
function walk(game,p,x,z,speed,dt) {
  let dx=x-p.x,dz=z-p.z,d=Math.hypot(dx,dz);if(d<.05){p.speed=0;return;}
  let nx=p.x+dx/d*Math.min(d,speed*dt),nz=p.z+dz/d*Math.min(d,speed*dt);
  // Fish remain in the water. Look around rock/island edges instead of sliding over them.
  if(p.type==='fish'&&!wet(game,nx,nz)) {
    let best=null,score=Infinity;
    const heading=Math.atan2(dx,dz),step=Math.max(.16,speed*dt);
    for(const turn of [.45,-.45,.9,-.9,1.4,-1.4,2.2,-2.2]) {
      const a=heading+turn,tx=p.x+Math.sin(a)*step,tz=p.z+Math.cos(a)*step;
      if(!wet(game,tx,tz))continue;
      const s=Math.hypot(x-tx,z-tz)+Math.abs(turn)*.08;
      if(s<score){score=s;best={x:tx,z:tz};}
    }
    if(!best){p.speed=0;return;}
    nx=best.x;nz=best.z;dx=nx-p.x;dz=nz-p.z;
  }
  nx=clamp(nx,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);nz=clamp(nz,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);
  if(p.type!=='heron'){const resolved=resolveFortMovement(game.camps||[],p,{x:nx,z:nz});nx=resolved.x;nz=resolved.z;}
  p.yaw=angleLerp(p.yaw,Math.atan2(dx,dz),dt*(p.type==='heron'?4:7));
  p.speed=Math.hypot(nx-p.x,nz-p.z)/Math.max(.001,dt);p.x=nx;p.z=nz;
  p.movePulse+=dt*p.speed;
  if(p.movePulse>4.5&&p.type!=='snake'&&visibleToPlayer(game,p,32)) {
    p.movePulse=0;if(wet(game,p.x,p.z))game.world.splash(point(p,-p.y),p.type==='heron'?.32:.2);
  }
}
function setHeight(game,p) {
  if(p.type==='fish') {
    let y=-1.52+Math.sin(game.elapsed*1.8)*.055;
    if(p.phase==='windup')y+=clamp(p.phaseTime/p.windup,0,1)*.32;
    if(p.phase==='lunge')y=-1.15+Math.sin(clamp(p.phaseTime/p.lungeTime,0,1)*Math.PI)*(p.boss?1.55:1.05);
    if(p.phase==='grab')y=-.74+Math.sin(game.elapsed*3)*.08;
    if(p.phase==='recover')y=-1.52+Math.max(0,1-p.phaseTime/.7)*.40;
    if(p.dead)y=-.78;
    p.y=y;
  } else {
    const h=game.world.sampleHeight(p.x,p.z);
    p.y=p.type==='snake'?Math.max(-.10,h):Math.max(-.20,h);
  }
}

/** Recoil uses the same enclosure solver as ordinary units. Fish may slide
 * along a wet bank but never cross onto dry ground; steep ledges stop the push. */
export function applyPredatorCombatImpulse(game,p,dt){
  if(!p.combatImpulse)return false;
  if(p.dead||p.phase==='dead'||p.phase==='dormant'){p.combatImpulse=null;return false;}
  const push=applyCombatImpulse(p,dt);if(!push.dx&&!push.dz)return false;
  const origin={x:p.x,z:p.z},floor=game.world.sampleHeight(p.x,p.z);
  const intended={x:clamp(p.x+push.dx,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2),z:clamp(p.z+push.dz,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2)};
  const traversable=to=>{
    const steps=Math.max(1,Math.ceil(distance(origin,to)/.10));
    for(let i=1;i<=steps;i++){
      const x=origin.x+(to.x-origin.x)*i/steps,z=origin.z+(to.z-origin.z)*i/steps,h=game.world.sampleHeight(x,z);
      if(!Number.isFinite(h)||Math.abs(h-floor)>.65||p.type==='fish'&&!wet(game,x,z))return false;
    }
    return true;
  };
  let resolved=origin;
  for(const candidate of [intended,{x:intended.x,z:origin.z},{x:origin.x,z:intended.z}]){
    const point=resolveFortMovement(game.camps||[],p,candidate);
    if(traversable(point)){resolved=point;break;}
  }
  const dx=resolved.x-origin.x,dz=resolved.z-origin.z;
  p.x=resolved.x;p.z=resolved.z;
  // A committed lunge uses absolute endpoints; move its body trajectory by the
  // actual legal displacement so the next frame cannot snap away the recoil.
  if(p.phase==='lunge')for(const key of ['lungeStart','lungeEnd'])if(p[key]){
    p[key].x=clamp(p[key].x+dx,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);p[key].z=clamp(p[key].z+dz,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);
  }
  setHeight(game,p);return !!(dx||dz);
}
function forget(game,p) {
  p.target=null;p.targetId=null;p.chaseTime=0;p.lostTime=0;
  p.cooldown=Math.max(p.cooldown,2.5);p.huntUntil=Math.min(p.huntUntil,game.elapsed+3);
  enter(p,'patrol');
}
function beginWindup(game,p,continuation=false) {
  const f=p.target;if(!canReach(game,p,f)){forget(game,p);return;}
  if(!continuation){p.burstRemaining=Math.max(p.burstCount,p.boss&&p.type==='fish'&&p.enraged?2:1)-1;p.burstIndex=0;}else p.burstIndex++;
  p.windup=Math.max(.8,p.baseWindup*(p.enraged?.78:1));
  enter(p,'windup');
  // A committed landing point is readable and dodgable; it never tracks the cursor/player.
  p.strike={x:clamp(f.x+(f.vx||0)*.12,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2),z:clamp(f.z+(f.vz||0)*.12,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2)};
  if(p.boss&&p.type==='snake'){const yaw=Math.atan2(f.x-p.x,f.z-p.z),side=p.burstIndex%2?1:-1;p.strike.x=clamp(p.strike.x+Math.cos(yaw)*side*.75,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);p.strike.z=clamp(p.strike.z-Math.sin(yaw)*side*.75,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);}
  p.attackType='lunge';p.attackDuration=p.windup+p.lungeTime;p.attackAnim=p.attackDuration;
  const s=surface(game,p.strike.x,p.strike.z),position=new THREE.Vector3(p.strike.x,Math.max(.05,s.height),p.strike.z);
  // The rig's crouch/neck coil and the HUD phase bar telegraph the attack.
  // No coloured ground ring: the landing point is committed but dodgable.
  if(p.type==='fish')game.world.splash(position,p.boss?1.1:.65,'#adcfba');
  sound(game,p,p.type,.9);
  if(friendly(f)&&visibleToPlayer(game,p,42))activateHunt(game,p);
}
function beginLunge(game,p) {
  enter(p,'lunge');p.struck=false;p.lungeStart={x:p.x,z:p.z};
  const dx=p.strike.x-p.x,dz=p.strike.z-p.z,len=Math.hypot(dx,dz)||1;
  p.yaw=Math.atan2(dx,dz);
  const travel=Math.max(0,Math.min(len-mouthOffset[p.type]*(p.boss?1.45:1),p.reach+1.3));
  p.lungeEnd={x:p.x+dx/len*travel,z:p.z+dz/len*travel};
  if(p.type==='heron')sound(game,p,'flap',.7);
}
function beginGrab(game,p,f) {
  p.grabbed=f;f.grabbedBy=p;p.rescueDamage=0;p.grabCooldown=15;
  f.vx=f.vz=f.vy=f.speed=0;f.grounded=false;f.stun=0;
  enter(p,'grab');p.attackType='lunge';p.attackDuration=p.grab;p.attackAnim=p.grab;
  if(friendly(f)) {
    activateHunt(game,p);
    game.ui?.toast?.(f===game.player?'Σε άρπαξε! Πάτα Q / Space / R για να ξεφύγεις!':`${f.name} αρπάχτηκε! Χτύπα τον θηρευτή για να τον σώσεις!`,'warning');
  }
}
function strike(game,p) {
  if(p.struck)return;p.struck=true;
  const pos=new THREE.Vector3(p.strike.x,Math.max(.08,game.world.sampleHeight(p.strike.x,p.strike.z)),p.strike.z);
  if(wet(game,pos.x,pos.z))game.world.splash(pos,(p.type==='fish'?2.2:p.type==='heron'?1.25:.8)*(p.boss?1.65:1));
  game.vfx?.strike?.(p.type,pos,p.yaw,(p.type==='fish'?1.8:1.2)*(p.boss?1.5:1));
  game.world.impact(pos,'#d7d7a6',p.type==='snake'?.8:1.4);sound(game,p,p.type==='fish'?'fish':'slam',.85);
  let grabbed=null;
  for(const f of game.frogs) {
    if(!alive(f)||f.grabbedBy||protectedByGrace(game,p,f))continue;
    if(p.type==='fish'&&!wet(game,f.x,f.z))continue;
    if(distance(f,p.strike)>p.strikeRadius||f.y>pos.y+(p.type==='heron'?2:1.15)*(p.boss?1.4:1))continue;
    const oldHp=f.hp,wasInvulnerable=(f.invulnerable||0)>0;
    const candidate=f===p.target&&!wasInvulnerable&&!f.blocking&&p.grabCooldown<=0&&(f.hp/f.maxHp<.68||neighbors(game,f,5)<=1);
    game.damage(f,p.damage,p,{knockback:p.type==='snake'?2.8:4.8});
    if(candidate&&alive(f)&&f.hp<oldHp)grabbed=f;
  }
  if(grabbed)beginGrab(game,p,grabbed);
}

/** Release the held victim without changing the predator's current mode. */
export function releaseGrab(game,p) {
  const f=p.grabbed;if(!f)return null;
  p.grabbed=null;p.rescueDamage=0;f.grabbedBy=null;
  if(!f.dead) {
    const a=p.yaw+(p.type==='snake'?1.5:1.1),r=(p.type==='heron'?2.6:2.1)*(p.boss?1.5:1);
    f.x=clamp(p.x+Math.sin(a)*r,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);f.z=clamp(p.z+Math.cos(a)*r,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2);
    f.y=Math.max(game.world.sampleHeight(f.x,f.z)+.45,p.type==='heron'?p.y+.9:.35);
    f.vx=Math.sin(a)*3;f.vz=Math.cos(a)*3;f.vy=3.7;f.grounded=false;f.jumpTime=.7;
    f.invulnerable=Math.max(f.invulnerable||0,1.4);f.stun=Math.max(f.stun||0,.18);
  }
  return f;
}
function rescue(game,p) {
  const f=releaseGrab(game,p);enter(p,'recover');p.cooldown=1.25;
  p.rescueResistUntil=game.elapsed+5;p.grabCooldown=Math.max(p.grabCooldown,16);
  game.world.impact(point(p,p.type==='heron'?1.4:.4),'#a9edc9',1.1);
  sound(game,p,'success',.7);
  if(friendly(f)) {game.ui?.toast?.(f===game.player?'Ξέφυγες! Η ομάδα σου έχει παράθυρο αντεπίθεσης.':`${f.name} σώθηκε!`, 'success');game.gainXP?.(12);}
}
function eatVictim(game,p) {
  const f=p.grabbed;if(!f)return;
  p.grabbed=null;f.grabbedBy=null;
  game.damage(f,f.hp+f.maxHp+100,p,{bypass:true,knockback:0});
  p.hp=Math.min(p.maxHp,p.hp+p.maxHp*.07);p.health=p.hp;
  if(friendly(f)&&f!==game.player)game.ui?.toast?.(`${p.name} έφαγε τον ${f.name}. Κράτα την ομάδα κοντά σου.`,'danger');
  sound(game,p,'death',.8);enter(p,'recover');p.cooldown=2.8;p.target=null;p.targetId=null;
}
function startFlee(game,p) {
  releaseGrab(game,p);enter(p,'flee');p.fleeTime=0;p.target=null;p.targetId=null;p.attackAnim=0;
  const threat=p.lastAttacker||game.player||{x:0,z:0},dx=p.x-threat.x,dz=p.z-threat.z,len=Math.hypot(dx,dz)||1;
  p.fleeDestination={x:clamp(p.x+dx/len*9,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2),z:clamp(p.z+dz/len*9,-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2)};
  if(p.engagedPlayer){p.huntUntil=game.elapsed+7;game.ui?.toast?.({icon:'intimidate',portrait:game.portraits?.[p.type],progress:1,tone:'success',detail:`${p.name}: ο εκφοβισμός πέτυχε.`});}
}
function finishRepel(game,p) {
  // A successful intimidation creates breathing room, not a health reset or
  // a fast, endless kite. The wounded animal remains visible and killable.
  const rewarded=p.engagedPlayer&&!p.repelAwarded&&!p.killAwarded;
  forget(game,p);p.grace=game.elapsed+35;p.huntUntil=0;p.hunting=false;p.fearPressure=0;
  if(rewarded){p.repelAwarded=true;game.stats.predatorsRepelled=(game.stats.predatorsRepelled||0)+1;game.gainXP?.(45);sound(game,p,'success',.75);}
  if(game.hunt===p)game.hunt=null;
}
function respawn(game,p) {
  p.dead=false;p.hp=p.maxHp;p.health=p.hp;p.x=p.anchor.x;p.z=p.anchor.z;p.yaw=0;
  p.model.group.visible=true;p.grabbed=null;p.rescueDamage=0;p.target=null;p.targetId=null;
  p.playerDamage=0;p.engagedPlayer=false;p.repelAwarded=false;p.killAwarded=false;p.announced=0;
  p.hunting=false;p.huntUntil=0;p.cooldown=3;p.grabCooldown=3;p.grace=game.elapsed+8;
  p.attackAnim=0;p.hitAnim=0;p.provokedUntil=0;p.lastCombatAt=-100;p.chaseTime=0;p.lostTime=0;p.fearPressure=0;p.enraged=false;p.defeatNotified=false;p.burstRemaining=0;p.windup=p.baseWindup;p.recover=p.baseRecover;
  enter(p,'patrol');setHeight(game,p);
}
function kill(game,p,source) {
  releaseGrab(game,p);p.dead=true;p.hp=0;p.health=0;p.respawnAt=p.campaignTracked||p.realmEvent||game.campaign?.endless?Infinity:game.elapsed+220;
  enter(p,'dead');p.attackAnim=0;p.target=null;p.targetId=null;p.hunting=false;p.huntUntil=0;
  if((friendly(source)||p.playerDamage>0)&&!p.killAwarded) {
    const xp=p.boss?250:100;p.killAwarded=true;game.stats.predatorsKilled=(game.stats.predatorsKilled||0)+1;game.gainXP?.(xp);
    game.ui?.toast?.({icon:p.boss?'crown':'attack',portrait:game.portraits?.[p.id]||game.portraits?.[p.type],value:xp,progress:1,tone:'success',detail:`${p.name} νικήθηκε!`});sound(game,p,'victory',.65);
  }
  if(game.hunt===p)game.hunt=null;
  if(wet(game,p.x,p.z))game.world.splash(point(p,-p.y),p.boss?2.3:1.4);else game.world.impact(point(p,.1),'#c9bc94',p.boss?1.8:1);
  if(!p.defeatNotified){p.defeatNotified=true;game.onPredatorDefeated?.(p);}
}

/** Returns true when a living predator actually took damage. No global stun-lock. */
export function damagePredator(game,p,amount,source=null,options={}) {
  initialize(p);amount=Number(amount);
  if(!Number.isFinite(amount)||amount<=0||p.dead||p.phase==='dormant')return false;
  const damage=Math.min(p.hp,Math.max(1,amount));p.hp=Math.max(0,p.hp-damage);p.health=p.hp;
  p.enraged=!!p.boss&&p.hp<=p.maxHp*.5;
  p.hitAnim=.23;p.lastCombatAt=game.elapsed;p.lastAttacker=source;
  if(friendly(source)) {
    p.playerDamage+=damage;p.provokedUntil=game.elapsed+120;p.grace=0;
    if(visibleToPlayer(game,p,45)||source===game.player)activateHunt(game,p);
  }
  if(options.feedback!==false&&visibleToPlayer(game,p,35)) {
    game.world.impact(point(p,p.type==='heron'?1.5:.45),'#ebd9ab',clamp(damage/30,.5,1.8));sound(game,p,'hit',.75);
  }
  if(p.grabbed)p.rescueDamage+=damage;
  if(p.hp<=0){kill(game,p,source);return true;}
  if(p.grabbed&&p.rescueDamage>=45)rescue(game,p);
  // An ordinary hit never triggers a low-health escape. Pursuing a deliberately
  // repelled predator immediately returns it to combat instead of extending flight.
  if(p.phase==='flee'){p.fearPressure=0;p.target=alive(source)?source:game.player;p.targetId=p.target?.id;enter(p,'stalk');}
  // Damage makes a neutral/strolling predator fight back, but doesn't reset its windup.
  if(alive(source)&&(p.phase==='patrol'||!p.target||(friendly(source)&&!friendly(p.target)))) {
    p.target=source;p.targetId=source.id;p.chaseTime=0;p.lostTime=0;
    if(p.phase!=='recover'&&p.phase!=='flee')enter(p,'stalk');
  }
  return true;
}

/** Deliberate croaks can repel a predator; health loss by itself cannot. */
export function intimidatePredator(game,p,strength=35) {
  initialize(p);
  if(p.dead||p.phase==='dormant'||p.phase==='flee')return false;
  p.fearPressure=clamp(p.fearPressure+clamp(Number(strength)||0,0,50),0,100);
  if(p.grabbed){p.rescueDamage+=Math.max(0,strength)*.4;if(p.rescueDamage>=45)rescue(game,p);}
  if(p.fearPressure>=85){startFlee(game,p);return true;}
  return false;
}

/** Dynamic text used alongside the portrait and health bar at the top of the HUD. */
export function predatorObjective(p) {
  if(!p)return '';
  if(p.grabbed?.team==='player')return 'ΣΕ ΑΡΠΑΞΕ — Πάτα Q / Space / R. Οι σύμμαχοι μπορούν να σε ελευθερώσουν!';
  if(p.grabbed&&friendly(p.grabbed))return `ΔΙΑΣΩΣΗ — Χτύπα τον θηρευτή πριν καταπιεί τον ${p.grabbed.name}!`;
  if(p.phase==='windup')return p.type==='fish'?'ΕΦΟΔΟΣ ΑΠΟ ΚΑΤΩ — Πήδηξε σε βράχο ή άλλαξε κατεύθυνση!':'ΕΤΟΙΜΑΖΕΙ ΕΠΙΘΕΣΗ — Απέφυγε την έφοδο και αντεπιτέσου.';
  if(p.phase==='flee')return 'ΥΠΟΧΩΡΕΙ — Απώθησέ τον ή καταδίωξέ τον για να τον νικήσεις.';
  if(p.phase==='recover')return 'ΠΑΡΑΘΥΡΟ ΑΝΤΕΠΙΘΕΣΗΣ — Συντόνισε τα χτυπήματα της ομάδας.';
  if(p.phase==='raid')return 'ΕΠΙΔΡΟΜΗ ΣΤΟ ΚΑΣΤΡΟ — Φέρε φρουρά και χτύπα τον θηρευτή από τα πλάγια.';
  return {heron:'Χτύπα τα πόδια και απόφυγε το ράμφος. Η ομάδα μπορεί να διακόψει ένα άρπαγμα.',snake:'Άνοιξε την ομάδα και χτύπα από τα πλάγια. Πρόσεχε την έφοδο από τις καλαμιές.',fish:'Χρησιμοποίησε βράχους και ρηχά. Χτύπα όταν βγει στην επιφάνεια.'}[p.type]||'Πολέμησε για να απωθήσεις ή να σκοτώσεις τον θηρευτή.';
}

export function updatePredators(game,dt) {
  dt=clamp(dt,0,.1);
  for(const p of game.predators) {
    initialize(p);p.phaseTime+=dt;p.cooldown=Math.max(0,p.cooldown-dt);p.grabCooldown=Math.max(0,p.grabCooldown-dt);
    p.stun=Math.max(0,(p.stun||0)-dt);
    p.thinkTime-=dt;p.speed=0;p.fearPressure=Math.max(0,p.fearPressure-dt*2);
    if(p.dead||p.phase==='dead') {
      if(p.phaseTime>=4)p.model.group.visible=false;
      if(!p.campaignTracked&&!p.realmEvent&&!game.campaign?.endless&&game.elapsed>=p.respawnAt&&distance(game.player,p.anchor)>34&&!game.allies().some(f=>distance(f,p.anchor)<15))respawn(game,p);
      continue;
    }
    if(p.phase==='dormant') {
      if(!p.campaignTracked&&!p.realmEvent&&!game.campaign?.endless&&game.elapsed>=p.respawnAt&&distance(game.player,p.anchor)>34&&!game.allies().some(f=>distance(f,p.anchor)<15))respawn(game,p);
      continue;
    }
    if(p.phase==='flee') {
      p.fleeTime+=dt;
      walk(game,p,p.fleeDestination.x,p.fleeDestination.z,p.baseSpeed*.72,dt);
      if(p.fleeTime>=6||distance(p,p.fleeDestination)<.6)finishRepel(game,p);
      setHeight(game,p);continue;
    }
    if(p.phase==='grab') {
      const f=p.grabbed;
      if(!alive(f)){releaseGrab(game,p);enter(p,'recover');continue;}
      if(p.rescueDamage>=45){rescue(game,p);continue;}
      if(friendly(f))activateHunt(game,p);
      if(p.model.mouthWorld) {
        p.model.mouthWorld(mouthPosition);f.x=mouthPosition.x;f.z=mouthPosition.z;f.y=mouthPosition.y-.2;
      } else {f.x=p.x+Math.sin(p.yaw)*1.5;f.z=p.z+Math.cos(p.yaw)*1.5;f.y=p.y+(p.type==='heron'?2.4:.8);}
      f.yaw=p.yaw+Math.PI*.4;f.vx=f.vz=f.vy=0;f.speed=0;f.grounded=false;
      if(p.phaseTime>=p.grab)eatVictim(game,p);
      setHeight(game,p);continue;
    }
    if(p.phase==='windup') {
      if(p.phaseTime>=p.windup)beginLunge(game,p);
      setHeight(game,p);continue;
    }
    if(p.phase==='lunge') {
      const t=clamp(p.phaseTime/p.lungeTime,0,1),eased=1-Math.pow(1-t,3);
      const tx=p.lungeStart.x+(p.lungeEnd.x-p.lungeStart.x)*eased,tz=p.lungeStart.z+(p.lungeEnd.z-p.lungeStart.z)*eased;
      if(p.type!=='fish'||wet(game,tx,tz)){p.speed=distance(p,{x:tx,z:tz})/Math.max(.001,dt);p.x=tx;p.z=tz;}
      if(t>=.55)strike(game,p);
      if(p.phase==='lunge'&&t>=1){
        if(p.burstRemaining>0&&canReach(game,p,p.target)&&distance(p,p.target)<p.reach+3){p.burstRemaining--;beginWindup(game,p,true);}
        else{p.burstRemaining=0;p.recover=p.baseRecover*(p.enraged?.72:1);enter(p,'recover');p.cooldown=p.recover;}
      }
      setHeight(game,p);continue;
    }
    if(p.phase==='recover') {
      if(p.phaseTime>=p.recover) {
        const committed=game.elapsed<p.provokedUntil;
        if(alive(p.target)&&(canReach(game,p,p.target)||committed)&&distance(p,p.target)<(committed?52:29))enter(p,'stalk');else forget(game,p);
      }
      setHeight(game,p);continue;
    }
    if(p.phase==='stalk') {
      p.chaseTime+=dt;
      if(!alive(p.target)){forget(game,p);setHeight(game,p);continue;}
      if(!canReach(game,p,p.target))p.lostTime+=dt;else p.lostTime=0;
      const committed=game.elapsed<p.provokedUntil;
      if(p.lostTime>(committed?14:2.4)||distance(p,p.target)>(committed?52:34)||(!committed&&p.chaseTime>36&&distance(p,p.target)>13)){forget(game,p);setHeight(game,p);continue;}
      if(friendly(p.target)&&visibleToPlayer(game,p,42))activateHunt(game,p);
      const d=distance(p,p.target);
      if(d<=p.reach&&p.cooldown<=0&&p.lostTime===0)beginWindup(game,p);
      else {
        let tx=p.target.x,tz=p.target.z;
        if(p.type==='snake'&&d>6){const a=Math.atan2(tx-p.x,tz-p.z)+.48;tx+=Math.cos(a)*1.4;tz-=Math.sin(a)*1.4;}
        walk(game,p,tx,tz,p.baseSpeed*(p.type==='heron'?1.08:1.02)*(p.enraged?1.18:1),dt);
      }
      setHeight(game,p);continue;
    }
    // A raid travels to a real gate, fights available defenders, then damages the
    // actual castle. Empty castles do not make the event inert.
    if(p.eventRole==='raid'&&p.raidCampId) {
      const camp=(game.camps||[]).find(c=>c.id===p.raidCampId&&!c.destroyed&&c.hp>0);
      if(camp) {
        if(p.thinkTime<=0&&game.elapsed>=p.grace){p.thinkTime=.38;if(acquire(game,p)){setHeight(game,p);continue;}}
        p.phase='raid';
        const target=p.type==='heron'||insideFort(camp,p)||!(camp.gateHp>0)?{x:camp.x,z:camp.z}:gatePoint(camp,2.8);
        const range=p.type==='heron'?5:4;
        if(distance(p,target)>range){p.castleWindupAt=0;walk(game,p,target.x,target.z,p.baseSpeed*.7,dt);}
        else if(p.cooldown<=0){
          if(!p.castleWindupAt){p.castleWindupAt=game.elapsed+1.35;p.attackType='lunge';p.attackDuration=1.65;p.attackAnim=1.65;sound(game,p,p.type,.8);}
          else if(game.elapsed>=p.castleWindupAt){game.damageCamp?.(camp,p.damage*(p.boss?1.8:1.35),p);p.castleWindupAt=0;p.cooldown=2.6;}
        }
        if(visibleToPlayer(game,p,42))activateHunt(game,p);
        setHeight(game,p);continue;
      }
      p.raidCampId=null;p.raidDestination=null;enter(p,'patrol');
    }
    // Territorial patrols are deterministic, and both friendly and rival gangs are prey.
    const patrolPhase=game.elapsed*(p.type==='heron'?.07:.11)+(p.type==='snake'?2.1:p.type==='fish'?4.3:0);
    const roaming=p.eventRole==='roam',tx=p.anchor.x+Math.sin(patrolPhase)*(roaming?28:p.type==='fish'?10:6),tz=p.anchor.z+Math.cos(patrolPhase*.83)*(roaming?24:p.type==='fish'?8:5);
    walk(game,p,tx,tz,p.baseSpeed*.36,dt);
    if(p.thinkTime<=0&&game.elapsed>=p.grace){p.thinkTime=.38;acquire(game,p);}
    setHeight(game,p);
  }
  for(const p of game.predators)applyPredatorCombatImpulse(game,p,dt);
  // A single focused HUD threat survives brief retargets, and clears on a real disengage.
  const contenders=game.predators.filter(p=>!p.dead&&p.phase!=='dormant'&&(p.huntUntil>game.elapsed||friendly(p.target)&&distance(p,game.player)<42));
  for(const p of game.predators)p.hunting=contenders.includes(p);
  if(!contenders.includes(game.hunt))game.hunt=contenders.sort((a,b)=>distance(a,game.player)-distance(b,game.player))[0]||null;
  const heldPlayer=contenders.find(p=>p.grabbed===game.player);if(heldPlayer)game.hunt=heldPlayer;
}


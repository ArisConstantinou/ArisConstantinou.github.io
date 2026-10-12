/**
 * Headless integration verification against the production game source.
 *
 * Run from _source: node tests/physics-integration.mjs
 * Optional complete log: node tests/physics-integration.mjs --report=/absolute/scratch/report.json
 * The default run writes no files and exits nonzero if an integration check fails.
 * No browser, screenshots, rendering-budget checks or external network are used.
 */
import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { createWorld, createPropMesh } from '../src/world.js';
import { ballisticVelocity, clamp, distance, lineClear, NavigationGrid, ProfileStore } from '../src/systems.js';
import { impactDamage, propSelfDamage, knockbackXZ } from '../src/impact-rules.js';
import {bodyguardTarget,freePosition,ENEMY_LIMIT,CHANNEL_DURATION,CHANNEL_COOLDOWN,MINION_LIMIT} from '../src/goliath.js';
import {layoutScale} from '../src/castle-layout.js';
import {enemySpawnAllowed} from '../src/spawn-rules.js';
import {fastCollisionTracking,CastleBroadphase} from '../src/physics-config.js';

const main = fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const impactSource = main.slice(main.indexOf('function impact('), main.indexOf('function hurt('));
const hurtSource = main.slice(main.indexOf('function hurt('), main.indexOf('function spawnPickup('));
const enemySource = main.slice(main.indexOf('function updateEnemy('), main.indexOf('function updatePlayer('));
const visibleLineSource = main.slice(main.indexOf('function visibleLine('),main.indexOf('function chooseTarget('));
const interactSource = main.slice(main.indexOf('function interact('),main.indexOf('function impact('));
const endRunSource = main.slice(main.indexOf('function endRun('),main.indexOf('function canGrab('));
const releaseSource = main.slice(main.indexOf('function releaseHeld('),main.indexOf('function throwHeld('));
if(!impactSource || !hurtSource) throw new Error('Could not read actual production impact/hurt functions.');
const visualScene = new THREE.Scene();
const map = createWorld(visualScene);
const nav = new NavigationGrid(map.floors,map.colliders,.85,.48);
const GROUP = { PLAYER:1, ENEMY:2, PROP:4, WORLD:8 };
const stats = {
  mage:{hp:120,speed:5.0,mass:5},guard:{hp:65,speed:2.3,mass:4},
  archer:{hp:48,speed:1.9,mass:3},heavy:{hp:135,speed:1.65,mass:9},boss:{hp:330,speed:1.55,mass:13},
};
const report = {
  executedAt: new Date().toISOString(),
  source: {
    impactAndHurtSHA256:crypto.createHash('sha256').update(impactSource+hurtSource).digest('hex'),
    method:'Production main.js impact() and hurt() executed unchanged through node:vm. Rendering, sound, toast and reward-pickup visual effects were stubbed. Cannon shapes, gravity, broadphase, solver, damping, throw velocity and angular velocity match main.js. Contact materials match main.js: actor/solid and actor/actor friction 0; solid/solid friction .55. No browser, geometry-budget or rendering checks are performed.',
    limitations:'This is headless physics and geometry verification. It does not exercise browser input, actual WebGL rendering, sound output or animated character appearance. Stationary-target cases suppress AI motion deliberately; the separate moving-target case applies a guard-speed approach.',
  },
  failures:[], navigation:[], spawns:{}, seamMovement:[], secretTraversals:[], containment:[], throws:[], physicalPursuit:[],
};

function createSimulation({phase='playing'}={}) {
  const physics = new CANNON.World({gravity:new CANNON.Vec3(0,-20,0),allowSleep:true});
  fastCollisionTracking(physics);
  physics.broadphase = new CastleBroadphase(physics);
  physics.solver.iterations = 8;
  physics.defaultContactMaterial.friction=.55;
  physics.defaultContactMaterial.restitution=.15;
  const actorMaterial = new CANNON.Material('actors');
  const solidMaterial = new CANNON.Material('solids');
  physics.addContactMaterial(new CANNON.ContactMaterial(actorMaterial,solidMaterial,{friction:0,restitution:0}));
  physics.addContactMaterial(new CANNON.ContactMaterial(actorMaterial,actorMaterial,{friction:0,restitution:0}));
  physics.addContactMaterial(new CANNON.ContactMaterial(solidMaterial,solidMaterial,{friction:.55,restitution:.15}));
  const contacts=[];
  const damageNumbers=[];
  const rewards=[];
  const ends=[];
  const noop=()=>{};
  const context={FIRE_ENABLED:false,hearth:{mounted:false,interact:()=>false,throw:()=>true},
    goliath:null,bodyguardTarget,freePosition,enemySpawnAllowed,ENEMY_LIMIT,CHANNEL_DURATION,CHANNEL_COOLDOWN,MINION_LIMIT,rooms:map.rooms,
    reinforcements:[],enteredRooms:new Set(['crypt']),cancelRitual:()=>{},
    phase,held:null,mobile:false,runTime:0,shake:0,kills:0,combo:0,comboUntil:0,player:{gear:{damage:0,armor:0}},
    save:{profile:{upgrades:{}}},
    fx:{burst:noop,number:(position,amount)=>damageNumbers.push({time:context.runTime,amount,position:[position.x,position.y,position.z]})},
    sound:{sound:noop},ui:{toast:noop,setShieldMode:noop},
    spawnPickup:(position,value)=>rewards.push({time:context.runTime,value}),spawnLoot:noop,
    endRun:(won,reason)=>ends.push({won,reason}),
    clamp,distance,lineClear,impactDamage,propSelfDamage,knockbackXZ,nav,relicTaken:true,enemyAttack:()=>{},
  };
  vm.createContext(context);
  const channelSource=main.slice(main.indexOf('function interruptChannel('),main.indexOf('function impact('));
  vm.runInContext(`${channelSource}\n${impactSource}\n${hurtSource}\n${visibleLineSource}\n${enemySource}\nglobalThis.actualImpact=impact;globalThis.actualUpdateEnemy=updateEnemy;`,context);
  const entities=[];
  const staticBodies=[];
  for(const box of [...map.floors,...map.colliders]) {
    const b=new CANNON.Body({mass:0,material:solidMaterial,shape:new CANNON.Box(new CANNON.Vec3(box.w/2,box.h/2,box.d/2)),position:new CANNON.Vec3(box.x,box.y,box.z)});
    b.collisionFilterGroup=GROUP.WORLD;b.collisionFilterMask=-1;
    b.worldTag=box.tag;
    physics.addBody(b);staticBodies.push(b);
  }
  function listen(e) {
    e.body.entity=e;
    e.body.addEventListener('collide',event=>{
      const speed=Math.abs(event.contact.getImpactVelocityAlongNormal());
      const hpBefore=e.hp;
      const other=event.body.entity;
      const otherBefore=other?.hp;
      context.actualImpact(e,event);
      if(speed>4.2 && (e.thrownBy==='player'||other?.thrownBy==='player')) contacts.push({
        time:+context.runTime.toFixed(4),from:e.kind,to:other?.kind||event.body.worldTag||'static',
        normalSpeed:+speed.toFixed(4),selfDamage:+(hpBefore-e.hp).toFixed(4),
        targetDamage:other?+(otherBefore-other.hp).toFixed(4):0,
        fromPosition:e.body.position.toArray().map(n=>+n.toFixed(4)),
      });
    });
    physics.addBody(e.body);entities.push(e);return e;
  }
  function actor(kind,x,z,isPlayer=false) {
    const scale=kind==='boss'?1.3:1;
    const cy=.88*scale,r=.43*scale,s=stats[kind];
    const body=new CANNON.Body({mass:s.mass,material:actorMaterial,position:new CANNON.Vec3(x,cy+.08,z),linearDamping:.3,angularDamping:.7,fixedRotation:true,allowSleep:!isPlayer,sleepSpeedLimit:.1,sleepTimeLimit:1.2});
    body.addShape(new CANNON.Sphere(r),new CANNON.Vec3(0,-.43*scale,0));
    body.addShape(new CANNON.Sphere(r*.92),new CANNON.Vec3(0,.32*scale,0));
    body.collisionFilterGroup=isPlayer?GROUP.PLAYER:GROUP.ENEMY;
    const e={category:'actor',kind,isPlayer,body,cy,radius:r,hp:s.hp,maxHp:s.hp,speed:s.speed,mass:s.mass,
      dead:false,removed:false,stun:0,invulnerable:0,hitFlash:0,thrownUntil:0,thrownBy:null,collisionTimes:new Map(),
      windup:0,guardBreak:0,spawn:{x,z},deathTime:0,path:[],pathTick:0,yaw:0,attackCooldown:1,aggro:false};
    // This harness isolates physical pursuit/throws. Boss channel completion
    // and interruption are exercised in the real browser integration suite.
    if(kind==='boss'){e.channel=0;e.channelCooldown=Infinity;e.minions=new Set();}
    return listen(e);
  }
  function prop(kind,x,z,options={}) {
    const item=createPropMesh(kind), ext=item.halfExtents;
    const mass=options.mass||item.mass||3;
    const body=new CANNON.Body({mass,material:solidMaterial,shape:new CANNON.Box(new CANNON.Vec3(ext.x,ext.y,ext.z)),position:new CANNON.Vec3(x,options.y??ext.y+.08,z),linearDamping:.15,angularDamping:.35,allowSleep:true,sleepTimeLimit:1.2});
    body.quaternion.setFromEuler(0,options.rotation||0,0);body.collisionFilterGroup=GROUP.PROP;
    const e={category:'prop',kind,body,ext,mass,radius:Math.max(ext.x,ext.z),hp:item.health||70,maxHp:item.health||70,
      removed:false,dead:false,thrownUntil:0,thrownBy:null,collisionTimes:new Map(),pendingBreak:false,ephemeral:!!options.ephemeral,spawn:{x,z,y:body.position.y}};
    return listen(e);
  }
  function frame(dt=1/60,beforePhysics=null) {
    context.runTime+=dt;
    for(const e of entities) {
      if(e.removed)continue;
      e.stun=Math.max(0,e.stun-dt);
      if(e.category==='actor'&&e.stun<=0&&e.body.position.y<e.cy+.45&&!e.body.fixedRotation){
        e.body.fixedRotation=true;e.body.updateMassProperties();e.body.quaternion.set(0,0,0,1);e.body.angularVelocity.set(0,0,0);
      }
      if(e.pendingBreak){e.removed=true;physics.removeBody(e.body);}
    }
    if(beforePhysics)beforePhysics();
    physics.step(1/120,dt,6);
  }
  function settle(seconds=.3) {
    const prev=context.phase;context.phase='loading';
    for(let i=0;i<Math.ceil(seconds*120);i++)physics.step(1/120);
    context.phase=prev;
  }
  return {physics,staticBodies,entities,context,contacts,damageNumbers,rewards,ends,actor,prop,frame,settle};
}

// Navigation must route around the pedestal and across all former seam gaps.
for(const [name,a,b] of [
  ['spawn-relic',{x:0,z:18},{x:0,z:-16.5}],
  ['relic-exit',{x:0,z:-16.5},{x:0,z:23}],
  ['boss-exit-around-pedestal',{x:0,z:-20.5},{x:0,z:23}],
  ['crypt-archer-to-courtyard',{x:4,z:-16},{x:0,z:7}],
]) {
  const path=nav.path(a,b);
  report.navigation.push({name,waypoints:path.length,reachable:path.length>0});
  if(!path.length)report.failures.push(`Navigation unreachable: ${name}`);
}

// Build the exact population and check stability after the production settle and 2 s rest.
{
  const sim=createSimulation({phase:'loading'});
  for(const d of map.props)sim.prop(d.kind,d.x,d.z,d);
  const match=main.match(/const spawns=\[([\s\S]*?)\];/);
  const spawns=[...(match?.[1]||'').matchAll(/\['(\w+)',([\d.\-]+),([\d.\-]+)\]/g)].map(m=>[m[1],+m[2],+m[3]]);
  const actors=[sim.actor('mage',0,18,true),...spawns.map(p=>sim.actor(...p)),sim.actor('boss',0,-20.5)];
  sim.settle(35/120);
  const afterInitial=actors.map(e=>({kind:e.kind,spawn:e.spawn,position:e.body.position.toArray()}));
  for(let i=0;i<120;i++)sim.frame();
  const actorResults=actors.map(e=>({kind:e.kind,spawn:e.spawn,position:e.body.position.toArray().map(n=>+n.toFixed(5)),horizontalDrift:+Math.hypot(e.body.position.x-e.spawn.x,e.body.position.z-e.spawn.z).toFixed(5),fallen:e.body.position.y<.6}));
  const props=sim.entities.filter(e=>e.category==='prop').map(e=>({kind:e.kind,x:e.spawn.x,z:e.spawn.z,position:e.body.position.toArray().map(n=>+n.toFixed(4)),horizontalDrift:+Math.hypot(e.body.position.x-e.spawn.x,e.body.position.z-e.spawn.z).toFixed(4),fallen:e.body.position.y<-.1}));
  const deepContacts=[];
  for(const c of sim.physics.contacts) {
    const wi=c.bi.position.vadd(c.ri),wj=c.bj.position.vadd(c.rj);
    const separation=wj.vsub(wi).dot(c.ni);
    if(separation<-.04)deepContacts.push({a:c.bi.entity?.kind||c.bi.worldTag,b:c.bj.entity?.kind||c.bj.worldTag,separation});
  }
  report.spawns={actors:actorResults,props,afterProductionSettle:afterInitial,deepContacts};
  for(const e of actorResults)if(e.fallen||e.horizontalDrift>.2)report.failures.push(`Actor spawn unstable: ${e.kind}(${e.spawn.x},${e.spawn.z})`);
  for(const e of props)if(e.fallen)report.failures.push(`Prop fell through map: ${e.kind}(${e.x},${e.z})`);
  if(deepContacts.length)report.failures.push('Deep persistent penetration after settle.');
}

// Traversal uses the same two-sphere player shape, floor boxes and 120 Hz substeps.
for(const [name,start,end] of [
  ['infiltration',{x:0,z:map.spawn.z},{x:0,z:map.relic.position.z+3}],
  ['escape',{x:0,z:map.relic.position.z+3},{x:0,z:map.exit.position.z}],
  ['courtyard-to-bridge-left-gap',{x:-1.0,z:18.5*layoutScale},{x:-1.0,z:25*layoutScale}],
]) {
  const sim=createSimulation({phase:'loading'});
  const e=sim.actor('mage',start.x,start.z,true);sim.settle(.45);
  const dir=Math.sign(end.z-start.z);
  let frames=0,minY=Infinity,maxY=-Infinity;
  const seamSamples=[];
  for(;frames<900;frames++) {
    if(dir*(e.body.position.z-end.z)>=0)break;
    sim.frame(1/60,()=>{
      const factor=Math.min(1,(1/60)*19);
      e.body.velocity.x+=(0-e.body.velocity.x)*factor;
      e.body.velocity.z+=(dir*5-e.body.velocity.z)*factor;
    });
    minY=Math.min(minY,e.body.position.y);maxY=Math.max(maxY,e.body.position.y);
    if([4,-10,20].some(z=>Math.abs(e.body.position.z-z*layoutScale)<.18))seamSamples.push(e.body.position.toArray().map(n=>+n.toFixed(4)));
  }
  const result={name,passed:frames<900,seconds:+(frames/60).toFixed(3),end:e.body.position.toArray().map(n=>+n.toFixed(4)),minBodyY:+minY.toFixed(5),maxBodyY:+maxY.toFixed(5),seamSamples};
  report.seamMovement.push(result);
  if(!result.passed||minY<.78||maxY>1.05)report.failures.push(`Threshold traversal failed or snagged: ${name}`);
}

// Walk into each alcove with the production player shape and dynamic clutter.
for(const secret of map.secrets){
  const sim=createSimulation({phase:'loading'}),parent=map.rooms.find(r=>r.id===secret.parent);
  const start=nav.point(nav.nearest(parent.x+parent.w/2,parent.z+parent.d/2));
  const e=sim.actor('mage',start.x,start.z,true);
  for(const d of map.props)sim.prop(d.kind,d.x,d.z,d);
  sim.settle(.45);const path=nav.path(start,secret.loot);let frames=0,minY=Infinity;
  for(;frames<1200&&distance(e.body.position,secret.loot)>.45;frames++){
    while(path.length>1&&distance(e.body.position,path[0])<.35)path.shift();
    const to=path[0]||secret.loot,d=distance(e.body.position,to)||1,speed=Math.min(5,d*6);
    sim.frame(1/60,()=>{const k=19/60;e.body.velocity.x+=((to.x-e.body.position.x)/d*speed-e.body.velocity.x)*k;e.body.velocity.z+=((to.z-e.body.position.z)/d*speed-e.body.velocity.z)*k;});
    minY=Math.min(minY,e.body.position.y);
  }
  const passed=frames<1200&&minY>.75;report.secretTraversals.push({id:secret.id,passed,seconds:frames/60,minY,remaining:distance(e.body.position,secret.loot),position:e.body.position.toArray(),waypoints:path,contacts:sim.physics.contacts.filter(c=>c.bi===e.body||c.bj===e.body).map(c=>({other:(c.bi===e.body?c.bj:c.bi).worldTag||(c.bi===e.body?c.bj:c.bi).entity?.kind}))});
  if(!passed)report.failures.push('Physical secret entry failed: '+secret.id);
}

for(const [name,start,velocity,inside] of [
  ['courtyard-east-wall',{x:10.5*layoutScale,z:12*layoutScale},{x:6,z:0},p=>p.x<=12*layoutScale-.4],
  ['bridge-east-parapet',{x:1.2*layoutScale,z:24.5*layoutScale},{x:6,z:0},p=>p.x<=2.7*layoutScale-.4],
  // The centre is now the approved catacomb doorway; test the retained wall.
  ['crypt-north-wall',{x:3.5*layoutScale,z:-21*layoutScale},{x:0,z:-6},p=>p.z>=-23*layoutScale+.4],
]) {
  const sim=createSimulation({phase:'loading'}),e=sim.actor('mage',start.x,start.z,true);sim.settle(.4);
  for(let i=0;i<180;i++)sim.frame(1/60,()=>{e.body.velocity.x=velocity.x;e.body.velocity.z=velocity.z;});
  const passed=inside(e.body.position)&&e.body.position.y>.75;
  report.containment.push({name,passed,position:e.body.position.toArray().map(n=>+n.toFixed(5))});
  if(!passed)report.failures.push(`Wall containment failed: ${name}`);
}

// Execute the actual AI steering against the physical world, especially the
// larger boss whose radius exceeds the navigation grid clearance by 7.9 cm.
for(const [kind,x,z,stopDistance] of [['boss',0,-20.5,3.3],['guard',-5.1,-5.2,1.6]]) {
  const sim=createSimulation({phase:'loading'});
  const e=sim.actor(kind,x,z);
  const target=sim.actor('mage',0,23,true);
  sim.context.player=target;sim.context.entities=sim.entities;
  sim.settle(.4);
  let frames=0,remaining=Infinity;
  const milestones=[];
  for(;frames<3600;frames++) {
    remaining=distance(e.body.position,target.body.position);
    if(remaining<stopDistance)break;
    sim.frame(1/60,()=>sim.context.actualUpdateEnemy(e,1/60));
    if(frames%300===0)milestones.push({seconds:+(frames/60).toFixed(1),position:e.body.position.toArray().map(n=>+n.toFixed(4)),remaining:+remaining.toFixed(3),waypoints:e.path.length});
  }
  const result={kind,start:{x,z},destination:{x:0,z:23},passed:frames<3600,seconds:+(frames/60).toFixed(3),remaining:+remaining.toFixed(3),end:e.body.position.toArray().map(n=>+n.toFixed(4)),milestones};
  report.physicalPursuit.push(result);
  if(!result.passed)report.failures.push(`Physical pursuit stuck: ${kind}`);
}

function throwCase(kind,range,speed,{moving=false,actorProjectile=false,wall=false}={}) {
  const sim=createSimulation();
  const z0=18;
  const guard=wall?null:sim.actor('guard',0,z0-range);
  sim.settle(.4);
  const projectile=actorProjectile?sim.actor('guard',0,z0):sim.prop(kind,wall?9.3:0,z0,{y:2.1});
  projectile.body.position.y=wall?1.4:2.1;
  if(actorProjectile){projectile.body.fixedRotation=false;projectile.body.updateMassProperties();projectile.stun=2.5;}
  const destination=wall?{x:14,y:.9,z:z0}:{x:0,y:.9,z:z0-range};
  const v=ballisticVelocity(projectile.body.position,destination,speed,20);
  projectile.body.velocity.set(v.x,v.y,v.z);
  const dx=wall?1:0,dz=wall?0:-1;
  projectile.body.angularVelocity.set(-dz*4,2,dx*4);
  projectile.thrownBy='player';projectile.thrownUntil=sim.context.runTime+4;projectile.body.wakeUp();
  const launchVelocity=projectile.body.velocity.toArray();
  let touched=false;
  for(let i=0;i<90;i++) {
    sim.frame(1/60,()=>{
      if(moving&&guard&&!guard.dead&&guard.hp===guard.maxHp)guard.body.velocity.z=2.3;
    });
    if(wall?sim.contacts.some(c=>c.to==='wall'&&c.from===projectile.kind):guard.hp<guard.maxHp)touched=true;
    if(i>35&&(projectile.removed||touched))break;
  }
  const damage=guard?guard.maxHp-guard.hp:projectile.maxHp-projectile.hp;
  const result={kind:actorProjectile?'guard-as-projectile':kind,range,speed,movingTarget:moving,wallTarget:wall,hit:touched,damage:+damage.toFixed(3),targetDead:guard?.dead||false,projectileRemoved:projectile.removed,launchVelocity:launchVelocity.map(n=>+n.toFixed(5)),contacts:sim.contacts,damageNumbers:sim.damageNumbers,kills:sim.context.kills};
  report.throws.push(result);
  if(!touched||!wall&&damage<=0)report.failures.push(`Projectile did not damage target: ${result.kind}, range ${range}, speed ${speed}, moving ${moving}, wall ${wall}`);
  return result;
}

for(const kind of ['crate','barrel','urn','stone','door','shield']) {
  throwCase(kind,5.5,19);
  throwCase(kind,10.5,26);
}
throwCase('crate',5.5,19,{moving:true});
throwCase('guard',5.5,19,{actorProjectile:true});
throwCase('guard',4.7,19,{actorProjectile:true,wall:true});
throwCase('crate',4.7,26,{wall:true});


// One focused mission-flow scenario runs the actual production functions.
// ProfileStore persists only into an isolated in-memory storage object here.
{
  const sim=createSimulation();
  const ctx=sim.context;
  const player=sim.actor('mage',0,map.relic.position.z+2.3,true);
  const boss=sim.actor('boss',0,-20.5);
  const storageData=new Map();
  const store=new ProfileStore({
    getItem:key=>storageData.get(key)||null,
    setItem:(key,value)=>storageData.set(key,value),
  });
  let finishCalls=0;
  const finish=store.finish.bind(store);
  store.finish=outcome=>{finishCalls++;return finish(outcome);};
  const resultCalls=[];
  const toasts=[];
  const events=[];
  Object.assign(ctx,{
    player,boss,entities:sim.entities,actor:sim.actor,save:store,
    relicTaken:false,alarmTime:0,nextWave:0,runShards:0,runTime:125,phase:'playing',
    worldMap:{
      floors:map.floors,doorways:map.doorways,zones:map.zones,spawn:map.spawn,
      relic:map.relic,exit:map.exit,
      setRelicTaken:value=>{events.push(['relic',value]);map.setRelicTaken(value);},
      setAlarm:value=>{events.push(['alarm',value]);map.setAlarm(value);},
    },
  });
  ctx.fx.ring=()=>{};
  ctx.ui.toast=(message,type)=>toasts.push({message,type});
  ctx.ui.showResult=(result,profile)=>resultCalls.push({result:structuredClone(result),profile:structuredClone(profile)});
  vm.runInContext(`${releaseSource}\n${endRunSource}\n${interactSource}\nglobalThis.missionInteract=interact;globalThis.missionEndRun=endRun;globalThis.missionHurt=hurt;`,ctx);
  const mission={};

  // The living boss must deny the relic with no reward/alarm/reinforcement mutation.
  ctx.missionInteract();
  mission.livingBossDenied=!ctx.relicTaken&&ctx.runShards===0&&events.length===0&&sim.entities.length===2;
  mission.denialToast=toasts.at(-1)?.message;

  // Defeat the boss using the production damage/death branch, then steal.
  ctx.missionHurt(boss,boss.hp+1,player.body.position);
  mission.bossDeathRegistered=boss.dead&&boss.hp===0&&ctx.kills===1;
  ctx.missionInteract();
  mission.warnedBeforeSpawn=ctx.reinforcements.length===3&&sim.entities.length===2;
  ctx.runTime+=2.6;ctx.updateReinforcements();
  const reinforcements=sim.entities.filter(e=>e!==player&&e!==boss);
  mission.stolen=ctx.relicTaken&&ctx.runShards===5;
  mission.alarmEnabled=events.some(([name,value])=>name==='alarm'&&value===true);
  mission.relicVisualUpdated=events.some(([name,value])=>name==='relic'&&value===true);
  mission.reinforcements=reinforcements.map(e=>({kind:e.kind,x:e.spawn.x,z:e.spawn.z,aggro:e.aggro}));
  mission.reinforcementsSpawned=reinforcements.length===3&&reinforcements.every(e=>e.aggro);
  mission.nextWaveScheduled=ctx.alarmTime===125&&ctx.nextWave===139;

  // A second use near the empty pedestal must not re-award the relic.
  ctx.missionInteract();
  mission.relicRewardOnce=ctx.runShards===5&&sim.entities.length===5;

  // Returning to the portal resolves the run and persists exactly one victory.
  player.body.position.set(map.spawn.x,.86,map.spawn.z);
  const countBefore=sim.entities.length;ctx.reinforcements=[];ctx.spawnReinforcements();ctx.runTime+=2.6;ctx.updateReinforcements();
  mission.safeCourtyardWave=ctx.reinforcements.length===0&&sim.entities.length===countBefore;
  boss.body.position.set(0,boss.cy,15);boss.minions=new Set();ctx.finishChannel(boss);
  mission.safeCourtyardSummon=boss.minions.size===0&&sim.entities.length===countBefore;
  player.body.position.set(map.exit.position.x,.86,map.exit.position.z);
  ctx.runTime=160;
  ctx.missionInteract();
  const firstProfile=JSON.stringify(store.profile);
  mission.won=ctx.phase==='result'&&store.profile.wins===1&&store.profile.runs===1&&finishCalls===1&&resultCalls.length===1;
  mission.firstResult=resultCalls[0];
  ctx.missionEndRun(true,'duplicate completion');
  ctx.missionInteract();
  mission.endRunIdempotent=finishCalls===1&&resultCalls.length===1&&JSON.stringify(store.profile)===firstProfile;
  mission.finishCalls=finishCalls;
  mission.passed=[
    mission.livingBossDenied,mission.bossDeathRegistered,mission.stolen,
    mission.alarmEnabled,mission.relicVisualUpdated,mission.reinforcementsSpawned,
    mission.nextWaveScheduled,mission.relicRewardOnce,mission.won,mission.endRunIdempotent,
    mission.safeCourtyardWave,mission.safeCourtyardSummon,
  ].every(Boolean);
  report.mission=mission;
  if(!mission.passed)report.failures.push('Production mission flow failed; inspect report.mission.');
}

report.summary={
  passed:report.failures.length===0,failures:report.failures.length,
  navigationCases:report.navigation.length,spawnActors:report.spawns.actors.length,
  spawnProps:report.spawns.props.length,seamTraversals:report.seamMovement.length,secretTraversals:report.secretTraversals.length,
  wallContainmentCases:report.containment.length,physicalPursuitCases:report.physicalPursuit.length,
  ballisticCases:report.throws.length,successfulBallisticCases:report.throws.filter(x=>x.hit).length,
  missionFlowPassed:report.mission.passed,
};
const outputArgument=process.argv.find(arg=>arg.startsWith('--report='));
if(outputArgument){
  const outputPath=outputArgument.slice('--report='.length);
  if(!path.isAbsolute(outputPath))throw new Error('--report requires an absolute output path outside the source tree.');
  const repoRoot=fileURLToPath(new URL('..',import.meta.url));
  if(path.resolve(outputPath).toLowerCase().startsWith(repoRoot.toLowerCase()))throw new Error('Keep generated reports outside the source tree.');
  fs.writeFileSync(outputPath,JSON.stringify(report,null,2));
}
console.log(JSON.stringify({
  summary:report.summary,failures:report.failures,
  movement:report.seamMovement.map(({name,passed,seconds,minBodyY,maxBodyY})=>({name,passed,seconds,minBodyY,maxBodyY})),
  pursuit:report.physicalPursuit.map(({kind,passed,seconds,remaining})=>({kind,passed,seconds,remaining})),
  mission:{passed:report.mission.passed,livingBossDenied:report.mission.livingBossDenied,stolen:report.mission.stolen,alarmEnabled:report.mission.alarmEnabled,reinforcements:report.mission.reinforcements.length,won:report.mission.won,endRunIdempotent:report.mission.endRunIdempotent,finishCalls:report.mission.finishCalls},
},null,2));
map.dispose();
if(report.failures.length)process.exitCode=1;

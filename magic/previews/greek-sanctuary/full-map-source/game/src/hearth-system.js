import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import {HearthHeart,HEARTH,HEARTH_STOMP,placeHearth} from './hearth-rules.js';
import {createHearthStreams,updateHearthStreams,hearthStreamsHit} from './hearth-streams.js';
import {hearthSpawnRooms} from './spawn-rules.js';
import {createHearth} from './hearth-character.js';
import {igniteActor,igniteWood,consumeBurnDamage} from './fire.js';
import {poseHearthPilot} from './hearth-pilot.js';
import {STOMP} from './hearth-stomp.js';
import {travelAlignment} from './movement-facing.js';
import {createHearthAimTargets} from './hearth-aim.js';
import {createHearthDamageLabels} from './hearth-damage-labels.js';
import {createHearthFacing} from './hearth-facing.js';
import {DoorStrike,angleDifference} from './door-strike-rules.js';
import {supportHeight,standingClear,supportedRoute,supportSightClear} from './walkable-support.js';

export function createHearthSystem({scene,physics,worldMap,nav,material,spell,getPlayer,getEntities,getHeld,getAimEntity=()=>null,getEnvironmentalTargets=()=>[],releaseHeld,hurt,clear,sound,toast,fx,driveResponse=9}){
 let engine,previousRoom,jetBurstTime=-10;
 const p3=new THREE.Vector3(),q=new THREE.Quaternion();
 const support=(p,referenceY=0)=>{const y=supportHeight(worldMap.floors,p.x,p.z,referenceY);return y===null?null:{...p,y};};
 const footprintClear=(p,r,height=4)=>{
  const at=support(p,p.y??0);if(!at||!standingClear(worldMap.floors,worldMap.colliders,at,r,height))return false;
  return getEntities().every(e=>{
   if(e.removed||Math.hypot(at.x-e.body.position.x,at.z-e.body.position.z)>r+e.radius+.2)return true;
   e.body.updateAABB();return e.body.aabb.upperBound.y<=at.y+.1||e.body.aabb.lowerBound.y>=at.y+height;
  });
 };
 function reset(){
  dispose();const location=placeHearth(Math.random,footprintClear,previousRoom,hearthSpawnRooms(worldMap.zones,worldMap.spawn));previousRoom=location.room.name;
  const visual=createHearth(),heart=new HearthHeart();scene.add(visual.group);
  const floorY=support(location)?.y??0;
  const body=new CANNON.Body({mass:0,material,position:new CANNON.Vec3(location.x,floorY+1.24,location.z),fixedRotation:true,allowSleep:false,linearDamping:.3});
  body.addShape(new CANNON.Sphere(1.22));body.addShape(new CANNON.Sphere(.94),new CANNON.Vec3(0,1.6+visual.rise,0));
  for(const x of [-1.19,1.19])body.addShape(new CANNON.Sphere(.38),new CANNON.Vec3(x,.9+visual.rise,0));
  body.collisionFilterGroup=8;physics.addBody(body);
  engine={location,visual,heart,body,yaw:0,aimYaw:0,facing:createHearthFacing(),strike:new DoorStrike(),doorImpacts:[],jetLength:6,streams:createHearthStreams(visual),aim:createHearthAimTargets(),damageLabel:createHearthDamageLabels(),exitPoint:null,transfer:null,stompImpact:null,stompHit:false};sync(0);return engine;
 }
 function near(){const p=getPlayer();return engine&&Math.abs((p.body.position.y-p.cy)-(engine.body.position.y-1.22))<.6&&Math.hypot(p.body.position.x-engine.body.position.x,p.body.position.z-engine.body.position.z)<3.7&&supportSightClear(p.body.position,engine.visual.point('inlet'),[...worldMap.colliders,...worldMap.floors]);}
 function propPosition(original,r=.68){
  if(Math.hypot(original.x-engine.body.position.x,original.z-engine.body.position.z)>1.85+r)return original;
  const room=worldMap.zones.find(z=>z.name===engine.location.room.name);
  for(let radius=2.6;radius<8;radius+=.55)for(let i=0;i<16;i++){
   const angle=i*Math.PI/8,p={x:original.x+Math.cos(angle)*radius,z:original.z+Math.sin(angle)*radius};
   if(p.x>room.xMin+r&&p.x<room.xMax-r&&p.z>room.zMin+r&&p.z<room.zMax-r&&footprintClear(p,r)&&Math.hypot(p.x-engine.body.position.x,p.z-engine.body.position.z)>1.85+r)return {...original,...p};
  }
  throw new Error('Cannot safely preserve prop beside engine');
 }
 function selectExit(){
  const b=engine.body.position,rotation=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),engine.yaw);
  const candidates=[];for(const r of [2.05,2.5,3])for(const a of [Math.PI,Math.PI*.75,-Math.PI*.75,0,Math.PI/2,-Math.PI/2]){const v=new THREE.Vector3(Math.sin(a)*r,0,Math.cos(a)*r).applyQuaternion(rotation);candidates.push({x:b.x+v.x,z:b.z+v.z});}
  const from=support({x:b.x,z:b.z},b.y-1.22);if(!from)return null;
  for(const candidate of candidates){const p=support(candidate,from.y);if(p&&footprintClear(p,.48,1.8)&&supportedRoute(worldMap.floors,worldMap.colliders,from,p,.48,1.8))return p;}
  return null;
 }
 function freezePlayer(){const p=getPlayer();p.body.collisionFilterMask=0;p.body.type=CANNON.Body.KINEMATIC;p.body.velocity.set(0,0,0);p.body.angularVelocity.set(0,0,0);p.radius=1.22;p.invulnerable=.3;}
 function dismount(){
  const p=getPlayer(),point=engine.exitPoint||selectExit()||engine.boardFrom;
  p.body.type=CANNON.Body.DYNAMIC;p.body.collisionFilterMask=-1;p.radius=.43;p.body.position.set(point.x,(point.y??0)+p.cy+.08,point.z);p.body.velocity.set(0,0,0);p.body.updateMassProperties();p.body.aabbNeedsUpdate=true;p.mesh.scale.setScalar(1);p.lastSafe={x:point.x,y:point.y??0,z:point.z};p.invulnerable=.8;
  engine.body.mass=0;engine.body.type=CANNON.Body.STATIC;engine.body.velocity.set(0,0,0);engine.body.updateMassProperties();engine.body.aabbNeedsUpdate=true;
 }
 function exit(){
  if(engine.heart.state!=='piloted'||engine.strike.active)return false;
  const point=selectExit();if(!point){toast('Η έξοδος εμποδίζεται. Μετακίνησε τη στολή σε ελεύθερο χώρο.','info');return false;}
  engine.exitPoint=point;releaseHeld(false);engine.heart.exit();engine.body.velocity.set(0,0,0);sound.sound('impact');return true;
 }
 function interact(time){
  if(!engine)return false;
  const h=engine.heart,p=getPlayer();
  if(h.occupied){if(h.state==='piloted')exit();return true;}
  if(!near())return false;
  if(getHeld()){toast('Άφησε πρώτα το αντικείμενο.','info');return true;}
  if(h.charge(spell,time)){engine.transfer={from:new THREE.Vector3(p.body.position.x+.6,p.body.position.y-p.cy+1.7,p.body.position.z),time};sound.sound('fireIgnite');toast('Η καρδιά άναψε. Περίμενε να ξυπνήσει η στολή.','success');return true;}
  if(h.state==='sleep'){toast('Απορρόφησε φωτιά από πυρσό με C / ΦΛΟΓΑ και φόρτισε την καρδιά με E / ΧΡΗΣΗ.','info');return true;}
  if(h.state==='ready'){
   const point=selectExit();if(!point){toast('Η πίσω σκάλα χρειάζεται ελεύθερο χώρο.','info');return true;}
   engine.exitPoint=point;engine.boardFrom={x:p.body.position.x,y:p.body.position.y-p.cy,z:p.body.position.z};h.board();freezePlayer();sound.sound('impact');return true;
  }
  return true;
 }
 function drive(dt,input){
  if(!engine?.heart.occupied)return false;
  const h=engine.heart,b=engine.body,p=getPlayer();
  if(engine.strike.active){engine.yaw+=THREE.MathUtils.clamp(angleDifference(engine.yaw,engine.strike.target.yaw),-dt*4,dt*4);engine.aimYaw=engine.yaw;b.velocity.set(0,0,0);}
  else engine.yaw=engine.facing.update(dt,{yaw:engine.yaw,aimYaw:engine.aimYaw,moveX:input.moveX,moveZ:input.moveZ,firing:!!input.firing,enabled:h.state==='piloted'&&h.stompTime===0&&h.throwTime===0}).yaw;
  if(h.state==='piloted'&&h.stompTime===0&&!engine.strike.active){
   engine.body.mass=70;engine.body.type=CANNON.Body.DYNAMIC;engine.body.updateMassProperties();
   const n=Math.max(1,Math.hypot(input.moveX,input.moveZ)),blend=Math.min(1,dt*driveResponse),speed=HEARTH.speed*travelAlignment(engine.yaw,input.moveX,input.moveZ);
   b.velocity.x+=(input.moveX/n*speed-b.velocity.x)*blend;b.velocity.z+=(input.moveZ/n*speed-b.velocity.z)*blend;
  }else{b.velocity.x=b.velocity.z=0;if(!engine.strike.active)p.invulnerable=.3;}
  // The waist remains independently aimed. Large sustained differences turn
  // the base via the existing planted-foot gait, even without travel input.
  p.body.position.set(b.position.x,b.position.y-1.22+p.cy+.06,b.position.z);p.body.velocity.set(0,0,0);p.body.aabbNeedsUpdate=true;
  return true;
 }
 function update(dt,input,time){
  if(!engine)return;
  const strike=engine.strike;
  if(strike.active){
   const settled=Math.abs(angleDifference(engine.yaw,strike.target.yaw))<.035&&engine.visual.locomotion.gait.feet.every(f=>f.stance);
   const event=strike.update(dt,strike.time>0||settled);
   if(event==='impact'){
    sync(0);const pose=engine.visual.strikeRig.snapshot(),opened=pose.error<.08&&!!engine.openStruckDoor?.(strike.target.gate,engine.body.position);
    engine.doorImpacts.push({kind:strike.kind,time:strike.time,opened,error:pose.error,contact:pose.contact,actual:pose.actual});
    if(opened){sound.sound('impact');fx.burst(new THREE.Vector3(...pose.contact),0xc9b99a,30,2.8);}
   }else if(event==='complete'){engine.body.type=engine.strikeBodyType;engine.body.updateMassProperties();engine.facing.reset(engine.yaw);}
  }
  const h=engine.heart,event=h.update(dt,{moving:Math.hypot(engine.body.velocity.x,engine.body.velocity.z)>.1,fire:input.firing&&!getHeld()&&!strike.active});
  if(!h.firing&&!strike.active){
   const pointerTurn=Math.atan2(Math.sin(getPlayer().yaw-engine.aimYaw),Math.cos(getPlayer().yaw-engine.aimYaw));
   engine.aimYaw=h.state==='piloted'&&Math.hypot(input.moveX,input.moveZ)>.1?Math.atan2(input.moveX,input.moveZ):h.state==='piloted'?engine.aimYaw+THREE.MathUtils.clamp(pointerTurn,-dt*2.8,dt*2.8):getPlayer().yaw;
  }
  if(event==='boardComplete'){freezePlayer();toast('WASD / μοχλός: βάδισμα · κράτημα αριστερού κλικ: δύο φλογοβόλα · δεξί κλικ: πάτημα · E: έξοδος','info');}
  if(event==='stompImpact'){
   sync(0);const foot=engine.visual.point('foot_R'),origin={x:foot.x,y:engine.visual.group.position.y+.025,z:foot.z};
   fx.stomp(origin);sound.sound('stomp');
   for(const e of getEntities()){
    if(e.removed||e.dead||e.isPlayer||e.ally||e===getHeld()||e.reserved||!['actor','prop'].includes(e.category))continue;
    const p=e.body.position,dx=p.x-origin.x,dz=p.z-origin.z,d=Math.hypot(dx,dz);
    if(d>STOMP.radius||Math.abs(p.y-origin.y)>3||!clear(origin,p))continue;
    if(e.category==='actor'){hurt(e,STOMP.damage,origin);e.stun=Math.max(e.stun,.9);e.guardBreak=1.8;e.windup=0;}
    const strength=7*(1-d/STOMP.radius)+2;e.body.velocity.x+=dx/(d||1)*strength;e.body.velocity.z+=dz/(d||1)*strength;e.body.velocity.y+=2;e.body.wakeUp();
   }
  }
  if(event==='empty'){
   engine.stompImpact=null;
   engine.exitPoint=selectExit()||engine.exitPoint;releaseHeld(false);engine.body.velocity.set(0,0,0);toast('Η καρδιά άδειασε. Βγαίνεις και η στολή κοιμάται.','info');
  }
  if(event==='exitComplete')dismount();
  if(engine.transfer&&time-engine.transfer.time>.65)engine.transfer=null;
  for(const e of getEntities())if(!e.removed&&!e.dead&&e.category==='actor'&&!e.isPlayer&&!e.ally){const damage=consumeBurnDamage(e,time);if(damage)hurt(e,damage,null,{preserveAttack:true,damageLabel:engine.damageLabel(e,damage,time)});}
  // Establish the current animated sockets/waist, choose visible physical
  // targets, then advance arm aim once before both visual and damage rays.
  if(h.firing){
   sync(0);
   engine.aim.update([...getEntities(),...getEnvironmentalTargets()],engine.streams,{active:true,yaw:getPlayer().yaw,center:engine.body.position,held:getHeld(),preferred:getAimEntity(),clear});
   const turn=Math.atan2(Math.sin(engine.aim.desiredYaw-engine.aimYaw),Math.cos(engine.aim.desiredYaw-engine.aimYaw));
   const waistTurn=THREE.MathUtils.clamp(turn,-dt*6,dt*6);engine.aimYaw+=waistTurn;
   // Retarget only the actual waist/arms. The planted legs, animation mixer
   // and pilot have already been evaluated by the preceding sync.
   engine.visual.aimAtTargets(dt,engine.aim.targets,true,Math.abs(waistTurn)>1e-8?engine.aimYaw:undefined);
   updateHearthStreams(engine.streams,engine.visual,clear,true);engine.jetLength=engine.streams[0].length;
  }else engine.aim.update([],engine.streams,{active:false});
  if(h.firing){
   // Match the rendered outlet, including its physical animation and wall clipping.
   for(const e of getEntities())if(!e.isPlayer&&!e.removed&&hearthStreamsHit(engine.streams,e.body.position,clear)){
    if(e.category==='actor'&&!e.dead&&!e.ally){const damage=HEARTH.damageRate*dt;hurt(e,damage,null,{preserveAttack:true,damageLabel:engine.damageLabel(e,damage,time)});if(e.burnUntil<=time||!e.burnUntil)igniteActor(e,time);}
    else if(e.flammable)igniteWood(e,time);
   }
   if(time-jetBurstTime>.4){jetBurstTime=time;for(const stream of engine.streams)fx.burst(stream.origin,0xffa239,2,1.1);}
  }
 }
 function sync(dt,aimDt=engine?.heart.firing?0:dt){
  if(!engine)return;const {body,heart:h,visual}=engine;
  visual.group.position.set(body.position.x,body.position.y-1.22,body.position.z);visual.group.rotation.y=engine.yaw;
  const doorStrike=engine.strike.active&&engine.strike.time>0?engine.strike:null;
  const clip=doorStrike?(doorStrike.kind==='punch'?'Fire':'Idle'):h.state==='piloted'&&h.clip==='Idle'&&Math.hypot(body.velocity.x,body.velocity.z)>.15?'Walk':h.clip;
  const time=['waking','boarding','exiting','depleting'].includes(h.state)?h.time:h.stompTime>0?HEARTH_STOMP.duration-h.stompTime:h.throwTime>0?.85-h.throwTime:undefined;
  visual.update(dt,{clip,time,fuel:h.fuel,aimYaw:engine.aimYaw,aimDt,aimTargets:engine.aim.targets,firing:h.firing,doorStrike});
  updateHearthStreams(engine.streams,visual,clear,h.firing);engine.jetLength=engine.streams[0].length;
  if(h.occupied){
   const p=getPlayer(),anchor=visual.point('pilot');p.mesh.scale.setScalar(.72);
   let position=anchor;
   if(['boarding','exiting'].includes(h.state)){
    const t=THREE.MathUtils.clamp(h.time/2.4,0,1),v=h.state==='boarding'?t:1-t;
    const base=h.state==='boarding'?engine.boardFrom:engine.exitPoint;
    const start=new THREE.Vector3(base.x,(base.y??0)+.02,base.z),back=new THREE.Vector3(0,.05,-1.43).applyAxisAngle(new THREE.Vector3(0,1,0),engine.yaw).add(visual.group.position);
    const top=new THREE.Vector3(0,2.32+visual.rise,-.88).applyAxisAngle(new THREE.Vector3(0,1,0),engine.yaw).add(visual.group.position);
    position=v<.2?start.lerp(back,v/.2):v<.85?back.lerp(top,(v-.2)/.65):top.lerp(anchor,(v-.85)/.15);
   }
   p.mesh.position.copy(position);p.mesh.rotation.set(0,h.state==='piloted'?engine.aimYaw:engine.yaw,0);const transition=['boarding','exiting'].includes(h.state),t=THREE.MathUtils.clamp(h.time/2.4,0,1),v=h.state==='boarding'?t:1-t,climbing=transition&&v>=.2&&v<=.85;p.visual.update(dt,{moving:transition&&!climbing,speed:1,casting:h.state==='piloted',grounded:transition&&!climbing});if(!transition||climbing)poseHearthPilot(p.visual,visual,{climbing,progress:(v-.2)/.65});if(p.shadow)p.shadow.visible=false;
  }else if(getPlayer()?.shadow)getPlayer().shadow.visible=true;
 }
 function snapshot(){return engine?{state:engine.heart.state,fuel:engine.heart.fuel,endless:engine.heart.endless,stompCooldown:engine.heart.stompCooldown,room:engine.location.room.name,roomLabel:engine.location.room.label||engine.location.room.name,x:engine.body.position.x,z:engine.body.position.z,yaw:engine.yaw,aimYaw:engine.aimYaw,stompTime:engine.heart.stompTime,clip:engine.visual.group.userData.animationState,firing:engine.heart.firing,occupied:engine.heart.occupied}:null;}
 function strikeDoor(target,open){if(!engine||engine.heart.state!=='piloted'||engine.heart.stompTime||engine.heart.throwTime||getHeld()||!engine.strike.start(target))return false;engine.openStruckDoor=open;engine.strikeBodyType=engine.body.type;engine.body.type=CANNON.Body.KINEMATIC;engine.body.velocity.set(0,0,0);engine.body.updateMassProperties();engine.heart.firing=false;return true;}
 function stomp(){if(engine?.strike.active||!engine?.heart.stomp())return false;engine.body.velocity.x=engine.body.velocity.z=0;return true;}
 function dispose(){if(!engine)return;if(engine.heart.occupied)dismount();physics.removeBody(engine.body);engine.visual.dispose();engine=null;}
 return {reset,propPosition,interact,drive,update,sync,near,dispose,snapshot,exit,stomp,strikeDoor,get engine(){return engine;},get mounted(){return engine?.heart.state==='piloted';},get occupied(){return !!engine?.heart.occupied;},get blocked(){return engine?.heart.occupied&&!this.mounted;},throw:()=>!engine?.heart.occupied||!engine.strike.active&&engine.heart.throw()};
}

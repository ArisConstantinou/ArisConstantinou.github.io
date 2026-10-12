import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import {HearthHeart,HEARTH,placeHearth,flameHits} from './hearth-rules.js';
import {createHearth} from './hearth-character.js';
import {igniteActor,igniteWood,consumeBurnDamage} from './fire.js';
import {poseHearthPilot} from './hearth-pilot.js';

export function createHearthSystem({scene,physics,worldMap,nav,material,spell,getPlayer,getEntities,getHeld,releaseHeld,hurt,clear,sound,toast,fx}){
 let engine,previousRoom,fireSoundTime=-10;
 const p3=new THREE.Vector3(),q=new THREE.Quaternion();
 const footprintClear=(p,r)=>nav.isFree(p.x,p.z)&&worldMap.colliders.every(o=>Math.abs(p.x-o.x)>o.w/2+r+.1||Math.abs(p.z-o.z)>o.d/2+r+.1)&&getEntities().every(e=>e.removed||Math.hypot(p.x-e.body.position.x,p.z-e.body.position.z)>r+e.radius+.2);
 function reset(){
  dispose();const location=placeHearth(Math.random,footprintClear,previousRoom,worldMap.zones.filter(r=>r.name!=='bridge'));previousRoom=location.room.name;
  const visual=createHearth(),heart=new HearthHeart();scene.add(visual.group);
  const body=new CANNON.Body({mass:0,material,position:new CANNON.Vec3(location.x,1.24,location.z),fixedRotation:true,allowSleep:false,linearDamping:.3});
  body.addShape(new CANNON.Sphere(1.22));body.addShape(new CANNON.Sphere(.94),new CANNON.Vec3(0,1.6,0));
  for(const x of [-1.19,1.19])body.addShape(new CANNON.Sphere(.38),new CANNON.Vec3(x,.9,0));
  body.collisionFilterGroup=8;physics.addBody(body);
  engine={location,visual,heart,body,yaw:0,jetLength:6,exitPoint:null,transfer:null};sync(0);return engine;
 }
 function near(){const p=getPlayer();return engine&&Math.hypot(p.body.position.x-engine.body.position.x,p.body.position.z-engine.body.position.z)<3.7&&clear(p.body.position,engine.visual.point('inlet'));}
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
  return candidates.find(p=>footprintClear(p,.48)&&clear(b,p))||null;
 }
 function freezePlayer(){const p=getPlayer();p.body.collisionFilterMask=0;p.body.type=CANNON.Body.KINEMATIC;p.body.velocity.set(0,0,0);p.body.angularVelocity.set(0,0,0);p.radius=1.22;p.invulnerable=.3;}
 function dismount(){
  const p=getPlayer(),point=engine.exitPoint||selectExit()||engine.boardFrom;
  p.body.type=CANNON.Body.DYNAMIC;p.body.collisionFilterMask=-1;p.radius=.43;p.body.position.set(point.x,p.cy+.08,point.z);p.body.velocity.set(0,0,0);p.body.updateMassProperties();p.body.aabbNeedsUpdate=true;p.mesh.scale.setScalar(1);p.lastSafe={x:point.x,z:point.z};p.invulnerable=.8;
  engine.body.mass=0;engine.body.type=CANNON.Body.STATIC;engine.body.velocity.set(0,0,0);engine.body.updateMassProperties();engine.body.aabbNeedsUpdate=true;
 }
 function exit(){
  if(engine.heart.state!=='piloted')return false;
  const point=selectExit();if(!point){toast('Η έξοδος εμποδίζεται. Μετακίνησε τη στολή σε ελεύθερο χώρο.','info');return false;}
  engine.exitPoint=point;releaseHeld(false);engine.heart.exit();engine.body.velocity.set(0,0,0);sound.sound('impact');return true;
 }
 function interact(time){
  if(!engine)return false;
  const h=engine.heart,p=getPlayer();
  if(h.occupied){if(h.state==='piloted')exit();return true;}
  if(!near())return false;
  if(getHeld()){toast('Άφησε πρώτα το αντικείμενο.','info');return true;}
  if(h.charge(spell,time)){engine.transfer={from:new THREE.Vector3(p.body.position.x+.6,1.7,p.body.position.z),time};sound.sound('fireIgnite');toast('Η καρδιά άναψε. Περίμενε να ξυπνήσει η στολή.','success');return true;}
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
  if(h.state==='piloted'){
   engine.body.mass=70;engine.body.type=CANNON.Body.DYNAMIC;engine.body.updateMassProperties();
   const n=Math.max(1,Math.hypot(input.moveX,input.moveZ)),blend=Math.min(1,dt*9);
   b.velocity.x+=(input.moveX/n*HEARTH.speed-b.velocity.x)*blend;b.velocity.z+=(input.moveZ/n*HEARTH.speed-b.velocity.z)*blend;
   const target=p.yaw,delta=Math.atan2(Math.sin(target-engine.yaw),Math.cos(target-engine.yaw));engine.yaw+=delta*Math.min(1,dt*8);
  }else{b.velocity.x=b.velocity.z=0;p.invulnerable=.3;}
  p.body.position.set(b.position.x,p.cy+.08,b.position.z);p.body.velocity.set(0,0,0);p.body.aabbNeedsUpdate=true;
  return true;
 }
 function update(dt,input,time){
  if(!engine)return;
  const h=engine.heart,event=h.update(dt,{moving:Math.hypot(input.moveX,input.moveZ)>.1,fire:input.firing&&!getHeld()});
  if(event==='boardComplete'){freezePlayer();toast('WASD / μοχλός: βάδισμα · V / ΠΥΡ: φλογοβόλο · E: έξοδος','info');}
  if(event==='empty'){
   engine.exitPoint=selectExit()||engine.exitPoint;releaseHeld(false);engine.body.velocity.set(0,0,0);toast('Η καρδιά άδειασε. Βγαίνεις και η στολή κοιμάται.','info');
  }
  if(event==='exitComplete')dismount();
  if(engine.transfer&&time-engine.transfer.time>.65)engine.transfer=null;
  for(const e of getEntities())if(!e.removed&&!e.dead&&e.category==='actor'&&!e.isPlayer&&!e.ally){const damage=consumeBurnDamage(e,time);if(damage)hurt(e,damage,null,{preserveAttack:true});}
  if(h.firing){
   // Match the rendered outlet, including its physical animation and wall clipping.
   sync(0);const origin=engine.visual.point('nozzle',.28),direction=new THREE.Vector3(0,1,0).transformDirection(engine.visual.bones.nozzle.matrixWorld);direction.multiplyScalar(1/Math.max(.01,Math.hypot(direction.x,direction.z)));
   let range=HEARTH.range;for(let d=.3;d<range;d+=.2){const end={x:origin.x+direction.x*d,y:origin.y+direction.y*d,z:origin.z+direction.z*d};if(end.y<.1||!clear(origin,end)){range=d;break;}}engine.jetLength=range;
   for(const e of getEntities())if(!e.isPlayer&&!e.removed&&flameHits(origin,direction,e.body.position,range,clear)){
    if(e.category==='actor'&&!e.dead&&!e.ally){hurt(e,HEARTH.damageRate*dt,null,{preserveAttack:true});if(e.burnUntil<=time||!e.burnUntil)igniteActor(e,time);}
    else if(e.flammable)igniteWood(e,time);
   }
   if(time-fireSoundTime>.4){sound.sound('fireIgnite');fireSoundTime=time;fx.burst(origin,0xffa239,2,1.1);}
  }
 }
 function sync(dt){
  if(!engine)return;const {body,heart:h,visual}=engine;
  visual.group.position.set(body.position.x,body.position.y-1.22,body.position.z);visual.group.rotation.y=engine.yaw;
  const clip=h.state==='piloted'&&h.clip==='Idle'&&Math.hypot(body.velocity.x,body.velocity.z)>.15?'Walk':h.clip;
  const time=['waking','boarding','exiting','depleting'].includes(h.state)?h.time:h.throwTime>0?.85-h.throwTime:undefined;
  visual.update(dt,{clip,time,fuel:h.fuel});
  if(h.occupied){
   const p=getPlayer(),anchor=visual.point('pilot');p.mesh.scale.setScalar(.72);
   let position=anchor;
   if(['boarding','exiting'].includes(h.state)){
    const t=THREE.MathUtils.clamp(h.time/2.4,0,1),v=h.state==='boarding'?t:1-t;
    const base=h.state==='boarding'?engine.boardFrom:engine.exitPoint;
    const start=new THREE.Vector3(base.x,base.y||.02,base.z),back=new THREE.Vector3(0,.05,-1.43).applyAxisAngle(new THREE.Vector3(0,1,0),engine.yaw).add(visual.group.position);
    const top=new THREE.Vector3(0,2.32,-.88).applyAxisAngle(new THREE.Vector3(0,1,0),engine.yaw).add(visual.group.position);
    position=v<.2?start.lerp(back,v/.2):v<.85?back.lerp(top,(v-.2)/.65):top.lerp(anchor,(v-.85)/.15);
   }
   p.mesh.position.copy(position);p.mesh.rotation.set(0,engine.yaw,0);const transition=['boarding','exiting'].includes(h.state),t=THREE.MathUtils.clamp(h.time/2.4,0,1),v=h.state==='boarding'?t:1-t,climbing=transition&&v>=.2&&v<=.85;p.visual.update(dt,{moving:transition&&!climbing,speed:1,casting:h.state==='piloted'});if(!transition||climbing)poseHearthPilot(p.visual,visual,{climbing,progress:(v-.2)/.65});if(p.shadow)p.shadow.visible=false;
  }else if(getPlayer()?.shadow)getPlayer().shadow.visible=true;
 }
 function snapshot(){return engine?{state:engine.heart.state,fuel:engine.heart.fuel,room:engine.location.room.name,roomLabel:engine.location.room.label||engine.location.room.name,x:engine.body.position.x,z:engine.body.position.z,clip:engine.visual.group.userData.animationState,firing:engine.heart.firing,occupied:engine.heart.occupied}:null;}
 function dispose(){if(!engine)return;if(engine.heart.occupied)dismount();physics.removeBody(engine.body);engine.visual.dispose();engine=null;}
 return {reset,propPosition,interact,drive,update,sync,near,dispose,snapshot,exit,get engine(){return engine;},get mounted(){return engine?.heart.state==='piloted';},get occupied(){return !!engine?.heart.occupied;},get blocked(){return engine?.heart.occupied&&!this.mounted;},throw:()=>!engine?.heart.occupied||engine.heart.throw()};
}

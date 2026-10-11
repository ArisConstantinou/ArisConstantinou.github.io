import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createWorld, createPropMesh } from './world.js';
import { loadCharacters, createCharacter } from './characters.js';
import { createUI } from './ui.js';
import { createEffects } from './effects.js';
import { MagicAudio } from './audio.js';
import { clamp, distance, lineClear, pointSegmentDistance, NavigationGrid, ProfileStore } from './systems.js';
import { PointerMotion, gestureThrowVelocity, clampDragPoint, constrainDragPoint } from './drag.js';
import './style.css';

const mobile = matchMedia('(pointer: coarse)').matches;
const GROUP = {PLAYER:1, ENEMY:2, PROP:4, WORLD:8};
let storage; try { storage = window.localStorage; } catch {}
const save = new ProfileStore(storage), sound = new MagicAudio(save.profile.muted);
let phase='loading', ready=false, quality=mobile?'low':'high', worldMap, physics, nav, player, held=null, target=null;
let entities=[], arrows=[], pickups=[], kills=0, runShards=0, runTime=0, relicTaken=false, alarmTime=0, nextWave=0;
let combo=0, comboUntil=0, lastTime=performance.now(), worldTime=0, shake=0, castTime=0, boss=null, lastHint='';
let renderer, composer, camera, scene, fx, moon, bloom, targetRing, playerRing, playerLight, heldLight, trajectory;
let actorMaterial, solidMaterial;
let drag=null;
let aimPoint=new THREE.Vector3(0,.8,5), aimDirection=new THREE.Vector3(0,0,-1), cameraTarget=new THREE.Vector3(0,0,9);
const raycaster=new THREE.Raycaster(), groundPlane=new THREE.Plane(new THREE.Vector3(0,1,0),-.8);
const dragPlane=new THREE.Plane(new THREE.Vector3(0,1,0),-2.1);
const tempV=new THREE.Vector3(), tempQ=new THREE.Quaternion();
const ui=createUI({
  onStart:()=>{if(ready)startRun();},
  onRestart:()=>{if(ready)startRun();},
  onPause:()=>togglePause(),
  onResume:()=>{if(phase==='paused'){phase='playing';ui.showPause(false);sound.start();}},
  onUpgrades:()=>ui.showUpgrades(save.profile,save.upgrades()),
  onUpgrade:id=>{if(save.buy(id)){sound.sound('pickup');ui.showUpgrades(save.profile,save.upgrades());}else ui.toast('Δεν έχεις αρκετά θραύσματα.','info');},
  onMute:value=>{save.profile.muted=!!value;save.save();sound.setMuted(save.profile.muted);ui.setMuted(save.profile.muted);},
  onQuality:value=>{quality=value==='high'?'high':'low';resize();ui.setQuality(quality);ui.toast(quality==='high'?'Κινηματογραφική εικόνα':'Ομαλή απόδοση');},
  onMenu:()=>{phase='menu';if(ready)populate();ui.showMenu(save.profile);},
  onDragStart:info=>beginDrag(info),
  onDragMove:info=>moveDrag(info),
  onDragEnd:info=>finishDrag(info),
  onDragCancel:()=>cancelDrag(),
});
ui.setMuted(save.profile.muted);
ui.setQuality(quality);

function setupRenderer(){
  const canvas=document.getElementById('game-canvas');
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  scene=new THREE.Scene();scene.background=new THREE.Color(0x101c23);
  scene.fog=new THREE.FogExp2(0x16242c,.018);
  camera=new THREE.OrthographicCamera(-16,16,12,-12,.1,160);
  camera.position.set(0,26,28);camera.lookAt(cameraTarget);
  const hemi=new THREE.HemisphereLight(0xd9e9f0,0x39483a,2.15);scene.add(hemi);
  moon=new THREE.DirectionalLight(0xdceafc,3.5);moon.position.set(-16,32,13);moon.castShadow=true;
  Object.assign(moon.shadow.camera,{left:-22,right:22,top:22,bottom:-22,near:1,far:85});
  moon.shadow.normalBias=.07;moon.shadow.bias=-.00015;moon.shadow.mapSize.set(2048,2048);scene.add(moon,moon.target);
  const rim=new THREE.DirectionalLight(0x55bfc0,.6);rim.position.set(8,7,-18);scene.add(rim);
  const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
  scene.environment=pmrem.fromScene(room,.04).texture;scene.environmentIntensity=.2;room.dispose();pmrem.dispose();
  composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
  bloom=new UnrealBloomPass(new THREE.Vector2(800,600),.34,.58,.93);composer.addPass(bloom);composer.addPass(new OutputPass());
  fx=createEffects(scene);
  targetRing=new THREE.Mesh(new THREE.RingGeometry(.72,.77,48),new THREE.MeshBasicMaterial({color:0x86ffda,transparent:true,opacity:.95,side:THREE.DoubleSide,depthWrite:false}));
  targetRing.rotation.x=-Math.PI/2;targetRing.visible=false;scene.add(targetRing);
  const trajectoryGeometry=new THREE.BufferGeometry();
  trajectoryGeometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(28*3),3));
  trajectory=new THREE.Line(trajectoryGeometry,new THREE.LineBasicMaterial({color:0x91f9d4,transparent:true,opacity:.22,depthWrite:false}));
  trajectory.frustumCulled=false;trajectory.visible=false;scene.add(trajectory);
  playerRing=new THREE.Group();
  for(const [r,width,opacity] of [[.62,.035,.85],[.76,.015,.3]]){
    const ring=new THREE.Mesh(new THREE.RingGeometry(r,r+width,48),new THREE.MeshBasicMaterial({color:0x88ffde,transparent:true,opacity,side:THREE.DoubleSide,depthWrite:false}));
    ring.rotation.x=-Math.PI/2;playerRing.add(ring);
  }scene.add(playerRing);
  playerLight=new THREE.PointLight(0x8bf7d5,2.5,6,2);scene.add(playerLight);
  heldLight=new THREE.PointLight(0x7cffd3,0,5,2);scene.add(heldLight);
  window.addEventListener('resize',resize);resize();
}
function resize(){
  if(!renderer)return;
  const w=window.innerWidth,h=window.innerHeight,aspect=w/h;
  const halfH=aspect<1?10.5/aspect:11.3;
  camera.left=-halfH*aspect;camera.right=halfH*aspect;camera.top=halfH;camera.bottom=-halfH;camera.updateProjectionMatrix();
  const ratio=Math.min(window.devicePixelRatio||1,quality==='high'?1.75:1.15);
  renderer.setPixelRatio(ratio);renderer.setSize(w,h,false);composer.setPixelRatio(ratio);composer.setSize(w,h);
  const shadowSize=quality==='high'?2048:1024;
  if(moon.shadow.mapSize.x!==shadowSize){moon.shadow.mapSize.set(shadowSize,shadowSize);moon.shadow.map?.dispose();moon.shadow.map=null;}
}
function staticBox(box){
  const body=new CANNON.Body({mass:0,material:solidMaterial,shape:new CANNON.Box(new CANNON.Vec3(box.w/2,box.h/2,box.d/2)),position:new CANNON.Vec3(box.x,box.y,box.z)});
  body.collisionFilterGroup=GROUP.WORLD;body.collisionFilterMask=-1;physics.addBody(body);
}
function setupPhysics(){
  physics=new CANNON.World({gravity:new CANNON.Vec3(0,-20,0),allowSleep:true});
  physics.broadphase=new CANNON.SAPBroadphase(physics);physics.solver.iterations=8;
  physics.defaultContactMaterial.friction=.55;physics.defaultContactMaterial.restitution=.15;
  actorMaterial=new CANNON.Material('actor');solidMaterial=new CANNON.Material('solid');
  // Upright characters are driven by velocity; floor friction must not cancel every step.
  physics.addContactMaterial(new CANNON.ContactMaterial(actorMaterial,solidMaterial,{friction:0,restitution:0}));
  physics.addContactMaterial(new CANNON.ContactMaterial(actorMaterial,actorMaterial,{friction:0,restitution:0}));
  physics.addContactMaterial(new CANNON.ContactMaterial(solidMaterial,solidMaterial,{friction:.55,restitution:.15}));
  for(const box of [...worldMap.floors,...worldMap.colliders])staticBox(box);
  nav=new NavigationGrid(worldMap.floors,worldMap.colliders);
}
function createHealthBar(){
  const g=new THREE.Group();
  const bg=new THREE.Mesh(new THREE.PlaneGeometry(1.0,.085),new THREE.MeshBasicMaterial({color:0x14201c,depthTest:false,transparent:true,opacity:.9}));
  const fill=new THREE.Mesh(new THREE.PlaneGeometry(.94,.043),new THREE.MeshBasicMaterial({color:0xeebb8f,depthTest:false}));
  fill.position.z=.002;g.add(bg,fill);g.userData.fill=fill;g.visible=false;scene.add(g);return g;
}
function actor(kind,x,z,isPlayer=false){
  const bossMode=kind==='boss',visual=createCharacter(bossMode?'heavy':kind),scale=bossMode?1.3:1;
  if(bossMode)visual.group.scale.multiplyScalar(scale);
  const stats={mage:{hp:120,speed:5.0,mass:5,label:'Εξόριστος'},
    guard:{hp:65,speed:2.3,mass:4,label:'Φρουρός'},archer:{hp:48,speed:1.9,mass:3,label:'Τοξότης'},
    heavy:{hp:135,speed:1.65,mass:9,label:'Σιδερόφρακτος'},boss:{hp:330,speed:1.55,mass:13,label:'Ο Δεσμοφύλακας'}}[kind];
  const hp=stats.hp+(isPlayer?25*(save.profile.upgrades.vitality||0):0);
  const cy=.88*scale,r=.43*scale;
  const body=new CANNON.Body({mass:stats.mass,material:actorMaterial,position:new CANNON.Vec3(x,cy+.08,z),linearDamping:.3,angularDamping:.7,fixedRotation:true,allowSleep:false});
  body.addShape(new CANNON.Sphere(r),new CANNON.Vec3(0,-.43*scale,0));
  body.addShape(new CANNON.Sphere(r*.92),new CANNON.Vec3(0,.32*scale,0));
  body.collisionFilterGroup=isPlayer?GROUP.PLAYER:GROUP.ENEMY;
  const e={category:'actor',kind,isPlayer,visual,mesh:visual.group,body,cy,radius:r,hp,maxHp:hp,speed:stats.speed,mass:stats.mass,label:stats.label,
    dead:false,removed:false,stun:0,invulnerable:0,hitFlash:0,thrownUntil:0,thrownBy:null,collisionTimes:new Map(),yaw:Math.PI,
    path:[],pathTick:0,aggro:false,attackCooldown:1+Math.random(),windup:0,attackType:'',guardBreak:0,spawn:{x,z},lastSafe:{x,z},deathTime:0};
  if(isPlayer){e.mana=100+20*(save.profile.upgrades.focus||0);e.maxMana=e.mana;e.dashCooldown=0;e.pulseCooldown=0;e.dashTime=0;e.dashDirection=new THREE.Vector3();e.shielding=false;}
  else{
    e.healthBar=createHealthBar();
    e.telegraph=new THREE.Mesh(new THREE.RingGeometry(.8,.88,40),new THREE.MeshBasicMaterial({color:0xfb8f65,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));
    e.telegraph.rotation.x=-Math.PI/2;scene.add(e.telegraph);
  }
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(.5*scale,24),new THREE.MeshBasicMaterial({color:0x031010,transparent:true,opacity:.26,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;scene.add(shadow);e.shadow=shadow;
  body.entity=e;body.addEventListener('collide',event=>impact(e,event));
  physics.addBody(body);scene.add(e.mesh);entities.push(e);return e;
}
function prop(kind,x,z,options={}){
  const item=createPropMesh(kind),mesh=item.mesh;
  const ext=item.halfExtents||new THREE.Vector3(.5,.5,.5);
  const mass=options.mass||item.mass||3;
  const body=new CANNON.Body({mass,material:solidMaterial,shape:new CANNON.Box(new CANNON.Vec3(ext.x,ext.y,ext.z)),
    position:new CANNON.Vec3(x,options.y??ext.y+.08,z),linearDamping:.15,angularDamping:.35,allowSleep:true,sleepTimeLimit:1.2});
  body.quaternion.setFromEuler(0,options.rotation||0,0);
  body.collisionFilterGroup=GROUP.PROP;
  const e={category:'prop',kind,mesh,body,ext,mass,radius:Math.max(ext.x,ext.z),hp:item.health||70,maxHp:item.health||70,label:item.label||'Θραύσμα',
    removed:false,dead:false,thrownUntil:0,thrownBy:null,collisionTimes:new Map(),pendingBreak:false,ephemeral:!!options.ephemeral,expireAt:runTime+18,spawn:{x,z,y:body.position.y}};
  body.entity=e;body.addEventListener('collide',event=>impact(e,event));
  physics.addBody(body);scene.add(mesh);entities.push(e);return e;
}
function removeEntity(e){
  if(e.removed)return;if(e===held)releaseHeld(false);
  e.removed=true;physics.removeBody(e.body);scene.remove(e.mesh);
  if(e.healthBar){scene.remove(e.healthBar);e.healthBar.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});}
  if(e.telegraph){scene.remove(e.telegraph);e.telegraph.geometry.dispose();e.telegraph.material.dispose();}
  if(e.shadow){scene.remove(e.shadow);e.shadow.geometry.dispose();e.shadow.material.dispose();}
  if(e.category==='actor')e.visual.dispose?.();
  else e.mesh.traverse(o=>{o.geometry?.dispose();});
}
function clearDynamic(){
  for(const e of entities)removeEntity(e);entities=[];
  for(const a of arrows){scene.remove(a.mesh);a.mesh.geometry.dispose();a.mesh.material.dispose();}arrows=[];
  for(const p of pickups){scene.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();}pickups=[];
  fx.clear();held=target=null;
}
function populate(){
  clearDynamic();kills=runShards=runTime=combo=0;comboUntil=0;relicTaken=false;nextWave=0;alarmTime=0;shake=0;castTime=0;
  worldMap.setAlarm(false);worldMap.setRelicTaken(false);
  for(const d of worldMap.props)prop(d.kind,d.x,d.z,d);
  player=actor('mage',worldMap.spawn.x,worldMap.spawn.z,true);
  const spawns=[['guard',2,12.5],['guard',-5,9],['archer',7,7],['guard',-7,5.5],
    ['guard',-4,-1],['archer',5,-4],['heavy',0,-5.8],['guard',-5.1,-5.2],
    ['guard',-3.5,-14],['archer',4,-16]];
  for(const [kind,x,z]of spawns)actor(kind,x,z);
  boss=actor('boss',0,-20.5);boss.visual.setTint?.(0xa89bbb);
  aimPoint.set(0,.8,10);aimDirection.set(0,0,-1);targetRing.visible=false;heldLight.intensity=0;
  // Settle dynamic props before input begins. No simulation timers advance here.
  for(let i=0;i<35;i++)physics.step(1/120);
  syncVisuals(0);
}
function startRun(){
  sound.start();populate();phase='playing';ui.start();cameraTarget.set(player.body.position.x,0,player.body.position.z-2);
  ui.toast(mobile?'Άγγιξε ένα αντικείμενο, κράτησε και σύρε. Άφησε το δάχτυλο για ρίψη.':'Κάνε κλικ πάνω σε ένα αντικείμενο, κράτησε και σύρε. Άφησε το κλικ για ρίψη.','info');
  if(!save.available)ui.toast('Η πρόοδος κρατιέται για αυτή τη συνεδρία. Ο browser δεν επιτρέπει αποθήκευση.','info');
}
function togglePause(){
  if(phase==='playing'){phase='paused';ui.showPause(true);}
  else if(phase==='paused'){phase='playing';ui.showPause(false);sound.start();}
}
function endRun(won,reason){
  if(phase!=='playing')return;
  releaseHeld(false);phase='result';sound.sound(won?'win':'death');
  const result=save.finish({won,kills,time:runTime,shards:runShards});
  ui.showResult({...result,isNewBest:result.best,best:save.profile.best,reason},save.profile);
}
function canGrab(e){
  if(!e||e.removed||e.isPlayer)return false;
  if(e.category==='prop'||e.dead)return true;
  if(e.kind==='boss'||e.kind==='heavy')return e.stun>.3||e.guardBreak>.3;
  return true;
}
function visibleLine(a,b,margin=0){
  return lineClear(a,b,nav.obstacles.filter(o=>o.y+o.h/2>1.15),margin);
}
function telekinesisReach(){return 7.8+1.5*(save.profile.upgrades.reach||0);}
function pointerRay(info){
  if(!renderer||!camera||!Number.isFinite(info.clientX)||!Number.isFinite(info.clientY))return false;
  const rect=renderer.domElement.getBoundingClientRect();
  if(rect.width<=0||rect.height<=0)return false;
  camera.updateMatrixWorld();
  raycaster.setFromCamera(new THREE.Vector2((info.clientX-rect.left)/rect.width*2-1,-(info.clientY-rect.top)/rect.height*2+1),camera);
  return true;
}
function pointerAtHeight(info,height){
  if(!pointerRay(info))return null;
  dragPlane.constant=-height;
  return raycaster.ray.intersectPlane(dragPlane,new THREE.Vector3());
}
function pickObject(info){
  if(!pointerRay(info))return null;
  scene.updateMatrixWorld(true);
  let selected=null,nearest=Infinity;
  const candidates=entities.filter(e=>!e.removed&&!e.isPlayer&&e.mesh.visible);
  for(const e of candidates){
    const p=e.body.position,r=Math.hypot(e.radius,e.ext?.y||e.cy*1.3)+.3;
    if(raycaster.ray.distanceSqToPoint(new THREE.Vector3(p.x,p.y,p.z))>r*r)continue;
    // Animated skinned bounds must describe the current pose, including raised arms.
    e.mesh.traverse(o=>{if(o.isSkinnedMesh)o.computeBoundingSphere();});
    for(const hit of raycaster.intersectObject(e.mesh,true)){
      let visible=true;for(let node=hit.object;node;node=node.parent)if(!node.visible){visible=false;break;}
      if(visible&&hit.distance<nearest){nearest=hit.distance;selected=e;}
    }
  }
  if(selected)return selected;
  // A small screen-space allowance makes thin props tappable without auto-selecting
  // an unrelated nearby object. Exact visible mesh hits always take precedence.
  if(info.pointerType!=='touch'&&info.pointerType!=='pen')return null;
  const rect=renderer.domElement.getBoundingClientRect();let closest=Infinity;
  for(const e of candidates){
    const p=new THREE.Vector3(e.body.position.x,e.body.position.y,e.body.position.z).project(camera);
    if(p.z<-1||p.z>1)continue;
    const x=rect.left+(p.x+1)*rect.width/2,y=rect.top+(1-p.y)*rect.height/2;
    const d=Math.hypot(x-info.clientX,y-info.clientY);
    if(d<24&&d<closest){closest=d;selected=e;}
  }
  return selected;
}
function chooseTarget(input){
  target=!held&&input.pointerActive?pickObject({clientX:input.pointerX,clientY:input.pointerY,pointerType:'mouse'}):null;
}
function holdEntity(e){
  if(!e||e.removed||e.isPlayer)return false;
  if(distance(player.body.position,e.body.position)>telekinesisReach()){
    ui.toast('Πλησίασε τον στόχο για να τον αρπάξεις.','info');return false;
  }
  if(!visibleLine(player.body.position,e.body.position,.05)){
    ui.toast('Ένας τοίχος εμποδίζει την αρπαγή.','info');return false;
  }
  if(!canGrab(e)){ui.toast('Χτύπησέ τον με αντικείμενο για να σπάσεις την άμυνά του.','info');return false;}
  if(player.mana<7){ui.toast('Χρειάζεσαι 7 ενέργεια για αρπαγή.','info');return false;}
  player.mana-=7;held=e;target=null;e.body.wakeUp();
  e.body.collisionFilterMask=GROUP.ENEMY|GROUP.PROP|GROUP.WORLD;
  e.body.fixedRotation=false;e.body.updateMassProperties();e.thrownUntil=0;e.thrownBy=null;e.collisionTimes.clear();
  if(e.category==='actor'){e.body.quaternion.setFromEuler(0,e.yaw,0);e.stun=2;e.windup=0;e.visual.reset?.();}
  castTime=.3;sound.sound('grab');fx.ring(e.body.position,0x7fffce,e.radius+1,.28);return true;
}
function gestureTime(info){
  const now=performance.now();
  return Number.isFinite(info.timeStamp)&&Math.abs(info.timeStamp-now)<60000?info.timeStamp:now;
}
function beginDrag(info){
  if(phase!=='playing'||!ready||drag)return false;
  const e=pickObject(info);
  if(!e)return false;
  if(held&&held!==e){ui.toast('Άφησε πρώτα αυτό που κρατάς.','info');return false;}
  const height=Math.max(2.1,(e.ext?.y||e.cy)+.6),point=pointerAtHeight(info,height);
  if(!point||(!held&&!holdEntity(e)))return false;
  const motion=new PointerMotion();motion.add(info.clientX,info.clientY,gestureTime(info));
  drag={pointerId:info.pointerId,clientX:info.clientX,clientY:info.clientY,height,motion,
    offset:{x:e.body.position.x-point.x,z:e.body.position.z-point.z}};
  return true;
}
function moveDrag(info){
  if(phase!=='playing'||!drag||drag.pointerId!==info.pointerId)return;
  drag.clientX=info.clientX;drag.clientY=info.clientY;
  drag.motion.add(info.clientX,info.clientY,gestureTime(info));
}
function currentThrowVelocity(now=performance.now()){
  if(!held)return null;
  const fallback={x:held.body.position.x-player.body.position.x,z:held.body.position.z-player.body.position.z};
  if(Math.hypot(fallback.x,fallback.z)<.25){fallback.x=aimDirection.x;fallback.z=aimDirection.z;}
  let motion={x:0,z:0};
  if(drag){
    const speed=drag.motion.velocity(now),point=pointerAtHeight(drag,drag.height);
    const before=pointerAtHeight({clientX:drag.clientX-speed.x*.1,clientY:drag.clientY-speed.y*.1},drag.height);
    // Convert pointer motion with one camera transform so camera following the
    // walking mage cannot create an accidental throwing gesture.
    if(point&&before)motion={x:(point.x-before.x)*10,z:(point.z-before.z)*10};
  }
  return gestureThrowVelocity(motion,fallback,save.profile.upgrades.grip||0);
}
function finishDrag(info){
  if(phase!=='playing'||!drag||drag.pointerId!==info.pointerId)return;
  moveDrag(info);const velocity=currentThrowVelocity(gestureTime(info));
  if(held&&velocity)throwHeld(velocity);else drag=null;
}
function cancelDrag(){if(drag)releaseHeld(false);}
function conjure(){
  if(held)return;
  if(player.mana<16){ui.toast('Χρειάζεσαι 16 ενέργεια για να καλέσεις πέτρα.','info');return;}
  const p=player.body.position,from={x:p.x,y:1.2,z:p.z};
  const point=constrainDragPoint(from,{x:p.x+aimDirection.x*1.6,y:1.2,z:p.z+aimDirection.z*1.6},worldMap.colliders,.6,.5);
  player.mana-=16;const e=prop('stone',point.x,point.z,{y:point.y,mass:2,ephemeral:true});
  fx.burst(e.body.position,0x8bffda,25,1.6);fx.ring(e.body.position,0x8bffda,1.1,.4);sound.sound('grab');
  ui.toast(mobile?'Άγγιξε την πέτρα και σύρε την.':'Πιάσε την πέτρα με κλικ και σύρε την.','info');
}
function releaseHeld(thrown){
  drag=null;
  if(!held)return;
  const e=held;held=null;
  if(player)player.shielding=false;
  e.body.collisionFilterMask=-1;
  if(e.category==='actor'){e.stun=thrown?2.5:1;e.body.fixedRotation=false;e.body.updateMassProperties();}
  if(!thrown){e.body.velocity.scale(.25,e.body.velocity);e.thrownUntil=0;}
  if(e.ephemeral)e.expireAt=runTime+(thrown?8:18);
  heldLight.intensity=0;fx.connect(null);
}
function throwHeld(v=currentThrowVelocity()){
  if(!held||!v)return;
  const e=held,p=e.body.position;
  const speed=Math.hypot(v.x,v.z)||1;
  releaseHeld(true);e.body.velocity.set(v.x,v.y,v.z);e.body.angularVelocity.set(-v.z/speed*4,2,v.x/speed*4);
  e.thrownUntil=runTime+4;e.thrownBy='player';e.body.wakeUp();
  castTime=.35;sound.sound('throw');shake=Math.max(shake,.12);fx.burst(p,0x9bffda,18,2.7);
}
function updateHeld(dt,input){
  if(!held)return;
  if(held.removed||distance(player.body.position,held.body.position)>telekinesisReach()+3){releaseHeld(false);return;}
  player.shielding=!!input.shielding;
  const e=held,amount=player.shielding?1.1:1.8;
  let desired=new THREE.Vector3(player.body.position.x+aimDirection.x*amount,
    player.shielding?1.35:2.1+Math.sin(worldTime*3)*.1,player.body.position.z+aimDirection.z*amount);
  if(drag&&!player.shielding){
    const point=pointerAtHeight(drag,drag.height);
    if(point)desired={x:point.x+drag.offset.x,y:drag.height,z:point.z+drag.offset.z};
  }
  desired=clampDragPoint(desired,player.body.position,telekinesisReach());
  desired=constrainDragPoint(e.body.position,desired,worldMap.colliders,e.radius+.05,e.ext?.y||e.cy);
  const b=e.body,pos=b.position;
  b.velocity.set(clamp((desired.x-pos.x)*15,-28,28),clamp((desired.y-pos.y)*15+1.3,-20,20),clamp((desired.z-pos.z)*15,-28,28));
  if(player.shielding){b.quaternion.setFromEuler(0,player.yaw,0);b.angularVelocity.set(0,0,0);}
  else b.angularVelocity.set(.18,.75,.12);
  b.wakeUp();e.stun=1;
  player.mana=Math.max(0,player.mana-dt*(3.8+e.mass*.25));
  if(player.mana<=0){releaseHeld(false);ui.toast('Η ενέργεια εξαντλήθηκε — άφησες τον στόχο.','info');return;}
  heldLight.position.copy(pos);heldLight.intensity=3.5;
  const from={x:player.body.position.x+aimDirection.x*.5,y:1.35,z:player.body.position.z+aimDirection.z*.5};
  fx.connect(from,pos,worldTime);
  if(Math.random()<dt*22)fx.burst(pos,0x78ffd0,1,.4);
}
function pulse(){
  if(player.pulseCooldown>0||player.mana<25)return;
  player.mana-=25;player.pulseCooldown=5.2;castTime=.4;
  const radius=4.6+.65*(save.profile.upgrades.pulse||0),p=player.body.position;
  fx.ring(p,0x92ffe0,radius,.5);fx.burst({x:p.x,y:1,z:p.z},0x9cffdf,65,7);
  sound.sound('pulse');shake=.3;
  for(const e of entities){
    if(e.removed||e.isPlayer||e===held)continue;
    const d=distance(p,e.body.position);
    if(d>radius||!visibleLine(p,e.body.position,.03))continue;
    const dx=(e.body.position.x-p.x)/(d||1),dz=(e.body.position.z-p.z)/(d||1);
    e.body.wakeUp();e.body.velocity.x+=dx*9;e.body.velocity.z+=dz*9;e.body.velocity.y+=3;
    e.thrownBy='player';e.thrownUntil=runTime+2;
    if(e.category==='actor'&&!e.dead){hurt(e,18+5*(save.profile.upgrades.pulse||0),p);e.stun=Math.max(e.stun,1.3);e.guardBreak=2.3;e.windup=0;}
  }
}
function dash(input){
  if(player.dashCooldown>0||player.mana<12)return;
  player.mana-=12;player.dashTime=.19;player.invulnerable=.3;player.dashCooldown=2.8-.55*(save.profile.upgrades.dash||0);
  const dx=input.moveX||0,dz=input.moveZ||0,len=Math.hypot(dx,dz);
  player.dashDirection.set(len?dx/len:aimDirection.x,0,len?dz/len:aimDirection.z);
  sound.sound('dash');fx.ring(player.body.position,0x81ffda,1.7,.23);
}
function interact(){
  const p=player.body.position;
  if(!relicTaken&&distance(p,worldMap.relic.position)<3){
    if(boss&&!boss.dead){ui.toast('Νίκησε τον Δεσμοφύλακα για να ελευθερώσεις το Σκήπτρο.','info');return;}
    relicTaken=true;alarmTime=runTime;nextWave=runTime+14;runShards+=5;
    worldMap.setRelicTaken(true);worldMap.setAlarm(true);
    sound.sound('relic');fx.ring(worldMap.relic.position,0xffca82,6,.9);shake=.4;
    ui.toast('ΤΟ ΣΚΗΠΤΡΟ ΕΙΝΑΙ ΔΙΚΟ ΣΟΥ. Γύρισε στην πύλη!','success');
    spawnReinforcements();return;
  }
  if(relicTaken&&distance(p,worldMap.exit.position)<2.8){endRun(true,'Το Μαύρο Σκήπτρο είναι ελεύθερο.');return;}
  ui.toast(relicTaken?'Η πύλη βρίσκεται νότια, από εκεί που μπήκες.':'Βρες το Σκήπτρο στην κρύπτη, βόρεια.','info');
}
function spawnReinforcements(){
  const living=entities.filter(e=>e.category==='actor'&&!e.isPlayer&&!e.dead&&!e.removed).length;
  if(living>13)return;
  for(const [kind,x,z]of [['guard',-8,15],['guard',8,14],['archer',-6,2]]){
    const e=actor(kind,x,z);e.aggro=true;fx.ring(e.body.position,0xe4a37e,1.4,.6);fx.burst(e.body.position,0xe2a47d,20,2);
  }
}

function impact(e,event){
  if(phase!=='playing'||e.removed||e===held)return;
  const other=event.body.entity;
  const speed=Math.abs(event.contact.getImpactVelocityAlongNormal());
  if(speed<4.2||e.thrownBy!=='player'||e.thrownUntil<runTime)return;
  const key=event.body.id;
  if((e.collisionTimes.get(key)||-10)>runTime-.45)return;
  e.collisionTimes.set(key,runTime);
  if(other&&!other.removed&&!other.isPlayer){
    const damage=clamp(speed*(2+Math.sqrt(e.mass))*(1+.12*(save.profile.upgrades.grip||0)),18,115);
    if(other.category==='actor'&&!other.dead){hurt(other,damage,e.body.position);other.stun=Math.max(other.stun,.65);other.guardBreak=2.6;}
    if(other.category==='prop'){
      other.hp-=damage*.55;other.thrownBy='player';other.thrownUntil=runTime+2;
      if(other.hp<=0&&other.kind!=='shield'&&other.kind!=='stone')other.pendingBreak=true;
    }
  }
  if(e.category==='actor'&&!e.dead&&speed>6.5){hurt(e,speed*3,e.body.position);e.guardBreak=2.2;}
  if(e.category==='prop'){
    e.hp-=speed*(e.ephemeral?10:2.4);
    if(e.hp<=0&&(e.kind!=='stone'||e.ephemeral))e.pendingBreak=true;
  }
  if(speed>5.5){fx.burst(e.body.position,0xc0dec0,Math.min(35,Math.round(speed*2)),3.5);sound.sound('impact');shake=Math.max(shake,Math.min(.35,speed*.012));}
}
function hurt(e,amount,origin){
  if(e.removed||e.dead||phase!=='playing')return;
  if(e.isPlayer){
    if(e.invulnerable>0)return;
    if(held&&player.shielding&&origin){
      const facing=(origin.x-e.body.position.x)*aimDirection.x+(origin.z-e.body.position.z)*aimDirection.z;
      if(facing>0)amount*=.2;
    }
    e.invulnerable=.62;shake=.3;sound.sound('hurt');
    fx.number(e.body.position,'−'+Math.round(amount),'#ffae99');
    fx.burst(e.body.position,0xff9d85,14,2);
  }else{
    fx.number(e.body.position,Math.round(amount));
    e.aggro=true;e.stun=Math.max(e.stun,.28);e.windup=0;
    e.hitFlash=.1;
  }
  e.hp=Math.max(0,e.hp-amount);
  if(origin&&!e.isPlayer){
    const d=distance(e.body.position,origin)||1;
    e.body.velocity.x+=(e.body.position.x-origin.x)/d*2;
    e.body.velocity.z+=(e.body.position.z-origin.z)/d*2;
  }
  if(e.hp>0)return;
  e.dead=true;e.deathTime=runTime;e.stun=0;e.windup=0;e.body.linearDamping=.7;
  if(e.isPlayer){endRun(false,'Οι φύλακες σε σταμάτησαν. Η επόμενη εισβολή σε περιμένει.');return;}
  kills++;combo=runTime<comboUntil?combo+1:1;comboUntil=runTime+4;
  const reward=e.kind==='boss'?5:e.kind==='heavy'?2:1;
  spawnPickup(e.body.position,reward);
  fx.burst(e.body.position,e.kind==='boss'?0xe8be84:0x9dffc9,e.kind==='boss'?65:25,3.5);
  if(e.kind==='boss'){ui.toast('Ο Δεσμοφύλακας έπεσε. Πάρε το Σκήπτρο με '+(mobile?'ΧΡΗΣΗ':'E')+'.','success');sound.sound('relic');}
  else if(combo>1){sound.sound('pickup');}
}
function spawnPickup(p,value){
  const mesh=new THREE.Mesh(new THREE.OctahedronGeometry(.16,0),new THREE.MeshStandardMaterial({color:0xd7df9f,emissive:0xbefbb7,emissiveIntensity:2,roughness:.3,metalness:.4}));
  mesh.position.set(p.x,.65,p.z);scene.add(mesh);pickups.push({mesh,value,age:0});
}
function updatePickups(dt){
  for(let i=pickups.length-1;i>=0;i--){
    const p=pickups[i];p.age+=dt;p.mesh.rotation.y+=dt*2;
    const d=distance(player.body.position,p.mesh.position);
    p.mesh.position.y=.62+Math.sin(worldTime*4+p.age)*.12;
    if(d<5.5||p.age>12){const k=Math.min(1,dt*(4.5+(p.age>12?2:0)));p.mesh.position.x+=(player.body.position.x-p.mesh.position.x)*k;p.mesh.position.z+=(player.body.position.z-p.mesh.position.z)*k;}
    if(d<.8){runShards+=p.value;player.mana=Math.min(player.maxMana,player.mana+6);player.hp=Math.min(player.maxHp,player.hp+2);
      sound.sound('pickup');fx.burst(p.mesh.position,0xbaffba,8,1);scene.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();pickups.splice(i,1);}
  }
}
function fireArrow(e){
  const p=e.body.position,pp=player.body.position;
  const from=new THREE.Vector3(p.x,1.35,p.z),to=new THREE.Vector3(pp.x,1,pp.z);
  const dir=to.clone().sub(from).normalize();
  const mesh=new THREE.Mesh(new THREE.CylinderGeometry(.035,.055,.85,5),new THREE.MeshStandardMaterial({color:e.kind==='boss'?0xba88e0:0xdbb18a,emissive:e.kind==='boss'?0x8944cf:0x985d26,emissiveIntensity:1.2,roughness:.5}));
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir);mesh.position.copy(from);scene.add(mesh);
  arrows.push({mesh,dir,age:0,speed:e.kind==='boss'?13:11,damage:e.kind==='boss'?20:12,previous:from.clone(),owner:e});
  sound.sound('arrow');
}
function updateArrows(dt){
  for(let i=arrows.length-1;i>=0;i--){
    const a=arrows[i];a.age+=dt;a.previous.copy(a.mesh.position);a.mesh.position.addScaledVector(a.dir,a.speed*dt);
    let hit=a.age>3.5||!visibleLine(a.previous,a.mesh.position,.05);
    if(!hit){
      for(const e of entities){
        if(e.removed||e===a.owner||(e.dead&&e!==held))continue;
        if(e.category==='actor'&&!e.isPlayer&&e!==held)continue;
        const p=e.body.position;
        if(pointSegmentDistance(p,a.previous,a.mesh.position)<e.radius+.12&&Math.abs(a.mesh.position.y-p.y)<(e.ext?.y||.85)){
          hit=true;
          if(e.category==='actor')hurt(e,a.damage,a.previous);
          else{fx.burst(a.mesh.position,0xffd6a0,12,2);e.body.wakeUp();e.body.velocity.x+=a.dir.x*.7;e.body.velocity.z+=a.dir.z*.7;sound.sound('impact');}
          break;
        }
      }
    }
    if(hit){fx.burst(a.mesh.position,0xefb988,5,1);scene.remove(a.mesh);a.mesh.geometry.dispose();a.mesh.material.dispose();arrows.splice(i,1);}
  }
}
function enemyAttack(e){
  if(e.kind==='archer'){fireArrow(e);e.attackCooldown=2.8;return;}
  const d=distance(e.body.position,player.body.position);
  if(e.kind==='boss'&&e.attackType==='wave'){
    const r=4.1;fx.ring(e.body.position,0xe8a178,r,.55);fx.burst(e.body.position,0xffb786,35,5);
    if(d<r&&visibleLine(e.body.position,player.body.position,.05))hurt(player,24,e.body.position);
    for(const prop of entities){if(prop.category==='prop'&&!prop.removed&&prop!==held&&distance(prop.body.position,e.body.position)<r){
      const pd=distance(prop.body.position,e.body.position)||1;prop.body.wakeUp();prop.body.velocity.x+=(prop.body.position.x-e.body.position.x)/pd*5;prop.body.velocity.z+=(prop.body.position.z-e.body.position.z)/pd*5;}}
    e.attackCooldown=3.4;sound.sound('pulse');return;
  }
  const reach=e.kind==='boss'?2.8:e.kind==='heavy'?2.6:2;
  if(d<reach&&visibleLine(e.body.position,player.body.position,.08)){
    hurt(player,e.kind==='boss'?24:e.kind==='heavy'?18:11,e.body.position);
  }
  e.attackCooldown=e.kind==='boss'?1.8:e.kind==='heavy'?2.0:1.3;
}
function updateEnemy(e,dt){
  if(e.dead||e.removed)return;
  e.attackCooldown=Math.max(0,e.attackCooldown-dt);e.pathTick-=dt;e.guardBreak=Math.max(0,e.guardBreak-dt);
  if(e===held||e.stun>0||e.thrownUntil>runTime&&e.body.position.y>1.6){
    e.windup=0;return;
  }
  const pp=player.body.position,p=e.body.position,d=distance(p,pp),sight=visibleLine(p,pp,.12);
  if(d<10.5&&sight||relicTaken)e.aggro=true;
  if(!e.aggro){e.body.velocity.x*=.8;e.body.velocity.z*=.8;return;}
  const yaw=Math.atan2(pp.x-p.x,pp.z-p.z);e.yaw=turnToward(e.yaw,yaw,dt*7);
  if(e.windup>0){
    e.body.velocity.x*=.65;e.body.velocity.z*=.65;
    e.windup-=dt;
    if(e.windup<=0)enemyAttack(e);
    return;
  }
  const archer=e.kind==='archer',bossMode=e.kind==='boss';
  const reach=archer?8.3:bossMode?3.3:e.kind==='heavy'?2.1:1.6;
  if(sight&&d<reach&&e.attackCooldown<=0){
    e.attackType=bossMode&&d>2.25?'wave':'hit';
    e.windup=archer?.65:bossMode?1.05:e.kind==='heavy'?.9:.65;e.windupMax=e.windup;
    e.attackPulse=.08;e.body.velocity.x*=.2;e.body.velocity.z*=.2;return;
  }
  let dx=0,dz=0;
  if(archer&&sight&&d<3.7){dx=(p.x-pp.x)/(d||1);dz=(p.z-pp.z)/(d||1);}
  else if((archer&&(!sight||d>6.8))||(!archer&&d>reach*.78)){
    if(e.pathTick<=0){e.path=nav.path(p,pp);e.pathTick=.45+Math.random()*.25;}
    while(e.path.length&&distance(p,e.path[0])<.6)e.path.shift();
    const to=e.path[0];
    if(to){const pd=distance(p,to)||1;dx=(to.x-p.x)/pd;dz=(to.z-p.z)/pd;}
  }
  for(const other of entities){
    if(other===e||other===held||other.isPlayer||other.removed||other.dead)continue;
    const od=distance(p,other.body.position),min=e.radius+other.radius+.28;
    if(od<min&&od>.01){const force=(min-od)/min;dx+=(p.x-other.body.position.x)/od*force*1.8;dz+=(p.z-other.body.position.z)/od*force*1.8;}
  }
  const length=Math.hypot(dx,dz);
  if(length>1){dx/=length;dz/=length;}
  const speed=e.speed*(relicTaken?1.13:1);
  const next={x:p.x+dx*.5,z:p.z+dz*.5};
  if(!nav.onFloor(next.x,next.z)){dx=0;dz=0;e.pathTick=0;}
  const lerp=Math.min(1,dt*10);
  e.body.velocity.x+=(dx*speed-e.body.velocity.x)*lerp;
  e.body.velocity.z+=(dz*speed-e.body.velocity.z)*lerp;
}
function turnToward(current,target,amount){
  const difference=Math.atan2(Math.sin(target-current),Math.cos(target-current));
  return current+difference*Math.min(1,amount);
}
function updatePlayer(dt,input){
  const p=player;
  p.invulnerable=Math.max(0,p.invulnerable-dt);p.dashCooldown=Math.max(0,p.dashCooldown-dt);p.pulseCooldown=Math.max(0,p.pulseCooldown-dt);p.dashTime=Math.max(0,p.dashTime-dt);
  if(input.pointerActive){
    const rect=renderer.domElement.getBoundingClientRect();
    raycaster.setFromCamera(new THREE.Vector2((input.pointerX-rect.left)/rect.width*2-1,-(input.pointerY-rect.top)/rect.height*2+1),camera);
    if(raycaster.ray.intersectPlane(groundPlane,tempV)){
      aimPoint.copy(tempV);const dx=aimPoint.x-p.body.position.x,dz=aimPoint.z-p.body.position.z;
      if(Math.hypot(dx,dz)>.35)aimDirection.set(dx,0,dz).normalize();
    }
  }else if(Math.hypot(input.moveX,input.moveZ)>.15){
    aimDirection.set(input.moveX,0,input.moveZ).normalize();
    aimPoint.set(p.body.position.x+aimDirection.x*8,.8,p.body.position.z+aimDirection.z*8);
  }else{aimPoint.set(p.body.position.x+aimDirection.x*8,.8,p.body.position.z+aimDirection.z*8);}
  chooseTarget(input);
  p.shielding=held&&!!input.shielding;
  if(p.dashTime>0){p.body.velocity.x=p.dashDirection.x*18;p.body.velocity.z=p.dashDirection.z*18;fx.burst(p.body.position,0x7dd9c1,3,1.2);}
  else{
    const length=Math.max(1,Math.hypot(input.moveX,input.moveZ)),slow=p.shielding?.6:held?.84:1;
    const factor=Math.min(1,dt*19);
    p.body.velocity.x+=(input.moveX/length*p.speed*slow-p.body.velocity.x)*factor;
    p.body.velocity.z+=(input.moveZ/length*p.speed*slow-p.body.velocity.z)*factor;
  }
  p.yaw=turnToward(p.yaw,Math.atan2(aimDirection.x,aimDirection.z),dt*15);
  if(!held)p.mana=Math.min(p.maxMana,p.mana+dt*(15+2*(save.profile.upgrades.focus||0)));
  updateHeld(dt,input);
}
function updateEntities(dt){
  for(const e of entities){
    if(e.removed)continue;
    e.stun=Math.max(0,(e.stun||0)-dt);e.hitFlash=Math.max(0,(e.hitFlash||0)-dt);e.attackPulse=Math.max(0,(e.attackPulse||0)-dt);
    if(e.category==='actor'&&!e.isPlayer)updateEnemy(e,dt);
    if(e.category==='actor'&&e!==held&&e.stun<=0&&e.body.position.y<e.cy+.45){
      if(!e.body.fixedRotation){e.body.fixedRotation=true;e.body.updateMassProperties();e.body.quaternion.set(0,0,0,1);e.body.angularVelocity.set(0,0,0);}
    }
    if(e.pendingBreak){
      fx.burst(e.body.position,e.kind==='urn'?0xc9ba9c:0xad9270,32,5);
      if(!e.ephemeral&&Math.random()<.28)spawnPickup(e.body.position,1);
      removeEntity(e);continue;
    }
    if(e.category==='actor'&&e.dead&&e!==held&&runTime-e.deathTime>28){fx.burst(e.body.position,0x4a7b72,12,1.7);removeEntity(e);continue;}
    if(e.ephemeral&&e!==held&&runTime>e.expireAt){fx.burst(e.body.position,0x7ce9b9,10,1);removeEntity(e);continue;}
    if(e.body.position.y<-5){
      if(e.isPlayer){e.body.position.set(e.lastSafe.x,2,e.lastSafe.z);e.body.velocity.set(0,0,0);hurt(e,10,null);}
      else if(e.category==='actor'&&!e.dead){hurt(e,e.hp+1,player.body.position);removeEntity(e);}
      else removeEntity(e);
    }else if(e.isPlayer&&nav.isFree(e.body.position.x,e.body.position.z)){e.lastSafe={x:e.body.position.x,z:e.body.position.z};}
  }
}
function syncVisuals(dt){
  for(const e of entities){
    if(e.removed)continue;
    const p=e.body.position;
    if(e.category==='prop'){e.mesh.position.copy(p);e.mesh.quaternion.copy(e.body.quaternion);continue;}
    const airborne=e===held||(!e.body.fixedRotation&&p.y>e.cy+.45);
    if(airborne){e.mesh.quaternion.copy(e.body.quaternion);tempV.set(0,e.cy,0).applyQuaternion(e.mesh.quaternion);e.mesh.position.copy(p).sub(tempV);}
    else{e.mesh.position.set(p.x,p.y-e.cy,p.z);e.mesh.rotation.set(0,e.yaw,0);}
    const speed=Math.hypot(e.body.velocity.x,e.body.velocity.z);
    e.visual.update(dt,{moving:!airborne&&speed>.18,speed,casting:e.isPlayer&&(!!held||castTime>0),
      attack:e.isPlayer?castTime>.27:e.attackPulse>0,dead:e.dead&&!airborne,stunned:e.stun>.01&&!airborne});
    if(e.shadow){e.shadow.position.set(p.x,.025,p.z);e.shadow.material.opacity=clamp(.28-(p.y-e.cy)*.025,.06,.28);}
    if(e.healthBar){
      const show=!e.dead&&(e.hp<e.maxHp||e===target||e.kind==='boss');
      e.healthBar.visible=show;e.healthBar.position.set(p.x,p.y-e.cy+2.2*(e.kind==='boss'?1.3:1),p.z);
      e.healthBar.quaternion.copy(camera.quaternion);
      e.healthBar.userData.fill.scale.x=Math.max(.001,e.hp/e.maxHp);
      e.healthBar.userData.fill.position.x=-(1-e.hp/e.maxHp)*.47;
      e.healthBar.userData.fill.material.color.set(e.guardBreak>0?0x9df6d5:e.kind==='boss'?0xd2a1dd:0xeebb8f);
    }
    if(e.telegraph){
      e.telegraph.position.set(p.x,.07,p.z);
      const radius=e.attackType==='wave'?4.1:e.kind==='boss'?2.8:e.kind==='heavy'?2.5:e.kind==='archer'?1.1:1.9;
      e.telegraph.scale.setScalar(radius);
      e.telegraph.material.opacity=e.windup>0?.35+.6*(1-e.windup/(e.windupMax||1)):0;
    }
  }
  if(!player)return;
  playerRing.position.set(player.body.position.x,.045,player.body.position.z);
  playerRing.rotation.y=worldTime*.18;
  playerLight.position.set(player.body.position.x,1.8,player.body.position.z);
  targetRing.visible=phase==='playing'&&!!(target||held);
  if(target){
    targetRing.position.set(target.body.position.x,.06,target.body.position.z);
    targetRing.scale.setScalar(Math.max(.85,target.radius+ .6)*(1+Math.sin(worldTime*6)*.035));
    const reachable=distance(player.body.position,target.body.position)<=telekinesisReach()&&visibleLine(player.body.position,target.body.position,.05);
    targetRing.material.color.set(canGrab(target)&&reachable?0x8cffda:0xffb17c);
  }
  trajectory.visible=phase==='playing'&&!!held;
  if(held){
    const from=held.body.position,v=currentThrowVelocity();
    const duration=(v.y+Math.sqrt(v.y*v.y+40*Math.max(0,from.y-.12)))/20;
    const a=trajectory.geometry.attributes.position.array;
    for(let i=0;i<28;i++){const t=i/27*duration;a[i*3]=from.x+v.x*t;a[i*3+1]=Math.max(.1,from.y+v.y*t-10*t*t);a[i*3+2]=from.z+v.z*t;}
    trajectory.geometry.attributes.position.needsUpdate=true;
    targetRing.position.set(from.x+v.x*duration,.07,from.z+v.z*duration);targetRing.scale.setScalar(.5);targetRing.material.color.set(0x99ffda);
  }
}
function updateCamera(dt){
  if(!player)return;
  const playing=['playing','paused','result'].includes(phase);
  const desired=playing?new THREE.Vector3(player.body.position.x,0,player.body.position.z-1.8):new THREE.Vector3(Math.sin(worldTime*.13)*2.2,0,8);
  cameraTarget.lerp(desired,1-Math.exp(-dt*(playing?6:1.5)));
  const offset=playing?new THREE.Vector3(0,22,17):new THREE.Vector3(6,25,21);
  camera.position.copy(cameraTarget).add(offset);
  const shakeAmount=phase==='playing'?shake:0;
  camera.position.x+=(Math.random()-.5)*shakeAmount;camera.position.z+=(Math.random()-.5)*shakeAmount;
  camera.lookAt(cameraTarget);shake=Math.max(0,shake-dt*1.5);
  moon.position.set(cameraTarget.x-16,32,cameraTarget.z+13);moon.target.position.set(cameraTarget.x,0,cameraTarget.z);
  for(const mesh of worldMap.occluders||[]){
    const focus=player.body.position;
    const box=new THREE.Box3().setFromObject(mesh);
    const behind=box.min.z>focus.z-1&&box.min.z<focus.z+9&&focus.x>box.min.x-2&&focus.x<box.max.x+2;
    const mats=Array.isArray(mesh.material)?mesh.material:[mesh.material];
    for(const mat of mats){mat.transparent=true;const opacity=behind&&playing?.17:1;mat.opacity+=(opacity-mat.opacity)*Math.min(1,dt*7);mat.depthWrite=mat.opacity>.8;}
  }
}
function updateHUD(){
  if(!player)return;
  const p=player.body.position,goalPos=relicTaken?worldMap.exit.position:worldMap.relic.position,dist=Math.round(distance(p,goalPos));
  const nearRelic=!relicTaken&&distance(p,worldMap.relic.position)<3,nearExit=relicTaken&&distance(p,worldMap.exit.position)<2.8;
  let hint='';
  if(nearRelic)hint=boss&&!boss.dead?'Χτύπα τον Δεσμοφύλακα με αντικείμενα για να σπάσεις την άμυνα.':(mobile?'ΧΡΗΣΗ':'E')+' · Πάρε το Μαύρο Σκήπτρο';
  else if(nearExit)hint=(mobile?'ΧΡΗΣΗ':'E')+' · Πέρασε την πύλη';
  else if(held)hint=mobile?'Σύρε ελεύθερα · Άφησε το δάχτυλο για ρίψη · ΑΦΗΣΕ: χωρίς ρίψη':'Σύρε το αντικείμενο · Άφησε το κλικ για ρίψη · Q: άφημα χωρίς ρίψη';
  else if(target&&distance(p,target.body.position)>telekinesisReach())hint='Πλησίασε τον στόχο για να τον αρπάξεις.';
  else if(target&&!canGrab(target))hint='Αντιστέκεται στην άρπαξη. Χτύπησέ τον με ένα αντικείμενο.';
  else if(runTime<22)hint=mobile?'Άγγιξε ένα αντικείμενο → σύρε → άφησε για ρίψη.':'Κλικ πάνω σε αντικείμενο → κράτησε και σύρε → άφησε για ρίψη.';
  else if(!target)hint=mobile?'Πάτησε πάνω σε αντικείμενο ή φρουρό. ΠΕΤΡΑ: κάλεσε ένα θραύσμα.':'Πάτησε πάνω σε αντικείμενο ή φρουρό. R: κάλεσε μια πέτρα.';
  let zone='Η Αυλή';
  for(const z of worldMap.zones)if(p.x>=z.xMin&&p.x<=z.xMax&&p.z>=z.zMin&&p.z<=z.zMax)zone=z.label||z.name;
  ui.update({hp:player.hp,maxHp:player.maxHp,mana:player.mana,maxMana:player.maxMana,kills,
    goal:relicTaken?'ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΠΥΛΗ':'ΤΟ ΜΑΥΡΟ ΣΚΗΠΤΡΟ',
    objective:relicTaken?'Δραπέτευσε από τη νότια πύλη · '+dist+' μ.':'Βρες το Σκήπτρο στην κρύπτη · '+dist+' μ.',
    hint,holding:!!held,dragging:!!drag,heldName:held?.label||'',
    pulseCooldown:player.pulseCooldown,dashCooldown:player.dashCooldown,relic:relicTaken,shards:runShards,
    combo:runTime<comboUntil?combo:0,comboMultiplier:runTime<comboUntil?Math.min(4,combo):0,time:runTime,
    progress:relicTaken?.8:boss?.dead?.6:clamp((18-p.z)/40,0,.55),zone,
    bossHP:boss&&!boss.dead&&distance(p,boss.body.position)<12?boss.hp:null,bossMaxHP:boss?.maxHp||330,bossName:'Ο Δεσμοφύλακας',
    targetName:target?.label||'',quality});
}
function frame(now){
  const dt=Math.min(.045,Math.max(.001,(now-lastTime)/1000));lastTime=now;worldTime+=dt;
  try{
    if(worldMap)worldMap.update(dt,worldTime);
    if(ready){
      const actions=ui.consumeActions();
      for(const action of actions)if(action==='pause')togglePause();
      if(phase==='playing'){
        runTime+=dt;castTime=Math.max(0,castTime-dt);
        const input=ui.getInput();updatePlayer(dt,input);
        for(const action of actions){
          if(action==='drop')releaseHeld(false);
          else if(action==='conjure')conjure();
          else if(action==='dash')dash(input);
          else if(action==='pulse')pulse();
          else if(action==='interact')interact();
        }
        if(phase==='playing'){
          updateEntities(dt);
          physics.step(1/120,dt,6);
          updateArrows(dt);updatePickups(dt);
          if(relicTaken&&runTime>nextWave){spawnReinforcements();nextWave=runTime+24;}
        }
      }
      const animate=['playing','menu'].includes(phase)?dt:0;
      syncVisuals(animate);updateCamera(dt);updateHUD();fx.update(animate||dt*.25);
      if(!held)fx.connect(null);
    }
    if(composer){if(quality==='high')composer.render();else renderer.render(scene,camera);}
    requestAnimationFrame(frame);
  }catch(error){showError(error);}
}
function showError(error){
  console.error('Magic:',error);phase='error';
  const message='Το παιχνίδι δεν μπόρεσε να ξεκινήσει. Δοκίμασε ανανέωση ή άνοιξε τον σύνδεσμο σε Safari / Chrome.';
  if(ui.showError)ui.showError(message);
  else{
    let el=document.getElementById('fatal-error');
    if(!el){el=document.createElement('div');el.id='fatal-error';document.body.append(el);}
    el.style.cssText='position:fixed;inset:20%;z-index:9999;background:#12201d;color:#fff;padding:30px;font:18px system-ui;display:block;';
    el.textContent=message+' '+(error?.message||'');
  }
}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&phase==='playing'){phase='paused';ui.showPause(true);}});
window.addEventListener('pagehide',()=>save.save());
async function boot(){
  try{
    ui.setLoading(.05,'Ανάβουν οι δάδες…');setupRenderer();
    worldMap=createWorld(scene);setupPhysics();ui.setLoading(.2,'Το κάστρο ξυπνά…');
    requestAnimationFrame(frame);
    await loadCharacters((fraction)=>ui.setLoading(.2+fraction*.65,'Οι φύλακες παίρνουν θέση…'));
    ui.setLoading(.9,'Η μαγεία σχηματίζεται…');populate();
    if(renderer.compileAsync)await renderer.compileAsync(scene,camera);
    ready=true;phase='menu';ui.setLoading(1,'Έτοιμο');ui.ready();ui.showMenu(save.profile);
    window.__MAGIC__={version:'1.1.0',snapshot:()=>({phase,hp:player?.hp,mana:player?.mana,position:player?{x:player.body.position.x,z:player.body.position.z}:null,
      kills,relicTaken,holding:held?.label||null,dragging:!!drag,controls:'drag-release',entities:entities.filter(e=>!e.removed).length,renderer:renderer.info.render,
      pathToRelic:nav.path({x:0,z:18},{x:0,z:-16}).length,profile:{runs:save.profile.runs,wins:save.profile.wins}})};
    if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(()=>{});
  }catch(error){showError(error);}
}
boot();

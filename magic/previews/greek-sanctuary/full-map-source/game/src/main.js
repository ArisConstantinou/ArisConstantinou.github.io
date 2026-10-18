import {createGameUpdates} from './game-updates.js';
import {greekEnabled,loadGreekAssets,addGreekArchitecture,createGreekPuzzles} from './greek-environment.js';
import {benchmarkMode,createPerformanceTest} from './performance-test.js';
import {createBenchmarkFixtures} from './benchmark-fixtures.js';
import {estimateResources} from './benchmark-memory.js';
import {observeAssetLoading,readAsset} from './asset-loading.js';
import {loadTextureProfile} from './asset-profile.js';
import {ensureReleaseWorker,notifyReleaseReady,releaseReloadURL} from './release-worker.js';
import {prepareVisibleTextures,textureMemoryStats,prefetchEncodedTextures,configureTextureMemory} from './texture-memory.js';
import * as THREE from 'three';
import {guardZeroContributionLights} from './zero-light-work.js';
guardZeroContributionLights(THREE.ShaderChunk);
import {loadSiegeAssets,addSiegeDressing,siegeEnabled} from './siege-environment.js';
import * as CANNON from 'cannon-es';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createWorld, createPropMesh } from './world.js';
import { loadCharacters, createCharacter } from './characters.js';
import { configureRigSurfacePreparation } from './rig-surface-preparation.js';
import { loadBossCharacters, createBossCharacter } from './boss-characters.js';
import { BOSS_DEFINITIONS, createBossLayout, insideBossRoom, bossAttackCrossed } from './boss-rules.js';
import {gargoyleFlightHeight,gargoyleLiftAcceleration} from './gargoyle-flight.js';
import { createUI } from './ui.js';
import { createEffects } from './effects.js';
import { MagicAudio } from './audio.js';
import { clamp, distance, lineClear, pointSegmentDistance, NavigationGrid, ProfileStore } from './systems.js';
import { PointerMotion, gestureThrowVelocity, clampDragPoint, constrainDragPoint } from './drag.js';
import {mobileDragPointer} from './mobile-drag-pointer.js';
import {FrameRateMeter} from './frame-rate.js';
import {intersectVisibleAnimatedObject,prepareObjectPicking} from './animated-picking.js';
import {shieldGesture,nearestContext} from './context-controls.js';
import { aimedThrowVelocity, floorThrowTarget } from './throw-aim.js';
import {equipmentStats,isPotion,rollLoot,TIERS,itemName} from './loot.js';
import {enemySpawnAllowed} from './spawn-rules.js';
import {fastCollisionTracking,CastleBroadphase} from './physics-config.js';
import {createLootVisual} from './loot-visuals.js';
import {pathAroundProps} from './goliath-navigation.js';
import { captureTrajectoryWorld, TRAJECTORY_STEPS } from './trajectory.js';
import { impactDamage, propSelfDamage, knockbackXZ } from './impact-rules.js';
import {FireSpell,consumeBurnDamage,consumeWoodDamage,spreadFire,fireSight} from './fire.js';
import {createFireEffects} from './fire-effects.js';
import { createStoneCreature } from './stone-creature.js';
import {createStoneMinion,loadStoneMinion} from './stone-minion.js';
import {supportedSpawn} from './supported-spawn.js';
import {STONE_MINION,createStoneCombat,beginStoneAttack,cancelStoneCombat,advanceStoneCombat} from './stone-minion-combat.js';
import { existingRooms, newRooms } from './castle-layout.js';
import { STONE_LIMIT, GOLIATH_STONES, GOLIATH_CHARGE, GOLIATH_HEALTH, GOLIATH_LIFETIME, ENEMY_LIMIT,
  CHANNEL_DURATION, CHANNEL_COOLDOWN, MINION_LIMIT, activeStones, selectStones, StoneRitual, bodyguardTarget, freePosition } from './goliath.js';
import {loadHearth} from './hearth-character.js';
import {createHearthSystem} from './hearth-system.js';
import {travelAlignment} from './movement-facing.js';
import {supportHeight,supportSightClear} from './walkable-support.js';
import {createHearthEffects} from './hearth-effects.js';
import {igniteActor} from './fire.js';
import './style.css';
import './context-controls.css';
import './desktop-engine.css';
import {engineEscort} from './engine-escort.js';
import packageInfo from '../package.json';

const mobile = matchMedia('(pointer: coarse)').matches;
const FIRE_ENABLED=new URL(location.href).searchParams.get('fire')!=='0';
const FIRE_PREVIEW=location.pathname.includes('/.cache/')||greekEnabled;
const FIRE_BENCHMARK=new URL(location.href).searchParams.has('benchmarkFire');
const GROUP = {PLAYER:1, ENEMY:2, PROP:4, WORLD:8};
let storage; try { storage = window.localStorage; } catch {}
if(benchmarkMode){const memory=new Map();storage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)};}
let performanceTest,benchmarkPulseAt=0;
const lootCandidate=location.pathname.includes('/.cache/loot-');
const candidate=FIRE_PREVIEW||lootCandidate||location.pathname.includes('/.cache/goliath-')||location.pathname.includes('/.cache/latest-');
const save = new ProfileStore(storage,location.pathname.endsWith('/movement.htm')?'magic-movement-preview-v1':candidate?(location.pathname.includes('/.cache/desktop-engine')?'magic-desktop-engine-preview-v1':location.pathname.includes('/.cache/context-controls')?'magic-context-controls-preview-v1':(greekEnabled?'magic-greek-sanctuary-v1':'magic-integrated-preview-v1')):'magic-exiled-v1',[]), sound = new MagicAudio(save.profile.muted);
document.addEventListener('visibilitychange',()=>{if(document.hidden)sound.setFlamethrower(false);});
const ritual=new StoneRitual();
let goliath=null, assemblyCreature=null, assemblyPlacement=null, ritualPressed=false, ritualStarted=0;
let ritualPressedAt=0, ritualConjured=false, ritualAwaitingSeventh=false;
let bosses=[], reinforcements=[], enteredRooms=new Set();
const rooms=[...existingRooms,...newRooms];
let goliathNav;
let hearth,hearthFX;
let greekArchitecture,greekPuzzles;
let phase='loading', ready=false, quality=mobile?'low':'high', worldMap, physics, nav, player, held=null, target=null;
let textureUpload,texturePreparation=null,environmentTarget;
function prepareFrameTextures(){return prepareVisibleTextures(renderer,scene,textureUpload,camera);}
function prepareEnvironment(){
  environmentTarget?.dispose();
  const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment();
  environmentTarget=pmrem.fromScene(room,.04);scene.environment=environmentTarget.texture;scene.environmentIntensity=.2;room.dispose();pmrem.dispose();
}
let inventoryReturnPhase='playing',lootDrops=[];
let entities=[], arrows=[], pickups=[], kills=0, runShards=0, runTime=0, relicTaken=false, alarmTime=0, nextWave=0;
let combo=0, comboUntil=0, lastTime=performance.now(), worldTime=0, shake=0, castTime=0, boss=null, lastHint='';
let lastBossOrder=[];
let fireSpell,fireFX,fireLastSpark=0;
let renderer, composer, camera, scene, fx, moon, bloom, targetRing, playerRing, playerLight, heldLight, trajectory;
let actorMaterial, solidMaterial;
let drag=null;
const frameRate=new FrameRateMeter();
let trajectoryPredictor,throwPreview=null,previewAt=-Infinity,previewBody=null,previewVelocity=null;
let previewBusy=false;
let impactMarker;
let aimedEnemy=null;
let lastAimPointer=null,throwDestination=new THREE.Vector3();
let sideTrajectory,sideArrow;
let aimPoint=new THREE.Vector3(0,.8,5), aimDirection=new THREE.Vector3(0,0,-1), cameraTarget=new THREE.Vector3(0,0,9);
const raycaster=new THREE.Raycaster(), groundPlane=new THREE.Plane(new THREE.Vector3(0,1,0),-.8);
raycaster.layers.enable(31);
const dragPlane=new THREE.Plane(new THREE.Vector3(0,1,0),-2.1);
const tempV=new THREE.Vector3(), tempQ=new THREE.Quaternion();
let contextTarget=null,contextAt=-Infinity,contextHighlight;
const contextPoint=new THREE.Vector3();
const ui=createUI({
  version:packageInfo.version,
  onUpdateCheck:()=>gameUpdates.check({force:true}),
  onUpdateApply:()=>gameUpdates.apply(),
  fireEnabled:FIRE_ENABLED,
  hearth:true,
  onLoading:label=>performanceTest?.stage(label),
  onBenchmark:()=>{const url=new URL(location.href);url.searchParams.set('benchmark','1');location.assign(url.href);},
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
  onAim:info=>aimAtPointer(info),
  onInventory:()=>openInventory(),
  onStatus:()=>{
    if(phase!=='playing')return;
    inventoryReturnPhase=phase;cancelRitual();releaseHeld(false);phase='inventory';ui.showStatus();
  },
  onInventoryClose:()=>closeInventory(),
  onInventoryAction:(action,id)=>inventoryAction(action,id),
  onPotion:kind=>usePotion(kind),
  onConjureStart:()=>beginConjure(),
  onConjureEnd:()=>endConjure(),
  onConjureCancel:()=>cancelRitual(),
});
const gameUpdates=createGameUpdates({version:packageInfo.version,href:location.href,serviceWorker:navigator.serviceWorker,onChange:state=>ui.setUpdateState(state),canApply:()=>ready&&['menu','paused','result'].includes(phase)});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&ready&&!candidate)void gameUpdates.check();});
ui.setMuted(save.profile.muted);
ui.setQuality(quality);
const benchmarkFixtures=createBenchmarkFixtures(()=>({player,entities,nav,world:worldMap,hearth,camera,time:runTime,startRun,setCamera:()=>{setPlayCamera();updateCamera(100);},pulse,conjure,dash,hold:holdEntity,throw:throwHeld,event:(...a)=>performanceTest.event(...a)}));
performanceTest=createPerformanceTest({version:packageInfo.version,boot,setup:benchmarkFixtures.setup,step:benchmarkFixtures.step,
 suspend:()=>{phase='benchmark-results';sound.setPaused(true);sound.setFlamethrower(false);},
 sample:()=>{const p=player?.body.position,hs=hearth?.snapshot(),room=worldMap?.zones.find(r=>p&&p.x>=r.xMin&&p.x<=r.xMax&&p.z>=r.zMin&&p.z<=r.zMax);return {room:room?.name||'διάδρομος',position:p?{x:p.x,y:p.y,z:p.z}:null,valid:!!p&&[p.x,p.y,p.z,hs?.x??0,hs?.z??0].every(Number.isFinite),phase,engine:hs?.state,engineFiring:!!hs?.firing,held:held?.kind||null,nearbyEnemies:entities.filter(e=>e.category==='actor'&&!e.isPlayer&&!e.ally&&!e.dead&&distance(e.body.position,p)<15).length};},
 memory:()=>({...estimateResources(renderer,scene,[moon?.shadow.map,environmentTarget,composer?.renderTarget1,composer?.renderTarget2,...(bloom?.renderTargetsHorizontal||[]),...(bloom?.renderTargetsVertical||[]),bloom?.renderTargetBright]),textureLifecycle:textureMemoryStats()}),
 device:()=>({userAgent:navigator.userAgent,viewport:[innerWidth,innerHeight],canvas:renderer?[renderer.domElement.width,renderer.domElement.height]:null,dpr:devicePixelRatio,quality,threads:navigator.hardwareConcurrency||null,deviceMemoryGiB:navigator.deviceMemory||null,gpu:renderer?(()=>{const gl=renderer.getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return gl.getParameter(ext?ext.UNMASKED_RENDERER_WEBGL:gl.RENDERER);})():null,actors:entities.filter(e=>e.category==='actor').length,bodies:physics?.bodies.length||0,actualVram:'not exposed by WebGL'})});
function applyEquipment(){
  if(!player)return;const gear=equipmentStats(save.profile.loot);player.gear=gear;
  player.maxHp=120+25*(save.profile.upgrades.vitality||0)+gear.health;
  player.maxMana=100+20*(save.profile.upgrades.focus||0)+gear.mana;
  player.speed=5*(1+gear.speed);player.hp=Math.min(player.hp,player.maxHp);player.mana=Math.min(player.mana,player.maxMana);
}
function refreshInventory(id){
  ui.showInventory({...save.profile,storageAvailable:save.available},{hp:player.hp,maxHp:player.maxHp,mana:player.mana,maxMana:player.maxMana,gear:player.gear,usable:!player.dead&&['playing','paused'].includes(inventoryReturnPhase)},id);
}
function openInventory(){
  if(!ready||phase==='loading'||phase==='error')return;
  if(phase==='inventory'){ui.hideModal();return;}
  inventoryReturnPhase=phase;cancelRitual();releaseHeld(false);phase='inventory';refreshInventory();
}
function closeInventory(){if(phase!=='inventory')return;phase=document.hidden&&inventoryReturnPhase==='playing'?'paused':inventoryReturnPhase;if(phase==='paused')ui.showPause(true);}
function inventoryAction(action,id){
  if(phase!=='inventory')return;const item=save.profile.loot.items.find(i=>i.id===id);
  if(action==='equip')save.equip(id);
  if(action==='unequip'&&item)save.unequip(item.kind);
  if(action==='salvage'&&save.salvage(id)){sound.sound('pickup');ui.toast('Ο εξοπλισμός έγινε μόνιμα θραύσματα.','success');}
  if(action==='use'&&item)usePotion(item.kind,id);
  applyEquipment();refreshInventory(id);
}
function potionCounts(){const counts={health:0,mana:0};for(const item of save.profile.loot.items)if(isPotion(item))counts[item.kind]+=item.count;return counts;}
function usePotion(kind,id){
  if(!player||player.dead||!(['playing','paused'].includes(phase)||phase==='inventory'&&['playing','paused'].includes(inventoryReturnPhase)))return false;
  const item=id?save.profile.loot.items.find(i=>i.id===id&&i.kind===kind):save.profile.loot.items.filter(i=>i.kind===kind).sort((a,b)=>a.level-b.level)[0];
  if(!isPotion(item))return false;const current=kind==='health'?'hp':'mana',maximum=kind==='health'?'maxHp':'maxMana';
  if(player[current]>=player[maximum]-.01){ui.toast(kind==='health'?'Η ζωή σου είναι ήδη πλήρης.':'Η ενέργειά σου είναι ήδη πλήρης.','info');return false;}
  const amount=Math.round(player[maximum]*(.25+.05*item.level)+10);
  if(!save.consume(item.id))return false;player[current]=Math.min(player[maximum],player[current]+amount);
  sound.sound('pickup');fx.ring(player.body.position,kind==='health'?0xffaaa0:0x8bcfff,1,.4);ui.updatePotions(potionCounts());return true;
}

function setupRenderer(){
  const canvas=document.getElementById('game-canvas');
  renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  if(benchmarkMode)renderer.debug.onShaderError=(gl,program,vertex,fragment)=>performanceTest?.error(new Error('WebGL shader: '+[gl.getProgramInfoLog(program),gl.getShaderInfoLog(vertex),gl.getShaderInfoLog(fragment)].filter(Boolean).join('\n')));
  textureUpload=async texture=>{await new Promise(requestAnimationFrame);renderer.initTexture(texture);};
  // Lost-context GPU objects are already invalid. Recreate the generated
  // environment after restore without deleting handles from the old context.
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();environmentTarget=null;sound.setPaused(true);sound.setFlamethrower(false);if(ready&&phase==='playing'){phase='paused';ui.showPause(true);}});
  canvas.addEventListener('webglcontextrestored',()=>{try{prepareEnvironment();}catch(error){showError(error);}});
  // All composer passes belong to one game frame. Reset once so Three updates
  // each skeleton once, and counters include the full frame rather than its
  // final fullscreen pass.
  renderer.info.autoReset=false;
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
  prepareEnvironment();
  if(quality==='high')setupComposer();
  fx=createEffects(scene);
  targetRing=new THREE.Mesh(new THREE.RingGeometry(.72,.77,48),new THREE.MeshBasicMaterial({color:0x86ffda,transparent:true,opacity:.95,side:THREE.DoubleSide,depthWrite:false}));
  for(let i=0;i<4;i++){const tick=new THREE.Mesh(new THREE.PlaneGeometry(.27,.07),targetRing.material);tick.position.set(Math.cos(i*Math.PI/2)*.87,Math.sin(i*Math.PI/2)*.87,.002);tick.rotation.z=i*Math.PI/2;tick.renderOrder=9;targetRing.add(tick);}
  targetRing.rotation.x=-Math.PI/2;targetRing.material.depthTest=false;targetRing.renderOrder=9;targetRing.visible=false;scene.add(targetRing);
  const trajectoryGeometry=new THREE.BufferGeometry();
  trajectoryGeometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array((TRAJECTORY_STEPS+1)*3),3));
  trajectory=new THREE.Line(trajectoryGeometry,new THREE.LineDashedMaterial({color:0xffce87,dashSize:.12,gapSize:.09,transparent:true,opacity:.7,depthWrite:false}));
  trajectory.frustumCulled=false;trajectory.visible=false;scene.add(trajectory);
  impactMarker=new THREE.Mesh(new THREE.RingGeometry(.12,.18,24),new THREE.MeshBasicMaterial({color:0xffce87,side:THREE.DoubleSide,depthWrite:false}));
  impactMarker.visible=false;scene.add(impactMarker);
  const sideGeometry=new THREE.BufferGeometry();sideGeometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array((TRAJECTORY_STEPS+1)*3),3));
  sideTrajectory=new THREE.Line(sideGeometry,new THREE.LineDashedMaterial({color:0xffce87,dashSize:.12,gapSize:.09,transparent:true,opacity:.85,depthTest:false,depthWrite:false}));
  sideTrajectory.frustumCulled=false;sideTrajectory.visible=false;scene.add(sideTrajectory);
  sideArrow=new THREE.ArrowHelper(new THREE.Vector3(1,0,0),new THREE.Vector3(),.4,0xffce87,.25,.14);sideArrow.visible=false;scene.add(sideArrow);
  for(const mesh of [sideTrajectory,sideArrow.line,sideArrow.cone]){mesh.renderOrder=10;mesh.material.depthTest=false;mesh.material.depthWrite=false;}
  playerRing=new THREE.Group();
  for(const [r,width,opacity] of [[.62,.035,.85],[.76,.015,.3]]){
    const ring=new THREE.Mesh(new THREE.RingGeometry(r,r+width,48),new THREE.MeshBasicMaterial({color:0x88ffde,transparent:true,opacity,side:THREE.DoubleSide,depthWrite:false}));
    ring.rotation.x=-Math.PI/2;playerRing.add(ring);
  }scene.add(playerRing);
  playerLight=new THREE.PointLight(0x8bf7d5,2.5,6,2);scene.add(playerLight);
  heldLight=new THREE.PointLight(0x7cffd3,0,5,2);scene.add(heldLight);
  window.addEventListener('resize',resize);resize();
}
function setupComposer(){
  if(composer)return;
  composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));
  bloom=new UnrealBloomPass(new THREE.Vector2(800,600),.34,.58,.93);composer.addPass(bloom);composer.addPass(new OutputPass());
}
function resize(){
  if(!renderer)return;
  const w=window.innerWidth,h=window.innerHeight,aspect=w/h;
  const halfH=aspect<1?10.5/aspect:11.3;
  camera.left=-halfH*aspect;camera.right=halfH*aspect;camera.top=halfH;camera.bottom=-halfH;camera.updateProjectionMatrix();
  const ratio=Math.min(window.devicePixelRatio||1,quality==='high'?1.75:1.15);
  if(quality==='high')setupComposer();
  renderer.setPixelRatio(ratio);renderer.setSize(w,h,false);if(composer){composer.setPixelRatio(ratio);composer.setSize(w,h);}
  const shadowSize=quality==='high'?2048:1024;
  if(moon.shadow.mapSize.x!==shadowSize){moon.shadow.mapSize.set(shadowSize,shadowSize);moon.shadow.map?.dispose();moon.shadow.map=null;}
}
function staticBox(box,isFloor=false){
  const body=new CANNON.Body({mass:0,material:solidMaterial,shape:new CANNON.Box(new CANNON.Vec3(box.w/2,box.h/2,box.d/2)),position:new CANNON.Vec3(box.x,box.y,box.z)});
  body.previewFloor=isFloor;
  body.collisionFilterGroup=GROUP.WORLD;body.collisionFilterMask=-1;physics.addBody(body);box.physicsBody=body;return body;
}
function setupPhysics(){
  physics=new CANNON.World({gravity:new CANNON.Vec3(0,-20,0),allowSleep:true});
  // Cannon's sparse matrix tracks actual contacts, avoiding an O(bodies²)
  // array clear at every 120 Hz step. Contact events and the solver are unchanged.
  fastCollisionTracking(physics);
  physics.broadphase=new CastleBroadphase(physics);physics.solver.iterations=8;
  physics.defaultContactMaterial.friction=.55;physics.defaultContactMaterial.restitution=.15;
  actorMaterial=new CANNON.Material('actor');solidMaterial=new CANNON.Material('solid');
  // Upright characters are driven by velocity; floor friction must not cancel every step.
  physics.addContactMaterial(new CANNON.ContactMaterial(actorMaterial,solidMaterial,{friction:0,restitution:0}));
  physics.addContactMaterial(new CANNON.ContactMaterial(actorMaterial,actorMaterial,{friction:0,restitution:0}));
  physics.addContactMaterial(new CANNON.ContactMaterial(solidMaterial,solidMaterial,{friction:.55,restitution:.15}));
  for(const box of worldMap.floors)staticBox(box,true);
  for(const box of worldMap.colliders)staticBox(box);
  trajectoryPredictor=new Worker(new URL('./trajectory-worker.js',import.meta.url),{type:'module'});
  trajectoryPredictor.onmessage=({data})=>{
    previewBusy=false;
    if(data.error){console.error('Trajectory preview:',data.error);return;}
    if(held?.body.id===data.bodyId){throwPreview=data.preview;throwPreview.origin=data.origin;throwPreview.velocity=data.velocity;}
  };
  trajectoryPredictor.onerror=event=>{previewBusy=false;console.error('Trajectory worker:',event.message);};
  nav=new NavigationGrid(worldMap.floors,worldMap.colliders);
}
function createHealthBar(){
  const g=new THREE.Group();
  const bg=new THREE.Mesh(new THREE.PlaneGeometry(1.0,.085),new THREE.MeshBasicMaterial({color:0x14201c,depthTest:false,transparent:true,opacity:.9}));
  const fill=new THREE.Mesh(new THREE.PlaneGeometry(.94,.043),new THREE.MeshBasicMaterial({color:0xeebb8f,depthTest:false}));
  fill.position.z=.002;g.add(bg,fill);g.userData.fill=fill;g.visible=false;scene.add(g);return g;
}
function actor(kind,x,z,isPlayer=false,bossType=null,room=null){
  const bossMode=kind==='boss',definition=bossType?BOSS_DEFINITIONS[bossType]:null;
  const stoneMinion=kind==='stone-minion';
  const visual=definition?createBossCharacter(bossType):stoneMinion?createStoneMinion():createCharacter(bossMode?'heavy':kind),scale=definition?1:bossMode?1.3:1;
  if(bossMode&&!definition)visual.group.scale.multiplyScalar(scale);
  const stats=definition?{...definition,label:definition.name}:{mage:{hp:120,speed:5.0,mass:5,label:'Εξόριστος'},
    guard:{hp:65,speed:2.3,mass:4,label:'Φρουρός'},archer:{hp:48,speed:1.9,mass:3,label:'Τοξότης'},
    heavy:{hp:135,speed:1.65,mass:9,label:'Σιδερόφρακτος'},'stone-minion':STONE_MINION,boss:{hp:330,speed:1.55,mass:13,label:'Ο Δεσμοφύλακας'}}[kind];
  const hp=stats.hp+(isPlayer?25*(save.profile.upgrades.vitality||0):0);
  const cy=definition?.cy||stats.cy||.88*scale,r=definition?.radius||stats.radius||.43*scale;
  const body=new CANNON.Body({mass:stats.mass,material:actorMaterial,position:new CANNON.Vec3(x,cy+.08,z),linearDamping:.3,angularDamping:.7,fixedRotation:true,allowSleep:!isPlayer,sleepSpeedLimit:.1,sleepTimeLimit:1.2});
  body.addShape(new CANNON.Sphere(r),new CANNON.Vec3(0,definition||stoneMinion?r-cy:-.43*scale,0));
  body.addShape(new CANNON.Sphere(r*.92),new CANNON.Vec3(0,definition ? .65 : stoneMinion?stats.height-r*.92-cy-.02:.32*scale,0));
  if(definition)body.addShape(new CANNON.Sphere(.34),new CANNON.Vec3(0,definition.height-cy-.45,0));
  body.collisionFilterGroup=isPlayer?GROUP.PLAYER:GROUP.ENEMY;
  const e={category:'actor',kind,isPlayer,visual,mesh:visual.group,body,cy,radius:r,hp,maxHp:hp,speed:stats.speed,mass:stats.mass,label:stats.label,
    dead:false,removed:false,stun:0,invulnerable:0,hitFlash:0,thrownUntil:0,thrownBy:null,collisionTimes:new Map(),yaw:Math.PI,
    path:[],pathTick:0,aggro:false,attackCooldown:1+Math.random(),windup:0,attackType:'',guardBreak:0,spawn:{x,z},lastSafe:{x,z},deathTime:0};
  if(definition)Object.assign(e,{bossType,room,bossClip:'Idle',bossTime:0,bossAttack:null,attackIndex:0});
  if(stoneMinion){
    e.stoneCombat=createStoneCombat();
    visual.ready.then(()=>{if(!e.removed)visual.group.userData.sourceRig.nativeAIIntegrated=true;}).catch(error=>{console.error('Stone minion:',error);removeEntity(e);});
  }
  if(bossMode){e.channel=0;e.channelCooldown=7;e.minions=new Set();}
  if(isPlayer){e.mana=100+20*(save.profile.upgrades.focus||0);e.maxMana=e.mana;e.dashCooldown=0;e.pulseCooldown=0;e.dashTime=0;e.dashDirection=new THREE.Vector3();e.shielding=false;}
  else{
    e.healthBar=createHealthBar();
    e.telegraph=new THREE.Mesh(new THREE.RingGeometry(.8,.88,40),new THREE.MeshBasicMaterial({color:0xfb8f65,transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));
    e.telegraph.rotation.x=-Math.PI/2;scene.add(e.telegraph);
  }
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(.5*scale,24),new THREE.MeshBasicMaterial({color:0x031010,transparent:true,opacity:.26,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;scene.add(shadow);e.shadow=shadow;
  body.entity=e;body.addEventListener('collide',event=>impact(e,event));
  prepareObjectPicking(e.mesh);physics.addBody(body);scene.add(e.mesh);entities.push(e);return e;
}
function prop(kind,x,z,options={}){
  const item=createPropMesh(kind),mesh=item.mesh;
  const ext=item.halfExtents||new THREE.Vector3(.5,.5,.5);
  const mass=options.mass||item.mass||3;
  const body=new CANNON.Body({mass,material:solidMaterial,shape:new CANNON.Box(new CANNON.Vec3(ext.x,ext.y,ext.z)),
    position:new CANNON.Vec3(x,options.y??((options.floorY??0)+(siegeEnabled&&kind==='shield'?ext.z+.035:ext.y+.08)),z),linearDamping:.15,angularDamping:.35,allowSleep:true,sleepTimeLimit:1.2});
  body.quaternion.setFromEuler(siegeEnabled&&kind==='shield'?-Math.PI/2:0,options.rotation||0,0);
  body.collisionFilterGroup=GROUP.PROP;
  const e={category:'prop',kind,mesh,body,ext,mass,radius:Math.max(ext.x,ext.z),hp:item.health||70,maxHp:item.health||70,label:item.label||'Θραύσμα',
    indestructible:!!item.indestructible,flammable:item.flammable,woodFraction:item.woodFraction,
    removed:false,dead:false,thrownUntil:0,thrownBy:null,collisionTimes:new Map(),pendingBreak:false,ephemeral:!!options.ephemeral,expireAt:runTime+18,spawn:{x,z,y:body.position.y}};
  body.entity=e;body.addEventListener('collide',event=>impact(e,event));
  prepareObjectPicking(e.mesh);physics.addBody(body);scene.add(mesh);entities.push(e);return e;
}
function removeEntity(e){
  if(e.removed)return;if(e===held)releaseHeld(false);
  if(e.kind==='boss')interruptChannel(e);
  e.removed=true;physics.removeBody(e.body);scene.remove(e.mesh);
  if(e.healthBar){scene.remove(e.healthBar);e.healthBar.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});}
  if(e.telegraph){scene.remove(e.telegraph);e.telegraph.geometry.dispose();e.telegraph.material.dispose();}
  if(e.shadow){scene.remove(e.shadow);e.shadow.geometry.dispose();e.shadow.material.dispose();}
  if(e.category==='actor')e.visual.dispose?.();
  // Prop clones share the cached prefab's geometry/material. Removing one
  // summoned stone must not invalidate the remaining stones or future calls.
  if(e===goliath)goliath=null;
  if(e.category==='prop')e.mesh.traverse(o=>{if(o.userData.ownedFireMaterial)o.material.dispose();});
}
function clearDynamic(){
  cancelRitual();goliath=null;bosses=[];reinforcements=[];enteredRooms=new Set();
  hearth?.dispose();hearthFX?.clear();
  for(const e of entities)removeEntity(e);entities=[];
  for(const a of arrows){scene.remove(a.mesh);a.mesh.geometry.dispose();a.mesh.material.dispose();}arrows=[];
  for(const p of pickups){scene.remove(p.mesh);p.mesh.geometry.dispose();p.mesh.material.dispose();}pickups=[];
  for(const drop of lootDrops)drop.mesh.removeFromParent();lootDrops=[];
  fx.clear();held=target=null;
}
function populate(){
  clearDynamic();kills=runShards=runTime=combo=0;comboUntil=0;relicTaken=false;nextWave=0;alarmTime=0;shake=0;castTime=0;
  worldMap.setAlarm(false);worldMap.setRelicTaken(false);
  if(FIRE_ENABLED){fireSpell.reset();for(const s of fireSpell.sources)worldMap.setTorchLit(s.id,true);worldMap.resetWood();fireFX.clear();fireLastSpark=0;}
  greekPuzzles?.reset();hearth.reset();greekPuzzles?.configureForEngine(hearth.engine.location.room.name,hearth.engine.body.position);
  for(const original of worldMap.props){const d=hearth.propPosition(original);prop(d.kind,d.x,d.z,d);}
  player=actor('mage',worldMap.spawn.x,worldMap.spawn.z,true);greekPuzzles?.spawnWeights();
  applyEquipment();player.hp=player.maxHp;player.mana=player.maxMana;
  const bossTypes=['colossus','gargoyle','wraith',null];
  for(let i=3;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bossTypes[i],bossTypes[j]]=[bossTypes[j],bossTypes[i]];}
  if(bossTypes.every((t,i)=>t===lastBossOrder[i]))bossTypes.push(bossTypes.shift());lastBossOrder=[...bossTypes];
  let bossIndex=0;
  for(const room of rooms){
    const spots=roomSpawnPoints(room);
    for(let i=0;i<room.enemies;i++){const p=spots[i];if(!p)throw new Error('No safe spawn in '+room.id);const free=hearth.propPosition(p,.5);const e=actor(i%4===2?'archer':i%5===4?'heavy':'guard',free.x,free.z);e.room=room.id;}
    if(room.boss){
      const p=room.id==='crypt'?{x:0,z:room.z+2.5}:spots[room.enemies];
      const bounds={name:room.id,xMin:room.x+.7,xMax:room.x+room.w-.7,zMin:room.z+.7,zMax:room.z+room.d-.7};
      const type=bossTypes[bossIndex++],preferred=hearth.propPosition(p,.9);
      const free=freePosition(preferred,.9,worldMap.floors,nav.obstacles,entities,4.2,at=>insideBossRoom(at,bounds,1)&&distance(at,hearth.engine.body.position)>2.8);
      if(!free)throw new Error('No safe boss position in '+room.id);
      const e=actor('boss',free.x,free.z,false,type,type?bounds:room.id);
      if(!type){e.label='Ο Επικλητής του Κάστρου';e.visual.setTint?.(0xb78bd4);}
      bosses.push(e);if(room.id==='crypt')boss=e;
    }
  }
  for(const secret of worldMap.secrets){const mesh=createLootVisual(secret.item);mesh.position.set(secret.loot.x,0,secret.loot.z);scene.add(mesh);lootDrops.push({item:{...secret.item},mesh,age:0,nextHint:0,secret:secret.id});}
  aimPoint.set(player.body.position.x,.8,player.body.position.z-8);aimDirection.set(0,0,-1);targetRing.visible=false;heldLight.intensity=0;
  // Settle dynamic props before input begins. No simulation timers advance here.
  for(let i=0;i<35;i++)physics.step(1/120);
  syncVisuals(0);
}
function setPlayCamera(){cameraTarget.set(player.body.position.x,0,player.body.position.z-2);}
function startRun(){
  frameRate.reset();
  contextTarget=null;contextAt=-Infinity;
  sound.start();populate();
  if(location.pathname.endsWith('/movement.htm')&&new URL(location.href).searchParams.get('spawn')!=='wizard'){
    const engine=hearth.engine;engine.body.position.set(0,1.24,17.5);engine.body.velocity.set(0,0,0);engine.body.aabbNeedsUpdate=true;
    engine.yaw=engine.aimYaw=player.yaw=Math.PI;engine.facing.reset(Math.PI);engine.heart.state='piloted';engine.heart.fuel=100;
    player.body.type=CANNON.Body.KINEMATIC;player.body.collisionFilterMask=0;player.body.position.set(0,player.cy+.06,17.5);player.body.velocity.set(0,0,0);player.radius=1.22;player.invulnerable=.8;hearth.sync(0);
  }
  phase='playing';ui.start();setPlayCamera();
  ui.toast(mobile?'Άγγιξε ένα αντικείμενο, κράτησε και σύρε. Άφησε το δάχτυλο για ρίψη.':'Κάνε κλικ πάνω σε ένα αντικείμενο, κράτησε και σύρε. Άφησε το κλικ για ρίψη.','info');
  if(!save.available)ui.toast('Η πρόοδος κρατιέται για αυτή τη συνεδρία. Ο browser δεν επιτρέπει αποθήκευση.','info');
}
function togglePause(){
  if(phase==='playing'){cancelRitual();releaseHeld(false);hearth.engine.heart.firing=false;phase='paused';ui.showPause(true);}
  else if(phase==='paused'){phase='playing';ui.showPause(false);sound.start();}
}
function endRun(won,reason){
  if(phase!=='playing')return;
  cancelRitual();releaseHeld(false);phase='result';sound.sound(won?'win':'death');
  const result=save.finish({won,kills,time:runTime,shards:runShards});
  ui.showResult({...result,isNewBest:result.best,best:save.profile.best,reason},save.profile);
}
function canGrab(e){
  if(!e||e.removed||e.isPlayer||e.ally||e.reserved)return false;
  if(e.category==='prop'||e.dead)return true;
  if(e.kind==='boss'||e.kind==='heavy')return e.stun>.3||e.guardBreak>.3;
  return true;
}
function visibleLine(a,b,margin=0){
  return lineClear(a,b,nav.obstacles.filter(o=>o.y+o.h/2>1.15),margin);
}
function telekinesisReach(){return 7.8+1.5*(save.profile.upgrades.reach||0);}
function playerFloorHeight(){
  const p=player.body.position,feet=p.y-player.cy;
  return supportHeight(worldMap.floors,p.x,p.z,feet)??feet;
}
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
function aimAtPointer(info){
  if(held&&ui.getInput().shieldLatched)return;
  if(drag?.pointerType==='touch')info=mobileDragPointer({...info,pointerType:'touch'},renderer.domElement.getBoundingClientRect());
  if(player)groundPlane.constant=-(playerFloorHeight()+.8);
  if(!player||!pointerRay(info)||!raycaster.ray.intersectPlane(groundPlane,tempV))return;
  if(drag?.pointerType==='touch'){
    const carry=pointerAtHeight(info,drag.height);
    if(carry)tempV.set(carry.x+drag.offset.x,playerFloorHeight()+.8,carry.z+drag.offset.z);
  }
  aimPoint.copy(tempV);
  if(held){
    const moved=!lastAimPointer||Math.hypot(info.clientX-lastAimPointer.x,info.clientY-lastAimPointer.y)>2;
    if(moved){const picked=pickObject(info,held);aimedEnemy=picked?.category==='actor'&&!picked.dead?picked:null;lastAimPointer={x:info.clientX,y:info.clientY};}
  }
  const dx=aimPoint.x-player.body.position.x,dz=aimPoint.z-player.body.position.z;
  if(Math.hypot(dx,dz)>.35)aimDirection.set(dx,0,dz).normalize();
}
function pickObject(info,ignore=null){
  if(!pointerRay(info))return null;
  let selected=null,nearest=Infinity;
  const candidates=entities.filter(e=>e!==ignore&&!e.removed&&!e.isPlayer&&!e.ally&&!e.reserved&&e.mesh.visible);
  for(const e of candidates){
    const p=e.body.position,r=Math.hypot(e.radius,e.ext?.y||e.cy*1.3)+.3;
    if(raycaster.ray.distanceSqToPoint(new THREE.Vector3(p.x,p.y,p.z))>r*r)continue;
    // Exact current-pose bounds and intersections share the same skinned vertices.
    for(const hit of intersectVisibleAnimatedObject(raycaster,e.mesh)){
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
  if(Math.hypot(player.body.position.x-e.body.position.x,player.body.position.y-e.body.position.y,player.body.position.z-e.body.position.z)>telekinesisReach()){
    ui.toast('Πλησίασε τον στόχο για να τον αρπάξεις.','info');return false;
  }
  if(!supportSightClear(player.body.position,e.body.position,[...worldMap.colliders,...worldMap.floors])){
    ui.toast('Ένας τοίχος εμποδίζει την αρπαγή.','info');return false;
  }
  if(!canGrab(e)){ui.toast('Χτύπησέ τον με αντικείμενο για να σπάσεις την άμυνά του.','info');return false;}
  if(player.mana<7){ui.toast('Χρειάζεσαι 7 ενέργεια για αρπαγή.','info');return false;}
  globalThis.__MAGIC_PERFORMANCE__?.event('grab',{kind:e.kind});player.mana-=7;held=e;target=null;aimedEnemy=null;lastAimPointer=null;e.body.wakeUp();
  if(FIRE_ENABLED)igniteWithSpell(e);
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
  if(phase!=='playing'||!ready||drag||hearth.blocked)return false;
  const e=pickObject(info);
  if(!e)return false;
  if(held&&held!==e){ui.toast('Άφησε πρώτα αυτό που κρατάς.','info');return false;}
  const height=playerFloorHeight()+Math.max(2.1,(e.ext?.y||e.cy)+.6),point=pointerAtHeight(info,height);
  if(!point||(!held&&!holdEntity(e)))return false;
  const motion=new PointerMotion();motion.add(info.clientX,info.clientY,gestureTime(info));
  drag={pointerId:info.pointerId,pointerType:info.pointerType,clientX:info.clientX,clientY:info.clientY,height,motion,
    start:{x:info.clientX,y:info.clientY},facing:aimDirection.clone(),offset:{x:e.body.position.x-point.x,z:e.body.position.z-point.z}};
  if(info.pointerType==='touch')ui.setShieldMode(false);
  return true;
}
function moveDrag(info){
  if(phase!=='playing'||!drag||drag.pointerId!==info.pointerId)return;
  const previous=drag.motion.samples.at(-1),point={x:info.clientX,y:info.clientY,time:gestureTime(info)};
  const projected=player.body.position;contextPoint.set(projected.x,projected.y,projected.z).project(camera);
  const rect=renderer.domElement.getBoundingClientRect(),character={x:rect.left+(contextPoint.x+1)*rect.width/2,y:rect.top+(1-contextPoint.y)*rect.height/2};
  if(info.pointerType==='touch'){
    const distanceToCharacter=Math.hypot(point.x-character.x,point.y-character.y);
    if(ui.getInput().shieldLatched&&distanceToCharacter>82)ui.setShieldMode(false);
    else if(shieldGesture({type:info.pointerType,start:drag.start,previous:previous&&{...previous,time:previous.timeMs},point,character}))ui.setShieldMode(true);
    if(ui.getInput().shieldLatched)aimDirection.copy(drag.facing);
  }
  drag.clientX=info.clientX;drag.clientY=info.clientY;
  drag.motion.add(info.clientX,info.clientY,gestureTime(info));
}
function currentThrowVelocity(now=performance.now()){
  if(!held)return null;
  let motion={x:0,z:0};
  if(drag){
    const speed=drag.motion.velocity(now,true),point=pointerAtHeight(drag,drag.height);
    const before=pointerAtHeight({clientX:drag.clientX-speed.x*.1,clientY:drag.clientY-speed.y*.1},drag.height);
    // Convert pointer motion with one camera transform so camera following the
    // walking mage cannot create an accidental throwing gesture.
    if(point&&before)motion={x:(point.x-before.x)*10,z:(point.z-before.z)*10};
  }
  const power=gestureThrowVelocity(motion,aimDirection,save.profile.upgrades.grip||0).speed;
  if(aimedEnemy&&(aimedEnemy.dead||aimedEnemy.removed||distance(aimedEnemy.body.position,aimPoint)>3))aimedEnemy=null;
  throwDestination.copy(aimedEnemy?.body.position||new THREE.Vector3(aimPoint.x,playerFloorHeight()+(held.ext?.y||held.cy),aimPoint.z));
  if(!aimedEnemy&&!nav.onFloor(throwDestination.x,throwDestination.z)){
    throwDestination.copy(floorThrowTarget(throwDestination,worldMap.floors));
  }
  let velocity=aimedThrowVelocity(held.body.position,throwDestination,power,held.body.linearDamping,physics.gravity.y);
  if(aimedEnemy){
    for(let i=0;i<3;i++){
      const lead=Math.min(.75,velocity.duration),p=aimedEnemy.body.position,v=aimedEnemy.body.velocity;
      const decay=-Math.log(1-aimedEnemy.body.linearDamping),travel=decay?(1-Math.exp(-decay*lead))/decay:lead;
      throwDestination.set(p.x+v.x*travel,p.y,p.z+v.z*travel);
      velocity=aimedThrowVelocity(held.body.position,throwDestination,power,held.body.linearDamping,physics.gravity.y);
    }
  }
  return velocity;
}
function finishDrag(info){
  if(phase!=='playing'||!drag||drag.pointerId!==info.pointerId)return;
  moveDrag(info);
  if(held&&ui.getInput().shielding){drag=null;player.shielding=true;return;}
  // A weight held above a slab is placed vertically on release. Elsewhere,
  // the existing drag/throw gesture retains its normal behaviour.
  if(greekPuzzles?.dropPlateFor(held)){releaseHeld(false);return;}
  aimAtPointer(info);const velocity=currentThrowVelocity(gestureTime(info));
  if(held&&velocity)throwHeld(velocity);else drag=null;
}
function cancelDrag(){if(drag)releaseHeld(false);}
function roomSpawnPoints(room){
  const result=[];
  for(let z=room.z+2;z<room.z+room.d-1.5;z+=2.2)for(let x=room.x+2;x<room.x+room.w-1.5;x+=2.2){
    if(!nav.isFree(x,z)||distance({x,z},worldMap.spawn)<4)continue;
    if(entities.some(e=>!e.removed&&distance(e.body.position,{x,z})<e.radius+1.0))continue;
    result.push({x,z});
  }
  // Spread each room's group across its interior rather than one crowded edge.
  return result.sort((a,b)=>Math.sin(a.x*17+a.z*31)-Math.sin(b.x*17+b.z*31));
}
function ritualCandidates(){
  return selectStones(entities,player.body.position,e=>distance(e.body.position,player.body.position)<=telekinesisReach()+2
    &&visibleLine(player.body.position,e.body.position,.05));
}
function chargeRitual(stones){
  if(!ritual.begin(stones))return false;
  ritualStarted=runTime;
  for(const e of stones)e.reserved=true;
  return true;
}
function beginConjure(){
  if(phase!=='playing'||ritualPressed)return;
  ritualPressed=true;ritualPressedAt=runTime;ritualConjured=false;ritualAwaitingSeventh=false;
  if(goliath&&!goliath.removed&&!goliath.dead){ritualConjured=!!conjure();return;}
  const stones=ritualCandidates();
  if(stones.length<GOLIATH_STONES){ritualAwaitingSeventh=stones.length===GOLIATH_STONES-1;ritualConjured=!!conjure();return;}
  chargeRitual(stones);
}
function endConjure(){
  const short=ritual.phase==='charge',needsStone=!ritualConjured;
  ritualPressed=false;ritualAwaitingSeventh=false;
  if(short){cancelRitual();if(needsStone)conjure();}
  ritualConjured=false;
  // Release after the charge commits the assembly; focus/pause/cancel still
  // restores all seven stones. Repeated keydown cannot start a second ritual.
}
function restoreStone(e){
  const restore=e.assemblyRestore;
  if(restore){
    const part=assemblyCreature.parts.get(restore.part);
    for(const child of [...part.mesh.children])part.mesh.remove(child);
    part.mesh.geometry=restore.geometry;part.mesh.material=restore.material;
    e.mesh.add(part.mesh);part.mesh.position.copy(restore.localPosition);part.mesh.quaternion.copy(restore.localQuaternion);
    physics.addBody(e.body);e.body.velocity.copy(restore.velocity);e.body.angularVelocity.copy(restore.angularVelocity);
    e.mesh.visible=true;e.assemblyRestore=null;
  }
  e.reserved=false;e.expireAt+=Math.max(0,runTime-ritualStarted);
}
function cancelRitual(){
  ritualPressed=false;ritualConjured=false;ritualAwaitingSeventh=false;
  for(const e of ritual.cancel())if(!e.removed)restoreStone(e);
  assemblyCreature?.dispose();assemblyCreature=null;assemblyPlacement=null;
}
function startAssembly(){
  const p=player.body.position;
  const preferred=hearth.occupied?engineEscort(hearth.engine.body.position,hearth.engine.yaw,p,1,
    at=>goliathNav.isFree(at.x,at.z)):{x:p.x+aimDirection.x*2.7,z:p.z+aimDirection.z*2.7};
  assemblyPlacement=preferred&&freePosition(preferred,1.4,
    worldMap.floors,nav.obstacles,entities.filter(e=>!ritual.stones.includes(e)),4.2,at=>visibleLine(p,at,1.0)&&(!hearth.occupied||distance(at,hearth.engine.body.position)>3));
  if(!assemblyPlacement){cancelRitual();ui.toast('Δεν υπάρχει αρκετός ελεύθερος χώρος για Goliath.','info');return;}
  assemblyCreature=createStoneCreature();assemblyCreature.group.position.set(assemblyPlacement.x,0,assemblyPlacement.z);
  assemblyCreature.group.rotation.y=player.yaw;assemblyCreature.group.updateMatrixWorld(true);scene.add(assemblyCreature.group);
  const inverse=assemblyCreature.group.quaternion.clone().invert();
  const starts=ritual.stones.map((e,index)=>{
    if(e===held)releaseHeld(false);
    e.mesh.position.copy(e.body.position);e.mesh.quaternion.copy(e.body.quaternion);e.mesh.updateMatrixWorld(true);
    const source=e.mesh.children.find(n=>n.isMesh),name=assemblyCreature.assemblyOrder[index],part=assemblyCreature.parts.get(name);
    const worldPosition=source.getWorldPosition(new THREE.Vector3()),worldQuaternion=source.getWorldQuaternion(new THREE.Quaternion());
    e.assemblyRestore={part:name,geometry:source.geometry,material:source.material,localPosition:source.position.clone(),localQuaternion:source.quaternion.clone(),
      velocity:e.body.velocity.clone(),angularVelocity:e.body.angularVelocity.clone()};
    // Transfer each real stone's mesh identity into its articulated body part.
    for(const child of [...part.mesh.children])source.add(child);
    source.geometry=part.mesh.geometry;source.material=part.mesh.material;part.root.remove(part.mesh);part.root.add(source);part.mesh=source;
    source.userData.sourceBodyId=e.body.id;source.position.set(0,0,0);source.quaternion.identity();
    physics.removeBody(e.body);e.mesh.visible=false;
    return {position:assemblyCreature.group.worldToLocal(worldPosition),quaternion:inverse.clone().multiply(worldQuaternion)};
  });
  assemblyCreature.setAssemblyStarts(starts);assemblyCreature.assemble(0);sound.sound('grab');
}
function activateGoliath(){
  const visual=assemblyCreature,at=assemblyPlacement;assemblyCreature=null;assemblyPlacement=null;
  for(const e of ritual.stones){e.reserved=false;e.assemblyRestore=null;removeEntity(e);}
  ritual.reset();
  const body=new CANNON.Body({mass:38,material:actorMaterial,position:new CANNON.Vec3(at.x,1.67,at.z),
    fixedRotation:true,allowSleep:false,linearDamping:.3,linearFactor:new CANNON.Vec3(1,0,1),shape:new CANNON.Box(new CANNON.Vec3(.84,1.65,.62))});
  // The bodyguard walks on the flat castle floors. Overlapping actors at the
  // end of assembly must separate horizontally rather than launch it upwards.
  // A 2cm floor clearance also avoids contact normals at coplanar tile seams.
  body.collisionFilterGroup=16;
  const e={category:'actor',kind:'goliath',ally:true,isPlayer:false,visual:{group:visual.group,dispose:visual.dispose},creature:visual,mesh:visual.group,body,
    cy:1.65,radius:.95,mass:38,hp:GOLIATH_HEALTH,maxHp:GOLIATH_HEALTH,speed:4.6,label:'Goliath',yaw:visual.group.rotation.y,
    removed:false,dead:false,stun:0,hitFlash:0,guardBreak:0,attackPulse:0,windup:0,thrownUntil:0,collisionTimes:new Map(),path:[],pathTick:0,
    expires:runTime+GOLIATH_LIFETIME,healthBar:createHealthBar(),strikeTime:0,strikeCooldown:0,strikeTarget:null,strikeSide:1};
  body.entity=e;physics.addBody(body);entities.push(e);goliath=e;globalThis.__MAGIC_PERFORMANCE__?.event('goliath');
  ui.toast('Ο Goliath είναι στο πλευρό σου.','success');fx.ring(body.position,0x8bffda,2,.5);
}
function updateRitual(dt){
  if(ritual.phase==='idle'){
    if(!ritualPressed||goliath&&!goliath.removed&&!goliath.dead||runTime-ritualPressedAt<.15)return;
    let stones=ritualCandidates();
    // A held press can create the seventh stone, including after mana recovers.
    // A short tap still creates only one stone; key repeat never creates more.
    if(ritualAwaitingSeventh&&!ritualConjured&&stones.length===GOLIATH_STONES-1&&!held
      &&player.mana>=16&&activeStones(entities).length<STONE_LIMIT){ritualConjured=!!conjure();stones=ritualCandidates();}
    if(stones.length<GOLIATH_STONES||!chargeRitual(stones))return;
  }
  const valid=ritual.stones.every(e=>!e.removed&&!e.pendingBreak&&(ritual.phase!=='charge'||
    distance(e.body.position,player.body.position)<=telekinesisReach()+2&&visibleLine(player.body.position,e.body.position,.05)))&&!player.dead;
  const transition=ritual.tick(dt,valid);
  if(transition==='cancelled'){cancelRitual();if(!player.dead)ui.toast('Οι 7 πέτρες πρέπει να μείνουν κοντά και χωρίς τοίχο ανάμεσα. Πλησίασε και ξανακράτησε R / ΠΕΤΡΑ.','info');return;}
  if(transition==='assemble'&&!assemblyCreature)startAssembly();
  if(assemblyCreature){assemblyCreature.assemble(ritual.elapsed);castTime=.2;if(ritual.elapsed>=assemblyCreature.assembly.duration)activateGoliath();}
}
function updateGoliath(e,dt){
  if(e.dead)return;
  if(runTime>=e.expires){e.dead=true;e.deathTime=runTime;physics.removeBody(e.body);ui.toast('Ο δεσμός του Goliath ολοκληρώθηκε.','info');return;}
  const p=e.body.position,pp=player.body.position;
  const threat=entities.filter(n=>n!==held&&n.category==='actor'&&!n.isPlayer&&!n.ally&&!n.dead&&!n.removed&&n.aggro&&distance(n.body.position,pp)<12
    &&visibleLine(pp,n.body.position,.1)).sort((a,b)=>distance(a.body.position,pp)-distance(b.body.position,pp))[0];
  let destination={x:pp.x+aimDirection.x*2.2,z:pp.z+aimDirection.z*2.2};
  if(threat){const t=threat.body.position,d=distance(pp,t)||1;destination={x:pp.x+(t.x-pp.x)/d*Math.min(2.5,d*.55),z:pp.z+(t.z-pp.z)/d*Math.min(2.5,d*.55)};}
  const escorting=hearth.occupied;
  // Only exclude the friendly engine group. Walls, props and enemies still collide.
  e.body.collisionFilterMask=escorting?~8:-1;
  if(escorting){
    const slot=engineEscort(hearth.engine.body.position,hearth.engine.yaw,p,e.escortSide,
      at=>goliathNav.isFree(at.x,at.z)&&entities.every(n=>n===e||n.isPlayer||n.removed||n.category!=='prop'||distance(n.body.position,at)>n.radius+1),threat?.body.position);
    destination=slot||{x:p.x,z:p.z};if(slot)e.escortSide=slot.side;
  }
  if(e.escorting!==escorting){e.escorting=escorting;e.pathTick=0;e.path=[];}
  e.strikeCooldown=Math.max(0,e.strikeCooldown-dt);
  const facing=threat?Math.atan2(Math.sin(Math.atan2(threat.body.position.x-p.x,threat.body.position.z-p.z)-e.yaw),Math.cos(Math.atan2(threat.body.position.x-p.x,threat.body.position.z-p.z)-e.yaw)):Math.PI;
  if(!e.strikeTime&&threat&&Math.abs(facing)<.6&&Math.abs(threat.body.position.y-p.y)<1.8&&distance(p,threat.body.position)<2.3&&e.strikeCooldown<=0&&visibleLine(p,threat.body.position,.05)){
    e.strikeTime=.0001;e.strikeTarget=threat;e.strikeHit=false;e.strikeSide*=-1;
  }
  if(e.strikeTime){
    e.strikeTime+=dt;const victim=e.strikeTarget;
    if(e.strikeTime>=.59&&!e.strikeHit){
      e.strikeHit=true;
      if(victim&&victim!==held&&!victim.dead&&!victim.removed&&Math.abs(victim.body.position.y-p.y)<1.8&&distance(p,victim.body.position)<2.65&&visibleLine(p,victim.body.position,.05)){
        hurt(victim,34,p);victim.stun=Math.max(victim.stun,.45);victim.guardBreak=2;
        fx.burst(victim.body.position,0xafffd8,16,2.5);fx.ring(p,0x8bffda,1.5,.25);sound.sound('impact');
      }
    }
    if(e.strikeTime>=1.14){e.strikeTime=0;e.strikeTarget=null;e.strikeCooldown=.6;}
  }
  if(e.pathTick<=0){
    e.path=pathAroundProps(goliathNav,p,destination,hearth.engine?[...entities,{category:'prop',body:hearth.engine.body}]:entities);e.pathTick=.45;
  }e.pathTick-=dt;
  while(e.path.length&&distance(p,e.path[0])<.5)e.path.shift();
  const to=e.path[0],d=to?distance(p,to):0,speed=e.strikeTime||distance(p,destination)<.8?0:e.speed;
  const k=Math.min(1,dt*7);
  e.body.velocity.x+=((to&&d?(to.x-p.x)/d*speed:0)-e.body.velocity.x)*k;
  e.body.velocity.z+=((to&&d?(to.z-p.z)/d*speed:0)-e.body.velocity.z)*k;
  const look=e.strikeTarget?.body.position||threat?.body.position||{x:pp.x+aimDirection.x*8,z:pp.z+aimDirection.z*8};
  e.yaw=turnToward(e.yaw,Math.atan2(look.x-p.x,look.z-p.z),dt*4);e.protecting=!!threat;
}
function conjure(){
  if(held)return;
  if(activeStones(entities).length>=STONE_LIMIT){ui.toast('Όριο 10 πετρών · πλησίασε 7 πέτρες και κράτησε R / ΠΕΤΡΑ.','info');return;}
  if(player.mana<16){ui.toast('Χρειάζεσαι 16 ενέργεια για να καλέσεις πέτρα.','info');return;}
  const p=player.body.position,from={x:p.x,y:1.2,z:p.z};
  const point=constrainDragPoint(from,{x:p.x+aimDirection.x*1.6,y:1.2,z:p.z+aimDirection.z*1.6},worldMap.colliders,.6,.5);
  globalThis.__MAGIC_PERFORMANCE__?.event('stone');player.mana-=16;const e=prop('stone',point.x,point.z,{y:point.y,mass:2,ephemeral:true});
  fx.burst(e.body.position,0x8bffda,25,1.6);fx.ring(e.body.position,0x8bffda,1.1,.4);sound.sound('grab');
  ui.toast(mobile?'Άγγιξε την πέτρα και σύρε την.':'Πιάσε την πέτρα με κλικ και σύρε την.','info');
  return e;
}
function releaseHeld(thrown){
  drag=null;
  ui.setShieldMode(false);
  if(!held)return;
  const e=held;held=null;
  if(player)player.shielding=false;
  e.body.collisionFilterMask=-1;
  if(e.category==='actor'){e.stun=thrown?2.5:1;e.body.fixedRotation=false;e.body.updateMassProperties();}
  if(!thrown){e.body.velocity.set(0,0,0);e.body.angularVelocity.set(0,0,0);e.thrownUntil=0;}
  if(e.ephemeral)e.expireAt=runTime+(thrown?8:18);
  heldLight.intensity=0;fx.connect(null);
}
function throwHeld(v=currentThrowVelocity()){
  if(!held||!v)return;
  if(!hearth.throw()){ui.toast('Η καρδιά δεν έχει αρκετή φωτιά για ρίψη.','info');return;}
  globalThis.__MAGIC_PERFORMANCE__?.event('throw',{kind:held.kind});const e=held,p=e.body.position;
  const speed=Math.hypot(v.x,v.z)||1;
  releaseHeld(true);e.body.velocity.set(v.x,v.y,v.z);e.body.angularVelocity.set(-v.z/speed*4,2,v.x/speed*4);
  e.thrownUntil=runTime+4;e.thrownBy='player';e.body.wakeUp();
  castTime=.35;sound.sound('throw');shake=Math.max(shake,.12);fx.burst(p,0x9bffda,18,2.7);
}
function updateHeld(dt,input){
  if(!held)return;
  if(held.removed||distance(player.body.position,held.body.position)>telekinesisReach()+3){releaseHeld(false);return;}
  player.shielding=!!input.shielding;
  const e=held,amount=player.shielding?1.1:1.8,floorY=playerFloorHeight();
  let desired=new THREE.Vector3(player.body.position.x+aimDirection.x*amount,
    floorY+(player.shielding?1.35:2.1+Math.sin(worldTime*3)*.1),player.body.position.z+aimDirection.z*amount);
  if(drag&&!player.shielding){
    const point=pointerAtHeight(mobileDragPointer(drag,renderer.domElement.getBoundingClientRect()),drag.height);
    if(point)desired={x:point.x+drag.offset.x,y:drag.height,z:point.z+drag.offset.z};
  }
  desired=clampDragPoint(desired,player.body.position,telekinesisReach());
  desired=constrainDragPoint(e.body.position,desired,worldMap.colliders,e.radius+.05,e.ext?.y||e.cy);
  const placement=!player.shielding&&greekPuzzles?.dropPlateFor(e,desired);
  if(placement){desired.x=placement.x;desired.z=placement.z;desired.y=(placement.y??0)+.98;}
  const b=e.body,pos=b.position;
  b.velocity.set(clamp((desired.x-pos.x)*15,-28,28),clamp((desired.y-pos.y)*15+1.3,-20,20),clamp((desired.z-pos.z)*15,-28,28));
  if(player.shielding){b.quaternion.setFromEuler(0,player.yaw,0);b.angularVelocity.set(0,0,0);}
  else b.angularVelocity.set(.18,.75,.12);
  if(placement){b.quaternion.slerp(new CANNON.Quaternion(),1-Math.exp(-dt*12),b.quaternion);b.angularVelocity.set(0,0,0);}
  b.wakeUp();e.stun=1;
  player.mana=Math.max(0,player.mana-dt*(3.8+e.mass*.25));
  if(player.mana<=0){releaseHeld(false);ui.toast('Η ενέργεια εξαντλήθηκε — άφησες τον στόχο.','info');return;}
  heldLight.position.copy(pos);heldLight.intensity=3.5;
  const from={x:player.body.position.x+aimDirection.x*.5,y:floorY+1.35,z:player.body.position.z+aimDirection.z*.5};
  if(hearth.mounted){const p=hearth.engine.visual.point('hand_L');Object.assign(from,{x:p.x,y:p.y,z:p.z});}
  fx.connect(from,pos,worldTime);
  if(Math.random()<dt*22)fx.burst(pos,0x78ffd0,1,.4);
}
function pulse(){
  if(hearth.occupied){if(hearth.stomp())globalThis.__MAGIC_PERFORMANCE__?.event('engine_stomp');return;}
  if(player.pulseCooldown>0||player.mana<25)return;
  globalThis.__MAGIC_PERFORMANCE__?.event('pulse');player.mana-=25;player.pulseCooldown=5.2*(1-player.gear.cooldown);castTime=.4;
  applyPulse(player.body.position,false);
}
function applyPulse(p,stomp){
  const radius=4.6+.65*(save.profile.upgrades.pulse||0);
  fx.ring(p,0x92ffe0,radius,.5);fx.burst({x:p.x,y:1,z:p.z},0x9cffdf,65,7);
  if(!stomp)sound.sound('pulse');shake=stomp?.5:.3;
  for(const e of entities){
    if(e.removed||e.isPlayer||e.ally||e.reserved||e===held)continue;
    const d=distance(p,e.body.position);
    if(d>radius||!visibleLine(p,e.body.position,.03))continue;
    const dx=(e.body.position.x-p.x)/(d||1),dz=(e.body.position.z-p.z)/(d||1);
    e.body.wakeUp();e.body.velocity.x+=dx*9;e.body.velocity.z+=dz*9;e.body.velocity.y+=3;
    e.thrownBy='player';e.thrownUntil=runTime+2;
    if(e.category==='actor'&&!e.dead){hurt(e,(18+5*(save.profile.upgrades.pulse||0))*(1+player.gear.damage),p);e.stun=Math.max(e.stun,1.3);e.guardBreak=2.3;e.windup=0;}
  }
}
function dash(input){
  if(hearth.occupied)return;
  if(player.dashCooldown>0||player.mana<12)return;
  globalThis.__MAGIC_PERFORMANCE__?.event('dash');player.mana-=12;player.dashTime=.19;player.invulnerable=.3;player.dashCooldown=(2.8-.55*(save.profile.upgrades.dash||0))*(1-player.gear.cooldown);
  const dx=input.moveX||0,dz=input.moveZ||0,len=Math.hypot(dx,dz);
  player.dashDirection.set(len?dx/len:aimDirection.x,0,len?dz/len:aimDirection.z);
  sound.sound('dash');fx.ring(player.body.position,0x81ffda,1.7,.23);
}
function interact(targetKind){
  if((!targetKind||targetKind==='engine')&&hearth.interact(runTime))return;
  const p=player.body.position;
  if(!relicTaken&&distance(p,worldMap.relic.position)<3){
    if(entities.some(e=>e.kind==='boss'&&!e.dead&&!e.removed)){ui.toast('Νίκησε και τους τέσσερις φύλακες για να ελευθερώσεις το Σκήπτρο.','info');return;}
    relicTaken=true;alarmTime=runTime;nextWave=runTime+14;runShards+=5;
    worldMap.setRelicTaken(true);worldMap.setAlarm(true);
    sound.sound('relic');fx.ring(worldMap.relic.position,0xffca82,6,.9);shake=.4;
    ui.toast('ΤΟ ΣΚΗΠΤΡΟ ΕΙΝΑΙ ΔΙΚΟ ΣΟΥ. Γύρισε στην πύλη!','success');
    spawnReinforcements();return;
  }
  if(relicTaken&&distance(p,worldMap.exit.position)<2.8){endRun(true,'Το Μαύρο Σκήπτρο είναι ελεύθερο.');return;}
  ui.toast(relicTaken?'Η πύλη βρίσκεται νότια, από εκεί που μπήκες.':'Βρες το Σκήπτρο στην κρύπτη, βόρεια.','info');
}
function absorbFire(){
  if(hearth.blocked||!fireSpell.take(player,(a,b)=>visibleLine(a,b,.01),held,runTime))return;
  globalThis.__MAGIC_PERFORMANCE__?.event('fire_absorb');worldMap.setTorchLit(fireSpell.torch.id,false);castTime=.45;sound.sound('fireTake');fx.burst(fireSpell.torch.position,0xffb44a,15,1.2);
}
function spawnReinforcements(){
  const room=rooms.find(r=>player.body.position.x>=r.x&&player.body.position.x<=r.x+r.w&&player.body.position.z>=r.z&&player.body.position.z<=r.z+r.d);
  if(!room||room.id==='courtyard'||room.id==='bridge'||livingEnemies()+reinforcements.length>=ENEMY_LIMIT)return;
  const doors=worldMap.doorways.filter(d=>d.rooms.includes(room.id));
  let added=0;
  for(const door of doors.slice(0,3)){
    const p=freePosition(door,.65,worldMap.floors,nav.obstacles,entities,2.4,at=>enemySpawnAllowed(at,worldMap.zones,worldMap.spawn));
    if(!p||distance(p,player.body.position)<3.5||reinforcements.some(w=>distance(w,p)<2))continue;
    reinforcements.push({...p,at:runTime+2.5,room:room.id});added++;fx.ring({x:p.x,y:.05,z:p.z},0xe4a37e,1,2.5);
  }
  if(added)ui.toast('Βήματα στις εισόδους · έρχονται ενισχύσεις.','danger');
}
function livingEnemies(){return entities.filter(e=>e.category==='actor'&&!e.isPlayer&&!e.ally&&!e.dead&&!e.removed).length;}
function updateReinforcements(){
  const room=rooms.find(r=>player.body.position.x>=r.x&&player.body.position.x<=r.x+r.w&&player.body.position.z>=r.z&&player.body.position.z<=r.z+r.d);
  if(room&&!enteredRooms.has(room.id)){enteredRooms.add(room.id);if(room.id!=='courtyard'&&room.id!=='bridge')spawnReinforcements();}
  for(let i=reinforcements.length-1;i>=0;i--){const w=reinforcements[i];if(runTime<w.at)continue;reinforcements.splice(i,1);
    if(livingEnemies()>=ENEMY_LIMIT)continue;
    const p=freePosition(w,.65,worldMap.floors,nav.obstacles,entities,1.2,at=>enemySpawnAllowed(at,worldMap.zones,worldMap.spawn));
    if(!p||distance(p,player.body.position)<2.5)continue;
    const e=actor(i%3===1?'archer':'guard',p.x,p.z);e.aggro=true;e.room=w.room;fx.burst(e.body.position,0xe2a47d,20,2);
  }
}
function interruptChannel(e){if(e.channel>0){e.channel=0;e.channelCooldown=4;e.channelRing?.removeFromParent();e.channelRing?.geometry.dispose();e.channelRing?.material.dispose();e.channelRing=null;}}
function startChannel(e){
  e.channel=.0001;e.channelCooldown=CHANNEL_COOLDOWN;e.windup=0;e.body.velocity.x=e.body.velocity.z=0;
  e.channelRing=new THREE.Mesh(new THREE.RingGeometry(1.7,1.78,48),new THREE.MeshBasicMaterial({color:0xc192ed,transparent:true,opacity:.65,side:THREE.DoubleSide,depthWrite:false}));
  e.channelRing.rotation.x=-Math.PI/2;scene.add(e.channelRing);
  ui.toast(e.label+' καλεί ενισχύσεις · χτύπα για διακοπή.','danger');
}
function finishChannel(e){
  interruptChannel(e);e.channelCooldown=CHANNEL_COOLDOWN;
  for(const minion of e.minions)if(minion.dead||minion.removed)e.minions.delete(minion);
  const count=Math.min(3,MINION_LIMIT-e.minions.size,ENEMY_LIMIT-livingEnemies());
  for(let i=0;i<count;i++){
    const a=i*Math.PI*2/3,origin={x:e.body.position.x+Math.sin(a)*2.6,z:e.body.position.z+Math.cos(a)*2.6};
    const p=supportedSpawn({...origin,y:e.body.position.y-e.cy},.65,2,worldMap.floors,worldMap.colliders,entities,4.2,at=>enemySpawnAllowed(at,worldMap.zones,worldMap.spawn)&&distance(at,player.body.position)>=2&&supportSightClear(e.body.position,{x:at.x,y:at.y+1,z:at.z},[...worldMap.colliders,...worldMap.floors]));if(!p)continue;
    const m=actor(['stone-minion','archer','heavy'][i],p.x,p.z);m.aggro=true;m.room=e.room;m.summoner=e;e.minions.add(m);
    fx.ring(m.body.position,0xc192ed,1.6,.8);fx.burst(m.body.position,0xc192ed,28,3);
  }
  sound.sound('relic');
}

function fireLineClear(a,b){return fireSight(a,b,nav.obstacles);}
function igniteWithSpell(e){
  if(!fireSpell.ignite(e,runTime))return false;
  const p=e.body?.position||e.position;fx.burst(p,0xffa43d,12,1.1);sound.sound('fireIgnite');return true;
}
function fireTarget(input){
  if(held?.flammable)return held;
  if(target?.flammable)return target;
  if(!input.pointerActive||!pointerRay({clientX:input.pointerX,clientY:input.pointerY}))return null;
  const meshes=[...new Set(worldMap.woodenSurfaces.map(w=>w.mesh))];
  for(const hit of raycaster.intersectObjects(meshes,false)){
    const wood=worldMap.woodenSurfaces.find(w=>w.mesh===hit.object&&w.index===hit.instanceId);
    if(wood)return wood;
  }
  return null;
}
function takeFire(input){
  const wood=fireTarget(input),p=wood?.body?.position||wood?.position;
  if(fireSpell.charged&&wood&&distance(player.body.position,p)<=telekinesisReach()&&fireLineClear(player.body.position,p)){
    igniteWithSpell(wood);return;
  }
  if(!fireSpell.take(player,fireLineClear,held,runTime,aimPoint)){
    ui.toast(fireSpell.charged?'Στόχευσε ξύλο ή σήκωσέ το για να το ανάψεις.':'Πλησίασε έναν αναμμένο πυρσό ή πύρινο πυλώνα.','info');return;
  }
  worldMap.setTorchLit(fireSpell.torch.id,fireSpell.torch.lit);castTime=.45;
  fx.burst(fireSpell.torch.position,0xffb44a,15,1.2);sound.sound('fireTake');
}
function updateFire(){
  if(held)igniteWithSpell(held);
  for(const contact of physics.contacts){spreadFire(contact.bi.entity,contact.bj.entity,runTime);spreadFire(contact.bj.entity,contact.bi.entity,runTime);}
  // Physical contact with a flame lights wood even without drawing it first.
  for(const e of entities)if(e.flammable&&!e.removed&&!(e.burnUntil>runTime)&&!e.woodExhausted){
    for(const s of fireSpell.sources)if(s.lit){
      tempV.copy(s.position).sub(e.body.position);tempQ.copy(e.body.quaternion).invert();tempV.applyQuaternion(tempQ);
      const gap=Math.hypot(Math.max(0,Math.abs(tempV.x)-e.ext.x),Math.max(0,Math.abs(tempV.y)-e.ext.y),Math.max(0,Math.abs(tempV.z)-e.ext.z));
      if(gap<.3){spreadFire({burnUntil:runTime+1},e,runTime);break;}
    }
  }
  for(const e of entities)if(!e.removed){
    if(e.flammable){
      e.hp-=consumeWoodDamage(e,runTime);if(e.hp<=1e-6)e.pendingBreak=true;
      if(e.burnLastTime!==undefined)e.mesh.traverse(o=>{if(o.userData.ownedFireMaterial)o.material.color.copy(o.material.userData.baseColor).lerp(new THREE.Color(0x171311),1-(e.woodFuel??1));});
    }else if(e.category==='actor'&&!e.dead&&!e.isPlayer){const damage=consumeBurnDamage(e,runTime);if(damage)hurt(e,damage,null,true);}
  }
  for(const wood of worldMap.woodenSurfaces)if(wood.burnLastTime!==undefined){consumeWoodDamage(wood,runTime);worldMap.scorchWood(wood);}
  if(runTime-fireLastSpark>.12){fireLastSpark=runTime;for(const e of entities)if(!e.removed&&e.burnUntil>runTime)fx.burst(e.body.position,0xffa13a,1,.45);}
}
function impact(e,event){
  if(FIRE_ENABLED){spreadFire(e,event.body.entity,runTime);spreadFire(event.body.entity,e,runTime);}
  if(phase!=='playing'||e.removed||e===held||e.reserved)return;
  const other=event.body.entity;
  const speed=Math.abs(event.contact.getImpactVelocityAlongNormal());
  if(speed<4.2||e.thrownBy!=='player'||e.thrownUntil<runTime)return;
  const key=event.body.id;
  if((e.collisionTimes.get(key)||-10)>runTime-.45)return;
  e.collisionTimes.set(key,runTime);
  if(other&&!other.removed&&!other.isPlayer&&!other.ally&&!other.reserved){
    const damage=impactDamage(speed,e.mass,save.profile.upgrades.grip||0)*(1+player.gear.damage);
    if(FIRE_ENABLED&&e.flammable&&e.burnUntil>runTime&&other.category==='actor')fireSpell.hit={time:runTime,target:other.kind,bossType:other.bossType,impactDamage:damage,hpBefore:other.hp};
    if(other.category==='actor'&&!other.dead){hurt(other,damage,e.body.position);other.stun=Math.max(other.stun,.65);other.guardBreak=2.6;}
    if(e.fireSampleCrate&&e.burnUntil>runTime&&other.category==='actor'&&!other.dead)igniteActor(other,runTime);
    if(other.category==='prop'&&!other.indestructible){
      other.hp-=damage*.55;other.thrownBy='player';other.thrownUntil=runTime+2;
      if(other.hp<=0&&other.kind!=='shield'&&other.kind!=='stone')other.pendingBreak=true;
    }
  }
  if(e.category==='actor'&&!e.dead&&speed>6.5){hurt(e,speed*3,e.body.position);e.guardBreak=2.2;}
  if(e.category==='prop'&&!e.indestructible){
    e.hp-=propSelfDamage(speed,e.ephemeral);
    if(e.hp<=0&&(e.kind!=='stone'||e.ephemeral))e.pendingBreak=true;
  }
  if(speed>5.5){fx.burst(e.body.position,0xc0dec0,Math.min(35,Math.round(speed*2)),3.5);sound.sound('impact');shake=Math.max(shake,Math.min(.35,speed*.012));}
}
function hurt(e,amount,origin,isBurn=false){
  if(e.indestructible||e.removed||e.dead||phase!=='playing')return;
  if(e.kind==='boss')interruptChannel(e);
  if(e.isPlayer){
    amount*=1-(e.gear?.armor||0);
    if(e.invulnerable>0)return;
    if(held&&player.shielding&&origin){
      const facing=(origin.x-e.body.position.x)*aimDirection.x+(origin.z-e.body.position.z)*aimDirection.z;
      if(facing>0)amount*=.2;
    }
    if(hearth.mounted)amount*=.45;
    e.invulnerable=.62;shake=.3;sound.sound('hurt');
    fx.number(e.body.position,'−'+Math.round(amount),'#ffae99');
    fx.burst(e.body.position,0xff9d85,14,2);
  }else{
    if(isBurn?.damageLabel!==false)fx.number(e.body.position,Number.isFinite(isBurn?.damageLabel)?isBurn.damageLabel:Math.round(amount),undefined,Number.isFinite(isBurn?.damageLabel)?e:null);
    e.body.wakeUp();
    e.aggro=true;e.stun=Math.max(e.stun,.28);e.windup=0;
    e.hitFlash=.1;
    if(e.bossType&&!isBurn){e.bossAttack=null;e.bossTime=0;e.attackCooldown=Math.max(e.attackCooldown,1.2);if(amount>=35){e.stun=Math.max(e.stun,.65);e.guardBreak=Math.max(e.guardBreak,1.6);}}
  }
  e.hp=e.isPlayer&&benchmarkMode?e.maxHp:Math.max(0,e.hp-amount);
  if(origin&&!e.isPlayer){
    const push=knockbackXZ(e.body.position,origin);
    e.body.velocity.x+=push.x;e.body.velocity.z+=push.z;
  }
  if(e.hp>0)return;
  e.dead=true;e.deathTime=runTime;e.stun=0;e.windup=0;e.body.linearDamping=.7;
  if(e.stoneCombat){cancelStoneCombat(e.stoneCombat);e.body.collisionFilterMask=GROUP.WORLD;}
  if(e.isPlayer){endRun(false,'Οι φύλακες σε σταμάτησαν. Η επόμενη εισβολή σε περιμένει.');return;}
  if(e.ally){physics.removeBody(e.body);ui.toast('Ο Goliath έπεσε προστατεύοντάς σε.','info');return;}
  kills++;combo=runTime<comboUntil?combo+1:1;comboUntil=runTime+4;
  const reward=e.kind==='boss'?5:e.kind==='heavy'?2:1;
  spawnPickup(e.body.position,reward);
  spawnLoot(e);
  fx.burst(e.body.position,e.kind==='boss'?0xe8be84:0x9dffc9,e.kind==='boss'?65:25,3.5);
  if(e.kind==='boss'){const remaining=entities.filter(a=>a.kind==='boss'&&!a.dead&&!a.removed).length;ui.toast(remaining?`${e.label} έπεσε · απομένουν ${remaining} φύλακες.`:'Οι φύλακες έπεσαν. Πάρε το Σκήπτρο με '+(mobile?'ΧΡΗΣΗ':'E')+'.','success');sound.sound('relic');}
  else if(combo>1){sound.sound('pickup');}
}
function spawnPickup(p,value){
  const mesh=new THREE.Mesh(new THREE.OctahedronGeometry(.16,0),new THREE.MeshStandardMaterial({color:0xd7df9f,emissive:0xbefbb7,emissiveIntensity:2,roughness:.3,metalness:.4}));
  mesh.position.set(p.x,.65,p.z);scene.add(mesh);pickups.push({mesh,value,age:0});
}
function spawnLoot(enemy){
  const item=rollLoot(enemy.kind),at=freePosition(enemy.body.position,.3,worldMap.floors,nav.obstacles,[],3)||enemy.spawn;
  const mesh=createLootVisual(item);mesh.position.set(at.x,0,at.z);scene.add(mesh);lootDrops.push({item,mesh,age:0,nextHint:0});
}
function updateLoot(dt){
  for(let i=lootDrops.length-1;i>=0;i--){
    const drop=lootDrops[i];drop.age+=dt;const d=distance(player.body.position,drop.mesh.position);
    drop.mesh.visible=d<26;drop.mesh.userData.sprite.position.y=.7+Math.sin(drop.age*3)*.06;
    if(d>1.25||!visibleLine(player.body.position,drop.mesh.position,.03))continue;
    if(save.acquire(drop.item)){
      ui.toast(`${itemName(drop.item)} · Lv ${drop.item.level}`,'success');sound.sound('pickup');fx.burst(drop.mesh.position,new THREE.Color(TIERS[drop.item.level].color).getHex(),9,1.5);
      drop.mesh.removeFromParent();lootDrops.splice(i,1);
    }else if(runTime>=drop.nextHint){drop.nextHint=runTime+8;ui.toast('Ο σάκος γέμισε. Άνοιξε I / ΣΑΚΟΣ και διάλυσε εξοπλισμό. Το drop μένει στο έδαφος.','info');}
  }
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
function fireArrow(e,victim=e.victim||player){
  if(victim.dead||victim.removed)return;
  const p=e.body.position,pp=victim.body.position;
  const from=new THREE.Vector3(p.x,1.35,p.z),to=new THREE.Vector3(pp.x,victim.ally?1.7:1,pp.z);
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
      for(const e of [...entities].sort((e,f)=>distance(e.body.position,a.previous)-distance(f.body.position,a.previous))){
        if(e.removed||e===a.owner||(e.dead&&e!==held))continue;
        if(e.reserved||e.category==='actor'&&!e.isPlayer&&!e.ally&&e!==held)continue;
        const p=e.body.position;
        if(pointSegmentDistance(p,a.previous,a.mesh.position)<e.radius+.12&&Math.abs(a.mesh.position.y-p.y)<(e.ext?.y||(e.ally?1.65:.85))){
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
  const victim=e.victim||player;if(victim.dead||victim.removed){e.attackCooldown=.4;return;}
  if(e.stoneCombat){
    // Sample the actual authored fingertip at contact, not a generic2m disk.
    e.mesh.position.set(e.body.position.x,e.body.position.y-e.cy,e.body.position.z);e.mesh.rotation.set(0,e.yaw,0);
    e.visual.pose(e.stoneCombat.side>0?'ClawRight':'ClawLeft',STONE_MINION.contact);
    const claw=e.visual.clawPosition(e.stoneCombat.side>0?'r':'l',tempV);
    if(claw&&Math.hypot(claw.x-victim.body.position.x,claw.z-victim.body.position.z)<victim.radius+.12
      &&Math.abs(claw.y-victim.body.position.y)<victim.cy+.1&&visibleLine(e.body.position,victim.body.position,.08)&&visibleLine(claw,victim.body.position,.04))hurt(victim,STONE_MINION.damage,e.body.position);
    e.attackCooldown=STONE_MINION.cooldown;return;
  }
  if(e.kind==='archer'){fireArrow(e,victim);e.attackCooldown=2.8;return;}
  const d=distance(e.body.position,victim.body.position);
  if(e.kind==='boss'&&e.attackType==='wave'){
    const r=4.1;fx.ring(e.body.position,0xe8a178,r,.55);fx.burst(e.body.position,0xffb786,35,5);
    for(const target of [player,goliath])if(target&&!target.dead&&!target.removed&&distance(e.body.position,target.body.position)<r&&visibleLine(e.body.position,target.body.position,.05))hurt(target,24,e.body.position);
    for(const prop of entities){if(prop.category==='prop'&&!prop.removed&&!prop.reserved&&prop!==held&&distance(prop.body.position,e.body.position)<r){
      const pd=distance(prop.body.position,e.body.position)||1;prop.body.wakeUp();prop.body.velocity.x+=(prop.body.position.x-e.body.position.x)/pd*5;prop.body.velocity.z+=(prop.body.position.z-e.body.position.z)/pd*5;}}
    e.attackCooldown=3.4;sound.sound('pulse');return;
  }
  const reach=e.kind==='boss'?2.8:e.kind==='heavy'?2.6:2;
  if(d<reach&&visibleLine(e.body.position,victim.body.position,.08)){
    hurt(victim,e.kind==='boss'?24:e.kind==='heavy'?18:11,e.body.position);
  }
  e.attackCooldown=e.kind==='boss'?1.8:e.kind==='heavy'?2.0:1.3;
}
function updateBossEnemy(e,dt){
  if(e.dead||e.removed)return;
  const victim=e.bossAttack?e.victim:bodyguardTarget(e,player,goliath,visibleLine);
  if(!victim||victim.dead||victim.removed)return;
  const def=BOSS_DEFINITIONS[e.bossType],p=e.body.position,pp=victim.body.position;
  e.attackCooldown=Math.max(0,e.attackCooldown-dt);e.pathTick-=dt;e.guardBreak=Math.max(0,e.guardBreak-dt);
  if(e===held){interruptChannel(e);e.bossAttack=null;e.windup=0;return;}
  if(e.thrownUntil>runTime&&p.y>e.cy+.5){e.windup=0;e.bossAttack=null;return;}
  const roomMargin=e.radius+.1;
  if(!insideBossRoom(p,e.room,roomMargin)){
    p.x=clamp(p.x,e.room.xMin+roomMargin,e.room.xMax-roomMargin);p.z=clamp(p.z,e.room.zMin+roomMargin,e.room.zMax-roomMargin);
    if(!nav.isFree(p.x,p.z)){p.x=e.spawn.x;p.z=e.spawn.z;}
    e.body.aabbNeedsUpdate=true;e.body.velocity.x=e.body.velocity.z=0;e.pathTick=0;
  }
  if(e.stun>0){interruptChannel(e);e.bossAttack=null;e.windup=0;e.bossStaggerTime=(e.bossStaggerTime||0)+dt;return;}
  e.bossStaggerTime=0;
  const sameRoom=insideBossRoom(pp,e.room),d=distance(p,pp),sight=visibleLine(p,pp,.12);
  e.aggro=sameRoom&&d<12;
  if(!sameRoom){interruptChannel(e);e.bossAttack=null;e.bossClip='Idle';e.windup=0;e.body.velocity.x*=.8;e.body.velocity.z*=.8;return;}
  e.body.wakeUp();
  e.channelCooldown=Math.max(0,e.channelCooldown-dt);
  if(e.channel>0){
    e.channel+=dt;e.body.velocity.x=e.body.velocity.z=0;e.bossClip='Idle';
    e.channelRing.position.set(p.x,.07,p.z);e.channelRing.scale.setScalar(.8+.4*e.channel/CHANNEL_DURATION);e.channelRing.rotation.z+=dt;
    if(e.channel>=CHANNEL_DURATION)finishChannel(e);return;
  }
  if(!e.bossAttack&&e.channelCooldown<=0&&[...e.minions].filter(m=>!m.dead&&!m.removed).length<MINION_LIMIT&&livingEnemies()<ENEMY_LIMIT&&d<12&&sight&&e.guardBreak<=0){startChannel(e);return;}
  if(!e.bossAttack)e.yaw=turnToward(e.yaw,Math.atan2(pp.x-p.x,pp.z-p.z),dt*4);
  if(e.bossAttack){
    const a=e.bossAttack,previous=e.bossTime;e.bossTime+=dt;e.windup=Math.max(0,a.hit-e.bossTime);e.windupMax=a.hit;
    if(a.clip==='Dive'&&e.bossTime>.75&&e.bossTime<a.hit){
      const dx=e.bossAim.x-p.x,dz=e.bossAim.z-p.z,len=Math.hypot(dx,dz)||1;
      const next={x:p.x+dx/len*.45,z:p.z+dz/len*.45};
      if(insideBossRoom(next,e.room,.85)&&nav.isFree(next.x,next.z)){e.body.velocity.x=dx/len*Math.min(4.5,len*5);e.body.velocity.z=dz/len*Math.min(4.5,len*5);}else{e.body.velocity.x=e.body.velocity.z=0;}
    }else{e.body.velocity.x*=.7;e.body.velocity.z*=.7;}
    if(bossAttackCrossed(previous,e.bossTime,a.hit)){
      const distanceToPlayer=distance(p,pp);fx.ring(p,def.color,a.radius,.45);sound.sound(a.clip==='Binding'?'pulse':'impact');shake=Math.max(shake,.2);
      const direction=Math.atan2(pp.x-p.x,pp.z-p.z),front=Math.cos(direction-e.yaw)>.15;
      if(distanceToPlayer<a.radius&&visibleLine(p,pp,.08)&&(front||['Slam','Binding'].includes(a.clip)))hurt(victim,a.damage,p);
      if(a.clip==='Binding'&&distanceToPlayer<a.radius&&visibleLine(p,pp,.08)){victim.body.velocity.x*=.35;victim.body.velocity.z*=.35;}
      e.guardBreak=Math.max(e.guardBreak,a.duration-a.hit);
    }
    if(e.bossTime>=a.duration){e.bossAttack=null;e.bossClip='Idle';e.attackCooldown=.9;e.windup=0;}
    return;
  }
  let attack=def.attacks[e.attackIndex%def.attacks.length];
  if(attack.clip==='Claw'&&d>attack.range)attack=def.attacks[0];
  if(sight&&d<attack.range&&e.attackCooldown<=0){
    e.victim=victim;e.bossAttack=attack;e.bossClip=attack.clip;e.bossTime=0;e.bossAim={x:pp.x,z:pp.z};e.attackIndex++;e.windup=e.windupMax=attack.hit;e.attackType=attack.clip;e.body.velocity.x=e.body.velocity.z=0;return;
  }
  if(e.pathTick<=0){e.path=nav.path(p,pp).filter(point=>insideBossRoom(point,e.room,.75));e.pathTick=.45;}
  while(e.path.length&&distance(p,e.path[0])<.6)e.path.shift();
  const to=e.path[0];let vx=0,vz=0;
  if(to&&d>1.7){const length=distance(p,to)||1;const next={x:p.x+(to.x-p.x)/length*.5,z:p.z+(to.z-p.z)/length*.5};if(insideBossRoom(next,e.room,.8)&&nav.isFree(next.x,next.z)){vx=(to.x-p.x)/length*def.speed;vz=(to.z-p.z)/length*def.speed;}}
  const blend=Math.min(1,dt*8);e.body.velocity.x+=(vx-e.body.velocity.x)*blend;e.body.velocity.z+=(vz-e.body.velocity.z)*blend;
  e.bossClip=Math.hypot(vx,vz)>.1?'Walk':'Idle';
}
function updateEnemy(e,dt){
  if(e.bossType){updateBossEnemy(e,dt);return;}
  if(e.dead||e.removed)return;
  if(e.stoneCombat&&!e.visual.readyState){e.body.velocity.x=e.body.velocity.z=0;return;}
  if(!e.aggro&&!relicTaken&&distance(e.body.position,player.body.position)>24){e.body.velocity.x=e.body.velocity.z=0;return;}
  e.attackCooldown=Math.max(0,e.attackCooldown-dt);e.pathTick-=dt;e.guardBreak=Math.max(0,e.guardBreak-dt);
  if(e.kind==='boss')e.channelCooldown=Math.max(0,e.channelCooldown-dt);
  if(e===held||e.stun>0||e.thrownUntil>runTime&&e.body.position.y>1.6){
    if(e.stoneCombat)cancelStoneCombat(e.stoneCombat);
    interruptChannel(e);e.windup=0;return;
  }
  if(e.stoneCombat){
    const event=advanceStoneCombat(e.stoneCombat,dt);
    if(event.contact)enemyAttack(e);
    if(event.active){e.windup=e.stoneCombat.phase==='attack'?Math.max(0,STONE_MINION.contact-e.stoneCombat.time):0;e.body.velocity.x=e.body.velocity.z=0;return;}
  }
  const victim=e.windup>0?e.victim:bodyguardTarget(e,player,goliath,visibleLine);
  if(!victim||victim.dead||victim.removed){e.windup=0;return;}
  const pp=victim.body.position,p=e.body.position,d=distance(p,pp),sight=visibleLine(p,pp,.12);
  if(d<10.5&&sight||relicTaken)e.aggro=true;
  if(!e.aggro){e.body.velocity.x*=.8;e.body.velocity.z*=.8;return;}
  e.body.wakeUp();
  if(e.kind==='boss'){
    if(e.channel>0){e.channel+=dt;e.body.velocity.x=e.body.velocity.z=0;
      e.channelRing.position.set(p.x,.07,p.z);e.channelRing.scale.setScalar(.8+.4*e.channel/CHANNEL_DURATION);e.channelRing.rotation.z+=dt;
      if(e.channel>=CHANNEL_DURATION)finishChannel(e);return;}
    const minions=[...e.minions].filter(m=>!m.dead&&!m.removed).length;
    if(e.channelCooldown<=0&&minions<MINION_LIMIT&&livingEnemies()<ENEMY_LIMIT&&d<12&&sight&&e.guardBreak<=0){startChannel(e);return;}
  }
  const yaw=Math.atan2(pp.x-p.x,pp.z-p.z);e.yaw=turnToward(e.yaw,yaw,dt*7);
  if(e.windup>0){
    e.body.velocity.x*=.65;e.body.velocity.z*=.65;
    e.windup-=dt;
    if(e.windup<=0)enemyAttack(e);
    return;
  }
  const archer=e.kind==='archer',bossMode=e.kind==='boss';
  const reach=e.stoneCombat?STONE_MINION.reach:archer?8.3:bossMode?3.3:e.kind==='heavy'?2.1:1.6;
  if(sight&&d<reach&&e.attackCooldown<=0&&(!e.stoneCombat||Math.cos(yaw-e.yaw)>.92)){
    e.victim=victim;
    e.attackType=bossMode&&d>2.25?'wave':'hit';
    e.windup=e.stoneCombat?STONE_MINION.contact:archer?.65:bossMode?1.05:e.kind==='heavy'?.9:.65;e.windupMax=e.windup;
    if(e.stoneCombat)beginStoneAttack(e.stoneCombat);
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
  p.travelYaw=Math.hypot(input.moveX,input.moveZ)>.15?Math.atan2(input.moveX,input.moveZ):null;
  p.invulnerable=Math.max(0,p.invulnerable-dt);p.dashCooldown=Math.max(0,p.dashCooldown-dt);p.pulseCooldown=Math.max(0,p.pulseCooldown-dt);p.dashTime=Math.max(0,p.dashTime-dt);
  if(input.pointerActive&&(hearth.mounted||p.travelYaw===null||held||input.firing)){
    aimAtPointer({clientX:input.pointerX,clientY:input.pointerY});
  }else if(Math.hypot(input.moveX,input.moveZ)>.15){
    aimDirection.set(input.moveX,0,input.moveZ).normalize();
    aimPoint.set(p.body.position.x+aimDirection.x*8,.8,p.body.position.z+aimDirection.z*8);
  }else{aimPoint.set(p.body.position.x+aimDirection.x*8,.8,p.body.position.z+aimDirection.z*8);}
  chooseTarget(input);
  p.shielding=held&&!!input.shielding;
  if(hearth.drive(dt,input)){}
  else if(p.dashTime>0){p.body.velocity.x=p.dashDirection.x*18;p.body.velocity.z=p.dashDirection.z*18;fx.burst(p.body.position,0x7dd9c1,3,1.2);}
  else{
    const length=Math.max(1,Math.hypot(input.moveX,input.moveZ)),alignment=travelAlignment(p.visual.locomotion.snapshot().yaw??p.yaw,input.moveX,input.moveZ),slow=(p.shielding?.6:held?.84:1)*alignment;
    const factor=Math.min(1,dt*19);
    p.body.velocity.x+=(input.moveX/length*p.speed*slow-p.body.velocity.x)*factor;
    p.body.velocity.z+=(input.moveZ/length*p.speed*slow-p.body.velocity.z)*factor;
  }
  p.yaw=p.travelYaw!==null&&!held&&!input.firing&&!(hearth.mounted&&input.pointerActive)?p.travelYaw:turnToward(p.yaw,Math.atan2(aimDirection.x,aimDirection.z),dt*15);
  if(!held)p.mana=Math.min(p.maxMana,p.mana+dt*(15+2*(save.profile.upgrades.focus||0)+p.gear.regen));
  updateHeld(dt,input);
  if(held&&fireSpell.ignite(held,runTime)){sound.sound('fireIgnite');fx.burst(held.body.position,0xffb047,16,1.8);}
}
function updateEntities(dt){
  for(const e of entities){
    if(e.removed)continue;
    e.stun=Math.max(0,(e.stun||0)-dt);e.hitFlash=Math.max(0,(e.hitFlash||0)-dt);e.attackPulse=Math.max(0,(e.attackPulse||0)-dt);
    if(e.reserved)continue;
    if(e.bossType==='gargoyle'){
      const target=gargoyleFlightHeight(e.bossClip,e.bossTime),disabled=e===held||e.dead||e.stun>0||!e.body.fixedRotation||e.thrownUntil>runTime;
      const lift=gargoyleLiftAcceleration({height:e.body.position.y-e.cy,velocity:e.body.velocity.y,target,gravity:physics.gravity.y,disabled});
      e.flying=lift!==null&&target>.15;
      if(lift!==null){e.body.wakeUp();e.body.force.y+=e.body.mass*lift;}
    }
    if(e.ally)updateGoliath(e,dt);
    else if(e.category==='actor'&&!e.isPlayer)updateEnemy(e,dt);
    if(e.category==='actor'&&e!==held&&e.stun<=0&&e.body.position.y<e.cy+.45){
      if(!e.body.fixedRotation){e.body.fixedRotation=true;e.body.updateMassProperties();e.body.quaternion.set(0,0,0,1);e.body.angularVelocity.set(0,0,0);}
    }
    if(e.indestructible){e.pendingBreak=false;e.hp=e.maxHp;}
    if(e.pendingBreak){
      fx.burst(e.body.position,e.kind==='urn'?0xc9ba9c:0xad9270,32,5);
      if(!e.ephemeral&&Math.random()<.28)spawnPickup(e.body.position,1);
      removeEntity(e);continue;
    }
    if(e.category==='actor'&&e.dead&&e!==held&&runTime-e.deathTime>(e.ally?1.2:e.stoneCombat||e.bossType==='wraith'?3.2:28)){fx.burst(e.body.position,0x4a7b72,12,1.7);removeEntity(e);continue;}
    if(e.ephemeral&&e!==held&&runTime>e.expireAt){fx.burst(e.body.position,0x7ce9b9,10,1);removeEntity(e);continue;}
    if(e.indestructible&&e.body.position.y<-5){greekPuzzles?.recover(e);continue;}
    if(e.body.position.y<-5){
      if(e.isPlayer){e.body.position.set(e.lastSafe.x,2,e.lastSafe.z);e.body.velocity.set(0,0,0);hurt(e,10,null);}
      else if(e.category==='actor'&&!e.dead){hurt(e,e.hp+1,player.body.position);removeEntity(e);}
      else removeEntity(e);
    }else if(e.isPlayer&&nav.isFree(e.body.position.x,e.body.position.z)){e.lastSafe={x:e.body.position.x,z:e.body.position.z};}
  }
  entities=entities.filter(e=>!e.removed);
}
function syncVisuals(dt){
  // Clear first: stale worker replies, drops and cancelled gestures cannot leave a mark.
  if(!held||phase!=='playing')ui.updateThrowMark(null);
  for(const e of entities){
    if(e.removed||e.assemblyRestore)continue;
    const p=e.body.position;
    if(e.isPlayer&&hearth.occupied)continue;
    if(e.category==='prop'){e.mesh.position.copy(p);e.mesh.quaternion.copy(e.body.quaternion);continue;}
    const airborne=e===held||(!e.body.fixedRotation&&p.y>e.cy+.45);
    if(airborne){e.mesh.quaternion.copy(e.body.quaternion);tempV.set(0,e.cy,0).applyQuaternion(e.mesh.quaternion);e.mesh.position.copy(p).sub(tempV);}
    else{e.mesh.position.set(p.x,p.y-e.cy,p.z);e.mesh.rotation.set(0,e.yaw,0);}
    const speed=Math.hypot(e.body.velocity.x,e.body.velocity.z);
    const flying=e.bossType==='gargoyle'&&!e.dead&&(e.flying||p.y>e.cy+.2);
    e.mesh.visible=e.isPlayer||e.ally||e===held||distance(e.body.position,player.body.position)<29;
    // Invisible rigs still had every bone's world matrix traversed by Three.
    // Attach them again before they become visible; physics and AI stay live.
    if(e.mesh.visible){if(e.mesh.parent!==scene)scene.add(e.mesh);}else if(e.mesh.parent===scene)scene.remove(e.mesh);
    if(e.ally){
      e.gait=e.creature.animate(dt,{attack:e.strikeTime,attackSide:e.strikeSide,protecting:e.protecting});
      if(e.dead){const t=clamp((runTime-e.deathTime)/1.2,0,1);for(const part of e.creature.parts.values()){part.root.position.y*=1-t;part.root.position.x*=1+t*.4;part.root.rotation.z+=t*.45;}}
    }else if(e.mesh.visible){
    const animationOptions={camera,moving:!airborne&&speed>.18,speed,grounded:!airborne&&!flying,airborne,flying:e.flying,dash:e.isPlayer?e.dashTime/.19:0,casting:e.isPlayer&&(!!held||castTime>0),attack:e.isPlayer?castTime>.27:e.attackPulse>0,blocking:e.kind==='guard'&&e.windup>0&&e.attackPulse<=0,dead:e.dead&&!airborne,stunned:e.stun>.01&&!airborne};
    animationOptions.heading=e.isPlayer?e.travelYaw:undefined;
    animationOptions.castTarget=e.isPlayer&&held?held.body.position:null;
    animationOptions.attackWindup=e.windupMax;
    if(e.bossType){animationOptions.clip=e.bossClip;animationOptions.time=e.dead?runTime-e.deathTime:e.stun>.01?(e.bossStaggerTime||0):e.bossAttack?e.bossTime:undefined;}
    if(e.stoneCombat)e.visual.animate(dt,{camera,grounded:animationOptions.grounded,dead:animationOptions.dead,stunned:animationOptions.stunned,
      spawning:e.stoneCombat.phase==='spawn',attack:e.stoneCombat.phase==='attack'?Math.max(1e-6,e.stoneCombat.time):0,attackSide:e.stoneCombat.side});
    else e.visual.update(dt,animationOptions);
    }
    if(e.shadow){e.shadow.visible=e.mesh.visible;e.shadow.position.set(p.x,.025,p.z);e.shadow.material.opacity=clamp(.28-(p.y-e.cy)*.025,.06,.28);}
    if(e.healthBar){
      const show=e.mesh.visible&&!e.dead&&(e.hp<e.maxHp||e===target||e.kind==='boss'||e.ally);
      e.healthBar.visible=show;e.healthBar.position.set(p.x,p.y-e.cy+(e.stoneCombat?STONE_MINION.height+.2:e.ally?3.7:e.bossType?BOSS_DEFINITIONS[e.bossType].height+.15:2.2*(e.kind==='boss'?1.3:1)),p.z);
      e.healthBar.quaternion.copy(camera.quaternion);
      e.healthBar.userData.fill.scale.x=Math.max(.001,e.hp/e.maxHp);
      e.healthBar.userData.fill.position.x=-(1-e.hp/e.maxHp)*.47;
      e.healthBar.userData.fill.material.color.set(e.ally?0x8be3bf:e.guardBreak>0?0x9df6d5:e.kind==='boss'?0xd2a1dd:0xeebb8f);
    }
    if(e.telegraph){
      e.telegraph.visible=e.mesh.visible&&!e.dead&&e.windup>0;
      e.telegraph.position.set(p.x,.07,p.z);
      const radius=e.stoneCombat?STONE_MINION.reach:e.bossType?(e.bossAttack?.radius||2.5):e.attackType==='wave'?4.1:e.kind==='boss'?2.8:e.kind==='heavy'?2.5:e.kind==='archer'?1.1:1.9;
      if(e.bossType)e.telegraph.material.color.set(BOSS_DEFINITIONS[e.bossType].color);
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
  trajectory.visible=false;
  impactMarker.visible=false;
  sideTrajectory.visible=sideArrow.visible=false;
  const quietShield=held&&!drag&&ui.getInput().shielding;
  if(quietShield){targetRing.visible=false;ui.updateThrowMark(null);}
  if(held&&phase==='playing'&&!quietShield){
    const now=performance.now(),v=currentThrowVelocity();
    const changed=previewBody!==held.body||!previewVelocity||Math.hypot(v.x-previewVelocity.x,v.y-previewVelocity.y,v.z-previewVelocity.z)>1;
    if(!previewBusy&&(!throwPreview||changed||now-previewAt>=80)){
      trajectoryPredictor.postMessage({snapshot:captureTrajectoryWorld(physics,held.body,runTime),bodyId:held.body.id,origin:{x:held.body.position.x,y:held.body.position.y,z:held.body.position.z},velocity:v,grip:save.profile.upgrades.grip||0,damageMultiplier:1+player.gear.damage});
      previewBusy=true;previewAt=now;previewBody=held.body;previewVelocity=v;
    }
    targetRing.visible=nav.onFloor(throwDestination.x,throwDestination.z);
    const destination=throwDestination;
    targetRing.position.set(destination.x,.065,destination.z);targetRing.scale.setScalar(.85);
    targetRing.material.color.set(0x9bffda);
    updateMobileThrowMark();
    if(!throwPreview?.origin||Math.hypot(held.body.position.x-throwPreview.origin.x,held.body.position.y-throwPreview.origin.y,held.body.position.z-throwPreview.origin.z)>.25
      ||Math.hypot(v.x-throwPreview.velocity.x,v.y-throwPreview.velocity.y,v.z-throwPreview.velocity.z)>2)return;
    const a=trajectory.geometry.attributes.position.array;
    throwPreview.points.forEach((p,i)=>{a[i*3]=p.x;a[i*3+1]=p.y;a[i*3+2]=p.z;});
    a[0]=held.body.position.x;a[1]=held.body.position.y;a[2]=held.body.position.z;
    trajectory.geometry.setDrawRange(0,throwPreview.points.length);
    trajectory.geometry.attributes.position.needsUpdate=true;
    const contact=throwPreview.impacts.find(hit=>!hit.ground);
    if(contact){
      const p=contact.position,n=contact.normal;
      impactMarker.material.color.set(contact.breaksProjectile?0xff9b80:0xffce87);
      impactMarker.position.set(p.x+n.x*.035,p.y+n.y*.035,p.z+n.z*.035);
      impactMarker.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(n.x,n.y,n.z));impactMarker.visible=true;
      if(contact.kind==='world'){
        const mark=floorThrowTarget(throwPreview.landing||p,worldMap.floors,.4);
        targetRing.position.set(mark.x,.07,mark.z);targetRing.scale.setScalar(.4);targetRing.material.color.set(0xffb17c);targetRing.visible=true;
        updateMobileThrowMark(true);
        if(!contact.breaksProjectile){
          const rebound=throwPreview.points.slice(Math.ceil(contact.time*120)+1).filter(q=>q.y>=0&&nav.onFloor(q.x,q.z));
          if(rebound.length>2){
            rebound.forEach((q,i)=>{a[i*3]=q.x;a[i*3+1]=q.y;a[i*3+2]=q.z;});
            trajectory.geometry.setDrawRange(0,rebound.length);trajectory.geometry.attributes.position.needsUpdate=true;
            trajectory.computeLineDistances();trajectory.visible=true;
          }
        }
      }
    }
    const rawSide=throwPreview.side?.points;
    const outside=rawSide?.findIndex(q=>q.y<0||!nav.onFloor(q.x,q.z));
    const side=rawSide?.slice(0,outside<0?rawSide.length:outside);
    if(side?.length>2){
      const start=side[0],end=side.at(-1),delta=new THREE.Vector3(end.x-start.x,end.y-start.y,end.z-start.z);
      if(delta.length()>.12){
        const positions=sideTrajectory.geometry.attributes.position.array;
        side.forEach((p,i)=>{positions[i*3]=p.x;positions[i*3+1]=p.y;positions[i*3+2]=p.z;});
        sideTrajectory.geometry.setDrawRange(0,side.length);sideTrajectory.geometry.attributes.position.needsUpdate=true;
        sideTrajectory.computeLineDistances();sideTrajectory.visible=true;
        const previous=side.at(-3),direction=new THREE.Vector3(end.x-previous.x,end.y-previous.y,end.z-previous.z).normalize();
        sideArrow.position.set(end.x-direction.x*.4,end.y-direction.y*.4,end.z-direction.z*.4);sideArrow.setDirection(direction);sideArrow.visible=true;
      }
    }
  }else if(!held){
    throwPreview=null;previewBody=null;previewVelocity=null;
  }
}
function updateMobileThrowMark(blocked=false){
  if(!mobile||!held||!targetRing.visible)return;
  const point=targetRing.position.clone().project(camera);
  const rect=renderer.domElement.getBoundingClientRect();
  ui.updateThrowMark({visible:point.z>=-1&&point.z<=1,x:(point.x+1)*rect.width/2,y:(1-point.y)*rect.height/2,blocked});
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
function findContext(fireOnly=false){
  if(!player||phase!=='playing')return null;
  const p=player.body.position,candidates=[],hs=hearth.snapshot();
  const add=(id,kind,point,range,label,icon,enabled=true,priority=1,entity=null)=>{
    const d=distance(p,point);if(d>range)return;
    const reachable=fireLineClear(p,point);candidates.push({id,kind,point,range,label,icon,enabled,priority,entity,distance:d,reachable});
  };
  if(hs.occupied){
    const door=!fireOnly&&hs.state==='piloted'&&greekPuzzles?.strikeTarget(hearth.engine);
    if(door)return{id:'door-strike-'+door.gate.id,kind:'door-strike',label:'ΧΤΥΠΑ ΠΟΡΤΑ',icon:'pulse',key:'Q',enabled:!hearth.engine.strike.active,point:door.point,entity:door};
    return !fireOnly&&hs.state==='piloted'?{id:'engine-exit',kind:'engine',label:'ΕΞΟΔΟΣ',icon:'portal',enabled:true,point:hearth.engine.body.position}:null;
  }
  if(!fireOnly){
    if(hearth.near()&&['sleep','ready'].includes(hs.state))add('engine','engine',hearth.engine.visual.point('inlet'),3.7,hs.state==='ready'?'ΕΙΣΟΔΟΣ':fireSpell.charged?'ΦΟΡΤΙΣΗ':'ΠΑΡΕ ΦΩΤΙΑ','portal',!held&&(hs.state==='ready'||fireSpell.charged&&runTime>=fireSpell.readyAt),3);
    if(!relicTaken)add('relic','relic',worldMap.relic.position,3,'ΣΚΗΠΤΡΟ','scepter',!entities.some(e=>e.kind==='boss'&&!e.dead&&!e.removed),3);
    if(relicTaken)add('exit','exit',worldMap.exit.position,2.8,'ΠΥΛΗ','portal',true,3);
  }
  if(FIRE_ENABLED){
    for(const source of fireSpell.sources)if(source.lit)add('flame-'+source.id,'flame',source.position,5,'ΦΩΤΙΑ','fire',player.mana>=3,1,source);
    if(fireSpell.charged&&runTime>=fireSpell.readyAt)for(const wood of [...entities,...worldMap.woodenSurfaces])if(wood!==held&&wood.flammable&&!wood.removed&&!wood.woodExhausted&&!(wood.burnUntil>runTime))add('wood-'+(wood.body?.id??wood.id),'wood',wood.body?.position||wood.position,Math.min(3.5,telekinesisReach()),'ΑΝΑΨΕ','fire',true,1,wood);
  }
  return nearestContext(candidates,contextTarget?.id);
}
function strikeDoor(){
  if(!hearth.mounted)return false;
  return hearth.strikeDoor(greekPuzzles?.strikeTarget(hearth.engine),(gate,origin)=>{const opened=greekPuzzles.forceOpen(gate,origin);if(opened)shake=.16;return opened;});
}
function useContext(fireOnly=false){
  const target=findContext(fireOnly);if(!target?.enabled)return false;
  contextAt=-Infinity;
  if(target.kind==='door-strike')return strikeDoor();
  if(target.kind==='flame'){
    if(!fireSpell.take(player,fireLineClear,held,runTime,target.point))return false;
    worldMap.setTorchLit(fireSpell.torch.id,fireSpell.torch.lit);castTime=.45;fx.burst(fireSpell.torch.position,0xffb44a,15,1.2);sound.sound('fireTake');return true;
  }
  if(target.kind==='wood')return igniteWithSpell(target.entity);
  interact(target.kind);return true;
}
function renderContext(){
  if(contextAt>runTime||runTime-contextAt>.1){contextTarget=findContext();contextAt=runTime;}
  if(!contextHighlight){contextHighlight=new THREE.Mesh(new THREE.TorusGeometry(.7,.035,6,32),new THREE.MeshBasicMaterial({color:0xffdf9d,transparent:true,opacity:.85,depthWrite:false}));contextHighlight.rotation.x=-Math.PI/2;scene.add(contextHighlight);}
  const nearbyEngine=phase==='playing'&&!hearth.snapshot().occupied&&hearth.near();
  hearth.engine?.visual.setHighlight(nearbyEngine,runTime);
  // Keep E and the mobile action-bar exit operational, without an exit badge
  // following the pilot around the battlefield at any viewport size.
  const current=phase==='playing'&&!(mobile&&drag)&&contextTarget?.id!=='engine-exit'?contextTarget:null;contextHighlight.visible=!!current;
  if(!current){ui.updateContext(null);return;}
  const point=current.kind==='engine'?hearth.engine.body.position:current.point;contextHighlight.position.set(point.x,current.kind==='engine'?.09:Math.max(.1,point.y),point.z);contextHighlight.scale.setScalar(current.kind==='engine'?2.8:current.kind==='flame'?.5:1);
  const rect=renderer.domElement.getBoundingClientRect();contextPoint.set(player.body.position.x,player.body.position.y-player.cy,player.body.position.z).project(camera);
  const x=rect.left+(contextPoint.x+1)*rect.width/2,y=rect.top+(1-contextPoint.y)*rect.height/2+14;
  ui.updateContext({...current,x:clamp(x,34,innerWidth-34),y:clamp(y,16,innerHeight-74)});
}
function updateHUD(){
  ui.updatePotions(potionCounts());
  if(!player)return;
  const activeBoss=entities.filter(e=>e.kind==='boss'&&!e.dead&&!e.removed).sort((a,b)=>distance(player.body.position,a.body.position)-distance(player.body.position,b.body.position))[0];
  const p=player.body.position,goalPos=relicTaken?worldMap.exit.position:worldMap.relic.position,dist=Math.round(distance(p,goalPos));
  const nearRelic=!relicTaken&&distance(p,worldMap.relic.position)<3,nearExit=relicTaken&&distance(p,worldMap.exit.position)<2.8;
  let hint='';
  if(nearRelic)hint=entities.some(e=>e.kind==='boss'&&!e.dead&&!e.removed)?'Νίκησε και τους τέσσερις φύλακες · οι δυνατές ρίψεις σπάνε την άμυνά τους.':(mobile?'ΧΡΗΣΗ':'E')+' · Πάρε το Μαύρο Σκήπτρο';
  else if(nearExit)hint=(mobile?'ΧΡΗΣΗ':'E')+' · Πέρασε την πύλη';
  else if(held)hint=mobile?'Σύρε και άφησε για ρίψη · Γρήγορα προς τον μάγο για ασπίδα':'Σύρε και άφησε για ρίψη · Δεξί κλικ για ασπίδα';
  else if(target&&distance(p,target.body.position)>telekinesisReach())hint='Πλησίασε τον στόχο για να τον αρπάξεις.';
  else if(target&&!canGrab(target))hint='Αντιστέκεται στην άρπαξη. Χτύπησέ τον με ένα αντικείμενο.';
  else if(runTime<22)hint=mobile?'Άγγιξε ένα αντικείμενο → σύρε → άφησε για ρίψη.':'Κλικ πάνω σε αντικείμενο → κράτησε και σύρε → άφησε για ρίψη.';
  else if(!target)hint=mobile?'Πάτησε πάνω σε αντικείμενο ή φρουρό. ΠΕΤΡΑ: κάλεσε ένα θραύσμα.':'Πάτησε πάνω σε αντικείμενο ή φρουρό. R: κάλεσε μια πέτρα.';
  const hs=hearth.snapshot(),nearHearth=hearth.near(),fireAvailable=fireSpell.available(player,fireLineClear,held,aimPoint);
  if(hs.occupied)hint=hs.state==='piloted'?(mobile?'ΠΥΡ: κράτησε · ΠΑΤΗΜΑ: χτύπημα εδάφους · ΕΞΟΔΟΣ στα χειριστήρια':'Αριστερό κλικ: φλογοβόλο · Δεξί κλικ: πάτημα · E: έξοδος'):'Η σκάλα χρησιμοποιείται · περίμενε να ολοκληρωθεί η κίνηση.';
  else if(nearHearth)hint=hs.state==='sleep'?(fireSpell.charged?'ΦΟΡΤΙΣΗ κάτω από τον χαρακτήρα · Δώσε τη φλόγα στην καρδιά':'Η στολή κοιμάται · πλησίασε έναν πυρσό και πάτησε ΦΩΤΙΑ κάτω από τον χαρακτήρα'):hs.state==='ready'?'ΕΙΣΟΔΟΣ κάτω από τον χαρακτήρα · Μπες στη στολή':'Η καρδιά ξυπνά τη στολή…';
  else if(fireAvailable&&!fireSpell.charged&&!held)hint='Πλησίασε τον πυρσό και πάτησε ΦΩΤΙΑ κάτω από τον χαρακτήρα';
  let zone='Η Αυλή';
  if(FIRE_ENABLED&&!held&&!nearRelic&&!nearExit&&!nearHearth&&!hs.occupied)hint=fireSpell.charged?'Η φωτιά μένει μαζί σου · Σήκωσε ξύλο ή πλησίασέ το και πάτησε ΑΝΑΨΕ κάτω από τον χαρακτήρα.':fireSpell.sourceFor(player,fireLineClear,aimPoint)?'Πλησίασε τη φωτιά και πάτησε το εικονίδιο κάτω από τον χαρακτήρα.':hint;
  for(const z of worldMap.zones)if(p.x>=z.xMin&&p.x<=z.xMax&&p.z>=z.zMin&&p.z<=z.zMax)zone=z.label||z.name;
  const defeatedBosses=entities.filter(e=>e.bossType&&e.dead).length;
  const nearestBoss=bosses.filter(e=>!e.dead&&!e.removed&&distance(p,e.body.position)<12).sort((a,b)=>distance(p,a.body.position)-distance(p,b.body.position))[0];
  const ally=goliath&&!goliath.dead&&!goliath.removed?goliath:null;
  ui.update({fps:frameRate.value,hp:player.hp,maxHp:player.maxHp,unlimitedHealth:benchmarkMode,mana:player.mana,maxMana:player.maxMana,kills,
    stones:activeStones(entities).length,readyStones:ritual.phase==='idle'?ritualCandidates().length:ritual.stones.length,ritualPhase:ritual.phase,ritualProgress:ritual.phase==='charge'?ritual.elapsed/GOLIATH_CHARGE:ritual.phase==='assemble'?ritual.elapsed/(assemblyCreature?.assembly.duration||6.13):0,
    assembled:assemblyCreature?.assemble(ritual.elapsed).locked.length||0,goliathHP:ally?.hp||0,goliathTime:ally?ally.expires-runTime:0,
    goal:relicTaken?'ΕΠΙΣΤΡΟΦΗ ΣΤΗΝ ΠΥΛΗ':'ΤΟ ΜΑΥΡΟ ΣΚΗΠΤΡΟ',
    objective:relicTaken?'Δραπέτευσε από τη νότια πύλη · '+dist+' μ.':`Φύλακες ${bosses.filter(b=>b.dead).length}/4 · Σκήπτρο στην κρύπτη · ${dist} μ.`,
    hint,nearRelic,nearExit,holding:!!held,shielding:!!player.shielding,dragging:!!drag,throwPower:held?currentThrowVelocity()?.speed:0,heldName:held?(player.shielding?'ΑΣΠΙΔΑ · ':'')+held.label:'',
    fireAvailable:FIRE_ENABLED&&(fireSpell.charged||fireSpell.available(player,fireLineClear,held,aimPoint)),fireCharged:FIRE_ENABLED&&fireSpell.charged,
    pulseCooldown:player.pulseCooldown,dashCooldown:player.dashCooldown,relic:relicTaken,shards:runShards,
    combo:runTime<comboUntil?combo:0,comboMultiplier:runTime<comboUntil?Math.min(4,combo):0,time:runTime,
    progress:relicTaken?.8:Math.max(bosses.filter(b=>b.dead).length*.15,clamp((18-p.z)/40,0,.55)),zone,
    bossHP:activeBoss&&distance(p,activeBoss.body.position)<12?activeBoss.hp:null,bossMaxHP:activeBoss?.maxHp||330,bossName:activeBoss?.label||'',bossChannel:(nearestBoss?.channel||0)/CHANNEL_DURATION,
    targetName:target?.label||'',quality,hearth:hs,nearHearth});
  renderContext();
}
let controlledUntil=0;
function frame(now,manual=false){
  if(benchmarkMode&&performanceTest?.report?.outcome)return;
  if(!manual&&now<controlledUntil){lastTime=now;requestAnimationFrame(frame);return;}
  if(texturePreparation||renderer?.getContext().isContextLost()){lastTime=now;if(!manual)requestAnimationFrame(frame);return;}
  if(!manual)performanceTest?.beginFrame(phase);
  const dt=Math.min(.045,Math.max(.001,(now-lastTime)/1000));lastTime=now;worldTime+=dt;
  try{
    if(worldMap)worldMap.update(dt,worldTime,player?.body.position);
    if(ready){
      const actions=ui.consumeActions();
      for(const action of actions)if(action==='pause')togglePause();
      if(phase==='playing'){
        runTime+=dt;castTime=Math.max(0,castTime-dt);
        const input=ui.getInput();updatePlayer(dt,input);
        for(const action of actions){
          if(action==='conjure')conjure();
          else if(action==='dash')dash(input);
          else if(action==='pulse')pulse();
          else if(action==='context')useContext();
          else if(action==='doorStrike')strikeDoor();
          else if(action==='exitEngine')hearth.exit();
          else if(action==='contextFire'&&FIRE_ENABLED)useContext(true);
          else if(action==='healthPotion')usePotion('health');
          else if(action==='manaPotion')usePotion('mana');
        }
        if(phase==='playing'){
          hearth.update(dt,input,runTime);
          performanceTest?.actionState({engine:hearth.engine?.heart.state,firing:hearth.engine?.heart.firing,shielding:player.shielding});
          updateRitual(dt);updateReinforcements();
          updateEntities(dt);
          performanceTest?.mark('gameplay');
          physics.step(1/120,dt,6);performanceTest?.mark('physics');greekPuzzles?.update(dt,hearth.engine,player);
          if(FIRE_ENABLED)updateFire();
          updateArrows(dt);updatePickups(dt);updateLoot(dt);
          if(relicTaken&&runTime>nextWave){spawnReinforcements();nextWave=runTime+24;}
        }
      }
      const animate=['playing','menu'].includes(phase)?dt:0;
      syncVisuals(animate);updateCamera(dt);updateHUD();fx.update(animate||dt*.25,camera,animate);
      hearth.sync(animate);
      hearth.engine?.visual.lod?.update(camera,renderer);
      hearthFX.update({spell:{charged:false},player,hearth:hearth.engine,entities:[],time:runTime,camera,quality});
      if(!held)fx.connect(null);
      if(FIRE_ENABLED)fireFX.update({spell:fireSpell,player,entities,surfaces:worldMap.woodenSurfaces,time:runTime,camera,playing:['playing','paused'].includes(phase),source:fireSpell.sourceFor(player,fireLineClear,aimPoint)});
    }
    sound.setFlamethrower(phase==='playing'&&!document.hidden&&!!hearth?.engine?.heart.firing);
    performanceTest?.mark('visuals');
    if(renderer&&ready){
      const preparation=prepareFrameTextures();
      if(preparation){sound.setPaused(true);sound.setFlamethrower(false);texturePreparation=preparation.catch(error=>{if(!renderer.getContext().isContextLost())showError(error);}).finally(()=>{texturePreparation=null;lastTime=performance.now();});}
      else{performanceTest?.mark('textureCheck');performanceTest?.beginRender(renderer);renderer.info.reset();if(quality==='high')composer.render();else renderer.render(scene,camera);if(!manual){if(phase==='playing')frameRate.presented(performance.now());else frameRate.reset();performanceTest?.endFrame(renderer);}}
    }
    if(!manual)requestAnimationFrame(frame);
  }catch(error){showError(error);}
}
function showError(error){
  sound.setFlamethrower(false);
  console.error('Magic:',error);phase='error';performanceTest?.error(error);
  const message=error?.assetLoad?error.message:'Το παιχνίδι δεν μπόρεσε να ξεκινήσει. Πάτησε «Δοκίμασε ξανά».';
  if(ui.showError)ui.showError(message);
  else{
    let el=document.getElementById('fatal-error');
    if(!el){el=document.createElement('div');el.id='fatal-error';document.body.append(el);}
    el.style.cssText='position:fixed;inset:20%;z-index:9999;background:#12201d;color:#fff;padding:30px;font:18px system-ui;display:block;';
    el.textContent=message+' '+(error?.message||'');
  }
}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&phase==='playing'){phase='paused';ui.showPause(true);}});
window.addEventListener('pagehide',()=>{save.save();sound.setPaused(true);sound.setFlamethrower(false);if(phase==='playing'){phase='paused';ui.showPause(true);}});
async function boot(){
  try{
    configureTextureMemory({maxEncodedBytes:(mobile?16:64)*1024*1024});
    ui.setLoading(.02,'Ελέγχεται η έκδοση…');
    observeAssetLoading(event=>{ui.setDownloadProgress(event);performanceTest?.downloadProgress(event);});
    if(!candidate&&!import.meta.env.DEV)await ensureReleaseWorker(navigator.serviceWorker,document.baseURI,packageInfo.version);
    await loadTextureProfile(readAsset);
    ui.setLoading(.05,'Ανάβουν οι δάδες…');setupRenderer();
    configureRigSurfacePreparation({renderer,scene,camera,renderTargets:composer?[composer.readBuffer]:[]});
    await Promise.all([loadSiegeAssets(),loadGreekAssets()]);
    worldMap=createWorld(scene,{fireEnabled:FIRE_ENABLED});
    addSiegeDressing(worldMap);greekArchitecture=addGreekArchitecture(worldMap);
    if(FIRE_ENABLED){fireSpell=new FireSpell(worldMap.torches);fireFX=createFireEffects(scene);}
    setupPhysics();goliathNav=new NavigationGrid(worldMap.floors,worldMap.colliders,.85,1.0);ui.setLoading(.2,'Το κάστρο ξυπνά…');
    await loadCharacters((fraction)=>ui.setLoading(.2+fraction*.65,'Οι φύλακες παίρνουν θέση…'));
    await Promise.all([loadBossCharacters(),loadStoneMinion({camera})]);
    await loadHearth();hearthFX=createHearthEffects(scene);
    hearth=createHearthSystem({scene,physics,worldMap,nav,material:actorMaterial,spell:fireSpell,getPlayer:()=>player,getEntities:()=>entities,getHeld:()=>held,getAimPoint:()=>aimPoint,getAimEntity:()=>target||greekPuzzles?.aimTarget(hearth?.engine,player?.yaw||0),getEnvironmentalTargets:()=>greekPuzzles?.aimTargets(hearth?.engine)||[],releaseHeld,hurt,clear:(a,b)=>visibleLine(a,b,.01),sound,toast:ui.toast,fx});
    greekPuzzles=createGreekPuzzles({architecture:greekArchitecture,world:worldMap,physics,staticBox,navs:()=>[nav,goliathNav],spawn:prop,getHeld:()=>held,releaseHeld,toast:ui.toast,fx});
    ui.setLoading(.9,'Η μαγεία σχηματίζεται…');populate();
    ui.setLoading(.93,'Ετοιμάζεται η πρώτη εικόνα…');
    // Finish the real first-play view before enabling Start, including its LOD
    // surfaces. The menu and play cameras expose different original textures.
    phase='playing';setPlayCamera();updateCamera(0);syncVisuals(0);await prepareFrameTextures();
    phase='loading';updateCamera(100);syncVisuals(0);await prepareFrameTextures();
    if(renderer.compileAsync){
      // Compile the target actually used by this quality setting.
      if(!composer||quality==='low')await renderer.compileAsync(scene,camera);
      // Desktop renders through a linear HDR target. Precompile that variant
      // too: compiling only the screen/sRGB variant stalls on the first shot.
      if(composer){
        const target=renderer.getRenderTarget();
        renderer.setRenderTarget(composer.readBuffer);
        const pending=renderer.compileAsync(scene,camera);
        renderer.setRenderTarget(target);
        await pending;
      }
    }
    // Preserve the prior complete offline release until encoded background
    // assets have arrived. Playing the first room need not wait for them.
    const assetsReady=new Promise(resolve=>setTimeout(resolve,1000)).then(prefetchEncodedTextures).then(complete=>{if(complete&&!candidate)notifyReleaseReady(navigator.serviceWorker,packageInfo.version);return complete;});
    performanceTest?.ready();ready=true;phase='menu';ui.setLoading(1,'Έτοιμο');ui.ready();ui.showMenu(save.profile);if(!candidate)void gameUpdates.check();
    observeAssetLoading(null);requestAnimationFrame(frame);
    window.__MAGIC__={version:packageInfo.version,assetsReady,textureMemory:()=>({...textureMemoryStats(),pending:!!texturePreparation}),prepareTextures:prepareFrameTextures,snapshot:()=>({puzzles:greekPuzzles?.snapshot(),hearth:hearth.snapshot(),phase,hp:player?.hp,mana:player?.mana,position:player?{x:player.body.position.x,z:player.body.position.z}:null,
      kills,relicTaken,holding:held?.label||null,dragging:!!drag,shielding:!!player?.shielding,context:contextTarget?{id:contextTarget.id,label:contextTarget.label,enabled:contextTarget.enabled}:null,controls:'drag-release',entities:entities.filter(e=>!e.removed).length,renderer:renderer.info.render,
      pathToRelic:nav.path(worldMap.spawn,{x:worldMap.relic.position.x,z:worldMap.relic.position.z+3}).length,profile:{runs:save.profile.runs,wins:save.profile.wins},time:runTime,candidate,
      inventory:{items:save.profile.loot.items.map(i=>({...i})),equipped:{...save.profile.loot.equipped},shards:save.profile.shards,storage:save.available},gear:player?.gear,
      loot:lootDrops.filter(d=>d.mesh.visible).map(d=>({kind:d.item.kind,level:d.item.level,position:{x:d.mesh.position.x,z:d.mesh.position.z}})),
      stones:activeStones(entities).map(e=>({id:e.body.id,mesh:e.assemblyRestore?assemblyCreature?.parts.get(e.assemblyRestore.part).mesh.uuid:e.mesh.children[0]?.uuid,reserved:!!e.reserved,position:{x:e.body.position.x,y:e.body.position.y,z:e.body.position.z}})),
      ritual:{phase:ritual.phase,elapsed:ritual.elapsed,available:ritual.phase==='idle'?ritualCandidates().length:ritual.stones.length,locked:assemblyCreature?.assemble(ritual.elapsed).locked||[]},
      goliath:goliath&&!goliath.removed?{hp:goliath.hp,dead:goliath.dead,remaining:goliath.expires-runTime,attack:goliath.strikeTime||0,position:{x:goliath.body.position.x,y:goliath.body.position.y,z:goliath.body.position.z}}:null,
      enemies:entities.filter(e=>e.category==='actor'&&!e.isPlayer&&!e.ally&&!e.removed).map(e=>({id:e.body.id,kind:e.kind,hp:e.hp,dead:e.dead,room:e.room?.name||e.room,channel:e.channel||0,minions:e.minions?[...e.minions].filter(m=>!m.dead&&!m.removed).length:undefined,target:e.victim?.ally?'goliath':e.victim?.isPlayer?'player':null,position:{x:e.body.position.x,z:e.body.position.z}})),
      rooms:rooms.map(r=>({id:r.id,label:r.label,enemies:r.enemies,boss:!!r.boss})),
      fire:FIRE_ENABLED?{charged:fireSpell.charged,source:fireSpell.torch?.id,ready:runTime>=fireSpell.readyAt,torchLit:worldMap.torches[6].lit,hit:fireSpell.hit,crateBurnRemaining:Math.max(0,(entities.find(e=>e.kind==='crate')?.burnUntil||0)-runTime),guardBurnRemaining:Math.max(0,(entities.find(e=>e.kind==='guard')?.burnUntil||0)-runTime),guardHP:entities.find(e=>e.kind==='guard')?.hp,burning:entities.filter(e=>!e.removed&&e.burnUntil>runTime).length}:null}),
      inspect:()=>({entities:entities.filter(e=>!e.removed).map(e=>({id:e.body.id,kind:e.kind,primaryCrate:e===entities.find(a=>a.kind==='crate'),bossType:e.bossType,room:e.room?.name,isPlayer:e.isPlayer,hp:e.hp,dead:e.dead,flammable:e.flammable,woodFuel:e.woodFuel,burnRemaining:Math.max(0,(e.burnUntil||0)-runTime),x:e.body.position.x,y:e.body.position.y,z:e.body.position.z})),sources:worldMap.torches.map(s=>({id:s.id,infinite:s.infinite,lit:s.lit,x:s.position.x,y:s.position.y,z:s.position.z})),wood:worldMap.woodenSurfaces.map(w=>({id:w.id,x:w.position.x,y:w.position.y,z:w.position.z,burnRemaining:Math.max(0,(w.burnUntil||0)-runTime),fuel:w.woodFuel})),memory:{...renderer.info.memory},render:{...renderer.info.render},fireFX:fireFX?.counts(),preview:throwPreview,velocity:currentThrowVelocity()}),
      project:p=>{camera.updateMatrixWorld();const v=new THREE.Vector3(p.x,p.y,p.z).project(camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};},
      velocity:()=>currentThrowVelocity()};
    window.render_game_to_text=()=>JSON.stringify({...window.__MAGIC__.snapshot(),coordinates:'metres: X east, Y up, Z south',bosses:entities.filter(e=>e.bossType&&!e.removed).map(e=>({type:e.bossType,room:e.room.name,hp:e.hp,dead:e.dead,clip:e.mesh.userData.animationState,attackTime:e.bossTime,guardBreak:e.guardBreak,x:e.body.position.x,z:e.body.position.z}))});
    if(FIRE_ENABLED&&FIRE_BENCHMARK)window.__FIRE_BENCHMARK__=enabled=>{fireFX.setEnabled(enabled);renderer.info.autoReset=false;};
    window.advanceTime=ms=>{controlledUntil=performance.now()+1000;const steps=Math.max(1,Math.ceil(ms/(1000/60)));for(let i=0;i<steps;i++)frame(lastTime+ms/steps,true);lastTime=performance.now();};
    if(new URL(location.href).searchParams.has('hearthQA'))window.__HEARTH_QA__={trajectoryWorld:()=>captureTrajectoryWorld(physics,held?.body,runTime),get puzzles(){return greekPuzzles;},get goliathNav(){return goliathNav;},get held(){return held;},hurt,get engine(){return hearth.engine;},get player(){return player;},get entities(){return entities;},get spell(){return fireSpell;},get world(){return worldMap;},get nav(){return nav;},get physics(){return physics;},get camera(){return camera;},hearth,startRun,interact,absorbFire,holdEntity,throwHeld,releaseHeld,pulse,stoneFixture:createStoneCreature,get time(){return runTime;},pause:togglePause,render:()=>{controlledUntil=performance.now()+60000;if(quality==='high')composer.render();else renderer.render(scene,camera);},impactSnapshot:()=>fx.stompSnapshot(),step:(dt,input={moveX:0,moveZ:0,firing:false})=>{if(phase==='playing'){runTime+=dt;updatePlayer(dt,{...input,pointerActive:false});hearth.update(dt,input,runTime);physics.step(1/120,dt,6);greekPuzzles?.update(dt,hearth.engine,player);syncVisuals(dt);hearth.sync(dt);fx.update(dt,camera,dt);hearthFX.update({spell:{charged:false},player,hearth:hearth.engine,entities:[],time:runTime,camera});}},renderer};
  }catch(error){
    const fresh=error.releaseMismatch&&releaseReloadURL(location.href,error.releaseMismatch);
    if(fresh){location.replace(fresh);return;}
    showError(error);
  }
}
if(!benchmarkMode)boot();

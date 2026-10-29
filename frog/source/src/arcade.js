import {installFrameMeter} from './arcade-frame-meter.js';
import './arcade-performance.css';
import {freezeOverviewTouchAim} from './arcade-touch-overview-aim.js';
import {installMenuAnimation} from './arcade-menu-animation.js';
import {installAirControls,airControlsMarkup} from './arcade-air-controls.js';
import {applyLeapPose} from './arcade-leap-pose.js';
import {flightPose,AIR_RULES} from './arcade-air-movement.js';
import {installRoundUI} from './arcade-round-ui.js';
import {playerName,accuracy} from './arcade-leaderboard.js';
import {ArcadeSound} from './arcade-sound.js';
import {KickBuffer} from './arcade-kick-buffer.js';
import {normalizeColours,actorColour,applyActorColours,installColourSettings} from './arcade-colours.js';
import './arcade-enhancements.css';
import * as THREE from 'three';
import {keyboardMovement,localHopDirection,shouldFaceView} from './arcade-control-policy.js';
import { createWorld } from './world.js';
import { createCreature } from './creatures.js';
import { ARCADE_VERSION, SAVE_KEY, SETTINGS_KEY, RULES, OBSTACLES, SWARMS, newRound, newTrainingRound, step, saveRound, loadRound, kickTarget, canKick, sabotageTarget, ownBase, setProjectileWorld, projectileOrigin, traceWorldRay } from './arcade-model.js';
import './arcade.css';
import { cameraPose, resolveCameraBoom, screenToWorld, actorHeading, CAMERA_ORBIT } from './arcade-view-math.js';
import { drawRadar, drawFlyMarkers } from './arcade-radar.js';
import { traceAim } from './arcade-aim.js';
import { ARTILLERY, nearbyCatapult } from './arcade-artillery.js';
import { ArtilleryView } from './arcade-artillery-view.js';
import { ImpactEffects } from './arcade-impact-effects.js';
import { BASES, ENCLOSURES, coverAt, hasWallSight, createHouseFloors, createCatapultFloors, houseFloorAt } from './arcade-bases.js';
import { ArcadeBasesView } from './arcade-bases-view.js';
import { ArcadeGuardsView } from './arcade-guards-view.js';
import { GUARD_BODY, GUARD_RULES } from './arcade-guards.js';
import { createTouchLayout } from './arcade-touch-layout.js';
import { configureArcadeAppearance, applyArcadeAppearance } from './arcade-appearance.js';
import { normalizeCameraSettings, installCameraSettings } from './arcade-camera-settings.js';
import { CAMERA_LOOK, lookCamera, lookCameraRate } from './arcade-camera-look.js';
import { createTouchEdgeLook } from './arcade-touch-edge-look.js';
import { installTouchStick } from './arcade-touch-stick.js';
import { installTouchFire } from './arcade-touch-fire.js';
import { createMouseLookSession } from './arcade-mouse-look-session.js';
import { installMenuAction } from './arcade-menu-actions.js';
import { resolveMouseAim, resolveOverviewAim, pointerPixels } from './arcade-mouse-aim.js';
import { PROJECTILE } from './arcade-projectiles.js';
import { resolveAutoFire } from './arcade-auto-fire.js';
import { autoFireTargetVisible } from './arcade-auto-fire-visibility.js';
import {beginTap,moveTap,isTap,TapShotBuffer} from './arcade-touch-tap.js';
import { normalizeFireSettings, installFireSettings, applyMobileFireTrial } from './arcade-fire-settings.js';
import { actorVisualFacing } from './arcade-facing.js';
import { computeReticle, drawReticle } from './arcade-reticle.js';
import { desktopControlsMarkup, installDesktopControls } from './arcade-desktop-controls.js';
import { installContextActions } from './arcade-context-actions.js';
import { ARENA_RADIUS, BATTLEGROUND_AREAS, BATTLEGROUND_PALETTE, battlegroundHeight, battlegroundTint, battlegroundAreaAt, routeSample } from './arcade-battleground.js';
import { BattlegroundView } from './arcade-battleground-view.js';
import { createTargetLock } from './arcade-target-lock.js';
import { targetLockOrbit } from './arcade-lock-camera.js';
import { installArcadeVisualUpgrade } from './arcade-visual-upgrade.js';

const V=THREE.Vector3, UP=new V(0,1,0);
const SHOT_RANGE=PROJECTILE.muzzleOffset+RULES.projectileSpeed*RULES.projectileLifetime;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const MOVE_KEYS=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);
const read=(key)=>{try{return localStorage.getItem(key);}catch{return null;}};
const write=(key,value)=>{try{localStorage.setItem(key,value);return true;}catch{return false;}};
const svg=(body)=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${body}</svg>`;
const flyIcon=svg('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>');
const kickIcon=svg('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>');
const catapultIcon=svg('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>');
const playIcon=svg('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>');
const newRoundIcon=svg('<path d="M14 25a20 20 0 1 1 0 17" stroke="#f3ffd0" stroke-width="6" stroke-linecap="round"/><path d="m10 10 2 18 17-5" stroke="#f3ffd0" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M29 24v16l13-8z" fill="#f3ffd0"/>');
const settingsIcon=svg('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>');
const cameraSwitchIcon=svg('<rect x="8" y="17" width="35" height="31" rx="7"/><circle cx="26" cy="32" r="9"/><path d="m43 25 13-7v29l-13-8M16 10h17"/>');
const storageIcon=svg('<path d="M8 29 32 9l24 20M14 27v29h36V27" stroke="#f4dfad" stroke-width="5" stroke-linejoin="round"/><path d="M24 56V35h16v21" fill="#243e36" stroke="#f4dfad" stroke-width="3"/><path d="m12 12 11 10m29-10L41 22" stroke="#ffad7a" stroke-width="4"/>');


export class ArcadeGame {
 constructor(){
  this.touch=matchMedia('(pointer: coarse)').matches||navigator.maxTouchPoints>0;this.mouseControl=!this.touch;
  this.settings={volume:.5,musicVolume:.35,playerName:'Παίκτης',quality:this.touch?'low':'high'};try{Object.assign(this.settings,JSON.parse(read(SETTINGS_KEY)||'{}'));}catch{}
  Object.assign(this.settings,normalizeCameraSettings(this.settings),normalizeFireSettings(this.settings));this.settings.mouseTargetLock=this.settings.mouseTargetLock===true;delete this.settings.cameraAutoRotate;this.storageAlertUntil=-Infinity;
  Object.assign(this.settings,normalizeColours(this.settings));this.kickBuffer=new KickBuffer();this.tapShot=new TapShotBuffer();
  this.settings.volume=clamp(Number(this.settings.volume)||0,0,1);this.settings.musicVolume=clamp(Number(this.settings.musicVolume)||0,0,1);this.settings.playerName=playerName(this.settings.playerName);
  if(!['low','high'].includes(this.settings.quality))this.settings.quality='low';
  if(applyMobileFireTrial(this.settings,this.touch))write(SETTINGS_KEY,JSON.stringify(this.settings));
  const oldSave=read(SAVE_KEY);try{if(JSON.parse(oldSave)?.version===1&&!read(SAVE_KEY+'-before-bases'))write(SAVE_KEY+'-before-bases',oldSave);}catch{}
  this.state=newRound();this.saved=loadRound(oldSave);this.running=false;this.mode='title';this.keys=new Set();this.actions={fire:false,kick:false,sabotage:false};this.aimStrength=0;this.move={x:0,z:0};this.aim={x:0,z:-1};this.mouse={x:0,y:0,valid:false,inside:false};this.pointers=new Map();this.pointerTypes=new Map();this.layoutEditing=false;this.fx=[];this.particles=[];this.splats=[];this.tongues=new Map();this.bulletMeshes=new Map();this.koTimes=new Map();this.elapsed=0;this.shake=0;this.saveClock=0;this.accumulator=0;this.failures=[];this.hitConfirmUntil=0;this.lastPlayerHit=null;
  this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#9fe4ff');this.scene.fog=new THREE.FogExp2('#baf0ea',.006);
  this.renderer=new THREE.WebGLRenderer({antialias:!this.touch,powerPreference:'high-performance'});this.renderer.domElement.id='arcade-world';this.renderer.domElement.setAttribute('aria-label','FROG — κωμική μάχη με μύγες');this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.3;document.body.append(this.renderer.domElement);
  this.camera=new THREE.PerspectiveCamera(this.settings.cameraFov,innerWidth/innerHeight,.1,250);this.camera.position.set(0,8,15);this.focus=new V(0,2,3);this.cameraTarget=new V(0,8,15);this.cameraFollow=new V();this.viewMode='chase3d';this.cameraReady=false;
  this.cameraYaw=CAMERA_ORBIT.yaw;this.cameraPitch=CAMERA_ORBIT.pitch;this.cameraDrag=null;this.touchEdgeLook=createTouchEdgeLook();this.touchSticks={};this.autoFireTargetId=null;this.freeMousePoint=null;this.mouseFirePointer=null;this.lastMovement={x:0,z:0};this.stickAim={x:0,z:-1};
  this.mouseRay=new THREE.Raycaster();this.mousePoint=new V();this.mouseNdc=new THREE.Vector2();this.mousePlane=new THREE.Plane(UP,0);
  this.targetLock=createTargetLock(this);this.currentTargetLock=null;
  this.scene.add(new THREE.HemisphereLight('#def8ff','#52733a',2.6));this.sun=new THREE.DirectionalLight('#fff1bf',3.2);this.sun.position.set(-16,36,12);this.scene.add(this.sun);
  this.world=createWorld(this.scene,this.renderer,{seed:731,natural:true,palette:BATTLEGROUND_PALETTE,terrainProfile:battlegroundHeight,terrainTint:battlegroundTint,discoveryDecor:false,
   keepGroundClear:(x,z,padding=0)=>{
    if(Math.hypot(x,z)>ARENA_RADIUS+5)return false;
    const path=routeSample(x,z);
    return path.distance<path.width/2+.5+padding||ENCLOSURES.some(base=>Math.abs(x-base.x)<base.halfWidth+padding+.8&&Math.abs(z-base.z)<base.halfDepth+padding+.8);
   },
  });
  for(const refuge of [...this.world.creekRefuges])this.world.removeShelter(refuge.mesh);
  const sampleHeight=(x,z)=>this.world.getSurface(x,z).height;
  this.houseFloors=[...createHouseFloors(sampleHeight),...createCatapultFloors(sampleHeight)];
  const decorativeFlies=this.world.group.getObjectByName('Fly swarms');if(decorativeFlies)decorativeFlies.visible=false;for(const spot of this.world.hotspots)spot.flies=0;
  this.labels=document.createElement('canvas');this.labels.id='arcade-labels';document.body.append(this.labels);this.labelCtx=this.labels.getContext('2d');
  this.sound=new ArcadeSound();this.sound.volume=this.settings.volume;this.sound.musicVolume=this.settings.musicVolume;
  this.shared={sphere:new THREE.SphereGeometry(1,10,7),wing:new THREE.SphereGeometry(1,6,4),cylinder:new THREE.CylinderGeometry(1,1,1,8),circle:new THREE.CircleGeometry(1,18)};
  this.materials={insect:new THREE.MeshStandardMaterial({color:'#263f42',roughness:.8,metalness:0}),wing:new THREE.MeshBasicMaterial({color:'#edfcff',transparent:true,opacity:.86,side:THREE.DoubleSide,depthWrite:false}),tongue:new THREE.MeshStandardMaterial({color:'#ff839c',roughness:.4}),shot:new THREE.MeshStandardMaterial({color:'#384b4d',emissive:'#a6c9bf',emissiveIntensity:.16}),ink:new THREE.MeshBasicMaterial({color:'#90e44c',transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}),rock:new THREE.MeshStandardMaterial({color:'#617b70',roughness:.9}),rim:new THREE.MeshBasicMaterial({color:'#eaff9e',transparent:true,opacity:.6,depthWrite:false})};
  this.createArena();this.models=[];this.buildActors();this.createFlies();this.artilleryView=new ArtilleryView(this);this.basesView=new ArcadeBasesView(this);this.battlegroundView=new BattlegroundView(this);this.visualUpgrade=installArcadeVisualUpgrade(this);this.guardsView=new ArcadeGuardsView(this);this.impactEffects=new ImpactEffects(this);this.createUI();this.menuAnimation=installMenuAnimation(this);this.bindInputs();this.airControls=installAirControls(this);this.applyQuality();this.resize();this.showTitle();
  window.render_game_to_text=()=>JSON.stringify({coordinates:'x right/east, z south; metres',mode:this.mode,view:this.viewMode,actors:this.state.actors.map(a=>({id:a.id,x:a.x,z:a.z,ammo:a.ammo,dizzyTime:a.dizzyTime,kick:a.kick,ko:a.ko,height:a.height,flight:a.flight?.kind||null,jumps:a.flight?.jumps||0,vy:a.flight?.vy||0,support:a.support?.id||null})),phase:this.state.phase});
  window.__FROG__={version:ARCADE_VERSION,mode:'arcade',inspect:()=>this.inspect(),save:()=>this.persist()};
  if(new URLSearchParams(location.search).has('test'))window.advanceTime=ms=>{this.renderer.setAnimationLoop(null);for(let i=0;i<Math.max(1,Math.round(ms/(1000/60)));i++)this.frame(this.last+1000/60);};
  if(new URLSearchParams(location.search).has('test'))window.__FROG__.test={step:(input,n=1)=>{for(let i=0;i<n;i++){step(this.state,input,1/60);this.consumeEvents();}this.updateHUD();},state:()=>this.state,setState:(s)=>{this.state=s;this.buildActors();this.updateHUD();},input:()=>this.currentInput(),kickTarget:()=>kickTarget(this.state,this.state.actors[0])?.id};
  this.performanceMeter=installFrameMeter(this);this.last=performance.now();installCameraSettings(this,{onChange:()=>write(SETTINGS_KEY,JSON.stringify(this.settings))});installFireSettings(this,{onChange:()=>write(SETTINGS_KEY,JSON.stringify(this.settings))});this.renderer.setAnimationLoop(now=>this.frame(now));document.getElementById('boot')?.remove();
 }
 ground(x,z){return houseFloorAt(x,z,this.houseFloors)??this.world.getSurface(x,z).height;}
 cameraGround(x,z){return Math.max(this.ground(x,z),this.world.cameraSurfaceHeight(x,z));}
 createArena(){
  this.obstacleMeshes=[];
  for(const o of OBSTACLES){const mesh=new THREE.Mesh(new THREE.DodecahedronGeometry(o.r,1),this.materials.rock);mesh.scale.y=1.7;mesh.position.set(o.x,this.ground(o.x,o.z)+o.r*.9,o.z);this.scene.add(mesh);this.obstacleMeshes.push(mesh);}
  const points=[];for(let i=0;i<=160;i++){const a=i/160*Math.PI*2,x=Math.sin(a)*RULES.radius,z=Math.cos(a)*RULES.radius;points.push(new V(x,this.ground(x,z)+.06,z));}const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),this.materials.rim);this.scene.add(line);
  this.playerRing=new THREE.Mesh(new THREE.RingGeometry(1.05,1.18,32),new THREE.MeshBasicMaterial({color:'#ecff9a',side:THREE.DoubleSide,transparent:true,opacity:.85,depthWrite:false}));this.playerRing.rotation.x=-Math.PI/2;this.scene.add(this.playerRing);
  this.swarmRings=SWARMS.map(zone=>{const ring=new THREE.Mesh(new THREE.RingGeometry(zone.radius-.08,zone.radius+.03,40),new THREE.MeshBasicMaterial({color:'#c8e0a3',side:THREE.DoubleSide,transparent:true,opacity:.22,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.set(zone.x,this.ground(zone.x,zone.z)+.08,zone.z);this.scene.add(ring);return ring;});
 }
 buildActors(){
  setProjectileWorld(this.state,{ground:(x,z)=>this.ground(x,z),actorYaw:a=>this.models?.[this.state.actors.indexOf(a)]?.group.rotation.y,actorMouth:a=>{const m=this.models?.[this.state.actors.indexOf(a)];if(!m?.bones?.mouth)return null;const p=m.bones.mouth.getWorldPosition(this.airMouthScratch??=new V());return {x:p.x+a.x-m.group.position.x,y:p.y+this.ground(a.x,a.z)+a.height-m.group.position.y,z:p.z+a.z-m.group.position.z};}});
  for(const m of this.models||[])m.dispose();this.models=this.state.actors.map((a,i)=>{const m=createCreature('frog',{seed:7+i*39,team:i===0?'player':`enemy${i}`,role:i===2?'bruiser':'hunter',tier:1,level:1});m.setEquipment({});m.setOutline(i===0?'#e7fca7':i===1?'#ffae88':'#d3a8ff',true);if(this.settings.quality==='low')m.setRenderLOD(1);if(m.mesh?.material){const mat=m.mesh.material;mat.bumpScale=0;mat.roughness=.85;mat.userData?.tint?.set(actorColour(this.settings,a.id));}m.setOutline(actorColour(this.settings,a.id),true);configureArcadeAppearance(m);m.group.rotation.y=actorVisualFacing(a,{currentYaw:a.face}).yaw;this.scene.add(m.group);return m;});
 }
 createFlies(){
  const count=this.state.flies.length;
  this.flyBodies=new THREE.InstancedMesh(this.shared.sphere,this.materials.insect,count);
  this.flyWings=new THREE.InstancedMesh(this.shared.wing,this.materials.wing,count*2);
  for(const mesh of [this.flyBodies,this.flyWings]){mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;this.scene.add(mesh);}
  this.dummy=new THREE.Object3D();
 }
 createUI(){
  this.ui=document.createElement('div');this.ui.id='arcade-ui';this.ui.classList.toggle('is-touch',this.touch);
  this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε κεντραρισμένη κάτοψη">${cameraSwitchIcon}<span>ΠΙΣΩ 3D · C</span></button><div class="ammo-card">${flyIcon}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / ${RULES.capacity}</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Γέμισε στην αποθήκη σου</span></div></div><div class="ko-card base-card"><b id="ko-count">3 / 3</b><span>ΑΠΟΘΗΚΕΣ</span><div id="base-dots" aria-label="Άθικτες αποθήκες"><i data-owner="player"></i><i data-owner="rival-1"></i><i data-owner="rival-2"></i></div></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="round-status" hidden><b id="round-time">20″</b><span id="round-copy">ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου</span></div><div id="base-status" hidden><b id="base-warning-title" role="alert" aria-atomic="true"></b><span id="base-warning-detail"></span></div>
  <button id="catapult-button" class="touch-action catapult-button world-context" aria-label="E: είσοδος στον κοντινό καταπέλτη" hidden><kbd class="context-key">E</kbd>${catapultIcon}<span>ΕΙΣΟΔΟΣ</span></button><div id="catapult-status" class="world-context" hidden></div>
  <button id="sabotage-button" class="touch-action sabotage-button world-context" aria-label="Κράτησε E για 8 δευτερόλεπτα για να καταστρέψεις την εχθρική αποθήκη" hidden><kbd class="context-key">E</kbd>${storageIcon}<span>ΚΑΤΑΣΤΡΟΦΗ</span><small>Κράτα ${RULES.sabotageSeconds}″</small></button><div id="sabotage-status" class="world-context" hidden><span id="sabotage-copy"></span><div role="progressbar" aria-label="Καταστροφή αποθήκης" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="sabotage-track"><i id="sabotage-fill"></i></div></div>
  <div id="frog-actions" hidden></div>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: οι βάσεις, οι αντίπαλοι με τα επιλεγμένα χρώματα, είσοδοι, καταπέλτες και σμήνη"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-controls" hidden>${desktopControlsMarkup}</div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${kickIcon}<span>ΚΛΩΤΣΙΑ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Κατεύθυνση και ισχύς καταπέλτη"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><div id="touch-aim-hint"><span id="auto-fire-status">ΧΕΙΡΟΚΙΝΗΤΗ</span></div></div><span id="touch-aim-copy" class="stick-caption">ΘΕΑ / ΣΤΟΧΕΥΣΗ</span></div><button id="fire-button" type="button" class="touch-action fire-button" aria-label="Κράτα ΠΥΡ για βολή και σύρε για στόχευση">${flyIcon}<span>ΠΥΡ</span></button>${airControlsMarkup}<div class="touch-look-guide" aria-hidden="true">ΣΥΡΕ ΔΕΞΙΑ ΓΙΑ ΘΕΑ</div><button id="layout-button" class="layout-button" aria-label="Μετακίνηση χειριστηρίων"><b aria-hidden="true">↔</b><span>ΘΕΣΕΙΣ</span></button><div id="layout-hint" hidden>Σύρε τα χειριστήρια στη θέση σου.</div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><div class="menu-round-shell"><img class="menu-frogs menu-frogs-top" src="./art/menu-frogs-top.png" alt="Πράσινος και πορτοκαλί βάτραχος κρέμονται από τα κουμπιά" draggable="false"><div id="round-actions" class="round-actions" role="group" aria-label="Γύρος"><button id="new-round-button" class="round-action round-action-new" type="button">${newRoundIcon}<span>ΝΕΟΣ ΓΥΡΟΣ</span></button><button id="play-button" class="round-action round-action-resume" type="button" disabled>${playIcon}<span>ΣΥΝΕΧΕΙΑ</span></button></div></div><div class="menu-settings-shell"><img class="menu-frogs menu-frogs-settings" src="./art/menu-frog-settings.png" alt="Μοβ βάτραχος κρέμεται από τις Ρυθμίσεις και πιάνει μια μύγα" draggable="false"><button id="settings-button" class="art-button settings-button">${settingsIcon}<span>ΡΥΘΜΙΣΕΙΣ</span></button></div><div class="menu-utility-row"><button id="training-button" type="button" class="menu-utility-button"><span aria-hidden="true">◎</span> ΕΞΑΣΚΗΣΗ</button><button id="leaderboard-button" type="button" class="menu-utility-button"><span aria-hidden="true">≡</span> ΚΑΤΑΤΑΞΗ</button></div></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><div class="settings-grid"><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Μουσική <input id="music-volume" type="range" min="0" max="100" value="${Math.round(this.settings.musicVolume*100)}"></label><label class="quality-setting">Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label></div><label class="player-name-setting" for="player-name">Όνομα για τα ρεκόρ<input id="player-name" type="text" maxlength="18" autocomplete="nickname"></label><div class="fire-settings"><label for="touch-fire-mode">Βολή στο κινητό<select id="touch-fire-mode" aria-describedby="touch-fire-mode-help"><option value="tap">Χειροκίνητη · Tap Anywhere</option><option value="manual">Χειροκίνητη · ΠΥΡ</option><option value="auto">Αυτόματη · στόχευση</option></select></label><p id="touch-fire-mode-help"></p></div><div class="camera-settings-heading"><h3>Κάμερα</h3><button id="camera-reset" type="button">ΕΠΑΝΑΦΟΡΑ</button></div><div class="settings-grid camera-settings-grid"><label for="camera-zoom"><span>Zoom <output id="camera-zoom-value" for="camera-zoom">100%</output></span><input id="camera-zoom" type="range" min="70" max="150" step="5" value="100"></label><label for="camera-fov"><span>Οπτικό πεδίο <output id="camera-fov-value" for="camera-fov">52°</output></span><input id="camera-fov" type="range" min="40" max="80" step="1" value="52" aria-label="Οπτικό πεδίο FOV σε μοίρες"></label><label class="camera-sensitivity-label" for="camera-sensitivity"><span>Ευαισθησία <output id="camera-sensitivity-value" for="camera-sensitivity">100%</output></span><input id="camera-sensitivity" type="range" min="25" max="200" step="5" value="100" aria-label="Ευαισθησία ποντικιού και θέας"></label></div><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${playIcon}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${ARCADE_VERSION}</span></section>`;
  document.body.append(this.ui);this.$=id=>this.ui.querySelector('#'+id);this.$('quality').value=this.settings.quality;installColourSettings(this,()=>write(SETTINGS_KEY,JSON.stringify(this.settings)));applyActorColours(this);this.desktopControls=installDesktopControls(this);this.contextActions=installContextActions(this,{kickIcon});
  const lockSettings=document.createElement('div');lockSettings.className='fire-settings mouse-lock-settings';
  lockSettings.innerHTML='<label for="mouse-target-lock">Βοήθεια στόχευσης με ποντίκι<select id="mouse-target-lock" aria-describedby="mouse-target-lock-help"><option value="off">Κλειστή</option><option value="on">Κλείδωμα με δεξί κλικ</option></select></label><p id="mouse-target-lock-help">Προαιρετικά: κράτα δεξί κλικ κοντά σε ορατό αντίπαλο για κλείδωμα και αριστερό για βολές. Άφησε το δεξί για ελεύθερη στόχευση.</p>';
  const settingsPanel=this.$('settings-panel');settingsPanel.insertBefore(lockSettings,settingsPanel.querySelector('.camera-settings-heading'));
  this.$('mouse-target-lock').value=this.settings.mouseTargetLock?'on':'off';
  this.$('mouse-target-lock').onchange=e=>{this.settings.mouseTargetLock=e.target.value==='on';this.clearInputs();write(SETTINGS_KEY,JSON.stringify(this.settings));};
  this.$('view-button').onclick=e=>this.toggleView(e);installMenuAction(this.$('play-button'),e=>this.startOrResume(e));installMenuAction(this.$('pause-button'),()=>this.pause(),undefined,{allowSecondary:true});this.$('settings-button').onclick=()=>this.settingsMenu();this.$('result-settings').onclick=()=>this.settingsMenu();this.$('settings-back').onclick=()=>{this.$('arcade-menu').classList.remove('settings-open');this.$('settings-panel').hidden=true;if(this.mode==='result')this.$('result-panel').hidden=false;else this.$('menu-main').hidden=false;};installMenuAction(this.$('replay-button'),e=>this.startNew(e));installMenuAction(this.$('new-round-button'),e=>this.startNew(e));
  this.$('player-name').value=this.settings.playerName;this.$('player-name').onchange=e=>{this.settings.playerName=playerName(e.target.value);e.target.value=this.settings.playerName;write(SETTINGS_KEY,JSON.stringify(this.settings));};this.$('music-volume').oninput=e=>{this.settings.musicVolume=Number(e.target.value)/100;this.sound.musicVolume=this.settings.musicVolume;write(SETTINGS_KEY,JSON.stringify(this.settings));};
  this.$('volume').oninput=e=>{this.settings.volume=Number(e.target.value)/100;this.sound.volume=this.settings.volume;write(SETTINGS_KEY,JSON.stringify(this.settings));};this.$('quality').onchange=e=>{this.settings.quality=e.target.value;this.applyQuality();write(SETTINGS_KEY,JSON.stringify(this.settings));};
  this.touchLayout=createTouchLayout({root:this.$('touch-controls'),movePad:this.ui.querySelector('.move-zone'),aimPad:this.ui.querySelector('.aim-zone'),fireButton:this.$('fire-button'),jumpButton:this.$('jump-button'),dashButton:this.$('dash-button'),volleyButton:this.$('air-volley-button'),toggleButton:this.$('layout-button'),storageKey:'frog-touch-layout-v1',onEditingChange:editing=>{this.layoutEditing=editing;this.clearInputs();this.accumulator=0;this.contextLayout=null;this.updateHUD();if(editing)this.sound.pause();else if(this.running)this.sound.resume();},announce:text=>this.message(text,2)});this.roundUI=installRoundUI(this);this.$('training-button').onclick=e=>this.state.training?this.exitTraining():this.startTraining(e);this.$('leaderboard-button').onclick=()=>this.roundUI.open();
 }
 showTitle(){this.running=false;this.mode='title';this.updateRoundActions();this.ui.classList.add('in-menu');}
 updateRoundActions(){this.$('play-button').disabled=!(this.mode==='pause'&&this.state.status==='playing'||this.saved?.status==='playing');}
 settingsMenu(){this.roundUI.panel.hidden=true;this.$('arcade-menu').classList.add('settings-open');this.$('menu-main').hidden=true;this.$('result-panel').hidden=true;this.$('settings-panel').hidden=false;}
 startOrResume(event){if(this.running)return;if(this.mode==='pause'&&this.state.status==='playing'){this.go(event);return;}if(this.saved?.status==='playing'){this.state=this.saved;this.saved=null;this.resetCamera();this.buildActors();this.go(event);}}
 toggleView(event){this.clearInputs();this.viewMode=this.viewMode==='chase3d'?'overview':'chase3d';this.$('view-button').innerHTML=cameraSwitchIcon+'<span>'+(this.viewMode==='chase3d'?'ΠΙΣΩ 3D · C':'ΚΑΤΟΨΗ · C')+'</span>';this.$('view-button').setAttribute('aria-label',this.viewMode==='chase3d'?'Αλλαγή σε κεντραρισμένη κάτοψη':'Αλλαγή σε κάμερα πίσω από τον βάτραχο');this.cameraReady=false;if(this.viewMode==='overview'){const heading=actorHeading(this.state.actors[0]);this.aim={...heading};this.stickAim={x:heading.x,z:heading.z};this.releaseMouseLook();}else{if(!this.state.actors[0].catapultId||!this.mouseControl)this.centerAim();if(this.running&&(event?.pointerType==='mouse'||(this.mouseControl||event?.type==='keydown')&&!['touch','pen'].includes(event?.pointerType)))this.requestMouseLook();}}
 startTraining(event){if(this.running)return;this.saved=loadRound(read(SAVE_KEY));this.state=newTrainingRound();this.resetCamera();this.clearEffects();this.buildActors();this.go(event);this.message('Κινούμενοι στόχοι · άπειρες μύγες',2.5);}
 exitTraining(){if(this.running)this.pause();this.saved=loadRound(read(SAVE_KEY));this.state=this.saved||newRound();this.clearInputs();this.clearEffects();this.buildActors();this.resetCamera();this.showTitle();this.$('arcade-menu').hidden=false;this.$('menu-main').hidden=false;this.$('settings-panel').hidden=true;this.$('result-panel').hidden=true;this.roundUI.panel.hidden=true;this.updateHUD();}
 startNew(event){if(this.running)return;this.storageAlertUntil=-Infinity;this.saved=null;this.state=newRound(731+Math.floor(Math.random()*100000));this.resetCamera();this.clearEffects();this.buildActors();this.go(event);this.message(`${RULES.capacity} μύγες έτοιμες!`,1.6);}
 resetCamera(){const p=this.state.actors[0],heading=actorHeading(p);this.cameraYaw=Math.atan2(heading.x,heading.z);this.cameraPitch=CAMERA_ORBIT.pitch;this.cameraReady=false;this.mouse.valid=false;this.aim={x:p.aimX,z:p.aimZ};this.stopCameraDrag();}
 beginCameraDrag(e){if(this.cameraDrag||this.pointers.has('aim')||e.clientX<this.w*.4)return;this.mouseControl=false;if(this.viewMode==='overview')this.captureMouseAim(e);else this.centerAim();this.tapShot.clear();this.cameraDrag={id:e.pointerId,type:e.pointerType,x:e.clientX,y:e.clientY,tap:beginTap(e)};this.touchEdgeLook.begin(e);const canvas=this.renderer.domElement;canvas.setPointerCapture(e.pointerId);canvas.classList.add('camera-dragging');}
 endCameraDrag(e){const drag=this.cameraDrag;if(drag?.id!==e.pointerId)return;const shoot=this.settings.touchFireMode==='tap'&&this.running&&!this.layoutEditing&&!this.state.actors[0].catapultId&&!this.touchFire?.firing&&isTap(drag.tap,e);this.stopCameraDrag();if(shoot)this.tapShot.request(this.elapsed);}
 stopCameraDrag(){const drag=this.cameraDrag;this.cameraDrag=null;if(drag&&['touch','pen'].includes(drag.type))freezeOverviewTouchAim(this);this.touchEdgeLook?.clear();this.autoFireTargetId=null;const canvas=this.renderer?.domElement;if(drag&&canvas?.hasPointerCapture?.(drag.id))canvas.releasePointerCapture(drag.id);canvas?.classList.remove('camera-dragging');}
 go(event){this.roundUI.panel.hidden=true;if(event?.pointerType==='touch'||event?.pointerType==='pen')this.mouseControl=false;else if(event?.pointerType==='mouse')this.mouseControl=true;this.$('arcade-menu').classList.remove('settings-open');this.clearInputs();if(this.mouseControl&&Number.isFinite(event?.clientX)&&Number.isFinite(event?.clientY))this.freeMousePoint={x:event.clientX,y:event.clientY};this.accumulator=0;this.last=performance.now();this.running=true;this.mode='play';this.$('arcade-menu').hidden=true;this.$('settings-panel').hidden=true;this.$('result-panel').hidden=true;this.$('menu-main').hidden=false;this.$('arcade-hud').hidden=false;this.$('desktop-controls').hidden=this.touch;this.$('touch-controls').hidden=!this.touch;this.ui.classList.remove('in-menu');this.sound.resume();this.updateHUD();this.touchLayout?.refresh();this.persist();if(this.viewMode==='chase3d'){if(!this.state.actors[0].catapultId||!this.mouseControl)this.centerAim();if(this.mouseControl)this.requestMouseLook();}}
 pause(){if(!this.running)return;this.touchLayout?.setEditing(false);this.running=false;this.mode='pause';this.roundUI?.update();this.clearInputs();this.releaseMouseLook();this.persist();this.sound.pause();this.$('arcade-menu').hidden=false;this.$('menu-main').hidden=false;this.$('settings-panel').hidden=true;this.updateRoundActions();this.ui.classList.add('in-menu');}
 finish(){this.touchLayout?.setEditing(false);this.running=false;this.mode='finishing';this.resultAt=this.elapsed+.85;this.clearInputs();this.releaseMouseLook();this.persist();}
 showResult(){this.running=false;this.mode='result';this.clearInputs();this.persist();const won=this.state.status==='won';this.sound.play(won?'win':'lost');this.$('arcade-menu').hidden=false;this.$('menu-main').hidden=true;this.$('result-panel').hidden=false;this.$('result-title').textContent=won?'Η ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ!':'Η ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ';this.$('result-copy').textContent=won?`${this.state.stats.kos} νοκ άουτ · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″ μάχης`:'Κράτησε την είσοδο, διέκοψε τους εισβολείς με μία εύστοχη βολή και ανεφοδιάσου πριν ξαναβγείς.';this.ui.classList.add('in-menu');this.roundUI.showResults();}
 persist(){if(this.state.training||this.mode==='title')return false;if(!this.state.recordId)this.state.recordId=globalThis.crypto?.randomUUID?.()||`r-${Date.now()}-${Math.random().toString(36).slice(2)}`;return write(SAVE_KEY,saveRound(this.state));}
 queueKick(targetId){this.kickBuffer.request(this.elapsed,targetId);}
 clearInputs(){this.tapShot?.clear();this.touchFire?.clear();this.kickBuffer?.clear();for(const stick of Object.values(this.touchSticks||{}))stick.clear();this.targetLock?.end();this.currentTargetLock=null;this.artilleryView?.hidePreview?.();this.lastMovement={x:0,z:0};this.freeMousePoint=null;this.stopMouseFireCapture();this.renderer?.domElement.classList.remove('mouse-aiming');this.currentAimPreview=null;this.currentAimReticle=null;this.currentAimScreen=null;this.currentAimCursorScreen=null;this.currentAimPathScreen=[];this.pendingKickTargetId=null;this.desktopControls?.clear();this.contextActions?.clear();this.keys.clear();this.actions={fire:false,kick:false,sabotage:false};this.aimStrength=0;this.mouse.valid=false;this.mouse.inside=false;this.move={x:0,z:0};this.pointers.clear();this.pointerTypes.clear();this.stopCameraDrag();if(this.ui){for(const el of this.ui.querySelectorAll('.stick-knob'))el.style.transform='translate(-50%,-50%)';this.$('aim-stick').classList.remove('firing');this.$('fire-button')?.classList.remove('firing');}}
 pointerLocked(){return document.pointerLockElement===this.renderer.domElement;}
 requestMouseLook(){
  if(this.state.actors[0].catapultId)return;
  this.mouseControl=true;this.mouseLookSession?.request();
 }
 releaseMouseLook(){this.mouseLookSession?.release();}
 stopMouseFireCapture(){const id=this.mouseFirePointer;this.mouseFirePointer=null;const canvas=this.renderer?.domElement;if(id!=null&&canvas?.hasPointerCapture?.(id))canvas.releasePointerCapture(id);}
 turnFreeMouse(event){this.mouseControl=true;const next={x:event.clientX,y:event.clientY};if(!Number.isFinite(next.x)||!Number.isFinite(next.y))return;const previous=this.freeMousePoint;this.freeMousePoint=next;if(previous)this.turnLook(next.x-previous.x,next.y-previous.y);}
 centerAim(){this.mouse.x=this.w/2;this.mouse.y=this.h/2;this.mouse.valid=true;}
 turnLook(dx,dy,touch=false){
  if(!this.running||this.layoutEditing||this.viewMode!=='chase3d')return;
  const orbit=lookCamera({yaw:this.cameraYaw,pitch:this.cameraPitch},dx,dy,{sensitivity:(touch?CAMERA_LOOK.touchSensitivity:CAMERA_LOOK.sensitivity)*this.settings.cameraSensitivity});
  this.cameraYaw=orbit.yaw;this.cameraPitch=orbit.pitch;this.centerAim();
 }
 bindInputs(){
  addEventListener('keydown',e=>{if(e.target.matches('input,select'))return;if(e.code==='Escape'){e.preventDefault();if(this.layoutEditing){this.touchLayout.setEditing(false);return;}if(this.running)this.pause();return;}if(!this.running||this.layoutEditing)return;if(e.code==='KeyQ'&&!e.repeat)this.queueKick();if(e.code==='KeyC'&&!e.repeat){e.preventDefault();this.toggleView(e);return;}if(MOVE_KEYS.has(e.code)||['KeyQ','KeyE'].includes(e.code)){e.preventDefault();this.keys.add(e.code);}});
  addEventListener('keyup',e=>this.keys.delete(e.code));
  const canvas=this.renderer.domElement;
  const beginMouseLock=e=>{
   if(!this.running||this.layoutEditing||this.settings.mouseTargetLock!==true||this.state.actors[0].catapultId)return;
   this.mouseControl=true;
   const anchor=this.viewMode==='chase3d'?{x:this.w/2,y:this.h/2}:pointerPixels({x:e.clientX,y:e.clientY},canvas.getBoundingClientRect(),this.w,this.h);
   this.currentTargetLock=this.targetLock.start(anchor);
  };
  const releaseMouseLock=()=>{this.targetLock?.end();this.currentTargetLock=null;};
  this.mouseLookSession=createMouseLookSession({canvas,
   active:()=>this.running&&!this.layoutEditing&&this.viewMode==='chase3d'&&!this.state.actors[0].catapultId,
   onLock:()=>{this.stopMouseFireCapture();this.freeMousePoint=null;this.centerAim();},
   onUnexpectedUnlock:()=>{this.actions.fire=false;this.pause();},
  });
  // Keep locked look on the native pointer stream which owns canvas input.
  // Do not depend on separately generated compatibility mouse events.
  canvas.addEventListener('pointermove',e=>{
   if(!this.running||this.layoutEditing)return;
   if(e.pointerType==='mouse'){
    // A second mouse button changes a chord through pointermove, not a new
    // pointerdown. Treat a deliberate left-button transition as a fresh shot.
    if(e.button===0&&(e.buttons&1))beginMouseFire(e);
    if(e.button===2&&(e.buttons&2))beginMouseLock(e);
    if(this.state.actors[0].catapultId){this.captureCatapultMouse(e);return;}
    if(this.pointerLocked())this.turnLook(e.movementX,e.movementY);
    else if(this.viewMode==='overview')this.captureMouseAim(e);
    else this.turnFreeMouse(e);
    return;
   }
   if(this.cameraDrag?.id===e.pointerId){moveTap(this.cameraDrag.tap,e);e.preventDefault();if(this.viewMode==='overview')this.captureMouseAim(e);else{this.turnLook(e.clientX-this.cameraDrag.x,e.clientY-this.cameraDrag.y,true);this.touchEdgeLook.move(e);}this.cameraDrag.x=e.clientX;this.cameraDrag.y=e.clientY;}
  });
  const beginMouseFire=e=>{
    if(!this.running||this.layoutEditing)return;
    if(this.state.actors[0].catapultId){
     this.captureCatapultMouse(e);
     if(!this.pointerLocked()){this.mouseFirePointer=e.pointerId;canvas.setPointerCapture(e.pointerId);}
     this.actions.fire=true;return;
    }
    if(this.viewMode==='chase3d'){
     this.centerAim();
     if(!this.pointerLocked()){
      this.freeMousePoint={x:e.clientX,y:e.clientY};
      this.mouseFirePointer=e.pointerId;canvas.setPointerCapture(e.pointerId);
      this.requestMouseLook();
     }
    }else this.captureMouseAim(e);
    this.actions.fire=true;
  };
  canvas.addEventListener('pointerdown',e=>{
   if(!this.running||this.layoutEditing)return;e.preventDefault();
   if(e.pointerType==='touch'||e.pointerType==='pen'){this.beginCameraDrag(e);return;}
   if(e.button===0)beginMouseFire(e);
   if(e.button===2)beginMouseLock(e);
  });
  canvas.addEventListener('mousedown',e=>{if(e.button===2)beginMouseLock(e);});
  addEventListener('pointerup',e=>{if(e.pointerType==='mouse'&&e.button===2)releaseMouseLock();});
  addEventListener('mouseup',e=>{if(e.button===2)releaseMouseLock();});
  addEventListener('pointermove',e=>{if(e.pointerType==='mouse'&&!(e.buttons&2)&&this.targetLock?.held)releaseMouseLock();});
  addEventListener('pointercancel',e=>{if(e.pointerType==='mouse')releaseMouseLock();});
  addEventListener('pointerup',e=>{if(this.cameraDrag?.id===e.pointerId)this.endCameraDrag(e);if(e.pointerType==='mouse'&&e.button===0){if(!this.touchFire?.firing)this.actions.fire=false;this.stopMouseFireCapture();}});
  const releaseMouseFire=e=>{if(e.buttons&1)return;if(!this.touchFire?.firing)this.actions.fire=false;this.stopMouseFireCapture();};
  addEventListener('pointermove',e=>{if(e.pointerType==='mouse')releaseMouseFire(e);});
  addEventListener('mouseup',e=>{if(e.button===0)releaseMouseFire(e);});
  canvas.addEventListener('pointercancel',e=>{if(this.cameraDrag?.id===e.pointerId)this.stopCameraDrag();if(e.pointerType==='mouse'&&(this.mouseFirePointer===null||this.mouseFirePointer===e.pointerId)){this.stopMouseFireCapture();if(!this.touchFire?.firing)this.actions.fire=false;this.freeMousePoint=null;}});
  canvas.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&!this.pointerLocked())this.freeMousePoint={x:e.clientX,y:e.clientY};});
  canvas.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'){this.freeMousePoint=null;if(this.viewMode==='overview'&&!this.state.actors[0].catapultId&&!e.buttons){this.mouse.valid=false;canvas.classList.remove('mouse-aiming');}}});
  canvas.addEventListener('lostpointercapture',e=>{if(this.cameraDrag?.id===e.pointerId)this.stopCameraDrag();});
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  this.touchFire=installTouchFire(this);this.touchSticks.move=installTouchStick(this,{id:'move-stick',kind:'move'});this.touchSticks.aim=installTouchStick(this,{id:'aim-stick',kind:'aim'});
  const hold=(id,key)=>{const el=this.$(id);let pointer=null;
   el.onpointerdown=e=>{if(!this.running||this.layoutEditing||el.disabled||el.closest('[hidden]')||e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();pointer=e.pointerId;el.setPointerCapture(e.pointerId);if(this.viewMode==='chase3d')this.centerAim();this.actions[key]=true;};
   const release=e=>{if(e.pointerId===pointer){pointer=null;this.actions[key]=false;}};el.onpointerup=release;el.onpointercancel=release;el.onlostpointercapture=release;
  };hold('kick-button','kick');hold('sabotage-button','sabotage');
  addEventListener('blur',()=>{this.clearInputs();if(this.running)this.pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden){this.clearInputs();this.pause();this.sound.pause();}});addEventListener('beforeunload',()=>this.persist());addEventListener('resize',()=>{this.clearInputs();this.resize();});
 }
 applyQuality(){const low=this.settings.quality==='low';this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,low?1:1.5));for(const m of this.models)m.setRenderLOD(low?1:0);this.battlegroundView?.setQuality?.(low);this.resize();}
 resize(){const w=innerWidth,h=innerHeight;this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.cameraReady=false;this.labels.width=w;this.labels.height=h;this.w=w;this.h=h;this.touchLayout?.refresh();}
 captureMouseAim(e){
  const pixels=pointerPixels({x:e.clientX,y:e.clientY},this.renderer.domElement.getBoundingClientRect(),this.w,this.h);if(!pixels)return;
  if(e.pointerType)this.mouseControl=e.pointerType==='mouse';
  this.mouse.x=pixels.x;this.mouse.y=pixels.y;this.mouse.valid=true;this.mouse.inside=true;this.updateMouseTarget();
 }
 movementInput(){
  this.lastMovement=keyboardMovement(this.keys,this.move,this.viewMode,this.cameraYaw);
  return this.lastMovement;
 }
 updateMouseTarget(){
  const p=this.state.actors[0];
  if(this.viewMode==='chase3d'&&(!p.catapultId||!this.mouseControl)){
   // Mouse displacement turns the camera. Do not also aim through its old
   // absolute screen position: this used to apply two different aim systems.
   this.centerAim();
  }
  if(!this.mouse.valid){this.mouse.targetId=null;return;}
  this.mouseNdc.set(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2);this.mouseRay.setFromCamera(this.mouseNdc,this.camera);
  if(p.catapultId){
   // A catapult still selects a landing point; its separate ballistic arc stays intact.
   this.mousePlane.constant=-this.ground(p.x,p.z)-.9;
   if(this.mouseRay.ray.intersectPlane(this.mousePlane,this.mousePoint))this.mouse.target={x:this.mousePoint.x,y:this.mousePoint.y,z:this.mousePoint.z};
   else{const direction=this.mouseRay.ray.direction,length=Math.hypot(direction.x,direction.z),forward=screenToWorld(0,-1,this.camera.position,this.focus);this.mouse.target={x:p.x+(length>1e-6?direction.x/length:forward.x)*ARTILLERY.maxRange,y:this.ground(p.x,p.z),z:p.z+(length>1e-6?direction.z/length:forward.z)*ARTILLERY.maxRange};}
   this.mouse.direction=null;this.mouse.targetId=null;return;
  }
  const muzzle=projectileOrigin(this.state,p),ray=this.mouseRay.ray,range=SHOT_RANGE;
  const dx=muzzle.x-ray.origin.x,dy=muzzle.y-ray.origin.y,dz=muzzle.z-ray.origin.z;
  const solidFrom=Math.max(0,dx*ray.direction.x+dy*ray.direction.y+dz*ray.direction.z);
  const hit=traceWorldRay(this.state,ray.origin,ray.direction,Math.hypot(dx,dy,dz)+range,{ignoreId:p.id,solidFrom});
  const options={rayOrigin:ray.origin,rayDirection:ray.direction,muzzle,range,hits:hit?[hit]:[],planeHeight:this.ground(p.x,p.z)+PROJECTILE.originHeight,fallback:this.aim};
  let aim=this.viewMode==='overview'?resolveOverviewAim(options):resolveMouseAim(options);
  this.mouse.target=aim.target;this.mouse.targetId=this.viewMode==='overview'?aim.targetId:aim.source==='hit'?hit?.targetId??null:null;
  // Baskets and foliage can hide an actor beyond the projectile solids. A hidden
  // body must not silently select a 3D target through its visible cover.
  if(this.viewMode==='overview'&&this.mouse.targetId&&!this.autoFireTargetVisible(this.mouse.targetId)){
   aim=resolveOverviewAim({...options,hits:[]});this.mouse.target=aim.target;this.mouse.targetId=null;
  }
  this.mouse.direction=aim.direction;this.mouse.distance=aim.distance;this.mouse.source=aim.source;
 }
 autoFireTargetVisible(targetId,options){return autoFireTargetVisible(this,targetId,options);}
 aimFromScreen(x,y){
  const p=this.state.actors[0],height=this.ground(p.x,p.z)+.9,origin=this.project(p.x,height,p.z),reach=Math.min(this.w,this.h)*.34;
  const point=new V(),ray=new THREE.Raycaster();
  ray.setFromCamera(new THREE.Vector2((origin.x+x*reach)/this.w*2-1,1-(origin.y+y*reach)/this.h*2),this.camera);
  if(ray.ray.intersectPlane(new THREE.Plane(UP,-height),point)){
   const dx=point.x-p.x,dz=point.z-p.z,d=Math.hypot(dx,dz);
   if(d>.05&&Number.isFinite(d))return {x:dx/d,z:dz/d,distance:d};
  }
  return screenToWorld(x,y,this.camera.position,this.focus);
 }
 currentInput(){
  if(this.layoutEditing){this.autoFireTargetId=null;this.pendingKickTargetId=null;return {};}
  const p=this.state.actors[0],stickAiming=this.pointers.has('aim'),touchAim=stickAiming&&this.aimStrength>.08,aiming=this.viewMode==='chase3d'||this.viewMode==='overview'&&!p.catapultId||this.actions.fire||stickAiming||this.mouse.valid;
  if(stickAiming&&this.viewMode==='overview'){this.mouse.valid=false;if(touchAim)this.aim={...screenToWorld(this.stickAim.x,this.stickAim.z,this.camera.position,this.focus),distance:14};}
  this.updateMouseTarget();
  if(this.mouse.valid&&aiming&&this.mouse.target){if(!p.catapultId&&this.mouse.direction)this.aim={...this.mouse.direction,distance:this.mouse.distance};else{const dx=this.mouse.target.x-p.x,dz=this.mouse.target.z-p.z,d=Math.hypot(dx,dz);if(d>.1)this.aim={x:dx/d,z:dz/d,distance:d};}}
  this.currentTargetLock=this.targetLock?.update()||null;
  if(this.currentTargetLock)this.aim={...this.currentTargetLock.direction,distance:this.currentTargetLock.distance};
  const movement=this.movementInput();if(this.pendingKickTargetId)this.queueKick(this.pendingKickTargetId);this.pendingKickTargetId=null;const bufferedKick=this.kickBuffer.read(this.elapsed,p),kickTargetId=bufferedKick?.targetId;
  const faceAim=shouldFaceView(this.viewMode,{mounted:!!p.catapultId,locked:!!this.currentTargetLock,pointerAiming:this.mouse.valid,touchAiming:touchAim});
  return {mx:movement.x,mz:movement.z,ax:this.aim.x,ay:this.aim.y,az:this.aim.z,aiming,faceAim,fire:kickTargetId?false:(this.actions.fire||this.tapShot.read(this.elapsed,p,this.actions.kick||!!bufferedKick||this.keys.has('KeyQ')||this.actions.sabotage||this.keys.has('KeyE'))),kick:!!bufferedKick||this.actions.kick||this.keys.has('KeyQ'),...(kickTargetId?{kickTargetId}:{}),sabotage:!this.state.training&&!p.catapultId&&(this.actions.sabotage||this.keys.has('KeyE'))};
 }
 installAutoFire(){
  // Resolve last, after tap buffering and catapult actions. Even a very short
  // special-action tap must take priority over automatically firing a fly.
  const originalInput=this.currentInput.bind(this);
  this.currentInput=()=>{
   const input=originalInput(),worldTouch=this.cameraDrag?.type==='touch'||this.cameraDrag?.type==='pen',stickTouch=this.pointers.has('aim')&&['touch','pen'].includes(this.pointerTypes.get('aim'));
   const directional=this.viewMode==='overview'&&stickTouch,touchAiming=worldTouch||stickTouch;
   const automatic=resolveAutoFire({state:this.state,actor:this.state.actors[0],input,active:this.running&&!this.layoutEditing&&this.settings.touchFireMode==='auto',aiming:touchAiming&&(directional||!!this.mouse.targetId)});
   this.autoFireTargetId=automatic.fire&&this.autoFireTargetVisible(automatic.targetId,{directional})?automatic.targetId:null;
   if(this.autoFireTargetId)input.fire=true;
   return input;
  };
 }
 message(text,seconds=1.5){this.$('callout').textContent=text;this.calloutUntil=this.elapsed+seconds;}
 makeFlyBullet(){const g=new THREE.Group(),b=new THREE.Mesh(this.shared.sphere,this.materials.shot);b.scale.set(.12,.10,.19);g.add(b);for(const side of [-1,1]){const w=new THREE.Mesh(this.shared.wing,this.materials.wing);w.position.set(side*.13,.07,0);w.scale.set(.17,.018,.09);g.add(w);}this.scene.add(g);return g;}
 consumeEvents(){
  for(const e of this.state.events){if(e.type==='kick'&&e.id==='player'){this.kickBuffer.clear();this.sound.play('kick');}this.artilleryView?.consumeEvent(e);this.guardsView?.consumeEvent?.(e);const index=this.state.actors.findIndex(a=>a.id===e.id),a=this.state.actors[index],m=this.models[index];
   // Automatic resupply stays silent; fresh spawns already carry a full magazine.
   if(e.type==='tongue'&&a){const old=this.tongues.get(a.id);if(old)this.scene.remove(old.mesh);const mesh=new THREE.Mesh(this.shared.cylinder,this.materials.tongue);this.scene.add(mesh);this.tongues.set(a.id,{mesh,start:this.elapsed,x:e.x,z:e.z});}
   if((e.type==='hop'||e.type==='land'&&!e.stone)&&a){const p=this.state.actors[0],d=Math.hypot(a.x-p.x,a.z-p.z);if(a.id==='player'||d<9)this.sound.play(e.type==='hop'?'hop':'hopLand',a.id==='player'?.65:.14*(1-d/9));}
   if(e.type==='shot'&&a){if(a.id==='player')this.tapShot.clear();const player=this.state.actors[0],distance=Math.hypot(a.x-player.x,a.z-player.z);if(a.id==='player'||distance<18)this.sound.play('shot',a.id==='player'?1:.45*(1-distance/18));}
   if(e.type==='hit'&&m){m.mesh.material.emissive?.set('#ffffff');const yaw=m.group.rotation.y,c=Math.cos(yaw),ss=Math.sin(yaw);m.setImpact({x:c*e.dx-ss*e.dz,z:ss*e.dx+c*e.dz,strength:1.3,duration:a.knockUp>0?.42:.27});this.impactEffects.hit({...e,height:Number.isFinite(e.y)?e.y:this.ground(e.x,e.z)+a.height+.75,heavy:a.knockUp>0});this.shake=Math.max(this.shake,a.id==='player'?.16:.025);if(e.owner==='player'&&a.id!=='player'){this.hitConfirmUntil=this.elapsed+.2;this.lastPlayerHit={id:a.id,x:e.x,y:e.y,z:e.z,time:this.elapsed};this.sound.play('hitConfirm');}else if(a.id==='player')this.sound.play('hit');}
   if(e.type==='guardHit'&&e.owner==='player'){this.hitConfirmUntil=this.elapsed+.2;this.lastPlayerHit={id:e.id,x:e.x,y:this.ground(e.x,e.z)+GUARD_BODY.centerY,z:e.z,time:this.elapsed};this.sound.play('hitConfirm');}
   if(e.type==='guardWindup'&&e.targetId==='player')this.sound.play('guardWindup');
   if(e.type==='guardDown'){const guard=this.state.guards?.find(item=>item.id===e.id);if(e.owner==='player')this.message(`Φύλακας εκτός · ${GUARD_RULES.respawnSeconds}″ για επίθεση στην αποθήκη`,2.2);else if(guard?.owner==='player')this.message('Ο φύλακάς σου έπεσε! Προστάτεψε την αποθήκη.',2.2);}
   if(e.type==='dizzy'){this.addText('ΖΑΛΗ!',a.x,a.z,'#ffe375',1);this.sound.play('dizzy');if(a.id!=='player')this.message('ΖΑΛΗ! Πλησίασε για κλωτσιά ή συνέχισε τις βολές.',2);}
   if(e.type==='ko'){this.koTimes.set(a.id,{time:this.elapsed,dx:e.dx,dz:e.dz});this.addText('ΝΟΚ ΑΟΥΤ!',a.x,a.z,'#ffe791',1.4);this.sound.play('ko');this.shake=.32;this.makeSplat({...e,wall:false});}
   if(e.type==='respawn'){this.koTimes.delete(e.id);if(e.id==='player'){this.clearInputs();this.resetCamera();this.message(`Επέστρεψες με ${RULES.capacity} μύγες!`,2);}}
   if(e.type==='sabotageStart'){if(e.id==='player'){if(this.elapsed>=this.storageAlertUntil){this.sound.play('storageAlert');this.storageAlertUntil=this.elapsed+3;}}else if(e.by==='player')this.message('Κράτα μέχρι το τέλος · οι βολές εναντίον σου διακόπτουν.',2);}
   if(e.type==='sabotageInterrupted'&&e.by==='player')this.message(e.reason==='hit'?'Σε χτύπησαν! Η καταστροφή διακόπηκε.':'Η καταστροφή διακόπηκε.',1.5);
   if(e.type==='baseDestroyed'){const base=BASES.find(b=>b.id===e.baseId);if(base)this.addText('ΑΠΟΘΗΚΗ ΚΑΤΑΣΤΡΑΦΗΚΕ',base.stock.x,base.stock.z,'#ffc689',2);this.sound.play('stoneImpact');this.shake=.2;}
   if(e.type==='splat')this.makeSplat(e);
   if(e.type==='stoneShot')this.sound.play('stoneShot');
   if(e.type==='land'&&e.stone){this.impactEffects.landing(e);if(Math.hypot(e.x-this.state.actors[0].x,e.z-this.state.actors[0].z)<10)this.sound.play('land');}
   if(e.type==='stoneImpact'){this.sound.play('stoneImpact');this.impactEffects.stone(e);if(Math.hypot(e.x-this.state.actors[0].x,e.z-this.state.actors[0].z)<7)this.shake=Math.max(this.shake,.16);}
   if(e.type==='battle')this.roundUI.battle();
  }
 }
 addText(text,x,z,color,life){this.fx.push({text,x,z,color,life,start:this.elapsed});if(this.fx.length>28)this.fx.shift();}
 burst(x,z){for(let i=0;i<9;i++){const mesh=new THREE.Mesh(this.shared.sphere,this.materials.shot);mesh.scale.setScalar(.06+Math.random()*.07);mesh.position.set(x,this.ground(x,z)+1,z);this.scene.add(mesh);this.particles.push({mesh,start:this.elapsed,v:new V((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)});}while(this.particles.length>90)this.particles.shift().mesh.removeFromParent();}
 makeSplat(e){
  const vertices=[];const N=20;for(let i=0;i<N;i++){const a=i/N*6.283,b=(i+1)/N*6.283,r=.4+(i%3)*.14,r2=.4+((i+1)%3)*.14;vertices.push(0,0,0,Math.cos(a)*r,Math.sin(a)*r,0,Math.cos(b)*r2,Math.sin(b)*r2,0);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));const mat=this.materials.ink.clone();mat.color.set(['#d2ed4d','#f5bf52','#c6ef78'][this.splats.length%3]);const mesh=new THREE.Mesh(geo,mat);const y=this.ground(e.x,e.z);
  if(e.normal&&Number.isFinite(e.y)&&(e.wall||e.kind==='terrain')){const normal=new V(e.normal.x,e.normal.y,e.normal.z).normalize();mesh.position.set(e.x,e.y,e.z).addScaledVector(normal,.025-PROJECTILE.radius);mesh.quaternion.setFromUnitVectors(new V(0,0,1),normal);}
  else if(e.wall){const direction=new V(e.dx,e.dy||0,e.dz).normalize(),origin=new V(e.x,Number.isFinite(e.y)?e.y:y+.9,e.z).addScaledVector(direction,-1.5);for(const rock of this.obstacleMeshes)rock.updateMatrixWorld();const hit=new THREE.Raycaster(origin,direction,0,5).intersectObjects(this.obstacleMeshes,false)[0];if(hit){const normal=hit.face.normal.clone().transformDirection(hit.object.matrixWorld);mesh.position.copy(hit.point).addScaledVector(normal,.025);mesh.quaternion.setFromUnitVectors(new V(0,0,1),normal);}else{mesh.position.set(e.x,y+.05,e.z);mesh.rotation.x=-Math.PI/2;}}else{mesh.position.set(e.x,y+.045,e.z);mesh.rotation.x=-Math.PI/2;}
  this.scene.add(mesh);this.splats.push({mesh,start:this.elapsed});if(this.splats.length>90){const old=this.splats.shift();old.mesh.removeFromParent();old.mesh.geometry.dispose();old.mesh.material.dispose();}
 }
 clearEffects(){this.impactEffects?.clear();for(const p of this.particles)p.mesh.removeFromParent();this.particles=[];for(const s of this.splats){s.mesh.removeFromParent();s.mesh.geometry.dispose();s.mesh.material.dispose();}this.splats=[];for(const b of this.bulletMeshes.values())b.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear();this.fx=[];this.koTimes.clear();}
 updateHUD(){
  const p=this.state.actors[0],pct=Math.round(p.ammo/RULES.capacity*100),target=kickTarget(this.state,p),home=ownBase(this.state,p),activeBases=this.state.bases.filter(b=>!b.destroyed).length;
  const homeSpot=BASES.find(b=>b.owner===p.id)?.stock,refilling=home&&!home.destroyed&&homeSpot&&Math.hypot(p.x-homeSpot.x,p.z-homeSpot.z)<=RULES.pickupRange&&hasWallSight(p,homeSpot),hidden=coverAt(p)&&p.revealedTime<=0;
  const enemyStore=sabotageTarget(this.state,p),channel=this.state.bases.find(b=>!b.destroyed&&b.attackerId===p.id),sabotageButton=this.$('sabotage-button');
  this.currentSabotageContext=enemyStore?BASES.find(base=>base.id===enemyStore.id)?.stock:null;
  sabotageButton.hidden=!this.running||this.layoutEditing||this.state.phase!=='battle'||p.ko||p.catapultId||!enemyStore;
  sabotageButton.disabled=p.dizzyTime>0||p.knockUp>0||p.hit>0||p.sabotageRecovery>0||p.kick>0;
  sabotageButton.querySelector('span').textContent='ΚΑΤΑΣΤΡΟΦΗ';
  sabotageButton.querySelector('small').textContent=channel?`Απομένουν ${Math.max(0,RULES.sabotageSeconds-channel.progress).toFixed(1)}″`:`Κράτα ${RULES.sabotageSeconds}″`;
  sabotageButton.setAttribute('aria-label',`Κράτησε ${this.touch?'το κουμπί':'E'} για ${RULES.sabotageSeconds} δευτερόλεπτα για να καταστρέψεις την εχθρική αποθήκη`);
  this.$('sabotage-status').hidden=!this.running||this.layoutEditing||!channel;const progress=channel?channel.progress/RULES.sabotageSeconds:0;
  this.$('sabotage-copy').textContent='ΚΑΤΑΣΤΡΟΦΗ ΑΠΟΘΗΚΗΣ';this.$('sabotage-fill').style.transform=`scaleX(${progress})`;this.$('sabotage-track').setAttribute('aria-valuenow',String(Math.round(progress*100)));
  const mounted=this.state.catapults?.find(c=>c.id===p.catapultId),near=nearbyCatapult(this.state,p),useButton=this.$('catapult-button');
  this.currentCatapultContext=mounted||near;
  useButton.hidden=!this.running||this.layoutEditing||p.ko||(!mounted&&(!near||this.state.phase!=='battle'));
  useButton.disabled=!mounted&&(p.dizzyTime>0||p.knockUp>0||p.kick>0);
  useButton.querySelector('span').textContent=mounted?'ΕΞΟΔΟΣ':'ΕΙΣΟΔΟΣ';useButton.setAttribute('aria-label',`${this.touch?'':'E: '}${mounted?'Έξοδος από τον καταπέλτη':'Είσοδος στον κοντινό καταπέλτη'}`);useButton.classList.toggle('ready',!!mounted);
  this.$('catapult-status').hidden=!mounted||!this.running||this.layoutEditing;this.$('catapult-status').textContent=mounted?(mounted.cooldown>0?`ΦΟΡΤΩΝΕΙ · ${mounted.cooldown.toFixed(1)}″`:'ΠΕΤΡΑ ΕΤΟΙΜΗ'):'';
  this.renderer.domElement.classList.toggle('catapult-aiming',!!mounted&&this.mouseControl&&this.running&&!this.layoutEditing);this.$('aim-stick').classList.toggle('catapult',!!mounted);this.$('aim-stick').setAttribute('aria-label',mounted?'Κατεύθυνση και ισχύς καταπέλτη':'Στόχευση με σύρσιμο δεξιά');this.ui.querySelector('.move-zone').classList.toggle('mounted',!!mounted);
  if(this.lastMounted!==!!mounted){this.lastMounted=!!mounted;this.touchFire?.clear();this.stopCameraDrag();this.touchSticks?.aim?.clear();this.actions.fire=false;this.pointers.delete('aim');this.pointerTypes.delete('aim');this.aimStrength=0;this.$('aim-stick').querySelector('.stick-knob').style.transform='translate(-50%,-50%)';this.$('fire-button').innerHTML=(mounted?catapultIcon:flyIcon)+`<span>${mounted?'ΠΕΤΡΑ':'ΠΥΡ'}</span>`;this.$('fire-button').setAttribute('aria-label',mounted?'Πάτησε για βολή πέτρας από τον καταπέλτη':'Κράτα ΠΥΡ και σύρε για συνεχή βολή και περιστροφή');}
  this.ui.querySelector('.aim-zone').hidden=!mounted;this.$('fire-button').hidden=false;
  this.$('fire-button').disabled=!this.layoutEditing&&(p.ko||p.dizzyTime>0||p.knockUp>0);if(this.$('fire-button').disabled)this.touchFire?.clear();this.$('fire-button').classList.toggle('firing',this.actions.fire);this.$('fire-button').classList.toggle('empty',mounted?mounted.cooldown>0:p.ammo===0);
  const aimHint=this.$('touch-aim-hint');aimHint.hidden=!this.running||this.layoutEditing||!!mounted;aimHint.classList.toggle('firing',!!this.autoFireTargetId);this.$('aim-stick').classList.toggle('firing',!!this.autoFireTargetId);
  this.$('touch-aim-copy').textContent=mounted?'ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ':this.viewMode==='overview'?'ΣΤΟΧΕΥΣΗ + ΠΥΡ':'ΘΕΑ + ΠΥΡ';
  this.ui.querySelector('.touch-look-guide').textContent=this.settings.touchFireMode==='tap'?'ΣΥΡΕ: ΣΤΟΧΕΥΣΗ · ΠΑΤΑ: ΒΟΛΗ':'ΣΥΡΕ ΔΕΞΙΑ ΓΙΑ ΘΕΑ';
  this.$('auto-fire-status').textContent=this.settings.touchFireMode!=='auto'?'ΧΕΙΡΟΚΙΝΗΤΗ':this.autoFireTargetId?'ΑΥΤΟΜΑΤΗ · ΒΟΛΗ':'ΑΥΤΟΜΑΤΗ';
  this.$('ammo-count').textContent=`${p.ammo} / ${RULES.capacity}`;this.$('ammo-percent').textContent=pct+'%';this.$('ammo-fill').style.transform=`scaleX(${pct/100})`;this.$('ammo-track').setAttribute('aria-valuenow',String(pct));this.$('ammo-state').textContent=p.ko?'Επιστρέφεις στην αποθήκη':p.ammo===RULES.capacity?'ΓΕΜΑΤΟΣ!':refilling?'ΑΠΟΘΗΚΗ ∞ · ΓΕΜΙΖΕΙ…':p.tongue>0?'ΜΑΖΕΥΕΙ ΜΥΓΕΣ…':p.ammo===0?'Γύρνα στην αποθήκη ή βρες σμήνος':'Μύγες για τις επόμενες βολές';this.$('ko-count').textContent=`${activeBases} / 3`;
  for(const dot of this.$('base-dots').children){const b=this.state.bases.find(b=>b.owner===dot.dataset.owner);dot.classList.toggle('destroyed',!!b?.destroyed);dot.classList.toggle('attacked',!!b?.attackerId);dot.title=(dot.dataset.owner==='player'?'Η αποθήκη σου':dot.dataset.owner==='rival-1'?'Αποθήκη αντιπάλου 1':'Αποθήκη αντιπάλου 2')+(b?.destroyed?' · κατεστραμμένη':b?.attackerId?' · υπό επίθεση':' · άθικτη');}
  this.$('round-status').hidden=!this.running||(!this.layoutEditing&&!p.ko&&this.state.phase==='battle');this.$('round-status').classList.toggle('warmup',this.state.phase!=='battle');
  this.$('round-time').textContent=this.layoutEditing?'↔':p.ko?`${Math.ceil(p.respawnTime||0)}″`:this.state.phase!=='battle'?`${Math.ceil(this.state.intro)}″`:`${activeBases}`;
  this.$('round-copy').textContent=this.layoutEditing?(this.touch?'ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ':'ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ · Το παιχνίδι περιμένει'):p.ko?(this.touch?'ΕΠΙΣΤΡΟΦΗ':'ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΒΑΣΗ'):this.state.phase!=='battle'?(this.touch?'ΠΡΟΕΤΟΙΜΑΣΙΑ':'ΠΡΟΕΤΟΙΜΑΣΙΑ · Προστάτεψε την αποθήκη σου'):'';
  const storageAttacked=!!home?.attackerId&&!home.destroyed,warningVisible=this.running&&!this.layoutEditing&&storageAttacked;
  this.ui.classList.toggle('storage-threat',warningVisible);this.$('base-status').hidden=!this.running||this.layoutEditing||(!storageAttacked&&!hidden);this.$('base-status').classList.toggle('threat',storageAttacked);
  const warningTitle=storageAttacked?'ΕΠΙΘΕΣΗ ΣΤΗΝ ΑΠΟΘΗΚΗ ΣΟΥ':hidden?'ΚΡΥΜΜΕΝΟΣ ΣΤΑ ΔΕΝΤΡΑ':'';
  if(this.$('base-warning-title').textContent!==warningTitle)this.$('base-warning-title').textContent=warningTitle;
  this.$('base-warning-detail').textContent=storageAttacked?`${Math.max(0,RULES.sabotageSeconds-home.progress).toFixed(1)}″ μέχρι καταστροφή · Χτύπησέ τον!`:hidden?'Πιο αργά άλματα':'';
  const kickReady=canKick(this.state,p);
  // A dizzy rival owns its contextual button. The old touch kick remains only
  // for an ordinary defensive kick against a standing nearby rival.
  this.$('kick-button').hidden=!this.running||this.layoutEditing||p.ko||this.state.phase!=='battle'||!!p.catapultId;
  this.$('kick-button').disabled=!kickReady;this.$('kick-button').classList.toggle('ready',kickReady);
  this.$('dizzy-banner').hidden=!this.running||p.dizzyTime<=0;this.$('dizzy-time').textContent=p.dizzyTime.toFixed(1)+'″';this.$('aim-stick').classList.toggle('empty',mounted?mounted.cooldown>0:p.ammo===0);

  if(this.calloutUntil<this.elapsed)this.$('callout').textContent='';
  const contextLayout=['round-status','base-status','kick-button','fire-button'].map(id=>this.$(id).hidden?0:1).join('');
  if(this.touch&&!this.layoutEditing&&this.running&&this.pointers.size===0&&!this.cameraDrag&&!this.actions.fire&&!this.actions.sabotage&&contextLayout!==this.contextLayout){this.contextLayout=contextLayout;this.touchLayout?.refresh();}
  this.desktopControls?.update();this.contextActions?.update();
  const training=!!this.state.training;this.$('training-button').textContent=training?'ΕΞΟΔΟΣ ΕΞΑΣΚΗΣΗΣ':'◎ ΕΞΑΣΚΗΣΗ';this.$('round-status').classList.toggle('training-status',training);
  if(training){const stats=this.state.scoreboard?.player,percent=accuracy(stats);this.$('ammo-count').textContent='∞';this.$('ammo-percent').textContent='ΑΠΕΙΡΕΣ';this.$('ammo-state').textContent='ΕΞΑΣΚΗΣΗ · Κανονικά χειριστήρια';this.$('round-status').hidden=!this.running||this.layoutEditing;this.$('round-status').querySelector('b').textContent='ΚΙΝΟΥΜΕΝΟΙ ΣΤΟΧΟΙ';this.$('round-copy').textContent=`${stats?.shotHits||0}/${stats?.shots||0} εύστοχες · Ακρίβεια ${percent===null?'—':percent+'%'}`;this.$('base-status').hidden=true;this.$('sabotage-button').hidden=true;this.$('ko-count').textContent='2';this.ui.querySelector('.base-card>span').textContent='ΣΤΟΧΟΙ';this.$('base-dots').hidden=true;}
  else{this.ui.querySelector('.base-card>span').textContent='ΑΠΟΘΗΚΕΣ';this.$('base-dots').hidden=false;}
  this.roundUI?.update();
 }
 renderActors(dt){
  this.state.actors.forEach((a,i)=>{const m=this.models[i];m.group.visible=!a.eliminated;if(a.eliminated)return;const ground=this.ground(a.x,a.z);let x=a.x,z=a.z,y=ground+a.height+(a.catapultId?.45:0);
   const launch=this.koTimes.get(a.id),age=launch?this.elapsed-launch.time:99;if(age<.65){x+=launch.dx*age*5;z+=launch.dz*age*5;y+=Math.sin(age/.65*Math.PI)*2.5;}
   m.group.position.set(x,y,z);if(i===0){const firing=this.actions.fire||this.autoFireTargetId||a.shot>0||a.kick>0||a.catapultId||a.airSpit>0||a.flight?.queued;if(firing)m.motionYaw=null;else if(Math.hypot(a.hopX,a.hopZ)>.08)m.motionYaw=Math.atan2(a.hopX,a.hopZ);}const facing=actorVisualFacing(a,{currentYaw:m.group.rotation.y,manualFire:i===0&&this.actions.fire,autoFire:i===0&&!!this.autoFireTargetId,motionYaw:i===0?m.motionYaw:null}),active=facing.aiming;const diff=Math.atan2(Math.sin(facing.yaw-m.group.rotation.y),Math.cos(facing.yaw-m.group.rotation.y));m.group.rotation.y+=diff*(1-Math.exp(-dt*22));
   m.update(dt,{time:this.elapsed,speed:Math.hypot(a.hopX,a.hopZ),locomotion:localHopDirection(a.hopX,a.hopZ,m.group.rotation.y),building:!!a.sabotageId,hop:flightPose(a)||(a.knockUp>0?{phase:'air',progress:1-a.knockUp/a.knockUpDuration}:a.hop>0?{phase:'air',progress:1-a.hop/RULES.hopDuration}:a.idle>0?{phase:'land',progress:1-a.idle/RULES.landingDuration}:{phase:'idle',progress:0}),dead:a.ko,attack:a.kick>0?{type:'kick',phase:1-a.kick/(RULES.kickDuration||.48)}:a.tongue>0||a.shot>0?{type:'tongue',phase:a.tongue>0?1-a.tongue/.22:1-a.shot/RULES.shotInterval}:null});
   applyLeapPose(m,a.flight,dt,a.hop>0?1-a.hop/RULES.hopDuration:null);
   const load=a.load,spit=a.airSpit>0?Math.sin((1-a.airSpit/AIR_RULES.spitDuration)*Math.PI):a.shot>0?Math.sin((1-a.shot/RULES.shotInterval)*Math.PI):0;applyArcadeAppearance(m,{load,spit});
   if(active&&!a.airSpit&&!a.flight?.queued&&!a.ko&&!a.catapultId){const pitch=clamp(Math.atan2(a.aimY||0,Math.hypot(a.aimX,a.aimZ)),-.5,1.1);m.bones.head.rotation.x-=pitch*.7;m.bones.spine.rotation.x-=pitch*.12;}
   // The rig now poses all four limbs in the actual hop direction; do not
   // add a second hip roll here (it would pull planted feet off their targets).
   if(a.dizzyTime>0){m.group.rotation.z=Math.sin(this.elapsed*7)*.17;m.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2;}else m.group.rotation.z=age<.65?age*6:0;
   m.group.rotation.x=0;const diveTarget=a.airSpit>0||a.flight?.queued?1:0;m.airDivePitch=(m.airDivePitch||0)+(diveTarget-(m.airDivePitch||0))*(1-Math.exp(-dt*18));if(m.airDivePitch>.001){m.bones.head.rotation.x+=1.15*m.airDivePitch;m.bones.spine.rotation.x+=.2*m.airDivePitch;if(a.airSpit>0)m.bones.jaw.rotation.x-=.18;}if(a.flight?.kind==='dash'){const direction=Math.atan2(a.flight.vx,a.flight.vz)-m.group.rotation.y;m.group.rotation.x+=Math.cos(direction)*.28;m.group.rotation.z-=Math.sin(direction)*.28;}if(a.knockUp>0){const progress=1-a.knockUp/a.knockUpDuration,tilt=Math.sin(progress*Math.PI)*.38,direction=Math.atan2(a.impulseX,a.impulseZ)-m.group.rotation.y;m.group.rotation.x=Math.cos(direction)*tilt;m.group.rotation.z-=Math.sin(direction)*tilt;}
   // At an upward limit terrain can bring the eye inside the local frog.
   // Hide only that nearby body so it cannot cover the view or crosshair.
   if(i===0&&this.viewMode==='chase3d'&&!a.ko&&Math.hypot(this.camera.position.x-x,this.camera.position.z-z)<1.35&&this.camera.position.y<y+1.3)m.group.visible=false;
  });
  const p=this.state.actors[0];this.playerRing.position.set(p.x,this.ground(p.x,p.z)+.07,p.z);this.playerRing.scale.setScalar(1);
  const showAim=this.running&&!this.layoutEditing&&!p.catapultId&&!p.ko&&p.dizzyTime<=0&&(this.viewMode==='overview'||p.aiming||p.shot>0);
  // Contact supplies feedback only. drawLabels anchors the single crosshair
  // to the input, so scenery and camera settling cannot move the mouse marker.
  this.currentAimPreview=showAim?traceAim(this.state,p):null;
  this.renderer.domElement.classList.toggle('mouse-aiming',showAim&&(this.pointerLocked()||this.mouse.valid));

 }
 renderFlies(){
  this.state.flies.forEach((f,i)=>{const d=this.dummy,live=f.wait<=0,y=this.ground(f.x,f.z)+1.05+Math.sin(this.elapsed*5+f.phase)*.12,x=f.x+Math.sin(this.elapsed*3+f.phase)*.12;
   d.position.set(x,live?y:-100,f.z);d.scale.set(live?.105:0,live?.08:0,live?.14:0);d.rotation.set(0,f.phase,0);d.updateMatrix();this.flyBodies.setMatrixAt(i,d.matrix);
   for(let side=0;side<2;side++){d.position.set(x+(side===0?-.10:.10),live?y+.045:-100,f.z);d.scale.set(live?.17:0,live?.015:0,live?.08:0);d.rotation.set(0,f.phase,Math.sin(this.elapsed*55+f.phase)*(side===0?1:-1)*.5);d.updateMatrix();this.flyWings.setMatrixAt(i*2+side,d.matrix);}
  });this.flyBodies.instanceMatrix.needsUpdate=true;this.flyWings.instanceMatrix.needsUpdate=true;
  SWARMS.forEach((zone,i)=>{const available=this.state.flies.filter(f=>f.swarmId===zone.id&&f.wait<=0).length,ring=this.swarmRings[i];ring.material.opacity=available?.2:.09;ring.material.color.set(available?'#c8e0a3':'#6f8c83');});
  const live=new Set();for(const b of this.state.bullets){live.add(b.id);let mesh=this.bulletMeshes.get(b.id);if(!mesh){mesh=this.makeFlyBullet();this.bulletMeshes.set(b.id,mesh);}mesh.position.set(b.x,Number.isFinite(b.y)?b.y:this.ground(b.x,b.z)+.9,b.z);mesh.quaternion.setFromUnitVectors(new V(0,0,1),new V(b.dx,b.dy||0,b.dz).normalize());mesh.children[1].rotation.z=Math.sin(this.elapsed*75);mesh.children[2].rotation.z=-Math.sin(this.elapsed*75);}
  for(const [id,mesh] of this.bulletMeshes)if(!live.has(id)){mesh.removeFromParent();this.bulletMeshes.delete(id);}
  for(const [id,t] of this.tongues){t.mesh.visible=id!=='player'||this.models[0].group.visible;const age=(this.elapsed-t.start)/.22;if(age>=1){t.mesh.removeFromParent();this.tongues.delete(id);continue;}const i=this.state.actors.findIndex(a=>a.id===id),m=this.models[i],start=m.mouthWorld(),end=new V(t.x,this.ground(t.x,t.z)+1,t.z),reach=Math.sin(age*Math.PI);end.lerpVectors(start,end,reach);const dir=end.clone().sub(start);t.mesh.position.copy(start).addScaledVector(dir,.5);t.mesh.quaternion.setFromUnitVectors(UP,dir.clone().normalize());t.mesh.scale.set(.07,Math.max(.001,dir.length()),.07);}
 }
 project(x,y,z){const point=new V(x,y,z),behind=point.clone().applyMatrix4(this.camera.matrixWorldInverse).z>=0,p=point.project(this.camera);return {x:(p.x+1)*this.w/2,y:(1-p.y)*this.h/2,visible:!behind&&p.z>-1&&p.z<1,behind};}
 drawLabels(){this.currentTargetLock=this.running?this.targetLock?.update()||null:null;const c=this.labelCtx;c.clearRect(0,0,this.w,this.h);c.textAlign='center';c.lineJoin='round';c.font='800 18px sans-serif';if(this.running){drawFlyMarkers(this,c);drawRadar(this,this.$('minimap'));}
  this.currentAimScreen=null;this.currentAimCursorScreen=null;this.currentAimPathScreen=[];
  const aimedPlayer=this.state.actors[0],lockedTarget=this.currentTargetLock?.target,lockScreen=lockedTarget?this.project(lockedTarget.x,lockedTarget.y,lockedTarget.z):null;
  const reticleAnchor=lockScreen?.visible?{pointer:lockScreen}:this.viewMode==='chase3d'?{centered:true}:this.mouseControl?{pointer:{x:this.mouse.x,y:this.mouse.y}}:{origin:{x:aimedPlayer.x,y:this.ground(aimedPlayer.x,aimedPlayer.z)+PROJECTILE.originHeight,z:aimedPlayer.z},bearing:{x:aimedPlayer.aimX,z:aimedPlayer.aimZ}};
  this.currentAimReticle=computeReticle(this.currentAimPreview,(x,y,z)=>this.project(x,y,z),this.w,this.h,reticleAnchor);
  if(this.currentAimReticle){const reticle=this.currentAimReticle;this.currentAimScreen={x:reticle.x,y:reticle.y};this.currentAimColor=reticle.color;drawReticle(c,reticle);}
  if(lockScreen?.visible&&this.running){c.save();c.strokeStyle='#183f35';c.lineWidth=5;c.beginPath();c.arc(lockScreen.x,lockScreen.y-23,4,Math.PI,0);c.rect(lockScreen.x-6,lockScreen.y-23,12,9);c.stroke();c.strokeStyle='#e0ffa1';c.lineWidth=2;c.stroke();c.restore();}

  if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const h=this.lastPlayerHit,target=this.state.actors.find(a=>a.id===h.id),q=this.project(h.x,Number.isFinite(h.y)?h.y:this.ground(h.x,h.z)+(target?.height||0)+1.2,h.z);if(q.visible){c.save();c.strokeStyle='#143d35';c.lineWidth=6;c.beginPath();for(const [x,y] of [[1,1],[-1,1],[1,-1],[-1,-1]]){c.moveTo(q.x+x*6,q.y+y*6);c.lineTo(q.x+x*15,q.y+y*15);}c.stroke();c.strokeStyle='#fffce2';c.lineWidth=3;c.stroke();c.restore();}}
  this.state.actors.forEach((a,i)=>{if(a.eliminated)return;const p=this.project(a.x,this.ground(a.x,a.z)+a.height+2.4,a.z);if(!p.visible)return;const on=p.x>20&&p.x<this.w-20&&p.y>70&&p.y<this.h-40;
   if(!on&&i>0&&!a.ko&&this.running){const x=clamp(p.x,24,this.w-24),y=clamp(p.y,110,this.h-(this.touch?210:90));c.font='bold 24px sans-serif';c.fillStyle=actorColour(this.settings,a.id);c.fillText('▼',x,y);return;}
   if(a.ko){c.font='900 20px sans-serif';c.strokeStyle='#1e2e28';c.lineWidth=5;const text=`KO · ${Math.ceil(a.respawnTime||0)}″`;c.strokeText(text,p.x,p.y);c.fillStyle='#ffe374';c.fillText(text,p.x,p.y);return;}
   if(a.spawnShield>0){c.save();c.translate(p.x,p.y-53);c.globalAlpha=.65+.3*Math.min(1,a.spawnShield);c.beginPath();c.moveTo(0,-11);c.lineTo(10,-7);c.lineTo(9,4);c.quadraticCurveTo(5,11,0,14);c.quadraticCurveTo(-5,11,-9,4);c.lineTo(-10,-7);c.closePath();c.fillStyle='#247e9d';c.fill();c.strokeStyle='#c4f5ff';c.lineWidth=2;c.stroke();c.restore();}
   if(a.dizzyTime>0){for(let j=0;j<3;j++){const r=this.elapsed*4+j*2.094;c.font='bold 25px sans-serif';c.fillStyle='#ffdf57';c.strokeStyle='#725c21';c.lineWidth=3;const x=p.x+Math.cos(r)*27,y=p.y+Math.sin(r)*7;c.strokeText('★',x,y);c.fillText('★',x,y);}c.font='bold 15px sans-serif';c.fillStyle='#fff4ad';c.strokeStyle='#173f34';c.lineWidth=5;c.strokeText('ΖΑΛΗ '+a.dizzyTime.toFixed(1)+'″',p.x,p.y+24);c.fillText('ΖΑΛΗ '+a.dizzyTime.toFixed(1)+'″',p.x,p.y+24);for(let j=0;j<RULES.finishHits;j++){c.beginPath();c.arc(p.x+(j-(RULES.finishHits-1)/2)*11,p.y+36,4,0,Math.PI*2);c.fillStyle=j<a.finishHits?'#ffb58e':'#244438';c.fill();c.strokeStyle='#ffe6ac';c.lineWidth=1.5;c.stroke();}}
   else if(i>0){if(a.aimWindup>0){c.font='900 22px sans-serif';c.strokeStyle='#173c35';c.lineWidth=5;c.strokeText('!',p.x,p.y-40);c.fillStyle='#ffddaa';c.fillText('!',p.x,p.y-40);}const label=this.state.training?`ΣΤΟΧΟΣ ${i}`:i===1?'ΕΧΘΡΟΣ 1':'ΕΧΘΡΟΣ 2';const fill=actorColour(this.settings,a.id);c.fillStyle='#112b27dd';c.strokeStyle=fill;c.lineWidth=3;c.beginPath();if(c.roundRect){c.roundRect(p.x-52,p.y-28,104,24,10);}else{c.rect(p.x-52,p.y-28,104,24);}c.fill();c.stroke();c.font='bold 15px sans-serif';c.fillStyle=fill;c.fillText(label,p.x,p.y-11);for(let j=0;j<6;j++){c.beginPath();c.arc(p.x+(j-2.5)*9,p.y+6,3.8,0,Math.PI*2);c.fillStyle=j<a.dizzy?'#ffe16a':'#214036bb';c.fill();}}
  });
  if(this.running&&!this.state.training){const player=this.state.actors[0];for(const base of this.state.bases){const definition=BASES.find(b=>b.id===base.id),near=Math.hypot(player.x-definition.stock.x,player.z-definition.stock.z)<10;if(base.destroyed||(!near&&!base.attackerId))continue;const q=this.project(definition.stock.x,this.ground(definition.stock.x,definition.stock.z)+3.5,definition.stock.z);if(!q.visible||q.x<70||q.x>this.w-70||q.y<95||q.y>this.h-(this.touch?220:85))continue;const text=base.attackerId?`ΚΑΤΑΣΤΡΟΦΗ · ${Math.max(0,RULES.sabotageSeconds-base.progress).toFixed(1)}″`:base.owner==='player'?'Η ΑΠΟΘΗΚΗ ΣΟΥ · ∞':'ΕΧΘΡΙΚΗ ΑΠΟΘΗΚΗ';c.font='800 12px sans-serif';c.strokeStyle='#14342df2';c.lineWidth=5;c.strokeText(text,q.x,q.y);c.fillStyle=base.attackerId?'#ffd197':base.owner==='player'?'#dbff9d':'#ffbdad';c.fillText(text,q.x,q.y);}}
  this.guardsView?.drawLabels(c);
  this.fx=this.fx.filter(f=>this.elapsed-f.start<f.life);for(const f of this.fx){const t=(this.elapsed-f.start)/f.life,p=this.project(f.x,this.ground(f.x,f.z)+2+t*2,f.z);c.globalAlpha=1-t;c.font=`900 ${f.text==='ΝΟΚ ΑΟΥΤ!'?32:22}px sans-serif`;c.strokeStyle='#244136';c.lineWidth=6;c.strokeText(f.text,p.x,p.y);c.fillStyle=f.color;c.fillText(f.text,p.x,p.y);}c.globalAlpha=1;
 }
 updateCameraPose(dt){
  const p=this.state.actors[0],ground=this.ground(p.x,p.z)+(p.flight||p.support?p.height:0),anchor=new V(p.x,ground,p.z);
  const lock=this.running?this.targetLock?.update():null;
  if(lock&&this.viewMode==='chase3d'){const orbit=targetLockOrbit(p,ground,lock.cameraTarget,{yaw:this.cameraYaw,pitch:this.cameraPitch},dt);this.cameraYaw=orbit.yaw;this.cameraPitch=orbit.pitch;}
  const pose=cameraPose(p,ground,this.w/this.h,this.viewMode,{yaw:this.cameraYaw,pitch:this.cameraPitch,zoom:this.settings.cameraZoom}),lookPoint=new V(...pose.look),camPoint=new V(...pose.position);
  this.cameraFollow??=new V();
  if(!this.cameraReady){this.cameraFollow.copy(anchor);this.cameraReady=true;}else this.cameraFollow.lerp(anchor,1-Math.exp(-dt*8));
  // Dampen travel only. The shoulder offset turns immediately with the mouse
  // and is never interpolated back through the jumping player's silhouette.
  this.focus.copy(this.cameraFollow).add(lookPoint.clone().sub(anchor));
  // Position follows automatically; only deliberate look input changes angles.
  this.cameraTarget.copy(this.focus).add(camPoint.sub(lookPoint));
  const safe=resolveCameraBoom({look:this.focus.toArray(),position:this.cameraTarget.toArray()},(x,z)=>this.cameraGround(x,z));
  this.focus.fromArray(safe.look);this.cameraTarget.fromArray(safe.position);
  const shake=this.running?this.shake:0;this.camera.position.copy(this.cameraTarget);this.camera.position.x+=(Math.random()-.5)*shake;this.camera.lookAt(this.focus);this.camera.updateMatrixWorld();
 }
 frame(now){
  this.performanceMeter?.begin(now);
  const dt=Math.min(.05,Math.max(0,(now-this.last)/1000));this.last=now;
  const p=this.state.actors[0],active=this.running&&!this.layoutEditing;
  if(active&&this.viewMode==='chase3d'){
   const stick=this.pointers.has('aim'),edge=0;
   const x=stick?this.stickAim.x*this.aimStrength:edge,y=stick?this.stickAim.z*this.aimStrength:0;
   const orbit=lookCameraRate({yaw:this.cameraYaw,pitch:this.cameraPitch},x,y,dt,{sensitivity:this.settings.cameraSensitivity,deadzone:stick ? .08 : 0});
   this.cameraYaw=orbit.yaw;this.cameraPitch=orbit.pitch;
  }
  this.shake*=Math.exp(-dt*15);this.updateCameraPose(dt);
  // Resolve shots through the camera that is actually rendered this frame,
  // including mouse or touch look during held fire.
  if(active){this.elapsed+=dt;this.accumulator+=dt;while(this.accumulator>=1/60){step(this.state,this.currentInput(),1/60);this.consumeEvents();this.accumulator-=1/60;if(this.state.status!=='playing'){this.finish();break;}}this.saveClock+=dt;if(this.saveClock>3){this.saveClock=0;this.persist();}}
  else if(this.mode==='result'||this.mode==='finishing')this.elapsed+=dt;
  if(this.mode==='finishing'&&this.elapsed>=this.resultAt)this.showResult();
  if(!this.cameraReady)this.updateCameraPose(0);
  if(this.running||this.mode==='title'||this.mode==='result'||this.mode==='finishing'){const animationDt=this.mode==='title'||this.layoutEditing?0:dt;this.renderActors(animationDt);this.renderFlies();this.updateCatapultAim?.();this.artilleryView.update(animationDt);this.basesView.update(animationDt);this.guardsView?.update(animationDt);this.battlegroundView?.update?.(animationDt);this.impactEffects.update(animationDt);this.world.update(this.running&&!this.layoutEditing?dt:0,this.elapsed,1,new V(p.x,this.ground(p.x,p.z),p.z));this.visualUpgrade?.update(animationDt);}
  if((this.running&&!this.layoutEditing)||this.mode==='finishing'||this.mode==='result'){this.particles=this.particles.filter(p=>{if(this.elapsed-p.start>.55){p.mesh.removeFromParent();return false;}p.v.y-=dt*16;p.mesh.position.addScaledVector(p.v,dt);return true;});}
  this.menuAnimation?.update(dt);this.renderer.render(this.scene,this.camera);this.drawLabels();this.updateHUD();this.performanceMeter?.end(performance.now());
 }
 inspect(){return {version:ARCADE_VERSION,performance:this.performanceMeter?.inspect(),training:!!this.state.training,scoreboard:this.state.scoreboard,music:{volume:this.sound.musicVolume,playing:!!this.sound.music?.source,renderCount:this.sound.music?.renderCount||0},battleground:{radius:RULES.radius,area:battlegroundAreaAt(this.state.actors[0].x,this.state.actors[0].z)?.id||null,areas:BATTLEGROUND_AREAS.map(area=>({id:area.id,name:area.name,x:area.x,z:area.z})),swarmPatches:SWARMS.length},viewMode:this.viewMode,cameraControl:this.touch?'swipe-look':'direct-look',touchFireMode:this.settings.touchFireMode,autoFireTargetId:this.autoFireTargetId,pointerLocked:this.pointerLocked(),cameraSensitivity:this.settings.cameraSensitivity,mouse:{x:this.mouse.x,y:this.mouse.y,valid:this.mouse.valid},aim:{...this.aim},aimScreen:this.currentAimScreen,cameraYaw:this.cameraYaw,cameraPitch:this.cameraPitch,cameraDragging:!!this.cameraDrag,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/RULES.capacity*100),actors:this.state.actors.map(a=>({id:a.id,x:a.x,z:a.z,ammo:a.ammo,dizzy:a.dizzy,dizzyTime:a.dizzyTime,ko:a.ko,eliminated:a.eliminated,respawnTime:a.respawnTime,spawnShield:a.spawnShield,invuln:a.invuln,sabotageId:a.sabotageId,aiming:a.aiming,aimX:a.aimX,aimY:a.aimY,aimZ:a.aimZ,face:a.face,hop:a.hop,hopX:a.hopX,hopZ:a.hopZ,height:a.height,flight:a.flight?{...a.flight}:null,support:a.support,dashCooldown:a.dashCooldown,knockUp:a.knockUp,finishHits:a.finishHits,kickCooldown:a.kickCooldown,catapultId:a.catapultId})),bases:this.state.bases.map(b=>({...b})),capacity:RULES.capacity,guards:this.state.guards?.map(guard=>({...guard})),layoutEditing:this.layoutEditing,touch:this.touch,catapults:this.state.catapults?.map(c=>({id:c.id,occupant:c.occupant,cooldown:c.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:true};}
}

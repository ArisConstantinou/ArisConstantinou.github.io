import * as THREE from 'three';
import { createWorld } from './world.js';
import { createCreature } from './creatures.js';
import { ARCADE_VERSION, SAVE_KEY, SETTINGS_KEY, RULES, OBSTACLES, SWARMS, newRound, step, saveRound, loadRound, kickTarget, fireRing, sabotageTarget, ownBase } from './arcade-model.js';
import './arcade.css';
import { cameraPose, screenToWorld, actorHeading, CAMERA_ORBIT, dragCamera } from './arcade-view-math.js';
import { drawRadar, drawFlyMarkers } from './arcade-radar.js';
import { traceAim } from './arcade-aim.js';
import { ARTILLERY, nearbyCatapult } from './arcade-artillery.js';
import { ArtilleryView } from './arcade-artillery-view.js';
import { ImpactEffects } from './arcade-impact-effects.js';
import { BASES, coverAt, hasWallSight, createHouseFloors, houseFloorAt } from './arcade-bases.js';
import { ArcadeBasesView } from './arcade-bases-view.js';
import { createTouchLayout } from './arcade-touch-layout.js';

const V=THREE.Vector3, UP=new V(0,1,0);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const MOVE_KEYS=new Set(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight']);
const read=(key)=>{try{return localStorage.getItem(key);}catch{return null;}};
const write=(key,value)=>{try{localStorage.setItem(key,value);return true;}catch{return false;}};
const svg=(body)=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${body}</svg>`;
const flyIcon=svg('<ellipse cx="21" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 23)"/><ellipse cx="43" cy="23" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 23)"/><ellipse cx="32" cy="37" rx="10" ry="15" fill="#344b50" stroke="#12282b" stroke-width="3"/><circle cx="27" cy="25" r="5" fill="#fff6cd"/><circle cx="37" cy="25" r="5" fill="#fff6cd"/><circle cx="28" cy="25" r="2" fill="#14282c"/><circle cx="36" cy="25" r="2" fill="#14282c"/>');
const kickIcon=svg('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>');
const catapultIcon=svg('<path d="M9 50h46M18 47l10-28 18 28M31 27l20-17" stroke="#d9bf82" stroke-width="6" stroke-linecap="round"/><path d="m45 9 13 4-4 10-12-5z" fill="#8ea29a"/><circle cx="17" cy="53" r="6" fill="#6d4e35"/><circle cx="48" cy="53" r="6" fill="#6d4e35"/>');
const playIcon=svg('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>');
const settingsIcon=svg('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>');
const storageIcon=svg('<path d="M8 29 32 9l24 20M14 27v29h36V27" stroke="#f4dfad" stroke-width="5" stroke-linejoin="round"/><path d="M24 56V35h16v21" fill="#243e36" stroke="#f4dfad" stroke-width="3"/><path d="m12 12 11 10m29-10L41 22" stroke="#ffad7a" stroke-width="4"/>');

class ArcadeSound {
 constructor(){this.volume=.5;this.ctx=null;this.gain=null;}
 resume(){try{if(!this.ctx){this.ctx=new (window.AudioContext||window.webkitAudioContext)();this.gain=this.ctx.createGain();this.gain.connect(this.ctx.destination);}this.gain.gain.value=this.volume;this.ctx.resume();}catch{}}
 pause(){if(this.ctx){this.gain.gain.value=0;this.ctx.suspend().catch(()=>{});}}
 play(kind){if(!this.ctx||this.ctx.state!=='running'||this.volume<=0)return;const c=this.ctx,t=c.currentTime,o=c.createOscillator(),g=c.createGain();const notes={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],hitConfirm:[860,530,.07],stoneShot:[110,65,.2],stoneImpact:[75,35,.3],land:[95,50,.13],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]};const n=notes[kind];if(!n)return;o.type=kind==='hit'?'triangle':'sine';o.frequency.setValueAtTime(n[0],t);o.frequency.exponentialRampToValueAtTime(n[1],t+n[2]);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.14,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+n[2]);o.connect(g);g.connect(this.gain);o.start(t);o.stop(t+n[2]+.01);o.onended=()=>{o.disconnect();g.disconnect();};}
}

export class ArcadeGame {
 constructor(){
  this.touch=matchMedia('(pointer: coarse)').matches||navigator.maxTouchPoints>0;
  this.settings={volume:.5,quality:this.touch?'low':'high'};try{Object.assign(this.settings,JSON.parse(read(SETTINGS_KEY)||'{}'));}catch{}
  this.settings.volume=clamp(Number(this.settings.volume)||0,0,1);
  if(!['low','high'].includes(this.settings.quality))this.settings.quality='low';
  const oldSave=read(SAVE_KEY);try{if(JSON.parse(oldSave)?.version===1&&!read(SAVE_KEY+'-before-bases'))write(SAVE_KEY+'-before-bases',oldSave);}catch{}
  this.state=newRound();this.saved=loadRound(oldSave);this.running=false;this.mode='title';this.keys=new Set();this.actions={fire:false,kick:false,sabotage:false};this.aimStrength=0;this.lastMouseAim=-Infinity;this.move={x:0,z:0};this.aim={x:0,z:-1};this.mouse={x:0,y:0,valid:false};this.pointers=new Map();this.layoutEditing=false;this.fx=[];this.particles=[];this.splats=[];this.tongues=new Map();this.bulletMeshes=new Map();this.koTimes=new Map();this.elapsed=0;this.shake=0;this.saveClock=0;this.accumulator=0;this.failures=[];this.hitConfirmUntil=0;this.lastPlayerHit=null;
  this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#9fe4ff');this.scene.fog=new THREE.FogExp2('#baf0ea',.006);
  this.renderer=new THREE.WebGLRenderer({antialias:!this.touch,powerPreference:'high-performance'});this.renderer.domElement.id='arcade-world';this.renderer.domElement.setAttribute('aria-label','FROG — κωμική μάχη με μύγες');this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.3;document.body.append(this.renderer.domElement);
  this.camera=new THREE.PerspectiveCamera(52,innerWidth/innerHeight,.1,250);this.camera.position.set(0,8,15);this.focus=new V(0,2,3);this.cameraTarget=new V(0,8,15);this.viewMode='chase3d';this.cameraReady=false;
  this.cameraYaw=CAMERA_ORBIT.yaw;this.cameraPitch=CAMERA_ORBIT.pitch;this.cameraDrag=null;this.stickAim={x:0,z:-1};
  this.mouseRay=new THREE.Raycaster();this.mousePoint=new V();this.mouseNdc=new THREE.Vector2();this.mousePlane=new THREE.Plane(UP,0);
  this.scene.add(new THREE.HemisphereLight('#def8ff','#52733a',2.6));this.sun=new THREE.DirectionalLight('#fff1bf',3.2);this.sun.position.set(-16,36,12);this.scene.add(this.sun);
  this.world=createWorld(this.scene,this.renderer,{seed:731,natural:true});
  for(const refuge of [...this.world.creekRefuges])this.world.removeShelter(refuge.mesh);
  this.houseFloors=createHouseFloors((x,z)=>this.world.getSurface(x,z).height);
  const decorativeFlies=this.world.group.getObjectByName('Fly swarms');if(decorativeFlies)decorativeFlies.visible=false;for(const spot of this.world.hotspots)spot.flies=0;
  this.labels=document.createElement('canvas');this.labels.id='arcade-labels';document.body.append(this.labels);this.labelCtx=this.labels.getContext('2d');
  this.sound=new ArcadeSound();this.sound.volume=this.settings.volume;
  this.shared={sphere:new THREE.SphereGeometry(1,10,7),wing:new THREE.SphereGeometry(1,6,4),cylinder:new THREE.CylinderGeometry(1,1,1,8),circle:new THREE.CircleGeometry(1,18)};
  this.materials={insect:new THREE.MeshStandardMaterial({color:'#263f42',roughness:.8,metalness:0}),wing:new THREE.MeshBasicMaterial({color:'#edfcff',transparent:true,opacity:.86,side:THREE.DoubleSide,depthWrite:false}),tongue:new THREE.MeshStandardMaterial({color:'#ff839c',roughness:.4}),shot:new THREE.MeshStandardMaterial({color:'#384b4d',emissive:'#a6c9bf',emissiveIntensity:.16}),ink:new THREE.MeshBasicMaterial({color:'#90e44c',transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}),rock:new THREE.MeshStandardMaterial({color:'#617b70',roughness:.9}),rim:new THREE.MeshBasicMaterial({color:'#eaff9e',transparent:true,opacity:.6,depthWrite:false})};
  this.createArena();this.models=[];this.buildActors();this.createFlies();this.artilleryView=new ArtilleryView(this);this.basesView=new ArcadeBasesView(this);this.impactEffects=new ImpactEffects(this);this.createUI();this.bindInputs();this.applyQuality();this.resize();this.showTitle();
  window.__FROG__={version:ARCADE_VERSION,mode:'arcade',inspect:()=>this.inspect(),save:()=>this.persist()};
  if(new URLSearchParams(location.search).has('test'))window.__FROG__.test={step:(input,n=1)=>{for(let i=0;i<n;i++){step(this.state,input,1/60);this.consumeEvents();}this.updateHUD();},state:()=>this.state,setState:(s)=>{this.state=s;this.buildActors();this.updateHUD();},input:()=>this.currentInput(),kickTarget:()=>kickTarget(this.state,this.state.actors[0])?.id};
  this.last=performance.now();this.renderer.setAnimationLoop(now=>this.frame(now));document.getElementById('boot')?.remove();
 }
 ground(x,z){return houseFloorAt(x,z,this.houseFloors)??this.world.getSurface(x,z).height;}
 createArena(){
  this.obstacleMeshes=[];
  for(const o of OBSTACLES){const mesh=new THREE.Mesh(new THREE.DodecahedronGeometry(o.r,1),this.materials.rock);mesh.scale.y=1.7;mesh.position.set(o.x,this.ground(o.x,o.z)+o.r*.9,o.z);this.scene.add(mesh);this.obstacleMeshes.push(mesh);}
  const points=[];for(let i=0;i<=160;i++){const a=i/160*Math.PI*2,x=Math.sin(a)*RULES.radius,z=Math.cos(a)*RULES.radius;points.push(new V(x,this.ground(x,z)+.06,z));}const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),this.materials.rim);this.scene.add(line);
  this.playerRing=new THREE.Mesh(new THREE.RingGeometry(1.05,1.18,32),new THREE.MeshBasicMaterial({color:'#ecff9a',side:THREE.DoubleSide,transparent:true,opacity:.85,depthWrite:false}));this.playerRing.rotation.x=-Math.PI/2;this.scene.add(this.playerRing);
  this.aimGuide=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new V(),new V()]),new THREE.LineDashedMaterial({color:'#fff2b0',dashSize:.45,gapSize:.35,transparent:true,opacity:.65}));this.scene.add(this.aimGuide);
  this.aimReticle=new THREE.Mesh(new THREE.RingGeometry(.35,.42,24),new THREE.MeshBasicMaterial({color:'#fff2b0',side:THREE.DoubleSide,transparent:true,opacity:.88,depthWrite:false}));this.aimReticle.rotation.x=-Math.PI/2;this.scene.add(this.aimReticle);
  this.targetRing=new THREE.Mesh(new THREE.RingGeometry(1.32,1.44,32),new THREE.MeshBasicMaterial({color:'#ffb19c',side:THREE.DoubleSide,transparent:true,opacity:.9,depthWrite:false}));this.targetRing.rotation.x=-Math.PI/2;this.targetRing.visible=false;this.scene.add(this.targetRing);
  this.swarmRings=SWARMS.map(zone=>{const ring=new THREE.Mesh(new THREE.RingGeometry(zone.radius-.08,zone.radius+.03,40),new THREE.MeshBasicMaterial({color:'#c8e0a3',side:THREE.DoubleSide,transparent:true,opacity:.22,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.set(zone.x,this.ground(zone.x,zone.z)+.08,zone.z);this.scene.add(ring);return ring;});
 }
 buildActors(){
  for(const m of this.models||[])m.dispose();this.models=this.state.actors.map((a,i)=>{const m=createCreature('frog',{seed:7+i*39,team:i===0?'player':`enemy${i}`,role:i===2?'bruiser':'hunter',tier:1,level:1});m.setEquipment({});m.setOutline(i===0?'#e7fca7':i===1?'#ffae88':'#d3a8ff',true);if(this.settings.quality==='low')m.setRenderLOD(1);if(m.mesh?.material){const mat=m.mesh.material;mat.bumpScale=0;mat.roughness=.85;mat.userData?.tint?.set(['#86da38','#ff694a','#bb70ed'][i]);}this.scene.add(m.group);return m;});
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
  this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Αλλαγή σε κεντραρισμένη κάτοψη">ΠΙΣΩ 3D · C</button><div class="ammo-card">${flyIcon}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / ${RULES.capacity}</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Γέμισε στην αποθήκη σου</span></div></div><div class="ko-card base-card"><b id="ko-count">3 / 3</b><span>ΑΠΟΘΗΚΕΣ</span><div id="base-dots" aria-label="Άθικτες αποθήκες"><i data-owner="player"></i><i data-owner="rival-1"></i><i data-owner="rival-2"></i></div></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <div id="round-status" hidden><b id="round-time">20″</b><span id="round-copy">ΠΡΟΕΤΟΙΜΑΣΙΑ · Γέμισε έως 60 μύγες</span></div><div id="base-status" hidden></div>
  <button id="catapult-button" class="touch-action catapult-button" aria-label="Χρήση κοντινού καταπέλτη" hidden>${catapultIcon}<span>ΧΡΗΣΗ</span></button><div id="catapult-status" hidden></div>
  <button id="sabotage-button" class="touch-action sabotage-button" aria-label="Κράτησε για καταστροφή εχθρικής αποθήκης" hidden>${storageIcon}<span>ΚΡΑΤΑ · 10″</span></button><div id="sabotage-status" hidden><span id="sabotage-copy"></span><div role="progressbar" aria-label="Καταστροφή αποθήκης" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="sabotage-track"><i id="sabotage-fill"></i></div></div>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: η βάση σου πράσινη, εχθρικές αποθήκες κόκκινη και μωβ, είσοδοι, καταπέλτες και σμήνη"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Κίνηση</span><span><b>Δεξί σύρσιμο</b> Κάμερα</span><span><b>Κλικ</b> Μύγες</span><span><b>E κράτημα</b> Αποθήκη</span><span><b>E</b> Καταπέλτης</span><span id="pc-kick"><b>Q</b> Κλωτσιά</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="kick-button" class="touch-action kick-button" aria-label="Αμυντική κλωτσιά για απώθηση κοντινού αντιπάλου" hidden disabled>${kickIcon}<span>ΚΛΩΤΣΙΑ</span></button><button id="fire-button" class="touch-action fire-button" aria-label="Κράτησε για εκτόξευση μυγών">${flyIcon}<span>ΠΥΡ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Στόχευση"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><span class="aim-center" aria-hidden="true">+</span></div><span class="stick-caption">ΣΤΟΧΕΥΣΗ</span></div><button id="layout-button" class="layout-button" aria-label="Μετακίνηση χειριστηρίων"><b aria-hidden="true">↔</b><span>ΘΕΣΕΙΣ</span></button><div id="layout-hint" hidden>Σύρε τα χειριστήρια στη θέση σου.</div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><button id="play-button" class="art-button play-button">${playIcon}<span>ΠΑΙΞΕ</span></button><button id="settings-button" class="art-button settings-button">${settingsIcon}<span>ΡΥΘΜΙΣΕΙΣ</span></button><button id="new-round-button" class="plain-button" hidden>ΝΕΟΣ ΓΥΡΟΣ</button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${playIcon}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${ARCADE_VERSION}</span></section>`;
  document.body.append(this.ui);this.$=id=>this.ui.querySelector('#'+id);this.$('quality').value=this.settings.quality;
  this.$('view-button').onclick=()=>this.toggleView();this.$('play-button').onclick=()=>this.startOrResume();this.$('pause-button').onclick=()=>this.pause();this.$('settings-button').onclick=()=>this.settingsMenu();this.$('result-settings').onclick=()=>this.settingsMenu();this.$('settings-back').onclick=()=>{this.$('settings-panel').hidden=true;if(this.mode==='result')this.$('result-panel').hidden=false;else this.$('menu-main').hidden=false;};this.$('replay-button').onclick=()=>this.startNew();this.$('new-round-button').onclick=()=>this.startNew();
  this.$('volume').oninput=e=>{this.settings.volume=Number(e.target.value)/100;this.sound.volume=this.settings.volume;write(SETTINGS_KEY,JSON.stringify(this.settings));};this.$('quality').onchange=e=>{this.settings.quality=e.target.value;this.applyQuality();write(SETTINGS_KEY,JSON.stringify(this.settings));};
  this.touchLayout=createTouchLayout({root:this.$('touch-controls'),movePad:this.ui.querySelector('.move-zone'),aimPad:this.ui.querySelector('.aim-zone'),fireButton:this.$('fire-button'),toggleButton:this.$('layout-button'),storageKey:'frog-touch-layout-v1',onEditingChange:editing=>{this.layoutEditing=editing;this.clearInputs();this.accumulator=0;if(editing)this.sound.pause();else if(this.running)this.sound.resume();},announce:text=>this.message(text,2)});
 }
 showTitle(){this.running=false;this.mode='title';this.$('play-button').querySelector('span').textContent=this.saved?.status==='playing'?'ΣΥΝΕΧΕΙΑ':'ΠΑΙΞΕ';this.$('new-round-button').hidden=this.saved?.status!=='playing';this.ui.classList.add('in-menu');}
 settingsMenu(){this.$('menu-main').hidden=true;this.$('result-panel').hidden=true;this.$('settings-panel').hidden=false;}
 startOrResume(){if(this.mode==='pause'){this.go();return;}if(this.saved?.status==='playing'){this.state=this.saved;this.saved=null;this.resetCamera();this.buildActors();this.go();}else this.startNew();}
 toggleView(){this.stopCameraDrag();this.mouse.valid=false;this.viewMode=this.viewMode==='chase3d'?'overview':'chase3d';this.$('view-button').textContent=this.viewMode==='chase3d'?'ΠΙΣΩ 3D · C':'ΚΑΤΟΨΗ · C';this.$('view-button').setAttribute('aria-label',this.viewMode==='chase3d'?'Αλλαγή σε κεντραρισμένη κάτοψη':'Αλλαγή σε κάμερα πίσω από τον βάτραχο');this.cameraReady=false;}
 startNew(){this.saved=null;this.state=newRound(731+Math.floor(Math.random()*100000));this.resetCamera();this.clearEffects();this.buildActors();this.go();this.message(this.touch?'Γέμισε στην αποθήκη σου. Σύρε τον κόσμο για την κάμερα.':'Γέμισε στην αποθήκη σου. Δεξί κλικ + σύρσιμο για την κάμερα.',4);}
 resetCamera(){const p=this.state.actors[0],heading=actorHeading(p);this.cameraYaw=Math.atan2(heading.x,heading.z);this.cameraPitch=CAMERA_ORBIT.pitch;this.cameraReady=false;this.mouse.valid=false;this.aim={x:p.aimX,z:p.aimZ};this.stopCameraDrag();}
 beginCameraDrag(e){if(this.cameraDrag)return;if(this.viewMode==='overview')this.toggleView();this.mouse.valid=false;this.actions.fire=false;this.cameraDrag={id:e.pointerId,type:e.pointerType,x:e.clientX,y:e.clientY};const canvas=this.renderer.domElement;canvas.setPointerCapture(e.pointerId);canvas.classList.add('camera-dragging');}
 stopCameraDrag(){const drag=this.cameraDrag;this.cameraDrag=null;const canvas=this.renderer?.domElement;if(drag&&canvas?.hasPointerCapture?.(drag.id))canvas.releasePointerCapture(drag.id);canvas?.classList.remove('camera-dragging');}
 go(){this.clearInputs();this.accumulator=0;this.last=performance.now();this.running=true;this.mode='play';this.$('new-round-button').hidden=true;this.$('arcade-menu').hidden=true;this.$('settings-panel').hidden=true;this.$('result-panel').hidden=true;this.$('menu-main').hidden=false;this.$('arcade-hud').hidden=false;this.$('desktop-help').hidden=this.touch;this.$('touch-controls').hidden=!this.touch;this.ui.classList.remove('in-menu');this.sound.resume();this.updateHUD();this.touchLayout?.refresh();this.persist();}
 pause(){if(!this.running)return;this.touchLayout?.setEditing(false);this.running=false;this.mode='pause';this.clearInputs();this.persist();this.sound.pause();this.$('arcade-menu').hidden=false;this.$('menu-main').hidden=false;this.$('settings-panel').hidden=true;this.$('play-button').querySelector('span').textContent='ΣΥΝΕΧΕΙΑ';this.$('new-round-button').hidden=false;this.ui.classList.add('in-menu');}
 finish(){this.touchLayout?.setEditing(false);this.running=false;this.mode='finishing';this.resultAt=this.elapsed+.85;this.clearInputs();this.persist();}
 showResult(){this.running=false;this.mode='result';this.clearInputs();this.persist();const won=this.state.status==='won';this.sound.play(won?'win':'lost');this.$('arcade-menu').hidden=false;this.$('menu-main').hidden=true;this.$('result-panel').hidden=false;this.$('result-title').textContent=won?'Η ΤΕΛΕΥΤΑΙΑ ΑΠΟΘΗΚΗ ΕΙΝΑΙ ΔΙΚΗ ΣΟΥ!':'Η ΑΠΟΘΗΚΗ ΣΟΥ ΚΑΤΑΣΤΡΑΦΗΚΕ';this.$('result-copy').textContent=won?`${this.state.stats.kos} νοκ άουτ · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″ μάχης`:'Κράτησε την είσοδο, διέκοψε τους εισβολείς με μία εύστοχη βολή και ανεφοδιάσου πριν ξαναβγείς.';this.ui.classList.add('in-menu');}
 persist(){if(this.mode==='title')return false;return write(SAVE_KEY,saveRound(this.state));}
 clearInputs(){this.keys.clear();this.actions={fire:false,kick:false,sabotage:false};this.aimStrength=0;this.mouse.valid=false;this.lastMouseAim=-Infinity;this.move={x:0,z:0};this.pointers.clear();this.stopCameraDrag();if(this.ui){for(const el of this.ui.querySelectorAll('.stick-knob'))el.style.transform='translate(-50%,-50%)';this.$('aim-stick').classList.remove('firing');this.$('fire-button')?.classList.remove('firing');}}
 bindInputs(){
  addEventListener('keydown',e=>{if(e.target.matches('input,select'))return;if(e.code==='Escape'){e.preventDefault();if(this.layoutEditing){this.touchLayout.setEditing(false);return;}if(this.running)this.pause();else if(this.mode==='pause')this.go();return;}if(!this.running||this.layoutEditing)return;if(e.code==='KeyC'&&!e.repeat){e.preventDefault();this.toggleView();return;}if(MOVE_KEYS.has(e.code)||['KeyQ','KeyE'].includes(e.code)){e.preventDefault();this.keys.add(e.code);}});
  addEventListener('keyup',e=>this.keys.delete(e.code));
  const canvas=this.renderer.domElement;
  canvas.addEventListener('pointermove',e=>{
   if(!this.running||this.layoutEditing)return;
   if(e.pointerType==='mouse'){if(this.cameraDrag?.type==='mouse'&&!(e.buttons&2))this.stopCameraDrag();if((e.buttons&2)&&!this.cameraDrag)this.beginCameraDrag(e);}
   if(this.cameraDrag){if(e.pointerId!==this.cameraDrag.id)return;e.preventDefault();const orbit=dragCamera({yaw:this.cameraYaw,pitch:this.cameraPitch},e.clientX-this.cameraDrag.x,e.clientY-this.cameraDrag.y);this.cameraYaw=orbit.yaw;this.cameraPitch=orbit.pitch;this.cameraDrag.x=e.clientX;this.cameraDrag.y=e.clientY;return;}
   if(e.pointerType==='mouse')this.captureMouseAim(e);
  });
  canvas.addEventListener('pointerdown',e=>{
   if(!this.running||this.layoutEditing)return;e.preventDefault();
   if(e.button===2||e.pointerType==='touch'){
    this.beginCameraDrag(e);return;
   }
   if(e.button===0&&!this.cameraDrag){this.captureMouseAim(e);this.actions.fire=true;}
  });
  addEventListener('pointerup',e=>{if(this.cameraDrag?.id===e.pointerId&&(e.button===2||e.pointerType==='touch'))this.stopCameraDrag();if(e.pointerType!=='touch'&&e.button===0)this.actions.fire=false;});
  canvas.addEventListener('pointercancel',e=>{if(this.cameraDrag?.id===e.pointerId)this.stopCameraDrag();this.actions.fire=false;});
  canvas.addEventListener('lostpointercapture',e=>{if(this.cameraDrag?.id===e.pointerId)this.stopCameraDrag();});
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  const bindStick=(id,kind)=>{const el=this.$(id),knob=el.querySelector('.stick-knob');let active=null;
   const update=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/(r.width/2),y=(e.clientY-r.top-r.height/2)/(r.height/2),v=fireRing(x,y),d=Math.hypot(x,y),k=d>1?1/d:1;knob.style.transform=`translate(-50%,-50%) translate(${x*k*r.width*.31}px,${y*k*r.height*.31}px)`;if(kind==='move')this.move={x:v.x,z:v.z};else{this.aimStrength=Math.min(1,d);if(d>.08)this.stickAim={x:x/d,z:y/d};}this.mouse.valid=false;};
   el.onpointerdown=e=>{if(!this.running||this.layoutEditing||(active!==null&&this.pointers.has(kind)))return;e.preventDefault();active=e.pointerId;this.pointers.set(kind,active);el.setPointerCapture(e.pointerId);update(e);};el.onpointermove=e=>{if(!this.layoutEditing&&active===e.pointerId&&this.pointers.get(kind)===active){e.preventDefault();update(e);}};
   const stop=e=>{if(e.pointerId!==active)return;active=null;this.pointers.delete(kind);knob.style.transform='translate(-50%,-50%)';if(kind==='move'){this.move={x:0,z:0};}else{this.aimStrength=0;el.classList.remove('firing');}};el.onpointerup=stop;el.onpointercancel=stop;el.onlostpointercapture=stop;
  };bindStick('move-stick','move');bindStick('aim-stick','aim');
  const hold=(id,key)=>{const el=this.$(id);let pointer=null;el.onpointerdown=e=>{if(!this.running||this.layoutEditing||el.disabled)return;e.preventDefault();pointer=e.pointerId;el.setPointerCapture(e.pointerId);this.actions[key]=true;};const release=e=>{if(e.pointerId===pointer){pointer=null;this.actions[key]=false;}};el.onpointerup=release;el.onpointercancel=release;el.onlostpointercapture=release;};hold('kick-button','kick');hold('fire-button','fire');hold('sabotage-button','sabotage');
  addEventListener('blur',()=>{this.clearInputs();if(this.running)this.pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden){this.clearInputs();this.pause();this.sound.pause();}});addEventListener('beforeunload',()=>this.persist());addEventListener('resize',()=>{this.clearInputs();this.resize();});
 }
 applyQuality(){const low=this.settings.quality==='low';this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,low?1:1.5));for(const m of this.models)m.setRenderLOD(low?1:0);this.resize();}
 resize(){const w=innerWidth,h=innerHeight;this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.cameraReady=false;this.labels.width=w;this.labels.height=h;this.w=w;this.h=h;this.touchLayout?.refresh();}
 captureMouseAim(e){
  this.mouse.x=e.clientX;this.mouse.y=e.clientY;this.mouse.valid=true;this.lastMouseAim=performance.now();this.updateMouseTarget();
 }
 updateMouseTarget(){
  if(!this.mouse.valid||this.cameraDrag)return;
  const p=this.state.actors[0];this.mouseNdc.set(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2);this.mouseRay.setFromCamera(this.mouseNdc,this.camera);this.mousePlane.constant=-this.ground(p.x,p.z)-.9;
  if(this.mouseRay.ray.intersectPlane(this.mousePlane,this.mousePoint))this.mouse.target={x:this.mousePoint.x,z:this.mousePoint.z};
  else{const direction=this.mouseRay.ray.direction,length=Math.hypot(direction.x,direction.z),forward=screenToWorld(0,-1,this.camera.position,this.focus),range=p.catapultId?ARTILLERY.maxRange:RULES.projectileSpeed*RULES.projectileLifetime;this.mouse.target={x:p.x+(length>1e-6?direction.x/length:forward.x)*range,z:p.z+(length>1e-6?direction.z/length:forward.z)*range};}
 }
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
  if(this.layoutEditing)return {};
  const p=this.state.actors[0],touchAim=this.pointers.has('aim')&&this.aimStrength>.08,aiming=!this.cameraDrag&&(this.actions.fire||touchAim||(!this.touch&&this.mouse.valid));
  if(touchAim)this.aim={...screenToWorld(this.stickAim.x,this.stickAim.z,this.camera.position,this.focus),distance:14};
  this.updateMouseTarget();
  if(this.mouse.valid&&aiming&&this.mouse.target){const dx=this.mouse.target.x-p.x,dz=this.mouse.target.z-p.z,d=Math.hypot(dx,dz);if(d>.1)this.aim={x:dx/d,z:dz/d,distance:d};}
  const movement=screenToWorld(this.move.x+(this.keys.has('KeyD')||this.keys.has('ArrowRight')?1:0)-(this.keys.has('KeyA')||this.keys.has('ArrowLeft')?1:0),this.move.z+(this.keys.has('KeyS')||this.keys.has('ArrowDown')?1:0)-(this.keys.has('KeyW')||this.keys.has('ArrowUp')?1:0),this.camera.position,this.focus);
  return {mx:movement.x,mz:movement.z,ax:this.aim.x,az:this.aim.z,aiming,fire:this.actions.fire&&!this.cameraDrag,kick:this.actions.kick||this.keys.has('KeyQ'),sabotage:!p.catapultId&&(this.actions.sabotage||this.keys.has('KeyE'))};
 }
 message(text,seconds=1.5){this.$('callout').textContent=text;this.calloutUntil=this.elapsed+seconds;}
 makeFlyBullet(){const g=new THREE.Group(),b=new THREE.Mesh(this.shared.sphere,this.materials.shot);b.scale.set(.12,.10,.19);g.add(b);for(const side of [-1,1]){const w=new THREE.Mesh(this.shared.wing,this.materials.wing);w.position.set(side*.13,.07,0);w.scale.set(.17,.018,.09);g.add(w);}this.scene.add(g);return g;}
 consumeEvents(){
  for(const e of this.state.events){this.artilleryView?.consumeEvent(e);const index=this.state.actors.findIndex(a=>a.id===e.id),a=this.state.actors[index],m=this.models[index];
   // Automatic collection stays silent, including the initial 60-fly refill.
   if(e.type==='tongue'&&a){const old=this.tongues.get(a.id);if(old)this.scene.remove(old.mesh);const mesh=new THREE.Mesh(this.shared.cylinder,this.materials.tongue);this.scene.add(mesh);this.tongues.set(a.id,{mesh,start:this.elapsed,x:e.x,z:e.z});}
   if(e.type==='shot'&&a?.id==='player')this.sound.play('shot');
   if(e.type==='hit'&&m){m.mesh.material.emissive?.set('#ffffff');const yaw=m.group.rotation.y,c=Math.cos(yaw),ss=Math.sin(yaw);m.setImpact({x:c*e.dx-ss*e.dz,z:ss*e.dx+c*e.dz,strength:1.3,duration:a.knockUp>0?.42:.27});this.impactEffects.hit({...e,height:this.ground(e.x,e.z)+a.height+.75,heavy:a.knockUp>0});this.shake=Math.max(this.shake,a.id==='player'?.16:.025);if(e.owner==='player'&&a.id!=='player'){this.hitConfirmUntil=this.elapsed+.2;this.lastPlayerHit={id:a.id,x:e.x,z:e.z,time:this.elapsed};this.sound.play('hitConfirm');}else if(a.id==='player')this.sound.play('hit');}
   if(e.type==='dizzy'){this.addText('ΖΑΛΗ!',a.x,a.z,'#ffe375',1);this.sound.play('dizzy');if(a.id!=='player')this.message('ΖΑΛΙΣΤΗΚΕ! ΣΥΝΕΧΙΣΕ ΤΙΣ ΕΥΣΤΟΧΕΣ ΒΟΛΕΣ.',2);}
   if(e.type==='ko'){this.koTimes.set(a.id,{time:this.elapsed,dx:e.dx,dz:e.dz});this.addText('ΝΟΚ ΑΟΥΤ!',a.x,a.z,'#ffe791',1.4);this.sound.play('ko');this.shake=.32;this.makeSplat({...e,wall:false});}
   if(e.type==='respawn'){this.koTimes.delete(e.id);if(e.id==='player'){this.clearInputs();this.resetCamera();this.message('Επέστρεψες! Γέμισε στην αποθήκη σου.',2.5);}}
   if(e.type==='sabotageStart'){if(e.id==='player')this.message('ΕΙΣΒΟΛΕΑΣ ΣΤΗΝ ΑΠΟΘΗΚΗ! Χτύπησέ τον για να τον σταματήσεις.',3);else if(e.by==='player')this.message('Κράτα μέχρι το τέλος · οι βολές εναντίον σου διακόπτουν.',2);}
   if(e.type==='sabotageInterrupted'&&e.by==='player')this.message(e.reason==='hit'?'Σε χτύπησαν! Η καταστροφή διακόπηκε.':'Η καταστροφή διακόπηκε.',1.5);
   if(e.type==='baseDestroyed'){const base=BASES.find(b=>b.id===e.baseId);if(base)this.addText('ΑΠΟΘΗΚΗ ΚΑΤΑΣΤΡΑΦΗΚΕ',base.stock.x,base.stock.z,'#ffc689',2);this.sound.play('stoneImpact');this.shake=.2;}
   if(e.type==='splat')this.makeSplat(e);
   if(e.type==='stoneShot')this.sound.play('stoneShot');
   if(e.type==='land'&&e.stone){this.impactEffects.landing(e);if(Math.hypot(e.x-this.state.actors[0].x,e.z-this.state.actors[0].z)<10)this.sound.play('land');}
   if(e.type==='stoneImpact'){this.sound.play('stoneImpact');this.impactEffects.stone(e);if(Math.hypot(e.x-this.state.actors[0].x,e.z-this.state.actors[0].z)<7)this.shake=Math.max(this.shake,.16);}
   if(e.type==='battle')this.message('ΜΑΧΗ!',1.2);
  }
 }
 addText(text,x,z,color,life){this.fx.push({text,x,z,color,life,start:this.elapsed});if(this.fx.length>28)this.fx.shift();}
 burst(x,z){for(let i=0;i<9;i++){const mesh=new THREE.Mesh(this.shared.sphere,this.materials.shot);mesh.scale.setScalar(.06+Math.random()*.07);mesh.position.set(x,this.ground(x,z)+1,z);this.scene.add(mesh);this.particles.push({mesh,start:this.elapsed,v:new V((Math.random()-.5)*6,2+Math.random()*4,(Math.random()-.5)*6)});}while(this.particles.length>90)this.particles.shift().mesh.removeFromParent();}
 makeSplat(e){
  const vertices=[];const N=20;for(let i=0;i<N;i++){const a=i/N*6.283,b=(i+1)/N*6.283,r=.4+(i%3)*.14,r2=.4+((i+1)%3)*.14;vertices.push(0,0,0,Math.cos(a)*r,Math.sin(a)*r,0,Math.cos(b)*r2,Math.sin(b)*r2,0);}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));const mat=this.materials.ink.clone();mat.color.set(['#d2ed4d','#f5bf52','#c6ef78'][this.splats.length%3]);const mesh=new THREE.Mesh(geo,mat);const y=this.ground(e.x,e.z);
  if(e.wall){const origin=new V(e.x-e.dx*1.5,y+.9,e.z-e.dz*1.5),direction=new V(e.dx,0,e.dz);for(const rock of this.obstacleMeshes)rock.updateMatrixWorld();const hit=new THREE.Raycaster(origin,direction,0,5).intersectObjects(this.obstacleMeshes,false)[0];if(hit){const normal=hit.face.normal.clone().transformDirection(hit.object.matrixWorld);mesh.position.copy(hit.point).addScaledVector(normal,.025);mesh.quaternion.setFromUnitVectors(new V(0,0,1),normal);}else{mesh.position.set(e.x,y+.05,e.z);mesh.rotation.x=-Math.PI/2;}}else{mesh.position.set(e.x,y+.045,e.z);mesh.rotation.x=-Math.PI/2;}
  this.scene.add(mesh);this.splats.push({mesh,start:this.elapsed});if(this.splats.length>90){const old=this.splats.shift();old.mesh.removeFromParent();old.mesh.geometry.dispose();old.mesh.material.dispose();}
 }
 clearEffects(){this.impactEffects?.clear();for(const p of this.particles)p.mesh.removeFromParent();this.particles=[];for(const s of this.splats){s.mesh.removeFromParent();s.mesh.geometry.dispose();s.mesh.material.dispose();}this.splats=[];for(const b of this.bulletMeshes.values())b.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear();this.fx=[];this.koTimes.clear();}
 updateHUD(){
  const p=this.state.actors[0],pct=Math.round(p.ammo/RULES.capacity*100),target=kickTarget(this.state,p),home=ownBase(this.state,p),activeBases=this.state.bases.filter(b=>!b.destroyed).length;
  const homeSpot=BASES.find(b=>b.owner===p.id)?.stock,refilling=home&&!home.destroyed&&homeSpot&&Math.hypot(p.x-homeSpot.x,p.z-homeSpot.z)<=RULES.pickupRange&&hasWallSight(p,homeSpot),hidden=coverAt(p)&&p.revealedTime<=0;
  const enemyStore=sabotageTarget(this.state,p),channel=this.state.bases.find(b=>!b.destroyed&&b.attackerId===p.id),sabotageButton=this.$('sabotage-button');
  sabotageButton.hidden=!this.running||this.layoutEditing||this.state.phase!=='battle'||p.ko||p.catapultId||!enemyStore;
  sabotageButton.disabled=p.dizzyTime>0||p.knockUp>0||p.hit>0||p.sabotageRecovery>0;
  sabotageButton.querySelector('span').textContent=channel?`${Math.max(0,RULES.sabotageSeconds-channel.progress).toFixed(1)}″`:this.touch?'ΚΡΑΤΑ · 10″':'ΚΡΑΤΑ E · 10″';
  this.$('sabotage-status').hidden=!this.running||!channel;const progress=channel?channel.progress/RULES.sabotageSeconds:0;
  this.$('sabotage-copy').textContent='ΚΑΤΑΣΤΡΟΦΗ ΑΠΟΘΗΚΗΣ';this.$('sabotage-fill').style.transform=`scaleX(${progress})`;this.$('sabotage-track').setAttribute('aria-valuenow',String(Math.round(progress*100)));
  const mounted=this.state.catapults?.find(c=>c.id===p.catapultId),near=nearbyCatapult(this.state,p),useButton=this.$('catapult-button');
  useButton.hidden=!this.running||p.ko||(!mounted&&(!near||this.state.phase!=='battle'));useButton.disabled=p.dizzyTime>0||p.knockUp>0;useButton.querySelector('span').textContent=mounted?'ΕΞΟΔΟΣ':'ΧΡΗΣΗ';useButton.setAttribute('aria-label',mounted?'Έξοδος από τον καταπέλτη':'Χρήση κοντινού καταπέλτη');useButton.classList.toggle('ready',!!mounted);
  this.$('catapult-status').hidden=!mounted||!this.running||this.layoutEditing;this.$('catapult-status').textContent=mounted?(mounted.cooldown>0?`ΦΟΡΤΩΝΕΙ ΠΕΤΡΑ · ${mounted.cooldown.toFixed(1)}″`:this.touch?'ΣΗΜΑΔΕΨΕ · ΠΑΤΑ ΠΕΤΡΑ':'ΠΕΤΡΑ ΕΤΟΙΜΗ · ΑΡΙΣΤΕΡΟ ΚΛΙΚ'):'';
  this.$('aim-stick').classList.toggle('catapult',!!mounted);this.ui.querySelector('.aim-zone .stick-caption').textContent=mounted?'ΚΑΤΕΥΘΥΝΣΗ · ΙΣΧΥΣ':'ΣΤΟΧΕΥΣΗ';this.ui.querySelector('.move-zone').classList.toggle('mounted',!!mounted);
  this.$('fire-button').disabled=!this.layoutEditing&&(p.ko||p.dizzyTime>0||p.knockUp>0);this.$('fire-button').querySelector('span').textContent=mounted?'ΠΕΤΡΑ':'ΠΥΡ';this.$('fire-button').classList.toggle('firing',this.actions.fire);this.$('fire-button').classList.toggle('empty',mounted?mounted.cooldown>0:p.ammo===0);
  this.$('ammo-count').textContent=`${p.ammo} / ${RULES.capacity}`;this.$('ammo-percent').textContent=pct+'%';this.$('ammo-fill').style.transform=`scaleX(${pct/100})`;this.$('ammo-track').setAttribute('aria-valuenow',String(pct));this.$('ammo-state').textContent=p.ko?'Επιστρέφεις στην αποθήκη':p.ammo===RULES.capacity?'ΓΕΜΑΤΟΣ!':refilling?'ΑΠΟΘΗΚΗ ∞ · ΓΕΜΙΖΕΙ…':p.tongue>0?'ΜΑΖΕΥΕΙ ΜΥΓΕΣ…':p.ammo===0?'Γύρνα στην αποθήκη ή βρες σμήνος':'Μύγες για τις επόμενες βολές';this.$('ko-count').textContent=`${activeBases} / 3`;
  for(const dot of this.$('base-dots').children){const b=this.state.bases.find(b=>b.owner===dot.dataset.owner);dot.classList.toggle('destroyed',!!b?.destroyed);dot.classList.toggle('attacked',!!b?.attackerId);dot.title=(dot.dataset.owner==='player'?'Η αποθήκη σου':dot.dataset.owner==='rival-1'?'Κόκκινη αποθήκη':'Μωβ αποθήκη')+(b?.destroyed?' · κατεστραμμένη':b?.attackerId?' · υπό επίθεση':' · άθικτη');}
  this.$('round-status').hidden=!this.running||(!this.layoutEditing&&!p.ko&&this.state.phase==='battle');this.$('round-status').classList.toggle('warmup',this.state.phase!=='battle');
  this.$('round-time').textContent=this.layoutEditing?'↔':p.ko?`${Math.ceil(p.respawnTime||0)}″`:this.state.phase!=='battle'?`${Math.ceil(this.state.intro)}″`:`${activeBases}`;
  this.$('round-copy').textContent=this.layoutEditing?(this.touch?'ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ':'ΡΥΘΜΙΣΗ ΘΕΣΕΩΝ · Το παιχνίδι περιμένει'):p.ko?(this.touch?'ΕΠΙΣΤΡΟΦΗ':'ΕΠΙΣΤΡΟΦΗ ΣΤΗ ΒΑΣΗ'):this.state.phase!=='battle'?(this.touch?'ΠΡΟΕΤΟΙΜΑΣΙΑ':'ΠΡΟΕΤΟΙΜΑΣΙΑ · Γέμισε έως 60 μύγες'):'';
  this.$('base-status').hidden=!this.running||this.layoutEditing||(!home?.attackerId&&!hidden);this.$('base-status').classList.toggle('threat',!!home?.attackerId);this.$('base-status').textContent=home?.attackerId?`ΕΙΣΒΟΛΕΑΣ! ${Math.max(0,RULES.sabotageSeconds-home.progress).toFixed(1)}″ · Χτύπησέ τον!`:hidden?(this.touch?'ΚΡΥΜΜΕΝΟΣ · Αργά άλματα':'ΚΡΥΜΜΕΝΟΣ ΣΤΑ ΔΕΝΤΡΑ · Πιο αργά άλματα'):'';
  const kickReady=!p.ko&&!!target&&this.state.phase==='battle'&&!p.catapultId&&p.dizzyTime<=0&&p.knockUp<=0&&p.kick<=0&&(p.kickCooldown||0)<=0;this.$('kick-button').hidden=!this.running||p.ko||this.state.phase!=='battle'||!!p.catapultId||(!target&&p.kick<=0);this.$('kick-button').disabled=!kickReady;this.$('kick-button').classList.toggle('ready',kickReady);this.$('pc-kick').classList.toggle('ready',kickReady);this.$('dizzy-banner').hidden=p.dizzyTime<=0;this.$('dizzy-time').textContent=p.dizzyTime.toFixed(1)+'″';this.$('aim-stick').classList.toggle('empty',mounted?mounted.cooldown>0:p.ammo===0);
  if(this.calloutUntil<this.elapsed)this.$('callout').textContent='';
  const contextLayout=['round-status','base-status','catapult-button','catapult-status','kick-button','sabotage-button','sabotage-status'].map(id=>this.$(id).hidden?0:1).join('');
  if(this.touch&&!this.layoutEditing&&this.running&&contextLayout!==this.contextLayout){this.contextLayout=contextLayout;this.touchLayout?.refresh();}
 }
 renderActors(dt){
  this.state.actors.forEach((a,i)=>{const m=this.models[i];m.group.visible=!a.eliminated;if(a.eliminated)return;const ground=this.ground(a.x,a.z);let x=a.x,z=a.z,y=ground+a.height+a.load*.28+(a.catapultId?.45:0);
   const launch=this.koTimes.get(a.id),age=launch?this.elapsed-launch.time:99;if(age<.65){x+=launch.dx*age*5;z+=launch.dz*age*5;y+=Math.sin(age/.65*Math.PI)*2.5;}
   m.group.position.set(x,y,z);const active=a.aiming||a.shot>.02||a.kick>0,wanted=active?Math.atan2(a.aimX,a.aimZ):a.face;let diff=Math.atan2(Math.sin(wanted-m.group.rotation.y),Math.cos(wanted-m.group.rotation.y));m.group.rotation.y+=diff*(1-Math.exp(-dt*22));
   m.update(dt,{time:this.elapsed,speed:Math.hypot(a.hopX,a.hopZ),building:!!a.sabotageId,hop:a.knockUp>0?{phase:'air',progress:1-a.knockUp/a.knockUpDuration}:a.hop>0?{phase:'air',progress:1-a.hop/RULES.hopDuration}:a.idle>0?{phase:'land',progress:1-a.idle/RULES.landingDuration}:{phase:'idle',progress:0},dead:a.ko,attack:a.kick>0?{type:'kick',phase:1-a.kick/(RULES.kickDuration||.48)}:a.tongue>0||a.shot>0?{type:'tongue',phase:a.tongue>0?1-a.tongue/.22:1-a.shot/RULES.shotInterval}:null});
   const spit=a.shot>0?Math.sin((1-a.shot/RULES.shotInterval)*Math.PI):0;m.bones.jaw.rotation.x-=spit*.42;m.bones.head.rotation.x-=spit*.08;for(const eye of ['eyeL','eyeR'])m.bones[eye]?.scale.multiplyScalar(1.14);
   const load=a.load;m.bones.spine.scale.x*=1+load*.75;m.bones.spine.scale.y*=1+load*.5;m.bones.spine.scale.z*=1+load*.45;m.bones.throat.scale.multiply(new V(1+load*.45+spit*.18,1+load*.7+spit*.3,1+load*.35));
   if(a.hop>0){const direction=Math.atan2(a.hopX,a.hopZ)-m.group.rotation.y,strength=Math.min(1,Math.hypot(a.hopX,a.hopZ)/8.8)*Math.sin((1-a.hop/RULES.hopDuration)*Math.PI);m.bones.spine.rotation.z-=Math.sin(direction)*strength*.1;for(const side of [-1,1])m.bones[`hip${side}`].rotation.z-=Math.sin(direction)*strength*.14;}
   m.group.scale.setScalar(1+load*.13);if(a.dizzyTime>0){m.group.rotation.z=Math.sin(this.elapsed*7)*.17;m.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2;}else m.group.rotation.z=age<.65?age*6:0;
   m.group.rotation.x=0;if(a.knockUp>0){const progress=1-a.knockUp/a.knockUpDuration,tilt=Math.sin(progress*Math.PI)*.38,direction=Math.atan2(a.impulseX,a.impulseZ)-m.group.rotation.y;m.group.rotation.x=Math.cos(direction)*tilt;m.group.rotation.z-=Math.sin(direction)*tilt;}
  });
  const p=this.state.actors[0];this.playerRing.position.set(p.x,this.ground(p.x,p.z)+.07,p.z);this.playerRing.scale.setScalar(1+p.load*.25);
  const preview=traceAim(this.state,p,Math.min(RULES.projectileSpeed*RULES.projectileLifetime,this.aim.distance||14)),attr=this.aimGuide.geometry.attributes.position;
  attr.setXYZ(0,p.x+p.aimX*1.3,this.ground(p.x,p.z)+.18,p.z+p.aimZ*1.3);attr.setXYZ(1,preview.x,this.ground(preview.x,preview.z)+.18,preview.z);attr.needsUpdate=true;this.aimGuide.computeLineDistances();
  const showAim=this.running&&!this.layoutEditing&&!p.catapultId&&!p.ko&&p.dizzyTime<=0&&(p.aiming||p.shot>0);
  this.currentAimPreview=showAim?preview:null;this.aimGuide.visible=showAim;this.aimGuide.material.color.set(preview.targetId?'#ffc09b':preview.blocked?'#b9c0b5':'#f4f7d5');
  this.aimReticle.visible=showAim;this.aimReticle.position.set(preview.x,this.ground(preview.x,preview.z)+.12,preview.z);this.aimReticle.material.color.copy(this.aimGuide.material.color);
  const target=this.state.actors.find(a=>a.id===preview.targetId);this.targetRing.visible=showAim&&!!target;
  if(target){this.targetRing.position.set(target.x,this.ground(target.x,target.z)+.1,target.z);this.targetRing.scale.setScalar(1+target.load*.2);}

 }
 renderFlies(){
  this.state.flies.forEach((f,i)=>{const d=this.dummy,live=f.wait<=0,y=this.ground(f.x,f.z)+1.05+Math.sin(this.elapsed*5+f.phase)*.12,x=f.x+Math.sin(this.elapsed*3+f.phase)*.12;
   d.position.set(x,live?y:-100,f.z);d.scale.set(live?.105:0,live?.08:0,live?.14:0);d.rotation.set(0,f.phase,0);d.updateMatrix();this.flyBodies.setMatrixAt(i,d.matrix);
   for(let side=0;side<2;side++){d.position.set(x+(side===0?-.10:.10),live?y+.045:-100,f.z);d.scale.set(live?.17:0,live?.015:0,live?.08:0);d.rotation.set(0,f.phase,Math.sin(this.elapsed*55+f.phase)*(side===0?1:-1)*.5);d.updateMatrix();this.flyWings.setMatrixAt(i*2+side,d.matrix);}
  });this.flyBodies.instanceMatrix.needsUpdate=true;this.flyWings.instanceMatrix.needsUpdate=true;
  SWARMS.forEach((zone,i)=>{const available=this.state.flies.filter(f=>f.swarmId===zone.id&&f.wait<=0).length,ring=this.swarmRings[i];ring.material.opacity=available?.2:.09;ring.material.color.set(available?'#c8e0a3':'#6f8c83');});
  const live=new Set();for(const b of this.state.bullets){live.add(b.id);let mesh=this.bulletMeshes.get(b.id);if(!mesh){mesh=this.makeFlyBullet();this.bulletMeshes.set(b.id,mesh);const owner=this.state.actors.findIndex(a=>a.id===b.owner);mesh.userData.mouth=this.models[owner].mouthWorld().clone();}mesh.position.set(b.x,this.ground(b.x,b.z)+.9,b.z);const age=(RULES.projectileLifetime||1.6)-b.life;if(age<.09)mesh.position.lerp(mesh.userData.mouth,1-age/.09);mesh.rotation.y=Math.atan2(b.dx,b.dz);mesh.children[1].rotation.z=Math.sin(this.elapsed*75);mesh.children[2].rotation.z=-Math.sin(this.elapsed*75);}
  for(const [id,mesh] of this.bulletMeshes)if(!live.has(id)){mesh.removeFromParent();this.bulletMeshes.delete(id);}
  for(const [id,t] of this.tongues){const age=(this.elapsed-t.start)/.22;if(age>=1){t.mesh.removeFromParent();this.tongues.delete(id);continue;}const i=this.state.actors.findIndex(a=>a.id===id),m=this.models[i],start=m.mouthWorld(),end=new V(t.x,this.ground(t.x,t.z)+1,t.z),reach=Math.sin(age*Math.PI);end.lerpVectors(start,end,reach);const dir=end.clone().sub(start);t.mesh.position.copy(start).addScaledVector(dir,.5);t.mesh.quaternion.setFromUnitVectors(UP,dir.clone().normalize());t.mesh.scale.set(.07,Math.max(.001,dir.length()),.07);}
 }
 project(x,y,z){const p=new V(x,y,z).project(this.camera);return {x:(p.x+1)*this.w/2,y:(1-p.y)*this.h/2,visible:p.z>-1&&p.z<1};}
 drawLabels(){const c=this.labelCtx;c.clearRect(0,0,this.w,this.h);c.textAlign='center';c.lineJoin='round';c.font='800 18px sans-serif';if(this.running){drawFlyMarkers(this,c);drawRadar(this,this.$('minimap'));}
  if(this.currentAimPreview){const aim=this.currentAimPreview,q=this.project(aim.x,this.ground(aim.x,aim.z)+.9,aim.z);if(q.visible&&q.x>12&&q.x<this.w-12&&q.y>90&&q.y<this.h-30){c.save();c.lineWidth=4;c.strokeStyle='#173c35';c.beginPath();c.arc(q.x,q.y,7,0,Math.PI*2);c.stroke();c.lineWidth=2;c.strokeStyle=aim.targetId?'#ffc5a0':'#f4ffdd';c.beginPath();c.arc(q.x,q.y,7,0,Math.PI*2);for(const [x,y] of [[1,0],[-1,0],[0,1],[0,-1]]){c.moveTo(q.x+x*10,q.y+y*10);c.lineTo(q.x+x*16,q.y+y*16);}c.stroke();c.restore();}}

  if(this.hitConfirmUntil>this.elapsed&&this.lastPlayerHit){const h=this.lastPlayerHit,target=this.state.actors.find(a=>a.id===h.id),q=this.project(h.x,this.ground(h.x,h.z)+(target?.height||0)+1.2,h.z);if(q.visible){c.save();c.strokeStyle='#143d35';c.lineWidth=6;c.beginPath();for(const [x,y] of [[1,1],[-1,1],[1,-1],[-1,-1]]){c.moveTo(q.x+x*6,q.y+y*6);c.lineTo(q.x+x*15,q.y+y*15);}c.stroke();c.strokeStyle='#fffce2';c.lineWidth=3;c.stroke();c.restore();}}
  this.state.actors.forEach((a,i)=>{if(a.eliminated)return;const p=this.project(a.x,this.ground(a.x,a.z)+a.height+2.4,a.z);if(!p.visible)return;const on=p.x>20&&p.x<this.w-20&&p.y>70&&p.y<this.h-40;
   if(!on&&i>0&&!a.ko&&this.running){const x=clamp(p.x,24,this.w-24),y=clamp(p.y,110,this.h-(this.touch?210:90));c.font='bold 24px sans-serif';c.fillStyle=i===1?'#ffbb8e':'#dfb5ff';c.fillText('▼',x,y);return;}
   if(a.ko){c.font='900 20px sans-serif';c.strokeStyle='#1e2e28';c.lineWidth=5;const text=`KO · ${Math.ceil(a.respawnTime||0)}″`;c.strokeText(text,p.x,p.y);c.fillStyle='#ffe374';c.fillText(text,p.x,p.y);return;}
   if(a.dizzyTime>0){for(let j=0;j<3;j++){const r=this.elapsed*4+j*2.094;c.font='bold 25px sans-serif';c.fillStyle='#ffdf57';c.strokeStyle='#725c21';c.lineWidth=3;const x=p.x+Math.cos(r)*27,y=p.y+Math.sin(r)*7;c.strokeText('★',x,y);c.fillText('★',x,y);}c.font='bold 15px sans-serif';c.fillStyle='#fff4ad';c.fillText(a.dizzyTime.toFixed(1)+'″',p.x,p.y+24);for(let j=0;j<RULES.finishHits;j++){c.beginPath();c.arc(p.x+(j-(RULES.finishHits-1)/2)*11,p.y+36,4,0,Math.PI*2);c.fillStyle=j<a.finishHits?'#ffb58e':'#244438';c.fill();c.strokeStyle='#ffe6ac';c.lineWidth=1.5;c.stroke();}}
   else if(i>0){if(a.aimWindup>0){c.font='900 22px sans-serif';c.fillStyle='#ffddaa';c.fillText('!',p.x,p.y-40);}const label=i===1?'ΚΟΚΚΙΝΟΣ':'ΜΩΒ';const fill=i===1?'#ff886a':'#dba1ff';c.fillStyle='#112b27dd';c.strokeStyle=fill;c.lineWidth=3;c.beginPath();if(c.roundRect){c.roundRect(p.x-52,p.y-28,104,24,10);}else{c.rect(p.x-52,p.y-28,104,24);}c.fill();c.stroke();c.font='bold 15px sans-serif';c.fillStyle=fill;c.fillText(label,p.x,p.y-11);for(let j=0;j<6;j++){c.beginPath();c.arc(p.x+(j-2.5)*9,p.y+6,3.8,0,Math.PI*2);c.fillStyle=j<a.dizzy?'#ffe16a':'#214036bb';c.fill();}}
  });
  if(this.running){const player=this.state.actors[0];for(const base of this.state.bases){const definition=BASES.find(b=>b.id===base.id),near=Math.hypot(player.x-definition.stock.x,player.z-definition.stock.z)<10;if(base.destroyed||(!near&&!base.attackerId))continue;const q=this.project(definition.stock.x,this.ground(definition.stock.x,definition.stock.z)+3.5,definition.stock.z);if(!q.visible||q.x<70||q.x>this.w-70||q.y<95||q.y>this.h-(this.touch?220:85))continue;const text=base.attackerId?`ΚΑΤΑΣΤΡΟΦΗ · ${Math.max(0,RULES.sabotageSeconds-base.progress).toFixed(1)}″`:base.owner==='player'?'Η ΑΠΟΘΗΚΗ ΣΟΥ · ∞':'ΕΧΘΡΙΚΗ ΑΠΟΘΗΚΗ';c.font='800 12px sans-serif';c.strokeStyle='#14342df2';c.lineWidth=5;c.strokeText(text,q.x,q.y);c.fillStyle=base.attackerId?'#ffd197':base.owner==='player'?'#dbff9d':'#ffbdad';c.fillText(text,q.x,q.y);}}
  this.fx=this.fx.filter(f=>this.elapsed-f.start<f.life);for(const f of this.fx){const t=(this.elapsed-f.start)/f.life,p=this.project(f.x,this.ground(f.x,f.z)+2+t*2,f.z);c.globalAlpha=1-t;c.font=`900 ${f.text==='ΝΟΚ ΑΟΥΤ!'?32:22}px sans-serif`;c.strokeStyle='#244136';c.lineWidth=6;c.strokeText(f.text,p.x,p.y);c.fillStyle=f.color;c.fillText(f.text,p.x,p.y);}c.globalAlpha=1;
 }
 frame(now){
  const dt=Math.min(.05,Math.max(0,(now-this.last)/1000));this.last=now;
  if(this.running&&!this.layoutEditing){this.elapsed+=dt;this.accumulator+=dt;while(this.accumulator>=1/60){step(this.state,this.currentInput(),1/60);this.consumeEvents();this.accumulator-=1/60;if(this.state.status!=='playing'){this.finish();break;}}this.saveClock+=dt;if(this.saveClock>3){this.saveClock=0;this.persist();}}
  else if(this.mode==='result'||this.mode==='finishing')this.elapsed+=dt;
  if(this.mode==='finishing'&&this.elapsed>=this.resultAt)this.showResult();
  const p=this.state.actors[0],pose=cameraPose(p,this.ground(p.x,p.z),this.w/this.h,this.viewMode,{yaw:this.cameraYaw,pitch:this.cameraPitch}),lookPoint=new V(...pose.look),camPoint=new V(...pose.position);
  if(!this.cameraReady){this.focus.copy(lookPoint);this.cameraTarget.copy(camPoint);this.cameraReady=true;}else{this.focus.lerp(lookPoint,1-Math.exp(-dt*8));this.cameraTarget.lerp(camPoint,1-Math.exp(-dt*8));}
  this.shake*=Math.exp(-dt*15);const shake=this.running?this.shake:0;this.camera.position.copy(this.cameraTarget);this.camera.position.x+=(Math.random()-.5)*shake;this.camera.lookAt(this.focus);this.camera.updateMatrixWorld();
  if(this.running||this.mode==='title'||this.mode==='result'||this.mode==='finishing'){const animationDt=this.mode==='title'||this.layoutEditing?0:dt;this.renderActors(animationDt);this.renderFlies();this.updateCatapultAim?.();this.artilleryView.update(animationDt);this.basesView.update(animationDt);this.impactEffects.update(animationDt);this.world.update(this.running&&!this.layoutEditing?dt:0,this.elapsed,1,new V(p.x,this.ground(p.x,p.z),p.z));}
  if((this.running&&!this.layoutEditing)||this.mode==='finishing'||this.mode==='result'){this.particles=this.particles.filter(p=>{if(this.elapsed-p.start>.55){p.mesh.removeFromParent();return false;}p.v.y-=dt*16;p.mesh.position.addScaledVector(p.v,dt);return true;});}
  this.renderer.render(this.scene,this.camera);this.drawLabels();this.updateHUD();
 }
 inspect(){return {version:ARCADE_VERSION,viewMode:this.viewMode,cameraYaw:this.cameraYaw,cameraPitch:this.cameraPitch,cameraDragging:!!this.cameraDrag,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/RULES.capacity*100),actors:this.state.actors.map(a=>({id:a.id,x:a.x,z:a.z,ammo:a.ammo,dizzy:a.dizzy,dizzyTime:a.dizzyTime,ko:a.ko,eliminated:a.eliminated,respawnTime:a.respawnTime,sabotageId:a.sabotageId,aiming:a.aiming,face:a.face,hop:a.hop,hopX:a.hopX,hopZ:a.hopZ,height:a.height,knockUp:a.knockUp,finishHits:a.finishHits,kickCooldown:a.kickCooldown,catapultId:a.catapultId})),bases:this.state.bases.map(b=>({...b})),layoutEditing:this.layoutEditing,touch:this.touch,catapults:this.state.catapults?.map(c=>({id:c.id,occupant:c.occupant,cooldown:c.cooldown})),shells:this.state.shells?.length,hitConfirmUntil:this.hitConfirmUntil,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:true};}
}

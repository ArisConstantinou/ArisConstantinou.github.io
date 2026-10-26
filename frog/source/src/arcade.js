import * as THREE from 'three';
import { createWorld } from './world.js';
import { createCreature } from './creatures.js';
import { ARCADE_VERSION, SAVE_KEY, SETTINGS_KEY, RULES, OBSTACLES, newRound, step, saveRound, loadRound, kickTarget, fireRing } from './arcade-model.js';
import './arcade.css';
import { cameraPose, screenToWorld } from './arcade-view-math.js';
import { drawRadar, drawFlyMarkers } from './arcade-radar.js';

const V=THREE.Vector3, UP=new V(0,1,0);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const read=(key)=>{try{return localStorage.getItem(key);}catch{return null;}};
const write=(key,value)=>{try{localStorage.setItem(key,value);return true;}catch{return false;}};
const svg=(body)=>`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true">${body}</svg>`;
const flyIcon=svg('<ellipse cx="21" cy="22" rx="13" ry="8" fill="#e5fdff" transform="rotate(-30 21 22)"/><ellipse cx="43" cy="22" rx="13" ry="8" fill="#e5fdff" transform="rotate(30 43 22)"/><ellipse cx="32" cy="36" rx="12" ry="17" fill="#efc650" stroke="#14282c" stroke-width="4"/><path d="M21 33h22M21 42h22" stroke="#14282c" stroke-width="6"/><circle cx="27" cy="23" r="5" fill="white"/><circle cx="37" cy="23" r="5" fill="white"/><circle cx="28" cy="23" r="2" fill="#14282c"/><circle cx="36" cy="23" r="2" fill="#14282c"/>');
const tongueIcon=svg('<path d="M10 22c0 30 35 33 42 7 4-14-20-15-21-3-1 8 13 8 13 0" stroke="#ff8d9a" stroke-width="10" stroke-linecap="round"/>');
const kickIcon=svg('<path d="m15 8 11 5-4 21 29 6 4 10-36 4-9-11z" fill="#d3ff80" stroke="#314b2d" stroke-width="3"/><path d="m46 13 4 8m9-5-6 9m9 4-9 1" stroke="#ffce71" stroke-width="4"/>');
const playIcon=svg('<path d="M18 10v44l36-22z" fill="#f3ffd0" stroke="#264e26" stroke-width="4" stroke-linejoin="round"/>');
const settingsIcon=svg('<path d="M12 18h40M12 32h40M12 46h40" stroke="#e9f3e5" stroke-width="5" stroke-linecap="round"/><circle cx="24" cy="18" r="6" fill="#fbc562"/><circle cx="42" cy="32" r="6" fill="#fbc562"/><circle cx="24" cy="46" r="6" fill="#fbc562"/>');

class ArcadeSound {
 constructor(){this.volume=.5;this.ctx=null;this.gain=null;}
 resume(){try{if(!this.ctx){this.ctx=new (window.AudioContext||window.webkitAudioContext)();this.gain=this.ctx.createGain();this.gain.connect(this.ctx.destination);}this.gain.gain.value=this.volume;this.ctx.resume();}catch{}}
 pause(){if(this.ctx){this.gain.gain.value=0;this.ctx.suspend().catch(()=>{});}}
 play(kind){if(!this.ctx||this.ctx.state!=='running'||this.volume<=0)return;const c=this.ctx,t=c.currentTime,o=c.createOscillator(),g=c.createGain();const notes={shot:[200,70,.065],tongue:[560,150,.11],hit:[110,45,.12],dizzy:[700,240,.28],ko:[80,330,.26],win:[400,800,.45],lost:[220,55,.4]};const n=notes[kind];if(!n)return;o.type=kind==='hit'?'triangle':'sine';o.frequency.setValueAtTime(n[0],t);o.frequency.exponentialRampToValueAtTime(n[1],t+n[2]);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.14,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+n[2]);o.connect(g);g.connect(this.gain);o.start(t);o.stop(t+n[2]+.01);o.onended=()=>{o.disconnect();g.disconnect();};}
}

export class ArcadeGame {
 constructor(){
  this.touch=matchMedia('(pointer: coarse)').matches||navigator.maxTouchPoints>0;
  this.settings={volume:.5,quality:this.touch?'low':'high'};try{Object.assign(this.settings,JSON.parse(read(SETTINGS_KEY)||'{}'));}catch{}
  this.settings.volume=clamp(Number(this.settings.volume)||0,0,1);
  if(!['low','high'].includes(this.settings.quality))this.settings.quality='low';
  this.state=newRound();this.saved=loadRound(read(SAVE_KEY));this.running=false;this.mode='title';this.keys=new Set();this.actions={collect:false,fire:false,kick:false};this.move={x:0,z:0};this.aim={x:0,z:-1};this.mouse={x:0,y:0,valid:false};this.pointers=new Map();this.fx=[];this.particles=[];this.splats=[];this.tongues=new Map();this.bulletMeshes=new Map();this.koTimes=new Map();this.elapsed=0;this.shake=0;this.saveClock=0;this.accumulator=0;this.failures=[];
  this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#9fe4ff');this.scene.fog=new THREE.FogExp2('#baf0ea',.006);
  this.renderer=new THREE.WebGLRenderer({antialias:!this.touch,powerPreference:'high-performance'});this.renderer.domElement.id='arcade-world';this.renderer.domElement.setAttribute('aria-label','FROG — κωμική μάχη με μύγες');this.renderer.outputColorSpace=THREE.SRGBColorSpace;this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.3;document.body.append(this.renderer.domElement);
  this.camera=new THREE.PerspectiveCamera(52,innerWidth/innerHeight,.1,250);this.camera.position.set(0,8,15);this.focus=new V(0,2,3);this.cameraTarget=new V(0,8,15);this.viewMode='chase3d';this.cameraReady=false;
  this.scene.add(new THREE.HemisphereLight('#def8ff','#52733a',2.6));this.sun=new THREE.DirectionalLight('#fff1bf',3.2);this.sun.position.set(-16,36,12);this.scene.add(this.sun);
  this.world=createWorld(this.scene,this.renderer,{seed:731,natural:true});
  this.labels=document.createElement('canvas');this.labels.id='arcade-labels';document.body.append(this.labels);this.labelCtx=this.labels.getContext('2d');
  this.sound=new ArcadeSound();this.sound.volume=this.settings.volume;
  this.shared={sphere:new THREE.SphereGeometry(1,10,7),wing:new THREE.SphereGeometry(1,6,4),cylinder:new THREE.CylinderGeometry(1,1,1,8),circle:new THREE.CircleGeometry(1,18)};
  this.materials={insect:new THREE.MeshStandardMaterial({color:'#ffd44a',roughness:.55,metalness:.05}),wing:new THREE.MeshBasicMaterial({color:'#edfcff',transparent:true,opacity:.86,side:THREE.DoubleSide,depthWrite:false}),flyGlow:new THREE.MeshBasicMaterial({color:'#fff1a8',transparent:true,opacity:.35,depthWrite:false,side:THREE.DoubleSide}),tongue:new THREE.MeshStandardMaterial({color:'#ff839c',roughness:.4}),shot:new THREE.MeshStandardMaterial({color:'#ffd750',emissive:'#bd7d12',emissiveIntensity:.6}),ink:new THREE.MeshBasicMaterial({color:'#90e44c',transparent:true,opacity:.9,depthWrite:false,side:THREE.DoubleSide}),rock:new THREE.MeshStandardMaterial({color:'#617b70',roughness:.9}),rim:new THREE.MeshBasicMaterial({color:'#eaff9e',transparent:true,opacity:.6,depthWrite:false})};
  this.createArena();this.models=[];this.buildActors();this.createFlies();this.createUI();this.bindInputs();this.applyQuality();this.resize();this.showTitle();
  window.__FROG__={version:ARCADE_VERSION,mode:'arcade',inspect:()=>this.inspect(),save:()=>this.persist()};
  if(new URLSearchParams(location.search).has('test'))window.__FROG__.test={step:(input,n=1)=>{for(let i=0;i<n;i++){step(this.state,input,1/60);this.consumeEvents();}this.updateHUD();},state:()=>this.state,setState:(s)=>{this.state=s;this.buildActors();this.updateHUD();},input:()=>this.currentInput(),kickTarget:()=>kickTarget(this.state,this.state.actors[0])?.id};
  this.last=performance.now();this.renderer.setAnimationLoop(now=>this.frame(now));document.getElementById('boot')?.remove();
 }
 ground(x,z){return this.world.getSurface(x,z).height;}
 createArena(){
  this.obstacleMeshes=[];
  for(const o of OBSTACLES){const mesh=new THREE.Mesh(new THREE.DodecahedronGeometry(o.r,1),this.materials.rock);mesh.scale.y=1.7;mesh.position.set(o.x,this.ground(o.x,o.z)+o.r*.9,o.z);this.scene.add(mesh);this.obstacleMeshes.push(mesh);}
  const points=[];for(let i=0;i<=160;i++){const a=i/160*Math.PI*2,x=Math.sin(a)*RULES.radius,z=Math.cos(a)*RULES.radius;points.push(new V(x,this.ground(x,z)+.06,z));}const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),this.materials.rim);this.scene.add(line);
  this.playerRing=new THREE.Mesh(new THREE.RingGeometry(1.05,1.18,32),new THREE.MeshBasicMaterial({color:'#ecff9a',side:THREE.DoubleSide,transparent:true,opacity:.85,depthWrite:false}));this.playerRing.rotation.x=-Math.PI/2;this.scene.add(this.playerRing);
  this.aimGuide=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new V(),new V()]),new THREE.LineDashedMaterial({color:'#fff2b0',dashSize:.45,gapSize:.35,transparent:true,opacity:.65}));this.scene.add(this.aimGuide);
 }
 buildActors(){
  for(const m of this.models||[])m.dispose();this.models=this.state.actors.map((a,i)=>{const m=createCreature('frog',{seed:7+i*39,team:i===0?'player':`enemy${i}`,role:i===2?'bruiser':'hunter',tier:1,level:1});m.setEquipment({});m.setOutline(i===0?'#e7fca7':i===1?'#ffae88':'#d3a8ff',true);if(this.settings.quality==='low')m.setRenderLOD(1);if(m.mesh?.material){const mat=m.mesh.material;mat.bumpScale=0;mat.roughness=.85;mat.userData?.tint?.set(['#86da38','#ff694a','#bb70ed'][i]);}this.scene.add(m.group);return m;});
 }
 createFlies(){
  this.flyBodies=new THREE.InstancedMesh(this.shared.sphere,this.materials.insect,72);this.flyWings=new THREE.InstancedMesh(this.shared.wing,this.materials.wing,144);this.flyGlows=new THREE.InstancedMesh(this.shared.circle,this.materials.flyGlow,72);this.flyBodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.flyWings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.flyGlows.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.flyBodies.frustumCulled=false;this.flyWings.frustumCulled=false;this.flyGlows.frustumCulled=false;this.scene.add(this.flyGlows,this.flyBodies,this.flyWings);this.dummy=new THREE.Object3D();
 }
 createUI(){
  this.ui=document.createElement('div');this.ui.id='arcade-ui';this.ui.classList.toggle('is-touch',this.touch);
  this.ui.innerHTML=`<header id="arcade-hud" hidden><button class="view-button" id="view-button" aria-label="Εναλλαγή κάμερας">3D</button><div class="ammo-card">${flyIcon}<div class="ammo-info"><div class="ammo-numbers"><strong id="ammo-count">0 / 40</strong><b id="ammo-percent">0%</b></div><div id="ammo-track" role="progressbar" aria-label="Γέμιση με μύγες" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i id="ammo-fill"></i></div><span id="ammo-state">Πιάσε μύγες με τη γλώσσα</span></div></div><div class="ko-card"><b id="ko-count">0 / 2</b><span>ΝΟΚ ΑΟΥΤ</span></div><button class="small-button" id="pause-button" aria-label="Παύση">Ⅱ</button></header>
  <canvas id="minimap" width="320" height="320" aria-label="Χάρτης: εσύ πράσινος, αντίπαλοι κόκκινος και μωβ, μύγες κίτρινες"></canvas><div id="dizzy-banner" hidden>🌀 ΖΑΛΙΣΤΗΚΕΣ! <b id="dizzy-time"></b></div><div id="callout" aria-live="polite"></div>
  <div id="desktop-help" hidden><span><b>WASD</b> Άλματα</span><span><b>E / δεξί κλικ</b> Γλώσσα</span><span><b>Αριστερό κλικ</b> Βολές</span><span id="pc-kick"><b>Q</b> Κλωτσιά σε ζαλισμένο</span></div>
  <div id="touch-controls" hidden><div class="stick-zone move-zone"><div id="move-stick" class="stick" aria-label="Κίνηση"><div class="stick-inner"></div><div class="stick-knob"></div></div><span class="stick-caption">ΑΛΜΑΤΑ</span></div><button id="tongue-button" class="touch-action tongue-button" aria-label="Μάζεψε μύγες με τη γλώσσα">${tongueIcon}<span>ΓΛΩΣΣΑ</span></button><button id="kick-button" class="touch-action kick-button" aria-label="Κλωτσιά για νοκ άουτ" disabled>${kickIcon}<span>ΚΛΩΤΣΙΑ</span></button><div class="stick-zone aim-zone"><div id="aim-stick" class="stick" aria-label="Στόχευση μέσα, πυροβολισμός στον εξωτερικό δακτύλιο"><div class="fire-ring"></div><div class="stick-inner"></div><div class="stick-knob"></div><b class="ring-label">ΠΥΡ</b></div><span class="stick-caption">ΣΤΟΧΕΥΣΗ</span></div></div>
  <section id="arcade-menu" class="menu"><div id="menu-main" class="menu-buttons"><button id="play-button" class="art-button play-button">${playIcon}<span>ΠΑΙΞΕ</span></button><button id="settings-button" class="art-button settings-button">${settingsIcon}<span>ΡΥΘΜΙΣΕΙΣ</span></button></div><div id="settings-panel" class="settings-panel" hidden><h2>Ρυθμίσεις</h2><label>Ήχος <input id="volume" type="range" min="0" max="100" value="${Math.round(this.settings.volume*100)}"></label><label>Γραφικά <select id="quality"><option value="low">Ομαλή κίνηση</option><option value="high">Υψηλά</option></select></label><button id="settings-back" class="art-button compact">ΠΙΣΩ</button></div><div id="result-panel" class="result-panel" hidden><span class="result-kicker">FROG • FLY FRENZY</span><h1 id="result-title"></h1><p id="result-copy"></p><button id="replay-button" class="art-button play-button">${playIcon}<span>ΠΑΙΞΕ ΞΑΝΑ</span></button><button id="result-settings" class="plain-button">Ρυθμίσεις</button></div><span class="version">FROG ${ARCADE_VERSION}</span></section>`;
  document.body.append(this.ui);this.$=id=>this.ui.querySelector('#'+id);this.$('quality').value=this.settings.quality;
  this.$('view-button').onclick=()=>this.toggleView();this.$('play-button').onclick=()=>this.startOrResume();this.$('pause-button').onclick=()=>this.pause();this.$('settings-button').onclick=()=>this.settingsMenu();this.$('result-settings').onclick=()=>this.settingsMenu();this.$('settings-back').onclick=()=>{this.$('settings-panel').hidden=true;if(this.mode==='result')this.$('result-panel').hidden=false;else this.$('menu-main').hidden=false;};this.$('replay-button').onclick=()=>this.startNew();
  this.$('volume').oninput=e=>{this.settings.volume=Number(e.target.value)/100;this.sound.volume=this.settings.volume;write(SETTINGS_KEY,JSON.stringify(this.settings));};this.$('quality').onchange=e=>{this.settings.quality=e.target.value;this.applyQuality();write(SETTINGS_KEY,JSON.stringify(this.settings));};
 }
 showTitle(){this.running=false;this.mode='title';this.$('play-button').querySelector('span').textContent=this.saved?.status==='playing'?'ΣΥΝΕΧΕΙΑ':'ΠΑΙΞΕ';this.ui.classList.add('in-menu');}
 settingsMenu(){this.$('menu-main').hidden=true;this.$('result-panel').hidden=true;this.$('settings-panel').hidden=false;}
 startOrResume(){if(this.mode==='pause'){this.go();return;}if(this.saved?.status==='playing'){this.state=this.saved;this.saved=null;this.buildActors();this.go();}else this.startNew();}
 toggleView(){this.viewMode=this.viewMode==='chase3d'?'overview':'chase3d';this.$('view-button').textContent=this.viewMode==='chase3d'?'3D · C':'ΑΠΟ ΠΑΝΩ · C';this.cameraReady=false;}
 startNew(){this.aim={x:0,z:-1};this.mouse.valid=false;this.cameraReady=false;this.state=newRound(731+Math.floor(Math.random()*100000));this.clearEffects();this.buildActors();this.go();this.message('ΠΙΑΣΕ ΜΥΓΕΣ → ΠΥΡΟΒΟΛΗΣΕ → ΚΛΩΤΣΙΑ!',3.5);}
 go(){this.clearInputs();this.accumulator=0;this.last=performance.now();this.running=true;this.mode='play';this.$('arcade-menu').hidden=true;this.$('settings-panel').hidden=true;this.$('result-panel').hidden=true;this.$('menu-main').hidden=false;this.$('arcade-hud').hidden=false;this.$('desktop-help').hidden=this.touch;this.$('touch-controls').hidden=!this.touch;this.ui.classList.remove('in-menu');this.sound.resume();this.updateHUD();this.persist();}
 pause(){if(!this.running)return;this.running=false;this.mode='pause';this.clearInputs();this.persist();this.sound.pause();this.$('arcade-menu').hidden=false;this.$('menu-main').hidden=false;this.$('settings-panel').hidden=true;this.$('play-button').querySelector('span').textContent='ΣΥΝΕΧΕΙΑ';this.ui.classList.add('in-menu');}
 finish(){this.running=false;this.mode='finishing';this.resultAt=this.elapsed+.85;this.clearInputs();this.persist();}
 showResult(){this.running=false;this.mode='result';this.clearInputs();this.persist();const won=this.state.status==='won';this.sound.play(won?'win':'lost');this.$('arcade-menu').hidden=false;this.$('menu-main').hidden=true;this.$('result-panel').hidden=false;this.$('result-title').textContent=won?'Ο ΒΑΛΤΟΣ ΕΙΝΑΙ ΔΙΚΟΣ ΣΟΥ!':'ΣΕ ΕΚΑΝΑΝ ΣΑΛΑΤΑ!';this.$('result-copy').textContent=won?`Όλοι νοκ άουτ! ${this.state.stats.caught} μύγες · ${this.state.stats.shots} βολές · ${Math.floor(this.state.time)}″`:'Πιάσε μύγες, ζάλισε τους αντιπάλους και πλησίασε για την τελική κλωτσιά.';this.ui.classList.add('in-menu');}
 persist(){if(this.mode==='title')return false;return write(SAVE_KEY,saveRound(this.state));}
 clearInputs(){this.keys.clear();this.actions={collect:false,fire:false,kick:false};this.move={x:0,z:0};this.pointers.clear();if(this.ui){for(const el of this.ui.querySelectorAll('.stick-knob'))el.style.transform='translate(-50%,-50%)';this.$('aim-stick').classList.remove('firing');}}
 bindInputs(){
  addEventListener('keydown',e=>{if(e.target.matches('input,select'))return;if(e.code==='Escape'){e.preventDefault();if(this.running)this.pause();else if(this.mode==='pause')this.go();return;}if(!this.running)return;if(e.code==='KeyC'&&!e.repeat){e.preventDefault();this.toggleView();return;}if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','KeyE','KeyQ','Space'].includes(e.code)){e.preventDefault();this.keys.add(e.code);}});
  addEventListener('keyup',e=>this.keys.delete(e.code));
  const canvas=this.renderer.domElement;
  canvas.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'){this.mouse={x:e.clientX,y:e.clientY,valid:true};}});
  canvas.addEventListener('pointerdown',e=>{if(!this.running||e.pointerType==='touch')return;e.preventDefault();this.mouse={x:e.clientX,y:e.clientY,valid:true};if(e.button===0)this.actions.fire=true;if(e.button===2)this.actions.collect=true;});
  addEventListener('pointerup',e=>{if(e.pointerType!=='touch'){if(e.button===0)this.actions.fire=false;if(e.button===2)this.actions.collect=false;}});
  canvas.addEventListener('contextmenu',e=>e.preventDefault());
  const bindStick=(id,kind)=>{const el=this.$(id),knob=el.querySelector('.stick-knob');let active=null;
   const update=e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/(r.width/2),y=(e.clientY-r.top-r.height/2)/(r.height/2),v=fireRing(x,y),d=Math.hypot(x,y),k=d>1?1/d:1;knob.style.transform=`translate(-50%,-50%) translate(${x*k*r.width*.31}px,${y*k*r.height*.31}px)`;if(kind==='move')this.move={x:v.x,z:v.z};else{if(d>.08)this.aim=screenToWorld(x/d,y/d,this.camera.position,this.focus);this.actions.fire=v.fire;el.classList.toggle('firing',v.fire);}this.mouse.valid=false;};
   el.onpointerdown=e=>{if(!this.running||(active!==null&&this.pointers.has(kind)))return;e.preventDefault();active=e.pointerId;this.pointers.set(kind,active);el.setPointerCapture(e.pointerId);update(e);};el.onpointermove=e=>{if(active===e.pointerId&&this.pointers.get(kind)===active){e.preventDefault();update(e);}};
   const stop=e=>{if(e.pointerId!==active)return;active=null;this.pointers.delete(kind);knob.style.transform='translate(-50%,-50%)';if(kind==='move')this.move={x:0,z:0};else{this.actions.fire=false;el.classList.remove('firing');}};el.onpointerup=stop;el.onpointercancel=stop;el.onlostpointercapture=stop;
  };bindStick('move-stick','move');bindStick('aim-stick','aim');
  const hold=(id,key)=>{const el=this.$(id);el.onpointerdown=e=>{if(!this.running||el.disabled)return;e.preventDefault();el.setPointerCapture(e.pointerId);this.actions[key]=true;};const release=()=>this.actions[key]=false;el.onpointerup=release;el.onpointercancel=release;el.onlostpointercapture=release;};hold('tongue-button','collect');hold('kick-button','kick');
  addEventListener('blur',()=>{this.clearInputs();if(this.running)this.pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden){this.clearInputs();this.pause();this.sound.pause();}});addEventListener('beforeunload',()=>this.persist());addEventListener('resize',()=>{this.clearInputs();this.resize();});
 }
 applyQuality(){const low=this.settings.quality==='low';this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,low?1:1.5));for(const m of this.models)m.setRenderLOD(low?1:0);this.resize();}
 resize(){const w=innerWidth,h=innerHeight;this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.cameraReady=false;this.labels.width=w;this.labels.height=h;this.w=w;this.h=h;}
 currentInput(){
  const p=this.state.actors[0];if(this.mouse.valid){const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(this.mouse.x/this.w*2-1,1-this.mouse.y/this.h*2),this.camera);const point=new V();if(ray.ray.intersectPlane(new THREE.Plane(UP,-this.ground(p.x,p.z)-.8),point)){const dx=point.x-p.x,dz=point.z-p.z,d=Math.hypot(dx,dz);if(d>.1)this.aim={x:dx/d,z:dz/d};}}
  const movement=screenToWorld(this.move.x+(this.keys.has('KeyD')||this.keys.has('ArrowRight')?1:0)-(this.keys.has('KeyA')||this.keys.has('ArrowLeft')?1:0),this.move.z+(this.keys.has('KeyS')||this.keys.has('ArrowDown')?1:0)-(this.keys.has('KeyW')||this.keys.has('ArrowUp')?1:0),this.camera.position,this.focus);
  return {mx:movement.x,mz:movement.z,ax:this.aim.x,az:this.aim.z,collect:this.actions.collect||this.keys.has('KeyE'),fire:this.actions.fire,kick:this.actions.kick||this.keys.has('KeyQ')};
 }
 message(text,seconds=1.5){this.$('callout').textContent=text;this.calloutUntil=this.elapsed+seconds;}
 makeFlyBullet(){const g=new THREE.Group(),b=new THREE.Mesh(this.shared.sphere,this.materials.shot);b.scale.set(.23,.19,.32);g.add(b);for(const side of [-1,1]){const w=new THREE.Mesh(this.shared.wing,this.materials.wing);w.position.set(side*.19,.1,0);w.scale.set(.25,.025,.12);g.add(w);}this.scene.add(g);return g;}
 consumeEvents(){
  for(const e of this.state.events){const index=this.state.actors.findIndex(a=>a.id===e.id),a=this.state.actors[index],m=this.models[index];
   if(e.type==='tongue'&&a){const old=this.tongues.get(a.id);if(old)this.scene.remove(old.mesh);const mesh=new THREE.Mesh(this.shared.cylinder,this.materials.tongue);this.scene.add(mesh);this.tongues.set(a.id,{mesh,start:this.elapsed,x:e.x,z:e.z});if(a.id==='player'&&!e.empty)this.sound.play('tongue');}
   if(e.type==='shot'&&a?.id==='player')this.sound.play('shot');
   if(e.type==='hit'&&m){m.mesh.material.emissive?.set('#ffffff');const yaw=m.group.rotation.y,c=Math.cos(yaw),ss=Math.sin(yaw);m.setImpact({x:c*e.dx-ss*e.dz,z:ss*e.dx+c*e.dz,strength:1.3,duration:.27});this.addText('ΣΠΛΑΤΣ!',e.x,e.z,'#ffed91',.65);this.burst(e.x,e.z);this.shake=Math.max(this.shake,a.id==='player'?.2:.08);this.sound.play('hit');}
   if(e.type==='dizzy'){this.addText('ΖΑΛΗ!',a.x,a.z,'#ffe375',1);this.sound.play('dizzy');if(a.id!=='player')this.message('ΖΑΛΙΣΤΗΚΕ! ΠΛΗΣΙΑΣΕ ΚΑΙ ΔΩΣΕ ΚΛΩΤΣΙΑ.',2.4);}
   if(e.type==='ko'){this.koTimes.set(a.id,{time:this.elapsed,dx:e.dx,dz:e.dz});this.addText('ΝΟΚ ΑΟΥΤ!',a.x,a.z,'#ffe791',1.4);this.sound.play('ko');this.shake=.32;this.makeSplat({...e,wall:false});}
   if(e.type==='splat')this.makeSplat(e);
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
 clearEffects(){for(const p of this.particles)p.mesh.removeFromParent();this.particles=[];for(const s of this.splats){s.mesh.removeFromParent();s.mesh.geometry.dispose();s.mesh.material.dispose();}this.splats=[];for(const b of this.bulletMeshes.values())b.removeFromParent();this.bulletMeshes.clear();for(const t of this.tongues.values())t.mesh.removeFromParent();this.tongues.clear();this.fx=[];this.koTimes.clear();}
 updateHUD(){
  const p=this.state.actors[0],pct=Math.round(p.ammo/RULES.capacity*100),target=kickTarget(this.state,p),kos=this.state.actors.slice(1).filter(a=>a.ko).length;
  this.$('ammo-count').textContent=`${p.ammo} / ${RULES.capacity}`;this.$('ammo-percent').textContent=pct+'%';this.$('ammo-fill').style.transform=`scaleX(${pct/100})`;this.$('ammo-track').setAttribute('aria-valuenow',String(pct));this.$('ammo-state').textContent=p.ammo===0?'ΑΔΕΙΟΣ — πιάσε μύγες!':p.ammo===40?'ΓΕΜΑΤΟΣ!':this.actions.collect||this.keys.has('KeyE')?'ΓΕΜΙΖΕΙ…':'Μύγες για βολές';this.$('ko-count').textContent=`${kos} / 2`;
  this.$('kick-button').disabled=!target||p.dizzyTime>0||p.kick>0;this.$('kick-button').classList.toggle('ready',!!target&&p.dizzyTime<=0);this.$('pc-kick').classList.toggle('ready',!!target);this.$('dizzy-banner').hidden=p.dizzyTime<=0;this.$('dizzy-time').textContent=p.dizzyTime.toFixed(1)+'″';this.$('aim-stick').classList.toggle('empty',p.ammo===0);
  if(this.running&&this.state.phase!=='battle'){this.$('callout').textContent=this.state.phase==='collect'?`Πιάσε 5 μύγες με τη ΓΛΩΣΣΑ · ${Math.min(5,this.state.stats.caught)}/5`:this.state.phase==='practice'?'Στόχευσε και φτύσε μία μύγα για να αρχίσει η μάχη!':`ΕΤΟΙΜΑΣΟΥ! Μάχη σε ${Math.ceil(this.state.intro)}″`;this.calloutUntil=this.elapsed+.15;}else if(this.calloutUntil<this.elapsed)this.$('callout').textContent='';
 }
 renderActors(dt){
  this.state.actors.forEach((a,i)=>{const m=this.models[i],ground=this.ground(a.x,a.z);let x=a.x,z=a.z,y=ground+a.height;
   const launch=this.koTimes.get(a.id),age=launch?this.elapsed-launch.time:99;if(age<.65){x+=launch.dx*age*5;z+=launch.dz*age*5;y+=Math.sin(age/.65*Math.PI)*2.5;}
   m.group.position.set(x,y,z);const active=i===0||a.shot>.02||a.tongue>0||a.kick>0,wanted=active?Math.atan2(a.aimX,a.aimZ):a.face;let diff=Math.atan2(Math.sin(wanted-m.group.rotation.y),Math.cos(wanted-m.group.rotation.y));m.group.rotation.y+=diff*Math.min(1,dt*16);
   m.update(dt,{time:this.elapsed,speed:a.hop>0?7:0,hop:a.hop>0?{phase:'air',progress:1-a.hop/.43}:a.idle>0?{phase:'land',progress:1-a.idle/.085}:{phase:'idle',progress:0},dead:a.ko,attack:a.kick>0?{type:'kick',phase:1-a.kick/.48}:a.tongue>0||a.shot>0?{type:'tongue',phase:a.tongue>0?1-a.tongue/.22:1-a.shot/.14}:null});
   const spit=a.shot>0?Math.sin((1-a.shot/RULES.shotInterval)*Math.PI):0;m.bones.jaw.rotation.x-=spit*.42;m.bones.head.rotation.x-=spit*.08;for(const eye of ['eyeL','eyeR'])m.bones[eye]?.scale.multiplyScalar(1.14);
   const load=a.load;m.bones.spine.scale.x*=1+load*.75;m.bones.spine.scale.y*=1+load*.5;m.bones.spine.scale.z*=1+load*.45;m.bones.throat.scale.multiply(new V(1+load*.45+spit*.18,1+load*.7+spit*.3,1+load*.35));
   m.group.scale.setScalar(1+load*.13);if(a.dizzyTime>0){m.group.rotation.z=Math.sin(this.elapsed*7)*.17;m.bones.head.rotation.z+=Math.sin(this.elapsed*9)*.2;}else m.group.rotation.z=age<.65?age*6:0;
  });
  const p=this.state.actors[0];this.playerRing.position.set(p.x,this.ground(p.x,p.z)+.07,p.z);this.playerRing.scale.setScalar(1+p.load*.25);const attr=this.aimGuide.geometry.attributes.position;attr.setXYZ(0,p.x+this.aim.x*1.5,this.ground(p.x,p.z)+.2,p.z+this.aim.z*1.5);attr.setXYZ(1,p.x+this.aim.x*5,this.ground(p.x+this.aim.x*5,p.z+this.aim.z*5)+.2,p.z+this.aim.z*5);attr.needsUpdate=true;this.aimGuide.computeLineDistances();this.aimGuide.visible=this.running&&!p.ko;
 }
 renderFlies(){
  this.state.flies.forEach((f,i)=>{const d=this.dummy;if(f.wait>0){d.scale.setScalar(0);d.position.set(f.x,-100,f.z);}else{d.position.set(f.x+Math.sin(this.elapsed*3+f.phase)*.24,this.ground(f.x,f.z)+1.35+Math.sin(this.elapsed*5+f.phase)*.24,f.z);d.scale.set(.30,.24,.35);}d.rotation.set(0,f.phase,0);d.updateMatrix();this.flyBodies.setMatrixAt(i,d.matrix);
   if(f.wait>0){d.position.set(f.x,-100,f.z);d.scale.setScalar(0);}else{d.position.set(f.x,this.ground(f.x,f.z)+1.34,f.z);d.rotation.set(-Math.PI/2,0,0);d.scale.set(.7,.7,.7);}d.updateMatrix();this.flyGlows.setMatrixAt(i,d.matrix);
   for(let side=0;side<2;side++){if(f.wait<=0){d.position.set(f.x+(side===0?-.22:.22),this.ground(f.x,f.z)+1.38,f.z);d.scale.set(.42,.025,.23);d.rotation.set(0,0,Math.sin(this.elapsed*55+f.phase)*(side===0?1:-1)*.65);}else{d.scale.setScalar(0);}d.updateMatrix();this.flyWings.setMatrixAt(i*2+side,d.matrix);}
  });this.flyBodies.instanceMatrix.needsUpdate=true;this.flyGlows.instanceMatrix.needsUpdate=true;this.flyWings.instanceMatrix.needsUpdate=true;
  const live=new Set();for(const b of this.state.bullets){live.add(b.id);let mesh=this.bulletMeshes.get(b.id);if(!mesh){mesh=this.makeFlyBullet();this.bulletMeshes.set(b.id,mesh);const owner=this.state.actors.findIndex(a=>a.id===b.owner);mesh.userData.mouth=this.models[owner].mouthWorld().clone();}mesh.position.set(b.x,this.ground(b.x,b.z)+.9,b.z);const age=1.6-b.life;if(age<.09)mesh.position.lerp(mesh.userData.mouth,1-age/.09);mesh.rotation.y=Math.atan2(b.dx,b.dz);mesh.children[1].rotation.z=Math.sin(this.elapsed*75);mesh.children[2].rotation.z=-Math.sin(this.elapsed*75);}
  for(const [id,mesh] of this.bulletMeshes)if(!live.has(id)){mesh.removeFromParent();this.bulletMeshes.delete(id);}
  for(const [id,t] of this.tongues){const age=(this.elapsed-t.start)/.22;if(age>=1){t.mesh.removeFromParent();this.tongues.delete(id);continue;}const i=this.state.actors.findIndex(a=>a.id===id),m=this.models[i],start=m.mouthWorld(),end=new V(t.x,this.ground(t.x,t.z)+1,t.z),reach=Math.sin(age*Math.PI);end.lerpVectors(start,end,reach);const dir=end.clone().sub(start);t.mesh.position.copy(start).addScaledVector(dir,.5);t.mesh.quaternion.setFromUnitVectors(UP,dir.clone().normalize());t.mesh.scale.set(.07,Math.max(.001,dir.length()),.07);}
 }
 project(x,y,z){const p=new V(x,y,z).project(this.camera);return {x:(p.x+1)*this.w/2,y:(1-p.y)*this.h/2,visible:p.z>-1&&p.z<1};}
 drawLabels(){const c=this.labelCtx;c.clearRect(0,0,this.w,this.h);c.textAlign='center';c.lineJoin='round';c.font='800 18px sans-serif';if(this.running){drawFlyMarkers(this,c);drawRadar(this,this.$('minimap'));}
  this.state.actors.forEach((a,i)=>{const p=this.project(a.x,this.ground(a.x,a.z)+a.height+2.4,a.z);if(!p.visible)return;const on=p.x>20&&p.x<this.w-20&&p.y>70&&p.y<this.h-40; if(i===0&&on){c.fillStyle='#10311fdd';c.strokeStyle='#efffc0';c.lineWidth=4;c.beginPath();c.roundRect?.(p.x-44,p.y-48,88,26,10);c.fill();c.stroke();c.fillStyle='#f3ffd0';c.fillText('ΕΣΥ',p.x,p.y-30);} 
   if(!on&&i>0&&!a.ko&&this.running){const x=clamp(p.x,24,this.w-24),y=clamp(p.y,110,this.h-(this.touch?210:90));c.font='bold 24px sans-serif';c.fillStyle=i===1?'#ffbb8e':'#dfb5ff';c.fillText('▼',x,y);return;}
   if(a.ko){c.font='900 23px sans-serif';c.strokeStyle='#1e2e28';c.lineWidth=5;c.strokeText('KO',p.x,p.y);c.fillStyle='#ffe374';c.fillText('KO',p.x,p.y);return;}
   if(a.dizzyTime>0){for(let j=0;j<3;j++){const r=this.elapsed*4+j*2.094;c.font='bold 25px sans-serif';c.fillStyle='#ffdf57';c.strokeStyle='#725c21';c.lineWidth=3;const x=p.x+Math.cos(r)*27,y=p.y+Math.sin(r)*7;c.strokeText('★',x,y);c.fillText('★',x,y);}c.font='bold 15px sans-serif';c.fillStyle='#fff4ad';c.fillText(a.dizzyTime.toFixed(1)+'″',p.x,p.y+24);}
   else if(i>0){const label=i===1?'ΚΟΚΚΙΝΟΣ':'ΜΩΒ';const fill=i===1?'#ff886a':'#dba1ff';c.fillStyle='#112b27dd';c.strokeStyle=fill;c.lineWidth=3;c.beginPath();if(c.roundRect){c.roundRect(p.x-52,p.y-28,104,24,10);}else{c.rect(p.x-52,p.y-28,104,24);}c.fill();c.stroke();c.font='bold 15px sans-serif';c.fillStyle=fill;c.fillText(label,p.x,p.y-11);for(let j=0;j<6;j++){c.beginPath();c.arc(p.x+(j-2.5)*9,p.y+6,3.8,0,Math.PI*2);c.fillStyle=j<a.dizzy?'#ffe16a':'#214036bb';c.fill();}}
  });
  this.fx=this.fx.filter(f=>this.elapsed-f.start<f.life);for(const f of this.fx){const t=(this.elapsed-f.start)/f.life,p=this.project(f.x,this.ground(f.x,f.z)+2+t*2,f.z);c.globalAlpha=1-t;c.font=`900 ${f.text==='ΝΟΚ ΑΟΥΤ!'?32:22}px sans-serif`;c.strokeStyle='#244136';c.lineWidth=6;c.strokeText(f.text,p.x,p.y);c.fillStyle=f.color;c.fillText(f.text,p.x,p.y);}c.globalAlpha=1;
 }
 frame(now){
  const dt=Math.min(.05,Math.max(0,(now-this.last)/1000));this.last=now;
  if(this.running){this.elapsed+=dt;this.accumulator+=dt;while(this.accumulator>=1/60){step(this.state,this.currentInput(),1/60);this.consumeEvents();this.accumulator-=1/60;if(this.state.status!=='playing'){this.finish();break;}}this.saveClock+=dt;if(this.saveClock>3){this.saveClock=0;this.persist();}}
  else if(this.mode==='result'||this.mode==='finishing')this.elapsed+=dt;
  if(this.mode==='finishing'&&this.elapsed>=this.resultAt)this.showResult();
  const p=this.state.actors[0],pose=cameraPose(p,this.ground(p.x,p.z),this.w/this.h,this.viewMode),lookPoint=new V(...pose.look),camPoint=new V(...pose.position);
  if(!this.cameraReady){this.focus.copy(lookPoint);this.cameraTarget.copy(camPoint);this.cameraReady=true;}else{this.focus.lerp(lookPoint,1-Math.exp(-dt*8));this.cameraTarget.lerp(camPoint,1-Math.exp(-dt*8));}
  this.shake*=Math.exp(-dt*15);const shake=this.running?this.shake:0;this.camera.position.copy(this.cameraTarget);this.camera.position.x+=(Math.random()-.5)*shake;this.camera.lookAt(this.focus);this.camera.updateMatrixWorld();
  if(this.running||this.mode==='title'||this.mode==='result'||this.mode==='finishing'){const animationDt=this.mode==='title'?0:dt;this.renderActors(animationDt);this.renderFlies();this.world.update(this.running?dt:0,this.elapsed,1,new V(p.x,this.ground(p.x,p.z),p.z));}
  if(this.running||this.mode==='finishing'||this.mode==='result'){this.particles=this.particles.filter(p=>{if(this.elapsed-p.start>.55){p.mesh.removeFromParent();return false;}p.v.y-=dt*16;p.mesh.position.addScaledVector(p.v,dt);return true;});}
  this.renderer.render(this.scene,this.camera);this.drawLabels();this.updateHUD();
 }
 inspect(){return {version:ARCADE_VERSION,viewMode:this.viewMode,phase:this.state.phase,intro:this.state.intro,mode:this.mode,status:this.state.status,ammo:this.state.actors[0].ammo,fillPercent:Math.round(this.state.actors[0].ammo/RULES.capacity*100),actors:this.state.actors.map(a=>({id:a.id,x:a.x,z:a.z,ammo:a.ammo,dizzy:a.dizzy,dizzyTime:a.dizzyTime,ko:a.ko})),touch:this.touch,bullets:this.state.bullets.length,splats:this.splats.length,legacySavePreserved:true};}
}

import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { createWorld } from './world.js';
import { createCreature } from './creatures.js';
import { GameUI } from './ui.js';
import { GameAudio } from './audio.js';
import { GameInput } from './input.js';
import { GameVFX } from './effects.js';
import { updateGameCamera, cycleGameView } from './camera.js';
import { updatePredators, damagePredator, releaseGrab, predatorObjective } from './predators.js';
import {SAVE_KEY,SAVE_VERSION,COLORS,ROLE_NAMES,PREDATORS,BUILDINGS,clamp,canAfford,spend,nextLevelXP,awardXP,promoteCost,canPromote,promote,persuasionChance,attackDamage,eat,isVictory,gangCapacity,dayState,mulberry32,validateSave} from './rules.js';

const V=THREE.Vector3,TAU=Math.PI*2;
const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const angleLerp=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*Math.min(1,t);
const names=['Σπίθα','Βρύο','Κρόκος','Σκιά','Νούφαρο','Σάλτος','Ρίζα','Σμάραγδος','Βότσαλο','Κάλαμος','Ρόζος','Σβούρα','Αστραπή','Λωτός','Νέφος','Σφύριγμα'];
const roles=['scout','hunter','bruiser','caller'];
const serialFields=['id','name','team','role','tier','level','hp','maxHp','stomach','maxStomach','xp','x','z','yaw','morale','home','guard','leader','surrendered'];

export class FrogGame {
  constructor(){
    this.settings={quality:'high',volume:.55,sensitivity:1};
    try{Object.assign(this.settings,JSON.parse(localStorage.getItem('frog-settings')||'{}'));}catch{}
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#aacbd0');this.scene.fog=new THREE.FogExp2('#98b9ba',.0065);
    this.renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',alpha:false});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.renderer.setSize(innerWidth,innerHeight);this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.12;this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.renderer.domElement.id='world-canvas';this.renderer.domElement.setAttribute('aria-label','Τρισδιάστατος κόσμος Frog — Creek Dominion');document.body.prepend(this.renderer.domElement);
    this.camera=new THREE.PerspectiveCamera(59,innerWidth/innerHeight,.07,370);this.cameraYaw=.28;this.cameraPitch=.38;this.cameraDistance=8.4;this.cameraFocus=new V();this.cameraWanted=new V();
    this.sun=new THREE.DirectionalLight(0xffe7bb,3);this.sun.position.set(25,48,17);this.sun.castShadow=true;this.sun.shadow.mapSize.set(2048,2048);
    Object.assign(this.sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35,near:1,far:140});this.sun.shadow.bias=-.00025;this.sun.shadow.normalBias=.035;this.scene.add(this.sun,this.sun.target);
    this.hemi=new THREE.HemisphereLight(0xc8e4ef,0x405337,2);this.scene.add(this.hemi);this.moon=new THREE.DirectionalLight(0x91b6e8,.15);this.moon.position.set(-30,35,-20);this.scene.add(this.moon);
    this.sky=new Sky();this.sky.scale.setScalar(1000);this.sky.material.uniforms.turbidity.value=5;this.sky.material.uniforms.rayleigh.value=1.8;this.sky.material.uniforms.mieCoefficient.value=.004;this.sky.material.uniforms.mieDirectionalG.value=.8;this.sky.material.uniforms.sunPosition.value.set(25,48,17);this.scene.add(this.sky);
    const pmrem=new THREE.PMREMGenerator(this.renderer);this.environment=pmrem.fromScene(this.sky,.04,1,1500);this.scene.environment=this.environment.texture;this.scene.environmentIntensity=.55;pmrem.dispose();
    this.world=createWorld(this.scene,this.renderer,{seed:731});this.vfx=new GameVFX(this.scene);this.audio=new GameAudio();
    this.frogs=[];this.predators=[];this.camps=[];this.resources={food:22,reeds:40};this.elapsed=0;this.frameTime=0;this.idCounter=0;this.random=mulberry32(9541);
    this.started=false;this.paused=true;this.ended=false;this.won=false;this.command='follow';this.targetCommand=null;this.specialIndex=0;
    this.ui=new GameUI({onAction:(a,p)=>this.onAction(a,p),onStart:mode=>this.start(mode),onResume:()=>this.resume(),onSettings:s=>this.setSettings(s)});this.ui.setSettings(this.settings);
    this.input=new GameInput(this.renderer.domElement,a=>{if(a==='escape')this.escape();else if(this.started&&!this.paused&&!this.ui.panel&&performance.now()>(this.ignoreUnlockUntil||0))this.pause();});
    this.labels=document.createElement('canvas');this.labels.id='world-labels';Object.assign(this.labels.style,{position:'fixed',inset:'0',width:'100%',height:'100%',pointerEvents:'none',zIndex:4});document.body.append(this.labels);this.labelCtx=this.labels.getContext('2d');
    this.timers={ui:0,save:0,objective:0,raids:0,lighting:0,flyAttack:0};this.shake=0;this.hitPause=0;this.stats=this.emptyStats();this.hunt=null;
    this.resetWorld();this.saved=this.readSave();this.ui.showTitle(!!this.saved);this.applySettings();this.resize();this.makePortraits();
    addEventListener('resize',()=>this.resize());addEventListener('beforeunload',()=>this.save());document.addEventListener('visibilitychange',()=>{if(document.hidden&&this.started){this.save();this.pause();}});
    this.renderer.domElement.addEventListener('click',()=>{if(this.started&&!this.paused&&!this.ui.panel&&!this.input.pointerLocked)this.input.lock();});
    this.last=performance.now();this.fps=60;this.renderer.setAnimationLoop(now=>this.frame(now));
    window.__FROG__={version:'1.0.0',inspect:()=>this.inspect(),save:()=>this.save()};
    document.getElementById('boot')?.remove();
  }
  emptyStats(){return {flies:0,recruited:0,kills:0,predatorsKilled:0,predatorsRepelled:0,campsBuilt:0,campsCaptured:0,raidsDefended:0,losses:0};}
  resetWorld(save=null){
    for(const f of [...this.frogs,...this.predators]){this.scene.remove(f.model.group);f.model.dispose?.();}for(const c of this.camps)this.world.removeShelter(c.mesh);
    this.frogs=[];this.predators=[];this.camps=[];this.vfx.clear();this.player=null;this.elapsed=save?.elapsed||0;this.resources=save?.resources||{food:22,reeds:40};this.stats={...this.emptyStats(),...(save?.stats||{})};this.idCounter=save?.idCounter||0;this.command='follow';this.targetCommand=null;this.hunt=null;this.won=save?.won||false;this.ended=false;this.nextRaid=this.elapsed+110;this.graceUntil=this.elapsed+45;this.deathTimer=0;
    for(const h of this.world.hotspots)h.flies=h.maxFlies;
    if(save){
      this.player=this.spawnFrog({...save.player,team:'player'});for(const f of save.frogs)this.spawnFrog(f);
      for(const c of save.camps)this.addCamp(c);
      for(const h of this.world.hotspots){const s=save.hotspots?.find(x=>x.id===h.id);if(s)h.flies=clamp(s.flies,0,h.maxFlies);}
    }else{
      this.player=this.spawnFrog({id:'player',name:'Άρης',x:0,z:0,yaw:-.55,team:'player',role:'hunter',hp:120,maxHp:120,stomach:55});
      this.spawnFrog({name:'Σπίθα',x:-2,z:-2,team:'ally',role:'scout',stomach:62});this.spawnFrog({name:'Βρύο',x:1.8,z:-2.4,team:'ally',role:'bruiser',stomach:65});this.spawnFrog({name:'Κρόκος',x:3,z:-1,team:'ally',role:'caller',stomach:59});
      let enemies=this.world.campSites.filter(s=>s.team==='enemy').slice(0,5);if(enemies.length<5)enemies=this.world.campSites.filter(s=>dist(s,{x:0,z:0})>25).slice(0,5);
      enemies.forEach((site,i)=>{const c=this.addCamp({id:site.id||`enemy-camp-${i}`,x:site.x,z:site.z,name:['Οι Χάλκινοι','Οι Ριζοφύλακες','Τα Κόκκινα Καλάμια','Οι Νυχτοβάτες','Οι Βασιλιάδες του Βάλτου'][i],team:`enemy${i}`,originalEnemy:true,tier:i>2?2:1,hp:350+i*45,maxHp:350+i*45,stock:{food:30+i*12,reeds:38+i*8},buildings:{store:true,watchtower:i>1,nursery:i>2,palisade:i>2},morale:100});
        for(let j=0;j<4+(i>2?1:0);j++){const a=j/5*TAU;this.spawnFrog({x:c.x+Math.sin(a)*4,z:c.z+Math.cos(a)*4,team:c.team,home:c.id,leader:j===0,name:j===0?`Αρχηγός · ${c.name}`:names[(i*4+j)%names.length],role:roles[(i+j)%4],tier:i>2?2:1,level:1+i,guard:j<2});}});
      const spots=[{x:12,z:-7},{x:-14,z:8},{x:20,z:18},{x:-24,z:-15}];for(let i=0;i<spots.length;i++)this.spawnFrog({...spots[i],team:'neutral',role:roles[i],name:names[4+i]});
    }
    const locations=[{type:'heron',x:34,z:14},{type:'snake',x:-38,z:-22},{type:'fish',x:12,z:48}];
    for(const d of locations)this.spawnPredator(d);
    this.cameraYaw=this.player.yaw||.28;this.cameraFocus.set(this.player.x,1.1,this.player.z);this.updateCamera(1,true);
  }
  spawnFrog(data){
    const role=data.role||roles[Math.floor(this.random()*roles.length)],tier=data.tier||1;
    const f={id:data.id||`frog-${++this.idCounter}`,name:data.name||names[this.idCounter%names.length],team:data.team||'neutral',role,tier,level:data.level||1,xp:data.xp||0,hp:data.hp??(role==='bruiser'?120:95),maxHp:data.maxHp||(role==='bruiser'?120:95),stomach:data.stomach??65,maxStomach:100,x:data.x||0,z:data.z||0,y:0,yaw:data.yaw||0,vx:0,vz:0,vy:0,grounded:true,jump:0,jumpTime:0,speed:0,morale:data.morale??100,home:data.home||null,guard:!!data.guard,leader:!!data.leader,surrendered:!!data.surrendered,dead:false,attackAnim:0,attackType:'',roarAnim:0,hitAnim:0,attackCD:0,specialCD:0,invulnerable:0,stun:0,aiTime:0,brain:0,eatCD:0,intent:null,seed:this.idCounter,grabbedBy:null,thinkOffset:this.random()*5};
    const color=f.team==='player'?0x5c8f35:f.team==='ally'?0x57966b:f.team==='neutral'?0xb4a44d:0xa85a32;
    f.model=createCreature('frog',{color,team:f.team,role,tier,seed:this.idCounter});f.model.setOutline(COLORS[f.team]||COLORS.enemy,true);f.y=this.world.sampleHeight(f.x,f.z);f.model.group.position.set(f.x,f.y,f.z);f.model.group.rotation.y=f.yaw;f.model.group.userData.actor=f;this.scene.add(f.model.group);this.frogs.push(f);
    if(f.team==='player'){f.maxStamina=100;f.stamina=100;f.charge=-1;f.maxHp=data.maxHp||120;f.hp=data.hp??120;}
    return f;
  }
  spawnPredator(data){
    const def=PREDATORS[data.type],p={...def,...data,id:`predator-${data.type}`,maxHp:def.hp,hp:def.hp,team:'predator',y:0,yaw:0,phase:'patrol',phaseTime:0,attackAnim:0,hitAnim:0,dead:false,cooldown:0,target:null,targetId:null,anchor:{x:data.x,z:data.z},notice:0,rescueDamage:0,grabbed:null,fleeTime:0,respawnAt:0,grace:0};
    p.model=createCreature(data.type,{team:'predator',seed:432});p.model.group.scale.setScalar(def.scale);p.model.setOutline(COLORS.predator,true);p.y=data.type==='fish'?-.7:this.world.sampleHeight(p.x,p.z);p.model.group.position.set(p.x,p.y,p.z);this.scene.add(p.model.group);this.predators.push(p);return p;
  }
  addCamp(data){const c={tier:1,hp:350,maxHp:350,stock:{food:14,reeds:20},buildings:{},morale:100,destroyed:false,spawnTimer:0,mealCount:0,mealDay:0,...data};c.mesh=this.world.createShelter({...c,storage:c.stock});this.camps.push(c);return c;}
  allies(){return this.frogs.filter(f=>f.team==='ally'&&!f.dead);}
  ownedCamps(){return this.camps.filter(c=>c.team==='ally'&&!c.destroyed);}
  hostile(a,b){if(a.dead||b.dead||a===b||a.team==='neutral'||b.team==='neutral'||a.surrendered||b.surrendered)return false;const ta=a.team==='player'?'ally':a.team,tb=b.team==='player'?'ally':b.team;return ta!==tb;}
  start(mode){
    if(mode==='continue'&&this.saved)this.resetWorld(this.saved);else if(this.started)this.resetWorld();
    this.started=true;this.paused=false;this.ended=false;this.ui.closePanels();this.ui.showPause(false);this.audio.init?.();this.audio.start?.();this.audio.setVolume?.(this.settings.volume);this.input.clear();this.input.lock();
    this.ui.toast('WASD κίνηση · Ποντίκι στόχευση · Space άλμα · E αλληλεπίδραση','info');this.save();
  }
  pause(){if(!this.started||this.ended)return;this.paused=true;this.input.clear();this.input.unlock();this.ui.showPause(true);this.save();}
  resume(){if(!this.started)return;this.paused=false;this.ended=false;this.ui.hideMenus();this.input.clear();this.input.lock();}
  escape(){if(!this.started){if(this.ui.panel)this.ui.showTitle(!!this.saved);return;}if(this.ui.panel){if(this.ui.panel==='help'&&this.ui.returnMenu==='pause'){this.ui.closePanels();this.ui.showPause(true);this.paused=true;}else this.resume();}else if(this.paused)this.resume();else this.pause();}
  setSettings(s){Object.assign(this.settings,s);localStorage.setItem('frog-settings',JSON.stringify(this.settings));this.applySettings();}
  applySettings(){const q=this.settings.quality;this.renderer.setPixelRatio(Math.min(devicePixelRatio,q==='high'?1.5:q==='medium'?1.15:1));this.renderer.shadowMap.enabled=q!=='low';this.scene.fog.density=q==='low'?.009:.0065;this.audio?.setVolume?.(this.settings.volume);this.resize();}
  resize(){this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();this.renderer.setSize(innerWidth,innerHeight);if(this.labels){this.labels.width=innerWidth;this.labels.height=innerHeight;}}
  frame(now){
    let dt=Math.min(.05,Math.max(.001,(now-this.last)/1000));this.last=now;this.frameTime+=dt;this.fps=THREE.MathUtils.lerp(this.fps,1/dt,.03);
    if(this.input.hit('KeyC')&&this.started&&!this.ended){cycleGameView(this);this.input.pressed.delete('KeyC');}
    if(this.ui.panel&&this.started){
      if((this.ui.panel==='build'&&this.input.hit('KeyV'))||(['roster','map'].includes(this.ui.panel)&&this.input.hit('Tab'))){this.ui.closePanels();this.paused=false;this.input.pressed.delete('KeyV');this.input.pressed.delete('Tab');this.input.lock();}
      else if(this.ui.panel==='build'){for(let i=0;i<8;i++)if(this.input.hit(`Digit${i+1}`)){const b=this.buildOptions()[i];if(b?.enabled)this.build(b.type);this.input.pressed.delete(`Digit${i+1}`);}}
    }
    if(this.started&&!this.paused&&!this.ended&&!this.ui.isBlocking?.()){
      if(this.hitPause>0){this.hitPause-=dt;dt*=.17;}
      this.elapsed+=dt;this.updatePlayer(dt);this.updateFrogs(dt);this.updatePredators(dt);this.updateEconomy(dt);this.checkVictory();
    }
    const day=dayState(this.elapsed);this.updateLighting(day);this.world.update(dt,this.elapsed+this.frameTime*.025,day.daylight,new V(this.player.x,this.player.y,this.player.z));this.vfx.update(dt);
    this.updateModels(dt);this.updateCamera(dt);this.drawLabels();this.timers.ui+=dt;if(this.timers.ui>.1){this.updateUI(day);this.timers.ui=0;}
    if(this.started&&!this.paused){this.timers.save+=dt;if(this.timers.save>20){this.save();this.timers.save=0;}}
    this.audio.update?.(dt,{night:day.night,water:!!this.player.swimming,hunt:!!this.hunt,paused:this.paused||this.ui.isBlocking()});this.renderer.render(this.scene,this.camera);this.input.endFrame();
  }
  updateLighting(day){
    const a=day.phase*TAU-Math.PI/2,d=day.daylight;
    this.sun.position.set(this.player.x+Math.cos(a)*35,this.player.y+Math.max(8,Math.sin(a)*45+12),this.player.z+25);this.sun.target.position.set(this.player.x,0,this.player.z);this.sun.intensity=.1+d*3;this.hemi.intensity=.5+d*1.3;this.moon.intensity=.65*(1-d);this.scene.environmentIntensity=.12+d*.48;
    this.sun.color.setHSL(.1,.3+.3*(1-d),.82);this.hemi.color.setRGB(.38+d*.39,.5+d*.37,.69+d*.25);this.scene.fog.color.setRGB(.04+d*.52,.095+d*.58,.16+d*.56);this.scene.background.copy(this.scene.fog.color);
    this.sky.material.uniforms.sunPosition.value.set(Math.cos(a)*80,Math.max(-6,Math.sin(a)*70+10),40);this.sky.material.uniforms.rayleigh.value=1.5+2*(1-d);this.sky.visible=d>.05;this.renderer.toneMappingExposure=.88+d*.18;
  }
  updateCamera(dt,snap=false){
    updateGameCamera(this,dt,snap);
  }
  updatePlayer(dt){
    const p=this.player;if(p.dead){this.deathTimer+=dt;if(this.deathTimer>3)this.respawn();return;}
    for(const k of ['attackCD','specialCD','invulnerable','stun','eatCD','roarCD','dodgeCD'])p[k]=Math.max(0,(p[k]||0)-dt);
    if(p.grabbedBy){if(this.input.hit('KeyQ')||this.input.hit('Space')||this.input.hit('KeyR')){p.grabbedBy.rescueDamage+=13;this.audio.play?.('hit');}return;}
    const ix=(this.input.down('KeyD')?1:0)-(this.input.down('KeyA')?1:0),iz=(this.input.down('KeyW')?1:0)-(this.input.down('KeyS')?1:0),len=Math.hypot(ix,iz);
    const sprint=this.input.down('ShiftLeft')&&p.stamina>8&&len>0,blocking=this.input.right&&p.stamina>2;p.blocking=blocking;
    let speed=(sprint?6.6:4.25)*(p.stomach<10?.78:1)*(p.swimming?.72:1)*(blocking?.55:1)*(p.stun>0?.1:1);
    const moveYaw=this.viewMode==='topdown'?0:this.cameraYaw;
    const mx=len?(Math.sin(moveYaw)*iz-Math.cos(moveYaw)*ix)/len:0,mz=len?(Math.cos(moveYaw)*iz+Math.sin(moveYaw)*ix)/len:0;
    p.vx=THREE.MathUtils.damp(p.vx,mx*speed,12,dt);p.vz=THREE.MathUtils.damp(p.vz,mz*speed,12,dt);
    if(len)p.yaw=angleLerp(p.yaw,Math.atan2(mx,mz),dt*14);if(blocking||this.input.left||this.viewMode==='first'||this.viewMode==='topdown')p.yaw=angleLerp(p.yaw,this.aimYaw??this.cameraYaw,dt*14);
    if(this.input.hit('Space')&&p.grounded&&p.stamina>12)p.charge=0;
    if(p.charge>=0&&this.input.down('Space'))p.charge=Math.min(.65,p.charge+dt);
    if(this.input.up('Space')&&p.charge>=0){this.jump(p,8+p.charge*4);p.stamina-=12+p.charge*8;p.charge=-1;}
    if(this.input.hit('KeyZ')&&p.dodgeCD===0&&p.stamina>=22){p.stamina-=22;p.dodgeCD=1.5;p.invulnerable=.42;p.vx=(mx||Math.sin(this.cameraYaw))*11;p.vz=(mz||Math.cos(this.cameraYaw))*11;this.jump(p,4.5);this.audio.play?.('jump');}
    this.moveActor(p,dt);p.stamina=clamp(p.stamina+dt*(sprint?-12:blocking?-3.5:15),0,100);p.stomach=clamp(p.stomach-dt*(sprint?.14:.085),0,100);
    if(p.stomach<=0&&this.elapsed%2<dt)this.damage(p,2,null);this.aimTarget=this.findAim();
    if((this.input.left||this.input.hit('MouseLeft'))&&p.attackCD<=0)this.primaryAttack();
    if(this.input.hit('KeyQ'))this.special(p);if(this.input.hit('KeyR'))this.intimidate(p);if(this.input.hit('KeyE'))this.interact();
    if(this.input.hit('KeyF'))this.gangCommand(this.command==='attack'?'follow':'attack');
    if(this.input.hit('KeyX'))this.gangCommand(this.command==='guard'?'follow':'guard');
    if(this.input.hit('KeyV'))this.openPanel('build');if(this.input.hit('Tab'))this.openPanel('roster');
    if(this.input.hit('KeyG'))this.consume();for(let i=0;i<3;i++)if(this.input.hit(`Digit${i+1}`)){this.specialIndex=i;this.ui.toast(`Ειδική κίνηση: ${['Εναέρια κλωτσιά','Βαριά προσγείωση','Χτύπημα γλώσσας'][i]}`);}
  }
  jump(f,strength=7){if(!f.grounded&&!f.swimming)return;f.vy=strength;f.grounded=false;f.jumpTime=.8;this.world.splash(new V(f.x,Math.max(0,f.y),f.z),.4);if(f===this.player)this.audio.play?.('jump');}
  moveActor(f,dt){
    let nx=clamp(f.x+f.vx*dt,-107,107),nz=clamp(f.z+f.vz*dt,-107,107),surface=this.world.getSurface(nx,nz),height=surface.height;
    if(height>f.y+.65&&f.grounded){nx=f.x;nz=f.z;surface=this.world.getSurface(nx,nz);height=surface.height;if(f!==this.player)this.jump(f,7.5);}
    f.x=nx;f.z=nz;f.speed=Math.hypot(f.vx,f.vz);f.swimming=surface.type==='water';
    if(!f.grounded){f.vy-=20*dt;f.y+=f.vy*dt;if(f.y<=height&&f.vy<=0){const force=Math.abs(f.vy);f.y=height;f.vy=0;f.grounded=true;f.jumpTime=0;if(f.swimming||surface.type==='lily')this.world.splash(new V(f.x,0,f.z),Math.min(1.2,force*.12));if(f===this.player&&force>5)this.audio.play?.('land');}}
    else if(f.y>height+.2){f.grounded=false;f.vy=0;}else{f.y=height+(f.swimming?Math.sin(this.elapsed*4+f.seed)*.025:0);}
    f.jump=f.grounded?0:clamp(f.vy/10,-1,1);if(f.swimming&&f.speed>1&&Math.random()<dt*3)this.world.splash(new V(f.x,0,f.z),.12);
  }
  findAim(){
    const p=this.player,projected=new V();let best=null,bestScore=1;const ax=this.viewMode==='topdown'?(this.input.ndc?.x||0):0,ay=this.viewMode==='topdown'?(this.input.ndc?.y||0):0;
    for(const f of [...this.frogs,...this.predators]){if(f===p||f.dead||f.phase==='dormant'||dist(f,p)>19)continue;projected.set(f.x,f.y+(f.type==='heron'?2:.7),f.z).project(this.camera);if(projected.z>1||projected.z<-1)continue;const d=Math.hypot(projected.x-ax,projected.y-ay);if(d<.28&&d<bestScore){bestScore=d;best={kind:'actor',entity:f};}}
    if(best)return best;
    for(const h of this.world.hotspots){if(h.flies<1||dist(h,p)>10)continue;projected.set(h.x,1.4,h.z).project(this.camera);const d=Math.hypot(projected.x-ax,projected.y-ay);if(d<.42&&d<bestScore){bestScore=d;best={kind:'flies',entity:h};}}
    return best;
  }
  gainXP(amount){const levelled=awardXP(this.player,amount);if(levelled){this.ui.toast(`Επίπεδο ${this.player.level} — περισσότερη ζωή!`,'success');this.audio.play?.('levelup');}for(const f of this.allies())if(dist(f,this.player)<24)awardXP(f,amount*.45);}
  power(team='ally'){return this.frogs.filter(f=>!f.dead&&!f.surrendered&&(team==='ally'?['ally','player'].includes(f.team):f.team===team)).reduce((n,f)=>n+(f.tier+.15*f.level)*(.35+.65*f.hp/f.maxHp),0);}
  damage(target,amount,source,options={}){
    if(!target||target.dead)return;if(target.team==='predator'){damagePredator(this,target,amount,source);return;}
    // An order can outlive a surrender or a change of allegiance. Validate the
    // current factions at the actual hit, not just when the order was issued.
    if(!options.bypass&&source&&source!==target&&source.team!=='predator'&&!this.hostile(source,target))return;
    if(target.surrendered&&source?.team!=='predator'&&!options.eaten&&!options.bypass)return;
    if(target.invulnerable>0&&!options.bypass)return;
    let actual=amount;if(target===this.player&&target.blocking&&target.stamina>5){actual*=.35;target.stamina=Math.max(0,target.stamina-amount*.5);this.audio.play?.('block');}
    const camp=this.camps.find(c=>c.id===target.home);if(target.guard&&camp?.buildings.watchtower)actual*=.82;
    target.hp=Math.max(0,target.hp-actual);target.hitAnim=.34;target.invulnerable=target===this.player?.38:.1;target.stun=target===this.player?.12:.18;target.morale=Math.max(0,target.morale-actual*.48);
    if(source&&source!==target){const d=Math.max(.5,dist(target,source));target.vx+=(target.x-source.x)/d*2.5;target.vz+=(target.z-source.z)/d*2.5;}
    this.world.impact(new V(target.x,target.y+.5,target.z),target.team==='ally'?0x91ebbf:0xf0c376,.55);if(dist(target,this.player)<20){this.vfx.number(new V(target.x,target.y,target.z),Math.ceil(actual),target===this.player?'#ffac98':'#f6e6b2');this.audio.play?.('hit');}if(target===this.player)this.shake=.7;
    if(target.hp<=0){
      if(target.team.startsWith('enemy')&&source?.team!=='predator'&&!options.eaten){
        target.hp=target.maxHp*.15;target.surrendered=true;target.morale=0;target.guard=false;target.surrenderTimer=80;target.model.setOutline(COLORS.surrender,true);
        if(this.targetCommand===target){this.targetCommand=null;if(this.command==='attack')this.command='follow';}
        for(const f of this.frogs)if(f.intent?.target===target){f.intent=null;f.brain=0;}
        if(source?.team==='player'||source?.team==='ally'){this.stats.kills++;this.gainXP(24);this.resources.reeds+=5;this.ui.toast(`${target.name} παραδόθηκε. E για στρατολόγηση.`,'success');}
        return;
      }
      target.dead=true;target.deadTime=0;target.model.setOutline(COLORS.enemy,false);if(target===this.player){this.deathTimer=0;this.ui.toast('Έπεσες στη μάχη…','danger');this.input.clear();}else{if(target.team==='ally'){this.stats.losses++;this.ui.toast(`Χάθηκε ο ${target.name}.`,'danger');}else{this.stats.kills++;if(source?.team==='player'||source?.team==='ally'){this.gainXP(22);this.resources.food+=4;this.resources.reeds+=6;}}}
    }
  }
  primaryAttack(){
    const p=this.player;if(p.stamina<3)return;p.attackCD=.43;p.attackAnim=.34;p.attackDuration=.34;p.attackType='tongue';this.audio.play?.('tongue');
    const t=this.aimTarget;const aim=this.aimYaw??this.cameraYaw;let end=new V(p.x+Math.sin(aim)*7,p.y+.7,p.z+Math.cos(aim)*7);
    if(t?.kind==='actor'&&dist(t.entity,p)<10){const f=t.entity;if(this.hostile(p,f)||f.team==='predator'){end.set(f.x,f.y+(f.type==='heron'?1.6:.55),f.z);this.damage(f,attackDamage(14,p.tier,p.level),p);p.stamina=Math.max(0,p.stamina-5);this.hitPause=.035;}}
    else if(t?.kind==='flies'){
      const h=t.entity;if(p.stomach>94){this.ui.toast('Το στομάχι σου γέμισε. Μάζεψε αποθέματα με E ή οργάνωσε καταφύγιο με V.','food');p.attackCD=1;}
      else if(h.flies>=1){h.flies=Math.max(0,h.flies-1);eat(p,10);this.resources.food+=2;this.stats.flies++;this.gainXP(4);end.set(h.x+(Math.random()-.5),1.3+Math.random(),h.z+(Math.random()-.5));this.audio.play?.('eat');this.vfx.number(new V(p.x,p.y,p.z),'+10','#bceaa0');}
    }else{
      const enemy=this.frogs.find(f=>this.hostile(p,f)&&dist(f,p)<3.2&&Math.cos(Math.atan2(f.x-p.x,f.z-p.z)-aim)>.3);
      if(enemy){end.set(enemy.x,enemy.y+.6,enemy.z);this.damage(enemy,attackDamage(14,p.tier,p.level),p);}
      else{const c=this.camps.find(c=>c.team.startsWith('enemy')&&!c.destroyed&&dist(c,p)<7&&Math.cos(Math.atan2(c.x-p.x,c.z-p.z)-aim)>.3);if(c){end.set(c.x,this.world.sampleHeight(c.x,c.z)+1,c.z);this.damageCamp(c,16,p);p.stamina=Math.max(0,p.stamina-3);}}
    }
    this.vfx.tongue(p,end);
  }
  special(f){
    if(f.specialCD>0||f.dead||f.grabbedBy)return;if(f===this.player&&f.stamina<23){this.ui.toast('Χρειάζεσαι περισσότερη αντοχή.','warning');return;}
    const type=f===this.player?['kick','slam','tongue'][this.specialIndex]:f.role==='bruiser'?'slam':f.role==='hunter'?'tongue':'kick';
    f.specialCD=type==='slam'?5.2:4;f.attackAnim=.65;f.attackDuration=.65;f.attackType=type;if(f===this.player)f.stamina-=23;
    const aim=f===this.player?(this.aimYaw??this.cameraYaw):f.yaw;f.yaw=aim;const radius=type==='tongue'?8:type==='slam'?4.6:3.8;
    if(type==='kick'){this.jump(f,5.3);f.vx=Math.sin(aim)*8;f.vz=Math.cos(aim)*8;}
    this.audio.play?.(type==='slam'?'slam':'hit');this.world.splash(new V(f.x,Math.max(0,f.y),f.z),type==='slam'?2:1);this.vfx.cue(new V(f.x,f.y+.05,f.z),radius,type==='slam'?.6:.25,type==='slam'?0xb7e2cb:0xe9dc9b);
    for(const target of [...this.frogs,...this.predators]){if(target===f||target.dead||(!this.hostile(f,target)&&target.team!=='predator')||dist(f,target)>radius)continue;const facing=Math.cos(Math.atan2(target.x-f.x,target.z-f.z)-aim);if(type!=='slam'&&facing<-.1)continue;this.damage(target,attackDamage(type==='kick'?43:type==='slam'?33:29,f.tier,f.level),f);}
    for(const c of this.camps)if(!c.destroyed&&c.team!==f.team&&c.team!=='ally'&&dist(f,c)<radius+2)this.damageCamp(c,type==='slam'?38:26,f);
    if(f===this.player){this.shake=.4;this.hitPause=.065;}
  }
  intimidate(f){
    if(f.roarCD>0||f.dead)return;if(f===this.player&&f.stamina<18)return;f.roarCD=8;f.roarAnim=1.25;if(f===this.player)f.stamina-=18;this.audio.play?.('croak');this.vfx.cue(new V(f.x,Math.max(.1,f.y),f.z),8,1.1,0xe6e9a7);
    const strength=28+f.tier*7;
    for(const enemy of this.frogs){if(!this.hostile(f,enemy)||dist(f,enemy)>9)continue;enemy.morale=Math.max(0,enemy.morale-strength);enemy.fear=4+f.tier;enemy.fearFrom={x:f.x,z:f.z};if(enemy.hp<enemy.maxHp*.42&&enemy.morale<20){enemy.surrendered=true;enemy.guard=false;enemy.model.setOutline(COLORS.surrender,true);}}
    for(const p of this.predators)if(!p.dead&&dist(f,p)<10&&p.phase!=='patrol'){p.rescueDamage+=20;damagePredator(this,p,6+f.tier*3,f);}
    if(f===this.player)this.ui.toast('Το κόασμά σου τρομάζει τους κοντινούς αντιπάλους.');
  }
  context(){
    const p=this.player,near=this.frogs.filter(f=>f!==p&&!f.dead&&dist(f,p)<4.5).sort((a,b)=>dist(a,p)-dist(b,p));
    const recruit=near.find(f=>f.team==='neutral'||f.surrendered);if(recruit)return {type:'recruit',entity:recruit,hint:`E · Στρατολόγηση ${recruit.name} · 6 τροφή`};
    const c=this.camps.filter(c=>dist(c,p)<7.5).sort((a,b)=>dist(a,p)-dist(b,p))[0];
    if(c){if(c.destroyed)return {type:'loot',entity:c,hint:c.lootTaken?'V · Ξαναχτίσε αυτό το καταφύγιο':'E · Λεηλασία αποθεμάτων'};if(c.team.startsWith('enemy'))return {type:'persuade-camp',entity:c,hint:'E · Πείσε τη συμμορία · LMB / Q · Επίθεση στη βάση'};if(c.team==='ally')return {type:'home',entity:c,hint:'V · Κτίρια / επισκευή · G · Φαγητό · X · Φρουρά'};}
    const h=this.world.hotspots.filter(h=>dist(h,p)<5).sort((a,b)=>dist(a,p)-dist(b,p))[0];if(h)return {type:'gather',entity:h,hint:'LMB · Φάε μύγες · E · Συλλογή τροφής και καλαμιών'};
    const ally=near.find(f=>f.team==='ally');if(ally)return {type:'ally',entity:ally,hint:`E · ${ally.guard?'Κάλεσε πίσω':'Όρισε φρουρό'} τον ${ally.name} · Tab · Συμμορία`};
    if(this.world.getSurface(p.x,p.z).type==='land')return {type:'reeds',hint:'E · Συλλογή καλαμιών · V · Νέο καταφύγιο'};
    return {type:'none',hint:'C · Κάμερα · LMB · Γλώσσα · Space · Άλμα · Q · Ειδική επίθεση'};
  }
  interact(){
    const ctx=this.context(),p=this.player;
    if(ctx.type==='recruit')return this.recruit(ctx.entity);
    if(ctx.type==='loot'){const c=ctx.entity;if(c.lootTaken){this.openPanel('build');return;}this.resources.food+=Math.round(c.stock.food);this.resources.reeds+=Math.round(c.stock.reeds);c.stock={food:0,reeds:0};c.lootTaken=true;this.world.updateShelter(c.mesh,{...c,storage:c.stock});this.gainXP(35);this.ui.toast('Τα αποθέματα της βάσης πέρασαν στη συμμορία σου.','success');this.audio.play?.('eat');return;}
    if(ctx.type==='persuade-camp')return this.persuadeCamp(ctx.entity);
    if(ctx.type==='home'){this.openPanel('build');return;}
    if(ctx.type==='ally'){this.frogCommand(ctx.entity.id,ctx.entity.guard?'follow':'guard');return;}
    if((ctx.type==='gather'||ctx.type==='reeds')&&p.eatCD<=0){
      p.eatCD=4;let food=0,reeds=3;if(ctx.entity){const count=Math.min(ctx.entity.flies,8);ctx.entity.flies-=count;food=Math.floor(count*.65);reeds=ctx.entity.rich?6:3;}
      this.resources.food+=food;this.resources.reeds+=reeds;this.ui.toast(`Συλλογή: +${food} τροφή · +${reeds} καλάμια`,'food');this.audio.play?.('eat');this.vfx.number(new V(p.x,p.y,p.z),`+${reeds}`,'#dfd3a6');return;
    }
    if(ctx.type==='none')this.ui.toast('Πλησίασε βάτραχο, σμήνος, όχθη ή καταφύγιο για αλληλεπίδραση.');
  }
  recruit(f){
    if(this.allies().length>=gangCapacity(this.camps)){this.ui.toast('Χρειάζεσαι περισσότερα ή μεγαλύτερα καταφύγια για νέους συμμάχους.','warning');return;}
    if(!canAfford(this.resources,{food:6})){this.ui.toast('Χρειάζονται 6 τροφή για στρατολόγηση.','warning');return;}
    if((f.persuadeCD||0)>this.elapsed){this.ui.toast('Δώσε του λίγο χρόνο πριν προσπαθήσεις ξανά.');return;}
    const oldteam=f.team,camp=this.camps.find(c=>c.id===f.home),chance=persuasionChance({allyPower:this.power(),enemyPower:this.power(f.team),hp:f.hp,maxHp:f.maxHp,morale:f.morale,campDestroyed:!!camp?.destroyed,neutral:f.team==='neutral'});
    f.persuadeCD=this.elapsed+8;if(Math.random()>chance){this.resources.food-=2;this.ui.toast(`${f.name}: αρνήθηκε. Αποδυνάμωσε τη βάση ή δείξε μεγαλύτερη ισχύ.`,'warning');return;}
    spend(this.resources,{food:6});f.team='ally';f.surrendered=false;f.morale=100;f.fear=0;f.guard=false;f.home=this.ownedCamps()[0]?.id||null;f.hp=Math.max(f.hp,f.maxHp*.5);f.intent=null;f.brain=0;f.raidTarget=null;f.model.setOutline(COLORS.ally,true);this.stats.recruited++;this.gainXP(20);this.audio.play?.('recruit');this.ui.toast(`${f.name} εντάχθηκε στη συμμορία σου!`,'success');
    if(this.targetCommand===f){this.targetCommand=null;if(this.command==='attack')this.command='follow';}
    for(const actor of this.frogs)if(actor.intent?.target===f){actor.intent=null;actor.brain=0;}
    if(f.leader&&camp&&!camp.destroyed&&camp.hp/camp.maxHp<.5)this.captureCamp(camp);
  }
  persuadeCamp(c){
    if((c.persuadeCD||0)>this.elapsed){this.ui.toast('Η συμμορία δεν θέλει ακόμη να διαπραγματευτεί.');return;}
    const ratio=this.power()/Math.max(.5,this.power(c.team)),weakness=1-c.hp/c.maxHp;
    if(ratio<1.35&&weakness<.5){this.ui.toast('Η αντίπαλη συμμορία αντιστέκεται. Χτύπησε τη βάση ή αύξησε τη δύναμή σου.','warning');return;}
    if(!canAfford(this.resources,{food:12})){this.ui.toast('Χρειάζεσαι 12 τροφή για προσφορά συμμαχίας.','warning');return;}
    c.persuadeCD=this.elapsed+15;const chance=clamp(.15+ratio*.2+weakness*.5+(100-c.morale)*.002,.1,.97);
    if(Math.random()<chance){spend(this.resources,{food:12});this.captureCamp(c);}else{this.ui.toast('Η συμμαχία απορρίφθηκε. Η φθορά της βάσης αυξάνει τις πιθανότητες.','warning');c.morale=Math.max(0,c.morale-12);}
  }
  captureCamp(c){
    if(!c||c.team==='ally')return;
    const old=c.team;c.team='ally';c.destroyed=false;c.hp=Math.max(c.hp,c.maxHp*.5);c.morale=100;this.stats.campsCaptured++;this.resources.food+=Math.round(c.stock.food*.5);this.resources.reeds+=Math.round(c.stock.reeds*.5);c.stock={food:15,reeds:20};
    for(const f of this.frogs)if(f.team===old&&!f.dead){f.team='ally';f.surrendered=false;f.morale=100;f.home=c.id;f.guard=true;f.raidTarget=null;f.intent=null;f.brain=0;f.model.setOutline(COLORS.ally,true);this.stats.recruited++;}
    if(this.targetCommand===c||(this.targetCommand?.model&&this.targetCommand.team==='ally')){this.targetCommand=null;if(this.command==='attack')this.command='follow';}
    for(const f of this.frogs)if(f.intent?.target===c||(f.intent?.kind==='attack'&&f.intent.target?.team!=='predator'&&!this.hostile(f,f.intent.target))){f.intent=null;f.brain=0;}
    this.world.updateShelter(c.mesh,{...c,storage:c.stock});this.gainXP(100);this.audio.play?.('recruit');this.ui.toast(`${c.name}: η βάση και οι βάτραχοί της ενώθηκαν μαζί σου!`,'success');this.save();
  }
  damageCamp(c,amount,source){
    if(!c||c.destroyed)return;
    if(source&&(source.dead||source.surrendered||(source.team==='player'?'ally':source.team)===(c.team==='player'?'ally':c.team)))return;
    c.hp=Math.max(0,c.hp-amount);c.morale=Math.max(0,c.morale-amount*.14);this.world.impact(new V(c.x,this.world.sampleHeight(c.x,c.z)+1,c.z),0xd2bb8a,.6);
    if(this.elapsed-(c.visualUpdate||0)>.4||c.hp===0){c.visualUpdate=this.elapsed;this.world.updateShelter(c.mesh,{...c,storage:c.stock});}
    if(c.hp<=0){c.destroyed=true;this.world.updateShelter(c.mesh,{...c,storage:c.stock});this.audio.play?.('slam');if(c.team.startsWith('enemy')){if(source?.team==='player'||source?.team==='ally')this.gainXP(120);this.ui.toast(`Καταστράφηκε το ${c.name}. E για λάφυρα — οι υπερασπιστές μπορούν να στρατολογηθούν.`,'success');for(const f of this.frogs)if(f.home===c.id&&!f.dead){f.morale=0;f.guard=false;f.surrendered=true;f.intent=null;f.brain=0;f.model.setOutline(COLORS.surrender,true);}}else{this.ui.toast(`Το καταφύγιο ${c.name} έπεσε! Ξαναχτίζεται με V.`,'danger');}
      if(this.targetCommand===c||(this.targetCommand?.model&&this.targetCommand.surrendered)){this.targetCommand=null;if(this.command==='attack')this.command='follow';}
      for(const f of this.frogs)if(f.intent?.target===c||(f.intent?.kind==='attack'&&f.intent.target?.surrendered)){f.intent=null;f.brain=0;}
      this.save();
    }
  }
  updateFrogs(dt){
    const p=this.player,allies=this.allies();
    for(const f of this.frogs){if(f===p)continue;if(f.dead){f.deadTime=(f.deadTime||0)+dt;continue;}for(const key of ['attackCD','specialCD','roarCD','invulnerable','stun','eatCD','fear'])f[key]=Math.max(0,(f[key]||0)-dt);f.stomach=clamp(f.stomach-dt*.055,0,100);if(f.grabbedBy)continue;
      if(f.surrendered){f.vx=THREE.MathUtils.damp(f.vx,0,8,dt);f.vz=THREE.MathUtils.damp(f.vz,0,8,dt);this.moveActor(f,dt);continue;}
      f.brain-=dt;if(f.brain<=0){f.brain=dist(f,p)>65?.65:.2;f.intent=this.thinkFrog(f,allies);}
      const intent=f.intent;if(!intent){f.vx=0;f.vz=0;this.moveActor(f,dt);continue;}
      const attackInvalid=intent.kind==='attack'&&(!intent.target||intent.target.dead||intent.target.surrendered||intent.target.phase==='dormant'||(intent.target.team!=='predator'&&!this.hostile(f,intent.target)));
      const campInvalid=intent.kind==='camp-attack'&&(!intent.target||intent.target.destroyed||intent.target.team==='neutral'||(f.team==='player'?'ally':f.team)===(intent.target.team==='player'?'ally':intent.target.team));
      if(attackInvalid||campInvalid){f.intent=null;f.brain=0;f.vx=0;f.vz=0;this.moveActor(f,dt);continue;}
      const target=intent.target,d=dist(f,target);let speed=(f.role==='scout'?4.6:3.7)*(f.stomach<10?.75:1);
      const stop=intent.kind==='attack'?(target.team==='predator'?2.8:f.role==='hunter'?5:1.6):intent.kind==='camp-attack'?4.5:intent.kind==='eat'?2:1.3;
      if(d>stop){const dx=(target.x-f.x)/Math.max(d,.01),dz=(target.z-f.z)/Math.max(d,.01);let sx=0,sz=0;for(const other of this.frogs){if(other===f||other.dead)continue;const dd=dist(f,other);if(dd<1.15&&dd>.01){sx+=(f.x-other.x)/dd*(1.15-dd);sz+=(f.z-other.z)/dd*(1.15-dd);}}f.vx=dx*speed+sx*2;f.vz=dz*speed+sz*2;f.yaw=angleLerp(f.yaw,Math.atan2(f.vx,f.vz),dt*10);
        if(f.grounded&&!f.swimming&&d>3&&((this.elapsed+f.thinkOffset)%1.5)<dt)this.jump(f,6.4);
      }else{f.vx=THREE.MathUtils.damp(f.vx,0,10,dt);f.vz=THREE.MathUtils.damp(f.vz,0,10,dt);if(d>.1)f.yaw=angleLerp(f.yaw,Math.atan2(target.x-f.x,target.z-f.z),dt*10);
        if(intent.kind==='attack'&&!target.dead&&f.attackCD<=0){f.attackCD=1.15+this.random()*.35;f.attackAnim=.4;f.attackDuration=.4;f.attackType=f.role==='hunter'?'tongue':'kick';this.damage(target,attackDamage(f.role==='bruiser'?14:10,f.tier,f.level),f);if(f.role==='hunter')this.vfx.tongue(f,new V(target.x,target.y+.6,target.z));if(f.specialCD<=0){if(f.role==='caller')this.intimidate(f);else if(d<4)this.special(f);}}
        if(intent.kind==='camp-attack'&&f.attackCD<=0&&!target.destroyed){f.attackCD=1.4;f.attackAnim=.4;f.attackDuration=.4;f.attackType='kick';this.damageCamp(target,attackDamage(10,f.tier,f.level),f);if(f.raidTarget&&target.team==='ally'&&!this.frogs.some(g=>g.team==='ally'&&g.guard&&g.home===target.id&&!g.dead&&dist(g,target)<10)){const food=Math.min(3,this.resources.food,target.stock.food);this.resources.food-=food;target.stock.food-=food;f.loot=(f.loot||0)+food;if(f.loot>=9){f.raidTarget=null;f.intent=null;this.ui.toast('Επιδρομείς έκλεψαν τρόφιμα από αφύλακτη βάση!','danger');}}}
        if(intent.kind==='eat'&&f.eatCD<=0&&target.flies>=1){target.flies--;eat(f,15);f.eatCD=2.5;f.attackAnim=.3;f.attackDuration=.3;f.attackType='tongue';if(dist(f,p)<30)this.vfx.tongue(f,new V(target.x,1.5,target.z));if(f.team==='ally'){this.resources.food++;awardXP(f,3);}}
      }
      if(f.stun>0){f.vx*=.2;f.vz*=.2;}this.moveActor(f,dt);
    }
  }
  thinkFrog(f,allies){
    if(f.fear>0&&f.fearFrom){const a=Math.atan2(f.x-f.fearFrom.x,f.z-f.fearFrom.z);return {kind:'move',target:{x:f.x+Math.sin(a)*9,z:f.z+Math.cos(a)*9}};}
    const own=f.team==='ally',home=this.camps.find(c=>c.id===f.home&&!c.destroyed);
    if(f.team==='neutral')return {kind:'move',target:{x:f.x+Math.sin(this.elapsed*.15+f.seed)*.2,z:f.z+Math.cos(this.elapsed*.15+f.seed)*.2}};
    const nearPred=this.predators.filter(pr=>!pr.dead&&!['patrol','dormant','flee','dead'].includes(pr.phase)&&dist(pr,f)<(own?16:10)&&(!pr.target||pr.target.team===f.team||pr.target===this.player)).sort((a,b)=>dist(a,f)-dist(b,f))[0];if(nearPred)return {kind:'attack',target:nearPred};
    const opponents=this.frogs.filter(e=>this.hostile(f,e)&&dist(e,f)<(f.guard?15:10)).sort((a,b)=>dist(a,f)-dist(b,f));if(opponents[0]&&(f.team==='ally'||this.elapsed>this.graceUntil||opponents[0].team.startsWith('enemy')))return {kind:'attack',target:opponents[0]};
    if(own&&this.command==='attack'&&this.targetCommand&&!f.guard){const t=this.targetCommand,valid=t.model?!t.dead&&!t.surrendered&&t.phase!=='dormant'&&(t.team==='predator'||this.hostile(f,t)):!t.destroyed&&typeof t.team==='string'&&t.team.startsWith('enemy');if(valid)return {kind:t.model?'attack':'camp-attack',target:t};this.targetCommand=null;this.command='follow';}
    if(f.raidTarget){const camp=this.camps.find(c=>c.id===f.raidTarget&&!c.destroyed);if(camp)return {kind:'camp-attack',target:camp};f.raidTarget=null;}
    if(f.stomach<83){const h=this.world.hotspots.filter(h=>h.flies>0&&dist(h,f)<(own?8:24)).sort((a,b)=>dist(a,f)-dist(b,f))[0];if(h&&(!own||dist(h,this.player)<16||f.guard))return {kind:'eat',target:h};}
    if(own&&!f.guard){const i=allies.indexOf(f),row=Math.floor(i/4),a=this.player.yaw+Math.PI+(i%4-1.5)*.48;return {kind:'move',target:{x:this.player.x+Math.sin(a)*(3.2+row*1.8),z:this.player.z+Math.cos(a)*(3.2+row*1.8)}};}
    if(home){const a=this.elapsed*.08+f.seed*2.3;return {kind:'move',target:{x:home.x+Math.sin(a)*(f.guard?4.5:8),z:home.z+Math.cos(a)*(f.guard?4.5:8)}};}
    return null;
  }
  updatePredators(dt){updatePredators(this,dt);}
  updateEconomy(dt){
    const day=dayState(this.elapsed);
    for(const h of this.world.hotspots)h.flies=Math.min(h.maxFlies,h.flies+dt*(h.rich?.55:.16)*(day.night?.65:1));
    for(const c of this.camps){if(c.destroyed)continue;c.spawnTimer=(c.spawnTimer||0)+dt;c.stock.food=Math.min(150,c.stock.food+dt*.03);c.stock.reeds=Math.min(180,c.stock.reeds+dt*.02);
      if(c.team==='ally'){
        const nearby=this.frogs.filter(f=>!f.dead&&['player','ally'].includes(f.team)&&dist(f,c)<7&&!f.grabbedBy);
        if(!this.frogs.some(f=>f.team.startsWith('enemy')&&!f.dead&&!f.surrendered&&dist(f,c)<12)&&!this.predators.some(p=>!p.dead&&dist(p,c)<12&&p.phase!=='patrol'))for(const f of nearby){f.hp=Math.min(f.maxHp,f.hp+dt*(c.buildings.store?2.4:1.4));f.morale=Math.min(100,f.morale+dt*2);}
        if(c.buildings.nursery&&c.spawnTimer>=85&&this.allies().length<gangCapacity(this.camps)&&canAfford(this.resources,{food:10,reeds:6})){
          spend(this.resources,{food:10,reeds:6});c.spawnTimer=0;const f=this.spawnFrog({x:c.x+2,z:c.z,team:'ally',home:c.id,guard:true,stomach:80});this.ui.toast(`${f.name} βγήκε από τη φωλιά και φρουρεί το ${c.name}.`,'success');this.audio.play?.('recruit');
        }
      }else if(c.team.startsWith('enemy')&&c.spawnTimer>110){c.spawnTimer=0;const living=this.frogs.filter(f=>f.home===c.id&&f.team===c.team&&!f.dead&&!f.surrendered);if(living.length<4&&c.stock.food>=12&&this.frogs.filter(f=>!f.dead).length<65){c.stock.food-=12;this.spawnFrog({x:c.x+3,z:c.z,team:c.team,home:c.id,guard:true,tier:c.tier,level:c.tier+1});}}
    }
    if(this.elapsed>=this.nextRaid){this.nextRaid=this.elapsed+(day.night?85:140);this.launchRaid();}
    if(this.player.hp<25&&!this.lowHealthWarn){this.lowHealthWarn=true;this.ui.toast('Χαμηλή ζωή. Υποχώρησε σε φιλικό καταφύγιο για ανάρρωση.','danger');}if(this.player.hp>45)this.lowHealthWarn=false;
  }
  launchRaid(){
    const bases=this.ownedCamps();if(!bases.length)return;const enemy=this.camps.filter(c=>c.team.startsWith('enemy')&&!c.destroyed);if(!enemy.length)return;
    const destination=bases[Math.floor(this.random()*bases.length)],source=enemy.sort((a,b)=>dist(a,destination)-dist(b,destination))[0];
    const raiders=this.frogs.filter(f=>f.home===source.id&&f.team===source.team&&!f.dead&&!f.surrendered&&!f.grabbedBy).slice(-3);
    for(const f of raiders){f.raidTarget=destination.id;f.guard=false;f.intent=null;f.brain=0;f.loot=0;}
    if(raiders.length){destination.underRaid=true;this.ui.toast(`${destination.buildings.watchtower?'Η σκοπιά εντόπισε':'Πλησιάζει'} επιδρομή στο ${destination.name}! Άφησε φρουρά ή γύρνα στη βάση.`,'warning');this.audio.play?.('croak');}
  }
  nearestHome(radius=10){return this.ownedCamps().filter(c=>dist(c,this.player)<radius).sort((a,b)=>dist(a,this.player)-dist(b,this.player))[0]||null;}
  placement(){
    const p=this.player,ruin=this.camps.find(c=>c.destroyed&&dist(c,p)<7);if(ruin)return {x:ruin.x,z:ruin.z,ruin};
    const near=this.camps.some(c=>!c.destroyed&&dist(c,p)<14);if(near)return null;
    const site=this.world.campSites.find(s=>dist(s,p)<7&&!this.camps.some(c=>dist(c,s)<12&&!c.destroyed));if(site)return {x:site.x,z:site.z};
    const s=this.world.getSurface(p.x,p.z);if(s.type==='land'||(s.type==='rock'&&s.platform?.radius>3.5))return {x:p.x,z:p.z};return null;
  }
  buildOptions(){
    const c=this.nearestHome(),place=this.placement();return [...Object.entries(BUILDINGS).map(([type,b])=>{
      let reason='';if(type==='shelter'){if(!place)reason='Πλησίασε ελεύθερη νησίδα, όχθη ή ερείπιο, μακριά από άλλη βάση.';}
      else if(!c)reason='Πλησίασε ενεργό φιλικό καταφύγιο.';
      else if(type==='upgrade'&&c.tier>=3)reason='Η βάση βρίσκεται ήδη στην ανώτερη βαθμίδα.';
      else if(type==='repair'&&c.hp>=c.maxHp)reason='Το καταφύγιο δεν έχει ζημιές.';
      else if(!['upgrade','repair'].includes(type)&&c.buildings[type])reason='Το κτίριο υπάρχει ήδη.';
      return {type,...b,enabled:!reason,reason};
    }),{type:'promote-player',name:'Προαγωγή αρχηγού',description:`Βαθμίδα ${this.player.tier+1}: περισσότερη ζωή, ισχυρότερα χτυπήματα και εξοπλισμός από φύλλα. Απαιτεί επίπεδο ${this.player.tier*2}.`,cost:promoteCost(this.player),enabled:canPromote(this.player,this.resources),reason:this.player.tier>=3?'Ανώτερη βαθμίδα.':`Απαιτεί επίπεδο ${this.player.tier*2} και τους απαραίτητους πόρους.`}];
  }
  build(type){
    if(type==='promote-player'){if(promote(this.player,this.resources)){this.player.model.setTier(this.player.tier);this.ui.toast(`Αρχηγός βαθμίδας ${this.player.tier}!`,'success');this.audio.play?.('levelup');this.save();}return;}
    const def=BUILDINGS[type],option=this.buildOptions().find(o=>o.type===type);if(!def||!option?.enabled){this.ui.toast(option?.reason||'Δεν μπορείς να χτίσεις εδώ.','warning');return;}
    if(!canAfford(this.resources,def.cost)){this.ui.toast('Δεν αρκούν οι πόροι. Κυνήγησε ή λεηλάτησε εχθρικές αποθήκες.','warning');return;}
    if(type==='shelter'){
      const spot=this.placement();if(!spot)return;spend(this.resources,def.cost);let c;if(spot.ruin){c=spot.ruin;c.team='ally';c.destroyed=false;c.hp=c.maxHp;c.stock={food:12,reeds:15};c.buildings={};this.world.updateShelter(c.mesh,{...c,storage:c.stock});}
      else c=this.addCamp({id:`camp-${++this.idCounter}`,x:spot.x,z:spot.z,name:`Φωλιά ${this.ownedCamps().length+1}`,team:'ally',hp:350,maxHp:350,tier:1,originalEnemy:false,buildings:{}});
      this.stats.campsBuilt++;this.gainXP(35);for(const f of this.allies())if(!f.home)f.home=c.id;this.ui.toast(`Χτίστηκε το ${c.name}. X για φρουρά, V για νέα κτίρια.`,'success');
    }else{const c=this.nearestHome();if(!c)return;spend(this.resources,def.cost);if(type==='upgrade'){c.tier++;c.maxHp+=150;c.hp=Math.min(c.maxHp,c.hp+180);}else if(type==='repair')c.hp=Math.min(c.maxHp,c.hp+150);else{c.buildings[type]=true;if(type==='palisade'){c.maxHp+=180;c.hp+=180;}if(type==='store')c.stock.food+=20;}this.world.updateShelter(c.mesh,{...c,storage:c.stock});this.ui.toast(`${def.name}: ολοκληρώθηκε στο ${c.name}.`,'success');}
    this.audio.play?.('build');this.world.impact(new V(this.player.x,this.player.y+.5,this.player.z),0xc9e2a5,1);this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);this.save();
  }
  consume(){const c=this.nearestHome();if(!c){this.ui.toast('Πρέπει να βρίσκεσαι σε φιλικό καταφύγιο.','warning');return;}const day=dayState(this.elapsed).day;if(c.mealDay!==day){c.mealDay=day;c.mealCount=0;}if(c.mealCount>=2){this.ui.toast('Οι δύο εφεδρικές μερίδες της ημέρας εξαντλήθηκαν. Βγες για κυνήγι.','warning');return;}if(this.player.stomach>85){this.ui.toast('Δεν χρειάζεσαι ακόμη εφεδρικό γεύμα.');return;}if(!spend(this.resources,{food:10})){this.ui.toast('Χρειάζονται 10 τροφή για μια εφεδρική μερίδα.','warning');return;}eat(this.player,25);c.mealCount++;this.audio.play?.('eat');this.ui.toast('+25 στομάχι. Η εφεδρική τροφή είναι περιορισμένη.','food');}
  gangCommand(command){
    const previous=this.command;
    if(command==='guard'){
      const c=this.nearestHome(14);if(!c){this.ui.toast('Πλησίασε το καταφύγιο που θέλεις να φρουρήσουν.','warning');return;}
      const nearby=this.allies().filter(f=>dist(f,this.player)<20);for(const f of nearby){f.guard=true;f.home=c.id;f.brain=0;}this.command='guard';this.ui.toast(`${nearby.length} βάτραχοι φρουρούν το ${c.name}. Μπορείς να φύγεις για κυνήγι.`,'success');
    }else if(command==='attack'){
      let t=this.aimTarget?.kind==='actor'?this.aimTarget.entity:null;if(!t||(!this.hostile(this.player,t)&&t.team!=='predator'))t=this.camps.filter(c=>c.team.startsWith('enemy')&&!c.destroyed&&dist(c,this.player)<38).sort((a,b)=>dist(a,this.player)-dist(b,this.player))[0];
      if(!t){this.ui.toast('Σημάδεψε αντίπαλο ή πλησίασε μια εχθρική βάση.','warning');return;}this.command='attack';this.targetCommand=t;for(const f of this.allies())if(!f.guard)f.brain=0;this.ui.toast(`Η ομάδα επιτίθεται: ${t.name||'αντίπαλος'}. Οι φρουροί μένουν στις βάσεις.`);
    }else{
      if(previous==='guard'){const c=this.nearestHome(14);if(c)for(const f of this.allies())if(f.home===c.id&&dist(f,c)<20)f.guard=false;}
      this.command='follow';this.targetCommand=null;for(const f of this.allies())f.brain=0;this.ui.toast('Η κινητή ομάδα σε ακολουθεί. Οι μακρινοί φρουροί κρατούν τις βάσεις.');
    }
    this.audio.play?.('croak');
  }
  frogCommand(id,command){const f=this.frogs.find(f=>f.id===String(id)&&f.team==='ally'&&!f.dead);if(!f)return;
    if(command==='promote'){if(!promote(f,this.resources)){this.ui.toast(`Απαιτεί επίπεδο ${f.tier*2}, ${promoteCost(f).food} τροφή και ${promoteCost(f).reeds} καλάμια.`,'warning');return;}f.model.setTier(f.tier);this.audio.play?.('levelup');this.ui.toast(`${f.name}: προαγωγή σε βαθμίδα ${f.tier}.`,'success');}
    else if(command==='guard'){const c=this.nearestHome(18)||this.ownedCamps().sort((a,b)=>dist(a,f)-dist(b,f))[0];if(!c){this.ui.toast('Χτίσε πρώτα ένα καταφύγιο.','warning');return;}f.guard=true;f.home=c.id;f.brain=0;this.ui.toast(`${f.name} αναλαμβάνει φρουρά στο ${c.name}.`);}
    else{f.guard=false;f.brain=0;this.ui.toast(`${f.name} επιστρέφει στην ομάδα.`);}this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);this.save();
  }
  openPanel(name){if(this.ui.panel===name){this.ui.closePanels();this.paused=false;this.input.lock();return;}this.updateUI(dayState(this.elapsed));this.ui.showPanel(name);this.ignoreUnlockUntil=performance.now()+500;this.input.unlock();}
  onAction(action,payload={}){
    if(action==='build')this.build(payload.type);else if(action==='frog-command')this.frogCommand(payload.id,payload.command);else if(action==='gang-command')this.gangCommand(payload.command);
    else if(action==='consume')this.consume();else if(action==='save'){this.save();this.ui.toast('Η πρόοδος αποθηκεύτηκε σε αυτόν τον browser.','success');}
    else if(action==='restart'){this.ui.hideMenus();this.start('new');}
    else if(action==='pause')this.pause();else if(action==='panel-open')this.openPanel(payload.name);else if(action==='recruit')this.interact();else if(action==='cycle-view')cycleGameView(this);
  }
  objective(){
    if(this.hunt&&!this.hunt.dead)return predatorObjective(this.hunt);
    if(!this.ownedCamps().length){if(this.player.stomach<85)return 'Κυνήγησε μύγες, τάισε τη συμμορία και βρες μια ασφαλή νησίδα.';return 'Το στομάχι σου γέμισε. Πήγαινε στη νησίδα κοντά στην αρχή και πάτησε V για καταφύγιο.';}
    const attacked=this.ownedCamps().find(c=>this.frogs.some(f=>f.raidTarget===c.id&&!f.dead&&!f.surrendered));if(attacked)return `Υπερασπίσου το ${attacked.name} από την επιδρομή.`;
    const left=this.camps.filter(c=>c.originalEnemy&&!c.destroyed&&c.team!=='ally').length;
    if(!left)return 'Ο ποταμός είναι δικός σου. Εξερεύνησε, επέκτεινε και κράτησε τη συμμορία ασφαλή.';
    return `Ένωσε τον ποταμό: κατάστρεψε ή πείσε τις ${left} αντίπαλες συμμορίες.`;
  }
  updateUI(day){
    const p=this.player,c=this.nearestHome(),allies=this.allies(),original=this.camps.filter(c=>c.originalEnemy),won=original.filter(c=>c.destroyed||c.team==='ally').length;
    const hunt=this.hunt&&!this.hunt.dead?{...this.hunt,objective:predatorObjective(this.hunt)}:null;
    const roster=allies.map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp,stomach:f.stomach,maxStomach:100,level:f.level,tier:f.tier,role:f.role,guard:f.guard,canPromote:canPromote(f,this.resources),promoteCost:promoteCost(f).food}));
    this.ui.update({player:{hp:p.hp,maxHp:p.maxHp,stamina:p.stamina,maxStamina:100,stomach:p.stomach,maxStomach:100,level:p.level,xp:p.xp,nextXp:nextLevelXP(p.level),tier:p.tier},resources:this.resources,allies:roster,camps:this.camps,predator:hunt,objective:this.objective(),objectiveProgress:`${won} / ${original.length} περιοχές`,hint:p.grabbedBy?'ΠΑΓΙΔΕΥΤΗΚΕΣ · Πάτα Q / Space / R για να παλέψεις και κάλεσε βοήθεια!':this.context().hint,timeLabel:day.timeLabel,day:day.day,night:day.night,world:{radius:110,player:{x:p.x,z:p.z,yaw:p.yaw},platforms:this.world.platforms,hotspots:this.world.hotspots,camps:[...this.camps,...this.world.campSites.filter(s=>!this.camps.some(c=>dist(c,s)<8)).map(s=>({...s,team:'neutral'}))],enemies:this.frogs.filter(f=>f.team.startsWith('enemy')&&!f.dead),allies,predators:this.predators.map(pr=>({x:pr.x,z:pr.z,hp:pr.hp,dead:pr.dead,hunting:pr===this.hunt}))},stats:this.stats,fps:Math.round(this.fps),paused:this.paused,inCamp:!!c,currentCamp:c,currentCampId:c?.id,campName:c?.name,buildOptions:this.buildOptions(),squadMode:this.command,gangCount:allies.length+1,savedAt:this.savedAt,aiming:!!this.aimTarget,viewMode:this.viewMode,mouse:this.input.mouse,locationName:c?.name||'Ο Μεγάλος Ποταμός'});
  }
  updateModels(dt){
    for(const f of this.frogs){f.attackAnim=Math.max(0,(f.attackAnim||0)-dt);f.roarAnim=Math.max(0,(f.roarAnim||0)-dt);f.hitAnim=Math.max(0,(f.hitAnim||0)-dt);f.model.group.position.set(f.x,f.y,f.z);f.model.group.rotation.y=f.yaw;const near=dist(f,this.player)<80;f.model.group.visible=near&&!(f===this.player&&this.hidePlayer)&&(!f.dead||(f.deadTime||0)<5);if(!near)continue;
      f.model.update(dt,{time:this.elapsed+f.seed*.31,speed:this.paused?0:f.speed,swimming:f.swimming,jump:f.grounded?0:clamp(.5+f.vy/20,0,1),attack:f.attackAnim>0?{type:f.attackType||'tongue',phase:1-f.attackAnim/(f.attackDuration||.4)}:0,roar:f.roarAnim/1.25,hit:f.hitAnim/.34,dead:f.dead});
      if(f.surrendered)f.model.setOutline(COLORS.surrender,true);
    }
    for(const p of this.predators){p.attackAnim=Math.max(0,(p.attackAnim||0)-dt);p.hitAnim=Math.max(0,(p.hitAnim||0)-dt);p.model.group.position.set(p.x,p.y,p.z);p.model.group.rotation.y=p.yaw;p.model.group.visible=p.phase!=='dormant'&&dist(p,this.player)<100&&(!p.dead||p.phaseTime<4);
      p.model.update(dt,{time:this.elapsed,speed:p.phase==='patrol'?1:p.phase==='stalk'||p.phase==='flee'?p.speed:0,swimming:p.type==='fish',attack:p.attackAnim>0?{type:p.attackType||'lunge',phase:1-p.attackAnim/(p.attackDuration||.65)}:0,hit:p.hitAnim/.35,dead:p.dead});
    }
    this.shake=Math.max(0,this.shake-dt*1.8);
  }
  drawLabels(){
    const ctx=this.labelCtx,w=this.labels.width,h=this.labels.height;ctx.clearRect(0,0,w,h);if(!this.started||this.ui.isBlocking())return;const v=new V();ctx.textAlign='center';
    for(const f of this.frogs){if(f===this.player||f.dead||dist(f,this.player)>22)continue;v.set(f.x,f.y+1.7,f.z).project(this.camera);if(v.z<0||v.z>1||Math.abs(v.x)>1.1||Math.abs(v.y)>1.1)continue;const x=(v.x*.5+.5)*w,y=(-v.y*.5+.5)*h,width=f.team==='ally'?43:47;
      ctx.fillStyle='rgba(8,23,20,.72)';ctx.fillRect(x-width/2-1,y-1,width+2,6);ctx.fillStyle=f.surrendered?'#f0d18b':f.team==='ally'?'#87dba9':f.team==='neutral'?'#e0cd85':'#e58e78';ctx.fillRect(x-width/2,y,width*f.hp/f.maxHp,4);
      if(dist(f,this.player)<11||this.aimTarget?.entity===f){ctx.font='600 10px system-ui';ctx.lineWidth=3;ctx.strokeStyle='#14251f';const text=`${f.surrendered?'◇ ':''}${f.name} · ${f.level}`;ctx.strokeText(text,x,y-7);ctx.fillStyle='#eef1d9';ctx.fillText(text,x,y-7);}
    }
  }
  makePortraits(){
    const portraits={},size=192,target=new THREE.WebGLRenderTarget(size,size),pixels=new Uint8Array(size*size*4),canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;const ctx=canvas.getContext('2d');
    for(const type of ['frog','heron','snake','fish']){
      const scene=new THREE.Scene();scene.background=new THREE.Color('#18332d');scene.environment=this.environment.texture;scene.environmentIntensity=.5;scene.add(new THREE.HemisphereLight(0xe4f8e3,0x293e2b,2.5));const light=new THREE.DirectionalLight(0xffedc8,4);light.position.set(4,6,5);scene.add(light);
      const model=createCreature(type,{color:type==='frog'?0x71a346:undefined,seed:21});model.setOutline(0xffffff,false);scene.add(model.group);model.update(0,{time:0,speed:0});model.group.updateMatrixWorld(true);
      const box=new THREE.Box3().setFromObject(model.group),center=box.getCenter(new V()),extent=box.getSize(new V()),span=Math.max(extent.x,extent.y,extent.z),camera=new THREE.PerspectiveCamera(36,1,.05,100);camera.position.copy(center).add(new V(span*.95,span*.47,span*1.6));camera.lookAt(center);camera.updateMatrixWorld(true);
      this.renderer.setRenderTarget(target);this.renderer.render(scene,camera);this.renderer.readRenderTargetPixels(target,0,0,size,size,pixels);const img=ctx.createImageData(size,size);for(let y=0;y<size;y++)img.data.set(pixels.subarray(y*size*4,(y+1)*size*4),(size-1-y)*size*4);ctx.putImageData(img,0,0);portraits[type]=canvas.toDataURL('image/png');model.dispose?.();
    }
    this.renderer.setRenderTarget(null);target.dispose();this.ui.setPortraits(portraits);this.portraits=portraits;
  }
  checkVictory(){if(!this.won&&isVictory(this.camps)){this.won=true;this.paused=true;this.ended=true;this.input.unlock();this.audio.play?.('victory');this.ui.showEnding(true,{...this.stats,days:dayState(this.elapsed).day});this.save();}}
  respawn(){
    const base=this.ownedCamps()[0];if(!base){this.ended=true;this.paused=true;this.ui.showEnding(false,{...this.stats,days:dayState(this.elapsed).day});this.input.unlock();return;}
    const p=this.player;if(p.grabbedBy)releaseGrab(this,p.grabbedBy);p.dead=false;p.hp=p.maxHp*.65;p.stomach=Math.max(p.stomach,35);p.stamina=100;p.x=base.x+3;p.z=base.z;p.y=this.world.sampleHeight(p.x,p.z);p.grounded=true;p.vy=0;p.invulnerable=6;this.graceUntil=this.elapsed+20;this.resources.food=Math.floor(this.resources.food*.8);this.resources.reeds=Math.floor(this.resources.reeds*.85);this.hunt=null;this.deathTimer=0;p.model.setOutline(COLORS.player,true);this.ui.toast('Επέστρεψες στο καταφύγιο, με απώλεια μέρους των πόρων.','warning');this.save();
  }
  readSave(){try{return validateSave(JSON.parse(localStorage.getItem(SAVE_KEY)||'null'));}catch{return null;}}
  save(){
    if(!this.started||this.player.dead)return false;
    const clean=f=>Object.fromEntries(serialFields.map(k=>[k,f[k]]));
    const data={version:SAVE_VERSION,elapsed:this.elapsed,resources:{...this.resources},stats:{...this.stats},player:clean(this.player),frogs:this.frogs.filter(f=>f!==this.player&&!f.dead).map(clean),camps:this.camps.map(c=>({id:c.id,x:c.x,z:c.z,name:c.name,team:c.team,tier:c.tier,hp:c.hp,maxHp:c.maxHp,stock:c.stock,buildings:c.buildings,originalEnemy:c.originalEnemy,destroyed:c.destroyed,lootTaken:c.lootTaken,morale:c.morale,spawnTimer:c.spawnTimer,mealCount:c.mealCount,mealDay:c.mealDay})),hotspots:this.world.hotspots.map(h=>({id:h.id,flies:h.flies})),idCounter:this.idCounter,won:this.won};
    try{localStorage.setItem(SAVE_KEY,JSON.stringify(data));this.savedAt=Date.now();return true;}catch{if(!this.saveWarn){this.ui.toast('Η αποθήκευση του browser είναι γεμάτη ή απενεργοποιημένη.','warning');this.saveWarn=true;}return false;}
  }
  inspect(){return {version:'1.0.0',started:this.started,paused:this.paused,ended:this.ended,view:this.viewMode,elapsed:Math.round(this.elapsed),player:{x:this.player.x,y:this.player.y,z:this.player.z,hp:this.player.hp,stomach:this.player.stomach,level:this.player.level,grounded:this.player.grounded,swimming:this.player.swimming},frogs:this.frogs.length,allies:this.allies().length,camps:this.camps.map(c=>({name:c.name,team:c.team,hp:c.hp,destroyed:c.destroyed})),predators:this.predators.map(p=>({type:p.type,phase:p.phase,hp:p.hp,x:p.x,z:p.z})),hunt:this.hunt?.type,resources:this.resources,objective:this.objective(),performance:{fps:Math.round(this.fps),drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures},rigs:this.frogs[0].model.stats};}
}

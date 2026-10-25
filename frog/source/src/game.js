import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { createWorld } from './world.js';
import { createCreature } from './creatures.js';
import { GameUI } from './ui.js';
import { GameAudio } from './audio.js';
import { GameInput } from './input.js';
import { GameVFX } from './effects.js';
import { updateGameCamera, cycleGameView } from './camera.js';
import { updatePredators, damagePredator, releaseGrab, predatorObjective, intimidatePredator } from './predators.js';
import {SAVE_KEY,SAVE_VERSION,COLORS,ROLE_NAMES,PREDATORS,BUILDINGS,clamp,canAfford,spend,nextLevelXP,awardXP,promoteCost,canPromote,promote,persuasionChance,attackDamage,eat,isVictory,gangCapacity,dayState,mulberry32,validateSave} from './rules.js';

import {recruitmentOffer,canHuntForRecovery,feedFromFly,settleCampSupplies,creditCampIncome,recoverAtShelter} from './squad-rules.js';
import {createCampaign,inferLegacyMetrics,advanceCampaign,campaignObjectives,recordGathering,recordCampaignKill,nextBossType,TRAINING,canTrain,applyTraining} from './campaign.js';
import {pictogram,gangEmblem} from './visuals.js';
import {PLACEABLE_BUILDINGS,beginBuildingPlacement,updateBuildingPlacement,rotateBuildingPlacement,confirmBuildingPlacement,cancelBuildingPlacement} from './build-placement.js';
import {validateBuildingPlacement} from './placement-rules.js';
import {DEFENSE_RULES,campGuards,guardAssignment,defenseSnapshot,normalizeGuardOrders,commandGarrison,updateGarrisonAlerts} from './garrison.js';
import {WORLD_BOUNDARY,WORLD_RADIUS,WORLD_REVISION,WORLD_SCALE,SHELTER_RADIUS} from './world-config.js';
import {RIVAL_RECRUIT_COST,rivalPlan,chooseRaiders,campSurrenderOffer} from './rival-rules.js';
import {FORT_RADIUS,GATE_WIDTH,gateMaxHealth,initializeFort,gatePoint,insideFort,canPassGate,resolveFortMovement,fortWaypoint,fortLineClear,campLocal,campWorld,clearFortPosition} from './fortification.js';

const V=THREE.Vector3,TAU=Math.PI*2;
const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const angleLerp=(a,b,t)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*Math.min(1,t);
const names=['Σπίθα','Βρύο','Κρόκος','Σκιά','Νούφαρο','Σάλτος','Ρίζα','Σμάραγδος','Βότσαλο','Κάλαμος','Ρόζος','Σβούρα','Αστραπή','Λωτός','Νέφος','Σφύριγμα'];
const roles=['scout','hunter','bruiser','caller'];
const serialFields=['id','name','team','role','tier','level','hp','maxHp','stomach','maxStomach','xp','x','z','yaw','morale','home','guard','leader','surrendered','order','skinColor','trained','trainingProgress','trainingCamp','trainingPaid','returnOrder','raidTarget','loot','surrenderTimer','persuadeCD'];

export class FrogGame {
  constructor(){
    this.settings={quality:'high',volume:.55,sensitivity:1};
    try{Object.assign(this.settings,JSON.parse(localStorage.getItem('frog-settings')||'{}'));}catch{}
    this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#aacbd0');this.scene.fog=new THREE.FogExp2('#98b9ba',.0065);
    this.renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',alpha:false});
    this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));this.renderer.setSize(innerWidth,innerHeight);this.renderer.outputColorSpace=THREE.SRGBColorSpace;
    this.renderer.toneMapping=THREE.ACESFilmicToneMapping;this.renderer.toneMappingExposure=1.12;this.renderer.shadowMap.enabled=true;this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    this.renderer.domElement.id='world-canvas';this.renderer.domElement.setAttribute('aria-label','Τρισδιάστατος κόσμος Frog — Creek Dominion');document.body.prepend(this.renderer.domElement);
    this.camera=new THREE.PerspectiveCamera(59,innerWidth/innerHeight,.07,620);this.cameraYaw=.28;this.cameraPitch=.38;this.cameraDistance=12.2;this.cameraFocus=new V();this.cameraWanted=new V();
    this.sun=new THREE.DirectionalLight(0xffe7bb,3);this.sun.position.set(25,48,17);this.sun.castShadow=true;this.sun.shadow.mapSize.set(2048,2048);
    Object.assign(this.sun.shadow.camera,{left:-35,right:35,top:35,bottom:-35,near:1,far:140});this.sun.shadow.bias=-.00025;this.sun.shadow.normalBias=.035;this.scene.add(this.sun,this.sun.target);
    this.hemi=new THREE.HemisphereLight(0xc8e4ef,0x405337,2);this.scene.add(this.hemi);this.moon=new THREE.DirectionalLight(0x91b6e8,.15);this.moon.position.set(-30,35,-20);this.scene.add(this.moon);
    this.sky=new Sky();this.sky.scale.setScalar(1000);this.sky.material.uniforms.turbidity.value=5;this.sky.material.uniforms.rayleigh.value=1.8;this.sky.material.uniforms.mieCoefficient.value=.004;this.sky.material.uniforms.mieDirectionalG.value=.8;this.sky.material.uniforms.sunPosition.value.set(25,48,17);this.scene.add(this.sky);
    const pmrem=new THREE.PMREMGenerator(this.renderer);this.environment=pmrem.fromScene(this.sky,.04,1,1500);this.scene.environment=this.environment.texture;this.scene.environmentIntensity=.55;pmrem.dispose();
    this.world=createWorld(this.scene,this.renderer,{seed:731});this.vfx=new GameVFX(this.scene);this.audio=new GameAudio();
    this.selectedIds=new Set();this.portraitCache=new Map();this.portraitQueue=[];this.iconCache=new Map();this.frogs=[];this.predators=[];this.camps=[];this.resources={food:22,reeds:40};this.elapsed=0;this.frameTime=0;this.idCounter=0;this.random=mulberry32(9541);
    this.started=false;this.paused=true;this.ended=false;this.won=false;this.command='follow';this.targetCommand=null;this.specialIndex=0;
    this.ui=new GameUI({onAction:(a,p)=>this.onAction(a,p),onStart:mode=>this.start(mode),onResume:()=>this.resume(),onSettings:s=>this.setSettings(s)});this.ui.setSettings(this.settings);
    this.input=new GameInput(this.renderer.domElement,a=>{if(a==='escape')this.escape();else if(this.started&&!this.paused&&!this.ui.panel&&performance.now()>(this.ignoreUnlockUntil||0))this.pause();});
    this.labels=document.createElement('canvas');this.labels.id='world-labels';Object.assign(this.labels.style,{position:'fixed',inset:'0',width:'100%',height:'100%',pointerEvents:'none',zIndex:4});document.body.append(this.labels);this.labelCtx=this.labels.getContext('2d');
    this.timers={ui:0,save:0,objective:0,raids:0,lighting:0,flyAttack:0};this.shake=0;this.hitPause=0;this.stats=this.emptyStats();this.hunt=null;
    this.resetWorld();this.saved=this.readSave();this.ui.showTitle(!!this.saved);this.applySettings();this.resize();this.makePortraits();
    addEventListener('resize',()=>this.resize());addEventListener('beforeunload',()=>this.save());document.addEventListener('visibilitychange',()=>{if(document.hidden&&this.started){this.save();this.pause();}});
    this.renderer.domElement.addEventListener('click',()=>{if(this.started&&!this.paused&&!this.buildPlacement?.active&&!this.ui.panel&&!this.input.pointerLocked)this.input.lock();});
    this.last=performance.now();this.fps=60;this.renderer.setAnimationLoop(now=>this.frame(now));
    window.__FROG__={version:'1.3.0',inspect:()=>this.inspect(),save:()=>this.save()};
    document.getElementById('boot')?.remove();
  }
  emptyStats(){return {flies:0,recruited:0,kills:0,predatorsKilled:0,predatorsRepelled:0,campsBuilt:0,campsCaptured:0,raidsDefended:0,losses:0,gatheredFood:0,gatheredReeds:0,trained:0};}
  resetWorld(save=null){
    if(this.buildPlacement)cancelBuildingPlacement(this,{quiet:true});
    for(const f of [...this.frogs,...this.predators]){this.scene.remove(f.model.group);f.model.dispose?.();}for(const c of this.camps)this.world.removeShelter(c.mesh);
    this.selectedIds=new Set();this.portraitQueue=[];this.frogs=[];this.predators=[];this.camps=[];this.vfx.clear();this.player=null;this.elapsed=save?.elapsed||0;this.resources=save?.resources||{food:22,reeds:40};this.stats={...this.emptyStats(),...(save?.stats||{})};this.idCounter=save?.idCounter||0;this.command='follow';this.targetCommand=null;this.hunt=null;this.won=save?.won||false;this.ended=false;this.nextRaid=save?.nextRaid??this.elapsed+100;this.graceUntil=save?.graceUntil??this.elapsed+55;this.deathTimer=0;
    for(const h of this.world.hotspots)h.flies=h.maxFlies;
    if(save){
      this.player=this.spawnFrog({...save.player,team:'player'});for(const f of save.frogs)this.spawnFrog({...f,trained:!!f.trained||(!save.campaign&&f.team==='ally'&&f.level>=2)});
      for(const c of save.camps)this.addCamp(c);
      for(const f of this.frogs){for(const c of this.camps){if(c.destroyed)continue;const local=campLocal(c,f),d=Math.hypot(local.x,local.z);if(Math.abs(d-FORT_RADIUS)<1.3&&!(local.z>0&&Math.abs(local.x)<GATE_WIDTH/2-1)){const safe=campWorld(c,{x:local.x/d*(d<FORT_RADIUS?FORT_RADIUS-1.4:FORT_RADIUS+1.4),z:local.z/d*(d<FORT_RADIUS?FORT_RADIUS-1.4:FORT_RADIUS+1.4)});f.x=safe.x;f.z=safe.z;}}for(const c of this.camps)Object.assign(f,clearFortPosition(c,f));f.y=this.world.sampleHeight(f.x,f.z);}
      for(const h of this.world.hotspots){const s=save.hotspots?.find(x=>x.id===h.id);if(s)h.flies=clamp(s.flies,0,h.maxFlies);}
    }else{
      this.player=this.spawnFrog({id:'player',name:'Άρης',x:0,z:0,yaw:-.55,team:'player',role:'hunter',hp:120,maxHp:120,stomach:55});
      this.spawnFrog({name:'Σπίθα',x:-2,z:-2,team:'ally',role:'scout',stomach:62});this.spawnFrog({name:'Βρύο',x:1.8,z:-2.4,team:'ally',role:'bruiser',stomach:65});this.spawnFrog({name:'Κρόκος',x:3,z:-1,team:'ally',role:'caller',stomach:59});
      let enemies=this.world.campSites.filter(s=>s.team==='enemy').slice(0,5);if(enemies.length<5)enemies=this.world.campSites.filter(s=>dist(s,{x:0,z:0})>25).slice(0,5);
      enemies.forEach((site,i)=>{const c=this.addCamp({id:site.id||`enemy-camp-${i}`,x:site.x,z:site.z,name:['Οι Χάλκινοι','Οι Ριζοφύλακες','Τα Κόκκινα Καλάμια','Οι Νυχτοβάτες','Οι Βασιλιάδες του Βάλτου'][i],team:`enemy${i}`,originalEnemy:true,originalTeam:`enemy${i}`,rivalIndex:i,tier:i>2?2:1,hp:600+i*120,maxHp:600+i*120,stock:{food:80+i*18,reeds:60+i*12},buildings:{store:true,watchtower:i>1,nursery:i>2,palisade:i>2},morale:100});
        const count=rivalPlan(c,{alliedCount:3,isStronghold:i===enemies.length-1}).initial;for(let j=0;j<count;j++)this.spawnRival(c,{leader:j===0,guard:j<Math.ceil(count*.6)});});
      const spots=[{x:12,z:-7},{x:-14,z:8},{x:20,z:18},{x:-24,z:-15}];for(let i=0;i<spots.length;i++)this.spawnFrog({x:spots[i].x*WORLD_SCALE,z:spots[i].z*WORLD_SCALE,team:'neutral',role:roles[i],name:names[4+i]});
    }
    normalizeGuardOrders(this);
    this.campaign=createCampaign(save?.campaign,save&&!save.campaign?inferLegacyMetrics(save):this.campaignMetrics(),{legacy:!!save&&!save.campaign});
    this.campaign=advanceCampaign(this.campaign,this.campaignMetrics()).state;this.won=this.campaign.phase==='complete';this.campaignCheckAt=0;this.syncCampaignPredators();
    this.cameraYaw=this.player.yaw||.28;this.cameraFocus.set(this.player.x,1.1,this.player.z);this.updateCamera(1,true);
  }
  spawnFrog(data){
    const role=data.role||roles[Math.floor(this.random()*roles.length)],tier=data.tier||1;
    const f={id:data.id||`frog-${++this.idCounter}`,name:data.name||names[this.idCounter%names.length],team:data.team||'neutral',role,tier,level:data.level||1,xp:data.xp||0,hp:data.hp??(role==='bruiser'?120:95),maxHp:data.maxHp||(role==='bruiser'?120:95),stomach:data.stomach??65,maxStomach:100,x:data.x||0,z:data.z||0,y:0,yaw:data.yaw||0,vx:0,vz:0,vy:0,grounded:true,jump:0,jumpTime:0,speed:0,morale:data.morale??100,home:data.home||null,guard:!!data.guard,leader:!!data.leader,surrendered:!!data.surrendered,dead:false,attackAnim:0,attackType:'',roarAnim:0,hitAnim:0,attackCD:0,specialCD:0,invulnerable:0,stun:0,aiTime:0,brain:0,eatCD:0,intent:null,seed:this.idCounter,grabbedBy:null,thinkOffset:this.random()*5};
    const identity=[...f.id].reduce((n,c)=>(n*31+c.charCodeAt(0))>>>0,17);f.seed=identity%997;f.order=data.order||(f.guard?'guard':'follow');f.trained=!!data.trained;f.trainingProgress=data.trainingProgress||0;f.trainingPaid=!!data.trainingPaid;f.trainingCamp=data.trainingCamp||null;f.returnOrder=data.returnOrder==='guard'?'guard':'follow';f.raidTarget=data.raidTarget||null;f.loot=data.loot||0;f.surrenderTimer=data.surrenderTimer??90;f.persuadeCD=data.persuadeCD||0;
    const palette=f.team==='player'?[0x5c8f35]:f.team==='ally'?[0x57966b,0x718749,0x3f8d79,0x8d985b]:f.team==='neutral'?[0xb4a44d]:[0xa85a32,0x80576a,0x987343];
    const color=data.skinColor??palette[identity%palette.length];f.skinColor=color;
    f.model=createCreature('frog',{color,team:f.team,role,tier,seed:f.seed});f.model.setOutline(COLORS[f.team]||COLORS.enemy,true);f.y=this.world.sampleHeight(f.x,f.z);f.model.group.position.set(f.x,f.y,f.z);f.model.group.rotation.y=f.yaw;f.model.group.userData.actor=f;this.scene.add(f.model.group);this.frogs.push(f);
    if(f.team==='player'){f.maxStamina=100;f.stamina=100;f.charge=-1;f.maxHp=data.maxHp||120;f.hp=data.hp??120;}
    if(['ally','player'].includes(f.team)){this.portraitQueue??=[];this.portraitQueue.push(f);}return f;
  }
  spawnPredator(data){
    const def=PREDATORS[data.type],boss=!!data.boss,health=data.hp||(boss?{heron:1600,snake:1450,fish:1900}[data.type]:def.hp),scale=data.scale||(def.scale*(boss?1.85:1));
    const p={...def,...data,id:(boss?'boss-':'predator-')+data.type,name:boss?{heron:'Σιδερόραμφος',snake:'Ρίζα του Βυθού',fish:'Λεβιάθαν'}[data.type]:def.name,maxHp:health,hp:health,scale,boss,campaignTracked:!!data.campaignTracked,team:'predator',y:0,yaw:0,phase:'patrol',phaseTime:0,attackAnim:0,hitAnim:0,dead:false,cooldown:0,target:null,targetId:null,anchor:{x:data.x,z:data.z},notice:0,rescueDamage:0,grabbed:null,fleeTime:0,respawnAt:0,grace:0};
    if(boss){p.damage=def.damage*1.45;p.reach=def.reach*1.4;p.baseSpeed=def.speed*1.08;p.speed=p.baseSpeed;p.windup=Math.max(1.3,def.windup);}
    p.model=createCreature(data.type,{team:'predator',seed:boss?827:432});p.model.group.scale.setScalar(scale);p.model.setOutline(boss?0xf2b665:COLORS.predator,true);
    if(boss)p.model.group.traverse(o=>{if(o.isMesh&&o.material?.color&&o.name!=='animated-color-silhouette'){if(data.type==='heron')o.material.color.set(0x909da8);else o.material.color.multiplyScalar(.76);}});
    p.y=data.type==='fish'?-.7:this.world.sampleHeight(p.x,p.z);p.model.group.position.set(p.x,p.y,p.z);this.scene.add(p.model.group);this.predators.push(p);return p;
  }
  addCamp(data){const rank=data.rivalIndex??Number((String(data.originalTeam||data.team).match(/enemy(\d+)/)||[])[1]??this.camps.filter(c=>c.originalEnemy).length);const c={rivalIndex:rank,originalTeam:data.originalEnemy?`enemy${rank}`:null,tier:1,hp:350,maxHp:350,stock:data.team==='ally'?{food:0,reeds:0}:{food:14,reeds:20},buildings:{},morale:100,destroyed:false,spawnTimer:0,mealCount:0,mealDay:0,...data};if(c.originalEnemy&&!c.originalTeam)c.originalTeam=`enemy${rank}`;initializeFort(c);settleCampSupplies(this.resources,c);c.mesh=this.world.createShelter({...c,storage:this.campStorage(c)});this.camps.push(c);return c;}
  campStorage(c){if(c.team!=='ally')return c.stock;const n=Math.max(1,this.ownedCamps().length);return {food:this.resources.food/n,reeds:this.resources.reeds/n};}
  allies(){return this.frogs.filter(f=>f.team==='ally'&&!f.dead);}
  ownedCamps(){return this.camps.filter(c=>c.team==='ally'&&!c.destroyed);}
  guardAssignment(f){return guardAssignment(this,f);}
  garrisonCommand(payload){return commandGarrison(this,payload);}
  hostile(a,b){if(a.dead||b.dead||a===b||a.team==='neutral'||b.team==='neutral'||a.surrendered||b.surrendered)return false;const ta=a.team==='player'?'ally':a.team,tb=b.team==='player'?'ally':b.team;return ta!==tb;}
  start(mode){
    if(mode==='continue'&&this.saved)this.resetWorld(this.saved);else if(this.started)this.resetWorld();
    this.started=true;this.paused=false;this.ended=false;this.ui.closePanels();this.ui.showPause(false);this.audio.init?.();this.audio.start?.();this.audio.setVolume?.(this.settings.volume);this.input.clear();this.input.lock();
    this.ui.toast('WASD κίνηση · Ποντίκι στόχευση · Space άλμα · E αλληλεπίδραση','info');this.save();
  }
  pause(){if(!this.started||this.ended)return;this.paused=true;this.input.clear();this.input.unlock();this.ui.showPause(true);this.save();}
  resume(){if(!this.started)return;this.paused=false;this.ended=false;this.ui.hideMenus();this.input.clear();this.input.lock();}
  escape(){if(this.buildPlacement?.active){this.cancelBuildingPlacement();return;}if(!this.started){if(this.ui.panel)this.ui.showTitle(!!this.saved);return;}if(this.ui.panel){if(this.ui.panel==='help'&&this.ui.returnMenu==='pause'){this.ui.closePanels();this.ui.showPause(true);this.paused=true;}else this.resume();}else if(this.paused)this.resume();else this.pause();}
  setSettings(s){Object.assign(this.settings,s);localStorage.setItem('frog-settings',JSON.stringify(this.settings));this.applySettings();}
  applySettings(){const q=this.settings.quality;this.renderer.setPixelRatio(Math.min(devicePixelRatio,q==='high'?1.5:q==='medium'?1.15:1));this.renderer.shadowMap.enabled=q!=='low';this.scene.fog.density=q==='low'?.009:.0065;this.audio?.setVolume?.(this.settings.volume);this.resize();}
  resize(){this.camera.aspect=innerWidth/innerHeight;this.camera.updateProjectionMatrix();this.renderer.setSize(innerWidth,innerHeight);if(this.labels){this.labels.width=innerWidth;this.labels.height=innerHeight;}}
  frame(now){
    let dt=Math.min(.05,Math.max(.001,(now-this.last)/1000));this.last=now;this.frameTime+=dt;this.fps=THREE.MathUtils.lerp(this.fps,1/dt,.03);
    if(this.input.hit('KeyC')&&this.started&&!this.ended){cycleGameView(this);this.input.pressed.delete('KeyC');}
    if(this.input.hit('KeyB')){this.toggleHUDControls();this.input.pressed.delete('KeyB');}
    if(this.ui.panel&&this.started&&!this.buildPlacement?.active){
      if((this.ui.panel==='build'&&this.input.hit('KeyV'))||(['roster','map'].includes(this.ui.panel)&&this.input.hit('Tab'))){this.ui.closePanels();this.paused=false;this.input.pressed.delete('KeyV');this.input.pressed.delete('Tab');this.input.lock();}
      else if(this.ui.panel==='build'){for(let i=0;i<8;i++)if(this.input.hit(`Digit${i+1}`)){const b=this.buildOptions()[i];if(b?.enabled)this.build(b.type);this.input.pressed.delete(`Digit${i+1}`);}}
    }
    if(this.started&&!this.paused&&!this.ended&&(!this.ui.isBlocking?.()||this.buildPlacement?.active)){
      if(this.hitPause>0){this.hitPause-=dt;dt*=.17;}
      this.elapsed+=dt;this.updatePlayer(dt);this.updateFrogs(dt);this.updatePredators(dt);this.updateEconomy(dt);this.updateCampaign();this.checkVictory();
    }
    const day=dayState(this.elapsed);this.updateLighting(day);this.world.update(dt,this.elapsed+this.frameTime*.025,day.daylight,new V(this.player.x,this.player.y,this.player.z));this.vfx.update(dt);
    this.updateModels(dt);if(this.portraitQueue?.length&&this.renderer){const f=this.portraitQueue.shift();if(!f.dead)this.updateFrogPortrait(f);}this.updateCamera(dt);if(this.buildPlacement?.active)updateBuildingPlacement(this);this.drawLabels();this.timers.ui+=dt;if(this.timers.ui>.1){this.updateUI(day);this.timers.ui=0;}
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
    const sprint=this.input.down('ShiftLeft')&&p.stamina>8&&len>0,blocking=!this.buildPlacement?.active&&this.input.right&&p.stamina>2;p.blocking=blocking;
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
    if(p.stomach<=0&&this.elapsed%2<dt)this.damage(p,2,null);
    if(this.buildPlacement?.active){if(this.input.hit('KeyQ'))this.rotateBuildingPlacement(-1);if(this.input.hit('KeyR'))this.rotateBuildingPlacement(1);if(this.input.hit('MouseLeft'))this.confirmBuildingPlacement();return;}this.aimTarget=this.findAim();
    if(this.input.hit('MouseLeft')&&this.aimTarget?.kind==='actor'&&this.aimTarget.entity.team==='ally')this.selectFrog(this.aimTarget.entity.id,this.input.down('ShiftLeft'));
    else if((this.input.left||this.input.hit('MouseLeft'))&&p.attackCD<=0&&this.aimTarget?.entity?.team!=='ally')this.primaryAttack();
    if(this.input.hit('KeyQ'))this.special(p);if(this.input.hit('KeyR'))this.intimidate(p);if(this.input.hit('KeyE'))this.interact();
    if(this.input.hit('KeyF'))this.gangCommand(this.command==='attack'?'follow':'attack');
    if(this.input.hit('KeyT'))this.gangCommand(this.command==='forage'?'follow':'forage');
    if(this.input.hit('KeyX'))this.gangCommand(this.input.down('ShiftLeft')?'regroup':'guard');
    if(this.input.hit('KeyV'))this.openPanel('build');if(this.input.hit('Tab'))this.openPanel('roster');
    if(this.input.hit('KeyG'))this.consume();for(let i=0;i<3;i++)if(this.input.hit(`Digit${i+1}`)){this.specialIndex=i;this.ui.toast(`Ειδική κίνηση: ${['Εναέρια κλωτσιά','Βαριά προσγείωση','Χτύπημα γλώσσας'][i]}`);}
  }
  jump(f,strength=7){if(!f.grounded&&!f.swimming)return;f.vy=strength;f.grounded=false;f.jumpTime=.8;this.world.splash(new V(f.x,Math.max(0,f.y),f.z),.4);if(f===this.player)this.audio.play?.('jump');}
  moveActor(f,dt){
    const intended={x:clamp(f.x+f.vx*dt,-WORLD_BOUNDARY+1,WORLD_BOUNDARY-1),z:clamp(f.z+f.vz*dt,-WORLD_BOUNDARY+1,WORLD_BOUNDARY-1)},resolved=resolveFortMovement(this.camps,f,intended);let nx=resolved.x,nz=resolved.z,surface=this.world.getSurface(nx,nz),height=surface.height;
    if(height>f.y+.65&&f.grounded){nx=f.x;nz=f.z;surface=this.world.getSurface(nx,nz);height=surface.height;if(f!==this.player)this.jump(f,7.5);}
    f.x=nx;f.z=nz;f.speed=Math.hypot(f.vx,f.vz);f.swimming=surface.type==='water';
    if(!f.grounded){f.vy-=20*dt;f.y+=f.vy*dt;if(f.y<=height&&f.vy<=0){const force=Math.abs(f.vy);f.y=height;f.vy=0;f.grounded=true;f.jumpTime=0;if(f.swimming||surface.type==='lily')this.world.splash(new V(f.x,0,f.z),Math.min(1.2,force*.12));if(f===this.player&&force>5)this.audio.play?.('land');}}
    else if(f.y>height+.2){f.grounded=false;f.vy=0;}else{f.y=height+(f.swimming?Math.sin(this.elapsed*4+f.seed)*.025:0);}
    f.jump=f.grounded?0:clamp(f.vy/10,-1,1);if(f.swimming&&f.speed>1&&Math.random()<dt*3)this.world.splash(new V(f.x,0,f.z),.12);
  }
  findAim(){
    const p=this.player,raycaster=this.aimRay||(this.aimRay=new THREE.Raycaster()),ndc=new THREE.Vector2(this.viewMode==='topdown'?(this.input.ndc?.x||0):0,this.viewMode==='topdown'?(this.input.ndc?.y||0):0);
    raycaster.near=0;raycaster.far=Infinity;raycaster.setFromCamera(ndc,this.camera);
    const cache=this.aimMeshCache||(this.aimMeshCache=new WeakMap()),point=new V(),closest=new V(),inverse=new THREE.Matrix4(),candidates=[],hits=[];let best=null,bestDepth=Infinity;
    for(const f of [...this.frogs,...this.predators]){
      if(f===p||f.dead||f.phase==='dormant'||!f.model?.mesh||f.model.group.visible===false||dist(f,p)>26+(f.model.stats?.length||2)*(f.scale||1))continue;
      let shape=cache.get(f.model);
      if(!shape){const parts=[];f.model.group.traverse(o=>{if(o.isMesh&&o.name!=='animated-color-silhouette'&&o.name!=='tongue')parts.push(o);});shape={parts,bones:Object.values(f.model.bones||{}),bounds:new THREE.Sphere()};cache.set(f.model,shape);}
      // Bone envelopes follow the actual animated pose, scale and body length.
      // They only reject distant rays; a broad envelope is never itself a hit.
      f.model.group.updateMatrixWorld(true);shape.bounds.makeEmpty();
      for(const bone of shape.bones)shape.bounds.expandByPoint(point.setFromMatrixPosition(bone.matrixWorld));
      const body=f.model.mesh;
      if(!shape.bones.length){if(!body.geometry.boundingSphere)body.geometry.computeBoundingSphere();shape.bounds.copy(body.geometry.boundingSphere).applyMatrix4(body.matrixWorld);}
      shape.bounds.radius+=body.matrixWorld.getMaxScaleOnAxis()*(f.type==='fish'?.75:f.type==='heron'?.7:f.type==='snake'?.35:.45);
      if(shape.bounds.containsPoint(raycaster.ray.origin))candidates.push({f,shape,depth:0});
      else if(raycaster.ray.intersectSphere(shape.bounds,point))candidates.push({f,shape,depth:point.distanceTo(raycaster.ray.origin)});
    }
    candidates.sort((a,b)=>a.depth-b.depth);
    for(const {f,shape,depth} of candidates){
      if(depth>bestDepth)break;
      for(const mesh of shape.parts){
        if(!mesh.visible)continue;
        if(mesh.isSkinnedMesh){
          // Refresh the cheap conservative bound instead of keeping Three's
          // once-computed bind-pose sphere around an animated giant's feet.
          if(!mesh.boundingSphere)mesh.boundingSphere=new THREE.Sphere();
          mesh.boundingSphere.copy(shape.bounds).applyMatrix4(inverse.copy(mesh.matrixWorld).invert());mesh.boundingBox=null;
        }
        hits.length=0;raycaster.far=bestDepth;raycaster.intersectObject(mesh,false,hits);
        if(hits[0]&&hits[0].distance<bestDepth){bestDepth=hits[0].distance;best={kind:'actor',entity:f,point:hits[0].point.clone()};}
      }
    }
    // Swarms compete at their centre depth, so a real foreground ally remains
    // selectable while a distant body cannot steal a closer fly target.
    for(const h of this.world.hotspots){if(h.flies<1||dist(h,p)>10)continue;point.set(h.x,(h.y||0)+1.2,h.z);raycaster.ray.closestPointToPoint(point,closest);const depth=closest.distanceTo(raycaster.ray.origin);if(point.clone().sub(raycaster.ray.origin).dot(raycaster.ray.direction)>0&&closest.distanceToSquared(point)<4&&depth<bestDepth){bestDepth=depth;best={kind:'flies',entity:h};}}
    return best;
  }
  gainXP(amount){const levelled=awardXP(this.player,amount);if(levelled){this.ui.toast(`Επίπεδο ${this.player.level} — περισσότερη ζωή!`,'success');this.audio.play?.('levelup');}for(const f of this.allies())if(dist(f,this.player)<24)awardXP(f,amount*.45);}
  power(team='ally'){return this.frogs.filter(f=>!f.dead&&!f.surrendered&&(team==='ally'?['ally','player'].includes(f.team):f.team===team)).reduce((n,f)=>n+(f.tier+.15*f.level)*(.35+.65*f.hp/f.maxHp),0);}
  damage(target,amount,source,options={}){
    if(!target||target.dead)return;
    if(!options.bypass&&source&&source.team!=='predator'&&!fortLineClear(this.camps,source,target))return;
    if(target.team==='predator'){damagePredator(this,target,amount,source);return;}
    // An order can outlive a surrender or a change of allegiance. Validate the
    // current factions at the actual hit, not just when the order was issued.
    if(!options.bypass&&source&&source!==target&&source.team!=='predator'&&!this.hostile(source,target))return;
    if(target.surrendered&&source?.team!=='predator'&&!options.eaten&&!options.bypass)return;
    if(target.invulnerable>0&&!options.bypass)return;
    let actual=amount;if(target===this.player&&target.blocking&&target.stamina>5){actual*=.35;target.stamina=Math.max(0,target.stamina-amount*.5);this.audio.play?.('block');}
    const assignment=this.guardAssignment(target);if(assignment?.tower&&dist(target,assignment.camp)<=assignment.leash)actual*=1-DEFENSE_RULES.damageReduction/100;
    target.hp=Math.max(0,target.hp-actual);target.hitAnim=.34;target.invulnerable=target===this.player?.38:.1;target.stun=target===this.player?.12:.18;target.morale=Math.max(0,target.morale-actual*.48);
    if(source&&source!==target){const d=Math.max(.5,dist(target,source));target.vx+=(target.x-source.x)/d*2.5;target.vz+=(target.z-source.z)/d*2.5;}
    this.vfx.strike?.('impact',new V(target.x,target.y+.5,target.z),source?Math.atan2(target.x-source.x,target.z-source.z):target.yaw,.55);if(dist(target,this.player)<20)this.audio.play?.('hit');if(target===this.player)this.shake=.7;
    if(source&&source!==target&&!source.dead&&!target.surrendered&&target!==this.player){target.combatTarget=source;target.combatUntil=this.elapsed+16;target.brain=0;target.fear=0;}
    if(target.hp<=0){
      if(target.team.startsWith('enemy')&&source?.team!=='predator'&&!options.eaten){
        target.hp=target.maxHp*.15;target.surrendered=true;target.morale=0;target.guard=false;target.surrenderTimer=80;target.model.setOutline(COLORS.surrender,true);
        if(this.targetCommand===target){this.targetCommand=null;if(this.command==='attack')this.command='follow';}
        for(const f of this.frogs)if(f.intent?.target===target){f.intent=null;f.brain=0;}
        if(source?.team==='player'||source?.team==='ally'){this.stats.kills++;this.gainXP(24);this.resources.reeds+=5;this.ui.toast(`${target.name} παραδόθηκε. E για στρατολόγηση.`,'success');}
        return;
      }
      target.dead=true;target.deadTime=0;target.model.setOutline(COLORS.enemy,false);if(target===this.player){if(this.buildPlacement)cancelBuildingPlacement(this,{quiet:true});this.deathTimer=0;this.ui.toast('Έπεσες στη μάχη…','danger');this.input.clear();}else{if(target.team==='ally'){this.stats.losses++;this.ui.toast(`Χάθηκε ο ${target.name}.`,'danger');}else{this.stats.kills++;if(source?.team==='player'||source?.team==='ally'){this.gainXP(22);this.resources.food+=4;this.resources.reeds+=6;}}}
    }
  }
  primaryAttack(){
    const p=this.player,t=this.aimTarget;if(t?.entity?.team==='ally'){this.selectFrog(t.entity.id,false);return;}if(p.stamina<3)return;
    p.attackCD=.43;p.attackAnim=.34;p.attackDuration=.34;p.attackType='tongue';this.audio.play?.('tongue');
    const aim=this.aimYaw??this.cameraYaw;let end=new V(p.x+Math.sin(aim)*7,p.y+.7,p.z+Math.cos(aim)*7);
    if(t?.kind==='actor'&&dist(t.entity,p)<10){const f=t.entity;if(this.hostile(p,f)||f.team==='predator'){if(t.point)end.copy(t.point);else end.set(f.x,f.y+(f.type==='heron'?1.6:.55),f.z);this.damage(f,attackDamage(14,p.tier,p.level),p);p.stamina=Math.max(0,p.stamina-5);this.hitPause=.035;}}
    else if(t?.kind==='flies'){
      const h=t.entity,result=feedFromFly(p,h);
      if(result.consumed){this.resources.food+=result.food;this.creditGathering(result.food,0);this.stats.flies++;this.gainXP(4);end.set(h.x+(this.random()-.5),1.3+this.random(),h.z+(this.random()-.5));this.audio.play?.('eat');p.healingUntil=this.elapsed+1;this.ui.toast({id:'player-feed',icon:result.healed?'heal':'fly',value:result.healed?Math.round(result.healed):'+1',progress:p.hp/p.maxHp,tone:'success'});}
      else if(result.reason==='full'){this.ui.toast({id:'stomach-full',icon:'stomach',progress:1,tone:'info',detail:'Γεμάτο στομάχι και ζωή. E για αποθέματα.'});p.attackCD=1;}
    }else{
      const enemy=this.frogs.find(f=>this.hostile(p,f)&&dist(f,p)<3.2&&Math.cos(Math.atan2(f.x-p.x,f.z-p.z)-aim)>.3);
      if(enemy){end.set(enemy.x,enemy.y+.6,enemy.z);this.damage(enemy,attackDamage(14,p.tier,p.level),p);}
      else{const c=this.camps.find(c=>c.team.startsWith('enemy')&&!c.destroyed&&dist(c,p)<SHELTER_RADIUS+9&&Math.cos(Math.atan2(c.x-p.x,c.z-p.z)-aim)>.3);if(c){end.set(c.x,this.world.sampleHeight(c.x,c.z)+1,c.z);this.damageCamp(c,16,p);p.stamina=Math.max(0,p.stamina-3);}}
    }
    this.vfx.tongue(p,end);
  }
  special(f){
    if(f.specialCD>0||f.dead||f.grabbedBy)return;if(f===this.player&&f.stamina<23){this.ui.toast('Χρειάζεσαι περισσότερη αντοχή.','warning');return;}
    const type=f===this.player?['kick','slam','tongue'][this.specialIndex]:f.role==='bruiser'?'slam':f.role==='hunter'?'tongue':'kick';
    f.specialCD=type==='slam'?5.2:4;f.specialDuration=f.specialCD;f.attackAnim=.65;f.attackDuration=.65;f.attackType=type;if(f===this.player)f.stamina-=23;
    const aim=f===this.player?(this.aimYaw??this.cameraYaw):f.yaw;f.yaw=aim;const radius=type==='tongue'?8:type==='slam'?4.6:3.8;
    if(type==='kick'){this.jump(f,5.3);f.vx=Math.sin(aim)*8;f.vz=Math.cos(aim)*8;}
    this.audio.play?.(type==='slam'?'slam':'hit');this.vfx.strike?.(type,new V(f.x,f.y+.35,f.z),aim,type==='slam'?1.4:1);if(f.swimming||this.world.getSurface(f.x,f.z).type==='lily')this.world.splash(new V(f.x,0,f.z),type==='slam'?1.6:.6);
    for(const target of [...this.frogs,...this.predators]){if(target===f||target.dead||(!this.hostile(f,target)&&target.team!=='predator')||dist(f,target)>radius)continue;const facing=Math.cos(Math.atan2(target.x-f.x,target.z-f.z)-aim);if(type!=='slam'&&facing<-.1)continue;this.damage(target,attackDamage(type==='kick'?43:type==='slam'?33:29,f.tier,f.level),f);}
    for(const c of this.camps)if(!c.destroyed&&c.team!==f.team&&c.team!=='ally'&&dist(f,c)<radius+SHELTER_RADIUS)this.damageCamp(c,type==='slam'?38:26,f);
    if(f===this.player){this.shake=.4;this.hitPause=.065;}
  }
  intimidate(f){
    if(f.roarCD>0||f.dead)return;if(f===this.player&&f.stamina<18)return;f.roarCD=8;f.specialCD=Math.max(f.specialCD||0,5);f.roarAnim=1.25;if(f===this.player)f.stamina-=18;
    this.audio.play?.('croak');this.vfx.strike?.('croak',new V(f.x,f.y+.4,f.z),f.yaw,.6);
    const strength=28+f.tier*7;
    for(const enemy of this.frogs){if(!this.hostile(f,enemy)||dist(f,enemy)>9)continue;enemy.morale=Math.max(0,enemy.morale-strength);if(f===this.player&&this.elapsed>=(enemy.fearReady||0)){enemy.fear=.85;enemy.fearReady=this.elapsed+9;enemy.fearFrom={x:f.x,z:f.z};}if(enemy.hp<enemy.maxHp*.42&&enemy.morale<20){enemy.surrendered=true;enemy.guard=false;enemy.model.setOutline(COLORS.surrender,true);}}
    for(const p of this.predators)if(!p.dead&&dist(f,p)<10&&p.phase!=='patrol'){p.rescueDamage+=20;if(f===this.player)intimidatePredator(this,p,strength);}
    if(f===this.player)this.ui.toast({icon:'roar',progress:1,tone:'success'});
  }
  context(){
    const p=this.player,near=this.frogs.filter(f=>f!==p&&!f.dead&&dist(f,p)<4.5).sort((a,b)=>dist(a,p)-dist(b,p));
    const campFor=f=>this.camps.find(c=>c.id===f.home),offerFor=f=>recruitmentOffer(f,campFor(f));
    const recruitment=f=>{
      const camp=campFor(f),offer=offerFor(f),cooldown=offer.guaranteed?0:Math.max(0,(f.persuadeCD||0)-this.elapsed),missing=Math.max(0,Math.ceil((offer.cost.food||0)-(this.resources.food||0)));
      const chance=offer.guaranteed?1:persuasionChance({allyPower:this.power(),enemyPower:this.power(f.team),hp:f.hp,maxHp:f.maxHp,morale:f.morale,campDestroyed:!!camp?.destroyed,neutral:f.team==='neutral'});
      const reason=cooldown>0?`Έτοιμο σε ${Math.ceil(cooldown)}″`:missing?`Λείπουν ${missing} τροφή`:offer.cost.food===0?'Δωρεάν ένταξη':offer.guaranteed?`${offer.cost.food} τροφή · σίγουρη ένταξη`:`Πειθώ ${Math.round(chance*100)}%`;
      return {type:'recruit',entity:f,cost:offer.cost,available:offer.eligible&&!missing&&!cooldown,reason,chance,cooldown,cooldownDuration:8,progress:cooldown?1-cooldown/8:chance,actionLabel:offer.guaranteed?'Στρατολόγησε':'Πείσε',actionIcon:offer.guaranteed?'recruit':'persuade',hint:`E · ${offer.guaranteed?'Στρατολόγηση':'Πρόταση συμμαχίας'} · ${f.name} · ${reason}`};
    };
    const gather=(type,entity=null)=>{
      const cooldown=Math.max(0,(p.gatherReadyAt||0)-this.elapsed),empty=entity&&entity.flies<1,reason=empty?'Το σμήνος ανανεώνεται':cooldown?`Έτοιμο σε ${Math.ceil(cooldown)}″`:type==='gather'?'Τροφή και υλικά στα αποθέματα':'Υλικά στα αποθέματα';
      return {type,entity,available:!empty&&!cooldown,reason,cooldown,cooldownDuration:4,progress:empty?clamp(entity.flies,0,1):1-cooldown/4,actionLabel:empty?'Άδειο':'Μάζεψε',actionIcon:type==='gather'?'forage':'reeds',hint:`E · ${reason} · LMB για φαγητό · V για κατασκευές`};
    };
    // A deliberate aim selects the frog. Nearby followers never steal E or
    // silently become guards when the player is collecting materials.
    const aimed=this.aimTarget,aimedFrog=aimed?.kind==='actor'&&near.includes(aimed.entity)?aimed.entity:null;
    if(aimedFrog&&offerFor(aimedFrog).eligible)return recruitment(aimedFrog);
    const swarms=this.world.hotspots.filter(h=>dist(h,p)<8).sort((a,b)=>dist(a,p)-dist(b,p));
    const aimedSwarm=aimed?.kind==='flies'&&swarms.includes(aimed.entity)&&aimed.entity.flies>=1?aimed.entity:null;
    const swarm=aimedSwarm||swarms.find(h=>h.flies>=1);if(swarm)return gather('gather',swarm);
    const recruit=near.find(f=>offerFor(f).eligible&&offerFor(f).guaranteed);if(recruit)return recruitment(recruit);
    const camps=this.camps.filter(c=>dist(c,p)<SHELTER_RADIUS+7).sort((a,b)=>dist(a,p)-dist(b,p));
    const loot=camps.find(c=>c.destroyed&&!c.lootTaken);if(loot)return {type:'loot',entity:loot,available:true,actionLabel:'Λάφυρα',actionIcon:'store',hint:'E · Λεηλασία αποθεμάτων'};
    const enemy=camps.find(c=>!c.destroyed&&c.team.startsWith('enemy'));
    // Looking at an enemy base keeps diplomacy accessible. Looking away lets
    // the same shoreline supply materials; friendly bases use V for building.
    if(enemy&&Math.cos(Math.atan2(enemy.x-p.x,enemy.z-p.z)-(this.aimYaw??this.cameraYaw??p.yaw))>.65)return {type:'persuade-camp',entity:enemy,available:this.campDiplomacy(enemy).allowed,cost:this.campDiplomacy(enemy).cost,reason:this.campDiplomacy(enemy).reason,actionLabel:'Διαπραγμάτευση',actionIcon:'persuade',hint:'Νίκησε τη φρουρά και σπάσε την άμυνα πριν από συμφωνία.'};
    if(this.world.getSurface(p.x,p.z).type==='land')return gather('reeds');
    if(aimedFrog?.team==='ally')return {type:'ally',entity:aimedFrog,available:true,actionLabel:'Ομάδα',actionIcon:'group',hint:`E · Διοίκηση του ${aimedFrog.name} · Tab · Συμμορία`};
    const home=camps.find(c=>c.team==='ally'&&!c.destroyed);if(home)return {type:'home',entity:home,available:true,actionLabel:'Κατασκευές',actionIcon:'camp',hint:'V · Κτίρια / επισκευή · G · Φαγητό · X · Φρουρά'};
    if(swarms.length)return gather('gather',swarms[0]);
    if(enemy)return {type:'persuade-camp',entity:enemy,available:this.campDiplomacy(enemy).allowed,cost:this.campDiplomacy(enemy).cost,reason:this.campDiplomacy(enemy).reason,actionLabel:'Διαπραγμάτευση',actionIcon:'persuade',hint:'Νίκησε τη φρουρά και σπάσε την άμυνα πριν από συμφωνία.'};
    return {type:'none',available:false,reason:'Πλησίασε σμήνος ή όχθη',hint:'E κοντά σε σμήνος ή όχθη για αποθέματα · Σημάδεψε βάτραχο για στρατολόγηση'};
  }
  interact(){
    const ctx=this.context(),p=this.player;
    if(ctx.available===false){this.ui.toast({id:`interaction-${ctx.type}-${ctx.reason}`,icon:ctx.type==='recruit'?'recruit':ctx.type==='reeds'?'reeds':'forage',secondaryIcon:ctx.cooldown?'recover':'warning',label:ctx.reason,detail:ctx.hint||ctx.reason,value:ctx.cooldown?`${Math.ceil(ctx.cooldown)}″`:ctx.cost?.food,progress:ctx.progress,tone:'warning'});return false;}
    if(ctx.type==='recruit')return this.recruit(ctx.entity);
    if(ctx.type==='loot'){const c=ctx.entity;if(c.lootTaken){this.openPanel('build');return;}this.resources.food+=Math.round(c.stock.food);this.resources.reeds+=Math.round(c.stock.reeds);c.stock={food:0,reeds:0};c.lootTaken=true;this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});this.gainXP(35);this.ui.toast('Τα αποθέματα της βάσης πέρασαν στη συμμορία σου.','success');this.audio.play?.('eat');return;}
    if(ctx.type==='persuade-camp')return this.persuadeCamp(ctx.entity);
    if(ctx.type==='home'){this.openPanel('build');return;}
    if(ctx.type==='ally'){this.selectFrog(ctx.entity.id,false);this.openPanel('roster');return true;}
    if(ctx.type==='gather'||ctx.type==='reeds'){
      if((p.gatherReadyAt||0)>this.elapsed)return false;
      let food=0,reeds=3;if(ctx.entity){const count=Math.min(Math.floor(ctx.entity.flies),8);if(count<1)return false;ctx.entity.flies-=count;food=Math.max(1,Math.floor(count*.65));reeds=ctx.entity.rich?6:3;}
      p.gatherReadyAt=this.elapsed+4;
      this.resources.food+=food;this.resources.reeds+=reeds;this.creditGathering(food,reeds);this.ui.toast({id:'gather-resources',icon:'forage',resources:{food,reeds},label:'Συλλογή',detail:`Συλλογή: +${food} τροφή · +${reeds} υλικά`,progress:1,tone:'success'});this.audio.play?.('eat');this.vfx.number(new V(p.x,p.y,p.z),`+${reeds}`,'#dfd3a6');return true;
    }
    if(ctx.type==='none')this.ui.toast('Πλησίασε βάτραχο, σμήνος, όχθη ή καταφύγιο για αλληλεπίδραση.');
  }
  recruit(f){
    const camp=this.camps.find(c=>c.id===f?.home),offer=recruitmentOffer(f,camp);if(!offer.eligible)return false;
    if(!canAfford(this.resources,offer.cost)){const missing=Math.ceil(offer.cost.food-(this.resources.food||0));this.ui.toast({icon:'fly',value:`${Math.floor(this.resources.food||0)}/${offer.cost.food}`,label:`Λείπουν ${missing} τροφή`,detail:`Η στρατολόγηση του ${f.name} κοστίζει ${offer.cost.food} τροφή. Μάζεψε αποθέματα με E σε σμήνος.`,tone:'warning'});return false;}
    if(!offer.guaranteed&&(f.persuadeCD||0)>this.elapsed){const seconds=Math.ceil(f.persuadeCD-this.elapsed);this.ui.toast({icon:'recruit',secondaryIcon:'recover',value:`${seconds}″`,label:'Περίμενε λίγο',detail:`Ο ${f.name} θα ακούσει νέα πρόταση σε ${seconds} δευτερόλεπτα.`,tone:'warning'});return false;}
    const chance=offer.guaranteed?1:persuasionChance({allyPower:this.power(),enemyPower:this.power(f.team),hp:f.hp,maxHp:f.maxHp,morale:f.morale,campDestroyed:!!camp?.destroyed,neutral:f.team==='neutral'});
    f.persuadeCD=this.elapsed+8;if(!offer.guaranteed&&this.random()>chance){this.ui.toast({icon:'recruit',value:`${Math.round(chance*100)}%`,label:'Η πρόταση απορρίφθηκε',detail:`Ο ${f.name} αντιστέκεται. Αποδυνάμωσέ τον ή τη βάση του και προσπάθησε ξανά. Δεν ξοδεύτηκε τροφή.`,progress:chance,tone:'warning'});return false;}
    spend(this.resources,offer.cost);f.team='ally';f.surrendered=false;f.morale=100;f.fear=0;f.guard=false;f.order='follow';f.home=this.ownedCamps()[0]?.id||null;f.hp=Math.max(f.hp,f.maxHp*.5);f.intent=null;f.brain=0;f.raidTarget=null;f.combatTarget=null;f.orderTarget=null;f.model.setOutline(COLORS.ally,true);this.stats.recruited++;this.gainXP(20);this.audio.play?.('recruit');this.updateFrogPortrait?.(f,true);this.ui.toast({icon:'recruit',portrait:this.portraits?.[f.id],value:1,label:'Στρατολογήθηκε',detail:`Ο ${f.name} μπήκε στην ομάδα και σε ακολουθεί.`,tone:'success'});
    if(this.targetCommand===f){this.targetCommand=null;if(this.command==='attack')this.command='follow';}
    for(const actor of this.frogs){if(actor.intent?.target===f){actor.intent=null;actor.brain=0;}if(actor.combatTarget===f){actor.combatTarget=null;actor.combatUntil=0;}if(actor.orderTarget===f){actor.orderTarget=null;if(actor.order==='attack')actor.order='follow';}}
    return true;
  }
  campDiplomacy(c){
    const defenders=this.frogs.filter(f=>f.home===c.id&&f.team===c.team&&!f.dead&&!f.surrendered&&dist(f,c)<SHELTER_RADIUS+8);
    return campSurrenderOffer({...c,isStronghold:c===this.stronghold()},{defenders:defenders.length,leaderAlive:defenders.some(f=>f.leader),alliedPower:this.power(),enemyPower:this.power(c.team)});
  }
  persuadeCamp(c){
    if(!c||c.destroyed||!c.team.startsWith('enemy'))return false;
    const offer=this.campDiplomacy(c);
    if(!offer.allowed){this.ui.toast({icon:'shield',tone:'warning',label:'Η φρουρά αντιστέκεται',detail:offer.reason});return false;}
    if((c.persuadeCD||0)>this.elapsed){this.ui.toast('Η συμμορία δεν θέλει ακόμη να διαπραγματευτεί.');return false;}
    if(!canAfford(this.resources,offer.cost)){this.ui.toast(`Χρειάζεσαι ${offer.cost.food} τροφή για τη συμφωνία.`,'warning');return false;}
    c.persuadeCD=this.elapsed+20;
    if(this.random()<offer.chance){spend(this.resources,offer.cost);this.captureCamp(c);return true;}
    this.ui.toast('Η φρουρά απέρριψε τη συμφωνία. Δεν ξοδεύτηκε τροφή.','warning');return false;
  }
  captureCamp(c){
    if(!c||c.team==='ally')return;const old=c.team;
    const firstCapture=!c.capturedOnce;c.capturedOnce=true;c.team='ally';c.destroyed=false;c.hp=Math.max(c.hp,c.maxHp*.5);c.gateHp=Math.max(c.gateHp||0,gateMaxHealth(c)*.5);c.morale=100;c.spawnTimer=0;c.underRaid=false;c.rebuildTimer=0;this.stats.campsCaptured++;c.supplyMigrated=false;settleCampSupplies(this.resources,c);
    let guarded=false;
    for(const f of this.frogs)if(f.team===old&&f.home===c.id&&!f.dead&&dist(f,c)<SHELTER_RADIUS+8){f.team='ally';f.surrendered=false;f.morale=100;f.home=c.id;f.guard=!guarded;guarded=true;f.order=f.guard?'guard':'follow';f.raidTarget=null;f.combatTarget=null;f.intent=null;f.brain=0;f.model.setOutline(COLORS.ally,true);this.updateFrogPortrait?.(f,true);this.stats.recruited++;}
    if(this.targetCommand===c||(this.targetCommand?.model&&this.targetCommand.team==='ally')){this.targetCommand=null;if(this.command==='attack')this.command='follow';}
    for(const f of this.frogs)if(f.intent?.target===c||(f.intent?.kind==='attack'&&f.intent.target?.team!=='predator'&&!this.hostile(f,f.intent.target))){f.intent=null;f.brain=0;}
    this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});if(firstCapture)this.gainXP(100);this.audio.play?.('recruit');this.ui.toast({icon:'camp',value:1,progress:1,tone:'success'});this.save();
  }
  rivalTakeover(c,sourceTeam){
    if(!c||!/^enemy\d+$/.test(sourceTeam)||c.team===sourceTeam&&!c.destroyed)return false;
    c.team=sourceTeam;c.destroyed=false;c.hp=Math.max(200,c.maxHp*.55);c.gateHp=gateMaxHealth(c)*.35;c.morale=75;c.spawnTimer=0;c.rebuildTimer=0;c.underRaid=false;c.stock={food:18,reeds:12};c.supplyMigrated=false;c.lootTaken=false;
    if(!c.originalEnemy)c.rivalIndex=Number(sourceTeam.slice(5));
    for(const f of this.frogs){
      if(f.raidTarget===c.id&&f.team===sourceTeam&&!f.dead){f.home=c.id;f.guard=true;f.raidTarget=null;f.loot=0;f.intent=null;f.brain=0;}
      if(f.team==='ally'&&f.home===c.id&&f.guard){f.guard=false;f.order='follow';f.intent=null;f.brain=0;}
    }
    this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});
    this.ui.toast({icon:'camp',tone:'danger',label:'Χάθηκε περιοχή',detail:`Το ${c.name} καταλήφθηκε. Αντεπίθεση για να το ανακτήσεις.`});
    this.save();return true;
  }
  damageCamp(c,amount,source){
    if(!c||c.destroyed)return;
    if(source&&(source.dead||source.surrendered||(source.team==='player'?'ally':source.team)===(c.team==='player'?'ally':c.team)))return;
    initializeFort(c);
    if(source&&!insideFort(c,source)&&(c.gateHp||0)<=0)return;
    if(source&&!insideFort(c,source)&&(c.gateHp||0)>0){
      const gate=gatePoint(c),atGate=dist(source,gate)<10;
      if(!atGate){if(source===this.player&&this.elapsed>(c.wallHintAt||0)){c.wallHintAt=this.elapsed+6;this.ui.toast({icon:'shield',tone:'warning',label:'Χτύπα την πύλη',detail:'Ο περίβολος εμποδίζει την είσοδο. Πλησίασε την πύλη ή δώσε ομαδική επίθεση.'});}return;}
      c.gateHp=Math.max(0,c.gateHp-amount*(c.buildings.palisade?.8:1));
      this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});this.vfx.strike?.('debris',new V(gate.x,this.world.sampleHeight(c.x,c.z)+1.5,gate.z),source.yaw||0,.7);
      if(c.gateHp===0){this.ui.toast({icon:'gate',tone:c.team==='ally'?'danger':'success',label:'Η πύλη έσπασε',detail:`Το ${c.name} είναι ανοιχτό για επίθεση.`});this.audio.play?.('slam');this.save();}return;
    }
    const defenders=this.frogs.filter(f=>!f.dead&&!f.surrendered&&f.team===c.team&&f.home===c.id&&dist(f,c)<SHELTER_RADIUS+8);
    const protection=defenders.length>=3?.28:defenders.length?.6:1;
    const damage=amount*protection*(c.buildings.palisade?.72:1);
    c.hp=Math.max(0,c.hp-damage);c.morale=Math.max(0,c.morale-damage*.14);
    this.vfx.strike?.('debris',new V(c.x,this.world.sampleHeight(c.x,c.z)+1,c.z),source?.yaw||0,.6);
    if(this.elapsed-(c.visualUpdate||0)>.4||c.hp===0){c.visualUpdate=this.elapsed;this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});}
    if(c.hp>0)return;
    if(source?.team?.startsWith('enemy')){this.rivalTakeover(c,source.team);return;}
    c.destroyed=true;c.rebuildTimer=0;this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});this.audio.play?.('slam');
    if(c.team.startsWith('enemy')){
      if(!c.destroyRewarded&&(source?.team==='player'||source?.team==='ally')){this.gainXP(120);c.destroyRewarded=true;}
      this.ui.toast(`Έπεσε το ${c.name}. E για λάφυρα · Χτίσε καταφύγιο στα ερείπια για να κρατήσεις την περιοχή.`,'success');
      for(const f of this.frogs)if(f.home===c.id&&f.team===c.team&&!f.dead&&dist(f,c)<SHELTER_RADIUS+8){f.morale=0;f.guard=false;f.surrendered=true;f.surrenderTimer=90;f.intent=null;f.brain=0;f.model.setOutline(COLORS.surrender,true);}
    }else this.ui.toast(`Το καταφύγιο ${c.name} έπεσε! Ξαναχτίζεται με V.`,'danger');
    if(this.targetCommand===c||(this.targetCommand?.model&&this.targetCommand.surrendered)){this.targetCommand=null;if(this.command==='attack')this.command='follow';}
    for(const f of this.frogs)if(f.intent?.target===c||(f.intent?.kind==='attack'&&f.intent.target?.surrendered)){f.intent=null;f.brain=0;}
    this.save();
  }
  rebuildActorGrid(){
    this.actorGrid=new Map();
    for(const f of this.frogs){if(f.dead)continue;const key=`${Math.floor(f.x/3)},${Math.floor(f.z/3)}`;let bucket=this.actorGrid.get(key);if(!bucket)this.actorGrid.set(key,bucket=[]);bucket.push(f);}
  }
  nearbyFrogs(f,radius){
    if(!this.actorGrid)return this.frogs;
    const nearby=[];for(let x=Math.floor((f.x-radius)/3);x<=Math.floor((f.x+radius)/3);x++)for(let z=Math.floor((f.z-radius)/3);z<=Math.floor((f.z+radius)/3);z++){const bucket=this.actorGrid.get(`${x},${z}`);if(bucket)nearby.push(...bucket);}return nearby;
  }
  updateFrogs(dt){
    const p=this.player,allies=this.allies();this.rebuildActorGrid();this.fieldFormation=new Map(allies.filter(f=>!f.guard&&f.order!=='training').map((f,i)=>[f.id,i]));
    for(const f of this.frogs){if(f===p)continue;if(f.dead){f.deadTime=(f.deadTime||0)+dt;continue;}for(const key of ['attackCD','specialCD','roarCD','invulnerable','stun','eatCD','fear'])f[key]=Math.max(0,(f[key]||0)-dt);f.stomach=clamp(f.stomach-dt*.055,0,100);if(f.trainingPaid&&!this.camps.some(c=>c.id===f.trainingCamp&&c.team==='ally'&&!c.destroyed&&c.buildings.training))this.cancelTraining(f);if(f.grabbedBy)continue;
      if(f.surrendered){f.surrenderTimer=Math.max(0,(f.surrenderTimer??90)-dt);const home=this.camps.find(c=>c.id===f.home&&c.team===f.team);if(!f.surrenderTimer&&home&&dist(f,this.player)>32&&!this.frogs.some(a=>['ally','player'].includes(a.team)&&!a.dead&&dist(a,home)<SHELTER_RADIUS+15)){f.surrendered=false;f.hp=Math.max(f.hp,f.maxHp*.5);f.morale=65;f.guard=true;f.intent=null;f.brain=0;}f.vx=THREE.MathUtils.damp(f.vx,0,8,dt);f.vz=THREE.MathUtils.damp(f.vz,0,8,dt);this.moveActor(f,dt);continue;}
      f.brain-=dt;if(f.brain<=0){f.brain=f.team==='ally'?.18:dist(f,p)>65?.65:.2;f.intent=this.thinkFrog(f,allies);}
      let intent=f.intent;if(!intent){f.vx=0;f.vz=0;this.moveActor(f,dt);continue;}
      if(intent.kind==='attack'&&intent.target){const barrier=this.camps.find(c=>!c.destroyed&&(c.gateHp??gateMaxHealth(c))>0&&!canPassGate(c,f)&&!insideFort(c,f)&&insideFort(c,intent.target));if(barrier){f.intent=intent={kind:'camp-attack',target:barrier};f.brain=Math.max(f.brain,.2);}}
      const attackInvalid=intent.kind==='attack'&&(!intent.target||intent.target.dead||intent.target.surrendered||intent.target.phase==='dormant'||(intent.target.team!=='predator'&&!this.hostile(f,intent.target)));
      const campInvalid=intent.kind==='camp-attack'&&(!intent.target||intent.target.destroyed||intent.target.team==='neutral'||(f.team==='player'?'ally':f.team)===(intent.target.team==='player'?'ally':intent.target.team));
      if(attackInvalid||campInvalid){f.intent=null;f.brain=0;f.vx=0;f.vz=0;this.moveActor(f,dt);continue;}
      const target=intent.target,siegeGate=intent.kind==='camp-attack'&&(target.gateHp??gateMaxHealth(target))>0&&!insideFort(target,f),goal=siegeGate?gatePoint(target,2.2):target,waypoint=fortWaypoint(this.camps,f,goal),routing=dist(waypoint,goal)>.1,d=dist(f,waypoint),travelling=f.team==='ally'&&!f.guard&&f.order!=='training';
      let speed=(f.team==='ally'?(f.role==='scout'?5.1:4.7):(f.role==='scout'?4.6:3.7))*(f.stomach<10?.8:1);
      // A walking or sprinting player must not permanently outrun the squad.
      // Catch-up remains physical movement, and ends as allies reach formation/combat range.
      if(travelling&&(intent.formation||intent.support)&&d>4.5)speed=Math.max(speed,dist(f,p)>22?7.8:6.9);
      const stop=routing?.25:siegeGate?2.8:intent.kind==='attack'?(target.team==='predator'?(f.role==='hunter'?7:Math.min(4.8,2.8+Math.max(0,(target.scale||1)-1)*.6)):f.role==='hunter'?5:1.6):intent.kind==='camp-attack'?SHELTER_RADIUS*.76:intent.kind==='eat'?2:1.1;
      if(d>stop){const dx=(waypoint.x-f.x)/Math.max(d,.01),dz=(waypoint.z-f.z)/Math.max(d,.01);let sx=0,sz=0;for(const other of this.nearbyFrogs(f,1.5)){if(other===f||other.dead)continue;const dd=dist(f,other);if(dd<1.15&&dd>.01){sx+=(f.x-other.x)/dd*(1.15-dd);sz+=(f.z-other.z)/dd*(1.15-dd);}}f.vx=dx*speed+sx*2;f.vz=dz*speed+sz*2;f.yaw=angleLerp(f.yaw,Math.atan2(f.vx,f.vz),dt*10);
        if(f.grounded&&!f.swimming&&d>3&&((this.elapsed+f.thinkOffset)%1.5)<dt)this.jump(f,6.4);
      }else{f.vx=THREE.MathUtils.damp(f.vx,0,10,dt);f.vz=THREE.MathUtils.damp(f.vz,0,10,dt);if(d>.1)f.yaw=angleLerp(f.yaw,Math.atan2(target.x-f.x,target.z-f.z),dt*10);
        if(!routing&&intent.kind==='attack'&&!target.dead&&f.attackCD<=0&&dist(f,target)<=stop+.3&&fortLineClear(this.camps,f,target)){f.attackCD=1.15+this.random()*.35;f.attackAnim=.4;f.attackDuration=.4;f.attackType=f.role==='hunter'?'tongue':'kick';this.damage(target,attackDamage(f.role==='bruiser'?14:10,f.tier,f.level),f);if(f.role==='hunter')this.vfx.tongue(f,new V(target.x,target.y+.6,target.z));if(f.specialCD<=0){if(f.role==='caller')this.intimidate(f);else if(d<4)this.special(f);}}
        if(!routing&&intent.kind==='camp-attack'&&f.attackCD<=0&&!target.destroyed){f.attackCD=1.4;f.attackAnim=.4;f.attackDuration=.4;f.attackType='kick';this.damageCamp(target,attackDamage(10,f.tier,f.level),f);if(f.raidTarget&&target.team==='ally'&&!this.frogs.some(g=>g.team==='ally'&&g.guard&&g.home===target.id&&!g.dead&&dist(g,target)<SHELTER_RADIUS+4)){const food=Math.min(1,this.resources.food);this.resources.food-=food;f.loot=(f.loot||0)+food;}}
        if(!routing&&intent.kind==='eat'&&f.eatCD<=0){const result=feedFromFly(f,target);if(result.consumed){f.attackAnim=.3;f.attackDuration=.3;f.attackType='tongue';f.healingUntil=this.elapsed+1;if(dist(f,p)<30)this.vfx.tongue(f,new V(target.x,1.5,target.z));if(f.team==='ally'){this.resources.food+=result.food;this.creditGathering(result.food,0);awardXP(f,3);}}}
        if(!routing&&intent.kind==='train')this.updateTraining(f,intent.camp,dt);
      }
      if(f.stun>0){f.vx*=.2;f.vz*=.2;}this.moveActor(f,dt);
    }
  }
  thinkFrog(f,allies){
    if(f.fear>0&&f.fearFrom){const a=Math.atan2(f.x-f.fearFrom.x,f.z-f.fearFrom.z);return {kind:'move',target:{x:f.x+Math.sin(a)*4,z:f.z+Math.cos(a)*4}};}
    const own=f.team==='ally',home=this.camps.find(c=>c.id===f.home&&!c.destroyed);
    let order=f.order||(f.guard?'guard':'follow');
    if(own&&f.guard&&(!home||home.team!=='ally')){f.guard=false;f.order=order='follow';f.orderTarget=null;f.combatTarget=null;}
    if(f.team==='neutral')return {kind:'move',target:{x:f.x+Math.sin(this.elapsed*.15+f.seed)*.2,z:f.z+Math.cos(this.elapsed*.15+f.seed)*.2}};
    const activePred=pr=>pr&&!pr.dead&&pr.hp>0&&!['patrol','dormant','dead','flee'].includes(pr.phase);
    const validTarget=t=>t&&(t.model?!t.dead&&!t.surrendered&&t.phase!=='dormant'&&(t.team==='predator'||this.hostile(f,t)):!t.destroyed&&typeof t.team==='string'&&t.team.startsWith('enemy'));
    const formation=()=>{
      // Only field troops occupy follow slots; a large garrison must not push
      // the last follower dozens of metres behind the player.
      const i=this.fieldFormation?.get(f.id)??Math.max(0,allies.filter(a=>!a.guard&&a.order!=='training').indexOf(f));
      const radius=Math.min(10.5,2.8+Math.sqrt(i)*1.15),a=this.player.yaw+Math.PI+i*2.399963;
      return {kind:'move',formation:true,target:{x:clamp(this.player.x+Math.sin(a)*radius,-WORLD_BOUNDARY+3,WORLD_BOUNDARY-3),z:clamp(this.player.z+Math.cos(a)*radius,-WORLD_BOUNDARY+3,WORLD_BOUNDARY-3)}};
    };
    const post=own&&f.guard&&home?(this.guardAssignment?.(f)||{camp:home,point:{x:home.x,z:home.z},range:home.buildings?.watchtower?26:14,leash:home.buildings?.watchtower?29:18}):null;
    if(post){
      // A garrison defends its actual camp, even when the player hunts elsewhere.
      const anchor=post.camp||home,inside=t=>dist(t,anchor)<=post.leash;
      if(dist(f,anchor)>post.leash+1){f.combatTarget=null;return {kind:'move',target:post.point};}
      const threats=[...this.frogs.filter(e=>this.hostile(f,e)),...this.predators.filter(activePred)].filter(e=>dist(e,anchor)<=post.range);
      threats.sort((a,b)=>(a.raidTarget===anchor.id?-8:0)-(b.raidTarget===anchor.id?-8:0)+dist(a,anchor)-dist(b,anchor));
      if(threats[0])return {kind:'attack',target:threats[0]};
      if(f.combatTarget&&validTarget(f.combatTarget)&&(f.combatTarget.team!=='predator'||activePred(f.combatTarget))&&inside(f.combatTarget)&&(f.combatUntil||0)>this.elapsed)return {kind:'attack',target:f.combatTarget};
      f.combatTarget=null;
      if(canHuntForRecovery(f)&&(f.stomach<65||f.hp<f.maxHp*.9)){
        const food=this.world.hotspots.filter(h=>h.flies>=1&&dist(h,anchor)<Math.min(12,post.range)).sort((a,b)=>dist(a,f)-dist(b,f))[0];
        if(food)return {kind:'eat',target:food};
      }
      return {kind:'move',target:post.point};
    }
    if(!own&&home&&f.guard&&!f.raidTarget){
      const intruders=this.frogs.filter(e=>this.hostile(f,e)&&dist(e,home)<SHELTER_RADIUS+16);
      if(intruders.length){const enemy=intruders.sort((a,b)=>dist(a,f)-dist(b,f))[0];return {kind:'attack',target:enemy};}
      if(dist(f,home)>SHELTER_RADIUS+15){f.combatTarget=null;return {kind:'move',target:home};}
    }
    const travelling=own&&order!=='training';
    if(travelling){
      const rescue=this.predators.find(pr=>activePred(pr)&&(pr.grabbed===this.player||pr.grabbed?.team==='ally'&&!pr.grabbed.guard&&dist(pr,this.player)<45));
      if(rescue)return {kind:'attack',target:rescue,support:true};
      const hunt=activePred(this.hunt)?this.hunt:this.predators.filter(pr=>activePred(pr)&&(pr.target===this.player||pr.target?.team==='ally'&&!pr.target.guard)&&dist(pr,this.player)<42).sort((a,b)=>dist(a,this.player)-dist(b,this.player))[0];
      if(order==='attack'||!f.order&&this.command==='attack'){
        const target=f.orderTarget||this.targetCommand;
        if(hunt&&target?.team!=='predator')return {kind:'attack',target:hunt,support:true};
        if(validTarget(target)){if(!target.model){const defender=this.frogs.filter(e=>this.hostile(f,e)&&dist(e,f)<18&&dist(e,target)<SHELTER_RADIUS+12).sort((a,b)=>dist(a,f)-dist(b,f))[0];if(defender)return {kind:'attack',target:defender,support:true};}return {kind:target.model?'attack':'camp-attack',target,support:true};}
        f.orderTarget=null;f.order=order='follow';
        if(this.targetCommand===target){this.targetCommand=null;this.command='follow';}
      }
      if(hunt)return {kind:'attack',target:hunt,support:true};
      const playerThreat=this.frogs.filter(e=>this.hostile(f,e)&&dist(e,this.player)<12&&(e.combatTarget===this.player||e.intent?.target===this.player||dist(e,this.player)<6)).sort((a,b)=>dist(a,this.player)-dist(b,this.player))[0];
      if(playerThreat)return {kind:'attack',target:playerThreat,support:true};
      // Rejoin rather than chasing an incidental enemy back across the creek.
      if(order!=='forage'&&dist(f,this.player)>24){f.combatTarget=null;return formation();}
    }
    const nearPred=this.predators.filter(pr=>activePred(pr)&&dist(pr,f)<(own?20:12)&&(!pr.target||pr.target.team===f.team||pr.target===this.player)).sort((a,b)=>dist(a,f)-dist(b,f))[0];
    if(nearPred)return {kind:'attack',target:nearPred,support:travelling};
    if(f.combatTarget&&validTarget(f.combatTarget)&&(f.combatTarget.team!=='predator'||activePred(f.combatTarget))&&(f.combatUntil||0)>this.elapsed&&dist(f,f.combatTarget)<32&&(!travelling||dist(f.combatTarget,this.player)<26))return {kind:'attack',target:f.combatTarget};
    f.combatTarget=null;
    const opponents=this.frogs.filter(e=>this.hostile(f,e)&&dist(e,f)<(f.guard?15:12)&&(!travelling||dist(e,this.player)<24)).sort((a,b)=>dist(a,f)-dist(b,f));
    if(opponents[0]&&(own||this.elapsed>this.graceUntil||opponents[0].team.startsWith('enemy')))return {kind:'attack',target:opponents[0]};
    if(own&&order==='training'){const camp=this.camps.find(c=>c.id===f.trainingCamp&&c.team==='ally'&&!c.destroyed&&c.buildings?.training);if(!camp)this.cancelTraining(f);else return {kind:'train',target:camp.mesh?.userData?.trainingPoint||{x:camp.x+5,z:camp.z+3},camp};}
    if(f.raidTarget){const camp=this.camps.find(c=>c.id===f.raidTarget&&!c.destroyed&&c.team!==f.team);if(camp)return {kind:'camp-attack',target:camp};f.raidTarget=null;f.guard=true;}
    const forage=own&&order==='forage',needsMeal=forage?f.hp<f.maxHp-.1||f.stomach<98:f.hp<f.maxHp*.9||f.stomach<65;
    if(canHuntForRecovery(f)&&needsMeal){
      const radius=forage?WORLD_RADIUS*2:own?8:24;
      const h=this.world.hotspots.filter(h=>h.flies>=1&&dist(h,f)<radius&&(!own||forage||dist(f,this.player)<10&&dist(h,this.player)<10)).sort((a,b)=>dist(a,f)-dist(b,f)-(a.rich?3:0)+(b.rich?3:0))[0];
      if(h)return {kind:'eat',target:h};
    }else if(forage){f.order=f.returnOrder==='guard'&&home?.team==='ally'?'guard':'follow';f.guard=f.order==='guard';if(f.guard)return {kind:'move',target:this.guardAssignment?.(f)?.point||home};}
    if(own&&!f.guard)return formation();
    if(home){const a=this.elapsed*.08+f.seed*2.3;return {kind:'move',target:{x:home.x+Math.sin(a)*(f.guard?SHELTER_RADIUS*.65:SHELTER_RADIUS+3),z:home.z+Math.cos(a)*(f.guard?SHELTER_RADIUS*.65:SHELTER_RADIUS+3)}};}return null;
  }
  campaignMetrics(){
    const homes=this.ownedCamps(),allies=this.allies();return {gatheredFood:this.stats.gatheredFood||0,gatheredReeds:this.stats.gatheredReeds||0,shelters:homes.length,buildings:Object.fromEntries(['store','nursery','training','watchtower','palisade'].map(type=>[type,homes.filter(c=>c.buildings?.[type]).length])),allies:allies.length,trained:Math.max(this.stats.trained||0,allies.filter(f=>f.trained).length),territories:this.camps.filter(c=>c.originalEnemy&&!c.destroyed&&c.team==='ally').length};
  }
  creditGathering(food=0,reeds=0){this.stats.gatheredFood=(this.stats.gatheredFood||0)+Math.max(0,food);this.stats.gatheredReeds=(this.stats.gatheredReeds||0)+Math.max(0,reeds);if(this.campaign)this.campaign=recordGathering(this.campaign,food,reeds);}
  updateCampaign(force=false){
    if(!this.campaign||(!force&&this.elapsed<(this.campaignCheckAt||0)))return;this.campaignCheckAt=this.elapsed+.25;
    const result=advanceCampaign(this.campaign,this.campaignMetrics());this.campaign=result.state;
    for(const transition of result.transitions){this.ui.toast({id:'chapter',icon:{hunters:'heron',preparation:'training',bosses:'crown',complete:'crown'}[transition.to]||'camp',value:({hunters:'2/4',preparation:'3/4',bosses:'4/4',complete:'4/4'})[transition.to],progress:1,tone:'success',detail:'Νέα φάση εκστρατείας'});this.audio.play?.('levelup');}
    this.syncCampaignPredators();
  }
  syncCampaignPredators(){
    if(!this.campaign)return;const anchors=this.world.predatorAnchors||{heron:{x:34*WORLD_SCALE,z:14*WORLD_SCALE},snake:{x:-38*WORLD_SCALE,z:-22*WORLD_SCALE},fish:{x:12*WORLD_SCALE,z:48*WORLD_SCALE}};
    if(this.campaign.phase==='hunters')for(const type of ['heron','snake','fish']){if(!this.campaign.defeated.includes(type)&&!this.predators.some(p=>p.type===type&&!p.boss&&!p.dead))this.spawnPredator({type,...anchors[type],campaignTracked:true});}
    if(this.campaign.phase==='bosses'){const type=nextBossType(this.campaign);if(type&&!this.predators.some(p=>p.type===type&&p.boss&&!p.dead))this.spawnPredator({type,...(this.world.bossAnchors?.[type]||anchors[type]),boss:true,campaignTracked:true});}
  }
  onPredatorDefeated(p){if(!p?.campaignTracked||p.campaignKillRecorded||!this.campaign)return;p.campaignKillRecorded=true;this.campaign=recordCampaignKill(this.campaign,p.type,{boss:!!p.boss});this.updateCampaign(true);this.save();}
  trainSquad(squad){
    const camp=this.ownedCamps().filter(c=>c.buildings?.training).sort((a,b)=>dist(a,this.player)-dist(b,this.player))[0];
    if(!camp){this.ui.toast({icon:'training',progress:0,tone:'warning',detail:'Χτίσε χώρο εκπαίδευσης.'});return false;}
    const eligible=squad.filter(f=>f.team==='ally'&&!f.trained&&!f.trainingPaid&&!f.dead&&!f.grabbedBy),cost={food:eligible.length*TRAINING.cost.food,reeds:eligible.length*TRAINING.cost.reeds};
    if(!eligible.length||!canAfford(this.resources,cost)){this.ui.toast({icon:'training',value:eligible.length,progress:Math.min(this.resources.food/Math.max(1,cost.food),this.resources.reeds/Math.max(1,cost.reeds)),tone:'warning',detail:'8 τροφή και 4 υλικά ανά βάτραχο.'});return false;}
    spend(this.resources,cost);for(const f of eligible){f.returnOrder=f.guard?'guard':'follow';f.guard=false;f.order='training';f.trainingCamp=camp.id;f.trainingPaid=true;f.trainingProgress=0;f.intent=null;f.orderTarget=null;f.combatTarget=null;f.brain=0;}
    this.ui.toast({icon:'training',value:eligible.length,progress:0,tone:'success'});this.save();this.updateUI(dayState(this.elapsed));return true;
  }
  cancelTraining(f){const paid=!!f.trainingPaid;if(paid){this.resources.food+=TRAINING.cost.food;this.resources.reeds+=TRAINING.cost.reeds;}f.trainingPaid=false;f.trainingProgress=0;f.trainingCamp=null;if(f.order==='training'){f.order='follow';f.guard=false;}f.intent=null;f.brain=0;return paid;}
  updateTraining(f,camp,dt){
    if(!f.trainingPaid||f.trained||f.dead)return;if(!camp||camp.destroyed||camp.team!=='ally'||!camp.buildings.training){this.cancelTraining(f);return;}
    const point=camp.mesh?.userData?.trainingPoint||{x:camp.x+5,z:camp.z+3};if(f.grabbedBy||dist(f,point)>2||!this.campSafe(camp))return;
    f.trainingProgress=Math.min(TRAINING.duration,(f.trainingProgress||0)+dt);f.attackAnim=.25;f.attackDuration=.6;f.attackType='kick';f.trainingPulse=(f.trainingPulse||0)+dt;
    if(f.trainingPulse>2){f.trainingPulse=0;this.vfx.strike?.('kick',new V(f.x,f.y+.4,f.z),f.yaw,.4);}
    if(f.trainingProgress>=TRAINING.duration&&applyTraining(f)){f.trainingPaid=false;f.trainingProgress=0;f.trainingCamp=null;f.model.setTier(f.tier);f.order=f.returnOrder==='guard'?'guard':'follow';f.guard=f.order==='guard';const originalHome=f.guard&&this.camps.find(c=>c.id===f.home&&c.team==='ally'&&!c.destroyed);f.home=originalHome?.id||camp.id;f.intent=null;f.brain=0;this.stats.trained=(this.stats.trained||0)+1;this.updateFrogPortrait(f,true);this.ui.toast({icon:'training',portrait:this.portraits?.[f.id],progress:1,value:f.tier,tone:'success'});this.updateCampaign(true);this.save();}
  }
  updatePredators(dt){updatePredators(this,dt);}
  stronghold(){
    return this.camps.filter(c=>c.team?.startsWith('enemy')&&!c.destroyed).sort((a,b)=>(b.rivalIndex||0)-(a.rivalIndex||0)||(b.tier||1)-(a.tier||1))[0]||null;
  }
  rivalPlanFor(c){return rivalPlan(c,{alliedCount:this.allies().length,elapsed:this.elapsed,ownedCount:this.ownedCamps().length,isStronghold:c===this.stronghold()});}
  spawnRival(c,{leader=false,guard=true}={}){
    const n=this.frogs.filter(f=>f.home===c.id&&f.team===c.team&&!f.dead&&!f.surrendered).length;
    const a=n*2.399963+this.random()*.6,r=10.8+Math.sqrt(n)*.9;
    const f=this.spawnFrog({x:clamp(c.x+Math.sin(a)*Math.min(FORT_RADIUS-2,r),-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2),z:clamp(c.z+Math.cos(a)*Math.min(FORT_RADIUS-2,r),-WORLD_BOUNDARY+2,WORLD_BOUNDARY-2),team:c.team,home:c.id,leader,guard,order:'guard',tier:c.tier,level:Math.max(1,1+(c.rivalIndex||0)),role:roles[n%roles.length],name:leader?`Αρχηγός · ${c.name}`:names[(n+(c.rivalIndex||0)*3)%names.length],stomach:90});
    return f;
  }
  reinforceCamp(c,plan=this.rivalPlanFor(c)){
    if(!c||c.destroyed||!c.team?.startsWith('enemy'))return 0;
    const defenders=this.frogs.filter(f=>f.home===c.id&&f.team===c.team&&!f.dead&&!f.surrendered&&!f.raidTarget);
    const count=Math.min(plan.batch,Math.max(0,plan.garrison-defenders.length),Math.floor(c.stock.food/RIVAL_RECRUIT_COST.food),Math.floor(c.stock.reeds/RIVAL_RECRUIT_COST.reeds));
    for(let i=0;i<count;i++){spend(c.stock,RIVAL_RECRUIT_COST);this.spawnRival(c,{guard:true});}
    if(count&&dist(c,this.player)<48)this.ui.toast({id:`reinforce-${c.id}`,icon:'shield',value:count,tone:'warning',label:'Εχθρικές ενισχύσεις',detail:`${c.name}: ${count} νέοι υπερασπιστές.`});
    return count;
  }
  updateEconomy(dt){
    const day=dayState(this.elapsed);
    normalizeGuardOrders(this);updateGarrisonAlerts(this);
    for(const h of this.world.hotspots)h.flies=Math.min(h.maxFlies,h.flies+dt*(h.rich?.55:.16)*(day.night?.65:1));
    const stronghold=this.stronghold(),alliedCount=this.allies().length,ownedCount=this.ownedCamps().length;
    for(const c of this.camps){
      if(c.destroyed){
        // An abandoned ruin is rebuildable only by real surviving troops.
        const survivors=this.frogs.filter(f=>f.home===c.id&&f.team===c.team&&!f.dead&&!f.surrendered&&dist(f,c)<SHELTER_RADIUS+15);
        if(c.team.startsWith('enemy')&&survivors.length>=2&&!this.frogs.some(f=>['ally','player'].includes(f.team)&&!f.dead&&dist(f,c)<SHELTER_RADIUS+15)){
          c.rebuildTimer=(c.rebuildTimer||0)+dt;
          if(c.rebuildTimer>=75){c.destroyed=false;c.hp=c.maxHp*.55;c.gateHp=gateMaxHealth(c)*.5;c.rebuildTimer=0;c.spawnTimer=0;c.stock.food=Math.max(c.stock.food,18);c.stock.reeds=Math.max(c.stock.reeds,12);this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});this.ui.toast({icon:'camp',tone:'warning',label:'Εχθρική ανοικοδόμηση',detail:`Επιζώντες ξανάχτισαν το ${c.name}.`});}
        }else c.rebuildTimer=0;
        continue;
      }
      c.spawnTimer=(c.spawnTimer||0)+dt;
      const gate=gatePoint(c),gateOpen=this.frogs.some(f=>!f.dead&&!f.surrendered&&(f.team==='player'?'ally':f.team)===c.team&&dist(f,gate)<5);if(c.gateOpen!==gateOpen){c.gateOpen=gateOpen;this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});}
      if(c.team==='ally'){
        settleCampSupplies(this.resources,c);const safe=this.campSafe(c);creditCampIncome(this.resources,c,dt,{safe});
        const nearby=this.frogs.filter(f=>!f.dead&&['player','ally'].includes(f.team)&&dist(f,c)<SHELTER_RADIUS+3&&!f.grabbedBy);
        for(const f of nearby){const healed=recoverAtShelter(f,dt,{safe,store:!!c.buildings.store});if(healed)f.healingUntil=this.elapsed+1;if(safe)f.morale=Math.min(100,f.morale+dt*2);}
        if(c.buildings.nursery&&safe&&c.spawnTimer>=85-15*((c.tier||1)-1)&&canAfford(this.resources,{food:10,reeds:6})){
          spend(this.resources,{food:10,reeds:6});c.spawnTimer=0;const guard=campGuards(this,c).length<(c.buildings.watchtower?DEFENSE_RULES.towerSlots:DEFENSE_RULES.baseSlots);
          const birth=campWorld(c,{x:2,z:8.5}),f=this.spawnFrog({x:birth.x,z:birth.z,team:'ally',home:c.id,guard,order:guard?'guard':'follow',stomach:80});this.ui.toast({icon:guard?'shield':'recruit',portrait:this.portraits?.[f.id],value:1,tone:'success',label:guard?'Νέος φρουρός':'Νέος συνοδός'});this.audio.play?.('recruit');
        }
      }else if(c.team.startsWith('enemy')){
        const plan=rivalPlan(c,{alliedCount,elapsed:this.elapsed,ownedCount,isStronghold:c===stronghold});
        c.isStronghold=c===stronghold;c.stock.food=Math.min(600+plan.garrison*6,c.stock.food+dt*plan.foodRate);c.stock.reeds=Math.min(500+plan.garrison*2,c.stock.reeds+dt*plan.materialRate);
        const defenders=this.frogs.filter(f=>f.home===c.id&&f.team===c.team&&!f.dead&&!f.surrendered&&!f.raidTarget);
        const deficit=plan.garrison-defenders.length,interval=c===stronghold&&deficit>plan.batch*2?Math.min(12,plan.interval):plan.interval;
        if(c.spawnTimer>=interval){c.spawnTimer=0;this.reinforceCamp(c,plan);}
        const threatened=this.frogs.some(f=>['ally','player'].includes(f.team)&&!f.dead&&dist(f,c)<SHELTER_RADIUS+14);
        if(!threatened){c.morale=Math.min(100,c.morale+dt*.5);for(const f of defenders)if(dist(f,c)<SHELTER_RADIUS+4){f.hp=Math.min(f.maxHp,f.hp+dt*.55);f.stomach=Math.min(100,f.stomach+dt*.16);}}
      }
    }
    if(this.elapsed>=this.nextRaid){this.nextRaid=this.elapsed+(day.night?58:82);this.launchRaid();}
    if(this.player.hp<25&&!this.lowHealthWarn){this.lowHealthWarn=true;this.ui.toast({icon:'heal',progress:this.player.hp/this.player.maxHp,tone:'danger'});}if(this.player.hp>45)this.lowHealthWarn=false;
    // Release obsolete corpses while retaining every living frog, without a population ceiling.
    const corpses=this.frogs.filter(f=>f!==this.player&&f.dead&&(f.deadTime||0)>10);
    if(corpses.length){for(const f of corpses){this.scene?.remove(f.model.group);f.model.dispose?.();this.selectedIds?.delete(f.id);if(this.portraits)delete this.portraits[f.id];}this.frogs=this.frogs.filter(f=>!corpses.includes(f));}
  }
  campSafe(c){return !this.frogs.some(f=>f.team.startsWith('enemy')&&!f.dead&&!f.surrendered&&dist(f,c)<SHELTER_RADIUS+9)&&!this.predators.some(p=>!p.dead&&dist(p,c)<SHELTER_RADIUS+9&&!['patrol','dormant','dead'].includes(p.phase));}
  launchRaid(){
    const bases=this.ownedCamps();if(!bases.length)return [];
    const enemies=this.camps.filter(c=>c.team.startsWith('enemy')&&!c.destroyed);if(!enemies.length)return [];
    const raids=[],waveCount=this.allies().length>=35&&bases.length>1?2:1;
    const targets=bases.map(c=>({camp:c,guards:campGuards(this,c).length})).sort((a,b)=>a.guards-b.guards||(b.camp.originalEnemy?1:0)-(a.camp.originalEnemy?1:0));
    for(const {camp:destination} of targets){
      if(raids.length>=waveCount)break;
      if(this.frogs.some(f=>f.raidTarget===destination.id&&!f.dead&&!f.surrendered))continue;
      const candidates=enemies.filter(c=>!raids.some(r=>r.source===c)).sort((a,b)=>dist(a,destination)-dist(b,destination));
      for(const source of candidates){
        const plan=this.rivalPlanFor(source),raiders=chooseRaiders(this.frogs,source,plan);if(!raiders.length)continue;
        for(const f of raiders){f.raidTarget=destination.id;f.guard=false;f.intent=null;f.brain=0;f.loot=0;}
        destination.underRaid=true;raids.push({source,destination,raiders});
        this.ui.toast({id:`raid-${destination.id}`,icon:'shield',tone:'danger',value:raiders.length,label:'Έρχεται επιδρομή',detail:`${source.name}: ${raiders.length} βάτραχοι κατευθύνονται στο ${destination.name}. Ανάθεσε φρουρούς με V → Άμυνα.`});break;
      }
    }
    return raids;
  }
  nearestHome(radius=SHELTER_RADIUS+5){return this.ownedCamps().filter(c=>dist(c,this.player)<radius).sort((a,b)=>dist(a,this.player)-dist(b,this.player))[0]||null;}
  placement(){
    const p=this.player,ruin=this.camps.find(c=>c.destroyed&&dist(c,p)<SHELTER_RADIUS+7);if(ruin)return {x:ruin.x,z:ruin.z,ruin};
    const near=this.camps.some(c=>!c.destroyed&&dist(c,p)<SHELTER_RADIUS*2+8);if(near)return null;
    const site=this.world.campSites.find(s=>dist(s,p)<7&&!this.camps.some(c=>dist(c,s)<SHELTER_RADIUS*2+8&&!c.destroyed));if(site)return {x:site.x,z:site.z};
    const s=this.world.getSurface(p.x,p.z);if(s.type==='land'||(s.type==='rock'&&s.platform?.radius>3.5))return {x:p.x,z:p.z};return null;
  }
  buildOptions(){
    const c=this.nearestHome(),place=this.placement();if(c)c.safe=this.campSafe(c);return [...Object.entries(BUILDINGS).map(([type,b])=>{
      let reason='';if(type==='shelter'){if(!place)reason='Πλησίασε ελεύθερη νησίδα, όχθη ή ερείπιο, μακριά από άλλη βάση.';}
      else if(!c)reason='Πλησίασε ενεργό φιλικό καταφύγιο.';
      else if(!['repair'].includes(type)&&!c.safe)reason='Η βάση δέχεται επίθεση. Ασφάλισε την περιοχή πριν από νέα κατασκευή.';
      else if(type==='upgrade'&&c.tier>=3)reason='Η βάση βρίσκεται ήδη στην ανώτερη βαθμίδα.';
      else if(type==='repair'&&c.hp>=c.maxHp&&(c.gateHp??gateMaxHealth(c))>=gateMaxHealth(c))reason='Το καταφύγιο δεν έχει ζημιές.';
      else if(!['upgrade','repair'].includes(type)&&c.buildings[type])reason='Το κτίριο υπάρχει ήδη.';
      return {type,...b,enabled:!reason,reason};
    }),{type:'promote-player',name:'Προαγωγή αρχηγού',description:`Βαθμίδα ${this.player.tier+1}: περισσότερη ζωή, ισχυρότερα χτυπήματα και εξοπλισμός από φύλλα. Απαιτεί επίπεδο ${this.player.tier*2}.`,cost:promoteCost(this.player),enabled:canPromote(this.player,this.resources),reason:this.player.tier>=3?'Ανώτερη βαθμίδα.':`Απαιτεί επίπεδο ${this.player.tier*2} και τους απαραίτητους πόρους.`}];
  }
  build(type){return PLACEABLE_BUILDINGS.has(type)?this.beginBuildingPlacement(type):this.commitBuild(type);}
  buildDayState(){return dayState(this.elapsed);}
  beginBuildingPlacement(type,options={}){return beginBuildingPlacement(this,type,options);}
  updateBuildingPlacement(pointer){return updateBuildingPlacement(this,pointer);}
  rotateBuildingPlacement(direction){const ok=rotateBuildingPlacement(this,direction);this.updateUI(dayState(this.elapsed));return ok;}
  confirmBuildingPlacement(){updateBuildingPlacement(this);const ok=confirmBuildingPlacement(this);this.updateUI(dayState(this.elapsed));return ok;}
  cancelBuildingPlacement(){const ok=cancelBuildingPlacement(this);this.updateUI(dayState(this.elapsed));return ok;}
  commitBuild(type,placementRecord=null){
    this.lastBuildCommitted=false;
    if(type==='promote-player'){if(promote(this.player,this.resources)){this.player.model.setTier(this.player.tier);this.updateFrogPortrait(this.player,true);this.ui.toast(`Αρχηγός βαθμίδας ${this.player.tier}!`,'success');this.audio.play?.('levelup');this.save();}return;}
    const def=BUILDINGS[type],option=placementRecord?{enabled:true}:this.buildOptions().find(o=>o.type===type);if(!def||!option?.enabled){this.ui.toast(option?.reason||'Δεν μπορείς να χτίσεις εδώ.','warning');return;}
    if(!canAfford(this.resources,def.cost)){this.ui.toast('Δεν αρκούν οι πόροι. Κυνήγησε ή λεηλάτησε εχθρικές αποθήκες.','warning');return;}
    if(type==='shelter'){
      const spot=placementRecord||this.placement();if(!spot)return;spend(this.resources,def.cost);let c;if(spot.ruin){c=spot.ruin;c.team='ally';c.destroyed=false;c.hp=c.maxHp;c.gateHp=gateMaxHealth(c);c.stock={food:0,reeds:0};c.supplyMigrated=true;c.capturedOnce=true;c.spawnTimer=0;c.rebuildTimer=0;c.buildings={};c.buildingPlacements={};c.yaw=spot.yaw||0;this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});}
      else c=this.addCamp({id:`camp-${++this.idCounter}`,x:spot.x,z:spot.z,yaw:spot.yaw||0,name:`Φωλιά ${this.ownedCamps().length+1}`,team:'ally',hp:350,maxHp:350,tier:1,originalEnemy:false,buildings:{}});
      for(const f of this.frogs)if(!f.dead)Object.assign(f,clearFortPosition(c,f));this.stats.campsBuilt++;this.gainXP(35);for(const f of this.allies())if(!f.home)f.home=c.id;this.ui.toast(`Χτίστηκε το ${c.name}. X για φρουρά, V για νέα κτίρια.`,'success');
    }else{const c=placementRecord?this.camps.find(c=>c.id===placementRecord.campId):this.nearestHome();if(!c)return;if(type!=='repair'&&!this.campSafe(c)){this.ui.toast('Η βάση δέχεται επίθεση. Πρώτα υπερασπίσου την περιοχή.','warning');return;}
      if(PLACEABLE_BUILDINGS.has(type)&&(!placementRecord?.local||!validateBuildingPlacement(c,type,placementRecord.local).valid))return;
      spend(this.resources,def.cost);if(type==='upgrade'){const oldGate=gateMaxHealth(c);c.tier++;c.maxHp+=150;c.hp=Math.min(c.maxHp,c.hp+180);c.gateMaxHp=gateMaxHealth(c);c.gateHp=Math.min(c.gateMaxHp,(c.gateHp||0)+c.gateMaxHp-oldGate);}else if(type==='repair'){c.hp=Math.min(c.maxHp,c.hp+150);c.gateMaxHp=gateMaxHealth(c);c.gateHp=Math.min(c.gateMaxHp,(c.gateHp||0)+120);}else{c.buildings[type]=true;if(placementRecord?.local){c.buildingPlacements??={};c.buildingPlacements[type]={...placementRecord.local};}if(type==='palisade'){c.maxHp+=180;c.hp+=180;c.gateMaxHp=gateMaxHealth(c);c.gateHp=Math.min(c.gateMaxHp,(c.gateHp||0)+140);delete c.buildingPlacements?.palisade;}}this.world.updateShelter(c.mesh,{...c,storage:this.campStorage(c)});this.ui.toast(`${def.name}: ολοκληρώθηκε στο ${c.name}.`,'success');}
    this.lastBuildCommitted=true;this.audio.play?.('build');this.vfx.strike?.('debris',new V(this.player.x,this.player.y+.5,this.player.z),this.player.yaw,1);this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);this.save();return true;
  }
  consume(){const c=this.nearestHome();if(!c){this.ui.toast('Πρέπει να βρίσκεσαι σε φιλικό καταφύγιο.','warning');return;}const day=dayState(this.elapsed).day;if(c.mealDay!==day){c.mealDay=day;c.mealCount=0;}if(c.mealCount>=2){this.ui.toast('Οι δύο εφεδρικές μερίδες της ημέρας εξαντλήθηκαν. Βγες για κυνήγι.','warning');return;}if(this.player.stomach>85){this.ui.toast('Δεν χρειάζεσαι ακόμη εφεδρικό γεύμα.');return;}if(!spend(this.resources,{food:10})){this.ui.toast('Χρειάζονται 10 τροφή για μια εφεδρική μερίδα.','warning');return;}eat(this.player,25);c.mealCount++;this.audio.play?.('eat');this.ui.toast('+25 στομάχι. Η εφεδρική τροφή είναι περιορισμένη.','food');}
  gangCommand(command,selection=null){
    const ids=selection?new Set(selection):null;
    if(command==='guard'){
      const camp=this.nearestHome(SHELTER_RADIUS+6);if(!camp){this.ui.toast({icon:'camp',tone:'warning',label:'Επίλεξε καταφύγιο',detail:'Πλησίασε δικό σου καταφύγιο ή άνοιξε V → Άμυνα για να επιλέξεις βάση.'});return false;}
      return this.garrisonCommand({campId:camp.id,command:ids?'assign-selected':'assign',ids:selection});
    }
    let squad=this.allies().filter(f=>ids?ids.has(f.id):command==='regroup'||command==='train'||(!f.guard&&!(f.trainingPaid&&f.returnOrder==='guard')));
    if(command==='train')return this.trainSquad(squad);
    let target=null;
    if(command==='attack'){target=this.aimTarget?.kind==='actor'?this.aimTarget.entity:null;if(!target||(!this.hostile(this.player,target)&&target.team!=='predator'))target=this.hunt&&!this.hunt.dead?this.hunt:this.camps.filter(c=>c.team.startsWith('enemy')&&!c.destroyed&&dist(c,this.player)<38).sort((a,b)=>dist(a,this.player)-dist(b,this.player))[0];if(!target){this.ui.toast({icon:'attack',progress:0,tone:'warning'});return false;}}
    if(!ids){this.command=command==='regroup'?'follow':command;this.targetCommand=target;}
    for(const f of squad){if(f.trainingPaid)this.cancelTraining(f);if(command==='forage')f.returnOrder=f.guard?'guard':'follow';else f.returnOrder='follow';f.order=command==='regroup'?'follow':command;f.guard=false;f.orderTarget=target;f.combatTarget=null;f.combatUntil=0;f.fear=0;f.intent=null;f.brain=0;}
    this.ui.toast({icon:{guard:'shield',attack:'attack',forage:'forage',regroup:'regroup',follow:'follow'}[command]||'group',value:squad.length,progress:1,tone:'success'});this.audio.play?.('croak');this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);this.save();return true;
  }
  selectFrog(id,additive=false){
    const f=this.frogs.find(f=>f.id===String(id)&&f.team==='ally'&&!f.dead);if(!f)return;this.selectedIds??=new Set();if(!additive)this.selectedIds.clear();if(additive&&this.selectedIds.has(f.id))this.selectedIds.delete(f.id);else this.selectedIds.add(f.id);this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);
  }
  selectAll(filter='all'){this.selectedIds=new Set(this.allies().filter(f=>filter==='injured'?f.hp<f.maxHp*.9:filter==='guards'?f.guard:filter==='forage'?f.order==='forage':true).map(f=>f.id));this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);}
  frogCommand(id,command){
    const f=this.frogs.find(f=>f.id===String(id)&&f.team==='ally'&&!f.dead);if(!f)return;
    if(command==='promote'){if(!promote(f,this.resources)){this.ui.toast({icon:'crown',value:f.tier,tone:'warning'});return;}f.model.setTier(f.tier);this.updateFrogPortrait(f,true);this.audio.play?.('levelup');this.ui.toast({icon:'crown',portrait:this.portraits?.[f.id],value:f.tier,tone:'success'});this.updateUI(dayState(this.elapsed));this.ui.renderPanel?.(true);this.save();}
    else this.gangCommand(command,[f.id]);
  }
  toggleHUDControls(){if(!this.started||this.paused||this.ended||this.ui.panel||this.buildPlacement?.active)return false;this.ui.toggleHudDisclosure?.('actions');return true;}
  openPanel(name){if(this.buildPlacement?.active)return;if(this.ui.panel===name){this.ui.closePanels();this.paused=false;this.input.lock();return;}this.updateUI(dayState(this.elapsed));this.ui.showPanel(name);this.ignoreUnlockUntil=performance.now()+500;this.input.unlock();}
  onAction(action,payload={}){
    if(action==='hud-disclosure'){if(payload.open){this.ignoreUnlockUntil=performance.now()+700;this.input.clear?.();this.input.unlock?.();}return;}
    if(action==='begin-placement'){this.beginBuildingPlacement(payload.type,{dragging:!!payload.dragging});return;}
    if(action==='move-placement'){updateBuildingPlacement(this,payload);return;}
    if(action==='drop-placement'){updateBuildingPlacement(this,{...payload,dragging:true});confirmBuildingPlacement(this);if(this.buildPlacement)this.buildPlacement.dragging=false;this.updateUI(dayState(this.elapsed));return;}
    if(action==='end-placement-drag'){if(this.buildPlacement)this.buildPlacement.dragging=false;this.updateUI(dayState(this.elapsed));return;}
    if(action==='rotate-placement'){this.rotateBuildingPlacement(payload.direction);return;}
    if(action==='confirm-placement'){this.confirmBuildingPlacement();return;}
    if(action==='cancel-placement'){this.cancelBuildingPlacement();return;}
    if(action==='garrison-command'){this.garrisonCommand(payload);return;}
    if(action==='build')this.build(payload.type);else if(action==='frog-command')this.frogCommand(payload.id,payload.command);else if(action==='gang-command')this.gangCommand(payload.command);
    else if(action==='selection-command')this.gangCommand(payload.command,[...(this.selectedIds||[])]);
    else if(action==='select-frog')this.selectFrog(payload.id,payload.additive);else if(action==='select-all')this.selectAll(payload.filter);
    else if(action==='special-select'){this.specialIndex=payload.index;this.updateUI(dayState(this.elapsed));}
    else if(action==='primary-attack')this.primaryAttack();
    else if(['special-attack','intimidate','dodge'].includes(action)&&this.player.grabbedBy){this.player.grabbedBy.rescueDamage+=13;this.audio.play?.('hit');}
    else if(action==='special-attack')this.special(this.player);else if(action==='intimidate')this.intimidate(this.player);
    else if(action==='dodge'){const p=this.player;if((p.dodgeCD||0)<=0&&p.stamina>=22){p.stamina-=22;p.dodgeCD=1.5;p.invulnerable=.42;p.vx=Math.sin(p.yaw)*11;p.vz=Math.cos(p.yaw)*11;this.jump(p,4.5);this.audio.play?.('jump');}}
    else if(action==='interact'||action==='recruit')this.interact();else if(action==='consume')this.consume();
    else if(action==='save'){this.save();this.ui.toast({icon:'check',progress:1,tone:'success'});}
    else if(action==='restart'){this.ui.hideMenus();this.start('new');}
    else if(action==='pause')this.pause();else if(action==='panel-open')this.openPanel(payload.name);else if(action==='cycle-view')cycleGameView(this);
  }
  objective(){
    if(this.hunt&&!this.hunt.dead)return predatorObjective(this.hunt);
    if(!this.ownedCamps().length){if(this.player.stomach<85)return 'Κυνήγησε μύγες, τάισε τη συμμορία και βρες μια ασφαλή νησίδα.';return 'Το στομάχι σου γέμισε. Πήγαινε στη νησίδα κοντά στην αρχή και πάτησε V για καταφύγιο.';}
    const attacked=this.ownedCamps().find(c=>this.frogs.some(f=>f.raidTarget===c.id&&!f.dead&&!f.surrendered));if(attacked)return `Υπερασπίσου το ${attacked.name} από την επιδρομή.`;
    const left=this.camps.filter(c=>c.originalEnemy&&(c.destroyed||c.team!=='ally')).length;
    if(!left)return 'Ο ποταμός είναι δικός σου. Εξερεύνησε, επέκτεινε και κράτησε τη συμμορία ασφαλή.';
    return `Κράτησε τον ποταμό: απόκτησε και υπερασπίσου τις ${left} περιοχές που απομένουν.`;
  }
  updateUI(day){
    const p=this.player,c=this.nearestHome(),allies=this.allies(),original=this.camps.filter(c=>c.originalEnemy),won=original.filter(c=>!c.destroyed&&c.team==='ally').length;
    const selectedIds=[...(this.selectedIds||[])].filter(id=>allies.some(f=>f.id===id));
    const hunt=this.hunt&&!this.hunt.dead?{...this.hunt,portrait:this.portraits?.[this.hunt.boss?'boss-'+this.hunt.type:this.hunt.type],objective:predatorObjective(this.hunt)}:null;
    const roster=allies.map(f=>({id:f.id,name:f.name,hp:f.hp,maxHp:f.maxHp,stomach:f.stomach,maxStomach:100,level:f.level,tier:f.tier,role:f.role,guard:f.guard,order:f.order||(f.guard?'guard':'follow'),selected:selectedIds.includes(f.id),portrait:this.portraits?.[f.id],home:f.home,healing:(f.healingUntil||0)>this.elapsed,trained:f.trained,trainingProgress:f.trainingPaid?(f.trainingProgress||0)/TRAINING.duration:0,canTrain:canTrain(f,c,this.resources),canPromote:canPromote(f,this.resources),promoteCost:promoteCost(f),team:'ally',skinColor:f.skinColor}));
    const ctx=this.context(),contextState={type:ctx.type,progress:ctx.progress??(ctx.type==='gather'?Math.min(1,(ctx.entity?.flies||0)/20):ctx.type==='home'?(c?.hp||1)/(c?.maxHp||1):1),portrait:ctx.entity?.model?this.portraits?.[ctx.entity.id]:null,
      cost:ctx.cost,available:ctx.available,reason:ctx.reason,hint:ctx.hint,actionLabel:ctx.actionLabel,actionIcon:ctx.actionIcon,cooldown:ctx.cooldown,cooldownDuration:ctx.cooldownDuration,chance:ctx.chance};
    const placement=this.placement();
    this.ui.update({
      player:{hp:p.hp,maxHp:p.maxHp,stamina:p.stamina,maxStamina:100,stomach:p.stomach,maxStomach:100,level:p.level,xp:p.xp,nextXp:nextLevelXP(p.level),tier:p.tier,portrait:this.portraits?.[p.id],specialIndex:this.specialIndex,specialCD:p.specialCD,specialDuration:p.specialDuration||5.2,attackCD:p.attackCD,roarCD:p.roarCD,dodgeCD:p.dodgeCD},
      resources:this.resources,buildPlacement:this.buildPlacement?{active:true,type:this.buildPlacement.type,valid:this.buildPlacement.valid,reason:this.buildPlacement.reason,yaw:this.buildPlacement.yaw,cost:this.buildPlacement.cost,dragging:this.buildPlacement.dragging}:null,allies:roster,selectedIds,defenses:defenseSnapshot(this),capacity:null,recruitmentUnlimited:true,camps:this.camps,predator:hunt,context:contextState,campaign:{...this.campaign,objectives:campaignObjectives(this.campaign,this.campaignMetrics())},training:TRAINING,placement:{valid:!!placement,x:placement?.x,z:placement?.z},
      objectiveVisual:{type:'conquer',current:won,total:original.length,progress:won/Math.max(1,original.length),targets:original.map(c=>({id:c.id,team:c.team==='ally'?'ally':c.team,done:!c.destroyed&&c.team==='ally'}))},
      objective:this.objective(),objectiveProgress:won+' / '+original.length,hint:ctx.hint,timeLabel:day.timeLabel,day:day.day,night:day.night,
      world:{radius:this.world.radius||WORLD_RADIUS,mapRegions:this.world.mapRegions||[],routes:this.world.routes||[],stronghold:this.strongholdSnapshot(),player:{x:p.x,z:p.z,yaw:p.yaw},platforms:this.world.platforms,hotspots:this.world.hotspots,camps:[...this.camps,...this.world.campSites.filter(s=>!this.camps.some(c=>dist(c,s)<8)).map(s=>({...s,team:'neutral'}))],enemies:this.frogs.filter(f=>f.team.startsWith('enemy')&&!f.dead),allies,predators:this.predators.filter(pr=>!pr.dead&&pr.phase!=='dormant').map(pr=>({id:pr.id,name:pr.name,type:pr.type,x:pr.x,z:pr.z,hp:pr.hp,boss:pr.boss,hunting:pr===this.hunt}))},
      stats:this.stats,fps:Math.round(this.fps),paused:this.paused,inCamp:!!c,currentCamp:c,currentCampId:c?.id,campName:c?.name,buildOptions:this.buildOptions(),squadMode:this.command,gangCount:allies.length+(p.dead?0:1),savedAt:this.savedAt,aiming:!!this.aimTarget,viewMode:this.viewMode,mouse:this.input.mouse,locationName:c?.name||'Ο Μεγάλος Ποταμός'
    });
  }
  strongholdSnapshot(){
    const c=this.stronghold();if(!c)return null;
    const plan=this.rivalPlanFor(c),population=this.frogs.filter(f=>f.home===c.id&&f.team===c.team&&!f.dead&&!f.surrendered&&!f.raidTarget&&dist(f,c)<SHELTER_RADIUS+15).length;
    return {id:c.id,name:c.name,x:c.x,z:c.z,population,target:plan.garrison};
  }
  updateModels(dt){
    for(const f of this.frogs){f.attackAnim=Math.max(0,(f.attackAnim||0)-dt);f.roarAnim=Math.max(0,(f.roarAnim||0)-dt);f.hitAnim=Math.max(0,(f.hitAnim||0)-dt);f.model.group.position.set(f.x,f.y,f.z);f.model.group.rotation.y=f.yaw;const near=dist(f,this.player)<80;f.model.group.visible=near&&!(f===this.player&&this.hidePlayer)&&(!f.dead||(f.deadTime||0)<5);if(!near)continue;
      f.model.update(dt,{time:this.elapsed+f.seed*.31,speed:this.paused?0:f.speed,swimming:f.swimming,jump:f.grounded?0:clamp(.5+f.vy/20,0,1),attack:f.attackAnim>0?{type:f.attackType||'tongue',phase:1-f.attackAnim/(f.attackDuration||.4)}:0,roar:f.roarAnim/1.25,hit:f.hitAnim/.34,dead:f.dead});
      if(f.surrendered)f.model.setOutline(COLORS.surrender,true);else f.model.setOutline(this.selectedIds?.has(f.id)?0xe6f9b9:(COLORS[f.team]||COLORS.enemy),true);
    }
    for(const p of this.predators){p.attackAnim=Math.max(0,(p.attackAnim||0)-dt);p.hitAnim=Math.max(0,(p.hitAnim||0)-dt);p.model.group.position.set(p.x,p.y,p.z);p.model.group.rotation.y=p.yaw;p.model.group.visible=p.phase!=='dormant'&&dist(p,this.player)<100&&(!p.dead||p.phaseTime<4);
      p.model.update(dt,{time:this.elapsed,speed:p.phase==='patrol'?1:p.phase==='stalk'||p.phase==='flee'?p.speed:0,swimming:p.type==='fish',attack:p.attackAnim>0?{type:p.attackType||'lunge',phase:1-p.attackAnim/(p.attackDuration||.65)}:0,hit:p.hitAnim/.35,dead:p.dead});
    }
    this.shake=Math.max(0,this.shake-dt*1.8);
  }
  drawLabels(){
    const ctx=this.labelCtx,w=this.labels.width,h=this.labels.height;ctx.clearRect(0,0,w,h);if(!this.started||this.ui.isBlocking())return;const v=new V();
    for(const f of this.frogs){if(f===this.player||f.dead||dist(f,this.player)>26)continue;v.set(f.x,f.y+1.8,f.z).project(this.camera);if(v.z<0||v.z>1||Math.abs(v.x)>1.1||Math.abs(v.y)>1.1)continue;
      const x=(v.x*.5+.5)*w,y=(-v.y*.5+.5)*h,width=f.team==='ally'?58:52,selected=this.selectedIds?.has(f.id);
      if(selected){ctx.fillStyle='#d9edaa';ctx.fillRect(x-width/2-3,y-28,width+6,3);}
      const emblem=this.labelImage('emblem:'+f.team);if(emblem.complete&&emblem.naturalWidth)ctx.drawImage(emblem,x-width/2-27,y-23,25,25);
      const order=f.surrendered?'recruit':f.trainingPaid?'training':f.guard?'shield':f.order==='forage'?'forage':f.order==='attack'?'attack':'follow';
      const badge=this.labelImage(order);if(badge.complete&&badge.naturalWidth)ctx.drawImage(badge,x-13,y-28,25,25);
      ctx.fillStyle='rgba(8,23,20,.85)';ctx.fillRect(x-width/2-1,y-1,width+2,7);ctx.fillStyle=f.surrendered?'#f0d18b':f.team==='ally'?'#87dba9':f.team==='neutral'?'#e0cd85':'#e58e78';ctx.fillRect(x-width/2,y,width*clamp(f.hp/f.maxHp,0,1),5);
      if(f.team==='ally'){ctx.fillStyle='rgba(8,23,20,.85)';ctx.fillRect(x-width/2-1,y+7,width+2,5);ctx.fillStyle='#d7cb8a';ctx.fillRect(x-width/2,y+8,width*clamp(f.stomach/100,0,1),3);}
    }
  }
  labelImage(key){
    this.iconCache??=new Map();if(!this.iconCache.has(key)){const image=new Image(),svg=key.startsWith('emblem:')?gangEmblem(key.slice(7)):pictogram(key);image.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);this.iconCache.set(key,image);}return this.iconCache.get(key);
  }
  makePortraits(){
    const portraits={},size=192,target=new THREE.WebGLRenderTarget(size,size),pixels=new Uint8Array(size*size*4),canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;const ctx=canvas.getContext('2d');
    for(const key of ['frog','heron','snake','fish','boss-heron','boss-snake','boss-fish']){
      const boss=key.startsWith('boss-'),type=boss?key.slice(5):key,scene=new THREE.Scene();scene.background=new THREE.Color('#18332d');scene.environment=this.environment.texture;scene.environmentIntensity=.5;scene.add(new THREE.HemisphereLight(0xe4f8e3,0x293e2b,2.5));const light=new THREE.DirectionalLight(0xffedc8,4);light.position.set(4,6,5);scene.add(light);
      const model=createCreature(type,{color:type==='frog'?0x71a346:undefined,seed:boss?827:21});model.setOutline(0xffffff,false);scene.add(model.group);model.update(0,{time:0,speed:0});if(boss)model.group.traverse(o=>{if(o.isMesh&&o.material?.color&&o.name!=='animated-color-silhouette'){if(type==='heron')o.material.color.set(0x909da8);else o.material.color.multiplyScalar(.76);}});model.group.updateMatrixWorld(true);
      const box=new THREE.Box3().setFromObject(model.group),center=box.getCenter(new V()),extent=box.getSize(new V()),span=Math.max(extent.x,extent.y,extent.z),camera=new THREE.PerspectiveCamera(36,1,.05,100);camera.position.copy(center).add(new V(span*.95,span*.47,span*1.6));camera.lookAt(center);camera.updateMatrixWorld(true);
      this.renderer.setRenderTarget(target);this.renderer.render(scene,camera);this.renderer.readRenderTargetPixels(target,0,0,size,size,pixels);const img=ctx.createImageData(size,size);for(let y=0;y<size;y++)img.data.set(pixels.subarray(y*size*4,(y+1)*size*4),(size-1-y)*size*4);ctx.putImageData(img,0,0);portraits[key]=canvas.toDataURL('image/png');model.dispose?.();
    }
    this.renderer.setRenderTarget(null);target.dispose();this.ui.setPortraits(portraits);this.portraits=portraits;this.portraitQueue=[this.player,...this.allies()];
  }
  updateFrogPortrait(f,refresh=false){
    if(!f||!this.renderer||typeof document==='undefined')return;
    this.portraits??={};this.portraitCache??=new Map();
    const key=[f.id,f.role,f.tier,f.skinColor].join(':');
    if(refresh){this.portraitCache.delete(key);this.portraitQueue??=[];if(!this.portraitQueue.includes(f))this.portraitQueue.push(f);return;}
    if(this.portraitCache.has(key)){this.portraits[f.id]=this.portraitCache.get(key);return;}
    const size=160,target=new THREE.WebGLRenderTarget(size,size),pixels=new Uint8Array(size*size*4),canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;
    const scene=new THREE.Scene();scene.background=new THREE.Color('#18332d');scene.environment=this.environment.texture;scene.environmentIntensity=.55;scene.add(new THREE.HemisphereLight(0xe4f8e3,0x293e2b,2.4));const light=new THREE.DirectionalLight(0xffedc8,4);light.position.set(4,6,5);scene.add(light);
    const model=createCreature('frog',{color:f.skinColor,role:f.role,tier:f.tier,seed:f.seed});model.setOutline(COLORS.ally,false);model.update(0,{time:0});scene.add(model.group);model.group.updateMatrixWorld(true);
    const box=new THREE.Box3().setFromObject(model.group),center=box.getCenter(new V()),extent=box.getSize(new V()),span=Math.max(extent.x,extent.y,extent.z),camera=new THREE.PerspectiveCamera(34,1,.05,30);
    camera.position.copy(center).add(new V(span*(.52+(f.seed%7)*.05),span*.39,span*1.75));camera.lookAt(center);camera.updateMatrixWorld(true);
    const previous=this.renderer.getRenderTarget();this.renderer.setRenderTarget(target);this.renderer.render(scene,camera);this.renderer.readRenderTargetPixels(target,0,0,size,size,pixels);this.renderer.setRenderTarget(previous);
    const ctx=canvas.getContext('2d'),img=ctx.createImageData(size,size);for(let y=0;y<size;y++)img.data.set(pixels.subarray(y*size*4,(y+1)*size*4),(size-1-y)*size*4);ctx.putImageData(img,0,0);
    const portrait=canvas.toDataURL('image/png');this.portraitCache.set(key,portrait);this.portraits[f.id]=portrait;if(f===this.player)this.portraits.frog=portrait;this.ui.setPortraits?.(this.portraits);model.dispose();target.dispose();
  }
  checkVictory(){if(!this.won&&this.campaign?.phase==='complete'){this.won=true;this.paused=true;this.ended=true;this.input.unlock();this.audio.play?.('victory');this.ui.showEnding(true,{...this.stats,days:dayState(this.elapsed).day});this.save();}}
  respawn(){
    const base=this.ownedCamps()[0];if(!base){this.ended=true;this.paused=true;this.ui.showEnding(false,{...this.stats,days:dayState(this.elapsed).day});this.input.unlock();return;}
    const p=this.player;if(p.grabbedBy)releaseGrab(this,p.grabbedBy);p.dead=false;p.hp=p.maxHp*.65;p.stomach=Math.max(p.stomach,35);p.stamina=100;Object.assign(p,gatePoint(base,-5.5));p.y=this.world.sampleHeight(p.x,p.z);p.grounded=true;p.vy=0;p.invulnerable=6;this.graceUntil=this.elapsed+20;this.resources.food=Math.floor(this.resources.food*.8);this.resources.reeds=Math.floor(this.resources.reeds*.85);this.hunt=null;this.deathTimer=0;p.model.setOutline(COLORS.player,true);this.ui.toast('Επέστρεψες στο καταφύγιο, με απώλεια μέρους των πόρων.','warning');this.save();
  }
  readSave(){try{return validateSave(JSON.parse(localStorage.getItem(SAVE_KEY)||'null'));}catch{return null;}}
  save(){
    if(!this.started||this.player.dead)return false;
    const clean=f=>Object.fromEntries(serialFields.map(k=>[k,f[k]]));
    const data={version:SAVE_VERSION,worldRevision:WORLD_REVISION,nextRaid:this.nextRaid,graceUntil:this.graceUntil,elapsed:this.elapsed,resources:{...this.resources},stats:{...this.stats},campaign:this.campaign,player:clean(this.player),frogs:this.frogs.filter(f=>f!==this.player&&!f.dead).map(clean),camps:this.camps.map(c=>({id:c.id,x:c.x,z:c.z,name:c.name,team:c.team,yaw:c.yaw||0,buildingPlacements:c.buildingPlacements||{},tier:c.tier,hp:c.hp,maxHp:c.maxHp,gateHp:c.gateHp,stock:c.stock,buildings:c.buildings,originalEnemy:c.originalEnemy,originalTeam:c.originalTeam,rivalIndex:c.rivalIndex,capturedOnce:c.capturedOnce,destroyRewarded:c.destroyRewarded,rebuildTimer:c.rebuildTimer,persuadeCD:c.persuadeCD,destroyed:c.destroyed,lootTaken:c.lootTaken,supplyMigrated:c.supplyMigrated,morale:c.morale,spawnTimer:c.spawnTimer,mealCount:c.mealCount,mealDay:c.mealDay})),hotspots:this.world.hotspots.map(h=>({id:h.id,flies:h.flies})),idCounter:this.idCounter,won:this.won};
    try{localStorage.setItem(SAVE_KEY,JSON.stringify(data));this.savedAt=Date.now();return true;}catch{if(!this.saveWarn){this.ui.toast('Η αποθήκευση του browser είναι γεμάτη ή απενεργοποιημένη.','warning');this.saveWarn=true;}return false;}
  }
  inspect(){return {version:'1.3.0',started:this.started,paused:this.paused,ended:this.ended,view:this.viewMode,elapsed:Math.round(this.elapsed),player:{x:this.player.x,y:this.player.y,z:this.player.z,hp:this.player.hp,stomach:this.player.stomach,level:this.player.level,grounded:this.player.grounded,swimming:this.player.swimming},frogs:this.frogs.length,allies:this.allies().length,population:this.allies().length+(this.player.dead?0:1),worldRadius:this.world.radius||WORLD_RADIUS,stronghold:this.strongholdSnapshot(),enemies:this.frogs.filter(f=>f.team.startsWith('enemy')&&!f.dead&&!f.surrendered).length,camps:this.camps.map(c=>({name:c.name,team:c.team,hp:c.hp,destroyed:c.destroyed})),predators:this.predators.map(p=>({type:p.type,phase:p.phase,hp:p.hp,x:p.x,z:p.z})),hunt:this.hunt?.type,resources:this.resources,objective:this.objective(),performance:{fps:Math.round(this.fps),drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures},rigs:this.frogs[0].model.stats};}
}


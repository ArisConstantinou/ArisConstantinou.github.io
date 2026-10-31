import * as THREE from 'three';
import {applyFlightAttitude} from './arcade-wall-controls.js';
import {catchLedge,stepLedge} from './arcade-ledge-movement.js';
import {outdoorLight} from './arcade-graphics-sample.js';
import {createMenuContact} from './arcade-menu-contact.js';
import climbTemplate from './arcade-menu-climb.json' with {type:'json'};
const IDS=['heavy','medium','skinny'],DELAY=.30,JUMP=.65;
const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};

export function installCartoonMenu(game){
 const doc=game.ui.ownerDocument,win=doc.defaultView,boot=doc.getElementById('boot'),top=game.ui.querySelector('.menu-frogs-top'),bottom=game.ui.querySelector('.menu-frogs-settings');top.hidden=bottom.hidden=true;
 const reduced=win.matchMedia('(prefers-reduced-motion: reduce)');let stage=null,initializing=false,destroyed=false,visible=false,started=false,settled=false,failed=false,startedAt=0,dirty=true,generation=0,allocatedCount=0,preparedCount=0,disposedCount=0;
 const restCache=new Map();
 const clock=()=>win.performance.now()/1000;
 function destroyStage(){if(!stage)return;const old=stage;stage=null;old.dispose();disposedCount++;}
 function beginStage(){
  initializing=true;const token=++generation;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(game.renderer.getPixelRatio());renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.setClearColor(0,0);
  const canvas=renderer.domElement;canvas.className='menu-live-canvas';canvas.dataset.engine='three-native-character-rigs';canvas.setAttribute('aria-hidden','true');canvas.style.cssText='position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;visibility:hidden';game.$('arcade-menu').append(canvas);
  const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,.1,10000);camera.position.set(0,0,5000);camera.lookAt(0,0,0);const environment=outdoorLight(renderer);scene.environment=environment.texture;scene.add(new THREE.HemisphereLight('#e8f5ff','#537546',1.1));
  for(const [position,intensity,color]of [[[3,5,5],2.75,'#fff0cf'],[[-4,2,3],.7,'#b8dcff']]){const light=new THREE.DirectionalLight(color,intensity);light.position.fromArray(position).multiplyScalar(100);scene.add(light);}
  const textures=new Map(),geometries=new Map(),owned=new Set(),ownGeometry=g=>{if(owned.has(g))return g;if(!geometries.has(g)){const copy=g.clone();geometries.set(g,copy);owned.add(copy);}return geometries.get(g);};
  const isolateMaterial=material=>{if(!material)return;for(const[key,value]of Object.entries(material))if(value?.isTexture){if(!textures.has(value)){const copy=value.clone();copy.needsUpdate=true;textures.set(value,copy);}material[key]=textures.get(value);}};
  const frogs=IDS.map(id=>{
   const actor={id:'menu-'+id,characterClass:id,flight:null,ko:false,hit:0,dizzyTime:0,classAction:null,catapultId:null,airSpit:0,hop:0,idle:0,eliminated:false},model=game.assetFactory({characterClass:id,actor}),placement=new THREE.Group();scene.add(placement);placement.add(model.group);
   model.group.traverse(o=>{if(o.isMesh){for(const m of Array.isArray(o.material)?o.material:[o.material])isolateMaterial(m);o.castShadow=o.receiveShadow=false;if(id==='heavy')o.renderOrder=2;}});
   if(model.climbContact)for(const material of[model.climbContact.skin.material,model.climbContact.skin.depth,model.climbContact.skin.distance])isolateMaterial(material);
   const originalGeometries=[];model.group.traverse(o=>{if(o.isMesh)originalGeometries.push(o.geometry);});const contact=createMenuContact(model),fixture=id==='heavy'?structuredClone(climbTemplate):null;
   const frog={id,actor,model,placement,contact,fixture,state:{events:[],bases:[]},rest:null,pads:null,bounds:null,phase:'rest',caught:false,finished:false};
   model.beginPose();model.group.position.set(0,0,0);model.group.rotation.set(0,0,0);model.update(.11,{speed:0,hop:{phase:'land',progress:1}});model.update(.11,{speed:0,hop:{phase:'land',progress:1}});
   const cached=restCache.get(id);
   if(cached){frog.rootY=cached.rootY;frog.pads=cached.pads;frog.rest=cached.rest;frog.bounds=cached.bounds;}
   else{
    frog.pads=contact.plant();
    for(let attempt=0;attempt<3;attempt++){const gap=Math.max(...frog.pads.map(p=>p.point[1]));if(gap<.002||model.group.position.y<=-.16)break;model.group.position.y-=Math.min(.08,gap+.005,.16+model.group.position.y);model.group.updateMatrixWorld(true);frog.pads=contact.plant();}
    frog.rootY=model.group.position.y;frog.rest=Object.fromEntries(Object.entries(model.bones).map(([n,b])=>[n,{p:b.position.clone(),q:b.quaternion.clone(),s:b.scale.clone()}]));frog.bounds=new THREE.Box3().setFromObject(model.group,true);restCache.set(id,{rootY:frog.rootY,rest:frog.rest,pads:frog.pads,bounds:frog.bounds});
   }
   return frog;
  });
  const occluder=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({colorWrite:false,depthWrite:true,side:THREE.DoubleSide}));occluder.renderOrder=1;occluder.position.z=1000;occluder.visible=false;scene.add(occluder);
  function ownMeshes(){for(const f of frogs)f.model.group.traverse(o=>{if(o.isMesh)o.geometry=ownGeometry(o.geometry);});}
  const identity=f=>{f.placement.position.set(0,0,0);f.placement.scale.setScalar(1);f.placement.rotation.set(0,0,0);f.placement.updateMatrixWorld(true);};
  function rest(f,dt=.11){
   const m=f.model;f.actor.flight=null;m.beginPose();m.group.position.set(0,f.rootY,f.id==='heavy'&&f.caught?.8:0);m.group.rotation.set(0,0,0);m.update(dt,{speed:0,hop:{phase:'land',progress:1}});m.climbContact?.update(f.actor,f.state,()=>-3,dt);
   if(!m.contactActive){for(const[n,b]of Object.entries(m.bones)){const r=f.rest[n];b.position.copy(r.p);b.quaternion.copy(r.q);b.scale.copy(r.s);}m.flightPivot.position.set(0,0,0);m.flightPivot.rotation.set(0,0,0);}f.phase='rest';m.group.updateMatrixWorld(true);
  }
  function layout(){
   const W=win.innerWidth,H=win.innerHeight;renderer.setPixelRatio(game.renderer.getPixelRatio());renderer.setSize(W,H,false);camera.left=-W/2;camera.right=W/2;camera.top=H/2;camera.bottom=-H/2;camera.updateProjectionMatrix();
   const roundElement=game.$('round-actions'),round=roundElement.getBoundingClientRect(),settings=game.$('settings-button').getBoundingClientRect(),radius=Math.max(parseFloat(win.getComputedStyle(roundElement).borderTopLeftRadius)||0,parseFloat(win.getComputedStyle(roundElement).borderTopRightRadius)||0),flat=round.width-2*radius-4;
   frogs.forEach((f,index)=>{
    const size=f.bounds.getSize(new THREE.Vector3()),center=f.bounds.getCenter(new THREE.Vector3());let width=index===2?round.width*.31:Math.min(round.width*.46,(flat-4)/2),scale=width/size.x;
    if(index===2&&settings.top>round.bottom+20)scale=Math.min(scale,Math.max(42,settings.top-round.bottom-10)/f.bounds.max.y);
    const x=index===0?round.left+radius+2+flat*.25:index===1?round.right-radius-2-flat*.25:settings.left+Math.max(38+size.x*scale/2,settings.width*.23),rim=index===2?settings.top:round.top;
    f.scale=scale;f.baseX=x-center.x*scale-W/2;f.baseY=H/2-rim-2;f.rim=rim;f.travel=index===1?W-x+width:-x-width;f.startY=H-rim+size.y*scale+30;
   });
   occluder.scale.set(round.width*.52,round.height,1);occluder.position.set(round.left+round.width*.26-W/2,H/2-round.top-round.height/2,1000);dirty=false;
  }
  function present(f,dx=0,dy=0){f.placement.scale.setScalar(f.scale);f.placement.position.set(f.baseX+dx,f.baseY-dy,0);f.placement.updateMatrixWorld(true);}
  const readyStage={renderer,canvas,scene,camera,frogs,textures,geometries,layout,identity,rest,ownMeshes,present,occluder,
   dispose(){for(const f of frogs)f.model.dispose();for(const t of textures.values())t.dispose();for(const g of geometries.values())g.dispose();occluder.geometry.dispose();occluder.material.dispose();environment.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();},
  };stage=readyStage;allocatedCount++;
  // Compile both real native and real contact-skin programs before the entrance.
  ownMeshes();layout();for(const f of frogs)present(f);
  const cancelled=()=>destroyed||token!==generation||game.$('arcade-menu').hidden;
  const initialize=async()=>{
   await renderer.compileAsync(scene,camera);if(cancelled()){initializing=false;destroyStage();return;}renderer.setRenderTarget(null);renderer.render(scene,camera);
   if(!settled&&!reduced.matches){
    const heavy=frogs[0];identity(heavy);heavy.actor.flight={kind:'jump',jumps:1,y:heavy.fixture.start.y};catchLedge(heavy.state,heavy.actor,heavy.fixture);heavy.actor.flight.time=.3;
    heavy.model.beginPose();heavy.model.group.position.set(heavy.fixture.start.x,heavy.fixture.start.y,heavy.fixture.start.z);heavy.model.update(0,{speed:0,hop:{phase:'idle',progress:0}});heavy.model.climbContact.update(heavy.actor,heavy.state,()=>-3,.3);
    ownMeshes();present(heavy);await renderer.compileAsync(scene,camera);if(cancelled()){initializing=false;destroyStage();return;}renderer.render(scene,camera);identity(heavy);rest(heavy,.21);rest(heavy,.21);ownMeshes();present(heavy);
   }
   renderer.setRenderTarget(null);renderer.getContext().finish();
   for(const f of frogs){identity(f);rest(f);ownMeshes();present(f);}preparedCount++;
   initializing=false;
   if(destroyed||token!==generation||game.$('arcade-menu').hidden){destroyStage();return;}
   initializing=false;dirty=true;if(!started){started=true;startedAt=clock();settled ||= reduced.matches;}render(0);
  };
  initialize().catch(error=>{initializing=false;failed=true;destroyStage();console.error('Live menu characters',error);});
 }
 function render(dt){
  if(!stage||initializing||!visible)return;const {frogs,identity,rest,present,ownMeshes,renderer,scene,camera,occluder}=stage;if(dirty)stage.layout();
  const elapsed=clock()-startedAt-DELAY;
  for(const [index,f]of frogs.entries()){
   identity(f);f.model.group.visible=settled||elapsed>=(index===0?0:index===1?.08:.24);let dx=0,dy=0;
   if(settled){rest(f,.21);rest(f,.21);}
   else{
    const time=elapsed-(index===0?0:index===1?.08:.24),m=f.model,a=f.actor;
    if(time<0){rest(f,dt);}
    else if(index===0&&time>=JUMP){
     if(!f.caught){catchLedge(f.state,a,f.fixture);f.caught=true;}
     if(a.flight?.kind==='ledge'){f.state.events.length=0;stepLedge(f.state,a,{},dt,()=>-3,()=>[{id:f.fixture.id,kind:'rock',y:0}]);}
     if(a.flight?.kind==='ledge'){
      m.beginPose();m.group.position.set(a.x,a.flight.y,a.z);m.group.rotation.set(0,0,0);m.update(dt,{speed:0,hop:{phase:'idle',progress:0}});m.climbContact.update(a,f.state,()=>-3,dt);f.phase='grip-struggle';
     }else{rest(f,dt);f.finished=!m.contactActive;}
    }else if(index!==0&&time>=1.1){rest(f,dt);f.finished=true;}
    else{
     const duration=index===0?JUMP:.80,p=Math.min(1,time/duration),landing=index!==0&&time>.80;
     if(landing){a.flight=null;m.beginPose();m.group.position.set(0,f.rootY*smooth((time-.80)/.30),0);m.group.rotation.set(0,0,0);m.update(dt,{speed:0,hop:{phase:'land',progress:Math.min(1,(time-.80)/.30)}});applyFlightAttitude(m,null,dt);f.phase='landing';}
     else{
      a.flight??={kind:'jump',jumps:1,vx:0,vz:0,vy:0};a.flight.kind='jump';a.flight.vx=index===0?0:-2*f.travel*(1-p)/(f.scale*duration);a.flight.vy=6*(1-2*p);
      m.beginPose();m.group.position.set(0,index===0?f.fixture.start.y:0,index===0?f.fixture.start.z:0);m.group.rotation.set(0,index===0?.6*(1-smooth((p-.55)/.45)):(index===1?-Math.PI/2:Math.PI/2)*(1-smooth((p-.78)/.22)),0);m.update(dt,{speed:0,locomotion:{x:0},hop:{phase:'air',progress:p}});applyFlightAttitude(m,a.flight,dt);m.climbContact?.update(a,f.state,()=>-3,dt);f.phase='jump';
     }
     if(index===0)dy=f.startY*(1-p)**2;else{dx=f.travel*(1-p)**2;dy=24*(1-p)-Math.min(110,f.bounds.getSize(new THREE.Vector3()).y*f.scale*.7)*4*p*(1-p);}
    }
   }
   present(f,dx,dy);
  }
  occluder.visible=!settled&&frogs[0].caught&&!frogs[0].finished;ownMeshes();renderer.render(scene,camera);stage.canvas.style.visibility='visible';
  if(!settled&&frogs.every(f=>f.finished)){settled=true;dirty=true;}
 }
 function skip(){dirty=true;if(started||initializing){settled=true;if(stage&&!initializing)render(0);}}
 win.addEventListener('resize',skip);reduced.addEventListener('change',skip);
 const ready=Promise.resolve().then(()=>{if(boot&&!boot.classList.contains('has-error'))boot.remove();return true;});
 return{ready,
  update(dt=1/60){
   if(destroyed)return;const old=visible;visible=!doc.hidden&&!game.$('arcade-menu').hidden&&!game.$('menu-main').hidden;
   if(!visible){if(old||started||initializing||game.$('arcade-menu').hidden)settled=true;if(stage)stage.canvas.style.visibility='hidden';if(game.$('arcade-menu').hidden&&!initializing)destroyStage();return;}
   if(!old||stage&&stage.renderer.getPixelRatio()!==game.renderer.getPixelRatio())dirty=true;
   if(!stage&&!initializing&&game.assetStatus?.ready)beginStage();
   if(stage&&!initializing&&(!settled||dirty||!old))render(Math.max(0,Math.min(.05,dt)));
  },
  inspect(){
   const contacts=stage?stage.frogs.map(f=>{const pads=f.model.ledgeContacts?.length?f.model.ledgeContacts:f.pads;return{character:f.id,phase:f.phase,currentClip:f.model.currentClip,bones:f.model.skeleton.bones.length,contactPhase:f.model.contactPhase,seatOffset:f.rootY,pads:pads?.map(p=>{const v=new THREE.Vector3().fromArray(p.point).applyMatrix4(f.placement.matrixWorld);return{side:p.side,fore:p.fore??true,x:v.x+win.innerWidth/2,y:win.innerHeight/2-v.y,gap:win.innerHeight/2-v.y-f.rim,error:p.error,phase:p.phase};}),joints:Object.fromEntries(['hip-1','knee-1','hip1','knee1','elbow-1','elbow1'].map(n=>[n,f.model.bones[n].quaternion.toArray()]))};}):[];
   return{ready:!!stage&&!initializing,failed,visible,started,settled,phase:!started?'waiting':settled?'settled':clock()-startedAt<DELAY?'delay':stage?.frogs[0].phase,elapsedMs:started?Math.round((clock()-startedAt)*1000):0,faceMode:'live-game-character-rigs',live3D:true,sourceAnimations:['Jump','Land','native-climb-controller'],characters:IDS,reducedMotion:reduced.matches,contacts,resources:{activeRenderer:!!stage,initializing,allocatedCount,preparedCount,disposedCount,textures:stage?.renderer.info.memory.textures||0,geometries:stage?.renderer.info.memory.geometries||0,privateTextures:stage?.textures.size||0,privateGeometries:stage?.geometries.size||0}};
  },
  destroy(){destroyed=true;generation++;win.removeEventListener('resize',skip);reduced.removeEventListener('change',skip);if(!initializing)destroyStage();},
 };
}

import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {ARTILLERY,CATAPULTS} from './arcade-artillery.js';

const UP=new THREE.Vector3(0,1,0),TAU=Math.PI*2;
const clamp=(x,min=0,max=1)=>Math.max(min,Math.min(max,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const TEAM_COLORS=['#b8e76c','#ef886a','#be94e0'];
const SEAT_HEIGHT=.45;

// Stationary swamp catapults. All resource and impact decisions remain in the
// deterministic model; this class only displays that state and its events.
export class ArtilleryView {
 constructor(game){
  this.game=game;this.scene=game.scene;this.clock=0;this.machines=new Map();this.platforms=new Map();this.shellMeshes=new Map();
  this.dummy=new THREE.Object3D();this._vector=new THREE.Vector3();this._direction=new THREE.Vector3();
  this.geometry={box:new THREE.BoxGeometry(1,1,1),cylinder:new THREE.CylinderGeometry(.5,.5,1,8),rock:new THREE.DodecahedronGeometry(.4,0),leaf:new THREE.SphereGeometry(1,10,5),cup:new THREE.SphereGeometry(.38,10,6,0,TAU,Math.PI/2,Math.PI/2),ring:new THREE.RingGeometry(.94,1,48),disc:new THREE.CircleGeometry(1,32),rope:new THREE.TorusGeometry(.14,.027,5,10)};
  this.material={wood:new THREE.MeshToonMaterial({color:'#a47746'}),lightWood:new THREE.MeshToonMaterial({color:'#d4ac64'}),darkWood:new THREE.MeshToonMaterial({color:'#67503c'}),rope:new THREE.MeshToonMaterial({color:'#d3c593'}),leaf:new THREE.MeshToonMaterial({color:'#5c9b67'}),stone:new THREE.MeshToonMaterial({color:'#90999b',emissive:'#172023',emissiveIntensity:.16}),preview:new THREE.LineDashedMaterial({color:'#e6f7a1',dashSize:.45,gapSize:.25,transparent:true,opacity:.85,depthWrite:false}),landing:new THREE.MeshBasicMaterial({color:'#d6ed8b',transparent:true,opacity:.72,side:THREE.DoubleSide,depthWrite:false})};
  this.material.ramp=new THREE.MeshToonMaterial({color:'#b18b59',side:THREE.DoubleSide});
  for(const [index,definition] of CATAPULTS.entries()){
   const platform=this.createPlatform(definition);if(platform)this.platforms.set(definition.id,platform);
   this.machines.set(definition.id,this.createMachine(definition,index));
  }
  const points=new Float32Array(33*3),geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(points,3));
  this.previewLine=new THREE.Line(geometry,this.material.preview);this.previewLine.name='catapult-trajectory-preview';this.previewLine.frustumCulled=false;this.previewLine.visible=false;this.scene.add(this.previewLine);
  this.landingMarker=new THREE.Mesh(this.geometry.ring,this.material.landing);this.landingMarker.name='catapult-landing-preview';this.landingMarker.rotation.x=-Math.PI/2;this.landingMarker.scale.setScalar(ARTILLERY.blastRadius);this.landingMarker.visible=false;this.scene.add(this.landingMarker);
 }

 ground(x,z){return this.game.ground(x,z);}
 mesh(parent,geometry,material,position=[0,0,0],scale=[1,1,1]){
  const mesh=new THREE.Mesh(geometry,material);mesh.position.fromArray(position);mesh.scale.fromArray(scale);parent.add(mesh);return mesh;
 }
 createPlatform(definition){
  const floor=this.game.houseFloors?.find(item=>item.id===definition.enclosureId);if(!floor)return null;
  const group=new THREE.Group();group.name=`${definition.id}-level-platform`;group.position.set(floor.x,floor.height,floor.z);this.scene.add(group);
  const deck=this.mesh(group,this.geometry.box,this.material.darkWood,[0,-.1,0],[floor.halfWidth*2,.2,floor.halfDepth*2]);deck.name='catapult-floor-at-operator-height';
  const planks=[],supports=[];
  for(let z=-floor.halfDepth+.2;z<floor.halfDepth;z+=.4){const part=this.geometry.box.clone();part.scale(floor.halfWidth*2-.06,.025,.355);part.translate(0,-.012,Math.min(z,floor.halfDepth-.2));planks.push(part);}
  for(const x of [-floor.halfWidth+.18,floor.halfWidth-.18])for(const z of [-floor.halfDepth+.18,floor.halfDepth-.18]){
   const natural=this.game.world?.getSurface(floor.x+x,floor.z+z).height??floor.minimum,height=Math.max(.2,floor.height-natural),part=this.geometry.box.clone();
   part.scale(.3,height,.3);part.translate(x,-height*.5,z);supports.push(part);
  }
  for(const [parts,material] of [[planks,this.material.lightWood],[supports,this.material.darkWood]]){
   const geometry=mergeGeometries(parts);for(const part of parts)part.dispose();const mesh=this.mesh(group,geometry,material);mesh.userData.ownedGeometry=true;
  }
  const r=floor.ramp,vertices=[],indices=[];
  for(let row=0;row<=r.rows;row++)for(let col=0;col<=r.cols;col++){
   const along=row/r.rows*r.length,across=(col/r.cols*2-1)*r.halfWidth;
   vertices.push(r.x+r.dx*along+r.rightX*across-floor.x,r.heights[row*(r.cols+1)+col]-floor.height,r.z+r.dz*along+r.rightZ*across-floor.z);
  }
  for(let row=0;row<r.rows;row++)for(let col=0;col<r.cols;col++){const a=row*(r.cols+1)+col,b=a+1,c=a+r.cols+1,d=c+1;indices.push(a,c,b,b,c,d);}
  const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));geometry.setIndex(indices);geometry.computeVertexNormals();
  const ramp=this.mesh(group,geometry,this.material.ramp);ramp.name=`${definition.id}-walkable-entrance-ramp`;ramp.userData.ownedGeometry=true;
  return {group,deck,ramp,floor};
 }
 createMachine(definition,index){
  const group=new THREE.Group();group.name=definition.id;group.position.set(definition.x,this.ground(definition.x,definition.z),definition.z);this.scene.add(group);
  const turret=new THREE.Group();turret.name='wooden-catapult-frame';group.add(turret);
  const parts={wood:[],lightWood:[],darkWood:[],rope:[]};
  const box=(kind,x,y,z,sx,sy,sz)=>{const geometry=this.geometry.box.clone();geometry.scale(sx,sy,sz);geometry.translate(x,y,z);parts[kind].push(geometry);};
  const beam=(kind,a,b,width)=>{const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),direction=to.clone().sub(from),geometry=this.geometry.cylinder.clone();geometry.scale(width,direction.length(),width);geometry.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP,direction.normalize()));geometry.translate(...from.add(to).multiplyScalar(.5).toArray());parts[kind].push(geometry);};
  // Fixed log skids and cross-planks anchor the machine to its side of the swamp.
  for(const side of [-1,1])box('wood',side*.82,.18,.6,.26,.28,2.65);
  for(const z of [-.55,.12,.83,1.68])box('lightWood',0,.29,z,1.98,.14,.22);
  box('darkWood',0,.34,-.03,1.2,.14,.93);
  for(const side of [-1,1]){
   beam('wood',[side*.76,.3,.1],[side*.76,.99,1],.17);
   beam('wood',[side*.76,.3,1.83],[side*.76,.99,1],.17);
   beam('rope',[side*.77,.48,.35],[side*.77,.58,.47],.21);
   beam('rope',[side*.77,.48,1.61],[side*.77,.58,1.49],.21);
  }
  beam('darkWood',[-.94,.85,1],[.94,.85,1],.22);
  box('lightWood',0,.52,1.66,1.72,.17,.17);
  for(const [kind,list] of Object.entries(parts)){
   if(!list.length)continue;const merged=mergeGeometries(list);for(const item of list)item.dispose();
   const mesh=this.mesh(turret,merged,this.material[kind]);mesh.userData.ownedGeometry=true;
  }
  const seat=this.mesh(turret,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);seat.name='operator-seat';
  // A faction leaf identifies ownership without another text panel.
  const factionMaterial=new THREE.MeshToonMaterial({color:TEAM_COLORS[index%TEAM_COLORS.length]});
  const flag=this.mesh(turret,this.geometry.leaf,factionMaterial,[-.98,.64,1.65],[.13,.45,.3]);flag.rotation.z=-.3;flag.name='side-leaf';
  const arm=new THREE.Group();arm.name='throwing-arm';arm.position.set(0,.85,1);turret.add(arm);
  this.mesh(arm,this.geometry.box,this.material.lightWood,[0,.07,0],[.18,1.2,.2]);
  this.mesh(arm,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);
  const bowl=this.mesh(arm,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);bowl.name='stone-cup';
  const loadedRock=this.mesh(arm,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);loadedRock.name='loaded-catapult-stone';
  arm.rotation.x=-.45;
  const winch=new THREE.Group();winch.name='reload-winch';winch.position.set(0,.61,.53);turret.add(winch);
  const axle=this.mesh(winch,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);axle.rotation.z=Math.PI/2;
  for(const side of [-1,1]){
   const grip=this.mesh(winch,this.geometry.box,this.material.lightWood,[side*.47,.12,0],[.13,.35,.12]);grip.name='operator-handle';
   const wrap=this.mesh(turret,this.geometry.rope,this.material.rope,[side*.76,.85,1],[1,1,1]);wrap.rotation.y=Math.PI/2;
  }
  // Two stock stones beside the rails communicate ammunition at the station.
  const pile=[];for(let i=0;i<2;i++){const stone=this.mesh(turret,this.geometry.rock,this.material.stone,[1.17,.29,.72+i*.64],[.65,.6,.68]);stone.rotation.set(i*.7,.6+i,0);pile.push(stone);}
  const ringMaterial=new THREE.MeshBasicMaterial({color:TEAM_COLORS[index%TEAM_COLORS.length],transparent:true,opacity:.25,side:THREE.DoubleSide,depthWrite:false});
  const ring=this.mesh(group,this.geometry.ring,ringMaterial,[0,.045,.4],[1.65,1.65,1.65]);ring.rotation.x=-Math.PI/2;ring.name='catapult-station-ring';
  return {group,turret,arm,winch,loadedRock,pile,ring,factionMaterial,ringMaterial,definition,launchAge:Infinity,yaw:Math.PI};
 }

 operatorPose(id){
  const machine=this.machines.get(typeof id==='string'?id:id?.id);if(!machine)return null;
  const state=this.game.state.catapults?.find(item=>item.id===machine.definition.id);
  return {x:machine.definition.x,y:this.ground(machine.definition.x,machine.definition.z)+SEAT_HEIGHT,z:machine.definition.z,yaw:state?Math.atan2(state.aimX,state.aimZ):machine.yaw};
 }

 consumeEvent(event){
  if(event.type==='stoneShot'){
   const station=this.machines.get(event.catapultId);if(station){station.launchAge=0;station.arm.rotation.x=0;station.loadedRock.visible=false;}
  }
 }

 shellPoint(shell,t,out=this._vector){
  const x=lerp(shell.startX,shell.tx,t),z=lerp(shell.startZ,shell.tz,t);
  const startY=this.ground(shell.startX,shell.startZ)+(shell.startHeight??1.6),endY=this.ground(shell.tx,shell.tz)+.12;
  return out.set(x,lerp(startY,endY,t)+4*shell.arcHeight*t*(1-t),z);
 }
 createShell(shell){
  const stone=this.mesh(this.scene,this.geometry.rock,this.material.stone,undefined,[1.05,.95,1.14]);stone.name=`catapult-stone-${shell.id}`;
  const material=new THREE.MeshBasicMaterial({color:shell.owner==='player'?'#e4c36e':'#f17e62',transparent:true,opacity:.45,side:THREE.DoubleSide,depthWrite:false});
  const ring=this.mesh(this.scene,this.geometry.ring,material,[shell.tx,this.ground(shell.tx,shell.tz)+.055,shell.tz],[ARTILLERY.blastRadius,ARTILLERY.blastRadius,ARTILLERY.blastRadius]);ring.rotation.x=-Math.PI/2;ring.name=`catapult-danger-${shell.id}`;
  const core=this.mesh(this.scene,this.geometry.disc,material,[shell.tx,this.ground(shell.tx,shell.tz)+.05,shell.tz],[.13,.13,.13]);core.rotation.x=-Math.PI/2;
  return {stone,ring,core,material};
 }
 updatePreview(){
  const state=this.game.state,player=state.actors[0],aim=this.game.catapultAim;
  const station=state.catapults?.find(item=>item.id===player.catapultId&&item.occupant===player.id);
  const target=aim?.target,valid=this.game.running&&aim?.active&&station&&target&&Number.isFinite(target.x)&&Number.isFinite(target.z)&&!player.ko&&player.dizzyTime<=0;
  this.previewLine.visible=!!valid;this.landingMarker.visible=!!valid;if(!valid)return;
  const dx=target.x-station.x,dz=target.z-station.z,length=Math.hypot(dx,dz)||1;
  const shell={startX:station.x+dx/length,startZ:station.z+dz/length,startHeight:1.6,tx:target.x,tz:target.z,arcHeight:ARTILLERY.arcHeight};
  const positions=this.previewLine.geometry.attributes.position;
  for(let i=0;i<positions.count;i++){const point=this.shellPoint(shell,i/(positions.count-1));positions.setXYZ(i,point.x,point.y,point.z);}
  positions.needsUpdate=true;this.previewLine.computeLineDistances();
  this.landingMarker.position.set(target.x,this.ground(target.x,target.z)+.065,target.z);this.landingMarker.scale.setScalar(ARTILLERY.blastRadius);
  const ready=station.loaded&&station.cooldown<=0,blocked=target.valid===false;
  this.material.preview.color.set(blocked?'#ef826d':ready?'#e6f7a1':'#b7bfaf');this.material.landing.color.set(blocked?'#ef826d':ready?'#d6ed8b':'#b7bfaf');
 }
 poseOperator(actor,machine,station){
  const index=this.game.state.actors.findIndex(item=>item.id===actor.id),model=this.game.models?.[index];if(!model?.bones||actor.ko)return;
  const bones=model.bones,reloading=station.cooldown>0,stroke=reloading?Math.sin(this.clock*9)*.13:0;
  // Set a pose instead of accumulating offsets: paused frames may not update
  // the underlying rig, and must not bend the operator's arms farther each time.
  for(const side of [-1,1]){
   const shoulder=bones[`shoulder${side}`],elbow=bones[`elbow${side}`],wrist=bones[`wrist${side}`];
   if(shoulder){shoulder.rotation.x=-.53-stroke*side;shoulder.rotation.z=side*.08;}
   if(elbow)elbow.rotation.x=.45+stroke*side;
   if(wrist)wrist.rotation.x=-.18;
  }
  if(bones.spine)bones.spine.rotation.x=.08+Math.abs(stroke)*.12;
  if(bones.head)bones.head.rotation.x=-.04;
 }

 update(dt=0){
  const advancing=this.game.running?Math.max(0,Math.min(.1,dt)):0;this.clock+=advancing;
  const state=this.game.state;
  for(const station of state.catapults||[]){
   const machine=this.machines.get(station.id);if(!machine)continue;
   machine.group.position.y=this.ground(station.x,station.z);
   const yaw=Math.atan2(station.aimX,station.aimZ);machine.yaw=yaw;machine.turret.rotation.y=yaw;
   if(Number.isFinite(machine.launchAge))machine.launchAge+=advancing;
   const aim=this.game.catapultAim,playerUsing=station.occupant==='player'&&aim?.active;
   let wanted=playerUsing?-.74:-.45;
   if(station.cooldown>0){
    const recharge=1-clamp(station.cooldown/(ARTILLERY.cooldown||3));wanted=lerp(.6,-.45,recharge*recharge);
    machine.winch.rotation.x=this.clock*7;
   }else machine.winch.rotation.x=0;
   if(machine.launchAge<.18)wanted=.6*Math.sin(clamp(machine.launchAge/.09)*Math.PI/2);
   machine.arm.rotation.x+=(wanted-machine.arm.rotation.x)*(1-Math.exp(-advancing*18));
   machine.loadedRock.visible=!!station.loaded;machine.ring.material.opacity=station.occupant ? .42 : .2;
   const occupant=state.actors.find(actor=>actor.id===station.occupant);if(occupant)this.poseOperator(occupant,machine,station);
  }
  for(const shell of state.shells||[]){
   let visual=this.shellMeshes.get(shell.id);if(!visual){visual=this.createShell(shell);this.shellMeshes.set(shell.id,visual);}
   const t=clamp(shell.age/shell.duration);this.shellPoint(shell,t,visual.stone.position);
   visual.stone.rotation.set(shell.age*4,shell.age*3,shell.age*1.5);visual.material.opacity=.35+.22*t+.08*Math.sin(this.clock*13);
  }
  for(const [id,visual] of this.shellMeshes)if(!(state.shells||[]).some(shell=>shell.id===id)){visual.stone.removeFromParent();visual.ring.removeFromParent();visual.core.removeFromParent();visual.material.dispose();this.shellMeshes.delete(id);}
  this.updatePreview();
 }

 dispose(){
  for(const platform of this.platforms.values()){platform.group.removeFromParent();platform.group.traverse(item=>{if(item.userData.ownedGeometry)item.geometry.dispose();});}
  for(const machine of this.machines.values()){machine.group.removeFromParent();machine.group.traverse(item=>{if(item.userData.ownedGeometry)item.geometry.dispose();});machine.factionMaterial.dispose();machine.ringMaterial.dispose();}
  for(const visual of this.shellMeshes.values()){visual.stone.removeFromParent();visual.ring.removeFromParent();visual.core.removeFromParent();visual.material.dispose();}
  this.previewLine.removeFromParent();this.previewLine.geometry.dispose();this.landingMarker.removeFromParent();
  for(const geometry of Object.values(this.geometry))geometry.dispose();for(const material of Object.values(this.material))material.dispose();
  this.machines.clear();this.platforms.clear();this.shellMeshes.clear();
 }
}

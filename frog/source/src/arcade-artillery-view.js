import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {plankedFloorGeometry} from './arcade-floor-geometry.js';
import {ARTILLERY,CATAPULTS} from './arcade-artillery.js';

const UP=new THREE.Vector3(0,1,0),TAU=Math.PI*2;
const clamp=(x,min=0,max=1)=>Math.max(min,Math.min(max,x));
const lerp=(a,b,t)=>a+(b-a)*t;
const TEAM_COLORS=['#b8e76c','#ef886a','#be94e0'];
const SEAT_HEIGHT=.45;
const PREVIEW_BEADS=8;

function timberTexture(){
 const width=64,height=128,data=new Uint8Array(width*height*4);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const u=x/width,v=y/height,grain=Math.sin(u*31+Math.sin(v*7)*.8)+.35*Math.sin(u*79+Math.sin(v*11));
  const knot=Math.hypot((u-.36)*2.2,(v-.58)*5.4),rings=Math.sin(knot*27)*Math.exp(-knot*knot*5);
  const value=Math.round(clamp(.88+grain*.055-rings*.07,.7,1)*255),offset=(y*width+x)*4;
  data[offset]=data[offset+1]=data[offset+2]=value;data[offset+3]=255;
 }
 const texture=new THREE.DataTexture(data,width,height,THREE.RGBAFormat);texture.colorSpace=THREE.SRGBColorSpace;
 texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.magFilter=THREE.LinearFilter;texture.minFilter=THREE.LinearMipmapLinearFilter;texture.generateMipmaps=true;texture.needsUpdate=true;
 return texture;
}

function windlassRopeGeometry(){
 const points=[];
 for(let i=0;i<=96;i++){const t=i/96,angle=t*TAU*8;points.push(new THREE.Vector3(lerp(-.28,.28,t),Math.cos(angle)*.145,Math.sin(angle)*.145));}
 return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),112,.021,5,false);
}

// Stationary swamp catapults. All resource and impact decisions remain in the
// deterministic model; this class only displays that state and its events.
export class ArtilleryView {
 constructor(game){
  this.game=game;this.scene=game.scene;this.clock=0;this.previewClock=0;this.previewState=null;this.machines=new Map();this.platforms=new Map();this.shellMeshes=new Map();
  this.dummy=new THREE.Object3D();this._vector=new THREE.Vector3();this._direction=new THREE.Vector3();
  this.geometry={box:new THREE.BoxGeometry(1,1,1),cylinder:new THREE.CylinderGeometry(.5,.5,1,8),rock:new THREE.DodecahedronGeometry(.4,0),leaf:new THREE.SphereGeometry(1,10,5),cup:new THREE.SphereGeometry(.38,10,6,0,TAU,Math.PI/2,Math.PI/2),ring:new THREE.RingGeometry(.94,1,48),disc:new THREE.CircleGeometry(1,32),rope:new THREE.TorusGeometry(.14,.027,5,10)};
  this.geometry.winchRope=windlassRopeGeometry();this.geometry.cupRim=new THREE.TorusGeometry(.38,.035,5,18);
  const rockPositions=this.geometry.rock.attributes.position,rockColors=new Float32Array(rockPositions.count*3);
  for(let i=0;i<rockPositions.count;i++){
   const x=rockPositions.getX(i),y=rockPositions.getY(i),z=rockPositions.getZ(i),wear=.95+.05*Math.sin(x*14+y*8+z*11),shade=.72+.22*(Math.sin(x*9+y*5-z*6)+1)/2;
   rockPositions.setXYZ(i,x*wear,y*wear,z*wear);rockColors.set([shade,shade*.99,shade*.96],i*3);
  }
  this.geometry.rock.setAttribute('color',new THREE.BufferAttribute(rockColors,3));this.geometry.rock.computeVertexNormals();
  const timber=timberTexture();this.textures=[timber];
  this.material={wood:new THREE.MeshToonMaterial({color:'#88613d',map:timber}),lightWood:new THREE.MeshToonMaterial({color:'#bc925b',map:timber}),darkWood:new THREE.MeshToonMaterial({color:'#514233',map:timber}),deck:new THREE.MeshToonMaterial({color:'#c9a971'}),iron:new THREE.MeshToonMaterial({color:'#40534b'}),ironEdge:new THREE.MeshToonMaterial({color:'#839483'}),rope:new THREE.MeshToonMaterial({color:'#d1b888'}),leaf:new THREE.MeshToonMaterial({color:'#57865f'}),stone:new THREE.MeshToonMaterial({color:'#89938e',vertexColors:true}),preview:new THREE.LineDashedMaterial({color:'#f1dca0',vertexColors:true,dashSize:.36,gapSize:.24,transparent:true,opacity:.64,depthWrite:false}),landing:new THREE.MeshBasicMaterial({color:'#ecd18c',transparent:true,opacity:.55,side:THREE.DoubleSide,depthWrite:false})};
  this.material.ramp=new THREE.MeshToonMaterial({color:'#b19465',side:THREE.DoubleSide});
  for(const [index,definition] of CATAPULTS.entries()){
   const platform=this.createPlatform(definition);if(platform)this.platforms.set(definition.id,platform);
   this.machines.set(definition.id,this.createMachine(definition,index));
  }
  const points=new Float32Array(33*3),colors=new Float32Array(33*3),geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(points,3));
  for(let i=0;i<33;i++){const brightness=.5+.5*Math.sin(Math.PI*i/32);colors.set([brightness,brightness,brightness],i*3);}
  geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
  this.previewLine=new THREE.Line(geometry,this.material.preview);this.previewLine.name='catapult-trajectory-preview';this.previewLine.frustumCulled=false;this.previewLine.visible=false;this.scene.add(this.previewLine);
  this.landingMarker=new THREE.Mesh(this.geometry.ring,this.material.landing);this.landingMarker.name='catapult-landing-preview';this.landingMarker.rotation.x=-Math.PI/2;this.landingMarker.scale.setScalar(ARTILLERY.blastRadius);this.landingMarker.visible=false;this.scene.add(this.landingMarker);
  this.geometry.previewBead=new THREE.SphereGeometry(1,8,5);
  this.material.previewBeads=new THREE.MeshBasicMaterial({color:'#fff0be',transparent:true,opacity:.78,depthWrite:false});
  this.previewBeads=new THREE.InstancedMesh(this.geometry.previewBead,this.material.previewBeads,PREVIEW_BEADS);this.previewBeads.name='catapult-trajectory-flow';this.previewBeads.frustumCulled=false;this.scene.add(this.previewBeads);
  this.material.landingPulse=this.material.landing.clone();this.material.landingCore=this.material.landing.clone();
  this.landingPulse=new THREE.Mesh(this.geometry.ring,this.material.landingPulse);this.landingPulse.name='catapult-landing-pulse';this.landingPulse.rotation.x=-Math.PI/2;this.scene.add(this.landingPulse);
  this.landingCore=new THREE.Mesh(this.geometry.disc,this.material.landingCore);this.landingCore.name='catapult-landing-center';this.landingCore.rotation.x=-Math.PI/2;this.landingCore.scale.setScalar(.1);this.scene.add(this.landingCore);
  this.previewPieces=[this.previewLine,this.previewBeads,this.landingMarker,this.landingPulse,this.landingCore];this.hidePreview();
 }

 ground(x,z){return this.game.ground(x,z);}
 mesh(parent,geometry,material,position=[0,0,0],scale=[1,1,1]){
  const mesh=new THREE.Mesh(geometry,material);mesh.position.fromArray(position);mesh.scale.fromArray(scale);parent.add(mesh);return mesh;
 }
 createPlatform(definition){
  const floor=this.game.houseFloors?.find(item=>item.id===definition.enclosureId);if(!floor)return null;
  const group=new THREE.Group();group.name=`${definition.id}-level-platform`;group.position.set(floor.x,floor.height,floor.z);this.scene.add(group);
  const floorThickness=.2,deck=this.mesh(group,plankedFloorGeometry(floor.halfWidth,floor.halfDepth,floorThickness),[this.material.darkWood,this.material.deck]);deck.name='catapult-floor-at-operator-height';deck.userData.ownedGeometry=true;
  const supports=[];
  for(const x of [-floor.halfWidth+.18,floor.halfWidth-.18])for(const z of [-floor.halfDepth+.18,floor.halfDepth-.18]){
   const natural=this.game.world?.getSurface(floor.x+x,floor.z+z).height??floor.minimum,height=Math.max(.05,floor.height-floorThickness-natural),part=this.geometry.box.clone();
   part.scale(.3,height,.3);part.translate(x,-floorThickness-height*.5,z);supports.push(part);
  }
  for(const [parts,material] of [[supports,this.material.darkWood]]){
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
  const parts={wood:[],lightWood:[],darkWood:[],rope:[],iron:[],ironEdge:[]};
  const box=(kind,x,y,z,sx,sy,sz)=>{const geometry=this.geometry.box.clone();geometry.scale(sx,sy,sz);geometry.translate(x,y,z);parts[kind].push(geometry);};
  const beam=(kind,a,b,width)=>{const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),direction=to.clone().sub(from),geometry=this.geometry.cylinder.clone();geometry.scale(width,direction.length(),width);geometry.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP,direction.normalize()));geometry.translate(...from.add(to).multiplyScalar(.5).toArray());parts[kind].push(geometry);};
  const pin=(kind,x,y,z,diameter,length,sideways=false)=>{const geometry=this.geometry.cylinder.clone();geometry.scale(diameter,length,diameter);if(sideways)geometry.rotateZ(Math.PI/2);geometry.translate(x,y,z);parts[kind].push(geometry);};
  // Fixed log skids and cross-planks anchor the machine to its side of the swamp.
  for(const side of [-1,1])box('wood',side*.82,.18,.6,.26,.28,2.65);
  for(const z of [-.55,.12,.83,1.68])box('lightWood',0,.29,z,1.98,.14,.22);
  box('darkWood',0,.34,-.03,1.2,.14,.93);
  for(const side of [-1,1]){
   beam('wood',[side*.76,.3,.1],[side*.76,.99,1],.20);
   beam('wood',[side*.76,.3,1.83],[side*.76,.99,1],.20);
   beam('rope',[side*.77,.48,.35],[side*.77,.58,.47],.21);
   beam('rope',[side*.77,.48,1.61],[side*.77,.58,1.49],.21);
   // Broad dark straps read as construction at gameplay distance; the small
   // forged pins and timber grain reward the closer shoulder view.
   for(const z of [-.36,1.48]){
    box('iron',side*.82,.337,z,.31,.045,.13);
    box('iron',side*.98,.19,z,.035,.29,.13);
    pin('ironEdge',side*.82,.371,z,.085,.03);
   }
   pin('iron',side*.79,.85,1,.27,.18,true);pin('ironEdge',side*.9,.85,1,.105,.065,true);
   for(const z of [-.55,.83,1.68])pin('iron',side*.69,.374,z,.075,.027);
  }
  beam('darkWood',[-.94,.85,1],[.94,.85,1],.22);
  box('lightWood',0,.52,1.66,1.72,.17,.17);
  for(const [kind,list] of Object.entries(parts)){
   if(!list.length)continue;const merged=mergeGeometries(list);for(const item of list)item.dispose();
   const mesh=this.mesh(turret,merged,this.material[kind]);mesh.name=`catapult-frame-${kind}`;mesh.userData.ownedGeometry=true;mesh.castShadow=true;mesh.receiveShadow=true;
  }
  const seat=this.mesh(turret,this.geometry.leaf,this.material.leaf,[0,.41,-.04],[.59,.065,.48]);seat.name='operator-seat';
  // A faction leaf identifies ownership without another text panel.
  const factionMaterial=new THREE.MeshToonMaterial({color:TEAM_COLORS[index%TEAM_COLORS.length]});
  const flag=this.mesh(turret,this.geometry.leaf,factionMaterial,[-.98,.64,1.65],[.13,.45,.3]);flag.rotation.z=-.3;flag.name='side-leaf';
  const arm=new THREE.Group();arm.name='throwing-arm';arm.position.set(0,.85,1);turret.add(arm);
  this.mesh(arm,this.geometry.box,this.material.lightWood,[0,.07,0],[.21,1.2,.22]);
  this.mesh(arm,this.geometry.box,this.material.darkWood,[0,-.48,0],[.43,.27,.37]);
  const armStraps=[];
  for(const y of [-.46,.02,.42]){const band=this.geometry.box.clone();band.scale(y<0?.455:.235,.075,y<0?.395:.25);band.translate(0,y,0);armStraps.push(band);}
  const armStrapGeometry=mergeGeometries(armStraps);for(const band of armStraps)band.dispose();
  const straps=this.mesh(arm,armStrapGeometry,this.material.iron);straps.name='throwing-arm-bindings';straps.userData.ownedGeometry=true;
  const bowl=this.mesh(arm,this.geometry.cup,this.material.darkWood,[0,.57,0],[1.1,.72,1.3]);bowl.name='stone-cup';
  const cupRim=this.mesh(arm,this.geometry.cupRim,this.material.rope,[0,.57,0],[1.1,1.3,1]);cupRim.rotation.x=Math.PI/2;cupRim.name='bound-cup-rim';
  const loadedRock=this.mesh(arm,this.geometry.rock,this.material.stone,[0,.75,0],[.78,.7,.8]);loadedRock.name='loaded-catapult-stone';
  arm.rotation.x=-.45;
  const winch=new THREE.Group();winch.name='reload-winch';winch.position.set(0,.61,.53);turret.add(winch);
  const axle=this.mesh(winch,this.geometry.cylinder,this.material.darkWood,[0,0,0],[.13,1.37,.13]);axle.rotation.z=Math.PI/2;
  const winding=this.mesh(winch,this.geometry.winchRope,this.material.rope);winding.name='coiled-windlass-rope';
  const flanges=[];
  for(const side of [-1,1]){const part=this.geometry.cylinder.clone();part.scale(.35,.055,.35);part.rotateZ(Math.PI/2);part.translate(side*.32,0,0);flanges.push(part);}
  const flangeGeometry=mergeGeometries(flanges);for(const part of flanges)part.dispose();const windlassEnds=this.mesh(winch,flangeGeometry,this.material.iron);windlassEnds.name='windlass-iron-ends';windlassEnds.userData.ownedGeometry=true;
  for(const side of [-1,1]){
   const grip=this.mesh(winch,this.geometry.box,this.material.lightWood,[side*.47,.12,0],[.13,.35,.12]);grip.name='operator-handle';
   const wrap=this.mesh(turret,this.geometry.rope,this.material.rope,[side*.76,.85,1],[1,1,1]);wrap.rotation.y=Math.PI/2;
  }
  const tensionRope=this.mesh(turret,this.geometry.cylinder,this.material.rope);tensionRope.name='taut-throwing-rope';
  // Two stock stones beside the rails communicate ammunition at the station.
  const pile=[];for(let i=0;i<2;i++){const stone=this.mesh(turret,this.geometry.rock,this.material.stone,[1.17,.29,.72+i*.64],[.65,.6,.68]);stone.rotation.set(i*.7,.6+i,0);pile.push(stone);}
  const ringMaterial=new THREE.MeshBasicMaterial({color:TEAM_COLORS[index%TEAM_COLORS.length],transparent:true,opacity:.25,side:THREE.DoubleSide,depthWrite:false});
  const ring=this.mesh(group,this.geometry.ring,ringMaterial,[0,.045,.4],[1.65,1.65,1.65]);ring.rotation.x=-Math.PI/2;ring.name='catapult-station-ring';
  const machine={group,turret,arm,winch,tensionRope,loadedRock,pile,ring,factionMaterial,ringMaterial,definition,launchAge:Infinity,yaw:Math.PI};this.updateTensionRope(machine);return machine;
 }

 updateTensionRope(machine){
  const end=this._vector.set(0,-.43,0).applyEuler(machine.arm.rotation).add(machine.arm.position),start=this._direction.set(0,.73,.53),length=end.distanceTo(start);
  machine.tensionRope.position.copy(end).add(start).multiplyScalar(.5);
  machine.tensionRope.quaternion.setFromUnitVectors(UP,end.sub(start).normalize());machine.tensionRope.scale.set(.045,length,.045);
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
 hidePreview(){
  for(const piece of this.previewPieces||[])piece.visible=false;
  this.previewClock=0;this.previewState=null;
 }
 updatePreview(dt=0){
  const state=this.game.state,player=state.actors[0],aim=this.game.catapultAim;
  const station=state.catapults?.find(item=>item.id===player.catapultId&&item.occupant===player.id);
  const target=aim?.target,valid=this.game.running&&aim?.active&&station&&target&&Number.isFinite(target.x)&&Number.isFinite(target.z)&&!player.ko&&player.dizzyTime<=0;
  if(!valid){this.hidePreview();return;}
  for(const piece of this.previewPieces)piece.visible=true;
  this.previewClock+=Math.max(0,Math.min(.1,dt));
  const dx=target.x-station.x,dz=target.z-station.z,length=Math.hypot(dx,dz)||1;
  const shell={startX:station.x+dx/length,startZ:station.z+dz/length,startHeight:1.6,tx:target.x,tz:target.z,arcHeight:ARTILLERY.arcHeight};
  const positions=this.previewLine.geometry.attributes.position;
  for(let i=0;i<positions.count;i++){const point=this.shellPoint(shell,i/(positions.count-1));positions.setXYZ(i,point.x,point.y,point.z);}
  positions.needsUpdate=true;this.previewLine.computeLineDistances();
  this.landingMarker.position.set(target.x,this.ground(target.x,target.z)+.065,target.z);this.landingMarker.scale.setScalar(ARTILLERY.blastRadius);
  const ready=station.loaded&&station.cooldown<=0,blocked=target.valid===false;
  this.previewState=blocked?'blocked':ready?'ready':'reloading';
  const color=blocked?'#ed947f':ready?'#f1dca0':'#aeb8b1',pulse=(Math.sin(this.previewClock*4.2)+1)/2;
  this.material.preview.color.set(color);this.material.preview.opacity=blocked?.5:ready?.64:.3;
  for(const material of [this.material.landing,this.material.landingPulse,this.material.landingCore,this.material.previewBeads])material.color.set(color);
  // The outer border is the exact blast radius. Only a faint ring *inside*
  // that boundary moves, so animation never exaggerates the damage area.
  this.material.landing.opacity=ready?.48+pulse*.12:.36;
  const ripple=(this.previewClock/1.8)%1;
  this.landingPulse.position.copy(this.landingMarker.position);this.landingPulse.position.y+=.008;
  this.landingPulse.scale.setScalar(ARTILLERY.blastRadius*(.52+.45*ripple));
  this.material.landingPulse.opacity=(ready?.18:.08)*(1-ripple);
  this.landingCore.position.copy(this.landingMarker.position);this.landingCore.position.y+=.012;
  this.landingCore.scale.setScalar(.09+pulse*.018);this.material.landingCore.opacity=ready?.68:.4;
  // Small, tapered beads travel on the same parabola as the actual stone.
  // No additive glow or second, displaced trajectory obscures the target.
  this.previewBeads.visible=ready&&!blocked;
  for(let i=0;i<PREVIEW_BEADS;i++){
   const t=(i/PREVIEW_BEADS+this.previewClock/ARTILLERY.flightTime)%1;
   this.shellPoint(shell,t,this.dummy.position);this.dummy.rotation.set(0,0,0);
   this.dummy.scale.setScalar(.085*Math.pow(Math.sin(Math.PI*t),.55));this.dummy.updateMatrix();this.previewBeads.setMatrixAt(i,this.dummy.matrix);
  }
  this.previewBeads.instanceMatrix.needsUpdate=true;
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
   this.updateTensionRope(machine);
   machine.loadedRock.visible=!!station.loaded;machine.ring.material.opacity=station.occupant ? .42 : .2;
   const occupant=state.actors.find(actor=>actor.id===station.occupant);if(occupant)this.poseOperator(occupant,machine,station);
  }
  for(const shell of state.shells||[]){
   let visual=this.shellMeshes.get(shell.id);if(!visual){visual=this.createShell(shell);this.shellMeshes.set(shell.id,visual);}
   const t=clamp(shell.age/shell.duration);this.shellPoint(shell,t,visual.stone.position);
   visual.stone.rotation.set(shell.age*4,shell.age*3,shell.age*1.5);visual.material.opacity=.35+.22*t+.08*Math.sin(this.clock*13);
  }
  for(const [id,visual] of this.shellMeshes)if(!(state.shells||[]).some(shell=>shell.id===id)){visual.stone.removeFromParent();visual.ring.removeFromParent();visual.core.removeFromParent();visual.material.dispose();this.shellMeshes.delete(id);}
  this.updatePreview(advancing);
 }

 dispose(){
  for(const platform of this.platforms.values()){platform.group.removeFromParent();platform.group.traverse(item=>{if(item.userData.ownedGeometry)item.geometry.dispose();});}
  for(const machine of this.machines.values()){machine.group.removeFromParent();machine.group.traverse(item=>{if(item.userData.ownedGeometry)item.geometry.dispose();});machine.factionMaterial.dispose();machine.ringMaterial.dispose();}
  for(const visual of this.shellMeshes.values()){visual.stone.removeFromParent();visual.ring.removeFromParent();visual.core.removeFromParent();visual.material.dispose();}
  this.hidePreview();for(const piece of this.previewPieces)piece.removeFromParent();this.previewLine.geometry.dispose();this.previewBeads.dispose();
  for(const geometry of Object.values(this.geometry))geometry.dispose();for(const material of Object.values(this.material))material.dispose();
  for(const texture of this.textures)texture.dispose();
  this.machines.clear();this.platforms.clear();this.shellMeshes.clear();
 }
}

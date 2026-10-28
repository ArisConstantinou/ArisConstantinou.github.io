import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {GUARD_BODY,GUARD_RULES,guardChargeLane} from './arcade-guards.js';
import {BASES} from './arcade-bases.js';

const TAU=Math.PI*2,UP=new THREE.Vector3(0,1,0),CENTER=GUARD_BODY.centerY;
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
const finite=(value,fallback=0)=>Number.isFinite(value)?value:fallback;
const PALETTES={
 player:{shell:'#196852',trim:'#a7cc79',eye:'#edf4c9'},
 'rival-1':{shell:'#82503a',trim:'#e2ad71',eye:'#fff0c4'},
 'rival-2':{shell:'#5d416e',trim:'#c8aadf',eye:'#f6e6ff'},
};
const amber=new THREE.Color('#ffc151'),red=new THREE.Color('#ed6547'),flash=new THREE.Color('#fff5cc');

function shellHalf(side){
 const positions=[],indices=[],uv=[],rows=16,cols=9;
 for(let row=0;row<=rows;row++)for(let col=0;col<=cols;col++){
  const t=-1+2*row/rows,u=col/cols,round=Math.sqrt(Math.max(0,1-t*t));
  positions.push(side*(.012+.346*round*u),.29+.31*round*Math.sqrt(Math.max(0,1-u*u))-CENTER,-.08+t*.37);
  uv.push(u,row/rows);
  if(row<rows&&col<cols){const a=row*(cols+1)+col,b=a+1,c=a+cols+1,d=c+1;if(side>0)indices.push(a,c,b,b,c,d);else indices.push(a,b,c,b,d,c);}
 }
 const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geometry.setIndex(indices);geometry.computeVertexNormals();return geometry;
}

function combined(parts){const geometry=mergeGeometries(parts,false);for(const part of parts)part.dispose();geometry.computeBoundingSphere();return geometry;}
function roundPart(geometry,position,scale){return geometry.clone().scale(...scale).translate(position[0],position[1]-CENTER,position[2]);}
function tube(points,radius=.012){return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(p[0],p[1]-CENTER,p[2]))),12,radius,5,false);}

/** A real six-legged beetle for each deterministic storage guard. */
export class ArcadeGuardsView{
 constructor(game){
  this.game=game;this.group=new THREE.Group();this.group.name='Σκαθάρια — φρουροί αποθηκών';game.scene.add(this.group);
  this.guards=new Map();this.labels=new Map();this.clock=0;this.geometries=new Set();this.materials=new Set();this.dummy=new THREE.Object3D();this.direction=new THREE.Vector3();this.midpoint=new THREE.Vector3();
  const own=geometry=>{this.geometries.add(geometry);return geometry;},sphere=own(new THREE.SphereGeometry(1,14,9)),cylinder=own(new THREE.CylinderGeometry(1,1,1,7));
  const armor=own(combined([shellHalf(-1),shellHalf(1),roundPart(sphere,[0,.315,.225],[.272,.18,.155])]));
  const core=own(combined([roundPart(sphere,[0,.25,-.085],[.336,.16,.358]),roundPart(sphere,[0,.285,.335],[.217,.139,.125])]));
  const trim=[];
  trim.push(tube(Array.from({length:13},(_,i)=>{const t=-.95+i/12*1.9;return [0,.302+.31*Math.sqrt(1-t*t),-.08+t*.37];}),.011));
  for(const z of [-.28,-.1,.08])for(const side of [-1,1]){
   const along=(z+.08)/.37,width=.346*Math.sqrt(1-along*along),points=[];
   for(let i=0;i<=8;i++){const u=.09+i/8*.83;points.push([side*(.012+width*u),.301+.31*Math.sqrt(1-along*along)*Math.sqrt(1-u*u),z]);}
   trim.push(tube(points,.009));
  }
  for(const side of [-1,1]){
   trim.push(tube([[side*.18,.35,.32],[side*.205,.38,.365],[side*.175,.388,.41]],.014));
   trim.push(tube([[side*.14,.24,.43],[side*.17,.205,.49],[side*.105,.205,.535]],.025));
  }
  const eyes=own(combined([-1,1].map(side=>roundPart(sphere,[side*.157,.355,.429],[.052,.058,.032]))));
  const pupils=own(combined([-1,1].map(side=>roundPart(sphere,[side*.157,.359,.457],[.021,.027,.014]))));
  const glints=own(combined([-1,1].map(side=>roundPart(sphere,[side*.147,.374,.469],[.008,.01,.005]))));
  this.geometry={sphere,cylinder,armor,core,trim:own(combined(trim)),eyes,pupils,glints,shadow:own(new THREE.CircleGeometry(1,28).rotateX(-Math.PI/2))};
  this.shared={core:this.material({color:'#18302d',roughness:.72}),limb:this.material({color:'#29413a',roughness:.64}),pupil:this.material({color:'#102725',roughness:.16}),glint:this.material({color:'#fffde1',emissive:'#b3d5b3',emissiveIntensity:.25,roughness:.15}),shadow:this.material({color:'#17382c',transparent:true,opacity:.19,depthWrite:false},true),dust:this.material({color:'#dac69c',transparent:true,opacity:.56,depthWrite:false,roughness:1})};
  this.update(0);
 }
 material(options,basic=false){const material=basic?new THREE.MeshBasicMaterial(options):new THREE.MeshStandardMaterial(options);this.materials.add(material);return material;}
 ground(x,z){return finite(this.game.ground(x,z));}
 mesh(parent,geometry,material,name){const mesh=new THREE.Mesh(geometry,material);mesh.name=name;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 instances(parent,geometry,material,count,name){const mesh=new THREE.InstancedMesh(geometry,material,count);mesh.name=name;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);mesh.frustumCulled=false;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
 create(guard){
  const palette=PALETTES[guard.owner]||PALETTES.player,group=new THREE.Group();group.name=`${guard.id} — θωρακισμένο σκαθάρι`;group.userData={guardId:guard.id,kind:'beetle',legCount:6,bodyRadius:GUARD_BODY.radius,bodyHeight:GUARD_BODY.height};this.group.add(group);
  const body=new THREE.Group();body.name='beetle-body-pivot';body.position.y=CENTER;group.add(body);
  const shellMaterial=this.material({color:palette.shell,emissive:palette.shell,emissiveIntensity:.05,metalness:.34,roughness:.33});
  const trimMaterial=this.material({color:palette.trim,emissive:palette.trim,emissiveIntensity:.05,metalness:.4,roughness:.32});
  const eyeMaterial=this.material({color:palette.eye,emissive:palette.eye,emissiveIntensity:.16,roughness:.24});
  const shell=this.mesh(body,this.geometry.armor,shellMaterial,'segmented-armored-shell'),core=this.mesh(body,this.geometry.core,this.shared.core,'beetle-abdomen-and-head');
  this.mesh(body,this.geometry.trim,trimMaterial,'shell-seams-and-mandibles');this.mesh(body,this.geometry.eyes,eyeMaterial,'two-beetle-eyes');this.mesh(body,this.geometry.pupils,this.shared.pupil,'beetle-pupils');this.mesh(body,this.geometry.glints,this.shared.glint,'eye-catchlights');
  const legs=this.instances(body,this.geometry.cylinder,this.shared.limb,16,'six-articulated-legs-and-two-antennae'),joints=this.instances(body,this.geometry.sphere,trimMaterial,8,'six-leg-joints-and-antenna-tips'),feet=this.instances(body,this.geometry.sphere,this.shared.limb,6,'six-grounded-feet');
  const shadow=this.mesh(group,this.geometry.shadow,this.shared.shadow,'beetle-contact-shadow');shadow.position.y=.018;shadow.scale.set(.56,1,.58);
  const laneGeometry=new THREE.BufferGeometry();laneGeometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(72*5*3),3).setUsage(THREE.DynamicDrawUsage));laneGeometry.setAttribute('color',new THREE.BufferAttribute(new Float32Array(72*5*4),4));laneGeometry.setIndex([]);this.geometries.add(laneGeometry);
  const laneMaterial=this.material({color:'#ffc151',vertexColors:true,transparent:true,opacity:.8,side:THREE.DoubleSide,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1},true),lane=this.mesh(this.group,laneGeometry,laneMaterial,`${guard.id}-committed-charge-lane`);lane.frustumCulled=false;lane.visible=false;lane.renderOrder=1;
  const arrowGeometry=new THREE.BufferGeometry();arrowGeometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(18*3),3).setUsage(THREE.DynamicDrawUsage));this.geometries.add(arrowGeometry);
  const arrowMaterial=this.material({color:'#ffdfa0',transparent:true,opacity:.9,side:THREE.DoubleSide,depthWrite:false},true),arrows=this.mesh(this.group,arrowGeometry,arrowMaterial,`${guard.id}-charge-direction`);arrows.frustumCulled=false;arrows.visible=false;arrows.renderOrder=2;
  const dust=this.instances(this.group,this.geometry.sphere,this.shared.dust,9,`${guard.id}-charge-dust`);dust.count=0;
  const visual={group,body,shell,core,legs,joints,feet,shadow,lane,arrows,dust,shellMaterial,trimMaterial,eyeMaterial,laneMaterial,arrowMaterial,palette,baseShell:new THREE.Color(palette.shell),baseTrim:new THREE.Color(palette.trim),baseEye:new THREE.Color(palette.eye),particles:[],mode:null,gait:0,walk:0,lastX:guard.x,lastZ:guard.z,flash:0,laneKey:null,label:null};
  this.guards.set(guard.id,visual);return visual;
 }
 segment(mesh,index,a,b,radius){
  this.midpoint.copy(a).add(b).multiplyScalar(.5);this.direction.copy(b).sub(a);const length=this.direction.length();this.dummy.position.copy(this.midpoint);this.dummy.quaternion.setFromUnitVectors(UP,this.direction.multiplyScalar(1/Math.max(length,1e-8)));this.dummy.scale.set(radius,Math.max(length,.001),radius);this.dummy.updateMatrix();mesh.setMatrixAt(index,this.dummy.matrix);
 }
 sphere(mesh,index,position,scale){this.dummy.position.copy(position);this.dummy.quaternion.identity();this.dummy.scale.fromArray(scale);this.dummy.updateMatrix();mesh.setMatrixAt(index,this.dummy.matrix);}
 animateLegs(visual,guard,progress,disabled){
  const yaw=visual.group.rotation.y,cos=Math.cos(yaw),sin=Math.sin(yaw),floor=visual.group.position.y;
  let segment=0;
  for(let index=0;index<6;index++){
   const side=index<3?-1:1,leg=index%3,z=[.18,-.025,-.235][leg],phase=visual.gait+(side>0?Math.PI:0)+leg*Math.PI,stride=Math.cos(phase)*.13*visual.walk,lift=Math.max(0,Math.sin(phase))*.095*visual.walk;
   const hip=new THREE.Vector3(side*.245,.263-CENTER,z),footX=side*(disabled?.34:.57+progress*.035),footZ=z+(leg===0?.14:leg===2?-.14:0)+stride;
   const wx=guard.x+footX*cos+footZ*sin,wz=guard.z-footX*sin+footZ*cos,footY=disabled?.13+.012*Math.sin(this.clock*3+index):clamp(this.ground(wx,wz)-floor,-.18,.24)+.024+lift;
   const foot=new THREE.Vector3(footX,footY-CENTER,footZ),knee=new THREE.Vector3(side*(disabled?.42:.435),((disabled?.055:.2)+lift*.45)-CENTER,z+(leg===0?.15:leg===2?-.14:0)+stride*.4);
   this.segment(visual.legs,segment++,hip,knee,.029);this.segment(visual.legs,segment++,knee,foot,.022);this.sphere(visual.joints,index,knee,[.04,.04,.04]);this.sphere(visual.feet,index,foot,[.046,.024,.077]);
  }
  for(const [index,side] of [-1,1].entries()){
   const sway=Math.sin(this.clock*3.3+side)*.024*(disabled?.25:1),root=new THREE.Vector3(side*.097,.376-CENTER,.424),bend=new THREE.Vector3(side*(.17+sway),.458-CENTER,.51),tip=new THREE.Vector3(side*(.225+sway),.513-CENTER,.604);
   this.segment(visual.legs,segment++,root,bend,.014);this.segment(visual.legs,segment++,bend,tip,.011);this.sphere(visual.joints,6+index,tip,[.026,.027,.026]);
  }
  for(const mesh of [visual.legs,visual.joints,visual.feet])mesh.instanceMatrix.needsUpdate=true;
 }
 buildLane(visual,guard){
  const path=guardChargeLane(guard),position=visual.lane.geometry.getAttribute('position'),color=visual.lane.geometry.getAttribute('color'),direction=new THREE.Vector2(guard.chargeX,guard.chargeZ).normalize(),nx=-direction.y,nz=direction.x,across=[-1,-.8,0,.8,1],indices=[];
  const points=path.points.slice(0,72);
  for(const [row,point] of points.entries())for(let col=0;col<5;col++){
   const side=across[col],x=point.x+nx*side*GUARD_BODY.radius,z=point.z+nz*side*GUARD_BODY.radius,index=row*5+col;
   position.setXYZ(index,x,this.ground(x,z)+.045,z);color.setXYZW(index,1,1,1,col===0||col===4?0:col===2?.33:.65);
   if(row<points.length-1&&col<4){const a=index,b=a+1,c=a+5,d=c+1;indices.push(a,b,c,b,d,c);}
  }
  position.needsUpdate=true;color.needsUpdate=true;visual.lane.geometry.setIndex(indices);visual.lane.geometry.setDrawRange(0,indices.length);
  const arrow=visual.arrows.geometry.getAttribute('position');let at=0;
  for(const fraction of [.27,.56,.85]){
   const reach=Math.min(path.distance,GUARD_RULES.chargeSpeed*GUARD_RULES.chargeSeconds)*fraction,cx=path.start.x+direction.x*reach,cz=path.start.z+direction.y*reach;
   for(const side of [-1,1])for(const [forward,lateral] of [[.18,0],[-.12,side*.22],[-.19,side*.14]]){const x=cx+direction.x*forward+nx*lateral,z=cz+direction.y*forward+nz*lateral;arrow.setXYZ(at++,x,this.ground(x,z)+.06,z);}
  }
  arrow.needsUpdate=true;visual.arrows.geometry.setDrawRange(0,path.distance>.35?at:0);
  visual.lane.userData={kind:'guard-charge-warning',start:{...path.start},end:{...path.end},distance:path.distance,bearing:{x:direction.x,z:direction.y},radius:GUARD_BODY.radius};
 }
 burst(visual,guard){
  visual.particles=Array.from({length:9},(_,i)=>{const angle=i/9*TAU;return {x:guard.x-guard.chargeX*.25,y:this.ground(guard.x,guard.z)+.08,z:guard.z-guard.chargeZ*.25,vx:Math.sin(angle)*.5-guard.chargeX*.6,vz:Math.cos(angle)*.5-guard.chargeZ*.6,life:.25+(i%3)*.05,total:.25+(i%3)*.05,size:.045+(i%3)*.015};});
 }
 updateDust(visual,dt){
  let count=0;for(const particle of visual.particles){particle.life=Math.max(0,particle.life-dt);if(!particle.life)continue;particle.x+=particle.vx*dt;particle.z+=particle.vz*dt;particle.y+=dt*.18;const size=particle.size*(1+.65*(1-particle.life/particle.total))*clamp(particle.life/.09);this.sphere(visual.dust,count++,new THREE.Vector3(particle.x,particle.y,particle.z),[size,size*.6,size]);}
  visual.dust.count=count;visual.dust.instanceMatrix.needsUpdate=true;
 }
 update(dt=0){
  const delta=clamp(finite(dt),0,.1);this.clock+=delta;const live=new Set();
  for(const guard of this.game.state.guards||[]){
   live.add(guard.id);const visual=this.guards.get(guard.id)||this.create(guard),base=this.game.state.bases?.find(base=>base.id===guard.baseId),gone=guard.mode==='gone'||base?.destroyed;
   visual.group.visible=!gone;visual.dust.visible=!gone;visual.lane.visible=visual.arrows.visible=!gone&&(guard.mode==='windup'||guard.mode==='charge');
   if(gone){visual.label=null;visual.dust.count=0;visual.particles=[];continue;}
   const changed=visual.mode!==guard.mode,disabled=guard.mode==='disabled',windup=guard.mode==='windup',charging=guard.mode==='charge',progress=windup?clamp(1-finite(guard.windup)/GUARD_RULES.windupSeconds):0,speed=delta>0?Math.hypot(guard.x-visual.lastX,guard.z-visual.lastZ)/delta:0;
   visual.group.position.set(guard.x,this.ground(guard.x,guard.z),guard.z);visual.group.rotation.y=(windup||charging)?Math.atan2(guard.chargeX,guard.chargeZ):finite(guard.face);
   if(delta>0||changed)visual.walk=disabled||windup||guard.mode==='recover'?0:clamp(speed/GUARD_RULES.patrolSpeed);if(charging)visual.walk=1;
   if(delta>0)visual.gait+=delta*(charging?26:5+speed*7);visual.lastX=guard.x;visual.lastZ=guard.z;
   const blend=delta>0?1-Math.exp(-delta*13):1,targetRoll=disabled?Math.PI:0;
   visual.body.rotation.z+=(targetRoll-visual.body.rotation.z)*blend;visual.body.rotation.x=disabled?.08:windup?-.12*progress:charging?.08:Math.sin(visual.gait*2)*.012*visual.walk;
   visual.body.position.y=CENTER+(disabled?.005:windup?-.035*progress:Math.sin(visual.gait*2)*.012*visual.walk);
   this.animateLegs(visual,guard,progress,disabled);
   visual.flash=Math.max(0,visual.flash-delta);const hit=clamp(Math.max(finite(guard.hit),visual.flash)/GUARD_RULES.hitSeconds),pulse=.5+.5*Math.sin(this.clock*(10+progress*11));
   visual.shellMaterial.color.copy(visual.baseShell).multiplyScalar(disabled?.6:1).lerp(flash,hit*.78);visual.shellMaterial.emissive.copy(windup?amber:visual.baseShell);visual.shellMaterial.emissiveIntensity=windup?.18+pulse*.2:charging?.2:.035;
   visual.trimMaterial.color.copy(visual.baseTrim).lerp(flash,hit*.7).multiplyScalar(disabled?.65:1);visual.trimMaterial.emissive.copy(windup?amber:visual.baseTrim);visual.trimMaterial.emissiveIntensity=windup?.2+pulse*.3:.045;
   visual.eyeMaterial.color.copy(windup?amber:charging?red:visual.baseEye).multiplyScalar(disabled?.45:1);visual.eyeMaterial.emissive.copy(visual.eyeMaterial.color);visual.eyeMaterial.emissiveIntensity=windup?.55:disabled?.02:.14;
   if(visual.lane.visible){const key=[guard.chargeOriginX,guard.chargeOriginZ,guard.chargeX,guard.chargeZ].join(':');if(visual.laneKey!==key){this.buildLane(visual,guard);visual.laneKey=key;}visual.laneMaterial.color.copy(amber).lerp(red,charging?1:progress*.85);visual.laneMaterial.opacity=charging?.45:.66+pulse*.24;visual.arrowMaterial.color.copy(charging?red:amber).lerp(flash,.35);visual.arrowMaterial.opacity=charging?.7:.9;}
   else visual.laneKey=null;
   if(changed&&charging)this.burst(visual,guard);this.updateDust(visual,delta);visual.mode=guard.mode;visual.group.userData.mode=guard.mode;visual.group.userData.health=guard.health;
  }
  for(const [id,visual] of this.guards)if(!live.has(id)){this.remove(visual);this.guards.delete(id);}
 }
 consumeEvent(event){const visual=this.guards.get(event?.guardId||event?.id);if(!visual)return;if(event.type==='guardHit'||event.type==='guardDown')visual.flash=GUARD_RULES.hitSeconds;}
 labelBlocks(){
  const blocks=[],game=this.game,reticle=game.currentAimScreen;if(reticle)blocks.push({left:reticle.x-22,right:reticle.x+22,top:reticle.y-22,bottom:reticle.y+22});
  // Storage captions are painted on this same canvas before guard labels.
  // Reserve their visible band as well as DOM controls, especially in portrait.
  const player=game.state.actors?.[0];
  for(const base of game.state.bases||[]){
   const definition=BASES.find(item=>item.id===base.id);if(!definition||base.destroyed||!player||Math.hypot(player.x-definition.stock.x,player.z-definition.stock.z)>=10&&!base.attackerId)continue;
   const q=game.project(definition.stock.x,this.ground(definition.stock.x,definition.stock.z)+3.5,definition.stock.z);if(!q.visible||q.x<70||q.x>game.w-70||q.y<95||q.y>game.h-(game.touch?220:85))continue;
   blocks.push({left:q.x-95,right:q.x+95,top:q.y-16,bottom:q.y+6});
  }
  for(const actor of game.state.actors||[]){
   if(actor.ko||actor.eliminated)continue;const points=[];
   for(const dx of [-.85,.85])for(const dz of [-.85,.85])for(const dy of [.05,1.7]){const p=game.project(actor.x+dx,this.ground(actor.x,actor.z)+finite(actor.height)+dy,actor.z+dz);if(p.visible)points.push(p);}
   if(points.length)blocks.push({left:Math.min(...points.map(p=>p.x))-5,right:Math.max(...points.map(p=>p.x))+5,top:Math.min(...points.map(p=>p.y))-5,bottom:Math.max(...points.map(p=>p.y))+5});
  }
  for(const element of game.ui?.querySelectorAll?.('#arcade-hud > *, #minimap, #view-button, #round-status, #base-status, #dizzy-banner, #callout, #move-stick, #aim-stick, #layout-button, #keyboard-display, #mouse-display, .world-context')||[]){
   if(element.hidden||element.closest?.('[hidden]'))continue;const style=element.ownerDocument?.defaultView?.getComputedStyle?.(element);if(style?.display==='none'||style?.visibility==='hidden')continue;const rect=element.getBoundingClientRect();if(rect.width>0&&rect.height>0)blocks.push(rect);
  }
  return blocks;
 }
 drawLabels(context){
  this.labels.clear();if(!this.game.running||this.game.layoutEditing||!this.game.project)return;
  const game=this.game,player=game.state.actors?.[0],blocks=this.labelBlocks(),overlaps=(a,b)=>a.left<b.right+4&&a.right>b.left-4&&a.top<b.bottom+4&&a.bottom>b.top-4;
  context.save();context.textAlign='center';context.textBaseline='middle';context.lineJoin='round';
  for(const guard of game.state.guards||[]){
   const visual=this.guards.get(guard.id);if(!visual?.group.visible)continue;
   const disabled=guard.mode==='disabled',warning=guard.mode==='windup'||guard.mode==='charge',distance=player?Math.hypot(guard.x-player.x,guard.z-player.z):0;if(distance>13&&!warning)continue;
   const anchor=game.project(guard.x,this.ground(guard.x,guard.z)+.82,guard.z);if(!anchor.visible||anchor.x<0||anchor.x>game.w||anchor.y<0||anchor.y>game.h)continue;
   const text=disabled?`ΞΥΠΝΑ ΣΕ ${Math.ceil(finite(guard.respawnTime))}″`:warning?'! ΕΦΟΔΟΣ':guard.owner==='player'?'Ο ΦΡΟΥΡΟΣ ΣΟΥ':'ΦΡΟΥΡΟΣ';context.font='800 10px sans-serif';
   const width=Math.max(58,Math.ceil(context.measureText(text).width)+14),height=31,candidates=[{x:anchor.x-width/2,y:anchor.y-35},{x:anchor.x+18,y:anchor.y-18},{x:anchor.x-width-18,y:anchor.y-18},{x:anchor.x-width/2,y:anchor.y-59},{x:anchor.x-width/2,y:anchor.y+18}];
   // A close beetle often aligns with both the player and the crosshair. Keep
   // its warning/countdown nearby but try a wider local ring before hiding it.
   for(const radius of [52,76,104])for(let i=0;i<8;i++){const angle=-Math.PI/2+i*Math.PI/4;candidates.push({x:anchor.x+Math.cos(angle)*radius-width/2,y:anchor.y+Math.sin(angle)*radius-height/2});}
   let rect=null,best=Infinity;for(const candidate of candidates){const current={left:candidate.x,right:candidate.x+width,top:candidate.y,bottom:candidate.y+height};if(current.left<8||current.right>game.w-8||current.top<8||current.bottom>game.h-8||blocks.some(block=>overlaps(current,block)))continue;const score=((current.left+current.right)/2-anchor.x)**2+((current.top+current.bottom)/2-anchor.y)**2;if(score<best){best=score;rect=current;}}
   if(!rect)continue;blocks.push(rect);const x=(rect.left+rect.right)/2,y=rect.top,health=clamp(Math.ceil(finite(guard.health)),0,GUARD_RULES.maxHealth),tint=disabled?'#d6dcce':warning?'#ffce74':visual.palette.trim;
   context.fillStyle='#16332bd9';context.strokeStyle=disabled?'#8a9d8a':warning?'#f2a763':visual.palette.trim;context.lineWidth=1;context.beginPath();if(context.roundRect)context.roundRect(rect.left,y,width,height,7);else context.rect(rect.left,y,width,height);context.fill();context.stroke();
   context.fillStyle=tint;context.fillText(text,x,y+10);
   for(let i=0;i<GUARD_RULES.maxHealth;i++){context.beginPath();context.arc(x+(i-(GUARD_RULES.maxHealth-1)/2)*9,y+23,2.8,0,TAU);context.fillStyle=i<health?tint:'#344c41';context.fill();context.strokeStyle=i<health?'#f6edcf':'#829481';context.lineWidth=.8;context.stroke();}
   const label={text,health,maxHealth:GUARD_RULES.maxHealth,remaining:disabled?Math.ceil(finite(guard.respawnTime)):null,rect,anchor};this.labels.set(guard.id,label);visual.label=label;
  }
  context.restore();
 }
 remove(visual){
  for(const mesh of [visual.group,visual.lane,visual.arrows,visual.dust])mesh.removeFromParent();for(const mesh of [visual.legs,visual.joints,visual.feet,visual.dust])mesh.dispose();
  for(const geometry of [visual.lane.geometry,visual.arrows.geometry]){geometry.dispose();this.geometries.delete(geometry);}
  for(const material of [visual.shellMaterial,visual.trimMaterial,visual.eyeMaterial,visual.laneMaterial,visual.arrowMaterial]){material.dispose();this.materials.delete(material);}
 }
 dispose(){for(const visual of this.guards.values())this.remove(visual);this.guards.clear();this.labels.clear();this.group.removeFromParent();for(const geometry of this.geometries)geometry.dispose();for(const material of this.materials)material.dispose();this.geometries.clear();this.materials.clear();}
}

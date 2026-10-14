import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {GREEK_GATES,pressureTray,plateOccupants,stepGate,weightNeedsRecovery,flameReachesGate} from './greek-puzzle-rules.js';
import {segmentBox} from './systems.js';
import {siegeSurface} from './siege-environment.js';
import {greekGatePlan,findPressureSupply} from './greek-progression.js';

export const greekEnabled=typeof location!=='undefined'&&location.pathname.includes('/previews/greek-sanctuary/');
const templates=new Map(),stone=new THREE.MeshStandardMaterial({color:0xd2c5a7,roughness:.88}),edge=new THREE.MeshStandardMaterial({color:0xe0d3b5,roughness:.78}),pigment=new THREE.MeshStandardMaterial({color:0x354a52,roughness:.86});
const boxGeo=new RoundedBoxGeometry(1,1,1,1,.025);
function patina(m){
 m.onBeforeCompile=s=>{
  s.vertexShader='varying vec3 greekPosition;\n'+s.vertexShader;
  s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ngreekPosition=position;\n#ifdef USE_INSTANCING\ngreekPosition=(instanceMatrix*vec4(position,1.)).xyz;\n#endif');
  s.fragmentShader='varying vec3 greekPosition;\n'+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   float n=sin(greekPosition.x*37.+sin(greekPosition.z*19.))*sin(greekPosition.y*41.+greekPosition.z*23.);
   diffuseColor.rgb*=.94+.06*n;`);
 };m.customProgramCacheKey=()=> 'greek-patina-v1';
}
[stone,edge,pigment].forEach(patina);
const architectureBatches=new WeakMap(),palettes=new Map();
const roomColours={crypt:[0xaeb8ad,0xd4d4bc,0x415c5d],ritual:[0xc8c2b5,0xe1d6bb,0x4b536b],sanctum:[0xd8d4bc,0xeee0ba,0x467c76],forge:[0xb4a28a,0xd2bea1,0x73503a],prison:[0xa2ada5,0xc8c7b1,0x4a5e57],catacombs:[0xb6af95,0xd2c5a4,0x676958],library:[0xcdbd9b,0xe4d3ae,0x376768],barracks:[0xc4b99e,0xddcfaa,0x5b6959],armoury:[0xb8c2b7,0xd8d8c0,0x405e69],gallery:[0xcfbda8,0xe6d1b3,0x84534b],watchtower:[0xb7c3be,0xdbe0c9,0x3b6275],gatehouse:[0xc9b798,0xe0ceab,0x75513c]};
function palette(room='courtyard'){
 const key=room.replace('-secret','');if(!roomColours[key])return {stone,edge,pigment};
 if(!palettes.has(key)){const materials=roomColours[key].map((color,i)=>{const m=(i===0?stone:i===1?edge:pigment).clone();m.color.setHex(color);patina(m);return m;});palettes.set(key,{stone:materials[0],edge:materials[1],pigment:materials[2]});}return palettes.get(key);
}
function queueStatic(root,g,x,z){
 if(!architectureBatches.has(root))architectureBatches.set(root,new Map());const batches=architectureBatches.get(root),key=Math.floor(x/18)+','+Math.floor(z/18);
 if(!batches.has(key)){const group=new THREE.Group();group.name='Greek architectural tile '+key;batches.set(key,group);}batches.get(key).add(g);
}
function flushStatic(root){const batches=architectureBatches.get(root);if(!batches)return;for(const group of batches.values())root.add(mergeStatic(group));architectureBatches.delete(root);}
export async function loadGreekAssets(){
 if(!greekEnabled)return;
 const loader=new GLTFLoader(),base=new URL('greek-sanctuary/',document.baseURI);
 await Promise.all(['column','entablature','bronze-leaf','wood-leaf','weight','plate','single-tray','double-tray','shield'].map(async id=>{
  const {scene}=await loader.loadAsync(new URL(id+'.glb',base).href);
  scene.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;o.material.side=THREE.FrontSide;patina(o.material);}});templates.set(id,scene);
 }));
}
function clone(id){const g=templates.get(id)?.clone(true);if(!g)throw Error('Missing Greek kit '+id);return g;}
function block(group,x,y,z,w,h,d,mat=stone){const m=new THREE.Mesh(boxGeo,mat);m.position.set(x,y,z);m.scale.set(w,h,d);m.castShadow=m.receiveShadow=true;group.add(m);return m;}
function mergeStatic(group){
 group.updateMatrixWorld(true);const groups=new Map();
 group.traverse(o=>{if(!o.isMesh)return;const instanced=o.geometry===boxGeo,key=o.material.uuid+(instanced?':boxes':o.geometry.index?':indexed':':flat');if(!groups.has(key))groups.set(key,{material:o.material,geos:[],matrices:[]});if(instanced){groups.get(key).matrices.push(o.matrixWorld.clone());return;}const g=o.geometry.clone().applyMatrix4(o.matrixWorld);g.deleteAttribute('uv1');g.deleteAttribute('tangent');groups.get(key).geos.push(g);});
 const result=new THREE.Group();result.name=group.name;
 for(const {material,geos,matrices}of groups.values()){
  let m;if(matrices.length){m=new THREE.InstancedMesh(boxGeo,material,matrices.length);matrices.forEach((matrix,i)=>m.setMatrixAt(i,matrix));m.computeBoundingSphere();}
  else{const merged=mergeGeometries(geos,false);if(!merged)throw Error('Greek geometry merge failed');m=new THREE.Mesh(merged,material);geos.forEach(g=>g.dispose());}
  m.castShadow=m.receiveShadow=true;result.add(m);
 }return result;
}
export function greekColumn(root,x,z,h=3.7){if(!greekEnabled)return false;const g=clone('column');g.scale.setScalar(h/3);g.position.set(x,0,z);queueStatic(root,g,x,z);return true;}
export function greekWall(root,x,z,length,height,alongX,room='courtyard'){
 const {stone,edge,pigment}=palette(room);
 const g=new THREE.Group();g.name='Greek ashlar and continuous entablature';
 // Closed, overlapping masonry core; horizontal bed joints and dressed edges.
 block(g,0,height/2,0,length,height,.8,stone);
 for(let y=.28,row=0;y<height-.1;y+=.57,row++){
  let a=-length/2;
  while(a<length/2-.01){const w=Math.min(row%2&&a===-length/2?.68:1.36,length/2-a);for(const side of [-1,1])block(g,a+w/2,y,side*.408,w-.025,.54,.035,row%3?stone:edge);a+=w;}
 }
 for(const [y,h,w]of [[.12,.19,.94],[height-.12,.16,.93],[height+.07,.13,1.02]])block(g,0,y,0,length,h,w,edge);
 if(height>2){
  for(const side of [-1,1]){block(g,0,height-.4,side*.457,length,.25,.026,pigment);
  for(let a=-length/2+.24;a<length/2;a+=1.1)for(const d of [-.09,0,.09])block(g,a+d,height-.4,side*.49,.04,.26,.07,edge);}
 }
 g.rotation.y=alongX?0:Math.PI/2;g.position.set(x,0,z);queueStatic(root,g,x,z);
}
export function greekFloor(room){
 if(!greekEnabled)return null;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;const c=canvas.getContext('2d');c.fillStyle='#827e70';c.fillRect(0,0,1024,1024);
 for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const x=col*256,y=row*256,l=(col*3+row*7)%9;
  const p=palette(room.id),base=p.stone.color.clone().convertLinearToSRGB();c.fillStyle=`rgb(${Math.min(255,195*base.r/(210/255)+l)},${Math.min(255,185*base.g/(197/255)+l)},${Math.min(255,162*base.b/(167/255)+l)})`;c.fillRect(x+2,y+2,252,252);
  c.strokeStyle='#e6dcc1';c.lineWidth=2;c.strokeRect(x+4,y+4,248,248);
  for(let i=0;i<8;i++){const p=(i*37+col*61+row*17)%256;c.strokeStyle='rgba(105,105,97,.07)';c.lineWidth=1+i%2;c.beginPath();c.moveTo(x,y+p);c.bezierCurveTo(x+83,y+p-19,x+182,y+p+35,x+256,y+p+7);c.stroke();}
 }
 const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;map.wrapS=map.wrapT=THREE.RepeatWrapping;map.repeat.set(room.w/6,room.d/6);map.anisotropy=8;
 const surface=siegeSurface('monastery_stone_floor'),normalMap=surface?.normalMap.clone();
 if(normalMap){normalMap.repeat.copy(map.repeat);normalMap.needsUpdate=true;}
 const mat=new THREE.MeshStandardMaterial({map,normalMap,normalScale:new THREE.Vector2(.18,.18),roughness:.82,color:0xffffff});
 if(surface)mat.onBeforeCompile=s=>{
  s.uniforms.greekWeather={value:surface.map};s.fragmentShader='uniform sampler2D greekWeather;\n'+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
   vec3 weather=texture2D(greekWeather,vMapUv*.73).rgb;float stoneGrain=dot(weather,vec3(.2126,.7152,.0722));diffuseColor.rgb*=.83+.24*stoneGrain;`);
 };mat.customProgramCacheKey=()=> 'greek-floor-weather-v1';return mat;
}
export function dressGreekRooms(root,rooms,boundary){
 if(!greekEnabled)return null;
 for(const room of rooms){
  if(room.id==='bridge'||room.id==='courtyard')continue;
  const p=palette(room.id),g=new THREE.Group(),cx=room.x+room.w/2,cz=room.z+room.d/2;g.name='Greek '+room.id+' reliefs';
  // Inlaid borders remain flush and inside each room's existing footprint.
  for(const side of [-1,1]){
   block(g,cx,.022,room.z+(side<0?1:room.d-1),room.w-2,.012,.12,p.pigment);
   block(g,room.x+(side<0?1:room.w-1),.022,cz,.12,.012,room.d-2,p.pigment);
  }
  for(const e of boundary.filter(e=>e.room===room.id&&e.hi-e.lo>5.5)){
   const along=e.axis==='x',rotation=along?(e.normal<0?0:Math.PI):(e.normal<0?Math.PI/2:-Math.PI/2),count=Math.max(1,Math.floor((e.hi-e.lo)/5));
   for(let j=0;j<count;j++){
    const t=e.lo+(j+.5)*(e.hi-e.lo)/count,frame=new THREE.Group(),x=along?t:e.at-e.normal*.08,z=along?e.at-e.normal*.08:t;
    // Rectangular stone openings, lintel and bronze lattice: no pointed arch.
    block(frame,0,1.9,0,1.48,1.8,.10,p.pigment);
    for(const side of [-1,1]){block(frame,side*.83,1.9,.08,.22,2.08,.26,p.edge);for(const dx of [-.055,.055])block(frame,side*.83+dx,1.9,.22,.025,1.75,.028,p.stone);}
    block(frame,0,.84,.08,2.0,.18,.39,p.edge);block(frame,0,2.96,.07,2.1,.22,.36,p.edge);block(frame,0,3.14,.07,2.22,.10,.42,p.stone);
    if(room.id==='library'){
     for(const yy of [1.05,1.62,2.19,2.76])block(frame,0,yy,.14,1.48,.07,.30,p.edge);
     for(let row=0;row<3;row++)for(let i=0;i<8;i++){const h=.36+(i%3)*.035;block(frame,-.61+i*.175,1.10+row*.57+h/2,.12,.125,h,.16,i%3?p.stone:p.pigment);}
    }else if(['armoury','gallery'].includes(room.id)){
     const shield=clone('shield');shield.rotation.y=Math.PI;shield.position.set(0,1.9,.16);frame.add(shield);
    }else{
     for(const xx of [-.44,0,.44])block(frame,xx,1.9,.095,.042,1.73,.06,p.edge);
     for(const yy of [1.42,2.36])block(frame,0,yy,.095,1.45,.04,.06,p.edge);
    }
    for(const xx of [-.66,0,.66])for(const dx of [-.065,0,.065])block(frame,xx+dx,2.98,.265,.025,.16,.024,p.pigment);
    frame.position.set(x,0,z);frame.rotation.y=rotation;g.add(frame);
   }
  }
  // Room identity comes from the medallion and pigment, on the same Greek kit.
  const radius=Math.min(room.w,room.d)*.18;
  if(room.boss||['hall','gallery','watchtower'].includes(room.id)){
   const ring=new THREE.Mesh(new THREE.RingGeometry(radius-.10,radius,64),p.pigment);ring.rotation.x=-Math.PI/2;ring.position.set(cx,.03,cz);g.add(ring);
   for(let i=0;i<12;i++){const a=i*Math.PI/6;const ray=block(g,cx+Math.sin(a)*radius*.65,.035,cz+Math.cos(a)*radius*.65,.075,.014,radius*.40,p.edge);ray.rotation.y=a;}
  }
  queueStatic(root,g,cx,cz);
 }
 return {rooms:rooms.filter(r=>r.id!=='bridge').map(r=>({id:r.id,name:'Greek '+r.id,floor:'limestone-inlay',wall:'Doric ashlar and lintel'}))};
}
export function greekProp(kind){
 if(!greekEnabled||!['puzzle-weight','shield'].includes(kind))return null;
 const weight=kind==='puzzle-weight',mesh=clone(weight?'weight':'shield');mesh.name=weight?'Άφθαρτο βάρος · τηλεκίνηση':'Ελληνική ασπίδα';
 return {mesh,halfExtents:new THREE.Vector3(weight?.44:.52,weight?.44:.52,weight?.44:.12),mass:weight?7:3.2,health:weight?1e6:85,label:weight?'Άφθαρτο βάρος':'Ασπίδα',indestructible:weight,flammable:false,woodFraction:0};
}
function addSupply(root,spec){
 const group=new THREE.Group();group.name=spec.id+' · retaining pressure unit';root.add(group);
 const tray=pressureTray(spec.plates);
 if(tray){const g=clone(tray.asset);g.position.set(tray.x,0,tray.z);group.add(g);}
 const plates=spec.plates.map(p=>{const g=clone('plate');g.position.set(p.x,.06,p.z);group.add(g);const lamp=new THREE.Mesh(new THREE.RingGeometry(.47,.51,48),new THREE.MeshStandardMaterial({color:0x93652f,emissive:0x2c1907,emissiveIntensity:.3,metalness:.6,roughness:.4}));lamp.rotation.x=-Math.PI/2;lamp.position.set(p.x,.115,p.z);group.add(lamp);return {g,lamp};});
 return {supplyGroup:group,platesVisual:plates};
}
function portal(root,colliders,spec,occluders){
 const {x,z,width,height,wallWidth,rotation=0}=spec;
 let frame=new THREE.Group();frame.name=spec.id+' · Greek portal';
 const factor=height/3.6;
 for(const side of [-1,1]){
  block(frame,side*(width/2+.14),height/2,0,.28,height,.9,edge);
  const col=clone('column');col.scale.setScalar(height/3);col.position.set(side*(width/2+.53*factor),0,.33);frame.add(col);
 }
 const header=clone('entablature');header.scale.set((width+2.2)/7.4,factor,1);frame.add(header);
 frame.position.set(x,0,z);frame.rotation.y=rotation;frame=mergeStatic(frame);root.add(frame);
 // Side wall fills reach the exact room edges. No geometry-only closure.
 const sideWidth=(wallWidth-width)/2;
 if(sideWidth>0)for(const side of [-1,1]){
  const offset=side*(width/2+sideWidth/2),cx=x+Math.cos(rotation)*offset,cz=z-Math.sin(rotation)*offset;
  greekWall(root,cx,cz,sideWidth,height,rotation===0);
  colliders.push({x:cx,y:height/2,z:cz,w:rotation?.9:sideWidth,h:height,d:rotation?sideWidth:.9,tag:'greek-wall-return'});
 }
 colliders.push({x,y:height+.45,z,w:rotation?1:width+.5,h:.9,d:rotation?width+.5:1,tag:'greek-lintel'});
 const blocker={x,y:height/2,z,w:rotation?.3:width,h:height,d:rotation?width:.3,tag:'gate-'+spec.id};colliders.push(blocker);
 const doors=new THREE.Group();doors.position.set(x,0,z);doors.rotation.y=rotation;root.add(doors);
 const leaves=[],count=spec.secret?1:2;
 for(let i=0;i<count;i++){
  const pivot=new THREE.Group(),leaf=mergeStatic(clone(spec.kind==='fire'?'wood-leaf':'bronze-leaf'));
  leaf.scale.set((width/count)/2.574,height/3.54,1);
  // Reflect the second hinge's local X. Negative geometry scale is supported
  // by Three's normal matrix and keeps the pull on the closing edge.
  if(i===1)leaf.scale.x*=-1;
  pivot.position.x=i===0?-width/2:width/2;pivot.add(leaf);doors.add(pivot);leaves.push(pivot);
  if(spec.kind==='fire')leaf.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.userData.baseColor=o.material.color.clone();}});
 }
 const supply=addSupply(root,spec);
 for(const group of [frame,doors])group.traverse(o=>{if(o.isMesh){
  // Material.clone serializes userData; Color.toJSON becomes a hex number.
  // Retain the Color instance used by reset and gradual charring.
  const baseColor=o.material.userData.baseColor;o.material=o.material.clone();
  if(baseColor?.isColor)o.material.userData.baseColor=baseColor.clone();
  occluders.push(o);
 }});
 return {...spec,...supply,blocker,leaves,phase:'locked',open:0,charge:0,unblocked:false,weights:[],parked:[],fixtures:[]};
}
export function addGreekArchitecture(world){
 if(!greekEnabled)return null;
 const gates=greekGatePlan().map(s=>portal(world.root,world.colliders,s,world.occluders));
 // Greek key courtyard border, physically flush with the existing floor.
 const g=new THREE.Group();g.name='Greek courtyard key inlay';
 for(const side of [-1,1])for(let z=6;z<24;z+=.72){
  const x=side*13.4;for(const [dx,dz,w,d]of [[0,0,.52,.06],[.23,.24,.06,.53],[-.2,.26,.42,.06],[-.38,.08,.06,.4],[-.28,-.1,.22,.06]])block(g,x+side*dx,.026,z+dz,w,.018,d,pigment);
 }
 world.root.add(mergeStatic(g));
 flushStatic(world.root);
 return {gates};
}
export function createGreekPuzzles({architecture,world,physics,staticBox,navs,spawn,getHeld,releaseHeld,toast,fx}){
 if(!architecture)return null;
 const gates=architecture.gates;
 function installFixtures(g){g.fixtures=pressureTray(g.plates)?.fixtures||[];for(const b of g.fixtures){staticBox(b,!!b.floor);if(!b.floor)world.colliders.push(b);}}
 function removeFixture(b){const i=world.colliders.indexOf(b);if(i>=0)world.colliders.splice(i,1);if(b.physicsBody?.world)physics.removeBody(b.physicsBody);}
 for(const g of gates)installFixtures(g);
 const refresh=()=>navs().forEach(n=>n?.setObstacles(world.colliders));
 function setBlocking(g,blocked,notify=true){
  const i=world.colliders.indexOf(g.blocker);
  if(blocked){if(i<0)world.colliders.push(g.blocker);if(!g.blocker.physicsBody?.world)staticBox(g.blocker);}
  else{if(i>=0)world.colliders.splice(i,1);if(g.blocker.physicsBody?.world)physics.removeBody(g.blocker.physicsBody);}
  g.unblocked=!blocked;if(notify)refresh();
 }
 function reset(){for(const g of gates){for(const b of g.parked)removeFixture(b);g.parked=[];g.phase='locked';g.open=g.charge=0;g.hinted=false;g.weights=[];setBlocking(g,!g.dynamic,false);g.leaves.forEach(l=>{l.rotation.y=0;l.scale.y=1;l.visible=true;l.traverse(o=>{if(o.material?.userData.baseColor)o.material.color.copy(o.material.userData.baseColor);});});if(g.dynamic){g.fixtures.forEach(removeFixture);g.fixtures=[];g.plates=[];g.homes=[];g.supplyGroup.removeFromParent();g.platesVisual.forEach(p=>{p.lamp.geometry.dispose();p.lamp.material.dispose();});g.platesVisual=[];}}refresh();}
 function configureForEngine(roomName,enginePosition){
  const plan=greekGatePlan(roomName),reserved=gates.filter(g=>!g.dynamic).flatMap(g=>{const t=pressureTray(g.plates);return [...(t?[t]:[]),...g.homes.map(p=>({...p,w:1,d:1}))];});
  for(let i=0;i<gates.length;i++){
   const g=gates[i];if(!g.dynamic)continue;Object.assign(g,plan[i]);
   if(g.kind==='pressure'){
    Object.assign(g,findPressureSupply(g,world.colliders,world.props,reserved,enginePosition));const tray=pressureTray(g.plates);reserved.push(tray,...g.homes.map(p=>({...p,w:1,d:1})));Object.assign(g,addSupply(world.root,g));installFixtures(g);
   }
   const open=g.kind==='open';g.phase=open?'open':'locked';g.open=open?1:0;g.leaves.forEach(l=>l.visible=!open);setBlocking(g,!open,false);
  }
  refresh();
 }
 function spawnWeights(){for(const g of gates)g.weights=g.homes.map(p=>{const e=spawn('puzzle-weight',p.x,p.z);e.puzzleGate=g.id;return e;});}
 function recover(e,g){
  if(e===getHeld())releaseHeld(false);const p=e.spawn;e.body.position.set(p.x,.55,p.z);e.body.previousPosition.copy(e.body.position);e.body.interpolatedPosition.copy(e.body.position);e.body.velocity.set(0,0,0);e.body.angularVelocity.set(0,0,0);e.body.quaternion.set(0,0,0,1);e.body.aabbNeedsUpdate=true;e.body.wakeUp();e.pendingBreak=false;e.hp=e.maxHp;e.recoveries=(e.recoveries||0)+1;
 }
 function update(dt,engine,player){
  for(const g of gates){
   if(g.kind==='open')continue;
   for(const e of g.weights){
    const contact=physics.contacts.some(c=>c.bi===e.body&&c.bj.previewFloor||c.bj===e.body&&c.bi.previewFloor);
    if(contact)e.supportedAt={...e.body.position};
    e.supported=contact||e.body.sleepState===2&&e.supportedAt&&Math.hypot(e.body.position.x-e.supportedAt.x,e.body.position.y-e.supportedAt.y,e.body.position.z-e.supportedAt.z)<.025;
    const p=e.body.position,r=g.rotation||0,wrongSide=!g.unblocked&&((p.x-g.x)*Math.sin(r)+(p.z-g.z)*Math.cos(r))*(g.approachSign||1)<-.2;
    e.stranded=(wrongSide||(!getHeld()&&p.y>1.5))?(e.stranded||0)+dt:0;
    if(weightNeedsRecovery(e,world.floors,g.unblocked?null:e.spawn)||e.stranded>3){recover(e,g);e.stranded=0;}
   }
   const occupied=plateOccupants(g.plates,gates.flatMap(g=>g.weights),getHeld());
   g.platesVisual.forEach((p,i)=>{const active=!!occupied[i];p.g.position.y=active?.03:.06;p.lamp.position.y=active?.085:.115;p.lamp.material.emissive.setHex(active?0x46cbb8:0x2c1907);p.lamp.material.emissiveIntensity=active?1.3:.3;});
   const previous=g.phase;stepGate(g,dt,{occupied,heat:g.kind==='fire'&&flameReachesGate(engine,g,segmentBox,world.colliders)});
   if(previous==='locked'&&g.phase==='opening')toast(g.kind==='fire'?'Το ενισχυμένο ξύλο υποχωρεί στη φλόγα του HEARTH.':'Οι πλάκες ασφάλισαν. Η πύλη ανοίγει.','info');
   const a=g.open*g.open*(3-2*g.open)*Math.PI/2;
   g.leaves.forEach((l,i)=>{l.rotation.y=(i===0?1:-1)*a*(g.approachSign||1);if(g.kind==='fire'){l.scale.y=1-g.open*.85;l.traverse(o=>{if(o.material?.userData.baseColor)o.material.color.copy(o.material.userData.baseColor).lerp(new THREE.Color(0x17120e),g.charge/2.5*.88);});}});
   // The swept volume stays blocked until leaves are parked against the returns.
   if(g.phase==='open'&&!g.unblocked){
    const length=g.width/g.leaves.length,r=g.rotation||0;
    if(g.kind==='fire'){g.leaves.forEach(l=>l.visible=false);fx?.burst(new THREE.Vector3(g.x,1.2,g.z),0x775139,45,3);}
    else for(let i=0;i<g.leaves.length;i++){
     const lx=i===0?-g.width/2:g.width/2,lz=-length/2*(g.approachSign||1);
     const b={x:g.x+Math.cos(r)*lx+Math.sin(r)*lz,y:g.height/2,z:g.z-Math.sin(r)*lx+Math.cos(r)*lz,w:r?length:.26,h:g.height,d:r?.26:length,tag:'parked-'+g.id};
     g.parked.push(b);world.colliders.push(b);staticBox(b);
    }
    setBlocking(g,false);
   }
   if(player&&!g.hinted&&Math.hypot(player.body.position.x-g.x,player.body.position.z-g.z)<7){g.hinted=true;toast(g.kind==='fire'?'Ενισχυμένη ξύλινη πύλη · άνοιξέ τη με τα φλογοβόλα του HEARTH.':g.secret?'Μία σιωπηλή πλάκα κρύβει ένα πέρασμα.':'Ενιαία διπλή βάση · ένα άφθαρτο βάρος σε κάθε θέση με τηλεκίνηση.','info');}
  }
 }
 function aimTargets(engine){
  if(!engine)return [];
  return gates.filter(g=>g.kind==='fire'&&!g.unblocked).map(g=>{
   if(!g.aimProxy)g.aimProxy={category:'prop',kind:'gate-target',body:{position:new THREE.Vector3()},gate:g};
   // Aim at the visible face, outside its collision skin. Flame damage still
   // requires the live nozzles to intersect the real closed door.
   const r=g.rotation||0,nx=Math.sin(r),nz=Math.cos(r),side=(engine.body.position.x-g.x)*nx+(engine.body.position.z-g.z)*nz>=0?1:-1;g.aimProxy.body.position.set(g.x+nx*side*.24,2,g.z+nz*side*.24);return g.aimProxy;
  });
 }
 function aimTarget(engine,yaw){
  if(!engine)return null;const from=engine.body.position,end={x:from.x+Math.sin(yaw)*8,z:from.z+Math.cos(yaw)*8};
  return aimTargets(engine).find(e=>segmentBox(from,end,e.gate.blocker)!==null)||null;
 }
 const dropPlateFor=(e,position=e?.body.position)=>e?.indestructible&&gates.flatMap(g=>g.plates).find(p=>Math.hypot(position.x-p.x,position.z-p.z)<.48&&position.y<3.2);
 return {gates,reset,configureForEngine,spawnWeights,update,recover,aimTargets,aimTarget,dropPlateFor,snapshot:()=>gates.map(g=>({id:g.id,kind:g.kind,phase:g.phase,open:g.open,charge:g.charge,blocked:!g.unblocked,plates:g.plates.map((p,i)=>({...p,active:!!plateOccupants(g.plates,gates.flatMap(g=>g.weights),getHeld())[i]})),weights:g.weights.map(e=>({id:e.body.id,position:{...e.body.position},recoveries:e.recoveries||0,hp:e.hp}))}))};
}

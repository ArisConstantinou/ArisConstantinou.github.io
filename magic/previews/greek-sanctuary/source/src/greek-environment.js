import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {GREEK_GATES,plateOccupants,stepGate,weightNeedsRecovery,flameReachesGate} from './greek-puzzle-rules.js';
import {segmentBox} from './systems.js';
import {siegeSurface} from './siege-environment.js';

export const greekEnabled=typeof location!=='undefined'&&location.pathname.includes('/previews/greek-sanctuary/');
const templates=new Map(),stone=new THREE.MeshStandardMaterial({color:0xd2c5a7,roughness:.88}),edge=new THREE.MeshStandardMaterial({color:0xe0d3b5,roughness:.78}),pigment=new THREE.MeshStandardMaterial({color:0x354a52,roughness:.86});
const boxGeo=new RoundedBoxGeometry(1,1,1,1,.025);
function patina(m){
 m.onBeforeCompile=s=>{
  s.vertexShader='varying vec3 greekPosition;\n'+s.vertexShader;
  s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ngreekPosition=position;');
  s.fragmentShader='varying vec3 greekPosition;\n'+s.fragmentShader;
  s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
   float n=sin(greekPosition.x*37.+sin(greekPosition.z*19.))*sin(greekPosition.y*41.+greekPosition.z*23.);
   diffuseColor.rgb*=.94+.06*n;`);
 };m.customProgramCacheKey=()=> 'greek-patina-v1';
}
[stone,edge,pigment].forEach(patina);
export async function loadGreekAssets(){
 if(!greekEnabled)return;
 const loader=new GLTFLoader(),base=new URL('greek-sanctuary/',document.baseURI);
 await Promise.all(['column','entablature','bronze-leaf','wood-leaf','weight','plate','shield'].map(async id=>{
  const {scene}=await loader.loadAsync(new URL(id+'.glb',base).href);
  scene.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;o.material.side=THREE.FrontSide;patina(o.material);}});templates.set(id,scene);
 }));
}
function clone(id){const g=templates.get(id)?.clone(true);if(!g)throw Error('Missing Greek kit '+id);return g;}
function block(group,x,y,z,w,h,d,mat=stone){const m=new THREE.Mesh(boxGeo,mat);m.position.set(x,y,z);m.scale.set(w,h,d);m.castShadow=m.receiveShadow=true;group.add(m);return m;}
function mergeStatic(group){
 group.updateMatrixWorld(true);const groups=new Map();
 group.traverse(o=>{if(!o.isMesh)return;const key=o.material.uuid;if(!groups.has(key))groups.set(key,{material:o.material,geos:[]});const g=o.geometry.clone().applyMatrix4(o.matrixWorld);g.deleteAttribute('uv1');g.deleteAttribute('tangent');groups.get(key).geos.push(g);});
 const result=new THREE.Group();result.name=group.name;
 for(const {material,geos}of groups.values()){const merged=mergeGeometries(geos,false);if(!merged)throw Error('Greek geometry merge failed');const m=new THREE.Mesh(merged,material);m.castShadow=m.receiveShadow=true;result.add(m);geos.forEach(g=>g.dispose());}return result;
}
export function greekColumn(root,x,z,h=3.7){if(!greekEnabled)return false;const g=clone('column');g.scale.setScalar(h/3);g.position.set(x,0,z);root.add(g);return true;}
export function greekWall(root,x,z,length,height,alongX){
 const g=new THREE.Group();g.name='Greek ashlar and continuous entablature';
 // Closed, overlapping masonry core; horizontal bed joints and dressed edges.
 block(g,0,height/2,0,length,height,.8,stone);
 for(let y=.28,row=0;y<height-.1;y+=.57,row++){
  let a=-length/2;
  while(a<length/2-.01){const w=Math.min(row%2&&a===-length/2?.68:1.36,length/2-a);for(const side of [-1,1])block(g,a+w/2,y,side*.408,w-.025,.54,.035,row%3?stone:edge);a+=w;}
 }
 for(const [y,h,w]of [[.12,.19,.94],[height-.12,.16,.93],[height+.07,.13,1.02]])block(g,0,y,0,length,h,w,edge);
 if(height>2){
  block(g,0,height-.4,.457,length,.25,.026,pigment);
  for(let a=-length/2+.24;a<length/2;a+=1.1)for(const d of [-.09,0,.09])block(g,a+d,height-.4,.49,.04,.26,.07,edge);
 }
 g.rotation.y=alongX?0:Math.PI/2;g.position.set(x,0,z);root.add(mergeStatic(g));
}
export function greekFloor(room){
 if(!greekEnabled||!['courtyard','hall','bridge'].includes(room.id))return null;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;const c=canvas.getContext('2d');c.fillStyle='#827e70';c.fillRect(0,0,1024,1024);
 for(let row=0;row<4;row++)for(let col=0;col<4;col++){
  const x=col*256,y=row*256,l=(col*3+row*7)%9;
  c.fillStyle=`rgb(${195+l},${185+l},${162+l})`;c.fillRect(x+2,y+2,252,252);
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
export function greekProp(kind){
 if(!greekEnabled||!['puzzle-weight','shield'].includes(kind))return null;
 const weight=kind==='puzzle-weight',mesh=clone(weight?'weight':'shield');mesh.name=weight?'Άφθαρτο βάρος · τηλεκίνηση':'Ελληνική ασπίδα';
 return {mesh,halfExtents:new THREE.Vector3(weight?.44:.52,weight?.44:.52,weight?.44:.12),mass:weight?7:3.2,health:weight?1e6:85,label:weight?'Άφθαρτο βάρος':'Ασπίδα',indestructible:weight,flammable:false,woodFraction:0};
}
function portal(root,colliders,spec,occluders){
 const {x,z,width,height,wallWidth,rotation=0}=spec;
 const frame=new THREE.Group();frame.name=spec.id+' · Greek portal';
 const factor=height/3.6;
 for(const side of [-1,1]){
  block(frame,side*(width/2+.14),height/2,0,.28,height,.9,edge);
  const col=clone('column');col.scale.setScalar(height/3);col.position.set(side*(width/2+.53*factor),0,.33);frame.add(col);
 }
 const header=clone('entablature');header.scale.set((width+2.2)/7.4,factor,1);frame.add(header);
 frame.position.set(x,0,z);frame.rotation.y=rotation;root.add(frame);
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
  const pivot=new THREE.Group(),leaf=clone(spec.kind==='fire'?'wood-leaf':'bronze-leaf');
  leaf.scale.set((width/count)/2.574,height/3.54,1);
  // Reflect the second hinge's local X. Negative geometry scale is supported
  // by Three's normal matrix and keeps the pull on the closing edge.
  if(i===1)leaf.scale.x*=-1;
  pivot.position.x=i===0?-width/2:width/2;pivot.add(leaf);doors.add(pivot);leaves.push(pivot);
  if(spec.kind==='fire')leaf.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.userData.baseColor=o.material.color.clone();}});
 }
 const plates=spec.plates.map(p=>{const g=clone('plate');g.position.set(p.x,.025,p.z);root.add(g);const lamp=new THREE.Mesh(new THREE.RingGeometry(.47,.51,48),new THREE.MeshStandardMaterial({color:0x93652f,emissive:0x2c1907,emissiveIntensity:.3,metalness:.6,roughness:.4}));lamp.rotation.x=-Math.PI/2;lamp.position.set(p.x,.09,p.z);root.add(lamp);return {g,lamp};});
 for(const group of [frame,doors])group.traverse(o=>{if(o.isMesh){o.material=o.material.clone();occluders.push(o);}});
 return {...spec,blocker,leaves,platesVisual:plates,phase:'locked',open:0,charge:0,unblocked:false,weights:[],parked:[]};
}
export function addGreekArchitecture(world){
 if(!greekEnabled)return null;
 const gates=GREEK_GATES.map(s=>portal(world.root,world.colliders,s,world.occluders));
 // Greek key courtyard border, physically flush with the existing floor.
 const g=new THREE.Group();g.name='Greek courtyard key inlay';
 for(const side of [-1,1])for(let z=6;z<24;z+=.72){
  const x=side*13.4;for(const [dx,dz,w,d]of [[0,0,.52,.06],[.23,.24,.06,.53],[-.2,.26,.42,.06],[-.38,.08,.06,.4],[-.28,-.1,.22,.06]])block(g,x+side*dx,.026,z+dz,w,.018,d,pigment);
 }
 world.root.add(mergeStatic(g));
 return {gates};
}
export function createGreekPuzzles({architecture,world,physics,staticBox,navs,spawn,getHeld,releaseHeld,toast,fx}){
 if(!architecture)return null;
 const gates=architecture.gates;
 for(const g of gates)for(const p of g.plates)staticBox({x:p.x,y:.025,z:p.z,w:1.35,h:.05,d:1.35,tag:'pressure-slab'},true);
 const refresh=()=>navs().forEach(n=>n?.setObstacles(world.colliders));
 function setBlocking(g,blocked){
  const i=world.colliders.indexOf(g.blocker);
  if(blocked){if(i<0)world.colliders.push(g.blocker);if(!g.blocker.physicsBody?.world)staticBox(g.blocker);}
  else{if(i>=0)world.colliders.splice(i,1);if(g.blocker.physicsBody?.world)physics.removeBody(g.blocker.physicsBody);}
  g.unblocked=!blocked;refresh();
 }
 function reset(){for(const g of gates){for(const b of g.parked){const i=world.colliders.indexOf(b);if(i>=0)world.colliders.splice(i,1);if(b.physicsBody?.world)physics.removeBody(b.physicsBody);}g.parked=[];g.phase='locked';g.open=g.charge=0;g.hinted=false;g.weights=[];setBlocking(g,true);g.leaves.forEach(l=>{l.rotation.y=0;l.scale.y=1;l.visible=true;l.traverse(o=>{if(o.material?.userData.baseColor)o.material.color.copy(o.material.userData.baseColor);});});}}
 function spawnWeights(){for(const g of gates)g.weights=g.homes.map(p=>{const e=spawn('puzzle-weight',p.x,p.z);e.puzzleGate=g.id;return e;});}
 function recover(e,g){
  if(e===getHeld())releaseHeld(false);const p=e.spawn;e.body.position.set(p.x,.55,p.z);e.body.previousPosition.copy(e.body.position);e.body.interpolatedPosition.copy(e.body.position);e.body.velocity.set(0,0,0);e.body.angularVelocity.set(0,0,0);e.body.quaternion.set(0,0,0,1);e.body.aabbNeedsUpdate=true;e.body.wakeUp();e.pendingBreak=false;e.hp=e.maxHp;e.recoveries=(e.recoveries||0)+1;
 }
 function update(dt,engine,player){
  for(const g of gates){
   for(const e of g.weights){
    const contact=physics.contacts.some(c=>c.bi===e.body&&c.bj.previewFloor||c.bj===e.body&&c.bi.previewFloor);
    if(contact)e.supportedAt={...e.body.position};
    e.supported=contact||e.body.sleepState===2&&e.supportedAt&&Math.hypot(e.body.position.x-e.supportedAt.x,e.body.position.y-e.supportedAt.y,e.body.position.z-e.supportedAt.z)<.025;
    const p=e.body.position,wrongSide=!g.unblocked&&(g.secret?p.x<g.x-.2:p.z<g.z-.2);
    e.stranded=(wrongSide||(!getHeld()&&p.y>1.5))?(e.stranded||0)+dt:0;
    if(weightNeedsRecovery(e,world.floors,g.unblocked?null:e.spawn)||e.stranded>3){recover(e,g);e.stranded=0;}
   }
   const occupied=plateOccupants(g.plates,gates.flatMap(g=>g.weights),getHeld());
   g.platesVisual.forEach((p,i)=>{const active=!!occupied[i];p.g.position.y=active?-.005:.025;p.lamp.material.emissive.setHex(active?0x46cbb8:0x2c1907);p.lamp.material.emissiveIntensity=active?1.3:.3;});
   const previous=g.phase;stepGate(g,dt,{occupied,heat:g.kind==='fire'&&flameReachesGate(engine,g,segmentBox,world.colliders)});
   if(previous==='locked'&&g.phase==='opening')toast(g.kind==='fire'?'Το ενισχυμένο ξύλο υποχωρεί στη φλόγα του HEARTH.':'Οι πλάκες ασφάλισαν. Η πύλη ανοίγει.','info');
   const a=g.open*g.open*(3-2*g.open)*Math.PI/2;
   g.leaves.forEach((l,i)=>{l.rotation.y=(i===0?1:-1)*a;if(g.kind==='fire'){l.scale.y=1-g.open*.85;l.traverse(o=>{if(o.material?.userData.baseColor)o.material.color.copy(o.material.userData.baseColor).lerp(new THREE.Color(0x17120e),g.charge/2.5*.88);});}});
   // The swept volume stays blocked until leaves are parked against the returns.
   if(g.phase==='open'&&!g.unblocked){
    const length=g.width/g.leaves.length,r=g.rotation||0;
    if(g.kind==='fire'){g.leaves.forEach(l=>l.visible=false);fx?.burst(new THREE.Vector3(g.x,1.2,g.z),0x775139,45,3);}
    else for(let i=0;i<g.leaves.length;i++){
     const lx=i===0?-g.width/2:g.width/2,lz=-length/2;
     const b={x:g.x+Math.cos(r)*lx+Math.sin(r)*lz,y:g.height/2,z:g.z-Math.sin(r)*lx+Math.cos(r)*lz,w:r?length:.26,h:g.height,d:r?.26:length,tag:'parked-'+g.id};
     g.parked.push(b);world.colliders.push(b);staticBox(b);
    }
    setBlocking(g,false);
   }
   if(player&&!g.hinted&&Math.hypot(player.body.position.x-g.x,player.body.position.z-g.z)<7){g.hinted=true;toast(g.kind==='fire'?'Ενισχυμένη ξύλινη πύλη · άνοιξέ τη με τα φλογοβόλα του HEARTH.':g.secret?'Μία σιωπηλή πλάκα κρύβει ένα πέρασμα.':'Δύο πλάκες · δύο άφθαρτα βάρη. Τοποθέτησέ τα με τηλεκίνηση.','info');}
  }
 }
 function aimTargets(engine){
  if(!engine)return [];
  return gates.filter(g=>g.kind==='fire'&&!g.unblocked).map(g=>{
   if(!g.aimProxy)g.aimProxy={category:'prop',kind:'gate-target',body:{position:new THREE.Vector3()},gate:g};
   // Aim at the visible face, outside its collision skin. Flame damage still
   // requires the live nozzles to intersect the real closed door.
   const side=engine.body.position.z>=g.z?1:-1;g.aimProxy.body.position.set(g.x,2,g.z+side*.24);return g.aimProxy;
  });
 }
 function aimTarget(engine,yaw){
  if(!engine)return null;const from=engine.body.position,end={x:from.x+Math.sin(yaw)*8,z:from.z+Math.cos(yaw)*8};
  return aimTargets(engine).find(e=>segmentBox(from,end,e.gate.blocker)!==null)||null;
 }
 const dropPlateFor=(e,position=e?.body.position)=>e?.indestructible&&gates.flatMap(g=>g.plates).find(p=>Math.hypot(position.x-p.x,position.z-p.z)<.48&&position.y<3.2);
 return {gates,reset,spawnWeights,update,recover,aimTargets,aimTarget,dropPlateFor,snapshot:()=>gates.map(g=>({id:g.id,kind:g.kind,phase:g.phase,open:g.open,charge:g.charge,blocked:!g.unblocked,plates:g.plates.map((p,i)=>({...p,active:!!plateOccupants(g.plates,gates.flatMap(g=>g.weights),getHeld())[i]})),weights:g.weights.map(e=>({id:e.body.id,position:{...e.body.position},recoveries:e.recoveries||0,hp:e.hp}))}))};
}

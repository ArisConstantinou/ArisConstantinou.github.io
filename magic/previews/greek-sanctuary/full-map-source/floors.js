import {indexedClone} from './indexed-geometry.js';
import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {siegeSurface,siegeProp} from './game/src/siege-environment.js';
import {createGreekGate,greekProp} from './game/src/greek-environment.js';
import {dressGreekFurnishings,makeGreekFurniture} from './game/src/greek-furnishings.js';
import {castleBoundaries} from './game/src/castle-boundaries.js';
import {existingRooms,newRooms,corridors,secretAreas} from './game/src/castle-layout.js';
import {supportHeight,standingClear} from './game/src/walkable-support.js';
import {installFullMapOcclusion} from './occlusion.js';

export const LEVELS=[
 {id:'library',label:'Επάνω αρχείο',floorY:5.2,count:26,tread:.32,startZ:2.5,x:-56.25,gate:'single'},
 {id:'gallery',label:'Επάνω στοά',floorY:4.8,count:24,tread:.32,startZ:2.5,x:56.25,gate:'double'},
 {id:'watchtower',label:'Παρατηρητήριο',floorY:6,count:30,tread:.32,startZ:-23,x:57.25,backInset:.15,gate:null}
];
export function groundAt(world,p){let y=0;for(const f of world.floors){const h=f.y+f.h/2;if(h<=(p.y??0)+.25&&Math.abs(p.x-f.x)<=f.w/2+.001&&Math.abs(p.z-f.z)<=f.d/2+.001)y=Math.max(y,h);}return y;}
export function freePositionAt(world,origin,radius,occupied=[],maxDistance=5,allowed=()=>true){
 const reference=groundAt(world,origin),height=radius>1?3.5:1.8;
 for(let r=0;r<=maxDistance;r+=.6)for(let i=0;i<(r?24:1);i++){
  const a=i*Math.PI*2/24,x=origin.x+Math.sin(a)*r,z=origin.z+Math.cos(a)*r,y=supportHeight(world.floors,x,z,reference);
  if(y===null)continue;const p={x,y,z};
  if(standingClear(world.floors,world.colliders,p,radius,height)&&allowed(p)&&!occupied.some(e=>!e.removed&&!e.dead&&Math.abs(e.body.position.y-(y+(e.cy??.5)))<2&&Math.hypot(e.body.position.x-x,e.body.position.z-z)<e.radius+radius+.15))return p;
 }
 return null;
}

export function installFullMapFloors(world,architecture){
 const stone=new T.MeshStandardMaterial({color:0xc5bba1,roughness:.88}),edge=new T.MeshStandardMaterial({color:0xe3d7ba,roughness:.8}),pigment=new T.MeshStandardMaterial({color:0x416569,roughness:.85}),bronze=new T.MeshStandardMaterial({color:0x7d6540,roughness:.61,metalness:.67});
 const maps=siegeSurface('monastery_stone_floor');
 if(maps){stone.map=maps.map;stone.normalMap=maps.normalMap;stone.normalScale.set(.24,.24);stone.roughnessMap=maps.arm;}
 const palette={stone,edge,pigment},kit={palette:()=>palette,urn:()=>siegeProp('urn',{w:1,h:1.5,d:1,mass:5,health:70}).mesh,shield:()=>greekProp('shield').mesh};
 // Furnish the actual fourteen rooms, using their semantic identities and
 // existing licensed urn/shield models. Physical furniture reserves its bay.
 const rooms=[...existingRooms,...newRooms];
 const reservations=LEVELS.map(s=>({x:s.x,y:1.5,z:s.startZ-s.count*s.tread/2,w:6.6,h:3,d:s.count*s.tread+2.4,tag:'fullmap-stair-reservation'}));
 world.colliders.push(...reservations);
 const furnishings=dressGreekFurnishings({root:world.root,rooms,boundary:castleBoundaries([...rooms,...corridors,...secretAreas]),colliders:world.colliders,props:world.props,kit});
 for(const b of reservations)world.colliders.splice(world.colliders.indexOf(b),1);
 const groups=[],stairs=[],landings=[],fixtures=[],loot=[];
 function box(g,x,y,z,w,h,d,m=stone){const geom=new RoundedBoxGeometry(w,h,d,1,Math.min(.035,h/5)),uv=geom.attributes.uv;uv.setUsage(T.StaticDrawUsage);const o=new T.Mesh(geom,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;g.add(o);return o;}
 function solid(x,y,z,w,h,d,tag='fullmap-rail'){const b={x,y,z,w,h,d,tag};world.colliders.push(b);return b;}
 function floor(g,x,y,z,w,d,tag='fullmap-floor',extra={}){box(g,x,y-.19,z,w,.38,d,stone);const f={x,y:y-.19,z,w,h:.38,d,tag,...extra};world.floors.push(f);return f;}
 function column(g,x,z,h){
  const p=[],uv=[],idx=[],segments=80,rows=8;
  for(let j=0;j<=rows;j++)for(let i=0;i<=segments;i++){const a=i/segments*Math.PI*2,v=j/rows,r=.29*(1-.13*v)-.024*(1+Math.cos(a*20));p.push(x+r*Math.cos(a),.2+v*(h-.52),z+r*Math.sin(a));uv.push(i/segments,v*h/3);}
  for(let j=0;j<rows;j++)for(let i=0;i<segments;i++){const a=j*(segments+1)+i,b=a+segments+1;idx.push(a,b,a+1,b,b+1,a+1);}
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(p,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(idx);geo.computeVertexNormals();const o=new T.Mesh(geo,edge);o.castShadow=o.receiveShadow=true;g.add(o);
  box(g,x,.1,z,.87,.2,.87,edge);box(g,x,h-.25,z,.83,.18,.83,edge);box(g,x,h-.1,z,.98,.2,.98,edge);solid(x,h/2,z,.7,h,.7,'fullmap-support');
 }
 function railing(g,x,z,length,alongX,y){
  box(g,x,y+.10,z,alongX?length:.32,.2,alongX?.32:length,edge);
  box(g,x,y+1.02,z,alongX?length:.21,.16,alongX?.21:length,edge);
  for(let a=-length/2+.25;a<length/2;a+=.48){const xx=x+(alongX?a:0),zz=z+(alongX?0:a),o=new T.Mesh(new T.CylinderGeometry(.055,.085,.8,10),bronze);o.position.set(xx,y+.53,zz);o.castShadow=true;g.add(o);}
  solid(x,y+.55,z,alongX?length:.34,1.1,alongX?.34:length);
 }
 function furniture(g,kind,x,y,z,rotation=0){const obj=makeGreekFurniture(kind,palette,kit);obj.position.set(x,y,z);obj.rotation.y=rotation;obj.traverse(o=>{if(o.isMesh)o.castShadow=o.receiveShadow=true;});g.add(obj);const cabinet=kind==='scroll-cabinet';solid(x,y+1.2,z,cabinet?1.25:2.75,2.4,cabinet?2.25:1.3,'fullmap-furniture');}
 function batch(g){g.updateMatrixWorld(true);const bins=new Map(),old=[];g.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||Array.isArray(o.material)||o.geometry.attributes.skinIndex)return;let n=o;while(n&&n!==g){if(n.userData.asset||n.userData.keepTransforms)return;n=n.parent;}const key=o.material.uuid;if(!bins.has(key))bins.set(key,{material:o.material,geos:[]});let geo=indexedClone(o.geometry).applyMatrix4(o.matrixWorld);bins.get(key).geos.push(geo);old.push(o);});for(const o of old)o.removeFromParent();for(const b of bins.values()){for(const geo of b.geos)for(const key of Object.keys(geo.attributes))if(!b.geos.every(q=>q.attributes[key]))geo.deleteAttribute(key);const geo=mergeGeometries(b.geos,false);b.geos.forEach(q=>q.dispose());const m=new T.Mesh(geo,b.material);m.castShadow=m.receiveShadow=true;g.add(m);}}
 for(const spec of LEVELS){
  const room=rooms.find(r=>r.id===spec.id),cx=room.x+room.w/2,sx=spec.x,width=5.4,rise=spec.floorY/spec.count,endZ=spec.startZ-spec.count*spec.tread;
  const structural=new T.Group(),upper=new T.Group();structural.name=spec.id+' · staircase and bearing columns';structural.userData.fullMapOccluder=true;upper.name=spec.label;world.root.add(structural,upper);
  // Keep complete three-tread sections independently addressable. This lets
  // camera cutaways remove the steps and their cheeks without hiding the run.
  const stairSections=[];
  for(let i=0;i<spec.count;i++){
   if(i%3===0){const section=new T.Group(),count=Math.min(3,spec.count-i);section.name=spec.id+' · stair treads '+(i+1)+'–'+(i+count);section.userData.keepTransforms=true;section.userData.fullMapStairSection={stairId:spec.id,index:stairSections.length,startTread:i,treads:count,cheeks:count*2,stringers:2};structural.add(section);stairSections.push(section);}
   const section=stairSections.at(-1);
   const y=(i+1)*rise,z=spec.startZ-(i+.5)*spec.tread;
   box(section,sx,y-.12,z,width,.24,spec.tread+.025,edge);
   world.floors.push({x:sx,y:y-.12,z,w:width,h:.24,d:spec.tread+.025,tag:'fullmap-stair',stairId:spec.id,slope:rise/spec.tread});
   for(const side of [-1,1]){box(section,sx+side*(width/2+.18),y+.43,z,.32,.9,spec.tread+.03,stone);solid(sx+side*(width/2+.18),y+.43,z,.32,.9,spec.tread+.03,'fullmap-stair-cheek');}
  }
  // A load-bearing inclined stringer connects the treads to the floor. The
  // colliders remain the measured treads and rails; no invisible shortcut ramp.
  for(const section of stairSections){const {startTread:i,treads:n}=section.userData.fullMapStairSection;for(const side of [-1,1]){const a=new T.Vector3(sx+side*(width/2-.2),(spec.floorY-.27)*i/spec.count,spec.startZ-i*spec.tread),b=new T.Vector3(a.x,(spec.floorY-.27)*(i+n)/spec.count,spec.startZ-(i+n)*spec.tread),d=b.clone().sub(a),beam=box(section,0,0,0,.28,d.length(),.32,stone);beam.position.copy(a).addScaledVector(d,.5);beam.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());}batch(section);}
  const front=endZ+.018,back=room.z+(spec.backInset??.6),x0=room.x+.6,x1=room.x+room.w-.6;
  floor(upper,(x0+x1)/2,spec.floorY,(back+front)/2,x1-x0,front-back);
  for(const side of [-1,1]){
   const supportX=cx+side*(room.w/2-1.45),supportZ=spec.id==='library'&&side<0?-11.5:front-1;
   column(structural,supportX,supportZ,spec.floorY-.38);
   if(supportZ!==front-1){const z=(supportZ+front-1)/2,d=Math.abs(front-1-supportZ)+.7;box(structural,supportX,spec.floorY-.5,z,.42,.3,d,edge);solid(supportX,spec.floorY-.5,z,.42,.3,d,'fullmap-bearing-beam');}
   railing(upper,cx+side*(room.w/2-.6),(back+front)/2,front-back,false,spec.floorY);
   const a=side<0?x0:sx+width/2,b=side<0?sx-width/2:x1,length=b-a;if(length>.2)railing(upper,(a+b)/2,front,length,true,spec.floorY);
  }
  railing(upper,cx,back,x1-x0,true,spec.floorY);
  const gateZ=back+(spec.gate==='single'?3.3:3.05);
  if(spec.gate){
   const divider=new T.Group();divider.name=spec.id+' · upper doorway and complete returns';divider.userData.fullMapWall={x:cx,z:gateZ,length:x1-x0,height:4.6,alongX:true,floorY:spec.floorY};divider.userData.keepTransforms=true;upper.add(divider);
   const gateWidth=spec.gate==='single'?4.6:5.5,half=(x1-x0-gateWidth)/2;
   for(const side of [-1,1]){const xx=cx+side*(gateWidth/2+half/2);box(divider,xx,spec.floorY+2.3,gateZ,half,4.6,.65,stone);solid(xx,spec.floorY+2.3,gateZ,half,4.6,.65,'fullmap-door-return');}
   const children=new Set(divider.children);
   const gate=createGreekGate(divider,world.colliders,{id:spec.id+'-upper',kind:'pressure',secret:spec.gate==='single',customFrame:true,x:cx,z:gateZ,floorY:spec.floorY,width:gateWidth,height:4.6,wallWidth:gateWidth,
    // The archive's ground-floor slab unlocks its upper door. The gallery
    // supplies sit on its upper landing. Both are real floor-relative puzzles.
    plates:spec.gate==='single'?[{x:cx+5.2,y:0,z:2.5}]:[{x:cx-5.15,z:front-2.2},{x:cx-3.55,z:front-2.2}],
    homes:spec.gate==='single'?[{x:cx+5.2,y:0,z:.8}]:[{x:cx-6.75,z:front-1.1},{x:cx-1.95,z:front-1.1}]},world.occluders);
   gate.supplyGroup.userData.keepTransforms=true;upper.add(gate.supplyGroup);
   for(const child of divider.children)if(!children.has(child))child.userData.keepTransforms=true;
   architecture.gates.push(gate);
   box(divider,cx,spec.floorY+4.74,gateZ,gateWidth+.35,.28,1.0,edge);for(const side of [-1,1])box(divider,cx+side*(gateWidth/2+.1),spec.floorY+2.3,gateZ,.2,4.6,.98,edge);batch(divider);
   furniture(upper,spec.id==='library'?'reading-table':'vase-display',cx-4.6,spec.floorY,back+1.5);
   loot.push({id:spec.id+'-upper-reward',loot:{x:cx,y:spec.floorY,z:back+1.5},item:{kind:spec.id==='library'?'amulet':'ring',level:3,roll:2,count:1}});
  }else{
   furniture(upper,'observatory',cx-4.4,spec.floorY,back+1.55);furniture(upper,'bench',cx-8,spec.floorY,back+1.6);
  }
  const landing={id:spec.id,label:spec.label,floorY:spec.floorY,x:cx,z:(front+back)/2,x0,x1,back,front,gate:spec.gate?spec.id+'-upper':null};
  stairs.push({...spec,x:sx,width,rise,endZ,direction:-1});landings.push(landing);groups.push({group:upper,landing});batch(structural);batch(upper);
  // Doors and supply groups keep independent transforms for real interactions.
  fixtures.push({name:spec.id+' stair',x:sx,z:(spec.startZ+endZ)/2,w:width+1,d:Math.abs(spec.startZ-endZ)+1});
 }
 // Keep loose props away from the entry, treads and top landings.
 for(const p of world.props)if(fixtures.some(f=>Math.abs(p.x-f.x)<f.w/2+1&&Math.abs(p.z-f.z)<f.d/2+1)){
  const room=rooms.find(r=>p.x>r.x&&p.x<r.x+r.w&&p.z>r.z&&p.z<r.z+r.d);if(!room)continue;
  let found=false;
  for(let z=room.z+1.6;z<room.z+room.d-1.6&&!found;z+=1.2)for(let x=room.x+1.6;x<room.x+room.w-1.6&&!found;x+=1.2){
   if(fixtures.some(f=>Math.abs(x-f.x)<f.w/2+1&&Math.abs(z-f.z)<f.d/2+1)||world.colliders.some(b=>b.y-b.h/2<1.5&&Math.abs(x-b.x)<b.w/2+.8&&Math.abs(z-b.z)<b.d/2+.8)||world.props.some(other=>other!==p&&Math.hypot(x-other.x,z-other.z)<1.3))continue;
   p.x=x;p.z=z;found=true;
  }
  if(!found)throw Error('No clear loose-prop bay in '+room.id);
 }
 world.fullMap={stairs,landings,groups,furnishings,elevatedLoot:loot};
 // The crypt's door returns and relic leave no generic wall bay. Find its
 // measured free shoulder rather than silently leaving the room unfurnished.
 for(const room of rooms.filter(r=>r.id!=='bridge'&&!furnishings.placements.some(f=>f.room===r.id))){
  let placed=false;for(let z=room.z+1.5;z<room.z+room.d-1.5&&!placed;z+=1.1)for(let x=room.x+1.7;x<room.x+room.w-1.7&&!placed;x+=1.1){
   const foot={x,z,w:2.75,d:1.3};if(world.colliders.some(b=>b.y-b.h/2<2&&Math.abs(x-b.x)<(foot.w+b.w)/2+.25&&Math.abs(z-b.z)<(foot.d+b.d)/2+.25)||world.props.some(p=>Math.hypot(x-p.x,z-p.z)<2.2))continue;
   const g=new T.Group();world.root.add(g);furniture(g,'sarcophagus',x,0,z);batch(g);furnishings.placements.push({...foot,y:.6,h:1.2,room:room.id,kind:'sarcophagus'});placed=true;
  }
  if(!placed)throw Error('No fitting physical furniture bay in '+room.id);
 }
 installFullMapOcclusion(world,architecture);
 return world.fullMap;
}

export function populateFullMap(world,entities){
 for(const landing of world.fullMap.landings){const guards=entities.filter(e=>e.category==='actor'&&!e.isPlayer&&!e.bossType&&e.kind!=='boss'&&e.room===landing.id).slice(0,1);
  guards.forEach((e,i)=>{const x=landing.x+2+i*1.3,z=landing.back+1.8;e.body.position.set(x,landing.floorY+e.cy+.08,z);e.body.velocity.set(0,0,0);e.body.aabbNeedsUpdate=true;e.spawn={x,y:landing.floorY,z};e.lastSafe={...e.spawn};e.path=[];e.pathTick=0;});
 }
}

export function updateFullMapVisibility(world,player,camera){
 const p=player.body.position;
 for(const {group,landing:l}of world.fullMap.groups){
  const below=p.y-player.cy<l.floorY-.5,near=p.x>l.x0-1&&p.x<l.x1+1&&p.z>l.back-1&&p.z<l.front+2;
  group.visible=!(below&&near&&camera.position.y>l.floorY);
 }
}

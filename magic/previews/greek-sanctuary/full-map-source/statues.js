import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {DRACOLoader} from 'three/addons/loaders/DRACOLoader.js';
import {ConvexGeometry} from 'three/addons/geometries/ConvexGeometry.js';
import {fitCollisionBox} from './collision-box.js';
import {prepareStaticPicking,verifyStaticPicking} from './static-raycast.js';
const prefabs=new Map(),IDS=['caryatid','venus','artemision'];
const labels={caryatid:'Καρυάτιδα του Ερεχθείου',venus:'Αφροδίτη της Μήλου',artemision:'Δίας ή Ποσειδώνας του Αρτεμισίου'};
function collisionPoints(source,ext){
 let points=source;for(const axis of ['x','y','z'])if(ext[axis]<.025)points=points.flatMap(p=>[-1,1].map(s=>{const v=p.clone();v[axis]=s*.025;return v;}));
 const directions=[new T.Vector3(1,0,0),new T.Vector3(-1,0,0),new T.Vector3(0,1,0),new T.Vector3(0,-1,0),new T.Vector3(0,0,1),new T.Vector3(0,0,-1)];for(const x of [-1,1])for(const y of [-1,1])for(const z of [-1,1])directions.push(new T.Vector3(x,y,z));
 const selected=new Map();for(const d of directions){let best=points[0],score=-Infinity;for(const p of points){const dot=p.dot(d);if(dot>score){score=dot;best=p;}}selected.set(best.toArray().join(','),best);}return [...selected.values()];
}
export async function loadGreekStatues(progress=()=>{}){
 if(prefabs.size===3)return;const decoder=new DRACOLoader();decoder.setDecoderPath(new URL('statues/draco/',document.baseURI).href);decoder.setWorkerLimit(2);const loader=new GLTFLoader().setDRACOLoader(decoder);let done=0;
 try{for(const id of IDS){const [intact,broken]=await Promise.all(['','-fragments'].map(async suffix=>{const url=new URL('statues/models/'+id+suffix+'.glb',document.baseURI),r=await fetch(url,{signal:AbortSignal.timeout(45000)});if(!r.ok)throw Error('Statue asset '+id+': HTTP '+r.status);const data=await r.arrayBuffer(),g=await loader.parseAsync(data,new URL('.',url).href);progress(++done/6);g.scene.updateMatrixWorld(true);g.scene.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;if(o.material){o.material.roughness=Math.max(.55,o.material.roughness);o.material.metalness=0;}}});return g.scene;}));
  const box=new T.Box3().setFromObject(intact),center=box.getCenter(new T.Vector3()),size=box.getSize(new T.Vector3()),chunks=[];
  broken.traverse(o=>{if(o.name.startsWith(id+'__chunk_')){const bounds=new T.Box3().setFromObject(o),c=bounds.getCenter(new T.Vector3()),ext=bounds.getSize(new T.Vector3()).multiplyScalar(.5),points=[];o.traverse(m=>{if(!m.isMesh)return;const p=m.geometry.attributes.position,step=Math.max(1,Math.floor(p.count/48));for(let i=0;i<p.count;i+=step)points.push(new T.Vector3().fromBufferAttribute(p,i).applyMatrix4(m.matrixWorld).sub(c));});const hull=new ConvexGeometry(collisionPoints(points,ext)),a=hull.attributes.position,vertices=[],faces=[],index=new Map();for(let i=0;i<a.count;i+=3){const face=[];for(let k=0;k<3;k++){const p=new T.Vector3().fromBufferAttribute(a,i+k),key=p.toArray().join(',');if(!index.has(key)){index.set(key,vertices.length);vertices.push(p);}face.push(index.get(key));}faces.push(face);}hull.dispose();chunks.push({source:o,center:c,offset:c.clone().sub(center),ext,vertices,faces});}});
  for(const part of chunks){part.box=fitCollisionBox(part.vertices);const axes=part.box.axes.map(a=>new T.Vector3(a.x,a.y,a.z));part.boxQuaternion=new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(...axes));const hullCenter=part.vertices.reduce((a,v)=>a.add(v),new T.Vector3()).multiplyScalar(1/part.vertices.length);for(const v of part.vertices)v.sub(hullCenter);part.hullCenter=hullCenter;}
  if(chunks.length<6||size.y<1.9||size.y>2.4)throw Error('Unexpected statue geometry '+id);prepareStaticPicking(intact);prepareStaticPicking(broken);prefabs.set(id,{intact,center,size,chunks});
 }}finally{decoder.dispose();}
}
export function installGreekStatuePlinths(world){
 const stone=new T.MeshStandardMaterial({color:0xd4cbb4,roughness:.8}),trim=new T.MeshStandardMaterial({color:0xe4dbc7,roughness:.75}),placements=[];
 for(const [room,id]of [['courtyard','caryatid'],['gallery','venus'],['sanctum','artemision']]){
  const r=world.zones.find(r=>r.name===room),prefab=prefabs.get(id),w=Math.max(1.3,prefab.size.x+.32),d=Math.max(1.2,prefab.size.z+.32),candidates=[];
  for(let x=r.xMin+w/2+.9;x<r.xMax-w/2-.9;x+=.6)for(let z=r.zMin+d/2+.9;z<r.zMax-d/2-.9;z+=.6){
   const nearWall=Math.min(x-r.xMin,r.xMax-x,z-r.zMin,r.zMax-z);if(nearWall>2.65)continue;
   if(world.colliders.some(b=>b.y-b.h/2<3.4&&b.y+b.h/2>0&&Math.abs(x-b.x)<(w+b.w)/2+.5&&Math.abs(z-b.z)<(d+b.d)/2+.5)||world.props.some(p=>Math.abs(x-p.x)<w/2+(p.w??1)/2+.7&&Math.abs(z-p.z)<d/2+(p.d??1)/2+.7))continue;
   candidates.push({x,z,score:nearWall+Math.abs(x-(r.xMax-2.5))*.15+Math.abs(z-(r.zMin+2.5))*.12});
  }
  candidates.sort((a,b)=>a.score-b.score);const at=candidates[0];if(!at)throw Error('No safe Greek statue bay in '+room);
  const g=new T.Group();g.name=labels[id]+' · carved marble plinth';for(const [y,height,width,depth,mat]of [[.08,.16,w,d,trim],[.32,.32,w-.15,d-.15,stone],[.55,.14,w+.06,d+.06,trim]]){const m=new T.Mesh(new T.BoxGeometry(width,height,depth),mat);m.position.set(at.x,y,at.z);m.castShadow=m.receiveShadow=true;g.add(m);}world.root.add(g);
  world.colliders.push({x:at.x,y:.31,z:at.z,w:w+.06,h:.62,d:d+.06,tag:'greek-statue-plinth',room});world.props.push({kind:'greek-statue',statue:id,x:at.x,z:at.z,floorY:.62,rotation:0,w,d});placements.push({room,id,x:at.x,z:at.z,w,d,floorY:.62,height:prefab.size.y,fragments:prefab.chunks.length});
 }
 world.fullMap.statues=placements;return placements;
}
function bodyFor(C,parts,mass,material,position,rotation){const body=new C.Body({mass,material,position:new C.Vec3(position.x,position.y,position.z),linearDamping:.4,angularDamping:.5,allowSleep:true,sleepTimeLimit:1});for(const part of parts){const ext=part.box.halfExtents,shape=mass>0?new C.Box(new C.Vec3(ext.x,ext.y,ext.z)):new C.ConvexPolyhedron({vertices:part.vertices.map(v=>new C.Vec3(v.x,v.y,v.z)),faces:part.faces}),center=mass>0?new T.Vector3(part.box.center.x,part.box.center.y,part.box.center.z):part.hullCenter,offset=part.offset.clone().add(center),q=mass>0?part.boxQuaternion:new T.Quaternion();body.addShape(shape,new C.Vec3(offset.x,offset.y,offset.z),new C.Quaternion(q.x,q.y,q.z,q.w));}body.quaternion.setFromEuler(0,rotation||0,0);body.collisionFilterGroup=4;return body;}
export function spawnGreekStatue(ctx,x,z,options){
 const p=prefabs.get(options.statue),mesh=new T.Group(),model=p.intact.clone(true);model.position.sub(p.center);mesh.add(model);mesh.name=labels[options.statue];const y=(options.floorY??0)+p.center.y,body=bodyFor(ctx.C,p.chunks,0,ctx.material,{x,y,z},options.rotation),e={category:'prop',kind:'greek-statue',statue:options.statue,anchored:true,mesh,body,ext:p.size.clone().multiplyScalar(.5),mass:120,radius:Math.max(p.size.x,p.size.z)/2,hp:160,maxHp:160,label:labels[options.statue],indestructible:false,flammable:false,removed:false,dead:false,thrownUntil:0,thrownBy:null,collisionTimes:new Map(),pendingBreak:false,ephemeral:false,spawn:{x,z,y},fragmentCount:p.chunks.length};
 prepareStaticPicking(mesh);body.entity=e;body.addEventListener('collide',event=>ctx.impact(e,event));mesh.position.copy(body.position);mesh.quaternion.copy(body.quaternion);ctx.physics.addBody(body);ctx.scene.add(mesh);ctx.entities.push(e);return e;
}
export function fractureGreekStatue(e,ctx){
 const p=prefabs.get(e.statue);if(!p||e.fractured)return [];e.fractured=true;const pieces=[];
 for(const part of p.chunks){const model=part.source.clone(true),mesh=new T.Group();model.position.sub(part.center);mesh.add(model);mesh.name=e.label+' · θραύσμα';const offset=part.offset.clone().applyQuaternion(e.mesh.quaternion),at=new T.Vector3().copy(e.body.position).add(offset),shape={...part,offset:new T.Vector3()},body=bodyFor(ctx.C,[shape],4,ctx.material,at,0);body.quaternion.copy(e.body.quaternion);
  const fragment={category:'prop',kind:'marble-fragment',statueFragment:true,mesh,body,ext:part.ext,mass:4,radius:Math.max(part.ext.x,part.ext.z),hp:50,maxHp:50,label:'Μαρμάρινο θραύσμα',removed:false,dead:false,thrownUntil:0,thrownBy:null,collisionTimes:new Map(),pendingBreak:false,ephemeral:true,expireAt:ctx.time+18,spawn:{x:at.x,y:at.y,z:at.z},flammable:false};
  prepareStaticPicking(mesh);body.velocity.set(offset.x*.8+(e.body.velocity.x||0)*.15,1.3+Math.random()*.7,offset.z*.8+(e.body.velocity.z||0)*.15);body.angularVelocity.set((Math.random()-.5)*1.4,(Math.random()-.5)*1.4,(Math.random()-.5)*1.4);body.entity=fragment;body.addEventListener('collide',event=>ctx.impact(fragment,event));mesh.position.copy(body.position);mesh.quaternion.copy(body.quaternion);ctx.physics.addBody(body);ctx.scene.add(mesh);ctx.entities.push(fragment);pieces.push(fragment);
 }
 return pieces;
}
export function verifyStatuePicking(){return [...prefabs.entries()].flatMap(([id,p])=>[...verifyStaticPicking(p.intact),...verifyStaticPicking(p.chunks[0].source)].map(c=>({id,...c})));}

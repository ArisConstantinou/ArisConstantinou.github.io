import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {pathToFileURL} from 'node:url';import path from 'node:path';
import * as T from './game/node_modules/three/build/three.module.js';
const before=process.env.MAGIC_DOOR_BEFORE==='1',file=before?'../hearth-door-before-458865a/occlusion.js':'./occlusion.js';
const three=pathToFileURL(path.resolve('game/node_modules/three/build/three.module.js')).href;
const batchSource=(await fs.readFile(new URL('./static-wall-batches.js',import.meta.url),'utf8')).replace("from 'three'",`from '${three}'`).replace("from './exact-index.js'",`from '${new URL('./exact-index.js',import.meta.url).href}'`);
const batchURL='data:text/javascript;base64,'+Buffer.from(batchSource).toString('base64');
const source=(await fs.readFile(new URL(file,import.meta.url),'utf8')).replace("from 'three'",`from '${three}'`).replace("from './static-wall-batches.js'",`from '${batchURL}'`);
const {installFullMapOcclusion,updateFullMapOcclusion}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
test('closed door and frame remain visible while an obstructing wall is cut away',()=>{
 const root=new T.Group(),wall=new T.Mesh(new T.BoxGeometry(8,5,.2),new T.MeshBasicMaterial());wall.position.set(0,2.5,1);wall.userData.fullMapWall={alongX:true,x:0,z:1,length:8,floorY:0};root.add(wall);
 const doors=new T.Group(),frame=new T.Group();root.add(doors,frame);const leaf=new T.Mesh(new T.BoxGeometry(3,3,.2),new T.MeshBasicMaterial());leaf.position.y=1.5;doors.add(leaf);const header=new T.Mesh(new T.BoxGeometry(4,.3,.3),new T.MeshBasicMaterial());header.position.y=3.2;frame.add(header);
 const world={root,fullMap:{}},camera=new T.PerspectiveCamera();camera.position.set(0,3,8);root.updateMatrixWorld(true);
 installFullMapOcclusion(world,{gates:[{id:'closed-test-door',frame,doors}]});updateFullMapOcclusion(world,{body:{position:new T.Vector3(0,1.5,-2)},cy:1.22},camera,.2,true);
 assert.equal(wall.visible,false,'wall cutaway still works');assert.equal(doors.visible,true,'a door cannot become an invisible physical barrier');assert.equal(frame.visible,true,'the door frame stays with its leaves');
});

test('upper doors and batched frames follow their floor while remaining independent of wall cutaways',()=>{
 const root=new T.Group(),upper=new T.Group(),divider=new T.Group();root.add(upper);upper.add(divider);
 upper.position.set(12,0,-8);divider.userData.fullMapWall={alongX:true,x:12,z:-8,length:8,floorY:4.8};
 const doors=new T.Group(),frame=new T.Group();divider.add(doors,frame);doors.position.set(0,4.8,0);
 const leaf=new T.Mesh(new T.BoxGeometry(3,4,.2),new T.MeshStandardMaterial());leaf.position.set(1.5,2,0);doors.add(leaf);
 const material=new T.MeshStandardMaterial();for(let i=0;i<4;i++){const trim=new T.Mesh(new T.BoxGeometry(.2,4,.2),material);trim.position.set(i,6.8,0);frame.add(trim);}
 root.updateMatrixWorld(true);const original=leaf.matrixWorld.clone(),world={root,fullMap:{groups:[{group:upper,landing:{gate:'gallery-upper'}}]}};
 installFullMapOcclusion(world,{gates:[{id:'gallery-upper',frame,doors}]});root.updateMatrixWorld(true);
 assert(leaf.matrixWorld.equals(original),'reparenting preserves world-space doorway placement');
 const camera=new T.PerspectiveCamera();camera.position.set(12,18,10);camera.lookAt(12,1,-8);camera.updateMatrixWorld();
 const subject={body:{position:new T.Vector3(12,1,-8)},cy:.86};
 const shown=o=>{for(let p=o;p;p=p.parent)if(!p.visible)return false;return true;};
 for(const upperVisible of [false,true,false,true]){
  upper.visible=upperVisible;divider.visible=false;updateFullMapOcclusion(world,subject,camera,.2,true);
  assert.equal(shown(doors),upperVisible,'door follows upper floor visibility');assert.equal(shown(frame),upperVisible,'frame follows upper floor visibility');
  const batch=root.children.find(o=>o.isBatchedMesh);assert(batch);for(let i=0;i<4;i++)assert.equal(batch.getVisibleAt(i),upperVisible,'batched frame has the same floor visibility');
 }
 doors.rotation.y=.8;doors.updateMatrixWorld(true);assert(!leaf.matrixWorld.equals(original),'open/breached-door motion remains dynamic');
});

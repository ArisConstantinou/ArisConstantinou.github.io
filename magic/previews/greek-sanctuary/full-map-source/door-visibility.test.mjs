import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {pathToFileURL} from 'node:url';import path from 'node:path';
import * as T from './game/node_modules/three/build/three.module.js';
const before=process.env.MAGIC_DOOR_BEFORE==='1',file=before?'../hearth-door-before-458865a/occlusion.js':'./occlusion.js';
const three=pathToFileURL(path.resolve('game/node_modules/three/build/three.module.js')).href;
const batchSource=(await fs.readFile(new URL('./static-wall-batches.js',import.meta.url),'utf8')).replace("from 'three'",`from '${three}'`);
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

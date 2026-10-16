import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {pathToFileURL} from 'node:url';import path from 'node:path';
import * as T from './game/node_modules/three/build/three.module.js';
const three=pathToFileURL(path.resolve('game/node_modules/three/build/three.module.js')).href;
const batches=(await fs.readFile('static-wall-batches.js','utf8')).replace("from 'three'",`from '${three}'`);
const file=process.env.MAGIC_WALL_BEFORE==='1'?'../../combat-performance-1.6.8/source/occlusion.js':'occlusion.js';
const code=(await fs.readFile(file,'utf8')).replace("from 'three'",`from '${three}'`).replace("from './static-wall-batches.js'",`from 'data:text/javascript;base64,${Buffer.from(batches).toString('base64')}'`);
const {installFullMapOcclusion,updateFullMapOcclusion}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
test('wall cutaway does not blink after transient loss of a sightline and restores after sustained clearance',()=>{
 const root=new T.Group(),wall=new T.Mesh(new T.BoxGeometry(8,5,.2),new T.MeshBasicMaterial());wall.position.set(0,2.5,1);wall.userData.fullMapWall={alongX:true,x:0,z:1,length:8,floorY:0};root.add(wall);root.updateMatrixWorld(true);
 const world={root,fullMap:{}},camera=new T.PerspectiveCamera();camera.position.set(0,3,8);camera.updateMatrixWorld(true);installFullMapOcclusion(world,{gates:[]});
 const subject={body:{position:new T.Vector3(0,1.5,-2)},cy:.5};
 const blocked=()=>{subject.body.position.x=0;updateFullMapOcclusion(world,subject,camera,.11,true);};
 // A tiny wall-edge crossing can change the ray result. Vary the wall's query
 // participation here so the test isolates release hysteresis from geometry.
 blocked();assert.equal(wall.visible,false);const raycast=wall.raycast;wall.raycast=()=>{};
 updateFullMapOcclusion(world,subject,camera,.11,true);assert.equal(wall.visible,false,'one clear sample must not flash a wall');
 wall.raycast=raycast;blocked();wall.raycast=()=>{};
 for(let i=0;i<4;i++)updateFullMapOcclusion(world,subject,camera,.11,true);
 assert.equal(wall.visible,true,'wall returns when the line stays clear');
 wall.raycast=raycast;blocked();assert.equal(wall.visible,false);updateFullMapOcclusion(world,subject,camera,.11,false);assert.equal(wall.visible,true,'menu reset restores walls immediately');
 wall.geometry.dispose();wall.material.dispose();
});

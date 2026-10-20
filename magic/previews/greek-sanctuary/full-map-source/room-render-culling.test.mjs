import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs/promises';
import {Group,Mesh,BoxGeometry,MeshStandardMaterial} from './game/node_modules/three/build/three.module.js';
const base=process.env.MAGIC_FOG_BASELINE?new URL('../../frame-stability-20261018/source/',import.meta.url):new URL('./',import.meta.url),three=new URL('./game/node_modules/three/build/three.module.js',import.meta.url).href;
const code=(await fs.readFile(new URL('static-wall-batches.js',base),'utf8')).replace("from 'three'",`from '${three}'`).replace("from './exact-index.js'",`from '${new URL('exact-index.js',base).href}'`);
const {batchStaticWalls}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
test('room mask removes static submissions independently of original wall cutaways and restores them',()=>{
 const root=new Group(),m=new MeshStandardMaterial(),g=new BoxGeometry(),sources=[],owners=[];
 for(let i=0;i<4;i++){const owner=new Group(),mesh=new Mesh(g,m);owner.position.x=i*3;owner.add(mesh);root.add(owner);sources.push(mesh);owners.push(owner);}
 root.updateMatrixWorld(true);const state=batchStaticWalls(root,sources),batch=root.children.find(o=>o.isBatchedMesh);
 assert.equal(batch.getVisibleAt(1),true);sources[1].userData.roomFogVisible=false;state.update();assert.equal(batch.getVisibleAt(1),false,'Hidden-room source is still submitted');assert.equal(sources[1].visible,true,'Rendering fog must not overwrite gameplay visibility');
 sources[1].userData.roomFogVisible=true;owners[1].visible=false;state.update();assert.equal(batch.getVisibleAt(1),false,'Room changes must not restore a cutaway wall');
 owners[1].visible=true;state.update();assert.equal(batch.getVisibleAt(1),true);assert.equal(sources[1].geometry,g);
});

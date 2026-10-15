import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const moduleText=(await fs.readFile(new URL('./game/src/item-shadows.js',import.meta.url),'utf8')).replace("from 'three'",`from '${pathToFileURL(path.resolve('game/node_modules/three/build/three.module.js')).href}'`);
const {shadowSupport,projectedHalfExtents,createItemShadows}=await import('data:text/javascript;base64,'+Buffer.from(moduleText).toString('base64'));
const THREE=await import(pathToFileURL(path.resolve('game/node_modules/three/build/three.module.js')));
const floor={x:0,y:-.3,z:0,w:10,h:.6,d:10},upper={x:0,y:4.6,z:0,w:5,h:.4,d:5};
test('Choose the floor below the item, without projecting through an upper floor',()=>{
 assert.equal(shadowSupport({x:0,z:0},6,[floor,upper]).y,4.8);
 assert.equal(shadowSupport({x:0,z:0},2,[floor,upper]).y,0);
});
test('Pressure tray and stairs take precedence over the room floor',()=>{
 const tray={...floor,y:.02,h:.12,w:3.32,d:1.72};
 assert.equal(shadowSupport({x:0,z:0},2,[floor,tray]).y,.08);
 const stair={...floor,y:1.1,h:.2,w:2,d:.4};
 assert.ok(Math.abs(shadowSupport({x:0,z:0},2,[floor,stair]).y-1.2)<1e-9);
});
test('No shadow floats across a gap or onto a ceiling',()=>{
 assert.equal(shadowSupport({x:12,z:0},6,[floor,upper]),null);
 assert.equal(shadowSupport({x:0,z:0},-1,[floor,upper]),null);
});
test('A horizontal door uses its rotated footprint and actual lower edge',()=>{
 const h=projectedHalfExtents({x:.6,y:1.06,z:.14},new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2));
 assert.ok(Math.abs(h.y-.14)<1e-9);assert.ok(Math.abs(h.z-1.06)<1e-9);
});
test('Held and airborne props share one draw; landing, removal and restart clear it',()=>{
 const scene=new THREE.Scene(),shadows=createItemShadows(scene),e={category:'prop',kind:'crate',ext:{x:.5,y:.5,z:.5},mesh:new THREE.Group(),body:{id:7,position:{x:0,y:2,z:0},quaternion:new THREE.Quaternion(),sleepState:0}};
 shadows.update([e],e,{floors:[floor],colliders:[]});assert.equal(shadows.snapshot().count,1);assert.equal(shadows.snapshot().drawCalls,1);
 assert.equal(shadows.snapshot().items[0].x,0);assert.equal(shadows.snapshot().items[0].y,0);
 e.body.position.y=.5;shadows.update([e],null,{floors:[floor],colliders:[]});assert.equal(shadows.snapshot().count,0);
 shadows.update([],null,{floors:[floor],colliders:[]});assert.equal(shadows.snapshot().count,0);
 shadows.dispose();assert.equal(scene.children.length,0);
});
function shadowFixture(){
 const scene=new THREE.Scene(),shadows=createItemShadows(scene),group=new THREE.Group();
 const caster=new THREE.Mesh(),nonCaster=new THREE.Mesh();caster.castShadow=true;nonCaster.castShadow=false;group.add(caster,nonCaster);
 const e={category:'prop',kind:'crate',ext:{x:.5,y:.5,z:.5},mesh:group,body:{id:7,position:{x:0,y:2,z:0},quaternion:new THREE.Quaternion(),sleepState:0}};
 return {shadows,e,caster,nonCaster};
}
test('Placement shadow replaces the directional caster, then restores exact flags on landing',()=>{
 const {shadows,e,caster,nonCaster}=shadowFixture(),world={floors:[floor],colliders:[]};
 shadows.update([e],e,world);assert.equal(caster.castShadow,false);assert.equal(nonCaster.castShadow,false);
 e.body.position.y=.5;shadows.update([e],null,world);assert.equal(caster.castShadow,true);assert.equal(nonCaster.castShadow,false);
 shadows.dispose();
});
test('Removal and disposal restore suppressed casters, including reserved assembly parts',()=>{
 const {shadows,e,caster}=shadowFixture(),world={floors:[floor],colliders:[]};
 shadows.update([e],e,world);assert.equal(caster.castShadow,false);shadows.update([],null,world);assert.equal(caster.castShadow,true);
 shadows.update([e],e,world);assert.equal(caster.castShadow,false);e.reserved=true;shadows.update([e],null,world);assert.equal(caster.castShadow,true);
 e.reserved=false;shadows.update([e],e,world);assert.equal(caster.castShadow,false);shadows.dispose();assert.equal(caster.castShadow,true);
});

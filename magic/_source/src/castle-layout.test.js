import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {existingRooms,newRooms,secretAreas,layoutMetrics} from './castle-layout.js';
import {createWorld} from './world.js';
import {NavigationGrid} from './systems.js';
test('fourteen main rooms gain 25 percent per dimension without adding enemies or bosses',()=>{
 const originals=[[24,16],[20,14],[14,13],[5.4,7],[18,14],[18,14],[14,12],[14,12],[14,16],[16,14],[14,13],[18,14],[14,16],[16,14],[16,14]];
 [...existingRooms,...newRooms].forEach((r,i)=>{assert.equal(r.w,originals[i][0]*1.25);assert.equal(r.d,originals[i][1]*1.25);});
 assert.equal(layoutMetrics.mainRooms,14);assert.equal(layoutMetrics.ordinaryEnemies,64);assert.equal(layoutMetrics.bosses,4);assert.equal(existingRooms[0].enemies,0);
});
test('all main rooms and three 3x4 loot alcoves are reachable on the actual collision map',()=>{
 const world=createWorld(new THREE.Scene()),nav=new NavigationGrid(world.floors,world.colliders);
 for(const r of world.rooms){const point=nav.point(nav.nearest(r.x+r.w/2,r.z+r.d/2));assert.ok(nav.path(world.spawn,point).length,r.id);}
 for(const r of secretAreas){
  assert.equal(r.w*r.d,12);assert.ok(r.item.kind&&r.item.level>=3);
  assert.ok(nav.isFree(r.loot.x,r.loot.z),r.id+' loot placement');
  assert.ok(nav.path(world.spawn,r.loot).length,r.id+' entry');
  const parent=world.rooms.find(p=>p.id===r.parent);
  const path=nav.path({x:parent.x+parent.w/2,z:parent.z+parent.d/2},r.loot);
  assert.ok(path.length,r.id+' parent connection');assert.ok(path.every(p=>nav.onFloor(p.x,p.z)),r.id+' floor');
 }
 world.dispose();
});
test('spatial batches preserve individual wood scorch/reset colors and arch occlusion',()=>{
 const world=createWorld(new THREE.Scene());assert.ok(world.occluders.length>=4);
 const matrix=new THREE.Matrix4(),point=new THREE.Vector3();
 for(const wood of world.woodenSurfaces){wood.mesh.getMatrixAt(wood.index,matrix);point.setFromMatrixPosition(matrix);assert.ok(point.distanceTo(wood.position)<1e-5,wood.id);}
 const wood=world.woodenSurfaces[0],color=new THREE.Color();wood.woodFuel=0;world.scorchWood(wood);wood.mesh.getColorAt(wood.index,color);assert.ok(color.distanceTo?color.distanceTo(new THREE.Color(0x171311))<1e-5:Math.abs(color.r-new THREE.Color(0x171311).r)<1e-5);
 world.resetWood();wood.mesh.getColorAt(wood.index,color);assert.ok(Math.abs(color.r-wood.baseColor.r)<1e-5);world.dispose();
});

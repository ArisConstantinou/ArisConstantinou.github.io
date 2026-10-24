import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld} from '../src/world.js';

// Texture painting is a browser boundary. Geometry, actual world construction,
// shelter mutations, effect simulation and disposal all run unchanged in Node.
const previousDocument=globalThis.document;
const context={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
globalThis.document={createElement(){return {width:0,height:0,getContext(){return context}}}};
const scene=new THREE.Scene(),world=createWorld(scene,{}, {seed:731});
let ids=0;
const data=(overrides={})=>({id:`test-camp-${++ids}`,x:8,z:8,team:'ally',tier:1,hp:350,maxHp:350,storage:{food:40,reeds:30},buildings:{},destroyed:false,...overrides});
const fullBuildings={store:true,watchtower:true,nursery:true,palisade:true};
after(()=>{world.dispose();if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;});

test('an empty building inventory shows the main hut without unpurchased upgrades',()=>{
  const shelter=world.createShelter(data());
  assert.equal(shelter.userData.core.visible,true);
  for(const name of ['storage','watchtower','nursery','palisade','extra','ruin','looseLoot'])assert.equal(shelter.userData[name].visible,false,`${name} must be hidden`);
  assert.equal(shelter.userData.team,'ally');assert.equal(shelter.userData.destroyed,false);
  world.removeShelter(shelter);
});

test('purchased buildings and their supported aliases control the matching visuals',()=>{
  const shelter=world.createShelter(data({buildings:fullBuildings}));
  for(const name of ['storage','watchtower','nursery','palisade'])assert.equal(shelter.userData[name].visible,true);
  world.updateShelter(shelter,{buildings:{storage:true,tower:true,hatchery:true,walls:true}});
  for(const name of ['storage','watchtower','nursery','palisade'])assert.equal(shelter.userData[name].visible,true);
  world.updateShelter(shelter,{tier:3,buildings:{store:false,watchtower:false,nursery:false,palisade:false}});
  for(const name of ['storage','watchtower','nursery','palisade'])assert.equal(shelter.userData[name].visible,false,`${name} must not be unlocked by tier alone`);
  world.removeShelter(shelter);
});

test('destruction switches to collapsed ruins, falls the banner and extinguishes its lamp',()=>{
  const shelter=world.createShelter(data({team:'enemy4',tier:2,buildings:fullBuildings}));
  world.updateShelter(shelter,{hp:0,destroyed:true});
  assert.equal(shelter.userData.ruin.visible,true);
  for(const name of ['core','extra','watchtower','nursery','palisade','lamp'])assert.equal(shelter.userData[name].visible,false);
  assert.equal(shelter.userData.storage.visible,true);assert.ok(shelter.userData.foodMesh.count>0);
  assert.ok(shelter.userData.banner.rotation.z>1.4);assert.equal(shelter.userData.team,'enemy4');
  world.update(1/60,20,0,new THREE.Vector3(8,1,8));assert.equal(shelter.userData.light.visible,false);
  world.removeShelter(shelter);
});

test('looted ruins remove their exposed supplies while retaining the ruined state and faction',()=>{
  const shelter=world.createShelter(data({team:'enemy2',buildings:fullBuildings,hp:0,destroyed:true}));
  world.updateShelter(shelter,{lootTaken:true,storage:{food:0,reeds:0}});
  assert.equal(shelter.userData.storage.visible,false);assert.equal(shelter.userData.foodMesh.count,0);assert.equal(shelter.userData.looseLoot.visible,false);
  assert.equal(shelter.userData.ruin.visible,true);assert.equal(shelter.userData.destroyed,true);assert.equal(shelter.userData.team,'enemy2');
  world.removeShelter(shelter);
});

test('a destroyed basic hut exposes loot without pretending a store was purchased',()=>{
  const shelter=world.createShelter(data({hp:0,destroyed:true,buildings:{}}));
  assert.equal(shelter.userData.storage.visible,false);assert.equal(shelter.userData.looseLoot.visible,true);assert.ok(shelter.userData.looseLoot.count>0);
  world.updateShelter(shelter,{lootTaken:true,storage:{food:0,reeds:0}});
  assert.equal(shelter.userData.looseLoot.visible,false);
  world.removeShelter(shelter);
});

test('rebuilding restores the original hut and banner cleanly with the new purchased inventory',()=>{
  const shelter=world.createShelter(data({team:'enemy1',buildings:fullBuildings}));
  world.updateShelter(shelter,{hp:0,destroyed:true});
  world.updateShelter(shelter,{team:'ally',hp:350,maxHp:350,tier:1,destroyed:false,buildings:{},storage:{food:12,reeds:15},lootTaken:false});
  assert.equal(shelter.userData.core.visible,true);assert.equal(shelter.userData.core.rotation.z,0);assert.equal(shelter.userData.core.userData.roof.scale.y,1);
  assert.equal(shelter.userData.ruin.visible,false);assert.equal(shelter.userData.looseLoot.visible,false);assert.equal(shelter.userData.lamp.visible,true);
  assert.equal(shelter.userData.banner.rotation.x,0);assert.equal(shelter.userData.banner.rotation.y,0);assert.equal(shelter.userData.banner.rotation.z,0);assert.equal(shelter.userData.banner.position.y,0);
  assert.equal(shelter.userData.team,'ally');assert.equal(shelter.userData.banner.userData.flag.material.color.getHexString(),'8ecf75');
  for(const name of ['storage','watchtower','nursery','palisade'])assert.equal(shelter.userData[name].visible,false);
  world.updateShelter(shelter,{buildings:{store:true}});
  assert.equal(shelter.userData.storage.visible,true);assert.equal(shelter.userData.storageCover.position.y,.5);assert.equal(shelter.userData.storageCover.rotation.z,.17);
  world.removeShelter(shelter);
});

test('construction, ruin/rebuild and effect updates retain finite world geometry and support heights',()=>{
  const shelter=world.createShelter(data({buildings:fullBuildings}));
  world.updateShelter(shelter,{hp:0,destroyed:true});world.updateShelter(shelter,{hp:350,destroyed:false});
  world.splash(new THREE.Vector3(0,0,0),2);world.impact(new THREE.Vector3(1,.5,1),'#e9cb87',1);world.update(.05,20.05,.4,new THREE.Vector3());
  world.group.updateMatrixWorld(true);
  world.group.traverse(object=>{
    for(const value of object.matrixWorld.elements)assert.ok(Number.isFinite(value),`${object.name}: finite transform`);
    if(object.geometry)for(const value of object.geometry.attributes.position?.array??[])assert.ok(Number.isFinite(value),`${object.name}: finite vertex`);
  });
  assert.equal(world.getSurface(0,0).type,'lily');assert.ok(Number.isFinite(world.sampleHeight(8,8)));
  world.removeShelter(shelter);assert.equal(shelter.parent,null);
});

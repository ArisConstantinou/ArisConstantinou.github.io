import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld,SHELTER_SCALE,SHELTER_RADIUS} from '../src/world.js';
import {BUILDING_FOOTPRINTS,EXTRA_HUT_FOOTPRINT,defaultPlacement} from '../src/placement-rules.js';
import {WORLD_EXTENT,WORLD_LAYOUT_VERSION,WORLD_PREDATOR_ANCHORS} from '../src/world-config.js';

// Texture painting is a browser boundary. Geometry, actual world construction,
// shelter mutations, effect simulation and disposal all run unchanged in Node.
const previousDocument=globalThis.document;
const context={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
globalThis.document={createElement(){return {width:0,height:0,getContext(){return context}}}};
const scene=new THREE.Scene(),world=createWorld(scene,{}, {seed:731});
let ids=0;
const data=(overrides={})=>({id:`test-camp-${++ids}`,x:8,z:8,team:'ally',tier:1,hp:350,maxHp:350,storage:{food:40,reeds:30},buildings:{},destroyed:false,...overrides});
const fullBuildings={store:true,watchtower:true,nursery:true,palisade:true,training:true};
after(()=>{world.dispose();if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;});

test('an empty building inventory shows the main hut without unpurchased upgrades',()=>{
  const shelter=world.createShelter(data());
  assert.equal(shelter.userData.core.visible,true);
  for(const name of ['storage','watchtower','nursery','palisade','training','extra','ruin','looseLoot'])assert.equal(shelter.userData[name].visible,false,`${name} must be hidden`);
  assert.equal(shelter.userData.team,'ally');assert.equal(shelter.userData.destroyed,false);
  world.removeShelter(shelter);
});

test('purchased buildings and their supported aliases control the matching visuals',()=>{
  const shelter=world.createShelter(data({buildings:fullBuildings}));
  for(const name of ['storage','watchtower','nursery','palisade','training'])assert.equal(shelter.userData[name].visible,true);
  world.updateShelter(shelter,{buildings:{storage:true,tower:true,hatchery:true,walls:true,trainingGround:true}});
  for(const name of ['storage','watchtower','nursery','palisade','training'])assert.equal(shelter.userData[name].visible,true);
  world.updateShelter(shelter,{tier:3,buildings:{store:false,watchtower:false,nursery:false,palisade:false,training:false}});
  for(const name of ['storage','watchtower','nursery','palisade','training'])assert.equal(shelter.userData[name].visible,false,`${name} must not be unlocked by tier alone`);
  world.removeShelter(shelter);
});

test('destruction switches to collapsed ruins, falls the banner and extinguishes its lamp',()=>{
  const shelter=world.createShelter(data({team:'enemy4',tier:2,buildings:fullBuildings}));
  world.updateShelter(shelter,{hp:0,destroyed:true});
  assert.equal(shelter.userData.ruin.visible,true);
  for(const name of ['core','extra','watchtower','nursery','palisade','training','lamp'])assert.equal(shelter.userData[name].visible,false);
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
  for(const name of ['storage','watchtower','nursery','palisade','training'])assert.equal(shelter.userData[name].visible,false);
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
  const exposedPad=world.platforms.find(p=>p.type==='lily'&&world.getSurface(p.x,p.z).type==='lily');assert.ok(exposedPad,'the wider camps preserve lily-pad routes');assert.ok(Number.isFinite(world.sampleHeight(8,8)));
  world.removeShelter(shelter);assert.equal(shelter.parent,null);
});

test('shelters have a full-scale communal courtyard and physical support matching its raised floor',()=>{
  const before=world.sampleHeight(8,8),shelter=world.createShelter(data({buildings:fullBuildings}));
  assert.equal(shelter.scale.x,SHELTER_SCALE);assert.ok(SHELTER_SCALE>=2);
  assert.equal(shelter.userData.radius,SHELTER_RADIUS);assert.ok(shelter.userData.foundation.children.length>=1);
  for(const dx of [-10,0,10]){
    const support=world.getSurface(8+dx,8);assert.equal(support.type,'land');assert.equal(support.platform,shelter.userData.support);
    assert.ok(Math.abs(support.height-(before+.11))<1e-8);
  }
  const support=shelter.userData.support;world.removeShelter(shelter);
  assert.ok(!world.platforms.includes(support));assert.notEqual(world.getSurface(8,8).platform,support);
  assert.ok(Math.abs(world.sampleHeight(8,8)-before)<1e-8,'removal must not leave a ghost platform');
});

test('clan banners use distinct pictorial emblems and capture switches the emblem with the faction',()=>{
  const a=world.createShelter(data({team:'enemy0'})),b=world.createShelter(data({team:'enemy3',x:31,z:-56}));
  assert.notEqual(a.userData.banner.userData.flag.material.map,b.userData.banner.userData.flag.material.map);
  const enemyMap=a.userData.banner.userData.flag.material.map;
  world.updateShelter(a,{team:'ally'});
  assert.equal(a.userData.banner.userData.emblemTeam,'ally');assert.notEqual(a.userData.banner.userData.flag.material.map,enemyMap);
  world.removeShelter(a);world.removeShelter(b);
});

test('the training yard is a purchased, supported construction that survives ruin and rebuild correctly',()=>{
  const shelter=world.createShelter(data({buildings:{training:true}}));
  assert.equal(shelter.userData.training.visible,true);let hasTrainingMesh=false;shelter.userData.training.traverse(c=>{if(c.isMesh)hasTrainingMesh=true;});assert.ok(hasTrainingMesh);
  const position=shelter.userData.trainingPoint;
  assert.equal(world.getSurface(position.x,position.z).platform,shelter.userData.support);
  world.updateShelter(shelter,{destroyed:true,hp:0});assert.equal(shelter.userData.training.visible,false);
  world.updateShelter(shelter,{destroyed:false,hp:350,buildings:{}});assert.equal(shelter.userData.training.visible,false);
  world.updateShelter(shelter,{buildings:{training:true}});assert.equal(shelter.userData.training.visible,true);
  world.removeShelter(shelter);
});

test('larger camp islands leave the fish hunter and boss anchor in a usable water corridor',()=>{
  const anchor=WORLD_PREDATOR_ANCHORS.fish;
  const wet=s=>s.type==='water'||s.type==='lily'||s.height<.13;
  assert.ok(wet(world.getSurface(anchor.x,anchor.z)),'the fish must not spawn stranded on an expanded island');
  let wetSamples=0;
  for(let dx=-6;dx<=6;dx+=3)for(let dz=-6;dz<=6;dz+=3)if(wet(world.getSurface(anchor.x+dx,anchor.z+dz)))wetSamples++;
  assert.ok(wetSamples>=20,'the larger fish boss needs a broad reachable breach area');
});

test('expanded lake contains real distant territories, forage and support surfaces',()=>{
  assert.equal(world.extent,WORLD_EXTENT);assert.equal(world.layoutVersion,WORLD_LAYOUT_VERSION);
  assert.ok(world.water.geometry.parameters.width>=440,'the water must cover the full expanded basin');
  const terrain=world.group.getObjectByName('Expanded wetland floor');assert.ok(terrain.geometry.parameters.width>world.extent*2);
  const distantCamps=world.campSites.filter(c=>Math.abs(c.x)>110||Math.abs(c.z)>110);
  assert.ok(distantCamps.length>=3,'territories must be spread beyond the old movement boundary');
  assert.ok(world.hotspots.filter(s=>Math.abs(s.x)>110||Math.abs(s.z)>110).length>=3,'distant regions must have actual food locations');
  for(const camp of world.campSites){
    assert.ok(Math.max(Math.abs(camp.x),Math.abs(camp.z))+camp.radius<WORLD_EXTENT,'the complete camp must fit inside the playable area');
    assert.equal(world.getSurface(camp.x,camp.z).type,'land','terrain sampling must recognize the relocated island');
    assert.ok(camp.radius<18,'camp structures and islands retain their physical scale');
  }
  for(const spot of world.hotspots)assert.notEqual(world.getSurface(spot.x,spot.z).type,'water','forage lures retain a physical support platform');
});

test('stepping routes connect the starting pad to every distant island without larger jump gaps',()=>{
  const nodes=world.platforms.filter(p=>['lily','rock','land'].includes(p.type));
  const start=nodes.find(p=>p.type==='lily'&&p.x===0&&p.z===0);assert.ok(start);
  const visited=new Set([start]),pending=[start];
  // Three metres of open water between support edges remains a short hop.
  while(pending.length){const current=pending.shift();for(const candidate of nodes){
    if(visited.has(candidate)||Math.hypot(current.x-candidate.x,current.z-candidate.z)>current.radius+candidate.radius+3)continue;
    visited.add(candidate);pending.push(candidate);
  }}
  for(const camp of world.campSites){const island=nodes.find(p=>p.id==='island-'+camp.id);assert.ok(visited.has(island),`${camp.name}: connected stepping route`);}
});

test('placeable geometry uses centered footprints matching the collision rules and legacy locations',()=>{
  const shelter=world.createShelter(data({buildings:fullBuildings}));shelter.updateMatrixWorld(true);
  for(const type of ['store','nursery','watchtower','training']){
    const model=shelter.userData.buildingGroups[type],bounds=new THREE.Box3().setFromObject(model),size=bounds.getSize(new THREE.Vector3()),center=bounds.getCenter(new THREE.Vector3()).sub(shelter.position),expected=defaultPlacement(type),footprint=BUILDING_FOOTPRINTS[type];
    assert.ok(Math.abs(center.x-expected.x)<.001,`${type}: legacy centre x`);assert.ok(Math.abs(center.z-expected.z)<.001,`${type}: legacy centre z`);
    assert.ok(size.x<=footprint.width+.001,`${type}: width`);assert.ok(size.z<=footprint.depth+.001,`${type}: depth`);
    const pivot=model.getWorldPosition(new THREE.Vector3()).sub(shelter.position);assert.ok(Math.hypot(center.x-pivot.x,center.z-pivot.z)<1e-6,`${type}: centered pivot`);
  }
  world.removeShelter(shelter);
});

test('camp yaw and placed building yaw compose correctly and training follows its moved yard',()=>{
  const position={x:-8,z:-2.8,yaw:Math.PI/2},yaw=Math.PI/2,shelter=world.createShelter(data({yaw,buildings:{training:true},buildingPlacements:{training:position}}));
  const model=shelter.userData.buildingGroups.training,worldPoint=model.getWorldPosition(new THREE.Vector3());
  assert.ok(Math.abs(worldPoint.x-(shelter.position.x+position.z))<1e-7);assert.ok(Math.abs(worldPoint.z-(shelter.position.z-position.x))<1e-7);
  assert.equal(model.rotation.y,position.yaw);assert.equal(shelter.rotation.y,yaw);assert.ok(Math.abs(shelter.userData.trainingPoint.x-worldPoint.x)<1e-7);assert.ok(Math.abs(shelter.userData.trainingPoint.z-worldPoint.z)<1e-7);
  world.updateShelter(shelter,{hp:0,destroyed:true});assert.equal(model.visible,false);
  world.updateShelter(shelter,{hp:350,destroyed:false});assert.equal(model.visible,true);assert.deepEqual(shelter.userData.visualState.buildingPlacements.training,position);
  assert.equal(model.getWorldPosition(new THREE.Vector3()).distanceTo(worldPoint),0);world.removeShelter(shelter);
});

test('placed palisades use a movable timber section while legacy camps retain their complete perimeter',()=>{
  const shelter=world.createShelter(data({buildings:{palisade:true}}));assert.equal(shelter.userData.palisade.visible,true);assert.equal(shelter.userData.palisadeSection.visible,false);
  const position={x:0,z:9.8,yaw:0};world.updateShelter(shelter,{buildingPlacements:{palisade:position}});shelter.updateMatrixWorld(true);
  assert.equal(shelter.userData.palisade.visible,false);assert.equal(shelter.userData.palisadeSection.visible,true);
  const size=new THREE.Box3().setFromObject(shelter.userData.palisadeSection).getSize(new THREE.Vector3());assert.ok(size.x<=7&&size.z<=1);
  world.updateShelter(shelter,{buildingPlacements:{}});assert.equal(shelter.userData.palisade.visible,true);assert.equal(shelter.userData.palisadeSection.visible,false);world.removeShelter(shelter);
});

test('all construction previews use real geometry, reuse materials when moving, and leave no physical surfaces behind',()=>{
  const originalPlatforms=world.platforms.length;
  for(const type of ['shelter','store','nursery','watchtower','training','palisade']){
    const preview=world.createBuildingPreview(type);assert.ok(preview?.isGroup);assert.equal(world.platforms.length,originalPlatforms);assert.equal(preview.userData.support,undefined);
    world.setBuildingPreview(preview,{x:20,y:.4,z:30,yaw:.6,valid:true});const materials=[...preview.userData.previewMaterials];let vertices=0;preview.traverseVisible(o=>{if(o.geometry)vertices+=o.geometry.attributes.position?.count||0;});assert.ok(vertices>200,`${type}: authored geometry`);
    assert.ok(materials.every(m=>m.transparent&&m.opacity<1&&m.color.getHexString()==='69ed89'));
    for(let i=0;i<8;i++)world.setBuildingPreview(preview,{x:20+i*.1,y:.4,z:30,yaw:i*.1,valid:false});
    assert.deepEqual(preview.userData.previewMaterials,materials);assert.ok(materials.every(m=>m.color.getHexString()==='ef665b'));
    preview.updateMatrixWorld(true);preview.traverse(o=>{for(const n of o.matrixWorld.elements)assert.ok(Number.isFinite(n));});
    let disposed=0;for(const m of materials)m.addEventListener('dispose',()=>disposed++);world.removeBuildingPreview(preview);assert.equal(preview.parent,null);assert.equal(disposed,materials.length);assert.equal(world.platforms.length,originalPlatforms);
  }
});

test('courtyard guides are reused during placement and disposed when hidden or their shelter is removed',()=>{
  const shelter=world.createShelter(data({yaw:.7})),guide=world.showBuildArea({mesh:shelter});assert.equal(guide.parent,shelter);assert.equal(world.showBuildArea(shelter),guide);assert.ok(guide.children.length>=4);
  let disposed=0;for(const child of guide.children)child.geometry.addEventListener('dispose',()=>disposed++);world.hideBuildArea();assert.equal(guide.parent,null);assert.equal(disposed,guide.children.length);
  const next=world.showBuildArea(shelter);world.removeShelter(shelter);assert.equal(next.parent,null);
});

test('the first-tier construction guide reserves the correctly rotated future sleeping hut',()=>{
  const shelter=world.createShelter(data({tier:1})),guide=world.showBuildArea(shelter),outline=guide.getObjectByName('Sleeping hut reservation outline'),hatch=guide.getObjectByName('Sleeping hut reservation hatch');
  assert.equal(shelter.userData.extra.visible,false);assert.ok(outline?.isLineLoop);assert.ok(hatch?.isLineSegments);assert.ok(guide.getObjectByName('Main hut exclusion outline'));
  const f=EXTRA_HUT_FOOTPRINT,points=outline.geometry.attributes.position,c=Math.cos(f.yaw),s=Math.sin(f.yaw),hw=f.width/2+.025*SHELTER_SCALE,hd=f.depth/2+.025*SHELTER_SCALE;
  for(let i=0;i<points.count;i++){
    const x=points.getX(i)*SHELTER_SCALE-f.x,z=points.getZ(i)*SHELTER_SCALE-f.z,localX=x*c-z*s,localZ=x*s+z*c;
    assert.ok(Math.abs(Math.abs(localX)-hw)<1e-5);assert.ok(Math.abs(Math.abs(localZ)-hd)<1e-5);
  }
  world.removeShelter(shelter);
});


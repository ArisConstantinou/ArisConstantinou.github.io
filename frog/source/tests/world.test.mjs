import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld,SHELTER_SCALE,SHELTER_RADIUS} from '../src/world.js';
import {BUILDING_FOOTPRINTS,EXTRA_HUT_FOOTPRINT,defaultPlacement} from '../src/placement-rules.js';
import {WORLD_SCALE,WORLD_RADIUS,WORLD_BOUNDARY,CASTLE_GROUND_RADIUS,ISLAND_TERRACE_RADIUS} from '../src/world-config.js';

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

test('the creek offers over three times the old map area with connected staging islands',()=>{
  assert.equal(world.radius,WORLD_RADIUS);assert.equal(world.boundary,WORLD_BOUNDARY);
  assert.ok((world.radius/110)**2>3,'usable world area should grow substantially');
  assert.equal(world.water.geometry.parameters.width,266*WORLD_SCALE);
  assert.equal(world.campSites.filter(s=>s.team==='enemy').length,5,'five campaign factions retain stable ids');
  assert.ok(world.campSites.filter(s=>s.team==='neutral').length>=6,'long routes need buildable staging islands');
  const reached=new Set(['origin']);let changed=true;
  while(changed){changed=false;for(const route of world.routes)if(reached.has(route.from)||reached.has(route.to))for(const id of [route.from,route.to])if(!reached.has(id)){reached.add(id);changed=true;}}
  for(const site of world.campSites){assert.ok(reached.has(site.id),site.id+' has no route');assert.ok(Math.abs(site.x)+SHELTER_RADIUS<world.boundary&&Math.abs(site.z)+SHELTER_RADIUS<world.boundary,site.id+' needs room inside the playable boundary');}
  assert.ok(Math.hypot(world.hotspots[0].x,world.hotspots[0].z)<7,'starter supplies stay immediately reachable');
});

test('island heights, smooth slopes and an elevated stronghold replace the flat floodplain',()=>{
  const stronghold=world.campSites.find(s=>s.stronghold),home=world.campSites.find(s=>s.id==='home');
  assert.ok(world.getTerrainHeight(stronghold.x,stronghold.z)-world.getTerrainHeight(home.x,home.z)>6);
  assert.ok(stronghold.radius>home.radius,'the fortified plateau must read larger than an ordinary island');
  assert.ok(SHELTER_RADIUS>17&&SHELTER_SCALE>=3,'settlements grow with the wetland');
  for(const site of world.campSites){
    const floor=world.getTerrainHeight(site.x,site.z);
    for(const angle of [0,Math.PI/2,Math.PI,Math.PI*1.5]){
      assert.ok(Math.abs(world.getTerrainHeight(site.x+Math.cos(angle)*SHELTER_RADIUS,site.z+Math.sin(angle)*SHELTER_RADIUS)-floor)<.15,site.id+' courtyard needs a level foundation');
      let previous=floor;
      for(let d=.5;d<site.radius+8;d+=.5){const height=world.getTerrainHeight(site.x+Math.cos(angle)*d,site.z+Math.sin(angle)*d);assert.ok(Math.abs(height-previous)<.65,site.id+' has an impassable half-metre step');previous=height;}
    }
  }
  assert.ok(world.platforms.filter(p=>p.type==='lily'||p.type==='rock').length<1800,'longer routes should remain instanced rather than tripling scene cost');
});

test('an empty building inventory shows the main hut without unpurchased upgrades',()=>{
  const shelter=world.createShelter(data());
  assert.equal(shelter.userData.core.visible,true);
  assert.equal(shelter.userData.fortification.visible,true,'the basic castle is enclosed before any upgrade');
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

test('raised islands leave both fish anchors inside broad reachable water corridors',()=>{
  const wet=s=>s.type==='water'||s.type==='lily'||s.height<.13;
  for(const anchor of [world.predatorAnchors.fish,world.bossAnchors.fish]){
    assert.ok(wet(world.getSurface(anchor.x,anchor.z)),'fish must not spawn stranded on a raised island');
    let wetSamples=0;
    for(let dx=-6;dx<=6;dx+=3)for(let dz=-6;dz<=6;dz+=3)if(wet(world.getSurface(anchor.x+dx,anchor.z+dz)))wetSamples++;
    assert.ok(wetSamples>=20,'the fish boss needs a broad reachable breach area');
  }
});

function assertCastleGrounded(shelter,label){
  shelter.updateMatrixWorld(true);const floor=shelter.position.y,instance=new THREE.Matrix4(),transform=new THREE.Matrix4(),point=new THREE.Vector3();let groundedVertices=0;
  // Inspect the real ground-facing corners of the instanced masonry and towers,
  // not a hand-picked centre point that would miss an overhanging perimeter.
  for(const mesh of [shelter.userData.fortWalls,shelter.userData.fortTowers]){
    const vertices=mesh.geometry.attributes.position;
    for(let i=0;i<mesh.count;i++){
      mesh.getMatrixAt(i,instance);transform.multiplyMatrices(mesh.matrixWorld,instance);
      for(let v=0;v<vertices.count;v++){
        point.fromBufferAttribute(vertices,v).applyMatrix4(transform);if(Math.abs(point.y-floor-.11)>.002)continue;
        assert.ok(Math.abs(world.getTerrainHeight(point.x,point.z)-floor)<.001,`${label}: masonry at ${point.x.toFixed(2)}, ${point.z.toFixed(2)} has earth directly below it`);groundedVertices++;
      }
    }
  }
  assert.ok(groundedVertices>500,`${label}: full walls and every tower were inspected`);
  const yaw=shelter.rotation.y,r=shelter.userData.fortificationGeometry.radius;
  for(const d of [r+1,r+3,r+5]){
    const x=shelter.position.x+Math.sin(yaw)*d,z=shelter.position.z+Math.cos(yaw)*d;
    assert.equal(world.getSurface(x,z).type,'land',`${label}: dry gate approach`);
    assert.ok(Math.abs(world.getTerrainHeight(x,z)-floor)<.15,`${label}: no cliff immediately outside the gate`);
  }
}

test('every authored castle has expanded land under the complete real footprint and an accessible gate',()=>{
  const castles=[];
  try{
    for(const [i,site] of world.campSites.entries()){
      assert.ok(site.radius>=36&&ISLAND_TERRACE_RADIUS>SHELTER_RADIUS+7,'the landscape expands to fit the castle');
      castles.push(world.createShelter(data({id:'land-'+site.id,x:site.x,z:site.z,yaw:i*.39,team:site.team==='enemy'?'enemy0':'ally'})));
    }
    for(const [i,castle] of castles.entries())assertCastleGrounded(castle,world.campSites[i].id);
    for(const anchor of [world.predatorAnchors.fish,world.bossAnchors.fish]){
      let wet=0;for(let dx=-6;dx<=6;dx+=3)for(let dz=-6;dz<=6;dz+=3)if(world.getTerrainHeight(anchor.x+dx,anchor.z+dz)<-.1)wet++;
      assert.ok(wet>=20,'expanded castle banks preserve fish routes');
    }
  }finally{for(const castle of castles)world.removeShelter(castle);}
});

test('off-centre saved castles and rotated hillside builds receive real level terrain without moving their position',()=>{
  const points=[{x:31.4,z:20.4,yaw:.72},{x:119,z:29,yaw:2.1}];
  for(const [i,position] of points.entries()){
    const expected=world.shelterLandHeight(position.x,position.z),before=world.getTerrainHeight(position.x,position.z),castle=world.createShelter(data({id:'offset-land-'+i,...position}));
    try{
      assert.equal(castle.position.x,position.x);assert.equal(castle.position.z,position.z);assert.equal(castle.rotation.y,position.yaw);assert.equal(castle.position.y,expected,'preview and built foundation agree');
      assert.equal(world.shelterLandHeight(position.x,position.z),expected,'an existing courtyard does not raise its own rebuild preview');
      assert.ok(castle.position.y>=before);assertCastleGrounded(castle,'offset '+i);
      const terrain=world.group.getObjectByName('Creek bed and island banks');world.group.updateMatrixWorld(true);
      for(const [dx,dz] of [[0,0],[18,0],[-18,0],[0,19],[15,12]]){
        const x=position.x+dx,z=position.z+dz,ray=new THREE.Raycaster(new THREE.Vector3(x,40,z),new THREE.Vector3(0,-1,0)),hit=ray.intersectObject(terrain)[0];
        assert.ok(hit,'there is rendered ground below the castle');assert.ok(Math.abs(hit.point.y-world.getTerrainHeight(x,z))<1e-5,'walking height matches the actual rendered triangle');
      }
    }finally{world.removeShelter(castle);}
    assert.ok(Math.abs(world.getTerrainHeight(position.x,position.z)-before)<1e-7,'removal does not leave an invisible terrain patch');
  }
});

test('castle landscaping updates only on construction/removal and keeps resource swarms above the new terrain',()=>{
  const spot=world.hotspots[3],before=world.renderStats.terrainUpdates,castle=world.createShelter(data({id:'resource-land',x:spot.x+5,z:spot.z+3,yaw:.8}));
  try{
    const built=world.renderStats.terrainUpdates;assert.equal(built,before+1);
    assert.ok(spot.y>world.getTerrainHeight(spot.x,spot.z),'food remains visible above the raised bank');
    assert.ok(castle.userData.landmark.radius>CASTLE_GROUND_RADIUS,'the minimap includes the enlarged land');
    for(let i=0;i<60;i++)world.update(1/60,60+i/60,.7,new THREE.Vector3(spot.x,10,spot.z));
    world.updateShelter(castle,{gateOpen:true,gateHp:180});world.updateShelter(castle,{gateOpen:false});
    const preview=world.createBuildingPreview('shelter');world.removeBuildingPreview(preview);
    assert.equal(world.renderStats.terrainUpdates,built,'frames, gates and previews never rebuild the terrain');
  }finally{world.removeShelter(castle);}
  assert.equal(world.renderStats.terrainUpdates,before+2);
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

test('castle walls enclose all sides except one clear south gate and include four defence towers',()=>{
  const shelter=world.createShelter(data({gateHp:180,gateOpen:false}));shelter.updateMatrixWorld(true);
  const spec=shelter.userData.fortificationGeometry;
  assert.ok(spec.wallHeight>=3.5);assert.equal(spec.gateWidth,6.8);assert.equal(spec.radius,SHELTER_RADIUS-.15);
  assert.equal(shelter.userData.fortTowers.count,4);
  const ray=new THREE.Raycaster();
  for(const a of [Math.PI/2,Math.PI,Math.PI*1.5]){
    ray.set(new THREE.Vector3(shelter.position.x+Math.sin(a)*(spec.radius+6),shelter.position.y+1.6,shelter.position.z+Math.cos(a)*(spec.radius+6)),new THREE.Vector3(-Math.sin(a),0,-Math.cos(a)));
    assert.ok(ray.intersectObject(shelter.userData.fortWalls).length>0,'a castle side must not be an open arch');
  }
  ray.set(new THREE.Vector3(shelter.position.x,shelter.position.y+1.6,shelter.position.z+spec.radius+3),new THREE.Vector3(0,0,-1));ray.far=5;
  assert.equal(ray.intersectObject(shelter.userData.fortWalls).length,0,'the main gate opening must stay clear of permanent masonry');
  assert.ok(ray.intersectObjects(shelter.userData.gateLeaves,true).length>0,'the closed doors visibly block the entrance');
  world.removeShelter(shelter);
});

test('gates follow camp yaw, open with state and retain a visible breach until repaired',()=>{
  const yaw=Math.PI/3,shelter=world.createShelter(data({yaw,gateHp:180,gateOpen:false}));shelter.updateMatrixWorld(true);
  const r=shelter.userData.fortificationGeometry.radius,point=shelter.userData.gate.getWorldPosition(new THREE.Vector3());
  assert.ok(Math.abs(point.x-(shelter.position.x+Math.sin(yaw)*r))<1e-6);
  assert.ok(Math.abs(point.z-(shelter.position.z+Math.cos(yaw)*r))<1e-6);
  world.updateShelter(shelter,{gateOpen:true});
  assert.ok(shelter.userData.gateLeaves[0].rotation.y<-Math.PI/2);assert.ok(shelter.userData.gateLeaves[1].rotation.y>Math.PI/2);
  world.updateShelter(shelter,{gateHp:0,gateOpen:false});
  assert.equal(shelter.userData.fallenGate.visible,true);assert.ok(shelter.userData.gateLeaves.every(leaf=>!leaf.visible));
  world.updateShelter(shelter,{storage:{food:5}});assert.equal(shelter.userData.fallenGate.visible,true,'ordinary visual refresh must not heal a broken gate');
  world.updateShelter(shelter,{gateHp:180,gateOpen:false});assert.equal(shelter.userData.fallenGate.visible,false);assert.ok(shelter.userData.gateLeaves.every(leaf=>leaf.visible&&leaf.rotation.y===0));
  world.updateShelter(shelter,{destroyed:true,hp:0});assert.equal(shelter.userData.fortification.visible,false);assert.equal(shelter.userData.palisade.visible,false);
  world.removeShelter(shelter);
});

test('palisade purchase reinforces the entire castle even when a legacy save contains one wall position',()=>{
  const shelter=world.createShelter(data());assert.equal(shelter.userData.palisade.visible,false);
  world.updateShelter(shelter,{buildings:{palisade:true},buildingPlacements:{palisade:{x:0,z:12,yaw:1}}});shelter.updateMatrixWorld(true);
  assert.equal(shelter.userData.fortification.visible,true);assert.equal(shelter.userData.palisade.visible,true);
  assert.equal(shelter.userData.buildingGroups.palisade,undefined,'a whole perimeter cannot be dragged into the courtyard');
  assert.equal(shelter.userData.visualState.buildingPlacements.palisade,undefined);
  const size=new THREE.Box3().setFromObject(shelter.userData.palisade).getSize(new THREE.Vector3());assert.ok(size.x>32&&size.z>32,'the upgrade must span the whole settlement');
  assert.equal(world.createBuildingPreview('palisade'),null,'fortification is a whole-castle upgrade');
  world.removeShelter(shelter);
});

test('all construction previews use real geometry, reuse materials when moving, and leave no physical surfaces behind',()=>{
  const originalPlatforms=world.platforms.length;
  for(const type of ['shelter','store','nursery','watchtower','training']){
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


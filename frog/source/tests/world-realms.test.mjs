import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createWorld,createRegionLayout,SHELTER_RADIUS} from '../src/world.js';
import {FORT_RADIUS,WALL_HEIGHT,campWorld,gatePoint,fortConstructionState,resolveFortMovement,fortLineClear,fortWaypoint} from '../src/fortification.js';
import {WORLD_BOUNDARY} from '../src/world-config.js';

const previousDocument=globalThis.document;
const context={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
globalThis.document={createElement(){return {width:0,height:0,getContext(){return context}}}};
const worlds=[];
const makeWorld=(index=0,seed=731+index*7919)=>{const world=createWorld(new THREE.Scene(),{},{seed,regionIndex:index});worlds.push(world);return world;};
const base=makeWorld();
const data=(overrides={})=>({id:'work-site',x:14.4,z:14.4,team:'ally',yaw:0,tier:1,hp:350,maxHp:350,gateHp:180,buildings:{},storage:{food:0},...overrides});
after(()=>{for(const world of worlds)world.dispose();if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;});

test('region zero preserves saved coordinates while all map symmetries preserve distances and margins',()=>{
  assert.equal(base.seed,731);assert.equal(base.regionIndex,0);
  assert.deepEqual(base.campSites.find(s=>s.id==='home')?.x,14.4);
  assert.deepEqual(base.predatorAnchors.fish,{x:21.6,z:86.4});
  assert.deepEqual(base.hotspots[0]&&{x:base.hotspots[0].x,z:base.hotspots[0].z},{x:4.5,z:-4});
  for(let index=0;index<16;index++){
    const layout=createRegionLayout(index);
    for(const site of base.campSites){
      const point=layout.toWorld(site.x,site.z),original=layout.toSource(point.x,point.z);
      assert.ok(Math.abs(original.x-site.x)<1e-8&&Math.abs(original.z-site.z)<1e-8);
      assert.ok(Math.abs(point.x)+SHELTER_RADIUS<WORLD_BOUNDARY&&Math.abs(point.z)+SHELTER_RADIUS<WORLD_BOUNDARY);
      assert.ok(Math.abs(Math.hypot(point.x,point.z)-Math.hypot(site.x,site.z))<1e-8);
    }
  }
});

test('seeded frontier terrain, lures, routes, anchors and palette all belong to the same region',()=>{
  const first=makeWorld(1),reloaded=makeWorld(1),reflected=makeWorld(5);
  assert.notDeepEqual(first.palette,base.palette);
  assert.notDeepEqual(first.campSites.map(s=>[s.x,s.z]),base.campSites.map(s=>[s.x,s.z]));
  assert.notDeepEqual(first.campSites.map(s=>s.elevation),base.campSites.map(s=>s.elevation));
  assert.deepEqual(first.campSites,reloaded.campSites,'the same frontier save must regenerate identical sites');
  for(const world of [first,reflected]){
    const layout=createRegionLayout(world.regionIndex,world.seed);
    for(const [i,site] of world.campSites.entries()){
      assert.deepEqual({x:site.x,z:site.z},layout.toWorld(base.campSites[i].x,base.campSites[i].z));
      const floor=world.getTerrainHeight(site.x,site.z);
      for(let angle=0;angle<Math.PI*2;angle+=Math.PI/8){
        const edge={x:site.x+Math.cos(angle)*(SHELTER_RADIUS+3),z:site.z+Math.sin(angle)*(SHELTER_RADIUS+3)};
        assert.equal(world.getSurface(edge.x,edge.z).type,'land');
        assert.ok(Math.abs(world.getTerrainHeight(edge.x,edge.z)-floor)<.03,site.id+' keeps a flat castle foundation');
      }
    }
    for(const [i,spot] of world.hotspots.entries())assert.deepEqual({x:spot.x,z:spot.z},layout.toWorld(base.hotspots[i].x,base.hotspots[i].z));
    for(const type of ['heron','snake','fish']){
      assert.deepEqual(world.predatorAnchors[type],layout.toWorld(base.predatorAnchors[type].x,base.predatorAnchors[type].z));
      assert.deepEqual(world.bossAnchors[type],layout.toWorld(base.bossAnchors[type].x,base.bossAnchors[type].z));
    }
    for(const route of world.routes){assert.ok(route.start.id===route.from&&route.end.id===route.to);assert.ok(route.start.id==='origin'||world.campSites.includes(route.start));assert.ok(world.campSites.includes(route.end));}
    for(const anchor of [world.predatorAnchors.fish,world.bossAnchors.fish]){
      let wet=0;for(let x=-6;x<=6;x+=3)for(let z=-6;z<=6;z+=3)if(world.getTerrainHeight(anchor.x+x,anchor.z+z)<-.1)wet++;
      assert.ok(wet>=20,'fish retain a broad wet approach after region transformation');
    }
  }
  const sample=world=>Array.from({length:31},(_,i)=>world.getTerrainHeight(-95+i*6,71-i*3));
  assert.deepEqual(sample(first),sample(reloaded));
  assert.notDeepEqual(sample(first),sample(base));
});

test('rotated and reflected castles have actual terrain beneath their complete masonry footprint',()=>{
  for(const index of [1,5]){
    const world=worlds.find(w=>w.regionIndex===index),matrix=new THREE.Matrix4(),transform=new THREE.Matrix4(),point=new THREE.Vector3();
    for(const site of world.campSites){
      const mesh=world.createShelter(data({...site,id:'fit-'+site.id,team:'ally'}));mesh.updateMatrixWorld(true);let tested=0;
      for(const body of [mesh.userData.fortWalls,mesh.userData.fortTowers]){
        const vertices=body.geometry.attributes.position;
        for(let instance=0;instance<body.count;instance++){
          body.getMatrixAt(instance,matrix);transform.multiplyMatrices(body.matrixWorld,matrix);
          for(let v=0;v<vertices.count;v++){
            point.fromBufferAttribute(vertices,v).applyMatrix4(transform);if(Math.abs(point.y-mesh.position.y-.11)>.002)continue;
            assert.ok(Math.abs(world.getTerrainHeight(point.x,point.z)-mesh.position.y)<.001,site.id+' masonry has real earth beneath it');tested++;
          }
        }
      }
      assert.ok(tested>500);world.removeShelter(mesh);
    }
  }
});

test('construction reveals real courses, towers, keep and gate with matching movement and line of sight',()=>{
  const camp=data({underConstruction:true});camp.mesh=base.createShelter(camp);const s=camp.mesh,job={id:'build-1',type:'shelter',siteId:camp.id},floor=s.userData.support.y;
  const actor={x:camp.x+FORT_RADIUS+4,z:camp.z,y:floor,team:'enemy0'},inside={x:camp.x+FORT_RADIUS-4,z:camp.z};
  const geometry=s.userData.fortWalls.geometry,owned=s.userData.owned.length,terrainUpdates=base.renderStats.terrainUpdates;
  try{
    assert.equal(s.userData.foundation.visible,true);assert.equal(s.userData.fortification.visible,false);assert.equal(s.userData.core.visible,false);assert.equal(s.userData.banner.visible,false);
    assert.equal(resolveFortMovement([camp],actor,inside).blocked,false);assert.equal(fortLineClear([camp],actor,inside),true);assert.deepEqual(fortWaypoint([camp],actor,inside),inside);
    base.update(.05,1,0,new THREE.Vector3(camp.x,floor,camp.z));assert.equal(s.userData.light.visible,false);
    base.setConstructionProgress(job,.25,camp);
    assert.equal(s.userData.constructionStage,1);assert.equal(s.userData.fortification.visible,true);assert.equal(s.userData.fortTowers.visible,false);assert.equal(s.userData.core.visible,false);
    assert.equal(s.userData.fortWalls.scale.y,.35);assert.ok(s.userData.fortWalls.count<s.userData.fortWalls.userData.fullCount);
    assert.equal(resolveFortMovement([camp],actor,inside).blocked,true);assert.equal(fortLineClear([camp],actor,inside),false);
    assert.equal(resolveFortMovement([camp],{...actor,y:floor+WALL_HEIGHT*.35+.3},inside).blocked,false,'a frog above the actual low courses can clear them');
    base.setConstructionProgress(job,.5,camp);
    assert.equal(s.userData.fortTowers.visible,true);assert.equal(s.userData.core.visible,false);assert.equal(s.userData.gate.visible,false);
    const enemy={team:'enemy0',y:floor,...gatePoint(camp,4)};
    assert.equal(resolveFortMovement([camp],enemy,gatePoint(camp,-4)).blocked,false,'an unbuilt gate cannot obstruct a raider');
    const rect=s.userData.keepCollision.rects[0],z=(rect.minZ+rect.maxZ)/2,from={team:'ally',y:floor,...campWorld(camp,{x:rect.minX-1,z})},to=campWorld(camp,{x:rect.maxX+1,z});
    assert.equal(resolveFortMovement([camp],from,to).blocked,false,'the invisible keep has no collision');
    base.setConstructionProgress(job,.75,camp);
    assert.equal(s.userData.core.visible,true);assert.equal(resolveFortMovement([camp],from,to).blocked,true);assert.equal(fortLineClear([camp],from,to),false);
    base.updateShelter(s,{hp:310});assert.equal(s.userData.constructionStage,3,'damage updates retain partial construction');
    camp.underConstruction=false;base.updateShelter(s,camp);
    assert.equal(s.userData.constructionStage,4);assert.equal(s.userData.gate.visible,true);assert.equal(s.userData.banner.visible,true);assert.equal(s.userData.lamp.visible,true);
    assert.equal(resolveFortMovement([camp],enemy,gatePoint(camp,-4)).blocked,true,'the completed gate becomes defensive');
    assert.equal(s.userData.fortWalls.geometry,geometry);assert.equal(s.userData.owned.length,owned);assert.equal(base.renderStats.terrainUpdates,terrainUpdates,'stage transitions never rebuild land or materials');
  }finally{base.removeShelter(s);}
});

test('saved partial construction restores its visible and physical stage before play',()=>{
  const camp=data({id:'restored-work',underConstruction:true,constructionProgress:.58});camp.mesh=base.createShelter(camp);
  try{
    assert.equal(fortConstructionState(camp).stage,2);assert.equal(camp.mesh.userData.constructionStage,2);
    assert.equal(camp.mesh.userData.fortWalls.visible,true);assert.equal(camp.mesh.userData.core.visible,false);assert.equal(camp.mesh.userData.gate.visible,false);
    const from={team:'enemy0',y:camp.mesh.userData.support.y,...gatePoint(camp,4)};
    assert.equal(resolveFortMovement([camp],from,gatePoint(camp,-4)).blocked,false);
    base.updateShelter(camp.mesh,{destroyed:true,hp:0});assert.equal(camp.mesh.userData.fortification.visible,false);assert.equal(camp.mesh.userData.ruin.visible,true);
  }finally{base.removeShelter(camp.mesh);}
});

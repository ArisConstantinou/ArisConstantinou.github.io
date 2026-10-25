import test from 'node:test';
import assert from 'node:assert/strict';
import {BUILDING_FOOTPRINTS,COURTYARD_RADIUS,defaultPlacement,validateBuildingPlacement,normalizeBuildingPlacements} from '../src/placement-rules.js';
import {SAVE_VERSION,validateSave} from '../src/rules.js';
import {SHELTER_LAYOUT_SCALE,WORLD_REVISION} from '../src/world-config.js';
const scaled=(x,z,yaw=0)=>({x:x*SHELTER_LAYOUT_SCALE,z:z*SHELTER_LAYOUT_SCALE,yaw});

const base=overrides=>({id:'camp',team:'ally',x:0,z:0,hp:350,maxHp:350,buildings:{},buildingPlacements:{},...overrides});
const slots={
  store:scaled(-6.5,6),
  nursery:defaultPlacement('nursery'),
  watchtower:defaultPlacement('watchtower'),
  training:scaled(0,6),
  palisade:scaled(0,10)
};
const save=camp=>({version:SAVE_VERSION,worldRevision:WORLD_REVISION,player:{id:'player',team:'player',x:0,z:0,hp:120,maxHp:120},frogs:[],camps:[camp],resources:{food:60,reeds:80}});
function fullCamp(overrides={}){
  return base({buildings:Object.fromEntries(Object.keys(slots).map(type=>[type,true])),buildingPlacements:structuredClone(slots),...overrides});
}

test('placement defaults use immutable centered world-unit footprints and fresh positions',()=>{
  assert.ok(COURTYARD_RADIUS>16.8,'the enlarged settlement must preserve usable building space');
  assert.deepEqual(Object.keys(BUILDING_FOOTPRINTS).sort(),['nursery','palisade','store','training','watchtower']);
  const a=defaultPlacement('store'),b=defaultPlacement('store');a.x=900;assert.notEqual(a.x,b.x);
  assert.equal(defaultPlacement('repair'),null);assert.deepEqual(BUILDING_FOOTPRINTS.palisade,{width:7*SHELTER_LAYOUT_SCALE,depth:SHELTER_LAYOUT_SCALE});
});
test('all five building types fit a real courtyard layout without spending or mutation',()=>{
  const camp=base(),resources={food:100,reeds:100};
  for(const [type,position] of Object.entries(slots)){
    const before=structuredClone(camp);
    assert.deepEqual(validateBuildingPlacement(camp,type,position),{valid:true,reason:''},type);
    assert.deepEqual(camp,before);assert.deepEqual(resources,{food:100,reeds:100});
    camp.buildings[type]=true;camp.buildingPlacements[type]={...position};
  }
});
test('foreign, ruined, dead and explicitly unsafe camps reject construction',()=>{
  for(const camp of [base({team:'enemy0'}),base({destroyed:true}),base({hp:0}),base({hp:NaN})]) assert.equal(validateBuildingPlacement(camp,'store',slots.store).reason,'inactive-camp');
  assert.equal(validateBuildingPlacement(base({safe:false}),'store',slots.store).reason,'unsafe-camp');
});
test('unknown upgrades and already purchased buildings cannot enter placement',()=>{
  assert.equal(validateBuildingPlacement(base(),'repair',slots.store).reason,'unknown-building');
  assert.equal(validateBuildingPlacement(base(),'__proto__',slots.store).reason,'unknown-building');
  assert.equal(validateBuildingPlacement(base({buildings:{store:true}}),'store',slots.store).reason,'already-owned');
});
test('nonfinite, missing and string coordinates or yaw are rejected',()=>{
  for(const p of [null,{}, {x:0,z:9}, {x:NaN,z:9,yaw:0},{x:0,z:Infinity,yaw:0},{x:0,z:9,yaw:Infinity},{x:'0',z:9,yaw:0},{x:0,z:9,yaw:'0'}]) {
    assert.equal(validateBuildingPlacement(base(),'palisade',p).reason,'invalid-position');
  }
});
test('rotated building rectangles cannot overlap the permanent central hut',()=>{
  for(const yaw of [0,Math.PI/4,Math.PI/2]) assert.equal(validateBuildingPlacement(base(),'store',{x:0,z:0,yaw}).reason,'overlap-core');
  assert.equal(validateBuildingPlacement(base(),'store',scaled(5,0)).valid,true);
  assert.equal(validateBuildingPlacement(base(),'store',scaled(4.8,0)).reason,'overlap-core');
});
test('the complete rotated footprint must stay inside the circular courtyard',()=>{
  const tangent=scaled(0,10.8),radial={...tangent,yaw:Math.PI/2};
  assert.equal(validateBuildingPlacement(base(),'palisade',tangent).valid,true);
  assert.equal(validateBuildingPlacement(base(),'palisade',radial).reason,'outside-courtyard');
  assert.equal(validateBuildingPlacement(base(),'store',scaled(11,0)).reason,'outside-courtyard');
});
test('SAT detects an overlap against a rotated existing building',()=>{
  const camp=base({buildings:{training:true},buildingPlacements:{training:scaled(6,0,Math.PI/4)}});
  assert.equal(validateBuildingPlacement(camp,'palisade',scaled(7,3,Math.PI/4)).reason,'overlap-building');
});
test('separated rotated footprints remain valid even when their axis-aligned boxes overlap',()=>{
  const camp=base({buildings:{training:true},buildingPlacements:{training:scaled(6,0,Math.PI/4)}});
  // Both AABBs cover x=5..9 and z=3.2..3.7, but the oblique rectangles do not meet.
  assert.equal(validateBuildingPlacement(camp,'palisade',scaled(7,6,Math.PI/4)).valid,true);
});
test('legacy building defaults still reserve their actual occupied positions',()=>{
  const camp=base({buildings:{watchtower:true}}),p=defaultPlacement('watchtower');
  assert.equal(validateBuildingPlacement(camp,'palisade',p).reason,'overlap-building');
  assert.deepEqual(camp.buildingPlacements,{});
});
test('legacy perimeter palisades keep their layout without blocking every new building',()=>{
  const camp=base({buildings:{palisade:true}});
  assert.equal(validateBuildingPlacement(camp,'store',slots.store).valid,true);
  assert.deepEqual(normalizeBuildingPlacements(camp),{});
});
test('save validation roundtrips purchased positions and local yaw without moving them',()=>{
  const camp=fullCamp({yaw:Math.PI/3}),input=save(camp),before=structuredClone(input),out=validateSave(input);
  assert.deepEqual(out.camps[0].buildingPlacements,slots);
  assert.ok(Math.abs(out.camps[0].yaw-Math.PI/3)<1e-12);
  assert.deepEqual(input,before);
  const captured=validateSave(save(fullCamp({team:'enemy2',destroyed:true,hp:0})));
  assert.deepEqual(captured.camps[0].buildingPlacements,slots);
});
test('malformed saved placements are filtered instead of moving buildings beyond the courtyard',()=>{
  const camp=base({buildings:{store:true,nursery:true,training:true,watchtower:true},buildingPlacements:{
    store:slots.store,nursery:{x:999,z:0,yaw:0},training:{x:0,z:0,yaw:0},watchtower:{x:1,z:2,yaw:NaN},palisade:slots.palisade,unknown:{x:1,z:1,yaw:0}
  }});
  assert.deepEqual(normalizeBuildingPlacements(camp),{store:slots.store});
  const invalidYaw=validateSave(save(base({yaw:Infinity})));assert.equal(invalidYaw.camps[0].yaw,0);
  const wrapped=validateSave(save(base({yaw:Math.PI*5})));assert.ok(Math.abs(Math.abs(wrapped.camps[0].yaw)-Math.PI)<1e-12);
});
test('old saves keep missing placement maps empty and retain their purchased buildings',()=>{
  const old=base({buildings:{training:true,store:true}});delete old.buildingPlacements;
  const out=validateSave(save(old));
  assert.deepEqual(out.camps[0].buildingPlacements,{});
  assert.equal(out.camps[0].buildings.training,true);assert.equal(out.camps[0].buildings.store,true);assert.equal(out.camps[0].yaw,0);
});
test('future sleeping space stays reserved at every tier so early purchases cannot block upgrades',()=>{
  const position=scaled(-8,-2.8,Math.PI/2);
  for(const tier of [1,2,3]){
    assert.equal(validateBuildingPlacement(base({tier}),'training',position).reason,'overlap-core');
    assert.equal(validateBuildingPlacement(base({tier}),'training',slots.training).valid,true);
  }
});
test('an advanced shelter still fits all five buildings around both built-in huts',()=>{
  const layout={...structuredClone(slots),store:scaled(-6.5,6),training:scaled(0,6.8)},camp=base({tier:2});
  for(const [type,position] of Object.entries(layout)){
    assert.equal(validateBuildingPlacement(camp,type,position).valid,true,type);
    camp.buildings[type]=true;camp.buildingPlacements[type]=position;
  }
  assert.deepEqual(validateSave(save(camp)).camps[0].buildingPlacements,layout);
});


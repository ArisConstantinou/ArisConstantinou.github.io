import test from 'node:test';
import assert from 'node:assert/strict';
import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import {createWorld,createPropMesh} from './world.js';
import {lineClear,NavigationGrid} from './systems.js';
import {FireSpell,igniteActor,igniteWood,consumeWoodDamage,spreadFire,consumeBurnDamage,fireSight,FIRE_COST,WOOD_BURN_TIME} from './fire.js';
import {ProfileStore} from './systems.js';
import {ThrowTrajectory,captureTrajectoryWorld,TrajectorySnapshotWorld} from './trajectory.js';
const setup=()=>({torch:{id:6,position:{x:-3.2,y:1.9,z:20.76},lit:true},player:{mana:100,body:{position:{x:0,y:1,z:18}}}});
test('sample torch is physically accessible from the opening, and its flame disappears and resets',()=>{
 const world=createWorld(new THREE.Scene()),torch=world.torches[6];
 assert.ok(lineClear({x:0,z:18},torch.position,world.colliders.filter(o=>o.y+o.h/2>1.15),.02));
 world.setTorchLit(6,false);world.update(.01,1);
 const flames=world.root.getObjectByName('Living torch flames'),matrix=new THREE.Matrix4();flames.getMatrixAt(6,matrix);
 const p=new THREE.Vector3(),s=new THREE.Vector3();matrix.decompose(p,new THREE.Quaternion(),s);assert.equal(s.length(),0);
 world.setTorchLit(6,true);world.update(.01,2);flames.getMatrixAt(6,matrix);matrix.decompose(p,new THREE.Quaternion(),s);assert.ok(s.length()>0);
 world.dispose();
});
test('torch transfer uses a real finite source and consumes mana only once',()=>{
 const {torch,player}=setup(),spell=new FireSpell(torch);
 assert.ok(spell.take(player,()=>true,null,10));assert.equal(player.mana,100-FIRE_COST);assert.equal(torch.lit,false);
 assert.equal(spell.take(player,()=>true,null,11),false);assert.equal(player.mana,100-FIRE_COST);
 const stone={kind:'stone'},crate={flammable:true};
 assert.equal(spell.ignite(stone,11),false);assert.ok(spell.charged);
 assert.equal(spell.ignite(crate,10.2),false);assert.ok(spell.ignite(crate,10.45));assert.equal(crate.burnUntil,55.45);assert.ok(spell.charged);
 assert.equal(spell.ignite(crate,11),false);assert.ok(spell.ignite({flammable:true},1000));spell.reset();assert.ok(torch.lit);assert.equal(spell.charged,false);
});
test('range, walls and insufficient mana reject transfer without taking the source',()=>{
 for(const condition of ['range','wall','mana']){
  const {torch,player}=setup(),spell=new FireSpell(torch);
  if(condition==='range')player.body.position.x=10;if(condition==='mana')player.mana=2;
  assert.equal(spell.take(player,()=>condition!=='wall',null,0),false);
  assert.ok(torch.lit);assert.equal(spell.charged,false);
 }
});
test('burn ticks use gameplay time, refresh without stacking and stop at expiry',()=>{
 const guard={};igniteActor(guard,10);
 assert.equal(consumeBurnDamage(guard,10.49),0);assert.equal(consumeBurnDamage(guard,10.5),2);
 assert.equal(consumeBurnDamage(guard,10.5),0); // paused gameplay clock
 assert.equal(igniteActor(guard,10.6),false);assert.equal(consumeBurnDamage(guard,11.1),2);
 assert.equal(consumeBurnDamage(guard,20),20);assert.equal(consumeBurnDamage(guard,21),0);
});
test('preview profile cannot overwrite the normal game save',()=>{
 const values=new Map([['magic-exiled-v1',JSON.stringify({version:1,shards:73,runs:8})]]);
 const storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
 const normal=values.get('magic-exiled-v1'),sample=new ProfileStore(storage,'magic-exiled-fire-sample-v1');
 assert.equal(sample.profile.shards,0);sample.save();assert.equal(values.get('magic-exiled-v1'),normal);
 assert.ok(values.has('magic-exiled-fire-sample-v1'));
});
test('worker snapshot preserves fire expiry and predicts guard burn without modifying live state',()=>{
 const world=new CANNON.World({gravity:new CANNON.Vec3(0,0,0)});world.solver.iterations=8;
 const shot=new CANNON.Body({mass:19,shape:new CANNON.Box(new CANNON.Vec3(.49,.48,.49)),position:new CANNON.Vec3(0,1,0),linearDamping:.15});
 shot.entity={kind:'crate',category:'prop',hp:1000,flammable:true,burnUntil:18};
 const guard=new CANNON.Body({mass:4,shape:new CANNON.Sphere(.43),position:new CANNON.Vec3(3,1,.1),linearDamping:.3});
 guard.entity={kind:'guard',category:'actor',hp:300};world.addBody(shot);world.addBody(guard);
 const snapshot=captureTrajectoryWorld(world,shot,10),copy=new TrajectorySnapshotWorld(snapshot);copy.apply(snapshot);
 const predictor=new ThrowTrajectory(copy.world),result=predictor.predict(copy.bodies.get(shot.id),{x:9,y:0,z:0});
 assert.ok(result.side);const victim=predictor.bodies.get(copy.bodies.get(guard.id));
 assert.ok(victim.previewFireState.burnUntil>0);assert.ok(victim.previewFireState.nextBurnTick>.5);
 assert.equal(guard.entity.hp,300);assert.equal(shot.entity.burnUntil,18);
 const expired=structuredClone(snapshot);expired.bodies.find(b=>b.id===shot.id).entity.burnUntil=9;copy.apply(expired);
 const withoutFire=new ThrowTrajectory(copy.world);withoutFire.predict(copy.bodies.get(shot.id),{x:9,y:0,z:0});
 assert.ok(withoutFire.bodies.get(copy.bodies.get(guard.id)).previewHealth>victim.previewHealth);
});

test('all 36 castle torches and all three endless pylons can supply persistent fire',()=>{
 const world=createWorld(new THREE.Scene());assert.equal(world.torches.length,39);
 assert.equal(world.torches.filter(s=>s.infinite).length,3);
 for(const source of world.torches){
  const spell=new FireSpell(world.torches),player={mana:100,body:{position:source.position.clone()}};
  assert.ok(spell.take(player,()=>true,null,0,source.position));assert.equal(spell.torch.id,source.id);
  assert.equal(source.lit,source.infinite);assert.ok(spell.ignite({flammable:true},1));assert.ok(spell.charged);
  if(source.infinite){assert.ok(spell.take(player,()=>true,null,10,source.position));assert.ok(source.lit);}
 }
 world.dispose();
});
test('every source is physically accessible and pylons do not intersect existing architecture',()=>{
 const world=createWorld(new THREE.Scene()),nav=new NavigationGrid(world.floors,world.colliders);
 for(const p of world.colliders.filter(o=>o.tag==='fire-pylon'))for(const o of world.colliders.filter(o=>o.tag!=='fire-pylon'))assert.ok(Math.abs(p.x-o.x)>=p.w/2+o.w/2||Math.abs(p.z-o.z)>=p.d/2+o.d/2,`Pylon overlaps ${o.tag}`);
 for(const s of world.torches){let accessible=false;for(let r=1;r<4&&!accessible;r+=.4)for(let a=0;a<6.28;a+=.25){const p={x:s.position.x+Math.cos(a)*r,y:.85,z:s.position.z+Math.sin(a)*r};if(nav.isFree(p.x,p.z)&&fireSight(p,s.position,nav.obstacles)){accessible=true;break;}}assert.ok(accessible,`Source ${s.id} has no accessible approach`);}
 world.dispose();
});
test('actual wooden materials include crates, barrels, doors and shield handles; stone and urns do not burn',()=>{
 for(const kind of ['crate','barrel','door','shield','stone','urn']){
  const item=createPropMesh(kind),expected=['crate','barrel','door','shield'].includes(kind);
  assert.equal(item.flammable,expected);assert.equal(igniteWood(item,5),expected);
  item.mesh.traverse(o=>{if(o.userData.ownedFireMaterial)o.material.dispose();});
 }
 const world=createWorld(new THREE.Scene());assert.ok(world.woodenSurfaces.length>0);
 for(const wood of world.woodenSurfaces){assert.ok(igniteWood(wood,0));consumeWoodDamage(wood,45);world.scorchWood(wood);assert.ok(wood.woodExhausted);}
 world.resetWood();assert.ok(world.woodenSurfaces.every(w=>w.woodFuel===1&&!w.woodExhausted));world.dispose();
});
test('wood burns for 45 gameplay seconds and metal parts retain their material and health',()=>{
 const crate={flammable:true,maxHp:46},shield={flammable:true,maxHp:125,woodFraction:.15};
 assert.ok(igniteWood(crate,10));assert.equal(crate.burnUntil,10+WOOD_BURN_TIME);
 assert.equal(consumeWoodDamage(crate,10),0);assert.ok(consumeWoodDamage(crate,30)<46);
 assert.equal(consumeWoodDamage(crate,30),0);assert.ok(consumeWoodDamage(crate,100)>0);assert.ok(crate.woodExhausted);assert.equal(igniteWood(crate,101),false);
 igniteWood(shield,0);assert.equal(consumeWoodDamage(shield,45),18.75);
});
test('physical fire spreads to wood and enemies, without igniting stone or stacking actor ticks',()=>{
 const source={burnUntil:45},wood={flammable:true},actor={category:'actor'},stone={category:'prop'};
 assert.ok(spreadFire(source,wood,1));assert.equal(spreadFire(source,wood,2),false);assert.equal(spreadFire(source,stone,2),false);
 assert.ok(spreadFire(source,actor,2));assert.equal(spreadFire(source,actor,2.3),false);assert.equal(actor.nextBurnTick,2.5);
 assert.equal(spreadFire(source,{category:'actor',isPlayer:true},2),false);assert.equal(spreadFire(source,{category:'actor',dead:true},2),false);
});

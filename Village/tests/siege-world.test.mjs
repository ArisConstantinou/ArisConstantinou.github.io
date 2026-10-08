// Evaluate the real world scene graph with a recording renderer. This checks
// animation/particle integration; it does not claim browser, GPU or FPS QA.
import {createCanvas} from './model-environment.mjs';
import fs from 'node:fs/promises';
import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,COMBAT_TIMING} from '../feouda-engine.js';
import {UNIT_TYPES} from '../feouda-data.js';
import {MAX_IMPACT_BURSTS} from '../feouda-siege-presentation.js';

const width=1360,height=900,errors=[];let nextFrame,elapsed=0;
const originalCreate=document.createElement.bind(document);
function canvas(){const c=createCanvas(width,height),get=c.getContext.bind(c);c.getContext=(type,args)=>type==='webgl2'?{}:get(type,args);c.style={};c.parentNode={appendChild(){}};c.getBoundingClientRect=()=>({left:0,top:0,width,height});c.addEventListener=()=>{};c.removeEventListener=()=>{};c.setPointerCapture=()=>{};c.remove=()=>{};return c;}
class SceneRecorder{constructor({canvas}){this.domElement=canvas;this.shadowMap={};this.info={render:{calls:0,triangles:0}};}setPixelRatio(){}setSize(){}dispose(){}render(scene,camera){scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);}}
document.createElement=name=>name==='canvas'?canvas():originalCreate(name);document.hidden=false;
Object.assign(globalThis,{window:{devicePixelRatio:1,innerWidth:width,innerHeight:height,addEventListener(){},removeEventListener(){}},ResizeObserver:class{constructor(fn){this.fn=fn;}observe(){this.fn();}disconnect(){}},requestAnimationFrame:fn=>{nextFrame=fn;return 1;},cancelAnimationFrame(){},__SiegeSceneRecorder:SceneRecorder});
const root=new URL('../',import.meta.url),original=await fs.readFile(new URL('feouda-world.js',root),'utf8');
let source=original.replace("import * as THREE from './vendor/three.module.js';",`import * as THREECORE from '${new URL('vendor/three.module.js',root)}';const THREE={...THREECORE,WebGLRenderer:globalThis.__SiegeSceneRecorder};`);
source=source.replace(/from '\.\/([^']+)'/g,(_,path)=>`from '${new URL(path,root)}'`).replace('getDebugState(){','getReviewObjects(){return {assets,forts,sieges,effectModels,pools,actorMotions,actors};},getDebugState(){');
const {createBattlefield}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const game=createGame({storage:null});game.setPaused(true);for(const value of Object.values(game.state.ai.factions))value.nextRaid=value.nextRecruit=1e8;
const world=createBattlefield(canvas(),{onError:error=>errors.push(String(error))}),frame=()=>{elapsed+=50;nextFrame(elapsed);};world.setState(game.state);await world.getReviewObjects().assets.ready;frame();
const objects=world.getReviewObjects(),has=objects.assets.has;objects.assets.has=(kind,type)=>kind==='unit'?false:has(kind,type);

test('Compatibility soldiers use one real strike and keep exact limb poses during pause',()=>{
 const player=game.state.squads.find(s=>s.owner==='player'),enemy=game.state.squads.find(s=>s.owner==='red');player.type='sword';player.heading=0;player.activity='attack';player.order={type:'attack',targetId:enemy.id};
 game.state.t=10;const timing=COMBAT_TIMING.sword;player.attackCycle={version:1,id:'scene-strike',targetId:enemy.id,targetKind:'squad',startedAt:10,releaseAt:10+timing.windup,endsAt:10+UNIT_TYPES.sword.cooldown,releasedAt:null,impactAt:null,projectileId:null,aim:{x:enemy.x,z:enemy.z}};
 game.state.t=10+timing.windup*.5;world.setState(game.state);frame();const sword=objects.pools.sword,first=Array.from(sword.mesh.instanceMatrix.array.slice(0,16));assert.ok(sword.count>0);assert.ok(objects.pools.hand.count>0);
 game.state.t=player.attackCycle.releaseAt;player.attackCycle.releasedAt=game.state.t;world.setState(game.state);frame();const contact=Array.from(sword.mesh.instanceMatrix.array.slice(0,16));assert.notDeepEqual(contact,first);
 for(let i=0;i<12;i++)frame();assert.deepEqual(Array.from(sword.mesh.instanceMatrix.array.slice(0,16)),contact);
 for(const pool of[objects.pools.arm,objects.pools.hand,objects.pools.sword])assert.ok(Array.from(pool.mesh.instanceMatrix.array.slice(0,pool.count*16)).every(Number.isFinite));
 player.attackCycle=null;player.activity='idle';world.setState(game.state);frame();const idle=Array.from(sword.mesh.instanceMatrix.array.slice(0,16));assert.notDeepEqual(idle,contact);for(let i=0;i<12;i++)frame();assert.deepEqual(Array.from(sword.mesh.instanceMatrix.array.slice(0,16)),idle);
});

test('The live scene bounds impact groups and frees every burst when a save replaces state',()=>{
 const meta={x:20,z:20};game.state.effects=Array.from({length:47},(_,i)=>({id:'stress-hit:'+i,type:'hit',x:meta.x,z:meta.z,tx:meta.x,tz:meta.z,impact:{...meta},age:.3,life:1.1,targetKind:'region',targetId:'crossing',intensity:130}));world.setState(game.state);frame();
 const bursts=[...objects.effectModels.values()].filter(model=>model.userData.impactBurst);assert.equal(bursts.length,MAX_IMPACT_BURSTS);let meshes=0,geometryDisposals=0,materialDisposals=0,textureDisposals=0;
 const positions=model=>model.userData.impactBurst.fragments.map(({mesh})=>[...mesh.position.toArray(),...mesh.scale.toArray()]);const before=bursts.map(positions);for(let i=0;i<8;i++)frame();assert.deepEqual(bursts.map(positions),before);
 for(const burst of bursts){burst.traverse(o=>{if(o.isMesh)meshes++;});const data=burst.userData.impactBurst;for(const g of data.ownedGeometry)g.addEventListener('dispose',()=>geometryDisposals++);for(const t of data.ownedTexture)t.addEventListener('dispose',()=>textureDisposals++);data.dustMaterial.addEventListener('dispose',()=>materialDisposals++);}
 assert.ok(meshes<=MAX_IMPACT_BURSTS*15);world.setState({...game.state,effects:[]});frame();assert.equal(objects.effectModels.size,0);assert.equal(geometryDisposals,MAX_IMPACT_BURSTS*2);assert.equal(textureDisposals,MAX_IMPACT_BURSTS);assert.equal(materialDisposals,MAX_IMPACT_BURSTS);
 console.log('Impact scene budget:',JSON.stringify({activeBursts:bursts.length,meshes,sharedGeometriesPerBurst:2,geometryDisposals,materialDisposals,textureDisposals}));
});

test('Real trebuchet launches stay fixed after cancellation, shooter loss and restored flight',()=>{
 const player=game.state.squads.find(s=>s.owner==='player');player.type='trebuchet';player.activity='idle';player.attackCycle=null;
 const effect={id:'flight:1',type:'stone',sourceId:player.id,sourceType:'trebuchet',attackId:'strike:flight',targetId:'crossing',targetKind:'region',x:player.x,z:player.z,tx:player.x+40,tz:player.z+20,age:.45,life:2};game.state.effects=[effect];world.setState(game.state);frame();
 const projectile=objects.effectModels.get(effect.id);assert.equal(projectile.userData.projectileAsset,'counterweight-trebuchet');const launch={...projectile.userData.launch},position=projectile.position.toArray();
 player.order={type:'move',x:player.x-20,z:player.z};player.heading=-Math.PI/2;world.setState(game.state);frame();assert.deepEqual(projectile.userData.launch,launch);assert.deepEqual(projectile.position.toArray(),position);
 const saved={...game.state,squads:game.state.squads.filter(s=>s.id!==player.id),effects:[{...effect}]};world.setState(saved);frame();const restored=objects.effectModels.get(effect.id);assert.equal(restored.userData.projectileAsset,'counterweight-trebuchet');for(const key of['x','y','z'])assert.ok(Math.abs(restored.userData.launch[key]-launch[key])<1e-9,'Saved launch is identical within matrix rounding');for(let i=0;i<3;i++)assert.ok(Math.abs(restored.position.toArray()[i]-position[i])<1e-9);assert.equal(errors.length,0);
});

test.after(()=>world.destroy());

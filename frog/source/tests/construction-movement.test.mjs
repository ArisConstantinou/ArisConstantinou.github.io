import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {fixture,updateCombatFeedback} from './game-fixture.mjs';
import {createCampaign} from '../src/campaign.js';
import {createWorld} from '../src/world.js';
import {updateConstructionSites,disposeConstructionSites,BUILDER_REACH} from '../src/construction.js';
import {campLocal,campWorld,gatePoint,FORT_RADIUS,clearFortPosition} from '../src/fortification.js';
import {SHELTER_LAYOUT_SCALE} from '../src/world-config.js';

const previousDocument=globalThis.document;
const context={fillRect(){},beginPath(){},moveTo(){},quadraticCurveTo(){},bezierCurveTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},lineTo(){},stroke(){},ellipse(){},fill(){},putImageData(){},createRadialGradient(){return {addColorStop(){}}},createImageData(w,h){return {data:new Uint8ClampedArray(w*h*4)}}};
globalThis.document={createElement(){return {width:0,height:0,getContext(){return context}}}};
after(()=>{if(previousDocument===undefined)delete globalThis.document;else globalThis.document=previousDocument;});
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);

function kingdom(t){
  const result=fixture(),game=result.game;
  game.world=createWorld(game.scene,{});game.campaign=createCampaign(null,{}, {endless:true});game.resources={food:500,reeds:500,pearls:0};game.initKingdom(null);
  game.player.y=game.world.sampleHeight(game.player.x,game.player.z);
  t.after(()=>{disposeConstructionSites(game);game.world.dispose();});return result;
}
function frame(game,observe=()=>{}){
  const dt=.05;game.elapsed+=dt;updateConstructionSites(game,dt);game.updateFrogs(dt);updateCombatFeedback(game,dt);game.updateEconomy(dt);game.updateKingdom(dt);observe();
}
function run(game,seconds,observe=()=>{},until=()=>false){
  for(let time=0;time<seconds;time+=.05){frame(game,observe);if(until())break;}
}

test('real FrogGame economy cannot advance an unattended new castle',t=>{
  const {game}=kingdom(t),site=game.world.campSites.find(s=>s.id==='home');
  assert.equal(game.commitBuild('shelter',{x:site.x,z:site.z,yaw:0}),true);
  const job=game.economy.jobs[0],camp=game.camps[0];run(game,45);
  assert.equal(job.progress,0);assert.equal(job.workRate,0);assert.equal(camp.underConstruction,true);assert.equal(camp.mesh.userData.constructionStage,0);
  assert.equal(game.frogs.length,1,'no decorative worker may substitute for an actual frog');assert.equal(game.stats.campsBuilt,0);
});

test('an actual free follower walks beyond formation distance, works and completes the staged castle',t=>{
  const {game,player}=kingdom(t),site=game.world.campSites.find(s=>s.id==='home');
  const worker=game.spawnFrog({id:'real-builder',team:'ally',role:'scout',x:0,z:1,stomach:95,order:'follow'}),start={x:worker.x,z:worker.z};
  assert.equal(game.commitBuild('shelter',{x:site.x,z:site.z,yaw:0}),true);
  const job=game.economy.jobs[0],camp=game.camps[0],stages=new Set([0]);let walked=0,previous={...start},workingFrames=0,maxDistanceFromKing=0;
  frame(game);
  assert.equal(job.progress,0,'assignment alone is not labor');assert.equal(worker.buildJobId,job.id);
  run(game,90,()=>{
    const step=distance(worker,previous);assert.ok(step<1,'builder must move through normal physics, never teleport');walked+=step;previous={x:worker.x,z:worker.z};
    stages.add(camp.mesh.userData.constructionStage);maxDistanceFromKing=Math.max(maxDistanceFromKing,distance(worker,player));
    if(worker.buildWorking){workingFrames++;const entry=game.constructionWorkers.get(worker.id),record=game.constructionSites.get(job.id);if(entry&&record)assert.ok(distance(worker,record.workPoints[entry.index])<=BUILDER_REACH+.1);}
    assert.equal(job.playerBuilding,false,'the distant king contributes no invisible labor');
  },()=>!game.economy.jobs.length);
  assert.equal(game.economy.jobs.length,0,`builder stopped at ${worker.x.toFixed(1)},${worker.z.toFixed(1)} with ${job.progress.toFixed(1)} seconds of work`);
  assert.ok(walked>20);assert.ok(maxDistanceFromKing>24,'the builder task takes precedence over ordinary catch-up');assert.ok(workingFrames>700);
  assert.deepEqual([...stages].sort(),[0,1,2,3,4]);assert.equal(camp.underConstruction,false);assert.equal(game.stats.campsBuilt,1);assert.equal(game.frogs.length,2);
  frame(game);assert.equal(worker.order,'follow');assert.equal(worker.buildJobId,undefined);assert.equal(worker.buildWorking,false);
});

test('inside-castle construction routes a real worker through the gate and preserves guard and attack orders',t=>{
  const {game,player}=kingdom(t),site=game.world.campSites.find(s=>s.id==='home');
  const camp=game.addCamp({...site,id:'finished-castle',team:'ally',yaw:Math.PI/2,buildings:{},originalEnemy:false});
  Object.assign(player,gatePoint(camp,3));player.y=game.world.sampleHeight(player.x,player.z);
  const worker=game.spawnFrog({id:'courtyard-builder',team:'ally',role:'scout',...campWorld(camp,{x:-FORT_RADIUS-5,z:0}),stomach:95,order:'follow'});
  const guard=game.spawnFrog({id:'dedicated-guard',team:'ally',...campWorld(camp,{x:10,z:-6}),home:camp.id,guard:true,order:'guard',stomach:95});
  const enemy=game.spawnFrog({id:'distant-enemy',team:'enemy0',x:-160,z:130,hp:100000,maxHp:100000,stomach:95});enemy.attackCD=enemy.specialCD=10000;
  const attacker=game.spawnFrog({id:'ordered-attacker',team:'ally',role:'hunter',...campWorld(camp,{x:10,z:10}),order:'attack',stomach:95});attacker.orderTarget=enemy;
  assert.equal(game.commitBuild('store',{campId:camp.id,local:{x:-6.5*SHELTER_LAYOUT_SCALE,z:6*SHELTER_LAYOUT_SCALE,yaw:0}}),true);
  const job=game.economy.jobs[0],record=game.constructionSites.get(job.id);let enteredThroughGate=false,wasInside=false,workFrames=0;
  for(const point of record.workPoints){assert.ok(distance(point,camp)<FORT_RADIUS-1);assert.ok(distance(clearFortPosition(camp,point),point)<.01,'work station cannot overlap the keep masonry');}
  run(game,95,()=>{
    assert.equal(guard.buildJobId,undefined);assert.equal(guard.guard,true);assert.equal(guard.order,'guard');assert.equal(attacker.buildJobId,undefined);assert.equal(attacker.order,'attack');
    const local=campLocal(camp,worker),inside=Math.hypot(local.x,local.z)<FORT_RADIUS-1;
    if(inside&&!wasInside){assert.ok(Math.abs(local.x)<3.4&&local.z>FORT_RADIUS-3,'entry must use the real rotated doorway');enteredThroughGate=true;}wasInside=inside;
    if(worker.buildWorking)workFrames++;
  },()=>!game.economy.jobs.length);
  assert.equal(game.economy.jobs.length,0,`courtyard worker stalled at ${worker.x.toFixed(1)},${worker.z.toFixed(1)}; work=${job.progress.toFixed(1)}`);
  assert.equal(enteredThroughGate,true);assert.ok(workFrames>400);assert.equal(camp.buildings.store,true);assert.equal(camp.mesh.userData.storage.visible,true);
  assert.equal(game.stats.constructionCompleted,1);assert.equal(game.frogs.length,5);
});

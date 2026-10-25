import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { constructionQueued, updateConstructionSites, constructionWorkRate, builderIntent, disposeConstructionSites, MAX_BUILDERS_PER_SITE } from '../src/construction.js';
import { updateRealmEconomy } from '../src/realm-economy.js';
import { FORT_RADIUS, campLocal } from '../src/fortification.js';

function frog(id,overrides={}) {
  const group=new THREE.Group(),wrist=new THREE.Bone();group.add(wrist);
  const model={group,bones:{wrist1:wrist},working:false,setWorking(v){this.working=!!v;}};
  return {id,team:'ally',name:id,x:0,z:0,y:.35,yaw:0,vx:0,vz:0,speed:0,hp:100,maxHp:100,dead:false,guard:false,order:'follow',grounded:true,stomach:70,morale:100,model,...overrides};
}
function fixture(type='shelter') {
  const player=frog('player',{team:'player',x:-50}),camp={id:'site',name:'Εργοτάξιο',team:'ally',x:0,z:0,yaw:.4,hp:140,maxHp:140,tier:1,underConstruction:type==='shelter',buildings:{}};
  const job={id:'job-1',kind:'construction',type,campId:camp.id,siteId:type==='shelter'?camp.id:null,placement:{x:0,z:0,yaw:camp.yaw,campId:camp.id,local:type==='store'?{x:-9,z:8,yaw:0}:undefined},cost:{food:12,reeds:30},duration:40,progress:0,status:'queued',reason:''};
  const stages=[],game={player,frogs:[player],predators:[],camps:[camp],resources:{food:100,reeds:100},stats:{},scene:new THREE.Scene(),elapsed:100,economy:{version:1,nextJobId:2,upkeepAccumulator:0,shortageSeconds:0,jobs:[job]},input:{left:false},world:{sampleHeight:()=>.35,setConstructionProgress:(j,p,c)=>stages.push({id:j.id,progress:p,camp:c.id})},campSafe:()=>true,ui:{toast(){}},audio:{play(){}},save(){},gainXP(){},
    constructionWorkRate(j){return constructionWorkRate(this,j);},completeConstruction(){this.completions=(this.completions||0)+1;return true;}
  };
  return {game,player,camp,job,stages};
}

test('queued construction creates materials and three instanced scaffold draws, without inventing workers',()=>{
  const {game,job}=fixture(),record=constructionQueued(game,job);
  assert.equal(game.frogs.length,1);assert.equal(record.workers.size,0);assert.equal(record.group.name,'construction-job-1');
  assert.equal(record.group.children.filter(n=>n.isInstancedMesh).length,3);
  assert.equal(record.stage,0);assert.ok(record.group.getObjectByName('stored-construction-stone'));
  assert.equal(constructionQueued(game,job),record);assert.equal(game.scene.children.length,1);
  disposeConstructionSites(game);
});

test('real builders are selected from free living followers and retain their existing orders',()=>{
  const {game,job}=fixture();
  const usable=[frog('a'),frog('b'),frog('c'),frog('d')],excluded=[frog('guard',{guard:true,order:'guard'}),frog('training',{trainingPaid:true,order:'training'}),frog('attacker',{order:'attack'}),frog('flanker',{order:'flank'}),frog('forager',{order:'forage'}),frog('enemy',{team:'enemy0',x:100}),frog('dead',{dead:true,hp:0})];
  game.frogs.push(...usable,...excluded);const count=game.frogs.length;updateConstructionSites(game,.05);
  assert.equal(game.constructionWorkers.size,MAX_BUILDERS_PER_SITE);assert.equal(game.frogs.length,count);
  assert.deepEqual([...game.constructionWorkers.keys()],['a','b','c']);
  for(const f of usable.slice(0,3)){assert.equal(f.order,'follow');assert.equal(f.buildJobId,job.id);assert.equal(f.x,0);assert.equal(f.z,0);assert.equal(builderIntent(game,f).kind,'move');}
  for(const f of excluded)assert.equal(f.buildJobId,undefined);
  disposeConstructionSites(game);
});

test('unfinished castle work stations are outside the real gate and rotate with the castle',()=>{
  const {game,camp,job}=fixture(),record=constructionQueued(game,job);
  for(const point of record.workPoints){const local=campLocal(camp,point);assert.ok(Math.abs(local.x)<=2.001);assert.ok(local.z>FORT_RADIUS+2.7);}
  disposeConstructionSites(game);
});

test('time alone cannot complete construction; present living builders are required',()=>{
  const {game,job}=fixture();updateConstructionSites(game,.05);
  for(let i=0;i<20;i++)updateRealmEconomy(game,1);
  assert.equal(job.progress,0);assert.equal(game.completions,undefined);assert.equal(job.workRate,0);assert.ok(job.reason.includes('Πλησίασε'));
  disposeConstructionSites(game);
});

test('the solo noble can physically build by standing at the work bench; walking and attacks stop contribution',()=>{
  const {game,player,job}=fixture(),record=constructionQueued(game,job);Object.assign(player,record.workPoints[1]);
  updateConstructionSites(game,.05);assert.equal(constructionWorkRate(game,job),1);assert.equal(job.playerBuilding,true);assert.equal(player.model.working,true);assert.ok(player.constructionMallet);
  updateRealmEconomy(game,1);assert.equal(job.progress,1);
  player.vx=3;updateConstructionSites(game,.05);updateRealmEconomy(game,1);assert.equal(job.progress,1);assert.equal(player.model.working,false);
  player.vx=0;player.attackAnim=.5;updateConstructionSites(game,.05);assert.equal(constructionWorkRate(game,job),0);
  player.attackAnim=0;player.grounded=false;updateConstructionSites(game,.05);assert.equal(constructionWorkRate(game,job),0);
  player.grounded=true;updateConstructionSites(game,.05);assert.equal(constructionWorkRate(game,job),1);
  for(let i=0;i<39;i++)updateRealmEconomy(game,1);
  assert.equal(game.completions,1);assert.equal(game.economy.jobs.length,0);updateConstructionSites(game,.05);assert.equal(player.model.working,false);assert.equal(player.constructionMallet,undefined);
  disposeConstructionSites(game);
});

test('helpers contribute only after walking to their assigned stations, and additional real workers speed the job up',()=>{
  const {game,job}=fixture();const helpers=[frog('one'),frog('two'),frog('three')];game.frogs.push(...helpers);updateConstructionSites(game,.05);
  assert.equal(constructionWorkRate(game,job),0);
  for(let i=0;i<helpers.length;i++){
    const target=builderIntent(game,helpers[i]).target;Object.assign(helpers[i],target);helpers[i].vx=0;helpers[i].vz=0;
    assert.equal(constructionWorkRate(game,job),1+i*.25);
  }
  assert.equal(job.workersPresent,3);assert.ok(helpers.every(f=>f.model.working));assert.ok(helpers.every(f=>f.constructionMallet));
  disposeConstructionSites(game);
});

test('a threat releases workers to their normal AI and a direct attack order is never overwritten',()=>{
  const {game,job}=fixture();const helper=frog('worker');game.frogs.push(helper);updateConstructionSites(game,.05);Object.assign(helper,builderIntent(game,helper).target);updateConstructionSites(game,.05);assert.equal(helper.model.working,true);
  game.campSafe=()=>false;updateConstructionSites(game,.05);assert.equal(game.constructionWorkers.size,0);assert.equal(helper.buildJobId,undefined);assert.equal(helper.model.working,false);assert.equal(job.workRate,0);assert.equal(helper.order,'follow');
  game.campSafe=()=>true;game.elapsed+=1;updateConstructionSites(game,.05);assert.equal(helper.buildJobId,job.id);
  helper.order='attack';assert.equal(builderIntent(game,helper),null);assert.equal(helper.order,'attack');assert.equal(helper.buildJobId,undefined);
  disposeConstructionSites(game);
});

test('scaffolding and the borrowed mallet are reused between frames; only real stage changes rebuild site geometry',()=>{
  const {game,player,job,stages}=fixture(),record=constructionQueued(game,job);Object.assign(player,record.workPoints[1]);
  updateConstructionSites(game,.05);const group=record.group,mallet=player.constructionMallet;
  for(let i=0;i<50;i++){game.elapsed+=.05;updateConstructionSites(game,.05);}
  assert.equal(record.group,group);assert.equal(player.constructionMallet,mallet);assert.equal(stages.length,1);
  job.progress=11;updateConstructionSites(game,.05);assert.notEqual(record.group,group);assert.equal(record.stage,1);assert.equal(stages.length,2);
  const second=record.group;job.progress=19;updateConstructionSites(game,.05);assert.equal(record.group,second);assert.equal(stages.length,2);
  disposeConstructionSites(game);
});

test('finished, cancelled or destroyed sites release tools and workers without deleting frogs',()=>{
  const {game,job}=fixture();const helper=frog('builder');game.frogs.push(helper);updateConstructionSites(game,.05);Object.assign(helper,builderIntent(game,helper).target);updateConstructionSites(game,.05);
  game.economy.jobs=[];updateConstructionSites(game,.05);assert.equal(game.constructionSites.size,0);assert.equal(game.constructionWorkers.size,0);assert.equal(game.frogs.length,2);assert.equal(helper.constructionMallet,undefined);assert.equal(helper.model.working,false);assert.equal(game.scene.children.length,0);
  game.economy.jobs=[job];updateConstructionSites(game,.05);disposeConstructionSites(game);assert.equal(game.constructionSites.size,0);assert.equal(helper.buildJobId,undefined);
});

test('one frog cannot contribute to multiple jobs at once and internal building work stays within the courtyard',()=>{
  const {game,player,job}=fixture('store');const record=constructionQueued(game,job);Object.assign(player,record.workPoints[0]);
  const second={...job,id:'job-2',progress:0};game.economy.jobs.push(second);updateConstructionSites(game,.05);
  assert.equal(game.economy.jobs.filter(j=>j.playerBuilding).length,1);assert.equal(game.economy.jobs.filter(j=>j.workRate>0).length,1);
  for(const point of record.workPoints)assert.ok(Math.hypot(point.x,point.z)<FORT_RADIUS-1);
  disposeConstructionSites(game);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {createGame,getConstructionProgress,CONSTRUCTION_CREW_CLEARANCE,CONSTRUCTION_CREW_SPEED,isWorldPointWalkable,isWorldSegmentWalkable} from '../feouda-engine.js';
import {REGIONS,UNIT_TYPES} from '../feouda-data.js';

const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
const close=(a,b,tolerance=1e-6)=>assert.ok(Math.abs(a-b)<=tolerance,`${a} differs from ${b}`);
const workers=game=>[...game.state.jobs.flatMap(job=>job.construction?.crew||[]),...game.state.returningCrews];
const advance=(game,seconds)=>{for(let t=0;t<seconds-1e-8;t+=.1)game.step(Math.min(.1,seconds-t));};
const until=(game,condition,limit=180)=>{for(let t=0;!condition()&&t<limit;t+=.1)game.step(.1);assert.ok(condition(),'The expected simulation state should be reachable');};
function campaign(){
  const game=createGame({now:()=>1000});
  for(const resource of Object.keys(game.state.resources))game.state.resources[resource]=10000;
  for(const faction of ['red','gold']){game.state.ai.factions[faction].nextRaid=1e8;game.state.ai.factions[faction].nextRecruit=1e8;}
  return game;
}
function start(game,type='houses',regionId='quarry',rotation=0){
  const position=game.findBuildLocation(type,regionId,rotation);assert.ok(position);
  const payload={type,regionId,...position},quote=game.canCommand('build',payload),result=game.command('build',payload);
  assert.equal(result.ok,true,result.message);
  return {job:game.state.jobs.find(job=>job.id===result.jobId),structure:game.state.structures.find(structure=>structure.id===result.structureId),quote,payload};
}
function traceStep(game,dt=.1){
  const previous=new Map(workers(game).map(worker=>[worker.id,{x:worker.x,z:worker.z,travelled:worker.travelled}]));
  game.step(dt);let segments=0;
  for(const worker of workers(game)){
    assert.ok(isWorldPointWalkable(game.state,worker,CONSTRUCTION_CREW_CLEARANCE),worker.id+' is inside geometry');
    const from=previous.get(worker.id);if(!from)continue;
    assert.ok(isWorldSegmentWalkable(game.state,from,worker,CONSTRUCTION_CREW_CLEARANCE),worker.id+' crossed geometry');
    assert.ok(distance(from,worker)<=dt*game.state.speed*CONSTRUCTION_CREW_SPEED+1e-6,worker.id+' teleported');
    assert.ok(worker.travelled>=from.travelled);
    segments++;
  }
  return segments;
}
function inspectSnapshot(game){return JSON.stringify({t:game.state.t,resources:game.state.resources,jobs:game.state.jobs,returningCrews:game.state.returningCrews,structures:game.state.structures});}

test('a confirmed site charges once and sends exactly four reserved workers from legal distinct origins',()=>{
  const game=campaign(),position=game.findBuildLocation('houses','quarry'),payload={type:'houses',regionId:'quarry',...position},before=JSON.stringify(game.state),quote=game.canCommand('build',payload);
  assert.equal(quote.ok,true);assert.equal(JSON.stringify(game.state),before,'A placement quote must remain read-only');
  const resources={...game.state.resources},available=game.state.availableWorkers,result=game.command('build',payload);assert.equal(result.ok,true);
  const job=game.state.jobs.find(job=>job.id===result.jobId);
  assert.equal(job.construction.crew.length,4);assert.equal(job.construction.legacy,false);
  assert.equal(game.state.availableWorkers,available-4);assert.equal(game.state.busyWorkers,4);assert.equal(game.state.workerActivity.traveling,4);
  for(const [resource,cost] of Object.entries(quote.cost))close(game.state.resources[resource],resources[resource]-cost);
  for(const worker of job.construction.crew){
    assert.equal(worker.jobId,job.id);assert.equal(worker.structureId,job.structureId);assert.equal(worker.phase,'travel');assert.ok(distance(worker,worker.target)>=2);
    assert.ok(isWorldPointWalkable(game.state,worker,CONSTRUCTION_CREW_CLEARANCE));assert.ok(isWorldPointWalkable(game.state,worker.target,CONSTRUCTION_CREW_CLEARANCE));
    let previous=worker;for(const point of worker.path){assert.ok(isWorldSegmentWalkable(game.state,previous,point,CONSTRUCTION_CREW_CLEARANCE));previous=point;}
  }
  assert.equal(new Set(job.construction.crew.map(worker=>worker.id)).size,4);
  assert.equal(new Set(job.construction.crew.map(worker=>`${worker.target.x},${worker.target.z}`)).size,4);
  assert.equal(game.command('build',payload).ok,false);
});

test('work cannot progress before arrival and partial crews provide the actual proportional rate',()=>{
  const game=campaign(),{job}=start(game),initial=job.remaining,read=getConstructionProgress(game.state,job);
  assert.equal(read.phase,'travel');assert.equal(read.crewReady,0);assert.equal(read.workRate,0);assert.ok(read.estimatedSeconds>read.remainingWorkSeconds);
  advance(game,1);close(job.remaining,initial);
  until(game,()=>getConstructionProgress(game.state,job).crewReady>0);
  const partial=getConstructionProgress(game.state,job);assert.ok(partial.crewReady<4);close(partial.workRate,partial.crewReady/4);
  const prior=job.remaining,ready=partial.crewReady;game.step(.001);close(prior-job.remaining,ready*.001/4);
  until(game,()=>getConstructionProgress(game.state,job).crewReady===4);
  const remaining=job.remaining;game.step(.1);close(remaining-job.remaining,.1);
});

test('the route-informed estimate matches completion while returning workers remain reserved until home',()=>{
  const game=campaign(),{job,structure}=start(game),estimate=getConstructionProgress(game.state,job).estimatedSeconds,ids=job.construction.crew.map(worker=>worker.id);
  advance(game,estimate-.2);assert.equal(structure.status,'building');
  advance(game,.3);assert.equal(structure.status,'ready');assert.equal(game.state.jobs.some(j=>j.id===job.id),false);
  assert.deepEqual(game.state.returningCrews.map(worker=>worker.id),ids);assert.equal(game.state.busyWorkers,4);assert.equal(game.state.returningWorkers,4);
  assert.equal(game.state.workerActivity.returning,4);assert.equal(game.state.stats.built,1);
  let previous=4,individualRelease=false;
  until(game,()=>{
    const count=game.state.returningCrews.length;if(count>0&&count<previous)individualRelease=true;previous=count;
    return count===0;
  });
  assert.equal(individualRelease,true);assert.equal(game.state.busyWorkers,0);assert.equal(game.state.returningWorkers,0);
  assert.equal(game.state.availableWorkers+game.state.assignedWorkers,game.state.workforce);
});

test('every actual outward and return movement stays clear of rotated structures and inside the speed envelope',()=>{
  const game=campaign(),{job}=start(game,'houses','home',Math.PI/4);let segments=0;
  for(let t=0;t<180&&(game.state.jobs.includes(job)||game.state.returningCrews.length);t+=.1)segments+=traceStep(game);
  assert.equal(game.state.jobs.includes(job),false);assert.equal(game.state.returningCrews.length,0);assert.ok(segments>1500);
});

for(const phase of ['travel','work','return'])test(`tactical pause freezes ${phase} positions, poses, work and reservations`,()=>{
  const game=campaign(),{job}=start(game);
  if(phase==='work')until(game,()=>getConstructionProgress(game.state,job).crewReady===4);
  if(phase==='return')until(game,()=>game.state.returningCrews.length===4);
  game.setPaused(true);const before=inspectSnapshot(game),busy=game.state.busyWorkers;
  advance(game,10);assert.equal(inspectSnapshot(game),before);assert.equal(game.state.busyWorkers,busy);
  if(phase!=='return')assert.equal(getConstructionProgress(game.state,job).phase,'paused');
  game.setPaused(false);game.step(.1);assert.notEqual(inspectSnapshot(game),before);
});

test('1x and 4x apply the same movement and construction for equal simulation time',()=>{
  const slow=campaign(),fast=campaign(),a=start(slow).job,b=start(fast).job;
  fast.setSpeed(4);advance(slow,24);advance(fast,6);
  close(a.remaining,b.remaining);close(slow.state.t,fast.state.t);
  for(let i=0;i<4;i++){close(a.construction.crew[i].x,b.construction.crew[i].x);close(a.construction.crew[i].z,b.construction.crew[i].z);close(a.construction.crew[i].travelled,b.construction.crew[i].travelled);}
});

for(const phase of ['travel','work','return'])test(`save/import preserves the ${phase} lifecycle without an offline time jump`,()=>{
  const game=campaign(),{job}=start(game);
  if(phase==='travel')advance(game,3);
  if(phase==='work')until(game,()=>getConstructionProgress(game.state,job).crewReady===4);
  if(phase==='return')until(game,()=>game.state.returningCrews.length===4);
  game.setPaused(true);const before=inspectSnapshot(game),restored=campaign(),result=restored.importSave(game.exportSave());
  assert.equal(result.ok,true,result.message);
  const loaded=JSON.parse(inspectSnapshot(restored)),saved=JSON.parse(before),loadedStructures=loaded.structures,savedStructures=saved.structures;delete loaded.structures;delete saved.structures;
  assert.deepEqual(loaded,saved);
  for(let i=0;i<loadedStructures.length;i++){const a=loadedStructures[i],b=savedStructures[i];assert.equal(a.id,b.id);assert.equal(a.status,b.status);assert.equal(a.level,b.level);assert.equal(a.x,b.x);assert.equal(a.z,b.z);close(a.rotation,b.rotation,1e-12);close(a.baseY,b.baseY,1e-12);}
  assert.equal(restored.state.busyWorkers,game.state.busyWorkers);
  restored.setPaused(false);traceStep(restored);
});

test('legacy active jobs retain work already completed and do not gain a new journey delay',()=>{
  const original=campaign(),{job}=start(original);advance(original,24);
  const envelope=JSON.parse(original.exportSave());delete envelope.state.jobs.find(j=>j.id===job.id).construction;delete envelope.state.returningCrews;
  const remaining=job.remaining,resources={...envelope.state.resources},restored=campaign(),result=restored.importSave(JSON.stringify(envelope));assert.equal(result.ok,true,result.message);
  const loaded=restored.state.jobs.find(j=>j.id===job.id);assert.equal(loaded.remaining,remaining);assert.deepEqual(restored.state.resources,resources);assert.equal(loaded.construction.legacy,true);
  assert.equal(getConstructionProgress(restored.state,loaded).crewReady,4);
  for(const worker of loaded.construction.crew)close(distance(worker,worker.target),0);
  advance(restored,remaining+.2);assert.equal(restored.state.jobs.some(j=>j.id===job.id),false);assert.equal(restored.state.busyWorkers,0);
});

test('upgrades keep the original plot and require arriving workers before work can advance',()=>{
  const game=campaign(),structure=game.state.structures.find(site=>site.type==='houses'&&site.regionId==='home'),position={x:structure.x,z:structure.z,rotation:structure.rotation},level=structure.level;
  const result=game.command('build',{type:'houses',regionId:'home',structureId:structure.id});assert.equal(result.ok,true,result.message);
  const job=game.state.jobs.find(job=>job.id===result.jobId);assert.equal(structure.status,'upgrading');assert.equal(getConstructionProgress(game.state,job).crewReady,0);
  const remaining=job.remaining;game.step(.1);close(job.remaining,remaining);
  until(game,()=>structure.status==='ready');assert.equal(structure.level,level+1);assert.deepEqual({x:structure.x,z:structure.z,rotation:structure.rotation},position);
});

test('an obsolete shortcut cannot tunnel a worker through an existing building',()=>{
  const game=campaign(),{job}=start(game,'houses','home',Math.PI/4);
  const worker=job.construction.crew.find(worker=>!isWorldSegmentWalkable(game.state,worker,worker.target,CONSTRUCTION_CREW_CLEARANCE));assert.ok(worker,'Fixture needs a bent route');
  worker.path=[{...worker.target}];let blocked=false;
  for(let t=0;t<90&&worker.phase!=='work';t+=.1){traceStep(game);if(worker.phase==='blocked')blocked=true;}
  assert.equal(blocked,true);assert.equal(worker.phase,'work');
});

test('new placement protects both a live worker and a reserved work position',()=>{
  const game=campaign(),{job}=start(game),worker=job.construction.crew[0],position=game.findBuildLocation('well','home');assert.ok(position);
  const payload={type:'well',regionId:'home',...position};assert.equal(game.canCommand('build',payload).ok,true);
  const previous={x:worker.x,z:worker.z};worker.x=position.x;worker.z=position.z;
  assert.equal(game.canCommand('build',payload).ok,false);assert.match(game.canCommand('build',payload).message,/εργάτες/);
  worker.x=previous.x;worker.z=previous.z;const target=worker.target;worker.target={x:position.x,z:position.z};
  assert.equal(game.canCommand('build',payload).ok,false);worker.target=target;
});

test('restoring a portcullis waits for a construction worker to physically leave it',()=>{
  const game=campaign(),{job}=start(game),region=game.state.regions.firwood,meta=REGIONS.find(r=>r.id==='firwood');region.owner='player';region.fortHp=region.maxFortHp*.1;
  game.state.squads=[];
  const worker=job.construction.crew[0];worker.x=meta.x;worker.z=meta.z+9;worker.path=[];worker.phase='blocked';worker.repathAt=1e8;
  assert.ok(isWorldPointWalkable(game.state,worker,CONSTRUCTION_CREW_CLEARANCE));
  assert.equal(game.command('repair',{regionId:'firwood'}).ok,true);
  advance(game,12);assert.ok(region.fortHp/region.maxFortHp<=.16+1e-6);
  const repair=game.state.jobs.find(j=>j.type==='repair');assert.equal(repair.blocked,true);
  worker.repathAt=0;
  for(let t=0;t<100&&region.fortHp<region.maxFortHp;t+=.1)traceStep(game);
  close(region.fortHp,region.maxFortHp);
});

function captureQuarry(game){
  const region=game.state.regions.quarry,gate=game.getNavigation().fortGate('quarry'),enemy=game.state.squads.find(squad=>squad.owner==='gold'&&UNIT_TYPES[squad.type].role==='infantry');assert.ok(enemy);
  const point=game.getNavigation().nearestGround(gate,enemy);Object.assign(enemy,{x:point.x,z:point.z,anchor:{...point},path:[],order:{type:'capture',regionId:'quarry',targetId:'quarry'},stance:'defensive'});
  game.state.squads=[enemy];region.fortHp=0;region.capture=99.99;region.captureOwner='gold';game.step(.1);assert.equal(region.owner,'gold');
}

test('capture removes an unfinished site and routes its same workers toward remaining owned settlements',()=>{
  const game=campaign(),{job,structure}=start(game);advance(game,3);const previous=new Map(job.construction.crew.map(worker=>[worker.id,{x:worker.x,z:worker.z}]));
  captureQuarry(game);assert.equal(game.state.jobs.includes(job),false);assert.equal(game.state.structures.includes(structure),false);assert.equal(game.state.returningCrews.length,4);
  for(const worker of game.state.returningCrews){assert.ok(distance(previous.get(worker.id),worker)<=CONSTRUCTION_CREW_SPEED*.1+1e-6);assert.equal(game.state.regions[worker.returnRegionId].owner,'player');assert.notEqual(worker.returnRegionId,'quarry');}
  for(let t=0;t<180&&game.state.returningCrews.length;t+=.1)traceStep(game);
  assert.equal(game.state.returningCrews.length,0);assert.equal(game.state.busyWorkers,0);
});

test('capture cancels an upgrade without destroying its completed level',()=>{
  const game=campaign(),structure=game.state.structures.find(site=>site.type==='quarry'&&site.regionId==='quarry'),level=structure.level;
  const result=game.command('build',{type:'quarry',regionId:'quarry',structureId:structure.id});assert.equal(result.ok,true,result.message);
  captureQuarry(game);assert.equal(structure.status,'ready');assert.equal(structure.jobId,null);assert.equal(structure.level,level);assert.equal(game.state.returningCrews.length,4);
});

test('a return destination that becomes solid chooses another legal origin instead of keeping labor blocked',()=>{
  const game=campaign(),{job}=start(game);until(game,()=>game.state.returningCrews.length===4);
  const worker=game.state.returningCrews[0],before={x:worker.x,z:worker.z},solid=game.state.structures.find(site=>site.regionId==='quarry'&&site.type==='mine');
  worker.target={x:solid.x,z:solid.z};worker.path=[{...worker.target}];worker.repathAt=0;game.step(.1);
  assert.ok(isWorldPointWalkable(game.state,worker.target,CONSTRUCTION_CREW_CLEARANCE));assert.ok(distance(before,worker)<=CONSTRUCTION_CREW_SPEED*.1+1e-6);
  until(game,()=>game.state.returningCrews.length===0);assert.equal(game.state.busyWorkers,0);
});

test('malformed crew imports fail transactionally without modifying campaign resources, time or jobs',()=>{
  const original=campaign();start(original);advance(original,2);const text=original.exportSave(),running=campaign(),before=running.exportSave();
  const mutators=[
    s=>s.jobs[0].construction.crew.pop(),s=>s.jobs[0].construction.version=9,s=>s.jobs[0].construction.crew[0].jobId='missing',
    s=>s.jobs[0].construction.crew[0].structureId='missing',s=>s.jobs[0].construction.crew[0].x=1e20,s=>s.jobs[0].construction.crew[0].travelled=-1,
    s=>s.jobs[0].construction.crew[0].phase='teleport',s=>s.jobs[0].construction.crew[0].phase='work',s=>s.jobs[0].construction.crew[0].path=[{x:0,z:0}],
    s=>s.jobs[0].construction.crew[1].id=s.jobs[0].construction.crew[0].id,s=>s.jobs[0].workers=0,s=>s.returningCrews={},
    s=>s.jobs[0].construction.crew[0].target={x:REGIONS[0].x,z:REGIONS[0].z}
  ];
  for(const mutate of mutators){const envelope=JSON.parse(text);mutate(envelope.state);assert.equal(running.importSave(JSON.stringify(envelope)).ok,false);assert.equal(running.exportSave(),before);}
});

test('an unsafe saved worker is recovered on the import candidate without spending or elapsed simulation',()=>{
  const original=campaign();start(original);advance(original,2);const envelope=JSON.parse(original.exportSave()),worker=envelope.state.jobs[0].construction.crew[0],solid=envelope.state.structures.find(site=>site.type==='houses'&&site.regionId==='home');
  worker.x=solid.x;worker.z=solid.z;const restored=campaign(),result=restored.importSave(JSON.stringify(envelope));assert.equal(result.ok,true,result.message);
  const loaded=restored.state.jobs[0].construction.crew[0];assert.ok(isWorldPointWalkable(restored.state,loaded,CONSTRUCTION_CREW_CLEARANCE));assert.notEqual(distance(loaded,worker),0);
  assert.equal(restored.state.t,envelope.state.t);assert.deepEqual(restored.state.resources,envelope.state.resources);assert.equal(restored.state.jobs[0].remaining,envelope.state.jobs[0].remaining);
  traceStep(restored);
});

test('read-only stages use real work thresholds and appropriate words for field and well construction',()=>{
  const game=campaign(),{job}=start(game),snapshot=game.exportSave();getConstructionProgress(game.state,job);assert.equal(game.exportSave(),snapshot);
  for(const [progress,stage] of [[0,'foundation'],[.2,'walls'],[.6,'roof'],[.85,'finish'],[1,'finish']]){job.remaining=job.duration*(1-progress);assert.equal(getConstructionProgress(game.state,job).stage,stage);}
  const fake={...job,type:'farm',remaining:job.duration*.7},read=getConstructionProgress(game.state,fake);assert.equal(read.stageTitle,'Διαμόρφωση χωραφιού');assert.equal(read.stages[2].title,'Φύτευση και περίφραξη');
  assert.equal(getConstructionProgress(game.state,{...fake,type:'well'}).stages[0].title,'Εκσκαφή');
  assert.equal(getConstructionProgress(game.state,{kind:'train',type:'spear',remaining:20,duration:22}),null);
  job.remaining=5;job.construction.crew[0].phase='blocked';job.construction.crew[0].path=[];assert.equal(getConstructionProgress(game.state,job).estimatedSeconds,null);
});

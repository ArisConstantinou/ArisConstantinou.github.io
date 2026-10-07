import assert from 'node:assert/strict';
import {createGame,validateSave,getFreeWorkers,getProjectStatus,getMissionStatus,getDialogueStatus,getEconomyRates,getChapter,PROJECTS,MISSIONS,EVENTS,NPCS,STORAGE_KEY,OFFLINE_CAP_SECONDS,CAMPAIGN_SECONDS,SANDBOX_SPEED} from '../engine.js';

function memoryStorage(){
  const values=new Map();
  return {getItem:key=>values.get(key)||null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key),values};
}
function harness(mode='campaign',storage=memoryStorage()){
  let clock=1000000000000;
  const game=createGame({storage,now:()=>clock,mode});
  return {game,storage,advance:seconds=>{clock+=seconds*1000;game.tick();},setClock:value=>{clock=value;},getClock:()=>clock,reload:()=>createGame({storage,now:()=>clock})};
}
function enrich(game){
  for(const key of ['money','wood','stone','food','goods'])game.state.resources[key]=50000;
  for(const key of Object.keys(game.state.workers.assignments))game.state.workers.assignments[key]=0;
}
function mark(game,id){
  if(!game.state.completedProjects.includes(id))game.state.completedProjects.push(id);
  game.state.projectCounts[id]=(game.state.projectCounts[id]||0)+1;
}
let passed=0;
function test(name,fn){try{fn();passed++;process.stdout.write(`✓ ${name}\n`);}catch(error){process.stderr.write(`✗ ${name}\n`);throw error;}}

test('fresh economy is solvent, sources have positive production, and workers are conserved',()=>{
  const {game}=harness(),s=game.state,r=getEconomyRates(s);
  assert.equal(getFreeWorkers(s),7);assert.equal(r.workingWorkers,7);
  assert(r.net>0);assert(r.netResources.food>0);assert(r.production.wood>0);assert(r.production.stone>0);
  assert(game.assign('farm',7).ok);assert.equal(getFreeWorkers(s),0);
  assert(!game.assign('wood',1).ok);assert(!game.assign('stone',-3).ok);
  assert(!game.assign('craft',1).ok);assert(!game.assign('bogus',1).ok);
  assert(!game.assign('farm',.5).ok);assert.equal(s.workers.assignments.farm,10);
});

test('projects pay once, reserve workers, complete on time and release workers',()=>{
  const {game,advance}=harness();
  assert(game.startProject('repair_fountain').ok);assert.equal(game.state.resources.money,390);assert.equal(getFreeWorkers(game.state),5);
  assert(!game.startProject('repair_fountain').ok);assert.equal(game.state.jobs.length,1);
  advance(44);assert.equal(game.state.jobs.length,1);assert.equal(game.state.buildings.fountain.condition,15);
  advance(1);assert.equal(game.state.jobs.length,0);assert.equal(game.state.buildings.fountain.condition,75);assert.equal(getFreeWorkers(game.state),7);
  assert.equal(game.state.projectCounts.repair_fountain,1);assert(!game.startProject('repair_fountain').ok);
  assert.equal(game.state.ledger.filter(e=>e.description==='Έργο: Νερό ξανά στη βρύση').length,1);
});

test('inspections provide one bounded speed bonus per actual job',()=>{
  const {game,advance}=harness();enrich(game);mark(game,'clean_square');mark(game,'stone_yard');mark(game,'repair_bridge');
  advance(43200);assert(game.startProject('stone_lanes').ok);
  const initial=game.state.jobs[0].remaining;
  assert(game.visit('square').ok);assert.equal(initial-game.state.jobs[0].remaining,300);
  const after=game.state.jobs[0].remaining;game.visit('square');assert.equal(game.state.jobs[0].remaining,after);
  assert.equal(game.state.stats.inspections,1);
});

test('house work targets a real house, is individually reserved, and can restore multiple homes',()=>{
  const {game,advance}=harness();enrich(game);mark(game,'repair_fountain');
  assert(!game.startProject('repair_house','forest').ok);
  assert(game.startProject('repair_house','house1').ok);assert(game.startProject('repair_house','house2').ok);
  assert(!game.startProject('repair_house','house1').ok);advance(480);
  assert.equal(game.state.buildings.house1.condition,66);assert.equal(game.state.buildings.house2.condition,76);
  assert.equal(game.state.projectCounts.repair_house,2);assert(game.startProject('repair_house','house1').ok);advance(480);
  assert.equal(game.state.buildings.house1.condition,100);assert(!game.startProject('repair_house','house1').ok);
});

test('trades and barters reject negative, fractional, NaN and excessive amounts with no resource exploit',()=>{
  const {game}=harness();const before={...game.state.resources};
  for(const amount of [-1,0,.5,NaN,Infinity,'5',10001])assert(!game.trade('wood','buy',amount).ok);
  assert(!game.trade('money','sell',5).ok);assert(!game.trade('__proto__','buy',5).ok);
  assert(!game.trade('wood','sell',500).ok);assert.deepEqual(game.state.resources,before);
  assert(game.trade('wood','buy',5).ok);assert.equal(game.state.resources.wood,80);assert.equal(game.state.resources.money,409);
  assert(game.trade('wood','sell',5).ok);assert.equal(game.state.resources.money,414.5);
  assert(game.barter('wood_stone').ok);assert.equal(game.state.resources.wood,65);assert.equal(game.state.resources.stone,113);
});

test('prototype names are rejected safely at public content entry points',()=>{
  const {game}=harness();
  for(const id of ['__proto__','constructor','toString']){
    assert(!game.startProject(id).ok);assert(!game.claimMission(id).ok);assert(!game.talk(id,'listen').ok);assert(!game.replyAtOffice(id,'listen').ok);
    assert(!getProjectStatus(game.state,id).available);assert(!getMissionStatus(game.state,id).available);
  }
});

test('workshop consumes real wood and cannot manufacture goods from zero input',()=>{
  const {game,advance}=harness();
  for(const key of Object.keys(game.state.workers.assignments))game.state.workers.assignments[key]=0;
  game.state.buildings.woodshop.condition=75;assert(game.assign('craft',4).ok);
  game.state.resources.wood=0;const first=game.state.resources.goods;advance(3600);assert.equal(game.state.resources.goods,first);
  game.state.resources.wood=3;advance(3600);assert.equal(game.state.resources.wood,0);assert.equal(game.state.resources.goods,first+1.5);
  assert.equal(game.state.stats.produced.goods,1.5);
});

test('inbound event choices apply their actual costs and cannot be claimed twice',()=>{
  const {game,advance}=harness();advance(120);assert.equal(game.state.event.id,'tefteri');
  const money=game.state.resources.money,trust=game.state.metrics.trust;
  assert(game.resolveEvent('collect').ok);assert(Math.abs(game.state.resources.money-money-38)<1e-5);assert.equal(game.state.metrics.trust,trust-6);
  assert(!game.resolveEvent('collect').ok);assert.equal(game.state.stats.eventsResolved,1);
  advance(7199);assert.equal(game.state.event,null);advance(1);assert.equal(game.state.event.id,'goat');
  game.state.resources.wood=0;const snapshot=JSON.stringify(game.state.resources);assert(!game.resolveEvent('repair').ok);assert.equal(JSON.stringify(game.state.resources),snapshot);assert.equal(game.state.event.id,'goat');
  assert(game.resolveEvent('return').ok);
});

test('every event has a free recovery choice and all effect and reward values are finite',()=>{
  assert(EVENTS.length>=10);assert(PROJECTS.length>=24);assert(MISSIONS.length>=12);assert(NPCS.length>=4);
  for(const e of EVENTS){
    assert(e.choices.some(c=>Object.values(c.cost).every(v=>v===0)),e.id);
    for(const c of e.choices)for(const map of [c.cost,c.reward,c.effects])for(const value of Object.values(map))assert(Number.isFinite(value),e.id);
  }
});

test('onsite NPC dialogue requires a visit and grants bounded benefits with a six-hour cooldown',()=>{
  const {game,advance}=harness();const before=game.state.metrics.heritage;
  assert(!game.talk('savvas','listen').ok);game.visit('woodshop');assert(game.talk('savvas','listen').ok);
  assert.equal(game.state.metrics.heritage,before+3);assert(!game.talk('savvas','sample').ok);
  advance(21600);assert(game.talk('savvas','sample').ok);assert.deepEqual(game.state.stats.talkedNPCs,['savvas']);
});

test('all resident choices can be answered at the office without recording visits or inspections',()=>{
  for(const npc of NPCS)for(const choice of npc.choices){
    const {game}=harness();game.startProject('repair_fountain');
    const before={...game.state.resources},visits={...game.state.visits},jobs=JSON.stringify(game.state.jobs),inspections=game.state.stats.inspections;
    assert(getDialogueStatus(game.state,npc.id,choice.id,'office').available,npc.id+':'+choice.id);
    assert(game.replyAtOffice(npc.id,choice.id).ok,npc.id+':'+choice.id);
    for(const resource of Object.keys(before))assert.equal(game.state.resources[resource],before[resource]-(choice.cost[resource]||0)+(choice.reward[resource]||0),npc.id+':'+resource);
    assert.deepEqual(game.state.visits,visits);assert.equal(game.state.stats.inspections,inspections);assert.equal(JSON.stringify(game.state.jobs),jobs);
    assert.equal(game.state.selectedBuilding,'office');assert.deepEqual(game.state.stats.talkedNPCs,[npc.id]);
  }
});

test('office and onsite replies share a cooldown and cannot bypass location or material costs',()=>{
  const {game,advance}=harness();
  game.state.resources.wood=0;const before={...game.state.resources};
  assert.equal(getDialogueStatus(game.state,'savvas','sample','office').code,'cost');assert(!game.replyAtOffice('savvas','sample').ok);assert.deepEqual(game.state.resources,before);
  assert(game.replyAtOffice('savvas','listen').ok);assert.equal(game.state.dialogueCooldowns.savvas,21600);
  assert.equal(getDialogueStatus(game.state,'savvas','sample','office').code,'cooldown');
  game.visit('woodshop');assert(!game.replyAtOffice('andreas','materials').ok);assert(!game.talk('savvas','sample').ok);
  advance(21600);assert(game.talk('savvas','sample').ok);game.returnToOffice();
  assert(!game.replyAtOffice('savvas','listen').ok);assert.deepEqual(game.state.stats.talkedNPCs,['savvas']);
  assert.equal(getDialogueStatus(game.state,'sofia','open_books','invented').available,false);
});

test('office replies and waiting times survive a version-one save roundtrip',()=>{
  const h=harness();assert(h.game.replyAtOffice('maroulla','basket').ok);
  const restored=h.reload();assert.deepEqual(restored.state.stats.talkedNPCs,['maroulla']);assert.equal(restored.state.dialogueCooldowns.maroulla,21600);
  assert(!restored.replyAtOffice('maroulla','listen').ok);assert.deepEqual(restored.state.visits,h.game.state.visits);
  assert.doesNotThrow(()=>validateSave(restored.exportSave()));
});

test('missions require their actual goals, chapter and one-time claim',()=>{
  const {game,advance}=harness();assert(!game.claimMission('water').ok);
  game.startProject('repair_fountain');advance(45);assert(getMissionStatus(game.state,'water').complete);
  const before=game.state.resources.money;assert(game.claimMission('water').ok);assert.equal(game.state.resources.money,before+30);
  assert(!game.claimMission('water').ok);assert.equal(game.state.missionClaims.length,1);
  for(const id of ['house1','house2','house3'])game.state.buildings[id].condition=70;
  assert(getMissionStatus(game.state,'roofs').complete);assert(!game.claimMission('roofs').ok);
  advance(3600);assert(game.claimMission('roofs').ok);
});

test('campaign final cannot be completed before 72 real hours of accepted progress',()=>{
  const {game,advance}=harness();enrich(game);mark(game,'annual_festival');
  for(const id of Object.keys(game.state.buildings))if(id.startsWith('house'))game.state.buildings[id].condition=100;
  for(const key of Object.keys(game.state.metrics))game.state.metrics[key]=100;
  advance(OFFLINE_CAP_SECONDS);assert.equal(game.state.elapsed,172800);assert.equal(getChapter(game.state).id,5);
  assert(!getMissionStatus(game.state,'homecoming').complete);assert(!game.claimMission('homecoming').ok);
  advance(86399);assert(!game.claimMission('homecoming').ok);advance(1);
  assert.equal(game.state.elapsed,CAMPAIGN_SECONDS);assert(game.claimMission('homecoming').ok);assert(game.state.won);
});

test('sandbox is explicitly accelerated and uses the same mission progress rules',()=>{
  const {game,advance}=harness('sandbox');assert.equal(game.state.mode,'sandbox');
  game.startProject('repair_fountain');advance(1);assert.equal(game.state.elapsed,SANDBOX_SPEED);assert.equal(game.state.jobs.length,0);
  assert(!game.claimMission('homecoming').ok);assert.equal(game.state.day,1);
});

test('offline catch-up is bounded at 48h, finishes jobs once and discards excess wall time',()=>{
  const h=harness();h.game.startProject('repair_fountain');h.game.save();
  h.setClock(h.getClock()+100*3600*1000);const restored=h.reload();
  assert.equal(restored.state.elapsed,OFFLINE_CAP_SECONDS);assert.equal(restored.state.projectCounts.repair_fountain,1);
  assert(restored.state.offlineSummary.clamped);assert.equal(restored.state.offlineSummary.completedJobs,1);
  const before=restored.state.resources.money;restored.tick();assert.equal(restored.state.resources.money,before);
  const twice=h.reload();assert.equal(twice.state.elapsed,OFFLINE_CAP_SECONDS);assert.equal(twice.state.projectCounts.repair_fountain,1);
});

test('backward clocks do not award time twice, pause does not accrue wages or progress',()=>{
  const h=harness();const base=h.getClock();h.advance(60);assert.equal(h.game.state.elapsed,60);
  h.setClock(base);h.game.tick();assert.equal(h.game.state.elapsed,60);
  h.setClock(base+60000);h.game.tick();assert.equal(h.game.state.elapsed,60);
  assert(h.game.setPaused(true).ok);const money=h.game.state.resources.money;h.advance(3600);assert.equal(h.game.state.elapsed,60);assert.equal(h.game.state.resources.money,money);
  h.game.setPaused(false);h.advance(20);assert.equal(h.game.state.elapsed,80);
});

test('starvation and lack of money cannot kill residents, make debt or prevent recovery',()=>{
  const {game,advance}=harness();
  for(const key of Object.keys(game.state.workers.assignments))game.state.workers.assignments[key]=0;
  game.state.resources.money=0;game.state.resources.food=0;game.state.tax=0;
  const residents=game.state.population,workers=game.state.workers.total,trust=game.state.metrics.trust;
  advance(48*3600);
  assert.equal(game.state.population,residents);assert.equal(game.state.workers.total,workers);
  assert(game.state.resources.money>=0);assert.equal(game.state.resources.food,0);assert(game.state.metrics.trust>=trust-20);
  assert(game.requestAid().ok);assert.equal(game.state.resources.food,30);assert(!game.requestAid().ok);
  assert(game.assign('farm',3).ok);advance(3600);assert(game.state.resources.food>30);
});

test('nature falls under heavy wood collection and regrows when collection stops',()=>{
  const {game,advance}=harness();
  for(const key of Object.keys(game.state.workers.assignments))game.state.workers.assignments[key]=0;
  game.assign('wood',14);advance(24*3600);assert.equal(game.state.metrics.nature,0);
  assert(game.state.resources.wood>75);game.assign('wood',-14);advance(10*3600);assert(Math.abs(game.state.metrics.nature-6.5)<.001);
});

test('passive production, wages and ledger sum remain finite and nonnegative after long catch-up',()=>{
  const {game,advance}=harness();
  for(let i=0;i<5;i++)advance(48*3600);
  for(const value of Object.values(game.state.resources))assert(Number.isFinite(value)&&value>=0);
  for(const value of Object.values(game.state.metrics))assert(Number.isFinite(value)&&value>=0&&value<=100);
  assert(game.state.ledger.length<=160);assert(game.state.log.length<=120);
  const expected=game.state.stats.totalIncome-game.state.stats.totalExpenses;
  assert(Math.abs(expected-game.state.resources.money)<.005);
  assert.doesNotThrow(()=>validateSave(game.exportSave()));
});

test('export/import roundtrip keeps active work and restores only known job metadata',()=>{
  const h=harness();h.game.startProject('repair_fountain');h.advance(12);
  const exported=h.game.exportSave(),copy=harness();assert(copy.game.importSave(exported).ok);
  assert.equal(copy.game.state.jobs[0].remaining,33);assert.equal(copy.game.state.jobs[0].duration,45);
  assert.equal(copy.game.state.resources.money,h.game.state.resources.money);copy.advance(33);assert.equal(copy.game.state.jobs.length,0);
  const raw=JSON.parse(exported);raw.jobs[0].name='<script>wrong metadata</script>';
  assert(copy.game.importSave(JSON.stringify(raw)).ok);assert.equal(copy.game.state.jobs[0].name,'Νερό ξανά στη βρύση');
});

test('malformed and manipulated imports are transactional and never overwrite a healthy save',()=>{
  const h=harness();h.game.startProject('repair_fountain');const valid=h.game.exportSave();
  const invalids=['not json','null','[]','{}'];
  const mutate=fn=>{const d=JSON.parse(valid);fn(d);invalids.push(JSON.stringify(d));};
  mutate(d=>{d.resources.money=-1;});mutate(d=>{d.resources.wood='900';});mutate(d=>{d.workers.assignments.wood=100;});
  mutate(d=>{d.jobs[0].duration=1;});mutate(d=>{d.jobs[0].remaining=-1;});mutate(d=>{d.jobs[0].workers=0;});mutate(d=>{d.jobs[0].paidCost.money=0;});
  mutate(d=>{d.jobs[0].buildingId='church';});mutate(d=>{d.completedProjects=['missing'];});mutate(d=>{d.missionClaims=['water','water'];});
  mutate(d=>{d.mode='speedhack';});mutate(d=>{d.metrics.trust=101;});mutate(d=>{d.stats.talkedNPCs=['__proto__'];});
  const before=JSON.stringify(h.game.state),saved=h.storage.getItem(STORAGE_KEY);
  for(const input of invalids){assert(!h.game.importSave(input).ok);assert.equal(JSON.stringify(h.game.state),before);assert.equal(h.storage.getItem(STORAGE_KEY),saved);}
});

test('failed storage commits preserve the live game during import and return a usable error',()=>{
  const h=harness();h.game.save();const before=h.game.state.resources.money;
  const target=JSON.parse(h.game.exportSave());target.resources.money=999;
  h.storage.setItem=()=>{throw new Error('Quota exceeded');};
  assert(!h.game.importSave(JSON.stringify(target)).ok);assert.equal(h.game.state.resources.money,before);
  assert(!h.game.save().ok);assert(h.game.state.storageWarning.length>0);
});

process.stdout.write(`\n${passed} meaningful engine checks passed.\n`);

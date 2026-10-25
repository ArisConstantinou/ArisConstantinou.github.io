import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CAMPAIGN_PHASES, HUNTER_TYPES, TRAINING, createCampaign, advanceCampaign,
  campaignObjectives, recordGathering, recordCampaignKill, nextBossType,
  inferLegacyMetrics, canTrain, applyTraining
} from '../src/campaign.js';
import {validateSave, SAVE_VERSION, BUILDINGS} from '../src/rules.js';

const starter = (overrides = {}) => ({gatheredFood:30,gatheredReeds:45,shelters:1,buildings:{store:1,nursery:1,training:1,watchtower:0,palisade:0},allies:6,trained:3,territories:0,...overrides});
const advanced = (overrides = {}) => starter({shelters:2,buildings:{store:2,nursery:2,training:2,watchtower:0,palisade:0},trained:6,...overrides});
const frog = (overrides = {}) => ({id:'ally',team:'ally',x:0,z:0,hp:70,maxHp:100,stomach:80,level:1,tier:1,xp:17,...overrides});
const school = (overrides = {}) => ({id:'school',team:'ally',x:0,z:0,hp:350,maxHp:350,buildings:{training:true},...overrides});
function killHunters(state) { for (const type of HUNTER_TYPES) state = recordCampaignKill(state,type); return state; }
function readyBosses() { const hunters=createCampaign(null,starter()); return advanceCampaign(killHunters(hunters),advanced()).state; }

test('legacy campaign rules retain the eight settlement goals alongside the new frontier phase',()=>{
  const state=createCampaign();
  assert.equal(state.phase,'settlement');assert.equal(state.legacy,false);
  assert.equal(campaignObjectives(state).length,8);
  assert.equal(nextBossType(state),null);
  assert.deepEqual(CAMPAIGN_PHASES,['settlement','hunters','preparation','bosses','complete','frontier']);
});

test('every starter requirement independently blocks the hunters chapter',()=>{
  const incomplete=[starter({gatheredFood:29}),starter({gatheredReeds:44}),starter({shelters:0}),starter({allies:5}),starter({trained:2})];
  for(const key of ['store','nursery','training']) incomplete.push(starter({buildings:{...starter().buildings,[key]:0}}));
  for(const metrics of incomplete) assert.equal(createCampaign(null,metrics).phase,'settlement');
});

test('completing settlement advances once without mutating its input',()=>{
  const initial=createCampaign(),before=structuredClone(initial);
  const result=advanceCampaign(initial,starter());
  assert.deepEqual(initial,before);
  assert.equal(result.state.phase,'hunters');
  assert.deepEqual(result.transitions,[{from:'settlement',to:'hunters'}]);
  assert.deepEqual(advanceCampaign(result.state,starter()).transitions,[]);
});

test('completed starter goals latch when resources or allies are later lost',()=>{
  const state=advanceCampaign(createCampaign(),starter({trained:2})).state;
  const later=advanceCampaign(state,{trained:3});
  assert.equal(later.state.phase,'hunters');
  assert.equal(advanceCampaign(later.state,{}).state.phase,'hunters');
});

test('gathering is cumulative, immutable and never reduced by a negative gain',()=>{
  const initial=createCampaign(),next=recordGathering(initial,12,18);
  assert.deepEqual(initial.resourceTotals,{food:0,reeds:0});
  assert.deepEqual(next.resourceTotals,{food:12,reeds:18});
  const final=recordGathering(recordGathering(next,20,30),-100,-100);
  assert.deepEqual(final.resourceTotals,{food:32,reeds:48});
  assert.ok(campaignObjectives(final,{}).slice(0,2).every(goal=>goal.done));
});

test('normal kills are accepted only in the hunters chapter and only once per species',()=>{
  let state=createCampaign();
  assert.deepEqual(recordCampaignKill(state,'heron'),state);
  state=createCampaign(null,starter());
  state=recordCampaignKill(state,'heron');
  const duplicate=recordCampaignKill(state,'heron');
  assert.deepEqual(duplicate.defeated,['heron']);
  assert.deepEqual(recordCampaignKill(state,'unknown').defeated,['heron']);
  assert.equal(advanceCampaign(duplicate,starter()).state.phase,'hunters');
});

test('all three distinct hunter deaths unlock preparation without inventing boss kills',()=>{
  const state=killHunters(createCampaign(null,starter()));
  const result=advanceCampaign(state,starter());
  assert.equal(result.state.phase,'preparation');
  assert.deepEqual(result.state.bossDefeated,[]);
  assert.equal(nextBossType(result.state),null);
  assert.deepEqual(result.transitions,[{from:'hunters',to:'preparation'}]);
});

test('preparation requires two shelters, six building instances and six trained frogs',()=>{
  const state=advanceCampaign(killHunters(createCampaign(null,starter())),starter()).state;
  for(const metrics of [advanced({shelters:1}),advanced({trained:5}),advanced({buildings:{store:2,nursery:2,training:1}})]) {
    assert.equal(advanceCampaign(state,metrics).state.phase,'preparation');
  }
  assert.equal(advanceCampaign(state,advanced()).state.phase,'bosses');
});

test('boss kills are sequential and cannot be credited early or out of order',()=>{
  let state=readyBosses();
  assert.equal(nextBossType(state),'heron');
  state=recordCampaignKill(state,'fish',{boss:true});assert.deepEqual(state.bossDefeated,[]);
  state=recordCampaignKill(state,'heron',{boss:true});assert.equal(nextBossType(state),'snake');
  state=recordCampaignKill(state,'heron',{boss:true});assert.deepEqual(state.bossDefeated,['heron']);
  state=recordCampaignKill(state,'snake',{boss:true});assert.equal(nextBossType(state),'fish');
  state=recordCampaignKill(state,'fish',{boss:true});assert.equal(nextBossType(state),null);
});

test('final victory requires both all bosses and all five enemy territories',()=>{
  let state=readyBosses();
  assert.equal(advanceCampaign(state,advanced({territories:5})).state.phase,'bosses');
  for(const type of HUNTER_TYPES) state=recordCampaignKill(state,type,{boss:true});
  assert.equal(advanceCampaign(state,advanced({territories:4})).state.phase,'bosses');
  assert.equal(advanceCampaign(state,advanced({territories:5})).state.phase,'complete');
});

test('territory losses before final victory matter while a completed campaign stays completed',()=>{
  let state=readyBosses();
  state=advanceCampaign(state,advanced({territories:5})).state;
  for(const type of HUNTER_TYPES) state=recordCampaignKill(state,type,{boss:true});
  state=advanceCampaign(state,{territories:4}).state;
  assert.equal(state.phase,'bosses');
  state=advanceCampaign(state,{territories:5}).state;
  assert.equal(state.phase,'complete');
  assert.equal(createCampaign(JSON.parse(JSON.stringify(state)),{}).phase,'complete');
});

test('legacy migration retains owned territories and veterans but ruins need rebuilding',()=>{
  const legacy={resources:{food:5,reeds:9},frogs:[frog({level:2}),frog({id:'second',level:1})],camps:[
    school({id:'one',originalEnemy:true,buildings:{store:true,nursery:true}}),
    school({id:'two',originalEnemy:true,buildings:{}}),
    school({id:'three',team:'enemy2',originalEnemy:true,destroyed:true}),
    school({id:'four',team:'enemy3',originalEnemy:true}),
    school({id:'five',team:'enemy4',originalEnemy:true})
  ]};
  const metrics=inferLegacyMetrics(legacy),state=createCampaign(null,metrics,{legacy:true});
  assert.equal(metrics.territories,2);assert.equal(metrics.trained,1);assert.equal(metrics.allies,2);
  assert.ok(metrics.gatheredFood>=30&&metrics.gatheredReeds>=45);
  assert.equal(state.phase,'settlement');assert.equal(state.legacy,true);
  assert.deepEqual(state.defeated,[]);assert.deepEqual(state.bossDefeated,[]);
});

test('training requires a living untrained ally, a safe school and the exact course cost',()=>{
  const f=frog(),camp=school();
  assert.deepEqual(TRAINING,{cost:{food:8,reeds:4},duration:18});
  assert.deepEqual(BUILDINGS.training.cost,{food:18,reeds:24});
  assert.equal(canTrain(f,camp,{food:8,reeds:4}),true);
  for(const candidate of [frog({team:'enemy0'}),frog({dead:true}),frog({hp:0}),frog({trained:true}),frog({trainingPaid:true})]) assert.equal(canTrain(candidate,camp,{food:100,reeds:100}),false);
  for(const c of [school({team:'enemy0'}),school({destroyed:true}),school({buildings:{}})]) assert.equal(canTrain(f,c,{food:100,reeds:100}),false);
  assert.equal(canTrain(f,camp,{food:7,reeds:4}),false);assert.equal(canTrain(f,camp,{food:8,reeds:3}),false);
});

test('training rewards one level and at least tier two while preserving existing XP',()=>{
  const f=frog(),xp=f.xp;
  assert.equal(applyTraining(f),true);
  assert.equal(f.level,2);assert.equal(f.tier,2);assert.equal(f.maxHp,133);assert.equal(f.hp,133);assert.equal(f.xp,xp);assert.equal(f.trained,true);
  const before=structuredClone(f);assert.equal(applyTraining(f),false);assert.deepEqual(f,before);
  const veteran=frog({level:5,tier:3,maxHp:160});applyTraining(veteran);assert.equal(veteran.tier,3);assert.equal(veteran.maxHp,168);
});

test('save validation retains the campaign and a paid guard course without losing seconds',()=>{
  const campaign=readyBosses(),input={version:SAVE_VERSION,player:frog({team:'player'}),frogs:[frog({order:'training',trainingPaid:true,trainingProgress:9,trainingCamp:'school',returnOrder:'guard'})],camps:[school({supplyMigrated:true})],resources:{food:20,reeds:30},campaign,stats:{trained:3}};
  const out=validateSave(input);
  assert.equal(out.campaign.phase,'bosses');assert.deepEqual(out.campaign.defeated,HUNTER_TYPES);
  assert.equal(out.frogs[0].trainingPaid,true);assert.equal(out.frogs[0].trainingProgress,9);assert.equal(out.frogs[0].returnOrder,'guard');assert.equal(out.frogs[0].order,'training');
  assert.equal(out.camps[0].buildings.training,true);assert.equal(out.camps[0].supplyMigrated,true);assert.equal(out.stats.trained,3);
});

test('old saves keep campaign null and malformed new training fields are normalized',()=>{
  const input={version:SAVE_VERSION,player:frog(),frogs:[frog({trainingProgress:900,returnOrder:'attack',order:'invalid'})],camps:[school()],resources:{food:0,reeds:0}};
  const out=validateSave(input);
  assert.equal(out.campaign,null);assert.equal(out.frogs[0].trainingProgress,18);assert.equal(out.frogs[0].returnOrder,'follow');assert.equal(out.frogs[0].order,'follow');
  assert.equal(out.stats.trained,0);
});


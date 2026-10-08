import assert from 'node:assert/strict';
import test from 'node:test';
import {createGame,getNodeProduction} from '../feouda-engine.js';

const close=(actual,expected,epsilon=1e-8)=>assert.ok(Math.abs(actual-expected)<epsilon,`${actual} ≠ ${expected}`);
const nodeFor=(game,id)=>game.state.nodes.find(node=>node.id===id);
function isolatedEconomy() {
  const game=createGame();
  game.state.squads=[];
  for(const faction of Object.values(game.state.ai.factions)) {
    faction.nextRaid=1e8;faction.nextRecruit=1e8;
  }
  for(const mission of game.state.missions)mission.done=true;
  for(const node of game.state.nodes)node.workers=0;
  // Initial wells, granaries, food and housing hold morale at exactly 76.
  game.state.morale=76;
  return game;
}
function refresh(game,node) {
  // A read-only command quote recomputes the engine's aggregate economy.
  game.canCommand('assignWorkers',{nodeId:node.id,delta:1});
}

test('food readout includes the exact local farm, agriculture and morale bonuses',()=>{
  const game=isolatedEconomy(),node=nodeFor(game,'wheat-south');
  node.workers=4;
  game.state.regions.farmland.buildings.farm=2;
  game.state.techs.agriculture=2;
  game.state.morale=40;
  const report=getNodeProduction(game.state,node);
  // 15 food/worker/minute × 1.5 farm × 1.4 agriculture × .82 morale.
  close(report.perWorkerPerMinute,25.83);
  close(report.totalPerMinute,103.32);
  assert.deepEqual({active:report.active,buildingType:report.buildingType,buildingLevel:report.buildingLevel,maxWorkers:report.maxWorkers},
    {active:true,buildingType:'farm',buildingLevel:2,maxWorkers:12});
  game.state.techs.agriculture=0;
  close(getNodeProduction(game.state,node).perWorkerPerMinute,18.45);
  game.state.regions.farmland.buildings.farm=0;
  close(getNodeProduction(game.state,node).perWorkerPerMinute,12.3);
  game.state.morale=100;
  close(getNodeProduction(game.state,node).perWorkerPerMinute,17.25);
});

test('non-food readout uses only its matching regional facility and ignores agriculture',()=>{
  const game=isolatedEconomy(),node=nodeFor(game,'oak-west');
  node.workers=3;
  game.state.morale=40;
  game.state.regions.home.buildings.lumberyard=1;
  game.state.regions.farmland.buildings.lumberyard=3;
  game.state.regions.home.buildings.farm=3;
  game.state.techs.agriculture=2;
  const report=getNodeProduction(game.state,node);
  close(report.perWorkerPerMinute,11.685);
  close(report.totalPerMinute,35.055);
  assert.equal(report.buildingType,'lumberyard');assert.equal(report.buildingLevel,1);
  game.state.techs.agriculture=0;
  assert.deepEqual(getNodeProduction(game.state,node),report);
});

for(const [type,nodeId,building] of [
  ['food','wheat-south','farm'],['wood','oak-west','lumberyard'],
  ['stone','chalk-pit','quarry'],['iron','iron-south','mine']
]) {
  test(`${type}: six simulation seconds match the displayed production and source depletion`,()=>{
    const game=isolatedEconomy(),node=nodeFor(game,nodeId);
    node.workers=4;
    game.state.regions[node.regionId].buildings[building]=2;
    game.state.techs.agriculture=2;
    refresh(game,node);
    const report=getNodeProduction(game.state,node);
    close(game.state.gatherRates[type]*60,report.totalPerMinute);
    const before=game.state.resources[type],remaining=node.amount,gathered=game.state.stats.gathered;
    const farms=Object.values(game.state.regions).filter(region=>region.owner==='player').reduce((sum,region)=>sum+(region.buildings.farm||0),0);
    const independentFoodPerSecond=farms*.06-game.state.foodConsumption;
    for(let i=0;i<60;i++)game.step(.1);
    const expected=report.totalPerMinute*6/60;
    close(game.state.t,6);
    close(remaining-node.amount,expected);
    close(game.state.stats.gathered-gathered,expected);
    close(game.state.resources[type]-before,expected+(type==='food'?independentFoodPerSecond*6:0));
    close(game.state.morale,76);
    refresh(game,node);
    close(game.state.gatherRates[type]*60,getNodeProduction(game.state,node).totalPerMinute);
  });
}

test('instantaneous readout stays exact while morale changes between simulation updates',()=>{
  const game=isolatedEconomy(),node=nodeFor(game,'oak-west');
  node.workers=3;game.state.morale=31;refresh(game,node);
  const before=game.state.resources.wood;
  let expected=0;
  for(let i=0;i<40;i++) {
    expected+=getNodeProduction(game.state,node).totalPerMinute*.1/60;
    game.step(.1);
  }
  assert.ok(game.state.morale>31);
  close(game.state.resources.wood-before,expected);
});

test('zero-worker nodes quote prospective output; assignment starts the matching total',()=>{
  const game=isolatedEconomy(),node=nodeFor(game,'oak-west'),snapshot=JSON.stringify(game.state);
  const report=getNodeProduction(game.state,node);
  assert.ok(report.perWorkerPerMinute>0);
  assert.equal(report.totalPerMinute,0);assert.equal(report.active,false);assert.equal(report.maxWorkers,12);
  assert.equal(JSON.stringify(game.state),snapshot,'the readout must not mutate state');
  assert.equal(game.command('assignWorkers',{nodeId:node.id,delta:2}).ok,true);
  const assigned=getNodeProduction(game.state,node);
  assert.equal(assigned.active,true);
  close(assigned.perWorkerPerMinute,report.perWorkerPerMinute);
  close(assigned.totalPerMinute,report.perWorkerPerMinute*2);
  close(game.state.gatherRates.wood*60,assigned.totalPerMinute);
});

test('enemy and neutral resources cannot quote or generate player production',()=>{
  const game=isolatedEconomy(),node=nodeFor(game,'oak-west');
  node.workers=3;
  for(const owner of ['red','gold','neutral']) {
    game.state.regions.home.owner=owner;
    const report=getNodeProduction(game.state,node);
    assert.equal(report.perWorkerPerMinute,0);assert.equal(report.totalPerMinute,0);assert.equal(report.active,false);
    refresh(game,node);
    assert.equal(game.state.gatherRates.wood,0);
    const wood=game.state.resources.wood,amount=node.amount;
    game.step(.1);
    close(game.state.resources.wood,wood);close(node.amount,amount);
  }
});

test('depletion caps actual output and frees workers instead of keeping a stale positive rate',()=>{
  const game=isolatedEconomy(),node=nodeFor(game,'oak-west');
  node.workers=4;node.amount=.025;refresh(game,node);
  assert.ok(getNodeProduction(game.state,node).totalPerMinute>0);
  const wood=game.state.resources.wood,gathered=game.state.stats.gathered;
  game.step(.1);
  close(game.state.resources.wood-wood,.025);close(game.state.stats.gathered-gathered,.025);
  assert.equal(node.amount,0);assert.equal(node.workers,0);
  const report=getNodeProduction(game.state,node);
  assert.equal(report.active,false);assert.equal(report.perWorkerPerMinute,0);assert.equal(report.totalPerMinute,0);
  refresh(game,node);assert.equal(game.state.gatherRates.wood,0);
});

test('quotes use simulation minutes at every game speed and remain useful during pause',()=>{
  const game=isolatedEconomy(),node=nodeFor(game,'oak-west');
  node.workers=2;refresh(game,node);
  const report=getNodeProduction(game.state,node),wood=game.state.resources.wood;
  game.setPaused(true);
  game.setSpeed(4);
  assert.deepEqual(getNodeProduction(game.state,node),report);
  game.step(.5);close(game.state.resources.wood,wood);close(game.state.t,0);
  game.setPaused(false);
  game.step(.5);
  close(game.state.t,2);
  close(game.state.resources.wood-wood,report.totalPerMinute*2/60);
});

test('malformed or missing inputs return finite, inactive totals and never throw',()=>{
  const game=isolatedEconomy(),state=game.state,node=nodeFor(game,'oak-west');
  const badInputs=[
    [],[null,null],[undefined,undefined],[{},{}],[state,null],[null,node],
    [state,{...node,type:'__proto__'}],[state,{...node,type:'constructor'}],
    [state,{...node,regionId:'__proto__'}],[state,{...node,regionId:'missing'}],
    [state,{...node,amount:NaN}],[state,{...node,amount:Infinity}],[state,{...node,amount:-1}],
    [state,{...node,workers:NaN}],[state,{...node,workers:Infinity}],[state,{...node,workers:-1}],
    [state,{...node,workers:13}],[state,{...node,workers:1.5}],
    [{...state,morale:NaN},{...node,workers:1}],
    [{...state,regions:{home:{owner:'player',buildings:{lumberyard:Infinity}}}},{...node,workers:1}],
    [{...state,techs:{agriculture:Infinity}},{...node,type:'food',workers:1}],
    [{regions:null},node],['state','node'],[0,0]
  ];
  for(const args of badInputs) {
    const report=getNodeProduction(...args);
    assert.equal(report.active,false);assert.equal(report.totalPerMinute,0);assert.equal(report.maxWorkers,12);
    for(const key of ['perWorkerPerMinute','totalPerMinute','buildingLevel'])assert.ok(Number.isFinite(report[key]));
    assert.ok(report.perWorkerPerMinute>=0);assert.ok(report.buildingLevel>=0);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {FrogGame,fixture,actor,camp,installStorage} from './game-fixture.mjs';
import {createCampaign,HUNTER_TYPES,TRAINING} from '../src/campaign.js';
import {SAVE_VERSION,SAVE_KEY,validateSave} from '../src/rules.js';

function starterGame(){
  const result=fixture(),game=result.game;
  game.resetWorld();
  game.stats.gatheredFood=30;game.stats.gatheredReeds=45;
  const home=game.addCamp(camp({id:'home',team:'ally',x:0,z:0,originalEnemy:false,stock:{food:0,reeds:0},buildings:{store:true,nursery:true,training:true}}));
  while(game.allies().length<6)game.spawnFrog({team:'ally',x:2,z:2});
  game.allies().slice(0,3).forEach(f=>{f.trained=true;});
  game.updateCampaign(true);
  return {...result,home};
}
function kill(game,predator){
  assert.ok(predator&&!predator.dead);
  game.damage(predator,predator.maxHp+100,game.player,{bypass:true});
  assert.equal(predator.dead,true);
  game.updateCampaign(true);
}
function advancedArmy(game){
  game.addCamp(camp({id:'second-home',team:'ally',x:35,z:0,originalEnemy:false,stock:{food:0,reeds:0},buildings:{store:true,nursery:true,training:true}}));
  game.allies().forEach(f=>{f.trained=true;});
  game.updateCampaign(true);
}
function trainingGame(overrides={}){
  const result=fixture(),game=result.game;
  const home=game.addCamp(camp({id:'school',team:'ally',x:0,z:0,originalEnemy:false,stock:{food:0,reeds:0},buildings:{training:true}}));
  const frog=game.spawnFrog({id:'student',team:'ally',x:5,z:3,hp:60,maxHp:100,level:1,tier:1,xp:17,home:home.id,...overrides});
  return {...result,home,frog};
}

test('actual fresh world reset keeps all predators locked during settlement',()=>{
  const {game}=fixture();
  game.resetWorld();
  assert.equal(game.campaign.phase,'settlement');
  assert.equal(game.predators.length,0);
  game.syncCampaignPredators();game.updateCampaign(true);
  assert.equal(game.predators.length,0);
});
test('finishing the practical foundation opens an endless frontier without forcing a boss chain',()=>{
  const {game}=starterGame();
  assert.equal(game.campaign.phase,'frontier');assert.equal(game.campaign.endless,true);
  assert.equal(game.predators.length,0);
  game.syncCampaignPredators();game.updateCampaign(true);game.checkVictory();
  assert.equal(game.ended,false);assert.equal(game.won,false);
});
test('optional guardian bosses reward a real kill once without ending the campaign',()=>{
  const {game}=starterGame();game.player.level=7;game.realms.events.nextGuardianAt=0;game.realmEventCheckAt=0;
  game.syncCampaignPredators();
  const boss=game.predators.find(p=>p.boss);assert.ok(boss);assert.equal(boss.eventRole,'guardian');
  const pearls=game.resources.pearls;kill(game,boss);game.onPredatorDefeated(boss);game.checkVictory();
  assert.equal(game.resources.pearls,pearls+5);assert.equal(game.realms.events.bossKills,1);
  assert.equal(game.campaign.phase,'frontier');assert.equal(game.ended,false);assert.equal(game.won,false);
});
test('five captured camps alone cannot win and complete campaign triggers victory once',()=>{
  const {game}=fixture();let endings=0;game.ui.showEnding=win=>{if(win)endings++;};
  for(let i=0;i<5;i++)game.camps.push(camp({id:'enemy-'+i,team:'ally',originalEnemy:true,x:i*30}));
  game.checkVictory();assert.equal(game.won,false);assert.equal(endings,0);
  game.campaign=createCampaign({phase:'complete',defeated:HUNTER_TYPES,bossDefeated:HUNTER_TYPES});
  game.checkVictory();game.checkVictory();
  assert.equal(game.won,true);assert.equal(endings,1);assert.equal(game.ended,true);
});
test('training charges once, lasts eighteen seconds and grants its reward once',()=>{
  const {game,home,frog}=trainingGame();
  const before={...game.resources};game.trainSquad([frog]);
  assert.equal(frog.trainingPaid,true);assert.equal(frog.order,'training');
  assert.equal(game.resources.food,before.food-TRAINING.cost.food);assert.equal(game.resources.reeds,before.reeds-TRAINING.cost.reeds);
  game.trainSquad([frog]);assert.equal(game.resources.food,before.food-8);
  game.updateTraining(frog,home,17);assert.equal(frog.trained,false);assert.equal(frog.trainingProgress,17);
  game.updateTraining(frog,home,1);assert.equal(frog.trained,true);assert.equal(frog.level,2);assert.equal(frog.tier,2);assert.equal(frog.maxHp,133);assert.equal(frog.xp,17);assert.equal(game.stats.trained,1);
  game.updateTraining(frog,home,18);assert.equal(frog.level,2);assert.equal(game.stats.trained,1);
});
test('changing an unfinished training order refunds its payment exactly once',()=>{
  const {game,frog}=trainingGame(),before={...game.resources};
  game.trainSquad([frog]);
  game.frogCommand(frog.id,'follow');
  assert.equal(frog.trainingPaid,false);assert.equal(frog.order,'follow');assert.deepEqual(game.resources,before);
  game.cancelTraining(frog);assert.deepEqual(game.resources,before);
});
test('training waits for arrival, pauses under threat and refunds a destroyed school',()=>{
  const {game,home,frog}=trainingGame(),before={...game.resources};
  frog.x=50;game.trainSquad([frog]);game.updateTraining(frog,home,9);
  assert.equal(frog.trainingProgress,0);
  frog.x=5;frog.z=3;
  const raider=actor({id:'raider',team:'enemy0',x:0,z:0});game.frogs.push(raider);
  game.updateTraining(frog,home,9);assert.equal(frog.trainingProgress,0);
  raider.dead=true;game.updateTraining(frog,home,9);assert.equal(frog.trainingProgress,9);
  home.destroyed=true;game.updateTraining(frog,home,1);
  assert.equal(frog.trainingPaid,false);assert.deepEqual(game.resources,before);
});
test('actual save/load keeps a paid half-finished course and restores a guards duty',t=>{
  const {game,home,frog,storage}=trainingGame({guard:true,order:'guard'});
  installStorage(t,storage);
  game.trainSquad([frog]);game.updateTraining(frog,home,9);
  const bank={pearls:0,...game.resources};
  assert.equal(FrogGame.prototype.save.call(game),true);
  const saved=validateSave(JSON.parse(storage.get(SAVE_KEY)));
  assert.equal(saved.frogs[0].trainingPaid,true);assert.equal(saved.frogs[0].trainingProgress,9);assert.equal(saved.frogs[0].returnOrder,'guard');
  const {game:loaded}=fixture();loaded.resetWorld(saved);
  const student=loaded.allies().find(f=>f.id===frog.id),school=loaded.camps.find(c=>c.id===home.id);
  assert.deepEqual(loaded.resources,bank);assert.equal(student.trainingProgress,9);assert.equal(student.trainingPaid,true);
  loaded.updateTraining(student,school,9);
  assert.equal(student.trained,true);assert.equal(student.guard,true);assert.equal(student.order,'guard');assert.deepEqual(loaded.resources,bank);
});
test('a killed event guardian stays dead with its reward recorded after actual save and reset',t=>{
  const {game,storage}=starterGame();installStorage(t,storage);
  game.player.level=2;game.realms.events.nextGuardianAt=0;game.realmEventCheckAt=0;game.syncCampaignPredators();
  const guardian=game.predators.find(p=>p.eventRole==='guardian');kill(game,guardian);
  const pearls=game.resources.pearls;assert.equal(FrogGame.prototype.save.call(game),true);
  const saved=validateSave(JSON.parse(storage.get(SAVE_KEY))),{game:loaded}=fixture();loaded.resetWorld(saved);
  const restored=loaded.predators.find(p=>p.id===guardian.id);
  assert.equal(loaded.campaign.phase,'frontier');assert.ok(restored.dead);assert.equal(restored.hp,0);assert.equal(restored.rewardGranted,true);
  loaded.onPredatorDefeated(restored);assert.equal(loaded.resources.pearls,pearls);
});
test('legacy three-of-five saves preserve territories and veterans while retaining new quests',()=>{
  const legacy={version:SAVE_VERSION,elapsed:600,resources:{food:20,reeds:30},player:actor({id:'player',team:'player'}),frogs:[actor({id:'veteran',level:2}),actor({id:'newcomer',level:1})],camps:Array.from({length:5},(_,i)=>camp({id:'old-'+i,team:i<3?'ally':'enemy'+i,originalEnemy:true,x:i*30-60,buildings:i<3?{store:true,nursery:true}:{},stock:{food:0,reeds:0}})),stats:{recruited:2},idCounter:10};
  const saved=validateSave(legacy),{game}=fixture();assert.equal(saved.campaign,null);game.resetWorld(saved);
  assert.equal(game.camps.filter(c=>c.originalEnemy&&(c.team==='ally'||c.destroyed)).length,3);
  assert.equal(game.allies().length,2);assert.equal(game.allies().find(f=>f.id==='veteran').trained,true);assert.equal(game.allies().find(f=>f.id==='newcomer').trained,false);
  assert.equal(game.campaign.phase,'frontier');assert.equal(game.campaign.endless,true);assert.equal(game.campaign.legacy,true);assert.deepEqual(game.campaign.defeated,[]);assert.equal(game.predators.length,0);
});


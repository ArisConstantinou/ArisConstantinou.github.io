import test from 'node:test';
import assert from 'node:assert/strict';
import {ensureRecruitment,realmRecruitmentOffer,acceptRecruitmentQuest,normalizeRecruitment} from '../src/recruitment.js';
const setup=()=>{const game={campaign:{endless:true},player:{level:1},resources:{food:100},stats:{gatheredFood:0,kills:0},ownedCamps:()=>[],campSafe:()=>true};const frog={id:'first',firstRecruit:true,team:'neutral',level:1,hp:80};return {game,frog};};
test('first follower requires real accepted work, not proximity or a full wallet',()=>{
  const {game,frog}=setup();let offer=realmRecruitmentOffer(game,frog);assert.equal(offer.ready,false);assert.equal(offer.cost.food,8);
  game.stats.gatheredFood=50;assert.equal(realmRecruitmentOffer(game,frog).ready,false);
  assert.equal(acceptRecruitmentQuest(game,frog),true);assert.equal(acceptRecruitmentQuest(game,frog),false);
  game.stats.gatheredFood=55;assert.equal(realmRecruitmentOffer(game,frog).ready,false);
  game.stats.gatheredFood=56;assert.equal(realmRecruitmentOffer(game,frog).ready,true);
});
test('terms remain identical on repeated encounters and save/load',()=>{
  const {game,frog}=setup();const profile=ensureRecruitment(game,frog),before=JSON.stringify(profile);
  game.player.level=5;assert.equal(JSON.stringify(ensureRecruitment(game,frog)),before);
  const loaded={...frog,recruitment:normalizeRecruitment(JSON.parse(before))};assert.deepEqual(realmRecruitmentOffer(game,loaded).requirements,realmRecruitmentOffer(game,frog).requirements);
});
test('higher relative leadership progressively discounts and eventually permits instant recruitment',()=>{
  const {game,frog}=setup();ensureRecruitment(game,frog);game.player.level=5;assert.equal(realmRecruitmentOffer(game,frog).cost.food,5);
  game.player.level=7;assert.equal(realmRecruitmentOffer(game,frog).ready,true);
  game.player.level=11;game.resources.food=0;const offer=realmRecruitmentOffer(game,frog);assert.equal(offer.instant,true);assert.equal(offer.ready,true);assert.equal(offer.cost.food,0);
});
test('high level does not waive all requirements of an equally powerful recruit',()=>{
  const {game,frog}=setup();game.player.level=14;frog.level=14;frog.firstRecruit=false;
  const offer=realmRecruitmentOffer(game,frog);assert.equal(offer.instant,false);assert.equal(offer.requirements.length,4);assert.equal(offer.ready,false);
});
test('only a safe completed owned base fulfils its term',()=>{
  const {game,frog}=setup();frog.recruitment={version:1,requirements:['base'],unitLevel:1,encounterLevel:1,food:8,rank:1,quest:{kind:'gatheredFood',target:6,accepted:false,baseline:0}};
  game.ownedCamps=()=>[{underConstruction:true}];assert.equal(realmRecruitmentOffer(game,frog).ready,false);
  game.ownedCamps=()=>[{}];game.campSafe=()=>false;assert.equal(realmRecruitmentOffer(game,frog).ready,false);
  game.campSafe=()=>true;assert.equal(realmRecruitmentOffer(game,frog).ready,true);
});
test('surrender is preserved and allied actors never become new contracts',()=>{
  const {game,frog}=setup();frog.team='enemy0';frog.surrendered=true;assert.equal(realmRecruitmentOffer(game,frog).cost.food,0);
  frog.team='ally';assert.equal(realmRecruitmentOffer(game,frog).eligible,false);
});

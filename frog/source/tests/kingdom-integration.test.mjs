import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture,actor,camp,FrogGame,installStorage,advanceCombat} from './game-fixture.mjs';
import {createCampaign} from '../src/campaign.js';
import {createRealmState} from '../src/realms.js';
import {updateConstructionSites} from '../src/construction.js';
import {validateSave,SAVE_KEY} from '../src/rules.js';
import {gatePoint} from '../src/fortification.js';

function kingdom(){
  const result=fixture(),g=result.game;
  g.campaign=createCampaign(null,{}, {endless:true});g.realms=createRealmState(null,{elapsed:g.elapsed});g.initKingdom(null);
  g.ui.showPanel=name=>{g.ui.panel=name;};g.ui.closePanels=()=>{g.ui.panel=null;};g.ui.hideMenus=()=>{g.ui.panel=null;};
  return result;
}
function tickWork(g,seconds){
  for(let time=0;time<seconds-1e-8;time+=.05){g.elapsed+=.05;updateConstructionSites(g,.05);g.updateKingdom(.05);}
}
function bareSave(g){return validateSave(JSON.parse(JSON.stringify(g.createSaveData())));}

test('E opens a real neutral contract; payment and XP happen only after its accepted help quest',()=>{
  const {game:g,player:p}=kingdom(),neutral=g.spawnFrog({id:'first-neutral',team:'neutral',x:0,z:2,firstRecruit:true});
  g.aimTarget={kind:'actor',entity:neutral};const bank={...g.resources},xp=p.xp;
  assert.equal(g.interact(),true);assert.notEqual(g.ui.panel,'recruitment');assert.equal(g.activeRecruitId,neutral.id);assert.equal(neutral.team,'neutral');assert.deepEqual(g.resources,bank);
  assert.equal(g.recruit(neutral),false);assert.equal(p.xp,xp);
  g.handleKingdomAction('recruit-help',{id:neutral.id});
  assert.equal(neutral.recruitment.quest.accepted,true);g.creditGathering(5,0);assert.equal(g.recruit(neutral),false);
  g.creditGathering(1,0);g.handleKingdomAction('recruit-target',{id:neutral.id});
  assert.equal(neutral.team,'ally');assert.equal(neutral.order,'follow');assert.equal(g.resources.food,bank.food-8);
  assert.equal(g.stats.recruited,1);assert.equal(p.xp,xp+20);assert.equal(g.activeRecruitId,null);
  assert.equal(g.recruit(neutral),false);assert.equal(g.resources.food,bank.food-8);assert.equal(p.xp,xp+20);
});

test('a sufficiently renowned leader inspects a common neutral first and confirms zero-cost enlistment with E',()=>{
  const {game:g,player:p}=kingdom();p.level=12;
  const neutral=g.spawnFrog({id:'common-neutral',team:'neutral',x:0,z:2,level:1});g.aimTarget={kind:'actor',entity:neutral};
  const bank={...g.resources};assert.equal(g.recruitmentContext(neutral).offer.instant,true);
  assert.equal(g.interact(),true);assert.equal(neutral.team,'neutral');assert.equal(g.activeRecruitId,neutral.id);assert.deepEqual(g.resources,bank);
  assert.equal(g.interact(),true);assert.equal(neutral.team,'ally');assert.deepEqual(g.resources,bank);
});

test('placing a castle creates a vulnerable worksite; time alone cannot build it, but the solo player can',()=>{
  const {game:g,player:p}=kingdom(),before={...g.resources};
  assert.equal(g.commitBuild('shelter',{x:0,z:0,yaw:0}),true);
  const site=g.camps[0],job=g.economy.jobs[0];
  assert.equal(site.underConstruction,true);assert.equal(site.hp,140);assert.equal(g.ownedCamps().length,0);
  assert.equal(g.stats.campsBuilt,0);assert.equal(g.resources.reeds,before.reeds-30);
  tickWork(g,2);assert.equal(job.progress,0);
  Object.assign(p,job.workPoint,{vx:0,vz:0,speed:0});tickWork(g,2);
  assert.ok(job.progress>=1.9&&job.progress<=2.1);assert.equal(p.buildWorking,true);assert.equal(job.playerBuilding,true);
  const threat=actor({id:'raider',team:'enemy0',x:site.x+8,z:site.z});g.frogs.push(threat);
  const progress=job.progress;tickWork(g,1);assert.equal(job.progress,progress);assert.equal(g.constructionWorkRate(job),0);
  threat.dead=true;tickWork(g,40);updateConstructionSites(g,0);
  assert.equal(g.economy.jobs.length,0);assert.equal(site.underConstruction,false);assert.equal(g.ownedCamps().length,1);
  assert.equal(g.stats.campsBuilt,1);assert.equal(site.maxHp,350);assert.equal(p.buildWorking,false);
  assert.equal(g.resources.reeds,before.reeds-30,'completion cannot charge materials a second time');
});

test('a half-built castle resumes from its saved work with no second payment or free completion',t=>{
  const {game:g,player:p,storage}=kingdom();installStorage(t,storage);
  {
    g.commitBuild('shelter',{x:0,z:0,yaw:0});let job=g.economy.jobs[0];Object.assign(p,job.workPoint);tickWork(g,11);
    const progress=job.progress,resources={...g.resources};FrogGame.prototype.save.call(g);
    const saved=validateSave(JSON.parse(storage.get(SAVE_KEY))),{game:loaded}=kingdom();loaded.resetWorld(saved);
    assert.equal(loaded.camps[0].underConstruction,true);assert.equal(loaded.stats.campsBuilt,0);
    job=loaded.economy.jobs[0];assert.equal(job.progress,progress);assert.deepEqual(loaded.resources,resources);
    loaded.player.x=70;loaded.player.z=70;tickWork(loaded,2);assert.equal(job.progress,progress);
    Object.assign(loaded.player,job.workPoint,{vx:0,vz:0,speed:0});tickWork(loaded,32);
    assert.equal(loaded.economy.jobs.length,0);assert.equal(loaded.stats.campsBuilt,1);
    assert.equal(loaded.resources.reeds,resources.reeds);
  }
});

test('outbound travel and return preserve global progress, guards, jobs and every traveler exactly once',()=>{
  const {game:g,player:p}=kingdom();p.level=12;p.xp=33;p.equipment={armor:'shell',weapon:'reed',crest:true};p.crowned=true;
  g.resources={food:500,reeds:500,pearls:7};g.guide.seen=['movement','recruit'];g.guide.groupsSaved=2;
  const home=g.addCamp(camp({id:'origin-home',team:'ally',x:0,z:0,stock:{food:0,reeds:0},specialization:'training',originalEnemy:true}));
  g.addCamp(camp({id:'captured-second',team:'ally',x:80,z:0,stock:{food:0,reeds:0},originalEnemy:true}));
  const guard=g.spawnFrog({id:'parked-guard',team:'ally',home:home.id,guard:true,order:'guard',x:0,z:8});
  g.spawnFrog({id:'traveler',team:'ally',home:home.id,x:0,z:9,level:5,equipment:{armor:'reed',weapon:null,crest:false}});
  Object.assign(p,gatePoint(home,-5));g.commitBuild('upgrade');g.economy.jobs[0].progress=13;
  const bank={...g.resources},globalStats={...g.stats};assert.equal(g.travelToRealm(1),true);
  assert.equal(g.realms.active,1);assert.equal(g.allies().filter(f=>f.id==='traveler').length,1);assert.equal(g.allies().some(f=>f.id===guard.id),false);
  const archive=g.realms.regions[0].snapshot;assert.equal(archive.frogs.some(f=>f.id==='traveler'),false);assert.equal(archive.frogs.find(f=>f.id===guard.id).guard,true);
  assert.equal(archive.economy.jobs[0].progress,13);assert.equal(g.resources.food,bank.food-50);assert.equal(g.resources.reeds,bank.reeds-33);
  g.addCamp(camp({id:'destination-home',team:'ally',x:0,z:0,stock:{food:0,reeds:0},originalEnemy:false}));
  g.player.x=0;g.player.z=8;g.player.xp=55;g.guide.seen.push('frontier');g.resources.pearls=9;
  const beforeReturn={...g.resources};assert.equal(g.travelToRealm(0),true);
  assert.equal(g.realms.active,0);assert.equal(g.player.level,12);assert.equal(g.player.xp,55);assert.equal(g.player.crowned,true);
  assert.deepEqual(g.player.equipment,{armor:'shell',weapon:'reed',crest:true});assert.deepEqual(g.resources,beforeReturn);
  assert.ok(g.guide.seen.includes('frontier'));assert.equal(g.guide.groupsSaved,2);assert.deepEqual(g.stats,globalStats);
  assert.equal(g.allies().filter(f=>f.id==='traveler').length,1);assert.equal(g.allies().find(f=>f.id===guard.id).guard,true);
  assert.equal(g.economy.jobs[0].progress,13);assert.equal(g.camps.find(c=>c.id===home.id).specialization,'training');
  assert.equal(new Set(g.frogs.map(f=>f.id)).size,g.frogs.length,'no duplicate actors after a return journey');
});

test('saving after death preserves army and territory losses and allows a safe solo respawn',()=>{
  const {game:g,player:p}=kingdom();g.frogs.push(actor({id:'lost-soldier',dead:true,hp:0}));
  g.camps.push(camp({id:'lost-castle',team:'enemy0',destroyed:true,hp:0}));g.stats.losses=1;p.hp=0;p.dead=true;
  const saved=bareSave(g);assert.equal(saved.pendingRespawn,true);assert.equal(saved.frogs.length,0);
  const {game:loaded}=kingdom();loaded.resetWorld(saved);loaded.updateKingdom(.05);
  assert.equal(loaded.player.dead,false);assert.ok(loaded.player.hp>0);assert.equal(loaded.ended,false);
  assert.equal(loaded.allies().length,0);assert.equal(loaded.stats.losses,1);assert.equal(loaded.camps[0].destroyed,true);
  assert.ok(loaded.player.invulnerable>=9);
});

test('the production primary attack is delayed and a moved target can make the committed strike miss',()=>{
  const {game:g,player:p}=kingdom(),enemy=actor({id:'enemy',team:'enemy0',z:2});g.frogs.push(enemy);g.aimTarget={kind:'actor',entity:enemy};
  const hp=enemy.hp;g.primaryAttack();assert.equal(enemy.hp,hp);assert.equal(g.pendingStrikes.length,1);
  enemy.z=20;advanceCombat(g);assert.equal(enemy.hp,hp);assert.equal(g.lastStrikeResult.hits,0);assert.equal(g.hitPause||0,0);
  enemy.z=2;p.attackCD=0;g.primaryAttack();advanceCombat(g);assert.ok(enemy.hp<hp);assert.ok(g.hitPause>0);assert.ok(enemy.combatImpulse.z>0);
});


test('coronation counts distinct physical forts across regions only after their construction completes',()=>{
  const {game:g,player:p}=kingdom();
  g.camps.push(camp({id:'enemy-site-0',team:'ally'}),camp({id:'enemy-site-1',team:'ally'}));
  const third=camp({id:'enemy-site-0',team:'ally',underConstruction:true});delete third.mesh;
  g.realms.regions[1]={index:1,snapshot:{camps:[third],frogs:[]}};
  assert.equal(g.updateRoyalStatus({quiet:true}),false);assert.equal(p.crowned,undefined);
  third.underConstruction=false;assert.equal(g.updateRoyalStatus({quiet:true}),true);assert.equal(p.crowned,true);
  assert.equal(g.camps[0].id,'enemy-site-0','global identity views do not rewrite real camp/home IDs');
});

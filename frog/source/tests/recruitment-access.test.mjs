import {advanceCombat} from './game-fixture.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {passiveRecruitTarget,RECRUIT_RANGE,RECRUIT_PREVIEW_RANGE} from '../src/squad-rules.js';
import {FORT_RADIUS,initializeFort} from '../src/fortification.js';
import {actor,camp,fixture} from './game-fixture.mjs';

test('passive recruitment finds the unarmed frog ahead through an allied crowd',()=>{
  const player=actor({id:'player',team:'player'}),side=actor({id:'side',team:'neutral',x:1.5}),ahead=actor({id:'ahead',team:'neutral',z:6.5});
  const crowd=Array.from({length:30},(_,i)=>actor({id:`ally-${i}`,x:(i%3)*.1,z:1+i*.1}));
  const result=passiveRecruitTarget(player,[player,...crowd,side,ahead]);
  assert.equal(result,ahead,'facing the intended passive frog matters more than a nearby side candidate');
  assert.equal(RECRUIT_RANGE,7);assert.ok(RECRUIT_PREVIEW_RANGE>RECRUIT_RANGE);
});

test('passive fallback excludes live hostile fighters, dead frogs, distant frogs and blocked targets',()=>{
  const player=actor({id:'player',team:'player'}),hostile=actor({id:'fighter',team:'enemy0',z:2}),dead=actor({id:'dead',team:'neutral',z:1,dead:true}),far=actor({id:'far',team:'neutral',z:7.1}),blocked=actor({id:'blocked',team:'neutral',z:3});
  assert.equal(passiveRecruitTarget(player,[hostile,dead,far,blocked],[],{isReachable:f=>f!==blocked}),null);
  const surrendered=actor({id:'yielded',team:'enemy0',z:6,surrendered:true});
  assert.equal(passiveRecruitTarget(player,[hostile,surrendered]),surrendered);
  const ruin=camp({id:'ruin',destroyed:true,hp:0}),survivor=actor({id:'survivor',team:'enemy0',home:ruin.id,z:5});
  assert.equal(passiveRecruitTarget(player,[survivor],[ruin]),survivor);
});

test('close passive frogs remain approachable from the side but remote rear frogs do not steal interaction',()=>{
  const player=actor({id:'player',team:'player'}),near=actor({id:'near',team:'neutral',x:2.8}),rear=actor({id:'rear',team:'neutral',z:-4});
  assert.equal(passiveRecruitTarget(player,[rear,near]),near);
  assert.equal(passiveRecruitTarget(player,[rear]),null);
  assert.equal(passiveRecruitTarget(player,[rear],[],{yaw:Math.PI}),rear);
});

test('facing a passive frog allows recruitment through a crowd despite an incidental nearby swarm',()=>{
  const {game}=fixture(),neutral=actor({id:'visible-neutral',team:'neutral',z:6.2}),swarm={id:'incidental',x:2,z:1,flies:20};
  game.frogs.push(...Array.from({length:12},(_,i)=>actor({id:`crowd-${i}`,x:(i%3-1)*.35,z:1+i*.1})),neutral);
  game.world.hotspots.push(swarm);game.aimYaw=0;game.aimTarget={kind:'actor',entity:game.frogs[1]};
  assert.equal(game.context().entity,neutral);assert.equal(game.context().type,'recruit');
  assert.equal(game.interact(),true);assert.equal(neutral.team,'ally');assert.equal(neutral.order,'follow');assert.equal(neutral.guard,false);
  assert.equal(game.resources.food,96);assert.equal(swarm.flies,20);
});

test('deliberately aiming at flies keeps gathering available beside a recruitable frog',()=>{
  const {game}=fixture(),neutral=actor({id:'neutral',team:'neutral',z:5}),swarm={id:'aimed-flies',x:0,z:2,flies:20};
  game.frogs.push(neutral);game.world.hotspots.push(swarm);game.aimYaw=0;game.aimTarget={kind:'flies',entity:swarm};
  assert.equal(game.context().type,'gather');assert.equal(game.context().entity,swarm);
  assert.equal(game.interact(),true);assert.equal(neutral.team,'neutral');assert.equal(swarm.flies,12);
});

test('aimed passive frogs outside recruitment reach explain the distance without gathering or spending',()=>{
  const {game,messages}=fixture(),neutral=actor({id:'too-far',team:'neutral',z:12}),swarm={id:'flies',x:1,z:1,flies:20};
  game.frogs.push(neutral);game.world.hotspots.push(swarm);game.aimTarget={kind:'actor',entity:neutral};
  const context=game.context();assert.equal(context.type,'recruit');assert.equal(context.entity,neutral);assert.equal(context.available,false);
  assert.match(context.reason,/πλησίασε/i);assert.equal(game.interact(),false);
  assert.equal(neutral.team,'neutral');assert.equal(game.resources.food,100);assert.equal(swarm.flies,20);
  assert.ok(messages.length,'an interaction attempt explains why the frog cannot yet join');
});

test('a recruitable frog behind a closed castle wall gives blocked feedback and cannot be bought through stone',()=>{
  const {game,player}=fixture(),base=camp({id:'castle',x:0,z:0}),neutral=actor({id:'inside',team:'neutral',x:FORT_RADIUS-2,z:0});
  initializeFort(base);player.x=FORT_RADIUS+2;player.z=0;game.camps.push(base);game.frogs.push(neutral);game.aimTarget={kind:'actor',entity:neutral};
  const context=game.context();assert.equal(context.type,'recruit');assert.equal(context.available,false);
  assert.match(context.reason,/πύλ|τείχ|εμπόδ/i);assert.equal(game.interact(),false);
  assert.equal(game.recruit(neutral),false,'the action itself checks the wall, not only the UI');
  assert.equal(neutral.team,'neutral');assert.equal(game.resources.food,100);
});

test('a passive frog click explains E recruitment, keeps neutrality and spends no resources',()=>{
  for(const state of [{team:'neutral'},{team:'enemy0',surrendered:true,hp:15}]){
    const {game,player,messages}=fixture(),frog=actor({id:'passive',z:5,...state});
    game.frogs.push(frog);game.aimTarget={kind:'actor',entity:frog};const hp=frog.hp,bank={...game.resources},stamina=player.stamina;
    game.primaryAttack();advanceCombat(game);
    assert.equal(frog.hp,hp);assert.equal(frog.team,state.team);assert.deepEqual(game.resources,bank);assert.equal(player.stamina,stamina);
    assert.ok(messages.some(m=>/E/.test(JSON.stringify(m))&&/στρατολόγ/i.test(JSON.stringify(m))),'clicking explains the actual social action');
    assert.equal(game.context().type,'recruit');assert.equal(game.context().entity,frog);
  }
});

test('the same click still damages an active enemy rather than treating it as a free recruit',()=>{
  for(const destroyed of [false,true]){
    const {game}=fixture(),enemy=actor({id:'active-enemy',team:'enemy0',home:'enemy-home',z:5});
    game.camps.push(camp({id:'enemy-home',x:60,z:0,destroyed,hp:destroyed?0:350}));
    game.frogs.push(enemy);game.aimTarget={kind:'actor',entity:enemy};game.primaryAttack();advanceCombat(game);
    assert.ok(enemy.hp<enemy.maxHp,'a ruined home may offer free recruitment but does not protect an active attacker');assert.equal(enemy.team,'enemy0');assert.equal(enemy.surrendered,false);assert.equal(game.resources.food,100);
  }
});

test('a clicked passive frog stays focused behind an ally, while deliberate fly gathering can override it',()=>{
  const {game}=fixture(),frog=actor({id:'chosen',team:'enemy0',surrendered:true,z:5}),ally=actor({id:'foreground',z:2}),swarm={id:'chosen-flies',x:1,z:2,flies:20};
  game.frogs.push(frog,ally);game.world.hotspots.push(swarm);game.aimTarget={kind:'actor',entity:frog};game.primaryAttack();advanceCombat(game);
  game.aimYaw=Math.PI/2;game.aimTarget={kind:'actor',entity:ally};
  assert.equal(game.context().entity,frog,'the short click focus survives a follower crossing the ray');
  game.aimTarget={kind:'flies',entity:swarm};assert.equal(game.context().entity,swarm);assert.equal(game.context().type,'gather');
  game.aimTarget={kind:'actor',entity:ally};assert.equal(game.interact(),true);assert.equal(frog.team,'ally');
  assert.equal(game.interactionFocus,null,'a successful recruitment clears the previous passive interaction');
});

test('recruiting clears stale hostile orders and the former enemy physically joins the group',()=>{
  const {game,player}=fixture(),ruin=camp({id:'ruin',destroyed:true,hp:0,x:60,z:0}),frog=actor({id:'recovered',team:'enemy0',surrendered:true,home:'ruin',guard:true,order:'guard',z:5,raidTarget:'old-target',orderTarget:player,combatTarget:player,combatUntil:2000,brain:0});
  frog.intent={kind:'attack',target:player};game.camps.push(ruin);game.frogs.push(frog);game.aimTarget={kind:'actor',entity:frog};
  assert.equal(game.interact(),true);assert.equal(frog.order,'follow');assert.equal(frog.guard,false);assert.equal(frog.surrendered,false);
  assert.equal(frog.raidTarget,null);assert.equal(frog.combatTarget,null);assert.equal(frog.orderTarget,null);assert.equal(frog.intent,null);
  player.x=25;player.yaw=Math.PI/2;
  for(let i=0;i<100;i++){game.elapsed+=.05;game.updateFrogs(.05);}
  assert.ok(frog.x>15,'the recruited frog actually moves to its travelling formation');
  assert.ok(Math.hypot(frog.x-player.x,frog.z-player.z)<12);assert.equal(game.resources.food,100,'surrendered recruits remain free');
});

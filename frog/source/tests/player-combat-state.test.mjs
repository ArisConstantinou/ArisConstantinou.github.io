import test from 'node:test';
import assert from 'node:assert/strict';
import {actor,camp,fixture,advanceCombat} from './game-fixture.mjs';
import {SAVE_VERSION,validateSave} from '../src/rules.js';
import {WORLD_REVISION} from '../src/world-config.js';
import {gatePoint,initializeFort} from '../src/fortification.js';

test('enemy intimidation cannot surrender a wounded player or disable combat in either direction',()=>{
  const {game,player}=fixture(),caller=actor({id:'enemy-caller',team:'enemy0',role:'caller',z:1.3,roarCD:0,brain:0});
  player.hp=25;player.morale=10;game.frogs.push(caller);
  game.intimidate(caller);
  assert.equal(player.surrendered,false,'the main player never enters the NPC surrender state');
  assert.equal(game.hostile(player,caller),true);assert.equal(game.hostile(caller,player),true);
  const intent=game.thinkFrog(caller,game.allies());assert.equal(intent.kind,'attack');assert.equal(intent.target,player);
  const playerHp=player.hp;game.updateFrogs(.05);assert.equal(player.hp,playerHp,'wind-up does not deal instant damage');advanceCombat(game);assert.ok(player.hp<playerHp,'the hostile caller still damages the player');
  game.aimTarget={kind:'actor',entity:caller};const enemyHp=caller.hp;game.primaryAttack();advanceCombat(game);
  assert.ok(caller.hp<enemyHp,'the player can still injure the enemy after the roar');
});

test('the player survives repeated morale breaks without becoming a passive or immortal unit',()=>{
  const {game,player}=fixture();player.hp=20;player.morale=0;
  for(let i=0;i<16;i++){
    const caller=actor({id:`caller-${i}`,team:'enemy0',role:'caller',x:Math.sin(i)*3,z:Math.cos(i)*3,roarCD:0});
    game.frogs.push(caller);game.intimidate(caller);
    assert.equal(player.surrendered,false);assert.equal(game.hostile(caller,player),true);
  }
  game.damage(player,30,game.frogs[1]);
  assert.equal(player.dead,true,'a lethal hit produces the normal player defeat, never protected surrender');
});

test('loading an affected save repairs only the player surrender flag',()=>{
  const player=actor({id:'player',team:'player',hp:24,morale:0,surrendered:true}),yielded=actor({id:'yielded',team:'enemy0',hp:15,morale:0,surrendered:true});
  const source={version:SAVE_VERSION,worldRevision:WORLD_REVISION,elapsed:1200,resources:{food:123,reeds:87},player,frogs:[yielded],camps:[]};
  // Renderer objects are not save data.
  delete player.model;delete yielded.model;
  const clean=validateSave(source);
  assert.ok(clean);assert.equal(clean.player.surrendered,false);assert.equal(clean.player.hp,24);assert.equal(clean.player.morale,0);
  assert.equal(clean.frogs[0].surrendered,true,'a genuine surrendered enemy stays recruitable');
  assert.deepEqual(clean.resources,{food:123,reeds:87,pearls:0});assert.equal(source.player.surrendered,true,'validation never mutates the source save');
});

test('direct player spawn also rejects stale surrender without erasing NPC surrender',()=>{
  const {game}=fixture();
  const player=game.spawnFrog({id:'loaded-player',team:'player',x:0,z:0,hp:24,maxHp:120,morale:0,surrendered:true});
  const npc=game.spawnFrog({id:'loaded-npc',team:'enemy0',x:2,z:0,hp:15,surrendered:true});
  assert.equal(player.surrendered,false);assert.equal(player.hp,24);assert.equal(npc.surrendered,true);
  assert.equal(game.hostile(player,npc),false,'real surrendered foes remain protected from ordinary attacks');
});

test('a stale player surrender flag does not change faction hostility',()=>{
  const {game,player}=fixture(),enemy=actor({id:'enemy',team:'enemy0'});player.surrendered=true;
  assert.equal(game.hostile(player,enemy),true);assert.equal(game.hostile(enemy,player),true);
  enemy.surrendered=true;assert.equal(game.hostile(player,enemy),false);assert.equal(game.hostile(enemy,player),false);
});

test('actual AI and both damage directions remain active with a stale live player flag',()=>{
  const {game,player}=fixture(),enemy=actor({id:'attacker',team:'enemy0',z:1.3,brain:10,combatTarget:player,combatUntil:2000});
  player.surrendered=true;game.frogs.push(enemy);enemy.intent={kind:'attack',target:player};
  assert.ok(game.power()>0,'the living player still contributes combat strength');
  assert.equal(game.thinkFrog(enemy,[]).target,player,'existing combat targets remain valid');
  const playerHp=player.hp;game.updateFrogs(.05);assert.equal(player.hp,playerHp,'wind-up does not deal instant damage');advanceCombat(game);assert.ok(player.hp<playerHp,'the queued NPC attack is not invalidated by the stale flag');
  game.aimTarget={kind:'actor',entity:enemy};const enemyHp=enemy.hp;game.primaryAttack();advanceCombat(game);assert.ok(enemy.hp<enemyHp);
});

test('the next player update clears an already-corrupt runtime state without resetting progress',()=>{
  const {game,player}=fixture();player.surrendered=true;player.hp=24;player.level=8;player.xp=37;
  game.input.up=()=>false;game.findAim=()=>null;const bank={...game.resources};
  game.updatePlayer(.016);
  assert.equal(player.surrendered,false);assert.equal(player.hp,24);assert.equal(player.level,8);assert.equal(player.xp,37);
  assert.deepEqual(game.resources,bank);
});

test('a stale player surrender flag does not prevent real siege damage at an enemy gate',()=>{
  const {game,player}=fixture(),base=camp({id:'enemy-fort',x:0,z:0});initializeFort(base);
  const gate=gatePoint(base,3);player.x=gate.x;player.z=gate.z;player.surrendered=true;game.camps.push(base);
  const hp=base.gateHp;game.damageCamp(base,20,player);assert.ok(base.gateHp<hp);
});

test('NPC intimidation surrender and free recruitment still work normally',()=>{
  const {game,player}=fixture(),enemy=actor({id:'weak-enemy',team:'enemy0',hp:25,morale:10,z:2});
  player.roarCD=0;game.frogs.push(enemy);game.intimidate(player);
  assert.equal(enemy.surrendered,true);assert.equal(game.hostile(player,enemy),false);
  const hp=enemy.hp;game.damage(enemy,20,player);assert.equal(enemy.hp,hp);
  const food=game.resources.food;assert.equal(game.recruit(enemy),true);assert.equal(enemy.team,'ally');assert.equal(enemy.surrendered,false);assert.equal(game.resources.food,food);
});

test('explicit follow or regroup rallies a surrendered ally and it physically follows again',()=>{
  for(const command of ['follow','regroup']){
    const {game,player}=fixture(),ally=actor({id:'shaken-ally',x:-24,hp:20,morale:0,surrendered:true,surrenderTimer:80,fear:3,brain:0});
    game.frogs.push(ally);const bank={...game.resources};
    assert.equal(game.gangCommand(command),true);assert.equal(ally.surrendered,false);assert.equal(ally.surrenderTimer,0);assert.equal(ally.fear,0);assert.ok(ally.morale>=35);
    assert.equal(ally.hp,20,'a rally is not free healing');assert.deepEqual(game.resources,bank);
    assert.equal(ally.order,'follow');assert.equal(ally.guard,false);
    for(let i=0;i<100;i++){game.elapsed+=.05;game.updateFrogs(.05);}
    assert.ok(Math.hypot(ally.x-player.x,ally.z-player.z)<12,'the former surrendered ally rejoins the player');
  }
});

test('ordinary follow preserves garrison duty while explicit regroup can rally and recall it',()=>{
  const {game}=fixture(),home=camp({id:'home',team:'ally',x:40,z:0}),guard=actor({id:'shaken-guard',home:'home',x:40,hp:25,guard:true,order:'guard',morale:10}),caller=actor({id:'caller',team:'enemy0',role:'caller',x:41,roarCD:0});
  game.camps.push(home);game.frogs.push(guard,caller);game.intimidate(caller);
  assert.equal(guard.surrendered,true);assert.equal(guard.guard,true,'a shaken sentry retains its assigned duty until explicitly recalled');
  game.gangCommand('follow');assert.equal(guard.guard,true);assert.equal(guard.order,'guard');assert.equal(guard.surrendered,true,'ordinary field follow leaves garrisons untouched');
  game.gangCommand('regroup');assert.equal(guard.surrendered,false);assert.equal(guard.guard,false);assert.equal(guard.order,'follow');
});

test('rallying is restricted to surrendered allies and does not itself change guard assignments',()=>{
  const {game}=fixture(),guard=actor({id:'guard',guard:true,order:'guard',home:'home',surrendered:true,morale:8}),enemy=actor({id:'yielded-enemy',team:'enemy0',surrendered:true});
  assert.equal(game.rallyAlly(enemy),false);assert.equal(enemy.surrendered,true);
  assert.equal(game.rallyAlly(actor({dead:true,surrendered:true})),false);
  assert.equal(game.rallyAlly(guard),true);assert.equal(guard.surrendered,false);assert.equal(guard.guard,true);assert.equal(guard.order,'guard');assert.equal(guard.home,'home');
  assert.equal(game.rallyAlly(guard),false,'already rallied allies do not receive repeated state changes');
});

test('E on an aimed surrendered ally rallies and follows only that explicitly chosen guard',()=>{
  const {game,player}=fixture(),home=camp({id:'home',team:'ally',x:40,z:0});
  const chosen=actor({id:'chosen-guard',home:'home',z:5,hp:20,morale:0,surrendered:true,guard:true,order:'guard'}),other=actor({id:'other-guard',home:'home',x:40,guard:true,order:'guard'});
  game.camps.push(home);game.frogs.push(chosen,other);game.aimTarget={kind:'actor',entity:chosen};const bank={...game.resources};
  const context=game.context();assert.equal(context.type,'rally');assert.equal(context.actionLabel,'Ακολούθησε');assert.equal(context.available,true);
  assert.equal(game.interact(),true);assert.equal(chosen.surrendered,false);assert.equal(chosen.guard,false);assert.equal(chosen.order,'follow');
  assert.equal(other.guard,true);assert.equal(other.order,'guard');assert.deepEqual(game.resources,bank);assert.equal(chosen.hp,20);
  player.x=-25;player.yaw=-Math.PI/2;
  for(let i=0;i<100;i++){game.elapsed+=.05;game.updateFrogs(.05);}
  assert.ok(Math.hypot(chosen.x-player.x,chosen.z-player.z)<12,'the individually rallied ally moves back into the travelling group');
});

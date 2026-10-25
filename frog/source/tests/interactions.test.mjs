import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture,actor,camp} from './game-fixture.mjs';
import {RECRUIT_INTERVAL} from '../src/rules.js';

test('shore gathering works with followers, a full stomach and an eating cooldown without assigning guards',()=>{
  const {game,player}=fixture(),followers=[actor({id:'near-a',x:.6}),actor({id:'near-b',x:1.1})];
  game.frogs.push(...followers);player.stomach=100;player.eatCD=9;
  game.aimTarget={kind:'actor',entity:followers[0]};
  assert.equal(game.context().type,'reeds');assert.equal(game.interact(),true);
  assert.deepEqual(game.resources,{food:100,reeds:103});assert.equal(player.eatCD,9);
  assert.equal(game.stats.gatheredReeds,3);
  for(const frog of followers){assert.equal(frog.guard,false);assert.equal(frog.order,'follow');}
});

test('nearby usable swarms outrank friendly shelters and nearby frogs and collect into the shared bank',()=>{
  const {game,player,messages}=fixture(),swarm={id:'rich',x:6.5,z:0,flies:20,maxFlies:20,rich:true};
  game.camps.push(camp({team:'ally',x:1,z:0}));
  game.frogs.push(actor({id:'follower',x:1}),actor({id:'neutral',team:'neutral',x:2}));
  game.world.hotspots.push(swarm);player.stomach=100;
  assert.equal(game.context().entity,swarm);assert.equal(game.context().actionLabel,'Μάζεψε');
  assert.equal(game.interact(),true);assert.deepEqual(game.resources,{food:105,reeds:106});
  assert.equal(swarm.flies,12);assert.deepEqual(messages.at(-1)[0].resources,{food:5,reeds:6});
  assert.equal(game.stats.gatheredFood,5);assert.equal(game.stats.gatheredReeds,6);
});

test('aiming at a specific nearby neutral recruits that frog even with another frog and swarm closer',()=>{
  const {game}=fixture(),nearest=actor({id:'nearest',team:'neutral',x:.7}),chosen=actor({id:'chosen',team:'neutral',x:3}),swarm={x:1,z:0,flies:10};
  game.frogs.push(nearest,chosen);game.world.hotspots.push(swarm);game.aimTarget={kind:'actor',entity:chosen};
  const context=game.context();assert.equal(context.entity,chosen);assert.deepEqual(context.cost,{food:12});
  assert.equal(context.available,true);assert.equal(context.chance,1);
  assert.equal(game.interact(),true);assert.equal(chosen.team,'ally');assert.equal(nearest.team,'neutral');
  assert.equal(chosen.order,'follow');assert.equal(chosen.guard,false);assert.equal(game.resources.food,88);assert.equal(swarm.flies,10);
});

test('fallen-base survivors remain reachable but require housing and provisions even without a surrender flag',()=>{
  const {game}=fixture();game.resources.food=0;
  for(let i=0;i<40;i++)game.frogs.push(actor({id:'army-'+i,x:-1,z:i*.05}));
  const ruin=camp({id:'ruin',destroyed:true,hp:0,x:3,z:0}),survivor=actor({id:'survivor',team:'enemy0',home:'ruin',x:2});
  game.camps.push(ruin);game.frogs.push(survivor);
  const context=game.context();assert.equal(context.type,'recruit');assert.equal(context.entity,survivor);
  assert.equal(context.available,false);assert.deepEqual(context.cost,{food:12});assert.match(context.reason,/Στέγαση/);
  assert.equal(game.interact(),false);assert.equal(game.allies().length,40);assert.equal(game.resources.food,0);
  for(let i=0;i<4;i++)game.camps.push(camp({id:`upgraded-${i}`,team:'ally',tier:3,x:40+i*35,z:0,buildings:{nursery:true}}));
  assert.equal(game.context().available,false);assert.equal(game.context().reason,'Λείπουν 12 τροφή');
  game.resources.food=12;assert.equal(game.context().available,true);
  assert.equal(game.interact(),true);assert.equal(game.allies().length,41);assert.equal(game.resources.food,0);
});

test('insufficient recruitment resources are explained and never charged',()=>{
  const {game,messages}=fixture(),neutral=actor({id:'neutral',team:'neutral',x:1});
  game.resources.food=11.7;game.frogs.push(neutral);game.aimTarget={kind:'actor',entity:neutral};
  const context=game.context();assert.equal(context.available,false);assert.equal(context.reason,'Λείπουν 1 τροφή');
  assert.equal(game.interact(),false);assert.equal(neutral.team,'neutral');assert.equal(game.resources.food,11.7);
  assert.equal(messages.at(-1)[0].label,'Λείπουν 1 τροφή');
});

test('a loyal enemy first needs weakening, then exposes a persuasion chance without charging a refused offer',()=>{
  const {game,messages}=fixture(),enemy=actor({id:'enemy',team:'enemy0',x:2});
  game.frogs.push(enemy);game.aimTarget={kind:'actor',entity:enemy};game.random=()=>1;
  assert.equal(game.context().available,false);assert.match(game.context().reason,/Αποδυνάμωσε/);
  assert.equal(game.interact(),false);assert.equal(game.resources.food,100);
  enemy.hp=50;
  const context=game.context();assert.equal(context.type,'recruit');assert.equal(context.actionLabel,'Πείσε');
  assert.deepEqual(context.cost,{food:20});assert.equal(context.available,true);assert.ok(context.chance>0&&context.chance<1);
  assert.equal(game.interact(),false);assert.equal(enemy.team,'enemy0');assert.equal(game.resources.food,100);
  assert.equal(messages.at(-1)[0].label,'Η πρόταση απορρίφθηκε');
  const waiting=game.context();assert.equal(waiting.available,false);assert.equal(waiting.cooldown,RECRUIT_INTERVAL);assert.equal(waiting.progress,0);
  game.elapsed+=RECRUIT_INTERVAL/2;assert.equal(game.context().cooldown,RECRUIT_INTERVAL/2);assert.equal(game.context().progress,.5);
});

test('gathering has an independent visible cooldown that prevents duplicate stock and recovers with elapsed time',()=>{
  const {game,player,messages}=fixture(),swarm={x:2,z:0,flies:30};
  game.world.hotspots.push(swarm);player.eatCD=10;
  assert.equal(game.interact(),true);const bank={...game.resources};
  assert.equal(game.context().cooldown,4);assert.equal(game.context().progress,0);assert.equal(game.context().available,false);
  assert.equal(game.interact(),false);assert.deepEqual(game.resources,bank);assert.equal(swarm.flies,22);
  assert.equal(messages.at(-1)[0].label,'Έτοιμο σε 4″');
  game.elapsed+=2;assert.equal(game.context().progress,.5);
  game.elapsed+=2;assert.equal(game.context().available,true);assert.equal(game.interact(),true);
  assert.equal(player.eatCD,10);assert.equal(swarm.flies,14);assert.equal(game.resources.food,bank.food+5);
});

test('depleted swarms do not hide another usable swarm or mint resources on water',()=>{
  const {game}=fixture(),empty={x:.5,z:0,flies:.7},usable={x:4,z:0,flies:1};
  game.world.getSurface=()=>({type:'water',height:0});game.world.hotspots.push(empty,usable);
  assert.equal(game.context().entity,usable);assert.equal(game.interact(),true);
  assert.equal(game.resources.food,101);assert.equal(usable.flies,0);assert.equal(empty.flies,.7);
  game.elapsed+=4;const bank={...game.resources};
  const context=game.context();assert.equal(context.available,false);assert.equal(context.reason,'Το σμήνος ανανεώνεται');
  assert.equal(game.interact(),false);assert.deepEqual(game.resources,bank);
});

test('stale or out-of-range aimed actors cannot steal nearby collection',()=>{
  for(const override of [{x:12},{x:1,dead:true}]){
    const {game}=fixture(),frog=actor({id:'stale',team:'neutral',...override}),swarm={x:2,z:0,flies:10};
    game.frogs.push(frog);game.world.hotspots.push(swarm);game.aimTarget={kind:'actor',entity:frog};
    assert.equal(game.context().type,'gather');assert.equal(game.context().entity,swarm);
  }
});

test('aimed allied E opens that frog in the roster without toggling guard duty',()=>{
  for(const guard of [false,true]){
    const {game}=fixture(),ally=actor({id:'ally',x:1,guard,order:guard?'guard':'follow'});let opened=null;
    game.frogs.push(ally);game.world.getSurface=()=>({type:'water',height:0});game.aimTarget={kind:'actor',entity:ally};game.openPanel=name=>{opened=name;};
    assert.equal(game.context().type,'ally');assert.equal(game.interact(),true);
    assert.equal(opened,'roster');assert.deepEqual([...game.selectedIds],['ally']);assert.equal(ally.guard,guard);assert.equal(ally.order,guard?'guard':'follow');
  }
});

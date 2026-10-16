import test from 'node:test';import assert from 'node:assert/strict';
import {STONE_MINION,createStoneCombat,beginStoneAttack,cancelStoneCombat,advanceStoneCombat} from './stone-minion-combat.js';
test('summoned stone cannot attack until its real spawn action completes',()=>{
 const state=createStoneCombat();assert.equal(beginStoneAttack(state),false);
 advanceStoneCombat(state,STONE_MINION.spawnDuration-.01);assert.equal(beginStoneAttack(state),false);
 advanceStoneCombat(state,.011);assert.equal(beginStoneAttack(state),true);
});
test('each alternating claw emits one contact across variable frame lengths and retains recovery',()=>{
 const state=createStoneCombat();advanceStoneCombat(state,2);const sides=[];
 for(let attack=0;attack<4;attack++){
  assert.equal(beginStoneAttack(state),true);sides.push(state.side);let contacts=0,elapsed=0;
  for(let i=0;i<100&&state.phase!=='idle';i++){
   const dt=[1/60,1/30,.045][i%3],event=advanceStoneCombat(state,dt);elapsed+=dt;
   if(event.contact){contacts++;assert.ok(elapsed>=STONE_MINION.contact);assert.equal(state.phase,'attack');assert.equal(beginStoneAttack(state),false);}
  }
  assert.equal(contacts,1);assert.ok(elapsed>=STONE_MINION.attackDuration);assert.equal(state.phase,'idle');
 }
 assert.deepEqual(sides,[1,-1,1,-1]);
});
test('stun/hold interruption cancels pending contact and cannot resurrect a stale attack',()=>{
 const state=createStoneCombat();cancelStoneCombat(state);beginStoneAttack(state);advanceStoneCombat(state,.58);cancelStoneCombat(state);
 assert.equal(advanceStoneCombat(state,5).contact,false);assert.equal(state.phase,'idle');
 assert.equal(beginStoneAttack(state),true);assert.equal(state.time,0);assert.equal(advanceStoneCombat(state,.3).contact,false);
});

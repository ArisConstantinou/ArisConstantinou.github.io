import test from 'node:test';
import assert from 'node:assert/strict';
import {createTacticalGroups,saveTacticalGroup,selectTacticalGroup,orderFlank,tacticalIntent} from '../src/tactics.js';
const setup=()=>{const frogs=[{id:'a',team:'ally',x:0,z:0},{id:'b',team:'ally',x:1,z:0},{id:'enemy',team:'enemy0',x:0,z:30,model:{}}];return {frogs,player:{x:0,z:0},tacticalGroups:createTacticalGroups(),selectedIds:new Set(['a','b']),predators:[],camps:[],aimTarget:{kind:'actor',entity:frogs[2]},hostile:(a,b)=>a.team!==b.team,cancelTraining:()=>{}};};
test('persistent groups have exclusive membership and exclude dead actors',()=>{
  const game=setup();assert.equal(saveTacticalGroup(game,'1'),true);game.selectedIds=new Set(['b']);saveTacticalGroup(game,'2');assert.deepEqual(game.tacticalGroups[0].ids,['a']);
  game.tacticalGroups=createTacticalGroups(JSON.parse(JSON.stringify(game.tacticalGroups)));selectTacticalGroup(game,'1');assert.deepEqual([...game.selectedIds],['a']);game.frogs[0].dead=true;assert.equal(selectTacticalGroup(game,'1'),false);
});
test('left and right flanks use distinct physical waypoints then attack',()=>{
  const game=setup();orderFlank(game,['a'],'left');orderFlank(game,['b'],'right');const [a,b]=game.frogs;assert(a.tacticalPath[0].x<0);assert(b.tacticalPath[0].x>0);assert.equal(tacticalIntent(game,a).kind,'move');
  while(a.tacticalPath.length){Object.assign(a,a.tacticalPath[0]);tacticalIntent(game,a);}assert.equal(a.order,'attack');assert.equal(a.orderTarget,game.frogs[2]);
});
test('a dead or surrendered flank target cannot retain a combat order',()=>{
  const game=setup();orderFlank(game,['a'],'left');game.frogs[2].surrendered=true;assert.equal(tacticalIntent(game,game.frogs[0]),null);assert.equal(game.frogs[0].order,'follow');
});

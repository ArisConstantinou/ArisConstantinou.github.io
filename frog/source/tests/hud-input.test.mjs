import test from 'node:test';
import assert from 'node:assert/strict';
import {fixture} from './game-fixture.mjs';

test('B opens controls and releases captured aim without pausing gameplay',()=>{
  const {game}=fixture();let unlocked=0,cleared=0;
  game.input.unlock=()=>unlocked++;game.input.clear=()=>cleared++;
  game.ui.toggleHudDisclosure=name=>{assert.equal(name,'actions');game.onAction('hud-disclosure',{name,open:true});};
  assert.equal(game.toggleHUDControls(),true);assert.equal(unlocked,1);assert.equal(cleared,1);
  assert.equal(game.paused,false);assert.ok(game.ignoreUnlockUntil>performance.now());
});
test('HUD keyboard access cannot interrupt construction or an existing modal',()=>{
  for(const flags of [{buildPlacement:{active:true}},{paused:true},{ended:true},{started:false}]){
    const {game}=fixture();Object.assign(game,flags);let calls=0;game.ui.toggleHudDisclosure=()=>calls++;
    assert.equal(game.toggleHUDControls(),false);assert.equal(calls,0);
  }
  const {game}=fixture();game.ui.panel='build';let calls=0;game.ui.toggleHudDisclosure=()=>calls++;
  assert.equal(game.toggleHUDControls(),false);assert.equal(calls,0);
});
test('closing HUD disclosures does not race pointer capture against the next construction action',()=>{
  const {game}=fixture();let locks=0,unlocks=0;game.input.lock=()=>locks++;game.input.unlock=()=>unlocks++;
  game.onAction('hud-disclosure',{name:null,open:false});assert.equal(locks,0);assert.equal(unlocks,0);
  game.onAction('build',{type:'shelter'});assert.equal(game.buildPlacement.active,true);assert.equal(game.input.buildingMode,true);
  assert.equal(locks,0);assert.equal(unlocks,1);assert.deepEqual(game.resources,{food:100,reeds:100});
});

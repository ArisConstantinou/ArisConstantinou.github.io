import test from 'node:test';
import assert from 'node:assert/strict';
import {newVoyage, advance, predictDanger} from '../simulation.js';
import {leverValue} from '../helm130.js';

const rock = {id: 'test-rock', type: 'rock', x: 0, z: 230, radius: 25};
const sailing = (speed = 12) => ({...newVoyage(), speed});

test('Danger forecast contains only scalar data, even when the obstacle carries a cyclic scene graph', () => {
  const mesh = {name: 'test scene node'}; mesh.parent = mesh;
  const danger = predictDanger(sailing(), [{...rock, mesh}]);
  assert.ok(danger && danger.tti > 0 && danger.risk > 0);
  assert.deepEqual(Object.keys(danger).sort(), ['astern','clearance','id','radius','risk','tti','type','x','z'].sort());
  assert.doesNotThrow(() => JSON.stringify(danger));
  assert.equal(danger.id, rock.id);
});

test('An obstacle in the forward corridor is detected before contact', () => {
  const danger = predictDanger(sailing(), [rock]);
  assert.ok(danger.clearance > 100);
  assert.ok(danger.tti > 8);
  assert.equal(danger.astern, false);
});

test('An obstacle behind a forward-moving ship does not trigger a false collision forecast', () => {
  assert.equal(predictDanger(sailing(), [{...rock,z:-230}]), null);
});

test('The same rear obstacle is detected when the ship travels astern', () => {
  const danger = predictDanger(sailing(-3.5), [{...rock,z:-145}]);
  assert.ok(danger && danger.tti > 0);
  assert.equal(danger.astern, true);
});

test('No forward-risk alert for a stationary ship or clear parallel course', () => {
  assert.equal(predictDanger(sailing(0), [rock]), null);
  assert.equal(predictDanger(sailing(), [{...rock,x:90}]), null);
});

test('Risk rises and time-to-impact decreases when moving closer', () => {
  const far = predictDanger(sailing(), [rock]);
  const near = predictDanger({...sailing(),z:55}, [rock]);
  assert.ok(near.risk > far.risk);
  assert.ok(near.tti < far.tti);
});

test('Anticipation raises panic while hull integrity remains intact', () => {
  const s = sailing();
  const initialPanic = s.panic;
  for(let i=0;i<90;i++) advance(s,1/60,{turn:0,throttle:.67},[rock],()=>0,{x:0,z:3800,radius:100});
  assert.ok(s.panic > initialPanic);
  assert.equal(s.hull,100);
  assert.equal(s.collisions,0);
});

test('Vertical lever: full ahead at top, neutral at physical midpoint, full astern at bottom', () => {
  assert.equal(leverValue(100,100,120),1);
  assert.equal(leverValue(160,100,120),0);
  assert.equal(leverValue(220,100,120),-.35);
});

test('Vertical lever clamps out-of-range touches and retains a neutral dead zone', () => {
  assert.equal(leverValue(-50,100,120),1);
  assert.equal(leverValue(500,100,120),-.35);
  for(const y of [157,158,159,160,161,162,163]) assert.equal(leverValue(y,100,120),0);
  assert.ok(leverValue(140,100,120)>0);
  assert.ok(leverValue(180,100,120)<0);
});

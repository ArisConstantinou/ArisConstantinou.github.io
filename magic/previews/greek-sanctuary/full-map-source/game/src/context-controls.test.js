import test from 'node:test';
import assert from 'node:assert/strict';
import {shieldGesture,nearestContext} from './context-controls.js';
const swipe={type:'touch',start:{x:120,y:120},previous:{x:120,y:120,time:10},point:{x:120,y:200,time:90},character:{x:120,y:220}};
test('fast touch towards character arms shield, mouse and slow drags do not',()=>{
  assert.equal(shieldGesture(swipe),true);
  assert.equal(shieldGesture({...swipe,type:'mouse'}),false);
  assert.equal(shieldGesture({...swipe,point:{...swipe.point,time:510}}),false);
  assert.equal(shieldGesture({...swipe,point:{x:200,y:200,time:90}}),false);
  assert.equal(shieldGesture({...swipe,start:{x:120,y:200},previous:{x:120,y:200,time:10}}),false);
  assert.equal(shieldGesture({...swipe,start:{x:120,y:193},previous:{x:120,y:195,time:10},point:{x:120,y:220,time:77}}),true);
  assert.equal(shieldGesture({...swipe,start:{x:120,y:201},previous:{x:120,y:203,time:10},point:{x:120,y:220,time:77}}),true);
});
test('context ignores unreachable and out-of-range interactions',()=>{
  const target={id:'flame',reachable:true,enabled:true,distance:3,range:5};
  assert.equal(nearestContext([{...target,reachable:false}],null),null);
  assert.equal(nearestContext([{...target,distance:6}],null),null);
  assert.equal(nearestContext([target],null).id,'flame');
});
test('actionable interactions take precedence and nearby targets stay stable',()=>{
  const flame={id:'flame',reachable:true,enabled:true,distance:2,range:5,priority:1};
  const engine={id:'engine',reachable:true,enabled:false,distance:1,range:3.7,priority:3};
  assert.equal(nearestContext([flame,engine],null).id,'flame');
  assert.equal(nearestContext([flame,{...engine,enabled:true}],null).id,'engine');
  assert.equal(nearestContext([flame,{...flame,id:'second',distance:1.8}],'flame').id,'flame');
});

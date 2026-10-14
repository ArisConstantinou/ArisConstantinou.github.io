import test from 'node:test';import assert from 'node:assert/strict';import {createHearthDamageLabels} from './hearth-damage-labels.js';
test('continuous damage remains immediate while labels aggregate real amounts instead of framewise zeroes',()=>{
 const label=createHearthDamageLabels(),e={hp:100},labels=[];
 for(let i=0;i<=60;i++){const before=e.hp,value=label(e,22/60,i/60);assert.equal(e.hp,before);e.hp-=22/60;if(value!==false)labels.push(value);}
 assert.equal(labels.length,5);assert.ok(labels.every(v=>v>=4.4&&v<=4.8));assert.ok(Math.abs(e.hp-(100-61*22/60))<1e-10);
});
test('independent victims never share a label accumulator and lethal remainder is shown without changing health',()=>{
 const label=createHearthDamageLabels(),left={hp:50},right={hp:.1};assert.equal(label(left,.4,0),false);assert.equal(label(right,.4,0),.1);assert.equal(right.hp,.1);assert.equal(label(left,.4,.2),.8);assert.equal(left.hp,50);assert.equal(label(left,0,.4),false);
});

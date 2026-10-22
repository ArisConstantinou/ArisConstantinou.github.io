import test from 'node:test';import assert from 'node:assert/strict';
import {hearthMapTarget} from './hearth-map-target.js';
const engine={body:{position:{x:3,z:4}},heart:{state:'sleep',occupied:false},location:{room:{label:'Hall'}}};
test('HEARTH marker reports distance and stays visible beyond map edges',()=>{
 const p=hearthMapTarget({x:0,z:0},engine,-54,-36,360/108);assert.equal(p.distance,5);assert.equal(p.room,'Hall');
 const far=hearthMapTarget({x:0,z:0},{...engine,body:{position:{x:500,z:-500}}},-54,-36,360/108);assert.equal(far.x,344);assert.equal(far.y,16);
});
test('occupied engine does not obscure the player marker and invalid positions are omitted',()=>{
 assert.equal(hearthMapTarget({x:0,z:0},{...engine,heart:{occupied:true}},0,0,1),null);
 assert.equal(hearthMapTarget({x:0,z:0},{...engine,body:{position:{x:NaN,z:0}}},0,0,1),null);
});

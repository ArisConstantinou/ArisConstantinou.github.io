import test from 'node:test';
import assert from 'node:assert/strict';
import {supportSightClear} from '../game/src/walkable-support.js';
import {objectiveInteractionPoint} from './interaction-point.js';

const floor={x:0,y:-.3,z:-20.625,w:17.5,h:.6,d:16.25};
const pedestal={x:0,y:.4,z:-23.75,w:1.85,h:.8,d:1.85};
test('actual crypt approach: floor-root target is blocked, visible relic shaft is reachable',()=>{
 const player={x:.04989,y:.8599765,z:-22.00875},relic={x:0,y:0,z:-23.75};
 assert.equal(supportSightClear(player,relic,[floor,pedestal]),false);
 assert.equal(supportSightClear(player,objectiveInteractionPoint(relic,'relic'),[floor,pedestal]),true);
 assert.deepEqual(relic,{x:0,y:0,z:-23.75});
});
test('rift targets its actual ring height and keeps a raised support',()=>{
 const at={x:0,y:1.2,z:28.75},point=objectiveInteractionPoint(at,'exit');
 assert.equal(point.y,2.88);assert.equal(point.x,at.x);assert.equal(point.z,at.z);
 assert.equal(supportSightClear({x:0,y:2.06,z:27},point,[{x:0,y:.9,z:28.75,w:7,h:.6,d:8}]),true);
});
test('real walls still block both raised objective targets',()=>{
 const wall={x:0,y:2,z:-22.7,w:6,h:4,d:.3},player={x:0,y:.86,z:-21.5};
 for(const kind of ['relic','exit'])assert.equal(supportSightClear(player,objectiveInteractionPoint({x:0,y:0,z:-23.75},kind),[floor,wall]),false);
});

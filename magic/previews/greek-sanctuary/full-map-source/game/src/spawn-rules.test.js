import test from 'node:test';
import assert from 'node:assert/strict';
import {enemySpawnAllowed,hearthSpawnRooms} from './spawn-rules.js';
import {placeHearth} from './hearth-rules.js';
const zones=[{name:'courtyard',xMin:-12,xMax:12,zMin:4,zMax:20},{name:'hall',xMin:-10,xMax:10,zMin:-10,zMax:4},{name:'bridge',xMin:-2.7,xMax:2.7,zMin:20,zMax:27}];
const spawn={x:0,z:18};
test('all points in the spawn room and crossing footprints are excluded',()=>{
 for(let x=-12;x<=12;x+=.5)for(let z=4;z<=20;z+=.5)assert.equal(enemySpawnAllowed({x,z},zones,spawn),false);
 assert.equal(enemySpawnAllowed({x:0,z:3.6},zones,spawn),false);
 assert.equal(enemySpawnAllowed({x:0,z:3.3},zones,spawn),true);
 assert.equal(enemySpawnAllowed({x:12.5,z:10},zones,spawn),false);
});
test('HEARTH candidates exclude the player room, bridge and secret areas',()=>{
 const available=hearthSpawnRooms([...zones,{...zones[1],name:'secret',secret:true}],spawn);
 assert.deepEqual(available.map(r=>r.name),['hall']);
 for(let seed=0;seed<30;seed++)assert.equal(placeHearth(()=>seed/30,()=>true,null,available).room.name,'hall');
});
test('HEARTH honors actual resized crypt bounds',()=>{
 const crypt={name:'crypt',xMin:-8.75,xMax:8.75,zMin:-28.75,zMax:-12.5};
 const location=placeHearth(()=>.2,()=>true,null,[crypt]);
 assert.equal(location.room.zMin,crypt.zMin);assert.equal(location.room.zMax,crypt.zMax);
});
test('HEARTH stays in neighbouring rooms rather than requiring a castle-wide search',()=>{
 const distant={name:'crypt',xMin:-10,xMax:10,zMin:-30,zMax:-10};
 const side={name:'gatehouse',xMin:-30,xMax:-14,zMin:4,zMax:20};
 const doors=[{rooms:['courtyard','hall']},{rooms:['courtyard','gatehouse']},{rooms:['hall','crypt']}];
 assert.deepEqual(hearthSpawnRooms([...zones,distant,side],spawn,doors).map(r=>r.name),['hall','gatehouse']);
 assert.deepEqual(hearthSpawnRooms([...zones,distant],spawn,[{rooms:['hall','crypt']}]),[]);
});

import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const source=fs.readFileSync(new URL('./main.js',import.meta.url),'utf8'),hurt=source.slice(source.indexOf('function hurt('),source.indexOf('function spawnPickup('));
for(const benchmarkMode of [false,true])test('real hurt callback '+(benchmarkMode?'protects benchmark player and preserves hits':'retains normal lethal damage'),()=>{
 let effects=0,deaths=0;const p={isPlayer:true,hp:120,maxHp:120,invulnerable:0,gear:{armor:0},body:{position:{},velocity:{},wakeUp(){}}};
 const context={benchmarkMode,phase:'playing',held:null,player:p,hearth:{mounted:false},shake:0,runTime:1,sound:{sound(){}},fx:{number(){effects++;},burst(){}},endRun(){deaths++;},knockbackXZ(){return{x:0,z:0};}};vm.createContext(context);vm.runInContext(hurt,context);
 context.hurt(p,1e6,null);assert.equal(p.hp,benchmarkMode?120:0);assert.equal(!!p.dead,!benchmarkMode);assert.equal(deaths,benchmarkMode?0:1);assert.equal(effects,1);assert.equal(p.invulnerable,.62);
 if(benchmarkMode){p.invulnerable=0;context.hurt(p,1e9,null);assert.equal(p.hp,120);assert.equal(effects,2);}
 const enemy={hp:100,maxHp:100,isPlayer:false,body:{wakeUp(){}},stun:0};context.hurt(enemy,10,null);assert.equal(enemy.hp,90);
});

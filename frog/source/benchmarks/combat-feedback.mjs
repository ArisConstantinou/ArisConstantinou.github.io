/** Reproducible CPU microbenchmark; this does not measure rendering or FPS.
 * Run: node benchmarks/combat-feedback.mjs
 * Real contact rules, 5 fortification LOS checks, recoil math and fixed VFX
 * pools are included. Audio synthesis, bone posing, AI and WebGL are excluded. */
import {performance} from 'node:perf_hooks';
import os from 'node:os';
import * as THREE from 'three';
import {queueCombatStrike,updateCombatFeedback,registerCombatHit,applyCombatImpulse} from '../src/combat-feedback.js';
import {initializeFort,resolveFortMovement} from '../src/fortification.js';
import {GameVFX} from '../src/effects.js';

const dt=1/60,samples=160,warmup=40;
function fixture(count){
  const frogs=Array.from({length:count},(_,i)=>({id:'unit-'+i,team:i===0?'player':i%2?'enemy0':'ally',x:(Math.floor(i/2)%20)*1.8-18,z:Math.floor(i/40)*1.6-20+(i%2?1:0),y:.35,yaw:i%2?Math.PI:0,hp:1e9,maxHp:1e9,model:{setImpact(){}}}));
  const origins=frogs.map(f=>({x:f.x,z:f.z})),vfx=new GameVFX(new THREE.Scene()),camps=Array.from({length:5},(_,i)=>{
    const angle=i*Math.PI*2/5,c={id:'fort-'+i,x:Math.sin(angle)*80,z:Math.cos(angle)*80,yaw:0,tier:1,team:'enemy0',hp:350,maxHp:350,buildings:{}};initializeFort(c);return c;
  });
  const game={player:frogs[0],frogs,predators:[],camps,elapsed:0,cameraYaw:0,audio:{play(){}},vfx,pendingStrikes:[],confirmedHits:0,hostile:(a,b)=>(a.team==='player'?'ally':a.team)!==(b.team==='player'?'ally':b.team),damage(target,amount,source,options){target.hp-=amount;this.confirmedHits++;registerCombatHit(this,target,amount,source,options);return amount;}};
  const strikes=frogs.map((source,i)=>({id:'strike-'+i,source,sourceTeam:source.team,target:frogs[i^1],kind:'tongue',damage:14,range:8,yaw:source.yaw,arc:-.1,area:false,includeCamps:false,slot:'primary',dueAt:0,options:{}}));
  return {game,strikes,origins};
}
function measure(count,mode){
  const {game,strikes,origins}=fixture(count),timings=[];
  if(mode==='pending')game.pendingStrikes=strikes.map(row=>({...row,dueAt:1e9}));
  for(let n=-warmup;n<samples;n++){
    game.elapsed+=dt;
    if(mode==='contact'){
      game.pendingStrikes=strikes.slice();game.confirmedHits=0;
      game.frogs.forEach((f,i)=>{f.x=origins[i].x;f.z=origins[i].z;f.combatImpulse=null;});
    }
    if(mode==='queue')game.pendingStrikes=[];
    const started=performance.now();
    if(mode==='queue')for(const strike of strikes)queueCombatStrike(game,strike);
    else{
      updateCombatFeedback(game,dt);
      for(const f of game.frogs)if(f.combatImpulse){const recoil=applyCombatImpulse(f,dt),at=resolveFortMovement(game.camps,f,{x:f.x+recoil.dx,z:f.z+recoil.dz});f.x=at.x;f.z=at.z;}
      game.vfx.update(dt);
    }
    if(n>=0)timings.push(performance.now()-started);
  }
  timings.sort((a,b)=>a-b);
  const round=x=>Number(x.toFixed(4));
  return {combatants:count,mode,samples,medianMs:round(timings[Math.floor(samples*.5)]),p95Ms:round(timings[Math.floor(samples*.95)]),meanMs:round(timings.reduce((a,b)=>a+b,0)/samples),confirmedHits:mode==='contact'?game.confirmedHits:undefined,sceneMeshes:game.vfx.scene.children.length,particleCounts:Object.fromEntries(Object.entries(game.vfx.pools).map(([kind,p])=>[kind,p.particles.length]))};
}
const results=[];
for(const count of [200,1000])for(const mode of ['idle','pending','contact','queue'])results.push(measure(count,mode));
console.log(JSON.stringify({kind:'CPU microbenchmark, not FPS',node:process.version,cpu:os.cpus()[0]?.model,platform:process.platform,architecture:process.arch,dt,included:'contact rules, 5 real fort LOS checks, recoil and fixed VFX pools; queue mode measures all strike submissions',excluded:'renderer/WebGL, model posing, AI, audio synthesis, save preparation',results},null,2));

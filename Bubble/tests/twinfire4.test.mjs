import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {TwinStickFire,SPLAT_INTERVAL} from '../src/twinfire4.js';
import {FireRing,RING_ENTER,RING_EXIT,AIM_FULL} from '../src/ring4.js';
const results=[];
const test=(name,fn)=>{try{fn();results.push({name,pass:true});console.log('PASS',name);}catch(e){results.push({name,pass:false,error:e.message});console.error('FAIL',name,e.message);}};
function fixture(){let shots=0,reloads=0;const gate=new FireRing(),fire=new TwinStickFire();const g={touch:true,tool:'splat',cameraMode:'top',fireDown:false,reloadTime:0,ammo:180,input:{aim:[0,-1],move:[.7,0],aimActive:true,firePointer:null,ringRequested:false,disarmRing(){gate.disarm();this.ringRequested=false;}},playing:()=>true,shoot(n,lob){assert.equal(n,1);assert.equal(lob,false);this.ammo--;shots++;},reload(){this.reloadTime=1.7;reloads++;}};return{fire,g,gate,get shots(){return shots;},get reloads(){return reloads;},at(r){g.input.ringRequested=gate.sample(r);},step(t){for(let i=0;i<Math.round(t*60);i++)fire.step(g,1/60);}};}
test('Full aiming magnitude is available before the trigger boundary',()=>assert(AIM_FULL<RING_EXIT&&RING_EXIT<RING_ENTER));
test('Centre does not request firing',()=>{const f=fixture();f.at(0);f.step(1);assert.equal(f.shots,0);});
test('Inner aiming never fires even with maximum aim magnitude',()=>{const f=fixture();f.at(.65);f.step(2);assert.equal(f.shots,0);assert.deepEqual(f.g.input.aim,[0,-1]);});
test('Left movement alone does not request firing',()=>{const f=fixture();f.g.input.aimActive=false;f.at(0);f.step(2);assert.equal(f.shots,0);assert.deepEqual(f.g.input.move,[.7,0]);});
test('Deliberate ring entry fires a normal shot on the next simulation frame',()=>{const f=fixture();f.at(.86);f.step(1/60);assert.equal(f.shots,1);});
test('Held ring fires at bounded simulation cadence without release',()=>{const f=fixture();f.at(.86);f.step(1);assert(f.shots>=6&&f.shots<=7);assert.equal(f.g.ammo,180-f.shots);});
test('Returning to the inner aim zone immediately ends firing',()=>{const f=fixture();f.at(.86);f.step(.3);const n=f.shots;f.at(.6);f.step(1);assert.equal(f.shots,n);assert(f.g.input.aimActive);});
test('Returning exactly to the inner boundary stops firing',()=>{const r=new FireRing();r.sample(.9);assert(!r.sample(RING_EXIT));});
test('Small ring-boundary tremor does not toggle the trigger',()=>{const r=new FireRing();assert(r.sample(.8));assert(r.sample(.74));assert(r.sample(.75));assert(!r.sample(.7));assert(!r.sample(.74));});
test('Lifting aim stops without a release shot',()=>{const f=fixture();f.at(.9);f.step(.3);const n=f.shots;f.g.input.aimActive=false;f.step(1);assert.equal(f.shots,n);});
test('Out-of-circle drag remains held intent until return or cancellation',()=>{const f=fixture();f.at(1.7);f.step(.3);assert(f.shots>0);});
test('Invalid coordinates fail closed',()=>{const r=new FireRing();r.sample(.9);assert(!r.sample(NaN));assert(!r.sample(Infinity));assert(!r.sample(-1));});
test('Manual charge owns ammunition exclusively',()=>{const f=fixture();f.at(.9);f.g.fireDown=true;f.g.input.firePointer=8;f.step(3);assert.equal(f.shots,0);});
test('Held manual pointer suppresses ring shots during refill',()=>{const f=fixture();f.at(.9);f.g.input.firePointer=8;f.step(2);assert.equal(f.shots,0);});
test('Manual discharge cooldown prevents a double shot on release',()=>{const f=fixture();f.at(.9);f.fire.manualShot();f.fire.step(f.g,.01);assert.equal(f.shots,0);f.step(.3);assert(f.shots>0);});
test('Repeated ring crossings cannot bypass fire rate',()=>{const f=fixture();for(let i=0;i<120;i++){f.at(i%2===0?.85:.5);f.fire.step(f.g,1/120);}assert(f.shots<=7);});
test('Empty magazine starts one refill without ending aim',()=>{const f=fixture();f.at(.9);f.g.ammo=1;f.step(1);assert.equal(f.shots,1);assert.equal(f.reloads,1);assert(f.g.input.aimActive);});
test('Refill resumes only while outer ring is still requested',()=>{const f=fixture();f.at(.9);f.g.ammo=0;f.step(.1);f.g.ammo=180;f.g.reloadTime=0;f.step(.5);assert(f.shots>=3);});
test('Returning inside during reload prevents automatic resumption',()=>{const f=fixture();f.at(.9);f.g.ammo=0;f.step(.1);f.at(.5);f.g.ammo=180;f.g.reloadTime=0;f.step(1);assert.equal(f.shots,0);});
for(const tool of ['flow','erase']){
 test(tool+' inner aiming never operates the tool',()=>{const f=fixture();f.g.tool=tool;f.at(.5);f.step(1);assert(!f.fire.toolActive);assert.equal(f.shots,0);});
 test(tool+' outer ring sustains tool without hijacking manual FIRE',()=>{const f=fixture();f.g.tool=tool;f.at(.9);f.step(1);assert(f.fire.toolActive);assert(f.fire.firing);assert(!f.g.fireDown);assert.equal(f.shots,0);assert.equal(f.g.ammo,180);f.at(.5);f.step(.1);assert(!f.fire.toolActive);});
}
test('STRAND does not repeatedly connect/release while outer ring is held',()=>{const f=fixture();f.g.tool='strand';f.at(.9);f.step(2);assert(!f.fire.firing);assert(!f.fire.toolActive);assert.equal(f.shots,0);});
test('Tool switch requires returning inside before firing the new tool',()=>{const f=fixture();f.at(.9);f.step(.1);f.g.tool='erase';f.step(.1);assert(!f.fire.toolActive);f.at(.9);f.step(.1);assert(!f.fire.toolActive);f.at(.5);f.at(.9);f.step(.1);assert(f.fire.toolActive);});
test('Camera switch requires fresh outward intent',()=>{const f=fixture();f.at(.9);f.step(.1);f.g.cameraMode='fp';f.step(.1);const n=f.shots;f.step(.5);assert.equal(f.shots,n);f.at(.5);f.at(.9);f.step(.2);assert(f.shots>n);});
test('Pause or defeat blocks all ring operation',()=>{const f=fixture();f.at(.9);f.g.playing=()=>false;f.step(1);assert.equal(f.shots,0);assert(!f.fire.toolActive);});
test('Desktop controls do not acquire mobile ring fire',()=>{const f=fixture();f.at(.9);f.g.touch=false;f.step(1);assert.equal(f.shots,0);});
test('Slow frames do not create catch-up bursts',()=>{const f=fixture();f.at(.9);f.fire.step(f.g,2);assert.equal(f.shots,1);});
test('Ring updates never mutate left movement',()=>{const f=fixture();f.at(.9);f.step(2);f.at(.4);f.step(1);assert.deepEqual(f.g.input.move,[.7,0]);});
test('Controller reset clears all fire latches',()=>{const f=fixture();f.at(.9);f.step(1);f.fire.reset();f.gate.reset();assert(!f.fire.engaged&&!f.fire.firing&&!f.fire.toolActive&&!f.gate.active);});
const report={version:'0.4.3',suite:'outer-fire-ring',passed:results.filter(x=>x.pass).length,total:results.length,results};writeFileSync(new URL('ring-logic-results.json',import.meta.url),JSON.stringify(report,null,2)+'\n');console.log(`${report.passed}/${report.total} passed`);if(report.passed!==report.total)process.exitCode=1;

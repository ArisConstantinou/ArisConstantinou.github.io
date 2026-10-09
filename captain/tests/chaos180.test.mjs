import test from 'node:test';
import assert from 'node:assert/strict';
import {ATTACKS,attackKey,absorb,moveCircle,segmentBlocked,inStrike} from '../chaos-rules180.js';
test('Both keyboard number banks map to all nine actions',()=>{for(let i=1;i<=9;i++){assert.equal(attackKey('Digit'+i),i);assert.equal(attackKey('Numpad'+i),i);}assert.equal(attackKey('KeyA'),null);});
test('Every attack contacts between windup and recovery',()=>{for(const a of Object.values(ATTACKS)){assert.ok(a.contact>0&&a.contact<a.duration);assert.ok(a.reach<3);}});
test('One sip is absorbed gradually',()=>{const a=absorb(0,8,1/60);assert.ok(a.intox>0&&a.intox<.1&&a.pending>7.9);let s={intox:0,pending:8};for(let i=0;i<120;i++)s=absorb(s.intox,s.pending,1/60);assert.equal(s.pending,0);assert.ok(s.intox<8&&s.intox>7);});
test('Melee requires forward facing and range',()=>{const p={x:0,z:0};assert.ok(inStrike(p,{x:0,z:1.4},0,1.8));assert.ok(!inStrike(p,{x:0,z:3},0,1.8));assert.ok(!inStrike(p,{x:0,z:-1},0,1.8));});
test('Fast movement cannot tunnel through thin walls',()=>{const p={x:0,z:0};moveCircle(p,10,0,[{x:2,z:0,w:.1,d:4}],{x0:-20,x1:20,z0:-20,z1:20});assert.ok(p.x<1.8);});
test('Walls block melee and sight rays',()=>{const w=[{x:0,z:1,w:4,d:.1}];assert.ok(segmentBlocked({x:0,z:0},{x:0,z:2},w));assert.ok(!segmentBlocked({x:3,z:0},{x:3,z:2},w));});
test('Movement slides parallel to obstacles within bounds',()=>{const p={x:0,z:0};moveCircle(p,10,4,[{x:2,z:0,w:.1,d:20}],{x0:-5,x1:5,z0:-5,z1:5});assert.ok(p.x<1.8&&p.z>3.5);});
test('Cell blocks a standing escape but a complete crouched route reaches the whiskey and exit',()=>{
 const bounds={x0:-6,x1:6,z0:-7,z1:7};
 const w=[{x:-6,z:0,w:.2,d:14},{x:6,z:0,w:.2,d:14},{x:0,z:-7,w:12,d:.2},{x:0,z:7,w:12,d:.2},{x:-1.7,z:-6.4,w:.22,d:1.2},{x:-1.7,z:-3.3,w:.22,d:2.2},{x:-1.7,z:-5.3,w:.28,d:1.15,vent:true},{x:-3.8,z:-2.15,w:4.4,d:.12},{x:1,z:0,w:.25,d:7},{x:3.5,z:3.4,w:5,d:.22},{x:-3,z:2.4,w:3,d:.25},{x:-4.8,z:-5.4,w:1.6,d:2.1},{x:4.4,z:5.4,w:1.8,d:.7}];
 const p={x:-2.4,z:-5.3};moveCircle(p,1.8,0,w,bounds,.28);assert.ok(p.x< -2);
 for(const [x,z]of [[-.7,-5.3],[-.7,4.5],[3.9,4.5],[0,4.5],[0,6]]){
  for(let i=0;i<1000&&Math.hypot(x-p.x,z-p.z)>.03;i++){const d=Math.hypot(x-p.x,z-p.z),step=Math.min(.06,d);moveCircle(p,(x-p.x)/d*step,(z-p.z)/d*step,w.filter(c=>!c.vent),bounds,.28);}
  assert.ok(Math.hypot(x-p.x,z-p.z)<.08,JSON.stringify(p));
 }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { ContactGait, createLegSolver } from './locomotion.js';

for (let direction = 0; direction < 8; direction++) test(`planted human and mechanical contacts remain fixed in direction ${direction}`, () => {
  for (const mechanical of [false, true]) {
    const gait = new ContactGait([new THREE.Vector3(-.2,.14,0),new THREE.Vector3(.2,.14,0)], {mechanical,stride:mechanical?1.05:.72});
    const position = new THREE.Vector3(), angle=direction*Math.PI/4, velocity=new THREE.Vector3(Math.sin(angle),0,Math.cos(angle)).multiplyScalar(mechanical?3:4.9);
    gait.update(0,position,0);let previous=gait.snapshot(), swings=0;
    for(let frame=0;frame<360;frame++){
      position.addScaledVector(velocity,1/60);gait.update(1/60,position,0);const current=gait.snapshot();
      for(let i=0;i<2;i++){
        const foot=current.feet[i];assert.ok(foot.lift>=0);if(!foot.stance)swings++;
        if(foot.stance&&previous.feet[i].stance)assert.deepEqual(foot.target,previous.feet[i].target,'a supporting contact may not slide');
      }
      previous=current;
    }
    assert.ok(swings>30,'locomotion must actually lift feet');
  }
});
test('stopped contacts finish the current steps and stop oscillating',()=>{
 const g=new ContactGait([new THREE.Vector3(-.15,.14,0),new THREE.Vector3(.15,.14,0)]),p=new THREE.Vector3();g.update(0,p,0);
 for(let i=0;i<60;i++){p.z+=2/60;g.update(1/60,p,0);}for(let i=0;i<240;i++)g.update(1/60,p,0);
 const before=g.snapshot();for(let i=0;i<60;i++)g.update(1/60,p,0);assert.deepEqual(g.snapshot().feet,before.feet);
});
test('two-bone solver reaches a real target without stretching the leg',()=>{
 const root=new THREE.Group(),hip=new THREE.Bone(),knee=new THREE.Bone(),foot=new THREE.Bone();hip.position.y=1;root.add(hip);hip.add(knee);knee.position.y=-.5;knee.add(foot);foot.position.y=-.5;root.updateMatrixWorld(true);
 const solve=createLegSolver(hip,knee,foot),target=new THREE.Vector3(.14,.15,.32);assert.ok(solve.solve(target,new THREE.Vector3(0,0,1),new THREE.Quaternion())<1e-6);
 const a=hip.getWorldPosition(new THREE.Vector3()),b=knee.getWorldPosition(new THREE.Vector3()),c=foot.getWorldPosition(new THREE.Vector3());assert.ok(Math.abs(a.distanceTo(b)-.5)<1e-6);assert.ok(Math.abs(b.distanceTo(c)-.5)<1e-6);
});

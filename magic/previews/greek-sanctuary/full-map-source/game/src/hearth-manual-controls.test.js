import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {createHearthAimTargets} from './hearth-aim.js';
import {HearthHeart} from './hearth-rules.js';
import {engineMouse} from './engine-mouse.js';
test('manual outlets keep the pointer target despite closer enemies behind and either side',()=>{
 const aim=createHearthAimTargets(),point=new THREE.Vector3(0,.8,-6),streams=[-1,1].map(x=>({origin:new THREE.Vector3(x,2,0)}));
 const enemies=[[-2,0],[2,0],[0,1]].map(([x,z])=>({category:'actor',body:{position:new THREE.Vector3(x,1,z)}}));
 for(let i=0;i<180;i++){point.x=Math.sin(i*.03)*4;const yaw=Math.atan2(point.x,point.z);aim.update(enemies,streams,{active:true,manual:true,manualPoint:point,yaw,center:new THREE.Vector3(),clear:()=>true});assert.equal(aim.desiredYaw,yaw);for(const t of aim.targets){assert.equal(t.entity,null);assert.equal(t.manual,true);assert.deepEqual(t.point.toArray(),point.toArray());}}
 aim.update(enemies,streams,{active:false});assert.ok(aim.targets.every(t=>!t.manual&&!t.entity));
});
test('fire needs held input and cannot restart itself after release, pause or reboarding',()=>{
 const heart=new HearthHeart();heart.state='piloted';heart.fuel=100;
 for(const buttons of [0,1,1,0,0,2,0,1,0]){heart.update(1/60,{fire:engineMouse(buttons,0,true).fire});assert.equal(heart.firing,!!(buttons&1));}
 heart.exit();heart.update(2.5);heart.board();heart.update(2.5);heart.update(1/60,{fire:false});assert.equal(heart.firing,false);
});
